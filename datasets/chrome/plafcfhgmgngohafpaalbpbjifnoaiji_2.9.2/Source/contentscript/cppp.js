console.log("CPPP | Contentscript deployed");

//var testkey = new Uint8Array([191,70,86,131,247,175,70,203,77,56,188,195,37,209,212,49]);	//test
var testkey = undefined;
var CPPP_PDF_PROFILE = {"Version":2,"isdemo":false,"BoxDimensions":{"width":300,"height":65},"BoxPosition":{"x":25,"y":25},"Page":0,"Stream":"","Fonts":[{"Name":"font1$","FontName":"Helvetica"}]};

function downloadDoc(buf)
{
	var url = "data:application/octet-stream;base64,"+buf;
	var b = document.createElement("a");
	b.href = url;
	b.id = "tmpLink";
	b.download = "a.dat";
	b.innerHTML = "Download Data";
	document.body.appendChild(b);
	try{ b.click();}catch(e){}
	setTimeout(function(){
		document.body.removeChild(b);
		//window.URL.revokeObjectURL(url);
	}, 100);
	return;
}


function cpppConvertType(jstr, key)
{
	var str = jstr;
	var dest;
	var s;
	
	dest = "";
	while((s = str.indexOf(key)) != -1)
	{
		s += key.length;
		while(str.charCodeAt(s) == 32) s++;	//skip spaces
		
		if(str.charAt(s) == ':')	//key identified
		{
			s++;	//skip :
			while(str.charCodeAt(s) == 32) s++;	//skip spaces
			dest += str.substring(0, s);	//copy all characters until the identified key
			dest += '"';	//add the starting "
			while(str.charCodeAt(s) >= 48 && str.charCodeAt(s) <= 57)	//copy all numbers (value of the specified key should be numbers only)
			{
				dest += str.charAt(s);
				s++;
			}
			dest += '"';	//add the ending "
		}
		//else not a key and ":" is part of data; so just continue
		
		str = str.substring(s);	//prepare the string for next iteration by copying the remaining characters after the parsed character
	}
	dest += str.substring(0);	//copy the remaining characters after the last identified position of the specified key
	return dest;
}

function cpppProcessJson(str)
{
	var x = str.replaceAll("&quot;", "\"");
	var y = "";
	y = cpppConvertType(x, '"packetId"');
	y = cpppConvertType(y, '"bidId"');
	y = cpppConvertType(y, '"workItemId"');
	y = cpppConvertType(y, '"id"');
	return y;
}


function uploadDocument(type, filename, url, doc, widgetCtx, cb)
{
	var plhead, plfoot, payload, resstatus, msg, i, ab, diffdate, rv, uploadname;
	
	if(type == G2C_MSG.CPPP_UPLOAD)
	{
		rv = filename.lastIndexOf(".");
		if(rv != -1) uploadname = filename.substring(0, rv)+".txt";
		else uploadname = filename+".txt";
	}
	else uploadname = filename;
	
	plhead = '--*****\r\nContent-Disposition: form-data; name="'+uploadname+'"; filename="'+uploadname+'"\r\nContent-Type: application/octat-stream\r\n\r\n';
	plfoot = '\r\n--*****--\r\n';
	ab = new ArrayBuffer(plhead.length+plfoot.length+doc.byteLength);
	payload = new Uint8Array(ab);
	
	for(i=0; i<plhead.length; i++) payload[i] = plhead.charCodeAt(i);
	for(i=0; i<doc.byteLength; i++) payload[plhead.length+i] = doc[i];
	for(i=0; i<plfoot.length; i++) payload[plhead.length+doc.byteLength+i] = plfoot.charCodeAt(i);
	//downloadDoc(XSCUTILS._arrayBufferToBase64(payload));
	//return;
	
	console.log(url);
	CSUTILS._otlSendRequest("POST", "multipart/form-data;boundary=*****", url, payload, "text", function(status, resp) {
		
		//clear the buffers
		payload = undefined;
		ab = undefined;
		
		if(status == 200)
		{
			console.log(resp);
			if(type == G2C_MSG.CPPP_BIDSIG)
			{
				if(resp.indexOf("SUCCESS") != -1)
				{
					widgetCtx.UploadProgress(100);
					xsg2cpopup.showInfo("Packet bid documents submitted successfully.", function(){
						msg = {};
						msg.type = type;
						//window.postMessage(msg);
						cb(0, msg);
					});
				}
				else if((rv = resp.indexOf("FAIL/")) != -1)
				{
					rv = parseInt(resp.substr(rv+5));	//2 digit error only
					if(rv == 2) cb(1, "Extract Folder could not be created on server. Please contact Administrator.");
					else if(rv == 3) cb(1, "Bid Submission Time is Over.");
					else if(rv == 4) cb(1, "Bid Packet Folder could not be created on server. Please contact Administrator.");
					else if(rv == 5) cb(1, "File(s) could not be verified after extracting on server. Please contact Administrator.");
					else if(rv == 6) cb(1, "Mismatch in keystore. Please contact Administrator.");
					else if(rv == 9) cb(1, "Exception occured while transferring the file(s).");
					else cb(1, "File(s) could not be transferred. Error code: "+rv);
				}
				else cb(2, "File(s) could not be transferred.");
			}
			else
			{
				rv = resp.indexOf("|");
				if(rv == -1) cb(2, "Signing aborted. Invalid response from the portal.");
				else
				{
					rv = parseInt(resp.substring(rv+1));
					if(rv == 100)
					{
						xsg2cpopup.showInfo("File signed successfully.", function(){
							msg = {};
							msg.type = type;
							msg.filename = filename;
							//window.postMessage(msg);
							cb(0, msg);
						});
					}
					else if(rv == 200) cb(1, "File sign/upload failed.<br>Virus found in the selected document. Signing Aborted !!");
					else if(rv == 201) cb(1, "File sign/upload failed.<br>Signing Aborted due to any of the following condition,<br>1.File size exceeds the limit 12 MB.<br>2.Internet connectivity issue.");
					else cb(2, "Signing aborted. Error code: "+rv);
					//TODO: check <br> tag rendering
				}
			}
		}
		else
		{
			console.log("CPPP: Upload failed with error "+status);
			cb(-1, "Upload failed with error "+status);
		}
	});
	return;
}

