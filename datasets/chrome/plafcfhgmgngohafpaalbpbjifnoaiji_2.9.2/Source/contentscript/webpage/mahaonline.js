console.log("OTL-Mahaonline signing script attached");
var EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji";	//DEPLOY

const _XS_STORAGE = "xsSignerInfo";
const _XS_FORM_FIELDS = {
	"issuerDN": ["ctl00$CPH$txtIssuer", "Issuer"],
	"serialNo": ["ctl00$CPH$txtSerial", "Serial"],
	"certificate": ["ctl00$CPH$txtCert", "Certificate"],
	"signature": ["ctl00$CPH$rawSignature"]
};

const otlSignObj = {
	
	xsError: false,
	
	xsInit:false,
	
	xsSign:false,
	
	xsSignerMismatch:false,
	
	xsTbs:null,
						
	setLoggingEnabled: function(flag){
		
		otlSignObj.xsInit = true;
		return flag;
	},
	
	setPKCS11UI: function(){
		
		otlSignObj.xsInit = true;
		return true;
	},
	
	selectSigningCertificateFromUI: function(){
		
		otlSignObj.xsInit = true;
		return "unsupported";
	},
	
	getSelectedSignerCertDetails: function(flag){
		
		if(flag != 2 && flag !=3)
		{
			CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Java - getSelectedSignerCertDetails:"+flag);
			otlSignObj.xsError = true;
		}
		otlSignObj.xsInit = true;
		return "unsupported";
	},
	
	setPKCS7: function(flag){
		
		if(flag != false)
		{
			CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Java - setPKCS7:"+flag);
			otlSignObj.xsError = true;
		}
		otlSignObj.xsInit = true;
		return null;
	},
	
	setSigAlgorithm: function(algm){
		
		if(algm != "SHA256withRSA")
		{
			CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Java - setSigAlgorithm:"+algm);
			otlSignObj.xsError = true;
		}
		otlSignObj.xsInit = true;
		return true;
	},
	
	updateDataB64: function(tbs){
		
		otlSignObj.xsTbs = tbs;
		return true;
	},
	
	setSigningCertFromStore: function(issuerDN, serialNo){
		
		var xsSignerInfo = window.sessionStorage.getItem(_XS_STORAGE);
		if(xsSignerInfo != null)
		{
			xsSignerInfo = JSON.parse(xsSignerInfo);
			if(xsSignerInfo.serialNo.toLowerCase() != serialNo.toLowerCase())
			{
				otlSignObj.xsSignerMismatch = true;
				console.log("Signer mismatch", issuerDN, serialNo, xsSignerInfo.issuerDN, xsSignerInfo.serialNo);
			}
		}
		
		otlSignObj.xsInit = true;
		return true;
	},
	
	sign: function(){
		
		otlSignObj.xsInit = true;
		otlSignObj.xsSign = true;
		return "unsupported";
	},
	
	getErrorCode: function(){
		
		otlSignObj.xsInit = true;
		return -1;
	},
	
	getErrorMessage: function(){
		
		otlSignObj.xsInit = true;
		return "xorkeesign is yet to support signing in this web page";
	},
};

var proxyObj = new Proxy(otlSignObj, {
	get: function(target, key){
		
		if(!(key in Object.prototype) && typeof key == "string") // skiping other preDefined functions like toString, valueOf etc
		{
			if(typeof target[key] === "function")
			{
				// G2C supported functions
				return target[key];
			}
			else
			{
				console.log("Unsupported function - ",key);
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				
				return function(){
					//console.log(arguments);
					var msg = {};
					msg.fname = key;
					msg.fargs = arguments;
					msg = btoa(JSON.stringify(msg));
					console.log(msg);
					CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, msg);
				};
			}
		}
		
		return target[key];
	}
});

function _addEOL(cert)
{
	var certBuff = "";
	for(var i=0; i<cert.length; i+=64)
	{
		certBuff += cert.substring(i, i+64);
		if(i+64 < cert.length) certBuff += "\r\n";
	}
	return certBuff;
}

function _removeZero(serialNo)
{
	var sno = "";
	for(var i=0; i<serialNo.length; i++)
	{
		if(serialNo.charAt(i) != "0") break;
	}
	return serialNo.substring(i);
}

