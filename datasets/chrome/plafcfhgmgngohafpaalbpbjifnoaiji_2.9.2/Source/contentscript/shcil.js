console.log("SHCIL script injected 2");

var EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji";

const SignerDigital = {
	
	xsSignerInfo:null,
	
	saveHandle:false,
	
	getSelectedCertificate: async () => {
		
		return new Promise( async (resolve, reject) => {
			
			CSUTILS.setExtId();
			
			const resp = `{
				"SelCertSubject": "",
				"CertThumbPrint": "",
				"PublicKey": "",
				"Cert": "",
				"eMail": "",
				"ValidFrom": "",
				"ExpDate": ""
			}`;
						
			if(SignerDigital.xsSignerInfo) resolve(resp);
			else {
				
				// Remove loader prompt
				var a = document.querySelectorAll("[role='presentation']");
				
				for(var i=0; i<a.length; i++) {
					if(a[i].style.visibility !== "hidden") {
						a[i].setAttribute("xs-closed", "true");
						a[i].style.visibility = "hidden";
					}
				}
			
				const rv = await xsg2cpopup.signerHandle("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled").catch((e) => {console.log(e);});
				
				if(rv) {
					
					const [flag, handle, saveHandle] = rv;
					
					SignerDigital.saveHandle = saveHandle;
				
					for(var i=0; i<a.length; i++) {
						
						if(a[i].getAttribute("xs-closed") === "true") {
							a[i].style.removeProperty("visibility");
						}
					}

					if(flag && handle) {
						
						xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
						
						let rv = await CSUTILS.getSignerInfo(SERVICENAME_SHCIL, {handle:handle}).catch((e) => {console.log(e)});
						if(rv && rv.result === 0) {
							
							SignerDigital.xsSignerInfo = rv;
							
							// from xorkeesign sigSize is returned in binary format. PDF library accept the size in hex so it is multipled by 2.
							// To set signature size
							let sigSize = rv.info.sigSize * 2;
							
							console.log("XS_LOG: otlDigidoc - CM_PDFMaxSignatureSize - ", sigSize);
							
							CM_PDFMaxSignatureSize(sigSize);
							
							resolve(resp);
						}
						else reject(new Error("Signing cancelled"));
					}
					else reject(new Error("Signing cancelled"));
				}
				else reject(new Error("Signing cancelled"));
			}
		});
	},
	
	signPdfHash: async () => {
		
		return new Promise((resolve, reject) => {
			resolve(`{}`);
		});
	}
};

