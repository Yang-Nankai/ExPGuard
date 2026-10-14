var test_mode = ('update_url' in chrome.runtime.getManifest()) ? false : true; // If loaded from Web Store instead of local folder than getManifest has update_url property
var running_script = "popup";
var tab_id = false;

/* Version 1.2.4 */
var font_list = [
"Default Font",
"Arial", 
"Helvetica", 
"sans-serif", 
"Tahoma", 
"Trebuchet MS", 
"Verdana", 
"Lucida Sans Unicode", 
"Impact", 
"Arial Black", 
"Comic Sans MS", 
"cursive", 
"Courier", 
"Courier New", 
"monospace", 
"Lucida Console", 
"Book Antiqua", 
"Bookman Old Style", 
"Georgia", 
"Palatino Linotype", 
"serif", 
"Times", 
"Times New Roman"
];

// Following variables set in Version 1.2.5 (Profiles)
//var font_times, current_color, current_bgcolor, current_fontfamily, uri;
var font_times = 1;
var current_color = "reset";
var current_bgcolor = "reset";
var current_fontfamily = "Default Font"; 
var uri; 
var underline_toggle; // Version 1.3.0
var colorlinks_toggle; // Version 1.3.7e
var first_time_color = true; // Version 1.3.7 - Now getting default colors of page even if not changed by A+
var first_time_bgcolor = true; // Version 1.3.7 - Now getting default colors of page even if not changed by A+

// Get current url
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	var tab = tabs[0];
	var url = tab.url;
	var title = tab.title;
  	tab_id = tab.id;
  	if (test_mode) console.log(tab_id + " : " + url);
  	// Ask for current color and background-color
	send_to_content({"send":"colors"}, {frameId: 0}); // Version 1.3.6 - Only send this to main doc not iframes. Newer fix for ver 1.2.5
	
    /* if (tabs[0].url.match(/^chrome:\/\/newtab/i)) // Version 1.3.0 - Redirect to Google newtab that allows content.js
			chrome.tabs.update(tabs[0].id, {"url": "https://www.google.com/_/chrome/newtab"}); */
	if (tab.url.match(/^(chrome|edge)/i)) // Version 1.4.1 - From /^chrome/ to /^(chrome|edge)/
		document.getElementById('error').innerHTML = chrome.i18n.getMessage("chromeError");
    //else if (tab.url.match(/\/webstore/i)) // Version 1.4.1 - Removed and put below
	//	document.getElementById('error').innerHTML = chrome.i18n.getMessage("webstoreError");
});


