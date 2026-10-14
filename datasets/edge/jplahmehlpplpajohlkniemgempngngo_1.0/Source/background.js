// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ isExtensionEnabled: true }); // Default to enabled
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'downloadImage') {
    chrome.storage.sync.get(['isExtensionEnabled'], (result) => {
      const isEnabled = result.isExtensionEnabled !== false;
      if (isEnabled) {
        const imageUrl = message.imageUrl;
        const filename = imageUrl.split('/').pop().split('?')[0]; // Remove query parameters

        // Initiate the download
        chrome.downloads.download({
          url: imageUrl,
          filename: filename,
          saveAs: false
        });
      }
    });
  }
});