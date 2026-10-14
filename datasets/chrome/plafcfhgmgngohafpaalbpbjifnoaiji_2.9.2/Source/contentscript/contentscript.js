console.log("xorkeesign India G2C content script attached");

try { 
	document.documentElement.setAttribute("xsG2C-id",chrome.runtime.id);
	document.documentElement.setAttribute("xsG2C-imagesDir",chrome.runtime.getURL('images/'));
	document.documentElement.setAttribute("xsG2C-version",chrome.runtime.getManifest().version);
} catch(e) {
	console.log(e);
	document.documentElement.setAttribute("xsG2C-id","plafcfhgmgngohafpaalbpbjifnoaiji");
	document.documentElement.setAttribute("xsG2C-imagesDir","chrome-extension://plafcfhgmgngohafpaalbpbjifnoaiji/images/");
}
console.log(document.documentElement.getAttribute("xsG2C-id"), document.documentElement.getAttribute("xsG2C-imagesDir"));

var font = document.createElement('style');
font.type = 'text/css';
font.textContent = `@font-face { font-family: opensans-regular; src: url('${chrome.runtime.getURL('/font/OpenSans-Regular.ttf')}');}`;
(document.head||document.documentElement).appendChild(font);

var font2 = document.createElement('style');
font2.type = 'text/css';
font2.textContent = `@font-face { font-family: opensans-bold; src: url('${chrome.runtime.getURL('/font/OpenSans-Bold.ttf')}');}`;
(document.head||document.documentElement).appendChild(font2);

var font3 = document.createElement('style');
font3.type = 'text/css';
font3.textContent = `@font-face { font-family: opensans-italic; src: url('${chrome.runtime.getURL('/font/OpenSans-Italic.ttf')}');}`;
(document.head||document.documentElement).appendChild(font3);

if(window.location.href == LANDING_PAGE.EPF)
{
	var epfoDomInterval = setInterval(function(){

		if(document.body !== null)
		{
			try {
				if(document.body.innerHTML.indexOf("/epfo/logout") != -1)
				{
					clearInterval(epfoDomInterval);
					xsg2cpopup.showLoader("Identifying the authorized signatories for the establishment ...");
				}
				else 
				{
					clearInterval(epfoDomInterval);
					CSUTILS.extGetMessage();
				}
			} catch (e) {}
		}
	}, 50);
}
else if(Object.values(LANDING_PAGE).indexOf(window.location.href) > -1)
{
	//  If there is any message from xorkeesign regarding their service access, it will be displayed in a popup in all supporting portal's landing/login page
	
	// This message will be displayed onces until the tab or browser is closed.
	
	CSUTILS.extGetMessage();
}

chrome.runtime.onMessage.addListener( 

	function(request, sender, sendResponse) {
		console.log(request);
		console.log(sender);
		console.log(sendResponse);
		
		var req = {}, response, elem, name;
		
		//YUK: raise alarms for connectivity failures, invalid JSON payload, missing keys, etc
		switch(request.type)
		{
			case G2C_MSG.GET_SIGNER:
			{
				if(request.service == SERVICENAME_ITR)
				{
					req.serviceName = "userProfileService";
					CSUTILS._otlSendRequest("POST", "application/json", "https://eportal.incometax.gov.in/iec/servicesapi/auth/saveEntity", JSON.stringify(req), undefined, function(status, resp) {
						if(status == 200)
						{
							try {
								response = JSON.parse(resp);
								sendResponse(CSUTILS.frameResponse(request.type, response));
							} catch(e) {
								console.log("Error returned from ITR portal");
								console.log(e);
							}
						}
						else console.log("ERROR: Unable to identify the signer : "+status);
					});
				}
				else if(request.service == SERVICENAME_GST)
				{
					CSUTILS._otlSendRequest("GET", "application/json", "https://services.gst.gov.in/services/api/ustatus", null, undefined, function(status, resp) {
						if(status == 200)
						{
							try {
								response = JSON.parse(resp);
								sendResponse(CSUTILS.frameResponse(request.type, response));
							} catch(e) {
								console.log("Error returned from GST portal");
								console.log(e);
							}
						}
						else console.log("ERROR: Unable to identify the signer : "+status);
					});
				}
				else if(request.service == SERVICENAME_TDS)
				{
					elem = document.getElementsByClassName("welcomeMenu");
					if(elem.length > 0)
					{
						elem = document.createNodeIterator(elem[0], NodeFilter.SHOW_TEXT);
						if(elem != undefined)
						{
							elem = elem.nextNode();
							if(elem != undefined)
							{
								str = elem.textContent;
								console.log(str);
								s = str.indexOf("Welcome");
								if(s != -1)
								{
									name = str.substring(s+7).trim();
									if(name.length > 0) sendResponse(CSUTILS.frameResponse(request.type, {"name":name}));
								}
							}
						}
					}
				}
				else if(request.service == SERVICENAME_EPF)
				{
					if(window.location.href == URL_SERVICE_EPF+"/epfo/")
					{
						if(document.getElementById("username") != null && document.getElementById("password") != null)
						{
							// Login page
							sendResponse(undefined);
							return;
						}
					}
					else if(window.location.href.toLowerCase() == URL_SERVICE_EPF_VERIFY_OTP)
					{
						if(document.getElementById("otpInput") != null)
						{
							// Login page
							sendResponse(undefined);
							return;
						}
					}
					
					// After login -> dashboard page
					xsg2cpopup.showLoader("Identifying the authorized signatories for the establishment ...");	
					getEPFInfo(function(nonce, sessionId, signerInfo, signatories, homeUrl){
						
						console.log("Extracted establishment info");
						console.log(signerInfo);
						console.log(signatories);
						
						//xsg2cpopup.removePopup();
						
						sendResponse(CSUTILS.frameResponse(request.type, signerInfo, signatories, nonce, sessionId, homeUrl));
					}, function() {
						
						// xorkeesign logger
						var extmsg = {};
						extmsg.type = G2C_MSG.SET_INFO;
						extmsg.action = "UnknownSigner";
						extmsg.message = "URL identifier modified";
						
						try
						{
							chrome.runtime.sendMessage(extmsg, function(){console.log("");});
						} 
						catch(e) {console.log(e)};
						
						xsg2cpopup.removePopup();
					});
				}
				else if(request.service == SERVICENAME_COO_DGFT)
				{
					COO_DGFT.signInit(request.params);
				}
				break;
			}
			case G2C_MSG.EPF_RELOAD_HOME:
			{
				document.head.click();
				if(request.homeUrl)
				{
					setTimeout(function() {
						window.location.href = request.homeUrl;
					}, 300);
					sendResponse();
				}
				break;
			}
			default:
			{
				CSUTILS.promptListener(request, function(msg) {
					sendResponse(msg);
				});
				break;
			}
		}
		return true;
	}
);