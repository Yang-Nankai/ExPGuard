// New tab on install
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: chrome.runtime.getURL("pages/main.html"),
    });
  }
});

// New tab on icon click 
chrome.action.onClicked.addListener(function (_tab) {
  chrome.tabs.create({ url: chrome.runtime.getURL("pages/main.html") });
});

chrome.runtime.onMessage.addListener(function(message, _sender, _sendResponse) {
  if (message.action === "openPlayer") {
      chrome.tabs.create({ url: "pages/player.html?link=" + encodeURIComponent(message.url)});
  }
});

// Set headers on create internal player
chrome.runtime.onMessage.addListener(function (e, sender) {
  if (e.type === "CV_MODIFY_HEADERS") {
    console.log("Internal Player created");
    console.log("Event", e);
    console.log("Rules before", chrome.declarativeNetRequest.getSessionRules());

    const extensionId = chrome.runtime.id;
    const tabId = sender.tab.id
    const reqHeaderData = e.req_data;
    const resHeaderData = e.res_data;

    const refererIndex = reqHeaderData.findIndex(item => item.key == "Referer");
    const originIndex = reqHeaderData.findIndex(item => item.key == "Origin");

    if (refererIndex !== -1 && originIndex === -1) {
      reqHeaderData.push({
        key: "Origin",
        value: `${reqHeaderData[refererIndex].value}`,
      });
    }

    if (refererIndex !== -1) {
      reqHeaderData[refererIndex].value = `${reqHeaderData[refererIndex].value}/`;
    }

    const reqHeaderRules = reqHeaderData.map(header => ({
      operation: chrome.declarativeNetRequest.HeaderOperation.SET,
      header: header.key,
      value: header.value,
    }));
    
    const resHeaderRules = resHeaderData.map(header => ({
      operation: chrome.declarativeNetRequest.HeaderOperation.SET,
      header: header.key,
      value: header.value,
    }));

    const rules = [
      {
        id: tabId,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders: reqHeaderRules,
          responseHeaders: resHeaderRules,
        },
        condition: {
          "initiatorDomains": [extensionId, "player.cvplayer.net"],
          "tabIds": [tabId],
          "resourceTypes": ["media", "xmlhttprequest"],
        },
      },
    ];

    chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: rules.map((r) => r.id),
      addRules: rules,
    });

    console.log("Rules after", chrome.declarativeNetRequest.getSessionRules());
  }
});

// Set headers on create external player
chrome.runtime.onMessageExternal.addListener(function (e, sender) {
  if (e.type === "CV_MODIFY_HEADERS") {
    console.log("External Player created");
    console.log("Event", e);
    console.log("Rules before", chrome.declarativeNetRequest.getSessionRules());

    const extensionId = chrome.runtime.id;
    const tabId = sender.tab.id
    const reqHeaderData = e.req_data;
    const resHeaderData = e.res_data;

    const refererIndex = reqHeaderData.findIndex(item => item.key == "Referer");
    const originIndex = reqHeaderData.findIndex(item => item.key == "Origin");

    if (refererIndex !== -1 && originIndex === -1) {
      reqHeaderData.push({
        key: "Origin",
        value: `${reqHeaderData[refererIndex].value}`,
      });
    }

    if (refererIndex !== -1) {
      reqHeaderData[refererIndex].value = `${reqHeaderData[refererIndex].value}/`;
    }

    const reqHeaderRules = reqHeaderData.map(header => ({
      operation: chrome.declarativeNetRequest.HeaderOperation.SET,
      header: header.key,
      value: header.value,
    }));
    
    const resHeaderRules = resHeaderData.map(header => ({
      operation: chrome.declarativeNetRequest.HeaderOperation.SET,
      header: header.key,
      value: header.value,
    }));

    const rules = [
      {
        id: tabId,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders: reqHeaderRules,
          responseHeaders: resHeaderRules,
        },
        condition: {
          "initiatorDomains": [extensionId, "player.cvplayer.net"],
          "tabIds": [tabId],
          "resourceTypes": ["media", "xmlhttprequest"],
        },
      },
    ];

    chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: rules.map((r) => r.id),
      addRules: rules,
    });

    console.log("Rules after", chrome.declarativeNetRequest.getSessionRules());
  }
});

// Remove rules on tab close
chrome.tabs.onRemoved.addListener(function (tabId, _changeInfo, _tab) {
  console.log("Tab closed", tabId);
  console.log("Rules before", chrome.declarativeNetRequest.getSessionRules());

  chrome.declarativeNetRequest.getSessionRules(function (rules) {
    const ruleIds = rules.map((rule) => rule.id).filter((id) => id === tabId);
    chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: ruleIds,
    });
  });

  console.log("Rules after", chrome.declarativeNetRequest.getSessionRules());
});