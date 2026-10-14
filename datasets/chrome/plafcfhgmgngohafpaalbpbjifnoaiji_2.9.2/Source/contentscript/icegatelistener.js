console.log("G2C: post message");

const _TBS = "dW1hbmdzaGFoMTk4N0BnbWFpbC5jb20=";

function _showLoader() {
	var arr = document.getElementsByTagName("ngx-spinner");
	for(var i=0; i<arr.length; i++) {
		arr[i].style.display = "block";
	}
}

function _hideLoader() {
	var arr = document.getElementsByTagName("ngx-spinner");
	for(var i=0; i<arr.length; i++) {
		arr[i].style.display = "none";
	}
}

function _getExtId() {
	
	var EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
	if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji";
	
	return EXTENSION_ID;
}

function _getSigner(promptParams, cb){
	
	xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
	
	var msg = {};
	msg.otltype = G2C_MSG.GET_SIGNER;
	
	msg.params = promptParams;
	
	chrome.runtime.sendMessage(
		_getExtId(),
		msg,
		function(payload) {
			
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_ICEGATE_NEW);
			
			payload.removePrompt = false;
			CSUTILS.promptListener(payload, function(userAction) {
		
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
					*/
					
					promptParams = CSUTILS.getPromptParams(promptParams, userAction);
					_getSigner(promptParams, cb);
				}
				else
				{
					if(payload.result == 0)
					{
						// If signerInfo result and if user has checked the save handle Checkbox. We store the handle in the local storage
						if(payload.handle && promptParams.saveHandle === true) xsg2cStoreHandle(payload.handle);
					}
					
					cb(payload);
				}
			});
		}
	);
}

function _getSignature(promptParams, tbs, sigType, scb){
	
	xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
	
	var msg;
	
	msg = {};
	msg.otltype = G2C_MSG.GET_SIGNATURE;
	msg.tbs = tbs;
	msg.sigType = sigType;
	
	msg.params = promptParams;
	
	chrome.runtime.sendMessage(
		_getExtId(),
		msg,
		function(payload){
			
			console.log(payload);
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_ICEGATE_NEW);
			
			CSUTILS.promptListener(payload, function(userAction) {
				
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. User not reachable(Signature request and applyUnits request)
					*/
					promptParams = CSUTILS.getPromptParams(promptParams, userAction);
					_getSignature(promptParams, tbs, sigType, scb)
				}
				else
				{
					if(payload.result === 0 && promptParams.handle && promptParams.saveHandle === true) xsg2cStoreHandle(promptParams.handle);
					scb(payload);
				}
			});
		}
	);
}

function _parseIgDN1(obj) {
	
	try {
		obj = JSON.parse(obj);
	} catch (e) {
		console.log(e);
		return "";
	}
	
	const DN_ORDER = ["CN", "SERIALNUMBER", "ST", "L", "2.5.4.17", "2.5.4.20", "2.5.4.65", "T", "OU", "O", "C"];
	var dnStr = "", val, i, key;
	
	for(i=0; i<DN_ORDER.length; i++) {
		
		key = DN_ORDER[i];
		val = obj[DN_ORDER[i]];
		
		if(key.indexOf("2.5.4") !== -1) key = `OID.${key}`;
		if(val) dnStr += `${key}=${val}, `;
	}
	
	for(var key1 in obj) {
		
		if(key1.indexOf("2.5.4") !== -1) key = `OID.${key1}`;
		else key = key1;
		if(DN_ORDER.indexOf(key1) === -1) dnStr += `${key}=${obj[key1]}, `;
	}
	
	if(dnStr) return  dnStr.slice(0, -2);
	return dnStr;
}

function _parseIgDN(str) {
	
	if(str) {
		return str.split("#xorkee#").reverse().join(", ").replaceAll("2.5.4", "OID.2.5.4");
	} else {
		return "";
	}
}

function _ncPKIResponse(xsSignatureInfo, evt) {
	
	if(xsSignatureInfo.result === 0) {
								
		if(xsSignatureInfo.info && xsSignatureInfo.info.igSubjectDN) xsSignatureInfo.info.igSubjectDN = _parseIgDN(xsSignatureInfo.info.igSubjectDN);
		if(xsSignatureInfo.info && xsSignatureInfo.info.igIssuerDN) xsSignatureInfo.info.igIssuerDN = _parseIgDN(xsSignatureInfo.info.igIssuerDN);
		
		msg = {
			"msg": "DSC Details retrived successfully.",
			"certclass ": (xsSignatureInfo.info.class)?xsSignatureInfo.info.class.toString():"",
			"flag": "true", 
			"serialNumber": xsSignatureInfo.info.serialNo,
			"subject": xsSignatureInfo.info.igSubjectDN,
			"subjectAlternativeName": (xsSignatureInfo.info.subjectAlternativeName)?xsSignatureInfo.info.subjectAlternativeName:"",
			"pubkeyLen": xsSignatureInfo.info.publicKey.length.toString(),
			"validFrom": xsSignatureInfo.info.validFrom,
			"thumbPrint": xsSignatureInfo.info.thumbPrint,
			"version": "15",
			"issuer": xsSignatureInfo.info.igIssuerDN,
			"cnName": "CN="+xsSignatureInfo.info.subjectCN,
			"crtString": xsSignatureInfo.info.certificate,
			"hash": xsSignatureInfo.signature,
			"pubKey": xsSignatureInfo.info.publicKey,
			"validTo": xsSignatureInfo.info.validTill
		};
	}
	else {
		
		msg = {
			"msg": "DSC Details retrival failed",
			"serialNumber": "",
			"flag": "false",
			"subject": "",
			"subjectAlternativeName": "",
			"pubkeyLen": "",
			"validFrom": "",
			"thumbPrint": "",
			"version": "15",
			"issuer": "",
			"cnName": "",
			"crtString": "",
			"pubKey": "",
			"validTo": ""
		};
	}

	xsg2cpopup.removePopup();

	msg = JSON.stringify(msg);
	msg = msg.replaceAll("/", "\\/");

	console.log(msg);
	console.log(JSON.parse(msg));
	
	 _showLoader();
	evt.source.postMessage(msg, evt.origin); 
}

