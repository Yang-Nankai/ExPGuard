let isExtensionEnabled = true; // Default state

// Load initial state
chrome.storage.sync.get(['isExtensionEnabled'], (result) => {
  isExtensionEnabled = result.isExtensionEnabled !== false;
});

// Listen for state changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleState') {
    isExtensionEnabled = message.isEnabled;
  }
});

document.addEventListener('dblclick', (event) => {
  if (isExtensionEnabled && event.target.tagName.toLowerCase() === 'img') {
    const imageUrl = event.target.src;
    chrome.runtime.sendMessage({ action: 'downloadImage', imageUrl });
  }
});