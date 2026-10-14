

var pPort;
var fSendResponse;
var hostChecked = false;
var hostVers = null;

chrome.runtime.onMessageExternal.addListener(
        function (request, sender, sendResponse) {
            console.log("recv message from page");
            console.log(JSON.stringify(request));

            if (request["command"] === "disc") {
                disconnectHost();
                return false;
            }

            if (request["command"] === "checkExt") {
                sendResponse({"status": "ok", "vers":chrome.runtime.getManifest().version});
                return false;
            }
            
            if (request["command"] === "sendToLs") {
                sendHttpRequestToLS(request["arg"], sendResponse);
                return true;
            }
            
            if (request["command"] === "checkHost") {
                checkHost(sendResponse);
                return true;
            }

            if (pPort == null) {
                connectToHost();
            }
            
            fSendResponse = sendResponse;
            sendNativeMessage(request);
            return true;
        }
);

function checkHost(callback) {
        
    if (hostChecked || pPort != null) {
        hostChecked = true;
        console.log("checkHost good: port != null");
        callback({ "command":"checkHost", "status":"ok", "vers":hostVers});
    }
    
    chrome.runtime.sendNativeMessage('kz.akkamal.clientloader', { command: "getVersion" }, function (response) {
            try {
                if (response) {
                    console.log("Received " + JSON.stringify(response));
                    hostVers = response["vers"];
                    callback({"command":"checkHost", "status":"ok", "vers":response["vers"]});
                } else {
                    console.log("response == null:" + chrome.runtime.lastError.message);
                    callback({"command":"checkHost", "status":"fail"});
                }
            } catch (ex) {
                console.log("ERROR:" + ex);
                callback({"command":"checkHost", "status":"fail"});
            }
        }
    );
}


function connectToHost() {
    var hostName = "kz.akkamal.clientloader";
    console.log("Connecting to native messaging host: " + hostName)
    pPort = chrome.runtime.connectNative(hostName);
    pPort.onMessage.addListener(onNativeMessage);
    pPort.onDisconnect.addListener(onDisconnected);

    // initiate pinging
    ping();
}

function disconnectHost() {
    if (pPort != null) {
        pPort.disconnect();
        pPort = null;
        console.log("port disconnected");
    }
}

function ping() {
    if (pPort != null) {
        var comm = {
            command: "ping",
        };

        sendNativeMessage(comm);
        setTimeout(ping, 5000);
    }
}

function sendHttpRequestToLS(reqObj, callback) {
    console.log("sendHttpRequestToLs");
    var httpReq = new XMLHttpRequest();

	// send only to localhost
	var re = /http:\/\/(localhost|127\.0\.0\.1):1033\d\/.*/;
	if (!re.test(reqObj.url)) {
		console.log('Error: only localhost supported');
        callback({res: "error", errMess: 'Error: only localhost supported'});
		return
	}
	
	
    httpReq.open("POST", reqObj.url);
    httpReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    httpReq.onreadystatechange = function () {
        var DONE = 4;
        var OK = 200;
        if (httpReq.readyState === DONE) {
            if (httpReq.status === OK) {
                console.log(httpReq.responseText);
                callback({res: "success", obj: JSON.parse(httpReq.responseText)});
            } else {
                console.log('Error: ' + httpReq.status);
                callback({res: "error", errMess: 'Error: ' + httpReq.status});
            }
        }
    };

    httpReq.send(reqObj.data);
}

function sendNativeMessage(message) {
    pPort.postMessage(message);
    console.log("Sent message to host: " + JSON.stringify(message));
}

function onNativeMessage(message) {
    console.log("Received message from host: " + JSON.stringify(message));
    fSendResponse(message);
}


function onDisconnected() {
    
	
    console.log("Failed to connect: " + chrome.runtime.lastError.message);
    pPort = null;
	
	//sendMessageToPage({alert: "Failed to connect: " + chrome.runtime.lastError.message});
}




console.log("started");