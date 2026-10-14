/** 
 * Copyright (C) Growbot 2016-2023 - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Growbot <growbotautomator@gmail.com>, 2016-2023
 */

var mainGrowbotTabId = 0;
var lastStoryAcct;
var lastStoryScheduledActionId = null;
var lastStoryScheduledIgUsername = null;
var clickedViewStoryTabIds = [];
/** Action IDs already dispatched to a tab but not yet marked completed (avoids duplicate polls / multi-tab fan-out). */
var inFlightScheduledActionIds = new Set();
var inFlightScheduledTimeouts = new Map();

/** Firefox: per-profile moz-extension Origin is not gecko.id; strip it so db.php allows the request (host_permissions). */
(function growbotInstallFirefoxGrowbotCorsStrip() {
    if (!/firefox/i.test(navigator.userAgent || '')) {
        return;
    }
    if (!chrome.webRequest || !chrome.webRequest.onBeforeSendHeaders) {
        return;
    }
    chrome.webRequest.onBeforeSendHeaders.addListener(
        function (details) {
            return {
                requestHeaders: details.requestHeaders.filter(function (h) {
                    if (!h || !h.name || h.name.toLowerCase() !== 'origin') {
                        return true;
                    }
                    var v = h.value || '';
                    return v.indexOf('moz-extension://') !== 0;
                })
            };
        },
        { urls: ['https://*.growbotforfollowers.com/*'] },
        ['blocking', 'requestHeaders']
    );
})();

function clearInFlightScheduledAction(id) {
    id = String(id);
    var t = inFlightScheduledTimeouts.get(id);
    if (t) {
        clearTimeout(t);
        inFlightScheduledTimeouts.delete(id);
    }
    inFlightScheduledActionIds.delete(id);
}

function normalizeStoryUsername(u) {
    return String(u || '').replace(/^@+/, '').trim().toLowerCase();
}

/** True if tab URL is this user's story rail (not highlights). Username boundary avoids bob vs bobby. */
function tabUrlMatchesUserStory(url, usernameNorm) {
    if (!url || !usernameNorm) return false;
    var u = url.toLowerCase();
    if (u.indexOf('instagram.com') === -1) return false;
    if (u.indexOf('/stories/highlights/') !== -1) return false;
    var esc = usernameNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('/stories/' + esc + '(?:/|$|\\?|#)').test(u);
}

function findTabAlreadyViewingStory(usernameNorm, callback) {
    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabUrlMatchesUserStory(tabs[i].url, usernameNorm)) {
                callback(tabs[i]);
                return;
            }
        }
        callback(null);
    });
}

