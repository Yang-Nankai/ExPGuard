console.log("OTL signing script attached");
var EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji";

const _applets = document.applets;

var _portalSignFunc, anchorTag;

var PDF_PROFILE = {"Version":2,"isdemo":false,"BoxDimensions":{"width":300,"height":65},"BoxPosition":{"x":25,"y":25},"Page":0,"Stream":"","Fonts":[{"Name":"font1$","FontName":"Helvetica"}]};

const URL_FORM_ACTION  = {HOME:"/esanchit/home",UPLOADDOCS:"/esanchit/uploadDocs"};


Object.defineProperty(document, "applets", {
	writable:true
});

var _boxes = document.getElementById("boxes");
if(_boxes != undefined)
{
	var _pTag = _boxes.getElementsByTagName("p");
	for(var i=0; i<_pTag.length; i++)
	{
		if(_pTag[i].innerText.toLowerCase().indexOf("please install your digital signature certificate on your machine") != -1)
		{
			console.log("ignored");
			_boxes.style.display = "none";
			break;
		}
	}
}

function doRegistration(promptParams, handle, objectParams) 
{
	
	var msg;
	
	xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
	
	msg = {};
	msg.otltype = G2C_MSG.REG_DSC;
	msg.xsSignerInfo = {handle:handle};
	msg.tbs = "DUMMY";	// icegate register DSC tbs
	
	msg.params = promptParams;
	
	chrome.runtime.sendMessage(
		EXTENSION_ID,
		msg,
		function(resp) {
				
			if(resp == undefined) resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_ICEGATE);
			
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
					doRegistration(promptParams, handle, objectParams);
				}
				else
				{
					if(resp.result == 0)
					{
						const otlSignObj = {
								
							signText: function(txt){
								
								return txt;
							},
							
							getClientCertSrNo: function(){
								
								return resp.info.serialNo;
							},
							
							getClientThumbPrint: function(){
								return resp.info.thumbPrint;
							},
							
							getClientCertString: function(){
								return resp.info.certificate;
							},
							
							getIssueDateFromCertStr: function(){
								return resp.info.validFrom;
							},
							
							getExpiryDateFromCertStr: function(){
								return resp.info.validTill;
							},
							
							getClassFromCertStr: function(){
								return resp.info.class.toString();
							},
							
							getClientPublicKeyString: function(){
								return resp.info.publicKey;
							},
							
							getClientCertAlias: function(){
								return resp.info.subjectCN;
							},
							
							getSubjectDNFromCertStr: function(){
								return resp.info.subjectDN;
							},
							
							getIssuerDNFromCertStr: function(){
								return resp.info.issuerDN;
							},
							
							getAkiFromCertStr: function(){
								return resp.info.authorityKeyId;
							},
							
							getSkiFromCertStr: function(){
								return resp.info.subjectKeyId;
							},
							
							getPublicKeyStrFromCertStr: function(){
								return resp.info.publicKey; //TODO: only part of the public key should be returned; cross check with research documentation
							},
							
							generateKeyPair: function(){
								return null;
							},
							
							getGeneratedPublicKey: function(){
								return null;
							},
							
							getGeneratedPrivateKey: function(){
								return null;
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
										//xsg2cpopup.showError(FACILITY_UNSUPPORTED);
										
										CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, key);
										return null;
									}
								}
								
								return target[key];
							}
						});
						
						var otlApplets = {};
						
						otlApplets[objectParams.objectName] = proxyObj;

						document.applets = otlApplets;

						document.applets[objectParams.objectName].toString = function(){
							return objectParams.java_code;
						};
						
						_portalSignFunc(); // after override the java applets, call the portal signing function
					}
				}
			});
		}
	);
}

function otlGetFdLen(formData)
{
	var len = 0
	for (const [key, value] of formData) {
		len++;
	};
	return len;
}

function checkSignedPdf(fd, fdlen)
{
	var newfd, file, toBeSigned = [];
	
	return new Promise(function(resolve, reject){
		
		newfd = new FormData();
		for (const pair of fd.entries()) {
			
			(function(key, val) {
			
				if(val instanceof File)
				{
					file = new FileReader();
					file.onload = function(evt){
						
						CM_PDFVerify(evt.target.result, function(sigStatus){
							
							if(sigStatus.length > 0)
							{
								// SIGNED PDF
								newfd.append(key, val); 
								if((otlGetFdLen(newfd) + toBeSigned.length) == fdlen) resolve([newfd, toBeSigned]);
							}
							else
							{
								// UNSIGNED PDF
								
								toBeSigned.push({file:val, key:key, buff:evt.target.result});
								if((otlGetFdLen(newfd) + toBeSigned.length) == fdlen) resolve([newfd, toBeSigned]);
							}
							
						}, function(e){
							
							// If PDF verification failed, treat the file has a UNSIGNED PDF file. 
							
							console.log(e);
							toBeSigned.push({file:val, key:key, buff:evt.target.result});
							if((otlGetFdLen(newfd) + toBeSigned.length) == fdlen) resolve([newfd, toBeSigned]);
						});
						
						
					};
					file.readAsArrayBuffer(val);
				}
				else
				{
					newfd.append(key, val);
					if((otlGetFdLen(newfd) + toBeSigned.length) == fdlen) resolve([newfd, toBeSigned]);
				}
			})(pair[0], pair[1]);
		}
	});
}