function _getSigner(handle, cb)
{
	xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
	
	var msg = {};
	msg.otltype = G2C_MSG.GET_SIGNER;
	msg.params = {handle:handle};
	
	chrome.runtime.sendMessage(
		EXTENSION_ID,
		msg,
		function(payload) {
			
			//console.log(resp);
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_MAHAIT);
			
			CSUTILS.promptListener(payload, function(userAction) {
		
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
					*/
					_getSigner(handle, cb);
				}
				else
				{
					if(payload.result == 0)
					{
						cb(payload);
					}
					// else error prompt will be handled in promptListener function.
				}
			});
		}
	);
}

function _getSignature(promptParams, xsSignerInfo, tbs, scb, ecb, sigType)
{
	var msg;
	
	xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
	
	msg = {};
	msg.otltype = G2C_MSG.GET_SIGNATURE;
	msg.xsSignerInfo = {handle:xsSignerInfo.handle, isEnrolled: xsSignerInfo.isEnrolled};
	msg.tbs = tbs;	
	msg.sigType = sigType;
	
	msg.params = promptParams;
	msg.params.host = window.location.host;
	
	chrome.runtime.sendMessage(
		EXTENSION_ID,
		msg,
		function(resp) {
				
			if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_MAHAIT);
			
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
					_getSignature(promptParams, xsSignerInfo, tbs, scb, ecb, sigType);
				}
				else
				{
					if(resp.result == 0) 
					{
						xsg2cStoreHandle(xsSignerInfo.handle);
						scb(resp);
					}
					else ecb(resp);
				}
			});
		}
	);
}

function _fillForm(xsconfig, form, key, value)
{
	var i, j;
	var config = (xsconfig!=undefined)?xsconfig:_XS_FORM_FIELDS;
	for(i=0; i<config[key].length; i++)
	{
		for(j=0; j<form.elements.length; j++)
		{
			if(form.elements[j].name == config[key][i])
			{
				form.elements[j].value = value;
				return true;
			}
		}
	}
	
	CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, `Form field not found ${key}`);
	return false;
}

