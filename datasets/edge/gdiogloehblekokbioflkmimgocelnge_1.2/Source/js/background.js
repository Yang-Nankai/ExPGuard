/* globals chrome */
(function () {


    const showPageActionPopup = function (tabId) {

        chrome.action.setIcon({
            tabId: tabId,
            path: "../images/icon19.png"
        }, function () {
            if (!chrome.runtime.lastError) {
                chrome.action.setTitle({
                    tabId: tabId,
                    title: chrome.i18n.getMessage("launch_popup_button")
                });

                chrome.action.setPopup({
                    tabId: tabId,
                    popup: 'html/popup.html'
                });
            } else {
                console.log(chrome.runtime.lastError.message);
            }
        });
    };

    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        switch (msg.action) {
            case 'prepare':
                chrome.storage.session.set({[sender.tab.id]: msg}).then(() => {
                showPageActionPopup(sender.tab.id, msg);
                });
                break;
            default:
                break;
        }
    });
    chrome.runtime.onConnect.addListener(function(port) {
        console.assert(port.name === "com.wordpress-theme-detector");
        port.onMessage.addListener(function(msg) {
            switch (msg.action) {
            case 'get':
                    chrome.storage.session.get(msg.tabId.toString(), data => {
                        port.postMessage({data: data[msg.tabId]});
                    });
                break;
            default:
                break;
        }

        });
    });

    chrome.tabs.onRemoved.addListener(function (tabId) {
        // free memory
        chrome.storage.session.remove([tabId.toString()])
    });

})();