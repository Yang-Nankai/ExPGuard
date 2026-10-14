/** 
 * Copyright (C) Growbot 2016-2023 - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Growbot <growbotautomator@gmail.com>, 2016-2023
 */

var GrowbotI18n = (function () {
    var LOCALE_LABELS = {
        am: 'Amharic',
        ar: 'Arabic',
        bg: 'Bulgarian',
        bn: 'Bengali',
        ca: 'Catalan',
        cs: 'Czech',
        da: 'Danish',
        de: 'German',
        el: 'Greek',
        en: 'English',
        en_AU: 'English (AU)',
        en_GB: 'English (UK)',
        en_US: 'English (US)',
        es: 'Spanish',
        es_419: 'Spanish (Latin America)',
        et: 'Estonian',
        fa: 'Persian',
        fi: 'Finnish',
        fil: 'Filipino',
        fr: 'French',
        gu: 'Gujarati',
        he: 'Hebrew',
        hi: 'Hindi',
        hr: 'Croatian',
        hu: 'Hungarian',
        id: 'Indonesian',
        it: 'Italian',
        ja: 'Japanese',
        kn: 'Kannada',
        ko: 'Korean',
        lt: 'Lithuanian',
        lv: 'Latvian',
        ml: 'Malayalam',
        mr: 'Marathi',
        ms: 'Malay',
        nl: 'Dutch',
        no: 'Norwegian',
        pl: 'Polish',
        pt: 'Portuguese',
        pt_BR: 'Portuguese (BR)',
        pt_PT: 'Portuguese (PT)',
        ro: 'Romanian',
        ru: 'Russian',
        sk: 'Slovak',
        sl: 'Slovenian',
        sr: 'Serbian',
        sv: 'Swedish',
        sw: 'Swahili',
        ta: 'Tamil',
        te: 'Telugu',
        th: 'Thai',
        tr: 'Turkish',
        uk: 'Ukrainian',
        vi: 'Vietnamese',
        zh_CN: 'Chinese (Simplified)',
        zh_TW: 'Chinese (Traditional)'
    };

    var LOCALE_NATIVE = {
        am: 'አማርኛ',
        ar: 'العربية',
        bg: 'Български',
        bn: 'বাংলা',
        ca: 'Català',
        cs: 'Čeština',
        da: 'Dansk',
        de: 'Deutsch',
        el: 'Ελληνικά',
        en: 'English',
        en_AU: 'English',
        en_GB: 'English',
        en_US: 'English',
        es: 'Español',
        es_419: 'Español (Latinoamérica)',
        et: 'Eesti',
        fa: 'فارسی',
        fi: 'Suomi',
        fil: 'Filipino',
        fr: 'Français',
        gu: 'ગુજરાતી',
        he: 'עברית',
        hi: 'हिन्दी',
        hr: 'Hrvatski',
        hu: 'Magyar',
        id: 'Bahasa Indonesia',
        it: 'Italiano',
        ja: '日本語',
        kn: 'ಕನ್ನಡ',
        ko: '한국어',
        lt: 'Lietuvių',
        lv: 'Latviešu',
        ml: 'മലയാളം',
        mr: 'मराठी',
        ms: 'Bahasa Melayu',
        nl: 'Nederlands',
        no: 'Norsk',
        pl: 'Polski',
        pt: 'Português',
        pt_BR: 'Português (Brasil)',
        pt_PT: 'Português (Portugal)',
        ro: 'Română',
        ru: 'Русский',
        sk: 'Slovenčina',
        sl: 'Slovenščina',
        sr: 'Српски',
        sv: 'Svenska',
        sw: 'Kiswahili',
        ta: 'தமிழ்',
        te: 'తెలుగు',
        th: 'ไทย',
        tr: 'Türkçe',
        uk: 'Українська',
        vi: 'Tiếng Việt',
        zh_CN: '简体中文',
        zh_TW: '繁體中文'
    };

    function formatLocalePickerLabel(code) {
        var english = LOCALE_LABELS[code] || code;
        var native = LOCALE_NATIVE[code];
        if (!native || native === english) {
            return english;
        }
        return english + ' (' + native + ')';
    }

    var LOCALE_CODES = Object.keys(LOCALE_LABELS).sort(function (a, b) {
        return LOCALE_LABELS[a].localeCompare(LOCALE_LABELS[b], 'en');
    });

    var userPref = 'system';
    var messagesByLocale = {};
    var loadCallbacks = {};

    function chromeLangToFolder(lang) {
        return String(lang || 'en').replace(/-/g, '_');
    }

    function resolveSystemLocale() {
        var ui = chromeLangToFolder(chrome.i18n && chrome.i18n.getUILanguage ? chrome.i18n.getUILanguage() : 'en');
        if (LOCALE_LABELS[ui]) {
            return ui;
        }
        var parts = ui.split('_');
        var base = parts[0];
        if (base === 'pt') {
            return ui === 'pt_PT' || (parts[1] && parts[1].toUpperCase() === 'PT') ? 'pt_PT' : 'pt_BR';
        }
        if (base === 'zh') {
            return parts[1] && (parts[1].toUpperCase() === 'TW' || parts[1].toUpperCase() === 'HK') ? 'zh_TW' : 'zh_CN';
        }
        if (base === 'en') {
            if (ui === 'en_GB') return 'en_GB';
            if (ui === 'en_AU') return 'en_AU';
            if (ui === 'en_US') return 'en_US';
            return 'en';
        }
        if (base === 'es' && parts[1] === '419') {
            return 'es_419';
        }
        if (LOCALE_LABELS[base]) {
            return base;
        }
        return 'en';
    }

    function getEffectiveLocale() {
        if (userPref === 'system') {
            return resolveSystemLocale();
        }
        if (LOCALE_LABELS[userPref]) {
            return userPref;
        }
        return 'en';
    }

    function formatMessage(entry, substitutions) {
        if (!entry || typeof entry.message !== 'string') {
            return '';
        }
        var msg = entry.message;
        if (substitutions === undefined || substitutions === null) {
            return msg;
        }
        var subs = Array.isArray(substitutions) ? substitutions : [substitutions];
        if (entry.placeholders) {
            var i = 0;
            for (var name in entry.placeholders) {
                if (!Object.prototype.hasOwnProperty.call(entry.placeholders, name)) {
                    continue;
                }
                var ph = entry.placeholders[name];
                var token = ph && ph.content ? ph.content : ('$' + (i + 1) + '$');
                var named = '$' + name + '$';
                if (i < subs.length) {
                    msg = msg.split(named).join(String(subs[i]));
                    msg = msg.split(token).join(String(subs[i]));
                }
                i += 1;
            }
            return msg;
        }
        for (var j = 0; j < subs.length; j++) {
            msg = msg.split('$' + (j + 1) + '$').join(String(subs[j]));
        }
        return msg;
    }

    function getFromBag(bag, key, substitutions) {
        if (!bag || !bag[key]) {
            return '';
        }
        return formatMessage(bag[key], substitutions);
    }

    function loadLocale(locale, done) {
        if (messagesByLocale[locale]) {
            if (done) done();
            return;
        }
        if (loadCallbacks[locale]) {
            loadCallbacks[locale].push(done);
            return;
        }
        loadCallbacks[locale] = [done];
        var url = chrome.runtime.getURL('_locales/' + locale + '/messages.json');
        fetch(url)
            .then(function (res) {
                if (!res.ok) {
                    throw new Error('locale fetch failed: ' + locale);
                }
                return res.json();
            })
            .then(function (data) {
                messagesByLocale[locale] = data;
                var cbs = loadCallbacks[locale] || [];
                delete loadCallbacks[locale];
                cbs.forEach(function (cb) {
                    if (cb) cb();
                });
            })
            .catch(function (err) {
                console.warn('Growbot: failed to load locale', locale, err);
                if (messagesByLocale.en) {
                    messagesByLocale[locale] = messagesByLocale.en;
                } else {
                    messagesByLocale[locale] = {};
                }
                var cbs = loadCallbacks[locale] || [];
                delete loadCallbacks[locale];
                cbs.forEach(function (cb) {
                    if (cb) cb();
                });
            });
    }

    function ensureLocalesLoaded(locales, done) {
        var pending = locales.length;
        if (pending === 0) {
            if (done) done();
            return;
        }
        locales.forEach(function (loc) {
            loadLocale(loc, function () {
                pending -= 1;
                if (pending === 0 && done) {
                    done();
                }
            });
        });
    }

    function getMessage(key, substitutions) {
        if (key && String(key).indexOf('@@') === 0 && chrome.i18n && chrome.i18n.getMessage) {
            return chrome.i18n.getMessage(key, substitutions) || '';
        }
        var locale = getEffectiveLocale();
        var bag = messagesByLocale[locale];
        var msg = getFromBag(bag, key, substitutions);
        if (msg) {
            return msg;
        }
        if (locale !== 'en') {
            msg = getFromBag(messagesByLocale.en, key, substitutions);
            if (msg) {
                return msg;
            }
        }
        if (userPref === 'system' && chrome.i18n && chrome.i18n.getMessage) {
            return chrome.i18n.getMessage(key, substitutions) || '';
        }
        return '';
    }

    function setPreference(pref, done) {
        userPref = pref || 'system';
        var effective = getEffectiveLocale();
        var toLoad = ['en'];
        if (effective !== 'en') {
            toLoad.push(effective);
        }
        ensureLocalesLoaded(toLoad, done);
    }

    function init(pref, done) {
        setPreference(pref, done);
    }

    return {
        LOCALE_LABELS: LOCALE_LABELS,
        LOCALE_NATIVE: LOCALE_NATIVE,
        LOCALE_CODES: LOCALE_CODES,
        formatLocalePickerLabel: formatLocalePickerLabel,
        init: init,
        setPreference: setPreference,
        getMessage: getMessage,
        getEffectiveLocale: getEffectiveLocale,
        resolveSystemLocale: resolveSystemLocale
    };
})();

function gbGetMessage(key, substitutions) {
    return GrowbotI18n.getMessage(key, substitutions);
}

function queueColumnLocaleKey(data) {
    return 'ColQ_' + String(data).replace(/\./g, '_');
}

function queueColumnLabel(col) {
    var key = col.localeKey || queueColumnLocaleKey(col.data);
    var msg = gbGetMessage(key);
    return (msg && msg.length > 0) ? msg : col.name;
}

var guidCookie = localStorage['gbUserGuid'];
var sessionToken = null;

// Retrieve session token from background script
chrome.runtime.sendMessage({ action: 'getAuthState' }, (response) => {
    if (response && response.session_token) {
        sessionToken = response.session_token;
    }
    if (response && response.user_guid) {
        guidCookie = response.user_guid;
        localStorage['gbUserGuid'] = guidCookie;
    }
});

function growbotExtensionVersionHeaderValue() {
    try {
        return chrome.runtime.getManifest().version || '';
    } catch (e) {
        return '';
    }
}

function getAuthHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (sessionToken) {
        headers['Authorization'] = 'Bearer ' + sessionToken;
    }
    const ev = growbotExtensionVersionHeaderValue();
    if (ev) {
        headers['X-Growbot-Extension-Version'] = ev;
    }
    return headers;
}

/** Firefox: Instagram page CSP blocks content-script fetch/XHR to growbotforfollowers.com. */
function growbotIsFirefox() {
    return /firefox/i.test(navigator.userAgent || '');
}

var GROWBOT_FAQ_URL = 'https://www.growbotforfollowers.com/index.php?faqonly=true';
var GROWBOT_AFFILIATE_URL = 'https://www.growbotforfollowers.com/affiliate.php';

function growbotOpenGrowbotSiteUrl(url) {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url: url });
    } else {
        window.open(url, '_blank', 'noopener');
    }
}

function growbotGrowbotBuyScreenUrl(guid) {
    return 'https://www.growbotforfollowers.com/?buyscreen=true&guid=' + encodeURIComponent(guid || '');
}

/** Replace a static iframe (FAQ/Affiliate) with an open-in-new-tab panel on Firefox. */
function growbotReplaceStaticIframeWithFirefoxFallback(iframeSelector, hostSelector, localeKey, url) {
    var $iframe = $(iframeSelector);
    if (!$iframe.length) {
        return;
    }
    $iframe.removeAttr('src').addClass('growbot-firefox-iframe-hidden').hide();
    var $host = $(hostSelector);
    if (!$host.length) {
        return;
    }
    $host.find('.growbot-firefox-external-panel').remove();
    var label = gbGetMessage(localeKey);
    if (!label) {
        label = 'Open in new tab';
    }
    var $panel = $('<div class="growbot-firefox-external-panel"></div>');
    var $btn = $('<button type="button" class="growbot-firefox-external-open"></button>').text(label);
    $btn.on('click', function () {
        growbotOpenGrowbotSiteUrl(url);
    });
    $panel.append($btn);
    $host.prepend($panel);
}

function growbotApplyFirefoxIframeFallback() {
    if (!growbotIsFirefox()) {
        return;
    }
    growbotReplaceStaticIframeWithFirefoxFallback('#iframeFAQ', '#faqhelp', 'OpenFaqInNewTab', GROWBOT_FAQ_URL);
    growbotReplaceStaticIframeWithFirefoxFallback('#iframeAffiliate', '#affiliatediv', 'OpenAffiliateInNewTab', GROWBOT_AFFILIATE_URL);
}

function growbotBuildFirefoxPurchasePanel(guid) {
    var buyUrl = growbotGrowbotBuyScreenUrl(guid);
    var $wrap = $('<div class="growbot-firefox-purchase-panel"></div>');
    var note = gbGetMessage('FirefoxSubscribeOpensNewTab');
    if (note) {
        $wrap.append($('<p class="growbot-firefox-external-note"></p>').text(note));
    }
    var openLabel = gbGetMessage('OpenSubscribeInNewTab');
    if (!openLabel) {
        openLabel = 'Open subscribe page';
    }
    var $openBtn = $('<button type="button" class="growbot-firefox-external-open igBotInjectedButton"></button>').text(openLabel);
    $openBtn.on('click', function () {
        growbotOpenGrowbotSiteUrl(buyUrl);
    });
    $wrap.append($('<div class="growbot-firefox-external-panel"></div>').append($openBtn));
    var $links = $('<div class="growbot-firefox-purchase-links"></div>');
    var subscribeText = gbGetMessage('SubscribeNow') || 'click here to Subscribe';
    $links.append(
        $('<a target="_blank" class="purchaseTextLink"></a>')
            .attr('href', buyUrl)
            .text(subscribeText)
    );
    $links.append(document.createTextNode(' '));
    $links.append(
        $('<a href="javascript:void(0);" id="aRelinkSubscription" class="purchaseTextLink"></a>')
            .text('Re-Link your Subscription')
    );
    $wrap.append($links);
    return $wrap;
}

function growbotServerRequestUrl(url) {
    if (typeof url === 'string') {
        return url;
    }
    if (url && typeof url.url === 'string') {
        return url.url;
    }
    return '';
}

function growbotIsGrowbotServerUrl(url) {
    return growbotServerRequestUrl(url).indexOf('growbotforfollowers.com') !== -1;
}

function growbotServerFetchViaBackground(url, init) {
    var requestUrl = growbotServerRequestUrl(url);
    var initPayload = init || {};
    var hdrs = initPayload.headers;
    if (hdrs && typeof hdrs.forEach === 'function') {
        var flat = {};
        hdrs.forEach(function (v, k) { flat[k] = v; });
        hdrs = flat;
    }
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({
            action: 'serverFetch',
            url: requestUrl,
            init: {
                method: initPayload.method || 'GET',
                headers: hdrs || {},
                body: initPayload.body != null ? initPayload.body : undefined
            }
        }, function (response) {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
            }
            if (!response) {
                reject(new Error('No response from background'));
                return;
            }
            if (response.error) {
                reject(new Error(response.error));
                return;
            }
            resolve(new Response(response.body, {
                status: response.status,
                statusText: response.statusText || ''
            }));
        });
    });
}

function growbotServerFetch(url, init) {
    if (growbotIsFirefox() && growbotIsGrowbotServerUrl(url)) {
        return growbotServerFetchViaBackground(url, init);
    }
    return fetch(url, init);
}

(function growbotInstallFirefoxServerNetworkShim() {
    if (!growbotIsFirefox()) {
        return;
    }
    if (!/(^|\.)instagram\.com$/i.test(window.location.hostname)) {
        return;
    }
    if (window.__growbotServerNetworkShim) {
        return;
    }
    window.__growbotServerNetworkShim = true;

    var nativeFetch = window.fetch.bind(window);
    window.fetch = function (url, init) {
        if (growbotIsGrowbotServerUrl(url)) {
            return growbotServerFetch(url, init);
        }
        return nativeFetch(url, init);
    };

    if (typeof $ !== 'undefined' && $.ajaxTransport) {
        $.ajaxTransport('+*', function (options) {
            if (!options.url || options.url.indexOf('growbotforfollowers.com') === -1) {
                return;
            }
            return {
                send: function (headers, completeCallback) {
                    var method = (options.type || options.method || 'GET').toUpperCase();
                    var mergedHeaders = {};
                    if (options.headers) {
                        Object.keys(options.headers).forEach(function (k) {
                            mergedHeaders[k] = options.headers[k];
                        });
                    }
                    Object.keys(headers || {}).forEach(function (k) {
                        mergedHeaders[k] = headers[k];
                    });
                    var body = options.data;
                    if (body != null && typeof body !== 'string' && !(body instanceof FormData) && !(body instanceof Blob)) {
                        body = typeof $.param === 'function' ? $.param(body) : String(body);
                    }
                    growbotServerFetchViaBackground(options.url, {
                        method: method,
                        headers: mergedHeaders,
                        body: body
                    }).then(function (resp) {
                        return resp.text().then(function (text) {
                            completeCallback(resp.status, resp.statusText || '', { text: text }, 'Content-Type: ' + (resp.headers.get('content-type') || 'text/plain'));
                        });
                    }).catch(function (err) {
                        completeCallback(0, err.message || 'error', {});
                    });
                },
                abort: function () {}
            };
        });
    }
})();

// Capture refcode from growbotforfollowers.com localStorage and send to background
var capturedRefcode = '';
if (window.location.hostname.includes('growbotforfollowers.com')) {
    const refcode = localStorage.getItem('refgrow_ref_code');
    if (refcode) {
        capturedRefcode = refcode;
        chrome.runtime.sendMessage({ action: 'setRefcode', refcode: refcode });
    }
}
var urlAcctInfo2 = 'https://www.instagram.com/';
var urlAcctInfo = 'https://i.instagram.com/api/v1/users/web_profile_info/?username=';
var urlAcctInfo3 = 'https://i.instagram.com/api/v1/users/${userid}/info/'; //has public_email

/*

SAVE USERNAME AND IP TO METADATA WHEN LOADING SUBSCRIPTION

Button hover states

- FILTERS
    connected_fb_page
    has_channel
    business_category_name
    highlight_reel_count
    last post date** - handle private accounts
    first post date**
    average posts per day?

- option to block client events

1) auto like when people comment your images
2) auto reply to comments (not sure if this is a must have feature tho).

make tour
video tour?  ttsreader.com

Add Google analytics

auto unfollow
schedule unfollowing
    - background page messaging

progress bars!
https://loading.io/progress/
https://kimmobrunfeldt.github.io/progressbar.js/

<meter
  min="0"
  max="100"
  low="25"
  high="75"
  optimum="80"
  value="50"
></meter>


6) Could you integrate a location based filtering system? For an example google coordinate paste + radius

button to clear already attempted or load as queue

Make quick "Unlike" or make sure to show user info for each pic.

Anyway you can randomize the post likes
My guess IG would spot you liking 1 post on every follow.
It would be nice if you could randomize likes and randomize frequency on this option.
For example every 3 to 10 (Random) follows like (1-5 posts) Random.

https://stackoverflow.com/questions/16758316/where-do-i-find-the-instagram-media-id-of-a-image

*/

function prettyDate(dataString) {

    if (dataString == false) return '-';

    var d = new Date(dataString);
    //var datePart = d.toISOString().slice(0, 10);

    var year = d.getFullYear();
    var month = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');

    var datePart = year + '-' + month + '-' + day;

    // var timePart = d.toLocaleString([], {
    //     hour: '2-digit',
    //     minute: '2-digit'
    // });


    var timePart = d.getHours() + ':' + d.getMinutes();

    dataString = datePart + ' ' + timePart;
    return dataString;
}



const igExternalVars = {
    "emptyProfilePicUrl": "44884218_345707102882519_2446069589734326272_n",
    "qsForConvenienceButtons": "div.xw7yly9 div.xsag5q8.x2vl965.x1onr9mi ._ap3a._aaco._aacw._aacx._aad7._aade",
    "qsForConvenienceButtonsProfile": "main header h2[dir=\"auto\"] > span[dir=\"auto\"], a.x1i10hfl h2.x1lliihq > span",
    "qsForProfilePageUsername": "a.x1i10hfl h2.x1lliihq"
}

var gblAcctsQueueGrid;
var gblCheckboxPlugin;

var instabot_install_date = 0; // set from background page
var instabot_free_trial_time = 0; // set from background page
var instabot_has_license = false;

var defaultFilterOptions = {
    applyFiltersAutomatically: true,
    followers: [0, 10000000],
    following: [0, 10000],
    followRatio: [-10000, 10000000],
    mutualFollowedBy: [0, 10000000],
    posts: [0, 100000],
    lastPosted: [0, 5000],
    private: true,
    non_private: true,
    verified: true,
    non_verified: true,
    follows_me: false,
    non_follows_me: true,
    followed_by_me: false,
    non_followed_by_me: true,
    external_url_contains: false,
    external_url_not_contains: false,
    external_url_contains_text: '',
    external_url_not_contains_text: '',
    is_business_account: true,
    non_is_business_account: true,
    is_joined_recently: true,
    non_is_joined_recently: true,
    connected_fb_page: true,
    non_connected_fb_page: true,
    bio_contains: false,
    bio_not_contains: false,
    bio_contains_text: '',
    bio_not_contains_text: '',
    no_profile_pic: true,
    profile_pic: true,
    business_category_name_contains: false,
    business_category_name_contains_text: '',
    business_category_name_not_contains: false,
    business_category_name_not_contains_text: ''
};


var gbDefaultColumns = [{
    "name": '✓',
    "data": 'id',
    "width": '40px',
    "formatter": '<input type="checkbox" id="cb_${cell}" value="${cell}" />',
    "visible": true,
}, {
    "name": 'Pic',
    "data": 'profile_pic_url',
    "formatter": '<label for="cb_${ig_id}"><img data-ig-userid="${ig_id}" data-src="${cell}" class="igBotQueueAcctProfilePicture"/></label>',
    "sort": false,
    "width": '62px',
    "visible": true
}, {
    "name": '@username',
    "data": 'username',
    "formatter": '<a href="https://www.instagram.com/${cell}" target="_blank">@${cell}</a>',
    "width": '165px',
    "visible": true
}, {
    "name": 'Full Name',
    "data": 'full_name',
    "width": '150px',
    "visible": true
}, {
    "name": 'Bio',
    "data": 'biography',
    "width": '300px',
    "visible": true
}, {
    "name": 'Clips',
    "data": 'has_clips',
    "width": '95px',
    "visible": true
}, {
    "name": 'Highlights',
    "data": 'highlight_reel_count',
    "width": '95px',
    "visible": true
}, {
    "name": 'Posts',
    "data": 'edge_owner_to_timeline_media.count',
    "width": '65px',
    "visible": true
}, {
    "name": 'Link In Bio',
    "data": 'external_url',
    "formatter": '<a href="${cell}" title="${cell}" target="_blank">${cell}</a>',
    "width": '250px',
    "visible": true
}, {
    "name": 'Followers',
    "data": 'edge_followed_by.count',
    "width": '90px',
    "visible": true
}, {
    "name": 'Following',
    "data": 'edge_follow.count',
    "width": '90px',
    "visible": true
}, {
    "name": 'Ratio',
    "data": 'followRatio',
    "width": '65px',
    "visible": true
}, {
    "name": 'Source Username',
    "data": 'source_owner',
    "formatter": '<a href="https://www.instagram.com/${cell}" target="_blank">@${cell}</a>',
    "width": '140px',
    "visible": true
}, {
    "name": 'Source Type',
    "data": 'source_type',
    "width": '140px',
    "visible": true
}, {
    "name": 'Source Media',
    "data": 'source_media',
    "formatter": '<a href="https://www.instagram.com/p/${cell}" target="_blank">@${cell}</a>',
    "width": '140px',
    "visible": true
}, {
    "name": 'Mutual',
    "data": 'edge_mutual_followed_by.count',
    "width": '70px',
    "visible": true,
    "numeric": true
}, {
    "name": 'Followed By Me',
    "data": 'followed_by_viewer',
    "width": '120px',
    "visible": true,
    "bool": true
}, {
    "name": 'Follows Me',
    "data": 'follows_viewer',
    "width": '95px',
    "visible": true,
    "bool": true
}, {
    "name": 'Requested',
    "data": 'requested_by_viewer',
    "width": '95px',
    "visible": true,
    "bool": true
}, {
    "name": 'Joined Recently',
    "data": 'is_joined_recently',
    "width": '100px',
    "visible": true,
    "bool": true
}, {
    "name": 'Private',
    "data": 'is_private',
    "width": '70px',
    "visible": true,
    "bool": true
}, {
    "name": 'Verified',
    "data": 'is_verified',
    "width": '70px',
    "visible": true,
    "bool": true
}, {
    "name": 'Business Category',
    "data": 'business_category_name',
    "width": '150px',
    "visible": true
}, {
    "name": 'Pronouns',
    "data": 'pronouns',
    "width": '90px',
    "visible": true
}, {
    "name": 'Last Posted',
    "data": 'lastPostDateInDays',
    "width": '100px',
    "visible": true
}, {
    "name": "Contact Phone Number",
    "data": "contact_phone_number",
    "visible": true
}, {
    "name": "Public Email",
    "data": "public_email",
    "visible": true
}, {
    "name": "Address Street",
    "data": "address_street",
    "visible": true
}, {
    "name": "City Name",
    "data": "city_name",
    "visible": true
}, {
    "name": "Zip",
    "data": "zip",
    "visible": true
}, {
    "name": "Latitude",
    "data": "latitude",
    "visible": true
}, {
    "name": "Longitude",
    "data": "longitude",
    "visible": true
}, {
    "name": "Primary Profile Link Type",
    "data": "primary_profile_link_type",
    "visible": false
}, {
    "name": "Show Fb Link On Profile",
    "data": "show_fb_link_on_profile",
    "visible": false
}, {
    "name": "Show Fb Page Link On Profile",
    "data": "show_fb_page_link_on_profile",
    "visible": false
}, {
    "name": "Can Hide Category",
    "data": "can_hide_category",
    "visible": false,
    "bool": true
}, {
    "name": "Smb Support Partner",
    "data": "smb_support_partner",
    "visible": false
}, {
    "name": "Current Catalog Id",
    "data": "current_catalog_id",
    "visible": false
}, {
    "name": "Mini Shop Seller Onboarding Status",
    "data": "mini_shop_seller_onboarding_status",
    "visible": false
}, {
    "name": "Account Category",
    "data": "account_category",
    "visible": false
}, {
    "name": "Can Add Fb Group Link On Profile",
    "data": "can_add_fb_group_link_on_profile",
    "visible": false,
    "bool": true
}, {
    "name": "Can Use Affiliate Partnership Messaging As Creator",
    "data": "can_use_affiliate_partnership_messaging_as_creator",
    "visible": false,
    "bool": true
}, {
    "name": "Can Use Affiliate Partnership Messaging As Brand",
    "data": "can_use_affiliate_partnership_messaging_as_brand",
    "visible": false
}, {
    "name": "Existing User Age Collection Enabled",
    "data": "existing_user_age_collection_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Feed Post Reshare Disabled",
    "data": "feed_post_reshare_disabled",
    "visible": false,
    "bool": true
}, {
    "name": "Has Public Tab Threads",
    "data": "has_public_tab_threads",
    "visible": false,
    "bool": true
}, {
    "name": "Highlight Reshare Disabled",
    "data": "highlight_reshare_disabled",
    "visible": false,
    "bool": true
}, {
    "name": "Include Direct Blacklist Status",
    "data": "include_direct_blacklist_status",
    "visible": false,
    "bool": true
}, {
    "name": "Is Direct Roll Call Enabled",
    "data": "is_direct_roll_call_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Pk",
    "data": "pk",
    "visible": false
}, {
    "name": "Pk Id",
    "data": "pk_id",
    "visible": false
}, {
    "name": "Profile Type",
    "data": "profile_type",
    "visible": false
}, {
    "name": "Show Ig App Switcher Badge",
    "data": "show_ig_app_switcher_badge",
    "visible": false,
    "bool": true
}, {
    "name": "Show Post Insights Entry Point",
    "data": "show_post_insights_entry_point",
    "visible": false,
    "bool": true
}, {
    "name": "Show Text Post App Badge",
    "data": "show_text_post_app_badge",
    "visible": false,
    "bool": true
}, {
    "name": "Show Text Post App Switcher Badge",
    "data": "show_text_post_app_switcher_badge",
    "visible": false,
    "bool": true
}, {
    "name": "Text Post App Joiner Number Label",
    "data": "text_post_app_joiner_number_label",
    "visible": false
}, {
    "name": "Third Party Downloads Enabled",
    "data": "third_party_downloads_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Is Profile Picture Expansion Enabled",
    "data": "is_profile_picture_expansion_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Is Opal Enabled",
    "data": "is_opal_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Can Hide Public Contacts",
    "data": "can_hide_public_contacts",
    "visible": false,
    "bool": true
}, {
    "name": "Is Category Tappable",
    "data": "is_category_tappable",
    "visible": false,
    "bool": true
}, {
    "name": "Is Eligible For Smb Support Flow",
    "data": "is_eligible_for_smb_support_flow",
    "visible": false,
    "bool": true
}, {
    "name": "Is Eligible For Lead Center",
    "data": "is_eligible_for_lead_center",
    "visible": false,
    "bool": true
}, {
    "name": "Lead Details App Id",
    "data": "lead_details_app_id",
    "visible": false,
    "bool": true
}, {
    "name": "Direct Messaging",
    "data": "direct_messaging",
    "visible": false
}, {
    "name": "Fb Page Call To Action Id",
    "data": "fb_page_call_to_action_id",
    "visible": false
}, {
    "name": "Displayed Action Button Partner",
    "data": "displayed_action_button_partner",
    "visible": false
}, {
    "name": "Smb Delivery Partner",
    "data": "smb_delivery_partner",
    "visible": false
}, {
    "name": "Smb Support Delivery Partner",
    "data": "smb_support_delivery_partner",
    "visible": false
}, {
    "name": "Displayed Action Button Type",
    "data": "displayed_action_button_type",
    "visible": false
}, {
    "name": "Is Call To Action Enabled",
    "data": "is_call_to_action_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Shopping Post Onboard Nux Type",
    "data": "shopping_post_onboard_nux_type",
    "visible": false
}, {
    "name": "Ads Incentive Expiration Date",
    "data": "ads_incentive_expiration_date",
    "visible": false
}, {
    "name": "Account Badges",
    "data": "account_badges",
    "visible": false
}, {
    "name": "Auto Expand Chaining",
    "data": "auto_expand_chaining",
    "visible": false
}, {
    "name": "Birthday Today Visibility For Viewer",
    "data": "birthday_today_visibility_for_viewer",
    "visible": false
}, {
    "name": "Can Use Branded Content Discovery As Brand",
    "data": "can_use_branded_content_discovery_as_brand",
    "visible": false
}, {
    "name": "Can Use Branded Content Discovery As Creator",
    "data": "can_use_branded_content_discovery_as_creator",
    "visible": false
}, {
    "name": "Remove Message Entrypoint",
    "data": "remove_message_entrypoint",
    "visible": false
}, {
    "name": "Is Eligible For Request Message",
    "data": "is_eligible_for_request_message",
    "visible": false,
    "bool": true
}, {
    "name": "Transparency Product Enabled",
    "data": "transparency_product_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Whatsapp Number",
    "data": "whatsapp_number",
    "visible": false
}, {
    "name": "Merchant Checkout Style",
    "data": "merchant_checkout_style",
    "visible": false
}, {
    "name": "Mutual Followers Count",
    "data": "mutual_followers_count",
    "visible": false
}, {
    "name": "Nametag",
    "data": "nametag",
    "visible": false
}, {
    "name": "Open External Url With In App Browser",
    "data": "open_external_url_with_in_app_browser",
    "visible": false,
    "bool": true
}, {
    "name": "Pinned Channels Info",
    "data": "pinned_channels_info",
    "visible": false
}, {
    "name": "Profile Context",
    "data": "profile_context",
    "visible": false
}, {
    "name": "Profile Context Facepile Users",
    "data": "profile_context_facepile_users",
    "visible": false
}, {
    "name": "Profile Context Links With User Ids",
    "data": "profile_context_links_with_user_ids",
    "visible": false
}, {
    "name": "Profile Context Mutual Follow Ids",
    "data": "profile_context_mutual_follow_ids",
    "visible": false
}, {
    "name": "Profile Pic Id",
    "data": "profile_pic_id",
    "visible": false
}, {
    "name": "Recon Features",
    "data": "recon_features",
    "visible": false
}, {
    "name": "Relevant News Regulation Locations",
    "data": "relevant_news_regulation_locations",
    "visible": false
}, {
    "name": "Seller Shoppable Feed Type",
    "data": "seller_shoppable_feed_type",
    "visible": false
}, {
    "name": "Show Shoppable Feed",
    "data": "show_shoppable_feed",
    "visible": false,
    "bool": true
}, {
    "name": "Text Post App Badge Label",
    "data": "text_post_app_badge_label",
    "visible": false
}, {
    "name": "Total Ar Effects",
    "data": "total_ar_effects",
    "visible": false
}, {
    "name": "Is Memorialized",
    "data": "is_memorialized",
    "visible": false
}, {
    "name": "Is Potential Business",
    "data": "is_potential_business",
    "visible": false,
    "bool": true
}, {
    "name": "Is Profile Broadcast Sharing Enabled",
    "data": "is_profile_broadcast_sharing_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Is Recon Ad Cta On Profile Eligible With Viewer",
    "data": "is_recon_ad_cta_on_profile_eligible_with_viewer",
    "visible": false,
    "bool": true
}, {
    "name": "Is Supervision Features Enabled",
    "data": "is_supervision_features_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Is Whatsapp Linked",
    "data": "is_whatsapp_linked",
    "visible": false,
    "bool": true
}, {
    "name": "Latest Besties Reel Media",
    "data": "latest_besties_reel_media",
    "visible": false
}, {
    "name": "Num Of Admined Pages",
    "data": "num_of_admined_pages",
    "visible": false
}, {
    "name": "Page Id",
    "data": "page_id",
    "visible": false
}, {
    "name": "Page Name",
    "data": "page_name",
    "visible": false
}, {
    "name": "Ads Page Id",
    "data": "ads_page_id",
    "visible": false
}, {
    "name": "Ads Page Name",
    "data": "ads_page_name",
    "visible": false
}, {
    "name": "Charity Profile Fundraiser Info",
    "data": "charity_profile_fundraiser_info",
    "visible": false
}, {
    "name": "Creator Shopping Info",
    "data": "creator_shopping_info",
    "visible": false
}, {
    "name": "Fan Club Info",
    "data": "fan_club_info",
    "visible": false
}, {
    "name": "Follow Friction Type",
    "data": "follow_friction_type",
    "visible": false
}, {
    "name": "Follower Count",
    "data": "follower_count",
    "visible": false
}, {
    "name": "Following Count",
    "data": "following_count",
    "visible": false
}, {
    "name": "Has Active Charity Business Profile Fundraiser",
    "data": "has_active_charity_business_profile_fundraiser",
    "visible": false,
    "bool": true
}, {
    "name": "Has Anonymous Profile Picture",
    "data": "has_anonymous_profile_picture",
    "visible": false,
    "bool": true
}, {
    "name": "Has Collab Collections",
    "data": "has_collab_collections",
    "visible": false,
    "bool": true
}, {
    "name": "Has Exclusive Feed Content",
    "data": "has_exclusive_feed_content",
    "visible": false,
    "bool": true
}, {
    "name": "Has Fan Club Subscriptions",
    "data": "has_fan_club_subscriptions",
    "visible": false,
    "bool": true
}, {
    "name": "Has Highlight Reels",
    "data": "has_highlight_reels",
    "visible": false,
    "bool": true
}, {
    "name": "Has Igtv Series",
    "data": "has_igtv_series",
    "visible": false,
    "bool": true
}, {
    "name": "Has Music On Profile",
    "data": "has_music_on_profile",
    "visible": false,
    "bool": true
}, {
    "name": "Has Private Collections",
    "data": "has_private_collections",
    "visible": false,
    "bool": true
}, {
    "name": "Has Videos",
    "data": "has_videos",
    "visible": false,
    "bool": true
}, {
    "name": "Hd Profile Pic Url Info",
    "data": "hd_profile_pic_url_info",
    "visible": false
}, {
    "name": "Hd Profile Pic Versions",
    "data": "hd_profile_pic_versions",
    "visible": false
}, {
    "name": "Interop Messaging User Fbid",
    "data": "interop_messaging_user_fbid",
    "visible": false
}, {
    "name": "Is Bestie",
    "data": "is_bestie",
    "visible": false,
    "bool": true
}, {
    "name": "Is Eligible For Diverse Owned Business Info",
    "data": "is_eligible_for_diverse_owned_business_info",
    "visible": false,
    "bool": true
}, {
    "name": "Is Eligible For Meta Verified Links In Reels",
    "data": "is_eligible_for_meta_verified_links_in_reels",
    "visible": false,
    "bool": true
}, {
    "name": "Is Eligible For Meta Verified Enhanced Link Sheet",
    "data": "is_eligible_for_meta_verified_enhanced_link_sheet",
    "visible": false,
    "bool": true
}, {
    "name": "Is Eligible To Display Diverse Owned Business Info",
    "data": "is_eligible_to_display_diverse_owned_business_info",
    "visible": false,
    "bool": true
}, {
    "name": "Is Facebook Onboarded Charity",
    "data": "is_facebook_onboarded_charity",
    "visible": false,
    "bool": true
}, {
    "name": "Is Favorite",
    "data": "is_favorite",
    "visible": false,
    "bool": true
}, {
    "name": "Is In Canada",
    "data": "is_in_canada",
    "visible": false,
    "bool": true
}, {
    "name": "Strong Id  ",
    "data": "strong_id__",
    "visible": false
}, {
    "name": "External Lynx Url",
    "data": "external_lynx_url",
    "visible": false
}, {
    "name": "Is Interest Account",
    "data": "is_interest_account",
    "visible": false,
    "bool": true
}, {
    "name": "Latest Reel Media",
    "data": "latest_reel_media",
    "visible": false
}, {
    "name": "Media Count",
    "data": "media_count",
    "visible": false
}, {
    "name": "Total Clips Count",
    "data": "total_clips_count",
    "visible": false
}, {
    "name": "Total Igtv Videos",
    "data": "total_igtv_videos",
    "visible": false
}, {
    "name": "Recs From Friends",
    "data": "recs_from_friends",
    "visible": false
}, {
    "name": "City Id",
    "data": "city_id",
    "visible": false
}, {
    "name": "Public Phone Country Code",
    "data": "public_phone_country_code",
    "visible": false
}, {
    "name": "Public Phone Number",
    "data": "public_phone_number",
    "visible": false
}, {
    "name": "Professional Conversion Suggested Account Type",
    "data": "professional_conversion_suggested_account_type",
    "visible": false
}, {
    "name": "Account Type",
    "data": "account_type",
    "visible": false
}, {
    "name": "Fbid V2",
    "data": "fbid_v2",
    "visible": false
}, {
    "name": "Is Profile Audio Call Enabled",
    "data": "is_profile_audio_call_enabled",
    "visible": false,
    "bool": true
}, {
    "name": "Instagram Location Id",
    "data": "instagram_location_id",
    "visible": false
}, {
    "name": "Is New To Instagram",
    "data": "is_new_to_instagram",
    "visible": false,
    "bool": true
}, {
    "name": "Is New To Instagram 30d",
    "data": "is_new_to_instagram_30d",
    "visible": false,
    "bool": true
}, {
    "name": "Is Secondary Account Creation",
    "data": "is_secondary_account_creation",
    "visible": false,
    "bool": true
}, {
    "name": "Category",
    "data": "category",
    "visible": false
}, {
    "name": "Category Id",
    "data": "category_id",
    "visible": false
}, {
    "name": "Is Business",
    "data": "is_business",
    "visible": false
}, {
    "name": "Language Code",
    "data": "languageCode",
    "visible": false
}, {
    "name": "Language %",
    "data": "languagePercentage",
    "visible": false
}, {
    "name": "Language #",
    "data": "languageCount",
    "visible": false
}, {
    "name": "Language",
    "data": "languageName",
    "visible": true
}, {
    "name": "Gender",
    "data": "gender",
    "width": "70px",
    "visible": true
}, {
    "name": "Gender Source",
    "data": "genderSource",
    "width": "90px",
    "visible": false
}];


var defaultOptions = {
    timeDelay: 180000,
    timeDelayAfterSoftRateLimit: 600000,
    timeDelayAfterHardRateLimit: 3600000,
    timeDelayAfter429RateLimit: 60000,
    timeDelayAfterAdditionalInfo: 2000,
    useTimeDelayAfterAdditionalInfo: false,
    retriesAfterAdditionalInfo404: 10,
    timeDelayAfterSkip: 0.5,
    useRandomTimeDelay: true,
    percentRandomTimeDelay: 0.5,
    showNotifications: false,
    followPrivateAccounts: true,
    limitQueue: true,
    maxAcctQueueLength: 50,
    maxMediaQueueLength: 50,
    paginationLimit: 100,
    mediapaginationLimit: 100,
    /** Page size for Actions Queue pager only; string values match #actionspaginationLimit options */
    actionsPaginationLimit: '100',
    truncateStart: 0,
    dontUnFollowFollowers: true,
    dontUnFollowFilters: false,
    dontRemoveOrBlockFilters: false,
    dontUnFollowNonGrowbot: true,
    unFollowFresh: false,
    unFollowIfOld: true,
    unFollowDelay: 259200000, // 259200000 = 3 days
    unFollowIfOlderThan: 2592000000, // 2592000000 = 30 days
    followLikeLatestPics: false,
    numberFollowLikeLatestPics: 1,
    filterOptions: defaultFilterOptions,
    ui: [],
    cbShowQueueOnScreen: true,
    cbRemoveUnusedColumns: false,
    showFollowingInQueue: true,
    showLikesInQueue: true,
    removeAccountsFromQueue: false,
    autoSaveQueue: false,
    allowDuplicateAccounts: false,
    showStamps: true,
    showProfilePicInQueue: true,
    showConvenienceButtons: true,
    loadQueueOnStartup: false,
    clickNotNow: false,
    followPeopleAlreadyAttempted: false,
    maxPerEnabled: false,
    maxPerActions: 50,
    maxPerPeriod: 86400000,
    getExtendedData: false,
    getLastPostDate: false,
    getGender: false,
    genderCountry: 'auto',
    endcursors: [],
    queueColumns: gbDefaultColumns,
    MediaIncludeLikersCommentersTagged: false,
    SaveWhenWatchingReel: true,
    LikeWhenWatchingReel: true,
    lastTab: 'tab1',
    includePinnedPostForLikes: true,
    includePinnedPostForComments: true,
    likeAfterFollow: false,
    unfollowAfterFollow: false,
    unfollowAfterDays: 7,
    showCompletedActions: true,
    /** Ask Chrome not to auto-discard Instagram tabs (Memory Saver / background unload). */
    keepInstagramTabsAwake: true,
    /** 'light' | 'dark' | 'system' | 'easter' | 'darkred' — panel colors */
    uiColorTheme: 'system',
    /** 'system' or a _locales folder name (e.g. pt_BR, de) */
    uiLocale: 'system'
};

var gblOptions = defaultOptions;

var gbl404attempt = 0;

var acctsQueue = [];
var theirFollowings = [];
var myFollowers = [];
var timeoutsQueue = [];
var alreadyLiking = false;

var acctsProcessed = [];
var acctsPreviouslyAttempted = [];
var acctsWhiteList = [];
var acctsBlackList = [];
var freeTrialInterval;

var scrollIntervalId;
var totalAvailableForQueue;

var loadedTheirFollowers = false;
var loadedTheirFollowings = false;
var loadedMyFollowers = false;
var loadedMyFollowings = false;

var user;
var currentProfilePage = false;

var todaysdate = new Date();
var today = todaysdate.getTime();

var mediaToLike = [];
var previousLikes = [];

var currentList = false;

var queueSplit = false;

var usernameCheckInterval;

var maxActionsDelayStartTime = 0;
var actionsTaken = 0;

let mediaForComments = [];
let accountIdsThatCommented = [];


let mediaForLikes = [];
let accountIdsThatLiked = [];

function waitForWinVars() {

    var sharedData = JSON.parse(localStorage.getItem('winvars'));

    if (sharedData) {

        if (sharedData.config && sharedData.config.viewer != null) {
            user = sharedData.config;
            gbInit();
        } else {
            waitForElement('script[type="application/json"]', document, gbInit, false);
        }

    } else {
        setTimeout(waitForWinVars, 10);
    }

}

function gbInit() {

    if (shouldLoadGrowbotOnThisPage() == false) return false;

    localStorage.clear('winvars');


    injectControlsDiv();


    if (getBackgroundInfo() === false) {
        return false;
    }



    startUserNameFreshnessInterval();

    setInterval(monitorButtonConditions, 250);

}

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let split = el.split('=');
        cookie[split[0].trim()] = split.slice(1).join("=");
    })
    return cookie[name];
}

function getCsrfFromCookie() {
    return getCookie('csrftoken');
}

function getInstagramWebApiHeaders(referrerUsername) {
    var headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'x-asbd-id': '129477',
        'x-csrftoken': getCsrfFromCookie(),
        'x-ig-app-id': '936619743392459',
        'x-requested-with': 'XMLHttpRequest',
        'x-instagram-ajax': '1010212815'
    };
    return headers;
}

function getInstagramWebApiFetchOptions(referrerUsername) {
    var pathUser = referrerUsername || getProfileUsernameFromPath() || '';
    return {
        method: 'GET',
        credentials: 'include',
        headers: getInstagramWebApiHeaders(pathUser),
        referrer: pathUser ? ('https://www.instagram.com/' + encodeURIComponent(pathUser) + '/') : 'https://www.instagram.com/',
        referrerPolicy: 'strict-origin-when-cross-origin'
    };
}

function getLoggedInViewerPk() {
    if (typeof user !== 'undefined' && user && user.viewer) {
        if (user.viewer.pk != null) return String(user.viewer.pk);
        if (user.viewer.id != null) return String(user.viewer.id);
    }
    var dsUserId = getCookie('ds_user_id');
    if (dsUserId) return String(dsUserId);
    return '';
}

function isViewerPkForDifferentProfile(pk, targetUsername) {
    var viewerPk = getLoggedInViewerPk();
    if (!viewerPk || String(pk) !== viewerPk) return false;

    if (typeof user !== 'undefined' && user && user.viewer && user.viewer.username) {
        return normalizeConvenienceUsername(user.viewer.username) !== normalizeConvenienceUsername(targetUsername);
    }

    return normalizeConvenienceUsername(getProfileUsernameFromPath()) !== normalizeConvenienceUsername(targetUsername);
}

function getInstagramPageTokenSource() {
    var chunks = [];
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var text = scripts[i].textContent || '';
        if (text.indexOf('DTSG') > -1 || text.indexOf('dtsg') > -1 || text.indexOf('LSD') > -1 || text.indexOf('"lsd"') > -1) {
            chunks.push(text);
        }
    }
    if (chunks.length > 0) return chunks.join('\n');
    return document.documentElement && document.documentElement.innerHTML ? document.documentElement.innerHTML : '';
}

function getInstagramLsdToken() {
    var lsdInput = document.querySelector('input[name="lsd"]');
    if (lsdInput && lsdInput.value) return lsdInput.value;

    var html = getInstagramPageTokenSource();
    if (!html) return '';

    var patterns = [
        /"LSD",\[\],\{"token":"([^"]+)"/,
        /"lsd":"([^"]+)"/,
        /name="lsd" value="([^"]+)"/
    ];
    for (var i = 0; i < patterns.length; i++) {
        var match = html.match(patterns[i]);
        if (match && match[1]) return match[1];
    }

    return '';
}

function getInstagramFbDtsg() {
    var fbDtsgInput = document.querySelector('input[name="fb_dtsg"]');
    if (fbDtsgInput && fbDtsgInput.value) return fbDtsgInput.value;

    var html = getInstagramPageTokenSource();
    if (!html) return '';

    var patterns = [
        /"DTSGInitData",\[\],\{"token":"([^"]+)"/,
        /"DTSGInitialData",\[\],\{"token":"([^"]+)"/,
        /"dtsg":\{"token":"([^"]+)"/,
        /name="fb_dtsg" value="([^"]+)"/,
        /"fb_dtsg":"([^"]+)"/
    ];
    for (var j = 0; j < patterns.length; j++) {
        var match = html.match(patterns[j]);
        if (match && match[1]) return match[1];
    }

    return '';
}

function getInstagramJazoest(fbDtsg) {
    if (!fbDtsg) return '';
    var sum = 0;
    for (var i = 0; i < fbDtsg.length; i++) {
        sum += fbDtsg.charCodeAt(i);
    }
    return String(2 + sum);
}

function getInstagramActorId() {
    if (user && user.viewerId) {
        var viewerId = String(user.viewerId);
        if (viewerId.indexOf('178414') === 0) return viewerId;
    }

    var dsUserId = getCookie('ds_user_id');
    if (dsUserId) return '178414' + String(dsUserId);

    return '';
}

function getMediaIdForLike(media) {
    if (media.pk != null && media.pk !== '') return String(media.pk);
    if (media.id != null && media.id !== '') {
        var id = String(media.id);
        if (id.indexOf('_') > -1) return id.split('_')[0];
        return id;
    }
    return '';
}

function parseInstagramGraphqlLikeResult(data) {
    if (!data || typeof data !== 'object') {
        return { ok: false, message: 'empty response' };
    }
    if (data.errors && data.errors.length) {
        var msg = data.errors.map(function (e) {
            return e.message || JSON.stringify(e);
        }).join('; ');
        return { ok: false, message: msg };
    }
    if (!data.data || typeof data.data !== 'object') {
        return { ok: false, message: 'missing data object' };
    }

    var keys = Object.keys(data.data);
    if (keys.length === 0) {
        return { ok: false, message: 'empty data object' };
    }

    for (var i = 0; i < keys.length; i++) {
        if (data.data[keys[i]] === null) {
            return { ok: false, message: keys[i] + ' returned null' };
        }
    }

    return { ok: true };
}

function handleLikeMediaFailure(media, status, responseSnippet) {
    mediaToLike.unshift(media);

    if (status == 403) {
        printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
        timeoutsQueue.push(setTimeout(likeAllMedia, gblOptions.timeDelayAfterSoftRateLimit));
    } else if (status == 400) {
        printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
        timeoutsQueue.push(setTimeout(likeAllMedia, gblOptions.timeDelayAfterHardRateLimit));
    } else if (status == 429) {
        printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
        timeoutsQueue.push(setTimeout(likeAllMedia, gblOptions.timeDelayAfter429RateLimit));
    } else {
        console.error('Like failed:', { status: status, responseSnippet: responseSnippet });
        outputMessage(gbGetMessage('LogGenericStatusError', [String(status || 'error')]));
        if (responseSnippet) outputMessage('Like failure response (truncated): ' + responseSnippet);
        timeoutsQueue.push(setTimeout(likeAllMedia, 5000));
    }
}

function handleLikeMediaSuccess(media) {
    previousLikes.push(media.id);

    savePreviousLikesToStorage();

    if (media.user && media.user.username) {
        outputMessage(gbGetMessage('LogLikedPostForUser', [media.user.username]));
    } else if (media.owner && media.owner.username) {
        outputMessage(gbGetMessage('LogLikedPostForUser', [media.owner.username]));
    } else {
        outputMessage(gbGetMessage('LogLikedPost'));
    }

    addStamp(media.id, 'stamp-div-green', stamp('StampLiked'));

    var waitTime = getRandomizedTime(gblOptions.timeDelay);

    if (mediaToLike.length > 0) {
        outputMessage(gbGetMessage('LogWaitingSecondsLikeNext', [String(waitTime / 1000)]));
        timeoutsQueue.push(setTimeout(likeAllMedia, waitTime));
        alreadyLiking = true;
    } else {
        alreadyLiking = false;
    }
}

function displayFreeTrialTimeLeft() {
    var datenow = new Date();
    var timenow = datenow.getTime();

    if (timenow - instabot_install_date < instabot_free_trial_time && instabot_has_license == false) {
        var timeLeft = millisecondsToHumanReadable(instabot_free_trial_time - (timenow - instabot_install_date), true);
        $('#h2FreeTrialTimeLeft').show().html(gbGetMessage('FreeTrialTimeLeft', [timeLeft]) + ' <a href="" id="linkBuyNow">' + gbGetMessage('SubscribeNow') + '</a>');
        $('#linkBuyNow').click(function (e) {
            e.preventDefault();
            chrome.runtime.sendMessage({
                "fnc": "openBuyScreen"
            });
            setTimeout(function () {
                // bad practice hack to clear ending the free trial if someone clicks the link
                localStorage.removeItem('gbFTover');
            }, 3000);
            return false;
        });
    } else if (instabot_has_license == true) {
        $('#h2FreeTrialTimeLeft').text(gbGetMessage('ThankYouSubscriber'));
        $('#relinkSubscription').hide();
        clearInterval(freeTrialInterval);
    } else {
        $('#h2FreeTrialTimeLeft').hide();
        clearInterval(freeTrialInterval);
    }
}

function timeToDate(t) {
    var date = new Date(parseInt(t));
    return date.toString();
}

function printMessage(txt) {
    outputMessage(txt);
}

function outputMessage(txt) {

    var statusDiv = document.getElementById('igBotStatusDiv');
    var fakeConsole = document.getElementById('txtConsole');

    if (txt.trim() != '' && statusDiv) {
        txt = getTimeStamp() + ' - ' + txt;
        statusDiv.textContent = txt;
        displayWaitTimeHacky();
    }

    chrome.storage.local.set({
        growbotLog: '' + fakeConsole.textContent + '\n' + txt
    }, function () { });

    fakeConsole.textContent = fakeConsole.textContent + '\n' + txt;

    scrollLog();

    includeLogInMailToLinks();

}

function scrollLog() {
    setTimeout(function () {
        var fakeConsole = document.getElementById('txtConsole');
        if (document.activeElement.id !== 'txtConsole') {
            fakeConsole.scrollTop = fakeConsole.scrollHeight;
        }
    }, 100);
}

function includeLogInMailToLinks() {
    $('.growbotEmailLink').attr('target', '_blank').attr('href', 'mailto:growbotautomator@gmail.com?body=' + encodeURIComponent('\n\n------------------------------------------------------------------------------------------------------------------------------------\nPlease type your message above this line, include the log below for debugging:\n------------------------------------------------------------------------------------------------------------------------------------\n' + document.getElementById('txtConsole').textContent.slice(-20000)));
}

function trimLog() {
    var fakeConsole = document.getElementById('txtConsole');
    //fakeConsole.textContent = fakeConsole.textContent.slice(-100);

    var arrLines = fakeConsole.textContent.split('\n');
    arrLines = arrLines.slice(arrLines.length - 1000, arrLines.length);

    fakeConsole.textContent = arrLines.join('\n');

    outputMessage(gbGetMessage('LogTrimmed'));
}

function displayWaitTimeHacky() {
    var statusDiv = document.getElementById('igBotStatusDiv');

    var statusText = statusDiv.textContent;

    if (statusText.indexOf('Max actions exceeded') > -1) {
        statusDiv.textContent = getTimeStamp() + ' - ' + gbGetMessage('LogMaxActionsExceededWaiting', [millisecondsToHumanReadable(maxActionsDelayRemaining(), true)])
        setTimeout(displayWaitTimeHacky, 1000);
        return false;
    }

    if (statusText.indexOf('waiting ') > -1 && statusText.indexOf(' seconds') > -1) {
        var secondsStart = statusText.indexOf('waiting ') + 8;
        var secondsEnd = statusText.indexOf(' second');
        var seconds = statusText.substring(secondsStart, secondsEnd);

        if (!isNaN(seconds) && (seconds - 1 > 0)) {
            statusDiv.textContent = statusDiv.textContent.replace('waiting ' + seconds + ' seconds', 'waiting ' + (Math.round((seconds - 1) * 100) / 100) + ' seconds');
            if (seconds - 1 > 1) {
                setTimeout(displayWaitTimeHacky, 1000);
            }
        }
    }

    if (statusText.indexOf('waiting ') > -1 && statusText.indexOf(' minute') > -1) {
        var secondsStart = statusText.indexOf('waiting ') + 8;
        var secondsEnd = statusText.indexOf(' minute');
        var minutes = statusText.substring(secondsStart, secondsEnd);

        if (!isNaN(minutes)) {
            seconds = minutes * 60;
            statusDiv.textContent = statusDiv.textContent.replace('waiting ' + minutes + ' minutes', 'waiting ' + (Math.round((seconds - 1) * 100) / 100) + ' seconds');
            if (seconds - 1 > 1) {
                setTimeout(displayWaitTimeHacky, 1000);
            }
        }
    }

}

function millisecondsToHumanReadable(ms, formatAsString) {

    var obj = {};
    var x = ms / 1000;
    obj.seconds = parseInt(x % 60);
    x /= 60;
    obj.minutes = parseInt(x % 60);
    x /= 60;
    obj.hours = parseInt(x % 24);
    x /= 24;
    obj.days = parseInt(x);

    if (formatAsString == false) {
        return obj;
    }

    return obj.days + ' days, ' + obj.hours + ' hours, ' + obj.minutes + ' minutes, ' + obj.seconds + ' seconds';

}

function zeroPad(digitcount, num) {
    for (var i = 0; i < digitcount; i++) {
        num = "0" + num;
    }

    return num.substr(-digitcount, digitcount);
}

function getTimeStamp() {
    var d = new Date();
    var meridium = '';
    var hours = d.getHours();

    // if (hours > 11) {
    //     meridium = ' pm';
    //     hours = hours - 12;
    // } else {
    //     meridium = ' am';
    // }

    // if (hours == 0) {
    //     meridium = ' pm';
    //     hours = 12;
    // }

    return (d.getFullYear() + '-' + zeroPad(2, d.getMonth() + 1)) + '-' + zeroPad(2, d.getDate()) + ' ' + zeroPad(2, d.getHours()) + ':' + zeroPad(2, d.getMinutes()) + ':' + zeroPad(2, d.getSeconds()) + meridium;
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return true;
        }
    }

    return false;
}

function findAcctById(id, list, returnIndexOnly) {
    if (returnIndexOnly !== true) returnIndexOnly = false;
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            if (returnIndexOnly === true) return i;
            return list[i];
        }
    }
    return false;
}

function normalizeConvenienceUsername(s) {
    return String(s || '').trim().replace(/^@/, '').toLowerCase();
}

function acctListHasUsernameNorm(list, usernameNorm) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (normalizeConvenienceUsername(list[i].username) === usernameNorm) {
            return true;
        }
    }
    return false;
}

function viewerFollowsUserFromLoadedProfile(u) {
    if (!u || u === false) return null;
    if (u.followed_by_viewer === true) return true;
    if (u.followed_by_viewer === false) return false;
    if (u.viewer_follows_user === true) return true;
    if (u.viewer_follows_user === false) return false;
    if (u.friendship_status) {
        if (u.friendship_status.following === true) return true;
        if (u.friendship_status.following === false) return false;
    }
    return null;
}

var igConvenienceFollowingButtonHints = ['following', 'friends', 'requested', 'request sent', 'pending', 'solicitud', 'pendiente', 'solicitada', 'seguido', 'abonné', 'abonniert', 'folgt', 'seguindo', 'siguiendo', 'richiesta inviata', 'verzocht', 'angefragt', 'demande envoyée'];
var igConvenienceNotFollowingButtonHints = ['follow', 'seguir', 's\'abonner', 'abonnieren', 'folgen', 'obserwuj', 'подписаться'];

function igConvenienceButtonTextSuggestsFollowing(buttonText) {
    var s = String(buttonText || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (!s) return null;
    var i;
    for (i = 0; i < igConvenienceFollowingButtonHints.length; i++) {
        if (s === igConvenienceFollowingButtonHints[i] || s.indexOf(igConvenienceFollowingButtonHints[i]) === 0) {
            return true;
        }
    }
    for (i = 0; i < igConvenienceNotFollowingButtonHints.length; i++) {
        if (s === igConvenienceNotFollowingButtonHints[i] || s.indexOf(igConvenienceNotFollowingButtonHints[i]) === 0) {
            return false;
        }
    }
    return null;
}

function igConvenienceTextIsInstagramFollowCta(s) {
    var t = String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (!t) return false;
    if (igConvenienceButtonTextSuggestsFollowing(t) === true) {
        return false;
    }
    if (t === 'follow' || /^follow\s/.test(t)) {
        return true;
    }
    if (t === 'seguir' || /^seguir\s/.test(t)) {
        return true;
    }
    if (t === 'folgen' || /^folgen\s/.test(t)) {
        return true;
    }
    if (t === 'abonnieren' || /^abonnieren\s/.test(t)) {
        return true;
    }
    if (t === 's\'abonner' || /^s'abonner\s/.test(t) || /^s’abonner\s/.test(t)) {
        return true;
    }
    if (t === 'obserwuj' || /^obserwuj\s/.test(t)) {
        return true;
    }
    if (t === 'подписаться' || t.indexOf('подписаться') === 0) {
        return true;
    }
    return false;
}

function igConvenienceElementIsInstagramFollowCTA(el) {
    if (!el || el.nodeType !== 1) {
        return false;
    }
    if (el.closest && el.closest('.igBotConvenienceLink')) {
        return false;
    }
    if (el.classList && el.classList.contains('igBotConvenienceLink')) {
        return false;
    }
    var tag = (el.tagName || '').toLowerCase();
    if (tag !== 'button' && el.getAttribute('role') !== 'button') {
        return false;
    }
    var t = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (igConvenienceTextIsInstagramFollowCta(t)) {
        return true;
    }
    var aria = el.getAttribute && el.getAttribute('aria-label');
    if (aria && igConvenienceTextIsInstagramFollowCta(aria)) {
        return true;
    }
    return false;
}

function igConvenienceScopeHasFollowCTA($usernameEl) {
    var $scope = $usernameEl.closest('article');
    if ($scope.length === 0) {
        $scope = $usernameEl.closest('main');
    }
    if ($scope.length === 0) {
        return false;
    }
    var root = $scope[0];
    var nodes = root.querySelectorAll('[role="button"], button');
    var i;
    for (i = 0; i < nodes.length; i++) {
        if (igConvenienceElementIsInstagramFollowCTA(nodes[i])) {
            return true;
        }
    }
    return false;
}

function inferFollowingFromDomNearUsername($usernameEl) {
    if (igConvenienceScopeHasFollowCTA($usernameEl)) {
        return false;
    }
    var $scope = $usernameEl.closest('article');
    if ($scope.length === 0) {
        $scope = $usernameEl.closest('main');
    }
    if ($scope.length === 0) {
        return null;
    }
    return true;
}

function inferFollowingForConveniencePill($usernameEl, usernameNorm) {
    if (typeof user !== 'undefined' && user.viewer && user.viewer.username && usernameNorm === normalizeConvenienceUsername(user.viewer.username)) {
        return false;
    }
    if (igConvenienceScopeHasFollowCTA($usernameEl)) {
        return false;
    }
    var cp = currentProfilePage;
    if (cp && cp.username && normalizeConvenienceUsername(cp.username) === usernameNorm) {
        var rel = viewerFollowsUserFromLoadedProfile(cp);
        if (rel === true || rel === false) {
            return rel;
        }
    }
    var $scope = $usernameEl.closest('article');
    if ($scope.length === 0) {
        $scope = $usernameEl.closest('main');
    }
    if ($scope.length > 0) {
        return true;
    }
    return null;
}

function convenienceLinkLabelWhitelist(onList) {
    return onList ? gbGetMessage('ConvenienceWhitelistMinus') : gbGetMessage('ConvenienceWhitelistPlus');
}

function convenienceLinkLabelBlacklist(onList) {
    return onList ? gbGetMessage('ConvenienceBlacklistMinus') : gbGetMessage('ConvenienceBlacklistPlus');
}

function convenienceLinkLabelQueue(onList) {
    return onList ? gbGetMessage('ConvenienceQueueMinus') : gbGetMessage('ConvenienceQueuePlus');
}

function refreshConvenienceLinkPillsForUsername(usernameRaw) {
    var norm = normalizeConvenienceUsername(usernameRaw);
    if (!norm) return;
    var $all = $('a.igBotConvenienceLink').filter(function () {
        return normalizeConvenienceUsername($(this).attr('data-username')) === norm;
    });
    if ($all.length === 0) return;
    var onWl = acctListHasUsernameNorm(acctsWhiteList, norm);
    var onBl = isBlacklisted({
        username: usernameRaw
    });
    var onQ = acctAlreadyInAccountsQueue({
        username: usernameRaw
    });
    var $first = $all.first();
    var following = $first.length ? inferFollowingForConveniencePill($first, norm) : null;
    $all.filter('.igBotInjectedLinkWhitelist').find('.igBotConvenienceLabel').text(convenienceLinkLabelWhitelist(onWl));
    $all.filter('.igBotInjectedLinkBlacklist').find('.igBotConvenienceLabel').text(convenienceLinkLabelBlacklist(onBl));
    $all.filter('.igBotInjectedLinkAddQueue').find('.igBotConvenienceLabel').text(convenienceLinkLabelQueue(onQ));
    var $unf = $all.filter('.igBotInjectedLinkUnfollow');
    if (following === true) {
        $unf.show();
    } else {
        $unf.hide();
    }
}

function removeAcctFromWhiteListByUsername(usernameRaw) {
    var norm = normalizeConvenienceUsername(usernameRaw);
    var before = acctsWhiteList.length;
    acctsWhiteList = acctsWhiteList.filter(function (u) {
        return normalizeConvenienceUsername(u.username) !== norm;
    });
    if (acctsWhiteList.length < before) {
        chrome.storage.local.set({
            acctsWhiteList: acctsWhiteList
        });
        printMessage(usernameRaw + gbGetMessage('RemovedFromWhitelistSuffix'));
        return true;
    }
    return false;
}

function removeAcctFromBlackListByUsername(usernameRaw) {
    var norm = normalizeConvenienceUsername(usernameRaw);
    var before = acctsBlackList.length;
    acctsBlackList = acctsBlackList.filter(function (u) {
        return normalizeConvenienceUsername(u.username) !== norm;
    });
    if (acctsBlackList.length < before) {
        chrome.storage.local.set({
            acctsBlackList: acctsBlackList
        });
        printMessage(usernameRaw + gbGetMessage('RemovedFromBlacklistSuffix'));
        return true;
    }
    return false;
}

function removeAcctsFromQueueByUsername(usernameRaw) {
    var norm = normalizeConvenienceUsername(usernameRaw);
    var before = acctsQueue.length;
    acctsQueue = acctsQueue.filter(function (u) {
        return normalizeConvenienceUsername(u.username) !== norm;
    });
    if (acctsQueue.length < before) {
        if (currentList === 'acctsQueue') {
            arrayOfUsersToDiv(acctsQueue, true);
        }
        updateCount();
        monitorButtonConditions();
        if (gblOptions.autoSaveQueue === true) {
            chrome.storage.local.set({
                acctsQueue: acctsQueue
            });
        }
        printMessage(usernameRaw + gbGetMessage('RemovedFromQueueSuffix'));
        return true;
    }
    return false;
}


var growbotProfilePathReservedSegments = ['explore', 'stories', 'accounts', 'direct', 'reel', 'p', 'tv', 'tags', 'locations', 'legal', 'about-us'];

function getProfileUsernameFromPath() {
    var parts = window.location.pathname.split('/').filter(function (p) {
        return p.length > 0;
    });
    if (parts.length !== 1) {
        return '';
    }
    if (growbotProfilePathReservedSegments.indexOf(parts[0]) > -1) {
        return '';
    }
    return parts[0];
}

function growbotConvenienceAncestorExcluded(el) {
    return !!(el && el.closest && (el.closest('.Mr508') || el.closest('.XQXOT')));
}

function findProfileConvenienceAnchor() {
    var pathUser = getProfileUsernameFromPath();
    if (!pathUser) {
        return null;
    }
    var pathNorm = normalizeConvenienceUsername(pathUser);
    var header = document.querySelector('main header');
    if (!header) {
        return null;
    }

    var matches = [];
    var nodes = header.querySelectorAll('h1, h2, span');
    var i;
    for (i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (growbotConvenienceAncestorExcluded(el)) {
            continue;
        }
        if (normalizeConvenienceUsername(el.textContent) === pathNorm) {
            matches.push(el);
        }
    }
    if (matches.length === 0) {
        return null;
    }

    for (i = 0; i < matches.length; i++) {
        var innermost = true;
        var j;
        for (j = 0; j < matches.length; j++) {
            if (i !== j && matches[i].contains(matches[j])) {
                innermost = false;
                break;
            }
        }
        if (innermost) {
            return matches[i];
        }
    }
    return matches[0];
}

function profileConvenienceLinksExistForUsername(usernameNorm) {
    var count = 0;
    $('a.igBotConvenienceLink').each(function () {
        if (normalizeConvenienceUsername($(this).attr('data-username')) === usernameNorm) {
            count++;
        }
    });
    return count >= 4;
}

function ensureProfileConvenienceLinks() {
    if (gblOptions.showConvenienceButtons == false) {
        return false;
    }
    var pathUser = getProfileUsernameFromPath();
    if (!pathUser) {
        return false;
    }
    var pathNorm = normalizeConvenienceUsername(pathUser);
    if (profileConvenienceLinksExistForUsername(pathNorm)) {
        refreshConvenienceLinkPillsForUsername(pathUser);
        return true;
    }
    var el = findProfileConvenienceAnchor();
    if (!el) {
        return false;
    }
    return addNewConvenienceLinks(el, {
        isProfile: true
    }) === true;
}

/** Inject after this node so convenience controls are not <a> inside Instagram's profile <a> (invalid; breaks clicks and nextAll). */
function growbotConvenienceAnchorToInjectAfter($usernameEl) {
    var $a = $usernameEl.closest('a[role="link"]').first();
    if ($a.length && $.contains($a[0], $usernameEl[0])) {
        return $a;
    }
    $a = $usernameEl.closest('a[href]').first();
    if ($a.length && $.contains($a[0], $usernameEl[0])) {
        var path = String($a.attr('href') || '').split('?')[0];
        if (/^\/[^/]+\/?$/.test(path)) {
            return $a;
        }
    }
    return $usernameEl;
}


function addNewConvenienceLinks(element, options) {

    options = options || {};

    if (gblOptions.showConvenienceButtons == false) return false;

    var $$this = $(element);

    if (!options.isProfile && $$this.children('div').length > 0) return false;
    if ($$this.parents('.Mr508').length > 0) return false;
    if ($$this.parents('.XQXOT').length > 0) return false;

    var username = $.trim($$this.text());
    if (!username) return false;
    var usernameNorm = normalizeConvenienceUsername(username);

    if (options.isProfile) {
        var pathNorm = normalizeConvenienceUsername(getProfileUsernameFromPath());
        if (pathNorm && usernameNorm !== pathNorm) {
            return false;
        }
    }

    var $injectAfter = growbotConvenienceAnchorToInjectAfter($$this);
    if ($injectAfter.nextAll('a.igBotConvenienceLink').slice(0, 4).length >= 4) {
        return true;
    }

    var safeUser = String(username).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    if (!window.__igBotConvenienceIconUrl) {
        window.__igBotConvenienceIconUrl = chrome.runtime.getURL('icon_16.png');
    }
    var iconSrc = window.__igBotConvenienceIconUrl;
    var iconHtml = '<img class="igBotConvenienceIcon" src="' + iconSrc + '" width="11" height="11" alt="" draggable="false" />';

    function convenienceLink(cls, label) {
        return '<a class="igBotConvenienceLink ' + cls + '" href="javascript:void(0);" data-username="' + safeUser + '">' + iconHtml + '<span class="igBotConvenienceLabel">' + label + '</span></a>';
    }

    var onWl = acctListHasUsernameNorm(acctsWhiteList, usernameNorm);
    var onBl = isBlacklisted({
        username: username
    });
    var onQ = acctAlreadyInAccountsQueue({
        username: username
    });
    var following = inferFollowingForConveniencePill($$this, usernameNorm);

    var html = convenienceLink('igBotInjectedLinkWhitelist', convenienceLinkLabelWhitelist(onWl)) +
        ' ' +
        convenienceLink('igBotInjectedLinkBlacklist', convenienceLinkLabelBlacklist(onBl)) +
        ' ' +
        convenienceLink('igBotInjectedLinkAddQueue', convenienceLinkLabelQueue(onQ)) +
        ' ' +
        convenienceLink('igBotInjectedLinkUnfollow', gbGetMessage('Unfollow'));
    $injectAfter.after(html);
    bindGrowbotConvenienceInjectedLinks($injectAfter);
    if (following !== true) {
        $injectAfter.nextAll('a.igBotInjectedLinkUnfollow').first().hide();
    }
    $$this.parents('.RqtMr').css({
        'max-width': 'initial'
    });

    return true;

}

function bindGrowbotConvenienceInjectedLinks($usernameElement) {
    var $links = $usernameElement.nextAll('a.igBotConvenienceLink').slice(0, 4);
    $links.off('click.growbotConvenience').on('click.growbotConvenience', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $link = $(this);
        if ($link.data('growbotConvenienceLoading')) {
            return;
        }
        $link.data('growbotConvenienceLoading', true);
        $link.css({
            "color": "white"
        }).append('<div class="igBotLoader"></div>');
        var username = $link.attr('data-username');
        var finish = function () {
            $link.removeData('growbotConvenienceLoading');
            $link.find('.igBotLoader').remove();
            $link.css('color', '');
            refreshConvenienceLinkPillsForUsername(username);
        };
        var p;
        if ($link.hasClass('igBotInjectedLinkUnfollow')) {
            p = convenienceLinkUnfollowAcct(username);
        } else if ($link.hasClass('igBotInjectedLinkWhitelist')) {
            p = convenienceLinkWhitelistAcct(username);
        } else if ($link.hasClass('igBotInjectedLinkBlacklist')) {
            p = convenienceLinkBlacklistAcct(username);
        } else if ($link.hasClass('igBotInjectedLinkAddQueue')) {
            p = convenienceLinkAddToQueueAcct(username);
        }
        if (p != null && typeof p.then === 'function') {
            p.then(finish, finish);
        } else if (p != null && typeof p.promise === 'function' && typeof p.always === 'function') {
            p.always(finish);
        } else if (p != null && typeof p.always === 'function') {
            p.always(finish);
        } else {
            finish();
        }
    });
}


async function convenienceLinkUnfollowAcct(userName) {
    var acct = await getAdditionalDataForAcct({
        username: userName
    });
    return quickUnfollowAcct(acct);
}

async function convenienceLinkWhitelistAcct(userName) {
    var acct = await getAdditionalDataForAcct({
        username: userName
    });
    var norm = normalizeConvenienceUsername(acct.username);
    var onList = containsObject(acct, acctsWhiteList) === true || acctListHasUsernameNorm(acctsWhiteList, norm);
    if (onList) {
        removeAcctFromWhiteListByUsername(acct.username);
    } else {
        if (addAcctToWhiteList(acct) === true) saveWhiteListToStorage();
    }
}

function waitForTrue(variableNames, callback, args) {
    var allTrue = true;
    var waitingFor = 'waiting for ';
    for (var i = 0; i < variableNames.length; i++) {
        if (window[variableNames[i]] === false) {
            allTrue = false;
            waitingFor = waitingFor + variableNames[i] + ' ';
        } else {
            waitingFor = waitingFor.replace(variableNames[i], '');
        }
    }

    if (allTrue === true) {
        printMessage(gbGetMessage('Done'));
        callback.apply(this, args);
    } else {
        timeoutsQueue.push(setTimeout(function () {
            waitForTrue(variableNames, callback, args);
        }, 1000));
    }

}

function waitForElement(query, parent, callback, reenable) {
    const observer = new MutationObserver((mutations, obs) => {
        var elementToObserve = document.querySelectorAll(query)[0];
        if (elementToObserve) {
            callback();

            if (reenable == true) {
                setTimeout(function () {
                    obs.observe(parent, {
                        childList: true,
                        subtree: true
                    });
                }, 1000);
            }

            obs.disconnect();
            return;
        }
    });

    observer.observe(parent, {
        childList: true,
        subtree: true
    });

}

var growbotColorSchemeMediaBound = false;

function getGrowbotEffectiveTheme() {
    var pref = gblOptions && gblOptions.uiColorTheme;
    if (pref !== 'light' && pref !== 'dark' && pref !== 'system' && pref !== 'easter' && pref !== 'darkred') {
        pref = 'light';
    }
    if (pref === 'easter') {
        return 'easter';
    }
    if (pref === 'darkred') {
        return 'darkred';
    }
    if (pref === 'dark') {
        return 'dark';
    }
    if (pref === 'system') {
        var systemDark = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemDark ? 'dark' : 'light';
    }
    return 'light';
}

function applyGrowbotTheme() {
    var container = document.getElementById('igBotInjectedContainer');
    if (!container) {
        return;
    }
    var pref = gblOptions && gblOptions.uiColorTheme;
    if (pref !== 'light' && pref !== 'dark' && pref !== 'system' && pref !== 'easter' && pref !== 'darkred') {
        pref = 'light';
    }
    var theme = getGrowbotEffectiveTheme();

    container.classList.remove('growbot-theme-dark', 'growbot-theme-easter', 'growbot-theme-darkred');
    if (theme === 'easter') {
        container.classList.add('growbot-theme-easter');
    } else if (theme === 'darkred') {
        container.classList.add('growbot-theme-darkred');
    } else if (theme === 'dark') {
        container.classList.add('growbot-theme-dark');
    }
    container.setAttribute('data-growbot-theme-pref', pref);

    if (!growbotColorSchemeMediaBound && typeof window.matchMedia === 'function') {
        growbotColorSchemeMediaBound = true;
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
            if (gblOptions && gblOptions.uiColorTheme === 'system') {
                applyGrowbotTheme();
            }
        });
    }

    postGrowbotEmbedPrefsToAll();
}

function syncGrowbotThemeRadios() {
    var pref = gblOptions && gblOptions.uiColorTheme;
    if (pref !== 'light' && pref !== 'dark' && pref !== 'system' && pref !== 'easter' && pref !== 'darkred') {
        pref = 'light';
    }
    document.querySelectorAll('#igBotInjectedContainer input[name="growbotUiColorTheme"]').forEach(function (r) {
        r.checked = r.value === pref;
    });
}

function getGrowbotLocalePickerMeta() {
    return { labels: GrowbotI18n.LOCALE_LABELS, codes: GrowbotI18n.LOCALE_CODES };
}

function updateGrowbotMatchSystemLabel() {
    var el = document.getElementById('growbotLocaleMatchSystemLabel');
    if (!el || !window.GrowbotI18n) {
        return;
    }
    var base = gbGetMessage('LocaleMatchSystem') || 'Match System';
    var systemCode = GrowbotI18n.resolveSystemLocale();
    el.textContent = base + ' (' + GrowbotI18n.formatLocalePickerLabel(systemCode) + ')';
}

function buildLanguageOptions() {
    var host = document.querySelector('#igBotInjectedContainer #growbotLanguageOptions');
    var meta = getGrowbotLocalePickerMeta();
    if (!host || !meta) {
        return;
    }
    host.innerHTML = '';
    var pref = (gblOptions && gblOptions.uiLocale) || 'system';

    function addRadio(value, labelText) {
        var label = document.createElement('label');
        var input = document.createElement('input');
        input.type = 'radio';
        input.name = 'growbotUiLocale';
        input.value = value;
        if (value === pref) {
            input.checked = true;
        }
        var span = document.createElement('span');
        if (value === 'system') {
            span.id = 'growbotLocaleMatchSystemLabel';
            span.textContent = 'Match System';
        } else {
            span.textContent = labelText;
        }
        label.appendChild(input);
        label.appendChild(document.createTextNode(' '));
        label.appendChild(span);
        host.appendChild(label);
    }

    addRadio('system', 'Match System');
    meta.codes.forEach(function (code) {
        addRadio(code, GrowbotI18n.formatLocalePickerLabel(code));
    });
    bindGrowbotLocaleEvents();
    updateGrowbotMatchSystemLabel();
}

function bindGrowbotLocaleEvents() {
    $('#growbotLanguageOptions').off('change.growbotUiLocale', 'input[name="growbotUiLocale"]')
        .on('change.growbotUiLocale', 'input[name="growbotUiLocale"]', onGrowbotLocaleChange);
}

var GENDER_COUNTRY_OPTIONS = [
    { code: 'auto', labelKey: 'GenderCountryAuto' },
    { code: 'ZZ', labelKey: 'GenderCountryGlobal' },
    { code: 'US', label: 'United States' },
    { code: 'BR', label: 'Brazil' },
    { code: 'GB', label: 'United Kingdom' },
    { code: 'CA', label: 'Canada' },
    { code: 'AU', label: 'Australia' },
    { code: 'DE', label: 'Germany' },
    { code: 'FR', label: 'France' },
    { code: 'ES', label: 'Spain' },
    { code: 'IT', label: 'Italy' },
    { code: 'PT', label: 'Portugal' },
    { code: 'MX', label: 'Mexico' },
    { code: 'AR', label: 'Argentina' },
    { code: 'CO', label: 'Colombia' },
    { code: 'CL', label: 'Chile' },
    { code: 'IN', label: 'India' },
    { code: 'JP', label: 'Japan' },
    { code: 'KR', label: 'South Korea' },
    { code: 'CN', label: 'China' },
    { code: 'RU', label: 'Russia' },
    { code: 'PL', label: 'Poland' },
    { code: 'NL', label: 'Netherlands' },
    { code: 'SE', label: 'Sweden' },
    { code: 'NO', label: 'Norway' },
    { code: 'DK', label: 'Denmark' },
    { code: 'FI', label: 'Finland' },
    { code: 'TR', label: 'Turkey' },
    { code: 'SA', label: 'Saudi Arabia' },
    { code: 'AE', label: 'United Arab Emirates' },
    { code: 'ZA', label: 'South Africa' },
    { code: 'NG', label: 'Nigeria' },
    { code: 'PH', label: 'Philippines' },
    { code: 'ID', label: 'Indonesia' },
    { code: 'TH', label: 'Thailand' },
    { code: 'VN', label: 'Vietnam' },
    { code: 'IL', label: 'Israel' },
    { code: 'GR', label: 'Greece' },
    { code: 'RO', label: 'Romania' },
    { code: 'HU', label: 'Hungary' },
    { code: 'CZ', label: 'Czechia' },
    { code: 'AT', label: 'Austria' },
    { code: 'CH', label: 'Switzerland' },
    { code: 'BE', label: 'Belgium' },
    { code: 'IE', label: 'Ireland' },
    { code: 'NZ', label: 'New Zealand' },
    { code: 'SG', label: 'Singapore' },
    { code: 'MY', label: 'Malaysia' },
    { code: 'HK', label: 'Hong Kong' },
    { code: 'TW', label: 'Taiwan' }
];

function buildGenderCountryOptions() {
    var sel = document.getElementById('selGenderCountry');
    if (!sel) {
        return;
    }
    var pref = (gblOptions && gblOptions.genderCountry) || 'auto';
    sel.innerHTML = '';
    GENDER_COUNTRY_OPTIONS.forEach(function (opt) {
        var option = document.createElement('option');
        option.value = opt.code;
        if (opt.labelKey) {
            option.textContent = gbGetMessage(opt.labelKey);
        } else {
            option.textContent = opt.label;
        }
        if (opt.code === pref) {
            option.selected = true;
        }
        sel.appendChild(option);
    });
}

function resolveGenderCountryCode() {
    var pref = (gblOptions && gblOptions.genderCountry) || 'auto';
    if (pref === 'ZZ') {
        return 'ZZ';
    }
    if (pref && pref !== 'auto' && String(pref).length === 2) {
        return String(pref).toUpperCase();
    }
    var lang = (chrome.i18n && chrome.i18n.getUILanguage) ? chrome.i18n.getUILanguage() : 'en';
    var parts = String(lang).split(/[-_]/);
    if (parts.length >= 2 && parts[1].length === 2) {
        return parts[1].toUpperCase();
    }
    var langMap = {
        en: 'US',
        pt: 'BR',
        es: 'ES',
        fr: 'FR',
        de: 'DE',
        it: 'IT',
        nl: 'NL',
        ja: 'JP',
        ko: 'KR',
        zh: 'CN',
        ru: 'RU',
        ar: 'SA',
        hi: 'IN',
        id: 'ID',
        tr: 'TR',
        pl: 'PL',
        sv: 'SE',
        da: 'DK',
        fi: 'FI',
        no: 'NO',
        he: 'IL',
        el: 'GR',
        ro: 'RO',
        hu: 'HU',
        cs: 'CZ'
    };
    return langMap[(parts[0] || '').toLowerCase()] || 'ZZ';
}

function normalizeNameForGender(name) {
    if (!name) {
        return '';
    }
    name = String(name).trim();
    if (name === '') {
        return '';
    }
    try {
        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } catch (e) { }
    name = name.toUpperCase().replace(/[^A-Z]/g, '');
    return name;
}

/** Best-effort English-leaning tokens that are unlikely to be personal first names. */
var GENDER_NAME_STOPWORDS = {
    OFFICIAL: true, REAL: true, THE: true, LLC: true, INC: true, STUDIO: true,
    PHOTOGRAPHY: true, ART: true, FITNESS: true, COACH: true, SHOP: true,
    STORE: true, PAGE: true, FAN: true, TEAM: true, MEDIA: true, MUSIC: true,
    BEAUTY: true, SALON: true, CLINIC: true, TV: true, BLOG: true, NEWS: true,
    DAILY: true, LIFE: true, LOVE: true, WORLD: true, GLOBAL: true, BRAND: true
};

function genderIsNameStopword(token) {
    return !!GENDER_NAME_STOPWORDS[token];
}

function genderDedupeTokens(tokens) {
    var out = [];
    var seen = {};
    var i;
    for (i = 0; i < tokens.length; i++) {
        if (!tokens[i] || seen[tokens[i]]) {
            continue;
        }
        seen[tokens[i]] = true;
        out.push(tokens[i]);
    }
    return out;
}

function genderPronounTokensFromValue(pronouns) {
    if (!pronouns) {
        return [];
    }
    var text = Array.isArray(pronouns) ? pronouns.join(' ') : String(pronouns);
    text = text.toLowerCase();
    return text.split(/[^a-z]+/).filter(function (t) { return t.length > 0; });
}

function parsePronounsGender(a) {
    var tokens = genderPronounTokensFromValue(a && a.pronouns);
    if (!tokens.length) {
        return null;
    }
    var hasF = false;
    var hasM = false;
    var i;
    for (i = 0; i < tokens.length; i++) {
        var t = tokens[i];
        if (t === 'she' || t === 'her' || t === 'hers') {
            hasF = true;
        } else if (t === 'he' || t === 'him' || t === 'his') {
            hasM = true;
        }
    }
    if (hasF && !hasM) {
        return 'F';
    }
    if (hasM && !hasF) {
        return 'M';
    }
    return null;
}

function extractNameCandidatesFromFullName(fullName) {
    if (!fullName) {
        return [];
    }
    var parts = String(fullName).split(/[\s|,/\-]+/);
    var tokens = [];
    var i;
    for (i = 0; i < parts.length; i++) {
        var norm = normalizeNameForGender(parts[i]);
        if (!norm || norm.length < 2 || genderIsNameStopword(norm)) {
            continue;
        }
        tokens.push(norm);
    }
    return genderDedupeTokens(tokens);
}

function extractNameCandidatesFromUsername(username) {
    if (!username) {
        return [];
    }
    var raw = String(username);
    var parts = raw.split(/[._\-0-9]+/);
    var tokens = [];
    var i;
    for (i = 0; i < parts.length; i++) {
        var norm = normalizeNameForGender(parts[i]);
        if (!norm || norm.length < 2 || genderIsNameStopword(norm)) {
            continue;
        }
        tokens.push(norm);
    }
    var fullNorm = normalizeNameForGender(raw);
    if (fullNorm && fullNorm.length >= 2 && !genderIsNameStopword(fullNorm)) {
        tokens.push(fullNorm);
    }
    return genderDedupeTokens(tokens);
}

function genderFirstLookupHit(candidates, lookupMap) {
    var i;
    for (i = 0; i < candidates.length; i++) {
        var g = lookupMap[candidates[i]];
        if (g === 'F' || g === 'M') {
            return g;
        }
    }
    return null;
}

function resolveAccountGender(a, lookupMap) {
    var pronounGender = parsePronounsGender(a);
    if (pronounGender === 'F' || pronounGender === 'M') {
        a.gender = pronounGender;
        a.genderSource = 'pronouns';
        return a;
    }
    var nameCandidates = a._genderNameCandidates || extractNameCandidatesFromFullName(a.full_name);
    var nameHit = genderFirstLookupHit(nameCandidates, lookupMap);
    if (nameHit) {
        a.gender = nameHit;
        a.genderSource = 'name';
        return a;
    }
    var userCandidates = a._genderUsernameCandidates || extractNameCandidatesFromUsername(a.username);
    var userHit = genderFirstLookupHit(userCandidates, lookupMap);
    if (userHit) {
        a.gender = userHit;
        a.genderSource = 'username';
        return a;
    }
    a.gender = null;
    a.genderSource = null;
    return a;
}

function genderUnionCandidates(nameCandidates, usernameCandidates) {
    return genderDedupeTokens(nameCandidates.concat(usernameCandidates));
}

var genderLookupCache = {};
var genderBatchPending = false;
var GENDER_LOOKUP_CHUNK_SIZE = 1000;

async function lookupGenders(nameNorms, countryCode) {
    countryCode = (countryCode || 'ZZ').toUpperCase();
    var pending = [];
    var result = {};
    var i;
    for (i = 0; i < nameNorms.length; i++) {
        var n = normalizeNameForGender(nameNorms[i]);
        if (!n) {
            continue;
        }
        var cacheKey = countryCode + ':' + n;
        if (genderLookupCache.hasOwnProperty(cacheKey)) {
            result[n] = genderLookupCache[cacheKey];
        } else if (pending.indexOf(n) === -1) {
            pending.push(n);
        }
    }
    if (pending.length === 0) {
        return result;
    }
    if (!sessionToken) {
        return result;
    }

    for (var offset = 0; offset < pending.length; offset += GENDER_LOOKUP_CHUNK_SIZE) {
        var chunk = pending.slice(offset, offset + GENDER_LOOKUP_CHUNK_SIZE);
        try {
            var resp = await fetch('https://www.growbotforfollowers.com/actions/gender_lookup.php', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    country_code: countryCode,
                    first_names: chunk
                })
            });
            if (!resp.ok) {
                continue;
            }
            var data = await resp.json();
            var genders = data.genders || {};
            for (var key in genders) {
                if (!Object.prototype.hasOwnProperty.call(genders, key)) {
                    continue;
                }
                genderLookupCache[countryCode + ':' + key] = genders[key];
                result[key] = genders[key];
            }
        } catch (e) {
            console.warn('gender lookup failed', e);
        }
    }
    return result;
}

async function appendGenderToAcct(a) {
    if (!gblOptions.getGender || genderBatchPending) {
        return a;
    }
    var pronounGender = parsePronounsGender(a);
    if (pronounGender === 'F' || pronounGender === 'M') {
        a.gender = pronounGender;
        a.genderSource = 'pronouns';
        return a;
    }
    var nameCandidates = extractNameCandidatesFromFullName(a.full_name);
    var usernameCandidates = extractNameCandidatesFromUsername(a.username);
    var allCandidates = genderUnionCandidates(nameCandidates, usernameCandidates);
    if (!allCandidates.length) {
        a.gender = null;
        a.genderSource = null;
        return a;
    }
    a._genderNameCandidates = nameCandidates;
    a._genderUsernameCandidates = usernameCandidates;
    var map = await lookupGenders(allCandidates, resolveGenderCountryCode());
    resolveAccountGender(a, map);
    delete a._genderNameCandidates;
    delete a._genderUsernameCandidates;
    return a;
}

async function appendGenderToQueue(q) {
    if (!gblOptions.getGender || !q || !q.length) {
        return q;
    }
    var allCandidates = [];
    var pending = [];
    var i;
    for (i = 0; i < q.length; i++) {
        var acct = q[i];
        var pronounGender = parsePronounsGender(acct);
        if (pronounGender === 'F' || pronounGender === 'M') {
            acct.gender = pronounGender;
            acct.genderSource = 'pronouns';
            continue;
        }
        acct._genderNameCandidates = extractNameCandidatesFromFullName(acct.full_name);
        acct._genderUsernameCandidates = extractNameCandidatesFromUsername(acct.username);
        var union = genderUnionCandidates(acct._genderNameCandidates, acct._genderUsernameCandidates);
        if (!union.length) {
            acct.gender = null;
            acct.genderSource = null;
            continue;
        }
        pending.push(acct);
        allCandidates = allCandidates.concat(union);
    }
    allCandidates = genderDedupeTokens(allCandidates);
    var map = allCandidates.length ? await lookupGenders(allCandidates, resolveGenderCountryCode()) : {};
    for (i = 0; i < pending.length; i++) {
        resolveAccountGender(pending[i], map);
        delete pending[i]._genderNameCandidates;
        delete pending[i]._genderUsernameCandidates;
    }
    return q;
}

function syncGrowbotLocaleRadios() {
    var pref = (gblOptions && gblOptions.uiLocale) || 'system';
    var meta = getGrowbotLocalePickerMeta();
    if (pref !== 'system' && (!meta || !meta.labels[pref])) {
        pref = 'system';
    }
    document.querySelectorAll('#igBotInjectedContainer input[name="growbotUiLocale"]').forEach(function (r) {
        r.checked = r.value === pref;
    });
}

function applyGrowbotLocale(done) {
    GrowbotI18n.setPreference((gblOptions && gblOptions.uiLocale) || 'system', function () {
        localizeExtension();
        refreshGrowbotDynamicLocaleText();
        if (done) {
            done();
        }
    });
}

var GROWBOT_EMBED_ORIGIN = 'https://www.growbotforfollowers.com';
var growbotEmbedBridgeReady = false;
var growbotEmbedIframeReady = {};

function isGrowbotEmbedChildOrigin(origin) {
    return origin === GROWBOT_EMBED_ORIGIN || origin === 'https://growbotforfollowers.com';
}

function postGrowbotEmbedPrefs(iframeId) {
    if (!growbotEmbedIframeReady[iframeId]) {
        return;
    }
    var iframe = document.getElementById(iframeId);
    if (!iframe || !iframe.contentWindow) {
        return;
    }
    try {
        iframe.contentWindow.postMessage({
            type: 'growbotSetTheme',
            theme: getGrowbotEffectiveTheme()
        }, GROWBOT_EMBED_ORIGIN);
        if (iframeId === 'iframeNews') {
            iframe.contentWindow.postMessage({
                type: 'growbotSetLocale',
                locale: GrowbotI18n.getEffectiveLocale()
            }, GROWBOT_EMBED_ORIGIN);
        }
    } catch (e) {
        /* ignore */
    }
}

function postGrowbotEmbedPrefsToAll() {
    ['iframeNews', 'iframeFAQ', 'iframeAffiliate'].forEach(function (id) {
        postGrowbotEmbedPrefs(id);
    });
}

function initGrowbotEmbedBridge() {
    if (!growbotEmbedBridgeReady) {
        growbotEmbedBridgeReady = true;
        window.addEventListener('message', function (event) {
            if (!isGrowbotEmbedChildOrigin(event.origin)) {
                return;
            }
            var data = event.data;
            if (!data) {
                return;
            }
            if (data.type === 'growbotEmbedReady' || data.type === 'growbotNewsReady') {
                var iframeIds = ['iframeNews', 'iframeFAQ', 'iframeAffiliate'];
                for (var i = 0; i < iframeIds.length; i++) {
                    var iframe = document.getElementById(iframeIds[i]);
                    if (iframe && iframe.contentWindow === event.source) {
                        growbotEmbedIframeReady[iframeIds[i]] = true;
                        postGrowbotEmbedPrefs(iframeIds[i]);
                        break;
                    }
                }
            }
        });
    }
    [
        { id: 'iframeNews', tab: 'li.tab6' },
        { id: 'iframeFAQ', tab: 'li.tab7' },
        { id: 'iframeAffiliate', tab: 'li.tab9' }
    ].forEach(function (cfg) {
        var iframe = document.getElementById(cfg.id);
        if (iframe && !iframe.dataset.growbotEmbedBound) {
            iframe.dataset.growbotEmbedBound = '1';
            iframe.addEventListener('load', function () {
                if (growbotEmbedIframeReady[cfg.id]) {
                    setTimeout(function () {
                        postGrowbotEmbedPrefs(cfg.id);
                    }, 0);
                }
                growbotEmbedIframeReady[cfg.id] = true;
                setTimeout(function () {
                    postGrowbotEmbedPrefs(cfg.id);
                }, 0);
            });
        }
        var tabLabel = document.querySelector('#igBotInjectedContainer ' + cfg.tab + ' label');
        if (tabLabel && !tabLabel.dataset.growbotEmbedBound) {
            tabLabel.dataset.growbotEmbedBound = '1';
            tabLabel.addEventListener('click', function () {
                setTimeout(function () {
                    postGrowbotEmbedPrefs(cfg.id);
                }, 0);
            });
        }
    });
}

function postNewsLocale() {
    postGrowbotEmbedPrefs('iframeNews');
}

function refreshGrowbotAccountsQueueForLocale() {
    if (!document.getElementById('gridjsAcctsQueueWrapper')) {
        return;
    }
    if (currentList === 'acctsWhiteList') {
        arrayOfUsersToDiv(acctsWhiteList, true);
    } else if (currentList === 'acctsBlackList') {
        arrayOfUsersToDiv(acctsBlackList, true);
    } else if (currentList === 'acctsPreviouslyAttempted') {
        arrayOfUsersToDiv(acctsPreviouslyAttempted, true);
    } else {
        arrayOfUsersToDiv(acctsQueue, true);
    }
}

function refreshGrowbotDynamicLocaleText() {
    growbotApplyFirefoxIframeFallback();
    if (typeof displayFreeTrialTimeLeft === 'function') {
        displayFreeTrialTimeLeft();
    }
    if (document.getElementById('h1GrowbotHeading')) {
        injectVersionNumber();
    }
    updateGrowbotMatchSystemLabel();
    buildGenderCountryOptions();
    if (document.getElementById('queueColumnsOptions')) {
        loadOptionsColumns();
    }
    refreshGrowbotAccountsQueueForLocale();
    if (typeof updateFilterPairWarnings === 'function') {
        updateFilterPairWarnings();
    }
    postNewsLocale();
}

function onGrowbotLocaleChange() {
    var localeRadio = document.querySelector('#igBotInjectedContainer input[name="growbotUiLocale"]:checked');
    if (!localeRadio) {
        return;
    }
    gblOptions.uiLocale = localeRadio.value;
    chrome.storage.local.set({
        gblOptions: gblOptions
    });
    applyGrowbotLocale();
}

function loadOptions() {
    chrome.storage.local.get("gblOptions", function (data) {
        if (typeof data.gblOptions != 'undefined') {
            gblOptions = data.gblOptions;

            if (typeof gblOptions.filterOptions == 'undefined') {
                gblOptions.filterOptions = defaultFilterOptions;
            }

            // for newly added options: set gblOptions.xxxx to default option if .xxxx wasn't in previously saved options
            for (var key in defaultOptions) {
                if (gblOptions.hasOwnProperty(key) === false) {
                    gblOptions[key] = defaultOptions[key];
                }
            }

            // for newly added filter options: set gblOptions.filterOptions.xxxx to default option if .xxxx wasn't in previously saved options
            for (var key in defaultFilterOptions) {
                if (gblOptions.filterOptions.hasOwnProperty(key) === false) {
                    gblOptions.filterOptions[key] = defaultFilterOptions[key];
                }
            }

            document.getElementById('textSecondsBetweenActions').value = gblOptions.timeDelay / 1000;
            document.getElementById('textSecondsAfterSkip').value = gblOptions.timeDelayAfterSkip / 1000;
            document.getElementById('textMinutesAfterSoftRateLimit').value = gblOptions.timeDelayAfterSoftRateLimit / 60000;
            document.getElementById('textMinutesAfter429RateLimit').value = gblOptions.timeDelayAfter429RateLimit / 60000;
            document.getElementById('textHoursAfterHardRateLimit').value = gblOptions.timeDelayAfterHardRateLimit / 3600000;
            document.getElementById('texttimeDelayAfterAdditionalInfo').value = gblOptions.timeDelayAfterAdditionalInfo / 1000;
            document.getElementById('textRetryAfterAdditionalInfo404').value = Number(gblOptions.retriesAfterAdditionalInfo404);
            document.getElementById('cbuseTimeDelayAfterAdditionalInfo').checked = gblOptions.useTimeDelayAfterAdditionalInfo;
            document.getElementById('cbRandomizeTimeDelay').checked = gblOptions.useRandomTimeDelay;
            document.getElementById('cbFollowPrivateAccounts').checked = gblOptions.followPrivateAccounts;
            document.getElementById('cbFilterNonPrivate').checked = gblOptions.filterOptions.non_private;
            document.getElementById('cbFilterVerified').checked = gblOptions.filterOptions.verified;
            document.getElementById('cbFilterNonVerified').checked = gblOptions.filterOptions.non_verified;
            document.getElementById('cbFilterBusiness').checked = gblOptions.filterOptions.is_business_account;
            document.getElementById('cbFilterNonBusiness').checked = gblOptions.filterOptions.non_is_business_account;
            document.getElementById('cbFilterJoinedRecently').checked = gblOptions.filterOptions.is_joined_recently;
            document.getElementById('cbFilterNonJoinedRecently').checked = gblOptions.filterOptions.non_is_joined_recently;
            document.getElementById('cbFollowsMe').checked = gblOptions.filterOptions.follows_me;
            document.getElementById('cbNonFollowsMe').checked = gblOptions.filterOptions.non_follows_me;
            document.getElementById('cbFollowedByMe').checked = gblOptions.filterOptions.followed_by_me;
            document.getElementById('cbNonFollowedByMe').checked = gblOptions.filterOptions.non_followed_by_me;
            document.getElementById('cbFilterNoProfilePic').checked = gblOptions.filterOptions.no_profile_pic;
            document.getElementById('cbFilterProfilePic').checked = gblOptions.filterOptions.profile_pic;
            document.getElementById('cbApplyFilterAutomatically').checked = gblOptions.filterOptions.applyFiltersAutomatically;
            document.getElementById('igBotPercentRandomTimeDelay').value = gblOptions.percentRandomTimeDelay * 200;
            document.getElementById('cbDontUnfollowFollowers').checked = gblOptions.dontUnFollowFollowers;
            document.getElementById('cbDontUnfollowNonGrowbot').checked = gblOptions.dontUnFollowNonGrowbot;
            document.getElementById('cbDontUnfollowFilters').checked = gblOptions.dontUnFollowFilters;
            document.getElementById('cbDontRemoveOrBlockFilters').checked = gblOptions.dontRemoveOrBlockFilters;
            document.getElementById('cbDontUnfollowFresh').checked = !gblOptions.unFollowFresh;
            document.getElementById('cbUnfollowOld').checked = gblOptions.unFollowIfOld;
            document.getElementById('textUnfollowNew').value = gblOptions.unFollowDelay / 86400000;
            document.getElementById('textUnfollowOld').value = gblOptions.unFollowIfOlderThan / 86400000;
            document.getElementById('cbLimitQueueSize').checked = gblOptions.limitQueue;
            document.getElementById('txtLimitQueueSize').value = gblOptions.maxAcctQueueLength;
            document.getElementById('cbLimitMediaQueueSize').checked = gblOptions.limitMediaQueue;
            document.getElementById('txtLimitMediaQueueSize').value = gblOptions.maxMediaQueueLength;
            document.getElementById('numberFollowLikeLatestPics').value = gblOptions.numberFollowLikeLatestPics || 1;
            document.getElementById('cbRemoveFromQueue').checked = gblOptions.removeAccountsFromQueue;
            document.getElementById('cbAutoSaveQueue').checked = gblOptions.autoSaveQueue;
            document.getElementById('cbAllowDuplicateAccounts').checked = gblOptions.allowDuplicateAccounts;
            document.getElementById('cbShowStamps').checked = gblOptions.showStamps;
            document.getElementById('cbShowProfilePicInQueue').checked = gblOptions.showProfilePicInQueue;
            document.getElementById('cbConvenienceLinks').checked = gblOptions.showConvenienceButtons;
            document.getElementById('cbFollowAlreadyAttempted').checked = gblOptions.followPeopleAlreadyAttempted;
            document.getElementById('cbShowLikesInQueue').checked = gblOptions.showLikesInQueue;
            document.getElementById('cbShowQueueOnScreen').checked = gblOptions.cbShowQueueOnScreen;
            document.getElementById('cbRemoveUnusedColumns').checked = gblOptions.cbRemoveUnusedColumns;
            document.getElementById('cbClickNotNow').checked = gblOptions.clickNotNow;
            document.getElementById('cbShowNotifications').checked = gblOptions.showNotifications;
            document.getElementById('cbLoadQueueOnStartup').checked = gblOptions.loadQueueOnStartup;
            document.getElementById('cbKeepInstagramTabsAwake').checked = gblOptions.keepInstagramTabsAwake !== false;
            document.getElementById('cbLimitActions').checked = gblOptions.maxPerEnabled;
            document.getElementById('textLimitActionsPer').value = gblOptions.maxPerActions;
            document.getElementById('textLimitActionsPerTime').value = gblOptions.maxPerPeriod / 3600000;
            document.getElementById('cbGetExtendedData').checked = gblOptions.getExtendedData;
            document.getElementById('cbGetLastPostDate').checked = gblOptions.getLastPostDate;
            document.getElementById('cbGuessGender').checked = gblOptions.getGender;
            document.getElementById('cbFilterBioContains').checked = gblOptions.filterOptions.bio_contains;
            document.getElementById('cbFilterBioNotContains').checked = gblOptions.filterOptions.bio_not_contains;
            document.getElementById('txtFilterBioContains').value = gblOptions.filterOptions.bio_contains_text;
            document.getElementById('txtFilterBioNotContains').value = gblOptions.filterOptions.bio_not_contains_text;
            document.getElementById('cbFilterExternalUrlContains').checked = gblOptions.filterOptions.external_url_contains;
            document.getElementById('cbFilterExternalUrlNotContains').checked = gblOptions.filterOptions.external_url_not_contains;
            document.getElementById('txtFilterExternalUrlContains').value = gblOptions.filterOptions.external_url_contains_text;
            document.getElementById('txtFilterExternalUrlNotContains').value = gblOptions.filterOptions.external_url_not_contains_text;
            document.getElementById('cbFilterBusinessCategoryNameContains').checked = gblOptions.filterOptions.business_category_name_contains;
            document.getElementById('cbFilterBusinessCategoryNameNotContains').checked = gblOptions.filterOptions.business_category_name_not_contains;
            document.getElementById('txtFilterBusinessCategoryNameContains').value = gblOptions.filterOptions.business_category_name_contains_text;
            document.getElementById('txtFilterBusinessCategoryNameNotContains').value = gblOptions.filterOptions.business_category_name_not_contains_text;
            document.getElementById('cbMediaIncludeLikersCommentersTagged').checked = gblOptions.MediaIncludeLikersCommentersTagged;
            document.getElementById('SaveWhenWatchingReel').checked = gblOptions.SaveWhenWatchingReel;
            document.getElementById('LikeWhenWatchingReel').checked = gblOptions.LikeWhenWatchingReel;
            document.getElementById('includeSuggestedPostsFromFeed').checked = gblOptions.includeSuggestedPostsFromFeed;
            document.getElementById('includePinnedPostForLikes').checked = gblOptions.includePinnedPostForLikes;
            document.getElementById('includePinnedPostForComments').checked = gblOptions.includePinnedPostForComments;
            document.getElementById('cbLikeAfterFollow').checked = gblOptions.likeAfterFollow;
            document.getElementById('cbUnfollowAfterFollow').checked = gblOptions.unfollowAfterFollow;
            document.getElementById('numberUnfollowAfterDays').value = gblOptions.unfollowAfterDays || 7;

            $('#paginationLimit option:selected').attr("selected", null);
            $('#paginationLimit option[value="' + gblOptions.paginationLimit + '"]').attr("selected", "selected");
            $('#paginationLimit').trigger('change');

            if ($('#actionspaginationLimit').length) {
                var apSaved = gblOptions.actionsPaginationLimit != null ? String(gblOptions.actionsPaginationLimit) : '100';
                $('#actionspaginationLimit option:selected').attr('selected', null);
                var $apOpt = $('#actionspaginationLimit option[value="' + apSaved + '"]');
                if ($apOpt.length) {
                    $apOpt.attr('selected', 'selected');
                } else {
                    $('#actionspaginationLimit option[value="100"]').attr('selected', 'selected');
                }
            }

            $('li.' + gblOptions.lastTab + ' label').click();

            if (typeof gblOptions.ui == 'undefined' || gblOptions.ui.length == 0) {
                [...document.getElementsByTagName('details')].forEach((detailsEl) => {
                    detailsEl.setAttribute('open', true)
                });
            } else {
                gblOptions.ui.forEach((detailsOpt) => {
                    if (detailsOpt.open == true) {
                        var el = document.getElementById(detailsOpt.id);
                        if (el) el.setAttribute('open', true);
                    }
                });
            }

        }

        if (typeof gblOptions.filterOptions == 'undefined') {
            gblOptions.filterOptions = defaultFilterOptions;
        }

        if (typeof gblOptions.queueColumns == 'undefined') {
            gblOptions.queueColumns = gbDefaultColumns;
        }

        for (var i = 0; i < gbDefaultColumns.length; i++) {

            var hasObj = false;
            for (var j = 0; j < gblOptions.queueColumns.length; j++) {
                if (gblOptions.queueColumns[j].data == gbDefaultColumns[i].data) {
                    hasObj = true;

                    if (gbDefaultColumns[i].bool == true) {
                        gblOptions.queueColumns[j]["bool"] = true;
                    }

                }
            }

            if (hasObj == false) {
                gblOptions.queueColumns.push(gbDefaultColumns[i]);
            }

        }


        loadOptionsColumns();

        bindNoUiSliders();
        bindFilterPairWarnings();

        buildLanguageOptions();
        buildGenderCountryOptions();
        syncGrowbotLocaleRadios();
        bindEvents();
        syncGrowbotThemeRadios();
        applyGrowbotTheme();
        applyGrowbotLocale();

    });
}


function loadOptionsColumns() {
    var queueColumnsOptions = document.getElementById('queueColumnsOptions');
    if (!queueColumnsOptions) {
        return;
    }
    queueColumnsOptions.innerHTML = '';

    for (var i = 0; i < gblOptions.queueColumns.length; i++) {

        var qc = gblOptions.queueColumns[i];

        var vizString = '';
        var disabledString = '';

        if (qc.visible == true) vizString = ' checked="' + qc.visible + '"'
        if (qc.data == 'id' || qc.data == 'username') disabledString = ' disabled="disabled"'

        var columnCheckbox = elementFromString('<label for="cb_' + qc.data + '"><input type="checkbox" id="cb_' + qc.data + '"' + vizString + disabledString + '>' + queueColumnLabel(qc) + "</label>");

        queueColumnsOptions.appendChild(columnCheckbox);

    }
}

function elementFromString(string) {
    var div = document.createElement('DIV');
    div.innerHTML = string;
    return div.firstChild;
}


function setFilterIconOpacity() {
    if (gblOptions.filterOptions.applyFiltersAutomatically == true && $('#radioFollow').is(':checked') == true) {
        document.getElementById('iconFilter').style.opacity = 1;
    } else if (gblOptions.dontUnFollowFilters == true && $('#radioUnFollow').is(':checked') == true) {
        document.getElementById('iconFilter').style.opacity = 1;
    } else if (gblOptions.dontRemoveOrBlockFilters == true && ($('#radioRemoveFromFollowers').is(':checked') == true || $('#radioBlock').is(':checked') == true)) {
        document.getElementById('iconFilter').style.opacity = 1;
    } else {
        document.getElementById('iconFilter').style.opacity = 0.5;
    }
}

function updateFilterPairWarnings() {
    var warningTitle = gbGetMessage('FilterPairBothUncheckedWarning');
    document.querySelectorAll('#multiFilter .filter-checkbox-pair--paired').forEach(function (pairEl) {
        var checkboxes = pairEl.querySelectorAll('input[type="checkbox"]');
        var bothUnchecked = checkboxes.length === 2 && !checkboxes[0].checked && !checkboxes[1].checked;
        pairEl.classList.toggle('filter-checkbox-pair--invalid', bothUnchecked);
        var title = bothUnchecked ? warningTitle : '';
        pairEl.title = title;
        pairEl.querySelectorAll('label').forEach(function (labelEl) {
            labelEl.title = title;
        });
    });
}

function bindFilterPairWarnings() {
    $('#multiFilter .filter-checkbox-pair--paired input[type="checkbox"]').off('change.filterPairWarning').on('change.filterPairWarning', updateFilterPairWarnings);
    updateFilterPairWarnings();
}

function saveOptions() {

    gblOptions.filterOptions.applyFiltersAutomatically = document.getElementById('cbApplyFilterAutomatically').checked;
    gblOptions.filterOptions.private = document.getElementById('cbFollowPrivateAccounts').checked;
    gblOptions.filterOptions.non_private = document.getElementById('cbFilterNonPrivate').checked;
    gblOptions.filterOptions.verified = document.getElementById('cbFilterVerified').checked;
    gblOptions.filterOptions.non_verified = document.getElementById('cbFilterNonVerified').checked;
    gblOptions.filterOptions.follows_me = document.getElementById('cbFollowsMe').checked;
    gblOptions.filterOptions.non_follows_me = document.getElementById('cbNonFollowsMe').checked;
    gblOptions.filterOptions.followed_by_me = document.getElementById('cbFollowedByMe').checked;
    gblOptions.filterOptions.non_followed_by_me = document.getElementById('cbNonFollowedByMe').checked;
    gblOptions.filterOptions.is_joined_recently = document.getElementById('cbFilterJoinedRecently').checked;
    gblOptions.filterOptions.non_is_joined_recently = document.getElementById('cbFilterNonJoinedRecently').checked;
    gblOptions.filterOptions.is_business_account = document.getElementById('cbFilterBusiness').checked;
    gblOptions.filterOptions.non_is_business_account = document.getElementById('cbFilterNonBusiness').checked;
    gblOptions.filterOptions.bio_contains = document.getElementById('cbFilterBioContains').checked;
    gblOptions.filterOptions.bio_not_contains = document.getElementById('cbFilterBioNotContains').checked;
    gblOptions.filterOptions.bio_contains_text = document.getElementById('txtFilterBioContains').value;
    gblOptions.filterOptions.bio_not_contains_text = document.getElementById('txtFilterBioNotContains').value;
    gblOptions.filterOptions.external_url_contains = document.getElementById('cbFilterExternalUrlContains').checked;
    gblOptions.filterOptions.external_url_not_contains = document.getElementById('cbFilterExternalUrlNotContains').checked;
    gblOptions.filterOptions.external_url_contains_text = document.getElementById('txtFilterExternalUrlContains').value;
    gblOptions.filterOptions.external_url_not_contains_text = document.getElementById('txtFilterExternalUrlNotContains').value;
    gblOptions.filterOptions.no_profile_pic = document.getElementById('cbFilterNoProfilePic').checked;
    gblOptions.filterOptions.profile_pic = document.getElementById('cbFilterProfilePic').checked;
    gblOptions.filterOptions.business_category_name_contains = document.getElementById('cbFilterBusinessCategoryNameContains').checked;
    gblOptions.filterOptions.business_category_name_not_contains = document.getElementById('cbFilterBusinessCategoryNameNotContains').checked;
    gblOptions.filterOptions.business_category_name_contains_text = document.getElementById('txtFilterBusinessCategoryNameContains').value;
    gblOptions.filterOptions.business_category_name_not_contains_text = document.getElementById('txtFilterBusinessCategoryNameNotContains').value;


    var uiOptions = [];

    [...document.getElementsByTagName('details')].forEach((detailsEl) => {
        uiOptions.push({
            'id': detailsEl.id,
            'open': detailsEl.open ? true : false
        });
    });

    var filterOptions = gblOptions.filterOptions;
    var endcursors = gblOptions.endcursors;

    gblOptions.dontUnFollowFollowers = document.getElementById('cbDontUnfollowFollowers').checked;
    gblOptions.dontUnFollowNonGrowbot = document.getElementById('cbDontUnfollowNonGrowbot').checked;
    gblOptions.dontUnFollowFilters = document.getElementById('cbDontUnfollowFilters').checked;
    gblOptions.dontRemoveOrBlockFilters = document.getElementById('cbDontRemoveOrBlockFilters').checked;
    gblOptions.filterOptions = filterOptions;
    gblOptions.followPeopleAlreadyAttempted = document.getElementById('cbFollowAlreadyAttempted').checked;
    gblOptions.followPrivateAccounts = document.getElementById('cbFollowPrivateAccounts').checked;
    gblOptions.limitQueue = document.getElementById('cbLimitQueueSize').checked;
    gblOptions.limitMediaQueue = document.getElementById('cbLimitMediaQueueSize').checked;
    gblOptions.maxAcctQueueLength = parseInt(document.getElementById('txtLimitQueueSize').value);
    gblOptions.maxMediaQueueLength = parseInt(document.getElementById('txtLimitMediaQueueSize').value);
    gblOptions.numberFollowLikeLatestPics = document.getElementById('numberFollowLikeLatestPics').value;
    gblOptions.percentRandomTimeDelay = document.getElementById('igBotPercentRandomTimeDelay').value / 200;
    gblOptions.showLikesInQueue = document.getElementById('cbShowLikesInQueue').checked;
    gblOptions.clickNotNow = document.getElementById('cbClickNotNow').checked;
    gblOptions.showNotifications = document.getElementById('cbShowNotifications').checked;
    gblOptions.loadQueueOnStartup = document.getElementById('cbLoadQueueOnStartup').checked;
    gblOptions.keepInstagramTabsAwake = document.getElementById('cbKeepInstagramTabsAwake').checked;
    gblOptions.cbShowQueueOnScreen = document.getElementById('cbShowQueueOnScreen').checked;
    gblOptions.cbRemoveUnusedColumns = document.getElementById('cbRemoveUnusedColumns').checked;
    gblOptions.removeAccountsFromQueue = document.getElementById('cbRemoveFromQueue').checked;
    gblOptions.autoSaveQueue = document.getElementById('cbAutoSaveQueue').checked;
    gblOptions.allowDuplicateAccounts = document.getElementById('cbAllowDuplicateAccounts').checked;
    gblOptions.showConvenienceButtons = document.getElementById('cbConvenienceLinks').checked;
    gblOptions.showStamps = document.getElementById('cbShowStamps').checked;
    gblOptions.showProfilePicInQueue = document.getElementById('cbShowProfilePicInQueue').checked;
    gblOptions.getExtendedData = document.getElementById('cbGetExtendedData').checked;
    gblOptions.getLastPostDate = document.getElementById('cbGetLastPostDate').checked;
    gblOptions.getGender = document.getElementById('cbGuessGender').checked;
    gblOptions.timeDelay = document.getElementById('textSecondsBetweenActions').value * 1000;
    gblOptions.timeDelayAfterHardRateLimit = document.getElementById('textHoursAfterHardRateLimit').value * 3600000;
    gblOptions.timeDelayAfterSkip = document.getElementById('textSecondsAfterSkip').value * 1000;
    gblOptions.timeDelayAfterSoftRateLimit = document.getElementById('textMinutesAfterSoftRateLimit').value * 60000;
    gblOptions.timeDelayAfter429RateLimit = document.getElementById('textMinutesAfter429RateLimit').value * 60000;
    gblOptions.timeDelayAfterAdditionalInfo = document.getElementById('texttimeDelayAfterAdditionalInfo').value * 1000;
    gblOptions.useTimeDelayAfterAdditionalInfo = document.getElementById('cbuseTimeDelayAfterAdditionalInfo').checked;
    gblOptions.retriesAfterAdditionalInfo404 = Number(document.getElementById('textRetryAfterAdditionalInfo404').value);
    gblOptions.ui = uiOptions;
    gblOptions.unFollowFresh = !document.getElementById('cbDontUnfollowFresh').checked;
    gblOptions.unFollowIfOld = document.getElementById('cbUnfollowOld').checked;
    gblOptions.unFollowDelay = parseInt(document.getElementById('textUnfollowNew').value) * 86400000;
    gblOptions.unFollowIfOlderThan = parseInt(document.getElementById('textUnfollowOld').value) * 86400000;
    gblOptions.useRandomTimeDelay = document.getElementById('cbRandomizeTimeDelay').checked;
    gblOptions.maxPerEnabled = document.getElementById('cbLimitActions').checked;
    gblOptions.maxPerActions = document.getElementById('textLimitActionsPer').value;
    gblOptions.maxPerPeriod = document.getElementById('textLimitActionsPerTime').value * 3600000;
    gblOptions.paginationLimit = $('#paginationLimit').val();
    gblOptions.mediapaginationLimit = $('#mediapaginationLimit').val();
    if ($('#actionspaginationLimit').length) {
        gblOptions.actionsPaginationLimit = $('#actionspaginationLimit').val();
    }
    gblOptions.endcursors = endcursors;
    gblOptions.MediaIncludeLikersCommentersTagged = document.getElementById('cbMediaIncludeLikersCommentersTagged').checked;
    gblOptions.SaveWhenWatchingReel = document.getElementById('SaveWhenWatchingReel').checked;
    gblOptions.LikeWhenWatchingReel = document.getElementById('LikeWhenWatchingReel').checked;
    gblOptions.includeSuggestedPostsFromFeed = document.getElementById('includeSuggestedPostsFromFeed').checked;
    gblOptions.includePinnedPostForLikes = document.getElementById('includePinnedPostForLikes').checked;
    gblOptions.includePinnedPostForComments = document.getElementById('includePinnedPostForComments').checked;
    gblOptions.likeAfterFollow = document.getElementById('cbLikeAfterFollow').checked;
    gblOptions.unfollowAfterFollow = document.getElementById('cbUnfollowAfterFollow').checked;
    gblOptions.unfollowAfterDays = parseInt(document.getElementById('numberUnfollowAfterDays').value) || 7;

    var themeRadio = document.querySelector('#igBotInjectedContainer input[name="growbotUiColorTheme"]:checked');
    if (themeRadio) {
        gblOptions.uiColorTheme = themeRadio.value;
    }

    var localeRadio = document.querySelector('#igBotInjectedContainer input[name="growbotUiLocale"]:checked');
    if (localeRadio) {
        gblOptions.uiLocale = localeRadio.value;
    }

    var genderCountrySel = document.getElementById('selGenderCountry');
    if (genderCountrySel) {
        gblOptions.genderCountry = genderCountrySel.value || 'auto';
    }

    document.querySelectorAll('#detailsQueueColumns input').forEach((cb) => {
        var columnDataName = cb.id.replace('cb_', '');
        var columnObjIndex = gblOptions.queueColumns.findIndex(item => item.data == columnDataName);

        gblOptions.queueColumns[columnObjIndex].visible = cb.checked;
    });

    chrome.storage.local.set({
        gblOptions: gblOptions
    });

    applyGrowbotTheme();

    // setFilterIconOpacity();
}


function loadPreviousAttempts() {
    chrome.storage.local.get("acctsAttempted", function (data) {
        if (Array.isArray(data.acctsAttempted)) {
            acctsPreviouslyAttempted = data.acctsAttempted;
            printMessage(gbGetMessage('PreviouslyAttempted', [acctsPreviouslyAttempted.length]));

            acctsPreviouslyAttempted = cleanAcctsForStorage(acctsPreviouslyAttempted);
            chrome.storage.local.set({
                acctsAttempted: acctsPreviouslyAttempted
            }, function () { });;
        }
    })
}



function cleanAcctsForStorage(queueToOptimize) {
    var previousBytes = bytesFromString(JSON.stringify(queueToOptimize));

    for (var i = 0; i < queueToOptimize.length; i++) {
        var a = queueToOptimize[i];
        if (a.edge_felix_video_timeline) delete queueToOptimize[i].edge_felix_video_timeline;
        if (a.edge_felix_combined_post_uploads) delete queueToOptimize[i].edge_felix_combined_post_uploads;
        if (a.edge_felix_combined_draft_uploads) delete queueToOptimize[i].edge_felix_combined_draft_uploads;
        if (a.edge_felix_drafts) delete queueToOptimize[i].edge_felix_drafts;
        if (a.edge_felix_pending_draft_uploads) delete queueToOptimize[i].edge_felix_pending_draft_uploads;
        if (a.edge_felix_pending_post_uploads) delete queueToOptimize[i].edge_felix_pending_post_uploads;
        if (a.edge_saved_media) delete queueToOptimize[i].edge_saved_media;
        if (a.edge_media_collections) delete queueToOptimize[i].edge_media_collections;
        if (a.edge_owner_to_timeline_media && a.edge_owner_to_timeline_media.edges) queueToOptimize[i].edge_owner_to_timeline_media.edges = [];
    }

    var nowBytes = bytesFromString(JSON.stringify(queueToOptimize));
    var savedBytes = previousBytes - nowBytes;

    if (savedBytes > 0) {
        printMessage(gbGetMessage('LogCleanedUpAccounts', [formatBytes(savedBytes)]));
    }

    return queueToOptimize;
}

function bytesFromString(str) {
    var bytes = 0,
        len = str.length,
        codePoint, next, i;

    for (i = 0; i < len; i++) {
        codePoint = str.charCodeAt(i);

        // Lone surrogates cannot be passed to encodeURI
        if (codePoint >= 0xD800 && codePoint < 0xE000) {
            if (codePoint < 0xDC00 && i + 1 < len) {
                next = str.charCodeAt(i + 1);

                if (next >= 0xDC00 && next < 0xE000) {
                    bytes += 4;
                    i++;
                    continue;
                }
            }
        }

        bytes += (codePoint < 0x80 ? 1 : (codePoint < 0x800 ? 2 : 3));
    }

    return bytes;
}

function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function loadPreviousLikes() {
    chrome.storage.local.get("previousLikes", function (data) {
        if (Array.isArray(data.previousLikes)) {
            previousLikes = data.previousLikes;
            printMessage(gbGetMessage('PreviouslyLiked', [previousLikes.length]));
        }
    })
}

function savePreviousLikesToStorage() {
    chrome.storage.local.set({
        previousLikes: previousLikes
    });
}

function addAcctToWhiteList(acct) {
    var acctInWhiteList = findAcctById(acct.id, acctsWhiteList);
    if (acct !== false && acctInWhiteList == false) {
        acctsWhiteList.push(acct);
        printMessage(acct.username + gbGetMessage('AddedToWhitelist'));
        return true;
    } else {
        printMessage(acct.username + gbGetMessage('AlreadyOnWhitelist'));
        return false;
    }
}

function loadWhiteList() {
    chrome.storage.local.get("acctsWhiteList", function (data) {
        if (Array.isArray(data.acctsWhiteList)) {
            acctsWhiteList = data.acctsWhiteList;
            printMessage(gbGetMessage('WhitelistLoaded', [acctsWhiteList.length]));
        }
    })
}

function saveWhiteListToStorage() {
    chrome.storage.local.set({
        acctsWhiteList: acctsWhiteList
    });
    printMessage(gbGetMessage('WhitelistSavedLocal'));
}

function saveWhiteListToDisk() {
    saveText("growbot-whitelist.txt", JSON.stringify(acctsWhiteList));
    printMessage(gbGetMessage('WhitelistSavedFile'));
}

function saveWhiteListToStorageAndDisk() {
    saveWhiteListToStorage();
    saveWhiteListToDisk();
}

function saveText(filename, text) {
    var blob = new Blob([text], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, filename);
}

function viewWhiteList() {
    if (acctsWhiteList.length > 0) {

        dialog({
            yes: gbGetMessage('WhitelistLoadFile'),
            no: gbGetMessage('WhitelistLoadLocal'),
            question: gbGetMessage('WhitelistLoadQuestion')
        },
            function () {
                openWhiteListFile()
            },
            function () {
                currentList = 'acctsWhiteList';
                arrayOfUsersToDiv(acctsWhiteList, true);
                $('#btnSaveWhiteList').show();
            });

    } else {
        openWhiteListFile();
    }
}

function openWhiteListFile() {
    var input = document.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'text/plain,text/json,application/JSON');

    input.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            var myFile = this.files[0];
            var reader = new FileReader();

            reader.addEventListener('load', function (e) {
                acctsWhiteList = JSON.parse(e.target.result);
                currentList = 'acctsWhiteList';
                arrayOfUsersToDiv(acctsWhiteList, true);
            });

            reader.readAsText(myFile);
        }
    });

    input.click();
}

/** Blacklist: Growbot will not interact with these accounts in any way (no follow, unfollow, like, block, view story, etc). */
function isBlacklisted(acct) {
    if (!acct) return false;
    if (acct.id && containsObject(acct, acctsBlackList) === true) return true;
    if (!acct.id && acct.username) {
        for (var i = 0; i < acctsBlackList.length; i++) {
            if (acctsBlackList[i].username && acctsBlackList[i].username === acct.username) return true;
        }
    }
    return false;
}

function addAcctToBlackList(acct) {
    var acctInBlackList = findAcctById(acct.id, acctsBlackList);
    if (acct !== false && acctInBlackList == false) {
        acctsBlackList.push(acct);
        printMessage(acct.username + gbGetMessage('AddedToBlacklist'));
        return true;
    } else {
        printMessage(acct.username + gbGetMessage('AlreadyOnBlacklist'));
        return false;
    }
}

function loadBlackList() {
    chrome.storage.local.get("acctsBlackList", function (data) {
        if (Array.isArray(data.acctsBlackList)) {
            acctsBlackList = data.acctsBlackList;
            printMessage(gbGetMessage('BlacklistLoaded', [acctsBlackList.length]));
        }
    })
}

function saveBlackListToStorage() {
    chrome.storage.local.set({
        acctsBlackList: acctsBlackList
    });
    printMessage(gbGetMessage('BlacklistSavedLocal'));
}

function saveBlackListToDisk() {
    saveText("growbot-blacklist.txt", JSON.stringify(acctsBlackList));
    printMessage(gbGetMessage('BlacklistSavedFile'));
}

function saveBlackListToStorageAndDisk() {
    saveBlackListToStorage();
    saveBlackListToDisk();
}

function viewBlackList() {
    if (acctsBlackList.length > 0) {
        dialog({
            yes: gbGetMessage('BlacklistLoadFile'),
            no: gbGetMessage('BlacklistLoadLocal'),
            question: gbGetMessage('BlacklistLoadQuestion')
        },
            function () {
                openBlackListFile();
            },
            function () {
                currentList = 'acctsBlackList';
                arrayOfUsersToDiv(acctsBlackList, true);
                $('#btnSaveBlackList').show();
            });
    } else {
        openBlackListFile();
    }
}

function openBlackListFile() {
    var input = document.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'text/plain,text/json,application/JSON');

    input.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            var myFile = this.files[0];
            var reader = new FileReader();

            reader.addEventListener('load', function (e) {
                acctsBlackList = JSON.parse(e.target.result);
                currentList = 'acctsBlackList';
                arrayOfUsersToDiv(acctsBlackList, true);
            });

            reader.readAsText(myFile);
        }
    });

    input.click();
}

async function convenienceLinkBlacklistAcct(userName) {
    var acct = await getAdditionalDataForAcct({
        username: userName
    });
    var norm = normalizeConvenienceUsername(acct.username);
    var onList = isBlacklisted(acct) === true || acctListHasUsernameNorm(acctsBlackList, norm);
    if (onList) {
        removeAcctFromBlackListByUsername(acct.username);
    } else {
        if (addAcctToBlackList(acct) === true) saveBlackListToStorage();
    }
}

function acctAlreadyInAccountsQueue(acct) {
    var i;
    for (i = 0; i < acctsQueue.length; i++) {
        if (acct.id && acctsQueue[i].id === acct.id) return true;
        if (acct.username && acctsQueue[i].username === acct.username) return true;
    }
    return false;
}

async function convenienceLinkAddToQueueAcct(userName) {
    var acct = await getAdditionalDataForAcct({
        username: userName
    });
    var norm = normalizeConvenienceUsername(acct.username);
    var onList = acctAlreadyInAccountsQueue(acct) === true || acctListHasUsernameNorm(acctsQueue, norm);
    if (onList) {
        removeAcctsFromQueueByUsername(acct.username);
        return;
    }
    if (isBlacklisted(acct)) {
        printMessage(gbGetMessage('LogBlacklistedNotAddedToQueue', [acct.username]));
        return;
    }
    if (gblOptions.allowDuplicateAccounts === false && acctAlreadyInAccountsQueue(acct)) {
        printMessage(gbGetMessage('AlreadyInAccountsQueue', [acct.username]));
        return;
    }
    acctsQueue.push(acct);
    currentList = 'acctsQueue';
    arrayOfUsersToDiv(acctsQueue, true);
    updateCount();
    monitorButtonConditions();
    printMessage(gbGetMessage('AddedToConvenienceQueue', [acct.username]));
    if (gblOptions.autoSaveQueue === true) {
        saveQueueToStorage();
    }
}

function saveAttemptedToStorage() {
    chrome.storage.local.set({
        acctsAttempted: acctsPreviouslyAttempted
    });
    printMessage(gbGetMessage('AttemptedSavedLocal'));
}

function saveAttemptedToDisk() {
    saveText("growbot-attempted.txt", JSON.stringify(acctsPreviouslyAttempted));
    printMessage(gbGetMessage('AttemptedSavedFile'));
}

function saveAttemptedToStorageAndDisk() {
    saveAttemptedToStorage();
    saveAttemptedToDisk();
}

function viewAttempted() {
    if (acctsPreviouslyAttempted.length > 0) {
        dialog({
            yes: gbGetMessage('AttemptedLoadFile'),
            no: gbGetMessage('AttemptedLoadLocal'),
            question: gbGetMessage('AttemptedLoadQuestion')
        },
            function () {
                openAttemptedFile();
            },
            function () {
                currentList = 'acctsPreviouslyAttempted';
                arrayOfUsersToDiv(acctsPreviouslyAttempted, true);
                $('#btnSaveAttempted').show();
            });
    } else {
        openAttemptedFile();
    }
}

function openAttemptedFile() {
    var input = document.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'text/plain,text/json,application/JSON');

    input.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            var myFile = this.files[0];
            var reader = new FileReader();

            reader.addEventListener('load', function (e) {
                acctsPreviouslyAttempted = JSON.parse(e.target.result);
                currentList = 'acctsPreviouslyAttempted';
                arrayOfUsersToDiv(acctsPreviouslyAttempted, true);
            });

            reader.readAsText(myFile);
        }
    });

    input.click();
}



function openQueueFile() {
    var input = document.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'text/plain,text/json,application/JSON');

    input.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            var myFile = this.files[0];
            var reader = new FileReader();

            reader.addEventListener('load', function (e) {
                var fileData = e.target.result;

                if (fileData.indexOf('relationships_follow_requests_sent') > -1) {
                    var fileJSON = JSON.parse(e.target.result);
                    var pendingArray = fileJSON.relationships_follow_requests_sent;

                    for (var i = 0; i < pendingArray.length; i++) {

                        if (pendingArray[i].string_list_data &&
                            pendingArray[i].string_list_data.length > 0 &&
                            pendingArray[i].string_list_data[0].value) {

                            acctsQueue.push({
                                "username": pendingArray[i].string_list_data[0].value
                            });
                        }
                    }

                    alert(gbGetMessage('AlertLoadedPartialQueueFromUsernames'));

                } else if (fileData.indexOf('{') > -1) {
                    // JSON
                    acctsQueue = JSON.parse(e.target.result);
                    currentList = 'acctsQueue';

                    if (acctsQueue.length > gblOptions.maxAcctQueueLength &&
                        gblOptions.limitQueue == true &&
                        window.confirm(gbGetMessage('AlertSavedQueueLimitConfirm', [String(acctsQueue.length), String(gblOptions.maxAcctQueueLength)]))) {

                        truncateQueue();
                    }

                    acctsQueue = cleanAcctsForStorage(acctsQueue);

                } else if (fileData.indexOf(',') > -1 || fileData.indexOf('\n') > -1 || fileData.indexOf('\r') > -1) {
                    // file has newlines or commas but not {
                    // clean windows newlines, double newlines, replace newlines with comma, parse as csv
                    fileData = fileData.replace(/\r/g, '\n');
                    fileData = fileData.replace(/\n\n/g, '\n');
                    fileData = fileData.replace(/\n/g, ',');
                    fileData = fileData.replace(/,,/g, ',');

                    var arrr = fileData.split(',');
                    for (var i = 0; i < arrr.length; i++) {
                        acctsQueue.push({
                            "username": arrr[i]
                        });
                    }

                    alert(gbGetMessage('AlertLoadedPartialQueueFromUsernames'));
                } else {
                    alert(gbGetMessage('AlertCantLoadQueueFile'));
                }

                acctsQueue = fixAcctQueueCounts(acctsQueue);


                arrayOfUsersToDiv(acctsQueue, true);

            });

            reader.readAsText(myFile);
        }
    });

    input.click();
}



function loadSavedQueue() {
    chrome.storage.local.get("acctsQueue", function (data) {
        if (Array.isArray(data.acctsQueue)) {

            dialog({
                no: gbGetMessage('QueueLoadFile'),
                yes: gbGetMessage('QueueLoadLocal'),
                question: gbGetMessage('QueueLoadQuestion')
            },
                function () {
                    acctsQueue = data.acctsQueue;

                    if (acctsQueue.length > gblOptions.maxAcctQueueLength &&
                        gblOptions.limitQueue == true &&
                        window.confirm(gbGetMessage('AlertSavedQueueLimitConfirm', [String(acctsQueue.length), String(gblOptions.maxAcctQueueLength)]))) {

                        truncateQueue();
                    }

                    arrayOfUsersToDiv(acctsQueue, true);

                    printMessage(gbGetMessage('QueueLoaded', [acctsQueue.length]));
                },
                function () {
                    openQueueFile();
                })
        } else {
            openQueueFile();
        }
    });
}


function loadQueueFromLocal() {
    chrome.storage.local.get("acctsQueue", function (data) {
        if (Array.isArray(data.acctsQueue)) {

            acctsQueue = JSON.parse(JSON.stringify(data.acctsQueue));

            acctsQueue = fixAcctQueueCounts(acctsQueue);

            arrayOfUsersToDiv(acctsQueue, true);

            printMessage(gbGetMessage('QueueLoaded', [acctsQueue.length]));
        }
    });
}


function fixAcctQueueCounts(q) {

    var newArr = [];

    for (var i = 0; i < q.length; i++) {

        var newq = q[i];

        // if (q[i]["edge_owner_to_timeline_media.count"]) {
        if (q[i]["edge_owner_to_timeline_media.count"]) {
            newq.edge_owner_to_timeline_media = {
                "count": q[i]["edge_owner_to_timeline_media.count"]
            }
            delete newq["edge_owner_to_timeline_media.count"];
        } else {
            newq.edge_owner_to_timeline_media = {
                "count": 0
            }

        }
        // }

        //  if (q[i]["edge_followed_by.count"]) {
        if (q[i]["edge_followed_by.count"]) {
            newq["edge_followed_by"] = {
                "count": q[i]["edge_followed_by.count"]
            }
            delete newq["edge_followed_by.count"]

        }
        //  }

        //   if (q[i]["edge_follow.count"]) {
        if (q[i]["edge_follow.count"]) {
            newq["edge_follow"] = {
                "count": q[i]["edge_follow.count"]
            }
            delete newq["edge_follow.count"]
        }
        //   }

        // if (q[i]["edge_mutual_followed_by.count"]) {
        if (q[i]["edge_mutual_followed_by.count"]) {
            newq["edge_mutual_followed_by"] = {
                "count": q[i]["edge_mutual_followed_by.count"]
            }
            delete newq["edge_mutual_followed_by.count"]
        } else {
            newq["edge_mutual_followed_by"] = {
                "count": 0
            }
        }
        // }

        newArr.push(JSON.parse(JSON.stringify(newq)))

    }


    return newArr;

}


function generateFileName() {
    var fileName = "growbot";

    var endCursorsForThisPage = gblOptions.endcursors;

    endCursorsForThisPage = endCursorsForThisPage.filter(e => e.id === currentProfilePage.id);

    if (endCursorsForThisPage.length > 0) {
        var p = endCursorsForThisPage[endCursorsForThisPage.length - 1];
        fileName = fileName + '-' + p.username;
        fileName = fileName + '-' + p.action.replace('load', '').toLowerCase();
    } else {
        fileName = fileName + '-' + 'queue';
    }


    return fileName;
}

function saveQueueToDisk() {
    saveText(generateFileName() + ".txt", JSON.stringify(acctsQueue));
    printMessage(gbGetMessage('QueueSavedFile'));
}

function saveQueueToStorage() {
    chrome.storage.local.set({
        acctsQueue: acctsQueue
    }, function () {
        printMessage(gbGetMessage('QueueSavedLocal'));
    });
}

function saveQueueToStorageAndDisk() {
    saveQueueToStorage();
    saveQueueToDisk();
}



function initUnfollowMyFollowers() {
    if (acctsQueue.length === 0) {
        dialog({
            question: 'The queue is currently empty.<br><br>' +
                'Growbot can load the current account&#39;s following list into the queue and then begin unfollowing ' +
                'according to your filters and settings.',
            yes: 'Load and start unfollowing',
            no: 'Cancel'
        }, function () {
            ajaxGetAllMyFollowing('');
            waitForTrue(['loadedMyFollowings'], ajaxUnfollowAll, []);
        }, function () {
            // cancelled, do nothing
        });
    } else {
        ajaxUnfollowAll();
    }
}


async function ajaxLoadUsersMedia(after, loadAllMedia, callback, acct) {

    if (!acct) acct = currentProfilePage;

    if (typeof after != 'string') {
        after = '';
    } else {
        after = '%22after%22%3A%22' + after + '%22%2C';
    }

    const fetchMedia = await fetch("https://www.instagram.com/graphql/query", {
        "headers": {
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded",
            "priority": "u=1, i",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-asbd-id": "129477",
            "x-csrftoken": getCsrfFromCookie(),
            "x-fb-friendly-name": "PolarisProfilePostsQuery",
            "x-ig-app-id": "936619743392459"
        },
        "referrer": "https://www.instagram.com/" + acct.username + "/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "av=17841400482242408&__d=www&__user=0&__a=1&__req=7&__hs=20028.HYP%3Ainstagram_web_pkg.2.1..0.1&dpr=1&__ccg=EXCELLENT&__rev=1017870321&__s=xc4v6e%3Api17z8%3Awisy8l&__hsi=7432327050990328368&__csr=&__comet_req=7&jazoest=26364&__spin_r=1017870321&__spin_b=trunk&__spin_t=1730473490&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=PolarisProfilePostsQuery&variables=%7B" + after + "%22data%22%3A%7B%22count%22%3A12%2C%22include_relationship_info%22%3Atrue%2C%22latest_besties_reel_media%22%3Atrue%2C%22latest_reel_media%22%3Atrue%7D%2C%22username%22%3A%22" + acct.username + "%22%2C%22__relay_internal__pv__PolarisIsLoggedInrelayprovider%22%3Atrue%2C%22__relay_internal__pv__PolarisFeedShareMenurelayprovider%22%3Atrue%7D&server_timestamps=true&doc_id=8633614153419931",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    var jsonData = await fetchMedia.json();
    var r = jsonData.data.xdt_api__v1__feed__user_timeline_graphql_connection;

    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

    if (isFirefox) {
        r.acct = cloneInto(acct, r);
    } else {
        r.acct = acct;
    }

    callback(r);
}


async function ajaxLoadAllUsersCommenters(after) {


    if (typeof after != 'string') {
        after = '';
    } else {
        after = '%22after%22%3A%22' + after + '%22%2C';
    }

    const fetchMedia = await fetch("https://www.instagram.com/graphql/query", {
        "headers": {
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded",
            "priority": "u=1, i",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-asbd-id": "129477",
            "x-csrftoken": getCsrfFromCookie(),
            "x-fb-friendly-name": "PolarisProfilePostsQuery",
            "x-ig-app-id": "936619743392459"
        },
        "referrer": "https://www.instagram.com/" + currentProfilePage.username + "/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "av=17841400482242408&__d=www&__user=0&__a=1&__req=7&__hs=20028.HYP%3Ainstagram_web_pkg.2.1..0.1&dpr=1&__ccg=EXCELLENT&__rev=1017870321&__s=xc4v6e%3Api17z8%3Awisy8l&__hsi=7432327050990328368&__csr=&__comet_req=7&jazoest=26364&__spin_r=1017870321&__spin_b=trunk&__spin_t=1730473490&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=PolarisProfilePostsQuery&variables=%7B" + after + "%22data%22%3A%7B%22count%22%3A12%2C%22include_relationship_info%22%3Atrue%2C%22latest_besties_reel_media%22%3Atrue%2C%22latest_reel_media%22%3Atrue%7D%2C%22username%22%3A%22" + currentProfilePage.username + "%22%2C%22__relay_internal__pv__PolarisIsLoggedInrelayprovider%22%3Atrue%2C%22__relay_internal__pv__PolarisFeedShareMenurelayprovider%22%3Atrue%7D&server_timestamps=true&doc_id=8633614153419931",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    var jsonData = await fetchMedia.json();
    var r = jsonData.data.xdt_api__v1__feed__user_timeline_graphql_connection;

    loadCommentsForMedia(r);
}


function loadAllLikersForMediaQueue() {
    for (let m = 0; m < mediaToLike.length; m++) {

        let media = mediaToLike[m];

        $.ajax({
            url: 'https://www.instagram.com/api/v1/media/' + media.id + '/likers/',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                xhr.setRequestHeader('x-asbd-id', '129477');
                xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            },
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (r) {



                var ownerUsername = '_____';
                var mediaId = '_____';
                var mediaShortcode = '_____';

                if (media && media && media.owner && media.owner.username) ownerUsername = media.owner.username;
                if (media && media && media.id) mediaId = media.id;
                if (media && media && media.code) mediaShortcode = media.code;

                printMessage(gbGetMessage('LogLoadingLikersForMedia', [ownerUsername, mediaId, mediaShortcode]));

                if (r.users) {
                    for (var i = 0; i < r.users.length; i++) {
                        var a = r.users[i];
                        a['id'] = a.pk;
                        a.source_type = 'Liker';
                        a.source_media = media.code;
                        a.source_owner = media.owner.username;
                        acctsQueue.push(a);
                    }
                }

                if (gblOptions.allowDuplicateAccounts == false) acctsQueue = uniq(acctsQueue);

                arrayOfUsersToDiv(acctsQueue, true);

                printMessage(gbGetMessage('LogDoneLoadedLikers', [String(r.users.length), ownerUsername, mediaId, mediaShortcode]));

            }).fail(function (f) {
                if (f.status == 429) {
                    printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(loadLikesForMedia(media));
                    }, gblOptions.timeDelayAfter429RateLimit));
                }
            });
    }

}


async function loadAllCommentersForMediaQueue() {
    for (var i = 0; i < mediaToLike.length; i++) {

        var media = mediaToLike[i];

        var ownerUsername = '_____';
        var mediaId = '_____';
        var mediaShortcode = '_____';

        if (media && media && media.owner && media.owner.username) ownerUsername = media.owner.username;
        if (media && media && media.id) mediaId = media.id;
        if (media && media && media.code) mediaShortcode = media.code;

        printMessage(gbGetMessage('LogLoadingCommentersForMedia', [ownerUsername, mediaId, mediaShortcode]));

        var mediaWithComments = await loadMoreCommentsForMedia2(media);

        for (j = 0; j < (mediaWithComments.comment_count - 1); j++) {

            if ((gblOptions.limitQueue == true && acctsQueue.length > gblOptions.maxAcctQueueLength)) {
                printMessage(gbGetMessage('Done') + gbGetMessage('QueueLimitReached'));
                break;
            }

            if (mediaWithComments.comment_count > 0 &&
                mediaWithComments.comments &&
                mediaWithComments.comments.length < mediaWithComments.comment_count &&
                mediaWithComments.nextMinId &&
                mediaWithComments.nextMinId !== 0) {
                mediaWithComments = await loadMoreCommentsForMedia2(mediaWithComments, mediaWithComments.nextMinId);

            } else {
                break;
            }
        }


        for (var jj = 0; jj < mediaWithComments.comments.length; jj++) {

            if ((gblOptions.limitQueue == true && acctsQueue.length > gblOptions.maxAcctQueueLength)) {
                printMessage(gbGetMessage('Done') + gbGetMessage('QueueLimitReached'));
                break;
            }

            if (mediaWithComments.comments[jj].child_comment_count > 0) {
                mediaWithComments = await loadChildComments(mediaWithComments, mediaWithComments.comments[jj].pk);
            }

        }

        var users = allNodes(mediaWithComments.comments, 'user');

        for (var k = 0; k < users.length; k++) {
            var u = users[k];
            u.source_type = 'Commenter';
            u.source_media = mediaWithComments.code;
            u.source_owner = mediaWithComments.owner.username;
            acctsQueue.push(u);
        }

        if (gblOptions.allowDuplicateAccounts == false) acctsQueue = uniq(acctsQueue);

        arrayOfUsersToDiv(acctsQueue, true);

        outputMessage(gbGetMessage('LogLoadedCommentsForPost', [String(mediaWithComments.comments.length), String(mediaWithComments.comment_count), String(i + 1), String(mediaToLike.length)]));

    }

    if ((gblOptions.limitQueue == true && acctsQueue.length > gblOptions.maxAcctQueueLength)) {
        arrayOfUsersToDiv(acctsQueue, true);
        printMessage(gbGetMessage('Done') + gbGetMessage('QueueLimitReached'));
    }

}

async function loadChildComments(media, comment, nextMinId) {

    return new Promise(async function (resolve, reject) {

        var url = "https://www.instagram.com/api/v1/media/" + media.id + "/comments/" + comment + "/child_comments/?is_chronological=true&paging_direction=view_more";

        if (nextMinId && nextMinId !== 0) {
            url = url + '&min_id=' + encodeURIComponent(nextMinId);
        }

        const fetchComments = await fetch(url, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "priority": "u=1, i",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-asbd-id": "129477",
                "x-csrftoken": getCsrfFromCookie(),
                "x-ig-app-id": "936619743392459",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://www.instagram.com/p/" + media.code + "/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        var jsonData = await fetchComments.json();
        var c = jsonData.child_comments;
        media.nextMinId = jsonData.next_min_id || 0;

        if (media.comments) {

        } else {
            media.comments = [];
        }

        for (var i = 0; i < c.length; i++) {
            media.comments.push(c[i]);
        }

        resolve(media);
    });

}

async function loadMoreCommentsForMedia2(media, nextMinId) {

    return new Promise(async function (resolve, reject) {

        var url = "https://www.instagram.com/api/v1/media/" + media.id + "/comments/?can_support_threading=true&permalink_enabled=false";

        if (nextMinId && nextMinId !== 0) {
            url = url + '&min_id=' + encodeURIComponent(nextMinId);
        }

        const fetchComments = await fetch(url, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "priority": "u=1, i",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-asbd-id": "129477",
                "x-csrftoken": getCsrfFromCookie(),
                "x-ig-app-id": "936619743392459",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://www.instagram.com/p/" + media.code + "/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        var jsonData = await fetchComments.json();
        var c = jsonData.comments;
        media.nextMinId = jsonData.next_min_id || 0;

        if (media.comments) {

        } else {
            media.comments = [];
        }

        for (var i = 0; i < c.length; i++) {
            media.comments.push(c[i]);
        }


        resolve(media);
    });

}

async function loadCommentsForMedia(r) {
    for (var i = 0; i < r.edges.length; i++) {

        var media = r.edges[i];

        var ownerUsername = '_____';
        var mediaId = '_____';
        var mediaShortcode = '_____';

        if (media && media.node && media.node.owner && media.node.owner.username) ownerUsername = media.node.owner.username;
        if (media && media.node && media.node.id) mediaId = media.node.id;
        if (media && media.node && media.node.code) mediaShortcode = media.node.code;

        printMessage(gbGetMessage('LogLoadingCommentersForMedia', [ownerUsername, mediaId, mediaShortcode]));

        if (gblOptions.includePinnedPostForComments == false && media.node.timeline_pinned_user_ids.length > 0) continue;

        var mediaWithComments = await loadMoreCommentsForMedia2(media.node);

        for (j = 0; j < (mediaWithComments.comment_count - 1); j++) {

            if (mediaWithComments.comment_count > 0 &&
                mediaWithComments.comments &&
                mediaWithComments.comments.length < mediaWithComments.comment_count &&
                mediaWithComments.nextMinId &&
                mediaWithComments.nextMinId !== 0) {

                mediaWithComments = await loadMoreCommentsForMedia2(mediaWithComments, mediaWithComments.nextMinId);

            } else {
                break;
            }

            var users = allNodes(mediaWithComments.comments, 'user');
            for (var k = 0; k < users.length; k++) {
                var u = users[k];
                u.source_type = 'Commenter';
                u.source_media = mediaWithComments.code;
                u.source_owner = mediaWithComments.owner.username;
                acctsQueue.push(u);
            }

            if (gblOptions.allowDuplicateAccounts == false) acctsQueue = uniq(acctsQueue);

            mediaToLike.push(media.node);


            arrayOfUsersToDiv(acctsQueue, true);
            arrayOfMediaToDiv(mediaToLike, true);

            if ((gblOptions.limitQueue == true && acctsQueue.length > gblOptions.maxAcctQueueLength)) {
                printMessage(gbGetMessage('Done') + gbGetMessage('QueueLimitReached'));
                return false;
            }

        }

        outputMessage(gbGetMessage('LogLoadedCommentsForPost', [String(mediaWithComments.comments.length), String(mediaWithComments.comment_count), String(i + 1), String(r.edges.length)]));

    }

    if ((gblOptions.limitQueue == true && acctsQueue.length > gblOptions.maxAcctQueueLength)) {
        arrayOfUsersToDiv(acctsQueue, true);
        printMessage(gbGetMessage('Done') + gbGetMessage('QueueLimitReached'));
        return false;
    }

    if (r.page_info.has_next_page == true) {
        outputMessage(gbGetMessage('LogWaitingSecondsLoadNextBatchComments'));
        timeoutsQueue.push(setTimeout(function () {
            ajaxLoadAllUsersCommenters(r.page_info.end_cursor);
        }, 2000));
    } else {
        printMessage(gbGetMessage('Done'));
    }
}

async function ajaxLoadAllUsersLikers(after) {
    if (typeof after != 'string') {
        after = '';
    } else {
        after = '%22after%22%3A%22' + after + '%22%2C';
    }


    const fetchMedia = await fetch("https://www.instagram.com/graphql/query", {
        "headers": {
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded",
            "priority": "u=1, i",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-asbd-id": "129477",
            "x-csrftoken": getCsrfFromCookie(),
            "x-fb-friendly-name": "PolarisProfilePostsQuery",
            "x-ig-app-id": "936619743392459"
        },
        "referrer": "https://www.instagram.com/" + currentProfilePage.username + "/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "av=17841400482242408&__d=www&__user=0&__a=1&__req=7&__hs=20028.HYP%3Ainstagram_web_pkg.2.1..0.1&dpr=1&__ccg=EXCELLENT&__rev=1017870321&__s=xc4v6e%3Api17z8%3Awisy8l&__hsi=7432327050990328368&__csr=&__comet_req=7&jazoest=26364&__spin_r=1017870321&__spin_b=trunk&__spin_t=1730473490&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=PolarisProfilePostsQuery&variables=%7B" + after + "%22data%22%3A%7B%22count%22%3A12%2C%22include_relationship_info%22%3Atrue%2C%22latest_besties_reel_media%22%3Atrue%2C%22latest_reel_media%22%3Atrue%7D%2C%22username%22%3A%22" + currentProfilePage.username + "%22%2C%22__relay_internal__pv__PolarisIsLoggedInrelayprovider%22%3Atrue%2C%22__relay_internal__pv__PolarisFeedShareMenurelayprovider%22%3Atrue%7D&server_timestamps=true&doc_id=8633614153419931",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    var jsonData = await fetchMedia.json();
    var r = jsonData.data.xdt_api__v1__feed__user_timeline_graphql_connection;

    beginLoadLikesForMedia(r);

}


async function loadLikesForQueueMedia() {
    for (var j = 0; j < likers.length; j++) {
        if ((gblOptions.limitQueue == true && acctsQueue.length < gblOptions.maxAcctQueueLength) || gblOptions.limitQueue == false) {
            acctsQueue.push(likers[j]);
        } else {

            if (gblOptions.allowDuplicateAccounts == false) acctsQueue = uniq(acctsQueue);

            arrayOfUsersToDiv(acctsQueue, true);
            arrayOfMediaToDiv(mediaToLike, true);

            printMessage(gbGetMessage('Done') + gbGetMessage('QueueLimitReached'));
            return false;
        }
    }
}


async function beginLoadLikesForMedia(r) {

    for (var i = 0; i < r.edges.length; i++) {
        var media = r.edges[i];

        if (gblOptions.includePinnedPostForLikes == false && media.node.timeline_pinned_user_ids.length > 0) continue;

        mediaToLike.push(media.node);

        let likers = await loadLikesForMedia(media);

        for (var j = 0; j < likers.length; j++) {
            if ((gblOptions.limitQueue == true && acctsQueue.length < gblOptions.maxAcctQueueLength) || gblOptions.limitQueue == false) {
                acctsQueue.push(likers[j]);
            } else {

                if (gblOptions.allowDuplicateAccounts == false) acctsQueue = uniq(acctsQueue);

                arrayOfUsersToDiv(acctsQueue, true);
                arrayOfMediaToDiv(mediaToLike, true);

                printMessage(gbGetMessage('Done') + gbGetMessage('QueueLimitReached'));
                return false;
            }
        }

    }

    arrayOfUsersToDiv(acctsQueue, false);
    arrayOfMediaToDiv(mediaToLike, false);

    if (r.page_info.has_next_page == true) {
        outputMessage(gbGetMessage('LogWaitingSecondsLoadMoreMedia'));
        timeoutsQueue.push(setTimeout(function () {
            ajaxLoadAllUsersLikers(r.page_info.end_cursor);
        }, 2000));
    } else {
        printMessage(gbGetMessage('Done'));
    }
}

function loadLikesForMedia(media) {

    return new Promise(function (resolve, reject) {

        let retMedia = media;

        var ownerUsername = '_____';
        var mediaId = '_____';
        var mediaShortcode = '_____';

        if (media && media.node && media.node.owner && media.node.owner.username) ownerUsername = media.node.owner.username;
        if (media && media.node && media.node.id) mediaId = media.node.id;
        if (media && media.node && media.node.code) mediaShortcode = media.node.code;

        printMessage(gbGetMessage('LogLoadingLikesForMedia', [ownerUsername, mediaId, mediaShortcode]));

        $.ajax({
            url: 'https://www.instagram.com/api/v1/media/' + media.node.id + '/likers/',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                xhr.setRequestHeader('x-asbd-id', '129477');
                xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            },
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (r) {

                let retLikers = [];

                if (r.users) {
                    for (var i = 0; i < r.users.length; i++) {
                        var a = r.users[i];
                        a['id'] = a.pk;
                        a.source_type = 'Liker';
                        a.source_media = media.node.code;
                        a.source_owner = media.node.owner.username;
                        retLikers.push(a);
                    }

                    resolve(retLikers);
                }

            }).fail(function (f) {
                if (f.status == 429) {
                    printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(loadLikesForMedia(media));
                    }, gblOptions.timeDelayAfter429RateLimit));
                }
            });

    });
}

var extensionId = chrome.runtime.id;

function getLikersFromMediaArray() {
    let accountsThatLiked = [];

    for (var i = 0; i < mediaForLikes.length; i++) {
        var media = mediaForLikes[i];

        for (var j = 0; j < media.data.shortcode_media.edge_liked_by.edges.length; j++) {
            var like = media.data.shortcode_media.edge_liked_by.edges[j].node;
            if (typeof like == 'undefined') {
                like = media.data.shortcode_media.edge_liked_by.edges[j];
            }
            if (accountIdsThatLiked.indexOf(like.id) == -1) {
                accountIdsThatLiked.push(like.id);
                accountsThatLiked.push(like);
            }
        }
    }

    if (acctsQueue.length == 0) {
        acctsQueue = accountsThatLiked;
    } else {
        for (var i = 0; i < accountsThatLiked.length; i++) {
            if ((gblOptions.limitQueue == true && acctsQueue.length < gblOptions.maxAcctQueueLength) || gblOptions.limitQueue == false) {
                acctsQueue.push(accountsThatLiked[i]);
            } else {

                if (gblOptions.allowDuplicateAccounts == false) acctsQueue = uniq(acctsQueue);

                arrayOfUsersToDiv(accountsThatLiked, false);
                return false;
            }
        }
    }

    arrayOfUsersToDiv(accountsThatLiked, false);
}


function ajaxGetPendingFollowRequests(after) {

    alert(gbGetMessage('AlertInstagramDisabledPendingRequests'));
    return false;

    $('#btnLoadPendingRequests').addClass('pulsing');

    if (typeof after != 'string') {
        acctsQueue = [];
        after = '';
    }

    var url = 'https://www.instagram.com/accounts/access_tool/current_follow_requests?__a=1';

    if (after != '') {
        url = url + '&cursor=' + after;
    }

    $.ajax(url)
        .done(function (r) {
            var tmpQueue = [];

            var promises = [];

            $(r.data.data).each(function (edge) {

                var u = {
                    username: $(this)[0].text
                }

                var promise = new Promise(async function (resolve, reject) {
                    u = await getAdditionalDataForAcct(u);
                    acctsQueue.push(u);
                    tmpQueue.push(u);
                    resolve(u);
                });
                promises.push(promise);

            });

            var result = Promise.all(promises);

            result.then(function (data) {
                arrayOfUsersToDiv(tmpQueue, false);

                if (r.data.cursor && (acctsQueue.length < parseInt(gblOptions.maxAcctQueueLength) || gblOptions.limitQueue != true)) {
                    printMessage(gbGetMessage('AccountsLoaded', [tmpQueue.length.toString(), acctsQueue.length.toString()]));
                    ajaxGetPendingFollowRequests(r.data.cursor);
                } else {
                    $('#btnLoadPendingRequests').removeClass('pulsing');
                    printMessage(gbGetMessage('Done'));
                }

            })


        }).fail(function (f) {
            if (f.status == 429) {
                printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                timeoutsQueue.push(setTimeout(function () {
                    ajaxGetPendingFollowRequests(after);
                }, gblOptions.timeDelayAfter429RateLimit));
            }
        });


}


async function ajaxGetAllUsersFollowers(after) {
    if (typeof after != 'string') {
        after = '';

        if (gblOptions.endcursors) {

            var endCursorsForThisPageAndAction = gblOptions.endcursors;
            endCursorsForThisPageAndAction = endCursorsForThisPageAndAction.filter(e => e.action === 'loadFollowers' && e.id === currentProfilePage.id);

            if (endCursorsForThisPageAndAction.length > 0) {
                dialog({
                    question: 'In the past you have loaded followers from <b>' + currentProfilePage.username + '</b>. You can attempt to begin loading from the point you left off, or start over from the freshest accounts.',
                    yes: 'Resume',
                    no: 'Start Over'
                }, function () {
                    var objEndCursor = endCursorsForThisPageAndAction[endCursorsForThisPageAndAction.length - 1];
                    ajaxGetAllUsersFollowers(objEndCursor.endcursor);
                    gblOptions.truncateStart = 0;
                }, function () {
                    setTimeout(function () { ajaxGetAllUsersFollowers(''); }, 0);
                });
                return;
            }

        }

    }

    if (after == '' && currentProfilePage.edge_followed_by.count > gblOptions.maxAcctQueueLength && gblOptions.limitQueue == true) {
        const startIndex = await showTruncateStartDialog({
            mode: 'followers',
            totalCount: currentProfilePage.edge_followed_by.count,
            currentTruncateStart: gblOptions.truncateStart
        });
        if (startIndex === null) {
            return;
        }
        gblOptions.truncateStart = startIndex;
        saveOptions();
    }

    var jsonvars = {
        id: currentProfilePage.id,
        first: 48
    }

    if (after != '') {
        jsonvars.after = after;
    }

    var urljsonvars = JSON.stringify(jsonvars);

    //7dd9a7e2160524fd85f50317462cff9f
    var url = 'https://www.instagram.com/graphql/query/?query_hash=7dd9a7e2160524fd85f50317462cff9f&variables=' + encodeURIComponent(urljsonvars);

    $.ajax(url)
        .done(function (r) {

            var tmpQueue = [];

            $(r.data.user.edge_followed_by.edges).each(function (edge) {
                var u = $(this)[0].node;
                u.source_type = 'Follower';
                u.source_owner = currentProfilePage.username;
                acctsQueue.push(u);
                tmpQueue.push(u);
            });

            printMessage(gbGetMessage('AccountsLoaded', [tmpQueue.length, acctsQueue.length]));


            if (!gblOptions.endcursors) gblOptions['endcursors'] = [];

            var todaysdate = new Date();

            if (r.data.user.edge_followed_by.page_info.end_cursor) {
                gblOptions.endcursors.push({
                    id: currentProfilePage.id,
                    username: currentProfilePage.username,
                    action: 'loadFollowers',
                    endcursor: r.data.user.edge_followed_by.page_info.end_cursor,
                    time: todaysdate.getTime()
                });
                saveOptions();

            }

            if (r.data.user.edge_followed_by.page_info.has_next_page == true &&
                (acctsQueue.length < (parseInt(gblOptions.truncateStart) + parseInt(gblOptions.maxAcctQueueLength)) ||
                    gblOptions.limitQueue != true ||
                    currentProfilePage.edge_followed_by.count < parseInt(gblOptions.maxAcctQueueLength))
            ) {

                ajaxGetAllUsersFollowers(r.data.user.edge_followed_by.page_info.end_cursor);


            } else {

                truncateQueue(gblOptions.truncateStart);

                $('#btnProcessQueue').removeClass('pulsing');

                arrayOfUsersToDiv(acctsQueue, true);

                printMessage(gbGetMessage('Done'));
                printMessage(' ');

            }


        }).fail(function (f) {
            if (f.status == 429) {
                printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                timeoutsQueue.push(setTimeout(function () {
                    ajaxGetAllUsersFollowers(after);
                }, gblOptions.timeDelayAfter429RateLimit));
            }
        });

}


async function ajaxLoadFollowing(after) {

    if (typeof after != 'string') {
        // acctsQueue = [];
        after = '';


        if (gblOptions.endcursors) {

            var endCursorsForThisPageAndAction = gblOptions.endcursors;
            endCursorsForThisPageAndAction = endCursorsForThisPageAndAction.filter(e => e.action === 'loadFollowing' && e.id === currentProfilePage.id);

            if (endCursorsForThisPageAndAction.length > 0) {
                dialog({
                    question: 'In the past you have loaded following from <b>' + currentProfilePage.username + '</b>. You can attempt to begin loading from the point you left off, or start over from the freshest accounts.',
                    yes: 'Resume',
                    no: 'Start Over'
                }, function () {
                    var objEndCursor = endCursorsForThisPageAndAction[endCursorsForThisPageAndAction.length - 1];
                    ajaxLoadFollowing(objEndCursor.endcursor);
                    gblOptions.truncateStart = 0;
                }, function () {
                    setTimeout(function () { ajaxLoadFollowing(''); }, 0);
                });
                return;
            }

        }

    }

    if (after == '' && currentProfilePage.edge_follow.count > gblOptions.maxAcctQueueLength && gblOptions.limitQueue == true) {
        const startIndex = await showTruncateStartDialog({
            mode: 'following',
            totalCount: currentProfilePage.edge_follow.count,
            currentTruncateStart: gblOptions.truncateStart
        });
        if (startIndex === null) {
            return;
        }
        gblOptions.truncateStart = startIndex;
        if (typeof saveOptions === 'function') saveOptions();
    }

    var jsonvars = {
        id: currentProfilePage.id,
        first: 48
    }

    if (after != '') {
        jsonvars.after = after;
    }

    var urljsonvars = JSON.stringify(jsonvars);

    //58712303d941c6855d4e888c5f0cd22f
    var url = 'https://www.instagram.com/graphql/query/?query_hash=c56ee0ae1f89cdbd1c89e2bc6b8f3d18&variables=' + encodeURIComponent(urljsonvars);


    $.ajax(url)
        .done(function (r) {

            var tmpQueue = [];

            $(r.data.user.edge_follow.edges).each(function (edge) {
                var u = $(this)[0].node;
                u.source_type = 'Followed by';
                u.source_owner = currentProfilePage.username;
                acctsQueue.push(u);
                tmpQueue.push(u);
            });

            //arrayOfUsersToDiv(tmpQueue, false);

            printMessage(gbGetMessage('AccountsLoaded', [tmpQueue.length, acctsQueue.length]));



            if (r.data.user.edge_follow.page_info.end_cursor) {
                var todaysdate = new Date();
                gblOptions.endcursors.push({
                    id: currentProfilePage.id,
                    username: currentProfilePage.username,
                    action: 'loadFollowing',
                    endcursor: r.data.user.edge_follow.page_info.end_cursor,
                    time: todaysdate.getTime()
                });
                saveOptions();
            }

            if (r.data.user.edge_follow.page_info.has_next_page == true &&
                (acctsQueue.length < (parseInt(gblOptions.truncateStart) + parseInt(gblOptions.maxAcctQueueLength)) ||
                    gblOptions.limitQueue != true ||
                    currentProfilePage.edge_follow.count < parseInt(gblOptions.maxAcctQueueLength))
            ) {
                ajaxLoadFollowing(r.data.user.edge_follow.page_info.end_cursor);

                if (!gblOptions.endcursors) gblOptions['endcursors'] = [];



            } else {
                truncateQueue(gblOptions.truncateStart);

                arrayOfUsersToDiv(acctsQueue, true);

                outputMessage(currentProfilePage.username + ' following loaded.  Count: ' + acctsQueue.length);
                printMessage(' ');

                loadedTheirFollowings = true;
            }

        });
}

function ajaxGetAllMyFollowing(after) {

    var jsonvars = {
        id: user.viewer.id,
        first: 48
    }

    if (after != '') {
        jsonvars.after = after;
    }

    var urljsonvars = JSON.stringify(jsonvars);

    var url = 'https://www.instagram.com/graphql/query/?query_hash=58712303d941c6855d4e888c5f0cd22f&variables=' + encodeURIComponent(urljsonvars);

    $.ajax(url)
        .done(function (r) {

            var tmpQueue = [];

            $(r.data.user.edge_follow.edges).each(function (edge) {
                var u = $(this)[0].node;
                u.source_type = 'Followed by';
                u.source_owner = user.viewer.username;
                acctsQueue.push(u);
                tmpQueue.push(u);
            });

            printMessage(gbGetMessage('AccountsLoaded', [tmpQueue.length, acctsQueue.length]));

            if (r.data.user.edge_follow.page_info.has_next_page == true) {
                ajaxGetAllMyFollowing(r.data.user.edge_follow.page_info.end_cursor);
            } else {
                outputMessage(gbGetMessage('LogYourFollowingLoadedCount', [String(acctsQueue.length)]));
                printMessage(' ');

                loadedMyFollowings = true;
            }

        }).fail(function (f) {
            if (f.status == 429) {
                printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                timeoutsQueue.push(setTimeout(function () {
                    ajaxGetAllMyFollowing(after);
                }, gblOptions.timeDelayAfter429RateLimit));
            }
        });
}



function isAdditionalDataFullyLoaded(q) {
    for (var i = 0; i < q.length; i++) {
        if (!q[i].edge_followed_by) {
            return false;
        }
    }
    return true;
}


var extId = btoa('' + extensionId);

function sortQueue(q, property, asc) {

    var propertySplit = property.split('.');

    if (propertySplit.length === 1) {
        q.sort(function (a, b) {
            // non-numeric properties like username
            if (isNaN(a[property])) {
                if (asc == true) {
                    return a[property].localeCompare(b[property]);
                } else {
                    return b[property].localeCompare(a[property]);
                }
            }
            // numeric properties like followers
            if (asc == true) {
                return a[property] - b[property];
            } else {
                return b[property] - a[property];
            }
        });
    } else if (propertySplit.length === 2) {
        q.sort(function (a, b) {
            if (asc == true) {
                return a[propertySplit[0]][propertySplit[1]] - b[propertySplit[0]][propertySplit[1]];
            } else {
                return b[propertySplit[0]][propertySplit[1]] - a[propertySplit[0]][propertySplit[1]];
            }
        });
    }

    return q;
}



async function appendLastPostDateToAcct(a) {

    //  only hit server if filter is enabled or use is getting more data and wants it
    if (
        (gblOptions.filterOptions.lastPosted[0] < 1 && gblOptions.filterOptions.lastPosted[1] > 4999) ||
        (a.is_private == true && a.followed_by_viewer == false) ||
        (document.getElementById('radioGetMoreData').checked == true && gblOptions.getLastPostDate == false)
    ) {
        // a.lastPostDateInDays = 10;
        return a;
    }

    if (!a.edge_owner_to_timeline_media) {
        a.edge_owner_to_timeline_media = { count: 0, edges: [] };
    } else if (!a.edge_owner_to_timeline_media.edges) {
        a.edge_owner_to_timeline_media.edges = [];
    }

    if (a.edge_owner_to_timeline_media.count > 0) {

        if (a.edge_owner_to_timeline_media.edges.length == 0) {
            a = await getTimelineForAcct(a);
        }

        var sortedMedia = sortQueue(a.edge_owner_to_timeline_media.edges, 'taken_at', false);
        var lastMediaDate = 0;
        if (sortedMedia.length > 0 && sortedMedia[0].taken_at != 'undefined') {
            lastMediaDate = sortedMedia[0].taken_at * 1000;
        }

        a.lastPostDate = lastMediaDate;

        var date1 = new Date(lastMediaDate);
        var date2 = new Date();
        var differenceInTime = date2.getTime() - date1.getTime();
        var differenceInDays = differenceInTime / (1000 * 3600 * 24);

        a.lastPostDateInDays = differenceInDays;


    } else {
        a.lastPostDateInDays = 6000;
    }

    return a;
}

function appendFollowersRatioToAcct(a) {
    if (a.edge_follow.count > 0 && a.edge_followed_by.count > 0) {
        a.followRatio = a.edge_followed_by.count / a.edge_follow.count;
    } else if (a.edge_followed_by.count > 0) {
        a.followRatio = a.edge_followed_by.count;
    } else {
        a.followRatio = 0;
    }

    return a;
}

function appendHasProfilePicToAcct(acct) {
    if (acct.profile_pic_url.indexOf(igExternalVars.emptyProfilePicUrl) > -1) {
        acct.has_profile_pic = 0;
    } else {
        acct.has_profile_pic = 1;
    }

    return acct;
}

function truncateQueue(start) {
    if (isNaN(parseInt(start))) start = 0;

    if (acctsQueue.length > gblOptions.maxAcctQueueLength && gblOptions.limitQueue != false) {
        var end = (start + gblOptions.maxAcctQueueLength);

        acctsQueue = acctsQueue.slice(start, end);

    }
}

async function arrayOfMediaToDiv(q, clearDiv) {

    if (typeof clearDiv == 'undefined') clearDiv = true;

    if (clearDiv === true) {
        $('#igBotMediaQueueContainer').children().remove();
    } else {
        $('#igBotMediaQueueContainer').children().not('.igBotQueueAcct').remove();
    }

    if (gblOptions.cbShowQueueOnScreen == false) {
        $('#igBotMediaQueueContainer').append('<div style="text-align:center;">You have turned off "Show queue on screen" in Settings.  Your queue is loaded in the background.</div>');
        return false;
    }


    $('#igBotMediaQueueContainer').append('<table id="gridjsMediaQueueWrapper"></table>');



    var columns = [{
        "name": '✓',
        "data": 'id',
        "width": '40px',
        "formatter": '<input type="checkbox" id="cb_${cell}" value="${cell}" />',
        "visible": true,
    }, {
        "name": "Media",
        "data": "image_versions2.candidates",
        "width": '150px',
        "visible": true
    }, {
        "name": '@username',
        "data": 'owner.username',
        "formatter": '<a href="https://www.instagram.com/${cell}" target="_blank">@${cell}</a>',
        "width": '125px',
        "visible": true
    }, {
        "name": "Caption",
        "data": "caption.text",
        "width": '200px',
        "visible": true
    }, {
        "name": "Date Taken",
        "data": "taken_at",
        "data2": "taken_at_timestamp",
        "width": '95px',
        "visible": true
    }, {
        "name": "Type",
        "data": "media_type",
        "data2": "__typename",
        "width": '95px',
        "visible": true
    }, {
        "name": "pk",
        "data": "pk",
        "width": '95px',
        "visible": false
    }, {
        "name": "id",
        "data": "id",
        "width": '95px',
        "visible": false
    }, {
        "name": "Comment Count",
        "data": "comment_count",
        "data2": "edge_media_preview_comment.count",
        "width": '95px',
        "visible": true
    }, {
        "name": "Like Count",
        "data": "like_count",
        "data2": "edge_media_preview_like.count",
        "width": '95px',
        "visible": true
    }];



    columns = columns.filter(e => e.visible !== false);


    var sb = '<thead><tr>';

    for (var i = 0; i < columns.length; i++) {
        sb = sb + '<th data-prop="' + columns[i].data + '" style="width:' + (columns[i].width || '60px') + ';">' + columns[i].name + '</th>';
    }

    sb = sb + '</tr></thead><tbody></tbody>';
    $('#gridjsMediaQueueWrapper').append(sb);

    for (var i = 0; i < q.length; i++) {
        sb = '<tr>';
        for (var j = 0; j < columns.length; j++) {


            if (columns[j].width) {
                sb = sb + '<td column-data="' + columns[j].data + '" style="width:' + columns[j].width + ';">';
            } else {
                sb = sb + '<td column-data="' + columns[j].data + '">';
            }

            if (columns[j].data) {

                var dataPropertyToUse = columns[j].data;

                if (columns[j].data2 && q[i].hasOwnProperty(columns[j].data2.split('.')[0])) {
                    dataPropertyToUse = columns[j].data2;

                }

                var props = dataPropertyToUse.split('.');

                if (props[1]) {
                    if (props[1] == 'candidates') {
                        if (q[i][props[0]] && q[i][props[0]][props[1]]) {
                            var candidates = q[i][props[0]][props[1]];
                            sb = sb + '<a href="https://www.instagram.com/p/' + (q[i].code || q[i].shortcode) + '" target="_blank"><img style="width:150px;" class="igBotMediaQueuePicture" data-img-id="' + q[i].id + '" src="' + candidates[0].url + '"></a></td>';
                        } else if (q[i].display_url) {
                            sb = sb + '<a href="https://www.instagram.com/p/' + (q[i].code || q[i].shortcode) + '" target="_blank"><img style="width:150px;" class="igBotMediaQueuePicture" data-img-id="' + q[i].id + '" src="' + q[i].display_url + '"></a></td>';
                        } else {
                            sb = sb + '</td>';
                        }
                    } else if (q[i][props[0]] && q[i][props[0]][props[1]]) {
                        if (columns[j].formatter) {
                            sb = sb + columns[j].formatter.replace(/\${ig_id}/g, q[i].id).replace(/\${cell}/g, q[i][props[0]][props[1]]) + '</td>';
                        } else {
                            sb = sb + q[i][props[0]][props[1]] + '</td>';
                        }
                    } else if (props[0] == 'caption') {
                        if (q[i].caption) {
                            sb = sb + q[i].caption + '</td>';
                        } else if (q[i].edge_media_to_caption && q[i].edge_media_to_caption.edges && q[i].edge_media_to_caption.edges.length > 0) {
                            sb = sb + q[i].edge_media_to_caption.edges[0].node.text + '</td>';
                        }

                    } else {
                        sb = sb + '-</td>';
                    }
                } else {
                    if (q[i][props[0]]) {
                        if (columns[j].formatter) {
                            sb = sb + columns[j].formatter.replace(/\${ig_id}/g, q[i].id).replace(/\${cell}/g, q[i][dataPropertyToUse]) + '</td>';
                        } else {

                            var dataString = (q[i][props[0]]);

                            if (props[0] == 'taken_at' || props[0] == 'taken_at_timestamp') {
                                var d = new Date(dataString * 1000);
                                var datePart = d.toISOString().slice(0, 10);
                                var timePart = d.toLocaleString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });
                                dataString = datePart + ' ' + timePart;
                            }

                            if (props[0] == '__typename' || props[0] == 'media_type') {
                                dataString = dataString.toString().replace('Graph', '').replace('2', 'Video').replace('8', 'Sidecar').replace('1', 'Image').replace('Sidecar', 'Slideshow');
                            }



                            sb = sb + dataString.toString() + '</td>';
                        }
                    } else {
                        sb = sb + '-</td>';
                    }
                }


            }
        }
        sb = sb + '</tr>';
        $('#gridjsMediaQueueWrapper tbody').append(sb);
    }


    $('#gridjsMediaQueueWrapper').tablesorter({

        // *** APPEARANCE ***
        // Add a theme - 'blackice', 'blue', 'dark', 'default', 'dropbox',
        // 'green', 'grey' or 'ice' stylesheets have all been loaded
        // to use 'bootstrap' or 'jui', you'll need to include 'uitheme'
        // in the widgets option - To modify the class names, extend from
        // themes variable. Look for '$.extend($.tablesorter.themes.jui'
        // at the bottom of this window
        // this option only adds a table class name 'tablesorter-{theme}'
        theme: 'blue',

        // fix the column widths
        widthFixed: true,

        // Show an indeterminate timer icon in the header when the table
        // is sorted or filtered
        showProcessing: true,

        // header layout template (HTML ok); {content} = innerHTML,
        // {icon} = <i/> (class from cssIcon)
        headerTemplate: '{content}{icon}',

        // return the modified template string
        onRenderTemplate: null, // function(index, template){ return template; },

        // called after each header cell is rendered, use index to target the column
        // customize header HTML
        onRenderHeader: function (index) {
            // the span wrapper is added by default
            $(this).find('div.tablesorter-header-inner').addClass('roundedCorners');
        },

        // *** FUNCTIONALITY ***
        // prevent text selection in header
        cancelSelection: true,

        // add tabindex to header for keyboard accessibility
        tabIndex: true,

        // other options: 'ddmmyyyy' & 'yyyymmdd'
        dateFormat: 'yyyymmdd',

        // The key used to select more than one column for multi-column
        // sorting.
        sortMultiSortKey: 'shiftKey',

        // key used to remove sorting on a column
        sortResetKey: 'ctrlKey',

        // false for German '1.234.567,89' or French '1 234 567,89'
        usNumberFormat: true,

        // If true, parsing of all table cell data will be delayed
        // until the user initializes a sort
        delayInit: false,

        // if true, server-side sorting should be performed because
        // client-side sorting will be disabled, but the ui and events
        // will still be used.
        serverSideSorting: false,

        // default setting to trigger a resort after an 'update',
        // 'addRows', 'updateCell', etc has completed
        resort: true,

        // *** SORT OPTIONS ***
        // These are detected by default,
        // but you can change or disable them
        // these can also be set using data-attributes or class names
        headers: {
            // set 'sorter : false' (no quotes) to disable the column
            0: {
                sorter: 'text'
            },
            1: {
                sorter: false
            },
        },

        // ignore case while sorting
        ignoreCase: true,

        // forces the user to have this/these column(s) sorted first
        sortForce: null,
        // initial sort order of the columns, example sortList: [[0,0],[1,0]],
        // [[columnIndex, sortDirection], ... ]
        // sortList: [
        //     [0, 0],
        //     [1, 0],
        //     [2, 0]
        // ],
        sortList: [],
        // default sort that is added to the end of the users sort
        // selection.
        sortAppend: null,

        // when sorting two rows with exactly the same content,
        // the original sort order is maintained
        sortStable: false,

        // starting sort direction 'asc' or 'desc'
        sortInitialOrder: 'asc',

        // Replace equivalent character (accented characters) to allow
        // for alphanumeric sorting
        sortLocaleCompare: false,

        // third click on the header will reset column to default - unsorted
        sortReset: true,

        // restart sort to 'sortInitialOrder' when clicking on previously
        // unsorted columns
        sortRestart: false,

        // sort empty cell to bottom, top, none, zero, emptyMax, emptyMin
        emptyTo: 'bottom',

        // sort strings in numerical column as max, min, top, bottom, zero
        stringTo: 'zero',

        // extract text from the table
        textExtraction: {
            0: function (node, table) {
                // this is how it is done by default
                return $(node).attr(table.config.textAttribute) ||
                    node.textContent ||
                    node.innerText ||
                    $(node).text() ||
                    '';
            },
            1: function (node) {
                return $(node).text();
            }
        },

        // data-attribute that contains alternate cell text
        // (used in default textExtraction function)
        textAttribute: 'data-text',

        // use custom text sorter
        // function(a,b){ return a.sort(b); } // basic sort
        textSorter: null,

        // choose overall numeric sorter
        // function(a, b, direction, maxColumnValue)
        numberSorter: null,

        // *** WIDGETS ***
        // apply widgets on tablesorter initialization
        initWidgets: true,

        // table class name template to match to include a widget
        widgetClass: 'widget-{name}',

        // include zebra and any other widgets, options:
        // 'columns', 'filter', 'stickyHeaders' & 'resizable'
        // 'uitheme' is another widget, but requires loading
        // a different skin and a jQuery UI theme.
        widgets: ['pager', 'stickyHeaders', 'storage', 'zebra', 'columns', 'filter'],

        widgetOptions: {

            // zebra widget: adding zebra striping, using content and
            // default styles - the ui css removes the background
            // from default even and odd class names included for this
            // demo to allow switching themes
            // [ 'even', 'odd' ]
            zebra: [
                'ui-widget-content even',
                'ui-state-default odd'
            ],

            // columns widget: change the default column class names
            // primary is the 1st column sorted, secondary is the 2nd, etc
            columns: [
                'primary',
                'secondary',
                'tertiary'
            ],

            // columns widget: If true, the class names from the columns
            // option will also be added to the table tfoot.
            columns_tfoot: true,

            // columns widget: If true, the class names from the columns
            // option will also be added to the table thead.
            columns_thead: true,

            // filter widget: If there are child rows in the table (rows with
            // class name from 'cssChildRow' option) and this option is true
            // and a match is found anywhere in the child row, then it will make
            // that row visible; default is false
            filter_childRows: false,

            // filter widget: If true, a filter will be added to the top of
            // each table column.
            filter_columnFilters: true,

            // filter widget: css class name added to the filter cell
            // (string or array)
            filter_cellFilter: '',

            // filter widget: css class name added to the filter row & each
            // input in the row (tablesorter-filter is ALWAYS added)
            filter_cssFilter: '',

            // filter widget: add a default column filter type
            // '~{query}' to make fuzzy searches default;
            // '{q1} AND {q2}' to make all searches use a logical AND.
            filter_defaultFilter: {},

            // filter widget: filters to exclude, per column
            filter_excludeFilter: {},

            // filter widget: jQuery selector string (or jQuery object)
            // of external filters
            filter_external: '',

            // filter widget: class added to filtered rows;
            // needed by pager plugin
            filter_filteredRow: 'filtered',

            // filter widget: add custom filter elements to the filter row
            filter_formatter: null,

            // filter widget: Customize the filter widget by adding a select
            // dropdown with content, custom options or custom filter functions
            // see http://goo.gl/HQQLW for more details
            filter_functions: null,

            // filter widget: hide filter row when table is empty
            filter_hideEmpty: true,

            // filter widget: Set this option to true to hide the filter row
            // initially. The rows is revealed by hovering over the filter
            // row or giving any filter input/select focus.
            filter_hideFilters: false,

            // filter widget: Set this option to false to keep the searches
            // case sensitive
            filter_ignoreCase: true,

            // filter widget: if true, search column content while the user
            // types (with a delay)
            filter_liveSearch: true,

            // filter widget: a header with a select dropdown & this class name
            // will only show available (visible) options within the drop down
            filter_onlyAvail: 'filter-onlyAvail',

            // filter widget: default placeholder text
            // (overridden by any header 'data-placeholder' setting)
            filter_placeholder: {
                search: '',
                select: ''
            },

            // filter widget: jQuery selector string of an element used to
            // reset the filters.
            filter_reset: null,

            // filter widget: Use the $.tablesorter.storage utility to save
            // the most recent filters
            filter_saveFilters: false,

            // filter widget: Delay in milliseconds before the filter widget
            // starts searching; This option prevents searching for every character
            // while typing and should make searching large tables faster.
            filter_searchDelay: 300,

            // filter widget: allow searching through already filtered rows in
            // special circumstances; will speed up searching in large tables if true
            filter_searchFiltered: true,

            // filter widget: include a function to return an array of values to be
            // added to the column filter select
            filter_selectSource: null,

            // filter widget: Set this option to true if filtering is performed on
            // the server-side.
            filter_serversideFiltering: false,

            // filter widget: Set this option to true to use the filter to find
            // text from the start of the column. So typing in 'a' will find
            // 'albert' but not 'frank', both have a's; default is false
            filter_startsWith: false,

            // filter widget: If true, ALL filter searches will only use parsed
            // data. To only use parsed data in specific columns, set this option
            // to false and add class name 'filter-parsed' to the header
            filter_useParsedData: false,

            // filter widget: data attribute in the header cell that contains
            // the default filter value
            filter_defaultAttrib: 'data-value',

            // filter widget: filter_selectSource array text left of the separator
            // is added to the option value, right into the option text
            filter_selectSourceSeparator: '|',

            // starting page of the pager (zero based index)
            pager_startPage: 0,

            // Number of visible rows - default is 10
            pager_size: gblOptions.mediapaginationLimit,

            // reset pager after filtering; set to desired page #
            // set to false to not change page at filter start
            pager_pageReset: 0,

            // output string - default is '{page}/{totalPages}';
            // possible variables:
            // {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
            // pager_output: '{startRow} to {endRow} ({totalRows})',
            pager_output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',

            // apply disabled classname to the pager arrows when the rows at
            // either extreme is visible - default is true
            pager_updateArrows: true,

            // Number of options to include in the pager number selector
            pager_maxOptionSize: 20,

            // Save pager page & size if the storage script is loaded
            // (requires $.tablesorter.storage in jquery.tablesorter.widgets.js)
            pager_savePages: true,

            // defines custom storage key
            pager_storageKey: 'tablesorter-media-pager',

            // if true, the table will remain the same height no matter how many
            // records are displayed. The space is made up by an empty
            // table row set to a height to compensate; default is false
            pager_fixedHeight: false,

            // count child rows towards the set page size?
            // (set true if it is a visible table row within the pager)
            // if true, child row(s) may not appear to be attached to its
            // parent row, may be split across pages or
            // may distort the table if rowspan or cellspans are included.
            pager_countChildRows: false,

            // remove rows from the table to speed up the sort of large tables.
            // setting this to false, only hides the non-visible rows; needed
            // if you plan to add/remove rows with the pager enabled.
            pager_removeRows: false,

            // css class names used by pager elements
            pager_css: {
                // class added to pager container
                container: 'tablesorter-pager',
                // error information row (don't include period at beginning)
                errorRow: 'tablesorter-errorRow',
                // class added to arrows @ extremes
                // (i.e. prev/first arrows "disabled" on first page)
                disabled: 'disabled'
            },

            // jQuery selectors
            pager_selectors: {
                // target the pager markup
                container: '.mediapager',
                // go to first page arrow
                first: '.first',
                // previous page arrow
                prev: '.prev',
                // next page arrow
                next: '.next',
                // go to last page arrow
                last: '.last',
                // go to page selector - select dropdown that sets the current page
                gotoPage: '.gotoPage',
                // location of where the "output" is displayed
                pageDisplay: '.pagedisplay',
                // page size selector - select dropdown that sets the "size" option
                pageSize: '.pagesize'
            },

            // Resizable widget: If this option is set to false, resized column
            // widths will not be saved. Previous saved values will be restored
            // on page reload
            resizable: true,

            // Resizable widget: If this option is set to true, a resizing anchor
            // will be included in the last column of the table
            resizable_addLastColumn: false,

            // Resizable widget: Set this option to the starting & reset header widths
            resizable_widths: [],

            // Resizable widget: Set this option to throttle the resizable events
            // set to true (5ms) or any number 0-10 range
            resizable_throttle: false,

            // saveSort widget: If this option is set to false, new sorts will
            // not be saved. Any previous saved sort will be restored on page
            // reload.
            saveSort: false,

            // stickyHeaders widget: extra class name added to the sticky header row
            stickyHeaders: '',

            // jQuery selector or object to attach sticky header to
            stickyHeaders_attachTo: '#igBotMediaQueueContainer',

            // jQuery selector or object to monitor horizontal scroll position
            // (defaults: xScroll > attachTo > window)
            stickyHeaders_xScroll: null,

            // jQuery selector or object to monitor vertical scroll position
            // (defaults: yScroll > attachTo > window)
            stickyHeaders_yScroll: null,

            // number or jquery selector targeting the position:fixed element
            stickyHeaders_offset: 0,

            // scroll table top into view after filtering
            stickyHeaders_filteredToTop: true,

            // added to table ID, if it exists
            stickyHeaders_cloneId: '-sticky',

            // trigger 'resize' event on headers
            stickyHeaders_addResizeEvent: true,

            // if false and a caption exist, it won't be included in the
            // sticky header
            stickyHeaders_includeCaption: true,

            // The zIndex of the stickyHeaders, allows the user to adjust this
            // to their needs
            stickyHeaders_zIndex: 2

        },

        // *** CALLBACKS ***
        // function called after tablesorter has completed initialization
        initialized: function () {

        }, // function (table) {}

        // *** extra css class names
        tableClass: '',
        cssAsc: '',
        cssDesc: '',
        cssNone: '',
        cssHeader: '',
        cssHeaderRow: '',
        // processing icon applied to header during sort/filter
        cssProcessing: '',

        // class name indiciating that a row is to be attached to the its parent
        cssChildRow: 'tablesorter-childRow',
        // if this class does not exist, the {icon} will not be added from
        // the headerTemplate
        cssIcon: 'tablesorter-icon',
        // class name added to the icon when there is no column sort
        cssIconNone: '',
        // class name added to the icon when the column has an ascending sort
        cssIconAsc: '',
        // class name added to the icon when the column has a descending sort
        cssIconDesc: '',
        // don't sort tbody with this class name
        // (only one class name allowed here!)
        cssInfoBlock: 'tablesorter-infoOnly',
        // class name added to table header which allows clicks to bubble up
        cssAllowClicks: 'tablesorter-allowClicks',
        // header row to ignore; cells within this row will not be added
        // to table.config.$headers
        cssIgnoreRow: 'tablesorter-ignoreRow',

        // *** SELECTORS ***
        // jQuery selectors used to find the header cells.
        selectorHeaders: '> thead th, > thead td',

        // jQuery selector of content within selectorHeaders
        // that is clickable to trigger a sort.
        selectorSort: 'th, td',

        // rows with this class name will be removed automatically
        // before updating the table cache - used by 'update',
        // 'addRows' and 'appendCache'
        selectorRemove: '.remove-me',

        // *** DEBUGING ***
        // send messages to console
        debug: false

    }).bind("sortEnd", function (e, t) {
        sortMediaQueueByTableSort();
        handleMediaCheckBoxes();
    });

    handleMediaCheckBoxes();
    handleImagePreload();

    if (clearDiv == true) {
        $('#mediapaginationLimit option:selected').attr("selected", null);
        $('#mediapaginationLimit option[value="' + gblOptions.mediapaginationLimit + '"]').attr("selected", "selected");
        $('#gridjsMediaQueueWrapper').trigger('pageSize', gblOptions.mediapaginationLimit);
    }

    $('#mediaqueueQuantityRow').show();
}



function handleImagePreload() {
    const images = document.querySelectorAll('#igBotQueueContainer img,#igBotMediaQueueContainer img');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    };
    let loaded = 0;

    let observer = new IntersectionObserver(function (entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                // Stop watching and load the image
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {

        $(image).off('click.hideGrowbotOnOpenPost').on('click.hideGrowbotOnOpenPost', function () {
            saveHiddenStatus(true);
        });


        if (image.hasAttribute('data-src')) {
            observer.observe(image);
        }
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) {
            return;
        }
        img.src = src;
        img.removeAttribute('data-src');
    }

}

function handleCheckBoxes(q) {

    let lastChecked;
    let boxes = [];

    function displaySelectedCount() {
        let boxCheckedCount = 0;
        boxes.forEach(box => {
            if (box.checked == true) boxCheckedCount++;
        });
        document.getElementById('igBotQueueSelectedCount').textContent = gbGetMessage('QueueSelectedCount', [String(boxCheckedCount)]);
    }

    function selectAllCheckBoxes() {
        boxes.forEach(box => {
            if (document.getElementById(box.id).closest('tr').classList.contains('filtered') == false) box.checked = true;
            //box.checked = true;
        });
        displaySelectedCount();
    }

    function selectNoneCheckBoxes() {
        boxes.forEach(box => {
            box.checked = false;
        });
        displaySelectedCount();
    }

    function invertCheckBoxes() {
        boxes.forEach(box => box.checked = !box.checked);
        displaySelectedCount();
    }

    function removeDuplicates() {
        var beforeCount;
        var afterCount;

        if (currentList == 'acctsWhiteList') {
            beforeCount = acctsWhiteList.length;
            acctsWhiteList = uniq(acctsWhiteList);
            afterCount = acctsWhiteList.length;
            arrayOfUsersToDiv(acctsWhiteList, true);
        } else if (currentList == 'acctsBlackList') {
            beforeCount = acctsBlackList.length;
            acctsBlackList = uniq(acctsBlackList);
            afterCount = acctsBlackList.length;
            arrayOfUsersToDiv(acctsBlackList, true);
        } else if (currentList == 'acctsPreviouslyAttempted') {
            beforeCount = acctsPreviouslyAttempted.length;
            acctsPreviouslyAttempted = uniq(acctsPreviouslyAttempted);
            afterCount = acctsPreviouslyAttempted.length;
            arrayOfUsersToDiv(acctsPreviouslyAttempted, true);
            chrome.storage.local.set({
                acctsAttempted: acctsPreviouslyAttempted
            });
        } else {
            beforeCount = acctsQueue.length;
            acctsQueue = uniq(acctsQueue);
            afterCount = acctsQueue.length;
            arrayOfUsersToDiv(acctsQueue, true);
        }

        refreshBoxes();
        updateCount();
        displaySelectedCount();

        printMessage(gbGetMessage('DuplicatesRemoved', ['' + (beforeCount - afterCount)]));
    }

    function removeSelected() {
        var useDefaultList = true;

        if (currentList == 'acctsWhiteList' || currentList == 'acctsBlackList' || currentList == 'acctsPreviouslyAttempted') {
            useDefaultList = false;
        }

        boxes.forEach(box => {
            if (box.checked) {
                if (useDefaultList == true) {
                    acctsQueue = acctsQueue.filter(u => u.id !== box.value);
                } else if (currentList == 'acctsWhiteList') {
                    acctsWhiteList = acctsWhiteList.filter(u => u.id !== box.value);
                } else if (currentList == 'acctsBlackList') {
                    acctsBlackList = acctsBlackList.filter(u => u.id !== box.value);
                } else if (currentList == 'acctsPreviouslyAttempted') {
                    acctsPreviouslyAttempted = acctsPreviouslyAttempted.filter(u => u.id !== box.value);
                }

                $('#' + box.value + '_container').remove();
            }
        });
        refreshBoxes();
        updateCount();
        displaySelectedCount();

        if (useDefaultList == true) {
            arrayOfUsersToDiv(acctsQueue, true);
        } else if (currentList == 'acctsWhiteList') {
            arrayOfUsersToDiv(acctsWhiteList, true);
        } else if (currentList == 'acctsBlackList') {
            arrayOfUsersToDiv(acctsBlackList, true);
        } else if (currentList == 'acctsPreviouslyAttempted') {
            arrayOfUsersToDiv(acctsPreviouslyAttempted, true);
            chrome.storage.local.set({
                acctsAttempted: acctsPreviouslyAttempted
            });
        }
    }

    function addAcctsToWhiteList() {
        boxes.forEach(box => {
            if (box.checked) {
                var acct = findAcctById(box.value, acctsQueue);
                addAcctToWhiteList(acct);
            }
        });

        setTimeout(saveWhiteListToStorage, 2000);

        return true;
    }

    function addAcctsToBlackList() {
        boxes.forEach(box => {
            if (box.checked) {
                var acct = findAcctById(box.value, acctsQueue);
                addAcctToBlackList(acct);
            }
        });

        setTimeout(saveBlackListToStorage, 2000);

        return true;
    }

    function checkIntermediateBoxes(first, second) {
        if (boxes.indexOf(first) > boxes.indexOf(second)) {
            [second, first] = [first, second];
        }
        intermediateBoxes(first, second).forEach(box => box.checked = true);
        displaySelectedCount();
    }

    function intermediateBoxes(start, end) {
        return boxes.filter((item, key) => {
            return boxes.indexOf(start) < key && key < boxes.indexOf(end);
        });
    }

    function changeBox(event) {
        if (event.shiftKey && this != lastChecked) {
            checkIntermediateBoxes(lastChecked, this);
        }
        lastChecked = this;
        displaySelectedCount();
    }

    function refreshBoxes() {
        boxes = Array.from(document.querySelectorAll('#gridjsAcctsQueueWrapper [type="checkbox"]'));
    }


    refreshBoxes();

    boxes.forEach(item => {
        $(item).off('click.changeBox').on('click.changeBox', changeBox);
    });

    $('#btnSelectAll').off('click.selectAllCheckBoxes').on('click.selectAllCheckBoxes', selectAllCheckBoxes);
    $('#btnSelectNone').off('click.selectNoneCheckBoxes').on('click.selectNoneCheckBoxes', selectNoneCheckBoxes);
    $('#btnInvertSelection').off('click.invertCheckBoxes').on('click.invertCheckBoxes', invertCheckBoxes);
    $('#btnRemoveSelected').off('click.removeSelected').on('click.removeSelected', removeSelected);
    $('#btnRemoveDuplicates').off('click.removeDuplicates').on('click.removeDuplicates', removeDuplicates);
    $('#btnAddToWhiteList').off('click.addAcctsToWhiteList').on('click.addAcctsToWhiteList', addAcctsToWhiteList);
    $('#btnSaveWhiteList').off('click.saveWhiteListToStorageAndDisk').on('click.saveWhiteListToStorageAndDisk', saveWhiteListToStorageAndDisk);
    $('#btnAddToBlackList').off('click.addAcctsToBlackList').on('click.addAcctsToBlackList', addAcctsToBlackList);
    $('#btnSaveBlackList').off('click.saveBlackListToStorageAndDisk').on('click.saveBlackListToStorageAndDisk', saveBlackListToStorageAndDisk);
    $('#btnSaveAttempted').off('click.saveAttemptedToStorageAndDisk').on('click.saveAttemptedToStorageAndDisk', saveAttemptedToStorageAndDisk);
    $('.close-icon').off('click.filterQueue').on('click.filterQueue', function () {
        setTimeout(filterQueue, 1);
    });
    //$('.igBotInjectedButton').off('click.displaySelectedCount').on('click.displaySelectedCount', displaySelectedCount);

    updateCount();
    displaySelectedCount();
}



function handleMediaCheckBoxes(q) {

    let lastChecked;
    let boxes = [];

    function displaySelectedCount() {
        let boxCheckedCount = 0;
        boxes.forEach(box => {
            if (box.checked == true) boxCheckedCount++;
        });
        document.getElementById('igBotmediaQueueSelectedCount').textContent = gbGetMessage('QueueSelectedCount', [String(boxCheckedCount)]);

    }

    function selectAllCheckBoxes() {
        boxes.forEach(box => {
            if (document.getElementById(box.id).closest('tr').classList.contains('filtered') == false) box.checked = true;
            //box.checked = true;
        });
        displaySelectedCount();
    }

    function selectNoneCheckBoxes() {
        boxes.forEach(box => {
            box.checked = false;
        });
        displaySelectedCount();
    }

    function invertCheckBoxes() {
        boxes.forEach(box => box.checked = !box.checked);
        displaySelectedCount();
    }

    function removeSelected() {
        boxes.forEach(box => {
            if (box.checked) {
                mediaToLike = mediaToLike.filter(m => m.id !== box.value);
            }
        });

        refreshBoxes();
        updateCount();
        displaySelectedCount();

        arrayOfMediaToDiv(mediaToLike, true);
    }

    function checkIntermediateBoxes(first, second) {
        if (boxes.indexOf(first) > boxes.indexOf(second)) {
            [second, first] = [first, second];
        }
        intermediateBoxes(first, second).forEach(box => box.checked = true);
        displaySelectedCount();
    }

    function intermediateBoxes(start, end) {
        return boxes.filter((item, key) => {
            return boxes.indexOf(start) < key && key < boxes.indexOf(end);
        });
    }

    function changeBox(event) {
        if (event.shiftKey && this != lastChecked) {
            checkIntermediateBoxes(lastChecked, this);
        }
        lastChecked = this;
        displaySelectedCount();
    }

    function refreshBoxes() {
        boxes = Array.from(document.querySelectorAll('#gridjsMediaQueueWrapper [type="checkbox"]'));
    }

    refreshBoxes();

    boxes.forEach(item => {
        $(item).off('click.changeBox').on('click.changeBox', changeBox);
    });

    $('#btnMediaSelectAll').off('click.selectAllCheckBoxes').on('click.selectAllCheckBoxes', selectAllCheckBoxes);
    $('#btnMediaSelectNone').off('click.selectNoneCheckBoxes').on('click.selectNoneCheckBoxes', selectNoneCheckBoxes);
    $('#btnMediaInvertSelection').off('click.invertCheckBoxes').on('click.invertCheckBoxes', invertCheckBoxes);
    $('#btnMediaRemoveSelected').off('click.removeSelected').on('click.removeSelected', removeSelected);
    $('.close-icon').off('click.filterQueue').on('click.filterQueue', function () {
        setTimeout(filterQueue, 1);
    });

    updateCount();
    displaySelectedCount();
}



function alreadyAttempted(acct) {

    if (typeof acct == 'undefined') return false;

    for (var i = 0; i < acctsPreviouslyAttempted.length; i++) {
        if (acctsPreviouslyAttempted[i].id && acctsPreviouslyAttempted[i].id == acct.id) return acctsPreviouslyAttempted[i];
    }

    return false;
}

function addToAttempted(acct) {

    var acctCopy = acct;

    var d = new Date();
    acctCopy["followAttemptDate"] = '' + d.getTime();

    acctsPreviouslyAttempted.push(acctCopy);
    chrome.storage.local.set({
        acctsAttempted: acctsPreviouslyAttempted
    });
}

function ajaxFollowAll() {
    if (acctsQueue.length == 0) {
        printMessage(gbGetMessage('QueueEmpty'));
        $('#btnProcessQueue').removeClass('pulsing');


        if (document.getElementById('cbLikeAfterFollow').checked == true && mediaToLike.length > 0) {
            outputMessage(gbGetMessage('LogLoadedAllMediaBeginningLikes'))
            likeAllMedia();
        }

        return false;
    }


    if (checkMaxActionsAndDelayIfNecessary(ajaxFollowAll) == false) {
        ajaxFollowUser(acctsQueue.shift());
    }
}

function removeAcctFromQueueDisplay(id, gray) {
    if (gray === true) {
        $('#igBotQueueContainer #' + id + '_container').css({
            'opacity': '.5'
        });
    } else {
        $('#igBotQueueContainer #' + id + '_container').fadeOut(300, function () {
            $(this).remove();
        });
    }
    updateCount();
}

function updateCount() {
    if (currentList === 'acctsWhiteList') {
        document.getElementById('igBotQueueCount').textContent = gbGetMessage('QueueCountAccounts', [String(acctsWhiteList.length)]);
    } else if (currentList === 'acctsBlackList') {
        document.getElementById('igBotQueueCount').textContent = gbGetMessage('QueueCountAccounts', [String(acctsBlackList.length)]);
    } else if (currentList === 'acctsPreviouslyAttempted') {
        document.getElementById('igBotQueueCount').textContent = gbGetMessage('QueueCountAccounts', [String(acctsPreviouslyAttempted.length)]);
    } else {
        document.getElementById('igBotQueueCount').textContent = gbGetMessage('QueueCountAccounts', [String(acctsQueue.length)]);
        document.getElementById('igBotmediaQueueCount').textContent = gbGetMessage('QueueCountMedias', [String(mediaToLike.length)]);
    }

    if (mediaToLike.length > 0) {
        $('#mediapaginationLimitDiv').show();
        $('#mediapaginationLimit option:selected').attr("selected", null);
        $('#mediapaginationLimit option[value="' + gblOptions.mediapaginationLimit + '"]').attr("selected", "selected");
    } else {
        $('#mediapaginationLimitDiv').hide();

    }

    if (acctsQueue.length > 0 || currentList == 'acctsWhiteList' || currentList == 'acctsBlackList' || currentList == 'acctsPreviouslyAttempted') {
        $('#paginationLimitDiv').show();
        $('#paginationLimit option:selected').attr("selected", null);
        $('#paginationLimit option[value="' + gblOptions.paginationLimit + '"]').attr("selected", "selected");

    } else {
        $('#paginationLimitDiv').hide();
    }
}

function addStamp(id, classname, text) {

    // if (gblOptions.removeAccountsFromQueue === true) {
    //     removeAcctFromQueueDisplay(id);
    //     return false;
    // }

    if (gblOptions.showStamps === true) {
        var $parent = $('img.igBotQueueAcctProfilePicture[data-ig-userid="' + id + '"],img.igBotMediaQueuePicture[data-img-id="' + id + '"]').parent();
        var isDuplicate = $parent.children('.stamp-div').filter(function () { return $(this).text() === text; }).length > 0;
        if (!isDuplicate) {
            $parent.append('<div class="stamp-div ' + classname + '">' + text + '</div>');
        }
        if ($parent[0]) $parent[0].scrollIntoView(false);
        return true;
    }

    return false;

}

function getRandomizedTime(baseTime) {
    if (gblOptions.useRandomTimeDelay == true) {
        var minRandomTimeDelay = Math.max(0, baseTime - (baseTime * gblOptions.percentRandomTimeDelay));
        var maxRandomTimeDelay = baseTime + (baseTime * gblOptions.percentRandomTimeDelay);
        return getRandomInt(minRandomTimeDelay, maxRandomTimeDelay);
    }
    return baseTime;
}

function usersMediaLoaded(r) {

    var numPicsToLike = parseInt(document.getElementById('numberFollowLikeLatestPics').value);

    if (r.acct && r.edges) {

        if (numPicsToLike > r.edges.length) {
            numPicsToLike = r.edges.length;
        }

    } else {
        numPicsToLike = 0;
    }

    for (var i = 0; i < numPicsToLike; i++) {
        var pieceOfMedia = r.edges[i].node;
        pieceOfMedia.owner = r.acct;
        mediaToLike.push(pieceOfMedia);
    }

    arrayOfMediaToDiv(mediaToLike, true);

    if (alreadyLiking == false) {
        likeAllMedia();
    }

}


function ajaxLoadPostsFromHashtag(after) {

    if (typeof after != 'string') after = '';

    var hashtag = getHashtagFromUrl();

    if (hashtag == '') {
        outputMessage(gbGetMessage('LogErrorNotOnHashtagPage'));
        return false;
    }

    var count = 50;

    if (!isNaN(document.getElementById('txtLimitMediaQueueSize').value)) {
        count = document.getElementById('txtLimitMediaQueueSize').value;
    }


    document.getElementById('btnLikeHashtag').classList.add('pulsing');


    $.ajax({
        url: 'https://i.instagram.com/api/v1/tags/' + hashtag + '/sections/',
        data: after,
        method: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
            xhr.setRequestHeader('x-instagram-ajax', '1010212815');
            xhr.setRequestHeader('x-asbd-id', '129477');
            xhr.setRequestHeader('x-ig-app-id', '936619743392459');
        },
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function (data) {

            if (data.more_available == true && (mediaToLike.length < parseInt(gblOptions.maxMediaQueueLength) || gblOptions.limitMediaQueue !== true)) {



                var medias = allNodes(data, 'media');
                for (var i = 0; i < medias.length; i++) {
                    mediaToLike.push(medias[i]);
                }

                mediaToLike = uniq(mediaToLike);

                printMessage(gbGetMessage('LogLoadedMediaOutOf', [String(mediaToLike.length), String(gblOptions.maxMediaQueueLength)]));

                outputMessage(gbGetMessage('LogMediaLoadedToQueue', [String(mediaToLike.length), String(count)]))
                arrayOfMediaToDiv(mediaToLike, false);



                after = {
                    "max_id": data.next_max_id,
                    "page": data.next_page,
                    "next_media_ids": data.next_media_ids,
                    "tab": "recent",
                    "surface": "grid",
                    "include_persistent": 0
                }

                timeoutsQueue.push(setTimeout(function () {
                    ajaxLoadPostsFromHashtag(after);
                }, 500));

            } else {

                $('#btnLikeHashtag').removeClass('pulsing');

                arrayOfMediaToDiv(mediaToLike, true);
                printMessage(gbGetMessage('Done'));

            }


        }).fail(function (f) {
            if (f.status == 429) {
                printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                timeoutsQueue.push(setTimeout(function () {
                    ajaxLoadPostsFromHashtag(after);
                }, gblOptions.timeDelayAfter429RateLimit));
            }
        });



}



function allNodes(obj, key, array) {
    array = array || [];
    if ('object' === typeof obj) {
        for (let k in obj) {
            if (k === key) {
                array.push(obj[k]);
            } else {
                allNodes(obj[k], key, array);
            }
        }
    }
    return array;
}

function uniq(arr) {

    const ids = arr.map(o => o.id)
    const filtered = arr.filter(({
        id
    }, index) => !ids.includes(id, index + 1))

    return filtered;

}


function getLocationFromUrl() {

    if (window.location.href.indexOf('/explore/locations/') == -1) {
        return '';
    }

    var tagFromUrl = window.location.href;
    tagFromUrl = tagFromUrl.replace('https://www.instagram.com/explore/locations/', '');
    tagFromUrl = tagFromUrl.slice(0, tagFromUrl.indexOf('/'));

    tagFromUrl = decodeURIComponent(tagFromUrl);

    return tagFromUrl;

}


function ajaxLoadPostsFromLocation(after) {

    var location = getLocationFromUrl();

    if (location == '') {
        outputMessage(gbGetMessage('LogErrorNotOnLocationPage'));
        return false;
    }

    $('#btnLoadLocationPosts').addClass('pulsing');


    if (!after.page) {
        printMessage(gbGetMessage('LogLoadingMediaFromLocation', [location]));

        // the first request has a different URL and is a get request
        var url = 'https://www.instagram.com/api/v1/locations/web_info/?location_id=' + location + '&show_nearby=false';
        var method = 'GET';
        after = {};
    } else {
        var url = 'https://www.instagram.com/api/v1/locations/' + location + '/sections/';
        var method = 'POST';
    }

    $.ajax({
        url: url,
        data: after,
        method: method,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
            xhr.setRequestHeader('x-instagram-ajax', '1010212815');
            xhr.setRequestHeader('x-asbd-id', '129477');
            xhr.setRequestHeader('x-ig-app-id', '936619743392459');
        },
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function (data) {

            var medias = allNodes(data, 'media');
            for (var i = 0; i < medias.length; i++) {
                mediaToLike.push(medias[i]);
            }

            mediaToLike = uniq(mediaToLike);

            printMessage(gbGetMessage('LogLoadedMediaOutOf', [String(mediaToLike.length), String(gblOptions.maxMediaQueueLength)]));

            arrayOfMediaToDiv(mediaToLike, false);

            // for first api call
            if (data.native_location_data && data.native_location_data.recent) {
                data = data.native_location_data.recent;
            }

            if (data.more_available == true && (mediaToLike.length < parseInt(gblOptions.maxMediaQueueLength) || gblOptions.limitMediaQueue !== true)) {

                after = {
                    "max_id": JSON.stringify(data.next_max_id),
                    "page": data.next_page,
                    "next_media_ids": JSON.stringify(data.next_media_ids),
                    "tab": "recent",
                    "surface": "grid",
                }

                timeoutsQueue.push(setTimeout(function () {
                    ajaxLoadPostsFromLocation(after);
                }, 200));
            } else {
                $('#btnLoadLocationPosts').removeClass('pulsing');

                printMessage(gbGetMessage('Done'));
                printMessage(' ');
            }


        }).fail(function (f) {
            if (f.status == 429) {
                printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                timeoutsQueue.push(setTimeout(function () {
                    ajaxLoadPostsFromLocation(after);
                }, gblOptions.timeDelayAfter429RateLimit));
            }
        });

}



function LoadAccountsFromMedia() {

    if (mediaToLike.length == 0) {
        outputMessage(gbGetMessage('LogErrorNoMediaLoaded'));
        return false;
    }

    $('#btnLoadMediaPosters').addClass('pulsing');

    if (gblOptions.MediaIncludeLikersCommentersTagged == true) {
        var owners = allNodes(mediaToLike, 'owner');
        for (var i = 0; i < owners.length; i++) {
            var u = owners[i];

            if (u && u.pk) u.id = u.pk;
            if (u != null) acctsQueue.push(u);
        }

        var users = allNodes(mediaToLike, 'user');
        for (var i = 0; i < users.length; i++) {
            var u = users[i];
            if (u && u.pk) u.id = u.pk;
            if (u != null) acctsQueue.push(u);
        }
    } else {
        for (var i = 0; i < mediaToLike.length; i++) {
            if (mediaToLike[i].owner) {
                var u = mediaToLike[i].owner;
                if (u && u.pk) u.id = u.pk;
                if (u != null) acctsQueue.push(u);
            }
        }
    }


    if (gblOptions.allowDuplicateAccounts == false) acctsQueue = uniq(acctsQueue);


    // truncateQueue(gblOptions.truncateStart);


    arrayOfUsersToDiv(acctsQueue, true);

    $('#btnLoadMediaPosters').removeClass('pulsing');

    printMessage(gbGetMessage('Done'));
    printMessage(' ');
}

async function ajaxLikeAllPostsFromFeed(after) {

    if (typeof after != 'string') {
        after = '';
    } else {
        after = '%22after%22%3A%22' + after + '%22%2C';
    }

    var count = '??';
    if (gblOptions.limitMediaQueue == true && !isNaN(document.getElementById('txtLimitMediaQueueSize').value)) {
        count = document.getElementById('txtLimitMediaQueueSize').value;
    }

    document.getElementById('btnLikeFeed').classList.add('pulsing');

    const fetchMedia = await fetch("https://www.instagram.com/graphql/query", {
        "headers": {
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded",
            "priority": "u=1, i",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-asbd-id": "129477",
            "x-csrftoken": getCsrfFromCookie(),
            "x-fb-friendly-name": "PolarisProfilePostsQuery",
            "x-ig-app-id": "936619743392459"
        },
        "referrer": "https://www.instagram.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "av=17841400482242408&__d=www&__user=0&__a=1&__req=t&__hs=20154.HYP%3Ainstagram_web_pkg.2.1...1&dpr=1&__ccg=EXCELLENT&__rev=1020686322&__s=0fq4up%3Aqwk9fx%3Aztxdzb&__hsi=7479118361645267327&__dyn=7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJxS0DU2wx609vCwjE1EE2Cw8G11wBz81s8hwGxu786a3a1YwBgao6C0Mo2iyo7u3ifK0EUjwGzEaE2iwNwmE2eUlwhEe87q0oa2-azqwt8d-2u2J0bS1LwTwKG1pg2fwxyo6O1FwlEcUed6goK2O4Xxui2qi7E5y4UrwHwGwa6bBK4o&__csr=goMB1hb2tRfdQwxbpLTSRvmhQB8jpqhWHA-BmnJkhQhrGRzGcUD9yV9p9oShAQ9GmUytfhAvAijVifBpaJ5AyummmqFGWABBypaJ4pohy49yVfCG8leoFA8Ahp8Kt4BleEK8x2UhAgyim8haBXDAWUF1J28jz8jVH-2lxCE01cu9FA9w2vVlhEkdV4vIwqwhQ0mO1axlwxGE2c81DxS1Aw39U1iU1-U1EE1ie26eg16C0wXwyxqfQAu5O2K4soTp83gyU421BU4JCg4a48ybxa5abwcR0d6mU5m0icgay9UCpwB2msg3K05Gcw06si0D80kDw&__hsdp=&__hblp=&__comet_req=7&fb_dtsg=NAcODTLMt5kxM-9MlWOVJnE0CiZb6vhOikbp1xwiOVjWF9npxxboJ3g%3A17843683126168011%3A1741209447&jazoest=26370&lsd=kulaA_fnsLsmyiVZWRxfLZ&__spin_r=1020686322&__spin_b=trunk&__spin_t=1741367942&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=PolarisFeedRootPaginationCachedQuery_subscribe&variables=%7B" + after + "%22before%22%3Anull%2C%22data%22%3A%7B%22device_id%22%3A%22E1F25225-A6AE-44CF-9EC8-932EC7E261CB%22%2C%22is_async_ads_double_request%22%3A%220%22%2C%22is_async_ads_in_headload_enabled%22%3A%220%22%2C%22is_async_ads_rti%22%3A%220%22%2C%22rti_delivery_backend%22%3A%220%22%7D%2C%22first%22%3A12%2C%22last%22%3Anull%2C%22variant%22%3A%22home%22%2C%22__relay_internal__pv__PolarisIsLoggedInrelayprovider%22%3Atrue%2C%22__relay_internal__pv__PolarisShareSheetV3relayprovider%22%3Afalse%7D&server_timestamps=true&doc_id=28982951317985068",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    var jsonData = await fetchMedia.json();
    var r = jsonData.data.xdt_api__v1__feed__timeline__connection;

    if (r.edges) {
        for (var i = 0; i < r.edges.length; i++) {
            var mediaNode = r.edges[i].node.media;
            if (gblOptions.includeSuggestedPostsFromFeed == true || (mediaNode && mediaNode != null && mediaNode.owner && mediaNode.owner != null && mediaNode.owner.friendship_status && mediaNode.owner.friendship_status.following == true)) {
                if (mediaNode && mediaNode.id) mediaToLike.push(mediaNode);
            }
        }
        var hasNextPage = r.page_info.has_next_page;
        if (hasNextPage == true) {
            after = r.page_info.end_cursor;
        }
        arrayOfMediaToDiv(mediaToLike, false);
    } else {
        printMessage(' ');
        printMessage(' ');
        outputMessage(gbGetMessage('LogErrorLikingFeed'));
        printMessage(' ');
        printMessage(' ');
    }

    if ((hasNextPage == true && after != '') && (gblOptions.limitMediaQueue == false || mediaToLike.length < gblOptions.maxMediaQueueLength)) {
        outputMessage(gbGetMessage('LogMediaLoadedToQueue', [String(mediaToLike.length), String(count)]))
        timeoutsQueue.push(setTimeout(function () {
            ajaxLikeAllPostsFromFeed(after);
        }, 500));
    } else {
        document.getElementById('btnLikeFeed').classList.remove('pulsing');
        printMessage(gbGetMessage('LogDoneDot'));
    }


}

async function watchReels() {

    var reels = mediaToLike.filter(e => e.media_type == 2 || e.is_video == true);

    for (var i = 0; i < reels.length; i++) {

        reels[i].SaveWhenWatchingReel = gblOptions.SaveWhenWatchingReel;
        reels[i].LikeWhenWatchingReel = gblOptions.LikeWhenWatchingReel;

        var done = await watchReel(reels[i]);

        addStamp(reels[i].id, 'stamp-div-green', stamp('StampWatched'));

        if (timeoutsQueue.length == 0) break;

    }

}

function watchReel(reel) {

    return new Promise(function (resolve, reject) {

        chrome.runtime.sendMessage({
            "openReelTab": reel
        });

        timeoutsQueue.push(
            setTimeout(function () {
                resolve(true);
            }, ((reel.video_duration || 20) * 1000) + 5)
        );

    });

}

function likeAllMedia() {
    alreadyLiking = true;
    if (gblOptions.showLikesInQueue === true) {
        handleImagePreload();
        handleMediaCheckBoxes(mediaToLike);
    }

    if (mediaToLike.length == 0) {
        $('#btnLikeFeed,#btnLikeHashtag').removeClass('pulsing');
        alreadyLiking = false;
        return false;
    }

    var media = mediaToLike.shift();
    var id = media.id;

    if (media.user && isBlacklisted(media.user)) {
        outputMessage(gbGetMessage('LogSkippingPostBlacklisted', [media.user.username]));
        addStamp(media.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        timeoutsQueue.push(setTimeout(likeAllMedia, 1));
        return false;
    }

    for (var i = 0; i < previousLikes.length; i++) {
        if (id == previousLikes[i]) {
            outputMessage(gbGetMessage('LogAlreadyLikedMovingOn'));
            addStamp(media.id, 'stamp-div-grey', stamp('StampSkipped'));

            timeoutsQueue.push(setTimeout(likeAllMedia, 1));
            return false;
        }
    }

    likeMedia(media);
}

function likeMedia(media) {

    var idToLike = getMediaIdForLike(media);
    var actorId = getInstagramActorId();
    var lsd = getInstagramLsdToken();
    var fbDtsg = getInstagramFbDtsg();
    var jazoest = getInstagramJazoest(fbDtsg);

    if (!idToLike) {
        outputMessage('Like skipped: missing media id');
        timeoutsQueue.push(setTimeout(likeAllMedia, 1));
        return false;
    }
    if (!actorId || !lsd || !fbDtsg) {
        outputMessage('Like failed: missing Instagram session tokens (reload instagram.com and try again)');
        mediaToLike.unshift(media);
        timeoutsQueue.push(setTimeout(likeAllMedia, 5000));
        return false;
    }

    var mutationVariables = {
        input: {
            media_id: idToLike,
            actor_id: actorId,
            client_mutation_id: "1"
        }
    };

    var body = [
        'av=' + encodeURIComponent(actorId),
        '__d=www',
        '__user=0',
        '__a=1',
        '__comet_req=7',
        'fb_dtsg=' + encodeURIComponent(fbDtsg),
        'jazoest=' + encodeURIComponent(jazoest),
        'lsd=' + encodeURIComponent(lsd),
        'fb_api_caller_class=RelayModern',
        'fb_api_req_friendly_name=PolarisAPILikePostMutation',
        'server_timestamps=true',
        'variables=' + encodeURIComponent(JSON.stringify(mutationVariables)),
        'doc_id=27232073366423857'
    ];

    $.ajax({
        url: 'https://www.instagram.com/api/graphql',
        method: 'POST',
        data: body.join('&'),
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
            xhr.setRequestHeader('x-asbd-id', '359341');
            xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            xhr.setRequestHeader('x-fb-friendly-name', 'PolarisAPILikePostMutation');
            xhr.setRequestHeader('x-fb-lsd', lsd);
        },
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function (data, textStatus, xhr) {
            var parsed = parseInstagramGraphqlLikeResult(data);
            if (!parsed.ok) {
                var responseSnippet = '';
                try {
                    responseSnippet = JSON.stringify(data).substring(0, 300);
                } catch (e) {
                    responseSnippet = xhr && xhr.responseText ? xhr.responseText.substring(0, 300) : parsed.message;
                }
                handleLikeMediaFailure(media, xhr && xhr.status ? xhr.status : 'graphql', responseSnippet || parsed.message);
                return;
            }

            handleLikeMediaSuccess(media);
        })
        .fail(function (xhr) {
            var status = xhr && typeof xhr.status !== 'undefined' ? xhr.status : '';
            var responseText = xhr && xhr.responseText ? xhr.responseText : '';
            var responseSnippet = responseText ? responseText.substring(0, 300) : '';
            handleLikeMediaFailure(media, status, responseSnippet);
        });
}

async function populateAllQueueUsersInfo(q) {
    genderBatchPending = true;
    for (var i = 0; i < q.length; i++) {
        q[i] = await getAdditionalDataForAcct(q[i]);

        var $$tr = $('#cb_' + q[i].id).parents('tr[role="row"]');

        for (const [key, value] of Object.entries(q[i])) {

            var cols = gbDefaultColumns;
            cols = cols.filter(c => c.data == key);

            var $$td = $$tr.children('td[column-data="' + key + '"]');
            if ($$td.html() == '' || $$td.text() == '-' || $$td.attr('column-data') == 'external_url') {
                $$td.text(value);
                if (cols[0] && cols[0].formatter && typeof value != 'undefined' && value != null) {
                    $$td.html(cols[0].formatter.replace(/\${ig_id}/g, q[i].id).replace(/\${cell}/g, value));
                }
            }
        }

        printMessage(gbGetMessage('DataLoaded', [(i + 1), q.length]));
    }

    q = await appendGenderToQueue(q);
    genderBatchPending = false;

    acctsQueue = q;

    if (window.confirm(gbGetMessage('AlertDeleteAccountsNotFoundConfirm'))) {
        var newq = q;
        newq = newq.filter(e => e.hasOwnProperty('assumedDeleted') == false);
        acctsQueue = newq;
    }

    arrayOfUsersToDiv(acctsQueue, true);

    if (window.confirm(gbGetMessage('FinishedAdditionalData'))) {
        saveQueueToStorageAndDisk();
    }

    $('#btnProcessQueue').removeClass('pulsing');
}

function maxActionsExceeded() {
    if (gblOptions.maxPerEnabled == true && (actionsTaken >= gblOptions.maxPerActions)) {
        var todaysdate = new Date();
        maxActionsDelayStartTime = todaysdate.getTime();

        return true;
    }
    return false;
}

function maxActionsDelayRemaining() {
    var todaysdate = new Date();
    var today = todaysdate.getTime();
    var timeSinceActionsMaxed;
    timeSinceActionsMaxed = today - maxActionsDelayStartTime;

    return (gblOptions.maxPerPeriod - timeSinceActionsMaxed);
}

function checkMaxActionsAndDelayIfNecessary(callback) {
    if (maxActionsExceeded() && maxActionsDelayRemaining() > 0) {
        timeoutsQueue.push(setTimeout(callback, maxActionsDelayRemaining()));
        outputMessage(gbGetMessage('LogMaxActionsExceededWaiting', [millisecondsToHumanReadable(maxActionsDelayRemaining(), true)]))

        actionsTaken = 0;

        return true;
    }

    return false;
}


function ajaxRemoveOrBlockAll() {
    if (checkMaxActionsAndDelayIfNecessary(ajaxRemoveOrBlockAll) == false) {
        ajaxRemoveOrBlockAcct(acctsQueue.pop());
    }
}


function viewStories() {
    if (checkMaxActionsAndDelayIfNecessary(viewStories) == false) {
        viewStory(acctsQueue.pop());
    }
}

async function viewStory(acct) {

    acct = await getAdditionalDataForAcct(acct);

    if (acct.is_private === true && acct.followed_by_viewer === false) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampPrivate'));
        outputMessage(gbGetMessage('LogSkippingViewStoryPrivate', [acct.username]));
        return false;
    }

    if (acct.assumedDeleted == true) {
        addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
        outputMessage(gbGetMessage('LogSkippingViewStoryMissing', [acct.username]));
        return false;
    }

    chrome.runtime.sendMessage({
        "openStoryTab": {
            "username": acct.username,
            "LikeWhenWatchingStory": document.getElementById('cbViewStoryLike').checked,
            "acct": acct
        }
    });

    // closedStoryTab(acct);

}

/** Run a server-scheduled view-story action; marks completed when the story tab closes. */
async function viewStoryScheduled(action) {
    if (!action || !action.id || !action.ig_username) {
        return;
    }

    let acct = action.payload;
    if (acct == null || typeof acct !== 'object') {
        acct = { username: String(acct || '') };
    } else {
        acct = { ...acct };
    }

    if (isBlacklisted(acct)) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        logScheduledActionSkipped(action, 'target is blacklisted');
        await markScheduledActionCompleted(action.id, action.ig_username);
        return;
    }

    acct = await getAdditionalDataForAcct(acct);

    if (isBlacklisted(acct)) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        logScheduledActionSkipped(action, 'target is blacklisted');
        await markScheduledActionCompleted(action.id, action.ig_username);
        return;
    }

    if (acct.is_private === true && acct.followed_by_viewer === false) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampPrivate'));
        logScheduledActionSkipped(action, 'private account (viewer does not follow)');
        await markScheduledActionCompleted(action.id, action.ig_username);
        return;
    }

    if (acct.assumedDeleted == true) {
        addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
        logScheduledActionSkipped(action, 'account missing or deleted');
        await markScheduledActionCompleted(action.id, action.ig_username);
        return;
    }

    const likeWhen = acct.likeWhenWatchingStory === true || acct.likeWhenWatchingStory === false
        ? acct.likeWhenWatchingStory
        : !!(document.getElementById('cbViewStoryLike') && document.getElementById('cbViewStoryLike').checked);

    chrome.runtime.sendMessage({
        openStoryTab: {
            username: acct.username,
            LikeWhenWatchingStory: likeWhen,
            acct: acct,
            scheduledActionId: action.id,
            scheduledIgUsername: action.ig_username
        }
    });
}

function closedStoryTab(request) {

    var acct = request.acct;

    if (request.scheduledActionId != null && request.scheduledIgUsername) {
        if (request.viewed == true) {
            addStamp(acct.id, 'stamp-div-green', stamp('StampViewedStory'));
        } else {
            addStamp(acct.id, 'stamp-div-grey', stamp('StampNoStory'));
        }
        outputMessage(gbGetMessage('LogStoryViewedOrFinished', [request.viewed ? 'viewed' : 'finished (no story or closed)', (acct && acct.username ? acct.username : '?')]));
        markScheduledActionCompleted(request.scheduledActionId, request.scheduledIgUsername);
        return false;
    }

    if (request.viewed == true) {
        addStamp(acct.id, 'stamp-div-green', stamp('StampViewedStory'));
    } else {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampNoStory'));
    }

    if (noAcctsLeft()) {
        return false;
    }

    if (gblOptions.autoSaveQueue == true) {
        saveQueueToStorage();
    }

    return false;
}

function ajaxUnfollowAll() {
    if (checkMaxActionsAndDelayIfNecessary(ajaxUnfollowAll) == false) {
        ajaxUnfollowAcct(acctsQueue.pop());
    }
}

function quickUnfollowAcct(acct) {
    if (isBlacklisted(acct)) {
        outputMessage(gbGetMessage('LogBlacklistedSkipping', [acct.username]));
        return $.Deferred().resolve().promise();
    }
    return $.ajax({
        url: 'https://www.instagram.com/web/friendships/' + acct.id + '/unfollow/',
        method: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
            xhr.setRequestHeader('x-instagram-ajax', '1010212815');
            xhr.setRequestHeader('x-asbd-id', '129477');
            xhr.setRequestHeader('x-ig-app-id', '936619743392459');
        },
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function () {
            outputMessage(gbGetMessage('LogUnfollowedFromButton', [acct.username, acct.id]));
            if (currentProfilePage && currentProfilePage.username && normalizeConvenienceUsername(currentProfilePage.username) === normalizeConvenienceUsername(acct.username)) {
                currentProfilePage.followed_by_viewer = false;
                currentProfilePage.viewer_follows_user = false;
                if (currentProfilePage.friendship_status) {
                    currentProfilePage.friendship_status.following = false;
                }
            }
            refreshConvenienceLinkPillsForUsername(acct.username);
        })
        .fail(function (data) {
            if (data.status == 403) {
                alert(gbGetMessage('AlertSoftRateLimitFailedUnfollow', [acct.username]));
            } else if (data.status == 400) {
                alert(gbGetMessage('AlertHardRateLimitFailedUnfollow', [acct.username]));
            } else {
                alert(gbGetMessage('AlertErrorStatusFailedUnfollow', [String(data.status), acct.username]));
            }
        });
}

function ajaxUnfollowAcct(acct) {
    if (gblOptions.autoSaveQueue == true) {
        saveQueueToStorage();
    }

    var promises = [];
    let unfollowable = true;

    var waitTime = getRandomizedTime(gblOptions.timeDelayAfterSkip);

    if (typeof acct == 'undefined') {
        noAcctsLeft();
        return false;
    }

    if (isBlacklisted(acct)) {
        outputMessage(gbGetMessage('LogBlacklistedSkipping', [acct.username]));
        addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        acctsProcessed.push(acct);
        setTimeout(ajaxUnfollowAll, 1);
        return false;
    }

    if (containsObject(acct, acctsWhiteList) == true) {
        outputMessage(gbGetMessage('LogWhitelistedSkipping', [acct.username]));
        addStamp(acct.id, 'stamp-div-grey', stamp('StampWhitelisted'));
        acctsProcessed.push(acct);
        setTimeout(ajaxUnfollowAll, 1);
        return false;
    }


    if (gblOptions.dontUnFollowNonGrowbot === true) {
        var acctFromStorage = alreadyAttempted(acct);
        if (acctFromStorage === false) {
            outputMessage(gbGetMessage('LogNonGrowbotSkipping', [acct.username]));
            addStamp(acct.id, 'stamp-div-grey', stamp('StampNonGrowbot'));
            acctsProcessed.push(acct);
            setTimeout(ajaxUnfollowAll, 1);
            return false;
        }
    }

    if (gblOptions.dontUnFollowFilters == true || gblOptions.dontUnFollowFollowers == true || gblOptions.unFollowIfOld == true) {
        promises.push(filterCriteriaMetForUnfollowing(acct).then((met) => {
            if (met == false) {
                unfollowable = false;
            }
        }));
    }

    Promise.all(promises).then(function () {
        if (unfollowable === false) {
            acctsProcessed.push(acct);
            outputMessage(gbGetMessage('LogSkippedMatchesFilters', [acct.username]));

            if (acct.assumedDeleted) {
                addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));

            } else {
                addStamp(acct.id, 'stamp-div-grey', stamp('StampMatchesFilters'));
            }


            if (noAcctsLeft()) {
                return false;
            } else {
                outputMessage(gbGetMessage('LogWaitingSecondsUnfollowNext', [String(waitTime / 1000), acctsQueue[acctsQueue.length - 1].username]));
                timeoutsQueue.push(setTimeout(ajaxUnfollowAll, waitTime));
                return false;
            }
        }

        waitTime = getRandomizedTime(gblOptions.timeDelay);

        $.ajax({
            //url: 'https://www.instagram.com/web/friendships/' + acct.id + '/unfollow/',
            url: 'https://www.instagram.com/api/v1/friendships/destroy/' + acct.id + '/',
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                xhr.setRequestHeader('x-asbd-id', '129477');
                xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            },
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function () {

                acctsProcessed.push(acct);
                actionsTaken++;
                addStamp(acct.id, 'stamp-div-green', stamp('StampUnfollowed'));

                outputMessage(gbGetMessage('LogUnfollowedProgress', [acct.username, acct.id, String(acctsProcessed.length), String(acctsQueue.length)]));


                if (noAcctsLeft()) {
                    return false;
                } else {
                    outputMessage(gbGetMessage('LogWaitingSecondsUnfollowNext', [String(waitTime / 1000), acctsQueue[acctsQueue.length - 1].username]));
                    timeoutsQueue.push(setTimeout(ajaxUnfollowAll, waitTime));
                }

            })
            .fail(function (data) {
                if (data.status !== 404) {
                    acctsQueue.push(acct);
                }

                if (data.status == 404) {
                    printMessage(acct.username + ' ' + gbGetMessage('AccountNotFound404'));
                    addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
                    timeoutsQueue.push(setTimeout(ajaxUnfollowAll, 1000));
                } else if (data.status == 403) {
                    printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(ajaxUnfollowAll, gblOptions.timeDelayAfterSoftRateLimit));
                } else if (data.status == 400) {
                    printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
                    timeoutsQueue.push(setTimeout(ajaxUnfollowAll, gblOptions.timeDelayAfterHardRateLimit));
                } else if (data.status == 429) {
                    printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(ajaxUnfollowAll, gblOptions.timeDelayAfter429RateLimit));
                } else {
                    outputMessage(gbGetMessage('LogGenericStatusError', [String(data.status)]));
                    timeoutsQueue.push(setTimeout(ajaxUnfollowAll, 5000));
                }
            })
    });

}

async function UnfollowAcctScheduled(acct, scheduledAction) {
    if (!acct) {
        logScheduledActionSkipped(scheduledAction, 'no account in payload');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (isBlacklisted(acct)) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'target is blacklisted');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (containsObject(acct, acctsWhiteList) == true) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampWhitelisted'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'target is whitelisted');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (gblOptions.dontUnFollowNonGrowbot === true) {
        const acctFromStorage = alreadyAttempted(acct);
        if (acctFromStorage === false) {
            addStamp(acct.id, 'stamp-div-grey', stamp('StampNonGrowbot'));
            acctsProcessed.push(acct);
            logScheduledActionSkipped(scheduledAction, 'followed outside Growbot (option enabled)');
            await completeScheduledFromAction(scheduledAction);
            return false;
        }
    }

    if (gblOptions.dontUnFollowFilters || gblOptions.dontUnFollowFollowers || gblOptions.unFollowIfOld) {
        const met = await filterCriteriaMetForUnfollowing(acct);
        if (met === false) {
            acctsProcessed.push(acct);
            if (acct.assumedDeleted) {
                addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
            } else {
                addStamp(acct.id, 'stamp-div-grey', stamp('StampMatchesFilters'));
            }
            logScheduledActionSkipped(scheduledAction, 'did not match your unfollow filters or criteria');
            await completeScheduledFromAction(scheduledAction);
            return false;
        }
    }

    // 4. Perform the Unfollow via Fetch
    try {
        const response = await fetch(`https://www.instagram.com/api/v1/friendships/destroy/${acct.id}/`, {
            method: 'POST',
            headers: {
                'X-Csrftoken': getCsrfFromCookie(),
                'x-instagram-ajax': '1010212815',
                'x-asbd-id': '129477',
                'x-ig-app-id': '936619743392459',
                'Content-Type': 'application/x-www-form-urlencoded' // Often required for Instagram POSTs
            },
            // withCredentials in fetch is handled by 'include'
            credentials: 'include'
        });

        if (!response.ok) {
            // Throwing error to be caught in the .catch/fail block equivalent
            throw response;
        }

        // Success (Equivalent to .done)
        acctsProcessed.push(acct);
        actionsTaken++;
        addStamp(acct.id, 'stamp-div-green', stamp('StampUnfollowed'));

        outputMessage(gbGetMessage('LogUnfollowedFromActionsQueue', [acct.username, acct.id]));
        await completeScheduledFromAction(scheduledAction);

    } catch (error) {
        const det = await growbotParseIgError(error);
        const status = det.status;
        const responseJSON = det.payload || {};

        var rescheduleTimeDelay = 0;

        if (status !== 404) {
            acctsQueue.push(acct);
        }

        if (status === 404) {
            printMessage(acct.username + ' ' + gbGetMessage('AccountNotFound404'));
            logScheduledActionIgFailure(scheduledAction, status, 'account not found');
            addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
            await postScheduledActionFailureReport(scheduledAction, status, 'account_not_found', responseJSON);
            await completeScheduledFromAction(scheduledAction);
        } else if (status === 403) {
            printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'soft rate limit; pending unfollows pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfterSoftRateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_soft', responseJSON);
        } else if (status === 400) {
            printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'hard rate limit; pending unfollows pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfterHardRateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_hard', responseJSON);
        } else if (status === 429) {
            printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'HTTP 429; pending unfollows pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfter429RateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_429', responseJSON);
        } else {
            printMessage(gbGetMessage('LogUnknownErrorRetry10s'));
            logScheduledActionIgFailure(scheduledAction, status, 'unknown error; pending unfollows pushed forward');
            rescheduleTimeDelay = 10000;
            await postScheduledActionFailureReport(scheduledAction, status, 'unknown_error', responseJSON);
        }

        if (rescheduleTimeDelay > 0) {
            rescheduleActions('unfollow', guidCookie, user.viewer.username, rescheduleTimeDelay)
                .then(result => outputMessage(gbGetMessage('LogActionsQueueRescheduledUnfollow', [String(result.affected)])))
                .catch(err => console.error(err));
        }

    }
}


async function RemoveFollowerScheduled(acct, scheduledAction) {
    if (!acct) {
        logScheduledActionSkipped(scheduledAction, 'no account in payload');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (isBlacklisted(acct)) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'target is blacklisted');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (containsObject(acct, acctsWhiteList) == true) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampWhitelisted'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'target is whitelisted');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    try {
        const response = await fetch(`https://www.instagram.com/web/friendships/${acct.id}/remove_follower/`, {
            method: 'POST',
            headers: {
                'X-Csrftoken': getCsrfFromCookie(),
                'x-instagram-ajax': '1010212815',
                'x-asbd-id': '129477',
                'x-ig-app-id': '936619743392459',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw response;
        }

        acctsProcessed.push(acct);
        actionsTaken++;
        addStamp(acct.id, 'stamp-div-green', stamp('StampRemoved'));

        outputMessage(gbGetMessage('LogRemovedFollowerFromActionsQueue', [acct.username, acct.id]));
        await completeScheduledFromAction(scheduledAction);

    } catch (error) {
        const det = await growbotParseIgError(error);
        const status = det.status;
        const responseJSON = det.payload || {};

        var rescheduleTimeDelay = 0;

        if (status !== 404) {
            acctsQueue.push(acct);
        }

        if (status === 404) {
            printMessage(acct.username + ' ' + gbGetMessage('AccountNotFound404'));
            logScheduledActionIgFailure(scheduledAction, status, 'account not found');
            addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
            await postScheduledActionFailureReport(scheduledAction, status, 'account_not_found', responseJSON);
            await completeScheduledFromAction(scheduledAction);
        } else if (status === 403) {
            printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'soft rate limit; pending remove-follower actions pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfterSoftRateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_soft', responseJSON);
        } else if (status === 400) {
            printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'hard rate limit; pending remove-follower actions pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfterHardRateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_hard', responseJSON);
        } else if (status === 429) {
            printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'HTTP 429; pending remove-follower actions pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfter429RateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_429', responseJSON);
        } else {
            printMessage(gbGetMessage('LogUnknownErrorRetry10s'));
            logScheduledActionIgFailure(scheduledAction, status, 'unknown error; pending remove-follower actions pushed forward');
            rescheduleTimeDelay = 10000;
            await postScheduledActionFailureReport(scheduledAction, status, 'unknown_error', responseJSON);
        }

        if (rescheduleTimeDelay > 0) {
            rescheduleActions('remove_follower', guidCookie, user.viewer.username, rescheduleTimeDelay)
                .then(result => outputMessage(gbGetMessage('LogActionsQueueRescheduledRemoveFollower', [String(result.affected)])))
                .catch(err => console.error(err));
        }
    }
}


async function BlockAcctScheduled(acct, scheduledAction) {
    if (!acct) {
        logScheduledActionSkipped(scheduledAction, 'no account in payload');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (isBlacklisted(acct)) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'target is blacklisted');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (containsObject(acct, acctsWhiteList) == true) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampWhitelisted'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'target is whitelisted');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    try {
        const response = await fetch(`https://www.instagram.com/web/friendships/${acct.id}/block/`, {
            method: 'POST',
            headers: {
                'X-Csrftoken': getCsrfFromCookie(),
                'x-instagram-ajax': '1010212815',
                'x-asbd-id': '129477',
                'x-ig-app-id': '936619743392459',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw response;
        }

        acctsProcessed.push(acct);
        actionsTaken++;
        addStamp(acct.id, 'stamp-div-green', stamp('StampBlocked'));

        outputMessage(gbGetMessage('LogBlockedFromActionsQueue', [acct.username, acct.id]));
        await completeScheduledFromAction(scheduledAction);

    } catch (error) {
        const det = await growbotParseIgError(error);
        const status = det.status;
        const responseJSON = det.payload || {};

        var rescheduleTimeDelay = 0;

        if (status !== 404) {
            acctsQueue.push(acct);
        }

        if (status === 404) {
            printMessage(acct.username + ' ' + gbGetMessage('AccountNotFound404'));
            logScheduledActionIgFailure(scheduledAction, status, 'account not found');
            addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
            await postScheduledActionFailureReport(scheduledAction, status, 'account_not_found', responseJSON);
            await completeScheduledFromAction(scheduledAction);
        } else if (status === 403) {
            printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'soft rate limit; pending block actions pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfterSoftRateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_soft', responseJSON);
        } else if (status === 400) {
            printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'hard rate limit; pending block actions pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfterHardRateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_hard', responseJSON);
        } else if (status === 429) {
            printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'HTTP 429; pending block actions pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfter429RateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_429', responseJSON);
        } else {
            printMessage(gbGetMessage('LogUnknownErrorRetry10s'));
            logScheduledActionIgFailure(scheduledAction, status, 'unknown error; pending block actions pushed forward');
            rescheduleTimeDelay = 10000;
            await postScheduledActionFailureReport(scheduledAction, status, 'unknown_error', responseJSON);
        }

        if (rescheduleTimeDelay > 0) {
            rescheduleActions('block', guidCookie, user.viewer.username, rescheduleTimeDelay)
                .then(result => outputMessage(gbGetMessage('LogActionsQueueRescheduledBlock', [String(result.affected)])))
                .catch(err => console.error(err));
        }
    }
}


function ajaxFollowUser(acct) {
    if (gblOptions.autoSaveQueue == true) {
        saveQueueToStorage();
    }

    var promises = [];
    let followable = true;
    var waitTime = getRandomizedTime(gblOptions.timeDelayAfterSkip);

    if (!acct) {
        outputMessage('no account');
        return false;
    }

    if (isBlacklisted(acct)) {
        outputMessage(gbGetMessage('LogBlacklistedSkipping', [acct.username]));
        addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        acctsProcessed.push(acct);
        timeoutsQueue.push(setTimeout(ajaxFollowAll, 1));
        return false;
    }

    var acctFromStorage = alreadyAttempted(acct);
    var waitTime = getRandomizedTime(gblOptions.timeDelayAfterSkip);
    var acctsQueueNextUsername = '';
    if (acctsQueue.length > 0) {
        acctsQueueNextUsername = acctsQueue[0].username;
    }

    if (gblOptions.followPeopleAlreadyAttempted === false && acctFromStorage !== false) {
        acctsProcessed.push(acct);
        outputMessage(gbGetMessage('LogAlreadyAttemptedSkipped', [acct.username, timeToDate(acctFromStorage.followAttemptDate), String(waitTime / 1000), acctsQueueNextUsername]));
        addStamp(acct.id, 'stamp-div-grey', stamp('StampAttempted'));
        timeoutsQueue.push(setTimeout(ajaxFollowAll, waitTime));
        return false;
    } else if (acct.followed_by_viewer == true) {
        acctsProcessed.push(acct);
        outputMessage(gbGetMessage('LogAlreadyFollowingSkipped', [acct.username, String(waitTime / 1000), acctsQueueNextUsername]));
        addStamp(acct.id, 'stamp-div-grey', stamp('StampFollowed'));
        timeoutsQueue.push(setTimeout(ajaxFollowAll, waitTime));
        return false;
    } else if (acct.requested_by_viewer == true) {
        acctsProcessed.push(acct);
        outputMessage(gbGetMessage('LogAlreadyRequestedSkipped', [acct.username, String(waitTime / 1000), acctsQueueNextUsername]));
        addStamp(acct.id, 'stamp-div-grey', stamp('StampRequested'));
        timeoutsQueue.push(setTimeout(ajaxFollowAll, waitTime));
        return false;
    } else if (acct.is_private == true && gblOptions.followPrivateAccounts != true) {
        acctsProcessed.push(acct);
        outputMessage(gbGetMessage('LogPrivateSkipped', [acct.username, String(waitTime / 1000), acctsQueueNextUsername]));
        addStamp(acct.id, 'stamp-div-grey', stamp('StampPrivate'));
        timeoutsQueue.push(setTimeout(ajaxFollowAll, waitTime));
        return false;
    } else if (gblOptions.filterOptions.applyFiltersAutomatically == true) {
        promises.push(filterCriteriaMet(acct).then((met) => {
            if (met == false) {
                followable = false;
            }
        }));
    }

    Promise.all(promises).then(function () {

        if (followable === false) {
            acctsProcessed.push(acct);
            outputMessage(gbGetMessage('LogDidNotMatchFiltersSkipped', [acct.username, String(waitTime / 1000), acctsQueueNextUsername]));

            if (acct.assumedDeleted) {
                addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
            } else {
                addStamp(acct.id, 'stamp-div-grey', stamp('StampFiltered'));
            }

            if (noAcctsLeft()) return false;
            printMessage(' ');
            timeoutsQueue.push(setTimeout(ajaxFollowAll, waitTime));
            return false;
        }

        waitTime = getRandomizedTime(gblOptions.timeDelay);

        $.ajax({
            //url: 'https://www.instagram.com/web/friendships/' + acct.id + '/follow/',
            url: 'https://www.instagram.com/api/v1/friendships/create/' + acct.id + '/',
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                xhr.setRequestHeader('x-asbd-id', '129477');
                xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            },
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function () {

                acctsProcessed.push(acct);
                actionsTaken++;
                addStamp(acct.id, 'stamp-div-green', stamp('StampFollowed'));
                addToAttempted(acct);

                outputMessage(gbGetMessage('LogFollowedProgress', [acct.username, acct.id, String(acctsProcessed.length), String(waitTime / 1000), acctsQueueNextUsername]));
                timeoutsQueue.push(setTimeout(ajaxFollowAll, waitTime));

                if (document.getElementById('cbLikeAfterFollow').checked == true) {
                    ajaxLoadUsersMedia('', false, usersMediaLoaded, acct);
                }

            })
            .fail(function (data) {
                if (data.status !== 404) {
                    acctsQueue.unshift(acct);
                }

                if (data.status == 404) {
                    printMessage(acct.username + ' ' + gbGetMessage('AccountNotFound404'));
                    addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
                    timeoutsQueue.push(setTimeout(ajaxFollowAll, 1000));
                } else if (data.status == 403) {
                    printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(ajaxFollowAll, gblOptions.timeDelayAfterSoftRateLimit));
                } else if (data.status == 400) {
                    if (data.responseJSON && data.responseJSON.message) {
                        if (data.responseJSON.feedback_title) {
                            outputMessage(data.responseJSON.feedback_title);
                        }

                        if (data.responseJSON.feedback_url) {
                            outputMessage(data.responseJSON.feedback_url);
                        }

                        if (data.responseJSON.feedback_message) {
                            if (data.responseJSON.feedback_message.indexOf('blocked') > -1) {
                                outputMessage(gbGetMessage('LogMessageFromInstagram', [data.responseJSON.feedback_message]));
                            }
                        }
                        // check if they are at the max
                        if (data.responseJSON.message.indexOf('max') > -1) {
                            $('#btnProcessQueue').removeClass('pulsing');
                            alert(data.responseJSON.message);
                            alert(gbGetMessage('AlertPendingFollowRequestsCounted'));
                            return false;
                        }
                    }

                    printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
                    timeoutsQueue.push(setTimeout(ajaxFollowAll, gblOptions.timeDelayAfterHardRateLimit));
                } else if (data.status == 429) {
                    printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(ajaxFollowAll, gblOptions.timeDelayAfter429RateLimit));
                } else {
                    outputMessage(gbGetMessage('LogGenericStatusError', [String(data.status)]));
                    timeoutsQueue.push(setTimeout(ajaxFollowAll, 5000));
                }
            });
    });
}

async function markScheduledActionCompleted(actionId, igUsername) {
    try {
        await fetch('https://www.growbotforfollowers.com/actions/api_actions.php', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                action: 'mark_completed',
                id: actionId,
                ig_username: igUsername
            })
        });
        console.log(`Action ${actionId} marked as completed`);
        try {
            chrome.runtime.sendMessage({ scheduledActionFinished: actionId });
        } catch (e) { /* ignore */ }
        if (typeof window.fetchActions === 'function') {
            window.fetchActions();
        }
    } catch (error) {
        console.error('Error marking action completed:', error);
    }
}

/** Mark server action completed when this run used a full scheduled action object. */
async function completeScheduledFromAction(scheduledAction) {
    if (scheduledAction && scheduledAction.id != null && scheduledAction.ig_username) {
        await markScheduledActionCompleted(scheduledAction.id, scheduledAction.ig_username);
    }
}

/** One clear Growbot log line when a polled scheduled action starts. */
function logScheduledActionRun(action) {
    if (!action || !action.type) return;
    var ign = action.ig_username || '';
    var p = action.payload;
    var target = '';
    if (p != null && typeof p === 'object' && !Array.isArray(p)) {
        target = p.username || p.post_url || p.id || '';
    } else if (p != null && typeof p === 'string') {
        target = p;
    }
    var label = String(action.type).replace(/_/g, ' ');
    var msg = '[Actions Queue] ' + label;
    if (target) msg += ' — ' + target;
    if (ign) msg += ' (@' + ign + ')';
    if (action.id != null) msg += ' [id ' + action.id + ']';
    outputMessage(msg);
}

function scheduledActionTargetLabel(scheduledAction) {
    var p = scheduledAction && scheduledAction.payload;
    if (p != null && typeof p === 'object' && !Array.isArray(p)) {
        return String(p.username || p.post_url || p.id || '').trim();
    }
    if (typeof p === 'string') return p.trim();
    return '';
}

/** User-facing log when a scheduled action exits without calling Instagram (filters, whitelist, etc.). Server row is completed separately. */
function logScheduledActionSkipped(scheduledAction, reason) {
    var typePart = scheduledAction && scheduledAction.type
        ? String(scheduledAction.type).replace(/_/g, ' ')
        : 'action';
    var msg = '[Actions Queue] ' + typePart + ' skipped';
    if (reason) msg += ': ' + reason;
    var target = scheduledActionTargetLabel(scheduledAction);
    if (target) msg += ' — @' + target;
    if (scheduledAction && scheduledAction.id != null) msg += ' [id ' + scheduledAction.id + ']';
    outputMessage(msg);
}

/** User-facing log when Instagram returns an error; pairs with postScheduledActionFailureReport and reschedule where applicable. */
function logScheduledActionIgFailure(scheduledAction, httpStatus, detail) {
    var typePart = scheduledAction && scheduledAction.type
        ? String(scheduledAction.type).replace(/_/g, ' ')
        : 'action';
    var statusPart = httpStatus != null ? String(httpStatus) : '?';
    var msg = '[Actions Queue] ' + typePart + ' not completed (HTTP ' + statusPart + ')';
    if (detail) msg += ': ' + detail;
    var target = scheduledActionTargetLabel(scheduledAction);
    if (target) msg += ' — @' + target;
    if (scheduledAction && scheduledAction.id != null) msg += ' [id ' + scheduledAction.id + ']';
    outputMessage(msg);
}

async function growbotParseIgError(error) {
    var status = null;
    var payload = null;
    if (error && typeof error.status === 'number') {
        status = error.status;
    }
    if (error && error.responseJSON) {
        payload = error.responseJSON;
    }
    if (error && typeof error.json === 'function') {
        try {
            payload = await error.json();
        } catch (e) {
            /* ignore */
        }
        if (status == null && error.status != null) {
            status = error.status;
        }
    }
    return { status: status, payload: payload };
}

async function postScheduledActionFailureReport(scheduledAction, httpStatus, reason, igPayload) {
    if (!sessionToken) {
        return;
    }
    try {
        await fetch('https://www.growbotforfollowers.com/actions/scheduled_action_failure.php', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                action_id: scheduledAction && scheduledAction.id != null ? String(scheduledAction.id) : null,
                ig_username: scheduledAction && scheduledAction.ig_username
                    ? scheduledAction.ig_username
                    : (typeof user !== 'undefined' && user.viewer ? user.viewer.username : ''),
                action_type: scheduledAction && scheduledAction.type ? scheduledAction.type : 'unknown',
                http_status: httpStatus,
                reason: reason || '',
                ig_payload: igPayload != null ? igPayload : null
            })
        });
    } catch (e) {
        console.warn('postScheduledActionFailureReport', e);
    }
}

/** Log successful additional IG data load for analytics (non-queue actions). */
function postAdditionalInfoCompleted(acct) {
    if (!sessionToken) return;
    var viewer =
        typeof user !== 'undefined' && user.viewer && user.viewer.username
            ? user.viewer.username
            : '';
    if (!viewer || !acct || !acct.username) return;
    fetch('https://www.growbotforfollowers.com/actions/log_completed_action.php', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            ig_username: viewer,
            action_type: 'additional_info',
            target_username: acct.username,
            target_id: acct.id != null ? String(acct.id) : null,
            details: {
                subtype: 'profile_bundle',
                getExtendedData: !!gblOptions.getExtendedData,
                extension_version: growbotExtensionVersionHeaderValue()
            }
        })
    }).catch(function (e) {
        console.warn('postAdditionalInfoCompleted', e);
    });
}

function postAdditionalInfoTerminalFailure(httpStatus, reason, subtype, account, optionalPayload) {
    if (!sessionToken) return;
    var viewerName =
        typeof user !== 'undefined' && user.viewer && user.viewer.username
            ? user.viewer.username
            : '';
    var stub = {
        id: null,
        type: 'additional_info',
        ig_username: viewerName
    };
    var payload =
        typeof optionalPayload === 'object' && optionalPayload !== null ? Object.assign({}, optionalPayload) : {};
    payload.subtype = subtype || '';
    if (account && account.username) payload.target_username = account.username;
    if (account && account.id != null) payload.target_id = String(account.id);
    postScheduledActionFailureReport(stub, httpStatus, reason, payload).catch(function (e) {
        console.warn('postAdditionalInfoTerminalFailure', e);
    });
}

function pickViewerMetricsForDaily(v) {
    if (!v || typeof v !== 'object') {
        return {};
    }
    var keys = ['id', 'username', 'full_name', 'biography', 'follower_count', 'following_count', 'media_count', 'is_private', 'is_verified', 'is_business_account'];
    var o = {};
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (v[k] !== undefined) {
            o[k] = v[k];
        }
    }
    return o;
}

function growbotMaybePostIgDailyStats(profileU, viewer) {
    if (!viewer || !viewer.username || !sessionToken) {
        return;
    }
    var un = viewer.username;
    var today = new Date().toISOString().slice(0, 10);
    var storageKey = 'growbot_ig_stats_sent_' + un;
    chrome.storage.local.get([storageKey], function (data) {
        if (chrome.runtime.lastError) {
            return;
        }
        if (data[storageKey] === today) {
            return;
        }
        var metrics = {
            followers: profileU.edge_followed_by && profileU.edge_followed_by.count,
            following: profileU.edge_follow && profileU.edge_follow.count,
            posts: profileU.edge_owner_to_timeline_media && profileU.edge_owner_to_timeline_media.count,
            viewer: pickViewerMetricsForDaily(viewer)
        };
        fetch('https://www.growbotforfollowers.com/actions/ig_daily_stats.php', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ig_username: un,
                stats_date: today,
                metrics: metrics,
                extension_version: growbotExtensionVersionHeaderValue()
            })
        }).then(function (r) {
            if (r.ok) {
                var set = {};
                set[storageKey] = today;
                chrome.storage.local.set(set);
            }
        }).catch(function () { });
    });
}


async function FollowAcctScheduled(acct, scheduledAction) {
    if (!acct) {
        logScheduledActionSkipped(scheduledAction, 'no account in payload');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (isBlacklisted(acct)) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'target is blacklisted');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    var acctFromStorage = alreadyAttempted(acct);
    if (gblOptions.followPeopleAlreadyAttempted === false && acctFromStorage !== false) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampAttempted'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'already attempted on ' + timeToDate(acctFromStorage.followAttemptDate));
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (acct.followed_by_viewer == true) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampFollowed'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'already following');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (acct.requested_by_viewer == true) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampRequested'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'follow request already pending');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (acct.is_private == true && gblOptions.followPrivateAccounts != true) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampPrivate'));
        acctsProcessed.push(acct);
        logScheduledActionSkipped(scheduledAction, 'private account and follow-private option is off');
        await completeScheduledFromAction(scheduledAction);
        return false;
    }

    if (gblOptions.filterOptions.applyFiltersAutomatically == true) {
        const met = await filterCriteriaMet(acct);
        if (met === false) {
            acctsProcessed.push(acct);
            if (acct.assumedDeleted) {
                addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
            } else {
                addStamp(acct.id, 'stamp-div-grey', stamp('StampFiltered'));
            }
            logScheduledActionSkipped(scheduledAction, 'did not match your follow filters');
            await completeScheduledFromAction(scheduledAction);
            return false;
        }
    }

    try {
        const response = await fetch(`https://www.instagram.com/api/v1/friendships/create/${acct.id}/`, {
            method: 'POST',
            headers: {
                'X-Csrftoken': getCsrfFromCookie(),
                'x-instagram-ajax': '1010212815',
                'x-asbd-id': '129477',
                'x-ig-app-id': '936619743392459',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error = new Error('Request failed');
            error.status = response.status;
            error.responseJSON = errorData;
            throw error;
        }

        // Success
        acctsProcessed.push(acct);
        actionsTaken++;
        addStamp(acct.id, 'stamp-div-green', stamp('StampFollowed'));
        addToAttempted(acct);

        outputMessage(gbGetMessage('LogFollowedFromActionsQueue', [acct.username, acct.id]));

        // Like user's posts if option was set at scheduling time
        if (acct.likeAfterFollow === true) {
            ajaxLoadUsersMedia('', false, usersMediaLoaded, acct);
        }

        // Schedule unfollow if delay was set at scheduling time
        if (acct.unfollowAfterMs && acct.unfollowAfterMs > 0) {
            const unfollowResult = await scheduleAction({
                user_guid: guidCookie,
                ig_username: user.viewer.username,
                type: 'unfollow',
                payload: acct,
                scheduledTime: Date.now() + acct.unfollowAfterMs,
                repeat: 'none'
            });
            if (unfollowResult.success) {
                outputMessage(gbGetMessage('LogScheduledUnfollowInHours', [acct.username, String(Math.round(acct.unfollowAfterMs / 3600000))]));
            }
        }

        await completeScheduledFromAction(scheduledAction);

    } catch (error) {
        const det = await growbotParseIgError(error);
        const status = det.status;
        const responseJSON = det.payload || {};

        var rescheduleTimeDelay = 0;

        if (status === 404) {
            printMessage(acct.username + ' ' + gbGetMessage('AccountNotFound404'));
            logScheduledActionIgFailure(scheduledAction, status, 'account not found');
            addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
            await postScheduledActionFailureReport(scheduledAction, status, 'account_not_found', responseJSON);
            await completeScheduledFromAction(scheduledAction);
        } else if (status === 403) {
            printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'soft rate limit; pending follow actions pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfterSoftRateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_soft', responseJSON);
        } else if (status === 400) {
            // Handle Instagram feedback messages
            if (responseJSON && responseJSON.message) {
                if (responseJSON.feedback_title) {
                    outputMessage(responseJSON.feedback_title);
                }
                if (responseJSON.feedback_url) {
                    outputMessage(responseJSON.feedback_url);
                }
                if (responseJSON.feedback_message) {
                    if (responseJSON.feedback_message.indexOf('blocked') > -1) {
                        outputMessage(gbGetMessage('LogMessageFromInstagram', [responseJSON.feedback_message]));
                    }
                }
                // Check if at max following
                if (responseJSON.message.indexOf('max') > -1) {
                    outputMessage(responseJSON.message);
                    outputMessage(gbGetMessage('LogPendingFollowRequestsExplain'));
                    logScheduledActionIgFailure(scheduledAction, status, 'max following / follow limit');
                    await postScheduledActionFailureReport(scheduledAction, status, 'max_following', responseJSON);
                    await completeScheduledFromAction(scheduledAction);
                    return false;
                }
            }
            printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'hard rate limit; pending follow actions pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfterHardRateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_hard', responseJSON);
        } else if (status === 429) {
            printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
            logScheduledActionIgFailure(scheduledAction, status, 'HTTP 429; pending follow actions pushed forward');
            rescheduleTimeDelay = gblOptions.timeDelayAfter429RateLimit;
            await postScheduledActionFailureReport(scheduledAction, status, 'rate_limit_429', responseJSON);
        } else {
            printMessage(gbGetMessage('LogUnknownErrorFollowing', [acct.username]));
            logScheduledActionIgFailure(scheduledAction, status, 'unknown error; pending follow actions pushed forward');
            rescheduleTimeDelay = 10000;
            await postScheduledActionFailureReport(scheduledAction, status, 'unknown_error', responseJSON);
        }

        if (rescheduleTimeDelay > 0) {
            rescheduleActions('follow', guidCookie, user.viewer.username, rescheduleTimeDelay)
                .then(result => outputMessage(gbGetMessage('LogActionsQueueRescheduledFollow', [String(result.affected)])))
                .catch(err => console.error(err));
        }
    }
}


function growbotNormalizeActionPayload(payload) {
    if (payload == null) return {};
    if (typeof payload === 'object') return payload;
    if (typeof payload === 'string') {
        try {
            return JSON.parse(payload);
        } catch (e) {
            return {};
        }
    }
    return {};
}

/** Pending-queue dedupe base: same type + target user/id (no executor account). */
function growbotQueueTargetDedupeKey(type, payload) {
    const p = growbotNormalizeActionPayload(payload);
    const un = String(p.username || '').trim().toLowerCase();
    const id = p.id != null && String(p.id).trim() !== '' ? String(p.id).trim() : '';
    return String(type || '') + '\x01' + un + '\x01' + id;
}

/** Normalize ig_username for composite pending / queue dup keys (server-style lowercase trim). */
function growbotNormalizeExecutorIg(username) {
    return String(username || '').trim().toLowerCase();
}

/** Base key + executor account so the same target can be pending independently per IG executor. Empty executor falls back to base-only (matches legacy pending rows without ig_username). */
function growbotCompositeQueueDedupeKey(type, payload, executorIgUsername) {
    const base = growbotQueueTargetDedupeKey(type, payload);
    const ig = growbotNormalizeExecutorIg(executorIgUsername);
    return ig === '' ? base : base + '\x02' + ig;
}

function growbotPendingActionDedupeKey(action) {
    if (!action || !action.type) return '';
    const ig = action && action.ig_username != null ? action.ig_username : '';
    return growbotCompositeQueueDedupeKey(action.type, action.payload, ig);
}

function growbotMeanPendingActionsPerDay(pendingActions) {
    if (!pendingActions || !pendingActions.length) return null;
    const byDay = {};
    for (let i = 0; i < pendingActions.length; i++) {
        const t = Number(pendingActions[i].scheduledTime);
        if (!isFinite(t)) continue;
        const dayKey = new Date(t).toISOString().slice(0, 10);
        byDay[dayKey] = (byDay[dayKey] || 0) + 1;
    }
    const counts = Object.keys(byDay).map(function (k) { return byDay[k]; });
    if (!counts.length) return null;
    const sum = counts.reduce(function (a, b) { return a + b; }, 0);
    return sum / counts.length;
}

function growbotFilterQueueDuplicates(actionType, accts, pendingKeys, executingIgUsername) {
    const eligible = [];
    let skipped = 0;
    if (!pendingKeys || typeof pendingKeys.has !== 'function') {
        return { eligible: accts.slice(), skipped: 0 };
    }
    const exe = executingIgUsername;
    for (let i = 0; i < accts.length; i++) {
        const acct = accts[i];
        const k = exe != null && String(exe).trim() !== ''
            ? growbotCompositeQueueDedupeKey(actionType, acct, exe)
            : growbotCompositeQueueDedupeKey(actionType, acct, '');
        if (pendingKeys.has(k)) skipped++;
        else eligible.push(acct);
    }
    return { eligible, skipped };
}

/**
 * Pending duplicate filter when scheduling across one or many executors:
 * Keep a queue row if assignable under at least one executor (composite key absent from pendingKeys).
 */
function growbotFilterQueueDuplicatesMultiExecutor(actionType, accts, pendingKeys, executorIgUsernamesList) {
    const eligible = [];
    let skipped = 0;
    if (!pendingKeys || typeof pendingKeys.has !== 'function') {
        return { eligible: accts.slice(), skipped: 0 };
    }
    const exesUnique = [];
    const seenIg = {};
    let iexe;
    for (iexe = 0; iexe < (executorIgUsernamesList || []).length; iexe++) {
        const n = growbotNormalizeExecutorIg(executorIgUsernamesList[iexe]);
        if (!n || seenIg[n]) continue;
        seenIg[n] = true;
        exesUnique.push(n);
    }
    if (exesUnique.length === 0) {
        return growbotFilterQueueDuplicates(actionType, accts, pendingKeys, '');
    }
    if (exesUnique.length === 1) {
        return growbotFilterQueueDuplicates(actionType, accts, pendingKeys, exesUnique[0]);
    }
    for (let i = 0; i < accts.length; i++) {
        const acct = accts[i];
        let keep = false;
        for (let e = 0; e < exesUnique.length; e++) {
            const k = growbotCompositeQueueDedupeKey(actionType, acct, exesUnique[e]);
            if (!pendingKeys.has(k)) {
                keep = true;
                break;
            }
        }
        if (keep) eligible.push(acct);
        else skipped++;
    }
    return { eligible, skipped };
}

/**
 * Partition eligible queue targets across IG executors with per-slot quotas (schedule wizard).
 * consumeMode 'sequential' = fill each slot contiguously before the next; 'concurrent' = round-robin.
 * slots: { ig_username, quota, checked }[] in DOM/display order (quota capped when taking from queue).
 * @returns {{ assignments: Array<{ ig_username: string, acct }>, leftoverQuota: number, skippedDuplicateAgainstPending: number }}
 */
function growbotAllocateEligibleAcrossIgAccounts(actionType, eligibleAccts, compositePendingKeys, slotsInput, consumeMode) {
    const assignments = [];
    const n = eligibleAccts.length;

    /** @type {Array<{ ig_username: string, left: number }>} */
    const slots = [];
    for (let s = 0; s < slotsInput.length; s++) {
        const row = slotsInput[s];
        if (!row.checked) continue;
        const q = Math.max(0, parseInt(row.quota, 10) || 0);
        if (q < 1) continue;
        const igRaw = String(row.ig_username || '').trim();
        if (!igRaw) continue;
        slots.push({ ig_username: igRaw, left: q });
    }

    const canAssign = function (acct, igUsername) {
        return !compositePendingKeys.has(growbotCompositeQueueDedupeKey(actionType, acct, igUsername));
    };

    /** @type {boolean[]} */
    const used = new Array(n).fill(false);

    const modeSequential = consumeMode !== 'concurrent';

    if (modeSequential && slots.length > 0) {
        for (let si = 0; si < slots.length; si++) {
            const slot = slots[si];
            while (slot.left > 0) {
                let idx = -1;
                for (let i = 0; i < n; i++) {
                    if (used[i]) continue;
                    if (canAssign(eligibleAccts[i], slot.ig_username)) {
                        idx = i;
                        break;
                    }
                }
                if (idx < 0) break;
                used[idx] = true;
                assignments.push({ ig_username: slot.ig_username, acct: eligibleAccts[idx] });
                slot.left--;
            }
        }
    } else if (!modeSequential && slots.length > 0) {
        while (slots.some(function (sl) { return sl.left > 0; })) {
            let progressedRound = false;
            for (let si = 0; si < slots.length; si++) {
                const slot = slots[si];
                if (slot.left <= 0) continue;
                let idx = -1;
                for (let i = 0; i < n; i++) {
                    if (used[i]) continue;
                    if (canAssign(eligibleAccts[i], slot.ig_username)) {
                        idx = i;
                        break;
                    }
                }
                if (idx < 0) continue;
                used[idx] = true;
                assignments.push({ ig_username: slot.ig_username, acct: eligibleAccts[idx] });
                slot.left--;
                progressedRound = true;
            }
            if (!progressedRound) break;
        }
    }

    let leftoverQuota = 0;
    for (let s = 0; s < slots.length; s++) {
        leftoverQuota += Math.max(0, slots[s].left);
    }

    let skippedDuplicateAgainstPending = 0;
    if (slots.length > 0) {
        for (let i = 0; i < n; i++) {
            if (used[i]) continue;
            let anyCompatible = false;
            for (let si = 0; si < slots.length; si++) {
                if (canAssign(eligibleAccts[i], slots[si].ig_username)) {
                    anyCompatible = true;
                    break;
                }
            }
            if (!anyCompatible) skippedDuplicateAgainstPending++;
        }
    }

    return { assignments, leftoverQuota, skippedDuplicateAgainstPending };
}

/** First checked IG slot ig_username string with quota≥1 from wizard slot plan */
function growbotSchedulingFirstCheckedIgUsername(slotPlan) {
    if (!slotPlan || !slotPlan.length) return '';
    for (let yi = 0; yi < slotPlan.length; yi++) {
        const r = slotPlan[yi];
        if (!r || !r.checked) continue;
        if (r.quota < 1) continue;
        const u = r.ig_username != null ? String(r.ig_username).trim() : '';
        if (u) return u;
    }
    return '';
}

/**
 * Clone slot plan and assign quotas so checked accounts split totalEligible evenly (floor + remainder to first slots in DOM order).
 * Unchecked rows keep their DOM quota values (ignored by the allocator).
 */
function growbotApplyEvenSplitToSlotPlan(slotPlanIn, totalEligible) {
    const n = Math.max(0, parseInt(totalEligible, 10) || 0);
    if (!slotPlanIn || !slotPlanIn.length) return [];
    /** @type {Array<{ ig_username: string, checked: boolean, quota: number }>} */
    const plan = [];
    const checkedIx = [];
    for (let i = 0; i < slotPlanIn.length; i++) {
        const row = slotPlanIn[i];
        const ig = row && row.ig_username != null ? String(row.ig_username).trim() : '';
        const checked = !!(row && row.checked);
        let q = row && row.quota != null ? parseInt(row.quota, 10) : 50;
        if (!isFinite(q) || q < 1) q = 1;
        plan.push({ ig_username: ig, checked: checked, quota: q });
        if (checked && ig) checkedIx.push(i);
    }
    const k = checkedIx.length;
    if (k < 1) return plan;
    const base = Math.floor(n / k);
    const rem = n % k;
    for (let j = 0; j < k; j++) {
        plan[checkedIx[j]].quota = base + (j < rem ? 1 : 0);
    }
    return plan;
}

function growbotShowSchedulingBatchProgress(label) {
    const wrap = document.getElementById('igBotSchedulingBatchProgress');
    const txt = document.getElementById('igBotSchedulingBatchProgressText');
    const fill = document.getElementById('igBotSchedulingBatchProgressFill');
    const track = fill && fill.parentElement;
    if (!wrap || !txt || !fill) return;
    txt.textContent = label || 'Scheduling…';
    fill.style.width = '0%';
    if (track && track.setAttribute) {
        track.setAttribute('aria-valuenow', '0');
    }
    wrap.style.display = 'flex';
    wrap.setAttribute('aria-hidden', 'false');
}

function growbotSetSchedulingBatchProgress(done, total) {
    const fill = document.getElementById('igBotSchedulingBatchProgressFill');
    const track = fill && fill.parentElement;
    if (!fill) return;
    const frac = total > 0 ? Math.min(1, done / total) : 0;
    fill.style.width = Math.round(frac * 100) + '%';
    if (track && track.setAttribute) {
        track.setAttribute('aria-valuenow', String(Math.round(frac * 100)));
    }
}

function growbotHideSchedulingBatchProgress() {
    const wrap = document.getElementById('igBotSchedulingBatchProgress');
    if (!wrap) return;
    wrap.style.display = 'none';
    wrap.setAttribute('aria-hidden', 'true');
}

function growbotMsToDatetimeLocalValue(ms) {
    const d = new Date(ms);
    if (isNaN(d.getTime())) return '';
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
}

/** First action at now; each following at previous + randomized gblOptions.timeDelay (same as queue processing). */
function growbotGenerateRunNowSequentialTimestamps(numActions) {
    const timestamps = [];
    if (numActions < 1) return timestamps;
    let t = Date.now();
    timestamps.push(t);
    const base = typeof gblOptions !== 'undefined' && gblOptions.timeDelay != null ? gblOptions.timeDelay : 180000;
    for (let i = 1; i < numActions; i++) {
        t += Math.round(getRandomizedTime(base));
        timestamps.push(t);
    }
    return timestamps;
}

/** Apply saved gblOptions.actionsSchedulerExpanded to the Actions Queue scheduler panel (default: expanded). */
function growbotApplyActionsSchedulerExpandedPref() {
    const container = document.getElementById('divScheduledActions');
    const toggleBtn = document.getElementById('btn-toggle-scheduler');
    if (!container || !toggleBtn) return;
    const expanded = typeof gblOptions === 'undefined' || gblOptions.actionsSchedulerExpanded !== false;
    if (expanded) {
        container.classList.remove('scheduler-hidden');
        toggleBtn.textContent = '>>';
        toggleBtn.classList.add('secondary-btn');
        toggleBtn.title = 'Hide Scheduler';
    } else {
        container.classList.add('scheduler-hidden');
        toggleBtn.textContent = '+';
        toggleBtn.classList.remove('secondary-btn');
        toggleBtn.title = 'Show Scheduler';
    }
}

async function getExistingScheduleInfo() {
    try {
        const ign = encodeURIComponent(document.querySelector('#username')?.innerText || '');
        const response = await fetch(`https://www.growbotforfollowers.com/actions/api_actions.php?ign=${ign}&exclude_completed=1&fields=slim`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            console.error('Error fetching schedule info:', response.status);
            return { maxScheduledTime: null, countsPerDay: {}, pendingKeys: new Set(), avgPendingPerDay: null };
        }
        const data = await response.json();
        if (data && data.error) {
            console.error('Error fetching schedule info:', data.error);
            return { maxScheduledTime: null, countsPerDay: {}, pendingKeys: new Set(), avgPendingPerDay: null };
        }
        const actions = Array.isArray(data) ? data : (data.actions || []);

        if (!actions || actions.length === 0) {
            return { maxScheduledTime: null, countsPerDay: {}, pendingKeys: new Set(), avgPendingPerDay: null };
        }

        const pendingActions = actions.filter(a => a.status !== 'completed');
        if (pendingActions.length === 0) {
            return { maxScheduledTime: null, countsPerDay: {}, pendingKeys: new Set(), avgPendingPerDay: null };
        }

        const maxTime = Math.max(...pendingActions.map(a => Number(a.scheduledTime)));

        // Count existing actions per day (YYYY-MM-DD key)
        const countsPerDay = {};
        const pendingKeys = new Set();
        for (const action of pendingActions) {
            const dayKey = new Date(Number(action.scheduledTime)).toISOString().slice(0, 10);
            countsPerDay[dayKey] = (countsPerDay[dayKey] || 0) + 1;
            pendingKeys.add(growbotPendingActionDedupeKey(action));
        }

        const avgPendingPerDay = growbotMeanPendingActionsPerDay(pendingActions);

        return { maxScheduledTime: maxTime, countsPerDay, pendingKeys, avgPendingPerDay };
    } catch (error) {
        console.error('Error fetching schedule info:', error);
        return { maxScheduledTime: null, countsPerDay: {}, pendingKeys: new Set(), avgPendingPerDay: null };
    }
}

function onActionsScheduled(eligibleAccts, opts) {
    opts = opts || {};
    if (!opts.skipScheduledStamp) {
        eligibleAccts.forEach(function (acct) { addStamp(acct.id, 'stamp-div-blue', stamp('StampScheduled')); });
    }
    if (!opts.skipTabSwitch) {
        const tab8 = document.getElementById('tab8');
        const tab8Label = document.querySelector('nav li.tab8 label');
        if (tab8Label) tab8Label.click();
        else if (tab8) tab8.checked = true;

        const container = document.getElementById('divScheduledActions');
        const toggleBtn = document.getElementById('btn-toggle-scheduler');
        if (container && container.classList.contains('scheduler-hidden')) {
            container.classList.remove('scheduler-hidden');
            if (toggleBtn) {
                toggleBtn.textContent = '>>';
                toggleBtn.classList.add('secondary-btn');
                toggleBtn.title = 'Hide Scheduler';
            }
        }

        setTimeout(function () {
            const scrollEl = document.getElementById('igBotActionsQueueContainer') || document.getElementById('divScheduledActions');
            if (scrollEl && scrollEl.scrollIntoView) scrollEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
    }

    if (typeof window.fetchActions === 'function') window.fetchActions();
}

async function scheduleUnfollowingFromAcctsQueue() {
    // First pass: blacklist + whitelist only. Non-Growbot / filter checks run in UnfollowAcctScheduled.
    const eligibleAccts = [];
    for (var i = 0; i < acctsQueue.length; i++) {
        var acct = acctsQueue[i];

        if (isBlacklisted(acct)) {
            outputMessage(gbGetMessage('LogBlacklistedSkipping', [acct.username]));
            addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
            acctsProcessed.push(acct);
            continue;
        }

        if (containsObject(acct, acctsWhiteList) === true) {
            outputMessage(gbGetMessage('LogWhitelistedSkipping', [acct.username]));
            addStamp(acct.id, 'stamp-div-grey', stamp('StampWhitelisted'));
            acctsProcessed.push(acct);
            continue;
        }

        eligibleAccts.push(acct);
    }

    if (eligibleAccts.length === 0) {
        printMessage(gbGetMessage('LogNoEligibleScheduleUnfollow'));
        return;
    }

    // Show scheduling config dialog
    const scheduleInfo = await getExistingScheduleInfo();
    const choice = await showSchedulingConfigDialog('unfollow', eligibleAccts.length, scheduleInfo.maxScheduledTime, scheduleInfo.avgPendingPerDay);
    if (!choice) return; // user cancelled

    const viewerIgSch = growbotGetViewerIgUsername();
    const dup = choice.mode !== 'schedule'
        ? growbotFilterQueueDuplicates('unfollow', eligibleAccts, scheduleInfo.pendingKeys, viewerIgSch)
        : growbotFilterQueueDuplicatesMultiExecutor('unfollow', eligibleAccts, scheduleInfo.pendingKeys, choice.schedulingCheckedExecutorNormals || []);
    if (dup.skipped > 0) {
        printMessage(gbGetMessage('LogSkippedDuplicateInPending', [String(dup.skipped)]));
    }
    if (dup.eligible.length === 0) {
        printMessage(gbGetMessage('LogNoLeftAfterRemovingDuplicates'));
        return;
    }

    if (choice.mode === 'runNow') {
        const timestamps = growbotGenerateRunNowSequentialTimestamps(dup.eligible.length);
        const actions = dup.eligible.map((acct, j) => ({
            ig_username: user.viewer.username,
            type: 'unfollow',
            payload: acct,
            scheduledTime: timestamps[j],
            repeat: 'none'
        }));
        const result = await scheduleBatch(actions, { progressLabel: choice.batchProgressLabel || 'Preparing to run' });
        printMessage(gbGetMessage('LogBatchScheduledUnfollows', [String(result.succeeded), (result.failed ? ` (${result.failed} failed)` : '')]));
        onActionsScheduled(dup.eligible, { skipTabSwitch: true, skipScheduledStamp: true });
        return;
    }

    const config = choice;
    let IgSlotsSch = choice.schedulingIgSlotPlan || [];
    if (choice.schedulingIgQuotaMode === 'even') {
        IgSlotsSch = growbotApplyEvenSplitToSlotPlan(IgSlotsSch, dup.eligible.length);
    }
    const checkedExecNormSch = choice.schedulingCheckedExecutorNormals || [];
    const useMultiExecutorsSch = checkedExecNormSch.length >= 2;
    /** @type {Array<{ ig_username: string, type: string, payload: *, scheduledTime: number, repeat: string }>} */
    let actions;
    /** @type {Array<{ id?: * }>} */
    let acctsStampedAfter;

    if (useMultiExecutorsSch) {
        const consumeSch = choice.multiAccountConsumeMode === 'concurrent' ? 'concurrent' : 'sequential';
        const alloc = growbotAllocateEligibleAcrossIgAccounts('unfollow', dup.eligible, scheduleInfo.pendingKeys, IgSlotsSch, consumeSch);
        if (alloc.skippedDuplicateAgainstPending > 0) {
            printMessage(gbGetMessage('LogSkippedDuplicateAcrossIgAccts', [String(alloc.skippedDuplicateAgainstPending)]));
        }
        const leftoverRows = dup.eligible.length - alloc.assignments.length;
        if (leftoverRows > 0) {
            printMessage(gbGetMessage('LogAccountsNotScheduledLeftover', [String(leftoverRows)]));
        }
        const timestampsMz = generateScheduledTimes(config, alloc.assignments.length, scheduleInfo.countsPerDay);
        actions = alloc.assignments.map((rowA, j) => ({
            ig_username: rowA.ig_username,
            type: 'unfollow',
            payload: rowA.acct,
            scheduledTime: timestampsMz[j],
            repeat: 'none'
        }));
        acctsStampedAfter = alloc.assignments.map(function (r) { return r.acct; });
    } else {
        const soleIgSch = growbotSchedulingFirstCheckedIgUsername(IgSlotsSch) || viewerIgSch || user.viewer.username;
        const timestamps = generateScheduledTimes(config, dup.eligible.length, scheduleInfo.countsPerDay);
        actions = dup.eligible.map((acct, j) => ({
            ig_username: soleIgSch,
            type: 'unfollow',
            payload: acct,
            scheduledTime: timestamps[j],
            repeat: 'none'
        }));
        acctsStampedAfter = dup.eligible;
    }

    const result = await scheduleBatch(actions, { progressLabel: config.batchProgressLabel });
    printMessage(gbGetMessage('LogBatchScheduledUnfollows', [String(result.succeeded), (result.failed ? ` (${result.failed} failed)` : '')]));
    onActionsScheduled(acctsStampedAfter);

}



async function scheduleFollowingFromAcctsQueue() {
    // Eligibility (already followed, filters, etc.) is checked in FollowAcctScheduled when the action runs.
    if (acctsQueue.length === 0) {
        printMessage(gbGetMessage('LogNoAccountsInQueueForFollow'));
        return;
    }
    const eligibleAccts = acctsQueue.slice();

    // Show scheduling config dialog
    const scheduleInfo = await getExistingScheduleInfo();
    const choice = await showSchedulingConfigDialog('follow', eligibleAccts.length, scheduleInfo.maxScheduledTime, scheduleInfo.avgPendingPerDay);
    if (!choice) return; // user cancelled

    const viewerIgSchFo = growbotGetViewerIgUsername();
    const dup = choice.mode !== 'schedule'
        ? growbotFilterQueueDuplicates('follow', eligibleAccts, scheduleInfo.pendingKeys, viewerIgSchFo)
        : growbotFilterQueueDuplicatesMultiExecutor('follow', eligibleAccts, scheduleInfo.pendingKeys, choice.schedulingCheckedExecutorNormals || []);
    if (dup.skipped > 0) {
        printMessage(gbGetMessage('LogSkippedDuplicateInPending', [String(dup.skipped)]));
    }
    if (dup.eligible.length === 0) {
        printMessage(gbGetMessage('LogNoLeftAfterRemovingDuplicates'));
        return;
    }

    if (choice.mode === 'runNow') {
        const timestamps = growbotGenerateRunNowSequentialTimestamps(dup.eligible.length);
        var likeAfterFollowRn = document.getElementById('cbLikeAfterFollow') && document.getElementById('cbLikeAfterFollow').checked;
        var unfollowAfterFollowRn = document.getElementById('cbUnfollowAfterFollow') && document.getElementById('cbUnfollowAfterFollow').checked;
        var unfollowAfterDaysRn = parseInt(document.getElementById('numberUnfollowAfterDays').value) || 7;
        var unfollowAfterMsRn = unfollowAfterFollowRn ? (unfollowAfterDaysRn * 24 * 60 * 60 * 1000) : 0;
        const actions = dup.eligible.map((acct, j) => ({
            ig_username: user.viewer.username,
            type: 'follow',
            payload: {
                ...acct,
                likeAfterFollow: likeAfterFollowRn,
                unfollowAfterMs: unfollowAfterMsRn
            },
            scheduledTime: timestamps[j],
            repeat: 'none'
        }));
        const result = await scheduleBatch(actions, { progressLabel: choice.batchProgressLabel || 'Preparing to run' });
        printMessage(gbGetMessage('LogBatchScheduledFollows', [String(result.succeeded), (result.failed ? ` (${result.failed} failed)` : '')]));
        onActionsScheduled(dup.eligible, { skipTabSwitch: true, skipScheduledStamp: true });
        return;
    }

    const config = choice;
    var likeAfterFollow = document.getElementById('cbLikeAfterFollow') && document.getElementById('cbLikeAfterFollow').checked;
    var unfollowAfterFollow = document.getElementById('cbUnfollowAfterFollow') && document.getElementById('cbUnfollowAfterFollow').checked;
    var unfollowAfterDays = parseInt(document.getElementById('numberUnfollowAfterDays').value) || 7;
    var unfollowAfterMs = unfollowAfterFollow ? (unfollowAfterDays * 24 * 60 * 60 * 1000) : 0;

    let IgSlotsSchFo = choice.schedulingIgSlotPlan || [];
    if (choice.schedulingIgQuotaMode === 'even') {
        IgSlotsSchFo = growbotApplyEvenSplitToSlotPlan(IgSlotsSchFo, dup.eligible.length);
    }
    const checkedExecNormSchFo = choice.schedulingCheckedExecutorNormals || [];
    const useMultiExecutorsSchFo = checkedExecNormSchFo.length >= 2;
    /** @type {Array<{ ig_username: string, type: string, payload: *, scheduledTime: number, repeat: string }>} */
    let actionsFo;
    /** @type {Array<{ id?: * }>} */
    let acctsStampedAfterFo;

    if (useMultiExecutorsSchFo) {
        const consumeSchFo = choice.multiAccountConsumeMode === 'concurrent' ? 'concurrent' : 'sequential';
        const allocFo = growbotAllocateEligibleAcrossIgAccounts('follow', dup.eligible, scheduleInfo.pendingKeys, IgSlotsSchFo, consumeSchFo);
        if (allocFo.skippedDuplicateAgainstPending > 0) {
            printMessage(gbGetMessage('LogSkippedDuplicateAcrossIgAccts', [String(allocFo.skippedDuplicateAgainstPending)]));
        }
        const leftoverRowsFo = dup.eligible.length - allocFo.assignments.length;
        if (leftoverRowsFo > 0) {
            printMessage(gbGetMessage('LogAccountsNotScheduledLeftover', [String(leftoverRowsFo)]));
        }
        const timestampsMzFo = generateScheduledTimes(config, allocFo.assignments.length, scheduleInfo.countsPerDay);
        actionsFo = allocFo.assignments.map((rowAf, j) => ({
            ig_username: rowAf.ig_username,
            type: 'follow',
            payload: {
                ...rowAf.acct,
                likeAfterFollow: likeAfterFollow,
                unfollowAfterMs: unfollowAfterMs
            },
            scheduledTime: timestampsMzFo[j],
            repeat: 'none'
        }));
        acctsStampedAfterFo = allocFo.assignments.map(function (rF) { return rF.acct; });
    } else {
        const soleIgSchFo = growbotSchedulingFirstCheckedIgUsername(IgSlotsSchFo) || viewerIgSchFo || user.viewer.username;
        const timestampsFo = generateScheduledTimes(config, dup.eligible.length, scheduleInfo.countsPerDay);
        actionsFo = dup.eligible.map((acct, j) => ({
            ig_username: soleIgSchFo,
            type: 'follow',
            payload: {
                ...acct,
                likeAfterFollow: likeAfterFollow,
                unfollowAfterMs: unfollowAfterMs
            },
            scheduledTime: timestampsFo[j],
            repeat: 'none'
        }));
        acctsStampedAfterFo = dup.eligible;
    }

    const result = await scheduleBatch(actionsFo, { progressLabel: config.batchProgressLabel });
    printMessage(gbGetMessage('LogBatchScheduledFollows', [String(result.succeeded), (result.failed ? ` (${result.failed} failed)` : '')]));
    onActionsScheduled(acctsStampedAfterFo);

}

async function scheduleViewStoriesFromAcctsQueue() {
    if (acctsQueue.length === 0) {
        printMessage(gbGetMessage('LogNoAccountsInQueueForViewStory'));
        return;
    }

    const eligibleAccts = acctsQueue.slice();

    const scheduleInfo = await getExistingScheduleInfo();
    const choice = await showSchedulingConfigDialog('view story', eligibleAccts.length, scheduleInfo.maxScheduledTime, scheduleInfo.avgPendingPerDay);
    if (!choice) return;

    const viewerIgSchSv = growbotGetViewerIgUsername();
    const dup = choice.mode !== 'schedule'
        ? growbotFilterQueueDuplicates('story_view', eligibleAccts, scheduleInfo.pendingKeys, viewerIgSchSv)
        : growbotFilterQueueDuplicatesMultiExecutor('story_view', eligibleAccts, scheduleInfo.pendingKeys, choice.schedulingCheckedExecutorNormals || []);
    if (dup.skipped > 0) {
        printMessage(gbGetMessage('LogSkippedDuplicateInPending', [String(dup.skipped)]));
    }
    if (dup.eligible.length === 0) {
        printMessage(gbGetMessage('LogNoLeftAfterRemovingDuplicates'));
        return;
    }

    if (choice.mode === 'runNow') {
        const timestamps = growbotGenerateRunNowSequentialTimestamps(dup.eligible.length);
        const cbLikeRn = document.getElementById('cbViewStoryLike');
        const likeWhenWatchingStoryRn = cbLikeRn ? cbLikeRn.checked : true;
        const actions = dup.eligible.map((acct, j) => ({
            ig_username: user.viewer.username,
            type: 'story_view',
            payload: {
                ...acct,
                likeWhenWatchingStory: likeWhenWatchingStoryRn
            },
            scheduledTime: timestamps[j],
            repeat: 'none'
        }));
        const result = await scheduleBatch(actions, { progressLabel: choice.batchProgressLabel || 'Preparing to run' });
        printMessage(gbGetMessage('LogBatchScheduledViewStories', [String(result.succeeded), (result.succeeded === 1 ? 'y' : 'ies'), (result.failed ? ` (${result.failed} failed)` : '')]));
        onActionsScheduled(dup.eligible, { skipTabSwitch: true, skipScheduledStamp: true });
        return;
    }

    const config = choice;

    const cbLike = document.getElementById('cbViewStoryLike');
    const likeWhenWatchingStory = cbLike ? cbLike.checked : true;

    let IgSlotsSchSv = choice.schedulingIgSlotPlan || [];
    if (choice.schedulingIgQuotaMode === 'even') {
        IgSlotsSchSv = growbotApplyEvenSplitToSlotPlan(IgSlotsSchSv, dup.eligible.length);
    }
    const checkedExecNormSchSv = choice.schedulingCheckedExecutorNormals || [];
    const useMultiExecutorsSchSv = checkedExecNormSchSv.length >= 2;
    /** @type {Array<{ ig_username: string, type: string, payload: *, scheduledTime: number, repeat: string }>} */
    let actionsSv;
    /** @type {Array<{ id?: * }>} */
    let acctsStampedAfterSv;

    if (useMultiExecutorsSchSv) {
        const consumeSchSv = choice.multiAccountConsumeMode === 'concurrent' ? 'concurrent' : 'sequential';
        const allocSv = growbotAllocateEligibleAcrossIgAccounts('story_view', dup.eligible, scheduleInfo.pendingKeys, IgSlotsSchSv, consumeSchSv);
        if (allocSv.skippedDuplicateAgainstPending > 0) {
            printMessage(gbGetMessage('LogSkippedDuplicateAcrossIgAccts', [String(allocSv.skippedDuplicateAgainstPending)]));
        }
        const leftoverRowsSv = dup.eligible.length - allocSv.assignments.length;
        if (leftoverRowsSv > 0) {
            printMessage(gbGetMessage('LogAccountsNotScheduledLeftover', [String(leftoverRowsSv)]));
        }
        const timestampsMzSv = generateScheduledTimes(config, allocSv.assignments.length, scheduleInfo.countsPerDay);
        actionsSv = allocSv.assignments.map((rowS, j) => ({
            ig_username: rowS.ig_username,
            type: 'story_view',
            payload: {
                ...rowS.acct,
                likeWhenWatchingStory: likeWhenWatchingStory
            },
            scheduledTime: timestampsMzSv[j],
            repeat: 'none'
        }));
        acctsStampedAfterSv = allocSv.assignments.map(function (rSv) { return rSv.acct; });
    } else {
        const soleIgSchSv = growbotSchedulingFirstCheckedIgUsername(IgSlotsSchSv) || viewerIgSchSv || user.viewer.username;
        const timestampsSv = generateScheduledTimes(config, dup.eligible.length, scheduleInfo.countsPerDay);
        actionsSv = dup.eligible.map((acct, j) => ({
            ig_username: soleIgSchSv,
            type: 'story_view',
            payload: {
                ...acct,
                likeWhenWatchingStory: likeWhenWatchingStory
            },
            scheduledTime: timestampsSv[j],
            repeat: 'none'
        }));
        acctsStampedAfterSv = dup.eligible;
    }

    const result = await scheduleBatch(actionsSv, { progressLabel: config.batchProgressLabel });
    printMessage(gbGetMessage('LogBatchScheduledViewStories', [String(result.succeeded), (result.succeeded === 1 ? 'y' : 'ies'), (result.failed ? ` (${result.failed} failed)` : '')]));
    onActionsScheduled(acctsStampedAfterSv);
}


async function scheduleRemoveOrBlockFromAcctsQueue() {
    const isBlock = document.getElementById('radioBlock').checked === true;
    const actionType = isBlock ? 'block' : 'remove_follower';
    const actionLabel = isBlock ? 'block' : 'remove follower';

    // First pass: collect eligible accounts
    const eligibleAccts = [];
    for (var i = 0; i < acctsQueue.length; i++) {
        var acct = acctsQueue[i];
        let removable = true;

        if (isBlacklisted(acct)) {
            outputMessage(gbGetMessage('LogBlacklistedSkipping', [acct.username]));
            addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
            acctsProcessed.push(acct);
            continue;
        }

        if (containsObject(acct, acctsWhiteList) === true) {
            outputMessage(gbGetMessage('LogWhitelistedSkipping', [acct.username]));
            addStamp(acct.id, 'stamp-div-grey', stamp('StampWhitelisted'));
            acctsProcessed.push(acct);
            continue;
        }

        if (gblOptions.dontRemoveOrBlockFilters == true) {
            const met = await filterCriteriaMetForRemoveOrBlock(acct);
            if (met === false) {
                removable = false;
            }
        }

        if (removable === false) {
            acctsProcessed.push(acct);
            outputMessage(gbGetMessage('LogSkippedMatchesFilters', [acct.username]));
            if (acct.assumedDeleted) {
                addStamp(acct.id, 'stamp-div-red', stamp('Stamp404'));
            } else {
                addStamp(acct.id, 'stamp-div-grey', stamp('StampMatchesFilters'));
            }
            continue;
        }

        eligibleAccts.push(acct);
    }

    if (eligibleAccts.length === 0) {
        printMessage(gbGetMessage('LogNoEligibleScheduleFor', [actionLabel]));
        return;
    }

    // Show scheduling config dialog
    const scheduleInfo = await getExistingScheduleInfo();
    const choice = await showSchedulingConfigDialog(actionLabel, eligibleAccts.length, scheduleInfo.maxScheduledTime, scheduleInfo.avgPendingPerDay);
    if (!choice) return; // user cancelled

    const viewerIgSchRb = growbotGetViewerIgUsername();
    const dup = choice.mode !== 'schedule'
        ? growbotFilterQueueDuplicates(actionType, eligibleAccts, scheduleInfo.pendingKeys, viewerIgSchRb)
        : growbotFilterQueueDuplicatesMultiExecutor(actionType, eligibleAccts, scheduleInfo.pendingKeys, choice.schedulingCheckedExecutorNormals || []);
    if (dup.skipped > 0) {
        printMessage(gbGetMessage('LogSkippedDuplicateInPending', [String(dup.skipped)]));
    }
    if (dup.eligible.length === 0) {
        printMessage(gbGetMessage('LogNoLeftAfterRemovingDuplicates'));
        return;
    }

    if (choice.mode === 'runNow') {
        const timestamps = growbotGenerateRunNowSequentialTimestamps(dup.eligible.length);
        const actions = dup.eligible.map((acct, j) => ({
            ig_username: user.viewer.username,
            type: actionType,
            payload: acct,
            scheduledTime: timestamps[j],
            repeat: 'none'
        }));
        const result = await scheduleBatch(actions, { progressLabel: choice.batchProgressLabel || 'Preparing to run' });
        printMessage(gbGetMessage('LogBatchScheduledActions', [String(result.succeeded), actionLabel, (result.failed ? ` (${result.failed} failed)` : '')]));
        onActionsScheduled(dup.eligible, { skipTabSwitch: true, skipScheduledStamp: true });
        return;
    }

    const config = choice;
    let IgSlotsSchRb = choice.schedulingIgSlotPlan || [];
    if (choice.schedulingIgQuotaMode === 'even') {
        IgSlotsSchRb = growbotApplyEvenSplitToSlotPlan(IgSlotsSchRb, dup.eligible.length);
    }
    const checkedExecNormSchRb = choice.schedulingCheckedExecutorNormals || [];
    const useMultiExecutorsSchRb = checkedExecNormSchRb.length >= 2;
    /** @type {Array<{ ig_username: string, type: string, payload: *, scheduledTime: number, repeat: string }>} */
    let actionsRb;
    /** @type {Array<{ id?: * }>} */
    let acctsStampedAfterRb;

    if (useMultiExecutorsSchRb) {
        const consumeSchRb = choice.multiAccountConsumeMode === 'concurrent' ? 'concurrent' : 'sequential';
        const allocRb = growbotAllocateEligibleAcrossIgAccounts(actionType, dup.eligible, scheduleInfo.pendingKeys, IgSlotsSchRb, consumeSchRb);
        if (allocRb.skippedDuplicateAgainstPending > 0) {
            printMessage(gbGetMessage('LogSkippedDuplicateAcrossIgAccts', [String(allocRb.skippedDuplicateAgainstPending)]));
        }
        const leftoverRowsRb = dup.eligible.length - allocRb.assignments.length;
        if (leftoverRowsRb > 0) {
            printMessage(gbGetMessage('LogAccountsNotScheduledLeftover', [String(leftoverRowsRb)]));
        }
        const timestampsMzRb = generateScheduledTimes(config, allocRb.assignments.length, scheduleInfo.countsPerDay);
        actionsRb = allocRb.assignments.map((rowR, j) => ({
            ig_username: rowR.ig_username,
            type: actionType,
            payload: rowR.acct,
            scheduledTime: timestampsMzRb[j],
            repeat: 'none'
        }));
        acctsStampedAfterRb = allocRb.assignments.map(function (rr) { return rr.acct; });
    } else {
        const soleIgSchRb = growbotSchedulingFirstCheckedIgUsername(IgSlotsSchRb) || viewerIgSchRb || user.viewer.username;
        const timestampsRb = generateScheduledTimes(config, dup.eligible.length, scheduleInfo.countsPerDay);
        actionsRb = dup.eligible.map((acct, j) => ({
            ig_username: soleIgSchRb,
            type: actionType,
            payload: acct,
            scheduledTime: timestampsRb[j],
            repeat: 'none'
        }));
        acctsStampedAfterRb = dup.eligible;
    }

    const result = await scheduleBatch(actionsRb, { progressLabel: config.batchProgressLabel });
    printMessage(gbGetMessage('LogBatchScheduledActions', [String(result.succeeded), actionLabel, (result.failed ? ` (${result.failed} failed)` : '')]));
    onActionsScheduled(acctsStampedAfterRb);

}


function ajaxRemoveOrBlockAcct(acct) {
    if (gblOptions.autoSaveQueue == true) {
        saveQueueToStorage();
    }

    var promises = [];
    let removable = true;

    var waitTime = getRandomizedTime(gblOptions.timeDelayAfterSkip);

    if (typeof acct == 'undefined') {
        noAcctsLeft();
        return false;
    }

    if (isBlacklisted(acct)) {
        outputMessage(gbGetMessage('LogBlacklistedSkipping', [acct.username]));
        addStamp(acct.id, 'stamp-div-grey', stamp('StampBlacklisted'));
        acctsProcessed.push(acct);
        setTimeout(ajaxRemoveOrBlockAll, 1);
        return false;
    }

    if (containsObject(acct, acctsWhiteList) == true) {
        outputMessage(gbGetMessage('LogWhitelistedSkipping', [acct.username]));
        addStamp(acct.id, 'stamp-div-grey', stamp('StampWhitelisted'));
        acctsProcessed.push(acct);
        setTimeout(ajaxRemoveOrBlockAll, 1);
        return false;
    }

    if (gblOptions.dontRemoveOrBlockFilters == true) {
        promises.push(filterCriteriaMetForRemoveOrBlock(acct).then((met) => {
            if (met == false) {
                removable = false;
            }
        }));
    }

    Promise.all(promises).then(function () {

        var removeOrBlockEndpoint = '/remove_follower/';
        var removeOrBlockString = 'Remove';
        var removedOrBlockedString = gbGetMessage('ActionRemovedLabel');


        if (document.getElementById('radioBlock').checked === true) {
            removeOrBlockEndpoint = '/block/';
            removeOrBlockString = 'Block'
            removedOrBlockedString = gbGetMessage('ActionBlockedLabel');
        }

        if (removable === false) {
            acctsProcessed.push(acct);

            outputMessage(gbGetMessage('LogSkippedMatchesFilters', [acct.username]));
            addStamp(acct.id, 'stamp-div-grey', stamp('StampMatchesFilters'));


            if (noAcctsLeft()) {
                return false;
            } else {
                outputMessage(gbGetMessage('LogWaitingSecondsRemoveOrBlockNext', [String(waitTime / 1000), removeOrBlockString, acctsQueue[acctsQueue.length - 1].username]));
                timeoutsQueue.push(setTimeout(ajaxRemoveOrBlockAll, waitTime));
                return false;
            }
        }

        waitTime = getRandomizedTime(gblOptions.timeDelay);

        $.ajax({
            url: 'https://www.instagram.com/web/friendships/' + acct.id + removeOrBlockEndpoint,
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                xhr.setRequestHeader('x-asbd-id', '129477');
                xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            },
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function () {
                acctsProcessed.push(acct);
                actionsTaken++;
                addStamp(acct.id, 'stamp-div-green', removedOrBlockedString);

                outputMessage(gbGetMessage('LogRemovedOrBlockedProgress', [removedOrBlockedString, acct.username, acct.id, String(acctsProcessed.length), String(acctsQueue.length)]));

                if (noAcctsLeft()) {
                    return false;
                } else {
                    outputMessage(gbGetMessage('LogWaitingSecondsRemoveOrBlockNext', [String(waitTime / 1000), removeOrBlockString, acctsQueue[acctsQueue.length - 1].username]));
                    timeoutsQueue.push(setTimeout(ajaxRemoveOrBlockAll, waitTime));
                }

            })
            .fail(function (data) {
                acctsQueue.push(acct);
                if (data.status == 403) {
                    printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(ajaxRemoveOrBlockAll, gblOptions.timeDelayAfterSoftRateLimit));
                } else if (data.status == 400) {
                    printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
                    timeoutsQueue.push(setTimeout(ajaxRemoveOrBlockAll, gblOptions.timeDelayAfterHardRateLimit));
                } else if (data.status == 429) {
                    printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(ajaxRemoveOrBlockAll, gblOptions.timeDelayAfter429RateLimit));
                } else {
                    outputMessage(gbGetMessage('LogGenericStatusError', [String(data.status)]));
                    timeoutsQueue.push(setTimeout(ajaxRemoveOrBlockAll, 5000));
                }
            })
    });

}

function noAcctsLeft() {
    if (acctsQueue.length === 0) {
        outputMessage(gbGetMessage('LogNoAccountsLeft'));
        $('#btnProcessQueue').removeClass('pulsing');
        return true;
    }
    return false;
}

function injectIcon() {
    var imgURL = chrome.runtime.getURL("icon_48.png");

    $('#instabotIcon').remove();

    $('body').prepend('<div id="instabotIcon" title="Hide or Show Growbot (Alt+G or Alt+Esc)"></div>');

    $('#instabotIcon').css({
        'top': '0px',
        'right': '0px',
        'background-image': 'url("' + imgURL + '")'
    }).click(toggleControlsDiv);
}

function injectVersionNumber() {
    document.getElementById('igBotExtensionVersion').textContent = chrome.runtime.getManifest().version;
    document.getElementById('h1GrowbotHeading').textContent = gbGetMessage('GrowbotHeadingWithVersion', [chrome.runtime.getManifest().version]);
}

function hideControlsDiv(save) {

    $('#igBotInjectedContainer').hide();
    shakeInstabotIcon();

    if (save && save == false) return true;

    saveHiddenStatus(true);
}

function shakeInstabotIcon() {
    $('#instabotIcon').shake(50, 2, 8);
}

function toggleControlsDiv() {
    $('#igBotInjectedContainer').toggle({
        effect: "scale",
        direction: "both",
        origin: ["top", "center"],
        complete: function () {
            setTimeout(function () {
                var isVisible = $('#igBotInjectedContainer').is(":visible");
                saveHiddenStatus(!isVisible);
            }, 100);
        }
    });
}

function openControlsDiv() {
    var isVisible = $('#igBotInjectedContainer').is(":visible");
    if (isVisible == false) {
        toggleControlsDiv();
    }
}

function injectControlsDiv() {

    if (shouldLoadGrowbotOnThisPage() == false) return false;

    $('#igBotInjectedContainer').remove();

    $.get(chrome.runtime.getURL('growbot.html'), function (data) {
        $('body').prepend($.parseHTML(data));
        buildLanguageOptions();
        buildGenderCountryOptions();

        chrome.storage.local.get("growbotLog", function (data) {
            if (typeof data.growbotLog != 'undefined') {
                var logFromStorage = data.growbotLog;
                var fakeConsole = document.getElementById('txtConsole');
                fakeConsole.textContent = logFromStorage + '\n\n';
                fakeConsole.scrollTop = fakeConsole.scrollHeight;
                includeLogInMailToLinks();
            }
        });


        loadOptions();
        loadWhiteList();
        loadBlackList();
        loadPreviousAttempts();
        injectVersionNumber();
        initGrowbotEmbedBridge();


        ready(igExternalVars.qsForConvenienceButtons, function (element) {
            return addNewConvenienceLinks(element);
        });
        ready(igExternalVars.qsForConvenienceButtonsProfile, function (element) {
            return addNewConvenienceLinks(element, {
                isProfile: true
            });
        });
        setTimeout(function () {
            ensureProfileConvenienceLinks();
        }, 500);
        getHiddenStatus(hiddenStatusCallback);


        setTimeout(function () {
            if (gblOptions.loadQueueOnStartup == true) {
                loadQueueFromLocal();
            }
        }, 1000);

        growbotApplyFirefoxIframeFallback();
        localizeExtension();

    });
}

function localizeExtension() {
    $('#igBotInjectedContainer [localeMessage]').each(function () {
        var key = $(this).attr('localeMessage');
        var localeMessage = gbGetMessage(key);
        if (localeMessage.length > 0) {
            var tag = (this.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea') {
                $(this).attr('placeholder', localeMessage);
            } else if ($(this).find('.hiddenHover, input, select, textarea').length > 0) {
                // Parent holds dropdown menus or form controls; label text uses a child span.
            } else {
                $(this).text(localeMessage);
            }
        }
    });

    $('#igBotInjectedContainer [localeTitle]').each(function () {
        var localeTitle = gbGetMessage($(this).attr('localeTitle'));
        if (localeTitle && localeTitle.length > 0) {
            $(this).attr('title', localeTitle);
        }
    });

    if (resolveCurrentPageUsernameForUi() != '') {
        setCurrentPageUsername();
    }

    $('#igBotInjectedContainer [localeReplaceString]').each(function () {
        $(this).text($(this).text().replace($(this).attr('localeReplaceString'), gbGetMessage($(this).attr('localeReplaceString').replace(/ /g, '_'))));
    });
}

function stamp(key) {
    var msg = gbGetMessage(key);
    return msg && msg.length > 0 ? msg : key;
}

function buildWizardScheduleHeading(numActions, actionLabel) {
    var plural = numActions !== 1 ? 's' : '';
    return '<b>' + gbGetMessage('WizardQuestionStep1', [String(numActions), actionLabel, plural]) + '</b>';
}

function buildWizardPendingHint(avgPendingPerDay) {
    if (avgPendingPerDay != null && isFinite(avgPendingPerDay)) {
        return '<br><br><i>' + gbGetMessage('WizardCurrentPendingHint', [avgPendingPerDay.toFixed(1)]) + '</i>';
    }
    return '';
}

function buildMessagesJson() {
    var jsonbuilder = '';

    $('#igBotInjectedContainer [localeMessage]').each(function () {
        var titlestr = '';
        if ($(this).attr('title')) {
            titlestr = ', "title": "' + $(this).attr('title') + '"';
        }
        var str2add = '"' + $(this).attr('localeMessage') + '": { "message": "' + $(this).html() + '"' + titlestr + '},'
        if (jsonbuilder.indexOf(str2add) == -1) jsonbuilder = jsonbuilder + str2add;

        if ($(this).html() == '') {
            alert($(this).attr('localeMessage'));
        }
    });
}

(function (win) {
    'use strict';

    var listeners = [],
        doc = win.document,
        MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
        observer;

    function ready(selector, fn) {
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn
        });
        if (!observer) {
            // Watch for changes in the document
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true
            });
        }
        // Check if the element is currently in the DOM
        check();
    }

    function check() {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
                element = elements[j];
                // Make sure the callback isn't invoked with the
                // same element more than once
                if (!element.ready) {
                    var result = listener.fn.call(element, element);
                    if (result !== false) {
                        element.ready = true;
                    }
                }
            }
        }
    }

    // Expose `ready`
    win.ready = ready;

})(this);



function ajaxLikeAll() {
    if (noAcctsLeft() == false) {
        getUsersMedia(acctsQueue.shift());
    } else {
        outputMessage(gbGetMessage('LogFinishedLoadingMediaQueue'));
        likeAllMedia();
    }
}

function getUsersMedia(acct) {

    var acctsQueueNextUsername = '';
    removeAcctFromQueueDisplay(acct.id, true);
    if (noAcctsLeft() === false) {
        acctsQueueNextUsername = acctsQueue[0].username;
    }

    if (acct.is_private && acct.is_private == true && acct.followed_by_viewer == false) {
        addStamp(acct.id, 'stamp-div-grey', stamp('StampPrivate'));
        outputMessage(gbGetMessage('LogSkippedAddingMediaPrivate', [acct.username, acct.id]))
        timeoutsQueue.push(setTimeout(ajaxLikeAll, 1));
        return false;
    }

    ajaxLoadUsersMedia('', false, usersMediaLoaded, acct);

    var waitTime = getRandomizedTime(gblOptions.timeDelay);

    addStamp(acct.id, 'stamp-div-green', stamp('StampMediaAdded'));
    outputMessage(gbGetMessage('LogAddingMediaForAccountWait', [acct.username, acct.id, String(waitTime / 1000), acctsQueueNextUsername]));

    timeoutsQueue.push(setTimeout(ajaxLikeAll, waitTime));
}

function initProcessQueue() {
    var todaysdate = new Date();
    maxActionsDelayStartTime = todaysdate.getTime();

    $('#btnProcessQueue').addClass('pulsing');

    if (document.getElementById('radioFollow').checked === true) {
        scheduleFollowingFromAcctsQueue();
    } else if (document.getElementById('radioUnFollow').checked === true) {
        // initUnfollowMyFollowers();
        scheduleUnfollowingFromAcctsQueue();
    } else if (document.getElementById('radioLikeOnly').checked === true) {
        ajaxLikeAll();
    } else if (document.getElementById('radioBlock').checked === true || document.getElementById('radioRemoveFromFollowers').checked === true) {
        scheduleRemoveOrBlockFromAcctsQueue();
    } else if (document.getElementById('radioGetMoreData').checked === true) {

        var safeDelaySeconds = 1;

        if (acctsQueue.length > 100) safeDelaySeconds = 2;
        if (acctsQueue.length > 500) safeDelaySeconds = 3;
        if (acctsQueue.length > 1000) safeDelaySeconds = 4;
        if (acctsQueue.length > 2000) safeDelaySeconds = 5;
        if (acctsQueue.length > 3000) safeDelaySeconds = 6;
        if (acctsQueue.length > 4000) safeDelaySeconds = 10;



        if (acctsQueue.length > 40 && (gblOptions.useTimeDelayAfterAdditionalInfo == false || document.getElementById('texttimeDelayAfterAdditionalInfo').value < safeDelaySeconds)) {

            dialog({
                no: "No",
                yes: "Yes",
                question: "WARNING: <br><br>Low or no delay set after loading data for each account. <br><br> Set " + safeDelaySeconds + " second delay?"
            }, function () {
                document.getElementById('cbuseTimeDelayAfterAdditionalInfo').checked = true;
                document.getElementById('texttimeDelayAfterAdditionalInfo').value = safeDelaySeconds;
                saveOptions();

                populateAllQueueUsersInfo(acctsQueue);

            }, function () {
                populateAllQueueUsersInfo(acctsQueue);
            })
        } else {
            populateAllQueueUsersInfo(acctsQueue);
        }



    } else if (document.getElementById('radioViewStory').checked === true) {
        scheduleViewStoriesFromAcctsQueue();
    }
}

function bindEvents() {

    $('#igBotInjectedContainer #btnProcessQueue').click(initProcessQueue);

    $('#igBotInjectedContainer input[type="checkbox"], #igBotInjectedContainer select, #igBotInjectedContainer input[type="radio"][name="growbotUiColorTheme"]').off('change.checkboxSaveOptions').on('change.checkboxSaveOptions', saveOptions);
    bindGrowbotLocaleEvents();
    $('#igBotInjectedContainer input[type="text"],#igBotInjectedContainer input[type="number"]').bind('keyup input', saveOptions);
    $('details').off('toggle.detailsToggle').on('toggle.detailsToggle', saveOptions);

    $('#igBotInjectedContainer #btnStop,#igBotInjectedContainer #btnStop2').click(function () {
        for (var i = 0; i < timeoutsQueue.length; i++) {
            clearTimeout(timeoutsQueue[i]);
        }

        timeoutsQueue = [];

        $('#igBotInjectedContainer *').removeClass('pulsing');
        outputMessage(gbGetMessage('LogStoppedAllPendingActions'));
    });

    $('#btnLoadAccountsFromMedia').off('click.LoadAccountsFromMedia').on('click.LoadAccountsFromMedia', LoadAccountsFromMedia);

    $('#igBotInjectedContainer #btnLikeFeed').click(ajaxLikeAllPostsFromFeed);

    $('#btnLikeMediaQueue').off('click.likeAllMedia').on('click.likeAllMedia', likeAllMedia);

    $('#btnLoadLocationPosts').off('click.ajaxLoadPostsFromLocation').on('click.ajaxLoadPostsFromLocation', ajaxLoadPostsFromLocation);

    $('#btnLoadPendingRequests').click(ajaxGetPendingFollowRequests);
    $('#btnLoadSavedQueue').click(loadSavedQueue);
    $('#btnViewWhiteList').click(viewWhiteList);
    $('#btnViewBlackList').click(viewBlackList);
    $('#btnViewAttempted').click(viewAttempted);
    $('#btnSaveQueueToStorage').click(saveQueueToStorageAndDisk);
    $('#btnExportQueue').click(exportQueue);


    if (resolveCurrentPageUsernameForUi() != '') {
        setCurrentPageUsername();
    } else {
        $('#igBotInjectedContainer #btnGetAllUsersFollowers,#igBotInjectedContainer #btnGetAllUsersFollowing,#igBotInjectedContainer #btnGetCommenters,#igBotInjectedContainer #btnGetLikers')
            .off('click.setCurrentPageUsername')
            .on('click.setCurrentPageUsername', function () {
                if (resolveCurrentPageUsernameForUi() != '') {
                    setCurrentPageUsername();
                } else {
                    outputMessage(gbGetMessage('LogErrorMustBeOnUserPage'));
                }
            });
    }

    setCurrentPageHashtag();


    $('#btnApplyFilter').off('click.ApplyFilter').on('click.ApplyFilter', function () {
        $('li.tab1').click();
        applyFiltersManually();
    });

    $('#btnFindSubscription').off('click.relinkSubscription').on('click.relinkSubscription', relinkSubscription);

    $('#igBotMediaQueueContainer').off('click.setCurrentList').on('click.setCurrentList', function () {
        currentList = 'mediaToLike';
    });
    $('#igBotQueueContainer').off('click.setCurrentList').on('click.setCurrentList', function () {
        if (currentList != 'acctsWhiteList' && currentList != 'acctsBlackList' && currentList != 'acctsPreviouslyAttempted') {
            currentList = 'acctsQueue';
        }
    });


    $('li.tab5').off('click.scrollLog').on('click.scrollLog', scrollLog);

    $('#btnTrimLog').click(trimLog);

    $('#btnWatchReels').off('click.watchReels').on('click.watchReels', watchReels);

    $('#btnLoadThisPost').off('click.LoadThisPost').on('click.LoadThisPost', loadCurrentPostAsMedia);

    $('#btnLoadCommentersFromMedia').off('click.LoadCommentersFromMedia').on('click.LoadCommentersFromMedia', loadAllCommentersForMediaQueue);
    $('#btnLoadLikersFromMedia').off('click.LoadLikersFromMedia').on('click.LoadLikersFromMedia', loadAllLikersForMediaQueue);

    $('nav ul li').off('click.rememberTab').on('click.rememberTab', function () {
        gblOptions.lastTab = $(this).attr('class');
        saveOptions();
    });

    // Auto-refresh scheduled actions when switching to Actions Queue tab
    $('nav ul li.tab8').off('click.refreshActions').on('click.refreshActions', function () {
        if (typeof window.fetchActions === 'function') {
            window.fetchActions();
        }
    });


    $('#affiliateBanner').off('click.openAffiliateTab').on('click.openAffiliateTab', function () {
        $('li.tab9 label').click();
    });

    $('#aResetQueueColumns').click(function () {
        gblOptions.queueColumns = gbDefaultColumns;
        saveOptions();
        setTimeout(loadOptions, 500);
    })


    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 'g' || e.altKey && e.key === 'Escape') {
            toggleControlsDiv();
        }
    });

    scheduledActionsLoaded();
}



function applyTooltips() {
    $('#igBotInjectedContainer *[title], #instabotIcon').tooltip({
        show: null,
        track: true,
        hide: null
    });

}

async function applyFiltersManually() {

    if (isAdditionalDataFullyLoaded(acctsQueue) === false && acctsQueue.length > 50 && gblOptions.useTimeDelayAfterAdditionalInfo == false) {
        if (!window.confirm(gbGetMessage('AlertApplyFiltersWarnRateLimits'))) {
            return false;
        }
    }

    for (let i = acctsQueue.length - 1; i > -1; i--) {
        if (await filterCriteriaMet(acctsQueue[i]) === false) {
            outputMessage(gbGetMessage('LogRemovedFromQueueNoMatch', [acctsQueue[i].username]));
            addStamp(acctsQueue[i].id, 'stamp-div-green', stamp('StampRemoved'));
            acctsQueue.splice(i, 1);
        }
    }

    outputMessage(gbGetMessage('LogFiltersApplied'));
    if (window.confirm(gbGetMessage('AlertFiltersAppliedSaveQueueNow'))) saveQueueToStorageAndDisk();

}

function getExtendedDataInfoForAccount(a) {

    return new Promise(function (resolve, reject) {

        $.ajax({
            url: 'https://i.instagram.com/api/v1/users/' + a.id + '/info/',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                xhr.setRequestHeader('x-asbd-id', '129477');
                xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            },
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (r) {


                outputMessage(gbGetMessage('LogLoadedUserInfoForEmail', [a.username]));

                for (var key in r.user) {
                    if (a.hasOwnProperty(key) === false) {
                        a[key] = r.user[key];
                    }
                }

                resolve(a);


            }).fail(function (data) {
                if (data.status == 403) {
                    printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getExtendedDataInfoForAccount(a));
                    }, gblOptions.timeDelayAfterSoftRateLimit));
                } else if (data.status == 400) {
                    printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getExtendedDataInfoForAccount(a));
                    }, gblOptions.timeDelayAfterHardRateLimit));
                } else if (data.status == 429) {
                    printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getExtendedDataInfoForAccount(a));
                    }, gblOptions.timeDelayAfter429RateLimit));
                } else if (data.status == 404) {
                    gbl404attempt++;
                    if (gbl404attempt < (gblOptions.retriesAfterAdditionalInfo404 + 1)) {
                        outputMessage(gbGetMessage('Log404PossibleRateLimit', [String(gblOptions.timeDelayAfterAdditionalInfo / 1000), String(gbl404attempt), String(gblOptions.retriesAfterAdditionalInfo404)]));
                        timeoutsQueue.push(setTimeout(function () {
                            resolve(getExtendedDataInfoForAccount(a));
                        }, gblOptions.timeDelayAfterAdditionalInfo));
                        return false;
                    } else {
                        outputMessage(gbGetMessage('Log404AccountAssumedMissing', [a.username, String(gblOptions.retriesAfterAdditionalInfo404)]));
                        a.assumedDeleted = true;
                        gbl404attempt = 0
                        postAdditionalInfoTerminalFailure(
                            404,
                            'additional_info_assumed_deleted_404',
                            'extended_info',
                            a,
                            null
                        );
                        resolve(a);
                    }
                } else {
                    outputMessage(gbGetMessage('LogGenericStatusError', [String(data.status)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getExtendedDataInfoForAccount(a));
                    }, 5000));
                }
                gbl404attempt = 0;
            });
    });
}



// should do this if Last Posted Filter is enabled or Like mode is enabled
function getTimelineForAcct(a) {

    return new Promise(function (resolve, reject) {

        $.ajax({
            url: 'https://www.instagram.com/api/v1/feed/user/' + a.username + '/username/?count=12',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                xhr.setRequestHeader('x-asbd-id', '129477');
                xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            },
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (r) {


                outputMessage(gbGetMessage('LogLoadedPostDataLastPostDate', [a.username]));

                if (!a.edge_owner_to_timeline_media) {
                    a.edge_owner_to_timeline_media = { count: 0, edges: [] };
                }
                a.edge_owner_to_timeline_media.edges = r.items;

                resolve(a);

            }).fail(function (data) {
                if (data.status == 403) {
                    printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getTimelineForAcct(a));
                    }, gblOptions.timeDelayAfterSoftRateLimit));
                } else if (data.status == 400 && isInstagramBusinessSchemaError(data)) {
                    resolve(a);
                } else if (data.status == 400) {
                    printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getTimelineForAcct(a));
                    }, gblOptions.timeDelayAfterHardRateLimit));
                } else if (data.status == 429) {
                    printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getTimelineForAcct(a));
                    }, gblOptions.timeDelayAfter429RateLimit));
                } else if (data.status == 404) {
                    gbl404attempt++;
                    if (gbl404attempt < (gblOptions.retriesAfterAdditionalInfo404 + 1)) {
                        outputMessage(gbGetMessage('Log404PossibleRateLimit', [String(gblOptions.timeDelayAfterAdditionalInfo / 1000), String(gbl404attempt), String(gblOptions.retriesAfterAdditionalInfo404)]));
                        timeoutsQueue.push(setTimeout(function () {
                            resolve(getTimelineForAcct(a));
                        }, gblOptions.timeDelayAfterAdditionalInfo));
                        return false;
                    } else {
                        outputMessage(gbGetMessage('Log404AccountAssumedMissing', [a.username, String(gblOptions.retriesAfterAdditionalInfo404)]));
                        a.assumedDeleted = true;
                        gbl404attempt = 0
                        postAdditionalInfoTerminalFailure(
                            404,
                            'additional_info_assumed_deleted_404',
                            'timeline',
                            a,
                            null
                        );
                        resolve(a);
                    }
                } else {
                    outputMessage(gbGetMessage('LogGenericStatusError', [String(data.status)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getTimelineForAcct(a));
                    }, 5000));
                }
                gbl404attempt = 0;
            });
    });
}


// Shared post-processing for a freshly fetched account profile object `u`: merge its fields into
// the queue account `a`, append derived data (ratio, last-post date, extended data, gender), log,
// and resolve. Used by both the normal web_profile_info path and the business-profile backup path.
async function finalizeAdditionalDataForAcct(a, u, resolve) {
    for (var key in u) {
        a[key] = u[key];
    }

    a = appendFollowersRatioToAcct(a);
    a = await appendLastPostDateToAcct(a);

    if (gblOptions.getExtendedData == true) {
        a = await getExtendedDataInfoForAccount(a);
    }

    a = await appendGenderToAcct(a);

    outputMessage(gbGetMessage('LogLoadedAdditionalDataFor', [a.username]));
    postAdditionalInfoCompleted(a);

    if (gblOptions.useTimeDelayAfterAdditionalInfo == true) {
        printMessage(gbGetMessage('TimeDelay', [(gblOptions.timeDelayAfterAdditionalInfo / 1000)]));
        timeoutsQueue.push(setTimeout(function () {
            resolve(a);
        }, gblOptions.timeDelayAfterAdditionalInfo));
    } else {
        resolve(a);
    }

    gbl404attempt = 0;
}

function getAdditionalDataForAcct(a, urlprefix) {
    if (!urlprefix) urlprefix = urlAcctInfo;
    return new Promise(function (resolve, reject) {

        if (a.edge_followed_by || a["edge_followed_by.count"]) {
            a = appendFollowersRatioToAcct(a);
            (async function () {
                a = await appendLastPostDateToAcct(a);
                a = await appendGenderToAcct(a);
                resolve(a);
            })();
            return a;
        }

        $.ajax({
            url: '' + urlprefix + a.username,
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                xhr.setRequestHeader('x-asbd-id', '129477');
                xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            },
            xhrFields: {
                withCredentials: true
            }
        })
            .done(async function (r) {
                var u = extractJSONfromUserPageHTML(r);

                if (u == false) {
                    gbl404attempt++;
                    if (gbl404attempt < (gblOptions.retriesAfterAdditionalInfo404 + 1)) {
                        outputMessage(gbGetMessage('LogCouldNotLoadMoreInfoRetry', [String(gblOptions.timeDelayAfterAdditionalInfo / 1000), String(gbl404attempt), String(gblOptions.retriesAfterAdditionalInfo404)]));
                        timeoutsQueue.push(setTimeout(function () {
                            resolve(getAdditionalDataForAcct(a));
                        }, gblOptions.timeDelayAfterAdditionalInfo));
                        return false;
                    } else {
                        outputMessage(gbGetMessage('LogCouldNotLoadMoreInfoAssumedMissing', [String(gblOptions.retriesAfterAdditionalInfo404)]));
                        a.assumedDeleted = true;
                        gbl404attempt = 0;
                        postAdditionalInfoTerminalFailure(
                            null,
                            'additional_info_parse_exhausted',
                            'profile_page',
                            a,
                            null
                        );
                        resolve(a);
                        return false;
                    }

                }

                await finalizeAdditionalDataForAcct(a, u, resolve);

            }).fail(function (data) {
                if (data.status == 403) {
                    printMessage(gbGetMessage('RateLimitSoft', [(gblOptions.timeDelayAfterSoftRateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getAdditionalDataForAcct(a));
                    }, gblOptions.timeDelayAfterSoftRateLimit));
                } else if (data.status == 400 && isInstagramBusinessSchemaError(data)) {
                    // web_profile_info can't load business/professional profiles (Instagram
                    // deleted the ig_business_category_subvertical schema asset). This is NOT a
                    // rate limit, so don't back off for an hour — use the doc_id-independent
                    // backup method so the account can still be evaluated against filters.
                    (async function () {
                        try {
                            var backupUser = await getUserInfoFromGraphQL(a.username);
                            await finalizeAdditionalDataForAcct(a, backupUser, resolve);
                        } catch (backupErr) {
                            outputMessage(gbGetMessage('LogCouldNotLoadMoreInfoAssumedMissing', [String(gblOptions.retriesAfterAdditionalInfo404)]));
                            resolve(a);
                        }
                    })();
                } else if (data.status == 400) {
                    printMessage(gbGetMessage('RateLimitHard', [(gblOptions.timeDelayAfterHardRateLimit / 3600000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getAdditionalDataForAcct(a));
                    }, gblOptions.timeDelayAfterHardRateLimit));
                } else if (data.status == 429) {
                    printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getAdditionalDataForAcct(a));
                    }, gblOptions.timeDelayAfter429RateLimit));
                } else if (data.status == 404) {
                    gbl404attempt++;
                    if (gbl404attempt < (gblOptions.retriesAfterAdditionalInfo404 + 1)) {
                        outputMessage(gbGetMessage('Log404PossibleRateLimit', [String(gblOptions.timeDelayAfterAdditionalInfo / 1000), String(gbl404attempt), String(gblOptions.retriesAfterAdditionalInfo404)]));
                        timeoutsQueue.push(setTimeout(function () {
                            resolve(getAdditionalDataForAcct(a));
                        }, gblOptions.timeDelayAfterAdditionalInfo));
                        return false;
                    } else {
                        outputMessage(gbGetMessage('Log404AccountAssumedMissing', [a.username, String(gblOptions.retriesAfterAdditionalInfo404)]));
                        a.assumedDeleted = true;
                        gbl404attempt = 0
                        postAdditionalInfoTerminalFailure(
                            404,
                            'additional_info_assumed_deleted_404',
                            'profile_page',
                            a,
                            null
                        );
                        resolve(a);
                    }
                } else {
                    outputMessage(gbGetMessage('LogGenericStatusError', [String(data.status)]));
                    timeoutsQueue.push(setTimeout(function () {
                        resolve(getAdditionalDataForAcct(a));
                    }, 5000));
                }
                gbl404attempt = 0;
            });
    });
}


async function filterCriteriaMet(acct) {

    var filtered = false;

    if (acct.profile_pic_url && acct.profile_pic_url.indexOf(igExternalVars.emptyProfilePicUrl) > -1 && gblOptions.filterOptions.no_profile_pic == false) {
        outputMessage(gbGetMessage('LogFilteredNoProfilePic', [acct.username]))
        filtered = true;
    }

    if (acct.profile_pic_url && acct.profile_pic_url.indexOf(igExternalVars.emptyProfilePicUrl) == -1 && gblOptions.filterOptions.profile_pic == false) {
        outputMessage(gbGetMessage('LogFilteredHasProfilePic', [acct.username]))
        filtered = true;
    }

    if (acct.followed_by_viewer == true && gblOptions.filterOptions.followed_by_me == false) {
        outputMessage(gbGetMessage('LogFilteredFollowedByYou', [acct.username]))
        filtered = true;
    }

    if (acct.followed_by_viewer == false && gblOptions.filterOptions.non_followed_by_me == false) {
        outputMessage(gbGetMessage('LogFilteredNotFollowedByYou', [acct.username]))
        filtered = true;
    }

    if (acct.is_verified == true && gblOptions.filterOptions.verified == false) {
        outputMessage(gbGetMessage('LogFilteredVerified', [acct.username]))
        filtered = true;
    }
    if (acct.is_verified == false && gblOptions.filterOptions.non_verified == false) {
        outputMessage(gbGetMessage('LogFilteredNotVerified', [acct.username]))
        filtered = true;
    }

    if (filtered === true) {
        return false;
    }

    if (!acct.edge_followed_by) acct = await getAdditionalDataForAcct(acct);

    if (acct.assumedDeleted) {
        outputMessage(gbGetMessage('LogAccountMayHaveBeenDeleted'));
        return false;
    }

    if (acct.edge_followed_by.count < gblOptions.filterOptions.followers[0]) {
        outputMessage(gbGetMessage('LogFilteredTooFewFollowers', [acct.username]))
        filtered = true;
    }
    if (acct.edge_followed_by.count > gblOptions.filterOptions.followers[1]) {
        outputMessage(gbGetMessage('LogFilteredTooManyFollowers', [acct.username]))
        filtered = true;
    }
    if (acct.edge_follow.count < gblOptions.filterOptions.following[0]) {
        outputMessage(gbGetMessage('LogFilteredTooFewFollowing', [acct.username]))
        filtered = true;
    }
    if (acct.edge_follow.count > gblOptions.filterOptions.following[1]) {
        outputMessage(gbGetMessage('LogFilteredTooManyFollowing', [acct.username]))
        filtered = true;
    }
    if (acct.edge_mutual_followed_by.count < gblOptions.filterOptions.mutualFollowedBy[0]) {
        outputMessage(gbGetMessage('LogFilteredTooFewMutual', [acct.username]))
        filtered = true;
    }
    if (acct.edge_mutual_followed_by.count > gblOptions.filterOptions.mutualFollowedBy[1]) {
        outputMessage(gbGetMessage('LogFilteredTooManyMutual', [acct.username]))
        filtered = true;
    }

    if (acct.followRatio < gblOptions.filterOptions.followRatio[0]) {
        outputMessage(gbGetMessage('LogFilteredFollowRatioTooLow', [acct.username]))
        filtered = true;
    }
    if (acct.followRatio > gblOptions.filterOptions.followRatio[1]) {
        outputMessage(gbGetMessage('LogFilteredFollowRatioTooHigh', [acct.username]))
        filtered = true;
    }
    if (acct.edge_owner_to_timeline_media.count < gblOptions.filterOptions.posts[0]) {
        outputMessage(gbGetMessage('LogFilteredTooFewPosts', [acct.username]))
        filtered = true;
    }
    if (acct.edge_owner_to_timeline_media.count > gblOptions.filterOptions.posts[1]) {
        outputMessage(gbGetMessage('LogFilteredTooManyPosts', [acct.username]))
        filtered = true;
    }
    if (acct.lastPostDateInDays < gblOptions.filterOptions.lastPosted[0]) {
        outputMessage(gbGetMessage('LogFilteredPostedTooRecently', [acct.username]))
        filtered = true;
    }

    // data doesn't exit properly for private accounts, so skip this filter if account is private
    if (acct.lastPostDateInDays > gblOptions.filterOptions.lastPosted[1] && (acct.is_private == false || acct.followed_by_viewer == true)) {
        outputMessage(gbGetMessage('LogFilteredPostedTooLongAgo', [acct.username]))
        filtered = true;
    }
    if (acct.is_private == true && gblOptions.filterOptions.private == false) {
        outputMessage(gbGetMessage('LogFilteredPrivate', [acct.username]))
        filtered = true;
    }
    if (acct.is_private == false && gblOptions.filterOptions.non_private == false) {
        outputMessage(gbGetMessage('LogFilteredPublic', [acct.username]))
        filtered = true;
    }

    if (acct.follows_viewer == true && gblOptions.filterOptions.follows_me == false) {
        outputMessage(gbGetMessage('LogFilteredAccountFollowsYou', [acct.username]))
        filtered = true;
    }
    if (acct.follows_viewer == false && gblOptions.filterOptions.non_follows_me == false) {
        outputMessage(gbGetMessage('LogFilteredDoesNotFollowYou', [acct.username]))
        filtered = true;
    }
    if (acct.is_business_account == true && gblOptions.filterOptions.is_business_account == false) {
        outputMessage(gbGetMessage('LogFilteredBusiness', [acct.username]))
        filtered = true;
    }
    if (acct.is_business_account == false && gblOptions.filterOptions.non_is_business_account == false) {
        outputMessage(gbGetMessage('LogFilteredNotBusiness', [acct.username]))
        filtered = true;
    }
    if (acct.is_joined_recently == true && gblOptions.filterOptions.is_joined_recently == false) {
        outputMessage(gbGetMessage('LogFilteredJoinedRecently', [acct.username]))
        filtered = true;
    }
    if (acct.is_joined_recently == false && gblOptions.filterOptions.non_is_joined_recently == false) {
        outputMessage(gbGetMessage('LogFilteredNotJoinedRecently', [acct.username]))
        filtered = true;
    }

    if (gblOptions.filterOptions.bio_contains == true) {
        var bioContains = false;

        if (acct.biography) {
            var bioContainsStrings = gblOptions.filterOptions.bio_contains_text.split(',');
            for (var i = 0; i < bioContainsStrings.length; i++) {
                if (acct.biography.toLowerCase().indexOf(bioContainsStrings[i].toLowerCase()) > -1) {
                    bioContains = true;
                }
            }
        }

        if (bioContains == false) {
            filtered = true;
            outputMessage(gbGetMessage('LogFilteredBioDoesNotContain', [acct.username, gblOptions.filterOptions.bio_contains_text]));
        }
    }

    if (gblOptions.filterOptions.bio_not_contains == true) {
        var bioContains = false;

        if (acct.biography) {
            var bioContainsStrings = gblOptions.filterOptions.bio_not_contains_text.split(',');
            for (var i = 0; i < bioContainsStrings.length; i++) {
                if (acct.biography.toLowerCase().indexOf(bioContainsStrings[i].toLowerCase()) > -1) {
                    bioContains = true;
                    outputMessage(gbGetMessage('LogFilteredBioContains', [acct.username, bioContainsStrings[i].toLowerCase()]));
                }
            }
        }

        if (bioContains == true) {
            filtered = true;
        }
    }


    if (gblOptions.filterOptions.external_url_contains == true) {
        var externalUrlContains = false;

        if (acct.external_url) {
            var externalUrlContainsStrings = gblOptions.filterOptions.external_url_contains_text.split(',');
            for (var i = 0; i < externalUrlContainsStrings.length; i++) {
                if (acct.external_url.toLowerCase().indexOf(externalUrlContainsStrings[i].toLowerCase()) > -1) {
                    externalUrlContains = true;
                }
            }
        }

        if (externalUrlContains == false) {
            filtered = true;
            outputMessage(gbGetMessage('LogFilteredExternalUrlDoesNotContain', [acct.username, gblOptions.filterOptions.external_url_contains_text]));
        }
    }

    if (gblOptions.filterOptions.external_url_not_contains == true) {
        var externalUrlContains = false;

        if (acct.external_url) {
            var externalUrlNotContainsStrings = gblOptions.filterOptions.external_url_not_contains_text.split(',');
            for (var i = 0; i < externalUrlNotContainsStrings.length; i++) {
                if (acct.external_url.toLowerCase().indexOf(externalUrlNotContainsStrings[i].toLowerCase()) > -1) {
                    externalUrlContains = true;
                    outputMessage(gbGetMessage('LogFilteredExternalUrlContains', [acct.username, externalUrlNotContainsStrings[i].toLowerCase()]));
                }
            }
        }

        if (externalUrlContains == true) {
            filtered = true;
        }
    }

    if (gblOptions.filterOptions.business_category_name_contains == true) {
        var BusinessCategoryNameContains = false;

        if (acct.business_category_name) {
            var businessCategoryNameContainsStrings = gblOptions.filterOptions.business_category_name_contains_text.split(',');
            for (var i = 0; i < businessCategoryNameContainsStrings.length; i++) {
                if (acct.business_category_name.toLowerCase().indexOf(businessCategoryNameContainsStrings[i].toLowerCase()) > -1) {
                    BusinessCategoryNameContains = true;
                }
            }
        }

        if (BusinessCategoryNameContains == false) {
            filtered = true;
            outputMessage(gbGetMessage('LogFilteredBusinessCategoryDoesNotContain', [acct.username, gblOptions.filterOptions.business_category_name_contains_text]));
        }
    }

    if (gblOptions.filterOptions.business_category_name_not_contains == true) {
        var BusinessCategoryNameContains = false;

        if (acct.business_category_name) {
            var businessCategoryNameContainsStrings = gblOptions.filterOptions.business_category_name_not_contains_text.split(',');
            for (var i = 0; i < businessCategoryNameContainsStrings.length; i++) {
                if (acct.business_category_name.toLowerCase().indexOf(businessCategoryNameContainsStrings[i].toLowerCase()) > -1) {
                    BusinessCategoryNameContains = true;
                    outputMessage(gbGetMessage('LogFilteredBusinessCategoryContains', [acct.username, businessCategoryNameContainsStrings[i].toLowerCase()]));
                }
            }
        }

        if (BusinessCategoryNameContains == true) {
            filtered = true;
        }
    }


    if (filtered === true) {
        return false;
    } else {
        return true;
    }

}

async function filterCriteriaMetForUnfollowing(acct) {

    if (gblOptions.unFollowFresh === false || gblOptions.dontUnFollowNonGrowbot === true || gblOptions.unFollowIfOld === true) {
        var acctFromStorage = alreadyAttempted(acct);

        if (gblOptions.dontUnFollowNonGrowbot === true && acctFromStorage === false) {
            outputMessage(gbGetMessage('LogNonGrowbotSkipping', [acct.username]));
            addStamp(acct.id, 'stamp-div-grey', stamp('StampNonGrowbot'));
            return false;
        }

        var timeSinceFollowed = today - acctFromStorage.followAttemptDate;

        if (acctFromStorage != false && acctFromStorage.followAttemptDate && gblOptions.unFollowFresh == false && timeSinceFollowed < gblOptions.unFollowDelay) {
            outputMessage(gbGetMessage('LogFollowedTooRecentlyToUnfollow', [acct.username, millisecondsToHumanReadable(timeSinceFollowed, true)]));
            addStamp(acct.id, 'stamp-div-grey', stamp('StampTooRecent'));
            return false;
        }
    }

    if (gblOptions.dontUnFollowFilters === true) {

        var filtered = false;

        if (acct.profile_pic_url.indexOf(igExternalVars.emptyProfilePicUrl) > -1 && gblOptions.filterOptions.no_profile_pic == false) {
            outputMessage(gbGetMessage('LogFilteredNoProfilePic', [acct.username]))
            filtered = true;
        }

        if (acct.profile_pic_url.indexOf(igExternalVars.emptyProfilePicUrl) == -1 && gblOptions.filterOptions.profile_pic == false) {
            outputMessage(gbGetMessage('LogFilteredHasProfilePic', [acct.username]))
            filtered = true;
        }

        if (acct.is_verified == true && gblOptions.filterOptions.verified == false) {
            outputMessage(gbGetMessage('LogFilteredVerified', [acct.username]))
            filtered = true;
        }
        if (acct.is_verified == false && gblOptions.filterOptions.non_verified == false) {
            outputMessage(gbGetMessage('LogFilteredNotVerified', [acct.username]))
            filtered = true;
        }
    }


    if (!acct.edge_followed_by) acct = await getAdditionalDataForAcct(acct);

    if (gblOptions.dontUnFollowFollowers === true) {
        if (acct.follows_viewer == true) {
            if (gblOptions.unFollowIfOld == true && timeSinceFollowed > gblOptions.unFollowIfOlderThan) {
                outputMessage(gbGetMessage('LogFollowedLongAgoOkToUnfollow', [acct.username, String(millisecondsToHumanReadable(gblOptions.unFollowIfOlderThan, false).days)]))
                return true;
            } else {
                outputMessage(gbGetMessage('LogIsFollowerSkipping', [acct.username]));
                addStamp(acct.id, 'stamp-div-grey', stamp('StampFollowsYou'));
                return false;
            }
        }
    }


    if (acct.assumedDeleted) return false;

    if (gblOptions.dontUnFollowFilters === true) {

        if (acct.edge_followed_by.count < gblOptions.filterOptions.followers[0]) {
            outputMessage(gbGetMessage('LogFilteredTooFewFollowers', [acct.username]))
            filtered = true;
        }
        if (acct.edge_followed_by.count > gblOptions.filterOptions.followers[1]) {
            outputMessage(gbGetMessage('LogFilteredTooManyFollowers', [acct.username]))
            filtered = true;
        }
        if (acct.edge_follow.count < gblOptions.filterOptions.following[0]) {
            outputMessage(gbGetMessage('LogFilteredTooFewFollowing', [acct.username]))
            filtered = true;
        }
        if (acct.edge_follow.count > gblOptions.filterOptions.following[1]) {
            outputMessage(gbGetMessage('LogFilteredTooManyFollowing', [acct.username]))
            filtered = true;
        }
        if (acct.edge_mutual_followed_by.count < gblOptions.filterOptions.mutualFollowedBy[0]) {
            outputMessage(gbGetMessage('LogFilteredTooFewMutual', [acct.username]))
            filtered = true;
        }
        if (acct.edge_mutual_followed_by.count > gblOptions.filterOptions.mutualFollowedBy[1]) {
            outputMessage(gbGetMessage('LogFilteredTooManyMutual', [acct.username]))
            filtered = true;
        }
        if (acct.followRatio < gblOptions.filterOptions.followRatio[0]) {
            outputMessage(gbGetMessage('LogFilteredFollowRatioTooLow', [acct.username]))
            filtered = true;
        }
        if (acct.followRatio > gblOptions.filterOptions.followRatio[1]) {
            outputMessage(gbGetMessage('LogFilteredFollowRatioTooHigh', [acct.username]))
            filtered = true;
        }
        if (acct.edge_owner_to_timeline_media.count < gblOptions.filterOptions.posts[0]) {
            outputMessage(gbGetMessage('LogFilteredTooFewPosts', [acct.username]))
            filtered = true;
        }
        if (acct.edge_owner_to_timeline_media.count > gblOptions.filterOptions.posts[1]) {
            outputMessage(gbGetMessage('LogFilteredTooManyPosts', [acct.username]))
            filtered = true;
        }
        if (acct.lastPostDateInDays < gblOptions.filterOptions.lastPosted[0]) {
            outputMessage(gbGetMessage('LogFilteredPostedTooRecently', [acct.username]))
            filtered = true;
        }
        if (acct.lastPostDateInDays > gblOptions.filterOptions.lastPosted[1] && (acct.is_private == false || acct.followed_by_viewer == true)) {
            outputMessage(gbGetMessage('LogFilteredPostedTooLongAgo', [acct.username]))
            filtered = true;
        }
        if (acct.is_private == true && gblOptions.filterOptions.private == false) {
            outputMessage(gbGetMessage('LogFilteredPrivate', [acct.username]))
            filtered = true;
        }
        if (acct.is_private == false && gblOptions.filterOptions.non_private == false) {
            outputMessage(gbGetMessage('LogFilteredPublic', [acct.username]))
            filtered = true;
        }
        if (acct.is_business_account == true && gblOptions.filterOptions.is_business_account == false) {
            outputMessage(gbGetMessage('LogFilteredBusiness', [acct.username]))
            filtered = true;
        }
        if (acct.is_business_account == false && gblOptions.filterOptions.non_is_business_account == false) {
            outputMessage(gbGetMessage('LogFilteredNotBusiness', [acct.username]))
            filtered = true;
        }
        if (acct.is_joined_recently == true && gblOptions.filterOptions.is_joined_recently == false) {
            outputMessage(gbGetMessage('LogFilteredJoinedRecently', [acct.username]))
            filtered = true;
        }
        if (acct.is_joined_recently == false && gblOptions.filterOptions.non_is_joined_recently == false) {
            outputMessage(gbGetMessage('LogFilteredNotJoinedRecently', [acct.username]))
            filtered = true;
        }

        if (gblOptions.filterOptions.bio_contains == true) {
            var bioContains = false;

            if (acct.biography) {
                var bioContainsStrings = gblOptions.filterOptions.bio_contains_text.split(',');
                for (var i = 0; i < bioContainsStrings.length; i++) {
                    if (acct.biography.toLowerCase().indexOf(bioContainsStrings[i].toLowerCase()) > -1) {
                        bioContains = true;
                    }
                }
            }

            if (bioContains == false) {
                filtered = true;
                outputMessage(gbGetMessage('LogFilteredBioDoesNotContain', [acct.username, gblOptions.filterOptions.bio_contains_text]));
            }
        }

        if (gblOptions.filterOptions.bio_not_contains == true) {
            var bioContains = false;

            if (acct.biography) {
                var bioContainsStrings = gblOptions.filterOptions.bio_not_contains_text.split(',');
                for (var i = 0; i < bioContainsStrings.length; i++) {
                    if (acct.biography.toLowerCase().indexOf(bioContainsStrings[i].toLowerCase()) > -1) {
                        bioContains = true;
                        outputMessage(gbGetMessage('LogFilteredBioContains', [acct.username, bioContainsStrings[i].toLowerCase()]));
                    }
                }
            }

            if (bioContains == true) {
                filtered = true;
            }
        }


        if (gblOptions.filterOptions.external_url_contains == true) {
            var externalUrlContains = false;

            if (acct.external_url) {
                var externalUrlContainsStrings = gblOptions.filterOptions.external_url_contains_text.split(',');
                for (var i = 0; i < externalUrlContainsStrings.length; i++) {
                    if (acct.external_url.toLowerCase().indexOf(externalUrlContainsStrings[i].toLowerCase()) > -1) {
                        externalUrlContains = true;
                    }
                }
            }

            if (externalUrlContains == false) {
                filtered = true;
                outputMessage(gbGetMessage('LogFilteredExternalUrlDoesNotContain', [acct.username, gblOptions.filterOptions.external_url_contains_text]));
            }
        }

        if (gblOptions.filterOptions.external_url_not_contains == true) {
            var externalUrlContains = false;

            if (acct.external_url) {
                var externalUrlNotContainsStrings = gblOptions.filterOptions.external_url_not_contains_text.split(',');
                for (var i = 0; i < externalUrlNotContainsStrings.length; i++) {
                    if (acct.external_url.toLowerCase().indexOf(externalUrlNotContainsStrings[i].toLowerCase()) > -1) {
                        externalUrlContains = true;
                        outputMessage(gbGetMessage('LogFilteredExternalUrlContains', [acct.username, externalUrlNotContainsStrings[i].toLowerCase()]));
                    }
                }
            }

            if (externalUrlContains == true) {
                filtered = true;
            }
        }


        if (gblOptions.filterOptions.business_category_name_contains == true) {
            var BusinessCategoryNameContains = false;

            if (acct.business_category_name) {
                var businessCategoryNameContainsStrings = gblOptions.filterOptions.business_category_name_contains_text.split(',');
                for (var i = 0; i < businessCategoryNameContainsStrings.length; i++) {
                    if (acct.business_category_name.toLowerCase().indexOf(businessCategoryNameContainsStrings[i].toLowerCase()) > -1) {
                        BusinessCategoryNameContains = true;
                    }
                }
            }

            if (BusinessCategoryNameContains == false) {
                filtered = true;
                outputMessage(gbGetMessage('LogFilteredBusinessCategoryDoesNotContain', [acct.username, gblOptions.filterOptions.business_category_name_contains_text]));
            }
        }

        if (gblOptions.filterOptions.business_category_name_not_contains == true) {
            var BusinessCategoryNameContains = false;

            if (acct.business_category_name) {
                var businessCategoryNameContainsStrings = gblOptions.filterOptions.business_category_name_not_contains_text.split(',');
                for (var i = 0; i < businessCategoryNameContainsStrings.length; i++) {
                    if (acct.business_category_name.toLowerCase().indexOf(businessCategoryNameContainsStrings[i].toLowerCase()) > -1) {
                        BusinessCategoryNameContains = true;
                        outputMessage(gbGetMessage('LogFilteredBusinessCategoryContains', [acct.username, businessCategoryNameContainsStrings[i].toLowerCase()]));
                    }
                }
            }

            if (BusinessCategoryNameContains == true) {
                filtered = true;
            }
        }


    }

    return filtered;

}

async function filterCriteriaMetForRemoveOrBlock(acct) {

    var filtered = false;

    if (acct.profile_pic_url.indexOf(igExternalVars.emptyProfilePicUrl) > -1 && gblOptions.filterOptions.no_profile_pic == false) {
        outputMessage(gbGetMessage('LogFilteredNoProfilePic', [acct.username]))
        filtered = true;
    }

    if (acct.profile_pic_url.indexOf(igExternalVars.emptyProfilePicUrl) == -1 && gblOptions.filterOptions.profile_pic == false) {
        outputMessage(gbGetMessage('LogFilteredHasProfilePic', [acct.username]))
        filtered = true;
    }

    if (acct.followed_by_viewer == true && gblOptions.filterOptions.followed_by_me == false) {
        outputMessage(gbGetMessage('LogFilteredFollowedByYou', [acct.username]))
        filtered = true;
    }

    if (acct.followed_by_viewer == false && gblOptions.filterOptions.non_followed_by_me == false) {
        outputMessage(gbGetMessage('LogFilteredNotFollowedByYou', [acct.username]))
        filtered = true;
    }

    if (acct.is_verified == true && gblOptions.filterOptions.verified == false) {
        outputMessage(gbGetMessage('LogFilteredVerified', [acct.username]))
        filtered = true;
    }
    if (acct.is_verified == false && gblOptions.filterOptions.non_verified == false) {
        outputMessage(gbGetMessage('LogFilteredNotVerified', [acct.username]))
        filtered = true;
    }

    if (!acct.edge_followed_by) acct = await getAdditionalDataForAcct(acct);

    if (acct.assumedDeleted) return false;

    if (acct.edge_followed_by.count < gblOptions.filterOptions.followers[0]) {
        outputMessage(gbGetMessage('LogFilteredTooFewFollowers', [acct.username]))
        filtered = true;
    }
    if (acct.edge_followed_by.count > gblOptions.filterOptions.followers[1]) {
        outputMessage(gbGetMessage('LogFilteredTooManyFollowers', [acct.username]))
        filtered = true;
    }
    if (acct.edge_follow.count < gblOptions.filterOptions.following[0]) {
        outputMessage(gbGetMessage('LogFilteredTooFewFollowing', [acct.username]))
        filtered = true;
    }
    if (acct.edge_follow.count > gblOptions.filterOptions.following[1]) {
        outputMessage(gbGetMessage('LogFilteredTooManyFollowing', [acct.username]))
        filtered = true;
    }
    if (acct.edge_mutual_followed_by.count < gblOptions.filterOptions.mutualFollowedBy[0]) {
        outputMessage(gbGetMessage('LogFilteredTooFewMutual', [acct.username]))
        filtered = true;
    }
    if (acct.edge_mutual_followed_by.count > gblOptions.filterOptions.mutualFollowedBy[1]) {
        outputMessage(gbGetMessage('LogFilteredTooManyMutual', [acct.username]))
        filtered = true;
    }
    if (acct.followRatio < gblOptions.filterOptions.followRatio[0]) {
        outputMessage(gbGetMessage('LogFilteredFollowRatioTooLow', [acct.username]))
        filtered = true;
    }
    if (acct.followRatio > gblOptions.filterOptions.followRatio[1]) {
        outputMessage(gbGetMessage('LogFilteredFollowRatioTooHigh', [acct.username]))
        filtered = true;
    }
    if (acct.edge_owner_to_timeline_media.count < gblOptions.filterOptions.posts[0]) {
        outputMessage(gbGetMessage('LogFilteredTooFewPosts', [acct.username]))
        filtered = true;
    }
    if (acct.edge_owner_to_timeline_media.count > gblOptions.filterOptions.posts[1]) {
        outputMessage(gbGetMessage('LogFilteredTooManyPosts', [acct.username]))
        filtered = true;
    }
    if (acct.lastPostDateInDays < gblOptions.filterOptions.lastPosted[0]) {
        outputMessage(gbGetMessage('LogFilteredPostedTooRecently', [acct.username]))
        filtered = true;
    }
    if (acct.lastPostDateInDays > gblOptions.filterOptions.lastPosted[1] && (acct.is_private == false || acct.followed_by_viewer == true)) {
        outputMessage(gbGetMessage('LogFilteredPostedTooLongAgo', [acct.username]))
        filtered = true;
    }
    if (acct.is_private == true && gblOptions.filterOptions.private == false) {
        outputMessage(gbGetMessage('LogFilteredPrivate', [acct.username]))
        filtered = true;
    }
    if (acct.is_private == false && gblOptions.filterOptions.non_private == false) {
        outputMessage(gbGetMessage('LogFilteredPublic', [acct.username]))
        filtered = true;
    }
    if (acct.is_business_account == true && gblOptions.filterOptions.is_business_account == false) {
        outputMessage(gbGetMessage('LogFilteredBusiness', [acct.username]))
        filtered = true;
    }
    if (acct.is_business_account == false && gblOptions.filterOptions.non_is_business_account == false) {
        outputMessage(gbGetMessage('LogFilteredNotBusiness', [acct.username]))
        filtered = true;
    }
    if (acct.is_joined_recently == true && gblOptions.filterOptions.is_joined_recently == false) {
        outputMessage(gbGetMessage('LogFilteredJoinedRecently', [acct.username]))
        filtered = true;
    }
    if (acct.is_joined_recently == false && gblOptions.filterOptions.non_is_joined_recently == false) {
        outputMessage(gbGetMessage('LogFilteredNotJoinedRecently', [acct.username]))
        filtered = true;
    }

    if (gblOptions.filterOptions.bio_contains == true) {
        var bioContains = false;

        if (acct.biography) {
            var bioContainsStrings = gblOptions.filterOptions.bio_contains_text.split(',');
            for (var i = 0; i < bioContainsStrings.length; i++) {
                if (acct.biography.toLowerCase().indexOf(bioContainsStrings[i].toLowerCase()) > -1) {
                    bioContains = true;
                }
            }
        }

        if (bioContains == false) {
            filtered = true;
            outputMessage(gbGetMessage('LogFilteredBioDoesNotContain', [acct.username, gblOptions.filterOptions.bio_contains_text]));
        }
    }

    if (gblOptions.filterOptions.bio_not_contains == true) {
        var bioContains = false;

        if (acct.biography) {
            var bioContainsStrings = gblOptions.filterOptions.bio_not_contains_text.split(',');
            for (var i = 0; i < bioContainsStrings.length; i++) {
                if (acct.biography.toLowerCase().indexOf(bioContainsStrings[i].toLowerCase()) > -1) {
                    bioContains = true;
                    outputMessage(gbGetMessage('LogFilteredBioContains', [acct.username, bioContainsStrings[i].toLowerCase()]));
                }
            }
        }

        if (bioContains == true) {
            filtered = true;
        }
    }

    if (gblOptions.filterOptions.external_url_contains == true) {
        var externalUrlContains = false;

        if (acct.external_url) {
            var externalUrlContainsStrings = gblOptions.filterOptions.external_url_contains_text.split(',');
            for (var i = 0; i < externalUrlContainsStrings.length; i++) {
                if (acct.external_url.toLowerCase().indexOf(externalUrlContainsStrings[i].toLowerCase()) > -1) {
                    externalUrlContains = true;
                }
            }
        }

        if (externalUrlContains == false) {
            filtered = true;
            outputMessage(gbGetMessage('LogFilteredExternalUrlDoesNotContain', [acct.username, gblOptions.filterOptions.external_url_contains_text]));
        }
    }

    if (gblOptions.filterOptions.external_url_not_contains == true) {
        var externalUrlContains = false;

        if (acct.external_url) {
            var externalUrlContainsStrings = gblOptions.filterOptions.bio_not_contains_text.split(',');
            for (var i = 0; i < bioContainsStrings.length; i++) {
                if (acct.external_url.toLowerCase().indexOf(externalUrlContainsStrings[i].toLowerCase()) > -1) {
                    externalUrlContains = true;
                    outputMessage(gbGetMessage('LogFilteredExternalUrlContainsMatch', [acct.username, externalUrlContainsStrings[i].toLowerCase()]));
                }
            }
        }

        if (externalUrlContains == true) {
            filtered = true;
        }
    }



    if (gblOptions.filterOptions.business_category_name_contains == true) {
        var BusinessCategoryNameContains = false;

        if (acct.business_category_name) {
            var businessCategoryNameContainsStrings = gblOptions.filterOptions.business_category_name_contains_text.split(',');
            for (var i = 0; i < businessCategoryNameContainsStrings.length; i++) {
                if (acct.business_category_name.toLowerCase().indexOf(businessCategoryNameContainsStrings[i].toLowerCase()) > -1) {
                    BusinessCategoryNameContains = true;
                }
            }
        }

        if (BusinessCategoryNameContains == false) {
            filtered = true;
            outputMessage(gbGetMessage('LogFilteredBusinessCategoryDoesNotContain', [acct.username, gblOptions.filterOptions.business_category_name_contains_text]));
        }
    }

    if (gblOptions.filterOptions.business_category_name_not_contains == true) {
        var BusinessCategoryNameContains = false;

        if (acct.business_category_name) {
            var businessCategoryNameContainsStrings = gblOptions.filterOptions.business_category_name_not_contains_text.split(',');
            for (var i = 0; i < businessCategoryNameContainsStrings.length; i++) {
                if (acct.business_category_name.toLowerCase().indexOf(businessCategoryNameContainsStrings[i].toLowerCase()) > -1) {
                    BusinessCategoryNameContains = true;
                    outputMessage(gbGetMessage('LogFilteredBusinessCategoryContains', [acct.username, businessCategoryNameContainsStrings[i].toLowerCase()]));
                }
            }
        }

        if (BusinessCategoryNameContains == true) {
            filtered = true;
        }
    }


    return filtered;

}


function bindNoUiSliders() {

    var sliderElements = ['followersSlider', 'followingSlider', 'followRatioSlider', 'mutualFollowedBySlider', 'postsSlider', 'lastPostedSlider'];

    for (var i = 0; i < sliderElements.length; i++) {

        var currentSlider = document.getElementById(sliderElements[i]);

        //hacky?
        var fromOptions = gblOptions.filterOptions[sliderElements[i].replace('Slider', '')];

        var dFO = defaultFilterOptions[sliderElements[i].replace('Slider', '')];

        if (sliderElements[i] == 'followRatioSlider') {
            noUiSlider.create(currentSlider, {
                start: fromOptions,
                range: {
                    'min': [dFO[0]],
                    '5%': [0],
                    '10%': [0.25],
                    '15%': [0.5],
                    '20%': [0.75],
                    '25%': [1],
                    '30%': [1.25],
                    '35%': [1.5],
                    '40%': [1.75],
                    '45%': [2],
                    '50%': [3],
                    '55%': [4],
                    'max': [dFO[1]]
                },
                //pips: { mode: 'values', values: [-7500, 0, 0.5,.75, 1,1.25,1.5,1.75,2,3,4, 10000], density: 10, stepped: true, format: wNumb({decimals:2}) },
                pips: {
                    mode: 'range',
                    density: 10,
                    stepped: true,
                    format: wNumb({
                        decimals: 2
                    })
                },
                connect: [false, true, false]
            });
        } else if (sliderElements[i] == 'followersSlider' || sliderElements[i] == 'mutualFollowedBySlider') {
            noUiSlider.create(currentSlider, {
                start: fromOptions,
                range: {
                    'min': [dFO[0]],
                    '5%': [10],
                    '20%': [100],
                    '50%': [5000],
                    '70%': [10000],
                    '80%': [100000],
                    '90%': [1000000],
                    'max': [dFO[1]]
                },
                //pips: { mode: 'values', values: [-7500, 0, 0.5,.75, 1,1.25,1.5,1.75,2,3,4, 10000], density: 10, stepped: true, format: wNumb({decimals:2}) },
                pips: {
                    mode: 'range',
                    density: 10,
                    stepped: true
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0
                })
            });

        } else {
            noUiSlider.create(currentSlider, {
                start: fromOptions,
                range: {
                    'min': [dFO[0]],
                    '5%': [10],
                    '20%': [100],
                    'max': [dFO[1]]
                },
                pips: {
                    mode: 'range',
                    density: 5
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0
                })
            });
        }

        currentSlider.noUiSlider.on('set', updateFilterOptions);


        function sp(event) {
            event.stopPropagation();
        }

        function setTooltipInputWidth(input) {
            input.style.width = ((input.value.length + 1) * 6) + 'px';
        }

        function makeTT(i, slider) {
            var tooltip = document.createElement('div'),
                input = document.createElement('input');

            // Add the input to the tooltip
            tooltip.className = 'noUi-tooltip';
            tooltip.appendChild(input);

            // On change, set the slider
            input.addEventListener('change', function () {
                var values = [null, null];
                values[i] = this.value;
                slider.noUiSlider.set(values)
                setTooltipInputWidth(this);
            });

            input.addEventListener('focus', function () {
                $(slider.tooltipInputs[0]).closest('.noUi-origin')[0].style.zIndex = 4;
                $(slider.tooltipInputs[1]).closest('.noUi-origin')[0].style.zIndex = 4;

                $(this).closest('.noUi-origin')[0].style.zIndex = 5;

            })

            // Catch all selections and make sure they don't reach the handle
            input.addEventListener('mousedown', sp);
            input.addEventListener('touchstart', sp);
            input.addEventListener('pointerdown', sp);
            input.addEventListener('MSPointerDown', sp);

            // Find the lower/upper slider handle and insert the tooltip
            slider.querySelector(i ? '.noUi-handle-upper' : '.noUi-handle-lower').appendChild(tooltip);

            return input;
        }

        // An 0/1 indexed array of input elements
        currentSlider.tooltipInputs = [makeTT(0, currentSlider), makeTT(1, currentSlider)];

        // When the slider changes, update the tooltip
        currentSlider.noUiSlider.on('update', function (values, handle) {
            this.target.tooltipInputs[handle].value = values[handle];
            setTooltipInputWidth(this.target.tooltipInputs[handle]);
        });

    }


    function updateFilterOptions() {
        for (var i = 0; i < sliderElements.length; i++) {
            var currentSlider = document.getElementById(sliderElements[i]);
            gblOptions.filterOptions[sliderElements[i].replace('Slider', '')] = currentSlider.noUiSlider.get().map(Number);
        }
        saveOptions();
    }

    function resetFilterSliders() {
        for (var i = 0; i < sliderElements.length; i++) {
            document.getElementById(sliderElements[i]).noUiSlider.reset();
        }
    }


    $('#btnResetFilter').click(resetFilterSliders);

}

function normalizeConvenienceUsername(s) {
    return String(s || '').trim().replace(/^@/, '').toLowerCase();
}

var growbotProfilePathReservedSegments = ['explore', 'stories', 'accounts', 'direct', 'reel', 'p', 'tv', 'tags', 'locations', 'legal', 'about-us'];

function getProfileUsernameFromPath() {
    var parts = window.location.pathname.split('/').filter(function (p) {
        return p.length > 0;
    });
    if (parts.length !== 1) {
        return '';
    }
    if (growbotProfilePathReservedSegments.indexOf(parts[0]) > -1) {
        return '';
    }
    return parts[0];
}

function resolveCurrentPageUsernameForUi() {
    if (currentProfilePage != false && currentProfilePage && currentProfilePage.username) {
        return currentProfilePage.username;
    }
    return getProfileUsernameFromPath();
}

function setCurrentPageUsername() {
    var username = resolveCurrentPageUsernameForUi();
    if (username != '') {
        var subs = [username];
        $('#btnGetAllUsersFollowers')
            .removeClass('inactive')
            .text(gbGetMessage('LoadCurrentFollowers', subs))
            .off('click.ajaxGetAllUsersFollowers click.setCurrentPageUsername')
            .on('click.ajaxGetAllUsersFollowers', ajaxGetAllUsersFollowers);
        $('#btnGetAllUsersFollowing')
            .removeClass('inactive')
            .text(gbGetMessage('LoadCurrentFollowing', subs))
            .off('click.ajaxLoadFollowing click.setCurrentPageUsername')
            .on('click.ajaxLoadFollowing', ajaxLoadFollowing);

        $('#btnGetCommenters').removeClass('inactive')
            .text(gbGetMessage('LoadCommenters', subs))
            .off('click.getCommenters click.setCurrentPageUsername')
            .on('click.getCommenters', ajaxLoadAllUsersCommenters);

        $('#btnGetLikers')
            .removeClass('inactive')
            .text(gbGetMessage('LoadLikers', subs))
            .off('click.getLikers click.setCurrentPageUsername')
            .on('click.getLikers', ajaxLoadAllUsersLikers);

    } else {

        $('#igBotInjectedContainer #btnGetAllUsersFollowers,#igBotInjectedContainer #btnGetAllUsersFollowing,#igBotInjectedContainer #btnGetCommenters,#igBotInjectedContainer #btnGetLikers')
            .off('click.ajaxGetAllUsersFollowers click.ajaxLoadFollowing click.getCommenters click.getLikers click.setCurrentPageUsername')
            .on('click.setCurrentPageUsername', function () {
                if (resolveCurrentPageUsernameForUi() != '') {
                    setCurrentPageUsername();
                } else {
                    outputMessage(gbGetMessage('LogErrorMustBeOnUserPage'));
                }
            })
            .addClass('inactive');
    }
}

function checkUsernameFreshness() {
    if ($(igExternalVars.qsForProfilePageUsername).text() != getCurrentPageUsername()) {
        ajaxGetCurrentPageUserInfo();
        return false;
    }
    return true;
}

function getCurrentPageUsername() {
    if (currentProfilePage != false && currentProfilePage) {
        return currentProfilePage.username;
    } else {
        ajaxGetCurrentPageUserInfo();
        return '';
    }
}

function getQueryParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function shortcodeToInstaID(Shortcode) {
    var char;
    var id = BigInt(0);
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    for (var i = 0; i < Shortcode.length; i++) {
        char = Shortcode[i];
        var mul = BigInt(BigInt(id) * BigInt(64));
        id = BigInt(BigInt(mul) + BigInt(alphabet.indexOf(char)));
    }

    var stringId = id.toString().replace('n', '');

    return stringId;
}


async function loadCurrentPostAsMedia() {

    var url = window.location.href;

    var shorty;

    if (url.indexOf('/p/') > 0) {
        shorty = url.substring(url.indexOf('/p/') + 3, url.length);
    } else if (url.indexOf('/reel/') > 0) {
        shorty = url.substring(url.indexOf('/reel/') + 6, url.length);
    } else {
        printMessage(gbGetMessage('LogErrorMustBeOnPostPage'));
        return false;
    }

    shorty = shorty.substring(0, shorty.indexOf('/'));


    var mediaId = shortcodeToInstaID(shorty);
    if (shorty.length > 15) {
        const response = await fetch(url);
        var HTML_String = await response.text();
        HTML_String = HTML_String.substring(HTML_String.indexOf('instagram://media?id=') + 21, HTML_String.length)
        mediaId = HTML_String.substring(0, HTML_String.indexOf('"'));
    }

    $.ajax({
        url: "https://www.instagram.com/api/v1/media/" + mediaId + "/info/",
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
            xhr.setRequestHeader('x-instagram-ajax', '1010212815');
            xhr.setRequestHeader('x-asbd-id', '129477');
            xhr.setRequestHeader('x-ig-app-id', '936619743392459');
        },
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function (r) {

            if (r && r.items && r.items[0]) {


                $.ajax({
                    url: "https://www.instagram.com/api/v1/media/" + mediaId + "/comments/?can_support_threading=true&permalink_enabled=false",
                    method: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                        xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                        xhr.setRequestHeader('x-asbd-id', '129477');
                        xhr.setRequestHeader('x-ig-app-id', '936619743392459');
                    },
                    xhrFields: {
                        withCredentials: true
                    }
                })
                    .done(function (c) {

                        r.items[0].comments = c.comments;

                        mediaToLike.push(r.items[0]);
                        arrayOfMediaToDiv(mediaToLike, true);
                        printMessage(gbGetMessage('LogLoadedMedia', [shorty]));

                    });



            }

        }).fail(function (f) {
            if (f.status == 429) {
                printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                timeoutsQueue.push(setTimeout(loadCurrentPostAsMedia, gblOptions.timeDelayAfter429RateLimit));
            }
        });


}



async function getUserInfoFromGraphQL(username) {

    var lsd = getInstagramLsdToken();
    var fbDtsg = getInstagramFbDtsg();
    var jazoest = getInstagramJazoest(fbDtsg);
    var actorId = getInstagramActorId();
    var csrf = getCsrfFromCookie();

    if (!lsd || !fbDtsg) {
        await new Promise(function (resolve) { setTimeout(resolve, 1500); });
        lsd = getInstagramLsdToken();
        fbDtsg = getInstagramFbDtsg();
        jazoest = getInstagramJazoest(fbDtsg);
    }

    if (!lsd || !fbDtsg) {
        throw new Error('missing Instagram session tokens (fb_dtsg/lsd) — reload instagram.com and try again');
    }

    async function postGraphql(friendlyName, variables, docId) {
        var body = [
            'av=' + encodeURIComponent(actorId),
            '__d=www',
            '__user=0',
            '__a=1',
            '__comet_req=7',
            'fb_dtsg=' + encodeURIComponent(fbDtsg),
            'jazoest=' + encodeURIComponent(jazoest),
            'lsd=' + encodeURIComponent(lsd),
            'fb_api_caller_class=RelayModern',
            'fb_api_req_friendly_name=' + friendlyName,
            'server_timestamps=true',
            'variables=' + encodeURIComponent(JSON.stringify(variables)),
            'doc_id=' + docId
        ].join('&');

        var response = await fetch("https://www.instagram.com/graphql/query", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded",
                "x-asbd-id": "359341",
                "x-csrftoken": csrf,
                "x-fb-friendly-name": friendlyName,
                "x-fb-lsd": lsd,
                "x-ig-app-id": "936619743392459"
            },
            "referrer": "https://www.instagram.com/" + username + "/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": body,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });

        if (!response.ok) {
            throw new Error('graphql ' + friendlyName + ' HTTP ' + response.status);
        }

        var contentType = response.headers.get('content-type') || '';
        if (contentType.indexOf('json') === -1) {
            throw new Error('graphql ' + friendlyName + ' returned non-JSON response');
        }

        return response.json();
    }

    return fetchInstagramProfileByUsername(username, postGraphql);
}

// Maps the app private API (/users/<id>/info/) user object onto the web_profile_info shape
// that the rest of the extension expects (id, username, edge_followed_by.count, edge_follow.count).
function normalizeAppUserToProfilePage(u, fallbackUsername) {
    var followers = (u.follower_count != null) ? u.follower_count
        : (u.edge_followed_by && u.edge_followed_by.count != null ? u.edge_followed_by.count : 0);
    var following = (u.following_count != null) ? u.following_count
        : (u.edge_follow && u.edge_follow.count != null ? u.edge_follow.count : 0);
    var posts = (u.media_count != null) ? u.media_count
        : (u.edge_owner_to_timeline_media && u.edge_owner_to_timeline_media.count != null ? u.edge_owner_to_timeline_media.count : 0);
    var mutual = (u.mutual_followers_count != null) ? u.mutual_followers_count
        : (u.edge_mutual_followed_by && u.edge_mutual_followed_by.count != null ? u.edge_mutual_followed_by.count : 0);

    u.id = String(u.pk != null ? u.pk : (u.pk_id != null ? u.pk_id : (u.id != null ? u.id : '')));
    if (!u.username) u.username = fallbackUsername;
    u.edge_followed_by = { count: followers };
    u.edge_follow = { count: following };
    u.edge_mutual_followed_by = { count: mutual };

    if (!u.edge_owner_to_timeline_media) {
        u.edge_owner_to_timeline_media = { count: posts, edges: [] };
    } else {
        if (u.edge_owner_to_timeline_media.count == null) u.edge_owner_to_timeline_media.count = posts;
        if (!u.edge_owner_to_timeline_media.edges) u.edge_owner_to_timeline_media.edges = [];
    }

    if (u.friendship_status) {
        if (u.followed_by_viewer == null) u.followed_by_viewer = !!u.friendship_status.following;
        if (u.viewer_follows_user == null) u.viewer_follows_user = !!u.friendship_status.following;
        if (u.follows_viewer == null && u.friendship_status.followed_by != null) {
            u.follows_viewer = !!u.friendship_status.followed_by;
        }
    }

    return u;
}

// Detects the specific Instagram 400 caused by web_profile_info referencing a deleted schema
// asset (ig_business_category_subvertical) for business/professional profiles. This is NOT a
// rate limit / temp block, so callers must not back off for an hour on it.
function isInstagramBusinessSchemaError(jqxhr) {
    var body = '';
    try {
        if (jqxhr && jqxhr.responseJSON && jqxhr.responseJSON.message) {
            body = jqxhr.responseJSON.message;
        } else if (jqxhr && jqxhr.responseText) {
            body = jqxhr.responseText;
        }
    } catch (e) {
        body = '';
    }
    return body.indexOf('ig_business_category_subvertical') > -1 ||
        (body.indexOf('has been deleted') > -1 && body.indexOf('schema') > -1);
}

function extractUserPkNearUsernameInText(text, username) {
    if (!text) return '';

    var usernameNorm = normalizeConvenienceUsername(username);
    var escaped = String(username).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var patterns = [
        new RegExp('"username":"' + escaped + '"[^}]{0,1200}?"pk":"?(\\d+)"?', 'i'),
        new RegExp('"pk":"?(\\d+)"?[^}]{0,1200}?"username":"' + escaped + '"', 'i'),
        new RegExp('"username":"' + escaped + '"[^}]*"id":"(\\d+)"'),
        new RegExp('"id":"(\\d+)"[^}]*"username":"' + escaped + '"'),
        new RegExp('"pk":"?(\\d+)"?[^}]*"username":"' + escaped + '"')
    ];
    for (var i = 0; i < patterns.length; i++) {
        var match = text.match(patterns[i]);
        if (match && match[1]) return String(match[1]);
    }

    return '';
}

function extractUserPkFromProfilePostsGraphql(postsData) {
    if (!postsData || !postsData.data) return '';

    var timeline = postsData.data.xdt_api__v1__feed__user_timeline_graphql_connection;
    if (!timeline) return '';

    if (timeline.user && (timeline.user.pk != null || timeline.user.id != null)) {
        return String(timeline.user.pk != null ? timeline.user.pk : timeline.user.id);
    }

    if (timeline.edges && timeline.edges.length && timeline.edges[0].node && timeline.edges[0].node.owner) {
        var owner = timeline.edges[0].node.owner;
        if (owner.pk != null || owner.id != null) {
            return String(owner.pk != null ? owner.pk : owner.id);
        }
    }

    return '';
}

// Pulls the profile OWNER's numeric id from server-rendered profile HTML using owner-specific
// keys that are present even for logged-out requests and are not tied to the viewer. This is the
// most reliable HTML-based lookup for business/professional profiles (and zero-post accounts).
function extractOwnerUserIdFromProfileHtml(text) {
    if (!text) return '';

    var patterns = [
        /<meta[^>]+property=["']instapp:owner_user_id["'][^>]+content=["'](\d+)["']/i,
        /<meta[^>]+content=["'](\d+)["'][^>]+property=["']instapp:owner_user_id["']/i,
        /"owner_id"\s*:\s*"?(\d+)"?/i,
        /"profile_id"\s*:\s*"?(\d+)"?/i,
        /"instapp:owner_user_id"\s*:\s*"?(\d+)"?/i
    ];
    for (var i = 0; i < patterns.length; i++) {
        var match = text.match(patterns[i]);
        if (match && match[1]) return String(match[1]);
    }

    return '';
}

function extractUserIdFromProfileHtml(html, username) {
    if (!html) return '';

    var usernameNorm = normalizeConvenienceUsername(username);

    if (typeof html === 'object') {
        var apiUser = extractJSONfromUserPageHTML(html);
        if (apiUser && apiUser.id && normalizeConvenienceUsername(apiUser.username) === usernameNorm) {
            return String(apiUser.id);
        }
        return '';
    }

    // Owner-specific id first — present logged-out, never the viewer's id.
    var ownerId = extractOwnerUserIdFromProfileHtml(html);
    if (ownerId) return ownerId;

    var fromText = extractUserPkNearUsernameInText(html, username);
    if (fromText) return fromText;

    var scriptRe = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    var scriptMatch;
    while ((scriptMatch = scriptRe.exec(html)) !== null) {
        var chunk = scriptMatch[1];
        if (chunk.indexOf(username) === -1) continue;
        var scriptId = extractUserPkNearUsernameInText(chunk, username);
        if (scriptId) return scriptId;
    }

    var user = extractJSONfromUserPageHTML(html);
    if (user && user.id && normalizeConvenienceUsername(user.username) === usernameNorm) {
        return String(user.id);
    }

    return '';
}

async function resolveInstagramUserIdViaTopsearch(username) {
    var fetchOptions = getInstagramWebApiFetchOptions(username);
    var response = await fetch('https://www.instagram.com/web/search/topsearch/?query=' + encodeURIComponent(username), fetchOptions);

    if (!response.ok) {
        throw new Error('topsearch HTTP ' + response.status + ' for ' + username);
    }

    var data = await response.json();
    var users = data && data.users ? data.users : [];
    var usernameNorm = normalizeConvenienceUsername(username);

    for (var i = 0; i < users.length; i++) {
        var u = users[i] && users[i].user;
        if (!u) continue;
        if (normalizeConvenienceUsername(u.username) === usernameNorm) {
            var pk = u.pk != null ? u.pk : (u.pk_id != null ? u.pk_id : u.id);
            if (pk != null && !isViewerPkForDifferentProfile(pk, username)) return String(pk);
        }
    }

    throw new Error('topsearch found no exact match for ' + username);
}

// Ordered, LAZY user-id sources for a username. Each entry is a function returning a Promise of
// an id array. Consumers call them one at a time and stop at the first id that loads a profile,
// so expensive/aggressive endpoints (topsearch) only run if the cheaper, reliable ones fail.
// Order: already-loaded page HTML (free) → fresh profile HTML → GraphQL posts query → topsearch.
// Any id these yield is username-validated downstream, so a stale in-page id simply falls through.
function getOrderedInstagramUserIdSources(username, postGraphql, onError) {
    var usernameNorm = normalizeConvenienceUsername(username);
    var noteErr = function (e) { if (typeof onError === 'function') onError(e); };

    return [
        // 1. Already-loaded page HTML — zero network cost when we're sitting on the profile.
        async function () {
            if (normalizeConvenienceUsername(getProfileUsernameFromPath()) !== usernameNorm) return [];
            var docHtml = document.documentElement && document.documentElement.innerHTML ? document.documentElement.innerHTML : '';
            var docId = extractUserIdFromProfileHtml(docHtml, username);
            return docId ? [docId] : [];
        },

        // 2. Fresh profile-page HTML → owner id (works logged-out; primary for business/zero-post).
        async function () {
            try {
                var profileResponse = await fetch('https://www.instagram.com/' + encodeURIComponent(username) + '/', getInstagramWebApiFetchOptions(username));
                if (profileResponse.ok) {
                    var profileHtml = await profileResponse.text();
                    var htmlId = extractUserIdFromProfileHtml(profileHtml, username);
                    if (htmlId) return [htmlId];
                }
            } catch (profileErr) {
                noteErr(profileErr);
            }
            return [];
        },

        // 3. GraphQL posts query (accounts with posts; we already hold session tokens).
        async function () {
            var ids = [];
            var postsVariables = {
                data: {
                    count: 12,
                    include_reel_media_seen_timestamp: true,
                    include_relationship_info: true,
                    latest_besties_reel_media: true,
                    latest_reel_media: true
                },
                username: username,
                __relay_internal__pv__PolarisIsLoggedInrelayprovider: true,
                __relay_internal__pv__PolarisShareSheetV3relayprovider: true
            };
            var postsDocIds = ['8633614153419931', '9507655305965624', '34579740524958711'];
            for (var d = 0; d < postsDocIds.length; d++) {
                try {
                    var postsData = await postGraphql('PolarisProfilePostsQuery', postsVariables, postsDocIds[d]);
                    if (postsData && postsData.status === 'fail') continue;
                    var id = extractUserPkFromProfilePostsGraphql(postsData);
                    if (id) ids.push(id);
                } catch (postsErr) {
                    noteErr(postsErr);
                }
            }
            return ids;
        },

        // 4. topsearch — last resort (fuzzy, more aggressively rate-limited).
        async function () {
            try {
                return [await resolveInstagramUserIdViaTopsearch(username)];
            } catch (topsearchErr) {
                noteErr(topsearchErr);
                return [];
            }
        }
    ];
}

// Web-native profile-by-id lookup. Unlike the mobile /users/<id>/info/ endpoint (which rejects
// the web session with "useragent mismatch"), PolarisProfilePageContentQuery runs against the
// same graphql endpoint the web app itself uses, so it works for business/professional profiles.
async function fetchInstagramProfileViaGraphqlById(userid, username, postGraphql) {
    if (typeof postGraphql !== 'function') {
        throw new Error('graphql profile-by-id unavailable (no postGraphql) for ' + username);
    }

    var docIds = ['26672929172408668', '25980296051578533'];
    var usernameNorm = normalizeConvenienceUsername(username);
    var lastErr = null;

    for (var i = 0; i < docIds.length; i++) {
        try {
            var variables = {
                id: String(userid),
                render_surface: 'PROFILE',
                enable_integrity_filters: true,
                __relay_internal__pv__PolarisIsLoggedInrelayprovider: true,
                __relay_internal__pv__PolarisShareSheetV3relayprovider: true
            };
            var data = await postGraphql('PolarisProfilePageContentQuery', variables, docIds[i]);

            if (data && data.status === 'fail') {
                lastErr = new Error('PolarisProfilePageContentQuery failed: ' + (data.message || 'unknown error'));
                continue;
            }

            var u = data && data.data && data.data.user;
            if (!u) continue;

            if (u.username && normalizeConvenienceUsername(u.username) !== usernameNorm) continue;

            var profile = normalizeAppUserToProfilePage(u, username);
            if (isViewerPkForDifferentProfile(profile.id, username)) continue;

            return profile;
        } catch (graphqlByIdErr) {
            lastErr = graphqlByIdErr;
        }
    }

    if (lastErr) throw lastErr;
    throw new Error('graphql profile-by-id returned no user for ' + username);
}

async function fetchInstagramUserInfoById(userid, username) {
    // The web session is authenticated against www.instagram.com; i.instagram.com (mobile API)
    // rejects it with "useragent mismatch" and returns a stripped user object (no username).
    var infoResponse = await fetch("https://www.instagram.com/api/v1/users/" + userid + "/info/", getInstagramWebApiFetchOptions(username));

    if (!infoResponse.ok) {
        throw new Error('users/info HTTP ' + infoResponse.status + ' for ' + username);
    }

    var infoContentType = infoResponse.headers.get('content-type') || '';
    if (infoContentType.indexOf('json') === -1) {
        throw new Error('users/info returned non-JSON response for ' + username);
    }

    var infoData = await infoResponse.json();

    if (infoData && infoData.status === 'fail') {
        throw new Error('users/info failed for ' + username + ': ' + (infoData.message || 'unknown error'));
    }

    if (!infoData || !infoData.user) {
        throw new Error('users/info returned no user for ' + username);
    }

    var returnedUsername = infoData.user.username;
    if (returnedUsername && normalizeConvenienceUsername(returnedUsername) !== normalizeConvenienceUsername(username)) {
        throw new Error('users/info username mismatch for ' + username + ' (got ' + returnedUsername + ')');
    }

    var profile = normalizeAppUserToProfilePage(infoData.user, username);
    if (isViewerPkForDifferentProfile(profile.id, username)) {
        throw new Error('users/info returned logged-in viewer id for ' + username);
    }

    return profile;
}

async function fetchInstagramProfileByUsername(username, postGraphql) {
    var lastErr = null;
    var seen = {};
    var sources = getOrderedInstagramUserIdSources(username, postGraphql, function (e) { lastErr = e; });

    async function tryCandidateId(id) {
        id = String(id || '').trim();
        if (!id || seen[id]) return null;
        seen[id] = true;
        if (isViewerPkForDifferentProfile(id, username)) return null;

        try {
            return await fetchInstagramProfileViaGraphqlById(id, username, postGraphql);
        } catch (graphqlErr) {
            lastErr = graphqlErr;
        }
        try {
            return await fetchInstagramUserInfoById(id, username);
        } catch (infoErr) {
            lastErr = infoErr;
        }
        return null;
    }

    for (var s = 0; s < sources.length; s++) {
        var ids = [];
        try {
            ids = await sources[s]();
        } catch (srcErr) {
            lastErr = srcErr;
            continue;
        }
        for (var i = 0; i < ids.length; i++) {
            var profile = await tryCandidateId(ids[i]);
            if (profile) return profile;
        }
    }

    if (lastErr) throw lastErr;
    throw new Error('could not load profile for ' + username);
}



function ajaxGetCurrentPageUserInfo(urlprefix) {

    if (!urlprefix) {
        urlprefix = urlAcctInfo;
    }

    var username = $(igExternalVars.qsForProfilePageUsername).text();
    if (username == '') username = window.location.pathname.split('/')[1];
    if (username == 'explore' || username == 'stories' || username === 'accounts' || username === 'direct' || username === 'reel') username = '';

    if (username == 'p') username = getQueryParameterByName('taken-by') || getUsernameFromPostHtml();

    if (username.indexOf('Edit Profile') > -1) username = username.replace('Edit Profile', '');

    if ((currentProfilePage == false && username != '') || (username != '' && currentProfilePage.username != username)) {



        $.ajax({
            url: '' + urlprefix + username,
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
                xhr.setRequestHeader('x-instagram-ajax', '1010212815');
                xhr.setRequestHeader('x-asbd-id', '129477');
                xhr.setRequestHeader('x-ig-app-id', '936619743392459');
            },
            xhrFields: {
                withCredentials: true
            }
        }).fail(async function (err) {
            if (err.status === 429) {
                printMessage(gbGetMessage('RateLimit429', [(gblOptions.timeDelayAfter429RateLimit / 60000)]));
                setTimeout(ajaxGetCurrentPageUserInfo, (gblOptions.timeDelayAfter429RateLimit / 60000));
                clearInterval(usernameCheckInterval);
            }

            if (err.status === 400) {
                clearInterval(usernameCheckInterval);

                // A business/professional profile 400s because Instagram's web_profile_info
                // endpoint references a deleted schema asset (ig_business_category_subvertical),
                // not because the account is rate-limited/blocked. Only warn about a temp block
                // when the 400 is NOT that known business-profile schema error.
                if (!isInstagramBusinessSchemaError(err)) {
                    outputMessage(gbGetMessage('LogInstagramTempBlockBackupMethod'));
                }

                try {
                    currentProfilePage = await getUserInfoFromGraphQL(username);
                } catch (graphqlErr) {
                    currentProfilePage = false;
                    var detail = graphqlErr && graphqlErr.message ? String(graphqlErr.message) : String(graphqlErr);
                    outputMessage('Error loading current profile (' + username + '): ' + detail);
                    return;
                }

                if (!currentProfilePage) {
                    outputMessage('Error loading current profile (' + username + '). Instagram may be blocking profile lookups, or the page may still be loading — try refreshing.');
                    return;
                }

                setCurrentPageUsername();
                startUserNameFreshnessInterval();
                outputMessage(gbGetMessage('LogCurrentProfile', [username]));
                refreshConvenienceLinkPillsForUsername(username);
                ensureProfileConvenienceLinks();

            }


        }).done(function (data) {
            currentProfilePage = extractJSONfromUserPageHTML(data);

            if (currentProfilePage !== false) {
                setCurrentPageUsername();
                startUserNameFreshnessInterval();
                outputMessage(gbGetMessage('LogCurrentProfile', [username]));
                refreshConvenienceLinkPillsForUsername(username);
                ensureProfileConvenienceLinks();

            } else {
                //outputMessage('Error loading current user page');
                clearInterval(usernameCheckInterval);
                ajaxGetCurrentPageUserInfo(urlAcctInfo2);
            }


        });
    }
}

function getUsernameFromPostHtml() {
    return $('header._aaqw a.x1i10hfl:first').text();
}

function extractJSONfromUserPageHTML(data) {

    var pureJSON = data.data;
    if (pureJSON && pureJSON.user) {
        return pureJSON.user;
    }

    if (data && data.user) {
        var scriptSection = data.substring(data.indexOf('<script type="text/javascript">window._sharedData = ') + 52, data.indexOf(';</script>', data.indexOf('<script type="text/javascript">window._sharedData = ')));
        var scriptSectionAdditional = data.substring(data.indexOf('{', data.indexOf('<script type="text/javascript">window.__additionalDataLoaded(')), data.indexOf(');</script>', data.indexOf('<script type="text/javascript">window.__additionalDataLoaded(')));

        if (data.indexOf('<script type="text/javascript">window._sharedData = ') < 0 && data.indexOf('<script type="text/javascript">window.__additionalDataLoaded(') < 0) {
            return false;;
        }

        var jsondata = JSON.parse(scriptSection);
        if (jsondata && jsondata.entry_data && jsondata.entry_data.ProfilePage && jsondata.entry_data.ProfilePage.length > 0 && jsondata.entry_data.ProfilePage[0].hasOwnProperty('graphql')) {
            var user = jsondata.entry_data.ProfilePage[0].graphql.user;
            return user;
        }

        var jsondataAdditional = JSON.parse(scriptSectionAdditional);
        if (jsondataAdditional && jsondataAdditional.hasOwnProperty('graphql')) {
            var user = jsondataAdditional.graphql.user;
            return user;
        }
    }
    return false;

}


function setCurrentPageHashtag() {
    var hashtagFromUrl = getHashtagFromUrl();

    if (hashtagFromUrl != '') {

        $('#igBotInjectedContainer #btnLikeHashtag')
            .removeClass('inactive')
            .off('click.hashtagButtonError')
            .off('click.ajaxLoadPostsFromHashtag')
            .on('click.ajaxLoadPostsFromHashtag', ajaxLoadPostsFromHashtag)
            .text(gbGetMessage('LoadPostsFromHashtagDynamic', [hashtagFromUrl]));

    } else {


        $('#igBotInjectedContainer #btnLikeHashtag')
            .addClass('inactive')
            .off('click.ajaxLoadPostsFromHashtag')
            .off('click.hashtagButtonError')
            .on('click.hashtagButtonError', function () {
                outputMessage(gbGetMessage('LogErrorMustBeOnHashtagPage'));
            });
    }
}



function setCurrentPageLocation() {
    var locationFromUrl = getLocationFromUrl();

    if (locationFromUrl != '') {

        $('#igBotInjectedContainer #btnLoadLocationPosts')
            .removeClass('inactive')
            .off('click.locationButtonError')
            .off('click.ajaxLoadPostsFromLocation')
            .on('click.ajaxLoadPostsFromLocation', ajaxLoadPostsFromLocation);


    } else {

        $('#igBotInjectedContainer #btnLoadLocationPosts')
            .addClass('inactive')
            .off('click.ajaxLoadPostsFromLocation')
            .off('click.locationButtonError')
            .on('click.locationButtonError', function () {
                outputMessage(gbGetMessage('LogErrorMustBeOnLocationPage'));
            });
    }
}

function getHashtagFromUrl() {

    if ((window.location.href.indexOf('/explore/tags/') == -1) && (window.location.href.indexOf('/explore/search/keyword/?q=%23') == -1)) {
        return '';
    }

    var tagFromUrl = window.location.href;

    if (tagFromUrl.indexOf('/explore/tags/') > -1) {
        tagFromUrl = tagFromUrl.replace('https://www.instagram.com/explore/tags/', '');
        tagFromUrl = tagFromUrl.slice(0, tagFromUrl.indexOf('/'));
    }

    if (tagFromUrl.indexOf('/explore/search/keyword/?q=%23') > -1) {
        tagFromUrl = tagFromUrl.replace('https://www.instagram.com/explore/search/keyword/?q=%23', '');
    }

    tagFromUrl = decodeURIComponent(tagFromUrl);

    return tagFromUrl;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveHiddenStatus(hiddenStatus) {
    chrome.storage.sync.set({
        'igBotHidden': hiddenStatus
    });
}

function getHiddenStatus(callback) {

    chrome.storage.sync.get('igBotHidden', function (object) {

        var hiddenStatus = false;

        if (typeof object['igBotHidden'] != 'undefined') {
            hiddenStatus = object['igBotHidden'];
        } else {
            hiddenStatus = false;
        }

        callback(hiddenStatus);

    });

}

function hiddenStatusCallback(hiddenStatus) {
    if (hiddenStatus == true) {
        hideControlsDiv();
    } else {
        openControlsDiv();
    }
}


$.fn.shake = function shake(interval, distance, times) {
    interval = interval || 100;
    distance = distance || 10;
    times = times || 4;

    for (var iter = 0; iter < (times + 1); iter++) {
        //this.animate({ left: ((iter%2==0 ? distance : distance*-1))}, interval);
        this.animate({
            top: ((iter % 2 == 0 ? distance : distance * -1))
        }, interval);
        this.animate({
            top: ''
        }, interval);
    }
}

function userUpdateListener() {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {

            if (request.extension_updated) {
                waitForElement('li.tab6', document,
                    function () {
                        clickNotNow(true);
                        $('li.tab6 label').css({
                            'color': 'green'
                        }).click()
                            .delay(100).fadeOut().fadeIn('slow')
                            .delay(100).fadeOut().fadeIn('slow')
                            .delay(100).fadeOut().fadeIn('slow')
                            .delay(100).fadeOut().fadeIn('slow')
                            .delay(100).fadeOut().fadeIn('slow')
                            .delay(100).fadeOut().fadeIn('slow');
                    }, false);

            }

            if (request.clickSomething) {
                // TO DO, keep selectors here instead of sending "parent" request from backgroundscript
                if (request.clickViewStory) {

                    var tabId = request.tabId;

                    var intervalCloseWhenDone = setInterval(function () {

                        var currentUrl = window.location.href;

                        if (currentUrl.indexOf('/stories/') == -1) {
                            clearInterval(intervalCloseWhenDone);

                            chrome.runtime.sendMessage({
                                "closeStoryTab": {
                                    "tabId": tabId
                                }
                            });
                        }
                    }, 250);

                    var intervalClickViewStory = setInterval(function () {
                        var currentUrl = window.location.href;
                        var matchingElement = $('div[role="button"]:not(:has(svg))');

                        if (currentUrl.indexOf('/stories/') > -1 && matchingElement.length > 0) {
                            clearInterval(intervalClickViewStory);
                            matchingElement.click();

                            chrome.runtime.sendMessage({
                                "viewedStory": true
                            });
                            console.log('clicked view story');
                        }
                    }, 250);

                } else if (request.parent) {
                    $(request.clickSomething).parents(request.parent).click();
                    console.log('clicked  ' + request.clickSomething + ' parent');
                } else {
                    $(request.clickSomething).click();
                    console.log('clicked  ' + request.clickSomething);
                }

                return true;
            }

            if (request.closedStory) {
                closedStoryTab(request);
            }

            if (request.instabot_has_license === true) {
                instabot_has_license = true;

                if (request.igBotUser) {
                    localStorage['gbUserGuid'] = request.igBotUser.user_guid;
                    localStorage['gbFTover'] = false;

                    // ('set localStorage to licensed guid (has a license');
                }
            }

            if (request.closeBuyScreen === true && $('#iframePurchase').length > 0) {
                localStorage['gbFTover'] = false;
                if (request.igBotUser && request.igBotUser.user_guid) {
                    localStorage['gbUserGuid'] = request.igBotUser.user_guid;
                    guidCookie = request.igBotUser.user_guid;
                }
                location.reload();
                return true;
            }

            if (request.scheduledAction) {
                var action = request.scheduledAction;

                if (action.ig_username != user.viewer.username) {
                    outputMessage(gbGetMessage('LogActionsQueueIgnoredLoggedAs', [action.ig_username || '?', (user.viewer && user.viewer.username ? user.viewer.username : '?'), (action.id != null ? ' [id ' + action.id + ']' : '')]));
                    if (action.id != null) {
                        try {
                            chrome.runtime.sendMessage({ scheduledActionFinished: action.id });
                        } catch (e) { /* ignore */ }
                    }
                    return false;
                }

                logScheduledActionRun(action);

                switch (action.type) {
                    case "follow":
                        void FollowAcctScheduled(action.payload, action);
                        break;
                    case "unfollow":
                        void UnfollowAcctScheduled(action.payload, action);
                        break;
                    case "ajaxLikeAllPostsFromFeed":
                        ajaxLikeAllPostsFromFeed();
                        markScheduledActionCompleted(action.id, action.ig_username);
                        break;
                    case "watchReels":
                        void watchReels().then(function () {
                            return markScheduledActionCompleted(action.id, action.ig_username);
                        });
                        break;
                    case "likeAllMedia":
                        likeAllMedia();
                        markScheduledActionCompleted(action.id, action.ig_username);
                        break;
                    case "remove_follower":
                        void RemoveFollowerScheduled(action.payload, action);
                        break;
                    case "block":
                        void BlockAcctScheduled(action.payload, action);
                        break;
                    case "story_view":
                        viewStoryScheduled(action);
                        break;
                    default:
                        outputMessage(gbGetMessage('LogActionsQueueUnknownActionType', [action.type]));
                        markScheduledActionCompleted(action.id, action.ig_username);
                        break;
                }
            }

            if (request.loginRequired) {
                // Show login prompt when session is expired or missing
                if (!document.getElementById('growbot-login-overlay')) {
                    showGrowbotLoginDialog();
                }
            }

            if (request.rescheduleRequired) {
                // Ensure the request is for the currently logged-in user
                if (request.ig_username && user && user.viewer && request.ig_username !== user.viewer.username) {
                   // console.log(`Ignoring reschedule request for ${request.ig_username} (current user: ${user.viewer.username})`);
                    return;
                }

                if (!isIgBotDialogVisible()) {
                    showPastDueRescheduleDialog(request);
                }
            }

            if (request.instabot_install_date || request.instabot_free_trial_time) {
                instabot_install_date = request.instabot_install_date;
                instabot_free_trial_time = request.instabot_free_trial_time;
                clearInterval(freeTrialInterval);
                freeTrialInterval = setInterval(displayFreeTrialTimeLeft, 500);
            }

            if (request.igBotUser) {
                var guidStorage = request.igBotUser.user_guid;
                var ftOver = localStorage['gbFTover'];

                // Page localStorage must not override a logged-in session GUID.
                if (guidCookie && !sessionToken) {
                    if (guidCookie !== guidStorage) {
                        chrome.runtime.sendMessage({
                            "guidCookie": guidCookie,
                            "ftOver": ftOver
                        });
                    }
                }

                if (ftOver === 'true' && $('#iframePurchase').length == 0) {
                    $('#h2FreeTrialTimeLeft').hide();

                    chrome.runtime.sendMessage({
                        "ftOver": ftOver
                    });
                }

                if (window.location.href.indexOf('growbotforfollowers.com') > -1 && window.location.href.indexOf('update_payment_info=true') > -1 && window.location.href.indexOf('guid') == -1) {
                    window.location.href = window.location.href + '&buyscreen=true&guid=' + guidStorage;
                }

            }

            if (request.openBuyScreen == true && request.igBotUser) {

                if (request.igBotUser.user_guid) {
                    var guid = request.igBotUser.user_guid;
                } else {
                    var guid = JSON.parse(request.igBotUser).user_guid;
                }

                // must make it so this is not set when clicking the subscribe now link
                localStorage['gbFTover'] = true;


                if (localStorage['gbUserGuid']) {
                    localStorage['gbUserGuid'] = guid;
                    //.log('set localStorage to guid (opening buy screen');
                }

                $('#iframePurchase').remove();
                $('.growbot-firefox-purchase-panel').remove();
                $('#igBotMediaQueueContainer').hide();
                $('#igBotQueueContainer').hide();
                if (growbotIsFirefox()) {
                    $('#igBotQueueContainer').before(growbotBuildFirefoxPurchasePanel(guid));
                } else {
                    $('#igBotQueueContainer').before('<iframe id="iframePurchase" src="https://www.growbotforfollowers.com/?buyscreen=true&guid=' + guid + '"></iframe><div style="text-align:center; margin: 10px;">If there is an error above, please <a target="_blank" class="purchaseTextLink" href="https://www.growbotforfollowers.com/?buyscreen=true&guid=' + guid + '">click here to Subscribe</a> or <a href="javascript:void(0);" id="aRelinkSubscription" class="purchaseTextLink">Re-Link your Subscription</a>.</div>');
                }
                $('#aRelinkSubscription').off('click.showRelink').on('click.showRelink', showRelink);
                $('.igBotInjectedButton').off('click').addClass('disabled');
                $('li.tab1 label').click();
            }

            if (request.toggleGrowbot == true) {
                toggleControlsDiv();
            }

            if (request.openGrowbot == true) {
                openControlsDiv();
            }

            if (request.hideGrowbot == true) {
                hideControlsDiv(false); // don't save the hidden status
            }

            sendResponse({
                response: 'beep beep'
            });
        }
    );
}


function getObjectWithKey(theObject, theKey) {
    var result = null;
    if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
            result = getObjectWithKey(theObject[i], theKey);
            if (result) {
                break;
            }
        }
    } else {
        for (var prop in theObject) {
            if (prop == theKey) {
                //if(theObject[prop] == 1) {
                return theObject;
                // }
            }
            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getObjectWithKey(theObject[prop], theKey);
                if (result) {
                    break;
                }
            }
        }
    }
    return result;
}

function getObjectWithKeyAndValue(theObject, theKey, theValue) {
    var result = null;
    if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
            result = getObjectWithKeyAndValue(theObject[i], theKey, theValue);
            if (result) {
                break;
            }
        }
    } else {
        for (var prop in theObject) {
            if (prop == theKey) {
                if (theObject[prop] == theValue) {

                    return theObject;
                }
            }
            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getObjectWithKeyAndValue(theObject[prop], theKey, theValue);
                if (result) {
                    break;
                }
            }
        }
    }
    return result;
}

function extractUserInfoFromScriptTags() {
    var scriptTags = document.getElementsByTagName('script');
    for (var i = 0; i < scriptTags.length; i++) {
        if (scriptTags[i].innerHTML.indexOf('"username":"') > -1) {
            var foundObject = getObjectWithKeyAndValue(JSON.parse(scriptTags[i].innerHTML), 'id', getCookie('ds_user_id'));
            if (foundObject && foundObject.username) {
                user = {
                    "csrf_token": getCookie('csrftoken'),
                    "viewer": foundObject,
                    "viewerId": foundObject.id
                }
                return true;
            }
        }
    }

    return false;
}


function applyBackgroundInfoFromProfileUser(u) {
    if (!u || !u.edge_followed_by) {
        outputMessage(gbGetMessage('LogErrorLoadingAccountTempBlock'));
        return false;
    }

    outputMessage(gbGetMessage('LogCurrentIgUser', [u.username]));
    var statusDiv = document.getElementById('igBotStatusDiv');
    if (statusDiv && u.username) {
        statusDiv.innerHTML = statusDiv.innerHTML.replace(u.username, '<a href="https://www.instagram.com/' + u.username + '/">' + u.username + '</a>');
    }

    var posts = u.edge_owner_to_timeline_media && u.edge_owner_to_timeline_media.count != null
        ? u.edge_owner_to_timeline_media.count : 0;

    chrome.runtime.sendMessage({
        "updatewanted": true,
        "ig_user": user.viewer,
        "ig_user_account_stats": {
            "date": new Date().toUTCString(),
            "followers": u.edge_followed_by.count,
            "following": u.edge_follow.count,
            "posts": posts
        }
    });
    growbotMaybePostIgDailyStats(u, user.viewer);
    return true;
}


function getBackgroundInfo() {
    if (user && user.viewer && user.viewer.username != null) {
        // don't need to do anything
    } else {
        if (extractUserInfoFromScriptTags() === false) {
            //outputMessage('Error loading your account.  You may be temporarily blocked by Instagram, or not loggedin in.  You can try refreshing the page.  If that does not work, please take a break from using Growbot for at least 48 hours.');
            return false;
        }
    }

    $.ajax({
        url: '' + urlAcctInfo + user.viewer.username,
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Csrftoken', getCsrfFromCookie());
            xhr.setRequestHeader('x-instagram-ajax', '1010212815');
            xhr.setRequestHeader('x-asbd-id', '129477');
            xhr.setRequestHeader('x-ig-app-id', '936619743392459');
        },
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function (r) {
            var u = extractJSONfromUserPageHTML(r);
            if (u) {
                u = normalizeAppUserToProfilePage(u, user.viewer.username);
            }
            applyBackgroundInfoFromProfileUser(u);
        })
        .fail(async function (data) {
            if (data.status === 400 && isInstagramBusinessSchemaError(data) && user.viewer && user.viewer.username) {
                try {
                    var backupUser = await getUserInfoFromGraphQL(user.viewer.username);
                    if (applyBackgroundInfoFromProfileUser(backupUser)) {
                        return;
                    }
                } catch (backupErr) {
                    // fall through to empty stats
                }
            }

            chrome.runtime.sendMessage({
                "updatewanted": true,
                "ig_user": user.viewer,
                "ig_user_account_stats": {}
            });
        });


}

function initGrowbotHints(rootEl) {
    if (!gblOptions.hiddenHints) gblOptions.hiddenHints = {};
    if (gblOptions.hideSchedulingWelcome) {
        gblOptions.hiddenHints['igBotDialogWelcome'] = true;
        delete gblOptions.hideSchedulingWelcome;
        if (typeof saveOptions === 'function') saveOptions();
    }
    var root = rootEl || document;
    root.querySelectorAll('.growbot-hint').forEach(function (hint) {
        var id = hint.id;
        if (!id) return;
        if (gblOptions.hiddenHints[id]) {
            hint.style.display = 'none';
        } else {
            hint.style.display = '';
        }
        var dismissBtn = hint.querySelector('.growbot-hint-dismiss');
        if (dismissBtn) {
            $(dismissBtn).off('click.hintdismiss').on('click.hintdismiss', function () {
                hint.style.display = 'none';
                gblOptions.hiddenHints[id] = true;
                if (typeof saveOptions === 'function') saveOptions();
            });
        }
    });
}

var growbotSchedulingWizardIgDebouncedTimer = null;

function growbotGetViewerIgUsername() {
    try {
        var v = typeof user !== 'undefined' && user && user.viewer && user.viewer.username
            ? String(user.viewer.username).trim()
            : '';
        return v;
    } catch (err) {
        return '';
    }
}

function growbotSchedulingWizardNormalizeIgStoredKey(uname) {
    return growbotNormalizeExecutorIg(uname);
}

/** Pull IG slot rows / prefs from wizard DOM without saving. */
function growbotGatherSchedulingIgWizardDomState() {
    const rowsEl = document.getElementById('igBotDialogScheduleIgAccountsRows');
    /** @type {Array<{ ig_username: string, checked: boolean, quota: number }>} */
    const slotPlan = [];
    /** @type {string[]} normalized usernames among checked slots */
    const checkedExecutorNormals = [];
    const limitsByNorm = {};
    const includedByNorm = {};
    let checkedCountPositive = 0;

    let multiAccountConsumeMode = 'sequential';
    const concurrentRadio = document.querySelector('#igBotDialogScheduleIgConsumeModeWrap input[name="dialogScheduleIgConsumeMode"][value="concurrent"]');
    const sequentialRadio = document.querySelector('#igBotDialogScheduleIgConsumeModeWrap input[name="dialogScheduleIgConsumeMode"][value="sequential"]');
    if (concurrentRadio && concurrentRadio.checked) multiAccountConsumeMode = 'concurrent';
    else if (sequentialRadio && sequentialRadio.checked) multiAccountConsumeMode = 'sequential';

    let schedulingIgQuotaMode = 'custom';
    const evenQuotaRadio = document.querySelector('#igBotDialogScheduleIgQuotaModeWrap input[name="dialogScheduleIgQuotaMode"][value="even"]');
    if (evenQuotaRadio && evenQuotaRadio.checked) schedulingIgQuotaMode = 'even';

    if (!rowsEl) {
        const viewer = growbotGetViewerIgUsername();
        const normView = growbotSchedulingWizardNormalizeIgStoredKey(viewer);
        if (normView) {
            includedByNorm[normView] = true;
            limitsByNorm[normView] = 50;
            slotPlan.push({ ig_username: viewer, checked: true, quota: 50 });
            checkedExecutorNormals.push(normView);
            checkedCountPositive = 1;
        }
        const validFallback = checkedCountPositive > 0;
        return {
            slotPlan,
            limitsByNorm,
            includedByNorm,
            multiAccountConsumeMode,
            schedulingIgQuotaMode,
            checkedCountPositive,
            checkedExecutorNormals,
            valid: validFallback,
            validationMessage: schedulingIgQuotaMode === 'even'
                ? 'Choose at least one Instagram account to include in the split.'
                : 'Choose at least one Instagram account with a quota of at least 1.'
        };
    }

    const rowEls = rowsEl.querySelectorAll('.ig-bot-schedule-ig-slot');
    const checkedNormTracked = {};
    rowEls.forEach(function (rowEl) {
        const igUsername = rowEl.getAttribute('data-sched-ig');
        const raw = igUsername != null ? String(igUsername).trim() : '';
        if (!raw) return;
        const norm = growbotSchedulingWizardNormalizeIgStoredKey(raw);
        const cb = rowEl.querySelector('.ig-bot-schedule-ig-slot-cb');
        const quotaInput = rowEl.querySelector('.ig-bot-schedule-ig-slot-quota');
        const checked = cb ? !!cb.checked : false;
        let quota;
        let slotDisplayQuota;
        if (schedulingIgQuotaMode === 'even') {
            var st = rowEl.getAttribute('data-gb-persist-quota');
            var qp = st != null && st !== '' ? parseInt(st, 10) : NaN;
            if (!isFinite(qp) || qp < 1) qp = quotaInput ? parseInt(quotaInput.value, 10) : 50;
            quota = Math.max(1, Math.min(500, qp));
            slotDisplayQuota = quotaInput ? parseInt(quotaInput.value, 10) : 0;
            if (!isFinite(slotDisplayQuota) || slotDisplayQuota < 0) slotDisplayQuota = 0;
            if (slotDisplayQuota > 500) slotDisplayQuota = 500;
        } else {
            quota = quotaInput ? parseInt(quotaInput.value, 10) : 50;
            if (!isFinite(quota) || quota < 1) quota = 1;
            if (quota > 500) quota = 500;
            if (quotaInput) quotaInput.value = String(quota);
            rowEl.setAttribute('data-gb-persist-quota', String(quota));
            slotDisplayQuota = quota;
        }
        includedByNorm[norm] = checked;
        limitsByNorm[norm] = quota;
        slotPlan.push({ ig_username: raw, checked: checked, quota: slotDisplayQuota });
        if (checked) {
            checkedCountPositive++;
            const nCk = growbotNormalizeExecutorIg(raw);
            if (nCk && !checkedNormTracked[nCk]) {
                checkedNormTracked[nCk] = true;
                checkedExecutorNormals.push(nCk);
            }
        }
    });

    let valid = false;
    if (schedulingIgQuotaMode === 'even') {
        valid = checkedCountPositive >= 1;
    } else {
        for (let xi = 0; xi < slotPlan.length; xi++) {
            if (slotPlan[xi].checked && slotPlan[xi].quota >= 1) {
                valid = true;
                break;
            }
        }
    }

    return {
        slotPlan,
        limitsByNorm,
        includedByNorm,
        multiAccountConsumeMode,
        schedulingIgQuotaMode,
        checkedCountPositive,
        checkedExecutorNormals,
        valid: valid,
        validationMessage: schedulingIgQuotaMode === 'even'
            ? 'Choose at least one Instagram account to include in the split.'
            : 'Choose at least one Instagram account with a quota of at least 1.'
    };
}

function growbotDebouncedSchedulingWizardIgSaveSoon() {
    if (growbotSchedulingWizardIgDebouncedTimer != null) {
        clearTimeout(growbotSchedulingWizardIgDebouncedTimer);
    }
    growbotSchedulingWizardIgDebouncedTimer = setTimeout(function () {
        growbotSchedulingWizardIgDebouncedTimer = null;
        growbotSchedulingWizardIgPersistPartialFromDom();
    }, 380);
}

function growbotSchedulingWizardIgPersistPartialFromDom() {
    if (typeof gblOptions === 'undefined') return;
    const gs = growbotGatherSchedulingIgWizardDomState();
    const prevWizard = gblOptions.schedulingWizard || {};
    gblOptions.schedulingWizard = {
        ...prevWizard,
        actionsPerIgAccount: Object.assign({}, prevWizard.actionsPerIgAccount || {}, gs.limitsByNorm),
        schedulingIgIncluded: Object.assign({}, prevWizard.schedulingIgIncluded || {}, gs.includedByNorm),
        multiAccountConsumeMode: gs.multiAccountConsumeMode,
        schedulingIgQuotaMode: gs.schedulingIgQuotaMode
    };
    if (typeof saveOptions === 'function') saveOptions();
}

/** Copy enabled Actions inputs into data-gb-persist-quota on each row (custom values before switching to even split). */
function growbotSyncIgWizardPersistQuotaFromInputs(rowsContainer) {
    if (!rowsContainer) return;
    rowsContainer.querySelectorAll('.ig-bot-schedule-ig-slot').forEach(function (slotLabel) {
        const inp = slotLabel.querySelector('.ig-bot-schedule-ig-slot-quota');
        if (!inp || inp.disabled) return;
        let vq = parseInt(inp.value, 10);
        if (!isFinite(vq)) vq = 50;
        vq = Math.max(1, Math.min(500, vq));
        slotLabel.setAttribute('data-gb-persist-quota', String(vq));
    });
}

/** Update per-account Actions inputs (even split values or custom), disabled state, and preview text. */
function growbotUpdateSchedulingIgQuotaModeUi() {
    const evenQuotaRadio = document.querySelector('#igBotDialogScheduleIgQuotaModeWrap input[name="dialogScheduleIgQuotaMode"][value="even"]');
    const isEven = !!(evenQuotaRadio && evenQuotaRadio.checked);
    const rowsEl = document.getElementById('igBotDialogScheduleIgAccountsRows');
    const previewEl = document.getElementById('igBotScheduleIgEvenPreview');
    const igRoot = document.getElementById('igBotDialogScheduleIgAccounts');

    let n = igRoot && igRoot.dataset ? parseInt(String(igRoot.dataset.wizardQueueCount || '0'), 10) : 0;
    if (!isFinite(n) || n < 0) n = 0;

    if (rowsEl) {
        const rowLabels = rowsEl.querySelectorAll('.ig-bot-schedule-ig-slot');
        if (isEven) {
            let k = 0;
            for (let ri = 0; ri < rowLabels.length; ri++) {
                const row = rowLabels[ri];
                const cbRow = row.querySelector('.ig-bot-schedule-ig-slot-cb');
                if (cbRow && cbRow.checked) k++;
            }
            const base = k > 0 ? Math.floor(n / k) : 0;
            const rem = k > 0 ? n % k : 0;
            let ci = 0;
            for (let rj = 0; rj < rowLabels.length; rj++) {
                const rowEl = rowLabels[rj];
                const inp = rowEl.querySelector('.ig-bot-schedule-ig-slot-quota');
                const cb = rowEl.querySelector('.ig-bot-schedule-ig-slot-cb');
                if (!inp || !cb) continue;
                inp.min = '0';
                inp.max = '500';
                inp.disabled = true;
                if (!cb.checked) {
                    inp.value = '0';
                } else if (k < 1) {
                    inp.value = '0';
                } else {
                    const qPart = ci < rem ? base + 1 : base;
                    ci++;
                    inp.value = String(qPart);
                }
            }
        } else {
            for (let rk = 0; rk < rowLabels.length; rk++) {
                const rowEl = rowLabels[rk];
                const inp = rowEl.querySelector('.ig-bot-schedule-ig-slot-quota');
                if (!inp) continue;
                inp.min = '1';
                inp.max = '500';
                inp.disabled = false;
                const st = rowEl.getAttribute('data-gb-persist-quota');
                if (st != null && st !== '') {
                    let v = parseInt(st, 10);
                    if (!isFinite(v)) v = 50;
                    v = Math.max(1, Math.min(500, v));
                    inp.value = String(v);
                }
            }
        }
    }

    if (!previewEl) return;

    if (!isEven) {
        previewEl.style.display = 'none';
        previewEl.textContent = '';
        return;
    }

    if (rowsEl) {
        let kPrev = 0;
        rowsEl.querySelectorAll('.ig-bot-schedule-ig-slot-cb').forEach(function (cb) {
            if (cb.checked) kPrev++;
        });
        previewEl.style.display = '';
        if (kPrev < 1) {
            previewEl.textContent = gbGetMessage('WizardCheckOneIgAccount');
            return;
        }
        const base = Math.floor(n / kPrev);
        const rem = n % kPrev;
        /** @type {number[]} */
        const parts = [];
        for (let j = 0; j < kPrev; j++) {
            parts.push(base + (j < rem ? 1 : 0));
        }
        const sumLine = parts.join(' + ');
        previewEl.textContent = gbGetMessage('WizardEvenSplitPreview', [String(n), (n !== 1 ? 's' : ''), String(kPrev), (kPrev !== 1 ? 's' : ''), sumLine]);
    }
}

/** Read harvested scheduling wizard IG state including validation flags. */
function growbotReadSchedulingIgWizardHarvest() {
    return growbotGatherSchedulingIgWizardDomState();
}

function growbotUpdateSchedulingWizardIgConsumeWrapVisibility() {
    const wrap = document.getElementById('igBotDialogScheduleIgConsumeModeWrap');
    if (wrap) {
        const gs = growbotGatherSchedulingIgWizardDomState();
        const show = gs.checkedExecutorNormals.length >= 2;
        wrap.style.display = show ? '' : 'none';
    }
    growbotUpdateSchedulingIgQuotaModeUi();
}

/** Detach IG scheduling wizard listeners mounted on hydrate. Call from wizard closeDialog. */
function growbotSchedulingWizardDetachIgAccountsSectionListeners() {
    const wrap = document.getElementById('igBotDialogScheduleIgAccountsWrap');
    const rowsCt = document.getElementById('igBotDialogScheduleIgAccountsRows');
    const consumeWrap = document.getElementById('igBotDialogScheduleIgConsumeModeWrap');
    const quotaWrap = document.getElementById('igBotDialogScheduleIgQuotaModeWrap');
    if (rowsCt && rowsCt.__growbotSchedIgChangeFn) {
        rowsCt.removeEventListener('change', rowsCt.__growbotSchedIgChangeFn);
        rowsCt.removeEventListener('input', rowsCt.__growbotSchedIgChangeFn);
        rowsCt.__growbotSchedIgChangeFn = null;
    }
    if (consumeWrap && consumeWrap.__growbotSchedIgConsumeFn) {
        consumeWrap.removeEventListener('change', consumeWrap.__growbotSchedIgConsumeFn);
        consumeWrap.__growbotSchedIgConsumeFn = null;
    }
    if (quotaWrap && quotaWrap.__growbotSchedIgQuotaFn) {
        quotaWrap.removeEventListener('change', quotaWrap.__growbotSchedIgQuotaFn);
        quotaWrap.__growbotSchedIgQuotaFn = null;
    }
    if (wrap && wrap.__growbotDetailsTogglePersist) {
        wrap.removeEventListener('toggle', wrap.__growbotDetailsTogglePersist);
        wrap.__growbotDetailsTogglePersist = null;
    }
}

/**
 * Populate Instagram account rows + <details> state for Schedule Actions step 2.
 * Uses user_ig_accounts.php (same data as Actions Queue re-assign).
 */
async function growbotSchedulingWizardHydrateIgAccountsSection() {
    const rowsCt = document.getElementById('igBotDialogScheduleIgAccountsRows');
    const igWrapDetails = document.getElementById('igBotDialogScheduleIgAccountsWrap');
    const errLine = document.getElementById('igBotScheduleIgAccountsFetchError');
    const emptyLine = document.getElementById('igBotScheduleIgAccountsEmpty');

    growbotSchedulingWizardDetachIgAccountsSectionListeners();

    if (errLine) {
        errLine.style.display = 'none';
        errLine.textContent = '';
    }
    if (emptyLine) emptyLine.style.display = 'none';
    if (rowsCt) rowsCt.innerHTML = '';
    if (!rowsCt) return;

    var prevWizard = (typeof gblOptions !== 'undefined' && gblOptions.schedulingWizard) ? gblOptions.schedulingWizard : {};
    var limitsSaved = prevWizard.actionsPerIgAccount || {};
    var inclSaved = prevWizard.schedulingIgIncluded || {};

    /** @type {Array<{ ig_username?: string }>} */
    let list = [];
    let dbReturnedCount = 0;
    let fetchErrText = '';

    try {
        const response = await fetch('https://www.growbotforfollowers.com/actions/user_ig_accounts.php', {
            method: 'GET',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : {}
        });
        if (!response.ok) {
            var errBody = '';
            try {
                errBody = await response.text();
            } catch (eIg) {
                /* ignore */
            }
            fetchErrText = 'Could not load Instagram accounts (HTTP ' + response.status + ').' + (errBody ? errBody.slice(0, 120) : '');
        } else {
            var dataIg = await response.json();
            var rawAr = dataIg && dataIg.ig_accounts ? dataIg.ig_accounts : [];
            dbReturnedCount = rawAr.length;
            list = [];
            rawAr.forEach(function (rr) {
                var uRow = rr && rr.ig_username;
                if (uRow != null && String(uRow).trim() !== '') {
                    list.push({ ig_username: String(uRow).trim() });
                }
            });
        }
    } catch (errNet) {
        fetchErrText = 'Could not load Instagram accounts.';
    }

    const viewer = growbotGetViewerIgUsername();
    const seenNorm = {};
    let liDup;
    for (liDup = 0; liDup < list.length; liDup++) {
        const normD = growbotSchedulingWizardNormalizeIgStoredKey(list[liDup].ig_username || '');
        if (!normD) continue;
        if (seenNorm[normD]) {
            list.splice(liDup, 1);
            liDup--;
        } else {
            seenNorm[normD] = true;
        }
    }
    var viewerNorm = growbotSchedulingWizardNormalizeIgStoredKey(viewer);
    if (viewerNorm && !seenNorm[viewerNorm]) {
        list.unshift({ ig_username: viewer });
        seenNorm[viewerNorm] = true;
    }

    const renderConsumeRadiosFromSaved = function () {
        const seqRd = document.querySelector('#igBotDialogScheduleIgConsumeModeWrap input[name="dialogScheduleIgConsumeMode"][value="sequential"]');
        const conRd = document.querySelector('#igBotDialogScheduleIgConsumeModeWrap input[name="dialogScheduleIgConsumeMode"][value="concurrent"]');
        var modeSav = prevWizard.multiAccountConsumeMode === 'concurrent' ? 'concurrent' : 'sequential';
        if (conRd && modeSav === 'concurrent') {
            conRd.checked = true;
        } else if (seqRd) {
            seqRd.checked = true;
        }
    };

    const renderQuotaRadiosFromSaved = function () {
        const evenQ = document.querySelector('#igBotDialogScheduleIgQuotaModeWrap input[name="dialogScheduleIgQuotaMode"][value="even"]');
        const customQ = document.querySelector('#igBotDialogScheduleIgQuotaModeWrap input[name="dialogScheduleIgQuotaMode"][value="custom"]');
        var modeQ = prevWizard.schedulingIgQuotaMode === 'even' ? 'even' : 'custom';
        if (modeQ === 'even' && evenQ) {
            evenQ.checked = true;
        } else if (customQ) {
            customQ.checked = true;
        }
    };
    function renderOneRowIg(igUsernameStr) {
        const raw = igUsernameStr != null ? String(igUsernameStr).trim() : '';
        if (!raw) return;
        const norm = growbotSchedulingWizardNormalizeIgStoredKey(raw);
        let defaultIncluded;
        if (Object.prototype.hasOwnProperty.call(inclSaved, norm)) {
            defaultIncluded = !!inclSaved[norm];
        } else {
            defaultIncluded = viewerNorm !== '' ? norm === viewerNorm : false;
        }
        let quota = limitsSaved[norm];
        if (!isFinite(Number(quota)) || quota == null || quota === '') quota = 50;
        quota = Math.max(1, Math.min(500, parseInt(quota, 10) || 50));

        const label = document.createElement('label');
        label.className = 'ig-bot-schedule-ig-slot';
        label.setAttribute('data-sched-ig', raw);
        label.setAttribute('data-gb-persist-quota', String(quota));

        const cbEl = document.createElement('input');
        cbEl.type = 'checkbox';
        cbEl.className = 'ig-bot-schedule-ig-slot-cb';
        cbEl.checked = defaultIncluded;

        const handle = document.createElement('span');
        handle.className = 'ig-bot-schedule-ig-slot-handle';
        handle.textContent = '@' + raw;

        const quotaLab = document.createElement('label');
        quotaLab.className = 'ig-bot-schedule-ig-slot-quota-wrap';
        const quotaLblTxt = document.createElement('span');
        quotaLblTxt.textContent = gbGetMessage('WizardQuotaActionsLabel');
        const numIn = document.createElement('input');
        numIn.type = 'number';
        numIn.className = 'ig-bot-schedule-ig-slot-quota';
        numIn.min = '0';
        numIn.max = '500';
        numIn.value = String(quota);

        quotaLab.appendChild(quotaLblTxt);
        quotaLab.appendChild(numIn);

        label.appendChild(cbEl);
        label.appendChild(handle);
        label.appendChild(quotaLab);
        rowsCt.appendChild(label);
    }

    list.forEach(function (row) {
        renderOneRowIg(row && row.ig_username);
    });

    if (rowsCt.childElementCount === 0 && viewer) {
        renderOneRowIg(viewer);
    }

    if (fetchErrText && errLine) {
        errLine.textContent = fetchErrText;
        errLine.style.display = '';
    }

    if (emptyLine && dbReturnedCount === 0 && !fetchErrText) {
        emptyLine.style.display = '';
    }

    if (igWrapDetails) {
        igWrapDetails.dataset.schedWizardDbIgCount = String(Math.max(0, dbReturnedCount));

        let persistedExp = typeof prevWizard.multiAccountIgSectionExpanded === 'boolean'
            ? prevWizard.multiAccountIgSectionExpanded
            : undefined;

        igWrapDetails.open = dbReturnedCount <= 1 ? false : (persistedExp !== undefined ? persistedExp : true);

        igWrapDetails.__growbotDetailsTogglePersist = function () {
            var dbc = parseInt(String(igWrapDetails.dataset.schedWizardDbIgCount || '0'), 10) || 0;
            if (dbc <= 1) return;
            if (typeof gblOptions === 'undefined') return;
            var pW = gblOptions.schedulingWizard || {};
            gblOptions.schedulingWizard = Object.assign({}, pW, { multiAccountIgSectionExpanded: igWrapDetails.open });
            if (typeof saveOptions === 'function') saveOptions();
        };
        igWrapDetails.addEventListener('toggle', igWrapDetails.__growbotDetailsTogglePersist);
    }

    const onRowsInteract = function () {
        const customQuotaRadio = document.querySelector('#igBotDialogScheduleIgQuotaModeWrap input[name="dialogScheduleIgQuotaMode"][value="custom"]');
        if (customQuotaRadio && customQuotaRadio.checked && rowsCt) {
            rowsCt.querySelectorAll('.ig-bot-schedule-ig-slot').forEach(function (slotLabel) {
                const inp = slotLabel.querySelector('.ig-bot-schedule-ig-slot-quota');
                if (!inp || inp.disabled) return;
                var vq = parseInt(inp.value, 10);
                if (!isFinite(vq)) vq = 50;
                vq = Math.max(1, Math.min(500, vq));
                slotLabel.setAttribute('data-gb-persist-quota', String(vq));
            });
        }
        growbotUpdateSchedulingWizardIgConsumeWrapVisibility();
        growbotDebouncedSchedulingWizardIgSaveSoon();
    };
    rowsCt.__growbotSchedIgChangeFn = onRowsInteract;
    rowsCt.addEventListener('change', onRowsInteract);
    rowsCt.addEventListener('input', onRowsInteract);

    const consumeWrapDyn = document.getElementById('igBotDialogScheduleIgConsumeModeWrap');
    if (consumeWrapDyn) {
        consumeWrapDyn.__growbotSchedIgConsumeFn = function () {
            growbotDebouncedSchedulingWizardIgSaveSoon();
        };
        consumeWrapDyn.addEventListener('change', consumeWrapDyn.__growbotSchedIgConsumeFn);
    }

    const quotaWrapDyn = document.getElementById('igBotDialogScheduleIgQuotaModeWrap');
    if (quotaWrapDyn) {
        quotaWrapDyn.__growbotSchedIgQuotaFn = function () {
            const evenPick = document.querySelector('#igBotDialogScheduleIgQuotaModeWrap input[name="dialogScheduleIgQuotaMode"][value="even"]');
            if (evenPick && evenPick.checked) {
                growbotSyncIgWizardPersistQuotaFromInputs(rowsCt);
            }
            growbotUpdateSchedulingIgQuotaModeUi();
            growbotDebouncedSchedulingWizardIgSaveSoon();
        };
        quotaWrapDyn.addEventListener('change', quotaWrapDyn.__growbotSchedIgQuotaFn);
    }

    renderConsumeRadiosFromSaved();
    renderQuotaRadiosFromSaved();
    growbotUpdateSchedulingWizardIgConsumeWrapVisibility();

    /** Initial persisted maps from hydrated defaults */
    growbotSchedulingWizardIgPersistPartialFromDom();
}

/**
 * Two-step scheduling UI after Process Queue: Run Now vs Schedule Actions, then full options + Schedule.
 * @returns {Promise<object|null>} null if cancelled; { mode:'runNow', batchProgressLabel } or full schedule config with mode:'schedule'
 */
function showSchedulingConfigDialog(actionLabel, numActions, maxScheduledTime, avgPendingPerDay) {
    return new Promise((resolve) => {
        const configSection = document.getElementById('igBotDialogScheduleConfig');
        const step1El = document.getElementById('igBotDialogScheduleStep1');
        const existingRowEl = document.getElementById('igBotDialogScheduleExistingRow');
        const existingLineEl = document.getElementById('igBotDialogExistingUntilLine');
        const startDateInput = document.getElementById('dialogScheduleStartDate');
        const btnToday = document.getElementById('btnDialogScheduleStartToday');
        const header = document.getElementById('igBotDialogHeader');
        const btnOK = document.getElementById('btnDialogOK');
        const btnCancel = document.getElementById('btnDialogCancel');
        const sliderEl = document.getElementById('timeWindowSlider');
        const hasExisting = !!(maxScheduledTime && maxScheduledTime > Date.now());

        const cleanupSliderAndInputs = function () {
            if (sliderEl && sliderEl.noUiSlider) {
                try {
                    sliderEl.noUiSlider.destroy();
                } catch (e) { /* ignore */ }
            }
            const startInput = document.getElementById('dialogStartTime');
            const endInput = document.getElementById('dialogEndTime');
            if (startInput && startInput._syncSlider) {
                startInput.removeEventListener('change', startInput._syncSlider);
                startInput.removeEventListener('input', startInput._syncSlider);
                startInput._syncSlider = null;
            }
            if (endInput && endInput._syncSlider) {
                endInput.removeEventListener('change', endInput._syncSlider);
                endInput.removeEventListener('input', endInput._syncSlider);
                endInput._syncSlider = null;
            }
        };

        const closeDialog = () => {
            cleanupSliderAndInputs();
            growbotSchedulingWizardDetachIgAccountsSectionListeners();
            configSection.style.display = 'none';
            if (step1El) step1El.style.display = 'none';
            if (existingRowEl) existingRowEl.style.display = 'none';
            header.style.display = 'none';
            document.querySelectorAll('#igBotDialog .growbot-hint').forEach(function (h) { h.style.display = 'none'; });
            const truncateSection = document.getElementById('igBotDialogTruncateConfig');
            if (truncateSection) truncateSection.style.display = 'none';
            if (btnOK) btnOK.style.display = '';
            if (btnCancel) btnCancel.style.display = '';
            $('#btnDialogStep1RunNow').off('click.step1');
            $('#btnDialogStep1ScheduleActions').off('click.step1');
            $('#btnDialogScheduleStartToday').off('click.starttoday');
            $('#btnDialogOK').off('click.dialogyes');
            $('#btnDialogCancel').off('click.dialogcancel');
            const rowsCtClr = document.getElementById('igBotDialogScheduleIgAccountsRows');
            if (rowsCtClr) rowsCtClr.innerHTML = '';
            document.getElementById('igBotDialog').style.display = 'none';
        };

        configSection.style.display = 'none';
        header.style.display = 'flex';
        initGrowbotHints();

        $('#btnDialogClose').off('click.dialogclose').on('click.dialogclose', function () {
            closeDialog();
            resolve(null);
        });

        $('#btnDialogHelp').off('click.dialoghelp').on('click.dialoghelp', function () {
            gblOptions.hiddenHints = {};
            if (typeof saveOptions === 'function') saveOptions();
            initGrowbotHints();
        });

        const toTimeString = (h) => {
            const hrs = Math.floor(h);
            const mins = Math.round((h - hrs) * 60);
            return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        };

        const parseTime = (val) => {
            if (val == null || String(val).trim() === '') return 0;
            const parts = String(val).trim().split(':');
            const ho = parseInt(parts[0], 10);
            const mo = parseInt(parts[1] != null ? parts[1] : 0, 10);
            const so = parseInt(parts[2] != null ? parts[2] : 0, 10);
            const hh = isNaN(ho) ? 0 : ho;
            const mm = isNaN(mo) ? 0 : mo;
            const ss = isNaN(so) ? 0 : so;
            return hh + (mm + ss / 60) / 60;
        };

        const setDefaultStartDateFromQueueEnd = function () {
            if (!startDateInput || !hasExisting) return;
            const sec = parseInt(document.getElementById('dialogMinDelay').value, 10) || 300;
            startDateInput.value = growbotMsToDatetimeLocalValue(maxScheduledTime + sec * 1000);
        };

        const readConfig = function () {
            const harvestIg = typeof growbotReadSchedulingIgWizardHarvest === 'function'
                ? growbotReadSchedulingIgWizardHarvest()
                : null;
            if (!harvestIg || !harvestIg.valid) {
                const msg = harvestIg && harvestIg.validationMessage
                    ? harvestIg.validationMessage
                    : 'Choose at least one Instagram account with a quota of at least 1.';
                alert(msg);
                return null;
            }

            const actionsPerDay = parseInt(document.getElementById('dialogActionsPerDay').value) || 30;
            const startHour = parseTime(document.getElementById('dialogStartTime').value);
            const endHour = parseTime(document.getElementById('dialogEndTime').value);
            const minDelaySeconds = parseInt(document.getElementById('dialogMinDelay').value) || 300;
            const evenlyWrap = document.getElementById('igBotDialogScheduleEvenlyWrap');
            const evenlyRadio = evenlyWrap
                ? evenlyWrap.querySelector('input[name="dialogScheduleEvenlyMode"][value="evenly"]')
                : null;
            const scheduleEvenly = !!(evenlyRadio && evenlyRadio.checked);

            let scheduleStartMs = null;
            if (hasExisting && startDateInput && startDateInput.value) {
                scheduleStartMs = new Date(startDateInput.value).getTime();
            }
            if (hasExisting) {
                if (scheduleStartMs == null || !isFinite(scheduleStartMs)) {
                    scheduleStartMs = maxScheduledTime + minDelaySeconds * 1000;
                }
                scheduleStartMs = Math.max(scheduleStartMs, Date.now());
            }

            const prevWizard = gblOptions.schedulingWizard || {};
            gblOptions.schedulingWizard = {
                ...prevWizard,
                actionsPerDay,
                startHour,
                endHour,
                minDelaySeconds,
                scheduleEvenly,
                actionsPerIgAccount: Object.assign({}, prevWizard.actionsPerIgAccount || {}, harvestIg.limitsByNorm),
                schedulingIgIncluded: Object.assign({}, prevWizard.schedulingIgIncluded || {}, harvestIg.includedByNorm),
                multiAccountConsumeMode: harvestIg.multiAccountConsumeMode,
                schedulingIgQuotaMode: harvestIg.schedulingIgQuotaMode
            };
            if (typeof saveOptions === 'function') saveOptions();

            const igDetailsEl = document.getElementById('igBotDialogScheduleIgAccountsWrap');
            const fetchedDbIg = igDetailsEl
                ? parseInt(String(igDetailsEl.dataset.schedWizardDbIgCount || '0'), 10) || 0
                : 0;

            return {
                mode: 'schedule',
                actionsPerDay,
                startHour,
                endHour,
                minDelayMs: minDelaySeconds * 1000,
                scheduleEvenly,
                scheduleStartMs: hasExisting ? scheduleStartMs : null,
                startAfterExisting: false,
                maxScheduledTime,
                batchProgressLabel: gbGetMessage('WizardSchedulingActions'),
                schedulingIgSlotPlan: harvestIg.slotPlan,
                multiAccountConsumeMode: harvestIg.multiAccountConsumeMode,
                schedWizardFetchedDbIgAccountCount: fetchedDbIg,
                schedulingCheckedExecutorNormals: harvestIg.checkedExecutorNormals,
                schedulingIgQuotaMode: harvestIg.schedulingIgQuotaMode
            };
        };

        const finalizeWizardStep2Bindings = function () {
            let q2 = buildWizardScheduleHeading(numActions, actionLabel) + '<br><br>';
            q2 += gbGetMessage('WizardQuestionStep2Sub');
            q2 += buildWizardPendingHint(avgPendingPerDay);
            $('#igBotDialogQuestion').html(q2);

            const igAcctRoot = document.getElementById('igBotDialogScheduleIgAccounts');
            if (igAcctRoot) {
                igAcctRoot.dataset.wizardQueueCount = String(numActions);
            }
            growbotUpdateSchedulingIgQuotaModeUi();

            $('#btnDialogOK').text(gbGetMessage('WizardSchedule')).off('click.dialogyes').on('click.dialogyes', function () {
                const config = readConfig();
                if (!config) return;
                closeDialog();
                resolve(config);
            });
            $('#btnDialogCancel').text(gbGetMessage('WizardBack')).off('click.dialogcancel').on('click.dialogcancel', function () {
                cleanupSliderAndInputs();
                enterStep1();
            });
        };

        const enterStep2 = function () {
            if (step1El) step1El.style.display = 'none';
            if (btnOK) btnOK.style.display = '';
            if (btnCancel) btnCancel.style.display = '';
            configSection.style.display = 'flex';

            const savedConfig = gblOptions.schedulingWizard || {};
            const startHourInit = savedConfig.startHour ?? 6;
            const endHourInit = savedConfig.endHour ?? 22;
            document.getElementById('dialogActionsPerDay').value = savedConfig.actionsPerDay || 30;
            document.getElementById('dialogStartTime').value = toTimeString(startHourInit);
            document.getElementById('dialogEndTime').value = toTimeString(endHourInit);
            document.getElementById('dialogMinDelay').value = savedConfig.minDelaySeconds || 300;
            const evenlyWrapInit = document.getElementById('igBotDialogScheduleEvenlyWrap');
            if (evenlyWrapInit) {
                const rdEven = evenlyWrapInit.querySelector('input[name="dialogScheduleEvenlyMode"][value="evenly"]');
                const rdDelay = evenlyWrapInit.querySelector('input[name="dialogScheduleEvenlyMode"][value="settings_delay"]');
                if (savedConfig.scheduleEvenly !== false) {
                    if (rdEven) rdEven.checked = true;
                } else if (rdDelay) {
                    rdDelay.checked = true;
                } else if (rdEven) {
                    rdEven.checked = true;
                }
            }

            if (hasExisting && existingRowEl && existingLineEl) {
                const maxDate = new Date(maxScheduledTime);
                existingLineEl.textContent = gbGetMessage('WizardExistingUntil', [maxDate.toLocaleString()]);
                existingRowEl.style.display = 'flex';
                setDefaultStartDateFromQueueEnd();
                if (btnToday) {
                    $(btnToday).off('click.starttoday').on('click.starttoday', function () {
                        if (startDateInput) startDateInput.value = growbotMsToDatetimeLocalValue(Date.now());
                    });
                }
            } else if (existingRowEl) {
                existingRowEl.style.display = 'none';
            }

            const minutesToTimeStr = (m) => {
                m = Math.round(m);
                const h = Math.floor(m / 60) % 24;
                const mm = m % 60;
                const ampm = h >= 12 ? 'PM' : 'AM';
                const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
                return h12 + ':' + String(mm).padStart(2, '0') + ' ' + ampm;
            };
            if (sliderEl.noUiSlider) {
                try {
                    sliderEl.noUiSlider.destroy();
                } catch (e) { /* ignore */ }
            }
            noUiSlider.create(sliderEl, {
                start: [startHourInit * 60, endHourInit * 60],
                connect: [false, true, false],
                step: 1,
                range: { min: 0, max: 1439 },
                tooltips: [
                    { to: minutesToTimeStr },
                    { to: minutesToTimeStr }
                ]
            });

            var sliderUpdatingInputs = false;
            sliderEl.noUiSlider.on('update', function (values) {
                sliderUpdatingInputs = true;
                document.getElementById('dialogStartTime').value = toTimeString(values[0] / 60);
                document.getElementById('dialogEndTime').value = toTimeString(values[1] / 60);
                sliderUpdatingInputs = false;
            });

            var startInput = document.getElementById('dialogStartTime');
            var endInput = document.getElementById('dialogEndTime');
            var syncSliderFromInputs = function () {
                if (sliderUpdatingInputs) return;
                var a = Math.round(parseTime(startInput.value) * 60);
                var b = Math.round(parseTime(endInput.value) * 60);
                if (!isFinite(a)) a = 0;
                if (!isFinite(b)) b = 1439;
                a = Math.max(0, Math.min(1439, a));
                b = Math.max(0, Math.min(1439, b));
                if (b < a) b = Math.min(1439, a + 1);
                sliderEl.noUiSlider.set([a, b]);
            };
            if (startInput._syncSlider) {
                startInput.removeEventListener('change', startInput._syncSlider);
                startInput.removeEventListener('input', startInput._syncSlider);
            }
            if (endInput._syncSlider) {
                endInput.removeEventListener('change', endInput._syncSlider);
                endInput.removeEventListener('input', endInput._syncSlider);
            }
            startInput._syncSlider = syncSliderFromInputs;
            endInput._syncSlider = syncSliderFromInputs;
            startInput.addEventListener('change', syncSliderFromInputs);
            startInput.addEventListener('input', syncSliderFromInputs);
            endInput.addEventListener('change', syncSliderFromInputs);
            endInput.addEventListener('input', syncSliderFromInputs);

            growbotSchedulingWizardHydrateIgAccountsSection()
                .catch(function () { /* hydrate sets inline fetch error message */ })
                .finally(finalizeWizardStep2Bindings);
        };

        const enterStep1 = function () {
            cleanupSliderAndInputs();
            configSection.style.display = 'none';
            if (existingRowEl) existingRowEl.style.display = 'none';
            if (step1El) step1El.style.display = 'flex';
            if (btnOK) btnOK.style.display = 'none';
            if (btnCancel) btnCancel.style.display = 'none';

            let q1 = buildWizardScheduleHeading(numActions, actionLabel) + '<br><br>';
            q1 += gbGetMessage('WizardQuestionStep1Sub');
            q1 += buildWizardPendingHint(avgPendingPerDay);
            $('#igBotDialogQuestion').html(q1);

            $('#btnDialogStep1RunNow').off('click.step1').on('click.step1', function () {
                closeDialog();
                resolve({ mode: 'runNow', batchProgressLabel: gbGetMessage('PreparingToRun') });
            });
            $('#btnDialogStep1ScheduleActions').off('click.step1').on('click.step1', function () {
                if (typeof gblOptions !== 'undefined') {
                    gblOptions.actionsSchedulerExpanded = true;
                    if (typeof saveOptions === 'function') saveOptions();
                }
                growbotApplyActionsSchedulerExpandedPref();
                enterStep2();
            });
        };

        enterStep1();
        document.getElementById('igBotDialog').style.display = 'block';
    });
}

/**
 * Shows a dialog asking where to start loading followers/following.
 * Returns the chosen truncateStart index, or null if cancelled.
 * options: { mode: 'followers' | 'following', totalCount: number, currentTruncateStart: number }
 */
function showTruncateStartDialog(options) {
    return new Promise((resolve) => {
        const truncateSection = document.getElementById('igBotDialogTruncateConfig');
        const scheduleSection = document.getElementById('igBotDialogScheduleConfig');
        const step1El = document.getElementById('igBotDialogScheduleStep1');
        const existingRowEl = document.getElementById('igBotDialogScheduleExistingRow');
        if (scheduleSection) scheduleSection.style.display = 'none';
        if (step1El) step1El.style.display = 'none';
        if (existingRowEl) existingRowEl.style.display = 'none';
        if (truncateSection) truncateSection.style.display = 'flex';

        const total = typeof options.totalCount === 'number' && options.totalCount > 0 ? options.totalCount : gblOptions.maxAcctQueueLength;
        const modeLabel = options.mode === 'following'
            ? gbGetMessage('WizardModeFollowing')
            : gbGetMessage('WizardModeFollowers');

        const questionHtml = '<b>' + gbGetMessage('WizardChooseWhereToStart', [modeLabel]) + '</b><br><br>' +
            gbGetMessage('WizardChooseWhereToStartBody', [String(total), modeLabel, String(gblOptions.maxAcctQueueLength)]);
        $('#igBotDialogQuestion').html(questionHtml);

        const input = document.getElementById('dialogTruncateStart');
        input.min = '0';
        input.max = String(total);
        const current = parseInt(options.currentTruncateStart);
        input.value = isNaN(current) || current < 0 ? '0' : String(current);

        const header = document.getElementById('igBotDialogHeader');
        if (header) header.style.display = 'none';
        const welcomeEl = document.getElementById('igBotDialogWelcome');
        if (welcomeEl) welcomeEl.style.display = 'none';

        const closeDialog = () => {
            if (truncateSection) truncateSection.style.display = 'none';
            document.getElementById('igBotDialog').style.display = 'none';
        };

        $('#btnDialogOK')
            .text(gbGetMessage('WizardStartAtThisPosition'))
            .off('click')
            .on('click.truncate_ok', function () {
                let val = parseInt(input.value);
                if (isNaN(val) || val < 0) val = 0;
                if (val > total) val = total;
                closeDialog();
                resolve(val);
            });

        $('#btnDialogCancel')
            .text(gbGetMessage('CancelButton'))
            .off('click')
            .on('click.truncate_cancel', function () {
                closeDialog();
                resolve(null);
            });

        const truncOk = document.getElementById('btnDialogOK');
        const truncCn = document.getElementById('btnDialogCancel');
        if (truncOk) truncOk.style.display = '';
        if (truncCn) truncCn.style.display = '';

        document.getElementById('igBotDialog').style.display = 'block';
    });
}


/**
 * Generate an array of scheduled timestamps distributed across active hours.
 * Respects existing action counts per day to avoid exceeding the daily limit.
 * @param {object} config - from showSchedulingConfigDialog
 * @param {number} numActions - how many timestamps to generate
 * @param {object} existingCountsPerDay - map of 'YYYY-MM-DD' => count of already-scheduled actions
 * @returns {number[]} array of epoch ms timestamps
 */
function generateScheduledTimes(config, numActions, existingCountsPerDay) {
    const { actionsPerDay, startHour, endHour, minDelayMs, startAfterExisting, maxScheduledTime, scheduleEvenly } = config;
    existingCountsPerDay = existingCountsPerDay || {};
    const useEvenWindow = scheduleEvenly !== false;

    // Determine start time (explicit start date from wizard wins over legacy "after existing")
    let cursor;
    if (config.scheduleStartMs != null && isFinite(config.scheduleStartMs) && config.scheduleStartMs > 0) {
        cursor = config.scheduleStartMs;
    } else if (startAfterExisting && maxScheduledTime) {
        cursor = maxScheduledTime + minDelayMs;
    } else {
        cursor = Date.now() + 1000;
    }

    // Make sure cursor lands within the active window
    cursor = snapToActiveWindow(cursor, startHour, endHour);
    cursor = Math.max(cursor, Date.now());

    // Calculate how much time (ms) is in the daily active window
    const windowHours = endHour > startHour ? endHour - startHour : (24 - startHour + endHour);
    const windowMs = windowHours * 3600000;

    const evenSpacing = Math.floor(windowMs / actionsPerDay);
    const configuredBaseMs = (typeof gblOptions !== 'undefined' && gblOptions.timeDelay != null)
        ? gblOptions.timeDelay
        : 180000;
    const effectiveDelay = useEvenWindow
        ? Math.max(minDelayMs, evenSpacing)
        : Math.max(minDelayMs, configuredBaseMs);

    // Track how many new actions we've added per day (on top of existing)
    const newCountsPerDay = {};

    const timestamps = [];
    for (let i = 0; i < numActions; i++) {
        // Check if the current day is already full (existing + newly scheduled)
        let dayKey = new Date(cursor).toISOString().slice(0, 10);
        let existingCount = existingCountsPerDay[dayKey] || 0;
        let newCount = newCountsPerDay[dayKey] || 0;

        // If this day is at capacity, skip to the next day's start hour
        while (existingCount + newCount >= actionsPerDay) {
            const d = new Date(cursor);
            d.setDate(d.getDate() + 1);
            d.setHours(Math.floor(startHour), Math.round((startHour % 1) * 60), 0, 0);
            cursor = d.getTime();
            dayKey = new Date(cursor).toISOString().slice(0, 10);
            existingCount = existingCountsPerDay[dayKey] || 0;
            newCount = newCountsPerDay[dayKey] || 0;
        }

        cursor = Math.max(cursor, Date.now());
        timestamps.push(cursor);
        newCountsPerDay[dayKey] = (newCountsPerDay[dayKey] || 0) + 1;

        // Add delay with randomization from gblOptions
        const randomizedDelay = getRandomizedTime(effectiveDelay);
        cursor += Math.round(randomizedDelay);

        // If cursor is past the end hour, wrap to the next day's start hour
        cursor = snapToActiveWindow(cursor, startHour, endHour);
    }

    return timestamps;
}


/**
 * If the given timestamp is outside the active window (startHour..endHour),
 * snap it forward to the next occurrence of startHour.
 */
function snapToActiveWindow(timestamp, startHour, endHour) {
    const d = new Date(timestamp);
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const currentTimeInHours = hour + minutes / 60;

    if (currentTimeInHours >= endHour) {
        // Past end time today → move to start time tomorrow
        d.setDate(d.getDate() + 1);
        d.setHours(Math.floor(startHour), Math.round((startHour % 1) * 60), 0, 0);
        return d.getTime();
    } else if (currentTimeInHours < startHour) {
        // Before start time today → move to start time today
        d.setHours(Math.floor(startHour), Math.round((startHour % 1) * 60), 0, 0);
        return d.getTime();
    }

    return timestamp;
}


function resetPastDueDialogButtonStyles() {
    var okBtn = document.getElementById('btnDialogOK');
    var cancelBtn = document.getElementById('btnDialogCancel');
    if (okBtn) okBtn.classList.remove('ig-bot-dialog-btn-danger');
    if (cancelBtn) cancelBtn.classList.remove('ig-bot-dialog-btn-secondary');
}

function isIgBotDialogVisible() {
    var el = document.getElementById('igBotDialog');
    return el && el.style.display === 'block';
}

function setPastDueDeleteConfirmDialogStyles() {
    var okBtn = document.getElementById('btnDialogOK');
    var cancelBtn = document.getElementById('btnDialogCancel');
    if (okBtn) okBtn.classList.add('ig-bot-dialog-btn-danger');
    if (cancelBtn) cancelBtn.classList.add('ig-bot-dialog-btn-secondary');
}

function showPastDueDeleteConfirmDialog(request) {
    var pastDueCount = request.pastDueCount || request.actionCount;
    var igUsername = request.ig_username || user.viewer.username;

    dialog({
        yes: 'Delete ' + pastDueCount + ' Past Due Actions',
        no: 'Go Back',
        question: pastDueCount + ' actions did not run and will be deleted permanently, are you sure?'
    },
        async function () {
            resetPastDueDialogButtonStyles();
            try {
                const response = await fetch('https://www.growbotforfollowers.com/actions/api_actions.php', {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        action: 'delete_past_due',
                        ig_username: igUsername,
                        now_ms: Date.now()
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.affected > 0) {
                        printMessage(gbGetMessage('LogDeletedPastDueActions', [String(result.affected)]));
                    } else {
                        printMessage(result.message || gbGetMessage('LogNoActionsDeleted'));
                    }
                    if (typeof fetchActions === 'function') {
                        fetchActions();
                    }
                } else {
                    printMessage(gbGetMessage('LogFailedDeletePastDueActions'));
                }
            } catch (error) {
                console.error('Error deleting past due actions:', error);
                printMessage(gbGetMessage('LogErrorDeletingPastDueActions', [error.message]));
            }
        },
        function () {
            resetPastDueDialogButtonStyles();
            showPastDueRescheduleDialog(request);
        });

    setPastDueDeleteConfirmDialogStyles();
}

function showPastDueRescheduleDialog(request) {
    if (isIgBotDialogVisible()) return;

    const oldestDate = new Date(request.oldestScheduledTime).toLocaleString();
    const offsetMinutes = Math.round(request.offsetMs / 60000);
    var reschedulePerfHint = '';
    if (!/firefox/i.test(navigator.userAgent || '')) {
        if (!gblOptions.hiddenHints) gblOptions.hiddenHints = {};
        if (!gblOptions.hiddenHints['hintReschedulePastDueChrome']) {
            reschedulePerfHint =
                '<br><br><div class="growbot-hint" id="hintReschedulePastDueChrome"><p>If you keep seeing this dialog while leaving an Instagram tab open, and your computer was awake, Chrome may be sleeping the tab. ' +
                '<br><br>To fix this:' +
                '<br><br>1) Open <a href="#" class="growbot-open-chrome-perf-link" title="Opens Chrome settings in a new tab"><u><b>Settings</b> → <b>Performance</b></u></a>' +
                '<br><br>2) Find <b>Always keep these sites active</b>' +
                '<br><br>3) Add <code>www.instagram.com</code> to the list' +
                '</p><a class="growbot-hint-dismiss">Don\'t show this again</a></div>';
        }
    }

    dialog({
        yes: 'Reschedule All',
        no: 'Cancel',
        question: `You have ${request.actionCount} scheduled actions that are past due.<br><br>` +
            `The oldest action was scheduled for ${oldestDate}.<br><br>` +
            `Would you like to reschedule all actions forward by ${offsetMinutes} minutes to start now?` +
            reschedulePerfHint
    },
        async function () {
            resetPastDueDialogButtonStyles();
            try {
                const response = await fetch('https://www.growbotforfollowers.com/actions/api_actions.php', {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        action: 'reschedule_all',
                        ig_username: request.ig_username || user.viewer.username,
                        now_ms: Date.now()
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Reschedule response:', result);

                    if (result.affected > 0) {
                        const rescheduledMinutes = Math.round((result.offset_ms || 0) / 60000);
                        printMessage(gbGetMessage('LogRescheduledActionsForward', [String(result.affected), String(rescheduledMinutes)]));
                    } else {
                        printMessage(result.message || gbGetMessage('LogNoActionsNeededRescheduling'));
                    }

                    if (typeof fetchActions === 'function') {
                        fetchActions();
                    }
                } else {
                    printMessage(gbGetMessage('LogFailedRescheduleActions'));
                }
            } catch (error) {
                console.error('Error rescheduling actions:', error);
                printMessage(gbGetMessage('LogErrorReschedulingActions', [error.message]));
            }
        },
        function () {
            showPastDueDeleteConfirmDialog(request);
        });

    resetPastDueDialogButtonStyles();
    $('#igBotDialog .growbot-open-chrome-perf-link').off('click.growbotOpenChromePerf').on('click.growbotOpenChromePerf', function (e) {
        e.preventDefault();
        chrome.runtime.sendMessage({ openChromePerformanceSettings: true });
    });
    initGrowbotHints(document.getElementById('igBotDialogQuestion'));
}


function dialog(messages, yesCallback, noCallback) {

    resetPastDueDialogButtonStyles();

    // Hide scheduling-wizard-only elements (only shown by showSchedulingConfigDialog)
    document.getElementById('igBotDialogScheduleConfig').style.display = 'none';
    const step1El = document.getElementById('igBotDialogScheduleStep1');
    if (step1El) step1El.style.display = 'none';
    const existingRowEl = document.getElementById('igBotDialogScheduleExistingRow');
    if (existingRowEl) existingRowEl.style.display = 'none';
    document.getElementById('igBotDialogHeader').style.display = 'none';
    document.getElementById('igBotDialogWelcome').style.display = 'none';
    var truncateSection = document.getElementById('igBotDialogTruncateConfig');
    if (truncateSection) truncateSection.style.display = 'none';

    $('#igBotDialogQuestion').html(messages.question);

    var _dlgOk = document.getElementById('btnDialogOK');
    var _dlgCn = document.getElementById('btnDialogCancel');
    if (_dlgOk) _dlgOk.style.display = '';
    if (_dlgCn) _dlgCn.style.display = '';

    $('#btnDialogOK').text(messages.yes).off('click.dialogyes').on('click.dialogyes', function () {
        yesCallback();
        document.getElementById('igBotDialog').style.display = 'none'
    });
    $('#btnDialogCancel').text(messages.no).off('click.dialogcancel').on('click.dialogcancel', function () {
        document.getElementById('igBotDialog').style.display = 'none';
        if (noCallback) noCallback();
    });

    document.getElementById('igBotDialog').style.display = 'block'
}

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.FileSaver = mod.exports;
    }
})(this, function () {
    "use strict";

    /*
     * FileSaver.js
     * A saveAs() FileSaver implementation.
     *
     * By Eli Grey, http://eligrey.com
     *
     * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
     * source  : http://purl.eligrey.com/github/FileSaver.js
     */
    // The one and only way of getting global scope in all environments
    // https://stackoverflow.com/q/3277182/1008999
    var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;

    function bom(blob, opts) {
        if (typeof opts === 'undefined') opts = {
            autoBom: false
        };
        else if (typeof opts !== 'object') {
            console.warn('Depricated: Expected third argument to be a object');
            opts = {
                autoBom: !opts
            };
        } // prepend BOM for UTF-8 XML and text/* types (including HTML)
        // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF

        if (opts.autoBom && (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i).test(blob.type)) {
            return new Blob([String.fromCharCode(0xFEFF), blob], {
                type: blob.type
            });
        }

        return blob;
    }

    function download(url, name, opts) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';

        xhr.onload = function () {
            saveAs(xhr.response, name, opts);
        };

        xhr.onerror = function () {
            console.error('could not download file');
        };

        xhr.send();
    }

    function corsEnabled(url) {
        var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker

        xhr.open('HEAD', url, false);
        xhr.send();
        return xhr.status >= 200 && xhr.status <= 299;
    } // `a.click()` doesn't work for all browsers (#465)


    function click(node) {
        try {
            node.dispatchEvent(new MouseEvent('click'));
        } catch (e) {
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
            node.dispatchEvent(evt);
        }
    }

    var saveAs = _global.saveAs || ( // probably in some web worker
        typeof window !== 'object' || window !== _global ? function saveAs() { }
            /* noop */
            // Use download attribute first if possible (#193 Lumia mobile)
            :
            'download' in HTMLAnchorElement.prototype ? function saveAs(blob, name, opts) {
                var URL = _global.URL || _global.webkitURL;
                var a = document.createElement('a');
                name = name || blob.name || 'download';
                a.download = name;
                a.rel = 'noopener'; // tabnabbing
                // detect chrome extensions & packaged apps
                // a.target = '_blank'

                if (typeof blob === 'string') {
                    // Support regular links
                    a.href = blob;

                    if (a.origin !== location.origin) {
                        corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
                    } else {
                        click(a);
                    }
                } else {
                    // Support blobs
                    a.href = URL.createObjectURL(blob);
                    setTimeout(function () {
                        URL.revokeObjectURL(a.href);
                    }, 4E4); // 40s

                    setTimeout(function () {
                        click(a);
                    }, 0);
                }
            } // Use msSaveOrOpenBlob as a second approach
                :
                'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
                    name = name || blob.name || 'download';

                    if (typeof blob === 'string') {
                        if (corsEnabled(blob)) {
                            download(blob, name, opts);
                        } else {
                            var a = document.createElement('a');
                            a.href = blob;
                            a.target = '_blank';
                            setTimeout(function () {
                                click(a);
                            });
                        }
                    } else {
                        navigator.msSaveOrOpenBlob(bom(blob, opts), name);
                    }
                } // Fallback to using FileReader and a popup
                    :
                    function saveAs(blob, name, opts, popup) {
                        // Open a popup immediately do go around popup blocker
                        // Mostly only avalible on user interaction and the fileReader is async so...
                        popup = popup || open('', '_blank');

                        if (popup) {
                            popup.document.title = popup.document.body.innerText = 'downloading...';
                        }

                        if (typeof blob === 'string') return download(blob, name, opts);
                        var force = blob.type === 'application/octet-stream';

                        var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;

                        var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

                        if ((isChromeIOS || force && isSafari) && typeof FileReader === 'object') {
                            // Safari doesn't allow downloading of blob urls
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                var url = reader.result;
                                url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
                                if (popup) popup.location.href = url;
                                else location = url;
                                popup = null; // reverse-tabnabbing #460
                            };

                            reader.readAsDataURL(blob);
                        } else {
                            var URL = _global.URL || _global.webkitURL;
                            var url = URL.createObjectURL(blob);
                            if (popup) popup.location = url;
                            else location.href = url;
                            popup = null; // reverse-tabnabbing #460

                            setTimeout(function () {
                                URL.revokeObjectURL(url);
                            }, 4E4); // 40s
                        }
                    });
    _global.saveAs = saveAs.saveAs = saveAs;

    if (typeof module !== 'undefined') {
        module.exports = saveAs;
    }
});

function monitorButtonConditions() {

    if (acctsQueue.length > 0 || currentList == 'acctsWhiteList' || currentList == 'acctsBlackList' || currentList == 'acctsPreviouslyAttempted') {
        $('.needsQueueAccts').removeClass('inactive');

        if (currentList == 'acctsWhiteList') {
            $('#btnSaveQueueToStorage, #btnExportQueue, #btnSaveBlackList, #btnSaveAttempted').hide();
            $('#btnSaveWhiteList').css({
                'display': 'flex'
            });
        } else if (currentList == 'acctsBlackList') {
            $('#btnSaveQueueToStorage, #btnExportQueue, #btnSaveWhiteList, #btnSaveAttempted').hide();
            $('#btnSaveBlackList').css({
                'display': 'flex'
            });
        } else if (currentList == 'acctsPreviouslyAttempted') {
            $('#btnSaveQueueToStorage, #btnExportQueue, #btnSaveWhiteList, #btnSaveBlackList').hide();
            $('#btnSaveAttempted').css({
                'display': 'flex'
            });
        } else {
            $('#btnSaveQueueToStorage, #btnExportQueue').css({
                'display': 'flex'
            });
            $('#btnSaveWhiteList, #btnSaveBlackList, #btnSaveAttempted').hide();
        }

        if ($('#igBotQueueContainer input:checked').length > 0) {
            $('.needsSelectedAccts').removeClass('inactive');
        } else {
            $('.needsSelectedAccts').addClass('inactive');
        }
    } else {
        $('#btnSaveQueueToStorage, #btnExportQueue').hide();
        $('.needsQueueAccts,.needsSelectedAccts').addClass('inactive');
        $('#queueQuantityRow').hide();
    }

    if (mediaToLike.length > 0) {
        $('.needsMedia').removeClass('inactive');

        if ($('#igBotMediaQueueContainer input:checked').length > 0) {
            $('.needsSelectedMedia').removeClass('inactive');
        } else {
            $('.needsSelectedMedia').addClass('inactive');
        }
    } else {
        $('.needsMedia,.needsSelectedMedia').addClass('inactive');
    }


    if (window.location.href.indexOf("/p/") > -1 || window.location.href.indexOf("/reel/") > -1) {
        $('#btnLoadThisPost').removeClass('inactive');
    } else {
        $('#btnLoadThisPost').addClass('inactive');
    }


    if (timeoutsQueue.length > 0) {
        $('#btnStop,#igBotInjectedContainer #btnStop2').removeClass('inactive').show();
    } else {
        $('#btnStop,#igBotInjectedContainer #btnStop2').addClass('inactive').hide();
    }

    setCurrentPageHashtag();
    setCurrentPageLocation();

    clickNotNow();

    applyTooltips();

    updateGrowbotAccountSection();

}

function updateGrowbotAccountSection() {
    const statusDiv = document.getElementById('growbot-account-status');
    const loginBtn = document.getElementById('btnGrowbotLogin');
    const logoutBtn = document.getElementById('btnGrowbotLogout');
    if (!statusDiv) return;

    chrome.runtime.sendMessage({ action: 'getAuthState' }, (resp) => {
        if (resp && resp.isLoggedIn && resp.email) {
            statusDiv.innerHTML = gbGetMessage('GrowbotSignedInAs', [resp.email]).replace(resp.email, '<b>' + resp.email + '</b>');
            loginBtn.style.display = 'none';
            // logoutBtn.style.display = 'inline-block';
        } else if (resp && resp.isLoggedIn) {
            statusDiv.textContent = gbGetMessage('GrowbotSignedIn');
            loginBtn.style.display = 'none';
            // logoutBtn.style.display = 'inline-block';
        } else {
            statusDiv.textContent = gbGetMessage('GrowbotNotSignedIn');
            //  loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        }
    });

    // Wire up buttons (use .off to avoid duplicate handlers)
    $(loginBtn).off('click.gbAccount').on('click.gbAccount', () => {
        showGrowbotLoginDialog();
    });

    $(logoutBtn).off('click.gbAccount').on('click.gbAccount', () => {
        chrome.runtime.sendMessage({ action: 'logout' }, () => {
            printMessage(gbGetMessage('LogSignedOutOfGrowbot'));
            updateGrowbotAccountSection();
        });
    });
}

function showRelink() {
    $('li.tab4 label').click();
    $('#relinkSubscription').attr('open', 'open');
}

function startUserNameFreshnessInterval() {
    clearInterval(usernameCheckInterval);
    usernameCheckInterval = setInterval(function () {

        if ($('#instabotIcon').length == 0) {
            injectIcon();
            shakeInstabotIcon();
        }

        if ($('#igBotInjectedContainer .pulsing').length > 0) {
            $('#instabotIcon').addClass('pulsing');
        } else {
            $('#instabotIcon').removeClass('pulsing');
        }

        checkUsernameFreshness();

        if (getProfileUsernameFromPath()) {
            ensureProfileConvenienceLinks();
        }
    }, 2000);
}

function clickNotNow(override) {
    if (gblOptions.clickNotNow == true || override) {
        var NotNow = $('button:contains("Not Now")');
        if (NotNow.length > 0) {
            outputMessage(gbGetMessage('LogClickedNotNowNotifications'));
            NotNow.click();
        }

        NotNow = $('div[role="button"]:contains("Not now")');
        if (NotNow.length > 0) {
            outputMessage(gbGetMessage('LogClickedNotNowSaveAccount'));
            NotNow.click();
        }
    }
}

function relinkSubscription() {
    $.post('https://www.growbotforfollowers.com/find_subscription2.php', $('#formRelinkSubscription').serialize()).done(function (data) {
        if (data && data[0] && data[0].subscriptions && data[0].subscriptions.data && data[0].subscriptions.data.length > 0) {
            var guidFromServer = data[0].id;
            chrome.runtime.sendMessage({
                "guidCookie": guidFromServer,
                "forceGuidSync": true
            }, function () {
                $('#resultFindSubscription').text(gbGetMessage('SubscriptionUpdated'));
            });
        } else {
            $('#resultFindSubscription').text(gbGetMessage('SubscriptionNotFound'));
        }

    });
}


async function arrayOfUsersToDiv(q, clearDiv) {

    if (typeof clearDiv == 'undefined') clearDiv = true;

    if (clearDiv === true) {
        $('#igBotQueueContainer').children().remove();
    } else {
        $('#igBotQueueContainer').children().not('.igBotQueueAcct').remove();
    }

    if (gblOptions.cbRemoveUnusedColumns == true) {
        for (var i = 0; i < q.length; i++) {
            q[i] = removeAccountPropertiesByColumnCheckboxes(q[i]);
        }
    }

    if (gblOptions.cbShowQueueOnScreen == false) {
        $('#igBotQueueContainer').append('<div style="text-align:center;">You have turned off "Show queue on screen" in Settings.  Your queue is loaded in the background.</div>');
        return false;
    }


    $('#igBotQueueContainer').append('<table id="gridjsAcctsQueueWrapper"></table>');



    var columns = gblOptions.queueColumns;
    columns = columns.filter(e => e.visible !== false);


    var sb = '<thead><tr>';

    for (var i = 0; i < columns.length; i++) {
        sb = sb + '<th data-prop="' + columns[i].data + '" style="width:' + (columns[i].width || '60px') + ';">' + queueColumnLabel(columns[i]) + '</th>';
    }

    sb = sb + '</tr></thead><tbody></tbody>';
    $('#gridjsAcctsQueueWrapper').append(sb);



    for (var i = 0; i < q.length; i++) {
        sb = '<tr>';
        for (var j = 0; j < columns.length; j++) {


            if (columns[j].width) {
                sb = sb + '<td column-data="' + columns[j].data + '" style="width:' + columns[j].width + ';">';
            } else {
                sb = sb + '<td column-data="' + columns[j].data + '">';
            }


            if (columns[j].data) {
                var props = columns[j].data.split('.');


                if (props[1] == 'count' && typeof q[i].edge_followed_by != 'object') {

                    if (q[i][columns[j].data]) {
                        sb = sb + q[i][columns[j].data] + '</td>';

                    } else {
                        sb = sb + '0</td>';

                    }


                } else if (props[1] && q[i].edge_followed_by) {
                    if (q[i][props[0]] && q[i][props[0]][props[1]]) {
                        sb = sb + q[i][props[0]][props[1]] + '</td>';
                    } else {
                        sb = sb + '-</td>';
                    }
                } else {

                    if (typeof q[i][props[0]] != 'undefined' && q[i][props[0]] !== null) {
                        if (columns[j].formatter) {
                            sb = sb + columns[j].formatter.replace(/\${ig_id}/g, q[i].id).replace(/\${cell}/g, q[i][columns[j].data]) + '</td>';
                        } else {

                            var dataString = q[i][props[0]];

                            if (columns[j].data == 'biography') {

                                var langString = dataString;

                                if (q[i].edge_owner_to_timeline_media && q[i].edge_owner_to_timeline_media.edges && q[i].edge_owner_to_timeline_media.edges.length > 0) {
                                    for (var ci = 0; ci < q[i].edge_owner_to_timeline_media.edges.length; ci++) {

                                        if (q[i].edge_owner_to_timeline_media.edges[ci] && q[i].edge_owner_to_timeline_media.edges[ci].caption && q[i].edge_owner_to_timeline_media.edges[ci].caption.text) {
                                            langString = langString + ' ' + q[i].edge_owner_to_timeline_media.edges[ci].caption.text;
                                        }

                                    }
                                }


                                q[i] = await detectLanguage(langString, q[i]);
                            }

                            if (typeof dataString === 'number' && dataString.toString().indexOf('.') > -1) {
                                dataString = dataString.toFixed(3);
                            }

                            if (columns[j].bool && dataString == '') {
                                dataString = 'false';
                            }



                            sb = sb + dataString + '</td>';
                        }
                    } else {
                        sb = sb + '-</td>';
                    }
                }


            }
        }
        sb = sb + '</tr>';
        $('#gridjsAcctsQueueWrapper tbody').append(sb);
    }


    $('#gridjsAcctsQueueWrapper').tablesorter({

        // *** APPEARANCE ***
        // Add a theme - 'blackice', 'blue', 'dark', 'default', 'dropbox',
        // 'green', 'grey' or 'ice' stylesheets have all been loaded
        // to use 'bootstrap' or 'jui', you'll need to include 'uitheme'
        // in the widgets option - To modify the class names, extend from
        // themes variable. Look for '$.extend($.tablesorter.themes.jui'
        // at the bottom of this window
        // this option only adds a table class name 'tablesorter-{theme}'
        theme: 'blue',

        // fix the column widths
        widthFixed: true,

        // Show an indeterminate timer icon in the header when the table
        // is sorted or filtered
        showProcessing: true,

        // header layout template (HTML ok); {content} = innerHTML,
        // {icon} = <i/> (class from cssIcon)
        headerTemplate: '{content}{icon}',

        // return the modified template string
        onRenderTemplate: null, // function(index, template){ return template; },

        // called after each header cell is rendered, use index to target the column
        // customize header HTML
        onRenderHeader: function (index) {
            // the span wrapper is added by default
            $(this).find('div.tablesorter-header-inner').addClass('roundedCorners');
        },

        // *** FUNCTIONALITY ***
        // prevent text selection in header
        cancelSelection: true,

        // add tabindex to header for keyboard accessibility
        tabIndex: true,

        // other options: 'ddmmyyyy' & 'yyyymmdd'
        dateFormat: 'yyyymmdd',

        // The key used to select more than one column for multi-column
        // sorting.
        sortMultiSortKey: 'shiftKey',

        // key used to remove sorting on a column
        sortResetKey: 'ctrlKey',

        // false for German '1.234.567,89' or French '1 234 567,89'
        usNumberFormat: true,

        // If true, parsing of all table cell data will be delayed
        // until the user initializes a sort
        delayInit: false,

        // if true, server-side sorting should be performed because
        // client-side sorting will be disabled, but the ui and events
        // will still be used.
        serverSideSorting: false,

        // default setting to trigger a resort after an 'update',
        // 'addRows', 'updateCell', etc has completed
        resort: true,

        // *** SORT OPTIONS ***
        // These are detected by default,
        // but you can change or disable them
        // these can also be set using data-attributes or class names
        headers: {
            // set 'sorter : false' (no quotes) to disable the column
            0: {
                sorter: 'text'
            },
            1: {
                sorter: false
            },
        },

        // ignore case while sorting
        ignoreCase: true,

        // forces the user to have this/these column(s) sorted first
        sortForce: null,
        // initial sort order of the columns, example sortList: [[0,0],[1,0]],
        // [[columnIndex, sortDirection], ... ]
        // sortList: [
        //     [0, 0],
        //     [1, 0],
        //     [2, 0]
        // ],
        sortList: [],
        // default sort that is added to the end of the users sort
        // selection.
        sortAppend: null,

        // when sorting two rows with exactly the same content,
        // the original sort order is maintained
        sortStable: false,

        // starting sort direction 'asc' or 'desc'
        sortInitialOrder: 'asc',

        // Replace equivalent character (accented characters) to allow
        // for alphanumeric sorting
        sortLocaleCompare: false,

        // third click on the header will reset column to default - unsorted
        sortReset: true,

        // restart sort to 'sortInitialOrder' when clicking on previously
        // unsorted columns
        sortRestart: false,

        // sort empty cell to bottom, top, none, zero, emptyMax, emptyMin
        emptyTo: 'bottom',

        // sort strings in numerical column as max, min, top, bottom, zero
        stringTo: 'zero',

        // extract text from the table
        textExtraction: {
            0: function (node, table) {
                // this is how it is done by default
                return $(node).attr(table.config.textAttribute) ||
                    node.textContent ||
                    node.innerText ||
                    $(node).text() ||
                    '';
            },
            1: function (node) {
                return $(node).text();
            }
        },

        // data-attribute that contains alternate cell text
        // (used in default textExtraction function)
        textAttribute: 'data-text',

        // use custom text sorter
        // function(a,b){ return a.sort(b); } // basic sort
        textSorter: null,

        // choose overall numeric sorter
        // function(a, b, direction, maxColumnValue)
        numberSorter: null,

        // *** WIDGETS ***
        // apply widgets on tablesorter initialization
        initWidgets: true,

        // table class name template to match to include a widget
        widgetClass: 'widget-{name}',

        // include zebra and any other widgets, options:
        // 'columns', 'filter', 'stickyHeaders' & 'resizable'
        // 'uitheme' is another widget, but requires loading
        // a different skin and a jQuery UI theme.
        widgets: ['pager', 'stickyHeaders', 'storage', 'zebra', 'columns', 'filter'],

        widgetOptions: {

            // zebra widget: adding zebra striping, using content and
            // default styles - the ui css removes the background
            // from default even and odd class names included for this
            // demo to allow switching themes
            // [ 'even', 'odd' ]
            zebra: [
                'ui-widget-content even',
                'ui-state-default odd'
            ],

            // columns widget: change the default column class names
            // primary is the 1st column sorted, secondary is the 2nd, etc
            columns: [
                'primary',
                'secondary',
                'tertiary'
            ],

            // columns widget: If true, the class names from the columns
            // option will also be added to the table tfoot.
            columns_tfoot: true,

            // columns widget: If true, the class names from the columns
            // option will also be added to the table thead.
            columns_thead: true,

            // filter widget: If there are child rows in the table (rows with
            // class name from 'cssChildRow' option) and this option is true
            // and a match is found anywhere in the child row, then it will make
            // that row visible; default is false
            filter_childRows: false,

            // filter widget: If true, a filter will be added to the top of
            // each table column.
            filter_columnFilters: true,

            // filter widget: css class name added to the filter cell
            // (string or array)
            filter_cellFilter: '',

            // filter widget: css class name added to the filter row & each
            // input in the row (tablesorter-filter is ALWAYS added)
            filter_cssFilter: '',

            // filter widget: add a default column filter type
            // '~{query}' to make fuzzy searches default;
            // '{q1} AND {q2}' to make all searches use a logical AND.
            filter_defaultFilter: {},

            // filter widget: filters to exclude, per column
            filter_excludeFilter: {},

            // filter widget: jQuery selector string (or jQuery object)
            // of external filters
            filter_external: '',

            // filter widget: class added to filtered rows;
            // needed by pager plugin
            filter_filteredRow: 'filtered',

            // filter widget: add custom filter elements to the filter row
            filter_formatter: null,

            // filter widget: Customize the filter widget by adding a select
            // dropdown with content, custom options or custom filter functions
            // see http://goo.gl/HQQLW for more details
            filter_functions: null,

            // filter widget: hide filter row when table is empty
            filter_hideEmpty: true,

            // filter widget: Set this option to true to hide the filter row
            // initially. The rows is revealed by hovering over the filter
            // row or giving any filter input/select focus.
            filter_hideFilters: false,

            // filter widget: Set this option to false to keep the searches
            // case sensitive
            filter_ignoreCase: true,

            // filter widget: if true, search column content while the user
            // types (with a delay)
            filter_liveSearch: true,

            // filter widget: a header with a select dropdown & this class name
            // will only show available (visible) options within the drop down
            filter_onlyAvail: 'filter-onlyAvail',

            // filter widget: default placeholder text
            // (overridden by any header 'data-placeholder' setting)
            filter_placeholder: {
                search: '',
                select: ''
            },

            // filter widget: jQuery selector string of an element used to
            // reset the filters.
            filter_reset: null,

            // filter widget: Use the $.tablesorter.storage utility to save
            // the most recent filters
            filter_saveFilters: false,

            // filter widget: Delay in milliseconds before the filter widget
            // starts searching; This option prevents searching for every character
            // while typing and should make searching large tables faster.
            filter_searchDelay: 300,

            // filter widget: allow searching through already filtered rows in
            // special circumstances; will speed up searching in large tables if true
            filter_searchFiltered: true,

            // filter widget: include a function to return an array of values to be
            // added to the column filter select
            filter_selectSource: null,

            // filter widget: Set this option to true if filtering is performed on
            // the server-side.
            filter_serversideFiltering: false,

            // filter widget: Set this option to true to use the filter to find
            // text from the start of the column. So typing in 'a' will find
            // 'albert' but not 'frank', both have a's; default is false
            filter_startsWith: false,

            // filter widget: If true, ALL filter searches will only use parsed
            // data. To only use parsed data in specific columns, set this option
            // to false and add class name 'filter-parsed' to the header
            filter_useParsedData: false,

            // filter widget: data attribute in the header cell that contains
            // the default filter value
            filter_defaultAttrib: 'data-value',

            // filter widget: filter_selectSource array text left of the separator
            // is added to the option value, right into the option text
            filter_selectSourceSeparator: '|',

            // starting page of the pager (zero based index)
            pager_startPage: 0,

            // Number of visible rows - default is 10
            pager_size: gblOptions.paginationLimit,

            // reset pager after filtering; set to desired page #
            // set to false to not change page at filter start
            pager_pageReset: 0,

            // output string - default is '{page}/{totalPages}';
            // possible variables:
            // {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
            // pager_output: '{startRow} to {endRow} ({totalRows})',
            pager_output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',

            // apply disabled classname to the pager arrows when the rows at
            // either extreme is visible - default is true
            pager_updateArrows: true,

            // Number of options to include in the pager number selector
            pager_maxOptionSize: 20,

            // Save pager page & size if the storage script is loaded
            // (requires $.tablesorter.storage in jquery.tablesorter.widgets.js)
            pager_savePages: true,

            // defines custom storage key
            pager_storageKey: 'tablesorter-pager',

            // if true, the table will remain the same height no matter how many
            // records are displayed. The space is made up by an empty
            // table row set to a height to compensate; default is false
            pager_fixedHeight: false,

            // count child rows towards the set page size?
            // (set true if it is a visible table row within the pager)
            // if true, child row(s) may not appear to be attached to its
            // parent row, may be split across pages or
            // may distort the table if rowspan or cellspans are included.
            pager_countChildRows: false,

            // remove rows from the table to speed up the sort of large tables.
            // setting this to false, only hides the non-visible rows; needed
            // if you plan to add/remove rows with the pager enabled.
            pager_removeRows: false,

            // css class names used by pager elements
            pager_css: {
                // class added to pager container
                container: 'tablesorter-pager',
                // error information row (don't include period at beginning)
                errorRow: 'tablesorter-errorRow',
                // class added to arrows @ extremes
                // (i.e. prev/first arrows "disabled" on first page)
                disabled: 'disabled'
            },

            // jQuery selectors
            pager_selectors: {
                // target the pager markup
                container: '.pager',
                // go to first page arrow
                first: '.first',
                // previous page arrow
                prev: '.prev',
                // next page arrow
                next: '.next',
                // go to last page arrow
                last: '.last',
                // go to page selector - select dropdown that sets the current page
                gotoPage: '.gotoPage',
                // location of where the "output" is displayed
                pageDisplay: '.pagedisplay',
                // page size selector - select dropdown that sets the "size" option
                pageSize: '.pagesize'
            },

            // Resizable widget: If this option is set to false, resized column
            // widths will not be saved. Previous saved values will be restored
            // on page reload
            resizable: true,

            // Resizable widget: If this option is set to true, a resizing anchor
            // will be included in the last column of the table
            resizable_addLastColumn: false,

            // Resizable widget: Set this option to the starting & reset header widths
            resizable_widths: [],

            // Resizable widget: Set this option to throttle the resizable events
            // set to true (5ms) or any number 0-10 range
            resizable_throttle: false,

            // saveSort widget: If this option is set to false, new sorts will
            // not be saved. Any previous saved sort will be restored on page
            // reload.
            saveSort: false,

            // stickyHeaders widget: extra class name added to the sticky header row
            stickyHeaders: '',

            // jQuery selector or object to attach sticky header to
            stickyHeaders_attachTo: '#igBotQueueContainer',

            // jQuery selector or object to monitor horizontal scroll position
            // (defaults: xScroll > attachTo > window)
            stickyHeaders_xScroll: null,

            // jQuery selector or object to monitor vertical scroll position
            // (defaults: yScroll > attachTo > window)
            stickyHeaders_yScroll: null,

            // number or jquery selector targeting the position:fixed element
            stickyHeaders_offset: 0,

            // scroll table top into view after filtering
            stickyHeaders_filteredToTop: true,

            // added to table ID, if it exists
            stickyHeaders_cloneId: '-sticky',

            // trigger 'resize' event on headers
            stickyHeaders_addResizeEvent: true,

            // if false and a caption exist, it won't be included in the
            // sticky header
            stickyHeaders_includeCaption: true,

            // The zIndex of the stickyHeaders, allows the user to adjust this
            // to their needs
            stickyHeaders_zIndex: 2

        },

        // *** CALLBACKS ***
        // function called after tablesorter has completed initialization
        initialized: function () {

        }, // function (table) {}

        // *** extra css class names
        tableClass: '',
        cssAsc: '',
        cssDesc: '',
        cssNone: '',
        cssHeader: '',
        cssHeaderRow: '',
        // processing icon applied to header during sort/filter
        cssProcessing: '',

        // class name indiciating that a row is to be attached to the its parent
        cssChildRow: 'tablesorter-childRow',
        // if this class does not exist, the {icon} will not be added from
        // the headerTemplate
        cssIcon: 'tablesorter-icon',
        // class name added to the icon when there is no column sort
        cssIconNone: '',
        // class name added to the icon when the column has an ascending sort
        cssIconAsc: '',
        // class name added to the icon when the column has a descending sort
        cssIconDesc: '',
        // don't sort tbody with this class name
        // (only one class name allowed here!)
        cssInfoBlock: 'tablesorter-infoOnly',
        // class name added to table header which allows clicks to bubble up
        cssAllowClicks: 'tablesorter-allowClicks',
        // header row to ignore; cells within this row will not be added
        // to table.config.$headers
        cssIgnoreRow: 'tablesorter-ignoreRow',

        // *** SELECTORS ***
        // jQuery selectors used to find the header cells.
        selectorHeaders: '> thead th, > thead td',

        // jQuery selector of content within selectorHeaders
        // that is clickable to trigger a sort.
        selectorSort: 'th, td',

        // rows with this class name will be removed automatically
        // before updating the table cache - used by 'update',
        // 'addRows' and 'appendCache'
        selectorRemove: '.remove-me',

        // *** DEBUGING ***
        // send messages to console
        debug: false

    }).bind("sortEnd", function (e, t) {
        sortQueueByTableSort();
        handleCheckBoxes();
    });



    handleCheckBoxes();
    handleImagePreload();

    if (clearDiv == true) {
        $('#paginationLimit option:selected').attr("selected", null);
        $('#paginationLimit option[value="' + gblOptions.paginationLimit + '"]').attr("selected", "selected");
        $('#gridjsAcctsQueueWrapper').trigger('pageSize', gblOptions.paginationLimit);
    }

    $('#queueQuantityRow').show();
}


function exportQueue() {

    saveText(generateFileName() + ".csv", exportToCsv(acctsQueue));

}

async function detectLanguage(dataString, a) {
    let langInfo = await chrome.i18n.detectLanguage(dataString);

    const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
    });

    var highestPercentage = 0;

    a['languageCount'] = langInfo.languages.length;

    for (const lang of langInfo.languages) {

        if (lang.percentage > highestPercentage) {
            a['languageCode'] = lang.language;
            a['languageName'] = languageNames.of(lang.language);
            a['languagePercentage'] = lang.percentage;
        }

        highestPercentage = lang.percentage;
    }

    return a;

}


function removeAccountPropertiesByColumnCheckboxes(a) {
    var visibleColumns = gblOptions.queueColumns;
    visibleColumns = visibleColumns.filter(e => e.visible !== false);

    var acctCopy = {};

    for (var j = 0; j < visibleColumns.length; j++) {

        var props = visibleColumns[j].data.split('.');

        if (props[1] && a.edge_followed_by) {
            if (a[props[0]] && a[props[0]][props[1]]) {
                // acctCopy[visibleColumns[j].data] = a[props[0]][props[1]];
                acctCopy[props[0]] = {
                    [props[1]]: a[props[0]][props[1]]
                }
            }
        } else {
            if (a[visibleColumns[j].data]) {
                if (Array.isArray(a[visibleColumns[j].data]) == true) {
                    acctCopy[visibleColumns[j].data] = a[visibleColumns[j].data].join('/');

                } else {
                    acctCopy[visibleColumns[j].data] = a[visibleColumns[j].data];
                }
            } else {
                acctCopy[visibleColumns[j].data] = '';
            }
        }
    }

    return acctCopy;

}


function exportToCsv(q) {

    var items = [];

    var visibleColumns = gblOptions.queueColumns;
    visibleColumns = visibleColumns.filter(e => e.visible !== false);

    for (var i = 0; i < q.length; i++) {
        var acctCopy = removeAccountPropertiesByColumnCheckboxes(q[i]);

        items.push(acctCopy);

    }

    const header = Object.keys(items[0]);
    const headerString = header.join(',');
    // handle null or undefined values here
    const replacer = function (key, value) {
        return value === null ? '' : value
    }
    const rowItems = items.map((row) =>
        header
            .map((fieldName) => JSON.stringify(row[fieldName], replacer))
            .join(',')
    );
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
    return csv;
}

function sortQueueByTableSort() {
    var sortingArr = [];
    $('#gridjsAcctsQueueWrapper input[type="checkbox"]').each(function () {
        sortingArr.push($(this).val())
    });

    acctsQueue.sort(function (a, b) {
        return sortingArr.indexOf(a.id) - sortingArr.indexOf(b.id);
    });
}

function sortMediaQueueByTableSort() {
    var sortingArr = [];
    $('#gridjsMediaQueueWrapper input[type="checkbox"]').each(function () {
        sortingArr.push($(this).val())
    });

    mediaToLike.sort(function (a, b) {
        return sortingArr.indexOf(a.id) - sortingArr.indexOf(b.id);
    });
}

function pretarkt(str) {
    if ((str !== attarkt(1) + attarkt(2) + attarkt(3) + attarkt(91)) && (str !== stringArrayExtensionId() + attarkt(69))) return false;
    return true;
}

function attarkt(nummer) {

    if (nummer == 1) return 'cGNvZW';

    if (nummer == 3) return 'VtamJtaWFsY2lkaW9pZm0';

    if (nummer == 2) return 'lvZmFsa25haGdoaW';

    return '=';
}


function stringArrayExtensionId() {
    var arr = [
        "Y",
        "W",
        "J",
        "o",
        "Y",
        "2",
        "d",
        "v",
        "a",
        "2",
        "1",
        "u",
        "Z",
        "G",
        "J",
        "p",
        "Z",
        "W",
        "d",
        "t",
        "b",
        "W",
        "J",
        "q",
        "Z",
        "m",
        "Z",
        "k",
        "b",
        "H",
        "B",
        "p",
        "a",
        "G",
        "d",
        "k",
        "b",
        "W",
        "V",
        "l",
        "a",
        "m",
        "Y",
    ];
    return '' + arr.join('');
}

function shouldLoadGrowbotOnThisPage() {

    var shouldLoad = true;

    var forbiddenStrings = ["Sorry, this page isn't available.",
        "There's an issue and the page could not be loaded.",
        "Reload page",
        "Log in"
    ];

    if (window.location.href.indexOf('.instagram.com') === -1) shouldLoad = false;
    if (window.location.href.indexOf('/developer/') > -1) shouldLoad = false;
    if (window.location.href.indexOf('/challenge/') > -1) shouldLoad = false;
    if (window.location.href.indexOf('/auth_platform/') > -1) shouldLoad = false;
    if (window.location.href.indexOf('/accounts/') > -1 && window.location.href.indexOf('/accounts/onetap/') == -1) shouldLoad = false;
    if (document.getElementById('loginForm')) shouldLoad = false;

    var divButtons = document.querySelectorAll('div[role="button"], span');

    for (var i = 0; i < divButtons.length; i++) {
        if (forbiddenStrings.includes(divButtons[i].innerText)) {
            shouldLoad = false;
        }
    }

    if (shouldLoad === false) {
        console.log('Cannot load Growbot on this page');

        navigation.addEventListener("navigate", e => {
            setTimeout(waitForDomReady, 2000);
        });
    }

    //  if (pretarkt((extId)) == false) shouldLoad = false;

    return shouldLoad;
}


function domReady() {

    if (shouldLoadGrowbotOnThisPage() == false) return false;

    userUpdateListener();

    chrome.runtime.sendMessage({
        "updatewanted": true
    });

    waitForWinVars();

}

function waitForDomReady() {
    if (document.readyState === 'complete' || document.readyState !== 'loading') {
        domReady();
    } else {
        document.addEventListener('DOMContentLoaded', domReady);
    }
}


/**
 * Show a login/register dialog overlay for Growbot authentication.
 * Called when the background script detects no session token or a 401 response.
 */
function showGrowbotLoginDialog() {
    if (document.getElementById('growbot-login-overlay')) return;

    const container = document.getElementById('igBotInjectedContainer');

    // Only show the login dialog if we can render it inside the Growbot window
    if (!container) {
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'growbot-login-overlay';

    overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.45);z-index:10000;display:flex;align-items:center;justify-content:center;font-family:Helvetica,Arial,sans-serif;';
    container.style.display = '';
    container.appendChild(overlay);

    overlay.innerHTML = `
        <div id="growbot-login-box" autocomplete="off" style="background:#ffffff;border-radius:4px;padding:30px;width:360px;max-width:90vw;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid #ccc;color:#333;">
            <div style="text-align:center;margin-bottom:20px;">
                <div style="font-size:22px;font-weight:bold;color:#2583cc;">Growbot</div>
                <div id="gb-login-subtitle" style="color:#7f8c8d;margin-top:6px;font-size:12px;">Create your account</div>
            </div>
            <div id="gb-login-error" style="display:none;background:#fdecea;border:1px solid #e74c3c44;color:#e74c3c;padding:8px 12px;border-radius:3px;margin-bottom:14px;font-size:12px;"></div>
            <div id="gb-login-success" style="display:none;background:#eafaf1;border:1px solid #27ae6044;color:#27ae60;padding:8px 12px;border-radius:3px;margin-bottom:14px;font-size:12px;"></div>
            <div style="margin-bottom:12px;">
                <label for="gb-login-email" style="display:block;font-size:11px;color:#7f8c8d;margin-bottom:4px;font-weight:bold;text-transform:uppercase;">Email</label>
                <input id="gb-login-email" type="email" name="gb-acct-email" autocomplete="off" placeholder="you@example.com" style="width:100%;padding:8px 10px;background:#f5f8fa;border:1px solid #dcdde1;border-radius:3px;color:#2f3640;font-size:13px;outline:none;box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:12px;">
                <label for="gb-login-password" style="display:block;font-size:11px;color:#7f8c8d;margin-bottom:4px;font-weight:bold;text-transform:uppercase;">Password</label>
                <div style="position:relative;">
                    <input id="gb-login-password" type="password" name="gb-acct-password" autocomplete="new-password" placeholder="Your password" style="width:100%;padding:8px 10px;padding-right:36px;background:#f5f8fa;border:1px solid #dcdde1;border-radius:3px;color:#2f3640;font-size:13px;outline:none;box-sizing:border-box;" />
                    <span id="gb-login-toggle-pw" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:16px;user-select:none;color:#7f8c8d;" title="Show/hide password">&#x1F441;</span>
                </div>
            </div>

            <button id="gb-login-submit" style="width:100%;padding:8px;background-color:#2583cc;border:none;border-radius:3px;color:white;font-size:12px;font-weight:bold;text-transform:uppercase;cursor:pointer;transition:background-color 0.2s;font-family:Helvetica,Arial,sans-serif;">Create Account</button>
            <div style="text-align:center;margin-top:14px;font-size:12px;">
                <span id="gb-login-toggle" style="color:#2583cc;cursor:pointer;">Already have an account? Sign in</span>
            </div>
            <div style="text-align:center;margin-top:6px;">
                <span id="gb-login-forgot" style="color:#7f8c8d;font-size:11px;cursor:pointer;">Forgot password?</span>
            </div>
        </div>
    `;

    let isRegisterMode = true;
    const submitBtn = document.getElementById('gb-login-submit');
    const toggleBtn = document.getElementById('gb-login-toggle');
    const errorDiv = document.getElementById('gb-login-error');
    const successDiv = document.getElementById('gb-login-success');
    const subtitleDiv = document.getElementById('gb-login-subtitle');
    const emailInput = document.getElementById('gb-login-email');
    const passwordInput = document.getElementById('gb-login-password');
    const togglePwBtn = document.getElementById('gb-login-toggle-pw');

    // Toggle password visibility
    togglePwBtn.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        togglePwBtn.style.opacity = isHidden ? '1' : '0.5';
    });

    // Pre-fill email from Stripe by GUID lookup
    chrome.runtime.sendMessage({ action: 'lookupEmail' }, (resp) => {
        if (resp && resp.email && !emailInput.value) {
            emailInput.value = resp.email;
        }
    });

    // Forgot password — inline AJAX
    document.getElementById('gb-login-forgot').addEventListener('click', async () => {
        const email = emailInput.value.trim();
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';

        if (!email) {
            errorDiv.textContent = gbGetMessage('AuthEnterEmailFirst');
            errorDiv.style.display = 'block';
            emailInput.focus();
            return;
        }

        try {
            const resp = await fetch('https://www.growbotforfollowers.com/actions/auth_request_password_reset.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await resp.json();
            successDiv.textContent = data.message || gbGetMessage('AuthPasswordResetSent');
            successDiv.style.display = 'block';
        } catch (e) {
            errorDiv.textContent = gbGetMessage('AuthNetworkError');
            errorDiv.style.display = 'block';
        }
    });



    toggleBtn.addEventListener('click', () => {
        isRegisterMode = !isRegisterMode;
        submitBtn.textContent = isRegisterMode ? gbGetMessage('AuthCreatePasswordButton') : gbGetMessage('AuthSignInButton');
        toggleBtn.textContent = isRegisterMode ? gbGetMessage('AuthAlreadyHaveAccount') : gbGetMessage('AuthRegisterToggle');
        subtitleDiv.textContent = isRegisterMode ? gbGetMessage('AuthCreatePasswordSubtitle') : gbGetMessage('AuthSignInSubtitle');

        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
    });

    // Allow Enter key to submit
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') submitBtn.click();
        });
    });

    submitBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';

        if (!email || !password) {
            errorDiv.textContent = gbGetMessage('AuthEnterEmailPassword');
            errorDiv.style.display = 'block';
            return;
        }

        if (isRegisterMode && password.length < 8) {
            errorDiv.textContent = gbGetMessage('AuthPasswordMinLength');
            errorDiv.style.display = 'block';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.textContent = isRegisterMode ? gbGetMessage('AuthCreatingAccount') : gbGetMessage('AuthSigningIn');

        const action = isRegisterMode ? 'register' : 'login';
        const messageData = { action, email, password };

        if (isRegisterMode) {
            // Silently pass refcode from cookie/localStorage capture (no user input)
            if (capturedRefcode) {
                messageData.refcode = capturedRefcode;
            } else {
                // Fallback: check background script for stored refcode
                // (already sent via setRefcode message on page load)
            }
        }

        if (typeof user !== 'undefined' && user.viewer) {
            messageData.ig_user = user.viewer;
        }

        chrome.runtime.sendMessage(messageData, (response) => {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.textContent = isRegisterMode ? gbGetMessage('AuthCreateAccountButton') : gbGetMessage('AuthSignInButton');

            if (!response) {
                errorDiv.textContent = gbGetMessage('AuthExtensionError');
                errorDiv.style.display = 'block';
                return;
            }

            if (response.success) {
                if (isRegisterMode) {
                    // Show success and switch to login mode
                    successDiv.textContent = gbGetMessage('AuthAccountCreatedCheckEmail');
                    successDiv.style.display = 'block';
                    isRegisterMode = false;
                    submitBtn.textContent = gbGetMessage('AuthSignInButton');
                    toggleBtn.textContent = gbGetMessage('AuthRegisterToggle');
                    subtitleDiv.textContent = gbGetMessage('AuthSignInToContinue');

                    printMessage(gbGetMessage('LogAccountCreatedFor', [email]));
                } else {
                    // Login success — update local session token
                    sessionToken = response.session_token || null;
                    chrome.runtime.sendMessage({ action: 'getAuthState' }, (authState) => {
                        if (authState) {
                            sessionToken = authState.session_token;
                            guidCookie = authState.user_guid;
                            localStorage['gbUserGuid'] = guidCookie;
                        }
                    });
                    printMessage(gbGetMessage('LogSignedInAs', [response.email || email]));
                    overlay.remove();
                    // Update Growbot Account section if it exists
                    updateGrowbotAccountSection();

                    // Refresh actions list if function is available (from scheduledActions.js)
                    if (typeof window.refreshActionsToken === 'function') {
                        // First update the token in scheduledActions.js closure
                        window.refreshActionsToken().then(() => {
                            if (typeof window.fetchActions === 'function') {
                                window.fetchActions();
                            }
                        });
                    }
                }
            } else {
                const errorMsg = response.error || 'An error occurred. Please try again.';
                if (isRegisterMode && (
                    errorMsg.toLowerCase().indexOf('already exists') !== -1 ||
                    errorMsg.toLowerCase().indexOf('already linked') !== -1
                )) {
                    isRegisterMode = false;
                    submitBtn.textContent = gbGetMessage('AuthSignInButton');
                    toggleBtn.textContent = gbGetMessage('AuthRegisterToggle');
                    subtitleDiv.textContent = gbGetMessage('AuthSignInToContinue');
                }
                errorDiv.textContent = errorMsg;
                errorDiv.style.display = 'block';
                printMessage(gbGetMessage('LogAuthFailed', [isRegisterMode ? 'Registration' : 'Sign-in', errorMsg]));
            }
        });
    });

    emailInput.focus();
}

if (window.location.href == 'https://www.instagram.com/') {
    setTimeout(waitForDomReady, 1500);
} else {
    setTimeout(waitForDomReady, 100);
}
function scheduledActionsLoaded() {
    const urlParams = new URLSearchParams(window.location.search);
    const guid = guidCookie || urlParams.get('guid');
    const igUsername = user.viewer.username || urlParams.get('ig_username');

    if (guid) {
        const guidInput = document.getElementById('user_guid');
        if (guidInput) guidInput.value = guid;
    }
    if (igUsername) {
        const igInput = document.getElementById('ig_username');
        if (igInput) igInput.value = igUsername;
    }
    
    const actionForm = document.getElementById('action-form');
    const actionsList = document.getElementById('actions-list');
    const refreshBtn = document.getElementById('refresh-btn');
    const toast = document.getElementById('toast');
    const selActionsTable = '#igBotInjectedContainer #actions-table';
    const selActionsPageSize = '#igBotInjectedContainer #actionspaginationLimit';

    let actionsQueueDbCounts = { total: 0, pending: 0, completed: 0 };
    let actionsQueueServerMeta = null;
    let lastFetchedActionsSnapshot = null;
    /** id → action; avoids storing stringified JSON on each table row */
    let actionsById = new Map();
    let actionsQueuePopoverDelegatesBound = false;
    var actionQueueFloatingPopover = null;

    function applyActionsQueueServerMeta(meta) {
        if (!meta) return;
        actionsQueueServerMeta = {
            total: Number(meta.total) || 0,
            pending: Number(meta.pending) || 0,
            completed: Number(meta.completed) || 0
        };
        actionsQueueDbCounts = { ...actionsQueueServerMeta };
    }

    function updateActionsHiddenByFiltersHint() {
        const el = document.getElementById('actionsHiddenByFiltersHint');
        if (el) el.textContent = '';
    }

    function refreshActionQueueHeaderStats() {
        const statTotal = document.getElementById('stat-total');
        const statCompleted = document.getElementById('stat-completed');
        const statPending = document.getElementById('stat-pending');
        const statAvg = document.getElementById('stat-avg-pending-per-day');
        try {
            if (!statTotal || !statCompleted || !statPending) return;
            const meta = actionsQueueServerMeta || actionsQueueDbCounts;
            statPending.textContent = String(meta.pending || 0);
            statCompleted.textContent = String(meta.completed || 0);
            statTotal.textContent = String(meta.total || 0);
            if (statAvg) statAvg.textContent = '—';
        } finally {
            updateActionsHiddenByFiltersHint();
        }
    }

    /** Action data rows that participate in selection (current page; server-side filter/sort/pager). */
    function isActionQueueRowEligibleForSelection(tr) {
        if (!tr) return false;
        if (tr.querySelector('td[colspan]')) return false;
        return !tr.classList.contains('filtered');
    }

    function updateActionsQueueSelectedCount() {
        const el = document.getElementById('igBotActionsQueueSelectedCount');
        if (!el) return;
        let n = 0;
        document.querySelectorAll('#actions-list .action-checkbox').forEach(cb => {
            const tr = cb.closest('tr');
            if (!tr || !isActionQueueRowEligibleForSelection(tr)) return;
            if (cb.checked) n++;
        });
        el.textContent = gbGetMessage('SelectedCount', [String(n)]);
    }

    // Server URL for API calls
    var server_url = 'https://www.growbotforfollowers.com/actions/';

    // Session token for auth — retrieved from background script
    var sessionToken = null;

    // HTML escape helper to prevent XSS when inserting into innerHTML
    function escapeHtml(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatCount(n) {
        if (n == null) return null;
        n = Number(n);
        if (isNaN(n)) return null;
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 10000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        return n.toLocaleString();
    }

    function buildProfilePopover(payload) {
        if (!payload) return '';
        var h = '<div class="target-popover">';

        var hasPic = payload.profile_pic_url;
        var hasName = payload.full_name;
        var hasUsername = payload.username;
        if (hasPic || hasName || hasUsername) {
            h += '<div class="tp-header">';
            if (hasPic) h += '<img class="tp-avatar" src="' + escapeHtml(payload.profile_pic_url) + '" alt="" />';
            h += '<div class="tp-identity">';
            if (hasName) {
                h += '<div class="tp-name">' + escapeHtml(payload.full_name);
                if (payload.is_verified) h += ' <span class="tp-verified">&#10004;</span>';
                h += '</div>';
            }
            if (hasUsername) h += '<div class="tp-username">@' + escapeHtml(payload.username) + '</div>';
            if (payload.pronouns && payload.pronouns.length) {
                var p = Array.isArray(payload.pronouns) ? payload.pronouns.join(', ') : payload.pronouns;
                h += '<div class="tp-pronouns">' + escapeHtml(p) + '</div>';
            }
            h += '</div></div>';
        }

        if (payload.biography) h += '<div class="tp-bio">' + escapeHtml(payload.biography) + '</div>';
        if (payload.external_url) h += '<div class="tp-link">' + escapeHtml(payload.external_url) + '</div>';

        var followers = payload.edge_followed_by ? formatCount(payload.edge_followed_by.count) : null;
        var following = payload.edge_follow ? formatCount(payload.edge_follow.count) : null;
        var posts = payload.edge_owner_to_timeline_media ? formatCount(payload.edge_owner_to_timeline_media.count) : null;
        if (followers || following || posts) {
            h += '<div class="tp-stats">';
            if (followers) h += '<div><strong>' + followers + '</strong> followers</div>';
            if (following) h += '<div><strong>' + following + '</strong> following</div>';
            if (posts) h += '<div><strong>' + posts + '</strong> posts</div>';
            h += '</div>';
        }

        var tags = [];
        if (payload.is_private) tags.push('Private');
        if (payload.is_verified) tags.push('Verified');
        if (payload.followed_by_viewer) tags.push('You follow');
        if (payload.follows_viewer) tags.push('Follows you');
        if (payload.business_category_name) tags.push(payload.business_category_name);
        if (payload.source_type && payload.source_owner) tags.push(payload.source_type + ': @' + payload.source_owner);
        else if (payload.source_owner) tags.push('Source: @' + payload.source_owner);
        if (tags.length) {
            h += '<div class="tp-tags">';
            for (var i = 0; i < tags.length; i++) h += '<span class="tp-tag">' + escapeHtml(tags[i]) + '</span>';
            h += '</div>';
        }

        h += '</div>';
        return h;
    }

    /** True if buildProfilePopover would emit more than an empty shell (skip hover work otherwise). */
    function payloadHasPopoverContent(payload) {
        if (!payload) return false;
        if (payload.profile_pic_url || payload.full_name || payload.username) return true;
        if (payload.biography || payload.external_url) return true;
        if (payload.edge_followed_by && payload.edge_followed_by.count) return true;
        if (payload.edge_follow && payload.edge_follow.count) return true;
        if (payload.edge_owner_to_timeline_media && payload.edge_owner_to_timeline_media.count) return true;
        if (payload.is_private || payload.is_verified || payload.followed_by_viewer || payload.follows_viewer) return true;
        if (payload.business_category_name) return true;
        if (payload.source_owner) return true;
        if (payload.pronouns && (Array.isArray(payload.pronouns) ? payload.pronouns.length : String(payload.pronouns).length)) return true;
        return false;
    }

    function hideActionQueueFloatingPopover() {
        var el = actionQueueFloatingPopover || document.getElementById('action-queue-target-popover');
        if (!el) return;
        el.classList.remove('is-visible');
        el.innerHTML = '';
    }

    function ensureActionsQueuePopoverHost() {
        if (actionsQueuePopoverDelegatesBound) return;
        actionsQueuePopoverDelegatesBound = true;
        var host = document.getElementById('divScheduledActions');
        if (!host || !actionsList) return;
        var el = document.getElementById('action-queue-target-popover');
        if (!el) {
            el = document.createElement('div');
            el.id = 'action-queue-target-popover';
            el.className = 'target-popover';
            el.setAttribute('role', 'tooltip');
            host.appendChild(el);
        }
        actionQueueFloatingPopover = el;
        var hideTimer = null;
        function clearHide() {
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }
        }
        function scheduleHide() {
            clearHide();
            hideTimer = setTimeout(function () {
                el.classList.remove('is-visible');
                el.innerHTML = '';
            }, 150);
        }
        var lastPopoverWrap = null;
        actionsList.addEventListener('mouseover', function (e) {
            var wrap = e.target.closest('.target-cell-wrapper[data-action-id]');
            if (!wrap || !actionsList.contains(wrap)) return;
            var id = wrap.dataset.actionId;
            var action = actionsById.get(id);
            if (!action || !payloadHasPopoverContent(action.payload)) return;
            var html = buildProfilePopover(action.payload);
            if (!html) return;
            if (wrap === lastPopoverWrap && el.classList.contains('is-visible')) return;
            lastPopoverWrap = wrap;
            clearHide();
            el.innerHTML = html;
            var r = wrap.getBoundingClientRect();
            var left = Math.max(4, Math.min(r.left, window.innerWidth - 304));
            el.style.left = left + 'px';
            el.style.top = (r.bottom + 4) + 'px';
            el.classList.add('is-visible');
        });
        actionsList.addEventListener('mouseout', function (e) {
            var wrap = e.target.closest('.target-cell-wrapper[data-action-id]');
            if (!wrap || !actionsList.contains(wrap)) return;
            var related = e.relatedTarget;
            if (related && wrap.contains(related)) return;
            if (related && (el === related || el.contains(related))) return;
            lastPopoverWrap = null;
            scheduleHide();
        });
        el.addEventListener('mouseenter', clearHide);
        el.addEventListener('mouseleave', scheduleHide);
    }

    // Get auth headers with session token
    function getAuthHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        if (sessionToken) {
            headers['Authorization'] = 'Bearer ' + sessionToken;
        }
        const ev = growbotExtensionVersionHeaderValue();
        if (ev) {
            headers['X-Growbot-Extension-Version'] = ev;
        }
        return headers;
    }

    // Retrieve session token from background script
    async function initAuthToken() {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ action: 'getAuthState' }, (response) => {
                if (response && response.session_token) {
                    sessionToken = response.session_token;
                }
                resolve();
            });
        });
    }

    // Initialize auth token before anything else (awaited before fetchActions)

    // Set default date to now + 5 minutes (local time, matches wizard datetime-local helper)
    document.getElementById('scheduledTime').value = growbotMsToDatetimeLocalValue(Date.now() + 5 * 60 * 1000);

    // Action Type Selector Logic
    const typeInput = document.getElementById('type');
    const typeOptions = document.querySelectorAll('.action-option');

    typeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all
            typeOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked
            option.classList.add('selected');
            // Update hidden input
            typeInput.value = option.dataset.value;
            // Update dynamic inputs
            updateActionInputs(option.dataset.value);
        });
    });

    // Dynamic Action Inputs
    const actionInputsContainer = document.getElementById('action-inputs');

    const inputTemplates = {
        follow: `
            <div class="form-group full-width">
                <label for="target_username">Target Username</label>
                <div class="input-with-action">
                    <input type="text" id="target_username" placeholder="e.g. fitness_influencer" required>
                    <button type="button" id="lookup_user_btn" class="icon-btn" title="Fetch Account ID from Instagram">🔍</button>
                </div>
            </div>
            <div class="form-group full-width">
                <label for="target_account_id">Account ID</label>
                <input type="text" id="target_account_id" placeholder="Will be auto-filled or enter manually" required>
            </div>
        `,
        unfollow: `
            <div class="form-group full-width">
                <label for="target_username">Target Username</label>
                <div class="input-with-action">
                    <input type="text" id="target_username" placeholder="e.g. old_follower" required>
                    <button type="button" id="lookup_user_btn" class="icon-btn" title="Fetch Account ID from Instagram">🔍</button>
                </div>
            </div>
            <div class="form-group full-width">
                <label for="target_account_id">Account ID</label>
                <input type="text" id="target_account_id" placeholder="Will be auto-filled or enter manually" required>
            </div>
        `,
        like: `
            <div class="form-group full-width">
                <label for="post_url">Post URL</label>
                <input type="text" id="post_url" placeholder="e.g. https://instagram.com/p/ABC123" required>
            </div>
        `,
        comment: `
            <div class="form-group full-width">
                <label for="post_url">Post URL</label>
                <input type="text" id="post_url" placeholder="e.g. https://instagram.com/p/ABC123" required>
            </div>
            <div class="form-group full-width">
                <label for="comment_text">Comment Text</label>
                <textarea id="comment_text" placeholder="Great post! 🔥" required style="height: 60px;"></textarea>
            </div>
        `,
        story_view: `
            <div class="form-group full-width">
                <label for="story_username">Story Username</label>
                <input type="text" id="story_username" placeholder="e.g. travel_blogger" required>
            </div>
        `,
        switch_account: `
            <div class="form-group full-width">
                <label for="switch_to_username">Account to Switch To</label>
                <input type="text" id="switch_to_username" placeholder="e.g. my_other_account" required>
            </div>
            <div class="form-group full-width">
                <label for="switch_to_password">Password</label>
                <input type="password" id="switch_to_password" placeholder="Enter account password" required>
            </div>
        `,
        ajaxLikeAllPostsFromFeed: ``,
        watchReels: ``,
        likeAllMedia: ``,
        remove_follower: `
            <div class="form-group full-width">
                <label for="target_username">Target Username</label>
                <div class="input-with-action">
                    <input type="text" id="target_username" placeholder="e.g. unwanted_follower" required>
                    <button type="button" id="lookup_user_btn" class="icon-btn" title="Fetch Account ID from Instagram">🔍</button>
                </div>
            </div>
            <div class="form-group full-width">
                <label for="target_account_id">Account ID</label>
                <input type="text" id="target_account_id" placeholder="Will be auto-filled or enter manually" required>
            </div>
        `,
        block: `
            <div class="form-group full-width">
                <label for="target_username">Target Username</label>
                <div class="input-with-action">
                    <input type="text" id="target_username" placeholder="e.g. spam_account" required>
                    <button type="button" id="lookup_user_btn" class="icon-btn" title="Fetch Account ID from Instagram">🔍</button>
                </div>
            </div>
            <div class="form-group full-width">
                <label for="target_account_id">Account ID</label>
                <input type="text" id="target_account_id" placeholder="Will be auto-filled or enter manually" required>
            </div>
        `
    };

    function updateActionInputs(actionType) {
        actionInputsContainer.innerHTML = inputTemplates[actionType] || '';

        // Set up lookup button for follow/unfollow/remove_follower/block actions
        if (actionType === 'unfollow' || actionType === 'follow' || actionType === 'remove_follower' || actionType === 'block') {
            const lookupBtn = document.getElementById('lookup_user_btn');
            if (lookupBtn) {
                lookupBtn.addEventListener('click', fetchInstagramUserId);
            }
        }
    }

    // Fetch Instagram user ID from username
    async function fetchInstagramUserId() {
        const usernameInput = document.getElementById('target_username');
        const accountIdInput = document.getElementById('target_account_id');
        const lookupBtn = document.getElementById('lookup_user_btn');

        const username = usernameInput?.value?.trim();
        if (!username) {
            alert(gbGetMessage('AlertPleaseEnterUsernameFirst'));
            return;
        }

        // Show loading state
        const originalText = lookupBtn.textContent;
        lookupBtn.textContent = '⏳';
        lookupBtn.disabled = true;

        try {
            const profile = await getUserInfoFromGraphQL(username);
            const userId = profile && profile.id;

            if (userId) {
                accountIdInput.value = userId;
                showToast(`Found ID: ${userId}`);
            } else {
                throw new Error('Could not extract user ID');
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
            alert(gbGetMessage('AlertCouldNotFetchUserId'));
        } finally {
            lookupBtn.textContent = originalText;
            lookupBtn.disabled = false;
        }
    }

    // Initialize with default action type
    updateActionInputs('unfollow');

    let hideCompleted = typeof gblOptions !== 'undefined' ? !gblOptions.showCompletedActions : false;
    const toggleCompletedCb = document.getElementById('toggle-completed-cb');
    let filterByAccount = typeof gblOptions !== 'undefined' ? !!gblOptions.filterByCurrentAccount : false;
    const toggleAccountCb = document.getElementById('toggle-account-cb');
    if (toggleCompletedCb) toggleCompletedCb.checked = hideCompleted;
    if (toggleAccountCb) toggleAccountCb.checked = filterByAccount;

    const getCurrentIgUsername = () => {
        const input = document.getElementById('ig_username');
        return input ? input.value.trim().toLowerCase() : '';
    };

    const buildActionsQueueAjaxExtraParams = () => {
        const ign = encodeURIComponent(document.getElementById('ig_username')?.value || '');
        let params = 'ign=' + ign + '&include_counts=1';
        if (hideCompleted) params += '&exclude_completed=1';
        if (filterByAccount) {
            const cur = getCurrentIgUsername();
            if (cur) params += '&ig_username=' + encodeURIComponent(cur);
        }
        return params;
    };

    const buildActionQueueRowElement = (action) => {
        const row = document.createElement('tr');
        let dateDisplay = 'Invalid Date';
        if (action.scheduledTime) {
            const timestamp = Number(action.scheduledTime);
            const dateObj = new Date(timestamp);
            if (!isNaN(dateObj.getTime())) {
                dateDisplay = dateObj.toLocaleString();
            }
        }
        const repeatLabel = action.repeat === 'daily' ? '<span class="repeat-tag">Daily</span>' : '<span class="repeat-none-muted">None</span>';
        const targetLink = action.payload && action.payload.username ?
            `<a href="https://www.instagram.com/${encodeURIComponent(action.payload.username)}/" target="_blank" class="action-target-ig-link">@${escapeHtml(action.payload.username)}</a>` : '<span class="action-target-placeholder">-</span>';
        const hasPopoverHover = payloadHasPopoverContent(action.payload);
        const wrapOpen = hasPopoverHover
            ? `<span class="target-cell-wrapper" data-action-id="${escapeHtml(action.id)}">`
            : '<span class="target-cell-wrapper">';
        const targetDisplay = `${wrapOpen}${targetLink}</span>`;
        const statusClass = action.status === 'completed' ? 'status-completed' : 'status-badge';
        const statusLabel = action.status === 'completed' ? 'Completed' : 'Waiting';
        row.dataset.status = action.status || 'pending';
        row.dataset.igUsername = action.ig_username || '';
        row.innerHTML = `
            <td><input type="checkbox" class="action-checkbox" data-action-id="${escapeHtml(action.id)}" /></td>
            <td class="account-info">${escapeHtml(action.ig_username)}</td>
            <td>${targetDisplay}</td>
            <td><span class="type-tag">${escapeHtml(action.type)}</span></td>
            <td>${escapeHtml(dateDisplay)}</td>
            <td>${repeatLabel}</td>
            <td><span class="${statusClass}">${statusLabel}</span></td>
            <td class="action-buttons-cell">
                <button class="secondary-btn edit-btn" data-edit-id="${escapeHtml(action.id)}">EDIT</button>
            </td>
            <td class="action-buttons-cell">
                <button class="delete-btn" data-delete-id="${escapeHtml(action.id)}">DELETE</button>
            </td>
        `;
        row.dataset.actionId = String(action.id);
        return row;
    };

    const wireActionQueueRowEvents = () => {
        actionsList.querySelectorAll('.edit-btn[data-edit-id]').forEach(btn => {
            btn.addEventListener('click', () => editAction(btn.dataset.editId));
        });
        actionsList.querySelectorAll('.delete-btn[data-delete-id]').forEach(btn => {
            btn.addEventListener('click', () => deleteAction(btn.dataset.deleteId));
        });
    };

    const guidParam = document.getElementById('user_guid').value;

    const reloadActionsQueue = () => {
        hideActionQueueFloatingPopover();
        if (!guidParam) {
            actionsQueueDbCounts = { total: 0, pending: 0, completed: 0 };
            actionsQueueServerMeta = null;
            lastFetchedActionsSnapshot = null;
            actionsById = new Map();
            refreshActionQueueHeaderStats();
            updateActionsQueueSelectedCount();
            actionsList.innerHTML = '<tr><td colspan="9" class="actions-queue-empty-row">' + gbGetMessage('ActionsQueueNeedGuid') + '</td></tr>';
            return;
        }
        const $table = $(selActionsTable);
        if ($table.length && $table[0].config && $table[0].config.pager && $table[0].config.pager.ajax) {
            $table.trigger('pagerUpdate');
        }
    };

    const fetchActions = reloadActionsQueue;

    // Toggle Scheduler Sidebar
    const toggleSchedulerBtn = document.getElementById('btn-toggle-scheduler');
    const container = document.getElementById('divScheduledActions');

    growbotApplyActionsSchedulerExpandedPref();

    if (toggleSchedulerBtn && container) {
        toggleSchedulerBtn.addEventListener('click', () => {
            container.classList.toggle('scheduler-hidden');
            const isHidden = container.classList.contains('scheduler-hidden');

            if (isHidden) {
                toggleSchedulerBtn.textContent = '+';
                toggleSchedulerBtn.classList.remove('secondary-btn');
                toggleSchedulerBtn.title = 'Show Scheduler';
            } else {
                toggleSchedulerBtn.textContent = '>>';
                toggleSchedulerBtn.classList.add('secondary-btn');
                toggleSchedulerBtn.title = 'Hide Scheduler';
            }
            if (typeof gblOptions !== 'undefined') {
                gblOptions.actionsSchedulerExpanded = !isHidden;
                if (typeof saveOptions === 'function') saveOptions();
            }
        });
    }

    toggleCompletedCb && toggleCompletedCb.addEventListener('change', () => {
        hideCompleted = toggleCompletedCb.checked;
        const $t = $(selActionsTable);
        if ($t.length && $t[0].config && $t[0].config.pager && $t[0].config.pager.ajax) {
            $t.trigger('pagerUpdate', 1);
        }

        if (typeof gblOptions !== 'undefined') {
            gblOptions.showCompletedActions = !hideCompleted;
            if (typeof saveOptions === 'function') {
                saveOptions();
            }
        }
    });

    toggleAccountCb && toggleAccountCb.addEventListener('change', () => {
        filterByAccount = toggleAccountCb.checked;
        const $t = $(selActionsTable);
        if ($t.length && $t[0].config && $t[0].config.pager && $t[0].config.pager.ajax) {
            $t.trigger('pagerUpdate', 1);
        }

        if (typeof gblOptions !== 'undefined') {
            gblOptions.filterByCurrentAccount = filterByAccount;
            if (typeof saveOptions === 'function') {
                saveOptions();
            }
        }
    });

    const igUsernameScheduledInput = document.getElementById('ig_username');
    if (igUsernameScheduledInput) {
        igUsernameScheduledInput.addEventListener('input', () => {
            refreshActionQueueHeaderStats();
        });
    }

    const $actionspaginationLimit = $(selActionsPageSize);

    const setupActionsQueueTable = () => {
        if ($actionspaginationLimit.length && typeof gblOptions !== 'undefined') {
            const saved = gblOptions.actionsPaginationLimit != null ? String(gblOptions.actionsPaginationLimit) : '100';
            $actionspaginationLimit.val(saved);
        }

        // Initialize tablesorter on actions table
        $(selActionsTable).tablesorter({
        theme: 'blue',
        widthFixed: true,
        showProcessing: true,
        headerTemplate: '{content}{icon}',
        headers: {
            // Column 0: Checkbox - no sorting, no filter
            0: { sorter: false, filter: false },
            // Column 1: Account - text sorter
            1: { sorter: 'text' },
            // Column 2: Target - text sorter
            2: { sorter: 'text' },
            // Column 3: Type - text sorter
            3: { sorter: 'text' },
            // Column 4: Scheduled For - text sorter (formatted date)
            4: { sorter: 'text' },
            // Column 5: Repeat - text sorter
            5: { sorter: 'text' },
            // Column 6: Status - text sorter
            6: { sorter: 'text' },
            // Column 7: Edit button - no sorting, no filter
            7: { sorter: false, filter: false },
            // Column 8: Delete button - no sorting, no filter
            8: { sorter: false, filter: false }
        },
        //sortList: [[4, 0]], // Default sort by Scheduled For ascending (now column 4)
        widgets: ['pager', 'zebra', 'filter', 'columns'],
        widgetOptions: {
            zebra: ['ui-widget-content even', 'ui-state-default odd'],
            columns: [],
            columns_tfoot: true,
            columns_thead: true,
            filter_columnFilters: true,
            filter_hideEmpty: true,
            filter_hideFilters: false,
            filter_ignoreCase: true,
            filter_liveSearch: true,
            filter_searchDelay: 300,
            filter_searchFiltered: true,
            filter_placeholder: { search: '', select: '' },
            filter_filteredRow: 'filtered',

            pager_ajaxUrl: server_url + 'api_actions.php?page={page}&size={size}&{sortList:col}&{filterList:fcol}',
            pager_customAjaxUrl: function (table, url) {
                if (!guidParam) return '';
                var sep = url.indexOf('?') >= 0 ? '&' : '?';
                return url + sep + buildActionsQueueAjaxExtraParams();
            },
            pager_ajaxObject: {
                dataType: 'json',
                type: 'GET',
                cache: false,
                beforeSend: function (xhr) {
                    var headers = getAuthHeaders();
                    Object.keys(headers).forEach(function (key) {
                        xhr.setRequestHeader(key, headers[key]);
                    });
                }
            },
            pager_ajaxProcessing: function (data) {
                hideActionQueueFloatingPopover();
                if (!data || data.error) {
                    actionsById = new Map();
                    lastFetchedActionsSnapshot = [];
                    applyActionsQueueServerMeta({ total: 0, pending: 0, completed: 0 });
                    refreshActionQueueHeaderStats();
                    updateActionsQueueSelectedCount();
                    return {
                        total: 0,
                        rows: $('<tr><td colspan="9" class="actions-queue-empty-row">Failed to load actions</td></tr>')
                    };
                }
                var rows = data.rows || data.actions || [];
                if (data.meta) applyActionsQueueServerMeta(data.meta);
                lastFetchedActionsSnapshot = rows;
                actionsById = new Map();
                var $rowSet = $();
                rows.forEach(function (action) {
                    if (action && action.id != null) actionsById.set(String(action.id), action);
                    $rowSet = $rowSet.add(buildActionQueueRowElement(action));
                });
                if (!rows.length) {
                    if (data.meta) applyActionsQueueServerMeta(data.meta);
                    else applyActionsQueueServerMeta({ total: 0, pending: 0, completed: 0 });
                    $rowSet = $('<tr><td colspan="9" class="actions-queue-empty-row">No actions found</td></tr>');
                }
                setTimeout(function () {
                    wireActionQueueRowEvents();
                    refreshActionQueueHeaderStats();
                    updateActionsQueueSelectedCount();
                }, 0);
                return {
                    total: Number(data.total) || rows.length,
                    rows: $rowSet
                };
            },

            // starting page of the pager (zero based index)
            pager_startPage: 0,
            // Page size from Actions Queue control only (gblOptions.actionsPaginationLimit), not Accounts/Media
            pager_size: gblOptions.actionsPaginationLimit || 100,
            // reset pager after filtering
            pager_pageReset: 0,
            // output string
            pager_output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',
            // update arrows at table extremes
            pager_updateArrows: true,
            // number of options in "go to page"
            pager_maxOptionSize: 20,
            // pager_savePages false: page size from gblOptions/chrome.storage only; true restores size from ts.storage and overwrote the select on refresh
            pager_savePages: true,
            pager_storageKey: 'tablesorter-actions-pager',
            // keep table height dynamic
            pager_fixedHeight: false,
            // don't count child rows
            pager_countChildRows: false,
            // Match Accounts Queue: false so pager uses hideRows; true breaks pageSize/hideRows (partial tbody).
            pager_removeRows: false,
            // css classes used by pager controls
            pager_css: {
                container: 'tablesorter-pager',
                errorRow: 'tablesorter-errorRow',
                disabled: 'disabled'
            },
            // selectors for actions pager controls (IDs avoid cross-talk with Accounts/Media .pagesize)
            pager_selectors: {
                container: '#actionspager',
                first: '.first',
                prev: '.prev',
                next: '.next',
                last: '.last',
                gotoPage: '.gotoPage',
                pageDisplay: '.pagedisplay',
                pageSize: '#actionspaginationLimit'
            }
        }
    });

    if ($(selActionsTable).length && $(selActionsTable)[0].hasInitialized && $actionspaginationLimit.length) {
        $(selActionsTable).trigger('pageSize', $actionspaginationLimit.val());

        $('#actionspaginationLimit option:selected').attr("selected", null);
        $('#actionspaginationLimit option[value="' + gblOptions.actionsPaginationLimit + '"]').attr("selected", "selected");
        $('#actions-table').trigger('pageSize', gblOptions.actionsPaginationLimit);

    }

    if ($actionspaginationLimit.length && typeof gblOptions !== 'undefined') {
        $actionspaginationLimit
            .off('change.actionsQueuePageSize')
            .on('change.actionsQueuePageSize', function () {
                var v = $(this).val();
                gblOptions.actionsPaginationLimit = v;
                if (typeof saveOptions === 'function') {
                    saveOptions();
                }
                var $aq = $(selActionsTable);
                if ($aq.length && $aq[0].hasInitialized) {
                    $aq.trigger('pageSize', v);
                }
            });
    }

    const $actionsTable = $(selActionsTable);
    $actionsTable.on('filterEnd pagerComplete', function () {
        refreshActionQueueHeaderStats();
        updateActionsQueueSelectedCount();
    });
    $actionsTable.on('change', function (e) {
        if (e.target && e.target.classList && e.target.classList.contains('action-checkbox')) {
            updateActionsQueueSelectedCount();
        }
    });
    };

    // Handle form submission
    actionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const user_guid = document.getElementById('user_guid').value;
        const ig_username = document.getElementById('ig_username').value;
        const type = document.getElementById('type').value;
        const scheduledTime = new Date(document.getElementById('scheduledTime').value).getTime();

        // Build payload from dynamic inputs
        let payload = {};
        const actionType = type;

        if (actionType === 'follow') {
            payload.username = document.getElementById('target_username')?.value || '';
            payload.id = document.getElementById('target_account_id')?.value || '';
        } else if (actionType === 'unfollow') {
            payload.username = document.getElementById('target_username')?.value || '';
            payload.id = document.getElementById('target_account_id')?.value || '';
        } else if (actionType === 'like') {
            payload.post_url = document.getElementById('post_url')?.value || '';
        } else if (actionType === 'comment') {
            payload.post_url = document.getElementById('post_url')?.value || '';
            payload.comment_text = document.getElementById('comment_text')?.value || '';
        } else if (actionType === 'story_view') {
            payload.username = document.getElementById('story_username')?.value || '';
        } else if (actionType === 'switch_account') {
            payload.username = document.getElementById('switch_to_username')?.value || '';
            payload.password = document.getElementById('switch_to_password')?.value || '';
        } else if (actionType === 'remove_follower') {
            payload.username = document.getElementById('target_username')?.value || '';
            payload.id = document.getElementById('target_account_id')?.value || '';
        } else if (actionType === 'block') {
            payload.username = document.getElementById('target_username')?.value || '';
            payload.id = document.getElementById('target_account_id')?.value || '';
        }
        // load_feed, watch_reels, like_media_queue don't need payload

        const edit_id = document.getElementById('editing_id').value;

        try {
            const response = await fetch(`${server_url}actions.php`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    id: edit_id || undefined,
                    ig_username,
                    type,
                    payload,
                    scheduledTime,
                    repeat: document.getElementById('repeatDaily').checked ? 'daily' : 'none'
                })
            });

            if (response.ok) {
                showToast(edit_id ? 'Action updated!' : 'Action scheduled!');
                resetForm();
                fetchActions();
            } else {
                const error = await response.json();
                alert(gbGetMessage('AlertErrorPrefix', [error.error]));
            }
        } catch (error) {
            console.error('Error scheduling action:', error);
            alert(gbGetMessage('AlertFailedToScheduleAction'));
        }
    });

    // Programmatic API for scheduling actions from other parts of the program
    window.scheduleAction = async function ({ user_guid, ig_username, type, payload = {}, scheduledTime, repeat = 'none' }) {
        try {
            const response = await fetch(`${server_url}actions.php`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    ig_username,
                    type,
                    payload,
                    scheduledTime,
                    repeat
                })
            });

            if (response.ok) {
                const result = await response.json();
                // fetchActions(); // Refresh the list
                return { success: true, data: result };
            } else {
                const error = await response.json();
                return { success: false, error: error.error };
            }
        } catch (error) {
            console.error('Error scheduling action:', error);
            return { success: false, error: 'Failed to schedule action. Is the server running?' };
        }
    };

    /**
     * Send operations to batch.php in chunks of 50.
     * @param {Array} operations - Array of batch operation objects
     * @returns {Promise<{succeeded: number, failed: number, results: Array}>}
     */
    const BATCH_CHUNK_SIZE = 50;
    async function sendBatch(operations, progressOpts) {
        progressOpts = progressOpts || {};
        const onProgress = progressOpts.onProgress;
        let totalSucceeded = 0;
        let totalFailed = 0;
        const allResults = [];
        const totalOps = operations.length;

        for (let i = 0; i < operations.length; i += BATCH_CHUNK_SIZE) {
            const chunk = operations.slice(i, i + BATCH_CHUNK_SIZE);
            try {
                const response = await fetch(`${server_url}batch.php`, {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify({ operations: chunk })
                });
                if (response.ok) {
                    const data = await response.json();
                    totalSucceeded += data.succeeded || 0;
                    totalFailed += data.failed || 0;
                    if (data.results) allResults.push(...data.results);
                } else {
                    totalFailed += chunk.length;
                    var errText = '';
                    try { errText = await response.text(); } catch (e) { /* ignore */ }
                    var errMsg = 'Batch request failed (HTTP ' + response.status + ')';
                    try {
                        var errJson = JSON.parse(errText);
                        if (errJson && errJson.error) errMsg += ': ' + errJson.error;
                    } catch (e) {
                        if (errText) errMsg += ': ' + errText.substring(0, 200);
                    }
                    if (typeof outputMessage === 'function') outputMessage(errMsg);
                    console.error('Batch chunk failed:', errText);
                }
            } catch (error) {
                totalFailed += chunk.length;
                if (typeof outputMessage === 'function') outputMessage(gbGetMessage('LogBatchRequestError', [error && error.message ? error.message : String(error)]));
                console.error('Batch chunk error:', error);
            }
            if (onProgress) {
                const done = Math.min(i + BATCH_CHUNK_SIZE, operations.length);
                onProgress(done, totalOps);
            }
        }

        if (totalFailed > 0 && allResults.length > 0) {
            var firstErr = allResults.find(function (r) { return r && r.success === false && r.error; });
            if (firstErr) {
                if (typeof outputMessage === 'function') outputMessage(gbGetMessage('LogBatchErrorDetail', [firstErr.error]));
            }
        }

        return { succeeded: totalSucceeded, failed: totalFailed, results: allResults };
    }

    /**
     * Batch-schedule multiple actions at once.
     * @param {Array} actions - Array of {ig_username, type, payload, scheduledTime, repeat} objects
     * @param {{ progressLabel?: string }} [options]
     * @returns {Promise<{succeeded: number, failed: number, results: Array}>}
     */
    window.scheduleBatch = async function (actions, options) {
        options = options || {};
        const operations = actions.map(a => ({
            op: 'insert',
            ig_username: a.ig_username,
            type: a.type,
            payload: a.payload || {},
            scheduledTime: a.scheduledTime,
            repeat: a.repeat || 'none'
        }));
        const label = options.progressLabel || 'Scheduling actions…';
        if (operations.length > 0) {
            growbotShowSchedulingBatchProgress(label);
            growbotSetSchedulingBatchProgress(0, operations.length);
        }
        try {
            return await sendBatch(operations, {
                onProgress: function (done, total) {
                    growbotSetSchedulingBatchProgress(done, total);
                }
            });
        } finally {
            growbotHideSchedulingBatchProgress();
        }
    };

    /**
     * Reschedule all actions of a specific type for a user/account combo.
     * @param {string} type - Action type to reschedule (e.g., 'follow', 'like', 'switch_account')
     * @param {string} userGuid - The user's GUID
     * @param {string} igUsername - The Instagram username
     * @param {number} delayMs - Delay in milliseconds to push actions into the future
     * @returns {Promise<Object>} - API response with affected count
     */
    window.rescheduleActions = async function (type, userGuid, igUsername, delayMs) {
        const response = await fetch(`${server_url}api_actions.php`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                action: 'reschedule',
                type: type,
                ig_username: igUsername,
                delay_ms: delayMs
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to reschedule actions');
        }

        fetchActions(); // Refresh the list
        return response.json();
    };

    // Edit functionality
    const editAction = (id) => {
        const action = actionsById.get(String(id));
        if (!action) return;

        // Ensure scheduler is visible
        const container = document.getElementById('divScheduledActions');
        const toggleBtn = document.getElementById('btn-toggle-scheduler');
        if (container.classList.contains('scheduler-hidden')) {
            container.classList.remove('scheduler-hidden');
            if (toggleBtn) {
                toggleBtn.textContent = '>>';
                toggleBtn.classList.add('secondary-btn');
                toggleBtn.title = 'Hide Scheduler';
            }
        }

        // Populate fields
        document.getElementById('editing_id').value = action.id;
        document.getElementById('ig_username').value = action.ig_username;

        // Convert timestamp to local ISO string
        const date = new Date(Number(action.scheduledTime));
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        document.getElementById('scheduledTime').value = date.toISOString().slice(0, 16);

        // Selection logic for action type
        typeInput.value = action.type;
        typeOptions.forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === action.type);
        });

        // Update dynamic inputs for this action type
        updateActionInputs(action.type);

        // Populate dynamic fields from payload
        const payload = action.payload || {};
        if (action.type === 'follow') {
            const input = document.getElementById('target_username');
            if (input) input.value = payload.username || '';
        } else if (action.type === 'unfollow') {
            const usernameInput = document.getElementById('target_username');
            const idInput = document.getElementById('target_account_id');
            if (usernameInput) usernameInput.value = payload.username || '';
            if (idInput) idInput.value = payload.id || '';
        } else if (action.type === 'like') {
            const input = document.getElementById('post_url');
            if (input) input.value = payload.post_url || '';
        } else if (action.type === 'comment') {
            const postInput = document.getElementById('post_url');
            const commentInput = document.getElementById('comment_text');
            if (postInput) postInput.value = payload.post_url || '';
            if (commentInput) commentInput.value = payload.comment_text || '';
        } else if (action.type === 'story_view') {
            const input = document.getElementById('story_username');
            if (input) input.value = payload.username || '';
        } else if (action.type === 'switch_account') {
            const usernameInput = document.getElementById('switch_to_username');
            const passwordInput = document.getElementById('switch_to_password');
            if (usernameInput) usernameInput.value = payload.username || '';
            if (passwordInput) passwordInput.value = payload.password || '';
        } else if (action.type === 'remove_follower' || action.type === 'block') {
            const usernameInput = document.getElementById('target_username');
            const idInput = document.getElementById('target_account_id');
            if (usernameInput) usernameInput.value = payload.username || '';
            if (idInput) idInput.value = payload.id || '';
        }
        // load_feed, watch_reels, like_media_queue don't need payload population

        document.getElementById('repeatDaily').checked = (action.repeat === 'daily');

        // UI state: Change button text
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.textContent = gbGetMessage('UpdateActionButton');
        submitBtn.style.background = 'linear-gradient(to right, var(--accent), var(--primary))';

        // Show cancel button
        document.getElementById('cancel-edit-btn').style.display = 'block';

        // Scroll to form
        document.querySelector('.schedule-card').scrollIntoView({ behavior: 'smooth' });
    };

    const resetForm = () => {
        // Preserve ig_username before reset
        const savedIgUsername = document.getElementById('ig_username').value;

        actionForm.reset();
        document.getElementById('editing_id').value = '';

        // Restore ig_username
        document.getElementById('ig_username').value = savedIgUsername;

        const submitBtn = document.getElementById('submit-btn');
        submitBtn.textContent = gbGetMessage('ScheduleActionButton');
        submitBtn.style.background = '';

        // Hide cancel button
        document.getElementById('cancel-edit-btn').style.display = 'none';

        // Reset default time
        document.getElementById('scheduledTime').value = growbotMsToDatetimeLocalValue(Date.now() + 5 * 60 * 1000);

        // Reset action type selection
        typeInput.value = 'unfollow';
        typeOptions.forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === 'unfollow');
        });
    };

    // Delete action
    const deleteAction = async (id) => {
        // Removed confirm() for better robustness

        console.log('Attempting to delete action:', id);
        try {
            const response = await fetch(`${server_url}api_actions.php`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ action: 'delete', id: id, ig_username: document.getElementById('ig_username').value })
            });

            if (response.ok) {
                showToast('Action deleted', 'danger');
                fetchActions();
            } else {
                const errorData = await response.json();
                console.error('Delete failed:', errorData);
                alert(gbGetMessage('AlertFailedToDeleteAction', [errorData.error || 'Unknown error']));
            }
        } catch (error) {
            console.error('Error deleting action:', error);
            alert(gbGetMessage('AlertErrorDeletingAction'));
        }
    };

    // Toast helper
    const showToast = (message, type = 'success') => {
        toast.textContent = message;
        toast.style.background = type === 'danger' ? 'var(--danger)' : 'var(--success)';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    };

    refreshBtn.addEventListener('click', fetchActions);
    document.getElementById('cancel-edit-btn').addEventListener('click', resetForm);

    // === BULK ACTION FUNCTIONS ===

    // Shift-click range selection for checkboxes (delegated; survives AJAX page reloads)
    let lastCheckedAction = null;
    let actionsQueueShiftClickBound = false;

    const eligibleActionQueueCheckboxes = () =>
        Array.from(document.querySelectorAll('#actions-list .action-checkbox')).filter(cb => {
            const tr = cb.closest('tr');
            return isActionQueueRowEligibleForSelection(tr);
        });

    const bindActionsQueueShiftClick = () => {
        if (actionsQueueShiftClickBound) return;
        actionsQueueShiftClickBound = true;
        actionsList.addEventListener('click', function (event) {
            const checkbox = event.target.closest('.action-checkbox');
            if (!checkbox || !actionsList.contains(checkbox)) return;
            const tr = checkbox.closest('tr');
            if (!isActionQueueRowEligibleForSelection(tr)) return;
            const eligible = eligibleActionQueueCheckboxes();
            if (event.shiftKey && lastCheckedAction && lastCheckedAction !== checkbox) {
                const currentIndex = eligible.indexOf(checkbox);
                const lastIndex = eligible.indexOf(lastCheckedAction);
                if (currentIndex >= 0 && lastIndex >= 0) {
                    const start = Math.min(currentIndex, lastIndex);
                    const end = Math.max(currentIndex, lastIndex);
                    for (let i = start; i <= end; i++) {
                        eligible[i].checked = true;
                    }
                }
            }
            lastCheckedAction = checkbox;
            updateActionsQueueSelectedCount();
        });
    };
    bindActionsQueueShiftClick();

    // Get array of selected action IDs
    const getSelectedIds = () => {
        const ids = [];
        document.querySelectorAll('#actions-list .action-checkbox:checked').forEach(cb => {
            const tr = cb.closest('tr');
            if (!isActionQueueRowEligibleForSelection(tr)) return;
            ids.push(cb.dataset.actionId);
        });
        return ids;
    };

    // Select all rows on the current page (server-side pager)
    const selectAll = () => {
        document.querySelectorAll('#actions-list .action-checkbox').forEach(cb => {
            const tr = cb.closest('tr');
            if (isActionQueueRowEligibleForSelection(tr)) cb.checked = true;
        });
        updateActionsQueueSelectedCount();
    };

    // Select None
    const selectNone = () => {
        document.querySelectorAll('#actions-list .action-checkbox').forEach(cb => {
            cb.checked = false;
        });
        updateActionsQueueSelectedCount();
    };

    // Invert selection on the current page only
    const invertSelection = () => {
        document.querySelectorAll('#actions-list .action-checkbox').forEach(cb => {
            const tr = cb.closest('tr');
            if (isActionQueueRowEligibleForSelection(tr)) cb.checked = !cb.checked;
        });
        updateActionsQueueSelectedCount();
    };

    // Delete Selected actions (batch)
    const deleteSelected = async () => {
        const ids = getSelectedIds();
        if (ids.length === 0) {
            alert(gbGetMessage('AlertNoActionsSelected'));
            return;
        }

        const operations = ids.map((id) => {
            const actionData = actionsById.get(String(id));
            const op = { op: 'delete', id };
            if (actionData && actionData.ig_username) op.ig_username = actionData.ig_username;
            return op;
        });
        const result = await sendBatch(operations);

        showToast(`Deleted ${result.succeeded} action(s)` + (result.failed ? ` (${result.failed} failed)` : ''), 'danger');
        fetchActions();
    };

    // Reschedule Selected actions by offset (batch)
    const rescheduleSelected = async () => {
        const ids = getSelectedIds();
        if (ids.length === 0) {
            alert(gbGetMessage('AlertNoActionsSelected'));
            return;
        }

        const days = parseInt(document.getElementById('reschedule-days').value) || 0;
        const hours = parseInt(document.getElementById('reschedule-hours').value) || 0;
        const mins = parseInt(document.getElementById('reschedule-mins').value) || 0;

        const offsetMs = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (mins * 60 * 1000);

        if (offsetMs === 0) {
            alert(gbGetMessage('AlertPleaseEnterTimeOffset'));
            return;
        }

        const operations = [];
        for (const id of ids) {
            const actionData = actionsById.get(String(id));
            if (!actionData) continue;

            const newScheduledTime = Number(actionData.scheduledTime) + offsetMs;

            operations.push({
                op: 'reschedule',
                id,
                scheduledTime: newScheduledTime,
                ig_username: actionData.ig_username
            });
        }

        const result = await sendBatch(operations);

        showToast(`Rescheduled ${result.succeeded} action(s)` + (result.failed ? ` (${result.failed} failed)` : ''));
        fetchActions();
    };

    // Redistribute Selected actions using scheduling config dialog (batch)
    const redistributeSelected = () => {
        const ids = getSelectedIds();
        if (ids.length === 0) {
            alert(gbGetMessage('AlertNoActionsSelected'));
            return;
        }

        // Collect selected pending actions
        const selectedActions = [];
        for (const id of ids) {
            const actionData = actionsById.get(String(id));
            if (!actionData || actionData.status === 'completed') continue;
            selectedActions.push(actionData);
        }

        if (selectedActions.length === 0) {
            alert(gbGetMessage('AlertNoPendingActionsSelectedRedistribute'));
            return;
        }

        // Show modal
        document.getElementById('redistribute-count').textContent = `${selectedActions.length} pending action(s) will be redistributed starting from now.`;
        const modal = document.getElementById('redistribute-modal');

        // Pre-populate from saved wizard settings
        const savedConfig = (typeof gblOptions !== 'undefined' && gblOptions.schedulingWizard) || {};
        const toTimeStr = (h) => {
            const hrs = Math.floor(h);
            const mins = Math.round((h - hrs) * 60);
            return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        };
        document.getElementById('redist-actions-per-day').value = savedConfig.actionsPerDay || 30;
        document.getElementById('redist-start-time').value = toTimeStr(savedConfig.startHour ?? 6);
        document.getElementById('redist-end-time').value = toTimeStr(savedConfig.endHour ?? 22);
        document.getElementById('redist-min-delay').value = savedConfig.minDelaySeconds || 300;
        const redistEven = document.getElementById('redist-schedule-evenly');
        if (redistEven) redistEven.checked = savedConfig.scheduleEvenly !== false;
        const redistAvgEl = document.getElementById('redist-avg-pending-per-day');
        if (redistAvgEl) {
            const pendAll = (lastFetchedActionsSnapshot || []).filter(a => a.status !== 'completed');
            const avgAll = growbotMeanPendingActionsPerDay(pendAll);
            redistAvgEl.textContent = avgAll != null
                ? ('Pending actions in this list average about ' + avgAll.toFixed(1) + ' per calendar day (all accounts).')
                : '';
        }

        modal.style.display = 'flex';

        // Confirm handler
        const confirmBtn = document.getElementById('btn-redist-confirm');
        const cancelBtn = document.getElementById('btn-redist-cancel');

        const cleanup = () => {
            modal.style.display = 'none';
            confirmBtn.removeEventListener('click', onConfirm);
            cancelBtn.removeEventListener('click', onCancel);
        };

        const onCancel = () => cleanup();

        const onConfirm = async () => {
            // Helper to parse HH:MM time string to fractional hours
            const parseTime = (val) => {
                const parts = val.split(':');
                return parseInt(parts[0]) + (parseInt(parts[1] || 0) / 60);
            };

            const scheduleEvenly = document.getElementById('redist-schedule-evenly')
                ? !!document.getElementById('redist-schedule-evenly').checked
                : true;
            const minDelaySeconds = parseInt(document.getElementById('redist-min-delay').value) || 300;
            const config = {
                actionsPerDay: parseInt(document.getElementById('redist-actions-per-day').value) || 30,
                startHour: parseTime(document.getElementById('redist-start-time').value || '06:00'),
                endHour: parseTime(document.getElementById('redist-end-time').value || '22:00'),
                minDelayMs: minDelaySeconds * 1000,
                scheduleEvenly
            };
            if (typeof gblOptions !== 'undefined') {
                const prevWizard = gblOptions.schedulingWizard || {};
                gblOptions.schedulingWizard = {
                    ...prevWizard,
                    actionsPerDay: config.actionsPerDay,
                    startHour: config.startHour,
                    endHour: config.endHour,
                    minDelaySeconds,
                    scheduleEvenly
                };
                if (typeof saveOptions === 'function') saveOptions();
            }
            cleanup();

            // Generate new timestamps
            const timestamps = redistGenerateTimestamps(config, selectedActions.length);

            // Build batch reschedule operations
            const operations = selectedActions.map((actionData, i) => ({
                op: 'reschedule',
                id: actionData.id,
                scheduledTime: timestamps[i],
                ig_username: actionData.ig_username
            }));

            const result = await sendBatch(operations);

            showToast(`Redistributed ${result.succeeded} action(s)` + (result.failed ? ` (${result.failed} failed)` : ''));
            fetchActions();
        };

        confirmBtn.addEventListener('click', onConfirm);
        cancelBtn.addEventListener('click', onCancel);
    };

    // Time distribution helpers (mirrors contentscript.js logic)
    function redistSnapToActiveWindow(timestamp, startHour, endHour) {
        const d = new Date(timestamp);
        const currentHours = d.getHours() + d.getMinutes() / 60;
        if (currentHours >= endHour) {
            d.setDate(d.getDate() + 1);
            d.setHours(Math.floor(startHour), Math.round((startHour % 1) * 60), 0, 0);
            return d.getTime();
        } else if (currentHours < startHour) {
            d.setHours(Math.floor(startHour), Math.round((startHour % 1) * 60), 0, 0);
            return d.getTime();
        }
        return timestamp;
    }

    function redistGenerateTimestamps(config, numActions) {
        const { actionsPerDay, startHour, endHour, minDelayMs, scheduleEvenly } = config;
        const useEvenWindow = scheduleEvenly !== false;
        let cursor = Date.now() + 1000;
        cursor = redistSnapToActiveWindow(cursor, startHour, endHour);

        const windowHours = endHour > startHour ? endHour - startHour : (24 - startHour + endHour);
        const windowMs = windowHours * 3600000;
        const evenSpacing = Math.floor(windowMs / actionsPerDay);
        const configuredBaseMs = (typeof gblOptions !== 'undefined' && gblOptions.timeDelay != null)
            ? gblOptions.timeDelay
            : 180000;
        const effectiveDelay = useEvenWindow
            ? Math.max(minDelayMs, evenSpacing)
            : Math.max(minDelayMs, configuredBaseMs);

        const countsPerDay = {};
        const timestamps = [];

        for (let i = 0; i < numActions; i++) {
            let dayKey = new Date(cursor).toISOString().slice(0, 10);
            let count = countsPerDay[dayKey] || 0;
            while (count >= actionsPerDay) {
                const d = new Date(cursor);
                d.setDate(d.getDate() + 1);
                d.setHours(Math.floor(startHour), Math.round((startHour % 1) * 60), 0, 0);
                cursor = d.getTime();
                dayKey = new Date(cursor).toISOString().slice(0, 10);
                count = countsPerDay[dayKey] || 0;
            }

            timestamps.push(cursor);
            countsPerDay[dayKey] = (countsPerDay[dayKey] || 0) + 1;

            const randomizedDelay = typeof getRandomizedTime === 'function'
                ? getRandomizedTime(effectiveDelay)
                : effectiveDelay;
            cursor += Math.round(randomizedDelay);
            cursor = redistSnapToActiveWindow(cursor, startHour, endHour);
        }

        return timestamps;
    }

    /**
     * Load Instagram usernames from server into the re-assign modal select.
     */
    async function loadIgAccountsIntoReassignSelect() {
        const select = document.getElementById('reassign-ig-select');
        const emptyHint = document.getElementById('reassign-accounts-empty');
        if (!select) return;

        if (emptyHint) {
            emptyHint.textContent = gbGetMessage('ReassignAccountsEmpty');
            emptyHint.style.display = 'none';
        }

        select.innerHTML = '<option value="">' + gbGetMessage('ReassignChooseAccount') + '</option>';

        try {
            const response = await fetch(`${server_url}user_ig_accounts.php`, {
                method: 'GET',
                headers: getAuthHeaders()
            });
            if (!response.ok) {
                var t = '';
                try { t = await response.text(); } catch (e) { /* ignore */ }
                if (typeof outputMessage === 'function') {
                    outputMessage(gbGetMessage('LogCouldNotLoadIgAccountsHttp', [String(response.status), (t ? ': ' + t.substring(0, 120) : '')]));
                }
                if (emptyHint) {
                    emptyHint.textContent = gbGetMessage('ReassignCouldNotLoadFromServer');
                    emptyHint.style.display = 'block';
                }
                return;
            }
            const data = await response.json();
            const list = data.ig_accounts || [];
            if (list.length === 0) {
                if (emptyHint) emptyHint.style.display = 'block';
            } else {
                list.forEach(function (row) {
                    const u = row && row.ig_username;
                    if (!u) return;
                    const opt = document.createElement('option');
                    opt.value = u;
                    opt.textContent = '@' + u;
                    select.appendChild(opt);
                });
            }
        } catch (err) {
            if (typeof outputMessage === 'function') {
                outputMessage(gbGetMessage('LogCouldNotLoadIgAccounts', [err && err.message ? err.message : String(err)]));
            }
            if (emptyHint) {
                emptyHint.textContent = gbGetMessage('ReassignCouldNotLoadConnection');
                emptyHint.style.display = 'block';
            }
        }
    }

    // Re-assign selected pending actions to another Instagram account (bulk)
    const reassignSelected = () => {
        const ids = getSelectedIds();
        if (ids.length === 0) {
            alert(gbGetMessage('AlertNoActionsSelected'));
            return;
        }

        const pendingSelected = [];
        for (const id of ids) {
            const actionData = actionsById.get(String(id));
            if (!actionData || actionData.status === 'completed') continue;
            pendingSelected.push(actionData);
        }

        if (pendingSelected.length === 0) {
            alert(gbGetMessage('AlertNoPendingActionsSelectedReassign'));
            return;
        }

        const countEl = document.getElementById('reassign-count');
        if (countEl) {
            countEl.textContent = pendingSelected.length + ' pending action(s) will be assigned to the Instagram account you choose.';
        }

        const modal = document.getElementById('reassign-modal');
        if (!modal) return;

        if (typeof modal.__reassignCleanup === 'function') {
            modal.__reassignCleanup();
        }

        loadIgAccountsIntoReassignSelect();

        modal.style.display = 'flex';

        const confirmBtn = document.getElementById('btn-reassign-confirm');
        const cancelBtn = document.getElementById('btn-reassign-cancel');

        const cleanup = () => {
            modal.style.display = 'none';
            modal.__reassignCleanup = null;
            if (confirmBtn) confirmBtn.removeEventListener('click', onConfirm);
            if (cancelBtn) cancelBtn.removeEventListener('click', onCancel);
        };
        modal.__reassignCleanup = cleanup;

        const onCancel = () => cleanup();

        const onConfirm = async () => {
            const select = document.getElementById('reassign-ig-select');
            const ig_username = select && select.value ? String(select.value).trim() : '';
            if (!ig_username) {
                alert(gbGetMessage('AlertChooseInstagramAccount'));
                return;
            }

            cleanup();

            const operations = pendingSelected.map((a) => ({
                op: 'reassign',
                id: a.id,
                ig_username
            }));

            const result = await sendBatch(operations);

            showToast(
                `Re-assigned ${result.succeeded} action(s)` + (result.failed ? ` (${result.failed} failed)` : '')
            );
            fetchActions();
        };

        if (confirmBtn) confirmBtn.addEventListener('click', onConfirm);
        if (cancelBtn) cancelBtn.addEventListener('click', onCancel);
    };

    // Event listeners for bulk action buttons
    document.getElementById('btn-select-all').addEventListener('click', selectAll);
    document.getElementById('btn-select-none').addEventListener('click', selectNone);
    document.getElementById('btn-invert-selection').addEventListener('click', invertSelection);
    document.getElementById('btn-delete-selected').addEventListener('click', deleteSelected);
    document.getElementById('btn-reassign-selected').addEventListener('click', reassignSelected);
    document.getElementById('btn-reschedule-selected').addEventListener('click', rescheduleSelected);
    document.getElementById('btn-redistribute-selected').addEventListener('click', redistributeSelected);

    // Expose functions for external access (e.g. from contentscript.js after login)
    window.fetchActions = fetchActions;
    window.refreshActionsToken = initAuthToken;

    ensureActionsQueuePopoverHost();

    // Initial load — wait for auth token before initializing AJAX pager
    initAuthToken().then(() => setupActionsQueueTable());
}