function getSigner(certificate, cb)
{
	xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
	
	var msg = {};
	msg.otltype = G2C_MSG.CPPP_GET_SIGNER;
	msg.certificate = certificate;
	
	chrome.runtime.sendMessage(
		msg,
		function(payload) {
			
			//console.log(resp);
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
			
			CSUTILS.promptListener(payload, function(userAction) {
		
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
					*/
					getSigner(certificate, cb);
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

function getLoginSignature(iscert, url, tbs, userid, commonName, xsSignerInfo, applyUnits)
{
	var msg, payload;
	
	if(url == undefined || tbs == undefined || userid == undefined)
	{
		xsg2cpopup.showError(ERROR_PORTAL);
		return;
	}
	
	xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
	
	msg = {};
	msg.otltype = G2C_MSG.CPPP_LOGIN;
	msg.xsSignerInfo = xsSignerInfo;
	msg.tbs = tbs;
	
	msg.params = {};
	msg.params.applyUnits = applyUnits;
	
	chrome.runtime.sendMessage(
		msg,
		function(resp) {
				
			//console.log(resp);
			if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
			resp.nameAsPerCeritificate = commonName;
			
			CSUTILS.promptListener(resp, function(userAction) {
		
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
						2. User not reachable(Signature request and applyUnits request)
					*/
					applyUnits = (applyUnits == true)?true:userAction.applyUnits;
					getLoginSignature(iscert, url, tbs, userid, commonName, xsSignerInfo, applyUnits);
				}
				else
				{
					if(resp.result == 0)
					{
						if(iscert == false && commonName != undefined)
						{
							if(commonName != resp.info.commonName)
							{
								xsg2cpopup.showError(`The name in the DSC <b>${resp.info.commonName}</b> doesn't match the name of the signatory <b>${commonName}</b> registered in the portal.<br><br>You can try again with a xorkee handle for the DSC carrying the name '${commonName}'.`);
								return;
							}
						}
						xsg2cpopup.showLoader("Waiting for the portal to accept the signature to login ...");
						
						payload = "";
						if(iscert == false) payload += ("ThumbPrint="+encodeURIComponent(resp.info.certificate)+"&");
						payload += ("UserId="+encodeURIComponent(userid)+"&");
						payload += ("SeedStr="+encodeURIComponent(tbs)+"&");
						payload += ("FeedBack="+encodeURIComponent(resp.signature)+"\n");
						//console.log(payload);
						
						CSUTILS._otlSendRequest1("POST", atob(url), payload, function(status, resp) {
							
							msg = {};
							msg.type = G2C_MSG.CPPP_LOGIN;
							if(status > 0)
							{
								if(resp.indexOf("{SUCCESS}") != -1) msg.success = true;
								else msg.success = false;
							}
							else msg.success = false;
							window.postMessage(msg);
							xsg2cpopup.removePopup();
						});
					}
					// else error prompt will be handled in promptListener function.
				}
			});
		}
	);
}

function doLogin(aparams)
{
	var msg = {}, commonname;
	
	commonname = (aparams["FEED_1"]!=undefined)?atob(aparams["FEED_1"]):undefined;
	if(aparams["FEED_5"] == undefined || aparams["FEED_5"].length <= 0)
	{
		//certificate is not available from portal; prompt the handle of the signer
		//use the handle to get the signature
		console.log("User certificate not available; Prompting for the user handle.", aparams["FEED_1"]);
		xsg2cpopup.getHandlePopup("Login", (commonname!=undefined)?`Enter the xorkee handle of <b>'${commonname}'</b> to login to the portal.`:`Enter the xorkee handle for the DSC registered with this portal.`, "Login will be cancelled.", function(flag, handle) {
			
			if(flag == true) getLoginSignature(false, aparams["FEED_2"], aparams["FEED_3"], aparams["FEED_6"], commonname, {handle:handle}, false);
		});
	}
	else
	{
		getSigner(aparams["FEED_5"], function(payload){
			
			getLoginSignature(true, aparams["FEED_2"], aparams["FEED_3"], aparams["FEED_6"], commonname, payload, false);
		});
	}
}

function doRegistration(aparams, handle, applyUnits, container, isEnrolled)
{
	var msg;
	
	xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
	
	msg = {};
	msg.otltype = G2C_MSG.CPPP_REGISTER;
	msg.xsSignerInfo = {handle:handle, isEnrolled:isEnrolled};
	msg.tbs = handle;	//signatures are not required in the portal but just check the private key possession
	
	
	msg.params = {};
	msg.params.certClassType = parseInt(aparams["FEED_6"]);	//certificate class type validated to be 2 or 3 in xorkeesign
	msg.params.applyUnits = applyUnits;
	if(aparams["FEED_2"] != "1") msg.params.registerEnc = true;
	msg.params.host = window.location.host;
	
	chrome.runtime.sendMessage(
		msg,
		function(resp) {
				
			//console.log(resp);
			if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
			
			CSUTILS.promptListener(resp, function(userAction) {
		
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
						2. User not reachable(Signature request and applyUnits request)
						3. encryptionkey not found on in token carrying the signing certificate
						4. encryptionkey not found on in any of the connected tokens
						
					*/
					applyUnits = (applyUnits == true)?true:userAction.applyUnits;
					
					if(resp.isEnrolled != undefined) isEnrolled = resp.isEnrolled;
					
					if(resp.enrolled != undefined && resp.enrolled == true) isEnrolled = true;
					
					doRegistration(aparams, handle, applyUnits, container, isEnrolled);
				}
				else
				{
					if(resp.result == 0)
					{
						if(aparams["FEED_2"] == "1")
						{
							submitRegistration(resp, aparams);
						}
						else
						{
							_epRegisterEncCert = new epRegisterEncCert();
							_epRegisterEncCert.create(container, resp.DSC, function(certificate){
								
								if(certificate == undefined)
								{
									xsg2cpopup.showError("Please select the certificate");
									return;
								}
								
								var msg = {};
								msg.otltype = G2C_MSG.GET_CERT_INFO;
								msg.certificate = certificate;
								
								xsg2cpopup.showLoader("Preparing to enroll the DSC ...");
								
								chrome.runtime.sendMessage(
								msg,
								function(resp) {
										
									//console.log(resp);
									if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
									
									// resp.removePrompt = false; // This will avoid removing loader prompt
									
									CSUTILS.promptListener(resp, function(userAction) {
										
										if(resp.result == 0)
										{
											submitRegistration(resp, aparams);
										}
									});
								});
								
							});
						}
					}
					// else error prompt will be handled in promptListener function.
				}
			});
		}
	);
}

function submitRegistration(resp, aparams)
{
	var rv, msg, payload, errmsg;
	
	xsg2cpopup.showLoader("Waiting for the portal to respond with the status of DSC enrollment ...");
	
	payload = "";
	payload += ("issuedTo="+encodeURIComponent(resp.info.subject)+"&");
	payload += ("uID="+encodeURIComponent(aparams["FEED_5"])+"&");
	payload += ("serialNo="+encodeURIComponent(resp.info.serialNumber)+"&");
	if(resp.info.certChain != undefined) payload += ("certPath="+encodeURIComponent(resp.info.certChain)+"&");	
	else payload += ("certPath=&");	
	payload += ("alias="+encodeURIComponent(resp.info.commonName)+"&");
	payload += ("issuer="+encodeURIComponent(resp.info.issuer)+"&");
	payload += ("certClassType="+encodeURIComponent(resp.info['class'])+"&");
	payload += ("validity="+encodeURIComponent(resp.info.validTill)+"&");
	payload += ("certificate="+encodeURIComponent(resp.info.certificate)+"&");
	payload += ("invalid="+encodeURIComponent("valid")+"&");
	payload += ("digestPK="+encodeURIComponent(resp.info.publicKey)+"&");
	payload += ("cdp="+((resp.info.crldp!=undefined)?encodeURIComponent(resp.info.crldp):"")+"&");
	payload += ("certType="+encodeURIComponent(aparams["FEED_2"])+"\n");
	//console.log(payload);
	
	CSUTILS._otlSendRequest1("POST", atob(aparams["FEED_3"]), payload, function(status, resp) {
		
		console.log(resp);
		msg = {};
		msg.type = G2C_MSG.CPPP_REGISTER;
		//identify the status of the action
		if(status > 0)
		{
			if(resp.indexOf("{SUCCESS}") != -1) msg.success = true;
			else msg.success = false;
			//identify the failure code
			if((rv = resp.indexOf("{CODE-")) != -1) msg.code = parseInt(resp.substr(rv+6, 3));
			else msg.code = 0;
		}
		else
		{
			msg.success = false;
			msg.code = 0;
		}
		
		//frame and display the status of the action to the user
		if(msg.success == true) 
		{
			xsg2cpopup.showInfo("DSC is enrolled successfully.", function(){
				
				console.log(msg);
				window.postMessage(msg);
			});
		}
		else
		{
			errmsg = "Failure! ";
			if(msg.code == 102) errmsg += "Data transmission to server failed.<br>Remove your eToken and plug in properly.";
			else if(msg.code == 103) errmsg += "Certificate is expired.";
			else if(msg.code == 200) errmsg += "Certificate is already used by another user.";
			else if(msg.code == 201) errmsg += "Certificate trusted chain validation failed.";
			else if(msg.code == 202) errmsg += "Certificate alias name is not read properly. Please Re-enroll again.";
			else errmsg += "DSC enrollment error occured in system.";
			
			xsg2cpopup.showError(errmsg, function() {
				
			//submit the status to web script which inturn will hand-over to the calling portal page
				console.log(msg);
				window.postMessage(msg);
			});
		}
	});
}

function getUploadDocSignature(xsSignerInfo, checksum, file, filebuf, aparams, applyUnits)
{
	var rv, out, res, msg;
	
	//frame the message to get the signature
	msg = {};
	msg.otltype = G2C_MSG.CPPP_DOCSIG;
	msg.xsSignerInfo = xsSignerInfo;
	msg.tbs = {};
	[rv, msg.tbs.tbs] = xsSHA1(xscpppFrameTBS(XSCUTILS.str2ab(checksum)));	//TBS will be atmost 59 bytes
	if(rv != 0)
	{
		console.log("Failed to compute file digest : ", rv, msg.tbs.tbs);
		xsg2cpopup.showError("Failed to compute digest. Please try again after some time.");
		return;
	}
	msg.tbs.tbs = B64.encode(msg.tbs.tbs);
	msg.tbs.filename = file.name;
	msg.tbs.applyUnits = applyUnits;
	
	chrome.runtime.sendMessage(
		msg,
		function(resp) {
				
			console.log(resp);
			if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
			
			CSUTILS.promptListener(resp, function(userAction) {
		
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
					*/
					applyUnits = (applyUnits == true)?true:userAction.applyUnits;
					getUploadDocSignature(resp, checksum, file, filebuf, aparams, applyUnits);
				}
				else
				{
					if(resp.result == 0)
					{
						rv = B64.decode(resp.signature);
						out = new Uint8Array(rv, 0, rv.length);
						//console.log("Cert CN: ", xsSignerInfo.commonName);
						res = xscpppFrameUpload(xsSignerInfo.commonName, file.name, filebuf, checksum, out);
						//downloadDoc(B64.encode(res));
						filebuf = undefined;
						
						xsg2cpopup.showLoader("Uploading the file ...");
						uploadDocument(G2C_MSG.CPPP_UPLOAD, file.name, aparams["FEED_2"], res, undefined, function(result, resultmsg) {
							
							res = undefined;	//clear the buffer
							if(result == 0)
							{
								xsg2cpopup.hideNotification();
								window.postMessage(resultmsg);
							}
							else xsg2cpopup.showError(resultmsg);
						});
					}
					// else error prompt will be handled in promptListener function.
				}
			});
		}
	);
}

function _cpppSignPDF(aparams, pdfbuf, digest, pdfSigPos, signer, applyUnits, filename)	//publisher
{
	var msg;
	
	msg = {};
	msg.otltype = G2C_MSG.CPPP_PDFSIG;
	msg.tbs = digest;
	msg.xsSignerInfo = signer;
	
	msg.params = {};
	msg.params.applyUnits = applyUnits;
	msg.params.filename = filename;
	
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
						2. User not reachable(Signature request and applyUnits request)
					*/
					applyUnits = (applyUnits == true)?true:userAction.applyUnits;
					_cpppSignPDF(aparams, pdfbuf, digest, pdfSigPos, signer, applyUnits, filename);
				}
				else
				{
					if(payload.result == 0)
					{
						CM_PDFEmbedSig(pdfbuf, XSCUTILS._base64ToArrayBuffer(payload.signature), pdfSigPos[0], function(pdf) {
							
							//console.log(pdf);
							xsg2cpopup.showLoader("Uploading the file ...");
							uploadDocument(G2C_MSG.CPPP_PDFSIG, filename, aparams["FEED_2"], pdf, undefined, function(result, resultmsg) {
								
								pdf = undefined;	//clear the buffer
								if(result == 0)
								{
									xsg2cpopup.hideNotification();
									window.postMessage(resultmsg);
								}
								else xsg2cpopup.showError(resultmsg);
							});
							
						}, function(msg) {
						
							console.log("ERROR embedding signatures | "+msg);
							xsg2cpopup.showError(ERROR_INVALIDPDF);
							
						});
					}
					// else error prompt will be handled in promptListener function.
				}
			});
		}
	);
}

