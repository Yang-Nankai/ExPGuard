// Version check and injection logic
var version = chrome.runtime.getManifest().version;
var configURL = "https://s3.amazonaws.com/BoomerangForGmail/bookmarklet/b4gconfig.json";

localStorage.setItem("b4g_frame_url", chrome.runtime.getURL('inbox_pause_dialog.html'))
localStorage.setItem("b4g_login_frame_url", chrome.runtime.getURL('login_dialog.html'))

function inject_js(src) {
    var script = document.createElement("script");
    script.src = src;
    script.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

function inject_css(src) {
    var link = document.createElement("link");
    link.href = src;
    link.type = "text/css";
    link.rel = 'stylesheet';
    (document.head || document.documentElement).appendChild(link);
}

function inject_boomerang(version) {
    var bookmarklet_url = chrome.runtime.getURL("b4g_bookmarklet_" + version + ".js");
    var css1 = chrome.runtime.getURL("css/extensionsafestyle_" + version + ".css");
    var css2 = chrome.runtime.getURL("css/extensionsafejqueryui_" + version + ".css");

    inject_js(bookmarklet_url);
    inject_css(css1);
    inject_css(css2);
}

function boomerang_version_exists(version) {
    var resources = chrome.runtime.getManifest().web_accessible_resources[0]["resources"];
    let js = "b4g_bookmarklet_" + version + ".js";
    let css1 = "css/extensionsafestyle_" + version + ".css";
    let css2 = "css/extensionsafejqueryui_" + version + ".css";
    return resources.includes(js) && resources.includes(css1) && resources.includes(css2);
}

// https://stackoverflow.com/a/6832721 tests: https://jsfiddle.net/6d1cy9vn/
function versionCompare(v1, v2) {
    var v1parts = v1.split('.');
    var v2parts = v2.split('.');

    function isValidPart(x) {
        return /^\d+$/.test(x);
    }
    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }
        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }
    if (v1parts.length != v2parts.length) {
        return -1;
    }
    return 0;
}

fetch(configURL).then(r => r.text()).then(result => {
    var response = JSON.parse(result);

    // Block loading Boomerang if necessary
    var blockBoomerang = (response["blockLoadingOfBoomerang"] == null) ? false : response["blockLoadingOfBoomerang"];
    if (blockBoomerang && 
        ((typeof blockBoomerang == "boolean" && blockBoomerang === true) ||
        (typeof blockBoomerang == "string" && blockBoomerang.toLowerCase() == "true"))) {
        // Don't load Boomerang
    } else {
        // Check min version requirement
        var minVersionObj = response["minVersion"];
        if (minVersionObj && minVersionObj["ver"] && (versionCompare(version, minVersionObj["ver"]) < 0)) {
            // User's version is older than minVersion
            var message = minVersionObj["message"];
            if (message) {
                showServerMessage(message);
            }
            var blockBoomerang = (minVersionObj["blockLoadingOfBoomerang"] == null) ? false : minVersionObj["blockLoadingOfBoomerang"];
            if ((typeof blockBoomerang == "boolean" && blockBoomerang === true) ||
                (typeof blockBoomerang == "string" && blockBoomerang.toLowerCase() == "true")) {
                // Don't load Boomerang
            } else {
                inject_boomerang(version);
            }
            return;
        }

        // Check max version requirement for rollback
        var maxVersionObj = response["maxVersion"];
        if (maxVersionObj && maxVersionObj["ver"] && (versionCompare(version, maxVersionObj["ver"]) > 0)) {
            // User's version is newer than maxVersion.
            var message = maxVersionObj["message"];
            if (message) {
                showServerMessage(message);
            }
            maxVersion = maxVersionObj["ver"];
            if (boomerang_version_exists(maxVersion)) {
                inject_boomerang(maxVersion);
            } else {
                var blockBoomerang = (maxVersionObj["blockLoadingOfBoomerang"] == null) ? false : maxVersionObj["blockLoadingOfBoomerang"];
                if ((typeof blockBoomerang == "boolean" && blockBoomerang === true) ||
                    (typeof blockBoomerang == "string" && blockBoomerang.toLowerCase() == "true")) {
                    // Don't load Boomerang
                } else {
                    inject_boomerang(version);
                }
            }
            return;
        }

        // Check for gradual rollout release
        var rollout = response["rollout"];
        if (rollout && rollout["buckets"] && rollout["prev"] && Array.isArray(rollout["buckets"])) {
            wait_to_get_gmail_user(function(guser) {
                var firstLetter = guser.toLowerCase()[0];
                var previousVersion = rollout["prev"];
                var buckets = rollout["buckets"];

                for(var i = 0; i<buckets.length; i++) {
                    var letters = buckets[i]["letters"];
                    var ver = buckets[i]["ver"];
                    var inBucket = letters.indexOf(firstLetter) != -1;
                    var hasVersion = boomerang_version_exists(ver);
                    if (letters && ver && inBucket && hasVersion) {
                        inject_boomerang(ver);
                        return
                    }
                }
                if (boomerang_version_exists(previousVersion)) {
                    inject_boomerang(previousVersion);
                } else {
                    // Not in rollout, but the specified version is not available so just load the latest known version.
                    inject_boomerang(version);
                }
            });
        } else {
            inject_boomerang(version);
        }
    }

    // Check for messages to show
    var message = response["message"];
    if (message) {
        showServerMessage(message);
    }

    // Check for domains with special cases
    var inboxPauseSpecialCaseDomains = response["inboxPauseSpecialCaseDomains"];
    if (inboxPauseSpecialCaseDomains) {
        localStorage.setItem("b4g_inbox_pause_special_case_domains", JSON.stringify(inboxPauseSpecialCaseDomains));
    }
    // Check for UI experiments
    var meetMenuExperiment = response["meetMenuExperiment"];
    if (meetMenuExperiment) {
        localStorage.setItem("b4g_meet_menu_experiment_status", meetMenuExperiment);
    }
})

