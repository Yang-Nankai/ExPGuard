console.log(" *** xorkeesign WebSocket intercept deployed *** ");

var EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji"; //DEPLOY

const OTLWSS_STATE_NONE	= 0;
const OTLWSS_STATE_INIT = 1;
const OTLWSS_STATE_WAIT = 2;
const OTLWSS_STATE_SIGN = 3;

//variables to interact with the external component
var MCA_EMS_VERSION = "1.1";
var GST_EMS_VERSION = "2.8";
var GST_EMS_ID = "gstnInfy";
var TDS_EMS_VERSION = "2.0";
var TDS_EMS_VERSION = "2.0";
var CRIS_VERSION = "1.3";
var IREPS_VERSION = "1.5";

var CRIS_PORT = 2039;
var IREPS_PORT = 2175;

const WSS_SERVICENAME_UNKNOWN = "unknown";
const WSS_SERVICENAME_MCA = "mca";
const WSS_SERVICENAME_GST = "gst";
const WSS_SERVICENAME_TDS = "tds";
const WSS_SERVICENAME_IRCEP = "ircep";
const WSS_SERVICENAME_IREPS = "ireps";

//identify the target service
var _serviceName = WSS_SERVICENAME_UNKNOWN;
//depending upon how the web page is built we will decide
//whether to immediately deploy the trap or defer until the message from extension
if(window.location.hostname.indexOf("mca.gov.in") != -1) _serviceName = WSS_SERVICENAME_MCA;
else if(window.location.hostname.indexOf("tdscpc.gov.in") != -1) _serviceName = WSS_SERVICENAME_TDS;
else if(window.location.hostname.indexOf("gst.gov.in") != -1) _serviceName = WSS_SERVICENAME_GST;
else if(window.location.hostname.indexOf("ircep.gov.in") != -1) _serviceName = WSS_SERVICENAME_IRCEP;
else if(window.location.hostname.indexOf("ireps.gov.in") != -1) _serviceName = WSS_SERVICENAME_IREPS;

class otlCris {
	
	constructor(service) {
		
		this._service = service;
		this._onmessage = null;
		this._payload = "";
		this.Req = null;
		this.Resp = null;
	}
	
	reset() {
		this._payload = "";
	}
	
	set onmessage(value) {
		this._onmessage = value;
	}
		
	base64ToHex(str) {
	  const raw = atob(str);
	  let result = '';
	  for (let i = 0; i < raw.length; i++) {
		const hex = raw.charCodeAt(i).toString(16);
		result += (hex.length === 2 ? hex : '0' + hex);
	  }
	  return result.toLowerCase();
	}
	
	arrayBufferToHex(buffer) {
		const byteArray = new Uint8Array(buffer);
		const hexCodes = [...byteArray].map(byte => {
			const hexCode = byte.toString(16);
			return hexCode.padStart(2, '0');
		});
		return hexCodes.join('');
	}
	
	hexToArrayBuffer(hex) {
		
	  if (hex.length % 2 !== 0) {
		throw new Error('Hex string must have an even number of characters');
	  }

	  const buffer = new ArrayBuffer(hex.length / 2);
	  const view = new Uint8Array(buffer);

	  for (let i = 0; i < hex.length; i += 2) {
		view[i / 2] = parseInt(hex.substr(i, 2), 16);
	  }

	  return view;
	}
	
	createIv() {
		
		const s = window.atob("ZU11ZGhyYWNvbnN1bWVyc2VydmljZWxpbWl0ZWQuZU11ZGhyYWNvbnN1bWVyc2VydmljZWxpbWl0ZWQuZU11ZGhyYWNvbnN1bWVyc2VydmljZWxpbWl0ZWQu");
		
		var len = s.length;
		var b = new Uint8Array(64);
		for (var i = 0, j = 0; i < len; i += 2, j++) {
		  var high, low;
		  var ch = s.charAt(i);
		  if (ch >= '0' && ch <= '9') {
			high = ch.charCodeAt(0) - 48;
		  } else if (ch >= 'a' && ch <= 'f') {
			high = ch.charCodeAt(0) - 97 + 10;
		  } else if (ch >= 'A' && ch <= 'F') {
			high = ch.charCodeAt(0) - 65 + 10;
		  } else {
			high = 0;
		  } 
		  ch = s.charAt(i + 1);
		  if (ch >= '0' && ch <= '9') {
			low = ch.charCodeAt(0) - 48;
		  } else if (ch >= 'a' && ch <= 'f') {
			low = ch.charCodeAt(0) - 97 + 10;
		  } else if (ch >= 'A' && ch <= 'F') {
			low = ch.charCodeAt(0) - 65 + 10;
		  } else {
			low = 0;
		  } 
		  //console.log(s.charAt(i), s.charAt(i + 1), high, low, (high << 4 | low));
		  b[j] = (high << 4 | low);
		} 
		
		b = b.slice(16, 32);
		
		return b;
	}
		
	generateAESKey() {
		
		return crypto.subtle.generateKey(
			{
				name: "AES-CBC",
				length: 128
			},
			true, // extractable
			["encrypt", "decrypt"]
		).catch((e) => console.log(e));
    }
	
	encryptData(key, ivBytes, encodedData) {
		
		return crypto.subtle.encrypt(
			{
				name: "AES-CBC",
				iv: ivBytes
			},
			key,
			encodedData
		).catch((e) => console.log(e));
	}
		
	encryptRSA(key, plaintext) {
		
		return crypto.subtle.encrypt(
			{
				name: "RSA-OAEP"
			},
			key,
			plaintext
		).catch((e) => console.log(e));
	}
	
	importAesKey(keyBuffer) {
		
		// Import the AES key
		return crypto.subtle.importKey(
			"raw",
			keyBuffer,
			{
				name: "AES-CBC"
			},
			false,
			["decrypt"]
		).catch((e) => console.log(e));
	}
	
	aesDecryptData(ivBuffer, key, encryptedDataBuffer) {
		
		// Decrypt the data
		return crypto.subtle.decrypt(
			{
				name: "AES-CBC",
				iv: ivBuffer
			},
			key,
			encryptedDataBuffer
		).catch((e) => console.log(e));
	}
	
