var listTab = [];
var listTabName=[];
var checkIsMobile = null;
var spinUrlRequest = "";
var spinUrlRequestData = "";
var postRequest = "";
var postRequestData = "";
var tabCaptcha = null;
var tabCount = null;
var isCaptchaImage = false;
var timeCheckCaptchaImage=new Date();
chrome.tabs.onRemoved.addListener(function (tabid, removed) {
    if (tabCaptcha != null) {
        if (tabid == tabCaptcha || (tabid+1) == tabCaptcha) {
            spinUrlRequest = "";
            spinUrlRequestData = "";
        }
    }
})

chrome.alarms.create({ periodInMinutes: 1 })
chrome.alarms.onAlarm.addListener(() => {
  console.log('log for debug')
});

async function loadUrl(url, func, error) {
	try {
		const resp = await fetch(url);
		const text = await resp.text();
		func(text || 'error', resp);
	} catch (err) {
		error(err);
	}
}

function postUrl(url,data,func,error){
	fetch(url, {
	method: 'POST',
	 mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers:{
		"Content-Type":'application/json'
	},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin,
		body: data
	}).then(function(resp){
		resp.text().then(function(text){func(text);}).catch(error);;
	}).catch(error);
}

function getAllInWindow(windowId,func){
	var tabs = chrome.tabs.query({ });
	tabs.then(function(data){
		func(data);
	})
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "OpenView") {
        request = request.obj;
        var spinView = request.Name;
        var url = spinView.substring(0, spinView.indexOf(";"));
        if (spinView.indexOf(";") == -1) {
            url = spinView;
            spinView = "";
        } else {
            spinView = spinView.substring(spinView.indexOf(";") + 1);
        }
		
		if (request.RemoveCaptcha) {
            RemoveTabCaptcha();
        }
		
        chrome.tabs.create({
            url: url,
            selected: true
        }, function (tab) {
            var dateExpired = new Date();
			var timeV = request.TM;
			if(timeV > 1000){
				timeV = 120;
			}
            dateExpired.setSeconds(dateExpired.getSeconds() + timeV);
			var winName="spineditorview_" + request.Id + "_" + (timeV * 1000) + "_" + spinView;
            listTab.push({ 'id': tab.id, 'exp': dateExpired,'name': winName});
			listTabName.push({id:tab.id,name:winName});
        });
		ClearTabNotView(5);
    } else if (request.type == "GetTabCount") {
		sendResponse({
			response: tabCount
		});
		getAllInWindow(null, function (tabs) {
			tabCount = tabs.length;
		});
    }  else if (request.type == "IsCaptchaImage") {
		if((new Date() - timeCheckCaptchaImage) > (60000*60)){
			isCaptchaImage=false;
		}
		sendResponse({
			response: isCaptchaImage
		});
    } else if (request.type == "SetCaptchaImage") {
		isCaptchaImage = true;
		timeCheckCaptchaImage = new Date();
    }else if (request.type == "SetWindowName") {
		request = request.obj;
		if(request.tabId){
			for (var k = 0; k < listTabName.length; k++) {
				var tab = listTabName[k];
				if(tab.id == request.tabId){
					tab.name=request.tabName;
				}
			}
		}else if(request.tabUrl){
			getAllInWindow(null, function (tabs) {
				for (var k = 0; k < tabs.length; k++) {
					var tab = tabs[k];
					if(tab.url == request.tabUrl){
						listTabName.push({id:tab.id,name:request.tabName,url:request.tabUrl});
					}
				}
			});
		}
    }else if (request.type == "GetWindowName") {
		request = request.obj;
		var wname='';
		for (var k = 0; k < listTabName.length; k++) {
			var tab = listTabName[k];
			if(tab.id == request.tabId){
				wname = tab.name;
			}
		}
		sendResponse({
			response: wname
		});
    } else if (request.type == "GetWindowId") {
		request = request.obj;
		var tabId=null;
		for (var k = 0; k < listTabName.length; k++) {
			var tab = listTabName[k];
			if(tab.url && tab.url == request.tabUrl){
				tabId=tab.id
			}
		}
		sendResponse({
			response: tabId
		});
    }else if (request.type == "OpenForum") {
        request = request.obj;
        chrome.tabs.create({
            url: request.ForumUrl,
            selected: true
        }, function (tab) {
			var winName="spineditorpost_unlogin_" + request.Id;
			listTabName.push({id:tab.id,name:winName});
        });
    } else if (request.type == "RequestLink") {
        var linkUrl = request.obj;
        var mobile = request.mobile;
        if (linkUrl.localeCompare(spinUrlRequest) == 0) {
            sendResponse({
                response: spinUrlRequestData
            });
            if (spinUrlRequestData == "-1") {
                spinUrlRequestData = "";
            }
            if (spinUrlRequestData != "") {
                spinUrlRequestData = "";
                spinUrlRequest = "";
            }
        } else {
            spinUrlRequest = linkUrl;
            try {
                if (mobile) {
                    checkIsMobile = mobile;
                } else {
                    checkIsMobile = null;
                }
				loadLinkUrl(linkUrl,request);
            } catch (ex) {
                spinUrlRequestData = "-3";
            }
        }
    } else if (request.type == "PostRequest") {
        var linkUrl = request.obj.url;
        var datajson = request.obj.data;
        if (linkUrl == postRequest) {
            if (postRequestData != "") {
                sendResponse({
                    response: postRequestData
                });
                postRequestData = "";
                postRequest = "";
            }
        } else {
            postRequest = linkUrl;
            try {
				postUrl(linkUrl,datajson,function(data){
					postRequestData = data;
					if(postRequestData==""){
						postRequestData = " ";
					}
				},function(error){
					postRequestData = "-2";
				})
            } catch (ex) {
                postRequestData = "-3";
            }
        }
    } else if (request.type == "CloseCaptcha") {
		if(request.obj==-1){
			if (tabCaptcha != null) {
				chrome.tabs.remove(tabCaptcha);
			}
		}else{
			chrome.tabs.remove(request.obj);
		}
    }else if (request.type == "ClearTabNotView") {
        ClearTabNotView(3);
    }else if (request.type == "OpenWindowTemp") {
        chrome.tabs.create({
			url: request.obj.url,
			selected: true
		}, function (tab) {
			setTimeout(function(){
				chrome.tabs.remove(tab.id);
			},request.obj.timeout);
		});
    }

});