/** After story tab exists or loads: hide Growbot UI, optional View Story click, optional Like. */
function setupOpenedStoryTab(tabId, likeWhenWatchingStory) {
    function doSetup() {
        chrome.tabs.sendMessage(tabId, {
            hideGrowbot: true
        });

        setTimeout(function () {
            chrome.tabs.sendMessage(tabId, {
                hideGrowbot: true
            });
        }, 3000);

        if (clickedViewStoryTabIds.includes(tabId) == false) {
            setTimeout(function () {
                chrome.tabs.sendMessage(tabId, {
                    clickViewStory: true,
                    clickSomething: true,
                    tabId: tabId
                });
            }, 1234);
        }

        if (likeWhenWatchingStory == true) {
            setTimeout(function () {
                chrome.tabs.sendMessage(tabId, {
                    clickSomething: 'svg[aria-label="Like"][width="24"]',
                    parent: 'div[role="button"]'
                });
            }, 3000);
        }
    }

    chrome.tabs.get(tabId, function (tab) {
        if (chrome.runtime.lastError || !tab) return;
        if (tab.status === 'complete') {
            doSetup();
        } else {
            var listener = function (updatedId, info) {
                if (updatedId === tabId && info.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);
                    doSetup();
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
        }
    });
}


/** Parse auth API JSON; avoid masking CORS/403 failures as a generic network error. */
async function growbotParseAuthApiResponse(resp) {
    var text = await resp.text();
    var data = null;
    if (text) {
        try {
            data = JSON.parse(text);
        } catch (parseErr) {
            data = null;
        }
    }
    if (!data) {
        if (resp.status === 403) {
            return { success: false, error: 'Forbidden' };
        }
        return { success: false, error: 'Server error (HTTP ' + resp.status + ')' };
    }
    if (!resp.ok && !data.error) {
        data.error = 'HTTP ' + resp.status;
    }
    return data;
}

/** Proxy content-script requests to growbotforfollowers.com (Firefox page CSP blocks connect-src). */
function growbotHandleServerFetch(request, sendResponse) {
    (async function () {
        try {
            var init = request.init || {};
            var headers = new Headers(init.headers || {});
            var resp = await fetch(request.url, {
                method: init.method || 'GET',
                headers: headers,
                body: init.body != null && init.body !== '' ? init.body : undefined
            });
            var body = await resp.text();
            var respHeaders = {};
            resp.headers.forEach(function (value, key) {
                respHeaders[key] = value;
            });
            sendResponse({
                ok: resp.ok,
                status: resp.status,
                statusText: resp.statusText,
                headers: respHeaders,
                body: body
            });
        } catch (e) {
            sendResponse({ error: (e && e.message) ? e.message : String(e) });
        }
    })();
    return true;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.action === 'serverFetch') {
        return growbotHandleServerFetch(request, sendResponse);
    }

    if (request.openChromePerformanceSettings === true) {
        chrome.tabs.create({ url: 'chrome://settings/performance' });
        return;
    }

    if (request.scheduledActionFinished != null) {
        clearInFlightScheduledAction(request.scheduledActionFinished);
    }

    if (request.follow) {

        var u = request.follow;

        chrome.tabs.create({
            url: "https://www.instagram.com/" + u.username
        }, function (tab) {
            var tabId = tab.id;
            chrome.tabs.onUpdated.addListener(function (tabId, info) {
                if (info.status === 'complete') {

                    setTimeout(function () {
                        chrome.tabs.sendMessage(tab.id, {
                            hideGrowbot: true
                        });

                        chrome.tabs.sendMessage(tab.id, {
                            clickSomething: 'button div[dir="auto"]:contains("Follow")'
                        });
                    }, 3000);

                    setTimeout(function () {
                        chrome.tabs.remove(tab.id);
                    }, 20000);
                }
            });
        });
    }


    if (request.openReelTab) {

        var shortcode = request.openReelTab.code || request.openReelTab.shortcode;

        chrome.tabs.create({
            url: "https://www.instagram.com/p/" + shortcode
        }, function (tab) {


            var tabId = tab.id;

            chrome.tabs.onUpdated.addListener(function (tabId, info) {
                if (info.status === 'complete' && sender.tab.id == tabId) {
                    chrome.tabs.sendMessage(tabId, {
                        hideGrowbot: true
                    });

                    setTimeout(function () {
                        chrome.tabs.sendMessage(tabId, {
                            hideGrowbot: true
                        });
                    }, 3000);


                    if (request.openReelTab.LikeWhenWatchingReel == true) {
                        setTimeout(function () {
                            // click Like
                            chrome.tabs.sendMessage(tabId, {
                                clickSomething: 'svg[aria-label="Like"][width="24"]',
                                parent: 'div[role="button"]'

                            });
                        }, (((request.openReelTab.video_duration || 20) * 750)));
                    }


                    if (request.openReelTab.SaveWhenWatchingReel == true) {
                        setTimeout(function () {
                            // click Save
                            chrome.tabs.sendMessage(tabId, {
                                clickSomething: 'svg[aria-label="Save"]',
                                parent: 'div[role="button"]'
                            });
                        }, (((request.openReelTab.video_duration || 20) * 750) + 2000));
                    }


                    setTimeout(function () {
                        chrome.tabs.remove(tab.id);
                    }, (((request.openReelTab.video_duration || 20) * 1000) + 1000));
                }
            });



        });

    }


    if (request.closeStoryTab) {
        console.log(mainGrowbotTabId + ' closing ' + lastStoryAcct.username);

        var hasStory = clickedViewStoryTabIds.includes(request.closeStoryTab.tabId);

        chrome.tabs.sendMessage(mainGrowbotTabId, {
            "closedStory": true,
            "acct": lastStoryAcct,
            "tabId": request.closeStoryTab.tabId,
            "viewed": hasStory,
            "scheduledActionId": lastStoryScheduledActionId,
            "scheduledIgUsername": lastStoryScheduledIgUsername
        });

        lastStoryScheduledActionId = null;
        lastStoryScheduledIgUsername = null;

        chrome.tabs.remove(request.closeStoryTab.tabId);
    }

    if (request.openStoryTab) {

        mainGrowbotTabId = sender.tab.id;
        lastStoryAcct = request.openStoryTab.acct;
        lastStoryScheduledActionId = request.openStoryTab.scheduledActionId != null ? request.openStoryTab.scheduledActionId : null;
        lastStoryScheduledIgUsername = request.openStoryTab.scheduledIgUsername || null;

        var storyUserNorm = normalizeStoryUsername(request.openStoryTab.username);
        var likeWhen = request.openStoryTab.LikeWhenWatchingStory == true;

        findTabAlreadyViewingStory(storyUserNorm, function (existing) {
            if (existing && existing.id != null) {
                console.log(mainGrowbotTabId + ' reusing story tab ' + existing.id + ' for @' + storyUserNorm);
                chrome.tabs.update(existing.id, { active: true });
                if (existing.windowId != null) {
                    chrome.windows.update(existing.windowId, { focused: true });
                }
                setupOpenedStoryTab(existing.id, likeWhen);
                return;
            }

            console.log(mainGrowbotTabId + ' opening ' + lastStoryAcct.username);

            chrome.tabs.create({
                url: "https://www.instagram.com/stories/" + request.openStoryTab.username
            }, function (tab) {
                if (!tab || tab.id == null) return;
                setupOpenedStoryTab(tab.id, likeWhen);
            });
        });

        return true;

    }

    if (request.viewedStory) {
        var tabId = sender.tab.id;
        if (clickedViewStoryTabIds.includes(tabId) == false) {
            clickedViewStoryTabIds.push(tabId);
        }
    }


    if (request.updatewanted && request.updatewanted == true) {
        gblIgBotUser.init();
    }

    if (request.guidCookie) {
        // Logged-in session GUID wins unless relink explicitly forces Stripe customer id sync.
        if (!gblIgBotUser.session_token || request.forceGuidSync === true) {
            gblIgBotUser.overrideGuid(request.guidCookie);
            checkInstallDate();
        }
    }

    if (request.ftOver == "true") {
        gblIgBotUser.overrideFT();
    }

    // Handle login request from content script
    if (request.action === 'login') {
        if (request.ig_user && request.ig_user.username) {
            gblIgBotUser.current_ig_username = request.ig_user.username;
        }
        (async () => {
            try {
                const installDate = await gblIgBotUser.getPref('instabot_install_date');
                const loginResponse = await fetch('https://www.growbotforfollowers.com/actions/auth_login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: request.email,
                        password: request.password,
                        device_label: navigator.userAgent,
                        extension_id: gblIgBotUser.device_id || chrome.runtime.id,
                        extension_version: chrome.runtime.getManifest().version,
                        install_date: installDate || undefined,
                        ig_username: gblIgBotUser.current_ig_username || undefined
                    })
                });
                const loginData = await growbotParseAuthApiResponse(loginResponse);
                if (loginData.success) {
                    gblIgBotUser.setSessionToken(loginData.token);
                    if (loginData.guid) {
                        gblIgBotUser.overrideGuid(loginData.guid);
                    }
                    if (loginData.email) {
                        gblIgBotUser.email = loginData.email;
                        gblIgBotUser.setPref('growbot_email', loginData.email);
                    }
                    // Re-check entitlement with session GUID; buy UI only via allLicensesFetched.
                    checkLicenseOnServer();
                    sendResponse({ success: true, session_token: loginData.token, email: loginData.email || request.email, email_verified: loginData.email_verified });
                } else {
                    sendResponse({ success: false, error: loginData.error });
                }
            } catch (e) {
                sendResponse({
                    success: false,
                    error: (e && e.message) ? e.message : 'Network error. Please try again.'
                });
            }
        })();
        return true;
    }

    // Handle registration request from content script
    if (request.action === 'register') {
        if (request.ig_user && request.ig_user.username) {
            gblIgBotUser.current_ig_username = request.ig_user.username;
        }
        (async () => {
            try {
                const installDate = await gblIgBotUser.getPref('instabot_install_date');
                const regResponse = await fetch('https://www.growbotforfollowers.com/actions/auth_register.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: request.email,
                        password: request.password,
                        guid: gblIgBotUser.user_guid,
                        refcode: request.refcode || gblIgBotUser.refcode || '',
                        extension_id: gblIgBotUser.device_id || chrome.runtime.id,
                        install_date: installDate || undefined,
                        ig_username: gblIgBotUser.current_ig_username || undefined
                    })
                });
                const regData = await growbotParseAuthApiResponse(regResponse);
                sendResponse(regData);
            } catch (e) {
                sendResponse({
                    success: false,
                    error: (e && e.message) ? e.message : 'Network error. Please try again.'
                });
            }
        })();
        return true;
    }

    // Handle logout request from content script
    if (request.action === 'logout') {
        (async () => {
            try {
                await fetch('https://www.growbotforfollowers.com/actions/auth_logout.php', {
                    method: 'POST',
                    headers: gblIgBotUser.getAuthHeaders()
                });
            } catch (e) { /* ignore */ }
            gblIgBotUser.clearSessionToken();
            gblIgBotUser.email = '';
            chrome.storage.local.remove('growbot_email');
            sendMessageToInstagramTabs({ loginRequired: true });
            sendResponse({ success: true });
        })();
        return true;
    }

    // Handle setRefcode from content script on growbotforfollowers.com
    if (request.action === 'setRefcode') {
        gblIgBotUser.refcode = request.refcode;
        gblIgBotUser.setPref('growbot_refcode', request.refcode);
        sendResponse({ success: true });
        return true;
    }

    // Look up email by GUID from Stripe
    if (request.action === 'lookupEmail') {
        if (gblIgBotUser.email) {
            sendResponse({ email: gblIgBotUser.email });
        } else {
            (async () => {
                try {
                    const resp = await fetch('https://www.growbotforfollowers.com/actions/auth_lookup_email.php?guid=' + encodeURIComponent(gblIgBotUser.user_guid));
                    const data = await resp.json();
                    if (data.email) {
                        gblIgBotUser.email = data.email;
                    }
                    sendResponse({ email: data.email || null });
                } catch (e) {
                    sendResponse({ email: null });
                }
            })();
        }
        return true;
    }

    // Handle getAuthState request from content script
    if (request.action === 'getAuthState') {
        sendResponse({
            isLoggedIn: !!gblIgBotUser.session_token,
            user_guid: gblIgBotUser.user_guid,
            session_token: gblIgBotUser.session_token,
            refcode: gblIgBotUser.refcode || '',
            email: gblIgBotUser.email || ''
        });
        return true;
    }

    if (request.ig_user) {
        gblIgBotUser.ig_users.push(request.ig_user);
        gblIgBotUser.ig_users = uniq(gblIgBotUser.ig_users);
        gblIgBotUser.current_ig_username = request.ig_user.username;

        if (request.ig_user_account_stats) {
            gblIgBotUser.account_growth_stats.push(request.ig_user_account_stats);
            gblIgBotUser.account_growth_stats = uniq(gblIgBotUser.account_growth_stats);
        }

        checkInstallDate();

        gblIgBotUser.saveToLocal();
        gblIgBotUser.saveToServer();
    }

    if (request.fnc == 'openBuyScreen') {
        openBuyScreen();
    }

    sendResponse();

    return true;

});



