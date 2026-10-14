import{hw as Va,R as te,r as _a}from"./store-g-2qfnwC.js";import"./cn-DTPxTs8l.js";var nt={},ee;function Xa(){if(ee)return nt;ee=1;var t=Va();return nt.createRoot=t.createRoot,nt.hydrateRoot=t.hydrateRoot,nt}var qa=Xa();function ae(t){var e,a,n="";if(typeof t=="string"||typeof t=="number")n+=t;else if(typeof t=="object")if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(a=ae(t[e]))&&(n&&(n+=" "),n+=a);else for(e in t)t[e]&&(n&&(n+=" "),n+=e);return n}function Ka(){for(var t,e,a=0,n="";a<arguments.length;)(t=arguments[a++])&&(e=ae(t))&&(n&&(n+=" "),n+=e);return n}const ne=t=>typeof t=="boolean"?"".concat(t):t===0?"0":t,yt=Ka,$a=(t,e)=>a=>{var n;if(e?.variants==null)return yt(t,a?.class,a?.className);const{variants:r,defaultVariants:o}=e,i=Object.keys(r).map(f=>{const c=a?.[f],d=o?.[f];if(c===null)return null;const h=ne(c)||ne(d);return r[f][h]}),s=a&&Object.entries(a).reduce((f,c)=>{let[d,h]=c;return h===void 0||(f[d]=h),f},{}),u=e==null||(n=e.compoundVariants)===null||n===void 0?void 0:n.reduce((f,c)=>{let{class:d,className:h,...g}=c;return Object.entries(g).every(y=>{let[v,w]=y;return Array.isArray(w)?w.includes({...o,...s}[v]):{...o,...s}[v]===w})?[...f,d,h]:f},[]);return yt(t,i,u,a?.class,a?.className)};function xt(t,e){(e==null||e>t.length)&&(e=t.length);for(var a=0,n=Array(e);a<e;a++)n[a]=t[a];return n}function Ga(t){if(Array.isArray(t))return t}function Qa(t){if(Array.isArray(t))return xt(t)}function Za(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function tn(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,ie(n.key),n)}}function en(t,e,a){return e&&tn(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function rt(t,e){var a=typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=wt(t))||e){a&&(t=a);var n=0,r=function(){};return{s:r,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(u){throw u},f:r}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,i=!0,s=!1;return{s:function(){a=a.call(t)},n:function(){var u=a.next();return i=u.done,u},e:function(u){s=!0,o=u},f:function(){try{i||a.return==null||a.return()}finally{if(s)throw o}}}}function p(t,e,a){return(e=ie(e))in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function an(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function nn(t,e){var a=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(a!=null){var n,r,o,i,s=[],u=!0,f=!1;try{if(o=(a=a.call(t)).next,e===0){if(Object(a)!==a)return;u=!1}else for(;!(u=(n=o.call(a)).done)&&(s.push(n.value),s.length!==e);u=!0);}catch(c){f=!0,r=c}finally{try{if(!u&&a.return!=null&&(i=a.return(),Object(i)!==i))return}finally{if(f)throw r}}return s}}function rn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function on(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function re(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),a.push.apply(a,n)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?arguments[e]:{};e%2?re(Object(a),!0).forEach(function(n){p(t,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):re(Object(a)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(a,n))})}return t}function it(t,e){return Ga(t)||nn(t,e)||wt(t,e)||rn()}function I(t){return Qa(t)||an(t)||wt(t)||on()}function sn(t,e){if(typeof t!="object"||!t)return t;var a=t[Symbol.toPrimitive];if(a!==void 0){var n=a.call(t,e);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function ie(t){var e=sn(t,"string");return typeof e=="symbol"?e:e+""}function ot(t){"@babel/helpers - typeof";return ot=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ot(t)}function wt(t,e){if(t){if(typeof t=="string")return xt(t,e);var a={}.toString.call(t).slice(8,-1);return a==="Object"&&t.constructor&&(a=t.constructor.name),a==="Map"||a==="Set"?Array.from(t):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?xt(t,e):void 0}}var oe=function(){},kt={},se={},le=null,fe={mark:oe,measure:oe};try{typeof window<"u"&&(kt=window),typeof document<"u"&&(se=document),typeof MutationObserver<"u"&&(le=MutationObserver),typeof performance<"u"&&(fe=performance)}catch{}var ln=kt.navigator||{},ue=ln.userAgent,ce=ue===void 0?"":ue,R=kt,x=se,de=le,st=fe;R.document;var E=!!x.documentElement&&!!x.head&&typeof x.addEventListener=="function"&&typeof x.createElement=="function",me=~ce.indexOf("MSIE")||~ce.indexOf("Trident/"),At,fn=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,un=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Whiteboard)?.*/i,he={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"},utility:{"fa-semibold":"semibold",fausb:"semibold"},"utility-duo":{"fa-semibold":"semibold",faudsb:"semibold"},"utility-fill":{"fa-semibold":"semibold",faufsb:"semibold"}},cn={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},ge=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],S="classic",q="duotone",pe="sharp",be="sharp-duotone",ve="chisel",ye="etch",xe="jelly",we="jelly-duo",ke="jelly-fill",Ae="notdog",Se="notdog-duo",je="slab",Pe="slab-press",Ie="thumbprint",Fe="utility",Oe="utility-duo",Ne="utility-fill",Ee="whiteboard",dn="Classic",mn="Duotone",hn="Sharp",gn="Sharp Duotone",pn="Chisel",bn="Etch",vn="Jelly",yn="Jelly Duo",xn="Jelly Fill",wn="Notdog",kn="Notdog Duo",An="Slab",Sn="Slab Press",jn="Thumbprint",Pn="Utility",In="Utility Duo",Fn="Utility Fill",On="Whiteboard",Ce=[S,q,pe,be,ve,ye,xe,we,ke,Ae,Se,je,Pe,Ie,Fe,Oe,Ne,Ee];At={},p(p(p(p(p(p(p(p(p(p(At,S,dn),q,mn),pe,hn),be,gn),ve,pn),ye,bn),xe,vn),we,yn),ke,xn),Ae,wn),p(p(p(p(p(p(p(p(At,Se,kn),je,An),Pe,Sn),Ie,jn),Fe,Pn),Oe,In),Ne,Fn),Ee,On);var Nn={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"},utility:{600:"fausb"},"utility-duo":{600:"faudsb"},"utility-fill":{600:"faufsb"}},En={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"},"Font Awesome 7 Utility":{600:"fausb",normal:"fausb"},"Font Awesome 7 Utility Duo":{600:"faudsb",normal:"faudsb"},"Font Awesome 7 Utility Fill":{600:"faufsb",normal:"faufsb"}},Cn=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["utility",{defaultShortPrefixId:"fausb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-duo",{defaultShortPrefixId:"faudsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-fill",{defaultShortPrefixId:"faufsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),zn={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},utility:{semibold:"fausb"},"utility-duo":{semibold:"faudsb"},"utility-fill":{semibold:"faufsb"},whiteboard:{semibold:"fawsb"}},ze=["fak","fa-kit","fakd","fa-kit-duotone"],De={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Dn=["kit"],Mn="kit",Rn="kit-duotone",Wn="Kit",Ln="Kit Duotone";p(p({},Mn,Wn),Rn,Ln);var Tn={kit:{"fa-kit":"fak"}},Un={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Yn={kit:{fak:"fa-kit"}},Me={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},St,lt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Hn=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],Jn="classic",Bn="duotone",Vn="sharp",_n="sharp-duotone",Xn="chisel",qn="etch",Kn="jelly",$n="jelly-duo",Gn="jelly-fill",Qn="notdog",Zn="notdog-duo",tr="slab",er="slab-press",ar="thumbprint",nr="utility",rr="utility-duo",ir="utility-fill",or="whiteboard",sr="Classic",lr="Duotone",fr="Sharp",ur="Sharp Duotone",cr="Chisel",dr="Etch",mr="Jelly",hr="Jelly Duo",gr="Jelly Fill",pr="Notdog",br="Notdog Duo",vr="Slab",yr="Slab Press",xr="Thumbprint",wr="Utility",kr="Utility Duo",Ar="Utility Fill",Sr="Whiteboard";St={},p(p(p(p(p(p(p(p(p(p(St,Jn,sr),Bn,lr),Vn,fr),_n,ur),Xn,cr),qn,dr),Kn,mr),$n,hr),Gn,gr),Qn,pr),p(p(p(p(p(p(p(p(St,Zn,br),tr,vr),er,yr),ar,xr),nr,wr),rr,kr),ir,Ar),or,Sr);var jr="kit",Pr="kit-duotone",Ir="Kit",Fr="Kit Duotone";p(p({},jr,Ir),Pr,Fr);var Or={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"},utility:{"fa-semibold":"fausb"},"utility-duo":{"fa-semibold":"faudsb"},"utility-fill":{"fa-semibold":"faufsb"}},Nr={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"],utility:["fausb"],"utility-duo":["faudsb"],"utility-fill":["faufsb"]},jt={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"},utility:{fausb:"fa-semibold"},"utility-duo":{faudsb:"fa-semibold"},"utility-fill":{faufsb:"fa-semibold"}},Er=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],Re=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr","fausb","faudsb","faufsb"].concat(Hn,Er),Cr=["solid","regular","light","thin","duotone","brands","semibold"],We=[1,2,3,4,5,6,7,8,9,10],zr=We.concat([11,12,13,14,15,16,17,18,19,20]),Dr=["aw","fw","pull-left","pull-right"],Mr=[].concat(I(Object.keys(Nr)),Cr,Dr,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",lt.GROUP,lt.SWAP_OPACITY,lt.PRIMARY,lt.SECONDARY]).concat(We.map(function(t){return"".concat(t,"x")})).concat(zr.map(function(t){return"w-".concat(t)})),Rr={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},C="___FONT_AWESOME___",Pt=16,Le="fa",Te="svg-inline--fa",T="data-fa-i2svg",It="data-fa-pseudo-element",Wr="data-fa-pseudo-element-pending",Ft="data-prefix",Ot="data-icon",Ue="fontawesome-i2svg",Lr="async",Tr=["HTML","HEAD","STYLE","SCRIPT"],Ye=["::before","::after",":before",":after"],He=(function(){try{return!0}catch{return!1}})();function K(t){return new Proxy(t,{get:function(e,a){return a in e?e[a]:e[S]}})}var Je=l({},he);Je[S]=l(l(l(l({},{"fa-duotone":"duotone"}),he[S]),De.kit),De["kit-duotone"]);var Ur=K(Je),Nt=l({},zn);Nt[S]=l(l(l(l({},{duotone:"fad"}),Nt[S]),Me.kit),Me["kit-duotone"]);var Be=K(Nt),Et=l({},jt);Et[S]=l(l({},Et[S]),Yn.kit);var Ct=K(Et),zt=l({},Or);zt[S]=l(l({},zt[S]),Tn.kit),K(zt);var Yr=fn,Ve="fa-layers-text",Hr=un,Jr=l({},Nn);K(Jr);var Br=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Dt=cn,Vr=[].concat(I(Dn),I(Mr)),$=R.FontAwesomeConfig||{};function _r(t){var e=x.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function Xr(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(x&&typeof x.querySelector=="function"){var qr=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];qr.forEach(function(t){var e=it(t,2),a=e[0],n=e[1],r=Xr(_r(a));r!=null&&($[n]=r)})}var _e={styleDefault:"solid",familyDefault:S,cssPrefix:Le,replacementClass:Te,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};$.familyPrefix&&($.cssPrefix=$.familyPrefix);var H=l(l({},_e),$);H.autoReplaceSvg||(H.observeMutations=!1);var m={};Object.keys(_e).forEach(function(t){Object.defineProperty(m,t,{enumerable:!0,set:function(e){H[t]=e,G.forEach(function(a){return a(m)})},get:function(){return H[t]}})}),Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){H.cssPrefix=t,G.forEach(function(e){return e(m)})},get:function(){return H.cssPrefix}}),R.FontAwesomeConfig=m;var G=[];function Kr(t){return G.push(t),function(){G.splice(G.indexOf(t),1)}}var J=Pt,O={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function $r(t){if(!(!t||!E)){var e=x.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var a=x.head.childNodes,n=null,r=a.length-1;r>-1;r--){var o=a[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(n=o)}return x.head.insertBefore(e,n),t}}var Gr="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Xe(){for(var t=12,e="";t-- >0;)e+=Gr[Math.random()*62|0];return e}function B(t){for(var e=[],a=(t||[]).length>>>0;a--;)e[a]=t[a];return e}function Mt(t){return t.classList?B(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function qe(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Qr(t){return Object.keys(t||{}).reduce(function(e,a){return e+"".concat(a,'="').concat(qe(t[a]),'" ')},"").trim()}function ft(t){return Object.keys(t||{}).reduce(function(e,a){return e+"".concat(a,": ").concat(t[a].trim(),";")},"")}function Rt(t){return t.size!==O.size||t.x!==O.x||t.y!==O.y||t.rotate!==O.rotate||t.flipX||t.flipY}function Zr(t){var e=t.transform,a=t.containerWidth,n=t.iconWidth,r={transform:"translate(".concat(a/2," 256)")},o="translate(".concat(e.x*32,", ").concat(e.y*32,") "),i="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),u={transform:"".concat(o," ").concat(i," ").concat(s)},f={transform:"translate(".concat(n/2*-1," -256)")};return{outer:r,inner:u,path:f}}function ti(t){var e=t.transform,a=t.width,n=a===void 0?Pt:a,r=t.height,o=r===void 0?Pt:r,i="";return me?i+="translate(".concat(e.x/J-n/2,"em, ").concat(e.y/J-o/2,"em) "):i+="translate(calc(-50% + ".concat(e.x/J,"em), calc(-50% + ").concat(e.y/J,"em)) "),i+="scale(".concat(e.size/J*(e.flipX?-1:1),", ").concat(e.size/J*(e.flipY?-1:1),") "),i+="rotate(".concat(e.rotate,"deg) "),i}var ei=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
  --fa-font-utility-semibold: normal 600 1em/1 "Font Awesome 7 Utility";
  --fa-font-utility-duo-semibold: normal 600 1em/1 "Font Awesome 7 Utility Duo";
  --fa-font-utility-fill-semibold: normal 600 1em/1 "Font Awesome 7 Utility Fill";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
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
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
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
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
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
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
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
    animation: none !important;
    transition: none !important;
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
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function Ke(){var t=Le,e=Te,a=m.cssPrefix,n=m.replacementClass,r=ei;if(a!==t||n!==e){var o=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");r=r.replace(o,".".concat(a,"-")).replace(i,"--".concat(a,"-")).replace(s,".".concat(n))}return r}var $e=!1;function Wt(){m.autoAddCss&&!$e&&($r(Ke()),$e=!0)}var ai={mixout:function(){return{dom:{css:Ke,insertCss:Wt}}},hooks:function(){return{beforeDOMElementCreation:function(){Wt()},beforeI2svg:function(){Wt()}}}},z=R||{};z[C]||(z[C]={}),z[C].styles||(z[C].styles={}),z[C].hooks||(z[C].hooks={}),z[C].shims||(z[C].shims=[]);var F=z[C],Ge=[],Qe=function(){x.removeEventListener("DOMContentLoaded",Qe),ut=1,Ge.map(function(t){return t()})},ut=!1;E&&(ut=(x.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(x.readyState),ut||x.addEventListener("DOMContentLoaded",Qe));function ni(t){E&&(ut?setTimeout(t,0):Ge.push(t))}function Q(t){var e=t.tag,a=t.attributes,n=a===void 0?{}:a,r=t.children,o=r===void 0?[]:r;return typeof t=="string"?qe(t):"<".concat(e," ").concat(Qr(n),">").concat(o.map(Q).join(""),"</").concat(e,">")}function Ze(t,e,a){if(t&&t[e]&&t[e][a])return{prefix:e,iconName:a,icon:t[e][a]}}var Lt=function(t,e,a,n){var r=Object.keys(t),o=r.length,i=e,s,u,f;for(a===void 0?(s=1,f=t[r[0]]):(s=0,f=a);s<o;s++)u=r[s],f=i(f,t[u],u,t);return f};function ta(t){return I(t).length!==1?null:t.codePointAt(0).toString(16)}function ea(t){return Object.keys(t).reduce(function(e,a){var n=t[a],r=!!n.icon;return r?e[n.iconName]=n.icon:e[a]=n,e},{})}function Tt(t,e){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=a.skipHooks,r=n===void 0?!1:n,o=ea(e);typeof F.hooks.addPack=="function"&&!r?F.hooks.addPack(t,ea(e)):F.styles[t]=l(l({},F.styles[t]||{}),o),t==="fas"&&Tt("fa",e)}var Z=F.styles,ri=F.shims,aa=Object.keys(Ct),ii=aa.reduce(function(t,e){return t[e]=Object.keys(Ct[e]),t},{}),Ut=null,na={},ra={},ia={},oa={},sa={};function oi(t){return~Vr.indexOf(t)}function si(t,e){var a=e.split("-"),n=a[0],r=a.slice(1).join("-");return n===t&&r!==""&&!oi(r)?r:null}var la=function(){var t=function(n){return Lt(Z,function(r,o,i){return r[i]=Lt(o,n,{}),r},{})};na=t(function(n,r,o){if(r[3]&&(n[r[3]]=o),r[2]){var i=r[2].filter(function(s){return typeof s=="number"});i.forEach(function(s){n[s.toString(16)]=o})}return n}),ra=t(function(n,r,o){if(n[o]=o,r[2]){var i=r[2].filter(function(s){return typeof s=="string"});i.forEach(function(s){n[s]=o})}return n}),sa=t(function(n,r,o){var i=r[2];return n[o]=o,i.forEach(function(s){n[s]=o}),n});var e="far"in Z||m.autoFetchSvg,a=Lt(ri,function(n,r){var o=r[0],i=r[1],s=r[2];return i==="far"&&!e&&(i="fas"),typeof o=="string"&&(n.names[o]={prefix:i,iconName:s}),typeof o=="number"&&(n.unicodes[o.toString(16)]={prefix:i,iconName:s}),n},{names:{},unicodes:{}});ia=a.names,oa=a.unicodes,Ut=ct(m.styleDefault,{family:m.familyDefault})};Kr(function(t){Ut=ct(t.styleDefault,{family:m.familyDefault})}),la();function Yt(t,e){return(na[t]||{})[e]}function li(t,e){return(ra[t]||{})[e]}function U(t,e){return(sa[t]||{})[e]}function fa(t){return ia[t]||{prefix:null,iconName:null}}function fi(t){var e=oa[t],a=Yt("fas",t);return e||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function W(){return Ut}var ua=function(){return{prefix:null,iconName:null,rest:[]}};function ui(t){var e=S,a=aa.reduce(function(n,r){return n[r]="".concat(m.cssPrefix,"-").concat(r),n},{});return Ce.forEach(function(n){(t.includes(a[n])||t.some(function(r){return ii[n].includes(r)}))&&(e=n)}),e}function ct(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.family,n=a===void 0?S:a,r=Ur[n][t];if(n===q&&!t)return"fad";var o=Be[n][t]||Be[n][r],i=t in F.styles?t:null,s=o||i||null;return s}function ci(t){var e=[],a=null;return t.forEach(function(n){var r=si(m.cssPrefix,n);r?a=r:n&&e.push(n)}),{iconName:a,rest:e}}function ca(t){return t.sort().filter(function(e,a,n){return n.indexOf(e)===a})}var da=Re.concat(ze);function dt(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.skipLookups,n=a===void 0?!1:a,r=null,o=ca(t.filter(function(g){return da.includes(g)})),i=ca(t.filter(function(g){return!da.includes(g)})),s=o.filter(function(g){return r=g,!ge.includes(g)}),u=it(s,1),f=u[0],c=f===void 0?null:f,d=ui(o),h=l(l({},ci(i)),{},{prefix:ct(c,{family:d})});return l(l(l({},h),gi({values:t,family:d,styles:Z,config:m,canonical:h,givenPrefix:r})),di(n,r,h))}function di(t,e,a){var n=a.prefix,r=a.iconName;if(t||!n||!r)return{prefix:n,iconName:r};var o=e==="fa"?fa(r):{},i=U(n,r);return r=o.iconName||i||r,n=o.prefix||n,n==="far"&&!Z.far&&Z.fas&&!m.autoFetchSvg&&(n="fas"),{prefix:n,iconName:r}}var mi=Ce.filter(function(t){return t!==S||t!==q}),hi=Object.keys(jt).filter(function(t){return t!==S}).map(function(t){return Object.keys(jt[t])}).flat();function gi(t){var e=t.values,a=t.family,n=t.canonical,r=t.givenPrefix,o=r===void 0?"":r,i=t.styles,s=i===void 0?{}:i,u=t.config,f=u===void 0?{}:u,c=a===q,d=e.includes("fa-duotone")||e.includes("fad"),h=f.familyDefault==="duotone",g=n.prefix==="fad"||n.prefix==="fa-duotone";if(!c&&(d||h||g)&&(n.prefix="fad"),(e.includes("fa-brands")||e.includes("fab"))&&(n.prefix="fab"),!n.prefix&&mi.includes(a)){var y=Object.keys(s).find(function(w){return hi.includes(w)});if(y||f.autoFetchSvg){var v=Cn.get(a).defaultShortPrefixId;n.prefix=v,n.iconName=U(n.prefix,n.iconName)||n.iconName}}return(n.prefix==="fa"||o==="fa")&&(n.prefix=W()||"fas"),n}var pi=(function(){function t(){Za(this,t),this.definitions={}}return en(t,[{key:"add",value:function(){for(var e=this,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];var o=n.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(i){e.definitions[i]=l(l({},e.definitions[i]||{}),o[i]),Tt(i,o[i]);var s=Ct[S][i];s&&Tt(s,o[i]),la()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(e,a){var n=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(n).map(function(r){var o=n[r],i=o.prefix,s=o.iconName,u=o.icon,f=u[2];e[i]||(e[i]={}),f.length>0&&f.forEach(function(c){typeof c=="string"&&(e[i][c]=u)}),e[i][s]=u}),e}}])})(),ma=[],V={},_={},bi=Object.keys(_);function vi(t,e){var a=e.mixoutsTo;return ma=t,V={},Object.keys(_).forEach(function(n){bi.indexOf(n)===-1&&delete _[n]}),ma.forEach(function(n){var r=n.mixout?n.mixout():{};if(Object.keys(r).forEach(function(i){typeof r[i]=="function"&&(a[i]=r[i]),ot(r[i])==="object"&&Object.keys(r[i]).forEach(function(s){a[i]||(a[i]={}),a[i][s]=r[i][s]})}),n.hooks){var o=n.hooks();Object.keys(o).forEach(function(i){V[i]||(V[i]=[]),V[i].push(o[i])})}n.provides&&n.provides(_)}),a}function Ht(t,e){for(var a=arguments.length,n=new Array(a>2?a-2:0),r=2;r<a;r++)n[r-2]=arguments[r];var o=V[t]||[];return o.forEach(function(i){e=i.apply(null,[e].concat(n))}),e}function Y(t){for(var e=arguments.length,a=new Array(e>1?e-1:0),n=1;n<e;n++)a[n-1]=arguments[n];var r=V[t]||[];r.forEach(function(o){o.apply(null,a)})}function L(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return _[t]?_[t].apply(null,e):void 0}function Jt(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,a=t.prefix||W();if(e)return e=U(a,e)||e,Ze(ha.definitions,a,e)||Ze(F.styles,a,e)}var ha=new pi,yi=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,Y("noAuto")},xi={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return E?(Y("beforeI2svg",t),L("pseudoElements2svg",t),L("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=t.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,ni(function(){ki({autoReplaceSvgRoot:e}),Y("watch",t)})}},wi={icon:function(t){if(t===null)return null;if(ot(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:U(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],a=ct(t[0]);return{prefix:a,iconName:U(a,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match(Yr))){var n=dt(t.split(" "),{skipLookups:!0});return{prefix:n.prefix||W(),iconName:U(n.prefix,n.iconName)||n.iconName}}if(typeof t=="string"){var r=W();return{prefix:r,iconName:U(r,t)||t}}}},P={noAuto:yi,config:m,dom:xi,parse:wi,library:ha,findIconDefinition:Jt,toHtml:Q},ki=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=t.autoReplaceSvgRoot,a=e===void 0?x:e;(Object.keys(F.styles).length>0||m.autoFetchSvg)&&E&&m.autoReplaceSvg&&P.dom.i2svg({node:a})};function mt(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(a){return Q(a)})}}),Object.defineProperty(t,"node",{get:function(){if(E){var a=x.createElement("div");return a.innerHTML=t.html,a.children}}}),t}function Ai(t){var e=t.children,a=t.main,n=t.mask,r=t.attributes,o=t.styles,i=t.transform;if(Rt(i)&&a.found&&!n.found){var s=a.width,u=a.height,f={x:s/u/2,y:.5};r.style=ft(l(l({},o),{},{"transform-origin":"".concat(f.x+i.x/16,"em ").concat(f.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function Si(t){var e=t.prefix,a=t.iconName,n=t.children,r=t.attributes,o=t.symbol,i=o===!0?"".concat(e,"-").concat(m.cssPrefix,"-").concat(a):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:l(l({},r),{},{id:i}),children:n}]}]}function ji(t){var e=["aria-label","aria-labelledby","title","role"];return e.some(function(a){return a in t})}function Bt(t){var e=t.icons,a=e.main,n=e.mask,r=t.prefix,o=t.iconName,i=t.transform,s=t.symbol,u=t.maskId,f=t.extra,c=t.watchable,d=c===void 0?!1:c,h=n.found?n:a,g=h.width,y=h.height,v=[m.replacementClass,o?"".concat(m.cssPrefix,"-").concat(o):""].filter(function(b){return f.classes.indexOf(b)===-1}).filter(function(b){return b!==""||!!b}).concat(f.classes).join(" "),w={children:[],attributes:l(l({},f.attributes),{},{"data-prefix":r,"data-icon":o,class:v,role:f.attributes.role||"img",viewBox:"0 0 ".concat(g," ").concat(y)})};!ji(f.attributes)&&!f.attributes["aria-hidden"]&&(w.attributes["aria-hidden"]="true"),d&&(w.attributes[T]="");var k=l(l({},w),{},{prefix:r,iconName:o,main:a,mask:n,maskId:u,transform:i,symbol:s,styles:l({},f.styles)}),A=n.found&&a.found?L("generateAbstractMask",k)||{children:[],attributes:{}}:L("generateAbstractIcon",k)||{children:[],attributes:{}},j=A.children,N=A.attributes;return k.children=j,k.attributes=N,s?Si(k):Ai(k)}function ga(t){var e=t.content,a=t.width,n=t.height,r=t.transform,o=t.extra,i=t.watchable,s=i===void 0?!1:i,u=l(l({},o.attributes),{},{class:o.classes.join(" ")});s&&(u[T]="");var f=l({},o.styles);Rt(r)&&(f.transform=ti({transform:r,width:a,height:n}),f["-webkit-transform"]=f.transform);var c=ft(f);c.length>0&&(u.style=c);var d=[];return d.push({tag:"span",attributes:u,children:[e]}),d}function Pi(t){var e=t.content,a=t.extra,n=l(l({},a.attributes),{},{class:a.classes.join(" ")}),r=ft(a.styles);r.length>0&&(n.style=r);var o=[];return o.push({tag:"span",attributes:n,children:[e]}),o}var Vt=F.styles;function _t(t){var e=t[0],a=t[1],n=t.slice(4),r=it(n,1),o=r[0],i=null;return Array.isArray(o)?i={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(Dt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Dt.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Dt.PRIMARY),fill:"currentColor",d:o[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:e,height:a,icon:i}}var Ii={found:!1,width:512,height:512};function Fi(t,e){!He&&!m.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Xt(t,e){var a=e;return e==="fa"&&m.styleDefault!==null&&(e=W()),new Promise(function(n,r){if(a==="fa"){var o=fa(t)||{};t=o.iconName||t,e=o.prefix||e}if(t&&e&&Vt[e]&&Vt[e][t]){var i=Vt[e][t];return n(_t(i))}Fi(t,e),n(l(l({},Ii),{},{icon:m.showMissingIcons&&t?L("missingIconAbstract")||{}:{}}))})}var pa=function(){},qt=m.measurePerformance&&st&&st.mark&&st.measure?st:{mark:pa,measure:pa},tt='FA "7.1.0"',Oi=function(t){return qt.mark("".concat(tt," ").concat(t," begins")),function(){return ba(t)}},ba=function(t){qt.mark("".concat(tt," ").concat(t," ends")),qt.measure("".concat(tt," ").concat(t),"".concat(tt," ").concat(t," begins"),"".concat(tt," ").concat(t," ends"))},Kt={begin:Oi,end:ba},ht=function(){};function va(t){var e=t.getAttribute?t.getAttribute(T):null;return typeof e=="string"}function Ni(t){var e=t.getAttribute?t.getAttribute(Ft):null,a=t.getAttribute?t.getAttribute(Ot):null;return e&&a}function Ei(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(m.replacementClass)}function Ci(){if(m.autoReplaceSvg===!0)return gt.replace;var t=gt[m.autoReplaceSvg];return t||gt.replace}function zi(t){return x.createElementNS("http://www.w3.org/2000/svg",t)}function Di(t){return x.createElement(t)}function ya(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.ceFn,n=a===void 0?t.tag==="svg"?zi:Di:a;if(typeof t=="string")return x.createTextNode(t);var r=n(t.tag);Object.keys(t.attributes||[]).forEach(function(i){r.setAttribute(i,t.attributes[i])});var o=t.children||[];return o.forEach(function(i){r.appendChild(ya(i,{ceFn:n}))}),r}function Mi(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var gt={replace:function(t){var e=t[0];if(e.parentNode)if(t[1].forEach(function(n){e.parentNode.insertBefore(ya(n),e)}),e.getAttribute(T)===null&&m.keepOriginalSource){var a=x.createComment(Mi(e));e.parentNode.replaceChild(a,e)}else e.remove()},nest:function(t){var e=t[0],a=t[1];if(~Mt(e).indexOf(m.replacementClass))return gt.replace(t);var n=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var r=a[0].attributes.class.split(" ").reduce(function(i,s){return s===m.replacementClass||s.match(n)?i.toSvg.push(s):i.toNode.push(s),i},{toNode:[],toSvg:[]});a[0].attributes.class=r.toSvg.join(" "),r.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",r.toNode.join(" "))}var o=a.map(function(i){return Q(i)}).join(`
`);e.setAttribute(T,""),e.innerHTML=o}};function xa(t){t()}function wa(t,e){var a=typeof e=="function"?e:ht;if(t.length===0)a();else{var n=xa;m.mutateApproach===Lr&&(n=R.requestAnimationFrame||xa),n(function(){var r=Ci(),o=Kt.begin("mutate");t.map(r),o(),a()})}}var $t=!1;function ka(){$t=!0}function Gt(){$t=!1}var pt=null;function Aa(t){if(de&&m.observeMutations){var e=t.treeCallback,a=e===void 0?ht:e,n=t.nodeCallback,r=n===void 0?ht:n,o=t.pseudoElementsCallback,i=o===void 0?ht:o,s=t.observeMutationsRoot,u=s===void 0?x:s;pt=new de(function(f){if(!$t){var c=W();B(f).forEach(function(d){if(d.type==="childList"&&d.addedNodes.length>0&&!va(d.addedNodes[0])&&(m.searchPseudoElements&&i(d.target),a(d.target)),d.type==="attributes"&&d.target.parentNode&&m.searchPseudoElements&&i([d.target],!0),d.type==="attributes"&&va(d.target)&&~Br.indexOf(d.attributeName))if(d.attributeName==="class"&&Ni(d.target)){var h=dt(Mt(d.target)),g=h.prefix,y=h.iconName;d.target.setAttribute(Ft,g||c),y&&d.target.setAttribute(Ot,y)}else Ei(d.target)&&r(d.target)})}}),E&&pt.observe(u,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Ri(){pt&&pt.disconnect()}function Wi(t){var e=t.getAttribute("style"),a=[];return e&&(a=e.split(";").reduce(function(n,r){var o=r.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(n[i]=s.join(":").trim()),n},{})),a}function Li(t){var e=t.getAttribute("data-prefix"),a=t.getAttribute("data-icon"),n=t.innerText!==void 0?t.innerText.trim():"",r=dt(Mt(t));return r.prefix||(r.prefix=W()),e&&a&&(r.prefix=e,r.iconName=a),r.iconName&&r.prefix||(r.prefix&&n.length>0&&(r.iconName=li(r.prefix,t.innerText)||Yt(r.prefix,ta(t.innerText))),!r.iconName&&m.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function Ti(t){var e=B(t.attributes).reduce(function(a,n){return a.name!=="class"&&a.name!=="style"&&(a[n.name]=n.value),a},{});return e}function Ui(){return{iconName:null,prefix:null,transform:O,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Sa(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=Li(t),n=a.iconName,r=a.prefix,o=a.rest,i=Ti(t),s=Ht("parseNodeAttributes",{},t),u=e.styleParser?Wi(t):[];return l({iconName:n,prefix:r,transform:O,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:u,attributes:i}},s)}var Yi=F.styles;function ja(t){var e=m.autoReplaceSvg==="nest"?Sa(t,{styleParser:!1}):Sa(t);return~e.extra.classes.indexOf(Ve)?L("generateLayersText",t,e):L("generateSvgReplacementMutation",t,e)}function Hi(){return[].concat(I(ze),I(Re))}function Pa(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!E)return Promise.resolve();var a=x.documentElement.classList,n=function(c){return a.add("".concat(Ue,"-").concat(c))},r=function(c){return a.remove("".concat(Ue,"-").concat(c))},o=m.autoFetchSvg?Hi():ge.concat(Object.keys(Yi));o.includes("fa")||o.push("fa");var i=[".".concat(Ve,":not([").concat(T,"])")].concat(o.map(function(c){return".".concat(c,":not([").concat(T,"])")})).join(", ");if(i.length===0)return Promise.resolve();var s=[];try{s=B(t.querySelectorAll(i))}catch{}if(s.length>0)n("pending"),r("complete");else return Promise.resolve();var u=Kt.begin("onTree"),f=s.reduce(function(c,d){try{var h=ja(d);h&&c.push(h)}catch(g){He||g.name==="MissingIcon"&&console.error(g)}return c},[]);return new Promise(function(c,d){Promise.all(f).then(function(h){wa(h,function(){n("active"),n("complete"),r("pending"),typeof e=="function"&&e(),u(),c()})}).catch(function(h){u(),d(h)})})}function Ji(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;ja(t).then(function(a){a&&wa([a],e)})}function Bi(t){return function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=(e||{}).icon?e:Jt(e||{}),r=a.mask;return r&&(r=(r||{}).icon?r:Jt(r||{})),t(n,l(l({},a),{},{mask:r}))}}var Vi=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.transform,n=a===void 0?O:a,r=e.symbol,o=r===void 0?!1:r,i=e.mask,s=i===void 0?null:i,u=e.maskId,f=u===void 0?null:u,c=e.classes,d=c===void 0?[]:c,h=e.attributes,g=h===void 0?{}:h,y=e.styles,v=y===void 0?{}:y;if(t){var w=t.prefix,k=t.iconName,A=t.icon;return mt(l({type:"icon"},t),function(){return Y("beforeDOMElementCreation",{iconDefinition:t,params:e}),Bt({icons:{main:_t(A),mask:s?_t(s.icon):{found:!1,width:null,height:null,icon:{}}},prefix:w,iconName:k,transform:l(l({},O),n),symbol:o,maskId:f,extra:{attributes:g,styles:v,classes:d}})})}},_i={mixout:function(){return{icon:Bi(Vi)}},hooks:function(){return{mutationObserverCallbacks:function(t){return t.treeCallback=Pa,t.nodeCallback=Ji,t}}},provides:function(t){t.i2svg=function(e){var a=e.node,n=a===void 0?x:a,r=e.callback,o=r===void 0?function(){}:r;return Pa(n,o)},t.generateSvgReplacementMutation=function(e,a){var n=a.iconName,r=a.prefix,o=a.transform,i=a.symbol,s=a.mask,u=a.maskId,f=a.extra;return new Promise(function(c,d){Promise.all([Xt(n,r),s.iconName?Xt(s.iconName,s.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(h){var g=it(h,2),y=g[0],v=g[1];c([e,Bt({icons:{main:y,mask:v},prefix:r,iconName:n,transform:o,symbol:i,maskId:u,extra:f,watchable:!0})])}).catch(d)})},t.generateAbstractIcon=function(e){var a=e.children,n=e.attributes,r=e.main,o=e.transform,i=e.styles,s=ft(i);s.length>0&&(n.style=s);var u;return Rt(o)&&(u=L("generateAbstractTransformGrouping",{main:r,transform:o,containerWidth:r.width,iconWidth:r.width})),a.push(u||r.icon),{children:a,attributes:n}}}},Xi={mixout:function(){return{layer:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.classes,n=a===void 0?[]:a;return mt({type:"layer"},function(){Y("beforeDOMElementCreation",{assembler:t,params:e});var r=[];return t(function(o){Array.isArray(o)?o.map(function(i){r=r.concat(i.abstract)}):r=r.concat(o.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(I(n)).join(" ")},children:r}]})}}}},qi={mixout:function(){return{counter:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};e.title;var a=e.classes,n=a===void 0?[]:a,r=e.attributes,o=r===void 0?{}:r,i=e.styles,s=i===void 0?{}:i;return mt({type:"counter",content:t},function(){return Y("beforeDOMElementCreation",{content:t,params:e}),Pi({content:t.toString(),extra:{attributes:o,styles:s,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(I(n))}})})}}}},Ki={mixout:function(){return{text:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.transform,n=a===void 0?O:a,r=e.classes,o=r===void 0?[]:r,i=e.attributes,s=i===void 0?{}:i,u=e.styles,f=u===void 0?{}:u;return mt({type:"text",content:t},function(){return Y("beforeDOMElementCreation",{content:t,params:e}),ga({content:t,transform:l(l({},O),n),extra:{attributes:s,styles:f,classes:["".concat(m.cssPrefix,"-layers-text")].concat(I(o))}})})}}},provides:function(t){t.generateLayersText=function(e,a){var n=a.transform,r=a.extra,o=null,i=null;if(me){var s=parseInt(getComputedStyle(e).fontSize,10),u=e.getBoundingClientRect();o=u.width/s,i=u.height/s}return Promise.resolve([e,ga({content:e.innerHTML,width:o,height:i,transform:n,extra:r,watchable:!0})])}}},Ia=new RegExp('"',"ug"),Fa=[1105920,1112319],Oa=l(l(l(l({},{FontAwesome:{normal:"fas",400:"fas"}}),En),Rr),Un),Qt=Object.keys(Oa).reduce(function(t,e){return t[e.toLowerCase()]=Oa[e],t},{}),$i=Object.keys(Qt).reduce(function(t,e){var a=Qt[e];return t[e]=a[900]||I(Object.entries(a))[0][1],t},{});function Gi(t){var e=t.replace(Ia,"");return ta(I(e)[0]||"")}function Qi(t){var e=t.getPropertyValue("font-feature-settings").includes("ss01"),a=t.getPropertyValue("content"),n=a.replace(Ia,""),r=n.codePointAt(0),o=r>=Fa[0]&&r<=Fa[1],i=n.length===2?n[0]===n[1]:!1;return o||i||e}function Zi(t,e){var a=t.replace(/^['"]|['"]$/g,"").toLowerCase(),n=parseInt(e),r=isNaN(n)?"normal":n;return(Qt[a]||{})[r]||$i[a]}function Na(t,e){var a="".concat(Wr).concat(e.replace(":","-"));return new Promise(function(n,r){if(t.getAttribute(a)!==null)return n();var o=B(t.children),i=o.filter(function(bt){return bt.getAttribute(It)===e})[0],s=R.getComputedStyle(t,e),u=s.getPropertyValue("font-family"),f=u.match(Hr),c=s.getPropertyValue("font-weight"),d=s.getPropertyValue("content");if(i&&!f)return t.removeChild(i),n();if(f&&d!=="none"&&d!==""){var h=s.getPropertyValue("content"),g=Zi(u,c),y=Gi(h),v=f[0].startsWith("FontAwesome"),w=Qi(s),k=Yt(g,y),A=k;if(v){var j=fi(y);j.iconName&&j.prefix&&(k=j.iconName,g=j.prefix)}if(k&&!w&&(!i||i.getAttribute(Ft)!==g||i.getAttribute(Ot)!==A)){t.setAttribute(a,A),i&&t.removeChild(i);var N=Ui(),b=N.extra;b.attributes[It]=e,Xt(k,g).then(function(bt){var Ja=Bt(l(l({},N),{},{icons:{main:bt,mask:ua()},prefix:g,iconName:A,extra:b,watchable:!0})),vt=x.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(vt,t.firstChild):t.appendChild(vt),vt.outerHTML=Ja.map(function(Ba){return Q(Ba)}).join(`
`),t.removeAttribute(a),n()}).catch(r)}else n()}else n()})}function to(t){return Promise.all([Na(t,"::before"),Na(t,"::after")])}function eo(t){return t.parentNode!==document.head&&!~Tr.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(It)&&(!t.parentNode||t.parentNode.tagName!=="svg")}var ao=function(t){return!!t&&Ye.some(function(e){return t.includes(e)})},no=function(t){if(!t)return[];var e=new Set,a=t.split(/,(?![^()]*\))/).map(function(s){return s.trim()});a=a.flatMap(function(s){return s.includes("(")?s:s.split(",").map(function(u){return u.trim()})});var n=rt(a),r;try{for(n.s();!(r=n.n()).done;){var o=r.value;if(ao(o)){var i=Ye.reduce(function(s,u){return s.replace(u,"")},o);i!==""&&i!=="*"&&e.add(i)}}}catch(s){n.e(s)}finally{n.f()}return e};function Ea(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(E){var a;if(e)a=t;else if(m.searchPseudoElementsFullScan)a=t.querySelectorAll("*");else{var n=new Set,r=rt(document.styleSheets),o;try{for(r.s();!(o=r.n()).done;){var i=o.value;try{var s=rt(i.cssRules),u;try{for(s.s();!(u=s.n()).done;){var f=u.value,c=no(f.selectorText),d=rt(c),h;try{for(d.s();!(h=d.n()).done;){var g=h.value;n.add(g)}}catch(v){d.e(v)}finally{d.f()}}}catch(v){s.e(v)}finally{s.f()}}catch(v){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(i.href," (").concat(v.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(v){r.e(v)}finally{r.f()}if(!n.size)return;var y=Array.from(n).join(", ");try{a=t.querySelectorAll(y)}catch{}}return new Promise(function(v,w){var k=B(a).filter(eo).map(to),A=Kt.begin("searchPseudoElements");ka(),Promise.all(k).then(function(){A(),Gt(),v()}).catch(function(){A(),Gt(),w()})})}}var ro={hooks:function(){return{mutationObserverCallbacks:function(t){return t.pseudoElementsCallback=Ea,t}}},provides:function(t){t.pseudoElements2svg=function(e){var a=e.node,n=a===void 0?x:a;m.searchPseudoElements&&Ea(n)}}},Ca=!1,io={mixout:function(){return{dom:{unwatch:function(){ka(),Ca=!0}}}},hooks:function(){return{bootstrap:function(){Aa(Ht("mutationObserverCallbacks",{}))},noAuto:function(){Ri()},watch:function(t){var e=t.observeMutationsRoot;Ca?Gt():Aa(Ht("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}},za=function(t){var e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(a,n){var r=n.toLowerCase().split("-"),o=r[0],i=r.slice(1).join("-");if(o&&i==="h")return a.flipX=!0,a;if(o&&i==="v")return a.flipY=!0,a;if(i=parseFloat(i),isNaN(i))return a;switch(o){case"grow":a.size=a.size+i;break;case"shrink":a.size=a.size-i;break;case"left":a.x=a.x-i;break;case"right":a.x=a.x+i;break;case"up":a.y=a.y-i;break;case"down":a.y=a.y+i;break;case"rotate":a.rotate=a.rotate+i;break}return a},e)},oo={mixout:function(){return{parse:{transform:function(t){return za(t)}}}},hooks:function(){return{parseNodeAttributes:function(t,e){var a=e.getAttribute("data-fa-transform");return a&&(t.transform=za(a)),t}}},provides:function(t){t.generateAbstractTransformGrouping=function(e){var a=e.main,n=e.transform,r=e.containerWidth,o=e.iconWidth,i={transform:"translate(".concat(r/2," 256)")},s="translate(".concat(n.x*32,", ").concat(n.y*32,") "),u="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),f="rotate(".concat(n.rotate," 0 0)"),c={transform:"".concat(s," ").concat(u," ").concat(f)},d={transform:"translate(".concat(o/2*-1," -256)")},h={outer:i,inner:c,path:d};return{tag:"g",attributes:l({},h.outer),children:[{tag:"g",attributes:l({},h.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:l(l({},a.icon.attributes),h.path)}]}]}}}},Zt={x:0,y:0,width:"100%",height:"100%"};function Da(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function so(t){return t.tag==="g"?t.children:[t]}var lo={hooks:function(){return{parseNodeAttributes:function(t,e){var a=e.getAttribute("data-fa-mask"),n=a?dt(a.split(" ").map(function(r){return r.trim()})):ua();return n.prefix||(n.prefix=W()),t.mask=n,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides:function(t){t.generateAbstractMask=function(e){var a=e.children,n=e.attributes,r=e.main,o=e.mask,i=e.maskId,s=e.transform,u=r.width,f=r.icon,c=o.width,d=o.icon,h=Zr({transform:s,containerWidth:c,iconWidth:u}),g={tag:"rect",attributes:l(l({},Zt),{},{fill:"white"})},y=f.children?{children:f.children.map(Da)}:{},v={tag:"g",attributes:l({},h.inner),children:[Da(l({tag:f.tag,attributes:l(l({},f.attributes),h.path)},y))]},w={tag:"g",attributes:l({},h.outer),children:[v]},k="mask-".concat(i||Xe()),A="clip-".concat(i||Xe()),j={tag:"mask",attributes:l(l({},Zt),{},{id:k,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[g,w]},N={tag:"defs",children:[{tag:"clipPath",attributes:{id:A},children:so(d)},j]};return a.push(N,{tag:"rect",attributes:l({fill:"currentColor","clip-path":"url(#".concat(A,")"),mask:"url(#".concat(k,")")},Zt)}),{children:a,attributes:n}}}},fo={provides:function(t){var e=!1;R.matchMedia&&(e=R.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var a=[],n={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:l(l({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=l(l({},r),{},{attributeName:"opacity"}),i={tag:"circle",attributes:l(l({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||i.children.push({tag:"animate",attributes:l(l({},r),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:l(l({},o),{},{values:"1;0;1;1;0;1;"})}),a.push(i),a.push({tag:"path",attributes:l(l({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:l(l({},o),{},{values:"1;0;0;0;0;1;"})}]}),e||a.push({tag:"path",attributes:l(l({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:l(l({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},uo={hooks:function(){return{parseNodeAttributes:function(t,e){var a=e.getAttribute("data-fa-symbol"),n=a===null?!1:a===""?!0:a;return t.symbol=n,t}}}},co=[ai,_i,Xi,qi,Ki,ro,io,oo,lo,fo,uo];vi(co,{mixoutsTo:P}),P.noAuto;var et=P.config;P.library,P.dom;var Ma=P.parse;P.findIconDefinition,P.toHtml;var mo=P.icon;P.layer,P.text,P.counter;function ho(t){return t=t-0,t===t}function Ra(t){return ho(t)?t:(t=t.replace(/[_-]+(.)?/g,(e,a)=>a?a.toUpperCase():""),t.charAt(0).toLowerCase()+t.slice(1))}function go(t){return t.charAt(0).toUpperCase()+t.slice(1)}var X=new Map,po=1e3;function bo(t){if(X.has(t))return X.get(t);const e={};let a=0;const n=t.length;for(;a<n;){const r=t.indexOf(";",a),o=r===-1?n:r,i=t.slice(a,o).trim();if(i){const s=i.indexOf(":");if(s>0){const u=i.slice(0,s).trim(),f=i.slice(s+1).trim();if(u&&f){const c=Ra(u);e[c.startsWith("webkit")?go(c):c]=f}}}a=o+1}if(X.size===po){const r=X.keys().next().value;r&&X.delete(r)}return X.set(t,e),e}function Wa(t,e,a={}){if(typeof e=="string")return e;const n=(e.children||[]).map(f=>Wa(t,f)),r=e.attributes||{},o={};for(const[f,c]of Object.entries(r))switch(!0){case f==="class":{o.className=c;break}case f==="style":{o.style=bo(String(c));break}case f.startsWith("aria-"):case f.startsWith("data-"):{o[f.toLowerCase()]=c;break}default:o[Ra(f)]=c}const{style:i,"aria-label":s,...u}=a;return i&&(o.style=o.style?{...o.style,...i}:i),s&&(o["aria-label"]=s,o["aria-hidden"]="false"),t(e.tag,{...u,...o},...n)}var vo=Wa.bind(null,te.createElement),La=(t,e)=>{const a=_a.useId();return t||(e?a:void 0)},yo=class{constructor(t="react-fontawesome"){this.enabled=!1;let e=!1;try{e=typeof process<"u"&&!1}catch{}this.scope=t,this.enabled=e}log(...t){this.enabled&&(`${this.scope}`,[...t])}warn(...t){this.enabled&&console.warn(`[${this.scope}]`,...t)}error(...t){this.enabled&&console.error(`[${this.scope}]`,...t)}},xo="searchPseudoElementsFullScan"in et?"7.0.0":"6.0.0",wo=Number.parseInt(xo)>=7,at="fa",D={beat:"fa-beat",fade:"fa-fade",beatFade:"fa-beat-fade",bounce:"fa-bounce",shake:"fa-shake",spin:"fa-spin",spinPulse:"fa-spin-pulse",spinReverse:"fa-spin-reverse",pulse:"fa-pulse"},ko={left:"fa-pull-left",right:"fa-pull-right"},Ao={90:"fa-rotate-90",180:"fa-rotate-180",270:"fa-rotate-270"},So={"2xs":"fa-2xs",xs:"fa-xs",sm:"fa-sm",lg:"fa-lg",xl:"fa-xl","2xl":"fa-2xl","1x":"fa-1x","2x":"fa-2x","3x":"fa-3x","4x":"fa-4x","5x":"fa-5x","6x":"fa-6x","7x":"fa-7x","8x":"fa-8x","9x":"fa-9x","10x":"fa-10x"},M={border:"fa-border",fixedWidth:"fa-fw",flip:"fa-flip",flipHorizontal:"fa-flip-horizontal",flipVertical:"fa-flip-vertical",inverse:"fa-inverse",rotateBy:"fa-rotate-by",swapOpacity:"fa-swap-opacity",widthAuto:"fa-width-auto"};function jo(t){const e=et.cssPrefix||et.familyPrefix||at;return e===at?t:t.replace(new RegExp(`(?<=^|\\s)${at}-`,"g"),`${e}-`)}function Po(t){const{beat:e,fade:a,beatFade:n,bounce:r,shake:o,spin:i,spinPulse:s,spinReverse:u,pulse:f,fixedWidth:c,inverse:d,border:h,flip:g,size:y,rotation:v,pull:w,swapOpacity:k,rotateBy:A,widthAuto:j,className:N}=t,b=[];return N&&b.push(...N.split(" ")),e&&b.push(D.beat),a&&b.push(D.fade),n&&b.push(D.beatFade),r&&b.push(D.bounce),o&&b.push(D.shake),i&&b.push(D.spin),u&&b.push(D.spinReverse),s&&b.push(D.spinPulse),f&&b.push(D.pulse),c&&b.push(M.fixedWidth),d&&b.push(M.inverse),h&&b.push(M.border),g===!0&&b.push(M.flip),(g==="horizontal"||g==="both")&&b.push(M.flipHorizontal),(g==="vertical"||g==="both")&&b.push(M.flipVertical),y!=null&&b.push(So[y]),v!=null&&v!==0&&b.push(Ao[v]),w!=null&&b.push(ko[w]),k&&b.push(M.swapOpacity),wo?(A&&b.push(M.rotateBy),j&&b.push(M.widthAuto),(et.cssPrefix||et.familyPrefix||at)===at?b:b.map(jo)):b}var Io=t=>typeof t=="object"&&"icon"in t&&!!t.icon;function Ta(t){if(t)return Io(t)?t:Ma.icon(t)}function Fo(t){return Object.keys(t)}var Ua=new yo("FontAwesomeIcon"),Ya={border:!1,className:"",mask:void 0,maskId:void 0,fixedWidth:!1,inverse:!1,flip:!1,icon:void 0,listItem:!1,pull:void 0,pulse:!1,rotation:void 0,rotateBy:!1,size:void 0,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:void 0,transform:void 0,swapOpacity:!1,widthAuto:!1},Oo=new Set(Object.keys(Ya)),Ha=te.forwardRef((t,e)=>{const a={...Ya,...t},{icon:n,mask:r,symbol:o,title:i,titleId:s,maskId:u,transform:f}=a,c=La(u,!!r),d=La(s,!!i),h=Ta(n);if(!h)return Ua.error("Icon lookup is undefined",n),null;const g=Po(a),y=typeof f=="string"?Ma.transform(f):f,v=Ta(r),w=mo(h,{...g.length>0&&{classes:g},...y&&{transform:y},...v&&{mask:v},symbol:o,title:i,titleId:d,maskId:c});if(!w)return Ua.error("Could not find icon",h),null;const{abstract:k}=w,A={ref:e};for(const j of Fo(a))Oo.has(j)||(A[j]=a[j]);return vo(k[0],A)});Ha.displayName="FontAwesomeIcon";export{Ha as F,$a as a,yt as b,qa as c};
