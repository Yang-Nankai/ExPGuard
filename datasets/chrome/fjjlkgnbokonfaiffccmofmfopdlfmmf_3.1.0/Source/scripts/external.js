chrome.runtime.sendMessage({type:'canRun'},
	function(canRun){
		let lastEventId;
		let pageScriptLoaded;
		if(canRun === true){
			// Load the page script
			const script = document.createElement('script');
			script.src = chrome.runtime.getURL('scripts/page-script.js');
			(document.head || document.documentElement).appendChild(script);
			script.onload = function() {
					pageScriptLoaded = true;
					script.remove();
			};

			// Listen for results from the page context
			document.addEventListener('etResultDoneEvent', function(e){
					window.parent.postMessage({
							eventId: lastEventId, 
							data: e.detail
					}, "*");
			}, false);    

			// Listen for messages from iframe parent
			window.addEventListener("message", async function(e){
					if(e.data && e.data.hasOwnProperty('data') && e.data.hasOwnProperty('eventId')){
							lastEventId = e.data.eventId;
							// Dispatch to page context
							try {
								await new Promise((resolve, reject) => {
									const timeout = 60000; // Timeout after 5 seconds
									const start = Date.now();
										const checkCondition = () => {
											if (pageScriptLoaded) {
												resolve();
											} else if (Date.now() - start > timeout) {
													reject(new Error("Request timeout, please try again"));
											} else {
													setTimeout(checkCondition, 100);
											}
										};
									checkCondition();
								});
								document.dispatchEvent(new CustomEvent('executeScript', {
										detail: {
												code: e.data.data,
												eventId: e.data.eventId
										}
								}));
							} catch (error) {
								document.dispatchEvent(new CustomEvent('etResultDoneEvent', {
									detail: { error: error.message }
								}));
							}
					}
			}, false);
		}
	}
);