window.addEventListener("message", function(event) {
	// We only accept messages from ourselves
	if (event.source != window) {
		return;
	}

	var sendResponse = function(response) {
		window.postMessage({type: 'onboard-extension-response', response: response}, '*');
	};

	if (event.data.type && event.data.type == 'onboard-extension-request') {
		if (event.data.request && event.data.request.ping) {
			console.log("Content script received ping");
			sendResponse({pong: true});
		} else if (event.data.request && event.data.request.otp && event.data.request.version) {
			console.log("Content script received request");
			event.data.request.host = window.location.origin;
			if (window.confirm('Grant permission for ' + window.location.origin + ' to install network credentials?')) {
				chrome.runtime.sendMessage(null, event.data.request, null, function(response) {
					console.log('Context script received response', response);
					sendResponse(response);
				});
			} else {
				sendResponse({error: true, code: 1, message: 'User denied installation permission.'});
			}
		} else {
			console.log("Content script received unknown message", event.data);
		}
	}
}, false);