function loadLinkUrl(linkUrl,request){
	loadUrl(linkUrl,function(data,resp){
    var isCaptcha=resp.url.startsWith('https://www.google.com/sorry/index');
    if(isCaptcha){
		spinUrlRequestData = "-1";
		var wname='';
		if (request.captcha) {
		  wname='spineditor-captcha-'+request.mid;
		} else {
		  wname='spineditor-noncaptcha';
		}
		setTimeout(function(){
			if (request.incognito) {
			  chrome.windows.create({ "url":resp.url, "incognito": false, "focused": true, "type": "popup" }, function (tab) {
				tabCaptcha = tab.id+1;
				chrome.scripting.executeScript(
				{
				  target: {tabId: tabCaptcha},
				  func: setTabName,
				  args: [wname]
				});
			  });
			} else {
			  chrome.tabs.create({
				url: resp.url,
				selected: true
			  }, function (tab) {
				tabCaptcha = tab.id;
				chrome.scripting.executeScript(
				{
				  target: {tabId: tabCaptcha},
				  func: setTabName,
				  args: [wname]
				});
			  });
			}
		},1000);
    }else{
		spinUrlRequestData = data;
    }
  },function(error){
      spinUrlRequestData = "-2";
  })
}


chrome.runtime.onInstalled.addListener(function () {
   /* chrome.webRequest.onBeforeSendHeaders.addListener(
        function (details) {
            //checkIsMobile = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
            if (checkIsMobile) {
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                        details.requestHeaders[i].value = checkIsMobile;
                        break;
                    }
                }
            }
            return { requestHeaders: details.requestHeaders };
        },
        { urls: ["<all_urls>"] },
        ["blocking", "requestHeaders"]);*/
});

