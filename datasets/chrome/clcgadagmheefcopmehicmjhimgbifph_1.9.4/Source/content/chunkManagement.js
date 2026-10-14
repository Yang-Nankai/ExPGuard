// Database configuration
const DB_NAME = "ScrapedDataDB";
const DB_VERSION = 1;
const STORE_NAME = "events";

/**
 * Version Tracking System
 *
 * The extension now tracks the version of the extension that was running
 * when data was queried from Steam and stored in local storage. This ensures
 * that the sync data page can show the correct version information for the data,
 * even if the extension is updated after the data was queried.
 *
 * Implementation details:
 * - When events are saved to chrome.storage.local, the current extension version
 *   is also stored as "queryVersion" in the same storage.
 * - When data is sent to the sync data page, it uses this stored queryVersion
 *   instead of the current extension version.
 * - This prevents the scenario where a user queries data on version X, updates
 *   to version Y, and then views the sync page with outdated data but showing
 *   the newer version Y.
 */

// Initialize the database
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Create the object store with a date index
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("date", "date", { unique: false });
      }
    };
  });
}

// Updated saveEvents function
async function saveEvents(events, ranToEnd = false) {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    if (ranToEnd) {
      // Get current extension version
      const currentVersion = chrome.runtime.getManifest().version;

      chrome.storage.local.set({
        events: Array.from(events.entries()),
        ranToEnd: ranToEnd,
        queryVersion: currentVersion, // Store the version when the data was queried
      });
    }

    Array.from(events.entries()).forEach(([id, event]) => {
      const request = store.put(event);
      request.onsuccess = () => {
        console.log(`Saved event ${id}`);
      };
      request.onerror = (error) => {
        console.error(`Error saving event ${id}:`, error);
      };
    });

    // Save ranToEnd status in a special record
    await new Promise((resolve, reject) => {
      const request = store.put({ id: "status", ranToEnd });
      request.onsuccess = resolve;
      request.onerror = () => reject(request.error);
    });

    return true;
  } catch (error) {
    console.error("Error saving events:", error);
    throw error;
  }
}

async function finalSave() {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const dateIndex = store.index("date");

  await new Promise((resolve, reject) => {
    const request = store.put({ id: "status", ranToEnd: true });
    request.onsuccess = resolve;
    request.onerror = () => reject(request.error);
  });

  let eventsArray = await new Promise((resolve, reject) => {
    const request = dateIndex.getAll();
    request.onsuccess = () => {
      const filteredEvents = request.result.filter(
        (event) => event.id !== "status"
      );
      resolve(filteredEvents);
    };
    request.onerror = () => reject(request.error);
  });

  // Get current extension version
  const currentVersion = chrome.runtime.getManifest().version;

  chrome.storage.local.set({
    events: eventsArray,
    ranToEnd: true,
    queryVersion: currentVersion, // Store the version when the data was queried
  });
}

async function saveEvent(event) {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    await new Promise((resolve, reject) => {
      const request = store.add(event);
      request.onsuccess = resolve;
      request.onerror = () => reject(request.error);
    });

    return true;
  } catch (error) {
    console.error("Error saving event:", error);
  }
}

async function setRanToEnd(ranToEnd) {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  if (ranToEnd) {
    // Get current extension version
    const currentVersion = chrome.runtime.getManifest().version;

    chrome.storage.local.set({
      events: Array.from(events.entries()),
      ranToEnd: ranToEnd,
      queryVersion: currentVersion, // Store the version when the data was queried
    });
  }

  await new Promise((resolve, reject) => {
    const request = store.put({ id: "status", ranToEnd });
    request.onsuccess = resolve;
    request.onerror = () => reject(request.error);
  });

  return true;
}

