
/**
 * Retrieve object from Chrome's Local StorageArea
 * @param {string} key 
 */
 const getObjectFromLocalStorage = async function(key) {
	return new Promise((resolve, reject) => {
	  try {
		chrome.storage.local.get(key, function(value) {
		  resolve(value[key]);
		});
	  } catch (ex) {
		reject(ex);
	  }
	});
  };
  
  /**
   * Save Object in Chrome's Local StorageArea
   * @param {*} obj 
   */
  //let sampleObject = { 'key-one': 1, 'key-two': 'xyz'};
  //await saveObjectInLocalStorage(sampleObject);
  const saveObjectInLocalStorage = async function(obj) {
	return new Promise((resolve, reject) => {
	  try {
		chrome.storage.local.set(obj, function() {
		  resolve();
		});
	  } catch (ex) {
		reject(ex);
	  }
	});
  };
  
  /**
   * Removes Object from Chrome Local StorageArea.
   * @param {string or array of string keys} keys
   */
  const removeObjectFromLocalStorage = async function(keys) {
	return new Promise((resolve, reject) => {
	  try {
		chrome.storage.local.remove(keys, function() {
		  resolve();
		});
	  } catch (ex) {
		reject(ex);
	  }
	});
  };


var freemiumId = ["mjddjghhdehffbnbomginipijecjelac", "gokdpnhaggoioddclnnlpjfnkdinjjcc", "iagolejimhnpenigidfphbfdkgmemgok", "gifpiihfhpapfdgkmnbnmiagpclakafd", "migmbeklhhfnfklhpokmmdgnlgaglemk", "nolmjacmllkkikcfjdnmffdalmcefnpa", "agakbninagfbkobndjnaghpbiemkfehf", "necjknpajlpiafaaegodekhjbhlenkad", "pjalolgpofphncbpledfdkdnjmgefcbd", "pflenohdaoonjhkhonobmaklaogfhhgh", "pilidjfgfdojnfgifmmnomejpcgclkol", "kdmhbhkgfgppjncdikhfaddalaoolapg", "gmedoobhinlejhfneenhpfbcmlknebln", "hbbckbefjknkliojkaeokkhimhehmipd", "eieddbbjlpigfcbjijenobkhekpppfja", "bjlnijbamdpjicigddabclfghcpogoae", "ofmgkbfgpobaokfmpceoaahkaebajcok", "fllmlingdhohnanhkgfpidakgcphfjef", "jnbcidabjbnpkiakffjjjbpoemgnfpag", "chdhlpoclgfbehknopojmmgbelblhfdl", "jeiiplpkjiegdjcenninodfcedbgmdpp", "nlbnhijdmapeoephdniekfboafkgnkbc", "hljnchcaccmpghejjemhnnfcdfdckmnm", "ccjbgffbjdbnnpdnopghofogcfeopdmn", "dlkmlmfdiplfbolicmpmfllikpcjpkon"];

chrome.runtime.onStartup.addListener(async () => {
	//console.log("Browser started.");
	if (await getObjectFromLocalStorage('store.settings.extensionCurrentVersion') == null || await getObjectFromLocalStorage('store.settings.extensionUpdateVersion') == null){
		var thisVersion = chrome.runtime.getManifest().version;
		chrome.storage.local.set({ 'store.settings.extensionCurrentVersion': thisVersion }, function () { });
		chrome.storage.local.set({ 'store.settings.extensionUpdateVersion': thisVersion }, function () { });
	}
	var calledTabs = [0];
	chrome.storage.local.set({ 'calledTabs': JSON.stringify(calledTabs) }, function () { });
	chrome.storage.local.set({ 'showToasterOnStartup0': true }, function () { });
	chrome.storage.local.set({ 'showToasterOnStartup1': true }, function () { });
	chrome.storage.local.set({ 'showToasterOnStartup2': true }, function () { });
});

chrome.runtime.onSuspend.addListener(() => {
	//console.log('#############################');
	//console.log("Extension suspended.");
});

chrome.runtime.onRestartRequired.addListener(() => {
	//console.log('#############################');
	//console.log("Restart Required.");
});

