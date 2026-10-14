console.log('xorkeesign EPF script injected.');

const ERRMSG_EPFRESPONSE = "The EPF portal did not respond as expected. Please try after some time.";
const ERRMSG_NOSIGNERS = "No active signatory available for the establishment.<br><br>You should get a new DSC (if not already done) for a signatory of this establishment and update it in xorkee.<br>After updating the DSC in xorkee, you can register the DSC in the EPFO portal.";

var EPF_PDF_PROFILE = {"Version":2,"isdemo":false,"BoxDimensions":{"width":250,"height":150},"BoxPosition":{"x":300,"y":35},"Page":0,"Stream":"","Fonts":[{"Name":"font1$","FontName":"Helvetica"}]};

const _G2C_EPF_ID = "ml6Hy4bSrBNZz+aItZmeHi1weKA=";

const _G2C_EPF_CERT = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkdAIiDq/lQ+tDDFYfcxHt8MaqF3JUFpxjciQORHpeNpQGORSFPqpxvvBtIx01pgIQcA9Kw0nLB8/zYbJoc9n6OJaaabzyuYU7KkpE8I/D4HhKQyf6na7yyPZbv+iw1On6DRyuKeOmDJAu8mRrcvUqCxApMUB0FfOOM6qZHKjBIeV9OPAg18YZw35bC+QQ/NPkN1aR+IwO7uHyDGD86PMcCsK+Y6MNDw1uwTlFVYvciDn2WV9ejAZc/J2ibjuHT/IvuvwRGxaTpO4CrUECV2soVju4B10SzQTiGQJkH4lwGt3CDirexG7lRzM8Lhqs/1pJ+/POJSSPcWfY4J+0kP+sQIDAQAB";

const _G2C_URL_REGISTERDSC = "/epfo/digitalSignature/registerDigitalSignatureForm";

