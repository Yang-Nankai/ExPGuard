const BGUTILS = {

	getServiceName: function(url1) {
		
		var params, url = "";
		if(url1 != undefined && url1 != null && url1.length > 0) 
		{
			params = new URL(url1);
			if(params.origin && params.origin !== "null") url = params.origin;
		}
		
		var sn = SERVICENAME_UNKNOWN;
		if(url.indexOf(URL_SERVICE_ITR) != -1) sn = SERVICENAME_ITR;
		else if(url.indexOf(URL_SERVICE_GST) != -1) sn = SERVICENAME_GST;
		else if(url.indexOf(URL_SERVICE_MCA_V3_REQ) != -1) 
		{
			if(params.href.indexOf(URL_SERVICE_MCA) != -1) sn = SERVICENAME_MCA;
			else sn = SERVICENAME_MCA_V3;
		}
		else if(url.indexOf(URL_SERVICE_EPF) != -1) sn = SERVICENAME_EPF;
		else if(url.indexOf(URL_SERVICE_TDS) != -1) sn = SERVICENAME_TDS;
		else if(BGUTILS.isEProcure(url) == true) sn = SERVICENAME_CPPP;
		else if(url.indexOf(URL_SERVICE_DGFT) != -1) sn = SERVICENAME_DGFT;
		else if(url.indexOf(URL_SERVICE_ICEGATE) != -1) sn = SERVICENAME_ICEGATE;
		else if(url.indexOf(URL_SERVICE_ICEGATE_NEW) != -1) sn = SERVICENAME_ICEGATE_NEW;
		else if(BGUTILS.isMahaOnline(url) == true) sn = SERVICENAME_MAHAIT;
		else if(url.indexOf(URL_SERVICE_COO_DGFT) != -1) sn = SERVICENAME_COO_DGFT;
		else if(url.indexOf(URL_SERVICE_SHCIL_UAT) != -1 || url.indexOf(URL_SERVICE_SHCIL) != -1) sn = SERVICENAME_SHCIL;
		else if(url.indexOf(URL_SERVICE_IRCEP) != -1) sn = SERVICENAME_IRCEP;
		else if(url.indexOf(URL_SERVICE_IREPS) != -1) sn = SERVICENAME_IREPS;
		else if(url.indexOf(URL_SERVICE_WBHS) != -1) sn = SERVICENAME_WBHS;
		return sn;
	},

	isEProcure: function(portalurl) {
		
		var i, url = "";
		if(portalurl != undefined && portalurl != null && portalurl.length > 0) url = new URL(portalurl).origin.toLowerCase();
		
		if(url.indexOf("gov.in") != -1)
		{
			for(i=0; i<URL_SERVICE_CPPP_GOV.length; i++)
			{
				if(url.indexOf(URL_SERVICE_CPPP_GOV[i]) != -1) return true;
			}
		}
		else
		{
			for(i=0; i<URL_SERVICE_CPPP_OTHERS.length; i++)
			{
				if(url.indexOf(URL_SERVICE_CPPP_OTHERS[i]) != -1) return true;
			}
		}
		return false;
	},
	
	isEProcureOthers: function(portalurl) {
		
		var i, url = "";
		if(portalurl != undefined && portalurl != null && portalurl.length > 0) url = new URL(portalurl).origin.toLowerCase();
		
		for(i=0; i<URL_SERVICE_CPPP_OTHERS.length; i++)
		{
			if(url.indexOf(URL_SERVICE_CPPP_OTHERS[i]) != -1) return true;
		}
		return false;
	},
	
	isMahaOnline: function(portalurl) {
		
		var i, url = "";
		if(portalurl != undefined && portalurl != null && portalurl.length > 0) url = new URL(portalurl).origin.toLowerCase();
		
		for(i=0; i<URL_SERVICE_MAHAONLINE.length; i++)
		{
			if(url.indexOf(URL_SERVICE_MAHAONLINE[i]) != -1) return true;
		}
		return false;
	},

	getRequestPayload: function(details) {
		
		if(details!=null && details.requestBody!=null)
		{
			if(details.requestBody.raw!=null && details.requestBody.raw.length>0)
			{
				// JSON request payload
				try {
					var jsonPayload = decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes)));
					return JSON.parse(jsonPayload);
				} catch(e) {
					return null;
				}
			}
			else if(details.requestBody.formData != undefined)
			{
				// Form Data request payload
				return details.requestBody.formData;
			}
		}
		return null;
	},

	sendMessageToCS: function(tabId, type, service) {
		
		var msg = {};
		msg.type = type;
		msg.service = service;
		
		switch(type)
		{
			case G2C_MSG.ENROLL_SIGN_PROMPT:
			case G2C_MSG.FREEPLAN_SIGN_PROMPT:
			case G2C_MSG.SIGN_PROMPT:
			{
				msg.handle = arguments[3];
				msg.notifyId = arguments[4];
				msg.params = arguments[5];
				break;
			}
			case G2C_MSG.GET_SIGNER:
			{
				msg.service = arguments[2];
				msg.params = arguments[3];
				break;
			}
			case G2C_MSG.SIGNERINFO_PROMPT:
			{
				msg.result = arguments[3];
				msg.errorString = arguments[4];
				msg.pan = arguments[5];
				break;
			}
			case G2C_MSG.SIGNATURE_PROMPT:
			{
				msg.result = arguments[3];
				msg.errorString = arguments[4];
				msg.handle = arguments[5];
				msg.freePlan = arguments[6];
				msg.subscriptionUrl = arguments[7];
				msg.signerInfo = arguments[8];
				break;
			}
			case G2C_MSG.EPF_RELOAD_HOME:
			{
				msg.homeUrl = arguments[3];
				break;
			}
			
		}
		
		return chrome.tabs.sendMessage(tabId, msg);
	},

	camelize: function(str) {
		
	  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
		return index === 0 ? word.toLowerCase() : word.toUpperCase();
	  }).replace(/\s+/g, '');
	},

	setStorage: function(service, obj){
		
		return myPromise = new Promise(function(resolve, reject) {
			
			if(obj && Object.keys(obj).length === 0) {
				
				resolve({});
				return;
			}  
			
			chrome.storage.local.set(obj)
			.then(() => {
				
				var rv = {};
				for(var key in obj)
				{
					// Service name is removed and returned
					var newKey = BGUTILS.camelize(key.slice(service.length));
					rv[newKey] = obj[key];
				}
				resolve(rv);
			})
			.catch(e => {
				//TODO: Clear storage if exceeded more than 5MB and provide a retry option
				console.log("ERROR: Local storage exceeded the allowed limit");
				console.log(e);
				XSG2C.setInfo(service, undefined, undefined, "localStorageSetFailed", e.name+"|"+e.message);
				reject(e);
			});
		});
	},

	getStorage: function(service, keys){
		
		return myPromise = new Promise(function(resolve, reject) {
			
			chrome.storage.local.get(keys)
			.then((result) => {
				
				var rv = {};
				for(var key in result)
				{
					// Service name is removed and returned
					var newKey = BGUTILS.camelize(key.slice(service.length));
					rv[newKey] = result[key];
				}
				resolve(rv);
			})
			.catch(e => {
				console.log("ERROR: Unable to get data from the local store | ", service, keys);
				console.log(e);
				XSG2C.setInfo(service, undefined, undefined, "localStorageGetFailed", e.name+"|"+e.message);
				reject(e);
			});
		});
	},

	clearStorage: function(keys){
		
		return myPromise = new Promise(function(resolve, reject) {
			
			chrome.storage.local.remove(keys)
			.then(() => {
				resolve();
			})
			.catch(e => {
				console.log("ERROR: Unable to clear the local store | ", keys);
				console.log(e);
				reject(e);
			});
		});
	},
	
	attachCommonFiles: function(service, tabId){
		
		if(service == SERVICENAME_CPPP)
		{
			console.log("CPPP CSS attaching...");
			chrome.scripting.insertCSS({target : {tabId : tabId},files : [...COMMON_CSS, ...CPPP_CSS]})
			.then((rv) => console.log(rv, "CPPP CSS injected"))
			.catch(e => {console.log(e)});
			
			console.log("CPPP script attaching...");
			chrome.scripting.executeScript({target : {tabId : tabId}, files : [...COMMON_SCRIPTS, ...CPPP_SCRIPTS]})
			.then((rv) => console.log(rv, "CPPP script injected"))
			.catch(e => {console.log(e)});
		}
		else
		{
			console.log("Attaching common CSS...");
			chrome.scripting.insertCSS({target : {tabId : tabId},files : COMMON_CSS})
			.then((rv) => console.log(rv, "Common CSS injected"))
			.catch(e => {console.log(e)});
			
			console.log("Attaching common script...");
			chrome.scripting.executeScript({target : {tabId : tabId}, files : COMMON_SCRIPTS})
			.then((rv) => console.log(rv, "Common script injected"))
			.catch(e => {console.log(e)});
		}
	},
	
	frameService: function(service){
		
		if(service == SERVICENAME_MCA_V3) return SERVICENAME_MCA;
		else return service;
	},
	
	registerEMBContentScripts: function(url){
		
		var service;
		
		service = BGUTILS.getServiceName(url);
		
		chrome.scripting.getRegisteredContentScripts({ids: [service]})
		.then((rv) => {
			
			console.log(rv);
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:service, 
						matches:[url+"/*"], 
						world:"MAIN", 
						runAt:"document_start", 
						js :EMB_SCRIPTS,
						css:EMB_CSS,
					}
				])
				.then((rv) => console.log("EMB contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
	},
	
	registerMahaItContentScripts: function(){
		
		var url = [];
		for(var i=0; i<URL_SERVICE_MAHAONLINE.length; i++)
		{
			url.push("https://*."+URL_SERVICE_MAHAONLINE[i]+"/*");
		}
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_MAHAIT+"CS"]})
		.then((rv) => {
			
			console.log(rv);
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_MAHAIT+"CS", 
						matches:url, 
						world:"ISOLATED", 
						runAt:"document_start", 
						js :COMMON_SCRIPTS,
						css:COMMON_CSS,
					}
				])
				.then((rv) => console.log("MAHAIT contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_MAHAIT]})
		.then((rv) => {
			
			console.log(rv);
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_MAHAIT, 
						matches:url, 
						world:"MAIN", 
						runAt:"document_start", 
						js :MAHAIT_SCRIPTS,
						css:MAHAIT_CSS,
						allFrames:true
					}
				])
				.then((rv) => console.log("MAHAIT web page scripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
		
	},
	
	assignDownloadsApiEvent: function(){
		
		chrome.permissions.contains(
			{
				permissions: ['downloads'],
				origins: [URL_SERVICE_COO_DGFT+"/*"]
			}, 
			(granted) => 
			{
				if(granted && chrome.downloads.onDeterminingFilename.hasListeners() === false)
				{
					chrome.downloads.onDeterminingFilename.addListener(function(downloadItem){
									
						console.log(downloadItem);
						if(downloadItem.url.indexOf(URL_SERVICE_COO_DGFT) !== -1 && downloadItem.mime === "application/x-java-jnlp-file" && downloadItem.filename.indexOf(".jnlp") !== -1)
						{
							chrome.downloads.cancel(downloadItem.id, function(params){
								console.log("Download canceled : ", downloadItem.filename, params);
								
								if(TAB_ID)
								{
									BGUTILS.sendMessageToCS(TAB_ID, G2C_MSG.GET_SIGNER, SERVICENAME_COO_DGFT, downloadItem.finalUrl)
									.then(() => {
										
									})
									.catch(e => {console.log(e);});
								}
								else
								{
									console.log("TabId not found");
									XSG2C.setInfo(SERVICENAME_COO_DGFT, undefined, undefined, SET_INFO.FACILITY_UNSUPPORTED, "tabIdNotFound");
								}
							}); 
						}
						return true;
					});
				}
			}
		);
	},
	
	registerSHCILContentScripts: function(){
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_SHCIL+"CS"]})
		.then((rv) => {
			
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_SHCIL+"CS", 
						matches:[URL_SERVICE_SHCIL_UAT+"/*", URL_SERVICE_SHCIL+"/*"], 
						world:"ISOLATED", 
						runAt:"document_start", 
						js :COMMON_SCRIPTS,
						css:COMMON_CSS,
					}
				])
				.then((rv) => console.log(SERVICENAME_SHCIL+"contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_SHCIL]})
		.then((rv) => {
			
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_SHCIL, 
						matches:[URL_SERVICE_SHCIL_UAT+"/*", URL_SERVICE_SHCIL+"/*"], 
						world:"MAIN", 
						runAt:"document_start", 
						js :SHCIL_SCRIPTS,
						css:SHCIL_CSS,
					}
				])
				.then((rv) => console.log(SERVICENAME_SHCIL+"contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
	},
	
	registerTDSContentScripts: function(){
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_TDS]})
		.then((rv) => {
			
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_TDS, 
						matches:[URL_SERVICE_TDS+"/*"], 
						world:"MAIN", 
						runAt:"document_start", 
						js :["/contentscript/wss.js", "/common/webpage/defines.js", "/common/webpage/XSCUTILS.js", "/contentscript/webpage/CSUTILS.js", "/contentscript/webpage/xsg2cpopup.js", "/contentscript/xshandle.js"],
						css:["/contentscript/webpage/xsg2cpopup.css"],
					}
				])
				.then((rv) => console.log(SERVICENAME_TDS+"contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
	},
	
	registerOldIcegateContentScripts: function(){
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_ICEGATE+"1"]})
		.then((rv) => {
			
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_ICEGATE+"1", 
						matches:["https://"+URL_SERVICE_ICEGATE+"/*"], 
						world:"MAIN", 
						runAt:"document_end", 
						js :["/common/defines.js", "/common/XSCUTILS.js", "/contentscript/CSUTILS.js", "/contentscript/xsg2cpopup.js", "/contentscript/xshandle.js", "/contentscript/cmpdf.js", "/contentscript/icegate.js"],
						css:["/contentscript/xsg2cpopup.css"],
					}
				])
				.then((rv) => console.log(SERVICENAME_ICEGATE+"1"+"contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_ICEGATE+"2"]})
		.then((rv) => {
			
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_ICEGATE+"2", 
						matches:["https://"+URL_SERVICE_ICEGATE+"/*"], 
						world:"MAIN", 
						runAt:"document_start", 
						js :["/contentscript/otlalert.js"],
					}
				])
				.then((rv) => console.log(SERVICENAME_ICEGATE+"2"+"contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
	},
	
	registerNewIcegateContentScripts: function(){
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_ICEGATE_NEW+"1"]})
		.then((rv) => {
			
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_ICEGATE_NEW+"1", 
						matches:[URL_SERVICE_ICEGATE_NEW+"/*"], 
						world:"MAIN", 
						runAt:"document_start", 
						js :["/common/webpage/defines.js", "/common/webpage/XSCUTILS.js", "/contentscript/webpage/CSUTILS.js", "/contentscript/webpage/xsg2cpopup.js", "/contentscript/xshandle.js", "/contentscript/edi.js", "/contentscript/icegatelistener.js"],
						css:["/contentscript/webpage/xsg2cpopup.css"],
					}
				])
				.then((rv) => console.log(SERVICENAME_ICEGATE_NEW+"1"+"contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_ICEGATE_NEW+"2"]})
		.then((rv) => {
			
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_ICEGATE_NEW+"2", 
						matches:["https://icegate-ui-prod.apps.prod.icegate.gov.in/*"], 
						world:"MAIN", 
						runAt:"document_start", 
						js :["/contentscript/xhr.js"],
						allFrames:true
					}
				])
				.then((rv) => console.log(SERVICENAME_ICEGATE_NEW+"2"+"contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
	},
	
	registerIrcepContentScripts: function(){
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_IRCEP]})
		.then((rv) => {
			
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_IRCEP, 
						matches:["https://"+URL_SERVICE_IRCEP+"/*", "https://www."+URL_SERVICE_IRCEP+"/*", "https://"+URL_SERVICE_IREPS+"/*", "https://www."+URL_SERVICE_IREPS+"/*"], 
						world:"MAIN", 
						runAt:"document_start", 
						js :["/contentscript/wss.js", "/common/webpage/defines.js", "/common/webpage/XSCUTILS.js", "/contentscript/webpage/CSUTILS.js", "/contentscript/webpage/xsg2cpopup.js", "/contentscript/xshandle.js", "/contentscript/xsjos.js", "/contentscript/cmpdfv3.js"],
						css:["/contentscript/webpage/xsg2cpopup.css"],
					}
				])
				.then((rv) => console.log(SERVICENAME_IRCEP+" and "+SERVICENAME_IREPS+" contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
	},
	
	registerWbhsContentScripts: function(){
		
		chrome.scripting.getRegisteredContentScripts({ids: [SERVICENAME_WBHS]})
		.then((rv) => {
			
			if(rv != undefined && rv.length == 0)
			{
				chrome.scripting.registerContentScripts(
				[
					{
						id:SERVICENAME_WBHS, 
						matches:["https://"+URL_SERVICE_WBHS+"/*", "https://www."+URL_SERVICE_WBHS+"/*"], 
						world:"MAIN", 
						runAt:"document_start", 
						js :["/contentscript/wbhs.js", "/common/webpage/defines.js", "/background/bgdefines.js", "/common/webpage/XSCUTILS.js", "/contentscript/webpage/CSUTILS.js", "/contentscript/webpage/xsg2cpopup.js", "/contentscript/xshandle.js", "/contentscript/cmpdfv3.js", "/background/xorkeesign.js", "/common/B64.js"],
						css:["/contentscript/webpage/xsg2cpopup.css"],
					}
				])
				.then((rv) => console.log(SERVICENAME_WBHS+" contentScripts registered"))
				.catch(e => {console.log(e)});
			}
		})
		.catch(e => {console.log(e)});
	},
	
};