var gblIgBotUser = {
    user_guid: undefined,
    session_token: undefined,
    device_id: undefined,
    refcode: undefined,
    install_date: new Date().toUTCString(),
    instabot_install_date: undefined,
    ig_users: [],
    licenses: {},
    actions: [{
        date: '',
        action: ''
    }],
    account_growth_stats: [],
    options: {},
    //      whitelist: [],
    //      savedQueue: [{ name: 'q1',date:datetime,queue:[]},{ name: 'q1',date:datetime,queue:[]}]
    init: async function () {

        runWinVarsScript();

        this.user_guid = await this.getPref('growbot_user_guid');
        this.session_token = await this.getPref('growbot_session_token');
        this.email = await this.getPref('growbot_email');
        this.refcode = await this.getPref('growbot_refcode');
        this.device_id = await this.getPref('growbot_device_id');

        if (!this.user_guid || this.user_guid == false) {
            this.user_guid = this.uuidGenerator();
            this.setPref('growbot_user_guid', this.user_guid);
        }

        if (!this.device_id || this.device_id == false) {
            this.device_id = this.uuidGenerator();
            this.setPref('growbot_device_id', this.device_id);
        }

    },
    overrideGuid: function (newGuid) {
        this.user_guid = newGuid;
        this.setPref('growbot_user_guid', this.user_guid);
    },
    overrideFT: function () {
        this.instabot_free_trial_time = 0;
        openBuyScreen();
    },
    uuidGenerator: function () {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        // Fallback for older environments
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    setSessionToken: function (token) {
        this.session_token = token;
        this.setPref('growbot_session_token', token);
    },
    clearSessionToken: function () {
        this.session_token = undefined;
        chrome.storage.local.remove('growbot_session_token');
    },
    getAuthHeaders: function () {
        const headers = { 'Content-Type': 'application/json' };
        if (this.session_token) {
            headers['Authorization'] = 'Bearer ' + this.session_token;
        }
        try {
            const v = chrome.runtime.getManifest().version;
            if (v) {
                headers['X-Growbot-Extension-Version'] = v;
            }
        } catch (e) { /* ignore */ }
        return headers;
    },
    getPref: async function (name) {
        return new Promise(function (resolve) {
            chrome.storage.local.get(name, function (value) {
                if (Object.keys(value).length > 0) {
                    resolve(value[name]);
                } else {
                    resolve(false);
                }
            });
        });
    },
    setPref: async function (name, value) {
        chrome.storage.local.set({
            [name]: value
        }, function () { });
    },
    saveToLocal: function () {
        chrome.storage.local.set({
            'igBotUser': JSON.stringify(gblIgBotUser)
        }, function () { });
    },
    saveToServer: function () {
        for (var i = 0; i < this.ig_users.length; i++) {
            fetch("https://www.growbotforfollowers.com/igBotUser/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'user_guid': this.user_guid,
                    'ig_username': this.current_ig_username,
                    'install_date': this.install_date,
                    'instabot_install_date': this.instabot_install_date
                })
            });
        }
    }
};


