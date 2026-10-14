chrome.action.onClicked.addListener(function(tab) {
    if (tab.url == 'chrome://newtab/' || tab.url == 'about:newtab' || tab.url == 'about:home') {
        chrome.tabs.update(tab.id, {url: 'https://insertlearning.com/v1/dashboard/'});
    }
    else {
        activateDocentEDU(tab.id, tab.url);
    }
});

chrome.webNavigation.onErrorOccurred.addListener(function(details) {
    let target = {
        tabId: details.tabId
    };
    if (details.url == 'https://insertlearning.com/v1/toolbar/bridge.php') {
        chrome.scripting.executeScript({
            target,
            func: () => docent.iframeBridge.useChromeExtension()
        });
    }
    else if (details.url.startsWith('https://accounts.google.com/o/oauth2/iframe') && details.url.includes(encodeURIComponent('insertlearning.com'))) {
        target.frameIds = [details.parentFrameId];
        chrome.scripting.executeScript({
            target,
            func: () => (typeof useExtensionForLogin == 'function') ? useExtensionForLogin() : (window.noCookies = 1)
        });
    }
    else if (details.url.startsWith('https://insertlearning.com/v1/video/')) {
        target.frameIds = [details.parentFrameId];
        chrome.scripting.executeScript({
            target,
            func: (oldUrl, newUrl) => $(`iframe[src="${oldUrl}"]`).attr('src', newUrl).css('display', ''),
            args: [details.url, chrome.runtime.getURL(details.url.replace('https://insertlearning.com/v1/video/', '/lib/iframe/video.html#'))]
        });
    }
});

chrome.webNavigation.onCommitted.addListener(function(details) {
    var regex = /#(docentedu|insertlearning)\b/g;
    if (regex.test(details.url)) {
        activateDocentEDU(details.tabId, details.url, details.frameId);
    }
    else if (details.url == tutorial[details.tabId]) {
        activateTutorial(details.tabId);
    }
    // Detect if tutorial link was opened in a new tab
    else if (!tutorial[details.tabId] && Object.values(tutorial).includes(details.url)) {
        function testReferrer() {
            var origins = ['https://www.okeebo.com', 'https://insertlearning.com'];
            var link = document.createElement('a');
            link.href = document.referrer;
            return origins.includes(link.origin);
        };
        chrome.scripting.executeScript({
            target: {
                tabId: details.tabId
            },
            func: testReferrer
        },
        results => {
            if (results[0].result) {
                activateTutorial(details.tabId);
            }
        });
    }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.url.indexOf('chrome') == 0) {
        return;
    }
    function newPage(url) {
        url = url.replace(location.hash, '').replace(location.search, '');
        if (typeof docent !== 'undefined' && $('.docent-iframe-bridge').attr('data-url') != url) {
            setTimeout(docent.iframeBridge, 1000);
        }
    };
    chrome.scripting.executeScript({
        target: {
            tabId: details.tabId,
            frameIds: [details.frameId]
        },
        func: newPage,
        args: [details.url]
    });
});

chrome.runtime.onInstalled.addListener(function(details) {
    var queryInfo = {
        active: true,
        url: 'https://chrome.google.com/webstore/*'
    };
    chrome.tabs.query(queryInfo, function(result) {
        if (result[0]) {
            chrome.tabs.update(result[0].id, {
                url: 'https://insertlearning.com/v1/?source=chrome-web-store'
            });
        }
    });
});

function activateDocentEDU(tabId, url, frameId) {
    let target = { tabId };
    if (frameId) {
       target.frameIds = [frameId];
    }
    let examplePageRegex = /^https?:\/\/(www\.okeebo|insertlearning)\.com\/(docent\-dev|v1)\/example\//;
    if (examplePageRegex.test(url)) {
        function initExample() {
            document.querySelector('.insertlearning-initializer').click();
        }
        chrome.scripting.executeScript({
            target,
            func: initExample
        });
        return;
    }
    function needsLoading() {
        return typeof docent === "undefined";
    }
    chrome.scripting.executeScript({
        target,
        func: needsLoading
    },
    results => {
        if (results[0].result) {
            chrome.scripting.insertCSS({
                target,
                files: [
                    '/lib/css/lato.css',
                    '/lib/css/font-awesome.css',
                    '/lib/css/docent.css'
                ]
            });
            chrome.scripting.executeScript({
                target,
                files: [
                    '/lib/js/jquery.min.js',
                    '/lib/js/jquery.textHighlighter.min.js',
                    '/lib/js/md5.js',
                    '/lib/js/docent.js',
                    '/lib/js/docent.emoji.js',
                    '/lib/js/twemoji.min.js'
                ]
            });
        }
        else {
            function refresh() {
                if ($.contains(document, docent.container[0])) {
                    docent.iframeBridge();
                }
                else {
                    docent.init();
                }
            }
            chrome.scripting.executeScript({
                target,
                func: refresh
            });
        }
    });
}

function activateTutorial(tabId) {
    let target = {
        tabId
    };
    chrome.scripting.insertCSS({
        target,
        files: [
            '/lib/css/lato.css',
            '/lib/css/tutorial.css'
        ]
    });
    chrome.scripting.executeScript({
        target,
        files: [
            '/lib/js/jquery.min.js',
            '/lib/js/tutorial.js'
        ]
    });
}

var tutorial = {};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == 'tutorial') {
        tutorial[sender.tab.id] = request.page;
    }
    else if (request.type == 'login') {
        chrome.permissions[request.interactive ? 'request' : 'contains']({
            permissions: [
                'identity'
            ]
        }, function(granted) {
            if (granted) {
                chrome.identity.getAuthToken({interactive: request.interactive, scopes: request.scopes }, sendResponse);
            }
            else {
                sendResponse();
            }
        });
        return true;
    }
    else if (request.type == 'relayFromIframeBridge') {
        chrome.webNavigation.getFrame({tabId: sender.tab.id, frameId: sender.frameId }, function(iframeBridge) {
            // Get the iframeBridge's parent rather than assume the parent is top-level
            chrome.tabs.sendMessage(sender.tab.id, request, {frameId: iframeBridge?.parentFrameId || 0 });
        });
    }
    else if (request.type == 'userType') {
        chrome.runtime.setUninstallURL(request.userType == 'teacher' ? 'https://insertlearning.com/removed/' : '');
    }
    else if (request.type == 'logout') {
        chrome.identity.getAuthToken({ 'interactive': false, scopes: request.scopes }, function(token) {
            if (chrome.runtime.lastError) {
                return;
            }
            chrome.identity.removeCachedAuthToken({token: token }, function() {
                console.log('Token removed from cache');
            });
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + token);
            xhr.onload = function() {
                console.log('Token revoked');
            };
            xhr.send();
        });
        sendResponse();
    }
    else if (request.type == 'getReadworksArticle') {
        fetch('https://dnmkr7tf85gze.cloudfront.net/data/p/' + request.uuid).then(response => response.json()).then(json => sendResponse(json));
        return true;
    }
});