	exportAesKey(key) {
		
		return crypto.subtle.exportKey("raw", key).catch((e) => console.log(e));
	}
	
	downloadFile(dataurl, filename) {
		const link = document.createElement("a");
		link.href = dataurl;
		link.download = filename;
		link.click();
	}
	
	async getFile(accept) {
		
		return new Promise(async (resolve, reject) => {
			
			const input = document.createElement('input');
			input.type = 'file';
			
			if(accept) input.setAttribute("accept", accept);
			
			input.oncancel = async () => {
				reject("Unable to get file");
			};
			
			input.onchange = async () => {
				
				const rv = await input.files[0].arrayBuffer().catch(e => {console.log(e)});
				
				if(rv) resolve([input.files[0].name, rv]);
				else reject("Unable to get file");
			}
			input.click();
		});
	}
	
	async setPayload(pl) {	

		// Preserve all payload untill completed string is found at the end
		this._payload += pl;
		
		if(this._payload.substring(this._payload.length-9) === "completed") {
			
			this.Req = new otlCrisRequest(this._payload);
			this.Resp = new otlCrisResponse();
			
			this._payload = ""; // cleared payload
			
			if(Object.values(this.Req.ACTIONS).indexOf(this.Req.action) === -1) {
				
				// Unsupported action
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Unknown action : "+this.Req.action);
				this.sendMessage(this.Resp.SIGN_CANCEL);
				return;
			}
		
			this.init();
		}
		else {
			
			// If the payload is large, the response will be sent in chunk
			// sendmore message should be sent to get the next chunk
			
			this.Resp = new otlCrisResponse();
			this.sendMessage(this.Resp.SEND_MORE);
		}
	}
	
	togglePortalLoader() {
		try {
			$('#processingModal').modal('toggle');
		}
		catch(e) {
			console.log(e);
		}
	}
			
	sendMessage(msg) {
		
		this.togglePortalLoader();
		
		console.log(msg);
		
		const e = new MessageEvent("message", {data:msg});
				
		if(msg !== this.Resp.SEND_MORE) this.reset();
		
		console.log(e);
		setTimeout(() => this._onmessage(e), 1);
	}
		