/**
 * Gets the current GMail or Google Apps account in the form of an e-mail address.
 * @return The GMail or Google Apps account's e-mail address
 */
function get_gmail_user() {
    var emailRegEx = /[a-zA-Z0-9\._+\-]+@[a-zA-Z0-9\.\-]+\.[a-z\.A-Z]+/g;
 
    // fetch the email address from the header icon text.
    // if the icon text has a match for our address, store it.
    // We assume that there will be only one email address in the icon text,
    // and that the first email found is the correct one
    var address = "";
    document.querySelectorAll("header a[aria-expanded]").forEach((elem) => {
        var label = elem.getAttribute("aria-label");
        var regex = emailRegEx.exec(label);
        if (regex) {
            address = regex;
            return false;
        }
    });

    if (!address) {
        address = "";
        var titleWords = document.title.split(" ");
        for(var i = 0; i<titleWords.length; i++)
        {
            var extractedAddress = emailRegEx.exec(titleWords[i]);
            if (extractedAddress) {
                address = extractedAddress[0];
            }
        }
    } else {
        address = address[0];
    }
    return address;
}
 
function wait_to_get_gmail_user(callback) {
    function pollAddress(maxIterations) {
        var address = get_gmail_user();
        if (!!address) {
            callback(address);
        } else if (maxIterations > 0) {
            setTimeout(function() {
                pollAddress(maxIterations - 1);
            }, 1000)
        } else {
            callback("");
        }
    }
    function poll() {
        var loadingElement = document.getElementById("loading");
        // Checks if element is visible without jquery https://stackoverflow.com/a/33456469/482536
        if (!( loadingElement.offsetWidth || loadingElement.offsetHeight || loadingElement.getClientRects().length )) {
            clearInterval(gmailLoadTimer);
            pollAddress(5);
        }
    }
    var gmailLoadTimer = setInterval(poll, 1000);
    poll();
}

// Message-passing: Web Page to Content-script
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window){
        return;
    }

    if (event.data.type && (event.data.type == "B4G_TRACK_EVENT")) {
        var trackedEventData = event.data.trackedEventData;
        chrome.runtime.sendMessage({greeting: "track_event", data: trackedEventData});
    }
    else if (event.data.type && (event.data.type == "B4G_RESPONDABLE_INPUT")) {
        // Message-passing: Content-script to Background page
        chrome.runtime.sendMessage({greeting: "respondable_input", composeBodyText: event.data.composeBodyText, subject: event.data.subject});
    }
    else if (event.data.type && (event.data.type == "B4G_OPEN_TAB")) {
        chrome.runtime.sendMessage({greeting: "open_tab", url: event.data.url, top: event.data.top, left: event.data.left,
                height: event.data.height, width: event.data.width,
            }, function(response){
            window.postMessage({ type: "B4G_CLOSE_TAB"}, "*");
        });
    }

}, false);

// Message-passing: Background page to Content-script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "respondable_output") {
            // Message-passing: Content-script to web page
            window.postMessage({ type: "B4G_RESPONDABLE_OUTPUT", metrics: request.metrics }, "*");
        }
        else if (request.greeting == "get_ga_cid") {
            ga_cid = localStorage.getItem("b4g_ga_cid");
            if (ga_cid == null) {
                ga_cid = uuidv4()
                localStorage.setItem("b4g_ga_cid", ga_cid)
            }
            sendResponse({ga_cid: ga_cid})
        }
});

// Taken from https://stackoverflow.com/a/2117523
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}  

// Troubleshooting page

var _params;
function parse_url_params() {
    _params = {};
    var loc = window.location.toString();
    var idxQ = loc.indexOf("?");
    var idxH = loc.lastIndexOf("#");
    if(idxQ < 0) { return; }
    if(idxH < 0) { idxH = loc.length; }
    var pairs = loc.substring(idxQ + 1, idxH).split("&");
    pairs.forEach(function(pair) {
        var idxE = pair.indexOf("=");
        _params[pair.substr(0, idxE)] = pair.substr(idxE + 1);
    });
}
parse_url_params();

if (_params["b4g_troubleshoot"] === "1"){
    // look for extension conflicts and make them known to the bookmarklet
    chrome.runtime.sendMessage({greeting: "list_extensions"}, function(response) {});
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.greeting == "extensions"){
                var extensionsArray = [];   
                var extensions = request.extensions;
                for (var i=0; i<extensions.length; i++){
                    var extension = extensions[i];
                    var extensionName = extension.shortName;
                    if (extension.enabled){
                        extensionsObject = {"id": extension.id,
                            "name": extensionName};
                        extensionsArray.push(extensionsObject);
                    }
                }
                localStorage.setItem("b4g_extensions", JSON.stringify(extensionsArray));
            }
        }
    );
}