function getUploadPDFSignature(xsSignerInfo, file, filebuf, aparams)	//publisher
{
	var rv, out, res, msg, date, datestr, pdfSigPos = [];
	
	date = new Date(xsSignerInfo.time * 1000);
	datestr = date.getFullYear()+"."+(date.getMonth()+1).toString().padStart(2,'0')+"."+(date.getDate()).toString().padStart(2,'0')+" "+(date.getHours()).toString().padStart(2,'0')+":"+(date.getMinutes()).toString().padStart(2,'0')+":"+(date.getSeconds()).toString().padStart(2,'0')+" IST";
	CPPP_PDF_PROFILE.Stream = btoa("BT\n0 0 0 rg\n/font1$ 10.0000 Tf\n1 0 0 1 10 50 Tm (Digitally signed by "+xsSignerInfo.info.subjectCommonName+") Tj\n1 0 0 1 10 40 Tm (Date: "+datestr+") Tj\n1 0 0 1 10 30 Tm (Location: "+aparams["FEED_4"]+") Tj\nET");
	// console.log(datestr);
	
	CM_PDFSetProfileV2(CPPP_PDF_PROFILE);
	CM_PDFMaxSignatureSize(xsSignerInfo.info.sigSize * 2);	//get the signature allocation size from xorkeesign (* 2 for HEX)
	CM_PDFAppendSigObjects(filebuf, null, "sha1", xsSignerInfo.handle, true, null, true, xsSignerInfo.info.sigSize * 2, function(pdf, digest, sigpos) {
		
		pdfSigPos = [sigpos, (xsSignerInfo.info.sigSize * 2)];
		_cpppSignPDF(aparams, pdf, XSCUTILS._arrayBufferToBase64(digest), pdfSigPos, xsSignerInfo, false, file.name);
		
	}, function(msg) {
	
		console.log("ERROR creating signature objects | "+msg);
		xsg2cpopup.showError(ERROR_INVALIDPDF);
	});
}

function createUploadWidget(container, aparams)
{
	var mimetypes;
	var _singleFileUpload = new singleFileUpload();
	const imageURLS = {
		upload: chrome.runtime.getURL('images/cppp/upload_icon.png'),
		sign: chrome.runtime.getURL('images/cppp/upload-scan.png')
	};
	
	if(aparams["FEED_4"] == undefined || aparams["FEED_4"].length <= 0)
	{
		xsg2cpopup.showError("Invalid parameter received. Check your user profile.");
		return;
	}
	
	switch(aparams["FEED_6"])
	{
		case "Model2":
			mimetypes = ".xls";
			break;
		case "Model3":
			mimetypes = ".pdf,.jpg";
			break;
		case "Model4":
			mimetypes = ".pdf,.rar,.xls";
			break;
		case "Model5":
			mimetypes = ".xml";
			break;
		case "Model6":
			mimetypes = ".xls,.pdf";
			break;
		case "Model7":
			mimetypes = ".pdf,.rar";
			break;
		case "Model8":
			mimetypes = ".pdf,.xls,.jpg";
			break;
		case "Model9":
			mimetypes = ".jpg,.png";
			break;
		case "Model10":
			mimetypes = ".json";
			break;
		case "Model11":
			mimetypes = ".pem,.crt,.cer";
			break;
		default:
			mimetypes = ".pdf";
			break;
	}
	
	_singleFileUpload.create(container, imageURLS, mimetypes, function(file, filebuf) {
		
		if(aparams["FEED_5"] != undefined && file.name != ("TPS_"+aparams["FEED_5"]+".xls"))
		{
			xsg2cpopup.showError("Please use the exact Goods TPS file ( 'TPS_"+aparams["FEED_5"]+".xls' ).");
			return;
		}
		
		getSigner(aparams["FEED_4"], function(resp){
			
			xsg2cpopup.showLoader("Preparing the file '"+file.name+"' ...");
			var i, rv, out, checksum;
			[rv, out] = xsMD5(XS_DIGEST_BLOCK_FIRST | XS_DIGEST_BLOCK_FINAL, file.size, null, filebuf);
			if(rv != 0) console.log(out);
			else
			{
				//to compute the document checksum, convert the digest to a lower case HEX string
				checksum = "";
				for(i=0; i<out.byteLength; i++) checksum += out[i].toString(16).padStart(2, '0');
				
				getUploadDocSignature(resp, checksum, file, filebuf, aparams, false);
			}
		});
		
	}, function(errstr) {
		console.log(errstr);
		xsg2cpopup.showError(errstr);
	});
}

