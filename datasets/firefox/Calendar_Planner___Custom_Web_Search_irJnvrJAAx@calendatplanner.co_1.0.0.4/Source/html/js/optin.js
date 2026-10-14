var storageUtil = {
    setItem: function (name, value) {
        if (value !== undefined && value !== null) {
            storageReplacer.setLocalStorageItem(name, JSON.stringify(value))
        }
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


var htmlUtil = {
    onPageLoad: function (callback) {
        document.addEventListener("DOMContentLoaded", callback)
    },

    getElementById: function (id) {
        return document.getElementById(id);
    }
};

var optInKeys = {
    ipAccept: "piiAccept",
    techAccept: "techAccept",
    featureAccept: "featureAccept"
};
var buttonData = {
    IP_BUTTON: {
        storageKey: optInKeys.ipAccept,
        id: "ip_btn",
    },
    TECH_BUTTON: {
        storageKey: optInKeys.techAccept,
        id: "tech_btn"
    }
};

var AGREE_BUTTON = "agreebtn";
var DISAGREE_BUTTON = "disagreebtn";

var messageCommunicator = {
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

function storeAllStates(state) {
    var techButton = document.getElementById(buttonData["TECH_BUTTON"].id);
    var techState = state;
    if (techButton) techState = techButton.checked ? 1 : -1;
    if (state === 1 && techState === 1) {
        optInStorageUtil.setItem(buttonData["TECH_BUTTON"].storageKey, techState);
        optInStorageUtil.setItem(buttonData["IP_BUTTON"].storageKey, techState);
    } else {
        optInStorageUtil.setItem(buttonData["TECH_BUTTON"].storageKey, -1);
        optInStorageUtil.setItem(buttonData["IP_BUTTON"].storageKey, -1);
    }
    chrome.runtime.sendMessage({task: messageCommunicator.optinStateChanged}, function (response) {
    });
}


function closeCurrentPage() {
    chrome.runtime.sendMessage({task: messageCommunicator.closeoptinpage}, function (response) {
    });
}

const BtnEventsListeners = {

    agreeButtonClick: function (e) {
        storeAllStates(1);
        closeCurrentPage();
    },

    disagreeButtonClick: function (e) {
        storeAllStates(-1);
        closeCurrentPage();
    }
};


htmlUtil.onPageLoad(function (event) {

    htmlUtil.getElementById(AGREE_BUTTON).addEventListener("click", BtnEventsListeners.agreeButtonClick);
    htmlUtil.getElementById(DISAGREE_BUTTON).addEventListener("click", BtnEventsListeners.disagreeButtonClick);
});