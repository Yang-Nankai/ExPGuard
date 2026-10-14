/*	A+ FontSize Changer
A+ FontSize Changer is a Chrome Extension that lets the user customize the font size, font color and background color on a page. It actually changes the fontSize of each element unlike Chrome's action with CTRL+ and CTRL- which zooms the page. Sometimes you wish to increase the text size without zooming the page so that paragraphs do not scroll past the edge of the screen.

A+ Fontsize Changer works where others fail!  Even on pages with dynamic content! Even on pages with iFrames! Just use the buttons to change the fontsize or use keyboard shortcuts ALT+ and ALT-.

Some webpage authors use a gray font color instead of black which can be hard on the eyes. With A+ FontSize Changer you can also change the text color and background color on a page.

NOTES:

iframes: If using ALT+ or ALT- is not changing the font size for text in an iframe then first click on the iframe and then use ALT+ or ALT-. Alternatively you can use the buttons in the pop-up menu, which will change the text size on the document and in iframes. This is a strange limitation with Chrome.

PRO FEATURES:

* Saves custom font size for each website you visit
* Saves custom font color for each website you visit
* Saves custom background color for each website you visit
*/

/* Questions:
	1. How do we reset back to default size?
*/

/*	Methods to get the current font size of each element:
	1. getComputedStyle
			document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size")
		is not very good because it always returns the "px" size of the element
		regardless if it was set it as "em", "pt" or "%".  This actually might work but
		we would have to traverse every element in the document every time we wanted to
		increase or decrease the font and set a new size to EVERY element in the DOM.
	2. cur_size = el.style.fontSize;
		This works but only gets fontSize set inline and not in styleSheets. In other
		words it will get styles set on the element in html, ex:
		<div style="font-size: 1em">
		or it will get the fontSize as set in javascript.
		Again we have to traverse the whole document, but at least we don't have to
		change every element.  Only those that have been set this way.
	3. document.styleSheets[0].cssRules[0].cssText
		Modifying a function from find5.js we can traverse all the StyleSheets and 
		look for font-size set in cssRules. cssText contains all the rules in text
		format for a rule.  So we could match "font-size" and then get the font-size with
		cur_size = document.styleSheets[0].cssRules[0].style.fontSize;
*/

/* 	We also want to save the user set fontSize in a cookie for each page.  But we
	don't want http:// or # (hash):
	var uri = window.location.href.split("#")[0];
	
	No even better yet. We want the page but not anything on the search string
	
	window.location.href = http://www.seabreezecomputers.com/rater/?your_votes=1#here
	window.location.protocol = http:
	window.location.hostname = www.seabreezecomputers.com
	window.location.pathname = /rater
	window.location.search = ?your_votes=1
	window.location.hash = #here
	
	var url = window.location.hostname+window.location.pathname; // www.seabreezecomputers/rater
	
	Chrome seems to save zoom size according to hostname only.  If you have two tabs open to the
	same domain and change the size of one and switch to the other tab it will be the new size.
	But this does NOT seem to be happening with pages at www.seabreezecomputers.com
	
	
	To store the cookie we don't want to use cookie or localStorage because they
	can't easily be read between the content script and the background script.
	So instead we want to use chrome.storage API. 
	http://stackoverflow.com/questions/3937000/chrome-extension-accessing-localstorage-in-content-script
	
	We can set the cookie in one script and it can be read in the other script 
	directly or with:
	chrome.storage.onChanged.addListener
	
	We can save each pages settings with:
	var data = { uri : fontsize };
	chrome.storage.local.set(data, function() {
          // Notify that we saved.
          message('Settings saved');
        });
      }
      
    maifest.json permissions: ["unlimitedStorage"] // otherwise chrome.storage.local is only 5MB. Does not work for sync. Sync can only have 512 MAX_ITEMS
      
    JSON objects in localStorage and chrome.storage:
    	1. Both localStorage and chrome.storage can only get and set from the top keys. We can't ask to get
    	a nested key without getting the top key. That is why I decided to put each uri as the key.
    	2. localStorage has to turn the object into a string and parse it, but chrome.storage does not:
    	http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage?rq=1
    	var testObject = { 'one': 1, 'two': 2, 'three': 3 };
		// Put the object into storage
		localStorage.setItem('testObject', JSON.stringify(testObject));	
		// Retrieve the object from storage
		var retrievedObject = localStorage.getItem('testObject');	
		console.log('retrievedObject: ', JSON.parse(retrievedObject));
		

From https://developer.chrome.com/apps/offline_apps:
Chrome Storage API	Small amounts of string data	
	Great for settings and state. Easy to sync remotely (but you don't have to). Not good for larger amounts of data, due to quotas.
IndexedDB API	
	Structured data	Enables fast searches on data. Use with the "unlimitedStorage" permission.
Filesystem API	
	Anything else	Provides a sandboxed area where you can store files. Use with the "unlimitedStorage" permission.

Note: Packaged apps cannot use Web SQL Database or localStorage. 
The WebSQL specification has been deprecated for awhile now, and 
localStorage handles data synchronously (which means it can be slow). 
The Storage API handles data asynchronously.

From: https://developer.chrome.com/extensions/storage
5MB = The maximum amount (in bytes) of data that can be stored in local storage, 
as measured by the JSON stringification of every value plus every key's length. 
This value will be ignored if the extension has the unlimitedStorage permission.
	
*/

