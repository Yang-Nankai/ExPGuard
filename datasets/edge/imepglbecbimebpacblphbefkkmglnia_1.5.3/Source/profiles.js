// Profiles.js - Created 8/31/2017 - Version 1.2.5
var test_mode = ('update_url' in chrome.runtime.getManifest()) ? false : true; // If loaded from Web Store instead of local folder than getManifest has update_url property
var running_script = "profiles";
var storage_ready = false; // It takes a while for chrome.storage.local.get to get the storage object
var still_saving = false; // Needed for save_to_storage otherwise if called twice in a row we get the previous object before it is saved with local.set

var profiles = [
	{ "lock" : false, "name" : "Profile 1", "font_times" : 1, "color" : "#000000", "background-color" : "#ffffff", "font-family" : "Default Font" }, // Version 1.3.7 - From Default to Default Font
	{ "lock" : false, "name" : "Profile 2", "font_times" : 1, "color" : "#ffffff", "background-color" : "#000000", "font-family" : "Default Font" },
	{ "lock" : false, "name" : "Profile 3", "font_times" : 1.2, "color" : "", "background-color" : "", "font-family" : "Default Font" }
];

function load_profiles(top_key)
{
	/* set top_key to null to get an object with all the storage values */
	chrome.storage.local.get(top_key, function(obj)
	{
	 	//if (typeof obj[top_key] == "undefined") return false; // key does not exist so return
	 	// or we could do
	 	//if (obj.hasOwnProperty(top_key) == false) return false; // key does not exist so return
	 	
	    
		if (test_mode) console.log("Profiles from storage: "+JSON.stringify(obj));
	    /*
	    if (obj[top_key].hasOwnProperty("font_times"))
	    	change_fontsize(parseFloat(obj[top_key]["font_times"])); // turn into number
	    if (obj[top_key].hasOwnProperty("color"))
	    	change_fontcolor("color", obj[top_key]["color"]);
	    if (obj[top_key].hasOwnProperty("background-color"))
	    	change_fontcolor("background-color", obj[top_key]["background-color"]);
	    */
		// Merge with settings object
		//mergeObject(profiles, obj); 
		if (!isEmpty(obj))
			profiles = obj["profiles"];	
		storage_ready = true;   
	});
} // end function load_profiles()


function save_profiles(obj)
{		
	// Save to chrome.storage
	chrome.storage.local.set(obj, function() 
	{
	  	still_saving = false;
		if (test_mode) console.log("Saved to storage: "+JSON.stringify(obj));
	  	
		if(chrome.runtime.lastError)
	    {
	        console.log(chrome.runtime.lastError.message);
	        return;
	    } 
	});
} // end function save_to_storage(option_obj)


/* mergeObject(old_object, new_object) */
function mergeObject (o, ob) 
{
    for (var z in ob) 
	{ 
	  	if (ob.hasOwnProperty(z)) 
		{ 
			if (o[z] && typeof o[z] == 'object' && typeof ob[z] == 'object') 
				o[z] = mergeObject(o[z], ob[z]); 
			else 
				o[z] = ob[z]; 
		} 
	}	
    return o;
} // end function mergeObject (o, ob) 

// Is object empty?
function isEmpty(obj) { 
   for (var x in obj) { return false; }
   return true;
}


function show_profiles() {
	var profiles_div = document.getElementById("profiles_div");
	var string = "";
	string += "<form name='profiles_form'><table class='profiles'>";
	
	for (var i = 0; i < profiles.length; i++) // loop through commands
	{
		string += "<tr>";
		string += "<td><input type='checkbox' name='lock"+i+"' title='"+chrome.i18n.getMessage("profile_lock")+"'";
		if (profiles[i].lock == true) string += ' checked';
		string += "></td>";
		string += "<td><span class='profile_box' style='";
		if (profiles[i]['color']) string += "color: "+profiles[i]['color']+"; ";
		if (profiles[i]['background-color']) string += "background-color: "+profiles[i]['background-color']+"; ";
		if (profiles[i]['font-family']) string += "font-family: "+profiles[i]['font-family']+";";
		string+= "' id='profile_"+i+"'> Profile "+(i+1)+"</span></td>";
		string += "<td><span id='font_times_"+i+"'>";
		if (profiles[i]['font_times']) string+= profiles[i]['font_times']+"X";
		string += "</span></td>";
		string += "<td><button name='save_"+i+"' class='button' title='"+chrome.i18n.getMessage("profile_save")+"'>"+chrome.i18n.getMessage("profile_save_btn")+"</button></td>";
		string += "<td><button name='load_"+i+"' class='button' title='"+chrome.i18n.getMessage("profile_load")+"'>"+chrome.i18n.getMessage("profile_load_btn")+"</button></td>";
		string += "</tr>";		
	}
	
	string += "</table></form>";
	profiles_div.innerHTML = string;
}


function setup_forms()
{
	var all_forms = document.forms;
	for (var i = 0; i < all_forms.length; i++)
	{  
	    all_forms[i].onsubmit = function() { return false; };
	    
		for (var j = 0; j < all_forms[i].length; j++)
	    {
			if (all_forms[i].name == 'profiles_form') { // Version 1.3.7g
				var num = all_forms[i][j].name.replace(/\D/g,''); // Replace everything that is not a digit in the name
				var name = all_forms[i][j].name.replace(/[\d_]/g,''); // Replace everything that is a digit or underscore in the name
				//all_forms[i][j].object_ref = sra_custom_commands[num]; // Did not work! Created a copy of the object instead of a reference
				profiles[num].number = parseInt(num);
			}
			if (all_forms[i][j].type.match(/^(checkbox|submit|button)$/i))
			{		 
				all_forms[i][j].addEventListener('click', function() {formclick();}, false);
			}
		}
	}
}