function send_to_content(obj, to_frame)
{
	to_frame = to_frame || null;
	if (test_mode) console.log(tab_id);
	//console.log(JSON.stringify(obj));
	// Version 1.2.5 - Added {frameId: 0} to sendMessage only to the main frame in the tab
	//chrome.tabs.sendMessage(tab_id, obj, {frameId: 0}, function(response) {
    chrome.tabs.sendMessage(tab_id, obj, to_frame, function(response) { // Version 1.3.6 - Removed {frameID: 0} because it stopped A+ from working in iFrames
		 
    	if (chrome.runtime.lastError) 
    	{
            console.log('ERROR: ' + chrome.runtime.lastError.message);
			
			if (chrome.runtime.lastError.message.match(/The message port closed before a response was received/i)) // Version 1.5.2
				document.getElementById('error').innerHTML = chrome.i18n.getMessage("messagePortError");
		
        /* Above gets "ERROR: Could not establish connection. Receiving end does not exist"
			if you run it on chrome://extensions/ page or if the extension is just installed
			and the page has not been refreshed */
			if (chrome.runtime.lastError.message.match(/Receiving end does not exist/i))
			chrome.scripting.executeScript( // Version 1.5.0 - Manifest V3
			{
			  target: {tabId: tab_id, allFrames: true},
			  files: ['fontsize2.js', 'storage.js'],
			}, function() {
				if (chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError.message); // Version 1.4.5 - Changed from error to log
					if (chrome.runtime.lastError.message.match(/The extensions gallery cannot be scripted/i)) // Version 1.4.1
						document.getElementById('error').innerHTML = chrome.i18n.getMessage("webstoreError");
					if (chrome.runtime.lastError.message.match(/Cannot access(.*?)chrome/i)) // Version 1.4.1
						document.getElementById('error').innerHTML = chrome.i18n.getMessage("chromeError");
					if (chrome.runtime.lastError.message.match(/This page cannot be scripted due to an ExtensionsSettings policy/i)) // Version 1.5.2
						document.getElementById('error').innerHTML = chrome.i18n.getMessage("operaError");
					if (chrome.runtime.lastError.message.match(/The message port closed before a response was received/i)) // Version 1.5.2
						document.getElementById('error').innerHTML = chrome.i18n.getMessage("messagePortError");
				}
			});
				
			//if (chrome.runtime.lastError.message.match(/Receiving end does not exist/i))
			//	document.getElementById('error').innerHTML = "NOTE: You must refresh the web page before this extension will work on it!";
			
			/*  Inject content.js in active tab.
					Need "permissions": ["activeTab"] in manifest.json for this to work
			*/
			// Version 1.5.0 - Below no longer needed because background.js is injecting script onInstalled.AddListener
			/*if (chrome.runtime.lastError.message.match(/Receiving end does not exist/i))
			 chrome.tabs.executeScript(tab_id, {file: "storage.js"}, function() {
			 	chrome.tabs.executeScript(tab_id, {file: "fontsize2.js"}, function() {
    				if (chrome.runtime.lastError) {
        				console.log(chrome.runtime.lastError.message); // Version 1.4.5 - Changed from error to log
						if (chrome.runtime.lastError.message.match(/The extensions gallery cannot be scripted/i)) // Version 1.4.1
							document.getElementById('error').innerHTML = chrome.i18n.getMessage("webstoreError");
						if (chrome.runtime.lastError.message.match(/Cannot access(.*?)chrome/i)) // Version 1.4.1
							document.getElementById('error').innerHTML = chrome.i18n.getMessage("chromeError");
    				}
    				else
    				{
    					setTimeout(function(){ 
							send_to_content(obj); // Then call send_to_content(obj) again after content.js injected
						}, 500);
    				}
    			});
			 });*/	
		}
		
		if (typeof response !== "undefined") { // Version 1.3.7
			console.log(JSON.stringify(response));
			if (response.hasOwnProperty("font_times")) 
			{
				font_times = response["font-times"]; // Version 1.2.5	
			}
			if (response.hasOwnProperty("font-family")) 
			{
				current_fontfamily = response["font-family"];
				var fontlist = document.getElementById("fontlist");
				for (var i = 0; i < fontlist.length; i++) {
					if (fontlist[i].value == response["font-family"])
						fontlist[i].selected = true;
				}	
			}
			if (response.hasOwnProperty("color")) 
			{
				if (response["color"] == "reset") {
					document.getElementById('fontcolor').value = "#FFEEDD";
					document.getElementById("color_msg").textContent = chrome.i18n.getMessage("color_msg"); // Version 1.3.7d
					document.getElementById("bgcolor_msg").textContent = chrome.i18n.getMessage("bgcolor_msg"); // Version 1.3.7d
				}
				else {	
					document.getElementById('fontcolor').value = response["color"];
					// Version 1.2.2 - Color Picker for Mac OS X
					// Version 1.3.7 - Removed below because it was resetting what was already set at bottom of doc
					/*var cp = ColorPicker(document.getElementById('textcolorpicker'), function(hex, hsv, rgb) { 
						document.getElementById('fontcolor').value = hex; 
						if (!first_time_color) // Version 1.3.7 - So it doesn't send a soon as we open the popup
							send_to_content({ "color" : hex, "underline" : underline_toggle }); 
						else
							first_time_color = false;
					});*/
					cp.setHex(response["color"]);
					if (response.hasOwnProperty("color_msg")) // Version 1.3.7d
						document.getElementById("color_msg").textContent = response["color_msg"];
					else
						document.getElementById("color_msg").textContent = "";
				}
			}
			if (response.hasOwnProperty("background-color")) 
			{
				if (response["background-color"] == "reset")
					document.getElementById('bgcolor').value = "#FFEEDD";
				else {	
					document.getElementById('bgcolor').value = response["background-color"];
					// Version 1.2.2 - Color Picker for Mac OS X
					// Version 1.3.7 - Removed below because it was resetting what was already set at bottom of doc
					/*var cpb = ColorPicker(document.getElementById('bgcolorpicker'), function(hex, hsv, rgb) { 
						document.getElementById('bgcolor').value = hex; 
						if (!first_time_bgcolor)
							send_to_content({ "bgcolor" : hex }); 
						else
							first_time_bgcolor = false;
					});*/
					cpb.setHex(response["background-color"]);
					if (response.hasOwnProperty("bgcolor_msg")) // Version 1.3.7d
						document.getElementById("bgcolor_msg").textContent = response["bgcolor_msg"];
					else
						document.getElementById("bgcolor_msg").textContent = "";
				}
			}
			if (response.hasOwnProperty("uri")) 
			{
				uri = response["uri"]; // hostname 	
			}
		}
  	});
  	//tab_id = false;
}

