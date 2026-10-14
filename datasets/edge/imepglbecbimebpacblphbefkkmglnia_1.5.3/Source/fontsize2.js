/* 	A+ FontSize Changer 2
	Version 2.0 - 8/10/2020 - Major Performance Improvements
	Copyright Jeff Baker 2020 http://www.seabreezecomputers.com
	
	Major Performance Improvements. Instead of traversing the DOM for each font change option
	(fontSize, color, background-color, fontFamily) and having mutliple setTimeOuts
	there will not just be one setTimeout and traversing the DOM once and it will change
	each option as needed
*/
var test_mode = ('update_url' in chrome.runtime.getManifest()) ? false : true; // If loaded from Web Store instead of local folder than getManifest has update_url property
if (test_mode) console.log(new Date().toISOString('en-US')); // Version 1.5.0b
var font_times = 1; // Current multiplyer (1.2 * 100 = 120) or 1.2X is the same as 120% 
var current_color;
var current_bgcolor;
var current_fontfamily;
var font_timer = null;
var underline_toggle; // Version 1.3.0
var timer_ms = (window.self === window.top) ? 500 : 5000; // Version 1.3.7 - SetTimeout 1000ms for top frame and 5000ms for iFrames
// Version 1.3.7 - Walk the DOM once for all font change with font_options object
var font_options = { // This is not being used. It was a thought at one time
	"font-size" : null,
	"color" : null,
	"background-color" : null,
	"font-family" : null,	
};	
var total_elements = 0; // Version 1.3.7
var elems_array = []; // Version 2.0
var dom_ready = false; // Version 1.4.9
if (document.readyState === 'interactive') dom_ready = true; // Version 1.4.9 - On fresh extension installs and content script being injected, it would not run because dom_ready was always false
if (document.readyState === 'complete') dom_ready = 2; // Version 1.4.9 - On fresh extension installs and content script being injected, it would not run because dom_ready was always false
var saving_defaults = false; // Version 1.4.9


function save_font_defaults()
{
	/* The reason why we have to call this function in the beginning
		is because child elements fontSizes are relative to their parents.
		So if we change their parents, then the children keep getting bigger
		and then data-default-fontsize will be greatly off.
		NOTE: I think for truly dynamic pages we will have to call save_fontsize()
		before each change_fontsize call.
	*/ 
	//var elems = document.getElementsByTagName("*"); // Note we removed .body so we could get body tag as well and not just children of body
	if (test_mode) console.log("save_font_defaults");
	var elems = document.querySelectorAll('body, body *'); // Version 1.4.9
	var elems_length = elems.length; // Version 1.4.9
	if (elems_length == total_elements) // Version 1.4.9 - Don't loop through everything if no new elements
		return; // We only need to return onScreenEl if changing font-size
	if (test_mode) console.log("save_font_defaults() loop: "+elems.length);
	for (var i=0; i<elems_length; i++)
	{
		saving_defaults = true; // Version 1.4.9
		var el = elems[i];
		
		el_defaults(el); // Version 1.5.0b
		
	} 
	saving_defaults = false; // Version 1.4.9

} // end function save_font_defaults()


