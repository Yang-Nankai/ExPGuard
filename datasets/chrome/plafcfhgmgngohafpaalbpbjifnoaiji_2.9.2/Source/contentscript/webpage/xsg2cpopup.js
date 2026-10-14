console.log("xorkeesign India G2C popup script attached");
var XSG2C_IMAGE_DIR = document.documentElement.getAttribute("xsG2C-imagesDir");
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

const URL_XORKEESIGN_INFO = "https://www.odysseytec.com/xorkeesign/";
const URL_XORKEESIGN_FEATURES = "https://xorkeesign.com";
const URL_USER_NOT_REACHABLE = "https://www.odysseytec.com/user-not-reachable?type=";
const URL_XORKEESIGN_SUBSCRIPTION_HELP = "https://xorkeesign.com/subscriptionHelp.html";

const LINK_XORKEESIGN_INFO = `<a target = "_blank" class = "xsg2clinktext" href = ${URL_XORKEESIGN_INFO}>xorkeesign</a>`;

const XSG2C_WARNING_COLOR = "#e5ca09";
const XSG2C_ALERT_COLOR = "#ff4747";

const xsg2cpopup = {
	
	showError: function(msg, cb){
		xsg2cShowInfo("warning", msg, cb);
	},
	
	showInfo: function(msg, cb){
		xsg2cShowInfo("success", msg, cb);
	},
	
	showNotification: function(handle, notifyId){
		
		var promptText;
		if(notifyId != undefined) promptText = "Notification sent to <b>"+handle+"</b><br> Please approve in your xorkee app.<br><br><span>Notification Id - "+notifyId+"</span>";
		else promptText = "Notification sent to <b>"+handle+"</b><br><br> Please approve in your xorkee app.";
		xsg2cpopup.showLoader(promptText);
	},
	
	showEnrollNotification: function(service, handle, notifyId, params){
		
		var promptText;
		if(notifyId != undefined) promptText = `<span class = 'xsg2cboldtext'>Approve the two notifications sent to <b>${handle}</b> in the xorkee app.</span><br>One to enroll in xorkeesign ${(XSCUTILS.isFreeService(service))?"for a 30-day free trial ":""}and other for actual signing.<br><br><span>Notification Id - ${notifyId}</span>`;
		else promptText = `<span class = 'xsg2cboldtext'>Approve the two notifications sent to <b>${handle}</b> in the xorkee app.</span><br>One to enroll in xorkeesign ${(XSCUTILS.isFreeService(service))?"for a 30-day free trial ":""}and other ${(params != undefined && params.registerEnc == true)?"to list certificates":"for actual signing"}.`;
	
		xsg2cpopup.showLoader(promptText);
	},
	
	showSubscribeNotification: function(handle, notifyId){
		var promptText = "<span class = 'xsg2cboldtext'>An additional signature request has been sent to <b>"+handle+"</b> for confirming your choice of free plan.</span><br><br><span>Notification Id - "+notifyId+"</span>";
		xsg2cpopup.showLoader(promptText);
	},
	
	showLoader: function(promptText){
		var buttonwrapper,contentwrapper;
		if(promptText == undefined)
			promptText = "Please Wait...";
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
		contentwrapper.classList.add("singleLinePadding");
		
		buttonwrapper.style.cssText +="height:45px;background:rgb(73 145 227);";
		xsg2cCreateElement('div').setAttribute('class','xsg2cspinloader').appendTo(buttonwrapper);
	},
	
	hideNotification: function(){
		xsg2cpopup.removePopup();
	},
	
	_retrySignature: function(handle, signerName, isreg, cb){
		var buttonwrapper, contentwrapper, msg;
		
		if(isreg == false)
		{
			msg = `<div class = "xsg2cboldtext"  style = "padding: 0 15px;" >The DSC token of <b>${signerName} (${handle})</b> is not reachable.</div>
				<div class = "xsg2csemiboldtext" style = "margin-top: 20px;font-size: 13px;" >Please ensure the following:</div>
				<ul class = 'xsg2c-ul' style = "font-size: 13px;" >
					<li>The token is <i><b>plugged-in</b></i> into an internet-connected PC/mobile with xorkee app installed</li>
					<li>The xorkee app in PC has not gone into <i><b>sleep</b></i> mode or is not <i><b>paused</b></i>. You can plug out and plug in the token again</li>
					<li>If using the mobile app <i><b>Do not disturb</b></i> mode is not enabled</li>
				</ul>
			`;
		}
		else
		{
			msg = `<div class = "xsg2cboldtext"  style = "padding: 0 15px;" >The DSC token of <b>${signerName}</b> is not reachable.</div>
				<div class = "xsg2csemiboldtext" style = "margin-top: 20px;font-size: 13px;" >Please ensure the following:</div>
				<ul class = 'xsg2c-ul' style = "font-size: 13px;" >
					<li><b>${handle}</b> is the xorkee handle of <i>${signerName}</i></li>
					<li>The token is <i><b>plugged-in</b></i> into an internet-connected PC/mobile with xorkee app installed</li>
					<li>The xorkee app in PC has not gone into <i><b>sleep</b></i> mode or is not <b><i>paused</b></i>. You can plug out and plug in the token again</li>
					<li>If using the mobile app <i><b>Do not disturb</b></i> mode is not enabled</li>
				</ul>
			`;
		}
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg,XSG2C_WARNING_COLOR);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,["Retry","Cancel"],function(btnIndex){
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				if(cb) cb(true);
			}
			else 
			{
				if(cb) cb(false);
			}
			
		});
	},
	
	retrySignature: function(service, handle, cb, hideRetry){
		
		var buttonwrapper, contentwrapper, msg, btnArr = [];
		var type = (service==SERVICENAME_CPPP)?"e-Procurement":service;
		
		if(service == SERVICENAME_MAHAIT) type = "Maha-Online";
		else if(service == SERVICENAME_COO_DGFT) type = "Certificates of origin (DGFT)";
		
		msg = `<div class = "xsg2cboldtext"  style = "padding: 0 15px;" ><b>${handle}</b></div>
				<div class = "xsg2csemiboldtext" style = "margin-top: 20px;font-size: 14px;" >
					The DSC token is not plugged-in (or) in sleep mode. Re-plug the token and try again.<br><br>
					Make sure that the system or mobile where you plugged in the token has xorkee app installed.
				</div>
				<div class = "xsg2csemiboldtext" style = "color: blue;text-decoration: underline;cursor: pointer;margin-top: 18px;" >
					<a class = "xsg2clinktext" target="_blank" href="${URL_USER_NOT_REACHABLE}${type}&handle=${handle}" >Why do we see this?</a>
				</div>
			`;
		
		
		if(hideRetry) btnArr = ["Close"];
		else btnArr = ["Retry","Cancel"];
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg,XSG2C_WARNING_COLOR);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			
			if(hideRetry) {
				xsg2cpopup.removePopup();
				if(cb) cb(false);
				return;
			}
			
			if(btnIndex == 0)
			{
				// To avoid dullscreen flicker effect, popup is not removed here. It will removed when xorkee notification is displayed.
				if(cb) cb(true);
			}
			else 
			{
				 xsg2cpopup.removePopup();
				if(cb) cb(false);
			}
			
		});
	},
	
	_trialSubscriptionExpired: function(service, url, handle, cb){
		var buttonwrapper, contentwrapper, msg, btnArr = [];
		
		msg = `
			<div class = 'xsg2cboldtext'>
								  
				<span >The trial period for <b><i>${handle}</i></b> has ended.</span>
				<br><br>
				You can pay a nominal subscription for using all the features of xorkeesign like G2C, invoice signing and other document signing.
				<br><br>	
				Or continue with a free plan for using only the IndiaG2C features (ITR, MCA, GST, EPFO and TDS Traces).
		  
			</div>`;
		
		btnArr = ["Subscribe", "Free plan"];
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg, undefined, true, function(){
			// Close Btn Callback function
			promptText = `
				<div class = 'xsg2cboldtext' >
					<span>To sign for <b><i>${handle}</b></i> you have to choose one of the plans.</span>
					<br>
					<span>Are you sure you want to close without choosing a plan?</span>
				</div>
				
				`;
			[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
			contentwrapper.classList.add("singleLinePadding");
			xsg2cCreateBtns(buttonwrapper,["Close","Go Back"],function(btnIndex1){
				if(btnIndex1 == 0)
				{
					xsg2cpopup.removePopup();
					if(cb) cb(undefined, true);
				}
				else if(btnIndex1 == 1)
				{
					xsg2cpopup._trialSubscriptionExpired(service, url, handle, cb);
				}
			});
		});
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				window.open(url, '_blank');
				if(cb) cb(false);
			}
			else 
			{
				if(cb) cb(true);
					 
			}
		});
	},
	
	trialSubscriptionExpired: function(params, cb){
		
		var buttonwrapper, contentwrapper, msg, btnArr = [], str;
		var {result, handle, subscription, extensionId} = params;
		
		if(result == XS_ERRCODE.UNITS_AVAILABLE)
		{
			str = `
				<div class = "xsg2c-dom-lineSpace" >Click 'Subscribe' to deduct ${xsG2cToWord(subscription.units)} subscription units from your balance in xorkeestore (Valid Till: ${subscription.newValidTillStr}).</div>
				<div class = "xsg2c-dom-lineSpace" >This subscription covers all the signing features of ${LINK_XORKEESIGN_INFO}.</div>`;
		}
		else
		{
			// Units not available
			str = `<div class = "xsg2c-dom-lineSpace" >You can pay a nominal subscription for using all the features of ${LINK_XORKEESIGN_INFO} like G2C, invoice signing and other document signing.</div>`;
		}
		
		msg = `
			<div class = 'xsg2cboldtext'> 
				<div class = "xsg2c-dom-lineSpace" style = "font-weight:bold;margin-bottom:10px;" >The trial period for <b><i>${handle}</i></b> has ended</div>
				<div style = "text-align:left;padding:0px 20px;" >
					${str}
					<div class = "xsg2c-dom-lineSpace" >Or continue with a free plan for using only the IndiaG2C features (ITR, MCA, GST, EPFO and TDS Traces).</div>
				</div>
			</div>`;
		
		btnArr = ["Subscribe", "Free plan"];
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg, undefined, true, function(){
			// Close Btn Callback function
			promptText = `
				<div class = 'xsg2cboldtext' >
					<span>To sign for <b><i>${handle}</b></i> you have to choose one of the plans.</span>
					<br>
					<span>Are you sure you want to close without choosing a plan?</span>
				</div>
				
				`;
			[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
			contentwrapper.classList.add("singleLinePadding");
			xsg2cCreateBtns(buttonwrapper,["Close","Go Back"],function(btnIndex1){
				if(btnIndex1 == 0)
				{
					xsg2cpopup.removePopup();
					
					// xorkeesign logger
					var extmsg = {};
					extmsg.type = G2C_MSG.SET_INFO;
					extmsg.handle = handle;
					extmsg.action = "freePlanNotOpted";
					
					try
					{
						if(extensionId != undefined) 
						{
							chrome.runtime.sendMessage(extensionId, extmsg, function(){console.log("FreePlan prompt closed");});
						}
						else 
						{
							chrome.runtime.sendMessage(extmsg, function(){console.log("FreePlan prompt closed");});
						}
					} 
					catch(e) {console.log(e)};
									
					cb(false, false, true);
				}
				else if(btnIndex1 == 1)
				{
					xsg2cpopup.trialSubscriptionExpired(params, cb);
				}
			});
		});
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				if(result == XS_ERRCODE.UNITS_UNAVAILABLE) window.open(subscription.url, '_blank');
				
				cb(true, false, false);
			}
			else 
			{
				cb(false, true, false);
			}
		});
	},
	
	renewSubscription: function(service, url, handle, cb){
		var buttonwrapper, contentwrapper, msg, btnArr = ["Renew"];
		
		msg = `
			<div class = 'xsg2cboldtext' >
				<span >xorkeesign subscription for <br><b><i>${handle}</i></b> has expired.</span>
				<br><br>
				Try again after renewing the subscription.
			</div>`;
			
		btnArr.push("Cancel");
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				window.open(url, '_blank');
				if(cb) cb(true);
			}
			else if(cb) cb(false);
		});
	},
	
	applySubscription: function(service, handle, isEnrolled, subscription, cb){
		
		var buttonwrapper, contentwrapper, msg, btnArr = [], promptText, requiredUnitsTxt;
		
		requiredUnitsTxt = `Click 'Proceed' to deduct ${xsG2cToWord(subscription.units)} subscription units from your balance in xorkeestore (Valid Till: ${subscription.newValidTillStr}).`;
		
		if(isEnrolled == false)
		{
			promptText = `
				<div class = "xsg2c-dom-lineSpace" style = "text-align: center;" ><b><i>${handle}</i></b></div>
				<div class = "xsg2c-dom-lineSpace" >You should subscribe to xorkeesign to sign in this portal.</div>
				<div class = "xsg2c-dom-lineSpace" >${requiredUnitsTxt}</div>
				<div class = "xsg2c-dom-lineSpace" >This subscription covers all the signing features of ${LINK_XORKEESIGN_INFO}.</div>
				<div class = "xsg2c-dom-lineSpace" >Your should also consent to enroll in xorkeesign after which your subscription will be effective.</div>
			`;
		}
		else
		{
			if(subscription.type == "trial")
			{
				if(subscription.state == "active")
				{
					// In trial
					promptText = `
						<div class = "xsg2c-dom-lineSpace" style = "text-align: center;" ><b><i>${handle}</i></b></div>
						<div class = "xsg2c-dom-lineSpace" >Your trial subscription does not include signing in this portal.</div>
						<div class = "xsg2c-dom-lineSpace" >${requiredUnitsTxt}</div>
						<div class = "xsg2c-dom-lineSpace" >The paid subscription covers all the signing features of ${LINK_XORKEESIGN_INFO}.</div>
					`;
				}
				else
				{
					// Trial expired
					promptText = `
						<div class = "xsg2c-dom-lineSpace" style = "text-align: center;" ><b><i>${handle}</i></b></div>
						<div class = "xsg2c-dom-lineSpace" >You should subscribe to xorkeesign to sign in this portal.</div>
						<div class = "xsg2c-dom-lineSpace" >${requiredUnitsTxt}</div>
						<div class = "xsg2c-dom-lineSpace" >The paid subscription covers all the signing features of ${LINK_XORKEESIGN_INFO}.</div>
					`;
				}
			}
			else if(subscription.type == "free")
			{
				promptText = `
					<div class = "xsg2c-dom-lineSpace" style = "text-align: center;" ><b><i>${handle}</i></b></div>
					<div class = "xsg2c-dom-lineSpace" >You have opted for a Free plan which does not include signing in this portal.</div>
					<div class = "xsg2c-dom-lineSpace" >${requiredUnitsTxt}</div>
					<div class = "xsg2c-dom-lineSpace" >The paid subscription covers all the signing features of ${LINK_XORKEESIGN_INFO}</div>
				`;
			}
			else if(subscription.type == "live")
			{
				promptText = `
					<div class = "xsg2c-dom-lineSpace" style = "text-align: center;" >The subscription for <b><i>${handle}</i></b> has expired.
					</div>
					<div class = "xsg2c-dom-lineSpace" >${requiredUnitsTxt}</div>
				`;
			}
		}
		
		msg = `
			<div class = "xsg2cboldtext" style = "text-align: left;padding: 0 10px;" >
				${promptText}
			</div>`;
			
		btnArr = ["Proceed", "Close"];
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg);
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			
			if(btnIndex == 0)
			{
				if(cb) cb(true);
			}
			else 
			{
				if(isEnrolled == true)
				{
					if(subscription.type == "free")
					{
						promptText = `
							<div class = 'xsg2cboldtext' >
								Signing in this portal requires a standard xorkeesign subscription. You can still use all the IndiaG2C features (ITR, MCA, GST, EPFO and TDS Traces).
							</div>
						`;
					}
					else if(subscription.type == "trial" && subscription.state == "active")
					{
						// In trial subscription
						
						promptText = `
							<div class = 'xsg2cboldtext' >
								Signing in this portal requires a standard xorkeesign subscription. You can still use the other features covered under the trial subscription until ${subscription.validTillStr}.
							</div>
						`;
					}
					else
					{
						xsg2cpopup.removePopup();
						if(cb) cb(false);
						return;
					}
						
					[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
					contentwrapper.classList.add("singleLinePadding");
					xsg2cCreateBtns(buttonwrapper,["OK","Go Back"],function(btnIndex1){
						if(btnIndex1 == 0)
						{
							xsg2cpopup.removePopup();
							if(cb) cb(false);
						}
						else if(btnIndex1 == 1)
						{
							xsg2cpopup.applySubscription(service, handle, isEnrolled, subscription, cb);
						}
					});
				}
				else
				{
					xsg2cpopup.removePopup();
					if(cb) cb(false);
				}
			}
		});
	},
	
	subscriptionRequired: function(service, handle, isEnrolled, subscription, cb, hideOtherOption){
		var buttonwrapper, contentwrapper, msg, btnArr = [], promptText, otloverlay;
		
		if(isEnrolled == false)
		{
			promptText = `
				<b><i>${handle}</i></b>
				<div class = "xsg2c_linespace" >You should subscribe to ${LINK_XORKEESIGN_INFO} to sign in this portal</div>
			`;
		}
		else
		{
			if(subscription.type == "trial")
			{
				promptText = `
					<b><i>${handle}</i></b>
					<div class = "xsg2c_linespace" >You should subscribe to ${LINK_XORKEESIGN_INFO} to sign in this portal</div>
				`;
			}
			else if(subscription.type == "free")
			{
				promptText = `
					<b><i>${handle}</i></b>
					<div class = "xsg2c_linespace" >You need a ${LINK_XORKEESIGN_INFO} paid subscription for signing in this portal</div>
				`;
			}
			else if(subscription.type == "live")
			{
				promptText = `
					The subscription for <b><i>${handle}</i></b> has expired
				`;
			}
		}
		
		/* promptText +=`
			<div class = "xsg2c_linespace" >Kindly contact <a href="mailto:sales@odysseytec.com">sales@odysseytec.com</a> mentioning your handle</div>
			<div class = "xsg2c_linespace" >or</div>
			<div class = "xsg2c_linespace" style = "display: flex;justify-content: center;align-items: center;margin-top:0;" >
				<span style = "margin: 0px 20px;" >scan the QR code</span>
				<span><img src = "data:image/jpeg;base64, ${WHATSAPP_QRCODE}" /></span>
			</div>
			<div class = "xsg2c_linespace" >Our representative will help you subscribe</div>
		`; */
		
		// promptText +="<br><br>";
		
		msg = `
			<div class = 'xsg2cboldtext' >
				${promptText}
			</div>`;
			
		btnArr = ["Subscribe", "Close"];
		[buttonwrapper, contentwrapper, otloverlay] = xsg2cCreatePopup(msg);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				if(subscription != undefined && subscription.url != undefined) window.open(subscription.url, '_blank');
				else window.open(URL_XORKEESIGN_SUBSCRIPTION_HELP, '_blank');
				
				if(cb) cb(true);
			}
			else
			{
				if(hideOtherOption) {
					xsg2cpopup.removePopup();
					if(cb) cb(false);
					return;
				}
				
				promptText = `
					<div class = 'xsg2cboldtext' >
						Signing in this portal requires a xorkeesign subscription<br><br>To sign without xorkeesign you should use a browser and the steps specified by the portal.
					</div>
				`;
						
				[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
				contentwrapper.classList.add("singleLinePadding");
				xsg2cCreateBtns(buttonwrapper,["OK","Go Back"],function(btnIndex1){
					if(btnIndex1 == 0)
					{
						xsg2cpopup.removePopup();
						if(cb) cb(false);
					}
					else if(btnIndex1 == 1)
					{
						xsg2cpopup.subscriptionRequired(service, handle, isEnrolled, subscription, cb, hideOtherOption);
					}
				});
			}
			
		});
		
		if(!hideOtherOption) {
			
			for(var i=0; i<buttonwrapper.childNodes.length; i++)
			{
				buttonwrapper.childNodes[i].style.marginBottom = "8px";
			}
			
			xsg2cCreateElement('span').style('padding: 20px 0px;padding-top: 12px;width: 85%;text-align: center;font-size: 12.5px;color: rgb(50 48 48);').addContent("innerHTML", "To sign without xorkeesign you should use a browser and the steps specified by the portal.").appendTo(buttonwrapper.parentElement);
		}
		
		otloverlay.style.cssText +="width:570px;max-width:570px;";
	},
	
	xorkeeRegisterDSCSign: function(signer, pan, dscValidTill, cb){
		var promptText,buttonwrapper,contentwrapper;
		if(pan != undefined) promptText = '<span style="font-size:18px;font-weight:bold">The DSC of the authorized signatory carrying the PAN <i>'+pan+'</i> must be registered in xorkee.</span><br><br>You can download xorkee <a class = "xsg2clinktext" target="_blank" href="'+xsg2cGetXorkeeLink('xorkee')+'" >here</a>.<br>If you already have xorkee app, plug-in the DSC token.<br><br><a href="'+xsg2cGetXorkeeLink('youtube')+'" target="_blank" class = "xsg2clinktext" >This</a> may help you with the registration process.<br>';
		else promptText = '<span style="font-size:18px;font-weight:bold">'+((signer==undefined)?'You must register your DSC in xorkee':'The DSC of <i>'+signer+'</i> (with validity till '+dscValidTill+') must be registered in xorkee')+'.</span><br><br>You can download xorkee <a class = "xsg2clinktext" target="_blank" href="'+xsg2cGetXorkeeLink('xorkee')+'" >here</a>.<br>If you already have xorkee app, plug-in the DSC token of<br><i>'+((signer==undefined)?'the signatory':signer)+'</i>.<br><br><a href="'+xsg2cGetXorkeeLink('youtube')+'" target="_blank" class = "xsg2clinktext" >This</a> may help you with the registration process.<br>';
		[buttonwrapper] = xsg2cCreatePopup(promptText);
		xsg2cCreateBtns(buttonwrapper,["I'm ready","I'll do later"],function(btnIndex){
			if(btnIndex == 0)
			{
				promptText = '<span style="font-size:18px;" >Have you installed xorkee and completed registration?</span>';
				[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
				contentwrapper.classList.add("singleLinePadding");
				xsg2cCreateBtns(buttonwrapper,["Yes","No"],function(btnIndex1){
					if(btnIndex1 == 0)
					{
						xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
						if(cb) cb(true);
					}
					else if(btnIndex1 == 1)
					{
						xsg2cpopup.xorkeeRegisterDSCSign(signer, pan, dscValidTill, cb);
					}
				});
			}
			else if(btnIndex == 1)
			{
				xsg2cpopup.removePopup();
				if(cb) cb(false);
			}
		});
	},
	
	xorkeeRegisteration: function(headerText, cb){
		
		var promptText,buttonwrapper,contentwrapper;
		
		 promptText = `<span style="font-size:18px;font-weight:bold">${headerText}</span><br><br>You can download xorkee <a class = "xsg2clinktext" target="_blank" href="${xsg2cGetXorkeeLink('xorkee')}" >here</a>.<br>If you already have xorkee app, plug-in the DSC token.<br><br><a href="${xsg2cGetXorkeeLink('youtube')}" target="_blank" class = "xsg2clinktext" >This</a> may help you with the registration process.<br>`;
		 
		[buttonwrapper] = xsg2cCreatePopup(promptText);
		xsg2cCreateBtns(buttonwrapper,["I'm ready","I'll do later"],function(btnIndex){
			if(btnIndex == 0)
			{
				promptText = '<span style="font-size:18px;" >Have you installed xorkee and completed registration?</span>';
				[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
				contentwrapper.classList.add("singleLinePadding");
				xsg2cCreateBtns(buttonwrapper,["Yes","No"],function(btnIndex1){
					if(btnIndex1 == 0)
					{
						xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
						if(cb) cb(true);
					}
					else if(btnIndex1 == 1)
					{
						xsg2cpopup.xorkeeRegisteration(headerText, cb);
					}
				});
			}
			else if(btnIndex == 1)
			{
				xsg2cpopup.removePopup();
				if(cb) cb(false);
			}
		});
	},
	
	xorkeeRegisterDSCReg: function(signer, handle, cb, hideRetry){
		
		//In CPPP register DSC signer will be undefined.
		var promptText,buttonwrapper,contentwrapper, btnArr;
		if(signer != undefined)
		{
			promptText = '<span style="font-size:18px;font-weight:bold">\''+handle+'\' is not recognized by xorkee. Please check the spelling</span>.<br><br>If <i>'+signer+'</i> doesn\'t have a xorkee handle,<br><a class="xsg2clinktext" target="_blank" href="'+xsg2cGetXorkeeLink('xorkee')+'">Download</a> and install the xorkee app and plug-in the DSC token of <i>'+signer+'</i>.<br><br><a href="'+xsg2cGetXorkeeLink('youtube')+'" target="_blank" class = "xsg2clinktext" >This</a> may help you get a xorkee handle.';
		}
		else
		{
			promptText = '<span style="font-size:18px;font-weight:bold">\''+handle+'\' is not recognized by xorkee. Please check the spelling</span>.<br><br><a class="xsg2clinktext" target="_blank" href="'+xsg2cGetXorkeeLink('xorkee')+'">Download</a> and install the xorkee app and plug-in the DSC token.<br><br><a href="'+xsg2cGetXorkeeLink('youtube')+'" target="_blank" class = "xsg2clinktext" >This</a> may help you get a xorkee handle.';
		}
		
		[buttonwrapper] = xsg2cCreatePopup(promptText);
		
		if(hideRetry) btnArr = ["Close"];
		else btnArr = ["Try again","Cancel"];
		
		xsg2cCreateBtns(buttonwrapper, btnArr,function(btnIndex){
			
			if(hideRetry) {
				xsg2cpopup.removePopup();
				if(cb) cb(false);
				return;
			}
			
			if(btnIndex == 0)
			{
				promptText = '<span style="font-size:18px;" >Have you installed xorkee and got a handle?</span>';
				[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
				contentwrapper.classList.add("singleLinePadding");
				xsg2cCreateBtns(buttonwrapper,["Yes","No"],function(btnIndex1){
					if(btnIndex1 == 0)
					{
						xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
						if(cb) cb(true);
					}
					else if(btnIndex1 == 1)
					{
						xsg2cpopup.xorkeeRegisterDSCReg(signer, handle, cb);
					}
				});
			}
			else if(btnIndex == 1)
			{
				xsg2cpopup.removePopup();
				if(cb) cb(false);
			}
		});
	},
	
	showPortalRegistration: function(signers,username,selectedcert,savesigner,cb,showTopNotify){
		var promptText,buttonwrapper,contentwrapper;
		promptText = '<span style="font-size:18px;">You have chosen a new DSC token. Register/Update DSC in this website before filing your returns.</span>';
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
		contentwrapper.classList.add("singleLinePadding");
		xsg2cCreateBtns(buttonwrapper,["Proceed","Back"],function(btnIndex){
			if(btnIndex == 0)
			{
				xsg2cpopup.removePopup();
				if(cb) 
				{
					if(selectedcert!=undefined)
					{
						if(showTopNotify == true && signers!=undefined && username!=undefined && cb!=undefined)
							xsg2cpopup.showTopNotify(signers,username,cb,selectedcert);
						cb(selectedcert.handle,savesigner);
					}
					else
						cb(true);
				}
			}
			else if(btnIndex == 1)
			{
				xsg2cpopup.selectCertificate(signers,username,false,cb,showTopNotify,selectedcert.handle);
				// xsg2cpopup.removePopup();
			}
		});
	},
	
	selectCertificate: function(signers,username,inregisterpage,cb,fromtopnotification,selectedhandle){
		//Prompt to list the certificates
		//upon choosing a certificate, intimate the user via the callback
		//return "Sign Only Once" or "Sign and set as default" options
		//hence the callback should return
		//	1. selected handle
		//	2. save the signer or not
		//for IT, we always save and for MCA, we always select
		
		var buttonwrapper,changecertcontainer,changecertheader,contentwrapper,i,certcontainer,k,otlcertwrapperList ,selectedcert ,checkboxelem,savesigner = false,lastusedcontainer,haslastused = false,keylabelcontainer,errorcontainer,errorinterval,xsg2ccertwrapperright,activesignercount = 0,certheadertext,lastusertext;
		
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup('');
		
		lastusedcontainer = xsg2cCreateElement('div').style('width:100%;margin:10px 0;padding-bottom: 8px;').appendTo(contentwrapper);
		changecertheader = xsg2cCreateElement('div').style('width:100%;margin:10px 0;').appendTo(contentwrapper);
		changecertcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccustomscrollbar').style('width:100%;margin:10px 0;max-height: 250px;overflow: hidden;overflow-y: auto;').appendTo(contentwrapper);
		
		for(i = 0;i < signers.length;i++)
		{
			if(signers[i].lastUsed)
			{
				// Last used certificate has been displayed, when the certificate is active or expired or revoked
				haslastused = true;
				
				lastusertext = "";
				if(signers[i].status == 'active')
				{
					lastusertext = "The DSC token <b style = 'color:#626b85;'>"+signers[i].otherInfo.keyLabel+"</b> ("+signers[i].handle+") is currently used for signing.";
					
				}
				else
				{
					lastusertext = "The DSC token <b style = 'color:#626b85;'>"+signers[i].otherInfo.keyLabel+"</b> ("+signers[i].handle+") has <span style =  'color:red;' >"+signers[i].status+"</span>";
				}
				xsg2cCreateElement('div').style('font-size: 21px;').setAttribute('class','xsg2cboldtext').addContent('innerHTML',lastusertext).appendTo(lastusedcontainer);
				lastusedcontainer.style.cssText+="border-bottom: solid 1px #c7c7c7;";
			}
			else if(signers[i].status == 'active' )
			{
				// Only active certificates will be listed.
				
				certcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapper').appendTo(changecertcontainer);
				
				xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperleft').addContent('innerHTML','<label class="xsg2cradiocontainer"><input type="radio" id = "xsg2cradio_'+i+'" name = "xsg2cradio" ><span class="xsg2cradiomark"></span></label>').appendTo(certcontainer);
				xsg2ccertwrapperright = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperright').appendTo(certcontainer);
				
				xsg2cCreateElement('span').style('font-size: 16px;font-weight:bold;').setAttribute('class','xsg2cwraptext').addContent('innerHTML',signers[i].otherInfo.keyLabel).appendTo(xsg2ccertwrapperright);
				xsg2cCreateElement('span').style('color:grey').setAttribute('class','xsg2cwraptext').addContent('innerHTML',signers[i].certInfo.validFrom[1]+" to "+signers[i].certInfo.validTill[1]).appendTo(xsg2ccertwrapperright);
				xsg2cCreateElement('span').style('color:grey').setAttribute('class','xsg2cwraptext').addContent('innerHTML',signers[i].handle).appendTo(xsg2ccertwrapperright);
				
				certcontainer.onclick = function(index,selectcertobj){
					return function(){
						if(document.getElementById('xsg2cradio_'+index))
						{
							var radioBtn = document.getElementById('xsg2cradio_'+index);
							radioBtn.click();
						}
						otlcertwrapperList = document.getElementsByClassName('xsg2cselectedcertwrapper');
						for(k = 0 ;k < otlcertwrapperList.length;k++)
							otlcertwrapperList[k].classList.remove("xsg2cselectedcertwrapper");
						this.classList.add("xsg2cselectedcertwrapper");
						
						selectedcert = selectcertobj;
						
					}
				}(i,signers[i]);
				activesignercount++;
				
				if(selectedhandle!=undefined)
				{
					// In portal registration prompt, if back button is clicked, the previously selected handle has been selected by default.
					if(signers[i].handle == selectedhandle)
					{
						certcontainer.click();
					}
				}
			}
			
			
				
		}
		
		certheadertext = "";
		if(haslastused)
		{
			if(activesignercount == 1)
			{
				certheadertext = 'You can use the following DSC for '+((username!=undefined)?"<b>"+username+"</b>":"this website");
			}
			else
			{
				certheadertext = 'Select a different DSC for '+((username!=undefined)?"<b>"+username+"</b>":"this website:");
			}
		}
		else
		{
			certheadertext = 'You have procured multiple DSC tokens. Select the one you want to use for '+((username!=undefined)?"<b>"+username+"</b>":"this website:");
			if(lastusedcontainer)	lastusedcontainer.parentElement.removeChild(lastusedcontainer);
		}
		
		xsg2cCreateElement('div').setAttribute('class','xsg2cboldtext').style('').addContent('innerHTML',certheadertext).appendTo(changecertheader);
		
		if(fromtopnotification == true)
		{
			// While trying to change certificate using top notification.
			// Selected certificate will be saved while singing(Save selection check box has been removed).
			xsg2cCreateElement('div').setAttribute('class','xsg2csemiboldtext').addContent('innerHTML','Note : This selection will be saved during signing process.').appendTo(contentwrapper);
			savesigner = true;
		}
		else
		{
			
			checkboxelem = xsg2cCreateElement('div').style('cursor:pointer;display: flex;justify-content: center;').addContent('innerHTML','<label class="xsg2ccheckboxcontainer"><input type="checkbox" id = "xsg2ccheckbox" ><span class="xsg2ccheckmark"></span></label>').appendTo(contentwrapper);
			
			var checkboxtext = xsg2cCreateElement('span').addContent('innerHTML','Save my selection to avoid choosing a DSC everytime').appendTo(checkboxelem);
			checkboxtext.onclick = function(){
				if(document.getElementById('xsg2ccheckbox'))
					document.getElementById('xsg2ccheckbox').click();
			}
			
				
			if(document.getElementById('xsg2ccheckbox'))
			{
				document.getElementById('xsg2ccheckbox').onchange = function(){
					if(this.checked) // checkbox
						savesigner = true;
					else
						savesigner = false;
				}
			}
		}
		
		xsg2cCreateBtns(buttonwrapper,["Proceed", "Cancel"],function(index){
			if(index == 0)
			{
				if(selectedcert == undefined)
				{
					// Certificate has not been selected. Error prompt has been displayed.
					clearInterval(errorinterval);
					xsg2cRemoveElem(['xsg2cerrorcontainer']);
					errorcontainer = xsg2cCreateElement('div').setAttribute('id','xsg2cerrorcontainer').setAttribute('class','xsg2cerrorcontainer').appendTo(contentwrapper);
					xsg2cCreateElement('div').addContent('innerHTML','<img src =  "'+XSG2C_IMAGE_DIR+'warning.svg" />').appendTo(errorcontainer);
					xsg2cCreateElement('div').style('margin: 0 18px;').addContent('innerHTML','Choose any one signatory to proceed').appendTo(errorcontainer);
					
					errorinterval = setTimeout(function(){
						xsg2cRemoveElem(['xsg2cerrorcontainer']);
					},5000);
				}
				else
				{
					if(haslastused == true && inregisterpage == false)
					{
						// If trying to change certificate, when the user has a default signing certificate and the user is not in the registerDSC page. Portal registration warning prompt has been displayed.
						if(fromtopnotification)
						{
							// Notify the selected handle after the portal registraion prompt.
							xsg2cpopup.showPortalRegistration(signers,username,selectedcert,savesigner,cb,true);
						}
						else
						{
							xsg2cpopup.showPortalRegistration(signers,username,selectedcert,savesigner,cb,false);
						}
					}
					else
					{
						xsg2cpopup.removePopup();
						cb(selectedcert.handle,savesigner);
					}
				}
			}
			else
			{
				xsg2cpopup.removePopup();
				if(cb) cb(undefined);
			}
		});
	},
	
	showTopNotify: function(signers,username,cb,selectedcert) {
		//put a notification on the page top
		//frame the message to notify current certificate expiry/revoke
		//or to choose a different certificate
		//if a new handle is chosen intimate the caller via the callback
		//Try to use the "selectCertificate" or equivalent call internally upon button click
		
		var promptText,buttonwrapper,i,lastused,hasactivecert = false;
		
		for(i = 0;i<signers.length;i++)
		{
			if(signers[i].lastUsed == true)
				lastused = signers[i];
			else if(signers[i].status == 'active')
				hasactivecert = true;
		}
		
		if(hasactivecert == false || lastused == undefined)
		{
			// no active certificate other than the current signing certificate and no default signing certificate.
			return
		}
		
		if(lastused.status == "expired" || lastused.status == "revoked")
		{
			promptText = 'The DSC token <b>'+ lastused.otherInfo.keyLabel+'</b> has <b class = "xsg2cblink1" style = "color:white;" >'+lastused.status+'</b>.';
		}
		else if(lastused.status == "active" && hasactivecert == true)
		{
			promptText = 'The DSC token <b>'+ lastused.otherInfo.keyLabel+'</b> will be used for signing in this website.';
		}
		
		if(promptText == undefined)
		{
			// this scenario should not occur. For safer side
			return;
		}
		
		
		if(selectedcert!=undefined)
		{
			promptText = 'The selected DSC token <b>'+ selectedcert.otherInfo.keyLabel+'</b> will be used henceforth during signing.';
		}
		
		xsg2cCreateTopNotify(promptText,'xorkeelogo-green.svg','Change',function(){
			xsg2cpopup.selectCertificate(signers,username,false,cb,true);
		});
		
	},
	
	showNotify: function(promptText){
		xsg2cCreateTopNotify(promptText);
	},
	
	removePopup: function(){
		xsg2cRemoveElem(['xsg2cdullscreen','xsg2coverlaywrapper','xsg2cnotityoverlaywrapper']);
	},
	
	removeStdPopup: function(){
		xsg2cRemoveElem(['xsg2cStddullscreen','xsg2cStdoverlaywrapper']);
	},
	
	getHandle: function(appletContainer, signerName, cb){
		
		var flexcontainer, container, handlecontainer, btnwrapper, handleRv, errorcontainer, elem, imageSrc, osname;
			
		osname = xsg2cgetOS();
		
		if(osname == "Mac OS") imageSrc = "mac-xorkee-tray";
		else imageSrc = "windows-xorkee-tray";
		
		flexcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2c-dom-flexcontainer').appendTo(appletContainer);
		
		elem = `
			<div style = "width:calc(100% - 500px);text-align:center;" >
				<div class = "xsg2c-flexcenter" ><img class = "xsg2cscaleimage" style = "right:10px;width:140px;height:56px;" src =  "${XSG2C_IMAGE_DIR}xorkeesignLogo.svg" /></div>
				<div class = "xsg2cboldtext" style = "font-size:16px;margin: 18px 0px;" ><b>xorkeesign India G2C</b> enables you to do digital signature registration and signing <br><i>without installing Java and token drivers.</i> </div>
				<div class = "xsg2csemiboldtext" style = "font-size:16px;word-break: break-all;"  >To proceed, enter the xorkee handle of <b title = "${signerName}" ><i>${xsg2cTrimStr(signerName,'30')}</i></b>.</div>
				<center style = "margin:40px 0px" >
					<div class = "xsg2c-dom-handlecontainer" id = "xsg2c-dom-handlecontainer" ></div>
					<div class = "xsg2c-dom-btnwrapper" id = "xsg2c-dom-btnwrapper" ></div>
				</center>
				<div class = "xsg2csemiboldtext" style = "font-size: 13px;text-align:center;" >xorkeesign is a digital signature enabling service which runs on the versatile xorkee infrastructure.
				<br>
				To learn about the features and benefits of xorkeesign, click <a target = "_blank" href = ${URL_XORKEESIGN_INFO}>here</a>.
				</div>
			</div>
			<div class = "xsg2c-flexcenter" style = "margin: 0px 20px;" ><div class = "xsg2c-dom-vertical-divider"></div></div>
			<div style = "width: 500px;color: #5b5b5b;" >
				<div style = "display:flex;margin: 15px 0;justify-content: space-between;" >
					<div style = "margin: 0 10px;" >
						<div class = "xsg2cboldtext" style = "font-weight:bold;font-size:14px;" >Not having a xorkee handle?</div>
						<div class = "xsg2csemiboldtext" style = "font-size: 13px;max-width: 500px;" ><a class = "xsg2clinktext" target="_blank" href="${xsg2cGetXorkeeLink('xorkee')}" >Download</a> and install the xorkee app and plug-in the DSC token of ${xsg2cTrimStr(signerName,'15')}.
						<br>
						<a class = "xsg2clinktext" target="_blank" href="${xsg2cGetXorkeeLink('youtube')}" >This</a> may help you get a xorkee handle.
						</div>
					</div>
					<div  >
						<img style = "width:240px;height:182px;" src =  "${XSG2C_IMAGE_DIR}windows-xorkee-handle.png" />
					</div>
				</div>
				<div style = "display:flex;margin: 15px 0;justify-content: space-between;" >
					<div  >
						<img style = "width:225px;height:166px;" src =  "${XSG2C_IMAGE_DIR}${imageSrc}.png" />
					</div>
					<div style = "display: flex;align-items: flex-end;margin: 0 10px;" >
						<div>
							<div class = "xsg2cboldtext" style = "font-weight:bold;font-size:14px;" >Forgot the xorkee handle?</div>
							<div class = "xsg2csemiboldtext" style = "font-size: 13px;max-width: 500px;" >Connect the DSC token of ${xsg2cTrimStr(signerName,'15')}. The xorkee handle will be visible when you click on the xorkee icon in the system tray.</div>
						</div>
					</div>
				</div>
			</div>
		`;
		flexcontainer["innerHTML"] = elem;
		
		xhCreate(document.getElementById('xsg2c-dom-handlecontainer'), 240, 10, function(ev,type, val) {
			if(type == "submit")
			{
				getxsg2chandle(cb);
			}
		});
		
		handlecontainer = document.getElementById('xsg2c-dom-handlecontainer');
		btnwrapper = document.getElementById('xsg2c-dom-btnwrapper');
		
		xsg2cCreateDomBtns(btnwrapper, ['Proceed','Cancel'], function(btnIndex){
			if(btnIndex == 0)
			{
				getxsg2chandle(cb);
			} 
			else if(btnIndex == 1)
			{
				if(cb) cb(false)
			}
		});
	},
	
	getHandlePopup: function(headerText, infoText, closeConfirmationText, cb){
		
		var promptText, buttonwrapper,contentwrapper;
		
		promptText = `
			<div class = "xsg2c-flexcenter" style = "font-size: 25px;margin: 8px 0px;color: #1883d7;" >${headerText}</div>
			<div class = "xsg2cboldtext" style = "font-size:17px;margin: 25px 0px;padding: 0px 5px;" >${infoText}</div>
			<center style = "margin:10px 0px" >
				<div class = "xsg2c-dom-handlecontainer" id = "xsg2c-dom-handlecontainer" ></div>
				<a class="xsg2clinktext" style = "color: #4e4e4e;" target="_blank" href="${xsg2cGetXorkeeLink('xorkeeDownloadPage')}">Don't have a xorkee handle?</a>
			</center>
		`;
		
		[buttonwrapper] = xsg2cCreatePopup(promptText);
		
		xsg2cCreateBtns(buttonwrapper, ["Proceed", "Close"],function(btnIndex){
			
			if(btnIndex == 0)
			{
				getxsg2chandle(cb, function(){
					xsg2cpopup.getHandlePopup(headerText, infoText, closeConfirmationText, cb);
				});
			} 
			else if(btnIndex == 1)
			{
				promptText = `<span style="font-size:18px;" >${closeConfirmationText}</span>`;
				[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
				contentwrapper.classList.add("singleLinePadding");
				xsg2cCreateBtns(buttonwrapper,["OK","Cancel"],function(btnIndex1){
					if(btnIndex1 == 0)
					{
						xsg2cpopup.removePopup();
						if(cb) cb(false);
					}
					else
					{
						xsg2cpopup.getHandlePopup(headerText, infoText, closeConfirmationText, cb);
					}
				});
			}
		});
		
		xhCreate(document.getElementById('xsg2c-dom-handlecontainer'), 240, 10, function(ev,type, val) {
			
			if(type == "submit")
			{
				getxsg2chandle(cb, function(){
					xsg2cpopup.getHandlePopup(headerText, infoText, closeConfirmationText, cb);
				});
			}
		});
	},
	
	getSignerHandle: function(headerText, infoText, closeConfirmationText, cb, saveHandle){
		
		var promptText, buttonwrapper,contentwrapper, handle;
		
		handle = window.localStorage.getItem("xshandle");
		
		promptText = `
			<div class = "xsg2c-flexcenter" style = "font-size: 25px;margin: 8px 0px;color: #1883d7;" >${headerText}</div>
			<div class = "xsg2cboldtext" style = "font-size:17px;margin: 25px 0px;padding: 0px 5px;" >${infoText}</div>
			
		`;
		
		if(saveHandle == true && handle != null)
		{
			promptText += `
				<center style = "margin:0px 0px;display:inline-flex;padding:10px;" >
					<div style = "display:flex;justify-content:center;align-items:center;border:solid 1px #e2e2e2;border-radius:5px;padding: 8px 12px;" >
						<span class = "xsg2cbannericon" style = "width:30px;height:30px;border-right: solid 1px #dddddd;" ><img src = "${XSG2C_IMAGE_DIR}xorkeelogo-blue.svg" /></span>
						<span style = "display:flex;font-size: 18px;padding-left: 10px;flex-direction: column;align-items: flex-start;width:90%;" >
							<span>${handle}@xorkee.com</span>
							<span style = "font-size: 12px;color: grey;" >Recently used handle<span>
						</span>
					</div>
				</center>
				<div style = "margin-bottom: 14px;" >
					<span class="xsg2clinktext" id = "xsg2c-dom-chanegHandle" style = "color: #4e4e4e;" target="_blank" >Use a different handle</span>
				</div>
			`;
		}
		else 
		{
			promptText += `
				<center style = "margin:10px 0px" >
					<div class = "xsg2c-dom-handlecontainer" id = "xsg2c-dom-handlecontainer" ></div>
					<a class="xsg2clinktext" style = "color: #4e4e4e;" target="_blank" href="${xsg2cGetXorkeeLink('xorkeeDownloadPage')}">Don't have a xorkee handle?</a>
				</center>
			`;
		}
		
		[buttonwrapper] = xsg2cCreatePopup(promptText);
		
		xsg2cCreateBtns(buttonwrapper, ["Proceed", "Close"],function(btnIndex){
			
			if(btnIndex == 0)
			{
				if(saveHandle == true && handle != null)
				{
					cb(true, handle+"@xorkee.com");
				}
				else
				{
					getxsg2chandle(cb, function(){
						xsg2cpopup.getSignerHandle(headerText, infoText, closeConfirmationText, cb, saveHandle);
					});
				}
			} 
			else if(btnIndex == 1)
			{
				promptText = `<span style="font-size:18px;" >${closeConfirmationText}</span>`;
				[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
				contentwrapper.classList.add("singleLinePadding");
				xsg2cCreateBtns(buttonwrapper,["OK","Cancel"],function(btnIndex1){
					if(btnIndex1 == 0)
					{
						xsg2cpopup.removePopup();
						if(cb) cb(false);
					}
					else
					{
						xsg2cpopup.getSignerHandle(headerText, infoText, closeConfirmationText, cb, saveHandle);
					}
				});
			}
		});
		
		if(saveHandle == true && handle != null)
		{
			if(document.getElementById("xsg2c-dom-chanegHandle"))
			{
				document.getElementById("xsg2c-dom-chanegHandle").onclick = function(){
					
					window.localStorage.removeItem("xshandle");
					xsg2cpopup.getSignerHandle(headerText, infoText, closeConfirmationText, cb, false);
				}
			}
		}
		else
		{
			xhCreate(document.getElementById('xsg2c-dom-handlecontainer'), 240, 10, function(ev,type, val) {
				
				if(type == "submit")
				{
					getxsg2chandle(cb, function(){
						xsg2cpopup.getSignerHandle(headerText, infoText, closeConfirmationText, cb, saveHandle);
					});
				}
			});
		}
	},
	
	signerHandle: function() {
		
		return new Promise((resolve, reject) => {
			
			xsg2cpopup.getHandlePrompt(...arguments, (flag, handle, saveHandle) => {
				
				if(flag) resolve([flag, handle, saveHandle]);
				else reject();
			});
		});
	},
	
	getHandlePrompt: function(headerText, infoText, closeConfirmationText, cb){
		
		var promptText, buttonwrapper,contentwrapper, handle;
		
		handle = window.localStorage.getItem("xshandle");
		
		promptText = `
			<div class = "xsg2c-flexcenter" style = "font-size: 25px;margin: 8px 0px;color: #1883d7;" >${headerText}</div>
			<div class = "xsg2cboldtext" style = "font-size:17px;margin: 25px 0px;padding: 0px 5px;" >${infoText}</div>
			
		`;
		
		if(handle != null)
		{
			promptText += `
				<center style = "margin:0px 0px;display:inline-flex;padding:10px;" >
					<div style = "display:flex;justify-content:center;align-items:center;border:solid 1px #e2e2e2;border-radius:5px;padding: 8px 12px;" >
						<span class = "xsg2cbannericon" style = "width:30px;height:30px;border-right: solid 1px #dddddd;" ><img src = "${XSG2C_IMAGE_DIR}xorkeelogo-blue.svg" /></span>
						<span style = "display:flex;font-size: 18px;padding-left: 10px;flex-direction: column;align-items: flex-start;width:90%;" >
							<span>${handle}@xorkee.com</span>
							<span style = "font-size: 12px;color: grey;" >Recently used handle<span>
						</span>
					</div>
				</center>
				<div style = "margin-bottom: 14px;" >
					<span class="xsg2clinktext" id = "xsg2c-dom-chanegHandle" style = "color: #4e4e4e;" target="_blank" >Use a different handle</span>
				</div>
			`;
		}
		else 
		{
			promptText += `
				<center style = "margin:10px 0px" >
					<div class = "xsg2c-dom-handlecontainer" id = "xsg2c-dom-handlecontainer" ></div>
					<div style = "margin: 20px 0px;width: 350px;text-align: center;margin-top: 10px;" >
						<span><input id = "xs_saveHandle" type ="checkbox" /></span>
						<span id = "xs_saveHandle_txt" style = "cursor:pointer;" >Remember handle</span>
					</div>
					<a class="xsg2clinktext" style = "color: #4e4e4e;" target="_blank" href="${xsg2cGetXorkeeLink('xorkeeDownloadPage')}">Don't have a xorkee handle?</a>
				</center>
			`;
		}
		
		[buttonwrapper] = xsg2cCreatePopup(promptText);
		
		xsg2cCreateBtns(buttonwrapper, ["Proceed", "Close"],function(btnIndex){
			
			if(btnIndex == 0)
			{
				if(handle != null)
				{
					cb(true, handle+"@xorkee.com");
				}
				else
				{
					getxsg2chandle(cb, function(){
						xsg2cpopup.getHandlePrompt(headerText, infoText, closeConfirmationText, cb);
					});
				}
			} 
			else if(btnIndex == 1)
			{
				promptText = `<span style="font-size:18px;" >${closeConfirmationText}</span>`;
				[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
				contentwrapper.classList.add("singleLinePadding");
				xsg2cCreateBtns(buttonwrapper,["OK","Cancel"],function(btnIndex1){
					if(btnIndex1 == 0)
					{
						xsg2cpopup.removePopup();
						if(cb) cb(false);
					}
					else
					{
						xsg2cpopup.getHandlePrompt(headerText, infoText, closeConfirmationText, cb);
					}
				});
			}
		});
		
		if(handle != null)
		{
			if(document.getElementById("xsg2c-dom-chanegHandle"))
			{
				document.getElementById("xsg2c-dom-chanegHandle").onclick = function(){
					
					window.localStorage.removeItem("xshandle");
					xsg2cpopup.getHandlePrompt(headerText, infoText, closeConfirmationText, cb);
				}
			}
		}
		else
		{
			xhCreate(document.getElementById('xsg2c-dom-handlecontainer'), 240, 10, function(ev,type, val) {
				
				if(type == "submit")
				{
					getxsg2chandle(cb, function(){
						xsg2cpopup.getHandlePrompt(headerText, infoText, closeConfirmationText, cb);
					});
				}
			});
			
			if(document.getElementById("xs_saveHandle_txt"))
			{
				document.getElementById("xs_saveHandle_txt").onclick = function(){
					
					if(document.getElementById("xs_saveHandle").checked === false) document.getElementById("xs_saveHandle").checked = true;
					else document.getElementById("xs_saveHandle").checked = false;
				}
			}
		}
	},
	
	_getHandlePopup: function(headerText, infoText, closeConfirmationText, cb){
		
		var elem, imageSrc, osname, contentwrapper, buttonwrapper, otloverlay;
			
		osname = xsg2cgetOS();
		
		if(osname == "Mac OS") imageSrc = "mac-xorkee-tray";
		else imageSrc = "windows-xorkee-tray";
		
		elem = `
			<div style = "width:calc(100% - 500px);text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center;" >
				<div>
					<div class = "xsg2c-flexcenter" style = "font-size: 18px;font-weight: bold;" >${headerText}</div>
					<div class = "xsg2cboldtext" style = "font-size:16px;margin: 18px 0px;" >${infoText}</div>
					<div class = "xsg2csemiboldtext" style = "font-size:16px;word-break: break-all;"  >To proceed, enter the xorkee handle of the signatory.</div>
					<center style = "margin:40px 0px" >
						<div class = "xsg2c-dom-handlecontainer" id = "xsg2c-dom-handlecontainer" ></div>
						<div class = "xsg2c-dom-btnwrapper" style = "margin-top:40px;" id = "xsg2c-dom-btnwrapper" ></div>
					</center>
				</div>
			</div>
			<div class = "xsg2c-flexcenter" style = "margin: 0px 20px;" ><div class = "xsg2c-dom-vertical-divider"></div></div>
			<div style = "width: 500px;color: #5b5b5b;" >
				<div style = "display:flex;margin: 15px 0;justify-content: space-between;" >
					<div style = "margin: 0 10px;" >
						<div class = "xsg2cboldtext" style = "font-weight:bold;font-size:14px;" >Not having a xorkee handle?</div>
						<div class = "xsg2csemiboldtext" style = "font-size: 13px;max-width: 500px;" ><a class = "xsg2clinktext" target="_blank" href="${xsg2cGetXorkeeLink('xorkee')}" >Download</a> and install the xorkee app and plug-in the DSC token of the signatory.
						<br>
						<a class = "xsg2clinktext" target="_blank" href="${xsg2cGetXorkeeLink('youtube')}" >This</a> may help you get a xorkee handle.
						</div>
					</div>
					<div  >
						<img style = "width:240px;height:182px;" src =  "${XSG2C_IMAGE_DIR}windows-xorkee-handle.png" />
					</div>
				</div>
				<div style = "display:flex;margin: 15px 0;justify-content: space-between;" >
					<div  >
						<img style = "width:225px;height:166px;" src =  "${XSG2C_IMAGE_DIR}${imageSrc}.png" />
					</div>
					<div style = "display: flex;align-items: flex-end;margin: 0 10px;" >
						<div>
							<div class = "xsg2cboldtext" style = "font-weight:bold;font-size:14px;" >Forgot the xorkee handle?</div>
							<div class = "xsg2csemiboldtext" style = "font-size: 13px;max-width: 500px;" >Connect the DSC token of the signatory. The xorkee handle will be visible when you click on the xorkee icon in the system tray.</div>
						</div>
					</div>
				</div>
			</div>
		`;
		
		xsg2cCreateStdPopup(elem);
			
		xsg2cCreateBtns(document.getElementById("xsg2c-dom-btnwrapper"),["Proceed", "Close"],function(btnIndex){
			
			if(btnIndex == 0)
			{
				getxsg2chandle(cb);
			} 
			else if(btnIndex == 1)
			{
				promptText = `<span style="font-size:18px;" >${closeConfirmationText}</span>`;
				[buttonwrapper,contentwrapper] = xsg2cCreatePopup(promptText);
				contentwrapper.classList.add("singleLinePadding");
				xsg2cCreateBtns(buttonwrapper,["OK","Cancel"],function(btnIndex1){
					xsg2cpopup.removePopup();
					if(btnIndex1 == 0)
					{
						if(cb) cb(false)
					}
				});
			}
		});
		
		xhCreate(document.getElementById('xsg2c-dom-handlecontainer'), 240, 10, function(ev,type, val) {
			
			if(type == "submit")
			{
				getxsg2chandle(cb);
			}
		});
		
	},
	
	createButton: function(container, text){
		
		var buttonwrapper, btn;
		
		buttonwrapper = xsg2cCreateElement('div').setAttribute('class','xsg2cbuttonwrapper').style("display:flex;width:100%;height:100%;justify-content:center;align-items:center;").appendTo(container);
		
		btn = xsg2cCreateElement('div').setAttribute('class','xsg2cbutton').style('width:auto;').appendTo(buttonwrapper);
		xsg2cCreateElement('span').setAttribute('class','xsg2cbuttontext').addContent('innerHTML',text).appendTo(btn);
		
		return btn;
	},
	
	listSigners: function(signers, cb){
		
		var buttonwrapper,changecertcontainer,changecertheader,contentwrapper,i,certcontainer,k,otlcertwrapperList ,selectedIndex ,errorcontainer,errorinterval,certheadertext;
		
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup('');
		
		changecertheader = xsg2cCreateElement('div').style('width:100%;margin:10px 0;').appendTo(contentwrapper);
		changecertcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccustomscrollbar').style('width:100%;margin:10px 0;max-height: 300px;overflow: hidden;overflow-y: auto;').appendTo(contentwrapper);
		
		for(i = 0;i < signers.length;i++)
		{
			// Only active certificates will be listed.
				
			certcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapper').appendTo(changecertcontainer);
			
			xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperleft').addContent('innerHTML','<label class="xsg2cradiocontainer"><input type="radio" id = "xsg2cradio_'+i+'" name = "xsg2cradio" ><span class="xsg2cradiomark"></span></label>').appendTo(certcontainer);
			xsg2ccertwrapperright = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperright').appendTo(certcontainer);
			
			xsg2cCreateElement('span').style('font-size: 16px;font-weight:bold;').setAttribute('class','xsg2cwraptext').addContent('innerHTML',signers[i].signatoryName).appendTo(xsg2ccertwrapperright);
			xsg2cCreateElement('span').style('font-size: 16px;').setAttribute('class','xsg2cwraptext').addContent('innerHTML',signers[i].designation).appendTo(xsg2ccertwrapperright);
			
			if(signers[i].hasOwnProperty('handle'))
			{
				xsg2cCreateElement('span').style('color:grey;font-style: italic;').setAttribute('class','xsg2cwraptext').addContent('innerHTML',signers[i].handle).appendTo(xsg2ccertwrapperright);
			}
			
			if(signers[i].hasOwnProperty('isEnrolled') && signers[i].isEnrolled == true)
			{
				xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperrightmost').addContent('innerHTML','<img class = "xsg2cscaleimage" style = "right:10px;" src =  "'+XSG2C_IMAGE_DIR+'xorkeesignLogo.svg" />').appendTo(certcontainer);
			}
			
			certcontainer.onclick = function(index,selectcertobj){
				return function(){
					if(document.getElementById('xsg2cradio_'+index))
					{
						var radioBtn = document.getElementById('xsg2cradio_'+index);
						radioBtn.click();
					}
					otlcertwrapperList = document.getElementsByClassName('xsg2cselectedcertwrapper');
					for(k = 0 ;k < otlcertwrapperList.length;k++)
						otlcertwrapperList[k].classList.remove("xsg2cselectedcertwrapper");
					this.classList.add("xsg2cselectedcertwrapper");
					
					selectedIndex = index;
					
				}
			}(i,signers[i]);
		}
		
		certheadertext = "";
		
		certheadertext = 'Choose an authorized signatory for approving the activity:';
		
		xsg2cCreateElement('div').setAttribute('class','xsg2cboldtext').addContent('innerHTML',certheadertext).appendTo(changecertheader);

		
		xsg2cCreateBtns(buttonwrapper,["Continue", "Cancel"],function(index){
			if(index == 0)
			{
				if(selectedIndex == undefined)
				{
					// Signer has not been selected. Error prompt has been displayed.
					clearInterval(errorinterval);
					xsg2cRemoveElem(['xsg2cerrorcontainer']);
					errorcontainer = xsg2cCreateElement('div').setAttribute('id','xsg2cerrorcontainer').setAttribute('class','xsg2cerrorcontainer').appendTo(contentwrapper);
					xsg2cCreateElement('div').addContent('innerHTML','<img src =  "'+XSG2C_IMAGE_DIR+'warning.svg" />').appendTo(errorcontainer);
					xsg2cCreateElement('div').style('margin: 0 18px;').addContent('innerHTML','Choose any one signatory to continue').appendTo(errorcontainer);
					
					errorinterval = setTimeout(function(){
						xsg2cRemoveElem(['xsg2cerrorcontainer']);
					},5000);
				}
				else
				{
					xsg2cpopup.removePopup();
					cb(selectedIndex);
				}
			}
			else
			{
				xsg2cpopup.removePopup();
				if(cb) cb(undefined);
			}
		});
	},
	
	listAllSigners: function(service, certheadertext, certheadertext1, signers, cb){
		
		var buttonwrapper,changecertcontainer,changecertheader,contentwrapper,i,certcontainer,k,otlcertwrapperList ,selectedIndex ,errorcontainer,errorinterval, promptText;
		
		
		[buttonwrapper,contentwrapper,otloverlay] = xsg2cCreatePopup('');
		
		changecertheader = xsg2cCreateElement('div').style('width:100%;margin-bottom:16px;').appendTo(contentwrapper);
		changecertcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccustomscrollbar').style('width:100%;margin:0px 0;max-height: 220px;overflow: hidden;overflow-y: auto;display: flex;flex-direction: column;align-items: center;').appendTo(contentwrapper);
		
		for(i = 0;i < signers.length;i++)
		{
			// Only active certificates will be listed.
				
			certcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapper').style("width: 92%;padding: 10px 0px;").appendTo(changecertcontainer);
			
			xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperleft').addContent('innerHTML','<label class="xsg2cradiocontainer"><input type="radio" id = "xsg2cradio_'+i+'" name = "xsg2cradio" ><span class="xsg2cradiomark"></span></label>').appendTo(certcontainer);
			xsg2ccertwrapperright = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperright').appendTo(certcontainer);
			
			if(signers[i].hasOwnProperty('handle'))
			{
				xsg2cCreateElement('span').setAttribute('class','xsg2cwraptext').setAttribute('title',signers[i].handle).style('font-size: 16px;').addContent('innerHTML',signers[i].handle).appendTo(xsg2ccertwrapperright);
			}
			
			if(signers[i].info)
			{
				if(signers[i].info.status && signers[i].info.status !== "active")
				{
					xsg2cCreateElement('span').style('font-size: 14px;color:red;margin-top:2px;').setAttribute('class','xsg2cwraptext').addContent('innerHTML',"DSC "+signers[i].info.status).appendTo(xsg2ccertwrapperright);
					
					document.getElementById("xsg2cradio_"+i).disabled = true;
					
					certcontainer.classList.remove("xsg2ccertwrapper");
					certcontainer.classList.add("xsg2ccertwrapperDisabled");
				}
				
				if(signers[i].info.subjectCommonName)
				{
					xsg2cCreateElement('span').style('font-size: 14px;').setAttribute('class','xsg2cwraptext').setAttribute('title',signers[i].info.subjectCommonName).addContent('innerHTML',signers[i].info.subjectCommonName).appendTo(xsg2ccertwrapperright);
				}
				
				if(signers[i].info.validTill)
				{
					xsg2cCreateElement('span').style('font-size: 14px;color:grey;').setAttribute('class','xsg2cwraptext').addContent('innerHTML',"DSC valid till "+signers[i].info.validTill).appendTo(xsg2ccertwrapperright);
				}
			}
			
			if(signers[i].isEnrolled === true)
			{
				xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperrightmost').addContent('innerHTML','<img class = "xsg2cscaleimage" style = "right:10px;" src =  "'+XSG2C_IMAGE_DIR+'xorkeesignLogo.svg" />').appendTo(certcontainer);
			}
			
			certcontainer.onclick = function(index,selectcertobj){
				return function(){
					if(document.getElementById('xsg2cradio_'+index))
					{
						var radioBtn = document.getElementById('xsg2cradio_'+index);
						if(radioBtn.disabled === true)
						{
							return;
						}
						radioBtn.click();
					}
					otlcertwrapperList = document.getElementsByClassName('xsg2cselectedcertwrapper');
					for(k = 0 ;k < otlcertwrapperList.length;k++)
						otlcertwrapperList[k].classList.remove("xsg2cselectedcertwrapper");
					this.classList.add("xsg2cselectedcertwrapper");
					
					selectedIndex = index;
					
				}
			}(i,signers[i]);
		}
		
		promptText = `
			<div class = "xsg2c-flexcenter" style = "font-size: 25px;margin: 0px 0px;color: #1883d7;" >${certheadertext}</div>
			<div class = "xsg2cboldtext" style = "font-size:17px;margin: 10px 0px;padding: 0px 5px;" >${certheadertext1}</div>
			
		`
		
		xsg2cCreateElement('div').setAttribute('class','xsg2cboldtext').addContent('innerHTML',promptText).appendTo(changecertheader);
		
		certNotListed = xsg2cCreateElement('div').style('width: 75%;margin: 10px auto;font-size: 14px;color: grey;').addContent('innerHTML',"If you have another DSC for the same IEC and want to use that <a class = 'xsg2clinktext' >click here</a>").appendTo(contentwrapper);
		
		certNotListed = certNotListed.getElementsByTagName('a')[0];

		certNotListed.onclick = function(){
			if(cb) cb(-1);
		}
		
		xsg2cCreateBtns(buttonwrapper,["Continue", "Cancel"],function(index){
			if(index == 0)
			{
				if(selectedIndex == undefined)
				{
					// Signer has not been selected. Error prompt has been displayed.
					clearInterval(errorinterval);
					xsg2cRemoveElem(['xsg2cerrorcontainer']);
					errorcontainer = xsg2cCreateElement('div').setAttribute('id','xsg2cerrorcontainer').setAttribute('class','xsg2cerrorcontainer').appendTo(contentwrapper);
					xsg2cCreateElement('div').addContent('innerHTML','<img src =  "'+XSG2C_IMAGE_DIR+'warning.svg" />').appendTo(errorcontainer);
					xsg2cCreateElement('div').style('margin: 0 18px;').addContent('innerHTML','Choose any one signatory to continue').appendTo(errorcontainer);
					
					errorinterval = setTimeout(function(){
						xsg2cRemoveElem(['xsg2cerrorcontainer']);
					},5000);
				}
				else
				{
					xsg2cpopup.removePopup();
					cb(selectedIndex);
				}
			}
			else
			{
				xsg2cpopup.removePopup();
				if(cb) cb(undefined);
			}
		});
		
		// otloverlay.style.cssText +="max-width:600px;";
	},
	
	showSigner: function(service, xsInfo, headerText, infoText, cb){
		
		var promptText, buttonwrapper,contentwrapper;
		
		promptText = `
			<div class = "xsg2c-flexcenter" style = "font-size: 25px;margin: 8px 0px;color: #1883d7;" >${headerText}</div>
			<div class = "xsg2cboldtext" style = "font-size:17px;margin: 25px 0px;padding: 0px 5px;" >${infoText}</div>
			
		`;
		
		promptText += `
			<center style = "margin:0px 0px;display:inline-flex;padding:10px;width: 100%;display: flex;justify-content: center;" >
				<div style = "display:flex;justify-content:center;align-items:center;border:solid 1px #e2e2e2;border-radius:5px;padding: 8px 12px;width: 85%;" >
					<span class = "xsg2cbannericon" style = "width:30px;height:30px;border-right: solid 1px #dddddd;" ><img src = "${XSG2C_IMAGE_DIR}xorkeelogo-blue.svg" /></span>
					<span style = "display:flex;font-size: 18px;padding-left: 10px;flex-direction: column;align-items: flex-start;width:90%;text-align: left;" >
						<span >${xsInfo.handle}</span>
						<span style = "font-size: 16px;color: grey;" >${xsInfo.info.subjectCommonName}</span>
						<span style = "font-size: 12px;color: grey;" >DSC valid till ${xsInfo.info.validTill}</span>
					</span>
				</div>
			</center>
			<div style = "margin-bottom: 14px;" >
				<span style = "display:inline-block;color: #4e4e4e;width:75%;margin:0 auto;margin-top:10px;" target="_blank" >If you have another DSC for the same IEC and want to use that <a class = 'xsg2clinktext' id = "xsg2c-dom-notMyHandle" >click here</a></span>
			</div>
		`;
		
		[buttonwrapper, contentwrapper, otloverlay] = xsg2cCreatePopup(promptText);
		
		xsg2cCreateBtns(buttonwrapper, ["Confirm", "Close"],function(btnIndex){
			
			if(btnIndex == 0)
			{
				if(cb) cb(true);
 			} 
			else if(btnIndex == 1)
			{
				xsg2cpopup.removePopup();
				if(cb) cb(false);
			}
		});
		
		if(document.getElementById("xsg2c-dom-notMyHandle"))
		{
			document.getElementById("xsg2c-dom-notMyHandle").onclick = function(){
				
				if(cb) cb(-1);
			}
		}
		
		// otloverlay.style.cssText +="width:600px;max-width:600px;";
	},
	
	digestMismatch: function(cb){
		var buttonwrapper, contentwrapper, msg, btnArr = ["OK"];
		
		msg = `
			<div class = 'xsg2cboldtext' style = "font-weight:bold" >
				Security alert
			</div>
			<div class = "xsg2csemiboldtext" style = "margin-top: 20px;font-size: 14px;" >
				Suspected data tampering in the channel. Signature aborted.<br>
				We suggest you use a different computer/network.
			</div>
			`;
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg, XSG2C_ALERT_COLOR);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				if(cb) cb(true);
			}
			else if(cb) cb(false);
		});
	},
	
	dataTampered: function(cb){
		var buttonwrapper, contentwrapper, msg, btnArr = ["OK"];
		
		msg = `
		<div class = 'xsg2cboldtext' style = "font-weight:bold" >
			Security alert
		</div>
		<div class = "xsg2csemiboldtext" style = "margin-top: 20px;font-size: 14px;" >
			Suspected data tampering in the signer's computer/channel. Signature aborted.<br>
			We suggest you use a different computer/network.
		</div>
		`;
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg, XSG2C_ALERT_COLOR);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				if(cb) cb(true);
			}
			else if(cb) cb(false);
		});
	},

	showXsMsg: function(service, msg){
		
		xsg2cpopup.showError(`<div class = 'xsg2c-preline' >${msg}</div>`);
	},
	
	showPortalMsg: function(msg, cb){
		
		[buttonwrapper] = xsg2cCreatePortalPopup(msg);
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper, ["OK"], function(btnIndex){
			
			xsg2cpopup.removePopup();
			if(cb) cb();
		});
	},
	
	retryDecryption: function(params, cb){
		
		const {result, handle, registerEnc} = params;
		
		var promptText,buttonwrapper,contentwrapper, str;
		
		str = (registerEnc == true)?"encryption":"decryption";
		
		//<div class = "xsg2c-dom-lineSpace" >If your decryption DSC is not in a token click the 'Search' button</div>
		
		if(result == XS_ERRCODE.ENC_DSC_NOT_IN_TOKEN)
		{
			promptText = `
				<div style = "font-size: 16px;text-align:justify;padding:0px 15px;" >
					<div class = "xsg2c-dom-lineSpace" style = "text-align: center;font-weight: bold;padding: 10px 0 20px;" >DSC used for ${str} unavailable</div>
					<div class = "xsg2c-dom-lineSpace" >If the ${str} DSC is in a different token, connect it to the system where the signature DSC is connected and then click 'Retry'</div>
				</div>
			`;
		}
		else if(result == XS_ERRCODE.ENC_DSC_NOT_IN_PC)
		{
			promptText = `
				<div style = "font-size: 16px;text-align:justify;padding:0px 15px;" >
					<div class = "xsg2c-dom-lineSpace" style = "text-align: center;font-weight: bold;padding: 10px 0 20px;" >DSC used for ${str} unavailable</div>
					<div class = "xsg2c-dom-lineSpace" >The DSC is not found in any of the tokens in the system where the DSC for ${handle} is connected. If the DSC is in a different token connect and click 'Retry'</div>
				</div>
			`;
		}
		
		[buttonwrapper] = xsg2cCreatePopup(promptText, XSG2C_WARNING_COLOR);
		xsg2cCreateBtns(buttonwrapper,["Retry", "Close"],function(btnIndex){
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				if(cb) cb(true);
			}
			else if(btnIndex == 1)
			{
				if(cb) cb(false);
			}
		});
	},
	
	auctionDecimalValueInWords: function(num, cb){
		var buttonwrapper, contentwrapper, msg, btnArr = ["Yes", "No"], i, value, decimal;
		
		const numbers = ["Zero ", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine "];
	  
		value = num.slice(0, num.lastIndexOf("."));
		decimal = num.slice(num.lastIndexOf(".")+1);
		
		value = 'Rupees'+XSCUTILS.numberToWords(value);
		
		if(parseInt(decimal) !== 0) {
			
			value += " point ";
			for(i=0; i<decimal.length; i++) {
				value+= numbers[parseInt(decimal[i])];
			}
		}
		
		value += "Only";
		
		msg = ` 
		<div class = "xsg2csemiboldtext" style = "margin-top: 10px;font-size: 18px;" >
			${value}
		</div>
		`;
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				if(cb) cb(true);
			}
			else if(cb) cb(false);
		});
	},
	
	auctionValueInWords: function(num, cb){
		var buttonwrapper, contentwrapper, msg, btnArr = ["Yes", "No"];
		
		msg = ` 
		<div class = "xsg2csemiboldtext" style = "margin-top: 10px;font-size: 18px;" >
			${XSCUTILS.inWords(num)}
		</div>
		`;
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			xsg2cpopup.removePopup();
			if(btnIndex == 0)
			{
				if(cb) cb(true);
			}
			else if(cb) cb(false);
		});
	},
	
	onInstallInfo: function(cb){
		var buttonwrapper, contentwrapper, msg, btnArr = ["OK"];
		
		msg = `
		<div class = "xsg2csemiboldtext" style = "margin-top: 10px;font-size: 18px;padding:7px;" >
			We suggest you close this browser window and then try again from a new browser window to perform signing.
		</div>
		`;
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			xsg2cpopup.removePopup();
		});
	},
	
	fileUnsupported: function(service, filename, handle, cb){
		
		var buttonwrapper, contentwrapper, msg, btnArr = [];
		
		msg = `
				<div style = "font-size: 16px;text-align:justify;padding:0px 15px;" >
					<div class = "xsg2c-dom-lineSpace" style = "text-align: center;font-weight: bold;padding: 10px 0 20px;" >${filename}</div>
					<div class = "xsg2c-dom-lineSpace" >Invalid or unsupported PDF file.</div>
					<div class = "xsg2c-dom-lineSpace" >Please try to open the file in a PDF reader.<br>If you cannot open the file, contact the person who created the file. Else kindly sign the file by uploading it through the ${xsg2cGetXorkeesignLink(service, handle)} web interface.</div>
				</div>
			`;
		
		
		btnArr = ["OK"];
		
		[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg, XSG2C_WARNING_COLOR);
		contentwrapper.classList.add("singleLinePadding");
		buttonwrapper.style.cursor = "pointer";
		xsg2cCreateBtns(buttonwrapper,btnArr,function(btnIndex){
			xsg2cpopup.removePopup();
			if(cb) cb(false);
		});
	},
	
	listHandles: function(service, certheadertext, certheadertext1, signers, cb){
		
		var buttonwrapper,changecertcontainer,changecertheader,contentwrapper,i,certcontainer,k,otlcertwrapperList ,selectedIndex ,errorcontainer,errorinterval, promptText;
		
		
		[buttonwrapper,contentwrapper,otloverlay] = xsg2cCreatePopup('');
		
		changecertheader = xsg2cCreateElement('div').style('width:100%;margin-bottom:16px;').appendTo(contentwrapper);
		changecertcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccustomscrollbar').style('width:100%;margin:0px 0;max-height: 220px;overflow: hidden;overflow-y: auto;display: flex;flex-direction: column;align-items: center;').appendTo(contentwrapper);
		
		for(i = 0;i < signers.length;i++)
		{
			certcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapper').style("width: 92%;padding: 10px 0px;").appendTo(changecertcontainer);
			
			xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperleft').addContent('innerHTML','<label class="xsg2cradiocontainer"><input type="radio" id = "xsg2cradio_'+i+'" name = "xsg2cradio" ><span class="xsg2cradiomark"></span></label>').appendTo(certcontainer);
			xsg2ccertwrapperright = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperright').appendTo(certcontainer);
			
			xsg2cCreateElement('span').setAttribute('class','xsg2cwraptext').setAttribute('title',signers[i]).style('font-size: 16px;').addContent('innerHTML',signers[i]).appendTo(xsg2ccertwrapperright);
			
			certcontainer.onclick = function(index,selectcertobj){
				return function(){
					if(document.getElementById('xsg2cradio_'+index))
					{
						var radioBtn = document.getElementById('xsg2cradio_'+index);
						if(radioBtn.disabled === true)
						{
							return;
						}
						radioBtn.click();
					}
					otlcertwrapperList = document.getElementsByClassName('xsg2cselectedcertwrapper');
					for(k = 0 ;k < otlcertwrapperList.length;k++)
						otlcertwrapperList[k].classList.remove("xsg2cselectedcertwrapper");
					this.classList.add("xsg2cselectedcertwrapper");
					
					selectedIndex = index;
					
				}
			}(i,signers[i]);
		}
		
		promptText = `
			<div class = "xsg2c-flexcenter" style = "font-size: 25px;margin: 0px 0px;color: #1883d7;" >${certheadertext}</div>
			<div class = "xsg2cboldtext" style = "font-size:17px;margin: 10px 0px;padding: 0px 25px;" >${certheadertext1}</div>
			
		`
		
		xsg2cCreateElement('div').setAttribute('class','xsg2cboldtext').addContent('innerHTML',promptText).appendTo(changecertheader);
		
		xsg2cCreateBtns(buttonwrapper,["Continue", "Cancel"],function(index){
			if(index == 0)
			{
				if(selectedIndex == undefined)
				{
					// Signer has not been selected. Error prompt has been displayed.
					clearInterval(errorinterval);
					xsg2cRemoveElem(['xsg2cerrorcontainer']);
					errorcontainer = xsg2cCreateElement('div').setAttribute('id','xsg2cerrorcontainer').setAttribute('class','xsg2cerrorcontainer').appendTo(contentwrapper);
					xsg2cCreateElement('div').addContent('innerHTML','<img src =  "'+XSG2C_IMAGE_DIR+'warning.svg" />').appendTo(errorcontainer);
					xsg2cCreateElement('div').style('margin: 0 18px;').addContent('innerHTML','Choose a handle to continue').appendTo(errorcontainer);
					
					errorinterval = setTimeout(function(){
						xsg2cRemoveElem(['xsg2cerrorcontainer']);
					},5000);
				}
				else
				{
					xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
					cb(selectedIndex);
				}
			}
			else
			{
				xsg2cpopup.removePopup();
				if(cb) cb(undefined);
			}
		});
	},

	listCertificates: function(service, certheadertext, certheadertext1, signers){
		
		return new Promise((resolve, reject) => {

			var buttonwrapper,changecertcontainer,changecertheader,contentwrapper,i,certcontainer,k,otlcertwrapperList ,selectedIndex ,errorcontainer,errorinterval, promptText;
			
			const convertTo12hrs = (t) => {
				return t % 12 || 12;
			};
			
			
			[buttonwrapper,contentwrapper,otloverlay] = xsg2cCreatePopup('');
			
			changecertheader = xsg2cCreateElement('div').style('width:100%;margin-bottom:16px;').appendTo(contentwrapper);
			changecertcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccustomscrollbar').style('width:100%;margin:0px 0;max-height: 220px;overflow: hidden;overflow-y: auto;display: flex;flex-direction: column;align-items: center;').appendTo(contentwrapper);
			
			for(i = 0;i < signers.length;i++)
			{
				certcontainer = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapper').style("width: 92%;padding: 10px 0px;").appendTo(changecertcontainer);
				
				xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperleft').addContent('innerHTML','<label class="xsg2cradiocontainer"><input type="radio" id = "xsg2cradio_'+i+'" name = "xsg2cradio" ><span class="xsg2cradiomark"></span></label>').appendTo(certcontainer);
				xsg2ccertwrapperright = xsg2cCreateElement('div').setAttribute('class','xsg2ccertwrapperright').appendTo(certcontainer);
				
				var d = new Date(signers[i].info.validTill*1000);
			
				var validTill = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${convertTo12hrs(d.getHours()).toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
				
				xsg2cCreateElement('span').style('font-size: 16px;font-weight:bold;').setAttribute('class','xsg2cwraptext').addContent('innerHTML',signers[i].info.subjectCN).appendTo(xsg2ccertwrapperright);
				xsg2cCreateElement('span').style('color:grey').setAttribute('class','xsg2cwraptext').addContent('innerHTML', validTill).appendTo(xsg2ccertwrapperright);
				xsg2cCreateElement('span').style('color:grey').setAttribute('class','xsg2cwraptext').addContent('innerHTML',signers[i].info.issuerCN).appendTo(xsg2ccertwrapperright);
				
				certcontainer.onclick = function(index,selectcertobj){
					return function(){
						if(document.getElementById('xsg2cradio_'+index))
						{
							var radioBtn = document.getElementById('xsg2cradio_'+index);
							if(radioBtn.disabled === true)
							{
								return;
							}
							radioBtn.click();
						}
						otlcertwrapperList = document.getElementsByClassName('xsg2cselectedcertwrapper');
						for(k = 0 ;k < otlcertwrapperList.length;k++)
							otlcertwrapperList[k].classList.remove("xsg2cselectedcertwrapper");
						this.classList.add("xsg2cselectedcertwrapper");
						
						selectedIndex = index;
						
					}
				}(i,signers[i]);
			}
			
			promptText = `
				<div class = "xsg2c-flexcenter" style = "font-size: 25px;margin: 0px 0px;color: #1883d7;" >${certheadertext}</div>
				<div class = "xsg2cboldtext" style = "font-size:17px;margin: 10px 0px;padding: 0px 25px;" >${certheadertext1}</div>
			`
			
			xsg2cCreateElement('div').setAttribute('class','xsg2cboldtext').addContent('innerHTML',promptText).appendTo(changecertheader);
			
			var infoWrapper = xsg2cCreateElement('div').setAttribute('class','xsg2cboldtext').style('display: flex;justify-content: center;align-items: center;margin-top: 18px;').addContent('innerHTML',"").appendTo(contentwrapper);
			
			var infoElem = document.createElement("div");
			infoElem.innerText = "Certificate not listed?";
			infoElem.style.cssText = "font-size: 18px;color: #3f3f3f;";
			infoWrapper.appendChild(infoElem);
			
			var refreshBtn = document.createElement("div");
			refreshBtn.innerText = "Refresh";
			refreshBtn.style.cssText = "color: blue;cursor: pointer;text-decoration: underline;margin-left: 10px;";
			infoWrapper.appendChild(refreshBtn);
			
			refreshBtn.onclick = () => {
				resolve([true]);
			};
			
			xsg2cCreateBtns(buttonwrapper,["Proceed", "Cancel"],function(index){
				if(index == 0)
				{
					if(selectedIndex == undefined)
					{
						// Signer has not been selected. Error prompt has been displayed.
						clearInterval(errorinterval);
						xsg2cRemoveElem(['xsg2cerrorcontainer']);
						errorcontainer = xsg2cCreateElement('div').setAttribute('id','xsg2cerrorcontainer').setAttribute('class','xsg2cerrorcontainer').appendTo(contentwrapper);
						xsg2cCreateElement('div').addContent('innerHTML','<img src =  "'+XSG2C_IMAGE_DIR+'warning.svg" />').appendTo(errorcontainer);
						xsg2cCreateElement('div').style('margin: 0 18px;').addContent('innerHTML','Choose an encryption certificate').appendTo(errorcontainer);
						
						errorinterval = setTimeout(function(){
							xsg2cRemoveElem(['xsg2cerrorcontainer']);
						},5000);
					}
					else
					{
						xsg2cpopup.showLoader("Checking the registration status in xorkee ...");
						resolve([false, selectedIndex]);
					}
				}
				else
				{
					xsg2cpopup.removePopup();
					reject(undefined);
				}
			});
		
		});
	},
};

