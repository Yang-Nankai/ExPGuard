let ld = null, uid = 'org';
let service_host = 'https://afterdarkmode.com';


chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    if (sender.origin === service_host && request.id) {
        chrome.storage.local.set({ 'id': request.id }, function(){
            updateRules(request.id);
        });
    }
});

function updateRules(id) {
    fetch(chrome.runtime.getURL('rules.json'))
        .then(response => {
            return response.json();
        })
        .then(d => {
            d.addRules[0].action.redirect.transform.queryTransform.addOrReplaceParams[0].value = id;
            chrome.declarativeNetRequest.updateDynamicRules(d);
        });
}

chrome.runtime.onInstalled.addListener(function (details) {
    let now = Date.now() / 1000;
    let version = chrome.runtime.getManifest().version;
    let url = '';
    if (details.reason === "install" || details.reason === "update") {
        chrome.storage.sync.set({
            'installed_at' : now
        }, function() {});

        url = service_host+'/installed.php?extid=' + encodeURIComponent(chrome.runtime.id) +
            '&version='+encodeURIComponent(version)+
            '&reason='+encodeURIComponent(details.reason);
        chrome.tabs.create({ url: url });
    }
});