function el_defaults(el) { // Version 1.5.0b - Save or Retrieve default font settings
	
	// If we have changed the size of this element already
	if (el.getAttribute('data-afsc-id')) // then it will have "data-default-fontsize" attribute
	{
		var id = el.getAttribute('data-afsc-id');
		var obj = elems_array[id];
		return obj; // Version 1.5.0b
	}
	else // if we have not saved the default values yet
	{
		var id = elems_array.length;
		el.setAttribute('data-afsc-id', id);
		var default_fontsize = parseFloat(document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size"));
		var default_color = document.defaultView.getComputedStyle(el,null).getPropertyValue("color");
		var default_background_color = document.defaultView.getComputedStyle(el,null).getPropertyValue("background-color");
		var default_fontfamily = document.defaultView.getComputedStyle(el,null).getPropertyValue("font-family");
		var obj = { "font-size" : default_fontsize,
					"color" : default_color,
					"background-color" : default_background_color,
					"font-family" : default_fontfamily
				};
		elems_array.push(obj);
		return obj; // Version 1.5.0b
	}	
}


// Version 1.3.0 - 3/24/2018 - Try to keep the page view at the same location when changing font size
function isOnScreen(el)
{
	/*var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var scrollBottom = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + scrollTop;
	var scrollRight = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + scrollLeft;*/
	
	// Don't return elements that are fixed position
	var el2 = el;
	while (typeof el2 === 'object' && !el2.nodeName.match(/^(body|#document)$/i)) {
        if (document.defaultView.getComputedStyle(el2,null).getPropertyValue('position').toLowerCase() === 'fixed') return false;
        el2 = el2.parentNode;
    }
	
	/* New way: el.getBoundingClientRect always returns 
		left, top, right, bottom of
		an element relative to the current screen viewport */ 
	var rect = el.getBoundingClientRect();
	if (rect.top >= 1 && rect.left >= 1 && 
		rect.bottom <= window.innerHeight && rect.right <= window.innerWidth) // 3/24/2018 - Changed to window.innerHeight and window.innerWidth
		return el;
	else 
		return false;
}


function change_fontsize(direction, save)
{
	/* change_fontsize() changes all the elements on the page to a new fontsize.
		document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size") contains
		the calculated font-size of an element. So EVERY element has a value
	*/
	save = (typeof save !== "undefined") ? save : true; // Version 1.5.0b - Don't save locked profiles to uri storage
	
	var old_font_times = font_times;
	
	
	if (direction == "up") {
		font_times = Math.round((font_times + 0.1) * 10) / 10; // Version 1.2.7 - Was 0.2, Now 0.1
	}
	else if (direction == "down") 
	{	
		if  (font_times > 0.2)  { // Smaller than this is 0px
			font_times = Math.round((font_times - 0.1) * 10) / 10; // Version 1.2.7 - Was 0.2, Now 0.1
		}
		else return;
	}
	else if (direction == "default")
		font_times = 1;
	else if (!isNaN(direction)) // if IS a number
		font_times = direction;
		
	total_elements = 0; // Reset total_elements so that the SetTimeout will traverse the entire DOM at least 1 more time

	
	if (font_times != old_font_times)
	{
		// Show font_times in icon badge
		if (window.self === window.top) // Version 1.3.6
			send_to_background({"font_times" : font_times});
		// save to storage
		if (save) // Version 1.5.0b - Don't save locked profiles to uri storage
		if ( typeof save_to_storage == 'function' ) 
			save_to_storage({"font_times" : font_times});
		if (test_mode) console.log("font_times: "+font_times);
	}
	
	if (!font_timer) 
		traverse_dom();
	
} // end function change_fontsize(direction)


function traverse_dom() {	
	
	if (test_mode) console.log("traverse_dom()1");
	if (!dom_ready || saving_defaults) {// Version 1.4.9
		setTimeout(function() { traverse_dom() } , 50); // Version 1.4.9 - Bug - Added () to traverse_dom
		return;
	}
	if (test_mode) console.log("traverse_dom()2");
	var onScreenEl = false; // Version 1.3.0
	var onScreenElTop = false; // Version 1.3.0
	
	clearTimeout(font_timer);
	
	save_font_defaults(); // Save all default font settings for every element
	
	//var elems = document.getElementsByTagName("*"); // Note we removed .body so we could get body tag as well and not just children of body
	var elems = document.querySelectorAll('body, body *'); // Version 1.4.9
	var elems_length = elems.length; // Version 1.4.9
	if (elems.length != total_elements || document.readyState != "complete") { // Version 1.3.7 - Only loop through elements if new elements have appeared // Version 1.4.9 - From elems.length > total_elements to elems.length != total_elements
		total_elements = elems.length;
		font_timer = 1; // Version 1.4.9 - So change_fontsize, change_fontcolor and change_fontfamily does not call traverse_dom if traverse_dom is already looping. At the end of the loop traverse_dom will call itself because total_elements == 0
		if (test_mode) console.log("tranverse_dom() loop "+elems.length);
		for (var i = 0; i < elems_length; i++) // Version 1.4.9 - Bug. Changed from > to <
		{
			var el = elems[i];
			if (!onScreenEl) onScreenEl = isOnScreen(el);
			if (onScreenEl) onScreenElTop = onScreenEl.getBoundingClientRect().top; 	
			
			//el_defaults(el); // Version 1.5.0b - Not needed. Being done in each change_el_x function
			
			if (font_times) change_el_fontsize(el); // Version 1.4.9 - Added if (font_times)
			if (current_color) change_el_color(el, "color", current_color);
			if (current_bgcolor) change_el_color(el, "background-color", current_bgcolor); // Version 1.4.9 - Fixed type: From current_bg_color to current_bgcolor
			if (current_fontfamily) change_el_fontfamily(el, current_fontfamily);
		}
	}
	
	if (onScreenEl && font_times) { // Version 1.3.0 // Version 1.4.9 - Added && font_times
		if (test_mode) console.log(onScreenEl); // Version 1.4.9
		if (test_mode) console.log("onScreenEl.top = "+onScreenEl.getBoundingClientRect().top);
		if (document.body.scrollTop) document.body.scrollTop += onScreenEl.getBoundingClientRect().top - onScreenElTop; 
		else if (document.documentElement.scrollTop) document.documentElement.scrollTop += onScreenEl.getBoundingClientRect().top - onScreenElTop;
	}
	
	// Version 1.4.9 - If we looped through every element then make sure attribute resets don't keep checking in above loop by setting them to null or false
	//if (font_times == 1) font_times = 0;
	if (current_color == "reset") current_color = null;
	if (current_bgcolor == "reset") current_bgcolor = null;
	if (current_fontfamily == "Default Font") current_fontfamily = null;
	
	// Version 1.4.9 - Commented out buggy block below and created new block to "Call this function again if..."
	var elems = document.querySelectorAll('body, body *');
	if (font_times != 1 || current_color || current_bgcolor || current_fontfamily || total_elements != elems.length) {
		font_timer = setTimeout(function()
		{
			if (test_mode) console.log({
				font_times: font_times,
				current_color: current_color,
				current_bgcolor: current_bgcolor,
				current_fontfamily: current_fontfamily,
				elems_length: elems.length
			});
			traverse_dom();
			return;
		} , timer_ms);
	}
	else {
		font_timer = null;
	}
	// Call this function again if...
	/*if (total_elements != elems.length &&
		(//font_options["font-size"] ||  // Not using yet
		font_times != 1 ||
		//font_options["color"] || // Not using yet
		current_color != "reset" ||
		//font_options["background-color"] || // Not using yet
		current_bgcolor != "reset" ||
		//font_options["font-family"] // not using yet
		current_fontfamily != "Default Font"
		)) {
		
		font_timer = setTimeout(function()
		{
			if (test_mode) console.log(font_times);
			traverse_dom();
			return;
		} , timer_ms);
	}
	else {
		font_timer = null;
	}*/
	
}


function change_el_fontsize(el) {
	//var id = el.getAttribute('data-afsc-id'); // Version 1.5.0b - Removed
	//var default_fontsize = elems_array[id]["font-size"]; // Version 1.5.0b - Removed
	var default_obj = el_defaults(el); // Version 1.5.0b
	var default_fontsize = default_obj["font-size"]; // Version 1.5.0b
	
	var new_fontsize = Math.round(default_fontsize * font_times);
	var old_fontsize = Math.round(parseFloat(document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size"))); // Version 1.4.9 - Added Math.round(
	if (new_fontsize != old_fontsize) // Version 1.4.2c - Removed because jw.org was getting smaller text-size on refresh of some elements in articles // Version 1.4.9 - Re-added - Hopefully works
	{
		//el.style.fontSize = Math.round(default_fontsize * font_times) + "px"; // Can't set !important here!
		if (!el.isContentEditable || (el.parentNode && !el.parentNode.isContentEditable)) // Version 1.2.7 - Fix contentEditable (gmail etc) - Changing to bold grows bigger
		{	
			el.style.setProperty("font-size", Math.round(default_fontsize * font_times) + "px", "important"); 
			// Version 1.3.0 - Change line-height for websites like nytimes.com
			var cur_fontsize = parseInt(document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size"));
			var cur_lineheight = parseInt(document.defaultView.getComputedStyle(el,null).getPropertyValue("line-height"));
			if (cur_lineheight != "normal" && cur_lineheight <= (cur_fontsize+1))	
				el.style.setProperty("line-height", "normal", "important"); 
		}
	}
}


function change_fontcolor(option, color, save) {
	save = (typeof save !== "undefined") ? save : true; // Version 1.5.0b - Don't save locked profiles to uri storage
	
	if ( (option == "color" && current_color != color) || (option == "background-color" && current_bgcolor != color) )
	{
		// save to storage
		var obj = {}; obj[option] = color;
		if (save) // Version 1.5.0b - Don't save locked profiles to uri storage
			save_to_storage(obj);
		if (test_mode) console.log(option+":"+color);
		if (option == "color") 
			current_color = color;
		else if (option == "background-color") 
			current_bgcolor = color;
		// Version 1.4.9 - Show color in icon badge (send to background)
		if (window.self === window.top)
			if (option == "color") 
				send_to_background({"color" : color});
			else if (option == "background-color") 
				send_to_background({"background-color" : color});
	}
	
	total_elements = 0; // Reset total_elements so that the SetTimeout will traverse the entire DOM at least 1 more time
	
	if (!font_timer) 
		traverse_dom();
}

function change_el_color(el, option, color) {
	//var id = el.getAttribute('data-afsc-id'); // Version 1.5.0b - Removed
	//var default_color = elems_array[id][option]; // Version 1.4.9 - From "color" to option // Version 1.5.0b - Removed
	var default_obj = el_defaults(el); // Version 1.5.0b
	var default_color = default_obj[option]; // Version 1.5.0b
	
	var old_color = document.defaultView.getComputedStyle(el,null).getPropertyValue(option);
	old_color = rgb2hex(old_color); // Version 1.4.1 - Otherwise we were comparing rgb to hex with old_color != color below!
	
	if ((el.nodeName != "A" && !isDescendant("A", el)) || option == "background-color") // Version 1.3.7
	if (old_color != color && color != "underline") // Version 1.3.0 - Added && color != "underline"
	{
		// Version 1.3.5 - Remove background-image if it is a gradient and not a url
		if (option == "background-color") {
			var background_image = document.defaultView.getComputedStyle(el,null).getPropertyValue("background-image");
			var background = document.defaultView.getComputedStyle(el,null).getPropertyValue("background"); // version 1.3.9
			if (background_image.match(/gradient/i) && !background_image.match(/url/i))
				el.style.setProperty("background-image", "none", "important");
			// Version 1.3.7 - Set css mix-blend-mode to normal if it is not
			/*var mix_blend_mode = document.defaultView.getComputedStyle(el,null).getPropertyValue("mix-blend-mode");
			if (mix_blend_mode != "normal")
				el.style.setProperty("mix-blend-mode", "normal", "important");*/
		}
		// Version 1.3.5 - Don't change background-color on transparent backgrounds (alpha == 0)
		/*var ok_to_change_color = 1; 
		if (option == "background-color" && !el.nodeName.match(/BODY|HTML/i)) {
			var computed_color = document.defaultView.getComputedStyle(el,null).getPropertyValue(option);
			var matches = computed_color.match(/(\d+(\.\d+)?)/g); // Get "rgba(0, 0, 0, 0)" numbers // Need to use computed_color here instead of default_color because the pro version manifest.json has "run_at": "document_start" 
			if (matches.length == 4)  // There is an alpha channel set
				if (parseFloat(matches[3]) == 0) // The alpha channel is fully transparent if it is 0
					ok_to_change_color = 0; // Not ok to change elements with transparent backgrounds
		}*/
		// Version 1.3.7b - Add alpha to background-color if it is there, except for BODY|HTML/i 
		var new_color = color; 
		var alpha = ""; // Will be alpha in hex if it exists
		var computed_color = document.defaultView.getComputedStyle(el,null).getPropertyValue(option);
		//var color_to_check = (dom_ready == 2) ? default_color : computed_color; // Version 1.3.7i - Fixes needing to use computed_color instead of default_color
		var color_to_check = computed_color; // Version 1.3.8 - Hover elements not changing background with 1.3.7i
		var matches = color_to_check.match(/(\d+(\.\d+)?)/g); // Get "rgba(0, 0, 0, 0)" numbers // Need to use computed_color here instead of default_color because the pro version manifest.json has "run_at": "document_start" 
		if (matches.length == 4 && !el.nodeName.match(/BODY|HTML/i))  // There is an alpha channel set
			alpha = Math.round(parseFloat(matches[3] * 255)).toString(16); // alpha 0.7 to "b3"
		// Version 1.3.7 - if default background is not white then make it a little brighter than color chosen
		matches = default_color.match(/(\d+(\.\d+)?)/g);  // Version 1.3.8 - Hover elements not changing background with 1.3.7i
		background_image = document.defaultView.getComputedStyle(el,null).getPropertyValue("background-image"); // Version 1.3.9 - so background-image url is detected from what we set up above
		if (option == "background-color" && color != "reset" && !el.nodeName.match(/BODY|HTML/i)) { // Version 1.3.9 - Added - && !el.nodeName.match(/BODY|HTML/i) (We want to wipe out bakground urls on the body)
			if ((el.nodeName == "IMG" || background_image.match(/url/i)) 
				&& !el.className.match(/ytp-gradient/i) ) // Version 1.4.4 - Don't put gray background for controls on youtube videos
			{ // Black icons on gmail
				new_color = adjustColor(color, 70);
				alpha = "80"; // Alpha 80 = 127 decimal. Half transparency 0.5
			}
			else if ((parseInt(matches[0]) > 247 && parseInt(matches[1]) > 247 && parseInt(matches[2]) > 247) ||  // Whitish
				(parseInt(matches[0]) < 8 && parseInt(matches[1]) < 8 && parseInt(matches[2]) < 8) ) // Blackish
				new_color = color;
			else
				new_color = adjustColor(color, 10);
		}
		
		//if (ok_to_change_color) // Version 1.3.5 - Don't change background-color on transparent backgrounds (alpha == 0)
		{ // Version 1.3.5 - Don't change background-color on transparent backgrounds (alpha == 0)
			if (color == "reset")
				el.style.setProperty(option, default_color, "important"); // last option is priority. Set to null if no priority
			else
				el.style.setProperty(option, new_color+alpha, "important");	// Version 1.3.7 - From color to new_color+alpha
		}
	}
	
	// Version 1.3.7 - Removed anchor link stuff here
	/*if (el.nodeName == "A" && option == "color") { // if anchor element // Version 1.3.0 - Moved out of if (old_color != color) statement above
		var el_decoration = document.defaultView.getComputedStyle(el,null).getPropertyValue('text-decoration');
		if (!el.getAttribute('data-default-underline'))
			el.setAttribute('data-default-underline', el_decoration);	
		if (underline_toggle == true && color != "reset") 
			el.style.textDecoration = "underline"; // Add underline so they know where links are
		else if (el.getAttribute('data-default-underline').match(/^none/i))
			el.style.textDecoration = "none";
	}*/
}


function change_fontfamily(value, save) {
	save = (typeof save !== "undefined") ? save : true; // Version 1.5.0b - Don't save locked profiles to uri storage
	
	if (current_fontfamily != value) 
	{
		// save to storage
		var obj = {}; obj["font-family"] = value;
		if (save) // Version 1.5.0b - Don't save locked profiles to uri storage
			save_to_storage(obj);
		if (test_mode) console.log("font-family"+":"+value);
		current_fontfamily = value;
		// Version 1.4.9 - Show color in icon badge (send to background)
		if (window.self === window.top) // Version 1.4.9
			send_to_background({"font-family" : value});
	}
	
	total_elements = 0; // Reset total_elements so that the SetTimeout will traverse the entire DOM at least 1 more time
	
	if (!font_timer) 
		traverse_dom();
}


function change_el_fontfamily(el, value) {
	//var id = el.getAttribute('data-afsc-id'); // Version 1.5.0b - Removed
	//var default_fontfamily = elems_array[id]["font-family"]; // Version 1.5.0b - Removed
	var default_obj = el_defaults(el); // Version 1.5.0b
	var default_fontfamily = default_obj["font-family"]; // Version 1.5.0b
	
	var current_value = document.defaultView.getComputedStyle(el,null).getPropertyValue("font-family"); 
		
	if (current_value != value)
	{
		if (value == null || value.indexOf("Default") != -1)
		{
			el.style.setProperty("font-family", default_fontfamily, "important"); // last option is priority. Set to null if no priority
		}
		else
			el.style.setProperty("font-family", value, "important");
	}
}


function send_to_background(obj)
{	
	chrome.runtime.sendMessage(obj, function(response) {
		if (test_mode == 1) console.log(response.farewell);
	});
}


// Listen to message from background script
chrome.runtime.onMessage.addListener(
	function(obj, sender, sendResponse) {
    	// Version 1.3.7 - Detect colors in document that has not been changed with A+
		var cur_color = current_color || detect_color("color"); // Version 1.3.7d
		var cur_bgcolor = current_bgcolor || detect_color("background-color"); // Version 1.3.7d
    	var color_msg = (current_color) ? "" : chrome.i18n.getMessage("color_msg"); // Version 1.3.7d
		var bgcolor_msg = (current_bgcolor) ? "" : chrome.i18n.getMessage("bgcolor_msg"); // Version 1.3.7d
		
		if (test_mode) console.log(JSON.stringify(obj));
    	
		if (obj.hasOwnProperty("send"))
		{
			
			if (obj["send"] == "colors")
			{
				var colors_obj = { "uri" : window.location.hostname, "font_times" : font_times, "color" : cur_color, "background-color" : cur_bgcolor, "font-family" : current_fontfamily, "color_msg" : color_msg, "bgcolor_msg" : bgcolor_msg };
				sendResponse(colors_obj);
				return;
			}
		} 
		
		// Moved sendResponse here to prevent "ERROR: The message port closed before a reponse was received." on line 66 of popup.js
		if (!obj.hasOwnProperty("color") || obj["color"] != "reset")
			sendResponse({farewell: "From content: I got the object."}); 
		
    	if (obj.hasOwnProperty("button")) 
    	{
    		if (obj["button"] == "up") change_fontsize("up");
    		else if (obj["button"] == "down") change_fontsize("down");
    		else if (obj["button"] == "default") change_fontsize("default");	
    	}
    	if (obj.hasOwnProperty("font_times"))
		{
    		change_fontsize(parseFloat(obj["font_times"])); // Version 1.2.5
    	}
    	if (obj.hasOwnProperty("underline")) // Version 1.3.0
    	{
    		underline_toggle = obj["underline"];
    	}
		if (obj.hasOwnProperty("colorlinks")) // Version 1.3.7e
    	{
    		colorlinks_toggle = obj["colorlinks"];
    	}
    	if (obj.hasOwnProperty("color") && obj["color"]) 
    	{
    		if (obj["color"] == "reset") {
    			change_fontcolor("background-color", obj["color"]);	// reset will do the next line also
				change_fontcolor("color", obj["color"]);
				remove_css("background-color"); // Version 1.3.7c
				remove_css("color"); // Version 1.3.7c
				//remove_hyperlink_css(); // Version 1.3.7
				//remove_color_css(); // Version 1.3.7
				// Version 1.3.7 - Detect colors in document that have not been changed with A+
				cur_color = detect_color("color");
				cur_bgcolor = detect_color("background-color");
				//current_color = ""; // Version 1.4.9 - Removed. Was causing colors to not reset in traverse_dom()
				//current_bgcolor = ""; // Version 1.4.9 - Removed. Was causing colors to not reset in traverse_dom()
				var colors_obj = { "uri" : window.location.hostname, "font_times" : font_times, "color" : cur_color, "background-color" : cur_bgcolor, "font-family" : current_fontfamily, "color_msg" : chrome.i18n.getMessage("color_msg"), "bgcolor_msg" : chrome.i18n.getMessage("bgcolor_msg") };
				if (window.self === window.top) // Version 1.3.7b
					sendResponse(colors_obj);
				return;
			}
			else {
				var color = (obj["color"].match(/underline|colorlinks/)) ? current_color : obj["color"];
				if (test_mode) console.log (color);
				if (!obj["color"].match(/underline|colorlinks/)) // Version 1.3.7b
					change_fontcolor("color", obj["color"]);
				if (typeof color !== "undefined")
					add_css("color", color); // Version 1.3.7 - Also in storage.js
			}
    	}
    	if (obj.hasOwnProperty("bgcolor") && obj["bgcolor"]) 
    	{
    		change_fontcolor("background-color", obj["bgcolor"]);
			//add_css("background-color", obj["bgcolor"]); // Version 1.3.7 - Also in storage.js
    	}
    	if (obj.hasOwnProperty("font-family") && obj["font-family"] != null) 
    	{
    		change_fontfamily(obj["font-family"]);
    	}
      	
  });


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
			//change_fontsize("up"); // Version 1.3.6 - Make ALT buttons work in top doc and iframe at same time
			send_to_background({"button" : "up"});
		}
		else if (key == 189) // plus key
		{
			//change_fontsize("down"); // Version 1.3.6 - Make ALT buttons work in top doc and iframe at same time
			send_to_background({"button" : "down"});
		}
		else if (key == 8) // backspace
		{
			//change_fontsize("default"); // Version 1.3.6 - Make ALT buttons work in top doc and iframe at same time
			send_to_background({"button" : "default"});	
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

//save_fontsize();
//window.onload = change_css_fontsize;

function rgb2hex(rgb) { // Version 1.3.7
	// Convert rgb to hex including alpha. So it also does rgba2hexa
	// Example: rgb2hex("rgba(50, 35, 45, 0.7)");
	var matches = rgb.match(/(\d+(\.\d+)?)/g); // get all digits next to each other
	var hex = "#";
	for (var i in matches) {
		if (i < 3) // 0, 1, 2 (r, g, b)
			matches[i] = parseInt(matches[i]).toString(16); // parseInt the string to a number and then to hex with toString(16)
		if (i == 3) // alpha
			matches[i] = Math.round(parseFloat(matches[i] * 255)).toString(16); // "0.7" => 0.7 => 179 => "b3"
		if (matches[i].length == 1) 
			matches[i] = "0"+matches[i]; // Add leading 0 if needed
		hex += matches[i];
	}
	return(hex);
}

function hex2rgb(hex) { // Version 1.3.7
	// Convert hex color to rgb color or rgba to hexa
	// Example: hex2rgb("#ffffffbb");
	var matches = hex.match(/[0-9a-fA-F]{2}/g);
	var rgb = (matches.length == 4) ? "rgba(" : "rgb(";
	for (var i in matches) {
		if (i < 3) // 0, 1, 2 (r, g, b)	
			matches[i] = parseInt(matches[i], 16); // parseInt the hex number by using radix 16
		if (i == 3) // alpha
			matches[i] = Math.round(parseInt(matches[3], 16) / 255 * 1000) / 1000; // "bb" > 187 > 0.73333 > 733 > 0.733
		
		rgb += (i < matches.length - 1) ? matches[i]+", " : matches[i]+")";
	}
	return(rgb);
}

function adjustColor(color, amount) { // Version 1.3.7
	// Take in a hex color or rgb color and convert it to hex plus amount
	var new_color = "#";
	amount = amount || 0;
	if (typeof amount != "object") amount = [amount,amount,amount];
	if (color[0] == "#") {// if hex
		var radix = 16; // hexadecimal radix for parseInt
        color = color.slice(1); // Remove #
		var matches = color.match(/../g); // Get every 2 characters
	}	
	else { // if rgb(r, g, b)
		var radix = 10; // decimal radix for parseInt
		var matches = color.match(/(\d+(\.\d+)?)/g); // get all digits next to each other
	}
	
	for (var i in matches) {
		if (parseInt(matches[i], radix) + amount[i] >= 255) amount[i] = -Math.abs(amount[i]); // make amount negative if too white
		if (parseInt(matches[i], radix) + amount[i] <= 0) amount[i] = Math.abs(amount[i]); // make amount positive if too black
		matches[i] = Math.min(255, Math.max(0, parseInt(matches[i], radix) + amount[i])).toString(16);
		if (matches[i].length == 1) 
			matches[i] = "0"+matches[i];
		new_color += matches[i];
	}
	
	return new_color;
}

function detect_color(option) { // Version 1.3.7
	// Detect the color or background-color of a document that has not been changed yet
	var elem_options = [document.body, document.documentElement]; // Version 1.4.9 - Added var
	for (var i in elem_options) {
		var elem = elem_options[i];
		if (elem) {
			// Version 1.4.9 - change_fontcolor not fast enough removing colors from body so detect_color was incorrect in listener for colors reset
			// If we have changed the size of this element already
			if (elem.getAttribute('data-afsc-id')) // then it will have "data-default-fontsize" attribute
			{
				var id = elem.getAttribute('data-afsc-id');
				var default_color = elems_array[id][option];
				return rgb2hex(default_color);
			}
			var computed_color = document.defaultView.getComputedStyle(elem, null).getPropertyValue(option);
			var matches = computed_color.match(/(\d+(\.\d+)?)/g); // Get "rgba(0, 0, 0, 0)" numbers 
			if (matches.length == 4 && parseFloat(matches[3]) == 0) { // Transparent alpha channel set
				if (elem == document.documentElement && option == "background-color")
					return ("#ffffff"); // return rgb color in hex
			} else { // Either no alpha channel or it is not transparent
				return rgb2hex(computed_color); // return rgb color in hex
			}
		}
	}	
}


function add_css(option, color) { // Version 1.3.7c
	if (option != "background-color") // Version 1.3.8b - Prevent white flicker if set to black background
	if (!dom_ready || saving_defaults) {// Version 1.3.7c - Thought about !document.head || !document.documentElement but we really want it on head if available so we better wait for body
		setTimeout(function() { add_css(option, color); } , 10);
		return;
	}
	var id = "a-plus-fontsize-changer-"+option;
	if (option == "color") {
		var a_link_color = adjustColor(color, [10, 00, 140]);
		var a_visited_color = adjustColor(color, [80, 0, 140]);
		var a_hover_color = adjustColor(color, [60, 60, 60]);
		var underline = (underline_toggle == true) ? "text-decoration : underline;" : "";
		if (!colorlinks_toggle) {
			a_link_color = a_visited_color = a_hover_color = color;
		}
		var css = 	"a:link, a:link * { color : "+a_link_color+" !important; "+underline+"} "+
					"a:visited, a:visited * { color : "+a_visited_color+" !important; "+underline+"} "+
					"a:hover, a:hover * { color : "+a_hover_color+" !important; "+underline+"} ";
	}
	else if (option == "background-color"){
		var rgb = hex2rgb(color); // Version 1.3.8b - Prevent white flicker if set to black background
		var matches = rgb.match(/(\d+(\.\d+)?)/g); // get all digits next to each other
		oldValue = Math.max(...matches); // Get max color brightness of rgb values
		brightness = Math.round((((oldValue - 0) * (100 - 0)) / (255 - 0)) + 0);
		//if (parseInt(matches[0]) < 50 && parseInt(matches[1]) < 50 && parseInt(matches[2]) < 50) // Blackish
		{ 
			var css = "html { filter: brightness("+brightness+"%); }"; // Version 1.3.8b - Prevent white flicker if set to black background
			css += "html { background: "+color+" !important }"; // Version 1.5.0b - Stop yelp flicker
			setTimeout(function() { 
				remove_css('background-color'); // Version 1.3.8b - For iFrame that is not removing with dom_ready event at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
			}, 3000); // Version 1.4.2b - Changed from 2000 to 3000
		}
		//var hover_color = adjustColor(color, 10);
		//var css = 	"html, body { "+option+" : "+color+" !important; background-image: none !important } ";
		// css += ":hover * { background-color : "+color+" !important; /* background-image: none !important */ } ";
	}
	if (typeof css !== 'undefined') { // Version 1.3.8
		remove_css(option);
		var style = document.createElement('style');
		style.id = id;
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		(document.head||document.documentElement).appendChild(style);
		window[id] = style;	// So we can remove with remove_css(id) or remove_css(option)
		if (window.self === window.top) // Version 1.5.0b
		if (test_mode) console.log(new Date().toISOString('en-US')+" add_css("+option+", "+color+");"); // Version 1.5.0b - Stop yelp white flicker
	
	}
}

function remove_css(option) { // Version 1.3.7c
	// Delete style if it exists
	var id = "a-plus-fontsize-changer-"+option;
	var style = window[id] || document.getElementById(id) || null;
	if (style) {
		if (window.self === window.top)
		if (test_mode) console.log(new Date().toISOString('en-US')+" remove_css("+option+");"); // Version 1.5.0b - Stop yelp white flicker
		style.parentNode.removeChild(style);
		// delete style; // This doesn't delete. It returns false. 
		if (window[id]) delete window[id]; // Do we really even need to delete it?
	}	
}



function add_hyperlink_css(color) { // Version 1.3.7
	if (!dom_ready || saving_defaults) {// Version 1.3.7
		setTimeout(function() { add_hyperlink_css(color); } , 25);
		return;
	}
	var a_link_color = adjustColor(color, [10, 00, 140]);
	var a_visited_color = adjustColor(color, [80, 0, 140]);
	var a_hover_color = adjustColor(color, [60, 60, 60]);
	var underline = (underline_toggle == true) ? "text-decoration : underline;" : "";
	var css = 	"a:link, a:link * { color : "+a_link_color+" !important; "+underline+"} "+
				"a:visited, a:visited * { color : "+a_visited_color+" !important; "+underline+"} "+
				"a:hover, a:hover * { color : "+a_hover_color+" !important; "+underline+"} ";
	remove_hyperlink_css();
	var style = document.createElement('style');
	style.id = "a_plus_fontsize_changer_hyperlinks";
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	(document.head||document.documentElement).appendChild(style);
	window['a_plus_fontsize_changer_hyperlinks'] = style;
}

function remove_hyperlink_css() {
	// Delete style if it exists
	if (window['a_plus_fontsize_changer_hyperlinks']) {
		window['a_plus_fontsize_changer_hyperlinks'].parentNode.removeChild(window['a_plus_fontsize_changer_hyperlinks']);
		delete window['a_plus_fontsize_changer_hyperlinks'];
	}	
}

function add_color_css(option, color) { // Version 1.3.7
	// This function is so that background color changes more quickly when a page is reloaded
	// Called from storage.js
	if (!document.body) {// Version 1.3.7b // was !dom_ready
		setTimeout(function() { add_color_css(option, color); } , 25);
		return;
	}
	var elems = [document.documentElement, document.body]; // Save default background-color on html, body before we change it
	for (var i=0; i<elems.length; i++)
	{
		var el = elems[i];
		// If we have changed the color of this element already
		if (el.getAttribute('data-default-'+option)) // then it will have "data-default-color" attribute
		{
			var default_color = el.getAttribute('data-default-'+option);
		}
		else
		{
			var default_color = document.defaultView.getComputedStyle(el,null).getPropertyValue(option);
			el.setAttribute('data-default-'+option, default_color);
		}
	}
	var css = 	"html, body { "+option+" : "+color+" !important; }";
	remove_color_css();
	var style = document.createElement('style');
	style.id = "a_plus_fontsize_changer_body";
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	(document.head||document.documentElement).appendChild(style);
	window['a_plus_fontsize_changer_body'] = style;
}

function remove_color_css() { // Version 1.3.7
	// Delete style if it exists
	if (window['a_plus_fontsize_changer_body']) {
		window['a_plus_fontsize_changer_body'].parentNode.removeChild(window['a_plus_fontsize_changer_body']);
		delete window['a_plus_fontsize_changer_body'];
	}	
}

function isDescendant(tag, child) { // Version 1.3.7
	// Need this for Google to display colors for links because google nests many elements in Anchor tags
  var node = child.parentNode;
  while (node != null) {
    if (node.nodeName === tag) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}


function eq(A, B) { // Version 1.3.7 Are 2 arrays equal. Used by start_hovered()
  if (!A || !B) return false;
  if (A.length !== B.length) return false;
  for (let i = 0; i < A.length; i++) {
    if (A[i] !== B[i]) return false;
  }
  return true;
}


function start_hovered() { // Version 1.3.7d - Tried but didn't work well
	/* 	Some elements get a white background when hovered such as "Tools" button
		at Google.com or or the All Transactions listed items at Paypal. So we
		have to call change_fontcolor over and over for each element or use this
		function and only send the elements that are hovered over and change them
		to a dark color background. Also need to change text color in case the hover
		is changing the text color to dark on hover. 
		This is a mess when I add color and if I reset the colors. It keeps calling it.
	*/
	
		window["hover_timer"] = setInterval( function() {
			var hovered_elems = document.querySelectorAll( ":hover" );
			if (hovered_elems.length > 0 && !eq(window["hovered_elems"], hovered_elems)) {
				window["hovered_elems"] = hovered_elems;
				if (test_mode) console.log(hovered_elems);
				if (current_bgcolor && current_bgcolor != "reset") 
					change_fontcolor("background-color", current_bgcolor, hovered_elems);
				//if (current_color && current_color != "reset") 
				//	change_fontcolor("color", current_color, hovered_elems);
				
			}
		}, timer_ms);

}

window.addEventListener('load', function(){ // Version 1.3.7
	if (test_mode) console.log("Window loaded");
	setTimeout(function() { dom_ready = 2;}, 1000); // Version 1.4.2 - Helps stop Lucian's problem of text growing too big on page refresh if you comment out dom_ready = 2 and dom_ready = true below
	// dom_ready = 2; Version 1.4.2 - Commented out
	setTimeout(function() { // Version 1.4.2 - Added setTimeout because white filcker at jw.org
		remove_css('background-color'); // Version 1.3.8b - Prevent white flicker if set to black background
	}, 1000);
});

document.addEventListener('DOMContentLoaded', function(event) { // Version 1.3.7
	/* The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, 
	without waiting for stylesheets, images, and subframes to finish loading. 
	*/
	if (test_mode) console.log("DOMContentLoaded");
	setTimeout(function() { dom_ready = true;}, 1000); // // Version 1.4.2 - Added setTimeout around dom_ready = true. Helps stop Lucian's problem of text growing too big on page refresh. Try test at https://osha.oregon.gov/Pages/topics/agricultural-labor-housing.aspx
	//start_hovered(); // Version 1.3.7d - Tried and removed
	setTimeout(function() { 
		remove_css('background-color'); // Version 1.3.8b - Prevent white flicker if set to black background
	}, 2000);
});


// Version 1.4.2b - External stylesheets are not loaded until after DOMContentLoaded so incorrect default-font-size could be applied
// Could be <link rel='stylesheet'> or <link rel='preload' as='style'>
if (test_mode) console.log(document.styleSheets.length);
function wait_for_styles() {
	if (!document.body) {// Version 1.3.7b // was !dom_ready
		setTimeout(function() { wait_for_styles(); } , 10);
		return;
	}
	var css_links = document.head.querySelectorAll("link[rel*='stylesheet'], link[as*='style']");
	css_links.forEach((link) => {
		link.addEventListener("load", function(event) {
			if (test_mode) console.log(event);
			if (test_mode) console.log(document.styleSheets.length);
		});
	});
}

//wait_for_styles(); // Version 1.4.2b // Commented out. Maybe use later


function observe(el) // Version 1.5.0b
{
	/* Version 1.5.0b - I tried MutationObserver for fontsize2.js with drop down
		menus at the top of Yelp. But it was still almost as slow as traverse_dom.
		Still saw the white of the drop down menu before it changed. So commented
		out observe() below. Not using
	*/
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	if (test_mode) console.log(mutations);  
	mutations.forEach(function(mutation) {
	    //console.log(mutation);
	    /* For some reason chrome will hang sometimes if I do add_label(el)
	    	using mutation observer. So I commented it out */
	     for (var i = 0; i < mutation.addedNodes.length; i++)
	    	if (mutation.addedNodes[i].nodeType == 1) { // Only send element nodes not text nodes
				try {
					var el = mutation.addedNodes[i];
					if (font_times) change_el_fontsize(el); // Version 1.4.9 - Added if (font_times)
					if (current_color) change_el_color(el, "color", current_color);
					if (current_bgcolor) change_el_color(el, "background-color", current_bgcolor); // Version 1.4.9 - Fixed type: From current_bg_color to current_bgcolor
					if (current_fontfamily) change_el_fontfamily(el, current_fontfamily);
				} catch (error) {
					console.log(error);
				}
			}
		//add_label(mutation.target); // Send target node to add_label(el)
	    
	    
	    //if (test_mode) console.log("Mutations: "+mutation_num);
	  });    
	});
	 
	// configuration of the observer:
	var config = { childList: true, subtree: true };
	 
	// pass in the target node, as well as the observer options
	observer.observe(el, config);
}

//document.addEventListener('DOMContentLoaded', function () { // Version 1.2.8 - Added addEventLister to prevent: Uncaught TypeError: Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'.
	//observe(document.body || document.documentElement || document); // Version 1.5.4e - Added  || document.documentElement || document to try and prevent error above again at https://javascript.info/dispatch-events
// }); // Version 1.3.0 - Removed because manifest is loading content at documentend so DOMContentLoaded is never called


