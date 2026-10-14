console.log("xorkeesign India G2C wbhs.js attached");

console.log("xorkeesign India G2C webpage script attached");

var EXTENSION_ID;

function setExt() {
	
	EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
	if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji";

	if(chrome?.runtime) {
		
		chrome.runtime.getManifest = () => {
			return {version:document.documentElement.getAttribute("xsG2C-version")};
		};
	}
}

setExt();

(function(){	//wrapping inside an IIDE to avoid clash with the target portal

	class otlWbhs {
		
		constructor(params) {
			
			setExt();
			
			this.Req = {};
			this.response = this.ERROR_STR;
			this.xsSignerInfo = null;
			this.handle = null;
			
			if (params) {
				
				this.loadReq(params);
				this.init();
			}
		}
		
		STORAGE_KEY_HANDLE ="xshandle";
		
		ERROR_STR = "Error 9999~";
		
		DSIGN = {
			CERT_DETAILS:"certDetail",
			SIGN_PDF:"signPDF",
			SIGN_DATA:"signData",
			VERIFY_SIGNED_PDF:"verifySignedPDF",
		}
		
		MODE = {
			DATA:"data",
			URL:"url",
		}
		
		LOCAL_COPY = "y"
		
		xhr(method, url, payload) {
			
			var resp;
			
			const xhr = new XMLHttpRequest();
			xhr.open(method, url, false);
			if(method === "GET") xhr.overrideMimeType("text/plain; charset=x-user-defined");
			else {
				// for xorkeesign
				payload.userAgent = USERAGENT;
				payload.userAgent.version = document?.documentElement?.getAttribute("xsG2C-version");
				payload.initiator = this.frameTabInfo();
			}
			
			try {
				xhr.send(JSON.stringify(payload));
			}
			catch(e) {
				console.log(e);
				return {result:-1, errorString:"xorkeesign is unable to process your signature request now. Try again after some time."};
			}
			
			if(method === "POST") {
				try {
					resp = JSON.parse(xhr.responseText);
				}
				catch(e) {
					console.log(e);
					return {result:-2, errorString:"xorkeesign is unable to process your signature request now. Try again after some time."};
				}
			}
			else resp = xhr.response;
			
			return resp;
		}
		
		loadReq(p) {
			
			p = new URLSearchParams(p);
			
			p.forEach((v, k) => {
				this.Req[k] = v;
			});
			
			console.log(this.Req);
		}
		
		frameTabInfo() {
		
			var info = {};
			info.url = window.location.href;
			info.title = document.title;
			return info;
		}
		
		convertEpochToDate(epoch, flag) {
			
			const date = new Date(epoch * 1000); // Convert seconds to milliseconds
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const year = date.getFullYear();
			const day = date.getDate().toString().padStart(2, '0');
			const hours = date.getHours().toString().padStart(2, '0');
			const minutes = date.getMinutes().toString().padStart(2, '0');
			const seconds = date.getSeconds().toString().padStart(2, '0');

			if(flag === 1) return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
			else if(flag === 2) return `${day}${month}${year}_${hours}${minutes}${seconds}`;
			else return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
		}

		addCRLF(cert) {
			
			var m = 0, rv = "", i;
			
			for(i=0; i<cert.length; i++) {
				rv += cert[i];
				if(m===75) {
					rv += "\r\n";
					m=0;
				}
				else m++;
			}
			
			return rv;
		}
		
		getDnDetails(rv) {
			
			var dn, val;
			
			dn = rv.split(",");
			dn.forEach(function(dnFields, index){
				
				val = dnFields.split("=")[0];
				if(val.indexOf("2.5.4") != -1) rv = rv.replace(val, ` OID.${val.trim()}`);
			});
			
			return rv;
		}
		
		getKeyUsage(rv, onlytrue) {
			
			//digitalSignature=true, nonRepudiation=true, keyEncipherment=false, dataEncipherment=false, keyAgreement=false, keyCertSign=false, cRLSign=false, encipherOnly=false, decipherOnly=false
			
			var val, j, flag;
			
			val = "";
							
			for(j=15; j>=7; j--)
			{
				if(rv & (1 << j)) flag = true;
				else flag = false;
				
				if(onlytrue && !flag) continue;
				
				switch(j)
				{
					case 15:
						val += "digitalSignature="+flag;
						break;
					case 14:
						val += ", nonRepudiation="+flag;
						break;
					case 13:
						val += ", keyEncipherment="+flag;
						break;
					case 12:
						val += ", dataEncipherment="+flag;
						break;
					case 11:
						val += ", keyAgreement="+flag;
						break;
					case 10:
						val += ", keyCertSign="+flag;
						break;
					case 9:
						val += ", cRLSign="+flag;
						break;
					case 8:
						val += ", encipherOnly="+flag;
						break;
					case 7:
						val += ", decipherOnly="+flag;
						break;
				}
			}
			
			return val;
		}
		
		removeZero(serialNo) {
			
			var sno = "";
			for(var i=0; i<serialNo.length; i++)
			{
				if(serialNo.charAt(i) != "0") break;
			}
			return serialNo.substring(i);
		}
		
		downloadFile(dataurl, filename) {
			
			const link = document.createElement("a");
			link.href = "data:application/pdf;base64,"+dataurl;
			link.download = filename;
			link.click();
		}
		
		toHttps(url) {
			
			// Convert URL from http to https
			var newUrl;
			
			try {
				newUrl = new URL(url);
			}
			catch(e) {
				console.log(e);
				return url;
			}
			
			if (newUrl.protocol === "http:") {
				newUrl.protocol = "https:";
			}
			return newUrl.toString();
		}
		
		showError(info) {
			
			switch(info.result) {
				
				case XS_ERRCODE.NON_XORKEE_HANDLE: {
					
					xsg2cpopup.xorkeeRegisterDSCReg(undefined, info.handle, () => {}, true);
					break;
				}
				case XS_ERRCODE.XORKEE_NOT_REACHABLE: {
					
					xsg2cpopup.retrySignature(SERVICENAME_WBHS, info.handle, () => {}, true);
					break;
				}
				case XS_ERRCODE.UNITS_UNAVAILABLE: {
					xsg2cpopup.subscriptionRequired(SERVICENAME_WBHS, this.handle, info.isEnrolled, info.subscription, () => {}, false);
					break;
				}
				case XS_ERRCODE.LIVE_EXPIRED: {
					xsg2cpopup.renewSubscription(SERVICENAME_WBHS, info.url, this.handle, () => {});
					break;
				}
				default: {
					xsg2cpopup.showError(info.errorString);
					break;
				}
			}
		}
		
		getHandle() {
			
			var savedHandle = window.localStorage.getItem(this.STORAGE_KEY_HANDLE);
			
			var userResponse = prompt("Enter your xorkee handle to sign", (savedHandle)?savedHandle:"");
			if (userResponse) {
				
				if(userResponse.slice(-11) !== "@xorkee.com") userResponse = userResponse+"@xorkee.com";
				return userResponse;
			} else {
				console.log("Request cancelled by user.");
				return userResponse;
			}
		}
		
		getSignerInfo() {
			
			const req = {
				request:"extensionGetSignerInfo",
				service:SERVICENAME_WBHS,
				handle:this.handle,
			};
			
			// xorkeesign signer Info request is sent to get the signature size and certificate details
			const xsSignerInfo = this.xhr("POST", URL_XORKEESIGN, req);
			
			if(xsSignerInfo.result !== 0) window.localStorage.removeItem(this.STORAGE_KEY_HANDLE);
			else {
				var savedHandle = window.localStorage.getItem(this.STORAGE_KEY_HANDLE);
				if(savedHandle !== xsSignerInfo.handle) window.localStorage.removeItem(this.STORAGE_KEY_HANDLE);
			}
			
			return xsSignerInfo;
		}
		
		confirmDSC() {
			
			var rv, out, val, arr, str, key;
			
			rv = B64.decode(this.xsSignerInfo.certificate);
			out = new Uint8Array(rv, 0, rv.length);
			
			arr = ["subjectCN", "validFrom", "validTill", "serialNo", "issuerDN", "keyUsage"];
			
			str = "";
			
			arr.forEach((rv, i, arr) => {
				
				[rv, val] = xsGetCertParam(out, rv);
				
				if(rv === 0) {
					
					if(arr[i] == "serialNo") {
						key = "Serial";
						val = XSCUTILS.ab2hex(val);
						val = this.removeZero(val);
					}
					else if(arr[i] == "validTill") {
						key = "ValidTo";
						val = this.convertEpochToDate(val);
					}
					else if(arr[i] == "validFrom" ) {
						key = "ValidFrom";
						val = this.convertEpochToDate(val);
					}
					else if(arr[i] == "issuerDN" ) {
						key = "Issuer";
						val = this.getDnDetails(val);
					}
					else if(arr[i] == "keyUsage") {
						key = "Certificate Usage";
						val = this.getKeyUsage(val, true);
					}
					else if(arr[i] === "subjectCN") {
						key = "CN"
					}
					
					if(key && val) str += `${key}:${val}\n`;
				}
			});
			
			return confirm("Certificate Confirmation\n\n"+str);
		}
		
		getSignature(tbs, handle, displayStr) {
			
			// Get a signature to check the private key possession and the certificate buffer
			const req = {
				request:"extensionGetSignature",
				service:SERVICENAME_WBHS,
				param1:tbs,
				param2:handle,
				param3:displayStr,
			};
			
			const [rv, id] = xsGetNotificationId(XSCUTILS._base64ToArrayBuffer(req.param1));
			
			if(rv !== 0) {
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, `xsGetNotificationId failed : ${rv} - ${id}`);
				return;
			}
			
			// Show Notification
			CSUTILS.displayNotification(SERVICENAME_WBHS, true, `Notification sent to ${req.param2}. Please approve in your xorkee app.Notification Id - ${id}`).catch((e) => console.log(e));
			
			// xorkeesign signature request is sent
			const xsSignatureInfo = this.xhr("POST", URL_XORKEESIGN, req);
			
			// Hide Notification
			CSUTILS.displayNotification(SERVICENAME_WBHS, false).catch((e) => console.log(e));
			
			if(xsSignatureInfo.result == 0) window.localStorage.setItem(this.STORAGE_KEY_HANDLE, this.handle);
			
			return xsSignatureInfo;
		}
		
		init() {
			
			if(this.Req &&!this.Req.dsign) {
				xsg2cpopup.showError(ERROR_PORTAL);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "dsign not found: ");
				return;
			}
			
			switch(this.Req.dsign) {
				
				case this.DSIGN.CERT_DETAILS: {
					
					var rv, out, params, i, result, dn, val;
					
					this.handle = this.getHandle();
				
					if(!this.handle) return;
					
					// Get SignerInfo using the signer's handle
					this.xsSignerInfo = this.getSignerInfo();
					
					if(this.xsSignerInfo.result !== 0) {
						this.showError(this.xsSignerInfo);
						return null;
					}
					
					// Native prompt to display the certificate DN details for confirmation
					rv = this.confirmDSC();
					
					if(!rv) {
						// User declined the DSC confirmation
						return;
					}
					
					// SHA2 and base64 digest for the given data
					const textAsBuffer = new TextEncoder().encode(this.handle);
					
					[result, out] = xsSHA256(textAsBuffer);
					if(result === -1) {
							
						console.log(out);
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, `xsSHA256 failed : ${out} - ${result}`);
						return;
					}
					[result, rv] = xsB64Encode(out);
					if(result === -1) {
							
						console.log(rv);
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, `xsB64Encode failed : ${rv} - ${result}`);
						return;
					}
					
					// Send signature request
					const xsSignatureInfo = this.getSignature(rv, this.handle, "registerDSC");
					
					if(xsSignatureInfo.result !== 0) {
						this.showError(xsSignatureInfo);
						return;
					}
					
					xsSignatureInfo.certificate = this.xsSignerInfo.certificate;
					
					// Extract certificate details from the base64 buffer
					rv = B64.decode(xsSignatureInfo.certificate);
					out = new Uint8Array(rv, 0, rv.length);
					
					xsSignatureInfo.info = {};
					
					params = ["serialNo", "issuerDN", "subjectDN", "publicKey", "validTill", "validFrom", "keyUsage"];
					
					for(i=0; i<params.length; i++) {
						
						[result, rv] = xsGetCertParam(out, params[i])
						if(result === -1) {
							
							console.log(rv);
							xsg2cpopup.showError(FACILITY_UNSUPPORTED);
							CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, `xsGetCertParam failed : ${rv} - ${result}`);
							return;
						}
						
						if(params[i] == "serialNo") rv = this.removeZero(XSCUTILS.ab2hex(rv));
						else if(params[i] == "publicKey") rv = B64.encode(rv);
						else if(params[i] == "validTill" || params[i] == "validFrom" ) rv = this.convertEpochToDate(rv);
						else if(params[i] == "subjectDN" || params[i] == "issuerDN" ) rv = this.getDnDetails(rv);
						else if(params[i] == "keyUsage") rv = this.getKeyUsage(rv);
						
						xsSignatureInfo.info[params[i]] = rv;
					}
					
					this.response = `${xsSignatureInfo.info.subjectDN}~${xsSignatureInfo.info.issuerDN}~${xsSignatureInfo.info.serialNo}~${xsSignatureInfo.info.validFrom}~${xsSignatureInfo.info.validTill}~${xsSignatureInfo.info.keyUsage}~${this.addCRLF(xsSignatureInfo.info.publicKey)}~${this.convertEpochToDate(Date.now()/1000, 1)}`;
					break;
				}
				
				case this.DSIGN.SIGN_DATA: {
					
					var rv, result, out;
					
					this.handle = this.getHandle();
				
					if(!this.handle) return;
					
					// SHA2 RSA raw signature
					
					// Get SignerInfo using the signer's handle
					this.xsSignerInfo = this.getSignerInfo();
					
					
					if(this.xsSignerInfo.result !== 0) {
						this.showError(this.xsSignerInfo);
						return null;
					}
					
					// Native prompt to display the certificate DN details for confirmation
					rv = this.confirmDSC();
					
					if(!rv) {
						// User declined the DSC confirmation
						return;
					}
					
					// SHA2 and base64 digest for the given data
					const textAsBuffer = new TextEncoder().encode(this.Req.dataToSign);
					
					[result, out] = xsSHA256(textAsBuffer);
					if(result === -1) {
							
						console.log(out);
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, `xsSHA256 failed : ${out} - ${result}`);
						return;
					}
					[result, rv] = xsB64Encode(out);
					if(result === -1) {
							
						console.log(rv);
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, `xsB64Encode failed : ${rv} - ${result}`);
						return;
					}
					
					// Send signature request
					const xsSignatureInfo = this.getSignature(rv, this.handle, "rawsig_Signature requested to sign the data");
					
					if(xsSignatureInfo.result !== 0) {
						this.showError(xsSignatureInfo);
						return;
					}
					
					this.response = this.addCRLF(xsSignatureInfo.signature);
					
					break;
				}
				
				case this.DSIGN.SIGN_PDF: {
					
					var pdf, rv, pageNo, arr, out, result, stream, digest, sigpos;
					
					if(this.Req.mode.toLowerCase() === this.MODE.DATA) {
						
						// In this mode the PDF buffer is return from the portal has base64 encoded
						pdf = XSCUTILS._base64ToArrayBuffer(this.Req.base64Pdf);
					}
					else if(this.Req.mode.toLowerCase() === this.MODE.URL) {
						
						// In this mode the PDF file URL is sent
						// We send the XHR sync GET request to the URL to fetch the PDF file
						pdf = this.xhr("GET", this.toHttps(this.Req.pdfUrl), null);
						pdf = XSCUTILS.str2ab(pdf);
					}
					else {
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Unknown mode : "+this.Req.mode);
						return;
					}
					
					this.handle = this.getHandle();
				
					if(!this.handle) return;
					
					// Get SignerInfo using the signer's handle
					this.xsSignerInfo = this.getSignerInfo();
					
					if(this.xsSignerInfo.result !== 0) {
						this.showError(this.xsSignerInfo);
						return null;
					}
					
					// Native prompt to display the certificate DN details for confirmation
					rv = this.confirmDSC();
					
					if(!rv) {
						// User declined the DSC confirmation
						return;
					}
					
					CM_PDFMaxSignatureSize(this.xsSignerInfo.info.sigSize * 2);
					
					// In the signature appearance, signing time form server is computed
					const date = this.convertEpochToDate(this.xsSignerInfo.time);
					const x = this.Req.llx;
					const y = this.Req.lly;
					const width = this.Req.urx - x;
					const height = this.Req.ury - y;
					
					pageNo = 1;
					
					if(this.Req?.all_page === "p" || this.Req?.all_page === "P") {
						if(this.Req.pageNo) pageNo = this.Req.pageNo;
					}
					else if(this.Req?.all_page === "f" || this.Req?.all_page === "F") {
						pageNo = 1;
					}
					else if(this.Req?.all_page === "l" || this.Req?.all_page === "L") {
						pageNo = -1;
					}
					else if(this.Req?.all_page === "a" || this.Req?.all_page === "A") {
						pageNo = 0;
					}
					
					// Signature appearance V3 profile
					const PDF_PROFILE = {"isDemo": false,"version": 3,"preserveOrder": false, "singleAnnotation": true, "docProfile":[{"resources": {"fonts": [{"name": "font1$","fontName": "Helvetica"}],"appearances": [{"name": "initial","dimension": {"width": width,"height": height}}]},"positions": [{"initial": [{"statusIndicator": false,"position": [x, y],"rotation": 0,"pageNum": [pageNo]}]}]}]};
					
					arr = [this.xsSignerInfo.info.subjectCommonName];
					
					stream = CSUTILS.setSigAppearance(arr, 1, width/2, height, PDF_PROFILE.docProfile[0].resources.fonts[0].name, 20);
					
					arr = [];
					
					if(this.xsSignerInfo.info.subjectCommonName) arr.push("Digitally signed by "+this.xsSignerInfo.info.subjectCommonName);
					
					// Extract certificate details from the base64 buffer
					rv = B64.decode(this.xsSignerInfo.certificate);
					out = new Uint8Array(rv, 0, rv.length);
					
					[result, rv] = xsGetCertParam(out, "subjectDN")
					if(result === 0) arr.push("DN:"+rv);
					
					if(this.Req.SignReason) arr.push("Reason: "+this.Req.SignReason);
					if(date) arr.push("Date: "+date);
					
					stream += CSUTILS.setSigAppearance(arr, (width/2)+2, width/2, height, PDF_PROFILE.docProfile[0].resources.fonts[0].name, 5);
					
					PDF_PROFILE.docProfile[0].resources.appearances[0].stream = btoa(stream);
					
					// Get PDF digest
					[rv, pdf, digest, sigpos] = CM_PDFSignV3(PDF_PROFILE, pdf, null, "sha2", this.xsSignerInfo.handle, null, (this.Req.SignReason)?this.Req.SignReason:null, null);	
			
					if(rv !== 0) {
						console.log(rv, pdf);
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "CM_PDFSignV3 - FAILED "+rv);
						return;
					}
					
					// base64 encode the digest
					[result, out] = xsB64Encode(digest);
					if(result === -1) {
							
						console.log(out);
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, `xsB64Encode failed : ${out} - ${result}`);
						return;
					}
					
					// Send signature request
					const xsSignatureInfo = this.getSignature(out, this.handle, "signPDF");
					
					if(xsSignatureInfo.result !== 0) {
						this.showError(xsSignatureInfo);
						return;
					}
					
					// embed pkcs7 signature to the PDF
					rv = CM_PDFEmbedSig_Sync(pdf, XSCUTILS._base64ToArrayBuffer(xsSignatureInfo.signature), sigpos);
					
					if(!rv) {
						console.log(rv);
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "CM_PDFEmbedSig_Sync - FAILED "+rv);
						return;
					}
					
					rv = XSCUTILS._arrayBufferToBase64(rv);
					
					this.response = this.addCRLF(rv);
					
					if(this.Req?.localcopy.toLowerCase() === this.LOCAL_COPY) {
						this.downloadFile(rv, this.convertEpochToDate(Date.now()/1000, 2)+"_Signed.pdf");
					}

					break;
				}
				
				case this.DSIGN.VERIFY_SIGNED_PDF: {
					
					var pdf, rv, result, val, len, i, key, flag
					
					if(this.Req.mode.toLowerCase() === this.MODE.DATA) {
						
						// In this mode the PDF buffer is return from the portal has base64 encoded
						pdf = XSCUTILS._base64ToArrayBuffer(this.Req.base64Pdf);
					}
					else if(this.Req.mode.toLowerCase() === this.MODE.URL) {
						
						// In this mode the PDF file URL is sent
						// We send the XHR sync GET request to the URL to fetch the PDF file
						pdf = this.xhr("GET", this.toHttps(this.Req.pdfUrl), null);
						pdf = XSCUTILS.str2ab(pdf);
					}
					else {
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Unknown mode : "+this.Req.mode);
						return;
					}
					
					rv = {};
					result = false;
					
					CM_PDFVerify(pdf, (r) => {
						
						// Success
						result = true;
						
						// get only unique field names
						r.forEach((v) => {rv[v.sigfieldname] = v;});
					}, (r) => {
						
						// Error
						result = false;
						rv = r;
						console.log(r);
					});
					
					if(!result) {
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "CM_PDFVerify failed : "+rv);
						return;
					}
					
					val = "";
					len = Object.keys(rv).length;
					
					if(len > 0) {
						
						i=1;
						for(key in rv) {
							
							if(rv[key].status === "good") flag = true;
							else flag = false;
							
							val += `Document revision: ${i} of ${len}\r\nIntegrity check OK? ${flag}\r\n`;
							i++;
						}
					}
					else val = "ERROR: 128~";
					
					this.response = val;
					
					break;
				}
				
				default: {
					xsg2cpopup.showError(FACILITY_UNSUPPORTED);
					CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Unknown dsign : "+this.Req.dsign);
					return;
				}
			}
			
		}
	}
	
	const _open = XMLHttpRequest.prototype.open;
	const _send = XMLHttpRequest.prototype.send;
	
	XMLHttpRequest.prototype.open = function() {
		// console.log("XHR: Open | "+arguments[1]);
		
		if(arguments[1]?.indexOf("localhost:7654") > -1)
		{
			this._trap = true;
		}
		else
		{
			//set the flag to indicate not to intercept the triggers to this URL
			this._trap = false;
		}
		
		_open.apply(this, arguments);
	};
	
	XMLHttpRequest.prototype.send = function() {
		// console.log("XHR: Send", this, this.onload, this.onreadystatechange);
		
		if(this._trap == true)
		{	
			var _otlWbhs, response;
			
			try {
				_otlWbhs = new otlWbhs(arguments[0]);
				response = _otlWbhs.response;
			}
			catch(e) {
				console.log(e);
				_otlWbhs = new otlWbhs();
				response = _otlWbhs.ERROR_STR;
			}
			
			console.log("------WBHS Response--------");
			console.log(response);
			console.log("------WBHS Response--------");
			
			if((this.onload instanceof Function) == true)
			{
				//modify the readonly properties so that we can set this from JS as required
				Object.defineProperty(this, 'readyState', {
					writable: true
				});
				Object.defineProperty(this, 'status', {
					writable: true
				});
				Object.defineProperty(this, 'responseText', {
					writable: true
				});
				Object.defineProperty(this, 'response', {
					writable: true
				});
			
				this.readyState = 4;
				this.status = 200;
				this.response = response;
				this.onload();
			}
		}
		else
		{
			//pass the request as such
			_send.apply(this, arguments);
		}
	};
	
	/* 
	
	const XS_STORAGE = {
		
		STORAGE_KEY:"xshandleInfo",
		
		handle:null,
		
		userid:null,
		
		serialize: function() {
			
			return JSON.stringify({
				userid:this.userid,
				handle:this.handle
			});
		},
		
		store: function() {
			
			localStorage.setItem(this.STORAGE_KEY, this.serialize());
		},
		
		clear: function () {
			localStorage.removeItem(this.STORAGE_KEY);
		},
		
		get: function() {
			
			xshandle = localStorage.getItem(this.STORAGE_KEY);
			if(xshandle) {
				return JSON.parse(xshandle);
			}
			else return null;
		},
	};
	
	function loadSigner() {
		
		return new Promise((resolve, reject) => {
				
			xsg2cpopup.signerHandle("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled")
			.then(([flag, handle, saveHandle]) => {
				
				xsg2cpopup.removePopup();
				
				if(flag) {
					
					xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
					
					CSUTILS.getSignerInfo(SERVICENAME_EPF, {handle:handle})
					.then((xsCertInfo) => {
						
						if(xsCertInfo && xsCertInfo.result === 0) {
						
							if(saveHandle) xsg2cStoreHandle(handle);
							
							XS_STORAGE.handle = handle;
							XS_STORAGE.store();
							
							resolve(true);
						}
						else {
							XS_STORAGE.clear();
							resolve(false);
						}
					})
					.catch((e) => {
						console.log(e);
						XS_STORAGE.clear();
						resolve(false);
					});
				}
				else {
					XS_STORAGE.clear();
					resolve(false);
				}
			})
			.catch((e) => {
				console.log(e);
				XS_STORAGE.clear();
				resolve(false);
			});
		});
	}
	
	async function doFormAction(tags) {
		
		var i, _form, action, handleInfo, flag, handle, saveHandle, xsinit, fd, userid, xshandle;
	
		for(i=0; i<tags.length; i++) {
			
			_form = tags[i];
			action = _form.getAttribute("action");
			xsinit = _form.getAttribute("xsinit");
			submitBtn = _form.querySelector("#Button1");
			
			if(action && action.toLowerCase().indexOf(("login_new.aspx").toLowerCase()) !== -1 && _form.id === "form1" && !xsinit && submitBtn) {
				
				console.log("onclick trap");
				
				_form.setAttribute("xsinit", "true");
				
				submitBtn.addEventListener('click', async (e) => {
					
					e.preventDefault();
					
					setExt();
					
					fd = new FormData(_form);
					userid = fd.get("txtUser_Id");
					
					xshandle = XS_STORAGE.get();
					
					if(xshandle && xshandle.userid !== userid) {
						
						XS_STORAGE.clear();
						localStorage.removeItem("xshandle");
					}
					
					XS_STORAGE.userid = userid;
					
					await loadSigner();
					
					_form.removeAttribute("xsinit");
					
					submitBtn.click();
					
				}, {once:true, capture:true});
				
				observer.disconnect();
				break;
			}
		}
	}
	
	doFormAction(document.getElementsByTagName('form'));
	
	const observer = new MutationObserver(async function() {
	
		doFormAction(document.getElementsByTagName('form'));
	});
	if(document) observer.observe(document, { subtree: true, childList: true}); */
	
})();