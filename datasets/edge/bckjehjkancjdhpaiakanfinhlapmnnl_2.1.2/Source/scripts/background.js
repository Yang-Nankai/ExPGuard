(function(){
	function interceptRequest(request) {
		// Skip checking chrome-extension and chrome:// URLs
		if (request.url && (request.url.startsWith('chrome-extension://') || request.url.startsWith('chrome://'))) {
			return {cancel: false};
		}

		if (request.type == "main_frame" || request.type ==  "sub_frame") {
			var result = sbxAPI.checkUrl(request.url);
			if (result.verdict == "allow") {
				return {cancel: false};
			}
			else {

				sbxSettings(function(){
					if (sbxSettings("notifyOnBlock")) {
						var d = new Date();
						var noteId = result.url + d.getFullYear() + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + parseInt(d.getSeconds() / 2, 10);
						chrome.notifications.create(noteId, {
							type: "list",
							title: chrome.i18n.getMessage("Page_Block"),
							message: chrome.i18n.getMessage("Page_Block_description"),
							iconUrl: "images/alert.png",
							items: [
								{title: chrome.i18n.getMessage("Domain") + ": ", message: result.domain},
								{title: chrome.i18n.getMessage("URL") + ": ", message: result.url},
								{title: chrome.i18n.getMessage("Result") + ": ", message: result.verdict},
								{title: chrome.i18n.getMessage("Rule") + ": ", message: result.rule},
								{title: chrome.i18n.getMessage("Category") + ": ", message: result.category}]
						}, function (notificationId) {

						});
					}
				});

				if (request.type == "main_frame") {
					chrome.tabs.update(request.tabId, {
						url: chrome.extension.getURL('blocked.html#'+sbx.param(result))
					}, function(){
					});
				}

				return {cancel: true};
			}
		}  
	}
	
	chrome.webRequest.onBeforeRequest.addListener(interceptRequest, {urls: ["http://*/*","https://*/*"]}, ["blocking"]);   
})();