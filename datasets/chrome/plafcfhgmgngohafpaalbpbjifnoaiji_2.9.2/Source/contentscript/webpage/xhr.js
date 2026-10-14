console.log("xorkeesign India G2C webpage script attached");

var EXTENSION_ID = document.documentElement.getAttribute("xsG2C-id");
if(EXTENSION_ID == undefined || EXTENSION_ID == "" || EXTENSION_ID == null) EXTENSION_ID = "plafcfhgmgngohafpaalbpbjifnoaiji";

(function(){	//wrapping inside an IIDE to avoid clash with the target portal
	
	const _open = XMLHttpRequest.prototype.open;
	const _send = XMLHttpRequest.prototype.send;
	const _requestHeader = XMLHttpRequest.prototype.setRequestHeader;
	const _addEventListener = XMLHttpRequest.prototype.addEventListener;
	const _emburl = "localhost.emudhra.com";
	const _dscservice = "dsc.epfindia.gov.in";
	const _ncpki1 = ":12591";
	const _ncpki2 = ":13591";
	const _icegate_prod = "icegate-ui-";
	const _icegate_url = "https://foservices.icegate.gov.in";

	if(window.location.href.indexOf(_icegate_prod) === -1) 
	{
		XMLHttpRequest.prototype.setRequestHeader = function() {
			
			if(arguments.length == 2)
			{
				if(arguments[0] == "api-key") this._apikey = arguments[1];
				else if(arguments[0] == "client-id") this._clientid = arguments[1];
			}
			
			_requestHeader.apply(this, arguments);
		}
	}
	
	XMLHttpRequest.prototype.open = function() {
		//console.log("XHR: Open | "+arguments[1]);
		
		if(arguments[1].indexOf(_emburl) > -1 || arguments[1].indexOf(_dscservice) > -1 || arguments[1].indexOf(_ncpki1) > -1 || arguments[1].indexOf(_ncpki2) > -1)
		{
			this._trap = true;
			
			//preserve the URL
			this._url = arguments[1];
			
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
			if(this._onload == undefined && this.onload != undefined && (this.onload instanceof Function) == true) this._onload = this.onload;
			
			if(window.location.href.indexOf(_icegate_prod) != -1) 
			{
				var xhrCtx = this, arg = arguments;
				if(arguments && arguments[0]) {
					
					window.addEventListener("message", function xsMessage(event) {
						
						window.removeEventListener(xsMessage);
						
						if(event.origin.indexOf(_icegate_url) === -1) {
							console.log("Invalid origin", event.origin);
							return;
						}
						
						// INFO
						// To pass the request to the component when an unsupported method is received
						if(event.data === "false") {
							
							//pass the request as such
							_send.apply(xhrCtx, arg);
							return;
						} 
						
						if((xhrCtx.onload instanceof Function) == true)
						{
							xhrCtx.readyState = 4;
							xhrCtx.status = 200;
							xhrCtx.response = event.data;
							xhrCtx.onload();
						} 
					});
					
					window.parent.postMessage(arguments[0], _icegate_url);
				}
				else {
					_send.apply(xhrCtx, arg);
				}
			}
			else if(window.location.href.indexOf(URL_SERVICE_EPF) != -1) 
			{
				var xhrCtx = this;
				
				try { 
					$.unblockUI(); // To close epf portal loader. This function is in EPFO page
				} catch (e){ console.log(e);}
				
				// EPF1 function will be in "epf1.js"
				EPF1.dscService(xhrCtx._url, arguments[0], xhrCtx._apikey, xhrCtx._clientid, function(resp){
					
					// onload
					if((xhrCtx.onreadystatechange instanceof Function) == true)
					{
						xhrCtx.readyState = 4;
						xhrCtx.status = 200;
						xhrCtx.responseText = resp;
						xhrCtx.onreadystatechange();
					}
					
				}); 
			}
			else emb(this, arguments[0], false, undefined, undefined);
		}
		else
		{
			//pass the request as such
			_send.apply(this, arguments);
		}
	};
	
	XMLHttpRequest.prototype.addEventListener = function() {
		// console.log("Add");
		// console.log(arguments);
		
		
		if((arguments[1] instanceof Function) == true)
		{
			if(arguments[0] == "readystatechange") this._onreadystatechange = arguments[1];
			else if(arguments[0] == "load") this._onload = arguments[1];
			else if(arguments[0] == "error") this._onerror = arguments[1];
		}
		_addEventListener.apply(this, arguments);
	};
	
	function frameEmbPayload({result, errorString, compVersion, responseData}){
		
		var resp = {};
		resp.version = compVersion;
		resp.status = 0;	//error
		resp.errorCode = null;
		resp.errorMessage = null;
		resp.responseData = null;
		
		if(result == 0)
		{
			resp.status = 1;	//success
			resp.responseData = responseData;	//do not encodeURIComponent as this is base64 encoded already
		}
		else
		{
			if(result == XS_ERRCODE.CERT_EXPIRED) 
			{
				// For the error code, errorstring will have HTML tags
				// ITR portal displayed the error message has textContent, so in the error message HTML tags are removed.
				errorString = "Your DSC in xorkee has expired. Get a new DSC and update it in xorkee. If you already have a new DSC, connect the DSC token in a machine with the xorkee app installed.";
			}
			
			//temporary errors from xorkeesign (like user not reachable) are redirected to the webpage
			resp.errorCode = "XORKEESIGN"+result;
			resp.errorMessage = errorString;	//error propagated to the website
		}
		return resp;
	}
	
	function emb(xhrCtx, payload, freePlan, handle, applyUnits){
		
		var msg = {}, service;
		msg.url = xhrCtx._url;
		msg.payload = payload;
		
		msg.params = {};
		msg.params.freePlan = freePlan;
		msg.params.handle = handle;
		msg.params.applyUnits = applyUnits;
		
		if(window.location.href.indexOf(URL_SERVICE_MCA_V3) != -1) service = SERVICENAME_MCA_V3;
		else if(window.location.href.indexOf(URL_SERVICE_ITR) != -1) service = SERVICENAME_ITR;
		else if(window.location.href.indexOf(URL_SERVICE_DGFT) != -1) service = SERVICENAME_DGFT;
		
		if(service == SERVICENAME_MCA_V3 || service == SERVICENAME_DGFT)
		{
			if(xhrCtx._url.indexOf("ListToken") != -1)
			{
				xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
			}
			else if(xhrCtx._url.indexOf("PKCSSign") != -1)
			{
				xsg2cpopup.showLoader("Waiting for signature ...");
			}
		}
			
		chrome.runtime.sendMessage(
			EXTENSION_ID,
			msg,
			(function(obj) {
				return function(resp) {
					
					console.log(resp);
					
					// To send message to extention, extension ID is passed.
					// If freePlan propmt is closed, a message is passed to background for xorkeesign log.
					if(resp == undefined)  resp = CSUTILS.frameResponse(G2C_MSG.ERROR_STD, service);
			
					resp.extensionId = EXTENSION_ID;
					
					CSUTILS.promptListener(resp, function(userAction) {
						
						if(userAction.retry == true)
						{
							/*
								Retry scenarios
								---------------
								
								1. xorkee registration
								2. User not reachable(Signature request and freePlan request)
							*/
							
							//freePlan flag will be preserved untill the signature request is cancelled
							
							freePlan = (freePlan == true)?true:userAction.freePlan;
							handle = (handle != undefined)?handle:userAction.handle;
							applyUnits = (applyUnits == true)?true:userAction.applyUnits;
							if(userAction.selectedHandle) 
							{
								// Multiple active handle for the PAN
								// User has choosen one handle in the list of handles
								handle = userAction.selectedHandle;
							}
							emb(xhrCtx, payload, freePlan, handle, applyUnits);
						}
						else
						{
							console.log(resp);
							if(service == SERVICENAME_MCA_V3 && resp.result != 0 && resp.result != G2C_ERR.NO_USER_IDENTIFIER[0])
							{
								window.location.reload();
								return;
							}
							else if(xhrCtx._url.indexOf("ListToken") != -1 && resp.result == 0)
							{
								if(document.getElementById("submitbtn") != null) document.getElementById("submitbtn").click();
							}
							
							resp = frameEmbPayload(resp);
							
							if((obj._onload instanceof Function) == true)
							{
								obj.readyState = 4;
								obj.status = 200;
								obj.response = (resp==undefined||resp==null)?{}:resp;
								obj._onload();
							}
							
						}
					});
					
					
					// TODO: if required verify "resp" and respond ErrorEvent accordingly to onerror callback
					/*if((obj._onerror instanceof Function) == true)
					{
						obj._onerror(new Error("error", {
							error:new Error(errmsg),
							message:errmsg
						}));
					}*/
				};
			})(xhrCtx)
		);
	}

})();


