var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator: "stateCommunicator",
    loadOptInState: "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged",
    handleNotification:"handleNotification"
};

var DOMAIN = "calendarplanner.co/",
    UNINSTALL_PAGE = "https://calendarplanner.co/common/uninstall2_pii.html?appId=15107&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
