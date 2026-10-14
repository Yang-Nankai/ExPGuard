let xiaoqiuserid; chrome.storage.sync.get('_xiaoqiaiuserid', function(items) {      if (items['_xiaoqiaiuserid']) {          xiaoqiuserid = items['_xiaoqiaiuserid']; 
    }  }); chrome.runtime.onMessageExternal.addListener(      function(request, sender, sendResponse) {          if (request.action === 'openOptionsRequest') {         chrome.runtime.openOptionsPage();  		  sendResponse({ status: 'options_requested' });         }        if (request.action === 'getUserId') {                 if (xiaoqiuserid) {                      sendResponse({userId: xiaoqiuserid});                  } else {                      sendResponse({error: '用户ID尚未获取'});                  }              }      }  );chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.setUninstallURL("https://www.xiaoqi-ai.com/uninstall/feedback.html");
});chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: "https://chat.xiaoqi-ai.com/?welcome" });
  }
});chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
        .catch((error) => console.error('Error setting panel behavior:', error));
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openSidebar") {
        chrome.sidePanel.open({
            windowId: sender.tab.windowId
        });

        const messageToSidebar = message.data; 
        console.log("Received message for sidebar:", messageToSidebar);
        if (messageToSidebar) {
            setTimeout(() => {
                chrome.runtime.sendMessage({
                    action: "updateSidepanelContent",
                    data: messageToSidebar
                }).catch(err => {
                    console.error("Delayed sendMessage failed:", err);
                });
            }, 400); 
        }
        sendResponse({ success: true });
        return true; 
    }
});