window.addEventListener("message", (event) => {
  const key = event.data && event.data.key;
  chrome.storage.sync.get(key, (result) => {
    window.postMessage({ type: "storage-result", value: result[key] }, "*");
  });
});