var instabot_free_trial_time = 259200000; // 129600000 = 36 hours, 259200000 = 72 hours, 604800000=7 days, 1296000000 = 14 days, 2592000000 = 30 days
var first_run = false;
var todaysdate = new Date();
var today = todaysdate.getTime();
var timeSinceInstall;

chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.query({
        url: ["https://www.instagram.com/", "https://www.instagram.com/*"],
        currentWindow: true
    }, tabs => {
        if (tabs.length === 0) {
            chrome.tabs.create({
                url: 'https://www.instagram.com/'
            }, function (tab) {
                chrome.tabs.sendMessage(tab.id, {
                    "openGrowbot": true,
                    igBotUser: gblIgBotUser
                });
            });
        } else {
            var toggled = false;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].active === true) {
                    toggled = true;
                    chrome.tabs.sendMessage(tabs[i].id, {
                        "toggleGrowbot": true,
                        igBotUser: gblIgBotUser
                    });
                }
            }
            if (toggled === false) {
                // only runs if instagram wasn't the active tab:
                chrome.tabs.update(tabs[0].id, {
                    active: true
                });
                chrome.tabs.sendMessage(tabs[0].id, {
                    "openGrowbot": true,
                    igBotUser: gblIgBotUser
                });
            }
        }
    });
});