	async init() {
		
		var handleInfo, flag, handle, saveHandle, xsCertInfo, xsSignatureInfo, certIndex, rv, tbsArr, payload, i, j, arr = [], xsDecryptedData;
		
		this.togglePortalLoader(); // Will hide the portal loader
		
		if(this.Req.action === this.Req.ACTIONS.SIGN) {
			
			if(this.Req.expirycheck === "false") {
				
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Failed : expirycheck : "+expirycheck);
				this.sendMessage(this.Resp.sign);
				return;
			}
			
			// Get handle from the user
			handleInfo = await xsg2cpopup.signerHandle("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled").catch((e) => {console.log(e);});
				
			if(!handleInfo) {
				
				// Prompt closed
				this.sendMessage(this.Resp.sign);
				return;
			}
				
			[flag, handle, saveHandle] = handleInfo;
			
			if(!flag || !handle) {
				this.sendMessage(this.Resp.sign);
				return;
			}
			
			if(this.Req.certtype === this.Req.CERT_TYPE.DS || this.Req.certtype === this.Req.CERT_TYPE.ALL) {
		
				xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
				
				// TO get signerInfo from xorkeesign
				xsCertInfo = await CSUTILS.getSignerInfo(this._service, {handle:handle, payload:this.Req.serialize()}).catch((e) => {console.log(e)});
				
				if(!xsCertInfo) {
					this.sendMessage(this.Resp.sign);
					return;
				}
			}
			else if(this.Req.certtype === this.Req.CERT_TYPE.EN) {
				
				// TO get signerInfo from xorkeesign
				xsg2cpopup.showLoader("Retriving the encryption certificate ...");
				
				// TO get signerInfo from xorkeesign
				xsCertInfo = await CSUTILS.getEncPublicKey(this._service, {payload:this.Req.serialize()}, {handle:handle}, "IREPS", "Choose an encryption certificate and click 'Proceed' to continue", false).catch((e) => {console.log(e)});
				
				if(!xsCertInfo) {
					this.sendMessage(this.Resp.sign);
					return;
				}
				
				this.Req.certPubKey = xsCertInfo.info.certificate;
				
			}
			
			if(xsCertInfo.result == 0) {
				if(saveHandle && handle) xsg2cStoreHandle(handle);
			}
			
			xsg2cpopup.showLoader("Waiting for signature ...");
		
			xsSignatureInfo = await CSUTILS.getSignature(this._service, {payload:this.Req.serialize()}, xsCertInfo, this.Req.tbs, SIGNATURE_TYPE.PKCS7, saveHandle).catch((e) => {console.log(e)});
			
			if(!xsSignatureInfo) {
				this.sendMessage(this.Resp.sign);
				return;
			}
			
			this.Resp.signature = xsSignatureInfo.signature;
			this.Resp.publickey = xsCertInfo.info.certificate;
			this.Resp.commonname = xsCertInfo.info.subjectCN;
			this.Resp.serailnumber = xsCertInfo.info.serialNo;
			this.Resp.issuercommonname = xsCertInfo.info.issuerCN;
			this.Resp.expirydate = xsCertInfo.info.validTill;
			this.Resp.keyusage = xsCertInfo.info.keyUsage;
			this.Resp.thumbPrint = xsCertInfo.info.thumbPrint;
			this.Resp.subjectDN = xsCertInfo.info.subjectDN;
			this.Resp.certificateclass = xsCertInfo.info.class;
			
			this.sendMessage(this.Resp.sign);
		}
		else if(this.Req.action === this.Req.ACTIONS.PDFSIGN) {
			
			var x, y, digest, pdf, sigpos, totalPage, date, pageNo, datestr, width, height, arr = [];
			
			/* if(this.Req.pagination && this.Req.pagination !== "false") {
				
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Failed : PDFSIGN - pagination : "+this.Req.pagination);
				this.sendMessage(this.Resp.pdfsign);
				return;
			} */
			
			// PDF action
			if(this.Req.signaction === this.Req.SIGN_ACTION.TYPE1) {
				
				// Get file from the user using HTML file dialog
				const file = await this.getFile("application/pdf").catch((e) => console.log(e));
				if(file) [this.Resp.filename, this.Req.tbs] = file;
				else {
					this.sendMessage(this.Resp.pdfsign);
					return;
				}
				
				if(this.Resp.filename.split('.').pop().toLowerCase() !== "pdf") {
					xsg2cpopup.showError(ERROR_INVALIDPDF);
					this.sendMessage(this.Resp.pdfsign);
					return;
				}
				
				this.Resp.originalByteLength = this.Req.tbs.byteLength;
			}
			else if(this.Req.signaction === this.Req.SIGN_ACTION.TYPE2) {
				
				this.Req.tbs = XSCUTILS._base64ToArrayBuffer(this.Req.tbs);
				this.Resp.originalByteLength = this.Req.tbs.byteLength;
				this.Resp.filename = ""; // Empty string is expected
			}
			else {
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Failed : PDFSIGN - signaction : "+this.Req.signaction);
				this.sendMessage(this.Resp.pdfsign);
				return;
			}
			
			// Get handle from the user
			handleInfo = await xsg2cpopup.signerHandle("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled").catch((e) => {console.log(e);});
				
			if(!handleInfo) {
				
				// Prompt closed
				this.sendMessage(this.Resp.pdfsign);
				return;
			}
				
			[flag, handle, saveHandle] = handleInfo;
			
			if(!flag || !handle) {
				this.sendMessage(this.Resp.pdfsign);
				return;
			}
			
			xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
				
			// TO get signerInfo from xorkeesign
			xsCertInfo = await CSUTILS.getSignerInfo(this._service, {handle:handle, payload:this.Req.serialize()}).catch((e) => {console.log(e)});
			
			if(!xsCertInfo) {
				this.sendMessage(this.Resp.pdfsign);
				return;
			}
			
			date = new Date(xsCertInfo.time * 1000);
			datestr = date.getFullYear()+"."+(date.getMonth()+1).toString().padStart(2,'0')+"."+(date.getDate()).toString().padStart(2,'0')+" "+(date.getHours()).toString().padStart(2,'0')+":"+(date.getMinutes()).toString().padStart(2,'0')+":"+(date.getSeconds()).toString().padStart(2,'0')+" IST";
			
			if(this.Req.coordinate && this.Req.coordinate?.length === 4) {
				
				this.Req.coordinate[0] = parseInt(this.Req.coordinate[0]);
				this.Req.coordinate[1] = parseInt(this.Req.coordinate[1]);
				this.Req.coordinate[2] = parseInt(this.Req.coordinate[2]);
				this.Req.coordinate[3] = parseInt(this.Req.coordinate[3]);
			}
			else {
				//240, 100, 450, 150
				this.Req.coordinate = [];
				this.Req.coordinate[0] = 240;
				this.Req.coordinate[1] = 100;
				this.Req.coordinate[2] = 450;
				this.Req.coordinate[3] = 150;
			}
			
			CM_PDFClearSignatureAppearance();
			
			CM_PDFSetProfileVersion(1);
			
			if(this.Req?.pageNo === "first") {
				flag = "specific";
				pageNo = 1;
			}
			else if(this.Req?.pageNo === "last") {
				flag = "specific";
				pageNo = 0;
			}
			else if(this.Req?.pageNo === "all") {
				flag = "all";
				pageNo = 0;
			}
			else if(this.Req?.pageNo === "odd") {
				flag = "odd";
				pageNo = 0;
			}
			else if(this.Req?.pageNo === "even") {
				flag = "even";
				pageNo = 0;
			}
			else if(this.Req?.pageNo && this.Req?.pageNo.indexOf(",") !== -1) {
				flag = "specific";
				pageNo = this.Req.pageNo.split(",");
			}
			else {
				pageNo = (this.Req.pageNo)?parseInt(this.Req.pageNo):1;
				flag = "specific";
			}
			
			width = this.Req.coordinate[2] - this.Req.coordinate[0];
			height = this.Req.coordinate[3] - this.Req.coordinate[1];
			if(width < 0)
			{
				x = this.Req.coordinate[2];
				width *= -1;
			}
			else x = this.Req.coordinate[0];
			if(height < 0)
			{
				y = this.Req.coordinate[3];
				height *= -1;
			}
			else y = this.Req.coordinate[1];
			
			if(typeof pageNo === "object") {
				
				pageNo.forEach((p) => {
					
					rv = CM_PDFSetSignaturePage(flag, p, x, y, width, height, 0, width, height, [0, 0, width, height]);
					if(rv !== 0) {
						console.log("Signature page number set", rv);
					}
				});
			}
			else {
			
				//CM_PDFSetSignaturePage(flag, pagenum, x, y, width, height, rotation, bwidth, bheight, cropArr)
				rv = CM_PDFSetSignaturePage(flag, pageNo, x, y, width, height, 0, width, height, [0, 0, width, height]);
				if(rv !== 0) {
					console.log("Signature page number set");
					xsg2cpopup.showError(FACILITY_UNSUPPORTED);
					CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Failed : CM_PDFSetSignaturePage : "+rv);
					this.sendMessage(this.Resp.pdfsign);
					return;
				}
			}
			
			if(xsCertInfo.info.subjectCN) arr.push("Digitally signed by "+xsCertInfo.info.subjectCN);
			if(datestr) arr.push("Date: "+datestr);
			if(this.Req.reason) arr.push("Reason: "+this.Req.reason);
			if(this.Req.location) arr.push("Location: "+this.Req.location);
			
			CSUTILS.setSigAppearance_V2(arr, width, height, "Helvetica", (this._service === WSS_SERVICENAME_IREPS)?8:7);
			
			CM_PDFMaxSignatureSize(xsCertInfo.info.sigSize * 2);	//get the signature allocation size from xorkeesign (* 2 for HEX)
			
			[rv, pdf, digest, sigpos, totalPage] = CM_PDFAppendSigObjectsSync(this.Req.tbs, null, "sha1", xsCertInfo.info.subjectCN, true, null, true, xsCertInfo.info.sigSize * 2, (this.Req.reason)?this.Req.reason:null, (this.Req.location)?this.Req.location:null);
			
			if(rv !== 0) {
				
				console.log(rv, pdf);
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Failed : CM_PDFAppendSigObjectsSync : "+rv+" : "+pdf);
				this.sendMessage(this.Resp.pdfsign);
				return;
			}
			
			digest = XSCUTILS._arrayBufferToBase64(digest);
			
			xsg2cpopup.showLoader("Waiting for signature ...");
		
			xsSignatureInfo = await CSUTILS.getSignature(this._service, {payload:this.Req.serialize()}, xsCertInfo, digest, SIGNATURE_TYPE.PKCS7, saveHandle).catch((e) => {console.log(e)});
			
			if(!xsSignatureInfo) {
				this.sendMessage(this.Resp.pdfsign);
				return;
			}
			
			pdf = CM_PDFEmbedSig_Sync(pdf, XSCUTILS._base64ToArrayBuffer(xsSignatureInfo.signature), sigpos);
			
			CM_PDFClearSignatureAppearance();	
			
			if(!pdf) {
				console.log("ERROR embedding signatures | "+pdf);
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "Unable to embed signature in PDF");
				this.sendMessage(this.Resp.pdfsign);
				return;
			}
			
			this.Resp.signature = XSCUTILS._arrayBufferToBase64(pdf);
			this.Resp.publickey = xsCertInfo.info.certificate;
			this.Resp.commonname = xsCertInfo.info.subjectCN;
			this.Resp.serailnumber = xsCertInfo.info.serialNo;
			this.Resp.issuercommonname = xsCertInfo.info.issuerCN;
			this.Resp.expirydate = xsCertInfo.info.validTill;
			this.Resp.keyusage = xsCertInfo.info.keyUsage;
			this.Resp.thumbPrint = xsCertInfo.info.thumbPrint;
			this.Resp.subjectDN = xsCertInfo.info.subjectDN;
			this.Resp.certificateclass = xsCertInfo.info.class;
			this.Resp.totalPage = totalPage;
			this.Resp.signedByteLength = pdf.byteLength;
			
			this.sendMessage(this.Resp.pdfsign);
		}
		else if(this.Req.action === this.Req.ACTIONS.ASYMMETRIC_ENCRYPT) {
			
			xsCertInfo = {result:0, info:{certificate:this.Req.certPubKey}};
			
			xsCertInfo = await CSUTILS.getCertInfo(this._service, xsCertInfo).catch((e) => {console.log(e);});
			
			if(!xsCertInfo) {
				this.sendMessage(this.Resp.asymmetric_encrypt);
				return;
			}
			
			if(this.Req.concatenator) {
				tbsArr = this.Req.tbs.split(this.Req.concatenator);
			}
			else tbsArr = [this.Req.tbs];
			
			payload = "";
			
			for(i=0; i<tbsArr.length; i++) {
				
				if(tbsArr[i]?.length > 0) {
				
					rv = _xsutilRSAPublicEncrypt(XSCUTILS._base64ToArrayBuffer(xsCertInfo.info.publicKey), XSCUTILS.str2ab(tbsArr[i]));
					if(!rv) {
						
						rv = "Failed _xsutilRSAPublicEncrypt: "+rv;
						// xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
						console.log(rv);
						this.sendMessage(this.Resp.asymmetric_encrypt);
						return;
					}
					
					payload += XSCUTILS._arrayBufferToBase64(rv);
				}
				
				if(i != tbsArr.length-1) payload += this.Req.concatenator;
			}
			
			this.Resp.encData = payload;
			this.Resp.commonname = xsCertInfo.info.subjectCN;
			this.Resp.serailnumber = xsCertInfo.info.serialNo;
			this.Resp.issuercommonname = xsCertInfo.info.issuerCN;
			this.Resp.expirydate = xsCertInfo.info.validTill;
			this.Resp.keyusage = xsCertInfo.info.keyUsage;
			this.Resp.thumbPrint = xsCertInfo.info.thumbPrint;
			this.Resp.certificateclass = xsCertInfo.info.class;
			
			this.Resp.subjectDN = xsCertInfo.info.subjectDN;
			
			this.sendMessage(this.Resp.asymmetric_encrypt);
		}
		else if(this.Req.action === this.Req.ACTIONS.ASYMMETRIC_DECRYPT) {
			
			if(this.Req.certtype !== this.Req.CERT_TYPE.EN) {

				rv = "Unsupported certtype : ASYMMETRIC_DECRYPT : "+this.Req.certtype;
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
				this.sendMessage(this.Resp.asymmetric_decrypt);
				return;
			}
			
			// Get handle from the user
			handleInfo = await xsg2cpopup.signerHandle("Decrypt", "xorkeesign India G2C needs your xorkee handle to decrypt", "Decryption will be cancelled").catch((e) => {console.log(e);});
				
			if(!handleInfo) {
				
				// Prompt closed
				this.sendMessage(this.Resp.asymmetric_decrypt);
				return;
			}
				
			[flag, handle, saveHandle] = handleInfo;
			
			if(!flag || !handle) {
				this.sendMessage(this.Resp.asymmetric_decrypt);
				return;
			}
			
			// TO get signerInfo from xorkeesign
			xsg2cpopup.showLoader("Retriving the encryption certificate ...");
			
			// TO get signerInfo from xorkeesign
			xsCertInfo = await CSUTILS.getEncPublicKey(this._service, {payload:this.Req.serialize()}, {handle:handle}, "IREPS", "Choose an encryption certificate and click 'Proceed' to continue", false).catch((e) => {console.log(e)});
			
			if(!xsCertInfo) {
				this.sendMessage(this.Resp.asymmetric_decrypt);
				return;
			}
			
			arr = [];
			
			if(this.Req.concatenator) arr = this.Req.encData.split(this.Req.concatenator);
			else arr = [this.Req.encData];
			
			xsg2cpopup.showLoader("Waiting for decryption ...");
		
			xsDecryptedData = await CSUTILS.getDecryptedData(this._service, {payload:this.Req.serialize()}, xsCertInfo, arr.filter((a) => (a.length > 0)), saveHandle).catch((e) => {console.log(e)});
			
			if(!xsDecryptedData) {
				this.sendMessage(this.Resp.asymmetric_decrypt);
				return;
			}
			
			payload = "";
			
			for(i=0,j=0; i<arr.length; i++) {
				
				if(arr[i].length > 0)
				{
					payload += window.atob(xsDecryptedData.data[j++]);
				}
				if(i !== arr.length-1) payload += this.Req.concatenator;
			}
			
			this.Resp.decrypteData = payload;
			this.Resp.commonname = xsCertInfo.info.subjectCN;
			this.Resp.serailnumber = xsCertInfo.info.serialNo;
			this.Resp.issuercommonname = xsCertInfo.info.issuerCN;
			this.Resp.subjectDN = xsCertInfo.info.subjectDN;
			this.Resp.expirydate = xsCertInfo.info.validTill;
			this.Resp.keyusage = xsCertInfo.info.keyUsage;
			this.Resp.thumbPrint = xsCertInfo.info.thumbPrint;
			
			this.sendMessage(this.Resp.asymmetric_decrypt);
		}
		else if(this.Req.action === this.Req.ACTIONS.ENCRYPT) {
			
			/* if(this.Req.certtype !== this.Req.CERT_TYPE.EN) {

				rv = "Unsupported certtype : ENCRYPT : "+this.Req.certtype;
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
				this.sendMessage(this.Resp.encrypt);
				return;
			} */
			
			const key = await this.generateAESKey();
			if(!key) {
				
				rv = "Failed generateAESKey";
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
				
				this.sendMessage(this.Resp.encrypt);
				return;
			}
			
			if(this.Req.concatenator) tbsArr = this.Req.tbs.split(this.Req.concatenator);
			else tbsArr = [this.Req.tbs];
			
			const ivBytes = this.createIv();
			
			payload = "";
			
			for(i=0; i<tbsArr.length; i++) {
				
				if(tbsArr[i].length > 0)
				{
					rv = await this.encryptData(key, ivBytes, XSCUTILS.str2ab(tbsArr[i]));
					if(!rv) {
						
						rv = "Failed encryptData";
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
						
						this.sendMessage(this.Resp.encrypt);
						return;
					}
					
					payload += XSCUTILS._arrayBufferToBase64(rv);
				}
				
				if(i !== tbsArr.length-1) payload += this.Req.concatenator;
			}
			
			
			
			const exportedKey = await this.exportAesKey(key);
			if(!exportedKey) {
				
				rv = "Failed exportAesKey";
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
				
				this.sendMessage(this.Resp.encrypt);
				return;
			}
			
			xsCertInfo = {result:0, info:{certificate:this.Req.certPubKey}};
			
			xsCertInfo = await CSUTILS.getCertInfo(this._service, xsCertInfo).catch((e) => {console.log(e);});
			
			if(!xsCertInfo) {
				this.sendMessage(this.Resp.encrypt);
				return;
			}
			
			rv = _xsutilRSAPublicEncrypt(XSCUTILS._base64ToArrayBuffer(xsCertInfo.info.publicKey), exportedKey);
			if(!rv) {
				
				rv = "Failed _xsutilRSAPublicEncrypt: "+rv;
				console.log(rv);
				// xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
				this.sendMessage(this.Resp.encrypt);
				return;
			}
			
			rv = XSCUTILS._arrayBufferToBase64(rv);
			
			this.Resp.encKeys = rv;
			this.Resp.encData = payload;
			this.Resp.keys = this.arrayBufferToHex(exportedKey);
			this.Resp.commonname = xsCertInfo.info.subjectCN;
			this.Resp.serailnumber = xsCertInfo.info.serialNo;
			this.Resp.issuercommonname = xsCertInfo.info.issuerCN;
			this.Resp.expirydate = xsCertInfo.info.validTill;
			this.Resp.keyusage = xsCertInfo.info.keyUsage;
			this.Resp.thumbPrint = xsCertInfo.info.thumbPrint;
			this.Resp.subjectDN = xsCertInfo.info.subjectDN;
			
			this.sendMessage(this.Resp.encrypt);
		}
		else if(this.Req.action === this.Req.ACTIONS.DECRYPT) {
			
			/* if(this.Req.certtype !== this.Req.CERT_TYPE.EN) {

				rv = "Unsupported certtype : DECRYPT : "+this.Req.certtype;
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
				this.sendMessage(this.Resp.decrypt);
				return;
			} */
			
			// Get handle from the user
			handleInfo = await xsg2cpopup.signerHandle("Decrypt", "xorkeesign India G2C needs your xorkee handle to decrypt", "Decryption will be cancelled").catch((e) => {console.log(e);});
				
			if(!handleInfo) {
				
				// Prompt closed
				this.sendMessage(this.Resp.decrypt);
				return;
			}
				
			[flag, handle, saveHandle] = handleInfo;
			
			if(!flag || !handle) {
				this.sendMessage(this.Resp.decrypt);
				return;
			}
			
			if(this.Req.certtype === this.Req.CERT_TYPE.EN) {
				
				// TO get signerInfo from xorkeesign
				xsg2cpopup.showLoader("Retriving the encryption certificate ...");
				
				// TO get signerInfo from xorkeesign
				xsCertInfo = await CSUTILS.getEncPublicKey(this._service, {payload:this.Req.serialize()}, {handle:handle}, "IREPS", "Choose an encryption certificate and click 'Proceed' to continue", false).catch((e) => {console.log(e)});
				
				if(!xsCertInfo) {
					this.sendMessage(this.Resp.decrypt);
					return;
				}
			}
			else {
				
				xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
				
				// TO get signerInfo from xorkeesign
				xsCertInfo = await CSUTILS.getSignerInfo(this._service, {handle:handle, payload:this.Req.serialize()}).catch((e) => {console.log(e)});
				
				if(!xsCertInfo) {
					this.sendMessage(this.Resp.pdfsign);
					return;
				}
				
				// In xorkeesign decryption API, the signing certificate should not be sent
				// xorkeesign will identify the signer with the handle
				delete xsCertInfo.info.certificate;
			}
			
			arr = [];
			
			if(this.Req.concatenator) arr = this.Req.encryptedsymkeys.split(this.Req.concatenator);
			else arr = [this.Req.encryptedsymkeys];
			
			xsg2cpopup.showLoader("Waiting for decryption ...");
		
			xsDecryptedData = await CSUTILS.getDecryptedData(this._service, {payload:this.Req.serialize()}, xsCertInfo, arr.filter((a) => (a.length > 0)), saveHandle).catch((e) => {console.log(e)});
			
			if(!xsDecryptedData) {
				this.sendMessage(this.Resp.decrypt);
				return;
			}
			
			payload = "";
			
			for(i=0,j=0; i<arr.length; i++) {
				
				if(arr[i].length > 0)
				{
					payload += this.base64ToHex(xsDecryptedData.data[j++]);
				}
				if(i !== arr.length-1) payload += this.Req.concatenator;
			}
			
			this.Resp.decKeys = payload;
			this.Resp.commonname = xsCertInfo.info.subjectCN;
			this.Resp.serailnumber = xsCertInfo.info.serialNo;
			this.Resp.issuercommonname = xsCertInfo.info.issuerCN;
			this.Resp.subjectDN = xsCertInfo.info.subjectDN;
			this.Resp.expirydate = xsCertInfo.info.validTill;
			this.Resp.keyusage = xsCertInfo.info.keyUsage;
			this.Resp.thumbPrint = xsCertInfo.info.thumbPrint;
			
			this.sendMessage(this.Resp.decrypt);
		}
		else if(this.Req.action === this.Req.ACTIONS.DECRYPT_DATA) {
			
			const ivBytes = this.createIv();
			
			if(this.Req.concatenator) tbsArr = this.Req.encdata.split(this.Req.concatenator);
			else tbsArr = [this.Req.encdata];
			
			payload = "";
			
			const key = await this.importAesKey(this.hexToArrayBuffer(this.Req.dec_key));
			if(!key) {
					
				rv = "Failed importAesKey";
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
				
				this.sendMessage(this.Resp.decryptData);
				return;
			}
			
			for(i=0; i<tbsArr.length; i++) {
				
				if(tbsArr[i].length > 0) {
					
					rv = await this.aesDecryptData(ivBytes, key, XSCUTILS._base64ToArrayBuffer(tbsArr[i]));
					if(!rv) {
						
						rv = "Failed aesDecryptData";
						xsg2cpopup.showError(FACILITY_UNSUPPORTED);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
						
						this.sendMessage(this.Resp.decryptData);
						return;
					}
					
					payload += new TextDecoder().decode(rv);
				}
				
				if(i !== tbsArr.length-1) payload += this.Req.concatenator;
			}
			
			this.Resp.decryptedData = payload;
			
			this.sendMessage(this.Resp.decryptData);
		}
		else if(this.Req.action === this.Req.ACTIONS.OTHER_CER) {
			
			const file = await this.getFile("application/pkix-cert").catch((e) => console.log(e));
			if(file) [this.Req.filename, this.Req.certPubKey] = file;
			else {
				this.sendMessage(this.Resp.othercer);
				return;
			}
			
			const decoder = new TextDecoder('utf-8');
			const s = this.Req.certPubKey.slice(0, 5);
			
			if(decoder.decode(s) === "-----") {
				this.Req.certPubKey = decoder.decode(this.Req.certPubKey);
				this.Req.certPubKey = this.Req.certPubKey.replace(/-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----/g, '').replace(/\s/g, ''); // Remove whitespace
			}
			else {
				this.Req.certPubKey = XSCUTILS._arrayBufferToBase64(this.Req.certPubKey);
			}
			
			xsCertInfo = {result:0, info:{certificate:this.Req.certPubKey}};
			
			xsCertInfo = await CSUTILS.getCertInfo(this._service, xsCertInfo).catch((e) => {console.log(e);});
			
			if(!xsCertInfo) {
				this.sendMessage(this.Resp.othercer);
				return;
			}
			
			if(!xsCertInfo.info.class || !xsCertInfo.info.subjectDN) {
				this.sendMessage(this.Resp.othercer);
				return;
			}
			
			this.Resp.publicKey = xsCertInfo.info.certificate;
			this.Resp.certificateclass = xsCertInfo.info.class;
			
			this.Resp.subjectDN = xsCertInfo.info.subjectDN;
			this.Resp.setOrg();
			
			this.sendMessage(this.Resp.othercer);
		}
		else if(this.Req.action === this.Req.ACTIONS.BROWSE_FORM) {
			
			if(this.Req.fileaction !== this.Req.FILE_ACTION.WRITE) {
				rv = "Unknown file action";
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
				this.sendMessage(this.Resp.browseform);
				return;
			}
			
			if(this.Req.isEncrypt !== this.Req.IS_ENCRYPT.N) {
				rv = "Unsupported action : isEncrypt : "+this.Req.isEncrypt;
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, rv);
				this.sendMessage(this.Resp.browseform);
				return;
			}
			
