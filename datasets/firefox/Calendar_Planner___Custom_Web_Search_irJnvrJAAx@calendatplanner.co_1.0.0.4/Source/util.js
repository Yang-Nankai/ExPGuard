var utilMap = {
    openNewTab: function () {
    }
};

utilMap.openNewTab = function (url, focusType, timeOut) {
    return openUrl(url, focusType, timeOut);
};

var storageUtil = {
    setItem: function (name, value) {
        if (value !== undefined && value !== null)
            storageReplacer.setLocalStorageItem(name, JSON.stringify(value))
    },

    setItemVal: function (name, value) {
        if (value !== undefined && value !== null)
            storageReplacer.setLocalStorageItem(name, value);
    },

    getItem: function (name) {
        var data = storageReplacer.getLocalStorageItem(name);
        try {
            return JSON.parse(data);
        } catch (err) {
        }
        return data;
    }
};

var optInStorageUtil = {
    setItem: function (name, value) {
        storageUtil.setItem(name, value);
    },

    getItem: function (name) {
        return storageUtil.getItem(name);
    }
};

function openUrl(url, focusType, delay) {
    return new Promise(function (resolve, reject) {
        delay = delay || 0;
        var config = {'active': focusType};
        if (!!url) {
            config['url'] = url;
        }
        setTimeout(function () {
            try {
                chrome.tabs.create(config, function (tab) {
                    resolve(tab.id)
                });
            } catch (e) {
                console.log(e);
            }
        }, delay);
    });
}

function setUninstallUrl() {
    var uninstallUrl = getUninstallUrl();
    try {
        chrome.runtime.setUninstallURL(uninstallUrl);
    } catch (err) {
        console.log("error setting uninstall page", err);
    }
}

function getUninstallUrl() {
    return UNINSTALL_PAGE;
}

