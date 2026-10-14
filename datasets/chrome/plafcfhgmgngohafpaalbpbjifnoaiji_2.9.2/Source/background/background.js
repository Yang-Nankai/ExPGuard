/*
* This file is subject to the terms and conditions defined in
* file 'LICENSE.txt', which is part of this extension package.
*/

importScripts("/common/defines.js", "bgdefines.js", "/common/B64.js", "/common/XSCUTILS.js", "xorkeesign.js", "BGUTILS.js","XSG2C.js");

var epfLoggedIn = false;

function getItrInfo(details){
	
	var reqBody, regpan;
	
	reqBody = BGUTILS.getRequestPayload(details);
	if(reqBody != null && reqBody.hasOwnProperty("serviceName"))
	{
		if(reqBody.serviceName == "wLoginService" || reqBody.serviceName == "forgotPwdService")
		{
			XSG2C.clear(SERVICENAME_ITR).then(() => {
				
				console.log("Session cleared");
				if(reqBody.entity != undefined)
				{
					regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

					if(regpan.test(reqBody.entity)){
						
					   // valid pan card number
					   if(reqBody.entity[3].toUpperCase() == "P")
					   {
						   // Personal PAN number
						   XSG2C.setPan(SERVICENAME_ITR, reqBody.entity).then(() => {console.log(`${SERVICENAME_ITR} - PAN identified`);});
					   }
					} 
				}
			});
		}
		else if(reqBody.serviceName == "dashboardMenuService")
		{
			// User logged-In
			XSG2C.clear(SERVICENAME_ITR).then(() => {
				
				console.log("Session cleared");
				XSG2C.setLoggedIn(SERVICENAME_ITR, true).then(() => {console.log(`${SERVICENAME_ITR} - Logged-in`);});
			});
		}
		else if(((reqBody.serviceName == "dashboardMenuService") || (reqBody.serviceName != "userProfileService" && details.url.indexOf("saveEntity") != -1)))
		{
			XSG2C.getIdentifySigner(SERVICENAME_ITR)
			.then(({identifySigner}) => {
			
				if(identifySigner == false)
				{
					//URL -> https://eportal.incometax.gov.in/iec/loginapi/auth/dashboard
					//the user is successfully logged-in
					//fetch the logged-in user or principal officer information
					//by sending a message from the web page
					
					//trigger message to get the information from web page
					
					/*
					* To combat where the user profile information may not be collected
					* in the first attempt due to network or other failures.
					* We will watch for the URL's named 'saveEntity' which keep repeating
					* in various places frequently to update the user profile information
					* pertaining to login to the IT portal.
					* NOTE: This is a IF loop; the next scenarios start with IF again
					*/
				
					console.log("Trying to fetch user details from itr portal..");
					
					//YUK: retry until we get a proper response either success/failure; wrap this as a function
					BGUTILS.sendMessageToCS(details.tabId, G2C_MSG.GET_SIGNER, SERVICENAME_ITR)
					.then(response => {
						
						console.log("Response received from content script");
						if(response.signerInfo != undefined)
						{
							if(response.signerInfo.contanctPanNo != undefined) 
							{
								XSG2C.setPan(SERVICENAME_ITR, response.signerInfo.contanctPanNo).then(() => {console.log(`${SERVICENAME_ITR} - PAN identified`);});
							}
							else if(response.signerInfo.roleCd == "IND" && response.signerInfo.userId != undefined)
							{
								XSG2C.setPan(SERVICENAME_ITR, response.signerInfo.userId).then(() => {console.log(`${SERVICENAME_ITR} - PAN identified`);});
							}
							
							XSG2C.setUserInfo(SERVICENAME_ITR, response.signerInfo).then((userInfo) => {console.log(`${SERVICENAME_ITR} - User Info`, userInfo);});
							
							XSG2C.setIdentifySigner(SERVICENAME_ITR, true).then(() => {console.log(`${SERVICENAME_ITR} - Signer identified`);});
							//YUK: valildate response and raise alarm
						}
						else console.log("Failed to process ITR signer Info");
					})
					.catch(error => {
						console.log("Background : "+error);
					});
				}
			})
			.catch(error => {
				console.log("Background : "+error);
			});
		}
		else if(reqBody.serviceName == "verifyDsc")
		{
			//URL -> https://eportal.incometax.gov.in/iec/verificationservices/auth/getEntity
			//indicates the user is attempting to e-Verify
			/*
			* here the PAN will correspond to the PAN of the principal contact who
			* will sign the request to e-Verify
			*
			* in this case the logged-in PAN and the assessee PAN might be different
			* ITR-1 -> logged-in PAN and assessee PAN will be same
			* ITR-6 -> logged-in PAN and assessee PAN will be different
			*/
			if(reqBody.verifPan != undefined) XSG2C.setPan(SERVICENAME_ITR, reqBody.verifPan).then(() => {console.log(`${SERVICENAME_ITR} - PAN identified`);});
		}
		else if(reqBody.serviceName == "logoutService")
		{
			// User logged-Out
			XSG2C.clear(SERVICENAME_ITR).then(() => {console.log("Session cleared");});
		}
	}
}

function getMCAInfo(details){
	
	var url = details.url;
	
	if(url.indexOf("showAssociateDSC.do") != -1)
	{
		XSG2C.clear(SERVICENAME_MCA).then(() => {console.log("Session cleared");});
	}
	else if(url.indexOf(".do") != -1)
	{
		if(details.requestBody && details.requestBody.formData)
		{
			if(details.requestBody.formData.roleId && details.requestBody.formData.roleId.length > 0)
			{
				XSG2C.setRole(SERVICENAME_MCA, MCA_ROLE[details.requestBody.formData.roleId[0]])
				.then(() => {
					
					if(details.requestBody.formData.DIN && details.requestBody.formData.DIN.length > 0)
					{
						XSG2C.getDin(SERVICENAME_MCA)
						.then(({din}) => {
							
							if(din != details.requestBody.formData.DIN[0])
							{
								XSG2C.setDin(SERVICENAME_MCA, details.requestBody.formData.DIN[0])
								.then(() => {
									console.log("Pan Identified using DIN");
								})
								.catch(e => {
									console.log(e);
								});
							}
						})
						.catch(e => {
							console.log(e);
						});
					}
				})
				.catch(e => {
					console.log(e);
				});
			}
		}
	}
}

