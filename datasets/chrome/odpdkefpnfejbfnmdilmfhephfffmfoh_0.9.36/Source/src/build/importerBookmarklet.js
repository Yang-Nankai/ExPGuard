(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var jquery1_12_4_min = {exports: {}};

	/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */

	(function (module) {
		!function(a,b){module.exports=a.document?b(a,true):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)};}("undefined"!=typeof window?window:commonjsGlobal,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="1.12.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=false;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=false,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:true,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return "function"===n.type(a)},isArray:Array.isArray||function(a){return "array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){var b=a&&a.toString();return !n.isArray(a)&&b-parseFloat(b)+1>=0},isEmptyObject:function(a){var b;for(b in a)return  false;return  true},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return  false;try{if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype,"isPrototypeOf"))return !1}catch(c){return  false}if(!l.ownFirst)for(b in a)return k.call(a,b);for(b in a);return void 0===b||k.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b);})(b);},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===false)break}else for(d in a)if(b.call(a[d],d,a[d])===false)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(h)return h.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return  -1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return "string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=e.call(arguments,2),d=function(){return a.apply(b||this,c.concat(e.call(arguments)))},d.guid=a.guid=a.guid||n.guid++,d):void 0},now:function(){return +new Date},support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase();});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return "function"===c||n.isWindow(a)?false:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=true),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return  -1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m();};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType;}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b));}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1;}};}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else {if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b;}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id");}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=true,a}function ia(a){var b=n.createElement("div");try{return !!a(b)}catch(c){return  false}finally{b.parentNode&&b.parentNode.removeChild(b),b=null;}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b;}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return  -1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return "input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return ("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]));})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:false},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,false):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return "undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return "undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]");}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:");})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O);}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return  true;return  false},B=b?function(a,b){if(a===b)return l=true,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=true,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return (a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1);}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a);}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,true))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return "*"===a?function(){return  true}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":false):true}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return !!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=false;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return  false;o=p="only"===a&&!o&&"nextSibling";}return  true}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===false)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g]);}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f));}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return (b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return  false}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===false},disabled:function(a){return a.disabled===true},checked:function(a){var b=a.nodeName.toLowerCase();return "input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===true},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return  false;return  true},parent:function(a){return !d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return "input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return "input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return [0]}),last:na(function(a,b){return [b-1]}),eq:na(function(a,b,c){return [0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in {radio:true,checkbox:true,file:true,password:true,image:true})d.pseudos[b]=la(b);for(b in {submit:true,reset:true})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=false,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return  true}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return  true}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return  false;return  true}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l));}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i);}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l));}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r);})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,true),l=ra(function(a){return J(b,a)>-1},h,true),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else {if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c);}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y);}c&&((l=!q&&l)&&r--,f&&t.push(l));}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u);}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i);}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a;}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length);}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return (n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===true?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a);}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return !!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a);}return n.grep(a,function(a){return n.inArray(a,b)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return  true}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(z(this,a||[],false))},not:function(a){return this.pushStack(z(this,a||[],true))},is:function(a){return !!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],false).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return !b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,true)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}if(f=d.getElementById(e[2]),f&&f.parentNode){if(f.id!==e[2])return A.find(a);this.length=1,this[0]=f;}return this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:true,contents:true,next:true,prev:true};n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return  true})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return "Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||(e=n.uniqueSort(e)),D.test(a)&&(e=e.reverse())),this.pushStack(e)};});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=true;}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=true;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===false&&a.stopOnFalse&&(h=f.length,c=false);}a.memory||(c=false),b=false,e&&(f=c?[]:"");},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c);});}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--;}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return !f},lock:function(){return e=true,c||j.disable(),this},locked:function(){return !!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return !!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments);});}),a=null;}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h;},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith;}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c);}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:false,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(true);},ready:function(a){(a===true?--n.readyWait:n.isReady)||(n.isReady=true,a!==true&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))));}});function J(){d.addEventListener?(d.removeEventListener("DOMContentLoaded",K),a.removeEventListener("load",K)):(d.detachEvent("onreadystatechange",K),a.detachEvent("onload",K));}function K(){(d.addEventListener||"load"===a.event.type||"complete"===d.readyState)&&(J(),n.ready());}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll)a.setTimeout(n.ready);else if(d.addEventListener)d.addEventListener("DOMContentLoaded",K),a.addEventListener("load",K);else {d.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=false;try{c=null==a.frameElement&&d.documentElement;}catch(e){}c&&c.doScroll&&!function f(){if(!n.isReady){try{c.doScroll("left");}catch(b){return a.setTimeout(f,50)}J(),n.ready();}}();}return I.promise(b)},n.ready.promise();var L;for(L in n(l))break;l.ownFirst="0"===L,l.inlineBlockNeedsLayout=false,n(function(){var a,b,c,e;c=d.getElementsByTagName("body")[0],c&&c.style&&(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",l.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(e));}),function(){var a=d.createElement("div");l.deleteExpando=true;try{delete a.test;}catch(b){l.deleteExpando=false;}a=null;}();var M=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?false:!b||b!==true&&a.getAttribute("classid")===b},N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c;}catch(e){}n.data(a,b,c);}else c=void 0;
		}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return  false;return  true}function R(a,b,d,e){if(M(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),"object"!=typeof b&&"function"!=typeof b||(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function S(a,b,c){if(M(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],true):l.deleteExpando||g!=g.window?delete g[h]:g[h]=void 0);}}}n.extend({cache:{},noData:{"applet ":true,"embed ":true,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,true)},_removeData:function(a,b){return S(a,b,true)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));n._data(f,"parsedAttrs",true);}return e}return "object"==typeof a?this.each(function(){n.data(this,a);}):arguments.length>1?this.each(function(){n.data(this,a,b);}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a);})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b);};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire();},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c);})})}}),n.fn.extend({queue:function(a,b){var c=2;return "string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a);})},dequeue:function(a){return this.each(function(){n.dequeue(this,a);})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f]);};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}}),function(){var a;l.shrinkWrapBlocks=function(){if(null!=a)return a;a=false;var b,c,e;return c=d.getElementsByTagName("body")[0],c&&c.style?(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(d.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(e),a):void 0};}();var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),V=["Top","Right","Bottom","Left"],W=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function X(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&U.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var Y=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=true;for(h in c)Y(a,b,h,c[h],true,f,g);}else if(void 0!==d&&(e=true,n.isFunction(d)||(g=true),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Z=/^(?:checkbox|radio)$/i,$=/<([\w:-]+)/,_=/^$|\/(?:java|ecma)script/i,aa=/^\s+/,ba="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";function ca(a){var b=ba.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}!function(){var a=d.createElement("div"),b=d.createDocumentFragment(),c=d.createElement("input");a.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l.leadingWhitespace=3===a.firstChild.nodeType,l.tbody=!a.getElementsByTagName("tbody").length,l.htmlSerialize=!!a.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==d.createElement("nav").cloneNode(true).outerHTML,c.type="checkbox",c.checked=true,b.appendChild(c),l.appendChecked=c.checked,a.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!a.cloneNode(true).lastChild.defaultValue,b.appendChild(a),c=d.createElement("input"),c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),a.appendChild(c),l.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked,l.noCloneEvent=!!a.addEventListener,a[n.expando]=1,l.attributes=!a.getAttribute(n.expando);}();var da={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};da.optgroup=da.option,da.tbody=da.tfoot=da.colgroup=da.caption=da.thead,da.th=da.td;function ea(a,b){var c,d,e=0,f="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ea(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function fa(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"));}var ga=/<|&#?\w+;/,ha=/<tbody/i;function ia(a){Z.test(a.type)&&(a.defaultChecked=a.checked);}function ja(a,b,c,d,e){for(var f,g,h,i,j,k,m,o=a.length,p=ca(b),q=[],r=0;o>r;r++)if(g=a[r],g||0===g)if("object"===n.type(g))n.merge(q,g.nodeType?[g]:g);else if(ga.test(g)){i=i||p.appendChild(b.createElement("div")),j=($.exec(g)||["",""])[1].toLowerCase(),m=da[j]||da._default,i.innerHTML=m[1]+n.htmlPrefilter(g)+m[2],f=m[0];while(f--)i=i.lastChild;if(!l.leadingWhitespace&&aa.test(g)&&q.push(b.createTextNode(aa.exec(g)[0])),!l.tbody){g="table"!==j||ha.test(g)?"<table>"!==m[1]||ha.test(g)?0:i:i.firstChild,f=g&&g.childNodes.length;while(f--)n.nodeName(k=g.childNodes[f],"tbody")&&!k.childNodes.length&&g.removeChild(k);}n.merge(q,i.childNodes),i.textContent="";while(i.firstChild)i.removeChild(i.firstChild);i=p.lastChild;}else q.push(b.createTextNode(g));i&&p.removeChild(i),l.appendChecked||n.grep(ea(q,"input"),ia),r=0;while(g=q[r++])if(d&&n.inArray(g,d)>-1)e&&e.push(g);else if(h=n.contains(g.ownerDocument,g),i=ea(p.appendChild(g),"script"),h&&fa(i),c){f=0;while(g=i[f++])_.test(g.type||"")&&c.push(g);}return i=null,p}!function(){var b,c,e=d.createElement("div");for(b in {submit:true,change:true,focusin:true})c="on"+b,(l[b]=c in a)||(e.setAttribute(c,"t"),l[b]=e.attributes[c].expando===false);e=null;}();var ka=/^(?:input|select|textarea)$/i,la=/^key/,ma=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,na=/^(?:focusinfocus|focusoutblur)$/,oa=/^([^.]*)(?:\.(.+)|)/;function pa(){return  true}function qa(){return  false}function ra(){try{return d.activeElement}catch(a){}}function sa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)sa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===false)e=qa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c);})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return "undefined"==typeof n||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(G)||[""],h=b.length;while(h--)f=oa.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==false||(a.addEventListener?a.addEventListener(o,k,false):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=true);a=null;}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=oa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==false||n.removeEvent(a,o,r.handle),delete k[o]);}else for(o in k)n.event.remove(a,o+b[j],c,d,true);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"));}},trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(i=m=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!na.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),h=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),l=n.event.special[q]||{},f||!l.trigger||l.trigger.apply(e,c)!==false)){if(!f&&!l.noBubble&&!n.isWindow(e)){for(j=l.delegateType||q,na.test(j+q)||(i=i.parentNode);i;i=i.parentNode)p.push(i),m=i;m===(e.ownerDocument||d)&&p.push(m.defaultView||m.parentWindow||a);}o=0;while((i=p[o++])&&!b.isPropagationStopped())b.type=o>1?j:l.bindType||q,g=(n._data(i,"events")||{})[b.type]&&n._data(i,"handle"),g&&g.apply(i,c),g=h&&i[h],g&&g.apply&&M(i)&&(b.result=g.apply(i,c),b.result===false&&b.preventDefault());if(b.type=q,!f&&!b.isDefaultPrevented()&&(!l._default||l._default.apply(p.pop(),c)===false)&&M(e)&&h&&e[q]&&!n.isWindow(e)){m=e[h],m&&(e[h]=null),n.event.triggered=q;try{e[q]();}catch(s){}n.event.triggered=void 0,m&&(e[h]=m);}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==false){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===false&&(a.preventDefault(),a.stopPropagation()));}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==true||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d});}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ma.test(f)?this.mouseHooks:la.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=g.srcElement||d),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,h.filter?h.filter(a,g):a},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button,h=b.fromElement;return null==a.pageX&&null!=b.clientX&&(e=a.target.ownerDocument||d,f=e.documentElement,c=e.body,a.pageX=b.clientX+(f&&f.scrollLeft||c&&c.scrollLeft||0)-(f&&f.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(f&&f.scrollTop||c&&c.scrollTop||0)-(f&&f.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&h&&(a.relatedTarget=h===a.target?b.toElement:h),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},special:{load:{noBubble:true},focus:{trigger:function(){if(this!==ra()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ra()&&this.blur?(this.blur(),false):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),false):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){ void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result);}}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:true});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault();}},n.removeEvent=d.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c);}:function(a,b,c){var d="on"+b;a.detachEvent&&("undefined"==typeof a[d]&&(a[d]=null),a.detachEvent(d,c));},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===false?pa:qa):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=true)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:qa,isPropagationStopped:qa,isImmediatePropagationStopped:qa,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=pa,a&&(a.preventDefault?a.preventDefault():a.returnValue=false);},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=pa,a&&!this.isSimulated&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=true);},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=pa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation();}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}};}),l.submit||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?false:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?n.prop(b,"form"):void 0;c&&!n._data(c,"submit")&&(n.event.add(c,"submit._submit",function(a){a._submitBubble=true;}),n._data(c,"submit",true));})},postDispatch:function(a){a._submitBubble&&(delete a._submitBubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a));},teardown:function(){return n.nodeName(this,"form")?false:void n.event.remove(this,"._submit")}}),l.change||(n.event.special.change={setup:function(){return ka.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._justChanged=true);}),n.event.add(this,"click._change",function(a){this._justChanged&&!a.isTrigger&&(this._justChanged=false),n.event.simulate("change",this,a);})),false):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;ka.test(b.nodeName)&&!n._data(b,"change")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a);}),n._data(b,"change",true));})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!ka.test(this.nodeName)}}),l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a));};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,true),n._data(d,b,(e||0)+1);},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,true),n._removeData(d,b));}};}),n.fn.extend({on:function(a,b,c,d){return sa(this,a,b,c,d)},one:function(a,b,c,d){return sa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==false&&"function"!=typeof b||(c=b,b=void 0),c===false&&(c=qa),this.each(function(){n.event.remove(this,a,c,b);})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this);})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,true):void 0}});var ta=/ jQuery\d+="(?:null|\d+)"/g,ua=new RegExp("<(?:"+ba+")[\\s/>]","i"),va=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,wa=/<script|<style|<link/i,xa=/checked\s*(?:[^=]|=\s*.checked.)/i,ya=/^true\/(.*)/,za=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Aa=ca(d),Ba=Aa.appendChild(d.createElement("div"));function Ca(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Da(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function Ea(a){var b=ya.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d]);}g.data&&(g.data=n.extend({},g.data));}}function Ga(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando);}"script"===c&&b.text!==a.text?(Da(b).text=a.text,Ea(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Z.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue);}}function Ha(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&xa.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d);});if(o&&(k=ja(b,a[0].ownerDocument,false,a,d),e=k.firstChild,1===k.childNodes.length&&(k=e),e||d)){for(i=n.map(ea(k,"script"),Da),h=i.length;o>m;m++)g=k,m!==p&&(g=n.clone(g,true,true),h&&n.merge(i,ea(g,"script"))),c.call(a[m],g,m);if(h)for(j=i[i.length-1].ownerDocument,n.map(i,Ea),m=0;h>m;m++)g=i[m],_.test(g.type||"")&&!n._data(g,"globalEval")&&n.contains(j,g)&&(g.src?n._evalUrl&&n._evalUrl(g.src):n.globalEval((g.text||g.textContent||g.innerHTML||"").replace(za,"")));k=e=null;}return a}function Ia(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(ea(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&fa(ea(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(va,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ua.test("<"+a.nodeName+">")?f=a.cloneNode(true):(Ba.innerHTML=a.outerHTML,Ba.removeChild(f=Ba.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ea(f),h=ea(a),g=0;null!=(e=h[g]);++g)d[g]&&Ga(e,d[g]);if(b)if(c)for(h=h||ea(a),d=d||ea(f),g=0;null!=(e=h[g]);g++)Fa(e,d[g]);else Fa(a,f);return d=ea(f,"script"),d.length>0&&fa(d,!i&&ea(a,"script")),d=h=e=null,f},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.attributes,m=n.event.special;null!=(d=a[h]);h++)if((b||M(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k||"undefined"==typeof d.removeAttribute?d[i]=void 0:d.removeAttribute(i),c.push(f));}}}),n.fn.extend({domManip:Ha,detach:function(a){return Ia(this,a,true)},remove:function(a){return Ia(this,a)},text:function(a){return Y(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||d).createTextNode(a))},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a);}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild);}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this);})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling);})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ea(a,false));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0);}return this},clone:function(a,b){return a=null==a?false:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return Y(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(ta,""):void 0;if("string"==typeof a&&!wa.test(a)&&(l.htmlSerialize||!ua.test(a))&&(l.leadingWhitespace||!aa.test(a))&&!da[($.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ea(b,!1)),b.innerHTML=a);b=0;}catch(e){}}b&&this.empty().append(a);},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(ea(this)),c&&c.replaceChild(b,this));},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],f=n(a),h=f.length-1;h>=d;d++)c=d===h?this:this.clone(true),n(f[d])[b](c),g.apply(e,c.get());return this.pushStack(e)};});var Ja,Ka={HTML:"block",BODY:"block"};function La(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function Ma(a){var b=d,c=Ka[a];return c||(c=La(a,b),"none"!==c&&c||(Ja=(Ja||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ja[0].contentWindow||Ja[0].contentDocument).document,b.write(),b.close(),c=La(a,b),Ja.detach()),Ka[a]=c),c}var Na=/^margin/,Oa=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Pa=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Qa=d.documentElement;!function(){var b,c,e,f,g,h,i=d.createElement("div"),j=d.createElement("div");if(j.style){j.style.cssText="float:left;opacity:.5",l.opacity="0.5"===j.style.opacity,l.cssFloat=!!j.style.cssFloat,j.style.backgroundClip="content-box",j.cloneNode(true).style.backgroundClip="",l.clearCloneStyle="content-box"===j.style.backgroundClip,i=d.createElement("div"),i.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",j.innerHTML="",i.appendChild(j),l.boxSizing=""===j.style.boxSizing||""===j.style.MozBoxSizing||""===j.style.WebkitBoxSizing,n.extend(l,{reliableHiddenOffsets:function(){return null==b&&k(),f},boxSizingReliable:function(){return null==b&&k(),e},pixelMarginRight:function(){return null==b&&k(),c},pixelPosition:function(){return null==b&&k(),b},reliableMarginRight:function(){return null==b&&k(),g},reliableMarginLeft:function(){return null==b&&k(),h}});function k(){var k,l,m=d.documentElement;m.appendChild(i),j.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",b=e=h=false,c=g=true,a.getComputedStyle&&(l=a.getComputedStyle(j),b="1%"!==(l||{}).top,h="2px"===(l||{}).marginLeft,e="4px"===(l||{width:"4px"}).width,j.style.marginRight="50%",c="4px"===(l||{marginRight:"4px"}).marginRight,k=j.appendChild(d.createElement("div")),k.style.cssText=j.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",k.style.marginRight=k.style.width="0",j.style.width="1px",g=!parseFloat((a.getComputedStyle(k)||{}).marginRight),j.removeChild(k)),j.style.display="none",f=0===j.getClientRects().length,f&&(j.style.display="",j.innerHTML="<table><tr><td></td><td>t</td></tr></table>",j.childNodes[0].style.borderCollapse="separate",k=j.getElementsByTagName("td"),k[0].style.cssText="margin:0;border:0;padding:0;display:none",f=0===k[0].offsetHeight,f&&(k[0].style.display="",k[1].style.display="none",f=0===k[0].offsetHeight)),m.removeChild(i);}}}();var Ra,Sa,Ta=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ra=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Oa.test(g)&&Na.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0===g?g:g+""}):Qa.currentStyle&&(Ra=function(a){return a.currentStyle},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Oa.test(g)&&!Ta.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Ua(a,b){return {get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Va=/alpha\([^)]*\)/i,Wa=/opacity\s*=\s*([^)]*)/i,Xa=/^(none|table(?!-c[ea]).+)/,Ya=new RegExp("^("+T+")(.*)$","i"),Za={position:"absolute",visibility:"hidden",display:"block"},$a={letterSpacing:"0",fontWeight:"400"},_a=["Webkit","O","Moz","ms"],ab=d.createElement("div").style;function bb(a){if(a in ab)return a;var b=a.charAt(0).toUpperCase()+a.slice(1),c=_a.length;while(c--)if(a=_a[c]+b,a in ab)return a}function cb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&W(d)&&(f[g]=n._data(d,"olddisplay",Ma(d.nodeName)))):(e=W(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function db(a,b,c){var d=Ya.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function eb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+V[f],true,e)),d?("content"===c&&(g-=n.css(a,"padding"+V[f],true,e)),"margin"!==c&&(g-=n.css(a,"border"+V[f]+"Width",true,e))):(g+=n.css(a,"padding"+V[f],true,e),"padding"!==c&&(g+=n.css(a,"border"+V[f]+"Width",true,e)));return g}function fb(a,b,c){var d=true,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ra(a),g=l.boxSizing&&"border-box"===n.css(a,"boxSizing",false,f);if(0>=e||null==e){if(e=Sa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Oa.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0;}return e+eb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Sa(a,"opacity");return ""===c?"1":c}}}},cssNumber:{animationIterationCount:true,columnCount:true,fillOpacity:true,flexGrow:true,flexShrink:true,fontWeight:true,lineHeight:true,opacity:true,order:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,false,d))?e:i[b];if(f=typeof c,"string"===f&&(e=U.exec(c))&&e[1]&&(c=X(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c;}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,true,c)),void 0===f&&(f=Sa(a,b,d)),"normal"===f&&b in $a&&(f=$a[b]),""===c||c?(e=parseFloat(f),c===true||isFinite(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Xa.test(n.css(a,"display"))&&0===a.offsetWidth?Pa(a,Za,function(){return fb(a,b,d)}):fb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ra(a);return db(a,c,d?eb(a,b,d,l.boxSizing&&"border-box"===n.css(a,"boxSizing",false,e),e):0)}};}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Wa.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Va,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Va.test(f)?f.replace(Va,e):f+" "+e);}}),n.cssHooks.marginRight=Ua(l.reliableMarginRight,function(a,b){return b?Pa(a,{display:"inline-block"},Sa,[a,"marginRight"]):void 0}),n.cssHooks.marginLeft=Ua(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Sa(a,"marginLeft"))||(n.contains(a.ownerDocument,a)?a.getBoundingClientRect().left-Pa(a,{
		marginLeft:0},function(){return a.getBoundingClientRect().left}):0))+"px":void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+V[d]+b]=f[d]||f[d-2]||f[0];return e}},Na.test(a)||(n.cssHooks[a+b].set=db);}),n.fn.extend({css:function(a,b){return Y(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ra(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],false,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return cb(this,true)},hide:function(){return cb(this)},toggle:function(a){return "boolean"==typeof a?a?this.show():this.hide():this.each(function(){W(this)?n(this).show():n(this).hide();})}});function gb(a,b,c,d,e){return new gb.prototype.init(a,b,c,d,e)}n.Tween=gb,gb.prototype={constructor:gb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px");},cur:function(){var a=gb.propHooks[this.prop];return a&&a.get?a.get(this):gb.propHooks._default.get(this)},run:function(a){var b,c=gb.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):gb.propHooks._default.set(this),this}},gb.prototype.init.prototype=gb.prototype,gb.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit);}}},gb.propHooks.scrollTop=gb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now);}},n.easing={linear:function(a){return a},swing:function(a){return .5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=gb.prototype.init,n.fx.step={};var hb,ib,jb=/^(?:toggle|show|hide)$/,kb=/queueHooks$/;function lb(){return a.setTimeout(function(){hb=void 0;}),hb=n.now()}function mb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=V[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function nb(a,b,c){for(var d,e=(qb.tweeners[b]||[]).concat(qb.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ob(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&W(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i();}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire();});})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k="none"===j?n._data(a,"olddisplay")||Ma(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==Ma(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2];}));for(d in b)if(e=b[d],jb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=true;}o[d]=r&&r[d]||n.style(a,d);}else j=void 0;if(n.isEmptyObject(o))"inline"===("none"===j?Ma(a.nodeName):j)&&(p.display=j);else {r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide();}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b]);});for(d in o)g=nb(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0));}}function pb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e);}else b[d]=e;}function qb(a,b,c){var d,e,f=0,g=qb.prefilters.length,h=n.Deferred().always(function(){delete i.elem;}),i=function(){if(e)return  false;for(var b=hb||lb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),false)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(true,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:hb||lb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=true;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(pb(k,j.opts.specialEasing);g>f;f++)if(d=qb.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,nb,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(qb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return X(c.elem,a,U.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],qb.tweeners[c]=qb.tweeners[c]||[],qb.tweeners[c].unshift(b);},prefilters:[ob],prefilter:function(a,b){b?qb.prefilters.unshift(a):qb.prefilters.push(a);}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==true||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue);},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(W).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=qb(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(true);};return g.finish=g,e||f.queue===false?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c);};return "string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==false&&this.queue(a||"fx",[]),this.each(function(){var b=true,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&kb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=false,f.splice(e,1));!b&&c||n.dequeue(this,a);})},finish:function(a){return a!==false&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=true,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,true),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(true),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish;})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(mb(b,true),a,d,e)};}),n.each({slideDown:mb("show"),slideUp:mb("hide"),slideToggle:mb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)};}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(hb=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),hb=void 0;},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop();},n.fx.interval=13,n.fx.start=function(){ib||(ib=a.setInterval(n.fx.tick,n.fx.interval));},n.fx.stop=function(){a.clearInterval(ib),ib=null;},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e);};})},function(){var a,b=d.createElement("input"),c=d.createElement("div"),e=d.createElement("select"),f=e.appendChild(d.createElement("option"));c=d.createElement("div"),c.setAttribute("className","t"),c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],b.setAttribute("type","checkbox"),c.appendChild(b),a=c.getElementsByTagName("a")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==c.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=f.selected,l.enctype=!!d.createElement("form").enctype,e.disabled=true,l.optDisabled=!f.disabled,b=d.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value;}();var rb=/\r/g,sb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e));});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(sb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b);}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>-1)try{d.selected=c=!0;}catch(h){d.scrollHeight;}else d.selected=false;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value});});var tb,ub,vb=n.expr.attrHandle,wb=/^(?:checked|selected)$/i,xb=l.getSetAttribute,yb=l.input;n.fn.extend({attr:function(a,b){return Y(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a);})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return "undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ub:tb)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?yb&&xb||!wb.test(c)?a[d]=false:a[n.camelCase("default-"+c)]=a[d]=false:n.attr(a,c,""),a.removeAttribute(xb?c:d);}}),ub={set:function(a,b,c){return b===false?n.removeAttr(a,c):yb&&xb||!wb.test(c)?a.setAttribute(!xb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=true,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=vb[b]||n.find.attr;yb&&xb||!wb.test(b)?vb[b]=function(a,b,d){var e,f;return d||(f=vb[b],vb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,vb[b]=f),e}:vb[b]=function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null};}),yb&&xb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):tb&&tb.set(a,b,c)}}),xb||(tb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},vb.id=vb.name=vb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:tb.set},n.attrHooks.contenteditable={set:function(a,b,c){tb.set(a,""===b?false:b,c);}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return ""===c?(a.setAttribute(b,"auto"),c):void 0}};})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var zb=/^(?:input|select|textarea|button|object)$/i,Ab=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return Y(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a];}catch(b){}})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):zb.test(a.nodeName)||Ab.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}};}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this;}),l.enctype||(n.propFix.enctype="encoding");var Bb=/[\t\r\n\f]/g;function Cb(a){return n.attr(a,"class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,Cb(this)));});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&n.attr(c,"class",h);}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,Cb(this)));});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&n.attr(c,"class",h);}}return this},toggleClass:function(a,b){var c=typeof a;return "boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,Cb(this),b),b);}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b);}else void 0!==a&&"boolean"!==c||(b=Cb(this),b&&n._data(this,"__className__",b),n.attr(this,"class",b||a===false?"":n._data(this,"__className__")||""));})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+Cb(c)+" ").replace(Bb," ").indexOf(b)>-1)return  true;return  false}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)};}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Db=a.location,Eb=n.now(),Fb=/\?/,Gb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(Gb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new a.DOMParser,c=d.parseFromString(b,"text/xml")):(c=new a.ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b));}catch(e){c=void 0;}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var Hb=/#.*$/,Ib=/([?&])_=[^&]*/,Jb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Kb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Lb=/^(?:GET|HEAD)$/,Mb=/^\/\//,Nb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ob={},Pb={},Qb="*/".concat("*"),Rb=Db.href,Sb=Nb.exec(Rb.toLowerCase())||[];function Tb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c);}}function Ub(a,b,c,d){var e={},f=a===Pb;function g(h){var i;return e[h]=true,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return "string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),false)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Vb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b) void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(true,a,c),a}function Wb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else {for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g);}f=f||d;}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Xb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===true?g=j[e]:j[e]!==true&&(f=h[0],k.unshift(h[1]));break}if(g!==true)if(g&&a["throws"])b=g(b);else try{b=g(b);}catch(l){return {state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return {state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Rb,type:"GET",isLocal:Kb.test(Sb[1]),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Qb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":true,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:true,context:true}},ajaxSetup:function(a,b){return b?Vb(Vb(a,n.ajaxSettings),b):Vb(n.ajaxSettings,a)},ajaxPrefilter:Tb(Ob),ajaxTransport:Tb(Pb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var d,e,f,g,h,i,j,k,l=n.ajaxSetup({},c),m=l.context||l,o=l.context&&(m.nodeType||m.jquery)?n(m):n.event,p=n.Deferred(),q=n.Callbacks("once memory"),r=l.statusCode||{},s={},t={},u=0,v="canceled",w={readyState:0,getResponseHeader:function(a){var b;if(2===u){if(!k){k={};while(b=Jb.exec(g))k[b[1].toLowerCase()]=b[2];}b=k[a.toLowerCase()];}return null==b?null:b},getAllResponseHeaders:function(){return 2===u?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return u||(a=t[c]=t[c]||a,s[a]=b),this},overrideMimeType:function(a){return u||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>u)for(b in a)r[b]=[r[b],a[b]];else w.always(a[w.status]);return this},abort:function(a){var b=a||v;return j&&j.abort(b),y(0,b),this}};if(p.promise(w).complete=q.add,w.success=w.done,w.error=w.fail,l.url=((b||l.url||Rb)+"").replace(Hb,"").replace(Mb,Sb[1]+"//"),l.type=c.method||c.type||l.method||l.type,l.dataTypes=n.trim(l.dataType||"*").toLowerCase().match(G)||[""],null==l.crossDomain&&(d=Nb.exec(l.url.toLowerCase()),l.crossDomain=!(!d||d[1]===Sb[1]&&d[2]===Sb[2]&&(d[3]||("http:"===d[1]?"80":"443"))===(Sb[3]||("http:"===Sb[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=n.param(l.data,l.traditional)),Ub(Ob,l,c,w),2===u)return w;i=n.event&&l.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!Lb.test(l.type),f=l.url,l.hasContent||(l.data&&(f=l.url+=(Fb.test(f)?"&":"?")+l.data,delete l.data),l.cache===false&&(l.url=Ib.test(f)?f.replace(Ib,"$1_="+Eb++):f+(Fb.test(f)?"&":"?")+"_="+Eb++)),l.ifModified&&(n.lastModified[f]&&w.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&w.setRequestHeader("If-None-Match",n.etag[f])),(l.data&&l.hasContent&&l.contentType!==false||c.contentType)&&w.setRequestHeader("Content-Type",l.contentType),w.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+Qb+"; q=0.01":""):l.accepts["*"]);for(e in l.headers)w.setRequestHeader(e,l.headers[e]);if(l.beforeSend&&(l.beforeSend.call(m,w,l)===false||2===u))return w.abort();v="abort";for(e in {success:1,error:1,complete:1})w[e](l[e]);if(j=Ub(Pb,l,c,w)){if(w.readyState=1,i&&o.trigger("ajaxSend",[w,l]),2===u)return w;l.async&&l.timeout>0&&(h=a.setTimeout(function(){w.abort("timeout");},l.timeout));try{u=1,j.send(s,y);}catch(x){if(!(2>u))throw x;y(-1,x);}}else y(-1,"No Transport");function y(b,c,d,e){var k,s,t,v,x,y=c;2!==u&&(u=2,h&&a.clearTimeout(h),j=void 0,g=e||"",w.readyState=b>0?4:0,k=b>=200&&300>b||304===b,d&&(v=Wb(l,w,d)),v=Xb(l,v,w,k),k?(l.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(n.lastModified[f]=x),x=w.getResponseHeader("etag"),x&&(n.etag[f]=x)),204===b||"HEAD"===l.type?y="nocontent":304===b?y="notmodified":(y=v.state,s=v.data,t=v.error,k=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),w.status=b,w.statusText=(c||y)+"",k?p.resolveWith(m,[s,y,w]):p.rejectWith(m,[w,y,t]),w.statusCode(r),r=void 0,i&&o.trigger(k?"ajaxSuccess":"ajaxError",[w,l,k?s:t]),q.fireWith(m,[w,y]),i&&(o.trigger("ajaxComplete",[w,l]),--n.active||n.event.trigger("ajaxStop")));}return w},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))};}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",cache:true,async:false,global:false,"throws":true})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b));});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this);}return this},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b));}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a);})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a);})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes);}).end()}});function Yb(a){return a.style&&a.style.display||n.css(a,"display")}function Zb(a){if(!n.contains(a.ownerDocument||d,a))return  true;while(a&&1===a.nodeType){if("none"===Yb(a)||"hidden"===a.type)return  true;a=a.parentNode;}return  false}n.expr.filters.hidden=function(a){return l.reliableHiddenOffsets()?a.offsetWidth<=0&&a.offsetHeight<=0&&!a.getClientRects().length:Zb(a)},n.expr.filters.visible=function(a){return !n.expr.filters.hidden(a)};var $b=/%20/g,_b=/\[\]$/,ac=/\r?\n/g,bc=/^(?:submit|button|image|reset|file)$/i,cc=/^(?:input|select|textarea|keygen)/i;function dc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||_b.test(a)?d(a,e):dc(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d);});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)dc(a+"["+e+"]",b[e],c,d);}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b);};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value);});else for(c in a)dc(c,a[c],b,e);return d.join("&").replace($b,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&cc.test(this.nodeName)&&!bc.test(a)&&(this.checked||!Z.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return {name:b.name,value:a.replace(ac,"\r\n")}}):{name:b.name,value:c.replace(ac,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return this.isLocal?ic():d.documentMode>8?hc():/^(get|post|head|put|delete|options)$/i.test(this.type)&&hc()||ic()}:hc;var ec=0,fc={},gc=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in fc)fc[a](void 0,true);}),l.cors=!!gc&&"withCredentials"in gc,gc=l.ajax=!!gc,gc&&n.ajaxTransport(function(b){if(!b.crossDomain||l.cors){var c;return {send:function(d,e){var f,g=b.xhr(),h=++ec;if(g.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(f in b.xhrFields)g[f]=b.xhrFields[f];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType),b.crossDomain||d["X-Requested-With"]||(d["X-Requested-With"]="XMLHttpRequest");for(f in d) void 0!==d[f]&&g.setRequestHeader(f,d[f]+"");g.send(b.hasContent&&b.data||null),c=function(a,d){var f,i,j;if(c&&(d||4===g.readyState))if(delete fc[h],c=void 0,g.onreadystatechange=n.noop,d)4!==g.readyState&&g.abort();else {j={},f=g.status,"string"==typeof g.responseText&&(j.text=g.responseText);try{i=g.statusText;}catch(k){i="";}f||!b.isLocal||b.crossDomain?1223===f&&(f=204):f=j.text?200:404;}j&&e(f,i,j,g.getAllResponseHeaders());},b.async?4===g.readyState?a.setTimeout(c):g.onreadystatechange=fc[h]=c:c();},abort:function(){c&&c(void 0,true);}}}});function hc(){try{return new a.XMLHttpRequest}catch(b){}}function ic(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){ void 0===a.cache&&(a.cache=false),a.crossDomain&&(a.type="GET",a.global=false);}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=d.head||n("head")[0]||d.documentElement;return {send:function(e,f){b=d.createElement("script"),b.async=true,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||f(200,"success"));},c.insertBefore(b,c.firstChild);},abort:function(){b&&b.onload(void 0,true);}}}});var jc=[],kc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=jc.pop()||n.expando+"_"+Eb++;return this[a]=true,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==false&&(kc.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&kc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(kc,"$1"+e):b.jsonp!==false&&(b.url+=(Fb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments;},d.always(function(){ void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,jc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0;}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=false),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ja([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var lc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&lc)return lc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h,a.length)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a);}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a]);});}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)};}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function mc(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:false}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m);}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b);});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?("undefined"!=typeof e.getBoundingClientRect&&(d=e.getBoundingClientRect()),c=mc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return "fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",true),c.left+=n.css(a[0],"borderLeftWidth",true)),{top:b.top-c.top-n.css(d,"marginTop",true),left:b.left-c.left-n.css(d,"marginLeft",true)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Qa})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return Y(this,function(a,d,e){var f=mc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)};}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ua(l.pixelPosition,function(a,c){return c?(c=Sa(a,b),Oa.test(c)?n(a).position()[b]+"px":c):void 0});}),n.each({Height:"height",Width:"width"},function(a,b){n.each({
		padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===true||e===true?"margin":"border");return Y(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)};});}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack;var nc=a.jQuery,oc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=oc),b&&a.jQuery===n&&(a.jQuery=nc),n},b||(a.jQuery=a.$=n),n}); 
	} (jquery1_12_4_min));

	var jquery1_12_4_minExports = jquery1_12_4_min.exports;
	var $ = /*@__PURE__*/getDefaultExportFromCjs(jquery1_12_4_minExports);

	var Readability$1 = {exports: {}};

	/*
	 * Copyright (c) 2010 Arc90 Inc
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	(function (module) {
		/*
		 * This code is heavily based on Arc90's readability.js (1.7.1) script
		 * available at: http://code.google.com/p/arc90labs-readability
		 */

		/**
		 * Public constructor.
		 * @param {HTMLDocument} doc     The document to parse.
		 * @param {Object}       options The options object.
		 */
		function Readability(doc, options) {
		  // In some older versions, people passed a URI as the first argument. Cope:
		  if (options && options.documentElement) {
		    doc = options;
		    options = arguments[2];
		  } else if (!doc || !doc.documentElement) {
		    throw new Error(
		      "First argument to Readability constructor should be a document object."
		    );
		  }
		  options = options || {};

		  this._doc = doc;
		  this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__;
		  this._articleTitle = null;
		  this._articleByline = null;
		  this._articleDir = null;
		  this._articleSiteName = null;
		  this._attempts = [];

		  // Configurable options
		  this._debug = !!options.debug;
		  this._maxElemsToParse =
		    options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
		  this._nbTopCandidates =
		    options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
		  this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
		  this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(
		    options.classesToPreserve || []
		  );
		  this._keepClasses = !!options.keepClasses;
		  this._serializer =
		    options.serializer ||
		    function (el) {
		      return el.innerHTML;
		    };
		  this._disableJSONLD = !!options.disableJSONLD;
		  this._allowedVideoRegex = options.allowedVideoRegex || this.REGEXPS.videos;

		  // Start with all flags set
		  this._flags =
		    this.FLAG_STRIP_UNLIKELYS |
		    this.FLAG_WEIGHT_CLASSES |
		    this.FLAG_CLEAN_CONDITIONALLY;

		  // Control whether log messages are sent to the console
		  if (this._debug) {
		    let logNode = function (node) {
		      if (node.nodeType == node.TEXT_NODE) {
		        return `${node.nodeName} ("${node.textContent}")`;
		      }
		      let attrPairs = Array.from(node.attributes || [], function (attr) {
		        return `${attr.name}="${attr.value}"`;
		      }).join(" ");
		      return `<${node.localName} ${attrPairs}>`;
		    };
		    this.log = function () {
		      if (typeof console !== "undefined") {
		        let args = Array.from(arguments, (arg) => {
		          if (arg && arg.nodeType == this.ELEMENT_NODE) {
		            return logNode(arg);
		          }
		          return arg;
		        });
		        args.unshift("Reader: (Readability)");
		        console.log.apply(console, args);
		      } else if (typeof dump !== "undefined") {
		        /* global dump */
		        var msg = Array.prototype.map
		          .call(arguments, function (x) {
		            return x && x.nodeName ? logNode(x) : x;
		          })
		          .join(" ");
		        dump("Reader: (Readability) " + msg + "\n");
		      }
		    };
		  } else {
		    this.log = function () {};
		  }
		}

		Readability.prototype = {
		  FLAG_STRIP_UNLIKELYS: 0x1,
		  FLAG_WEIGHT_CLASSES: 0x2,
		  FLAG_CLEAN_CONDITIONALLY: 0x4,

		  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
		  ELEMENT_NODE: 1,
		  TEXT_NODE: 3,

		  // Max number of nodes supported by this parser. Default: 0 (no limit)
		  DEFAULT_MAX_ELEMS_TO_PARSE: 0,

		  // The number of top candidates to consider when analysing how
		  // tight the competition is among candidates.
		  DEFAULT_N_TOP_CANDIDATES: 5,

		  // Element tags to score by default.
		  DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre"
		    .toUpperCase()
		    .split(","),

		  // The default number of chars an article must have in order to return a result
		  DEFAULT_CHAR_THRESHOLD: 500,

		  // All of the regular expressions in use within readability.
		  // Defined up here so we don't instantiate them repeatedly in loops.
		  REGEXPS: {
		    // NOTE: These two regular expressions are duplicated in
		    // Readability-readerable.js. Please keep both copies in sync.
		    unlikelyCandidates:
		      /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
		    okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,

		    positive:
		      /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
		    negative:
		      /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
		    extraneous:
		      /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
		    byline: /byline|author|dateline|writtenby|p-author/i,
		    replaceFonts: /<(\/?)font[^>]*>/gi,
		    normalize: /\s{2,}/g,
		    videos:
		      /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
		    shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
		    nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
		    prevLink: /(prev|earl|old|new|<|«)/i,
		    tokenize: /\W+/g,
		    whitespace: /^\s*$/,
		    hasContent: /\S$/,
		    hashUrl: /^#.+/,
		    srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
		    b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
		    // Commas as used in Latin, Sindhi, Chinese and various other scripts.
		    // see: https://en.wikipedia.org/wiki/Comma#Comma_variants
		    commas: /\u002C|\u060C|\uFE50|\uFE10|\uFE11|\u2E41|\u2E34|\u2E32|\uFF0C/g,
		    // See: https://schema.org/Article
		    jsonLdArticleTypes:
		      /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/,
		  },

		  UNLIKELY_ROLES: [
		    "menu",
		    "menubar",
		    "complementary",
		    "navigation",
		    "alert",
		    "alertdialog",
		    "dialog",
		  ],

		  DIV_TO_P_ELEMS: new Set([
		    "BLOCKQUOTE",
		    "DL",
		    "DIV",
		    "IMG",
		    "OL",
		    "P",
		    "PRE",
		    "TABLE",
		    "UL",
		  ]),

		  ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],

		  PRESENTATIONAL_ATTRIBUTES: [
		    "align",
		    "background",
		    "bgcolor",
		    "border",
		    "cellpadding",
		    "cellspacing",
		    "frame",
		    "hspace",
		    "rules",
		    "style",
		    "valign",
		    "vspace",
		  ],

		  DEPRECATED_SIZE_ATTRIBUTE_ELEMS: ["TABLE", "TH", "TD", "HR", "PRE"],

		  // The commented out elements qualify as phrasing content but tend to be
		  // removed by readability when put into paragraphs, so we ignore them here.
		  PHRASING_ELEMS: [
		    // "CANVAS", "IFRAME", "SVG", "VIDEO",
		    "ABBR",
		    "AUDIO",
		    "B",
		    "BDO",
		    "BR",
		    "BUTTON",
		    "CITE",
		    "CODE",
		    "DATA",
		    "DATALIST",
		    "DFN",
		    "EM",
		    "EMBED",
		    "I",
		    "IMG",
		    "INPUT",
		    "KBD",
		    "LABEL",
		    "MARK",
		    "MATH",
		    "METER",
		    "NOSCRIPT",
		    "OBJECT",
		    "OUTPUT",
		    "PROGRESS",
		    "Q",
		    "RUBY",
		    "SAMP",
		    "SCRIPT",
		    "SELECT",
		    "SMALL",
		    "SPAN",
		    "STRONG",
		    "SUB",
		    "SUP",
		    "TEXTAREA",
		    "TIME",
		    "VAR",
		    "WBR",
		  ],

		  // These are the classes that readability sets itself.
		  CLASSES_TO_PRESERVE: ["page"],

		  // These are the list of HTML entities that need to be escaped.
		  HTML_ESCAPE_MAP: {
		    lt: "<",
		    gt: ">",
		    amp: "&",
		    quot: '"',
		    apos: "'",
		  },

		  /**
		   * Run any post-process modifications to article content as necessary.
		   *
		   * @param Element
		   * @return void
		   **/
		  _postProcessContent: function (articleContent) {
		    // Readability cannot open relative uris so we convert them to absolute uris.
		    this._fixRelativeUris(articleContent);

		    this._simplifyNestedElements(articleContent);

		    if (!this._keepClasses) {
		      // Remove classes.
		      this._cleanClasses(articleContent);
		    }
		  },

		  /**
		   * Iterates over a NodeList, calls `filterFn` for each node and removes node
		   * if function returned `true`.
		   *
		   * If function is not passed, removes all the nodes in node list.
		   *
		   * @param NodeList nodeList The nodes to operate on
		   * @param Function filterFn the function to use as a filter
		   * @return void
		   */
		  _removeNodes: function (nodeList, filterFn) {
		    // Avoid ever operating on live node lists.
		    if (this._docJSDOMParser && nodeList._isLiveNodeList) {
		      throw new Error("Do not pass live node lists to _removeNodes");
		    }
		    for (var i = nodeList.length - 1; i >= 0; i--) {
		      var node = nodeList[i];
		      var parentNode = node.parentNode;
		      if (parentNode) {
		        if (!filterFn || filterFn.call(this, node, i, nodeList)) {
		          parentNode.removeChild(node);
		        }
		      }
		    }
		  },

		  /**
		   * Iterates over a NodeList, and calls _setNodeTag for each node.
		   *
		   * @param NodeList nodeList The nodes to operate on
		   * @param String newTagName the new tag name to use
		   * @return void
		   */
		  _replaceNodeTags: function (nodeList, newTagName) {
		    // Avoid ever operating on live node lists.
		    if (this._docJSDOMParser && nodeList._isLiveNodeList) {
		      throw new Error("Do not pass live node lists to _replaceNodeTags");
		    }
		    for (const node of nodeList) {
		      this._setNodeTag(node, newTagName);
		    }
		  },

		  /**
		   * Iterate over a NodeList, which doesn't natively fully implement the Array
		   * interface.
		   *
		   * For convenience, the current object context is applied to the provided
		   * iterate function.
		   *
		   * @param  NodeList nodeList The NodeList.
		   * @param  Function fn       The iterate function.
		   * @return void
		   */
		  _forEachNode: function (nodeList, fn) {
		    Array.prototype.forEach.call(nodeList, fn, this);
		  },

		  /**
		   * Iterate over a NodeList, and return the first node that passes
		   * the supplied test function
		   *
		   * For convenience, the current object context is applied to the provided
		   * test function.
		   *
		   * @param  NodeList nodeList The NodeList.
		   * @param  Function fn       The test function.
		   * @return void
		   */
		  _findNode: function (nodeList, fn) {
		    return Array.prototype.find.call(nodeList, fn, this);
		  },

		  /**
		   * Iterate over a NodeList, return true if any of the provided iterate
		   * function calls returns true, false otherwise.
		   *
		   * For convenience, the current object context is applied to the
		   * provided iterate function.
		   *
		   * @param  NodeList nodeList The NodeList.
		   * @param  Function fn       The iterate function.
		   * @return Boolean
		   */
		  _someNode: function (nodeList, fn) {
		    return Array.prototype.some.call(nodeList, fn, this);
		  },

		  /**
		   * Iterate over a NodeList, return true if all of the provided iterate
		   * function calls return true, false otherwise.
		   *
		   * For convenience, the current object context is applied to the
		   * provided iterate function.
		   *
		   * @param  NodeList nodeList The NodeList.
		   * @param  Function fn       The iterate function.
		   * @return Boolean
		   */
		  _everyNode: function (nodeList, fn) {
		    return Array.prototype.every.call(nodeList, fn, this);
		  },

		  /**
		   * Concat all nodelists passed as arguments.
		   *
		   * @return ...NodeList
		   * @return Array
		   */
		  _concatNodeLists: function () {
		    var slice = Array.prototype.slice;
		    var args = slice.call(arguments);
		    var nodeLists = args.map(function (list) {
		      return slice.call(list);
		    });
		    return Array.prototype.concat.apply([], nodeLists);
		  },

		  _getAllNodesWithTag: function (node, tagNames) {
		    if (node.querySelectorAll) {
		      return node.querySelectorAll(tagNames.join(","));
		    }
		    return [].concat.apply(
		      [],
		      tagNames.map(function (tag) {
		        var collection = node.getElementsByTagName(tag);
		        return Array.isArray(collection) ? collection : Array.from(collection);
		      })
		    );
		  },

		  /**
		   * Removes the class="" attribute from every element in the given
		   * subtree, except those that match CLASSES_TO_PRESERVE and
		   * the classesToPreserve array from the options object.
		   *
		   * @param Element
		   * @return void
		   */
		  _cleanClasses: function (node) {
		    var classesToPreserve = this._classesToPreserve;
		    var className = (node.getAttribute("class") || "")
		      .split(/\s+/)
		      .filter(function (cls) {
		        return classesToPreserve.indexOf(cls) != -1;
		      })
		      .join(" ");

		    if (className) {
		      node.setAttribute("class", className);
		    } else {
		      node.removeAttribute("class");
		    }

		    for (node = node.firstElementChild; node; node = node.nextElementSibling) {
		      this._cleanClasses(node);
		    }
		  },

		  /**
		   * Converts each <a> and <img> uri in the given element to an absolute URI,
		   * ignoring #ref URIs.
		   *
		   * @param Element
		   * @return void
		   */
		  _fixRelativeUris: function (articleContent) {
		    var baseURI = this._doc.baseURI;
		    var documentURI = this._doc.documentURI;
		    function toAbsoluteURI(uri) {
		      // Leave hash links alone if the base URI matches the document URI:
		      if (baseURI == documentURI && uri.charAt(0) == "#") {
		        return uri;
		      }

		      // Otherwise, resolve against base URI:
		      try {
		        return new URL(uri, baseURI).href;
		      } catch (ex) {
		        // Something went wrong, just return the original:
		      }
		      return uri;
		    }

		    var links = this._getAllNodesWithTag(articleContent, ["a"]);
		    this._forEachNode(links, function (link) {
		      var href = link.getAttribute("href");
		      if (href) {
		        // Remove links with javascript: URIs, since
		        // they won't work after scripts have been removed from the page.
		        if (href.indexOf("javascript:") === 0) {
		          // if the link only contains simple text content, it can be converted to a text node
		          if (
		            link.childNodes.length === 1 &&
		            link.childNodes[0].nodeType === this.TEXT_NODE
		          ) {
		            var text = this._doc.createTextNode(link.textContent);
		            link.parentNode.replaceChild(text, link);
		          } else {
		            // if the link has multiple children, they should all be preserved
		            var container = this._doc.createElement("span");
		            while (link.firstChild) {
		              container.appendChild(link.firstChild);
		            }
		            link.parentNode.replaceChild(container, link);
		          }
		        } else {
		          link.setAttribute("href", toAbsoluteURI(href));
		        }
		      }
		    });

		    var medias = this._getAllNodesWithTag(articleContent, [
		      "img",
		      "picture",
		      "figure",
		      "video",
		      "audio",
		      "source",
		    ]);

		    this._forEachNode(medias, function (media) {
		      var src = media.getAttribute("src");
		      var poster = media.getAttribute("poster");
		      var srcset = media.getAttribute("srcset");

		      if (src) {
		        media.setAttribute("src", toAbsoluteURI(src));
		      }

		      if (poster) {
		        media.setAttribute("poster", toAbsoluteURI(poster));
		      }

		      if (srcset) {
		        var newSrcset = srcset.replace(
		          this.REGEXPS.srcsetUrl,
		          function (_, p1, p2, p3) {
		            return toAbsoluteURI(p1) + (p2 || "") + p3;
		          }
		        );

		        media.setAttribute("srcset", newSrcset);
		      }
		    });
		  },

		  _simplifyNestedElements: function (articleContent) {
		    var node = articleContent;

		    while (node) {
		      if (
		        node.parentNode &&
		        ["DIV", "SECTION"].includes(node.tagName) &&
		        !(node.id && node.id.startsWith("readability"))
		      ) {
		        if (this._isElementWithoutContent(node)) {
		          node = this._removeAndGetNext(node);
		          continue;
		        } else if (
		          this._hasSingleTagInsideElement(node, "DIV") ||
		          this._hasSingleTagInsideElement(node, "SECTION")
		        ) {
		          var child = node.children[0];
		          for (var i = 0; i < node.attributes.length; i++) {
		            child.setAttribute(
		              node.attributes[i].name,
		              node.attributes[i].value
		            );
		          }
		          node.parentNode.replaceChild(child, node);
		          node = child;
		          continue;
		        }
		      }

		      node = this._getNextNode(node);
		    }
		  },

		  /**
		   * Get the article title as an H1.
		   *
		   * @return string
		   **/
		  _getArticleTitle: function () {
		    var doc = this._doc;
		    var curTitle = "";
		    var origTitle = "";

		    try {
		      curTitle = origTitle = doc.title.trim();

		      // If they had an element with id "title" in their HTML
		      if (typeof curTitle !== "string")
		        curTitle = origTitle = this._getInnerText(
		          doc.getElementsByTagName("title")[0]
		        );
		    } catch (e) {
		      /* ignore exceptions setting the title. */
		    }

		    var titleHadHierarchicalSeparators = false;
		    function wordCount(str) {
		      return str.split(/\s+/).length;
		    }

		    // If there's a separator in the title, first remove the final part
		    if (/ [\|\-\\\/>»] /.test(curTitle)) {
		      titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
		      curTitle = origTitle.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1");

		      // If the resulting title is too short (3 words or fewer), remove
		      // the first part instead:
		      if (wordCount(curTitle) < 3)
		        curTitle = origTitle.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1");
		    } else if (curTitle.indexOf(": ") !== -1) {
		      // Check if we have an heading containing this exact string, so we
		      // could assume it's the full title.
		      var headings = this._concatNodeLists(
		        doc.getElementsByTagName("h1"),
		        doc.getElementsByTagName("h2")
		      );
		      var trimmedTitle = curTitle.trim();
		      var match = this._someNode(headings, function (heading) {
		        return heading.textContent.trim() === trimmedTitle;
		      });

		      // If we don't, let's extract the title out of the original title string.
		      if (!match) {
		        curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);

		        // If the title is now too short, try the first colon instead:
		        if (wordCount(curTitle) < 3) {
		          curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
		          // But if we have too many words before the colon there's something weird
		          // with the titles and the H tags so let's just use the original title instead
		        } else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) {
		          curTitle = origTitle;
		        }
		      }
		    } else if (curTitle.length > 150 || curTitle.length < 15) {
		      var hOnes = doc.getElementsByTagName("h1");

		      if (hOnes.length === 1) curTitle = this._getInnerText(hOnes[0]);
		    }

		    curTitle = curTitle.trim().replace(this.REGEXPS.normalize, " ");
		    // If we now have 4 words or fewer as our title, and either no
		    // 'hierarchical' separators (\, /, > or ») were found in the original
		    // title or we decreased the number of words by more than 1 word, use
		    // the original title.
		    var curTitleWordCount = wordCount(curTitle);
		    if (
		      curTitleWordCount <= 4 &&
		      (!titleHadHierarchicalSeparators ||
		        curTitleWordCount !=
		          wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)
		    ) {
		      curTitle = origTitle;
		    }

		    return curTitle;
		  },

		  /**
		   * Prepare the HTML document for readability to scrape it.
		   * This includes things like stripping javascript, CSS, and handling terrible markup.
		   *
		   * @return void
		   **/
		  _prepDocument: function () {
		    var doc = this._doc;

		    // Remove all style tags in head
		    this._removeNodes(this._getAllNodesWithTag(doc, ["style"]));

		    if (doc.body) {
		      this._replaceBrs(doc.body);
		    }

		    this._replaceNodeTags(this._getAllNodesWithTag(doc, ["font"]), "SPAN");
		  },

		  /**
		   * Finds the next node, starting from the given node, and ignoring
		   * whitespace in between. If the given node is an element, the same node is
		   * returned.
		   */
		  _nextNode: function (node) {
		    var next = node;
		    while (
		      next &&
		      next.nodeType != this.ELEMENT_NODE &&
		      this.REGEXPS.whitespace.test(next.textContent)
		    ) {
		      next = next.nextSibling;
		    }
		    return next;
		  },

		  /**
		   * Replaces 2 or more successive <br> elements with a single <p>.
		   * Whitespace between <br> elements are ignored. For example:
		   *   <div>foo<br>bar<br> <br><br>abc</div>
		   * will become:
		   *   <div>foo<br>bar<p>abc</p></div>
		   */
		  _replaceBrs: function (elem) {
		    this._forEachNode(this._getAllNodesWithTag(elem, ["br"]), function (br) {
		      var next = br.nextSibling;

		      // Whether 2 or more <br> elements have been found and replaced with a
		      // <p> block.
		      var replaced = false;

		      // If we find a <br> chain, remove the <br>s until we hit another node
		      // or non-whitespace. This leaves behind the first <br> in the chain
		      // (which will be replaced with a <p> later).
		      while ((next = this._nextNode(next)) && next.tagName == "BR") {
		        replaced = true;
		        var brSibling = next.nextSibling;
		        next.parentNode.removeChild(next);
		        next = brSibling;
		      }

		      // If we removed a <br> chain, replace the remaining <br> with a <p>. Add
		      // all sibling nodes as children of the <p> until we hit another <br>
		      // chain.
		      if (replaced) {
		        var p = this._doc.createElement("p");
		        br.parentNode.replaceChild(p, br);

		        next = p.nextSibling;
		        while (next) {
		          // If we've hit another <br><br>, we're done adding children to this <p>.
		          if (next.tagName == "BR") {
		            var nextElem = this._nextNode(next.nextSibling);
		            if (nextElem && nextElem.tagName == "BR") break;
		          }

		          if (!this._isPhrasingContent(next)) break;

		          // Otherwise, make this node a child of the new <p>.
		          var sibling = next.nextSibling;
		          p.appendChild(next);
		          next = sibling;
		        }

		        while (p.lastChild && this._isWhitespace(p.lastChild)) {
		          p.removeChild(p.lastChild);
		        }

		        if (p.parentNode.tagName === "P") this._setNodeTag(p.parentNode, "DIV");
		      }
		    });
		  },

		  _setNodeTag: function (node, tag) {
		    this.log("_setNodeTag", node, tag);
		    if (this._docJSDOMParser) {
		      node.localName = tag.toLowerCase();
		      node.tagName = tag.toUpperCase();
		      return node;
		    }

		    var replacement = node.ownerDocument.createElement(tag);
		    while (node.firstChild) {
		      replacement.appendChild(node.firstChild);
		    }
		    node.parentNode.replaceChild(replacement, node);
		    if (node.readability) replacement.readability = node.readability;

		    for (var i = 0; i < node.attributes.length; i++) {
		      try {
		        replacement.setAttribute(
		          node.attributes[i].name,
		          node.attributes[i].value
		        );
		      } catch (ex) {
		        /* it's possible for setAttribute() to throw if the attribute name
		         * isn't a valid XML Name. Such attributes can however be parsed from
		         * source in HTML docs, see https://github.com/whatwg/html/issues/4275,
		         * so we can hit them here and then throw. We don't care about such
		         * attributes so we ignore them.
		         */
		      }
		    }
		    return replacement;
		  },

		  /**
		   * Prepare the article node for display. Clean out any inline styles,
		   * iframes, forms, strip extraneous <p> tags, etc.
		   *
		   * @param Element
		   * @return void
		   **/
		  _prepArticle: function (articleContent) {
		    this._cleanStyles(articleContent);

		    // Check for data tables before we continue, to avoid removing items in
		    // those tables, which will often be isolated even though they're
		    // visually linked to other content-ful elements (text, images, etc.).
		    this._markDataTables(articleContent);

		    this._fixLazyImages(articleContent);

		    // Clean out junk from the article content
		    this._cleanConditionally(articleContent, "form");
		    this._cleanConditionally(articleContent, "fieldset");
		    this._clean(articleContent, "object");
		    this._clean(articleContent, "embed");
		    this._clean(articleContent, "footer");
		    this._clean(articleContent, "link");
		    this._clean(articleContent, "aside");

		    // Clean out elements with little content that have "share" in their id/class combinations from final top candidates,
		    // which means we don't remove the top candidates even they have "share".

		    var shareElementThreshold = this.DEFAULT_CHAR_THRESHOLD;

		    this._forEachNode(articleContent.children, function (topCandidate) {
		      this._cleanMatchedNodes(topCandidate, function (node, matchString) {
		        return (
		          this.REGEXPS.shareElements.test(matchString) &&
		          node.textContent.length < shareElementThreshold
		        );
		      });
		    });

		    this._clean(articleContent, "iframe");
		    this._clean(articleContent, "input");
		    this._clean(articleContent, "textarea");
		    this._clean(articleContent, "select");
		    this._clean(articleContent, "button");
		    this._cleanHeaders(articleContent);

		    // Do these last as the previous stuff may have removed junk
		    // that will affect these
		    this._cleanConditionally(articleContent, "table");
		    this._cleanConditionally(articleContent, "ul");
		    this._cleanConditionally(articleContent, "div");

		    // replace H1 with H2 as H1 should be only title that is displayed separately
		    this._replaceNodeTags(
		      this._getAllNodesWithTag(articleContent, ["h1"]),
		      "h2"
		    );

		    // Remove extra paragraphs
		    this._removeNodes(
		      this._getAllNodesWithTag(articleContent, ["p"]),
		      function (paragraph) {
		        var imgCount = paragraph.getElementsByTagName("img").length;
		        var embedCount = paragraph.getElementsByTagName("embed").length;
		        var objectCount = paragraph.getElementsByTagName("object").length;
		        // At this point, nasty iframes have been removed, only remain embedded video ones.
		        var iframeCount = paragraph.getElementsByTagName("iframe").length;
		        var totalCount = imgCount + embedCount + objectCount + iframeCount;

		        return totalCount === 0 && !this._getInnerText(paragraph, false);
		      }
		    );

		    this._forEachNode(
		      this._getAllNodesWithTag(articleContent, ["br"]),
		      function (br) {
		        var next = this._nextNode(br.nextSibling);
		        if (next && next.tagName == "P") br.parentNode.removeChild(br);
		      }
		    );

		    // Remove single-cell tables
		    this._forEachNode(
		      this._getAllNodesWithTag(articleContent, ["table"]),
		      function (table) {
		        var tbody = this._hasSingleTagInsideElement(table, "TBODY")
		          ? table.firstElementChild
		          : table;
		        if (this._hasSingleTagInsideElement(tbody, "TR")) {
		          var row = tbody.firstElementChild;
		          if (this._hasSingleTagInsideElement(row, "TD")) {
		            var cell = row.firstElementChild;
		            cell = this._setNodeTag(
		              cell,
		              this._everyNode(cell.childNodes, this._isPhrasingContent)
		                ? "P"
		                : "DIV"
		            );
		            table.parentNode.replaceChild(cell, table);
		          }
		        }
		      }
		    );
		  },

		  /**
		   * Initialize a node with the readability object. Also checks the
		   * className/id for special names to add to its score.
		   *
		   * @param Element
		   * @return void
		   **/
		  _initializeNode: function (node) {
		    node.readability = { contentScore: 0 };

		    switch (node.tagName) {
		      case "DIV":
		        node.readability.contentScore += 5;
		        break;

		      case "PRE":
		      case "TD":
		      case "BLOCKQUOTE":
		        node.readability.contentScore += 3;
		        break;

		      case "ADDRESS":
		      case "OL":
		      case "UL":
		      case "DL":
		      case "DD":
		      case "DT":
		      case "LI":
		      case "FORM":
		        node.readability.contentScore -= 3;
		        break;

		      case "H1":
		      case "H2":
		      case "H3":
		      case "H4":
		      case "H5":
		      case "H6":
		      case "TH":
		        node.readability.contentScore -= 5;
		        break;
		    }

		    node.readability.contentScore += this._getClassWeight(node);
		  },

		  _removeAndGetNext: function (node) {
		    var nextNode = this._getNextNode(node, true);
		    node.parentNode.removeChild(node);
		    return nextNode;
		  },

		  /**
		   * Traverse the DOM from node to node, starting at the node passed in.
		   * Pass true for the second parameter to indicate this node itself
		   * (and its kids) are going away, and we want the next node over.
		   *
		   * Calling this in a loop will traverse the DOM depth-first.
		   */
		  _getNextNode: function (node, ignoreSelfAndKids) {
		    // First check for kids if those aren't being ignored
		    if (!ignoreSelfAndKids && node.firstElementChild) {
		      return node.firstElementChild;
		    }
		    // Then for siblings...
		    if (node.nextElementSibling) {
		      return node.nextElementSibling;
		    }
		    // And finally, move up the parent chain *and* find a sibling
		    // (because this is depth-first traversal, we will have already
		    // seen the parent nodes themselves).
		    do {
		      node = node.parentNode;
		    } while (node && !node.nextElementSibling);
		    return node && node.nextElementSibling;
		  },

		  // compares second text to first one
		  // 1 = same text, 0 = completely different text
		  // works the way that it splits both texts into words and then finds words that are unique in second text
		  // the result is given by the lower length of unique parts
		  _textSimilarity: function (textA, textB) {
		    var tokensA = textA
		      .toLowerCase()
		      .split(this.REGEXPS.tokenize)
		      .filter(Boolean);
		    var tokensB = textB
		      .toLowerCase()
		      .split(this.REGEXPS.tokenize)
		      .filter(Boolean);
		    if (!tokensA.length || !tokensB.length) {
		      return 0;
		    }
		    var uniqTokensB = tokensB.filter((token) => !tokensA.includes(token));
		    var distanceB = uniqTokensB.join(" ").length / tokensB.join(" ").length;
		    return 1 - distanceB;
		  },

		  _checkByline: function (node, matchString) {
		    if (this._articleByline) {
		      return false;
		    }

		    if (node.getAttribute !== undefined) {
		      var rel = node.getAttribute("rel");
		      var itemprop = node.getAttribute("itemprop");
		    }

		    if (
		      (rel === "author" ||
		        (itemprop && itemprop.indexOf("author") !== -1) ||
		        this.REGEXPS.byline.test(matchString)) &&
		      this._isValidByline(node.textContent)
		    ) {
		      this._articleByline = node.textContent.trim();
		      return true;
		    }

		    return false;
		  },

		  _getNodeAncestors: function (node, maxDepth) {
		    maxDepth = maxDepth || 0;
		    var i = 0,
		      ancestors = [];
		    while (node.parentNode) {
		      ancestors.push(node.parentNode);
		      if (maxDepth && ++i === maxDepth) break;
		      node = node.parentNode;
		    }
		    return ancestors;
		  },

		  /***
		   * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
		   *         most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
		   *
		   * @param page a document to run upon. Needs to be a full document, complete with body.
		   * @return Element
		   **/
		  _grabArticle: function (page) {
		    this.log("**** grabArticle ****");
		    var doc = this._doc;
		    var isPaging = page !== null;
		    page = page ? page : this._doc.body;

		    // We can't grab an article if we don't have a page!
		    if (!page) {
		      this.log("No body found in document. Abort.");
		      return null;
		    }

		    var pageCacheHtml = page.innerHTML;

		    while (true) {
		      this.log("Starting grabArticle loop");
		      var stripUnlikelyCandidates = this._flagIsActive(
		        this.FLAG_STRIP_UNLIKELYS
		      );

		      // First, node prepping. Trash nodes that look cruddy (like ones with the
		      // class name "comment", etc), and turn divs into P tags where they have been
		      // used inappropriately (as in, where they contain no other block level elements.)
		      var elementsToScore = [];
		      var node = this._doc.documentElement;

		      let shouldRemoveTitleHeader = true;

		      while (node) {
		        if (node.tagName === "HTML") {
		          this._articleLang = node.getAttribute("lang");
		        }

		        var matchString = node.className + " " + node.id;

		        if (!this._isProbablyVisible(node)) {
		          this.log("Removing hidden node - " + matchString);
		          node = this._removeAndGetNext(node);
		          continue;
		        }

		        // User is not able to see elements applied with both "aria-modal = true" and "role = dialog"
		        if (
		          node.getAttribute("aria-modal") == "true" &&
		          node.getAttribute("role") == "dialog"
		        ) {
		          node = this._removeAndGetNext(node);
		          continue;
		        }

		        // Check to see if this node is a byline, and remove it if it is.
		        if (this._checkByline(node, matchString)) {
		          node = this._removeAndGetNext(node);
		          continue;
		        }

		        if (shouldRemoveTitleHeader && this._headerDuplicatesTitle(node)) {
		          this.log(
		            "Removing header: ",
		            node.textContent.trim(),
		            this._articleTitle.trim()
		          );
		          shouldRemoveTitleHeader = false;
		          node = this._removeAndGetNext(node);
		          continue;
		        }

		        // Remove unlikely candidates
		        if (stripUnlikelyCandidates) {
		          if (
		            this.REGEXPS.unlikelyCandidates.test(matchString) &&
		            !this.REGEXPS.okMaybeItsACandidate.test(matchString) &&
		            !this._hasAncestorTag(node, "table") &&
		            !this._hasAncestorTag(node, "code") &&
		            node.tagName !== "BODY" &&
		            node.tagName !== "A"
		          ) {
		            this.log("Removing unlikely candidate - " + matchString);
		            node = this._removeAndGetNext(node);
		            continue;
		          }

		          if (this.UNLIKELY_ROLES.includes(node.getAttribute("role"))) {
		            this.log(
		              "Removing content with role " +
		                node.getAttribute("role") +
		                " - " +
		                matchString
		            );
		            node = this._removeAndGetNext(node);
		            continue;
		          }
		        }

		        // Remove DIV, SECTION, and HEADER nodes without any content(e.g. text, image, video, or iframe).
		        if (
		          (node.tagName === "DIV" ||
		            node.tagName === "SECTION" ||
		            node.tagName === "HEADER" ||
		            node.tagName === "H1" ||
		            node.tagName === "H2" ||
		            node.tagName === "H3" ||
		            node.tagName === "H4" ||
		            node.tagName === "H5" ||
		            node.tagName === "H6") &&
		          this._isElementWithoutContent(node)
		        ) {
		          node = this._removeAndGetNext(node);
		          continue;
		        }

		        if (this.DEFAULT_TAGS_TO_SCORE.indexOf(node.tagName) !== -1) {
		          elementsToScore.push(node);
		        }

		        // Turn all divs that don't have children block level elements into p's
		        if (node.tagName === "DIV") {
		          // Put phrasing content into paragraphs.
		          var p = null;
		          var childNode = node.firstChild;
		          while (childNode) {
		            var nextSibling = childNode.nextSibling;
		            if (this._isPhrasingContent(childNode)) {
		              if (p !== null) {
		                p.appendChild(childNode);
		              } else if (!this._isWhitespace(childNode)) {
		                p = doc.createElement("p");
		                node.replaceChild(p, childNode);
		                p.appendChild(childNode);
		              }
		            } else if (p !== null) {
		              while (p.lastChild && this._isWhitespace(p.lastChild)) {
		                p.removeChild(p.lastChild);
		              }
		              p = null;
		            }
		            childNode = nextSibling;
		          }

		          // Sites like http://mobile.slate.com encloses each paragraph with a DIV
		          // element. DIVs with only a P element inside and no text content can be
		          // safely converted into plain P elements to avoid confusing the scoring
		          // algorithm with DIVs with are, in practice, paragraphs.
		          if (
		            this._hasSingleTagInsideElement(node, "P") &&
		            this._getLinkDensity(node) < 0.25
		          ) {
		            var newNode = node.children[0];
		            node.parentNode.replaceChild(newNode, node);
		            node = newNode;
		            elementsToScore.push(node);
		          } else if (!this._hasChildBlockElement(node)) {
		            node = this._setNodeTag(node, "P");
		            elementsToScore.push(node);
		          }
		        }
		        node = this._getNextNode(node);
		      }

		      /**
		       * Loop through all paragraphs, and assign a score to them based on how content-y they look.
		       * Then add their score to their parent node.
		       *
		       * A score is determined by things like number of commas, class names, etc. Maybe eventually link density.
		       **/
		      var candidates = [];
		      this._forEachNode(elementsToScore, function (elementToScore) {
		        if (
		          !elementToScore.parentNode ||
		          typeof elementToScore.parentNode.tagName === "undefined"
		        )
		          return;

		        // If this paragraph is less than 25 characters, don't even count it.
		        var innerText = this._getInnerText(elementToScore);
		        if (innerText.length < 25) return;

		        // Exclude nodes with no ancestor.
		        var ancestors = this._getNodeAncestors(elementToScore, 5);
		        if (ancestors.length === 0) return;

		        var contentScore = 0;

		        // Add a point for the paragraph itself as a base.
		        contentScore += 1;

		        // Add points for any commas within this paragraph.
		        contentScore += innerText.split(this.REGEXPS.commas).length;

		        // For every 100 characters in this paragraph, add another point. Up to 3 points.
		        contentScore += Math.min(Math.floor(innerText.length / 100), 3);

		        // Initialize and score ancestors.
		        this._forEachNode(ancestors, function (ancestor, level) {
		          if (
		            !ancestor.tagName ||
		            !ancestor.parentNode ||
		            typeof ancestor.parentNode.tagName === "undefined"
		          )
		            return;

		          if (typeof ancestor.readability === "undefined") {
		            this._initializeNode(ancestor);
		            candidates.push(ancestor);
		          }

		          // Node score divider:
		          // - parent:             1 (no division)
		          // - grandparent:        2
		          // - great grandparent+: ancestor level * 3
		          if (level === 0) var scoreDivider = 1;
		          else if (level === 1) scoreDivider = 2;
		          else scoreDivider = level * 3;
		          ancestor.readability.contentScore += contentScore / scoreDivider;
		        });
		      });

		      // After we've calculated scores, loop through all of the possible
		      // candidate nodes we found and find the one with the highest score.
		      var topCandidates = [];
		      for (var c = 0, cl = candidates.length; c < cl; c += 1) {
		        var candidate = candidates[c];

		        // Scale the final candidates score based on link density. Good content
		        // should have a relatively small link density (5% or less) and be mostly
		        // unaffected by this operation.
		        var candidateScore =
		          candidate.readability.contentScore *
		          (1 - this._getLinkDensity(candidate));
		        candidate.readability.contentScore = candidateScore;

		        this.log("Candidate:", candidate, "with score " + candidateScore);

		        for (var t = 0; t < this._nbTopCandidates; t++) {
		          var aTopCandidate = topCandidates[t];

		          if (
		            !aTopCandidate ||
		            candidateScore > aTopCandidate.readability.contentScore
		          ) {
		            topCandidates.splice(t, 0, candidate);
		            if (topCandidates.length > this._nbTopCandidates)
		              topCandidates.pop();
		            break;
		          }
		        }
		      }

		      var topCandidate = topCandidates[0] || null;
		      var neededToCreateTopCandidate = false;
		      var parentOfTopCandidate;

		      // If we still have no top candidate, just use the body as a last resort.
		      // We also have to copy the body node so it is something we can modify.
		      if (topCandidate === null || topCandidate.tagName === "BODY") {
		        // Move all of the page's children into topCandidate
		        topCandidate = doc.createElement("DIV");
		        neededToCreateTopCandidate = true;
		        // Move everything (not just elements, also text nodes etc.) into the container
		        // so we even include text directly in the body:
		        while (page.firstChild) {
		          this.log("Moving child out:", page.firstChild);
		          topCandidate.appendChild(page.firstChild);
		        }

		        page.appendChild(topCandidate);

		        this._initializeNode(topCandidate);
		      } else if (topCandidate) {
		        // Find a better top candidate node if it contains (at least three) nodes which belong to `topCandidates` array
		        // and whose scores are quite closed with current `topCandidate` node.
		        var alternativeCandidateAncestors = [];
		        for (var i = 1; i < topCandidates.length; i++) {
		          if (
		            topCandidates[i].readability.contentScore /
		              topCandidate.readability.contentScore >=
		            0.75
		          ) {
		            alternativeCandidateAncestors.push(
		              this._getNodeAncestors(topCandidates[i])
		            );
		          }
		        }
		        var MINIMUM_TOPCANDIDATES = 3;
		        if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
		          parentOfTopCandidate = topCandidate.parentNode;
		          while (parentOfTopCandidate.tagName !== "BODY") {
		            var listsContainingThisAncestor = 0;
		            for (
		              var ancestorIndex = 0;
		              ancestorIndex < alternativeCandidateAncestors.length &&
		              listsContainingThisAncestor < MINIMUM_TOPCANDIDATES;
		              ancestorIndex++
		            ) {
		              listsContainingThisAncestor += Number(
		                alternativeCandidateAncestors[ancestorIndex].includes(
		                  parentOfTopCandidate
		                )
		              );
		            }
		            if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
		              topCandidate = parentOfTopCandidate;
		              break;
		            }
		            parentOfTopCandidate = parentOfTopCandidate.parentNode;
		          }
		        }
		        if (!topCandidate.readability) {
		          this._initializeNode(topCandidate);
		        }

		        // Because of our bonus system, parents of candidates might have scores
		        // themselves. They get half of the node. There won't be nodes with higher
		        // scores than our topCandidate, but if we see the score going *up* in the first
		        // few steps up the tree, that's a decent sign that there might be more content
		        // lurking in other places that we want to unify in. The sibling stuff
		        // below does some of that - but only if we've looked high enough up the DOM
		        // tree.
		        parentOfTopCandidate = topCandidate.parentNode;
		        var lastScore = topCandidate.readability.contentScore;
		        // The scores shouldn't get too low.
		        var scoreThreshold = lastScore / 3;
		        while (parentOfTopCandidate.tagName !== "BODY") {
		          if (!parentOfTopCandidate.readability) {
		            parentOfTopCandidate = parentOfTopCandidate.parentNode;
		            continue;
		          }
		          var parentScore = parentOfTopCandidate.readability.contentScore;
		          if (parentScore < scoreThreshold) break;
		          if (parentScore > lastScore) {
		            // Alright! We found a better parent to use.
		            topCandidate = parentOfTopCandidate;
		            break;
		          }
		          lastScore = parentOfTopCandidate.readability.contentScore;
		          parentOfTopCandidate = parentOfTopCandidate.parentNode;
		        }

		        // If the top candidate is the only child, use parent instead. This will help sibling
		        // joining logic when adjacent content is actually located in parent's sibling node.
		        parentOfTopCandidate = topCandidate.parentNode;
		        while (
		          parentOfTopCandidate.tagName != "BODY" &&
		          parentOfTopCandidate.children.length == 1
		        ) {
		          topCandidate = parentOfTopCandidate;
		          parentOfTopCandidate = topCandidate.parentNode;
		        }
		        if (!topCandidate.readability) {
		          this._initializeNode(topCandidate);
		        }
		      }

		      // Now that we have the top candidate, look through its siblings for content
		      // that might also be related. Things like preambles, content split by ads
		      // that we removed, etc.
		      var articleContent = doc.createElement("DIV");
		      if (isPaging) articleContent.id = "readability-content";

		      var siblingScoreThreshold = Math.max(
		        10,
		        topCandidate.readability.contentScore * 0.2
		      );
		      // Keep potential top candidate's parent node to try to get text direction of it later.
		      parentOfTopCandidate = topCandidate.parentNode;
		      var siblings = parentOfTopCandidate.children;

		      for (var s = 0, sl = siblings.length; s < sl; s++) {
		        var sibling = siblings[s];
		        var append = false;

		        this.log(
		          "Looking at sibling node:",
		          sibling,
		          sibling.readability
		            ? "with score " + sibling.readability.contentScore
		            : ""
		        );
		        this.log(
		          "Sibling has score",
		          sibling.readability ? sibling.readability.contentScore : "Unknown"
		        );

		        if (sibling === topCandidate) {
		          append = true;
		        } else {
		          var contentBonus = 0;

		          // Give a bonus if sibling nodes and top candidates have the example same classname
		          if (
		            sibling.className === topCandidate.className &&
		            topCandidate.className !== ""
		          )
		            contentBonus += topCandidate.readability.contentScore * 0.2;

		          if (
		            sibling.readability &&
		            sibling.readability.contentScore + contentBonus >=
		              siblingScoreThreshold
		          ) {
		            append = true;
		          } else if (sibling.nodeName === "P") {
		            var linkDensity = this._getLinkDensity(sibling);
		            var nodeContent = this._getInnerText(sibling);
		            var nodeLength = nodeContent.length;

		            if (nodeLength > 80 && linkDensity < 0.25) {
		              append = true;
		            } else if (
		              nodeLength < 80 &&
		              nodeLength > 0 &&
		              linkDensity === 0 &&
		              nodeContent.search(/\.( |$)/) !== -1
		            ) {
		              append = true;
		            }
		          }
		        }

		        if (append) {
		          this.log("Appending node:", sibling);

		          if (this.ALTER_TO_DIV_EXCEPTIONS.indexOf(sibling.nodeName) === -1) {
		            // We have a node that isn't a common block level element, like a form or td tag.
		            // Turn it into a div so it doesn't get filtered out later by accident.
		            this.log("Altering sibling:", sibling, "to div.");

		            sibling = this._setNodeTag(sibling, "DIV");
		          }

		          articleContent.appendChild(sibling);
		          // Fetch children again to make it compatible
		          // with DOM parsers without live collection support.
		          siblings = parentOfTopCandidate.children;
		          // siblings is a reference to the children array, and
		          // sibling is removed from the array when we call appendChild().
		          // As a result, we must revisit this index since the nodes
		          // have been shifted.
		          s -= 1;
		          sl -= 1;
		        }
		      }

		      if (this._debug)
		        this.log("Article content pre-prep: " + articleContent.innerHTML);
		      // So we have all of the content that we need. Now we clean it up for presentation.
		      this._prepArticle(articleContent);
		      if (this._debug)
		        this.log("Article content post-prep: " + articleContent.innerHTML);

		      if (neededToCreateTopCandidate) {
		        // We already created a fake div thing, and there wouldn't have been any siblings left
		        // for the previous loop, so there's no point trying to create a new div, and then
		        // move all the children over. Just assign IDs and class names here. No need to append
		        // because that already happened anyway.
		        topCandidate.id = "readability-page-1";
		        topCandidate.className = "page";
		      } else {
		        var div = doc.createElement("DIV");
		        div.id = "readability-page-1";
		        div.className = "page";
		        while (articleContent.firstChild) {
		          div.appendChild(articleContent.firstChild);
		        }
		        articleContent.appendChild(div);
		      }

		      if (this._debug)
		        this.log("Article content after paging: " + articleContent.innerHTML);

		      var parseSuccessful = true;

		      // Now that we've gone through the full algorithm, check to see if
		      // we got any meaningful content. If we didn't, we may need to re-run
		      // grabArticle with different flags set. This gives us a higher likelihood of
		      // finding the content, and the sieve approach gives us a higher likelihood of
		      // finding the -right- content.
		      var textLength = this._getInnerText(articleContent, true).length;
		      if (textLength < this._charThreshold) {
		        parseSuccessful = false;
		        page.innerHTML = pageCacheHtml;

		        if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) {
		          this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
		          this._attempts.push({
		            articleContent: articleContent,
		            textLength: textLength,
		          });
		        } else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
		          this._removeFlag(this.FLAG_WEIGHT_CLASSES);
		          this._attempts.push({
		            articleContent: articleContent,
		            textLength: textLength,
		          });
		        } else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
		          this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
		          this._attempts.push({
		            articleContent: articleContent,
		            textLength: textLength,
		          });
		        } else {
		          this._attempts.push({
		            articleContent: articleContent,
		            textLength: textLength,
		          });
		          // No luck after removing flags, just return the longest text we found during the different loops
		          this._attempts.sort(function (a, b) {
		            return b.textLength - a.textLength;
		          });

		          // But first check if we actually have something
		          if (!this._attempts[0].textLength) {
		            return null;
		          }

		          articleContent = this._attempts[0].articleContent;
		          parseSuccessful = true;
		        }
		      }

		      if (parseSuccessful) {
		        // Find out text direction from ancestors of final top candidate.
		        var ancestors = [parentOfTopCandidate, topCandidate].concat(
		          this._getNodeAncestors(parentOfTopCandidate)
		        );
		        this._someNode(ancestors, function (ancestor) {
		          if (!ancestor.tagName) return false;
		          var articleDir = ancestor.getAttribute("dir");
		          if (articleDir) {
		            this._articleDir = articleDir;
		            return true;
		          }
		          return false;
		        });
		        return articleContent;
		      }
		    }
		  },

		  /**
		   * Check whether the input string could be a byline.
		   * This verifies that the input is a string, and that the length
		   * is less than 100 chars.
		   *
		   * @param possibleByline {string} - a string to check whether its a byline.
		   * @return Boolean - whether the input string is a byline.
		   */
		  _isValidByline: function (byline) {
		    if (typeof byline == "string" || byline instanceof String) {
		      byline = byline.trim();
		      return byline.length > 0 && byline.length < 100;
		    }
		    return false;
		  },

		  /**
		   * Converts some of the common HTML entities in string to their corresponding characters.
		   *
		   * @param str {string} - a string to unescape.
		   * @return string without HTML entity.
		   */
		  _unescapeHtmlEntities: function (str) {
		    if (!str) {
		      return str;
		    }

		    var htmlEscapeMap = this.HTML_ESCAPE_MAP;
		    return str
		      .replace(/&(quot|amp|apos|lt|gt);/g, function (_, tag) {
		        return htmlEscapeMap[tag];
		      })
		      .replace(
		        /&#(?:x([0-9a-z]{1,4})|([0-9]{1,4}));/gi,
		        function (_, hex, numStr) {
		          var num = parseInt(hex || numStr, hex ? 16 : 10);
		          return String.fromCharCode(num);
		        }
		      );
		  },

		  /**
		   * Try to extract metadata from JSON-LD object.
		   * For now, only Schema.org objects of type Article or its subtypes are supported.
		   * @return Object with any metadata that could be extracted (possibly none)
		   */
		  _getJSONLD: function (doc) {
		    var scripts = this._getAllNodesWithTag(doc, ["script"]);

		    var metadata;

		    this._forEachNode(scripts, function (jsonLdElement) {
		      if (
		        !metadata &&
		        jsonLdElement.getAttribute("type") === "application/ld+json"
		      ) {
		        try {
		          // Strip CDATA markers if present
		          var content = jsonLdElement.textContent.replace(
		            /^\s*<!\[CDATA\[|\]\]>\s*$/g,
		            ""
		          );
		          var parsed = JSON.parse(content);
		          if (
		            !parsed["@context"] ||
		            !parsed["@context"].match(/^https?\:\/\/schema\.org$/)
		          ) {
		            return;
		          }

		          if (!parsed["@type"] && Array.isArray(parsed["@graph"])) {
		            parsed = parsed["@graph"].find(function (it) {
		              return (it["@type"] || "").match(this.REGEXPS.jsonLdArticleTypes);
		            });
		          }

		          if (
		            !parsed ||
		            !parsed["@type"] ||
		            !parsed["@type"].match(this.REGEXPS.jsonLdArticleTypes)
		          ) {
		            return;
		          }

		          metadata = {};

		          if (
		            typeof parsed.name === "string" &&
		            typeof parsed.headline === "string" &&
		            parsed.name !== parsed.headline
		          ) {
		            // we have both name and headline element in the JSON-LD. They should both be the same but some websites like aktualne.cz
		            // put their own name into "name" and the article title to "headline" which confuses Readability. So we try to check if either
		            // "name" or "headline" closely matches the html title, and if so, use that one. If not, then we use "name" by default.

		            var title = this._getArticleTitle();
		            var nameMatches = this._textSimilarity(parsed.name, title) > 0.75;
		            var headlineMatches =
		              this._textSimilarity(parsed.headline, title) > 0.75;

		            if (headlineMatches && !nameMatches) {
		              metadata.title = parsed.headline;
		            } else {
		              metadata.title = parsed.name;
		            }
		          } else if (typeof parsed.name === "string") {
		            metadata.title = parsed.name.trim();
		          } else if (typeof parsed.headline === "string") {
		            metadata.title = parsed.headline.trim();
		          }
		          if (parsed.author) {
		            if (typeof parsed.author.name === "string") {
		              metadata.byline = parsed.author.name.trim();
		            } else if (
		              Array.isArray(parsed.author) &&
		              parsed.author[0] &&
		              typeof parsed.author[0].name === "string"
		            ) {
		              metadata.byline = parsed.author
		                .filter(function (author) {
		                  return author && typeof author.name === "string";
		                })
		                .map(function (author) {
		                  return author.name.trim();
		                })
		                .join(", ");
		            }
		          }
		          if (typeof parsed.description === "string") {
		            metadata.excerpt = parsed.description.trim();
		          }
		          if (parsed.publisher && typeof parsed.publisher.name === "string") {
		            metadata.siteName = parsed.publisher.name.trim();
		          }
		          return;
		        } catch (err) {
		          this.log(err.message);
		        }
		      }
		    });
		    return metadata ? metadata : {};
		  },

		  /**
		   * Attempts to get excerpt and byline metadata for the article.
		   *
		   * @param {Object} jsonld — object containing any metadata that
		   * could be extracted from JSON-LD object.
		   *
		   * @return Object with optional "excerpt" and "byline" properties
		   */
		  _getArticleMetadata: function (jsonld) {
		    var metadata = {};
		    var values = {};
		    var metaElements = this._doc.getElementsByTagName("meta");

		    // property is a space-separated list of values
		    var propertyPattern =
		      /\s*(dc|dcterm|og|twitter)\s*:\s*(author|creator|description|title|site_name)\s*/gi;

		    // name is a single value
		    var namePattern =
		      /^\s*(?:(dc|dcterm|og|twitter|weibo:(article|webpage))\s*[\.:]\s*)?(author|creator|description|title|site_name)\s*$/i;

		    // Find description tags.
		    this._forEachNode(metaElements, function (element) {
		      var elementName = element.getAttribute("name");
		      var elementProperty = element.getAttribute("property");
		      var content = element.getAttribute("content");
		      if (!content) {
		        return;
		      }
		      var matches = null;
		      var name = null;

		      if (elementProperty) {
		        matches = elementProperty.match(propertyPattern);
		        if (matches) {
		          // Convert to lowercase, and remove any whitespace
		          // so we can match below.
		          name = matches[0].toLowerCase().replace(/\s/g, "");
		          // multiple authors
		          values[name] = content.trim();
		        }
		      }
		      if (!matches && elementName && namePattern.test(elementName)) {
		        name = elementName;
		        if (content) {
		          // Convert to lowercase, remove any whitespace, and convert dots
		          // to colons so we can match below.
		          name = name.toLowerCase().replace(/\s/g, "").replace(/\./g, ":");
		          values[name] = content.trim();
		        }
		      }
		    });

		    // get title
		    metadata.title =
		      jsonld.title ||
		      values["dc:title"] ||
		      values["dcterm:title"] ||
		      values["og:title"] ||
		      values["weibo:article:title"] ||
		      values["weibo:webpage:title"] ||
		      values["title"] ||
		      values["twitter:title"];

		    if (!metadata.title) {
		      metadata.title = this._getArticleTitle();
		    }

		    // get author
		    metadata.byline =
		      jsonld.byline ||
		      values["dc:creator"] ||
		      values["dcterm:creator"] ||
		      values["author"];

		    // get description
		    metadata.excerpt =
		      jsonld.excerpt ||
		      values["dc:description"] ||
		      values["dcterm:description"] ||
		      values["og:description"] ||
		      values["weibo:article:description"] ||
		      values["weibo:webpage:description"] ||
		      values["description"] ||
		      values["twitter:description"];

		    // get site name
		    metadata.siteName = jsonld.siteName || values["og:site_name"];

		    // in many sites the meta value is escaped with HTML entities,
		    // so here we need to unescape it
		    metadata.title = this._unescapeHtmlEntities(metadata.title);
		    metadata.byline = this._unescapeHtmlEntities(metadata.byline);
		    metadata.excerpt = this._unescapeHtmlEntities(metadata.excerpt);
		    metadata.siteName = this._unescapeHtmlEntities(metadata.siteName);

		    return metadata;
		  },

		  /**
		   * Check if node is image, or if node contains exactly only one image
		   * whether as a direct child or as its descendants.
		   *
		   * @param Element
		   **/
		  _isSingleImage: function (node) {
		    if (node.tagName === "IMG") {
		      return true;
		    }

		    if (node.children.length !== 1 || node.textContent.trim() !== "") {
		      return false;
		    }

		    return this._isSingleImage(node.children[0]);
		  },

		  /**
		   * Find all <noscript> that are located after <img> nodes, and which contain only one
		   * <img> element. Replace the first image with the image from inside the <noscript> tag,
		   * and remove the <noscript> tag. This improves the quality of the images we use on
		   * some sites (e.g. Medium).
		   *
		   * @param Element
		   **/
		  _unwrapNoscriptImages: function (doc) {
		    // Find img without source or attributes that might contains image, and remove it.
		    // This is done to prevent a placeholder img is replaced by img from noscript in next step.
		    var imgs = Array.from(doc.getElementsByTagName("img"));
		    this._forEachNode(imgs, function (img) {
		      for (var i = 0; i < img.attributes.length; i++) {
		        var attr = img.attributes[i];
		        switch (attr.name) {
		          case "src":
		          case "srcset":
		          case "data-src":
		          case "data-srcset":
		            return;
		        }

		        if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
		          return;
		        }
		      }

		      img.parentNode.removeChild(img);
		    });

		    // Next find noscript and try to extract its image
		    var noscripts = Array.from(doc.getElementsByTagName("noscript"));
		    this._forEachNode(noscripts, function (noscript) {
		      // Parse content of noscript and make sure it only contains image
		      var tmp = doc.createElement("div");
		      tmp.innerHTML = noscript.innerHTML;
		      if (!this._isSingleImage(tmp)) {
		        return;
		      }

		      // If noscript has previous sibling and it only contains image,
		      // replace it with noscript content. However we also keep old
		      // attributes that might contains image.
		      var prevElement = noscript.previousElementSibling;
		      if (prevElement && this._isSingleImage(prevElement)) {
		        var prevImg = prevElement;
		        if (prevImg.tagName !== "IMG") {
		          prevImg = prevElement.getElementsByTagName("img")[0];
		        }

		        var newImg = tmp.getElementsByTagName("img")[0];
		        for (var i = 0; i < prevImg.attributes.length; i++) {
		          var attr = prevImg.attributes[i];
		          if (attr.value === "") {
		            continue;
		          }

		          if (
		            attr.name === "src" ||
		            attr.name === "srcset" ||
		            /\.(jpg|jpeg|png|webp)/i.test(attr.value)
		          ) {
		            if (newImg.getAttribute(attr.name) === attr.value) {
		              continue;
		            }

		            var attrName = attr.name;
		            if (newImg.hasAttribute(attrName)) {
		              attrName = "data-old-" + attrName;
		            }

		            newImg.setAttribute(attrName, attr.value);
		          }
		        }

		        noscript.parentNode.replaceChild(tmp.firstElementChild, prevElement);
		      }
		    });
		  },

		  /**
		   * Removes script tags from the document.
		   *
		   * @param Element
		   **/
		  _removeScripts: function (doc) {
		    this._removeNodes(this._getAllNodesWithTag(doc, ["script", "noscript"]));
		  },

		  /**
		   * Check if this node has only whitespace and a single element with given tag
		   * Returns false if the DIV node contains non-empty text nodes
		   * or if it contains no element with given tag or more than 1 element.
		   *
		   * @param Element
		   * @param string tag of child element
		   **/
		  _hasSingleTagInsideElement: function (element, tag) {
		    // There should be exactly 1 element child with given tag
		    if (element.children.length != 1 || element.children[0].tagName !== tag) {
		      return false;
		    }

		    // And there should be no text nodes with real content
		    return !this._someNode(element.childNodes, function (node) {
		      return (
		        node.nodeType === this.TEXT_NODE &&
		        this.REGEXPS.hasContent.test(node.textContent)
		      );
		    });
		  },

		  _isElementWithoutContent: function (node) {
		    return (
		      node.nodeType === this.ELEMENT_NODE &&
		      node.textContent.trim().length == 0 &&
		      (node.children.length == 0 ||
		        node.children.length ==
		          node.getElementsByTagName("br").length +
		            node.getElementsByTagName("hr").length)
		    );
		  },

		  /**
		   * Determine whether element has any children block level elements.
		   *
		   * @param Element
		   */
		  _hasChildBlockElement: function (element) {
		    return this._someNode(element.childNodes, function (node) {
		      return (
		        this.DIV_TO_P_ELEMS.has(node.tagName) ||
		        this._hasChildBlockElement(node)
		      );
		    });
		  },

		  /***
		   * Determine if a node qualifies as phrasing content.
		   * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
		   **/
		  _isPhrasingContent: function (node) {
		    return (
		      node.nodeType === this.TEXT_NODE ||
		      this.PHRASING_ELEMS.indexOf(node.tagName) !== -1 ||
		      ((node.tagName === "A" ||
		        node.tagName === "DEL" ||
		        node.tagName === "INS") &&
		        this._everyNode(node.childNodes, this._isPhrasingContent))
		    );
		  },

		  _isWhitespace: function (node) {
		    return (
		      (node.nodeType === this.TEXT_NODE &&
		        node.textContent.trim().length === 0) ||
		      (node.nodeType === this.ELEMENT_NODE && node.tagName === "BR")
		    );
		  },

		  /**
		   * Get the inner text of a node - cross browser compatibly.
		   * This also strips out any excess whitespace to be found.
		   *
		   * @param Element
		   * @param Boolean normalizeSpaces (default: true)
		   * @return string
		   **/
		  _getInnerText: function (e, normalizeSpaces) {
		    normalizeSpaces =
		      typeof normalizeSpaces === "undefined" ? true : normalizeSpaces;
		    var textContent = e.textContent.trim();

		    if (normalizeSpaces) {
		      return textContent.replace(this.REGEXPS.normalize, " ");
		    }
		    return textContent;
		  },

		  /**
		   * Get the number of times a string s appears in the node e.
		   *
		   * @param Element
		   * @param string - what to split on. Default is ","
		   * @return number (integer)
		   **/
		  _getCharCount: function (e, s) {
		    s = s || ",";
		    return this._getInnerText(e).split(s).length - 1;
		  },

		  /**
		   * Remove the style attribute on every e and under.
		   * TODO: Test if getElementsByTagName(*) is faster.
		   *
		   * @param Element
		   * @return void
		   **/
		  _cleanStyles: function (e) {
		    if (!e || e.tagName.toLowerCase() === "svg") return;

		    // Remove `style` and deprecated presentational attributes
		    for (var i = 0; i < this.PRESENTATIONAL_ATTRIBUTES.length; i++) {
		      e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i]);
		    }

		    if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) !== -1) {
		      e.removeAttribute("width");
		      e.removeAttribute("height");
		    }

		    var cur = e.firstElementChild;
		    while (cur !== null) {
		      this._cleanStyles(cur);
		      cur = cur.nextElementSibling;
		    }
		  },

		  /**
		   * Get the density of links as a percentage of the content
		   * This is the amount of text that is inside a link divided by the total text in the node.
		   *
		   * @param Element
		   * @return number (float)
		   **/
		  _getLinkDensity: function (element) {
		    var textLength = this._getInnerText(element).length;
		    if (textLength === 0) return 0;

		    var linkLength = 0;

		    // XXX implement _reduceNodeList?
		    this._forEachNode(element.getElementsByTagName("a"), function (linkNode) {
		      var href = linkNode.getAttribute("href");
		      var coefficient = href && this.REGEXPS.hashUrl.test(href) ? 0.3 : 1;
		      linkLength += this._getInnerText(linkNode).length * coefficient;
		    });

		    return linkLength / textLength;
		  },

		  /**
		   * Get an elements class/id weight. Uses regular expressions to tell if this
		   * element looks good or bad.
		   *
		   * @param Element
		   * @return number (Integer)
		   **/
		  _getClassWeight: function (e) {
		    if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) return 0;

		    var weight = 0;

		    // Look for a special classname
		    if (typeof e.className === "string" && e.className !== "") {
		      if (this.REGEXPS.negative.test(e.className)) weight -= 25;

		      if (this.REGEXPS.positive.test(e.className)) weight += 25;
		    }

		    // Look for a special ID
		    if (typeof e.id === "string" && e.id !== "") {
		      if (this.REGEXPS.negative.test(e.id)) weight -= 25;

		      if (this.REGEXPS.positive.test(e.id)) weight += 25;
		    }

		    return weight;
		  },

		  /**
		   * Clean a node of all elements of type "tag".
		   * (Unless it's a youtube/vimeo video. People love movies.)
		   *
		   * @param Element
		   * @param string tag to clean
		   * @return void
		   **/
		  _clean: function (e, tag) {
		    var isEmbed = ["object", "embed", "iframe"].indexOf(tag) !== -1;

		    this._removeNodes(this._getAllNodesWithTag(e, [tag]), function (element) {
		      // Allow youtube and vimeo videos through as people usually want to see those.
		      if (isEmbed) {
		        // First, check the elements attributes to see if any of them contain youtube or vimeo
		        for (var i = 0; i < element.attributes.length; i++) {
		          if (this._allowedVideoRegex.test(element.attributes[i].value)) {
		            return false;
		          }
		        }

		        // For embed with <object> tag, check inner HTML as well.
		        if (
		          element.tagName === "object" &&
		          this._allowedVideoRegex.test(element.innerHTML)
		        ) {
		          return false;
		        }
		      }

		      return true;
		    });
		  },

		  /**
		   * Check if a given node has one of its ancestor tag name matching the
		   * provided one.
		   * @param  HTMLElement node
		   * @param  String      tagName
		   * @param  Number      maxDepth
		   * @param  Function    filterFn a filter to invoke to determine whether this node 'counts'
		   * @return Boolean
		   */
		  _hasAncestorTag: function (node, tagName, maxDepth, filterFn) {
		    maxDepth = maxDepth || 3;
		    tagName = tagName.toUpperCase();
		    var depth = 0;
		    while (node.parentNode) {
		      if (maxDepth > 0 && depth > maxDepth) return false;
		      if (
		        node.parentNode.tagName === tagName &&
		        (!filterFn || filterFn(node.parentNode))
		      )
		        return true;
		      node = node.parentNode;
		      depth++;
		    }
		    return false;
		  },

		  /**
		   * Return an object indicating how many rows and columns this table has.
		   */
		  _getRowAndColumnCount: function (table) {
		    var rows = 0;
		    var columns = 0;
		    var trs = table.getElementsByTagName("tr");
		    for (var i = 0; i < trs.length; i++) {
		      var rowspan = trs[i].getAttribute("rowspan") || 0;
		      if (rowspan) {
		        rowspan = parseInt(rowspan, 10);
		      }
		      rows += rowspan || 1;

		      // Now look for column-related info
		      var columnsInThisRow = 0;
		      var cells = trs[i].getElementsByTagName("td");
		      for (var j = 0; j < cells.length; j++) {
		        var colspan = cells[j].getAttribute("colspan") || 0;
		        if (colspan) {
		          colspan = parseInt(colspan, 10);
		        }
		        columnsInThisRow += colspan || 1;
		      }
		      columns = Math.max(columns, columnsInThisRow);
		    }
		    return { rows: rows, columns: columns };
		  },

		  /**
		   * Look for 'data' (as opposed to 'layout') tables, for which we use
		   * similar checks as
		   * https://searchfox.org/mozilla-central/rev/f82d5c549f046cb64ce5602bfd894b7ae807c8f8/accessible/generic/TableAccessible.cpp#19
		   */
		  _markDataTables: function (root) {
		    var tables = root.getElementsByTagName("table");
		    for (var i = 0; i < tables.length; i++) {
		      var table = tables[i];
		      var role = table.getAttribute("role");
		      if (role == "presentation") {
		        table._readabilityDataTable = false;
		        continue;
		      }
		      var datatable = table.getAttribute("datatable");
		      if (datatable == "0") {
		        table._readabilityDataTable = false;
		        continue;
		      }
		      var summary = table.getAttribute("summary");
		      if (summary) {
		        table._readabilityDataTable = true;
		        continue;
		      }

		      var caption = table.getElementsByTagName("caption")[0];
		      if (caption && caption.childNodes.length > 0) {
		        table._readabilityDataTable = true;
		        continue;
		      }

		      // If the table has a descendant with any of these tags, consider a data table:
		      var dataTableDescendants = ["col", "colgroup", "tfoot", "thead", "th"];
		      var descendantExists = function (tag) {
		        return !!table.getElementsByTagName(tag)[0];
		      };
		      if (dataTableDescendants.some(descendantExists)) {
		        this.log("Data table because found data-y descendant");
		        table._readabilityDataTable = true;
		        continue;
		      }

		      // Nested tables indicate a layout table:
		      if (table.getElementsByTagName("table")[0]) {
		        table._readabilityDataTable = false;
		        continue;
		      }

		      var sizeInfo = this._getRowAndColumnCount(table);
		      if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
		        table._readabilityDataTable = true;
		        continue;
		      }
		      // Now just go by size entirely:
		      table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
		    }
		  },

		  /* convert images and figures that have properties like data-src into images that can be loaded without JS */
		  _fixLazyImages: function (root) {
		    this._forEachNode(
		      this._getAllNodesWithTag(root, ["img", "picture", "figure"]),
		      function (elem) {
		        // In some sites (e.g. Kotaku), they put 1px square image as base64 data uri in the src attribute.
		        // So, here we check if the data uri is too short, just might as well remove it.
		        if (elem.src && this.REGEXPS.b64DataUrl.test(elem.src)) {
		          // Make sure it's not SVG, because SVG can have a meaningful image in under 133 bytes.
		          var parts = this.REGEXPS.b64DataUrl.exec(elem.src);
		          if (parts[1] === "image/svg+xml") {
		            return;
		          }

		          // Make sure this element has other attributes which contains image.
		          // If it doesn't, then this src is important and shouldn't be removed.
		          var srcCouldBeRemoved = false;
		          for (var i = 0; i < elem.attributes.length; i++) {
		            var attr = elem.attributes[i];
		            if (attr.name === "src") {
		              continue;
		            }

		            if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
		              srcCouldBeRemoved = true;
		              break;
		            }
		          }

		          // Here we assume if image is less than 100 bytes (or 133B after encoded to base64)
		          // it will be too small, therefore it might be placeholder image.
		          if (srcCouldBeRemoved) {
		            var b64starts = elem.src.search(/base64\s*/i) + 7;
		            var b64length = elem.src.length - b64starts;
		            if (b64length < 133) {
		              elem.removeAttribute("src");
		            }
		          }
		        }

		        // also check for "null" to work around https://github.com/jsdom/jsdom/issues/2580
		        if (
		          (elem.src || (elem.srcset && elem.srcset != "null")) &&
		          elem.className.toLowerCase().indexOf("lazy") === -1
		        ) {
		          return;
		        }

		        for (var j = 0; j < elem.attributes.length; j++) {
		          attr = elem.attributes[j];
		          if (
		            attr.name === "src" ||
		            attr.name === "srcset" ||
		            attr.name === "alt"
		          ) {
		            continue;
		          }
		          var copyTo = null;
		          if (/\.(jpg|jpeg|png|webp)\s+\d/.test(attr.value)) {
		            copyTo = "srcset";
		          } else if (/^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(attr.value)) {
		            copyTo = "src";
		          }
		          if (copyTo) {
		            //if this is an img or picture, set the attribute directly
		            if (elem.tagName === "IMG" || elem.tagName === "PICTURE") {
		              elem.setAttribute(copyTo, attr.value);
		            } else if (
		              elem.tagName === "FIGURE" &&
		              !this._getAllNodesWithTag(elem, ["img", "picture"]).length
		            ) {
		              //if the item is a <figure> that does not contain an image or picture, create one and place it inside the figure
		              //see the nytimes-3 testcase for an example
		              var img = this._doc.createElement("img");
		              img.setAttribute(copyTo, attr.value);
		              elem.appendChild(img);
		            }
		          }
		        }
		      }
		    );
		  },

		  _getTextDensity: function (e, tags) {
		    var textLength = this._getInnerText(e, true).length;
		    if (textLength === 0) {
		      return 0;
		    }
		    var childrenLength = 0;
		    var children = this._getAllNodesWithTag(e, tags);
		    this._forEachNode(
		      children,
		      (child) => (childrenLength += this._getInnerText(child, true).length)
		    );
		    return childrenLength / textLength;
		  },

		  /**
		   * Clean an element of all tags of type "tag" if they look fishy.
		   * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
		   *
		   * @return void
		   **/
		  _cleanConditionally: function (e, tag) {
		    if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) return;

		    // Gather counts for other typical elements embedded within.
		    // Traverse backwards so we can remove nodes at the same time
		    // without effecting the traversal.
		    //
		    // TODO: Consider taking into account original contentScore here.
		    this._removeNodes(this._getAllNodesWithTag(e, [tag]), function (node) {
		      // First check if this node IS data table, in which case don't remove it.
		      var isDataTable = function (t) {
		        return t._readabilityDataTable;
		      };

		      var isList = tag === "ul" || tag === "ol";
		      if (!isList) {
		        var listLength = 0;
		        var listNodes = this._getAllNodesWithTag(node, ["ul", "ol"]);
		        this._forEachNode(
		          listNodes,
		          (list) => (listLength += this._getInnerText(list).length)
		        );
		        isList = listLength / this._getInnerText(node).length > 0.9;
		      }

		      if (tag === "table" && isDataTable(node)) {
		        return false;
		      }

		      // Next check if we're inside a data table, in which case don't remove it as well.
		      if (this._hasAncestorTag(node, "table", -1, isDataTable)) {
		        return false;
		      }

		      if (this._hasAncestorTag(node, "code")) {
		        return false;
		      }

		      var weight = this._getClassWeight(node);

		      this.log("Cleaning Conditionally", node);

		      var contentScore = 0;

		      if (weight + contentScore < 0) {
		        return true;
		      }

		      if (this._getCharCount(node, ",") < 10) {
		        // If there are not very many commas, and the number of
		        // non-paragraph elements is more than paragraphs or other
		        // ominous signs, remove the element.
		        var p = node.getElementsByTagName("p").length;
		        var img = node.getElementsByTagName("img").length;
		        var li = node.getElementsByTagName("li").length - 100;
		        var input = node.getElementsByTagName("input").length;
		        var headingDensity = this._getTextDensity(node, [
		          "h1",
		          "h2",
		          "h3",
		          "h4",
		          "h5",
		          "h6",
		        ]);

		        var embedCount = 0;
		        var embeds = this._getAllNodesWithTag(node, [
		          "object",
		          "embed",
		          "iframe",
		        ]);

		        for (var i = 0; i < embeds.length; i++) {
		          // If this embed has attribute that matches video regex, don't delete it.
		          for (var j = 0; j < embeds[i].attributes.length; j++) {
		            if (this._allowedVideoRegex.test(embeds[i].attributes[j].value)) {
		              return false;
		            }
		          }

		          // For embed with <object> tag, check inner HTML as well.
		          if (
		            embeds[i].tagName === "object" &&
		            this._allowedVideoRegex.test(embeds[i].innerHTML)
		          ) {
		            return false;
		          }

		          embedCount++;
		        }

		        var linkDensity = this._getLinkDensity(node);
		        var contentLength = this._getInnerText(node).length;

		        var haveToRemove =
		          (img > 1 && p / img < 0.5 && !this._hasAncestorTag(node, "figure")) ||
		          (!isList && li > p) ||
		          input > Math.floor(p / 3) ||
		          (!isList &&
		            headingDensity < 0.9 &&
		            contentLength < 25 &&
		            (img === 0 || img > 2) &&
		            !this._hasAncestorTag(node, "figure")) ||
		          (!isList && weight < 25 && linkDensity > 0.2) ||
		          (weight >= 25 && linkDensity > 0.5) ||
		          (embedCount === 1 && contentLength < 75) ||
		          embedCount > 1;
		        // Allow simple lists of images to remain in pages
		        if (isList && haveToRemove) {
		          for (var x = 0; x < node.children.length; x++) {
		            let child = node.children[x];
		            // Don't filter in lists with li's that contain more than one child
		            if (child.children.length > 1) {
		              return haveToRemove;
		            }
		          }
		          let li_count = node.getElementsByTagName("li").length;
		          // Only allow the list to remain if every li contains an image
		          if (img == li_count) {
		            return false;
		          }
		        }
		        return haveToRemove;
		      }
		      return false;
		    });
		  },

		  /**
		   * Clean out elements that match the specified conditions
		   *
		   * @param Element
		   * @param Function determines whether a node should be removed
		   * @return void
		   **/
		  _cleanMatchedNodes: function (e, filter) {
		    var endOfSearchMarkerNode = this._getNextNode(e, true);
		    var next = this._getNextNode(e);
		    while (next && next != endOfSearchMarkerNode) {
		      if (filter.call(this, next, next.className + " " + next.id)) {
		        next = this._removeAndGetNext(next);
		      } else {
		        next = this._getNextNode(next);
		      }
		    }
		  },

		  /**
		   * Clean out spurious headers from an Element.
		   *
		   * @param Element
		   * @return void
		   **/
		  _cleanHeaders: function (e) {
		    let headingNodes = this._getAllNodesWithTag(e, ["h1", "h2"]);
		    this._removeNodes(headingNodes, function (node) {
		      let shouldRemove = this._getClassWeight(node) < 0;
		      if (shouldRemove) {
		        this.log("Removing header with low class weight:", node);
		      }
		      return shouldRemove;
		    });
		  },

		  /**
		   * Check if this node is an H1 or H2 element whose content is mostly
		   * the same as the article title.
		   *
		   * @param Element  the node to check.
		   * @return boolean indicating whether this is a title-like header.
		   */
		  _headerDuplicatesTitle: function (node) {
		    if (node.tagName != "H1" && node.tagName != "H2") {
		      return false;
		    }
		    var heading = this._getInnerText(node, false);
		    this.log("Evaluating similarity of header:", heading, this._articleTitle);
		    return this._textSimilarity(this._articleTitle, heading) > 0.75;
		  },

		  _flagIsActive: function (flag) {
		    return (this._flags & flag) > 0;
		  },

		  _removeFlag: function (flag) {
		    this._flags = this._flags & ~flag;
		  },

		  _isProbablyVisible: function (node) {
		    // Have to null-check node.style and node.className.indexOf to deal with SVG and MathML nodes.
		    return (
		      (!node.style || node.style.display != "none") &&
		      !node.hasAttribute("hidden") &&
		      //check for "fallback-image" so that wikimedia math images are displayed
		      (!node.hasAttribute("aria-hidden") ||
		        node.getAttribute("aria-hidden") != "true" ||
		        (node.className &&
		          node.className.indexOf &&
		          node.className.indexOf("fallback-image") !== -1))
		    );
		  },

		  /**
		   * Runs readability.
		   *
		   * Workflow:
		   *  1. Prep the document by removing script tags, css, etc.
		   *  2. Build readability's DOM tree.
		   *  3. Grab the article content from the current dom tree.
		   *  4. Replace the current DOM tree with the new one.
		   *  5. Read peacefully.
		   *
		   * @return void
		   **/
		  parse: function () {
		    // Avoid parsing too large documents, as per configuration option
		    if (this._maxElemsToParse > 0) {
		      var numTags = this._doc.getElementsByTagName("*").length;
		      if (numTags > this._maxElemsToParse) {
		        throw new Error(
		          "Aborting parsing document; " + numTags + " elements found"
		        );
		      }
		    }

		    // Unwrap image from noscript
		    this._unwrapNoscriptImages(this._doc);

		    // Extract JSON-LD metadata before removing scripts
		    var jsonLd = this._disableJSONLD ? {} : this._getJSONLD(this._doc);

		    // Remove script tags from the document.
		    this._removeScripts(this._doc);

		    this._prepDocument();

		    var metadata = this._getArticleMetadata(jsonLd);
		    this._articleTitle = metadata.title;

		    var articleContent = this._grabArticle();
		    if (!articleContent) return null;

		    this.log("Grabbed: " + articleContent.innerHTML);

		    this._postProcessContent(articleContent);

		    // If we haven't found an excerpt in the article's metadata, use the article's
		    // first paragraph as the excerpt. This is used for displaying a preview of
		    // the article's content.
		    if (!metadata.excerpt) {
		      var paragraphs = articleContent.getElementsByTagName("p");
		      if (paragraphs.length > 0) {
		        metadata.excerpt = paragraphs[0].textContent.trim();
		      }
		    }

		    var textContent = articleContent.textContent;
		    return {
		      title: this._articleTitle,
		      byline: metadata.byline || this._articleByline,
		      dir: this._articleDir,
		      lang: this._articleLang,
		      content: this._serializer(articleContent),
		      textContent: textContent,
		      length: textContent.length,
		      excerpt: metadata.excerpt,
		      siteName: metadata.siteName || this._articleSiteName,
		    };
		  },
		};

		{
		  /* global module */
		  module.exports = Readability;
		} 
	} (Readability$1));

	var ReadabilityExports = Readability$1.exports;
	var Readability = /*@__PURE__*/getDefaultExportFromCjs(ReadabilityExports);

	/**
	 * Utility functions to send messages between:
	 * - Extension content script
	 * - Extension background page
	 * - embeddedWebReader.js or importerBookmarklet.js (running within 3rd party website)
	 * - bookmarklet.js or bookmarkletAddDocument.js (running within readlang.com iframe)
	 */
	const readlangMessageType = "readlangMessage";
	let importerIFrame;
	/**
	 * @param to - Which context to send the message to
	 * @param message - The message
	 * @param data - Optional data, will be JSON stringified
	 * @param requestId - Optional, only relevant for extension context, used to match request/response
	 */
	const postMessage = (to, message, data, requestId) => {
	    switch (to) {
	        case "extension":
	            window.postMessage(JSON.stringify({
	                type: readlangMessageType,
	                to,
	                message: "backgroundPageMessage",
	                requestId,
	                data: {
	                    message,
	                    data,
	                },
	            }), 
	            // TODO: Should this be window.location.origin?
	            "*");
	            break;
	        case "embeddedWebReader":
	            top.postMessage(JSON.stringify({
	                type: readlangMessageType,
	                to,
	                message,
	                data,
	            }), "*"); // TODO: Parent origin?
	            break;
	        case "webReaderIFrame":
	            {
	                throw Error("web reader iFrameWindow not set");
	            }
	        case "importerIFrame":
	            if (!importerIFrame) {
	                throw Error("importer iFrameWindow not set");
	            }
	            importerIFrame.postMessage(JSON.stringify({
	                type: readlangMessageType,
	                to,
	                message,
	                data,
	            }), "*");
	            break;
	    }
	};
	const setImporterIFrame = (newIFrameWindow) => {
	    importerIFrame = newIFrameWindow;
	};
	const eventListeners = new Map();
	const messageListener = (context, handler) => {
	    if (!("addEventListener" in window)) {
	        alert("The Readlang bookmarklet is not working on this page using this browser." +
	            "\n\nTry using Google Chrome instead.");
	        return;
	    }
	    const listener = (event) => {
	        let data;
	        try {
	            data = JSON.parse(event.data);
	        }
	        catch (_error) {
	            // Ignore non-JSON messages.
	            return;
	        }
	        if ((data === null || data === void 0 ? void 0 : data.type) !== readlangMessageType) {
	            // console.log("Ignoring invalid message", event.data);
	            return;
	        }
	        if (data.to !== context) {
	            // console.log(
	            //   `Ignoring message for different context. ${data.to} !== ${context}`
	            // );
	            return;
	        }
	        handler(data.message, data.data, event);
	    };
	    window.addEventListener("message", listener);
	    eventListeners.set(context, listener);
	};
	const removeMessageListener = (context) => {
	    const listener = eventListeners.get(context);
	    window.removeEventListener("message", listener);
	    eventListeners.delete(context);
	};

	// This file handles the Readlang importer bookmarklet functionality
	/**
	 * This runs within a 3rd party webpage and injects an iFrame pointing to
	 * https://readlang.com/addDocument to provide importing functionality.
	 *
	 * (Analogous to what embeddedWebReader.js does for the web reader.)
	 */
	(() => {
	    var _a, _b;
	    if ((_a = window.READLANG) === null || _a === void 0 ? void 0 : _a.importerBookmarkletLoaded) {
	        alert("You've already run the Readlang importer bookmarklet on this page. To " +
	            "import again, please reload the page and try again.");
	        return;
	    }
	    else {
	        window.READLANG = window.READLANG || {};
	        window.READLANG.importerBookmarkletLoaded = true;
	    }
	    window.console = window.console || {};
	    window.console.log = window.console.log || (() => { });
	    window.console.time = window.console.time || (() => { });
	    window.console.timeEnd = window.console.timeEnd || (() => { });
	    window.readlangHostname = window.readlangHostname || "readlang.com";
	    if (/\.pdf$/.test(window.location.href)) {
	        alert("This page appears to be a PDF which is not currently supported by Readlang.");
	        return;
	    }
	    let protocol = "http://";
	    if (!((_b = window.readlangHostname) === null || _b === void 0 ? void 0 : _b.startsWith("localhost"))) {
	        protocol = "https://";
	    }
	    const generateCss = (definitions) => {
	        const list = [];
	        $.each(definitions, (key, value) => {
	            list.push(key + ": " + value);
	        });
	        return list.join(";");
	    };
	    /**
	     * Extracts the transcript with timestamps from a YouTube video page.
	     * Supports both the new YouTube layout (2026+) and the legacy layout.
	     */
	    const extractTranscript = async () => {
	        // --- Panel detection ---
	        // YouTube has used different container elements for the transcript panel
	        // across different versions of their UI.
	        const findTranscriptPanel = () => {
	            // Primary: YouTube tags the engagement panel containing the transcript
	            // with target-id="engagement-panel-searchable-transcript", regardless of
	            // the user's UI language. This covers both the standalone "Transcript"
	            // panel and the newer "In this video" tabbed panel (Chapters + Transcript).
	            const targetedPanel = Array.from(document.querySelectorAll('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]')).find((panel) => panel.offsetParent !== null);
	            if (targetedPanel)
	                return targetedPanel;
	            // Fallback: any visible engagement panel that already contains transcript
	            // segments (handles future tweaks to the target-id naming).
	            for (const panel of Array.from(document.querySelectorAll("ytd-engagement-panel-section-list-renderer"))) {
	                if (panel.offsetParent !== null &&
	                    panel.querySelectorAll("transcript-segment-view-model").length > 0) {
	                    return panel;
	                }
	            }
	            // Legacy layout: dedicated ytd-transcript-renderer element
	            const legacyRenderer = Array.from(document.querySelectorAll("ytd-transcript-renderer")).find((renderer) => renderer.offsetParent !== null);
	            return legacyRenderer || null;
	        };
	        // --- Open the transcript panel if not already visible ---
	        const openTranscriptPanel = async () => {
	            // YouTube nests the "Show transcript" button inside a renderer element
	            // whose tag name is language-independent. Prefer that over aria-label
	            // matching, which only works when the UI is in English.
	            const findShowTranscriptButton = () => {
	                const structuralButton = Array.from(document.querySelectorAll("ytd-video-description-transcript-section-renderer button")).find((button) => button.offsetParent !== null);
	                if (structuralButton)
	                    return structuralButton;
	                // Localized-substring fallback for layouts where the renderer name
	                // differs. "transcr" matches English ("transcript"), Italian
	                // ("trascrizione"), French ("transcription"), Spanish
	                // ("transcripción"), Portuguese ("transcrição"), German
	                // ("Transkript"), Dutch ("transcriptie"), etc.
	                return (Array.from(document.querySelectorAll("button, tp-yt-paper-button")).find((button) => {
	                    var _a, _b;
	                    const ariaLabel = ((_a = button.getAttribute("aria-label")) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
	                    const text = ((_b = button.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "";
	                    return ((ariaLabel.includes("transcr") || text.includes("transcr")) &&
	                        button.offsetParent !== null);
	                }) || null);
	            };
	            // Try once before expanding the description
	            let transcriptButton = findShowTranscriptButton();
	            if (transcriptButton) {
	                transcriptButton.click();
	                await new Promise((resolve) => setTimeout(resolve, 1500));
	                return;
	            }
	            // Expand the description to reveal the "Show transcript" button
	            const expandButton = document.querySelector("tp-yt-paper-button#expand") ||
	                document.querySelector("tp-yt-paper-button[aria-label*='more']") ||
	                document.querySelector("#description tp-yt-paper-button");
	            if (expandButton) {
	                expandButton.click();
	                await new Promise((resolve) => setTimeout(resolve, 500));
	            }
	            transcriptButton = findShowTranscriptButton();
	            if (transcriptButton) {
	                transcriptButton.click();
	                await new Promise((resolve) => setTimeout(resolve, 1500));
	                return;
	            }
	            // Last resort: three-dot menu
	            const moreButton = document.querySelector("button.ytp-more-button") ||
	                document.querySelector('button[aria-label="More actions"]') ||
	                Array.from(document.querySelectorAll("button")).find((button) => {
	                    var _a, _b;
	                    return ((_a = button.getAttribute("aria-label")) === null || _a === void 0 ? void 0 : _a.includes("More")) ||
	                        ((_b = button.getAttribute("aria-label")) === null || _b === void 0 ? void 0 : _b.includes("menu"));
	                });
	            if (moreButton) {
	                moreButton.click();
	                await new Promise((resolve) => setTimeout(resolve, 500));
	                const transcriptMenuItem = Array.from(document.querySelectorAll("tp-yt-paper-item, ytd-menu-service-item-renderer, ytd-menu-item-renderer")).find((item) => { var _a; return (_a = item.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes("transcr"); });
	                if (transcriptMenuItem) {
	                    transcriptMenuItem.click();
	                    await new Promise((resolve) => setTimeout(resolve, 1500));
	                }
	            }
	        };
	        // --- Segment text extraction ---
	        // Handles both new and legacy DOM structures for individual segments.
	        const extractSegmentText = (segment) => {
	            var _a, _b, _c, _d, _e;
	            // New layout (2025+): transcript-segment-view-model elements
	            const newTimestamp = segment.querySelector(".ytwTranscriptSegmentViewModelTimestamp");
	            // YouTube has changed the text span class over time:
	            // - 2025: span.yt-core-attributed-string
	            // - 2026: span.ytAttributedStringHost (with role="text")
	            // Use role="text" as the primary selector (most robust), with class fallbacks
	            const newText = segment.querySelector('span[role="text"]') ||
	                segment.querySelector("span.ytAttributedStringHost") ||
	                segment.querySelector("span.yt-core-attributed-string");
	            if (newTimestamp && newText) {
	                const timestamp = ((_a = newTimestamp.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
	                const text = ((_b = newText.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
	                if (text)
	                    return timestamp ? `${timestamp} ${text}` : text;
	            }
	            // Legacy layout: ytd-transcript-segment-renderer elements
	            if (segment.tagName === "YTD-TRANSCRIPT-SEGMENT-RENDERER") {
	                const timestampElement = segment.querySelector(".segment-timestamp") ||
	                    segment.querySelector("div:first-child");
	                const timestamp = ((_c = timestampElement === null || timestampElement === void 0 ? void 0 : timestampElement.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || "";
	                const textElement = segment.querySelector(".segment-text") ||
	                    segment.querySelector("yt-formatted-string.segment-text") ||
	                    segment.querySelector("div:last-child");
	                const text = ((_d = textElement === null || textElement === void 0 ? void 0 : textElement.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || "";
	                if (text && text !== timestamp) {
	                    return timestamp ? `${timestamp} ${text}` : text;
	                }
	            }
	            // Generic fallback: try to parse "MM:SS text" from raw text content
	            const allText = ((_e = segment.textContent) === null || _e === void 0 ? void 0 : _e.trim()) || "";
	            const match = allText.match(/^(\d+:\d+)\s+([\s\S]+)$/);
	            if (match)
	                return `${match[1]} ${match[2]}`;
	            return allText || null;
	        };
	        // --- Main extraction logic ---
	        let panel = findTranscriptPanel();
	        if (!panel) {
	            await openTranscriptPanel();
	            await new Promise((resolve) => setTimeout(resolve, 1000));
	            panel = findTranscriptPanel();
	        }
	        if (!panel) {
	            return null;
	        }
	        // Find transcript segments, trying new layout first then legacy selectors
	        let segments = panel.querySelectorAll("transcript-segment-view-model");
	        if (segments.length === 0) {
	            segments = panel.querySelectorAll("ytd-transcript-segment-renderer");
	        }
	        if (segments.length === 0) {
	            const transcriptBody = panel.querySelector("ytd-transcript-body-renderer");
	            if (transcriptBody) {
	                segments = transcriptBody.querySelectorAll("ytd-transcript-segment-renderer");
	            }
	        }
	        if (segments.length === 0) {
	            const segmentList = panel.querySelector("ytd-transcript-segment-list-renderer");
	            if (segmentList) {
	                segments = segmentList.querySelectorAll("div.segment");
	                if (segments.length === 0) {
	                    segments = segmentList.querySelectorAll("ytd-transcript-segment-renderer");
	                }
	            }
	        }
	        if (segments.length === 0) {
	            return null;
	        }
	        let transcript = "";
	        for (const segment of Array.from(segments)) {
	            const line = extractSegmentText(segment);
	            if (line) {
	                transcript += `${line}\n`;
	            }
	        }
	        return transcript || null;
	    };
	    const getReadableHtml = (callback) => {
	        if (window.READLANG && typeof window.READLANG.readableHTML === "string") {
	            callback(null, window.READLANG.readableHTML);
	            return;
	        }
	        let cloned;
	        if (window.READLANG && window.READLANG.originalDocument) {
	            cloned = window.READLANG.originalDocument.cloneNode(true);
	        }
	        else {
	            cloned = document.cloneNode(true);
	        }
	        $(cloned).find("script").remove();
	        const article = new Readability(window.location.href, cloned).parse();
	        callback(null, 
	        /*'<h1>' + article.title + '</h1>\n\n' + */ (article &&
	            article.content) ||
	            "");
	    };
	    const grabPage = () => {
	        var _a, _b, _c, _d, _e, _f;
	        // Because some sites like BBC remove window.alert function
	        const customAlert = (message) => {
	            const dialog = $("<div/>")
	                .text(message)
	                .attr("style", generateCss({
	                position: "fixed",
	                left: "50%",
	                top: "50%",
	                "margin-left": "-150px",
	                "margin-top": "-100px",
	                padding: "30px",
	                width: "300px",
	                "background-color": "#000",
	                color: "#fff",
	                "font-size": "22px",
	                "line-height": "1.1em",
	                "z-index": "99999",
	            }));
	            $("body").append(dialog);
	        };
	        const searchQuery = "?bust=" +
	            ((_b = (_a = window.READLANG) === null || _a === void 0 ? void 0 : _a.gitCommit) !== null && _b !== void 0 ? _b : new Date().getTime()) +
	            // Initially we used "true" and then moved to numbers for versioning, starting with "2"
	            (((_c = window.READLANG) === null || _c === void 0 ? void 0 : _c.chromeExtension)
	                ? `&chromeExtension=${typeof ((_d = window.READLANG) === null || _d === void 0 ? void 0 : _d.chromeExtension) === "number" &&
                    ((_e = window.READLANG) === null || _e === void 0 ? void 0 : _e.chromeExtension) > 1
                    ? (_f = window.READLANG) === null || _f === void 0 ? void 0 : _f.chromeExtension
                    : "true"}`
	                : "");
	        const iFrame = $('<iframe id="readlangIframe"/>')
	            .attr("src", protocol + window.readlangHostname + "/addDocument" + searchQuery)
	            .attr("style", generateCss({
	            position: "fixed",
	            top: "0",
	            left: "0",
	            width: "100%!important",
	            height: "220px",
	            opacity: "0.95",
	            "background-color": "#000",
	            "z-index": "9999999999!important",
	            border: "0",
	            transition: "0.5s transform ease-out",
	            transform: "translateY(-100%)",
	        }));
	        setTimeout(() => {
	            iFrame.css("transform", "translateY(0)");
	        }, 100);
	        if (!("addEventListener" in window)) {
	            customAlert("Import function not working on this page using this browser." +
	                "\n\nTry using Google Chrome.");
	            return;
	        }
	        const removeIFrame = () => {
	            iFrame.css("transform", "translateY(-100%)");
	            setTimeout(() => {
	                iFrame.remove();
	            }, 600);
	        };
	        const eventListener = (message, _data, rawEvent) => {
	            var _a;
	            if (!new RegExp(window.readlangHostname || "").test(rawEvent.origin)) {
	                return;
	            }
	            switch (message) {
	                case "addDocumentBookmarkletLoaded": {
	                    setImporterIFrame(rawEvent.source);
	                    let imageURL = $('meta[property="og:image"]').attr("content");
	                    if (!imageURL) {
	                        // get largest image on page, weighted by height within document
	                        let largestArea = 0;
	                        $("img").each(function () {
	                            const $this = $(this);
	                            if ($this.is(":visible")) {
	                                let area = $this.width() * $this.height();
	                                let weight = 1 - 0.8 * ($this.offset().top / $(document).height());
	                                // 2x bonus for 1st page
	                                if ($this.offset().top < 500) {
	                                    weight += 1;
	                                }
	                                area *= weight;
	                                if (area > largestArea) {
	                                    largestArea = area;
	                                    imageURL = $this.prop("src");
	                                }
	                            }
	                        });
	                    }
	                    // Extract YouTube video ID from URL
	                    const extractYouTubeVideoId = (url) => {
	                        const watchMatch = url.match(/^https?:\/\/(www\.)?youtube\.com\/watch\?(.*&)?v=([^&]+)/);
	                        if (watchMatch)
	                            return watchMatch[3];
	                        const liveMatch = url.match(/^https?:\/\/(www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
	                        if (liveMatch)
	                            return liveMatch[2];
	                        return null;
	                    };
	                    const youTubeVideoId = extractYouTubeVideoId(window.location.href);
	                    if (youTubeVideoId) {
	                        extractTranscript()
	                            .then((transcript) => {
	                            if (transcript) {
	                                const timeoutToEnsureContentScriptIsLoaded = 500;
	                                setTimeout(() => {
	                                    postMessage("importerIFrame", "readlangImporterYouTube", {
	                                        title: window.document.title,
	                                        url: window.location.href,
	                                        youTubeID: youTubeVideoId,
	                                        transcript,
	                                    });
	                                }, timeoutToEnsureContentScriptIsLoaded);
	                            }
	                            else {
	                                alert("Failed to extract transcript from YouTube video.");
	                                removeIFrame();
	                            }
	                        })
	                            .catch((error) => {
	                            alert("Error extracting transcript: " + error.message);
	                            removeIFrame();
	                        });
	                        return;
	                    }
	                    getReadableHtml((err, readableHtml) => {
	                        const timeoutToEnsureContentScriptIsLoaded = 500;
	                        // send data
	                        setTimeout(() => {
	                            postMessage("importerIFrame", "readlangImporterText", {
	                                title: window.document.title,
	                                url: window.location.href,
	                                html: readableHtml,
	                                imageURL: imageURL,
	                            });
	                        }, timeoutToEnsureContentScriptIsLoaded);
	                    });
	                    break;
	                }
	                case "removeReadlangBookmarklet": {
	                    removeIFrame();
	                    // Firefox doesn't let us run the script twice from background.js so let's reload the
	                    // page at this point as a workaround
	                    if (((_a = window.READLANG) === null || _a === void 0 ? void 0 : _a.extensionBrowser) === "firefox") {
	                        window.location.reload();
	                    }
	                    else {
	                        removeMessageListener("embeddedWebReader");
	                        window.READLANG.importerBookmarkletLoaded = false;
	                    }
	                    break;
	                }
	            }
	        };
	        messageListener("embeddedWebReader", eventListener);
	        $("body").append(iFrame);
	        return;
	    };
	    // workaround for slashdot pages which don't ever get to 'complete',
	    // e.g. http://science.slashdot.org/story/13/05/31/1523245/confirmed-water-once-flowed-on-mars
	    if (document.readyState === "interactive") {
	        grabPage();
	    }
	    else {
	        $(document).ready(() => {
	            grabPage();
	        });
	    }
	})();

})();
//# sourceMappingURL=importerBookmarklet.js.map
