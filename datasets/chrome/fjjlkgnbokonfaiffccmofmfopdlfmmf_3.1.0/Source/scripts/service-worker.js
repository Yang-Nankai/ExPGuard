let state = {
  iF: null,
  iFURL: null,
  iFTime: null,
  urlExpire: 600
};

const isChrome = !!(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];

async function createOffscreenDocument() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['IFRAME_SCRIPTING'],
    justification: 'For extension functionality'
  });
}

async function getExistingRuleIds() {
	return new Promise((resolve, reject) => {
			chrome.declarativeNetRequest.getSessionRules((rules) => {
					if (chrome.runtime.lastError) {
						resolve([]);
					} else {
						const ruleIds = rules.map((rule) => rule.id);
						resolve(ruleIds);
					}
			});
	});
}

async function updateRules(blockURLs, iFHeaders) {
	const rules = [];
	blockURLs?.forEach((blockURL, index) => {
		const ruleId = index + 2; // Assign a unique ID for each rule
		rules.push({
				id: ruleId,
				priority: 1,
				action: {
						type: "block"
				},
				condition: {
						regexFilter: blockURL,
						resourceTypes: ['sub_frame', 'stylesheet', 'script', 'image', 'font', 'object', 'xmlhttprequest', 'ping', 'csp_report', 'media', 'websocket', 'other'],
						tabIds : [-1]
				}
		});
	});
	if(iFHeaders){
		rules.push({
			id: 1,
			priority: 1,
			action: {
				type: 'modifyHeaders',
				responseHeaders: [
					...(iFHeaders.del?.length ? iFHeaders.del.map(h => ({ header:h, operation:'remove' })) : []),
					...(iFHeaders.add?.length ? iFHeaders.add.map(h => ({ header:h.split(':')[0], value:h.split(':')[1], operation:'set' })) : []),
				]
			},
			condition: {
				resourceTypes: ['sub_frame'],
				tabIds : [-1]
			}
		});
	}

	const existingRuleIds = await getExistingRuleIds()
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: existingRuleIds ?? [],
    addRules: rules
  },
	() => {
			// if (chrome.runtime.lastError) {
			// 		console.error("Error updating rules:", chrome.runtime.lastError.message);
			// } else {
			// 		console.log(`Rule updated`);
			// }
	});
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const handleAsync = async () => {
    switch (request.type) {
      case "openHome":
        const results = await chrome.tabs.query({url: request.url + '*'});
        if (results.length === 0) {
          const tab = await chrome.tabs.create({url: request.url, active: true});
          return tab.id;
        } else {
          const tab = await chrome.tabs.update(results[0].id, {active: true});
          return tab.id;
        }
      case "canRun":
        return (typeof state.iFURL != 'undefined' && 
					sender.url.lastIndexOf(state.iFURL, 0) === 0) && 
					(!sender.hasOwnProperty('tab') || (sender.hasOwnProperty('tab') && sender.tab.id < 0));
      default:
        return undefined;
    }
  };

  handleAsync()
    .then(sendResponse)
    .catch(error => sendResponse({error: error.message}));
  return true;
});

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  const handleAsync = async () => {
    switch (request.type) {
			case "apiReq":
				const req = JSON.parse(request.data);
				let isJSON = false;
				if(req.header){
					Object.keys(req.header).map(key => {
						if(key.toLowerCase() == "content-type"){
							isJSON = req.header[key].includes("application/json")
						}
					})
				}
				return fetch(req.action, {
					method : req.method?.toLowerCase() ?? "get",
					headers : req.header,
					body : req.data ? (isJSON ? JSON.stringify(req.data) : req.data) : undefined
				}).then(resp => resp.text());

      case "open":
        state.urlExpire = request.urlExpire;
        state.iFURL = request.data;
				await updateRules(request.blockURLs, request.iFHeaders);	
        await createOffscreenDocument();
        return chrome.runtime.sendMessage({
          target: 'offscreen',
          type: 'if-open',
          data: request
        });

      case "remove":
        return chrome.runtime.sendMessage({
          target: 'offscreen',
          type: 'if-remove'
        });

      case "script":
        return chrome.runtime.sendMessage({
          target: 'offscreen',
          type: 'if-script',
          data: request
        });

      case "version":
        return chrome.runtime.getManifest().version;

      default:
        return undefined;
    }
  };

  handleAsync()
    .then(sendResponse)
    .catch(error => sendResponse({error: error.message}));
  return true;
});