function getGSTInfo(details){
	
	var reqBody, params, url = details.url;
	
	if(url.indexOf("services/authenticate") != -1)
	{
		XSG2C.clear(SERVICENAME_GST).then(() => {
				
			console.log("Session cleared");
			XSG2C.setLoggedIn(SERVICENAME_GST, true).then(() => {console.log(`${SERVICENAME_GST} - Logged-in`);});
		});
		
		req = BGUTILS.getRequestPayload(details);
		if(req != null && req.username != undefined) XSG2C.setUserInfo(SERVICENAME_GST, req);
	}
	else if(url.indexOf("services/auth/fowelcome") != -1)
	{
		//first (home) page after successful login
		//get the profile information to load GSTIN and Organization name
		console.log("Trying to fetch user details from GST portal..");
		
		BGUTILS.sendMessageToCS(details.tabId, G2C_MSG.GET_SIGNER, SERVICENAME_GST)
		.then(response => {
			
			console.log("Response received from content script");
			if(response != undefined) XSG2C.setUserInfo(SERVICENAME_GST, response.signerInfo);
			else console.log("ERROR : Unable to get GST signer Info from the portal");
			
		})
		.catch(error => {
			console.log("Background : "+error);
		});
		
		//response handled in onMessageExternal event handler below
	}
	else if(url.indexOf("userdetails") != -1)
	{
		//update gstin from the querystring
		//gstin is used as the website identifier to store the loginid<->handle mapping in "extensionGetSignature" request
		//this request is fired frequently by the portal
		if(url.indexOf('?')!=-1)
		{
			params = new URLSearchParams(url.split('?')[1]);
			if(params && params.get('ctin')!=undefined) XSG2C.setUserInfo(SERVICENAME_GST, {gstin:params.get('ctin')});;
		}
	}
	else if(url.indexOf("services/logout") != -1)
	{
		XSG2C.clear(SERVICENAME_GST).then(() => {console.log("Session cleared");});
	}
}

function getTDSInfo(details){
	
	var url = details.url;
	
	if(url.indexOf("/app/j_security_check") != -1)
	{
		if(details.requestBody && details.requestBody.formData)
		{
			XSG2C.clear(SERVICENAME_TDS).then(() => {
				
				console.log(`${SERVICENAME_TDS} session cleared`);
				XSG2C.setLoggedIn(SERVICENAME_TDS, true).then(() => {console.log(`${SERVICENAME_TDS} - Logged-in`);});
			});
			
			if(details.requestBody.formData.selradio && details.requestBody.formData.selradio.length > 0)
			{
				XSG2C.setUserInfo(SERVICENAME_TDS, {loginType:(details.requestBody.formData.selradio[0] == "D")?"deductor":"taxpayer"}).then((userInfo) => {console.log(`${SERVICENAME_TDS} - User Info`);});
			}
			
			if(details.requestBody.formData.j_tanPan && details.requestBody.formData.j_tanPan.length > 0)
			{
				XSG2C.setUserInfo(SERVICENAME_TDS, {tanpan:details.requestBody.formData.j_tanPan[0]}).then((userInfo) => {console.log(`${SERVICENAME_TDS} - User Info`);});
			}
		}
	}
	else if(url.indexOf("/app/logout.xhtml") != -1)
	{
		XSG2C.clear(SERVICENAME_TDS).then(() => {console.log(`${SERVICENAME_TDS} session cleared`);});
	}
}

function getEPFInfo(details){
	
	var url = details.url;
	
	if(url == URL_SERVICE_EPF+"/epfo/")
	{
		// EPF Login Page
		req = BGUTILS.getRequestPayload(details);
		if(req != null && req.userName != undefined)
		{
			epfLoggedIn = true;
			// Login Authentication request is fired.
			XSG2C.clear(SERVICENAME_EPF).then(() => {
				
				console.log(`${SERVICENAME_EPF} session cleared`);
				XSG2C.setLoggedIn(SERVICENAME_EPF, true).then(() => {console.log(`${SERVICENAME_EPF} - Logged-in`);});
			});
		}
		else
		{
			/*
				For the following possible scenario local storage will be cleared
				
				1. When landed in login page
				2. If not properly logged out and landed in login page
				3. Error while entering the login credentials
			*/
			
			XSG2C.clear(SERVICENAME_EPF).then(() => {console.log(`${SERVICENAME_EPF} session cleared and logout`);});
		}
		
		//any non-existant or invalid rule id's will be ignored and will not result in an error; hence safe
		chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: [RULEID.EPF_REDIRECT]},function(){
			console.log("Cleared previous rules ...");
		});
	}
	else if(url.indexOf("_HDIV_STATE_") != -1)
	{
		if(url.indexOf('/logout?') != -1 && url.indexOf('restoreSession') == -1)
		{
			epfLoggedIn = false;
			XSG2C.clear(SERVICENAME_EPF).then(() => {console.log(`${SERVICENAME_EPF} session cleared and logout`);});
		}
		else if(details.type == "main_frame" || details.type == "sub_frame" || details.type == "other")
		{
			XSG2C.getRedirectRule(SERVICENAME_EPF)
			.then(({tabInfo, redirectRule}) => {
				
				if(tabInfo != undefined && tabInfo.tabId == details.tabId)
				{
					if(redirectRule == true)
					{
						//Redirect Rule removed
						console.log("URL redirected");
						chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: [RULEID.EPF_REDIRECT]},function(){
							XSG2C.setRedirectRule(SERVICENAME_EPF, false);
						});
					}
				}
			})
			.catch(e => {
				console.log(e);
			});
		}
	}
}