chrome.runtime.onInstalled.addListener(installedOrUpdated);

function installedOrUpdated() {
    gblIgBotUser.init();

    chrome.tabs.create({
        url: "https://www.instagram.com"
    }, function (tab) {

        setTimeout(function () {
            sendMessageToInstagramTabs({
                "extension_updated": true
            });
        }, 5000);

    });
}

function runWinVarsScript() {
    chrome.tabs.query({
        url: ["https://www.instagram.com/*", "https://www.instagram.com/"]
    }, tabs => {
        for (var i = 0; i < tabs.length; i++) {
            var igTabId = tabs[i].id;
            chrome.scripting.executeScript({
                target: {
                    tabId: igTabId
                },
                files: ['winvars.js'],
                world: 'MAIN'
            },
                function () { });
        }
    });
}


async function checkInstallDate() {

    var installDate = await gblIgBotUser.getPref('instabot_install_date');

    if (installDate == false) {
        first_run = true;
        installDate = '' + today;
        gblIgBotUser.setPref('instabot_install_date', installDate);
    }

    gblIgBotUser.instabot_install_date = installDate;

    // string -> int -> date -> UTCString for python
    gblIgBotUser.install_date = new Date(+installDate).toUTCString();
    timeSinceInstall = today - installDate;
    checkLicenseOnServer();

}

function sendMessageToInstagramTabs(message) {
    chrome.tabs.query({
        url: ["https://www.instagram.com/", "https://www.instagram.com/*", "https://www.growbotforfollowers.com/*"]
    }, function (tabs) {
        //if (tabs.length == 0) return false;
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, message).then(response => {
                // console.log("Message from the content script:");
                // console.log(response.response);
            }).catch(function () {
                // console.log('error when: ' + message);
                // console.log(message);
            });
        }
    });
}


function sendMessageToOneInstagramTab(message) {
    chrome.tabs.query({
        url: ["https://www.instagram.com/", "https://www.instagram.com/*"]
    }, function (tabs) {
        //if (tabs.length == 0) return false;
        chrome.tabs.sendMessage(tabs[0].id, message).then(response => {
            // console.log("Message from the content script:");
            // console.log(response.response);
        }).catch(function () {
            // console.log('error when: ' + message);
            // console.log(message);
        });

    });
}



function onError(error) {
    //console.error(`Error: ${error}`);
}

function parseEntitlementCode(raw) {
    var trimmed = String(raw || '').trim();
    if (trimmed === '1' || trimmed === '2' || trimmed === '0') {
        return parseInt(trimmed, 10);
    }
    return null;
}

function checkLicenseOnServer() {
    var url = 'https://www.growbotforfollowers.com/check_subscription.php?guid=' + gblIgBotUser.user_guid + '&ign=' + btoa(gblIgBotUser.current_ig_username);
    console.log(url);
    fetch(url, {
        method: 'GET'
    })
        .then(function (response) {
            if (!response.ok) {
                return null;
            }
            return response.text();
        })
        .then(function (data) {
            console.log(data);

            var code = parseEntitlementCode(data);
            if (code === 1) {
                allLicensesFetched(1, {
                    "growbot_license": 1
                });
            } else if (code === 2) {
                allLicensesFetched(2, {});
            } else if (code === 0) {
                allLicensesFetched(0, {});
            } else {
                allLicensesFetched(0, {});
            }

        })
        .catch(function () {
            allLicensesFetched(0, {});
        });
}

