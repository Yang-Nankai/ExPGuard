var defines = document.createElement('script');
defines.src = chrome.runtime.getURL('common/defines.js');
defines.onload = function() {
	
	var _CSUTILS = document.createElement('script');
	_CSUTILS.src = chrome.runtime.getURL('contentscript/CSUTILS.js');
	_CSUTILS.onload = function() {
		
		var css = document.createElement('link');
		css.setAttribute("rel", "stylesheet");
		css.href = chrome.runtime.getURL('contentscript/xsg2cpopup.css');
		(document.head||document.documentElement).appendChild(css);

		var js = document.createElement('script');
		js.src = chrome.runtime.getURL('contentscript/xsg2cpopup.js');
		js.onload = function(){
			
			var epf = document.createElement('script');
			epf.src = chrome.runtime.getURL('contentscript/epf1.js');
			epf.onload = function(){
				
				var xhr = document.createElement('script');
				xhr.src = chrome.runtime.getURL('contentscript/xhr.js');
				xhr.onload = function() {
					
					var cmpdf = document.createElement('script');
					cmpdf.src = chrome.runtime.getURL('contentscript/cmpdf.js');
					cmpdf.onload = function() {};
					(document.head||document.documentElement).appendChild(cmpdf);
					
					var _XSCUTILS = document.createElement('script');
					_XSCUTILS.src = chrome.runtime.getURL('common/XSCUTILS.js');
					_XSCUTILS.onload = function() {};
					(document.head||document.documentElement).appendChild(_XSCUTILS);
					
					var xsjos = document.createElement('script');
					xsjos.src = chrome.runtime.getURL('contentscript/xsjos.js');
					xsjos.onload = function() {};
					(document.head||document.documentElement).appendChild(xsjos);
					
					var xshandle = document.createElement('script');
					xshandle.src = chrome.runtime.getURL('contentscript/xshandle.js');
					xshandle.onload = function(){};
					(document.head||document.documentElement).appendChild(xshandle);
				};
				(document.head||document.documentElement).appendChild(xhr);
				
			};
			(document.head||document.documentElement).appendChild(epf);
		};
		(document.head||document.documentElement).appendChild(js);
	};
	(document.head||document.documentElement).appendChild(_CSUTILS);
};
(document.head||document.documentElement).appendChild(defines);


