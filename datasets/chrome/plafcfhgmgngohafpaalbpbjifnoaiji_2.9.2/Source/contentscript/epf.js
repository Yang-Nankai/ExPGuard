console.log('xorkeesign EPF script injected.');

const EPF_JAVA_REGISTER_CLASS = "com.epfo.establishment.applet.dsig.register.WindowsTokenCertRegistrationApplet.class";
const EPF_JAVA_PDFSIGNATURE_CLASS = "com.epfo.establishment.applet.dsig.sign.PdfSignerApplet.class";

const URL_HOMEPAGE = "/epfo/home?_HDIV_STATE_=";
const URL_USERINFO = "/epfo/userController/userinfo?_HDIV_STATE_=";
const URL_REGISTERDS = "/epfo/digitalSignature/registerDigitalSignatureForm?_HDIV_STATE_=";
const URL_SIGNATORYSEARCH = "/epfo/digitalSignature/signatorySearchPage?_HDIV_STATE_=";
const URL_SIGNATORYRESULT = "/epfo/digitalSignature/getSignatoryResults?statusId=-1&_HDIV_STATE_=";

const REQNO_HOMEPAGE = "7";
//const REQNO_USERINFO = "61";
const REQNO_USERINFO = "59";
const REQNO_REGISTERDS = "27";
const REQNO_SIGNATORYSEARCH = "59";
const REQNO_SIGNATORYRESULT = "60";

const REQ_HOMEPAGE = "/epfo/home?";
const REQ_USERINFO = "/epfo/userController/userinfo?";
const REQ_REGISTERDS = "/epfo/digitalSignature/registerDigitalSignatureForm?";
const REQ_SIGNATORYSEARCH = "/epfo/digitalSignature/signatorySearchPage?";
const REQ_SIGNATORYRESULT = "/epfo/digitalSignature/getSignatoryResults?statusId=-1&";

const ERRMSG_EPFRESPONSE = "The EPF portal did not respond as expected. Please try after some time.";
const ERRMSG_NOSIGNERS = "No active signatory available for the establishment.<br><br>You should get a new DSC (if not already done) for a signatory of this establishment and update it in xorkee.<br>After updating the DSC in xorkee, you can register the DSC in the EPFO portal.";

var EPF_PDF_PROFILE = {"Version":2,"isdemo":false,"BoxDimensions":{"width":250,"height":150},"BoxPosition":{"x":300,"y":35},"Page":0,"Stream":"","Fonts":[{"Name":"font1$","FontName":"Helvetica"}]};

var EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji";

var js = document.createElement('script');
js.src = chrome.runtime.getURL('contentscript/epf-override.js');
(document.head||document.documentElement).appendChild(js);

function getSessionIdFromDom()
{
	var anchorTagArr = [], i, anchorHref, sessionStr, sessionIdArr,nonce,sessionId;
	
	anchorTagArr = document.getElementsByTagName('a');
	for(i=0; i<anchorTagArr.length; i++)
	{
		anchorHref = anchorTagArr[i].getAttribute("href");
		if(anchorHref != undefined && anchorHref.indexOf('?') != -1)
		{
			params = new URLSearchParams("?"+anchorHref.split('?')[1]);
			if(params && params.get("_HDIV_STATE_")!=undefined)
			{
				sessionStr = params.get("_HDIV_STATE_");
				if(sessionStr != undefined)
				{
					sessionIdArr = sessionStr.split('-');
					if(sessionIdArr.length == 3)
					{
						nonce = sessionIdArr[0];
						sessionId = sessionIdArr[2];
						break;
					}	
				}
			}
		}
	}
	
	return [nonce, sessionId];
}

/* function getSessionIdFromStr(payload)
{
	var nonce = "", sessionId = "" , i, reqSpiltIndex, str, hyphenCont = 0;
	const _reqSpilt = "_HDIV_STATE_=";
	
	reqSpiltIndex = payload.indexOf(_reqSpilt)+_reqSpilt.length;
	
	for(i=reqSpiltIndex; i<(reqSpiltIndex+64); i++)
	{
		str = payload.charAt(i);
		if(str == "-") hyphenCont++;
		
		if(hyphenCont == 0) nonce += str;
		
		if(hyphenCont == 2 && str != "-")
		{
			sessionId = payload.substring(i,i+32);
			break;
		}
	}
	return [nonce, sessionId];
}
 */
 