function RemoveTabCaptcha() {
    getAllInWindow(null, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.startsWith("https://ipv4.google.com") || tabs[i].url.startsWith("https://ipv6.google.com") || tabs[i].url.startsWith("https://www.google.com/sorry/index")) {
                chrome.tabs.remove(tabs[i].id);
            }
        }
    });
}

function setTabName(name) {
	window.name = name;
}

function setTabId(tab) {
	document.body.tabindex = tab;
}

var timeSelect = 0;
setInterval(function () {
	getAllInWindow(null, function (tabs) {
		for (var i = 0; i < tabs.length; i++) {
			var tab = tabs[i];
			if(!tab.url.startsWith('chrome')){
				chrome.scripting.executeScript(
				{
				  target: {tabId: tab.id},
				  func: setTabId,
				  args: [tab.id]
				});
			}
		}
	});
	
    if (listTab.length > 0) {
        timeSelect++;
		getAllInWindow(null, function (tabs) {
			var listTabNew = [];
			  for (var k = 0; k < listTab.length; k++) {
				var tab = listTab[k];
				var remove = false;
				var tabExist = false;
				for (var i = 0; i < tabs.length; i++) {
					var tabId=tabs[i].id+'';
					if (tabId == tab.id) {
						tabExist = true;
						if (!tabs[i].url.startsWith("http://spineditor.com/cong-dong-view") && !tabs[i].url.startsWith("https://spineditor.com/cong-dong-view") && !tabs[i].url.startsWith("http://www.spineditor.com/cong-dong-view") && !tabs[i].url.startsWith("https://www.spineditor.com/cong-dong-view")) {
							if (tab.exp < new Date()) {
								chrome.tabs.remove(tabs[i].id);
								remove = true;
							}
						}
					}
				}
				if (!remove && tabExist) {
					listTabNew.push(tab);
				}
			}

			if (timeSelect >= 100) {
				for (var i = 0; i < tabs.length; i++) {
					if (tabs[i].url.startsWith("http://spineditor.com") || tabs[i].url.startsWith("https://spineditor.com") || tabs[i].url.startsWith("http://www.spineditor.com") || tabs[i].url.startsWith("https://www.spineditor.com")) {
						chrome.tabs.update(tabs[i].id, { active: true,autoDiscardable: false });
						timeSelect = 0;
						break;
					}
				}
			}
			listTab = listTabNew;
		});
    }
	if(listTabName.length>0){
		getAllInWindow(null, function (tabs) {
			var newsTabName=[];
			for (var i = 0; i < tabs.length; i++) {
				var tabWinId = tabs[i].id;
				for (var k = 0; k < listTabName.length; k++) {
					var tabName=listTabName[k];
					if(tabName.id==tabWinId){
						chrome.scripting.executeScript(
						{
						  target: {tabId: tabWinId},
						  func: setTabId,
						  args: [tabWinId]
						});
						newsTabName.push(tabName);
						break;
					}
				}
			}
			listTabName = newsTabName;
		});
	}
}, 1000);

function ClearTabNotView(mintab) {
    getAllInWindow(null, function (tabs) {
        if (tabs.length >= mintab) {
            for (var i = 0; i < tabs.length; i++) {
                if (!tabs[i].url.startsWith("https://spineditor.com/cong-dong-view") && !tabs[i].url.startsWith("http://spineditor.com/cong-dong-view") && !tabs[i].url.startsWith("http://www.spineditor.com/cong-dong-view") && !tabs[i].url.startsWith("https://www.spineditor.com/cong-dong-view")) {
                    var flag = false;
                    for (var k = 0; k < listTab.length; k++) {
						var tabId = tabs[i].id+'';
                        if (tabId == listTab[k].id) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                       chrome.tabs.remove(tabs[i].id);
                    }
                }
            }
        }
    });
}
