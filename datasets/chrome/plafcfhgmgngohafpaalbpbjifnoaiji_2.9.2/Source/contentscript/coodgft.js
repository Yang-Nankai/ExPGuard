const COO_DGFT = {
	
	params:{},
	
	getSignature: function(promptParams, digest, sigType, xsSignerInfo, scb)
	{
		xsg2cpopup.showLoader("Waiting for signature ...");
		
		var msg;
		
		msg = {};
		msg.otltype = G2C_MSG.GET_SIGNATURE;
		msg.tbs = digest;
		msg.sigType = sigType;
		msg.xsSignerInfo = xsSignerInfo;
		
		msg.params = promptParams;
		
		chrome.runtime.sendMessage(
			msg,
			function(payload){
				
				console.log(payload);
				if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_COO_DGFT);
				
				CSUTILS.promptListener(payload, function(userAction) {
					
					if(userAction.retry == true)
					{
						/*
							Retry scenarios
							---------------
							
							1. User not reachable(Signature request and applyUnits request)
						*/
						promptParams = CSUTILS.getPromptParams(promptParams, userAction);
						COO_DGFT.getSignature(promptParams, digest, sigType, xsSignerInfo, scb)
					}
					else
					{
						if(payload.result == 0)
						{
							scb(payload);
						}
						// else error prompt will be handled in promptListener function.
					}
				});
			}
		);
	},
	
	getSigner: function(promptParams, iecCode, cb)
	{
		xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
		
		var msg = {};
		msg.otltype = G2C_MSG.GET_SIGNER;
		msg.iecCode = iecCode;
		
		msg.params = promptParams;
		
		chrome.runtime.sendMessage(
			msg,
			function(payload) {
				
				if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_COO_DGFT);
				
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
						COO_DGFT.getSigner(promptParams, iecCode, cb);
					}
					else
					{
						if(payload.result == 0)
						{
							// If signerInfo result and if user has checked the save handle Checkbox. We store the handle in the local storage
							if(payload.handle && promptParams.saveHandle === true) xsg2cStoreHandle(payload.handle);
							
							cb(payload);
						}
					}
				});
			}
		);
	},
	
	signPDF: function(xsSignerInfo)
	{
		
		const {uploadURL, returnUrl, downloadURL, token} = COO_DGFT.params;
		
		// TO get to be signed from coo DGFT portal
		CSUTILS.sendRequest("GET", downloadURL, null, null, "arraybuffer", function(status, pdfPayload){
			
			if(status === 200)
			{
				var PDF_PROFILE, rv, pdf, digest, sigpos, date, datestr, time, requestHeaders;
				
				// from xorkeesign sigSize is returned in binary format. PDF library accept the size in hex so it is multipled by 2.
				xsSignerInfo.info.sigSize = xsSignerInfo.info.sigSize * 2;
				
				// To set signature size
				CM_PDFMaxSignatureSize(xsSignerInfo.info.sigSize);
				
				// In the signature appearance, signing time form server is computed
				date = new Date(xsSignerInfo.time * 1000);
				datestr = date.getFullYear()+":"+(date.getMonth()+1).toString().padStart(2,'0')+":"+(date.getDate()).toString().padStart(2,'0');
				time = date.getHours().toString().padStart(2,'0')+":"+(date.getMinutes()).toString().padStart(2,'0')+":"+(date.getSeconds()).toString().padStart(2,'0')+" IST";

				// Signature appearance V3 profile
				PDF_PROFILE = {"isDemo": false,"version": 3,"preserveOrder": false,"docProfile":[{"resources": {"fonts": [{"name": "font1$","fontName": "Helvetica"}],"appearances": [{"name": "initial","stream": btoa("BT 0 0 0 rg\n/font1$ 7.0000 Tf\n1 0 0 1 3 40 Tm (Digitally signed by) Tj\n1 0 0 1 3 30 Tm ("+xsSignerInfo.info.subjectCommonName+") Tj\n1 0 0 1 3 20 Tm (Date: "+datestr+") Tj\n1 0 0 1 3 10 Tm ("+time+") Tj\nET"),"dimension": {"width": 72,"height": 48}}]},"positions": [{"initial": [{"statusIndicator": true,"position": [72, 20],"rotation": 0,"pageNum": [-1]}]}]}]};
				
				// To get SHA2 PDF digest. PDF certification signature is done here
				[rv, pdf, digest, sigpos] = CM_PDFCertifyV3(PDF_PROFILE, pdfPayload, null, "sha2", xsSignerInfo.handle);	
				
				if(rv === 0)
				{
					// To get PDF signature from xorkeesign
					COO_DGFT.getSignature({}, XSCUTILS._arrayBufferToBase64(digest), SIGNATURE_TYPE.PKCS7, xsSignerInfo, function(xsSignatureInfo){
						
						// PKCS7 signature is embedded here
						CM_PDFEmbedSig(pdf, XSCUTILS._base64ToArrayBuffer(xsSignatureInfo.signature), sigpos, function(pdf) {
							
							requestHeaders = {
								token:token,
								pragma: 'no-cache',
								'cache-control': 'no-cache',
								'content-type':"application/x-www-form-urlencoded",	
							};
					
							// Sending the signed PDF to the portal
							CSUTILS.sendRequest("POST", uploadURL, pdf, requestHeaders, null, function(status, response){
								
								if(status === 200)
								{
									console.log(response);
									xsg2cpopup.showPortalMsg("File signed successfully.", function(){
												
										CSUTILS.openTab(undefined, returnUrl+"?token=false");
									});
										
									if(response != '{\"status\":\"true\",\"reason\":\"created\"}')
									{
										xsg2cpopup.showError(ERROR_PORTAL);
										CSUTILS.setInfo(undefined, SET_INFO.FACILITY_UNSUPPORTED, "Unable to upload PDF response mismtach : "+JSON.stringify(COO_DGFT.params));
									}
								}
								else
								{
									console.log("ERROR: Unable to upload PDF : "+status);
									xsg2cpopup.showError(ERROR_PORTAL);
								}
								
							});
					
						}, function(msg) {
						
							console.log("ERROR embedding signatures | "+msg);
							xsg2cpopup.showError(ERROR_PORTAL);
							CSUTILS.setInfo(undefined, SET_INFO.FACILITY_UNSUPPORTED, "ERROR embedding signatures : "+JSON.stringify(COO_DGFT.params));
							
						});
						
					});
				}
				else
				{
					console.log(pdf);
					xsg2cpopup.showError(ERROR_PORTAL);
					CSUTILS.setInfo(undefined, SET_INFO.FACILITY_UNSUPPORTED, pdf+JSON.stringify(COO_DGFT.params));
				}
			}
			else
			{
				console.log("ERROR: Unable to get PDF : "+status);
				xsg2cpopup.showError(ERROR_PORTAL);
			} 
		});
	},
	
	signInit: function(url)
	{
		// To get the jnpl file form the portal 
		CSUTILS.sendRequest("GET", url, null, null, "text", function(status, pdfPayload){
			
			if(status === 200)
			{
			
				var supported = true, jar, i, applet, xmlDoc, k;
				
				const parser = new DOMParser();
				
				try 
				{
					xmlDoc = parser.parseFromString(pdfPayload,"text/xml");
				}
				catch(e) {
					console.log(e);
					xsg2cpopup.showError(ERROR_PORTAL);
					return;
				}
				
				jar = xmlDoc.getElementsByTagName("jar");
				
				if(jar.length > 0)
				{
					for(i=0; i<jar.length; i++)
					{
						if(jar[i].getAttribute("href").toLowerCase().indexOf("/signpdf.jar") === -1)
						{
							// Unknown jar
							supported = false;
							CSUTILS.setInfo(undefined, SET_INFO.FACILITY_UNSUPPORTED, "Unknown jar : "+jar[i].getAttribute("href"));
						}
					}
					
				}
				
				if(supported === false)
				{
					applet = xmlDoc.getElementsByTagName("applet-desc");
					for(k=0; k<applet.length; k++)
					{
						applet = applet[k];
						COO_DGFT.params = {};
						
						// To get all applet params
						for(i=0; i<applet.children.length; i++)
						{
							COO_DGFT.params[applet.children[i].getAttribute("name")] = applet.children[i].getAttribute("value");
						}
						
						console.log(COO_DGFT.params);
					}
					
					CSUTILS.setInfo(undefined, SET_INFO.FACILITY_UNSUPPORTED, "Unsupported applet params : "+JSON.stringify(COO_DGFT.params));
					
					// Unknown jar has occured
					xsg2cpopup.showError(FACILITY_UNSUPPORTED);
					return;
				}
				
				// To get the applet tag params
				applet = xmlDoc.getElementsByTagName("applet-desc");
				if(applet.length > 0)
				{
					applet = applet[0];
					COO_DGFT.params = {};
					
					// To get all applet params
					for(i=0; i<applet.children.length; i++)
					{
						COO_DGFT.params[applet.children[i].getAttribute("name")] = applet.children[i].getAttribute("value");
					}
					
					console.log(COO_DGFT.params);
					
					// COO_DGFT.params.iecCode = "NjkxMDAwMDEwMA=="; // test
					
					// Params from request URL
					const {iecCode, uploadURL, checkType, isIECCodeCheckPassword, returnUrl, downloadURL, token} = COO_DGFT.params;
					
					/*
						If checkType is "C" and isIECCodeCheckPassword is "false", signature is not needed. User is in registration page signer handle is identified using the ICE code in the certificate
						
						If checkType is "C" and isIECCodeCheckPassword is "true", signer handle is identified using the ICE code in the certificate for PDF signing
						
						If checkType is not "C", We get signer handle for PDF signature
						
					*/
					if(checkType == "C") 
					{
						if(isIECCodeCheckPassword == "false") // register DSC
						{
							if(returnUrl && iecCode)
							{
								// TO get signerInfo from xorkeesign
								COO_DGFT.getSigner({}, iecCode, function(xsSignerInfo){
									
									// To check the private key possession signature request is sent to server. Signature is not need in this case
									COO_DGFT.getSignature({}, xsSignerInfo.handle, SIGNATURE_TYPE.REGISTERDSC, xsSignerInfo, function(xsSignatureInfo){
										
										xsg2cpopup.showPortalMsg("Your IEC Code matched.<br>Please Continue for registration.", function(){
																			
											// After successfull signature, register Phase 2 will be opened using the returnUrl
											CSUTILS.openTab(undefined, returnUrl+"?token=false");
										});
									});
								});
							}
							else
							{	
								console.log("Unknown applet params");
								xsg2cpopup.showError(FACILITY_UNSUPPORTED);
								CSUTILS.setInfo(undefined, SET_INFO.FACILITY_UNSUPPORTED, "Registration: Unknown applet params : "+JSON.stringify(COO_DGFT.params));
							}
						}
						else // Sign PDF function
						{
							if(downloadURL && uploadURL && token && returnUrl && iecCode)
							{
								// TO get signerInfo from xorkeesign
								COO_DGFT.getSigner({}, iecCode, function(xsSignerInfo){
									
									COO_DGFT.signPDF(xsSignerInfo);
								});
								
							}
							else
							{
								console.log("Unknown applet params");
								xsg2cpopup.showError(FACILITY_UNSUPPORTED);
								CSUTILS.setInfo(undefined, SET_INFO.FACILITY_UNSUPPORTED, "Sign PDF: Unknown applet params : "+JSON.stringify(COO_DGFT.params));
							}
						}
					}
					else
					{
						if(downloadURL && uploadURL && token && returnUrl)
						{
							xsg2cpopup.getHandlePrompt("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled", function(flag, handle, saveHandle){
								
								if(flag === true)
								{
									// TO get signerInfo from xorkeesign
									COO_DGFT.getSigner({handle:handle, saveHandle:saveHandle}, undefined, function(xsSignerInfo){
										
										COO_DGFT.signPDF(xsSignerInfo);
									});
								}
							});
						}
						else
						{
							console.log("Unknown applet params");
							xsg2cpopup.showError(FACILITY_UNSUPPORTED);
							CSUTILS.setInfo(undefined, SET_INFO.FACILITY_UNSUPPORTED, "Sign PDF Unknown applet params : "+JSON.stringify(COO_DGFT.params));
						}
					}
				}
				
			}
			else
			{
				console.log("ERROR: Unable to get PDF : "+status);
				xsg2cpopup.showError(ERROR_PORTAL);
			}
			
		});
	},
};