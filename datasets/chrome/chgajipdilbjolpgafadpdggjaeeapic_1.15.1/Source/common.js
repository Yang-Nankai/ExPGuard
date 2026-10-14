var versionExpected = '1.2.0.1';
var timeout = "60000";

function createEvent(eventName, message){
	return new CustomEvent(eventName, message);
}

function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function generateGUID() {
	return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function sendEvent(name, message){
	event = new CustomEvent(name, { detail: message, bubbles: false,
	cancelable: false});
	document.dispatchEvent(event);
}

function createReturnMessage(response){
	message = {};

	if(response.error){
		console.log(response.error);
		message = {
			error : response.error
		};
	}
	else{
		message = response.result;
	}

	return message;
}
