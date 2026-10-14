/* 	Version 1.5.0 
	Manifest V3 migration https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/
	Migrating from background to service workers: https://developer.chrome.com/docs/extensions/mv3/migrating_to_service_workers/
	
	1. We can't use global variables. So either put each variable in each 
	chrome addListener function or create a globals() function to be called 
	by each addListener function. (Ex: $GLOBALS = globals();)
	
	2. Before we could specify multiple background scripts in manifest.json. 
	We can only specify one service worker in manifest V3 so in background.js
	we have to use importScripts() inside addListener functions
	https://stackoverflow.com/questions/66406672/chrome-extension-mv3-modularize-service-worker-js-file
	Old: "background": {
  		"scripts": ["background.js", "license2020.js"] 
	},
	We should probably add a storage listener in background.js so we don't have to import storage.js.
	We do this with getAllStorageSyncData() function.
	
	3. Audio: Since service workers have no DOM or window elements we can't use new Audio()
	either. So we have to play the audio again in sr.js. But it doesn't play the first time.
	So we should play the beep as soon as sr.html is opened but silently. See:
	https://stackoverflow.com/questions/54047606/allow-audio-play-on-safari-for-chat-app
	Or use:
	chrome.windows.create({'url': 'audio.mp3', 'focused': false, 'state': 'minimized', 'width': 1, 'height': 1, } , 
	function(window) {
		
	});

	
	4. 	manifest.json --> "browser_action" is now "action".
		background.js --> "browserAction is now "action".
		
	5. 	tabs.executeScript() is replaced with scripting.executeScript()
		manifest.json must have: "permissions": ["scripting"],
		https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879
		
	6. Workers no longer provide XMLHttpRequest, but instead support the more modern fetch()
	so we have to change the way the license is retrieved.
	
	7. New 'host_permissions" for URLs instead of in "permissions":
	"host_permissions": [
		"*://www.seabreezecomputers.com/*",
		"*://seabreezecomputers.com/*",
		"*://192.168.1.5/*",
		"<all_urls>"
	],
	
	

*/
/*var test_mode = ('update_url' in chrome.runtime.getManifest()) ? false : true; // If loaded from Web Store instead of local folder than getManifest has update_url property
var running_script = "background";
var tab_id = false;
*/

// Listen to message from content script
chrome.runtime.onMessage.addListener(
	function listen_to_content(obj, sender, sendResponse) {
		var tab_id = sender.tab.id; // Get id of sender // Version 1.5.0 - Manifest V3
		var test_mode = ('update_url' in chrome.runtime.getManifest()) ? false : true; // If loaded from Web Store instead of local folder than getManifest has update_url property // Version 1.5.0 - Added to this function

		if (test_mode) console.log(obj);
    	
		if (obj.hasOwnProperty("color") && !obj.hasOwnProperty("color_msg")) // Version 1.4.9
    	{
			chrome.action.getBadgeText({tabId: tab_id}, function(result) {
				if (!result) result = "C"; // Let user know they changed the color
				chrome.action.setBadgeText({ text: result, tabId: tab_id});
			});
    	}
		if (obj.hasOwnProperty("background-color") && !obj.hasOwnProperty("bgcolor_msg")) // Version 1.4.9
    	{
			if (obj["background-color"] == "reset")
				obj["background-color"] = [26, 116, 235, 100]; // Default badge color
			chrome.action.getBadgeText({tabId: tab_id}, function(result) {
				if (!result) result = "B"; // Let user know they changed the background-color
				chrome.action.setBadgeText({ text: result, tabId: tab_id});
				chrome.action.setBadgeBackgroundColor({ color: obj["background-color"], tabId: tab_id});
			});
    	}
		if (obj.hasOwnProperty("font-family")) // Version 1.4.9
    	{
			chrome.action.getBadgeText({tabId: tab_id}, function(result) {
				if (test_mode) console.log(result);
				if (!result) result = "F"; // Let user know they changed the font-family
				if (result == "F" && obj["font-family"] == "Default Font")
					result = "";
				chrome.action.setBadgeText({ text: result, tabId: tab_id});
			});
    	}
		if (obj.hasOwnProperty("font_times")) 
    	{
			var font_times = obj["font_times"];
			chrome.action.getBadgeText({tabId: tab_id}, function(result) { // Version 1.4.9 - Added to font_times because getBadgeText async for color above was overriding font_times below
				chrome.action.setBadgeText({ text: font_times + "X", tabId: tab_id});
			});			
    	}
    	// Version 1.3.6 - Making ALT+ ALT- and ALT-Bkspace adjust main doc and iFrame in content script (fontsize.js) without clicking on iFrame
    	if (obj.hasOwnProperty("button"))  {
    		if (obj["button"] == "up") send_to_content({ "button" : "up" }); 
			else if (obj["button"] == "down") send_to_content({ "button" : "down" }); 
    		else if (obj["button"] == "default") send_to_content({ "button" : "default" }); 	
    	}
		if (obj.hasOwnProperty("command")) // Version 1.3.7f
			{
				var option = obj.option || null;
				if (window[obj.command]) 
					window[obj.command](option);		
			}
    	
    	
      	sendResponse({farewell: "From background: I got the object."});
  });