function getSessionIdFromStr(payload, searchStr)
{
	var nonce = "", sessionId = "" , i, reqSpiltIndex, str, hyphenCont = 0, reqId = "";
	const _reqSpilt = searchStr+"_HDIV_STATE_=";
	
	reqSpiltIndex = payload.indexOf(_reqSpilt)+_reqSpilt.length;
	
	for(i=reqSpiltIndex; i<(reqSpiltIndex+64); i++)
	{
		str = payload.charAt(i);
		if(str == "-") hyphenCont++;
		
		if(hyphenCont == 0) nonce += str;
		
		if(hyphenCont == 1 && str != "-") reqId += str;
		
		if(hyphenCont == 2 && str != "-")
		{
			sessionId = payload.substring(i,i+32);
			break;
		}
	}
	return [nonce, reqId, sessionId];
}
 
 
function getEPFPayload(url, nonce, reqNo, sessionId, reqSearchStr, successCb, errorCb)
{
	var reqPayload, contentType, reqURL, respNonce, respSessionId, currentEpochTime, resp, method, respReqId;
	
	if(url.indexOf(URL_HOMEPAGE) != -1)
	{
		method = "GET";
		reqPayload = JSON.stringify({});
		contentType = "application/json";
	}
	else if(url.indexOf(URL_USERINFO) != -1)
	{
		method = "POST";
		reqPayload = JSON.stringify({});
		contentType = "application/json";
	}
	else if(url.indexOf(URL_REGISTERDS) != -1)
	{
		method = "GET";
		reqPayload = JSON.stringify({});
		contentType = "application/json";
	}
	else if(url.indexOf(URL_SIGNATORYSEARCH) != -1)
	{
		method = "GET";
		reqPayload = JSON.stringify({});
		contentType = "application/json";
	}
	else if(url.indexOf(URL_SIGNATORYRESULT) != -1)
	{
		method = "POST";
		currentEpochTime = Date.now();
		reqPayload = "_search=false&nd="+currentEpochTime+"&rows=10&page=1&sidx=&sord=desc";
		contentType = "application/x-www-form-urlencoded; charset=UTF-8";
	}
		
	reqURL = url+nonce+"-"+reqNo+"-"+sessionId;
	
	CSUTILS._otlSendRequest(method, contentType,reqURL, reqPayload, "text", function(status, resp) 
	{
		if(status == 200)
		{
			// console.log(resp);
			if(url.indexOf(URL_USERINFO) == -1 && url.indexOf(URL_SIGNATORYRESULT) == -1)
			{
				[respNonce, respReqId, respSessionId] = getSessionIdFromStr(resp, reqSearchStr);	
				if(successCb) successCb(respNonce, respReqId, respSessionId, resp, reqURL);
			}
			else
			{
				try { 
					resp = JSON.parse(resp);
					if(successCb) successCb(resp);
				} 
				catch(e) {
					console.log('xorkeesign G2C - JSON parse Error');
					console.log(e);
					if(errorCb) errorCb();
				}
			}
		}
		else 
		{
			console.log('xorkeesign G2C - Failed to get EPF info | '+status);
			if(errorCb) errorCb();
		}
	});
}

function getSigners(nonce, reqId, sessionId, scb, ecb)
{
	getEPFPayload(URL_REGISTERDS, nonce, reqId, sessionId, REQ_SIGNATORYSEARCH, function(nonce, reqId, sessionId){
		
		getEPFPayload(URL_SIGNATORYSEARCH, nonce, reqId, sessionId, REQ_SIGNATORYRESULT, function(nonce1, reqId1, sessionId1, signatorySearchPage){
			
			getEPFPayload(URL_SIGNATORYRESULT, nonce1, reqId1, sessionId1, undefined, function(resp){
				
				[nonce1, reqId1, sessionId1] = getSessionIdFromStr(signatorySearchPage, REQ_HOMEPAGE);
				//only the last 2 arguments are used; preserved others to avoid impact at other places in code
				if(scb) scb(nonce1, reqId1, sessionId1, resp, URL_HOMEPAGE+nonce1+"-"+reqId1+"-"+sessionId1);
				/*getEPFPayload(URL_HOMEPAGE, nonce1, reqId1, sessionId1, REQ_HOMEPAGE, function(nonce2, reqId2, sessionId2, pageResp, homeUrl){
					
					if(scb) scb(nonce2, reqId2, sessionId2, resp, homeUrl);
				}, ecb);*/
				
			}, ecb);
			
		}, ecb);
		
	}, ecb);
}

