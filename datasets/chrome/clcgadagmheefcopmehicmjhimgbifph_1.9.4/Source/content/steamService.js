/**
 * Steam Service
 * 
 * Handles Steam-related API interactions
 * 
 * This file is loaded via importScripts in the background script,
 * so functions are available globally.
 */

/**
 * Checks if user is logged into Steam by opening a tab
 * and checking for cursor data via content script
 * @param {function} callback - Callback function to receive the result
 * @returns {Promise<{loggedIn: boolean}>}
 */
async function checkSteamLogon(callback) {
  return new Promise((resolve, reject) => {
    const url = "https://steamcommunity.com/id/me/inventoryhistory/";
    
    // Open tab in background (inactive)
    chrome.tabs.create(
      {
        url: url,
        active: false,
      },
      (tab) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        
        // Pass tab ID to callback so background can track it
        if (callback) {
          callback(tab.id);
        }
        
        // Resolve immediately - actual response handled by background script
        resolve({ tabId: tab.id });
      }
    );
  });
}

/**
 * Sleep utility function
 * @param {number} ms - Milliseconds to sleep
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Checks if there's more data available at a specific timestamp
 * Headless version that makes direct requests without opening tabs
 * @param {number} time - Unix timestamp (seconds since epoch)
 * @param {string} profileUrl - Base profile URL for inventory history
 * @param {object} stopFlag - Object with { stopped: boolean } to check if should stop
 * @returns {Promise<{hasCursor: boolean, cursor: object|null, success: boolean}>}
 */