function xsG2cToWord(num){
	
	var arr = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
	return arr[num];
}

function xsg2cShowInfo(type, msg, cb){
	var buttonwrapper,contentwrapper;
	
	[buttonwrapper,contentwrapper] = xsg2cCreatePopup(msg,(type == "success")?undefined:XSG2C_WARNING_COLOR);
	contentwrapper.classList.add("singleLinePadding");
	buttonwrapper.style.cursor = "pointer";
	xsg2cCreateBtns(buttonwrapper,["OK"],function(){
		xsg2cpopup.removePopup();
		if(cb) cb();
	});
}

function xsg2cCreatePopup(promptText,bannerBg, closeBtn, closeBtnCb){
	var overlayWrapper,otloverlay,bannericonwrapper,bannericon,buttonwrapper,contentwrapper, closeBtnWrapper;
	
	if(document.getElementById('xsg2cdullscreen') != undefined)
	{
		overlayWrapper = document.getElementById('xsg2coverlaywrapper');
		otloverlay = document.getElementById('xsg2coverlay');
		bannericonwrapper = document.getElementById('xsg2cbannericonwrapper');
		bannericon = document.getElementById('xsg2cbannericon');
		contentwrapper = document.getElementById('xsg2ccontentwrapper');
		buttonwrapper = document.getElementById('xsg2cbuttonwrapper');
		xsg2cRemoveElem(['xsg2ccloseBtn']);
		
		xsg2cResetStyles(otloverlay, "xsg2coverlay");
		xsg2cResetStyles(bannericonwrapper, "xsg2cbannericonwrapper");
		xsg2cResetStyles(bannericon, "xsg2cbannericon");
		xsg2cResetStyles(buttonwrapper, "xsg2cbuttonwrapper");
		xsg2cResetStyles(contentwrapper, "xsg2ccontentwrapper");
	}
	else
	{
		xsg2cpopup.removePopup();
		
		xsg2cCreateElement('div').setAttribute('id','xsg2cdullscreen').setAttribute('class','xsg2cdullscreen').appendTo(document.body);
		
		overlayWrapper = xsg2cCreateElement('div').setAttribute('id','xsg2coverlaywrapper').setAttribute('class','xsg2coverlaywrapper').appendTo(document.body);
		
		otloverlay = xsg2cCreateElement('div').setAttribute('class','xsg2coverlay').setAttribute('id','xsg2coverlay').appendTo(overlayWrapper);
		
		bannericonwrapper = xsg2cCreateElement('div').setAttribute('class','xsg2cbannericonwrapper').setAttribute('id','xsg2cbannericonwrapper').appendTo(otloverlay);
		
		bannericon = xsg2cCreateElement('div').setAttribute('class','xsg2cbannericon').setAttribute('id','xsg2cbannericon').addContent('innerHTML','<img src = "'+XSG2C_IMAGE_DIR+'xorkeelogo.svg" />').appendTo(bannericonwrapper);
		
		contentwrapper = xsg2cCreateElement('div').setAttribute('class','xsg2ccontentwrapper').setAttribute('id','xsg2ccontentwrapper').appendTo(otloverlay);
	
		buttonwrapper = xsg2cCreateElement('div').setAttribute('class','xsg2cbuttonwrapper').setAttribute('id','xsg2cbuttonwrapper').appendTo(otloverlay);
	
	}
	
	if(bannerBg!=undefined)
		bannericon.style.background = bannerBg; 
	else
		bannericon.style.background = 'linear-gradient(#5de7f9,#4b9ae5,#4067d9)'; 
	
	if(closeBtn)
	{
		closeBtnWrapper = xsg2cCreateElement('div').setAttribute('class','xsg2ccloseBtn').setAttribute('id','xsg2ccloseBtn').setAttribute('title','Click to close').addContent('innerHTML',`<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="grey"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`).appendTo(otloverlay);
		
		closeBtnWrapper.onclick = function(){
			if(closeBtnCb) closeBtnCb();
		}
	}
	
	contentwrapper.innerHTML = promptText;
	buttonwrapper.innerHTML = "";
	
	return [buttonwrapper,contentwrapper,otloverlay];
}

