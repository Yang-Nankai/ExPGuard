var optInKeys = {
    ipAccept: "piiAccept",
    techAccept: "techAccept",
    featureAccept: "featureAccept"
};

var optInDecider = {
    hasOptInInteracted: function () {
        var ipAcceptState = optInStorageUtil.getItem(optInKeys.ipAccept);
        var techAcceptState = optInStorageUtil.getItem(optInKeys.techAccept);
        return ipAcceptState || techAcceptState;
    }
};

function escapeHtml(text) {
    text = "" + (text || "");
    return text.replace(/[\"&\/<>]/g, function (a) {
        return {
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;', '<': '&lt;', '>': '&gt;'
        }[a];
    });
}

var helperMap = {
    killWindowPopups: function () {
    },
    getEncodedString: function () {
    },
    createButtons: function () {
    }
};


helperMap.killWindowPopups = function () {
};

helperMap.getEncodedString = function (description) {
    return description;
};

helperMap.createButtons = function (data, notificationData) {

};

function getExtensionId() {
    var extensionId = "";
    try {
        extensionId = chrome.runtime.id;
    } catch (err) {
        console.log("error while getting chromestore id");
    }
    return extensionId;
}


function getNewTabThemeUrl() {
    return chrome.runtime.getURL('html/homepage.html');
}


var modifyingData = false;
var nameMapper = {};
nameMapper.notificationQueue = "notificationQueue";
nameMapper.notificationIdentifier = "NotificationIdentifier";
nameMapper.showedNotification = "showedNotification";
nameMapper.notificationQueueNotInitialised = "notificationQueueNotInitialised";

nameMapper.notificationInteractor = {
    close: "close",
    userInteraction: "userInteraction",
    timedOut: "timedOut"
};

function getQueuedReminders() {
    var notificationQueue = {};
    try {
        notificationQueue = storageReplacer.getLocalStorageItem(nameMapper.notificationQueue);
        notificationQueue = notificationQueue ? JSON.parse(notificationQueue) : null;
    } catch (err) {
        // console.error(nameMapper.notificationQueueNotInitialised);
    }
    return notificationQueue;
}

function handleNotification(notificationData) {
    if (!modifyingData) {
        modifyingData = true;
        var queuedNotifications = getQueuedReminders();
        switch (notificationData.type) {
            case "edit":
                queuedNotifications[notificationData[nameMapper.notificationIdentifier]] = notificationData;
                break;
            case "set":
                queuedNotifications[notificationData[nameMapper.notificationIdentifier]] = notificationData;
                break;
            case "delete":
                delete queuedNotifications[notificationData[nameMapper.notificationIdentifier]];
                break;
        }
        storageReplacer.setLocalStorageItem(nameMapper.notificationQueue, JSON.stringify(queuedNotifications));
        modifyingData = false;
    } else {
        setTimeout(function () {
            handleNotification(notificationData);
        }, 100);
    }

}

function updateNotificationTimestamp(notification) {
    let dayMillis = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    let weekMillis = 7 * dayMillis;      // 1 week in milliseconds

    let startDateTime = new Date(notification.start);
    let endDateTime = new Date(notification.end);
    let currentTimestamp = notification.timestamp;
    let newTimestamp;

    switch (notification.frequency) {
        case "Daily":
            newTimestamp = currentTimestamp + dayMillis;
            startDateTime.setDate(startDateTime.getDate() + 1);
            endDateTime.setDate(endDateTime.getDate() + 1);
            break;
        case "Weekly":
            newTimestamp = currentTimestamp + weekMillis;
            startDateTime.setDate(startDateTime.getDate() + 7);
            endDateTime.setDate(endDateTime.getDate() + 7);
            break;
        case "Monthly":
            startDateTime.setMonth(startDateTime.getMonth() + 1);
            endDateTime.setMonth(endDateTime.getMonth() + 1);
            newTimestamp = startDateTime.getTime(); // Use the startDateTime as the new timestamp
            break;
        default:
            return;
    }
    notification.timestamp = newTimestamp;

    function formatDateToISOStringLocal(date) {
        const pad = n => n < 10 ? '0' + n : n;
        return date.getFullYear() + '-'
            + pad(date.getMonth() + 1) + '-'
            + pad(date.getDate()) + 'T'
            + pad(date.getHours()) + ':'
            + pad(date.getMinutes());
    }

    notification.start = formatDateToISOStringLocal(startDateTime);
    notification.end = formatDateToISOStringLocal(endDateTime);

    console.log("timestamp:", notification.timestamp);
    console.log("updatedData:", notification);
    return notification;
}


setInterval(function () {
    if (!modifyingData) {
        modifyingData = true;
        var queuedNotifications = getQueuedReminders();
        var currentTime = new Date().getTime();
        var filteredList = {};
        var count = 0;
        for (var i in queuedNotifications) {
            count++;

            if (currentTime > queuedNotifications[i].timestamp && !queuedNotifications[i][nameMapper.showedNotification]) {
                if(queuedNotifications[i].frequency==="Once")
                queuedNotifications[i][nameMapper.showedNotification] = true;
                (function (offset) {
                    setTimeout(function () {
                        showNotification(queuedNotifications[offset]);
                    }, (count) * 1000)
                })(i);
                if(queuedNotifications[i].frequency!="Once"){
                    // console.log("updatedData:",updateNotificationTimestamp(queuedNotifications[i]));
                    filteredList[queuedNotifications[i][nameMapper.notificationIdentifier]] = updateNotificationTimestamp(queuedNotifications[i]);
                }

            } else {

                filteredList[queuedNotifications[i][nameMapper.notificationIdentifier]] = queuedNotifications[i];
            }
        }

        storageReplacer.setLocalStorageItem(nameMapper.notificationQueue, JSON.stringify(filteredList));
        modifyingData = false;
    }
}, 1000);

function showNotification(data) {
    var notificationId = "random" + new Date().getTime();
    var notificationData = {
        type: "basic",
        iconUrl: 'icons/icon.png',
        message: data.description || '', // Using description as a placeholder, adjust based on your data
        title: data.title

    };

    helperMap.createButtons(data, notificationData);

    notificationData.message = "Today" + " " + data.eventStartTime + "\n"  + data.description || '' ;
    chrome.notifications.create(notificationId, notificationData, function () {
    });


    chrome.notifications.onClosed.addListener(function (id, byUser) {
        if (id == notificationId && byUser) {

            chrome.tabs.query({url: "*://" + DOMAIN + "*"}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    try {
                        chrome.tabs.sendMessage(tabs[i].id, {
                            method: "NotificationButtonClick",
                            NotificationData: data
                        }, function (response) {
                        });
                    } catch (e) {
                        console.log("error", e);
                    }
                }
            });


        }
    });

    chrome.notifications.onButtonClicked.addListener(function (id, buttonIndex) {

        if (id == notificationId) {

            chrome.tabs.query({url: "*://" + DOMAIN + "*"}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    try {
                        chrome.tabs.sendMessage(tabs[i].id, {
                            method: "NotificationButtonClick",
                            NotificationData: data,
                            buttonData: data.buttons[buttonIndex]
                        }, function (response) {
                        });
                    } catch (e) {
                        console.log("error", e);
                    }
                }
            });


            if (data.buttons && data.buttons[buttonIndex].action) {
                utilMap.openNewTab(data.buttons[buttonIndex].action, true);
            } else {
                chrome.notifications.clear(id);
            }
        }
    });
}

try {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            switch (request.task) {
                case valueMap.requestKeys.handleNotification: {
                    handleNotification(request.data);
                    break;
                }
            }
        });
} catch (err) {
}