async function hasMoreDataAt(time, profileUrl, stopFlag) {
  if (stopFlag.stopped) {
    return { hasCursor: false, success: false, stopped: true };
  }

  const baseUrl = profileUrl.includes("/?")
    ? profileUrl.split("/?")[0]
    : profileUrl;
  const url = `${baseUrl}/?ajax=1&cursor%5Btime%5D=${time}&cursor%5Btime_frac%5D=0&cursor%5Bs%5D=${undefined}&l=english&app%5B%5D=730`;

  let attempts = 0;
  while (attempts < 6) {
    if (stopFlag.stopped) {
      return { hasCursor: false, success: false, stopped: true };
    }

    try {
      const response = await fetch(url, {
        headers: {
          accept: "*/*",
          "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
          "sec-ch-ua":
            '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: baseUrl,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      });

      if (response.status === 429) {
        await sleep(10000);
        attempts++;
        continue;
      }
      if (response.status === 500) {
        return { hasCursor: false, success: false };
      }

      const data = await response.json();
      const hasCursor = !!data?.cursor;
      return { hasCursor, cursor: data?.cursor, success: !!data?.success };
    } catch (err) {
      attempts++;
      await sleep(500);
    }
  }
  return { hasCursor: false, success: false };
}

/**
 * Detects inventory age by checking backwards through time
 * Headless version that makes direct requests without opening tabs
 * @param {number} startTime - Starting timestamp (seconds since epoch)
 * @param {string} profileUrl - Base profile URL for inventory history
 * @param {object} stopFlag - Object with { stopped: boolean } to check if should stop
 * @param {function} statusCallback - Callback function to send status updates (year, month)
 * @returns {Promise<{timestamp: number|null, stopped: boolean}>}
 */
async function detectInventoryAge(startTime, profileUrl, stopFlag, statusCallback) {
  const YEAR = 365 * 24 * 60 * 60;
  const MONTH = 30 * 24 * 60 * 60;

  let t = startTime;
  let lastSuccessfulTimestamp = startTime; // Track last timestamp with data
  
  // Phase 1: Step backwards year-by-year, tracking last successful timestamp
  while (true) {
    if (stopFlag.stopped) {
      return { timestamp: null, stopped: true };
    }

    const checkDate = new Date(t * 1000);
    const year = checkDate.getFullYear();
    const month = checkDate.getMonth() + 1; // getMonth() returns 0-11

    // Send status update
    if (statusCallback) {
      statusCallback(year, month);
    }

    const checkTime = t - YEAR;
    const result = await hasMoreDataAt(checkTime, profileUrl, stopFlag);
    
    if (stopFlag.stopped) {
      return { timestamp: null, stopped: true };
    }

    if (result.hasCursor && result.success) {
      // Data found, update last successful timestamp and continue backwards
      lastSuccessfulTimestamp = checkTime;
      t = checkTime;
      await sleep(120);
    } else {
      // No data found (retry logic already handled in hasMoreDataAt)
      // Switch to month-by-month traversal from last successful timestamp
      break;
    }
  }

  // Phase 2: Step backwards month-by-month from last successful timestamp
  let monthProbe = lastSuccessfulTimestamp;
  let lastSuccessfulMonth = lastSuccessfulTimestamp;

  while (true) {
    if (stopFlag.stopped) {
      return { timestamp: null, stopped: true };
    }

    monthProbe -= MONTH;

    const probeDate = new Date(monthProbe * 1000);
    const probeYear = probeDate.getFullYear();
    const probeMonth = probeDate.getMonth() + 1;

    // Send status update
    if (statusCallback) {
      statusCallback(probeYear, probeMonth);
    }

    const result = await hasMoreDataAt(monthProbe, profileUrl, stopFlag);
    
    if (stopFlag.stopped) {
      return { timestamp: null, stopped: true };
    }

    if (result.hasCursor && result.success) {
      // Data found, update last successful month timestamp and continue backwards
      lastSuccessfulMonth = monthProbe;
      await sleep(120);
    } else {
      // No data found - return the last successful month timestamp as minimum age
      return { timestamp: lastSuccessfulMonth, stopped: false };
    }
  }
}

/**
 * Normalize economy image URLs from HTML to the path used by our UI (icon_url style)
 */
function normalizeEconomyImageUrl(src) {
  if (!src) return null;
  const marker = "/economy/image/";
  const idx = src.indexOf(marker);
  if (idx === -1) return src; // already a path or unexpected format
  let path = src.substring(idx + marker.length);
  // Strip trailing size suffix like /120x40
  const slashIdx = path.indexOf("/");
  if (slashIdx !== -1) {
    path = path.substring(0, slashIdx);
  }
  return path;
}

/**
 * Map Steam internal type (description.tags["Type"].internal_name) to display type used by UI
 * Mirrors backend categorization in save-events/index.ts
 */
function mapInternalTypeToDisplayType(internalType) {
  if (!internalType) return "Unknown Type";
  switch (internalType) {
    case "CSGO_Type_WeaponCase":
      return "Container";
    case "CSGO_Tool_WeaponCase_KeyTag":
      return "Key";
    case "CSGO_Tool_Sticker":
      return "Sticker";
    case "CSGO_Type_Spray":
      return "Graffiti";
    case "CSGO_Type_Charm":
    case "CSGO_Tool_Keychain":
      return "Charm";
    case "Type_Hands":
      return "Gloves";
    case "CSGO_Type_Tool":
      return "Tool";
    case "CSGO_Type_Ticket": 
      return "Armory Pass";
  }
  const weaponTypes = [
    "CSGO_Type_Pistol",
    "CSGO_Type_SMG",
    "CSGO_Type_Shotgun",
    "CSGO_Type_Rifle",
    "CSGO_Type_Machinegun",
    "CSGO_Type_SniperRifle",
    "CSGO_Type_Equipment",
    "CSGO_Type_Knife",
  ];
  if (weaponTypes.includes(internalType)) return "Weapon";
  return "Unknown Type";
}

/**
 * Extract a base item spec directly from the trade history HTML element
 */
function extractBaseItemFromHtml(itemElement) {
  if (!itemElement) return null;
  const classid = itemElement.dataset.classid || null;
  const instanceid = itemElement.dataset.instanceid || null;
  const appid = itemElement.dataset.appid || null;
  const domId = itemElement.id || null;

  const nameEl = itemElement.querySelector(".history_item_name");
  const name = nameEl?.innerText?.trim() || null;

  const imgEl = itemElement.querySelector("img");
  let image = null;
  if (imgEl && imgEl.src) {
    image = normalizeEconomyImageUrl(imgEl.src);
  }

  const lookupId = classid && instanceid ? `${classid}_${instanceid}` : null;

  return {
    id: domId || lookupId,
    lookupId: lookupId,
    domId: domId,
    classid: classid,
    instanceid: instanceid,
    appid: appid,
    name: name,
    image: image,
    color: null,
    wear: null,
    stattrak: false,
    type: null,
    collection: null,
    stickers: null,
    internalType: null,
  };
}

/**
 * Creates a basic item spec object from a description object.
 */
function createItemSpecFromDescription(description) {
  if (!description) return null;

  const itemSpec = {
    id: `${description.classid}_${description.instanceid}`,
    name: description.name,
    image: description.icon_url,
    color:
      description.tags?.find((tag) => tag.category === "Rarity")?.color ||
      "D2D2D2",
    wear: null,
    stattrak: false,
    type: "Unknown Type",
    collection:
      description.tags?.find((tag) => tag.category === "ItemSet")?.name || null,
    stickers: null,
    internalType: description.tags?.find((tag) => tag.category === "Type")
      ?.internal_name,
  };

  // Prefer internal type-based mapping for reliability
  if (itemSpec.internalType) {
    itemSpec.type = mapInternalTypeToDisplayType(itemSpec.internalType);
  } else {
    // Fallback to tag names if internal type missing
    const typeTag = description.tags?.find((tag) => tag.category === "Type");
    if (typeTag && typeTag.name) {
      itemSpec.type = typeTag.name;
    }
  }

  const wearTag = description.tags?.find((tag) => tag.category === "Exterior");
  if (wearTag) {
    itemSpec.wear = wearTag.wear_value ?? wearTag.name ?? null;
  }

  const stattrakTagFound = description.tags?.find(
    (tag) => tag.category === "Quality" && tag.name === "StatTrak™"
  );
  itemSpec.stattrak = !!stattrakTagFound;

  return itemSpec;
}

/**
 * Enrich an HTML-derived item with description data
 */
function enrichItemWithDescription(baseItem, descriptions730) {
  if (!baseItem) return null;
  const merged = { ...baseItem };

  let description = null;
  if (descriptions730 && baseItem.lookupId) {
    if (descriptions730[baseItem.lookupId]) {
      description = descriptions730[baseItem.lookupId];
    } else {
      const fallbackKey = Object.keys(descriptions730).find((k) =>
        k.startsWith(`${baseItem.classid}_`)
      );
      if (fallbackKey) description = descriptions730[fallbackKey];
    }
  } else if (descriptions730 && baseItem.classid) {
    const key = baseItem.instanceid
      ? `${baseItem.classid}_${baseItem.instanceid}`
      : null;
    if (key && descriptions730[key]) {
      description = descriptions730[key];
    } else {
      const fallbackKey = Object.keys(descriptions730).find((k) =>
        k.startsWith(`${baseItem.classid}_`)
      );
      if (fallbackKey) description = descriptions730[fallbackKey];
    }
  }

  if (description) {
    try {
      const derived = createItemSpecFromDescription(description);
      if (derived) {
        const assignIfMissing = (prop) => {
          if (
            merged[prop] === null ||
            merged[prop] === undefined ||
            merged[prop] === "" ||
            (prop === "type" && (!merged[prop] || merged[prop] === "Unknown Type"))
          ) {
            merged[prop] = derived[prop];
          }
        };

        ["color", "wear", "type", "collection", "stickers", "internalType"].forEach((prop) => {
          assignIfMissing(prop);
        });

        if (!merged.stattrak && derived.stattrak) merged.stattrak = true;
      }
    } catch (e) {
      // Silently continue on error
    }
  }

  if (
    merged.image &&
    merged.image.startsWith("http") &&
    merged.image.includes("/economy/image/")
  ) {
    merged.image = normalizeEconomyImageUrl(merged.image);
  }

  return merged;
}

/**
 * Parse date string from Steam format
 */
function parseDate(str) {
  let [datePart, timePart] = str.split("  ");
  let [day, month, year] = datePart.split(" ");
  let [time, modifier] = timePart.split(/(am|pm)/i);

  let [hours, minutes] = time.split(":");
  if (modifier.toLowerCase() === "pm" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  } else if (modifier.toLowerCase() === "am" && hours === "12") {
    hours = "00";
  }

  const dateString = `${day} ${month} ${year} ${hours}:${minutes}`;
  return new Date(dateString);
}

/**
 * Track last event timestamp for chronological ordering
 */
let lastEventTimestamp = null;

/**
 * Adjust timestamp to ensure chronological order within same minute
 * Sets to minute:59:59.999 by default, subtracts 1ms if same minute as previous event
 * @param {Date} date - The parsed date object
 * @returns {number} Adjusted timestamp in milliseconds
 */
function adjustTimestampForChronologicalOrder(date) {
  // Set to minute:59:59.999 (last millisecond of the minute)
  const adjustedDate = new Date(date);
  adjustedDate.setSeconds(59);
  adjustedDate.setMilliseconds(999);
  
  const adjustedTimestamp = adjustedDate.getTime();
  
  // Check if this is the same minute as the last event
  if (lastEventTimestamp !== null) {
    const lastMinute = new Date(lastEventTimestamp).getMinutes();
    const lastYear = new Date(lastEventTimestamp).getFullYear();
    const lastMonth = new Date(lastEventTimestamp).getMonth();
    const lastDay = new Date(lastEventTimestamp).getDate();
    const lastHour = new Date(lastEventTimestamp).getHours();
    
    const currentMinute = adjustedDate.getMinutes();
    const currentYear = adjustedDate.getFullYear();
    const currentMonth = adjustedDate.getMonth();
    const currentDay = adjustedDate.getDate();
    const currentHour = adjustedDate.getHours();
    
    // Same minute (same year, month, day, hour, minute)
    if (
      lastYear === currentYear &&
      lastMonth === currentMonth &&
      lastDay === currentDay &&
      lastHour === currentHour &&
      lastMinute === currentMinute
    ) {
      // Subtract 1ms from last timestamp to maintain order
      const newTimestamp = lastEventTimestamp - 1;
      lastEventTimestamp = newTimestamp;
      return newTimestamp;
    }
  }
  
  // Different minute or first event - use the adjusted timestamp
  lastEventTimestamp = adjustedTimestamp;
  return adjustedTimestamp;
}

/**
 * Decode HTML entities manually (for service worker context)
 * @param {string} str - String with HTML entities
 * @returns {string} Decoded string
 */
function decodeHtmlEntities(str) {
  if (!str) return str;
  
  // Common HTML entities map
  const entityMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&nbsp;': ' ',
  };
  
  // First decode named entities (so &amp;#39; becomes &#39;)
  str = str.replace(/&[a-zA-Z]+;/g, (match) => {
    return entityMap[match] || match;
  });
  
  // Then decode numeric entities (decimal and hex)
  // Format: &#39; or &#x27; or &#X27;
  str = str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  str = str.replace(/&#[xX]([0-9A-Fa-f]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return str;
}

/**
 * Extract text content from HTML string (removes HTML tags and decodes HTML entities)
 */
function extractTextFromHtml(html) {
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  text = decodeHtmlEntities(text);
  
  return text.trim();
}

/**
 * Parse a single event from HTML string (regex-based, no DOMParser)
 */
function parseEventSimpleFromHtml(eventHtml, rowHtml, descriptions) {
  let eventId = "unknown";
  try {
    // Extract event description text
    const eventDescMatch = eventHtml.match(/class="tradehistory_event_description">\s*([^<]+)/);
    let eventDesc = eventDescMatch ? eventDescMatch[1].trim() : '';
    if (!eventDesc) return null;
    // Decode HTML entities in event description
    eventDesc = decodeHtmlEntities(eventDesc);

    // Extract eventId from first history item
    // The event ID is the first item's ID including the _item\d+ suffix
    const firstItemIdMatch = rowHtml.match(/id="(history[^"]+_item\d+)"/);
    if (firstItemIdMatch) {
      eventId = firstItemIdMatch[1];
    }

    const gainedItems = [];
    const lostItems = [];

    // Find all item containers with plus/minus signs
    // Match: <div class="tradehistory_items_plusminus">-</div> or <div class="tradehistory_items_plusminus">+</div>
    // Handle escaped closing tags (\<\/div\>)
    const itemContainersRegex = /<div class="tradehistory_items[^"]*">\s*<div class="tradehistory_items_plusminus">([+-])<\/div>\s*<div class="tradehistory_items_group">([\s\S]*?)<\/div>\s*<\/div>/g;
    let containerMatch;
    
    while ((containerMatch = itemContainersRegex.exec(rowHtml)) !== null) {
      const sign = containerMatch[1];
      const itemsHtml = containerMatch[2];
      
      // Extract all history_item elements from this container
      // Items can be <span> or <a> tags with consistent structure: tag + img + name_span
      // Use specific regexes to handle the complete HTML structure properly
      const itemRegexA = /<a([^>]*)><img[^>]*src="([^"]+)"[^>]*><span class="history_item_name"([^>]*)>([\s\S]*?)<\/span><\/a>/g;
      const itemRegexSpan = /<span([^>]*class="[^"]*history_item[^"]*"[^>]*)><img[^>]*src="([^"]+)"[^>]*><span class="history_item_name"([^>]*)>([\s\S]*?)<\/span><\/span>/g;

      // Process matches from both regexes
      const allMatches = [];
      let match;

      // Find all <a> tags with history_item structure
      while ((match = itemRegexA.exec(itemsHtml)) !== null) {
        allMatches.push({
          attributes: match[1],
          imageSrc: match[2],
          nameSpanAttributes: match[3],
          nameContent: match[4],
          tagType: 'a'
        });
      }

      // Find all <span> tags with history_item structure
      while ((match = itemRegexSpan.exec(itemsHtml)) !== null) {
        allMatches.push({
          attributes: match[1],
          imageSrc: match[2],
          nameSpanAttributes: match[3],
          nameContent: match[4],
          tagType: 'span'
        });
      }

      for (const itemMatch of allMatches) {
        const attributes = itemMatch.attributes;

        // Extract attributes (order-independent)
        const appidMatch = attributes.match(/data-appid="(\d+)"/);
        const appid = appidMatch ? appidMatch[1] : null;
        if (!appid || appid !== "730") continue;

        const classidMatch = attributes.match(/data-classid="(\d+)"/);
        const classid = classidMatch ? classidMatch[1] : null;

        const instanceidMatch = attributes.match(/data-instanceid="(\d+)"/);
        const instanceid = instanceidMatch ? instanceidMatch[1] : null;

        const idMatch = attributes.match(/id="([^"]+)"/);
        const domId = idMatch ? idMatch[1] : null;

        if (!classid || !instanceid) continue;

        // Extract name from the pre-parsed data
        let name = extractTextFromHtml(itemMatch.nameContent).trim();
        
        // Extract image URL (already captured by regex)
        let image = null;
        if (itemMatch.imageSrc) {
          image = normalizeEconomyImageUrl(itemMatch.imageSrc);
        }
        
        const lookupId = `${classid}_${instanceid}`;
        
        const baseItem = {
          id: domId || lookupId,
          lookupId: lookupId,
          domId: domId,
          classid: classid,
          instanceid: instanceid,
          appid: appid,
          name: name,
          image: image,
          color: null,
          wear: null,
          stattrak: false,
          type: null,
          collection: null,
          stickers: null,
          internalType: null,
        };
        
        const enriched = enrichItemWithDescription(baseItem, descriptions["730"]);
        if (enriched) {
          if (sign === "-") {
            lostItems.push(enriched);
          } else if (sign === "+") {
            gainedItems.push(enriched);
          }
        }
      }
    }

    // Parse date from row HTML (handle tabs and whitespace)
    let date = new Date();
    const dateMatch = rowHtml.match(/<div class="tradehistory_date">\s*([^<]+?)\s*<div class="tradehistory_timestamp">([^<]+)<\/div>/);
    if (dateMatch) {
      const datePart = dateMatch[1].replace(/\s+/g, ' ').trim();
      const timePart = dateMatch[2].trim();
      const dateText = `${datePart}  ${timePart}`;
      try {
        date = parseDate(dateText);
      } catch (e) {
        // Use current date as fallback
      }
    }

    // Adjust timestamp to ensure chronological order
    const adjustedTimestamp = adjustTimestampForChronologicalOrder(date);

    return {
      id: eventId,
      name: eventDesc,
      gainedItems: gainedItems,
      lostItems: lostItems,
      date: adjustedTimestamp,
    };
  } catch (error) {
    console.error("Error parsing event:", error);
    return null;
  }
}

