document.addEventListener('TestScheckPro', function (evt) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('TestScheckProSuccess', true, false, "");
    document.dispatchEvent(event);
});

document.addEventListener('RequestWindow', function (evt) {
    var pid = evt.detail.pid;
    var urlPost = window.location.protocol + '//spineditor.com/Code/Web/WebService.asmx/PostForum?pid=' + pid;
    RequestLinkUrl(urlPost, function (data) {
        var data = JSON.parse($(data).contents().text()).Content;
        data = JSON.parse(data);
        chrome.runtime.sendMessage({ type: "OpenForum", obj: data });
    }, function (data) {

    });
});

function validUrl(url,fuc){
	var urlLw = url.toLowerCase();
	if(urlLw.startsWith("http") && !urlLw.startsWith(window.location.origin)){
		fuc();
	}else{
		if(urlLw=="/download"){
			return;
		}
		var xhttp = new XMLHttpRequest();
		xhttp.open('HEAD', url);
		xhttp.onreadystatechange = function () {
			if (this.readyState == this.DONE) {
				var contentType = this.getResponseHeader("Content-Type");
				if(contentType && contentType.indexOf('text/html')!=-1){
					fuc();
				}
			}
		};
		xhttp.send();
	}
}

function RequestLinkUrl(linkUrl, callback, errorCallback) {
    try {
        var x = new XMLHttpRequest();
        x.open('GET', linkUrl);
        x.responseType = 'text';
        x.onload = function () {
            var response = x.response;
            if (x.status == 200) {
                callback(response);
            } else {
                errorCallback(response);
            }
        };
        x.onerror = function () {
            errorCallback('Network error.');
        };
        x.send();
    } catch (ex) {
        errorCallback('Network error.');
    }
}

chrome.runtime.sendMessage({ type: "ChangeDevice", obj: "" });
document.addEventListener('ChangeDevice', function (evt) {
    var data = evt.detail;
    chrome.runtime.sendMessage({ type: "ChangeDevice", obj: data });
});

var winName;
var docHeight = 1000;
var timeView = 10000;
var timeViewTotal = 10000;
var spinView = "";
var idView = "";


var sid = setInterval(function () {
	try{
    if (window.location.href.match(/https:\/\/www.google.com\/recaptcha\/api\d\/anchor/) && $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").length
        && $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").is(':visible') && isScrolledIntoView($("#recaptcha-anchor div.recaptcha-checkbox-checkmark").get(0))) {
        var execute = true;

        if (sessionStorage.getItem('accesstime')) {
            if (new Date().getTime() - sessionStorage.getItem('accesstime') < 7000) {
                execute = false;
            }
        }

        if (execute) {
            if (parent.name.startsWith("spineditor-captcha-")) {
				chrome.runtime.sendMessage({ type: "IsCaptchaImage",obj:{}},function(resp){
					if(!resp.response){
						$("#recaptcha-anchor div.recaptcha-checkbox-checkmark").click();
						var mid = parent.name.replace("spineditor-captcha-","");
						var url = "https://spineditor.com/deathByCaptcha2.ashx?st=solved&mid="+mid;
						$.get(url).success(function (data) {
							//b
						}).error(function(xhr, statusText) { 
							console.log("Error: "+statusText); 
						})
					}
				});
                sessionStorage.setItem('accesstime', new Date().getTime());
				clearInterval(sid);
            }
        }
        
    }
	if(window.location.href.match(/https:\/\/www.google.com\/recaptcha\/api/)){
		if (parent.name.startsWith("spineditor-captcha-")) {
			if($("#rc-imageselect").size()>0){
				chrome.runtime.sendMessage({ type: "IsCaptchaImage",obj:{}},function(resp){
					if(!resp.response){
						chrome.runtime.sendMessage({ type: "SetCaptchaImage",obj:{}});
						window.parent.location.reload();
					}
				});
			}
		}
	}
	}catch{}
}, 500);