function auctionSubmit(aparams, xsSignerInfo, val, applyUnits)
{
	var rv, out, res, msg, tbs;
	
	val = `${val}#${aparams["FEED_2"]}`;
	tbs = XSCUTILS.str2ab(val);
	
	//frame the message to get the signature
	msg = {};
	msg.otltype = G2C_MSG.CPPP_AUCTION_SUBMIT;
	msg.xsSignerInfo = xsSignerInfo;
	msg.tbs = {};
	[rv, msg.tbs.tbs] = xsSHA1(xscpppFrameTBS(tbs));	//TBS will be atmost 59 bytes
	if(rv != 0)
	{
		console.log("Failed to compute file digest : ", rv, msg.tbs.tbs);
		xsg2cpopup.showError("Failed to compute digest. Please try again after some time.");
		return;
	}
	msg.tbs.tbs = B64.encode(msg.tbs.tbs);
	msg.tbs.value = val;
	msg.tbs.applyUnits = applyUnits;
	
	chrome.runtime.sendMessage(
		msg,
		function(resp) {
				
			console.log(resp);
			if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
			
			CSUTILS.promptListener(resp, function(userAction) {
		
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
					*/
					applyUnits = (applyUnits == true)?true:userAction.applyUnits;
					auctionSubmit(aparams, xsSignerInfo, val, applyUnits)
				}
				else
				{
					if(resp.result == 0)
					{
						console.log(resp);
						rv = B64.decode(resp.signature);
						out = new Uint8Array(rv, 0, rv.length);
						
						msg = {};
						msg.type = G2C_MSG.CPPP_AUCTION_SUBMIT;
						
						msg.signature = xscpppFrameAuctionSignature(tbs, out);
						if(msg.signature == null)
						{
							xsg2cpopup.showPortalMsg("Auction Value signing failed.");
						}
						else
						{
							msg.signature = XSCUTILS._arrayBufferToBase64(msg.signature);
							window.postMessage(msg);
						}
					}
					// else error prompt will be handled in promptListener function.
				}
			});
		}
	);
}

function createAuctionDecimalWidget(container, aparams)
{
	var _epAuctionSubmit = new epAuctionDecimalSubmit();
	const imageURLS = {
		upload: chrome.runtime.getURL('images/cppp/upload_icon.png'),
		sign: chrome.runtime.getURL('images/cppp/upload-scan.png')
	};
	
	if(aparams["FEED_1"] == undefined || aparams["FEED_2"] == undefined)
	{
		xsg2cpopup.showPortalMsg("Mismatch found in applet parameter values.");
		return;
	}
	
	if(aparams["FEED_3"] == undefined) aparams["FEED_3"] = "2";
	
	_epAuctionSubmit.create(container, imageURLS, aparams["FEED_3"], function(val) {
		
		getSigner(aparams["FEED_1"], function(resp){
			
			xsg2cpopup.showLoader("Preparing to submit auction ...");
			
			auctionSubmit(aparams, resp, val);
		});
	});
}

function createAuctionWidget(container, aparams)
{
	var _epAuctionSubmit = new epAuctionSubmit();
	const imageURLS = {
		upload: chrome.runtime.getURL('images/cppp/upload_icon.png'),
		sign: chrome.runtime.getURL('images/cppp/upload-scan.png')
	};
	
	if(aparams["FEED_1"] == undefined || aparams["FEED_2"] == undefined)
	{
		xsg2cpopup.showPortalMsg("Mismatch found in applet parameter values.");
		return;
	}
	
	_epAuctionSubmit.create(container, imageURLS, function(val) {
		
		getSigner(aparams["FEED_1"], function(resp){
			
			xsg2cpopup.showLoader("Preparing to submit auction ...");
			
			auctionSubmit(aparams, resp, val);
		});
	});
}

function createPDFUploadWidget(container, aparams)	//publisher
{
	var _singleFileUpload = new singleFileUpload();
	const imageURLS = {
		upload: chrome.runtime.getURL('images/cppp/upload_icon.png'),
		sign: chrome.runtime.getURL('images/cppp/upload-scan.png')
	};
	
	if(aparams["FEED_3"] == undefined || aparams["FEED_3"].length <= 0)
	{
		xsg2cpopup.showError("Invalid parameter received. Check your user profile.");
		return;
	}
	else if(aparams["FEED_1"] == undefined || aparams["FEED_1"].length <= 0)
	{
		xsg2cpopup.showError("File save path is missing");
		return;
	}
	
	_singleFileUpload.create(container, imageURLS, ".pdf", function(file, filebuf) {
		
		getSigner(aparams["FEED_3"], function(resp){
			
			xsg2cpopup.showLoader("Preparing the file '"+file.name+"' ...");
			getUploadPDFSignature(resp, file, filebuf, aparams);
		});
		
	}, function(errstr) {
		console.log(errstr);
		xsg2cpopup.showError(errstr);
	});
}

function frameBidPayload(bidCtx, appDocs, docsigarr, serfilename)
{
	var i, rv, sdo, docsig, signature, filetype;
	var crc1, ulen1, crc2, ulen2, buf;
	
	//console.log(bidCtx);
	//console.log(B64.encode(bidCtx.key));
	
	for(i=0; i<bidCtx.docs.length; i++)
	{
		rv = B64.decode(docsigarr[i]);
		docsig = new Uint8Array(rv, 0, rv.length);
		
		[rv, signature, crc1, ulen1, sdo, crc2, ulen2] = xscpppAddBidDoc(bidCtx.bidDoc, bidCtx.docs[i].adocparam, bidCtx.docs[i].filename, appDocs[i].type+".txt", bidCtx.docs[i].docAB, docsig, bidCtx.key);
		if(rv == null)
		{
			console.log("ERROR : Unable to add the bid document | "+bidCtx.docs[i].filename);
			signature = undefined;
			sdo = undefined;
			docsig = undefined;
			return null;
		}
		if(bidCtx.bidDoc == null) bidCtx.bidDoc = rv;	//preserve the first context to feed later
		docsig = undefined;	//clear the prepared user signature buffer
		//console.log(B64.encode(signature));
		//console.log(B64.encode(sdo));
		
		//add "signature" and "sdo" buffers to JAR
		//console.log("Adding signature to JAR", crc1, ulen1);
		rv = xsjarSetFile(bidCtx.jar, signature, ulen1, appDocs[i].type+".txt", crc1);
		if(rv == null)
		{
			console.log("ERROR : Unable to add signature to JAR | "+bidCtx.docs[i].filename);
			signature = undefined;
			sdo = undefined;
			return null;
		}
		if(bidCtx.jar == null) bidCtx.jar = rv;	//preserve the first context to feed later
		signature = undefined;	//clear the framed signature buffer
		
		//console.log("Adding signature metafile to JAR", crc2, ulen2);
		if(xsjarSetFile(bidCtx.jar, sdo, ulen2, appDocs[i].type+".md5", crc2) == null)
		{
			console.log("ERROR : Unable to add signature metafile to JAR | "+bidCtx.docs[i].filename);
			sdo = undefined;
			return null;
		}
		sdo = undefined;	//clear the framed SDO buffer
	}
	
	[buf, crc1, ulen1] = xscpppBidFinalize(bidCtx);
	if(buf == null)
	{
		console.log("ERROR : Unable to create bid metafile");
		return null;
	}
	//console.log(B64.encode(buf));
	
	//add "buf" to JAR and serialize the archive
	//console.log("Adding server metafile to JAR", crc1, ulen1);
	if(xsjarSetFile(bidCtx.jar, buf, ulen1, serfilename, crc1) == null)
	{
		console.log("ERROR : Unable to add server metafile to JAR | "+bidCtx.docs[i].filename);
		buf = undefined;
		return null;
	}
	buf = undefined;	//clear the temporary buffer
	
	if((buf = xsjarCreateArchive(bidCtx.jar)) == null)
	{
		console.log("ERROR : Unable to create upload JAR");
		return null;
	}
	return buf;
}