/**
 * Fetch inventory history data from Steam
 * @param {number} time - Timestamp
 * @param {number} time_frac - Time fraction
 * @param {string} cursor - Cursor string
 * @param {string} profileUrl - Profile URL
 * @param {object} stopFlag - Stop flag object
 * @param {function} statusCallback - Optional callback to report status immediately (status string)
 */
async function fetchInventoryData(time, time_frac, cursor, profileUrl, stopFlag, statusCallback) {
  if (stopFlag.stopped) {
    return { stopped: true };
  }

  const baseUrl = profileUrl.includes("/?")
    ? profileUrl.split("/?")[0]
    : profileUrl;
  const url = `${baseUrl}/?ajax=1&cursor%5Btime%5D=${time}&cursor%5Btime_frac%5D=${
    time_frac ?? 0
  }&cursor%5Bs%5D=${cursor || ""}&l=english&app%5B%5D=730`;

  let attempts = 0;
  let encountered429 = false;
  let reported429 = false;
  while (attempts < 10) {
    if (stopFlag.stopped) {
      return { stopped: true };
    }

    try {
      const response = await fetch(url, {
        headers: {
          accept: "*/*",
          "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
          "sec-ch-ua":
            '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: baseUrl,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      });

      if (response.status === 429) {
        encountered429 = true;
        // Report timeout status immediately on first 429 encounter
        if (!reported429 && statusCallback) {
          reported429 = true;
          statusCallback("timeout");
        }
        await sleep(10000);
        attempts++;
        continue;
      }

      if (response.status === 500) {
        return { success: false, hasMore: false, status: "error" };
      }

      const data = await response.json();
      return {
        success: data.success || false,
        html: data.html || "",
        descriptions: data.descriptions || {},
        cursor: data.cursor || null,
        hasMore: !!data.cursor,
      };
    } catch (err) {
      attempts++;
      await sleep(500);
    }
  }

  // If we encountered 429s, return timeout status; otherwise generic error
  return { success: false, hasMore: false, status: encountered429 ? "timeout" : "error" };
}

/**
 * Fetch latest events page from Steam (single page, no cursor loop)
 * @param {string} profileUrl - Base profile URL for inventory history
 * @param {object} stopFlag - Object with { stopped: boolean } to check if should stop
 * @returns {Promise<{success: boolean, events: Array, error?: string}>}
 */
async function fetchLatestEventsPage(profileUrl, stopFlag) {
  if (stopFlag.stopped) {
    return { success: false, events: [], error: "Stopped" };
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const time_frac = 0;
  const cursor = null;

  try {
    const result = await fetchInventoryData(
      currentTime,
      time_frac,
      cursor,
      profileUrl,
      stopFlag,
      null // No status callback for single page fetch
    );

    if (result.stopped) {
      return { success: false, events: [], error: "Stopped" };
    }

    if (!result.success || !result.html) {
      return { success: false, events: [], error: result.status || "No data" };
    }

    // Parse events from HTML using regex (same as queryInventoryEvents)
    const rowRegex = /<div class="tradehistoryrow">([\s\S]*?)(?=<div class="tradehistoryrow">|$)/g;
    const events = [];
    const processedEventIds = new Set();
    let rowMatch;
    
    while ((rowMatch = rowRegex.exec(result.html)) !== null) {
      if (stopFlag.stopped) {
        return { success: false, events: [], error: "Stopped" };
      }
      
      const rowHtml = rowMatch[1];
      
      // Extract event description HTML
      const eventDescMatch = rowHtml.match(/<div class="tradehistory_event_description">([\s\S]*?)<\/div>/);
      if (!eventDescMatch) continue;
      
      const eventDescHtml = eventDescMatch[0];
      
      // Parse the event
      const event = parseEventSimpleFromHtml(eventDescHtml, rowHtml, result.descriptions);
      if (event && !processedEventIds.has(event.id)) {
        processedEventIds.add(event.id);
        events.push(event);
      }
    }

    return { success: true, events: events };
  } catch (error) {
    console.error("Error fetching latest events page:", error);
    return { success: false, events: [], error: error.message || "Unknown error" };
  }
}

/**
 * Query inventory events from Steam
 * @param {number} startTime - Starting timestamp (seconds since epoch)
 * @param {string} profileUrl - Base profile URL for inventory history
 * @param {object} stopFlag - Object with { stopped: boolean } to check if should stop
 * @param {function} eventCallback - Callback function to send events (events array, status string)
 * @param {number} [endTimestamp] - Optional end timestamp (seconds since epoch)
 * @param {boolean} [isExplicitEndTimestamp] - If true, use hard-cut stop at endTimestamp. If false, only stop when no cursor AND beyond endTimestamp (inventory age logic)
 * @returns {Promise<{stopped: boolean}>}
 */
async function queryInventoryEvents(startTime, profileUrl, stopFlag, eventCallback, endTimestamp, isExplicitEndTimestamp) {
  let currentTime = startTime;
  let time_frac = 0;
  let cursor = null;
  const processedEventIds = new Set();
  // Reset timestamp tracking for each new query session
  lastEventTimestamp = null;

  while (true) {
    if (stopFlag.stopped) {
      return { stopped: true };
    }

    // Create a status callback that reports timeout immediately when 429 is encountered
    const statusCallback = (status) => {
      if (eventCallback && status === "timeout") {
        // Report timeout status immediately with empty events array
        eventCallback([], "timeout");
      }
    };

    const result = await fetchInventoryData(
      currentTime,
      time_frac,
      cursor,
      profileUrl,
      stopFlag,
      statusCallback
    );

    if (result.stopped) {
      return { stopped: true };
    }

    if (!result.success || !result.html) {
      // No more data or error - send final status
      if (eventCallback) {
        const finalStatus = result.status === "timeout" ? "timeout" : "error";
        eventCallback([], finalStatus);
      }
      return { stopped: false };
    }

    // Determine status based on result
    // Note: If result.status is "timeout", we should report it immediately
    let status = "green"; // Default: success
    if (result.status === "timeout") {
      status = "timeout";
    } else if (result.status === "error" || result.success === false) {
      status = "error";
    }

    // Parse events from HTML using regex (no DOMParser)
    // Extract each tradehistoryrow by capturing until the next row start or end-of-string
    // This avoids prematurely stopping at the first nested </div>
    const rowRegex = /<div class="tradehistoryrow">([\s\S]*?)(?=<div class="tradehistoryrow">|$)/g;
    const events = [];
    let rowMatch;
    
    while ((rowMatch = rowRegex.exec(result.html)) !== null) {
      if (stopFlag.stopped) {
        return { stopped: true };
      }
      
      const rowHtml = rowMatch[1];
      
      // Extract event description HTML (handle escaped closing tags)
      const eventDescMatch = rowHtml.match(/<div class="tradehistory_event_description">([\s\S]*?)<\/div>/);
      if (!eventDescMatch) continue;
      
      const eventDescHtml = eventDescMatch[0];
      
      // Parse the event
      const event = parseEventSimpleFromHtml(eventDescHtml, rowHtml, result.descriptions);
      if (event && !processedEventIds.has(event.id)) {
        processedEventIds.add(event.id);
        
        // Only filter events if endTimestamp is explicitly provided (hard-cut mode)
        // event.date is in milliseconds, endTimestamp is in seconds
        if (isExplicitEndTimestamp && endTimestamp !== undefined && endTimestamp !== null) {
          const eventTimestampSeconds = Math.floor(event.date / 1000);
          if (eventTimestampSeconds < endTimestamp) {
            // Event is older than end timestamp, skip it
            continue;
          }
        }
        
        events.push(event);
      }
    }

    // Send events and status via callback (always send status, even if no events)
    if (eventCallback) {
      eventCallback(events, status);
    }

    // Check if there's more data
    if (!result.hasMore || !result.cursor) {
      // No cursor received - check if we should stop based on endTimestamp
      if (endTimestamp !== undefined && endTimestamp !== null) {
        // If we have an endTimestamp (explicit or inventory age), check if we're beyond it
        if (currentTime <= endTimestamp) {
          // We're at or beyond the end timestamp, stop
          return { stopped: false };
        }
        // If we're not beyond the end timestamp yet, but no cursor, continue (might be temporary)
      }
      // No endTimestamp or not beyond it yet - stop normally
      return { stopped: false };
    }

    // Update cursor for next request
    currentTime = result.cursor.time || currentTime;
    time_frac = result.cursor.time_frac || 0;
    cursor = result.cursor.s || null;

    // Hard-cut stop: only when endTimestamp is explicitly provided
    if (isExplicitEndTimestamp && endTimestamp !== undefined && endTimestamp !== null && currentTime <= endTimestamp) {
      return { stopped: false };
    }

    // Small delay between requests
    await sleep(100);
  }
}

