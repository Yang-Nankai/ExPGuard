var js = document.createElement('script');
js.src = chrome.runtime.getURL('contentscript/xhr.js');
js.onload = function() {
	
	var defines = document.createElement('script');
	defines.src = chrome.runtime.getURL('common/defines.js');
	defines.onload = function() {
		
		var _XSCUTILS = document.createElement('script');
		_XSCUTILS.src = chrome.runtime.getURL('common/XSCUTILS.js');
		_XSCUTILS.onload = function(){
			
			var _CSUTILS = document.createElement('script');
			_CSUTILS.src = chrome.runtime.getURL('contentscript/CSUTILS.js');
			_CSUTILS.onload = function() {
				
				var xshandle = document.createElement('script');
				xshandle.src = chrome.runtime.getURL('contentscript/xshandle.js');
				xshandle.onload = function(){
					
					var css = document.createElement('link');
					css.setAttribute("rel", "stylesheet");
					css.href = chrome.runtime.getURL('contentscript/xsg2cpopup.css');
					(document.head||document.documentElement).appendChild(css);

					var js = document.createElement('script');
					js.src = chrome.runtime.getURL('contentscript/xsg2cpopup.js');
					js.onload = function(){};
					(document.head||document.documentElement).appendChild(js);
	
				};
				(document.head||document.documentElement).appendChild(xshandle);
			};
			(document.head||document.documentElement).appendChild(_CSUTILS);
		};
		(document.head||document.documentElement).appendChild(_XSCUTILS);
	};
	(document.head||document.documentElement).appendChild(defines);
};
(document.head||document.documentElement).appendChild(js);