function doObjectAction(appletTagArr)
{
	var applet, archive, javaClassType, MAHA_APPLET_PARAMS = undefined, i, j, forms, msg, extmsg, xsSignerInfo;
	
	for(i=0; i<appletTagArr.length; i++)
	{
		applet = appletTagArr[i];
		
		MAHA_APPLET_PARAMS = CSUTILS.objectGetParams(applet);
		MAHA_APPLET_PARAMS.appletName = applet.getAttribute('name');
		archive = MAHA_APPLET_PARAMS.archive = applet.getAttribute('archive');
		javaClassType = MAHA_APPLET_PARAMS.code = applet.getAttribute('code');
		
		if(javaClassType != undefined && javaClassType != null) javaClassType = javaClassType.toLowerCase();
		if(archive == null || archive == undefined) archive = "";
		else 
		{
			if(typeof archive == "string") archive = archive.toLowerCase();
			else 
			{
				archive = archive.map(val => {
				  return val.toLowerCase();
				}).join(' | ');
			}
		}
		
		console.log("Applet Type: "+javaClassType);
		console.log("Applet Params");
		console.log(MAHA_APPLET_PARAMS);
		document[MAHA_APPLET_PARAMS.appletName] = proxyObj;
		
		if(javaClassType == "jsignapplet.class" && archive.indexOf("signapplet.jar") != -1)
		{
			CSUTILS.replaceObjectContainer(applet);
			forms = document.getElementsByTagName("form");
			for(j=0; j<forms.length; j++)
			{
				(function(form) {
					
					form._formSubmit = form.submit;
					form.submit = function() {
						
						if(otlSignObj.xsError == true)
						{
							xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						}
						else if(otlSignObj.xsInit == false) 
						{
							console.log("Not the intended form; Original form submission triggered");
							form.submit = form._formSubmit;
							form.submit();
							return;
						}
						else if(otlSignObj.xsSign == false)
						{						
							xsg2cpopup.getSignerHandle("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled", function(flag, handle){
								
								if(flag == true) 
								{
									_getSigner(handle, function(resp){
									
										if(_fillForm(resp.formFieldConfig, form, "issuerDN", resp.info.issuerDN)
										&& _fillForm(resp.formFieldConfig, form, "serialNo", _removeZero(resp.info.serialNo))
										&& _fillForm(resp.formFieldConfig, form, "certificate", _addEOL(resp.info.certificate)))
										{
											window.sessionStorage.setItem(_XS_STORAGE, JSON.stringify({handle:resp.handle, serialNo:_removeZero(resp.info.serialNo), issuerDN:resp.info.issuerDN, isEnrolled: resp.isEnrolled}));
										
											form.submit = form._formSubmit;
											form.submit();
										}
										else xsg2cpopup.showError(FACILITY_UNSUPPORTED);
									});
								}
							}, true);
						}
						else if(otlSignObj.xsSign == true)
						{
							if(otlSignObj.xsSignerMismatch == true)
							{
								xsg2cpopup.showError(ERROR_PORTAL);
								// xsg2cpopup.showError(FACILITY_UNSUPPORTED);
								// CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Signer mismatch");
							}
							else 
							{
								xsSignerInfo = window.sessionStorage.getItem(_XS_STORAGE);
								if(xsSignerInfo != null)
								{
									xsSignerInfo = JSON.parse(xsSignerInfo);
									_getSignature({}, xsSignerInfo, otlSignObj.xsTbs, function(xsSignatureInfo){
										
										if(_fillForm(xsSignatureInfo.formFieldConfig, form, "signature", _addEOL(xsSignatureInfo.signature)))
										{
											form.submit = form._formSubmit;
											form.submit();
										}
										else xsg2cpopup.showError(FACILITY_UNSUPPORTED);
										
									}, function(){
										
										console.log("XS Signature aborted");
										/*form.submit = form._formSubmit;
										form.submit();*/
										//xsg2cpopup.showError("Signing cancelled. Go to the website and try to approve/sign again.");
									});
								}
							}
						}
					};
					
				}(forms[j]));
			}
		}
		else if(javaClassType == "com.pinelabs.appletpkg/billingapplet.class" && archive.indexOf("billingapplet.jar") != -1) {
			// skiping billingapplet jar file
			console.log("billingapplet.jar - skiped");
		}
		else
		{
			CSUTILS.replaceObjectContainer(applet);	//applet should be removed else the page will freeze
			console.log("xorkeesign G2C - unknown java class : "+javaClassType);
			xsg2cpopup.showError(FACILITY_UNSUPPORTED);
			
			MAHA_APPLET_PARAMS.xsDimension = [applet.getAttribute('width'), applet.getAttribute('height')];
			extmsg = btoa(JSON.stringify(MAHA_APPLET_PARAMS));
				
			CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, extmsg);
		}
	}
}

