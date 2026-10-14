function parseStickers(stickerHtml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(stickerHtml, "text/html");
  const imgElements = doc.querySelectorAll("img");

  return Array.from(imgElements).map((img) => ({
    name: img.title,
    image: img.src,
  }));
}

/**
 * Creates a basic item spec object from a description object.
 * Used to reconstruct the case item spec when correcting API errors.
 * @param {object} description - The item description object from response.descriptions.
 * @returns {object} A partial item spec object compatible with getItemSpec results.
 */
function createItemSpecFromDescription(description) {
  if (!description) return null;

  const itemSpec = {
    id: `${description.classid}_${description.instanceid}`,
    name: description.name,
    image: description.icon_url,
    color:
      description.tags?.find((tag) => tag.category === "Rarity")?.color ||
      "D2D2D2", // Default color
    wear: null, // Default, will be overridden if Exterior tag exists
    stattrak: false, // Default, will be overridden if Quality is StatTrak
    type: "Unknown Type", // Default type
    collection:
      description.tags?.find((tag) => tag.category === "ItemSet")?.name || null,
    stickers: null, // Default, will be overridden if sticker info exists
    internalType: description.tags?.find((tag) => tag.category === "Type")
      ?.internal_name,
  };

  // Prefer internal type-based mapping for reliability; fallback to previous logic only if missing
  if (itemSpec.internalType) {
    itemSpec.type = mapInternalTypeToDisplayType(itemSpec.internalType);
  } else {
    const weaponTag = description.tags?.find((tag) => tag.category === "Weapon");
    if (weaponTag && weaponTag.category_name) {
      itemSpec.type = weaponTag.category_name;
    } else {
      const typeTag = description.tags?.find((tag) => tag.category === "Type");
      if (typeTag && typeTag.name) {
        itemSpec.type = typeTag.name;
      }
    }
  }

  // Determine wear
  const wearTag = description.tags?.find((tag) => tag.category === "Exterior");
  if (wearTag) {
    itemSpec.wear = wearTag.wear_value ?? wearTag.name ?? null;
  }

  // Determine stattrak by checking for the specific tag
  const stattrakTagFound = description.tags?.find(
    (tag) => tag.category === "Quality" && tag.name === "StatTrak™"
  );
  itemSpec.stattrak = !!stattrakTagFound; // Assign true if found, false otherwise

  // Determine stickers
  const stickerInfo = description.descriptions?.find(
    (desc) => desc.category === "Sticker"
  );
  if (stickerInfo) {
    itemSpec.stickers = parseStickers(stickerInfo.description);
  }

  return itemSpec;
}

// Placeholder for a generic Case Key item spec
const genericCaseKeySpec = {
  id: "generic_key",
  name: "Case Key",
  image:
    "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9Q1LO5kNoBhSQl-fROuh28rQR1R2KglqLQFFaA9ufLPHfikzs9vpxtCOmcj7PY7dl3hX-MROhuDG_Zi7jgDkrlFkNzv7I4PHJAdva--AwlLqwrvkhrn8uJ7IwHMypGB8ssw_Ug/94fx94f", // Generic key image
  color: "FFD700", // Gold-ish color
  wear: null,
  stattrak: false,
  type: "Key",
  collection: null,
  stickers: null,
  internalType: "CSGO_Tool_WeaponCase_KeyTag", // Standard key type
};

// Normalize economy image URLs from HTML to the path used by our UI (icon_url style)
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

// Map internal type (description.tags["Type"].internal_name) to UI display type
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

