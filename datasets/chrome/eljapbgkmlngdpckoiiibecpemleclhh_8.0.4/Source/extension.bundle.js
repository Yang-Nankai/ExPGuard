(()=>{var e,t,n={697:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>g});var r=n(526),o=n(411),i=n(686),a=n(160),s=n(211),l=n(190),u=function(e,t,n){for(var r=0,i=0;r=i,i=(0,o.fj)(),38===r&&12===i&&(t[n]=1),!(0,o.r)(i);)(0,o.lp)();return(0,o.tP)(e,o.FK)},c=function(e,t){return(0,o.cE)(function(e,t){var n=-1,r=44;do{switch((0,o.r)(r)){case 0:38===r&&12===(0,o.fj)()&&(t[n]=1),e[n]+=u(o.FK-1,t,n);break;case 2:e[n]+=(0,o.iF)(r);break;case 4:if(44===r){e[++n]=58===(0,o.fj)()?"&\f":"",t[n]=e[n].length;break}default:e[n]+=(0,i.Dp)(r)}}while(r=(0,o.lp)());return e}((0,o.un)(e),t))},f=new WeakMap,d=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,n=e.parent,r=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||f.get(n))&&!r){f.set(e,!0);for(var o=[],i=c(t,o),a=n.props,s=0,l=0;s<i.length;s++)for(var u=0;u<a.length;u++,l++)e.props[l]=o[s]?i[s].replace(/&\f/g,a[u]):a[u]+" "+i[s]}}},p=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}},h=[a.Ji];const g=function(e){var t=e.key;if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var o=e.stylisPlugins||h;var i,u,c={},f=[];i=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),n=1;n<t.length;n++)c[t[n]]=!0;f.push(e)}));var g=[d,p];var m,v=[s.P,(0,a.cD)((function(e){m.insert(e)}))],y=(0,a.qR)(g.concat(o,v));u=function(e,t,n,r){var o;m=n,o=e?e+"{"+t.styles+"}":t.styles,(0,s.q)((0,l.MY)(o),y),r&&(b.inserted[t.name]=!0)};var b={key:t,sheet:new r.m({key:t,container:i,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:c,registered:{},insert:u};return b.sheet.hydrate(f),b}},506:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=function(e){for(var t,n=0,r=0,o=e.length;o>=4;++r,o-=4)t=1540483477*(65535&(t=255&e.charCodeAt(r)|(255&e.charCodeAt(++r))<<8|(255&e.charCodeAt(++r))<<16|(255&e.charCodeAt(++r))<<24))+(59797*(t>>>16)<<16),n=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(o){case 3:n^=(255&e.charCodeAt(r+2))<<16;case 2:n^=(255&e.charCodeAt(r+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(r)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)}},866:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=function(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}},865:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(679),o=n.n(r);const i=function(e,t){return o()(e,t)}},880:(e,t,n)=>{"use strict";var r;n.d(t,{C:()=>p,E:()=>E,T:()=>m,_:()=>h,a:()=>v,b:()=>b,c:()=>S,d:()=>w,h:()=>f,u:()=>k,w:()=>g});var o=n(294),i=n(697),a=n(462),s=n(220),l=n(865),u=n(444),c=n(302),f={}.hasOwnProperty,d=(0,o.createContext)("undefined"!=typeof HTMLElement?(0,i.default)({key:"css"}):null);var p=d.Provider,h=function(){return(0,o.useContext)(d)},g=function(e){return(0,o.forwardRef)((function(t,n){var r=(0,o.useContext)(d);return e(t,r,n)}))},m=(0,o.createContext)({});var v=function(){return(0,o.useContext)(m)},y=(0,s.Z)((function(e){return(0,s.Z)((function(t){return function(e,t){return"function"==typeof t?t(e):(0,a.Z)({},e,t)}(e,t)}))})),b=function(e){var t=(0,o.useContext)(m);return e.theme!==t&&(t=y(t)(e.theme)),(0,o.createElement)(m.Provider,{value:t},e.children)};function w(e){var t=e.displayName||e.name||"Component",n=function(t,n){var r=(0,o.useContext)(m);return(0,o.createElement)(e,(0,a.Z)({theme:r,ref:n},t))},r=(0,o.forwardRef)(n);return r.displayName="WithTheme("+t+")",(0,l.Z)(r,e)}var x=(r||(r=n.t(o,2))).useInsertionEffect?(r||(r=n.t(o,2))).useInsertionEffect:function(e){e()};function k(e){x(e)}var _="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",S=function(e,t){var n={};for(var r in t)f.call(t,r)&&(n[r]=t[r]);return n[_]=e,n},O=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;(0,u.hC)(t,n,r);k((function(){return(0,u.My)(t,n,r)}));return null},E=g((function(e,t,n){var r=e.css;"string"==typeof r&&void 0!==t.registered[r]&&(r=t.registered[r]);var i=e[_],a=[r],s="";"string"==typeof e.className?s=(0,u.fp)(t.registered,a,e.className):null!=e.className&&(s=e.className+" ");var l=(0,c.O)(a,void 0,(0,o.useContext)(m));s+=t.key+"-"+l.name;var d={};for(var p in e)f.call(e,p)&&"css"!==p&&p!==_&&(d[p]=e[p]);return d.ref=n,d.className=s,(0,o.createElement)(o.Fragment,null,(0,o.createElement)(O,{cache:t,serialized:l,isStringTag:"string"==typeof i}),(0,o.createElement)(i,d))}))},917:(e,t,n)=>{"use strict";var r;n.r(t),n.d(t,{CacheProvider:()=>i.C,ClassNames:()=>v,Global:()=>f,ThemeContext:()=>i.T,ThemeProvider:()=>i.b,__unsafe_useEmotionCache:()=>i._,createElement:()=>u,css:()=>d,jsx:()=>u,keyframes:()=>p,useTheme:()=>i.a,withEmotionCache:()=>i.w,withTheme:()=>i.d});var o=n(294),i=(n(697),n(880)),a=(n(679),n(444)),s=n(302),l=n(526),u=function(e,t){var n=arguments;if(null==t||!i.h.call(t,"css"))return o.createElement.apply(void 0,n);var r=n.length,a=new Array(r);a[0]=i.E,a[1]=(0,i.c)(e,t);for(var s=2;s<r;s++)a[s]=n[s];return o.createElement.apply(null,a)},c=(r||(r=n.t(o,2))).useInsertionEffect?(r||(r=n.t(o,2))).useInsertionEffect:o.useLayoutEffect,f=(0,i.w)((function(e,t){var n=e.styles,r=(0,s.O)([n],void 0,(0,o.useContext)(i.T)),u=(0,o.useRef)();return c((function(){var e=t.key+"-global",n=new l.m({key:e,nonce:t.sheet.nonce,container:t.sheet.container,speedy:t.sheet.isSpeedy}),o=!1,i=document.querySelector('style[data-emotion="'+e+" "+r.name+'"]');return t.sheet.tags.length&&(n.before=t.sheet.tags[0]),null!==i&&(o=!0,i.setAttribute("data-emotion",e),n.hydrate([i])),u.current=[n,o],function(){n.flush()}}),[t]),c((function(){var e=u.current,n=e[0];if(e[1])e[1]=!1;else{if(void 0!==r.next&&(0,a.My)(t,r.next,!0),n.tags.length){var o=n.tags[n.tags.length-1].nextElementSibling;n.before=o,n.flush()}t.insert("",r,n,!1)}}),[t,r.name]),null}));function d(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,s.O)(t)}var p=function(){var e=d.apply(void 0,arguments),t="animation-"+e.name;return{name:t,styles:"@keyframes "+t+"{"+e.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}},h=function e(t){for(var n=t.length,r=0,o="";r<n;r++){var i=t[r];if(null!=i){var a=void 0;switch(typeof i){case"boolean":break;case"object":if(Array.isArray(i))a=e(i);else for(var s in a="",i)i[s]&&s&&(a&&(a+=" "),a+=s);break;default:a=i}a&&(o&&(o+=" "),o+=a)}}return o};function g(e,t,n){var r=[],o=(0,a.fp)(e,r,n);return r.length<2?n:o+t(r)}var m=function(e){var t=e.cache,n=e.serializedArr;(0,i.u)((function(){for(var e=0;e<n.length;e++)(0,a.My)(t,n[e],!1)}));return null},v=(0,i.w)((function(e,t){var n=[],r=function(){for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];var i=(0,s.O)(r,t.registered);return n.push(i),(0,a.hC)(t,i,!1),t.key+"-"+i.name},l={css:r,cx:function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return g(t.registered,r,h(n))},theme:(0,o.useContext)(i.T)},u=e.children(l);return!0,(0,o.createElement)(o.Fragment,null,(0,o.createElement)(m,{cache:t,serializedArr:n}),u)}))},302:(e,t,n)=>{"use strict";n.d(t,{O:()=>g});var r=n(506),o=n(351),i=n(866),a=/[A-Z]|^ms/g,s=/_EMO_([^_]+?)_([^]*?)_EMO_/g,l=function(e){return 45===e.charCodeAt(1)},u=function(e){return null!=e&&"boolean"!=typeof e},c=(0,i.Z)((function(e){return l(e)?e:e.replace(a,"-$&").toLowerCase()})),f=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(s,(function(e,t,n){return p={name:t,styles:n,next:p},t}))}return 1===o.Z[e]||l(e)||"number"!=typeof t||0===t?t:t+"px"};function d(e,t,n){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return p={name:n.name,styles:n.styles,next:p},n.name;if(void 0!==n.styles){var r=n.next;if(void 0!==r)for(;void 0!==r;)p={name:r.name,styles:r.styles,next:p},r=r.next;return n.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var o=0;o<n.length;o++)r+=d(e,t,n[o])+";";else for(var i in n){var a=n[i];if("object"!=typeof a)null!=t&&void 0!==t[a]?r+=i+"{"+t[a]+"}":u(a)&&(r+=c(i)+":"+f(i,a)+";");else if(!Array.isArray(a)||"string"!=typeof a[0]||null!=t&&void 0!==t[a[0]]){var s=d(e,t,a);switch(i){case"animation":case"animationName":r+=c(i)+":"+s+";";break;default:r+=i+"{"+s+"}"}}else for(var l=0;l<a.length;l++)u(a[l])&&(r+=c(i)+":"+f(i,a[l])+";")}return r}(e,t,n);case"function":if(void 0!==e){var o=p,i=n(e);return p=o,d(e,t,i)}}if(null==t)return n;var a=t[n];return void 0!==a?a:n}var p,h=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var g=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var o=!0,i="";p=void 0;var a=e[0];null==a||void 0===a.raw?(o=!1,i+=d(n,t,a)):i+=a[0];for(var s=1;s<e.length;s++)i+=d(n,t,e[s]),o&&(i+=a[s]);h.lastIndex=0;for(var l,u="";null!==(l=h.exec(i));)u+="-"+l[1];return{name:(0,r.Z)(i)+u,styles:i,next:p}}},526:(e,t,n)=>{"use strict";n.d(t,{m:()=>r});var r=function(){function e(e){var t=this;this._insertTag=function(e){var n;n=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{n.insertRule(e,n.cssRules.length)}catch(e){0}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}()},351:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1}},444:(e,t,n)=>{"use strict";n.d(t,{My:()=>i,fp:()=>r,hC:()=>o});function r(e,t,n){var r="";return n.split(" ").forEach((function(n){void 0!==e[n]?t.push(e[n]+";"):r+=n+" "})),r}var o=function(e,t,n){var r=e.key+"-"+t.name;!1===n&&void 0===e.registered[r]&&(e.registered[r]=t.styles)},i=function(e,t,n){o(e,t,n);var r=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var i=t;do{e.insert(t===i?"."+r:"",i,e.sheet,!0);i=i.next}while(void 0!==i)}}},220:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=function(e){var t=new WeakMap;return function(n){if(t.has(n))return t.get(n);var r=e(n);return t.set(n,r),r}}},583:(e,t,n)=>{"use strict";
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(294),o=n(418),i=n(840);function a(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!r)throw Error(a(227));var s=new Set,l={};function u(e,t){c(e,t),c(e+"Capture",t)}function c(e,t){for(l[e]=t,e=0;e<t.length;e++)s.add(t[e])}var f=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),d=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p=Object.prototype.hasOwnProperty,h={},g={};function m(e,t,n,r,o,i,a){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var v={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){v[e]=new m(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];v[t]=new m(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){v[e]=new m(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){v[e]=new m(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){v[e]=new m(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){v[e]=new m(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){v[e]=new m(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){v[e]=new m(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){v[e]=new m(e,5,!1,e.toLowerCase(),null,!1,!1)}));var y=/[\-:]([a-z])/g;function b(e){return e[1].toUpperCase()}function w(e,t,n,r){var o=v.hasOwnProperty(t)?v[t]:null;(null!==o?0===o.type:!r&&(2<t.length&&("o"===t[0]||"O"===t[0])&&("n"===t[1]||"N"===t[1])))||(function(e,t,n,r){if(null==t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,o,r)&&(n=null),r||null===o?function(e){return!!p.call(g,e)||!p.call(h,e)&&(d.test(e)?g[e]=!0:(h[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=null===n?3!==o.type&&"":n:(t=o.attributeName,r=o.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(o=o.type)||4===o&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(y,b);v[t]=new m(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(y,b);v[t]=new m(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(y,b);v[t]=new m(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){v[e]=new m(e,1,!1,e.toLowerCase(),null,!1,!1)})),v.xlinkHref=new m("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){v[e]=new m(e,1,!1,e.toLowerCase(),null,!0,!0)}));var x=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,k=60103,_=60106,S=60107,O=60108,E=60114,C=60109,j=60110,T=60112,P=60113,M=60120,L=60115,N=60116,R=60121,D=60128,$=60129,F=60130,A=60131;if("function"==typeof Symbol&&Symbol.for){var I=Symbol.for;k=I("react.element"),_=I("react.portal"),S=I("react.fragment"),O=I("react.strict_mode"),E=I("react.profiler"),C=I("react.provider"),j=I("react.context"),T=I("react.forward_ref"),P=I("react.suspense"),M=I("react.suspense_list"),L=I("react.memo"),N=I("react.lazy"),R=I("react.block"),I("react.scope"),D=I("react.opaque.id"),$=I("react.debug_trace_mode"),F=I("react.offscreen"),A=I("react.legacy_hidden")}var z,B="function"==typeof Symbol&&Symbol.iterator;function U(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=B&&e[B]||e["@@iterator"])?e:null}function V(e){if(void 0===z)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);z=t&&t[1]||""}return"\n"+z+e}var H=!1;function W(e,t){if(!e||H)return"";H=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(e){var r=e}Reflect.construct(e,[],t)}else{try{t.call()}catch(e){r=e}e.call(t.prototype)}else{try{throw Error()}catch(e){r=e}e()}}catch(e){if(e&&r&&"string"==typeof e.stack){for(var o=e.stack.split("\n"),i=r.stack.split("\n"),a=o.length-1,s=i.length-1;1<=a&&0<=s&&o[a]!==i[s];)s--;for(;1<=a&&0<=s;a--,s--)if(o[a]!==i[s]){if(1!==a||1!==s)do{if(a--,0>--s||o[a]!==i[s])return"\n"+o[a].replace(" at new "," at ")}while(1<=a&&0<=s);break}}}finally{H=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?V(e):""}function q(e){switch(e.tag){case 5:return V(e.type);case 16:return V("Lazy");case 13:return V("Suspense");case 19:return V("SuspenseList");case 0:case 2:case 15:return e=W(e.type,!1);case 11:return e=W(e.type.render,!1);case 22:return e=W(e.type._render,!1);case 1:return e=W(e.type,!0);default:return""}}function Y(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case S:return"Fragment";case _:return"Portal";case E:return"Profiler";case O:return"StrictMode";case P:return"Suspense";case M:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case j:return(e.displayName||"Context")+".Consumer";case C:return(e._context.displayName||"Context")+".Provider";case T:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef");case L:return Y(e.type);case R:return Y(e._render);case N:t=e._payload,e=e._init;try{return Y(e(t))}catch(e){}}return null}function G(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}function X(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function K(e){e._valueTracker||(e._valueTracker=function(e){var t=X(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(e){r=""+e,i.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function Q(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=X(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function Z(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function J(e,t){var n=t.checked;return o({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function ee(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=G(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function te(e,t){null!=(t=t.checked)&&w(e,"checked",t,!1)}function ne(e,t){te(e,t);var n=G(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?oe(e,t.type,n):t.hasOwnProperty("defaultValue")&&oe(e,t.type,G(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function re(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function oe(e,t,n){"number"===t&&Z(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}function ie(e,t){return e=o({children:void 0},t),(t=function(e){var t="";return r.Children.forEach(e,(function(e){null!=e&&(t+=e)})),t}(t.children))&&(e.children=t),e}function ae(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+G(n),t=null,o=0;o<e.length;o++){if(e[o].value===n)return e[o].selected=!0,void(r&&(e[o].defaultSelected=!0));null!==t||e[o].disabled||(t=e[o])}null!==t&&(t.selected=!0)}}function se(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(a(91));return o({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function le(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(a(92));if(Array.isArray(n)){if(!(1>=n.length))throw Error(a(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:G(n)}}function ue(e,t){var n=G(t.value),r=G(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function ce(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}var fe="http://www.w3.org/1999/xhtml",de="http://www.w3.org/2000/svg";function pe(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function he(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?pe(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var ge,me,ve=(me=function(e,t){if(e.namespaceURI!==de||"innerHTML"in e)e.innerHTML=t;else{for((ge=ge||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ge.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return me(e,t)}))}:me);function ye(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var be={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},we=["Webkit","ms","Moz","O"];function xe(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||be.hasOwnProperty(e)&&be[e]?(""+t).trim():t+"px"}function ke(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),o=xe(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}Object.keys(be).forEach((function(e){we.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),be[t]=be[e]}))}));var _e=o({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Se(e,t){if(t){if(_e[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(a(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(a(60));if("object"!=typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(a(61))}if(null!=t.style&&"object"!=typeof t.style)throw Error(a(62))}}function Oe(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function Ee(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Ce=null,je=null,Te=null;function Pe(e){if(e=ro(e)){if("function"!=typeof Ce)throw Error(a(280));var t=e.stateNode;t&&(t=io(t),Ce(e.stateNode,e.type,t))}}function Me(e){je?Te?Te.push(e):Te=[e]:je=e}function Le(){if(je){var e=je,t=Te;if(Te=je=null,Pe(e),t)for(e=0;e<t.length;e++)Pe(t[e])}}function Ne(e,t){return e(t)}function Re(e,t,n,r,o){return e(t,n,r,o)}function De(){}var $e=Ne,Fe=!1,Ae=!1;function Ie(){null===je&&null===Te||(De(),Le())}function ze(e,t){var n=e.stateNode;if(null===n)return null;var r=io(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!=typeof n)throw Error(a(231,t,typeof n));return n}var Be=!1;if(f)try{var Ue={};Object.defineProperty(Ue,"passive",{get:function(){Be=!0}}),window.addEventListener("test",Ue,Ue),window.removeEventListener("test",Ue,Ue)}catch(me){Be=!1}function Ve(e,t,n,r,o,i,a,s,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(e){this.onError(e)}}var He=!1,We=null,qe=!1,Ye=null,Ge={onError:function(e){He=!0,We=e}};function Xe(e,t,n,r,o,i,a,s,l){He=!1,We=null,Ve.apply(Ge,arguments)}function Ke(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!=(1026&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function Qe(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function Ze(e){if(Ke(e)!==e)throw Error(a(188))}function Je(e){if(e=function(e){var t=e.alternate;if(!t){if(null===(t=Ke(e)))throw Error(a(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(null===o)break;var i=o.alternate;if(null===i){if(null!==(r=o.return)){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return Ze(o),e;if(i===r)return Ze(o),t;i=i.sibling}throw Error(a(188))}if(n.return!==r.return)n=o,r=i;else{for(var s=!1,l=o.child;l;){if(l===n){s=!0,n=o,r=i;break}if(l===r){s=!0,r=o,n=i;break}l=l.sibling}if(!s){for(l=i.child;l;){if(l===n){s=!0,n=i,r=o;break}if(l===r){s=!0,r=i,n=o;break}l=l.sibling}if(!s)throw Error(a(189))}}if(n.alternate!==r)throw Error(a(190))}if(3!==n.tag)throw Error(a(188));return n.stateNode.current===n?e:t}(e),!e)return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}function et(e,t){for(var n=e.alternate;null!==t;){if(t===e||t===n)return!0;t=t.return}return!1}var tt,nt,rt,ot,it=!1,at=[],st=null,lt=null,ut=null,ct=new Map,ft=new Map,dt=[],pt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ht(e,t,n,r,o){return{blockedOn:e,domEventName:t,eventSystemFlags:16|n,nativeEvent:o,targetContainers:[r]}}function gt(e,t){switch(e){case"focusin":case"focusout":st=null;break;case"dragenter":case"dragleave":lt=null;break;case"mouseover":case"mouseout":ut=null;break;case"pointerover":case"pointerout":ct.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ft.delete(t.pointerId)}}function mt(e,t,n,r,o,i){return null===e||e.nativeEvent!==i?(e=ht(t,n,r,o,i),null!==t&&(null!==(t=ro(t))&&nt(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==o&&-1===t.indexOf(o)&&t.push(o),e)}function vt(e){var t=no(e.target);if(null!==t){var n=Ke(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=Qe(n)))return e.blockedOn=t,void ot(e.lanePriority,(function(){i.unstable_runWithPriority(e.priority,(function(){rt(n)}))}))}else if(3===t&&n.stateNode.hydrate)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function yt(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Jt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=ro(n))&&nt(t),e.blockedOn=n,!1;t.shift()}return!0}function bt(e,t,n){yt(e)&&n.delete(t)}function wt(){for(it=!1;0<at.length;){var e=at[0];if(null!==e.blockedOn){null!==(e=ro(e.blockedOn))&&tt(e);break}for(var t=e.targetContainers;0<t.length;){var n=Jt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n){e.blockedOn=n;break}t.shift()}null===e.blockedOn&&at.shift()}null!==st&&yt(st)&&(st=null),null!==lt&&yt(lt)&&(lt=null),null!==ut&&yt(ut)&&(ut=null),ct.forEach(bt),ft.forEach(bt)}function xt(e,t){e.blockedOn===t&&(e.blockedOn=null,it||(it=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,wt)))}function kt(e){function t(t){return xt(t,e)}if(0<at.length){xt(at[0],e);for(var n=1;n<at.length;n++){var r=at[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==st&&xt(st,e),null!==lt&&xt(lt,e),null!==ut&&xt(ut,e),ct.forEach(t),ft.forEach(t),n=0;n<dt.length;n++)(r=dt[n]).blockedOn===e&&(r.blockedOn=null);for(;0<dt.length&&null===(n=dt[0]).blockedOn;)vt(n),null===n.blockedOn&&dt.shift()}function _t(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var St={animationend:_t("Animation","AnimationEnd"),animationiteration:_t("Animation","AnimationIteration"),animationstart:_t("Animation","AnimationStart"),transitionend:_t("Transition","TransitionEnd")},Ot={},Et={};function Ct(e){if(Ot[e])return Ot[e];if(!St[e])return e;var t,n=St[e];for(t in n)if(n.hasOwnProperty(t)&&t in Et)return Ot[e]=n[t];return e}f&&(Et=document.createElement("div").style,"AnimationEvent"in window||(delete St.animationend.animation,delete St.animationiteration.animation,delete St.animationstart.animation),"TransitionEvent"in window||delete St.transitionend.transition);var jt=Ct("animationend"),Tt=Ct("animationiteration"),Pt=Ct("animationstart"),Mt=Ct("transitionend"),Lt=new Map,Nt=new Map,Rt=["abort","abort",jt,"animationEnd",Tt,"animationIteration",Pt,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Mt,"transitionEnd","waiting","waiting"];function Dt(e,t){for(var n=0;n<e.length;n+=2){var r=e[n],o=e[n+1];o="on"+(o[0].toUpperCase()+o.slice(1)),Nt.set(r,t),Lt.set(r,o),u(o,[r])}}(0,i.unstable_now)();var $t=8;function Ft(e){if(0!=(1&e))return $t=15,1;if(0!=(2&e))return $t=14,2;if(0!=(4&e))return $t=13,4;var t=24&e;return 0!==t?($t=12,t):0!=(32&e)?($t=11,32):0!==(t=192&e)?($t=10,t):0!=(256&e)?($t=9,256):0!==(t=3584&e)?($t=8,t):0!=(4096&e)?($t=7,4096):0!==(t=4186112&e)?($t=6,t):0!==(t=62914560&e)?($t=5,t):67108864&e?($t=4,67108864):0!=(134217728&e)?($t=3,134217728):0!==(t=805306368&e)?($t=2,t):0!=(1073741824&e)?($t=1,1073741824):($t=8,e)}function At(e,t){var n=e.pendingLanes;if(0===n)return $t=0;var r=0,o=0,i=e.expiredLanes,a=e.suspendedLanes,s=e.pingedLanes;if(0!==i)r=i,o=$t=15;else if(0!==(i=134217727&n)){var l=i&~a;0!==l?(r=Ft(l),o=$t):0!==(s&=i)&&(r=Ft(s),o=$t)}else 0!==(i=n&~a)?(r=Ft(i),o=$t):0!==s&&(r=Ft(s),o=$t);if(0===r)return 0;if(r=n&((0>(r=31-Ht(r))?0:1<<r)<<1)-1,0!==t&&t!==r&&0==(t&a)){if(Ft(t),o<=$t)return t;$t=o}if(0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)o=1<<(n=31-Ht(t)),r|=e[n],t&=~o;return r}function It(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function zt(e,t){switch(e){case 15:return 1;case 14:return 2;case 12:return 0===(e=Bt(24&~t))?zt(10,t):e;case 10:return 0===(e=Bt(192&~t))?zt(8,t):e;case 8:return 0===(e=Bt(3584&~t))&&(0===(e=Bt(4186112&~t))&&(e=512)),e;case 2:return 0===(t=Bt(805306368&~t))&&(t=268435456),t}throw Error(a(358,e))}function Bt(e){return e&-e}function Ut(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Vt(e,t,n){e.pendingLanes|=t;var r=t-1;e.suspendedLanes&=r,e.pingedLanes&=r,(e=e.eventTimes)[t=31-Ht(t)]=n}var Ht=Math.clz32?Math.clz32:function(e){return 0===e?32:31-(Wt(e)/qt|0)|0},Wt=Math.log,qt=Math.LN2;var Yt=i.unstable_UserBlockingPriority,Gt=i.unstable_runWithPriority,Xt=!0;function Kt(e,t,n,r){Fe||De();var o=Zt,i=Fe;Fe=!0;try{Re(o,e,t,n,r)}finally{(Fe=i)||Ie()}}function Qt(e,t,n,r){Gt(Yt,Zt.bind(null,e,t,n,r))}function Zt(e,t,n,r){var o;if(Xt)if((o=0==(4&t))&&0<at.length&&-1<pt.indexOf(e))e=ht(null,e,t,n,r),at.push(e);else{var i=Jt(e,t,n,r);if(null===i)o&&gt(e,r);else{if(o){if(-1<pt.indexOf(e))return e=ht(i,e,t,n,r),void at.push(e);if(function(e,t,n,r,o){switch(t){case"focusin":return st=mt(st,e,t,n,r,o),!0;case"dragenter":return lt=mt(lt,e,t,n,r,o),!0;case"mouseover":return ut=mt(ut,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return ct.set(i,mt(ct.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,ft.set(i,mt(ft.get(i)||null,e,t,n,r,o)),!0}return!1}(i,e,t,n,r))return;gt(e,r)}Dr(e,t,r,null,n)}}}function Jt(e,t,n,r){var o=Ee(r);if(null!==(o=no(o))){var i=Ke(o);if(null===i)o=null;else{var a=i.tag;if(13===a){if(null!==(o=Qe(i)))return o;o=null}else if(3===a){if(i.stateNode.hydrate)return 3===i.tag?i.stateNode.containerInfo:null;o=null}else i!==o&&(o=null)}}return Dr(e,t,r,o,n),null}var en=null,tn=null,nn=null;function rn(){if(nn)return nn;var e,t,n=tn,r=n.length,o="value"in en?en.value:en.textContent,i=o.length;for(e=0;e<r&&n[e]===o[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===o[i-t];t++);return nn=o.slice(e,1<t?1-t:void 0)}function on(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function an(){return!0}function sn(){return!1}function ln(e){function t(t,n,r,o,i){for(var a in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=o,this.target=i,this.currentTarget=null,e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(o):o[a]);return this.isDefaultPrevented=(null!=o.defaultPrevented?o.defaultPrevented:!1===o.returnValue)?an:sn,this.isPropagationStopped=sn,this}return o(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=an)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=an)},persist:function(){},isPersistent:an}),t}var un,cn,fn,dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pn=ln(dn),hn=o({},dn,{view:0,detail:0}),gn=ln(hn),mn=o({},hn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:jn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==fn&&(fn&&"mousemove"===e.type?(un=e.screenX-fn.screenX,cn=e.screenY-fn.screenY):cn=un=0,fn=e),un)},movementY:function(e){return"movementY"in e?e.movementY:cn}}),vn=ln(mn),yn=ln(o({},mn,{dataTransfer:0})),bn=ln(o({},hn,{relatedTarget:0})),wn=ln(o({},dn,{animationName:0,elapsedTime:0,pseudoElement:0})),xn=o({},dn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),kn=ln(xn),_n=ln(o({},dn,{data:0})),Sn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},On={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},En={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=En[e])&&!!t[e]}function jn(){return Cn}var Tn=o({},hn,{key:function(e){if(e.key){var t=Sn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=on(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?On[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:jn,charCode:function(e){return"keypress"===e.type?on(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?on(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),Pn=ln(Tn),Mn=ln(o({},mn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Ln=ln(o({},hn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:jn})),Nn=ln(o({},dn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Rn=o({},mn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dn=ln(Rn),$n=[9,13,27,32],Fn=f&&"CompositionEvent"in window,An=null;f&&"documentMode"in document&&(An=document.documentMode);var In=f&&"TextEvent"in window&&!An,zn=f&&(!Fn||An&&8<An&&11>=An),Bn=String.fromCharCode(32),Un=!1;function Vn(e,t){switch(e){case"keyup":return-1!==$n.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hn(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var Wn=!1;var qn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!qn[e.type]:"textarea"===t}function Gn(e,t,n,r){Me(r),0<(t=Fr(t,"onChange")).length&&(n=new pn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Xn=null,Kn=null;function Qn(e){Tr(e,0)}function Zn(e){if(Q(oo(e)))return e}function Jn(e,t){if("change"===e)return t}var er=!1;if(f){var tr;if(f){var nr="oninput"in document;if(!nr){var rr=document.createElement("div");rr.setAttribute("oninput","return;"),nr="function"==typeof rr.oninput}tr=nr}else tr=!1;er=tr&&(!document.documentMode||9<document.documentMode)}function or(){Xn&&(Xn.detachEvent("onpropertychange",ir),Kn=Xn=null)}function ir(e){if("value"===e.propertyName&&Zn(Kn)){var t=[];if(Gn(t,Kn,e,Ee(e)),e=Qn,Fe)e(t);else{Fe=!0;try{Ne(e,t)}finally{Fe=!1,Ie()}}}}function ar(e,t,n){"focusin"===e?(or(),Kn=n,(Xn=t).attachEvent("onpropertychange",ir)):"focusout"===e&&or()}function sr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Zn(Kn)}function lr(e,t){if("click"===e)return Zn(t)}function ur(e,t){if("input"===e||"change"===e)return Zn(t)}var cr="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},fr=Object.prototype.hasOwnProperty;function dr(e,t){if(cr(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!fr.call(t,n[r])||!cr(e[n[r]],t[n[r]]))return!1;return!0}function pr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hr(e,t){var n,r=pr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=pr(r)}}function gr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?gr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function mr(){for(var e=window,t=Z();t instanceof e.HTMLIFrameElement;){try{var n="string"==typeof t.contentWindow.location.href}catch(e){n=!1}if(!n)break;t=Z((e=t.contentWindow).document)}return t}function vr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var yr=f&&"documentMode"in document&&11>=document.documentMode,br=null,wr=null,xr=null,kr=!1;function _r(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;kr||null==br||br!==Z(r)||("selectionStart"in(r=br)&&vr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},xr&&dr(xr,r)||(xr=r,0<(r=Fr(wr,"onSelect")).length&&(t=new pn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=br)))}Dt("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0),Dt("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1),Dt(Rt,2);for(var Sr="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),Or=0;Or<Sr.length;Or++)Nt.set(Sr[Or],0);c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Er));function jr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,o,i,s,l,u){if(Xe.apply(this,arguments),He){if(!He)throw Error(a(198));var c=We;He=!1,We=null,qe||(qe=!0,Ye=c)}}(r,t,void 0,e),e.currentTarget=null}function Tr(e,t){t=0!=(4&t);for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],l=s.instance,u=s.currentTarget;if(s=s.listener,l!==i&&o.isPropagationStopped())break e;jr(o,s,u),i=l}else for(a=0;a<r.length;a++){if(l=(s=r[a]).instance,u=s.currentTarget,s=s.listener,l!==i&&o.isPropagationStopped())break e;jr(o,s,u),i=l}}}if(qe)throw e=Ye,qe=!1,Ye=null,e}function Pr(e,t){var n=ao(t),r=e+"__bubble";n.has(r)||(Rr(t,e,2,!1),n.add(r))}var Mr="_reactListening"+Math.random().toString(36).slice(2);function Lr(e){e[Mr]||(e[Mr]=!0,s.forEach((function(t){Cr.has(t)||Nr(t,!1,e,null),Nr(t,!0,e,null)})))}function Nr(e,t,n,r){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,i=n;if("selectionchange"===e&&9!==n.nodeType&&(i=n.ownerDocument),null!==r&&!t&&Cr.has(e)){if("scroll"!==e)return;o|=2,i=r}var a=ao(i),s=e+"__"+(t?"capture":"bubble");a.has(s)||(t&&(o|=4),Rr(i,e,o,t),a.add(s))}function Rr(e,t,n,r){var o=Nt.get(t);switch(void 0===o?2:o){case 0:o=Kt;break;case 1:o=Qt;break;default:o=Zt}n=o.bind(null,t,n,e),o=void 0,!Be||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(o=!0),r?void 0!==o?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):void 0!==o?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function Dr(e,t,n,r,o){var i=r;if(0==(1&t)&&0==(2&t)&&null!==r)e:for(;;){if(null===r)return;var a=r.tag;if(3===a||4===a){var s=r.stateNode.containerInfo;if(s===o||8===s.nodeType&&s.parentNode===o)break;if(4===a)for(a=r.return;null!==a;){var l=a.tag;if((3===l||4===l)&&((l=a.stateNode.containerInfo)===o||8===l.nodeType&&l.parentNode===o))return;a=a.return}for(;null!==s;){if(null===(a=no(s)))return;if(5===(l=a.tag)||6===l){r=i=a;continue e}s=s.parentNode}}r=r.return}!function(e,t,n){if(Ae)return e(t,n);Ae=!0;try{$e(e,t,n)}finally{Ae=!1,Ie()}}((function(){var r=i,o=Ee(n),a=[];e:{var s=Lt.get(e);if(void 0!==s){var l=pn,u=e;switch(e){case"keypress":if(0===on(n))break e;case"keydown":case"keyup":l=Pn;break;case"focusin":u="focus",l=bn;break;case"focusout":u="blur",l=bn;break;case"beforeblur":case"afterblur":l=bn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":l=vn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=yn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=Ln;break;case jt:case Tt:case Pt:l=wn;break;case Mt:l=Nn;break;case"scroll":l=gn;break;case"wheel":l=Dn;break;case"copy":case"cut":case"paste":l=kn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=Mn}var c=0!=(4&t),f=!c&&"scroll"===e,d=c?null!==s?s+"Capture":null:s;c=[];for(var p,h=r;null!==h;){var g=(p=h).stateNode;if(5===p.tag&&null!==g&&(p=g,null!==d&&(null!=(g=ze(h,d))&&c.push($r(h,g,p)))),f)break;h=h.return}0<c.length&&(s=new l(s,u,null,n,o),a.push({event:s,listeners:c}))}}if(0==(7&t)){if(l="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||0!=(16&t)||!(u=n.relatedTarget||n.fromElement)||!no(u)&&!u[eo])&&(l||s)&&(s=o.window===o?o:(s=o.ownerDocument)?s.defaultView||s.parentWindow:window,l?(l=r,null!==(u=(u=n.relatedTarget||n.toElement)?no(u):null)&&(u!==(f=Ke(u))||5!==u.tag&&6!==u.tag)&&(u=null)):(l=null,u=r),l!==u)){if(c=vn,g="onMouseLeave",d="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(c=Mn,g="onPointerLeave",d="onPointerEnter",h="pointer"),f=null==l?s:oo(l),p=null==u?s:oo(u),(s=new c(g,h+"leave",l,n,o)).target=f,s.relatedTarget=p,g=null,no(o)===r&&((c=new c(d,h+"enter",u,n,o)).target=p,c.relatedTarget=f,g=c),f=g,l&&u)e:{for(d=u,h=0,p=c=l;p;p=Ar(p))h++;for(p=0,g=d;g;g=Ar(g))p++;for(;0<h-p;)c=Ar(c),h--;for(;0<p-h;)d=Ar(d),p--;for(;h--;){if(c===d||null!==d&&c===d.alternate)break e;c=Ar(c),d=Ar(d)}c=null}else c=null;null!==l&&Ir(a,s,l,c,!1),null!==u&&null!==f&&Ir(a,f,u,c,!0)}if("select"===(l=(s=r?oo(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===l&&"file"===s.type)var m=Jn;else if(Yn(s))if(er)m=ur;else{m=sr;var v=ar}else(l=s.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===s.type||"radio"===s.type)&&(m=lr);switch(m&&(m=m(e,r))?Gn(a,m,n,o):(v&&v(e,s,r),"focusout"===e&&(v=s._wrapperState)&&v.controlled&&"number"===s.type&&oe(s,"number",s.value)),v=r?oo(r):window,e){case"focusin":(Yn(v)||"true"===v.contentEditable)&&(br=v,wr=r,xr=null);break;case"focusout":xr=wr=br=null;break;case"mousedown":kr=!0;break;case"contextmenu":case"mouseup":case"dragend":kr=!1,_r(a,n,o);break;case"selectionchange":if(yr)break;case"keydown":case"keyup":_r(a,n,o)}var y;if(Fn)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else Wn?Vn(e,n)&&(b="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(b="onCompositionStart");b&&(zn&&"ko"!==n.locale&&(Wn||"onCompositionStart"!==b?"onCompositionEnd"===b&&Wn&&(y=rn()):(tn="value"in(en=o)?en.value:en.textContent,Wn=!0)),0<(v=Fr(r,b)).length&&(b=new _n(b,e,null,n,o),a.push({event:b,listeners:v}),y?b.data=y:null!==(y=Hn(n))&&(b.data=y))),(y=In?function(e,t){switch(e){case"compositionend":return Hn(t);case"keypress":return 32!==t.which?null:(Un=!0,Bn);case"textInput":return(e=t.data)===Bn&&Un?null:e;default:return null}}(e,n):function(e,t){if(Wn)return"compositionend"===e||!Fn&&Vn(e,t)?(e=rn(),nn=tn=en=null,Wn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return zn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=Fr(r,"onBeforeInput")).length&&(o=new _n("onBeforeInput","beforeinput",null,n,o),a.push({event:o,listeners:r}),o.data=y))}Tr(a,t)}))}function $r(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Fr(e,t){for(var n=t+"Capture",r=[];null!==e;){var o=e,i=o.stateNode;5===o.tag&&null!==i&&(o=i,null!=(i=ze(e,n))&&r.unshift($r(e,i,o)),null!=(i=ze(e,t))&&r.push($r(e,i,o))),e=e.return}return r}function Ar(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Ir(e,t,n,r,o){for(var i=t._reactName,a=[];null!==n&&n!==r;){var s=n,l=s.alternate,u=s.stateNode;if(null!==l&&l===r)break;5===s.tag&&null!==u&&(s=u,o?null!=(l=ze(n,i))&&a.unshift($r(n,l,s)):o||null!=(l=ze(n,i))&&a.push($r(n,l,s))),n=n.return}0!==a.length&&e.push({event:t,listeners:a})}function zr(){}var Br=null,Ur=null;function Vr(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function Hr(e,t){return"textarea"===e||"option"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var Wr="function"==typeof setTimeout?setTimeout:void 0,qr="function"==typeof clearTimeout?clearTimeout:void 0;function Yr(e){1===e.nodeType?e.textContent="":9===e.nodeType&&(null!=(e=e.body)&&(e.textContent=""))}function Gr(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break}return e}function Xr(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var Kr=0;var Qr=Math.random().toString(36).slice(2),Zr="__reactFiber$"+Qr,Jr="__reactProps$"+Qr,eo="__reactContainer$"+Qr,to="__reactEvents$"+Qr;function no(e){var t=e[Zr];if(t)return t;for(var n=e.parentNode;n;){if(t=n[eo]||n[Zr]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=Xr(e);null!==e;){if(n=e[Zr])return n;e=Xr(e)}return t}n=(e=n).parentNode}return null}function ro(e){return!(e=e[Zr]||e[eo])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function oo(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(a(33))}function io(e){return e[Jr]||null}function ao(e){var t=e[to];return void 0===t&&(t=e[to]=new Set),t}var so=[],lo=-1;function uo(e){return{current:e}}function co(e){0>lo||(e.current=so[lo],so[lo]=null,lo--)}function fo(e,t){lo++,so[lo]=e.current,e.current=t}var po={},ho=uo(po),go=uo(!1),mo=po;function vo(e,t){var n=e.type.contextTypes;if(!n)return po;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o,i={};for(o in n)i[o]=t[o];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function yo(e){return null!=(e=e.childContextTypes)}function bo(){co(go),co(ho)}function wo(e,t,n){if(ho.current!==po)throw Error(a(168));fo(ho,t),fo(go,n)}function xo(e,t,n){var r=e.stateNode;if(e=t.childContextTypes,"function"!=typeof r.getChildContext)return n;for(var i in r=r.getChildContext())if(!(i in e))throw Error(a(108,Y(t)||"Unknown",i));return o({},n,r)}function ko(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||po,mo=ho.current,fo(ho,e),fo(go,go.current),!0}function _o(e,t,n){var r=e.stateNode;if(!r)throw Error(a(169));n?(e=xo(e,t,mo),r.__reactInternalMemoizedMergedChildContext=e,co(go),co(ho),fo(ho,e)):co(go),fo(go,n)}var So=null,Oo=null,Eo=i.unstable_runWithPriority,Co=i.unstable_scheduleCallback,jo=i.unstable_cancelCallback,To=i.unstable_shouldYield,Po=i.unstable_requestPaint,Mo=i.unstable_now,Lo=i.unstable_getCurrentPriorityLevel,No=i.unstable_ImmediatePriority,Ro=i.unstable_UserBlockingPriority,Do=i.unstable_NormalPriority,$o=i.unstable_LowPriority,Fo=i.unstable_IdlePriority,Ao={},Io=void 0!==Po?Po:function(){},zo=null,Bo=null,Uo=!1,Vo=Mo(),Ho=1e4>Vo?Mo:function(){return Mo()-Vo};function Wo(){switch(Lo()){case No:return 99;case Ro:return 98;case Do:return 97;case $o:return 96;case Fo:return 95;default:throw Error(a(332))}}function qo(e){switch(e){case 99:return No;case 98:return Ro;case 97:return Do;case 96:return $o;case 95:return Fo;default:throw Error(a(332))}}function Yo(e,t){return e=qo(e),Eo(e,t)}function Go(e,t,n){return e=qo(e),Co(e,t,n)}function Xo(){if(null!==Bo){var e=Bo;Bo=null,jo(e)}Ko()}function Ko(){if(!Uo&&null!==zo){Uo=!0;var e=0;try{var t=zo;Yo(99,(function(){for(;e<t.length;e++){var n=t[e];do{n=n(!0)}while(null!==n)}})),zo=null}catch(t){throw null!==zo&&(zo=zo.slice(e+1)),Co(No,Xo),t}finally{Uo=!1}}}var Qo=x.ReactCurrentBatchConfig;function Zo(e,t){if(e&&e.defaultProps){for(var n in t=o({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}var Jo=uo(null),ei=null,ti=null,ni=null;function ri(){ni=ti=ei=null}function oi(e){var t=Jo.current;co(Jo),e.type._context._currentValue=t}function ii(e,t){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)===t){if(null===n||(n.childLanes&t)===t)break;n.childLanes|=t}else e.childLanes|=t,null!==n&&(n.childLanes|=t);e=e.return}}function ai(e,t){ei=e,ni=ti=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!=(e.lanes&t)&&(Fa=!0),e.firstContext=null)}function si(e,t){if(ni!==e&&!1!==t&&0!==t)if("number"==typeof t&&1073741823!==t||(ni=e,t=1073741823),t={context:e,observedBits:t,next:null},null===ti){if(null===ei)throw Error(a(308));ti=t,ei.dependencies={lanes:0,firstContext:t,responders:null}}else ti=ti.next=t;return e._currentValue}var li=!1;function ui(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}function ci(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function fi(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function di(e,t){if(null!==(e=e.updateQueue)){var n=(e=e.shared).pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}}function pi(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var o=null,i=null;if(null!==(n=n.firstBaseUpdate)){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===i?o=i=a:i=i.next=a,n=n.next}while(null!==n);null===i?o=i=t:i=i.next=t}else o=i=t;return n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function hi(e,t,n,r){var i=e.updateQueue;li=!1;var a=i.firstBaseUpdate,s=i.lastBaseUpdate,l=i.shared.pending;if(null!==l){i.shared.pending=null;var u=l,c=u.next;u.next=null,null===s?a=c:s.next=c,s=u;var f=e.alternate;if(null!==f){var d=(f=f.updateQueue).lastBaseUpdate;d!==s&&(null===d?f.firstBaseUpdate=c:d.next=c,f.lastBaseUpdate=u)}}if(null!==a){for(d=i.baseState,s=0,f=c=u=null;;){l=a.lane;var p=a.eventTime;if((r&l)===l){null!==f&&(f=f.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var h=e,g=a;switch(l=t,p=n,g.tag){case 1:if("function"==typeof(h=g.payload)){d=h.call(p,d,l);break e}d=h;break e;case 3:h.flags=-4097&h.flags|64;case 0:if(null==(l="function"==typeof(h=g.payload)?h.call(p,d,l):h))break e;d=o({},d,l);break e;case 2:li=!0}}null!==a.callback&&(e.flags|=32,null===(l=i.effects)?i.effects=[a]:l.push(a))}else p={eventTime:p,lane:l,tag:a.tag,payload:a.payload,callback:a.callback,next:null},null===f?(c=f=p,u=d):f=f.next=p,s|=l;if(null===(a=a.next)){if(null===(l=i.shared.pending))break;a=l.next,l.next=null,i.lastBaseUpdate=l,i.shared.pending=null}}null===f&&(u=d),i.baseState=u,i.firstBaseUpdate=c,i.lastBaseUpdate=f,Bs|=s,e.lanes=s,e.memoizedState=d}}function gi(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(null!==o){if(r.callback=null,r=n,"function"!=typeof o)throw Error(a(191,o));o.call(r)}}}var mi=(new r.Component).refs;function vi(e,t,n,r){n=null==(n=n(r,t=e.memoizedState))?t:o({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var yi={isMounted:function(e){return!!(e=e._reactInternals)&&Ke(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=dl(),o=pl(e),i=fi(r,o);i.payload=t,null!=n&&(i.callback=n),di(e,i),hl(e,o,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=dl(),o=pl(e),i=fi(r,o);i.tag=1,i.payload=t,null!=n&&(i.callback=n),di(e,i),hl(e,o,r)},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=dl(),r=pl(e),o=fi(n,r);o.tag=2,null!=t&&(o.callback=t),di(e,o),hl(e,r,n)}};function bi(e,t,n,r,o,i,a){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,i,a):!t.prototype||!t.prototype.isPureReactComponent||(!dr(n,r)||!dr(o,i))}function wi(e,t,n){var r=!1,o=po,i=t.contextType;return"object"==typeof i&&null!==i?i=si(i):(o=yo(t)?mo:ho.current,i=(r=null!=(r=t.contextTypes))?vo(e,o):po),t=new t(n,i),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=yi,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function xi(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&yi.enqueueReplaceState(t,t.state,null)}function ki(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs=mi,ui(e);var i=t.contextType;"object"==typeof i&&null!==i?o.context=si(i):(i=yo(t)?mo:ho.current,o.context=vo(e,i)),hi(e,n,o,r),o.state=e.memoizedState,"function"==typeof(i=t.getDerivedStateFromProps)&&(vi(e,t,i,n),o.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof o.getSnapshotBeforeUpdate||"function"!=typeof o.UNSAFE_componentWillMount&&"function"!=typeof o.componentWillMount||(t=o.state,"function"==typeof o.componentWillMount&&o.componentWillMount(),"function"==typeof o.UNSAFE_componentWillMount&&o.UNSAFE_componentWillMount(),t!==o.state&&yi.enqueueReplaceState(o,o.state,null),hi(e,n,o,r),o.state=e.memoizedState),"function"==typeof o.componentDidMount&&(e.flags|=4)}var _i=Array.isArray;function Si(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(a(309));var r=n.stateNode}if(!r)throw Error(a(147,e));var o=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===o?t.ref:(t=function(e){var t=r.refs;t===mi&&(t=r.refs={}),null===e?delete t[o]:t[o]=e},t._stringRef=o,t)}if("string"!=typeof e)throw Error(a(284));if(!n._owner)throw Error(a(290,e))}return e}function Oi(e,t){if("textarea"!==e.type)throw Error(a(31,"[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t))}function Ei(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.flags=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function o(e,t){return(e=ql(e,t)).index=0,e.sibling=null,e}function i(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags=2,n):r:(t.flags=2,n):n}function s(t){return e&&null===t.alternate&&(t.flags=2),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Kl(n,e.mode,r)).return=e,t):((t=o(t,n)).return=e,t)}function u(e,t,n,r){return null!==t&&t.elementType===n.type?((r=o(t,n.props)).ref=Si(e,t,n),r.return=e,r):((r=Yl(n.type,n.key,n.props,null,e.mode,r)).ref=Si(e,t,n),r.return=e,r)}function c(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Ql(n,e.mode,r)).return=e,t):((t=o(t,n.children||[])).return=e,t)}function f(e,t,n,r,i){return null===t||7!==t.tag?((t=Gl(n,e.mode,r,i)).return=e,t):((t=o(t,n)).return=e,t)}function d(e,t,n){if("string"==typeof t||"number"==typeof t)return(t=Kl(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case k:return(n=Yl(t.type,t.key,t.props,null,e.mode,n)).ref=Si(e,null,t),n.return=e,n;case _:return(t=Ql(t,e.mode,n)).return=e,t}if(_i(t)||U(t))return(t=Gl(t,e.mode,n,null)).return=e,t;Oi(e,t)}return null}function p(e,t,n,r){var o=null!==t?t.key:null;if("string"==typeof n||"number"==typeof n)return null!==o?null:l(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case k:return n.key===o?n.type===S?f(e,t,n.props.children,r,o):u(e,t,n,r):null;case _:return n.key===o?c(e,t,n,r):null}if(_i(n)||U(n))return null!==o?null:f(e,t,n,r,null);Oi(e,n)}return null}function h(e,t,n,r,o){if("string"==typeof r||"number"==typeof r)return l(t,e=e.get(n)||null,""+r,o);if("object"==typeof r&&null!==r){switch(r.$$typeof){case k:return e=e.get(null===r.key?n:r.key)||null,r.type===S?f(t,e,r.props.children,o,r.key):u(t,e,r,o);case _:return c(t,e=e.get(null===r.key?n:r.key)||null,r,o)}if(_i(r)||U(r))return f(t,e=e.get(n)||null,r,o,null);Oi(t,r)}return null}function g(o,a,s,l){for(var u=null,c=null,f=a,g=a=0,m=null;null!==f&&g<s.length;g++){f.index>g?(m=f,f=null):m=f.sibling;var v=p(o,f,s[g],l);if(null===v){null===f&&(f=m);break}e&&f&&null===v.alternate&&t(o,f),a=i(v,a,g),null===c?u=v:c.sibling=v,c=v,f=m}if(g===s.length)return n(o,f),u;if(null===f){for(;g<s.length;g++)null!==(f=d(o,s[g],l))&&(a=i(f,a,g),null===c?u=f:c.sibling=f,c=f);return u}for(f=r(o,f);g<s.length;g++)null!==(m=h(f,o,g,s[g],l))&&(e&&null!==m.alternate&&f.delete(null===m.key?g:m.key),a=i(m,a,g),null===c?u=m:c.sibling=m,c=m);return e&&f.forEach((function(e){return t(o,e)})),u}function m(o,s,l,u){var c=U(l);if("function"!=typeof c)throw Error(a(150));if(null==(l=c.call(l)))throw Error(a(151));for(var f=c=null,g=s,m=s=0,v=null,y=l.next();null!==g&&!y.done;m++,y=l.next()){g.index>m?(v=g,g=null):v=g.sibling;var b=p(o,g,y.value,u);if(null===b){null===g&&(g=v);break}e&&g&&null===b.alternate&&t(o,g),s=i(b,s,m),null===f?c=b:f.sibling=b,f=b,g=v}if(y.done)return n(o,g),c;if(null===g){for(;!y.done;m++,y=l.next())null!==(y=d(o,y.value,u))&&(s=i(y,s,m),null===f?c=y:f.sibling=y,f=y);return c}for(g=r(o,g);!y.done;m++,y=l.next())null!==(y=h(g,o,m,y.value,u))&&(e&&null!==y.alternate&&g.delete(null===y.key?m:y.key),s=i(y,s,m),null===f?c=y:f.sibling=y,f=y);return e&&g.forEach((function(e){return t(o,e)})),c}return function(e,r,i,l){var u="object"==typeof i&&null!==i&&i.type===S&&null===i.key;u&&(i=i.props.children);var c="object"==typeof i&&null!==i;if(c)switch(i.$$typeof){case k:e:{for(c=i.key,u=r;null!==u;){if(u.key===c){if(7===u.tag){if(i.type===S){n(e,u.sibling),(r=o(u,i.props.children)).return=e,e=r;break e}}else if(u.elementType===i.type){n(e,u.sibling),(r=o(u,i.props)).ref=Si(e,u,i),r.return=e,e=r;break e}n(e,u);break}t(e,u),u=u.sibling}i.type===S?((r=Gl(i.props.children,e.mode,l,i.key)).return=e,e=r):((l=Yl(i.type,i.key,i.props,null,e.mode,l)).ref=Si(e,r,i),l.return=e,e=l)}return s(e);case _:e:{for(u=i.key;null!==r;){if(r.key===u){if(4===r.tag&&r.stateNode.containerInfo===i.containerInfo&&r.stateNode.implementation===i.implementation){n(e,r.sibling),(r=o(r,i.children||[])).return=e,e=r;break e}n(e,r);break}t(e,r),r=r.sibling}(r=Ql(i,e.mode,l)).return=e,e=r}return s(e)}if("string"==typeof i||"number"==typeof i)return i=""+i,null!==r&&6===r.tag?(n(e,r.sibling),(r=o(r,i)).return=e,e=r):(n(e,r),(r=Kl(i,e.mode,l)).return=e,e=r),s(e);if(_i(i))return g(e,r,i,l);if(U(i))return m(e,r,i,l);if(c&&Oi(e,i),void 0===i&&!u)switch(e.tag){case 1:case 22:case 0:case 11:case 15:throw Error(a(152,Y(e.type)||"Component"))}return n(e,r)}}var Ci=Ei(!0),ji=Ei(!1),Ti={},Pi=uo(Ti),Mi=uo(Ti),Li=uo(Ti);function Ni(e){if(e===Ti)throw Error(a(174));return e}function Ri(e,t){switch(fo(Li,t),fo(Mi,e),fo(Pi,Ti),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:he(null,"");break;default:t=he(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}co(Pi),fo(Pi,t)}function Di(){co(Pi),co(Mi),co(Li)}function $i(e){Ni(Li.current);var t=Ni(Pi.current),n=he(t,e.type);t!==n&&(fo(Mi,e),fo(Pi,n))}function Fi(e){Mi.current===e&&(co(Pi),co(Mi))}var Ai=uo(0);function Ii(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!=(64&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zi=null,Bi=null,Ui=!1;function Vi(e,t){var n=Hl(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.flags=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function Hi(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,!0);default:return!1}}function Wi(e){if(Ui){var t=Bi;if(t){var n=t;if(!Hi(e,t)){if(!(t=Gr(n.nextSibling))||!Hi(e,t))return e.flags=-1025&e.flags|2,Ui=!1,void(zi=e);Vi(zi,n)}zi=e,Bi=Gr(t.firstChild)}else e.flags=-1025&e.flags|2,Ui=!1,zi=e}}function qi(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;zi=e}function Yi(e){if(e!==zi)return!1;if(!Ui)return qi(e),Ui=!0,!1;var t=e.type;if(5!==e.tag||"head"!==t&&"body"!==t&&!Hr(t,e.memoizedProps))for(t=Bi;t;)Vi(e,t),t=Gr(t.nextSibling);if(qi(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(a(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){Bi=Gr(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}Bi=null}}else Bi=zi?Gr(e.stateNode.nextSibling):null;return!0}function Gi(){Bi=zi=null,Ui=!1}var Xi=[];function Ki(){for(var e=0;e<Xi.length;e++)Xi[e]._workInProgressVersionPrimary=null;Xi.length=0}var Qi=x.ReactCurrentDispatcher,Zi=x.ReactCurrentBatchConfig,Ji=0,ea=null,ta=null,na=null,ra=!1,oa=!1;function ia(){throw Error(a(321))}function aa(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!cr(e[n],t[n]))return!1;return!0}function sa(e,t,n,r,o,i){if(Ji=i,ea=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Qi.current=null===e||null===e.memoizedState?Na:Ra,e=n(r,o),oa){i=0;do{if(oa=!1,!(25>i))throw Error(a(301));i+=1,na=ta=null,t.updateQueue=null,Qi.current=Da,e=n(r,o)}while(oa)}if(Qi.current=La,t=null!==ta&&null!==ta.next,Ji=0,na=ta=ea=null,ra=!1,t)throw Error(a(300));return e}function la(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===na?ea.memoizedState=na=e:na=na.next=e,na}function ua(){if(null===ta){var e=ea.alternate;e=null!==e?e.memoizedState:null}else e=ta.next;var t=null===na?ea.memoizedState:na.next;if(null!==t)na=t,ta=e;else{if(null===e)throw Error(a(310));e={memoizedState:(ta=e).memoizedState,baseState:ta.baseState,baseQueue:ta.baseQueue,queue:ta.queue,next:null},null===na?ea.memoizedState=na=e:na=na.next=e}return na}function ca(e,t){return"function"==typeof t?t(e):t}function fa(e){var t=ua(),n=t.queue;if(null===n)throw Error(a(311));n.lastRenderedReducer=e;var r=ta,o=r.baseQueue,i=n.pending;if(null!==i){if(null!==o){var s=o.next;o.next=i.next,i.next=s}r.baseQueue=o=i,n.pending=null}if(null!==o){o=o.next,r=r.baseState;var l=s=i=null,u=o;do{var c=u.lane;if((Ji&c)===c)null!==l&&(l=l.next={lane:0,action:u.action,eagerReducer:u.eagerReducer,eagerState:u.eagerState,next:null}),r=u.eagerReducer===e?u.eagerState:e(r,u.action);else{var f={lane:c,action:u.action,eagerReducer:u.eagerReducer,eagerState:u.eagerState,next:null};null===l?(s=l=f,i=r):l=l.next=f,ea.lanes|=c,Bs|=c}u=u.next}while(null!==u&&u!==o);null===l?i=r:l.next=s,cr(r,t.memoizedState)||(Fa=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=l,n.lastRenderedState=r}return[t.memoizedState,n.dispatch]}function da(e){var t=ua(),n=t.queue;if(null===n)throw Error(a(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(null!==o){n.pending=null;var s=o=o.next;do{i=e(i,s.action),s=s.next}while(s!==o);cr(i,t.memoizedState)||(Fa=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function pa(e,t,n){var r=t._getVersion;r=r(t._source);var o=t._workInProgressVersionPrimary;if(null!==o?e=o===r:(e=e.mutableReadLanes,(e=(Ji&e)===e)&&(t._workInProgressVersionPrimary=r,Xi.push(t))),e)return n(t._source);throw Xi.push(t),Error(a(350))}function ha(e,t,n,r){var o=Ns;if(null===o)throw Error(a(349));var i=t._getVersion,s=i(t._source),l=Qi.current,u=l.useState((function(){return pa(o,t,n)})),c=u[1],f=u[0];u=na;var d=e.memoizedState,p=d.refs,h=p.getSnapshot,g=d.source;d=d.subscribe;var m=ea;return e.memoizedState={refs:p,source:t,subscribe:r},l.useEffect((function(){p.getSnapshot=n,p.setSnapshot=c;var e=i(t._source);if(!cr(s,e)){e=n(t._source),cr(f,e)||(c(e),e=pl(m),o.mutableReadLanes|=e&o.pendingLanes),e=o.mutableReadLanes,o.entangledLanes|=e;for(var r=o.entanglements,a=e;0<a;){var l=31-Ht(a),u=1<<l;r[l]|=e,a&=~u}}}),[n,t,r]),l.useEffect((function(){return r(t._source,(function(){var e=p.getSnapshot,n=p.setSnapshot;try{n(e(t._source));var r=pl(m);o.mutableReadLanes|=r&o.pendingLanes}catch(e){n((function(){throw e}))}}))}),[t,r]),cr(h,n)&&cr(g,t)&&cr(d,r)||((e={pending:null,dispatch:null,lastRenderedReducer:ca,lastRenderedState:f}).dispatch=c=Ma.bind(null,ea,e),u.queue=e,u.baseQueue=null,f=pa(o,t,n),u.memoizedState=u.baseState=f),f}function ga(e,t,n){return ha(ua(),e,t,n)}function ma(e){var t=la();return"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e,e=(e=t.queue={pending:null,dispatch:null,lastRenderedReducer:ca,lastRenderedState:e}).dispatch=Ma.bind(null,ea,e),[t.memoizedState,e]}function va(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=ea.updateQueue)?(t={lastEffect:null},ea.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ya(e){return e={current:e},la().memoizedState=e}function ba(){return ua().memoizedState}function wa(e,t,n,r){var o=la();ea.flags|=e,o.memoizedState=va(1|t,n,void 0,void 0===r?null:r)}function xa(e,t,n,r){var o=ua();r=void 0===r?null:r;var i=void 0;if(null!==ta){var a=ta.memoizedState;if(i=a.destroy,null!==r&&aa(r,a.deps))return void va(t,n,i,r)}ea.flags|=e,o.memoizedState=va(1|t,n,i,r)}function ka(e,t){return wa(516,4,e,t)}function _a(e,t){return xa(516,4,e,t)}function Sa(e,t){return xa(4,2,e,t)}function Oa(e,t){return"function"==typeof t?(e=e(),t(e),function(){t(null)}):null!=t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Ea(e,t,n){return n=null!=n?n.concat([e]):null,xa(4,2,Oa.bind(null,t,e),n)}function Ca(){}function ja(e,t){var n=ua();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&aa(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ta(e,t){var n=ua();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&aa(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Pa(e,t){var n=Wo();Yo(98>n?98:n,(function(){e(!0)})),Yo(97<n?97:n,(function(){var n=Zi.transition;Zi.transition=1;try{e(!1),t()}finally{Zi.transition=n}}))}function Ma(e,t,n){var r=dl(),o=pl(e),i={lane:o,action:n,eagerReducer:null,eagerState:null,next:null},a=t.pending;if(null===a?i.next=i:(i.next=a.next,a.next=i),t.pending=i,a=e.alternate,e===ea||null!==a&&a===ea)oa=ra=!0;else{if(0===e.lanes&&(null===a||0===a.lanes)&&null!==(a=t.lastRenderedReducer))try{var s=t.lastRenderedState,l=a(s,n);if(i.eagerReducer=a,i.eagerState=l,cr(l,s))return}catch(e){}hl(e,o,r)}}var La={readContext:si,useCallback:ia,useContext:ia,useEffect:ia,useImperativeHandle:ia,useLayoutEffect:ia,useMemo:ia,useReducer:ia,useRef:ia,useState:ia,useDebugValue:ia,useDeferredValue:ia,useTransition:ia,useMutableSource:ia,useOpaqueIdentifier:ia,unstable_isNewReconciler:!1},Na={readContext:si,useCallback:function(e,t){return la().memoizedState=[e,void 0===t?null:t],e},useContext:si,useEffect:ka,useImperativeHandle:function(e,t,n){return n=null!=n?n.concat([e]):null,wa(4,2,Oa.bind(null,t,e),n)},useLayoutEffect:function(e,t){return wa(4,2,e,t)},useMemo:function(e,t){var n=la();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=la();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e=(e=r.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t}).dispatch=Ma.bind(null,ea,e),[r.memoizedState,e]},useRef:ya,useState:ma,useDebugValue:Ca,useDeferredValue:function(e){var t=ma(e),n=t[0],r=t[1];return ka((function(){var t=Zi.transition;Zi.transition=1;try{r(e)}finally{Zi.transition=t}}),[e]),n},useTransition:function(){var e=ma(!1),t=e[0];return ya(e=Pa.bind(null,e[1])),[e,t]},useMutableSource:function(e,t,n){var r=la();return r.memoizedState={refs:{getSnapshot:t,setSnapshot:null},source:e,subscribe:n},ha(r,e,t,n)},useOpaqueIdentifier:function(){if(Ui){var e=!1,t=function(e){return{$$typeof:D,toString:e,valueOf:e}}((function(){throw e||(e=!0,n("r:"+(Kr++).toString(36))),Error(a(355))})),n=ma(t)[1];return 0==(2&ea.mode)&&(ea.flags|=516,va(5,(function(){n("r:"+(Kr++).toString(36))}),void 0,null)),t}return ma(t="r:"+(Kr++).toString(36)),t},unstable_isNewReconciler:!1},Ra={readContext:si,useCallback:ja,useContext:si,useEffect:_a,useImperativeHandle:Ea,useLayoutEffect:Sa,useMemo:Ta,useReducer:fa,useRef:ba,useState:function(){return fa(ca)},useDebugValue:Ca,useDeferredValue:function(e){var t=fa(ca),n=t[0],r=t[1];return _a((function(){var t=Zi.transition;Zi.transition=1;try{r(e)}finally{Zi.transition=t}}),[e]),n},useTransition:function(){var e=fa(ca)[0];return[ba().current,e]},useMutableSource:ga,useOpaqueIdentifier:function(){return fa(ca)[0]},unstable_isNewReconciler:!1},Da={readContext:si,useCallback:ja,useContext:si,useEffect:_a,useImperativeHandle:Ea,useLayoutEffect:Sa,useMemo:Ta,useReducer:da,useRef:ba,useState:function(){return da(ca)},useDebugValue:Ca,useDeferredValue:function(e){var t=da(ca),n=t[0],r=t[1];return _a((function(){var t=Zi.transition;Zi.transition=1;try{r(e)}finally{Zi.transition=t}}),[e]),n},useTransition:function(){var e=da(ca)[0];return[ba().current,e]},useMutableSource:ga,useOpaqueIdentifier:function(){return da(ca)[0]},unstable_isNewReconciler:!1},$a=x.ReactCurrentOwner,Fa=!1;function Aa(e,t,n,r){t.child=null===e?ji(t,null,n,r):Ci(t,e.child,n,r)}function Ia(e,t,n,r,o){n=n.render;var i=t.ref;return ai(t,o),r=sa(e,t,n,r,i,o),null===e||Fa?(t.flags|=1,Aa(e,t,r,o),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~o,is(e,t,o))}function za(e,t,n,r,o,i){if(null===e){var a=n.type;return"function"!=typeof a||Wl(a)||void 0!==a.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Yl(n.type,null,r,t,t.mode,i)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=a,Ba(e,t,a,r,o,i))}return a=e.child,0==(o&i)&&(o=a.memoizedProps,(n=null!==(n=n.compare)?n:dr)(o,r)&&e.ref===t.ref)?is(e,t,i):(t.flags|=1,(e=ql(a,r)).ref=t.ref,e.return=t,t.child=e)}function Ba(e,t,n,r,o,i){if(null!==e&&dr(e.memoizedProps,r)&&e.ref===t.ref){if(Fa=!1,0==(i&o))return t.lanes=e.lanes,is(e,t,i);0!=(16384&e.flags)&&(Fa=!0)}return Ha(e,t,n,r,i)}function Ua(e,t,n){var r=t.pendingProps,o=r.children,i=null!==e?e.memoizedState:null;if("hidden"===r.mode||"unstable-defer-without-hiding"===r.mode)if(0==(4&t.mode))t.memoizedState={baseLanes:0},kl(t,n);else{if(0==(1073741824&n))return e=null!==i?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e},kl(t,e),null;t.memoizedState={baseLanes:0},kl(t,null!==i?i.baseLanes:n)}else null!==i?(r=i.baseLanes|n,t.memoizedState=null):r=n,kl(t,r);return Aa(e,t,o,n),t.child}function Va(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=128)}function Ha(e,t,n,r,o){var i=yo(n)?mo:ho.current;return i=vo(t,i),ai(t,o),n=sa(e,t,n,r,i,o),null===e||Fa?(t.flags|=1,Aa(e,t,n,o),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~o,is(e,t,o))}function Wa(e,t,n,r,o){if(yo(n)){var i=!0;ko(t)}else i=!1;if(ai(t,o),null===t.stateNode)null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),wi(t,n,r),ki(t,n,r,o),r=!0;else if(null===e){var a=t.stateNode,s=t.memoizedProps;a.props=s;var l=a.context,u=n.contextType;"object"==typeof u&&null!==u?u=si(u):u=vo(t,u=yo(n)?mo:ho.current);var c=n.getDerivedStateFromProps,f="function"==typeof c||"function"==typeof a.getSnapshotBeforeUpdate;f||"function"!=typeof a.UNSAFE_componentWillReceiveProps&&"function"!=typeof a.componentWillReceiveProps||(s!==r||l!==u)&&xi(t,a,r,u),li=!1;var d=t.memoizedState;a.state=d,hi(t,r,a,o),l=t.memoizedState,s!==r||d!==l||go.current||li?("function"==typeof c&&(vi(t,n,c,r),l=t.memoizedState),(s=li||bi(t,n,s,r,d,l,u))?(f||"function"!=typeof a.UNSAFE_componentWillMount&&"function"!=typeof a.componentWillMount||("function"==typeof a.componentWillMount&&a.componentWillMount(),"function"==typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount()),"function"==typeof a.componentDidMount&&(t.flags|=4)):("function"==typeof a.componentDidMount&&(t.flags|=4),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=u,r=s):("function"==typeof a.componentDidMount&&(t.flags|=4),r=!1)}else{a=t.stateNode,ci(e,t),s=t.memoizedProps,u=t.type===t.elementType?s:Zo(t.type,s),a.props=u,f=t.pendingProps,d=a.context,"object"==typeof(l=n.contextType)&&null!==l?l=si(l):l=vo(t,l=yo(n)?mo:ho.current);var p=n.getDerivedStateFromProps;(c="function"==typeof p||"function"==typeof a.getSnapshotBeforeUpdate)||"function"!=typeof a.UNSAFE_componentWillReceiveProps&&"function"!=typeof a.componentWillReceiveProps||(s!==f||d!==l)&&xi(t,a,r,l),li=!1,d=t.memoizedState,a.state=d,hi(t,r,a,o);var h=t.memoizedState;s!==f||d!==h||go.current||li?("function"==typeof p&&(vi(t,n,p,r),h=t.memoizedState),(u=li||bi(t,n,u,r,d,h,l))?(c||"function"!=typeof a.UNSAFE_componentWillUpdate&&"function"!=typeof a.componentWillUpdate||("function"==typeof a.componentWillUpdate&&a.componentWillUpdate(r,h,l),"function"==typeof a.UNSAFE_componentWillUpdate&&a.UNSAFE_componentWillUpdate(r,h,l)),"function"==typeof a.componentDidUpdate&&(t.flags|=4),"function"==typeof a.getSnapshotBeforeUpdate&&(t.flags|=256)):("function"!=typeof a.componentDidUpdate||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=256),t.memoizedProps=r,t.memoizedState=h),a.props=r,a.state=h,a.context=l,r=u):("function"!=typeof a.componentDidUpdate||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),"function"!=typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=256),r=!1)}return qa(e,t,n,r,i,o)}function qa(e,t,n,r,o,i){Va(e,t);var a=0!=(64&t.flags);if(!r&&!a)return o&&_o(t,n,!1),is(e,t,i);r=t.stateNode,$a.current=t;var s=a&&"function"!=typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&a?(t.child=Ci(t,e.child,null,i),t.child=Ci(t,null,s,i)):Aa(e,t,s,i),t.memoizedState=r.state,o&&_o(t,n,!0),t.child}function Ya(e){var t=e.stateNode;t.pendingContext?wo(0,t.pendingContext,t.pendingContext!==t.context):t.context&&wo(0,t.context,!1),Ri(e,t.containerInfo)}var Ga,Xa,Ka,Qa={dehydrated:null,retryLane:0};function Za(e,t,n){var r,o=t.pendingProps,i=Ai.current,a=!1;return(r=0!=(64&t.flags))||(r=(null===e||null!==e.memoizedState)&&0!=(2&i)),r?(a=!0,t.flags&=-65):null!==e&&null===e.memoizedState||void 0===o.fallback||!0===o.unstable_avoidThisFallback||(i|=1),fo(Ai,1&i),null===e?(void 0!==o.fallback&&Wi(t),e=o.children,i=o.fallback,a?(e=Ja(t,e,i,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Qa,e):"number"==typeof o.unstable_expectedLoadTime?(e=Ja(t,e,i,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Qa,t.lanes=33554432,e):((n=Xl({mode:"visible",children:e},t.mode,n,null)).return=t,t.child=n)):(e.memoizedState,a?(o=ts(e,t,o.children,o.fallback,n),a=t.child,i=e.child.memoizedState,a.memoizedState=null===i?{baseLanes:n}:{baseLanes:i.baseLanes|n},a.childLanes=e.childLanes&~n,t.memoizedState=Qa,o):(n=es(e,t,o.children,n),t.memoizedState=null,n))}function Ja(e,t,n,r){var o=e.mode,i=e.child;return t={mode:"hidden",children:t},0==(2&o)&&null!==i?(i.childLanes=0,i.pendingProps=t):i=Xl(t,o,0,null),n=Gl(n,o,r,null),i.return=e,n.return=e,i.sibling=n,e.child=i,n}function es(e,t,n,r){var o=e.child;return e=o.sibling,n=ql(o,{mode:"visible",children:n}),0==(2&t.mode)&&(n.lanes=r),n.return=t,n.sibling=null,null!==e&&(e.nextEffect=null,e.flags=8,t.firstEffect=t.lastEffect=e),t.child=n}function ts(e,t,n,r,o){var i=t.mode,a=e.child;e=a.sibling;var s={mode:"hidden",children:n};return 0==(2&i)&&t.child!==a?((n=t.child).childLanes=0,n.pendingProps=s,null!==(a=n.lastEffect)?(t.firstEffect=n.firstEffect,t.lastEffect=a,a.nextEffect=null):t.firstEffect=t.lastEffect=null):n=ql(a,s),null!==e?r=ql(e,r):(r=Gl(r,i,o,null)).flags|=2,r.return=t,n.return=t,n.sibling=r,t.child=n,r}function ns(e,t){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),ii(e.return,t)}function rs(e,t,n,r,o,i){var a=e.memoizedState;null===a?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o,lastEffect:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=o,a.lastEffect=i)}function os(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(Aa(e,t,r.children,n),0!=(2&(r=Ai.current)))r=1&r|2,t.flags|=64;else{if(null!==e&&0!=(64&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&ns(e,n);else if(19===e.tag)ns(e,n);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(fo(Ai,r),0==(2&t.mode))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;null!==n;)null!==(e=n.alternate)&&null===Ii(e)&&(o=n),n=n.sibling;null===(n=o)?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),rs(t,!1,o,n,i,t.lastEffect);break;case"backwards":for(n=null,o=t.child,t.child=null;null!==o;){if(null!==(e=o.alternate)&&null===Ii(e)){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}rs(t,!0,n,null,i,t.lastEffect);break;case"together":rs(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}function is(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Bs|=t.lanes,0!=(n&t.childLanes)){if(null!==e&&t.child!==e.child)throw Error(a(153));if(null!==t.child){for(n=ql(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=ql(e,e.pendingProps)).return=t;n.sibling=null}return t.child}return null}function as(e,t){if(!Ui)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ss(e,t,n){var r=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:case 17:return yo(t.type)&&bo(),null;case 3:return Di(),co(go),co(ho),Ki(),(r=t.stateNode).pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(Yi(t)?t.flags|=4:r.hydrate||(t.flags|=256)),null;case 5:Fi(t);var i=Ni(Li.current);if(n=t.type,null!==e&&null!=t.stateNode)Xa(e,t,n,r),e.ref!==t.ref&&(t.flags|=128);else{if(!r){if(null===t.stateNode)throw Error(a(166));return null}if(e=Ni(Pi.current),Yi(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[Zr]=t,r[Jr]=s,n){case"dialog":Pr("cancel",r),Pr("close",r);break;case"iframe":case"object":case"embed":Pr("load",r);break;case"video":case"audio":for(e=0;e<Er.length;e++)Pr(Er[e],r);break;case"source":Pr("error",r);break;case"img":case"image":case"link":Pr("error",r),Pr("load",r);break;case"details":Pr("toggle",r);break;case"input":ee(r,s),Pr("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Pr("invalid",r);break;case"textarea":le(r,s),Pr("invalid",r)}for(var u in Se(n,s),e=null,s)s.hasOwnProperty(u)&&(i=s[u],"children"===u?"string"==typeof i?r.textContent!==i&&(e=["children",i]):"number"==typeof i&&r.textContent!==""+i&&(e=["children",""+i]):l.hasOwnProperty(u)&&null!=i&&"onScroll"===u&&Pr("scroll",r));switch(n){case"input":K(r),re(r,s,!0);break;case"textarea":K(r),ce(r);break;case"select":case"option":break;default:"function"==typeof s.onClick&&(r.onclick=zr)}r=e,t.updateQueue=r,null!==r&&(t.flags|=4)}else{switch(u=9===i.nodeType?i:i.ownerDocument,e===fe&&(e=pe(n)),e===fe?"script"===n?((e=u.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"==typeof r.is?e=u.createElement(n,{is:r.is}):(e=u.createElement(n),"select"===n&&(u=e,r.multiple?u.multiple=!0:r.size&&(u.size=r.size))):e=u.createElementNS(e,n),e[Zr]=t,e[Jr]=r,Ga(e,t),t.stateNode=e,u=Oe(n,r),n){case"dialog":Pr("cancel",e),Pr("close",e),i=r;break;case"iframe":case"object":case"embed":Pr("load",e),i=r;break;case"video":case"audio":for(i=0;i<Er.length;i++)Pr(Er[i],e);i=r;break;case"source":Pr("error",e),i=r;break;case"img":case"image":case"link":Pr("error",e),Pr("load",e),i=r;break;case"details":Pr("toggle",e),i=r;break;case"input":ee(e,r),i=J(e,r),Pr("invalid",e);break;case"option":i=ie(e,r);break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=o({},r,{value:void 0}),Pr("invalid",e);break;case"textarea":le(e,r),i=se(e,r),Pr("invalid",e);break;default:i=r}Se(n,i);var c=i;for(s in c)if(c.hasOwnProperty(s)){var f=c[s];"style"===s?ke(e,f):"dangerouslySetInnerHTML"===s?null!=(f=f?f.__html:void 0)&&ve(e,f):"children"===s?"string"==typeof f?("textarea"!==n||""!==f)&&ye(e,f):"number"==typeof f&&ye(e,""+f):"suppressContentEditableWarning"!==s&&"suppressHydrationWarning"!==s&&"autoFocus"!==s&&(l.hasOwnProperty(s)?null!=f&&"onScroll"===s&&Pr("scroll",e):null!=f&&w(e,s,f,u))}switch(n){case"input":K(e),re(e,r,!1);break;case"textarea":K(e),ce(e);break;case"option":null!=r.value&&e.setAttribute("value",""+G(r.value));break;case"select":e.multiple=!!r.multiple,null!=(s=r.value)?ae(e,!!r.multiple,s,!1):null!=r.defaultValue&&ae(e,!!r.multiple,r.defaultValue,!0);break;default:"function"==typeof i.onClick&&(e.onclick=zr)}Vr(n,r)&&(t.flags|=4)}null!==t.ref&&(t.flags|=128)}return null;case 6:if(e&&null!=t.stateNode)Ka(0,t,e.memoizedProps,r);else{if("string"!=typeof r&&null===t.stateNode)throw Error(a(166));n=Ni(Li.current),Ni(Pi.current),Yi(t)?(r=t.stateNode,n=t.memoizedProps,r[Zr]=t,r.nodeValue!==n&&(t.flags|=4)):((r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[Zr]=t,t.stateNode=r)}return null;case 13:return co(Ai),r=t.memoizedState,0!=(64&t.flags)?(t.lanes=n,t):(r=null!==r,n=!1,null===e?void 0!==t.memoizedProps.fallback&&Yi(t):n=null!==e.memoizedState,r&&!n&&0!=(2&t.mode)&&(null===e&&!0!==t.memoizedProps.unstable_avoidThisFallback||0!=(1&Ai.current)?0===As&&(As=3):(0!==As&&3!==As||(As=4),null===Ns||0==(134217727&Bs)&&0==(134217727&Us)||yl(Ns,Ds))),(r||n)&&(t.flags|=4),null);case 4:return Di(),null===e&&Lr(t.stateNode.containerInfo),null;case 10:return oi(t),null;case 19:if(co(Ai),null===(r=t.memoizedState))return null;if(s=0!=(64&t.flags),null===(u=r.rendering))if(s)as(r,!1);else{if(0!==As||null!==e&&0!=(64&e.flags))for(e=t.child;null!==e;){if(null!==(u=Ii(e))){for(t.flags|=64,as(r,!1),null!==(s=u.updateQueue)&&(t.updateQueue=s,t.flags|=4),null===r.lastEffect&&(t.firstEffect=null),t.lastEffect=r.lastEffect,r=n,n=t.child;null!==n;)e=r,(s=n).flags&=2,s.nextEffect=null,s.firstEffect=null,s.lastEffect=null,null===(u=s.alternate)?(s.childLanes=0,s.lanes=e,s.child=null,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=u.childLanes,s.lanes=u.lanes,s.child=u.child,s.memoizedProps=u.memoizedProps,s.memoizedState=u.memoizedState,s.updateQueue=u.updateQueue,s.type=u.type,e=u.dependencies,s.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return fo(Ai,1&Ai.current|2),t.child}e=e.sibling}null!==r.tail&&Ho()>qs&&(t.flags|=64,s=!0,as(r,!1),t.lanes=33554432)}else{if(!s)if(null!==(e=Ii(u))){if(t.flags|=64,s=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),as(r,!0),null===r.tail&&"hidden"===r.tailMode&&!u.alternate&&!Ui)return null!==(t=t.lastEffect=r.lastEffect)&&(t.nextEffect=null),null}else 2*Ho()-r.renderingStartTime>qs&&1073741824!==n&&(t.flags|=64,s=!0,as(r,!1),t.lanes=33554432);r.isBackwards?(u.sibling=t.child,t.child=u):(null!==(n=r.last)?n.sibling=u:t.child=u,r.last=u)}return null!==r.tail?(n=r.tail,r.rendering=n,r.tail=n.sibling,r.lastEffect=t.lastEffect,r.renderingStartTime=Ho(),n.sibling=null,t=Ai.current,fo(Ai,s?1&t|2:1&t),n):null;case 23:case 24:return _l(),null!==e&&null!==e.memoizedState!=(null!==t.memoizedState)&&"unstable-defer-without-hiding"!==r.mode&&(t.flags|=4),null}throw Error(a(156,t.tag))}function ls(e){switch(e.tag){case 1:yo(e.type)&&bo();var t=e.flags;return 4096&t?(e.flags=-4097&t|64,e):null;case 3:if(Di(),co(go),co(ho),Ki(),0!=(64&(t=e.flags)))throw Error(a(285));return e.flags=-4097&t|64,e;case 5:return Fi(e),null;case 13:return co(Ai),4096&(t=e.flags)?(e.flags=-4097&t|64,e):null;case 19:return co(Ai),null;case 4:return Di(),null;case 10:return oi(e),null;case 23:case 24:return _l(),null;default:return null}}function us(e,t){try{var n="",r=t;do{n+=q(r),r=r.return}while(r);var o=n}catch(e){o="\nError generating stack: "+e.message+"\n"+e.stack}return{value:e,source:t,stack:o}}function cs(e,t){try{console.error(t.value)}catch(e){setTimeout((function(){throw e}))}}Ga=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Xa=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Ni(Pi.current);var a,s=null;switch(n){case"input":i=J(e,i),r=J(e,r),s=[];break;case"option":i=ie(e,i),r=ie(e,r),s=[];break;case"select":i=o({},i,{value:void 0}),r=o({},r,{value:void 0}),s=[];break;case"textarea":i=se(e,i),r=se(e,r),s=[];break;default:"function"!=typeof i.onClick&&"function"==typeof r.onClick&&(e.onclick=zr)}for(f in Se(n,r),n=null,i)if(!r.hasOwnProperty(f)&&i.hasOwnProperty(f)&&null!=i[f])if("style"===f){var u=i[f];for(a in u)u.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else"dangerouslySetInnerHTML"!==f&&"children"!==f&&"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(l.hasOwnProperty(f)?s||(s=[]):(s=s||[]).push(f,null));for(f in r){var c=r[f];if(u=null!=i?i[f]:void 0,r.hasOwnProperty(f)&&c!==u&&(null!=c||null!=u))if("style"===f)if(u){for(a in u)!u.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&u[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(s||(s=[]),s.push(f,n)),n=c;else"dangerouslySetInnerHTML"===f?(c=c?c.__html:void 0,u=u?u.__html:void 0,null!=c&&u!==c&&(s=s||[]).push(f,c)):"children"===f?"string"!=typeof c&&"number"!=typeof c||(s=s||[]).push(f,""+c):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&(l.hasOwnProperty(f)?(null!=c&&"onScroll"===f&&Pr("scroll",e),s||u===c||(s=[])):"object"==typeof c&&null!==c&&c.$$typeof===D?c.toString():(s=s||[]).push(f,c))}n&&(s=s||[]).push("style",n);var f=s;(t.updateQueue=f)&&(t.flags|=4)}},Ka=function(e,t,n,r){n!==r&&(t.flags|=4)};var fs="function"==typeof WeakMap?WeakMap:Map;function ds(e,t,n){(n=fi(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ks||(Ks=!0,Qs=r),cs(0,t)},n}function ps(e,t,n){(n=fi(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"==typeof r){var o=t.value;n.payload=function(){return cs(0,t),r(o)}}var i=e.stateNode;return null!==i&&"function"==typeof i.componentDidCatch&&(n.callback=function(){"function"!=typeof r&&(null===Zs?Zs=new Set([this]):Zs.add(this),cs(0,t));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}var hs="function"==typeof WeakSet?WeakSet:Set;function gs(e){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(t){zl(e,t)}else t.current=null}function ms(e,t){switch(t.tag){case 0:case 11:case 15:case 22:case 5:case 6:case 4:case 17:return;case 1:if(256&t.flags&&null!==e){var n=e.memoizedProps,r=e.memoizedState;t=(e=t.stateNode).getSnapshotBeforeUpdate(t.elementType===t.type?n:Zo(t.type,n),r),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:return void(256&t.flags&&Yr(t.stateNode.containerInfo))}throw Error(a(163))}function vs(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{if(3==(3&e.tag)){var r=e.create;e.destroy=r()}e=e.next}while(e!==t)}if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{var o=e;r=o.next,0!=(4&(o=o.tag))&&0!=(1&o)&&(Fl(n,e),$l(n,e)),e=r}while(e!==t)}return;case 1:return e=n.stateNode,4&n.flags&&(null===t?e.componentDidMount():(r=n.elementType===n.type?t.memoizedProps:Zo(n.type,t.memoizedProps),e.componentDidUpdate(r,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate))),void(null!==(t=n.updateQueue)&&gi(n,t,e));case 3:if(null!==(t=n.updateQueue)){if(e=null,null!==n.child)switch(n.child.tag){case 5:case 1:e=n.child.stateNode}gi(n,t,e)}return;case 5:return e=n.stateNode,void(null===t&&4&n.flags&&Vr(n.type,n.memoizedProps)&&e.focus());case 6:case 4:case 12:case 19:case 17:case 20:case 21:case 23:case 24:return;case 13:return void(null===n.memoizedState&&(n=n.alternate,null!==n&&(n=n.memoizedState,null!==n&&(n=n.dehydrated,null!==n&&kt(n)))))}throw Error(a(163))}function ys(e,t){for(var n=e;;){if(5===n.tag){var r=n.stateNode;if(t)"function"==typeof(r=r.style).setProperty?r.setProperty("display","none","important"):r.display="none";else{r=n.stateNode;var o=n.memoizedProps.style;o=null!=o&&o.hasOwnProperty("display")?o.display:null,r.style.display=xe("display",o)}}else if(6===n.tag)n.stateNode.nodeValue=t?"":n.memoizedProps;else if((23!==n.tag&&24!==n.tag||null===n.memoizedState||n===e)&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===e)break;for(;null===n.sibling;){if(null===n.return||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}}function bs(e,t){if(Oo&&"function"==typeof Oo.onCommitFiberUnmount)try{Oo.onCommitFiberUnmount(So,t)}catch(e){}switch(t.tag){case 0:case 11:case 14:case 15:case 22:if(null!==(e=t.updateQueue)&&null!==(e=e.lastEffect)){var n=e=e.next;do{var r=n,o=r.destroy;if(r=r.tag,void 0!==o)if(0!=(4&r))Fl(t,n);else{r=t;try{o()}catch(e){zl(r,e)}}n=n.next}while(n!==e)}break;case 1:if(gs(t),"function"==typeof(e=t.stateNode).componentWillUnmount)try{e.props=t.memoizedProps,e.state=t.memoizedState,e.componentWillUnmount()}catch(e){zl(t,e)}break;case 5:gs(t);break;case 4:Os(e,t)}}function ws(e){e.alternate=null,e.child=null,e.dependencies=null,e.firstEffect=null,e.lastEffect=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.return=null,e.updateQueue=null}function xs(e){return 5===e.tag||3===e.tag||4===e.tag}function ks(e){e:{for(var t=e.return;null!==t;){if(xs(t))break e;t=t.return}throw Error(a(160))}var n=t;switch(t=n.stateNode,n.tag){case 5:var r=!1;break;case 3:case 4:t=t.containerInfo,r=!0;break;default:throw Error(a(161))}16&n.flags&&(ye(t,""),n.flags&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||xs(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(2&n.flags)continue t;if(null===n.child||4===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.flags)){n=n.stateNode;break e}}r?_s(e,n,t):Ss(e,n,t)}function _s(e,t,n){var r=e.tag,o=5===r||6===r;if(o)e=o?e.stateNode:e.stateNode.instance,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!=(n=n._reactRootContainer)||null!==t.onclick||(t.onclick=zr));else if(4!==r&&null!==(e=e.child))for(_s(e,t,n),e=e.sibling;null!==e;)_s(e,t,n),e=e.sibling}function Ss(e,t,n){var r=e.tag,o=5===r||6===r;if(o)e=o?e.stateNode:e.stateNode.instance,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(Ss(e,t,n),e=e.sibling;null!==e;)Ss(e,t,n),e=e.sibling}function Os(e,t){for(var n,r,o=t,i=!1;;){if(!i){i=o.return;e:for(;;){if(null===i)throw Error(a(160));switch(n=i.stateNode,i.tag){case 5:r=!1;break e;case 3:case 4:n=n.containerInfo,r=!0;break e}i=i.return}i=!0}if(5===o.tag||6===o.tag){e:for(var s=e,l=o,u=l;;)if(bs(s,u),null!==u.child&&4!==u.tag)u.child.return=u,u=u.child;else{if(u===l)break e;for(;null===u.sibling;){if(null===u.return||u.return===l)break e;u=u.return}u.sibling.return=u.return,u=u.sibling}r?(s=n,l=o.stateNode,8===s.nodeType?s.parentNode.removeChild(l):s.removeChild(l)):n.removeChild(o.stateNode)}else if(4===o.tag){if(null!==o.child){n=o.stateNode.containerInfo,r=!0,o.child.return=o,o=o.child;continue}}else if(bs(e,o),null!==o.child){o.child.return=o,o=o.child;continue}if(o===t)break;for(;null===o.sibling;){if(null===o.return||o.return===t)return;4===(o=o.return).tag&&(i=!1)}o.sibling.return=o.return,o=o.sibling}}function Es(e,t){switch(t.tag){case 0:case 11:case 14:case 15:case 22:var n=t.updateQueue;if(null!==(n=null!==n?n.lastEffect:null)){var r=n=n.next;do{3==(3&r.tag)&&(e=r.destroy,r.destroy=void 0,void 0!==e&&e()),r=r.next}while(r!==n)}return;case 1:case 12:case 17:return;case 5:if(null!=(n=t.stateNode)){r=t.memoizedProps;var o=null!==e?e.memoizedProps:r;e=t.type;var i=t.updateQueue;if(t.updateQueue=null,null!==i){for(n[Jr]=r,"input"===e&&"radio"===r.type&&null!=r.name&&te(n,r),Oe(e,o),t=Oe(e,r),o=0;o<i.length;o+=2){var s=i[o],l=i[o+1];"style"===s?ke(n,l):"dangerouslySetInnerHTML"===s?ve(n,l):"children"===s?ye(n,l):w(n,s,l,t)}switch(e){case"input":ne(n,r);break;case"textarea":ue(n,r);break;case"select":e=n._wrapperState.wasMultiple,n._wrapperState.wasMultiple=!!r.multiple,null!=(i=r.value)?ae(n,!!r.multiple,i,!1):e!==!!r.multiple&&(null!=r.defaultValue?ae(n,!!r.multiple,r.defaultValue,!0):ae(n,!!r.multiple,r.multiple?[]:"",!1))}}}return;case 6:if(null===t.stateNode)throw Error(a(162));return void(t.stateNode.nodeValue=t.memoizedProps);case 3:return void((n=t.stateNode).hydrate&&(n.hydrate=!1,kt(n.containerInfo)));case 13:return null!==t.memoizedState&&(Ws=Ho(),ys(t.child,!0)),void Cs(t);case 19:return void Cs(t);case 23:case 24:return void ys(t,null!==t.memoizedState)}throw Error(a(163))}function Cs(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new hs),t.forEach((function(t){var r=Ul.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function js(e,t){return null!==e&&(null===(e=e.memoizedState)||null!==e.dehydrated)&&(null!==(t=t.memoizedState)&&null===t.dehydrated)}var Ts=Math.ceil,Ps=x.ReactCurrentDispatcher,Ms=x.ReactCurrentOwner,Ls=0,Ns=null,Rs=null,Ds=0,$s=0,Fs=uo(0),As=0,Is=null,zs=0,Bs=0,Us=0,Vs=0,Hs=null,Ws=0,qs=1/0;function Ys(){qs=Ho()+500}var Gs,Xs=null,Ks=!1,Qs=null,Zs=null,Js=!1,el=null,tl=90,nl=[],rl=[],ol=null,il=0,al=null,sl=-1,ll=0,ul=0,cl=null,fl=!1;function dl(){return 0!=(48&Ls)?Ho():-1!==sl?sl:sl=Ho()}function pl(e){if(0==(2&(e=e.mode)))return 1;if(0==(4&e))return 99===Wo()?1:2;if(0===ll&&(ll=zs),0!==Qo.transition){0!==ul&&(ul=null!==Hs?Hs.pendingLanes:0),e=ll;var t=4186112&~ul;return 0===(t&=-t)&&(0===(t=(e=4186112&~e)&-e)&&(t=8192)),t}return e=Wo(),0!=(4&Ls)&&98===e?e=zt(12,ll):e=zt(e=function(e){switch(e){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}(e),ll),e}function hl(e,t,n){if(50<il)throw il=0,al=null,Error(a(185));if(null===(e=gl(e,t)))return null;Vt(e,t,n),e===Ns&&(Us|=t,4===As&&yl(e,Ds));var r=Wo();1===t?0!=(8&Ls)&&0==(48&Ls)?bl(e):(ml(e,n),0===Ls&&(Ys(),Xo())):(0==(4&Ls)||98!==r&&99!==r||(null===ol?ol=new Set([e]):ol.add(e)),ml(e,n)),Hs=e}function gl(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}function ml(e,t){for(var n=e.callbackNode,r=e.suspendedLanes,o=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var l=31-Ht(s),u=1<<l,c=i[l];if(-1===c){if(0==(u&r)||0!=(u&o)){c=t,Ft(u);var f=$t;i[l]=10<=f?c+250:6<=f?c+5e3:-1}}else c<=t&&(e.expiredLanes|=u);s&=~u}if(r=At(e,e===Ns?Ds:0),t=$t,0===r)null!==n&&(n!==Ao&&jo(n),e.callbackNode=null,e.callbackPriority=0);else{if(null!==n){if(e.callbackPriority===t)return;n!==Ao&&jo(n)}15===t?(n=bl.bind(null,e),null===zo?(zo=[n],Bo=Co(No,Ko)):zo.push(n),n=Ao):14===t?n=Go(99,bl.bind(null,e)):(n=function(e){switch(e){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(a(358,e))}}(t),n=Go(n,vl.bind(null,e))),e.callbackPriority=t,e.callbackNode=n}}function vl(e){if(sl=-1,ul=ll=0,0!=(48&Ls))throw Error(a(327));var t=e.callbackNode;if(Dl()&&e.callbackNode!==t)return null;var n=At(e,e===Ns?Ds:0);if(0===n)return null;var r=n,o=Ls;Ls|=16;var i=El();for(Ns===e&&Ds===r||(Ys(),Sl(e,r));;)try{Tl();break}catch(t){Ol(e,t)}if(ri(),Ps.current=i,Ls=o,null!==Rs?r=0:(Ns=null,Ds=0,r=As),0!=(zs&Us))Sl(e,0);else if(0!==r){if(2===r&&(Ls|=64,e.hydrate&&(e.hydrate=!1,Yr(e.containerInfo)),0!==(n=It(e))&&(r=Cl(e,n))),1===r)throw t=Is,Sl(e,0),yl(e,n),ml(e,Ho()),t;switch(e.finishedWork=e.current.alternate,e.finishedLanes=n,r){case 0:case 1:throw Error(a(345));case 2:case 5:Ll(e);break;case 3:if(yl(e,n),(62914560&n)===n&&10<(r=Ws+500-Ho())){if(0!==At(e,0))break;if(((o=e.suspendedLanes)&n)!==n){dl(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Wr(Ll.bind(null,e),r);break}Ll(e);break;case 4:if(yl(e,n),(4186112&n)===n)break;for(r=e.eventTimes,o=-1;0<n;){var s=31-Ht(n);i=1<<s,(s=r[s])>o&&(o=s),n&=~i}if(n=o,10<(n=(120>(n=Ho()-n)?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*Ts(n/1960))-n)){e.timeoutHandle=Wr(Ll.bind(null,e),n);break}Ll(e);break;default:throw Error(a(329))}}return ml(e,Ho()),e.callbackNode===t?vl.bind(null,e):null}function yl(e,t){for(t&=~Vs,t&=~Us,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ht(t),r=1<<n;e[n]=-1,t&=~r}}function bl(e){if(0!=(48&Ls))throw Error(a(327));if(Dl(),e===Ns&&0!=(e.expiredLanes&Ds)){var t=Ds,n=Cl(e,t);0!=(zs&Us)&&(n=Cl(e,t=At(e,t)))}else n=Cl(e,t=At(e,0));if(0!==e.tag&&2===n&&(Ls|=64,e.hydrate&&(e.hydrate=!1,Yr(e.containerInfo)),0!==(t=It(e))&&(n=Cl(e,t))),1===n)throw n=Is,Sl(e,0),yl(e,t),ml(e,Ho()),n;return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ll(e),ml(e,Ho()),null}function wl(e,t){var n=Ls;Ls|=1;try{return e(t)}finally{0===(Ls=n)&&(Ys(),Xo())}}function xl(e,t){var n=Ls;Ls&=-2,Ls|=8;try{return e(t)}finally{0===(Ls=n)&&(Ys(),Xo())}}function kl(e,t){fo(Fs,$s),$s|=t,zs|=t}function _l(){$s=Fs.current,co(Fs)}function Sl(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,qr(n)),null!==Rs)for(n=Rs.return;null!==n;){var r=n;switch(r.tag){case 1:null!=(r=r.type.childContextTypes)&&bo();break;case 3:Di(),co(go),co(ho),Ki();break;case 5:Fi(r);break;case 4:Di();break;case 13:case 19:co(Ai);break;case 10:oi(r);break;case 23:case 24:_l()}n=n.return}Ns=e,Rs=ql(e.current,null),Ds=$s=zs=t,As=0,Is=null,Vs=Us=Bs=0}function Ol(e,t){for(;;){var n=Rs;try{if(ri(),Qi.current=La,ra){for(var r=ea.memoizedState;null!==r;){var o=r.queue;null!==o&&(o.pending=null),r=r.next}ra=!1}if(Ji=0,na=ta=ea=null,oa=!1,Ms.current=null,null===n||null===n.return){As=1,Is=t,Rs=null;break}e:{var i=e,a=n.return,s=n,l=t;if(t=Ds,s.flags|=2048,s.firstEffect=s.lastEffect=null,null!==l&&"object"==typeof l&&"function"==typeof l.then){var u=l;if(0==(2&s.mode)){var c=s.alternate;c?(s.updateQueue=c.updateQueue,s.memoizedState=c.memoizedState,s.lanes=c.lanes):(s.updateQueue=null,s.memoizedState=null)}var f=0!=(1&Ai.current),d=a;do{var p;if(p=13===d.tag){var h=d.memoizedState;if(null!==h)p=null!==h.dehydrated;else{var g=d.memoizedProps;p=void 0!==g.fallback&&(!0!==g.unstable_avoidThisFallback||!f)}}if(p){var m=d.updateQueue;if(null===m){var v=new Set;v.add(u),d.updateQueue=v}else m.add(u);if(0==(2&d.mode)){if(d.flags|=64,s.flags|=16384,s.flags&=-2981,1===s.tag)if(null===s.alternate)s.tag=17;else{var y=fi(-1,1);y.tag=2,di(s,y)}s.lanes|=1;break e}l=void 0,s=t;var b=i.pingCache;if(null===b?(b=i.pingCache=new fs,l=new Set,b.set(u,l)):void 0===(l=b.get(u))&&(l=new Set,b.set(u,l)),!l.has(s)){l.add(s);var w=Bl.bind(null,i,u,s);u.then(w,w)}d.flags|=4096,d.lanes=t;break e}d=d.return}while(null!==d);l=Error((Y(s.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==As&&(As=2),l=us(l,s),d=a;do{switch(d.tag){case 3:i=l,d.flags|=4096,t&=-t,d.lanes|=t,pi(d,ds(0,i,t));break e;case 1:i=l;var x=d.type,k=d.stateNode;if(0==(64&d.flags)&&("function"==typeof x.getDerivedStateFromError||null!==k&&"function"==typeof k.componentDidCatch&&(null===Zs||!Zs.has(k)))){d.flags|=4096,t&=-t,d.lanes|=t,pi(d,ps(d,i,t));break e}}d=d.return}while(null!==d)}Ml(n)}catch(e){t=e,Rs===n&&null!==n&&(Rs=n=n.return);continue}break}}function El(){var e=Ps.current;return Ps.current=La,null===e?La:e}function Cl(e,t){var n=Ls;Ls|=16;var r=El();for(Ns===e&&Ds===t||Sl(e,t);;)try{jl();break}catch(t){Ol(e,t)}if(ri(),Ls=n,Ps.current=r,null!==Rs)throw Error(a(261));return Ns=null,Ds=0,As}function jl(){for(;null!==Rs;)Pl(Rs)}function Tl(){for(;null!==Rs&&!To();)Pl(Rs)}function Pl(e){var t=Gs(e.alternate,e,$s);e.memoizedProps=e.pendingProps,null===t?Ml(e):Rs=t,Ms.current=null}function Ml(e){var t=e;do{var n=t.alternate;if(e=t.return,0==(2048&t.flags)){if(null!==(n=ss(n,t,$s)))return void(Rs=n);if(24!==(n=t).tag&&23!==n.tag||null===n.memoizedState||0!=(1073741824&$s)||0==(4&n.mode)){for(var r=0,o=n.child;null!==o;)r|=o.lanes|o.childLanes,o=o.sibling;n.childLanes=r}null!==e&&0==(2048&e.flags)&&(null===e.firstEffect&&(e.firstEffect=t.firstEffect),null!==t.lastEffect&&(null!==e.lastEffect&&(e.lastEffect.nextEffect=t.firstEffect),e.lastEffect=t.lastEffect),1<t.flags&&(null!==e.lastEffect?e.lastEffect.nextEffect=t:e.firstEffect=t,e.lastEffect=t))}else{if(null!==(n=ls(t)))return n.flags&=2047,void(Rs=n);null!==e&&(e.firstEffect=e.lastEffect=null,e.flags|=2048)}if(null!==(t=t.sibling))return void(Rs=t);Rs=t=e}while(null!==t);0===As&&(As=5)}function Ll(e){var t=Wo();return Yo(99,Nl.bind(null,e,t)),null}function Nl(e,t){do{Dl()}while(null!==el);if(0!=(48&Ls))throw Error(a(327));var n=e.finishedWork;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(a(177));e.callbackNode=null;var r=n.lanes|n.childLanes,o=r,i=e.pendingLanes&~o;e.pendingLanes=o,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=o,e.mutableReadLanes&=o,e.entangledLanes&=o,o=e.entanglements;for(var s=e.eventTimes,l=e.expirationTimes;0<i;){var u=31-Ht(i),c=1<<u;o[u]=0,s[u]=-1,l[u]=-1,i&=~c}if(null!==ol&&0==(24&r)&&ol.has(e)&&ol.delete(e),e===Ns&&(Rs=Ns=null,Ds=0),1<n.flags?null!==n.lastEffect?(n.lastEffect.nextEffect=n,r=n.firstEffect):r=n:r=n.firstEffect,null!==r){if(o=Ls,Ls|=32,Ms.current=null,Br=Xt,vr(s=mr())){if("selectionStart"in s)l={start:s.selectionStart,end:s.selectionEnd};else e:if(l=(l=s.ownerDocument)&&l.defaultView||window,(c=l.getSelection&&l.getSelection())&&0!==c.rangeCount){l=c.anchorNode,i=c.anchorOffset,u=c.focusNode,c=c.focusOffset;try{l.nodeType,u.nodeType}catch(e){l=null;break e}var f=0,d=-1,p=-1,h=0,g=0,m=s,v=null;t:for(;;){for(var y;m!==l||0!==i&&3!==m.nodeType||(d=f+i),m!==u||0!==c&&3!==m.nodeType||(p=f+c),3===m.nodeType&&(f+=m.nodeValue.length),null!==(y=m.firstChild);)v=m,m=y;for(;;){if(m===s)break t;if(v===l&&++h===i&&(d=f),v===u&&++g===c&&(p=f),null!==(y=m.nextSibling))break;v=(m=v).parentNode}m=y}l=-1===d||-1===p?null:{start:d,end:p}}else l=null;l=l||{start:0,end:0}}else l=null;Ur={focusedElem:s,selectionRange:l},Xt=!1,cl=null,fl=!1,Xs=r;do{try{Rl()}catch(e){if(null===Xs)throw Error(a(330));zl(Xs,e),Xs=Xs.nextEffect}}while(null!==Xs);cl=null,Xs=r;do{try{for(s=e;null!==Xs;){var b=Xs.flags;if(16&b&&ye(Xs.stateNode,""),128&b){var w=Xs.alternate;if(null!==w){var x=w.ref;null!==x&&("function"==typeof x?x(null):x.current=null)}}switch(1038&b){case 2:ks(Xs),Xs.flags&=-3;break;case 6:ks(Xs),Xs.flags&=-3,Es(Xs.alternate,Xs);break;case 1024:Xs.flags&=-1025;break;case 1028:Xs.flags&=-1025,Es(Xs.alternate,Xs);break;case 4:Es(Xs.alternate,Xs);break;case 8:Os(s,l=Xs);var k=l.alternate;ws(l),null!==k&&ws(k)}Xs=Xs.nextEffect}}catch(e){if(null===Xs)throw Error(a(330));zl(Xs,e),Xs=Xs.nextEffect}}while(null!==Xs);if(x=Ur,w=mr(),b=x.focusedElem,s=x.selectionRange,w!==b&&b&&b.ownerDocument&&gr(b.ownerDocument.documentElement,b)){null!==s&&vr(b)&&(w=s.start,void 0===(x=s.end)&&(x=w),"selectionStart"in b?(b.selectionStart=w,b.selectionEnd=Math.min(x,b.value.length)):(x=(w=b.ownerDocument||document)&&w.defaultView||window).getSelection&&(x=x.getSelection(),l=b.textContent.length,k=Math.min(s.start,l),s=void 0===s.end?k:Math.min(s.end,l),!x.extend&&k>s&&(l=s,s=k,k=l),l=hr(b,k),i=hr(b,s),l&&i&&(1!==x.rangeCount||x.anchorNode!==l.node||x.anchorOffset!==l.offset||x.focusNode!==i.node||x.focusOffset!==i.offset)&&((w=w.createRange()).setStart(l.node,l.offset),x.removeAllRanges(),k>s?(x.addRange(w),x.extend(i.node,i.offset)):(w.setEnd(i.node,i.offset),x.addRange(w))))),w=[];for(x=b;x=x.parentNode;)1===x.nodeType&&w.push({element:x,left:x.scrollLeft,top:x.scrollTop});for("function"==typeof b.focus&&b.focus(),b=0;b<w.length;b++)(x=w[b]).element.scrollLeft=x.left,x.element.scrollTop=x.top}Xt=!!Br,Ur=Br=null,e.current=n,Xs=r;do{try{for(b=e;null!==Xs;){var _=Xs.flags;if(36&_&&vs(b,Xs.alternate,Xs),128&_){w=void 0;var S=Xs.ref;if(null!==S){var O=Xs.stateNode;Xs.tag,w=O,"function"==typeof S?S(w):S.current=w}}Xs=Xs.nextEffect}}catch(e){if(null===Xs)throw Error(a(330));zl(Xs,e),Xs=Xs.nextEffect}}while(null!==Xs);Xs=null,Io(),Ls=o}else e.current=n;if(Js)Js=!1,el=e,tl=t;else for(Xs=r;null!==Xs;)t=Xs.nextEffect,Xs.nextEffect=null,8&Xs.flags&&((_=Xs).sibling=null,_.stateNode=null),Xs=t;if(0===(r=e.pendingLanes)&&(Zs=null),1===r?e===al?il++:(il=0,al=e):il=0,n=n.stateNode,Oo&&"function"==typeof Oo.onCommitFiberRoot)try{Oo.onCommitFiberRoot(So,n,void 0,64==(64&n.current.flags))}catch(e){}if(ml(e,Ho()),Ks)throw Ks=!1,e=Qs,Qs=null,e;return 0!=(8&Ls)||Xo(),null}function Rl(){for(;null!==Xs;){var e=Xs.alternate;fl||null===cl||(0!=(8&Xs.flags)?et(Xs,cl)&&(fl=!0):13===Xs.tag&&js(e,Xs)&&et(Xs,cl)&&(fl=!0));var t=Xs.flags;0!=(256&t)&&ms(e,Xs),0==(512&t)||Js||(Js=!0,Go(97,(function(){return Dl(),null}))),Xs=Xs.nextEffect}}function Dl(){if(90!==tl){var e=97<tl?97:tl;return tl=90,Yo(e,Al)}return!1}function $l(e,t){nl.push(t,e),Js||(Js=!0,Go(97,(function(){return Dl(),null})))}function Fl(e,t){rl.push(t,e),Js||(Js=!0,Go(97,(function(){return Dl(),null})))}function Al(){if(null===el)return!1;var e=el;if(el=null,0!=(48&Ls))throw Error(a(331));var t=Ls;Ls|=32;var n=rl;rl=[];for(var r=0;r<n.length;r+=2){var o=n[r],i=n[r+1],s=o.destroy;if(o.destroy=void 0,"function"==typeof s)try{s()}catch(e){if(null===i)throw Error(a(330));zl(i,e)}}for(n=nl,nl=[],r=0;r<n.length;r+=2){o=n[r],i=n[r+1];try{var l=o.create;o.destroy=l()}catch(e){if(null===i)throw Error(a(330));zl(i,e)}}for(l=e.current.firstEffect;null!==l;)e=l.nextEffect,l.nextEffect=null,8&l.flags&&(l.sibling=null,l.stateNode=null),l=e;return Ls=t,Xo(),!0}function Il(e,t,n){di(e,t=ds(0,t=us(n,t),1)),t=dl(),null!==(e=gl(e,1))&&(Vt(e,1,t),ml(e,t))}function zl(e,t){if(3===e.tag)Il(e,e,t);else for(var n=e.return;null!==n;){if(3===n.tag){Il(n,e,t);break}if(1===n.tag){var r=n.stateNode;if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===Zs||!Zs.has(r))){var o=ps(n,e=us(t,e),1);if(di(n,o),o=dl(),null!==(n=gl(n,1)))Vt(n,1,o),ml(n,o);else if("function"==typeof r.componentDidCatch&&(null===Zs||!Zs.has(r)))try{r.componentDidCatch(t,e)}catch(e){}break}}n=n.return}}function Bl(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=dl(),e.pingedLanes|=e.suspendedLanes&n,Ns===e&&(Ds&n)===n&&(4===As||3===As&&(62914560&Ds)===Ds&&500>Ho()-Ws?Sl(e,0):Vs|=n),ml(e,t)}function Ul(e,t){var n=e.stateNode;null!==n&&n.delete(t),0===(t=0)&&(0==(2&(t=e.mode))?t=1:0==(4&t)?t=99===Wo()?1:2:(0===ll&&(ll=zs),0===(t=Bt(62914560&~ll))&&(t=4194304))),n=dl(),null!==(e=gl(e,t))&&(Vt(e,t,n),ml(e,n))}function Vl(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.flags=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childLanes=this.lanes=0,this.alternate=null}function Hl(e,t,n,r){return new Vl(e,t,n,r)}function Wl(e){return!(!(e=e.prototype)||!e.isReactComponent)}function ql(e,t){var n=e.alternate;return null===n?((n=Hl(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Yl(e,t,n,r,o,i){var s=2;if(r=e,"function"==typeof e)Wl(e)&&(s=1);else if("string"==typeof e)s=5;else e:switch(e){case S:return Gl(n.children,o,i,t);case $:s=8,o|=16;break;case O:s=8,o|=1;break;case E:return(e=Hl(12,n,t,8|o)).elementType=E,e.type=E,e.lanes=i,e;case P:return(e=Hl(13,n,t,o)).type=P,e.elementType=P,e.lanes=i,e;case M:return(e=Hl(19,n,t,o)).elementType=M,e.lanes=i,e;case F:return Xl(n,o,i,t);case A:return(e=Hl(24,n,t,o)).elementType=A,e.lanes=i,e;default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case C:s=10;break e;case j:s=9;break e;case T:s=11;break e;case L:s=14;break e;case N:s=16,r=null;break e;case R:s=22;break e}throw Error(a(130,null==e?e:typeof e,""))}return(t=Hl(s,n,t,o)).elementType=e,t.type=r,t.lanes=i,t}function Gl(e,t,n,r){return(e=Hl(7,e,r,t)).lanes=n,e}function Xl(e,t,n,r){return(e=Hl(23,e,r,t)).elementType=F,e.lanes=n,e}function Kl(e,t,n){return(e=Hl(6,e,null,t)).lanes=n,e}function Ql(e,t,n){return(t=Hl(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Zl(e,t,n){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=Ut(0),this.expirationTimes=Ut(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ut(0),this.mutableSourceEagerHydrationData=null}function Jl(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:_,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}function eu(e,t,n,r){var o=t.current,i=dl(),s=pl(o);e:if(n){t:{if(Ke(n=n._reactInternals)!==n||1!==n.tag)throw Error(a(170));var l=n;do{switch(l.tag){case 3:l=l.stateNode.context;break t;case 1:if(yo(l.type)){l=l.stateNode.__reactInternalMemoizedMergedChildContext;break t}}l=l.return}while(null!==l);throw Error(a(171))}if(1===n.tag){var u=n.type;if(yo(u)){n=xo(n,u,l);break e}}n=l}else n=po;return null===t.context?t.context=n:t.pendingContext=n,(t=fi(i,s)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),di(o,t),hl(o,s,i),s}function tu(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function nu(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function ru(e,t){nu(e,t),(e=e.alternate)&&nu(e,t)}function ou(e,t,n){var r=null!=n&&null!=n.hydrationOptions&&n.hydrationOptions.mutableSources||null;if(n=new Zl(e,t,null!=n&&!0===n.hydrate),t=Hl(3,null,null,2===t?7:1===t?3:0),n.current=t,t.stateNode=n,ui(t),e[eo]=n.current,Lr(8===e.nodeType?e.parentNode:e),r)for(e=0;e<r.length;e++){var o=(t=r[e])._getVersion;o=o(t._source),null==n.mutableSourceEagerHydrationData?n.mutableSourceEagerHydrationData=[t,o]:n.mutableSourceEagerHydrationData.push(t,o)}this._internalRoot=n}function iu(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function au(e,t,n,r,o){var i=n._reactRootContainer;if(i){var a=i._internalRoot;if("function"==typeof o){var s=o;o=function(){var e=tu(a);s.call(e)}}eu(t,a,e,o)}else{if(i=n._reactRootContainer=function(e,t){if(t||(t=!(!(t=e?9===e.nodeType?e.documentElement:e.firstChild:null)||1!==t.nodeType||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new ou(e,0,t?{hydrate:!0}:void 0)}(n,r),a=i._internalRoot,"function"==typeof o){var l=o;o=function(){var e=tu(a);l.call(e)}}xl((function(){eu(t,a,e,o)}))}return tu(a)}function su(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!iu(t))throw Error(a(200));return Jl(e,t,null,n)}Gs=function(e,t,n){var r=t.lanes;if(null!==e)if(e.memoizedProps!==t.pendingProps||go.current)Fa=!0;else{if(0==(n&r)){switch(Fa=!1,t.tag){case 3:Ya(t),Gi();break;case 5:$i(t);break;case 1:yo(t.type)&&ko(t);break;case 4:Ri(t,t.stateNode.containerInfo);break;case 10:r=t.memoizedProps.value;var o=t.type._context;fo(Jo,o._currentValue),o._currentValue=r;break;case 13:if(null!==t.memoizedState)return 0!=(n&t.child.childLanes)?Za(e,t,n):(fo(Ai,1&Ai.current),null!==(t=is(e,t,n))?t.sibling:null);fo(Ai,1&Ai.current);break;case 19:if(r=0!=(n&t.childLanes),0!=(64&e.flags)){if(r)return os(e,t,n);t.flags|=64}if(null!==(o=t.memoizedState)&&(o.rendering=null,o.tail=null,o.lastEffect=null),fo(Ai,Ai.current),r)break;return null;case 23:case 24:return t.lanes=0,Ua(e,t,n)}return is(e,t,n)}Fa=0!=(16384&e.flags)}else Fa=!1;switch(t.lanes=0,t.tag){case 2:if(r=t.type,null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,o=vo(t,ho.current),ai(t,n),o=sa(null,t,r,e,o,n),t.flags|=1,"object"==typeof o&&null!==o&&"function"==typeof o.render&&void 0===o.$$typeof){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,yo(r)){var i=!0;ko(t)}else i=!1;t.memoizedState=null!==o.state&&void 0!==o.state?o.state:null,ui(t);var s=r.getDerivedStateFromProps;"function"==typeof s&&vi(t,r,s,e),o.updater=yi,t.stateNode=o,o._reactInternals=t,ki(t,r,e,n),t=qa(null,t,r,!0,i,n)}else t.tag=0,Aa(null,t,o,n),t=t.child;return t;case 16:o=t.elementType;e:{switch(null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,o=(i=o._init)(o._payload),t.type=o,i=t.tag=function(e){if("function"==typeof e)return Wl(e)?1:0;if(null!=e){if((e=e.$$typeof)===T)return 11;if(e===L)return 14}return 2}(o),e=Zo(o,e),i){case 0:t=Ha(null,t,o,e,n);break e;case 1:t=Wa(null,t,o,e,n);break e;case 11:t=Ia(null,t,o,e,n);break e;case 14:t=za(null,t,o,Zo(o.type,e),r,n);break e}throw Error(a(306,o,""))}return t;case 0:return r=t.type,o=t.pendingProps,Ha(e,t,r,o=t.elementType===r?o:Zo(r,o),n);case 1:return r=t.type,o=t.pendingProps,Wa(e,t,r,o=t.elementType===r?o:Zo(r,o),n);case 3:if(Ya(t),r=t.updateQueue,null===e||null===r)throw Error(a(282));if(r=t.pendingProps,o=null!==(o=t.memoizedState)?o.element:null,ci(e,t),hi(t,r,null,n),(r=t.memoizedState.element)===o)Gi(),t=is(e,t,n);else{if((i=(o=t.stateNode).hydrate)&&(Bi=Gr(t.stateNode.containerInfo.firstChild),zi=t,i=Ui=!0),i){if(null!=(e=o.mutableSourceEagerHydrationData))for(o=0;o<e.length;o+=2)(i=e[o])._workInProgressVersionPrimary=e[o+1],Xi.push(i);for(n=ji(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|1024,n=n.sibling}else Aa(e,t,r,n),Gi();t=t.child}return t;case 5:return $i(t),null===e&&Wi(t),r=t.type,o=t.pendingProps,i=null!==e?e.memoizedProps:null,s=o.children,Hr(r,o)?s=null:null!==i&&Hr(r,i)&&(t.flags|=16),Va(e,t),Aa(e,t,s,n),t.child;case 6:return null===e&&Wi(t),null;case 13:return Za(e,t,n);case 4:return Ri(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=Ci(t,null,r,n):Aa(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,Ia(e,t,r,o=t.elementType===r?o:Zo(r,o),n);case 7:return Aa(e,t,t.pendingProps,n),t.child;case 8:case 12:return Aa(e,t,t.pendingProps.children,n),t.child;case 10:e:{r=t.type._context,o=t.pendingProps,s=t.memoizedProps,i=o.value;var l=t.type._context;if(fo(Jo,l._currentValue),l._currentValue=i,null!==s)if(l=s.value,0===(i=cr(l,i)?0:0|("function"==typeof r._calculateChangedBits?r._calculateChangedBits(l,i):1073741823))){if(s.children===o.children&&!go.current){t=is(e,t,n);break e}}else for(null!==(l=t.child)&&(l.return=t);null!==l;){var u=l.dependencies;if(null!==u){s=l.child;for(var c=u.firstContext;null!==c;){if(c.context===r&&0!=(c.observedBits&i)){1===l.tag&&((c=fi(-1,n&-n)).tag=2,di(l,c)),l.lanes|=n,null!==(c=l.alternate)&&(c.lanes|=n),ii(l.return,n),u.lanes|=n;break}c=c.next}}else s=10===l.tag&&l.type===t.type?null:l.child;if(null!==s)s.return=l;else for(s=l;null!==s;){if(s===t){s=null;break}if(null!==(l=s.sibling)){l.return=s.return,s=l;break}s=s.return}l=s}Aa(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=(i=t.pendingProps).children,ai(t,n),r=r(o=si(o,i.unstable_observedBits)),t.flags|=1,Aa(e,t,r,n),t.child;case 14:return i=Zo(o=t.type,t.pendingProps),za(e,t,o,i=Zo(o.type,i),r,n);case 15:return Ba(e,t,t.type,t.pendingProps,r,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Zo(r,o),null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),t.tag=1,yo(r)?(e=!0,ko(t)):e=!1,ai(t,n),wi(t,r,o),ki(t,r,o,n),qa(null,t,r,!0,e,n);case 19:return os(e,t,n);case 23:case 24:return Ua(e,t,n)}throw Error(a(156,t.tag))},ou.prototype.render=function(e){eu(e,this._internalRoot,null,null)},ou.prototype.unmount=function(){var e=this._internalRoot,t=e.containerInfo;eu(null,e,null,(function(){t[eo]=null}))},tt=function(e){13===e.tag&&(hl(e,4,dl()),ru(e,4))},nt=function(e){13===e.tag&&(hl(e,67108864,dl()),ru(e,67108864))},rt=function(e){if(13===e.tag){var t=dl(),n=pl(e);hl(e,n,t),ru(e,n)}},ot=function(e,t){return t()},Ce=function(e,t,n){switch(t){case"input":if(ne(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=io(r);if(!o)throw Error(a(90));Q(r),ne(r,o)}}}break;case"textarea":ue(e,n);break;case"select":null!=(t=n.value)&&ae(e,!!n.multiple,t,!1)}},Ne=wl,Re=function(e,t,n,r,o){var i=Ls;Ls|=4;try{return Yo(98,e.bind(null,t,n,r,o))}finally{0===(Ls=i)&&(Ys(),Xo())}},De=function(){0==(49&Ls)&&(function(){if(null!==ol){var e=ol;ol=null,e.forEach((function(e){e.expiredLanes|=24&e.pendingLanes,ml(e,Ho())}))}Xo()}(),Dl())},$e=function(e,t){var n=Ls;Ls|=2;try{return e(t)}finally{0===(Ls=n)&&(Ys(),Xo())}};var lu={Events:[ro,oo,io,Me,Le,Dl,{current:!1}]},uu={findFiberByHostInstance:no,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"},cu={bundleType:uu.bundleType,version:uu.version,rendererPackageName:uu.rendererPackageName,rendererConfig:uu.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:x.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Je(e))?null:e.stateNode},findFiberByHostInstance:uu.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var fu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!fu.isDisabled&&fu.supportsFiber)try{So=fu.inject(cu),Oo=fu}catch(me){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lu,t.createPortal=su,t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"==typeof e.render)throw Error(a(188));throw Error(a(268,Object.keys(e)))}return e=null===(e=Je(t))?null:e.stateNode},t.flushSync=function(e,t){var n=Ls;if(0!=(48&n))return e(t);Ls|=1;try{if(e)return Yo(99,e.bind(null,t))}finally{Ls=n,Xo()}},t.hydrate=function(e,t,n){if(!iu(t))throw Error(a(200));return au(null,e,t,!0,n)},t.render=function(e,t,n){if(!iu(t))throw Error(a(200));return au(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!iu(e))throw Error(a(40));return!!e._reactRootContainer&&(xl((function(){au(null,null,e,!1,(function(){e._reactRootContainer=null,e[eo]=null}))})),!0)},t.unstable_batchedUpdates=wl,t.unstable_createPortal=function(e,t){return su(e,t,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)},t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!iu(n))throw Error(a(200));if(null==e||void 0===e._reactInternals)throw Error(a(38));return au(e,t,n,!1,r)},t.version="17.0.2"},60:(e,t,n)=>{"use strict";!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(583)},10:(e,t,n)=>{"use strict";function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function o(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}n.r(t),n.d(t,{default:()=>o})},679:(e,t,n)=>{"use strict";var r=n(864),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},i={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},s={};function l(e){return r.isMemo(e)?a:s[e.$$typeof]||o}s[r.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},s[r.Memo]=a;var u=Object.defineProperty,c=Object.getOwnPropertyNames,f=Object.getOwnPropertySymbols,d=Object.getOwnPropertyDescriptor,p=Object.getPrototypeOf,h=Object.prototype;e.exports=function e(t,n,r){if("string"!=typeof n){if(h){var o=p(n);o&&o!==h&&e(t,o,r)}var a=c(n);f&&(a=a.concat(f(n)));for(var s=l(t),g=l(n),m=0;m<a.length;++m){var v=a[m];if(!(i[v]||r&&r[v]||g&&g[v]||s&&s[v])){var y=d(n,v);try{u(t,v,y)}catch(e){}}}}return t}},418:e=>{"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,i){for(var a,s,l=o(e),u=1;u<arguments.length;u++){for(var c in a=Object(arguments[u]))n.call(a,c)&&(l[c]=a[c]);if(t){s=t(a);for(var f=0;f<s.length;f++)r.call(a,s[f])&&(l[s[f]]=a[s[f]])}}return l}},703:(e,t,n)=>{"use strict";var r=n(414);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},581:(e,t,n)=>{e.exports=n(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},668:(e,t,n)=>{"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"DraggableCore",{enumerable:!0,get:function(){return f.default}}),t.default=void 0;var o=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!=typeof e)return{default:e};var n=g(t);if(n&&n.has(e))return n.get(e);var o={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=i?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(o,a,s):o[a]=e[a]}o.default=e,n&&n.set(e,o);return o}(n(294)),i=h(n(581)),a=h(n(60)),s=h(n(10)),l=n(825),u=n(849),c=n(280),f=h(n(783)),d=h(n(904)),p=["axis","bounds","children","defaultPosition","defaultClassName","defaultClassNameDragging","defaultClassNameDragged","position","positionOffset","scale"];function h(e){return e&&e.__esModule?e:{default:e}}function g(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(g=function(e){return e?n:t})(e)}function m(){return m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},m.apply(this,arguments)}function v(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){j(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return x(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t){return _=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},_(e,t)}function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=C(e);if(t){var o=C(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return O(this,n)}}function O(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return E(e)}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e){return C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},C(e)}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_(e,t)}(c,e);var t,n,r,i=S(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),j(E(t=i.call(this,e)),"onDragStart",(function(e,n){if((0,d.default)("Draggable: onDragStart: %j",n),!1===t.props.onStart(e,(0,u.createDraggableData)(E(t),n)))return!1;t.setState({dragging:!0,dragged:!0})})),j(E(t),"onDrag",(function(e,n){if(!t.state.dragging)return!1;(0,d.default)("Draggable: onDrag: %j",n);var r=(0,u.createDraggableData)(E(t),n),o={x:r.x,y:r.y};if(t.props.bounds){var i=o.x,a=o.y;o.x+=t.state.slackX,o.y+=t.state.slackY;var s=w((0,u.getBoundPosition)(E(t),o.x,o.y),2),l=s[0],c=s[1];o.x=l,o.y=c,o.slackX=t.state.slackX+(i-o.x),o.slackY=t.state.slackY+(a-o.y),r.x=o.x,r.y=o.y,r.deltaX=o.x-t.state.x,r.deltaY=o.y-t.state.y}if(!1===t.props.onDrag(e,r))return!1;t.setState(o)})),j(E(t),"onDragStop",(function(e,n){if(!t.state.dragging)return!1;if(!1===t.props.onStop(e,(0,u.createDraggableData)(E(t),n)))return!1;(0,d.default)("Draggable: onDragStop: %j",n);var r={dragging:!1,slackX:0,slackY:0};if(Boolean(t.props.position)){var o=t.props.position,i=o.x,a=o.y;r.x=i,r.y=a}t.setState(r)})),t.state={dragging:!1,dragged:!1,x:e.position?e.position.x:e.defaultPosition.x,y:e.position?e.position.y:e.defaultPosition.y,prevPropsPosition:b({},e.position),slackX:0,slackY:0,isElementSVG:!1},!e.position||e.onDrag||e.onStop||console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element."),t}return t=c,r=[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.position,r=t.prevPropsPosition;return!n||r&&n.x===r.x&&n.y===r.y?null:((0,d.default)("Draggable: getDerivedStateFromProps %j",{position:n,prevPropsPosition:r}),{x:n.x,y:n.y,prevPropsPosition:b({},n)})}}],(n=[{key:"componentDidMount",value:function(){void 0!==window.SVGElement&&this.findDOMNode()instanceof window.SVGElement&&this.setState({isElementSVG:!0})}},{key:"componentWillUnmount",value:function(){this.setState({dragging:!1})}},{key:"findDOMNode",value:function(){var e,t,n;return null!==(e=null===(t=this.props)||void 0===t||null===(n=t.nodeRef)||void 0===n?void 0:n.current)&&void 0!==e?e:a.default.findDOMNode(this)}},{key:"render",value:function(){var e,t=this.props,n=(t.axis,t.bounds,t.children),r=t.defaultPosition,i=t.defaultClassName,a=t.defaultClassNameDragging,c=t.defaultClassNameDragged,d=t.position,h=t.positionOffset,g=(t.scale,v(t,p)),y={},w=null,x=!Boolean(d)||this.state.dragging,k=d||r,_={x:(0,u.canDragX)(this)&&x?this.state.x:k.x,y:(0,u.canDragY)(this)&&x?this.state.y:k.y};this.state.isElementSVG?w=(0,l.createSVGTransform)(_,h):y=(0,l.createCSSTransform)(_,h);var S=(0,s.default)(n.props.className||"",i,(j(e={},a,this.state.dragging),j(e,c,this.state.dragged),e));return o.createElement(f.default,m({},g,{onStart:this.onDragStart,onDrag:this.onDrag,onStop:this.onDragStop}),o.cloneElement(o.Children.only(n),{className:S,style:b(b({},n.props.style),y),transform:w}))}}])&&k(t.prototype,n),r&&k(t,r),Object.defineProperty(t,"prototype",{writable:!1}),c}(o.Component);t.default=T,j(T,"displayName","Draggable"),j(T,"propTypes",b(b({},f.default.propTypes),{},{axis:i.default.oneOf(["both","x","y","none"]),bounds:i.default.oneOfType([i.default.shape({left:i.default.number,right:i.default.number,top:i.default.number,bottom:i.default.number}),i.default.string,i.default.oneOf([!1])]),defaultClassName:i.default.string,defaultClassNameDragging:i.default.string,defaultClassNameDragged:i.default.string,defaultPosition:i.default.shape({x:i.default.number,y:i.default.number}),positionOffset:i.default.shape({x:i.default.oneOfType([i.default.number,i.default.string]),y:i.default.oneOfType([i.default.number,i.default.string])}),position:i.default.shape({x:i.default.number,y:i.default.number}),className:c.dontSetMe,style:c.dontSetMe,transform:c.dontSetMe})),j(T,"defaultProps",b(b({},f.default.defaultProps),{},{axis:"both",bounds:!1,defaultClassName:"react-draggable",defaultClassNameDragging:"react-draggable-dragging",defaultClassNameDragged:"react-draggable-dragged",defaultPosition:{x:0,y:0},scale:1}))},783:(e,t,n)=>{"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!=typeof e)return{default:e};var n=d(t);if(n&&n.has(e))return n.get(e);var o={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=i?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(o,a,s):o[a]=e[a]}o.default=e,n&&n.set(e,o);return o}(n(294)),i=f(n(581)),a=f(n(60)),s=n(825),l=n(849),u=n(280),c=f(n(904));function f(e){return e&&e.__esModule?e:{default:e}}function d(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(d=function(e){return e?n:t})(e)}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t){return v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},v(e,t)}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=x(e);if(t){var o=x(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return b(this,n)}}function b(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return w(e)}function w(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}function k(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _={start:"touchstart",move:"touchmove",stop:"touchend"},S={start:"mousedown",move:"mousemove",stop:"mouseup"},O=S,E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&v(e,t)}(u,e);var t,n,r,i=y(u);function u(){var e;g(this,u);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return k(w(e=i.call.apply(i,[this].concat(n))),"state",{dragging:!1,lastX:NaN,lastY:NaN,touchIdentifier:null}),k(w(e),"mounted",!1),k(w(e),"handleDragStart",(function(t){if(e.props.onMouseDown(t),!e.props.allowAnyClick&&"number"==typeof t.button&&0!==t.button)return!1;var n=e.findDOMNode();if(!n||!n.ownerDocument||!n.ownerDocument.body)throw new Error("<DraggableCore> not mounted on DragStart!");var r=n.ownerDocument;if(!(e.props.disabled||!(t.target instanceof r.defaultView.Node)||e.props.handle&&!(0,s.matchesSelectorAndParentsTo)(t.target,e.props.handle,n)||e.props.cancel&&(0,s.matchesSelectorAndParentsTo)(t.target,e.props.cancel,n))){"touchstart"===t.type&&t.preventDefault();var o=(0,s.getTouchIdentifier)(t);e.setState({touchIdentifier:o});var i=(0,l.getControlPosition)(t,o,w(e));if(null!=i){var a=i.x,u=i.y,f=(0,l.createCoreData)(w(e),a,u);(0,c.default)("DraggableCore: handleDragStart: %j",f),(0,c.default)("calling",e.props.onStart),!1!==e.props.onStart(t,f)&&!1!==e.mounted&&(e.props.enableUserSelectHack&&(0,s.addUserSelectStyles)(r),e.setState({dragging:!0,lastX:a,lastY:u}),(0,s.addEvent)(r,O.move,e.handleDrag),(0,s.addEvent)(r,O.stop,e.handleDragStop))}}})),k(w(e),"handleDrag",(function(t){var n=(0,l.getControlPosition)(t,e.state.touchIdentifier,w(e));if(null!=n){var r=n.x,o=n.y;if(Array.isArray(e.props.grid)){var i=r-e.state.lastX,a=o-e.state.lastY,s=p((0,l.snapToGrid)(e.props.grid,i,a),2);if(i=s[0],a=s[1],!i&&!a)return;r=e.state.lastX+i,o=e.state.lastY+a}var u=(0,l.createCoreData)(w(e),r,o);if((0,c.default)("DraggableCore: handleDrag: %j",u),!1!==e.props.onDrag(t,u)&&!1!==e.mounted)e.setState({lastX:r,lastY:o});else try{e.handleDragStop(new MouseEvent("mouseup"))}catch(t){var f=document.createEvent("MouseEvents");f.initMouseEvent("mouseup",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),e.handleDragStop(f)}}})),k(w(e),"handleDragStop",(function(t){if(e.state.dragging){var n=(0,l.getControlPosition)(t,e.state.touchIdentifier,w(e));if(null!=n){var r=n.x,o=n.y;if(Array.isArray(e.props.grid)){var i=r-e.state.lastX||0,a=o-e.state.lastY||0,u=p((0,l.snapToGrid)(e.props.grid,i,a),2);i=u[0],a=u[1],r=e.state.lastX+i,o=e.state.lastY+a}var f=(0,l.createCoreData)(w(e),r,o);if(!1===e.props.onStop(t,f)||!1===e.mounted)return!1;var d=e.findDOMNode();d&&e.props.enableUserSelectHack&&(0,s.removeUserSelectStyles)(d.ownerDocument),(0,c.default)("DraggableCore: handleDragStop: %j",f),e.setState({dragging:!1,lastX:NaN,lastY:NaN}),d&&((0,c.default)("DraggableCore: Removing handlers"),(0,s.removeEvent)(d.ownerDocument,O.move,e.handleDrag),(0,s.removeEvent)(d.ownerDocument,O.stop,e.handleDragStop))}}})),k(w(e),"onMouseDown",(function(t){return O=S,e.handleDragStart(t)})),k(w(e),"onMouseUp",(function(t){return O=S,e.handleDragStop(t)})),k(w(e),"onTouchStart",(function(t){return O=_,e.handleDragStart(t)})),k(w(e),"onTouchEnd",(function(t){return O=_,e.handleDragStop(t)})),e}return t=u,(n=[{key:"componentDidMount",value:function(){this.mounted=!0;var e=this.findDOMNode();e&&(0,s.addEvent)(e,_.start,this.onTouchStart,{passive:!1})}},{key:"componentWillUnmount",value:function(){this.mounted=!1;var e=this.findDOMNode();if(e){var t=e.ownerDocument;(0,s.removeEvent)(t,S.move,this.handleDrag),(0,s.removeEvent)(t,_.move,this.handleDrag),(0,s.removeEvent)(t,S.stop,this.handleDragStop),(0,s.removeEvent)(t,_.stop,this.handleDragStop),(0,s.removeEvent)(e,_.start,this.onTouchStart,{passive:!1}),this.props.enableUserSelectHack&&(0,s.removeUserSelectStyles)(t)}}},{key:"findDOMNode",value:function(){var e,t,n;return null!==(e=this.props)&&void 0!==e&&e.nodeRef?null===(t=this.props)||void 0===t||null===(n=t.nodeRef)||void 0===n?void 0:n.current:a.default.findDOMNode(this)}},{key:"render",value:function(){return o.cloneElement(o.Children.only(this.props.children),{onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onTouchEnd:this.onTouchEnd})}}])&&m(t.prototype,n),r&&m(t,r),Object.defineProperty(t,"prototype",{writable:!1}),u}(o.Component);t.default=E,k(E,"displayName","DraggableCore"),k(E,"propTypes",{allowAnyClick:i.default.bool,disabled:i.default.bool,enableUserSelectHack:i.default.bool,offsetParent:function(e,t){if(e[t]&&1!==e[t].nodeType)throw new Error("Draggable's offsetParent must be a DOM Node.")},grid:i.default.arrayOf(i.default.number),handle:i.default.string,cancel:i.default.string,nodeRef:i.default.object,onStart:i.default.func,onDrag:i.default.func,onStop:i.default.func,onMouseDown:i.default.func,scale:i.default.number,className:u.dontSetMe,style:u.dontSetMe,transform:u.dontSetMe}),k(E,"defaultProps",{allowAnyClick:!1,disabled:!1,enableUserSelectHack:!0,onStart:function(){},onDrag:function(){},onStop:function(){},onMouseDown:function(){},scale:1})},193:(e,t,n)=>{"use strict";var r=n(668),o=r.default,i=r.DraggableCore;e.exports=o,e.exports.default=o,e.exports.DraggableCore=i},825:(e,t,n)=>{"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.addClassName=p,t.addEvent=function(e,t,n,r){if(!e)return;var o=l({capture:!0},r);e.addEventListener?e.addEventListener(t,n,o):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n},t.addUserSelectStyles=function(e){if(!e)return;var t=e.getElementById("react-draggable-style-el");t||((t=e.createElement("style")).type="text/css",t.id="react-draggable-style-el",t.innerHTML=".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n",t.innerHTML+=".react-draggable-transparent-selection *::selection {all: inherit;}\n",e.getElementsByTagName("head")[0].appendChild(t));e.body&&p(e.body,"react-draggable-transparent-selection")},t.createCSSTransform=function(e,t){var n=d(e,t,"px");return u({},(0,i.browserPrefixToKey)("transform",i.default),n)},t.createSVGTransform=function(e,t){return d(e,t,"")},t.getTouch=function(e,t){return e.targetTouches&&(0,o.findInArray)(e.targetTouches,(function(e){return t===e.identifier}))||e.changedTouches&&(0,o.findInArray)(e.changedTouches,(function(e){return t===e.identifier}))},t.getTouchIdentifier=function(e){if(e.targetTouches&&e.targetTouches[0])return e.targetTouches[0].identifier;if(e.changedTouches&&e.changedTouches[0])return e.changedTouches[0].identifier},t.getTranslation=d,t.innerHeight=function(e){var t=e.clientHeight,n=e.ownerDocument.defaultView.getComputedStyle(e);return t-=(0,o.int)(n.paddingTop),t-=(0,o.int)(n.paddingBottom)},t.innerWidth=function(e){var t=e.clientWidth,n=e.ownerDocument.defaultView.getComputedStyle(e);return t-=(0,o.int)(n.paddingLeft),t-=(0,o.int)(n.paddingRight)},t.matchesSelector=f,t.matchesSelectorAndParentsTo=function(e,t,n){var r=e;do{if(f(r,t))return!0;if(r===n)return!1;r=r.parentNode}while(r);return!1},t.offsetXYFromParent=function(e,t,n){var r=t===t.ownerDocument.body?{left:0,top:0}:t.getBoundingClientRect(),o=(e.clientX+t.scrollLeft-r.left)/n,i=(e.clientY+t.scrollTop-r.top)/n;return{x:o,y:i}},t.outerHeight=function(e){var t=e.clientHeight,n=e.ownerDocument.defaultView.getComputedStyle(e);return t+=(0,o.int)(n.borderTopWidth),t+=(0,o.int)(n.borderBottomWidth)},t.outerWidth=function(e){var t=e.clientWidth,n=e.ownerDocument.defaultView.getComputedStyle(e);return t+=(0,o.int)(n.borderLeftWidth),t+=(0,o.int)(n.borderRightWidth)},t.removeClassName=h,t.removeEvent=function(e,t,n,r){if(!e)return;var o=l({capture:!0},r);e.removeEventListener?e.removeEventListener(t,n,o):e.detachEvent?e.detachEvent("on"+t,n):e["on"+t]=null},t.removeUserSelectStyles=function(e){if(!e)return;try{if(e.body&&h(e.body,"react-draggable-transparent-selection"),e.selection)e.selection.empty();else{var t=(e.defaultView||window).getSelection();t&&"Caret"!==t.type&&t.removeAllRanges()}}catch(e){}};var o=n(280),i=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!=typeof e)return{default:e};var n=a(t);if(n&&n.has(e))return n.get(e);var o={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var l=i?Object.getOwnPropertyDescriptor(e,s):null;l&&(l.get||l.set)?Object.defineProperty(o,s,l):o[s]=e[s]}o.default=e,n&&n.set(e,o);return o}(n(650));function a(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(a=function(e){return e?n:t})(e)}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c="";function f(e,t){return c||(c=(0,o.findInArray)(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"],(function(t){return(0,o.isFunction)(e[t])}))),!!(0,o.isFunction)(e[c])&&e[c](t)}function d(e,t,n){var r=e.x,o=e.y,i="translate(".concat(r).concat(n,",").concat(o).concat(n,")");if(t){var a="".concat("string"==typeof t.x?t.x:t.x+n),s="".concat("string"==typeof t.y?t.y:t.y+n);i="translate(".concat(a,", ").concat(s,")")+i}return i}function p(e,t){e.classList?e.classList.add(t):e.className.match(new RegExp("(?:^|\\s)".concat(t,"(?!\\S)")))||(e.className+=" ".concat(t))}function h(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(?:^|\\s)".concat(t,"(?!\\S)"),"g"),"")}},650:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.browserPrefixToKey=o,t.browserPrefixToStyle=function(e,t){return t?"-".concat(t.toLowerCase(),"-").concat(e):e},t.default=void 0,t.getPrefix=r;var n=["Moz","Webkit","O","ms"];function r(){var e,t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"transform";if("undefined"==typeof window)return"";var i=null===(e=window.document)||void 0===e||null===(t=e.documentElement)||void 0===t?void 0:t.style;if(!i)return"";if(r in i)return"";for(var a=0;a<n.length;a++)if(o(r,n[a])in i)return n[a];return""}function o(e,t){return t?"".concat(t).concat(function(e){for(var t="",n=!0,r=0;r<e.length;r++)n?(t+=e[r].toUpperCase(),n=!1):"-"===e[r]?n=!0:t+=e[r];return t}(e)):e}var i=r();t.default=i},904:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){0}},849:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.canDragX=function(e){return"both"===e.props.axis||"x"===e.props.axis},t.canDragY=function(e){return"both"===e.props.axis||"y"===e.props.axis},t.createCoreData=function(e,t,n){var o=e.state,a=!(0,r.isNum)(o.lastX),s=i(e);return a?{node:s,deltaX:0,deltaY:0,lastX:t,lastY:n,x:t,y:n}:{node:s,deltaX:t-o.lastX,deltaY:n-o.lastY,lastX:o.lastX,lastY:o.lastY,x:t,y:n}},t.createDraggableData=function(e,t){var n=e.props.scale;return{node:t.node,x:e.state.x+t.deltaX/n,y:e.state.y+t.deltaY/n,deltaX:t.deltaX/n,deltaY:t.deltaY/n,lastX:e.state.x,lastY:e.state.y}},t.getBoundPosition=function(e,t,n){if(!e.props.bounds)return[t,n];var a=e.props.bounds;a="string"==typeof a?a:function(e){return{left:e.left,top:e.top,right:e.right,bottom:e.bottom}}(a);var s=i(e);if("string"==typeof a){var l,u=s.ownerDocument,c=u.defaultView;if(!((l="parent"===a?s.parentNode:u.querySelector(a))instanceof c.HTMLElement))throw new Error('Bounds selector "'+a+'" could not find an element.');var f=l,d=c.getComputedStyle(s),p=c.getComputedStyle(f);a={left:-s.offsetLeft+(0,r.int)(p.paddingLeft)+(0,r.int)(d.marginLeft),top:-s.offsetTop+(0,r.int)(p.paddingTop)+(0,r.int)(d.marginTop),right:(0,o.innerWidth)(f)-(0,o.outerWidth)(s)-s.offsetLeft+(0,r.int)(p.paddingRight)-(0,r.int)(d.marginRight),bottom:(0,o.innerHeight)(f)-(0,o.outerHeight)(s)-s.offsetTop+(0,r.int)(p.paddingBottom)-(0,r.int)(d.marginBottom)}}(0,r.isNum)(a.right)&&(t=Math.min(t,a.right));(0,r.isNum)(a.bottom)&&(n=Math.min(n,a.bottom));(0,r.isNum)(a.left)&&(t=Math.max(t,a.left));(0,r.isNum)(a.top)&&(n=Math.max(n,a.top));return[t,n]},t.getControlPosition=function(e,t,n){var r="number"==typeof t?(0,o.getTouch)(e,t):null;if("number"==typeof t&&!r)return null;var a=i(n),s=n.props.offsetParent||a.offsetParent||a.ownerDocument.body;return(0,o.offsetXYFromParent)(r||e,s,n.props.scale)},t.snapToGrid=function(e,t,n){var r=Math.round(t/e[0])*e[0],o=Math.round(n/e[1])*e[1];return[r,o]};var r=n(280),o=n(825);function i(e){var t=e.findDOMNode();if(!t)throw new Error("<DraggableCore>: Unmounted during event!");return t}},280:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.dontSetMe=function(e,t,n){if(e[t])return new Error("Invalid prop ".concat(t," passed to ").concat(n," - do not set this, set it on the child."))},t.findInArray=function(e,t){for(var n=0,r=e.length;n<r;n++)if(t.apply(t,[e[n],n,e]))return e[n]},t.int=function(e){return parseInt(e,10)},t.isFunction=function(e){return"function"==typeof e||"[object Function]"===Object.prototype.toString.call(e)},t.isNum=function(e){return"number"==typeof e&&!isNaN(e)}},921:(e,t)=>{"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n="function"==typeof Symbol&&Symbol.for,r=n?Symbol.for("react.element"):60103,o=n?Symbol.for("react.portal"):60106,i=n?Symbol.for("react.fragment"):60107,a=n?Symbol.for("react.strict_mode"):60108,s=n?Symbol.for("react.profiler"):60114,l=n?Symbol.for("react.provider"):60109,u=n?Symbol.for("react.context"):60110,c=n?Symbol.for("react.async_mode"):60111,f=n?Symbol.for("react.concurrent_mode"):60111,d=n?Symbol.for("react.forward_ref"):60112,p=n?Symbol.for("react.suspense"):60113,h=n?Symbol.for("react.suspense_list"):60120,g=n?Symbol.for("react.memo"):60115,m=n?Symbol.for("react.lazy"):60116,v=n?Symbol.for("react.block"):60121,y=n?Symbol.for("react.fundamental"):60117,b=n?Symbol.for("react.responder"):60118,w=n?Symbol.for("react.scope"):60119;function x(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case c:case f:case i:case s:case a:case p:return e;default:switch(e=e&&e.$$typeof){case u:case d:case m:case g:case l:return e;default:return t}}case o:return t}}}function k(e){return x(e)===f}t.AsyncMode=c,t.ConcurrentMode=f,t.ContextConsumer=u,t.ContextProvider=l,t.Element=r,t.ForwardRef=d,t.Fragment=i,t.Lazy=m,t.Memo=g,t.Portal=o,t.Profiler=s,t.StrictMode=a,t.Suspense=p,t.isAsyncMode=function(e){return k(e)||x(e)===c},t.isConcurrentMode=k,t.isContextConsumer=function(e){return x(e)===u},t.isContextProvider=function(e){return x(e)===l},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r},t.isForwardRef=function(e){return x(e)===d},t.isFragment=function(e){return x(e)===i},t.isLazy=function(e){return x(e)===m},t.isMemo=function(e){return x(e)===g},t.isPortal=function(e){return x(e)===o},t.isProfiler=function(e){return x(e)===s},t.isStrictMode=function(e){return x(e)===a},t.isSuspense=function(e){return x(e)===p},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===i||e===f||e===s||e===a||e===p||e===h||"object"==typeof e&&null!==e&&(e.$$typeof===m||e.$$typeof===g||e.$$typeof===l||e.$$typeof===u||e.$$typeof===d||e.$$typeof===y||e.$$typeof===b||e.$$typeof===w||e.$$typeof===v)},t.typeOf=x},864:(e,t,n)=>{"use strict";e.exports=n(921)},918:(e,t,n)=>{"use strict";var r=n(294),o=n(917),i=n(697),a=n(60),s=n(581);function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var u=l(r),c=l(i),f=l(s),d="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==n.g?n.g:"undefined"!=typeof self?self:{};function p(e,t){return e(t={exports:{}},t.exports),t.exports}var h=p((function(e){!function(t){var n=function(e,t,r){if(!l(t)||c(t)||f(t)||d(t)||s(t))return t;var o,i=0,a=0;if(u(t))for(o=[],a=t.length;i<a;i++)o.push(n(e,t[i],r));else for(var p in o={},t)Object.prototype.hasOwnProperty.call(t,p)&&(o[e(p,r)]=n(e,t[p],r));return o},r=function(e){return p(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,(function(e,t){return t?t.toUpperCase():""}))).substr(0,1).toLowerCase()+e.substr(1)},o=function(e){var t=r(e);return t.substr(0,1).toUpperCase()+t.substr(1)},i=function(e,t){return function(e,t){var n=(t=t||{}).separator||"_",r=t.split||/(?=[A-Z])/;return e.split(r).join(n)}(e,t).toLowerCase()},a=Object.prototype.toString,s=function(e){return"function"==typeof e},l=function(e){return e===Object(e)},u=function(e){return"[object Array]"==a.call(e)},c=function(e){return"[object Date]"==a.call(e)},f=function(e){return"[object RegExp]"==a.call(e)},d=function(e){return"[object Boolean]"==a.call(e)},p=function(e){return(e-=0)==e},h=function(e,t){var n=t&&"process"in t?t.process:t;return"function"!=typeof n?e:function(t,r){return n(t,e,r)}},g={camelize:r,decamelize:i,pascalize:o,depascalize:i,camelizeKeys:function(e,t){return n(h(r,t),e)},decamelizeKeys:function(e,t){return n(h(i,t),e,t)},pascalizeKeys:function(e,t){return n(h(o,t),e)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=g:t.humps=g}(d)})).decamelize,g=p((function(e){function t(){return e.exports=t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},t.apply(this,arguments)}e.exports=t})),m=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},v=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()},y=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o},b=r.createContext(null);function w(e){var t=e.root,n=e.children;return a.createPortal(n,t)}function x(e){var t=r.forwardRef((function(t,n){var o,i,a=t.mode,s=t.delegatesFocus,l=t.styleSheets,c=t.ssr,f=t.children,d=y(t,["mode","delegatesFocus","styleSheets","ssr","children"]),p=(o=n,i=r.useRef(o&&o.current),r.useEffect((function(){o&&(o.current=i.current)}),[o]),i),h=r.useState(null),m=v(h,2),x=m[0],k=m[1],_="node_".concat(a).concat(s);return r.useEffect((function(){if(p.current)try{if("function"==typeof n&&n(p.current),c){var e=p.current.shadowRoot;return void k(e)}var t=p.current.attachShadow({mode:a,delegatesFocus:s});l.length>0&&(t.adoptedStyleSheets=l),k(t)}catch(e){!function(e){var t=e.error,n=e.styleSheets,r=e.root;if("NotSupportedError"!==t.name)throw t;n.length>0&&(r.adoptedStyleSheets=n)}({error:e,styleSheets:l,root:x})}}),[n,p,l]),u.default.createElement(u.default.Fragment,null,u.default.createElement(e.tag,g({key:_,ref:p},d),(x||c)&&u.default.createElement(b.Provider,{value:x},c?u.default.createElement("template",{shadowroot:"open"},e.render({root:x,ssr:c,children:f})):u.default.createElement(w,{root:x},e.render({root:x,ssr:c,children:f})))))}));return t.propTypes={mode:f.default.oneOf(["open","closed"]),delegatesFocus:f.default.bool,styleSheets:f.default.arrayOf(f.default.instanceOf(globalThis.CSSStyleSheet)),ssr:f.default.bool,children:f.default.node},t.defaultProps={mode:"open",delegatesFocus:!1,styleSheets:[],ssr:!1,children:null},t}w.propTypes={root:f.default.object.isRequired,children:f.default.node},w.defaultProps={children:null};var k=new Map;function _(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"core",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return e.children};return new Proxy(e,{get:function(e,r){var o=h(r,{separator:"-"}),i="".concat(t,"-").concat(o);return k.has(i)||k.set(i,x({tag:o,render:n})),k.get(i)}})}_();var S=new WeakMap,O=_({},"emotion",(function(e){var t=e.root,n=e.children,r=S.get(t)||function(){var e=c.default({container:t,key:"react-shadow"});return S.set(t,e),e}();return u.default.createElement(o.CacheProvider,{value:r},u.default.createElement(u.default.Fragment,null,n))}));t.Z=O},251:(e,t,n)=>{"use strict";
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */n(418);var r=n(294),o=60103;if(t.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var i=Symbol.for;o=i("react.element"),t.Fragment=i("react.fragment")}var a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,n){var r,i={},u=null,c=null;for(r in void 0!==n&&(u=""+n),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(c=t.ref),t)s.call(t,r)&&!l.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===i[r]&&(i[r]=t[r]);return{$$typeof:o,type:e,key:u,ref:c,props:i,_owner:a.current}}t.jsx=u,t.jsxs=u},408:(e,t,n)=>{"use strict";
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(418),o=60103,i=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var a=60109,s=60110,l=60112;t.Suspense=60113;var u=60115,c=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;o=f("react.element"),i=f("react.portal"),t.Fragment=f("react.fragment"),t.StrictMode=f("react.strict_mode"),t.Profiler=f("react.profiler"),a=f("react.provider"),s=f("react.context"),l=f("react.forward_ref"),t.Suspense=f("react.suspense"),u=f("react.memo"),c=f("react.lazy")}var d="function"==typeof Symbol&&Symbol.iterator;function p(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g={};function m(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||h}function v(){}function y(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||h}m.prototype.isReactComponent={},m.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(p(85));this.updater.enqueueSetState(this,e,t,"setState")},m.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=m.prototype;var b=y.prototype=new v;b.constructor=y,r(b,m.prototype),b.isPureReactComponent=!0;var w={current:null},x=Object.prototype.hasOwnProperty,k={key:!0,ref:!0,__self:!0,__source:!0};function _(e,t,n){var r,i={},a=null,s=null;if(null!=t)for(r in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(a=""+t.key),t)x.call(t,r)&&!k.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(1===l)i.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];i.children=u}if(e&&e.defaultProps)for(r in l=e.defaultProps)void 0===i[r]&&(i[r]=l[r]);return{$$typeof:o,type:e,key:a,ref:s,props:i,_owner:w.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var O=/\/+/g;function E(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function C(e,t,n,r,a){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l=!1;if(null===e)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case o:case i:l=!0}}if(l)return a=a(l=e),e=""===r?"."+E(l,0):r,Array.isArray(a)?(n="",null!=e&&(n=e.replace(O,"$&/")+"/"),C(a,t,n,"",(function(e){return e}))):null!=a&&(S(a)&&(a=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,n+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(O,"$&/")+"/")+e)),t.push(a)),1;if(l=0,r=""===r?".":r+":",Array.isArray(e))for(var u=0;u<e.length;u++){var c=r+E(s=e[u],u);l+=C(s,t,n,c,a)}else if(c=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e),"function"==typeof c)for(e=c.call(e),u=0;!(s=e.next()).done;)l+=C(s=s.value,t,n,c=r+E(s,u++),a);else if("object"===s)throw t=""+e,Error(p(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function j(e,t,n){if(null==e)return e;var r=[],o=0;return C(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function T(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var P={current:null};function M(){var e=P.current;if(null===e)throw Error(p(321));return e}var L={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:w,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:j,forEach:function(e,t,n){j(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return j(e,(function(){t++})),t},toArray:function(e){return j(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error(p(143));return e}},t.Component=m,t.PureComponent=y,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L,t.cloneElement=function(e,t,n){if(null==e)throw Error(p(267,e));var i=r({},e.props),a=e.key,s=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(s=t.ref,l=w.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(c in t)x.call(t,c)&&!k.hasOwnProperty(c)&&(i[c]=void 0===t[c]&&void 0!==u?u[c]:t[c])}var c=arguments.length-2;if(1===c)i.children=n;else if(1<c){u=Array(c);for(var f=0;f<c;f++)u[f]=arguments[f+2];i.children=u}return{$$typeof:o,type:e.type,key:a,ref:s,props:i,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:s,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=_,t.createFactory=function(e){var t=_.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=S,t.lazy=function(e){return{$$typeof:c,_payload:{_status:-1,_result:e},_init:T}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return M().useCallback(e,t)},t.useContext=function(e,t){return M().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return M().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return M().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return M().useLayoutEffect(e,t)},t.useMemo=function(e,t){return M().useMemo(e,t)},t.useReducer=function(e,t,n){return M().useReducer(e,t,n)},t.useRef=function(e){return M().useRef(e)},t.useState=function(e){return M().useState(e)},t.version="17.0.2"},294:(e,t,n)=>{"use strict";e.exports=n(408)},893:(e,t,n)=>{"use strict";e.exports=n(251)},53:(e,t)=>{"use strict";
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n,r,o,i;if("object"==typeof performance&&"function"==typeof performance.now){var a=performance;t.unstable_now=function(){return a.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}if("undefined"==typeof window||"function"!=typeof MessageChannel){var u=null,c=null,f=function(){if(null!==u)try{var e=t.unstable_now();u(!0,e),u=null}catch(e){throw setTimeout(f,0),e}};n=function(e){null!==u?setTimeout(n,0,e):(u=e,setTimeout(f,0))},r=function(e,t){c=setTimeout(e,t)},o=function(){clearTimeout(c)},t.unstable_shouldYield=function(){return!1},i=t.unstable_forceFrameRate=function(){}}else{var d=window.setTimeout,p=window.clearTimeout;if("undefined"!=typeof console){var h=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),"function"!=typeof h&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var g=!1,m=null,v=-1,y=5,b=0;t.unstable_shouldYield=function(){return t.unstable_now()>=b},i=function(){},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<e?Math.floor(1e3/e):5};var w=new MessageChannel,x=w.port2;w.port1.onmessage=function(){if(null!==m){var e=t.unstable_now();b=e+y;try{m(!0,e)?x.postMessage(null):(g=!1,m=null)}catch(e){throw x.postMessage(null),e}}else g=!1},n=function(e){m=e,g||(g=!0,x.postMessage(null))},r=function(e,n){v=d((function(){e(t.unstable_now())}),n)},o=function(){p(v),v=-1}}function k(e,t){var n=e.length;e.push(t);e:for(;;){var r=n-1>>>1,o=e[r];if(!(void 0!==o&&0<O(o,t)))break e;e[r]=t,e[n]=o,n=r}}function _(e){return void 0===(e=e[0])?null:e}function S(e){var t=e[0];if(void 0!==t){var n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length;r<o;){var i=2*(r+1)-1,a=e[i],s=i+1,l=e[s];if(void 0!==a&&0>O(a,n))void 0!==l&&0>O(l,a)?(e[r]=l,e[s]=n,r=s):(e[r]=a,e[i]=n,r=i);else{if(!(void 0!==l&&0>O(l,n)))break e;e[r]=l,e[s]=n,r=s}}}return t}return null}function O(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}var E=[],C=[],j=1,T=null,P=3,M=!1,L=!1,N=!1;function R(e){for(var t=_(C);null!==t;){if(null===t.callback)S(C);else{if(!(t.startTime<=e))break;S(C),t.sortIndex=t.expirationTime,k(E,t)}t=_(C)}}function D(e){if(N=!1,R(e),!L)if(null!==_(E))L=!0,n($);else{var t=_(C);null!==t&&r(D,t.startTime-e)}}function $(e,n){L=!1,N&&(N=!1,o()),M=!0;var i=P;try{for(R(n),T=_(E);null!==T&&(!(T.expirationTime>n)||e&&!t.unstable_shouldYield());){var a=T.callback;if("function"==typeof a){T.callback=null,P=T.priorityLevel;var s=a(T.expirationTime<=n);n=t.unstable_now(),"function"==typeof s?T.callback=s:T===_(E)&&S(E),R(n)}else S(E);T=_(E)}if(null!==T)var l=!0;else{var u=_(C);null!==u&&r(D,u.startTime-n),l=!1}return l}finally{T=null,P=i,M=!1}}var F=i;t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){L||M||(L=!0,n($))},t.unstable_getCurrentPriorityLevel=function(){return P},t.unstable_getFirstCallbackNode=function(){return _(E)},t.unstable_next=function(e){switch(P){case 1:case 2:case 3:var t=3;break;default:t=P}var n=P;P=t;try{return e()}finally{P=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=F,t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=P;P=e;try{return t()}finally{P=n}},t.unstable_scheduleCallback=function(e,i,a){var s=t.unstable_now();switch("object"==typeof a&&null!==a?a="number"==typeof(a=a.delay)&&0<a?s+a:s:a=s,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return e={id:j++,callback:i,priorityLevel:e,startTime:a,expirationTime:l=a+l,sortIndex:-1},a>s?(e.sortIndex=a,k(C,e),null===_(E)&&e===_(C)&&(N?o():N=!0,r(D,a-s))):(e.sortIndex=l,k(E,e),L||M||(L=!0,n($))),e},t.unstable_wrapCallback=function(e){var t=P;return function(){var n=P;P=t;try{return e.apply(this,arguments)}finally{P=n}}}},840:(e,t,n)=>{"use strict";e.exports=n(53)},238:function(e,t,n){var r;!function(o,i){"use strict";var a="function",s="undefined",l="object",u="string",c="model",f="name",d="type",p="vendor",h="version",g="architecture",m="console",v="mobile",y="tablet",b="smarttv",w="wearable",x="embedded",k="Amazon",_="Apple",S="ASUS",O="BlackBerry",E="Firefox",C="Google",j="Huawei",T="LG",P="Microsoft",M="Motorola",L="Opera",N="Samsung",R="Sony",D="Xiaomi",$="Zebra",F="Facebook",A=function(e){for(var t={},n=0;n<e.length;n++)t[e[n].toUpperCase()]=e[n];return t},I=function(e,t){return typeof e===u&&-1!==z(t).indexOf(z(e))},z=function(e){return e.toLowerCase()},B=function(e,t){if(typeof e===u)return e=e.replace(/^\s\s*/,"").replace(/\s\s*$/,""),typeof t===s?e:e.substring(0,255)},U=function(e,t){for(var n,r,o,s,u,c,f=0;f<t.length&&!u;){var d=t[f],p=t[f+1];for(n=r=0;n<d.length&&!u;)if(u=d[n++].exec(e))for(o=0;o<p.length;o++)c=u[++r],typeof(s=p[o])===l&&s.length>0?2===s.length?typeof s[1]==a?this[s[0]]=s[1].call(this,c):this[s[0]]=s[1]:3===s.length?typeof s[1]!==a||s[1].exec&&s[1].test?this[s[0]]=c?c.replace(s[1],s[2]):i:this[s[0]]=c?s[1].call(this,c,s[2]):i:4===s.length&&(this[s[0]]=c?s[3].call(this,c.replace(s[1],s[2])):i):this[s]=c||i;f+=2}},V=function(e,t){for(var n in t)if(typeof t[n]===l&&t[n].length>0){for(var r=0;r<t[n].length;r++)if(I(t[n][r],e))return"?"===n?i:n}else if(I(t[n],e))return"?"===n?i:n;return e},H={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},W={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[h,[f,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[h,[f,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[f,h],[/opios[\/ ]+([\w\.]+)/i],[h,[f,"Opera Mini"]],[/\bopr\/([\w\.]+)/i],[h,[f,L]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,/(weibo)__([\d\.]+)/i],[f,h],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[h,[f,"UCBrowser"]],[/\bqbcore\/([\w\.]+)/i],[h,[f,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[h,[f,"WeChat"]],[/konqueror\/([\w\.]+)/i],[h,[f,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[h,[f,"IE"]],[/yabrowser\/([\w\.]+)/i],[h,[f,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[f,/(.+)/,"$1 Secure Browser"],h],[/\bfocus\/([\w\.]+)/i],[h,[f,"Firefox Focus"]],[/\bopt\/([\w\.]+)/i],[h,[f,"Opera Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[h,[f,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[h,[f,"Dolphin"]],[/coast\/([\w\.]+)/i],[h,[f,"Opera Coast"]],[/miuibrowser\/([\w\.]+)/i],[h,[f,"MIUI Browser"]],[/fxios\/([-\w\.]+)/i],[h,[f,E]],[/\bqihu|(qi?ho?o?|360)browser/i],[[f,"360 Browser"]],[/(oculus|samsung|sailfish)browser\/([\w\.]+)/i],[[f,/(.+)/,"$1 Browser"],h],[/(comodo_dragon)\/([\w\.]+)/i],[[f,/_/g," "],h],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[f,h],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i],[f],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[f,F],h],[/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[f,h],[/\bgsa\/([\w\.]+) .*safari\//i],[h,[f,"GSA"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[h,[f,"Chrome Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[f,"Chrome WebView"],h],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[h,[f,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[f,h],[/version\/([\w\.]+) .*mobile\/\w+ (safari)/i],[h,[f,"Mobile Safari"]],[/version\/([\w\.]+) .*(mobile ?safari|safari)/i],[h,f],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[f,[h,V,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[f,h],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[f,"Netscape"],h],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[h,[f,"Firefox Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i],[f,h]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[g,"amd64"]],[/(ia32(?=;))/i],[[g,z]],[/((?:i[346]|x)86)[;\)]/i],[[g,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[g,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[g,"armhf"]],[/windows (ce|mobile); ppc;/i],[[g,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[g,/ower/,"",z]],[/(sun4\w)[;\)]/i],[[g,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[g,z]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[c,[p,N],[d,y]],[/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[c,[p,N],[d,v]],[/\((ip(?:hone|od)[\w ]*);/i],[c,[p,_],[d,v]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[c,[p,_],[d,y]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[c,[p,j],[d,y]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i],[c,[p,j],[d,v]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[c,/_/g," "],[p,D],[d,v]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[c,/_/g," "],[p,D],[d,y]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[c,[p,"OPPO"],[d,v]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[c,[p,"Vivo"],[d,v]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[c,[p,"Realme"],[d,v]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[c,[p,M],[d,v]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[c,[p,M],[d,y]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[c,[p,T],[d,y]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[c,[p,T],[d,v]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[c,[p,"Lenovo"],[d,y]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[c,/_/g," "],[p,"Nokia"],[d,v]],[/(pixel c)\b/i],[c,[p,C],[d,y]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[c,[p,C],[d,v]],[/droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[c,[p,R],[d,v]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[c,"Xperia Tablet"],[p,R],[d,y]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[c,[p,"OnePlus"],[d,v]],[/(alexa)webm/i,/(kf[a-z]{2}wi)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[c,[p,k],[d,y]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[c,/(.+)/g,"Fire Phone $1"],[p,k],[d,v]],[/(playbook);[-\w\),; ]+(rim)/i],[c,p,[d,y]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[c,[p,O],[d,v]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[c,[p,S],[d,y]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[c,[p,S],[d,v]],[/(nexus 9)/i],[c,[p,"HTC"],[d,y]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i],[p,[c,/_/g," "],[d,v]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[c,[p,"Acer"],[d,y]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[c,[p,"Meizu"],[d,v]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[c,[p,"Sharp"],[d,v]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[p,c,[d,v]],[/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[p,c,[d,y]],[/(surface duo)/i],[c,[p,P],[d,y]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[c,[p,"Fairphone"],[d,v]],[/(u304aa)/i],[c,[p,"AT&T"],[d,v]],[/\bsie-(\w*)/i],[c,[p,"Siemens"],[d,v]],[/\b(rct\w+) b/i],[c,[p,"RCA"],[d,y]],[/\b(venue[\d ]{2,7}) b/i],[c,[p,"Dell"],[d,y]],[/\b(q(?:mv|ta)\w+) b/i],[c,[p,"Verizon"],[d,y]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[c,[p,"Barnes & Noble"],[d,y]],[/\b(tm\d{3}\w+) b/i],[c,[p,"NuVision"],[d,y]],[/\b(k88) b/i],[c,[p,"ZTE"],[d,y]],[/\b(nx\d{3}j) b/i],[c,[p,"ZTE"],[d,v]],[/\b(gen\d{3}) b.+49h/i],[c,[p,"Swiss"],[d,v]],[/\b(zur\d{3}) b/i],[c,[p,"Swiss"],[d,y]],[/\b((zeki)?tb.*\b) b/i],[c,[p,"Zeki"],[d,y]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[p,"Dragon Touch"],c,[d,y]],[/\b(ns-?\w{0,9}) b/i],[c,[p,"Insignia"],[d,y]],[/\b((nxa|next)-?\w{0,9}) b/i],[c,[p,"NextBook"],[d,y]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[p,"Voice"],c,[d,v]],[/\b(lvtel\-)?(v1[12]) b/i],[[p,"LvTel"],c,[d,v]],[/\b(ph-1) /i],[c,[p,"Essential"],[d,v]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[c,[p,"Envizen"],[d,y]],[/\b(trio[-\w\. ]+) b/i],[c,[p,"MachSpeed"],[d,y]],[/\btu_(1491) b/i],[c,[p,"Rotor"],[d,y]],[/(shield[\w ]+) b/i],[c,[p,"Nvidia"],[d,y]],[/(sprint) (\w+)/i],[p,c,[d,v]],[/(kin\.[onetw]{3})/i],[[c,/\./g," "],[p,P],[d,v]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[c,[p,$],[d,y]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[c,[p,$],[d,v]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[p,c,[d,m]],[/droid.+; (shield) bui/i],[c,[p,"Nvidia"],[d,m]],[/(playstation [345portablevi]+)/i],[c,[p,R],[d,m]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[c,[p,P],[d,m]],[/smart-tv.+(samsung)/i],[p,[d,b]],[/hbbtv.+maple;(\d+)/i],[[c,/^/,"SmartTV"],[p,N],[d,b]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[p,T],[d,b]],[/(apple) ?tv/i],[p,[c,"Apple TV"],[d,b]],[/crkey/i],[[c,"Chromecast"],[p,C],[d,b]],[/droid.+aft(\w)( bui|\))/i],[c,[p,k],[d,b]],[/\(dtv[\);].+(aquos)/i],[c,[p,"Sharp"],[d,b]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i],[[p,B],[c,B],[d,b]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[d,b]],[/((pebble))app/i],[p,c,[d,w]],[/droid.+; (glass) \d/i],[c,[p,C],[d,w]],[/droid.+; (wt63?0{2,3})\)/i],[c,[p,$],[d,w]],[/(quest( 2)?)/i],[c,[p,F],[d,w]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[p,[d,x]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[c,[d,v]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[c,[d,y]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[d,y]],[/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i],[[d,v]],[/(android[-\w\. ]{0,9});.+buil/i],[c,[p,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[h,[f,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[h,[f,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i],[f,h],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[h,f]],os:[[/microsoft (windows) (vista|xp)/i],[f,h],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[f,[h,V,H]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[f,"Windows"],[h,V,H]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i],[[h,/_/g,"."],[f,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[f,"Mac OS"],[h,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86)/i],[h,f],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[f,h],[/\(bb(10);/i],[h,[f,O]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[h,[f,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[h,[f,"Firefox OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[h,[f,"webOS"]],[/crkey\/([\d\.]+)/i],[h,[f,"Chromecast"]],[/(cros) [\w]+ ([\w\.]+\w)/i],[[f,"Chromium OS"],h],[/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[f,h],[/(sunos) ?([\w\.\d]*)/i],[[f,"Solaris"],h],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,/(unix) ?([\w\.]*)/i],[f,h]]},q=function(e,t){if(typeof e===l&&(t=e,e=i),!(this instanceof q))return new q(e,t).getResult();var n=e||(typeof o!==s&&o.navigator&&o.navigator.userAgent?o.navigator.userAgent:""),r=t?function(e,t){var n={};for(var r in e)t[r]&&t[r].length%2==0?n[r]=t[r].concat(e[r]):n[r]=e[r];return n}(W,t):W;return this.getBrowser=function(){var e,t={};return t.name=i,t.version=i,U.call(t,n,r.browser),t.major=typeof(e=t.version)===u?e.replace(/[^\d\.]/g,"").split(".")[0]:i,t},this.getCPU=function(){var e={};return e.architecture=i,U.call(e,n,r.cpu),e},this.getDevice=function(){var e={};return e.vendor=i,e.model=i,e.type=i,U.call(e,n,r.device),e},this.getEngine=function(){var e={};return e.name=i,e.version=i,U.call(e,n,r.engine),e},this.getOS=function(){var e={};return e.name=i,e.version=i,U.call(e,n,r.os),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(e){return n=typeof e===u&&e.length>255?B(e,255):e,this},this.setUA(n),this};q.VERSION="1.0.2",q.BROWSER=A([f,h,"major"]),q.CPU=A([g]),q.DEVICE=A([c,p,d,m,v,b,y,w,x]),q.ENGINE=q.OS=A([f,h]),typeof t!==s?(e.exports&&(t=e.exports=q),t.UAParser=q):n.amdO?(r=function(){return q}.call(t,n,t,e))===i||(e.exports=r):typeof o!==s&&(o.UAParser=q);var Y=typeof o!==s&&(o.jQuery||o.Zepto);if(Y&&!Y.ua){var G=new q;Y.ua=G.getResult(),Y.ua.get=function(){return G.getUA()},Y.ua.set=function(e){G.setUA(e);var t=G.getResult();for(var n in t)Y.ua[n]=t[n]}}}("object"==typeof window?window:this)},462:(e,t,n)=>{"use strict";function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r.apply(this,arguments)}n.d(t,{Z:()=>r})},563:(e,t,n)=>{"use strict";n.d(t,{Ab:()=>a,Fr:()=>s,G$:()=>i,K$:()=>u,MS:()=>r,h5:()=>l,lK:()=>c,uj:()=>o});var r="-ms-",o="-moz-",i="-webkit-",a="comm",s="rule",l="decl",u="@import",c="@keyframes"},160:(e,t,n)=>{"use strict";n.d(t,{Ji:()=>c,cD:()=>u,qR:()=>l});var r=n(563),o=n(686),i=n(411),a=n(211),s=n(327);function l(e){var t=(0,o.Ei)(e);return function(n,r,o,i){for(var a="",s=0;s<t;s++)a+=e[s](n,r,o,i)||"";return a}}function u(e){return function(t){t.root||(t=t.return)&&e(t)}}function c(e,t,n,l){if(e.length>-1&&!e.return)switch(e.type){case r.h5:e.return=(0,s.O)(e.value,e.length);break;case r.lK:return(0,a.q)([(0,i.JG)(e,{value:(0,o.gx)(e.value,"@","@"+r.G$)})],l);case r.Fr:if(e.length)return(0,o.$e)(e.props,(function(t){switch((0,o.EQ)(t,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return(0,a.q)([(0,i.JG)(e,{props:[(0,o.gx)(t,/:(read-\w+)/,":"+r.uj+"$1")]})],l);case"::placeholder":return(0,a.q)([(0,i.JG)(e,{props:[(0,o.gx)(t,/:(plac\w+)/,":"+r.G$+"input-$1")]}),(0,i.JG)(e,{props:[(0,o.gx)(t,/:(plac\w+)/,":"+r.uj+"$1")]}),(0,i.JG)(e,{props:[(0,o.gx)(t,/:(plac\w+)/,r.MS+"input-$1")]})],l)}return""}))}}},190:(e,t,n)=>{"use strict";n.d(t,{MY:()=>a});var r=n(563),o=n(686),i=n(411);function a(e){return(0,i.cE)(s("",null,null,null,[""],e=(0,i.un)(e),0,[0],e))}function s(e,t,n,r,a,f,d,p,h){for(var g=0,m=0,v=d,y=0,b=0,w=0,x=1,k=1,_=1,S=0,O="",E=a,C=f,j=r,T=O;k;)switch(w=S,S=(0,i.lp)()){case 40:if(108!=w&&58==T.charCodeAt(v-1)){-1!=(0,o.Cw)(T+=(0,o.gx)((0,i.iF)(S),"&","&\f"),"&\f")&&(_=-1);break}case 34:case 39:case 91:T+=(0,i.iF)(S);break;case 9:case 10:case 13:case 32:T+=(0,i.Qb)(w);break;case 92:T+=(0,i.kq)((0,i.Ud)()-1,7);continue;case 47:switch((0,i.fj)()){case 42:case 47:(0,o.R3)(u((0,i.q6)((0,i.lp)(),(0,i.Ud)()),t,n),h);break;default:T+="/"}break;case 123*x:p[g++]=(0,o.to)(T)*_;case 125*x:case 59:case 0:switch(S){case 0:case 125:k=0;case 59+m:b>0&&(0,o.to)(T)-v&&(0,o.R3)(b>32?c(T+";",r,n,v-1):c((0,o.gx)(T," ","")+";",r,n,v-2),h);break;case 59:T+=";";default:if((0,o.R3)(j=l(T,t,n,g,m,a,p,O,E=[],C=[],v),f),123===S)if(0===m)s(T,t,j,j,E,f,v,p,C);else switch(y){case 100:case 109:case 115:s(e,j,j,r&&(0,o.R3)(l(e,j,j,0,0,a,p,O,a,E=[],v),C),a,C,v,p,r?E:C);break;default:s(T,j,j,j,[""],C,0,p,C)}}g=m=b=0,x=_=1,O=T="",v=d;break;case 58:v=1+(0,o.to)(T),b=w;default:if(x<1)if(123==S)--x;else if(125==S&&0==x++&&125==(0,i.mp)())continue;switch(T+=(0,o.Dp)(S),S*x){case 38:_=m>0?1:(T+="\f",-1);break;case 44:p[g++]=((0,o.to)(T)-1)*_,_=1;break;case 64:45===(0,i.fj)()&&(T+=(0,i.iF)((0,i.lp)())),y=(0,i.fj)(),m=v=(0,o.to)(O=T+=(0,i.QU)((0,i.Ud)())),S++;break;case 45:45===w&&2==(0,o.to)(T)&&(x=0)}}return f}function l(e,t,n,a,s,l,u,c,f,d,p){for(var h=s-1,g=0===s?l:[""],m=(0,o.Ei)(g),v=0,y=0,b=0;v<a;++v)for(var w=0,x=(0,o.tb)(e,h+1,h=(0,o.Wn)(y=u[v])),k=e;w<m;++w)(k=(0,o.fy)(y>0?g[w]+" "+x:(0,o.gx)(x,/&\f/g,g[w])))&&(f[b++]=k);return(0,i.dH)(e,t,n,0===s?r.Fr:c,f,d,p)}function u(e,t,n){return(0,i.dH)(e,t,n,r.Ab,(0,o.Dp)((0,i.Tb)()),(0,o.tb)(e,2,-2),0)}function c(e,t,n,a){return(0,i.dH)(e,t,n,r.h5,(0,o.tb)(e,0,a),(0,o.tb)(e,a+1,-1),a)}},327:(e,t,n)=>{"use strict";n.d(t,{O:()=>i});var r=n(563),o=n(686);function i(e,t){switch((0,o.vp)(e,t)){case 5103:return r.G$+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return r.G$+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return r.G$+e+r.uj+e+r.MS+e+e;case 6828:case 4268:return r.G$+e+r.MS+e+e;case 6165:return r.G$+e+r.MS+"flex-"+e+e;case 5187:return r.G$+e+(0,o.gx)(e,/(\w+).+(:[^]+)/,r.G$+"box-$1$2"+r.MS+"flex-$1$2")+e;case 5443:return r.G$+e+r.MS+"flex-item-"+(0,o.gx)(e,/flex-|-self/,"")+e;case 4675:return r.G$+e+r.MS+"flex-line-pack"+(0,o.gx)(e,/align-content|flex-|-self/,"")+e;case 5548:return r.G$+e+r.MS+(0,o.gx)(e,"shrink","negative")+e;case 5292:return r.G$+e+r.MS+(0,o.gx)(e,"basis","preferred-size")+e;case 6060:return r.G$+"box-"+(0,o.gx)(e,"-grow","")+r.G$+e+r.MS+(0,o.gx)(e,"grow","positive")+e;case 4554:return r.G$+(0,o.gx)(e,/([^-])(transform)/g,"$1"+r.G$+"$2")+e;case 6187:return(0,o.gx)((0,o.gx)((0,o.gx)(e,/(zoom-|grab)/,r.G$+"$1"),/(image-set)/,r.G$+"$1"),e,"")+e;case 5495:case 3959:return(0,o.gx)(e,/(image-set\([^]*)/,r.G$+"$1$`$1");case 4968:return(0,o.gx)((0,o.gx)(e,/(.+:)(flex-)?(.*)/,r.G$+"box-pack:$3"+r.MS+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+r.G$+e+e;case 4095:case 3583:case 4068:case 2532:return(0,o.gx)(e,/(.+)-inline(.+)/,r.G$+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if((0,o.to)(e)-1-t>6)switch((0,o.uO)(e,t+1)){case 109:if(45!==(0,o.uO)(e,t+4))break;case 102:return(0,o.gx)(e,/(.+:)(.+)-([^]+)/,"$1"+r.G$+"$2-$3$1"+r.uj+(108==(0,o.uO)(e,t+3)?"$3":"$2-$3"))+e;case 115:return~(0,o.Cw)(e,"stretch")?i((0,o.gx)(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==(0,o.uO)(e,t+1))break;case 6444:switch((0,o.uO)(e,(0,o.to)(e)-3-(~(0,o.Cw)(e,"!important")&&10))){case 107:return(0,o.gx)(e,":",":"+r.G$)+e;case 101:return(0,o.gx)(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+r.G$+(45===(0,o.uO)(e,14)?"inline-":"")+"box$3$1"+r.G$+"$2$3$1"+r.MS+"$2box$3")+e}break;case 5936:switch((0,o.uO)(e,t+11)){case 114:return r.G$+e+r.MS+(0,o.gx)(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return r.G$+e+r.MS+(0,o.gx)(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return r.G$+e+r.MS+(0,o.gx)(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return r.G$+e+r.MS+e+e}return e}},211:(e,t,n)=>{"use strict";n.d(t,{P:()=>a,q:()=>i});var r=n(563),o=n(686);function i(e,t){for(var n="",r=(0,o.Ei)(e),i=0;i<r;i++)n+=t(e[i],i,e,t)||"";return n}function a(e,t,n,a){switch(e.type){case r.K$:case r.h5:return e.return=e.return||e.value;case r.Ab:return"";case r.lK:return e.return=e.value+"{"+i(e.children,a)+"}";case r.Fr:e.value=e.props.join(",")}return(0,o.to)(n=i(e.children,a))?e.return=e.value+"{"+n+"}":""}},411:(e,t,n)=>{"use strict";n.d(t,{FK:()=>s,JG:()=>f,QU:()=>E,Qb:()=>k,Tb:()=>d,Ud:()=>m,cE:()=>w,dH:()=>c,fj:()=>g,iF:()=>x,kq:()=>_,lp:()=>h,mp:()=>p,q6:()=>O,r:()=>y,tP:()=>v,un:()=>b});var r=n(686),o=1,i=1,a=0,s=0,l=0,u="";function c(e,t,n,r,a,s,l){return{value:e,root:t,parent:n,type:r,props:a,children:s,line:o,column:i,length:l,return:""}}function f(e,t){return(0,r.f0)(c("",null,null,"",null,null,0),e,{length:-e.length},t)}function d(){return l}function p(){return l=s>0?(0,r.uO)(u,--s):0,i--,10===l&&(i=1,o--),l}function h(){return l=s<a?(0,r.uO)(u,s++):0,i++,10===l&&(i=1,o++),l}function g(){return(0,r.uO)(u,s)}function m(){return s}function v(e,t){return(0,r.tb)(u,e,t)}function y(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function b(e){return o=i=1,a=(0,r.to)(u=e),s=0,[]}function w(e){return u="",e}function x(e){return(0,r.fy)(v(s-1,S(91===e?e+2:40===e?e+1:e)))}function k(e){for(;(l=g())&&l<33;)h();return y(e)>2||y(l)>3?"":" "}function _(e,t){for(;--t&&h()&&!(l<48||l>102||l>57&&l<65||l>70&&l<97););return v(e,m()+(t<6&&32==g()&&32==h()))}function S(e){for(;h();)switch(l){case e:return s;case 34:case 39:34!==e&&39!==e&&S(l);break;case 40:41===e&&S(e);break;case 92:h()}return s}function O(e,t){for(;h()&&e+l!==57&&(e+l!==84||47!==g()););return"/*"+v(t,s-1)+"*"+(0,r.Dp)(47===e?e:h())}function E(e){for(;!y(g());)h();return v(e,s)}},686:(e,t,n)=>{"use strict";n.d(t,{$e:()=>m,Cw:()=>c,Dp:()=>o,EQ:()=>l,Ei:()=>h,R3:()=>g,Wn:()=>r,f0:()=>i,fy:()=>s,gx:()=>u,tb:()=>d,to:()=>p,uO:()=>f,vp:()=>a});var r=Math.abs,o=String.fromCharCode,i=Object.assign;function a(e,t){return(((t<<2^f(e,0))<<2^f(e,1))<<2^f(e,2))<<2^f(e,3)}function s(e){return e.trim()}function l(e,t){return(e=t.exec(e))?e[0]:e}function u(e,t,n){return e.replace(t,n)}function c(e,t){return e.indexOf(t)}function f(e,t){return 0|e.charCodeAt(t)}function d(e,t,n){return e.slice(t,n)}function p(e){return e.length}function h(e){return e.length}function g(e,t){return t.push(e),e}function m(e,t){return e.map(t).join("")}}},r={};function o(e){var t=r[e];if(void 0!==t)return t.exports;var i=r[e]={exports:{}};return n[e].call(i.exports,i,i.exports,o),i.exports}o.amdO={},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(n,r){if(1&r&&(n=this(n)),8&r)return n;if("object"==typeof n&&n){if(4&r&&n.__esModule)return n;if(16&r&&"function"==typeof n.then)return n}var i=Object.create(null);o.r(i);var a={};e=e||[null,t({}),t([]),t(t)];for(var s=2&r&&n;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>a[e]=()=>n[e]));return a.default=()=>n,o.d(i,a),i},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";var e=o(893),t=o(60),n=o(294),r=o.t(n,2);const i=e=>{const t=(0,n.useRef)();return(0,n.useEffect)((()=>{t.current=e}),[e]),t.current},a="get_storage",s="send_storage",l="save_storage",u="ninjaRollover",c="persist:settings",f="persist:gdpr",d="Safari",p=[3,10,25,50],h={type:"instagram",media:{type:"img",src:"img/instagram-push.jpg"},title:"@fontsninja",description:"Follow us on Instagram to get more font inspiration!",customButton:{text:"Follow us",link:"https://www.instagram.com/fontsninja/"}},g=[20,40,60],m={chrome:"https://chromewebstore.google.com/detail/fonts-ninja/eljapbgkmlngdpckoiiibecpemleclhh/reviews",safari:"https://apps.apple.com/fr/app/fonts-ninja/id1480227114",firefox:"https://addons.mozilla.org/en-US/firefox/addon/fonts-ninja/",edge:"https://microsoftedge.microsoft.com/addons/detail/fonts-ninja/fmpleflnbilhgcdbccmjahkmbcfcmjpi"},v={type:"store",media:{type:"img",src:"img/store-push.png"},title:"Bring the love",description:"Enjoying Fonts Ninja? Leave us a review, it means the world! ❤️",customButton:{text:"Send love",link:m.chrome}},y=.7,b=e=>0===Object.keys(e).length,w=(e,t=!1)=>("#"+e.replace(/^rgba?\(|\s+|\)$/g,"").split(",").filter(((e,n)=>!t||3!==n)).map((e=>parseFloat(e))).map(((e,t)=>3===t?Math.round(255*e):e)).map((e=>e.toString(16))).map((e=>1===e.length?"0"+e:e)).join("")).toUpperCase(),x=e=>{if(null===e.offsetParent||"hidden"===window.getComputedStyle(e).visibility||"none"===window.getComputedStyle(e).display)return!1;const t=e.getBoundingClientRect(),n=window.innerHeight||document.documentElement.clientHeight,r=window.innerWidth||document.documentElement.clientWidth;return t.top>=0&&t.left>=0&&t.bottom<=n&&t.right<=r},k=e=>{const t=window.getComputedStyle(e),n={};for(let e=0;e<t.length;e++){const r=t.item(e);n[r.replace(/-(.)/g,(([,e])=>e.toUpperCase()))]=t[r]}return n},_=e=>{let t="https://fonts.ninja";return e&&(t+=`?machineId=${e}`),t},S=(e,t,n,r)=>{let o=`https://fonts.ninja${e.url}?extension`;if(t&&(o+=`&idRequest=${t}`),n&&(o+=`&machineId=${n}`),e.idFontVersion&&(o+=`&idFontVersion=${e.idFontVersion}`),r){o+=`&color=${encodeURIComponent(JSON.stringify(r))}`}return o},O=(e,t=!1)=>{let n="https://fonts.ninja/about-us";const r=new URLSearchParams;e&&(r.append(e,e),n+=`?machineId=${e}`),t&&r.append("contact-us","");const o=r.toString().replace(/=/g,"");return o?`${n}?${o}`:n},E=()=>"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||window.matchMedia("(pointer: coarse)").matches,C={isOpen:!0,extensionPath:null,openSettings:!1,setOpenSettings:e=>null,openIframe:null,setOpenIframe:e=>null,openTutorial:!1,setOpenTutorial:e=>null},j=(0,n.createContext)(C),T=()=>(0,n.useContext)(j),P=({extensionPath:t,children:r})=>{C.extensionPath=t;const o=(e=>{const[t,r]=(0,n.useState)(e.isOpen),[o]=(0,n.useState)(e.extensionPath),[i,a]=(0,n.useState)(e.openSettings),[s,l]=(0,n.useState)(e.openIframe),[u,c]=(0,n.useState)(e.openTutorial),f=(0,n.useCallback)((e=>{const t=JSON.parse(e.detail);r(t.isOpen)}),[]);return(0,n.useEffect)((()=>(document.addEventListener("fontsninja-ext-opened",f),()=>{document.removeEventListener("fontsninja-ext-opened",f)})),[f]),{isOpen:t,extensionPath:o,openSettings:i,setOpenSettings:a,openIframe:s,setOpenIframe:l,openTutorial:u,setOpenTutorial:c}})(C);return(0,e.jsx)(j.Provider,Object.assign({value:o},{children:r}))};var M=o(238);const{os:L,browser:N}=(0,M.UAParser)(),R={os:L,browser:N,theme:"auto",darkMode:!1,instaSeen:!1,instaForce:!1,storeSeen:!1,storeForce:!1,customPushForce:!1,hideAppInstall:!1,hideFeedback:!1,iconIndex:1,launchCount:0,storeCounter:0,displayTutorialV8:!1,completeTutorialV8:!1},D={settingsReady:!1,checkedDisplayPush:!1,machineId:null,settings:R,setSettings:e=>null,updateSettingsElement:(e,t,n)=>null,updateTheme:e=>null},$=(0,n.createContext)(D),F=()=>(0,n.useContext)($),A=({children:t})=>{const r=(e=>{const t=(0,n.useRef)(!1),r=(0,n.useRef)(e),o=(0,n.useRef)(!1),i=(0,n.useRef)(e.theme),[u,f]=(0,n.useState)(!1),[d,h]=(0,n.useState)(!1),[m,v]=(0,n.useState)(null),[y,b]=(0,n.useState)(e),w=(0,n.useCallback)((()=>{window.addEventListener("message",(({data:e})=>{e&&"send_machine_id"===e.type&&v(e.machineId)})),window.postMessage({type:"get_machine_id",key:"persist:auth"})}),[]),x=(0,n.useCallback)((()=>{window.addEventListener("message",(({data:e})=>{if(e&&e.type===s){const t=e.storage;if(t){const e=Object.assign({},y);for(const n of Object.keys(t))n in e&&(e[n]=t[n]);e.darkMode=j(e.theme),b(e),r.current=e,i.current=e.theme}else y.darkMode=j(y.theme);f(!0)}})),window.postMessage({type:a,key:c})}),[y]),k=(0,n.useCallback)(((e,t,n=!0)=>{const o=Object.assign({},r.current);o[e]=t,r.current=o,b(o),n&&window.postMessage({type:l,key:c,attributes:[e],values:[t]})}),[]),_=(0,n.useCallback)((e=>{const t=Object.assign({},r.current);t.theme=e,t.darkMode=j(t.theme),b(t),r.current=t,i.current=t.theme,window.postMessage({type:l,key:c,attributes:["theme","darkMode"],values:[t.theme,t.darkMode]})}),[]),S=(0,n.useCallback)((()=>{p.includes(y.launchCount)&&!y.instaSeen&&(y.instaForce=!0),h(!0)}),[y]),O=(0,n.useCallback)((()=>{g.includes(y.storeCounter)&&!y.storeSeen&&(y.storeForce=!0,!0===y.instaForce&&(y.instaForce=!1),h(!0))}),[y]),E=(0,n.useCallback)((()=>{y.displayTutorialV8||y.completeTutorialV8||(y.displayTutorialV8=!0)}),[y]),C=(0,n.useCallback)((()=>{o.current=!0,y.launchCount+=1,y.storeCounter+=1,S(),O(),E(),window.postMessage({type:l,key:c,attributes:["launchCount","storeCounter"],values:[y.launchCount,y.storeCounter]})}),[E,S,O,y]),j=e=>{switch(e){case"auto":return!!window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;case"light":return!1;case"dark":return!0}};return(0,n.useEffect)((()=>{u&&!o.current&&C()}),[C,u]),(0,n.useEffect)((()=>(t.current=!0,()=>{t.current=!1})),[]),t.current||(w(),x(),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>{"auto"===i.current&&k("darkMode",e.matches)}))),{settingsReady:u,checkedDisplayPush:d,machineId:m,settings:y,setSettings:b,updateSettingsElement:k,updateTheme:_}})(R);return(0,e.jsx)($.Provider,Object.assign({value:r},{children:t}))},I={idRequest:null,fontFamilies:{},fontFamiliesToDisplay:{},selectedFontFamily:null,setSelectedFontFamily:e=>null,hoverSubFontFamily:null,setHoverSubFontFamily:e=>null},z=(0,n.createContext)(I),B=()=>(0,n.useContext)(z),U=({children:t})=>{const r=(e=>{const t=(0,n.useRef)(!1),[r,o]=(0,n.useState)(null),[i,a]=(0,n.useState)(e),[s,l]=(0,n.useState)(e),[u,c]=(0,n.useState)(null),[f,d]=(0,n.useState)(null),p=(0,n.useCallback)((({data:e})=>{"ninjaProcessResults"===e.type&&(o(e.idRequest),a(e.results),h(e.results))}),[]),h=e=>{const t={};Object.keys(e).forEach((n=>{"local"!==e[n][0].detectionMode&&(t[n]=e[n])})),b(t)?l(e):l(t)};return(0,n.useEffect)((()=>(window.addEventListener("message",p),window.postMessage({type:"inject_fonts_ninja_helpers"}),t.current=!0,()=>{window.removeEventListener("message",p),t.current=!1})),[p]),{idRequest:r,fontFamilies:i,fontFamiliesToDisplay:s,selectedFontFamily:u,setSelectedFontFamily:c,hoverSubFontFamily:f,setHoverSubFontFamily:d}})(I.fontFamilies);return(0,e.jsx)(z.Provider,Object.assign({value:r},{children:t}))},V={dragStatus:null,setDragStatus:e=>null,pushMediaReady:!1,setPushMediaReady:e=>null,transitionPushToFonts:!1,setTransitionPushToFonts:e=>null},H=(0,n.createContext)(V),W=()=>(0,n.useContext)(H),q=({children:t})=>{const r=(e=>{const[t,r]=(0,n.useState)(e.dragStatus),[o,i]=(0,n.useState)(e.pushMediaReady),[a,s]=(0,n.useState)(e.pushMediaReady);return{dragStatus:t,setDragStatus:r,pushMediaReady:o,setPushMediaReady:i,transitionPushToFonts:a,setTransitionPushToFonts:s}})(V);return(0,e.jsx)(H.Provider,Object.assign({value:r},{children:t}))};var Y=o(917);const G="#000000",X="#000000",K="#FFFFFF",Q="#F7F6F6",Z="#181818",J="#FFFFFF",ee="#2C2C2E",te="#12121250",ne="#121212",re="#FEFEFE",oe="#EE585A",ie="#EE585A",ae="#8E8E93",se="#636366",le="#FEFEFE",ue="#FEFEFE",ce="#121212",fe="#F4F4EF",de="#EE585A",pe="#EE585A",he="#DC5153",ge="#DC5153",me="#F1F1F1",ve="#636366",ye="#D7D7DB",be="#8E8E93",we="#F0090C",xe="#F0090C",ke="#FF5052",_e="#FF5052",Se="#8E8E93",Oe="#FEFEFE",Ee="#D7D7DB",Ce="#636366",je="#48484a29",Te=({extensionPath:t})=>{const n=Y.css`
    .fontsninja-ext-blocker {
      pointer-events: none !important;
      * {
        pointer-events: none !important;
      }
    }

    .fontsninja-font {
      pointer-events: auto !important;
      &::before,
      &::after {
        pointer-events: none !important;
      }
    }

    .fontsninja-tooltip-hover {
      pointer-events: auto !important;
      &:hover {
        text-decoration: underline !important;
      }
    }
    .fontsninja-tooltip-hover-light {
      cursor: ${`url(${t}img/cursor-tooltip-light-1x.png), auto`};
      cursor: ${`-webkit-image-set(url(${t}img/cursor-tooltip-light-1x.png) 1x, url(${t}img/cursor-tooltip-light-2x.png) 2x), auto`};
    }
    .fontsninja-tooltip-hover-dark {
      cursor: ${`url(${t}img/cursor-tooltip-dark-1x.png), auto`};
      cursor: ${`-webkit-image-set(url(${t}img/cursor-tooltip-dark-1x.png) 1x, url(${t}img/cursor-tooltip-dark-2x.png) 2x), auto`};
    }
    .fontsninja-tooltip-hover-locked-light {
      cursor: ${`url(${t}img/cursor-tooltip-locked-light-1x.png), auto`};
      cursor: ${`-webkit-image-set(url(${t}img/cursor-tooltip-locked-light-1x.png) 1x, url(${t}img/cursor-tooltip-locked-light-2x.png) 2x), auto`};
    }
    .fontsninja-tooltip-hover-locked-dark {
      cursor: ${`url(${t}img/cursor-tooltip-dark-1x.png), auto`};
      cursor: ${`-webkit-image-set(url(${t}img/cursor-tooltip-locked-dark-1x.png) 1x, url(${t}img/cursor-tooltip-locked-dark-2x.png) 2x), auto`};
    }

    .fontsninja-family-hover > fontsninja-text {
      background-size: 7px 2px, 7px 2px, 2px 7px, 2px 7px;
      background-position: 0 0, 0 100%, 0 0, 100% 0;
      background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
      background-image: linear-gradient(to right, ${K} 50%, ${G} 50%),
        linear-gradient(to right, ${K} 50%, ${G} 50%),
        linear-gradient(to bottom, ${K} 50%, ${G} 50%),
        linear-gradient(to bottom, ${K} 50%, ${G} 50%);
      animation: fontsninja-hover-animation 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-play-state: running;
    }

    @keyframes fontsninja-hover-animation {
      0% {
        background-position: 0 0, 0 100%, 0 0, 100% 0;
      }
      100% {
        background-position: 14px 0, -14px 100%, 0 -14px, 100% 14px;
      }
    }

    #fonts-ninja-ext {
      all: initial;
      direction: ltr !important;
      font-variant-numeric: normal !important;
      font-feature-settings: normal !important;

      div:empty {
        display: block !important;
      }
    }

    fontsninja-text:not(:defined) {
      color: inherit; /* Inherit color from the surrounding text */
      font-family: inherit; /* Prevent changes to font-family */
      display: inline; /* Ensure inline behavior */
      visibility: visible; /* Ensure text is visible */
    }
  `;return(0,e.jsx)(Y.Global,{styles:n})};var Pe=o(918),Me=o(462),Le=o(866),Ne=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;const Re=(0,Le.Z)((function(e){return Ne.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91}));var De=o(880),$e=o(444),Fe=o(302),Ae=Re,Ie=function(e){return"theme"!==e},ze=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?Ae:Ie},Be=function(e,t,n){var r;if(t){var o=t.shouldForwardProp;r=e.__emotion_forwardProp&&o?function(t){return e.__emotion_forwardProp(t)&&o(t)}:o}return"function"!=typeof r&&n&&(r=e.__emotion_forwardProp),r},Ue=r.useInsertionEffect?r.useInsertionEffect:function(e){e()};var Ve=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;(0,$e.hC)(t,n,r);Ue((function(){return(0,$e.My)(t,n,r)}));return null};const He=function e(t,r){var o,i,a=t.__emotion_real===t,s=a&&t.__emotion_base||t;void 0!==r&&(o=r.label,i=r.target);var l=Be(t,r,a),u=l||ze(s),c=!u("as");return function(){var f=arguments,d=a&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==o&&d.push("label:"+o+";"),null==f[0]||void 0===f[0].raw)d.push.apply(d,f);else{0,d.push(f[0][0]);for(var p=f.length,h=1;h<p;h++)d.push(f[h],f[0][h])}var g=(0,De.w)((function(e,t,r){var o=c&&e.as||s,a="",f=[],p=e;if(null==e.theme){for(var h in p={},e)p[h]=e[h];p.theme=(0,n.useContext)(De.T)}"string"==typeof e.className?a=(0,$e.fp)(t.registered,f,e.className):null!=e.className&&(a=e.className+" ");var g=(0,Fe.O)(d.concat(f),t.registered,p);a+=t.key+"-"+g.name,void 0!==i&&(a+=" "+i);var m=c&&void 0===l?ze(o):u,v={};for(var y in e)c&&"as"===y||m(y)&&(v[y]=e[y]);return v.className=a,v.ref=r,(0,n.createElement)(n.Fragment,null,(0,n.createElement)(Ve,{cache:t,serialized:g,isStringTag:"string"==typeof o}),(0,n.createElement)(o,v))}));return g.displayName=void 0!==o?o:"Styled("+("string"==typeof s?s:s.displayName||s.name||"Component")+")",g.defaultProps=t.defaultProps,g.__emotion_real=g,g.__emotion_base=s,g.__emotion_styles=d,g.__emotion_forwardProp=l,Object.defineProperty(g,"toString",{value:function(){return"."+i}}),g.withComponent=function(t,n){return e(t,(0,Me.Z)({},r,n,{shouldForwardProp:Be(g,n,!0)})).apply(void 0,d)},g}};var We=He.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){We[e]=We(e)}));const qe=We,Ye=({children:t,extensionPath:n})=>{const r=qe(Pe.Z.div)`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @font-face {
      font-family: 'FontsNinja-Aeonik';
      src: ${`url(${n}fonts/AeonikVF.woff2) format('woff2')`};
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'FontsNinja-Aeonik';
      src: ${`url(${n}fonts/AeonikVF-Italic.woff2) format('woff2')`};
      font-style: italic;
      font-display: swap;
    }

    @font-face {
      font-family: 'FontsNinja-Icons';
      src: ${`url(${n}fonts/FontsNinjaV3-Icons.woff) format('woff')`};
      font-weight: normal;
      font-style: normal;
      font-display: block;
    }
  `;return(0,e.jsx)(r,{children:t})};var Ge=o(193),Xe=o.n(Ge);function Ke(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Qe(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}
/*!
 * GSAP 3.10.4
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ze,Je,et,tt,nt,rt,ot,it,at,st,lt,ut,ct,ft,dt,pt,ht,gt,mt,vt,yt,bt,wt,xt,kt={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},_t={duration:.5,overwrite:!1,delay:0},St=1e8,Ot=1e-8,Et=2*Math.PI,Ct=Et/4,jt=0,Tt=Math.sqrt,Pt=Math.cos,Mt=Math.sin,Lt=function(e){return"string"==typeof e},Nt=function(e){return"function"==typeof e},Rt=function(e){return"number"==typeof e},Dt=function(e){return void 0===e},$t=function(e){return"object"==typeof e},Ft=function(e){return!1!==e},At=function(){return"undefined"!=typeof window},It=function(e){return Nt(e)||Lt(e)},zt="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},Bt=Array.isArray,Ut=/(?:-?\.?\d|\.)+/gi,Vt=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ht=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Wt=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,qt=/[+-]=-?[.\d]+/,Yt=/[^,'"\[\]\s]+/gi,Gt=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Xt={},Kt={},Qt=function(e){return(Kt=Sn(e,Xt))&&go},Zt=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Jt=function(e,t){return!t&&console.warn(e)},en=function(e,t){return e&&(Xt[e]=t)&&Kt&&(Kt[e]=t)||Xt},tn=function(){return 0},nn={},rn=[],on={},an={},sn={},ln=30,un=[],cn="",fn=function(e){var t,n,r=e[0];if($t(r)||Nt(r)||(e=[e]),!(t=(r._gsap||{}).harness)){for(n=un.length;n--&&!un[n].targetTest(r););t=un[n]}for(n=e.length;n--;)e[n]&&(e[n]._gsap||(e[n]._gsap=new Fr(e[n],t)))||e.splice(n,1);return e},dn=function(e){return e._gsap||fn(nr(e))[0]._gsap},pn=function(e,t,n){return(n=e[t])&&Nt(n)?e[t]():Dt(n)&&e.getAttribute&&e.getAttribute(t)||n},hn=function(e,t){return(e=e.split(",")).forEach(t)||e},gn=function(e){return Math.round(1e5*e)/1e5||0},mn=function(e){return Math.round(1e7*e)/1e7||0},vn=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),"+"===n?e+r:"-"===n?e-r:"*"===n?e*r:e/r},yn=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},bn=function(){var e,t,n=rn.length,r=rn.slice(0);for(on={},rn.length=0,e=0;e<n;e++)(t=r[e])&&t._lazy&&(t.render(t._lazy[0],t._lazy[1],!0)._lazy=0)},wn=function(e,t,n,r){rn.length&&bn(),e.render(t,n,r),rn.length&&bn()},xn=function(e){var t=parseFloat(e);return(t||0===t)&&(e+"").match(Yt).length<2?t:Lt(e)?e.trim():e},kn=function(e){return e},_n=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Sn=function(e,t){for(var n in t)e[n]=t[n];return e},On=function e(t,n){for(var r in n)"__proto__"!==r&&"constructor"!==r&&"prototype"!==r&&(t[r]=$t(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},En=function(e,t){var n,r={};for(n in e)n in t||(r[n]=e[n]);return r},Cn=function(e){var t,n=e.parent||Je,r=e.keyframes?(t=Bt(e.keyframes),function(e,n){for(var r in n)r in e||"duration"===r&&t||"ease"===r||(e[r]=n[r])}):_n;if(Ft(e.inherit))for(;n;)r(e,n.vars.defaults),n=n.parent||n._dp;return e},jn=function(e,t,n,r,o){void 0===n&&(n="_first"),void 0===r&&(r="_last");var i,a=e[r];if(o)for(i=t[o];a&&a[o]>i;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Tn=function(e,t,n,r){void 0===n&&(n="_first"),void 0===r&&(r="_last");var o=t._prev,i=t._next;o?o._next=i:e[n]===t&&(e[n]=i),i?i._prev=o:e[r]===t&&(e[r]=o),t._next=t._prev=t.parent=null},Pn=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove(e),e._act=0},Mn=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Ln=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Nn=function e(t){return!t||t._ts&&e(t.parent)},Rn=function(e){return e._repeat?Dn(e._tTime,e=e.duration()+e._rDelay)*e:0},Dn=function(e,t){var n=Math.floor(e/=t);return e&&n===e?n-1:n},$n=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Fn=function(e){return e._end=mn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Ot)||0))},An=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=mn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Fn(e),n._dirty||Mn(n,e)),e},In=function(e,t){var n;if((t._time||t._initted&&!t._dur)&&(n=$n(e.rawTime(),t),(!t._dur||Qn(0,t.totalDuration(),n)-t._tTime>Ot)&&t.render(n,!0)),Mn(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-1e-8}},zn=function(e,t,n,r){return t.parent&&Pn(t),t._start=mn((Rt(n)?n:n||e!==Je?Gn(e,n,t):e._time)+t._delay),t._end=mn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),jn(e,t,"_first","_last",e._sort?"_start":0),Hn(t)||(e._recent=t),r||In(e,t),e},Bn=function(e,t){return(Xt.ScrollTrigger||Zt("scrollTrigger",t))&&Xt.ScrollTrigger.create(t,e)},Un=function(e,t,n,r){return Wr(e,t),e._initted?!n&&e._pt&&(e._dur&&!1!==e.vars.lazy||!e._dur&&e.vars.lazy)&&ot!==Sr.frame?(rn.push(e),e._lazy=[t,r],1):void 0:1},Vn=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},Hn=function(e){var t=e.data;return"isFromStart"===t||"isStart"===t},Wn=function(e,t,n,r){var o=e._repeat,i=mn(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=i/e._dur),e._dur=i,e._tDur=o?o<0?1e10:mn(i*(o+1)+e._rDelay*o):i,a>0&&!r?An(e,e._tTime=e._tDur*a):e.parent&&Fn(e),n||Mn(e.parent,e),e},qn=function(e){return e instanceof Ir?Mn(e):Wn(e,e._dur)},Yn={_start:0,endTime:tn,totalDuration:tn},Gn=function e(t,n,r){var o,i,a,s=t.labels,l=t._recent||Yn,u=t.duration()>=St?l.endTime(!1):t._dur;return Lt(n)&&(isNaN(n)||n in s)?(i=n.charAt(0),a="%"===n.substr(-1),o=n.indexOf("="),"<"===i||">"===i?(o>=0&&(n=n.replace(/=/,"")),("<"===i?l._start:l.endTime(l._repeat>=0))+(parseFloat(n.substr(1))||0)*(a?(o<0?l:r).totalDuration()/100:1)):o<0?(n in s||(s[n]=u),s[n]):(i=parseFloat(n.charAt(o-1)+n.substr(o+1)),a&&r&&(i=i/100*(Bt(r)?r[0]:r).totalDuration()),o>1?e(t,n.substr(0,o-1),r)+i:u+i)):null==n?u:+n},Xn=function(e,t,n){var r,o,i=Rt(t[1]),a=(i?2:1)+(e<2?0:1),s=t[a];if(i&&(s.duration=t[1]),s.parent=n,e){for(r=s,o=n;o&&!("immediateRender"in r);)r=o.vars.defaults||{},o=Ft(o.vars.inherit)&&o.parent;s.immediateRender=Ft(r.immediateRender),e<2?s.runBackwards=1:s.startAt=t[a-1]}return new Kr(t[0],s,t[a+1])},Kn=function(e,t){return e||0===e?t(e):t},Qn=function(e,t,n){return n<e?e:n>t?t:n},Zn=function(e,t){return Lt(e)&&(t=Gt.exec(e))?t[1]:""},Jn=[].slice,er=function(e,t){return e&&$t(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&$t(e[0]))&&!e.nodeType&&e!==et},tr=function(e,t,n){return void 0===n&&(n=[]),e.forEach((function(e){var r;return Lt(e)&&!t||er(e,1)?(r=n).push.apply(r,nr(e)):n.push(e)}))||n},nr=function(e,t,n){return!Lt(e)||n||!tt&&Or()?Bt(e)?tr(e,n):er(e)?Jn.call(e,0):e?[e]:[]:Jn.call((t||nt).querySelectorAll(e),0)},rr=function(e){return e.sort((function(){return.5-Math.random()}))},or=function(e){if(Nt(e))return e;var t=$t(e)?e:{each:e},n=Lr(t.ease),r=t.from||0,o=parseFloat(t.base)||0,i={},a=r>0&&r<1,s=isNaN(r)||a,l=t.axis,u=r,c=r;return Lt(r)?u=c={center:.5,edges:.5,end:1}[r]||0:!a&&s&&(u=r[0],c=r[1]),function(e,a,f){var d,p,h,g,m,v,y,b,w,x=(f||t).length,k=i[x];if(!k){if(!(w="auto"===t.grid?0:(t.grid||[1,St])[1])){for(y=-St;y<(y=f[w++].getBoundingClientRect().left)&&w<x;);w--}for(k=i[x]=[],d=s?Math.min(w,x)*u-.5:r%w,p=w===St?0:s?x*c/w-.5:r/w|0,y=0,b=St,v=0;v<x;v++)h=v%w-d,g=p-(v/w|0),k[v]=m=l?Math.abs("y"===l?g:h):Tt(h*h+g*g),m>y&&(y=m),m<b&&(b=m);"random"===r&&rr(k),k.max=y-b,k.min=b,k.v=x=(parseFloat(t.amount)||parseFloat(t.each)*(w>x?x-1:l?"y"===l?x/w:w:Math.max(w,x/w))||0)*("edges"===r?-1:1),k.b=x<0?o-x:o,k.u=Zn(t.amount||t.each)||0,n=n&&x<0?Pr(n):n}return x=(k[e]-k.min)/k.max||0,mn(k.b+(n?n(x):x)*k.v)+k.u}},ir=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=Math.round(parseFloat(n)/e)*e*t;return(r-r%1)/t+(Rt(n)?0:Zn(n))}},ar=function(e,t){var n,r,o=Bt(e);return!o&&$t(e)&&(n=o=e.radius||St,e.values?(e=nr(e.values),(r=!Rt(e[0]))&&(n*=n)):e=ir(e.increment)),Kn(t,o?Nt(e)?function(t){return r=e(t),Math.abs(r-t)<=n?r:t}:function(t){for(var o,i,a=parseFloat(r?t.x:t),s=parseFloat(r?t.y:0),l=St,u=0,c=e.length;c--;)(o=r?(o=e[c].x-a)*o+(i=e[c].y-s)*i:Math.abs(e[c]-a))<l&&(l=o,u=c);return u=!n||l<=n?e[u]:t,r||u===t||Rt(t)?u:u+Zn(t)}:ir(e))},sr=function(e,t,n,r){return Kn(Bt(e)?!t:!0===n?!!(n=0):!r,(function(){return Bt(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+.99*n))/n)*n*r)/r}))},lr=function(e,t,n){return Kn(n,(function(n){return e[~~t(n)]}))},ur=function(e){for(var t,n,r,o,i=0,a="";~(t=e.indexOf("random(",i));)r=e.indexOf(")",t),o="["===e.charAt(t+7),n=e.substr(t+7,r-t-7).match(o?Yt:Ut),a+=e.substr(i,t-i)+sr(o?n:+n[0],o?0:+n[1],+n[2]||1e-5),i=r+1;return a+e.substr(i,e.length-i)},cr=function(e,t,n,r,o){var i=t-e,a=r-n;return Kn(o,(function(t){return n+((t-e)/i*a||0)}))},fr=function(e,t,n){var r,o,i,a=e.labels,s=St;for(r in a)(o=a[r]-t)<0==!!n&&o&&s>(o=Math.abs(o))&&(i=r,s=o);return i},dr=function(e,t,n){var r,o,i=e.vars,a=i[t];if(a)return r=i[t+"Params"],o=i.callbackScope||e,n&&rn.length&&bn(),r?a.apply(o,r):a.call(o)},pr=function(e){return Pn(e),e.scrollTrigger&&e.scrollTrigger.kill(!1),e.progress()<1&&dr(e,"onInterrupt"),e},hr=function(e){var t=(e=!e.name&&e.default||e).name,n=Nt(e),r=t&&!n&&e.init?function(){this._props=[]}:e,o={init:tn,render:io,add:Vr,kill:so,modifier:ao,rawVars:0},i={targetTest:0,get:0,getSetter:to,aliases:{},register:0};if(Or(),e!==r){if(an[t])return;_n(r,_n(En(e,o),i)),Sn(r.prototype,Sn(o,En(e,i))),an[r.prop=t]=r,e.targetTest&&(un.push(r),nn[t]=1),t=("css"===t?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}en(t,r),e.register&&e.register(go,r,co)},gr=255,mr={aqua:[0,gr,gr],lime:[0,gr,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,gr],navy:[0,0,128],white:[gr,gr,gr],olive:[128,128,0],yellow:[gr,gr,0],orange:[gr,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[gr,0,0],pink:[gr,192,203],cyan:[0,gr,gr],transparent:[gr,gr,gr,0]},vr=function(e,t,n){return(6*(e+=e<0?1:e>1?-1:0)<1?t+(n-t)*e*6:e<.5?n:3*e<2?t+(n-t)*(2/3-e)*6:t)*gr+.5|0},yr=function(e,t,n){var r,o,i,a,s,l,u,c,f,d,p=e?Rt(e)?[e>>16,e>>8&gr,e&gr]:0:mr.black;if(!p){if(","===e.substr(-1)&&(e=e.substr(0,e.length-1)),mr[e])p=mr[e];else if("#"===e.charAt(0)){if(e.length<6&&(r=e.charAt(1),o=e.charAt(2),i=e.charAt(3),e="#"+r+r+o+o+i+i+(5===e.length?e.charAt(4)+e.charAt(4):"")),9===e.length)return[(p=parseInt(e.substr(1,6),16))>>16,p>>8&gr,p&gr,parseInt(e.substr(7),16)/255];p=[(e=parseInt(e.substr(1),16))>>16,e>>8&gr,e&gr]}else if("hsl"===e.substr(0,3))if(p=d=e.match(Ut),t){if(~e.indexOf("="))return p=e.match(Vt),n&&p.length<4&&(p[3]=1),p}else a=+p[0]%360/360,s=+p[1]/100,r=2*(l=+p[2]/100)-(o=l<=.5?l*(s+1):l+s-l*s),p.length>3&&(p[3]*=1),p[0]=vr(a+1/3,r,o),p[1]=vr(a,r,o),p[2]=vr(a-1/3,r,o);else p=e.match(Ut)||mr.transparent;p=p.map(Number)}return t&&!d&&(r=p[0]/gr,o=p[1]/gr,i=p[2]/gr,l=((u=Math.max(r,o,i))+(c=Math.min(r,o,i)))/2,u===c?a=s=0:(f=u-c,s=l>.5?f/(2-u-c):f/(u+c),a=u===r?(o-i)/f+(o<i?6:0):u===o?(i-r)/f+2:(r-o)/f+4,a*=60),p[0]=~~(a+.5),p[1]=~~(100*s+.5),p[2]=~~(100*l+.5)),n&&p.length<4&&(p[3]=1),p},br=function(e){var t=[],n=[],r=-1;return e.split(xr).forEach((function(e){var o=e.match(Ht)||[];t.push.apply(t,o),n.push(r+=o.length+1)})),t.c=n,t},wr=function(e,t,n){var r,o,i,a,s="",l=(e+s).match(xr),u=t?"hsla(":"rgba(",c=0;if(!l)return e;if(l=l.map((function(e){return(e=yr(e,t,1))&&u+(t?e[0]+","+e[1]+"%,"+e[2]+"%,"+e[3]:e.join(","))+")"})),n&&(i=br(e),(r=n.c).join(s)!==i.c.join(s)))for(a=(o=e.replace(xr,"1").split(Ht)).length-1;c<a;c++)s+=o[c]+(~r.indexOf(c)?l.shift()||u+"0,0,0,0)":(i.length?i:l.length?l:n).shift());if(!o)for(a=(o=e.split(xr)).length-1;c<a;c++)s+=o[c]+l[c];return s+o[a]},xr=function(){var e,t="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for(e in mr)t+="|"+e+"\\b";return new RegExp(t+")","gi")}(),kr=/hsl[a]?\(/,_r=function(e){var t,n=e.join(" ");if(xr.lastIndex=0,xr.test(n))return t=kr.test(n),e[1]=wr(e[1],t),e[0]=wr(e[0],t,br(e[1])),!0},Sr=(pt=Date.now,ht=500,gt=33,mt=pt(),vt=mt,bt=yt=1e3/240,xt=function e(t){var n,r,o,i,a=pt()-vt,s=!0===t;if(a>ht&&(mt+=a-gt),((n=(o=(vt+=a)-mt)-bt)>0||s)&&(i=++ct.frame,ft=o-1e3*ct.time,ct.time=o/=1e3,bt+=n+(n>=yt?4:yt-n),r=1),s||(st=lt(e)),r)for(dt=0;dt<wt.length;dt++)wt[dt](o,ft,i,t)},ct={time:0,frame:0,tick:function(){xt(!0)},deltaRatio:function(e){return ft/(1e3/(e||60))},wake:function(){rt&&(!tt&&At()&&(et=tt=window,nt=et.document||{},Xt.gsap=go,(et.gsapVersions||(et.gsapVersions=[])).push(go.version),Qt(Kt||et.GreenSockGlobals||!et.gsap&&et||{}),ut=et.requestAnimationFrame),st&&ct.sleep(),lt=ut||function(e){return setTimeout(e,bt-1e3*ct.time+1|0)},at=1,xt(2))},sleep:function(){(ut?et.cancelAnimationFrame:clearTimeout)(st),at=0,lt=tn},lagSmoothing:function(e,t){ht=e||1e8,gt=Math.min(t,ht,0)},fps:function(e){yt=1e3/(e||240),bt=1e3*ct.time+yt},add:function(e,t,n){var r=t?function(t,n,o,i){e(t,n,o,i),ct.remove(r)}:e;return ct.remove(e),wt[n?"unshift":"push"](r),Or(),r},remove:function(e,t){~(t=wt.indexOf(e))&&wt.splice(t,1)&&dt>=t&&dt--},_listeners:wt=[]},ct),Or=function(){return!at&&Sr.wake()},Er={},Cr=/^[\d.\-M][\d.\-,\s]/,jr=/["']/g,Tr=function(e){for(var t,n,r,o={},i=e.substr(1,e.length-3).split(":"),a=i[0],s=1,l=i.length;s<l;s++)n=i[s],t=s!==l-1?n.lastIndexOf(","):n.length,r=n.substr(0,t),o[a]=isNaN(r)?r.replace(jr,"").trim():+r,a=n.substr(t+1).trim();return o},Pr=function(e){return function(t){return 1-e(1-t)}},Mr=function e(t,n){for(var r,o=t._first;o;)o instanceof Ir?e(o,n):!o.vars.yoyoEase||o._yoyo&&o._repeat||o._yoyo===n||(o.timeline?e(o.timeline,n):(r=o._ease,o._ease=o._yEase,o._yEase=r,o._yoyo=n)),o=o._next},Lr=function(e,t){return e&&(Nt(e)?e:Er[e]||function(e){var t,n,r,o,i=(e+"").split("("),a=Er[i[0]];return a&&i.length>1&&a.config?a.config.apply(null,~e.indexOf("{")?[Tr(i[1])]:(t=e,n=t.indexOf("(")+1,r=t.indexOf(")"),o=t.indexOf("(",n),t.substring(n,~o&&o<r?t.indexOf(")",r+1):r)).split(",").map(xn)):Er._CE&&Cr.test(e)?Er._CE("",e):a}(e))||t},Nr=function(e,t,n,r){void 0===n&&(n=function(e){return 1-t(1-e)}),void 0===r&&(r=function(e){return e<.5?t(2*e)/2:1-t(2*(1-e))/2});var o,i={easeIn:t,easeOut:n,easeInOut:r};return hn(e,(function(e){for(var t in Er[e]=Xt[e]=i,Er[o=e.toLowerCase()]=n,i)Er[o+("easeIn"===t?".in":"easeOut"===t?".out":".inOut")]=Er[e+"."+t]=i[t]})),i},Rr=function(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}},Dr=function e(t,n,r){var o=n>=1?n:1,i=(r||(t?.3:.45))/(n<1?n:1),a=i/Et*(Math.asin(1/o)||0),s=function(e){return 1===e?1:o*Math.pow(2,-10*e)*Mt((e-a)*i)+1},l="out"===t?s:"in"===t?function(e){return 1-s(1-e)}:Rr(s);return i=Et/i,l.config=function(n,r){return e(t,n,r)},l},$r=function e(t,n){void 0===n&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},o="out"===t?r:"in"===t?function(e){return 1-r(1-e)}:Rr(r);return o.config=function(n){return e(t,n)},o};hn("Linear,Quad,Cubic,Quart,Quint,Strong",(function(e,t){var n=t<5?t+1:t;Nr(e+",Power"+(n-1),t?function(e){return Math.pow(e,n)}:function(e){return e},(function(e){return 1-Math.pow(1-e,n)}),(function(e){return e<.5?Math.pow(2*e,n)/2:1-Math.pow(2*(1-e),n)/2}))})),Er.Linear.easeNone=Er.none=Er.Linear.easeIn,Nr("Elastic",Dr("in"),Dr("out"),Dr()),function(e,t){var n=1/t,r=function(r){return r<n?e*r*r:r<.7272727272727273?e*Math.pow(r-1.5/t,2)+.75:r<.9090909090909092?e*(r-=2.25/t)*r+.9375:e*Math.pow(r-2.625/t,2)+.984375};Nr("Bounce",(function(e){return 1-r(1-e)}),r)}(7.5625,2.75),Nr("Expo",(function(e){return e?Math.pow(2,10*(e-1)):0})),Nr("Circ",(function(e){return-(Tt(1-e*e)-1)})),Nr("Sine",(function(e){return 1===e?1:1-Pt(e*Ct)})),Nr("Back",$r("in"),$r("out"),$r()),Er.SteppedEase=Er.steps=Xt.SteppedEase={config:function(e,t){void 0===e&&(e=1);var n=1/e,r=e+(t?0:1),o=t?1:0;return function(e){return((r*Qn(0,.99999999,e)|0)+o)*n}}},_t.ease=Er["quad.out"],hn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",(function(e){return cn+=e+","+e+"Params,"}));var Fr=function(e,t){this.id=jt++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:pn,this.set=t?t.getSetter:to},Ar=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Wn(this,+e.duration,1,1),this.data=e.data,at||Sr.wake()}var t=e.prototype;return t.delay=function(e){return e||0===e?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,Wn(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Or(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(An(this,e),!n._dp||n.parent||In(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&zn(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===Ot||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),wn(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Rn(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?e:1-e)+Rn(this),t):this.duration()?Math.min(1,this._time/this._dur):this.ratio},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Dn(this._tTime,n)+1:1},t.timeScale=function(e){if(!arguments.length)return-1e-8===this._rts?0:this._rts;if(this._rts===e)return this;var t=this.parent&&this._ts?$n(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||-1e-8===e?0:this._rts,this.totalTime(Qn(-this._delay,this._tDur,t),!0),Fn(this),Ln(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Or(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&Math.abs(this._zTime)!==Ot&&(this._tTime-=Ot)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=e;var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&zn(t,this,e-this._delay),this}return this._start},t.endTime=function(e){return this._start+(Ft(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?$n(t.rawTime(e),this):this._tTime:this._tTime},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(t._ts||1),t=t._dp;return n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,qn(this)):-2===this._repeat?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,qn(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(Gn(this,e),Ft(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,Ft(t))},t.play=function(e,t){return null!=e&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return null!=e&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return null!=e&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-1e-8:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},t.isActive=function(){var e,t=this.parent||this._dp,n=this._start;return!(t&&!(this._ts&&this._initted&&t.isActive()&&(e=t.rawTime(!0))>=n&&e<this.endTime(!0)-Ot))},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+"Params"]=n),"onUpdate"===e&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this;return new Promise((function(n){var r=Nt(e)?e:kn,o=function(){var e=t.then;t.then=null,Nt(r)&&(r=r(t))&&(r.then||r===t)&&(t.then=e),n(r),t.then=e};t._initted&&1===t.totalProgress()&&t._ts>=0||!t._tTime&&t._ts<0?o():t._prom=o}))},t.kill=function(){pr(this)},e}();_n(Ar.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var Ir=function(e){function t(t,n){var r;return void 0===t&&(t={}),(r=e.call(this,t)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=Ft(t.sortChildren),Je&&zn(t.parent||Je,Ke(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Bn(Ke(r),t.scrollTrigger),r}Qe(t,e);var n=t.prototype;return n.to=function(e,t,n){return Xn(0,arguments,this),this},n.from=function(e,t,n){return Xn(1,arguments,this),this},n.fromTo=function(e,t,n,r){return Xn(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,Cn(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new Kr(e,t,Gn(this,n),1),this},n.call=function(e,t,n){return zn(this,Kr.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,o,i,a){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=i,n.onCompleteParams=a,n.parent=this,new Kr(e,n,Gn(this,o)),this},n.staggerFrom=function(e,t,n,r,o,i,a){return n.runBackwards=1,Cn(n).immediateRender=Ft(n.immediateRender),this.staggerTo(e,t,n,r,o,i,a)},n.staggerFromTo=function(e,t,n,r,o,i,a,s){return r.startAt=n,Cn(r).immediateRender=Ft(r.immediateRender),this.staggerTo(e,t,r,o,i,a,s)},n.render=function(e,t,n){var r,o,i,a,s,l,u,c,f,d,p,h,g=this._time,m=this._dirty?this.totalDuration():this._tDur,v=this._dur,y=e<=0?0:mn(e),b=this._zTime<0!=e<0&&(this._initted||!v);if(this!==Je&&y>m&&e>=0&&(y=m),y!==this._tTime||n||b){if(g!==this._time&&v&&(y+=this._time-g,e+=this._time-g),r=y,f=this._start,l=!(c=this._ts),b&&(v||(g=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(p=this._yoyo,s=v+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(100*s+e,t,n);if(r=mn(y%s),y===m?(a=this._repeat,r=v):((a=~~(y/s))&&a===y/s&&(r=v,a--),r>v&&(r=v)),d=Dn(this._tTime,s),!g&&this._tTime&&d!==a&&(d=a),p&&1&a&&(r=v-r,h=1),a!==d&&!this._lock){var w=p&&1&d,x=w===(p&&1&a);if(a<d&&(w=!w),g=w?0:v,this._lock=1,this.render(g||(h?0:mn(a*s)),t,!v)._lock=0,this._tTime=y,!t&&this.parent&&dr(this,"onRepeat"),this.vars.repeatRefresh&&!h&&(this.invalidate()._lock=1),g&&g!==this._time||l!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(v=this._dur,m=this._tDur,x&&(this._lock=2,g=w?v:-1e-4,this.render(g,!0),this.vars.repeatRefresh&&!h&&this.invalidate()),this._lock=0,!this._ts&&!l)return this;Mr(this,h)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(u=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if("isPause"===r.data&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if("isPause"===r.data&&r._start<t)return r;r=r._prev}}(this,mn(g),mn(r)),u&&(y-=r-(r=u._start))),this._tTime=y,this._time=r,this._act=!c,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,g=0),!g&&r&&!t&&(dr(this,"onStart"),this._tTime!==y))return this;if(r>=g&&e>=0)for(o=this._first;o;){if(i=o._next,(o._act||r>=o._start)&&o._ts&&u!==o){if(o.parent!==this)return this.render(e,t,n);if(o.render(o._ts>0?(r-o._start)*o._ts:(o._dirty?o.totalDuration():o._tDur)+(r-o._start)*o._ts,t,n),r!==this._time||!this._ts&&!l){u=0,i&&(y+=this._zTime=-1e-8);break}}o=i}else{o=this._last;for(var k=e<0?e:r;o;){if(i=o._prev,(o._act||k<=o._end)&&o._ts&&u!==o){if(o.parent!==this)return this.render(e,t,n);if(o.render(o._ts>0?(k-o._start)*o._ts:(o._dirty?o.totalDuration():o._tDur)+(k-o._start)*o._ts,t,n),r!==this._time||!this._ts&&!l){u=0,i&&(y+=this._zTime=k?-1e-8:Ot);break}}o=i}}if(u&&!t&&(this.pause(),u.render(r>=g?0:-1e-8)._zTime=r>=g?1:-1,this._ts))return this._start=f,Fn(this),this.render(e,t,n);this._onUpdate&&!t&&dr(this,"onUpdate",!0),(y===m&&this._tTime>=this.totalDuration()||!y&&g)&&(f!==this._start&&Math.abs(c)===Math.abs(this._ts)||this._lock||((e||!v)&&(y===m&&this._ts>0||!y&&this._ts<0)&&Pn(this,1),t||e<0&&!g||!y&&!g&&m||(dr(this,y===m&&e>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(y<m&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(Rt(t)||(t=Gn(this,t,e)),!(e instanceof Ar)){if(Bt(e))return e.forEach((function(e){return n.add(e,t)})),this;if(Lt(e))return this.addLabel(e,t);if(!Nt(e))return this;e=Kr.delayedCall(0,e)}return this!==e?zn(this,e,t):this},n.getChildren=function(e,t,n,r){void 0===e&&(e=!0),void 0===t&&(t=!0),void 0===n&&(n=!0),void 0===r&&(r=-St);for(var o=[],i=this._first;i;)i._start>=r&&(i instanceof Kr?t&&o.push(i):(n&&o.push(i),e&&o.push.apply(o,i.getChildren(!0,t,n)))),i=i._next;return o},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return Lt(e)?this.removeLabel(e):Nt(e)?this.killTweensOf(e):(Tn(this,e),e===this._recent&&(this._recent=this._last),Mn(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=mn(Sr.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=Gn(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=Kr.delayedCall(0,t||tn,n);return r.data="isPause",this._hasPause=1,zn(this,r,Gn(this,e))},n.removePause=function(e){var t=this._first;for(e=Gn(this,e);t;)t._start===e&&"isPause"===t.data&&Pn(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),o=r.length;o--;)zr!==r[o]&&r[o].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n,r=[],o=nr(e),i=this._first,a=Rt(t);i;)i instanceof Kr?yn(i._targets,o)&&(a?(!zr||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&r.push(i):(n=i.getTweensOf(o,t)).length&&r.push.apply(r,n),i=i._next;return r},n.tweenTo=function(e,t){t=t||{};var n,r=this,o=Gn(r,e),i=t,a=i.startAt,s=i.onStart,l=i.onStartParams,u=i.immediateRender,c=Kr.to(r,_n({ease:t.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:t.duration||Math.abs((o-(a&&"time"in a?a.time:r._time))/r.timeScale())||Ot,onStart:function(){if(r.pause(),!n){var e=t.duration||Math.abs((o-(a&&"time"in a?a.time:r._time))/r.timeScale());c._dur!==e&&Wn(c,e,0,1).render(c._time,!0,!0),n=1}s&&s.apply(c,l||[])}},t));return u?c.render(0):c},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,_n({startAt:{time:Gn(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return void 0===e&&(e=this._time),fr(this,Gn(this,e))},n.previousLabel=function(e){return void 0===e&&(e=this._time),fr(this,Gn(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+Ot)},n.shiftChildren=function(e,t,n){void 0===n&&(n=0);for(var r,o=this._first,i=this.labels;o;)o._start>=n&&(o._start+=e,o._end+=e),o=o._next;if(t)for(r in i)i[r]>=n&&(i[r]+=e);return Mn(this)},n.invalidate=function(){var t=this._first;for(this._lock=0;t;)t.invalidate(),t=t._next;return e.prototype.invalidate.call(this)},n.clear=function(e){void 0===e&&(e=!0);for(var t,n=this._first;n;)t=n._next,this.remove(n),n=t;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),Mn(this)},n.totalDuration=function(e){var t,n,r,o=0,i=this,a=i._last,s=St;if(arguments.length)return i.timeScale((i._repeat<0?i.duration():i.totalDuration())/(i.reversed()?-e:e));if(i._dirty){for(r=i.parent;a;)t=a._prev,a._dirty&&a.totalDuration(),(n=a._start)>s&&i._sort&&a._ts&&!i._lock?(i._lock=1,zn(i,a,n-a._delay,1)._lock=0):s=n,n<0&&a._ts&&(o-=n,(!r&&!i._dp||r&&r.smoothChildTiming)&&(i._start+=n/i._ts,i._time-=n,i._tTime-=n),i.shiftChildren(-n,!1,-Infinity),s=0),a._end>o&&a._ts&&(o=a._end),a=t;Wn(i,i===Je&&i._time>o?i._time:o,1,1),i._dirty=0}return i._tDur},t.updateRoot=function(e){if(Je._ts&&(wn(Je,$n(e,Je)),ot=Sr.frame),Sr.frame>=ln){ln+=kt.autoSleep||120;var t=Je._first;if((!t||!t._ts)&&kt.autoSleep&&Sr._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Sr.sleep()}}},t}(Ar);_n(Ir.prototype,{_lock:0,_hasPause:0,_forcing:0});var zr,Br,Ur=function(e,t,n,r,o,i,a){var s,l,u,c,f,d,p,h,g=new co(this._pt,e,t,0,1,oo,null,o),m=0,v=0;for(g.b=n,g.e=r,n+="",(p=~(r+="").indexOf("random("))&&(r=ur(r)),i&&(i(h=[n,r],e,t),n=h[0],r=h[1]),l=n.match(Wt)||[];s=Wt.exec(r);)c=s[0],f=r.substring(m,s.index),u?u=(u+1)%5:"rgba("===f.substr(-5)&&(u=1),c!==l[v++]&&(d=parseFloat(l[v-1])||0,g._pt={_next:g._pt,p:f||1===v?f:",",s:d,c:"="===c.charAt(1)?vn(d,c)-d:parseFloat(c)-d,m:u&&u<4?Math.round:0},m=Wt.lastIndex);return g.c=m<r.length?r.substring(m,r.length):"",g.fp=a,(qt.test(r)||p)&&(g.e=0),this._pt=g,g},Vr=function(e,t,n,r,o,i,a,s,l){Nt(r)&&(r=r(o||0,e,i));var u,c=e[t],f="get"!==n?n:Nt(c)?l?e[t.indexOf("set")||!Nt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](l):e[t]():c,d=Nt(c)?l?Jr:Zr:Qr;if(Lt(r)&&(~r.indexOf("random(")&&(r=ur(r)),"="===r.charAt(1)&&((u=vn(f,r)+(Zn(f)||0))||0===u)&&(r=u)),f!==r||Br)return isNaN(f*r)||""===r?(!c&&!(t in e)&&Zt(t,r),Ur.call(this,e,t,f,r,d,s||kt.stringFilter,l)):(u=new co(this._pt,e,t,+f||0,r-(f||0),"boolean"==typeof c?ro:no,0,d),l&&(u.fp=l),a&&u.modifier(a,this,e),this._pt=u)},Hr=function(e,t,n,r,o,i){var a,s,l,u;if(an[e]&&!1!==(a=new an[e]).init(o,a.rawVars?t[e]:function(e,t,n,r,o){if(Nt(e)&&(e=Yr(e,o,t,n,r)),!$t(e)||e.style&&e.nodeType||Bt(e)||zt(e))return Lt(e)?Yr(e,o,t,n,r):e;var i,a={};for(i in e)a[i]=Yr(e[i],o,t,n,r);return a}(t[e],r,o,i,n),n,r,i)&&(n._pt=s=new co(n._pt,o,e,0,1,a.render,a,0,a.priority),n!==it))for(l=n._ptLookup[n._targets.indexOf(o)],u=a._props.length;u--;)l[a._props[u]]=s;return a},Wr=function e(t,n){var r,o,i,a,s,l,u,c,f,d,p,h,g,m=t.vars,v=m.ease,y=m.startAt,b=m.immediateRender,w=m.lazy,x=m.onUpdate,k=m.onUpdateParams,_=m.callbackScope,S=m.runBackwards,O=m.yoyoEase,E=m.keyframes,C=m.autoRevert,j=t._dur,T=t._startAt,P=t._targets,M=t.parent,L=M&&"nested"===M.data?M.parent._targets:P,N="auto"===t._overwrite&&!Ze,R=t.timeline;if(R&&(!E||!v)&&(v="none"),t._ease=Lr(v,_t.ease),t._yEase=O?Pr(Lr(!0===O?v:O,_t.ease)):0,O&&t._yoyo&&!t._repeat&&(O=t._yEase,t._yEase=t._ease,t._ease=O),t._from=!R&&!!m.runBackwards,!R||E&&!m.stagger){if(h=(c=P[0]?dn(P[0]).harness:0)&&m[c.prop],r=En(m,nn),T&&(Pn(T.render(-1,!0)),T._lazy=0),y)if(Pn(t._startAt=Kr.set(P,_n({data:"isStart",overwrite:!1,parent:M,immediateRender:!0,lazy:Ft(w),startAt:null,delay:0,onUpdate:x,onUpdateParams:k,callbackScope:_,stagger:0},y))),n<0&&!b&&!C&&t._startAt.render(-1,!0),b){if(n>0&&!C&&(t._startAt=0),j&&n<=0)return void(n&&(t._zTime=n))}else!1===C&&(t._startAt=0);else if(S&&j)if(T)!C&&(t._startAt=0);else if(n&&(b=!1),i=_n({overwrite:!1,data:"isFromStart",lazy:b&&Ft(w),immediateRender:b,stagger:0,parent:M},r),h&&(i[c.prop]=h),Pn(t._startAt=Kr.set(P,i)),n<0&&t._startAt.render(-1,!0),t._zTime=n,b){if(!n)return}else e(t._startAt,Ot);for(t._pt=t._ptCache=0,w=j&&Ft(w)||w&&!j,o=0;o<P.length;o++){if(u=(s=P[o])._gsap||fn(P)[o]._gsap,t._ptLookup[o]=d={},on[u.id]&&rn.length&&bn(),p=L===P?o:L.indexOf(s),c&&!1!==(f=new c).init(s,h||r,t,p,L)&&(t._pt=a=new co(t._pt,s,f.name,0,1,f.render,f,0,f.priority),f._props.forEach((function(e){d[e]=a})),f.priority&&(l=1)),!c||h)for(i in r)an[i]&&(f=Hr(i,r,t,p,s,L))?f.priority&&(l=1):d[i]=a=Vr.call(t,s,i,"get",r[i],p,L,0,m.stringFilter);t._op&&t._op[o]&&t.kill(s,t._op[o]),N&&t._pt&&(zr=t,Je.killTweensOf(s,d,t.globalTime(n)),g=!t.parent,zr=0),t._pt&&w&&(on[u.id]=1)}l&&uo(t),t._onInit&&t._onInit(t)}t._onUpdate=x,t._initted=(!t._op||t._pt)&&!g,E&&n<=0&&R.render(St,!0,!0)},qr=function(e,t,n,r){var o,i,a=t.ease||r||"power1.inOut";if(Bt(t))i=n[e]||(n[e]=[]),t.forEach((function(e,n){return i.push({t:n/(t.length-1)*100,v:e,e:a})}));else for(o in t)i=n[o]||(n[o]=[]),"ease"===o||i.push({t:parseFloat(e),v:t[o],e:a})},Yr=function(e,t,n,r,o){return Nt(e)?e.call(t,n,r,o):Lt(e)&&~e.indexOf("random(")?ur(e):e},Gr=cn+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Xr={};hn(Gr+",id,stagger,delay,duration,paused,scrollTrigger",(function(e){return Xr[e]=1}));var Kr=function(e){function t(t,n,r,o){var i;"number"==typeof n&&(r.duration=n,n=r,r=null);var a,s,l,u,c,f,d,p,h=(i=e.call(this,o?n:Cn(n))||this).vars,g=h.duration,m=h.delay,v=h.immediateRender,y=h.stagger,b=h.overwrite,w=h.keyframes,x=h.defaults,k=h.scrollTrigger,_=h.yoyoEase,S=n.parent||Je,O=(Bt(t)||zt(t)?Rt(t[0]):"length"in n)?[t]:nr(t);if(i._targets=O.length?fn(O):Jt("GSAP target "+t+" not found. https://greensock.com",!kt.nullTargetWarn)||[],i._ptLookup=[],i._overwrite=b,w||y||It(g)||It(m)){if(n=i.vars,(a=i.timeline=new Ir({data:"nested",defaults:x||{}})).kill(),a.parent=a._dp=Ke(i),a._start=0,y||It(g)||It(m)){if(u=O.length,d=y&&or(y),$t(y))for(c in y)~Gr.indexOf(c)&&(p||(p={}),p[c]=y[c]);for(s=0;s<u;s++)(l=En(n,Xr)).stagger=0,_&&(l.yoyoEase=_),p&&Sn(l,p),f=O[s],l.duration=+Yr(g,Ke(i),s,f,O),l.delay=(+Yr(m,Ke(i),s,f,O)||0)-i._delay,!y&&1===u&&l.delay&&(i._delay=m=l.delay,i._start+=m,l.delay=0),a.to(f,l,d?d(s,f,O):0),a._ease=Er.none;a.duration()?g=m=0:i.timeline=0}else if(w){Cn(_n(a.vars.defaults,{ease:"none"})),a._ease=Lr(w.ease||n.ease||"none");var E,C,j,T=0;if(Bt(w))w.forEach((function(e){return a.to(O,e,">")}));else{for(c in l={},w)"ease"===c||"easeEach"===c||qr(c,w[c],l,w.easeEach);for(c in l)for(E=l[c].sort((function(e,t){return e.t-t.t})),T=0,s=0;s<E.length;s++)(j={ease:(C=E[s]).e,duration:(C.t-(s?E[s-1].t:0))/100*g})[c]=C.v,a.to(O,j,T),T+=j.duration;a.duration()<g&&a.to({},{duration:g-a.duration()})}}g||i.duration(g=a.duration())}else i.timeline=0;return!0!==b||Ze||(zr=Ke(i),Je.killTweensOf(O),zr=0),zn(S,Ke(i),r),n.reversed&&i.reverse(),n.paused&&i.paused(!0),(v||!g&&!w&&i._start===mn(S._time)&&Ft(v)&&Nn(Ke(i))&&"nested"!==S.data)&&(i._tTime=-1e-8,i.render(Math.max(0,-m))),k&&Bn(Ke(i),k),i}Qe(t,e);var n=t.prototype;return n.render=function(e,t,n){var r,o,i,a,s,l,u,c,f,d=this._time,p=this._tDur,h=this._dur,g=e>p-Ot&&e>=0?p:e<Ot?0:e;if(h){if(g!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!=e<0){if(r=g,c=this.timeline,this._repeat){if(a=h+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(100*a+e,t,n);if(r=mn(g%a),g===p?(i=this._repeat,r=h):((i=~~(g/a))&&i===g/a&&(r=h,i--),r>h&&(r=h)),(l=this._yoyo&&1&i)&&(f=this._yEase,r=h-r),s=Dn(this._tTime,a),r===d&&!n&&this._initted)return this._tTime=g,this;i!==s&&(c&&this._yEase&&Mr(c,l),!this.vars.repeatRefresh||l||this._lock||(this._lock=n=1,this.render(mn(a*i),!0).invalidate()._lock=0))}if(!this._initted){if(Un(this,e<0?e:r,n,t))return this._tTime=0,this;if(d!==this._time)return this;if(h!==this._dur)return this.render(e,t,n)}if(this._tTime=g,this._time=r,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=u=(f||this._ease)(r/h),this._from&&(this.ratio=u=1-u),r&&!d&&!t&&(dr(this,"onStart"),this._tTime!==g))return this;for(o=this._pt;o;)o.r(u,o.d),o=o._next;c&&c.render(e<0?e:!r&&l?-1e-8:c._dur*c._ease(r/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(e<0&&this._startAt&&this._startAt.render(e,!0,n),dr(this,"onUpdate")),this._repeat&&i!==s&&this.vars.onRepeat&&!t&&this.parent&&dr(this,"onRepeat"),g!==this._tDur&&g||this._tTime!==g||(e<0&&this._startAt&&!this._onUpdate&&this._startAt.render(e,!0,!0),(e||!h)&&(g===this._tDur&&this._ts>0||!g&&this._ts<0)&&Pn(this,1),t||e<0&&!d||!g&&!d||(dr(this,g===p?"onComplete":"onReverseComplete",!0),this._prom&&!(g<p&&this.timeScale()>0)&&this._prom()))}}else!function(e,t,n,r){var o,i,a,s=e.ratio,l=t<0||!t&&(!e._start&&Vn(e)&&(e._initted||!Hn(e))||(e._ts<0||e._dp._ts<0)&&!Hn(e))?0:1,u=e._rDelay,c=0;if(u&&e._repeat&&(c=Qn(0,e._tDur,t),i=Dn(c,u),e._yoyo&&1&i&&(l=1-l),i!==Dn(e._tTime,u)&&(s=1-l,e.vars.repeatRefresh&&e._initted&&e.invalidate())),l!==s||r||e._zTime===Ot||!t&&e._zTime){if(!e._initted&&Un(e,t,r,n))return;for(a=e._zTime,e._zTime=t||(n?Ot:0),n||(n=t&&!a),e.ratio=l,e._from&&(l=1-l),e._time=0,e._tTime=c,o=e._pt;o;)o.r(l,o.d),o=o._next;e._startAt&&t<0&&e._startAt.render(t,!0,!0),e._onUpdate&&!n&&dr(e,"onUpdate"),c&&e._repeat&&!n&&e.parent&&dr(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===l&&(l&&Pn(e,1),n||(dr(e,l?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)}(this,e,t,n);return this},n.targets=function(){return this._targets},n.invalidate=function(){return this._pt=this._op=this._startAt=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(),e.prototype.invalidate.call(this)},n.resetTo=function(e,t,n,r){at||Sr.wake(),this._ts||this.play();var o=Math.min(this._dur,(this._dp._time-this._start)*this._ts);return this._initted||Wr(this,o),function(e,t,n,r,o,i,a){var s,l,u,c=(e._pt&&e._ptCache||(e._ptCache={}))[t];if(!c)for(c=e._ptCache[t]=[],l=e._ptLookup,u=e._targets.length;u--;){if((s=l[u][t])&&s.d&&s.d._pt)for(s=s.d._pt;s&&s.p!==t;)s=s._next;if(!s)return Br=1,e.vars[t]="+=0",Wr(e,a),Br=0,1;c.push(s)}for(u=c.length;u--;)(s=c[u]).s=!r&&0!==r||o?s.s+(r||0)+i*s.c:r,s.c=n-s.s,s.e&&(s.e=gn(n)+Zn(s.e)),s.b&&(s.b=s.s+Zn(s.b))}(this,e,t,n,r,this._ease(o/this._dur),o)?this.resetTo(e,t,n,r):(An(this,0),this.parent||jn(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(e,t){if(void 0===t&&(t="all"),!(e||t&&"all"!==t))return this._lazy=this._pt=0,this.parent?pr(this):this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,zr&&!0!==zr.vars.overwrite)._first||pr(this),this.parent&&n!==this.timeline.totalDuration()&&Wn(this,this._dur*this.timeline._tDur/n,0,1),this}var r,o,i,a,s,l,u,c=this._targets,f=e?nr(e):c,d=this._ptLookup,p=this._pt;if((!t||"all"===t)&&function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0}(c,f))return"all"===t&&(this._pt=0),pr(this);for(r=this._op=this._op||[],"all"!==t&&(Lt(t)&&(s={},hn(t,(function(e){return s[e]=1})),t=s),t=function(e,t){var n,r,o,i,a=e[0]?dn(e[0]).harness:0,s=a&&a.aliases;if(!s)return t;for(r in n=Sn({},t),s)if(r in n)for(o=(i=s[r].split(",")).length;o--;)n[i[o]]=n[r];return n}(c,t)),u=c.length;u--;)if(~f.indexOf(c[u]))for(s in o=d[u],"all"===t?(r[u]=t,a=o,i={}):(i=r[u]=r[u]||{},a=t),a)(l=o&&o[s])&&("kill"in l.d&&!0!==l.d.kill(s)||Tn(this,l,"_pt"),delete o[s]),"all"!==i&&(i[s]=1);return this._initted&&!this._pt&&p&&pr(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return Xn(1,arguments)},t.delayedCall=function(e,n,r,o){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:o})},t.fromTo=function(e,t,n){return Xn(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return Je.killTweensOf(e,t,n)},t}(Ar);_n(Kr.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),hn("staggerTo,staggerFrom,staggerFromTo",(function(e){Kr[e]=function(){var t=new Ir,n=Jn.call(arguments,0);return n.splice("staggerFromTo"===e?5:4,0,0),t[e].apply(t,n)}}));var Qr=function(e,t,n){return e[t]=n},Zr=function(e,t,n){return e[t](n)},Jr=function(e,t,n,r){return e[t](r.fp,n)},eo=function(e,t,n){return e.setAttribute(t,n)},to=function(e,t){return Nt(e[t])?Zr:Dt(e[t])&&e.setAttribute?eo:Qr},no=function(e,t){return t.set(t.t,t.p,Math.round(1e6*(t.s+t.c*e))/1e6,t)},ro=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},oo=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(1===e&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round(1e4*(n.s+n.c*e))/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},io=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},ao=function(e,t,n,r){for(var o,i=this._pt;i;)o=i._next,i.p===r&&i.modifier(e,t,n),i=o},so=function(e){for(var t,n,r=this._pt;r;)n=r._next,r.p===e&&!r.op||r.op===e?Tn(this,r,"_pt"):r.dep||(t=1),r=n;return!t},lo=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},uo=function(e){for(var t,n,r,o,i=e._pt;i;){for(t=i._next,n=r;n&&n.pr>i.pr;)n=n._next;(i._prev=n?n._prev:o)?i._prev._next=i:r=i,(i._next=n)?n._prev=i:o=i,i=t}e._pt=r},co=function(){function e(e,t,n,r,o,i,a,s,l){this.t=t,this.s=r,this.c=o,this.p=n,this.r=i||no,this.d=a||this,this.set=s||Qr,this.pr=l||0,this._next=e,e&&(e._prev=this)}return e.prototype.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=lo,this.m=e,this.mt=n,this.tween=t},e}();hn(cn+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",(function(e){return nn[e]=1})),Xt.TweenMax=Xt.TweenLite=Kr,Xt.TimelineLite=Xt.TimelineMax=Ir,Je=new Ir({sortChildren:!1,defaults:_t,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),kt.stringFilter=_r;var fo={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach((function(e){return hr(e)}))},timeline:function(e){return new Ir(e)},getTweensOf:function(e,t){return Je.getTweensOf(e,t)},getProperty:function(e,t,n,r){Lt(e)&&(e=nr(e)[0]);var o=dn(e||{}).get,i=n?kn:xn;return"native"===n&&(n=""),e?t?i((an[t]&&an[t].get||o)(e,t,n,r)):function(t,n,r){return i((an[t]&&an[t].get||o)(e,t,n,r))}:e},quickSetter:function(e,t,n){if((e=nr(e)).length>1){var r=e.map((function(e){return go.quickSetter(e,t,n)})),o=r.length;return function(e){for(var t=o;t--;)r[t](e)}}e=e[0]||{};var i=an[t],a=dn(e),s=a.harness&&(a.harness.aliases||{})[t]||t,l=i?function(t){var r=new i;it._pt=0,r.init(e,n?t+n:t,it,0,[e]),r.render(1,r),it._pt&&io(1,it)}:a.set(e,s);return i?l:function(t){return l(e,s,n?t+n:t,a,1)}},quickTo:function(e,t,n){var r,o=go.to(e,Sn(((r={})[t]="+=0.1",r.paused=!0,r),n||{})),i=function(e,n,r){return o.resetTo(t,e,n,r)};return i.tween=o,i},isTweening:function(e){return Je.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Lr(e.ease,_t.ease)),On(_t,e||{})},config:function(e){return On(kt,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,o=e.defaults,i=e.extendTimeline;(r||"").split(",").forEach((function(e){return e&&!an[e]&&!Xt[e]&&Jt(t+" effect requires "+e+" plugin.")})),sn[t]=function(e,t,r){return n(nr(e),_n(t||{},o),r)},i&&(Ir.prototype[t]=function(e,n,r){return this.add(sn[t](e,$t(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){Er[e]=Lr(t)},parseEase:function(e,t){return arguments.length?Lr(e,t):Er},getById:function(e){return Je.getById(e)},exportRoot:function(e,t){void 0===e&&(e={});var n,r,o=new Ir(e);for(o.smoothChildTiming=Ft(e.smoothChildTiming),Je.remove(o),o._dp=0,o._time=o._tTime=Je._time,n=Je._first;n;)r=n._next,!t&&!n._dur&&n instanceof Kr&&n.vars.onComplete===n._targets[0]||zn(o,n,n._start-n._delay),n=r;return zn(Je,o,0),o},utils:{wrap:function e(t,n,r){var o=n-t;return Bt(t)?lr(t,e(0,t.length),n):Kn(r,(function(e){return(o+(e-t)%o)%o+t}))},wrapYoyo:function e(t,n,r){var o=n-t,i=2*o;return Bt(t)?lr(t,e(0,t.length-1),n):Kn(r,(function(e){return t+((e=(i+(e-t)%i)%i||0)>o?i-e:e)}))},distribute:or,random:sr,snap:ar,normalize:function(e,t,n){return cr(e,t,0,1,n)},getUnit:Zn,clamp:function(e,t,n){return Kn(n,(function(n){return Qn(e,t,n)}))},splitColor:yr,toArray:nr,selector:function(e){return e=nr(e)[0]||Jt("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return nr(t,n.querySelectorAll?n:n===e?Jt("Invalid scope")||nt.createElement("div"):e)}},mapRange:cr,pipe:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return t.reduce((function(e,t){return t(e)}),e)}},unitize:function(e,t){return function(n){return e(parseFloat(n))+(t||Zn(n))}},interpolate:function e(t,n,r,o){var i=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!i){var a,s,l,u,c,f=Lt(t),d={};if(!0===r&&(o=1)&&(r=null),f)t={p:t},n={p:n};else if(Bt(t)&&!Bt(n)){for(l=[],u=t.length,c=u-2,s=1;s<u;s++)l.push(e(t[s-1],t[s]));u--,i=function(e){e*=u;var t=Math.min(c,~~e);return l[t](e-t)},r=n}else o||(t=Sn(Bt(t)?[]:{},t));if(!l){for(a in n)Vr.call(d,t,a,"get",n[a]);i=function(e){return io(e,d)||(f?t.p:t)}}}return Kn(r,i)},shuffle:rr},install:Qt,effects:sn,ticker:Sr,updateRoot:Ir.updateRoot,plugins:an,globalTimeline:Je,core:{PropTween:co,globals:en,Tween:Kr,Timeline:Ir,Animation:Ar,getCache:dn,_removeLinkedListItem:Tn,suppressOverwrites:function(e){return Ze=e}}};hn("to,from,fromTo,delayedCall,set,killTweensOf",(function(e){return fo[e]=Kr[e]})),Sr.add(Ir.updateRoot),it=fo.to({},{duration:0});var po=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},ho=function(e,t){return{name:e,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,o;if(Lt(n)&&(r={},hn(n,(function(e){return r[e]=1})),n=r),t){for(o in r={},n)r[o]=t(n[o]);n=r}!function(e,t){var n,r,o,i=e._targets;for(n in t)for(r=i.length;r--;)(o=e._ptLookup[r][n])&&(o=o.d)&&(o._pt&&(o=po(o,n)),o&&o.modifier&&o.modifier(t[n],e,i[r],n))}(e,n)}}}},go=fo.registerPlugin({name:"attr",init:function(e,t,n,r,o){var i,a;for(i in t)(a=this.add(e,"setAttribute",(e.getAttribute(i)||0)+"",t[i],r,o,0,0,i))&&(a.op=i),this._props.push(i)}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n])}},ho("roundProps",ir),ho("modifiers"),ho("snap",ar))||fo;Kr.version=Ir.version=go.version="3.10.4",rt=1,At()&&Or();Er.Power0,Er.Power1,Er.Power2,Er.Power3,Er.Power4,Er.Linear,Er.Quad,Er.Cubic,Er.Quart,Er.Quint,Er.Strong,Er.Elastic,Er.Back,Er.SteppedEase,Er.Bounce,Er.Sine;var mo,vo,yo,bo,wo,xo,ko,_o=Er.Expo,So=(Er.Circ,{}),Oo=180/Math.PI,Eo=Math.PI/180,Co=Math.atan2,jo=/([A-Z])/g,To=/(left|right|width|margin|padding|x)/i,Po=/[\s,\(]\S/,Mo={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Lo=function(e,t){return t.set(t.t,t.p,Math.round(1e4*(t.s+t.c*e))/1e4+t.u,t)},No=function(e,t){return t.set(t.t,t.p,1===e?t.e:Math.round(1e4*(t.s+t.c*e))/1e4+t.u,t)},Ro=function(e,t){return t.set(t.t,t.p,e?Math.round(1e4*(t.s+t.c*e))/1e4+t.u:t.b,t)},Do=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},$o=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Fo=function(e,t){return t.set(t.t,t.p,1!==e?t.b:t.e,t)},Ao=function(e,t,n){return e.style[t]=n},Io=function(e,t,n){return e.style.setProperty(t,n)},zo=function(e,t,n){return e._gsap[t]=n},Bo=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Uo=function(e,t,n,r,o){var i=e._gsap;i.scaleX=i.scaleY=n,i.renderTransform(o,i)},Vo=function(e,t,n,r,o){var i=e._gsap;i[t]=n,i.renderTransform(o,i)},Ho="transform",Wo=Ho+"Origin",qo=function(e,t){var n=vo.createElementNS?vo.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):vo.createElement(e);return n.style?n:vo.createElement(e)},Yo=function e(t,n,r){var o=getComputedStyle(t);return o[n]||o.getPropertyValue(n.replace(jo,"-$1").toLowerCase())||o.getPropertyValue(n)||!r&&e(t,Xo(n)||n,1)||""},Go="O,Moz,ms,Ms,Webkit".split(","),Xo=function(e,t,n){var r=(t||wo).style,o=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Go[o]+e in r););return o<0?null:(3===o?"ms":o>=0?Go[o]:"")+e},Ko=function(){"undefined"!=typeof window&&window.document&&(mo=window,vo=mo.document,yo=vo.documentElement,wo=qo("div")||{style:{}},qo("div"),Ho=Xo(Ho),Wo=Ho+"Origin",wo.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",ko=!!Xo("perspective"),bo=1)},Qo=function e(t){var n,r=qo("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),o=this.parentNode,i=this.nextSibling,a=this.style.cssText;if(yo.appendChild(r),r.appendChild(this),this.style.display="block",t)try{n=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=e}catch(e){}else this._gsapBBox&&(n=this._gsapBBox());return o&&(i?o.insertBefore(this,i):o.appendChild(this)),yo.removeChild(r),this.style.cssText=a,n},Zo=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Jo=function(e){var t;try{t=e.getBBox()}catch(n){t=Qo.call(e,!0)}return t&&(t.width||t.height)||e.getBBox===Qo||(t=Qo.call(e,!0)),!t||t.width||t.x||t.y?t:{x:+Zo(e,["x","cx","x1"])||0,y:+Zo(e,["y","cy","y1"])||0,width:0,height:0}},ei=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!Jo(e))},ti=function(e,t){if(t){var n=e.style;t in So&&t!==Wo&&(t=Ho),n.removeProperty?("ms"!==t.substr(0,2)&&"webkit"!==t.substr(0,6)||(t="-"+t),n.removeProperty(t.replace(jo,"-$1").toLowerCase())):n.removeAttribute(t)}},ni=function(e,t,n,r,o,i){var a=new co(e._pt,t,n,0,1,i?Fo:$o);return e._pt=a,a.b=r,a.e=o,e._props.push(n),a},ri={deg:1,rad:1,turn:1},oi=function e(t,n,r,o){var i,a,s,l,u=parseFloat(r)||0,c=(r+"").trim().substr((u+"").length)||"px",f=wo.style,d=To.test(n),p="svg"===t.tagName.toLowerCase(),h=(p?"client":"offset")+(d?"Width":"Height"),g=100,m="px"===o,v="%"===o;return o===c||!u||ri[o]||ri[c]?u:("px"!==c&&!m&&(u=e(t,n,r,"px")),l=t.getCTM&&ei(t),!v&&"%"!==c||!So[n]&&!~n.indexOf("adius")?(f[d?"width":"height"]=g+(m?c:o),a=~n.indexOf("adius")||"em"===o&&t.appendChild&&!p?t:t.parentNode,l&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==vo&&a.appendChild||(a=vo.body),(s=a._gsap)&&v&&s.width&&d&&s.time===Sr.time?gn(u/s.width*g):((v||"%"===c)&&(f.position=Yo(t,"position")),a===t&&(f.position="static"),a.appendChild(wo),i=wo[h],a.removeChild(wo),f.position="absolute",d&&v&&((s=dn(a)).time=Sr.time,s.width=a[h]),gn(m?i*u/g:i&&u?g/i*u:0))):(i=l?t.getBBox()[d?"width":"height"]:t[h],gn(v?u/i*g:u/100*i)))},ii=function(e,t,n,r){var o;return bo||Ko(),t in Mo&&"transform"!==t&&~(t=Mo[t]).indexOf(",")&&(t=t.split(",")[0]),So[t]&&"transform"!==t?(o=mi(e,r),o="transformOrigin"!==t?o[t]:o.svg?o.origin:vi(Yo(e,Wo))+" "+o.zOrigin+"px"):(!(o=e.style[t])||"auto"===o||r||~(o+"").indexOf("calc("))&&(o=ui[t]&&ui[t](e,t,n)||Yo(e,t)||pn(e,t)||("opacity"===t?1:0)),n&&!~(o+"").trim().indexOf(" ")?oi(e,t,o,n)+n:o},ai=function(e,t,n,r){if(!n||"none"===n){var o=Xo(t,e,1),i=o&&Yo(e,o,1);i&&i!==n?(t=o,n=i):"borderColor"===t&&(n=Yo(e,"borderTopColor"))}var a,s,l,u,c,f,d,p,h,g,m,v=new co(this._pt,e.style,t,0,1,oo),y=0,b=0;if(v.b=n,v.e=r,n+="","auto"===(r+="")&&(e.style[t]=r,r=Yo(e,t)||r,e.style[t]=n),_r(a=[n,r]),r=a[1],l=(n=a[0]).match(Ht)||[],(r.match(Ht)||[]).length){for(;s=Ht.exec(r);)d=s[0],h=r.substring(y,s.index),c?c=(c+1)%5:"rgba("!==h.substr(-5)&&"hsla("!==h.substr(-5)||(c=1),d!==(f=l[b++]||"")&&(u=parseFloat(f)||0,m=f.substr((u+"").length),"="===d.charAt(1)&&(d=vn(u,d)+m),p=parseFloat(d),g=d.substr((p+"").length),y=Ht.lastIndex-g.length,g||(g=g||kt.units[t]||m,y===r.length&&(r+=g,v.e+=g)),m!==g&&(u=oi(e,t,f,g)||0),v._pt={_next:v._pt,p:h||1===b?h:",",s:u,c:p-u,m:c&&c<4||"zIndex"===t?Math.round:0});v.c=y<r.length?r.substring(y,r.length):""}else v.r="display"===t&&"none"===r?Fo:$o;return qt.test(r)&&(v.e=0),this._pt=v,v},si={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},li=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n,r,o,i=t.t,a=i.style,s=t.u,l=i._gsap;if("all"===s||!0===s)a.cssText="",r=1;else for(o=(s=s.split(",")).length;--o>-1;)n=s[o],So[n]&&(r=1,n="transformOrigin"===n?Wo:Ho),ti(i,n);r&&(ti(i,Ho),l&&(l.svg&&i.removeAttribute("transform"),mi(i,1),l.uncache=1))}},ui={clearProps:function(e,t,n,r,o){if("isFromStart"!==o.data){var i=e._pt=new co(e._pt,t,n,0,0,li);return i.u=r,i.pr=-10,i.tween=o,e._props.push(n),1}}},ci=[1,0,0,1,0,0],fi={},di=function(e){return"matrix(1, 0, 0, 1, 0, 0)"===e||"none"===e||!e},pi=function(e){var t=Yo(e,Ho);return di(t)?ci:t.substr(7).match(Vt).map(gn)},hi=function(e,t){var n,r,o,i,a=e._gsap||dn(e),s=e.style,l=pi(e);return a.svg&&e.getAttribute("transform")?"1,0,0,1,0,0"===(l=[(o=e.transform.baseVal.consolidate().matrix).a,o.b,o.c,o.d,o.e,o.f]).join(",")?ci:l:(l!==ci||e.offsetParent||e===yo||a.svg||(o=s.display,s.display="block",(n=e.parentNode)&&e.offsetParent||(i=1,r=e.nextSibling,yo.appendChild(e)),l=pi(e),o?s.display=o:ti(e,"display"),i&&(r?n.insertBefore(e,r):n?n.appendChild(e):yo.removeChild(e))),t&&l.length>6?[l[0],l[1],l[4],l[5],l[12],l[13]]:l)},gi=function(e,t,n,r,o,i){var a,s,l,u=e._gsap,c=o||hi(e,!0),f=u.xOrigin||0,d=u.yOrigin||0,p=u.xOffset||0,h=u.yOffset||0,g=c[0],m=c[1],v=c[2],y=c[3],b=c[4],w=c[5],x=t.split(" "),k=parseFloat(x[0])||0,_=parseFloat(x[1])||0;n?c!==ci&&(s=g*y-m*v)&&(l=k*(-m/s)+_*(g/s)-(g*w-m*b)/s,k=k*(y/s)+_*(-v/s)+(v*w-y*b)/s,_=l):(k=(a=Jo(e)).x+(~x[0].indexOf("%")?k/100*a.width:k),_=a.y+(~(x[1]||x[0]).indexOf("%")?_/100*a.height:_)),r||!1!==r&&u.smooth?(b=k-f,w=_-d,u.xOffset=p+(b*g+w*v)-b,u.yOffset=h+(b*m+w*y)-w):u.xOffset=u.yOffset=0,u.xOrigin=k,u.yOrigin=_,u.smooth=!!r,u.origin=t,u.originIsAbsolute=!!n,e.style[Wo]="0px 0px",i&&(ni(i,u,"xOrigin",f,k),ni(i,u,"yOrigin",d,_),ni(i,u,"xOffset",p,u.xOffset),ni(i,u,"yOffset",h,u.yOffset)),e.setAttribute("data-svg-origin",k+" "+_)},mi=function(e,t){var n=e._gsap||new Fr(e);if("x"in n&&!t&&!n.uncache)return n;var r,o,i,a,s,l,u,c,f,d,p,h,g,m,v,y,b,w,x,k,_,S,O,E,C,j,T,P,M,L,N,R,D=e.style,$=n.scaleX<0,F="px",A="deg",I=Yo(e,Wo)||"0";return r=o=i=l=u=c=f=d=p=0,a=s=1,n.svg=!(!e.getCTM||!ei(e)),m=hi(e,n.svg),n.svg&&(E=(!n.uncache||"0px 0px"===I)&&!t&&e.getAttribute("data-svg-origin"),gi(e,E||I,!!E||n.originIsAbsolute,!1!==n.smooth,m)),h=n.xOrigin||0,g=n.yOrigin||0,m!==ci&&(w=m[0],x=m[1],k=m[2],_=m[3],r=S=m[4],o=O=m[5],6===m.length?(a=Math.sqrt(w*w+x*x),s=Math.sqrt(_*_+k*k),l=w||x?Co(x,w)*Oo:0,(f=k||_?Co(k,_)*Oo+l:0)&&(s*=Math.abs(Math.cos(f*Eo))),n.svg&&(r-=h-(h*w+g*k),o-=g-(h*x+g*_))):(R=m[6],L=m[7],T=m[8],P=m[9],M=m[10],N=m[11],r=m[12],o=m[13],i=m[14],u=(v=Co(R,M))*Oo,v&&(E=S*(y=Math.cos(-v))+T*(b=Math.sin(-v)),C=O*y+P*b,j=R*y+M*b,T=S*-b+T*y,P=O*-b+P*y,M=R*-b+M*y,N=L*-b+N*y,S=E,O=C,R=j),c=(v=Co(-k,M))*Oo,v&&(y=Math.cos(-v),N=_*(b=Math.sin(-v))+N*y,w=E=w*y-T*b,x=C=x*y-P*b,k=j=k*y-M*b),l=(v=Co(x,w))*Oo,v&&(E=w*(y=Math.cos(v))+x*(b=Math.sin(v)),C=S*y+O*b,x=x*y-w*b,O=O*y-S*b,w=E,S=C),u&&Math.abs(u)+Math.abs(l)>359.9&&(u=l=0,c=180-c),a=gn(Math.sqrt(w*w+x*x+k*k)),s=gn(Math.sqrt(O*O+R*R)),v=Co(S,O),f=Math.abs(v)>2e-4?v*Oo:0,p=N?1/(N<0?-N:N):0),n.svg&&(E=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!di(Yo(e,Ho)),E&&e.setAttribute("transform",E))),Math.abs(f)>90&&Math.abs(f)<270&&($?(a*=-1,f+=l<=0?180:-180,l+=l<=0?180:-180):(s*=-1,f+=f<=0?180:-180)),t=t||n.uncache,n.x=r-((n.xPercent=r&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-r)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+F,n.y=o-((n.yPercent=o&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-o)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+F,n.z=i+F,n.scaleX=gn(a),n.scaleY=gn(s),n.rotation=gn(l)+A,n.rotationX=gn(u)+A,n.rotationY=gn(c)+A,n.skewX=f+A,n.skewY=d+A,n.transformPerspective=p+F,(n.zOrigin=parseFloat(I.split(" ")[2])||0)&&(D[Wo]=vi(I)),n.xOffset=n.yOffset=0,n.force3D=kt.force3D,n.renderTransform=n.svg?Si:ko?_i:bi,n.uncache=0,n},vi=function(e){return(e=e.split(" "))[0]+" "+e[1]},yi=function(e,t,n){var r=Zn(t);return gn(parseFloat(t)+parseFloat(oi(e,"x",n+"px",r)))+r},bi=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,_i(e,t)},wi="0deg",xi="0px",ki=") ",_i=function(e,t){var n=t||this,r=n.xPercent,o=n.yPercent,i=n.x,a=n.y,s=n.z,l=n.rotation,u=n.rotationY,c=n.rotationX,f=n.skewX,d=n.skewY,p=n.scaleX,h=n.scaleY,g=n.transformPerspective,m=n.force3D,v=n.target,y=n.zOrigin,b="",w="auto"===m&&e&&1!==e||!0===m;if(y&&(c!==wi||u!==wi)){var x,k=parseFloat(u)*Eo,_=Math.sin(k),S=Math.cos(k);k=parseFloat(c)*Eo,x=Math.cos(k),i=yi(v,i,_*x*-y),a=yi(v,a,-Math.sin(k)*-y),s=yi(v,s,S*x*-y+y)}g!==xi&&(b+="perspective("+g+ki),(r||o)&&(b+="translate("+r+"%, "+o+"%) "),(w||i!==xi||a!==xi||s!==xi)&&(b+=s!==xi||w?"translate3d("+i+", "+a+", "+s+") ":"translate("+i+", "+a+ki),l!==wi&&(b+="rotate("+l+ki),u!==wi&&(b+="rotateY("+u+ki),c!==wi&&(b+="rotateX("+c+ki),f===wi&&d===wi||(b+="skew("+f+", "+d+ki),1===p&&1===h||(b+="scale("+p+", "+h+ki),v.style[Ho]=b||"translate(0, 0)"},Si=function(e,t){var n,r,o,i,a,s=t||this,l=s.xPercent,u=s.yPercent,c=s.x,f=s.y,d=s.rotation,p=s.skewX,h=s.skewY,g=s.scaleX,m=s.scaleY,v=s.target,y=s.xOrigin,b=s.yOrigin,w=s.xOffset,x=s.yOffset,k=s.forceCSS,_=parseFloat(c),S=parseFloat(f);d=parseFloat(d),p=parseFloat(p),(h=parseFloat(h))&&(p+=h=parseFloat(h),d+=h),d||p?(d*=Eo,p*=Eo,n=Math.cos(d)*g,r=Math.sin(d)*g,o=Math.sin(d-p)*-m,i=Math.cos(d-p)*m,p&&(h*=Eo,a=Math.tan(p-h),o*=a=Math.sqrt(1+a*a),i*=a,h&&(a=Math.tan(h),n*=a=Math.sqrt(1+a*a),r*=a)),n=gn(n),r=gn(r),o=gn(o),i=gn(i)):(n=g,i=m,r=o=0),(_&&!~(c+"").indexOf("px")||S&&!~(f+"").indexOf("px"))&&(_=oi(v,"x",c,"px"),S=oi(v,"y",f,"px")),(y||b||w||x)&&(_=gn(_+y-(y*n+b*o)+w),S=gn(S+b-(y*r+b*i)+x)),(l||u)&&(a=v.getBBox(),_=gn(_+l/100*a.width),S=gn(S+u/100*a.height)),a="matrix("+n+","+r+","+o+","+i+","+_+","+S+")",v.setAttribute("transform",a),k&&(v.style[Ho]=a)},Oi=function(e,t,n,r,o){var i,a,s=360,l=Lt(o),u=parseFloat(o)*(l&&~o.indexOf("rad")?Oo:1)-r,c=r+u+"deg";return l&&("short"===(i=o.split("_")[1])&&(u%=s)!==u%180&&(u+=u<0?s:-360),"cw"===i&&u<0?u=(u+36e9)%s-~~(u/s)*s:"ccw"===i&&u>0&&(u=(u-36e9)%s-~~(u/s)*s)),e._pt=a=new co(e._pt,t,n,r,u,No),a.e=c,a.u="deg",e._props.push(n),a},Ei=function(e,t){for(var n in t)e[n]=t[n];return e},Ci=function(e,t,n){var r,o,i,a,s,l,u,c=Ei({},n._gsap),f=n.style;for(o in c.svg?(i=n.getAttribute("transform"),n.setAttribute("transform",""),f[Ho]=t,r=mi(n,1),ti(n,Ho),n.setAttribute("transform",i)):(i=getComputedStyle(n)[Ho],f[Ho]=t,r=mi(n,1),f[Ho]=i),So)(i=c[o])!==(a=r[o])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(o)<0&&(s=Zn(i)!==(u=Zn(a))?oi(n,o,i,u):parseFloat(i),l=parseFloat(a),e._pt=new co(e._pt,r,o,s,l-s,Lo),e._pt.u=u||0,e._props.push(o));Ei(r,c)};hn("padding,margin,Width,Radius",(function(e,t){var n="Top",r="Right",o="Bottom",i="Left",a=(t<3?[n,r,o,i]:[n+i,n+r,o+r,o+i]).map((function(n){return t<2?e+n:"border"+n+e}));ui[t>1?"border"+e:e]=function(e,t,n,r,o){var i,s;if(arguments.length<4)return i=a.map((function(t){return ii(e,t,n)})),5===(s=i.join(" ")).split(i[0]).length?i[0]:s;i=(r+"").split(" "),s={},a.forEach((function(e,t){return s[e]=i[t]=i[t]||i[(t-1)/2|0]})),e.init(t,s,o)}}));var ji={name:"css",register:Ko,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,o){var i,a,s,l,u,c,f,d,p,h,g,m,v,y,b,w,x,k,_,S=this._props,O=e.style,E=n.vars.startAt;for(f in bo||Ko(),t)if("autoRound"!==f&&(a=t[f],!an[f]||!Hr(f,t,n,r,e,o)))if(u=typeof a,c=ui[f],"function"===u&&(u=typeof(a=a.call(n,r,e,o))),"string"===u&&~a.indexOf("random(")&&(a=ur(a)),c)c(this,e,f,a,n)&&(b=1);else if("--"===f.substr(0,2))i=(getComputedStyle(e).getPropertyValue(f)+"").trim(),a+="",xr.lastIndex=0,xr.test(i)||(d=Zn(i),p=Zn(a)),p?d!==p&&(i=oi(e,f,i,p)+p):d&&(a+=d),this.add(O,"setProperty",i,a,r,o,0,0,f),S.push(f);else if("undefined"!==u){if(E&&f in E?(i="function"==typeof E[f]?E[f].call(n,r,e,o):E[f],Lt(i)&&~i.indexOf("random(")&&(i=ur(i)),Zn(i+"")||(i+=kt.units[f]||Zn(ii(e,f))||""),"="===(i+"").charAt(1)&&(i=ii(e,f))):i=ii(e,f),l=parseFloat(i),(h="string"===u&&"="===a.charAt(1)&&a.substr(0,2))&&(a=a.substr(2)),s=parseFloat(a),f in Mo&&("autoAlpha"===f&&(1===l&&"hidden"===ii(e,"visibility")&&s&&(l=0),ni(this,O,"visibility",l?"inherit":"hidden",s?"inherit":"hidden",!s)),"scale"!==f&&"transform"!==f&&~(f=Mo[f]).indexOf(",")&&(f=f.split(",")[0])),g=f in So)if(m||((v=e._gsap).renderTransform&&!t.parseTransform||mi(e,t.parseTransform),y=!1!==t.smoothOrigin&&v.smooth,(m=this._pt=new co(this._pt,O,Ho,0,1,v.renderTransform,v,0,-1)).dep=1),"scale"===f)this._pt=new co(this._pt,v,"scaleY",v.scaleY,(h?vn(v.scaleY,h+s):s)-v.scaleY||0),S.push("scaleY",f),f+="X";else{if("transformOrigin"===f){x=void 0,k=void 0,_=void 0,x=(w=a).split(" "),k=x[0],_=x[1]||"50%","top"!==k&&"bottom"!==k&&"left"!==_&&"right"!==_||(w=k,k=_,_=w),x[0]=si[k]||k,x[1]=si[_]||_,a=x.join(" "),v.svg?gi(e,a,0,y,0,this):((p=parseFloat(a.split(" ")[2])||0)!==v.zOrigin&&ni(this,v,"zOrigin",v.zOrigin,p),ni(this,O,f,vi(i),vi(a)));continue}if("svgOrigin"===f){gi(e,a,1,y,0,this);continue}if(f in fi){Oi(this,v,f,l,h?vn(l,h+a):a);continue}if("smoothOrigin"===f){ni(this,v,"smooth",v.smooth,a);continue}if("force3D"===f){v[f]=a;continue}if("transform"===f){Ci(this,a,e);continue}}else f in O||(f=Xo(f)||f);if(g||(s||0===s)&&(l||0===l)&&!Po.test(a)&&f in O)s||(s=0),(d=(i+"").substr((l+"").length))!==(p=Zn(a)||(f in kt.units?kt.units[f]:d))&&(l=oi(e,f,i,p)),this._pt=new co(this._pt,g?v:O,f,l,(h?vn(l,h+s):s)-l,g||"px"!==p&&"zIndex"!==f||!1===t.autoRound?Lo:Do),this._pt.u=p||0,d!==p&&"%"!==p&&(this._pt.b=i,this._pt.r=Ro);else if(f in O)ai.call(this,e,f,i,h?h+a:a);else{if(!(f in e)){Zt(f,a);continue}this.add(e,f,i||e[f],h?h+a:a,r,o)}S.push(f)}b&&uo(this)},get:ii,aliases:Mo,getSetter:function(e,t,n){var r=Mo[t];return r&&r.indexOf(",")<0&&(t=r),t in So&&t!==Wo&&(e._gsap.x||ii(e,"x"))?n&&xo===n?"scale"===t?Bo:zo:(xo=n||{})&&("scale"===t?Uo:Vo):e.style&&!Dt(e.style[t])?Ao:~t.indexOf("-")?Io:to(e,t)},core:{_removeProperty:ti,_getMatrix:hi}};go.utils.checkPrefix=Xo,function(e,t,n,r){var o=hn(e+","+t+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",(function(e){So[e]=1}));hn(t,(function(e){kt.units[e]="deg",fi[e]=1})),Mo[o[13]]=e+","+t,hn("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",(function(e){var t=e.split(":");Mo[t[1]]=o[t[0]]}))}("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY"),hn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",(function(e){kt.units[e]="px"})),go.registerPlugin(ji);var Ti=go.registerPlugin(ji)||go;Ti.core.Tween;function Pi(e){if(Array.isArray(e))return e}function Mi(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Li(e,t){if(e){if("string"==typeof e)return Mi(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Mi(e,t):void 0}}function Ni(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function Ri(e,t){return Pi(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(e,t)||Li(e,t)||Ni()}function Di(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function $i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Fi(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Ai(e,t,n){return t&&Fi(e.prototype,t),n&&Fi(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function Ii(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function zi(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ii(Object(n),!0).forEach((function(t){Di(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ii(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Bi,Ui={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0},Vi=(0,n.createContext)();function Hi(){return Ui}var Wi=function(){function e(){$i(this,e),this.usedNamespaces={}}return Ai(e,[{key:"addUsedNamespaces",value:function(e){var t=this;e.forEach((function(e){t.usedNamespaces[e]||(t.usedNamespaces[e]=!0)}))}},{key:"getUsedNamespaces",value:function(){return Object.keys(this.usedNamespaces)}}]),e}();function qi(){return Bi}var Yi={type:"3rdParty",init:function(e){!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Ui=zi(zi({},Ui),e)}(e.options.react),function(e){Bi=e}(e)}};function Gi(){if(console&&console.warn){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];"string"==typeof n[0]&&(n[0]="react-i18next:: ".concat(n[0])),(e=console).warn.apply(e,n)}}var Xi={};function Ki(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];"string"==typeof t[0]&&Xi[t[0]]||("string"==typeof t[0]&&(Xi[t[0]]=new Date),Gi.apply(void 0,t))}function Qi(e,t,n){e.loadNamespaces(t,(function(){if(e.isInitialized)n();else{e.on("initialized",(function t(){setTimeout((function(){e.off("initialized",t)}),0),n()}))}}))}function Zi(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t.languages[0],o=!!t.options&&t.options.fallbackLng,i=t.languages[t.languages.length-1];if("cimode"===r.toLowerCase())return!0;var a=function(e,n){var r=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===r||2===r};return!(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!a(t.isLanguageChangingTo,e))&&(!!t.hasResourceBundle(r,e)||(!(t.services.backendConnector.backend&&(!t.options.resources||t.options.partialBundledLanguages))||!(!a(r,e)||o&&!a(i,e))))}function Ji(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t.languages||!t.languages.length)return Ki("i18n.languages were undefined or empty",t.languages),!0;var r=void 0!==t.options.ignoreJSONStructure;return r?t.hasLoadedNamespace(e,{precheck:function(t,r){if(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!r(t.isLanguageChangingTo,e))return!1}}):Zi(e,t,n)}function ea(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ta(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ea(Object(n),!0).forEach((function(t){Di(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ea(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var na=function(e,t){var r=(0,n.useRef)();return(0,n.useEffect)((function(){r.current=t?r.current:e}),[e,t]),r.current};function ra(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.i18n,o=(0,n.useContext)(Vi)||{},i=o.i18n,a=o.defaultNS,s=r||i||qi();if(s&&!s.reportNamespaces&&(s.reportNamespaces=new Wi),!s){Ki("You will need to pass in an i18next instance by using initReactI18next");var l=function(e){return Array.isArray(e)?e[e.length-1]:e},u=[l,{},!1];return u.t=l,u.i18n={},u.ready=!1,u}s.options.react&&void 0!==s.options.react.wait&&Ki("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var c=ta(ta(ta({},Hi()),s.options.react),t),f=c.useSuspense,d=c.keyPrefix,p=e||a||s.options&&s.options.defaultNS;p="string"==typeof p?[p]:p||["translation"],s.reportNamespaces.addUsedNamespaces&&s.reportNamespaces.addUsedNamespaces(p);var h=(s.isInitialized||s.initializedStoreOnce)&&p.every((function(e){return Ji(e,s,c)}));function g(){return s.getFixedT(null,"fallback"===c.nsMode?p:p[0],d)}var m=(0,n.useState)(g),v=Ri(m,2),y=v[0],b=v[1],w=p.join(),x=na(w),k=(0,n.useRef)(!0);(0,n.useEffect)((function(){var e=c.bindI18n,t=c.bindI18nStore;function n(){k.current&&b(g)}return k.current=!0,h||f||Qi(s,p,(function(){k.current&&b(g)})),h&&x&&x!==w&&k.current&&b(g),e&&s&&s.on(e,n),t&&s&&s.store.on(t,n),function(){k.current=!1,e&&s&&e.split(" ").forEach((function(e){return s.off(e,n)})),t&&s&&t.split(" ").forEach((function(e){return s.store.off(e,n)}))}}),[s,w]);var _=(0,n.useRef)(!0);(0,n.useEffect)((function(){k.current&&!_.current&&b(g),_.current=!1}),[s]);var S=[y,s,h];if(S.t=y,S.i18n=s,S.ready=h,h)return S;if(!h&&!f)return S;throw new Promise((function(e){Qi(s,p,(function(){e()}))}))}const oa={mobile:1,mobile_medium:393,mobile_iphone_16_pro:402,mobile_max:430,mobile_iphone_16_pro_max:440,tablet:744,desktop:1020},ia=Object.keys(oa).map((e=>[e,oa[e]])).reduce(((e,[t,n])=>(e[t]=`@media (min-width: ${n}px)`,e)),{}),aa=Y.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`,sa=qe.div`
  display: flex;
  /* MOBILE */
  width: 18px;
  height: 18px;
  /* TABLET */
  ${ia.tablet} {
    width: 16px;
    height: 16px;
  }

  svg {
    animation: ${aa} 1.4s infinite linear;
    /* MOBILE */
    width: 18px;
    height: 18px;
    /* TABLET */
    ${ia.tablet} {
      width: 16px;
      height: 16px;
    }
  }

  svg circle {
    stroke: ${e=>e.darkMode?se:ae};
  }
`,la=({darkMode:t})=>(0,e.jsx)(sa,Object.assign({darkMode:t},{children:(0,e.jsxs)("svg",Object.assign({width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},{children:[(0,e.jsx)("mask",Object.assign({id:"mask0_21670_1867","mask-type":"alpha",maskUnits:"userSpaceOnUse",x:"1",y:"0",width:"15",height:"16"},{children:(0,e.jsx)("path",{d:"M8 0C9.33946 1.59729e-08 10.6575 0.336323 11.8332 0.978122C13.0089 1.61992 14.0046 2.54665 14.729 3.67331C15.4535 4.79996 15.8834 6.09049 15.9794 7.4265C16.0754 8.76252 15.8345 10.1013 15.2786 11.3199C14.7227 12.5386 13.8698 13.5982 12.7979 14.4015C11.7261 15.2049 10.4697 15.7262 9.14405 15.9178C7.81836 16.1093 6.46578 15.9649 5.21039 15.4979C3.95501 15.0308 2.83699 14.256 1.95888 13.2445L8 8V0Z",fill:"#D9D9D9"})})),(0,e.jsx)("g",Object.assign({mask:"url(#mask0_21670_1867)"},{children:(0,e.jsx)("circle",{cx:"8",cy:"8",r:"7.25",strokeWidth:"1.5"})}))]}))})),ua="24px",ca="20px",fa="16px",da="14px",pa="12px",ha=qe.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  /* MOBILE */
  padding: 19px 24px;
  /* TABLET */
  ${ia.tablet} {
    padding: 16px;
  }
`,ga=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  color: ${e=>e.darkMode?re:ne};
  /* MOBILE */
  font-size: ${fa};
  line-height: 18px;
  margin-left: 12px;
  /* TABLET */
  ${ia.tablet} {
    font-size: ${da};
    line-height: 16px;
    margin-left: 8px;
  }
`,ma=({baseHeight:t})=>{const{t:r}=ra(),{transitionPushToFonts:o}=W(),{fontFamiliesToDisplay:i}=B(),{settings:a}=F(),{darkMode:s}=a,l=(0,n.useRef)(null),[u,c]=(0,n.useState)(!0);return(0,n.useEffect)((()=>{!b(i)&&l.current&&Ti.to(l.current,{duration:y,y:t,ease:_o.easeInOut,onComplete:()=>{c(!1)}})}),[t,i]),u&&!o?(0,e.jsxs)(ha,Object.assign({ref:l},{children:[(0,e.jsx)(la,{darkMode:s}),(0,e.jsx)(ga,Object.assign({darkMode:s},{children:r("base.loading")}))]})):null},va=ma,ya=qe.div`
  width: 100%;
  height: 100%;

  svg path {
    fill: ${e=>e.darkMode?re:ne};
    ${e=>e.color&&Y.css`
        fill: ${e.color};
      `}
  }
`,ba=({title:t,darkMode:n,color:r})=>(0,e.jsx)(ya,Object.assign({darkMode:n,color:r},{children:(0,e.jsxs)("svg",Object.assign({width:"24",height:"27",viewBox:"0 0 24 27",fill:"none",xmlns:"http://www.w3.org/2000/svg"},{children:[t&&(0,e.jsx)("title",{children:t}),(0,e.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M16.3103 8.06944C15.9563 8.74044 15.357 9.06985 14.9959 9.10435C14.6349 9.13877 13.9709 8.88964 13.9245 8.45852C13.882 8.06205 15.4662 6.77566 16.4313 6.73515C16.5648 6.72955 16.6716 6.84677 16.6569 6.97827C16.6306 7.21311 16.5506 7.61404 16.3103 8.06944ZM13.5041 8.50979C13.3391 8.9742 12.0042 9.06536 11.6293 8.98094C11.2543 8.8966 10.5448 8.36473 10.2324 7.64405C10.003 7.11438 10.0281 6.67383 10.0676 6.44638C10.0851 6.34548 10.1917 6.27055 10.3105 6.27607C11.7125 6.34125 13.6691 8.0453 13.5041 8.50979ZM23.6559 8.11267C23.2962 7.8948 23.1338 8.36513 22.8554 8.36513C22.7789 7.67237 23.4976 7.18524 23.6151 7.1138C23.7326 7.0422 23.8231 6.59525 23.3033 6.59979C22.9236 6.59979 22.5754 7.14059 22.5754 7.14059C22.5076 6.77408 22.8874 6.43436 22.9914 6.34498C23.2897 6.12151 22.7653 5.77732 22.3993 6.02312C21.9607 6.37632 21.8206 6.85006 21.8206 6.85006C21.7212 6.61757 21.9336 6.14829 21.997 6.00973C22.0602 5.87116 21.8116 5.63429 21.4273 5.99633C20.9753 6.4165 20.8307 7.2031 20.8307 7.2031C19.8492 6.92288 17.7037 6.92888 16.9413 7.24117C16.9413 7.24117 17.496 3.66585 13.6763 1.93355C12.5217 1.40997 11.0527 1.5021 10.1043 2.30956C10.2067 1.93729 10.2473 0.995319 9.91993 0.535294C9.91993 0.535294 8.71001 -0.0639476 7.88841 0.00562026C9.42391 1.53806 9.36447 2.42767 9.33517 3.07408C8.88438 1.42839 7.31309 0.106847 5.56167 0.166268C5.84901 1.06562 5.59115 2.2805 5.59115 2.2805C6.94005 2.07504 8.23107 2.74953 8.7353 4.70636C8.61158 4.95671 8.56183 5.55092 8.68029 5.76368L8.09118 5.34043C6.41653 4.10233 2.8252 2.80335 1.85796 2.71617C0.890637 2.62899 0.131341 3.79711 0.0131247 4.62462C-0.104928 5.45213 0.60035 5.85655 1.0476 6.059C1.49486 6.26145 2.54772 6.65394 2.80394 5.90233C4.94333 6.4553 6.97288 9.10749 6.74351 12.7515C5.52941 14.4869 3.3328 19.7356 5.81551 23.0751C5.29766 24.593 5.22681 26.1883 5.93381 26.4182C6.56487 26.6013 8.44985 22.7893 8.58244 22.1337C8.27934 19.7454 9.67175 18.1563 11.8976 17.4726C12.5796 18.1375 12.7106 20.0837 12.777 20.8142C12.8432 21.5448 13.2615 21.4125 13.4226 21.2814C15.1559 19.9514 16.9651 18.9305 17.1735 18.8556C18.0733 18.3405 18.1302 17.7598 17.2587 17.7223C16.3873 17.6849 15.6043 17.8347 15.6043 17.8347C16.9587 15.6338 19.1815 12.7331 15.8473 13.1423C16.4399 10.992 18.6557 8.92711 22.194 9.21813C23.6307 9.25027 24.0155 8.33063 23.6559 8.11267Z"})]}))})),wa=qe.i`
  display: ${e=>{var t;return null!==(t=e.display)&&void 0!==t?t:"inline"}};
  color: ${e=>e.darkMode?re:ne};
  font-size: ${e=>{var t;return null!==(t=e.fontSize)&&void 0!==t?t:"16px"}};
  line-height: ${e=>{var t;return null!==(t=e.lineHeight)&&void 0!==t?t:1}};

  /* Custom color */
  ${e=>e.color&&Y.css`
      color: ${e.color};
    `}
`;var xa=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};const ka=t=>{var{label:n,display:r,darkMode:o,color:i,fontSize:a,lineHeight:s}=t,l=xa(t,["label","display","darkMode","color","fontSize","lineHeight"]);return(0,e.jsx)(wa,Object.assign({className:`icon-${n}`,"data-testid":`${n}`,display:r,darkMode:o,color:i,fontSize:a,lineHeight:s},l))},_a="cubic-bezier(0.165, 0.840, 0.440, 1.000)",Sa="cubic-bezier(0.190, 1.000, 0.220, 1.000)",Oa=qe.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &:disabled {
    pointer-events: none;
  }

  /* BUTTON SIZE */
  ${e=>e.buttonSize&&Y.css`
      &::before {
        position: absolute;
        content: '';
        width: ${e.buttonSize};
        height: ${e.buttonSize};
        top: 50%;
        left: 50%;
        transform-origin: top left;
        transform: translate(-50%, -50%);
      }
    `}

  [class^='icon-'],
  [class*=' icon-'] {
    // RENDER PRIMARY
    ${e=>"primary"===e.render&&Y.css`
        color: ${e.darkMode?se:ae};
      `}
    // RENDER SECONDARY
    ${e=>"secondary"===e.render&&Y.css`
        color: ${e.darkMode?re:ne};
      `}
    // CUSTOM COLOR
    ${e=>e.color&&Y.css`
        color: ${e.color};
      `}
    transition: color ${e=>{var t;return null!==(t=e.timeTransition)&&void 0!==t?t:"0.25s"}} ${_a};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      [class^='icon-'],
      [class*=' icon-'] {
        // RENDER PRIMARY
        ${e=>"primary"===e.render&&Y.css`
            color: ${e.darkMode?re:ne};
          `}
        // RENDER SECONDARY
        ${e=>"secondary"===e.render&&Y.css`
            color: ${e.darkMode?ie:oe};
          `}
        // CUSTOM COLOR
        ${e=>e.colorHover&&Y.css`
            color: ${e.colorHover};
          `}
      }
    }
  }
`;var Ea=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};const Ca=t=>{var{label:n,render:r="primary",darkMode:o,color:i,colorHover:a,fontSize:s,buttonSize:l,timeTransition:u,type:c="button"}=t,f=Ea(t,["label","render","darkMode","color","colorHover","fontSize","buttonSize","timeTransition","type"]);return(0,e.jsx)(Oa,Object.assign({className:"icon-button",buttonSize:l,render:r,darkMode:o,color:i,colorHover:a,timeTransition:u,type:c},f,{children:(0,e.jsx)(ka,{label:n,fontSize:s})}))},ja=qe.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  /* MOBILE */
  height: 56px;
  /* TABLET */
  ${ia.tablet} {
    height: 48px;
  }

  /* displayPush = false, we display fonts directly after loading state */
  ${e=>!e.transitionPushToFonts&&Y.css`
      /* MOBILE */
      transform: translateY(-56px);
      /* TABLET */
      ${ia.tablet} {
        transform: translateY(-48px);
      }
    `}
`,Ta=qe.div`
  position: absolute;

  /* MOBILE */
  top: 16px;
  left: 24px;
  width: 24px;
  height: 24px;

  /* TABLET */
  ${ia.tablet} {
    top: 16px;
    left: 16px;
    width: 16px;
    height: 16px;
  }

  a::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  svg {
    /* MOBILE */
    width: 24px;
    height: 24px;

    /* TABLET */
    ${ia.tablet} {
      width: 16px;
      height: 16px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      svg path {
        fill: ${e=>e.darkMode?ie:oe};
      }
    }
  }
`,Pa=qe.div`
  position: absolute;
  /* MOBILE */
  top: 18px;
  right: 112px;
  /* TABLET */
  ${ia.tablet} {
    top: 16px;
    right: 72px;
  }

  [class^='icon-'],
  [class*=' icon-'] {
    /* MOBILE */
    font-size: 19px;
    /* TABLET */
    ${ia.tablet} {
      font-size: 16px;
    }
  }
`,Ma=qe.div`
  position: absolute;
  /* MOBILE */
  top: 18px;
  right: 68px;
  /* TABLET */
  ${ia.tablet} {
    top: 16px;
    right: 44px;
  }

  [class^='icon-'],
  [class*=' icon-'] {
    /* MOBILE */
    font-size: 19px;
    /* TABLET */
    ${ia.tablet} {
      font-size: 16px;
    }
  }
`,La=()=>{const{openSettings:t,setOpenSettings:r}=T(),{machineId:o,settings:i}=F(),{dragStatus:a,transitionPushToFonts:s}=W(),{fontFamiliesToDisplay:l}=B(),{darkMode:u}=i,c=(0,n.useRef)(null),f=(0,n.useCallback)((e=>{a||window.open(_(o),"_blank")}),[a,o]),d=(0,n.useCallback)((()=>{a||window.open((e=>{let t="https://fonts.ninja/bookmarks";return e&&(t+=`?machineId=${e}`),t})(o),"_blank")}),[a,o]),p=(0,n.useCallback)((()=>{a||r(!t)}),[a,t,r]);return(0,n.useEffect)((()=>{!b(l)&&c.current&&Ti.to(c.current,{duration:y,delay:.3,y:0,ease:_o.easeInOut})}),[l]),(0,e.jsxs)(ja,Object.assign({ref:c,transitionPushToFonts:s},{children:[(0,e.jsx)(Ta,Object.assign({darkMode:u},{children:(0,e.jsx)("a",Object.assign({href:_(o),target:"_blank",rel:"noreferrer",draggable:"false",onClick:f,onTouchEnd:f},{children:(0,e.jsx)(ba,{darkMode:u})}))})),(0,e.jsx)(Pa,{children:(0,e.jsx)(Ca,{render:"secondary",darkMode:u,label:"bookmark_folder",buttonSize:"40px",onClick:d,onTouchEnd:d})}),(0,e.jsx)(Ma,{children:(0,e.jsx)(Ca,{render:"secondary",darkMode:u,label:"settings",buttonSize:"40px",onClick:p,onTouchEnd:p})})]}))},Na=qe.div`
  position: relative;
  /* MOBILE */
  width: 19px;
  height: 19px;
  /* TABLET */
  ${ia.tablet} {
    width: 16px;
    height: 16px;
  }

  @media (hover: hover) {
    &:hover {
      .tooltip-local-font {
        display: flex;
      }
    }
  }
`,Ra=qe.div`
  position: fixed;
  display: none;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  border-radius: 16px;
  margin-left: 8px;
  background-color: ${e=>e.darkMode?ee:J};
  box-shadow: 0px 2px 32px 0px ${je};
  pointer-events: none;
  z-index: 1;
  /* MOBILE */
  transform: translate3d(-156px, -76px, 0);
  /* TABLET */
  ${ia.tablet} {
    transform: translate3d(-168px, -72px, 0);
  }

  [class^='icon-'],
  [class*=' icon-'] {
    color: ${e=>e.darkMode?ie:oe};
    font-size: 16px;
  }
`,Da=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${da};
  line-height: normal;
  white-space: nowrap;
  margin-left: 8px;
  color: ${e=>e.darkMode?re:ne};
`,$a=()=>{const{t}=ra(),{settings:n}=F(),{darkMode:r}=n;return(0,e.jsxs)(Na,{children:[(0,e.jsx)(ka,{label:"font_manager-local_fonts",darkMode:r}),(0,e.jsxs)(Ra,Object.assign({className:"tooltip-local-font",darkMode:r},{children:[(0,e.jsx)(ka,{label:"info",darkMode:r}),(0,e.jsx)(Da,Object.assign({darkMode:r},{children:t("base.system-font")}))]}))]})},Fa=$a,Aa=()=>Y.css`
  .details {
    max-width: none;
    visibility: visible;
  }
`,Ia=qe.div`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${e=>e.darkMode?Z:Q};
  /* MOBILE */
  padding: 18px 20px;
  /* TABLET */
  ${ia.tablet} {
    padding: 12px;
  }
  &:last-of-type {
    border-bottom: none;
  }
`,za=qe.div`
  display: inline-flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`,Ba=qe.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  cursor: ${e=>"identify"===e.detectionMode?"pointer":"default"};
  /* MOBILE */
  min-height: 26px;
  /* TABLET */
  ${ia.tablet} {
    min-height: 20px;
  }

  .details {
    visibility: hidden;
  }

  &.hover-effect {
    ${Aa()}
  }

  @media (hover: hover) {
    &:hover {
      ${Aa()}
    }
  }
`,Ua=qe.p`
  display: inline;
  color: ${e=>e.darkMode?re:ne};
  font-family: ${e=>e.fontFamily};
  font-style: ${e=>e.fontStyle};
  font-weight: ${e=>e.fontWeight};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* MOBILE */
  font-size: ${ca};
  padding-right: 12px;
  /* TABLET */
  ${ia.tablet} {
    font-size: ${da};
    padding-right: 8px;
  }
`,Va=qe.span`
  display: inline-flex;
  align-items: center;
  max-width: 16px;
  height: 18px;
  padding: 0 8px;
  border-radius: 36px;
  background-color: ${de};
`,Ha=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${pa};
  line-height: normal;
  color: ${K};
`,Wa=qe.span`
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 8px;
  border-radius: 36px;
  background-color: ${e=>e.darkMode?ve:me};

  &.hover-effect {
    ${Y.css`
  display: none;
`}
  }
`,qa=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${pa};
  line-height: normal;
  color: ${e=>e.darkMode?re:ne};
`,Ya=({fontFamilyId:t,fontFamilies:r})=>{const{t:o}=ra(),{setOpenIframe:i}=T(),{idRequest:a,hoverSubFontFamily:s,setSelectedFontFamily:l,setHoverSubFontFamily:u}=B(),{machineId:c,settings:f}=F(),{dragStatus:p}=W(),{darkMode:h,browser:g}=f,m=(0,n.useRef)(0),v=(0,n.useRef)(null),y=(0,n.useMemo)((()=>{var e;return"undefined"!=typeof window&&("ontouchstart"in window||navigator.maxTouchPoints>0)&&(null===(e=g.name)||void 0===e?void 0:e.includes(d))}),[g.name]),b=(0,n.useCallback)((e=>{p||(l(t),"identify"===r[e].detectionMode&&i({url:S(r[e],a,c),title:r[e].displayFamily}))}),[p,r,t,a,c,i,l]),w=(0,n.useCallback)((e=>{C(e),u(e),v.current&&v.current.classList.add("hover-effect")}),[u]),_=(0,n.useCallback)((()=>{s&&j(s),u(null),v.current&&v.current.classList.remove("hover-effect")}),[s,u]),O=(0,n.useCallback)(((e,t)=>{e.currentTarget.classList.add("hover-effect"),v.current&&v.current.classList.add("hover-effect"),m.current=Date.now(),w(t)}),[w]),E=(0,n.useCallback)(((e,t)=>{e.currentTarget.classList.remove("hover-effect"),v.current&&v.current.classList.remove("hover-effect"),_();const n=Date.now()-m.current;p||n>250||b(t)}),[p,b,_]),C=e=>{const t=document.querySelectorAll(`[data-ninja-font="${e}"]`),n=Array.from(t).filter(x);n.length>0&&n.forEach((e=>{const t=k(e);e.classList.add("fontsninja-family-hover"),e.childNodes.forEach((e=>{var n;if(e.nodeType===Node.TEXT_NODE&&(null===(n=e.nodeValue)||void 0===n?void 0:n.trim())){const n=document.createElement("fontsninja-text");n.textContent=e.nodeValue,n.style.backgroundImage=`\n              linear-gradient(to right, ${t.backgroundColor} 50%, ${t.color} 50%),\n              linear-gradient(to right, ${t.backgroundColor} 50%, ${t.color} 50%), \n              linear-gradient(to bottom, ${t.backgroundColor} 50%, ${t.color} 50%),\n              linear-gradient(to bottom, ${t.backgroundColor} 50%, ${t.color} 50%)\n          `,e.replaceWith(n)}}))}))},j=e=>{const t=document.querySelectorAll(`[data-ninja-font="${e}"]`);Array.from(t).filter(x).forEach((e=>{e.classList.remove("fontsninja-family-hover");e.querySelectorAll("fontsninja-text").forEach((e=>{[...e.childNodes].filter((e=>e.nodeType===e.TEXT_NODE)).forEach((t=>{t.nodeValue&&e.replaceWith(t.nodeValue)}))}))}))};return(0,e.jsxs)(Ia,Object.assign({darkMode:h},{children:[(0,e.jsx)(za,Object.assign({className:"FontFamilyContainer"},{children:r.map(((t,n)=>(0,e.jsxs)(Ba,Object.assign({detectionMode:t.detectionMode},!y&&{onMouseEnter:()=>w(t.idFontFace),onMouseLeave:()=>_(),onClick:()=>b(n)},y&&{onTouchStart:e=>O(e,t.idFontFace),onTouchEnd:e=>E(e,n)},{children:[(0,e.jsx)(Ua,Object.assign({className:"font-family-name",fontFamily:t.fontface.fontFamily,fontStyle:t.fontface.fontStyle,fontWeight:t.fontface.fontWeight,darkMode:h},{children:t.fullName})),"local"!==t.detectionMode&&(0,e.jsx)(Va,Object.assign({className:"details"},{children:(0,e.jsx)(Ha,{children:o("base.details")})})),"local"===t.detectionMode&&(0,e.jsx)(Fa,{})]}),n)))})),r[0].variable&&(0,e.jsx)(Wa,Object.assign({ref:v,className:"font-family-variable",darkMode:h},{children:(0,e.jsx)(qa,Object.assign({darkMode:h},{children:r[0].variable&&o("base.variable")}))}))]}))},Ga=qe.div`
  padding: 0 4px 4px;
`,Xa=qe.div`
  display: flex;
  border-radius: 14px;
  background-color: ${e=>e.darkMode?ee:J};
  overflow-y: auto;
  /* MOBILE */
  max-height: 204px;
  /* TABLET */
  ${ia.tablet} {
    max-height: 388px;
  }
`,Ka=qe.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,Qa=({baseHeight:t})=>{const{fontFamiliesToDisplay:r}=B(),{settings:o}=F(),{darkMode:i}=o,a=(0,n.useRef)(null);return(0,n.useEffect)((()=>{!b(r)&&a.current&&Ti.fromTo(a.current,{y:t},{duration:y,y:0,ease:_o.easeInOut,clearProps:"y"})}),[t,r]),(0,e.jsx)(Ga,{children:(0,e.jsx)(Xa,Object.assign({className:"font-families",ref:a,darkMode:i},{children:(0,e.jsx)(Ka,{children:Object.keys(r).map(((t,n)=>(0,e.jsx)(Ya,{fontFamilyId:t,fontFamilies:r[t]},n)))})}))})},Za=qe.div`
  position: absolute;
  /* MOBILE */
  top: 18px;
  right: 24px;
  /* TABLET */
  ${ia.tablet} {
    top: 16px;
    right: 16px;
  }

  [class^='icon-'],
  [class*=' icon-'] {
    /* MOBILE */
    font-size: 19px;
    /* TABLET */
    ${ia.tablet} {
      font-size: 16px;
    }
  }
`,Ja=()=>{const{dragStatus:t}=W(),{settings:r}=F(),{darkMode:o}=r,i=(0,n.useCallback)((()=>{t||window.postMessage({type:"close_fonts_ninja"})}),[t]);return(0,e.jsx)(Za,Object.assign({darkMode:o},{children:(0,e.jsx)(Ca,{render:"secondary",darkMode:o,label:"close_big",buttonSize:"40px",onClick:i,onTouchEnd:i})}))},es=qe.div`
  position: relative;
  z-index: 1;
  ${e=>!e.isVisible&&Y.css`
      display: none;
    `}
`,ts=(0,n.forwardRef)((({baseHeight:t,isVisible:r},o)=>{const{transitionPushToFonts:a}=W(),s=i(a);return(0,n.useEffect)((()=>{if(!s&&a){const e=o;Ti.fromTo(e.current,{top:"100%",pointerEvents:"none"},{duration:y,top:0,ease:_o.easeInOut,clearProps:"top,pointerEvents"})}}),[s,o,a]),(0,e.jsxs)(es,Object.assign({ref:o,isVisible:r},{children:[(0,e.jsx)(va,{baseHeight:t}),(0,e.jsx)(La,{}),(0,e.jsx)(Qa,{baseHeight:t}),(0,e.jsx)(Ja,{})]}))})),ns=()=>(0,e.jsx)("div",Object.assign({className:"spinner"},{children:(0,e.jsxs)("svg",Object.assign({width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},{children:[(0,e.jsx)("mask",Object.assign({id:"mask0_8783_3884","mask-type":"alpha",maskUnits:"userSpaceOnUse",x:"1",y:"0",width:"15",height:"16"},{children:(0,e.jsx)("path",{d:"M8 0C9.33946 1.59729e-08 10.6575 0.336323 11.8332 0.978122C13.0089 1.61992 14.0046 2.54665 14.729 3.67331C15.4535 4.79996 15.8834 6.09049 15.9794 7.4265C16.0754 8.76252 15.8345 10.1013 15.2786 11.3199C14.7227 12.5386 13.8698 13.5982 12.7979 14.4015C11.7261 15.2049 10.4697 15.7262 9.14405 15.9178C7.81836 16.1093 6.46578 15.9649 5.21039 15.4979C3.95501 15.0308 2.83699 14.256 1.95888 13.2445L8 8V0Z",fill:"#D9D9D9"})})),(0,e.jsx)("g",Object.assign({mask:"url(#mask0_8783_3884)"},{children:(0,e.jsx)("circle",{cx:"8",cy:"8",r:"7.25",stroke:"#8E8E93",strokeWidth:"1.5"})}))]}))})),rs=Y.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`,os=qe.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 48px;
  text-decoration: none;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: border-color 0.25s ${_a}, background-color 0.25s ${_a};
  -webkit-tap-highlight-color: transparent;

  padding: 16px 24px;
  &:not(:has(.label)) {
    padding: 16px;
  }

  .spinner {
    pointer-events: none;
    &:not(:last-child) {
      margin-right: 6px;
    }

    svg {
      animation: ${rs} 1.4s infinite linear;
    }
  }

  [class^='icon-'],
  [class*=' icon-'] {
    color: inherit;
    pointer-events: none;
    &:not(:last-child) {
      margin-right: 6px;
    }
  }

  /* RENDER PRIMARY */
  ${e=>"primary"===e.render&&Y.css`
      color: ${e.darkMode?ue:le};
      background-color: ${e.darkMode?pe:de};

      .spinner circle {
        stroke: ${e.darkMode?ue:le};
      }
    `}

  /* RENDER SECONDARY */
  ${e=>"secondary"===e.render&&Y.css`
      color: ${e.darkMode?fe:ce};
      background-color: ${e.darkMode?ve:me};

      .spinner circle {
        stroke: ${e.darkMode?fe:ce};
      }
    `}

  /* RENDER TERTIARY */
  ${e=>"tertiary"===e.render&&Y.css`
      color: ${e.darkMode?fe:ce};
      background-color: transparent;
      border: 1.5px solid ${e.darkMode?Oe:Se};

      .spinner circle {
        stroke: ${e.darkMode?fe:ce};
      }
    `}

  /* RENDER WARNING */
  ${e=>"warning"===e.render&&Y.css`
      color: ${e.darkMode?ue:le};
      background-color: ${e.darkMode?xe:we};

      .spinner circle {
        stroke: ${e.darkMode?ue:le};
      }
    `}

  /* HOVER */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      /* RENDER PRIMARY */
      ${e=>"primary"===e.render&&Y.css`
          background-color: ${e.darkMode?ge:he};
        `}

      /* RENDER SECONDARY */
      ${e=>"secondary"===e.render&&Y.css`
          background-color: ${e.darkMode?be:ye};
        `}

      /* RENDER TERTIARY */
      ${e=>"tertiary"===e.render&&Y.css`
          background-color: ${e.darkMode?be:ye};
          border-color: transparent;
        `}

      /* RENDER WARNING */
      ${e=>"warning"===e.render&&Y.css`
          background-color: ${e.darkMode?_e:ke};
        `}
    }
  }

  /* DISABLED */
  &:disabled {
    opacity: 0.5;
    cursor: default;

    /* RENDER PRIMARY */
    ${e=>"primary"===e.render&&Y.css`
        background-color: ${e.darkMode?ge:he};
      `}

    /* RENDER SECONDARY */
    ${e=>"secondary"===e.render&&Y.css`
        background-color: ${e.darkMode?ve:me};
      `}

    /* RENDER TERTIARY */
    ${e=>"tertiary"===e.render&&Y.css`
        color: ${e.darkMode?fe:ce};
        background-color: transparent;
        border: 1.5px solid ${e.darkMode?Oe:Se};
      `}

    /* RENDER WARNING */
    ${e=>"warning"===e.render&&Y.css`
        background-color: ${e.darkMode?xe:we};
      `}
  }
`,is=qe.p`
  position: relative;
  top: -1px;
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  color: inherit;
  font-weight: 500;
  font-size: ${fa};
  line-height: normal;
  pointer-events: none;
`;var as=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};const ss=t=>{var{render:n="primary",darkMode:r,href:o,target:i,rel:a,download:s,icon:l,isLoading:u,children:c}=t,f=as(t,["render","darkMode","href","target","rel","download","icon","isLoading","children"]);return(0,e.jsxs)(os,Object.assign({render:n,darkMode:r,isLoading:u},o&&{as:"a",href:o,draggable:!1},o&&i&&{target:i},o&&a&&{rel:a},o&&s&&{download:s},f,{children:[u&&(0,e.jsx)(ns,{}),!u&&l&&(0,e.jsx)(ka,{label:l}),c&&(0,e.jsx)(is,Object.assign({className:"label"},{children:c}))]}))},ls=qe.div`
  position: relative;
  visibility: ${e=>e.isReady?"visible":"hidden"};
  background-color: ${e=>e.darkMode?Z:Q};
  width: 255px;
  padding: 4px;
`,us=qe.div`
  position: relative;
  width: 100%;
  height: 166px;
  border-radius: 14px;
  background-color: ${e=>e.darkMode?Ce:Ee};
  overflow: hidden;
`,cs=qe.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`,fs=qe.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`,ds=qe.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`,ps=qe.video`
  display: block;
  background-color: ${e=>e.darkMode?X:G};
  width: 100%;
  height: 100%;
  object-fit: cover;
`,hs=qe.div`
  background-color: ${e=>e.darkMode?ee:J};
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  padding: 10px 12px 12px;
`,gs=qe.h1`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${fa};
  line-height: 22px;
  color: ${e=>e.darkMode?re:ne};
  margin-bottom: 8px;
`,ms=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: ${da};
  line-height: normal;
  color: ${e=>e.darkMode?re:ne};
  margin-bottom: 20px;
`,vs=qe.div`
  position: relative;
  display: flex;
  a {
    margin-right: 8px;
  }
  *:nth-child(2) {
    flex: 1;
    justify-content: center;
  }
`,ys=(0,n.forwardRef)((({data:t},r)=>{const{t:o}=ra(),{extensionPath:a}=T(),{settings:s,updateSettingsElement:l}=F(),{dragStatus:u,pushMediaReady:c,transitionPushToFonts:f,setPushMediaReady:d,setTransitionPushToFonts:p}=W(),{darkMode:h,browser:g}=s,v=i(f),b=(0,n.useMemo)((()=>{var e,n;if(t.customButton)return"store"===t.type&&(t.customButton.link=m[(null!==(e=g.name)&&void 0!==e?e:"Chrome").toLowerCase()]),null===(n=t.customButton)||void 0===n?void 0:n.link}),[g.name,t.customButton,t.type]),w=(0,n.useCallback)((()=>{p(!0)}),[p]),x=(0,n.useCallback)((e=>{const t=e.target;t.getBoundingClientRect().width>0&&t.getBoundingClientRect().height>0&&d(!0)}),[d]),k=(0,n.useCallback)((e=>{u?e.preventDefault():("instagram"===t.type?l("instaSeen",!0):"store"===t.type?l("storeSeen",!0):t.type,w())}),[t.type,u,w,l]),_=(0,n.useCallback)((()=>{u||w()}),[u,w]);return(0,n.useEffect)((()=>{var e,n;if(!v&&f){const o=r,i=Math.ceil(null!==(n=null===(e=o.current)||void 0===e?void 0:e.getBoundingClientRect().height)&&void 0!==n?n:0);Ti.fromTo(o.current,{position:"absolute",top:0},{duration:y,top:`-${i}px`,opacity:0,ease:_o.easeInOut,onComplete:()=>{"instagram"===t.type?l("instaForce",!1,!1):"store"===t.type?l("storeForce",!1,!1):l("customPushForce",!1,!1)}})}}),[t.type,v,r,f,l]),(0,e.jsxs)(ls,Object.assign({ref:r,type:t.type,isReady:c,darkMode:h},t.media.width&&{width:t.media.width},{children:[(0,e.jsxs)(us,Object.assign({darkMode:h},{children:["instagram"===t.type&&(0,e.jsx)(cs,{src:`${a}${t.media.src}?_=${(new Date).getTime()}`,alt:"Instagram",draggable:!1,onLoad:x}),"store"===t.type&&(0,e.jsx)(fs,{src:`${a}${t.media.src}?_=${(new Date).getTime()}`,alt:"Store",draggable:!1,onLoad:x}),"custom"===t.type&&(0,e.jsx)(e.Fragment,{children:"img"===t.media.type?(0,e.jsx)(ds,{src:`${t.media.src}?_=${(new Date).getTime()}`,alt:t.title,draggable:!1,onLoad:x}):(0,e.jsx)(ps,{darkMode:h,src:t.media.src,preload:"auto",autoPlay:!0,loop:!0,muted:!0,onCanPlay:x})})]})),(0,e.jsxs)(hs,Object.assign({darkMode:h},{children:[(0,e.jsx)(gs,Object.assign({darkMode:h},{children:t.title})),(0,e.jsx)(ms,Object.assign({darkMode:h},{children:t.description})),(0,e.jsxs)(vs,{children:[t.customButton&&(0,e.jsx)(ss,Object.assign({darkMode:h,href:b,target:"_blank",onClick:k,onTouchEnd:k},t.customButton.iconLabel&&{icon:t.customButton.iconLabel},t.customButton.iconSrcLightMode&&!h&&{iconSrc:t.customButton.iconSrcLightMode},t.customButton.iconSrcDarkMode&&h&&{iconSrc:t.customButton.iconSrcDarkMode},{children:t.customButton.text})),(0,e.jsx)(ss,Object.assign({render:"secondary",darkMode:h,onClick:_,onTouchEnd:_},!t.customButton&&{icon:"arrow-right"},{children:o("base.skip")}))]})]}))]}))})),bs=ys,ws="235px",xs="48px",ks=qe.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2147483647;
`,_s=qe.div`
  position: fixed;
  max-width: ${"398px"};
  max-height: ${"440px"};
  background-color: ${e=>e.darkMode?Z:Q};
  box-shadow: 0px 2px 48px 1px #48484a47;
  border-radius: 16px;
  overflow: hidden;
  pointer-events: auto;

  /* MOBILE */
  min-height: ${"56px"};
  bottom: 16px;
  right: 16px;
  max-width: 343px;
  /* displayPush = false */
  ${e=>!e.displayPush&&Y.css`
      min-width: min(calc(100% - 32px), 343px);
    `}
  /* displayPush = true */
  ${e=>e.displayPush&&Y.css`
      min-width: ${ws};
    `}

  /* MOBILE_MEDIUM */
  ${ia.mobile_medium} {
    max-width: 361px;
    /* displayPush = false */
    ${e=>!e.displayPush&&Y.css`
        min-width: min(calc(100% - 32px), 361px);
      `}
    /* displayPush = true */
    ${e=>e.displayPush&&Y.css`
        min-width: ${ws};
      `}
  }

  /* MOBILE_IPHONE16PRO */
  ${ia.mobile_iphone_16_pro} {
    max-width: 370px;
    /* displayPush = false */
    ${e=>!e.displayPush&&Y.css`
        min-width: min(calc(100% - 32px), 370px);
      `}
    /* displayPush = true */
    ${e=>e.displayPush&&Y.css`
        min-width: ${ws};
      `}
  }

  /* MOBILE_MAX */
  ${ia.mobile_max} {
    max-width: 398px;
    /* displayPush = false */
    ${e=>!e.displayPush&&Y.css`
        min-width: min(calc(100% - 32px), 398px);
      `}
    /* displayPush = true */
  ${e=>e.displayPush&&Y.css`
        min-width: ${ws};
      `}
  }

  /* MOBILE_IPHONE16PRO_MAX */
  ${ia.mobile_iphone_16_pro_max} {
    max-width: 408px;
    /* displayPush = false */
    ${e=>!e.displayPush&&Y.css`
        min-width: min(calc(100% - 32px), 408px);
      `}
    /* displayPush = true */
    ${e=>e.displayPush&&Y.css`
        min-width: ${ws};
      `}
  }

  /* TABLET */
  ${ia.tablet} {
    min-height: ${xs};
    top: 30px;
    right: 30px;
    bottom: auto;
    min-width: ${ws};
  }
`,Ss=()=>{const{fontFamiliesToDisplay:t}=B(),{settings:r}=F(),{pushMediaReady:o,transitionPushToFonts:i,setDragStatus:a}=W(),{darkMode:s,instaForce:l,storeForce:u,customPushForce:c}=r,f=(0,n.useRef)(null),d=(0,n.useRef)(null),p=(0,n.useRef)(null),g=(0,n.useRef)(0),m=(0,n.useRef)(0),w=(0,n.useRef)(!1),[x,k]=(0,n.useState)(0),[_,S]=(0,n.useState)({x:0,y:0}),[O,E]=(0,n.useState)(null),[C,j]=(0,n.useState)(!1),T=(0,n.useMemo)((()=>l||u||c),[c,l,u]),P=(0,n.useMemo)((()=>l?h:u?v:void 0),[l,u]),M=(0,n.useMemo)((()=>"undefined"!=typeof window&&("ontouchstart"in window||navigator.maxTouchPoints>0)),[]),L=(0,n.useCallback)((()=>{S({x:0,y:0})}),[]),N=(0,n.useCallback)(((e,t)=>{E({x:t.x,y:t.y})}),[]),R=(0,n.useCallback)((()=>{a("drag")}),[a]),D=(0,n.useCallback)(((e,t)=>{S({x:t.x,y:t.y});const n={x:t.x,y:t.y};if(O&&n){const e={x:Math.abs(n.x-O.x),y:Math.abs(n.y-O.y)};e.x<4&&e.y<4&&a(null),E(null)}setTimeout((()=>{a(null)}))}),[a,O]),$=(0,n.useCallback)((()=>{window.innerWidth<744&&!C?(L(),j(!0)):window.innerWidth>=744&&C&&(L(),j(!1))}),[C,L]);return(0,n.useEffect)((()=>{T||i||b(t)||Ti.set(f.current,{width:"auto",delay:.3,onComplete:()=>{var e,t,n,r;g.current=null!==(t=null===(e=d.current)||void 0===e?void 0:e.getBoundingClientRect().width)&&void 0!==t?t:0,m.current=null!==(r=null===(n=d.current)||void 0===n?void 0:n.getBoundingClientRect().height)&&void 0!==r?r:0,k(m.current),Ti.set(f.current,{width:ws}),Ti.to(f.current,{duration:y,width:Math.ceil(g.current),height:Math.ceil(m.current),ease:_o.easeInOut,clearProps:"height"})}})}),[T,t,i]),(0,n.useEffect)((()=>{var e,t,n,r;T&&o&&(g.current=null!==(t=null===(e=f.current)||void 0===e?void 0:e.getBoundingClientRect().width)&&void 0!==t?t:0,m.current=null!==(r=null===(n=f.current)||void 0===n?void 0:n.getBoundingClientRect().height)&&void 0!==r?r:0)}),[T,C,o]),(0,n.useEffect)((()=>{var e,t,n,r;if(i&&!w.current){w.current=!0;let o=(null!==(t=null===(e=d.current)||void 0===e?void 0:e.getBoundingClientRect().width)&&void 0!==t?t:0)+20;const i=null!==(r=null===(n=d.current)||void 0===n?void 0:n.getBoundingClientRect().height)&&void 0!==r?r:0;C&&o<window.innerWidth-32&&(o=window.innerWidth-32),Ti.fromTo(f.current,{width:Math.ceil(g.current),height:Math.ceil(m.current)},{duration:y,width:Math.ceil(o),height:Math.ceil(i),ease:_o.easeInOut,clearProps:"height"})}}),[t,C,i]),(0,n.useEffect)((()=>($(),window.addEventListener("resize",$),()=>{window.removeEventListener("resize",$)})),[$]),(0,e.jsx)(ks,{children:(0,e.jsx)(Xe(),Object.assign({bounds:"parent",position:_,onStart:N,onDrag:R,onStop:D},M&&{cancel:".font-families"},{children:(0,e.jsxs)(_s,Object.assign({ref:f,darkMode:s,displayPush:T},!T&&!i&&{style:{width:ws,height:xs}},T&&!o&&{style:{visibility:"hidden"}},{children:[(0,e.jsx)(ts,{ref:d,baseHeight:x,isVisible:!T||i}),T&&P&&(0,e.jsx)(bs,{ref:p,data:P})]}))}))})},Os=Ss,Es=qe.div`
  display: flex;
  align-items: center;
  padding: 22px 22px 6px;
`,Cs=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: ${e=>e.darkMode?re:ne};
  margin-left: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`,js=({fontFamily:t})=>{const{settings:r}=F(),{darkMode:o}=r,i=(0,n.useMemo)((()=>E()&&"identify"!==t.detectionMode?"password":"font"),[t.detectionMode]);return(0,e.jsxs)(Es,{children:[(0,e.jsx)(ka,{label:i,darkMode:o}),(0,e.jsx)(Cs,Object.assign({darkMode:o},{children:t.fullName}))]})},Ts=qe.div`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0px 22px 25px;
`,Ps=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: ${pa};
  line-height: normal;
  color: ${e=>e.darkMode?re:ne};
`,Ms=qe.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  p {
    margin-left: 4px;
  }
`,Ls=qe.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  p {
    margin-left: 4px;
  }
`,Ns=qe.div`
  display: flex;
  align-items: center;
  margin-right: 18px;
  p {
    margin-left: 4px;
  }
`,Rs=qe.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  p {
    margin-left: 2px;
  }
`,Ds=qe.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: ${e=>e.color};
  border: 1.5px solid ${e=>e.darkMode?re:ne};
  border-radius: 50%;
`,$s=({style:t})=>{const{settings:n}=F(),{darkMode:r}=n,{fontSize:o,lineHeight:i,letterSpacing:a,color:s}=t;return(0,e.jsxs)(Ts,{children:[(0,e.jsxs)(Ms,{children:[(0,e.jsx)(ka,{label:"font-size",darkMode:r}),(0,e.jsx)(Ps,Object.assign({darkMode:r},{children:o.replace(/\.\d+/,"")}))]}),(0,e.jsxs)(Ls,{children:[(0,e.jsx)(ka,{label:"font-line_height",darkMode:r}),(0,e.jsx)(Ps,Object.assign({darkMode:r},{children:i.replace(/\d*\.\d+/,(e=>(Math.round(10*parseFloat(e))/10).toString())).replace("-0px","0px")}))]}),(0,e.jsxs)(Ns,{children:[(0,e.jsx)(ka,{label:"font-letter_spacing",darkMode:r}),(0,e.jsx)(Ps,Object.assign({darkMode:r},{children:a.replace("normal","0px").replace(/\d*\.\d+/,(e=>(Math.round(10*parseFloat(e))/10).toString())).replace("-0px","0px")}))]}),(0,e.jsxs)(Rs,{children:[(0,e.jsx)(Ds,{color:t.color,darkMode:r}),(0,e.jsx)(Ps,Object.assign({darkMode:r},{children:w(s)}))]})]})},Fs=qe.div`
  display: ${e=>e.display};
  position: fixed;
  top: -999px;
  left: -999px;
  min-width: ${"295px"};
  max-width: ${"340px"};
  height: 90px;
  background-color: ${e=>e.darkMode?ee:J};
  box-shadow: 0px 2px 32px 0px ${je};
  border-radius: 16px;
  overflow: hidden;
  z-index: 2147483647;
  ${e=>e.isTouchDevice&&Y.css`
      pointer-events: auto;
    `}
`,As=()=>{const{isOpen:t,setOpenIframe:r}=T(),{idRequest:o,fontFamilies:i}=B(),{machineId:a,settings:s}=F(),{darkMode:l}=s,[c,f]=(0,n.useState)("none"),[d,p]=(0,n.useState)(null),h=(0,n.useRef)(null),g=(0,n.useRef)(null),m=(0,n.useRef)(null),v=(0,n.useCallback)((e=>{var t,n,r,o;const i=e.clientX,a=e.clientY,s=Math.ceil(null!==(n=null===(t=g.current)||void 0===t?void 0:t.getBoundingClientRect().width)&&void 0!==n?n:0);let l=i-32,u=a-Math.ceil(null!==(o=null===(r=g.current)||void 0===r?void 0:r.getBoundingClientRect().height)&&void 0!==o?o:0)-15;l<0?l=0:l+s+3>window.innerWidth&&(l-=l+s+3-window.innerWidth),u<0&&(u=a+20),g.current&&(g.current.style.left=`${l}px`,g.current.style.top=`${u}px`)}),[]),y=(0,n.useCallback)((e=>{if(e.preventDefault(),e.stopPropagation(),h.current){const{fontFamily:e}=h.current;if("identify"===e.detectionMode){const t=w(h.current.style.color);r({url:S(e,o,a,t),title:e.displayFamily})}else E()&&(f("none"),document.removeEventListener("mousemove",v))}}),[v,o,a,r]),b=(0,n.useCallback)((e=>{var t,n,r;document.querySelectorAll(".hover-simulated").forEach((e=>{e.classList.remove("hover-simulated")}));e.target.classList.add("hover-simulated");const o=document.querySelectorAll(".hover-simulated"),i=null!==(t=o[o.length-1])&&void 0!==t?t:e.target,a=k(i),s=[...i.childNodes].filter((e=>e.nodeType===e.TEXT_NODE)),c=new Map;s.forEach((e=>{const t=document.createElement("fontsninja-text");e.nodeValue&&""!==e.nodeValue.trim()&&i.tagName!=="fontsninja-text".toUpperCase()&&(t.innerHTML=e.nodeValue,c.set(t,e),e.replaceWith(t))})),s.length>0&&(i._originalNodes=c);if(""!==s.map((e=>e.nodeValue)).join("").trim()&&i.tagName!=="fontsninja-text".toUpperCase()){m.current=i;i.querySelectorAll("fontsninja-text").forEach((e=>{e.classList.add("fontsninja-tooltip-hover"),e.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation()}))})),window.postMessage({type:u,style:a},"*")}if(i.tagName==="fontsninja-text".toUpperCase()){window.postMessage({type:u,style:a},"*"),f("block");const t=Math.ceil(null!==(r=null===(n=g.current)||void 0===n?void 0:n.getBoundingClientRect().height)&&void 0!==r?r:0);(e instanceof MouseEvent?e.clientY:e.touches[0].clientY)-t-15>=0&&(h.current&&"identify"===h.current.fontFamily.detectionMode?i.classList.add(l?"fontsninja-tooltip-hover-dark":"fontsninja-tooltip-hover-light"):i.classList.add(l?"fontsninja-tooltip-hover-locked-dark":"fontsninja-tooltip-hover-locked-light"))}else f("none")}),[l]),x=(0,n.useCallback)((e=>{var t,n,r;const o=document.querySelectorAll(":hover"),i=null!==(t=o[o.length-1])&&void 0!==t?t:e.target,a=k(i),s=[...i.childNodes].filter((e=>e.nodeType===e.TEXT_NODE)),c=new Map;s.forEach((e=>{const t=document.createElement("fontsninja-text");e.nodeValue&&""!==e.nodeValue.trim()&&i.tagName!=="fontsninja-text".toUpperCase()&&(t.innerHTML=e.nodeValue,c.set(t,e),e.replaceWith(t))})),s.length>0&&(i._originalNodes=c);if(""!==s.map((e=>e.nodeValue)).join("").trim()&&i.tagName!=="fontsninja-text".toUpperCase()){m.current=i;i.querySelectorAll("fontsninja-text").forEach((e=>{e.classList.add("fontsninja-tooltip-hover"),e.addEventListener("click",y)})),window.postMessage({type:u,style:a},"*")}if(i.tagName==="fontsninja-text".toUpperCase()){f("block");const t=Math.ceil(null!==(r=null===(n=g.current)||void 0===n?void 0:n.getBoundingClientRect().height)&&void 0!==r?r:0);e.clientY-t-15>=0&&(h.current&&"identify"===h.current.fontFamily.detectionMode?i.classList.add(l?"fontsninja-tooltip-hover-dark":"fontsninja-tooltip-hover-light"):i.classList.add(l?"fontsninja-tooltip-hover-locked-dark":"fontsninja-tooltip-hover-locked-light")),v(e),document.addEventListener("mousemove",v)}else f("none"),document.removeEventListener("mousemove",v)}),[l,y,v]),_=(0,n.useCallback)((e=>{var t;const n=document.querySelectorAll(":hover"),r=null!==(t=n[n.length-1])&&void 0!==t?t:e.target.querySelector("fontsninja-text");if((!r||r.tagName!=="fontsninja-text".toUpperCase())&&m.current){const e=m.current.querySelectorAll("fontsninja-text"),t=m.current._originalNodes;t&&(e.forEach((e=>{const n=t.get(e);n&&(e.removeEventListener("click",y),e.replaceWith(n))})),delete m.current._originalNodes),f("none"),m.current=null,document.removeEventListener("mousemove",v)}}),[y,v]),O=(0,n.useCallback)((e=>{if(document.querySelectorAll(".hover-simulated").forEach((e=>{e.classList.remove("hover-simulated")})),m.current){m.current.querySelectorAll("fontsninja-text").forEach((e=>{[...e.childNodes].filter((e=>e.nodeType===e.TEXT_NODE)).forEach((t=>{t.nodeValue&&(e.removeEventListener("click",y),e.replaceWith(t.nodeValue))}))})),f("none"),m.current=null,document.removeEventListener("mousemove",v)}}),[y,v]),C=(0,n.useCallback)((({data:e})=>{if("ninjaRolloverResults"===e.type){const t={fontFamily:e.results.font,style:{fontSize:e.results.style.fontSize,lineHeight:e.results.style.lineHeight,letterSpacing:e.results.style.letterSpacing,color:e.results.style.color}};h.current=t,p(t)}}),[]);return(0,n.useEffect)((()=>{if(t&&i){document.body.classList.add("fontsninja-ext-blocker");document.querySelectorAll("[data-ninja-font]").forEach((e=>{e.classList.add("fontsninja-font"),Math.abs(k(e).textIndent.split("px")[0])>window.innerWidth&&e.classList.remove("fontsninja-font")})),document.body.addEventListener("touchstart",b),document.body.addEventListener("mouseover",x),document.body.addEventListener("mouseout",_),E()&&window.addEventListener("scroll",O)}else{document.body.classList.remove("fontsninja-ext-blocker");document.querySelectorAll("[data-ninja-font]").forEach((e=>{e.classList.remove("fontsninja-font")}))}return()=>{document.body.removeEventListener("touchstart",b),document.body.removeEventListener("mouseover",x),document.body.removeEventListener("mouseout",_),E()&&window.removeEventListener("scroll",O)}}),[i,_,x,O,b,t]),(0,n.useEffect)((()=>(window.addEventListener("message",C),()=>{window.removeEventListener("message",C)})),[C]),(0,e.jsx)(Fs,Object.assign({ref:g,display:c,darkMode:l},E()&&{isTouchDevice:!0,onTouchEnd:e=>y(e)},{children:d&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(js,{fontFamily:d.fontFamily}),(0,e.jsx)($s,{style:d.style})]})}))},Is=Y.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`,zs=qe.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: transparent;
  ${e=>e.withBackground&&Y.css`
      background-color: ${e.darkMode?ve:me};
    `}

  svg {
    animation: ${Is} 1.4s infinite linear;
  }

  svg circle {
    stroke: ${e=>e.darkMode?Oe:Se};
  }
`,Bs=({className:t,darkMode:n,withBackground:r=!0})=>(0,e.jsx)(zs,Object.assign({className:t,darkMode:n,withBackground:r},{children:(0,e.jsxs)("svg",Object.assign({width:"28",height:"28",viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},{children:[(0,e.jsx)("mask",Object.assign({id:"mask0_7717_37797","mask-type":"alpha",maskUnits:"userSpaceOnUse",x:"6",y:"4",width:"18",height:"20"},{children:(0,e.jsx)("path",{d:"M14 4C15.6743 4 17.3219 4.4204 18.7915 5.22265C20.2611 6.0249 21.5057 7.18331 22.4113 8.59163C23.3168 9.99996 23.8542 11.6131 23.9743 13.2831C24.0943 14.9531 23.7931 16.6266 23.0983 18.1499C22.4034 19.6733 21.3372 20.9978 19.9974 22.0019C18.6577 23.0061 17.0872 23.6578 15.4301 23.8972C13.7729 24.1367 12.0822 23.9562 10.513 23.3723C8.94376 22.7885 7.54623 21.82 6.44861 20.5556L14 14V4Z",fill:"#D9D9D9"})})),(0,e.jsx)("g",Object.assign({mask:"url(#mask0_7717_37797)"},{children:(0,e.jsx)("circle",{cx:"14",cy:"14",r:"9.25",strokeWidth:"1.5"})}))]}))})),Us=qe.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 48px;
  background-color: ${"#121212"};
  pointer-events: auto;
  z-index: 1;
`,Vs=qe.p`
  display: flex;
  align-items: center;
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${fa};
  line-height: normal;
  color: ${K};
`,Hs=qe.a`
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  i {
    position: relative;
    top: 1px;
    margin-left: 1px;
  }
  &:hover {
    span {
      text-decoration: underline;
    }
  }
`,Ws=()=>{const{t}=ra(),{machineId:n}=F();return(0,e.jsx)(Us,{children:(0,e.jsxs)(Vs,{children:[t("iframe.banner.discover")," ",(0,e.jsxs)(Hs,Object.assign({href:_(n),target:"_blank"},{children:[(0,e.jsx)("span",{children:t("iframe.banner.fonts-ninja")}),(0,e.jsx)(ka,{label:"link_mini",color:K})]}))]})})},qs=Ws,Ys=qe.div`
  display: ${e=>e.show?"flex":"none"};
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2147483647;
`,Gs=qe.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${te};
  opacity: 0.85;
  pointer-events: auto;
`,Xs=qe.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  pointer-events: auto;
  /* MOBILE */
  ${ia.mobile} {
    padding: 0 8px;
  }
  /* TABLET */
  ${ia.tablet} {
    padding: 0 16px;
  }
`,Ks=qe.div`
  position: relative;
  margin: ${80}px 0 0;
  max-width: 1920px;
  min-height: calc(700px - ${80}px - ${40}px);
  background-color: ${e=>e.darkMode?Z:Q};
  overflow: hidden;
  /* MOBILE */
  width: 100%;
  border-radius: 44px;
  /* TABLET */
  ${ia.tablet} {
    border-radius: 32px;
  }
  /* DESKTOP */
  ${ia.desktop} {
    width: 85%;
  }
  ${e=>e.pageLoaded&&Y.css`
      background-color: transparent;
    `}
`,Qs=qe.div`
  position: absolute;
  /* MOBILE */
  top: 32px;
  right: 32px;
  /* TABLET */
  ${ia.tablet} {
    top: 18px;
    right: 18px;
  }
  /* DESKTOP */
  ${ia.desktop} {
    top: 24px;
    right: 24px;
  }
  z-index: 1;

  button {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`,Zs=qe.iframe`
  position: relative;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 16px;
  overflow-x: hidden;
  overflow-y: auto;
`,Js=qe.div`
  position: absolute;
  /* MOBILE */
  top: 32px;
  left: 32px;
  /* TABLET */
  ${ia.tablet} {
    top: 18px;
    left: 18px;
  }
  /* DESKTOP */
  ${ia.desktop} {
    top: 24px;
    left: 24px;
  }
`,el=()=>{const{extensionPath:t,openIframe:r,setOpenIframe:o}=T(),[i,u]=(0,n.useState)(!1),[d,p]=(0,n.useState)(!1),h=(0,n.useRef)(null),g=(0,n.useRef)(null),m=(0,n.useCallback)((()=>{p(!1),o(null)}),[o]),v=(0,n.useCallback)((()=>{var e;g.current&&(null===(e=g.current.contentWindow)||void 0===e||e.postMessage({type:"fontsNinjaIframeCurrentUrl",payload:{currentUrl:window.location.href}},"*"))}),[]),y=(0,n.useCallback)((()=>{var e;g.current&&(null===(e=g.current.contentWindow)||void 0===e||e.postMessage({type:"fontsNinjaIframeWindowHeight",payload:{windowHeight:window.innerHeight}},"*"))}),[]),b=(0,n.useCallback)((e=>{var t;g.current&&(null===(t=g.current.contentWindow)||void 0===t||t.postMessage({type:"fontsNinjaIframeScrollY",payload:{scrollY:e.currentTarget.scrollTop}},"*"))}),[]),w=(0,n.useCallback)((({data:e})=>{var t,n,o,i,d,m,b,w,x;switch(e.type){case"fontsNinjaPageHeight":h.current&&(h.current.style.height=`${e.payload.height}px`,h.current.style.marginBottom="40px");break;case"fontsNinjaDarkMode":u(null!==(t=e.payload.darkMode)&&void 0!==t&&t);break;case"fontsNinjaAccessToken":window.postMessage({type:l,key:c,attributes:["accessToken"],values:[e.payload.accessToken]});break;case"fontsNinjaRefreshToken":window.postMessage({type:l,key:c,attributes:["refreshToken"],values:[e.payload.refreshToken]});break;case"fontsNinjaPageLoaded":p(!0),v(),y(),window.postMessage({type:a,key:c});break;case"fontsNinjaGetGpdrValidation":window.postMessage({type:a,key:f});break;case"fontsNinjaSaveGpdrValidation":window.postMessage({type:l,key:f,attributes:["gdprValidation","optInMixpanel"],values:["true",e.payload.optInMixpanel]});break;case s:const k=null===(n=e.storage)||void 0===n?void 0:n.accessToken,_=null===(o=e.storage)||void 0===o?void 0:o.refreshToken,S=null===(i=e.storage)||void 0===i?void 0:i.gdprValidation,O=null===(d=e.storage)||void 0===d?void 0:d.optInMixpanel;g.current&&(null===(m=g.current.contentWindow)||void 0===m||m.postMessage({type:"iframeAccessToken",payload:{accessToken:k}},"*"),null===(b=g.current.contentWindow)||void 0===b||b.postMessage({type:"iframeRefreshToken",payload:{refreshToken:_}},"*"),null===(w=g.current.contentWindow)||void 0===w||w.postMessage({type:"iframeGdprValidation",payload:{gdprValidation:S,optInMixpanel:O}},"*"));break;case"iframeReady":g.current&&r&&(null===(x=g.current.contentWindow)||void 0===x||x.postMessage({type:"iframeData",payload:{title:r.title,src:r.url}},"*"))}}),[y,r,v]);return(0,n.useEffect)((()=>{r||u(!1)}),[r]),(0,n.useEffect)((()=>(window.addEventListener("resize",y),()=>{window.removeEventListener("resize",y)})),[y,r]),(0,n.useEffect)((()=>(window.addEventListener("message",w),()=>{window.removeEventListener("message",w)})),[w]),(0,e.jsx)(Ys,Object.assign({show:!!r},{children:!!r&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(Gs,{}),(0,e.jsx)(qs,{}),(0,e.jsx)(Xs,Object.assign({id:"fontsNinjaIframeScrollWrapper",onClick:m,onScroll:b},{children:(0,e.jsxs)(Ks,Object.assign({ref:h,darkMode:i,pageLoaded:d},{children:[(0,e.jsx)(Qs,{children:(0,e.jsx)(Ca,{label:"close_big",buttonSize:"40px",color:i?re:ne,onClick:m})}),!d&&(0,e.jsx)(Js,{children:(0,e.jsx)(Bs,{darkMode:i,withBackground:!0})}),(0,e.jsx)(Zs,{ref:g,src:`${t}frame.html`,title:"Fonts Ninja",allow:"clipboard-read; clipboard-write"})]}))}))]})}))};function tl(e){return tl="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},tl(e)}function nl(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function rl(e,t){return rl=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},rl(e,t)}function ol(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&rl(e,t)}function il(e,t){if(t&&("object"===tl(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return nl(e)}function al(e){return al=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},al(e)}function sl(e){return Pi(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Li(e)||Ni()}function ll(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ul(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ll(Object(n),!0).forEach((function(t){Di(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ll(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var cl={type:"logger",log:function(e){this.output("log",e)},warn:function(e){this.output("warn",e)},error:function(e){this.output("error",e)},output:function(e,t){console&&console[e]&&console[e].apply(console,t)}},fl=new(function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};$i(this,e),this.init(t,n)}return Ai(e,[{key:"init",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.prefix=t.prefix||"i18next:",this.logger=e||cl,this.options=t,this.debug=t.debug}},{key:"setDebug",value:function(e){this.debug=e}},{key:"log",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.forward(t,"log","",!0)}},{key:"warn",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.forward(t,"warn","",!0)}},{key:"error",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.forward(t,"error","")}},{key:"deprecate",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.forward(t,"warn","WARNING DEPRECATED: ",!0)}},{key:"forward",value:function(e,t,n,r){return r&&!this.debug?null:("string"==typeof e[0]&&(e[0]="".concat(n).concat(this.prefix," ").concat(e[0])),this.logger[t](e))}},{key:"create",value:function(t){return new e(this.logger,ul(ul({},{prefix:"".concat(this.prefix,":").concat(t,":")}),this.options))}}]),e}()),dl=function(){function e(){$i(this,e),this.observers={}}return Ai(e,[{key:"on",value:function(e,t){var n=this;return e.split(" ").forEach((function(e){n.observers[e]=n.observers[e]||[],n.observers[e].push(t)})),this}},{key:"off",value:function(e,t){this.observers[e]&&(t?this.observers[e]=this.observers[e].filter((function(e){return e!==t})):delete this.observers[e])}},{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];if(this.observers[e]){var o=[].concat(this.observers[e]);o.forEach((function(e){e.apply(void 0,n)}))}if(this.observers["*"]){var i=[].concat(this.observers["*"]);i.forEach((function(t){t.apply(t,[e].concat(n))}))}}}]),e}();function pl(){var e,t,n=new Promise((function(n,r){e=n,t=r}));return n.resolve=e,n.reject=t,n}function hl(e){return null==e?"":""+e}function gl(e,t,n){e.forEach((function(e){t[e]&&(n[e]=t[e])}))}function ml(e,t,n){function r(e){return e&&e.indexOf("###")>-1?e.replace(/###/g,"."):e}function o(){return!e||"string"==typeof e}for(var i="string"!=typeof t?[].concat(t):t.split(".");i.length>1;){if(o())return{};var a=r(i.shift());!e[a]&&n&&(e[a]=new n),e=Object.prototype.hasOwnProperty.call(e,a)?e[a]:{}}return o()?{}:{obj:e,k:r(i.shift())}}function vl(e,t,n){var r=ml(e,t,Object);r.obj[r.k]=n}function yl(e,t){var n=ml(e,t),r=n.obj,o=n.k;if(r)return r[o]}function bl(e,t,n){var r=yl(e,n);return void 0!==r?r:yl(t,n)}function wl(e,t,n){for(var r in t)"__proto__"!==r&&"constructor"!==r&&(r in e?"string"==typeof e[r]||e[r]instanceof String||"string"==typeof t[r]||t[r]instanceof String?n&&(e[r]=t[r]):wl(e[r],t[r],n):e[r]=t[r]);return e}function xl(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}var kl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};function _l(e){return"string"==typeof e?e.replace(/[&<>"'\/]/g,(function(e){return kl[e]})):e}var Sl="undefined"!=typeof window&&window.navigator&&void 0===window.navigator.userAgentData&&window.navigator.userAgent&&window.navigator.userAgent.indexOf("MSIE")>-1,Ol=[" ",",","?","!",";"];function El(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Cl(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?El(Object(n),!0).forEach((function(t){Di(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):El(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function jl(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=al(e);if(t){var o=al(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return il(this,n)}}function Tl(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".";if(e){if(e[t])return e[t];for(var r=t.split(n),o=e,i=0;i<r.length;++i){if(!o)return;if("string"==typeof o[r[i]]&&i+1<r.length)return;if(void 0===o[r[i]]){for(var a=2,s=r.slice(i,i+a).join(n),l=o[s];void 0===l&&r.length>i+a;)a++,l=o[s=r.slice(i,i+a).join(n)];if(void 0===l)return;if(null===l)return null;if(t.endsWith(s)){if("string"==typeof l)return l;if(s&&"string"==typeof l[s])return l[s]}var u=r.slice(i+a).join(n);return u?Tl(l,u,n):void 0}o=o[r[i]]}return o}}var Pl=function(e){ol(n,e);var t=jl(n);function n(e){var r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{ns:["translation"],defaultNS:"translation"};return $i(this,n),r=t.call(this),Sl&&dl.call(nl(r)),r.data=e||{},r.options=o,void 0===r.options.keySeparator&&(r.options.keySeparator="."),void 0===r.options.ignoreJSONStructure&&(r.options.ignoreJSONStructure=!0),r}return Ai(n,[{key:"addNamespaces",value:function(e){this.options.ns.indexOf(e)<0&&this.options.ns.push(e)}},{key:"removeNamespaces",value:function(e){var t=this.options.ns.indexOf(e);t>-1&&this.options.ns.splice(t,1)}},{key:"getResource",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=void 0!==r.keySeparator?r.keySeparator:this.options.keySeparator,i=void 0!==r.ignoreJSONStructure?r.ignoreJSONStructure:this.options.ignoreJSONStructure,a=[e,t];n&&"string"!=typeof n&&(a=a.concat(n)),n&&"string"==typeof n&&(a=a.concat(o?n.split(o):n)),e.indexOf(".")>-1&&(a=e.split("."));var s=yl(this.data,a);return s||!i||"string"!=typeof n?s:Tl(this.data&&this.data[e]&&this.data[e][t],n,o)}},{key:"addResource",value:function(e,t,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{silent:!1},i=this.options.keySeparator;void 0===i&&(i=".");var a=[e,t];n&&(a=a.concat(i?n.split(i):n)),e.indexOf(".")>-1&&(r=t,t=(a=e.split("."))[1]),this.addNamespaces(t),vl(this.data,a,r),o.silent||this.emit("added",e,t,n,r)}},{key:"addResources",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{silent:!1};for(var o in n)"string"!=typeof n[o]&&"[object Array]"!==Object.prototype.toString.apply(n[o])||this.addResource(e,t,o,n[o],{silent:!0});r.silent||this.emit("added",e,t,n)}},{key:"addResourceBundle",value:function(e,t,n,r,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{silent:!1},a=[e,t];e.indexOf(".")>-1&&(r=n,n=t,t=(a=e.split("."))[1]),this.addNamespaces(t);var s=yl(this.data,a)||{};r?wl(s,n,o):s=Cl(Cl({},s),n),vl(this.data,a,s),i.silent||this.emit("added",e,t,n)}},{key:"removeResourceBundle",value:function(e,t){this.hasResourceBundle(e,t)&&delete this.data[e][t],this.removeNamespaces(t),this.emit("removed",e,t)}},{key:"hasResourceBundle",value:function(e,t){return void 0!==this.getResource(e,t)}},{key:"getResourceBundle",value:function(e,t){return t||(t=this.options.defaultNS),"v1"===this.options.compatibilityAPI?Cl(Cl({},{}),this.getResource(e,t)):this.getResource(e,t)}},{key:"getDataByLanguage",value:function(e){return this.data[e]}},{key:"hasLanguageSomeTranslations",value:function(e){var t=this.getDataByLanguage(e);return!!(t&&Object.keys(t)||[]).find((function(e){return t[e]&&Object.keys(t[e]).length>0}))}},{key:"toJSON",value:function(){return this.data}}]),n}(dl),Ml={processors:{},addPostProcessor:function(e){this.processors[e.name]=e},handle:function(e,t,n,r,o){var i=this;return e.forEach((function(e){i.processors[e]&&(t=i.processors[e].process(t,n,r,o))})),t}};function Ll(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Nl(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ll(Object(n),!0).forEach((function(t){Di(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ll(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Rl(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=al(e);if(t){var o=al(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return il(this,n)}}var Dl={},$l=function(e){ol(n,e);var t=Rl(n);function n(e){var r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return $i(this,n),r=t.call(this),Sl&&dl.call(nl(r)),gl(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],e,nl(r)),r.options=o,void 0===r.options.keySeparator&&(r.options.keySeparator="."),r.logger=fl.create("translator"),r}return Ai(n,[{key:"changeLanguage",value:function(e){e&&(this.language=e)}},{key:"exists",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{interpolation:{}};if(null==e)return!1;var n=this.resolve(e,t);return n&&void 0!==n.res}},{key:"extractFromKey",value:function(e,t){var n=void 0!==t.nsSeparator?t.nsSeparator:this.options.nsSeparator;void 0===n&&(n=":");var r=void 0!==t.keySeparator?t.keySeparator:this.options.keySeparator,o=t.ns||this.options.defaultNS||[],i=n&&e.indexOf(n)>-1,a=!(this.options.userDefinedKeySeparator||t.keySeparator||this.options.userDefinedNsSeparator||t.nsSeparator||function(e,t,n){t=t||"",n=n||"";var r=Ol.filter((function(e){return t.indexOf(e)<0&&n.indexOf(e)<0}));if(0===r.length)return!0;var o=new RegExp("(".concat(r.map((function(e){return"?"===e?"\\?":e})).join("|"),")")),i=!o.test(e);if(!i){var a=e.indexOf(n);a>0&&!o.test(e.substring(0,a))&&(i=!0)}return i}(e,n,r));if(i&&!a){var s=e.match(this.interpolator.nestingRegexp);if(s&&s.length>0)return{key:e,namespaces:o};var l=e.split(n);(n!==r||n===r&&this.options.ns.indexOf(l[0])>-1)&&(o=l.shift()),e=l.join(r)}return"string"==typeof o&&(o=[o]),{key:e,namespaces:o}}},{key:"translate",value:function(e,t,r){var o=this;if("object"!==tl(t)&&this.options.overloadTranslationOptionHandler&&(t=this.options.overloadTranslationOptionHandler(arguments)),t||(t={}),null==e)return"";Array.isArray(e)||(e=[String(e)]);var i=void 0!==t.returnDetails?t.returnDetails:this.options.returnDetails,a=void 0!==t.keySeparator?t.keySeparator:this.options.keySeparator,s=this.extractFromKey(e[e.length-1],t),l=s.key,u=s.namespaces,c=u[u.length-1],f=t.lng||this.language,d=t.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(f&&"cimode"===f.toLowerCase()){if(d){var p=t.nsSeparator||this.options.nsSeparator;return i?(h.res="".concat(c).concat(p).concat(l),h):"".concat(c).concat(p).concat(l)}return i?(h.res=l,h):l}var h=this.resolve(e,t),g=h&&h.res,m=h&&h.usedKey||l,v=h&&h.exactUsedKey||l,y=Object.prototype.toString.apply(g),b=["[object Number]","[object Function]","[object RegExp]"],w=void 0!==t.joinArrays?t.joinArrays:this.options.joinArrays,x=!this.i18nFormat||this.i18nFormat.handleAsObject,k="string"!=typeof g&&"boolean"!=typeof g&&"number"!=typeof g;if(x&&g&&k&&b.indexOf(y)<0&&("string"!=typeof w||"[object Array]"!==y)){if(!t.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");var _=this.options.returnedObjectHandler?this.options.returnedObjectHandler(m,g,Nl(Nl({},t),{},{ns:u})):"key '".concat(l," (").concat(this.language,")' returned an object instead of string.");return i?(h.res=_,h):_}if(a){var S="[object Array]"===y,O=S?[]:{},E=S?v:m;for(var C in g)if(Object.prototype.hasOwnProperty.call(g,C)){var j="".concat(E).concat(a).concat(C);O[C]=this.translate(j,Nl(Nl({},t),{joinArrays:!1,ns:u})),O[C]===j&&(O[C]=g[C])}g=O}}else if(x&&"string"==typeof w&&"[object Array]"===y)(g=g.join(w))&&(g=this.extendTranslation(g,e,t,r));else{var T=!1,P=!1,M=void 0!==t.count&&"string"!=typeof t.count,L=n.hasDefaultValue(t),N=M?this.pluralResolver.getSuffix(f,t.count,t):"",R=t["defaultValue".concat(N)]||t.defaultValue;!this.isValidLookup(g)&&L&&(T=!0,g=R),this.isValidLookup(g)||(P=!0,g=l);var D=t.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey,$=D&&P?void 0:g,F=L&&R!==g&&this.options.updateMissing;if(P||T||F){if(this.logger.log(F?"updateKey":"missingKey",f,c,l,F?R:g),a){var A=this.resolve(l,Nl(Nl({},t),{},{keySeparator:!1}));A&&A.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}var I=[],z=this.languageUtils.getFallbackCodes(this.options.fallbackLng,t.lng||this.language);if("fallback"===this.options.saveMissingTo&&z&&z[0])for(var B=0;B<z.length;B++)I.push(z[B]);else"all"===this.options.saveMissingTo?I=this.languageUtils.toResolveHierarchy(t.lng||this.language):I.push(t.lng||this.language);var U=function(e,n,r){var i=L&&r!==g?r:$;o.options.missingKeyHandler?o.options.missingKeyHandler(e,c,n,i,F,t):o.backendConnector&&o.backendConnector.saveMissing&&o.backendConnector.saveMissing(e,c,n,i,F,t),o.emit("missingKey",e,c,n,g)};this.options.saveMissing&&(this.options.saveMissingPlurals&&M?I.forEach((function(e){o.pluralResolver.getSuffixes(e,t).forEach((function(n){U([e],l+n,t["defaultValue".concat(n)]||R)}))})):U(I,l,R))}g=this.extendTranslation(g,e,t,h,r),P&&g===l&&this.options.appendNamespaceToMissingKey&&(g="".concat(c,":").concat(l)),(P||T)&&this.options.parseMissingKeyHandler&&(g="v1"!==this.options.compatibilityAPI?this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?"".concat(c,":").concat(l):l,T?g:void 0):this.options.parseMissingKeyHandler(g))}return i?(h.res=g,h):g}},{key:"extendTranslation",value:function(e,t,n,r,o){var i=this;if(this.i18nFormat&&this.i18nFormat.parse)e=this.i18nFormat.parse(e,Nl(Nl({},this.options.interpolation.defaultVariables),n),r.usedLng,r.usedNS,r.usedKey,{resolved:r});else if(!n.skipInterpolation){n.interpolation&&this.interpolator.init(Nl(Nl({},n),{interpolation:Nl(Nl({},this.options.interpolation),n.interpolation)}));var a,s="string"==typeof e&&(n&&n.interpolation&&void 0!==n.interpolation.skipOnVariables?n.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);if(s){var l=e.match(this.interpolator.nestingRegexp);a=l&&l.length}var u=n.replace&&"string"!=typeof n.replace?n.replace:n;if(this.options.interpolation.defaultVariables&&(u=Nl(Nl({},this.options.interpolation.defaultVariables),u)),e=this.interpolator.interpolate(e,u,n.lng||this.language,n),s){var c=e.match(this.interpolator.nestingRegexp);a<(c&&c.length)&&(n.nest=!1)}!1!==n.nest&&(e=this.interpolator.nest(e,(function(){for(var e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];return o&&o[0]===r[0]&&!n.context?(i.logger.warn("It seems you are nesting recursively key: ".concat(r[0]," in key: ").concat(t[0])),null):i.translate.apply(i,r.concat([t]))}),n)),n.interpolation&&this.interpolator.reset()}var f=n.postProcess||this.options.postProcess,d="string"==typeof f?[f]:f;return null!=e&&d&&d.length&&!1!==n.applyPostProcessor&&(e=Ml.handle(d,e,t,this.options&&this.options.postProcessPassResolved?Nl({i18nResolved:r},n):n,this)),e}},{key:"resolve",value:function(e){var t,n,r,o,i,a=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof e&&(e=[e]),e.forEach((function(e){if(!a.isValidLookup(t)){var l=a.extractFromKey(e,s),u=l.key;n=u;var c=l.namespaces;a.options.fallbackNS&&(c=c.concat(a.options.fallbackNS));var f=void 0!==s.count&&"string"!=typeof s.count,d=f&&!s.ordinal&&0===s.count&&a.pluralResolver.shouldUseIntlApi(),p=void 0!==s.context&&("string"==typeof s.context||"number"==typeof s.context)&&""!==s.context,h=s.lngs?s.lngs:a.languageUtils.toResolveHierarchy(s.lng||a.language,s.fallbackLng);c.forEach((function(e){a.isValidLookup(t)||(i=e,!Dl["".concat(h[0],"-").concat(e)]&&a.utils&&a.utils.hasLoadedNamespace&&!a.utils.hasLoadedNamespace(i)&&(Dl["".concat(h[0],"-").concat(e)]=!0,a.logger.warn('key "'.concat(n,'" for languages "').concat(h.join(", "),'" won\'t get resolved as namespace "').concat(i,'" was not yet loaded'),"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),h.forEach((function(n){if(!a.isValidLookup(t)){o=n;var i,l=[u];if(a.i18nFormat&&a.i18nFormat.addLookupKeys)a.i18nFormat.addLookupKeys(l,u,n,e,s);else{var c;f&&(c=a.pluralResolver.getSuffix(n,s.count,s));var h="_zero";if(f&&(l.push(u+c),d&&l.push(u+h)),p){var g="".concat(u).concat(a.options.contextSeparator).concat(s.context);l.push(g),f&&(l.push(g+c),d&&l.push(g+h))}}for(;i=l.pop();)a.isValidLookup(t)||(r=i,t=a.getResource(n,e,i,s))}})))}))}})),{res:t,usedKey:n,exactUsedKey:r,usedLng:o,usedNS:i}}},{key:"isValidLookup",value:function(e){return!(void 0===e||!this.options.returnNull&&null===e||!this.options.returnEmptyString&&""===e)}},{key:"getResource",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return this.i18nFormat&&this.i18nFormat.getResource?this.i18nFormat.getResource(e,t,n,r):this.resourceStore.getResource(e,t,n,r)}}],[{key:"hasDefaultValue",value:function(e){var t="defaultValue";for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&t===n.substring(0,t.length)&&void 0!==e[n])return!0;return!1}}]),n}(dl);function Fl(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Al=function(){function e(t){$i(this,e),this.options=t,this.supportedLngs=this.options.supportedLngs||!1,this.logger=fl.create("languageUtils")}return Ai(e,[{key:"getScriptPartFromCode",value:function(e){if(!e||e.indexOf("-")<0)return null;var t=e.split("-");return 2===t.length?null:(t.pop(),"x"===t[t.length-1].toLowerCase()?null:this.formatLanguageCode(t.join("-")))}},{key:"getLanguagePartFromCode",value:function(e){if(!e||e.indexOf("-")<0)return e;var t=e.split("-");return this.formatLanguageCode(t[0])}},{key:"formatLanguageCode",value:function(e){if("string"==typeof e&&e.indexOf("-")>-1){var t=["hans","hant","latn","cyrl","cans","mong","arab"],n=e.split("-");return this.options.lowerCaseLng?n=n.map((function(e){return e.toLowerCase()})):2===n.length?(n[0]=n[0].toLowerCase(),n[1]=n[1].toUpperCase(),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=Fl(n[1].toLowerCase()))):3===n.length&&(n[0]=n[0].toLowerCase(),2===n[1].length&&(n[1]=n[1].toUpperCase()),"sgn"!==n[0]&&2===n[2].length&&(n[2]=n[2].toUpperCase()),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=Fl(n[1].toLowerCase())),t.indexOf(n[2].toLowerCase())>-1&&(n[2]=Fl(n[2].toLowerCase()))),n.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e}},{key:"isSupportedCode",value:function(e){return("languageOnly"===this.options.load||this.options.nonExplicitSupportedLngs)&&(e=this.getLanguagePartFromCode(e)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(e)>-1}},{key:"getBestMatchFromCodes",value:function(e){var t,n=this;return e?(e.forEach((function(e){if(!t){var r=n.formatLanguageCode(e);n.options.supportedLngs&&!n.isSupportedCode(r)||(t=r)}})),!t&&this.options.supportedLngs&&e.forEach((function(e){if(!t){var r=n.getLanguagePartFromCode(e);if(n.isSupportedCode(r))return t=r;t=n.options.supportedLngs.find((function(e){if(0===e.indexOf(r))return e}))}})),t||(t=this.getFallbackCodes(this.options.fallbackLng)[0]),t):null}},{key:"getFallbackCodes",value:function(e,t){if(!e)return[];if("function"==typeof e&&(e=e(t)),"string"==typeof e&&(e=[e]),"[object Array]"===Object.prototype.toString.apply(e))return e;if(!t)return e.default||[];var n=e[t];return n||(n=e[this.getScriptPartFromCode(t)]),n||(n=e[this.formatLanguageCode(t)]),n||(n=e[this.getLanguagePartFromCode(t)]),n||(n=e.default),n||[]}},{key:"toResolveHierarchy",value:function(e,t){var n=this,r=this.getFallbackCodes(t||this.options.fallbackLng||[],e),o=[],i=function(e){e&&(n.isSupportedCode(e)?o.push(e):n.logger.warn("rejecting language code not found in supportedLngs: ".concat(e)))};return"string"==typeof e&&e.indexOf("-")>-1?("languageOnly"!==this.options.load&&i(this.formatLanguageCode(e)),"languageOnly"!==this.options.load&&"currentOnly"!==this.options.load&&i(this.getScriptPartFromCode(e)),"currentOnly"!==this.options.load&&i(this.getLanguagePartFromCode(e))):"string"==typeof e&&i(this.formatLanguageCode(e)),r.forEach((function(e){o.indexOf(e)<0&&i(n.formatLanguageCode(e))})),o}}]),e}(),Il=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","pt","pt-BR","tg","tl","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","et","eu","fi","fo","fur","fy","gl","gu","ha","hi","hu","hy","ia","it","kk","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt-PT","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","ht","id","ja","jbo","ka","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","cnr","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21},{lngs:["he","iw"],nr:[1,2,20,21],fc:22}],zl={1:function(e){return Number(e>1)},2:function(e){return Number(1!=e)},3:function(e){return 0},4:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)},5:function(e){return Number(0==e?0:1==e?1:2==e?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5)},6:function(e){return Number(1==e?0:e>=2&&e<=4?1:2)},7:function(e){return Number(1==e?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)},8:function(e){return Number(1==e?0:2==e?1:8!=e&&11!=e?2:3)},9:function(e){return Number(e>=2)},10:function(e){return Number(1==e?0:2==e?1:e<7?2:e<11?3:4)},11:function(e){return Number(1==e||11==e?0:2==e||12==e?1:e>2&&e<20?2:3)},12:function(e){return Number(e%10!=1||e%100==11)},13:function(e){return Number(0!==e)},14:function(e){return Number(1==e?0:2==e?1:3==e?2:3)},15:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&(e%100<10||e%100>=20)?1:2)},16:function(e){return Number(e%10==1&&e%100!=11?0:0!==e?1:2)},17:function(e){return Number(1==e||e%10==1&&e%100!=11?0:1)},18:function(e){return Number(0==e?0:1==e?1:2)},19:function(e){return Number(1==e?0:0==e||e%100>1&&e%100<11?1:e%100>10&&e%100<20?2:3)},20:function(e){return Number(1==e?0:0==e||e%100>0&&e%100<20?1:2)},21:function(e){return Number(e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0)},22:function(e){return Number(1==e?0:2==e?1:(e<0||e>10)&&e%10==0?2:3)}},Bl=["v1","v2","v3"],Ul={zero:0,one:1,two:2,few:3,many:4,other:5};function Vl(){var e={};return Il.forEach((function(t){t.lngs.forEach((function(n){e[n]={numbers:t.nr,plurals:zl[t.fc]}}))})),e}var Hl=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};$i(this,e),this.languageUtils=t,this.options=n,this.logger=fl.create("pluralResolver"),this.options.compatibilityJSON&&"v4"!==this.options.compatibilityJSON||"undefined"!=typeof Intl&&Intl.PluralRules||(this.options.compatibilityJSON="v3",this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),this.rules=Vl()}return Ai(e,[{key:"addRule",value:function(e,t){this.rules[e]=t}},{key:"getRule",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(this.shouldUseIntlApi())try{return new Intl.PluralRules(e,{type:t.ordinal?"ordinal":"cardinal"})}catch(e){return}return this.rules[e]||this.rules[this.languageUtils.getLanguagePartFromCode(e)]}},{key:"needsPlural",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this.getRule(e,t);return this.shouldUseIntlApi()?n&&n.resolvedOptions().pluralCategories.length>1:n&&n.numbers.length>1}},{key:"getPluralFormsOfKey",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.getSuffixes(e,n).map((function(e){return"".concat(t).concat(e)}))}},{key:"getSuffixes",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=this.getRule(e,n);return r?this.shouldUseIntlApi()?r.resolvedOptions().pluralCategories.sort((function(e,t){return Ul[e]-Ul[t]})).map((function(e){return"".concat(t.options.prepend).concat(e)})):r.numbers.map((function(r){return t.getSuffix(e,r,n)})):[]}},{key:"getSuffix",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=this.getRule(e,n);return r?this.shouldUseIntlApi()?"".concat(this.options.prepend).concat(r.select(t)):this.getSuffixRetroCompatible(r,t):(this.logger.warn("no plural rule found for: ".concat(e)),"")}},{key:"getSuffixRetroCompatible",value:function(e,t){var n=this,r=e.noAbs?e.plurals(t):e.plurals(Math.abs(t)),o=e.numbers[r];this.options.simplifyPluralSuffix&&2===e.numbers.length&&1===e.numbers[0]&&(2===o?o="plural":1===o&&(o=""));var i=function(){return n.options.prepend&&o.toString()?n.options.prepend+o.toString():o.toString()};return"v1"===this.options.compatibilityJSON?1===o?"":"number"==typeof o?"_plural_".concat(o.toString()):i():"v2"===this.options.compatibilityJSON||this.options.simplifyPluralSuffix&&2===e.numbers.length&&1===e.numbers[0]?i():this.options.prepend&&r.toString()?this.options.prepend+r.toString():r.toString()}},{key:"shouldUseIntlApi",value:function(){return!Bl.includes(this.options.compatibilityJSON)}}]),e}();function Wl(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ql(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Wl(Object(n),!0).forEach((function(t){Di(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Wl(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Yl=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};$i(this,e),this.logger=fl.create("interpolator"),this.options=t,this.format=t.interpolation&&t.interpolation.format||function(e){return e},this.init(t)}return Ai(e,[{key:"init",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.interpolation||(e.interpolation={escapeValue:!0});var t=e.interpolation;this.escape=void 0!==t.escape?t.escape:_l,this.escapeValue=void 0===t.escapeValue||t.escapeValue,this.useRawValueToEscape=void 0!==t.useRawValueToEscape&&t.useRawValueToEscape,this.prefix=t.prefix?xl(t.prefix):t.prefixEscaped||"{{",this.suffix=t.suffix?xl(t.suffix):t.suffixEscaped||"}}",this.formatSeparator=t.formatSeparator?t.formatSeparator:t.formatSeparator||",",this.unescapePrefix=t.unescapeSuffix?"":t.unescapePrefix||"-",this.unescapeSuffix=this.unescapePrefix?"":t.unescapeSuffix||"",this.nestingPrefix=t.nestingPrefix?xl(t.nestingPrefix):t.nestingPrefixEscaped||xl("$t("),this.nestingSuffix=t.nestingSuffix?xl(t.nestingSuffix):t.nestingSuffixEscaped||xl(")"),this.nestingOptionsSeparator=t.nestingOptionsSeparator?t.nestingOptionsSeparator:t.nestingOptionsSeparator||",",this.maxReplaces=t.maxReplaces?t.maxReplaces:1e3,this.alwaysFormat=void 0!==t.alwaysFormat&&t.alwaysFormat,this.resetRegExp()}},{key:"reset",value:function(){this.options&&this.init(this.options)}},{key:"resetRegExp",value:function(){var e="".concat(this.prefix,"(.+?)").concat(this.suffix);this.regexp=new RegExp(e,"g");var t="".concat(this.prefix).concat(this.unescapePrefix,"(.+?)").concat(this.unescapeSuffix).concat(this.suffix);this.regexpUnescape=new RegExp(t,"g");var n="".concat(this.nestingPrefix,"(.+?)").concat(this.nestingSuffix);this.nestingRegexp=new RegExp(n,"g")}},{key:"interpolate",value:function(e,t,n,r){var o,i,a,s=this,l=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{};function u(e){return e.replace(/\$/g,"$$$$")}var c=function(e){if(e.indexOf(s.formatSeparator)<0){var o=bl(t,l,e);return s.alwaysFormat?s.format(o,void 0,n,ql(ql(ql({},r),t),{},{interpolationkey:e})):o}var i=e.split(s.formatSeparator),a=i.shift().trim(),u=i.join(s.formatSeparator).trim();return s.format(bl(t,l,a),u,n,ql(ql(ql({},r),t),{},{interpolationkey:a}))};this.resetRegExp();var f=r&&r.missingInterpolationHandler||this.options.missingInterpolationHandler,d=r&&r.interpolation&&void 0!==r.interpolation.skipOnVariables?r.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:function(e){return u(e)}},{regex:this.regexp,safeValue:function(e){return s.escapeValue?u(s.escape(e)):u(e)}}].forEach((function(t){for(a=0;o=t.regex.exec(e);){var n=o[1].trim();if(void 0===(i=c(n)))if("function"==typeof f){var l=f(e,o,r);i="string"==typeof l?l:""}else if(r&&r.hasOwnProperty(n))i="";else{if(d){i=o[0];continue}s.logger.warn("missed to pass in variable ".concat(n," for interpolating ").concat(e)),i=""}else"string"==typeof i||s.useRawValueToEscape||(i=hl(i));var u=t.safeValue(i);if(e=e.replace(o[0],u),d?(t.regex.lastIndex+=i.length,t.regex.lastIndex-=o[0].length):t.regex.lastIndex=0,++a>=s.maxReplaces)break}})),e}},{key:"nest",value:function(e,t){var n,r,o=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=ql({},i);function s(e,t){var n=this.nestingOptionsSeparator;if(e.indexOf(n)<0)return e;var r=e.split(new RegExp("".concat(n,"[ ]*{"))),o="{".concat(r[1]);e=r[0],o=(o=this.interpolate(o,a)).replace(/'/g,'"');try{a=JSON.parse(o),t&&(a=ql(ql({},t),a))}catch(t){return this.logger.warn("failed parsing options string in nesting for key ".concat(e),t),"".concat(e).concat(n).concat(o)}return delete a.defaultValue,e}for(a.applyPostProcessor=!1,delete a.defaultValue;n=this.nestingRegexp.exec(e);){var l=[],u=!1;if(-1!==n[0].indexOf(this.formatSeparator)&&!/{.*}/.test(n[1])){var c=n[1].split(this.formatSeparator).map((function(e){return e.trim()}));n[1]=c.shift(),l=c,u=!0}if((r=t(s.call(this,n[1].trim(),a),a))&&n[0]===e&&"string"!=typeof r)return r;"string"!=typeof r&&(r=hl(r)),r||(this.logger.warn("missed to resolve ".concat(n[1]," for nesting ").concat(e)),r=""),u&&(r=l.reduce((function(e,t){return o.format(e,t,i.lng,ql(ql({},i),{},{interpolationkey:n[1].trim()}))}),r.trim())),e=e.replace(n[0],r),this.regexp.lastIndex=0}return e}}]),e}();function Gl(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Xl(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Gl(Object(n),!0).forEach((function(t){Di(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Gl(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Kl=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};$i(this,e),this.logger=fl.create("formatter"),this.options=t,this.formats={number:function(e,t,n){return new Intl.NumberFormat(t,n).format(e)},currency:function(e,t,n){return new Intl.NumberFormat(t,Xl(Xl({},n),{},{style:"currency"})).format(e)},datetime:function(e,t,n){return new Intl.DateTimeFormat(t,Xl({},n)).format(e)},relativetime:function(e,t,n){return new Intl.RelativeTimeFormat(t,Xl({},n)).format(e,n.range||"day")},list:function(e,t,n){return new Intl.ListFormat(t,Xl({},n)).format(e)}},this.init(t)}return Ai(e,[{key:"init",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{interpolation:{}},n=t.interpolation;this.formatSeparator=n.formatSeparator?n.formatSeparator:n.formatSeparator||","}},{key:"add",value:function(e,t){this.formats[e.toLowerCase().trim()]=t}},{key:"format",value:function(e,t,n,r){var o=this;return t.split(this.formatSeparator).reduce((function(e,t){var i=function(e){var t=e.toLowerCase().trim(),n={};if(e.indexOf("(")>-1){var r=e.split("(");t=r[0].toLowerCase().trim();var o=r[1].substring(0,r[1].length-1);"currency"===t&&o.indexOf(":")<0?n.currency||(n.currency=o.trim()):"relativetime"===t&&o.indexOf(":")<0?n.range||(n.range=o.trim()):o.split(";").forEach((function(e){if(e){var t=sl(e.split(":")),r=t[0],o=t.slice(1).join(":").trim().replace(/^'+|'+$/g,"");n[r.trim()]||(n[r.trim()]=o),"false"===o&&(n[r.trim()]=!1),"true"===o&&(n[r.trim()]=!0),isNaN(o)||(n[r.trim()]=parseInt(o,10))}}))}return{formatName:t,formatOptions:n}}(t),a=i.formatName,s=i.formatOptions;if(o.formats[a]){var l=e;try{var u=r&&r.formatParams&&r.formatParams[r.interpolationkey]||{},c=u.locale||u.lng||r.locale||r.lng||n;l=o.formats[a](e,c,Xl(Xl(Xl({},s),r),u))}catch(e){o.logger.warn(e)}return l}return o.logger.warn("there was no format function for ".concat(a)),e}),e)}}]),e}();function Ql(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Zl(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ql(Object(n),!0).forEach((function(t){Di(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ql(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Jl(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=al(e);if(t){var o=al(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return il(this,n)}}var eu=function(e){ol(n,e);var t=Jl(n);function n(e,r,o){var i,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return $i(this,n),i=t.call(this),Sl&&dl.call(nl(i)),i.backend=e,i.store=r,i.services=o,i.languageUtils=o.languageUtils,i.options=a,i.logger=fl.create("backendConnector"),i.waitingReads=[],i.maxParallelReads=a.maxParallelReads||10,i.readingCalls=0,i.state={},i.queue=[],i.backend&&i.backend.init&&i.backend.init(o,a.backend,a),i}return Ai(n,[{key:"queueLoad",value:function(e,t,n,r){var o=this,i={},a={},s={},l={};return e.forEach((function(e){var r=!0;t.forEach((function(t){var s="".concat(e,"|").concat(t);!n.reload&&o.store.hasResourceBundle(e,t)?o.state[s]=2:o.state[s]<0||(1===o.state[s]?void 0===a[s]&&(a[s]=!0):(o.state[s]=1,r=!1,void 0===a[s]&&(a[s]=!0),void 0===i[s]&&(i[s]=!0),void 0===l[t]&&(l[t]=!0)))})),r||(s[e]=!0)})),(Object.keys(i).length||Object.keys(a).length)&&this.queue.push({pending:a,pendingCount:Object.keys(a).length,loaded:{},errors:[],callback:r}),{toLoad:Object.keys(i),pending:Object.keys(a),toLoadLanguages:Object.keys(s),toLoadNamespaces:Object.keys(l)}}},{key:"loaded",value:function(e,t,n){var r=e.split("|"),o=r[0],i=r[1];t&&this.emit("failedLoading",o,i,t),n&&this.store.addResourceBundle(o,i,n),this.state[e]=t?-1:2;var a={};this.queue.forEach((function(n){!function(e,t,n,r){var o=ml(e,t,Object),i=o.obj,a=o.k;i[a]=i[a]||[],r&&(i[a]=i[a].concat(n)),r||i[a].push(n)}(n.loaded,[o],i),function(e,t){void 0!==e.pending[t]&&(delete e.pending[t],e.pendingCount--)}(n,e),t&&n.errors.push(t),0!==n.pendingCount||n.done||(Object.keys(n.loaded).forEach((function(e){a[e]||(a[e]={});var t=n.loaded[e];t.length&&t.forEach((function(t){void 0===a[e][t]&&(a[e][t]=!0)}))})),n.done=!0,n.errors.length?n.callback(n.errors):n.callback())})),this.emit("loaded",a),this.queue=this.queue.filter((function(e){return!e.done}))}},{key:"read",value:function(e,t,n){var r=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:350,a=arguments.length>5?arguments[5]:void 0;return e.length?this.readingCalls>=this.maxParallelReads?void this.waitingReads.push({lng:e,ns:t,fcName:n,tried:o,wait:i,callback:a}):(this.readingCalls++,this.backend[n](e,t,(function(s,l){if(s&&l&&o<5)setTimeout((function(){r.read.call(r,e,t,n,o+1,2*i,a)}),i);else{if(r.readingCalls--,r.waitingReads.length>0){var u=r.waitingReads.shift();r.read(u.lng,u.ns,u.fcName,u.tried,u.wait,u.callback)}a(s,l)}}))):a(null,{})}},{key:"prepareLoading",value:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3?arguments[3]:void 0;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),o&&o();"string"==typeof e&&(e=this.languageUtils.toResolveHierarchy(e)),"string"==typeof t&&(t=[t]);var i=this.queueLoad(e,t,r,o);if(!i.toLoad.length)return i.pending.length||o(),null;i.toLoad.forEach((function(e){n.loadOne(e)}))}},{key:"load",value:function(e,t,n){this.prepareLoading(e,t,{},n)}},{key:"reload",value:function(e,t,n){this.prepareLoading(e,t,{reload:!0},n)}},{key:"loadOne",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=e.split("|"),o=r[0],i=r[1];this.read(o,i,"read",void 0,void 0,(function(r,a){r&&t.logger.warn("".concat(n,"loading namespace ").concat(i," for language ").concat(o," failed"),r),!r&&a&&t.logger.log("".concat(n,"loaded namespace ").concat(i," for language ").concat(o),a),t.loaded(e,r,a)}))}},{key:"saveMissing",value:function(e,t,n,r,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};this.services.utils&&this.services.utils.hasLoadedNamespace&&!this.services.utils.hasLoadedNamespace(t)?this.logger.warn('did not save key "'.concat(n,'" as the namespace "').concat(t,'" was not yet loaded'),"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"):null!=n&&""!==n&&(this.backend&&this.backend.create&&this.backend.create(e,t,n,r,null,Zl(Zl({},i),{},{isUpdate:o})),e&&e[0]&&this.store.addResource(e[0],t,n,r))}}]),n}(dl);function tu(){return{debug:!1,initImmediate:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!0,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:function(e){var t={};if("object"===tl(e[1])&&(t=e[1]),"string"==typeof e[1]&&(t.defaultValue=e[1]),"string"==typeof e[2]&&(t.tDescription=e[2]),"object"===tl(e[2])||"object"===tl(e[3])){var n=e[3]||e[2];Object.keys(n).forEach((function(e){t[e]=n[e]}))}return t},interpolation:{escapeValue:!0,format:function(e,t,n,r){return e},prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0}}}function nu(e){return"string"==typeof e.ns&&(e.ns=[e.ns]),"string"==typeof e.fallbackLng&&(e.fallbackLng=[e.fallbackLng]),"string"==typeof e.fallbackNS&&(e.fallbackNS=[e.fallbackNS]),e.supportedLngs&&e.supportedLngs.indexOf("cimode")<0&&(e.supportedLngs=e.supportedLngs.concat(["cimode"])),e}function ru(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ou(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ru(Object(n),!0).forEach((function(t){Di(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ru(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function iu(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=al(e);if(t){var o=al(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return il(this,n)}}function au(){}function su(e){Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((function(t){"function"==typeof e[t]&&(e[t]=e[t].bind(e))}))}var lu=function(e){ol(n,e);var t=iu(n);function n(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1?arguments[1]:void 0;if($i(this,n),e=t.call(this),Sl&&dl.call(nl(e)),e.options=nu(r),e.services={},e.logger=fl,e.modules={external:[]},su(nl(e)),o&&!e.isInitialized&&!r.isClone){if(!e.options.initImmediate)return e.init(r,o),il(e,nl(e));setTimeout((function(){e.init(r,o)}),0)}return e}return Ai(n,[{key:"init",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;"function"==typeof t&&(n=t,t={}),!t.defaultNS&&t.ns&&("string"==typeof t.ns?t.defaultNS=t.ns:t.ns.indexOf("translation")<0&&(t.defaultNS=t.ns[0]));var r=tu();function o(e){return e?"function"==typeof e?new e:e:null}if(this.options=ou(ou(ou({},r),this.options),nu(t)),"v1"!==this.options.compatibilityAPI&&(this.options.interpolation=ou(ou({},r.interpolation),this.options.interpolation)),void 0!==t.keySeparator&&(this.options.userDefinedKeySeparator=t.keySeparator),void 0!==t.nsSeparator&&(this.options.userDefinedNsSeparator=t.nsSeparator),!this.options.isClone){var i;this.modules.logger?fl.init(o(this.modules.logger),this.options):fl.init(null,this.options),this.modules.formatter?i=this.modules.formatter:"undefined"!=typeof Intl&&(i=Kl);var a=new Al(this.options);this.store=new Pl(this.options.resources,this.options);var s=this.services;s.logger=fl,s.resourceStore=this.store,s.languageUtils=a,s.pluralResolver=new Hl(a,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),!i||this.options.interpolation.format&&this.options.interpolation.format!==r.interpolation.format||(s.formatter=o(i),s.formatter.init(s,this.options),this.options.interpolation.format=s.formatter.format.bind(s.formatter)),s.interpolator=new Yl(this.options),s.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},s.backendConnector=new eu(o(this.modules.backend),s.resourceStore,s,this.options),s.backendConnector.on("*",(function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];e.emit.apply(e,[t].concat(r))})),this.modules.languageDetector&&(s.languageDetector=o(this.modules.languageDetector),s.languageDetector.init(s,this.options.detection,this.options)),this.modules.i18nFormat&&(s.i18nFormat=o(this.modules.i18nFormat),s.i18nFormat.init&&s.i18nFormat.init(this)),this.translator=new $l(this.services,this.options),this.translator.on("*",(function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];e.emit.apply(e,[t].concat(r))})),this.modules.external.forEach((function(t){t.init&&t.init(e)}))}if(this.format=this.options.interpolation.format,n||(n=au),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){var l=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);l.length>0&&"dev"!==l[0]&&(this.options.lng=l[0])}this.services.languageDetector||this.options.lng||this.logger.warn("init: no languageDetector is used and no lng is defined");var u=["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"];u.forEach((function(t){e[t]=function(){var n;return(n=e.store)[t].apply(n,arguments)}}));var c=["addResource","addResources","addResourceBundle","removeResourceBundle"];c.forEach((function(t){e[t]=function(){var n;return(n=e.store)[t].apply(n,arguments),e}}));var f=pl(),d=function(){var t=function(t,r){e.isInitialized&&!e.initializedStoreOnce&&e.logger.warn("init: i18next is already initialized. You should call init just once!"),e.isInitialized=!0,e.options.isClone||e.logger.log("initialized",e.options),e.emit("initialized",e.options),f.resolve(r),n(t,r)};if(e.languages&&"v1"!==e.options.compatibilityAPI&&!e.isInitialized)return t(null,e.t.bind(e));e.changeLanguage(e.options.lng,t)};return this.options.resources||!this.options.initImmediate?d():setTimeout(d,0),f}},{key:"loadResources",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:au,r=n,o="string"==typeof e?e:this.language;if("function"==typeof e&&(r=e),!this.options.resources||this.options.partialBundledLanguages){if(o&&"cimode"===o.toLowerCase())return r();var i=[],a=function(e){e&&t.services.languageUtils.toResolveHierarchy(e).forEach((function(e){i.indexOf(e)<0&&i.push(e)}))};if(o)a(o);else{var s=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);s.forEach((function(e){return a(e)}))}this.options.preload&&this.options.preload.forEach((function(e){return a(e)})),this.services.backendConnector.load(i,this.options.ns,(function(e){e||t.resolvedLanguage||!t.language||t.setResolvedLanguage(t.language),r(e)}))}else r(null)}},{key:"reloadResources",value:function(e,t,n){var r=pl();return e||(e=this.languages),t||(t=this.options.ns),n||(n=au),this.services.backendConnector.reload(e,t,(function(e){r.resolve(),n(e)})),r}},{key:"use",value:function(e){if(!e)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!e.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return"backend"===e.type&&(this.modules.backend=e),("logger"===e.type||e.log&&e.warn&&e.error)&&(this.modules.logger=e),"languageDetector"===e.type&&(this.modules.languageDetector=e),"i18nFormat"===e.type&&(this.modules.i18nFormat=e),"postProcessor"===e.type&&Ml.addPostProcessor(e),"formatter"===e.type&&(this.modules.formatter=e),"3rdParty"===e.type&&this.modules.external.push(e),this}},{key:"setResolvedLanguage",value:function(e){if(e&&this.languages&&!(["cimode","dev"].indexOf(e)>-1))for(var t=0;t<this.languages.length;t++){var n=this.languages[t];if(!(["cimode","dev"].indexOf(n)>-1)&&this.store.hasLanguageSomeTranslations(n)){this.resolvedLanguage=n;break}}}},{key:"changeLanguage",value:function(e,t){var n=this;this.isLanguageChangingTo=e;var r=pl();this.emit("languageChanging",e);var o=function(e){n.language=e,n.languages=n.services.languageUtils.toResolveHierarchy(e),n.resolvedLanguage=void 0,n.setResolvedLanguage(e)},i=function(i){e||i||!n.services.languageDetector||(i=[]);var a="string"==typeof i?i:n.services.languageUtils.getBestMatchFromCodes(i);a&&(n.language||o(a),n.translator.language||n.translator.changeLanguage(a),n.services.languageDetector&&n.services.languageDetector.cacheUserLanguage(a)),n.loadResources(a,(function(e){!function(e,i){i?(o(i),n.translator.changeLanguage(i),n.isLanguageChangingTo=void 0,n.emit("languageChanged",i),n.logger.log("languageChanged",i)):n.isLanguageChangingTo=void 0,r.resolve((function(){return n.t.apply(n,arguments)})),t&&t(e,(function(){return n.t.apply(n,arguments)}))}(e,a)}))};return e||!this.services.languageDetector||this.services.languageDetector.async?!e&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect(i):i(e):i(this.services.languageDetector.detect()),r}},{key:"getFixedT",value:function(e,t,n){var r=this,o=function e(t,o){var i;if("object"!==tl(o)){for(var a=arguments.length,s=new Array(a>2?a-2:0),l=2;l<a;l++)s[l-2]=arguments[l];i=r.options.overloadTranslationOptionHandler([t,o].concat(s))}else i=ou({},o);i.lng=i.lng||e.lng,i.lngs=i.lngs||e.lngs,i.ns=i.ns||e.ns;var u=r.options.keySeparator||".",c=n?"".concat(n).concat(u).concat(t):t;return r.t(c,i)};return"string"==typeof e?o.lng=e:o.lngs=e,o.ns=t,o.keyPrefix=n,o}},{key:"t",value:function(){var e;return this.translator&&(e=this.translator).translate.apply(e,arguments)}},{key:"exists",value:function(){var e;return this.translator&&(e=this.translator).exists.apply(e,arguments)}},{key:"setDefaultNamespace",value:function(e){this.options.defaultNS=e}},{key:"hasLoadedNamespace",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;var r=this.resolvedLanguage||this.languages[0],o=!!this.options&&this.options.fallbackLng,i=this.languages[this.languages.length-1];if("cimode"===r.toLowerCase())return!0;var a=function(e,n){var r=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===r||2===r};if(n.precheck){var s=n.precheck(this,a);if(void 0!==s)return s}return!!this.hasResourceBundle(r,e)||(!(this.services.backendConnector.backend&&(!this.options.resources||this.options.partialBundledLanguages))||!(!a(r,e)||o&&!a(i,e)))}},{key:"loadNamespaces",value:function(e,t){var n=this,r=pl();return this.options.ns?("string"==typeof e&&(e=[e]),e.forEach((function(e){n.options.ns.indexOf(e)<0&&n.options.ns.push(e)})),this.loadResources((function(e){r.resolve(),t&&t(e)})),r):(t&&t(),Promise.resolve())}},{key:"loadLanguages",value:function(e,t){var n=pl();"string"==typeof e&&(e=[e]);var r=this.options.preload||[],o=e.filter((function(e){return r.indexOf(e)<0}));return o.length?(this.options.preload=r.concat(o),this.loadResources((function(e){n.resolve(),t&&t(e)})),n):(t&&t(),Promise.resolve())}},{key:"dir",value:function(e){if(e||(e=this.resolvedLanguage||(this.languages&&this.languages.length>0?this.languages[0]:this.language)),!e)return"rtl";return["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"].indexOf(this.services.languageUtils.getLanguagePartFromCode(e))>-1||e.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}},{key:"cloneInstance",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:au,o=ou(ou(ou({},this.options),t),{isClone:!0}),i=new n(o),a=["store","services","language"];return a.forEach((function(t){i[t]=e[t]})),i.services=ou({},this.services),i.services.utils={hasLoadedNamespace:i.hasLoadedNamespace.bind(i)},i.translator=new $l(i.services,i.options),i.translator.on("*",(function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];i.emit.apply(i,[e].concat(n))})),i.init(o,r),i.translator.options=i.options,i.translator.backendConnector.services.utils={hasLoadedNamespace:i.hasLoadedNamespace.bind(i)},i}},{key:"toJSON",value:function(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}]),n}(dl);Di(lu,"createInstance",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return new lu(e,t)}));var uu=lu.createInstance();uu.createInstance=lu.createInstance;uu.createInstance,uu.init,uu.loadResources,uu.reloadResources,uu.use,uu.changeLanguage,uu.getFixedT;var cu=uu.t;uu.exists,uu.setDefaultNamespace,uu.hasLoadedNamespace,uu.loadNamespaces,uu.loadLanguages;const fu=uu,du=qe.div`
  display: flex;
  justify-content: space-between;
  /* MOBILE */
  margin-top: 24px;
  /* TABLET */
  ${ia.tablet} {
    margin-top: 34px;
  }
`,pu=qe.div`
  position: relative;
  height: auto;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  /* MOBILE */
  max-width: 87px;
  /* TABLET */
  ${ia.tablet} {
    max-width: 103px;
  }
  ${e=>e.selected&&Y.css`
      img {
        opacity: 1;
        box-shadow: 0px 2px 32px 0px ${je};
      }
      p {
        color: ${ne};
      }
    `}
  &:hover {
    img {
      opacity: 1;
    }
  }
`,hu=qe.img`
  border-radius: 8px;
  opacity: 0.5;
  transition: opacity 0.25s ${Sa}, box-shadow 0.25s ${Sa};
  width: 100%;
  height: auto;
`,gu=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  color: ${ae};
  text-align: center;
  white-space: nowrap;
  margin-top: 6px;
  transition: color 0.25s ${Sa};
  /* MOBILE */
  font-size: ${da};
  /* TABLET */
  ${ia.tablet} {
    font-size: ${fa};
  }
`,mu=()=>{const{t}=ra(),{extensionPath:r}=T(),{settings:o,updateTheme:i}=F(),{theme:a}=o,s=(0,n.useCallback)((e=>{i(e)}),[i]);return(0,e.jsxs)(du,{children:[(0,e.jsxs)(pu,Object.assign({selected:"auto"===a,onClick:()=>s("auto")},{children:[(0,e.jsx)(hu,{src:`${r}img/theme-match-system.svg`,alt:t("settings.theme.match-system")}),(0,e.jsx)(gu,{children:t("settings.theme.match-system")})]})),(0,e.jsxs)(pu,Object.assign({selected:"light"===a,onClick:()=>s("light")},{children:[(0,e.jsx)(hu,{src:`${r}img/theme-light.svg`,alt:t("settings.theme.light")}),(0,e.jsx)(gu,{children:t("settings.theme.light")})]})),(0,e.jsxs)(pu,Object.assign({selected:"dark"===a,onClick:()=>s("dark")},{children:[(0,e.jsx)(hu,{src:`${r}img/theme-dark.svg`,alt:t("settings.theme.dark")}),(0,e.jsx)(gu,{children:t("settings.theme.dark")})]}))]})},vu=mu,yu=qe.div`
  display: flex;
  justify-content: space-between;
  /* MOBILE */
  margin-top: 30px;
  /* TABLE */
  ${ia.tablet} {
    margin-top: 40px;
  }
`,bu=qe.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>e.dark?ee:J};
  border-radius: 50%;
  cursor: pointer;
  transition: border 0.25s ${Sa}, box-shadow 0.25s ${Sa};
  ${e=>!e.selected&&!e.dark&&Y.css`
      border: 1.5px solid ${Ee};
    `}
  ${e=>e.selected&&Y.css`
      border: 1.5px solid transparent;
      box-shadow: 0px 2px 32px 0px ${je};
      img {
        opacity: 1;
      }
    `}
  &:hover {
    img {
      opacity: 1;
    }
  }
  /* MOBILE */
  width: 38px;
  height: 38px;
  /* TABLET */
  ${ia.tablet} {
    width: 48px;
    height: 48px;
  }
`,wu=qe.img`
  width: 16px;
  height: 16px;
  opacity: 0.5;
  transition: opacity 0.25s ${Sa};
`,xu=()=>{const{extensionPath:t}=T(),{settings:r,updateSettingsElement:o}=F(),{iconIndex:i}=r,a=(0,n.useMemo)((()=>[{index:0,icon:"icons/icon-0.png",darkBackground:!1},{index:1,icon:"icons/icon-1.png",darkBackground:!1},{index:2,icon:"icons/icon-2.png",darkBackground:!0},{index:3,icon:"icons/icon-3.png",darkBackground:!1},{index:4,icon:"icons/icon-4.png",darkBackground:!1},{index:5,icon:"icons/icon-5.png",darkBackground:!0}]),[]),s=(0,n.useCallback)((e=>{o("iconIndex",e),window.postMessage({type:"change_fonts_ninja_icon",iconIndex:e})}),[o]);return(0,e.jsx)(yu,{children:a.map((({index:n,icon:r,darkBackground:o})=>(0,e.jsx)(bu,Object.assign({selected:i===n,dark:o,onClick:()=>s(n)},{children:(0,e.jsx)(wu,{src:`${t}${r}`,alt:""})}),n)))})},ku=qe.div`
  display: ${e=>e.show?"flex":"none"};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2147483647;
`,_u=qe.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${te};
  pointer-events: auto;
`,Su=qe.div`
  position: relative;
  width: 424px;
  background-color: ${J};
  border-radius: 32px;
  overflow: hidden;
  pointer-events: auto;

  /* MOBILE */
  max-width: 336px;
  margin: 0 20px;
  /* TABLET */
  ${ia.tablet} {
    max-width: none;
    margin: 0;
  }
`,Ou=qe.div`
  position: absolute;
  top: 32px;
  /* MOBILE */
  right: 24px;
  /* TABLET */
  ${ia.tablet} {
    right: 32px;
  }
`,Eu=qe.div`
  /* MOBILE */
  padding: 32px 24px 30px;
  /* TABLET */
  ${ia.tablet} {
    padding: 42px 48px 40px;
  }

  h2 {
    /* MOBILE */
    font-size: 24px;
    letter-spacing: -0.24px;
    /* TABLET */
    ${ia.tablet} {
      font-size: 32px;
      letter-spacing: -0.32px;
    }
  }
`,Cu=qe.h1`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${ua};
  line-height: 30px;
  color: ${ne};
`,ju=qe.div`
  /* MOBILE */
  margin: 32px 0 0;
  /* TABLET */
  ${ia.tablet} {
    margin: 40px 0 0;
  }

  button {
    /* MOBILE */
    justify-content: center;
    width: 100%;
    margin-bottom: 8px;
    &:last-of-type {
      margin-bottom: 0;
    }
    /* TABLET */
    ${ia.tablet} {
      width: auto;
      margin-bottom: 0;
      margin-right: 8px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
`,Tu=()=>{const{openSettings:t,setOpenSettings:r,setOpenTutorial:o}=T(),{settings:i}=F(),{browser:u}=i,f=(0,n.useMemo)((()=>u.name!==d&&"Mobile Safari"!==u.name),[u.name]),[p,h]=(0,n.useState)(!1),g=(0,n.useCallback)((()=>{r(!1)}),[r]),m=(0,n.useCallback)((()=>{o(!0)}),[o]),v=(0,n.useCallback)((()=>{window.postMessage({type:l,key:c,attributes:["accessToken","refreshToken"],values:[void 0,void 0]}),h(!1)}),[]);return(0,n.useEffect)((()=>{t&&(window.postMessage({type:a,key:c}),window.addEventListener("message",(({data:e})=>{if(e&&e.type===s){const t=e.storage;t&&t.accessToken&&t.refreshToken?h(!0):h(!1)}})))}),[t]),(0,e.jsxs)(ku,Object.assign({show:t},{children:[(0,e.jsx)(_u,{onClick:g}),(0,e.jsxs)(Su,Object.assign({browserName:u.name,withLogoutButton:p},{children:[(0,e.jsx)(Ou,{children:(0,e.jsx)(Ca,{label:"close_big",buttonSize:"40px",color:ne,onClick:g})}),(0,e.jsxs)(Eu,{children:[(0,e.jsx)(Cu,{children:cu("settings.title")}),(0,e.jsx)(vu,{}),f&&(0,e.jsx)(xu,{}),(0,e.jsxs)(ju,{children:[(0,e.jsx)(ss,Object.assign({icon:"info",render:"secondary",onClick:m},{children:cu("settings.watch-tutorial")})),p&&(0,e.jsx)(ss,Object.assign({icon:"logout",render:"secondary",onClick:v},{children:cu("settings.logout-button")}))]})]})]}))]}))},Pu=Tu,Mu=qe.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    background-color: ${G};
    object-fit: ${e=>e.objectFit};
  }
`,Lu=({src:t,autoplay:r=!1,loop:o=!1,muted:i=!0,objectFit:a="contain",onPlaying:s})=>{const l=(0,n.useRef)(null);return(0,e.jsx)(Mu,Object.assign({className:"video-wrapper",objectFit:a},{children:(0,e.jsx)("video",{ref:l,src:t,autoPlay:r,loop:o,muted:i,playsInline:!0,onPlaying:s})}))},Nu=[{id:"step-1",videoSrc:"/videos/extension/step-1.mp4"},{id:"step-2",videoSrc:"/videos/extension/step-2.mp4"},{id:"step-3",videoSrc:"/videos/extension/step-3.mp4"},{id:"step-4",videoSrc:"/videos/extension/step-4.mp4"}],Ru=qe.h1`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${ua};
  line-height: 30px;
  letter-spacing: -0.12px;
  text-align: center;
  color: ${ne};
  margin-bottom: 24px;
`,Du=qe.div`
  width: 100%;
  height: auto;
  aspect-ratio: 1.677;
  margin-bottom: 8px;
  overflow: hidden;
  /* MOBILE */
  border-radius: 24px;
  /* TABLET */
  ${ia.tablet} {
    border-radius: 32px;
  }

  .video-wrapper > video {
    background-color: ${J};
  }
`,$u=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: ${ca};
  line-height: normal;
  text-align: center;
  color: ${ne};
  margin-bottom: 16px;
`,Fu=qe.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`,Au=qe.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${e=>e.selected?de:Ee};
  cursor: ${e=>e.selected?"default":"pointer"};
  margin-right: 4px;
  &:last-of-type {
    margin-right: 0;
  }
`,Iu=qe.div`
  display: flex;
  justify-content: center;
`,zu=({onDisplayTutorialEnd:t})=>{const{t:r}=ra(),o=(0,n.useMemo)((()=>Nu.map((e=>e))),[]),[i,a]=(0,n.useState)(0),s=(0,n.useCallback)((e=>{a(e)}),[]),l=(0,n.useCallback)((()=>{i+1<o.length?a(i+1):null==t||t()}),[i,t,o.length]);return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(Ru,{children:r("tutorial.slideshow.title")}),(0,e.jsx)(Du,{children:(0,e.jsx)(Lu,{src:`https://fonts.ninja${o[i].videoSrc}`,autoplay:!0,loop:!0,muted:!0,objectFit:"cover"})}),(0,e.jsx)($u,{children:r(`tutorial.slideshow.steps.${o[i].id}`)}),(0,e.jsx)(Fu,{children:o.map(((t,n)=>(0,e.jsx)(Au,{selected:o[i].id===t.id,onClick:()=>s(n)},n)))}),(0,e.jsx)(Iu,{children:(0,e.jsx)(ss,Object.assign({icon:"arrow-right",onClick:l},{children:r("tutorial.slideshow.next")}))})]})},Bu=qe.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`,Uu=qe.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`,Vu=qe.h1`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${ua};
  line-height: 30px;
  letter-spacing: -0.12px;
  text-align: center;
  color: ${ne};
  margin-bottom: 16px;
`,Hu=qe.div`
  display: flex;
  flex: 1;
  max-height: 19px;
`,Wu=qe.p`
  font-family: 'FontsNinja-Aeonik', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${fa};
  line-height: normal;
  text-align: center;
  color: ${ne};

  a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`,qu=({onReinitSlideshowStep:t})=>{const{t:r}=ra(),{setOpenTutorial:o}=T(),{machineId:i,updateSettingsElement:a}=F(),s=(0,n.useCallback)((()=>{a("completeTutorialV8",!0),t(),o(!1)}),[t,o,a]);return(0,e.jsxs)(Bu,{children:[(0,e.jsxs)(Uu,{children:[(0,e.jsx)(Vu,{dangerouslySetInnerHTML:{__html:r("tutorial.end.title")}}),(0,e.jsx)(ss,Object.assign({icon:"tick",onClick:s},{children:r("tutorial.end.done")}))]}),(0,e.jsx)(Hu,{children:(0,e.jsxs)(Wu,{children:[r("tutorial.end.any-questions")," ",(0,e.jsx)("a",Object.assign({href:O(i,!0),target:"_blank",rel:"noreferrer",draggable:"false"},{children:r("tutorial.end.contact-us")}))]})})]})},Yu=qe.div`
  display: ${e=>e.show?"flex":"none"};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2147483647;
`,Gu=qe.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${te};
  pointer-events: auto;
`,Xu=qe.div`
  position: relative;
  width: 454px;
  background-color: ${J};
  border-radius: 32px;
  overflow: hidden;
  pointer-events: auto;
  /* MOBILE */
  height: 424px;
  max-width: 336px;
  margin: 0 20px;
  /* TABLET */
  ${ia.tablet} {
    height: 496px;
    max-width: none;
    margin: 0;
  }
`,Ku=qe.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* MOBILE */
  padding: 32px 24px 30px;
  /* TABLET */
  ${ia.tablet} {
    padding: 42px 40px 40px;
  }
`,Qu=()=>{const{openTutorial:t,setOpenTutorial:r}=T(),{settings:o}=F(),{fontFamiliesToDisplay:i}=B(),{displayTutorialV8:a}=o,[s,l]=(0,n.useState)("slideshow"),u=(0,n.useRef)(!1),c=(0,n.useCallback)((()=>{r(!1)}),[r]),f=(0,n.useCallback)((()=>{l("end")}),[]),d=(0,n.useCallback)((()=>{l("slideshow")}),[]);return(0,n.useEffect)((()=>{!a||t||b(i)||u.current||(r(!0),u.current=!0)}),[a,i,t,r]),(0,e.jsxs)(Yu,Object.assign({show:t},{children:[(0,e.jsx)(Gu,{onClick:c}),(0,e.jsx)(Xu,{children:(0,e.jsxs)(Ku,{children:["slideshow"===s&&(0,e.jsx)(zu,{onDisplayTutorialEnd:f}),"end"===s&&(0,e.jsx)(qu,{onReinitSlideshowStep:d})]})})]}))},Zu=()=>{const{settingsReady:t,checkedDisplayPush:n}=F();return(0,e.jsx)(e.Fragment,{children:t&&n&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(q,{children:(0,e.jsx)(Os,{})}),(0,e.jsx)(As,{}),(0,e.jsx)(el,{}),(0,e.jsx)(Pu,{}),(0,e.jsx)(Qu,{})]})})},Ju=Y.css`
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

  /* Document
  ========================================================================== */

  /**
  * 1. Correct the line height in all browsers.
  * 2. Prevent adjustments of font size after orientation changes in iOS.
  */

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /* Sections
  ========================================================================== */

  /**
  * Remove the margin in all browsers.
  */

  body {
    margin: 0;
  }

  /**
  * Render the 'main' element consistently in IE.
  */

  main {
    display: block;
  }

  /**
  * Correct the font size and margin on 'h1' elements within 'section' and
  * 'article' contexts in Chrome, Firefox, and Safari.
  */

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  /* Grouping content
  ========================================================================== */

  /**
  * 1. Add the correct box sizing in Firefox.
  * 2. Show the overflow in Edge and IE.
  */

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
  * 1. Correct the inheritance and scaling of font size in all browsers.
  * 2. Correct the odd 'em' font sizing in all browsers.
  */

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /* Text-level semantics
  ========================================================================== */

  /**
  * Remove the gray background on active links in IE 10.
  */

  a {
    background-color: transparent;
  }

  /**
  * 1. Remove the bottom border in Chrome 57-
  * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
  */

  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  /**
  * Add the correct font weight in Chrome, Edge, and Safari.
  */

  b,
  strong {
    font-weight: bolder;
  }

  /**
  * 1. Correct the inheritance and scaling of font size in all browsers.
  * 2. Correct the odd 'em' font sizing in all browsers.
  */

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /**
  * Add the correct font size in all browsers.
  */

  small {
    font-size: 80%;
  }

  /**
  * Prevent 'sub' and 'sup' elements from affecting the line height in
  * all browsers.
  */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /* Embedded content
  ========================================================================== */

  /**
  * Remove the border on images inside links in IE 10.
  */

  img {
    border-style: none;
  }

  /* Forms
  ========================================================================== */

  /**
  * 1. Change the font styles in all browsers.
  * 2. Remove the margin in Firefox and Safari.
  */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
  * Show the overflow in IE.
  * 1. Show the overflow in Edge.
  */

  button,
  input {
    /* 1 */
    overflow: visible;
  }

  /**
  * Remove the inheritance of text transform in Edge, Firefox, and IE.
  * 1. Remove the inheritance of text transform in Firefox.
  */

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  /**
  * Correct the inability to style clickable types in iOS and Safari.
  */

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    appearance: button;
    -webkit-appearance: button;
  }

  /**
  * Remove the inner border and padding in Firefox.
  */

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
  * Restore the focus styles unset by the previous rule.
  */

  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
  * Correct the padding in Firefox.
  */

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  /**
  * 1. Correct the text wrapping in Edge and IE.
  * 2. Correct the color inheritance from 'fieldset' elements in IE.
  * 3. Remove the padding so developers are not caught out when they zero out
  *    'fieldset' elements in all browsers.
  */

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  /**
  * Add the correct vertical alignment in Chrome, Firefox, and Opera.
  */

  progress {
    vertical-align: baseline;
  }

  /**
  * Remove the default vertical scrollbar in IE 10+.
  */

  textarea {
    overflow: auto;
  }

  /**
  * 1. Add the correct box sizing in IE 10.
  * 2. Remove the padding in IE 10.
  */

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  /**
  * Correct the cursor style of increment and decrement buttons in Chrome.
  */

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  /**
  * 1. Correct the odd appearance in Chrome and Safari.
  * 2. Correct the outline style in Safari.
  */

  [type='search'] {
    appearance: textfield; /* 1 */
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
  * Remove the inner padding in Chrome and Safari on macOS.
  */

  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
  * 1. Correct the inability to style clickable types in iOS and Safari.
  * 2. Change font properties to 'inherit' in Safari.
  */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /* Interactive
  ========================================================================== */

  /*
  * Add the correct display in Edge, IE 10+, and Firefox.
  */

  details {
    display: block;
  }

  /*
  * Add the correct display in all browsers.
  */

  summary {
    display: list-item;
  }

  /* Misc
  ========================================================================== */

  /**
  * Add the correct display in IE 10+.
  */

  template {
    display: none;
  }

  /**
  * Add the correct display in IE 10.
  */

  [hidden] {
    display: none;
  }
`,ec=Y.css`
  html {
    /* Fix Safari for proper renders on variables fonts */
    font-synthesis: none;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`,tc=Y.css`
  [class^='icon-'],
  [class*=' icon-'] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'FontsNinja-Icons' !important;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-add:before {
    content: '\\e900';
  }
  .icon-adobe:before {
    content: '\\e901';
  }
  .icon-all:before {
    content: '\\e902';
  }
  .icon-arrow-down:before {
    content: '\\e903';
  }
  .icon-arrow-left:before {
    content: '\\e904';
  }
  .icon-arrow-right:before {
    content: '\\e905';
  }
  .icon-aspect_0:before {
    content: '\\e906';
  }
  .icon-aspect_1:before {
    content: '\\e907';
  }
  .icon-aspect_2:before {
    content: '\\e908';
  }
  .icon-aspect_3:before {
    content: '\\e909';
  }
  .icon-aspect_4:before {
    content: '\\e90a';
  }
  .icon-back:before {
    content: '\\e90b';
  }
  .icon-board_multi:before {
    content: '\\e90c';
  }
  .icon-bookmark_folder:before {
    content: '\\e90d';
  }
  .icon-bookmark-add:before {
    content: '\\e90e';
  }
  .icon-bookmark-bookmarked:before {
    content: '\\e90f';
  }
  .icon-bookmark-not_bookmark:before {
    content: '\\e910';
  }
  .icon-bookmark-remove:before {
    content: '\\e911';
  }
  .icon-calendar:before {
    content: '\\e912';
  }
  .icon-close_big:before {
    content: '\\e913';
  }
  .icon-close_circle:before {
    content: '\\e914';
  }
  .icon-contrast_0:before {
    content: '\\e915';
  }
  .icon-contrast_25:before {
    content: '\\e916';
  }
  .icon-contrast_50:before {
    content: '\\e917';
  }
  .icon-contrast_75:before {
    content: '\\e918';
  }
  .icon-contrast_100:before {
    content: '\\e919';
  }
  .icon-copy_paste:before {
    content: '\\e91a';
  }
  .icon-delete:before {
    content: '\\e91b';
  }
  .icon-download:before {
    content: '\\e91c';
  }
  .icon-edit:before {
    content: '\\e91d';
  }
  .icon-email:before {
    content: '\\e91e';
  }
  .icon-ending_rounded:before {
    content: '\\e91f';
  }
  .icon-ending_square:before {
    content: '\\e920';
  }
  .icon-enter:before {
    content: '\\e921';
  }
  .icon-filter:before {
    content: '\\e922';
  }
  .icon-font_folder:before {
    content: '\\e923';
  }
  .icon-font_manager-all_fonts:before {
    content: '\\e924';
  }
  .icon-font_manager-font_collection:before {
    content: '\\e925';
  }
  .icon-font_manager-free:before {
    content: '\\e926';
  }
  .icon-font_manager-licenses:before {
    content: '\\e927';
  }
  .icon-font_manager-local_fonts:before {
    content: '\\e928';
  }
  .icon-font_manager-shared_with_you:before {
    content: '\\e929';
  }
  .icon-font_manager-trial:before {
    content: '\\e92a';
  }
  .icon-font-letter_spacing:before {
    content: '\\e92b';
  }
  .icon-font-line_height:before {
    content: '\\e92c';
  }
  .icon-font-size:before {
    content: '\\e92d';
  }
  .icon-font:before {
    content: '\\e92e';
  }
  .icon-google-full:before {
    content: '\\e92f';
  }
  .icon-google:before {
    content: '\\e930';
  }
  .icon-help_wheel:before {
    content: '\\e931';
  }
  .icon-help:before {
    content: '\\e932';
  }
  .icon-info:before {
    content: '\\e933';
  }
  .icon-instagram:before {
    content: '\\e934';
  }
  .icon-italic:before {
    content: '\\e935';
  }
  .icon-less:before {
    content: '\\e936';
  }
  .icon-license-adverstising:before {
    content: '\\e937';
  }
  .icon-license-app:before {
    content: '\\e938';
  }
  .icon-license-branding:before {
    content: '\\e939';
  }
  .icon-license-desktop:before {
    content: '\\e93a';
  }
  .icon-license-expiration_date:before {
    content: '\\e93b';
  }
  .icon-license-manage:before {
    content: '\\e93c';
  }
  .icon-license-movie:before {
    content: '\\e93d';
  }
  .icon-license-pack_merch_sign:before {
    content: '\\e93e';
  }
  .icon-license-publication:before {
    content: '\\e93f';
  }
  .icon-license-shared_with_you:before {
    content: '\\e940';
  }
  .icon-license-social:before {
    content: '\\e941';
  }
  .icon-license-trial:before {
    content: '\\e942';
  }
  .icon-license-web:before {
    content: '\\e943';
  }
  .icon-link_mini:before {
    content: '\\e944';
  }
  .icon-link:before {
    content: '\\e945';
  }
  .icon-list_appearance:before {
    content: '\\e946';
  }
  .icon-logout:before {
    content: '\\e947';
  }
  .icon-password:before {
    content: '\\e948';
  }
  .icon-preview_size-text:before {
    content: '\\e949';
  }
  .icon-preview_size-title:before {
    content: '\\e94a';
  }
  .icon-profile:before {
    content: '\\e94b';
  }
  .icon-purchase:before {
    content: '\\e94c';
  }
  .icon-remove:before {
    content: '\\e94d';
  }
  .icon-reset:before {
    content: '\\e94e';
  }
  .icon-search:before {
    content: '\\e94f';
  }
  .icon-settings:before {
    content: '\\e950';
  }
  .icon-theme:before {
    content: '\\e951';
  }
  .icon-tick:before {
    content: '\\e952';
  }
  .icon-tik_tok:before {
    content: '\\e953';
  }
  .icon-tools:before {
    content: '\\e954';
  }
  .icon-visibility-off:before {
    content: '\\e955';
  }
  .icon-visibility-on:before {
    content: '\\e956';
  }
  .icon-warning:before {
    content: '\\e957';
  }
  .icon-weight_100:before {
    content: '\\e958';
  }
  .icon-weight_200:before {
    content: '\\e959';
  }
  .icon-weight_300:before {
    content: '\\e95a';
  }
  .icon-weight_400:before {
    content: '\\e95b';
  }
  .icon-weight_500:before {
    content: '\\e95c';
  }
  .icon-weight_600:before {
    content: '\\e95d';
  }
  .icon-weight_700:before {
    content: '\\e95e';
  }
  .icon-weight_800:before {
    content: '\\e95f';
  }
  .icon-weight_900:before {
    content: '\\e960';
  }
  .icon-width_0:before {
    content: '\\e961';
  }
  .icon-width_50:before {
    content: '\\e962';
  }
  .icon-width_100:before {
    content: '\\e963';
  }
  .icon-width_150:before {
    content: '\\e964';
  }
  .icon-width_200:before {
    content: '\\e965';
  }
  .icon-x:before {
    content: '\\e966';
  }
`,nc=()=>(0,e.jsx)(Y.Global,{styles:[Ju,ec,tc]});var rc=[],oc=rc.forEach,ic=rc.slice;function ac(e){return oc.call(ic.call(arguments,1),(function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])})),e}var sc=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,lc=function(e,t,n){var r=n||{};r.path=r.path||"/";var o=e+"="+encodeURIComponent(t);if(r.maxAge>0){var i=r.maxAge-0;if(isNaN(i))throw new Error("maxAge should be a Number");o+="; Max-Age="+Math.floor(i)}if(r.domain){if(!sc.test(r.domain))throw new TypeError("option domain is invalid");o+="; Domain="+r.domain}if(r.path){if(!sc.test(r.path))throw new TypeError("option path is invalid");o+="; Path="+r.path}if(r.expires){if("function"!=typeof r.expires.toUTCString)throw new TypeError("option expires is invalid");o+="; Expires="+r.expires.toUTCString()}if(r.httpOnly&&(o+="; HttpOnly"),r.secure&&(o+="; Secure"),r.sameSite)switch("string"==typeof r.sameSite?r.sameSite.toLowerCase():r.sameSite){case!0:o+="; SameSite=Strict";break;case"lax":o+="; SameSite=Lax";break;case"strict":o+="; SameSite=Strict";break;case"none":o+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return o},uc=function(e,t,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{path:"/",sameSite:"strict"};n&&(o.expires=new Date,o.expires.setTime(o.expires.getTime()+60*n*1e3)),r&&(o.domain=r),document.cookie=lc(e,encodeURIComponent(t),o)},cc=function(e){for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){for(var o=n[r];" "===o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return null},fc={name:"cookie",lookup:function(e){var t;if(e.lookupCookie&&"undefined"!=typeof document){var n=cc(e.lookupCookie);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupCookie&&"undefined"!=typeof document&&uc(t.lookupCookie,e,t.cookieMinutes,t.cookieDomain,t.cookieOptions)}},dc={name:"querystring",lookup:function(e){var t;if("undefined"!=typeof window){var n=window.location.search;!window.location.search&&window.location.hash&&window.location.hash.indexOf("?")>-1&&(n=window.location.hash.substring(window.location.hash.indexOf("?")));for(var r=n.substring(1).split("&"),o=0;o<r.length;o++){var i=r[o].indexOf("=");if(i>0)r[o].substring(0,i)===e.lookupQuerystring&&(t=r[o].substring(i+1))}}return t}},pc=null,hc=function(){if(null!==pc)return pc;try{pc="undefined"!==window&&null!==window.localStorage;var e="i18next.translate.boo";window.localStorage.setItem(e,"foo"),window.localStorage.removeItem(e)}catch(e){pc=!1}return pc},gc={name:"localStorage",lookup:function(e){var t;if(e.lookupLocalStorage&&hc()){var n=window.localStorage.getItem(e.lookupLocalStorage);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupLocalStorage&&hc()&&window.localStorage.setItem(t.lookupLocalStorage,e)}},mc=null,vc=function(){if(null!==mc)return mc;try{mc="undefined"!==window&&null!==window.sessionStorage;var e="i18next.translate.boo";window.sessionStorage.setItem(e,"foo"),window.sessionStorage.removeItem(e)}catch(e){mc=!1}return mc},yc={name:"sessionStorage",lookup:function(e){var t;if(e.lookupSessionStorage&&vc()){var n=window.sessionStorage.getItem(e.lookupSessionStorage);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupSessionStorage&&vc()&&window.sessionStorage.setItem(t.lookupSessionStorage,e)}},bc={name:"navigator",lookup:function(e){var t=[];if("undefined"!=typeof navigator){if(navigator.languages)for(var n=0;n<navigator.languages.length;n++)t.push(navigator.languages[n]);navigator.userLanguage&&t.push(navigator.userLanguage),navigator.language&&t.push(navigator.language)}return t.length>0?t:void 0}},wc={name:"htmlTag",lookup:function(e){var t,n=e.htmlTag||("undefined"!=typeof document?document.documentElement:null);return n&&"function"==typeof n.getAttribute&&(t=n.getAttribute("lang")),t}},xc={name:"path",lookup:function(e){var t;if("undefined"!=typeof window){var n=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(n instanceof Array)if("number"==typeof e.lookupFromPathIndex){if("string"!=typeof n[e.lookupFromPathIndex])return;t=n[e.lookupFromPathIndex].replace("/","")}else t=n[0].replace("/","")}return t}},kc={name:"subdomain",lookup:function(e){var t;if("undefined"!=typeof window){var n=window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);n instanceof Array&&(t="number"==typeof e.lookupFromSubdomainIndex?n[e.lookupFromSubdomainIndex].replace("http://","").replace("https://","").replace(".",""):n[0].replace("http://","").replace("https://","").replace(".",""))}return t}};var _c=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};$i(this,e),this.type="languageDetector",this.detectors={},this.init(t,n)}return Ai(e,[{key:"init",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.services=e,this.options=ac(t,this.options||{},{order:["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag"],lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",lookupSessionStorage:"i18nextLng",caches:["localStorage"],excludeCacheFor:["cimode"]}),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=n,this.addDetector(fc),this.addDetector(dc),this.addDetector(gc),this.addDetector(yc),this.addDetector(bc),this.addDetector(wc),this.addDetector(xc),this.addDetector(kc)}},{key:"addDetector",value:function(e){this.detectors[e.name]=e}},{key:"detect",value:function(e){var t=this;e||(e=this.options.order);var n=[];return e.forEach((function(e){if(t.detectors[e]){var r=t.detectors[e].lookup(t.options);r&&"string"==typeof r&&(r=[r]),r&&(n=n.concat(r))}})),this.services.languageUtils.getBestMatchFromCodes?n:n.length>0?n[0]:null}},{key:"cacheUserLanguage",value:function(e,t){var n=this;t||(t=this.options.caches),t&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(e)>-1||t.forEach((function(t){n.detectors[t]&&n.detectors[t].cacheUserLanguage(e,n.options)})))}}]),e}();_c.type="languageDetector";const Sc=JSON.parse('{"base":{"loading":"Analyzing fonts...","details":"Details","variable":"Variable","system-font":"This is a system font","skip":"Skip"},"iframe":{"banner":{"discover":"Discover more fonts on","fonts-ninja":"fonts.ninja"}},"settings":{"title":"Settings","theme":{"match-system":"Match system","light":"Light","dark":"Dark"},"watch-tutorial":"Watch tutorial","logout-button":"Log out"},"tutorial":{"slideshow":{"title":"How to use Fonts Ninja","steps":{"step-1":"Hover text to inspect fonts","step-2":"Click to see font details","step-3":"Add fonts to your bookmark","step-4":"Pin Fonts Ninja for quick access"},"next":"Next"},"end":{"title":"That’s it,<br />Enjoy Fonts Ninja!","done":"Done","any-questions":"Any questions?","contact-us":"Contact us"}}}');fu.use(Yi).use(_c).init({resources:{en:{translation:Sc}},fallbackLng:"en",debug:!1,interpolation:{escapeValue:!1}});const Oc=()=>{const[t,r]=(0,n.useState)(null),o=(0,n.useCallback)((({data:e})=>{if("send_extension_path"===e.type){const t=e.results;r(t)}}),[]);return(0,n.useEffect)((()=>(window.postMessage({type:"get_extension_path"}),window.addEventListener("message",o),()=>{window.removeEventListener("message",o)})),[o]),(0,e.jsx)(e.Fragment,{children:t&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(Te,{extensionPath:t}),(0,e.jsxs)(Ye,Object.assign({extensionPath:t},{children:[(0,e.jsx)(nc,{}),(0,e.jsx)(P,Object.assign({extensionPath:t},{children:(0,e.jsx)(A,{children:(0,e.jsx)(U,{children:(0,e.jsx)(Zu,{})})})}))]}))]})})},Ec=document.getElementById("fonts-ninja-ext");(0,t.render)((0,e.jsx)(Oc,{}),Ec)})()})();
//# sourceMappingURL=extension.bundle.js.map