function getMCAV3Info(details){
	var url = details.url;
	
	if(url.indexOf("bin/mca/login") != -1)
	{
		XSG2C.clear(SERVICENAME_MCA_V3).then(() => {
				
			console.log(`${SERVICENAME_MCA_V3} session cleared`);
			XSG2C.setLoggedIn(SERVICENAME_MCA_V3, true).then(() => {console.log(`${SERVICENAME_MCA_V3} - Logged-in`);});
		});
	}
	else if(url.indexOf("bin/mca/logout") != -1)
	{
		XSG2C.clear(SERVICENAME_MCA_V3).then(() => {
				
			console.log(`${SERVICENAME_MCA_V3} session cleared`);
		});
	}
}

function getDGFTInfo(details){
	
	var url = details.url, req;
	
	if(url.indexOf("/j_spring_security_check") != -1)
	{
		req = BGUTILS.getRequestPayload(details);
		
		if(req != null && req.username != undefined && req.password != undefined)
		{
			XSG2C.clear(SERVICENAME_DGFT).then(() => {
					
				console.log(`${SERVICENAME_DGFT} session cleared`);
				XSG2C.setLoggedIn(SERVICENAME_DGFT, true).then(() => {console.log(`${SERVICENAME_DGFT} - Logged-in`);});
			});
		}
	}
	else if(url.indexOf("/j_spring_security_logout") != -1)
	{
		XSG2C.clear(SERVICENAME_DGFT).then(() => {
				
			console.log(`${SERVICENAME_DGFT} session cleared`);
		});
	}
}

function getCooDgftInfo(details) {
	
	if(details.method === "GET" && details.url.indexOf("dsc/jnlp.php") !== -1)
	{
		// Chrome downloads API listener does not provide tab id to send the file URL to the contentscript.
		// Tab id is stored globally here and when the download event trigger, this tab id id used to send message
		TAB_ID = details.tabId;
	} 
}

function requestHandler(details) {
	
	var service;
	
	// console.log(details);
	service = BGUTILS.getServiceName(details.url);
	
	switch(service)
	{
		case SERVICENAME_ITR:
		{
			getItrInfo(details);
			break;
		}
		case SERVICENAME_MCA:
		{
			getMCAInfo(details);
			break;
		}
		case SERVICENAME_GST:
		{
			getGSTInfo(details);
			break;
		}
		case SERVICENAME_TDS:
		{
			getTDSInfo(details);
			break;
		}
		case SERVICENAME_EPF:
		{
			getEPFInfo(details);
			break;
		}
		case SERVICENAME_MCA_V3:
		{
			getMCAV3Info(details);
			break;
		}
		case SERVICENAME_DGFT:
		{
			getDGFTInfo(details);
			break;
		}
		case SERVICENAME_COO_DGFT:
		{
			getCooDgftInfo(details);
			break;
		}
	}
}

/*
* This event is fired even before a single byte is sent to the server.
* All the request redirections should be handled here.
* Preserve the request payload here which would not be available in later events.
*/

chrome.webRequest.onBeforeRequest.addListener(
	requestHandler,
	{
		urls: [URL_SERVICE_ITR+"/*", URL_SERVICE_MCA+"/*", "https://*."+URL_SERVICE_GST+"/*",URL_SERVICE_TDS+"/*",URL_SERVICE_EPF+"/*",URL_SERVICE_MCA_V3_REQ+"/*",URL_SERVICE_DGFT+"/*",URL_SERVICE_COO_DGFT+"/*"]
	},
	//'requestBody' permission for capturing the request payload
	["requestBody"]
);

chrome.webRequest.onHeadersReceived.addListener(
	function(details) {
		
		console.log(details);
		if(details.type == "xmlhttprequest" && details.statusCode == 302)
		{
			details.responseHeaders.forEach(function(header){
				if(header.name.toLowerCase() == "location")
				{
					XSG2C.setRedirectUrl(SERVICENAME_ICEGATE, header.value)
					.then(() => {
						console.log(`${SERVICENAME_ICEGATE} - Redirection URL set`);
					});
					return;
				}
			});
		}
	},
	{
		urls: ["https://"+URL_SERVICE_ICEGATE+"/*"]
	},
	["responseHeaders"]
);

function commonListener(sender, request, sendResponse, tabInfo){
	
	if(request.type == G2C_MSG.SET_INFO)
	{
		// xorkeesign error logger
		XSG2C.setInfo(BGUTILS.getServiceName(sender.url), tabInfo, request.handle, request.action, request.message);
		sendResponse({success:true});
		return true;
	}
	else if(request.type == G2C_MSG.TABS)
	{
		chrome.tabs.create({ url: request.url }, function (tab) {
			console.log("Tab created");
			sendResponse({success:true});
		});
		return true;
	}
}

function emsSign(service, tabInfo, tbs, xsSignerInfo, params, sendResponse){
	
	XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.PKCS7, tbs, xsSignerInfo, params, function(xsSignerInfo, xsSignatureInfo){
		
		if(service == SERVICENAME_MCA) XSG2C.emsMCASign(service, xsSignerInfo, xsSignatureInfo, sendResponse);
		else if(service == SERVICENAME_GST) XSG2C.emsGSTSign(service, xsSignerInfo, xsSignatureInfo, sendResponse);
		else if(service == SERVICENAME_TDS) XSG2C.emsTDSSign(service, xsSignerInfo, xsSignatureInfo, sendResponse);
		
	},function(){
		
		sendResponse({result:-1, errorString:ERROR_STD});
	});
}

