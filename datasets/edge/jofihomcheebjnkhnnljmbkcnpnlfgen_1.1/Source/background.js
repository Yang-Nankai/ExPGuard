chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      chrome.storage.local.set({ currentTab: { title: tab.title, url: tab.url } });
    });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.storage.local.set({ currentTab: { title: tab.title, url: tab.url } });
    }
  });
  