function getBidSignature(widgetCtx, xsSignerInfo, bidCtx, appDocs, serfilename, jarfilename, submitUrl, applyUnits, cb)
{
	var i, buf, msg, doc;
	
	msg = {};
	msg.otltype = G2C_MSG.CPPP_BIDSIG;
	msg.xsSignerInfo = xsSignerInfo;
	//store some context to be displayed in xorkee app
	msg.docs = [];
	for(i=0; i<bidCtx.docs.length; i++)
	{
		doc = {};
		doc.tbs = B64.encode(bidCtx.docs[i].docDigestAB);
		doc.filename = bidCtx.docs[i].filename;
		doc.docindex = i+1;
		doc.doccount = bidCtx.docs.length;
		doc.applyUnits = applyUnits;
		msg.docs.push(doc);
	}
	
	xsg2cpopup.showLoader("Waiting for signature ...");
	chrome.runtime.sendMessage(
		msg,
		function(resp) {
			console.log(resp);
			if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
			
			CSUTILS.promptListener(resp, function(userAction) {

				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
					*/
					applyUnits = (applyUnits == true)?true:userAction.applyUnits;
					getBidSignature(widgetCtx, xsSignerInfo, bidCtx, appDocs, serfilename, jarfilename, submitUrl, applyUnits, cb);
				}
				else
				{
					if(resp.result == 0)
					{
						widgetCtx.signProgress(100);
						xsg2cpopup.showLoader("Preparing the bid for upload ...");
						buf = frameBidPayload(bidCtx, appDocs, resp.signatures, serfilename);
						if(buf == null)
						{
							cb(-1, "Error preparing the bid. Please try again after some time.");
						}
						else
						{
							//console.log(B64.encode(buf));
							//upload the serialized JAR archive to "submitUrl"
							widgetCtx.UploadProgress(25);
							xsg2cpopup.showLoader("Uploading the bid ...");
							uploadDocument(G2C_MSG.CPPP_BIDSIG, jarfilename, submitUrl, buf, widgetCtx, cb);
						}
					}
					// else error prompt will be handled in promptListener function.
				}
			});
		}
	);
}

function loadBidSubmissionWidget(container, bidCtx, appDocs, submitUrl, serfilename, jarfilename, xsSignerInfo, appGeneric)
{
	var _epUploadFiles = new epUploadFiles();
	var i, rv, msg, buf, doc, docs, xlsCustomProps, errstr;
	var sdo, signature, docsig, tbs, filebuf, filename;
	var crc1, ulen1, crc2, ulen2;
	const imagesRef = {
		tick: chrome.runtime.getURL('images/cppp/checked_2.gif'),
		cross: chrome.runtime.getURL('images/cppp/delete_2.gif'),
		browse: chrome.runtime.getURL('images/cppp/upload_document.png'),
		upload: chrome.runtime.getURL('images/cppp/up.gif'),
		clearAll: chrome.runtime.getURL('images/cppp/recycle.gif'),
		clearSel: chrome.runtime.getURL('images/cppp/cross.gif')
	};
	
	//load the interface
	_epUploadFiles.create(container, imagesRef, appDocs, function(index, file) {	//file selection callback
		
		console.log("Selected file index: "+index, file);	//1-based index
		if(appDocs[index-1].isBoqFile == "true")
		{
			if(file.name != "BOQ_"+appGeneric.workItemId+".xls")
			{
				xsg2cpopup.showError("BOQ file does not match with required name as 'BOQ_"+appGeneric.workItemId+".xls'.");
				_epUploadFiles.clear(index);	//clear the selected file
				return;
			}
		}
		
	}, function(files) {	//upload callback
	
		console.log(files);
		//will be triggered when upload and sign button is clicked
		//the button will be enabled only when all the files are selected
		//console.log("Upload & Sign");
		
		//prepare and store the context in bidCtx.docs
		bidCtx.docs = [];
		
		for(i=0; i<files.length; i++)
		{
			xsg2cpopup.showLoader("Preparing the file '"+files[i].name+"' ...");
			
			if(appGeneric.validateBoqVersion == "true" && appDocs[i].isBoqFile == "true")
			{
				try {
					[xlsCustomProps, errstr] = _xlsGetCustomProps(files[i].buf);
					console.log(xlsCustomProps);
				} catch(e) {
					xsg2cpopup.showError("BOQ file is protected/Unable to read BOQ file.");
					console.log("ERROR: Unable to read the BOQ XLS file");
					console.log(e);
					_epUploadFiles.clear(i+1);	//clear the selected file
					files = undefined;
					bidCtx.docs = [];
					return;
				}
				
				if(xlsCustomProps == null)
				{
					xsg2cpopup.showError("BOQ file is protected/Unable to read BOQ file.");
					console.log("ERROR: "+errstr);	//TODO: send the error to xorkeesign
					_epUploadFiles.clear(i+1);	//clear the selected file
					files = undefined;
					bidCtx.docs = [];
					return;
				}
				else
				{
					if(xlsCustomProps.BoQStatus === undefined || xlsCustomProps.BoQVersion === undefined || xlsCustomProps.BoQChartType === undefined)
					{
						xsg2cpopup.showError("The Uploaded BOQ is not valid for this Tender.");
						_epUploadFiles.clear(i+1);	//clear the selected file
						files = undefined;
						bidCtx.docs = [];
						return;
					}
					else if(xlsCustomProps.BoQStatus === null || xlsCustomProps.BoQStatus !== "CC")
					{
						xsg2cpopup.showError("Bidder BOQ status does not comply.");
						_epUploadFiles.clear(i+1);	//clear the selected file
						files = undefined;
						bidCtx.docs = [];
						return;
					}
					else if((appGeneric.fileHash !== undefined && appGeneric.fileHash !== null) && (xlsCustomProps.HH !== undefined && xlsCustomProps.HH !== null) && (xlsCustomProps.HH != appGeneric.fileHash))
					{
						xsg2cpopup.showError("Mismatch found between the Uploaded and Published BOQ for the tender.");
						_epUploadFiles.clear(i+1);	//clear the selected file
						files = undefined;
						bidCtx.docs = [];
						return;
					}
				}
			}
			
			doc = {};
			doc.filename = files[i].name;
			doc.docAB = files[i].buf;
			tbs = xscpppFrameTBS(files[i].buf);
			if(tbs == null)
			{
				console.log("Failed to frame the TBS for the document");
				xsg2cpopup.showError("Failed to frame the TBS for the document. Please try again after some time.");
				_epUploadFiles.clear(i+1);	//clear the selected file
				files = undefined;
				bidCtx.docs = [];
				return;
			}
			[rv, doc.docDigestAB] = xsSHA1(tbs);
			if(rv != 0)
			{
				console.log("Failed to compute file digest : ", rv, doc.docDigestAB);
				xsg2cpopup.showError("Failed to compute digest. Please try again after some time.");
				_epUploadFiles.clear(i+1);	//clear the selected file
				files = undefined;
				bidCtx.docs = [];
				return;
			}
			doc.adocparam = appDocs[i];	//save the corresponding document information from applet json payload
			
			bidCtx.docs.push(doc);
			
			tbs = null;	//clear the memory
		}
		files = undefined;	//clear the memory used to store the selected file buffers
		
		getBidSignature(_epUploadFiles, xsSignerInfo, bidCtx, appDocs, serfilename, jarfilename, submitUrl, false, function(result, resultmsg) {
			if(result == 0)
			{
				_epUploadFiles.UploadProgress(100);
				_xscpppClearBidCtx(bidCtx.bidPacket, bidCtx.bidOpener, bidCtx.bidGeneric, bidCtx.bidDoc, bidCtx.bidFactor);
				_xsjarClean(bidCtx.jar);
				bidCtx.docs = [];
				bidCtx.jar = null;
				bidCtx = undefined;
				_epUploadFiles.clear(0);	//clear all the selected files
				
				xsg2cpopup.hideNotification();
				window.postMessage(resultmsg);
			}
			else
			{
				//do not clear the selected files; user can retry
				//to allow retrying, clear the loaded document information alone from 'bidCtx'
				_xscpppClearBidCtx(null, null, null, bidCtx.bidDoc, null);
				_xsjarClean(bidCtx.jar);
				bidCtx.jar = null;
				
				_epUploadFiles.signProgress(0);
				_epUploadFiles.UploadProgress(0);
				xsg2cpopup.showError(resultmsg);
			}
		});
		
	}, function(index) {	//clear callback
		
		//index - 0 -> Clear All; else - 1 based file index
		console.log("Clear", index);
		//console.log(bidCtx);
		//the callback will not be invoked when cleared from the program
		if(bidCtx != undefined && bidCtx != null)
		{
			if(index == 0)
			{
				bidCtx.docs = [];
			}
			else if(index <= bidCtx.docs.length)
			{
				bidCtx.docs.splice(index-1, 1);	//clear previously loaded file if any
				console.log(bidCtx.docs);
			}
		}
		
	}, function(errstr) {	//error callback
		xsg2cpopup.showError(errstr);
		_epUploadFiles.signProgress(0);
		_epUploadFiles.UploadProgress(0);
	});
}

