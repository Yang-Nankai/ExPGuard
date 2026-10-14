console.log("xorkeesign India G2C common script attached");

const CSUTILS = {
	
	_otlSendRequest: function(method, contentType, url, request, respType, cb) {
		
		var http = new XMLHttpRequest();
		http.open(method, url, true);
		if(method.toLowerCase() == "post") http.setRequestHeader("Content-Type", contentType);
		
		if(respType != undefined )http.responseType = respType;
		
		http.onload = function() {
			cb(http.status, http.response);
		};
		http.onerror = function() {
			console.log("ERROR: Connection Error | "+url);
			cb(0);
		};
		http.ontimeout = function() {
			console.log("ERROR: Connection Timed-out | "+url);
			cb(-1);
		};
		http.onabort = function() {
			console.log("ERROR: Connection Aborted | "+url);
			cb(-2);
		};
		try {
			
			http.send(request);
		} catch(e) {
			console.log("Error sending request");
			console.log(e);
			cb(-3);
		}
	},
	
	_otlSendRequest1: function(method, url, request, cb){
		
		var http = new XMLHttpRequest();
		http.open(method, url, true);
		if(method.toLowerCase() == "post")
		{
			//http.setRequestHeader("Content-Type", "application/json");
			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		http.onload = function() {
			cb(http.status, http.response);
		};
		http.onerror = function() {
			console.log("ERROR: Connection Error | "+url);
			cb(0);
		};
		http.ontimeout = function() {
			console.log("ERROR: Connection Timed-out | "+url);
			cb(-1);
		};
		http.onabort = function() {
			console.log("ERROR: Connection Aborted | "+url);
			cb(-2);
		};
		http.send(request);
	},
	
	sendRequest: function(method, url, payload, requestHeaders, responseType, cb) {
		
		var http = new XMLHttpRequest();
		http.open(method, url, true);
	
		if(requestHeaders) 
		{
			if(requestHeaders) 
			{
				for(var key in requestHeaders)
				{
					http.setRequestHeader(key, requestHeaders[key]);
				}
			}
		}
		
		if(responseType) http.responseType = responseType;
		
		http.onload = function() {
			cb(http.status, http.response);
		};
		http.onerror = function() {
			console.log("ERROR: Connection Error | "+url);
			cb(0);
		};
		http.ontimeout = function() {
			console.log("ERROR: Connection Timed-out | "+url);
			cb(-1);
		};
		http.onabort = function() {
			console.log("ERROR: Connection Aborted | "+url);
			cb(-2);
		};
		try {
			
			http.send(payload);
		} catch(e) {
			console.log("Error sending request");
			console.log(e);
			cb(-3);
		}
	},

	frameResponse: function(type) {
		
		var msg = {};
		msg.type = type;
		switch(type)
		{
			case G2C_MSG.GET_SIGNER:
			{
				msg.signerInfo = arguments[1];
				msg.signatories = arguments[2];
				msg.nonce = arguments[3];
				msg.sessionId = arguments[4];
				msg.homeUrl = arguments[5];
				break;
			}
			case G2C_MSG.ERROR_PROMPT:
			{
				msg.retry = arguments[1];
				msg.freePlan = arguments[2];
				msg.applyUnits = arguments[3];
				msg.handle = arguments[4];
				msg.selectedHandle = arguments[5];
				break;
			}
			case G2C_MSG.ERROR_STD:
			{
				msg.service = arguments[1];
				msg.result = -1;
				msg.errorString = ERROR_STD;
				break;
			}
		}
		console.log(msg);
		return msg;
	},

	promptListener: function(request, cb) {
		
		var headertext = "", signer = [], headertext1 = "", hideOtherOption;
		
		if(request == undefined)
		{
			// Unable to connect the extension
			request = {};
			request.result = -1;
			request.errorString = ERROR_STD;
		}
		console.log(request);
		switch(request.type)
		{
			case G2C_MSG.ENROLL_SIGN_PROMPT:
			{
				xsg2cpopup.showEnrollNotification(request.service, request.handle, request.notifyId, request.params);
				cb();
				break;
			}
			case G2C_MSG.SIGN_PROMPT:
			{
				xsg2cpopup.showNotification(request.handle, request.notifyId);
				cb();
				break;
			}
			case G2C_MSG.FREEPLAN_SIGN_PROMPT:
			{
				xsg2cpopup.showSubscribeNotification(request.handle, request.notifyId);
				cb();
				break;
			}
			case G2C_MSG.HIDE_PROMPT:
			{
				xsg2cpopup.hideNotification();
				cb();
				break;
			}
			default:
			{
				if(request.result != 0)
				{
					/*
					* Except for user not registered in xorkee error all other errors
					* resulting from the "extensionSignerInfo" request will be ignored.
					* These ignored errors will be later captured and displayed
					* upon sending the "extensionGetSignature" request.
					* This behavior is different for ITR portal alone and is handled below.
					*/
					if(request.result == XS_ERRCODE.NON_XORKEE)
					{
						if(request.service === SERVICENAME_COO_DGFT)
						{
							xsg2cpopup.xorkeeRegisteration(`The DSC of the authorized signatory carrying the IEC ${atob(request.iecCode)} must be registered in xorkee.`, function(retry){
							
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, retry));
							});
						}
						else
						{
							//inform the user to get a xorkee handle and then retry
							xsg2cpopup.xorkeeRegisterDSCSign(request.signatoryName, request.pan, request.effectiveTill, function(retry){
								
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, retry));
							});
						}
					}
					else if(request.result == XS_ERRCODE.CERT_EXPIRED)
					{
						/*
						* The certificate expired error alone needs a special treatment
						* as the ITR error display dialog cannot render LINKS.
						* Here we first display the error from xorkeesign as such and
						* send a minimally framed message without LINKS or HTML markup
						* to be displayed in the ITR error dialog.
						*/
						xsg2cpopup.showError(request.errorString, function() {
							cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false));
						});
					}
					else if(request.result == XS_ERRCODE.NON_XORKEE_HANDLE) 
					{
						xsg2cpopup.xorkeeRegisterDSCReg(request.nameAsPerCeritificate, request.handle, function(retry){
							
							cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, retry));
						});
					}
					else if(request.result == XS_ERRCODE.XORKEE_NOT_REACHABLE) 
					{
						xsg2cpopup.retrySignature(request.service, request.handle, function(retry){
							
							cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, retry, request.freePlan));
						});
					}
					else if(request.result == XS_ERRCODE.TRIAL_EXPIRED) 
					{
						xsg2cpopup._trialSubscriptionExpired(request.service, request.url, request.handle, function(freePlan, closeBtn){
							
							if(closeBtn == true) 
							{
								// xorkeesign logger
								var extmsg = {};
								extmsg.type = G2C_MSG.SET_INFO;
								extmsg.handle = request.handle;
								extmsg.action = "freePlanNotOpted";
								
								try
								{
									if(request.extensionId != undefined) 
									{
										chrome.runtime.sendMessage(request.extensionId, extmsg, function(){console.log("FreePlan prompt closed");});
									}
									else 
									{
										chrome.runtime.sendMessage(extmsg, function(){console.log("FreePlan prompt closed");});
									}
								} 
								catch(e) {console.log(e)};
								
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false, false));
							}
							else if(freePlan == true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true, true));
							else if(freePlan == false) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false, false)); // Subscribe
						});
					}
					else if(request.result == XS_ERRCODE.LIVE_EXPIRED) 
					{
						xsg2cpopup.renewSubscription(request.service, request.url, request.handle, function(renew) {
							
							if(renew == true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false, false));
							else cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false, false, "renewalCanceled"));
						});
					}
					else if(request.result == XS_ERRCODE.SSL_PINNING || request.result == XS_ERRCODE.PAYLOAD_SIGNING)
					{
						xsg2cpopup.dataTampered(function() {
							cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false, false));
						});
					}
					else if(request.result == XS_ERRCODE.UNITS_AVAILABLE) 
					{
						if(XSCUTILS.isFreeService(request.service) == true)
						{
							xsg2cpopup.trialSubscriptionExpired(request, function(applyUnits, freePlan, closeBtn){
								
								if(applyUnits == true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true, false, true));
								else if(freePlan == true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true, true, false)); 
								else if(closeBtn == true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false, false));
							});
						}
						else
						{
							xsg2cpopup.applySubscription(request.service, request.handle, request.isEnrolled, request.subscription, function(applyUnits) {
								
								if(applyUnits == true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true, false, true));
								else if(applyUnits == false) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false, false, false)); 
							});
						}
					}	
					else if(request.result == XS_ERRCODE.UNITS_UNAVAILABLE) 
					{
						if(XSCUTILS.isFreeService(request.service) == true)
						{
							xsg2cpopup.trialSubscriptionExpired(request, function(subscribe, freePlan, closeBtn){
								
								if(freePlan == true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true, true, false)); 
								else cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false, false));
							});
						}
						else
						{
							hideOtherOption = false;
							
							// This flag is sent to hide the information to sign without xorkeesign subcription
							if(window && window.location && window.location.href.indexOf("scmexcise") !== -1) hideOtherOption = true;
							
							xsg2cpopup.subscriptionRequired(request.service, request.handle, request.isEnrolled, request.subscription, function() {
								
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false, false));
							}, hideOtherOption);
						}
					}
					else if(request.result == XS_ERRCODE.ENC_DSC_NOT_IN_TOKEN || request.result == XS_ERRCODE.ENC_DSC_NOT_IN_PC)
					{
						xsg2cpopup.retryDecryption(request, function(action){
							
							if(action == true)
							{
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true));
							}
							else
							{
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false));
							}
						});
					}
					else if(request.result == XS_ERRCODE.INVALID_CONTEXT)
					{
						cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true));
					}
					else if(request.result == G2C_ERR.NO_USER_IDENTIFIER[0])
					{
						if(XSCUTILS.getComponentName(request.service) == COMPONENT.EMB)
						{
							xsg2cpopup.getHandlePopup("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to identify your DSC", "DSC will not be listed. You will not be able to sign.", function(flag, handle){
								
								if(flag == true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true, undefined, undefined, handle));
								else cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false));
							});
						}
						else
						{
							xsg2cpopup.getHandlePopup("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled", function(flag, handle){
								
								if(flag == true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true, undefined, undefined, handle));
								else cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false));
							});
						}
					}
					else if(request.result == G2C_ERR.MULTIPLE_HANDLES[0])
					{
						xsg2cpopup.listHandles(request.service, `Choose a handle`, `The following handles are available for the signer with PAN <b>${request.pan}</b>. Choose a handle and click <i>'Continue'</i> to sign in this portal.`, request.otherHandles, function(index){
					
							if(index !== undefined) 
							{
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true, undefined, undefined, undefined, request.otherHandles[index]));
							}
							// else prompt is closed 
						});
						break;
					}
					else if(request.result == XS_ERRCODE.MULTIPLE_HANDLE)
					{
						orgName = undefined;
						
						if(request.handles)
						{
							request.handles.forEach(function(signerInfo){
								 
								if(signerInfo.info && signerInfo.info.orgName) orgName = signerInfo.info.orgName;
							});
						}
						
						headertext = "Choose a DSC";
						
						headertext1 = `The DSC of the authorized signatories for `
						
						if(orgName) headertext1 += `<br><b>${orgName}</b> (IEC ${atob(request.iecCode)}) is listed below`;
						else headertext1 += `the IEC ${atob(request.iecCode)} is listed below`;
						
						xsg2cpopup.listAllSigners(request.service, headertext, headertext1, request.handles, function(index){
							
							if(index === -1)
							{
								xsg2cpopup.xorkeeRegisteration(`You should register the DSC in xorkee. The DSC should carry the IEC ${atob(request.iecCode)}`, function(retry){
							
									cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, retry));
								});
							}
							else if(index !== undefined)
							{
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, true, undefined, undefined, request.handles[index].handle));
							}
						});
					}
					else
					{
						/*
							Signature notification prompt is closed here.
						*/
						
						//for portals other than ITR display the error directly
						xsg2cpopup.showError(request.errorString, function() {
							cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false));
						});
						
						/*
						if(request.service == SERVICENAME_ITR)
						{
							//other errors pertaining to ITR doesn't need a separate popup
							//and is displayed in portal's own space
							
							xsg2cpopup.removePopup();
							cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false));
						}
						else
						{
							//for portals other than ITR display the error directly
							xsg2cpopup.showError(request.errorString, function() {
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false));
							});
						}*/
					}
				}
				else 
				{
					// xorkee notification prompt will be closed here
			
					/*
						For IRT - > In xorkee registration prompt, after retrying the signer Info info API. "Checking the registration status in xorkee ..." loader will be displayed. After successfull registration loader has been removed.
					*/
					
					if(request.signerIdentify === false && request.service === SERVICENAME_COO_DGFT && request.response === "extensionGetSignerInfo")
					{
						if(request.info && request.info.orgName) orgName = request.info.orgName;
						
						headertext = "Confirm DSC";
						
						headertext1 = `The DSC of the authorized signatory for `
						
						if(orgName) headertext1 += `<br><b>${orgName}</b> (IEC ${atob(request.iecCode)}) is listed below`;
						else headertext1 += `the IEC ${atob(request.iecCode)} is listed below`;
						
						xsg2cpopup.showSigner(request.service, request, headertext, headertext1, function(action){
							
							if(action === -1)
							{
								xsg2cpopup.xorkeeRegisteration(`You should register the DSC in xorkee. The DSC should carry the IEC ${atob(request.iecCode)}`, function(retry){
							
									if(retry === true) cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, retry));
								});
							}
							else if(action === true)
							{	
								cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false));
							}
						});
					}
					else
					{
					
						if(request.removePrompt != false) xsg2cpopup.removePopup();
						
						cb(CSUTILS.frameResponse(G2C_MSG.ERROR_PROMPT, false));
					}
				}
				break;
			}
		}
	},
	
	extGetMessage: function(){
		
		if(window.sessionStorage.getItem("g2cMsgDisplayed") != "true")
		{
			var msg = {}, msgInterval;
			msg.type = G2C_MSG.GET_MESSAGE;
			
			chrome.runtime.sendMessage(
				msg,
				function(payload){	
					
					if(payload == undefined) 
					{
						console.log("Unable to get xorkeesign message");
						return;
					}
					
					msgInterval = setInterval(function(){
						
						if(document.body)
						{
							window.sessionStorage.setItem("g2cMsgDisplayed", "true");
							if(xsg2cpopup != undefined)
							{
								clearInterval(msgInterval);
								xsg2cpopup.showXsMsg(payload.service, payload.message);
							}
						}
					}, 100);
				}
			);
		}
	},
	
	objectGetParams: function(elem)
	{
		var obj = {}, name, i, paramElemArr, value;
		paramElemArr = elem.getElementsByTagName('param');
		for(i = 0 ; i < paramElemArr.length; i++)
		{
			name = paramElemArr[i].getAttribute('name');
			value = paramElemArr[i].getAttribute('value');
			if(obj.hasOwnProperty(name) && obj[name] != value)
			{
				// Multiple params. params are stored in array
				if(typeof obj[name] == "string")
				{
					obj[name] = [obj[name]];
				}
				obj[name].push(value);
			}
			else obj[name] = value;
		}
		return obj;
	},
	
	replaceObjectContainer: function(applet)
	{
		var con = document.createElement("div");
		con.style.width = applet.getAttribute('width');
		con.style.height = applet.getAttribute('height')
		con.style.overflow = "auto";
		applet.parentElement.insertBefore(con, applet);
		applet.parentElement.removeChild(applet);
		return con;
	},
	
	getPromptParams: function(promptParams, userAction){
		
		promptParams.applyUnits = (promptParams.applyUnits == true)?true:userAction.applyUnits;
		promptParams.freePlan = (promptParams.freePlan == true)?true:userAction.freePlan;
		promptParams.handle = (promptParams.handle !== undefined)?promptParams.handle:userAction.handle;
		
		return promptParams;
	},
	
	setInfo: function(extensionId, action, message, handle){
		
		// xorkeesign logger
		var extmsg = {};
		extmsg.type = G2C_MSG.SET_INFO;
		extmsg.handle = handle;
		extmsg.action = action;
		extmsg.message = message;
		
		try
		{
			if(extensionId != undefined) 
			{
				chrome.runtime.sendMessage(extensionId, extmsg, function(){console.log("XS setinfo");});
			}
			else 
			{
				chrome.runtime.sendMessage(extmsg, function(){console.log("XS setinfo");});
			}
		} 
		catch(e) {console.log(e)};
	},
	
	openTab: function(extensionId, url){
		
		var extmsg = {};
		extmsg.type = G2C_MSG.TABS;
		extmsg.url = url;
		
		try
		{
			if(extensionId != undefined) 
			{
				chrome.runtime.sendMessage(extensionId, extmsg, function(){console.log("TABS message sent");});
			}
			else 
			{
				chrome.runtime.sendMessage(extmsg, function(){console.log("TABS message sent");});
			}
		} 
		catch(e) {console.log(e)};
	},

	getSignerInfo: (service, promptParams) => {
		
		return new Promise((resolve, reject) => {
			
			var msg = {};
			msg.otltype = G2C_MSG.GET_SIGNER;
			msg.params = promptParams;
			
			chrome.runtime.sendMessage(
				EXTENSION_ID,
				msg,
				function(payload) {
					
					//console.log(resp);
					if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, service);
					
					CSUTILS.promptListener(payload, function(userAction) {
				
						if(userAction.retry == true)
						{
							/*
								Retry scenarios
								---------------
								
								1. xorkee registration
							*/
							resolve(CSUTILS.getSignerInfo(service, promptParams));
						}
						else
						{
							if(payload.result == 0)
							{
								resolve(payload);
							}
							else reject();
						}
					});
				}
			);
		});
	},
	
	getSignature: (service, promptParams, xsSignerInfo, tbs, sigType, saveHandle) => {
		
		return new Promise((resolve, reject) => {
		
			var msg;
				
			msg = {};
			msg.otltype = G2C_MSG.GET_SIGNATURE;
			// msg.xsSignerInfo = {handle:xsSignerInfo.handle, isEnrolled: xsSignerInfo.isEnrolled};
			msg.xsSignerInfo = xsSignerInfo;
			msg.tbs = tbs;	
			msg.sigType = sigType;
			
			msg.params = promptParams;
			msg.params.host = window.location.host;
			msg.params.url = window.location.href;
			
			chrome.runtime.sendMessage(
				EXTENSION_ID,
				msg,
				function(resp) {
						
					if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, service);
					
					CSUTILS.promptListener(resp, function(userAction) {
				
						if(userAction.retry == true)
						{
							/*
								Retry scenarios
								---------------
								
								1. xorkee registration
								2. User not reachable(Signature request and applyUnits request)
								
							*/
							
							promptParams = CSUTILS.getPromptParams(promptParams, userAction);
							resolve(CSUTILS.getSignature(service, promptParams, xsSignerInfo, tbs, sigType, saveHandle));
						}
						else
						{
							if(resp.result == 0) 
							{
								if(saveHandle) xsg2cStoreHandle(xsSignerInfo.handle);
								resolve(resp);
							}
							else reject(resp);
						}
					});
				}
			);
		
		});
		
	},
	
	getEncPublicKey: (service, promptParams, xsSignerInfo, txt1, txt2, reload) => {
		
		return new Promise((resolve, reject) => {
			
			var msg = {};
			msg.otltype = G2C_MSG.GET_ENC_DSC;
			msg.xsSignerInfo = xsSignerInfo;
			msg.reload = reload;
			msg.params = promptParams;
			msg.params.registerEnc = true;
			msg.params.host = window.location.host;
			msg.params.url = window.location.href;
			
			chrome.runtime.sendMessage(
				EXTENSION_ID,
				msg,
				function(payload) {
					
					//console.log(resp);
					if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, service);
					
					CSUTILS.promptListener(payload, function(userAction) {
				
						if(userAction.retry == true)
						{
							/*
								Retry scenarios
								---------------
								
								1. xorkee registration
							*/
							resolve(CSUTILS.getEncPublicKey(service, promptParams, xsSignerInfo, txt1, txt2, reload));
						}
						else
						{
							if(payload.result == 0)
							{
								xsg2cpopup.listCertificates(service, txt1, txt2, payload.DSC)
								.then(([reload, index]) => {
									
									if(reload) {
										return resolve(CSUTILS.getEncPublicKey(service, promptParams, xsSignerInfo, txt1, txt2, true));
									}
									else {
									
										if(index === undefined) {
											return reject();
										}
										
										xsSignerInfo.result = 0;
										xsSignerInfo.info = payload.DSC[index].info;
										
										resolve(xsSignerInfo);
									}
									
								}).catch((e) => {
									console.log(e);
									reject();
								});
							}
							else reject();
						}
					});
				}
			);
		});
	},
	
	getCertInfo: (service, xsSignerInfo) => {
		
		return new Promise((resolve, reject) => {
			
			var msg = {};
			msg.service = service;
			msg.otltype = G2C_MSG.GET_CERT_INFO;
			msg.xsSignerInfo = xsSignerInfo;
			
			chrome.runtime.sendMessage(
				EXTENSION_ID,
				msg,
				function(payload) {
					
					//console.log(resp);
					if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, service);
					
					CSUTILS.promptListener(payload, function(userAction) {
				
						if(payload.result == 0)
						{
							resolve(payload);
						}
						else reject();
					});
				}
			);
		});
	},
	
	getDecryptedData: (service, promptParams, xsSignerInfo, encDataArr, saveHandle) => {
		
		return new Promise((resolve, reject) => {
		
			var msg;
				
			msg = {};
			msg.otltype = G2C_MSG.GET_DECRYPTED_DATA;
			msg.xsSignerInfo = xsSignerInfo;
			msg.encDataArr = encDataArr;	
			
			msg.params = promptParams;
			msg.params.host = window.location.host;
			msg.params.url = window.location.href;
			
			chrome.runtime.sendMessage(
				EXTENSION_ID,
				msg,
				function(resp) {
						
					if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, service);
					
					CSUTILS.promptListener(resp, function(userAction) {
				
						if(userAction.retry == true)
						{
							/*
								Retry scenarios
								---------------
								
								1. xorkee registration
								2. User not reachable(Signature request and applyUnits request)
								
							*/
							
							promptParams = CSUTILS.getPromptParams(promptParams, userAction);
							resolve(CSUTILS.getDecryptedData(service, promptParams, xsSignerInfo, encDataArr, saveHandle));
						}
						else
						{
							if(resp.result == 0) 
							{
								if(saveHandle) xsg2cStoreHandle(xsSignerInfo.handle);
								resolve(resp);
							}
							else reject(resp);
						}
					});
				}
			);
		
		});
		
	},
	
	setExtId: () => {
		
		EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
		if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji"; //DEPLOY
		XSG2C_IMAGE_DIR = document.documentElement.getAttribute("xsG2C-imagesDir");
		if(XSG2C_IMAGE_DIR == undefined || XSG2C_IMAGE_DIR == "" || XSG2C_IMAGE_DIR == null) 
		{
			try {
				if(chrome.runtime.id != undefined) XSG2C_IMAGE_DIR = `chrome-extension://${chrome.runtime.id}/images/`;
				else XSG2C_IMAGE_DIR = "chrome-extension://plafcfhgmgngohafpaalbpbjifnoaiji/images/";
					
			} catch (e) { 
				console.log(e);
				XSG2C_IMAGE_DIR = "chrome-extension://plafcfhgmgngohafpaalbpbjifnoaiji/images/";
			}
		}
	},
	
	displayNotification: (service, show, message) => {
		
		return new Promise((resolve, reject) => {
			
			var msg = {};
			msg.service = service;
			msg.otltype = G2C_MSG.DISPLAY_NOTIFICATION;
			msg.show = show;
			msg.message = message;
			
			chrome.runtime.sendMessage(
				EXTENSION_ID,
				msg,
				function(payload) {
					
					//console.log(resp);
					if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, service);
					
					CSUTILS.promptListener(payload, function(userAction) {
				
						if(payload.result == 0)
						{
							resolve(payload);
						}
						else reject();
					});
				}
			);
		});
	},
	
	setSigAppearance_V2: (arr, boxWidth, boxHeight, font, fontSize) => {
		
		var s, sArr, x, y, i, rv, j;
		var color = {}, v = "#000000";
		color.R = parseInt(v.substr(1, 2), 16);
		color.G = parseInt(v.substr(3, 2), 16);
		color.B = parseInt(v.substr(5, 2), 16);
		
		x = 1;
		y = boxHeight - (fontSize*2);
		
		const maxWidth = boxWidth/(fontSize/2);
		
		const getNextLine = (str, maxchars) => {
		
			//console.log(maxchars);
			var i, s, e, arr = [], len;
			
			i = s = e = 0;
			len = str.length;
			
			while(i < len)
			{
				//console.log(i, s);
				if((i-s) >= maxchars)
				{
					if(e == 0 || s == e)
					{
						arr.push(str.substring(s, i));
					}
					else
					{
						arr.push(str.substring(s, e));
						i = e+1;
					}
					e = s = i;
				}
				
				if(str[i] == ' ') e = i;
				i++;
			}
			arr.push(str.substring(s));
			
			//console.log(arr);
			return arr;
		};
		
		for(i=0; i<arr.length; i++) {
			
			arr[i] = arr[i].replaceAll("(", "\\(");
			arr[i] = arr[i].replaceAll(")", "\\)");
			sArr = getNextLine(arr[i], maxWidth);
			
			for(j=0; j<sArr.length; j++) {
				
				rv = CM_PDFSetSignatureText(sArr[j], x, y, font, fontSize, color);
				if(rv !== 0) {
					console.log(rv, "Signature text set");
					continue;
				}
				
				y -= fontSize+1;
			};
		};
	},
	
	setSigAppearance: (arr, x, boxWidth, boxHeight, font, fontSize) => {
			
		const ACW = 1.5;	//Average character width for the font 'Helvetica'; Might vary for other fonts
		var s, sArr, y;
		var maxWidth = Math.floor(boxWidth/(fontSize/ACW));
		
		y = boxHeight - (fontSize+1);
		
		const getNextLine = (str, maxchars) => {
			
			//console.log(maxchars);
			var i, s, e, arr = [], len;
			
			i = s = e = 0;
			len = str.length;
			
			while(i < len)
			{
				//console.log(i, s);
				if((i-s) >= maxchars)
				{
					// console.log(s, e, i);
					if(e == 0 || s == e)
					{
						arr.push(str.substring(s, i));
					}
					else
					{
						arr.push(str.substring(s, e));
						i = e+1;
					}
					e = s = i;
				}
				
				if(str[i] == ' ') e = i;
				i++;
			}
			arr.push(str.substring(s));
			
			// console.log(arr);
			return arr;
		};
		
		s = "BT\n0 0 0 rg\n/"+font+" "+fontSize+" Tf\n";
		arr.forEach((a, i) => {
			
			a = a.replaceAll("(", "\\(");
			a = a.replaceAll(")", "\\)");
			sArr = getNextLine(a, maxWidth);
			sArr.forEach((t) => {
				s += "1 0 0 1 "+x+" "+y+" Tm ("+t+") Tj\n";
				y -= fontSize+2;
			});
		});
		s += "ET\n";
		
		if(y < 0 && fontSize > 1) s = CSUTILS.setSigAppearance(arr, x, boxWidth, boxHeight, font, fontSize-1);
					
		//console.log(s);
		return s;
	},
};