function getEPFSignatories(userInfo, scb, ecb)
{
	var [nonce, reqId, sessionId] = getSessionIdFromStr(document.body.innerHTML, REQ_REGISTERDS);
	getSigners(nonce, reqId, sessionId, function(newnonce, newReqId, newsessionId, signersResp, homeUrl){
	 
		if(scb) scb(newnonce, newsessionId, userInfo, signersResp, homeUrl);
	}, ecb);
}

function getEPFInfo(scb, ecb)
{
	var [nonce, reqId, sessionId] = getSessionIdFromStr(document.body.innerHTML, REQ_USERINFO);
	getEPFPayload(URL_USERINFO, nonce, reqId, sessionId, undefined, function(userInfo){
		
		getEPFSignatories(userInfo, scb, ecb);
	}, 
	function(){
		
		console.log("Unable to get userInfo from EPFO portal");
		getEPFSignatories(undefined, scb, ecb);
	});
}

function _epfRegisterDSCSign(handle, param, freePlan){
	
	xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
			
	msg = {};
	msg.xsSignerInfo = {handle:handle};
	msg.otlType = G2C_MSG.REG_DSC;
	
	msg.params = {};
	msg.params.freePlan = freePlan;
	
	chrome.runtime.sendMessage(
		msg,
		function(payload){
			
			// console.log(payload);
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_EPF);
			
			payload.nameAsPerCeritificate = param.nameAsPerCeritificate;
			
			CSUTILS.promptListener(payload, function(userAction) {
				
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
						2. User not reachable(Signature request and freePlan request)
					*/
					freePlan = (freePlan == true)?true:userAction.freePlan;
					_epfRegisterDSCSign(handle, param, freePlan);
				}
				else
				{
					if(payload.result == 0)
					{
						if(payload.subjectCommonName == undefined || (payload.subjectCommonName.toLowerCase() != param.nameAsPerCeritificate.toLowerCase()))
						{
							if(payload.subjectCommonName == undefined) msg = "The name of the authorized signatory doesn't match the name in the DSC.";
							else msg = "The name in the DSC '"+payload.subjectCommonName+"' doesn't match the name '"+param.nameAsPerCeritificate+"' you entered as the authorized signatory.";
							//else msg = "The name in the DSC '"+req.subjectCommonName+"' doesn't match the name of the authorized signatory.";
							xsg2cpopup.showError(msg, function() {
								window.location.href = param.redirectUrl;
							});
						}
						else
						{
							emptyab = new ArrayBuffer();
							
							//set the user certificate and public key
							xsepfSetCertificate(XSCUTILS._base64ToArrayBuffer(payload.certificate), XSCUTILS._base64ToArrayBuffer(payload.pubKey));
							//set the CA certificates (this is not required)
							if(payload.certChain != undefined)
							{
								//Root CA will be received in the last item
								for(i=0; i<payload.certChain.length; i++)
								{
									xsepfSetCertificate(XSCUTILS._base64ToArrayBuffer(payload.certChain[i]), emptyab);	//public key not required for CA
								}
							}
							
							regpayload = xsepfFrameRegPayload(param.nameAsPerCeritificate, param.designation, param.mobileNumber);
							_xsepfRegReset();
							//downloadDoc(XSCUTILS._arrayBufferToBase64(payload));
							
							xsg2cpopup.showLoader("Waiting for the status of registration from the EPF portal ...");
							CSUTILS._otlSendRequest("POST", "application/x-java-serialized-object", param.destUrl, regpayload, "arraybuffer", function(status, response){
								
								console.log(response);
								//the response will be a String serialized as Java object; extract the same accordingly
								if(status == 200) response = xsjosGetString(response,null);
								else response = ERRMSG_EPFRESPONSE;
								xsg2cpopup.showInfo(response, function() {
									window.location.href = param.redirectUrl;
								});
							});
						}
					}
				}
			});
		}
	);
}

function _epfRegisterDSC(container, param){
	
	var i, msg, regpayload, emptyab;
	
	console.log(param);
	xsg2cpopup.getHandle(container, param.nameAsPerCeritificate, function(doreg, handle){
		if(doreg == true) 
		{
			_epfRegisterDSCSign(handle, param, false);
		}
		else window.location.href = param.redirectUrl;
	});
}

