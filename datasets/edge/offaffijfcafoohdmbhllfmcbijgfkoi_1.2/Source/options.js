
function restoreOptions() {
    findStorage().get(["serviceUrl"], function (items) {
        if (items.serviceUrl) {
            document.getElementById('serviceUrl').value = items.serviceUrl;
        }
    });
}

function findStorage() {
    if (chrome.storage !== undefined && chrome.storage.local !== undefined) {
        storage = chrome.storage.local;
    }
    else {
        storage = browser.storage.local;
    }
    return storage;
}

function saveOptions(e) {
    e.preventDefault();
    var serviceUrl = document.getElementById('serviceUrl').value;
     
    findStorage().set({ 'serviceUrl': serviceUrl }, function () {
        console.log('Value is set to ' + serviceUrl);
    });
}
document.querySelector("form").addEventListener("submit", saveOptions);
document.addEventListener("DOMContentLoaded", restoreOptions);