function embListener(service, tabInfo, request, sender, sendResponse){
	
	var payload;
	
	try{
		payload = JSON.parse(request.payload);
		//YUK: validate (expected fields in) 'params' and raise alarm in the respective places
	} catch(e){
		
		console.log(request.payload);
		sendResponse({result:-1, errorString:ERROR_PORTAL});
		return true;
	}
	
	if(request.url.indexOf("ListToken") > -1)
	{
		// Pan will be identified and stored using webRequest API and portal API is fired in content script.
		XSG2C.getPan(service, function(pan){
			
			XSG2C.getSignerInfo(service, tabInfo, pan, payload.encryptionKeyId, request.params, function(xsSignerInfo){
					
				XSG2C.embListToken(service, xsSignerInfo, function(payload){
					
					sendResponse(payload);
				});
				
			}, function(errcode, errstr){
				
				// xorkeesign standard error
				// Failed to send "extensionGetSignerInfo" request to xorkeesign
				
				if(errcode === G2C_ERR.MULTIPLE_HANDLES[0]) {
					
					// Multiple handles
					// "errstr" is a object which as xorkeesign signerInfo
					// This info is used to list the handles 
					sendResponse(errstr);
				}
				else sendResponse({result:errcode, errorString:errstr, service:service});
			});
		}, function(){
			
			console.log("Unable to fetch PAN from storage");
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else if(request.url.indexOf("ListCertificate") > -1)
	{
		XSG2C.embListCertificate(service, sendResponse);
	}
	else if(request.url.indexOf("PKCSSign") > -1)
	{
		XSG2C.getSignature(service, tabInfo,  SIGNATURE_TYPE.PKCS7, payload, undefined, request.params, function(xsSignerInfo, xsSignatureInfo){
			
			XSG2C.embPKCSSign(service, xsSignerInfo, xsSignatureInfo, function(payload){
				
				sendResponse(payload);
			});
			
		},function(){
			
			console.log("Unable to get signature");
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else
	{
		console.log("Unsupported URL: "+request.url);
		sendResponse({result:-1, errorString:ERROR_STD});
		// YUK
	}
	return true;
}

function emsListener(service, tabInfo, request, sender, sendResponse){
	
	if(request.xsSignerInfo == undefined || (request.xsSignerInfo != undefined && request.xsSignerInfo.handle == undefined))
	{
		/*
			Scenarios
			1. Sign Button is clicked
			2. Not registered in xorkee. I'm ready button in xorkee registration prompt
		*/
		XSG2C.emsInit(service, request, function(pan){
			
			XSG2C.getSignerInfo(service, tabInfo, pan, undefined, request.params, function(xsSignerInfo){
				
				if(xsSignerInfo.handle != undefined)
				{
					// xorkee user
					emsSign(service, tabInfo, request.tbs, xsSignerInfo, request.params, sendResponse);
				}
				else
				{
					// Not a xorkee user
					sendResponse(xsSignerInfo);
				}
				
			}, function(errcode, errstr){
				
				if(errcode === G2C_ERR.MULTIPLE_HANDLES[0]) {
					
					// Multiple handles
					// "errstr" is a object which as xorkeesign signerInfo
					// This info is used to list the handles 
					sendResponse(errstr);
				}
				else sendResponse({result:errcode, errorString:errstr});
			});
		}, function(e){
			
			console.log(e);
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else
	{
		/*
			// Signature request retry
			// Skip the signerInfo request
		*/
		emsSign(service, tabInfo, request.tbs, xsSignerInfo, request.params, sendResponse);
	}
	return true;
}

function epfListener(service, tabInfo, request, sender, sendResponse){
	
	var signatureType, response = {}, tbs;
	
	if(request.otlType == G2C_MSG.REG_DSC)
	{
		signatureType = SIGNATURE_TYPE.REGISTERDSC;
		// Signature is not needed in EPFO DSC registration, so handle is passed as TBS
		tbs = request.xsSignerInfo.handle;
	}
	else if(request.otlType == G2C_MSG.GET_SIGNATORIES)
	{
		XSG2C.loadSignersInfo(service, tabInfo, request.selectedSignerIndex, function(signatories){
			
			console.log(signatories);
			response = {};
			response.selectedSignerIndex = request.selectedSignerIndex;
			response.signatories = signatories;
			sendResponse(response);
			
		}, function(){
			sendResponse({result:G2C_ERR.NO_USER_IDENTIFIER[0], errorString:G2C_ERR.NO_USER_IDENTIFIER[1]});
		});
		return true;
	}
	else if(request.otltype == G2C_MSG.GET_SIGNER)
	{
		XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, request.params, function(xsSignerInfo){
				
			
			sendResponse(xsSignerInfo);
		}, function(errcode, errstr){
			
			sendResponse({result:errcode, errorString:errstr});
		});
		return;
	}
	else if(request.otlType == G2C_MSG.GET_SIGNATURE)
	{
		tbs = request.tbs;
		signatureType = SIGNATURE_TYPE.PKCS7;
	}
	
	XSG2C.getSignature(service, tabInfo, signatureType, tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
		
		sendResponse({...xsSignerInfo, ...xsSignatureInfo});
		
	},function(){
		
		sendResponse({result:-1, errorString:ERROR_STD});
		
	});
	return true;
}

function cpppListener(service, tabInfo, request, sender, sendResponse){
	
	if(request.otltype == G2C_MSG.CPPP_GET_SIGNER)
	{
		//send the certificate digest and get the signatory
		XSG2C.getCertIdentifier(service, tabInfo, request.certificate, function(certIdentifier, certDeatails){
			
			XSG2C.getSignerInfo(service, tabInfo, certIdentifier, undefined, request.params, function(xsSignerInfo){
				
				// Added to display in xorkee registration prompt
				xsSignerInfo.signatoryName = certDeatails.commonName;
				xsSignerInfo.effectiveTill = certDeatails.validTill;
				
				sendResponse(xsSignerInfo);
			}, function(errcode, errstr){
				
				sendResponse({result:errcode, errorString:errstr});
			});
			
		}, function(errcode, errstr){
			
			sendResponse({result:errcode, errorString:errstr});
		});
	}
	else if(request.otltype == G2C_MSG.CPPP_LOGIN)
	{
		XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.LOGIN, request.tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
		
			if(xsSignerInfo.handle != undefined)
			{
				// Handle is preserved as it is used while decrypting the bid to identify the corresponding encryption certificate
				XSG2C.setHandle(service, xsSignerInfo.handle);
			}
			
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else if(request.otltype == G2C_MSG.CPPP_REGISTER)
	{
		if(request.params != undefined && request.params.registerEnc == true)
		{
			// Register encryption certificate
			XSG2C.getExtGetAllEncDSC(service, tabInfo, request.xsSignerInfo, request.params, function(encDSCInfo){
				
				encDSCInfo.registerEnc = true; // Flag is used to identify where the user is registering encryption certificate. Will be used to display contextual text in key not found prompt.
				
				sendResponse({...request.xsSignerInfo, ...encDSCInfo});
			},function(errcode, errorString){
				
				sendResponse({result:errcode, errorString:errorString});
			});
		}
		else
		{
			// Register signing certificate
			XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.REGISTERDSC, request.tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
			
				sendResponse({...xsSignerInfo, ...xsSignatureInfo});
			},function(){
				
				sendResponse({result:-1, errorString:ERROR_STD});
			});
		}
	}
	else if(request.otltype == G2C_MSG.CPPP_DOCSIG)
	{
		XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.DOCSIG, request.tbs.tbs, request.xsSignerInfo, request.tbs, function(xsSignerInfo, xsSignatureInfo){
		
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else if(request.otltype == G2C_MSG.CPPP_AUCTION_SUBMIT)
	{
		XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.AUCTION, request.tbs.tbs, request.xsSignerInfo, request.tbs, function(xsSignerInfo, xsSignatureInfo){
		
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else if(request.otltype == G2C_MSG.CPPP_PDFSIG)		//publisher
	{
		XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.PKCS7, request.tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
		
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else if(request.otltype == G2C_MSG.CPPP_BIDSIG)
	{
		XSG2C.getDocSignature(service, tabInfo, request.xsSignerInfo, request.docs, 0, [], sendResponse);
	}
	else if(request.otltype == G2C_MSG.GET_BULK_CONTEXT)
	{
		XSG2C.getHandle(service, function(handle){
			
			XSG2C.getContext(service, tabInfo, handle, request.certificate, request.commonName, request.count, sendResponse);
			
		}, function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else if(request.otltype == G2C_MSG.BULK_PROCESS)
	{
		if(request.processType == BULK_PROCESS_TYPE.DECRYPT)
		{
			XSG2C.getData(service, tabInfo, request.xsInfo, request.payload, request.params, sendResponse);
		}
		else if(request.processType == BULK_PROCESS_TYPE.FINALIZE)
		{
			XSG2C.getDataFinalize(service, tabInfo, request.context, sendResponse);
		}
		// TODO: handle if bulk signing is enabled in server
	}
	else if(request.otltype == G2C_MSG.GET_CERT_INFO)
	{
		XSG2C.getExtCertInfo(service, tabInfo, request.certificate, sendResponse);
	}
}

function icegateListener(service, tabInfo, request, sender, sendResponse){
	
	if(request.otltype == G2C_MSG.REG_DSC)
	{
		// Register signing certificate
		XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.REGISTERDSC, request.tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
		
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else if(request.otltype == G2C_MSG.GET_SIGNER)
	{
		XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, request.params, function(xsSignerInfo){
				
			
			sendResponse(xsSignerInfo);
		}, function(errcode, errstr){
			
			sendResponse({result:errcode, errorString:errstr});
		});
	}
	else if(request.otltype == G2C_MSG.GET_SIGNATURE)
	{
		XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.PKCS7, request.tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
		
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});
			
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
			
		});
	}
	else if(request.otltype == G2C_MSG.GET_REDIRECT_URL)
	{
		XSG2C.getRedirectUrl(service)
		.then(({redirectUrl}) => {
			
			console.log("Redirect URL", redirectUrl);
			if(redirectUrl != undefined && redirectUrl != null) sendResponse({location:redirectUrl});
			else sendResponse({errorString:"Not available", location:"https://old.icegate.gov.in/esanchit/home"});
		})
		.catch(e => {
			console.log(e);
			sendResponse({errorString:"Exception", location:"https://old.icegate.gov.in/esanchit/home"});
		});
	}
	
}

function icegateNewListener(service, tabInfo, request, sender, sendResponse){
	
	if(request.otltype == G2C_MSG.GET_SIGNATURE)
	{
		if(request.sigType === SIGNATURE_TYPE.RAW) {
			
			XSG2C.getSignature(service, tabInfo, "Signature requested to sign the document", request.tbs, request.params, request.params, function(xsSignerInfo, xsSignatureInfo){
					
				sendResponse({...xsSignerInfo, ...xsSignatureInfo});
			},function(){
				
				sendResponse({result:-1, errorString:ERROR_STD});
			});
		}
		else {
			
			XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, request.params, function(xsSignerInfo){
				
				if(!xsSignerInfo.handle)
				{
					// Not a xorkee user
					sendResponse(xsSignerInfo);
				}
				else
				{
					XSG2C.getSignature(service, tabInfo, request.sigType, request.tbs, xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
					
						sendResponse({...xsSignerInfo, ...xsSignatureInfo});
					},function(){
						
						sendResponse({result:-1, errorString:ERROR_STD});
					});
				}
			}, function(errcode, errstr){
				
				sendResponse({result:errcode, errorString:errstr});
			});
		}
	}
	else if(request.otltype == G2C_MSG.GET_SIGNER)
	{
		// TODO
		XSG2C.getSignerInfo(SERVICENAME_DGFT, tabInfo, undefined, undefined, request.params, function(xsSignerInfo){
				
			
			sendResponse(xsSignerInfo);
		}, function(errcode, errstr){
			
			sendResponse({result:errcode, errorString:errstr});
		});
	}
}

function mahaitListener(service, tabInfo, request, sender, sendResponse){
	
	if(request.otltype == G2C_MSG.GET_SIGNER)
	{
		XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, request.params, function(xsSignerInfo){
				
			
			sendResponse(xsSignerInfo);
		}, function(errcode, errstr){
			
			sendResponse({result:errcode, errorString:errstr});
		});
	}
	else if(request.otltype == G2C_MSG.GET_SIGNATURE)
	{
		XSG2C.getSignature(service, tabInfo, (request.sigType==SIGNATURE_TYPE.PKCS7)?SIGNATURE_TYPE.PKCS7:SIGNATURE_TYPE.RAW, request.tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
		
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});
			
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
			
		});
	}
}

function shcilListener(service, tabInfo, request, sender, sendResponse){
	
	if(request.otltype == G2C_MSG.GET_SIGNER)
	{
		XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, request.params, function(xsSignerInfo){
				
			
			sendResponse(xsSignerInfo);
		}, function(errcode, errstr){
			
			sendResponse({result:errcode, errorString:errstr});
		});
	}
	else if(request.otltype == G2C_MSG.GET_SIGNATURE)
	{
		XSG2C.getSignature(service, tabInfo, request.sigType, request.tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
		
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});
			
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
			
		});
	}
}

