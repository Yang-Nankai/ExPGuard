var uri = window.location.hostname; // www.seabreezecomputers.com
var still_saving = false; // Needed for save_to_storage otherwise if called twice in a row we get the previous object before it is saved with local.set
var test_mode = ('update_url' in chrome.runtime.getManifest()) ? false : true; // If loaded from Web Store instead of local folder than getManifest has update_url property
var underline_toggle; // Version 1.3.0
var colorlinks_toggle; // Version 1.3.7e


// Version 1.3.6 - Get url of top document because iFrames like disqus.com were loading and saving their own settings based on their url
// We don't want that we want to have iFrames get their settings from the top url
function get_top_hostname() {
	var url = window.location.hostname; // This will be the hostname from an iFrame and the top document. But the iFrame will return it's own url
	if (window.location != window.parent.location) { // We are in an iFrame so let's get hostname of top document
		url = document.referrer; // This will be https://www.outdoorhub.com/news/2020/01/07/wolf-pack-surrounds-visitors-driving-yellowstone-national-park/ 
		// Now let's convert it to hostname using a tag
		var a = document.createElement('a');
	    a.href = url;
	    return (a.hostname); // This will be www.outdoorhub.com
	}
	return (url);
}

var uri = get_top_hostname();          
if (test_mode) console.log(uri);

function get_from_storage()
{
	chrome.storage.local.get(uri, function(obj)
	{
	 	if (typeof obj[uri] == "undefined") return; // key does not exist so return
	 	// or we could do
	 	if (obj.hasOwnProperty(uri) == false) return; // key does not exist so return
	 
	    if (test_mode) console.log(JSON.stringify(obj));
	    
	    if (obj[uri].hasOwnProperty("background-color")) {
	    	add_css("background-color", obj[uri]["background-color"]); // Version 1.3.8b - Prevent white flicker if set to black background
			change_fontcolor("background-color", obj[uri]["background-color"]);
		}
		if (obj[uri].hasOwnProperty("color")) {
	    	change_fontcolor("color", obj[uri]["color"]);
			add_css("color", obj[uri]["color"]); // Version 1.3.7 - Function in fontsize.js
		}
		if (obj[uri].hasOwnProperty("font-family")) // Version 1.5.0 - Moved above font_times so badge priority will display font_times
	    	change_fontfamily(obj[uri]["font-family"]); 
		
		if (obj[uri].hasOwnProperty("font_times"))
	    	change_fontsize(parseFloat(obj[uri]["font_times"])); // turn into number
	    
	    
	    
	    	 	   
	});
} // end function get_from_storage()


function save_to_storage(option_obj)
{
	if (sync.license.license && !sync.license.license.match(/full/i)) // Version 1.3.7f
		return;
		
	if (still_saving)
	{
		setTimeout(function()
		{
			save_to_storage(option_obj); 
			return;
		} , 100);
		return;
	}
	
	still_saving = true;
	
	// First get parent object from storage if it exists
	chrome.storage.local.get(uri, function(obj)
	{	
		if (typeof obj[uri] == "undefined") // key does not exist
			obj[uri] = {}; // so create new object
		
		// Check for default and reset values
		for (var key in option_obj)
			if (option_obj.hasOwnProperty(key))
				if ((key == "font_times" && option_obj[key] == 1)
					|| (option_obj[key] == "reset") // if default font_times (1) OR value of reset
					|| (key == "font-family" && option_obj[key].match(/Default/i)) // Version 1.3.6 - Erase font-family key if we are back to Default font // Version 1.3.7 - Changed from == "Default Font" to .match(/Default/i)
					) 
				{
					if (obj[uri].hasOwnProperty(key)) // if saved chrome.storage object has this key
						delete obj[uri][key]; // then delete the object because the user reset
				}
				else // Add new settings to chrome.storage object
				{
					obj[uri][key] = option_obj[key];	
				}
		
		// Save to chrome.storage
		chrome.storage.local.set(obj, function() 
		{
		  	still_saving = false;
			if (test_mode) console.log(JSON.stringify(obj));
		  	
			if(chrome.runtime.lastError)
		    {
		        console.log(chrome.runtime.lastError.message);
		        return;
		    } 
		});
	});
} // end function save_to_storage(option_obj)


