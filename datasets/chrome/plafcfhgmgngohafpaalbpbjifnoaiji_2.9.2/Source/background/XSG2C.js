const XSG2C = {
	
	clear: function(service){
		
		var arr = [];
		for(var key in STORAGE_KEY) 
		{
			arr.push(`${service}${STORAGE_KEY[key]}`);
		}
		return BGUTILS.clearStorage(arr);
	},
	
	setLoggedIn: function(service, flag){
		
		var obj = {};
		obj[`${service}${STORAGE_KEY.loggedIn}`] = flag;
		obj[`${service}${STORAGE_KEY.identifySigner}`] = false;
		return BGUTILS.setStorage(service, obj);
	},
	
	isLoggedIn: function(service){
		
		var arr = [`${service}${STORAGE_KEY.loggedIn}`];
		return BGUTILS.getStorage(service, arr);
	},
	
	setIdentifySigner: function(service, flag){
	
		var obj = {};
		obj[`${service}${STORAGE_KEY.identifySigner}`] = flag;
		return BGUTILS.setStorage(service, obj);
	},
	
	getIdentifySigner: function(service){
		
		var arr = [`${service}${STORAGE_KEY.identifySigner}`];
		return BGUTILS.getStorage(service, arr);
	},
	
	setRedirectUrl: function(service, url){
		
		var obj = {};
		obj[`${service}${STORAGE_KEY.redirectUrl}`] = url;
		return BGUTILS.setStorage(service, obj);
	},
	
	getRedirectUrl: function(service){
		
		var arr = [`${service}${STORAGE_KEY.redirectUrl}`];
		return BGUTILS.getStorage(service, arr);
	},
	
	setPan: function(service, pan){
		
		// pan = "AKWPA9588P"; //test
		// pan = "BVJPA6652H"; //test
		// pan = "JDKPS8231R"; //test
		// pan = "APOPY6642P"; //test
		// pan = "AGAPY3982H"; //test
		// pan = "CDXPM8648G"; //test
		// pan = "DDCCR4455A"; //test
		
		var obj = {}, regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
		if (pan && regpan.test(pan)) {
			obj[`${service}${STORAGE_KEY.pan}`] = pan.toUpperCase();
		}
		return BGUTILS.setStorage(service, obj);
	},
	
	getPan: function(service, scb, ecb){
		
		var arr = [`${service}${STORAGE_KEY.pan}`];
		BGUTILS.getStorage(service, arr)
		.then(({pan}) => {
			
			scb(pan);
		}).catch( e => {console.log(e); ecb(e)});
	},
	
	setHandle: function(service, handle){
		
		var obj = {};
		obj[`${service}${STORAGE_KEY.handle}`] = handle;
		return BGUTILS.setStorage(service, obj);
	},
	
	getHandle: function(service, scb, ecb){
		
		var arr = [`${service}${STORAGE_KEY.handle}`];
		BGUTILS.getStorage(service, arr)
		.then(({handle}) => {
			
			scb(handle);
		}).catch( e => {console.log(e); ecb(e)});
	},
	
	setUserInfo: function(service, userInfo){
		
		var obj = {}, userName;
		if(service == SERVICENAME_ITR)
		{
			obj[`${service}${STORAGE_KEY.orgName}`] = userInfo.orgName;
			if(userInfo.firstName != undefined && userInfo.lastName != undefined) userName = userInfo.firstName+" "+userInfo.lastName;
			else if(userInfo.firstName != undefined && userInfo.lastName == undefined) userName = userInfo.firstName;
			else if(userInfo.firstName == undefined && userInfo.lastName != undefined) userName = userInfo.lastName;
			
			obj[`${service}${STORAGE_KEY.userName}`] = userName;
		}
		else if(service == SERVICENAME_GST)
		{
			obj[`${service}${STORAGE_KEY.userName}`] = userInfo.username;
			obj[`${service}${STORAGE_KEY.gstin}`] = userInfo.gstin;
			obj[`${service}${STORAGE_KEY.orgName}`] = userInfo.bname;
		}
		else if(service == SERVICENAME_TDS)
		{
			obj[`${service}${STORAGE_KEY.userName}`] = userInfo.userName;
			obj[`${service}${STORAGE_KEY.loginType}`] = userInfo.loginType;
			if(userInfo.tanpan != undefined) obj[`${service}${STORAGE_KEY.tanpan}`] = userInfo.tanpan.toUpperCase();
		}
		else if(service == SERVICENAME_EPF)
		{
			obj[`${service}${STORAGE_KEY.estId}`] = userInfo.estId;
			obj[`${service}${STORAGE_KEY.orgName}`] = userInfo.name;
		}
		return BGUTILS.setStorage(service, obj);
	},
	
	frameTabInfo: function(sender){
	
		var info = {};
		if(sender.url != undefined) info.url = sender.url;
		if(sender.tab != undefined)
		{
			if(sender.tab.title != undefined) info.title = sender.tab.title;
			if(sender.tab.id != undefined) info.tabId = sender.tab.id;
		}
		return info;
	},
	
	setTabInfo: function(service, sender){
		
		var obj = {};
		obj[`${service}${STORAGE_KEY.tabInfo}`] = XSG2C.frameTabInfo(sender);
		return BGUTILS.setStorage(service, obj);
	},
	
	setRole: function(service, role){
		var obj = {};
		obj[`${service}${STORAGE_KEY.role}`] = role;
		return BGUTILS.setStorage(service, obj);
	},
	
	getRole: function(service){
		var arr = [`${service}${STORAGE_KEY.role}`];
		return BGUTILS.getStorage(service, arr);
	},
	
	setDin: function(service, din){
		
		return myPromise = new Promise(function(resolve, reject){
			
			var obj = {};
			obj[`${service}${STORAGE_KEY.din}`] = din;
			BGUTILS.setStorage(service, obj)
			.then(() => {
				
				fetch(URL_MCA_DIN+din,{
					method: "GET",
				})
				.then((response) => {
					
					if (response.ok) {
						return response.json();
					}
					return Promise.reject(response); 
				})
				.then((response) => {
					
					if(response.data != undefined) 
					{
						//YUK: validate params and raise alarm
						XSG2C.setPan(service, response.data.PAN)
						.then(() => {
							resolve();
						})
					}
					else 
					{
						console.log("ERROR: MCA | Error fetching PAN");
						reject();
					}
				})
				.catch((response) => {
					console.log("ERROR: MCA | Error fetching PAN from the DIN ("+din, response);
					reject();
				});
			})
			.catch(e => {
				console.log(e);
				reject();
			});
		});

	},
	
	getDin: function(service){
	
		var arr = [`${service}${STORAGE_KEY.din}`];
		return BGUTILS.getStorage(service, arr);
	},
	
	getName: function(service){
		
		var arr = [`${service}${STORAGE_KEY.userName}`];
		return BGUTILS.getStorage(service, arr);
	},
	
	getTBS: function(service, tbs, value, action, scb, ecb){
		
		console.log("Get TBS");
		console.log(tbs);
		if(tbs == null)
		{
			ecb();
			return;
		}
		
		if(XSCUTILS.getComponentName(service) == COMPONENT.EMB)
		{
			// From emb, encryptedRequest is returned
			// Using value key form xorkeesign the encryptedRequest is decrypted and the TBS is returned
			XSG2C.embGetTBS(service, value, tbs, scb, ecb);
		}
		else if(service == SERVICENAME_TDS && (action == "fdata" || action == "fdata")) scb(XSCUTILS.strToHex(tbs).toLowerCase());
		else scb(tbs);
	},
	
	setRedirectRule: function(service, redirectRule){
		
		var obj = {};
		obj[`${service}${STORAGE_KEY.redirectRule}`] = redirectRule;
		return BGUTILS.setStorage(service, obj);
	},
	
	getRedirectRule: function(service){
		
		var arr = [`${service}${STORAGE_KEY.tabInfo}`, `${service}${STORAGE_KEY.redirectRule}`];
		return BGUTILS.getStorage(service, arr);
	},
	
	setSignatories: function(service, signatories){
		
		var activeSignatories = [];
		
		// signatories.push({dscStatus:"ACTIVE",designation:"PROPRIETORIX",signatoryName:"  ARUNKUMAR M  ", effectiveFrom:"01-MAR-2023",effectiveTill:"01-MAR-2026"}); // test  
		
		for(var i=0; i<signatories.length; i++)
		{
			if(signatories[i].dscStatus == "ACTIVE")
			{
				if(signatories[i].signatoryName != undefined) signatories[i].signatoryName = signatories[i].signatoryName.trim(); // Whitespace are removed from both sides
				
				activeSignatories.push(signatories[i]);
			}
		}
			
		var obj = {};
		obj[`${service}${STORAGE_KEY.signatories}`] = activeSignatories;
		return BGUTILS.setStorage(service, obj);
	},

	getSignatories: function(service){
		
		var arr = [`${service}${STORAGE_KEY.signatories}`];
		return BGUTILS.getStorage(service, arr);
	},
	
	getCertIdentifier: function(service, tabInfo, certificate, scb, ecb){
		
		var rv, out;
		
		rv = B64.decode(certificate);
		out = new Uint8Array(rv, 0, rv.length);
		xsPromiseWrapper(xsGetCertDetails1, out)
		.then( certdetails => {
			
			if((certdetails.keyUsage & 0x8000) == 0)
			{
				//only certificates with key usage set with the digitalSignature flag
				//can be registered with xorkee; hence validate and reject here
				console.log("ERROR: keyUsage in the certificate is not set for digitalSignature; Aborting ...");
				ecb(-2, "Certificate usage not marked for digital signatures. You cannot use this DSC with xorkee.");
				XSG2C.setInfo(service, tabInfo, undefined, "xsg2cAlert", "Unsupported DSC.");
			}
			else 
			{
				if(certdetails.commonName != undefined) certdetails.commonName = certdetails.commonName.trim(); // Whitespace are removed from both sides
				
				scb((certdetails.commonName+certdetails.validFrom+certdetails.validTill).toUpperCase(), certdetails);
			}
		})
		.catch(e => {
			
			console.log(e);
			ecb(-1, ERROR_STD);
		});
	},
	
	setPageInfo: function(service, pageInfo){
		
		var obj = {};
		obj[`${service}${STORAGE_KEY.pageInfo}`] = pageInfo;
		return BGUTILS.setStorage(service, obj);
	},
	
	getPageInfo: function(service){
		
		var arr = [`${service}${STORAGE_KEY.pageInfo}`, `${service}${STORAGE_KEY.tabInfo}`];
		return BGUTILS.getStorage(service, arr);
	},
	
	clearPageInfo: function(service){
		
		var obj = {};
		obj[`${service}${STORAGE_KEY.pageInfo}`] = {};
		return BGUTILS.setStorage(service, obj);
	},
	
	frameDisplayMessage: function(service, xorkeeReqType, tbs, sessionInfo, params){
		
		var msg = "";
		
		var {action, xsSignerInfo} = params;
		
		switch(service)
		{
			case SERVICENAME_ITR:
			{
				//frame a message to be displayed in xorkee
				if(sessionInfo.orgName != undefined) msg = `Signature requested on behalf of ${sessionInfo.orgName}`;
				else
				{
					if(sessionInfo.userName != undefined) msg = `Signature requested for the user ${sessionInfo.userName}`;
					else if(sessionInfo.pan != undefined) msg = `Signature requested for the user with PAN ${sessionInfo.pan}`;
					else if(sessionInfo != undefined && sessionInfo.xsSignerInfo != undefined && sessionInfo.xsSignerInfo.info != undefined && sessionInfo.xsSignerInfo.info.commonName != undefined) msg = `Signature requested for ${sessionInfo.xsSignerInfo.info.commonName}`;
					else msg = "Signature requested for the user";
				}
				break;
			}
			case SERVICENAME_MCA:
			{
				msg = sessionInfo.role;
				break;
			}
			case SERVICENAME_GST:
			{
				if(sessionInfo.orgName != undefined && sessionInfo.gstin != undefined) msg = `Signature requested on behalf of ${sessionInfo.orgName} (${sessionInfo.gstin}).`;
				else if(sessionInfo.orgName != undefined && sessionInfo.gstin == undefined) msg = `Signature requested on behalf of ${sessionInfo.orgName}.`;
				else if(sessionInfo.orgName == undefined && sessionInfo.gstin != undefined) msg = `Signature requested for the tax payer identified by the GSTIN ${sessionInfo.gstin}.`;
				else if(sessionInfo.userName != undefined) msg = `Signature requested for the user ${sessionInfo.userName}.`;
				else if(xsSignerInfo && xsSignerInfo.pan != undefined) msg = `Signature requested for the user with PAN ${xsSignerInfo.pan}.`;
				else msg = "";
				msg += `\n\nData being signed:\n${tbs}`;
				break;
			}
			case SERVICENAME_TDS:
			{
				if(sessionInfo.loginType == "taxpayer")
				{
					if(sessionInfo.userName != undefined) msg = `Signature requested for ${sessionInfo.userName} (${sessionInfo.tanpan}).`;
					else msg = `Signature requested for the tax payer/PAO identified by the PAN/AIN ${sessionInfo.tanpan}.`;
				}
				else if(sessionInfo.loginType == "deductor")
				{
					if(sessionInfo.userName != undefined) msg = `Signature requested on behalf of ${sessionInfo.userName} (${sessionInfo.tanpan}).`;
					else msg = `Signature requested for the deductor identified by the TAN ${sessionInfo.tanpan}.`;
				}
				else msg = "";
				
				msg += `\n\nData being signed:\n`;
				if(action == "fdata" || action == "fsign")
				{
					[rv, out] = xsSHA1(XSCUTILS.str2ab(tbs));
					if(rv == 0) msg += XSCUTILS.ab2hex(out);
					else msg += tbs;
				}
				else msg += tbs;
				break;
			}
			case SERVICENAME_EPF:
			{
				if(xorkeeReqType == SIGNATURE_TYPE.PKCS7)
				{
					// PDF signature
					if(sessionInfo.orgName != undefined && sessionInfo.estId != undefined) msg = `Signature requested on behalf of the establishment ${sessionInfo.orgName} (${sessionInfo.estId})`;
					else if(sessionInfo.orgName != undefined && sessionInfo.estId == undefined) msg = `Signature requested on behalf of the establishment ${sessionInfo.orgName}`;
					else if(sessionInfo.orgName == undefined && sessionInfo.estId != undefined) msg = `Signature requested on behalf of the establishment identified by ${sessionInfo.estId}`;
					else msg = `Signature request on behalf of the establishment`;
				}
				else
				{
					msg = "registerDSC";
				}
				
				break;
			}
			case SERVICENAME_CPPP:
			{
				if(xorkeeReqType == SIGNATURE_TYPE.BIDSIG)
				{
					//"tbs" is a JSON param and the request should be framed accordingly
					msg = "Signature requested for bid submission.\n\n";
					if(params.docindex != params.doccount) msg += "Document ("+params.docindex+" of "+params.doccount+") being signed:\n"+params.filename;
					else msg += "Document being signed:\n"+params.filename;
				}
				else if(xorkeeReqType == SIGNATURE_TYPE.DOCSIG)
				{
					//"tbs" is a JSON param and the request should be framed accordingly
					msg = "Signature requested to upload the document\n\n"+params.filename;
				}
				else if(xorkeeReqType == SIGNATURE_TYPE.AUCTION)
				{
					//"tbs" is a JSON param and the request should be framed accordingly
					msg = "Signature requested to submit auction";
				}
				else if(xorkeeReqType == SIGNATURE_TYPE.PKCS7)
				{
					msg = "signPDF_"+params.filename;
				}
				else if(xorkeeReqType == XORKEE_REQUEST_TYPE.DECRYPT)
				{
					// Bid open
					if(params.decryptIndex == 0) 
					{
						if(params.packetType != undefined) msg = `Request to open the ${(params.bidderCount == 1)?"bid":"bids"}.\n\nType: ${params.packetType}\nBidder Count: ${params.bidderCount}`;
						else msg = `Request to open the ${(params.bidderCount == 1)?"bid":"bids"}.\n\nBidder Count: ${params.bidderCount}`;
					}
					else msg = `Bid Id: ${params.bidid}\n\nDecrypting packet: ${params.packetName}`;
				}
				else if(xorkeeReqType == XORKEE_REQUEST_TYPE.REGISTERENCRDSC)
				{
					// Registering encryption certificate
					msg = `${params.host}\n\nPermission to access the encryption DSC from a connected token`;
				}
				else
				{
					// Register DSC and login
					msg = xorkeeReqType;
				}
				break;
			}
			case SERVICENAME_MCA_V3:
			{
				msg = undefined; // Display text in framed in server
				break;
			}
			case SERVICENAME_DGFT:
			{
				msg = undefined; // Display text in framed in server
				break;
			}
			case SERVICENAME_ICEGATE:
			case SERVICENAME_ICEGATE_NEW:
			{
				if(xorkeeReqType == SIGNATURE_TYPE.PKCS7) 
				{
					msg = "signPDF_"+params.filename;
					
					if(params.fileindex != params.filecount) msg  += "\n\n(document "+params.fileindex+" of "+params.filecount+" being signed)";
				}
				else msg = xorkeeReqType;
				break;
			}
			case SERVICENAME_MAHAIT:
			{
				if(xorkeeReqType == SIGNATURE_TYPE.PKCS7) 
				{
					msg = "signPDF";
					
				}
				else msg = `Signature requested from\n${params.host}`; // Display text in framed in server 
				break;
			}
			case SERVICENAME_COO_DGFT:
			{
				if(xorkeeReqType == SIGNATURE_TYPE.PKCS7) 
				{
					msg = "signPDF";
					
				}
				else msg = xorkeeReqType;
				break;
			}
			case SERVICENAME_SHCIL:
			{
				if(xorkeeReqType == SIGNATURE_TYPE.PKCS7) 
				{
					msg = "signPDF";
					
				}
				else msg = xorkeeReqType;
				break;
			}
			case SERVICENAME_IRCEP:
			case SERVICENAME_IREPS:
			{
				if(xorkeeReqType == SIGNATURE_TYPE.PKCS7) 
				{
					if(params?.payload?.action === params?.payload?.ACTIONS.SIGN && params?.payload?.certtype === params?.payload?.CERT_TYPE.EN) {
						msg = "encSign";
					}
					else if(params.url.indexOf("/IRWCMS") !== -1) {
						
						if(params.payload.action === params.payload.ACTIONS.PDFSIGN) {
							msg = `Request to sign the document from 'Works Contract Management System'`;
							if(params.payload.reason) {
								msg += `\n\nReason: ${params.payload.reason}`;
							}
						}
						else if(params.payload.action === params.payload.ACTIONS.SIGN) msg = `Signature requested from \n'Works Contract Management System'`;
						else msg = `Signature requested from\n${params.host}`;
					}
					else msg = `Signature requested from\n${params.host}`;
					
				}
				else if(xorkeeReqType == XORKEE_REQUEST_TYPE.REGISTERENCRDSC)
				{
					// Registering encryption certificate
					msg = `${params.host}\n\nPermission to access the encryption DSC from a connected token`;
				}
				else msg = xorkeeReqType;
				break;
			}
		}
		
		
		return msg;
	},
	
	processSignerInfo: function(service, signerInfo){
		
		return myPromise = new Promise(function(resolve, reject){
			
			var rv, out, certdetails, certdetails1;
			
			signerInfo.service = service; 
			signerInfo.errorString = XSG2C.frameErrorMessage(service, signerInfo.handle, signerInfo); // xorkeesign error are translated
			
			if(service == SERVICENAME_MAHAIT || XSCUTILS.getComponentName(service) == COMPONENT.CRIS || service == SERVICENAME_SHCIL)
			{
				XSG2C.xsCertParser(service, signerInfo, function(signerInfo){
					
					resolve(signerInfo);
				}, function(err){
					
					reject(err);
				});
				return;
			}
			else if(service == SERVICENAME_CPPP)
			{
				if(signerInfo.certificate != undefined)
				{
					rv = B64.decode(signerInfo.certificate);
					out = new Uint8Array(rv, 0, rv.length);
					
					xsPromiseWrapper(xsGetCertDetails, out)
					.then( certdetails => {
						signerInfo.commonName = certdetails.commonName;
						resolve(signerInfo);
					})
					.catch(e => { console.log(e); reject(e);});
				}
				else resolve(signerInfo);
				return;
			}
			
			if(signerInfo.info != undefined && signerInfo.info.certificate != undefined)
			{
				rv = B64.decode(signerInfo.info.certificate);
				out = new Uint8Array(rv, 0, rv.length);
				
				xsPromiseWrapper(xsGetCertDetails, out)
				.then( certdetails => {
					/*
						The following details are returned:
						
						certClass
						certificateData
						commonName
						fp
						issuerName
						keyId
						keyStoreDisplayName
						keyStoreID
						keyStoreName
						label
						serialNumber
						subject
						subjectKeyIdentifierString
						validFrom
					*/
					signerInfo.info = {...signerInfo.info, ...certdetails, certificateData: signerInfo.info.certificate, serialNumber: signerInfo.info.serialNumber};
					
					delete signerInfo.info.certificate;
					
					xsPromiseWrapper(xsGetCertDetails1, out)
					.then( certdetails1 => {
						/*
							certClass
							commonName
							issuerName
							validFrom
							validTill
						*/
						
						signerInfo.info = {...signerInfo.info, certClass:certdetails1.certClass, validFrom1:certdetails1.validFrom, validTill1:certdetails1.validTill};
						
						console.log(signerInfo);
						
						resolve(signerInfo);
						
					})
					.catch(e => { console.log(e); reject(e);});
				})
				.catch(e => {console.log(e); reject(e);});
			}
			else
			{
				// If user not registered in xorkee
				resolve(signerInfo);
			}
		});
	},

	setXsSignerInfo: function(service, signerInfo){
		
		var obj = {};
		obj[`${service}${STORAGE_KEY.xsSignerInfo}`] = signerInfo; 
		return BGUTILS.setStorage(service, obj);
	},
	
	setInfo: function(service, initiator, handle, action, msg){
		
		var reqpayload = {};
		reqpayload.request = "extensionSetInfo";
		reqpayload.service = BGUTILS.frameService(service);
		reqpayload.handle = handle;
		reqpayload.userAgent = USERAGENT;
		reqpayload.initiator = initiator;
		reqpayload.action = action;
		reqpayload.msg = msg;
		
		if(reqpayload.service === SERVICENAME_ICEGATE_NEW) reqpayload.service = SERVICENAME_ICEGATE;
		
		fetch(URL_XORKEESIGN,{
			method: "POST",
			body: JSON.stringify(reqpayload),
			headers: HEADER_XORKEESIGN,
		})
		.then((response) => {

			if (response.ok) {
				return response.json();
			}
			return Promise.reject(response); 
		})
		.then((response) => {
			console.log(response);
		})
		.catch((e) => {
			console.log("Unable to set extension information");
			console.log(e);
		});
	},
	
	getMessage: function(url, tabId, sendResponse){
		
		var reqpayload = {}, msg;
		reqpayload.request = "extensionGetMessage";
		reqpayload.service = BGUTILS.frameService(BGUTILS.getServiceName(url));
		reqpayload.version = USERAGENT.version;
		
		fetch(URL_XORKEESIGN,{
			method: "POST",
			body: JSON.stringify(reqpayload),
			headers: HEADER_XORKEESIGN,
		})
		.then((response) => {

			if (response.ok) {
				return response.json();
			}
			return Promise.reject(response); 
		})
		.then((payload) => {
			
			if(payload.message != undefined && payload.message.trim().length > 0)
			{
				payload.service = BGUTILS.getServiceName(url);
				sendResponse(payload);
			}
		})
		.catch((e) => {
			console.log("Unable to get xorkeesign message");
			console.log(e);
		});
	},

	epfLoadSigner: function(tabInfo, index, signatories, selectedSignerIndex, sigarr, cb) {
	
		var epfsignerinfo, certIdentifier;
		
		if(index < signatories.length)
		{
			if(selectedSignerIndex != undefined && selectedSignerIndex != index)
			{
				// In xorkee registeration prompt, if retry button is selected, only the selected signer info is updated other signers are skiped.
				sigarr.push(signatories[index]);
				return XSG2C.epfLoadSigner(tabInfo, ++index, signatories, selectedSignerIndex, sigarr, cb);
			}
			
			if(signatories[index].dscStatus != "ACTIVE")
			{
				// Only the active signers in EPFO portal is loaded.
				return XSG2C.epfLoadSigner(tabInfo, ++index, signatories, selectedSignerIndex, sigarr, cb);
			}
			
			epfsignerinfo = {};
			epfsignerinfo.signatoryName = signatories[index].signatoryName;
			epfsignerinfo.designation = signatories[index].designation;
			epfsignerinfo.effectiveFrom = signatories[index].effectiveFrom;
			epfsignerinfo.effectiveTill = signatories[index].effectiveTill;
			epfsignerinfo.dscStatus = signatories[index].dscStatus;
			
			//load the signer information from the signatory information in the EPF portal
			certIdentifier = (signatories[index].signatoryName+signatories[index].effectiveFrom+signatories[index].effectiveTill).toUpperCase();
			
			epfsignerinfo.certIdentifier = certIdentifier;
			
			XSG2C.getSignerInfo(SERVICENAME_EPF, tabInfo, certIdentifier, undefined, undefined, function(signerinfo){
				
				//combine the signer information received from xorkeesign along with
				//the previously stored information from the EPF portal
				signatories[index] = {...epfsignerinfo, ...signerinfo};
				
				sigarr.push(signatories[index]);
				return XSG2C.epfLoadSigner(tabInfo, ++index, signatories, selectedSignerIndex, sigarr, cb);
				
			}, function(result, errorString){
				
				epfsignerinfo.result = result;
				epfsignerinfo.errorString = errorString;
				
				signatories[index] = epfsignerinfo;
				sigarr.push(signatories[index]);
				return XSG2C.epfLoadSigner(tabInfo, ++index, signatories, selectedSignerIndex, sigarr, cb);
			});
		}
		else
		{
			cb(sigarr);
		}
		return;
	},
	
	loadSignersInfo: function(service, tabInfo, selectedSignerIndex, scb, ecb){	//used only for EPF
		
		var arr=[];
		
		XSG2C.getSignatories(service)
		.then(({signatories}) =>{
			
			if(signatories == undefined)
			{
				// Unable to get signatories
				XSG2C.setInfo(service, tabInfo, undefined, "UnknownSigner", "Unable to get signatories"); 
				ecb();
				return;
			}
			
			XSG2C.epfLoadSigner(tabInfo, 0, signatories, selectedSignerIndex, arr, function(xsSignatories){
				//the returned array of objects (xsSignatories) contains
				//the EPF portal information for the signer along with the
				//information in xorkeesign for the particular signer
				scb(xsSignatories);
			});
		})
		.catch((e) => {
			console.log(e); 
			ecb(); 
		});
	},
	
	getSignerInfoPayload: function(service, tabInfo, certIdentifier, encryptionKeyId, params, scb, ecb){
		
		var requestBody, rv, buff;
		
		requestBody = {
			request:"extensionGetSignerInfo",
			service:BGUTILS.frameService(service),
			userAgent:USERAGENT,
			initiator:tabInfo,
		};
		
		if(requestBody.service === SERVICENAME_ICEGATE_NEW) requestBody.service = SERVICENAME_ICEGATE;
		
		if(service === SERVICENAME_COO_DGFT)
		{
			if(params.handle) requestBody.handle = params.handle;
			
			if(certIdentifier)
			{
				// IEC code
				certIdentifier = atob(certIdentifier).trim().toUpperCase();
				
				buff = XSCUTILS.str2ab(certIdentifier);
				
				xsPromiseWrapper(xsMD5, XS_DIGEST_BLOCK_FIRST | XS_DIGEST_BLOCK_FINAL, buff.byteLength, null, buff)
				.then( out => {
					
					xsPromiseWrapper(xsB64Encode, out)
					.then(out => {
						
						requestBody.param2 = out;
						scb(requestBody);
					})
					.catch( e => {
						console.log(e);
						ecb(-1, ERROR_STD);
					});
				})
				.catch( e => {
					console.log(e);
					ecb(-1, ERROR_STD);
				});
				return;
			}
			
			scb(requestBody);
			return;
		}
		
		
		
		/*
			* Only for emb. For other components like ems and java param1 will be undefined
			* This key is used to get encryptionKey from xorkeesign, to encode the emb request payload
		*/
		requestBody.param1 = encryptionKeyId;
		
		if(XSCUTILS.getComponentName(service) == COMPONENT.CRIS) {
						
			if(params.payload.action === params.payload.ACTIONS.PDFSIGN) requestBody.includeChain = true;
			else requestBody.includeChain = false;
		}
		
		if(params && params.handle)
		{
			/* 
				This scenario will happen in the following case
					- Unable to identify the signer using PAN. In this case user will be prompted to enter handle
					- If more than one active handles are resolved. List of handles will be prompted to the user to select one handle
			*/
			
			requestBody.handle = params.handle;
			scb(requestBody);
			return;
		}
		
		if(!certIdentifier)
		{
			if(params != undefined && params.handle != undefined)
			{
				// User handle is used here to getSignerInfo response, as we are unable to identify user PAN or certificate inforamtion
				requestBody.handle = certIdentifier = params.handle;
			}
			else
			{
				console.log("ERROR: Unable to identifier the signer in the website/portal");
				
				if(service == SERVICENAME_MCA)
				{
					XSG2C.clear(SERVICENAME_MCA).then(() => {
						ecb(...G2C_ERR.NO_USER_IDENTIFIER);
					});
				} 
				else ecb(...G2C_ERR.NO_USER_IDENTIFIER);
				// else ecb(-1, ERROR_STD);
				return;
			}
		}
		
		/*
			* Depending upon the website we will have various user identification parameters
			* PAN is the identifier for ITR, MCA, GST, TDS
			* For EPF, Certificate details like commonName, validFrom and validTill is used has identifier
		*/
		xsPromiseWrapper(xsSHA256, XSCUTILS.str2ab(certIdentifier))
		.then( out => {
			
			xsPromiseWrapper(xsB64Encode, out)
			.then(out => {
				
				if(requestBody.handle == undefined) 
				{
					// PAN or Certificate details
					requestBody.param2 = out;
				}
				// else handle will be used as signer indentification
				scb(requestBody);
				
			})
			.catch( e => {
				console.log(e);
				ecb(-1, ERROR_STD);
				//YUK: log error
			});
		})
		.catch(e => {
			console.log(e);
			ecb(-1, ERROR_STD);
			//YUK: log error
		});
	},
	
	getSignerInfo: function(service, tabInfo, certIdentifier, encryptionKeyId, params, scb, ecb){
		
		XSG2C.getSignerInfoPayload(service, tabInfo, certIdentifier, encryptionKeyId, params, function(requestBody){
			
			fetch(URL_XORKEESIGN,{
				method: "POST",
				body: JSON.stringify(requestBody),
				headers: HEADER_XORKEESIGN,
			})
			.then((response) => {

				if (response.ok) {
					return response.json();
				}
				return Promise.reject(response); 
			})
			.then((response) => {
				
				console.log(response);
				if(XSCUTILS.getComponentName(service) == COMPONENT.EMB || service == SERVICENAME_GST || service == SERVICENAME_MCA || service == SERVICENAME_TDS)
				{
					// PAN number is used to display in xorkee registration prompt
					// xorkee prompt display message
					response.pan = certIdentifier;
				}
				
				// response.otherHandles = ["yukeshn@xorkee.com", "yukesh565@xorkee.com"]; // test
				if(response.otherHandles) {
					
					// If multiple handles are resolved for the given pan
					// Add the recently registered handle in the "otherHandles" key 
					// Extension return this as a error to list the handles in the page
					if(response.result === 0) response.otherHandles.push(response.handle);
					
					response.result = G2C_ERR.MULTIPLE_HANDLES[0]; // extension error code for multiple handle
					ecb(G2C_ERR.MULTIPLE_HANDLES[0], response);
					return; 
				}
				
				if(params && params.handle) response.signerIdentify = true;
				else response.signerIdentify = false;
				
				XSG2C.processSignerInfo(service, response)
				.then((xsSignerInfo) => {
					
					// Active handles are sorted
					if(xsSignerInfo.handles && xsSignerInfo.handles.length > 0)
					{
						xsSignerInfo.handles.sort(function(a,b){
							if(a.info.status === "active") return -1;
							else return 0;
						});
					} 
					
					if(xsSignerInfo.handle != undefined)
					{
						/*
							xorkee user
							-----------
						*/
						if(XSCUTILS.getComponentName(service) == COMPONENT.EMB)
						{
							// EMB - > we store the xorkeesign signer Info response because the response is used later in list certificate and PKCS sign request.
							XSG2C.setXsSignerInfo(service, xsSignerInfo)
							.then(() => {
								console.log("xorkeesign signerInfo stored");
								scb(xsSignerInfo);
							})
							.catch(e => {
								console.log(e);
								ecb(-1, ERROR_STD);
							});
						}
						else 
						{
							scb(xsSignerInfo);
						}
						
					}
					else
					{
						/*
							Not a xorkee user
							-----------------
						*/
						
						scb(xsSignerInfo);
					}
				})
				.catch(e => {
					console.log(e);
					ecb(-1, ERROR_STD);
				});
			})
			.catch((response) => {
				console.log("ERROR: Unable to fetch the signer inforamtion");
				console.log(response);
				ecb(-1, ERROR_STD);
			});
			
		}, ecb);
		
	},
	
	xsCertParser: function(service, xsSignatureInfo, scb, ecb){
		
		var rv, out, dn, dnName, params, li, nam, val, d;
		
		if((service == SERVICENAME_ICEGATE || service == SERVICENAME_ICEGATE_NEW || service == SERVICENAME_MAHAIT || XSCUTILS.getComponentName(service) == COMPONENT.CRIS || service == SERVICENAME_SHCIL) && xsSignatureInfo.result == 0 && xsSignatureInfo.info != undefined && xsSignatureInfo.info.certificate != undefined)
		{
			rv = B64.decode(xsSignatureInfo.info.certificate);
			out = new Uint8Array(rv, 0, rv.length);
			
			xsPromiseWrapper(xsSHA1, out)
			.then( rv => {
				
				xsSignatureInfo.info.thumbPrint = XSCUTILS.ab2hex(rv, (XSCUTILS.getComponentName(service) == COMPONENT.CRIS || service == SERVICENAME_SHCIL)?false:true);
				
				if(service == SERVICENAME_ICEGATE) params = ["subjectCN", "serialNo", "publicKey", "class", "subjectDN", "issuerDN", "validFrom", "validTill", "authorityKeyId", "subjectKeyId"];
				else if(service == SERVICENAME_ICEGATE_NEW) params = ["subjectCN", "serialNo", "publicKey", "class", "igSubjectDN", "igIssuerDN", "validFrom", "validTill", "authorityKeyId", "subjectKeyId", "subjectAlternativeName"];
				else if(XSCUTILS.getComponentName(service) == COMPONENT.CRIS) params = ["subjectCN", "serialNo", "subjectDN", "publicKey", "validFrom", "validTill", "keyUsage", "issuerCN", "class"];
				else if(service == SERVICENAME_SHCIL) params = ["subjectDN", "publicKey", "subjectAlternativeName", "validFrom", "validTill"];
				else params = ["serialNo", "issuerDN"];
				
				params.forEach(function(item, i, arr){
					
					xsPromiseWrapper(xsGetCertParam, out, item)
					.then( rv => {
						
						if(item == "serialNo" || item == "authorityKeyId" || item == "subjectKeyId") rv = XSCUTILS.ab2hex(rv, (service == SERVICENAME_ICEGATE || service == SERVICENAME_ICEGATE_NEW)?true:false);
						else if(item == "publicKey") rv = B64.encode(rv);
						else if(item == "validTill" || item == "validFrom" ) {
							
							if(XSCUTILS.getComponentName(service) !== COMPONENT.CRIS && service !== SERVICENAME_SHCIL) rv = XSCUTILS.dateToStr(rv);
						}
						else if(item == "subjectDN" || item == "issuerDN" )
						{
							/*
								From ICEGATE java applet, in subjectDN and issuerDN for some attributes like PostalCode, Pseudonym, TelephoneNumber etc insted of attribute name the corresponding OID is used
								
								Expected OID attribute format in ICEGATE portal - OID.<corresponding OID attribute> (Example: OID.2.5.4.20)
								
								In RFC Documentation, every OID will start from "2.5.4"
								
							*/
							
							if(service == SERVICENAME_ICEGATE)
							{
								dn = rv.split(",");
								dn.forEach(function(dnFields, index){
									
									val = dnFields.split("=")[0];
									if(val.indexOf("2.5.4") != -1) rv = rv.replace(val, ` OID.${val.trim()}`);
								});
							}
							else
							{
								dn = rv.split("=");
								rv = "";
								dn.forEach(function(dnFields, index){
									
									if(index == 0) rv += dnFields+'=';
									else
									{
										li = dnFields.lastIndexOf(",");
										if(li == -1) rv += dnFields;
										else
										{
											val = dnFields.substring(0, li);
											name = dnFields.substring(li+1);
											
											if(val.indexOf(",") != -1) rv += `"${val}"`;
											else rv += val;
											rv += ', ';
											
											if(name.indexOf("2.5.4") != -1) rv += "OID.";
											rv += name+'=';
										}
									}
								});
							}
						}
						else if(item == "keyUsage") {
							
							rv = (rv >> 12);
							if((rv & 2 || rv & 1) && (rv & 8 || rv & 4)) rv = "Encryption,DigitalSignature";
							else if(rv & 8 || rv & 4) rv = "DigitalSignature";
							else if(rv & 2 || rv & 1) rv = "Encryption";
							else rv = "";
						}
						
						xsSignatureInfo.info[params[i]] = rv;
						
						if(i == arr.length-1)
						{
							// last index 
							scb(xsSignatureInfo);
						}
						
						console.log(rv);
					})
					.catch(e =>{
						console.log(e);
						// ecb(e);
						if(i == arr.length-1)
						{
							// last index 
							scb(xsSignatureInfo);
						}
					});
				});
			})
			.catch(e =>{
				console.log(e);
				ecb(e);
			});
		}
		else scb(xsSignatureInfo);
	},
	
	processSignatureInfo: function(service, xsSignerInfo, xsSignatureInfo){
		
		return myPromise = new Promise(function(resolve, reject){
			
			// Translate signature request error string
			xsSignatureInfo.errorString = XSG2C.frameErrorMessage(service, xsSignerInfo.handle, xsSignatureInfo);
			xsSignatureInfo.service = service; 
			
			XSG2C.xsCertParser(service, xsSignatureInfo, function(xsSignatureInfo){
				
				if(xsSignatureInfo.enrolled === undefined)
				{
					// In some cases these flag may not be returned from xorkeesign
					// Skipped
					resolve([xsSignerInfo, xsSignatureInfo]);
				}
				else
				{
					if(xsSignerInfo.isEnrolled === xsSignatureInfo.enrolled) resolve([xsSignerInfo, xsSignatureInfo]);
					else
					{
						xsSignerInfo.isEnrolled = xsSignatureInfo.enrolled; // If enrollment request is approved and the signature request is declined/timeout, isEnrolled flag is updated to display the xorkee signature notification prompt.
						
						if(XSCUTILS.getComponentName(service) == COMPONENT.EMB)
						{
							var obj = {};
							obj[`${service}${STORAGE_KEY.xsSignerInfo}`] = xsSignerInfo; 
							
							BGUTILS.setStorage(service, obj)
							.then(() => {
								resolve([xsSignerInfo, xsSignatureInfo]);
							})
							.catch(e => {
								reject(e);
							});
						}
						else resolve([xsSignerInfo, xsSignatureInfo]);
					}
				}
			}, function(e){
				reject(e);
			});
		});
	},
	
	frameErrorMessage: function(service, handle, {result, errorString}) {
		
		var data = "";
		
		switch(result)
		{
			case XS_ERRCODE.NON_XORKEE: 
			{
				data = ERROR_NOTREG;
			}
			break;
			case XS_ERRCODE.XORKEE_NOT_REACHABLE: 
			{
				data = `The DSC token (${handle}) is not plugged-in (or) in sleep mode. Re-plug the token and try again.`;
			}
			break;
			case XS_ERRCODE.LIVE_EXPIRED: 
			{
				data = `xorkeesign subscription for '${handle}' has expired. Try again after renewing the subscription.`;
			}
			break;
			case XS_ERRCODE.TRIAL_EXPIRED: 
			{
				data = `The trial for '${handle}' has ended. Subscribe to xorkeesign to continue.`;
			}
			break;
			case XS_ERRCODE.INCOMPLETE_REQUEST: 
			{
				data = FACILITY_UNSUPPORTED;
			}
			break;
			default:
			{
				if(errorString != undefined) data = errorString;
				else data = ERROR_STD;
			}
			break;
		}
		return data;
	},
	
	xorkeeNotificationPrompt: function(service, tabInfo, signatureType, tbsDigest, xsSignerInfo, params, scb, ecb){
		
		if(params != undefined) 
		{
			if(params.decryptIndex > 0)
			{
				// In CPPP, while bulk decryption only for the first data notification prompt will be displayed. For the other data text loader will be displayed in page(handled in contentscript).
				scb();
				return;
			}
		}
		
		var msgType;
		
		xsPromiseWrapper(xsGetNotificationId, tbsDigest)
		.then( notifyId => {
			
			if(xsSignerInfo.isEnrolled == false) 
			{
				if(service === SERVICENAME_COO_DGFT && signatureType === SIGNATURE_TYPE.REGISTERDSC)
				{
					// Signature not needed in register DSC.
					msgType = G2C_MSG.SIGN_PROMPT;
				}
				else
				{
					// xorkee enrollment notificationprompt will be displayed
					msgType = G2C_MSG.ENROLL_SIGN_PROMPT;
				}
			}
			else if(signatureType == SIGNATURE_TYPE.PKCS7 && params.freePlan == true) 
			{
				// xorkee freePlan notificationprompt will be displayed
				// EPF register DSC only one xorkee consent is need when freePlan is opted
				msgType = G2C_MSG.FREEPLAN_SIGN_PROMPT;
			}
			else 
			{
				// xorkee notification prompt will be displayed
				msgType = G2C_MSG.SIGN_PROMPT;
			}
			
			if(params.registerEnc == true)
			{
				// In CPPP, while registering encryption certificate notification ID is removed. Signature is not needed in this case
				notifyId = undefined;
			}
			
			BGUTILS.sendMessageToCS(tabInfo.tabId, msgType, service, xsSignerInfo.handle, notifyId, params).then(r => { console.log("Done"); scb(); }).catch( e => { console.log(e); ecb();} );
			
			
		})
		.catch(e =>{
			console.log(e);
			ecb();
		});
	},
	
	getSignatureReqPayload: function(service, tabInfo, signatureType, tbs, xsSignerInfo, params, scb, ecb){
		
		var requestBody = {}, arr = [], rv;
		
		var {freePlan, action, pdfDigest, applyUnits} = params;
		
		return myPromise = new Promise(function(resolve, reject){
			
			if(service == SERVICENAME_ITR)
			{
				arr.push(`${service}${STORAGE_KEY.pan}`);
				arr.push(`${service}${STORAGE_KEY.xsSignerInfo}`);
				arr.push(`${service}${STORAGE_KEY.userName}`);
				arr.push(`${service}${STORAGE_KEY.orgName}`);
			}
			else if(service == SERVICENAME_MCA)
			{
				arr.push(`${service}${STORAGE_KEY.role}`);
			}
			else if(service == SERVICENAME_GST)
			{
				arr.push(`${service}${STORAGE_KEY.userName}`);
				arr.push(`${service}${STORAGE_KEY.orgName}`);
				arr.push(`${service}${STORAGE_KEY.gstin}`);
			}
			else if(service == SERVICENAME_TDS)
			{
				arr.push(`${service}${STORAGE_KEY.userName}`);
				arr.push(`${service}${STORAGE_KEY.tanpan}`);
				arr.push(`${service}${STORAGE_KEY.loginType}`);
			}
			else if(service == SERVICENAME_EPF)
			{
				arr.push(`${service}${STORAGE_KEY.estId}`);
				arr.push(`${service}${STORAGE_KEY.orgName}`);
			}
			else if(service == SERVICENAME_MCA_V3)
			{
				arr.push(`${service}${STORAGE_KEY.pan}`);
				arr.push(`${service}${STORAGE_KEY.xsSignerInfo}`);
			}
			else if(service == SERVICENAME_DGFT)
			{
				arr.push(`${service}${STORAGE_KEY.pan}`);
				arr.push(`${service}${STORAGE_KEY.xsSignerInfo}`);
			}
			
			BGUTILS.getStorage(service, arr)
			.then((sessionInfo) => {
				
				if(XSCUTILS.getComponentName(service) == COMPONENT.EMB)
				{
					xsSignerInfo = sessionInfo.xsSignerInfo;
				}
				// else xsSignerInfo response is stored in local Storage. It is preserved in content script. 
			
				({handle, value, isEnrolled, certIdentifier} = xsSignerInfo);
				
				XSG2C.getTBS(service, tbs, value, action, function(dataToSign){
					
					requestBody = {
						request:"extensionGetSignature",
						service:BGUTILS.frameService(service),
						userAgent:USERAGENT,
						initiator:tabInfo,
					};
					
					if(requestBody.service === SERVICENAME_ICEGATE_NEW) 
					{
						requestBody.service = SERVICENAME_ICEGATE;
						requestBody.sigReq = true;
					}
					
					requestBody.param2 = handle;
					
					// xorkee application display prompt message
					requestBody.param3 = XSG2C.frameDisplayMessage(service, signatureType, dataToSign, sessionInfo, params);
					
					if(service == SERVICENAME_CPPP && signatureType == SIGNATURE_TYPE.REGISTERDSC) requestBody.includeChain = true;
					
					if(XSCUTILS.getComponentName(service) == COMPONENT.CRIS) {
						
						if(params.payload.action === params.payload.ACTIONS.PDFSIGN) requestBody.includeChain = true;
						else requestBody.includeChain = false;
					}
					
					if(freePlan == true) 
					{
						// To sent free plan concent to the user
						requestBody.freePlan = freePlan;
					}
					
					if(applyUnits == true) 
					{
						// To apply units from xorkeeStore
						requestBody.applyUnits = applyUnits;
					}
					
					if(service == SERVICENAME_MAHAIT || service == SERVICENAME_SHCIL)
					{
						if(signatureType === SIGNATURE_TYPE.PKCS7) {
							
							//PDF document is already SHA2 digested and base64 encoded in contentscript
							requestBody.param1 = dataToSign;
								
							resolve([requestBody, dataToSign, xsSignerInfo, action]);
						}
						else {
							rv = B64.decode(dataToSign);
							rv = new Uint8Array(rv, 0, rv.length);
				
							xsPromiseWrapper(xsSHA256, rv)
							.then( out => {
								
								xsPromiseWrapper(xsB64Encode, out)
								.then(out => {
									
									requestBody.param1 = out;
									
									resolve([requestBody, dataToSign, xsSignerInfo]);
									
								})
								.catch(e =>{
									console.log(e);
									reject();
									return;
								});
							})
							.catch(e =>{
								console.log(e);
								reject();
								return;
							});
						}
					}
					else if(XSCUTILS.getComponentName(service) == COMPONENT.CRIS)
					{
						
						requestBody.action = params.payload.action;
						
						if(params.payload.certtype === params.payload.CERT_TYPE.EN) requestBody.encryptionCert = params.payload.certPubKey;
							
						if(signatureType === SIGNATURE_TYPE.PKCS7 && params.payload.action === params.payload.ACTIONS.PDFSIGN) {
							
							//PDF document is already SHA2 digested and base64 encoded in contentscript
							requestBody.param1 = dataToSign;
								
							resolve([requestBody, dataToSign, xsSignerInfo, action]);
						}
						else {
							
							rv = XSCUTILS.str2ab(dataToSign);
				
							xsPromiseWrapper(xsSHA256, rv)
							.then( out => {
								
								xsPromiseWrapper(xsB64Encode, out)
								.then(out => {
									
									requestBody.param1 = out;
									
									resolve([requestBody, dataToSign, xsSignerInfo]);
									
								})
								.catch(e =>{
									console.log(e);
									reject();
									return;
								});
							})
							.catch(e =>{
								console.log(e);
								reject();
								return;
							});
						}
					}
					else if(service == SERVICENAME_COO_DGFT && signatureType == SIGNATURE_TYPE.PKCS7)
					{
						//PDF document is already SHA2 digested and base64 encoded in contentscript
						requestBody.param1 = dataToSign;
							
						resolve([requestBody, dataToSign, xsSignerInfo, action]);
					}
					else if(service == SERVICENAME_ICEGATE_NEW)
					{
						if(signatureType == SIGNATURE_TYPE.REGISTERDSC) {
							
							xsPromiseWrapper(xsSHA256, XSCUTILS.str2ab(dataToSign))
							.then( out => {
								
								xsPromiseWrapper(xsSHA1, out)
								.then( out => {
								
									xsPromiseWrapper(xsB64Encode, out)
									.then(out => {
										
										requestBody.param1 = out;
											
										resolve([requestBody, dataToSign, xsSignerInfo, action]);
									})
									.catch(e =>{
										console.log(e);
										reject();
										return;
									});
								})
								.catch(e =>{
									console.log(e);
									reject();
									return;
								});
							})
							.catch(e =>{
								console.log(e);
								reject();
								return;
							});
						}
						else {
						
							requestBody.param1 = dataToSign;
							resolve([requestBody, dataToSign, xsSignerInfo, action]);
						}
						
					}
					else if(service == SERVICENAME_ICEGATE && signatureType == SIGNATURE_TYPE.PKCS7)
					{
						//document is already SHA1 digested and base64 encoded in contentscript
						requestBody.param1 = dataToSign;
							
						resolve([requestBody, dataToSign, xsSignerInfo, action]);
					}
					// else if(service == SERVICENAME_EPF && certIdentifier != undefined) 
					else if(service == SERVICENAME_EPF && signatureType === SIGNATURE_TYPE.PKCS7) 
					{
						// In EPF PDF signature, SHA1 base64 pdfDigest is computed in content script(epf.js)
						requestBody.param1 = dataToSign;
						
						if(!certIdentifier) resolve([requestBody, dataToSign, xsSignerInfo]);
						else {
							xsPromiseWrapper(xsSHA256, XSCUTILS.str2ab(certIdentifier))
							.then( out => {
								
								xsPromiseWrapper(xsB64Encode, out)
								.then(out => {
									
									// In EPF certificate details hash is sent to server to identify the key change event.
									requestBody.param4 = out;
									resolve([requestBody, dataToSign, xsSignerInfo]);
									
								})
								.catch(e =>{
									console.log(e);
									reject();
									return;
								});
							})
							.catch(e =>{
								console.log(e);
								reject();
								return;
							});
						}
					}
					else if(service == SERVICENAME_CPPP && (signatureType == SIGNATURE_TYPE.DOCSIG || signatureType == SIGNATURE_TYPE.AUCTION || signatureType == SIGNATURE_TYPE.BIDSIG || signatureType == SIGNATURE_TYPE.PKCS7)) 
					{
						//"tbs" is a JSON param and the request should be framed accordingly
						//document is already SHA1 digested and base64 encoded in contentscript
						requestBody.param1 = dataToSign;
							
						resolve([requestBody, dataToSign, xsSignerInfo, action]);
					}
					else
					{
						// For ITR and EPF registerDSC SHA2 dataToSign
						xsPromiseWrapper((XSCUTILS.getComponentName(service) == COMPONENT.EMB || service == SERVICENAME_EPF)?xsSHA256:xsSHA1, XSCUTILS.str2ab(dataToSign))
						.then( out => {
							
							xsPromiseWrapper(xsB64Encode, out)
							.then(out => {
								
								// Data to be signed
								requestBody.param1 = out;
								
								resolve([requestBody, dataToSign, xsSignerInfo, action]);
							})
							.catch(e =>{
								console.log(e);
								reject();
								return;
							});
						})
						.catch(e =>{
							console.log(e);
							reject();
							return;
						});
					}
				}, function(){
					console.log("TBS not found");
					reject();
					return;
				});
			})
			.catch(e => {
				console.log(e);
				reject(e);
				return;
			});
		});
	},
	
	getDocSignature: function(service, tabInfo, xsSignerInfo, docs, docindex, sigarr, cb){
		console.log("getDocSignature", docindex, sigarr);
		
		XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.BIDSIG, docs[docindex].tbs, xsSignerInfo, docs[docindex], function(xsSignerInfo, xsSignatureInfo){
		
			if(xsSignatureInfo.result != 0)
			{
				cb({...xsSignerInfo, ...xsSignatureInfo});
			}
			else
			{
				sigarr.push(xsSignatureInfo.signature);
				if(docindex < docs.length-1) XSG2C.getDocSignature(service, tabInfo, xsSignerInfo, docs, ++docindex, sigarr, cb);
				else 
				{
					cb({result:0, signatures:sigarr});
				}
			}
		},function(){
			
			cb({result:-1, errorString:ERROR_STD});
		});
	},
	
	getSignature: function(service, tabInfo, signatureType, tbs, xsSignerInfo, params, scb, ecb){
		// If getSignature arguments is changed. getSignatureReqPayload function arguments should be updated
		
		var service, sig, out;
		
		XSG2C.getSignatureReqPayload(...arguments)
		.then(([requestBody, dataToSign, xsSignerInfo, action]) => {
			
			// Display xorkee prompt with notification Id
			
			if(service === SERVICENAME_SHCIL && typeof requestBody.param1 === "object") {
				out = requestBody.param1.join("");
				out = XSCUTILS.str2ab(out);
			}
			else {
				out = requestBody.param1;
				out = B64.decode(out);
				out = new Uint8Array(out, 0, out.length);
			}
			
			XSG2C.xorkeeNotificationPrompt(service, tabInfo, signatureType, out, xsSignerInfo, params, function(){
				
				//xorkee notificationprompt displayed
				fetch(URL_XORKEESIGN,{
					method: "POST",
					body: JSON.stringify(requestBody),
					headers: HEADER_XORKEESIGN,
				})
				.then((response) => {

					if (response.ok) {
						return response.json();
					}
					return Promise.reject(response); 
				})
				.then((xsSignatureInfo) => {
					
					console.log(xsSignatureInfo);
					
					if(service === SERVICENAME_MAHAIT && params && params.host && params.host.indexOf("scmexcise") !== -1) {
						
						// Hide signature notification prompt
						BGUTILS.sendMessageToCS(tabInfo.tabId, G2C_MSG.HIDE_PROMPT).then(r => { console.log("Done");}).catch( e => { console.log(e);} );
					}
					
					XSG2C.processSignatureInfo(service, xsSignerInfo, xsSignatureInfo)
					.then(([xsSignerInfo, xsSignatureInfo]) => {
						
						if(service == SERVICENAME_CPPP || service == SERVICENAME_ICEGATE || service == SERVICENAME_MAHAIT || service == SERVICENAME_COO_DGFT || service == SERVICENAME_ICEGATE_NEW || service == SERVICENAME_SHCIL || (XSCUTILS.getComponentName(service) == COMPONENT.CRIS && params && ( params.payload.action === params.payload.ACTIONS.PDFSIGN || params.payload.signaturetype !== params.payload.SIGNATURE_TYPE.ATTACHED)))
						{
							scb(xsSignerInfo, xsSignatureInfo);	
						}
						else if(service == SERVICENAME_EPF)
						{
							// Register DSC -> Certificate details will be returned.
							// Approvals -> PDF signature will be returned.
							scb(xsSignerInfo, xsSignatureInfo);	
						}
						else
						{
							if(xsSignatureInfo.signature != undefined)
							{
								sig = B64.decode(xsSignatureInfo.signature);
								sig = new Uint8Array(sig, 0, sig.length);
								
								if(service == SERVICENAME_TDS && (action == "fdata" || action == "fsign"))
								{
									//do not attach data to the PKCS#7 signature in this case
									xsPromiseWrapper(xsB64URLEncode, sig)
									.then( sig => {
										
										xsSignatureInfo.signature = sig;
										scb(xsSignerInfo, xsSignatureInfo);
									})
									.catch(e => {
										console.log(e);
										ecb(-1, ERROR_STD);
									});
								}
								else
								{
									//for IT portal pack the data
									xsPromiseWrapper((XSCUTILS.getComponentName(service) == COMPONENT.EMB)?xsAttachData:xsAttachDataOC, sig, XSCUTILS.str2ab(dataToSign))
									.then( sig => {
										
										xsPromiseWrapper((XSCUTILS.getComponentName(service) == COMPONENT.EMB || XSCUTILS.getComponentName(service) == COMPONENT.CRIS)?xsB64Encode:xsB64URLEncode, sig)
										.then( sig => {
											
											xsSignatureInfo.signature = sig;
											scb(xsSignerInfo, xsSignatureInfo);
										})
										.catch(e => {
											console.log(e);
											ecb(-1, ERROR_STD);
										});
									
									})
									.catch(e => {
										console.log(e);
										ecb(-1, ERROR_STD);
									});
								}
							}
							else
							{
								//user not reachable
								scb(xsSignerInfo, xsSignatureInfo);
							}
						}
					})
					.catch(e => {
						console.log(e);
						ecb(-1, ERROR_STD);
					});
				})
				.catch((response) => {
					
					if(service === SERVICENAME_MAHAIT && params && params.host && params.host.indexOf("scmexcise") !== -1) {
						
						// Hide signature notification prompt
						BGUTILS.sendMessageToCS(tabInfo.tabId, G2C_MSG.HIDE_PROMPT).then(r => { console.log("Done");}).catch( e => { console.log(e);} );
					}
					
					console.log("ERROR: Failed to get signature from xorkeesign");
					console.log(response);
					ecb(-1, ERROR_STD);
				});
				
			}, function(){
					
				// error callback
				ecb(-1, ERROR_STD);
				return;
			});
		})
		.catch((e) => {
			console.log(e);
			ecb(-1, ERROR_STD);
		});
	},
	
	getDecryptedData: function(service, tabInfo, encDataArr, xsSignerInfo, params, cb){
		
		var reqpayload = {};
		reqpayload.request = "extensionDecryption";
		reqpayload.service = service;
		reqpayload.initiator = tabInfo;
		reqpayload.handle = xsSignerInfo.handle;
		reqpayload.userAgent = USERAGENT;
		reqpayload.encryptionCert = xsSignerInfo.info.certificate;
		reqpayload.payload = encDataArr;
		reqpayload.displayData = XSG2C.frameDisplayMessage(service, "Request to decrypt the data", undefined, undefined, params);
		
		var out = reqpayload.payload.join("");
		out = XSCUTILS.str2ab(out);
		
		XSG2C.xorkeeNotificationPrompt(service, tabInfo, undefined, out, xsSignerInfo, params, function(){
		
			fetch(URL_XORKEESIGN,{
				method: "POST",
				body: JSON.stringify(reqpayload),
				headers: HEADER_XORKEESIGN,
			})
			.then((response) => {

				if (response.ok) {
					return response.json();
				}
				return Promise.reject(response); 
			})
			.then((response) => {
				
				console.log(response);
				// handle is preserved in contentscript, has it used to display in showNotification prompt
				response.handle = xsSignerInfo.handle;
				response.service = service;
				
				cb(response);
			})
			.catch((e) => {
				console.log(e);
				
				cb({result:-1, errorString:ERROR_STD});
			});
			
		});
	},
	
	getContext: function(service, tabInfo, handle, certificate, commonName, count, cb){
		
		var reqpayload = {};
		reqpayload.request = "extensionGetDataInit";
		reqpayload.service = service;
		reqpayload.initiator = tabInfo;
		reqpayload.handle = handle;
		reqpayload.userAgent = USERAGENT;
		reqpayload.encryptionDSC = certificate;
		reqpayload.commonName = commonName;
		reqpayload.count = count;
		
		fetch(URL_XORKEESIGN,{
			method: "POST",
			body: JSON.stringify(reqpayload),
			headers: HEADER_XORKEESIGN,
		})
		.then((response) => {

			if (response.ok) {
				return response.json();
			}
			return Promise.reject(response); 
		})
		.then((response) => {
			
			console.log(response);
			// handle is preserved in contentscript, has it used to display in showNotification prompt
			response.handle = handle;
			response.service = service;
			
			cb(response);
		})
		.catch((e) => {
			console.log(e);
			
			cb({result:-1, errorString:ERROR_STD});
		});
	},
	
	getData: function(service, tabInfo, xsInfo, payload, params, cb){
		
		var reqpayload = {}, out;
		reqpayload.request = "extensionGetData";
		reqpayload.service = service;
		reqpayload.initiator = tabInfo;
		reqpayload.userAgent = USERAGENT;
		reqpayload.context = xsInfo.context;
		reqpayload.payload = payload;
		
		reqpayload.displayData = XSG2C.frameDisplayMessage(service, XORKEE_REQUEST_TYPE.DECRYPT, undefined, undefined, params);
		
		out = B64.decode(payload);
		out = new Uint8Array(out, 0, out.length);
		
		XSG2C.xorkeeNotificationPrompt(service, tabInfo, undefined, out, xsInfo, params, function(){
		
			fetch(URL_XORKEESIGN,{
				method: "POST",
				body: JSON.stringify(reqpayload),
				headers: HEADER_XORKEESIGN,
			})
			.then((response) => {

				if (response.ok) {
					return response.json();
				}
				return Promise.reject(response); 
			})
			.then((response) => {
				
				console.log(response);
				response.service = service;
				
				if(response.errorString != undefined) response.errorString = XSG2C.frameErrorMessage(service, undefined, response);
				
				cb(response);
			})
			.catch((e) => {
				console.log(e);
				
				cb({result:-1, errorString:ERROR_STD});
			});
		});
	},
	
	getDataFinalize: function(service, tabInfo, context, cb){
		
		var reqpayload = {};
		reqpayload.request = "extensionGetDataFinalize";
		reqpayload.service = service;
		reqpayload.initiator = tabInfo;
		reqpayload.userAgent = USERAGENT;
		reqpayload.context = context;
		
		fetch(URL_XORKEESIGN,{
			method: "POST",
			body: JSON.stringify(reqpayload),
			headers: HEADER_XORKEESIGN,
		})
		.then((response) => {

			if (response.ok) {
				return response.json();
			}
			return Promise.reject(response); 
		})
		.then((response) => {
			console.log(response);
			
			response.service = service;
			cb(response);
		})
		.catch((e) => {
			console.log(e);
			cb({result:-1, errorString:ERROR_STD});
		});
	},
	
	processEncDSCInfo: function(i, response, cb){
		
		if(i >= response.DSC.length)
		{
			cb(response);
		}
		else
		{
			var rv, out, cert;
			
			if(XSCUTILS.getComponentName(response.service) == COMPONENT.CRIS) {
				
				cert = response.DSC[i];
				
				response.DSC[i] = {
					result:0,
					info:{
						certificate:cert
					}
				};
				
				XSG2C.xsCertParser(response.service, response.DSC[i], function(signerInfo){
					
					response.DSC[i] = signerInfo;
					
					XSG2C.processEncDSCInfo(++i, response, cb);
				}, function(err){
					
					cb({result:-1, errorString:ERROR_STD});
				});
			}
			else {
				
				cert = response.DSC[i];
				rv = B64.decode(cert);
				out = new Uint8Array(rv, 0, rv.length);
				
				xsPromiseWrapper(xsGetCertDetails, out)
				.then( certdetails => {
					
					if(certdetails.validTill != undefined)
					{
						// From xorkeesign.js, validTill is returned with T and Z. Example : 2024-11-03T10:56:31Z.
						if(certdetails.validTill.indexOf("T") != -1) certdetails.validTill = certdetails.validTill.replace("T", " ");
						if(certdetails.validTill.indexOf("Z") != -1) certdetails.validTill = certdetails.validTill.replace("Z", " ");
					}
					
					response.DSC[i] = {
						commonName:certdetails.commonName,
						issuerName:certdetails.issuerName,
						type:"Encipherment",
						expiryDate:certdetails.validTill,
						certificate:cert,
					} ;
					
					XSG2C.processEncDSCInfo(++i, response, cb);
				})
				.catch(e => { 
					console.log(e); 
					cb({result:-1, errorString:ERROR_STD});
					return;
				});
			}
		}
	},
	
	getExtGetAllEncDSC: function(service, tabInfo, xsSignerInfo, params, cb){
		
		var reqpayload = {}, out;
		reqpayload.request = "extensionGetAllEncDSC";
		reqpayload.service = service;
		reqpayload.initiator = tabInfo;
		reqpayload.handle = xsSignerInfo.handle;
		
		reqpayload.displayData = XSG2C.frameDisplayMessage(service, XORKEE_REQUEST_TYPE.REGISTERENCRDSC, undefined, undefined, params);
		
		if(params.applyUnits == true) reqpayload.applyUnits = true;
		
		out = new Uint8Array(xsSignerInfo.handle, 0, xsSignerInfo.handle.length);
		
		XSG2C.xorkeeNotificationPrompt(service, tabInfo, undefined, out, xsSignerInfo, params, function(){
		
			fetch(URL_XORKEESIGN,{
				method: "POST",
				body: JSON.stringify(reqpayload),
				headers: HEADER_XORKEESIGN,
			})
			.then((response) => {

				if (response.ok) {
					return response.json();
				}
				return Promise.reject(response); 
			})
			.then((response) => {
				console.log(response);
				
				response.service = service;
				response.handle = xsSignerInfo.handle;
				
				if(response.result == 0)
				{
					XSG2C.processEncDSCInfo(0, response, cb);
				}
				else cb(response);
			})
			.catch((e) => {
				console.log(e);
				cb({result:-1, errorString:ERROR_STD});
			});
		});
	},
	
	getExtCertInfo: function(service, tabInfo, certificate, cb){
		
		var reqpayload = {};
		reqpayload.request = "extensionGetCertInfo";
		reqpayload.service = service;
		reqpayload.initiator = tabInfo;
		reqpayload.userAgent = USERAGENT;
		reqpayload.certificate = certificate;
		reqpayload.includeChain = true;
		
		fetch(URL_XORKEESIGN,{
			method: "POST",
			body: JSON.stringify(reqpayload),
			headers: HEADER_XORKEESIGN,
		})
		.then((response) => {

			if (response.ok) {
				return response.json();
			}
			return Promise.reject(response); 
		})
		.then((response) => {
			console.log(response);
			
			response.service = service;
			
			if(response.result == 0) 
			{
				// In CPPP certificate buffer is used for registering encryptionDSC. From server certificate will not be returned.
				response.info.certificate = certificate;
			}
			
			cb(response);
		})
		.catch((e) => {
			console.log(e);
			cb({result:-1, errorString:ERROR_STD});
		});
	},
	
	encodeEmbPayload: function(infoAB, data, cb){
		
		var resp = {} ;
		resp.result = -1;
		resp.errorString = ERROR_STD;
		
		xsPromiseWrapper(xsGetPayload, 0, infoAB, XSCUTILS.str2ab(data))
		.then( payload => {
			
			xsPromiseWrapper(xsB64Encode, payload)
			.then( payload => {
				
				resp.result = 0;
				resp.responseData = payload;
				delete resp.errorString;
				
				cb(resp);
			})
			.catch(e => {
				console.log(e);
				cb(resp);
			});
		})
		.catch((e, rv) => {
			
			console.log(e);
			if(rv != -100)	//not registered in xorkee
			{
				resp.result = -100;
				resp.errorString = ERROR_NOTREG;
				cb(resp);
			}
			else
			{
				resp.result = -123;
				resp.errorString = ERROR_STD;
				cb(resp);
			}
		});
	},
	
	embListToken: function(service, xsSignerInfo, cb){
		
		const {info, value, result} = xsSignerInfo;
		
		if(result == 0)
		{
			// xorkee user
			if(info != undefined && info.fp != undefined && info.keyStoreID != undefined && info.keyStoreName != undefined && info.keyStoreDisplayName != undefined && value != undefined)
			{
				var data, rv, infoAB;
				
				rv = B64.decode(value);
				infoAB = new Uint8Array(rv, 0, rv.length);
			
				data = {};
				data.fingerPrint = info.fp;
				data.tokens = [];
				
				tmp = {};
				tmp.manufacturerId = "Odyssey Technologies Limited";
				tmp.model = "xorkee";
				tmp.keyStoreID = info.keyStoreID;
				tmp.keyStoreName = info.keyStoreName;
				tmp.keyStoreProvider = "xorkeesign Browser Client";
				tmp.keyStoreDisplayName = info.keyStoreDisplayName;
				data.tokens.push(tmp);
				
				data = JSON.stringify(data);
				
				XSG2C.encodeEmbPayload(infoAB, data, function(response){
					
					cb({...xsSignerInfo, ...response});
				});
			}
			else 
			{
				console.log("This scenario should not occur");
				cb({result:-1, errorString:ERROR_STD});
			}
		}
		else cb(xsSignerInfo);
	},
	
	embListCertificate: function(service, cb){
		
		var arr = [`${service}${STORAGE_KEY.xsSignerInfo}`];
		BGUTILS.getStorage(service, arr)
		.then(({xsSignerInfo}) =>{

			const {info, value} = xsSignerInfo;
			
			if(info != undefined && info.fp != undefined && value != undefined)
			{
				var data, rv, infoAB;
				
				rv = B64.decode(value);
				infoAB = new Uint8Array(rv, 0, rv.length);
				
				data = {};
				data.fingerPrint = info.fp;
				data.certificates = [];
				data.certificates.push(info);
				
				data = JSON.stringify(data);
				
				XSG2C.encodeEmbPayload(infoAB, data, function(response){
					
					cb({...xsSignerInfo, ...response});
				});
			}
			else 
			{
				console.log("This scenario should not occur");
				cb({result:-1, errorString:ERROR_STD});
			}
		})
		.catch(e => {
			console.log(e);
			cb({result:-1, errorString:ERROR_STD});
		});
	},
	
	embGetTBS: function(service, value, payload, scb, ecb){
		
		var data, out, rv, tbs, infoAB;
		if(value != undefined)
		{
			rv = B64.decode(value);
			infoAB = new Uint8Array(rv, 0, rv.length);
		}
		
		//identify the data to be signed (dataToSign)
		data = B64.decode(payload.encryptedRequest);
		out = new Uint8Array(data, 0, data.length);
		
		xsPromiseWrapper(xsGetPayload, 1, infoAB, out)
		.then( out => {
			
			try {
				tbs = JSON.parse(XSCUTILS.ab2str(out));
				if(tbs.dataToSign == undefined)
				{
					//data to be signed is unavailable; just pass on the request to the component
					console.log("ERROR: Data to be signed is unavailable");
					ecb();
				}
				else scb(tbs.dataToSign);
				
			} catch(e) {
				console.log(e);
				//unable to extract the data to be signed; just pass on the request to the component
				console.log("ERROR: Unable to extract the data to be signed");
				ecb();
			}
		})
		.catch(e => {
			console.log(e);
			ecb();
		});
	},
	
	embPKCSSign: function(service, xsSignerInfo, xsSignatureInfo, cb){
		
		var infoAB, rv, data;
		
		const {compVersion, info, value} = xsSignerInfo;
		
		const {result, signature} = xsSignatureInfo;
		
		if(result == 0)
		{
			if(signature != undefined && info != undefined && info.fp != undefined && value != undefined)
			{
				rv = B64.decode(value);
				infoAB = new Uint8Array(rv, 0, rv.length);
			
				data = {};
				data.fingerPrint = info.fp;
			
				data.siginedCertificate = info;
				data.signedText = signature;
				data.signTime = null;
				
				data = JSON.stringify(data);
				
				XSG2C.encodeEmbPayload(infoAB, data, function(response){
						
					cb({...xsSignerInfo, ...xsSignatureInfo, ...response});
				});
			}
			else
			{
				console.log("This scenario should not occur");
				cb({result:-1, errorString:ERROR_STD});
			}
		}
		else cb({...xsSignerInfo, ...xsSignatureInfo});
	},
	
	emsInit: function(service, request, scb, ecb){
		
		if(service == SERVICENAME_MCA)
		{
			XSG2C.getRole(SERVICENAME_MCA)
			.then(({role}) => {
				
				if(role !=  MCA_ROLE_NAME.DIRECTOR)
				{
					// For all roles except "DIRECTOR", PAN number will be filled in the a input text tag.
					if(request.pan != undefined) scb(request.pan);
					else scb(); // Unable to identify user PAN here. In this case handle is used to identify the signer. GetHandle prompt is displayed.
					// else ecb("Unable to fetch PAN : "+service);
				}
				else 
				{
					//PAN would be already set for the MCA ROLE Director by querying the portal with the DIN
					XSG2C.getPan(service, scb, ecb);
				}
			}).catch(e => {ecb(e);});
		}
		else
		{
			// For GST and TDS from the websocket request PAN will be captured.
			if(request.pan != undefined) scb(request.pan);
			else ecb("Unable to fetch PAN : "+service);
		}
	},
	
	emsMCASign: function(service, xsSignerInfo, xsSignatureInfo, cb){
		
		const {info} = xsSignerInfo;
		
		const {result, signature} = xsSignatureInfo;
		
		if(result == 0)
		{
			if(signature != undefined && info != undefined && info.commonName != undefined && info.serialNumber != undefined && info.issuerName != undefined && info.validFrom1 != undefined && info.validTill1 != undefined && info.certClass != undefined )
			{
				cb({...xsSignerInfo, ...xsSignatureInfo, responseData:`${signature}\r\nCommonName=${info.commonName}\r\nSerialNo=${info.serialNumber}\r\nIssuerCommonName=${info.issuerName}\r\nIssuedDate=${info.validFrom1}\r\nExpiryDate=${info.validTill1}\r\nEmail=null\r\nCountry=null\r\nCertificateClass=${info.certClass}`});
			}
			else
			{
				console.log("ERROR : Failed to prepare MCA signature");
				cb({result:-1, errorString:ERROR_STD});
			}
		}
		else cb({...xsSignerInfo, ...xsSignatureInfo});
	},
	
	emsGSTSign: function(service, xsSignerInfo, xsSignatureInfo, cb){
		
		const {info} = xsSignerInfo;
		
		const {result, signature, signingTime} = xsSignatureInfo;
		
		if(result == 0)
		{
			if(signature != undefined && info != undefined && info.commonName != undefined && info.serialNumber != undefined && info.issuerName != undefined && info.validFrom1 != undefined && info.validTill1 != undefined && info.certClass != undefined && signingTime != undefined )
			{
				cb({...xsSignerInfo, ...xsSignatureInfo, responseData:`signature= ${signature}\nSerialNo= ${info.serialNumber}\nCommonName= ${info.commonName}\nIssuerName= ${info.issuerName}\nIssuedDate= ${info.validFrom1}\nExpiryDate= ${info.validTill1}\nCertClass= ${info.certClass}\nSigningTime= SigningTime: ${signingTime}\nuniqueID= null`});
			}
			else
			{
				console.log("ERROR : Failed to prepare GST signature");
				cb({result:-1, errorString:ERROR_STD});
			}
		}
		else cb({...xsSignerInfo, ...xsSignatureInfo});
	},
	
	emsTDSSign: function(service, xsSignerInfo, xsSignatureInfo, cb){
		
		const {info} = xsSignerInfo;
		
		const {result, signature} = xsSignatureInfo;
		
		if(result == 0)
		{
			if(signature != undefined && info != undefined && info.commonName != undefined && info.serialNumber != undefined && info.issuerName != undefined && info.validFrom1 != undefined && info.validTill1 != undefined && info.certClass != undefined)
			{
				cb({...xsSignerInfo, ...xsSignatureInfo, responseData:`signature=${signature}\r\nserial=${info.serialNumber}\r\ncommonname=${info.commonName}\r\nissuercommonname=${info.issuerName}\r\nissuedDate=${info.validFrom1}\r\nexpiryDate=${info.validTill1}\r\ncertificateClass=${info.certClass}`});
			}
			else
			{
				console.log("ERROR : Failed to prepare TDS signature");
				cb({result:-1, errorString:ERROR_STD});
			}
		}
		else cb({...xsSignerInfo, ...xsSignatureInfo});
	},
};

const XSCACHE = {
	
	get: (request) => {
		
		return new Promise((resolve, reject) => {
			
			chrome.storage.local.get([request])
			.then((result) => {
				resolve(result[request]);
			})
			.catch(e => {
				reject(e);
			});
		});
	},
	
	push: (obj) => {
		
		return new Promise((resolve, reject) => {
			
			var res = {};
			res[obj.response] = obj;

			chrome.storage.local.set(res)
			.then(() => {
				resolve(obj);
			})
			.catch((e) => {
				console.log(e);
				reject(e);
			});
		});
	},
	
	clear: (request) => {
		return chrome.storage.local.remove([request]);
	},
};