function _epfGetPDF(param, signer)
{
	var i, payload, errstr, datestr, pdfSigPos = [];
	var emptyab = new ArrayBuffer();
		
	//set user certificate
	xsepfSetCertificate(XSCUTILS._base64ToArrayBuffer(signer.info.certificateData), XSCUTILS._base64ToArrayBuffer(signer.info.pubKey));
	if(signer.info.certChain != undefined)
	{
		for(i=0; i<signer.info.certChain.length; i++)
		{
			xsepfSetCertificate(XSCUTILS._base64ToArrayBuffer(signer.info.certChain[i]), emptyab);	//public key not required for CA
		}
	}
	
	//frame the payload to get the PDF to be signed
	payload = xsepfFrameGetPDFPayload(param.pdfKey);
	_xsepfRegReset();
	xsg2cpopup.showLoader("Waiting for the EPFO portal to respond with the data to be signed ...");
	
	CSUTILS._otlSendRequest("POST", "application/x-java-serialized-object", param.sourceUrl, payload, "arraybuffer", function(status, javaso){
		
		if(status == 200)
		{
			console.log(javaso);
			var sourcePdf = xsjosGetBytes(javaso, "fileInputStreamByteArray");
			if(sourcePdf != null)
			{
				//downloadDoc(XSCUTILS._arrayBufferToBase64(sourcePdf));
				//console.log(sourcePdf);
				
				/*
				* To frame the PDF signature objects we need to dynamically create and set the appearance
				* stream with the subject common name and the server time.
				* Use 'CM_PDFAppendSigObjects' interface to create signature objects in a different
				* revision or 'CM_PDFAppendEPFSigObjects' to create the objects in the same revision.
				*/
				//CM_PDFAppendEPFSigObjects(sourcePdf, signer.handle, signer.info.subjectCommonName, signer.time, signer.info.sigSize * 2
				date = new Date(signer.time * 1000);
				datestr = date.getFullYear()+"."+(date.getMonth()+1).toString().padStart(2,'0')+"."+(date.getDate()).toString().padStart(2,'0')+" "+(date.getHours()).toString().padStart(2,'0')+":"+(date.getMinutes()).toString().padStart(2,'0')+":"+(date.getSeconds()).toString().padStart(2,'0')+" IST";
				EPF_PDF_PROFILE.Stream = btoa("BT\n0 0 0 rg\n/font1$ 8.0000 Tf\n1 0 0 1 10 100 Tm (Digitally signed by "+signer.info.subjectCommonName+") Tj\n1 0 0 1 10 90 Tm (Date: "+datestr+") Tj\nET");
				// console.log(datestr);
				
				CM_PDFSetProfileV2(EPF_PDF_PROFILE);
				CM_PDFMaxSignatureSize(signer.info.sigSize * 2);	//get the signature allocation size from xorkeesign (* 2 for HEX)
				CM_PDFAppendSigObjects(sourcePdf, null, "sha1", signer.handle, true, null, true, signer.info.sigSize * 2, function(pdf, digest, sigpos) {
					
					pdfSigPos = [sigpos, (signer.info.sigSize * 2)];
					_epfSignPDF(param, pdf, XSCUTILS._arrayBufferToBase64(digest), pdfSigPos, signer, false);
				}, function(msg) {
				
					console.log("ERROR creating signature objects | "+msg);
					xsg2cpopup.showError(ERROR_INVALIDPDF, function() {
						window.location.href = param.redirectUrl;
					});
				});
			}
			else
			{
				errstr = xsjosGetString(javaso, "message");
				if(errstr == null) errstr = ERRMSG_EPFRESPONSE;
				xsg2cpopup.showError(errstr, function() {
					window.location.href = param.redirectUrl;
				});
			}
		}
		else
		{
			console.log("Failed to get the PDF to be signed from the EPF portal | "+status);
			xsg2cpopup.showError(ERRMSG_EPFRESPONSE, function() {
				window.location.href = param.redirectUrl;
			});
		}
	});
}