// get app version
/* Both of the methods below work however they may be unstable or break.
	The runtime.getManifest().version seems to be the latest way.
	Not really needed since Chrome updates extenstions automatically!
	So I wont display the version???
*/
//document.getElementById('app_version').innerHTML = chrome.app.getDetails().version;
//document.getElementById('app_version').innerHTML = chrome.runtime.getManifest().version;

function font_color()
{
	var color = document.getElementById('fontcolor').value;
	cp.setHex(color);
	send_to_content({ "color" : color, "underline" : underline_toggle, "colorlinks" : colorlinks_toggle }); // Version 1.3.7e - Added "colorlinks" : colorlinks_toggle
}

function bg_color()
{
	var color = document.getElementById('bgcolor').value;
	cpb.setHex(color);
	send_to_content({ "bgcolor" : color });
}

function reset_colors()
{
	document.getElementById('fontcolor').value = "#FFEEDD";
	document.getElementById('bgcolor').value = "#FFEEDD";
	first_time_color = true; // Version 1.3.7 - Now getting default colors of page even if not changed by A+
	first_time_bgcolor = true; // Version 1.3.7 - Now getting default colors of page even if not changed by A+
	send_to_content({ "color" : "reset", "underline" : underline_toggle, "colorlinks" : colorlinks_toggle });
}

function font_family()
{
	var font = document.getElementById('fontlist').value;
	send_to_content({ "font-family" : font });
}

// Add onclick to toggle switch because popup.html can't have any javascript in it
document.getElementById('up').addEventListener("click", function() { send_to_content({ "button" : "up" }) }, false);
document.getElementById('down').addEventListener("click", function() { send_to_content({ "button" : "down" }) }, false);
document.getElementById('default').addEventListener("click", function() { send_to_content({ "button" : "default" }) }, false);
document.getElementById('fontcolor').addEventListener("input", function() { font_color(); }, false);
document.getElementById('bgcolor').addEventListener("input", function() { bg_color(); }, false);
document.getElementById('fontcolor').addEventListener("change", function() { font_color(); }, false);
document.getElementById('bgcolor').addEventListener("change", function() { bg_color(); }, false);
document.getElementById('reset_colors').addEventListener("click", function() { reset_colors();  }, false);
document.getElementById('fontlist').addEventListener("change", function() { font_family();  }, false);
document.getElementById('underline').addEventListener("click", function() { underline();  }, false); // Version 1.3.0
document.getElementById('colorlinks').addEventListener("click", function() { colorlinks();  }, false); // Version 1.3.7e
document.getElementById('blacklist').addEventListener("input", blacklist_change, false); // Version 1.5.1
document.getElementById('blacklist_add').addEventListener("click", blacklist_change, false); // Version 1.5.1