document.addEventListener('OpenWindowCaptcha', function (evt) {
	var data = evt.detail;
	var winCaptcha = window.open(data.url,data.name);
	setTimeout(function(){
		setWindowName(data.name,data.url);
	},1000);
	var sCaptcha = setInterval(function () {
		if (winCaptcha.window == null) {
			clearInterval(sCaptcha);
			var event = document.createEvent('CustomEvent');
			event.initCustomEvent('CloseWindowCaptcha', true, false);
			document.dispatchEvent(event);
		}
	}, 1000);
});

document.addEventListener('OpenWindowTemp', function (evt) {
	chrome.runtime.sendMessage({ type: "OpenWindowTemp", obj:evt.detail });
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('OpenViewDone', true, false, evt.detail);
    document.dispatchEvent(event);
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

var spinTabId=null;
$(window).load(function () {
	if(window.name.startsWith('spineditor')){
		winName = window.name;
		setWindowName(window.name,window.location.href);
	}
    setTimeout(function () {
		docHeight = $(document).height();
		var tabId = document.body.tabindex;
		if(tabId){
			tabId = parseInt(tabId);
			chrome.runtime.sendMessage({ type: "GetWindowName",obj:{tabId:tabId}},function(resp){
				if(!winName || !winName.startsWith("spineditor")){
					winName = resp.response;
					window.name = winName;
				}
				
				if (winName && winName.startsWith("spineditor")) {
					spinTabId = tabId;
					window.onbeforeunload = function () { };
				}

				if (winName.startsWith("spineditorview_")) {
					InitView();
				} else if (winName.startsWith("spineditorpost_")) {
					ProcessPostForum();
				}else{
					if (!window.location.href.toLowerCase().startsWith("https://ipv6.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("https://ipv4.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("http://ipv6.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("http://ipv4.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("https://www.google.com/sorry/index") && !window.location.href.toLowerCase().startsWith("http://www.google.com/sorry/index")) {
						if (winName == "spineditor-noncaptcha" || winName.startsWith("spineditor-captcha-")) {
							closeTabCaptcha();
						}
					} else {
						if (winName.startsWith("spineditor-captcha-")) {
							$("#captcha-form").css("pointer-events","none").append("<div style='background: #282828;border: solid 1px #ddd;line-height: 40px;padding: 0 10px;width: 280px;color: #0dff2b;font-size: 15px;'>Đang tự động xử lý captcha...</div>");
							var mid= winName.replace("spineditor-captcha-","");
							if($("input[name='captcha']").size()>0){
								var imgCaptcha = $("#captcha-form img").get(0);
								var base64 = getImageBase64(imgCaptcha);
								var url = "https://spineditor.com/deathByCaptcha2.ashx";
								$.ajax({
								  type: "POST",
								  url: url,
								  data: "mid="+mid+"&base64="+encodeURIComponent(base64),
								  success: function(data){	
									if (data != "") {
										url = "https://spineditor.com/deathByCaptcha2.ashx?idcaptcha=" + data+"&mid="+mid;
										var countReqCaptcha = 0;
										var timeCaptcha = setInterval(function () {
											$.get(url).success(function (datacaptcha) {
												countReqCaptcha++;
												if (datacaptcha) {
													clearInterval(timeCaptcha);
													$("input[name='captcha']").val(datacaptcha);
													$("input[type='submit']").click();
												}
												if (countReqCaptcha == 40) {
													clearInterval(timeCaptcha);
												}
											}).error(function(xhr, statusText) { 
												console.log("Error: "+statusText); 
											})
										}, 5000);
									}}
								});
							
							}else{
								var siteKey = document.getElementsByClassName('g-recaptcha')[0].getAttribute("data-sitekey");
								var dataS = document.getElementsByClassName('g-recaptcha')[0].getAttribute("data-s");
								var pageUrl = window.location.href;
								var url = "https://spineditor.com/deathByCaptcha2.ashx?sitekey=" + siteKey + "&pageurl=" + encodeURIComponent(pageUrl)+"&mid="+mid+"&dataS="+dataS;
								$.get(url).success(function (data) {
									if (data != "") {
										url = "https://spineditor.com/deathByCaptcha2.ashx?idcaptcha=" + data+"&mid="+mid;
										var countReqCaptcha = 0;
										var timeCaptcha = setInterval(function () {
											$.get(url).success(function (datacaptcha) {
												countReqCaptcha++;
												if (datacaptcha) {
													clearInterval(timeCaptcha);
													$("#g-recaptcha-response").val(datacaptcha);
												}
												if (countReqCaptcha == 40) {
													clearInterval(timeCaptcha);
												}
											}).error(function(xhr, statusText) { 
												console.log("Error: "+statusText); 
											})
										}, 5000);
									}
								}).error(function(xhr, statusText) { 
									console.log("Error: "+statusText); 
								})
								
								var timeCatpchaSubmit = setInterval(function () {
									if ($("#g-recaptcha-response").size() > 0) {
										if ($("#g-recaptcha-response").val().trim() != "") {
											if ($("#captcha-form").size() > 0) {
												$("#captcha-form").submit();
												clearInterval(timeCatpchaSubmit);
											} else {
												$("input[name='submit']").click();
												$("input[name='submit']").attr("disabled", "disabled");
												clearInterval(timeCatpchaSubmit);
											}
										}
									}
								}, 2000);
							}
						} 
					}
				}
			});
		}
    }, 4000);
})

function getImageBase64(img) {
   // Create canvas
   const canvas = document.createElement('canvas');
   const ctx = canvas.getContext('2d');
   // Set width and height
   canvas.width = img.width;
   canvas.height = img.height;
   // Draw the image
   ctx.drawImage(img, 0, 0);
   return canvas.toDataURL('image/jpeg');
}

function setWindowName(name,url){
	if(url){
		chrome.runtime.sendMessage({ type: "SetWindowName",obj:{tabUrl:url,tabName:name}});	
	}else if(spinTabId){
		chrome.runtime.sendMessage({ type: "SetWindowName",obj:{tabId:spinTabId,tabName:name}});	
		window.name = name;
	}
}


function ProcessPostForum() {
    if ($(".welcomelink").size() > 0 || $(".accountPopup").size() > 0) {
        winName = winName.replace('unlogin', 'login');
    }
    var login = winName.split('_')[1];
    var pid = winName.split('_')[2];
    var urlPost = window.location.protocol + '//spineditor.com/Code/Web/WebService.asmx/PostForum?pid=' + pid;
    RequestLinkUrl(urlPost, function (data) {
        var data = JSON.parse($(data).contents().text()).Content;
        data = JSON.parse(data);
        var name = data.Name;
        var detail = data.Detail;
        var forumType = data.ForumType;
        var tags = data.Tags;
        if (tags == 'undefined' || tags == undefined) {
            tags = '';
        }
        if ($("#XenForo").size() > 0) {
            forumType = "XENFORO";
        }
        else if ($("#vbulletin_html").size() > 0) {
            forumType = "VBB";
        } else {
            var dataCheck = $("head").html();
            if (dataCheck.indexOf("vBulletin") != -1) {
                forumType = "VBB_OLD";
            }
        }
        var id = data.Id;
        var url = data.LinkPost;
        var detailBBCode = data.DetailBBCode;
        var username = data.Username;
        var pass = data.Password;
        var intervalContent = null;
        if (forumType == 'VBB') {
            if (login == "post") {
                $("#subject").val(name);
                $("#tagpopup_ctrl").val(tags);
                var mode = $("#vB_Editor_001_mode").val();
                if (mode == 0) {
                    intervalContent = setInterval(function () {
                        if ($("#vB_Editor_001 .cke_source.cke_enable_context_menu").size() > 0) {
                            $("#vB_Editor_001 .cke_source.cke_enable_context_menu").val(detailBBCode);
                            clearInterval(intervalContent);
                        }
                    }, 1000);
                } else {
                    intervalContent = setInterval(function () {
                        if ($("#cke_contents_vB_Editor_001_editor iframe").size() > 0) {
                            $("body", $("#cke_contents_vB_Editor_001_editor iframe").contents()).html(detail);
                            clearInterval(intervalContent);
                        }
                    }, 1000);
                }
            } else if (login == 'unlogin') {
                $("#navbar_username").val(username);
                $("#navbar_password").val(pass);
                setWindowName("spineditorpost_login1_" + id);
                $("#navbar_loginform").submit();
            } else if (login == "login" || login == "login1") {
                setWindowName("spineditorpost_post_" + id);
                window.location = url;
            }
        } else if (forumType == 'XENFORO') {
            if (login == "post") {
                if ($("#ctrl_title_thread_create").size() > 0) {
                    $("#ctrl_title_thread_create").val(name);
                } else if ($("input[name='title']").size() > 0) {
                    $("input[name='title']").val(name);
                }
                $("#XenForoUniq0").val(tags);
                var script_contents = 'var eve = $.Event("keypress");eve.which = 13;$("#XenForoUniq0_tag").val(",");$("#XenForoUniq0_tag").trigger(eve);$(".tag a").click()'
                window.location = 'javascript:' + script_contents;

                intervalContent = setInterval(function () {
                    if ($(".redactor_MessageEditor").size() > 0) {
                        $("body", $(".redactor_MessageEditor").contents()).html(detail);
                        clearInterval(intervalContent);
                    } else if ($("#ctrl_message_html_ifr").size() > 0) {
                        $("body", $("#ctrl_message_html_ifr").contents()).html(detail);
                        clearInterval(intervalContent);
                    } else if ($("div[contenteditable='true']").size() > 0) {
                        $("div[contenteditable='true']").html(detail);
                        clearInterval(intervalContent);
                    }

                }, 1000);
            } else if (login == 'unlogin' || login == 'unlogin2') {
                if ($("#LoginControl").size() > 0) {
                    setWindowName("spineditorpost_login1_" + id);
                    $("#LoginControl").val(username);
                    $("#ctrl_password").val(pass);
                    $("#ctrl_pageLogin_login").val(username);
                    $("#ctrl_pageLogin_password").val(pass);
                    $("form#pageLogin").submit();
                    $("form#login").submit();
                } else {
                    if ($("input[name='login']").size() > 0) {
                        setWindowName("spineditorpost_login1_" + id);
                        $("input[name='login']").val(username);
                        $("input[name='password']").val(pass);
                        $(".formSubmitRow-controls button").click()
                    } else {
                        if (login == 'unlogin') {
                            window.location = '/login';
                            setWindowName("spineditorpost_unlogin2_" + id);
                        } else {
                            setWindowName("spineditorpost_post_" + id);
                            window.location = url;
                        }
                    }
                }
            } else if (login == "login" || login == "login1") {
                setWindowName("spineditorpost_post_" + id);
                window.location = url;
            }
        } else if (forumType == 'VBB_OLD') {

            if (login == "post") {
                $("form .fieldset .bginput").val(name);
                $("#subject").val(name);
                $("#tagpopup_ctrl").val(tags);
                intervalContent = setInterval(function () {
                    if ($("#vB_Editor_001_mode").size() > 0) {
                        var mode = $("#vB_Editor_001_mode").val();
                        if (mode == 0) {
                            if ($("#vB_Editor_001 .cke_source.cke_enable_context_menu").size() > 0) {
                                $("#vB_Editor_001 .cke_source.cke_enable_context_menu").val(detailBBCode);
                                clearInterval(intervalContent);
                            }
                        } else {
                            if ($("#cke_contents_vB_Editor_001_editor iframe").size() > 0) {
                                $("body", $("#cke_contents_vB_Editor_001_editor iframe").contents()).html(detail);
                                clearInterval(intervalContent);
                            }
                        }
                    }
                    if ($("#vB_Editor_001_textarea").size() > 0) {
                        $("#vB_Editor_001_textarea").val(detailBBCode);
                        clearInterval(intervalContent);
                    }
                }, 1000);
            } else if (login == 'unlogin') {
                if ($("#navbar_username").size() > 0) {
                    $("#navbar_username").val(username);
                    $("#navbar_password").val(pass);
                    setWindowName("spineditorpost_login1_" + id);
                    $("form[action='login.php?do=login']").submit();
                } else {
                    setWindowName("spineditorpost_post_" + id);
                    window.location = url;
                }
            } else if (login == "login" || login == "login1") {
                setWindowName("spineditorpost_post_" + id);
                window.location = url;
            }
        }
    }, function (data) {
    });
}

//===========================
document.addEventListener('OpenView', function (evt) {
    chrome.runtime.sendMessage({ type: "OpenView", obj: {Name:evt.detail.Name,TM:evt.detail.Time,Id:evt.detail.Id} });
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('OpenViewDone', true, false, evt.detail);
    document.dispatchEvent(event);
});

document.addEventListener('GetTabCount', function (evt) {
    chrome.runtime.sendMessage({ type: "GetTabCount",obj:{}},function(resp){
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent('GetTabCountResp', true, false, resp.response);
		document.dispatchEvent(event);
	});
});
//===========================
var requestLinkTemp = null;
document.addEventListener('RequestLink', function (evt) {
    if (evt.detail != null) {
        requestLinkTemp = evt.detail;
        RequestLinkFun()
    }
});

function RequestLinkFun() {
    var url = "";
    var captcha = false;
	tempmobile=requestLinkTemp.mobile;
    url = requestLinkTemp.url;
    captcha = requestLinkTemp.captcha;
    chrome.runtime.sendMessage({ type: "RequestLink", obj: url, captcha: captcha,mid:requestLinkTemp.mid, incognito: chrome.extension.inIncognitoContext,mobile:tempmobile }, function (response) {
        var data = "";
        try {
            data = response.response;
        } catch (ex) {
			data="";
        }
        var run = true;
        if (data != "") {
            if (data == "-1") {
                playSound();
            } else {
                if (data == '-2' || data == '-3') {
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent('RequestLinkError', true, false, data);
                    document.dispatchEvent(event);
                    run = false;
                } else {
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent('RequestLinkSuccess', true, false, data);
                    document.dispatchEvent(event);
                    run = false;
                }
            }
        }
        if (run) {
            setTimeout(function () { RequestLinkFun(); }, 500);
        }
    });

}

function playSound() {
    var src = "https://spineditor.com/Content/Images/Home/pure_bell.mp3";
    $(".sound-player").remove();
    $('<audio class="sound-player" autoplay="autoplay" style="display:none;">'
        + '<source src="' + src + '" />'
        + '<embed src="' + src + '" hidden="true" autostart="true" loop="false"/>'
        + '</audio>').appendTo('body');
}


function closeTabCaptcha() {
    chrome.runtime.sendMessage({ type: "CloseCaptcha" ,obj:spinTabId});
}

document.addEventListener('ClearTabNotView', function (evt) {
    chrome.runtime.sendMessage({ type: "ClearTabNotView"});
});

document.addEventListener('AjaxLink', function (evt) {
    var timeReq = setInterval(function () {
        chrome.runtime.sendMessage({ type: "PostRequest", obj: evt.detail }, function (response) {
            var data = "";
            try {
                data = response.response;
            } catch (ex) {

            }
            if (data != "") {
                clearInterval(timeReq);
                if (data == '-1' || data == '-2' || data == '-3') {
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent('AjaxLinkError', true, false, data);
                    document.dispatchEvent(event);
                } else {
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent('AjaxLinkSuccess', true, false, data);
                    document.dispatchEvent(event);
                }
            }
        });
    }, 500);
});

function InitView() {
    var temp = winName.substring(winName.indexOf("_") + 1);
    idView = parseInt(temp.substring(0, temp.indexOf("_")));
    temp = temp.substring(temp.indexOf("_") + 1);
    timeView = parseInt(temp.substring(0, temp.indexOf("_")));
    timeViewTotal = timeView;
    temp = temp.substring(temp.indexOf("_") + 1);
    spinView = temp;
    timeView -= 5000;
	var docTitle = document.title;
    setInterval(function () {
        timeView -= 1000;
        if (timeView <= 0) {
            window.onbeforeunload = function () { };
        }
    document.title = docTitle+ " (" + new Date().toLocaleTimeString() + ")";
    }, 1000);
    ProcessSpinView(GetCurrentView());
}

function ProcessSpinView(val) {
    if (val != "") {
		if (window.location.hostname.startsWith("ipv4.google.com")||window.location.hostname.startsWith("ipv6.google.com")||(window.location+"").startsWith("https://www.google.com/sorry/index")) {
            var viewnext = val;
            if (viewnext.startsWith("http")) {
                EndPage(true);
                //window.location = viewnext;
			    chrome.runtime.sendMessage({ type: "OpenView", obj:  { "Name": viewnext, "Id": idView, "TM": timeView/1000, "RemoveCaptcha": true } });
            }
        }
        else if (window.location.hostname.startsWith("www.google.")) {
            if (val.startsWith("http")) {
                var oLink = FindLinkHref(val, $("#search"));
                if (oLink != null) {
                    var pos = getRealPosition(oLink);
                    ScrollDown(pos.y, function () {
                        EndPage(true);
                        LinkRedirect(oLink, true);
                    });
                } else {
                    oLink = $("#pnnext");
                    if ($("#pnnext").size() > 0) {
                        var pos = getRealPosition(oLink);
                        ScrollDown(pos.y, function () {
                            EndPage(false);
                            LinkRedirect($("#pnnext"));
                            setTimeout(function () { InitView(); }, 5000);
                        }, 1000);
                    } else {
						ScrollFind(function(){
							var linkF = FindLinkHref(val);
							if(linkF!=null){
								var pos = getRealPosition(linkF);
								ScrollDown(pos.y, function () {
									EndPage(true);
									LinkRedirect(linkF, true);
								});	
							}
							return linkF!=null;
						});
                        //EndPage(true);
                        //window.location = val;
                    }
                }
            } else {
                FillText($("input[name='q'],textarea[name='q']"), htmlentities.decode(val), function () {
                    EndPage(true);
                    $("form[role='search']").submit();
                })
            }
        }  else if (window.location.hostname.startsWith("coccoc.com")) {
            if (val.startsWith("http")) {
                var oLink = FindLinkHref(val, $("#root"));
                if (oLink != null) {
                    var pos = getRealPosition(oLink);
                    ScrollDown(pos.y, function () {
                        EndPage(true);
                        LinkRedirect(oLink);
                    });
                } else {
					var url = new URL(window.location.href);
					var page = 1;
					if(url.searchParams.get('page')){
						page = parseInt(url.searchParams.get('page'));
					}
					url.searchParams.set('page',page+1);
                    oLink = $("a[title='Alt + →']");
                    if (oLink.size() > 0) {
                        var pos = getRealPosition(oLink);
                        ScrollDown(pos.y, function () {
                            EndPage(false);
							window.location=url.href;
                            //LinkRedirect(oLink);
                            setTimeout(function () { InitView(); }, 5000);
                        }, 1000);
                    } else {
                        EndPage(true);
						LinkRedirect(val);
                        //window.location = val;
                    }
                }
            } else {
				if(window.location.href.startsWith("https://coccoc.com/search")){
					FillText($("#main-search-input"), val, function () {
						$("button[aria-label='search']").click();
					    EndPage(true);
						setTimeout(function () {  InitView(); }, 5000);
					})
				}
            }
        } else if (window.location.hostname.startsWith("www.youtube.com")) {
            if (val.startsWith("http")) {
                var oLink = FindLinkHref(val);
                if (oLink != null) {
                    var pos = getRealPosition(oLink);
                    ScrollDown(pos.y, function () {
                        EndPage(true);
                        LinkRedirect(oLink);
                    });
                } else {
                    oLink = $("a[data-link-type='next']");
                    if (oLink.size() > 0) {
                        var pos = getRealPosition(oLink);
                        ScrollDown(pos.y, function () {
                            EndPage(false);
                            LinkRedirect(oLink);
                            setTimeout(function () { InitView(); }, 5000);
                        }, 1000);
                    } else {
                        EndPage(true);
                        window.location = val;
                    }
                }
            } else {
                FillText($("input[name='search_query']"), val, function () {
                    EndPage(true);
                    $("form[action='/results']").submit();
                })
            }
        } else {
            var oLink = null;
		
            if (val.startsWith("http")) {
                oLink = FindLinkHref(val);
				if(oLink == null){
					oLink = FindLinkHref("#");
					if(oLink != null){
						$(oLink).attr("href",val);
					}
				}
            } else {
                oLink = FindLinkText(val);
            }

            setTimeout(function () {
                if (oLink != null) {
                    var minTimePage = (Math.ceil(Math.random() * 30) * 1000) + 30000;
                    var pos = getRealPosition(oLink);
                    ScrollDown(pos.y, function () {
                        if ((timeViewTotal - timeView) < minTimePage) {
                            setTimeout(function () {
                                EndPage(true);
                                LinkRedirect(oLink);
                            }, minTimePage - (timeViewTotal - timeView));
                        } else {
                            EndPage(true);
                            LinkRedirect(oLink);
                        }
                    });
                }
            }, 2000);
        }
    } else {
        if (!window.location.hostname.startsWith("www.youtube.com")||!window.location.hostname.startsWith("youtube.com")) {
            if ($("video").size() > 0) {
                var pos = getRealPosition($("video"));
                $("video").get(0).play();
                ScrollDown(pos.y, function () {
                }, Math.ceil(Math.random() * 3000) + 2000);
            } else {
                ScrollDown(docHeight, function () {
                    EndPage(true);
                    if (timeView > (timeViewTotal / 2)) {
                        setTimeout(function () {
                            LinkRedirect(GetRamdomLink());
                        }, (timeViewTotal / 2) - timeView);
                    } else {
                        LinkRedirect(GetRamdomLink());
                    }
                }, Math.ceil(Math.random() * 3000) + 2000);
            }
        } else {
            try {
                var str = $(".ytp-bound-time-right").text();
                var arrTime = str.split(":");
                var h = 0;
                var m = 0;
                var s = 0;
                if (arrTime.length == 3) {
                    h = parseInt(arrTime[0]);
                    m = parseInt(arrTime[1]);
                    s = parseInt(arrTime[2]);
                } else if (arrTime.length == 2) {
                    m = parseInt(arrTime[0]);
                    s = parseInt(arrTime[1]);
                }
                var time = s;
                time += (m * 60);
                time += (h * 3600);
                time = time * 1000;
				if(time>0){
					setTimeout(function () {
						LinkRedirect(GetRamdomLink());
					}, time);
				}
				setInterval(function(){
					if(!$("#movie_player").hasClass("playing-mode") && $(".ytp-play-button").size()>0){
						$(".ytp-play-button").click();
					}
					if($(".ytp-ad-skip-button").size()>0){
						$(".ytp-ad-skip-button").click();
					}
				},1000);
            } catch (ex) {
                ScrollDown(docHeight, function () {
                    EndPage(true);
                    LinkRedirect(GetRamdomLink());
                }, Math.ceil(Math.random() * 3000) + 2000);
            }
        }
    }
}


function GetRamdomLink() {
    var listLink = $("a[href^='/']");
    var listLink2 = $("a[href^='" + window.location.origin + "']");
    listLink2.each(function (i, e) {
        listLink.push(e);
    });
    var r = Math.floor(Math.random() * listLink.length);
    LinkRedirect(listLink.get(r));
}

function LinkRedirect(o, isGoogle) {
    if (o != null) {
		var linkUrl = $(o).attr("href");
		validUrl(linkUrl,function(){
			$(o).attr("target", "_self");
			$(o).unbind("click");
			$(o).off("click");
			/*if (isGoogle) {
				var id = "linkGoogleClick";
				$(o).attr("id", id);
				var script = $(o).attr("onmousedown");
				if (script) {
					script = script.replace("this", id);
					script = script.replace("return", "");
					location.href = "javascript:" + script;
				}
			}*/
			window.open = function (url, target) { };
			$(o)[0].click();
			setTimeout(function () {
				window.location.href = linkUrl;
			}, 5000);
		})
    }
}



function EndPage(flag) {
	var wname="";
    if (flag) {
		wname="spineditorview_" + idView + "_" + timeView + "_" + GetSpinViewNext();
    } else {
		wname="spineditorview_" + idView + "_" + timeView + "_" + spinView;
    }
	if(window.name.startsWith('spineditor')){
		window.name=wname;
		winName=wname;
	}
	setWindowName(wname);
}

function GetCurrentView() {
    if (spinView.indexOf(";") == -1) {
        return spinView;
    } else {
        return spinView.substring(0, spinView.indexOf(";"));
    }
}

function GetSpinViewNext() {
    if (spinView.indexOf(";") == -1) {
        return "";
    } else {
        return spinView.substring(spinView.indexOf(";") + 1);
    }
}

function FindLinkHref(val, oParent) {
    var arr = [];
    var array = $("a");
    if (oParent) {
        array = $("a", oParent);
    }

    if (!val.endsWith("/")) {
		val += "/";
	}

    var orgin = window.location.origin;
    array.each(function (i, e) {
        var href = $(e).attr("href") + "";
        var dataHref = $(e).attr("data-href") + "";
        if (!href.endsWith("/")) {
            href += "/";
        }
        if (dataHref.endsWith("/")) {
			dataHref += "/";
        }
        var fullHref = orgin + href;

        if (href.startsWith(val)) {
            arr.push(e);
        } else if (dataHref.startsWith(val)) {
            arr.push(e);
        } else if (fullHref.startsWith(val)) {
            arr.push(e);
        } else if (href.indexOf(encodeURIComponent(val)) != -1) {
            arr.push(e);
        }
    })

    if (arr.length == 0) {
        return null;
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

function FindLinkText(val) {
    var arr = [];
    $('a').each(function (i, e) {
        var href = $(e).text().trim().toLowerCase();
        if (href.indexOf(val)!=-1) {
            arr.push(e);
        }
    })
    if (arr.length == 0) {
        return null;
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

function FillText(o, val, callback) {
    $(o).focus();
    o.keydown();
    o.keyup();
    o.val(val);
    setTimeout(function () {
        callback();
    }, 3000);
}

function getRealPosition(el, parent) {
    el = $(el).get(0);
    pos = {
        x: 0,
        y: 0
    };
    while (el) {
        pos.x += el.offsetLeft;
        pos.y += el.offsetTop;
        el = el.offsetParent;
        if (parent) {
            if ($(el).is(parent)) {
                break;
            }
        }
    }
    return pos;
}

function ScrollDown(des, callback, timeScroll) {
    if (!timeScroll) {
        timeScroll = Math.ceil(Math.random() * 3000) + 1000;
    }
    if (des > 2500) {
        des = 2500;
    }
    timeOutScrollDown($(window).scrollTop(), des, callback, timeScroll);
}

function ScrollFind(callback){
    var  timeScroll = Math.ceil(Math.random() * 2000) + 1000;
	var scrollTop = $(window).scrollTop()+$(window).innerHeight();
	var val=0;
	var time = setInterval(function () {
		val +=  Math.ceil(Math.random() * 5)*100;
        $(window).scrollTop(val);
		if(callback()){
			clearInterval(time);
		}
    }, timeScroll);
}

function timeOutScrollDown(val, des, callback, timeScroll) {
    setTimeout(function () {
        $(window).scrollTop(val);
        val += 100;
        if ((val + 400) < des) {
            timeOutScrollDown(val, des, callback, timeScroll);
        } else {
            callback();
        }
    }, timeScroll);
}

htmlentities = {
    encode: function (str) {
        var buf = [];
        for (var i = str.length - 1; i >= 0; i--) {
            buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }
        return buf.join('');
    },
    decode: function (str) {
        return str.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    }
};