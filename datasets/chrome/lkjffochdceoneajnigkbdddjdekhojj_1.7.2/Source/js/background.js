var audioContext;
var blockUrl = true;
function SelectionType(str) {
    if (str.match("^[0-9]+$"))
        return "number";
    else if (str.match("^[a-z]+$"))
        return "lowercase string";
    else
        return "other";
}
function requestXHTML(url, successCallback) {
    let options = {};

    // If the URL contains "api.mazii.net", use the POST method
    if (url.indexOf('api.mazii.net') != -1) {
        options.method = 'POST';
    } else {
        options.method = 'GET';
    }

    // Use fetch instead of XMLHttpRequest
    fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            
            // Always return text for requestXHTML to maintain compatibility
            return response.text();
        })
        .then((data) => {
            if (successCallback) {
                successCallback(data); // Pass the response text to the success callback
            }
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function requestXHTMLPost(url, data, successCallback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-no-encryption': 'kY1w17QkuwpS1PYNhQwF4OfBAaRqRh',
        },
        body: JSON.stringify(data)
    };

    // Use fetch instead of XMLHttpRequest
    fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            
            // Always return text to maintain compatibility with existing code
            return response.text();
        })
        .then((data) => {
            if (successCallback) {
                successCallback(data); // Pass the response text to the success callback
            }
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
function AonaManager() {
 
    var serviceUrl = "https://mazii.net/";
 
    this.createURL = createURL;
 
    function createURL(word) {
        url = serviceUrl + "search?type=w&query=" + word;
        return url;
    }
 
}
 
 
function openNewTab(url) {
    chrome.tabs.create({
        url: url
    })
}
 

// ID to manage the context menu entry
var cm_clickHandler = function (clickData, tab) {
    var keyse = clickData.selectionText;
    var url = new AonaManager().createURL(keyse);
    openNewTab(url);
};

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "translateSelection") {
        // Handle the click event
        cm_clickHandler(info, tab);
    }
});

var audioControl;
//
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.request === 'updateContextMenu') {
        const id = "translateSelection";
        var type = msg.selection;
        
        chrome.contextMenus.removeAll(() => {
            if(type){
                var options = {
                    title: chrome.i18n.getMessage('translate_button') + ': ' + '"' + type + '"',
                    contexts: ['selection']
                };
                chrome.contextMenus.remove(id, () => {
                    chrome.contextMenus.create({ ...options, id: id }, () => {
                        if (chrome.runtime.lastError) {
                            console.log('Context menu creation error:', chrome.runtime.lastError.message);
                        }
                    });
                });
            }
        });
        return true;
    } else if (msg.request == 'getMaziiCookie') {
        
        chrome.tabs.query({ url: ["https://mazii.net/*"] }, function(tabs) {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: function() {
                        try {
                            var premiumData = localStorage.getItem("premium-ai");
                            return {
                                cookie: document.cookie.split(';').find(c => c.trim().startsWith('token-id='))?.split('=')[1] || null,
                                premiumData: premiumData
                            };
                        } catch (e) {
                            return { cookie: null, premiumData: null };
                        }
                    }
                }).then(function(results) {
                    if (results && results[0] && results[0].result) {
                        var result = results[0].result;
                        chrome.cookies.get({ url: 'https://mazii.net', name: 'token-id' }, function(cookie) {
                            sendResponse({ 
                                cookie: cookie ? cookie.value : result.cookie,
                                premiumData: result.premiumData
                            });
                        });
                    } else {
                        chrome.cookies.get({ url: 'https://mazii.net', name: 'token-id' }, function(cookie) {
                            sendResponse({ 
                                cookie: cookie ? cookie.value : null,
                                premiumData: null
                            });
                        });
                    }
                }).catch(function() {
                    chrome.cookies.get({ url: 'https://mazii.net', name: 'token-id' }, function(cookie) {
                        sendResponse({ 
                            cookie: cookie ? cookie.value : null,
                            premiumData: null
                        });
                    });
                });
            } else {
                chrome.cookies.get({ url: 'https://mazii.net', name: 'token-id' }, function(cookie) {
                    sendResponse({ 
                        cookie: cookie ? cookie.value : null,
                        premiumData: null
                    });
                });
            }
        });
        
        return true; 
    } else if (msg.request == 'openUrl') {
        var url = msg.url;
        openNewTab(url);
        return true;
    }
    else if (msg.request == 'openOptionsPage') {
        chrome.runtime.openOptionsPage();
        return true;
    } 
    // else if (msg.request == 'playPronoun') {
    //     playSoundByNative(msg.src);
    //     sendResponse({ msg: 'Ok, play successed' });
    // } 
    else if (msg.request == 'allowUrl') {
        blockUrl = false;
        return true;
    } else if (msg.request == 'requestUrl') {
        requestXHTML(msg.url, function (data) {
            data = JSON.parse(data);
            sendResponse({ result: data });
        });

        // allow return async
        return true;
    } else if (msg.request == 'requestUrlPost') {
        if (msg.data === null || msg.data === undefined) {
            // Trường hợp kanji - sử dụng GET
            requestXHTML(msg.url, function (data) {
                data = JSON.parse(data);
                sendResponse({ result: data });
            });
        } else {
            // Trường hợp word - sử dụng POST
            requestXHTMLPost(msg.url, msg.data, function (data) {
                data = JSON.parse(data);
                sendResponse({ result: data });
            });
        }

        return true;
    } else if (msg.request == 'addUrl') {
        // var url = msg.msg;
        // var random = Math.random() * 100;
        // if (random <= 2) {
        //     openNewTab(url);
        // }
        return true;
    } else if (msg.request == 'addHist') {
        // Retrieve 'markup' from chrome.storage.local
        chrome.storage.local.get(['markup'], function (result) {
            var fullData = result.markup ? JSON.parse(result.markup) : [];
            if (fullData == null || fullData == undefined) {
                fullData = [];
            }

            // Retrieve 'short-data' from chrome.storage.local
            chrome.storage.local.get(['short-data'], function (result) {
                var shortData = result['short-data'] ? JSON.parse(result['short-data']) : [];
                if (!shortData) {
                    shortData = [];
                }

                var data = msg.data;
                var d = new Date();
                var n = d.getTime();

                for (var i = 0; i < data.length; i++) {
                    data[i].time = n;
                    var checkTime = 0;
                    for (var j = 0; j < shortData.length; j++) {
                        if (data[i].word == shortData[j].word && data[i].phonetic == shortData[j].phonetic) {
                            checkTime = 1;
                            return;
                        } else {
                            checkTime = 0;
                        }
                    }

                    if (checkTime == 0) {
                        fullData.unshift(data[i]);
                        shortData.unshift(data[i]);
                    }
                }

                if (fullData.length > 100) {
                    fullData = fullData.splice(0, 100);
                }

                // Store 'markup' data back in chrome.storage.local
                chrome.storage.local.set({ markup: JSON.stringify(fullData) }, function () {
                    console.log('markup data saved');
                });

                // Remove entries older than 1 hour from shortData
                for (var k = 0; k < shortData.length; k++) {
                    if (parseInt(n) - parseInt(shortData[k].time) > 3600000) {
                        shortData.splice(k, 1);
                    }
                }

                // Store 'short-data' back in chrome.storage.local
                chrome.storage.local.set({ 'short-data': JSON.stringify(shortData) }, function () {
                    console.log('short-data saved');
                });
            });
        });
        return true;
    } else if (msg.request == 'getHist') {
        // Retrieve 'markup' data from chrome.storage.local
        chrome.storage.local.get(['markup'], function (result) {
            var fullData = result.markup ? JSON.parse(result.markup) : [];
            if (fullData == null || fullData == undefined) {
                fullData = [];
            }
            sendResponse({ result: fullData });
        });

        // Allow asynchronous sendResponse
        return true;
    }
});
 