//var uri = window.location.href.split("#")[0]; // www.seabreezecomputers.com
//var uri = window.location.hostname; // www.seabreezecomputers.com


var test_mode = ('update_url' in chrome.runtime.getManifest()) ? false : true; // If loaded from Web Store instead of local folder than getManifest has update_url property
/*chrome.management.getSelf(function (extensionInfo) { // Version 1.4.1 - Because Edge extensions may not get update_url -> https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/developer-guide/port-chrome-extension
	test_mode = (extensionInfo.installType == 'development') ? true : false;
	if (test_mode) console.log(extensionInfo); // 1.4.1B - NEVERMIND; CHROME.MANAGEMENT IS NOT AVAILABLE TO CONENT SCRIPTS
}); */
var font_times = 1; // Current multiplyer (1.2 * 100 = 120) or 1.2X is the same as 120%
var current_color;
var current_bgcolor;
var font_timer;
var color_timer;
var bgcolor_timer;
var fontfamily_timer;
var current_fontfamily;
var underline_toggle; // Version 1.3.0
var colorlinks_toggle; // Version 1.3.7e
var timer_ms = (window.self === window.top) ? 500 : 3000; // Version 1.3.7 - SetTimeout 1000ms for top frame and 3000ms for iFrames. Previous was 500ms for everything
// var total_elements = 0; // Version 1.3.7
var total_elements = { // Version 1.3.7b - Each font function needs it's own total elements count
	"save_defaults" : 0,
	"font-size" : 0,
	"color" : 0,
	"background-color" : 0,
	"font-family" : 0,
}
var font_options = { // Version 1.3.7
	"font-size" : null,
	"color" : null,
	"background-color" : null,
	"font-family" : null,	
};	
var dom_ready = false; // Version 1.3.7
if (document.readyState === 'interactive') dom_ready = true; // Version 1.4.1 - On fresh extension installs and content script being injected, it would not run because dom_ready was always false
if (document.readyState === 'complete') dom_ready = 2; // Version 1.4.1 - On fresh extension installs and content script being injected, it would not run because dom_ready was always false
var saving_defaults = false; // Version 1.3.7

function change_css_fontsize(direction)
{
	/* This function was my orginal intention, but it does not seem
		to be working well on some pages
		rules[j].style.fontSize is undefined even when typeof is true!?
	*/
	var info = "";
	var sheets = document.styleSheets;
	for (var i=0; i < sheets.length; i++)
	{
		// IE <= 8 uses rules; FF & Chrome and IE 9+ users cssRules
		var rules = sheets[i].cssRules;
		if (rules != null)
		for (var j=0; j < rules.length; j++)
		{
			if (rules[j].cssText.match(/font-size/i))
			{
				info += rules[j].style.getPropertyValue("font-size");	
				//info += rules[j].style.cssText;	
			}
		}
	}
	alert(info);

} // end function change_css_fontsize(direction)


