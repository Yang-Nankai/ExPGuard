
window.onload = function () {
    document.querySelector('button').addEventListener('click', function () {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            if (token) {
                chrome.tabs.getCurrent(function (tab) {
                    chrome.tabs.remove(tab.id, function () { });
                });
            }
        });
    });
};