function createBidSubmissionWidget(container, aparams)
{
	var i, msg, json;
	var bidCtx = undefined;
	
	if(aparams["FEED_1"] == undefined)
	{
		xsg2cpopup.showError("APPLET params not found. Please try again after some time.");
		return;
	}
	else
	{
		try {
			const reviver = (key, value) => {
				if(key === "packetId" || key === "bidId" || key === "workItemId" || key === "boTypeId" || key === "id") return BigInt(value);
				return value;
			};
			json = JSON.parse(cpppProcessJson(aparams["FEED_1"]), reviver);
			
			if(json.generic_applet == undefined || json.generic_applet.length != 1 || json.packet_applet == undefined || json.packet_applet.length != 1 || json.openerkey_applet == undefined || json.openerkey_applet.length <= 0 || json.documents_applet == undefined || json.documents_applet.length <= 0 || json.generic_applet[0].thumbPrint == undefined || json.generic_applet[0].portUrl == undefined || json.generic_applet[0].bidId == undefined || json.generic_applet[0].workItemId == undefined || json.packet_applet[0].packetId == undefined || json.packet_applet[0].packetRefNo == undefined)
			{
				xsg2cpopup.showError("Invalid or unsupported bid format. Please try again after some time.");
				console.log(aparams["FEED_1"]);
				console.log(cpppProcessJson(aparams["FEED_1"]));
				return;
			}
			for(i=0; i<json.documents_applet.length; i++)
			{
				if(json.documents_applet[i].id == undefined || json.documents_applet[i].name == undefined || json.documents_applet[i].description == undefined || json.documents_applet[i].type == undefined || json.documents_applet[i].sNo == undefined)
				{
					xsg2cpopup.showError("Invalid or unsupported bid document format. Please try again after some time.");
					console.log(aparams["FEED_1"]);
					console.log(cpppProcessJson(aparams["FEED_1"]));
					return;
				}
			}
			for(i=0; i<json.openerkey_applet.length; i++)
			{
				if(json.openerkey_applet[i].id == undefined || json.openerkey_applet[i].bidOpenerPublicKey == undefined)
				{
					xsg2cpopup.showError("Invalid or unsupported bid opener format. Please try again after some time.");
					console.log(aparams["FEED_1"]);
					console.log(cpppProcessJson(aparams["FEED_1"]));
					return;
				}
			}
			
			getSigner(json.generic_applet[0].thumbPrint, function(resp){
				
				//initialize the BidSubmission library context
				bidCtx = xscpppBidInit(json, testkey);
				if(bidCtx == null)
				{
					xsg2cpopup.showError("Failed to initialize library. Please try again after some time.");
					return;
				}
				bidCtx.docs = [];
				bidCtx.jar = null;
				
				loadBidSubmissionWidget(container, bidCtx, json.documents_applet, window.atob(json.generic_applet[0].portUrl), json.packet_applet[0].packetId+"_meta.ser", json.generic_applet[0].bidId+"-"+json.generic_applet[0].workItemId+"-"+json.packet_applet[0].packetId+"-"+json.packet_applet[0].packetRefNo+".jar", resp, json.generic_applet[0]);
			});
			
		} catch(e) {
			xsg2cpopup.showError("Invalid APPLET params. Please try again after some time.");
			return;
		}
	}
}

function getContext(certificate, commonName, count, cb)
{
	xsg2cpopup.showLoader("Opening the bid ...");
	
	var msg = {};
	msg.otltype = G2C_MSG.GET_BULK_CONTEXT;
	msg.certificate = certificate;
	msg.count = count;
	if(certificate == undefined) msg.commonName = commonName;
	
	chrome.runtime.sendMessage(
		msg,
		function(payload) {
			
			//console.log(resp);
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
			
			CSUTILS.promptListener(payload, function(userAction) {
				
				if(payload.result == 0)
				{
					cb(payload);
				}
				// else error prompt will be handled in promptListener function.
			});
		}
	);
}

function updateDecryption(json, index, data, _epDecryptFiles, xsInfo, cb)
{
	var payloadData, i, bididCount, bidDecryptedCount, promptTxt, msg;
	
	// Update the decrypted data
	json.fragments_array[index].decryptionkey = data;
	
	// For a bidid there can be more than one encrypted data.
	// Total bid count and decrypted count for a bidid is identified here for updating the table status
	bididCount = 0;
	bidDecryptedCount = 0;
	for(i=0; i<json.fragments_array.length; i++)
	{
		if(json.fragments_array[i].bidid === json.fragments_array[index].bidid) 
		{
			bididCount++;
			if(json.fragments_array[i].decryptionkey != "null") bidDecryptedCount++;
		}
	}
	
	if(bididCount === bidDecryptedCount) 
	{
		// If all the data is decrypted, progress bar and table status will be updated
		_epDecryptFiles.updateStatus(json.fragments_array[index].bidid);
	}
	
	if(index >= json.fragments_array.length-1)
	{
		xsGetDataFinalize(xsInfo.context);
		
		// All the data has been decrypted
		//console.log(json.fragments_array);
		payloadData = ("xml="+encodeURIComponent(JSON.stringify(json))+"\n");
		//console.log(payloadData);
		
		xsg2cpopup.showLoader("Waiting for the portal to respond with the status of decryption ...");
		
		CSUTILS._otlSendRequest1("POST", json.return_Url, payloadData, function(status, resp) {
			
			msg = {};
			msg.type = G2C_MSG.CPPP_DECRYPT;
			if(status > 0)
			{
				if(resp.indexOf("{SUCCESS}") != -1) 
				{
					promptTxt = "Decryption completed successfully.";
					msg.success = true;
				}
				else 
				{
					if(resp.indexOf("{FAILUREMINBODECRYPTEDBID}") != -1) 
					{
						promptTxt = "Minimum required bid openers have already decrypted this packet.";
					}
					else if(resp.indexOf("{FAILUREDECKEYLENGTHMISMATCH}") != -1) 
					{
						promptTxt = "Mismatch found in Decryption Key Length.";
					}
					else
					{
						promptTxt = "Decryption failed due to any one of the following reasons.<br><br>1.Certificate which is required for decrypting this tender is not available in the DSC/eToken.<br>2.Insufficient data received to decrypt.<br>3. Minimum required bid openers have already decrypted this packet.";
					}
					msg.success = false;
				}
			}
			else
			{
				msg.success = false;
				promptTxt = "Decryption failed due to any one of the following reasons.<br><br>1.Certificate which is required for decrypting this tender is not available in the DSC/eToken.<br>2.Insufficient data received to decrypt.<br>3. Minimum required bid openers have already decrypted this packet.";
			}
			
			xsg2cpopup.showPortalMsg(promptTxt, function(){
				
				_epDecryptFiles.reset();
				window.postMessage(msg);
			});
		});
	}
	else cb();
}

function xsGetDataFinalize(context)
{
	var msg = {};
	msg.otltype = G2C_MSG.BULK_PROCESS;
	msg.processType = BULK_PROCESS_TYPE.FINALIZE;
	msg.context = context;
	
	chrome.runtime.sendMessage(msg, function(message) {console.log("Context cleared");});
}

