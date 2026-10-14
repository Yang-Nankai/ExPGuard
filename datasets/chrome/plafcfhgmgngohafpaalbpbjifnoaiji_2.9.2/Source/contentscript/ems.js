var s = document.createElement('script');
s.src = chrome.runtime.getURL('contentscript/wss.js');
s.onload = function() {
	
	var defines = document.createElement('script');
	defines.src = chrome.runtime.getURL('common/defines.js');
	defines.onload = function() {};
	(document.head||document.documentElement).appendChild(defines);
	
	var _XSCUTILS = document.createElement('script');
	_XSCUTILS.src = chrome.runtime.getURL('common/XSCUTILS.js');
	_XSCUTILS.onload = function(){};
	(document.head||document.documentElement).appendChild(_XSCUTILS);
	
	var bgListner = document.createElement('script');
	bgListner.src = chrome.runtime.getURL('contentscript/CSUTILS.js');
	bgListner.onload = function() { };
	(document.head||document.documentElement).appendChild(bgListner);
			
	var css = document.createElement('link');
	css.setAttribute("rel", "stylesheet");
	css.href = chrome.runtime.getURL('contentscript/xsg2cpopup.css');
	(document.head||document.documentElement).appendChild(css);
	
	var js = document.createElement('script');
	js.src = chrome.runtime.getURL('contentscript/xsg2cpopup.js');
	js.onload = function(){};
	(document.head||document.documentElement).appendChild(js);
	
	var xshandle = document.createElement('script');
	xshandle.src = chrome.runtime.getURL('contentscript/xshandle.js');
	xshandle.onload = function(){};
	(document.head||document.documentElement).appendChild(xshandle);
};
(document.head||document.documentElement).appendChild(s);