function xsg2cCreatePortalPopup(promptText){
	
	var overlayWrapper,otloverlay,bannericonwrapper,bannericon,buttonwrapper,contentwrapper, closeBtnWrapper;
	
	xsg2cpopup.removePopup();
		
	xsg2cCreateElement('div').setAttribute('id','xsg2cdullscreen').setAttribute('class','xsg2cdullscreen').appendTo(document.body);
		
	overlayWrapper = xsg2cCreateElement('div').setAttribute('id','xsg2coverlaywrapper').setAttribute('class','xsg2coverlaywrapper').appendTo(document.body);
	
	otloverlay = xsg2cCreateElement('div').setAttribute('class','xsg2coverlay').setAttribute('id','xsg2coverlay').appendTo(overlayWrapper);
	
	contentwrapper = xsg2cCreateElement('div').setAttribute('class','xsg2ccontentwrapper').style("padding: 30px 0;").setAttribute('id','xsg2ccontentwrapper').appendTo(otloverlay);

	buttonwrapper = xsg2cCreateElement('div').setAttribute('class','xsg2cbuttonwrapper').setAttribute('id','xsg2cbuttonwrapper').appendTo(otloverlay);
	
	contentwrapper.innerHTML = `
		<div style = "font-size: 22px;color: #426edb;" >Message from <i>${window.location.host}</i></div>
		<div style = "padding-top:30px" >${promptText}</div>
	`;
	
	buttonwrapper.innerHTML = "";
	
	return [buttonwrapper];
}