function _getFile(accept) {
		
	return new Promise(async (resolve, reject) => {
		
		const input = document.createElement('input');
		input.type = 'file';
		
		if(accept) input.setAttribute("accept", accept);
		
		input.oncancel = async () => {
			reject("Unable to get file");
		};
		
		input.onchange = async () => {
			
			input.files[0].arrayBuffer()
			.then((rv) => {
				
				if(rv) resolve([input.files[0], rv]);
				else reject("Unable to get file");
			})
			.catch(e => {console.log(e)});
		}
		input.click();
	});
}

function _downloadDoc(buf, name) {
	
	var url = "data:application/octet-stream;base64,"+buf;
	var b = document.createElement("a");
	b.href = url;
	b.id = "tmpLink";
	b.download = name;
	b.innerHTML = "Download Data";
	try{ 
		b.click();
		return true;
	}
	catch(e){
		return null;
	};
}

function appendToFilename(filename, string){
    var dotIndex = filename.lastIndexOf(".");
    if (dotIndex == -1) return filename + string;
    else return filename.substring(0, dotIndex) + string + filename.substring(dotIndex);
}

function _ncPKITextSignResponse(evt, flag, m) {
	
	var msg = {"flag":flag,"version":"18", "msg":m};
	
	xsg2cpopup.removePopup();

	msg = JSON.stringify(msg);
	msg = msg.replaceAll("/", "\\/");

	console.log(msg);
	console.log(JSON.parse(msg));
	
	 _showLoader();
	evt.source.postMessage(msg, evt.origin); 
}

window.addEventListener("message", (event) => {
	
	console.log(event);
	
	if(event.origin.indexOf("icegate-ui-") === -1) {
		console.log("Invalid origin", event.origin);
		return;
	}
	
	var data = event.data;
	
	try {
		data = JSON.parse(data);
	} catch(e) {
		xsg2cpopup.showError(ERROR_PORTAL);
		CSUTILS.setInfo(_getExtId(), SET_INFO.FACILITY_UNSUPPORTED, "Unable to parse JSON message");
		return;
	}
	
	switch(data.methodName) {
		
		case "mapSigningDSC": {
			
			_hideLoader();
			console.log("Sign", data);
			
			xsg2cpopup.getHandlePrompt("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled", function(flag, handle, saveHandle){
								
				if(flag === true)
				{
					_getSignature({saveHandle:saveHandle, handle:handle}, _TBS, SIGNATURE_TYPE.REGISTERDSC, function(xsSignatureInfo){
							
						_ncPKIResponse(xsSignatureInfo, event);
					});
				}
				else _ncPKIResponse({}, event);
			});
			break;
		}
		
		case "icegatetextSigning": {
			
			var rv, ext;
			
			_hideLoader();
			
			_getFile()
			.then(([file, buf]) => {
				
				ext = file.name.split(".").pop();
				
				if(file.type === "application/pdf" || ext === "pdf") {
					_ncPKITextSignResponse(event, "true", "Please select proper file to sign");
					return;
				}
				
				xsg2cpopup.getHandlePrompt("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled", function(flag, handle, saveHandle){
								
					if(flag === true)
					{
						_getSigner({handle:handle}, (xsSignerInfo) => {
							
							if(xsSignerInfo.result === 0) {
								
								rv = ciTrim(buf, false);
				
								if(rv.status == "success") {
									
									ciComputeDigest(rv.buf)
									.then((digest) => {
										
										_getSignature({handle:handle, saveHandle:saveHandle}, digest, SIGNATURE_TYPE.RAW, function(xsSignatureInfo){
													
											if(xsSignatureInfo.result === 0 && xsSignatureInfo.signature) {
												
												rv = ciAppendSignature(rv.buf, xsSignatureInfo.signature, xsSignerInfo.info.certificateData, "xorkeesignIndiaG2C");
												
												try {
													rv = btoa(rv);
												}
												catch(e) {
													
													console.log(e);
													_ncPKITextSignResponse(event, "false", ERROR_STD);
													return;
												}
												
												_downloadDoc(rv, appendToFilename(file.name, "Signed"));
												_ncPKITextSignResponse(event, "true", "Downloads");
											}
											else {
												_ncPKITextSignResponse(event, "false", xsSignatureInfo.errorString);
											}
										});
									})
									.catch((e) => {
										
										console.log(e);
										_ncPKITextSignResponse(event, "false", ERROR_STD);
									});
								}
								else {
									_ncPKITextSignResponse(event, "false", "Please select proper file to sign");
								}
							}
							else {
								_ncPKITextSignResponse(event, "false", xsSignatureInfo.errorString);
							}
						});
					}
					else {
						_ncPKITextSignResponse(event, "false", "xorkeesign India G2C needs your xorkee handle to sign");
					}
				});
			})
			.catch((e) => {
				console.log(e);
				_ncPKITextSignResponse(event, "false", "Please select the file to sign");
			});
			break;
		}
		
		default: {
			
			_hideLoader();
			
			xsg2cpopup.showError(FACILITY_UNSUPPORTED, function() {
				_showLoader();
				event.source.postMessage("false", event.origin);
			});
			CSUTILS.setInfo(_getExtId(), SET_INFO.FACILITY_UNSUPPORTED, `Unsupported methodName (ncpki) - ${data.methodName}`);
			break;
		}
	}
	
});
