window.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "read-token") return;
  chrome.storage.sync.get("token", (result) => {
    window.postMessage({ type: "storage-result", value: result.token }, "*");
  });
});