// Version 1.3.4 - Change text language in popup.html
document.title = chrome.i18n.getMessage("appName");
var titles = document.getElementsByClassName("title");
	for (var i = 0; i < titles.length; i++) {
		titles[i].textContent = chrome.i18n.getMessage("appName"); // + " " + license;
}
document.getElementById("description").textContent = chrome.i18n.getMessage("description");
document.getElementById("default").textContent = chrome.i18n.getMessage("default_size"); // Default Size
document.getElementById("default").title = chrome.i18n.getMessage("default_title"); // ALT+Backspace
document.getElementById("fontcolor").parentElement.firstChild.textContent = chrome.i18n.getMessage("fontcolor"); 
document.getElementById("bgcolor").parentElement.firstChild.textContent = chrome.i18n.getMessage("bgcolor");
document.getElementById("reset_colors").textContent = chrome.i18n.getMessage("reset_colors");
document.getElementById("font_type").firstChild.textContent = chrome.i18n.getMessage("font_type");
document.getElementById("profiles").textContent = chrome.i18n.getMessage("profiles");
document.getElementById("underline").nextSibling.textContent = chrome.i18n.getMessage("underline");
document.getElementById("colorlinks").nextSibling.textContent = chrome.i18n.getMessage("colorlinks"); // Version 1.3.7e
document.getElementById("pro_features").innerHTML = chrome.i18n.getMessage("pro_features"); // Version 1.3.7g
document.getElementById("trial").innerHTML = chrome.i18n.getMessage("trial"); // Version 1.3.7i
document.getElementById("blacklist_msg").innerHTML = chrome.i18n.getMessage("blacklist_msg"); // Version 1.5.1
document.getElementById("blacklist_add").innerHTML = chrome.i18n.getMessage("blacklist_add"); // Version 1.5.1
var elems = document.getElementsByClassName("upgrade"); // Version 1.3.7g
for (var i = 0; i < elems.length; i++) {
	elems[i].textContent = chrome.i18n.getMessage("upgrade"); 
}

// Version 1.2.2 - Color Picker for Mac OS X
var cp = ColorPicker(document.getElementById('textcolorpicker'), function(hex, hsv, rgb) {
			document.getElementById('fontcolor').value = hex;
			document.getElementById("color_msg").textContent = ""; // Version 1.3.7d
            if (!first_time_color) // Version 1.3.7 - So it doesn't send a soon as we open the popup
				send_to_content({ "color" : hex, "underline" : underline_toggle, "colorlinks" : colorlinks_toggle }); 
			else
				first_time_color = false;
        });
        
var cpb = ColorPicker(document.getElementById('bgcolorpicker'), function(hex, hsv, rgb) {
            document.getElementById('bgcolor').value = hex;
			document.getElementById("bgcolor_msg").textContent = ""; // Version 1.5.1
            if (!first_time_bgcolor)
				send_to_content({ "bgcolor" : hex }); 
			else
				first_time_bgcolor = false;
        });
        
/* Version 1.2.2 - Color Picker for Mac OS X because the standard HTML input type = color
causes the Chrome extension popup to close as soon as the color picker opens. So changing
the color does nothing because popup.js is closed. */
//if (navigator.platform.indexOf('Mac') > -1) // If Mac OS // // Version 1.2.9 - Always use the color picker because 2 Windows users have the popup window close problem - https://youtu.be/1fCnZJREol4
{
	// Turn off and disable html 5 type = color picker
	/*document.getElementById('fontcolor').style.display = "none";
	document.getElementById('fontcolor').disabled = true;
	document.getElementById('bgcolor').style.display = "none";	
	document.getElementById('bgcolor').disabled = true;*/
	// Display colorpicker.min.js color picker
	document.getElementById('textcolorpicker').style.display = "inline-block";
	document.getElementById('bgcolorpicker').style.display = "inline-block";
}

/* Version 1.2.4 - Added Change font-family to Pro version */
for (var i = 0; i < font_list.length; i++) {
	var fontlist = document.getElementById("fontlist");
	var opt = document.createElement('option');
    opt.value = font_list[i];
    opt.innerHTML = font_list[i];
    opt.style.fontFamily = font_list[i];
    fontlist.appendChild(opt);
}


// Version 1.3.0 - Get underline links setting from local storage
//chrome.storage.local.remove('underline');
chrome.storage.local.get(['underline', 'colorlinks', 'blacklist'], function (result) { // Version 1.3.7e - Changed 'underline' to ['underline', 'colorlinks']
	if (test_mode) console.log(result);
	if (typeof result['underline'] == "undefined") {
		underline(); // If underline setting has not been created then create it
	}
	else {
		document.getElementById('underline').checked = result.underline;
		underline_toggle = result.underline;
	}
	if (typeof result['colorlinks'] == "undefined") {
		colorlinks(); // If underline setting has not been created then create it
	}
	else {
		document.getElementById('colorlinks').checked = result.colorlinks;
		colorlinks_toggle = result.colorlinks;
	}
	
	if (typeof result['blacklist'] !== "undefined") // Version 1.5.1 - Added blacklist
		document.getElementById('blacklist').value = result['blacklist'];
    
});