function all_doms(callback)
{
	var dom;
	
	// First process iframes
	for (var i=0; i<window.frames.length;i++)
	{
		dom = window.frames[i].document;
		callback(dom, arguments[1], arguments[2]);	// Note: arguments[0] is callback
	}
	
	// Now process the regular document
	dom = document;
	callback(dom, arguments[1], arguments[2]);	// Note: arguments[0] is callback
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


function save_defaults(opt)
{
	/* The reason why we have to call this function in the beginning
		is because child elements fontSizes are relative to their parents.
		So if we change their parents, then the children keep getting bigger
		and then data-default-fontsize will be greatly off.
		NOTE: I think for truly dynamic pages we will have to call save_fontsize()
		before each change_fontsize call.
	*/ 
	var options = ["font-size", "color", "background-color", "font-family"]; // Version 1.3.7
	var onScreenEl = false; // Version 1.3.0
	//var elems = document.getElementsByTagName("*"); // Note we removed .body so we could get body tag as well and not just children of body
	var elems = document.querySelectorAll('body, body *'); // Version 1.4.2c
	var elems_length = elems.length;
	if (elems_length == total_elements['save_defaults'] && opt != "font-size") // Version 1.3.7 - Don't loop through everything if no new elements
		return; // We only need to return onScreenEl if changing font-size
	if (test_mode) console.log("save_defaults loop. "+"elems.length="+elems_length+". total_elements['save_defaults']="+total_elements['save_defaults']);
	for (var i=0; i<elems_length; i++)
	for (var j=0; j<options.length; j++) // Version 1.3.7
	{
		saving_defaults = true;
		var el = elems[i];
		var option = options[j];
		
		// If we have saved the size of this element already
		if (el.getAttribute('data-default-'+option)) // then it will have "data-default-font-size" attribute
		{
			var default_value = el.getAttribute('data-default-'+option);
		}
		else
		{
			var default_value = document.defaultView.getComputedStyle(el,null).getPropertyValue(option); // Version 1.3.7 - Removed parseFloat
			el.setAttribute('data-default-'+option, default_value);
		}
		
		if (opt == "font-size" && !onScreenEl) { 
			onScreenEl = isOnScreen(el); // Version 1.3.0
			if (onScreenEl && test_mode) { console.log("onScreenEl:"); console.log(onScreenEl); }
			if (onScreenEl && elems_length == total_elements['save_defaults']) { // Version 1.3.7 - Don't loop through everything if there are no new elements
				saving_defaults = false;
				return (onScreenEl);
			}
		}
	} 
	total_elements['save_defaults'] = elems_length; // Version 1.3.7
	saving_defaults = false;
	return (onScreenEl); // Version 1.3.0

} // end function save_defaults()



function save_fontsize()
{
	/* The reason why we have to call this function in the beginning
		is because child elements fontSizes are relative to their parents.
		So if we change their parents, then the children keep getting bigger
		and then data-default-fontsize will be greatly off.
		NOTE: I think for truly dynamic pages we will have to call save_fontsize()
		before each change_fontsize call.
	*/ 
	var onScreenEl = false; // Version 1.3.0
	var elems = document.getElementsByTagName("*"); // Note we removed .body so we could get body tag as well and not just children of body
	for (var i=0; i<elems.length; i++)
	{
		var el = elems[i];
		if (!onScreenEl) onScreenEl = isOnScreen(el); // Version 1.3.0
		
		// If we have changed the size of this element already
		if (el.getAttribute('data-default-font-size')) // then it will have "data-default-fontsize" attribute
		{
			var default_fontsize = el.getAttribute('data-default-font-size'); // Version 1.3.7 - Changed fontsize to font-size everywhere
		}
		else
		{
			var default_fontsize = parseFloat(document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size"));
			el.setAttribute('data-default-font-size', default_fontsize);
		}
	} 
	
	return (onScreenEl); // Version 1.3.0

} // end function save_fontsize()


function change_fontsize(direction)
{
	/* change_fontsize() changes all the elements on the page to a new fontsize.
		document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size") contains
		the calculated font-size of an element. So EVERY element has a value
	*/
	if (!dom_ready || saving_defaults) {// Version 1.3.7
		setTimeout(function() { change_fontsize(direction); } , 10);
		return;
	}
	var old_font_times = font_times;
	var onScreenEl = false; // Version 1.3.0
	var onScreenElTop = false; // Version 1.3.0
	
	clearTimeout(font_timer);
	
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
	
	//var elems = document.getElementsByTagName("*"); // Note we removed .body so we could get body tag as well and not just children of body
	var elems = document.querySelectorAll('body, body *'); // Version 1.4.2c
	var elems_length = elems.length;
	if (elems_length != total_elements['font-size'] || font_times != font_options["font-size"] || document.readyState != "complete") // Version 1.3.7c - From !dom_ready to dom_ready != 2 // Version 1.4.2 - Changed to document.readyState != "complete" to help solve Lucian's text too big on reload
	{ // Version 1.3.7 - Don't loop through everything if there are no new elements
		if (test_mode) console.log("font-size loop. "+"elems.length="+elems_length+". total_elements['font-size']="+total_elements['font-size']);
		total_elements['font-size'] = elems.length; // Version 1.3.7b
		onScreenEl = save_defaults("font-size"); // In case they have dynamic content like Google.com does // Version 1.3.7
		if (onScreenEl) { 
			onScreenElTop = onScreenEl.getBoundingClientRect().top; 
			if (test_mode) { console.log("onScreenEl.top = "+onScreenEl.getBoundingClientRect().top); }
		}
		for (var i=0; i<elems_length; i++)
		{
			var el = elems[i];
			// If we have changed the size of this element already
			if (el.getAttribute('data-default-font-size')) // then it will have "data-default-font-size" attribute
			{
				var default_fontsize = parseFloat(el.getAttribute('data-default-font-size')); // Version 1.3.7 - Added parseFloat
			}
			else
			{
				var default_fontsize = parseFloat(document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size"));
				el.setAttribute('data-default-font-size', default_fontsize);
			}
			
			var new_fontsize = Math.round(default_fontsize * font_times);
			var old_fontsize = Math.round(parseFloat(document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size")));
			//if (new_fontsize != old_fontsize) // Version 1.4.2c - Removed because jw.org was getting smaller text-size on refresh of some elements in articles
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
		font_options["font-size"] = font_times; // Version 1.3.7
	}
	
	if (font_times != old_font_times)
	{
		// Show font_times in icon badge
		if (window.self === window.top) // Version 1.3.6
			send_to_background({"font_times" : font_times});
		// save to storage
		if ( typeof save_to_storage == 'function' ) save_to_storage({"font_times" : font_times});
		if (test_mode) console.log("font_times: "+font_times);
		if (onScreenEl) { // Version 1.3.0
			if (test_mode) console.log("onScreenEl.top = "+onScreenEl.getBoundingClientRect().top);
			if (document.body.scrollTop) document.body.scrollTop += onScreenEl.getBoundingClientRect().top - onScreenElTop; 
			else if (document.documentElement.scrollTop) document.documentElement.scrollTop += onScreenEl.getBoundingClientRect().top - onScreenElTop;
		}
	}
	
	// For pages with dynamic content recall this function
	if (font_times != 1) // Version 1.3.7
	font_timer = setTimeout(function()
	{
		change_fontsize(font_times);
		return;
	} , timer_ms); // Version 1.3.7 - from 500 to timer_ms
	
	
	
} // end function change_fontsize(direction)


function save_color(option)
{
	// option = "background-color" or "color"
	var elems = document.getElementsByTagName("*"); // Note we removed .body so we could get body tag as well and not just children of body
	for (var i=0; i<elems.length; i++)
	{
		var el = elems[i];
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
	
} // end function save_color()


function change_fontcolor(option, color, elems)
{
	if (!dom_ready || saving_defaults) {// Version 1.3.7
		setTimeout(function() { change_fontcolor(option, color, elems); } , 10);
		return;
	}
	// option = "background-color" or "color"
	
	if (option == "color") clearTimeout(color_timer);	
	else if (option == "background-color") clearTimeout(bgcolor_timer);
	
	//var elems = document.body.getElementsByTagName("*"); // Note we removed .body so we could get body tag as well and not just children of body // Version 1.3.7c - Added body tag
	elems = elems || document.querySelectorAll('body, body *'); // Version 1.3.7d = Get body and * but not html or head
	var elems_length = elems.length;
	//if (test_mode) { console.log("elems.length="+elems_length+". total_elements['"+option+"']="+total_elements[option]);}
	//if (elems_length != total_elements[option] || color != font_options[option] || dom_ready != 2) 
	{ // Version 1.3.7 - Don't loop through everything if there are no new elements
		if (test_mode) console.log(option+" loop. "+"elems.length="+elems_length+". total_elements['"+option+"']="+total_elements[option]); // Version 1.4.1 - Removed
		total_elements[option] = elems.length; // Version 1.3.7b
		save_defaults(option); // In case they have dynamic content like Google.com does // Version 1.3.7 - From save_color to save_defaults
		for (var i=0; i<elems_length; i++)
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
			
			var old_color = document.defaultView.getComputedStyle(el,null).getPropertyValue(option);
			old_color = rgb2hex(old_color); // Version 1.4.1 - Otherwise we were comparing rgb to hex with old_color != color below!
			
			if ((el.nodeName != "A" && !isDescendant("A", el)) || option == "background-color") // Version 1.3.7
			if (old_color != color && color != "underline") // Version 1.3.0 - Added && color != "underline"
			{
				// Version 1.3.5 - Remove background-image if it is a gradient and not a url
				if (option == "background-color") {
					var background_image = document.defaultView.getComputedStyle(el,null).getPropertyValue("background-image");
					var background = document.defaultView.getComputedStyle(el,null).getPropertyValue("background"); // version 1.3.9
					//if ( (background_image.match(/gradient/i) && !background_image.match(/url/i))
					//	|| (background.match(/repeat/i) && !background.match(/no-repeat/i)) )   // Version 1.3.9 - Added repeat because jw.org popup scripture url repeat is a solid white color. REMOVED - Did not work on "Google apps" icons on google.com
					if (background_image.match(/gradient/i) && !background_image.match(/url/i))
						el.style.setProperty("background-image", "none", "important");
				}
				// Version 1.3.5 - Don't change background-color on transparent backgrounds (alpha == 0)
				/*var ok_to_change_color = 1; 
				if (option == "background-color" && !el.nodeName.match(/BODY|HTML/i)) {
					var computed_color = document.defaultView.getComputedStyle(el,null).getPropertyValue(option);
					var matches = computed_color.match(/(\d+(\.\d+)?)/g); // Get "rgba(0, 0, 0, 0)" numbers // Need to use computed_color here instead of default_color because the pro version manifest.json has "run_at": "document_start" 
					if (matches.length == 4)  // There is an alpha channel set
						if (parseFloat(matches[3]) < 1) // The alpha channel is fully transparent if it is 0 // Version 1.3.7 - from == 0 to < 1 - jw player video jw-controls div has rgba(0, 0, 0, 0.2) // https://www.verywellmind.com/common-types-of-depression-1067313
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
				{	
					if (color == "reset") {
						el.style.setProperty(option, default_color, "important"); // last option is priority. Set to null if no priority
					}
					else {
						el.style.setProperty(option, new_color+alpha, "important"); // Version 1.3.7 - From color to new_color+alpha
					}
				}
			}
			
			/* // Version 1.3.7 - Removed anchor link stuff here
			if (el.nodeName == "A" && option == "color") { // if anchor element // Version 1.3.0 - Moved out of if (old_color != color) statement above
				var el_decoration = document.defaultView.getComputedStyle(el,null).getPropertyValue('text-decoration');
				if (!el.getAttribute('data-default-underline'))
					el.setAttribute('data-default-underline', el_decoration);	
				if (underline_toggle == true && color != "reset") 
					el.style.textDecoration = "underline"; // Add underline so they know where links are
				else if (el.getAttribute('data-default-underline').match(/^none/i))
					el.style.textDecoration = "none";
			}*/
		}
		font_options[option] = color; // Version 1.3.7
	}
	
	if ( (option == "color" && current_color != color) || (option == "background-color" && current_bgcolor != color) )
	{
		// save to storage
		var obj = {}; obj[option] = color;
		if ( typeof save_to_storage == 'function' )
			save_to_storage(obj);
		if (test_mode) console.log(option+":"+color);
		if (option == "color") current_color = color;
		else if (option == "background-color") 
		{
			current_bgcolor = color;
			// document.body.style.setProperty(option, color, "important"); // Can't change body without saving default color first
		}
	}
	
	// For pages with dynamic content recall this function
	if (color != "reset") // Version 1.3.7 
	if (option == "color") color_timer = setTimeout(function()
	{
		change_fontcolor(option, color);
		return;
	} , timer_ms);
	else if (option == "background-color") bgcolor_timer = setTimeout(function()
	{
		change_fontcolor(option, color);
		return;
	} , timer_ms); // Version 1.3.7 - from 500 to timer_ms
	
	
} // end function change_fontcolor()

function change_pseudo(option, color, el, index) { // Version 1.4.1 - For c-wiz HgVFRb element ::before at translate.google.com
	var pseudo_list = ['::before', '::after'];
	for (var i = 0; i < psuedo_list.length; i++) {
		var computed_color = document.defaultView.getComputedStyle(el,pseudo_list[i]).getPropertyValue(option);
		
	}
}


function save_fontfamily(value)
{
	/* The reason why we have to call this function in the beginning
		is because child elements fontSizes are relative to their parents.
		So if we change their parents, then the children keep getting bigger
		and then data-default-fontsize will be greatly off.
		NOTE: I think for truly dynamic pages we will have to call save_fontsize()
		before each change_fontsize call.
	*/ 
	var elems = document.getElementsByTagName("*"); // Note we removed .body so we could get body tag as well and not just children of body
	for (var i=0; i<elems.length; i++)
	{
		var el = elems[i];
		// If we have changed the size of this element already
		if (el.getAttribute('data-default-font-family')) // then it will have "data-default-fontsize" attribute
		{
			var default_fontfamily = el.getAttribute('data-default-font-family');
		}
		else
		{
			var default_fontfamily = document.defaultView.getComputedStyle(el,null).getPropertyValue("font-family");
			el.setAttribute('data-default-font-family', default_fontfamily);
		}
	} 

} // end function save_fontsize()


function change_fontfamily(value)
{
	/* change_fontsize() changes all the elements on the page to a new fontsize.
		document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size") contains
		the calculated font-size of an element. So EVERY element has a value
	*/
	if (!dom_ready || saving_defaults) {// Version 1.3.7
		setTimeout(function() { change_fontfamily(value); } , 10);
		return;
	}
	clearTimeout(fontfamily_timer);
	var elems = document.getElementsByTagName("*"); // Note we removed .body so we could get body tag as well and not just children of body
	var elems_length = elems.length;
	if (elems_length != total_elements['font-family'] || value != font_options["font-family"] || document.readyState != "complete") { // Version 1.3.7 - Don't loop through everything if no new elements // Version 1.4.2 - Changed from dom_ready != 2 to document.readyState != "complete" to help solve Lucian's text too big on reload
		if (test_mode) console.log("font-family loop. "+"elems.length="+elems_length+". total_elements['font-family']="+total_elements['font-family']);
		total_elements['font-family'] = elems.length; // Version 1.3.7b
		save_defaults("font-family"); // In case they have dynamic content like Google.com does // Version 1.3.7 - From save_fontfamily to save_defaults
		for (var i=0; i<elems_length; i++)
		{
			var el = elems[i];
			// If we have changed the size of this element already
			if (el.getAttribute('data-default-font-family')) // then it will have "data-default-fontsize" attribute
			{
				var default_fontfamily = el.getAttribute('data-default-font-family');
			}
			else
			{
				var default_fontfamily = document.defaultView.getComputedStyle(el,null).getPropertyValue("font-family");
				el.setAttribute('data-default-font-family', default_fontfamily);
			}
			
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
		font_options["font-family"] = value; // Version 1.3.7
	}
	
	if (current_fontfamily != value) 
	{
		// save to storage
		var obj = {}; obj["font-family"] = value;
		if ( typeof save_to_storage == 'function' )
			save_to_storage(obj);
		if (test_mode) console.log("font-family"+":"+value);
		current_fontfamily = value;
	}
	
	// For pages with dynamic content recall this function
	if (value != "Default Font") // Version 1.3.7 
	fontfamily_timer = setTimeout(function()
	{
		change_fontfamily(value);
		return;
	} , timer_ms); // Version 1.3.7 - from 500 to timer_ms
	
	
	
} // end function change_fontsize(direction)



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
    	if (obj.hasOwnProperty("color")) 
    	{
    		if (obj["color"] == "reset") {
    			change_fontcolor("background-color", obj["color"]);	// reset will do the next line also
				change_fontcolor("color", obj["color"]);
				remove_css("background-color"); // Version 1.3.7c
				remove_css("color"); // Version 1.3.7c
				//remove_hyperlink_css(); // Version 1.3.7
				//remove_color_css(); // Version 1.3.7
				// Version 1.3.7 - Detect colors in document that has not been changed with A+
				cur_color = detect_color("color");
				cur_bgcolor = detect_color("background-color");
				current_color = "";
				current_bgcolor = "";
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
    	if (obj.hasOwnProperty("bgcolor")) 
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
	elem_options = [document.body, document.documentElement];
	for (var i in elem_options) {
		var elem = elem_options[i];
		if (elem) {
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
	}
}

function remove_css(option) { // Version 1.3.7c
	// Delete style if it exists
	var id = "a-plus-fontsize-changer-"+option;
	var style = window[id] || document.getElementById(id) || null;
	if (style) {
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