function prepareToSign(param, index, signatories)
{
	if(signatories[index].result == 0)
	{
		_epfGetPDF(param, signatories[index]);
	}
	else if(signatories[index].result != 0)
	{
		CSUTILS.promptListener(signatories[index], function(msg){
			
			//user attempts to register the DSC of the selected signatory in xorkee
			//query xorkeesign again to load the details of the signatory
			// _xsSendMessage(XS_MSG_EPF_GET_SIGNERINFO, signer.signatoryName);
			if(msg.retry == true) _epfPDFSignature(param, index);
			else
			{
				//TODO: list signers recursively when more than one signatory is mapped in the portal
				window.location.href = param.redirectUrl;
			}
		});
	}
}

function _epfPDFSignature(param, selectedSignerIndex){
	
	xsg2cpopup.showLoader("Checking the status of authorized signatories ...");
	
	var msg = {};
	msg.otlType = G2C_MSG.GET_SIGNATORIES;
	if(selectedSignerIndex != undefined ) msg.selectedSignerIndex = selectedSignerIndex;
	
	chrome.runtime.sendMessage(
		msg,
		function(response){
			
			console.log(response);
			if(response == undefined) response = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_EPF);
			
			if(response.signatories != undefined)
			{
				if(response.signatories.length == 0)
				{
					xsg2cpopup.showError(ERRMSG_NOSIGNERS, function() {
						window.location.href = param.redirectUrl;
					});
				}
				else if(response.signatories.length == 1)
				{
					//proceed to sign whenever there is only one signatory
					prepareToSign(param, 0, response.signatories);
				}
				else
				{
					if(response.selectedSignerIndex >= 0)
					{
						//for cases where the user attempts to use xorkee without registering the DSC
						//we will preserve the previous selection of the signer and proceed with signing
						//directly without prompting the user again
						prepareToSign(param, response.selectedSignerIndex, response.signatories);
					}
					else
					{
						//present the user will all the available signatory and ask to choose one
						xsg2cpopup.listSigners(response.signatories, function(index){
							if(index >= 0) prepareToSign(param, index, response.signatories);
							else window.location.href = param.redirectUrl;
						});
					}
				}
			}
			else
			{
				xsg2cpopup.showError(response.errorString, function() {
					window.location.href = param.redirectUrl;
				});
			}
		}
	);
}

function _epfSignPDF(param, pdfbuf, digest, pdfSigPos, signer, freePlan)
{
	var url = param.destUrl, plhead, plfoot, payload, resstatus, msg, i, ab;
	
	msg = {};
	msg.otlType = G2C_MSG.GET_SIGNATURE;
	msg.tbs = digest;
	msg.xsSignerInfo = signer;
	
	msg.params = {};
	msg.params.freePlan = freePlan;
	
	xsg2cpopup.showLoader("Waiting for signature ...");
	
	chrome.runtime.sendMessage(
		msg,
		function(payload){
			
			console.log(payload);
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_EPF);
			
			CSUTILS.promptListener(payload, function(userAction) {
				
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
						2. User not reachable(Signature request and freePlan request)
					*/
					freePlan = (freePlan == true)?true:userAction.freePlan;
					_epfSignPDF(param, pdfbuf, digest, pdfSigPos, signer, freePlan)
				}
				else
				{
					if(payload.result == 0)
					{
						if(payload.signature == null)
						{
							console.log("User canceled the request to perform signature");
							window.location.href = param.redirectUrl;
							return;
						}
						
						CM_PDFEmbedSig(pdfbuf, XSCUTILS._base64ToArrayBuffer(payload.signature), pdfSigPos[0], function(pdf) {
							
							if(url == undefined)
							{
								console.log("EPF portal did not respond with the destination URL");
								xsg2cpopup.showError(ERRMSG_EPFRESPONSE, function() {
									window.location.href = param.redirectUrl;
								});
								return;
							}
							
							xsg2cpopup.showLoader("Waiting for the EPF portal to accept the signature ...");
							plhead = '--*****\r\nContent-Disposition: form-data; name="pdf";filename="'+param.pdfKey+'.pdf"\r\n\r\n';
							plfoot = '\r\n--*****--\r\n';
							ab = new ArrayBuffer(plhead.length+plfoot.length+pdf.byteLength);
							payload = new Uint8Array(ab);
							
							for(i=0; i<plhead.length; i++) payload[i] = plhead.charCodeAt(i);
							for(i=0; i<pdf.byteLength; i++) payload[plhead.length+i] = pdf[i];
							for(i=0; i<plfoot.length; i++) payload[plhead.length+pdf.byteLength+i] = plfoot.charCodeAt(i);
							//downloadDoc(XSCUTILS._arrayBufferToBase64(pdf));
							//return;
							
							CSUTILS._otlSendRequest("POST", "multipart/form-data;boundary=*****", url, payload, "arraybuffer", function(status, javaso) {
								if(status == 200)
								{
									console.log(javaso);
									resstatus = xsjosGetString(javaso, "status");
									msg = xsjosGetString(javaso, "msg");
									if(msg == null) msg = ERRMSG_EPFRESPONSE;
									xsg2cpopup.showInfo(msg, function() {
										window.location.href = param.redirectUrl;
									});
								}
								else
								{
									console.log("EPF portal | Submit signed PDF | Failure status : "+status);
									xsg2cpopup.showError(ERRMSG_EPFRESPONSE, function() {
										window.location.href = param.failuteUrl?param.failuteUrl:param.redirectUrl;
									});
								}
							});
					
						}, function(msg) {
						
							console.log("ERROR embedding signatures | "+msg);
							xsg2cpopup.showError(ERROR_INVALIDPDF, function() {
								window.location.href = EPF_APPLET_PARAMS.redirectUrl;
							});
							
						});
					}
					else
					{
						window.location.href = EPF_APPLET_PARAMS.redirectUrl;
					}
				}
			});
		}
	);
}		