// Version 1.3.0
function underline() {
	underline_toggle = document.getElementById('underline').checked;
	// Save to chrome.storage
	chrome.storage.local.set({"underline":underline_toggle});
	send_to_content({ "color" : "underline", "underline" : underline_toggle, "colorlinks" : colorlinks_toggle });
}

// Version 1.3.7e
function colorlinks() {
	colorlinks_toggle = document.getElementById('colorlinks').checked;
	// Save to chrome.storage
	chrome.storage.local.set({"colorlinks": colorlinks_toggle});
	send_to_content({ "color" : "colorlinks", "underline" : underline_toggle, "colorlinks" : colorlinks_toggle });
}


// Version 1.3.2
chrome.commands.getAll(function(commands) { 
	if (test_mode) console.log(commands);
	var shortcuts_div = document.getElementById('shortcuts');
	//var shortcut_url = (navigator.userAgent.indexOf("Edg")) ? "edge://extensions/shortcuts" : "chrome://extensions/shortcuts"; // Version 1.4.1
	var shortcut_url = "chrome://extensions/shortcuts"; // Version 1.4.1b - Edge redirects to edge://
	var string = "";
	for (var i = 0; i < commands.length; i++) {
		if (commands[i].name.match(/^(up|down)/i))
			string += commands[i].description + " : " + commands[i].shortcut + "<br />"; 
	}
	string += chrome.i18n.getMessage("change_hotkey") + 
		' <a href="#" id="shortcuts_url">'+shortcut_url+'</a>'; // Version 1.4.1
	shortcuts_div.innerHTML += string;
	document.getElementById('shortcuts_url').onclick = event => {
		chrome.tabs.create({url: shortcut_url}); // Version 1.4.1
		//chrome.tabs.create({url: 'chrome://extensions/configureCommands'}); // Version 1.4.1
		event.preventDefault();
	};
});

// Version 1.3.2 - Keypress in popup
document.onkeydown = function(ev)
{ 
	var key = (!ev? event.keyCode:ev.which); // key pressed in unicode
	var actualkey = String.fromCharCode(key); // convert key pressed to letter
	var ctrl_key = (window.event) ? event.ctrlKey : ev.ctrlKey;
	var alt_key = (window.event) ? event.altKey : ev.altKey;
	var shift_key = (window.event) ? event.shiftKey : ev.shiftKey;
	var cancel_event = 0;
	
	if (alt_key)
	{
		//console.log(key);
		if (actualkey == "T")
		{
			var bgcolor = document.bgColor;
			var flash_bgcolor = "red";
			if (test_mode == false) 
			{
				test_mode = true;
				flash_bgcolor = "green";
			}
			else 
				test_mode = false;
				
			document.bgColor = flash_bgcolor;
			setTimeout(function()
			{
				document.bgColor = bgcolor; 
				return;
			} , 250);
			 
		}
		else if (key == 187) // minus key
		{
			send_to_content({ "button" : "up" });
		}
		else if (key == 189) // plus key
		{
			send_to_content({ "button" : "down" });
		}
		else if (key == 8) // backspace
		{
			send_to_content({ "button" : "default" });	
		}
	}

	if (cancel_event)
		if (window.event) // case :if it is IE event
		{
			window.event.returnValue = null;
			window.event.cancelBubble = true;
			event.keyCode=0;
		}
		else // case: if it is firefox event
		{
			//Event.stop(e);
			ev.preventDefault();
		}
		else // if not cancel_event but is ctrl key
			return;	
}