			this.Resp.directory = "Downloads/"+this.Req.filename;
			
			this.downloadFile("data:application/octet-stream,"+this.Req.data, this.Req.filename);
			
			this.sendMessage(this.Resp.browseform);
		}
	}
};

const _otlCris = new otlCris(_serviceName);

window.WebSocket = otlWSS;

//this is our WebSocket constructor
function otlWSS(url, protocols)
{
	console.log("otlWSS :: WebSocket - "+url);
	
	//the objects from the WebSocket class
	this.url = url;
	this.protocol = (protocols!=undefined)?protocols:"";
	this.binaryType = "blob";
	this.bufferedAmount = 0;
	this.extensions = "";
	this.readyState = this.CLOSED;
	
	//preserve the event handlers using custom properties
	this._onerror = null;
	this._onclose = null;
	this._onopen = null;
	this._onmessage = null;
	
	//preserve the internal working state using custom properties
	this._otlstate = OTLWSS_STATE_NONE;
	this._payload = "";
	
	//add functions to perform the required computations to interact with the consumer
	this._processOpen = _processOpen;
	this._processMessage = _processMessage;
	
	//compute and preserve the port number from the URL
	var scheme, stub, port;
	[scheme, stub] = url.split("://");
	if(stub.indexOf(":") != -1)
	{
		//extract the port number from the URL as it is specified
		port = parseInt(stub.split(":")[1]);
	}
	else
	{
		//this srub doesn't have a port number so use the default
		if(scheme.toLowerCase() == "wss") port = 443;
		else port = 80;
	}
	this._otlport = port;
}