function xsg2cResetStyles(elem, className){
	
	elem.removeAttribute('style');
	elem.removeAttribute('class');
	elem.classList.add(className);
}

function xsg2cCreateStdPopup(promptText){
	
	var overlayWrapper,otloverlay,bannericonwrapper,bannericon,buttonwrapper,contentwrapper, closeBtnWrapper;
	
	xsg2cCreateElement('div').setAttribute('id','xsg2cStddullscreen').setAttribute('class','xsg2cdullscreen').style("z-index:4999;").appendTo(document.body);
	
	overlayWrapper = xsg2cCreateElement('div').setAttribute('id','xsg2cStdoverlaywrapper').style("z-index:5000;").setAttribute('class','xsg2coverlaywrapper').appendTo(document.body);
	
	otloverlay = xsg2cCreateElement('div').setAttribute('class','xsg2coverlay').appendTo(overlayWrapper);
	
	contentwrapper = xsg2cCreateElement('div').setAttribute('class','xsg2ccontentwrapper').addContent('innerHTML',promptText).appendTo(otloverlay);
	
	contentwrapper.style.display = "flex";
	otloverlay.style.cssText +="padding-top:20px;width: 1050px;min-width: auto;max-width: none;";
	
	return [contentwrapper, otloverlay];
}

function xsg2cCreateTopNotify(promptText,icon,btnText,cb){
	xsg2cpopup.removePopup();
	var overlayWrapper,otloverlay,bannericonwrapper,bannericon,buttonwrapper,contentwrapper,btn,closebtn;
	
	overlayWrapper = xsg2cCreateElement('div').setAttribute('id','xsg2cnotityoverlaywrapper').setAttribute('class','xsg2cnotityoverlaywrapper').appendTo(document.body);
	
	otloverlay = xsg2cCreateElement('div').setAttribute('class','xsg2cfadeInDown xsg2cnotityoverlay').appendTo(overlayWrapper);
	
	bannericonwrapper = xsg2cCreateElement('div').setAttribute('class','xsg2cnotifybannericonwrapper').appendTo(otloverlay);
	
	if(icon == undefined )
		icon = 'xorkeelogo-green.svg';
	
	bannericon = xsg2cCreateElement('div').setAttribute('class','xsg2cnotifybannericon').addContent('innerHTML','<img src = "'+XSG2C_IMAGE_DIR+icon+'" style = "height:21.46px;" />').appendTo(bannericonwrapper);
	
	// bannericon.style.background = 'linear-gradient(#5de7f9,#4b9ae5,#4067d9)'; 
	
	// promptText+="<br> asdasd asd a sda sd asd asdasd  a sd asd asasds <br> <br><br> asdasd asd a sda sd asd asdasd  a sd a";
	
	contentwrapper = xsg2cCreateElement('div').setAttribute('class','xsg2cnotitfycontentwrapper').addContent('innerHTML',promptText).appendTo(otloverlay);
	
	if(btnText!=undefined)
	{
		btn = xsg2cCreateElement('div').setAttribute('class','xsg2cnotifybutton').appendTo(otloverlay);
		xsg2cCreateElement('span').setAttribute('class','xsg2cnotifytext').addContent('innerHTML',btnText).appendTo(btn);
		
		btn.onclick = function(){
			return function(){
				if(cb) cb();
			}
		}();
	}
	
	closebtn = xsg2cCreateElement('div').setAttribute('class','xsg2cnotifyclosebtn').addContent('innerHTML','<span>x</span>').appendTo(otloverlay);
	
	closebtn.onclick = function(){
		xsg2cpopup.removePopup();
	}
	
	// otloverlay.onanimationend = function(){
		// this.style.animation = "blink-animation 1s infinite";
	// }
	
	/*setTimeout(function(){
		if(otloverlay!=undefined)
		{
			// Hide the notification after 5 seconds
			otloverlay.style.cssText += "animation:xsg2chide 2s linear;";
			otloverlay.onanimationend = function(){
				xsg2cRemoveElem(['xsg2cnotityoverlaywrapper']);
			}
		}
	},5000);*/
	
	
	otloverlay.style.marginTop = ( otloverlay.offsetHeight )+"px";
}