function send_to_content(obj)
{
	var test_mode = ('update_url' in chrome.runtime.getManifest()) ? false : true; // If loaded from Web Store instead of local folder than getManifest has update_url property // Version 1.5.0 - Added to this function
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		if (test_mode) console.log(tabs);
		chrome.tabs.sendMessage(tabs[0].id, obj, function(response) {
			if (test_mode) console.log(response);
	    	if (typeof response === "undefined") {
				
				// Version 1.5.0 - Injecting here not needed since injecting on every tab in onInstalled.addListener
				/*chrome.scripting.executeScript(
				{ // Version 1.5.0 - Manifest V3
			
				  target: {tabId: tabs[0].id, allFrames: true},
				  files: ['storage.js', 'fontsize2.js'],
				}, function() {
					if (chrome.runtime.lastError) {
						console.log(chrome.runtime.lastError.message);
					}
					else
					{
						setTimeout(function(){ 
							send_to_content(obj); // Then call send_to_content(obj) again after content.js injected
						}, 200);
					}
				});*/
				
	    		/*chrome.tabs.executeScript(tabs[0].id, {file: "storage.js"}, function() {
				 	chrome.tabs.executeScript(tabs[0].id, {file: "fontsize2.js"}, function() {
	    				if (chrome.runtime.lastError) {
	        				console.error(chrome.runtime.lastError.message);
	    				}
	    				else
	    				{
	    					setTimeout(function(){ 
								send_to_content(obj); // Then call send_to_content(obj) again after content.js injected
							}, 200);
	    				}
	    			});
				});*/
			}		
	  	});
  	});
}


// Version 1.3.2
chrome.commands.onCommand.addListener(function(command) { 
	var test_mode = ('update_url' in chrome.runtime.getManifest()) ? false : true; // If loaded from Web Store instead of local folder than getManifest has update_url property // Version 1.5.0 - Added to this function
	if (test_mode) console.log(command); // Version 1.5.0b
	
	if (command == "up") send_to_content({ "button" : "up" }); 
	else if (command == "down") send_to_content({ "button" : "down" }); 
	
});

// Version 1.3.0 - Listen for new tabs - https://stackoverflow.com/questions/46269675/override-the-chrome-new-tab-page-with-a-webpage
/* Version 1.3.0a - Removed because maybe this is why Google rep rejected the update. Or maybe the onUpdated function below it.
	I don't know though because they never told me. Just that single purpose policy was violated. 
	webstore support emailed replied 22 hours later and said this was the problem. */
/*chrome.tabs.onCreated.addListener(function (tab) {
	//console.log(tab.url); // Display new tab url
	if (tab.url === 'chrome://newtab/') { 
		chrome.tabs.update(tab.id, {"url":"https://www.google.com/_/chrome/newtab"});	
		//Maybe this changed with a newtab override extension (in their manifest.json). Then there will be a history.back() available
		setTimeout(function(){ chrome.tabs.executeScript(tab.id,{"code": "window.history.back()"}); }, 550);
	}
});*/

// Version 1.3.0 - Listen for updated tabs (Home page button) - https://stackoverflow.com/questions/46269675/override-the-chrome-new-tab-page-with-a-webpage
/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	//console.log(tab); // Display new tab url
	if (tab.url === 'chrome://newtab/') { 
		chrome.tabs.update(tab.id, {"url":"https://www.google.com/_/chrome/newtab"});	
		//Maybe this changed with a newtab override extension (in their manifest.json). Then there will be a history.back() available
		//setTimeout(function(){ chrome.tabs.executeScript(tab.id,{"code": "window.history.back()"}); }, 550);
	}
});*/


// Version 1.3.0 - Check whether new version is installed and display notification
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
        //alert(JSON.stringify(details));
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        var extName = chrome.runtime.getManifest().name;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
        //alert(JSON.stringify(details));
        var string = "Updated from version " + details.previousVersion + " to version " + thisVersion + ".\n"+
        			"FEATURES:\n"+
        			"* Now you can use ALT+Up Arrow and ALT+Down Arrow to change text size."+ 
					" You can also change these hotkeys at:\n chrome://extensions/shortcuts";
        if (thisVersion == "1.3.2") alert(string);
    }
	
	/* Let's inject content.js on all tabs so that the user does not have refresh the tab to use the extension */
    chrome.tabs.query({}, function(tabs) { // Version 1.5.0 - Manifest V3
    	for(var i = 0; i < tabs.length; i++)
	    {
			chrome.scripting.executeScript({ // Version 1.5.0 - Manifest V3
				target: {tabId: tabs[i].id, allFrames: true},
				files: ['fontsize2.js', 'storage.js'],
			}, function() {
				if (chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError.message);
				}
			});	
		}
	});
});


// Version 1.5.3 - https://developer.chrome.com/docs/extensions/develop/concepts/messaging#external-webpage
chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
		var info = {};
		if (sender.url.match(/seabreezecomputers\.com/i)) {
			if (request.info) {
				chrome.identity.getProfileUserInfo(null, function(userInfo) {
					console.log(userInfo);
					info = userInfo;
					sendResponse(info);
				});	
			}
		}
	}
);


/* Open a new tab using chrome.tabs
	chrome.tabs can only be used by background.js
*/
// Called when a user clicks on the browserAction icon in the toolbar
/*chrome.action.onClicked.addListener(function(tab) {
	chrome.tabs.create({"url": "http://seabreezecomputers.com/rater"});
}); */

//chrome.storage.local.clear(); // Erase all local storage

/*window.onload = function()
	{
		//wr_read_links();
		//loadXMLDoc("user_data=1");
		
	};
*/