//override all the WebSocket methods
var EventTarget = window.EventTarget || Element;
otlWSS.prototype = Object.create(EventTarget.prototype, {
	CONNECTING: {value: 0},
	OPEN: {value: 1},
	CLOSING: {value: 2},
	CLOSED: {value: 3},
	addEventListener: {
		enumerable: true,
		value: function (ev, cb, fl) {
			//console.log("otlWSS :: addEventListener - "+ev);
			if((cb instanceof Function) == false) return;
			var type = ev.toLowerCase();
			//preserve the callbacks
			if(type == "open")
			{
				this._onopen = cb;	//preserve the onclose callback
				this._processOpen();
			}
			else if(type == "message")
			{
				this._onmessage = cb;	//preserve the onclose callback
				this._processMessage();
			}
			else if(type == "close") this._onclose = cb;
			else if(type == "error") this._onerror = cb;
		},
		writable: true
	},
	close: {
		enumerable: true,
		value: function (code, reason) {
			//console.log("otlWSS :: close");
			this.readyState = this.CLOSED;
			this._otlstate = OTLWSS_STATE_NONE;
			this._payload = "";
			this.url = "";
		},
		writable: true
	},
	removeEventListener: {
		enumerable: true,
		value: function (ev, cb, fl) {
			//console.log("otlWSS :: removeEventListener - "+ev);
			//remove the preserved callback
			var type = ev.toLowerCase();
			if(type == "open") this._onopen = null;
			else if(type == "message") this._onmessage = null;
			else if(type == "close") this._onclose = null;
			else if(type == "error") this._onerror = null;
		},
		writable: true
	},
	send: {
		enumerable: true,
		value: function (data) {
			//console.log("otlWSS :: send");
			//console.log(data);
			this._payload = data;
			if(this._otlstate == OTLWSS_STATE_INIT)
			{
				//send() invoked BEFORE setting the onmessage event handler
				this._otlstate = OTLWSS_STATE_SIGN;
			}
			else if(this._otlstate == OTLWSS_STATE_WAIT)
			{
				//send() invoked AFTER setting the onmessage event handler
				this._otlstate = OTLWSS_STATE_SIGN;
				this._processMessage();
			}
		},
		writable: true
	}
});


