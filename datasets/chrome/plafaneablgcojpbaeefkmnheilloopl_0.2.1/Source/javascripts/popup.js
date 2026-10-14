// DOM elements
let systemFontCount = document.getElementById('system_font_count');
let pageFontCount = document.getElementById('page_font_count');
let togglePreview_el = document.getElementById('togglePreview');

// Create a port to communicate with background script
let port = chrome.runtime.connect({ name: 'popup' });

// Request font information from background script
port.postMessage({ action: "getFontInfo" });

// Listen for responses from background script
port.onMessage.addListener(function(response) {
  // Update system font count
  if (response.systemFonts && response.systemFonts.length) {
    systemFontCount.textContent = response.systemFonts.length;
  }
  
  // If sync is complete, we could add additional styling if needed
  if (response.syncComplete) {
    // Additional styling could be added here if needed
  }
});

// Get the current active tab to request page font information
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  if (tabs && tabs[0] && tabs[0].id) {
    chrome.tabs.sendMessage(
      tabs[0].id, 
      { action: "getPageFontCount" }, 
      function(response) {
        if (response && response.fontCount !== undefined) {
          pageFontCount.textContent = response.fontCount;
        }
      }
    );
  }
});

// Handle preview button click
togglePreview_el.addEventListener('click', async (event) => {
  // Prevent default anchor navigation
  event.preventDefault();
  
  // Get the current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Send message to content script to toggle overlay
  chrome.tabs.sendMessage(tab.id, { action: 'toggleOverlay' }, (response) => {
    if (response && response.success) {
      // Update button text based on overlay state
      togglePreview_el.textContent = togglePreview_el.textContent === 'Preview Page Fonts' 
        ? 'Hide Font Preview' 
        : 'Preview Page Fonts';
      
      // Close the popup
      window.close();
    }
  });
});