async function doFormAction(tags) {
	
	var i, action, _formOnSubmit, name, _form, _open, formdata, req, response, doc, scripts, urlparams, date, datestr, rv, digest, sigpos;
	
	var PDF_PROFILE;
	
	for(i=0; i<tags.length; i++) {
		
		_form = tags[i];
		action = _form.getAttribute("action");
		name = _form.getAttribute("name");
		
		if(action && action.toLowerCase().indexOf(("VerifyImportApplicationOSEntryAE.aspx").toLowerCase()) !== -1 && name === "form2") {
			
			// Print application button is modified here
			if(document.getElementById("WizardStock_TabContainer1_TabPanel2_btnPrint")) document.getElementById("WizardStock_TabContainer1_TabPanel2_btnPrint").value = "Sign and upload";
			
			// Preserve the native function before override
			_open = window.open;
			
			window.open = async (...args) => {
				
				if(args[0].indexOf("PDFDisplay") === -1) {
					_open(...args);
					return;
				}
				
				// window.open trap
				
				// Get the PDF buffer as arraybuffer from the returned URL
				var pdf = await fetch(args[0]).then(response => response.arrayBuffer());
				
				// Get the signer handle
				xsg2cpopup.getSignerHandle("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled", async (flag, handle) => {
										
					if(flag == true) 
					{
						_getSigner(handle, async (xsSignerInfo) => {
							
							// from xorkeesign sigSize is returned in binary format. PDF library accept the size in hex so it is multipled by 2.
							xsSignerInfo.info.sigSize = xsSignerInfo.info.sigSize * 2;
							
							// To set signature size
							CM_PDFMaxSignatureSize(xsSignerInfo.info.sigSize);
							
							// In the signature appearance, signing time form server is computed
							date = new Date(xsSignerInfo.time * 1000);
							datestr = date.getFullYear()+":"+(date.getMonth()+1).toString().padStart(2,'0')+":"+(date.getDate()).toString().padStart(2,'0');
							time = date.getHours().toString().padStart(2,'0')+":"+(date.getMinutes()).toString().padStart(2,'0')+":"+(date.getSeconds()).toString().padStart(2,'0')+" IST";

							// Signature appearance V3 profile
							PDF_PROFILE = {"isDemo": false,"version": 3,"preserveOrder": false,"docProfile":[{"resources": {"fonts": [{"name": "font1$","fontName": "Helvetica"}],"appearances": [{"name": "initial","stream": btoa("BT 0 0 0 rg\n/font1$ 7.0000 Tf\n1 0 0 1 3 40 Tm (Digitally signed by) Tj\n1 0 0 1 3 30 Tm ("+xsSignerInfo.info.subjectCommonName+") Tj\n1 0 0 1 3 20 Tm (Date: "+datestr+") Tj\n1 0 0 1 3 10 Tm ("+time+") Tj\nET"),"dimension": {"width": 72,"height": 48}}]},"positions": [{"initial": [{"statusIndicator": true,"position": [-167.5569,205.0463],"rotation": 0,"pageNum": [0]}]}]}]};
							
							//72, 20 - position
							
							// To get SHA2 PDF digest. 
							[rv, pdf, digest, sigpos] = CM_PDFSignV3(PDF_PROFILE, pdf, null, "sha2", xsSignerInfo.handle, null);	
							
							if(rv === 0)
							{
								console.log(XSCUTILS._arrayBufferToBase64(digest));
								xsg2cpopup.showLoader("Waiting for signature ...");
								
								// Get sha2 pkcs7 signature from xorkeesign
								_getSignature({}, xsSignerInfo, XSCUTILS._arrayBufferToBase64(digest), async (xsSignatureInfo) => {
									
									CM_PDFEmbedSig(pdf, XSCUTILS._base64ToArrayBuffer(xsSignatureInfo.signature), sigpos, async (pdf) => {
										
										/*
											* The preserved form is submitted and a Upload Signed Application page url is returned from the portal
											* Using the URL, a GET request is sent to the portal
											* Upload signed application HTML page will be returned as response
											* Get the form action url and the public key token from the attached script from the HTML page
											* Submit the form with the signed PDF file
										*/
										formdata = new FormData(_form);
										// mandatory form field
										formdata.append("WizardStock$TabContainer1$TabPanel2$btnUploadDoc", "Upload Signed Application");
										
										req = new URLSearchParams(formdata).toString();
										
										try {
											
											response = await fetch(_form.action, {
												method: 'POST',
												body: req, 
												"headers": {
													"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
													"x-microsoftajax": "Delta=true",
												  },
											});

											if (response.ok) {
												
												// Upload Signed Application URL is return
												data = await response.text();
												
												// split and get the URL
												url = data.split("|");
												url = url[url.length-2];
												
												response = await fetch(url, {
													method: 'GET'
												});
												
												if (response.ok) {
													
													// Upload Signed Application HTML page is returned here
													data = await response.text();
													
													try {
														// To get the form details from the string
														doc = new DOMParser().parseFromString(data, "text/html");
													}
													catch(e) {
														console.log(e);
														xsg2cpopup.showError(FACILITY_UNSUPPORTED);
														CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "DOM parse failed");
														return;
													}
													
													if(doc && doc.body)
													{
														_form = doc.body.querySelector("#form2");
														if(_form) {
															
															formdata = new FormData(_form);
															
															// To get the public key token from the attached script
															scripts = doc.body.getElementsByTagName("script");
															for(i=0; i<scripts.length; i++) {
																
																if(scripts[i].src.indexOf("_TSM_HiddenField_") !== -1) {
																	
																	// public key token
																	urlparams = new URLSearchParams(scripts[i].src);
																	formdata.set("ScriptManager2_HiddenField", urlparams.get("_TSM_CombinedScripts_"));
																	break;
																}
															}
															
															console.log(XSCUTILS._arrayBufferToBase64(pdf));
															
															formdata.set("__EVENTTARGET", "btnUploadFile");
															formdata.set("FileUploadDoc", new Blob([pdf], { type: "application/pdf" }), "form_signed.pdf"); // TODO: file name
															
															response = await fetch(_form.action, {
																method: 'POST',
																body: formdata, 
															});
															
															if (response.ok) {
												
																data = await response.text();
																//TODO: error case
																console.log("PDF Uploaded");
																xsg2cpopup.showInfo("PDF signed and uploaded successfully");
															}
														}
														else {
															console.log("Form not found", url);
															xsg2cpopup.showError(FACILITY_UNSUPPORTED);
															CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Form not found");
														}
													}
													else {
														console.log("Invalid response");
														xsg2cpopup.showError(FACILITY_UNSUPPORTED);
														CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Failed - 2");
													}
												}
												else {
													console.error('Error:', response.status, response.statusText);
													xsg2cpopup.showError(FACILITY_UNSUPPORTED);
													CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Failed - 1");
												}	
											} 
											else {
												console.error('Error:', response.status, response.statusText);
												xsg2cpopup.showError(FACILITY_UNSUPPORTED);
												CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Failed - 3");
											}	
										} 
										catch (error) {
											console.error('Fetch error:', error.message);
											xsg2cpopup.showError(FACILITY_UNSUPPORTED);
											CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, error.message);
										}
										
									}, function(err) {
									
										console.log("ERROR embedding signatures | "+err);
										xsg2cpopup.showError(FACILITY_UNSUPPORTED);
										CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Unable to embed signature in PDF");
									});
								}, function(err){
									
									console.log(err);
								}, SIGNATURE_TYPE.PKCS7);
							}
							else {
								xsg2cpopup.showError(FACILITY_UNSUPPORTED);
								CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "PDF error");
							}
						});
					}
				}, true);
				return false;
			};
			break;
		}
	}
}