chrome.runtime.onInstalled.addListener(async function(details){
	var thisVersion = chrome.runtime.getManifest().version;
    if(details.reason == "install"){
		var calledTabs = [0];
		chrome.storage.local.set({ 'calledTabs': JSON.stringify(calledTabs) }, function () { });
		chrome.storage.local.set({ 'firstRun': 'true'}, function () { });
		chrome.storage.local.set({ 'store.settings.extensionUpdateVersion': thisVersion}, function () { });
		chrome.storage.local.set({ 'store.settings.extensionCurrentVersion': thisVersion}, function () { });
    }else if(details.reason == "update"){
		chrome.storage.local.set({ 'store.settings.extensionUpdateVersion': thisVersion}, function () { });
    } else if(details.reason == "chrome_update" || details.reason == "shared_module_update"){
		//console.log('Other install events within the browser')
	}

	chrome.contextMenus.removeAll();
	chrome.contextMenus.create({
		id: 'EXT_RATE',
		title: 'Rate ' + chrome.runtime.getManifest().name + ' \u272C\u272C\u272C\u272C\u272C',
		contexts: ['action']
	});
	chrome.contextMenus.create({
		id: 'EXT_GOPREMIUM',
		title: 'Go Premium \u2764',
		contexts: ['action']
	});
	chrome.contextMenus.create({
		id: "EXT_ALL",
		title: "Open" + chrome.runtime.getManifest().name,
		contexts: ["all"]
	});
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    if (request.getTargetData){
        sendResponse({targetData: {}});
		var split = request.getTargetData.split("#");
		if(split.length  > 1){
			(async () => {
				var leftpos = parseInt(split[0]) - 420;
				if(leftpos < 0) leftpos = 0;

				const displayInfo = await getDislplayInfo();
				var availHeight = displayInfo[0].bounds.height;
				if(displayInfo[0].workArea != null) {
					availHeight = displayInfo[0].workArea.height;
				}
				var toppos = (availHeight - 600) / 2;		
				
				var windowDimensions = { width: 420, height: 600, left: Math.round(leftpos), top: Math.round(toppos) };
				var newURL = "popup.html";
				launchWindow(newURL, windowDimensions, false);
				
				var calledTabs = [];
				calledTabs = JSON.parse(await getObjectFromLocalStorage('calledTabs'));
				if(split.length > 2 && !calledTabs.includes(parseInt(split[2]))){
					calledTabs.push(parseInt(split[2]));
					chrome.storage.local.set({ 'calledTabs': JSON.stringify(calledTabs)}, function () { });
				}
			})();
		} else {
			//no position, open standart
			createWindow();
		}
    } else if(request.checkavailable){
		sendResponse({available: {}});
	}
});

