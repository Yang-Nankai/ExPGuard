import{g as en}from"./finalytic-DGpBzKZP.js";function Vn(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const a in r)if(a!=="default"&&!(a in t)){const o=Object.getOwnPropertyDescriptor(r,a);o&&Object.defineProperty(t,a,o.get?o:{enumerable:!0,get:()=>r[a]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var Tt={exports:{}},h={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xe;function qn(){if(xe)return h;xe=1;var t=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),o=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),y=Symbol.iterator;function g(i){return i===null||typeof i!="object"?null:(i=y&&i[y]||i["@@iterator"],typeof i=="function"?i:null)}var O={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,M={};function x(i,c,v){this.props=i,this.context=c,this.refs=M,this.updater=v||O}x.prototype.isReactComponent={},x.prototype.setState=function(i,c){if(typeof i!="object"&&typeof i!="function"&&i!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,i,c,"setState")},x.prototype.forceUpdate=function(i){this.updater.enqueueForceUpdate(this,i,"forceUpdate")};function E(){}E.prototype=x.prototype;function k(i,c,v){this.props=i,this.context=c,this.refs=M,this.updater=v||O}var I=k.prototype=new E;I.constructor=k,N(I,x.prototype),I.isPureReactComponent=!0;var D=Array.isArray,L=Object.prototype.hasOwnProperty,ot={current:null},Z={key:!0,ref:!0,__self:!0,__source:!0};function mt(i,c,v){var w,A={},_=null,T=null;if(c!=null)for(w in c.ref!==void 0&&(T=c.ref),c.key!==void 0&&(_=""+c.key),c)L.call(c,w)&&!Z.hasOwnProperty(w)&&(A[w]=c[w]);var C=arguments.length-2;if(C===1)A.children=v;else if(1<C){for(var P=Array(C),z=0;z<C;z++)P[z]=arguments[z+2];A.children=P}if(i&&i.defaultProps)for(w in C=i.defaultProps,C)A[w]===void 0&&(A[w]=C[w]);return{$$typeof:t,type:i,key:_,ref:T,props:A,_owner:ot.current}}function Wn(i,c){return{$$typeof:t,type:i.type,key:c,ref:i.ref,props:i.props,_owner:i._owner}}function Ct(i){return typeof i=="object"&&i!==null&&i.$$typeof===t}function Yn(i){var c={"=":"=0",":":"=2"};return"$"+i.replace(/[=:]/g,function(v){return c[v]})}var be=/\/+/g;function It(i,c){return typeof i=="object"&&i!==null&&i.key!=null?Yn(""+i.key):c.toString(36)}function pt(i,c,v,w,A){var _=typeof i;(_==="undefined"||_==="boolean")&&(i=null);var T=!1;if(i===null)T=!0;else switch(_){case"string":case"number":T=!0;break;case"object":switch(i.$$typeof){case t:case e:T=!0}}if(T)return T=i,A=A(T),i=w===""?"."+It(T,0):w,D(A)?(v="",i!=null&&(v=i.replace(be,"$&/")+"/"),pt(A,c,v,"",function(z){return z})):A!=null&&(Ct(A)&&(A=Wn(A,v+(!A.key||T&&T.key===A.key?"":(""+A.key).replace(be,"$&/")+"/")+i)),c.push(A)),1;if(T=0,w=w===""?".":w+":",D(i))for(var C=0;C<i.length;C++){_=i[C];var P=w+It(_,C);T+=pt(_,c,v,P,A)}else if(P=g(i),typeof P=="function")for(i=P.call(i),C=0;!(_=i.next()).done;)_=_.value,P=w+It(_,C++),T+=pt(_,c,v,P,A);else if(_==="object")throw c=String(i),Error("Objects are not valid as a React child (found: "+(c==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":c)+"). If you meant to render a collection of children, use an array instead.");return T}function gt(i,c,v){if(i==null)return i;var w=[],A=0;return pt(i,w,"","",function(_){return c.call(v,_,A++)}),w}function $n(i){if(i._status===-1){var c=i._result;c=c(),c.then(function(v){(i._status===0||i._status===-1)&&(i._status=1,i._result=v)},function(v){(i._status===0||i._status===-1)&&(i._status=2,i._result=v)}),i._status===-1&&(i._status=0,i._result=c)}if(i._status===1)return i._result.default;throw i._result}var R={current:null},ht={transition:null},Hn={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:ht,ReactCurrentOwner:ot};function ve(){throw Error("act(...) is not supported in production builds of React.")}return h.Children={map:gt,forEach:function(i,c,v){gt(i,function(){c.apply(this,arguments)},v)},count:function(i){var c=0;return gt(i,function(){c++}),c},toArray:function(i){return gt(i,function(c){return c})||[]},only:function(i){if(!Ct(i))throw Error("React.Children.only expected to receive a single React element child.");return i}},h.Component=x,h.Fragment=n,h.Profiler=a,h.PureComponent=k,h.StrictMode=r,h.Suspense=d,h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hn,h.act=ve,h.cloneElement=function(i,c,v){if(i==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+i+".");var w=N({},i.props),A=i.key,_=i.ref,T=i._owner;if(c!=null){if(c.ref!==void 0&&(_=c.ref,T=ot.current),c.key!==void 0&&(A=""+c.key),i.type&&i.type.defaultProps)var C=i.type.defaultProps;for(P in c)L.call(c,P)&&!Z.hasOwnProperty(P)&&(w[P]=c[P]===void 0&&C!==void 0?C[P]:c[P])}var P=arguments.length-2;if(P===1)w.children=v;else if(1<P){C=Array(P);for(var z=0;z<P;z++)C[z]=arguments[z+2];w.children=C}return{$$typeof:t,type:i.type,key:A,ref:_,props:w,_owner:T}},h.createContext=function(i){return i={$$typeof:s,_currentValue:i,_currentValue2:i,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},i.Provider={$$typeof:o,_context:i},i.Consumer=i},h.createElement=mt,h.createFactory=function(i){var c=mt.bind(null,i);return c.type=i,c},h.createRef=function(){return{current:null}},h.forwardRef=function(i){return{$$typeof:l,render:i}},h.isValidElement=Ct,h.lazy=function(i){return{$$typeof:p,_payload:{_status:-1,_result:i},_init:$n}},h.memo=function(i,c){return{$$typeof:u,type:i,compare:c===void 0?null:c}},h.startTransition=function(i){var c=ht.transition;ht.transition={};try{i()}finally{ht.transition=c}},h.unstable_act=ve,h.useCallback=function(i,c){return R.current.useCallback(i,c)},h.useContext=function(i){return R.current.useContext(i)},h.useDebugValue=function(){},h.useDeferredValue=function(i){return R.current.useDeferredValue(i)},h.useEffect=function(i,c){return R.current.useEffect(i,c)},h.useId=function(){return R.current.useId()},h.useImperativeHandle=function(i,c,v){return R.current.useImperativeHandle(i,c,v)},h.useInsertionEffect=function(i,c){return R.current.useInsertionEffect(i,c)},h.useLayoutEffect=function(i,c){return R.current.useLayoutEffect(i,c)},h.useMemo=function(i,c){return R.current.useMemo(i,c)},h.useReducer=function(i,c,v){return R.current.useReducer(i,c,v)},h.useRef=function(i){return R.current.useRef(i)},h.useState=function(i){return R.current.useState(i)},h.useSyncExternalStore=function(i,c,v){return R.current.useSyncExternalStore(i,c,v)},h.useTransition=function(){return R.current.useTransition()},h.version="18.3.1",h}var Ae;function Gn(){return Ae||(Ae=1,Tt.exports=qn()),Tt.exports}var nn=Gn();const ie=en(nn),po=Vn({__proto__:null,default:ie},[nn]);/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function Xn(t,e,n){return(e=Kn(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function we(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?we(Object(n),!0).forEach(function(r){Xn(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):we(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Bn(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Kn(t){var e=Bn(t,"string");return typeof e=="symbol"?e:e+""}const Se=()=>{};let se={},rn={},an=null,on={mark:Se,measure:Se};try{typeof window<"u"&&(se=window),typeof document<"u"&&(rn=document),typeof MutationObserver<"u"&&(an=MutationObserver),typeof performance<"u"&&(on=performance)}catch{}const{userAgent:ke=""}=se.navigator||{},G=se,S=rn,Oe=an,yt=on;G.document;const V=!!S.documentElement&&!!S.head&&typeof S.addEventListener=="function"&&typeof S.createElement=="function",sn=~ke.indexOf("MSIE")||~ke.indexOf("Trident/");var Qn=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Jn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,ln={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},Zn={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},fn=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],F="classic",kt="duotone",tr="sharp",er="sharp-duotone",cn=[F,kt,tr,er],nr={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},rr={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},ar=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),or={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},ir=["fak","fa-kit","fakd","fa-kit-duotone"],Pe={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},sr=["kit"],lr={kit:{"fa-kit":"fak"}},fr=["fak","fakd"],cr={kit:{fak:"fa-kit"}},Ee={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},bt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},ur=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],dr=["fak","fa-kit","fakd","fa-kit-duotone"],mr={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},pr={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},gr={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},Wt={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},hr=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],Yt=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...ur,...hr],yr=["solid","regular","light","thin","duotone","brands"],un=[1,2,3,4,5,6,7,8,9,10],br=un.concat([11,12,13,14,15,16,17,18,19,20]),vr=[...Object.keys(gr),...yr,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",bt.GROUP,bt.SWAP_OPACITY,bt.PRIMARY,bt.SECONDARY].concat(un.map(t=>"".concat(t,"x"))).concat(br.map(t=>"w-".concat(t))),xr={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const $="___FONT_AWESOME___",$t=16,dn="fa",mn="svg-inline--fa",Q="data-fa-i2svg",Ht="data-fa-pseudo-element",Ar="data-fa-pseudo-element-pending",le="data-prefix",fe="data-icon",_e="fontawesome-i2svg",wr="async",Sr=["HTML","HEAD","STYLE","SCRIPT"],pn=(()=>{try{return!0}catch{return!1}})();function ut(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[F]}})}const gn=f({},ln);gn[F]=f(f(f(f({},{"fa-duotone":"duotone"}),ln[F]),Pe.kit),Pe["kit-duotone"]);const kr=ut(gn),Vt=f({},or);Vt[F]=f(f(f(f({},{duotone:"fad"}),Vt[F]),Ee.kit),Ee["kit-duotone"]);const Ce=ut(Vt),qt=f({},Wt);qt[F]=f(f({},qt[F]),cr.kit);const ce=ut(qt),Gt=f({},pr);Gt[F]=f(f({},Gt[F]),lr.kit);ut(Gt);const Or=Qn,hn="fa-layers-text",Pr=Jn,Er=f({},nr);ut(Er);const _r=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Nt=Zn,Cr=[...sr,...vr],st=G.FontAwesomeConfig||{};function Ir(t){var e=S.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function Tr(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}S&&typeof S.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,r]=e;const a=Tr(Ir(n));a!=null&&(st[r]=a)});const yn={styleDefault:"solid",familyDefault:F,cssPrefix:dn,replacementClass:mn,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};st.familyPrefix&&(st.cssPrefix=st.familyPrefix);const rt=f(f({},yn),st);rt.autoReplaceSvg||(rt.observeMutations=!1);const m={};Object.keys(yn).forEach(t=>{Object.defineProperty(m,t,{enumerable:!0,set:function(e){rt[t]=e,lt.forEach(n=>n(m))},get:function(){return rt[t]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){rt.cssPrefix=t,lt.forEach(e=>e(m))},get:function(){return rt.cssPrefix}});G.FontAwesomeConfig=m;const lt=[];function Nr(t){return lt.push(t),()=>{lt.splice(lt.indexOf(t),1)}}const q=$t,W={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Fr(t){if(!t||!V)return;const e=S.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=S.head.childNodes;let r=null;for(let a=n.length-1;a>-1;a--){const o=n[a],s=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=o)}return S.head.insertBefore(e,r),t}const Rr="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ft(){let t=12,e="";for(;t-- >0;)e+=Rr[Math.random()*62|0];return e}function at(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function ue(t){return t.classList?at(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function bn(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Mr(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(bn(t[n]),'" '),"").trim()}function Ot(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function de(t){return t.size!==W.size||t.x!==W.x||t.y!==W.y||t.rotate!==W.rotate||t.flipX||t.flipY}function Lr(t){let{transform:e,containerWidth:n,iconWidth:r}=t;const a={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(e.x*32,", ").concat(e.y*32,") "),s="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),l="rotate(".concat(e.rotate," 0 0)"),d={transform:"".concat(o," ").concat(s," ").concat(l)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:d,path:u}}function jr(t){let{transform:e,width:n=$t,height:r=$t,startCentered:a=!1}=t,o="";return a&&sn?o+="translate(".concat(e.x/q-n/2,"em, ").concat(e.y/q-r/2,"em) "):a?o+="translate(calc(-50% + ".concat(e.x/q,"em), calc(-50% + ").concat(e.y/q,"em)) "):o+="translate(".concat(e.x/q,"em, ").concat(e.y/q,"em) "),o+="scale(".concat(e.size/q*(e.flipX?-1:1),", ").concat(e.size/q*(e.flipY?-1:1),") "),o+="rotate(".concat(e.rotate,"deg) "),o}var Dr=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function vn(){const t=dn,e=mn,n=m.cssPrefix,r=m.replacementClass;let a=Dr;if(n!==t||r!==e){const o=new RegExp("\\.".concat(t,"\\-"),"g"),s=new RegExp("\\--".concat(t,"\\-"),"g"),l=new RegExp("\\.".concat(e),"g");a=a.replace(o,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(l,".".concat(r))}return a}let Ie=!1;function Ft(){m.autoAddCss&&!Ie&&(Fr(vn()),Ie=!0)}var zr={mixout(){return{dom:{css:vn,insertCss:Ft}}},hooks(){return{beforeDOMElementCreation(){Ft()},beforeI2svg(){Ft()}}}};const H=G||{};H[$]||(H[$]={});H[$].styles||(H[$].styles={});H[$].hooks||(H[$].hooks={});H[$].shims||(H[$].shims=[]);var Y=H[$];const xn=[],An=function(){S.removeEventListener("DOMContentLoaded",An),At=1,xn.map(t=>t())};let At=!1;V&&(At=(S.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(S.readyState),At||S.addEventListener("DOMContentLoaded",An));function Ur(t){V&&(At?setTimeout(t,0):xn.push(t))}function dt(t){const{tag:e,attributes:n={},children:r=[]}=t;return typeof t=="string"?bn(t):"<".concat(e," ").concat(Mr(n),">").concat(r.map(dt).join(""),"</").concat(e,">")}function Te(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var Rt=function(e,n,r,a){var o=Object.keys(e),s=o.length,l=n,d,u,p;for(r===void 0?(d=1,p=e[o[0]]):(d=0,p=r);d<s;d++)u=o[d],p=l(p,e[u],u,e);return p};function Wr(t){const e=[];let n=0;const r=t.length;for(;n<r;){const a=t.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){const o=t.charCodeAt(n++);(o&64512)==56320?e.push(((a&1023)<<10)+(o&1023)+65536):(e.push(a),n--)}else e.push(a)}return e}function Xt(t){const e=Wr(t);return e.length===1?e[0].toString(16):null}function Yr(t,e){const n=t.length;let r=t.charCodeAt(e),a;return r>=55296&&r<=56319&&n>e+1&&(a=t.charCodeAt(e+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Ne(t){return Object.keys(t).reduce((e,n)=>{const r=t[n];return!!r.icon?e[r.iconName]=r.icon:e[n]=r,e},{})}function Bt(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:r=!1}=n,a=Ne(e);typeof Y.hooks.addPack=="function"&&!r?Y.hooks.addPack(t,Ne(e)):Y.styles[t]=f(f({},Y.styles[t]||{}),a),t==="fas"&&Bt("fa",e)}const{styles:ct,shims:$r}=Y,wn=Object.keys(ce),Hr=wn.reduce((t,e)=>(t[e]=Object.keys(ce[e]),t),{});let me=null,Sn={},kn={},On={},Pn={},En={};function Vr(t){return~Cr.indexOf(t)}function qr(t,e){const n=e.split("-"),r=n[0],a=n.slice(1).join("-");return r===t&&a!==""&&!Vr(a)?a:null}const _n=()=>{const t=r=>Rt(ct,(a,o,s)=>(a[s]=Rt(o,r,{}),a),{});Sn=t((r,a,o)=>(a[3]&&(r[a[3]]=o),a[2]&&a[2].filter(l=>typeof l=="number").forEach(l=>{r[l.toString(16)]=o}),r)),kn=t((r,a,o)=>(r[o]=o,a[2]&&a[2].filter(l=>typeof l=="string").forEach(l=>{r[l]=o}),r)),En=t((r,a,o)=>{const s=a[2];return r[o]=o,s.forEach(l=>{r[l]=o}),r});const e="far"in ct||m.autoFetchSvg,n=Rt($r,(r,a)=>{const o=a[0];let s=a[1];const l=a[2];return s==="far"&&!e&&(s="fas"),typeof o=="string"&&(r.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(r.unicodes[o.toString(16)]={prefix:s,iconName:l}),r},{names:{},unicodes:{}});On=n.names,Pn=n.unicodes,me=Pt(m.styleDefault,{family:m.familyDefault})};Nr(t=>{me=Pt(t.styleDefault,{family:m.familyDefault})});_n();function pe(t,e){return(Sn[t]||{})[e]}function Gr(t,e){return(kn[t]||{})[e]}function K(t,e){return(En[t]||{})[e]}function Cn(t){return On[t]||{prefix:null,iconName:null}}function Xr(t){const e=Pn[t],n=pe("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function X(){return me}const In=()=>({prefix:null,iconName:null,rest:[]});function Br(t){let e=F;const n=wn.reduce((r,a)=>(r[a]="".concat(m.cssPrefix,"-").concat(a),r),{});return cn.forEach(r=>{(t.includes(n[r])||t.some(a=>Hr[r].includes(a)))&&(e=r)}),e}function Pt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=F}=e,r=kr[n][t];if(n===kt&&!t)return"fad";const a=Ce[n][t]||Ce[n][r],o=t in Y.styles?t:null;return a||o||null}function Kr(t){let e=[],n=null;return t.forEach(r=>{const a=qr(m.cssPrefix,r);a?n=a:r&&e.push(r)}),{iconName:n,rest:e}}function Fe(t){return t.sort().filter((e,n,r)=>r.indexOf(e)===n)}function Et(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e;let r=null;const a=Yt.concat(dr),o=Fe(t.filter(y=>a.includes(y))),s=Fe(t.filter(y=>!Yt.includes(y))),l=o.filter(y=>(r=y,!fn.includes(y))),[d=null]=l,u=Br(o),p=f(f({},Kr(s)),{},{prefix:Pt(d,{family:u})});return f(f(f({},p),ta({values:t,family:u,styles:ct,config:m,canonical:p,givenPrefix:r})),Qr(n,r,p))}function Qr(t,e,n){let{prefix:r,iconName:a}=n;if(t||!r||!a)return{prefix:r,iconName:a};const o=e==="fa"?Cn(a):{},s=K(r,a);return a=o.iconName||s||a,r=o.prefix||r,r==="far"&&!ct.far&&ct.fas&&!m.autoFetchSvg&&(r="fas"),{prefix:r,iconName:a}}const Jr=cn.filter(t=>t!==F||t!==kt),Zr=Object.keys(Wt).filter(t=>t!==F).map(t=>Object.keys(Wt[t])).flat();function ta(t){const{values:e,family:n,canonical:r,givenPrefix:a="",styles:o={},config:s={}}=t,l=n===kt,d=e.includes("fa-duotone")||e.includes("fad"),u=s.familyDefault==="duotone",p=r.prefix==="fad"||r.prefix==="fa-duotone";if(!l&&(d||u||p)&&(r.prefix="fad"),(e.includes("fa-brands")||e.includes("fab"))&&(r.prefix="fab"),!r.prefix&&Jr.includes(n)&&(Object.keys(o).find(g=>Zr.includes(g))||s.autoFetchSvg)){const g=ar.get(n).defaultShortPrefixId;r.prefix=g,r.iconName=K(r.prefix,r.iconName)||r.iconName}return(r.prefix==="fa"||a==="fa")&&(r.prefix=X()||"fas"),r}class ea{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];const a=n.reduce(this._pullDefinitions,{});Object.keys(a).forEach(o=>{this.definitions[o]=f(f({},this.definitions[o]||{}),a[o]),Bt(o,a[o]);const s=ce[F][o];s&&Bt(s,a[o]),_n()})}reset(){this.definitions={}}_pullDefinitions(e,n){const r=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(r).map(a=>{const{prefix:o,iconName:s,icon:l}=r[a],d=l[2];e[o]||(e[o]={}),d.length>0&&d.forEach(u=>{typeof u=="string"&&(e[o][u]=l)}),e[o][s]=l}),e}}let Re=[],tt={};const nt={},na=Object.keys(nt);function ra(t,e){let{mixoutsTo:n}=e;return Re=t,tt={},Object.keys(nt).forEach(r=>{na.indexOf(r)===-1&&delete nt[r]}),Re.forEach(r=>{const a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(o=>{typeof a[o]=="function"&&(n[o]=a[o]),typeof a[o]=="object"&&Object.keys(a[o]).forEach(s=>{n[o]||(n[o]={}),n[o][s]=a[o][s]})}),r.hooks){const o=r.hooks();Object.keys(o).forEach(s=>{tt[s]||(tt[s]=[]),tt[s].push(o[s])})}r.provides&&r.provides(nt)}),n}function Kt(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];return(tt[t]||[]).forEach(s=>{e=s.apply(null,[e,...r])}),e}function J(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];(tt[t]||[]).forEach(o=>{o.apply(null,n)})}function B(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return nt[t]?nt[t].apply(null,e):void 0}function Qt(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||X();if(e)return e=K(n,e)||e,Te(Tn.definitions,n,e)||Te(Y.styles,n,e)}const Tn=new ea,aa=()=>{m.autoReplaceSvg=!1,m.observeMutations=!1,J("noAuto")},oa={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return V?(J("beforeI2svg",t),B("pseudoElements2svg",t),B("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Ur(()=>{sa({autoReplaceSvgRoot:e}),J("watch",t)})}},ia={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:K(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=Pt(t[0]);return{prefix:n,iconName:K(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match(Or))){const e=Et(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||X(),iconName:K(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=X();return{prefix:e,iconName:K(e,t)||t}}}},j={noAuto:aa,config:m,dom:oa,parse:ia,library:Tn,findIconDefinition:Qt,toHtml:dt},sa=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=S}=t;(Object.keys(Y.styles).length>0||m.autoFetchSvg)&&V&&m.autoReplaceSvg&&j.dom.i2svg({node:e})};function _t(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>dt(n))}}),Object.defineProperty(t,"node",{get:function(){if(!V)return;const n=S.createElement("div");return n.innerHTML=t.html,n.children}}),t}function la(t){let{children:e,main:n,mask:r,attributes:a,styles:o,transform:s}=t;if(de(s)&&n.found&&!r.found){const{width:l,height:d}=n,u={x:l/d/2,y:.5};a.style=Ot(f(f({},o),{},{"transform-origin":"".concat(u.x+s.x/16,"em ").concat(u.y+s.y/16,"em")}))}return[{tag:"svg",attributes:a,children:e}]}function fa(t){let{prefix:e,iconName:n,children:r,attributes:a,symbol:o}=t;const s=o===!0?"".concat(e,"-").concat(m.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},a),{},{id:s}),children:r}]}]}function ge(t){const{icons:{main:e,mask:n},prefix:r,iconName:a,transform:o,symbol:s,title:l,maskId:d,titleId:u,extra:p,watchable:y=!1}=t,{width:g,height:O}=n.found?n:e,N=fr.includes(r),M=[m.replacementClass,a?"".concat(m.cssPrefix,"-").concat(a):""].filter(L=>p.classes.indexOf(L)===-1).filter(L=>L!==""||!!L).concat(p.classes).join(" ");let x={children:[],attributes:f(f({},p.attributes),{},{"data-prefix":r,"data-icon":a,class:M,role:p.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(g," ").concat(O)})};const E=N&&!~p.classes.indexOf("fa-fw")?{width:"".concat(g/O*16*.0625,"em")}:{};y&&(x.attributes[Q]=""),l&&(x.children.push({tag:"title",attributes:{id:x.attributes["aria-labelledby"]||"title-".concat(u||ft())},children:[l]}),delete x.attributes.title);const k=f(f({},x),{},{prefix:r,iconName:a,main:e,mask:n,maskId:d,transform:o,symbol:s,styles:f(f({},E),p.styles)}),{children:I,attributes:D}=n.found&&e.found?B("generateAbstractMask",k)||{children:[],attributes:{}}:B("generateAbstractIcon",k)||{children:[],attributes:{}};return k.children=I,k.attributes=D,s?fa(k):la(k)}function Me(t){const{content:e,width:n,height:r,transform:a,title:o,extra:s,watchable:l=!1}=t,d=f(f(f({},s.attributes),o?{title:o}:{}),{},{class:s.classes.join(" ")});l&&(d[Q]="");const u=f({},s.styles);de(a)&&(u.transform=jr({transform:a,startCentered:!0,width:n,height:r}),u["-webkit-transform"]=u.transform);const p=Ot(u);p.length>0&&(d.style=p);const y=[];return y.push({tag:"span",attributes:d,children:[e]}),o&&y.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),y}function ca(t){const{content:e,title:n,extra:r}=t,a=f(f(f({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),o=Ot(r.styles);o.length>0&&(a.style=o);const s=[];return s.push({tag:"span",attributes:a,children:[e]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}const{styles:Mt}=Y;function Jt(t){const e=t[0],n=t[1],[r]=t.slice(4);let a=null;return Array.isArray(r)?a={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(Nt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Nt.SECONDARY),fill:"currentColor",d:r[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Nt.PRIMARY),fill:"currentColor",d:r[1]}}]}:a={tag:"path",attributes:{fill:"currentColor",d:r}},{found:!0,width:e,height:n,icon:a}}const ua={found:!1,width:512,height:512};function da(t,e){!pn&&!m.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Zt(t,e){let n=e;return e==="fa"&&m.styleDefault!==null&&(e=X()),new Promise((r,a)=>{if(n==="fa"){const o=Cn(t)||{};t=o.iconName||t,e=o.prefix||e}if(t&&e&&Mt[e]&&Mt[e][t]){const o=Mt[e][t];return r(Jt(o))}da(t,e),r(f(f({},ua),{},{icon:m.showMissingIcons&&t?B("missingIconAbstract")||{}:{}}))})}const Le=()=>{},te=m.measurePerformance&&yt&&yt.mark&&yt.measure?yt:{mark:Le,measure:Le},it='FA "6.7.2"',ma=t=>(te.mark("".concat(it," ").concat(t," begins")),()=>Nn(t)),Nn=t=>{te.mark("".concat(it," ").concat(t," ends")),te.measure("".concat(it," ").concat(t),"".concat(it," ").concat(t," begins"),"".concat(it," ").concat(t," ends"))};var he={begin:ma,end:Nn};const vt=()=>{};function je(t){return typeof(t.getAttribute?t.getAttribute(Q):null)=="string"}function pa(t){const e=t.getAttribute?t.getAttribute(le):null,n=t.getAttribute?t.getAttribute(fe):null;return e&&n}function ga(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(m.replacementClass)}function ha(){return m.autoReplaceSvg===!0?xt.replace:xt[m.autoReplaceSvg]||xt.replace}function ya(t){return S.createElementNS("http://www.w3.org/2000/svg",t)}function ba(t){return S.createElement(t)}function Fn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?ya:ba}=e;if(typeof t=="string")return S.createTextNode(t);const r=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(o){r.setAttribute(o,t.attributes[o])}),(t.children||[]).forEach(function(o){r.appendChild(Fn(o,{ceFn:n}))}),r}function va(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const xt={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(Fn(n),e)}),e.getAttribute(Q)===null&&m.keepOriginalSource){let n=S.createComment(va(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~ue(e).indexOf(m.replacementClass))return xt.replace(t);const r=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const o=n[0].attributes.class.split(" ").reduce((s,l)=>(l===m.replacementClass||l.match(r)?s.toSvg.push(l):s.toNode.push(l),s),{toNode:[],toSvg:[]});n[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",o.toNode.join(" "))}const a=n.map(o=>dt(o)).join(`
`);e.setAttribute(Q,""),e.innerHTML=a}};function De(t){t()}function Rn(t,e){const n=typeof e=="function"?e:vt;if(t.length===0)n();else{let r=De;m.mutateApproach===wr&&(r=G.requestAnimationFrame||De),r(()=>{const a=ha(),o=he.begin("mutate");t.map(a),o(),n()})}}let ye=!1;function Mn(){ye=!0}function ee(){ye=!1}let wt=null;function ze(t){if(!Oe||!m.observeMutations)return;const{treeCallback:e=vt,nodeCallback:n=vt,pseudoElementsCallback:r=vt,observeMutationsRoot:a=S}=t;wt=new Oe(o=>{if(ye)return;const s=X();at(o).forEach(l=>{if(l.type==="childList"&&l.addedNodes.length>0&&!je(l.addedNodes[0])&&(m.searchPseudoElements&&r(l.target),e(l.target)),l.type==="attributes"&&l.target.parentNode&&m.searchPseudoElements&&r(l.target.parentNode),l.type==="attributes"&&je(l.target)&&~_r.indexOf(l.attributeName))if(l.attributeName==="class"&&pa(l.target)){const{prefix:d,iconName:u}=Et(ue(l.target));l.target.setAttribute(le,d||s),u&&l.target.setAttribute(fe,u)}else ga(l.target)&&n(l.target)})}),V&&wt.observe(a,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function xa(){wt&&wt.disconnect()}function Aa(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((r,a)=>{const o=a.split(":"),s=o[0],l=o.slice(1);return s&&l.length>0&&(r[s]=l.join(":").trim()),r},{})),n}function wa(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),r=t.innerText!==void 0?t.innerText.trim():"";let a=Et(ue(t));return a.prefix||(a.prefix=X()),e&&n&&(a.prefix=e,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=Gr(a.prefix,t.innerText)||pe(a.prefix,Xt(t.innerText))),!a.iconName&&m.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=t.firstChild.data)),a}function Sa(t){const e=at(t.attributes).reduce((a,o)=>(a.name!=="class"&&a.name!=="style"&&(a[o.name]=o.value),a),{}),n=t.getAttribute("title"),r=t.getAttribute("data-fa-title-id");return m.autoA11y&&(n?e["aria-labelledby"]="".concat(m.replacementClass,"-title-").concat(r||ft()):(e["aria-hidden"]="true",e.focusable="false")),e}function ka(){return{iconName:null,title:null,titleId:null,prefix:null,transform:W,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ue(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:r,rest:a}=wa(t),o=Sa(t),s=Kt("parseNodeAttributes",{},t);let l=e.styleParser?Aa(t):[];return f({iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:r,transform:W,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:a,styles:l,attributes:o}},s)}const{styles:Oa}=Y;function Ln(t){const e=m.autoReplaceSvg==="nest"?Ue(t,{styleParser:!1}):Ue(t);return~e.extra.classes.indexOf(hn)?B("generateLayersText",t,e):B("generateSvgReplacementMutation",t,e)}function Pa(){return[...ir,...Yt]}function We(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!V)return Promise.resolve();const n=S.documentElement.classList,r=p=>n.add("".concat(_e,"-").concat(p)),a=p=>n.remove("".concat(_e,"-").concat(p)),o=m.autoFetchSvg?Pa():fn.concat(Object.keys(Oa));o.includes("fa")||o.push("fa");const s=[".".concat(hn,":not([").concat(Q,"])")].concat(o.map(p=>".".concat(p,":not([").concat(Q,"])"))).join(", ");if(s.length===0)return Promise.resolve();let l=[];try{l=at(t.querySelectorAll(s))}catch{}if(l.length>0)r("pending"),a("complete");else return Promise.resolve();const d=he.begin("onTree"),u=l.reduce((p,y)=>{try{const g=Ln(y);g&&p.push(g)}catch(g){pn||g.name==="MissingIcon"&&console.error(g)}return p},[]);return new Promise((p,y)=>{Promise.all(u).then(g=>{Rn(g,()=>{r("active"),r("complete"),a("pending"),typeof e=="function"&&e(),d(),p()})}).catch(g=>{d(),y(g)})})}function Ea(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Ln(t).then(n=>{n&&Rn([n],e)})}function _a(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=(e||{}).icon?e:Qt(e||{});let{mask:a}=n;return a&&(a=(a||{}).icon?a:Qt(a||{})),t(r,f(f({},n),{},{mask:a}))}}const Ca=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=W,symbol:r=!1,mask:a=null,maskId:o=null,title:s=null,titleId:l=null,classes:d=[],attributes:u={},styles:p={}}=e;if(!t)return;const{prefix:y,iconName:g,icon:O}=t;return _t(f({type:"icon"},t),()=>(J("beforeDOMElementCreation",{iconDefinition:t,params:e}),m.autoA11y&&(s?u["aria-labelledby"]="".concat(m.replacementClass,"-title-").concat(l||ft()):(u["aria-hidden"]="true",u.focusable="false")),ge({icons:{main:Jt(O),mask:a?Jt(a.icon):{found:!1,width:null,height:null,icon:{}}},prefix:y,iconName:g,transform:f(f({},W),n),symbol:r,title:s,maskId:o,titleId:l,extra:{attributes:u,styles:p,classes:d}})))};var Ia={mixout(){return{icon:_a(Ca)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=We,t.nodeCallback=Ea,t}}},provides(t){t.i2svg=function(e){const{node:n=S,callback:r=()=>{}}=e;return We(n,r)},t.generateSvgReplacementMutation=function(e,n){const{iconName:r,title:a,titleId:o,prefix:s,transform:l,symbol:d,mask:u,maskId:p,extra:y}=n;return new Promise((g,O)=>{Promise.all([Zt(r,s),u.iconName?Zt(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(N=>{let[M,x]=N;g([e,ge({icons:{main:M,mask:x},prefix:s,iconName:r,transform:l,symbol:d,maskId:p,title:a,titleId:o,extra:y,watchable:!0})])}).catch(O)})},t.generateAbstractIcon=function(e){let{children:n,attributes:r,main:a,transform:o,styles:s}=e;const l=Ot(s);l.length>0&&(r.style=l);let d;return de(o)&&(d=B("generateAbstractTransformGrouping",{main:a,transform:o,containerWidth:a.width,iconWidth:a.width})),n.push(d||a.icon),{children:n,attributes:r}}}},Ta={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return _t({type:"layer"},()=>{J("beforeDOMElementCreation",{assembler:t,params:e});let r=[];return t(a=>{Array.isArray(a)?a.map(o=>{r=r.concat(o.abstract)}):r=r.concat(a.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers"),...n].join(" ")},children:r}]})}}}},Na={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:r=[],attributes:a={},styles:o={}}=e;return _t({type:"counter",content:t},()=>(J("beforeDOMElementCreation",{content:t,params:e}),ca({content:t.toString(),title:n,extra:{attributes:a,styles:o,classes:["".concat(m.cssPrefix,"-layers-counter"),...r]}})))}}}},Fa={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=W,title:r=null,classes:a=[],attributes:o={},styles:s={}}=e;return _t({type:"text",content:t},()=>(J("beforeDOMElementCreation",{content:t,params:e}),Me({content:t,transform:f(f({},W),n),title:r,extra:{attributes:o,styles:s,classes:["".concat(m.cssPrefix,"-layers-text"),...a]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:r,transform:a,extra:o}=n;let s=null,l=null;if(sn){const d=parseInt(getComputedStyle(e).fontSize,10),u=e.getBoundingClientRect();s=u.width/d,l=u.height/d}return m.autoA11y&&!r&&(o.attributes["aria-hidden"]="true"),Promise.resolve([e,Me({content:e.innerHTML,width:s,height:l,transform:a,title:r,extra:o,watchable:!0})])}}};const Ra=new RegExp('"',"ug"),Ye=[1105920,1112319],$e=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),rr),xr),mr),ne=Object.keys($e).reduce((t,e)=>(t[e.toLowerCase()]=$e[e],t),{}),Ma=Object.keys(ne).reduce((t,e)=>{const n=ne[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function La(t){const e=t.replace(Ra,""),n=Yr(e,0),r=n>=Ye[0]&&n<=Ye[1],a=e.length===2?e[0]===e[1]:!1;return{value:Xt(a?e[0]:e),isSecondary:r||a}}function ja(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(e),a=isNaN(r)?"normal":r;return(ne[n]||{})[a]||Ma[n]}function He(t,e){const n="".concat(Ar).concat(e.replace(":","-"));return new Promise((r,a)=>{if(t.getAttribute(n)!==null)return r();const s=at(t.children).filter(g=>g.getAttribute(Ht)===e)[0],l=G.getComputedStyle(t,e),d=l.getPropertyValue("font-family"),u=d.match(Pr),p=l.getPropertyValue("font-weight"),y=l.getPropertyValue("content");if(s&&!u)return t.removeChild(s),r();if(u&&y!=="none"&&y!==""){const g=l.getPropertyValue("content");let O=ja(d,p);const{value:N,isSecondary:M}=La(g),x=u[0].startsWith("FontAwesome");let E=pe(O,N),k=E;if(x){const I=Xr(N);I.iconName&&I.prefix&&(E=I.iconName,O=I.prefix)}if(E&&!M&&(!s||s.getAttribute(le)!==O||s.getAttribute(fe)!==k)){t.setAttribute(n,k),s&&t.removeChild(s);const I=ka(),{extra:D}=I;D.attributes[Ht]=e,Zt(E,O).then(L=>{const ot=ge(f(f({},I),{},{icons:{main:L,mask:In()},prefix:O,iconName:k,extra:D,watchable:!0})),Z=S.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(Z,t.firstChild):t.appendChild(Z),Z.outerHTML=ot.map(mt=>dt(mt)).join(`
`),t.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function Da(t){return Promise.all([He(t,"::before"),He(t,"::after")])}function za(t){return t.parentNode!==document.head&&!~Sr.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Ht)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Ve(t){if(V)return new Promise((e,n)=>{const r=at(t.querySelectorAll("*")).filter(za).map(Da),a=he.begin("searchPseudoElements");Mn(),Promise.all(r).then(()=>{a(),ee(),e()}).catch(()=>{a(),ee(),n()})})}var Ua={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=Ve,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=S}=e;m.searchPseudoElements&&Ve(n)}}};let qe=!1;var Wa={mixout(){return{dom:{unwatch(){Mn(),qe=!0}}}},hooks(){return{bootstrap(){ze(Kt("mutationObserverCallbacks",{}))},noAuto(){xa()},watch(t){const{observeMutationsRoot:e}=t;qe?ee():ze(Kt("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const Ge=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,r)=>{const a=r.toLowerCase().split("-"),o=a[0];let s=a.slice(1).join("-");if(o&&s==="h")return n.flipX=!0,n;if(o&&s==="v")return n.flipY=!0,n;if(s=parseFloat(s),isNaN(s))return n;switch(o){case"grow":n.size=n.size+s;break;case"shrink":n.size=n.size-s;break;case"left":n.x=n.x-s;break;case"right":n.x=n.x+s;break;case"up":n.y=n.y-s;break;case"down":n.y=n.y+s;break;case"rotate":n.rotate=n.rotate+s;break}return n},e)};var Ya={mixout(){return{parse:{transform:t=>Ge(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=Ge(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:r,containerWidth:a,iconWidth:o}=e;const s={transform:"translate(".concat(a/2," 256)")},l="translate(".concat(r.x*32,", ").concat(r.y*32,") "),d="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),u="rotate(".concat(r.rotate," 0 0)"),p={transform:"".concat(l," ").concat(d," ").concat(u)},y={transform:"translate(".concat(o/2*-1," -256)")},g={outer:s,inner:p,path:y};return{tag:"g",attributes:f({},g.outer),children:[{tag:"g",attributes:f({},g.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:f(f({},n.icon.attributes),g.path)}]}]}}}};const Lt={x:0,y:0,width:"100%",height:"100%"};function Xe(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function $a(t){return t.tag==="g"?t.children:[t]}var Ha={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),r=n?Et(n.split(" ").map(a=>a.trim())):In();return r.prefix||(r.prefix=X()),t.mask=r,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:r,main:a,mask:o,maskId:s,transform:l}=e;const{width:d,icon:u}=a,{width:p,icon:y}=o,g=Lr({transform:l,containerWidth:p,iconWidth:d}),O={tag:"rect",attributes:f(f({},Lt),{},{fill:"white"})},N=u.children?{children:u.children.map(Xe)}:{},M={tag:"g",attributes:f({},g.inner),children:[Xe(f({tag:u.tag,attributes:f(f({},u.attributes),g.path)},N))]},x={tag:"g",attributes:f({},g.outer),children:[M]},E="mask-".concat(s||ft()),k="clip-".concat(s||ft()),I={tag:"mask",attributes:f(f({},Lt),{},{id:E,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[O,x]},D={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:$a(y)},I]};return n.push(D,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(E,")")},Lt)}),{children:n,attributes:r}}}},Va={provides(t){let e=!1;G.matchMedia&&(e=G.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],r={fill:"currentColor"},a={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:f(f({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const o=f(f({},a),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||s.children.push({tag:"animate",attributes:f(f({},a),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},o),{},{values:"1;0;1;1;0;1;"})}),n.push(s),n.push({tag:"path",attributes:f(f({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:f(f({},o),{},{values:"1;0;0;0;0;1;"})}]}),e||n.push({tag:"path",attributes:f(f({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},qa={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),r=n===null?!1:n===""?!0:n;return t.symbol=r,t}}}},Ga=[zr,Ia,Ta,Na,Fa,Ua,Wa,Ya,Ha,Va,qa];ra(Ga,{mixoutsTo:j});j.noAuto;j.config;j.library;j.dom;const re=j.parse;j.findIconDefinition;j.toHtml;const Xa=j.icon;j.layer;j.text;j.counter;var jt={exports:{}},Dt,Be;function Ba(){if(Be)return Dt;Be=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Dt=t,Dt}var zt,Ke;function Ka(){if(Ke)return zt;Ke=1;var t=Ba();function e(){}function n(){}return n.resetWarningCache=e,zt=function(){function r(s,l,d,u,p,y){if(y!==t){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function a(){return r}var o={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:a,element:r,elementType:r,instanceOf:a,node:r,objectOf:a,oneOf:a,oneOfType:a,shape:a,exact:a,checkPropTypes:n,resetWarningCache:e};return o.PropTypes=o,o},zt}var Qe;function Qa(){return Qe||(Qe=1,jt.exports=Ka()()),jt.exports}var Ja=Qa();const b=en(Ja);function Je(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function U(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Je(Object(n),!0).forEach(function(r){et(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Je(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function St(t){"@babel/helpers - typeof";return St=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},St(t)}function et(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Za(t,e){if(t==null)return{};var n={},r=Object.keys(t),a,o;for(o=0;o<r.length;o++)a=r[o],!(e.indexOf(a)>=0)&&(n[a]=t[a]);return n}function to(t,e){if(t==null)return{};var n=Za(t,e),r,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)r=o[a],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}function ae(t){return eo(t)||no(t)||ro(t)||ao()}function eo(t){if(Array.isArray(t))return oe(t)}function no(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ro(t,e){if(t){if(typeof t=="string")return oe(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return oe(t,e)}}function oe(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function ao(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oo(t){var e,n=t.beat,r=t.fade,a=t.beatFade,o=t.bounce,s=t.shake,l=t.flash,d=t.spin,u=t.spinPulse,p=t.spinReverse,y=t.pulse,g=t.fixedWidth,O=t.inverse,N=t.border,M=t.listItem,x=t.flip,E=t.size,k=t.rotation,I=t.pull,D=(e={"fa-beat":n,"fa-fade":r,"fa-beat-fade":a,"fa-bounce":o,"fa-shake":s,"fa-flash":l,"fa-spin":d,"fa-spin-reverse":p,"fa-spin-pulse":u,"fa-pulse":y,"fa-fw":g,"fa-inverse":O,"fa-border":N,"fa-li":M,"fa-flip":x===!0,"fa-flip-horizontal":x==="horizontal"||x==="both","fa-flip-vertical":x==="vertical"||x==="both"},et(e,"fa-".concat(E),typeof E<"u"&&E!==null),et(e,"fa-rotate-".concat(k),typeof k<"u"&&k!==null&&k!==0),et(e,"fa-pull-".concat(I),typeof I<"u"&&I!==null),et(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(D).map(function(L){return D[L]?L:null}).filter(function(L){return L})}function io(t){return t=t-0,t===t}function jn(t){return io(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var so=["style"];function lo(t){return t.charAt(0).toUpperCase()+t.slice(1)}function fo(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var r=n.indexOf(":"),a=jn(n.slice(0,r)),o=n.slice(r+1).trim();return a.startsWith("webkit")?e[lo(a)]=o:e[a]=o,e},{})}function Dn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var r=(e.children||[]).map(function(d){return Dn(t,d)}),a=Object.keys(e.attributes||{}).reduce(function(d,u){var p=e.attributes[u];switch(u){case"class":d.attrs.className=p,delete e.attributes.class;break;case"style":d.attrs.style=fo(p);break;default:u.indexOf("aria-")===0||u.indexOf("data-")===0?d.attrs[u.toLowerCase()]=p:d.attrs[jn(u)]=p}return d},{attrs:{}}),o=n.style,s=o===void 0?{}:o,l=to(n,so);return a.attrs.style=U(U({},a.attrs.style),s),t.apply(void 0,[e.tag,U(U({},a.attrs),l)].concat(ae(r)))}var zn=!1;try{zn=!0}catch{}function co(){if(!zn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function Ze(t){if(t&&St(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(re.icon)return re.icon(t);if(t===null)return null;if(t&&St(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function Ut(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?et({},t,e):{}}var tn={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},Un=ie.forwardRef(function(t,e){var n=U(U({},tn),t),r=n.icon,a=n.mask,o=n.symbol,s=n.className,l=n.title,d=n.titleId,u=n.maskId,p=Ze(r),y=Ut("classes",[].concat(ae(oo(n)),ae((s||"").split(" ")))),g=Ut("transform",typeof n.transform=="string"?re.transform(n.transform):n.transform),O=Ut("mask",Ze(a)),N=Xa(p,U(U(U(U({},y),g),O),{},{symbol:o,title:l,titleId:d,maskId:u}));if(!N)return co("Could not find icon",p),null;var M=N.abstract,x={ref:e};return Object.keys(n).forEach(function(E){tn.hasOwnProperty(E)||(x[E]=n[E])}),uo(M[0],x)});Un.displayName="FontAwesomeIcon";Un.propTypes={beat:b.bool,border:b.bool,beatFade:b.bool,bounce:b.bool,className:b.string,fade:b.bool,flash:b.bool,mask:b.oneOfType([b.object,b.array,b.string]),maskId:b.string,fixedWidth:b.bool,inverse:b.bool,flip:b.oneOf([!0,!1,"horizontal","vertical","both"]),icon:b.oneOfType([b.object,b.array,b.string]),listItem:b.bool,pull:b.oneOf(["right","left"]),pulse:b.bool,rotation:b.oneOf([0,90,180,270]),shake:b.bool,size:b.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:b.bool,spinPulse:b.bool,spinReverse:b.bool,symbol:b.oneOfType([b.bool,b.string]),title:b.string,titleId:b.string,transform:b.oneOfType([b.string,b.object]),swapOpacity:b.bool};var uo=Dn.bind(null,ie.createElement);export{ie as R,nn as a,po as b,Gn as r};
//# sourceMappingURL=fortawesome-AFcAUbbg.js.map