function update_title() { // Version 1.3.7f
	var license = sync.license.license || "Free Trial";
	var elems = document.getElementsByClassName("free_trial_msg");
	for (var i = 0; i < elems.length; i++) {
		if (license.match(/full/i))
			elems[i].style.display = "none";
		else
			elems[i].style.display = "inline-block";
	}
	
	elems = document.getElementsByClassName("pro_feature");
	for (var i = 0; i < elems.length; i++) {
		if (license.match(/full/i))
			elems[i].style.display = "inline-block";
		else
			elems[i].style.display = "none";
	}
	
	elems = document.querySelectorAll("title, .title"); // Version 1.4.9 - Remove Lite from title
	for (var i = 0; i < elems.length; i++) {
		if (license.match(/full/i))
			elems[i].innerHTML = elems[i].innerHTML.replace(/\s*lite/i, "");
	}
}


function set_badge_icon() { // Version 1.4.9 - For future: Set icon to a canvas image
	// https://stackoverflow.com/questions/29056704/google-chrome-extension-canvas-icon
	// https://stackoverflow.com/questions/66016918/chrome-extension-with-svg-icons-chrome-browseraction-seticon
	var canvas = document.createElement('canvas'); // Create the canvas
	canvas.width = 38;
	canvas.height = 38;

	var context = canvas.getContext('2d');
	//context.fillStyle = "#ffffff";
	//context.fillRect(0, 0, 38, 38);

	context.fillStyle = "#000000";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.font = "38px Serif";
	context.fillText("A", canvas.width/2, canvas.height/2);
	context.fillText("+", canvas.width/1.25, canvas.height/3, 15);

	chrome.action.setIcon({
		imageData: context.getImageData(0, 0, 38, 38)
	});
}


function blacklist_change(event) { // Version 1.5.1 - Blacklist
	if (test_mode) console.log(event);
	if (event.type == "input") { // Typing in blacklist textarea
		// oninput includes onpaste and doesn't need to do anything but save to storage which is done below
	}
	else if (event.type == "click") { // Clicked blacklist_add button
		var textarea = document.getElementById("blacklist");
		var blacklist_array = textarea.value.split(/[\s\n,]+/);
		blacklist_array = blacklist_array.filter(item => item); // Remove empty lines
		blacklist_array.push(uri);
		textarea.value = blacklist_array.join("\n");
		textarea.scrollTop = textarea.scrollHeight;
	}
	// Save document.getElementById("blacklist").value to storage
	obj = { blacklist: document.getElementById("blacklist").value.split(/[\s\n,]+/) };
		chrome.storage.local.set(obj, function() {
		if (test_mode) console.log(JSON.stringify(obj));
	});
}


function blacklisted() { // Version 1.5.1 - is current URL in blacklist?
	var in_blacklist = false;
	var blacklist_array = document.getElementById("blacklist").value.split(/[\s\n,]+/); // Split by \n or ,
	blacklist_array = blacklist_array.filter(item => item); // Remove empty lines
	for (var b = 0; b < blacklist_array.length; b++) {
		blacklist_array[b] = blacklist_array[b].replace(/^https?:\/\//, ""); // Remove https:// if there
		var regex = new RegExp("^"+blacklist_array[b], "i");
		if (uri && uri.match(regex))
			in_blacklist = true;
	}
	return in_blacklist;
}

/*chrome.storage.sync.get('license', function(obj) { // Version 1.3.7f 
	if (!sync) window['sync'] = {};
	sync.license = obj.license || {};
	if (sync.license.license == "chromewebstore#userLicense") // Version 1.3.8 - Fix 1.3.7 license = kind bug
		sync.license.license = "FULL"; 
	if (sync.license.license && sync.license.license.match(/full/i)) // Version 1.3.7f
		update_title();
	if (sync.license.order_id && document.settings_form && document.settings_form.order_id)  // Version 1.3.7g
			document.settings_form.order_id.value = sync.license.order_id;	
	if (sync.license.status && document.settings_form && document.settings_form.status)  // Version 1.3.7g
			document.settings_form.status.value = sync.license.status;	
	if (sync.license.error && document.getElementById('error')) // Version 1.4.0
			document.getElementById('error').innerHTML = "Error: "+sync.license.error +
			" <a href = 'https://www.seabreezecomputers.com/fontsize#faq' target='_blank'>"+
			"See Help</a>";
});*/

//loadXMLDoc("user_data=1"); // popup.js can communicate fine with an https site without error