function otlFormSubmit(frmevt, newfd)
{
	try {
		var http = new XMLHttpRequest();
		http.open(frmevt.target.method, frmevt.submitter.getAttribute('formaction'), true);
		http.onload = function() {
			
			/*
			document.body.parentElement.innerHTML = "";
			//document.body.innerHTML = "";
			const frag = document.createRange().createContextualFragment(http.response);
			document.body.parentElement.appendChild(frag);
			//document.body.appendChild(frag);
			doFormAction(document.getElementsByTagName("form"));
			*/
			
			
			document.head.innerHTML = "";
			document.body.innerHTML = "";
			
			const parser = new DOMParser();
			const doc = parser.parseFromString(http.response, "text/html");
			
			const hfrag = document.createRange().createContextualFragment(doc.head.innerHTML);
			const bfrag = document.createRange().createContextualFragment(doc.body.innerHTML);
			
			document.body.style.cssText = doc.body.style.cssText;
			
			document.head.appendChild(hfrag);
			document.body.appendChild(bfrag); 
			
			doFormAction(document.getElementsByTagName("form"));
			
		};
		
		http.onerror = function(e) {
			console.log("On Error", http.status, http.response);
			console.log(e);
			
			var msg = {};
			msg.otltype = G2C_MSG.GET_REDIRECT_URL;
			
			chrome.runtime.sendMessage(
			EXTENSION_ID,
			msg,
			function(payload) {
				
				console.log(payload);
				// window.location.replace("https://old.icegate.gov.in/esanchit/home");
				window.location.replace(payload.location);
			});
		};
		http.onabort = function(e) {
			console.log("On Abort", http.status, http.response);
			console.log(e);
		};
		http.ontimeout = function(e) {
			console.log("On Timeout", http.status, http.response);
			console.log(e);
		};
		http.send(newfd);
		
	} catch(e) {
		console.log("Exception");
		console.log(e);
	}
}

function otlFormSubmit_Fetch(frmevt, newfd)
{
	try {
		fetch(frmevt.submitter.getAttribute('formaction'),{
			method: frmevt.target.method,
			body: newfd
		})
		.then((response) => {

			console.log("Fetch");
			console.log(response);
			if(response.ok)
			{
				document.head.innerHTML = "";
				document.body.innerHTML = "";
				
				const parser = new DOMParser();
				const doc = parser.parseFromString(http.response, "text/html");
				
				const hfrag = document.createRange().createContextualFragment(doc.head.innerHTML);
				const bfrag = document.createRange().createContextualFragment(doc.body.innerHTML);
				
				document.body.style.cssText = doc.body.style.cssText;
				
				document.head.appendChild(hfrag);
				document.body.appendChild(bfrag); 
				
				doFormAction(document.getElementsByTagName("form"));
			}
			
		}).
		catch((e) => {
			console.log("Exception");
			console.log(e);
			window.location.replace("https://old.icegate.gov.in/esanchit/home");
		});
		
	} catch(e) {
		console.log("Exception");
		console.log(e);
	}
}

