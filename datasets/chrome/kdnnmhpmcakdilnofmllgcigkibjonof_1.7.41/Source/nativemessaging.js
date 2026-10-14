// Version 1.7.15 Native Messaging
var port = null;
function start_nativemessaging() { // Called from start_all() in sr.js
	if (sra.settings.allow_in_windows)
		send_to_windows({test: 'Hello'}); // Open port at start of script
}

function portListener(obj) {
	if (test_mode) console.log('Native host msg Received' + JSON.stringify(obj));
	if (obj.hasOwnProperty("browser")) // speech.exe is telling the browser to run the command instead
		send_to_content(obj);
	if (obj.hasOwnProperty("command"))
	{
		if (window[obj.command]) {
			if (obj.command == "say")
				window[obj.command](obj.option, obj.sender);
			else
				window[obj.command](obj.option, obj.date);
		}
	}
}

function portDisconnectListener() {
	if (chrome.runtime.lastError) { // Version 1.7.17 - Forgot to put { }
		console.log(chrome.runtime.lastError.message);
		// lastError.message == "Specified native messaging host not found." if the Windows Add-On not installed
		// lastError.message == "Specified native messaging host not found." When had 3 extra allowed-origins for Edge in nmh-manifest.json
		// "Error when communicating with the native messaging host." If speech.exe use Console.WriteLine for debugging because Console.Write is now outputting to Chrome extension
		var error = " Windows Add-On: " + chrome.runtime.lastError.message + " Make sure it has been installed and restart. "; // Version 1.7.17 - Added: Make sure it has been installed and restart.
		if (!error.match(/Native host has exited/i)) // Don't display error if user closed speech.exe manually
			flash_tab(error); 
	} // Version 1.7.17 - Forgot to put { }
	if (test_mode) console.log('Native msg host port Disconnected');
	port = null;
	
}

// Send obj to Windows if allow_in_windows == true in settings
function send_to_windows(obj) {
	if (!verify_windows_addon_license()) {
		// Version 1.7.17 - If they don't have a subscription license then tell content script to process the object
		obj.browser = true;
		send_to_content(obj);
		return;
	}
	
	if (port != null)
		port.postMessage(obj); // Version 1.7.17 - Moved from bottom to top
	else if (port == null && !last_error.match(/native messaging/i)) {
		port = chrome.runtime.connectNative('com.seabreezecomputers.speech');
		port.onMessage.addListener(portListener);
		port.onDisconnect.addListener(portDisconnectListener);
		port.postMessage({settings: sra.settings}); // Send settings to speech.exe

		port.postMessage(obj);
	}
	else  { // Version 1.7.17 - Removed if (last_error.match(/native messaging/i))
		// If it didn't connect to the port then tell content script to process the object
		obj.browser = true;
		send_to_content(obj);
	}	
		
}

function verify_windows_addon_license() {
	if (sra.kind && sra["kind"].match(/paddle|lemon/i) && sra.license == "FULL") { // Version 1.7.39 - Added |lemon
		if (document.getElementById("error").innerHTML.match(/Windows Add-On/i))
			document.getElementById("error").innerHTML = document.getElementById("error").innerHTML.replace(/(NOTE: )?Windows Add-On(.*?)<\/a>/i, "");
		return true;
	}
	else {
		// Version 1.7.16 - Bug fix. Delete windows_addon_date if before Feb 5, 2024 because we
		// accidentally called verify_windows_addon_license() in license2020.js
		if (sra.hasOwnProperty("windows_addon_date") && sra["windows_addon_date"] < 1707163200000)
			delete sra["windows_addon_date"];
		
		if (!sra.hasOwnProperty("windows_addon_date")) {
			sra["windows_addon_date"] = parseInt(new Date().getTime()); // UNIX timestamp in seconds
			var obj = { "windows_addon_date": sra["windows_addon_date"]  };
			save_to_storage(obj);
		}
		var TRIAL_PERIOD_DAYS = 30; 
		var daysAgoLicenseIssued = Date.now() - parseInt(sra["windows_addon_date"], 10);
		daysAgoLicenseIssued = daysAgoLicenseIssued / 1000 / 60 / 60 / 24;
		if (daysAgoLicenseIssued <= TRIAL_PERIOD_DAYS) 
			var daysLeft = Math.round(TRIAL_PERIOD_DAYS - daysAgoLicenseIssued); // Version 1.0
		else
			var daysLeft = 0;
		var licenseStatusText = "("+daysLeft+" days left)";
		var text = " NOTE: Windows Add-On requires an active subscription. " + licenseStatusText
			+ " <a href='https://seabreezecomputers.com/speech/subscription/'>Buy Now</a> ";
		if (!document.getElementById("error").innerHTML.match(/Windows Add-On/i))
			document.getElementById("error").innerHTML += text;
		if (daysLeft > 0) 
			return true;
		else
			return false;
	}
}

/*
// To send one time request and response use sendNativeMessage()
var msg = {text: 'Hello, my_application'};
chrome.runtime.sendNativeMessage("com.seabreezecomputers.speech", msg, function(response) {
    if (chrome.runtime.lastError) {
        console.log("ERROR: " + chrome.runtime.lastError.message);
    } else {
        console.log("Messaging host: ", response);
    }
});
*/

// To create a port to the host use connectNative()
/*var port = chrome.runtime.connectNative('com.seabreezecomputers.speech');
port.onMessage.addListener(function (msg) {
	console.log('Native host msg Received' + JSON.stringify(msg));
});
port.onDisconnect.addListener(function () {
	if (chrome.runtime.lastError) 
		console.log(chrome.runtime.lastError.message);
	// lastError.message == "Specified native messaging host not found." if the Windows Add-On not installed
	// lastError.message == "Specified native messaging host not found." When had 3 extra allowed-origins for Edge in nmh-manifest.json
	// "Error when communicating with the native messaging host." If speech.exe use Console.WriteLine for debugging because Console.Write is now outputting to Chrome extension
	console.log('Native msg port Disconnected');
	port = null;
});
port.postMessage({text: 'Hello, my_application'});
*/
