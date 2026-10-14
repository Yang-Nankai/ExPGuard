var numberOfOpenedCases = 0;
var containerLabel = "Unlocked a container";
const ignoreKeys = ["Earned due to game play time"];
var ranToEnd = false;
var fixedTime = null;
var isLoading = false;
const chunkSize = 1000;
var lastDateChecked = null;
var debugName = null;
var counts = {
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
  totalCapsules: 0,
  totalDrops: 0,
  totalMissions: 0,
  totalArmoryPassUsage: 0,
  tournamentDrops: 0,
  totalArmsDealerPurchases: 0,
  lastEventTime: null,
  firstEventTime: null,
};
const trackToggles = {
  cases: true,
  souvenir: true,
  drops: true,
  missions: true,
  capsules: true,
  tradeups: true,
  debugLog: false,
  tournamentDrops: true,
  armsDealerPurchases: true,
};

// Age detection toggle (UI default: enabled)
var detectAgeEnabled = true;

var events = new Map();
const eventIds = new Set();
/*
Event is an object with the following properties (stored as Map values):
- id: string - the first item in the event determines the id of the event (also used as Map key)
- name: string - the event description determines the name of the event
- date: Date - provided by steam on minute level of precision, if an event already has the date, a millisecond precision is added
- lostItems: Array<Object> - the items that were lost in the event, e.g. through case opening you lose the key and case.
  - id: string - the id of the item
  - name: string - the name of the item
  - image: string - the image url of the item
  - color?: string - the color of the item
  - wear?: string - the wear of the item
  - stattrak?: boolean - whether the item is stattrak
  - type?: string - the type of the item, e.g. "case" or "item"
  - collection?: string - the name of the collection
- gainedItems: Array<Object> - the items that were gained in the event, e.g. through case opening you gain an item.
  - id: string - the id of the item
  - name: string - the name of the item
  - image: string - the image url of the item
  - color?: string - the color of the item
  - wear?: string - the wear of the item
  - stattrak?: boolean - whether the item is stattrak
  - type?: string - the type of the item, e.g. "case" or "item"
  - collection?: string - the name of the collection
*/
var backupEvents = new Map();
var currentTime = null;

// Efficient data structures for real-time stats
var goldItems = []; // Array to store gold items for display
var itemFrequencyMap = new Map(); // Map to track item frequencies efficiently
var lastStatsUpdate = 0; // Timestamp of last stats update
const STATS_UPDATE_INTERVAL = 1000; // Update stats every 1 second during run