function executeScriptClickemoji(clickemoji) {
	document.querySelectorAll('#configEmoji').forEach(el => el.remove());
	var target = document.querySelector("body");
	var newContent = '<div id="configEmoji">'+clickemoji+'<\/div>';
	target.insertAdjacentHTML('beforeend', newContent);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	
    if (message.showTutorial != undefined) {
		(async () => {
        if (await getObjectFromLocalStorage('firstRun') == "true") {
			sendResponse({ showTutorial: 1 });
            chrome.storage.local.set({ 'firstRun': 'false'}, function () { });
        } else {
			sendResponse({ showTutorial: -1 });
		}
		})();
		return true; //so i can use sendResponse later
    }
	
	switch (message.extensionUpdated){
		case "extensionUpdated":
			(async () => {
			if(await getObjectFromLocalStorage('store.settings.extensionCurrentVersion') != await getObjectFromLocalStorage('store.settings.extensionUpdateVersion')){
				sendResponse({ extensionUpdated: await getObjectFromLocalStorage('store.settings.extensionUpdateVersion') });
				var thisVersion = chrome.runtime.getManifest().version;
				chrome.storage.local.set({ 'store.settings.extensionUpdateVersion': thisVersion}, function () { });
				chrome.storage.local.set({ 'store.settings.extensionCurrentVersion': thisVersion}, function () { });
			} else {
				sendResponse({ extensionUpdated: "" });
			}
			})();
			return true; //so i can use sendResponse later
			break;
		default:
			break;
	}
	
	if (message.clickemoji !== undefined) {
		chrome.tabs.query({
						active: true, currentWindow: false
					}, async function(tabs) {
						//console.log(tabs);
						if (tabs != null) {
							var calledTabs = [];
							calledTabs = JSON.parse(await getObjectFromLocalStorage('calledTabs'));
							var intersection = tabs.filter(element => calledTabs.includes(element.id));
							if(intersection.length == 0){ //verify if any tab is on the calledTabs list
								intersection = [tabs[tabs.length -1]];
							}
							intersection.forEach(function(entry) {
								chrome.scripting.executeScript({target: {tabId: entry.id, allFrames: true},	func: executeScriptClickemoji, args: [message.clickemoji]}, function() {
									chrome.scripting.executeScript({target: {tabId: entry.id, allFrames: true},	files: ['content-emoji.js']});
								});
							});
						}
		});
    }
	
	switch (message.openNewWindow){
		case "openNewWindow":
			createWindow();
			break;
		default:
			break;
	}
	
    switch (message.supportUs) {
        case "supportUs":
            chrome.storage.sync.get("supportUsDate", async function (data) {
                //console.log("supportUsDate", data['supportUsDate']);
                var today = new Date();
                var serializedToday = JSON.stringify(today);
                if (data['supportUsDate'] == null) {
                    chrome.storage.sync.set({ 'supportUsDate': serializedToday }, function () { });
					sendResponse({ supportUs: -1 });
                } else {
                    var savedDate = new Date(JSON.parse(data['supportUsDate']));
                    var datesDiff = Date.dateDiff('d', savedDate, today);

                    chrome.storage.sync.get("supportUsCycle", async function (data) {
                        if (data['supportUsCycle'] == null) {
                            chrome.storage.sync.set({ 'supportUsCycle': 1 }, function () { });
							sendResponse({ supportUs: -1 });
                        } else {
                            //console.log("supportUsCycle", data['supportUsCycle']);
							//console.log("supportUsDate", datesDiff);
                            if (data['supportUsCycle'] == 1 && datesDiff >= 3 && await getObjectFromLocalStorage('showToasterOnStartup0'))
                            {
                                chrome.storage.sync.set({ 'supportUsCycle': 2 }, function () { });
                                chrome.storage.sync.set({ 'supportUsDate': serializedToday }, function () { });
                                sendResponse({ supportUs: 1 });
                            } else if (data['supportUsCycle'] == 2 && datesDiff >= 30 && await getObjectFromLocalStorage('showToasterOnStartup0')) {
								chrome.storage.sync.set({ 'supportUsCycle': 2 }, function () { });
                                chrome.storage.sync.set({ 'supportUsDate': serializedToday }, function () { });
                                sendResponse({ supportUs: 2 });
							} else {
								sendResponse({ supportUs: -1 });
							}
                        }
						chrome.storage.local.set({ 'showToasterOnStartup0': false }, function () { });
                    });
                }
            });
			return true; //so i can use sendResponse later
            break;
        default:
            break;
    }
	
    switch (message.remoteMessage) {
        case "remoteMessage":
			chrome.storage.sync.get("remoteMessageDate", async function (data) {
				//console.log("remoteMessageDate", data['remoteMessageDate']);
                var today = new Date();
                var serializedToday = JSON.stringify(today);
                if (data['remoteMessageDate'] == null) {
                    chrome.storage.sync.set({ 'remoteMessageDate': serializedToday }, function () { });
					chrome.storage.sync.set({ 'remoteMessageSID': "" }, function () { });
					sendResponse({ remoteMessage: "" });
                } else {
					var savedDate = new Date(JSON.parse(data['remoteMessageDate']));
                    var datesDiff = Date.dateDiff('d', savedDate, today);
					if (await getObjectFromLocalStorage('showToasterOnStartup1')){
						fetch('https://www.oinkandstuff.com/oink-remote/api/v1/RemoteMessage?app=EdgeGeneric')
						.then(response => response.json()).then((result) => {
							
								var jsonData = result;
								if(jsonData != null && jsonData.length > 0 && jsonData[0].result == "success"){
									var responsestring = [];
									for (var i = 0; i < jsonData[0].data.length; i++)
									{
										responsestring.push(jsonData[0].data[i].MESSAGE);
									}
									chrome.storage.sync.get("remoteMessageSID", function (data) {
										var storedId = data['remoteMessageSID'];

										if((storedId.toUpperCase() != jsonData[0].data[0].SID.toUpperCase() || jsonData[0].data[0].DURATION.toUpperCase() == "Perm".toUpperCase()) && (datesDiff >= 1)){ //Add datesDiff >= 6
											chrome.storage.sync.set({ 'remoteMessageSID': jsonData[0].data[0].SID }, function () { });
											sendResponse({ remoteMessage: responsestring });
										} else {
											sendResponse({ remoteMessage: "" });
										}
										chrome.storage.local.set({ 'showToasterOnStartup1': false }, function () { });
									});
								}
							
						}).catch(error => {
							console.log(error);
						});
					}
				}
			});
			return true; //so i can use sendResponse later
            break;
        default:
            break;
    }
	
	switch (message.informationNews) {
        case "informationNews":
			fetch('https://www.oinkandstuff.com/oink-remote/api/v1/RemoteMessage?app=EdgeNewsGeneric')
			.then(response => response.json()).then((result) => {
					var jsonData = result;
					if(jsonData != null && jsonData.length > 0 && jsonData[0].result == "success"){
						var responsestring = [];
						for (var i = 0; i < jsonData[0].data.length; i++)
						{
							responsestring.push(jsonData[0].data[i].MESSAGE);
						}
						sendResponse({ informationNews: responsestring });
					}
			}).catch(error => {
				console.log(error);
			});
			return true; //so i can use sendResponse later
            break;
        default:
            break;
    }
	
    switch (message.hasFreemiumActive) {
        case "status":
			var counter = 0, hit = 0, i = 0;
			for(i = 0; i < freemiumId.length; i++){
				//var port = chrome.runtime.connect(freemiumId[i],{});
				chrome.runtime.sendMessage(freemiumId[i], {checkavailable: true}, function(response) {
					counter++;
					if (response != null && response.available != null){
						hit++;
						//console.log('Installed');
					}
					if(counter == freemiumId.length){
						if(hit >= 2) sendResponse({ hasFreemiumActive: "true" });
						else sendResponse({ hasFreemiumActive: "false" });
					}
				});
			}
			return true; //so i can use sendResponse later
            break;
		case "freemiumAlert":
            chrome.storage.sync.get("freemiumAlertDate", async function (data) {
                var today = new Date();
                var serializedToday = JSON.stringify(today);
                if (data['freemiumAlertDate'] == null) {
                    chrome.storage.sync.set({ 'freemiumAlertDate': serializedToday }, function () { });
					sendResponse({ freemiumAlert: -1 });
                } else {
                    var savedDate = new Date(JSON.parse(data['freemiumAlertDate']));
                    var datesDiff = Date.dateDiff('d', savedDate, today);

                    chrome.storage.sync.get("freemiumAlertCycle", async function (data) {
                        if (data['freemiumAlertCycle'] == null) {
                            chrome.storage.sync.set({ 'freemiumAlertCycle': 1 }, function () { });
							sendResponse({ freemiumAlert: -1 });
                        } else {
                            if (data['freemiumAlertCycle'] == 1 && datesDiff >= 15 && await getObjectFromLocalStorage('showToasterOnStartup2'))
                            {
                                chrome.storage.sync.set({ 'freemiumAlertCycle': 2 }, function () { });
                                chrome.storage.sync.set({ 'freemiumAlertDate': serializedToday }, function () { });
                                sendResponse({ freemiumAlert: 1 });
                            } else if (data['freemiumAlertCycle'] == 2 && datesDiff >= 45 && await getObjectFromLocalStorage('showToasterOnStartup2')) {
								chrome.storage.sync.set({ 'freemiumAlertCycle': 2 }, function () { });
                                chrome.storage.sync.set({ 'freemiumAlertDate': serializedToday }, function () { });
                                sendResponse({ freemiumAlert: 2 });
							} else {
								sendResponse({ freemiumAlert: -1 });
							}
                        }
						chrome.storage.local.set({ 'showToasterOnStartup2': false }, function () { });
                    });
                };
            });
			return true; //so i can use sendResponse later
			break;
        default:
            break;
    }

	return true;
});