function cooDgftListener(service, tabInfo, request, sender, sendResponse)
{	
	if(request.otltype == G2C_MSG.GET_SIGNER)
	{
		XSG2C.getSignerInfo(service, tabInfo, request.iecCode, undefined, request.params, function(xsSignerInfo){
				
			xsSignerInfo.iecCode = request.iecCode;
			sendResponse(xsSignerInfo);
		}, function(errcode, errstr){
			
			sendResponse({result:errcode, errorString:errstr});
		});
	}
	else if(request.otltype == G2C_MSG.GET_SIGNATURE)
	{
		XSG2C.getSignature(service, tabInfo, request.sigType, request.tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
		
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});
			
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});
			
		});
	}
}

function notifications(show, msg) {
	
	const notificationId = "g2c";
	
	if(show && msg) {
	
		chrome.notifications.clear(
			notificationId,
			function(){
				chrome.notifications.create(
				  notificationId,
				  {
					type: "basic",
					iconUrl: "/images/icon128.png",
					title: "xorkeesign India G2C",
					requireInteraction: false,
					message: msg,
				  },
				  function () {
					console.log("Notification dispatched");
				  }
				);
			}
		);
	}
	else {
		
		chrome.notifications.clear(
			notificationId,
			function(){
				console.log("Notification cleared");
			}
		);
	}
}
function xsListener(service, tabInfo, request, sender, sendResponse) {	
	
	if(XSCUTILS.getComponentName(service) == COMPONENT.CRIS && request.params) {
		
		const Req = new otlCrisRequest();
		Req.deserialize(request.params.payload);
		request.params.payload = Req;
	}

	if(request.otltype == G2C_MSG.GET_SIGNER) {
		
		XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, request.params, function(xsSignerInfo){
				
			sendResponse(xsSignerInfo);
		}, function(errcode, errstr){
			
			sendResponse({result:errcode, errorString:errstr});
		});
	}
	else if(request.otltype == G2C_MSG.GET_SIGNATURE) {
		
		XSG2C.getSignature(service, tabInfo, request.sigType, request.tbs, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
			
			if(request.params.payload.certtype === request.params.payload.CERT_TYPE.EN) xsSignatureInfo.registerEnc = true;
			
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});			
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});	
		});
	}
	else if(request.otltype == G2C_MSG.GET_DECRYPTED_DATA) {
		
		XSG2C.getDecryptedData(service, tabInfo, request.encDataArr, request.xsSignerInfo, request.params, function(xsSignerInfo, xsSignatureInfo){
			
			sendResponse({...xsSignerInfo, ...xsSignatureInfo});			
		},function(){
			
			sendResponse({result:-1, errorString:ERROR_STD});		
		});
	}
	else if(request.otltype == G2C_MSG.GET_ENC_DSC) {
		
		const getEncDsc = () => {
			
			XSCACHE.get("extensionGetAllEncDSC")
			.then((resp) => {
			
				if(resp?.result === 0) {
					
					if(resp.handle === request.xsSignerInfo.handle) sendResponse(resp);
					else {
						XSCACHE.clear("extensionGetAllEncDSC")
						.then(() => {
							getEncDsc();
						})
						.catch((e) => {
							sendResponse({result:-1, errorString:ERROR_STD});
						});
					}
				}
				else {
					
					XSG2C.getExtGetAllEncDSC(service, tabInfo, request.xsSignerInfo, request.params, function(encDSCInfo){
							
						if(request.params.payload.action === request.params.payload.ACTIONS.SIGN) encDSCInfo.registerEnc = true; // Flag is used to identify where the user is registering encryption certificate. Will be used to display contextual text in key not found prompt.
						
						encDSCInfo = {...request.xsSignerInfo, ...encDSCInfo};
						
						XSCACHE.push(encDSCInfo);
						
						sendResponse(encDSCInfo);
					},function(errcode, errorString){
						
						sendResponse({result:errcode, errorString:errorString});
					});
				}
				
			})
			.catch((e) => {
				console.log(e);
				sendResponse({result:-1, errorString:ERROR_STD});
			});
		};
		
		if(request.reload) {
			
			XSCACHE.clear("extensionGetAllEncDSC")
			.then(() => {
				getEncDsc();
			})
			.catch((e) => {
				sendResponse({result:-1, errorString:ERROR_STD});
			});
		}
		else getEncDsc();
	}
	else if(request.otltype == G2C_MSG.GET_CERT_INFO) {
		
		XSG2C.xsCertParser(request.service, request.xsSignerInfo, function(signerInfo){
				
			sendResponse(signerInfo);
		}, function(err){
			
			sendResponse({result:-1, errorString:ERROR_STD});
		});
	}
	else if(request.otltype == G2C_MSG.DISPLAY_NOTIFICATION) {
		
		notifications(request.show, request.message);
	}
}