(function(){	//wrapping inside an IIDE to avoid clash with the target portal

	class TBS {
		
		constructor() {
			this._fileId = null;
			this._digest = null;
			this._sigPos = null;
		}
		
		set fileId(value) {
			this._fileId = value;
			
			console.log("XS_LOG: TBS - fileId - "+this._fileId);
		}
		get fileId() {
			return this._fileId;
		}
		
		set digest(value) {
			this._digest = value;
			
			console.log("XS_LOG: TBS - digest - "+this._digest);
		}
		get digest() {
			return this._digest;
		}
		
		set sigPos(value) {
			this._sigPos = value;
			
			console.log("XS_LOG: TBS - sigPos - "+this._sigPos);
		}
		get sigPos() {
			return this._sigPos;
		}
	}

	class otlDigidoc {
		
		constructor() {
			
			this._bulkDocInfo = [];
			this._eSignDetails = {};
			this._tbs = [];
			this._bulkList = [];
			this._bulkFileId = null;
			
			this._xsSignerInfo = null;
			this._authorization = null;
			
			this._reason = "Digidoc Signature";
			this._positionX = null;
			this._positionY = null;
			this._pageNumber = null;
			this._partyId = null;
			this._ip = "-";
			this._pages = null;
			this._width = 150;
			this._height = 50;
			
			this.URL = {
				SIGN_DETAILS:"/getUserESignDetails",
				SIGN_DOC:"/esign/performDigitalESign",
				SIGN_BULK_INFO:"/api/v1/docs/bulk/view/documents?bulkid=",
				UPLOAD_BULK_DOC:"/api/v1/bulkEsign/linkPdfToDocument/",
				DOC_STATUS:"/api/v1/bulkEsign/updateDocumentStatus",
				BULK_LIST:"/api/v1/docs/upload/bulk/list",
				GET_BULK_DOC_INFO:"/api/v1/docs/bulk/document/preview/view",
			};
			
			this.DIGITALSIGNATUREPOSITION = {
			  FIRSTPARTYPOSITION: {
				FIRSTPAGEX: 40,
				FIRSTPAGEY: 120,
				XPOS: 10,
				YPOS: 40
			  },
			  SECONDPARTYPOSITION: {
				FIRSTPAGEX: 430,
				FIRSTPAGEY: 120,
				XPOS: 470,
				YPOS: 40
			  },
			  GAPSIZE: {
				POS: 120
			  }
			};
			
			this.SIGN_TYPE = {
				SINGLE:"single",
				BULK:"bulk"
			};
			
			this.API_DOMAIN_UAT = "https://digidocclientapi.stockholding.com";
			this.API_DOMAIN_LIVE = "https://digidocapi.stockholding.com";
			
			this.setAPIDomain();
		}
		
		reset() {
			this._tbs = [];
		}
		
		set bulkDocInfo(value) {
			this._bulkDocInfo = value;
			
			console.log("XS_LOG: otlDigidoc - bulkDocInfo - ", this._bulkDocInfo);
		}
		
		set eSignDetails(value) {
			this._eSignDetails = value;
		}
		
		set bulkList(value) {
			this._bulkList = value;
			
			console.log("XS_LOG: otlDigidoc - bulkList - ", this._bulkList);
		}
		
		set xsSignerInfo(info) {
			this._xsSignerInfo = info;
			
			console.log("XS_LOG: otlDigidoc - xsSignerInfo - ", this._xsSignerInfo);
		}
		
		set authorization(info) {
			this._authorization = info;
			
			console.log("XS_LOG: otlDigidoc - authorization - ", this._authorization);
		}
		
		set bulkFileId(id) {
			
			this._bulkFileId = id;
			
			console.log("XS_LOG: otlDigidoc - bulkFileId - "+this._bulkFileId);
			
			for(let i=0; i<this._bulkList.length; i++) {
				
				if(this._bulkList[i].bulkFileId === this._bulkFileId) {
					
					this._positionX = this._bulkList[i].positionX;
					this._positionY = this._bulkList[i].positionY;
					this._pageNumber = this._bulkList[i].pageNumber + 1; // skip estamp page
					this._partyId = this._bulkList[i].partyId;
					this._pages = this._bulkList[i].pages + 1; // add estamp page
					this._reason = "Digidoc Signature"; // As hardcoded in the portal
					
					console.log("XS_LOG: otlDigidoc - signature appearance props - ", this._positionX, this._positionY, this._pageNumber, this._partyId, this._reason);
					break;
				}
			}
		}
		
		setAPIDomain() {
			
			if(URL_SERVICE_SHCIL?.toLowerCase()?.indexOf(window?.location?.hostname?.toLowerCase()) != -1) this.API_DOMAIN = this.API_DOMAIN_LIVE;
			else this.API_DOMAIN = this.API_DOMAIN_UAT;
		}
		
		isTrap(url) {
			
			for(var key in this.URL) {
				if(url.indexOf(this.URL[key]) !== -1) return true;
			}
			return false;
		}
		
		async fileToAb(file) {
			
			return new Promise((resolve, reject) => {
				const reader = new FileReader();

				reader.onload = function(event) {
					resolve(event.target.result);
					
					console.log("XS_LOG: otlDigidoc - fileToAb");
				};

				reader.onerror = function(event) {
					reject(event.target.error);
				};

				reader.readAsArrayBuffer(file);
			});
		}
		
		downloadPDF(name, pdf) {
			
			const linkSource = `data:application/pdf;base64,${pdf}`;
			const downloadLink = document.createElement("a");
			downloadLink.href = linkSource;
			downloadLink.download = name;
			downloadLink.click();
		}
		
		getYPos(y) {
			
			var ypos = y - this._height + 8;
			
			return (ypos<0)?0:ypos;
		}
		
		getXPos(signType) {
			
			if(signType === this.SIGN_TYPE.SINGLE) {
			
				const partyFilteredArray = this._eSignDetails.data?.userList.filter(
					(obj) => obj?.partyId === this._eSignDetails.data?.transaction?.partyId
				);

				const sortedPriorityArray = partyFilteredArray.sort(
					(a, b) => a?.priority - b?.priority
				);

				const indexOfCurrentParty = sortedPriorityArray.findIndex(
					(obj) => obj.email === this._eSignDetails.data?.transaction?.email
				);

				let initialxpos =
					this._eSignDetails.data?.transaction?.partyId === 1
						? this.DIGITALSIGNATUREPOSITION?.FIRSTPARTYPOSITION?.XPOS
						: this.DIGITALSIGNATUREPOSITION?.SECONDPARTYPOSITION?.XPOS;

				return this._eSignDetails.data?.transaction?.partyId === 1? initialxpos + this.DIGITALSIGNATUREPOSITION?.GAPSIZE?.POS * indexOfCurrentParty : initialxpos - this.DIGITALSIGNATUREPOSITION?.GAPSIZE?.POS * indexOfCurrentParty;
			}
			else  {
				
				// Bulk
				if(this._partyId === 1) return this.DIGITALSIGNATUREPOSITION?.FIRSTPARTYPOSITION?.XPOS;
				else return this.DIGITALSIGNATUREPOSITION?.SECONDPARTYPOSITION?.XPOS;
			}
		}
		
		signPhase1(signType, pdf) {
			
			if(this._positionX === null || this._positionY === null || this._pageNumber === null || this._partyId === null || this._reason === null) {
				return [-1, "Unknown PDF Signature position"];
			}
			
			var date, datestr, time, PDF_PROFILE, rv;
			
			// In the signature appearance, signing time form server is computed
			date = new Date(this._xsSignerInfo.time * 1000).toString();
			datestr = date.substring(0, date.indexOf(" ("));	//Tue Apr 30 2024 16:13:31 

			// Signature appearance V3 profile
			PDF_PROFILE = {"isDemo": false,"version": 3,"preserveOrder": false,"docProfile":[{"resources": {"fonts": [{"name": "font1$","fontName": "Times-Bold"}],"appearances": [{"name": "initial","stream": btoa("BT 0 0 0 rg\n/font1$ 7.0000 Tf\n1 0 0 1 0.5 43 Tm (Digitally Signed By:-) Tj\n1 0 0 1 0.5 35 Tm (Name: "+this._xsSignerInfo.info.subjectCommonName+") Tj\n1 0 0 1 0.5 27 Tm (Location: IP : "+this._ip+") Tj\n1 0 0 1 0.5 19 Tm (Reason: "+this._reason+") Tj\n1 0 0 1 0.5 11 Tm (Date: "+datestr+") Tj\nET"),"dimension": {"width": this._width,"height": this._height}}]},"positions": [{"initial": [{"statusIndicator": true,"position": [this._positionX, this.getYPos(this._positionY,)],"rotation": 0,"pageNum": [this._pageNumber]}]}]}]};
			
			if(this._partyId === 1) { 
				
				//first party
				PDF_PROFILE.docProfile[0].positions.push({"initial": [{"statusIndicator": true,"position": [this.DIGITALSIGNATUREPOSITION.FIRSTPARTYPOSITION.FIRSTPAGEX, this.getYPos(this.DIGITALSIGNATUREPOSITION.FIRSTPARTYPOSITION.FIRSTPAGEY)],"rotation": 0,"pageNum": [1]}]});	
				
				if(this._pages > 2) {
					PDF_PROFILE.docProfile[0].positions.push({"initial": [{"statusIndicator": true,"position": [this.getXPos(signType), this.getYPos(this.DIGITALSIGNATUREPOSITION.FIRSTPARTYPOSITION.YPOS)],"rotation": 0,"pageNumRange": [2,-2]}]});	
				}					
			}
			else if(this._partyId === 2) { 
			
				//second party
				PDF_PROFILE.docProfile[0].positions.push({"initial": [{"statusIndicator": true,"position": [this.DIGITALSIGNATUREPOSITION.SECONDPARTYPOSITION.FIRSTPAGEX, this.getYPos(this.DIGITALSIGNATUREPOSITION.SECONDPARTYPOSITION.FIRSTPAGEY)],"rotation": 0,"pageNum": [1]}]});	
				
				if(this._pages > 2) PDF_PROFILE.docProfile[0].positions.push({"initial": [{"statusIndicator": true,"position": [this.getXPos(signType), this.getYPos(this.DIGITALSIGNATUREPOSITION.SECONDPARTYPOSITION.YPOS)],"rotation": 0,"pageNumRange": [2,-2]}]});	
			}
			
			// To get SHA2 PDF digest. 
			rv = CM_PDFSignV3(PDF_PROFILE, pdf, null, "sha2", this._xsSignerInfo.handle, null, this._reason);	
			
			if(rv[0] !== 0) {
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "CM_PDFSignV3 - FAILED "+rv[1]);
			}
			
			return rv;
		}
		
		async setBulkTbs(url, fd) {
			
			const tbs = new TBS();
			
			/// Get file ID from URL - api/v1/bulkEsign/linkPdfToDocument/6528
			tbs.fileId = url.split("/").pop();
			
			console.log("XS_LOG: signPhase1 started - file ID - "+tbs.fileId);
			
			if(!(fd instanceof FormData)) {
				
				console.log("XS_LOG: Unknown payload");
				this._tbs.push(tbs);
				return fd;
			}
			
			if(!this._bulkList && this._bulkList.length === 0) {
				
				console.log("XS_LOG: Unable to get signature appearance positions");
				this._tbs.push(tbs);
				return fd;
			}
			
			if(!this._xsSignerInfo) {
				
				console.log("XS_LOG: signerInfo not found");
				this._tbs.push(tbs);
				return fd;
			}
			
			if(fd.get("ipAddress")) this._ip = fd.get("ipAddress");
			let file = fd.get('file');
			file = await this.fileToAb(file).catch((e) => {console.log(e)});
			if(file) {
				
				/* console.log("XS_LOG: Original PDF - file ID - "+tbs.fileId);
				
				console.log("XS_LOG: Original PDF PDF STARTED ---------");
				console.log("XS_LOG: ", XSCUTILS._arrayBufferToBase64(file));
				console.log("XS_LOG: Original PDFF ENDED ---------"); */
				
				let [rv, pdf, digest, sigpos] = this.signPhase1(this.SIGN_TYPE.BULK, file);
				
				if(rv === 0) {
					
					console.log("XS_LOG: signPhase1 completed - file ID - "+tbs.fileId);
					
					tbs.digest = XSCUTILS._arrayBufferToBase64(digest);
					tbs.sigPos = sigpos;
					this._tbs.push(tbs);
					
					console.log("XS_LOG: Sign Phase 1 completed PDF STARTED ---------");
					console.log("XS_LOG: ", XSCUTILS._arrayBufferToBase64(pdf));
					console.log("XS_LOG: Sign Phase 1 completed PDF ENDED ---------");
					
					fd.set("file", new Blob([pdf], { type: "application/pdf" }), tbs.fileId+"_signed.pdf");
					return fd;
				}
				else {
					
					console.log("XS_LOG: signPhase1 failed - file ID - "+pdf);
					this._tbs.push(tbs);
					return fd;
				}
			}
			else {
				
				console.log("XS_LOG: Unable to get unsigned PDF");
				this._tbs.push(tbs);
				return fd;
			}
			
		}
		
		getResponsePayload(formdata, pdf, fileId) {
			
			console.log("XS_LOG: Prepare Response Payload");
			
			formdata.set("file", new Blob([pdf], { type: "application/pdf" }), fileId+"_signed.pdf");
			formdata.set("ipAddress", this._ip);
			formdata.set("selCertSubject", this._xsSignerInfo.info.subjectDN);
			formdata.set("publicKey", this._xsSignerInfo.info.publicKey);
			formdata.set("cert", this._xsSignerInfo.info.certificate);
			formdata.set("eMail", this._xsSignerInfo.info.subjectAlternativeName);
			formdata.set("certThumbPrint", this._xsSignerInfo.info.thumbPrint);
			formdata.set("validFrom", new Date(this._xsSignerInfo.info.validFrom * 1000).toUTCString());
			formdata.set("expDate", new Date(this._xsSignerInfo.info.validTill * 1000).toUTCString());
			return formdata;
		}
		
		async doSign(url, fd) {
			
			var rv, pdf, digest, sigpos;
			
			const fileId = url.split("/").pop();
			
			this._pageNumber = this._eSignDetails.data.transaction.pageNumber;
			this._positionX = this._eSignDetails.data.transaction.positionX;
			this._positionY = this._eSignDetails.data.transaction.positionY;
			if(this._eSignDetails?.data?.transaction?.reason) this._reason = this._eSignDetails?.data?.transaction?.reason;
			this._partyId = this._eSignDetails.data.transaction.partyId;
			this._pages = this._eSignDetails.data.pages;
			
			/* if(this._eSignDetails.data.transaction.party === "First Party") this._partyId = 1;
							
			if(this._eSignDetails.data.transaction.party === "Second Party") this._partyId = 2; */
			
			if(fd.get("ipAddress")) this._ip = fd.get("ipAddress");
			pdf = fd.get('file');
			pdf = await this.fileToAb(pdf).catch((e) => {console.log(e)});
			if(pdf) {
				
				[rv, pdf, digest, sigpos] = this.signPhase1(this.SIGN_TYPE.SINGLE, pdf);
				
				if(rv === 0) {
					
					digest = XSCUTILS._arrayBufferToBase64(digest);
					
					xsg2cpopup.showLoader("Waiting for signature ...");
			
					// Get sha2 pkcs7 signature from xorkeesign
					const xsSignatureInfo = await CSUTILS.getSignature(SERVICENAME_SHCIL, {}, this._xsSignerInfo, digest, SIGNATURE_TYPE.PKCS7).catch((e) => {console.log(e)});
					
					if(xsSignatureInfo?.result === 0) {
						
						if(SignerDigital.saveHandle) xsg2cStoreHandle(this._xsSignerInfo.handle);
						
						pdf = CM_PDFEmbedSig_Sync(pdf, XSCUTILS._base64ToArrayBuffer(xsSignatureInfo.signature), sigpos);
						
						if(!pdf) {
						
							console.log("XS_LOG: Sign Phase 2 - CM_PDFEmbedSig_Sync - FAILED");
							xsg2cpopup.showError(ERROR_PORTAL);
							CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "CM_PDFEmbedSig_Sync - FAILED");
							return false;
						}
						
						// console.log("XS_LOG: Sign Phase 2 completed PDF STARTED ---------");
						// console.log("XS_LOG: ", XSCUTILS._arrayBufferToBase64(pdf));
						// console.log("XS_LOG: Sign Phase 2 completed PDF ENDED ---------");
						
						// this.downloadPDF(fileId+"_signed.pdf", XSCUTILS._arrayBufferToBase64(pdf));
						
						fd = this.getResponsePayload(fd, pdf, fileId);
						
						for (const pair of fd.entries()) {
							console.log(pair[0] + ', ' + pair[1]);
						}
						
						// return false; // test
						return fd;
					}
				}
				else {
					xsg2cpopup.showError(ERROR_INVALIDDOC);
					return false;
				}
			}
		}
		
		isReady() {
			
			return new Promise((resolve, reject) => {
				
				var ctx = setInterval(() => {
				
					console.log("XS_LOG: Waiting for sign phase 2 ...");
					
					if(this._tbs.length === this._bulkDocInfo.length) {
						
						clearInterval(ctx);
						console.log("XS_LOG: Sign phase 2 started");
						resolve();
					}
				}, 500);
			});
		}
		
		getUdocFinalId(id) {
			
			for(let i=0; i<this._bulkDocInfo.length; i++) {
				
				if(this._bulkDocInfo[i]?.estampData?.userDocumentId.toString() === id) {
					return this._bulkDocInfo[i].udocFinalId;
				}
			}
			
			return null;
		}
	
		async doBulkSign() {
			
			// Will wait untill all the unsigned PDF are uploaded to the portal
			await this.isReady();
			
			var i, resp, pdf, rv, formdata, tbs;
			
			xsg2cpopup.showLoader("Preparing to request the signature ...");
			
			const digestArr = [];
			
			for(i=0; i<this._tbs.length; i++) {
				
				tbs = this._tbs[i];
					
				if(!tbs.fileId || !tbs.digest || !tbs.sigPos) {
					
					console.log("XS_LOG: TBS not set");
					xsg2cpopup.showError(ERROR_INVALIDDOC);
					return false;
				}
				
				digestArr.push(this._tbs[i].digest);
			}
					
			console.log("XS_LOG: Waiting for signature ...");
			
			// Get sha2 pkcs7 signature from xorkeesign
			const xsSignatureInfo = await CSUTILS.getSignature(SERVICENAME_SHCIL, {}, this._xsSignerInfo, digestArr, SIGNATURE_TYPE.PKCS7).catch((e) => {console.log(e)});
			
			if(xsSignatureInfo?.result === 0) {
				
				if(SignerDigital.saveHandle) xsg2cStoreHandle(this._xsSignerInfo.handle);
				
				console.log("XS_LOG: Signature received ", xsSignatureInfo);
				
				for(i=0; i<this._tbs.length; i++) {
					
					xsg2cpopup.showLoader("Uploading the signature for document "+tbs.fileId);
					
					tbs = this._tbs[i];
					
					console.log("XS_LOG: Sign phase 2 - "+tbs.fileId);
					
					resp = await fetch(this.API_DOMAIN+this.URL.GET_BULK_DOC_INFO+"?document="+this.getUdocFinalId(tbs.fileId), {
						method: 'GET',
						headers: {
							"authorization": this._authorization
						}
					})
					.then((r) => r.json())
					.catch((e) => {
						console.log(e);
					});
					
					if(!resp?.data?.link) {
						
						console.log("XS_LOG: Unable to get sign phase 1 PDF link");
						xsg2cpopup.showError(ERROR_PORTAL);
						return false;
					}
					
					console.log("XS_LOG: Sign Phase 2 - received PDF URL");
					
					pdf = await fetch(resp.data.link)
					.then((r) => {
						return r.arrayBuffer();
					})
					.catch((e) => {
						console.log(e);
					});
					
					if(!pdf) {
						
						console.log("XS_LOG: Unable to get sign phase 1 PDF");
						xsg2cpopup.showError(ERROR_PORTAL);
						return false;
					}
					
					if(pdf.byteLength <= tbs.sigPos) {
						
						console.log("XS_LOG: Sign Phase 1 pdf not uploaded");
						xsg2cpopup.showError(ERROR_PORTAL);
						return false;
					}
					
					console.log("XS_LOG: unsigned PDF - ", XSCUTILS._arrayBufferToBase64(pdf));
					
					console.log("XS_LOG: Sign Phase 2 - received PDF buffer - sigPos ", tbs.sigPos);
					
					console.log("XS_LOG: Sign Phase 2 - received PDF buffer - Signature ", xsSignatureInfo.signature[i]);
					
					pdf = CM_PDFEmbedSig_Sync(pdf, XSCUTILS._base64ToArrayBuffer(xsSignatureInfo.signature[i]), tbs.sigPos);
					
					if(!pdf) {
						
						console.log("XS_LOG: Sign Phase 2 - CM_PDFEmbedSig_Sync - FAILED");
						xsg2cpopup.showError(ERROR_PORTAL);
						CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, "CM_PDFEmbedSig_Sync - FAILED");
						return false;
					}
					
					console.log("XS_LOG: Signed PDF buffer for file ID - "+tbs.fileId);
					console.log("XS_LOG: Signer PDF STARTED ---------");
					console.log("XS_LOG: ", XSCUTILS._arrayBufferToBase64(pdf));
					console.log("XS_LOG: Signer PDF ENDED ---------");
					
					formdata = this.getResponsePayload(new FormData(), pdf, tbs.fileId);
					
					resp = await fetch(this.API_DOMAIN+this.URL.UPLOAD_BULK_DOC+tbs.fileId, {
						method: 'POST',
						body: formdata,
						headers: {
							"authorization": this._authorization
						}
					})
					.then((r) => r.json())
					.catch((e) => {
						console.log(e);
					});
					
					if(!resp) {
						
						console.log("XS_LOG: Unable to submit signed PDF");
						xsg2cpopup.showError(ERROR_PORTAL);
						return false;
					}
					
					for (const pair of formdata.entries()) {
						console.log(pair[0] + ', ' + pair[1]);
					}
					
					// this.downloadPDF(tbs.fileId+"_signed.pdf", XSCUTILS._arrayBufferToBase64(pdf));
					
					console.log("XS_LOG: Sign Phase 2 - completed for file"+tbs.fileId);
				}
				
				console.log("XS_LOG: Sign Phase 2 - completed for all files");
				
				xsg2cpopup.removePopup();
				
				return true;
				// return false; // test
			}
			else return false;
		}
	}
	
	const _open = XMLHttpRequest.prototype.open;
	const _send = XMLHttpRequest.prototype.send;
	const _setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
	
	const _otlD = new otlDigidoc();
	
	XMLHttpRequest.prototype.open = function() {
		//console.log("XHR: Open | "+arguments[1]);
		
		if(_otlD.isTrap(arguments[1]))
		{
			this._trap = true;
			this._url = arguments[1];
		}
		else
		{
			//set the flag to indicate not to intercept the triggers to this URL
			this._trap = false;
		}
		
		_open.apply(this, arguments);
	};
	
	XMLHttpRequest.prototype.setRequestHeader = function() {
		// console.log("XHR: Set Request Headers", arguments);
		
		if(arguments[0] == "Authorization") _otlD.authorization = arguments[1];
		_setRequestHeader.apply(this, arguments);
	};
	
	XMLHttpRequest.prototype.send = async function() {
		console.log("XHR: Send", this, this.onload, this.onreadystatechange);
		
		if(this._trap == true)
		{
			if(this._url.indexOf(_otlD.URL.UPLOAD_BULK_DOC) !== -1) {
				
				// set signerInfo
				_otlD.xsSignerInfo = SignerDigital.xsSignerInfo;
				
				arguments[0] = await _otlD.setBulkTbs(this._url, arguments[0]);
				
				_send.apply(this, arguments);
			}
			else if(this._url.indexOf(_otlD.URL.SIGN_DOC) !== -1) {
				
				// set signerInfo
				_otlD.xsSignerInfo = SignerDigital.xsSignerInfo;
				
				const rv = await _otlD.doSign(this._url, arguments[0]);
				
				SignerDigital.xsSignerInfo = null;
				
				if(!rv) {
					console.log("XS: "+_otlD.URL.SIGN_DOC+" - failed");
					if((this.onerror instanceof Function) == true) this.onerror();
					return;
				}
				
				arguments[0] = rv;
				
				_send.apply(this, arguments);
			}
			else if(this._url.indexOf(_otlD.URL.DOC_STATUS) !== -1) {
				
				const rv = await _otlD.doBulkSign();
				
				_otlD.reset();
				SignerDigital.xsSignerInfo = null;
				
				if(!rv) {
					console.log("XS: updateDocumentStatus - failed");
					
					if((this.onerror instanceof Function) == true) this.onerror();
					return;
				}
				
				_send.apply(this, arguments);
			}
			else {
			
				if((this.onloadend instanceof Function) == true)
				{
					this._onloadend = this.onloadend;
					
					this.onloadend = function() {
						
						var resp, rv;
						
						try {
							resp = JSON.parse(this.response);
						}
						catch(e) {
							console.log(e);
						}
						
						if(this._url.indexOf(_otlD.URL.SIGN_BULK_INFO) !== -1) {
							
							// Set Bulk doc ID
							try {
								rv = new URL(this._url);
							}
							catch(e) {
								console.log(e);
							}
							
							if(rv?.searchParams) {
								_otlD.bulkFileId = rv.searchParams.get("bulkid");
							}
							
							_otlD.bulkDocInfo = (resp && resp.data)?resp.data:[];
						}
						else if(this._url.indexOf(_otlD.URL.SIGN_DETAILS) !== -1) {
							_otlD.eSignDetails = (resp)?resp:{};
						}
						else if(this._url.indexOf(_otlD.URL.BULK_LIST) !== -1) {
							_otlD.bulkList = (resp?.data?.list)?resp.data.list:[];
						}
						
						this._onloadend(...arguments);
					};
				}
				
				//pass the request as such
				_send.apply(this, arguments);
			}
		}
		else
		{
			//pass the request as such
			_send.apply(this, arguments);
		}
	};
		
})();