function xsg2cRemoveElem(arr){
	for(var x=0; x<arr.length; x++)
	{
		if(document.getElementById(arr[x]))	document.getElementById(arr[x]).parentElement.removeChild(document.getElementById(arr[x]));
	}
}

function xsg2cCreateBtns(buttonwrapper,btnArr,cb){
	var btn,i;
	for(i = 0 ; i < btnArr.length; i++)
	{
		btn = xsg2cCreateElement('div').setAttribute('class','xsg2cbutton').appendTo(buttonwrapper);
		xsg2cCreateElement('span').setAttribute('class','xsg2cbuttontext').addContent('innerHTML',btnArr[i]).appendTo(btn);
		
		if(i!=btnArr.length-1) btn.style.marginRight = 0;
		// if(i!=btnArr.length-1)
			// xsg2cCreateElement('div').setAttribute('class','xsg2cbuttondivider').appendTo(buttonwrapper);
		btn.onclick = function(index){
			return function(){
				if(cb) cb(index);
			}
		}(i);
	}
}

function xsg2cCreateNotifyBtns(buttonwrapper,btnArr,cb){
	var btn,i,closebtn;
	closebtn = xsg2cCreateElement('div').setAttribute('class','xsg2cnotifyclosebtn').appendTo(buttonwrapper);
	xsg2cCreateElement('span').setAttribute('class','xsg2cnotifytext').addContent('innerHTML','Not Now').appendTo(closebtn);
	closebtn.onclick = function(){xsg2cpopup.removePopup();};
	
	for(i = 0 ; i < btnArr.length; i++)
	{
		btn = xsg2cCreateElement('div').setAttribute('class','xsg2cnotifybutton').appendTo(buttonwrapper);
		xsg2cCreateElement('span').setAttribute('class','xsg2cnotifytext').addContent('innerHTML',btnArr[i]).appendTo(btn);
		
		btn.onclick = function(index){
			return function(){
				if(cb) cb(index);
			}
		}(i);
	}
	
}

