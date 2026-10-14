/*
* To override the existing function available in the EPF portal in deployJava.js
* where the "runApplet" function contains many validations pertaining to browser version, etc
* This will now just create the applet tag ignoring all other validations
* so that the deployed MutationObservers from the extension can intercept and take over.
*/

console.log("OTL EPF Applet function override");
try {
	deployJava.runApplet = function(attributes, parameters, minimumVersion) {
		console.log("Override called for runApplet");
		this.writeAppletTag(attributes, parameters);
		return true;
	};
} catch(e) {}

try {
	navigator.javaEnabled = function() {
		console.log("OTL Java Enabled");
		return true;
	};
} catch(e) {
	console.log("Navigator Java Override Failed");
	console.log(e);
}