chrome.runtime.onMessage.addListener(

	function(request, sender, sendResponse){
		
		console.log(request);
		console.log(sender);
		console.log(sendResponse);
		
		var tabInfo, rv, service;
		
		service = BGUTILS.getServiceName(sender.url);
		
		tabInfo = XSG2C.frameTabInfo(sender);
		
		rv = commonListener(sender, request, sendResponse, tabInfo);
		if(rv == true) return true;
		
		if(request.type == G2C_MSG.GET_MESSAGE)
		{
			// In login page, extension storage is cleared.
			XSG2C.clear(service)
			.then(() => {
				console.log(`${service} - extension storage cleared`);
			})
			.catch(e => {console.log(e);});
			
			// Message from contentscript.js
			// If there is any message from xorkeesign regarding their service access, it will be displayed in a popup in all supporting portal's landing/login page
			
			XSG2C.getMessage(sender.url, sender.tab.id, sendResponse);
			return true;
		}
		else if(request.type == G2C_MSG.REDIRECT_URL)
		{
			// Message from permission.js
			if(request.grantAccess == true) 
			{
				// User has given permission to inject files for the specified domain
				// Update the specified domain in the current tab
				chrome.tabs.update(sender.tab.id, { url: request.url}, function(){
					sendResponse({success:true});
					
					BGUTILS.assignDownloadsApiEvent();
				});
			}
			else
			{
				// User has not given permission to inject files for the specified domain
				chrome.tabs.remove(sender.tab.id, function(){
					sendResponse({success:true});
				});
			}
			return true;
		}
		
		if(sender.url.indexOf(URL_SERVICE_EPF) != -1)
		{
			epfListener(SERVICENAME_EPF, tabInfo, request, sender, sendResponse);
		}
		else if(BGUTILS.isEProcure(sender.url) == true)
		{
			cpppListener(SERVICENAME_CPPP, tabInfo, request, sender, sendResponse);
		}
		else if(service === SERVICENAME_COO_DGFT)
		{
			cooDgftListener(service, tabInfo, request, sender, sendResponse);
		}
		return true;
	}
);