function getSigner(handle, cb)
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
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_ICEGATE);
			
			CSUTILS.promptListener(payload, function(userAction) {
		
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
					*/
					getSigner(handle, cb);
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

function otlSignPhase2(promptParams, fileParams, digest, xsSignerInfo, params, scb)
{
	var msg;
	
	msg = {};
	msg.otltype = G2C_MSG.GET_SIGNATURE;
	msg.tbs = digest;
	msg.xsSignerInfo = xsSignerInfo;
	
	msg.params = promptParams;
	msg.params.filename = fileParams.file.name;
	msg.params.fileindex = params.index+1;
	msg.params.filecount = params.count;
	
	chrome.runtime.sendMessage(
		EXTENSION_ID,
		msg,
		function(payload){
			
			console.log(payload);
			if(payload == undefined) payload = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, SERVICENAME_ICEGATE);
			
			payload.removePrompt = false;
			CSUTILS.promptListener(payload, function(userAction) {
				
				if(userAction.retry == true)
				{
					/*
						Retry scenarios
						---------------
						
						1. xorkee registration
						2. User not reachable(Signature request and applyUnits request)
					*/
					promptParams = CSUTILS.getPromptParams(promptParams, userAction);
					otlSignPhase2(promptParams, fileParams, digest, xsSignerInfo, params, scb)
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
}

function otlSignPhase1(index, toBeSigned, newfd, xsSignerInfo, cb)
{
	var fname, msg, params;
	
	if(index < toBeSigned.length)
	{
		CM_PDFAppendSigObjects(toBeSigned[index].buff, null, "sha1", xsSignerInfo.handle, true, null, true, xsSignerInfo.info.sigSize * 2, function(pdf, digest, sigpos) {
			
			if(index == 0) xsg2cpopup.showLoader("Waiting for signature ...");
			
			params = {
				index:index,
				count:toBeSigned.length
			};
			
			otlSignPhase2({}, toBeSigned[index], XSCUTILS._arrayBufferToBase64(digest), xsSignerInfo, params, function(payload){
				
				CM_PDFEmbedSig(pdf, XSCUTILS._base64ToArrayBuffer(payload.signature), sigpos, function(pdf) {
							
					fname = toBeSigned[index].file.name;
					fname = fname.substring(0, fname.lastIndexOf("."))+"Signed.pdf";
					
					newfd.append(toBeSigned[index].key, new Blob([pdf], { type: "application/pdf" }), fname);
					
					otlSignPhase1(++index, toBeSigned, newfd, xsSignerInfo, cb);
					
				}, function(err) {
				
					console.log("ERROR embedding signatures | "+err);
					xsg2cpopup.fileUnsupported(SERVICENAME_ICEGATE, toBeSigned[index].file.name, xsSignerInfo.handle);
					
					msg = {
						error:err,
						handle:xsSignerInfo.handle,
						filename: toBeSigned[index].file.name
					};
					
					CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, JSON.stringify(msg)); // Logger
					
				});
			});
			
		}, function(err) {
		
			console.log("ERROR embedding signatures objects | "+err);
			xsg2cpopup.fileUnsupported(SERVICENAME_ICEGATE, toBeSigned[index].file.name, xsSignerInfo.handle);
			
			msg = {
				error:err,
				handle:xsSignerInfo.handle,
				filename: toBeSigned[index].file.name
			};
			
			CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, JSON.stringify(msg)); // Logger
		});
	}
	else
	{
		cb(newfd);
	}
}

function otlOnSubmit(frmevt)
{
	
	if(frmevt.submitter == undefined || frmevt.submitter.getAttribute('formaction').indexOf("uploadDocs") == -1) return true;
	
	var form, sbt, sbval, fd, http, date, datestr;
	
	form = frmevt.target;
	sbt = frmevt.submitter;
	sbval = sbt.getAttribute('value');
	
	fd = new FormData(form);
	if(sbt != null) fd.append(sbt.getAttribute('name'), (sbval == undefined || sbval == null)?"Submit":sbval);
	
	checkSignedPdf(fd, otlGetFdLen(fd))
	.then(function([newfd, toBeSigned]){
		
		if(toBeSigned.length > 0)
		{
			try 
			{
				$('#uploadSubmit').prop('disabled', false);
			} 
			catch (e) {console.log(e);}
			
			xsg2cpopup.getHandlePopup("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled", function(flag, handle){
										
				if(flag == true) 
				{
					getSigner(handle, function(xsSignerInfo){
						
						date = new Date(xsSignerInfo.time * 1000);
						datestr = date.getFullYear()+"."+(date.getMonth()+1).toString().padStart(2,'0')+"."+(date.getDate()).toString().padStart(2,'0')+" "+(date.getHours()).toString().padStart(2,'0')+":"+(date.getMinutes()).toString().padStart(2,'0')+":"+(date.getSeconds()).toString().padStart(2,'0')+" IST";
						PDF_PROFILE.Stream = btoa("BT\n0 0 0 rg\n/font1$ 10.0000 Tf\n1 0 0 1 10 50 Tm (Digitally signed by "+xsSignerInfo.info.subjectCommonName+") Tj\n1 0 0 1 10 40 Tm (Date: "+datestr+") Tj\n1 0 0 1 10 30 Tm (Reason: Secure Document) Tj\n1 0 0 1 10 20 Tm (Location: India) Tj\nET");
						// console.log(datestr);
						
						CM_PDFSetProfileV2(PDF_PROFILE);
						CM_PDFMaxSignatureSize(xsSignerInfo.info.sigSize * 2);	//get the signature allocation size from xorkeesign (* 2 for HEX)
						
						otlSignPhase1(0, toBeSigned, newfd, xsSignerInfo, function(newfd){
							
							otlFormSubmit(frmevt, newfd);
						});
						
					});
				}
			});
		}
		else otlFormSubmit(frmevt, fd);
		
	})
	.catch((e) => {
		
		console.log(e);
		xsg2cpopup.showError(ERROR_STD);
	});
	
	return false;
}

function doFormAction(forms)
{
	/* console.log("Mutation Observer");
	console.log(document.scripts);
	console.log(document.body); */
	
	var i, inputElems, j;
	for(i=0; i<forms.length; i++)
	{
		if(forms[i].action.indexOf(URL_FORM_ACTION.HOME) != -1 || forms[i].action.indexOf(URL_FORM_ACTION.UPLOADDOCS) != -1)
		{
			forms[i].onsubmit = otlOnSubmit;
			
			if(document.getElementById("g2c_info") == undefined)
			{
				inputElems = forms[i].getElementsByTagName("input");
				for(j=0; j<inputElems.length; j++)
				{
					if(inputElems[j].type == "file" && inputElems[j].accept == "application/pdf")
					{
						var elem = document.createElement("div");
						elem.id = "g2c_info";
						elem.innerHTML = `
							<div class = "xsg2c-info-wrapper"  >
								<div class = "xsg2c-info-container" >
									<span class = "xsg2c-info-icon" ><img src = "${XSG2C_IMAGE_DIR}xorkeelogo-green.svg" style = "height:18px;" /></span>
								</div>
								<div style = "padding: 5px 0;padding-left: 6px;" >xorkeesign will digitally sign your PDF files before uploading them. You need not separately sign them beforehand.</div>
							</div>
						`;
						inputElems[j].parentNode.insertBefore(elem, inputElems[j].nextSibling);
					}
				}
			}
			return true;
		}
	}
	
	return false;
}

function doObjectAction(appletTagArr)
{
	var elem, applet, classid, container, archive, atxt;
	var IG_APPLET_PARAMS = undefined, anchorTag, i, j;
	
	for(i=0; i<appletTagArr.length; i++)
	{
		applet = appletTagArr[i];
		classid = applet.getAttribute('classid');
		
		IG_APPLET_PARAMS = CSUTILS.objectGetParams(applet);
		IG_APPLET_PARAMS.objectName = applet.getAttribute('name');
		
		javaClassType = IG_APPLET_PARAMS.java_code;
		if(javaClassType != undefined && javaClassType != null) javaClassType = javaClassType.toLowerCase();
		
		archive = IG_APPLET_PARAMS.java_archive;
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
		console.log(IG_APPLET_PARAMS);
		
		if(javaClassType == "com.ncode.ctrl.pki.pkictrl.class" && archive.indexOf("ncodepkicompoent.jar") != -1)
		{
			container = CSUTILS.replaceObjectContainer(applet);
			
			container.innerHTML = `<div style = "display:flex;align-items: center;" ><span><img src = "${XSG2C_IMAGE_DIR}ig/ncoin.png" ></span><h5 style = "padding-left:10px;" >Initialized.....</h5></div>`;
			
			anchorTag = document.getElementsByTagName("a");
			for(j=0; j<anchorTag.length; j++)
			{
				atxt = anchorTag[j].innerText.toLowerCase();
				if(atxt != "" && atxt.indexOf("click here to upload ds") != -1) 
				{
					if(_portalSignFunc == undefined) _portalSignFunc = anchorTag[j].onclick;
					
					anchorTag[j].onclick = function(){
						
						xsg2cpopup.getHandlePopup("Sign using DSC", "xorkeesign India G2C needs your xorkee handle to sign", "Signing will be cancelled", function(flag, handle){
												
							if(flag == true) doRegistration({}, handle, IG_APPLET_PARAMS);
						});
					};
					break;
				}	
			}
			return true;
		}
		else
		{
			if(IG_APPLET_PARAMS.type != undefined && IG_APPLET_PARAMS.type.indexOf("application/x-java-applet") != -1)
			{
				container = CSUTILS.replaceObjectContainer(applet);	//applet should be removed else the page will freeze
				console.log("xorkeesign G2C - unknown java class : "+javaClassType);
				xsg2cpopup.showError(FACILITY_UNSUPPORTED);
				
				IG_APPLET_PARAMS.xsClass = classid;
				IG_APPLET_PARAMS.xsName = applet.getAttribute('name');
				IG_APPLET_PARAMS.xsDimension = [applet.getAttribute('width'), applet.getAttribute('height')];
				var extmsg = btoa(JSON.stringify(IG_APPLET_PARAMS));
					
				CSUTILS.setInfo(EXTENSION_ID, SET_INFO.FACILITY_UNSUPPORTED, extmsg);
			}
			else
			{
				console.log(applet, IG_APPLET_PARAMS);
			}
		}
	}
	return false;
}

doObjectAction(document.getElementsByTagName('object'));
doFormAction(document.getElementsByTagName("form"));