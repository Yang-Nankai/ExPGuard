chrome.runtime.onMessage.addListener(function(message) {
  if (!message || message.type !== 'reloadPledgeTabs') {
    return;
  }
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      if (!tab.url) {
        return;
      }
      if (/^https:\/\/(www\.)?robertsspaceindustries\.com\/(?:[^\/]+\/)?account\/pledges(?:[?#].*)?$/.test(tab.url)) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
});