//override all the WebSocket event handlers
Object.defineProperty(otlWSS.prototype, 'onopen', {
	get: function() {
		//console.log("otWSS :: OnOpen - Get");
		return this._onopen;
	},
	set: function(fn) {
		//console.log("otWSS :: OnOpen - Set");
		if((fn instanceof Function) == true)
		{
			this._onopen = fn;	//preserve the onclose callback
			this._processOpen();
		}
	}
});

Object.defineProperty(otlWSS.prototype, 'onmessage', {
	get: function() {
		//console.log("otWSS :: OnMessage - Get");
		return this._onmessage;
	},
	set: function(fn) {
		//console.log("otWSS :: OnMessage - Set");
		if((fn instanceof Function) == true)
		{
			this._onmessage = fn;	//preserve the onclose callback
			this._processMessage();
		}
	}
});

Object.defineProperty(otlWSS.prototype, 'onclose', {
	get: function() {
		//console.log("otWSS :: OnClose - Get");
		return this._onclose;
	},
	set: function(fn) {
		//console.log("otWSS :: OnClose - Set");
		//preserve the onclose callback
		if((fn instanceof Function) == true) this._onclose = fn;
	}
});

Object.defineProperty(otlWSS.prototype, 'onerror', {
	get: function() {
		//console.log("otWSS :: OnError - Get");
		return this._onerror;
	},
	set: function(fn) {
		//console.log("otWSS :: OnError - Set");
		//preserve the onerror callback
		if((fn instanceof Function) == true) this._onerror = fn;
	}
});