chrome.runtime.onMessageExternal.addListener( 

	function(request, sender, sendResponse) {
		
		console.log(request);
		console.log(sender);
		console.log(sendResponse);
		
		var tabInfo, rv, service;
		
		tabInfo = XSG2C.frameTabInfo(sender);
		
		service = BGUTILS.getServiceName(sender.url);
		
		rv = commonListener(sender, request, sendResponse, tabInfo);
		if(rv == true) return true;
		
		
		if(sender.url.indexOf(URL_SERVICE_MCA) != -1 || sender.url.indexOf(URL_SERVICE_GST) != -1 || sender.url.indexOf(URL_SERVICE_TDS) != -1)
		{
			emsListener(service, tabInfo, request, sender, sendResponse);
		}
		else if(XSCUTILS.getComponentName(service) == COMPONENT.EMB)
		{
			embListener(service, tabInfo, request, sender, sendResponse);
		}
		else if(sender.url.indexOf(URL_SERVICE_EPF) != -1)
		{
			epfListener(service, tabInfo, request, sender, sendResponse);
		}
		else if(sender.url.indexOf(URL_SERVICE_ICEGATE) != -1)
		{
			icegateListener(service, tabInfo, request, sender, sendResponse);
		}
		else if(sender.url.indexOf(URL_SERVICE_ICEGATE_NEW) != -1)
		{
			icegateNewListener(service, tabInfo, request, sender, sendResponse);
		}
		else if(BGUTILS.isMahaOnline(sender.url) == true)
		{
			mahaitListener(service, tabInfo, request, sender, sendResponse);
		}
		else if(sender.url.indexOf(URL_SERVICE_SHCIL_UAT) != -1 || sender.url.indexOf(URL_SERVICE_SHCIL) != -1)
		{
			shcilListener(service, tabInfo, request, sender, sendResponse);
		}
		else if(XSCUTILS.getComponentName(service) == COMPONENT.CRIS || service === SERVICENAME_WBHS)
		{
			xsListener(service, tabInfo, request, sender, sendResponse);
		}
		return true;
	}
);

