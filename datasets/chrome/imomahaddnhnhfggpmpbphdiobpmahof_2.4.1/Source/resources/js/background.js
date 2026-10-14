const extension_url = chrome.runtime.getURL('');
var img_files = [];

function httpPreload(img_url) {
    rawResponse = fetch(img_url, {method: 'get'});
    if (img_files.length > 0) {
        httpPreload(img_files.shift());
    }
}

function preloadImgs(imgs) {
    imgs = JSON.parse(imgs);
    for (var key in imgs) {
        if (imgs[key].indexOf('themes_pic_file') > 0) {
            img_files.push('https://youtube-skins.com' + imgs[key]);
        }
    }
    if (img_files.length > 0) {
        httpPreload(img_files.shift());
    }

}

chrome.runtime.onMessageExternal.addListener(
        function (request, sender, sendResponse) {
            if (request.action == 'install') {
                chrome.storage.local.get('skins').then(function (e) {
                    delete request.action;
                    skins = [];
                    if (e.skins !== undefined)
                        skins = e.skins;
                    preloadImgs(request.files);
                    skins.unshift(request);
                    chrome.storage.local.set({
                        skins: skins
                    });
                });
            }


            if (request.action == 'apply_skin') {

                chrome.storage.local.get('skins', function (e) {
                    for (var key in e.skins) {
                        if (e.skins[key].id == request.id) {
                            current_skin = e.skins[key];
                            chrome.storage.local.set({
                                current_skin: e.skins[key]
                            });
                            chrome.tabs.query({}, function (tabs) {
                                tabs.forEach(tb => {
                                    if (tb.url.indexOf('://extensions') < 1) {
                                        chrome.scripting.executeScript({
                                            target: {tabId: tb.id, allFrames: true},
                                            files: ['/resources/js/content.js', '/resources/js/main_content.js', '/resources/js/template.js']
                                        });
                                    }
                                });
                            });
                        }
                    }
                })
            }
            if (request.action == 'open_cursorland') {
                chrome.storage.local.get('cursorlandopened', function (e) {
                    if (!e.hasOwnProperty('cursorlandopened')) {
                        chrome.storage.local.set({cursorlandopened: true});
                        chrome.tabs.create({'url': 'https://cursor-land.com'});
                    }
                });
            }

            sendResponse({});
            return true;
        });




chrome.runtime.setUninstallURL('https://youtube-skins.com/feedback');


chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.storage.local.set({isOn: true});
        chrome.tabs.create({'url': 'https://youtube-skins.com/success'});
    } else if (details.reason == "update") {
        chrome.storage.local.get('fbzone', function (e) {
            if (!e.hasOwnProperty('fbzone')) {
                chrome.storage.local.set({fbzone: true});
                chrome.tabs.create({'url': 'https://chrome.google.com/webstore/detail/themes-for-facebook/oodajhdbojacdmkhkiafdhicifcdjoig'});
            }
        });
        chrome.storage.local.get('adskipper', function (e) {
            if (!e.hasOwnProperty('adskipper')) {
                chrome.storage.local.set({adskipper: true});
                chrome.tabs.create({'url': 'https://chromewebstore.google.com/u/2/detail/ad-skipper-for-youtube/gideponcmplkbifbmopkmhncghnkpjng'});
            }
        });        
    }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
{
    files = [];
    if (request.update_tab === "preloadskins") {
        files = ["/resources/js/preload_skins.js"];
    }
    if (request.update_tab === "update") {
        files = ["/resources/js/template.js", '/resources/js/main_content.js', "/resources/js/content.js"];
    } else if (request.update_tab === "onoff") {
        files = ["/resources/js/template.js", '/resources/js/onoff.js'];
    } else if (request.update_tab === "boostvolume") {
        files = ["/resources/js/boostvolume.js"];
    } else if (request.update_tab === "alwayshd") {
        files = ["/resources/js/content_init.js"];
    }

    chrome.tabs.query({}, function (tabs) {
        tabs.forEach(tb => {
            if (tb.url.indexOf('://extensions') < 1) {
                chrome.scripting.executeScript({
                    target: {tabId: tb.id, allFrames: false},
                    files
                });
            }
        });
    });

    return true;
});


chrome.tabs.onActivated.addListener(function (tabs) {
//    var day = new Date().getDay();

//    chrome.storage.local.get('day').then(function (old_day) {
//        if (!old_day.day) {
//            chrome.storage.local.set({'day': day});
//        } else {
//            if (old_day.day != day) {
//                (async () => {
//                    rawResponse = await fetch('https://youtube-skins.com/update/set', {
//                        method: 'POST'
//                    });
//                    content = await rawResponse.json();
//                })();
//                chrome.storage.local.set({'day': day});
//            }
//        }
//    });

    // ПРИБРАНО: реінжект скриптів при переключенні табів
    // Content scripts вже завантажуються через manifest.json
    // Це викликало подвійну ініціалізацію і проблеми з продуктивністю
    
    // chrome.tabs.get(tabs.tabId, function (tab) {
    //     if (tab.url.search('http') < 0)
    //         return;
    //     urls = ['youtube.com', 'www.youtube.com', 'youtube-skins.com', 'www.youtube-skins.com'];
    //     url = new URL(tab.url).hostname;
    //     if (urls.includes(url)) {
    //         chrome.scripting.executeScript({
    //             target: {tabId: tab.id, allFrames: true},
    //             files: ['/resources/js/template.js', '/resources/js/content.js', '/resources/js/main_content.js'],
    //         });
    //     }
    // });
});