const EPF1 = {
	
	encCertificateList: function(param, signatory, xhrOnload, index)
	{
		var data;
		
		if(signatory.result == 0)
		{
			// console.log(signatory);
			
			EPF1.signerInfo = signatory;
			
			var json = {
				"message": {
					"status": "success",
					"statusCode": "DSC01-01",
					"data": "Certificates found."
				},
			};
			
			if(param.registerDSC == true) json.certificateList = [signatory.certificate];
			else json.certificateList = [signatory.info.certificateData];
			
			json = JSON.stringify(json);
			
			console.log("REGISTER DSC RESPONSE");
			console.log(json);
			
			data = xsepfEncryptPayload(XSCUTILS._base64ToArrayBuffer(_G2C_EPF_CERT), XSCUTILS._base64ToArrayBuffer(param.apikey), XSCUTILS.str2ab(json));
			
			xsg2cpopup.removePopup(); 
			
			xhrOnload(XSCUTILS._arrayBufferToBase64(data));
			
		}
		else if(signatory.result != 0)
		{
			CSUTILS.promptListener(signatory, function(msg){
				
				//user attempts to register the DSC of the selected signatory in xorkee
				//query xorkeesign again to load the details of the signatory
				// _xsSendMessage(XS_MSG_EPF_GET_SIGNERINFO, signer.signatoryName);
				if(msg.retry == true) EPF1.getCertificateList(param, xhrOnload, index, undefined, undefined);
				else
				{
					//TODO: list signers recursively when more than one signatory is mapped in the portal
				}
			});
		}
	},

	getCertificateList: function(param, xhrOnload, selectedSignerIndex, freePlan, applyUnits)
	{
		var msg = {};
		
		if(param.registerDSC == true)
		{
			xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
			
			// Register DSC
			msg.otlType = G2C_MSG.REG_DSC;
			msg.xsSignerInfo = {handle:param.handle};
			
			msg.params = {};
			msg.params.freePlan = freePlan;
			msg.params.applyUnits = applyUnits;
		}
		else
		{
			xsg2cpopup.showLoader("Checking the status of authorized signatories ...");
			
			msg.otlType = G2C_MSG.GET_SIGNATORIES;
			if(selectedSignerIndex != undefined ) msg.selectedSignerIndex = selectedSignerIndex;
		}
		
		chrome.runtime.sendMessage(
			EXTENSION_ID,
			msg,
			function(response){
				
				console.log(response);
				if(response == undefined) response = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_EPF);
				
				if(param.registerDSC == true)
				{
					// Register DSC
					CSUTILS.promptListener(response, function(userAction) {
					
						if(userAction.retry == true)
						{
							/*
								Retry scenarios
								---------------
								
								1. xorkee registration
								2. User not reachable(Signature request and freePlan request)
							*/
							freePlan = (freePlan == true)?true:userAction.freePlan;
							applyUnits = (applyUnits == true)?true:userAction.applyUnits;
							EPF1.getCertificateList(param, xhrOnload, selectedSignerIndex, freePlan, applyUnits);
						}
						else
						{
							if(response.result == 0)
							{
								EPF1.encCertificateList(param, response, xhrOnload, undefined);
							}
						}
					});
				}
				else
				{
					if(response.signatories != undefined)
					{
						if(response.signatories.length == 0)
						{
							xsg2cpopup.showError(ERRMSG_NOSIGNERS, function() {
								
							});
						}
						else if(response.signatories.length == 1)
						{
							//proceed to sign whenever there is only one signatory
							EPF1.encCertificateList(param, response.signatories[0], xhrOnload, 0);
						}
						else
						{
							if(response.selectedSignerIndex >= 0)
							{
								//for cases where the user attempts to use xorkee without registering the DSC
								//we will preserve the previous selection of the signer and proceed with signing
								//directly without prompting the user again
								EPF1.encCertificateList(param, response.signatories[response.selectedSignerIndex], xhrOnload, response.selectedSignerIndex);
							}
							else
							{
								//present the user will all the available signatory and ask to choose one
								xsg2cpopup.listSigners(response.signatories, function(index){
									if(index >= 0) EPF1.encCertificateList(param, response.signatories[index], xhrOnload, index);
								});
							}
						}
					}
					else
					{
						if(response.result === G2C_ERR.NO_USER_IDENTIFIER[0]) {
							
							xsg2cpopup.getHandlePrompt("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to identify your DSC", "DSC will not be listed. You will not be able to sign.", function(flag, handle, saveHandle){
								
								CSUTILS.getSignerInfo(SERVICENAME_EPF, {handle:handle})
								.then((xsSignerInfo) => {
									
									if(xsSignerInfo.handle && saveHandle === true) xsg2cStoreHandle(xsSignerInfo.handle);
									
									EPF1.encCertificateList(param, xsSignerInfo, xhrOnload, 0);
								})
								.catch((e) => {
									console.log(e);
								});
							});
						}
						else {
							xsg2cpopup.showError(response.errorString, function() {
								
							});
						}
					}
				}
			}
		);
	},

	epfSignPDF: function(param, pdfbuf, digest, pdfSigPos, signer, freePlan, xhrOnload, decPayload, applyUnits)
	{
		var url = param.destUrl, plhead, plfoot, payload, resstatus, msg, i, ab;
		
		msg = {};
		msg.otlType = G2C_MSG.GET_SIGNATURE;
		msg.tbs = digest;
		msg.xsSignerInfo = signer;
		
		msg.params = {};
		msg.params.freePlan = freePlan;
		msg.params.applyUnits = applyUnits;
		
		xsg2cpopup.showLoader("Waiting for signature ...");
		
		chrome.runtime.sendMessage(
			EXTENSION_ID,
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
						applyUnits = (applyUnits == true)?true:userAction.applyUnits;
						EPF1.epfSignPDF(param, pdfbuf, digest, pdfSigPos, signer, freePlan, xhrOnload, decPayload, applyUnits);
					}
					else
					{
						if(payload.result == 0)
						{
							if(payload.signature == null)
							{
								console.log("User canceled the request to perform signature");
								return;
							}
							
							CM_PDFEmbedSig(pdfbuf, XSCUTILS._base64ToArrayBuffer(payload.signature), pdfSigPos[0], function(pdf) {
								
								var json = {
									"signedPdfArray": {
										pdfByteArray: XSCUTILS._arrayBufferToBase64(pdf),
										transactionId: decPayload.transactionId
									},
									"message": {
										"status": "success",
										"statusCode": "DSC02-01",
										"data": "PDF signed successfully."
									},
								};
								
								json = JSON.stringify(json);
								
								console.log("SIGNED PDF RESPONSE");
								console.log(json);
			
								data = xsepfEncryptPayload(XSCUTILS._base64ToArrayBuffer(_G2C_EPF_CERT), XSCUTILS._base64ToArrayBuffer(param.apikey), XSCUTILS.str2ab(json));
								
								xhrOnload(XSCUTILS._arrayBufferToBase64(data));
						
							}, function(msg) {
							
								console.log("ERROR embedding signatures | "+msg);
								xsg2cpopup.showError(ERROR_INVALIDPDF, function() {
									
								});
								
							});
						}
					}
				});
			}
		);
	},	

	signPdf: function(param, json, xhrOnload)
	{
		var pdfSigPos, date, datestr;
		
		json.pdf = XSCUTILS._base64ToArrayBuffer(json.pdf);
		
		date = new Date(EPF1.signerInfo.time * 1000);
		datestr = date.getFullYear()+"/"+(date.getMonth()+1).toString().padStart(2,'0')+"/"+(date.getDate()).toString().padStart(2,'0')+" "+(date.getHours()).toString().padStart(2,'0')+":"+(date.getMinutes()).toString().padStart(2,'0')+":"+(date.getSeconds()).toString().padStart(2,'0')+" IST";
		EPF_PDF_PROFILE.BoxPosition.x = json.llx;
		EPF_PDF_PROFILE.BoxPosition.y = json.lly;
		EPF_PDF_PROFILE.BoxDimensions.width = json.urx-json.llx;
		EPF_PDF_PROFILE.BoxDimensions.height = json.ury-json.lly;
		//EPF_PDF_PROFILE.Stream = btoa("BT\n0 0 0 rg\n/font1$ 8.0000 Tf\n1 0 0 1 10 100 Tm (Digitally signed by "+EPF1.signerInfo.info.subjectCommonName+") Tj\n1 0 0 1 10 90 Tm (Date: "+datestr+") Tj\nET");
		EPF_PDF_PROFILE.Stream = btoa("BT\n0 0 0 rg\n/font1$ 8.0000 Tf\n1 0 0 1 10 100 Tm (Date: "+datestr+") Tj\n1 0 0 1 10 90 Tm (Signed by: "+EPF1.signerInfo.info.subjectCommonName+") Tj\nET");
		// console.log(datestr);
		
		CM_PDFSetProfileV2(EPF_PDF_PROFILE);
		CM_PDFMaxSignatureSize(EPF1.signerInfo.info.sigSize * 2);	//get the signature allocation size from xorkeesign (* 2 for HEX)
		CM_PDFAppendSigObjects(json.pdf, null, "sha1", EPF1.signerInfo.handle, true, null, true, EPF1.signerInfo.info.sigSize * 2, function(pdf, digest, sigpos) {
			
			pdfSigPos = [sigpos, (EPF1.signerInfo.info.sigSize * 2)];
			EPF1.epfSignPDF(param, pdf, XSCUTILS._arrayBufferToBase64(digest), pdfSigPos, EPF1.signerInfo, false, xhrOnload, json, undefined);
		}, function(msg) {
		
			console.log("ERROR creating signature objects | "+msg);
			xsg2cpopup.showError(ERROR_INVALIDPDF, function() {
				
			});
		});
	},
	
	dscService: function(url, payload, apikey, clientId, xhrOnload) 
	{	
		var extmsg, params, rv, data;
		
		if(clientId != _G2C_EPF_ID)
		{
			xsg2cpopup.showError(FACILITY_UNSUPPORTED, function() {});
			
			// xorkeesign logger
			extmsg = {};
			extmsg.type = G2C_MSG.SET_INFO;
			extmsg.action = "facilityUnsupported";
			extmsg.message = "Portal identifier modified";
			
			try
			{
				chrome.runtime.sendMessage(EXTENSION_ID, extmsg, function(){console.log("");});
			} 
			catch(e) {console.log(e)};
			
			return; 
		}
		else if(url == undefined || payload == undefined || apikey == undefined || xhrOnload == undefined)
		{
			xsg2cpopup.showError(ERROR_PORTAL);
			return;
		}
			
		params = {};
		params.url = url;
		params.payload = payload;
		params.apikey = apikey;
		
		if(window.location.href.indexOf(_G2C_URL_REGISTERDSC) != -1) params.registerDSC = true;
		else params.registerDSC = false;
		
		console.log(params);
		
		try {
			
			data = xsepfDecryptPayload(XSCUTILS._base64ToArrayBuffer(_G2C_EPF_CERT), XSCUTILS._base64ToArrayBuffer(apikey), XSCUTILS._base64ToArrayBuffer(payload));
			if(data != null)
			{
				console.log(data);
				data = JSON.parse(data);
				
				if(url.indexOf("/getCertificateList") != -1) 
				{
					if(data.version != "1.0.0")
					{
						// xorkeesign logger
						extmsg = {};
						extmsg.type = G2C_MSG.SET_INFO;
						extmsg.action = "facilityUnsupported";
						extmsg.message = "New version of signing component encountered";
						
						try
						{
							chrome.runtime.sendMessage(EXTENSION_ID, extmsg, function(){console.log("");});
						} 
						catch(e) {console.log(e)};
					}
					
					if(params.registerDSC == true)
					{
						xsg2cpopup.getHandlePopup("Digital Signature Registration", "You require a xorkee handle for a valid DSC in your e-Token for digital signature registration.", "Digital signature registration will be cancelled", function(flag, handle) {
							
							if(flag == true) 
							{
								params.handle = handle;
								EPF1.getCertificateList(params, xhrOnload, undefined, undefined, undefined);
							}
						});
					}
					else EPF1.getCertificateList(params, xhrOnload, undefined, undefined, undefined);
				}
				else if(url.indexOf("/signPdf") != -1) 
				{
					if(data.pdf == undefined)
					{
						xsg2cpopup.showError(ERROR_PORTAL);
						return;
					}
					
					EPF1.signPdf(params, data, xhrOnload);
				}
			}
		} catch (e) {
			
			console.log(e); 
			xsg2cpopup.showError(ERROR_PORTAL); 
			return;
		}
		
	},
	
};