function formatEpochToDateTime(epochTimestamp) { 

	const date = new Date(epochTimestamp * 1000);
	const year = date.getFullYear(); 
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
	const day = date.getDate().toString().padStart(2, '0'); 
	var hours = date.getHours().toString().padStart(2, '0'); 
	const minutes = date.getMinutes().toString().padStart(2, '0'); 
	const seconds = date.getSeconds().toString().padStart(2, '0'); 
	const ampm = hours >= 12 ? 'PM' : 'AM'; 
	
	// Convert to 12hrs format
	if(hours > 12) {
		hours -= 12;
	}
	else if(hours === 0) {
		hours = 12;
	}
	
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}

async function doFormAction1(tags) {
	
	var i, _form, action, xsInit, date, datestr, PDF_PROFILE, rv, pdf, digest, sigpos, url, Xpos, Ypos, pageNo, width, height, layerX, layerY, arr;
	
	for(i=0; i<tags.length; i++) {
		
		_form = tags[i];
		action = _form.getAttribute("action");
		xsInit = _form.getAttribute("xsInit");
		
		if(action && action.toLowerCase().indexOf(("getinitialvaluerd.aspx").toLowerCase()) !== -1 && !xsInit) {
			
			/*
			url = new URL(window.location.href);
			Xpos = parseInt(url.searchParams.get("Xpos"));
			Ypos = parseInt(url.searchParams.get("Ypos"));
			pageNo = parseInt(url.searchParams.get("pageNo"));
			*/
			
			_form.setAttribute("xsInit", "true");
			
			pdf = document.getElementById("dataToSign")?.value;
			Xpos = parseInt(document.getElementById("XPos")?.value);
			Ypos = parseInt(document.getElementById("YPos")?.value);
			pageNo = parseInt(document.getElementById("PageNo")?.value);
			width = parseInt(document.getElementById("width")?.value);
			height = parseInt(document.getElementById("height")?.value);
			if(width == 0) width = 150;
			if(height == 0) height = 65;
			if(!Xpos) Xpos = 0;
			if(!Ypos) Ypos = 0;
			
			layerX = (width/2) - 30;
			if(layerX <= 0) layerX = 1;
			layerY = 5;
			
			if(!pdf) {
				xsg2cpopup.showError(ERROR_PORTAL);
				return;
			}
			
			pdf = XSCUTILS._base64ToArrayBuffer(pdf);
			
			xsg2cpopup.getSignerHandle("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled", function(flag, handle){
								
				if(flag == true) 
				{
					_getSigner(handle, function(xsSignerInfo){
						
						// from xorkeesign sigSize is returned in binary format. PDF library accept the size in hex so it is multipled by 2.
						xsSignerInfo.info.sigSize = xsSignerInfo.info.sigSize * 2;
						
						// To set signature size
						CM_PDFMaxSignatureSize(xsSignerInfo.info.sigSize);
						
						// In the signature appearance, signing time form server is computed
						date = formatEpochToDateTime(xsSignerInfo.time);
						
						arr = ["Digitally signed by "];
						if(xsSignerInfo.info.subjectCommonName) {
							
							rv = `${xsSignerInfo.info.subjectCommonName}`;
							
							if(xsSignerInfo.info?.orgName && xsSignerInfo.info?.orgName.toLowerCase() !== "personal") rv += ` (${xsSignerInfo.info?.orgName})`;
							
							//console.log(rv);
							arr.push(rv);
						}
						if(date) arr.push("Date: "+date);
						
						// Signature appearance V3 profile
						PDF_PROFILE = {"isDemo": false,"version": 3,"preserveOrder": false,"docProfile":[{"resources": {"fonts": [{"name": "font1$","fontName": "Helvetica"}],"appearances": [{"name": "initial","dimension": {"width": width,"height": height}}]},"positions": [{"initial": [{"statusIndicator": true,"layerInfo":{"front":false,"x":layerX,"y":layerY,"scale":0.55},"position": [Xpos, Ypos],"rotation": 0,"pageNum": [pageNo]}]}]}]};
						
						stream = CSUTILS.setSigAppearance(arr, 1, width, height, PDF_PROFILE.docProfile[0].resources.fonts[0].name, 8);
						
						PDF_PROFILE.docProfile[0].resources.appearances[0].stream = btoa(stream);
						
						//console.log(PDF_PROFILE);
						
						// To get SHA2 PDF digest. 
						[rv, pdf, digest, sigpos] = CM_PDFSignV3(PDF_PROFILE, pdf, null, "sha2", xsSignerInfo.handle, null);	
						
						if(rv === 0)
						{
							//console.log(XSCUTILS._arrayBufferToBase64(digest));
							xsg2cpopup.showLoader("Waiting for signature ...");
							
							// Get sha2 pkcs7 signature from xorkeesign
							_getSignature({}, xsSignerInfo, XSCUTILS._arrayBufferToBase64(digest), async (xsSignatureInfo) => {
								
								CM_PDFEmbedSig(pdf, XSCUTILS._base64ToArrayBuffer(xsSignatureInfo.signature), sigpos, async (pdf) => {
									
									if(document.getElementById("signature")) document.getElementById("signature").value = XSCUTILS._arrayBufferToBase64(pdf);
									if(document.getElementById("xorkeeFlag")) document.getElementById("xorkeeFlag").value = "Y";
									if(document.getElementById("dataToSign")) document.getElementById("dataToSign").value = "";
									
									if(document.getElementById("txtCert")) document.getElementById("txtCert").value = _addEOL(xsSignerInfo.info.certificate);
									if(document.getElementById("txtIssuer")) document.getElementById("txtIssuer").value = xsSignerInfo.info.issuerDN;
									if(document.getElementById("txtSerial")) document.getElementById("txtSerial").value = _removeZero(xsSignerInfo.info.serialNo);
									
									_form.submit();
									
								}, function(err) {
								
									console.log("ERROR embedding signatures | "+err);
									xsg2cpopup.showError(FACILITY_UNSUPPORTED);
									CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Unable to embed signature in PDF");
								});
							}, function(err){
								
								console.log(err);
							}, SIGNATURE_TYPE.PKCS7);
						}
						else {
							xsg2cpopup.showError(FACILITY_UNSUPPORTED);
							CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "PDF error");
						}
					});
				}
			}, true);
			break;
		}
	}
}

const observer = new MutationObserver(function(mutationsList, obs) {
	
	if(window.location.href.indexOf("scmexcise") !== -1) doFormAction(document.getElementsByTagName('form'));
	else {
		doFormAction1(document.getElementsByTagName('form'));
		doObjectAction(document.getElementsByTagName('applet'));
	}
});
if(document) observer.observe(document, { subtree: true, childList: true});