// Extract a base item spec directly from the trade history HTML element
function extractBaseItemFromHtml(itemElement) {
  if (!itemElement) return null;
  const classid = itemElement.dataset.classid || null;
  const instanceid = itemElement.dataset.instanceid || null;
  const appid = itemElement.dataset.appid || null;
  const domId = itemElement.id || null;

  const nameEl = itemElement.querySelector(".history_item_name");
  const name = nameEl?.innerText?.trim() || null;

  let color = null;
  const styleAttr = nameEl?.getAttribute?.("style");
  if (styleAttr) {
    const match = styleAttr.match(/color:\s*#([0-9A-Fa-f]{6})/);
    if (match) color = match[1];
  }

  const imgEl = itemElement.querySelector("img");
  let image = null;
  if (imgEl && imgEl.src) {
    image = normalizeEconomyImageUrl(imgEl.src);
  }

  // Keep classid_instanceid for description lookup, use domId for unique identification
  const lookupId = classid && instanceid ? `${classid}_${instanceid}` : null;

  return {
    id: domId || lookupId, // Use domId as primary unique identifier, fallback to lookupId
    lookupId: lookupId, // Keep the classid_instanceid for description lookup
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

// Enrich an HTML-derived item with description data without overwriting HTML-derived fields
function enrichItemWithDescription(baseItem, descriptions730) {
  if (!baseItem) return null;
  const merged = { ...baseItem };

  let description = null;
  if (descriptions730 && baseItem.lookupId) {
    // Use the pre-computed lookupId for description lookup
    if (descriptions730[baseItem.lookupId]) {
      description = descriptions730[baseItem.lookupId];
    } else {
      // Fallback: try to find any description with matching classid
      const fallbackKey = Object.keys(descriptions730).find((k) =>
        k.startsWith(`${baseItem.classid}_`)
      );
      if (fallbackKey) description = descriptions730[fallbackKey];
    }
  } else if (descriptions730 && baseItem.classid) {
    // Legacy fallback for items without lookupId
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

  let derived = null;
  if (description) {
    try {
      derived = createItemSpecFromDescription(description);
      if (derived?.name && merged?.name && derived.name !== merged.name) {
        addLog(
          `Name mismatch (HTML vs description) for ${merged.id}: "${merged.name}" vs "${derived.name}"`,
          "debug"
        );
      }
      if (derived?.image && merged?.image && derived.image !== merged.image) {
        addLog(
          `Image mismatch (HTML vs description) for ${merged.id}`,
          "debug"
        );
      }
    } catch (e) {
      addLog(
        `Failed to build item from description for ${merged.id}: ${e}`,
        "warning"
      );
    }
  } else if (merged.type === "Key") {
    // Provide a minimal generic fallback for keys if description missing
    derived = {
      ...genericCaseKeySpec,
      image: normalizeEconomyImageUrl(genericCaseKeySpec.image),
    };
  }

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

    // Do not overwrite HTML-first presentation fields if present
    [
      "name",
      "image",
      "color",
      "wear",
      "type",
      "collection",
      "stickers",
      "internalType",
    ].forEach((prop) => {
      if (prop === "name" || prop === "image" || prop === "color") {
        assignIfMissing(prop);
      } else {
        assignIfMissing(prop);
      }
    });

    // stattrak: prefer true if any source says true
    if (!merged.stattrak && derived.stattrak) merged.stattrak = true;
  }

  // Ensure image is normalized to the path format our UI expects
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
 * Retrieves item specifications by looking up its description using classid and instanceid.
 *
 * @param {string} classid - The class ID of the item.
 * @param {string} instanceid - The instance ID of the item.
 * @param {object} descriptions730 - The dictionary of CS:GO item descriptions (response.descriptions[730]).
 * @returns {object|null} The generated item specification object, or null if the description is not found.
 */
function getItemSpecFromIds(classid, instanceid, descriptions730) {
  if (!classid || !instanceid || !descriptions730) {
    addLog(
      "Missing classid, instanceid, or descriptions for getItemSpecFromIds",
      "warning"
    );
    return null;
  }

  const key = `${classid}_${instanceid}`;
  let description = descriptions730[key];

  if (!description) {
    // Fallback: Try to find any description with matching classid
    // This handles cases where Steam provides incomplete descriptions
    const fallbackKey = Object.keys(descriptions730).find((descKey) =>
      descKey.startsWith(classid + "_")
    );

    if (fallbackKey) {
      addLog(
        `Using fallback description ${fallbackKey} for missing ${key}`,
        "warning"
      );
      description = descriptions730[fallbackKey];
    } else {
      addLog(
        `No description found for classid ${classid} (exact key: ${key})`,
        "debug"
      );
      return null;
    }
  }

  try {
    // Use the existing function to create the spec from the found description
    return createItemSpecFromDescription(description);
  } catch (error) {
    addLog(
      `Error creating item spec from description for key ${key}: ${error}`,
      "error"
    );
    return null;
  }
}

async function parseEvent(eventElement, descriptions) {
  let eventId = "unknown"; // Initialize eventId
  try {
    const plusMinusContainers = Array.from(
      eventElement.parentElement.querySelectorAll(
        ".tradehistory_items_plusminus"
      )
    );
    const eventDesc = eventElement.innerText.trim();

    if (!eventDesc || plusMinusContainers.length === 0) {
      addLog("Could not find event description or item containers", "warning");
      return null;
    }

    // Extract eventId reliably here
    const firstItemGroup = plusMinusContainers[0].parentElement.querySelector(
      ".tradehistory_items_group"
    );
    if (
      firstItemGroup &&
      firstItemGroup.children[0] &&
      firstItemGroup.children[0].id
    ) {
      eventId = firstItemGroup.children[0].id;
    } else {
      // Fallback or alternative method if ID is not on the first item
      const itemElementWithId = eventElement.querySelector('[id^="history"]');
      if (itemElementWithId) {
        eventId = itemElementWithId.id.split("_")[0];
      } else {
        addLog(`Could not extract eventId for an event.`, "warning");
        // Keep eventId as 'unknown' or handle as appropriate
      }
    }

    const eventName = eventDesc;
    if (eventName.includes("Unlocked a container")) {
      addLog(`Container event detected.`, "debug");
    }
    const gainedItems = [];
    const lostItems = [];

    // --- Revised Item Parsing Logic (Using parentElement of eventElement) ---
    const contentDiv = eventElement.parentElement; // Get the parent (.tradehistory_content)
    let allItemContainers = []; // Initialize as empty array

    if (contentDiv && contentDiv.classList.contains("tradehistory_content")) {
      // Find direct children of contentDiv that have the class .tradehistory_items
      allItemContainers = Array.from(contentDiv.children).filter((child) =>
        child.classList.contains("tradehistory_items")
      );
    } else {
      addLog(
        `Could not find expected parent (.tradehistory_content) for event ${eventId}. Cannot parse items.`,
        "warning"
      );
      // Keep allItemContainers empty
    }

    // Find ALL containers associated with Lost Items ("-")
    const lostContainers = allItemContainers.filter((container) => {
      const sign = container.querySelector(
        ".tradehistory_items_plusminus"
      )?.innerText;
      return sign === "-";
    });

    lostContainers.forEach((lostContainer) => {
      const lostItemElements = lostContainer.querySelectorAll(".history_item"); // Find all descendants
      lostItemElements.forEach((itemElement) => {
        const appid = itemElement.dataset.appid;
        if (appid !== "730") return;
        const base = extractBaseItemFromHtml(itemElement);
        if (!base) return;
        const enriched = enrichItemWithDescription(base, descriptions["730"]);
        if (enriched) {
          lostItems.push(enriched);
        } else {
          addLog(
            `Lost Item: Could not build item for ${base.id} (lookupId: ${base.lookupId}) in event ${eventId}.`,
            "debug"
          );
        }
      });
    });

    // Find ALL containers associated with Gained Items ("+")
    const gainedContainers = allItemContainers.filter((container) => {
      const sign = container.querySelector(
        ".tradehistory_items_plusminus"
      )?.innerText;
      return sign === "+";
    });

    gainedContainers.forEach((gainedContainer) => {
      const gainedItemElements =
        gainedContainer.querySelectorAll(".history_item"); // Find all descendants
      gainedItemElements.forEach((itemElement) => {
        const appid = itemElement.dataset.appid;
        if (appid !== "730") return;
        const base = extractBaseItemFromHtml(itemElement);
        if (!base) return;
        const enriched = enrichItemWithDescription(base, descriptions["730"]);
        if (enriched) {
          gainedItems.push(enriched);
        } else {
          addLog(
            `Gained Item: Could not build item for ${base.id} (lookupId: ${base.lookupId}) in event ${eventId}.`,
            "debug"
          );
        }
      });
    });
    // --- End Revised Item Parsing Logic ---

    // Check if we actually found any items to process
    if (gainedItems.length === 0 && lostItems.length === 0) {
      // This might happen for events with only non-CSGO items or parsing errors
      addLog(
        `No CS:GO items parsed for event ${eventId} (${eventName}). Skipping further processing.`,
        "debug"
      );
      return null;
    }

    let numericTimestamp = null;
    let timeString = null; // Initialize timeString here
    const rowElement = eventElement.parentElement?.parentElement; // Go up two levels to get .tradehistoryrow
    let dateElement = null;

    if (rowElement && rowElement.classList.contains("tradehistoryrow")) {
      dateElement = rowElement.querySelector(".tradehistory_date");
    } else {
      addLog(
        `Could not find parent .tradehistoryrow for event ${eventId}. Cannot parse date.`,
        "warning"
      );
    }

    // Verify we found the correct date element
    const date = parseDate(
      eventElement.parentElement.parentElement.children[0].innerText
        .trim()
        .replace("\t\t\t", "  ")
    );

    // Adjust timestamp to ensure chronological order
    const adjustedTimestamp = adjustTimestampForChronologicalOrder(date);

    const _eventObject = {
      id: eventId,
      name: eventName,
      gainedItems: gainedItems,
      lostItems: lostItems,
      date: adjustedTimestamp,
      time: timeString, // Keep the separate time string
      type: null,
      tags: [],
    };

    // Determine event type using the existing logic, now with accurate item lists
    const trackableEventType = isTrackableEvent(_eventObject);

    if (trackableEventType) {
      _eventObject.type = trackableEventType;
      // Instead of returning, push/save the event
      try {
        pushIfNotDuplicate(_eventObject);
        // If pushIfNotDuplicate succeeds or returns false (duplicate but ranToEnd is false),
        // we don't need to return anything specific from parseEvent for this path.
        // The event is handled by side effects (saving to DB, updating counts).
        return null; // Indicate successful processing without needing the object returned here.
      } catch (error) {
        if (error.message === "Duplicate event") {
          // This specific error needs to be re-thrown to signal the end of pagination
          throw error;
        }
        // Log other errors from pushIfNotDuplicate/saveEvent if needed, though they should log themselves
        addLog(
          `Error during push/save for event ${eventId}: ${error}`,
          "error"
        );
        return null; // Return null on other errors during push/save
      }
    } else {
      return null; // Not a trackable event
    }
  } catch (error) {
    // Catch general parsing errors OR the re-thrown "Duplicate event" error
    if (error.message === "Duplicate event") {
      // Re-throw specifically for the calling function (processItems) to catch
      throw error;
    }
    // Log other general errors
    addLog(
      `Error parsing event ${eventId}: ${error.stack ? error.stack : error}`,
      "error"
    );
    return null; // Prevent crashing the whole process for other errors
  }
}

function isTrackableEvent(event) {
  // Case opening event
  const isEventExistent = eventIds.has(event.id);
  try {
    if (
      event.name.includes("Unlocked") &&
      ((event.lostItems.length === 1 &&
        event.lostItems[0].type === "Container") ||
        (event.lostItems.length === 2 &&
          event.lostItems.some((item) => item.type === "Container") &&
          event.lostItems.some((item) => item.type === "Key"))) &&
      (event.gainedItems[0].type === "Weapon" ||
        event.gainedItems[0].type === "Gloves") &&
      !event.gainedItems[0].name.includes("Souvenir")
    ) {
      updateCaseCount(event, isEventExistent);
      if (!isEventExistent && trackToggles.cases) {
        counts.totalCases++;
        counts.lastEventTime = Math.min(
          counts.lastEventTime || new Date().getTime(),
          event.date
        );
        if (!counts.firstEventTime) {
          counts.firstEventTime = event.date;
        }
      }
      addLog("Tracked case opening event", "success");
      return trackToggles.cases;
    }
  } catch (error) {
    console.log(error);
  }
  // Souvenir package event
  try {
    if (
      event.name.includes("Unlocked") &&
      event.lostItems[0].type === "Container" &&
      event.gainedItems[0].type === "Weapon" &&
      event.gainedItems[0].name.includes("Souvenir")
    ) {
      if (!isEventExistent && trackToggles.souvenir) {
        counts.totalSouvenirs++;
        counts.lastEventTime = Math.max(counts.lastEventTime || 0, event.date);
      }
      addLog("Tracked souvenir package event", "success");
      return trackToggles.souvenir;
    }
  } catch (error) {
    console.log(error);
  }
  // Trade up event
  if (
    event.name.includes("Crafted") &&
    (event.lostItems.length === 10 || event.lostItems.length === 5) &&
    event.gainedItems.length === 1
  ) {
    if (!isEventExistent && trackToggles.tradeups) {
      counts.totalTradeUps++;
      counts.lastEventTime = Math.max(counts.lastEventTime || 0, event.date);
    }
    return trackToggles.tradeups;
  }
  // Sticker capsule event
  if (
    event.name.includes("Unlocked") &&
    event.lostItems[0].type === "Container" &&
    event.gainedItems[0].type === "Sticker"
  ) {
    if (!isEventExistent && trackToggles.capsules) {
      counts.totalCapsules++;
      counts.lastEventTime = Math.max(counts.lastEventTime || 0, event.date);
    }
    return trackToggles.capsules;
  }
  // Ingame drop event
  if (
    (event.name.includes("Earned a new rank and got a drop") ||
      event.name.includes("Got an item drop")) &&
    event.gainedItems.length > 0
  ) {
    if (!isEventExistent && trackToggles.drops) {
      counts.totalDrops++;
      counts.lastEventTime = Math.max(counts.lastEventTime || 0, event.date);
    }
    return trackToggles.drops;
  }

  // Mission reward event
  if (event.name.includes("Mission reward") && event.date > 1727913600000) {
    if (!isEventExistent && trackToggles.missions) {
      counts.totalMissions++;
      counts.lastEventTime = Math.max(counts.lastEventTime || 0, event.date);
    }
    return trackToggles.missions;
  }

  // Usage of armory pass event
  if (
    event.name.includes("Used") &&
    event.lostItems[0].name.includes("Armory Pass")
  ) {
    if (!isEventExistent && trackToggles.missions) {
      event.lostItems.forEach((item) => {
        if (item.name.includes("Armory Pass")) {
          counts.totalArmoryPassUsage++;
        }
      });
      addLog("Tracked armory pass usage event", "success");
      counts.lastEventTime = Math.max(counts.lastEventTime || 0, event.date);
    }
    return trackToggles.missions;
  }
  // Tournament souvenir drop event
  if (
    event.gainedItems.length === 1 &&
    event.gainedItems[0].name.toLowerCase().includes("souvenir") &&
    event.name.toLowerCase().includes("drop") &&
    event.gainedItems[0].type === "Container"
  ) {
    if (!isEventExistent && trackToggles.tournamentDrops) {
      counts.tournamentDrops++;
      counts.lastEventTime = Math.max(counts.lastEventTime || 0, event.date);
    }
    addLog("Tracked tournament souvenir drop event", "success");
    return trackToggles.tournamentDrops;
  }
  // Arms Dealer purchase event
  if (
    event.name.includes("Purchased from Arms Dealer") &&
    event.gainedItems.length === 1
  ) {
    if (!isEventExistent && trackToggles.armsDealerPurchases) {
      counts.totalArmsDealerPurchases++;
      counts.lastEventTime = Math.max(counts.lastEventTime || 0, event.date);
    }
    addLog("Tracked Arms Dealer purchase event", "success");
    return trackToggles.armsDealerPurchases;
  }
  return false;
}

/**
 * Checks if an event ID already exists, adds it if not, and triggers saving.
 * Throws an error if the event is a duplicate and ranToEnd is true.
 * @param {object} event - The event object to process.
 * @returns {boolean} True if the event was new, false if it was a duplicate (and ranToEnd is false).
 * @throws {Error} "Duplicate event" if the event is a duplicate and ranToEnd is true.
 */
function pushIfNotDuplicate(event) {
  if (!eventIds.has(event.id)) {
    eventIds.add(event.id);
    saveEvent(event);
    return true;
  } else {
    if (ranToEnd) {
      throw new Error("Duplicate event");
    }
    return false;
  }
}

function updateCaseCount(event, isEventExistent = false) {
  const color = event.gainedItems[0].color;
  const weaponName = event.gainedItems[0].name;
  const item = event.gainedItems[0];

  switch (color) {
    case "eb4b4b":
      if (weaponName.includes("★")) {
        if (!isEventExistent) {
          counts.gold++;
          if (counts.gold === 0) {
            counts.firstKnifeCaseCount = 1;
          }
          // Add gold item to display list
          goldItems.push({
            name: item.name,
            image: item.image,
            date: event.date,
          });
          // Update frequency map for most pulled items
          updateItemFrequency(item.name, item.image);
        }
        event.gainedItems[0].color = "d4af37";
      } else {
        if (!isEventExistent) {
          counts.covert++;
          if (counts.gold === 0) counts.casesSinceNoGold++;
          // Update frequency map for most pulled items
          updateItemFrequency(item.name, item.image);
        }
        event.gainedItems[0].color = "eb4b4b";
      }
      break;
    case "d32ce6":
      if (!isEventExistent) {
        counts.classified++;
        if (counts.gold === 0) counts.casesSinceNoGold++;
        // Update frequency map for most pulled items
        updateItemFrequency(item.name, item.image);
      }
      break;
    case "8847ff":
      if (!isEventExistent) {
        counts.restricted++;
        if (counts.gold === 0) counts.casesSinceNoGold++;
        // Update frequency map for most pulled items
        updateItemFrequency(item.name, item.image);
      }
      break;
    case "4b69ff":
      if (!isEventExistent) {
        counts.milspec++;
        if (counts.gold === 0) counts.casesSinceNoGold++;
        // Update frequency map for most pulled items
        updateItemFrequency(item.name, item.image);
      }
      break;
  }
  if (event.gainedItems[0].stattrak) {
    counts.stattrak++;
  }
  return event;
}

// Efficient function to update item frequency
function updateItemFrequency(itemName, itemImage) {
  if (itemFrequencyMap.has(itemName)) {
    itemFrequencyMap.get(itemName).count++;
  } else {
    itemFrequencyMap.set(itemName, {
      count: 1,
      image: itemImage,
    });
  }
}

// --- Inventory age detection & backfill utilities ---
let inventoryAgeRuntime = null; // seconds since epoch
let isBackfilling = false;

// --- Chronological ordering utilities ---
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

function getCurrentProfileUrl() {
  try {
    // Prefer persona link
    const personaLink = document.querySelector(
      ".profile_small_header_text a.persona_name_text_content"
    );
    if (personaLink && personaLink.href) return personaLink.href;

    // Fallback: any whiteLink in header pointing to id/profiles
    const header = document.querySelector(".profile_small_header_texture");
    if (header) {
      const candidate = header.querySelector(
        'a.whiteLink[href*="/id/"] , a.whiteLink[href*="/profiles/"]'
      );
      if (candidate && candidate.href) return candidate.href;
    }
  } catch (_) {}
  return null;
}

async function readInventoryAge() {
  try {
    const data = await chrome.storage.local.get("inventoryAge");
    if (chrome.runtime.lastError) {
      return null;
    }
    const raw = data.inventoryAge;
    if (!raw) return null;
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (
      parsed &&
      typeof parsed.timestamp === "number" &&
      typeof parsed.profileUrl === "string"
    ) {
      return parsed;
    }
  } catch (_) {}
  return null;
}

function writeInventoryAge(obj) {
  try {
    chrome.storage.local.set({ inventoryAge: obj });
  } catch (_) {}
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function hasMoreDataAt(time) {
  // Mirrors pullMoreData request shape but does not mutate state
  const baseUrl = window.location.href.includes("/?")
    ? window.location.href.split("/?")[0]
    : window.location.href;
  const url = `${baseUrl}/?ajax=1&cursor%5Btime%5D=${time}&cursor%5Btime_frac%5D=0&cursor%5Bs%5D=${undefined}&l=english&app%5B%5D=730`;

  let attempts = 0;
  while (attempts < 12) {
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
        addLog("Age detection timeout, waiting 10s", "warning");
        await sleep(10000);
        attempts++;
        continue;
      }
      if (response.status === 500) {
        addLog(
          "Age detection: server error (500) treated as no more data",
          "warning"
        );
        return { hasCursor: false, success: false };
      }

      const data = await response.json();
      // When Steam has more data to paginate, it returns a cursor object
      const hasCursor = !!data?.cursor;
      return { hasCursor, cursor: data?.cursor, success: !!data?.success };
    } catch (err) {
      attempts++;
      await sleep(500);
    }
  }
  return { hasCursor: false, success: false };
}

async function detectInventoryAge(startTime) {
  addLog("Detecting inventory age...", "info");
  const YEAR = 365 * 24 * 60 * 60;
  const MONTH = 30 * 24 * 60 * 60;

  let t = startTime;
  let lastSuccessfulTimestamp = startTime; // Track last timestamp with data
  
  // Phase 1: Step backwards year-by-year, tracking last successful timestamp
  while (true) {
    addLog(
      `Checking for data at ${new Date(t * 1000).toLocaleString()}...`,
      "info"
    );
    const checkTime = t - YEAR;
    const result = await hasMoreDataAt(checkTime);
    
    if (result.hasCursor && result.success) {
      // Data found, update last successful timestamp and continue backwards
      lastSuccessfulTimestamp = checkTime;
      t = checkTime;
      addLog(
        `Data found at ${new Date(checkTime * 1000).toLocaleString()}, continuing...`,
        "info"
      );
      await sleep(120);
    } else {
      // No data found (retry logic already handled in hasMoreDataAt)
      addLog(
        `No cursor found at ${new Date(checkTime * 1000).toLocaleString()}, switching to month-by-month detection...`,
        "info"
      );
      // Switch to month-by-month traversal from last successful timestamp
      break;
    }
  }

  // Phase 2: Step backwards month-by-month from last successful timestamp
  let monthProbe = lastSuccessfulTimestamp;
  let lastSuccessfulMonth = lastSuccessfulTimestamp;

  while (true) {
    monthProbe -= MONTH;

    addLog(
      `Checking for data at ${new Date(monthProbe * 1000).toLocaleString()}...`,
      "info"
    );

    const result = await hasMoreDataAt(monthProbe);
    
    if (result.hasCursor && result.success) {
      // Data found, update last successful month timestamp and continue backwards
      lastSuccessfulMonth = monthProbe;
      addLog(
        `Data found at ${new Date(monthProbe * 1000).toLocaleString()}, continuing...`,
        "info"
      );
      await sleep(120);
    } else {
      // No data found - return the last successful month timestamp as minimum age
      inventoryAgeRuntime = lastSuccessfulMonth;
      const profileUrl = getCurrentProfileUrl();
      if (profileUrl) {
        writeInventoryAge({ profileUrl, timestamp: lastSuccessfulMonth });
      }
      addLog(
        `Detected inventory minimum age at ${new Date(
          lastSuccessfulMonth * 1000
        ).toLocaleDateString()}.`,
        "info"
      );
      return lastSuccessfulMonth;
    }
  }
}

async function startDailyBackstep(fromTime) {
  if (isBackfilling) return;
  isBackfilling = true;
  try {
    const DAY = 24 * 60 * 60;
    const nextTime = Math.max(
      0,
      (fromTime || Math.floor(Date.now() / 1000)) - DAY
    );

    if (inventoryAgeRuntime && nextTime <= inventoryAgeRuntime) {
      addLog("Reached detected inventory age. Finishing.", "info");
      finishedFunction();
      toggleLoading(false);
      return;
    }
    addLog(
      `No more data. Backfilling one day earlier: ${new Date(
        nextTime * 1000
      ).toLocaleString()}`,
      "info"
    );
    // Small delay to mimic pacing
    await sleep(120);
    pullMoreData(nextTime);
  } finally {
    isBackfilling = false;
  }
}
// --- end inventory age utilities ---

function finishedFunction() {
  document.querySelector("#analyticsButton").classList.remove("loading");
  document.querySelector("#forceLoadButton").classList.remove("loading");
  addLog("Reached end of data.", "info");
  finalSave();
  updateGoldPullList();
  displayMostPulledSkins();
  document.querySelector("#stopButton").classList.add("loading");
  document.querySelector("#forceLoadButton").style.display = "block";

  document.querySelector("#firstKnifeCount").innerText =
    counts.firstKnifeCaseCount;
  document.querySelector(".firstKnifeCaseCount").classList.add("active");
  document.querySelector(".bentoGrid").style.display = "flex";
  document.querySelector("#finishedButton").style.display = "block";
  document.querySelector("#forceLoadButton").addEventListener("click", () => {
    document.querySelector("#forceLoadButton").classList.add("loading");
    forceLoad();
  });
  document.querySelector("#finishedButton").addEventListener("click", () => {
    window.location.href = "https://lootspectrum.com/see-more";
  });
  document.querySelector("#forceLoadMessage").style.display = "block";
}
var retries = 0;

async function initiatePulling(time) {
  if (!ranToEnd && eventIds.size > 0) {
    time = counts.lastEventTime / 1000;
  }
  if (!time) {
    if (events.size > 0) {
      time = counts.lastEventTime / 1000;
    } else {
      time = Date.now() / 1000;
    }
  }
  const finishedBox = document.querySelector("#finishedBox");
  if (finishedBox) {
    finishedBox.style.display = "none";
  }
  // Per-profile inventory age: read or detect (skippable via UI toggle)
  if (detectAgeEnabled) {
    try {
      const stored = await readInventoryAge();
      const currentProfileUrl = getCurrentProfileUrl();
      if (
        stored &&
        currentProfileUrl &&
        stored.profileUrl === currentProfileUrl &&
        typeof stored.timestamp === "number"
      ) {
        inventoryAgeRuntime = stored.timestamp;
        addLog(
          `Using stored inventory age: ${new Date(
            inventoryAgeRuntime * 1000
          ).toLocaleDateString()}.`,
          "info"
        );
      } else {
        await detectInventoryAge(time);
      }
    } catch (e) {
      // Non-fatal; proceed without age hint
    }
  } else {
    addLog("Detect Age disabled: starting without age hint.", "info");
  }

  addLog("Starting case pull...", "info");
  // Reset timestamp tracking for each new pull session
  lastEventTimestamp = null;
  pullMoreData(time);
}

async function forceLoad() {
  currentTime = counts.lastEventTime;
  handleLoadingClick();
}

async function handleFixedTimeClick() {
  const _fixedTime = document.querySelector("#fixedTimeInput").value;
  if (!_fixedTime) {
    window.alert(
      "Please enter a valid time! this is a specific feature and might not be required for you. Please contact me on discord if you need help."
    );
    return;
  }
  fixedTime = new Date(_fixedTime).getTime() / 1000;
  handleLoadingClick();
}

async function pullMoreData(time, time_frac, cursor) {
  if (!isLoading) {
    return;
  }
  const baseUrl = window.location.href.includes("/?")
    ? window.location.href.split("/?")[0]
    : window.location.href;
  addLog(
    `Pulling data from ${new Date(time * 1000).toLocaleString()}...`,
    "info"
  );
  fetch(
    `${baseUrl}/?ajax=1&cursor%5Btime%5D=${time}&cursor%5Btime_frac%5D=${
      time_frac ?? 0
    }&cursor%5Bs%5D=${cursor}&&l=english&app%5B%5D=730`,
    {
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
    }
  )
    .then((response) => {
      if (trackToggles.debugLog && debugName) {
        response.json().then((data) => {
          chrome.runtime.sendMessage({
            message: "logResponse",
            debugName: debugName,
            statusCode: response.status,
            body: data,
          });
        });
      }
      if (response.status === 429) {
        addLog("Timeout, waiting 10 seconds", "warning");
        document.querySelector("#timeOutWarning").classList.remove("hidden");
        setTimeout(() => {
          pullMoreData(time, time_frac, cursor);
        }, 10000);
        return;
      }
      document.querySelector("#timeOutWarning").classList.add("hidden");
      response
        .json()
        .then((data) => {
          const html = new DOMParser().parseFromString(data.html, "text/html");
          const childrenRaw = html.querySelectorAll(
            ".tradehistory_event_description"
          );

          const processItems = async () => {
            addLog(
              `Processing ${childrenRaw.length} inventory events...`,
              "info"
            );
            for (const child of childrenRaw) {
              if (ignoreKeys.some((key) => child.innerText.includes(key))) {
                continue;
              }
              try {
                await parseEvent(child, data.descriptions);
              } catch (error) {
                if (error.message === "Duplicate event") {
                  return true;
                }
                addLog("Error parsing event: " + error.message, "error");
              }
            }
            return false;
          };

          processItems().then((foundDuplicate) => {
            if (foundDuplicate && ranToEnd) {
              finishedFunction();
              toggleLoading(false);
              return;
            }

            updateBox();
            // Update real-time stats during run
            updateStatsDuringRun();
            if (!data.cursor) {
              // No more cursor at this point; attempt daily backfill if we have an age hint
              if (inventoryAgeRuntime) {
                startDailyBackstep(time);
              } else {
                finishedFunction();
                toggleLoading(false);
              }
              return;
            }
            if (data.success && data.cursor.time) {
              currentTime = data.cursor.time;
              setTimeout(() => {
                pullMoreData(
                  data.cursor.time,
                  data.cursor.time_frac,
                  data.cursor.s
                );
              }, 100);
            }
          });
        })
        .catch((err) => {
          if (err.message === "Duplicate skin") {
            return;
          } else {
            if (retries < 10) {
              setTimeout(() => {
                pullMoreData(time, time_frac, cursor);
                retries++;
              }, 1000);
            }
          }
        });
    })
    .catch((err) => {
      if (err.status === 429) {
        document.querySelector("#timeOutWarning").classList.remove("hidden");
        setTimeout(() => {
          pullMoreData(time, time_frac, cursor);
        }, 10000);
        return;
      }
      if (err.message === "Duplicate skin") {
        toggleLoading(false);
        addLog("Duplicate skin, skipping...", "info");
        return;
      } else if (retries < 10) {
        setTimeout(() => {
          pullMoreData(time, time_frac, cursor);
          retries++;
        }, 1000);
      } else {
        toggleLoading(false);
        window.alert("Error while pulling data, please try again later.");
      }
    });
}