function xsg2cCreateDomBtns(buttonwrapper,btnArr,cb){
	buttonwrapper["innerHTML"] = "";
	var btn,i,closebtn;
	
	for(i = 0 ; i < btnArr.length; i++)
	{
		btn = xsg2cCreateElement('div').setAttribute('class','xsg2c-dom-button').appendTo(buttonwrapper);
		xsg2cCreateElement('span').setAttribute('class','').addContent('innerHTML',btnArr[i]).appendTo(btn);
		
		btn.onclick = function(index){
			return function(){
				if(cb) cb(index);
			}
		}(i);
	}
	
}

function xsg2cCreateElement(type){
	var elem = document.createElement(type);
	this.setAttribute = function(attName,attValue) // For Setting an attribute
	{
		 elem.setAttribute(attName,attValue);
		return this; 
	}
	this.style = function(css){
		elem.style.cssText = css;
		return this;
	}
	this.addContent = function(key,value) // For displaying the text.
	{
		elem[key] = value;
		return this;
	}
	this.appendTo = function(parentElem) // For appending to the provided element
	{
		parentElem.appendChild(elem);
		return elem;
	}
	this.prependTo = function(parentElem) {		//arun/8Oct18 /to add the element as the parent's first child
		parentElem.insertBefore(elem, parentElem.firstChild);
		return elem;
	}
	return this;
}

