    function runRuffle(tabid){
	'use strict';

    var runRuffleInject = function() { 
        (function(){class RuffleMimeType{constructor(a,b,c){this.type=a,this.description=b,this.suffixes=c}}class RuffleMimeTypeArray{constructor(a){this.__mimetypes=[],this.__named_mimetypes={};for(let b of a)this.install(b)}install(a){let b=this.__mimetypes.length;this.__mimetypes.push(a),this.__named_mimetypes[a.type]=a,this[a.type]=a,this[b]=a}item(a){return this.__mimetypes[a]}namedItem(a){return this.__named_mimetypes[a]}get length(){return this.__mimetypes.length}}class RufflePlugin extends RuffleMimeTypeArray{constructor(a,b,c,d){super(d),this.name=a,this.description=b,this.filename=c}install(a){a.enabledPlugin||(a.enabledPlugin=this),super.install(a)}}class RufflePluginArray{constructor(a){this.__plugins=[],this.__named_plugins={};for(let b of a)this.install(b)}install(a){let b=this.__plugins.length;this.__plugins.push(a),this.__named_plugins[a.name]=a,this[a.name]=a,this[b]=a}item(a){return this.__plugins[a]}namedItem(a){return this.__named_plugins[a]}refresh(){}get length(){return this.__plugins.length}}const FLASH_PLUGIN=new RufflePlugin("Shockwave Flash","Shockwave Flash 32.0 r0","ruffle.js",[new RuffleMimeType("application/futuresplash","Shockwave Flash","spl"),new RuffleMimeType("application/x-shockwave-flash","Shockwave Flash","swf"),new RuffleMimeType("application/x-shockwave-flash2-preview","Shockwave Flash","swf"),new RuffleMimeType("application/vnd.adobe.flash-movie","Shockwave Flash","swf")]);function install_plugin(a){navigator.plugins.install||Object.defineProperty(navigator,"plugins",{value:new RufflePluginArray(navigator.plugins),writable:!1}),navigator.plugins.install(a),0<a.length&&!navigator.mimeTypes.install&&Object.defineProperty(navigator,"mimeTypes",{value:new RuffleMimeTypeArray(navigator.mimeTypes),writable:!1});for(var b=0;b<a.length;b+=1)navigator.mimeTypes.install(a[b])}install_plugin(FLASH_PLUGIN);})();
    };

	const e = {
		ruffleEnable: !0,
		ignoreOptout: !1,
		warnOnUnsupportedContent: !0,
		logLevel: 'error',
		showSwfDownload: !1
	};
	let t, n, a, o, s;
	function i(e) {
		return new Promise((t, n) => {
			e((e) => {
				const a = chrome.runtime.lastError;
				a ? n(a) : t(e);
			});
		});
	}
	function r(e) {
		return {
			get: (t) => i((n) => e.get(t || null, n)),
			remove: (t) => i((n) => e.remove(t, n)),
			set: (t) => i((n) => e.set(t, n))
		};
	}
	if ('undefined' != typeof chrome)
		(t = chrome.i18n),
			(n = {
				local: r(chrome.storage.local),
				sync: r(chrome.storage.sync),
				onChanged: { addListener: (e) => chrome.storage.onChanged.addListener(e) }
			}),
			(a = {
				reload: (e) => i((t) => chrome.tabs.reload(e, void 0, t)),
				query: (e) => i((t) => chrome.tabs.query(e, t)),
				sendMessage: (e, t, n) => i((a) => chrome.tabs.sendMessage(e, t, n || {}, a))
			}),
			(o = chrome.runtime),
			(s = () => i((e) => chrome.tabs.create({ url: '/options.html' }, e)));
	else {
		if ('undefined' == typeof browser) throw new Error('Extension API not found.');
		(t = browser.i18n),
			(n = browser.storage),
			(a = browser.tabs),
			(o = browser.runtime),
			(s = () => browser.runtime.openOptionsPage());
	}
	const l = [],
		u = Math.floor(1e11 * Math.random());
	function c(e) {
		const t = { to: `ruffle_page${u}`, index: l.length, data: e };
		return (
			window.postMessage(t, '*'),
			new Promise((e, t) => {
				l.push({ resolve: e, reject: t });
			})
		);
	}
	(async () => {
		const t = await (async function() {
				const t = await n.sync.get();
				return Object.assign(Object.assign({}, e), t);
			})(),
			a = (function() {
				if (document.documentElement.hasAttribute('data-ruffle-optout')) return !0;
				try {
					if (
						window.top &&
						window.top.document &&
						window.top.document.documentElement &&
						window.top.document.documentElement.hasAttribute('data-ruffle-optout')
					)
						return !0;
				} catch (e) {
					const t = e instanceof Error ? e.message : String(e);
					console.warn(`Unable to check top-level optout: ${t}`);
				}
				return !1;
			})(),
			s =
				!('FOO' !== document.createElement('foo').tagName) &&
				t.ruffleEnable &&
				!window.RufflePlayer &&
				(t.ignoreOptout || !a);
		o.onMessage.addListener(
			(e, n, o) =>
				s
					? (c(e).then((e) => {
							o({ loaded: !0, tabOptions: t, optout: a, data: e });
						}),
						!0)
					: (o({ loaded: !1, tabOptions: t, optout: a }), !1)
		),
			s &&
				//((function(e) {                    
					//const t = document.createElement('script');
					//(t.textContent =
						//'(function(){class RuffleMimeType{constructor(a,b,c){this.type=a,this.description=b,this.suffixes=c}}class RuffleMimeTypeArray{constructor(a){this.__mimetypes=[],this.__named_mimetypes={};for(let b of a)this.install(b)}install(a){let b=this.__mimetypes.length;this.__mimetypes.push(a),this.__named_mimetypes[a.type]=a,this[a.type]=a,this[b]=a}item(a){return this.__mimetypes[a]}namedItem(a){return this.__named_mimetypes[a]}get length(){return this.__mimetypes.length}}class RufflePlugin extends RuffleMimeTypeArray{constructor(a,b,c,d){super(d),this.name=a,this.description=b,this.filename=c}install(a){a.enabledPlugin||(a.enabledPlugin=this),super.install(a)}}class RufflePluginArray{constructor(a){this.__plugins=[],this.__named_plugins={};for(let b of a)this.install(b)}install(a){let b=this.__plugins.length;this.__plugins.push(a),this.__named_plugins[a.name]=a,this[a.name]=a,this[b]=a}item(a){return this.__plugins[a]}namedItem(a){return this.__named_plugins[a]}refresh(){}get length(){return this.__plugins.length}}const FLASH_PLUGIN=new RufflePlugin("Shockwave Flash","Shockwave Flash 32.0 r0","ruffle.js",[new RuffleMimeType("application/futuresplash","Shockwave Flash","spl"),new RuffleMimeType("application/x-shockwave-flash","Shockwave Flash","swf"),new RuffleMimeType("application/x-shockwave-flash2-preview","Shockwave Flash","swf"),new RuffleMimeType("application/vnd.adobe.flash-movie","Shockwave Flash","swf")]);function install_plugin(a){navigator.plugins.install||Object.defineProperty(navigator,"plugins",{value:new RufflePluginArray(navigator.plugins),writable:!1}),navigator.plugins.install(a),0<a.length&&!navigator.mimeTypes.install&&Object.defineProperty(navigator,"mimeTypes",{value:new RuffleMimeTypeArray(navigator.mimeTypes),writable:!1});for(var b=0;b<a.length;b+=1)navigator.mimeTypes.install(a[b])}install_plugin(FLASH_PLUGIN);})();'),
						//(document.head || document.documentElement).append(t);
				//})(),
				await (function(e) {
					const t = document.createElement('script'),
						n = new Promise((e, n) => {
							t.addEventListener('load', () => e()), t.addEventListener('error', (e) => n(e));
						});
					return (t.src = e), (document.head || document.documentElement).append(t), n;
				})(o.getURL(`scripts/lib/ruffle/ruffle.js?id=${u}`)),
				window.addEventListener('message', (e) => {
					if (e.source !== window) return;
					const { to: t, index: n, data: a } = e.data;
					if (t === `ruffle_content${u}`) {
						const e = l[n];
						e ? ((l[n] = null), e.resolve(a)) : console.warn('No pending request.');
					}
				}),
				await c({
					type: 'load',
					config: {
						warnOnUnsupportedContent: t.warnOnUnsupportedContent,
						logLevel: t.logLevel,
						showSwfDownload: t.showSwfDownload
					}
				});
	})();
};