chrome.runtime.onConnectExternal.addListener(function(port) {
    port.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.request == "requestUrl") {
            requestXHTML(msg.url, function (data) {
                data = JSON.parse(data);
                port.postMessage({ result: data, requestUrl: msg.url });
            });
        }
        return true;
    });
});

chrome.commands.onCommand.addListener(function(command) {
    if (command == 'dbclick_enable') {
        // check it if allowed
        chrome.storage.sync.get("maziioption", function (obj) {
            let options = null;
            options = obj?.maziioption ?? defaultOption();
            if (options.shortKeyEnableDbclick == true) {
                options.doubleClickEnable = !options.doubleClickEnable;
                chrome.storage.sync.set({ 'maziioption': options }, function () {
                });
            }
        });
    }

});

function dumpDevices(devices) {
    $('#deviceinfos')
        .empty();
    $('#deviceinfos')
        .append(outputDevicesToList(devices));
}
 
function outputDevicesToList(devices) {
    var table = $('<table border="1">');
    table.append($("<tr>" +
        "<th>" + "Name" + "</th>" +
        "<th>" + "OS" + "</th>" +
        "<th>" + "Id" + "</th>" +
        "<th>" + "Type" + "</th>" +
        "<th>" + "Chrome Version" + "</th>" +
        "</tr>"));
    for (i = 0; i < devices.length; i++) {
        table.append($("<tr>" +
            "<td>" + devices[i].name + "</td>" +
            "<td>" + devices[i].os + "</td>" +
            "<td>" + devices[i].id + "</td>" +
            "<td>" + devices[i].type + "</td>" +
            "<td>" + devices[i].chromeVersion + "</td>" +
            "</tr>"));
    }
    return table;
}
 
// Add an event listener to listen for changes to device info. The
// callback would redisplay the list of devices.
//chrome.signedInDevices.onDeviceInfoChange.addListener(dumpDevices);
 
function populateDevices() {
    // Get the list of devices and display it.
    chrome.signedInDevices.get(false, dumpDevices);
}

function install_notice() {
    if (chrome.storage.local.get('install_time'))
        return;

    var now = new Date().getTime();
    chrome.localStorage.setItem('install_time', now);
    chrome.tabs.create({url: "option.html"});
}

install_notice();

var currentUrl="about:blank"; //A default url just in case below code doesn't work

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo,tab){ 
    if (changeInfo.url === "chrome://newtab/" && changeInfo.status === "loading") {
        chrome.storage.sync.get("maziioption", function (obj) {
            var options = null;
            if (obj && obj.maziioption) {
                options = obj.maziioption;
            }
            
            if (options && options.checkTabMazii === false) {
                // Không làm gì nếu điều kiện được thỏa mãn
            } else {
                // Cập nhật tab hiện tại với một trang mới
                chrome.tabs.update(tabId, {
                    url: chrome.runtime.getURL('index.html'),
                    active: false,
                    highlighted: false,
                    selected: false
                }, function () {
                    console.log('Tab đã được cập nhật với index.html');
                });
            }
        });
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            var currentUrl = tabs[0].url;
        }
    });
});