function appletGetParams(elem)
{
	var obj = {};
	paramElemArr = elem.getElementsByTagName('param');
	for(var i = 0 ; i < paramElemArr.length; i++)
	{
		obj[paramElemArr[i].getAttribute('name')] = paramElemArr[i].getAttribute('value');
	}
	return obj;
}

function replaceAppletContainer(applet)
{
	var con = document.createElement("div");
	con.style.width = applet.getAttribute('width');
	con.style.height = applet.getAttribute('height')
	con.style.overflow = "auto";
	applet.parentElement.insertBefore(con, applet);
	applet.parentElement.removeChild(applet);
	return con;
}

function doAppletAction(appletTagArr)
{
	var applet,javaClassType, sourcePdf, container;
	
	for(var i=0; i<appletTagArr.length; i++)
	{
		applet = appletTagArr[i];
		javaClassType = applet.getAttribute('code');
		
		EPF_APPLET_PARAMS = appletGetParams(applet);
		//EPF_APPLET_PARAMS.destUrl = "https://192.168.1.238/epfo/dest.bin";	//test
		console.log("Applet Type: "+javaClassType);
		console.log("Applet Params");
		console.log(EPF_APPLET_PARAMS);
		
		if(javaClassType == EPF_JAVA_REGISTER_CLASS)
		{
			container = replaceAppletContainer(applet);
			
			_epfRegisterDSC(container, EPF_APPLET_PARAMS);
		}
		else if(javaClassType == EPF_JAVA_PDFSIGNATURE_CLASS)
		{
			EPF_APPLET_PARAMS.redirectUrl = EPF_APPLET_PARAMS.successUrl?EPF_APPLET_PARAMS.successUrl:EPF_APPLET_PARAMS.redirectUrl;
			if(EPF_APPLET_PARAMS.redirectUrl == undefined) EPF_APPLET_PARAMS.redirectUrl = "/epfo/";
			
			container = replaceAppletContainer(applet);
			_epfPDFSignature(EPF_APPLET_PARAMS);
			return true;
		}
		else
		{
			console.log("xorkeesign G2C - unknown java class : "+javaClassType);
			replaceAppletContainer(applet);
			xsg2cpopup.showError(FACILITY_UNSUPPORTED, function() {
				
				if(EPF_APPLET_PARAMS.redirectUrl != undefined) window.location.href = EPF_APPLET_PARAMS.redirectUrl;
			});
		}
	}
	return false;
}


/*
* This is where it all starts.
* We search for APPLET tags onload which when available we take it for processing.
* If not, the registered MutationObserver will watch for dynamic APPLET
* insertion into DOM.
* Either way, once the APPLET is loaded the corresponding functionality
* is implemented in Javascript which will take over and complete the action.
*/
if(doAppletAction(document.getElementsByTagName('applet')) == false)
{
	const observer = new MutationObserver(function(mutationsList, obs) {
		
		doAppletAction(document.getElementsByTagName('applet'));
	});
	if(document.body) observer.observe(document.body, { subtree: true, childList: true});
}