(function() {
    function generatePage( Input ) {
        const getBlobURL = (code, type) => {
            const blob = new Blob([code], { type });
            return URL.createObjectURL(blob);
        }

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            <link rel="stylesheet" type="text/css" href="${chrome.runtime.getURL("css/webfonts/all.min.css")}">
            <link rel="stylesheet" type="text/css" href="${chrome.runtime.getURL("css/notifications.css")}" />
            
            <script
            src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
            crossorigin="anonymous"></script>
            <script src="${chrome.runtime.getURL("scripts/notifications.js")}"></script>
            
            <title>Notifications</title>
        </head>
        <body></body>
        </html>
        `;
        
        return getBlobURL( html, "text/html" );
    }

    chrome.storage.sync.get("SuperNovaNotifications", function( response ) {
        if ( response.SuperNovaNotifications == undefined ) {
            response.SuperNovaNotifications = {
                "SuperNovaNotifications": {
                    all: true,
                    bookmark: {
                        state: "daily",
                        idle: undefined
                    },
                    replay: true,
                    install: true
                }
            };
            chrome.storage.sync.set( response.SuperNovaNotifications );
        }

        function NotifcationsIframe() {
            var iframe = document.createElement("iframe");
            iframe.id = "supernova_notifications";

            iframe.src = generatePage();

            iframe.allowtransparency="true";
            iframe.style.background = "none transparent";
            iframe.style.zIndex = "99999";
            iframe.frameBorder = "0";
            iframe.scrolling = "no";
            iframe.style.position = "fixed";
            iframe.style.top = "0px";
            iframe.style.right = "0px";
            iframe.style.maxWidth = "300px";
            iframe.style.maxHeight = "1px";
            iframe.height = "1";
            iframe.style.display = "block";
            iframe.style.marginBottom = "0px";

            return iframe;
        }

        function insertNotificationIframe() {
            document.body.append(NotifcationsIframe());
        }

        if ( response.SuperNovaNotifications.all != false ) {
            function almostReady() {
                return {
                    _ready: false,
                    waiting: false,
                    todo: [],
                    isReady: function() {
                        this._ready = true;
                        this.waiting = false;
                        this.doWaiting();
                    },
                    doWaiting: function() {
                        this.todo.forEach(function( element ) {
                            element.function( element.options );
                        })
                    },
                    ready: function( callbackObject ) {
                        this.todo.push( callbackObject );
                        if ( 
                            this.waiting == false &&
                            this._ready == false
                        ) {
                            this.waiting = true;
                        } else if ( this._ready ) {
                            this.doWaiting();
                        }
                    }
                };
            }

            var enabler = almostReady();
            var notifications = almostReady();

            function waitForEnabler( data ) {
                $("#enablerIf")[0].contentWindow.postMessage({
                    who: "enabler",
                    command: "waitForEnabler",
                    data: data
                }, "*");
            }

            function renderNotification( data ) {
                $("#supernova_notifications")[0].contentWindow.postMessage({
                    command: "renderNotification",
                    data: data
                });
            }

            function openUI() {
                var ui_iframe = document.createElement("iframe");
                ui_iframe.id = "supernova_ui";
                $.get(chrome.runtime.getURL("pages/ui.html")).done(function( ui ) {
                    if ( ui.match(/run-button-container/) == null ) {
                        ui_iframe.style.height = "400px";
                    }
                });
                ui_iframe.src = chrome.runtime.getURL("pages/ui.html");
                
                ui_iframe.style.zIndex = "99999";
                ui_iframe.frameBorder = "0";
                ui_iframe.scrolling = "no";
                ui_iframe.style.position = "fixed";
                ui_iframe.style.top = "0px";
                ui_iframe.style.right = "60px";
                ui_iframe.style.display = "block";
                ui_iframe.style.height = "447px";
                ui_iframe.style.width = "218px";

                document.body.append(ui_iframe);

                $("#supernova_ui").focus();
                $("#supernova_ui").blur(function() {
                    $("#supernova_ui").off();
                    $("#supernova_ui").fadeOut("slow", function() {
                        $("#supernova_ui").remove();
                    });
                });
            }

            function openSettings() {
                chrome.runtime.sendMessage({ command: "openSettings" });
            }

            function afterpageNotify( data ) {
                if ( $("#supernova_notifications").length == 0 ) {
                    insertNotificationIframe();
                }

                notifications.ready({
                    function: function() {
                        $("#supernova_notifications")[0].contentWindow.postMessage({
                            command: "notify", 
                            data: data
                        }, "*");
                    }
                });
            }

            function removeNotificationIframe() {
                $("#supernova_notifications").fadeOut("slow", function() {
                    $("#supernova_notifiactions").off();
                    $("#supernova_notifiactions").remove();
                });
            }

            function resizeNotificationsIframe( height ) {
                $("#supernova_notifications")[0].style.maxHeight = "none";
                $("#supernova_notifications")[0].style.maxHeight = height + "px";
                $("#supernova_notifications")[0].height = height + "px";
            }

            function getNotificationsText() {
                $.getJSON(chrome.runtime.getURL("texts/notifications.json")).done(function( text ) {
                    $("#supernova_notifications")[0].contentWindow.postMessage({
                        command: "text", 
                        data: text
                    }, "*");
                }).fail(function( error ) {
                    throw error;
                });
            }

            window.addEventListener("message", function( event ) {
                if ( 
                    event &&
                    event.data &&
                    event.data.who == "afterpage" 
                ) {
                    switch( event.data.command ) {
                        case "waitForEnabler":
                            if ($("#enablerIf").length) {
                                enabler.ready({ function: waitForEnabler, options: event.data.data })
                            } else {
                                renderNotification( event.data.data );
                            }
                            break;
                        case "renderNotification":
                            renderNotification( event.data.data );
                            break;
                        case "enablerReady":
                            enabler.isReady();
                            break;
                        case "openUI": 
                            openUI();
                            break;
                        case "openSettings": 
                            openSettings();
                            break;
                        case "notify":
                            afterpageNotify( event.data.data );
                            break;
                        case "removeNotificationIframe":
                            removeNotificationIframe();
                            break;
                        case "notificationsReady":
                            notifications.isReady();
                            break;
                        case "resizeNotificationsIframe":
                            resizeNotificationsIframe( event.data.data );
                            break;
                        case "getNotificationsText":
                            getNotificationsText();
                            break;
                    }
                }
            });
        }
    });
    
})();

(function () {
    const DISMISSED_TIMEOUT = 86400 * 15 * 1000;
    const LAUNCH_TIMEOUT = 1000;

    if (typeof (extensionStatus) == "undefined") {
        var extensionStatus = {
            extension: true
        }
    }
    if (typeof (installStatus) == "undefined") {
        var installStatus = {};
    }
    if (typeof (launchStatus) == "undefined") {
        var launchStatus = {};
    }


    function runZoneTag() {
        var s = document.createElement('script'); s.type = 'text/javascript';
        s.src = chrome.runtime.getURL('scripts/supernovalauncher.js');
        var s2 = document.getElementsByTagName('script')[0];
        s2.parentNode.insertBefore(s, s2);
    }



    setTimeout(function () {

        if (launchStatus.launchStatus != "started") {
            chrome.runtime.sendMessage({ "command": "getextensionstatus" }, function (result) {
                if (result != null && typeof (result) == 'object') {
                    extend(extensionStatus, result);
                }

                var splashObject = getSplashObject();
                if (splashObject != null) {

                    var hostData = {
                        flashenabled: false,
                        dismissed: false
                    }

                    chrome.storage.local.get([window.location.host], function (result) {
                        var data = result[window.location.host];
                        if (data != null && typeof (data) == 'object') {
                            if (data.flashenabled)
                                hostData.flashenabled = true;
                            if (data.dismissed && typeof (data.dismissed) === 'number' && new Date().getTime() - data.dismissed > DISMISSED_TIMEOUT) {
                                hostData.dismissed = true;
                            }
                        }

                        //log(hostData.flashenabled)
                        //log(hostData.dismissed)
                        if (!hostData.flashenabled) {
                            var version = getFlashPlayerVersion();
                            log("Has flash player version " + version.major + "." + version.minor + "." + version.release);
                            var hasCorrectVersion = hasFlashPlayerVersion("9.0.18");
                            log("Flash player version OK? " + hasCorrectVersion)

                            var launchStatus = getLaunchStatus();
                            if (launchStatus != null && launchStatus.launchStatus && launchStatus.launchStatus != "none") {
                                log("launchStatus indicates that Supernova already tried to start on this page - aborting autostart");
                            } else if (!hasCorrectVersion) {
                                //This code used to start superstarter automatically.
                                if (false && extensionStatus.superstarter) {
                                    var command = "play?swfurl=" + encodeURIComponent(splashObject.url) + "&flashvars=" + encodeURIComponent(splashObject.flashvars);

                                    //runZoneTag(); 

                                    chrome.runtime.sendMessage({ "command": "superstarter", "data": command }, function (response) {
                                        if (splashObject.objectEl) {
                                            window.postMessage(JSON.stringify({ "event": "superstarter", "status": "started", "data": "auto" }), "*");
                                            runZoneTag();
                                        }
                                    });
                                } else if (!hostData.dismissed) {

                                    var iframe = document.createElement("iframe");
                                    iframe.style.display = "block";
                                    iframe.style.height = "239px";
                                    iframe.style.width = "316px";
                                    iframe.style.border = "0px";
                                    iframe.id = "enablerIf";

                                    //iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
                                    iframe.src = chrome.runtime.getURL('pages/enabler.html');

                                    var enablerDiv = document.createElement("div");
                                    enablerDiv.style.transition = "2s ";
                                    enablerDiv.style.position = "fixed";
                                    enablerDiv.style.top = 0;
                                    enablerDiv.style.border = "1px solid light grey";
                                    enablerDiv.style.boxShadow = '0 4px 8px 0 rgba(0, 0,0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.15)'
                                    enablerDiv.style.right = "65px";
                                    enablerDiv.style.zIndex = 2147483647;
                                    enablerDiv.id = 'enablerDiv2';

                                    //enablerDiv.style.width="316px";
                                    //enablerDiv.style.height= "128px";
                                    enablerDiv.appendChild(iframe);
                                    document.body.appendChild(enablerDiv);
                                
                                    chrome.runtime.sendMessage({ command: "postUsage", data: '{ type: "Prompted", data: null }' });
                                }
                            }
                        }
                    });
                }
            });
        }
    }, LAUNCH_TIMEOUT);

}())