function formclick()
{
	el = event.target; // Target element of click

	if (test_mode) console.log(el.name);
	if (el.name.match(/^add/i)) { add_custom_command(); return; }
	var num = parseInt(el.name.replace(/\D/g,'')); // Replace everything that is not a digit in the name
	var name = el.name.replace(/[\d_]/g,''); // Replace everything that is a digit or underscore in the name
	//sra.custom_commands[num][name] = el.value; // Old way using array position (which makes deleting difficult)
	//el.object_ref[name] = el.value; // New way which uses an object reference. Did not work because object_ref is a copy
	/*if (el.type.match(/^(checkbox)$/i) && !el.checked) { // Version 1.5.1 - If they unchecked a profile then set to default
		// This is not working! At least font-family is not being changed back
		// Get the FSC settings for this url and merge with default settings
		chrome.storage.local.get(uri, function(obj) {
				var reset_obj = { 
				"font_times": obj["font_times"] || 1,
				"color": obj["color"] || "reset", 
				"bgcolor": obj["background-color"] || "", 
				"font-family": obj["font-family"] || "Default Font"
			}
			send_to_content(reset_obj);
		});
	}*/
	for (var i = 0; i < profiles.length; i++) // loop through profiles
	{
		if (profiles[i].number == num)
		{
			if (el.type.match(/^(checkbox)$/i)) {
				profiles[i]["lock"] = el.checked; // Change profiles object
				
				// Make sure every other checkbox is unchecked
				var form_elements = el.form.elements;
				for (var f = 0; f < form_elements.length; f++) 
					if (form_elements[f].type.match(/^checkbox$/i) && form_elements[f] != el) {
						form_elements[f].checked = false;
						var el_num = parseInt([form_elements[f].name.replace(/\D/g,'')]); // Change profiles object by getting only number from el name
						profiles[el_num]["lock"] = false; 
					}	
				var profiles_obj = { "profiles" : profiles };
				if (test_mode) console.log("profiles object: "+JSON.stringify(profiles_obj));
				save_profiles(profiles_obj);
				// Trigger click event to load selected profile	
				if (!blacklisted()) // Version 1.5.1 - Function in popup.js
					if (el.checked) el.form["load_"+num].click();
			}
			else if (el.type.match(/^(button|submit)$/i)) {
				if (el.name.match(/^load/i)) {
					var load_obj = { 
						"font_times" : profiles[i]["font_times"], 
						"color" : profiles[i]["color"], 
						"bgcolor" : profiles[i]["background-color"], 
						"font-family" : profiles[i]["font-family"] 
					};
					if (test_mode) console.log(load_obj);
					send_to_content(load_obj);
					if (profiles[i]["color"]) // Version 1.5.1 - Was causing it to set to black if color == ""
						cp.setHex(profiles[i]["color"]); // Version 1.3.7b - Put the loaded profile in the popup form settings
					if (profiles[i]["background-color"]) // Version 1.5.1 - Was causing it to set to black if color == ""
						cpb.setHex(profiles[i]["background-color"]); // Version 1.3.7b
					//current_fontfamily = profiles[i]["font-family"]; // Version 1.3.7b // 1.3.7c - Removed
					var fontlist = document.getElementById("fontlist");
					for (var j = 0; j < fontlist.length; j++) { // Version 1.3.7i - I was using i here instead of j!!!
						if (fontlist[j].value == profiles[i]["font-family"]) // Version 1.3.7c - Changed from response to profiles[i]
							fontlist[j].selected = true;
					}
				}
				else if (el.name.match(/^save/i)) {
					chrome.storage.local.get(uri, function(obj)
					{
					 	if (typeof obj[uri] == "undefined") return; // key does not exist so return
					 	// or we could do
					 	if (obj.hasOwnProperty(uri) == false) return; // key does not exist so return
					 
					    if (test_mode) console.log(JSON.stringify(obj));
					    
					    //if (obj[uri].hasOwnProperty("font_times")) 
					    	profiles[num]["font_times"] = obj[uri]["font_times"] || 1;
					    //if (obj[uri].hasOwnProperty("color"))
					    	profiles[num]["color"] = obj[uri]["color"] || ""; // Version 1.5.1 - From "reset" to ""
					    //if (obj[uri].hasOwnProperty("background-color"))
					    	profiles[num]["background-color"] = obj[uri]["background-color"] || ""; // Version 1.5.1 - From "reset" to ""
					    //if (obj[uri].hasOwnProperty("font-family"))
					    	profiles[num]["font-family"] = obj[uri]["font-family"] || "Default Font"; 
					    	
						font_times = profiles[num]["font_times"] || 1;
						current_color = obj[uri]["color"];
						current_bgcolor = obj[uri]["background-color"];
						current_fontfamily = obj[uri]["font-family"];
						document.getElementById("font_times_"+num).innerHTML = font_times+"X";
						document.getElementById("profile_"+num).style.setProperty("color", current_color, "important");
						document.getElementById("profile_"+num).style.setProperty("background-color", current_bgcolor, "important");
						document.getElementById("profile_"+num).style.setProperty("font-family", current_fontfamily, "important");
						
						var profiles_obj = { "profiles" : profiles };
						if (test_mode) console.log("profiles object: "+JSON.stringify(profiles_obj));
						save_profiles(profiles_obj);
					    	 	   
					});		
				}
			}
		}
	}

}


function start_all() {
	// if we haven't got chrome.storage yet then call this function later
	if (!storage_ready)
	{
		setTimeout(function()
		{
			start_all();
		} , 200);
		return;
	}
	
	show_profiles();
	setup_forms();
}

load_profiles("profiles");  // put null to see all objects saved
window.onload = start_all;
