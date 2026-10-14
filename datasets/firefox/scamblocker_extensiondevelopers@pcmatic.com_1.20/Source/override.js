var s = document.createElement('script');
s.src = chrome.runtime.getURL('scam-block.js');
(document.head || document.documentElement).appendChild(s);

const scameblockerelement_whitelist = document.createElement("tag");
scameblockerelement_whitelist.setAttribute("id", "scamblocker-whitelist");
(document.head || document.documentElement).appendChild(scameblockerelement_whitelist)

const scameblockerelement_ismalicious = document.createElement("tag");
scameblockerelement_ismalicious.setAttribute("id", "scamblocker-ismalicious");
(document.head || document.documentElement).appendChild(scameblockerelement_ismalicious)


document.addEventListener("contentEvent",
	async function(event) {
	let brow = chrome.runtime ? chrome : browser;

	if (event.detail.type=='serviceworker') {
		
		const result = await brow.runtime.sendMessage(event.detail);

			for (const [key, value] of Object.entries(result)) {
				if(typeof value ==="object" ) {
					for (const [key2, value2] of Object.entries(value)) {
						scameblockerelement_ismalicious.setAttribute(key + '-' + key2, value2);
					}
				} else {
				scameblockerelement_ismalicious.setAttribute(key, value);
				}
			}
			scameblockerelement_ismalicious.dispatchEvent(new CustomEvent("scamblocker-ismalicious")); 


	 

	} else {
		// handle it here
		if (event.detail.callingFunc=='getStorage') {

			let stor = chrome.runtime ? chrome.storage : browser.storage;
			let data = await stor.local.get('whitelist');

			scameblockerelement_whitelist.setAttribute("whitelist", data.whitelist);
			scameblockerelement_whitelist.setAttribute("callingFunc", 'getStorage');
			scameblockerelement_whitelist.dispatchEvent(new CustomEvent("scamblocker-whitelist"));

			return true;
			
		}

	}

}, false);