async function windowSize(sidebar, widebar) {

    var w = 420;
	if(widebar){
		w = 720;
	}
    var h = 600;

	const displayInfo = await getDislplayInfo();
	var availWidth = displayInfo[0].bounds.width;
	var availHeight = displayInfo[0].bounds.height;
	if(displayInfo[0].workArea != null) {
		availWidth = displayInfo[0].workArea.width;
		availHeight = displayInfo[0].workArea.height;
	}

    if (w > availWidth) {
        w = availWidth;
    }
    if (h > availHeight) {
        h = availHeight;
    }

    var left = Math.round(availWidth/2 - 210);
    var top = Math.round(availHeight/2 - 290);

    if (sidebar) {
        h = availHeight;
        top = 0;
    }

    return {
        width: w,
        height: h,
        left: left,
        top: top
    };
};

async function getDislplayInfo() {
	return new Promise(function (resolve, reject) {
		chrome.system.display.getInfo(function (displayInfo) {
			resolve(displayInfo);
		});
	});
}

async function createWindow() {
	var windowDimensions = await windowSize(false, false);
	var newURL = "popup.html";
	launchWindow(newURL, windowDimensions, false);
}

async function launchWindow(newURL, windowDimensions, isIncognitoWindow) {
	chrome.windows.create({ url: newURL, type: 'popup', incognito: isIncognitoWindow, width: windowDimensions.width, height: windowDimensions.height, left: windowDimensions.left, top: windowDimensions.top },
		function (chromeWindow) {
	});
}