function xsg2cGetXorkeeLink(type){
	var osname = xsg2cgetOS();
	var xorkeelink,youtubelink;
	
	var xorkeeDownloadPageLink = "https://www.odysseytec.com/downloads_india-g2c/";
	
	if(osname == "Windows")
	{
		xorkeelink = "https://www.odysseytec.com/Downloads/xorkeeInstaller.exe";
		youtubelink = "https://www.youtube.com/watch?v=vrXHmn0Rn7c";
	}
	else if(osname == "Mac OS")
	{
		xorkeelink = "https://www.odysseytec.com/Downloads/xorkeeInstaller.pkg";
		youtubelink = "https://www.youtube.com/watch?v=hsDrkTD-Ntk";
	}
	else
	{
		xorkeelink = "https://www.odysseytec.com/index.php/downloads_india-g2c/";
		youtubelink = "https://www.youtube.com/watch?v=vrXHmn0Rn7c";
	}
	
	if(type == "xorkee")
	{
		return xorkeelink;
	}
	else if(type == "xorkeeDownloadPage")
	{
		return xorkeeDownloadPageLink;
	}
	else
	{
		return youtubelink
	}
}

function xsg2cgetOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

function xsg2cTrimStr(str,len){
	var result = "";
	if(str.length > len)
	{
		result = str.substring(0, len);
		return result+"...";
	}
	else return str;
}

