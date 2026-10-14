function onInstallHandler() {
    handleInstall();
}

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        onInstallHandler();
    } else if (details.reason === "update") {
        setUninstallUrl();
    }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === 'piiAccept') {
            chrome.tabs.query({url: "moz-extension://*/html/optin.html"}, function (tabs) {
                for (const tab of tabs) {
                    chrome.tabs.remove(tab.id);
                }
            });
        }
    }
});
function handleInstall() {
    fireInstalledSuccessfully();
    setUninstallUrl();
}

function fireInstalledSuccessfully() {
    try {
        chrome.tabs.query({url: "*://" + DOMAIN + "*"}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                try {
                    chrome.tabs.sendMessage(tabs[i].id, {method: "Installed"}, function (response) {
                    });
                } catch (e) {
                    console.log("error", e);
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

chrome.browserAction.onClicked.addListener(function (tab) {
    var newTabUrlToOpen = getNewTabThemeUrl();
    utilMap.openNewTab(newTabUrlToOpen, true).then(function (tabId) {
    });
});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var a = document.createElement("a");
    a.href = chrome.runtime.getURL("html/homepage.html");

    if (changeInfo.status && changeInfo.status == "complete" && tab.url.indexOf(a.host) > -1 && (tab.url.indexOf("newtab") > -1 || tab.url.indexOf("homepage") > -1)) {
        if (!optInDecider.hasOptInInteracted())
            utilMap.openNewTab(OPTIN_PAGE);
    }
});