console.log("OTL alert attached");

const _alert = window.alert;

const ALERT_TEXT = {
	JAVA_ERR:`Java Setup - 1.8 or higher version`
};

window.alert = function(msg){
	
	//Ignore java related alerts
	
	if(msg.indexOf(ALERT_TEXT.JAVA_ERR) != -1) return true; 
	else _alert(msg);
};