// Updated loadEvents function
async function loadEvents() {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const dateIndex = store.index("date");

    // Get all events except the status record
    let eventsArray = await new Promise((resolve, reject) => {
      const request = dateIndex.getAll();
      request.onsuccess = () => {
        const filteredEvents = request.result.filter(
          (event) => event.id !== "status"
        );
        resolve(filteredEvents);
      };
      request.onerror = () => reject(request.error);
    });

    eventsArray = eventsArray.sort((a, b) => b.date - a.date);
    // Create a Map from the eventsArray for backup
    backupEvents = new Map(eventsArray.map((event) => [event.id, event]));

    // Get ranToEnd status
    const status = await new Promise((resolve, reject) => {
      const request = store.get("status");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    // Reset counters
    counts = {
      gold: 0,
      covert: 0,
      classified: 0,
      restricted: 0,
      milspec: 0,
      stattrak: 0,
      casesSinceNoGold: 0,
      firstKnifeCaseCount: 0,
      totalCases: 0,
      totalSouvenirs: 0,
      totalTradeUps: 0,
      tournamentDrops: 0,
      totalCapsules: 0,
      totalDrops: 0,
      totalMissions: 0,
      totalArmoryPassUsage: 0,
      totalArmsDealerPurchases: 0,
      lastEventTime: null,
      firstEventTime: null,
    };

    // Reset real-time stats data structures
    goldItems = [];
    itemFrequencyMap.clear();

    const _pulls = [];

    // Calculate initial counters from events
    eventsArray.forEach((event) => {
      if (event.date < (counts.lastEventTime ?? new Date().getTime())) {
        counts.lastEventTime = event.date;
      }
      if (!counts.firstEventTime) {
        counts.firstEventTime = event.date;
      }

      // Add event ID to Set to prevent duplicates
      eventIds.add(event.id);

      // Process event based on type
      if (
        event.name.includes("Unlocked") &&
        ((event.lostItems?.length === 1 &&
          event.lostItems[0]?.type === "Container") ||
          (event.lostItems?.length === 2 &&
            event.lostItems.some((item) => item.type === "Container") &&
            event.lostItems.some((item) => item.type === "Key"))) &&
        (event.gainedItems?.[0]?.type === "Weapon" ||
          event.gainedItems?.[0]?.type === "Gloves") &&
        !event.gainedItems[0]?.name?.includes("Souvenir")
      ) {
        _pulls.push(event.gainedItems[0]);
        counts.totalCases++;
        // Update rarity counters
        const color = event.gainedItems[0].color;
        const item = event.gainedItems[0];
        if (color === "d4af37") {
          counts.gold++;
          counts.firstKnifeCaseCount = 1;
          // Add gold item to display list
          goldItems.push({
            name: item.name,
            image: item.image,
            date: event.date,
          });
        } else if (color === "eb4b4b") {
          counts.covert++;
          if (counts.gold === 0) {
            counts.casesSinceNoGold++;
          }
          if (counts.gold > 0) counts.firstKnifeCaseCount++;
        } else if (color === "d32ce6") {
          counts.classified++;
          if (counts.gold === 0) {
            counts.casesSinceNoGold++;
          }
          if (counts.gold > 0) counts.firstKnifeCaseCount++;
        } else if (color === "8847ff") {
          counts.restricted++;
          if (counts.gold === 0) {
            counts.casesSinceNoGold++;
          }
          if (counts.gold > 0) counts.firstKnifeCaseCount++;
        } else if (color === "4b69ff") {
          counts.milspec++;
          if (counts.gold === 0) {
            counts.casesSinceNoGold++;
          }
          if (counts.gold > 0) counts.firstKnifeCaseCount++;
        }
        if (event.gainedItems[0].stattrak) {
          counts.stattrak++;
        }

        // Update frequency map for most pulled items
        const itemName = item.name;
        const itemImage = item.image;
        if (itemFrequencyMap.has(itemName)) {
          itemFrequencyMap.get(itemName).count++;
        } else {
          itemFrequencyMap.set(itemName, {
            count: 1,
            image: itemImage,
          });
        }
      } else if (
        event.name.includes("Unlocked") &&
        event.lostItems?.[0]?.type === "Container" &&
        event.gainedItems?.[0]?.type === "Weapon" &&
        event.gainedItems[0]?.name?.includes("Souvenir")
      ) {
        counts.totalSouvenirs++;
      } else if (
        event.name.includes("Unlocked") &&
        event.lostItems?.[0]?.type === "Container" &&
        event.gainedItems?.[0]?.type === "Sticker"
      ) {
        counts.totalCapsules++;
      } else if (
        event.name.includes("Crafted") &&
        (event.lostItems?.length === 10 || event.lostItems?.length === 5) &&
        event.gainedItems?.length === 1
      ) {
        counts.totalTradeUps++;
      } else if (
        event.name.includes("Earned a new rank and got a drop") ||
        event.name.includes("Got an item drop")
      ) {
        counts.totalDrops++;
      } else if (
        event.name.includes("Used") &&
        event.lostItems[0].name.includes("Armory Pass")
      ) {
        event.lostItems.forEach((item) => {
          if (item.name.includes("Armory Pass")) {
            counts.totalArmoryPassUsage++;
          }
        });
      } else if (
        event.name.includes("Earned a souvenir drop") &&
        event.gainedItems?.length === 1 &&
        event.gainedItems[0]?.type === "Container"
      ) {
        counts.tournamentDrops++;
      } else if (
        event.name.includes("Mission reward") &&
        event.date > 1727913600000
      ) {
        counts.totalMissions++;
      } else if (
        event.name.includes("Purchased from Arms Dealer") &&
        event.gainedItems?.length === 1
      ) {
        counts.totalArmsDealerPurchases++;
      }
    });

    // Clear events from memory but keep eventIds Set
    events.clear();
    _pulls.length = 0;
    eventsArray.length = 0;

    return {
      ranToEnd: status ? status.ranToEnd : false,
      lastEventTime: counts.lastEventTime,
    };
  } catch (error) {
    console.error("Error loading events:", error);
    return { ranToEnd: false, lastEventTime: null };
  }
}

async function clearDB() {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  await store.clear();
}

async function getEvents() {
  const data = await chrome.storage.local.get(["events", "queryVersion"]);
  if (data.events) {
    return data;
  }
  return null;
}