function decryptBid(index, xsInfo, json, _epDecryptFiles, bidderCount)
{
	
	xsg2cpopup.showLoader("Decrypting the bids ...");
	
	var msg;
	
	msg = {};
	msg.otltype = G2C_MSG.BULK_PROCESS;
	msg.processType = BULK_PROCESS_TYPE.DECRYPT;
	msg.payload = json.fragments_array[index].encryptionkey;
	
	msg.xsInfo = xsInfo;
	
	msg.params = {};
	msg.params.bidid = json.fragments_array[index].bidid;
	msg.params.packetName = json.fragments_array[index].packetName;
	msg.params.decryptIndex = index;
	msg.params.bidderCount = bidderCount;
	msg.params.packetType = json.packet_type;

	chrome.runtime.sendMessage(
		msg,
		function(payload) {
			
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
			
			payload.removePrompt = false; // This flag will avoid hiding the loader prompt after success response from server.
			
			CSUTILS.promptListener(payload, function(userAction) {
				
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. User not reachable
						2. encryptionkey not found on in signing certificate
						3. encryptionkey not found on in any of the certificate
						4. Context expired
					*/
					
					if(payload.result == XS_ERRCODE.INVALID_CONTEXT)
					{
						// If context returned from xorkeesign is expired (It mostly happens in user not reachable case). New context is fetched from server and the process is continued.
						getContext(json.thumbPrint, json.aliasName, json.fragments_array.length, function(xsInfo){
							
							decryptBid(index,  xsInfo, json, _epDecryptFiles, bidderCount);
						});
					}
					else decryptBid(index, xsInfo, json, _epDecryptFiles, bidderCount)
				}
				else
				{
					if(payload.result == 0)
					{
						// Uploading the total decrypted data to the return URL is handled inside updateDecryption function
						updateDecryption(json, index, payload.data, _epDecryptFiles, xsInfo, function(){
							
							// Decrypt next data
							decryptBid(++index,  xsInfo, json, _epDecryptFiles, bidderCount);
						});
					}
					else
					{
						/*
							Displaying error prompt will be handled in promptListener function.
							
							If the signature request is cancelled. xorkeesign context need to clear and the table status need to resetted.
						*/
						_epDecryptFiles.reset();
						
						xsGetDataFinalize(xsInfo.context);
					}
				}
			});
		}
	);
}

function createBidOpenWidget(container, aparams)
{
	var json;
	
	try 
	{
		// JSON validation
		json = JSON.parse(aparams["FEED_1"]);
		if(json.fragments_array == undefined || json.return_Url == undefined)
		{
			xsg2cpopup.showError("Insufficient input data. Please contact system administrator.");
			return;
		}
	}
	catch(e)
	{
		console.log(e);
		xsg2cpopup.showError("Insufficient input data. Please contact system administrator.");
		return;
	}
	console.log(json);
	
	if(json.thumbPrint == undefined || json.thumbPrint == "" || json.thumbPrint == null)
	{
		xsg2cpopup.showError(FACILITY_UNSUPPORTED);
			
		try
		{
			var extmsg = {};
			extmsg.type = G2C_MSG.SET_INFO;
			extmsg.action = "facilityUnsupported";
			extmsg.message = btoa(JSON.stringify(json));
		
			chrome.runtime.sendMessage(extmsg, function(){console.log("Decryption using certificate commonName");});
		} 
		catch(e) {console.log(e)};
		return;
	}
	
	//JSON.parse replaces all occurences of "\\/" with "/"; do it here to be on a safer side
	json.thumbPrint = json.thumbPrint.replaceAll("\\/", "/");
	json.return_Url = json.return_Url.replaceAll("\\/", "/");
	
	var _epDecryptFiles = new epDecryptFiles();
	var displayData = [];
	
	//remove duplicate bidid for display purpose only
	displayData = [...new Map(json.fragments_array.map(item => [item["bidid"], item])).values()];
	
	_epDecryptFiles.create(container, displayData, function(){
		
		// Proceed button onClick
		
		getContext(json.thumbPrint, json.aliasName, json.fragments_array.length, function(xsInfo){
			
			decryptBid(0, xsInfo, json, _epDecryptFiles, displayData.length);
		});
		
	});
	
}

function getDocSignature(index, xsSignerInfo, file, aparams, cb)
{
	
	if(index === file.length) {
		return cb(file);
	}
	
	var rv, out, res, msg;
	
	//frame the message to get the signature
	msg = {};
	msg.otltype = G2C_MSG.CPPP_DOCSIG;
	msg.xsSignerInfo = xsSignerInfo;
	msg.tbs = {};
	[rv, msg.tbs.tbs] = xsSHA1(xscpppFrameTBS(XSCUTILS.str2ab(file[index].checksum)));	//TBS will be atmost 59 bytes
	if(rv != 0)
	{
		console.log("Failed to compute file digest : ", rv, msg.tbs.tbs);
		xsg2cpopup.showError("Failed to compute digest. Please try again after some time.");
		return;
	}
	msg.tbs.tbs = B64.encode(msg.tbs.tbs);
	msg.tbs.filename = file[index].name;
	
	chrome.runtime.sendMessage(
		msg,
		function(resp) {
				
			console.log(resp);
			if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_CPPP);
			
			CSUTILS.promptListener(resp, function(userAction) {
		
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
					*/
					getDocSignature(index, xsSignerInfo, file, aparams, cb);
				}
				else
				{
					if(resp.result == 0)
					{
						rv = B64.decode(resp.signature);
						out = new Uint8Array(rv, 0, rv.length);
						//console.log("Cert CN: ", xsSignerInfo.commonName);
						res = xscpppFrameUpload(xsSignerInfo.commonName, file[index].name, file[index].buf, file[index].checksum, out);
						//downloadDoc(B64.encode(res));
						file[index].buf = undefined;
						file[index].res = res;
						
						getDocSignature(++index, xsSignerInfo, file, aparams, cb);
					}
					// else error prompt will be handled in promptListener function.
				}
			});
		}
	);
}

function createFileSignWidget(container, aparams) {
	var json, i, rv, out, checksum, j, ctx, buf, rv1, ocrc;
	
	try 
	{
		// JSON validation
		json = JSON.parse(aparams["FEED_1"]);
		if(json.generic_input == undefined || json.documents_input == undefined || json.generic_input.length === 0 || json.documents_input.length === 0 || !json.generic_input[0].thumbPrint || !json.generic_input[0].workItemId || !json.generic_input[0].returnUrl)
		{
			xsg2cpopup.showError("Insufficient input data. Please contact system administrator.");
			try
			{
				var extmsg = {};
				extmsg.type = G2C_MSG.SET_INFO;
				extmsg.action = "facilityUnsupported";
				extmsg.message = btoa(aparams);
			
				chrome.runtime.sendMessage(extmsg, function(){console.log("Insufficient input data");});
			} 
			catch(e) {console.log(e)};
			return;
		}
	}
	catch(e)
	{
		console.log(e);
		xsg2cpopup.showError("Insufficient input data. Please contact system administrator.");
		return;
	}
	console.log(json);
	
	getSigner(json.generic_input[0].thumbPrint, function(xsSignerInfo){
	
		var _epFileSign = new epFileSign();
		
		const imagesRef = {
			browse: chrome.runtime.getURL('images/cppp/upload_document.png'),
			upload: chrome.runtime.getURL('images/cppp/up.gif'),
		};
		
		//load the interface
		_epFileSign.create(container, imagesRef, json.documents_input, function(index, file) {	//file selection callback
			
			console.log("Selected file index: "+index);	//1-based index
			
		}, function(files) {	//upload callback
		
			for(i=0; i<files.length; i++) {
				
				[rv, out] = xsMD5(XS_DIGEST_BLOCK_FIRST | XS_DIGEST_BLOCK_FINAL, files[i].buf.byteLength, null, files[i].buf);
				if(rv != 0) console.log(out);
				else
				{
					//to compute the document checksum, convert the digest to a lower case HEX string
					checksum = "";
					for(j=0; j<out.byteLength; j++) checksum += out[j].toString(16).padStart(2, '0');
					
					files[i].checksum = checksum;
				}
			}
			
			getDocSignature(0, xsSignerInfo, files, aparams, () => {
				
				ctx = null;
				
				for(i=0; i<files.length; i++) {
					
					xsg2cpopup.showLoader("Preparing the file '"+files[i].name+"' ...");
					
					[buf, rv1, ocrc] = xscpppGetCompressed(files[i].res);
					if(buf == null)
					{
						console.log("ERROR : Unable to xscpppGetCompressed | "+files[i].name);
						files[i].res = undefined;
						if(ctx) _xsjarClean(ctx);
						return null;
					}
					
					rv = files[i].name.lastIndexOf(".");
					rv = files[i].name.substr(0, rv < 0 ? files[i].name.length : rv) + ".txt";
					
					rv = xsjarSetFile(ctx, buf, files[i].res.byteLength, rv, ocrc);
					if(rv == null)
					{
						console.log("ERROR : Unable to add signature to JAR | "+files[i].name);
						files[i].res = undefined;
						if(ctx) _xsjarClean(ctx);
						return null;
					}
					if(ctx == null) ctx = rv;	//preserve the first context to feed later
					files[i].res = undefined;	//clear the framed signature buffer
					buf = null;
				}
				
				if((out = xsjarCreateArchive(ctx)) == null)
				{
					console.log("ERROR : Unable to create upload JAR");
					if(ctx) _xsjarClean(ctx);
					return null;
				}
				
				// downloadDoc(B64.encode(out));
				
				xsg2cpopup.showLoader("Uploading the file ...");
				
				uploadDocument(G2C_MSG.CPPP_FILE_SIGN, json.generic_input[0].workItemId+".jar", json.generic_input[0].returnUrl, out, undefined, function(result, resultmsg) {
					
					if(result == 0)
					{
						xsg2cpopup.hideNotification();
						window.postMessage(resultmsg);
					}
					else xsg2cpopup.showError(resultmsg);
					
					out = undefined;	//clear the buffer
					_xsjarClean(ctx);
					files = null;
				});
			});
			
		}, function(errstr) {	//error callback
			xsg2cpopup.showError(errstr);
		});
	});
}