function allLicensesFetched(count, licenses) {
    if (count === 2) {
        // console.log('no license, app in free trial');
        resumePollingForEntitlement();
        sendMessageToInstagramTabs({
            "instabot_install_date": gblIgBotUser.instabot_install_date,
            "instabot_free_trial_time": instabot_free_trial_time,
            "instabot_has_license": false,
            "closeBuyScreen": true,
            igBotUser: gblIgBotUser
        });
    } else if (count === 1) {
        // console.log('has license');
        resumePollingForEntitlement();
        sendMessageToInstagramTabs({
            "instabot_install_date": gblIgBotUser.instabot_install_date,
            "instabot_free_trial_time": instabot_free_trial_time,
            "instabot_has_license": true,
            "closeBuyScreen": true,
            igBotUser: gblIgBotUser
        });
    } else if (count === 0) {
        // console.log('no license,  free trial ENDED');
        suspendPollingForEntitlement();
        openBuyScreen();
    } else {
        suspendPollingForEntitlement();
        openBuyScreen();
    }

    gblIgBotUser.licenses = licenses;

    gblIgBotUser.saveToLocal();
}


function openBuyScreen() {
    //console.log(gblIgBotUser);
    sendMessageToInstagramTabs({
        "openBuyScreen": true,
        igBotUser: gblIgBotUser,
        "instabot_free_trial_time": instabot_free_trial_time
    });
}


function uniq(ar) {
    return Array.from(new Set(ar.map(JSON.stringify))).map(JSON.parse);
}

var pollIntervalMs = 7500;
/** When true (from server config), skip poll.php unless at least one instagram.com tab exists. */
var serverPollOnlyWhenInstagramTabOpen = true;
var pollScheduleTimer = null;
var configRefreshTimer = null;
var pollLoopStarted = false;
/** When false, poll loop is paused (expired trial / no subscription). */
var entitlementAllowsPolling = true;
var CONFIG_REFRESH_MS = 60 * 1000;

var INSTAGRAM_TAB_URLS = ['https://www.instagram.com/', 'https://www.instagram.com/*'];

var EXTENSION_CLIENT_CONFIG_URL = 'https://www.growbotforfollowers.com/extension_client.json';

/** MV3 service workers suspend and lose setTimeout; a repeating alarm re-wakes the worker. Chrome minimum period is 1 minute. */
var KEEPALIVE_ALARM_NAME = 'growbotSwKeepalive';
var KEEPALIVE_ALARM_PERIOD_MIN = .5;

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name !== KEEPALIVE_ALARM_NAME) {
        return;
    }
    if (!pollLoopStarted) {
        return;
    }
    if (pollScheduleTimer === null && entitlementAllowsPolling) {
        scheduleNextPoll();
    }
});

function queryInstagramTabs() {
    return new Promise(function (resolve) {
        chrome.tabs.query({ url: INSTAGRAM_TAB_URLS }, function (tabs) {
            resolve(tabs || []);
        });
    });
}

function isInstagramPageUrl(url) {
    if (!url || typeof url !== 'string') {
        return false;
    }
    return url.indexOf('https://www.instagram.com/') === 0;
}

/** Default true: ask Chrome not to auto-discard Instagram tabs (Memory Saver). */
function keepInstagramTabsAwakeFromOptions(gblOptions) {
    if (!gblOptions || typeof gblOptions.keepInstagramTabsAwake !== 'boolean') {
        return true;
    }
    return gblOptions.keepInstagramTabsAwake;
}

function applyInstagramTabAutoDiscardPolicy(tabId) {
    chrome.storage.local.get('gblOptions', function (data) {
        var keepAwake = keepInstagramTabsAwakeFromOptions(data.gblOptions);
        var allowDiscard = !keepAwake;
        chrome.tabs.get(tabId, function (tab) {
            if (chrome.runtime.lastError || !tab || !tab.url || !isInstagramPageUrl(tab.url)) {
                return;
            }
            chrome.tabs.update(tabId, { autoDiscardable: allowDiscard }, function () {
                void chrome.runtime.lastError;
            });
        });
    });
}

function applyInstagramTabAutoDiscardPolicyToAllOpen() {
    chrome.storage.local.get('gblOptions', function (data) {
        var keepAwake = keepInstagramTabsAwakeFromOptions(data.gblOptions);
        var allowDiscard = !keepAwake;
        chrome.tabs.query({ url: INSTAGRAM_TAB_URLS }, function (tabs) {
            if (!tabs || tabs.length === 0) {
                return;
            }
            for (var i = 0; i < tabs.length; i++) {
                (function (id) {
                    chrome.tabs.update(id, { autoDiscardable: allowDiscard }, function () {
                        void chrome.runtime.lastError;
                    });
                })(tabs[i].id);
            }
        });
    });
}

