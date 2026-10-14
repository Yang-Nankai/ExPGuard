
chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({
        url: 'https://transkriptor.com/' + detected_lang + "/transkriptor-chrome-extension"
      });
  });
  