//Utility functions
/*
* Invoke the open callback once this is set to enable the consumer to proceed further
* The consumer should probably use the "send" function next
*/
function _otlExtractPayloadData(payload)
{
	var itm, tbs, pan, action;
	var pl = payload.split("\n");
	for(var i=0; i<pl.length; i++)
	{
		itm = pl[i].split("=");
		itm[0] = itm[0].toLowerCase();
		if(itm[0] == "tobesigned" || itm[0] == "datatosign") tbs = itm[1];
		else if(itm[0] == "panno" || itm[0] == "pannumber") pan = itm[1];
		else if(itm[0] == "action") action = itm[1];
	}
	return [tbs, pan, action];
}

function _processOpen()
{
	var cb = this._onopen;
	this.readyState = this.OPEN;
	if(cb != null)
	{
		//we can safely respond immediately in this state
		//as the callback should be set only after invoking the WebSocket constructor
		cb(new Event("open", {isTrusted:true}));
	}
}

/*
* Invoke the consumer's onmessage callback based on the internal state
* The state can be as follows:
*	1. consumer opened a websocket connection calling the WebSocket constructor (OTLWSS_STATE_NONE)
*		- we should respond with a welcome message stating version and ID
*	2. consumer used the send() function in the WebSocket API (OTLWSS_STATE_SIGN)
*		- we should respond with the signature (after connecting to xorkeesign) OR invoke the error callback whenever available
*
* TODO:
*	Pick the external application version and ID from the consuming application's global context
*/
async function _processMessage()
{
	EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
	if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji"; //DEPLOY
	XSG2C_IMAGE_DIR = document.documentElement.getAttribute("xsG2C-imagesDir");
	if(XSG2C_IMAGE_DIR == undefined || XSG2C_IMAGE_DIR == "" || XSG2C_IMAGE_DIR == null) 
	{
		try {
			if(chrome.runtime.id != undefined) XSG2C_IMAGE_DIR = `chrome-extension://${chrome.runtime.id}/images/`;
			else XSG2C_IMAGE_DIR = "chrome-extension://plafcfhgmgngohafpaalbpbjifnoaiji/images/";
				
		} catch (e) { 
			console.log(e);
			XSG2C_IMAGE_DIR = "chrome-extension://plafcfhgmgngohafpaalbpbjifnoaiji/images/";
		}
	}
	
	var cb = this._onmessage;
	var e, req, elem;
	
	if(cb == null) return;
	
	if(this._otlstate == OTLWSS_STATE_NONE)
	{
		//this state indicates the WebSocket constructor is invoked by the consumer
		//only after we respond here, the consumer's calling sequence will proceed further
		if(_serviceName == WSS_SERVICENAME_MCA) e = new MessageEvent("message", {data:"status = success\nport = "+this._otlport+"\nversion = "+MCA_EMS_VERSION});
		else if(_serviceName == WSS_SERVICENAME_TDS) e = new MessageEvent("message", {data:"status = success\nport = "+this._otlport+"\nversion = "+TDS_EMS_VERSION});
		else if(_serviceName == WSS_SERVICENAME_IRCEP || _serviceName == WSS_SERVICENAME_IREPS) e = new MessageEvent("message", {data:`status = success\nport = ${this._otlport}\nversion = ${(this._otlport === CRIS_PORT)?CRIS_VERSION:IREPS_VERSION}`});
		else e = new MessageEvent("message", {data:"status = success\nport = "+this._otlport+"\nversion = "+GST_EMS_VERSION+"\nID = "+GST_EMS_ID});
		
		console.log("Port opened OTL : "+this._otlport);
		this._otlstate = OTLWSS_STATE_INIT;
		//we can safely respond immediately in this state
		//as the callback should be set only after invoking the WebSocket constructor
		cb(e);
	}
	else if(this._otlstate == OTLWSS_STATE_SIGN)
	{
		
		if(_serviceName === WSS_SERVICENAME_IRCEP || _serviceName === WSS_SERVICENAME_IREPS) {
			
			_otlCris.onmessage = cb;
			_otlCris.setPayload(this._payload);
			return;
		}
		
		//this state indicates the onmessage event handler is called by the consumer
		//AFTER calling the WebSocket send() function
		var obj = this;
		//extract the data to be signed
		var tbs, pan, action, panElem, msg = {}, e, abortWsData;
		[tbs, pan, action] = _otlExtractPayloadData(this._payload);
		//YUK: absence of the tbs or pan or action field should raise alarm
		console.log(this._payload);
		console.log(tbs, pan, action);
		
		if(tbs != undefined)
		{
			if(pan == undefined)
			{
				panElem = document.getElementById("itPanNo");
				if(panElem != undefined)
				{
					if(panElem.value.length == 0)
					{
						xsg2cpopup.showError("Please enter the 'Income Tax PAN' to proceed.", function() {
							panElem.focus();
						});
						
						if(_serviceName == WSS_SERVICENAME_TDS) e = new MessageEvent("message", {data:"Signing Canceled"});
						else e = new MessageEvent("message", {data:"signing canceled"});
						
						obj._onmessage(e);
						return;
					}
					else pan = panElem.value;
				}
				//YUK: absence of the PAN field should raise alarm
			}
			
			ems(this, tbs, pan, action, false, undefined, undefined, undefined);
		}
		else
		{
			obj._otlstate = OTLWSS_STATE_INIT;	//reset state for another signature
			if(this._onerror != null)
			{
				this._onerror(new Error("error", {error:new Error('Extension incompatible. Please try after some time.'),message:'Extension incompatible. Please try after some time.'}));
				return;
			}
		}
	}
	else
	{
		//this state indicates the onmessage event handler is called by the consumer
		//BEFORE calling the WebSocket send() function
		//set the state to an intermediate value and handle the message processing during send()
		this._otlstate = OTLWSS_STATE_WAIT;
	}
}