async function fetchExtensionClientConfig() {
    try {
        var configUrl = new URL(EXTENSION_CLIENT_CONFIG_URL);
        configUrl.searchParams.set('_', String(Date.now()));
        var response = await fetch(configUrl.href);
        if (!response.ok) {
            return;
        }
        var j = await response.json();
        var s = Number(j.poll_interval_seconds);
        if (!isNaN(s)) {
            s = Math.round(s);
            if (s < 1) {
                s = 1;
            }
            if (s > 300) {
                s = 300;
            }
            pollIntervalMs = s * 1000;
        }
        if (typeof j.poll_only_when_instagram_tab_open === 'boolean') {
            serverPollOnlyWhenInstagramTabOpen = j.poll_only_when_instagram_tab_open;
        }
    } catch (e) {
        /* keep existing pollIntervalMs and serverPollOnlyWhenInstagramTabOpen */
    }
}

function clearPollSchedule() {
    if (pollScheduleTimer !== null) {
        clearTimeout(pollScheduleTimer);
        pollScheduleTimer = null;
    }
}

function suspendPollingForEntitlement() {
    entitlementAllowsPolling = false;
    clearPollSchedule();
}

function resumePollingForEntitlement() {
    entitlementAllowsPolling = true;
    if (pollLoopStarted) {
        scheduleNextPoll();
    }
}

function scheduleNextPoll() {
    if (!entitlementAllowsPolling) {
        return;
    }
    clearPollSchedule();
    pollScheduleTimer = setTimeout(function () {
        pollScheduleTimer = null;
        runPollTick();
    }, pollIntervalMs);
}

async function runPollTick() {
    try {
        await pollServer();
    } finally {
        if (entitlementAllowsPolling) {
            scheduleNextPoll();
        }
    }
}

function triggerImmediatePoll() {
    clearPollSchedule();
    runPollTick();
}

var tabOpenPollDebounce = null;
function schedulePollOnInstagramTabOpen() {
    if (tabOpenPollDebounce) {
        clearTimeout(tabOpenPollDebounce);
    }
    tabOpenPollDebounce = setTimeout(function () {
        tabOpenPollDebounce = null;
        triggerImmediatePoll();
    }, 2500);
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url && isInstagramPageUrl(changeInfo.url)) {
        schedulePollOnInstagramTabOpen();
    }
    if (changeInfo.status === 'complete' && tab && tab.url && isInstagramPageUrl(tab.url)) {
        applyInstagramTabAutoDiscardPolicy(tabId);
    }
});

chrome.tabs.onCreated.addListener(function (tab) {
    if (tab && isInstagramPageUrl(tab.url)) {
        schedulePollOnInstagramTabOpen();
    }
    if (tab && tab.id && tab.url && isInstagramPageUrl(tab.url)) {
        applyInstagramTabAutoDiscardPolicy(tab.id);
    }
});

chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName !== 'local' || !changes.gblOptions) {
        return;
    }
    applyInstagramTabAutoDiscardPolicyToAllOpen();
});

function startPollingLoop() {
    if (pollLoopStarted) {
        return;
    }
    pollLoopStarted = true;
    chrome.alarms.create(KEEPALIVE_ALARM_NAME, { periodInMinutes: KEEPALIVE_ALARM_PERIOD_MIN });
    fetchExtensionClientConfig().then(function () {
        runPollTick();
    });
    if (configRefreshTimer !== null) {
        clearInterval(configRefreshTimer);
    }
    configRefreshTimer = setInterval(function () {
        fetchExtensionClientConfig();
    }, CONFIG_REFRESH_MS);
}