function replaceObjectContainer(applet)
{
	var con = document.createElement("div");
	//con.style.background = "aqua";
	con.style.width = applet.getAttribute('width');
	con.style.height = applet.getAttribute('height')
	con.style.overflow = "auto";
	applet.parentElement.insertBefore(con, applet);
	applet.parentElement.removeChild(applet);
	return con;
}

function objectGetParams(elem)
{
	var obj = {};
	paramElemArr = elem.getElementsByTagName('param');
	for(var i = 0 ; i < paramElemArr.length; i++)
	{
		obj[paramElemArr[i].getAttribute('name')] = paramElemArr[i].getAttribute('value');
	}
	return obj;
}

function doObjectAction(appletTagArr)
{
	var elem, applet, javaClassType, container, archive;
	var CPPP_APPLET_PARAMS = undefined;
	
	for(var i=0; i<appletTagArr.length; i++)
	{
		applet = appletTagArr[i];
		javaClassType = applet.getAttribute('classid');
		archive = applet.getAttribute("archive");
		if(archive == null) archive = "";
		else archive = archive.toLowerCase();
		
		CPPP_APPLET_PARAMS = objectGetParams(applet);
		console.log("Applet Type: "+javaClassType);
		console.log("Applet Params");
		console.log(CPPP_APPLET_PARAMS);
		
		if(javaClassType == "java:gov.nic.verifyDsc.gui.VerifyDSC.class" && archive.indexOf("verifydsc.jar") != -1)	//Login
		{
			container = replaceObjectContainer(applet);
			//TODO: check the placement of background image
			container.style.backgroundPosition = "center";
			container.style.backgroundRepeat = "no-repeat";
			container.style.cursor = "pointer";
			//container.style.backgroundSize = "cover";
			container.style.backgroundImage = "url('"+chrome.runtime.getURL('images/cppp/login.gif')+"')";
			container.onclick = function() {
				doLogin(CPPP_APPLET_PARAMS);
			};
			
			CSUTILS.extGetMessage();
			
			return true;
		}
		else if(javaClassType == "java:gov.nic.keyupload.gui.KeyRegister.class" && archive.indexOf("keyregister") != -1)	//RegisterDSC
		{
			container = replaceObjectContainer(applet);
			btn = xsg2cpopup.createButton(container, "Click here to register DSC");
			
			btn.onclick = function(){
			
				xsg2cpopup.getHandlePopup("DSC Enrollment", (CPPP_APPLET_PARAMS["FEED_2"]==1)?"You require a xorkee handle for a valid DSC in your e-Token to enroll the DSC.":"If you have your encryption and signature DSCs in different tokens, you need both of them to be plugged-in to the same system<br><br>xorkeesign India G2C uses your xorkee handle for registering or using encryption DSC also", "DSC enrollment will be cancelled", function(flag, handle) {
					if(flag == true) doRegistration(CPPP_APPLET_PARAMS, handle, false, container, true);
				});
			}
			
			btn.click();
			return true;
		}
		else if(javaClassType == "java:gov.nic.fileupload.gui.DocumentSigner.class" && archive.indexOf("fileupload.jar") != -1)	//Upload my docs
		{
			container = replaceObjectContainer(applet);
			createUploadWidget(container, CPPP_APPLET_PARAMS);
			return true;
		}
		else if(javaClassType == "java:gov.nic.fileupload.gui.DocumentSigner.class" && archive.indexOf("auctiondecimalsignvalue.jar") != -1)	//Upload auction decimal
		{
			container = replaceObjectContainer(applet);
			createAuctionDecimalWidget(container, CPPP_APPLET_PARAMS);
			return true;
		}
		else if(javaClassType == "java:gov.nic.fileupload.gui.DocumentSigner.class" && archive.indexOf("auctionsignvalue.jar") != -1)	//Upload auction
		{
			container = replaceObjectContainer(applet);
			createAuctionWidget(container, CPPP_APPLET_PARAMS);
			return true;
		}
		else if(javaClassType == "java:gov.nic.pdfsigner.gui.DocumentSigner.class" && archive.indexOf("pdfsigner.jar") != -1)	//publisher - Sign and upload PDF docs for publisher
		{
			container = replaceObjectContainer(applet);
			createPDFUploadWidget(container, CPPP_APPLET_PARAMS);
			return true;
		}
		else if(javaClassType == "java:gov.nic.gui.BidSubmissionApplet.class" && archive.indexOf("bidsubmissionapplet.jar") != -1)	//Bid Submission
		{
			container = replaceObjectContainer(applet);
			createBidSubmissionWidget(container, CPPP_APPLET_PARAMS);
			return true;
		}
		else if(javaClassType == "java:gui.KeyDecryptor.class" && archive.indexOf("keydecryptornew.jar") != -1)	// Bid open
		{
			container = replaceObjectContainer(applet);
			createBidOpenWidget(container, CPPP_APPLET_PARAMS);
			return true;
		}
		else if(javaClassType && javaClassType.toLowerCase() == "java:gov.nic.gui.filesigningapplet.class" && archive.indexOf("filesigningapplet.jar") != -1)	// Publish corrigendum
		{
			container = replaceObjectContainer(applet);
			createFileSignWidget(container, CPPP_APPLET_PARAMS);
			return true;
		}
		else
		{
			if(applet.getAttribute('type') != null && applet.getAttribute('type').indexOf("application/x-java-applet") != -1)
			{
				container = replaceObjectContainer(applet);	//applet should be removed else the page will freeze
				console.log("xorkeesign G2C - unknown java class : "+javaClassType);
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				
				try
				{
					var extmsg = {};
					extmsg.type = G2C_MSG.SET_INFO;
					extmsg.action = "facilityUnsupported";
					CPPP_APPLET_PARAMS.xsClass = javaClassType;
					CPPP_APPLET_PARAMS.xsJar = applet.getAttribute('archive');
					CPPP_APPLET_PARAMS.xsDimension = [applet.getAttribute('width'), applet.getAttribute('height')];
					extmsg.message = btoa(JSON.stringify(CPPP_APPLET_PARAMS));
				
					chrome.runtime.sendMessage(extmsg, function(){console.log("unknown java class");});
				} 
				catch(e) {console.log(e)};
			}
			else
			{
				console.log(applet, CPPP_APPLET_PARAMS);
			}
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
if(doObjectAction(document.getElementsByTagName('object')) == false)
{
	const observer = new MutationObserver(function(mutationsList, obs) {
		
		doObjectAction(document.getElementsByTagName('object'));
	});
	if(document.body) observer.observe(document.body, { subtree: true, childList: true});
}

var js = document.createElement('script');
js.src = chrome.runtime.getURL('contentscript/cppp-override.js');
(document.head||document.documentElement).appendChild(js);