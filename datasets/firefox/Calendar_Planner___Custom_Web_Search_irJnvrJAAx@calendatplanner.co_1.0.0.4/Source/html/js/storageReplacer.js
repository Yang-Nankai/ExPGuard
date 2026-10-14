var storageReplacer = (function () {
    let localStorageData = {};

    function getLocalStorageItem(key) {
        chrome.storage.local.get([key], function (result) {
            Object.assign(localStorageData, result)
        });
        return localStorageData[key];
    }

    function init() {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get(null, function (results) {
                Object.assign(localStorageData, results)
                resolve();
            });
        })
    }

    init();

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
            localStorageData[key] = newValue;
        }
    });

    function setLocalStorageItem(key, value) {
        localStorageData[key] = value;
        chrome.storage.local.set({[key]: value}, function (r) {
        });
    }

    return {
        setLocalStorageItem: setLocalStorageItem,
        getLocalStorageItem: getLocalStorageItem,
        init: init
    }
})();