async function pollServer() {
    if (!entitlementAllowsPolling) {
        return;
    }

    if (serverPollOnlyWhenInstagramTabOpen) {
        var igTabs = await queryInstagramTabs();
        if (igTabs.length === 0) {
            console.log('No Instagram tabs open, skipping poll');
            return;
        }
    }

    // Don't poll if not logged in
    if (!gblIgBotUser.session_token) {
        console.log('Not logged in, skipping poll');
        sendMessageToInstagramTabs({ loginRequired: true });
        return;
    }

    try {
        const url = new URL("https://www.growbotforfollowers.com/actions/poll.php");

        if (gblIgBotUser.current_ig_username) {
            url.searchParams.append('ig_username', gblIgBotUser.current_ig_username);
        }

        const response = await fetch(url, {
            headers: gblIgBotUser.getAuthHeaders(),
            cache: 'no-store'
        });

        // Handle auth failure
        if (response.status === 401) {
            console.warn('Session expired or invalid, clearing token');
            gblIgBotUser.clearSessionToken();
            sendMessageToInstagramTabs({ loginRequired: true });
            return;
        }

        if (response.status === 403) {
            console.warn('No active subscription, stopping poll loop');
            suspendPollingForEntitlement();
            openBuyScreen();
            return;
        }

        const data = await response.json();

        console.log(data);

        if (data.actions && data.actions.length > 0) {
            console.log(`Received ${data.actions.length} action(s)`);

            const now = Date.now();
            const tenMinutesMs = 10 * 60 * 1000;

            // Group actions by ig_username
            const actionsByUsername = {};
            data.actions.forEach(action => {
                if (!actionsByUsername[action.ig_username]) {
                    actionsByUsername[action.ig_username] = [];
                }
                actionsByUsername[action.ig_username].push(action);
            });

            const actionsToDispatch = [];

            for (const [username, userActions] of Object.entries(actionsByUsername)) {
                let isPastDueForUser = false;

                if (userActions.length > 4) {
                    const scheduledTimes = userActions.map(a => Number(a.scheduledTime));
                    const oldestScheduledTime = Math.min(...scheduledTimes);
                    const hasPastDueActions = scheduledTimes.some(time => (now - time) > tenMinutesMs);

                    if (hasPastDueActions) {
                        isPastDueForUser = true;
                        const offsetMs = now - oldestScheduledTime;
                        const pastDueCount = userActions.filter(a => (now - Number(a.scheduledTime)) > tenMinutesMs).length;
                        console.log(`Actions for ${username} are past due. Oldest: ${new Date(oldestScheduledTime).toLocaleString()}, Offset: ${offsetMs}ms`);

                        // Send message to content script to show dialog and reschedule
                        // Only content scripts matching this username should respond
                        sendMessageToInstagramTabs({
                            "rescheduleRequired": true,
                            "offsetMs": offsetMs,
                            "actionCount": userActions.length,
                            "pastDueCount": pastDueCount,
                            "oldestScheduledTime": oldestScheduledTime,
                            "ig_username": username
                        });
                    }
                }

                // Only process actions if this user is NOT past due check
                if (!isPastDueForUser) {
                    for (const action of userActions) {
                        actionsToDispatch.push(action);
                    }
                }
            }

            // One dispatch per poll (no server LIMIT): avoids bursts (e.g. many story tabs). Skip ids already in-flight.
            if (actionsToDispatch.length > 0) {
                actionsToDispatch.sort(function (a, b) {
                    return Number(a.scheduledTime) - Number(b.scheduledTime);
                });
                for (var di = 0; di < actionsToDispatch.length; di++) {
                    var nextAction = actionsToDispatch[di];
                    if (!inFlightScheduledActionIds.has(String(nextAction.id))) {
                        handleAction(nextAction);
                        break;
                    }
                }
            }
        }

    } catch (error) {
        console.error('Error polling server:', error);
    }
}


function handleAction(action) {
    console.log('Action received:', action);

    const id = String(action.id);
    if (inFlightScheduledActionIds.has(id)) {
        console.log('Skipping duplicate dispatch for action', id);
        return;
    }
    inFlightScheduledActionIds.add(id);
    inFlightScheduledTimeouts.set(id, setTimeout(function () {
        clearInFlightScheduledAction(id);
    }, 180000));

    chrome.tabs.query({
        url: ['https://www.instagram.com/', 'https://www.instagram.com/*']
    }, function (tabs) {
        if (!tabs || tabs.length === 0) {
            clearInFlightScheduledAction(id);
            console.warn('No Instagram tab open; scheduled action not delivered:', id);
            return;
        }

        var tab = tabs.find(function (t) { return t.active; }) || tabs[0];
        chrome.tabs.sendMessage(tab.id, { scheduledAction: action }).catch(function () {
            clearInFlightScheduledAction(id);
        });
    });

    // Show a notification only if the option is enabled
    chrome.storage.local.get('gblOptions', (data) => {
        const opts = data.gblOptions || {};
        if (opts.showNotifications) {
            var target = (action.payload && action.payload.username) ? action.payload.username : '';
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon_128.png',
                title: `Growbot: ${action.type.toUpperCase()}`,
                message: `Account: ${action.ig_username}\nTarget: @${target}`,
                priority: 2
            });
        }
    });

    switch (action.type) {
        case 'follow':
            console.log(`Executing FOLLOW for ${action.payload.username || 'unknown'}`);
            break;
        case 'unfollow':
            console.log(`Executing UNFOLLOW for ${action.payload.username || 'unknown'}`);
            break;
        case 'like':
            console.log(`Executing LIKE for post ${action.payload.post_id || 'unknown'}`);
            break;
        case 'remove_follower':
            console.log(`Executing REMOVE FOLLOWER for ${action.payload.username || 'unknown'}`);
            break;
        case 'block':
            console.log(`Executing BLOCK for ${action.payload.username || 'unknown'}`);
            break;
        default:
            console.warn('Executing scheduled action', action.type);
    }
}

// Initialize user state (load session token), then start server-driven poll loop
gblIgBotUser.init().then(function () {
    startPollingLoop();
    applyInstagramTabAutoDiscardPolicyToAllOpen();
});