/*
* Listener for browser TAB onload.
* Use this to identify whether all the resources are loaded and prepare
* the extension for signing by connecting with the contentscript.
* At this stage, any corresponding contentscript should be attached and loaded.
*/
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	
	if( (tab.url == URL_SERVICE_EPF+"/epfo/" || tab.url.toLowerCase() == URL_SERVICE_EPF_VERIFY_OTP) && tab.status == "complete")
	{
		// console.log(tab);
		XSG2C.isLoggedIn(SERVICENAME_EPF)
		.then(({loggedIn}) => {
			
			console.log(loggedIn);
			if(loggedIn == true || epfLoggedIn == true)
			{
				BGUTILS.sendMessageToCS(tabId, G2C_MSG.GET_SIGNER, SERVICENAME_EPF)
				.then(response => {
					
					console.log(response);
					if(response != undefined)
					{
						epfLoggedIn = false;
						if(response.signerInfo != undefined && response.signerInfo.establishment != undefined) XSG2C.setUserInfo(SERVICENAME_EPF, response.signerInfo.establishment);
						
						if(response.signatories != undefined && response.signatories.rows != undefined) XSG2C.setSignatories(SERVICENAME_EPF, response.signatories.rows);
						
						XSG2C.setTabInfo(SERVICENAME_EPF, {tab:tab});
						
						console.log("Extracted establishment info", response);
						
						BGUTILS.sendMessageToCS(tabId, G2C_MSG.EPF_RELOAD_HOME, SERVICENAME_EPF, response.homeUrl)
						.then(response => {
							console.log("EPF reloaded after signer identification");
						})
						.catch(error => {
							console.log("Background : "+error);
						});

					}
					else console.log("ERROR : Unable to fetch signer Info");
					
				})
				.catch(error => {
					console.log("Background : "+error);
				});
			}
		})
		.catch(e => {
			console.log(e);
		});	
	}
	else if(tab.url == URL_SERVICE_TDS+"/app/" && tab.status == "complete")
	{
		XSG2C.getName(SERVICENAME_TDS)
		.then(({userName}) => {
			
			if(userName == undefined)
			{
				BGUTILS.sendMessageToCS(tabId, G2C_MSG.GET_SIGNER, SERVICENAME_TDS)
				.then(response => {
					
					if(response != undefined && response.signerInfo != undefined ) XSG2C.setUserInfo(SERVICENAME_TDS, {"userName":response.signerInfo.name});
					else console.log("ERROR : Unable to get TDS signer name from the portal");
					
				})
				.catch(error => {
					console.log("Background : "+error);
				});
			}
		})
		.catch(e => {console.log(e);});
	}
	else if(tab.status == "complete" && BGUTILS.isEProcureOthers(tab.url) == true)
	{
		chrome.permissions.contains({
			origins: [tab.url]
		}, (result) => {
			
			if(result)
			{
				// User has given permission to inject script and CSS
				BGUTILS.attachCommonFiles(SERVICENAME_CPPP, tabId);
			}
			else
			{
				var params = new URLSearchParams({
					url: tab.url,
				});
				
				chrome.tabs.update(tabId, { url: chrome.runtime.getURL("permissions.html?"+params.toString()) });
			}
		});
	}
	else if(tab.status == "complete" && (BGUTILS.isMahaOnline(tab.url) == true || BGUTILS.getServiceName(tab.url) === SERVICENAME_SHCIL))
	{
		chrome.permissions.contains({
			origins: [tab.url]
		}, (result) => {
			
			if(result)
			{
				// User has given permission to inject script and CSS
				// BGUTILS.attachCommonFiles(SERVICENAME_MAHAIT, tabId);
			}
			else
			{
				var params = new URLSearchParams({
					url: tab.url,
				});
				
				chrome.tabs.update(tabId, { url: chrome.runtime.getURL("permissions.html?"+params.toString()) });
			}
		});
	}
	else if(tab.status == "complete" && BGUTILS.getServiceName(tab.url) === SERVICENAME_COO_DGFT)
	{
		chrome.permissions.contains(
			{
				permissions: ['downloads'],
				origins: [URL_SERVICE_COO_DGFT+"/*"]
			}, 
			(granted) => 
			{
				if (granted === false) 
				{
					console.log(granted);
					var params = new URLSearchParams({
						url: tab.url,
						permissions:'["downloads"]',
					});
					
					chrome.tabs.update(tabId, { url: chrome.runtime.getURL("permissions.html?"+params.toString()) });
				}
			}
		);
	}
	else if(tab.status == "complete" && BGUTILS.getServiceName(tab.url) === SERVICENAME_WBHS)
	{
		chrome.permissions.contains(
			{
				permissions: ['notifications'],
				origins: ["https://"+URL_SERVICE_WBHS+"/*", "https://www."+URL_SERVICE_WBHS+"/*"],
			}, 
			(granted) => 
			{
				if (granted === false) 
				{
					console.log(granted);
					var params = new URLSearchParams({
						url: tab.url,
						permissions:'["notifications"]',
					});
					
					chrome.tabs.update(tabId, { url: chrome.runtime.getURL("permissions.html?"+params.toString()) });
				}
			}
		);
	}
});

//Listener for the installation event
//show the user a completion message and specify xorkee handle is also required
if(USERAGENT.extType != EXTTYPE_OEM)	//hide the information for OEM installations
{
	chrome.runtime.onInstalled.addListener(function (object) {
		if(object.reason === chrome.runtime.OnInstalledReason.INSTALL)
		{
			chrome.tabs.create({ url: URL_POSTINSTALL }, function (tab) {
				console.log("New tab launched after installation");
			});
			
			/*
				In some portals, we are identifying the signer certificate information like PAN or certificate details while logging in to the portal 
				If the user installed the extension after logged-In to the portal, extension can't identify the signer in this case
				So on installation we loop through all the tabs and if the used has opened the supported URL's, we display the popup stating the user needs to logout and login if it is in the logged-In session
			*/
			
			chrome.tabs.query({},function(tabs){     

				tabs.forEach(function(tab){

					// console.log(tab.url);

					if(BGUTILS.getServiceName(tab.url) != SERVICENAME_UNKNOWN)
					{
						console.log("reload page script attached");
						chrome.scripting.insertCSS({target : {tabId : tab.id},files : ["/contentscript/xsg2cpopup.css"]})
						.then((rv) => { 

							console.log(rv);
							chrome.scripting.executeScript({target : {tabId : tab.id}, files : ["/contentscript/xsg2cpopup.js", "/contentscript/onInstallInfo.js"]})
							.then((rv) => console.log(rv))
							.catch(e => {console.log(e)});
						})
						.catch(e => {console.log(e)});
					}
				});
			});
		}
	});
}

// For MCA V3 and DGFT portal, All the scripts will be registered to attach in content script in webpage context.
BGUTILS.registerEMBContentScripts(URL_SERVICE_MCA_V3);
BGUTILS.registerEMBContentScripts(URL_SERVICE_DGFT);
BGUTILS.registerMahaItContentScripts();
BGUTILS.assignDownloadsApiEvent();
BGUTILS.registerSHCILContentScripts();
BGUTILS.registerTDSContentScripts();
BGUTILS.registerOldIcegateContentScripts();
BGUTILS.registerNewIcegateContentScripts();
BGUTILS.registerIrcepContentScripts();
BGUTILS.registerWbhsContentScripts();

// test
// This will enable devtools in MCA V3 portal
/* chrome.declarativeNetRequest.updateDynamicRules(
   {addRules:[{
		"id" : 9,
		"priority": 1,
		"action" : {
		  "type" : "block"
		},
		"condition" : {
		  "urlFilter" : "npm/disable-devtool",
		  "resourceTypes" : ["script"]
		}
	  }
	 ],
	 removeRuleIds: [9]
   },function(){
	   console.log("Disabled devtools");
   }
); */