//frequently query for the some global variables until available
//and pass it on to the extension
if(_serviceName == WSS_SERVICENAME_GST)
{
	var _otlInterval = setInterval(function() {
		if(window.constants != undefined)
		{
			var cts = window.constants;
			if(cts && cts.LATEST_EM_VERSION) GST_EMS_VERSION = cts.LATEST_EM_VERSION;
			if(cts && cts.EM_ENTY_ID) GST_EMS_ID = cts.EM_ENTY_ID;
			clearInterval(_otlInterval);
		}
	}, 3000);
}

function ems(wsCtx, tbs, pan, action, freePlan, xsSignerInfo, handle, applyUnits){
	
	msg = {};
	msg.tbs = tbs;
	msg.pan = pan;
	msg.xsSignerInfo = xsSignerInfo;
	
	msg.params = {};
	msg.params.service = _serviceName;
	msg.params.freePlan = freePlan;
	msg.params.action = action;
	msg.params.handle = handle;
	msg.params.applyUnits = applyUnits;
	
	if(xsSignerInfo == undefined)
	{
		// When sign button is click, registration loader will be displayed until xorkeesign signerInfo response is received.
		xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
	}
	
	chrome.runtime.sendMessage(
		EXTENSION_ID,
		msg,
		(function(obj) {
			return function(payload) {
				
				console.log(payload);
				
				// To send message to extention, extension ID is passed.
				// If freePlan propmt is closed, a message is passed to background for xorkeesign log.
				
				if(payload == undefined)  payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, _serviceName);
			
				payload.extensionId = EXTENSION_ID;
				
				CSUTILS.promptListener(payload, function(userAction) {
						
					if(userAction.retry == true)
					{
						/*
							Retry scenarios
							---------------
							
							1. xorkee registration
							2. User not reachable(Signature request and freePlan request)
						*/
						
						//freePlan flag will be preserved until the signature request is canceled
						freePlan = (freePlan == true)?true:userAction.freePlan;
						handle = (handle != undefined)?handle:userAction.handle;
						applyUnits = (applyUnits == true)?true:userAction.applyUnits;
						if(userAction.selectedHandle) 
						{
							// Multiple active handle for the PAN
							// User has choosen one handle in the list of handles
							handle = userAction.selectedHandle;
						}
						ems(wsCtx, tbs, pan, action, freePlan, xsSignerInfo, handle, applyUnits);
					}
					else
					{
						if(payload.responseData != undefined) e = new MessageEvent("message", {data:payload.responseData});
						else 
						{
							if(_serviceName == WSS_SERVICENAME_TDS) e = new MessageEvent("message", {data:"Signing Canceled"});
							else e = new MessageEvent("message", {data:"signing canceled"});
						}
						console.log(e);
						obj._onmessage(e);
					}
				});
			};
		})(wsCtx)
	);
}