/*#### Manage Notifications ####*/
function remoteNotification(startup){
	chrome.storage.sync.get("remoteNotificationDate", function (data) {
		var today = new Date();
		var serializedToday = JSON.stringify(today);
		if (data['remoteNotificationDate'] == null) {
			chrome.storage.sync.set({ 'remoteNotificationDate': serializedToday }, function () { });
			chrome.storage.sync.set({ 'remoteNotificationSID': "" }, function () { });
		} else {
			var savedDate = new Date(JSON.parse(data['remoteNotificationDate']));
			var datesDiff = Date.dateDiff('d', savedDate, today);

			fetch('https://www.oinkandstuff.com/oink-remote/api/v1/RemoteMessage?app=EdgeNotificationGeneric')
			.then(response => response.json()).then((result) => {
				var jsonData = result;
				if(jsonData != null && jsonData.length > 0 && jsonData[0].result == "success"){
					chrome.storage.sync.get("remoteNotificationSID", function (data) {
						var storedId = data['remoteNotificationSID'];

						if((startup == null && jsonData[0].data[0].STARTUP.toUpperCase() == "Boot".toUpperCase()) || (startup != null && jsonData[0].data[0].STARTUP.toUpperCase() == "Open".toUpperCase())){
							if((storedId.toUpperCase() != jsonData[0].data[0].SID.toUpperCase() || jsonData[0].data[0].DURATION.toUpperCase() == "Perm".toUpperCase()) && (datesDiff >= 1)){
								chrome.storage.sync.set({ 'remoteNotificationSID': jsonData[0].data[0].SID }, function () { });
								var title, message, url, icon = "";
								var res = jsonData[0].data[0].MESSAGE.split("|");
								for (var i = 0; i < res.length; i++) {
									if(i == 0) title = res[i];
									else if (i == 1) message = res[i];
									else if (i == 2) url = res[i];
									else if (i == 3) icon = res[i];
								}
								showNotification(title,message,url,icon);
							} else {
							}
						}
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
		}
	});
}

async function showNotification(title, message, url, icon, delay){
	if(title == null || title == "") title = chrome.runtime.getManifest().name;
	if(message == null || message == "") message = "Updated to v" + chrome.runtime.getManifest().version + ". Check this and other news on our Website.";
	if(url == null || url == "") url = "https://www.oinkandstuff.com";
	if(icon == null || icon == "") icon = "img/icon_128.png";
	if(delay == null) delay = 10000;
	
	var options = {
		type: "basic",
		title: title,
		message: message,
		iconUrl: icon
	}
	// create notification using url as id
	chrome.notifications.create(url, options, function(notificationId){ }); 
}

chrome.notifications.onClicked.addListener(function(notificationId) {
  chrome.tabs.create({url: notificationId});
});

//Check if there are new notifications
remoteNotification(null);

/*#### ContextMenu ####*/
chrome.contextMenus.onClicked.addListener(async function(info, tab) {
    if (info.menuItemId == "EXT_RATE") { // here's where you'll need the ID
        chrome.tabs.create({url: "https://microsoftedge.microsoft.com/addons/detail/" + chrome.runtime.id });
    } else if (info.menuItemId == "EXT_GOPREMIUM") { // here's where you'll need the ID
		chrome.tabs.create({url: "chrome-extension://" + chrome.runtime.id + "/options/indexPremium.html"});
	} else if (info.menuItemId == "EXT_ALL") { // here's where you'll need the ID
		createWindow();
		var calledTabs = [];
		calledTabs = JSON.parse(await getObjectFromLocalStorage('calledTabs'));
		if(!calledTabs.includes(tab.id)){
			calledTabs.push(tab.id);
			chrome.storage.local.set({ 'calledTabs': JSON.stringify(calledTabs)}, function () { });
		}
	} 
});

// datepart: 'w', 'd', 'h', 'm', 's'
Date.dateDiff = function (datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000
    };

    return Math.floor(diff / divideBy[datepart]);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
