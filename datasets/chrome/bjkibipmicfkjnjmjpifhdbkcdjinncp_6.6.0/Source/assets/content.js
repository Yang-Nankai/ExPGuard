document.addEventListener("updateDataExtensionPopup", (event) => {
    chrome.runtime.sendMessage({data: event.detail}).then(r => {
    })
});

document.addEventListener("openExtensionPopup", (event) => {
    chrome.runtime.sendMessage({data: event.detail}).then(r => {
    })
});