function load_profiles(top_key)
{
	/* set top_key to null to get an object with all the storage values */
	chrome.storage.local.get(top_key, function(obj)
	{
		if (typeof obj["profiles"] == "undefined") { get_from_storage(); return; } // key does not exist so return // Version 1.5.1 - From top_key to "profiles"
		if (test_mode) console.log("Profiles from storage: "+JSON.stringify(obj));
	   
		var	profiles = obj["profiles"];	
		
		// Version 1.5.1 - Don't load profiles on blacklisted urls
		var in_blacklist = false;
		var blacklist_array = obj["blacklist"] || [];
		blacklist_array = blacklist_array.filter(item => item); // Remove empty lines
		//var blacklist_array = blacklist.split("\n"); // blacklist is saving to storage as an array
		for (var b = 0; b < blacklist_array.length; b++) {
			blacklist_array[b] = blacklist_array[b].replace(/^https?:\/\//, ""); // Remove https:// if there
			var regex = new RegExp("^"+blacklist_array[b], "i");
			if (uri.match(regex))
				in_blacklist = true;
		}
		
		if (!in_blacklist) // Version 1.5.1
		for (var i = 0; i < profiles.length; i++) // loop through profiles
		{
			if (profiles[i]["lock"] == true) {
				if (profiles[i].hasOwnProperty("background-color") && profiles[i]["background-color"]) // Version 1.5.1 - Added && profiles[i]["background-color"]
				if (profiles[i]["background-color"] != "reset") // Version 1.5.0b
				{
			    	add_css("background-color", profiles[i]["background-color"]); // Version 1.5.0b - Prevent white flicker if set to black background
					change_fontcolor("background-color", profiles[i]["background-color"], false); // Version 1.5.0b - Added ,false to not save a locked profile to the uri storage
				}
			    if (profiles[i].hasOwnProperty("color") && profiles[i]["color"]) // Version 1.5.1 - Added && profiles[i]["color"]
				if (profiles[i]["background-color"] != "reset") // Version 1.5.0b
				{
			    	change_fontcolor("color", profiles[i]["color"], false); // Version 1.5.0b - Added ,false to not save a locked profile to the uri storage);
					add_css("color", profiles[i]["color"]); // Version 1.5.0b - Function in fontsize.js
				}
			    if (profiles[i].hasOwnProperty("font-family"))
				if (!profiles[i]["font-family"].match(/Default/i)) // Version 1.5.0b
			    	change_fontfamily(profiles[i]["font-family"], false); // Version 1.5.1 - Forgot to add ,false to not save a locked profile to the uri storage);
				if (profiles[i].hasOwnProperty("font_times"))
			    	change_fontsize(parseFloat(profiles[i]["font_times"]), false); // turn into number // Version 1.5.0b - Added ,false to not save a locked profile to the uri storage);
			}
			//else
			//	get_from_storage();	// Version 1.5.0b - We were calling this twice (once for each unlocked profile)
		}
		get_from_storage(); // Version 1.5.0b - Now calling outside of for loop.
	});
} // end function load_profiles()


// Version 1.3.0 - Get underline links setting from local storage
//chrome.storage.local.remove('underline');
chrome.storage.local.get(['underline', 'colorlinks'], function (result) { // Version 1.3.7e - Changed 'underline' to ['underline', 'colorlinks']
	if (test_mode) console.log(result);
	if (typeof result['underline'] == "undefined") 
		underline_toggle = true;
	else
		underline_toggle = result['underline'];
	
	if (typeof result['colorlinks'] == "undefined") 
		colorlinks_toggle = true;
	else
		colorlinks_toggle = result['colorlinks'];
	
	
});

// Version 1.3.7f - Add storage changes to sync variable
chrome.storage.onChanged.addListener(function(changes, namespace) {
	// The namespace is "sync", "local" or "managed"
	if (test_mode) console.log("Changes to "+namespace+" storage: "+JSON.stringify(changes)); // Version 1.4.0 - Added "+namespace+"
	for (key in changes) {
		var storageChange = changes[key];
 	 	/*console.log('Storage key "%s" in namespace "%s" changed. ' +
	              'Old value was "%s", new value is "%s".',
	              key,
	              namespace,
	              storageChange.oldValue,
	              storageChange.newValue); */
	    sync[key] = changes[key].newValue; // Version 1.3.7
	    //if (test_mode) console.log("sra object: "+JSON.stringify(sra));
		// When deleted: Storage key "toggle" in namespace "local" changed. Old value was "Object", new value is "undefined".
		// When created: Storage key "toggle" in namespace "local" changed. Old value was "undefined", new value is "Object".
		/* NOTE: A new cookie only has newValue and no oldValue property
			NOTE: A deleted cookie only has an oldValue and no newValue property */
	}
	if (typeof processObject === "function") processObject(changes);
});	


//window.onload = get_from_storage;	
//if (window.self === window.top) // Only load in top window not iframes - Version 1.2.5
// Version 1.3.6 - Removed above line from 1.2.5 because it stopped iFrames from getting saved profiles
//document.addEventListener("DOMContentLoaded", function() { // Version 1.3.6 - Added DOMContentLoaded because Disqus iFrame was getting data too early
/* Version 1.3.6 - I'm removing DOMContentLoaded because I found out what is happening. I changed the color and the font at Disqus.com.
	So then when I change the font or color at website that has disqus in an iFrame then it tries to combine it with what I changed at disqus.com!!!
	So what I need to do is just get the uri from the top document not the iframes! This will be at the top of this file??
*/
if (!sync) var sync = {};
chrome.storage.sync.get('license', function(obj) { // Version 1.3.7f 
	
	sync.license = obj.license || {};
	
	if (sync.license.license && sync.license.license.match(/full/i)) // Version 1.3.7f
	if (window.self === window.top) // Version 1.3.6 If top document then no delay in loading settings
		load_profiles(["profiles", "blacklist"]); // Version 1.5.1 - From "profiles" to ["profiles", "blacklist"]
	else { // If iFrame then add delay because disqus does some crazy dynamic loading of css where the fonts get really huge and default color gets wrong color and line-height is changed at wrong time
		setTimeout(function(){
			load_profiles(["profiles", "blacklist"]); // Version 1.5.1 - From "profiles" to ["profiles", "blacklist"]
			
		}, 1500);
	}
});
//}, false);