function getxsg2chandle(cb, errorCb){
	var handleRv, saveHandle = false;
	
	handleRv = xhGetValue(document.getElementById('xsg2c-dom-handlecontainer'));
	if(handleRv.status == true)
	{
		if(document.getElementById("xs_saveHandle") && document.getElementById("xs_saveHandle").checked === true)
		{
			saveHandle = true;
		}
		
		if(cb) cb(true, handleRv.value+"@xorkee.com", saveHandle);
	}
	else
	{
		if(handleRv.value.length == 0) xsg2cpopup.showError("Provide a xorkee handle.", errorCb);
		else xsg2cpopup.showError(handleRv.value+"@xorkee.com is not a valid xorkee handle.", errorCb);
	}
}

function xsg2cGetXorkeesignLink(service, handle)
{
	if(handle != undefined) 
	{
		return `<a target = "_blank" class = "xsg2clinktext" href = "https://xorkeesign.com/?service=${service}&type=login&handle=${handle}" >xorkeesign</a>`;
	}
	else 
	{
		return `<a target = "_blank" class = "xsg2clinktext" href = "https://xorkeesign.com" >xorkeesign</a>`;
	}
}

function xsg2cStoreHandle(handle)
{
	if(handle != undefined && handle != null && handle.length > 0)
	{
		handle = handle.toLowerCase();
		
		window.localStorage.setItem("xshandle", handle.substring(0, handle.lastIndexOf("@xorkee.com")));
	}
}