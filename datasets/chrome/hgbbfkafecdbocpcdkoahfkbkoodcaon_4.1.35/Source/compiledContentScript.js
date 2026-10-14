/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 5994:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallback: () => (/* binding */ q),
/* harmony export */   useContext: () => (/* binding */ x),
/* harmony export */   useDebugValue: () => (/* binding */ P),
/* harmony export */   useEffect: () => (/* binding */ y),
/* harmony export */   useErrorBoundary: () => (/* binding */ b),
/* harmony export */   useId: () => (/* binding */ g),
/* harmony export */   useImperativeHandle: () => (/* binding */ F),
/* harmony export */   useLayoutEffect: () => (/* binding */ _),
/* harmony export */   useMemo: () => (/* binding */ T),
/* harmony export */   useReducer: () => (/* binding */ p),
/* harmony export */   useRef: () => (/* binding */ A),
/* harmony export */   useState: () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2865);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
var t,r,u,i,o=0,f=[],c=preact__WEBPACK_IMPORTED_MODULE_0__.options,e=c.__b,a=c.__r,v=c.diffed,l=c.__c,m=c.unmount,s=c.__;function d(n,t){c.__h&&c.__h(r,n,o||t),o=0;var u=r.__H||(r.__H={__:[],__h:[]});return n>=u.__.length&&u.__.push({}),u.__[n]}function h(n){return o=1,p(D,n)}function p(n,u,i){var o=d(t++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):D(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}))}],o.__c=r,!r.u)){var f=function(n,t,r){if(!o.__c.__H)return!0;var u=o.__c.__H.__.filter(function(n){return!!n.__c});if(u.every(function(n){return!n.__N}))return!c||c.call(this,n,t,r);var i=!1;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0)}}),!(!i&&o.__c.props===n)&&(!c||c.call(this,n,t,r))};r.u=!0;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u}e&&e.call(this,n,t,r)},r.shouldComponentUpdate=f}return o.__N||o.__}function y(n,u){var i=d(t++,3);!c.__s&&C(i.__H,u)&&(i.__=n,i.i=u,r.__H.__h.push(i))}function _(n,u){var i=d(t++,4);!c.__s&&C(i.__H,u)&&(i.__=n,i.i=u,r.__h.push(i))}function A(n){return o=5,T(function(){return{current:n}},[])}function F(n,t,r){o=6,_(function(){return"function"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==r?r:r.concat(n))}function T(n,r){var u=d(t++,7);return C(u.__H,r)&&(u.__=n(),u.__H=r,u.__h=n),u.__}function q(n,t){return o=8,T(function(){return n},t)}function x(n){var u=r.context[n.__c],i=d(t++,9);return i.c=n,u?(null==i.__&&(i.__=!0,u.sub(r)),u.props.value):n.__}function P(n,t){c.useDebugValue&&c.useDebugValue(t?t(n):n)}function b(n){var u=d(t++,10),i=h();return u.__=n,r.componentDidCatch||(r.componentDidCatch=function(n,t){u.__&&u.__(n,t),i[1](n)}),[i[0],function(){i[1](void 0)}]}function g(){var n=d(t++,11);if(!n.__){for(var u=r.__v;null!==u&&!u.__m&&null!==u.__;)u=u.__;var i=u.__m||(u.__m=[0,0]);n.__="P"+i[0]+"-"+i[1]++}return n.__}function j(){for(var n;n=f.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(z),n.__H.__h.forEach(B),n.__H.__h=[]}catch(t){n.__H.__h=[],c.__e(t,n.__v)}}c.__b=function(n){r=null,e&&e(n)},c.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),s&&s(n,t)},c.__r=function(n){a&&a(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.i=n.__N=void 0})):(i.__h.forEach(z),i.__h.forEach(B),i.__h=[],t=0)),u=r},c.diffed=function(n){v&&v(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(1!==f.push(t)&&i===c.requestAnimationFrame||((i=c.requestAnimationFrame)||w)(j)),t.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.i=void 0})),u=r=null},c.__c=function(n,t){t.some(function(n){try{n.__h.forEach(z),n.__h=n.__h.filter(function(n){return!n.__||B(n)})}catch(r){t.some(function(n){n.__h&&(n.__h=[])}),t=[],c.__e(r,n.__v)}}),l&&l(n,t)},c.unmount=function(n){m&&m(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{z(n)}catch(n){t=n}}),r.__H=void 0,t&&c.__e(t,r.__v))};var k="function"==typeof requestAnimationFrame;function w(n){var t,r=function(){clearTimeout(u),k&&cancelAnimationFrame(t),setTimeout(n)},u=setTimeout(r,100);k&&(t=requestAnimationFrame(r))}function z(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t}function B(n){var t=r;n.__c=n.__(),r=t}function C(n,t){return!n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function D(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map


/***/ }),

/***/ 201:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fragment: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   jsx: () => (/* binding */ u),
/* harmony export */   jsxAttr: () => (/* binding */ l),
/* harmony export */   jsxDEV: () => (/* binding */ u),
/* harmony export */   jsxEscape: () => (/* binding */ _),
/* harmony export */   jsxTemplate: () => (/* binding */ a),
/* harmony export */   jsxs: () => (/* binding */ u)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2865);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
var t=/["&<]/;function n(r){if(0===r.length||!1===t.test(r))return r;for(var e=0,n=0,o="",f="";n<r.length;n++){switch(r.charCodeAt(n)){case 34:f="&quot;";break;case 38:f="&amp;";break;case 60:f="&lt;";break;default:continue}n!==e&&(o+=r.slice(e,n)),o+=f,e=n+1}return n!==e&&(o+=r.slice(e,n)),o}var o=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,f=0,i=Array.isArray;function u(e,t,n,o,i,u){t||(t={});var a,c,p=t;if("ref"in p)for(c in p={},t)"ref"==c?a=t[c]:p[c]=t[c];var l={type:e,props:p,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--f,__i:-1,__u:0,__source:i,__self:u};if("function"==typeof e&&(a=e.defaultProps))for(c in a)void 0===p[c]&&(p[c]=a[c]);return preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode&&preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode(l),l}function a(r){var t=u(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,{tpl:r,exprs:[].slice.call(arguments,1)});return t.key=t.__v,t}var c={},p=/[A-Z]/g;function l(e,t){if(preact__WEBPACK_IMPORTED_MODULE_0__.options.attr){var f=preact__WEBPACK_IMPORTED_MODULE_0__.options.attr(e,t);if("string"==typeof f)return f}if("ref"===e||"key"===e)return"";if("style"===e&&"object"==typeof t){var i="";for(var u in t){var a=t[u];if(null!=a&&""!==a){var l="-"==u[0]?u:c[u]||(c[u]=u.replace(p,"-$&").toLowerCase()),_=";";"number"!=typeof a||l.startsWith("--")||o.test(l)||(_="px;"),i=i+l+":"+a+_}}return e+'="'+i+'"'}return null==t||!1===t||"function"==typeof t||"object"==typeof t?"":!0===t?e:e+'="'+n(t)+'"'}function _(r){if(null==r||"boolean"==typeof r||"function"==typeof r)return null;if("object"==typeof r){if(void 0===r.constructor)return r;if(i(r)){for(var e=0;e<r.length;e++)r[e]=_(r[e]);return r}}return n(""+r)}
//# sourceMappingURL=jsxRuntime.module.js.map


/***/ }),

/***/ 1741:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openMenu = openMenu;
async function openMenu(trm) {
    const tabs = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });
    if (tabs[0]) {
        const thisTabID = tabs[0].id;
        if (tabs[0].url === "chrome://newtab/") {
            trm.update({
                displayType: "new_tab",
                closeFunction: () => null,
            });
            return;
        }
        if (tabs[0].url && new URL(tabs[0].url).host === "www.moonsift.com") {
            if (tabs[0].url.includes("/collection/")) {
                trm.update({
                    displayType: "moonsift_site",
                    closeFunction: () => null,
                });
                return;
            }
            trm.update({
                displayType: "new_tab",
                closeFunction: () => null,
            });
            return;
        }
        if (thisTabID) {
            chrome.tabs
                .sendMessage(thisTabID, {
                action: "toolbar_click",
            })
                .catch((error) => {
                if (
                // disregard case tab is not connected to extension.
                error.message !==
                    "Could not establish connection. Receiving end does not exist.") {
                    trm.logger.debugError(error, "Unable to send toolbar click to tab from dropdown", "Tab ID:", thisTabID);
                }
                else {
                    // display message that just installed extension...
                    // TODO: set the display to show the message "RELOAD THE TAB"
                    trm.logger.debugLog("Could not send toolbar click to tab as connection not set up!");
                    trm.update({
                        displayType: "reload_page",
                        closeFunction: () => null,
                    });
                }
            });
        }
        return thisTabID;
    }
    return null;
}


/***/ }),

/***/ 4907:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

NON-STATIC CLASS

This class stores code that is injected as the content script into EVERY page regardless of if Moonsift runs page inspection on it in the end or not

A few things (css) are loaded here so that they are only loaded once, regardless of how many times inspection is run.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentScript = void 0;
const addCSS_1 = __webpack_require__(5209);
const DetectionDiv_1 = __webpack_require__(1429);
const PageInspector_1 = __webpack_require__(259);
const addMessageReceiver_1 = __webpack_require__(1358);
const Logger_1 = __webpack_require__(176);
const getSiteUID_1 = __webpack_require__(4483);
const sendBGMessagePromise_1 = __webpack_require__(5104);
const getSiteSettings_1 = __webpack_require__(3388);
class ContentScript {
    constructor() {
        this.doOpenMenu = false;
        this.whitelistedHasRun = false;
        this.whitelistCheckCount = 0;
        this.addDetectionDiv = () => {
            try {
                if (this.detectionDiv === undefined) {
                    this.detectionDiv = new DetectionDiv_1.DetectionDiv(this.logger);
                }
            }
            catch (err) {
                // will catch an error in constructor.
                this.logger.debugError(err, "Adding detection Div failed, non-critical");
            }
        };
        // Only run on retail websites we support:
        this.runOnWhitelistedSite = async () => {
            if (this.whitelistedHasRun !== true) {
                this.notRunning = undefined;
                this.whitelistedHasRun = true;
                try {
                    // Add the font to the page for later rendering:
                    (0, addCSS_1.addCSS)(this.logger);
                    if (this.siteUID !== false) {
                        this.pageInspector = new PageInspector_1.PageInspector(this.siteUID, this, this.logger);
                    }
                }
                catch (err) {
                    this.logger.debugError(err, "Initial set-up failed, critical");
                }
            }
        };
        // In the early days the whitelist will not be complete so do a lookup anyway:
        this.doLookupInstead = async () => {
            try {
                if (this.siteUID) {
                    // IMPORTANT: This MUST NOT record generic browsing activity:
                    const siteSettings = await (0, getSiteSettings_1.getSiteSettings)(this.siteUID, this.logger, 60000 // 1 minute
                    );
                    if (siteSettings.runHere === true || siteSettings.bgscrapeUID) {
                        this.logger.debugLog("%c Moonsift: Outside whitelist lookup succeeded!", "background-color:#FEDF91");
                        this.runOnWhitelistedSite();
                    }
                    else {
                        // instead set a global that we are not running...:
                        this.notRunning = true;
                    }
                }
            }
            catch (err) {
                this.logger.debugError(err, "Lookup anyway failed, critical");
            }
        };
        // Check that the site is in the whitelist by messaging the background script:
        // Limit to 5 checks to reduce any load if errors:
        this.checkWhitelist = async () => {
            if (this.whitelistCheckCount < 5 &&
                !(document.contentType === "application/xml")) {
                try {
                    // This also checks if debug mode is on...:
                    const thisObject = this;
                    if (this.siteUID !== false) {
                        const response = await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                            protocol: "send_and_receive",
                            type: "api",
                            action: "whitelist_lookup",
                            ms_site_key: this.siteUID,
                        }, this.logger);
                        if (response.bgSuccess === true) {
                            this.logger.setDebugMode(response.message.debug_mode);
                            this.logger.setAuthUserUID(response.message.auth_user_uid);
                            if (response.message.in_whitelist === true) {
                                thisObject.runOnWhitelistedSite();
                            }
                            else {
                                thisObject.doLookupInstead();
                            }
                            if (response.message.debug_mode === true) {
                                thisObject.addDetectionDiv();
                            }
                        }
                        else {
                            window.setTimeout(thisObject.checkWhitelist, 100);
                        }
                    }
                    else {
                        window.setTimeout(thisObject.checkWhitelist, 400);
                    }
                }
                catch (err) {
                    this.logger.debugError(err, "Whitelist lookup failed, critical");
                }
                this.whitelistCheckCount += 1;
            }
        };
        this.toolbarClick = async () => {
            this.doOpenMenu = true;
            if (this.pageInspector && this.siteUID) {
                // open as loading:
                this.pageInspector.overlayManager.setTopRightMenuView("loading", true);
                this.pageInspector.scriptRunner.forceScriptToRun();
            }
            else {
                this.runOnWhitelistedSite();
            }
        };
        this.logger = new Logger_1.Logger();
        this.siteUID = (0, getSiteUID_1.getSiteUID)(window.location.host, this.logger);
        this.siteUID && this.logger.setSiteUID(this.siteUID);
        // Listen for background script messages :
        (0, addMessageReceiver_1.addMessageReceiver)(this);
        // Add indication to moonsift.com that we are installed!:
        if (this.siteUID === "moonsift.com") {
            this.addDetectionDiv();
        }
    }
}
exports.ContentScript = ContentScript;


/***/ }),

/***/ 1429:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
NON-STATIC CLASS

All this does is add a tiny div so we can tell that the extension is installed
it only does it on Moonsift.com or if debug is turned on!

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DetectionDiv = void 0;
const appendToDocument_1 = __webpack_require__(9484);
class DetectionDiv {
    constructor(logger) {
        this.container = document.createElement("div");
        this.container.setAttribute("id", "ms_extension");
        // add containers to document:
        (0, appendToDocument_1.appendToDocument)("head", [this.container], logger);
    }
}
exports.DetectionDiv = DetectionDiv;


/***/ }),

/***/ 5209:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
SINGLE FUNCTION

Add some css to the pages for later use:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addCSS = addCSS;
const appendToDocument_1 = __webpack_require__(9484);
async function addCSS(logger) {
    try {
        const appendageList = [];
        for (let this_href of [
            "https://fonts.googleapis.com/css?family=Roboto&display=swap",
            "https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap",
            chrome.runtime.getURL("/ui/moonfont.css"),
        ]) {
            const font_link = document.createElement("link");
            font_link.setAttribute("href", this_href);
            font_link.setAttribute("rel", "stylesheet");
            appendageList.push(font_link);
        }
        (0, appendToDocument_1.appendToDocument)("head", appendageList, logger);
    }
    catch (err) {
        logger.debugError(err, "Failed to add css");
    }
}


/***/ }),

/***/ 259:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageInspector = void 0;
const AddingButtonAnimation_1 = __webpack_require__(2502);
const ProductTracker_1 = __webpack_require__(2353);
const detectLocationChange_1 = __webpack_require__(6449);
const inspectPage_1 = __webpack_require__(7078);
const MouseOverManager_1 = __webpack_require__(4219);
const ProductPlacementTracker_1 = __webpack_require__(6752);
const TestingDiv_1 = __webpack_require__(5419);
const MainClickButton_1 = __webpack_require__(4656);
const PageScriptRunner_1 = __webpack_require__(3023);
const tearDown_1 = __webpack_require__(7185);
const OverlayManager_1 = __webpack_require__(2618);
const OpinionTracker_1 = __webpack_require__(5651);
const DropDownInterface_1 = __webpack_require__(5402);
const ProductCollectionMembershipManager_1 = __webpack_require__(8431);
const CollectionListManager_1 = __webpack_require__(8170);
class PageInspector {
    constructor(siteUID, contentScript, logger) {
        this.ready = false;
        // Perhaps ideally have a SiteSettings object tied to the siteUID that can be called to be updated and then these effects follow in a listener...
        this.setSiteSettings = (siteSettings) => {
            // run the appropriate updates:
            // Update the collection list when ready:
            this.collectionListManager.updateCollectionList(siteSettings.userUID);
            // update the messages (siteSettings.settings may not be defined e.g. if not covered)
            // Only place we store these at the moment,
            this.overlayManager.updateSiteSettings(siteSettings);
            // Update the add buttons with the latest site settings data:
            this.mainButton.onSiteSettingsUpdate(siteSettings);
            this.mouseOverManager.mouseOverLayer.onSiteSettingsUpdate(siteSettings);
            this.mouseOverManager.mouseOverLayerPostSaving.onSiteSettingsUpdate(siteSettings);
        };
        // Used as a callback in ProductTracker as that is the source of truth of our products.
        this.onProductsUpdate = async (mainProduct, tileProducts) => {
            this.logger.debugLog("%cUpdate UI With Products:", "background-color:#DEB18A;font-weight:bold;");
            await this.opinionTracker.trackOpinions([
                ...(mainProduct ? [mainProduct.pageURL] : []),
                ...tileProducts.map((x) => x.pageURL),
            ]);
            // We are not storing them as we can get them from productTracker
            // updates the page type for the message display among other things:
            // Maybe no longer relevant: on the product overlays we don't ensure the product is still valid, since it is simply representing a product that we input into it when it opens.
            this.overlayManager.updateProductsInPage(mainProduct, tileProducts);
            // Annotate any that require annotating (tiles only, track + manipulate placements):
            this.placementTracker.updateTilePlacements(tileProducts);
            this.mouseOverManager.addMouseOverToList(tileProducts);
            this.mainButton.render();
            // Remove mouseovers, remove mutation observers
            (0, tearDown_1.tearDown)(this);
        };
        this.onLastCollectionUpdate = (_collection) => {
            this.mainButton.render();
            this.mouseOverManager.mouseOverLayer.render();
        };
        this.onCollectionListUpdate = () => {
            this.productCollectionMembershipManager.updateViews();
        };
        this.onCollectionDisplayListUpdate = () => {
            this.overlayManager.onCollectionDisplayListUpdate();
        };
        this.onUpdateOpinion = (url, collectionUID, value, resetDisplayLists) => {
            // rerender any buttons that need updating:
            const mainProduct = this.productTracker.getMainProduct();
            if (mainProduct !== undefined && mainProduct.pageURL === url) {
                this.mainButton.startFlash();
            }
            // Just in case product has been "lost" and recalculated:
            this.productCollectionMembershipManager.onProductCollectionMembershipUpdate(url, collectionUID, value, resetDisplayLists);
            // update the tile placement:
            this.placementTracker.updateTilePlacements(this.productTracker.getProductsByPageURL(url));
            this.mouseOverManager.mouseOverLayer.render();
            this.mouseOverManager.mouseOverLayerPostSaving.render();
        };
        this.contentScript = contentScript;
        this.logger = logger;
        this.siteUID = siteUID;
        // Data structures:
        // The order is of course important!
        this.currentLocation = window.location.href;
        this.opinionTracker = new OpinionTracker_1.OpinionTracker(this.logger, this.onUpdateOpinion);
        this.collectionListManager = new CollectionListManager_1.CollectionListManager(undefined, logger, this.onLastCollectionUpdate, this.onCollectionListUpdate);
        this.productCollectionMembershipManager =
            new ProductCollectionMembershipManager_1.ProductCollectionMembershipManager(this.logger, this.collectionListManager, this.opinionTracker, this.onCollectionDisplayListUpdate);
        this.productTracker = new ProductTracker_1.ProductTracker(siteUID, this.onProductsUpdate, this.logger);
        // UI:
        this.mouseOverManager = new MouseOverManager_1.MouseOverManager(this);
        this.placementTracker = new ProductPlacementTracker_1.ProductPlacementTracker(this.productTracker, this.logger, this.opinionTracker);
        this.mainButton = new MainClickButton_1.MainClickButton(this);
        this.testingDiv = new TestingDiv_1.TestingDiv();
        this.dummySavingDots = new AddingButtonAnimation_1.AddingButtonAnimation("0", "0", this.logger, false);
        // Let's do this after the above have been set up(!)
        this.overlayManager = new OverlayManager_1.OverlayManager(siteUID, this);
        // Add ability to receive drop down function messages:
        this.dropDownInterface = new DropDownInterface_1.DropDownInterface(this.overlayManager);
        // TODO:
        if (this.contentScript.doOpenMenu === true) {
            this.overlayManager.setTopRightMenuView("loading", true);
        }
        this.scriptRunner = new PageScriptRunner_1.PageScriptRunner(() => (0, inspectPage_1.inspectPage)(this), logger);
        this.ready = true;
        this.logger.debugLog(`%c      MOONSIFT Chrome Extension\
      %c\nLoaded with logging turned on  www.moonsift.com\
      %c\nVersion: ${"4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085"} - Built at: ${"Tue Sep 23 2025 10:48:23 GMT+0000 (Coordinated Universal Time)"} - Remote Project: ${"https://www.moonsift.com"}`, "font-family:Arial;font-size:24px;\
      background-image:url('chrome-extension://hgbbfkafecdbocpcdkoahfkbkoodcaon/images/logo.svg');\
      background-size:contain;background-position:0% 50%;background-repeat:no-repeat;\
      background-color:#FEDF91;color:black;", "font-size:12px;font-family:Arial;background-color:lightgreen", "font-size:12px;font-family:Arial;background-color:#DDDDDD");
        // and  detect location change:
        (0, detectLocationChange_1.detectLocationChange)(this);
    }
}
exports.PageInspector = PageInspector;


/***/ }),

/***/ 3023:
/***/ ((__unused_webpack_module, exports) => {


/*
NON-STATIC OBJECT

Here we define the triggers for the page inspection / image manipulations etc.:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageScriptRunner = void 0;
class PageScriptRunner {
    constructor(functionToRun, logger) {
        this.loaded = false;
        this.runFunction = async () => {
            // wipe any other timers:
            this.lastStartTime = new Date().getTime();
            this.updateInProgress = true;
            try {
                await this.functionToRun();
                this.runCount += 1;
                if (this.runCount % 256 == 0) {
                    this.logger.debugLog(new Error("PageScriptRunner run alot"), "PageScriptRunner run " + this.runCount + " times! non-critical");
                }
            }
            catch (err) {
                this.logger.debugError(err, "PageScriptRunner function failed - critical!");
            }
            this.updateInProgress = false;
        };
        // For forcing an update to run as soon as possible:
        // 1. after page has loaded.
        // 2. OR on address change.
        // 3. OR forced by the background page due to update.
        // NOTE that async is a es8 function but this is OK as this runs in the extension
        // and we don't need to support ancient browsers.
        // TODO: Atomise using variable updateInProgress!
        this.forceScriptToRun = async () => {
            try {
                this.timeoutForceRun = null;
                this.timeoutHandle = null;
                this.timeoutShortHandle = null;
                // wait for the function to become availble:
                // and make sure not running straight away!
                if (this.updateInProgress === false &&
                    new Date().getTime() - this.creationTime > 500) {
                    this.runFunction();
                }
                else {
                    // update is in progress so can't start, so let's check again in a short bit (unless we are already due to do so!):
                    if (!this.timeoutForceRun) {
                        this.timeoutForceRun = window.setTimeout(this.forceScriptToRun, 150);
                    }
                }
            }
            catch (err) {
                this.logger.debugError(err, "PageScriptRunner unable to force script to run - critical!");
            }
        };
        // For updaing after image has loaded, limit to max 1 per second, but also wait 50ms for a bunch of loads before going if been a while...!
        this.updateTimer = () => {
            try {
                const runThreshold = this.loaded === true ? 925 : 1925;
                const timeSinceLast = this.lastStartTime !== undefined
                    ? new Date().getTime() - this.lastStartTime
                    : 100000;
                if (timeSinceLast >= runThreshold) {
                    if (!this.timeoutShortHandle) {
                        this.timeoutShortHandle = window.setTimeout(this.forceScriptToRun, 50);
                    }
                }
                else {
                    if (!this.timeoutHandle) {
                        this.timeoutHandle = window.setTimeout(this.forceScriptToRun, runThreshold + 75 - timeSinceLast);
                    }
                }
            }
            catch (err) {
                this.logger.debugError(err, "PageScriptRunner unable to schedule script to run - critical!");
            }
        };
        this.setPageLoaded = () => {
            this.loaded = true;
            this.forceScriptToRun();
        };
        this.logger = logger;
        // The timers (timeout objects) for waiting for multiple images to load prior to running the page inspection!
        this.timeoutForceRun = null;
        this.timeoutHandle = null;
        this.timeoutShortHandle = null;
        // flag for if the page inspection for new products is running or not - only want to run one at once.
        this.updateInProgress = false;
        // ASYNC function to call:
        this.functionToRun = functionToRun;
        this.creationTime = new Date().getTime();
        this.runCount = 0;
        // And force update on load:
        window.addEventListener("load", () => {
            this.setPageLoaded();
        }, false);
        // we might have got here AFTER loading, so:
        if (document.readyState === "complete") {
            this.setPageLoaded();
        }
    }
}
exports.PageScriptRunner = PageScriptRunner;


/***/ }),

/***/ 6449:
/***/ ((__unused_webpack_module, exports) => {


/*
SINGLE FUNCTION

Detect when window location changes as this often indicates a change in the displayed product if several colours etc.

Detect a change to window location rather than page_url so that popups match what is shown if url changes slightly to indicate a different product.

Potential risk: a site that changes the url a lot will cause page inspections to keep running.  We can just avoid these sites.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.detectLocationChange = detectLocationChange;
function detectLocationChange(pageInspector) {
    try {
        // And add a method to detect location changes (we have to make our own "listener"):
        pageInspector.currentLocation = window.location.href;
        window.setInterval(() => {
            try {
                if (window.location.href !== pageInspector.currentLocation) {
                    // See if page_url has changed!:
                    pageInspector.logger.debugLog("%c Moonsift: Window location change detected, re-running our good ol' script shortly", "background-color:#FEDF91;");
                    // Delay added to allow sites to update DOM:
                    setTimeout(() => pageInspector.scriptRunner.forceScriptToRun(), 500);
                }
            }
            catch (err) {
                pageInspector.logger.debugError(err, "Checking for location change failed, non-critical");
            }
            pageInspector.currentLocation = window.location.href;
        }, 1000);
    }
    catch (err) {
        pageInspector.logger.debugError(err, "Adding location change detection failed, non-critical");
    }
}


/***/ }),

/***/ 3378:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

Sends harlinator reports of PARTIAL products found direct into the background page so they can be redirected to the extension...:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.partialSerializeProduct = void 0;
exports.harlinatorPartialReporting = harlinatorPartialReporting;
const sendBGMessageOneWay_1 = __webpack_require__(2106);
const serializeImage_1 = __webpack_require__(3147);
const partialSerializeProduct = (product) => {
    var _a;
    if (!product)
        return undefined;
    const serialisedData = {
        description_list: product.descriptionList,
        link_list: product.linkList,
        image_list: [
            ...product.metaImageList.map((x) => (0, serializeImage_1.serializeImage)(x)),
            ...product.imageList.map((x) => (0, serializeImage_1.serializeImage)(x)),
        ],
        price_list: product.priceList.map((x) => {
            return {
                value: x[1],
            };
        }),
        best_description: product.bestDescription,
        best_link: product.bestLink,
        best_price: (_a = product.bestPrice) === null || _a === void 0 ? void 0 : _a[1],
        best_image: product.bestImage
            ? (0, serializeImage_1.serializeImage)(product.bestImage)
            : undefined,
    };
    return serialisedData;
};
exports.partialSerializeProduct = partialSerializeProduct;
function harlinatorPartialReporting(siteSettings, validProductList, productsMissingFields, testCode, productType, containerTypeIndex, logger) {
    if (testCode === undefined ||
        productType === undefined ||
        containerTypeIndex === undefined) {
        return;
    }
    (0, sendBGMessageOneWay_1.sendBGMessageOneWay)(
    //"ilhndggcllngnhpjnofeengombmdfhlo",
    {
        type: "harlinator",
        action: "report_partial_products",
        failed_products: productsMissingFields.map((x) => [
            x[0],
            (0, exports.partialSerializeProduct)(x[1]),
        ]),
        valid_products: validProductList.map((x) => (0, exports.partialSerializeProduct)(x)),
        test_id: testCode,
        url: window.location.href,
        product_type: productType,
        container_index: containerTypeIndex,
        segmentation_settings: siteSettings,
    });
}


/***/ }),

/***/ 8489:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

Sends harlinator reports of products found direct into the background page so they can be redirected to the extension...:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.harlinatorReporting = harlinatorReporting;
const serializeProductList_1 = __webpack_require__(5981);
const sendBGMessageOneWay_1 = __webpack_require__(2106);
function harlinatorReporting(siteSettings, productList, logger) {
    var _a, _b;
    const testID = (_a = siteSettings.settings) === null || _a === void 0 ? void 0 : _a.test_date_code;
    const testColours = (_b = siteSettings.settings) === null || _b === void 0 ? void 0 : _b.test_colours;
    if (logger.debugMode && siteSettings.settings && testID && testColours) {
        (0, sendBGMessageOneWay_1.sendBGMessageOneWay)(
        //"ilhndggcllngnhpjnofeengombmdfhlo",
        {
            type: "harlinator",
            action: "report_products",
            data: (0, serializeProductList_1.serializeProductList)(productList, logger),
            test_id: testID,
            test_colours: testColours,
            url: window.location.href,
            title: document.title,
        });
    }
}


/***/ }),

/***/ 7078:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
SINGLE FUNCTION

Page inspection (This function actually runs the page inspection, triggered by triggers below:)

Errors should be caught within their subsidiary functions!

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inspectPage = inspectPage;
const sendScrapeToBackend_1 = __webpack_require__(204);
const runBGScrape_1 = __webpack_require__(9428);
const harlinatorReporting_1 = __webpack_require__(8489);
const getSiteSettings_1 = __webpack_require__(3388);
async function inspectPage(pageInspector) {
    var _a;
    const logger = pageInspector.logger;
    const isDropDownOpen = pageInspector.contentScript.doOpenMenu;
    // this also reports the current site:
    const siteSettings = await (0, getSiteSettings_1.getSiteSettings)(pageInspector.siteUID, pageInspector.logger, isDropDownOpen ? 4000 : 10000);
    if (siteSettings.runHere === true) {
        logger.debugLog("%cMoonsift page inspection started                		                                                                                ", "font-size:16px;font-family:Arial;background-color:#FEDF91");
        // If the user has changed then we should wipe the info:
        // ensure that we close things if we become not signed in:
        pageInspector.opinionTracker.setUserUID(siteSettings.userUID);
        // PRODUCT SEGMENTATION:
        logger.debugLog("%cProduct Segmentation", "background-color:skyblue;font-weight:bold;");
        await pageInspector.productTracker.updateAllProducts(siteSettings);
        const allProducts = pageInspector.productTracker.getAllProducts();
        // BACKEND COMMUNICATION:
        logger.debugLog("%cBackend Communication", "background-color:#DEB18A;font-weight:bold;");
        // send all details of what we have identified to the App.js:
        // Actually report the data of the scrape of any that have not been scraped yet:
        // If signed in only!
        if (siteSettings.userUID !== undefined) {
            (0, sendScrapeToBackend_1.sendScrapeToBackend)(allProducts, logger);
        }
        // HARLINATOR:
        if (((_a = siteSettings.settings) === null || _a === void 0 ? void 0 : _a.from_harlinator) === true) {
            (0, harlinatorReporting_1.harlinatorReporting)(siteSettings, allProducts, logger);
            pageInspector.testingDiv.displayTestingDiv(siteSettings, logger);
        }
        logger.debugLog("%cMoonsift page inspection finished", "font-size:16px;font-family:Arial;background-color:#FEDF91");
    }
    // Regardless of if we get product data or not, run the following:
    logger.debugLog("%csiteSettings", "background-color:#FEDF91", siteSettings);
    // UIs:
    pageInspector.setSiteSettings(siteSettings);
    // update the message display  (siteSettings.signed_in, siteSettings.user_owner may not be defined):
    // check for the menu beign opened or not...:
    // Need to do this here as no promise returned from pagescriptrunner as to when it is finished...
    if (pageInspector.contentScript.doOpenMenu === true) {
        pageInspector.contentScript.doOpenMenu = false;
        // If main product is NOT present then it can be guessed, otherwise use it as the one to show:
        pageInspector.overlayManager.openManualAdd(pageInspector.productTracker.getMainProduct());
    }
    // Catch the case that we can't reach Moonsift when the dropdown is opened:
    if (siteSettings.caughtError && isDropDownOpen) {
        pageInspector.overlayManager.setTopRightMenuView("cannot_reach_moonsift", true);
    }
    // If this is the background scraping task:
    if (siteSettings.bgscrapeUID && !pageInspector.bgScrapeTimer) {
        pageInspector.bgScrapeTimer = setTimeout(() => (0, runBGScrape_1.runBGScrape)(siteSettings, logger), 6000);
    }
}


/***/ }),

/***/ 7823:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
SINGLE FUNCTION

This function will reinspect an individual container to ensure that we have the latest info:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reinspectContainer = reinspectContainer;
const sendScrapeToBackend_1 = __webpack_require__(204);
const ContainerToProduct_1 = __webpack_require__(3889);
async function reinspectContainer(oldProduct, pageInspector, logger) {
    try {
        const { fullProducts: newProductsList } = ContainerToProduct_1.ContainerToProduct.productsFromContainers([oldProduct.productContainer], oldProduct.productSetting, logger);
        if (newProductsList.length === 1) {
            newProductsList[0].mainProduct = oldProduct.mainProduct;
            const newProduct = await pageInspector.productTracker.updateIndividualProduct(oldProduct, newProductsList[0]);
            if (newProduct !== false) {
                // returning earlier the product data and have a promise finish off the rest...:
                // Do this ASYNC...
                new Promise(async () => {
                    try {
                        await pageInspector.opinionTracker.trackOpinions([
                            newProduct.pageURL,
                        ]);
                        // TODO!  Any other updates required??
                        // will all trigger re-renders: This should happen anyway though...
                        pageInspector.mainButton.updateState({});
                        pageInspector.mouseOverManager.mouseOverLayer.updateState({});
                        pageInspector.mouseOverManager.mouseOverLayerPostSaving.updateState({});
                        // BACKEND COMMUNICATION:
                        (0, sendScrapeToBackend_1.sendScrapeToBackend)([newProduct], pageInspector.logger);
                    }
                    catch (err) {
                        pageInspector.logger.debugError(err, "Failed to finish updating additional product data - non-critical", oldProduct);
                    }
                });
                return newProduct;
            }
        }
        return undefined;
    }
    catch (err) {
        pageInspector.logger.debugError(err, "Failed to update product data fully - non-critical", oldProduct);
    }
    return undefined;
}


/***/ }),

/***/ 204:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendScrapeToBackend = sendScrapeToBackend;
/*
SINGLE FUNCTION

Actually send a scrape to the back-end (do the serialisation etc.):

We don't care if it worked or not, so one way only.

*/
const serializeProductList_1 = __webpack_require__(5981);
const sendBGMessageOneWay_1 = __webpack_require__(2106);
function sendScrapeToBackend(productList, logger) {
    if (productList.length > 0) {
        (0, sendBGMessageOneWay_1.sendBGMessageOneWay)(
        //"ilhndggcllngnhpjnofeengombmdfhlo",
        {
            type: "api",
            protocol: "send_to",
            action: "scrape",
            data: (0, serializeProductList_1.serializeProductList)(productList, logger),
            url: window.location.href.slice(0, 500),
            title: document.title.slice(0, 500),
        });
    }
}


/***/ }),

/***/ 7185:
/***/ ((__unused_webpack_module, exports) => {


/*
SINGLE FUNCTION

this function will tear down either old products or the entire list if needed.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tearDown = tearDown;
function tearDown(pageInspector) {
    try {
        // remove the mouseover listeners
        pageInspector.mouseOverManager.removeMouseOvers();
        // For all the images that we had and it's associated sources:
        // NOTE: not removing source info for images we still have even though sources may be gone!
        // remove the mutation observers
        //ObserveMutations.garbageCollect();
        // unreplace the images and remove the source tracking
        //ms_globals.ms_image_source_track.garbageCollect();
    }
    catch (err) {
        pageInspector.logger.debugError(err, "Tear down failed to complete, non-critical.");
    }
}


/***/ }),

/***/ 1358:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
NON-STATIC CLASS

Here is the listener to messages from the background scirpt:

This is here just to reduce the size of ContentScript.ts

Potentially most of these listeners could go into the relevant components, e.g. update_collection_list could just be productCollectionMembership.

TODO: split the user status from siteSettings as it has its own listener...

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addMessageReceiver = addMessageReceiver;
const MetaSearch_1 = __webpack_require__(2249);
const runQueryTests_1 = __webpack_require__(9550);
const harlinatorListener_1 = __webpack_require__(4065);
const getHTML_1 = __webpack_require__(4263);
function addMessageReceiver(contentScript) {
    // for removing the http OR https for image tracking:
    // private static removeHTTPFromURL(url: string) {
    //   return url.replace(/^https?:\/\//i, "");
    // }
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        var _a;
        try {
            // only listen to messages from this extension:
            if (sender.id === chrome.runtime.id) {
                if (contentScript.notRunning !== true &&
                    request.action === "image_loaded") {
                    // an image has been loaded by the webpage:
                    // let's have a wee look see at the size:
                    contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "image_loaded", request);
                    // update timer for restarting the inspection function
                    (_a = contentScript.pageInspector) === null || _a === void 0 ? void 0 : _a.scriptRunner.updateTimer();
                    // check image might need converting to an svg:
                    // only run this trigger once as we will save a list of all the images that have been loaded in this session:
                    //if (msGlobal.ms_loaded_image_urls[Helpers.removeHTTPFromURL(request.image_url)]===undefined){
                    // Set loaded:
                    //ManipulateImages.force_update_all_image_url(request.image_url);
                    //}
                    //record the image as present in any case:
                    //msGlobal.ms_loaded_image_urls[Helpers.removeHTTPFromURL(request.image_url)]=true;
                    return;
                }
                if (contentScript.pageInspector) {
                    switch (request.action) {
                        case "schedule_update":
                            contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "schedule_update", request);
                            // an event addListener to update due to external event e.g. sign in / out / page load etc.
                            contentScript.pageInspector.scriptRunner.forceScriptToRun();
                            return;
                        case "update_product_data":
                            // an event to update when product opinions are set:
                            contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "update_product_data", request);
                            request.data.forEach((update) => {
                                var _a;
                                return (_a = contentScript.pageInspector) === null || _a === void 0 ? void 0 : _a.opinionTracker.updateOpinion(update.page_url, update.collection_uid, update.value, update.uid, request.update_display_list === true);
                            });
                            return;
                        case "user_owner_update":
                            contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "user_owner_update", request);
                            // an event to update when the user_owner data changes:
                            // assume is signed in, hence first arg is true:
                            contentScript.pageInspector.overlayManager.updateUserData(request.data.user_uid !== undefined, request.data.user_uid, request.data.snapshot, request.data.verified_settings);
                            return;
                        case "update_collection_list":
                            contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "update_collection_list", request);
                            // collection list has changed, send update to the collection manager:
                            contentScript.pageInspector.collectionListManager.setCollectionList(request.data.list, request.data.dict);
                            return;
                        case "get_meta_json":
                            contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "get_meta_json", request);
                            MetaSearch_1.MetaSearch.getMetaDataHarlinator(contentScript.logger);
                            return;
                        case "harlinator_queries":
                            contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "harlinator_queries", request);
                            (0, runQueryTests_1.runQueryTests)(request.queries, request.container_queries, sendResponse);
                            return true;
                    }
                }
                if (request.action === "toolbar_click") {
                    contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "toolbar_click", request);
                    contentScript.toolbarClick();
                    return;
                }
                if (request.action === "auth-login-get-token") {
                    window.postMessage("moonsift_chrome_extension_get_token");
                    return;
                }
                if (request.action === "harlinator") {
                    contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "harlinator", request);
                    (0, harlinatorListener_1.harlinatorListener)(request);
                    return;
                }
                if (request.action === "harlinator_get_html") {
                    contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "harlinator_get_html", request);
                    (0, getHTML_1.getHTML)(sendResponse);
                    return true;
                }
            }
            // ONLY FOR DEVELOPMENT hot reloading:
            // Must be outside sender check as sender disappears!
            if (request.action === "reload_page") {
                contentScript.logger.debugLog("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "reload_page", request);
                if (document.hidden === false) {
                    // is current tab.
                    window.location.reload();
                }
                return;
            }
            if (request.action === "debug") {
                console.log("%c> REQUEST RECEIVED:", "background-color:#DEB18A", "DEBUG", request);
                return;
            }
        }
        catch (err) {
            contentScript.logger.debugError(err, "Processing the request", request, "failed, potentially critical");
        }
    });
}


/***/ }),

/***/ 2106:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
SINGLE FUNCTION

Send data to background page without response.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendBGMessageOneWay = sendBGMessageOneWay;
const catchInvalidContext_1 = __webpack_require__(3267);
// Make send message into a promise so that we can await the response!:
function sendBGMessageOneWay(message) {
    //"ilhndggcllngnhpjnofeengombmdfhlo",
    (0, catchInvalidContext_1.catchInvalidContext)(() => chrome.runtime.sendMessage(message));
}


/***/ }),

/***/ 5104:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
SINGLE FUNCTION

Send data to the background script as a promise....

CALLING THIS FUNCTION will catch problems here, but may return "bgSuccess:false"

TODO: maybe turn bgSuccess:false into a rejected promise!

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendBGMessagePromise = sendBGMessagePromise;
const catchInvalidContext_1 = __webpack_require__(3267);
// Make send message into a promise so that we can await the response!:
// Time out default 12000ms...
function sendBGMessagePromise(message, logger, timeoutInMs = 12000) {
    return new Promise((resolve) => {
        let hasReturned = false;
        // Catch timeout:
        window.setTimeout(function () {
            if (hasReturned === false) {
                resolve({
                    bgSuccess: false,
                });
                // DO NOT REPORT THIS ERROR?, we don't need to know about it.
                logger.debugLog("MoonMessage: sendBGMessagePromise timed out", timeoutInMs, message);
            }
        }, timeoutInMs);
        // Send message:
        (0, catchInvalidContext_1.catchInvalidContext)(() => chrome.runtime
            .sendMessage(
        //"ilhndggcllngnhpjnofeengombmdfhlo",
        message // Message
        )
            .catch((error) => {
            // Report error
            logger.debugError(error, "Message:", "Background script not contactable!", "critical");
            resolve({
                bgSuccess: false,
            });
        })
            .then((response) => {
            // Return function
            hasReturned = true;
            if (!response) {
                logger.debugError(new Error("No response object recieved"), "Message:", message, "critical");
                resolve({
                    bgSuccess: false,
                });
                return;
            }
            if (response.success === true) {
                // report is done to resolver!
                resolve({ bgSuccess: true, message: response });
                return;
            }
            // Log problem, though error should be recorded in the bg script!
            // uncharacteristic potentially witty message if there is a problem:
            logger.debugError(new Error("Background woodster script did not execute correctly!"), "Message:", JSON.stringify(message), "\nResponse:", JSON.stringify(response), "critical");
            resolve({
                bgSuccess: false,
            });
        })
            .catch((error) => {
            // Report error
            logger.debugError(error, "Message:", "Background script processing failed!", "critical");
            resolve({
                bgSuccess: false,
            });
        }));
    });
}


/***/ }),

/***/ 4065:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.harlinatorListener = harlinatorListener;
/*

Sends harlinator requests FROM the extension into the webpage displaying the harlinator.

This is done here as can't seem to get the extension to communicate with page scripts that are not in the extension's content script.

*/
function harlinatorListener(request) {
    window.postMessage(request.message);
}


/***/ }),

/***/ 3889:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE

To be run on a product container to update the ol' data:
"Opinion" - just indicates if we need to add the "saved" image or not....

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContainerToProduct = void 0;
const harlinatorPartialReporting_1 = __webpack_require__(3378);
const getParentElementAtLevel_1 = __webpack_require__(8511);
const DescriptionSearch_1 = __webpack_require__(7448);
const ImageSearch_1 = __webpack_require__(9655);
const LinkSearch_1 = __webpack_require__(8408);
const MetaSearch_1 = __webpack_require__(2249);
const PriceSearch_1 = __webpack_require__(4903);
const recursiveElementSearch_1 = __webpack_require__(3552);
const recursiveNodeSearch_1 = __webpack_require__(8674);
const ProductContainerSearch_1 = __webpack_require__(5554);
const META_TYPES = [
    {
        key: "meta_json",
        method: MetaSearch_1.MetaSearch.getJSONMeta,
    },
    {
        key: "meta_tag",
        method: MetaSearch_1.MetaSearch.getTagMeta,
    },
];
const REQUIRED_FIELDS = [
    "bestLink",
    "bestDescription",
    "bestPrice",
    "bestImage",
    "productContainer",
    "productSetting",
];
class ContainerToProduct {
    static removeDuplicates(list) {
        return [...new Set(list)];
    }
    static generateUID() {
        return Math.random().toString() + "_" + performance.now();
    }
    // check_element_container for getting elements that are of a certain type...
    static getSubContainers(container, elementSettings, logger) {
        const containersObject = elementSettings.containers;
        if (typeof containersObject === "object") {
            return ProductContainerSearch_1.ProductContainerSearch.getProductContainers(containersObject, container, logger);
        }
        else {
            return [container];
        }
    }
    static getExclusions(container, elementSettings, logger) {
        const exclusionsObject = elementSettings.exclusions;
        if (typeof exclusionsObject !== "object") {
            return [];
        }
        return ProductContainerSearch_1.ProductContainerSearch.getProductContainers(exclusionsObject.containers, container, logger);
    }
    static getProductBodyData(container, settings, logger) {
        // IMAGES:
        const imageListBuilding = [];
        // if we need to get one or more sub-containers first do it:
        if (typeof settings.images === "object") {
            // Get any subcontainers:
            const imageSubContainers = this.getSubContainers(container, settings.images, logger);
            const imageExclusions = this.getExclusions(container, settings.images, logger);
            // now do the post-processing:
            switch (settings.images.method) {
                case "classic": // Classical:
                    imageSubContainers.forEach((element) => (0, recursiveElementSearch_1.recursiveElementSearch)(element, ImageSearch_1.ImageSearch.checkIfImage, imageExclusions, imageListBuilding, [
                        settings.images.ignore_size,
                        settings.images.min_height,
                        settings.images.min_width,
                    ]));
                    break;
                default:
            }
        }
        // check we only have one of each:
        const bestImage = ImageSearch_1.ImageSearch.getBestImage(imageListBuilding, settings.images.slice_position);
        const imageList = this.removeDuplicates(imageListBuilding).sort((a, b) => a.ms_ps_area > b.ms_ps_area ? -1 : 1);
        // MOUSEOVERS:
        // Note: IN general might just be better to use the link anchor element as mouseover detection..... hmmmmmm.  Though positioning might be weird...
        // Note: need image list first:
        // get mouseover containers if required:
        let mouseOverList = [];
        // if we need to get one or more sub-containers first do it:
        if (typeof settings.mouseover === "object") {
            // now do the post-processing:
            switch (settings.mouseover.method) {
                case "containers":
                    // Get any subcontainers:
                    const mouseOverSubContainers = this.getSubContainers(container, settings.mouseover, logger);
                    const mouseOverExclusions = this.getExclusions(container, settings.mouseover, logger);
                    mouseOverList = mouseOverSubContainers.filter((element) => !mouseOverExclusions.includes(element));
                    break;
                case "image-parents":
                    // TODO: Consider turinging this into a list like the rest of it...
                    const parentLevel = settings.mouseover.parent_level;
                    if (parentLevel) {
                        imageListBuilding.forEach((element) => {
                            element.ms_mouse_over_parent = (0, getParentElementAtLevel_1.getParentElementAtLevel)(element, parentLevel);
                        });
                    }
                    break;
                case "top-container":
                    mouseOverList = [container];
                    break;
                default:
            }
            mouseOverList = this.removeDuplicates(mouseOverList);
        }
        // PLACEMENT:
        // if we need to get one or more sub-containers first do it:
        // TODO: Remove this as we can access this anyway...
        let positionerContainer = undefined;
        if (typeof settings.placement === "object") {
            switch (settings.placement.method) {
                case "image-parents":
                    if (settings.placement.parent_level) {
                        positionerContainer = {
                            parentLevel: settings.placement.parent_level,
                        };
                    }
                    break;
                case "top-container":
                    positionerContainer = container;
                    break;
                default:
            }
        }
        // PRICES:
        let priceList = [];
        let bestPrice = undefined;
        // if we need to get one or more sub-containers first do it:
        if (typeof settings.price === "object") {
            // Get any subcontainers:
            const priceSubContainers = this.getSubContainers(container, settings.price, logger);
            const priceExclusions = this.getExclusions(container, settings.price, logger);
            const priceListBuilding = [];
            // now do the post-processing:
            switch (settings.price.method) {
                case "classic": // Classical:
                case "classic-with-fallback": // Classical + text-with-price if needed:
                    priceSubContainers.forEach((element) => (0, recursiveNodeSearch_1.recursiveNodeSearch)(element, PriceSearch_1.PriceSearch.checkIfPrice, priceExclusions, priceListBuilding, [priceExclusions]));
                    break;
                case "text-with-price":
                    priceSubContainers.forEach((element) => PriceSearch_1.PriceSearch.textWithPriceSearch(element, priceListBuilding, priceExclusions));
                    break;
                case "container-attribute":
                    priceSubContainers.forEach((element) => PriceSearch_1.PriceSearch.containerAttribute([element], priceListBuilding, settings.price.attribute_ids));
                    break;
                case "container-attribute-combined":
                    PriceSearch_1.PriceSearch.containerAttribute(priceSubContainers, priceListBuilding, settings.price.attribute_ids);
                    break;
                case "simple-regex":
                    priceSubContainers.forEach((element) => (0, recursiveNodeSearch_1.recursiveNodeSearch)(element, PriceSearch_1.PriceSearch.checkIfPriceRegex, priceExclusions, priceListBuilding, [priceExclusions]));
                    break;
                // TRY and avoid using this - currency needs to be input:
                case "all-text":
                    priceSubContainers.forEach((element) => {
                        PriceSearch_1.PriceSearch.allText([element], priceExclusions, settings.price, priceListBuilding);
                    });
                    break;
                case "all-text-combined":
                    PriceSearch_1.PriceSearch.allText(priceSubContainers, priceExclusions, settings.price, priceListBuilding);
                    break;
                default:
            }
            bestPrice = PriceSearch_1.PriceSearch.getBestPrice(priceListBuilding, logger);
            priceList = PriceSearch_1.PriceSearch.getUniquePriceList(priceListBuilding);
            // fallback method in case the prices are a range not individual:
            if (bestPrice === undefined &&
                settings.price.method === "classic-with-fallback") {
                const priceListBuildingRerun = [];
                priceSubContainers.forEach((element) => PriceSearch_1.PriceSearch.textWithPriceSearch(element, priceListBuildingRerun, priceExclusions));
                bestPrice = PriceSearch_1.PriceSearch.getBestPrice(priceListBuildingRerun, logger);
                priceList = PriceSearch_1.PriceSearch.getUniquePriceList(priceListBuildingRerun);
            }
        }
        // DESCRIPTION (TEXT):
        // Note: need image list first:
        let descriptionListBuilding = [];
        // if we need to get one or more sub-containers first do it:
        if (typeof settings.description === "object") {
            // Get any subcontainers:
            const descriptionSubContainers = this.getSubContainers(container, settings.description, logger);
            const descriptionExclusions = this.getExclusions(container, settings.description, logger);
            switch (settings.description.method) {
                case "classic":
                    // Classical, combines image-alt and all-text to try and get best description (the longest):
                    descriptionSubContainers.forEach((element) => (descriptionListBuilding = descriptionListBuilding.concat(DescriptionSearch_1.DescriptionSearch.classicDescriptionSearch(element, imageListBuilding, descriptionExclusions, settings.description.clean_text))));
                    break;
                case "all-text":
                    descriptionSubContainers.forEach((element) => (descriptionListBuilding = descriptionListBuilding.concat(DescriptionSearch_1.DescriptionSearch.getAllTextForElement(element, descriptionExclusions, settings.description.clean_text))));
                    break;
                case "all-text-combined":
                    descriptionListBuilding.push(DescriptionSearch_1.DescriptionSearch.getAllTextForElementsCombined(descriptionSubContainers, descriptionExclusions, settings.description.clean_text));
                    break;
                case "page-title": // Pre List:
                    descriptionListBuilding.push(document.title);
                    break;
                case "image-alt":
                    descriptionListBuilding.push(DescriptionSearch_1.DescriptionSearch.getProductImageAlt(imageListBuilding, settings.description.clean_text));
                    break;
                case "container-attribute":
                    descriptionSubContainers.forEach((element) => (descriptionListBuilding = descriptionListBuilding.concat(DescriptionSearch_1.DescriptionSearch.getTextFromAttribute(element, settings.description.attribute_ids))));
                    break;
                default:
            }
        }
        // output:
        const descriptionList = descriptionListBuilding
            .map((x) => x.slice(0, 300))
            .slice(0, 10);
        const bestDescription = descriptionListBuilding
            .join(" ")
            .trim()
            .slice(0, 300);
        // LINKS:
        // Note: need image list first:
        let linkListBuilding = [];
        // if we need to get one or more sub-containers first do it:
        if (typeof settings.link === "object") {
            // Get any subcontainers:
            const linkSubContainers = this.getSubContainers(container, settings.link, logger);
            const linkExclusions = this.getExclusions(container, settings.link, logger);
            switch (settings.link.method) {
                case "images":
                    LinkSearch_1.LinkSearch.searchLinksImages(imageListBuilding, linkListBuilding);
                    break;
                case "containers-and-above":
                    linkSubContainers.forEach((element) => LinkSearch_1.LinkSearch.getLinksFromNodeAndAbove(element, linkListBuilding));
                    break;
                case "containers-and-below":
                    linkSubContainers.forEach((element) => (0, recursiveElementSearch_1.recursiveElementSearch)(element, LinkSearch_1.LinkSearch.checkIfLink, linkExclusions, linkListBuilding, []));
                    break;
                case "main":
                    linkListBuilding.push(window.location.href);
                    break;
                default:
            }
        }
        // Output:
        const linkList = linkListBuilding.map((x) => x.slice(0, 1000)).slice(0, 10);
        const bestLink = linkList.length > 0 ? linkList[0] : undefined;
        return {
            bestImage,
            imageList,
            bestPrice,
            priceList,
            bestLink,
            linkList,
            bestDescription,
            descriptionList,
            mouseOverList,
            positionerContainer,
        };
    }
    static getProductMetaData(settings, logger) {
        // Note that different methods may fetch different types:
        // Would be better to split this into a method per type to use constants + return values...
        let bestImage;
        let bestPrice;
        let bestDescription;
        let metaImageList = []; // required for ease.
        META_TYPES.forEach((metaInfo) => {
            var _a;
            const metaType = metaInfo.key;
            const metaSettings = settings[metaType];
            // see if we need to run the meta extractions first:
            if (typeof settings[metaType] === "object" && metaSettings) {
                const metaSubContainers = metaSettings.containers
                    ? this.getSubContainers(document.body, metaSettings, logger)
                    : [document];
                const metaArray = [];
                metaSubContainers.forEach((element) => metaArray.push(metaInfo.method(element, logger)));
                // Now see what needs setting:
                if (settings.images && settings.images.meta === metaType) {
                    metaImageList = MetaSearch_1.MetaSearch.getImageList(metaArray);
                    if (metaImageList.length > 0) {
                        bestImage = metaImageList[0];
                    }
                }
                if (settings.price && settings.price.meta === metaType) {
                    bestPrice = (_a = MetaSearch_1.MetaSearch.getBestPrice(metaArray)) !== null && _a !== void 0 ? _a : undefined;
                }
                if (settings.description && settings.description.meta === metaType) {
                    bestDescription = MetaSearch_1.MetaSearch.getBestDescription(metaArray);
                }
            }
        });
        return {
            metaImageList,
            bestImage,
            bestDescription,
            bestPrice,
        };
    }
    static updateProductData(container, settings, logger) {
        var _a, _b, _c;
        // All errors below will be caught by this try catch!
        try {
            // BODY (NON-META):
            const bodyData = this.getProductBodyData(container, settings, logger);
            // META:
            const metaData = this.getProductMetaData(settings, logger);
            // And finally... return!
            return {
                ...bodyData,
                ...metaData,
                bestImage: (_a = metaData.bestImage) !== null && _a !== void 0 ? _a : bodyData === null || bodyData === void 0 ? void 0 : bodyData.bestImage,
                bestPrice: (_b = metaData.bestPrice) !== null && _b !== void 0 ? _b : bodyData === null || bodyData === void 0 ? void 0 : bodyData.bestPrice,
                bestDescription: (_c = metaData.bestDescription) !== null && _c !== void 0 ? _c : bodyData === null || bodyData === void 0 ? void 0 : bodyData.bestDescription,
                productSetting: settings,
                productContainer: container,
                creatrionKey: this.generateUID(),
            };
        }
        catch (err) {
            logger.debugError(err, "ProductToContainer.updateProductData: Could not complete data colelction for a product search container", "container", container, "settings", settings, "semi-critical");
            return undefined;
        }
    }
    // Check is a valid product from data:
    static dataToProduct(data, logger) {
        try {
            const missingFields = [];
            // check it has at least 1 image, exactly 1 price, some description and 1 best link.
            REQUIRED_FIELDS.forEach((field) => {
                if ((data === null || data === void 0 ? void 0 : data[field]) === undefined || (data === null || data === void 0 ? void 0 : data[field]) === "") {
                    missingFields.push(field);
                }
            });
            // Typecasting to avoid explicit writing in of all fields...
            return [
                missingFields.length === 0 ? data : false,
                missingFields,
                data,
            ];
        }
        catch (err) {
            logger.debugError(err, "ContainerToProduct.dataToProduct: Could not determine validatity of product from data", "data:", data, "semi-critical");
            return [false, [], data];
        }
    }
    // Get the price(s), image(s), etc.
    static productsFromContainers(containerList, productSegmentationSettings, logger, reportToHarlinator = false, testCode = undefined, productType = undefined, containerTypeIndex = undefined // position in array of containers
    ) {
        logger.debugLog("%c    ", "background-color:skyblue;", "ProductSearchContainers:", containerList);
        const productDataList = containerList.map((element) => this.updateProductData(element, productSegmentationSettings, logger));
        logger.debugLog("%c    ", "background-color:skyblue;", "Container Data:", productDataList);
        const missingFieldProducts = [];
        const fullProducts = [];
        productDataList
            .map((data) => this.dataToProduct(data, logger))
            .forEach(([product, missingFields, data]) => {
            if (product) {
                fullProducts.push(product);
            }
            else {
                missingFieldProducts.push([missingFields, data]);
            }
        });
        logger.debugLog("%c    ", "background-color:skyblue;", "Missing fields:", missingFieldProducts);
        // Report to Harlinator the deetz of this scan:
        if (reportToHarlinator === true) {
            (0, harlinatorPartialReporting_1.harlinatorPartialReporting)(productSegmentationSettings, fullProducts, missingFieldProducts, testCode, productType, containerTypeIndex, logger);
        }
        return {
            fullProducts,
            missingFieldProducts,
        };
    }
}
exports.ContainerToProduct = ContainerToProduct;


/***/ }),

/***/ 3021:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE

Get the information from the page itself based on there being no (decent) site settings file and open a new tab with the information.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IndividualProductAdd = void 0;
const convertToSimpleProductRepresentation_1 = __webpack_require__(9874);
const MetaSearch_1 = __webpack_require__(2249);
const PriceSearch_1 = __webpack_require__(4903);
const recursiveNodeSearch_1 = __webpack_require__(8674);
class IndividualProductAdd {
    static getImages() {
        const imageArray = [];
        document
            .querySelectorAll("img")
            // TODO: Consider changing to clientHeight and clientWidth to get the size of the image on the page not the image itself...
            .forEach((x) => imageArray.push([x, x.naturalHeight * x.naturalWidth]));
        return imageArray
            .filter((img) => img[0].naturalHeight > 50 && img[0].naturalWidth > 50)
            .sort((a, b) => (a[1] > b[1] ? -1 : 1))
            .map((img) => img[0].currentSrc)
            .filter((x) => x.length < 2000 && x.slice(0, 4) === "http");
    }
    static getLink() {
        return window.location.href.slice(0, 1000);
    }
    static getPrice(logger) {
        // Try the price classic method to find the prices, and if just one then use that or the first one:
        const priceList = [];
        (0, recursiveNodeSearch_1.recursiveNodeSearch)(document.body, PriceSearch_1.PriceSearch.checkIfPrice, [], priceList, [[]]);
        // Get best price:
        const bestPrice = PriceSearch_1.PriceSearch.getBestPrice(priceList, logger);
        return bestPrice ? bestPrice[1] : "";
    }
    static getDescription() {
        return document.title.slice(0, 200);
    }
    static chooseBestPrice(metaDataJSON, metaDataTags, ogData, logger) {
        // look in meta data first:
        // take from JSON first:
        if (metaDataJSON.price.length === 1) {
            return metaDataJSON.price[0];
        }
        else if (metaDataTags.price.length === 1) {
            return metaDataTags.price[0];
        }
        else if (ogData && ogData.price) {
            return ogData.price;
        }
        else {
            return this.getPrice(logger);
        }
    }
    static removeHTTP(link) {
        return link.replace("http://", "").replace("https://", "");
    }
    // Triggered by request from menu bar tab.
    // Where product data is any auto segmented data...:
    static guessProductInfo(productData, logger, inExtension = true) {
        var _a, _b, _c, _d, _e;
        const simpleRepresentation = (0, convertToSimpleProductRepresentation_1.convertToSimpleProductRepresentation)(productData, logger);
        try {
            // ensure this is set up!
            // if (inExtension === true) {
            //   if (!ms_globals.product_tracker) {
            //     ms_globals.product_tracker = new ProductTracker();
            //   }
            // }
            /*
            var url_out = `${ENV_FRONT_END_URL}/addproduct`;
            url_out+="?images="+this.getImages().map(x=>encodeURIComponent(x)).join("m_o_o_n");
            url_out+="&link="+encodeURIComponent(this.getLink());
            url_out+="&price="+encodeURIComponent(this.getPrice());
            url_out+="&description="+encodeURIComponent(this.getDescription());
            chrome.runtime.sendMessage(//"ilhndggcllngnhpjnofeengombmdfhlo",
              {type:"open_tab",url:url_out}
            );
            */
            // META DATA FOR IMAGES + PRICE ONLY!
            // Get meta data first:
            const metaDataJSON = MetaSearch_1.MetaSearch.getJSONMeta(document, logger); // prioritise this one!
            const metaDataTags = MetaSearch_1.MetaSearch.getTagMeta(document, logger);
            // If required also look for OGData:
            // Note that we only do this when the page has just loaded as some sites only have this correct when just loaded
            // e.g. single page webapps, so we only use it in the app!
            const ogData = MetaSearch_1.MetaSearch.getOGMetaData();
            const ogImages = ogData && ogData.images ? ogData.images : [];
            // Now get data:
            const metaImages = [
                ...new Set([...metaDataJSON.images, ...metaDataTags.images]),
            ];
            // NOTE this order is used in (OverlayManager > openManualAdd) to preselect images for saving, so change that if it changes here!
            const imagesNotUnique = inExtension === true
                ? [
                    ...((_a = simpleRepresentation === null || simpleRepresentation === void 0 ? void 0 : simpleRepresentation.images) !== null && _a !== void 0 ? _a : []),
                    ...metaImages,
                    ...this.getImages(),
                    ...ogImages,
                ]
                : [
                    ...ogImages,
                    ...((_b = simpleRepresentation === null || simpleRepresentation === void 0 ? void 0 : simpleRepresentation.images) !== null && _b !== void 0 ? _b : []),
                    ...metaImages,
                    ...this.getImages(),
                ];
            // make unique images!:
            const images = [...new Set(imagesNotUnique)].slice(0, 48);
            // best images length:
            // order is what is defined from the site settings / meta / guessed order:!
            const bestImagesLength = inExtension === true
                ? [
                    ...new Set([
                        ...((_c = simpleRepresentation === null || simpleRepresentation === void 0 ? void 0 : simpleRepresentation.images) !== null && _c !== void 0 ? _c : []),
                        ...metaImages,
                    ]),
                ].length
                : ogImages.length;
            const price = (_d = simpleRepresentation === null || simpleRepresentation === void 0 ? void 0 : simpleRepresentation.price) !== null && _d !== void 0 ? _d : this.chooseBestPrice(metaDataJSON, metaDataTags, ogData, logger);
            const description = simpleRepresentation && (simpleRepresentation === null || simpleRepresentation === void 0 ? void 0 : simpleRepresentation.description.length) >= 5
                ? simpleRepresentation.description
                : this.getDescription();
            const link = this.getLink();
            const pageURL = (_e = productData === null || productData === void 0 ? void 0 : productData.pageURL) !== null && _e !== void 0 ? _e : this.removeHTTP(link);
            return {
                images,
                meta_images: metaImages,
                best_images_length: bestImagesLength,
                price,
                description,
                link,
                page_url: pageURL,
                manual: true,
            };
        }
        catch (err) {
            logger.debugError(err, "Failed to get product data for individual add");
        }
        return undefined;
    }
}
exports.IndividualProductAdd = IndividualProductAdd;


/***/ }),

/***/ 5554:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE

Get the containers based on the settings files - view the docs of how to set these up!
Errors caught to return null in case of malformed settings...

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductContainerSearch = void 0;
const getParentElementAtLevel_1 = __webpack_require__(8511);
class ProductContainerSearch {
    static getShadowNodes(element, storageArray) {
        if (element.shadowRoot !== null && element.shadowRoot !== undefined) {
            if (typeof element.shadowRoot.children === "object") {
                storageArray.push(element.shadowRoot);
                for (let child of element.shadowRoot.children) {
                    this.getShadowNodes(child, storageArray);
                }
            }
        }
        for (let child of element.children) {
            this.getShadowNodes(child, storageArray);
        }
    }
    static getElementsByShadowQuery(query, element) {
        const containersOut = [];
        const shadowStore = [element];
        this.getShadowNodes(element, shadowStore);
        for (let root of shadowStore) {
            const classElementsHTMLCollection = root.querySelectorAll(query);
            for (let element of classElementsHTMLCollection) {
                // We have to asssume the types are OK during type cast:
                containersOut.push(element);
            }
        }
        return containersOut;
    }
    static getProductContainers(containerSettings, topElement, logger) {
        let containersToReturn = [];
        try {
            const containerSettingsList = containerSettings;
            if (typeof containerSettingsList === "object") {
                for (let containerSetting of containerSettingsList) {
                    try {
                        if (typeof containerSetting.match_data === "object") {
                            let containersOut = [];
                            // switch out special cases to save time:
                            switch (containerSetting.match_type) {
                                // slightly quicker than query:
                                case "exact-id":
                                    const matching_element = document.getElementById(containerSetting.match_data.string);
                                    if (matching_element !== null) {
                                        containersOut.push(matching_element);
                                    }
                                    break;
                                // slightly quicker than query:
                                case "exact-class":
                                    const exactClassHTMLCollection = topElement.getElementsByClassName(containerSetting.match_data.string);
                                    for (let element of exactClassHTMLCollection) {
                                        containersOut.push(element);
                                    }
                                    break;
                                // generic query:
                                case "query":
                                    const queryHTMLCollection = topElement.querySelectorAll(containerSetting.match_data.string);
                                    for (let element of queryHTMLCollection) {
                                        containersOut.push(element);
                                    }
                                    break;
                                case "evaluate":
                                    const evaluateHTMLCollection = document.evaluate(containerSetting.match_data.string, topElement);
                                    let node = true;
                                    while (node) {
                                        node = evaluateHTMLCollection.iterateNext();
                                        if (node) {
                                            // TODO: Check typecasting!
                                            containersOut.push(node);
                                        }
                                    }
                                    break;
                                // DEPRECATED - learn queries!
                                case "exact-tag":
                                    const exactTagHTMLCollection = topElement.getElementsByTagName(containerSetting.match_data.string);
                                    for (let element of exactTagHTMLCollection) {
                                        containersOut.push(element);
                                    }
                                    break;
                                // DEPRECATED - learn queries!
                                case "exact-attribute":
                                    const exactAttributeHTMLCollection = topElement.querySelectorAll("[" +
                                        containerSetting.match_data.attribute +
                                        '~="' +
                                        containerSetting.match_data.string +
                                        '"]');
                                    for (let element of exactAttributeHTMLCollection) {
                                        containersOut.push(element);
                                    }
                                    break;
                                // DEPRECATED - learn queries!
                                case "partial-attribute":
                                    const partialAttributeHTMLCollection = topElement.querySelectorAll("[" +
                                        containerSetting.match_data.attribute +
                                        '*="' +
                                        containerSetting.match_data.string +
                                        '"]');
                                    for (let element of partialAttributeHTMLCollection) {
                                        containersOut.push(element);
                                    }
                                    break;
                                // DEPRECATED - learn queries!
                                case "has-attribute":
                                    const hasAttributeHTMLCollection = topElement.querySelectorAll("[" + containerSetting.match_data.attribute + '=""]');
                                    for (let element of hasAttributeHTMLCollection) {
                                        containersOut.push(element);
                                    }
                                    break;
                                // query in all shadow roots!:
                                case "shadow-query":
                                    if (containerSetting.match_data.query) {
                                        containersOut = containersOut.concat(this.getElementsByShadowQuery(containerSetting.match_data.query, topElement));
                                    }
                                    break;
                                // from this element's shadow query ONLY
                                case "shadow-query-top":
                                    if (topElement.shadowRoot) {
                                        const class_elements_HTMLCollection = topElement.shadowRoot.querySelectorAll(containerSetting.match_data.string);
                                        for (let this_element of class_elements_HTMLCollection) {
                                            containersOut.push(this_element);
                                        }
                                    }
                                    break;
                                default:
                            }
                            // subcontainers:
                            if (typeof containerSetting.containers === "object") {
                                let nextContainersOut = [];
                                for (let currentContainer of containersOut) {
                                    nextContainersOut = nextContainersOut.concat(this.getProductContainers(containerSetting.containers, currentContainer, logger));
                                }
                                containersOut = nextContainersOut;
                            }
                            // parents of detected containers:
                            if (containerSetting.parent_level !== undefined) {
                                let nextContainersOut = [];
                                for (let currentContainer of containersOut) {
                                    nextContainersOut.push((0, getParentElementAtLevel_1.getParentElementAtLevel)(currentContainer, containerSetting.parent_level));
                                }
                                containersOut = nextContainersOut;
                            }
                            // slice up the array if requested:
                            if (containerSetting.match_data.slice) {
                                containersOut = containersOut.slice(containerSetting.match_data.slice[0], containerSetting.match_data.slice[1]);
                            }
                            containersToReturn = containersToReturn.concat(containersOut);
                        }
                    }
                    catch (err) {
                        logger.debugError(err, "ProductContainerSearch.getProductContainers: Could not perform this container product search for container settings", "containerSetting", containerSetting, "topElement", topElement, "semi-critical");
                    }
                }
            }
        }
        catch (err) {
            logger.debugError(err, "ProductContainerSearch.getProductContainers: Could not perform product container search for settings", "containerSettings", containerSettings, "topElement", topElement, "critical");
            containersToReturn = [];
        }
        return containersToReturn;
    }
}
exports.ProductContainerSearch = ProductContainerSearch;


/***/ }),

/***/ 5585:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE
This file stores functions that get the product containers and analyse them
Errors should be caught by container array item in case one is defunct and others are OK!

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSearch = void 0;
const ContainerToProduct_1 = __webpack_require__(3889);
const ProductContainerSearch_1 = __webpack_require__(5554);
class ProductSearch {
    static async cleanUniquenessFilter(orderedProductListAll, unqiueRunCode, logger) {
        try {
            for (let segmentedProduct of orderedProductListAll) {
                for (let element of [
                    segmentedProduct.productContainer,
                    ...segmentedProduct.imageList,
                    ...segmentedProduct.priceList.map((x) => x[0]),
                ]) {
                    if (element !== "JSON" &&
                        element["ms_ps_unique_product_check"] !== undefined) {
                        delete element["ms_ps_unique_product_check"][unqiueRunCode];
                    }
                }
            }
        }
        catch (err) {
            logger.debugError(err, "ProductSearch.cleanUniquenessFilter: Could not clean up unqiueness strings, non-critical");
        }
    }
    // We basically want to make sure they are not duplicates in any way....
    // so that each image and price goes to just one product
    static extractOnlyUniqueTileProducts(productListInput, mainProduct, logger) {
        try {
            const unqiueRunCode = performance.now();
            // sort by most number of images first- copy to avoid sorting original list:
            // This is to make sure that any less complete products are not used, but has marginal difference now we are not using auto-segment
            const productListSorted = [...productListInput];
            productListSorted.sort((x, y) => x.imageList.length > y.imageList.length ? -1 : 1);
            const orderedProductListAll = mainProduct !== undefined
                ? [mainProduct, ...productListSorted]
                : productListSorted;
            // Ensure also not a main product:
            for (let segmentedProduct of orderedProductListAll) {
                // Assign each image and price with a "used now" code
                segmentedProduct.productCleaned = true;
                for (let element of [
                    segmentedProduct.productContainer,
                    ...segmentedProduct.imageList,
                    ...segmentedProduct.priceList.map((priceInfo) => priceInfo[0]),
                ]) {
                    if (element !== "JSON") {
                        if (element.ms_ps_unique_product_check === undefined) {
                            element.ms_ps_unique_product_check = {};
                        }
                        // if already assigned this code then mark the product as invalid:
                        if (element.ms_ps_unique_product_check[unqiueRunCode] === true) {
                            segmentedProduct.productCleaned = false;
                        }
                        else {
                            element.ms_ps_unique_product_check[unqiueRunCode] = true;
                        }
                    }
                }
            }
            // async cleaning:
            this.cleanUniquenessFilter(orderedProductListAll, unqiueRunCode, logger);
            const productsToKeep = productListSorted.filter((x) => x.productCleaned === true);
            if (productsToKeep.length < productListSorted.length) {
                const diff = productListSorted.length - productsToKeep.length;
                logger.debugLog("%c    ", "background-color:skyblue;", diff +
                    " products were invalid as they contained overlapping price / image elements");
            }
            return productsToKeep;
        }
        catch (err) {
            logger.debugError(err, "ProductSearch.extractOnlyUniqueTileProducts: Could not perform tile product uniqueness filter - semi-critical");
            return [];
        }
    }
    // get all products with the settings supplied:
    // any error caught above
    static getProducts(siteSettings, productType, logger) {
        let productsOut = [];
        let missingFieldProductsOut = [];
        const productTypeSiteSettings = siteSettings[productType];
        if (productTypeSiteSettings !== undefined &&
            typeof productTypeSiteSettings === "object") {
            for (let segmentationIndex = 0; segmentationIndex < productTypeSiteSettings.length; segmentationIndex++) {
                const productSegmentationSettings = productTypeSiteSettings[segmentationIndex];
                try {
                    // get all the products based on each ContainerSettings context:
                    const productContainers = ProductContainerSearch_1.ProductContainerSearch.getProductContainers(productSegmentationSettings.containers, document, logger);
                    const { fullProducts, missingFieldProducts } = ContainerToProduct_1.ContainerToProduct.productsFromContainers(productContainers, productSegmentationSettings, logger, siteSettings.harlinator_report_partials, siteSettings.test_date_code, productType, segmentationIndex);
                    productsOut = productsOut.concat(fullProducts);
                    missingFieldProductsOut =
                        missingFieldProductsOut.concat(missingFieldProducts);
                }
                catch (err) {
                    logger.debugError(err, "ProductSearch.getProducts: Could not perform product search for settings", "productType:", productType, "productSegmentationSettings", productSegmentationSettings, "semi-critical");
                }
            }
        }
        return { products: productsOut, partialProducts: missingFieldProductsOut };
    }
    // get main product:
    static getMainProduct(siteSettings, logger) {
        logger.debugLog("%c  ", "background-color:skyblue;", "Looking for a main product....");
        try {
            const { products: productList } = this.getProducts(siteSettings, "main", logger);
            if (productList.length > 0) {
                productList[0].mainProduct = true;
                return productList[0];
            }
            else {
                return undefined;
            }
        }
        catch (err) {
            logger.debugError(err, "ProductSearch.getMainProduct: Could not perform the main product search - critical!");
            return undefined;
        }
    }
    // get any tiles:
    static getTileProducts(siteSettings, logger) {
        logger.debugLog("%c  ", "background-color:skyblue;", "Looking for tile products....");
        try {
            // get the tile product containers:
            return this.getProducts(siteSettings, "tiles", logger).products;
        }
        catch (err) {
            logger.debugError(err, "ProductSearch.getTileProducts: Could not perform the tile product search - critical!");
            return [];
        }
    }
}
exports.ProductSearch = ProductSearch;


/***/ }),

/***/ 2353:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
NON-STATIC MODULE
This class tracks the products by page_url and top container.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductTracker = void 0;
const getPageURL_1 = __webpack_require__(9292);
const ImageSourceSearch_1 = __webpack_require__(8242);
const updateCurrentProducts_1 = __webpack_require__(7792);
class ProductTracker {
    constructor(siteUID, updateCallback, logger) {
        // A sleepy function:
        this.sleep = (ms) => {
            return new Promise((resolve) => setTimeout(resolve, ms));
        };
        // Blocking this due to ensuring consistency between the different lookups and main lists.
        // This means we don't have to check for validity when doing the lookups...:
        // TODO: try and use atomics for this;
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics
        this.blockingPartUpdateProducts = async (newList, newProductsByPageURL, newProductsByElement, newTileProducts, newMainProduct) => {
            let hasUpdated = false;
            while (hasUpdated === false) {
                try {
                    if (this.updatesBlocked !== true) {
                        this.updatesBlocked = true;
                        // copy over new stuff:
                        this.masterProductsList = newList;
                        this.productsByPageURL = newProductsByPageURL;
                        this.productsByElement = newProductsByElement;
                        this.tileProducts = newTileProducts;
                        this.mainProduct = newMainProduct;
                        hasUpdated = true;
                    }
                    else {
                        await this.sleep(100);
                    }
                }
                catch (err) {
                    this.logger.debugError(err, "Unable to update any of the product arrays, critical");
                    // exit loop if error
                    hasUpdated = true;
                }
            }
            // in all cases stop blocking:
            this.updatesBlocked = false;
        };
        this.updateProductsList = async (newList) => {
            try {
                const newProductsByPageURL = {};
                const newProductsByElement = new Map();
                const newTileProducts = [];
                let mainProductCount = 0;
                let newMainProduct;
                for (let product of newList) {
                    const arrayToAddTo = newProductsByPageURL[product.pageURL];
                    if (arrayToAddTo === undefined) {
                        newProductsByPageURL[product.pageURL] = [product];
                    }
                    else {
                        arrayToAddTo.push(product);
                    }
                    // We use a link from image to product for image manipulation, and from image/mo element to product for the mouseovers,
                    const elementsToAdd = [
                        ...product.imageList,
                        ...product.mouseOverList,
                        product.productContainer,
                    ];
                    elementsToAdd.forEach((element) => {
                        const elementToCheck = element;
                        if (elementToCheck.sourceInfo !== true) {
                            newProductsByElement.set(elementToCheck, product);
                        }
                    });
                    if (product.mainProduct !== true) {
                        newTileProducts.push(product);
                    }
                    else {
                        newMainProduct = product;
                        mainProductCount += 1;
                    }
                }
                // This should NOT happen based on current code but just in case for the future:
                // This sometimes does happen whilst sites are loading, so just take one of them!
                if (mainProductCount > 1) {
                    console.warn("Moonsift: Multiple main products (" +
                        mainProductCount +
                        ") detected in product tracker");
                }
                // BLOCKING UPDATE:
                await this.blockingPartUpdateProducts(newList, newProductsByPageURL, newProductsByElement, newTileProducts, newMainProduct);
                this.runUpdateCallback();
            }
            catch (err) {
                this.logger.debugError(err, "Unable to update the product data list info arrays");
            }
        };
        this.verifyProductData = (productList, logger) => {
            const verifiedProductList = [];
            const failedProductList = [];
            productList.forEach((product) => {
                try {
                    const pageURL = (0, getPageURL_1.getPageURL)(product.bestLink, this.siteUID, this.logger);
                    // returns true if success, otherwise false!
                    const imageSourceSuccess = ImageSourceSearch_1.ImageSourceSearch.getProductImageSources(product, logger);
                    if (pageURL !== undefined &&
                        pageURL !== "" &&
                        imageSourceSuccess === true) {
                        // Note that this copies the product data to a new one...!
                        verifiedProductList.push({ ...product, pageURL });
                    }
                    else {
                        failedProductList.push(product);
                    }
                }
                catch (err) {
                    this.logger.debugError(err, "Unable to validate product", product);
                    failedProductList.push(product);
                }
            });
            return [verifiedProductList, failedProductList];
        };
        // setters:
        this.updateAllProducts = async (siteSettings) => {
            if (siteSettings.settings === undefined) {
                this.logger.debugError(new Error("Missing site settings"), "Unable to update product tracking, critical");
                return [];
            }
            try {
                const { mainProduct, tileProducts } = await (0, updateCurrentProducts_1.updateCurrentProducts)(siteSettings.settings, this.logger);
                // Catch errors in the new functions here!
                // This way we will know what exactly it links to.
                // we can also record the presence of these things in the images so we can easily remove them.
                // tag them with an ID for the current run so reassigned ones don't get messed up....?
                const allProducts = mainProduct !== undefined
                    ? [mainProduct, ...tileProducts]
                    : tileProducts;
                const [validProducts, failedProducts] = this.verifyProductData(allProducts, this.logger);
                if (failedProducts.length > 0) {
                    this.logger.debugLog("%c    ", "background-color:skyblue;", failedProducts.length +
                        " products did not make it into the product tracker", failedProducts);
                }
                await this.updateProductsList(validProducts);
            }
            catch (err) {
                this.logger.debugError(err, "Unable to update product tracking, critical");
            }
        };
        this.updateIndividualProduct = async (oldProduct, newProduct) => {
            // should be mutually exclusive run with all function.
            try {
                // Catch errors in the new functions here!
                const [validProducts] = this.verifyProductData([newProduct], this.logger);
                if (validProducts.length === 1) {
                    const validNewProduct = validProducts[0];
                    // get a new product list:
                    const newProductList = [
                        ...this.masterProductsList.filter((x) => x !== oldProduct),
                        validNewProduct,
                    ];
                    await this.updateProductsList(newProductList);
                    return validNewProduct;
                }
                else {
                    this.logger.debugLog("%c    ", "background-color:skyblue;", "Product did not make it into the product tracker", newProduct);
                }
            }
            catch (err) {
                this.logger.debugError(err, "Unable to update product tracking, critical");
            }
            return false;
        };
        // function to remove all products e.g. on logout:
        this.removeAllProducts = async () => {
            //async call:
            await this.updateProductsList([]);
        };
        this.getProductsByPageURL = (pageURL) => {
            var _a;
            return (_a = this.productsByPageURL[pageURL]) !== null && _a !== void 0 ? _a : [];
        };
        this.getMainProduct = () => {
            return this.mainProduct;
        };
        this.getTileProducts = () => {
            return this.tileProducts;
        };
        this.getAllProducts = () => {
            return this.mainProduct !== undefined
                ? [this.mainProduct, ...this.tileProducts]
                : this.tileProducts;
        };
        this.getProductByElement = (element) => {
            if (element !== undefined) {
                const product = this.productsByElement.get(element);
                if (product !== undefined) {
                    // assumed to be valid as in list.
                    return product;
                }
            }
            // return "not_found" if not found / valid.
            return "not_found";
        };
        this.runUpdateCallback = () => {
            try {
                if (this.updateCallback) {
                    this.updateCallback(this.mainProduct, this.tileProducts);
                }
            }
            catch (err) {
                this.logger.debugError(err, "Unable to run callback on product update");
            }
        };
        this.logger = logger;
        // set up lists + dictionaries:
        this.masterProductsList = [];
        this.productsByPageURL = {};
        this.productsByElement = new Map();
        this.tileProducts = [];
        this.siteUID = siteUID;
        this.updateCallback = updateCallback;
        this.updatesBlocked = false;
    }
}
exports.ProductTracker = ProductTracker;


/***/ }),

/***/ 4071:
/***/ ((__unused_webpack_module, exports) => {


/*

A constant currency represntation to search for...

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CURRENCY_RE = void 0;
exports.CURRENCY_RE = /(£|GBP|€|EUR|\$|NZD|USD|AUD|HKD|SGD|CAD|円|¥|JPY|CNY|CHF|SFr|CHf|Fr|SEK|₹|INR|AED|د.إ)/;


/***/ }),

/***/ 7448:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE

This part looks for a description:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DescriptionSearch = void 0;
const recursiveNodeSearch_1 = __webpack_require__(8674);
class DescriptionSearch {
    // check is TEXT!
    static checkIsText(element, fullTextList, _otherArgs) {
        var _a, _b;
        if (element.constructor.name === "Text") {
            const textElement = element;
            const trimmedText = (_b = (_a = textElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
            if (trimmedText !== "") {
                fullTextList.push(trimmedText);
                return true;
            }
        }
        return false;
    }
    static cleanText(text, cleaningString) {
        let textToReturn = text;
        cleaningString.forEach((stringToRemove) => {
            textToReturn = textToReturn.replace(stringToRemove, "");
        });
        return textToReturn;
    }
    // Get text for analysis:
    static getAllTextForElement(element, exclusions, cleanText) {
        // build it recursively AND, of course, include shadow roots!:
        const fullTextList = [];
        (0, recursiveNodeSearch_1.recursiveNodeSearch)(element, DescriptionSearch.checkIsText, exclusions, fullTextList, []);
        if (cleanText) {
            return fullTextList.map((text) => DescriptionSearch.cleanText(text, cleanText));
        }
        return fullTextList;
    }
    // Get text combined:
    static getAllTextForElementsCombined(elementList, exclusions, cleanText) {
        return elementList
            .map((element) => DescriptionSearch.getAllTextForElement(element, exclusions, cleanText))
            .join(" ");
    }
    // Get the longest image-alt description:
    static getProductImageAlt(imageList, cleanText) {
        let imageAltOut = "";
        for (let image of imageList) {
            const imageAlt = image.getAttribute("alt");
            if (imageAlt) {
                const imageAltTrimmed = imageAlt.trim();
                if (imageAltTrimmed.length > imageAltOut.length) {
                    imageAltOut = imageAltTrimmed;
                }
            }
        }
        return cleanText
            ? DescriptionSearch.cleanText(imageAltOut, cleanText)
            : imageAltOut;
    }
    static classicDescriptionSearch(container, imageList, exclusionList, cleanText) {
        const allText = this.getAllTextForElement(container, exclusionList, cleanText);
        // Look at the image alt text and concat the text, could perhaps take the longest of the two:
        const altDesc = this.getProductImageAlt(imageList, cleanText);
        // take the longest of the two, prioritising text dec.
        return allText.join(" ").length >= altDesc.length ? allText : [altDesc];
    }
    static getTextFromAttribute(element, attributeIDs) {
        if (!attributeIDs) {
            return "";
        }
        return attributeIDs
            .map((attribute) => element.getAttribute(attribute))
            .join(" ");
    }
}
exports.DescriptionSearch = DescriptionSearch;


/***/ }),

/***/ 1420:
/***/ ((__unused_webpack_module, exports) => {


/*

A constant list of HTML elements that we won't look into for product data

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EXCLUDED_ELEMENTS = void 0;
exports.EXCLUDED_ELEMENTS = [
    "HTMLInputElement",
    "HTMLScriptElement",
    "HTMLSelectElement",
];


/***/ }),

/***/ 7095:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

A constant that is the Regular Expression for finding prices.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FULL_PRICE_RE = void 0;
const CURRENCY_RE_1 = __webpack_require__(4071);
exports.FULL_PRICE_RE = new RegExp("(" +
    CURRENCY_RE_1.CURRENCY_RE.source +
    "[ ]?\\d+(\\.\\d*)?|\\d+(\\.\\d*)?[ ]?" +
    CURRENCY_RE_1.CURRENCY_RE.source +
    ")", "g");


/***/ }),

/***/ 9655:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageSearch = void 0;
/*
STATIC MODULE

IMAGE DETECTION - now super simple!

properties added to image elements:
- ms_ps_area 							float
- ms_ps_client_area				float

Errors not caught here, propogate up.

// NOTE: Technically you can have MORE THAN ONE background image... BUT we will just assume that there is one.

*/
const testMode_1 = __webpack_require__(7873);
const getAbsolutePath_1 = __webpack_require__(4156);
const ImageSourceSearch_1 = __webpack_require__(8242);
class ImageSearch {
    static checkIfImage(element, imageList, [ignoreSize, minWidth = 71, minHeight = 71]) {
        var _a, _b, _c, _d, _e;
        // Must be an image or div background element:
        var backgroundImages = [];
        var imageHeight;
        var imageWidth;
        if (element.constructor.name === "HTMLImageElement") {
            // use current source to check it is useable...:
            const imageElement = element;
            const backgroundImageSource = testMode_1.isTestMode && imageElement.hasAttribute("ms_currentSrc")
                ? (_a = imageElement.getAttribute("ms_currentSrc")) !== null && _a !== void 0 ? _a : imageElement.currentSrc
                : imageElement.currentSrc;
            backgroundImages = [backgroundImageSource];
            imageHeight =
                testMode_1.isTestMode && imageElement.hasAttribute("ms_naturalHeight")
                    ? parseFloat((_b = imageElement.getAttribute("ms_naturalHeight")) !== null && _b !== void 0 ? _b : "0.0")
                    : imageElement.naturalHeight;
            imageWidth =
                testMode_1.isTestMode && imageElement.hasAttribute("ms_naturalWidth")
                    ? parseFloat((_c = imageElement.getAttribute("ms_naturalWidth")) !== null && _c !== void 0 ? _c : "0.0")
                    : imageElement.naturalWidth;
        }
        else if (element.constructor.name === "HTMLDivElement" ||
            element.constructor.name === "HTMLAnchorElement") {
            const imageElement = element;
            backgroundImages = ImageSourceSearch_1.ImageSourceSearch.getBackgroundImageSources(imageElement).map((x) => (0, getAbsolutePath_1.getAbsolutePath)(x.backgroundImage));
        }
        if (backgroundImages.length > 0) {
            // we are not interested in embedded images for a start and also need to keep our own blobs detected ;)
            // if ANY of the image sources are valid...:
            const validImageSource = backgroundImages
                .map((x) => x.slice(0, 4) === "http" || x.slice(0, 5) === "blob:")
                .reduce((a, b) => a || b);
            if (validImageSource) {
                // NOTE: the naturalHeight etc. for a DIV is ZERO.... so will not pass test below if this is used...
                // This makes mouseovers of backgrounds hard to deal with but oh well...
                // But.... PROBLEM WITH NATURAL HEIGHTS - often detect other images that we don't really want...
                const clientHeight = testMode_1.isTestMode && element.hasAttribute("ms_clientHeight")
                    ? parseFloat((_d = element.getAttribute("ms_clientHeight")) !== null && _d !== void 0 ? _d : "0.0")
                    : element.clientHeight;
                const clientWidth = testMode_1.isTestMode && element.hasAttribute("ms_clientWidth")
                    ? parseFloat((_e = element.getAttribute("ms_clientWidth")) !== null && _e !== void 0 ? _e : "0.0")
                    : element.clientWidth;
                if (imageHeight === 0 ||
                    imageHeight === 1 ||
                    imageHeight === undefined) {
                    imageHeight = clientHeight;
                }
                if (imageWidth === 0 || imageWidth === 1 || imageWidth === undefined) {
                    imageWidth = clientWidth;
                }
                // Images must be over certain dimensions to be considered:
                if ((imageHeight >= minHeight && imageWidth >= minWidth) ||
                    (imageHeight === 0 && imageWidth === 0) ||
                    ignoreSize === true) {
                    const outElement = element;
                    outElement.ms_ps_area = imageHeight * imageWidth; // used for finding best image
                    outElement.ms_ps_client_area = clientHeight * clientWidth; // used for choosing link
                    imageList.push(outElement);
                    return true;
                }
            }
        }
        return false;
    }
    /*
  
       This part looks at the images present to choose the one to represent on Moonsift - it is simply the largest, or the one at position in DOM tree provided:
  
      */
    static getBestImage(imageList, slicePosition) {
        if (imageList.length > 0) {
            if (slicePosition !== undefined) {
                const new_list = imageList.slice(slicePosition[0], slicePosition[1]);
                if (new_list.length > 0) {
                    return new_list[0];
                }
            }
            // get largest image by area:
            return imageList.reduce((x, y) => {
                return x.ms_ps_area < y.ms_ps_area ? y : x;
            });
        }
        else {
            return undefined;
        }
    }
}
exports.ImageSearch = ImageSearch;


/***/ }),

/***/ 8242:
/***/ ((__unused_webpack_module, exports) => {


/*
STATIC MODULE

This part looks for image sources:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageSourceSearch = void 0;
class ImageSourceSearch {
    // ALSO CALLED IN IMAGE SEARCH to determine if div has background image!
    static getBackgroundImageSources(element) {
        const resultsList = [];
        for (let attributeName of ["background", "background-image"]) {
            const styleAttribute = element.style.getPropertyValue(attributeName);
            // ensure we don't run a reg ex on some massive embedded image thing:
            if (styleAttribute && styleAttribute.length < 500) {
                const preMatchResultsURLFirst = styleAttribute.match(/url\(("|').*?("|')\)/g);
                const matchResultsURLFirst = preMatchResultsURLFirst
                    ? preMatchResultsURLFirst
                    : [];
                matchResultsURLFirst.forEach((x) => resultsList.push({
                    backgroundImage: x.slice(5, -2),
                    attributeName: attributeName,
                }));
                const preMatchResultsURLSecond = styleAttribute.match(/url\([^"'].*?[^"']\)/g);
                const matchResultsURLSecond = preMatchResultsURLSecond
                    ? preMatchResultsURLSecond
                    : [];
                matchResultsURLSecond.forEach((x) => resultsList.push({
                    backgroundImage: x.slice(4, -1),
                    attributeName: attributeName,
                }));
            }
        }
        return resultsList;
    }
    /*
    srcset:
      https://html.spec.whatwg.org/multipage/images.html#srcset-attribute
      Format or srcset is:
      URL, URL, URL
      or
      URL descriptor,URL descriptor
      or
      URL descriptor, URL descriptor
      but...
      URL,URL,URL is NOT allowed - this would be one URL which DOES happen...
      Find first ", " or otherwise " ".  If " " then remove next up to "," otherwise just split by space
  
      Adding a comma removes need for the end condition that could mean page code got taken instead....
    */
    static getSrcsetSources(imageSrcset) {
        var _a;
        // do not run regex on large string:
        const toReturn = [];
        if (imageSrcset.length < 10000) {
            const resPartOne = (_a = (imageSrcset + ", ").match(/[^ ,]((?!, | ).)+(( +[^,]*)|(,+ ))/g)) !== null && _a !== void 0 ? _a : [];
            resPartOne.map((x) => {
                const match = x.match(/((?!, | ).)+/);
                if (match) {
                    toReturn.push(match[0]);
                }
            });
        }
        return toReturn;
    }
    // ensures we add 4 things....
    static addToSourceList(sourceURL, imageElement, sourceElement, attributeName, imageSourcelist) {
        if (sourceURL.slice(0, 11) !== "data:image/" && sourceURL.length < 2000) {
            imageSourcelist.push({
                source_url: sourceURL,
                image: imageElement,
                element: sourceElement,
                attribute: attributeName,
            });
        }
    }
    // Take image, the element that has the source attribute and the name of the dictionary.
    static updateImageSrcset(imageElement, sourceElement, imageSourceList) {
        // Get the source set
        const imageSrcset = sourceElement.getAttribute("srcset");
        if (imageSrcset) {
            // split into array of hrefs:
            this.getSrcsetSources(imageSrcset).forEach((x) => this.addToSourceList(x, // source_url_in
            imageElement, // image_in
            sourceElement, // element
            "srcset", // attribute_in
            imageSourceList // set to add to
            ));
        }
    }
    static getImageSources(element, logger) {
        try {
            const sourcesFound = [];
            // look at src tag of the image:
            // get the image source directly (note: may not have one!)
            if (element.constructor.name === "HTMLImageElement") {
                const imageElement = element;
                const imageSrc = imageElement.getAttribute("src");
                if (imageSrc && imageSrc != "//") {
                    // add if present to image source dictionary:
                    this.addToSourceList(imageSrc, // source_url_in
                    imageElement, // image_in
                    imageElement, // element
                    "src", // attribute_in
                    sourcesFound // set to add to
                    );
                }
                // Look for a source set on the image:
                this.updateImageSrcset(imageElement, imageElement, sourcesFound);
                // Look for a picture element above the image:
                const parentNode = imageElement.parentNode;
                if (parentNode &&
                    parentNode.constructor &&
                    parentNode.constructor.name === "HTMLPictureElement") {
                    // Look for source children:
                    for (let childElement of parentNode.children) {
                        if (childElement.constructor.name === "HTMLSourceElement") {
                            const childSourceElement = childElement;
                            this.updateImageSrcset(imageElement, childSourceElement, sourcesFound);
                        }
                    }
                    // Assume there will not be a shadow node here!
                }
            }
            // And look at background of div images:
            if (element.constructor.name === "HTMLDivElement" ||
                element.constructor.name === "HTMLAnchorElement") {
                const elementToInspect = element;
                const backgroundDivSources = this.getBackgroundImageSources(elementToInspect);
                backgroundDivSources.forEach((x) => 
                // add if present to image source dictionary:
                this.addToSourceList(x.backgroundImage, // source_url_in
                elementToInspect, // image_in
                elementToInspect, // element
                x.attributeName, // attribute_in
                sourcesFound // set to add to
                ));
            }
            // And update this image's sources for serialization and use in manipulate images...:
            element.ms_sources = sourcesFound;
            return sourcesFound;
        }
        catch (err) {
            logger.debugError(err, "Failed to get image sources for image", element, "semi-critical");
            return [];
        }
    }
    // for a single product:
    static getProductImageSources(product, logger) {
        try {
            let sourcesFound = [];
            for (let element of product.imageList) {
                sourcesFound = sourcesFound.concat(this.getImageSources(element, logger));
            }
            // Filter out specific image domains we know are not good here:
            sourcesFound = sourcesFound.filter((x) => !x.source_url.includes("klarnaservices.com"));
            if (sourcesFound.length > 0) {
                return true;
            }
            else if (product.metaImageList && product.metaImageList.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            logger.debugError(err, "Failed to get image sources for product", product, "semi-critical");
            return false;
        }
    }
}
exports.ImageSourceSearch = ImageSourceSearch;


/***/ }),

/***/ 8408:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE

Add all links in product and above if not found:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkSearch = void 0;
const getAbsolutePath_1 = __webpack_require__(4156);
const getParentElement_1 = __webpack_require__(836);
class LinkSearch {
    static checkIfLink(element, linkList, _otherArgs) {
        if (element.constructor.name === "HTMLAnchorElement") {
            const anchorElement = element;
            if (anchorElement.href !== "" && anchorElement.href !== undefined) {
                const this_absolute_path = (0, getAbsolutePath_1.getAbsolutePath)(anchorElement.href);
                if (this_absolute_path !== "javascript:void(0)") {
                    linkList.push(this_absolute_path);
                    return true;
                }
            }
        }
        return false;
    }
    static getLinksFromNodeAndAbove(element, linkList) {
        // Look through parental hierachy for a link:
        let currentlyInspectingElement = element;
        while (currentlyInspectingElement) {
            const result = LinkSearch.checkIfLink(currentlyInspectingElement, linkList, []);
            // if found something then stop:
            if (result === true) {
                break;
            }
            currentlyInspectingElement = (0, getParentElement_1.getParentElement)(currentlyInspectingElement);
        }
    }
    // Search all links:
    static searchLinksImages(imageList, linkList) {
        // order the images by size:
        // copy so as not to sort original list!
        const imageListCopy = [...imageList];
        imageListCopy.sort((x, y) => x.ms_ps_client_area > y.ms_ps_client_area ? -1 : 1);
        for (let image of imageListCopy) {
            this.getLinksFromNodeAndAbove(image, linkList);
        }
    }
}
exports.LinkSearch = LinkSearch;


/***/ }),

/***/ 2249:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE

Add all links in product and above if not found:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetaSearch = void 0;
const sendBGMessageOneWay_1 = __webpack_require__(2106);
const getAbsolutePath_1 = __webpack_require__(4156);
const getSiteUID_1 = __webpack_require__(4483);
class MetaSearch {
    static formatPriceTo2DP(price) {
        return parseFloat(price).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        });
    }
    static checkType(obj, query) {
        var _a;
        const typeProperty = (_a = obj === null || obj === void 0 ? void 0 : obj["@type"]) !== null && _a !== void 0 ? _a : undefined;
        if (typeProperty) {
            if (typeof typeProperty === "string") {
                const typeLowercase = typeProperty.toLowerCase();
                if (typeLowercase === query ||
                    typeLowercase.startsWith("http://schema.org/" + query)) {
                    return true;
                }
            }
            if (Array.isArray(typeProperty)) {
                return typeProperty.reduce((acc, x) => {
                    return acc || MetaSearch.checkType(x, query);
                });
            }
        }
        return false;
    }
    static priceFromOffer(offer) {
        if (offer["pricecurrency"]) {
            if (offer["price"]) {
                return (offer["pricecurrency"] + " " + this.formatPriceTo2DP(offer["price"]));
            }
            else if (offer["lowprice"] &&
                ((offer["highprice"] && offer["lowprice"] === offer["highprice"]) ||
                    !offer["highprice"])) {
                return (offer["pricecurrency"] +
                    " " +
                    this.formatPriceTo2DP(offer["lowprice"]));
            }
        }
        if (offer["pricespecification"]) {
            return MetaSearch.priceFromOffer(offer["pricespecification"]);
        }
        return "";
    }
    static getJSONMeta(container, logger) {
        // Get as strings:
        const metaArray = [...container.getElementsByTagName("script")]
            .filter((scriptElement) => scriptElement.getAttribute("type") === "application/ld+json")
            .map((scriptElement) => scriptElement.innerHTML);
        // Convert to JSON:
        const parsedMetaArray = [];
        metaArray
            .map((metaString) => MetaSearch.parseJSON(metaString, logger))
            .forEach((parsedMeta) => {
            if (Array.isArray(parsedMeta)) {
                parsedMeta.forEach((parsedMetaArrayEntry) => MetaSearch.processMeta(parsedMetaArrayEntry, parsedMetaArray));
            }
            else {
                MetaSearch.processMeta(parsedMeta, parsedMetaArray);
            }
        });
        let priceList = [];
        let imageList = [];
        let descriptionList = [];
        parsedMetaArray.forEach((productMeta) => {
            imageList = [
                ...imageList,
                ...MetaSearch.processImages(productMeta.image),
            ];
            priceList = [
                ...priceList,
                ...MetaSearch.processOffers(productMeta.offers),
            ];
            descriptionList = [
                ...descriptionList,
                MetaSearch.processDescription(productMeta),
            ];
        });
        // remove duplicates:
        return {
            images: [...new Set(imageList)],
            price: [...new Set(priceList)],
            description: MetaSearch.descriptionToString(descriptionList),
            meta: parsedMetaArray,
        };
    }
    // IDEA: we could search within the product tags to get the remaining product data...
    static getTagMeta(container, logger) {
        const meta = [];
        container
            .querySelectorAll("[itemprop]")
            .forEach((x) => {
            var _a;
            return meta.push({
                itemprop: x.getAttribute("itemprop"),
                content: x.getAttribute("content"),
                innerText: (_a = x.innerText) !== null && _a !== void 0 ? _a : null,
                src: x.getAttribute("src"),
            });
        });
        const tempDict = {
            priceCurrency: [],
            price: [],
            image: [],
            name: [],
        };
        meta.forEach((item) => {
            if (item.itemprop) {
                // Typecasting for convenience:
                const propName = item.itemprop;
                if (tempDict[propName]) {
                    const toAdd = item.content
                        ? item.content
                        : item.src
                            ? item.src
                            : item.innerText;
                    if (toAdd) {
                        tempDict[propName].push(toAdd);
                    }
                }
            }
        });
        logger.debugLog("%c        ", "background-color:skyblue;", "METADATA: Tag Meta: ", tempDict);
        // unique and filter out nulls:
        let priceList = [...new Set(tempDict["price"])];
        const priceCurrencyList = [...new Set(tempDict["priceCurrency"])];
        const descriptionList = tempDict["name"];
        const price = priceList.length === 1 && priceCurrencyList.length === 1
            ? [
                MetaSearch.priceFromOffer({
                    pricecurrency: priceCurrencyList[0],
                    price: priceList[0],
                }),
            ]
            : [];
        const images = (tempDict["image"] = [
            ...new Set(tempDict["image"].map((x) => x && (0, getAbsolutePath_1.getAbsolutePath)(x))),
        ]);
        const description = MetaSearch.descriptionToString(descriptionList);
        const result = {
            images,
            price,
            description,
            meta,
        };
        logger.debugLog("%c        ", "background-color:skyblue;", "META result:", result);
        return result;
    }
    static descriptionToString(descriptionList) {
        const descriptionListByLength = descriptionList
            .filter((x) => x != null)
            .sort((a, b) => (!a || (b && a.length < b.length) ? 1 : -1));
        return descriptionListByLength.length > 0 ? descriptionListByLength[0] : "";
    }
    static getBestPrice(metaDataArray) {
        // for now only return a best price if there is only one unique value!
        const priceArray = [
            ...new Set(metaDataArray
                .map((x) => x.price)
                .flat()
                .filter((x) => x !== "")),
        ];
        return priceArray.length > 0 ? ["JSON", priceArray[0]] : undefined;
    }
    static getBestDescription(metaDataArray) {
        const defaultValueClean = "";
        const descriptionArray = [
            defaultValueClean,
            ...new Set(metaDataArray
                .map((x) => x.description)
                .flat()
                .filter((x) => x !== null && x !== "")),
        ];
        descriptionArray.sort((a, b) => (a.length < b.length ? 1 : -1));
        return descriptionArray[0];
    }
    static getImageList(metaDataArray) {
        return [
            ...new Set(metaDataArray
                .map((x) => x.images)
                .flat()
                .filter((x) => x !== "")),
        ].map((x) => {
            return {
                currentSrc: x,
                sourceInfo: true,
                ms_sources: [
                    {
                        source_url: x,
                    },
                ],
            };
        });
    }
    // Note that the OGMetaData is going to be often for the entry location for single page apps...
    // as a result it will not be inclued in default meta search...
    static getOGMetaData() {
        const ogImageDataInput = [];
        document.querySelectorAll("[property='og:image']").forEach((element) => {
            const content = element.getAttribute("content");
            if (element) {
                ogImageDataInput.push();
            }
        });
        const images = [
            ...new Set(ogImageDataInput.map((image) => (0, getAbsolutePath_1.getAbsolutePath)(image))),
        ];
        const ogPriceAmountInput = [];
        document
            .querySelectorAll("[property='og:price:amount']")
            .forEach((x) => ogPriceAmountInput.push(x.getAttribute("content")));
        const ogPriceAmount = [...new Set(ogPriceAmountInput)];
        const ogPriceCurrencyInput = [];
        document
            .querySelectorAll("[property='og:price:currency']")
            .forEach((x) => ogPriceCurrencyInput.push(x.getAttribute("content")));
        const ogPriceCurrency = [...new Set(ogPriceCurrencyInput)];
        const price = ogPriceCurrency.length === 1 && ogPriceCurrency.length === 1
            ? MetaSearch.priceFromOffer({
                pricecurrency: ogPriceCurrency[0],
                price: ogPriceAmount[0],
            })
            : undefined;
        return {
            images,
            price,
        };
    }
    static getMetaDataHarlinator(logger) {
        (0, sendBGMessageOneWay_1.sendBGMessageOneWay)(
        //"ilhndggcllngnhpjnofeengombmdfhlo",
        {
            type: "harlinator",
            action: "report_meta",
            json_meta: MetaSearch.getJSONMeta(document, logger),
            tag_meta: MetaSearch.getTagMeta(document, logger),
            site_uid: (0, getSiteUID_1.getSiteUID)(window.location.host, logger),
            url: window.location.href,
        });
    }
}
exports.MetaSearch = MetaSearch;
MetaSearch.parseJSON = (stringIn, logger) => {
    try {
        return JSON.parse(stringIn);
    }
    catch (err) {
        logger.debugLog("Failed to parse JSON");
        return {};
    }
};
MetaSearch.setAllKeysToLowercase = (inputValue) => {
    if (!inputValue || typeof inputValue !== "object") {
        return inputValue;
    }
    if (Array.isArray(inputValue)) {
        return inputValue.map((x) => MetaSearch.setAllKeysToLowercase(x));
    }
    const newObj = {};
    Object.keys(inputValue).forEach((key) => {
        newObj[key.toLowerCase()] = MetaSearch.setAllKeysToLowercase(inputValue[key]);
    });
    return newObj;
};
MetaSearch.processOffers = (offerEntry) => {
    // Catch case is undefined:
    if (!offerEntry) {
        return [];
    }
    // Somethimes it's an array:
    if (Array.isArray(offerEntry)) {
        return offerEntry.map((offer) => MetaSearch.priceFromOffer(offer));
    }
    // Sometimes it's just a straight forward offer:
    if (MetaSearch.checkType(offerEntry, "offer")) {
        return [MetaSearch.priceFromOffer(offerEntry)];
    }
    // Sometimes it's an aggregate offer type:
    if (MetaSearch.checkType(offerEntry, "aggregateoffer")) {
        // These can aggregate multiple offers:
        if (offerEntry.offers) {
            return MetaSearch.processOffers(offerEntry.offers);
        }
        // But also have their own:
        return [MetaSearch.priceFromOffer(offerEntry)];
        // We don't support the hasVariant tag that some sites use here...
    }
    return [];
};
MetaSearch.processImages = (imageEntry) => {
    // Catch case undefined or null:
    if (!imageEntry) {
        return [];
    }
    // Sometimes it's just a string...
    if (typeof imageEntry === "string") {
        return [(0, getAbsolutePath_1.getAbsolutePath)(imageEntry)];
    }
    if (typeof imageEntry === "object") {
        // Sometimes it's an array (which I believe is against the spec...)
        if (Array.isArray(imageEntry)) {
            let imageListOut = [];
            imageEntry.forEach((imageEntry) => (imageListOut = [
                ...imageListOut,
                ...MetaSearch.processImages(imageEntry),
            ]));
            return imageListOut;
        }
        // Sometimes it's an ImageObject:
        if (MetaSearch.checkType(imageEntry, "imageobject")) {
            if (typeof imageEntry.url === "string") {
                return [(0, getAbsolutePath_1.getAbsolutePath)(imageEntry.url)];
            }
            if (typeof imageEntry.contenturl === "string") {
                return [(0, getAbsolutePath_1.getAbsolutePath)(imageEntry.contenturl)];
            }
        }
    }
    return [];
};
MetaSearch.processDescription = (productMeta) => {
    if (typeof productMeta["name"] === "string") {
        return productMeta["name"];
    }
    return null;
};
MetaSearch.processMeta = (parsedMeta, parsedMetaArray) => {
    var _a;
    if (!parsedMeta) {
        return;
    }
    if (typeof parsedMeta === "object") {
        const parsedMetaLowerCase = MetaSearch.setAllKeysToLowercase(parsedMeta);
        if (MetaSearch.checkType(parsedMetaLowerCase, "product") ||
            MetaSearch.checkType(parsedMetaLowerCase, "productgroup")) {
            parsedMetaArray.push(parsedMetaLowerCase);
            return;
        }
        if ("@context" in parsedMetaLowerCase &&
            ((_a = parsedMetaLowerCase["@context"]) === null || _a === void 0 ? void 0 : _a.includes("schema.org"))) {
            if ("@graph" in parsedMetaLowerCase &&
                Array.isArray(parsedMetaLowerCase["@graph"])) {
                parsedMetaLowerCase["@graph"].forEach((metaEntry) => MetaSearch.processMeta(metaEntry, parsedMetaArray));
                return;
            }
            if ("mainentity" in parsedMetaLowerCase &&
                typeof parsedMetaLowerCase.mainentity === "object") {
                MetaSearch.processMeta(parsedMetaLowerCase.mainentity, parsedMetaArray);
                return;
            }
        }
    }
};


/***/ }),

/***/ 4903:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE

PRICE detection

Prices are page Nodes (NOT necessarily Elements!) with the following applied properties:
- ms_ps_style						dict
- ms_ps_font_size				float
- ms_ps_is_crossed_out	bool

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PriceSearch = void 0;
const getParentElement_1 = __webpack_require__(836);
const CURRENCY_RE_1 = __webpack_require__(4071);
const DescriptionSearch_1 = __webpack_require__(7448);
const FULL_PRICE_RE_1 = __webpack_require__(7095);
const recursiveNodeSearch_1 = __webpack_require__(8674);
const PRICE_TEXT_LENGTH_THRESHOLD = 20;
class PriceSearch {
    // check is PRICE-TEXT!
    static checkIsPriceText(node, fullTextList, _otherArgs) {
        if (node.constructor.name === "Text") {
            const textNode = node;
            const trimmedText = textNode.wholeText.trim();
            if (trimmedText != "" &&
                trimmedText.length <= PRICE_TEXT_LENGTH_THRESHOLD) {
                fullTextList.push(trimmedText);
                return true;
            }
        }
        return false;
    }
    // Get text for analysis:
    static getAllPriceTextBelow(node, exclusions) {
        // build it recursively AND, of course, include shadow roots!:
        const fullTextList = [];
        (0, recursiveNodeSearch_1.recursiveNodeSearch)(node, PriceSearch.checkIsPriceText, exclusions, fullTextList, []);
        return fullTextList.join(" ");
    }
    // Search higher elements to include digits!
    static getHigherPrice(nodeIn, exclusions) {
        // Get parent element on entry:
        let currentInspectingNode = (0, getParentElement_1.getParentElement)(nodeIn);
        // max out after 4 levels higher as no point
        let count = 0;
        let fullText = "";
        var matchResult;
        while (currentInspectingNode !== null && count < 4) {
            // Now get the full text of below this node:
            fullText = PriceSearch.getAllPriceTextBelow(currentInspectingNode, exclusions);
            // Check for digits and if found then return:
            matchResult = fullText.match(/^.*\d.*$/);
            if (matchResult !== null) {
                return fullText.trim();
            }
            // increment:
            currentInspectingNode = (0, getParentElement_1.getParentElement)(currentInspectingNode);
            count++;
        }
        // default failed return:
        return "";
    }
    // check for price on a single element:
    static checkIfPrice(nodeIn, price_list, [exclusions]) {
        if (nodeIn.constructor.name === "Text") {
            const textNode = nodeIn;
            // remove surrounding space / new lines:
            let strippedText = textNode.wholeText.trim();
            // avoid inspecting empty or large "text" (scripts / images usually -- slows regex!):
            if (strippedText !== "" &&
                strippedText.length <= PRICE_TEXT_LENGTH_THRESHOLD) {
                // price most likely contains £ sign:
                // sometimes it is written as GBP '\.O./`
                // but needs to be either... or some other currency....
                const matchResult = strippedText.match(CURRENCY_RE_1.CURRENCY_RE);
                if (matchResult !== null) {
                    // also need some digits in there!
                    let matchResult = strippedText.match(/\d/);
                    // but sometimes the digits are in a separate text block
                    if (matchResult === null) {
                        strippedText = PriceSearch.getHigherPrice(nodeIn, exclusions);
                    }
                    // but ususally they aren't, and when we have them check that we have a PRICE:
                    if (strippedText !== "" &&
                        strippedText.length <= PRICE_TEXT_LENGTH_THRESHOLD) {
                        // Record sanitised value as we add to list:
                        price_list.push([nodeIn, strippedText.slice(0, 100)]);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    // check for price on a single element but use regex for prices burried in lots of text.
    static checkIfPriceRegex(node, priceList, [exclusions]) {
        if (node.constructor.name === "Text") {
            const textNode = node;
            // remove surrounding space / new lines:
            let strippedText = textNode.wholeText.trim();
            // avoid inspecting empty or large "text" (scripts / images usually -- slows regex!):
            if (strippedText !== "") {
                // price most likely contains £ sign:
                // sometimes it is written as GBP '\.O./`
                // but needs to be either... or some other currency....
                const preMatchResult = strippedText.match(FULL_PRICE_RE_1.FULL_PRICE_RE);
                const matchResult = preMatchResult ? preMatchResult : [];
                if (matchResult.length === 1) {
                    // Record sanitised value as we add to list:
                    priceList.push([textNode, matchResult[0].slice(0, 100)]);
                    return true;
                }
            }
        }
        return false;
    }
    static textWithPriceSearch(node, priceList, exclusions) {
        // Get all text in this element and below, unless excluded:
        // check all elements not in exclusion type list:
        const allTextList = DescriptionSearch_1.DescriptionSearch.getAllTextForElement(node, exclusions);
        const allText = allTextList.join(" ");
        // Check there is at least one price_symbol present and one digit:
        if (allText.match(CURRENCY_RE_1.CURRENCY_RE) !== null &&
            allText.match(/^.*\d.*$/) !== null) {
            priceList.push([node, allText.slice(0, 100)]);
        }
    }
    static containerAttribute(nodeList, priceList, attributeIDs) {
        if (nodeList.length < 1) {
            return;
        }
        if (!attributeIDs) {
            return;
        }
        const allText = nodeList
            .map((node) => attributeIDs.map((attribute) => node.getAttribute(attribute)).join(" "))
            .join(" ");
        priceList.push([nodeList[0], allText.slice(0, 100)]);
    }
    static allText(nodeList, priceExclusions, priceSettings, priceListBuilding) {
        if (nodeList.length < 1) {
            return;
        }
        const nodeText = nodeList.map((node) => DescriptionSearch_1.DescriptionSearch.getAllTextForElement(node, priceExclusions)
            .join(" ")
            .trim());
        const allText = nodeText.join(" ");
        if (allText !== "") {
            const currency = priceSettings.currency ? priceSettings.currency : "";
            const price_out = currency + " " + allText;
            priceListBuilding.push([nodeList[0], price_out.slice(0, 100)]);
        }
    }
    /*
  
     This part finds the most likely price:
  
    */
    static rgbToNumericValues(text) {
        return text
            .replace("rgb(", "")
            .replace(")", "")
            .split(",")
            .map((x) => parseInt(x, 10));
    }
    // Calculate style for each price element
    static getPriceStyleInfo(price) {
        if (price.ms_ps_style === undefined && price.parentElement) {
            // computationally intensive, use sparingly!:
            price.ms_ps_style = window.getComputedStyle(price.parentElement, null);
            // sanitise a few values for making decisions later:
            price.ms_ps_font_size = parseFloat(price.ms_ps_style["font-size"]);
            // remove strike throughs for all browser types... and to work on trouva:
            price.ms_ps_is_crossed_out = price.ms_ps_style["text-decoration"].match(/.*line-through.*/)
                ? true
                : price.ms_ps_style["webkitTextDecorationsInEffect"].match(/.*line-through.*/)
                    ? true
                    : false;
        }
    }
    static getUniquePriceList(priceList) {
        // Check we only have one of each node:
        const uniquePriceList = [];
        const priceMap = new Map();
        priceList.forEach((priceInfo) => {
            if (priceMap.get(priceInfo[0]) === undefined) {
                uniquePriceList.push(priceInfo);
                priceMap.set(priceInfo[0], true);
            }
        });
        return uniquePriceList;
    }
    // remove any parent price elements from the list as we want the lower children.
    static removePriceParents(priceList) {
        const priceListMap = new Map();
        priceList.forEach(([node]) => priceListMap.set(node, true)); // Maps allow storage using objects whereas object dict would not.
        const priceListOut = [];
        priceList.forEach((priceInfo) => {
            let isValid = true;
            let currentlyInspectingElement = priceInfo[0].parentElement;
            while (currentlyInspectingElement) {
                if (priceListMap.get(currentlyInspectingElement)) {
                    isValid = false;
                    break;
                }
                currentlyInspectingElement = currentlyInspectingElement.parentElement;
            }
            if (isValid) {
                priceListOut.push(priceInfo);
            }
        });
        return priceListOut;
    }
    // Get the best price from many prices....!
    static getBestPrice(priceList, logger, returnFirstIfTooMany = false) {
        // first remove any prices that are parents of other elements:
        const nonParentPriceList = PriceSearch.removePriceParents(priceList);
        nonParentPriceList.forEach(([node]) => PriceSearch.getPriceStyleInfo(node));
        let bestPrice;
        // Remove any striked out prices:
        const cleansedPriceList = nonParentPriceList.filter(([node]) => !node.ms_ps_is_crossed_out);
        if (cleansedPriceList.length > 0) {
            // Find the largest font size present:
            const largestFontSize = cleansedPriceList
                .map(([node]) => node.ms_ps_font_size)
                .reduce((prevValue, curValue) => prevValue && curValue && prevValue > curValue ? prevValue : curValue);
            // and get all price elements that match that size:
            const largestFontPriceList = cleansedPriceList.filter((x) => 
            // Handle case of NaN == NaN!
            Object.is(x[0].ms_ps_font_size, largestFontSize));
            // if is one then set best_price simply:
            if (largestFontPriceList.length === 1) {
                bestPrice = largestFontPriceList[0];
            }
            // If multiple, find the one closest to the largest image in the product:
            else if (largestFontPriceList.length > 1) {
                // Covers case e.g. amazon where price occurs more than once at same font size...
                // TODO: might want to extract and parsefloat the value... (issue 66)
                // will implement once this function has been refined on the back-end.
                const priceValuesSet = new Set(largestFontPriceList.map((x) => x[1]));
                if (priceValuesSet.size !== 1) {
                    // Covers case e.g. harvey nic's where there is a hidden price .....:
                    let largestVisibleFontPriceList = largestFontPriceList.filter(([node]) => { var _a; return ((_a = node.ms_ps_style) === null || _a === void 0 ? void 0 : _a.display) !== "none"; });
                    // And now look at the colours and pick the one that is the most red:
                    if (largestVisibleFontPriceList.length !== 1) {
                        largestVisibleFontPriceList.forEach(([node]) => {
                            var _a;
                            return (node.ms_rgb_col_red = PriceSearch.rgbToNumericValues((_a = node.ms_ps_style) === null || _a === void 0 ? void 0 : _a.color)[0]);
                        });
                        const max_array = Math.max(...largestVisibleFontPriceList.map(([node]) => { var _a; return (_a = node.ms_rgb_col_red) !== null && _a !== void 0 ? _a : 0; }));
                        largestVisibleFontPriceList = largestVisibleFontPriceList.filter(([node]) => node.ms_rgb_col_red === max_array);
                    }
                    let newPriceValuesSet = new Set(largestVisibleFontPriceList.map((x) => x[1]));
                    if (newPriceValuesSet.size !== 1) {
                        if (returnFirstIfTooMany === true) {
                            bestPrice = largestVisibleFontPriceList[0];
                        }
                        else {
                            logger.debugLog("%c    ", "background-color:skyblue;", "Too many prices...", largestVisibleFontPriceList);
                            bestPrice = undefined;
                        }
                    }
                    else {
                        bestPrice = largestVisibleFontPriceList[0];
                    }
                }
                else {
                    bestPrice = largestFontPriceList[0];
                }
            }
        }
        return bestPrice;
    }
}
exports.PriceSearch = PriceSearch;


/***/ }),

/***/ 3552:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

// Recursive search for matching element!

Note the difference between child and childnodes!

This function can deal with both child HTMLElements

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.recursiveElementSearch = recursiveElementSearch;
const EXCLUDED_ELEMENTS_1 = __webpack_require__(1420);
function recursiveElementSearch(elementIn, checkIfMatchFunction, exclusionList, matchList, otherArgs) {
    // check all elements not in exclusion type list:
    const isExcludedElement = EXCLUDED_ELEMENTS_1.EXCLUDED_ELEMENTS.includes(elementIn.constructor.name);
    if (isExcludedElement === false &&
        exclusionList.includes(elementIn) === false) {
        // And if not check if it is a match:
        checkIfMatchFunction(elementIn, matchList, otherArgs);
        // And now look through all elements' children recursively:
        for (let element of elementIn.children) {
            recursiveElementSearch(element, checkIfMatchFunction, exclusionList, matchList, otherArgs);
        }
        if (elementIn.shadowRoot) {
            for (let element of elementIn.shadowRoot.children) {
                // recursively inspect children nodes:
                recursiveElementSearch(element, checkIfMatchFunction, exclusionList, matchList, otherArgs);
            }
        }
    }
}


/***/ }),

/***/ 8674:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

// Recursive search for matching node!

Note the difference between child and childnodes!

This function can deal with child DOM Nodes (for text!)

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.recursiveNodeSearch = recursiveNodeSearch;
const EXCLUDED_ELEMENTS_1 = __webpack_require__(1420);
function recursiveNodeSearch(nodeIn, checkIfMatchFunction, exclusionList, matchList, otherArgs) {
    // check all elements not in exclusion type list:
    const isExcludedElement = EXCLUDED_ELEMENTS_1.EXCLUDED_ELEMENTS.includes(nodeIn.constructor.name);
    if (isExcludedElement === false && exclusionList.includes(nodeIn) === false) {
        // And if not check if it is a match:
        checkIfMatchFunction(nodeIn, matchList, otherArgs);
        // And now look through all node' child nodes recursively:
        for (let node of nodeIn.childNodes) {
            recursiveNodeSearch(node, checkIfMatchFunction, exclusionList, matchList, otherArgs);
        }
        if (nodeIn.shadowRoot !== null && nodeIn.shadowRoot !== undefined) {
            for (let node of nodeIn.shadowRoot.childNodes) {
                // recursively inspect child nodes:
                recursiveNodeSearch(node, checkIfMatchFunction, exclusionList, matchList, otherArgs);
            }
        }
    }
}


/***/ }),

/***/ 6381:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

Single function that gets main product data and reports it to the backend

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMainProductOnce = getMainProductOnce;
const convertToSimpleProductRepresentation_1 = __webpack_require__(9874);
const ImageSourceSearch_1 = __webpack_require__(8242);
const IndividualProductAdd_1 = __webpack_require__(3021);
const ProductSearch_1 = __webpack_require__(5585);
async function getProductFromSiteSettings(settings, logger) {
    if (!settings) {
        return undefined;
    }
    if (!logger.siteUID) {
        return undefined;
    }
    const { products, partialProducts } = ProductSearch_1.ProductSearch.getProducts(settings, "main", logger);
    let settingsProductData = undefined;
    let isComplete = true;
    if (products.length > 0) {
        settingsProductData = products[0];
    }
    // if we have a partial product with images that is only missing the price then use the images for that one with a priority:
    if (!settingsProductData) {
        const potentialPartialProducts = partialProducts.filter((x) => x[0].length === 1 && x[0][0] == "bestPrice");
        if (potentialPartialProducts.length > 0) {
            settingsProductData = potentialPartialProducts[0][1];
            isComplete = false;
        }
    }
    if (!settingsProductData) {
        return undefined;
    }
    ImageSourceSearch_1.ImageSourceSearch.getProductImageSources(settingsProductData, logger);
    return {
        ...(0, convertToSimpleProductRepresentation_1.convertToSimpleProductRepresentation)(settingsProductData, logger),
        isComplete,
    };
}
async function getMainProductOnce(settings, logger) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const siteSettingsProductInfo = await getProductFromSiteSettings(settings, logger);
    const guessedProductInfo = IndividualProductAdd_1.IndividualProductAdd.guessProductInfo(undefined, logger, false);
    const siteSettingsIsValid = (siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.description) &&
        (siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.link) &&
        (siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.price) &&
        ((_a = siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.images) === null || _a === void 0 ? void 0 : _a.length) &&
        ((_b = siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.images) === null || _b === void 0 ? void 0 : _b.length) > 0;
    const siteSettingsImages = (_c = siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.images) !== null && _c !== void 0 ? _c : [];
    const guessedImages = (_d = guessedProductInfo === null || guessedProductInfo === void 0 ? void 0 : guessedProductInfo.images) !== null && _d !== void 0 ? _d : [];
    const combinedImageList = (siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.isComplete)
        ? siteSettingsImages
        : [...new Set([...siteSettingsImages, ...guessedImages])];
    return {
        images: combinedImageList,
        link: (_f = (_e = siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.link) !== null && _e !== void 0 ? _e : guessedProductInfo === null || guessedProductInfo === void 0 ? void 0 : guessedProductInfo.link) !== null && _f !== void 0 ? _f : "",
        description: (_h = (_g = siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.description) !== null && _g !== void 0 ? _g : guessedProductInfo === null || guessedProductInfo === void 0 ? void 0 : guessedProductInfo.description) !== null && _h !== void 0 ? _h : "",
        price: (_k = (_j = siteSettingsProductInfo === null || siteSettingsProductInfo === void 0 ? void 0 : siteSettingsProductInfo.price) !== null && _j !== void 0 ? _j : guessedProductInfo === null || guessedProductInfo === void 0 ? void 0 : guessedProductInfo.price) !== null && _k !== void 0 ? _k : "",
        guessed: !siteSettingsIsValid,
    };
}


/***/ }),

/***/ 9292:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPageURL = void 0;
const amazonProc = (link, tld) => {
    var _a, _b;
    if (link.includes(`/sspa/click`)) {
        const urlParams = new URLSearchParams(link);
        link = (_a = urlParams.get("url")) !== null && _a !== void 0 ? _a : link;
    }
    if (link.includes(`www.amazon${tld}/gp/slredirect/picassoRedirect.html/`)) {
        const urlParams = new URLSearchParams(link);
        link = (_b = urlParams.get("url")) !== null && _b !== void 0 ? _b : link;
    }
    const splitDP = link.split("/dp/");
    if (splitDP.length > 1) {
        const productCode = link.split("/dp/")[1].split("/")[0];
        link = `www.amazon${tld}/dp/${productCode}`;
    }
    else {
    }
    return link;
};
const getPageURL = (link, siteUID, logger) => {
    var _a;
    try {
        let removeTrailing = true;
        switch (siteUID) {
            case "amazon.co.uk":
                link = amazonProc(link, ".co.uk");
                break;
            case "amazon.com":
                link = amazonProc(link, ".com");
                break;
            case "amazon.de":
                link = amazonProc(link, ".de");
                break;
            case "amazon.fr":
                link = amazonProc(link, ".fr");
                break;
            case "amazon.it":
                link = amazonProc(link, ".it");
                break;
            case "amazon.es":
                link = amazonProc(link, ".es");
                break;
            case "amazon.co.jp":
                link = amazonProc(link, ".co.jp");
                break;
            case "amazon.ca":
                link = amazonProc(link, ".ca");
                break;
            case "amazon.com.au":
                link = amazonProc(link, ".com.au");
                break;
            case "amazon.com.br":
                link = amazonProc(link, ".com.br");
                break;
            case "clarks.co.uk":
                if (link.includes("/c/")) {
                    const product_code = link.split("/p/")[1];
                    link = "www.clarks.co.uk/p/" + product_code;
                }
                break;
            case "burberry.com":
                link = link.replace("/beta/", "/");
                break;
            case "gapfactory.com":
                const matchObjGF = link.match(/pid=[^&]*/);
                if (matchObjGF) {
                    link = "gapfactory.com/browse/product.do/" + matchObjGF[0];
                }
                removeTrailing = false;
            case "warehouse.co.uk":
            case "massimodutti.com":
                const slashArray = link.split(siteUID)[1].split("/");
                link =
                    "www." + siteUID + "/" + slashArray[1] + "/" + slashArray.slice(-1);
                break;
            case "bymalenebirger.com":
                const slashArrayBMB = link.split(siteUID)[1].split("/");
                link =
                    "www." +
                        siteUID +
                        "/" +
                        slashArrayBMB[1] +
                        "/" +
                        slashArrayBMB[2] +
                        "/" +
                        slashArrayBMB.slice(-1);
                break;
            case "chintiandparker.com":
                const slashArray3 = link.split(siteUID)[1].split("/");
                link = "www." + siteUID + "/products/" + slashArray3.slice(-1);
                break;
            case "sessun.co.uk":
                if (link.includes("index.php/store/product/entry")) {
                    link = link.replace("index.php/store/product/entry", "catalogue");
                    link = link + ".html";
                }
                break;
            case "zimmermannwear.com":
                link = "www.zimmermannwear.com/" + link.split("/").slice(-1);
                break;
            case "net-a-porter.com":
                const linkPure = link.split("?")[0];
                link =
                    linkPure.split("/shop/product/")[0] +
                        "/shop/product/" +
                        linkPure.split("/").slice(-1)[0];
                break;
            case "made.com":
                const linkPureMade = link.split("?")[0];
                link = linkPureMade.replace(/\/$/, "");
                break;
            case "closetcase.eu":
                const matchObj = link.match(/ProductID=[^&]*/);
                if (matchObj) {
                    link = "closetcase.eu/product/" + matchObj[0];
                }
                break;
            case "joules.com":
                const matchObjJ = link.match(/id=[^&]*/);
                if (matchObjJ) {
                    link = "joules.com/id/" + matchObjJ[0];
                }
                break;
            case "connox.co.uk":
                const matchObjC = link.match(/itm=[^&]*/);
                if (matchObjC) {
                    link = "connox.co.uk/itm/" + matchObjC[0];
                }
                break;
            case "muji.eu":
                const matchObjM = link.match(/PID=[^&]*/);
                if (matchObjM) {
                    link = "muji.eu/" + matchObjM[0];
                }
                break;
            case "bouxavenue.com":
                const matchObjB = link.match(/pid=[^&^#]*/);
                if (matchObjB) {
                    link = "www.bouxavenue.com/product-variant?" + matchObjB[0];
                    removeTrailing = false;
                }
                break;
            case "shopcider.com":
                const matchObjS = link.match(/pid=[^&^#]*/);
                if (matchObjS) {
                    link = "www.shopcider.com/product/detail?" + matchObjS[0];
                    removeTrailing = false;
                }
                break;
            case "gap.com":
                const matchObjG = link.match(/pid=[^&^#]*/);
                if (matchObjG) {
                    link = "gap.com/browse/product.do?" + matchObjG[0];
                    removeTrailing = false;
                }
                break;
            case "truevintage.com":
                link =
                    "www.truevintage.com/products/" +
                        link.split("?")[0].split("/").slice(-1)[0];
                break;
            case "revolve.com":
                const revolveMatch = link.match(/\/dp\/[^/]+\//);
                if (revolveMatch) {
                    link = "www.revolve.com" + revolveMatch;
                }
                break;
            case "googleadservices.com":
            case "google.com":
            case "google.co.uk":
            case "google.de":
            case "google.fr":
            case "google.it":
            case "google.es":
            case "google.co.jp":
            case "google.ca":
            case "google.com.au":
            case "google.com.br":
                removeTrailing = false;
                break;
            case "superdry.com":
                const matchObjSD = link.match(/product_id=[^&^#]*/);
                if (matchObjSD) {
                    link = "www.superdry.com/products?" + matchObjSD[0];
                    removeTrailing = false;
                }
                break;
            case "vans.co.uk":
                const matchObjV = link.match(/productId=[^&^#]*/);
                if (matchObjV) {
                    link = "www.vans.co.uk/shop/ProductDisplay?" + matchObjV[0];
                    removeTrailing = false;
                }
                break;
            case "ralphlauren.com":
            case "ray-ban.com":
            case "oliverbonas.com":
            case "teespring.com":
            default:
        }
        if (link.includes("recs.richrelevance.com")) {
            const urlParams = new URLSearchParams(link);
            link = (_a = urlParams.get("ct")) !== null && _a !== void 0 ? _a : link;
        }
        return removeTrailing === true
            ? link
                .replace("http://", "")
                .replace("https://", "")
                .split("?")[0]
                .split("#")[0]
            : link;
    }
    catch (err) {
        logger.debugError(err, "Failed to calculate pageURL", link, siteUID);
        return undefined;
    }
};
exports.getPageURL = getPageURL;


/***/ }),

/***/ 9428:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

Single function that gets main product data and reports it to the backend

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runBGScrape = runBGScrape;
const sendBGMessageOneWay_1 = __webpack_require__(2106);
const getMainProductOnce_1 = __webpack_require__(6381);
const getPageURL_1 = __webpack_require__(9292);
async function runBGScrape(siteSettings, logger) {
    var _a;
    if (!document.querySelector("#msIsExtension") &&
        siteSettings.bgscrapeUID &&
        logger.siteUID) {
        logger.debugLog("Now running a BGScrape...");
        const productData = await (0, getMainProductOnce_1.getMainProductOnce)(siteSettings.settings, logger);
        const pageURL = (0, getPageURL_1.getPageURL)((_a = productData === null || productData === void 0 ? void 0 : productData.link) !== null && _a !== void 0 ? _a : window.location.href, logger.siteUID, logger);
        logger.debugLog("BGScrape to send to backend:", productData, pageURL);
        (0, sendBGMessageOneWay_1.sendBGMessageOneWay)({
            type: "api",
            protocol: "send_to",
            action: "send_bgscrape",
            data: Object.assign({}, productData, {
                bgscrape_uid: siteSettings.bgscrapeUID,
                page_url: pageURL !== null && pageURL !== void 0 ? pageURL : "UNKNOWN",
            }),
        });
    }
    else {
        logger.debugLog("Not running a BGScrape");
    }
}


/***/ }),

/***/ 9550:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runQueryTests = runQueryTests;
function runQueryTests(queries, containerQueries, sendResponse) {
    const response = [];
    const containersToUse = containerQueries
        ? [...new Set(containerQueries)]
        : [""];
    // For each container get the
    containersToUse.forEach((containerQuery) => {
        // First get the containers (if specified, otherwise return document):
        const foundCountainerElements = [];
        if (containerQuery) {
            document
                .querySelectorAll(containerQuery)
                .forEach((result) => foundCountainerElements.push(result));
        }
        else {
            foundCountainerElements.push(document);
        }
        // Now run each of the queries WITHIN this container's results:
        queries.forEach((query) => {
            if (query) {
                var resultsCount = 0;
                foundCountainerElements.forEach((container) => {
                    resultsCount += container.querySelectorAll(query).length;
                });
                if (resultsCount > 0) {
                    response.push([query, resultsCount, containerQuery]);
                }
            }
        });
    });
    sendResponse(response);
}


/***/ }),

/***/ 7792:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

// get all products and update the storage:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateCurrentProducts = updateCurrentProducts;
const ProductSearch_1 = __webpack_require__(5585);
// For printing products:
function productToString(product) {
    return product.bestPrice[1] + " " + product.bestDescription.slice(0, 40);
}
async function updateCurrentProducts(siteSettings, logger) {
    try {
        // First part is to get the main product:
        const mainProduct = ProductSearch_1.ProductSearch.getMainProduct(siteSettings, logger); // may be undefined...!
        logger.debugLog("%c    ", "background-color:skyblue", (mainProduct !== undefined ? "Found" : "Did not find") +
            " a main product", mainProduct !== undefined ? productToString(mainProduct) : "", mainProduct);
        // Second part is to get any tile products:
        const tileProductsPreValidation = ProductSearch_1.ProductSearch.getTileProducts(siteSettings, logger);
        logger.debugLog("%c    ", "background-color:skyblue;", "Valid Tile Products (Pre Filtering):", tileProductsPreValidation);
        // Assign each tile product a UID and also check that none of the containers are repeated and all have what they need:
        const tileProducts = ProductSearch_1.ProductSearch.extractOnlyUniqueTileProducts(tileProductsPreValidation, mainProduct, logger);
        logger.debugLog("%c    ", "background-color:skyblue", "Found " + String(tileProducts.length) + " tile products", tileProducts.map((x) => productToString(x)), tileProducts);
        // And update the product tracker to return list of all VALID products:
        // NOTE: This shoud probably be called from within the Product Tracker as the products are moved there:
        return {
            mainProduct,
            tileProducts,
        };
    }
    catch (err) {
        logger.debugError(err, "updateCurrentProducts: Unable to segment the products - critical!");
        throw err;
    }
}


/***/ }),

/***/ 9874:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

Convert a product to a simple representation equivalent to adding it manually...

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertToSimpleProductRepresentation = convertToSimpleProductRepresentation;
const serializeImage_1 = __webpack_require__(3147);
function convertToSimpleProductRepresentation(product, logger) {
    var _a, _b;
    if (product) {
        try {
            const imageList = [
                ...product.metaImageList.map((x) => (0, serializeImage_1.serializeImage)(x)),
                ...product.imageList.map((x) => (0, serializeImage_1.serializeImage)(x)),
            ];
            return {
                description: product.bestDescription,
                images: imageList
                    .filter((x) => x.sources.length > 0)
                    .map((x) => x.sources[0]),
                link: product.bestLink,
                price: (_b = (_a = product.bestPrice) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "",
            };
        }
        catch (err) {
            logger.debugLog(err, "convertToSimpleProductRepresentation: Unable to process product into simpler form, non-critical", product);
        }
    }
    return undefined;
}


/***/ }),

/***/ 3147:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

To get one serialized product image:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serializeImage = serializeImage;
const getAbsolutePath_1 = __webpack_require__(4156);
function serializeImage(image) {
    const imageAlt = "getAttribute" in image ? image.getAttribute("alt") : "";
    let sources = [];
    if (typeof image.ms_sources === "object") {
        sources = image.ms_sources
            .slice(0, 20)
            .map((x) => (0, getAbsolutePath_1.getAbsolutePath)(x.source_url));
    }
    // Prioritise the current source to avoid tiny images!
    sources.sort((x) => (x == image.currentSrc ? -1 : 1));
    return {
        alt: imageAlt ? imageAlt.slice(0, 300) : "",
        sources,
    };
}


/***/ }),

/***/ 9125:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

To get one serialized product:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serializeProduct = serializeProduct;
const serializeImage_1 = __webpack_require__(3147);
function serializeProduct(product, logger) {
    try {
        const serialisedData = {
            description_list: product.descriptionList,
            link_list: product.linkList,
            image_list: [
                ...product.metaImageList.map((x) => (0, serializeImage_1.serializeImage)(x)),
                ...product.imageList.map((x) => (0, serializeImage_1.serializeImage)(x)),
            ],
            price_list: product.priceList.map((x) => {
                return {
                    value: x[1],
                };
            }),
            best_description: product.bestDescription,
            best_link: product.bestLink,
            best_price: product.bestPrice[1],
            best_image: (0, serializeImage_1.serializeImage)(product.bestImage),
            page_url: product.pageURL,
            main_product: product.mainProduct === true ? true : false,
            site_uid: logger.siteUID,
        };
        return serialisedData;
    }
    catch (err) {
        logger.debugError(err, "serializeProduct: Unable to produce serialized product json, critical", product);
    }
}


/***/ }),

/***/ 5981:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

To get all the serialized products:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serializeProductList = serializeProductList;
const serializeProduct_1 = __webpack_require__(9125);
// Pass error up as no point sending on errored data:
function serializeProductList(keptProductsList, logger) {
    return {
        product_list: keptProductsList
            .map((x) => (0, serializeProduct_1.serializeProduct)(x, logger))
            .filter((x) => x != undefined),
    };
}


/***/ }),

/***/ 5402:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DropDownInterface = void 0;
const sendBGMessageOneWay_1 = __webpack_require__(2106);
/*
NON-STATIC MODULE

To send messages to the drop down interface and receive functions.

*/
class DropDownInterface {
    constructor(overlayManager) {
        this.callFunction = (message, _sender, sendResponse) => {
            if ((message.type = "dropdown")) {
                if (message.action === "call_script_function") {
                    if (typeof this.displayDetails[message.name] === "function") {
                        const functionToRun = this.displayDetails[message.name];
                        // Note: Cannot handle async functions that return a response(!):
                        if (functionToRun) {
                            sendResponse(functionToRun(...message.args));
                        }
                    }
                }
                else if (message.action === "closed_popup") {
                    this.overlayManager.reportDropdownClosed();
                }
            }
        };
        this.update = (displayDetails) => {
            // process functions:
            const displayDetailsOut = { ...displayDetails };
            Object.keys(displayDetailsOut).forEach((key) => {
                if (typeof displayDetailsOut[key] === "function") {
                    displayDetailsOut[key] = "FUNCTION";
                }
            });
            // process any non-serialised data that needs working on:
            // TODO, find a way to avoid typecasting if possible...
            (0, sendBGMessageOneWay_1.sendBGMessageOneWay)({
                type: "dropdown",
                action: "set",
                display_details: displayDetailsOut,
            });
            this.displayDetails = displayDetails;
        };
        this.close = () => {
            (0, sendBGMessageOneWay_1.sendBGMessageOneWay)({
                type: "dropdown",
                action: "close",
            });
        };
        this.overlayManager = overlayManager;
        // Add a listener for receiving messages that represent functions back fromt the render:
        chrome.runtime.onMessage.addListener(this.callFunction);
        this.displayDetails = {
            displayType: undefined,
        };
    }
}
exports.DropDownInterface = DropDownInterface;


/***/ }),

/***/ 2618:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OverlayManager = void 0;
const sendBGMessagePromise_1 = __webpack_require__(5104);
const checkCanViewAI_1 = __webpack_require__(2434);
const determinePageType_1 = __webpack_require__(3297);
const LocalCookie_1 = __webpack_require__(3738);
const ManualAddition_1 = __webpack_require__(5269);
const GeneralOverlay_1 = __webpack_require__(4375);
const InfoMessage_1 = __webpack_require__(1617);
const TopRightMenu_1 = __webpack_require__(7983);
const TopRightPopup_1 = __webpack_require__(6289);
class OverlayManager {
    constructor(siteUID, pageInspector) {
        this.siteUID_underscored = "UNSET";
        this.canViewAI = false;
        this.siteBlacklisted = false; // calculated for convenience
        this.setMainProduct = false;
        this.trminDropdown = false;
        // ensure tutorial doesn't get hidden once product is saved:
        this.tutorialShownOnce = false;
        // Update the content of the messages:
        // settings data undefined if not found settings info'
        // settings_run_here undefined if not found settings info'
        this.updateSiteSettings = (siteSettings) => {
            // From site settings add the site messages:
            this.siteSettings = siteSettings.settings;
            this.siteSettingsSetOnce = true;
            this.siteSettingsError = siteSettings.caughtError;
            // following updates views anyway:
            this.updateUserData(siteSettings.userUID !== undefined, siteSettings.userUID, siteSettings.userOwner, siteSettings.userVerifiedSettings);
            this.canViewAI = (0, checkCanViewAI_1.checkCanViewAI)(this.userVerifiedSettingsData, this.siteUID, this.siteSettings);
        };
        this.updateProductsInPage = (mainProduct, tileProducts) => {
            const pageType = (0, determinePageType_1.determinePageType)(mainProduct, tileProducts, this.pageInspector.logger);
            // Information about what is on this site page to show relevant tutorial:
            this.pageType = pageType;
            this.updateViews();
        };
        // signedIn undefined if not connected to Internet, i.e. this function has not been run yet:
        // userOwnerData undefined if not signed in.
        // Can be brought on by sitesettings update OR by receviving listener to userOwner in background script.
        this.updateUserData = (signedIn, userUID, userOwnerData, userVerifiedSettingsData) => {
            var _a;
            try {
                this.signedIn = signedIn;
                this.userUID = userUID;
                if (signedIn === true && userOwnerData !== undefined) {
                    this.userOwnerData = userOwnerData;
                    this.userVerifiedSettingsData = userVerifiedSettingsData;
                }
                else {
                    this.localCookie.getLocalCookie();
                    this.userOwnerData = undefined;
                    this.userVerifiedSettingsData = undefined;
                    // reset the working dict:
                    this.immediatelyHiddenViews = {};
                }
                this.siteBlacklisted =
                    (_a = (this.userOwnerData &&
                        this.userOwnerData.site_blacklist &&
                        this.userOwnerData.site_blacklist[this.siteUID_underscored] ===
                            true)) !== null && _a !== void 0 ? _a : false;
                this.canViewAI = (0, checkCanViewAI_1.checkCanViewAI)(this.userVerifiedSettingsData, this.siteUID, this.siteSettings);
            }
            catch (err) {
                this.pageInspector.logger.debugError(err, "Unable to update user owner data - critical!");
            }
            this.updateViews();
        };
        this.setLastSavedProductDetails = (lastSavedItemDetails) => {
            this.lastSavedItemDetails = lastSavedItemDetails;
            this.updateViews();
        };
        this.setTopRightMenuView = (nextView, inDropdown = this.trminDropdown) => {
            const oldView = this.topRightMenuView;
            this.trminDropdown = inDropdown;
            this.topRightMenuView = nextView;
            this.updateViews();
            // Work out if we need to display a message or not:
            if (nextView === undefined &&
                oldView &&
                [
                    "toolbar_home",
                    "add_manual_product_collection_choice",
                    "collection_membership_new_collection_manual",
                ].includes(oldView) &&
                this.signedIn &&
                this.showAutoPreHover !== true &&
                this.topRightPopupView !== "item_saved_successfully") {
                // equivalent to do manual check!
                this.setTopRightPopupView("product_not_saved");
                return;
            }
        };
        this.setTopRightPopupView = (nextView) => {
            this.topRightPopupView = nextView;
            this.updateViews();
        };
        this.setTopRightMenuBackView = (topRightMenuBackView) => {
            this.topRightMenuBackView = topRightMenuBackView;
        };
        this.closeTopRightMenu = () => {
            this.pageInspector.contentScript.doOpenMenu = false;
            this.setTopRightMenuView(undefined);
        };
        // (Hide the remember to hover for tile product pages, once per page)
        this.setHideHoverReminder = () => {
            this.hideHoverReminder = true;
            this.updateViews();
        };
        // Bound Callbacks:
        this.createNewCollection = async (newCollectionName, isManual) => {
            if (newCollectionName.length > 0) {
                this.workingDict["new_collection"] = true;
                this.updateViews();
                try {
                    const collectionUID = await this.pageInspector.collectionListManager.addNewCollection(newCollectionName);
                    if (collectionUID !== null) {
                        if (isManual) {
                            this.manualAddition.updateObjectCollectionsDict(collectionUID, true);
                        }
                        else {
                            this.pageInspector.productCollectionMembershipManager.setCollectionMemebership(collectionUID, true);
                        }
                    }
                    this.goBack();
                }
                catch (err) {
                    this.pageInspector.logger.debugError(err, "Failed to create new collection");
                    // TODO: Inform user about error?
                }
                finally {
                    delete this.workingDict["new_collection"];
                    this.updateViews();
                }
            }
        };
        this.reportDropdownClosed = () => {
            this.trminDropdown = false;
            this.pageInspector.contentScript.doOpenMenu = false;
            this.setTopRightMenuView(undefined);
        };
        this.onCollectionDisplayListUpdate = () => {
            // Update the manual adding collections dictionary:
            const nonPurchasedTypeCollections = this.pageInspector.productCollectionMembershipManager.collectionDisplayList.filter((x) => x[0].id !== "purchased");
            if (nonPurchasedTypeCollections.length >= 1) {
                const latestCollectionUID = nonPurchasedTypeCollections[0][0].id;
                this.manualAddition.setLatestCollection(latestCollectionUID);
            }
        };
        this.setPinned = () => {
            this.hideTutorialStep("tutorial_pin_reminder");
            (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                type: "api",
                protocol: "send_and_receive",
                action: "set_owner_data",
                dict_name: "pinned",
                sub_dict: true,
            }, this.pageInspector.logger);
        };
        // For closing an overlay and setting it to not be shown again:
        // TODO: Make separate function
        this.hideInfoMessage = (messageID) => {
            (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                type: "api",
                protocol: "send_and_receive",
                action: "set_owner_data",
                dict_name: "messages_to_unshow." + messageID,
                sub_dict: true,
            }, this.pageInspector.logger)
                .then(() => {
                // Will be updated via repaint triggered from firestore itself to be consistent across all tabs.
            })
                .catch((err) => {
                this.pageInspector.logger.debugError(err, "Could not hide tutorial, sendBGMessagePromise failed in hideTutorialStep - critical!!");
            });
        };
        // For closing an overlay and setting it to not be shown again:
        // TODO: Make separate function
        this.hideTutorialStep = (tutorialName) => {
            // immediately hide!
            this.immediatelyHiddenViews[tutorialName] = true;
            this.topRightClosedClick = true;
            this.updateViews();
            (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                type: "api",
                protocol: "send_and_receive",
                action: "set_owner_data",
                dict_name: "messages_to_unhide." + tutorialName,
                sub_dict: false,
            }, this.pageInspector.logger)
                .then(() => {
                // Will be updated via repaint triggered from firestore itself to be consistent across all tabs.
            })
                .catch((err) => {
                this.pageInspector.logger.debugError(err, "Could not hide tutorial, sendBGMessagePromise failed in hideTutorialStep - critical!!");
            });
        };
        this.goBack = () => {
            if (this.topRightMenuBackView) {
                this.setTopRightMenuView(this.topRightMenuBackView);
            }
        };
        this.openManualAdd = (product) => {
            // For calling from outside the overlay manager as well as when editing product data...
            this.setTopRightMenuView("loading", true);
            this.hideHoverReminder = false;
            this.pageInspector.productCollectionMembershipManager.setProduct(undefined);
            this.manualAddition.beginManualAdd(product);
            this.setTopRightMenuView("toolbar_home");
        };
        // TODO: Make separate function
        this.setUserOwnerOnOff = async (updateDictName, updateSiteUID, updateSubDict) => {
            // For controlling the buttons in the drop down menu (uses loading dots...)
            if (this.workingDict[updateDictName] !== true) {
                this.workingDict[updateDictName] = true;
                this.updateViews();
                this.pageInspector.logger.debugLog("turning on or off", updateDictName, updateSiteUID, updateSubDict);
                try {
                    await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                        type: "api",
                        protocol: "send_and_receive",
                        action: "set_owner_data",
                        dict_name: updateDictName + "." + updateSiteUID.replace(/\./g, "_"),
                        sub_dict: updateSubDict,
                    }, this.pageInspector.logger);
                    // rerun script if determining whether to use on site or not...:
                    if (updateDictName === "site_blacklist") {
                        this.pageInspector.scriptRunner.forceScriptToRun();
                        this.pageInspector.dropDownInterface.close();
                    }
                }
                catch (err) {
                    this.pageInspector.logger.debugLog("Error:", err);
                }
                finally {
                    this.updateViews();
                    // reload site settings for the disable moonsift option:
                    this.pageInspector.scriptRunner.forceScriptToRun();
                    delete this.workingDict[updateDictName];
                }
            }
        };
        this.updatePCMWithMainProduct = () => {
            // This condition is required to prevent an update loop:
            if (this.setMainProduct === false) {
                const mainProduct = this.pageInspector.productTracker.getMainProduct();
                if (mainProduct) {
                    this.pageInspector.productCollectionMembershipManager.setProduct(mainProduct);
                    this.setMainProduct = true;
                }
            }
        };
        this.closeMemebership = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            this.setTopRightMenuView(undefined);
            this.setLastSavedProductDetails({
                collectionItems: this.pageInspector.productCollectionMembershipManager
                    .addedToCollections,
                description: (_b = (_a = this.pageInspector.productCollectionMembershipManager.product) === null || _a === void 0 ? void 0 : _a.bestDescription) !== null && _b !== void 0 ? _b : "",
                imageURL: (_d = (_c = this.pageInspector.productCollectionMembershipManager.product) === null || _c === void 0 ? void 0 : _c.bestImage.currentSrc) !== null && _d !== void 0 ? _d : "",
                price: (_g = (_f = (_e = this.pageInspector.productCollectionMembershipManager.product) === null || _e === void 0 ? void 0 : _e.bestPrice) === null || _f === void 0 ? void 0 : _f[1]) !== null && _g !== void 0 ? _g : "",
                link: (_j = (_h = this.pageInspector.productCollectionMembershipManager.product) === null || _h === void 0 ? void 0 : _h.bestLink) !== null && _j !== void 0 ? _j : "",
            });
            if (this.pageInspector.productCollectionMembershipManager.addedToCollections
                .length > 0) {
                this.setTopRightPopupView("item_saved_successfully");
            }
        };
        this.updateGeneralOverlay = () => {
            var _a;
            let displayDetails = {
                displayType: undefined,
            };
            // Decide what is needed to display:
            // General overlay message custom to each user:
            if (!this.siteBlacklisted &&
                ((_a = this.userOwnerData) === null || _a === void 0 ? void 0 : _a.messages_to_unhide) !== undefined &&
                this.pageType !== undefined &&
                this.userOwnerData.messages_to_unhide["custom_message_v06"] === true &&
                this.immediatelyHiddenViews["custom_message_v06"] !== true &&
                this.userOwnerData.custom_message_v06 !== undefined) {
                displayDetails = {
                    displayType: "custom_message",
                    customMessage: this.userOwnerData.custom_message_v06,
                    closeFunction: () => this.hideTutorialStep("custom_message_v06"),
                };
            }
            // Forward to rendering object:
            if (displayDetails.displayType) {
                if (this.generalOverlay === undefined) {
                    this.generalOverlay = new GeneralOverlay_1.GeneralOverlay(this.pageInspector.logger);
                }
            }
            if (this.generalOverlay !== undefined && displayDetails) {
                this.generalOverlay.update(displayDetails);
            }
        };
        this.updateInfoMessage = () => {
            var _a;
            let displayDetails = {
                displayType: undefined,
            };
            // Decide what is needed to display:
            // SPRECIFIC SITE MESSAGES:
            if (!this.siteBlacklisted &&
                this.siteSettings !== undefined &&
                this.siteSettings.messages !== undefined) {
                for (let response of this.siteSettings.messages) {
                    // ensure it is not hidden:
                    if (!(((_a = this.userOwnerData) === null || _a === void 0 ? void 0 : _a.messages_to_unshow) !== undefined &&
                        this.userOwnerData.messages_to_unshow[response.id] === true)) {
                        displayDetails = {
                            displayType: "site_specific",
                            text: response.text,
                            closeFunction: () => this.hideInfoMessage(response.id),
                        };
                    }
                }
            }
            // Forward to rendering object:
            if (displayDetails.displayType) {
                if (this.infoMessage === undefined) {
                    this.infoMessage = new InfoMessage_1.InfoMessage(this.pageInspector.logger);
                }
            }
            if (this.infoMessage !== undefined && displayDetails) {
                this.infoMessage.update(displayDetails);
            }
        };
        this.updateTopRightPopup = () => {
            var _a;
            let displayDetails = {
                displayType: undefined,
            };
            // Decide what is needed to display:
            if (this.topRightPopupView) {
                displayDetails = {
                    displayType: this.topRightPopupView,
                    closeFunction: () => {
                        this.setTopRightPopupView(undefined);
                    },
                    setTopRightMenuView: this.setTopRightMenuView,
                    lastSavedItemDetails: this.lastSavedItemDetails,
                    logger: this.pageInspector.logger,
                    setTopRightPopupView: this.setTopRightPopupView,
                    authUserUID: (_a = this.userUID) !== null && _a !== void 0 ? _a : "",
                    canViewAI: this.canViewAI,
                    siteUID: this.pageInspector.contentScript.siteUID !== false
                        ? this.pageInspector.contentScript.siteUID
                        : "",
                };
            }
            // Forward to rendering object:
            if (displayDetails === null || displayDetails === void 0 ? void 0 : displayDetails.displayType) {
                if (this.topRightPopup === undefined) {
                    this.topRightPopup = new TopRightPopup_1.TopRightPopup(this.pageInspector.logger);
                }
            }
            if (this.topRightPopup !== undefined && displayDetails) {
                this.topRightPopup.update(displayDetails);
            }
        };
        // Extra function here to take advantage of return:
        this.getTopRightMenuDisplayDetails = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
            const siteUID = this.pageInspector.contentScript.siteUID !== false
                ? this.pageInspector.contentScript.siteUID
                : "";
            const hideTutorialToolbar = () => {
                this.tutorialToolbarClickClosed = true;
                this.hideTutorialStep("tutorial_toolbar_click");
            };
            const product = this.pageInspector.productCollectionMembershipManager.getProduct();
            const validProductData = product
                ? {
                    bestPrice: product.bestPrice[1],
                    bestDescription: product.bestDescription,
                }
                : undefined;
            const autoSingleProductProductArgs = {
                setTopRightMenuBackView: this.setTopRightMenuBackView,
                setTopRightMenuView: this.setTopRightMenuView,
                setCollectionMemebershipAuto: this.pageInspector.productCollectionMembershipManager
                    .setCollectionMemebership,
                closeMemebership: this.closeMemebership,
                validProductData,
                autoProductImageURL: this.pageInspector.productCollectionMembershipManager.productImageURL, // string
                autoCollectionDisplayList: this.pageInspector.productCollectionMembershipManager
                    .collectionDisplayList, // simple object
                autoAddWorkingDict: this.pageInspector.productCollectionMembershipManager.workingDict, // simple object
            };
            /*
              User triggered menus:
            */
            if (this.topRightMenuView) {
                // If sign in to be determined, show loading screen:
                if (this.signedIn === undefined) {
                    return {
                        displayType: "loading",
                        siteUID,
                        closeFunction: this.closeTopRightMenu,
                    };
                }
                // Not signed in takes priority over all other screens if one is requested:
                if (this.signedIn === false) {
                    return {
                        displayType: "not_signed_in",
                        closeFunction: this.closeTopRightMenu,
                    };
                }
                const showAutoPreHover = this.pageInspector.productTracker.getTileProducts().length > 0 &&
                    this.pageInspector.productTracker.getMainProduct() === undefined &&
                    this.hideHoverReminder !== true &&
                    !this.siteUID.includes("amazon");
                this.showAutoPreHover = showAutoPreHover; // is required for exiting and not showing the "item not saved" popup.
                const showSingleTileReminder = this.showAutoPreHover !== true &&
                    ((_b = (_a = this.userOwnerData) === null || _a === void 0 ? void 0 : _a.messages_to_unhide) === null || _b === void 0 ? void 0 : _b["tutorial_first_manual_save"]) === true &&
                    this.immediatelyHiddenViews["tutorial_first_manual_save"] !== true;
                const toReturn = {
                    hideOnClickOut: true, // bool
                    displayType: this.topRightMenuView,
                    // Promises:
                    setUserOwnerOnOff: this.setUserOwnerOnOff,
                    addManually: this.manualAddition.addManually,
                    createNewCollection: this.createNewCollection,
                    // Bog standard functions:
                    closeFunction: this.closeTopRightMenu,
                    goBack: this.goBack,
                    updateManualObject: this.manualAddition.updateManualObject,
                    updateManualCollectionsDict: this.manualAddition.updateObjectCollectionsDict,
                    updateManualImagesDict: this.manualAddition.updateObjectImagesDict,
                    unselectAllImages: this.manualAddition.unselectAllImages,
                    hideTutorialToolbar,
                    setHideHoverReminder: this.setHideHoverReminder,
                    hideSingleTileReminder: () => {
                        this.hideTutorialStep("tutorial_first_manual_save");
                    },
                    signedIn: this.signedIn, // bool
                    siteSettingsError: this.siteSettingsError === true, // bool
                    siteIntegrated: this.siteSettings !== undefined, //bool
                    siteRequested: ((_d = (_c = this.userOwnerData) === null || _c === void 0 ? void 0 : _c.site_requests) === null || _d === void 0 ? void 0 : _d[this.siteUID_underscored]) ===
                        true, //bool
                    showAutoPreHover, // bool
                    showSingleTileReminder, // bool
                    showTutorialToolbarClick: !(this.tutorialToolbarClickClosed === true) &&
                        ((_f = (_e = this.userOwnerData) === null || _e === void 0 ? void 0 : _e.messages_to_unhide) === null || _f === void 0 ? void 0 : _f["tutorial_toolbar_click"]) ===
                            true, // bool
                    siteUID: this.siteUID, // string
                    manualAddingDict: this.manualAddition.getManualObject(), // simple object
                    manualIsValid: this.manualAddition.checkManualIsValid(), //bool
                    workingDict: this.workingDict, // simple object
                    addProductWorking: this.manualAddition.working, // bool,
                    siteBlacklisted: this.siteBlacklisted, // bool
                    siteMessages: this.siteSettings ? this.siteSettings.messages : [], // simple object
                    userName: (_h = (_g = this.userOwnerData) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : "",
                    guessedProductData: this.manualAddition.guessedProduct, // simple object
                    collectionList: this.pageInspector.collectionListManager.collectionList, // simple object
                    canViewAI: this.canViewAI,
                    ...autoSingleProductProductArgs,
                };
                return toReturn;
            }
            /*
              When not to show anything:
            */
            if (this.topRightClosedClick === true ||
                this.siteSettingsSetOnce !== true ||
                this.siteBlacklisted === true ||
                this.signedIn === undefined) {
                return {
                    displayType: undefined,
                };
            }
            /*
              Messages independent of user-triggered menus:
            */
            // Not signed in:
            if (this.signedIn === false &&
                this.localCookie.cookieStorageSet === true &&
                ((_j = this.localCookie.cookieStorage) === null || _j === void 0 ? void 0 : _j.hide_sign_in_msg) !== true) {
                return {
                    displayType: "not_signed_in",
                    closeFunction: this.localCookie.setLocalCookieTrue,
                };
            }
            // Top right custom message
            if (((_l = (_k = this.userOwnerData) === null || _k === void 0 ? void 0 : _k.messages_to_unhide) === null || _l === void 0 ? void 0 : _l["custom_message_top_right_v06"]) === true &&
                this.immediatelyHiddenViews["custom_message_top_right_v06"] !== true &&
                !this.siteUID.includes("amazon") &&
                this.userOwnerData.custom_message_top_right_v06 !== undefined) {
                return {
                    displayType: "custom_message_top_right",
                    customMessageTopRight: this.userOwnerData.custom_message_top_right_v06,
                    closeFunction: () => this.hideTutorialStep("custom_message_top_right_v06"),
                    hideOnClickOut: false,
                };
            }
            // Top right upgrade message
            if (((_o = (_m = this.userOwnerData) === null || _m === void 0 ? void 0 : _m.messages_to_unhide) === null || _o === void 0 ? void 0 : _o["tutorial_upgrade_v06"]) ===
                true &&
                this.immediatelyHiddenViews["tutorial_upgrade_v06"] !== true) {
                return {
                    displayType: "tutorial_upgrade_v06",
                    closeFunction: () => this.hideTutorialStep("tutorial_upgrade_v06"),
                    hideOnClickOut: false,
                    hideTutorialToolbar,
                };
            }
            // Tutorial for saving tile products:
            if (this.pageType === "tiles_only" &&
                ((_q = (_p = this.userOwnerData) === null || _p === void 0 ? void 0 : _p.messages_to_unhide) === null || _q === void 0 ? void 0 : _q["tutorial_tiles_only_v06"]) ===
                    true &&
                this.immediatelyHiddenViews["tutorial_tiles_only_v06"] !== true) {
                return {
                    displayType: "tutorial_tiles_only",
                    closeFunction: () => this.hideTutorialStep("tutorial_tiles_only_v06"),
                    hideOnClickOut: false,
                };
            }
            // tutorial single product laptop:
            if (this.pageType === "single_product" &&
                ((_s = (_r = this.userOwnerData) === null || _r === void 0 ? void 0 : _r.messages_to_unhide) === null || _s === void 0 ? void 0 : _s["tutorial_single_product_laptop"]) === true &&
                this.immediatelyHiddenViews["tutorial_single_product_laptop"] !== true) {
                return {
                    displayType: "tutorial_single_product_laptop",
                    closeFunction: () => this.hideTutorialStep("tutorial_single_product_laptop"),
                    hideOnClickOut: false,
                };
            }
            // tutorial single product:
            if (this.pageType === "single_product" &&
                ((_u = (_t = this.userOwnerData) === null || _t === void 0 ? void 0 : _t.messages_to_unhide) === null || _u === void 0 ? void 0 : _u["tutorial_single_product_v06"]) === true &&
                this.immediatelyHiddenViews["tutorial_single_product_v06"] !== true) {
                this.updatePCMWithMainProduct();
                if (
                // Have we got any saves for this product?
                this.pageInspector.productCollectionMembershipManager.collectionDisplayList.filter((x) => x[1]).length === 0 ||
                    this.tutorialShownOnce === true) {
                    this.tutorialShownOnce = true;
                    return {
                        displayType: "tutorial_single_product",
                        closeFunction: () => {
                            this.hideTutorialStep("tutorial_single_product_v06");
                            this.closeMemebership();
                        },
                        hideOnClickOut: false,
                        ...autoSingleProductProductArgs,
                    };
                }
            }
            // reminder_single_product:
            if (this.pageType === "single_product" &&
                ((_w = (_v = this.userOwnerData) === null || _v === void 0 ? void 0 : _v.messages_to_unhide) === null || _w === void 0 ? void 0 : _w["reminder_single_product"]) ===
                    true &&
                this.immediatelyHiddenViews["reminder_single_product"] !== true) {
                this.updatePCMWithMainProduct();
                if (this.pageInspector.productCollectionMembershipManager.collectionDisplayList.filter((x) => x[1]).length === 0 ||
                    this.tutorialShownOnce === true) {
                    this.tutorialShownOnce = true;
                    return {
                        displayType: "reminder_single_product",
                        closeFunction: () => {
                            this.hideTutorialStep("reminder_single_product");
                            this.closeMemebership();
                        },
                        hideOnClickOut: false,
                        ...autoSingleProductProductArgs,
                    };
                }
                // Top right reminder popup to pin:
                if (((_y = (_x = this.userOwnerData) === null || _x === void 0 ? void 0 : _x.messages_to_unhide) === null || _y === void 0 ? void 0 : _y["tutorial_pin_reminder"]) ===
                    true &&
                    this.immediatelyHiddenViews["tutorial_pin_reminder"] !== true &&
                    ((_z = this.userOwnerData) === null || _z === void 0 ? void 0 : _z.pinned) !== true) {
                    return {
                        displayType: "tutorial_pin_reminder",
                        closeFunction: () => this.hideTutorialStep("tutorial_pin_reminder"),
                        setPinned: this.setPinned,
                    };
                }
            }
            // Default is to show nothing:
            return {
                displayType: undefined,
            };
        };
        this.updateTopRightMenu = () => {
            const displayDetails = this.getTopRightMenuDisplayDetails();
            /*
              Enact displays (Forward to rendering object):
            */
            // Dropdown Menu:
            if (this.trminDropdown === true) {
                this.pageInspector.dropDownInterface.update(displayDetails);
                if (this.topRightMenu !== undefined) {
                    this.topRightMenu.update({ displayType: undefined });
                }
                // Top Right Menu:
            }
            else {
                if (displayDetails.displayType) {
                    if (this.topRightMenu === undefined) {
                        this.topRightMenu = new TopRightMenu_1.TopRightMenu(false, this.pageInspector.logger);
                    }
                }
                if (this.topRightMenu !== undefined) {
                    this.topRightMenu.update(displayDetails);
                }
            }
        };
        this.updateViews = () => {
            try {
                //Max out to 1 per every 100 miliseconds!
                const triggerTime = new Date();
                const timeSinceLastRun = this.lastUpdateViews
                    ? triggerTime.getTime() - this.lastUpdateViews.getTime()
                    : "infinite";
                if (this.setUpSucceeded !== false &&
                    (timeSinceLastRun === "infinite" || timeSinceLastRun >= 100)) {
                    this.lastUpdateViews = triggerTime;
                    this.updateInfoMessage();
                    this.updateGeneralOverlay();
                    this.updateTopRightPopup();
                    this.updateTopRightMenu();
                }
                else {
                    // if not ready, then set a timer to execute it a bit later:
                    if (this.timeoutHandle) {
                        window.clearTimeout(this.timeoutHandle);
                    }
                    const delay = this.lastUpdateViews
                        ? triggerTime.getTime() - this.lastUpdateViews.getTime() + 20
                        : 1000;
                    this.timeoutHandle = window.setTimeout(this.updateViews, delay);
                }
            }
            catch (err) {
                this.pageInspector.logger.debugError(err, "Unable to update the OverlayManager object - semi-critical");
            }
        };
        this.siteUID = siteUID;
        this.pageInspector = pageInspector;
        this.workingDict = {};
        this.manualAddition = new ManualAddition_1.ManualAddition(this, this.pageInspector.logger);
        this.topRightClosedClick = false;
        this.tutorialToolbarClickClosed = false;
        this.localCookie = new LocalCookie_1.LocalCookie(this.updateViews, pageInspector.contentScript.logger);
        this.siteSettings = undefined;
        // For hiding tutorials etc. based on user_owner modifications, saves waiting for db update.
        this.immediatelyHiddenViews = {};
        try {
            // underscored site uid:
            this.siteUID_underscored = this.siteUID.replace(/\./g, "_");
        }
        catch (err) {
            this.pageInspector.logger.debugError(err, "Unable to set-up OverlayManager - semi-critical!");
            this.setUpSucceeded = false;
        }
    }
}
exports.OverlayManager = OverlayManager;


/***/ }),

/***/ 3738:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

NON-STATIC CLASS

A local cookie is used to record that we don't want to show the sign in message.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalCookie = void 0;
const getLocalStorage_1 = __webpack_require__(123);
const setLocalStorage_1 = __webpack_require__(5295);
class LocalCookie {
    constructor(updateViewsFunction, logger) {
        this.cookieStorageSet = false;
        this.setLocalCookieTrue = async () => {
            await (0, setLocalStorage_1.setLocalStorage)({ hide_sign_in_message: true });
            this.getLocalCookie();
        };
        this.getLocalCookie = async () => {
            try {
                const cookie = await (0, getLocalStorage_1.getLocalStorage)(["hide_sign_in_message"]);
                this.cookieStorage = {
                    hide_sign_in_msg: cookie.hide_sign_in_message === true,
                };
                this.cookieStorageSet = true;
            }
            catch (err) {
                this.logger.debugError(err, "Could not s/get cookie, sendBGMessagePromise failed in bgLocalCookie - semi-critical!");
            }
            this.updateViewsFunction();
        };
        this.logger = logger;
        this.updateViewsFunction = updateViewsFunction;
    }
}
exports.LocalCookie = LocalCookie;


/***/ }),

/***/ 5269:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ManualAddition = void 0;
const sendBGMessagePromise_1 = __webpack_require__(5104);
const IndividualProductAdd_1 = __webpack_require__(3021);
class ManualAddition {
    constructor(overlayManager, logger) {
        this.imageSrcList = [];
        this.working = false;
        this.updateObjectImagesDict = (key, value) => {
            var _a;
            const toUpdate = {};
            toUpdate.images = Object.assign({}, (_a = this.manualAddingDict.images) === null || _a === void 0 ? void 0 : _a[0]);
            // if value is null then flip it:
            toUpdate.images[key] =
                value !== null ? value : !(toUpdate.images[key] === true);
            this.updateManualObject(toUpdate);
        };
        this.updateObjectCollectionsDict = (key, value) => {
            var _a;
            const toUpdate = {};
            toUpdate.collections = Object.assign({}, (_a = this.manualAddingDict.collections) === null || _a === void 0 ? void 0 : _a[0]);
            // if value is null then flip it:
            toUpdate.collections[key] =
                value !== null ? value : !(toUpdate.collections[key] === true);
            this.updateManualObject(toUpdate);
        };
        this.updateManualObject = (input) => {
            if (input.price !== undefined) {
                const validValue = input.price.slice(0, 15);
                this.manualAddingDict.price = [validValue, validValue.length > 0];
            }
            if (input.link !== undefined) {
                const validValue = input.link.slice(0, 1000);
                this.manualAddingDict.link = [
                    validValue,
                    validValue.length > 0 &&
                        (validValue.startsWith("http://") ||
                            validValue.startsWith("https://")),
                ];
                // if link is changed then don't use the current page url...:
                this.pageURL = undefined;
            }
            if (input.description !== undefined) {
                const validValue = input.description.slice(0, 200);
                this.manualAddingDict.description = [validValue, validValue.length > 0];
            }
            if (input.images) {
                this.manualAddingDict.images = [
                    input.images,
                    Object.keys(input.images).filter((x) => { var _a; return (_a = input.images) === null || _a === void 0 ? void 0 : _a[parseInt(x)]; })
                        .length > 0,
                ];
            }
            if (input.collections) {
                this.manualAddingDict.collections = [
                    input.collections,
                    Object.keys(input.collections).filter((x) => { var _a; return (_a = input.collections) === null || _a === void 0 ? void 0 : _a[x]; })
                        .length > 0,
                ];
            }
            this.overlayManager.updateViews();
        };
        this.getManualObject = () => {
            // TODO, maybe do a deep copy?
            return { ...this.manualAddingDict };
        };
        this.beginManualAdd = (product) => {
            var _a, _b, _c, _d, _e, _f;
            const guessedProduct = IndividualProductAdd_1.IndividualProductAdd.guessProductInfo(product, this.logger, true);
            // Set pre-selected images...:
            const newImageDict = {};
            const imagesToMark = (_a = guessedProduct === null || guessedProduct === void 0 ? void 0 : guessedProduct.best_images_length) !== null && _a !== void 0 ? _a : 0;
            for (let i = 0; i < imagesToMark; i++) {
                newImageDict[i] = true;
            }
            this.updateManualObject({
                link: (_b = guessedProduct === null || guessedProduct === void 0 ? void 0 : guessedProduct.link) !== null && _b !== void 0 ? _b : "",
                description: (_c = guessedProduct === null || guessedProduct === void 0 ? void 0 : guessedProduct.description) !== null && _c !== void 0 ? _c : "",
                price: (_d = guessedProduct === null || guessedProduct === void 0 ? void 0 : guessedProduct.price) !== null && _d !== void 0 ? _d : "",
                images: newImageDict,
                collections: this.lastestCollectionToAddTo
                    ? { [this.lastestCollectionToAddTo]: true }
                    : {},
            });
            // Store pageURL to price matching for determining if we can do a price update with this data or not:
            this.initialProductData = {
                link: (_e = guessedProduct === null || guessedProduct === void 0 ? void 0 : guessedProduct.link) !== null && _e !== void 0 ? _e : "",
                price: (_f = guessedProduct === null || guessedProduct === void 0 ? void 0 : guessedProduct.price) !== null && _f !== void 0 ? _f : "",
            };
            this.pageURL = product === null || product === void 0 ? void 0 : product.pageURL;
            this.guessedProduct = guessedProduct;
        };
        this.getInitialProductValue = () => {
            return { ...this.initialProductData };
        };
        this.checkManualIsValid = () => {
            return (Object.values(this.manualAddingDict).filter((x) => x[1] === false)
                .length === 0);
        };
        this.addManually = async () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const imageLookup = (_a = this.manualAddingDict.images) === null || _a === void 0 ? void 0 : _a[0];
            const collectionLookup = (_b = this.manualAddingDict.collections) === null || _b === void 0 ? void 0 : _b[0];
            if (this.checkManualIsValid() &&
                this.guessedProduct &&
                imageLookup &&
                collectionLookup) {
                const imageURLs = this.guessedProduct.images.filter((x, index) => imageLookup[index] === true);
                const collectionsToAddTo = Object.keys(collectionLookup).filter((key) => collectionLookup[key] === true);
                const data = {
                    api: "add_product_manually",
                    description: (_c = this.manualAddingDict.description) === null || _c === void 0 ? void 0 : _c[0],
                    price: (_d = this.manualAddingDict.price) === null || _d === void 0 ? void 0 : _d[0],
                    link: (_e = this.manualAddingDict.link) === null || _e === void 0 ? void 0 : _e[0],
                    image_urls: imageURLs,
                    collections_to_add_to: collectionsToAddTo,
                    page_url: (_f = this.pageURL) !== null && _f !== void 0 ? _f : undefined,
                };
                const canPriceUpdate = ((_g = this.initialProductData) === null || _g === void 0 ? void 0 : _g.link) === data.link &&
                    ((_h = this.initialProductData) === null || _h === void 0 ? void 0 : _h.price) === data.price;
                this.working = true;
                this.overlayManager.updateViews();
                const response = await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                    type: "api",
                    protocol: "send_and_receive",
                    action: "add_product_manually",
                    data: { ...data, can_price_update: canPriceUpdate },
                }, this.logger);
                this.working = false;
                if (response.bgSuccess === true && response.message.success) {
                    this.overlayManager.setLastSavedProductDetails({
                        imageURL: data.image_urls[0],
                        price: (_j = data.price) !== null && _j !== void 0 ? _j : "",
                        description: (_k = data.description) !== null && _k !== void 0 ? _k : "",
                        link: (_l = data.link) !== null && _l !== void 0 ? _l : "",
                        collectionItems: response.message.collection_items.map((x) => ({
                            collectionUID: x.collection_uid,
                            itemUID: x.item_uid,
                        })),
                    });
                    this.overlayManager.setTopRightPopupView("item_saved_successfully");
                }
                else {
                    this.overlayManager.setTopRightPopupView("product_save_failed");
                }
                this.overlayManager.setTopRightMenuView(undefined);
            }
        };
        this.setLatestCollection = (latestCollectionUID) => {
            if (this.lastestCollectionToAddTo === undefined) {
                this.updateObjectCollectionsDict(latestCollectionUID, true);
            }
            this.lastestCollectionToAddTo = latestCollectionUID;
            this.overlayManager.updateViews();
        };
        this.unselectAllImages = () => {
            this.updateManualObject({ images: {} });
        };
        this.manualAddingDict = {};
        this.overlayManager = overlayManager;
        this.logger = logger;
    }
}
exports.ManualAddition = ManualAddition;


/***/ }),

/***/ 2434:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkCanViewAI = void 0;
const checkCanViewAI = (userVerifiedSettingsData, siteUID, siteSettings) => {
    if (!userVerifiedSettingsData) {
        return false;
    }
    if (!siteUID) {
        return false;
    }
    if (siteUID.includes("amazon")) {
        return false;
    }
    if (userVerifiedSettingsData.can_view_ai_extension !== true) {
        return false;
    }
    if ((siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.can_view_ai_extension) === false) {
        return false;
    }
    return true;
};
exports.checkCanViewAI = checkCanViewAI;


/***/ }),

/***/ 3297:
/***/ ((__unused_webpack_module, exports) => {


/*
single function

All this does is determine the type of page based on types of products.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.determinePageType = determinePageType;
function determinePageType(mainProduct, tileProducts, logger) {
    try {
        if (mainProduct !== undefined) {
            return "single_product";
        }
        // tiles ONLY (so main prod condition first)
        if (tileProducts.length > 0) {
            return "tiles_only";
        }
    }
    catch (err) {
        logger.debugError(err, "Failed to determine page type, non-critical");
    }
    return undefined;
}


/***/ }),

/***/ 869:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAILink = void 0;
const getAILink = (input) => {
    const params = new URLSearchParams({
        image: input.imageURL,
        price: input.price,
        description: input.description,
        url: input.link,
        site_uid: input.siteUID,
    });
    return `${"https://www.moonsift.com/search"}/extension?${params.toString()}`;
};
exports.getAILink = getAILink;


/***/ }),

/***/ 4375:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeneralOverlay = void 0;
const jsx_runtime_1 = __webpack_require__(201);
/*
NON-STATIC OBJECT

General overlay for all kinds of stuff:

Considering using something like alpine.js but worried this might modify the DOM of site components too!

*/
const preact_1 = __webpack_require__(2865);
const appendToDocument_1 = __webpack_require__(9484);
{
}
class GeneralOverlay {
    constructor(logger) {
        this.displayDetails = {
            displayType: undefined,
        };
        this.renderTutorialInnuds = (hideFunction, leftImageURL, innerText, buttonText) => {
            return ((0, jsx_runtime_1.jsx)("div", { class: "ms_general_overlay_bg_next", children: (0, jsx_runtime_1.jsxs)("div", { class: "ms_general_overlay_within_container", children: [leftImageURL !== undefined ? ((0, jsx_runtime_1.jsx)("div", { class: "ms_left_container", children: (0, jsx_runtime_1.jsx)("img", { class: "ms_left_image", src: leftImageURL }) })) : (""), (0, jsx_runtime_1.jsxs)("div", { class: "ms_right_container", style: "border-left:1px solid #CECFD1;", children: [(0, jsx_runtime_1.jsxs)("div", { class: "ms_centreflow", children: [(0, jsx_runtime_1.jsx)("img", { src: "${this.imagesURL}/logo.svg", class: "ms_logo" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_divider_set", style: "height:37px" }), innerText] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_rightflow", children: (0, jsx_runtime_1.jsx)("a", { href: "#", tabIndex: 1, class: "ms_button_next_click", onClick: (event) => {
                                            // instant close!
                                            this.topContainer.style.setProperty("display", "none", "important");
                                            hideFunction();
                                            event.preventDefault();
                                        }, children: (0, jsx_runtime_1.jsx)("div", { id: "ms_next_tutorial", class: "ms_button_next", children: buttonText }) }) })] })] }) }));
        };
        this.renderCustomMessage = (customMessage, closeFunction) => {
            const innerText = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_moonsift", children: "MOONSIFT" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_divider_set", style: "height:2px" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_body2light", children: ["$", customMessage.text] })] }));
            const buttonText = customMessage.button_text;
            return this.renderTutorialInnuds(closeFunction, customMessage.image_url, innerText, buttonText);
        };
        this.checkAppended = () => {
            if (this.topContainer.parentElement !== document.body) {
                (0, appendToDocument_1.appendToDocument)("body", [this.topContainer], this.logger);
            }
        };
        this.update = (displayDetails) => {
            this.checkAppended();
            if (this.setUpSucceeded === true) {
                let renderedPreact = "";
                if (displayDetails.displayType === "custom_message") {
                    renderedPreact = this.renderCustomMessage(displayDetails.customMessage, displayDetails.closeFunction);
                }
                // Do the showing or not:
                if (displayDetails.displayType !== undefined &&
                    this.topContainer.shadowRoot) {
                    // Do the rendering:
                    (0, preact_1.render)((0, jsx_runtime_1.jsx)("div", { id: "ms-bg-inside", class: "ms_general_overlay_bg", children: renderedPreact }), this.topContainer.shadowRoot);
                    // actually show it:
                    this.topContainer.style.setProperty("display", "flex", "important");
                }
                else {
                    this.topContainer.style.setProperty("display", "none", "important");
                }
                this.displayDetails = displayDetails;
            }
        };
        this.topContainer = document.createElement("div");
        this.imagesURL = chrome.runtime.getURL("images");
        this.logger = logger;
        this.setUpSucceeded = false;
        try {
            // Create and attach element:
            this.topContainer.setAttribute("id", "ms-bg");
            this.topContainer.setAttribute("class", "ms_div_factory");
            this.topContainer.style.setProperty("display", "none", "important");
            this.topContainer.attachShadow({ mode: "open" });
            if (this.topContainer.shadowRoot) {
                this.topContainer.shadowRoot.innerHTML =
                    '\
        <link rel="stylesheet" type="text/css" href="' +
                        chrome.runtime.getURL("ui/ms_go.css") +
                        '">';
            }
            (0, appendToDocument_1.appendToDocument)("body", [this.topContainer], logger);
            this.setUpSucceeded = true;
        }
        catch (err) {
            logger.debugError(err, "Unable to set-up overlay viewer - semi-critical!");
            this.setUpSucceeded = false;
        }
    }
}
exports.GeneralOverlay = GeneralOverlay;


/***/ }),

/***/ 1617:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InfoMessage = void 0;
const jsx_runtime_1 = __webpack_require__(201);
/*
NON-STATIC OBJECT

The Info message at the bottom of the screen

Considering using something like alpine.js but worried this might modify the DOM of site components too!

*/
const preact_1 = __webpack_require__(2865);
const appendToDocument_1 = __webpack_require__(9484);
class InfoMessage {
    constructor(logger) {
        this.getInsideMessage = (displayDetails) => {
            if (displayDetails.displayType !== undefined &&
                this.messageHidden !== true) {
                const images_url = chrome.runtime.getURL("images");
                return ((0, jsx_runtime_1.jsxs)("div", { id: "ms_info_message", class: "ms_info_message", children: [(0, jsx_runtime_1.jsx)("img", { height: "16px", width: "16px", class: "ms_info_message_logo", src: `${images_url}/logo.svg` }), (0, jsx_runtime_1.jsx)("div", { class: "ms_info_message_text", children: displayDetails.text }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                this.messageHidden = true;
                                this.update(this.displayDetails);
                                displayDetails.closeFunction();
                            }, children: (0, jsx_runtime_1.jsx)("img", { height: "11px", width: "11px", id: "ms_info_message_exit_cross", class: "ms_info_message_exit_cross", src: `${images_url}/exit_cross.svg` }) })] }));
            }
            else {
                return "";
            }
        };
        this.update = (displayDetails) => {
            try {
                if (this.setUpSucceeded === true &&
                    this.infoMessageBottomContainer.shadowRoot) {
                    // Do the inside rendering:
                    (0, preact_1.render)(this.getInsideMessage(displayDetails), this.infoMessageBottomContainer.shadowRoot);
                    // show or hide the message:
                    if (displayDetails.displayType === undefined ||
                        this.messageHidden === true) {
                        this.infoMessageBottomContainer.style.setProperty("display", "none", "important");
                    }
                    else {
                        this.infoMessageBottomContainer.style.setProperty("display", "flex", "important");
                    }
                    this.displayDetails = displayDetails;
                }
            }
            catch (err) {
                this.logger.debugError(err, "Unable to update Info Message fully - non-critical");
            }
        };
        this.messageHidden = false;
        this.infoMessageBottomContainer = document.createElement("div");
        this.logger = logger;
        this.displayDetails = { displayType: undefined };
        try {
            this.infoMessageBottomContainer.setAttribute("id", "ms-imb");
            this.infoMessageBottomContainer.setAttribute("class", "ms_div_factory");
            this.infoMessageBottomContainer.setAttribute("style", "\
        display: none !important;\
        flex-direction: row !important;\
        align-items: center !important;\
        align-content: center !important;\
        position:fixed !important;\
        bottom:8px !important;\
        z-index:2147483647 !important;\
        justify-content:space-around !important;\
        left:50% !important;\
        transform:translate(-50%,0) !important;\
      ");
            this.infoMessageBottomContainer.attachShadow({ mode: "open" });
            if (this.infoMessageBottomContainer.shadowRoot) {
                this.infoMessageBottomContainer.shadowRoot.innerHTML =
                    '\
          <link rel="stylesheet" type="text/css" href="' +
                        chrome.runtime.getURL("ui/ms_im.css") +
                        '">';
            }
            (0, appendToDocument_1.appendToDocument)("body", [this.infoMessageBottomContainer], logger);
            this.setUpSucceeded = true;
        }
        catch (err) {
            logger.debugError(err, "Unable to set-up info-message - non-critical");
            this.setUpSucceeded = false;
        }
    }
}
exports.InfoMessage = InfoMessage;


/***/ }),

/***/ 6261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoadingDots = void 0;
const jsx_runtime_1 = __webpack_require__(201);
class LoadingDots {
    static dotsCreateHTML(type, isOn, logger) {
        try {
            const visibility = isOn ? "visible" : "hidden";
            return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_dot_container", style: `visibility:${visibility};`, children: [(0, jsx_runtime_1.jsx)("div", { class: `ms_dot ms_dot_left_${type}` }), (0, jsx_runtime_1.jsx)("div", { class: `ms_dot ms_dot_centre_${type}` }), (0, jsx_runtime_1.jsx)("div", { class: `ms_dot ms_dot_right_${type}` })] }));
        }
        catch (err) {
            logger.debugError(err, "Failed to make loading dots properly - non-critical");
        }
    }
    static updateVisibility(container, isOn, logger) {
        try {
            const visibility = isOn ? "visible" : "hidden";
            container
                .getElementsByClassName("ms_dot_container")[0]
                .setAttribute("style", "visibility:" + visibility + ";");
        }
        catch (err) {
            logger.debugError(err, "Failed to update loading dots properly - non-critical");
        }
    }
    static renderDots(type, isOn) {
        const visibility = isOn ? "visible" : "hidden";
        return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_dot_container", style: `visibility:${visibility};`, children: [(0, jsx_runtime_1.jsx)("div", { class: `ms_dot ms_dot_left_${type}` }), (0, jsx_runtime_1.jsx)("div", { class: `ms_dot ms_dot_centre_${type}` }), (0, jsx_runtime_1.jsx)("div", { class: `ms_dot ms_dot_right_${type}` })] }));
    }
    static renderDotsAbsolute(type, isOn) {
        return (0, jsx_runtime_1.jsx)("div", { class: "ms_working_dots", children: this.renderDots(type, isOn) });
    }
}
exports.LoadingDots = LoadingDots;


/***/ }),

/***/ 7983:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopRightMenu = void 0;
const jsx_runtime_1 = __webpack_require__(201);
/*
NON-STATIC OBJECT

The Menu box at the top right of the screen + in the dropdown

Considering using something like alpine.js but worried this might modify the DOM of site components too!

This message is displayed when the user clicks the moonsift toolbar button....:

*/
const preact_1 = __webpack_require__(2865);
const appendToDocument_1 = __webpack_require__(9484);
const renderAddManualProduct_1 = __webpack_require__(9761);
const renderAddManualProductCollectionChoice_1 = __webpack_require__(1792);
const renderCannotReachMoonsift_1 = __webpack_require__(8250);
const renderCollectionMembershipNewCollection_1 = __webpack_require__(5979);
const renderCollectionMembershipNewCollectionManual_1 = __webpack_require__(8951);
const renderCustomMessageTopRight_1 = __webpack_require__(830);
const renderLoading_1 = __webpack_require__(1505);
const renderNotSignedIn_1 = __webpack_require__(4567);
const renderProductCollectionMembership_1 = __webpack_require__(3524);
const renderReminderSingleProduct_1 = __webpack_require__(9841);
const renderToolbarHome_1 = __webpack_require__(9181);
const renderToolbarOptions_1 = __webpack_require__(1244);
const renderTutorialPinReminder_1 = __webpack_require__(5308);
const renderTutorialSingleProduct_1 = __webpack_require__(2774);
const renderTutorialSingleProductLaptop_1 = __webpack_require__(8714);
const renderTutorialTilesOnly_1 = __webpack_require__(2050);
const renderTutorialUpgradeV06_1 = __webpack_require__(2535);
const renderNewTab_1 = __webpack_require__(6170);
const getLocalStorage_1 = __webpack_require__(123);
const openMenu_1 = __webpack_require__(1741);
const renderMoonsiftSite_1 = __webpack_require__(4630);
const renderReloadPage_1 = __webpack_require__(1115);
// Chosen by the user:
const renderMapUserSpecified = {
    loading: renderLoading_1.renderLoading,
    cannot_reach_moonsift: renderCannotReachMoonsift_1.renderCannotReachMoonsift,
    toolbar_home: renderToolbarHome_1.renderToolbarHome,
    add_manual_product_collection_choice: renderAddManualProductCollectionChoice_1.renderAddManualProductCollectionChoice,
    collection_membership_new_collection_manual: renderCollectionMembershipNewCollectionManual_1.renderCollectionMembershipNewCollectionManual,
    add_manual_product: renderAddManualProduct_1.renderAddManualProduct,
    product_collection_membership: renderProductCollectionMembership_1.renderProductCollectionMembership,
    collection_membership_new_collection: renderCollectionMembershipNewCollection_1.renderCollectionMembershipNewCollection,
    toolbar_options: renderToolbarOptions_1.renderToolbarOptions,
    // these here as can go back from create collection!
    tutorial_single_product: renderTutorialSingleProduct_1.renderTutorialSingleProduct,
    reminder_single_product: renderReminderSingleProduct_1.renderReminderSingleProduct,
};
// Chosen automatically (tutorials etc.):
const renderMapNonUserSpecfied = {
    not_signed_in: renderNotSignedIn_1.renderNotSignedIn,
    new_tab: renderNewTab_1.renderNewTab,
    moonsift_site: renderMoonsiftSite_1.renderMoonsiftSite,
    reload_page: renderReloadPage_1.renderReloadPage,
    tutorial_upgrade_v06: renderTutorialUpgradeV06_1.renderTutorialUpgradeV06,
    tutorial_pin_reminder: renderTutorialPinReminder_1.renderTutorialPinReminder,
    tutorial_tiles_only: renderTutorialTilesOnly_1.renderTutorialTilesOnly,
    tutorial_single_product_laptop: renderTutorialSingleProductLaptop_1.renderTutorialSingleProductLaptop,
    custom_message_top_right: renderCustomMessageTopRight_1.renderCustomMessageTopRight,
};
const renderMap = {
    ...renderMapUserSpecified,
    ...renderMapNonUserSpecfied,
};
class TopRightMenu {
    constructor(inDropdown = false, logger) {
        this.displayLoadingRefreshAdvice = false;
        this.clickOutDown = false;
        this.displayNewUserMessages = false;
        this.checkToDisplayNewUserMessages = async () => {
            var _a;
            // Dipslay the
            const installedDate = (_a = (await (0, getLocalStorage_1.getLocalStorage)(["install_date"])).install_date) !== null && _a !== void 0 ? _a : false;
            const timeNow = new Date();
            if (installedDate !== false &&
                timeNow.getTime() - installedDate < 1000 * 60 * 60 * 24) {
                this.displayNewUserMessages = true;
            }
        };
        this.retryFetchData = () => {
            this.logger.debugError(new Error("Data requested again"), "");
            (0, openMenu_1.openMenu)(this);
        };
        this.checkClick = (event) => {
            if (this.inDropdown !== true) {
                if (this.imbContainer &&
                    this.displayDetails.displayType &&
                    this.displayDetails.hideOnClickOut === true) {
                    const eventTarget = event.target;
                    if (!this.imbContainer.contains(eventTarget) && this.displayDetails) {
                        if (event.type === "mousedown") {
                            this.clickOutDown = true;
                        }
                        else if (this.clickOutDown === true) {
                            this.displayDetails.closeFunction();
                        }
                    }
                    else {
                        if (event.type === "mousedown") {
                            this.clickOutDown = false;
                        }
                    }
                }
            }
        };
        // Store the collection name locally in the UI:
        this.collectionNameInputOnChange = (event) => {
            const inputElement = event.target;
            const newCollectionName = inputElement.value;
            if (newCollectionName.length > 0 && newCollectionName.length <= 200) {
                this.newCollectionNameValid = true;
                this.newCollectionName = newCollectionName;
            }
            else {
                this.newCollectionNameValid = false;
                this.newCollectionName = newCollectionName;
            }
            this.update();
        };
        // Deals with typings being correct and not having to be detailed for each function...:
        this.doRenderFunction = (displayDetails) => {
            const standardArgs = {
                inDropdown: this.inDropdown,
                shadowRoot: this.imbContainerShadowRoot,
                newCollectionName: this.newCollectionName,
                newCollectionNameValid: this.newCollectionNameValid,
                displayLoadingRefreshAdvice: this.displayLoadingRefreshAdvice,
                displayNewUserMessages: this.displayNewUserMessages,
                collectionNameInputOnChange: this.collectionNameInputOnChange,
                retryFetchData: this.retryFetchData,
            };
            switch (displayDetails.displayType) {
                case "loading":
                    return (0, renderLoading_1.renderLoading)(standardArgs, displayDetails);
                case "add_manual_product_collection_choice":
                    return (0, renderAddManualProductCollectionChoice_1.renderAddManualProductCollectionChoice)(standardArgs, displayDetails);
                case "toolbar_home":
                    return (0, renderToolbarHome_1.renderToolbarHome)(standardArgs, displayDetails);
                case "add_manual_product":
                    return (0, renderAddManualProduct_1.renderAddManualProduct)(standardArgs, displayDetails);
                case "not_signed_in":
                    return (0, renderNotSignedIn_1.renderNotSignedIn)(standardArgs, displayDetails);
                case "new_tab":
                    return (0, renderNewTab_1.renderNewTab)(standardArgs, displayDetails);
                case "moonsift_site":
                    return (0, renderMoonsiftSite_1.renderMoonsiftSite)(standardArgs, displayDetails);
                case "reload_page":
                    return (0, renderReloadPage_1.renderReloadPage)(standardArgs, displayDetails);
                case "cannot_reach_moonsift":
                    return (0, renderCannotReachMoonsift_1.renderCannotReachMoonsift)(standardArgs, displayDetails);
                case "toolbar_options":
                    return (0, renderToolbarOptions_1.renderToolbarOptions)(standardArgs, displayDetails);
                case "tutorial_upgrade_v06":
                    return (0, renderTutorialUpgradeV06_1.renderTutorialUpgradeV06)(standardArgs, displayDetails);
                case "tutorial_pin_reminder":
                    return (0, renderTutorialPinReminder_1.renderTutorialPinReminder)(standardArgs, displayDetails);
                case "tutorial_tiles_only":
                    return (0, renderTutorialTilesOnly_1.renderTutorialTilesOnly)(standardArgs, displayDetails);
                case "tutorial_single_product":
                    return (0, renderTutorialSingleProduct_1.renderTutorialSingleProduct)(standardArgs, displayDetails);
                case "reminder_single_product":
                    return (0, renderReminderSingleProduct_1.renderReminderSingleProduct)(standardArgs, displayDetails);
                case "tutorial_single_product_laptop":
                    return (0, renderTutorialSingleProductLaptop_1.renderTutorialSingleProductLaptop)(standardArgs, displayDetails);
                case "product_collection_membership":
                    return (0, renderProductCollectionMembership_1.renderProductCollectionMembership)(standardArgs, displayDetails);
                case "collection_membership_new_collection":
                    return (0, renderCollectionMembershipNewCollection_1.renderCollectionMembershipNewCollection)({ ...standardArgs, isManual: false }, displayDetails);
                case "collection_membership_new_collection_manual":
                    return (0, renderCollectionMembershipNewCollectionManual_1.renderCollectionMembershipNewCollectionManual)(standardArgs, displayDetails);
                case "custom_message_top_right":
                    return (0, renderCustomMessageTopRight_1.renderCustomMessageTopRight)(standardArgs, displayDetails);
                default:
                    return ``;
            }
        };
        this.update = (displayDetails = this.displayDetails) => {
            try {
                if (this.setUpSucceeded !== false &&
                    this.designSystemLoaded === true &&
                    this.trmLoaded === true) {
                    // reset collection name:
                    if (displayDetails.displayType !== this.displayDetails.displayType) {
                        this.newCollectionName = "";
                    }
                    const htmlToRender = displayDetails.displayType !== undefined ? ((0, jsx_runtime_1.jsx)("div", { class: `ms_top_right ${this.inDropdown === true ? "" : "ms_top_right_on_page"}`, children: this.doRenderFunction(displayDetails) })) : (``);
                    // Do the inside rendering:
                    if (this.imbContainer.shadowRoot) {
                        (0, preact_1.render)(htmlToRender, this.imbContainer.shadowRoot);
                    }
                    // Also focus the textbox if required (must happen AFTER render!)
                    if (displayDetails.displayType !== this.displayDetails.displayType) {
                        const textBox = this.imbContainerShadowRoot.getElementById("ms_trm_nc_name");
                        if (textBox) {
                            textBox.focus();
                        }
                    }
                    // set up detecting mouse clicks:
                    if (displayDetails.displayType !== undefined) {
                        // will not add it multiple times:
                        document.addEventListener("mouseup", this.checkClick, false);
                        document.addEventListener("mousedown", this.checkClick, false);
                    }
                    else {
                        // not required to be present:
                        document.removeEventListener("mouseup", this.checkClick, false);
                        document.removeEventListener("mousedown", this.checkClick, false);
                        if (this.inDropdown) {
                            window.close();
                        }
                    }
                    // show or hide the message:
                    if (displayDetails.displayType === undefined) {
                        this.imbContainer.style.setProperty("display", "none", "important");
                        this.bgContainer.style.setProperty("display", "none", "important");
                    }
                    else {
                        this.imbContainer.style.setProperty("display", "flex", "important");
                        if (displayDetails.displayType === "product_collection_membership" ||
                            displayDetails.displayType ===
                                "collection_membership_new_collection" ||
                            displayDetails.displayType === "tutorial_tiles_only" ||
                            displayDetails.displayType === "tutorial_single_product_laptop" ||
                            displayDetails.displayType === "tutorial_upgrade_v06") {
                            this.bgContainer.style.setProperty("display", "flex", "important");
                        }
                        else {
                            this.bgContainer.style.setProperty("display", "none", "important");
                        }
                    }
                }
                this.displayDetails = displayDetails;
            }
            catch (err) {
                this.logger.debugError(err, "Unable to update Info Message fully - non-critical");
            }
        };
        this.logger = logger;
        this.displayDetails = {
            displayType: undefined,
        };
        this.inDropdown = inDropdown;
        this.newCollectionNameValid = false;
        this.newCollectionName = "";
        this.imbContainer = document.createElement("div");
        this.imbContainer.attachShadow({ mode: "open" });
        this.imbContainerShadowRoot = this.imbContainer.shadowRoot;
        this.bgContainer = document.createElement("div");
        this.designSystemLoaded = false;
        this.trmLoaded = false;
        this.manualImageSelection = {};
        this.workingDict = {};
        this.setUpSucceeded = false;
        try {
            this.imbContainer.setAttribute("id", "ms-top-right-menu");
            this.imbContainer.setAttribute("class", "ms_div_factory");
            this.imbContainer.setAttribute("style", `
        display: none !important;
        flex-direction: row !important;
        align-items: center !important;
        align-content: center !important;
        position:${inDropdown ? "absolute" : "fixed"}  !important;
        top:${inDropdown ? "0px" : "10px"} !important;
        z-index:${inDropdown ? "100" : "2147483647"} !important;
        justify-content:space-around !important;
        right:${inDropdown ? "0px" : "10px"} !important;
      `);
            this.imbContainerShadowRoot.innerHTML = `
          <link rel="stylesheet" type="text/css" href="${chrome.runtime.getURL("ui/design_system.css")}" >
          <link rel="stylesheet" type="text/css" href="${chrome.runtime.getURL("ui/ms_trm.css")}" >
        `;
            const designSystemLink = this.imbContainerShadowRoot
                .children[0];
            designSystemLink.onload = () => {
                this.designSystemLoaded = true;
                this.update();
            };
            const trmStyleLink = this.imbContainerShadowRoot
                .children[1];
            trmStyleLink.onload = () => {
                this.trmLoaded = true;
                this.update();
            };
            (0, appendToDocument_1.appendToDocument)("body", [this.imbContainer], logger);
            this.bgContainer.setAttribute("id", "ms-top-right-menu-bg");
            this.bgContainer.setAttribute("class", "ms_div_factory");
            this.bgContainer.setAttribute("style", `
        display: none !important;
        position:fixed !important;
        top:0px !important;
        left:0px !important;
        height:100% !important;
        width:100% !important;
        z-index:2147483646 !important;
        justify-content:space-around !important;
        background-color:#000000CC !important;
      `);
            (0, appendToDocument_1.appendToDocument)("body", [this.bgContainer], logger);
            this.setUpSucceeded = true;
            this.checkToDisplayNewUserMessages();
            if (inDropdown === true) {
                setTimeout(() => {
                    if (this.displayDetails.displayType === "loading") {
                        this.displayLoadingRefreshAdvice = true;
                        this.update();
                        // Report an error
                        this.logger.debugError(new Error("Loading in top bar displayed for more than 4 seconds"), "on site" + this.displayDetails.siteUID);
                    }
                }, 4000);
            }
        }
        catch (err) {
            this.logger.debugError(err, "Unable to set-up top-right-menu-message - critical!");
            this.setUpSucceeded = false;
        }
    }
}
exports.TopRightMenu = TopRightMenu;


/***/ }),

/***/ 9571:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getContainerHeight = getContainerHeight;
function getContainerHeight(limit) {
    return ((window.innerHeight < limit - 20 ? window.innerHeight - 20 : limit) + "px");
}


/***/ }),

/***/ 1060:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderAddAutoProduct = renderAddAutoProduct;
const jsx_runtime_1 = __webpack_require__(201);
const renderCollectionMembership_1 = __webpack_require__(9529);
function renderAddAutoProduct({ shadowRoot, includeTutorialMessage = false, }, { closeFunction, setTopRightMenuBackView, setTopRightMenuView, displayType, autoProductImageURL, validProductData, autoCollectionDisplayList, autoAddWorkingDict, setCollectionMemebershipAuto, }) {
    // really should not be undefined:
    if (validProductData !== undefined) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_product_summary", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_trm_product_summary_image_col", children: (0, jsx_runtime_1.jsx)("img", { class: "ms_trm_product_summary_image", src: autoProductImageURL !== null && autoProductImageURL !== void 0 ? autoProductImageURL : "" }) }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_product_summary_text_col", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody3 ms_trm_product_summary_title", style: "font-weight:300;", children: validProductData.bestDescription }), (0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody3 ms_trm_product_summary_price", style: "font-weight:bold;", children: validProductData.bestPrice }), (0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody6 ms_trm_not_right_deetz", children: "Not the right details? Try saving the item from your toolbar instead" })] })] }), includeTutorialMessage === true ? ((0, jsx_runtime_1.jsx)("div", { class: "ms_heading5", style: "padding:20px;background-color:#FBFBFB;border:1px solid #EFEFEF;border-weight: 1px 0px;", children: "Choose a collection to add to or create a new one, then click 'Done'." })) : (""), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_collection_list_and_done_container", children: [(0, renderCollectionMembership_1.renderCollectionMembership)({
                            collectionMembershipList: autoCollectionDisplayList,
                            membershipWorkingDict: autoAddWorkingDict,
                            openNewCollection: () => {
                                setTopRightMenuBackView(displayType);
                                setTopRightMenuView("collection_membership_new_collection");
                            },
                            setCollectionMemebership: setCollectionMemebershipAuto,
                            shadowRoot: shadowRoot,
                        }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_done_button_container ms_trm_grey_done_bg", onClick: closeFunction, children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_white", style: "width:100%", children: "Done" }) })] })] }));
    }
    return "";
}


/***/ }),

/***/ 9761:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderAddManualProduct = renderAddManualProduct;
const jsx_runtime_1 = __webpack_require__(201);
const LoadingDots_1 = __webpack_require__(6261);
const renderImageTiles_1 = __webpack_require__(4327);
const renderOverlayOfManualCollectionChoice_1 = __webpack_require__(6693);
const renderOverlayOfSingleTileReminder_1 = __webpack_require__(4336);
function renderAddManualProduct({ inDropdown, shadowRoot, showChoice = false, }, { setTopRightMenuView, addManually, updateManualObject, updateManualCollectionsDict, updateManualImagesDict, unselectAllImages, hideSingleTileReminder, setUserOwnerOnOff, workingDict, addProductWorking, siteRequested, showSingleTileReminder, manualAddingDict, manualIsValid, siteIntegrated, siteUID, guessedProductData, collectionList, }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const onManualInput = (event) => {
        if (event.target) {
            const textInput = event.target;
            updateManualObject({
                [textInput.name]: textInput.value,
            });
        }
        event.preventDefault();
    };
    // feel like this should be in OverlayManager...
    const savedToList = collectionList.filter((entry) => { var _a; return ((_a = manualAddingDict === null || manualAddingDict === void 0 ? void 0 : manualAddingDict["collections"]) === null || _a === void 0 ? void 0 : _a[0][entry.id]) === true; });
    const saveToText = savedToList.length === 0
        ? "Choose..."
        : savedToList.length === 1
            ? savedToList[0].name
            : savedToList.length + " collections";
    const urlToAdd = manualAddingDict &&
        manualAddingDict["link"] &&
        manualAddingDict["link"].length > 0
        ? manualAddingDict["link"][0]
        : "";
    // Really should be true!
    if (guessedProductData) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:0px 20px;height:100%;", children: [(0, jsx_runtime_1.jsxs)("div", { class: "ms_body5", style: "font-weight:500;padding-bottom:10px;display:flex;justify-content: space-between;", children: [(0, jsx_runtime_1.jsx)("p", { style: "margin:0px", children: "Choose images of the item to save:" }), (0, jsx_runtime_1.jsx)("a", { style: "cursor:pointer;color:#707070;", onClick: unselectAllImages, children: "Unselect all" })] }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_scrollable_box ms_trm_image_tile_box", style: inDropdown ? "height:200px;" : "height:256px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_trm_image_tile_first_box", children: (0, renderImageTiles_1.renderImageTiles)({
                                        updateManualImagesDict,
                                        manualAddingDict,
                                        listIn: guessedProductData.images.slice(0, 1),
                                        startAt: 0,
                                        bigTile: true,
                                    }) }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_image_tile_second_box", children: (0, renderImageTiles_1.renderImageTiles)({
                                        updateManualImagesDict,
                                        manualAddingDict,
                                        listIn: guessedProductData.images.slice(1, 3),
                                        startAt: 1,
                                        bigTile: false,
                                    }) }), (0, renderImageTiles_1.renderImageTiles)({
                                    updateManualImagesDict,
                                    manualAddingDict,
                                    listIn: guessedProductData.images.slice(3),
                                    startAt: 3,
                                    bigTile: false,
                                })] }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_textbox_container", style: "margin-top:20px;", children: [(0, jsx_runtime_1.jsx)("input", { name: "description", onInput: onManualInput, type: "text", class: "ms_text_input ms_text_input_required", placeholder: "Click here to add the product description", value: (_b = (_a = manualAddingDict["description"]) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "", maxLength: 200 }), (0, jsx_runtime_1.jsx)("div", { class: "ms_one_pixel_line" }), (0, jsx_runtime_1.jsx)("input", { name: "price", onInput: onManualInput, type: "text", class: "ms_text_input ms_text_input_required", placeholder: "Click here to add the price", value: (_d = (_c = manualAddingDict["price"]) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : "", maxLength: 15 })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_textbox_container", style: "margin-top:16px;", children: (0, jsx_runtime_1.jsx)("input", { name: "link", onInput: onManualInput, type: "text", class: "ms_text_input ms_text_input_required", placeholder: "Click here to add the link", value: (_f = (_e = manualAddingDict["link"]) === null || _e === void 0 ? void 0 : _e[0]) !== null && _f !== void 0 ? _f : "", maxLength: 1000 }) }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flex", style: "margin-top:16px;", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => setTopRightMenuView("add_manual_product_collection_choice"), class: "ms_trm_collection_button_left", style: `background-image:url('${chrome.runtime.getURL("images/speech_left.svg")}`, children: [(0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "align-items:flex-start;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody6", style: "color:#707070;font-weight:500;", children: "Save to:" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody1", style: "color:#000000;font-weigth:500;margin-top:-2px;text-overflow: ellipsis;white-space: nowrap;overflow-x: hidden;width: 120px;text-align:left;", children: saveToText })] }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/down_arrow.svg") })] }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_button_with_feedback", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: addManually, class: `ms_button_base ms_button_rounded_primary ${manualIsValid ? "" : "ms_button_rounded_primary_disabled"} ${addProductWorking === true
                                                ? "ms_button_rounded_primary_working"
                                                : ""}`, style: "width:134px;", children: ["Save", LoadingDots_1.LoadingDots.renderDotsAbsolute("standard", addProductWorking === true)] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody6", style: "color:#AE1A26;margin-top:4px;text-align:center;height:16px;", children: ((_g = manualAddingDict["price"]) === null || _g === void 0 ? void 0 : _g[1]) === false
                                                ? "Add a price to save"
                                                : ((_h = manualAddingDict["images"]) === null || _h === void 0 ? void 0 : _h[1]) === false
                                                    ? "Select image(s) to save"
                                                    : ((_j = manualAddingDict["link"]) === null || _j === void 0 ? void 0 : _j[1]) === false
                                                        ? "Add a link with http(s) to save"
                                                        : ((_k = manualAddingDict["collections"]) === null || _k === void 0 ? void 0 : _k[1]) === false
                                                            ? "Select collection(s) to save"
                                                            : ((_l = manualAddingDict["description"]) === null || _l === void 0 ? void 0 : _l[1]) === false
                                                                ? "Add a description to save"
                                                                : "" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_bottom_message ms_trm_bottom_bar_grey", style: "height:20px;justify-content:flex-start;margin-top: 12px;", children: (0, jsx_runtime_1.jsx)("div", { class: "ms_body5 ms_ellipsis", style: "position:relative;", children: siteIntegrated === true ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("a", { target: "_blank", class: "ms_link", href: `${"https://www.moonsift.com"}/extensionissue?site_uid=${siteUID}&url=${encodeURIComponent(urlToAdd)}&exversion=chrome_${chrome.runtime.getManifest().version}_${"4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085"}&from=add_manually`, children: "Report a problem" }), " ", "with save buttons on ", siteUID, "."] })) : workingDict["site_requests"] === true ? (LoadingDots_1.LoadingDots.renderDotsAbsolute("standard", true)) : siteRequested !== true ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("a", { class: "ms_link", onClick: () => setUserOwnerOnOff("site_requests", siteUID, true), children: "Request" }), " ", "we add quick-save buttons on ", siteUID] })) : (`
                      Save buttons on ${siteUID} requested
                  `) }) }), showSingleTileReminder
                    ? (0, renderOverlayOfSingleTileReminder_1.renderOverlayOfSingleTileReminder)({
                        hideSingleTileReminder,
                        inDropdown,
                    })
                    : showChoice
                        ? (0, renderOverlayOfManualCollectionChoice_1.renderOverlayOfManualCollectionChoice)({
                            shadowRoot,
                            inDropdown,
                            setTopRightMenuView,
                            updateManualCollectionsDict,
                            workingDict,
                            manualAddingDict,
                            collectionList,
                        })
                        : ""] }));
    }
    else {
        return "";
    }
}


/***/ }),

/***/ 1792:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderAddManualProductCollectionChoice = renderAddManualProductCollectionChoice;
const renderToolbarHome_1 = __webpack_require__(9181);
function renderAddManualProductCollectionChoice(args, details) {
    return (0, renderToolbarHome_1.renderToolbarHome)({ ...args, manualAddShowCollection: true }, details);
}


/***/ }),

/***/ 8250:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderCannotReachMoonsift = renderCannotReachMoonsift;
const jsx_runtime_1 = __webpack_require__(201);
const renderTopBar_1 = __webpack_require__(4109);
function renderCannotReachMoonsift({ inDropdown }, { closeFunction, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: "height:533px;", children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_logo_menu", children: "MOONSIFT" }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/sign_in_bg.png"), style: "width:360px;opacity:0.3;" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:20px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", style: "margin-bottom:10px;", children: "Cannot reach Moonsift." }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "margin-bottom:10px;font-weight:300;", children: "Please check you are connected to the Internet." })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_done_button_container", children: [(0, jsx_runtime_1.jsx)("a", { href: `${"https://www.moonsift.com"}/extensionissue?site_uid=cannot_reach&exversion=chrome_${chrome.runtime.getManifest().version}_${"4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085"}&from=cannot_reach`, target: "_blank", style: "display:flex;margin-right:16px;", children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_white", children: "Report a problem" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: closeFunction, class: "ms_button_base ms_button_primary_black", children: "Close" })] })] }));
}


/***/ }),

/***/ 9529:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderCollectionMembership = renderCollectionMembership;
const jsx_runtime_1 = __webpack_require__(201);
const LoadingDots_1 = __webpack_require__(6261);
const renderCollection = ({ collection, membershipWorkingDict, isManual = undefined, setCollectionMemebership, }) => {
    const action = "ms_collection_" + (collection[1] ? "remove" : "add");
    const bgStyle = "ms_collection_bg_" + (collection[1] ? "remove" : "add");
    const buttonType = collection[1] ? ((0, jsx_runtime_1.jsxs)("div", { class: `ms_button_base ms_button_primary_black ms_add_remove_buttons ${membershipWorkingDict[collection[0].id] === true
            ? "ms_button_primary_black_working"
            : ""}`, children: [isManual === true ? "Selected" : "Remove", LoadingDots_1.LoadingDots.renderDotsAbsolute("standard", membershipWorkingDict[collection[0].id] === true)] })) : ((0, jsx_runtime_1.jsxs)("div", { class: `ms_button_base ms_button_primary_white ms_add_remove_buttons ${membershipWorkingDict[collection[0].id] === false
            ? "ms_button_primary_white_working"
            : ""}`, children: [isManual === true ? "Add" : "Save", LoadingDots_1.LoadingDots.renderDotsAbsolute("standard", membershipWorkingDict[collection[0].id] === false)] }));
    const newValue = collection[1] ? false : true;
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_collection_entry", style: bgStyle, children: [(0, jsx_runtime_1.jsx)("a", { href: "#", tabIndex: 13001, class: `ms_collection_link ${action}`, onClick: (event) => {
                    setCollectionMemebership(collection[0].id, newValue);
                    event.preventDefault();
                    return false;
                } }), (0, jsx_runtime_1.jsx)("div", { class: "ms_img_collection_square", style: collection[0].circle_url !== undefined
                    ? "background-image:url('" + collection[0].circle_url + "');"
                    : "" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody2 ms_collection_name_flex", style: "font-weight: bold;", children: collection[0].name }), buttonType] }));
};
function renderCollectionMembership({ collectionMembershipList, membershipWorkingDict, openNewCollection, setCollectionMemebership, shadowRoot, isManual = undefined, }) {
    const imagesURL = chrome.runtime.getURL("images");
    const blackPlus = imagesURL + "/the_best_thing_about_switzerland_the_flag_is_a_big.svg";
    const whitePlus = imagesURL + "/the_best_thing_about_switzerland_the_flag_is_a_big_white.svg";
    return ((0, jsx_runtime_1.jsx)("div", { class: "ms_collection_list_container ms_scrollable_box", children: (0, jsx_runtime_1.jsxs)("div", { class: "ms_collection_list", children: [(0, jsx_runtime_1.jsxs)("div", { class: "ms_collection_entry ms_new_collection_entry", onMouseOver: (event) => {
                        const image = shadowRoot.getElementById("ms_plus_img");
                        if (image) {
                            image.src = whitePlus;
                        }
                    }, onMouseOut: (event) => {
                        const image = shadowRoot.getElementById("ms_plus_img");
                        if (image) {
                            image.src = blackPlus;
                        }
                    }, children: [(0, jsx_runtime_1.jsx)("a", { tabIndex: 13000, href: "#", class: "ms_collection_link ms_new_collection_link", onClick: (event) => {
                                openNewCollection();
                                event.preventDefault();
                                return false;
                            } }), (0, jsx_runtime_1.jsx)("img", { id: "ms_plus_img", class: "ms_new_collection ms_img_collection_square ms_plus_square", src: blackPlus }), (0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody2 ms_collection_name_flex", style: "font-weight: bold;", children: "New collection" })] }), collectionMembershipList.map((collection) => renderCollection({
                    collection,
                    membershipWorkingDict,
                    isManual,
                    setCollectionMemebership,
                }))] }) }));
}


/***/ }),

/***/ 5979:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderCollectionMembershipNewCollection = renderCollectionMembershipNewCollection;
const jsx_runtime_1 = __webpack_require__(201);
const LoadingDots_1 = __webpack_require__(6261);
const getContainerHeight_1 = __webpack_require__(9571);
const renderTopBar_1 = __webpack_require__(4109);
// HEIGHT: 565px
function renderCollectionMembershipNewCollection({ shadowRoot, isManual, inDropdown, newCollectionName, newCollectionNameValid, collectionNameInputOnChange, }, { closeFunction, createNewCollection, goBack, workingDict, }) {
    const doCreateNewCollection = (isManual = false) => {
        const textBoxElement = shadowRoot.getElementById("ms_trm_nc_name");
        if (textBoxElement) {
            createNewCollection(textBoxElement.value, isManual);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${inDropdown ? "572px;" : (0, getContainerHeight_1.getContainerHeight)(565)}`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: ((0, jsx_runtime_1.jsx)("div", { class: "ms_heading5_centre", children: "Create Collection to save to" })),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:0px 20px;height:100%;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_body", style: "margin-top:;color:#707070;", children: "Name new collection" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_textbox_container", style: "margin:12px 0px;", children: (0, jsx_runtime_1.jsx)("input", { autoFocus: true, maxLength: 200, onInput: collectionNameInputOnChange, onKeyUp: (event) => {
                                // On enter!
                                if (event.keyCode === 13) {
                                    event.preventDefault();
                                    doCreateNewCollection(isManual);
                                }
                            }, type: "text", class: "ms_text_input ms_text_input_required", placeholder: "", id: "ms_trm_nc_name", style: `position:relative !important;top:0 !important;right:0 !important;`, value: newCollectionName }) }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_bottom_message", children: (0, jsx_runtime_1.jsxs)("div", { class: "ms_flex", style: "  justify-content:flex-end;", children: [(0, jsx_runtime_1.jsx)("button", { onClick: goBack, class: "ms_button_base ms_button_secondary", style: "margin-right:16px;", children: "Back" }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => doCreateNewCollection(isManual), class: `ms_button_base ms_button_primary${workingDict.new_collection === true
                                        ? "_black ms_button_primary_black_working"
                                        : newCollectionNameValid === true
                                            ? "_black"
                                            : "_disabled"}`, children: ["Create", LoadingDots_1.LoadingDots.renderDotsAbsolute("standard", workingDict.new_collection === true)] })] }) })] })] }));
}


/***/ }),

/***/ 8951:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderCollectionMembershipNewCollectionManual = renderCollectionMembershipNewCollectionManual;
const renderCollectionMembershipNewCollection_1 = __webpack_require__(5979);
function renderCollectionMembershipNewCollectionManual(args, details) {
    const { setTopRightMenuBackView } = details;
    setTopRightMenuBackView("add_manual_product_collection_choice");
    return (0, renderCollectionMembershipNewCollection_1.renderCollectionMembershipNewCollection)({ ...args, isManual: true }, details);
}


/***/ }),

/***/ 830:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderCustomMessageTopRight = renderCustomMessageTopRight;
const jsx_runtime_1 = __webpack_require__(201);
const getContainerHeight_1 = __webpack_require__(9571);
const renderTopBar_1 = __webpack_require__(4109);
// HEIGHT: 533px
function renderCustomMessageTopRight({ inDropdown }, { closeFunction, customMessageTopRight, }) {
    var _a;
    const done_button = ((0, jsx_runtime_1.jsx)("button", { onClick: (event) => customMessageTopRight.link === "close" ? closeFunction : "", class: "ms_button_base ms_button_primary_black", children: customMessageTopRight.button_text
            ? customMessageTopRight.button_text
            : "Close" }));
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${(0, getContainerHeight_1.getContainerHeight)(533)};`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_logo_menu", children: "MOONSIFT" }),
                closeFunction,
                inDropdown,
            }), customMessageTopRight.imageurl ? ((0, jsx_runtime_1.jsx)("img", { src: customMessageTopRight.imageurl })) : (""), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:20px;", children: [customMessageTopRight.title ? ((0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", style: "margin-bottom:10px;", children: customMessageTopRight.title })) : (""), customMessageTopRight.text ? ((0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "margin-bottom:10px;font-weight:300;", children: customMessageTopRight.text })) : ("")] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_done_button_container", children: (customMessageTopRight === null || customMessageTopRight === void 0 ? void 0 : customMessageTopRight.link) !== "close" ? ((0, jsx_runtime_1.jsx)("a", { href: (_a = customMessageTopRight.link) !== null && _a !== void 0 ? _a : "", target: "_blank", children: done_button })) : (done_button) })] }));
}


/***/ }),

/***/ 8105:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderImageTick = renderImageTick;
const jsx_runtime_1 = __webpack_require__(201);
function renderImageTick({ selected }) {
    return ((0, jsx_runtime_1.jsx)("div", { class: "ms_trm_image_tick_container", style: `background-color:${selected === true ? "black" : "white"}`, children: (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/white_tick.svg"), style: `width:12px;visibility:${selected == true ? "visible" : "hidden"}` }) }));
}


/***/ }),

/***/ 4327:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderImageTiles = renderImageTiles;
const jsx_runtime_1 = __webpack_require__(201);
const renderImageTick_1 = __webpack_require__(8105);
function renderImageTiles({ updateManualImagesDict, listIn, manualAddingDict, startAt, bigTile, }) {
    return listIn.map((imageSrc, index) => {
        var _a, _b;
        return ((0, jsx_runtime_1.jsxs)("button", { class: `${bigTile ? "ms_trm_image_tile_big " : ""}ms_trm_image_tile`, onClick: () => updateManualImagesDict(index + startAt, null), children: [(0, renderImageTick_1.renderImageTick)({
                    selected: ((_b = (_a = manualAddingDict["images"]) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b[index + startAt]) === true,
                }), (0, jsx_runtime_1.jsx)("img", { class: `${bigTile ? "ms_trm_image_tile_image_big " : ""}ms_trm_image_tile_image`, src: imageSrc })] }));
    });
}


/***/ }),

/***/ 1505:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderLoading = renderLoading;
const jsx_runtime_1 = __webpack_require__(201);
const LoadingDots_1 = __webpack_require__(6261);
const renderTopBar_1 = __webpack_require__(4109);
function renderLoading({ inDropdown, displayLoadingRefreshAdvice, displayNewUserMessages, retryFetchData, }, { closeFunction, siteUID, }) {
    const problemReportURL = `${"https://www.moonsift.com"}/extensionissue?site_uid=${siteUID}&url=loading&exversion=chrome_${chrome.runtime.getManifest().version}_${"4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085"}&from=loading&overtimelimit=${displayLoadingRefreshAdvice}`;
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: "height:533px;", children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_logo_menu", children: "MOONSIFT" }),
                closeFunction,
                inDropdown,
                exitCross: false,
            }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding: 20px;align-items: center;justify-content: center;flex-grow: 1;", children: [(0, jsx_runtime_1.jsxs)("div", { class: "ms_body4", children: [(0, jsx_runtime_1.jsx)("div", { style: "height:60px;position: relative;", children: LoadingDots_1.LoadingDots.renderDotsAbsolute("standard_big", true) }), (0, jsx_runtime_1.jsx)("div", { style: "margin-top:12px;color:black;", children: "Loading product data" })] }), inDropdown === true &&
                        displayLoadingRefreshAdvice === true &&
                        displayNewUserMessages == true ? ((0, jsx_runtime_1.jsx)("div", { class: "ms_body4", style: "margin:20px;text-align:center;color:#707070;", children: "Just installed the extension? You will need to reload old tabs before saving." })) : (""), inDropdown === true &&
                        displayLoadingRefreshAdvice === true &&
                        displayNewUserMessages == false ? ((0, jsx_runtime_1.jsxs)("div", { class: "ms_body4", style: "margin:20px;text-align:center;color:#707070;", children: ["Not loading?", " ", (0, jsx_runtime_1.jsx)("a", { class: "ms_trm_loading_link", href: "#", onClick: retryFetchData, children: "Request the data again" }), " ", "or", " ", (0, jsx_runtime_1.jsx)("a", { class: "ms_trm_loading_link", href: problemReportURL, target: "_blank", children: "Report a problem" }), " "] })) : ("")] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_done_button_container", children: (0, jsx_runtime_1.jsx)("a", { href: problemReportURL, target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_white", children: "Report a problem" }) }) })] }));
}


/***/ }),

/***/ 4630:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderMoonsiftSite = renderMoonsiftSite;
const jsx_runtime_1 = __webpack_require__(201);
const renderTopBar_1 = __webpack_require__(4109);
function renderMoonsiftSite({ inDropdown }, { closeFunction, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:533px`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_logo_menu", children: "MOONSIFT" }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/moonsift_save.png"), style: "width:360px;" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:20px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", style: "margin-bottom:10px;", children: "How to add items from Moonsift collections" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "margin-bottom:10px;font-weight:300;", children: "Use the \"+\" or \"...\" buttons on product tiles to save items from other moonsift collections." })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" })] }));
}


/***/ }),

/***/ 6170:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderNewTab = renderNewTab;
const jsx_runtime_1 = __webpack_require__(201);
const renderTopBar_1 = __webpack_require__(4109);
function renderNewTab({ inDropdown }, { closeFunction, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:533px`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_logo_menu", children: "MOONSIFT" }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/sign_in_bg.png"), style: "width:360px;" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:20px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", style: "margin-bottom:10px;", children: "Welcome to Moonsift" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "margin-bottom:10px;font-weight:300;", children: "Visit a store to save items using this toolbar button." })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_done_button_container", children: (0, jsx_runtime_1.jsxs)("div", { style: "display:flex;flex-direction:column", children: [(0, jsx_runtime_1.jsx)("a", { href: `${"https://www.moonsift.com"}`, target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_white", children: "View Collections" }) }), " ", (0, jsx_runtime_1.jsx)("a", { href: `${"https://www.moonsift.com"}/extensionissue?site_uid=new_tab&url=loading&exversion=chrome_${chrome.runtime.getManifest().version}_${"4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085"}&from=loading`, target: "_blank", style: "display:flex;margin-top:16px;text-decoration: underline;justify-content: end;", children: "Report a problem" })] }) })] }));
}


/***/ }),

/***/ 4567:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderNotSignedIn = renderNotSignedIn;
const jsx_runtime_1 = __webpack_require__(201);
const getContainerHeight_1 = __webpack_require__(9571);
const renderTopBar_1 = __webpack_require__(4109);
function renderNotSignedIn({ inDropdown }, { closeFunction, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${inDropdown ? "533px" : (0, getContainerHeight_1.getContainerHeight)(533)};`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_logo_menu", children: "MOONSIFT" }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/sign_in_bg.png"), style: "width:360px;" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:20px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", style: "margin-bottom:10px;", children: "You're not logged in." }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "margin-bottom:10px;font-weight:300;", children: "Log back in to Moonsift and keep track of everything you're shopping for in one place." })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_done_button_container", children: (0, jsx_runtime_1.jsx)("a", { href: `${"https://www.moonsift.com"}/signin`, target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_black", children: "Open sign in" }) }) })] }));
}


/***/ }),

/***/ 6693:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderOverlayOfManualCollectionChoice = renderOverlayOfManualCollectionChoice;
const jsx_runtime_1 = __webpack_require__(201);
const renderCollectionMembership_1 = __webpack_require__(9529);
function renderOverlayOfManualCollectionChoice({ shadowRoot, inDropdown, setTopRightMenuView, updateManualCollectionsDict, workingDict, manualAddingDict, collectionList, }) {
    const collectionMembershipList = [];
    collectionList.forEach((entry) => {
        var _a;
        return collectionMembershipList.push([
            entry,
            ((_a = manualAddingDict["collections"]) === null || _a === void 0 ? void 0 : _a[0][entry.id]) === true,
        ]);
    });
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_collection_choice_overlay", style: inDropdown === true ? "" : "border-radius:10px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_trm_collection_choice_bg", id: "ms_trm_unique_id", onMouseUp: 
                //Mouse up not click as component gets rerendered into something else and then different onclick fires.
                () => {
                    setTopRightMenuView("toolbar_home");
                } }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_collection_choice_overlay_container", children: (0, renderCollectionMembership_1.renderCollectionMembership)({
                    collectionMembershipList,
                    membershipWorkingDict: workingDict,
                    openNewCollection: () => setTopRightMenuView("collection_membership_new_collection_manual"),
                    setCollectionMemebership: (collectionUID, newValue) => updateManualCollectionsDict(collectionUID, newValue),
                    shadowRoot,
                    isManual: true,
                }) }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_collection_choice_overlay_button", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => setTopRightMenuView("toolbar_home"), class: "ms_button_base ms_button_primary_black", style: "width:100%;margin:12px 20px;", children: collectionMembershipList.filter((entry) => entry[1] === true)
                        .length > 0
                        ? "Done"
                        : "Cancel" }) })] }));
}


/***/ }),

/***/ 4336:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderOverlayOfSingleTileReminder = renderOverlayOfSingleTileReminder;
const jsx_runtime_1 = __webpack_require__(201);
function renderOverlayOfSingleTileReminder({ inDropdown, hideSingleTileReminder, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_collection_choice_overlay", style: inDropdown === true ? "" : "border-radius:10px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_trm_collection_choice_bg" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_tilesingle_container", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading5", children: "Tip: When saving from your toolbar, make sure you're viewing a single item." }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_tilesingleimage_container", children: [(0, jsx_runtime_1.jsx)("img", { class: "ms_trm_tilesingleimage", src: chrome.runtime.getURL("images/save_single_right.png") }), (0, jsx_runtime_1.jsx)("img", { class: "ms_trm_tilesingleimage", src: chrome.runtime.getURL("images/save_tile_wrong.png") })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_heading5", children: "This helps Moonsift find the right product details to save." })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_collection_choice_overlay_button", style: "justify-content:flex-end;", children: (0, jsx_runtime_1.jsxs)("button", { onClick: hideSingleTileReminder, class: "ms_button_base ms_button_primary_white", style: "margin:12px 20px;", children: ["OK - Got it", " "] }) })] }));
}


/***/ }),

/***/ 3524:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderProductCollectionMembership = renderProductCollectionMembership;
const jsx_runtime_1 = __webpack_require__(201);
// Save item to collections and create a new collection:
// HEIGHT: 565px
const getContainerHeight_1 = __webpack_require__(9571);
const renderAddAutoProduct_1 = __webpack_require__(1060);
const renderTopBar_1 = __webpack_require__(4109);
function renderProductCollectionMembership({ inDropdown, shadowRoot }, argsDict) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${(0, getContainerHeight_1.getContainerHeight)(565)};`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_heading5_centre", children: "Save item to Collections" }),
                closeFunction: argsDict.closeMemebership,
                inDropdown,
            }), (0, renderAddAutoProduct_1.renderAddAutoProduct)({ shadowRoot }, { ...argsDict, closeFunction: argsDict.closeMemebership })] }));
}


/***/ }),

/***/ 1115:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderReloadPage = renderReloadPage;
const jsx_runtime_1 = __webpack_require__(201);
const renderTopBar_1 = __webpack_require__(4109);
function renderReloadPage({ inDropdown }, { closeFunction, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:533px`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_logo_menu", children: "MOONSIFT" }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/sign_in_bg.png"), style: "width:360px;" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:20px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", style: "margin-bottom:10px;", children: "Welcome to Moonsift" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "margin-bottom:10px;font-weight:300;", children: "Please reload this tab to save from this page" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body3", style: "margin-bottom:10px;font-weight:300;padding-top:24px;", children: "This is only required just after adding the extension" })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" })] }));
}


/***/ }),

/***/ 9841:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderReminderSingleProduct = renderReminderSingleProduct;
const jsx_runtime_1 = __webpack_require__(201);
const getContainerHeight_1 = __webpack_require__(9571);
const renderAddAutoProduct_1 = __webpack_require__(1060);
const renderTopBar_1 = __webpack_require__(4109);
// HEIGHT 565px;
function renderReminderSingleProduct({ shadowRoot, inDropdown }, argsDict) {
    const { closeFunction } = argsDict;
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${(0, getContainerHeight_1.getContainerHeight)(565)};`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: ((0, jsx_runtime_1.jsx)("div", { class: "ms_heading5_centre", children: "Want to keep track of this item?" })),
                closeFunction: closeFunction,
                inDropdown: inDropdown,
            }), (0, renderAddAutoProduct_1.renderAddAutoProduct)({ shadowRoot, includeTutorialMessage: true }, argsDict)] }));
}


/***/ }),

/***/ 6600:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderReminderToHover = renderReminderToHover;
const jsx_runtime_1 = __webpack_require__(201);
function renderReminderToHover({ setHideHoverReminder, closeFunction, inDropdown, }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/tutorial_hover.png"), style: "width:360px;" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:16px 20px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", children: "Hover on items to save" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "font-weight:300;", children: "When browsing lots of items, hover over the product you want to save, then click the save button to add it." })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_done_button_container", style: "padding-top:0px;justify-content: space-between;", children: [(0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_white", onClick: setHideHoverReminder, style: "padding-left:20px;padding-right:20px", children: "Save from toolbar anyway" }), (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_black", onClick: () => {
                            if (inDropdown) {
                                window.close();
                            }
                            closeFunction();
                        }, children: "Got it" })] })] }));
}


/***/ }),

/***/ 9181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderToolbarHome = renderToolbarHome;
const jsx_runtime_1 = __webpack_require__(201);
const getContainerHeight_1 = __webpack_require__(9571);
const renderAddManualProduct_1 = __webpack_require__(9761);
const renderCannotReachMoonsift_1 = __webpack_require__(8250);
const renderNotSignedIn_1 = __webpack_require__(4567);
const renderReminderToHover_1 = __webpack_require__(6600);
const renderTopBar_1 = __webpack_require__(4109);
const renderTopBarMainMenu_1 = __webpack_require__(4707);
const renderTutorialToolbarClick_1 = __webpack_require__(852);
function renderToolbarHome({ inDropdown, shadowRoot, manualAddShowCollection, }, argsDict) {
    const { closeFunction, hideTutorialToolbar, setTopRightMenuView, setHideHoverReminder, siteSettingsError, signedIn, showTutorialToolbarClick, showAutoPreHover, displayType, guessedProductData, manualAddingDict, siteUID, canViewAI, } = argsDict;
    if (siteSettingsError === true) {
        return (0, renderCannotReachMoonsift_1.renderCannotReachMoonsift)({ inDropdown }, { closeFunction });
    }
    else if (signedIn === true) {
        if (showTutorialToolbarClick) {
            return (0, renderTutorialToolbarClick_1.renderTutorialToolbarClick)({
                inDropdown,
            }, {
                closeFunction,
                hideTutorialToolbar,
            });
        }
        else {
            return (
            // A larger height is allowed as this is an edge case and it can scroll...
            (0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${inDropdown ? "auto;" : (0, getContainerHeight_1.getContainerHeight)(625)}`, children: [(0, renderTopBar_1.renderTopBar)({
                        heading: (0, renderTopBarMainMenu_1.renderTopBarMainMenu)({
                            setTopRightMenuView,
                            displayType,
                            guessedProductData,
                            manualAddingDict,
                            canViewAI,
                            siteUID,
                        }),
                        goToSettings: () => setTopRightMenuView("toolbar_options"),
                        closeFunction,
                        inDropdown,
                    }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_manual_add_container", style: !inDropdown && window.innerHeight < 605
                            ? "margin-right:-15px;"
                            : "", children: showAutoPreHover
                            ? (0, renderReminderToHover_1.renderReminderToHover)({
                                setHideHoverReminder,
                                closeFunction,
                                inDropdown,
                            })
                            : (0, renderAddManualProduct_1.renderAddManualProduct)({
                                inDropdown,
                                shadowRoot,
                                showChoice: manualAddShowCollection,
                            }, argsDict) })] }));
        }
    }
    else {
        return (0, renderNotSignedIn_1.renderNotSignedIn)({ inDropdown }, { closeFunction });
    }
}


/***/ }),

/***/ 1244:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderToolbarOptions = renderToolbarOptions;
const jsx_runtime_1 = __webpack_require__(201);
const LoadingDots_1 = __webpack_require__(6261);
const renderTopBar_1 = __webpack_require__(4109);
const renderTopBarMainMenu_1 = __webpack_require__(4707);
// Toolbar click:
function renderToolbarOptions({ inDropdown, }, { closeFunction, setUserOwnerOnOff, setTopRightMenuView, workingDict, manualAddingDict, signedIn, siteUID, siteRequested, siteIntegrated, siteBlacklisted, userName, siteMessages, displayType, guessedProductData, canViewAI, }) {
    const urlToAdd = manualAddingDict &&
        manualAddingDict["link"] &&
        manualAddingDict["link"].length > 0
        ? manualAddingDict["link"][0]
        : "";
    const integration_button = signedIn ? (siteIntegrated !== true && siteUID !== "moonsift.com" ? (siteRequested !== true ? ((0, jsx_runtime_1.jsxs)("button", { class: `ms_button_base ms_button_secondary ms_trm_option_button ${workingDict["site_requests"] === true
            ? "ms_button_secondary_working"
            : ""}`, onClick: () => setUserOwnerOnOff("site_requests", siteUID, true), children: ["Request integration of ", siteUID, LoadingDots_1.LoadingDots.renderDotsAbsolute("standard", workingDict["site_requests"] === true)] })) : ((0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_secondary ms_trm_option_button", children: "Integration requested" }))) : ((0, jsx_runtime_1.jsx)("a", { href: `${"https://www.moonsift.com"}/extensionissue?siteUID=${siteUID}&url=${encodeURIComponent(urlToAdd)}&exversion=chrome_${chrome.runtime.getManifest().version}_${"4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085"}&from=toolbar_options`, target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsxs)("button", { class: "ms_button_base ms_button_secondary ms_trm_option_button", style: "flex-grow:1;", children: ["Report a problem with ", siteUID] }) }))) : ("");
    const enabled_button = signedIn ? (siteIntegrated === true ? (siteBlacklisted !== true ? ((0, jsx_runtime_1.jsxs)("button", { class: `ms_button_base ms_button_secondary ms_trm_option_button ${workingDict["site_blacklist"] === true
            ? "ms_button_secondary_working"
            : ""}`, onClick: () => setUserOwnerOnOff("site_blacklist", siteUID, true), children: ["Disable Moonsift on ", siteUID, LoadingDots_1.LoadingDots.renderDotsAbsolute("standard", workingDict["site_blacklist"] === true)] })) : ((0, jsx_runtime_1.jsxs)("button", { class: `ms_button_base ms_button_secondary ms_trm_option_button ${workingDict["site_blacklist"] === true
            ? "ms_button_secondary_working"
            : ""}`, onClick: () => setUserOwnerOnOff("site_blacklist", siteUID, false), children: ["Enable Moonsift on ", siteUID, LoadingDots_1.LoadingDots.renderDotsAbsolute("standard", workingDict["site_blacklist"] === true)] }))) : ("")) : ("");
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: "height:550px;", children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, renderTopBarMainMenu_1.renderTopBarMainMenu)({
                    setTopRightMenuView,
                    displayType,
                    guessedProductData,
                    manualAddingDict,
                    canViewAI,
                    siteUID,
                }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody2", style: "padding:6px 20px;", children: signedIn ? userName : "Not logged in" }), integration_button, enabled_button, signedIn ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("a", { href: `${"https://www.moonsift.com"}/logout`, target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_secondary ms_trm_option_button", style: "flex-grow:1;", children: "Sign out" }) }), (0, jsx_runtime_1.jsx)("a", { href: `${"https://www.moonsift.com"}/`, target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_secondary ms_trm_option_button", style: "flex-grow:1;", children: "View My Collections" }) })] })) : ((0, jsx_runtime_1.jsx)("a", { href: `${"https://www.moonsift.com"}/signin`, target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_secondary ms_trm_option_button", style: "flex-grow:1;", children: "Sign in" }) })), siteMessages !== undefined
                        ? siteMessages.map((message) => ((0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody3", style: "padding:10px 20px;", children: message.text })))
                        : ``, (0, jsx_runtime_1.jsxs)("div", { class: "ms_nonbody3", style: "padding:26px 20px;", children: [(0, jsx_runtime_1.jsx)("a", { href: "https://moonsift.notion.site/3-ways-to-save-items-to-Moonsift-853a2d46b2fd4dd5af8430feb0056a46", class: "ms_link", target: "_blank", children: "Click here" }), " ", "to learn about the 3 different ways you can save products to your Moonsift collections."] })] })] }));
}


/***/ }),

/***/ 4109:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderTopBar = renderTopBar;
const jsx_runtime_1 = __webpack_require__(201);
function renderTopBar({ heading, closeFunction, inDropdown, exitCross, goToSettings, }) {
    const imagesURL = chrome.runtime.getURL("images");
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_top_bar", children: [(0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_logo_and_title", children: [(0, jsx_runtime_1.jsx)("img", { height: "16px", width: "16px", class: "ms_trm_logo", src: `${imagesURL}/logo.svg` }), heading] }), exitCross !== false && inDropdown !== true && ((0, jsx_runtime_1.jsx)("button", { onClick: closeFunction, style: "margin-left:8px;", children: (0, jsx_runtime_1.jsx)("img", { height: "11px", width: "11px", class: "ms_trm_close_x_image", src: `${imagesURL}/exit_cross.svg` }) })), inDropdown === true && goToSettings !== undefined && ((0, jsx_runtime_1.jsx)("button", { onClick: goToSettings, children: (0, jsx_runtime_1.jsx)("img", { style: "height:20px;width:20px;", src: chrome.runtime.getURL("images/settings_cog.svg") }) }))] }));
}


/***/ }),

/***/ 4707:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderTopBarMainMenu = renderTopBarMainMenu;
const jsx_runtime_1 = __webpack_require__(201);
const getAILink_1 = __webpack_require__(869);
function renderTopBarMainMenu({ setTopRightMenuView, displayType, guessedProductData, manualAddingDict, siteUID, canViewAI, isManual = false, }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    // Note: this assumes that this top bar is only being used to save manual items and that is where the save data comes from:
    const description = (_c = (_b = (_a = manualAddingDict.description) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : guessedProductData === null || guessedProductData === void 0 ? void 0 : guessedProductData.description) !== null && _c !== void 0 ? _c : "";
    const price = (_f = (_e = (_d = manualAddingDict.price) === null || _d === void 0 ? void 0 : _d[0]) !== null && _e !== void 0 ? _e : guessedProductData === null || guessedProductData === void 0 ? void 0 : guessedProductData.price) !== null && _f !== void 0 ? _f : "";
    const link = (_j = (_h = (_g = manualAddingDict.link) === null || _g === void 0 ? void 0 : _g[0]) !== null && _h !== void 0 ? _h : guessedProductData === null || guessedProductData === void 0 ? void 0 : guessedProductData.link) !== null && _j !== void 0 ? _j : "";
    const imageURLMap = (_l = (_k = manualAddingDict.images) === null || _k === void 0 ? void 0 : _k[0]) !== null && _l !== void 0 ? _l : {};
    const imageURLList = (_m = guessedProductData === null || guessedProductData === void 0 ? void 0 : guessedProductData.images) !== null && _m !== void 0 ? _m : [];
    const imageURL = (_o = imageURLList.find((x, i) => imageURLMap[i] === true)) !== null && _o !== void 0 ? _o : "";
    const aiLink = (0, getAILink_1.getAILink)({
        siteUID: siteUID !== null && siteUID !== void 0 ? siteUID : "",
        imageURL,
        description,
        price,
        link,
    });
    return ((0, jsx_runtime_1.jsx)("div", { style: "display:flex;align-content:space-between", children: (0, jsx_runtime_1.jsxs)("div", { style: "display:flex;align-items: center;", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setTopRightMenuView("toolbar_home"), style: "padding-right:10px", children: (0, jsx_runtime_1.jsx)("div", { class: `ms_heading5_centre ${displayType === "toolbar_home" ? "" : "ms_trm_top_bar_unselected"}`, children: isManual ? "Save this item" : "Save item" }) }), canViewAI && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: "width:1px;height:18px;margin-right:8px;background-color:#CECFD1;" }), (0, jsx_runtime_1.jsx)("a", { href: aiLink, target: "_blank", children: (0, jsx_runtime_1.jsx)("button", { children: (0, jsx_runtime_1.jsx)("div", { class: "ms_heading5_centre", style: "color:#888888", children: "Find similar \u2728" }) }) })] }))] }) }));
}


/***/ }),

/***/ 5308:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderTutorialPinReminder = renderTutorialPinReminder;
const jsx_runtime_1 = __webpack_require__(201);
const getContainerHeight_1 = __webpack_require__(9571);
const renderTopBar_1 = __webpack_require__(4109);
// HEIGHT 533px
function renderTutorialPinReminder({ inDropdown, }, { closeFunction, setPinned, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${(0, getContainerHeight_1.getContainerHeight)(533)};`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_logo_menu", children: "MOONSIFT" }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/tutorial_pin.png") }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:20px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", style: "margin-bottom:10px;", children: "Pin Moonsift to your toolbar and save items from any store" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "margin-bottom:10px;font-weight:300;", children: "Just click the grey puzzle piece in your toolbar, then the pin icon next to Moonsift." })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_done_button_container", children: [(0, jsx_runtime_1.jsx)("button", { onClick: closeFunction, class: "ms_button_base ms_button_secondary", style: "margin-right:16px;", children: "Skip" }), (0, jsx_runtime_1.jsx)("button", { onClick: setPinned, class: "ms_button_base ms_button_primary_black", children: "I've pinned Moonsift" })] })] }));
}


/***/ }),

/***/ 2774:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderTutorialSingleProduct = renderTutorialSingleProduct;
const jsx_runtime_1 = __webpack_require__(201);
const getContainerHeight_1 = __webpack_require__(9571);
const renderAddAutoProduct_1 = __webpack_require__(1060);
const renderTopBar_1 = __webpack_require__(4109);
// HEIGHT 565px;
function renderTutorialSingleProduct({ inDropdown, shadowRoot, }, argsDict) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${(0, getContainerHeight_1.getContainerHeight)(565)};`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_heading5_centre", children: "Save item to Moonsift?" }),
                closeFunction: argsDict.closeFunction,
                inDropdown: inDropdown,
            }), (0, renderAddAutoProduct_1.renderAddAutoProduct)({ shadowRoot }, argsDict)] }));
}


/***/ }),

/***/ 8714:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderTutorialSingleProductLaptop = renderTutorialSingleProductLaptop;
const jsx_runtime_1 = __webpack_require__(201);
const getContainerHeight_1 = __webpack_require__(9571);
const renderTopBar_1 = __webpack_require__(4109);
// HEIGHT 549px:
function renderTutorialSingleProductLaptop({ inDropdown, }, { closeFunction, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${(0, getContainerHeight_1.getContainerHeight)(549)};`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_heading5_centre", children: "Tip from Moonsift" }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsx)("div", { style: "width:100%;display:flex;justify-content:flex-start;", children: (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/tutorial_single_view_laptop.png"), style: "width:360px;" }) }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flexvert", style: "padding:20px 20px 0px 20px;", children: (0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "font-weight:300;", children: "Your save button is hugging the right side of your screen in this view. It's under this pop-up." }) }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_done_button_container", style: "margin-bottom:10px;", children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_black", onClick: closeFunction, children: "Got it - it's on the right" }) })] }));
}


/***/ }),

/***/ 2050:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderTutorialTilesOnly = renderTutorialTilesOnly;
const jsx_runtime_1 = __webpack_require__(201);
const getContainerHeight_1 = __webpack_require__(9571);
const renderTopBar_1 = __webpack_require__(4109);
// HEIGHT 527px
function renderTutorialTilesOnly({ inDropdown, }, { closeFunction, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${(0, getContainerHeight_1.getContainerHeight)(527)};`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: ((0, jsx_runtime_1.jsx)("div", { class: "ms_heading5_centre", children: "Hover items to save to Moonsift" })),
                closeFunction,
                inDropdown,
                exitCross: false, // ensure scroll bar is used incase button might overflow for some users (not sure why)
            }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/tutorial_tiles_cottontail.png"), style: "width:360px;" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:10px 20px 6px 20px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", style: "margin-bottom:10px;", children: "Saving items to Moonsift" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body2", style: "margin-bottom:10px;font-weight:300;", children: "When browsing lots of items, hover over the product you want to save, then click the save button to add it." })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flex_expand" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_done_button_container", style: "padding-top:0px;", children: [(0, jsx_runtime_1.jsx)("a", { href: "https://moonsift.notion.site/3-ways-to-save-items-to-Moonsift-853a2d46b2fd4dd5af8430feb0056a46", target: "_blank", class: "ms_link", style: "margin-right:16px;", children: "Learn more" }), (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_white", onClick: closeFunction, children: "Got it" })] })] }));
}


/***/ }),

/***/ 852:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderTutorialToolbarClick = renderTutorialToolbarClick;
const jsx_runtime_1 = __webpack_require__(201);
// one off prompt:
const renderTopBar_1 = __webpack_require__(4109);
// (Don't think this is used in practice...)
function renderTutorialToolbarClick({ inDropdown }, { closeFunction, hideTutorialToolbar, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_heading5_centre", children: "Tip from Moonsift" }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/tutorial_toolbar.png"), style: "width:360px;" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_flexvert", style: "padding:20px;", children: (0, jsx_runtime_1.jsx)("div", { class: "ms_heading5", style: "margin-bottom:10px;", children: "Even if a store doesn't have Moonsift's quick-save buttons yet, you can always save items from your toolbar." }) }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_done_button_container", style: "padding:0px 20px;", children: (0, jsx_runtime_1.jsx)("button", { onClick: hideTutorialToolbar, class: "ms_button_base ms_button_primary_white", children: "OK - Got it" }) }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_trm_grey_bottom_message", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { style: "width:26px;margin-right: 4px;top: -4px;position: relative;", src: chrome.runtime.getURL("images/help-circle-outline.svg") }) }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody2", style: "font-weight:bold;", children: "Can't see Moonsift in your toolbar above?" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_body4", children: "Click the grey puzzle piece then 'pin' Moonsift" })] })] })] }));
}


/***/ }),

/***/ 2535:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderTutorialUpgradeV06 = renderTutorialUpgradeV06;
const jsx_runtime_1 = __webpack_require__(201);
// one off prompt for upgrading users:
const getContainerHeight_1 = __webpack_require__(9571);
const renderTopBar_1 = __webpack_require__(4109);
// HEIGHT 579px
function renderTutorialUpgradeV06({ inDropdown }, { closeFunction, hideTutorialToolbar, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { class: "ms_top_right_container_650", style: `height:${(0, getContainerHeight_1.getContainerHeight)(579)};`, children: [(0, renderTopBar_1.renderTopBar)({
                heading: (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_logo_menu", children: "MOONSIFT" }),
                closeFunction,
                inDropdown,
            }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/tutorial_toolbar.png"), style: "width:360px;" }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_flexvert", style: "padding:10px 20px;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_heading4", style: "margin-bottom:10px;", children: "Your Moonsift plugin has been upgraded \uD83D\uDE4C" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody1", style: "margin-bottom:10px;font-weight:400", children: "You can now save items to Moonsift from any store in the world via your toolbar." })] }), (0, jsx_runtime_1.jsx)("div", { class: "ms_trm_done_button_container", style: "padding:0px 20px;", children: (0, jsx_runtime_1.jsx)("a", { href: "https://moonsift.notion.site/Now-save-to-Moonsift-from-absolutely-any-website-via-your-toolbar-56a03fee0c77413b94e74ad80f612c85", target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsx)("button", { onClick: hideTutorialToolbar, class: "ms_button_base ms_button_rounded_primary", children: "Learn more" }) }) })] }));
}


/***/ }),

/***/ 6289:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopRightPopup = void 0;
const jsx_runtime_1 = __webpack_require__(201);
/*
NON-STATIC OBJECT

The Info message at the top right of the screen

Considering using something like alpine.js but worried this might modify the DOM of site components too!

This message is displayed when the user clicks the moonsift toolbar button....:

*/
const preact_1 = __webpack_require__(2865);
const appendToDocument_1 = __webpack_require__(9484);
const renderItemSavedSuccessfully_1 = __webpack_require__(979);
const renderProductNotSaved_1 = __webpack_require__(443);
const renderProductSaveFailed_1 = __webpack_require__(1727);
const renderAddItemNote_1 = __webpack_require__(2);
const renderMap = {
    item_saved_successfully: renderItemSavedSuccessfully_1.renderItemSavedSuccessfully,
    product_save_failed: renderProductSaveFailed_1.renderProductSaveFailed,
    product_not_saved: renderProductNotSaved_1.renderProductNotSaved,
    add_item_note: renderAddItemNote_1.renderAddItemNote,
    item_note_added_successfully: renderItemSavedSuccessfully_1.renderItemSavedSuccessfully,
};
class TopRightPopup {
    constructor(logger) {
        this.displayDetails = {
            displayType: undefined,
        };
        this.startFadeTimer = () => {
            if (this.displayDetails.displayType === "add_item_note") {
                this.cancelFadeTimer();
                return;
            }
            clearTimeout(this.fadeTimer);
            if (this.imbContainer.shadowRoot) {
                const containerDiv = this.imbContainer.shadowRoot.getElementById("ms_top_right_message_id");
                if (containerDiv) {
                    containerDiv.style.setProperty("transition", "2.0s");
                    containerDiv.style.setProperty("opacity", "0.0");
                }
            }
            if (this.displayDetails.displayType !== undefined) {
                this.fadeTimer = window.setTimeout(this.displayDetails.closeFunction, 2000);
            }
        };
        this.cancelFadeTimer = () => {
            clearTimeout(this.fadeTimer);
            if (this.imbContainer.shadowRoot) {
                const containerDiv = this.imbContainer.shadowRoot.getElementById("ms_top_right_message_id");
                if (containerDiv) {
                    containerDiv.style.setProperty("transition", "0.0s");
                    containerDiv.style.setProperty("opacity", "1.0");
                }
            }
        };
        this.startInitialTimer = () => {
            clearTimeout(this.fadeTimer);
            this.fadeTimer = window.setTimeout(this.startFadeTimer, 2000);
        };
        // Deals with typings being correct and not having to be detailed for each function...:
        this.doRenderFunction = (displayDetails) => {
            if (displayDetails.displayType === "item_saved_successfully" ||
                displayDetails.displayType === "item_note_added_successfully") {
                return (0, renderItemSavedSuccessfully_1.renderItemSavedSuccessfully)(displayDetails);
            }
            if (displayDetails.displayType === "product_save_failed") {
                return (0, renderProductSaveFailed_1.renderProductSaveFailed)(displayDetails);
            }
            if (displayDetails.displayType === "product_not_saved") {
                return (0, renderProductNotSaved_1.renderProductNotSaved)(displayDetails);
            }
            if (displayDetails.displayType === "add_item_note") {
                return (0, renderAddItemNote_1.renderAddItemNote)(displayDetails);
            }
            return ``;
        };
        this.update = (displayDetails = this.displayDetails) => {
            try {
                if (this.setUpSucceeded === true && this.designSystemLoaded === true) {
                    const htmlToRender = displayDetails.displayType !== undefined ? ((0, jsx_runtime_1.jsx)("div", { class: "ms_top_right", id: "ms_top_right_message_id", onMouseOver: this.cancelFadeTimer, onMouseOut: this.startFadeTimer, style: "opacity:1.0;animation-timing-function: ease;transition:2.0s;", children: this.doRenderFunction(displayDetails) })) : (``);
                    // Do the inside rendering:
                    if (this.imbContainer.shadowRoot) {
                        (0, preact_1.render)(htmlToRender, this.imbContainer.shadowRoot);
                    }
                    // show or hide the message:
                    if (displayDetails.displayType === undefined) {
                        this.imbContainer.style.setProperty("display", "none", "important");
                        clearTimeout(this.fadeTimer);
                    }
                    else {
                        this.imbContainer.style.setProperty("display", "flex", "important");
                    }
                }
                if (displayDetails.displayType !== this.displayDetails.displayType) {
                    this.startInitialTimer();
                }
                this.displayDetails = displayDetails;
            }
            catch (err) {
                this.logger.debugError(err, "Unable to update Info Message fully - non-critical");
            }
        };
        this.logger = logger;
        this.setUpSucceeded = false;
        this.designSystemLoaded = false;
        this.imbContainer = document.createElement("div");
        try {
            this.imbContainer.setAttribute("id", "ms-top-right-popup");
            this.imbContainer.setAttribute("class", "ms_div_factory");
            this.imbContainer.setAttribute("style", "\
        display: none !important;\
        flex-direction: row !important;\
        align-items: center !important;\
        align-content: center !important;\
        position:fixed !important;\
        top:10px !important;\
        z-index:2147483647 !important;\
        justify-content:space-around !important;\
        right:10px !important;\
      ");
            this.imbContainer.attachShadow({ mode: "open" });
            if (this.imbContainer.shadowRoot) {
                this.imbContainer.shadowRoot.innerHTML = `
        <link rel="stylesheet" type="text/css" href="${chrome.runtime.getURL("ui/design_system.css")}" >
      `;
                const linkElement = this.imbContainer.shadowRoot
                    .children[0];
                linkElement.onload = () => {
                    this.designSystemLoaded = true;
                    this.update();
                };
            }
            (0, appendToDocument_1.appendToDocument)("body", [this.imbContainer], logger);
            this.setUpSucceeded = true;
        }
        catch (err) {
            logger.debugError(err, "Unable to set-up top-right-popup-message - critical!");
            this.setUpSucceeded = false;
        }
    }
}
exports.TopRightPopup = TopRightPopup;


/***/ }),

/***/ 2:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderAddItemNote = renderAddItemNote;
const jsx_runtime_1 = __webpack_require__(201);
const sendBGMessagePromise_1 = __webpack_require__(5104);
const hooks_1 = __webpack_require__(5994);
const LoadingDots_1 = __webpack_require__(6261);
const MAX_NOTE_LENGTH = 500;
const AddItemNote = ({ closeFunction, setTopRightPopupView, lastSavedItemDetails, logger, }) => {
    const [noteCount, setNoteCount] = (0, hooks_1.useState)(0);
    const [doneEnabled, setDoneEnabled] = (0, hooks_1.useState)(false);
    const [errorMessage, setErrorMessage] = (0, hooks_1.useState)("");
    const [isWorking, setIsWorking] = (0, hooks_1.useState)(false);
    const handleAddItemNote = async (event) => {
        event.preventDefault(); // no page reload
        const form = event.target;
        const textBox = form.elements.namedItem("note");
        if (!lastSavedItemDetails || !textBox) {
            return;
        }
        try {
            setIsWorking(true);
            setErrorMessage("");
            const response = await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                type: "api",
                protocol: "send_and_receive",
                action: "add_item_note",
                data: {
                    api: "add_item_note",
                    note: textBox.value,
                    collection_items: lastSavedItemDetails.collectionItems.map((item) => ({
                        collection_uid: item.collectionUID,
                        item_uid: item.itemUID,
                    })),
                },
            }, logger);
            setIsWorking(false);
            setTopRightPopupView("item_note_added_successfully");
        }
        catch {
            setIsWorking(false);
            setErrorMessage("Failed to add note");
        }
    };
    const handleNoteChange = (event) => {
        const textArea = event.target;
        setNoteCount(textArea.value.length);
        setDoneEnabled(textArea.value.length > 0);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: `width:300px;height:317px;background-color:white;box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);border-radius: 10px;`, children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody1", style: "align-items: center;position:absolute;left:14px;top:14px;display:flex;", children: "Add a note" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                    closeFunction();
                }, style: "position:absolute;right:10px;top:6px;padding:12px;cursor:pointer;", children: (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/exit_cross.svg"), style: "width: 16px;" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("form", { onSubmit: handleAddItemNote, children: (0, jsx_runtime_1.jsxs)("div", { style: "\n            display:flex;\n            flex-direction:column;\n            position:absolute;\n            top:51px;\n            left:0px;\n            height: 266px;\n            padding: 20px;\n            box-sizing: border-box;\n            width: 100%;\n          ", children: [(0, jsx_runtime_1.jsx)("textarea", { name: "note", onInput: handleNoteChange, type: "text", class: "ms_text_input", placeholder: "Add your note here", maxLength: MAX_NOTE_LENGTH, style: "\n                height:100px;\n                resize:none;\n                overflow-y:auto\n                border-radius: 3px;\n                border: solid 1px #CECFD1;\n                width: 100%;\n                font-family: Moonsiftmain, Roboto, sans-serif;\n              ", tabIndex: 6000000 }), (0, jsx_runtime_1.jsxs)("p", { class: "ms_body5", style: "width:100%; text-align:right;", children: [noteCount, "/", MAX_NOTE_LENGTH] }), errorMessage && ((0, jsx_runtime_1.jsx)("p", { class: "ms_body5", style: "width:100%; text-align:right;color:red", children: errorMessage })), (0, jsx_runtime_1.jsxs)("div", { style: "display:flex;flex-grow:1;align-items: flex-end;justify-content:flex-end;", children: [(0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_white", style: "height:36px;margin-right:12px;", onClick: () => setTopRightPopupView("item_saved_successfully"), tabIndex: 6000002, children: "Back" }), (0, jsx_runtime_1.jsxs)("button", { class: "ms_button_base ms_button_primary_white", style: "height:36px;", type: "submit", id: "ms_note_confirm_button", disabled: doneEnabled === false || isWorking, tabIndex: 6000001, children: [!isWorking && "Confirm", LoadingDots_1.LoadingDots.renderDotsAbsolute("standard", isWorking)] })] })] }) }) })] }));
};
// TODO: At some point we'll move to a proper preact implementation.
function renderAddItemNote({ closeFunction, setTopRightPopupView, lastSavedItemDetails, logger, }) {
    return ((0, jsx_runtime_1.jsx)(AddItemNote, { closeFunction: closeFunction, setTopRightPopupView: setTopRightPopupView, lastSavedItemDetails: lastSavedItemDetails, logger: logger }));
}


/***/ }),

/***/ 2826:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderAlertIconWithText = renderAlertIconWithText;
const jsx_runtime_1 = __webpack_require__(201);
function renderAlertIconWithText(text, colour) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/alert_mgs_style.svg"), style: "height:20px;margin-right:8px;" }), (0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody1", style: { color: colour }, children: text })] }));
}


/***/ }),

/***/ 979:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderItemSavedSuccessfully = renderItemSavedSuccessfully;
const jsx_runtime_1 = __webpack_require__(201);
const getAILink_1 = __webpack_require__(869);
function renderItemSavedSuccessfully({ closeFunction, setTopRightPopupView, lastSavedItemDetails, authUserUID, canViewAI, siteUID, displayType, }) {
    var _a, _b, _c, _d, _e, _f, _g;
    const handleOpenAddNoteScreen = () => {
        setTopRightPopupView("add_item_note");
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            width: "300px",
            height: canViewAI ? "317px" : "281px",
            backgroundColor: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
        }, children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody1", style: "align-items: center;position:absolute;left:14px;top:14px;display:flex;", children: (0, jsx_runtime_1.jsxs)("div", { style: "font-color", class: "ms_nonbody1", children: [(0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/tickmark_circle.svg"), style: "height:20px;margin-right:8px;position:relative;top:3px;" }), displayType === "item_note_added_successfully"
                            ? "Note added"
                            : "Saved successfully"] }) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                    closeFunction();
                }, style: "position:absolute;right:10px;top:6px;padding:12px;cursor:pointer;", children: (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/exit_cross.svg"), style: "width: 16px;" }) }), (0, jsx_runtime_1.jsxs)("div", { class: "ms_nonbody1", style: "align-items: center;position:absolute;left:14px;top:51px;display:flex;", children: [(0, jsx_runtime_1.jsx)("img", { style: "width:112px;height:120px;border-radius:10px;object-fit: contain;background-color: #f5f5f5;object-position: bottom center;", src: lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.imageURL }), (0, jsx_runtime_1.jsxs)("div", { style: "width:132px;margin-left:16px;display:flex;flex-direction:column;height:120px;", children: [(0, jsx_runtime_1.jsxs)("div", { style: "display:flex;flex-grow:1;flex-direction:column;align-items:flex-start;justify-content:center;", children: [(0, jsx_runtime_1.jsx)("p", { class: "ms_body4", style: "\n              text-overflow: ellipsis;\n              white-space: nowrap;\n              overflow: hidden;\n              width: 100%;\n              margin:2px;\n              ", children: lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.description }), (0, jsx_runtime_1.jsx)("p", { class: "ms_body4", style: "font-weight:700;margin:2px;", children: lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.price.slice(0, 20) })] }), (0, jsx_runtime_1.jsxs)("div", { style: "display:flex;justify-content:space-between;align-items: center;", children: [displayType === "item_saved_successfully" && ((0, jsx_runtime_1.jsxs)("div", { class: "ms_body4", style: "cursor:pointer;", onClick: handleOpenAddNoteScreen, children: [(0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/plus.svg"), style: "height:20px;margin-right:8px;position:relative;top:3px;" }), "Note"] })), (lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.collectionItems.length) === 1 && ((0, jsx_runtime_1.jsxs)("a", { class: "ms_body4", style: "cursor:pointer;", target: "_blank", href: `${"https://www.moonsift.com"}/collection/${authUserUID}/${(_a = lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.collectionItems[0]) === null || _a === void 0 ? void 0 : _a.collectionUID}?product=${(_b = lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.collectionItems[0]) === null || _b === void 0 ? void 0 : _b.itemUID}`, children: [(0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/edit.svg"), style: "height:20px;margin-right:8px;position:relative;top:3px;" }), "Edit"] }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    position: "absolute",
                    bottom: "0px",
                    background: "#FBFBFB",
                    padding: "20px",
                    width: "300px",
                    height: canViewAI ? "124px" : "88px",
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    borderTop: "1px solid #CECFD1",
                    borderRadius: "0px 0px 10px 10px",
                }, children: [(0, jsx_runtime_1.jsx)("a", { href: `${"https://www.moonsift.com"}/collection/${authUserUID}/${(_c = lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.collectionItems[0]) === null || _c === void 0 ? void 0 : _c.collectionUID}`, target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsx)("button", { class: "ms_button_base ms_button_primary_white", style: "width:100%;margin-bottom:10px;", children: "View collection" }) }), canViewAI && ((0, jsx_runtime_1.jsx)("a", { href: (0, getAILink_1.getAILink)({
                            imageURL: (_d = lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.imageURL) !== null && _d !== void 0 ? _d : "",
                            description: (_e = lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.description) !== null && _e !== void 0 ? _e : "",
                            price: (_f = lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.price) !== null && _f !== void 0 ? _f : "",
                            link: (_g = lastSavedItemDetails === null || lastSavedItemDetails === void 0 ? void 0 : lastSavedItemDetails.link) !== null && _g !== void 0 ? _g : "",
                            siteUID,
                        }), target: "_blank", style: "display:flex;", children: (0, jsx_runtime_1.jsxs)("button", { class: "ms_button_base ms_button_primary_white", style: "width:100%;border-color:#8137CA", children: [(0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/scan_outline_purple.svg"), style: "width: 16px;margin-right:8px;" }), "Find similar items \u2728"] }) }))] })] }));
}


/***/ }),

/***/ 8016:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderPopup = renderPopup;
const jsx_runtime_1 = __webpack_require__(201);
function renderPopup(messageText, button, backgroundColour, closeFunction) {
    const exit_cross_fileloc = backgroundColour === "black"
        ? "images/exit_cross_white.svg"
        : "images/exit_cross.svg";
    return ((0, jsx_runtime_1.jsxs)("div", { style: `width:269px;height:120px;background-color:${backgroundColour};box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);border-radius: 10px;`, children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_nonbody1", style: "align-items: center;position:absolute;left:14px;top:14px;display:flex;", children: messageText }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                    closeFunction();
                }, style: "position:absolute;right:10px;top:6px;padding:12px;cursor:pointer;", children: (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL(exit_cross_fileloc), style: "width: 16px;" }) }), button] }));
}


/***/ }),

/***/ 443:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderProductNotSaved = renderProductNotSaved;
const jsx_runtime_1 = __webpack_require__(201);
const renderAlertIconWithText_1 = __webpack_require__(2826);
const renderPopup_1 = __webpack_require__(8016);
function renderProductNotSaved({ closeFunction, setTopRightMenuView, }) {
    return (0, renderPopup_1.renderPopup)((0, renderAlertIconWithText_1.renderAlertIconWithText)("Product not saved!", "white"), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
            setTopRightMenuView("toolbar_home", false);
            closeFunction();
        }, class: "ms_button_base ms_button_primary_white", style: "position:absolute;right:20px;bottom:20px;", children: "Go back and save" }), "black", closeFunction);
}


/***/ }),

/***/ 1727:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderProductSaveFailed = renderProductSaveFailed;
const jsx_runtime_1 = __webpack_require__(201);
const renderAlertIconWithText_1 = __webpack_require__(2826);
const renderPopup_1 = __webpack_require__(8016);
function renderProductSaveFailed({ closeFunction, setTopRightMenuView, }) {
    return (0, renderPopup_1.renderPopup)((0, renderAlertIconWithText_1.renderAlertIconWithText)("Product failed to saved.", "white"), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
            setTopRightMenuView("toolbar_home", false);
            closeFunction();
        }, class: "ms_button_base ms_button_primary_white", style: "position:absolute;right:20px;bottom:20px;", children: "Try again" }), "black", closeFunction);
}


/***/ }),

/***/ 2502:
/***/ ((__unused_webpack_module, exports) => {


/*
NON-STATIC OBJECT

All this does is show a loading 'ting at the location required and then removes itself

It's a very non-critical component!

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddingButtonAnimation = void 0;
class AddingButtonAnimation {
    constructor(top, right, logger, visibilityInput = true) {
        // constants:
        this.IMAGE_SOURCES = {
            adding_0: "images/adding_full_button_0.svg",
            adding_1: "images/adding_full_button_1.svg",
            adding_2: "images/adding_full_button_2.svg",
        };
        this.appendToDocument = () => {
            try {
                if (document.body) {
                    document.body.appendChild(this.mainContainer);
                    if (this.visibilityInput !== true) {
                        setTimeout(this.removeFromDocument, 1000);
                    }
                    return true;
                }
                return false;
            }
            catch (err) {
                this.logger.debugError(err, "Failed to complete adding of Main click button,critical!");
            }
        };
        this.removeFromDocument = () => {
            try {
                if (this.mainContainer.parentNode) {
                    this.mainContainer.parentNode.removeChild(this.mainContainer);
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to complete removal of Main click button, very non-critical");
            }
        };
        this.logger = logger;
        this.mainContainer = document.createElement("div");
        // Add to document:
        this.visibilityInput = visibilityInput;
        try {
            // Top Container:
            const visibility = visibilityInput ? "visible" : "hidden";
            this.mainContainer.setAttribute("class", "ms_div_factory");
            this.mainContainer.setAttribute("style", "\
          line-height: 0px !important;\
          z-index:2147483647 !important;\
          display:none !important;\
          font-size: 0px !important;\
          position: absolute !important;\
          top:" +
                top +
                " !important;\
          right:" +
                right +
                " !important;\
          display: block !important;\
          visibility:" +
                visibility +
                " !important;\
        ");
            this.mainContainer.attachShadow({ mode: "open" });
            // Style Info:
            const withinCSS = document.createElement("style");
            withinCSS.innerHTML =
                '\
        @keyframes animate_logo {\
           0% { background-image:url("' +
                    chrome.runtime.getURL(this.IMAGE_SOURCES.adding_0) +
                    '"); }\
           25% { background-image:url("' +
                    chrome.runtime.getURL(this.IMAGE_SOURCES.adding_1) +
                    '"); }\
           50% { background-image:url("' +
                    chrome.runtime.getURL(this.IMAGE_SOURCES.adding_2) +
                    '"); }\
           75% { background-image:url("' +
                    chrome.runtime.getURL(this.IMAGE_SOURCES.adding_1) +
                    '"); }\
           100% { background-image:url("' +
                    chrome.runtime.getURL(this.IMAGE_SOURCES.adding_0) +
                    '"); }\
        }\
      ';
            this.mainContainer.shadowRoot &&
                this.mainContainer.shadowRoot.append(withinCSS);
            // Internal image:
            const withinImage = document.createElement("div");
            withinImage.setAttribute("style", "\
          height:22px;\
          width:59px;\
          background-size: cover;\
          animation-name: animate_logo;\
          animation-duration: 2s;\
          animation-iteration-count: infinite;\
          margin-top:5px;\
          margin-right:5px;\
        ");
            this.mainContainer.shadowRoot &&
                this.mainContainer.shadowRoot.append(withinImage);
            // if dummy then add when loaded:
            if (this.visibilityInput !== true) {
                if (!document.body) {
                    // Add to document!
                    const observer = new MutationObserver(() => {
                        if (this.appendToDocument()) {
                            observer.disconnect();
                        }
                    });
                    observer.observe(document.documentElement, { childList: true });
                }
                else {
                    this.appendToDocument();
                }
            }
            // otherwise assume loaded and add it:
            else {
                this.appendToDocument();
            }
        }
        catch (err) {
            this.logger.debugError(err, "Failed to complete loading of Main click button, critical!");
        }
    }
}
exports.AddingButtonAnimation = AddingButtonAnimation;


/***/ }),

/***/ 4656:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
NON-STATIC OBJECT

This part adds a main button if there is a main product:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainClickButton = void 0;
const appendToDocument_1 = __webpack_require__(9484);
const getProductImageURL_1 = __webpack_require__(9881);
const AddButton_1 = __webpack_require__(9122);
const IMAGE_SOURCES = {
    save: "images/side_button_save.svg",
    add: "images/side_button_add.svg",
    adding_0: "images/side_button_adding_0.svg",
    adding_1: "images/side_button_adding_1.svg",
    adding_2: "images/side_button_adding_2.svg",
    added: "images/side_button_saved.svg",
    sign_in: "images/side_button_sign_in.svg",
};
class MainClickButton extends AddButton_1.AddButton {
    constructor(pageInspector) {
        super("main", IMAGE_SOURCES, pageInspector, false);
        this.MCB_POSITION = {
            button_right: 0,
            speech_right: 0,
            button_top: 200,
            speech_top: 200 - 55,
            bubble_right: 55,
            bubble_top: 200,
            find_similar_top: 200 - 55 - 52,
            find_similar_right: 0,
        };
        // moving the main button out of the way of anything:
        this.onSiteSettingsUpdate = (siteSettings) => {
            super.onSiteSettingsUpdate(siteSettings);
            const settings = siteSettings.settings;
            if (settings !== undefined &&
                settings.translate_side_button !== undefined) {
                this.button.container.style.setProperty("top", this.MCB_POSITION.button_top + settings.translate_side_button.x + "px", "important");
                this.popup.container.style.setProperty("top", this.MCB_POSITION.speech_top + settings.translate_side_button.x + "px", "important");
                this.findSimilar.container.style.setProperty("top", this.MCB_POSITION.find_similar_top +
                    settings.translate_side_button.x +
                    "px", "important");
            }
        };
        this.getProduct = () => {
            const product = this.pageInspector.productTracker.getMainProduct();
            if (product) {
                this.productImageURL = (0, getProductImageURL_1.getProductImageURL)(product);
            }
            return product;
        };
        this.mouseOutPopupCheck = (event) => {
            // image will be self reference of target, hover div references image:
            const buttonBCR = this.button.within_container.getBoundingClientRect();
            if (event.clientX >= buttonBCR.left &&
                event.clientX < buttonBCR.left + buttonBCR.width &&
                event.clientY >= buttonBCR.top &&
                event.clientY < buttonBCR.top + buttonBCR.height) {
                // return after doing nothing if within it:
                return;
            }
            // case popup is visible, don't hide if moused over popup:
            const popupBCR = this.popup.within_container.getBoundingClientRect();
            if (event.clientX >= popupBCR.left &&
                event.clientX < popupBCR.left + popupBCR.width &&
                event.clientY >= popupBCR.top &&
                event.clientY < popupBCR.top + popupBCR.height) {
                // return after doing nothing if within it:
                return;
            }
            // case findSimilar is visible, don't hide if moused over popup:
            const findSimilarBCR = this.findSimilar.within_container.getBoundingClientRect();
            if (event.clientX >= findSimilarBCR.left &&
                event.clientX < findSimilarBCR.left + findSimilarBCR.width &&
                event.clientY >= findSimilarBCR.top &&
                event.clientY < findSimilarBCR.top + findSimilarBCR.height) {
                // return after doing nothing if within it:
                return;
            }
            // Make the div disappear
            this.updateState({ mouse: "out", mouseOnButtonOrPopup: "out" });
        };
        // rotate through images on saving (for single-product saving):
        this.rotateThroughImages = () => {
            const logo = this.getLogo();
            if (logo) {
                const oldInt = parseInt(logo.src.slice(-5, -4), 10);
                const newInt = isNaN(oldInt) || oldInt === 2 ? 0 : oldInt + 1;
                logo.src = chrome.runtime.getURL(this.imageSources.adding_0.replace("0", newInt.toString()));
            }
        };
        this.showDots = () => {
            const logo = this.getLogo();
            if (logo) {
                logo.src = chrome.runtime.getURL(this.imageSources.adding_0);
            }
            this.rotateTimer = setInterval(this.rotateThroughImages, 200);
            this.updateState({
                rotateThroughImages: true,
            });
        };
        this.hideDots = (_dots) => {
            if (this.rotateTimer) {
                clearInterval(this.rotateTimer);
            }
            this.updateState({
                rotateThroughImages: false,
            });
        };
        this.render = () => {
            try {
                this.checkAppended();
                this.getWhatToDisplay();
            }
            catch (err) {
                this.logger.debugError(err, "Popup Button render (main) did not complete - non-critical");
            }
        };
        try {
            this.bubble = this.containerSetup("bubble", "main");
            (0, appendToDocument_1.appendToDocument)("body", [this.bubble.container], pageInspector.contentScript.logger);
            // positioning type:
            this.popup.container.style.setProperty("position", "fixed", "important");
            this.button.container.style.setProperty("position", "fixed", "important");
            this.bubble.container.style.setProperty("position", "fixed", "important");
            this.findSimilar.container.style.setProperty("position", "fixed", "important");
            // positioning:
            this.button.container.style.setProperty("right", this.MCB_POSITION.button_right + "px", "important");
            this.button.container.style.setProperty("top", this.MCB_POSITION.button_top + "px", "important");
            this.popup.container.style.setProperty("right", this.MCB_POSITION.speech_right + "px", "important");
            this.popup.container.style.setProperty("top", this.MCB_POSITION.speech_top + "px", "important");
            this.bubble.container.style.setProperty("right", this.MCB_POSITION.bubble_right + "px", "important");
            this.bubble.container.style.setProperty("top", this.MCB_POSITION.bubble_top + "px", "important");
            this.findSimilar.container.style.setProperty("right", this.MCB_POSITION.find_similar_right + "px", "important");
            this.findSimilar.container.style.setProperty("top", this.MCB_POSITION.find_similar_top + "px", "important");
            // flag:
            this.bigifiedOnce = false;
            // And add event listeners for hiding the popup:
            this.button.container.addEventListener("mouseout", (event) => this.mouseOutPopupCheck(event));
            this.popup.container.addEventListener("mouseout", (event) => this.mouseOutPopupCheck(event));
            this.findSimilar.container.addEventListener("mouseout", (event) => this.mouseOutPopupCheck(event));
            // show popup:
            this.button.container.addEventListener("mouseover", (event) => {
                this.updateState({ mouse: "in" });
            });
        }
        catch (err) {
            this.logger.debugError(err, "Failed to complete loading of Main click button, critical");
        }
    }
}
exports.MainClickButton = MainClickButton;


/***/ }),

/***/ 4219:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
NON-STATIC OBJECT

This part adds / removes mouseovers for the images / mouseover elements:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MouseOverManager = void 0;
const MouseOverLayer_1 = __webpack_require__(5499);
class MouseOverManager {
    constructor(pageInspector) {
        this.mouseOverFunction = (elementToAddMouseOverTo) => {
            try {
                if (elementToAddMouseOverTo.ms_mo_image !== undefined) {
                    this.mouseOverLayer.updateState({
                        mouse: "in",
                        lastBoundingRectangle: elementToAddMouseOverTo.ms_mo_image.getBoundingClientRect(),
                        image: elementToAddMouseOverTo.ms_mo_image,
                    });
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to run mouseover for element", elementToAddMouseOverTo, "semi-critical");
            }
        };
        this.mouseOutFunction = (event) => {
            this.mouseOverLayer.mouseOutCheck(event);
        };
        this.addMouseOver = (mouseOverSourceElement) => {
            try {
                // Cannot deal with sourceInfo:
                if (mouseOverSourceElement.sourceInfo === true) {
                    return;
                }
                // All are elements going forward:
                const mouseOverElement = mouseOverSourceElement.ms_mouse_over_parent
                    ? mouseOverSourceElement.ms_mouse_over_parent
                    : mouseOverSourceElement;
                // NOTE THAT elementToAddMouseOverTo and this_mo_element may be different
                // update image to support mouseoverlayers that are bigger than the image and still have working save buttons:
                // BUT if possible use image as the actual image for the positioning etc.
                mouseOverElement.ms_mo_image = mouseOverSourceElement;
                // Set the reference to self for mouseout function!
                const mouseOverFunctionToAdd = () => this.mouseOverFunction(mouseOverElement);
                mouseOverElement.addEventListener("mouseover", mouseOverFunctionToAdd);
                // and add the mouseout to hide the div:
                this.mouseOverStore.set(mouseOverElement, mouseOverFunctionToAdd);
                mouseOverElement.addEventListener("mouseout", this.mouseOutFunction);
            }
            catch (err) {
                this.logger.debugError(err, "Failed to add mouseovers for element", mouseOverSourceElement, "semi-critical");
            }
        };
        this.addMouseOverToList = (productsList) => {
            try {
                for (let product of productsList) {
                    try {
                        const elementListToCheck = product.mouseOverList.length > 0
                            ? product.mouseOverList
                            : product.imageList;
                        for (let element of elementListToCheck) {
                            this.addMouseOver(element);
                        }
                    }
                    catch (err) {
                        this.logger.debugError(err, "Failed to add mouseovers for product", product, "semi-critical");
                    }
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to add mouseovers fully - critical");
            }
        };
        this.removeMouseOvers = () => {
            try {
                // ok to loop through copy of keys and delete during loop:
                for (let elementToRemoveMouseoverFrom of this.mouseOverStore.keys()) {
                    try {
                        // check if product still valid:
                        const product = this.productTracker.getProductByElement(elementToRemoveMouseoverFrom.ms_mo_image);
                        if (product === "not_found") {
                            const mouseoverFunction = this.mouseOverStore.get(elementToRemoveMouseoverFrom);
                            if (mouseoverFunction) {
                                // Set the reference to self for mouseout function!
                                elementToRemoveMouseoverFrom.removeEventListener("mouseover", mouseoverFunction);
                            }
                            delete elementToRemoveMouseoverFrom.ms_mo_image;
                            // and add the mouseout to hide the div:
                            elementToRemoveMouseoverFrom.removeEventListener("mouseout", this.mouseOutFunction);
                            // Not two at once!
                            this.mouseOverStore.delete(elementToRemoveMouseoverFrom);
                        }
                    }
                    catch (err) {
                        this.logger.debugError(err, "Failed to garbage collect for element", elementToRemoveMouseoverFrom, "non-critical");
                    }
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to fully garbage collect mouseovers - non-critical");
            }
        };
        // Bind all methods:
        this.mouseOverLayer = new MouseOverLayer_1.MouseOverLayer(pageInspector);
        this.mouseOverStore = new Map();
        this.mouseOverLayerPostSaving = new MouseOverLayer_1.MouseOverLayer(pageInspector, true);
        (this.productTracker = pageInspector.productTracker),
            (this.logger = pageInspector.logger);
    }
}
exports.MouseOverManager = MouseOverManager;


/***/ }),

/***/ 9122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddButton = void 0;
const preact_1 = __webpack_require__(2865);
const appendToDocument_1 = __webpack_require__(9484);
const getContainerHTML_1 = __webpack_require__(3405);
const reinspectContainer_1 = __webpack_require__(7823);
const setProductCollectionMembership_1 = __webpack_require__(5044);
const checkCanViewAI_1 = __webpack_require__(2434);
const sendBGMessageOneWay_1 = __webpack_require__(2106);
const getAILink_1 = __webpack_require__(869);
const IMAGE_SOURCE_KEYS = (/* unused pure expression or super */ null && ([
    "save",
    "add",
    "adding_0",
    "adding_1",
    "adding_2",
    "added",
    "sign_in",
]));
const SIGNIN_URL = `${"https://www.moonsift.com"}/signin/extension`;
class AddButton {
    // require a try catch otherwise nothing returned and this error will occur:
    // Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    constructor(productType, imageSources, pageInspector, alwaysShowSimilar) {
        this.flashOn = false;
        this.styleButtonImage = {};
        this.styleContainerPopupUpperText = {};
        this.styleContainerPopupAnchor = {};
        this.bigifiedOnce = false;
        this.overlayStyle = (type) => {
            return `
      line-height: 0px !important;
      z-index:${type === "button" ? "2147483647" : "2147483646"} !important;
      display:none !important;
      font-family: Moonsiftmain, Roboto, sans-serif !important;
      letter-spacing: normal !important;
      text-transform: none !important;
      font-size: 0px !important;
      font-style: normal !important;
      font-weight: normal !important;
      color:black !important;
      cursor:pointer !important;
    `;
        };
        this.getLogo = () => {
            return this.button.within_container.getElementsByClassName("ms_logo_button")[0];
        };
        this.containerSetup = (type, productType) => {
            var _a;
            // container button div setup:
            const newContainer = document.createElement("div");
            newContainer.setAttribute("id", "ms_" + type + "_" + productType);
            newContainer.setAttribute("class", "ms_div_factory");
            newContainer.setAttribute("style", this.overlayStyle(type));
            newContainer.attachShadow({ mode: "open" });
            const newWithinContainer = document.createElement("div");
            (_a = newContainer.shadowRoot) === null || _a === void 0 ? void 0 : _a.append(newWithinContainer);
            const htmlToRender = (0, getContainerHTML_1.getContainerHTML)(type, productType, (event) => this.buttonClick(event, type), this.updateState);
            (0, preact_1.render)(htmlToRender, newWithinContainer);
            return {
                container: newContainer,
                within_container: newWithinContainer,
            };
        };
        this.setProductAndOpenDialog = (product) => {
            this.pageInspector.productCollectionMembershipManager.setProduct(product);
            this.pageInspector.overlayManager.setTopRightMenuView("product_collection_membership", false);
        };
        this.buttonClick = async (_event, type) => {
            var _a, _b, _c, _d, _e;
            try {
                // If not signed in, go to sign in:
                if (this.state.signedIn !== true) {
                    window.open(SIGNIN_URL, "_blank");
                    return;
                }
                const initialProduct = this.getProduct();
                // if no product we can't do anything!
                if (initialProduct === undefined) {
                    return;
                }
                // If it's a popup then open the overlay straight away:
                if (type === "popup") {
                    this.setProductAndOpenDialog(initialProduct);
                    return;
                }
                // If it's the AI button, then sort that our here:
                if (type === "findSimilar") {
                    const aiLink = (0, getAILink_1.getAILink)({
                        imageURL: initialProduct.bestImage.currentSrc,
                        price: initialProduct.bestPrice[1],
                        description: initialProduct.bestDescription,
                        link: initialProduct.bestLink,
                        siteUID: (_a = this.logger.siteUID) !== null && _a !== void 0 ? _a : "",
                    });
                    (0, sendBGMessageOneWay_1.sendBGMessageOneWay)({
                        action: "open_tab",
                        data: {
                            url: aiLink,
                        },
                    });
                    return;
                }
                // Get the opinion from the tacker:
                const opinionData = this.pageInspector.opinionTracker.getOpinion(initialProduct.pageURL);
                // Saved OR a last collection is not specified yet:
                if ((opinionData === null || opinionData === void 0 ? void 0 : opinionData.opinion) === true ||
                    this.pageInspector.collectionListManager.lastCollection === undefined) {
                    this.setProductAndOpenDialog(initialProduct);
                    return;
                }
                // Now we can actually add it:
                // track image for later function (not accessing "this"...)
                const image = this.state.image;
                // Prevent double clicking on image or main product:
                const clickUID = image === undefined ? "main" : image;
                if (this.clickWorkingDict.get(clickUID) === false) {
                    return;
                }
                // Can only be working on one product at a time!
                this.clickWorkingDict.set(clickUID, false);
                const dots = this.showDots();
                // Attempt to get the latest product info to make sure we are accurate:
                const refreshedProduct = await (0, reinspectContainer_1.reinspectContainer)(initialProduct, this.pageInspector, this.logger);
                if (refreshedProduct === undefined) {
                    // This new product could, potentially, be out of sync with the original, due to the .ms_ prefixed additions added to elements....
                    this.logger.debugError(new Error("Product recalculation failed"), "Product recalculation failed, refreshedProduct:", refreshedProduct, "non-critical");
                }
                // contunue regardless:
                const product = refreshedProduct !== null && refreshedProduct !== void 0 ? refreshedProduct : initialProduct;
                const setProductCollectionResponse = await (0, setProductCollectionMembership_1.setProductCollectionMembership)(refreshedProduct !== null && refreshedProduct !== void 0 ? refreshedProduct : product, this.pageInspector.collectionListManager.lastCollection.id, true, this.logger);
                if (setProductCollectionResponse.bgSuccess === true) {
                    // global is flashed from BGData, here we flash the extra product mouseover button:
                    if (image !== undefined) {
                        this.pageInspector.mouseOverManager.mouseOverLayerPostSaving.updateState({
                            image: image,
                            signedIn: true,
                            lastBoundingRectangle: this.state.lastBoundingRectangle,
                        });
                        this.pageInspector.mouseOverManager.mouseOverLayerPostSaving.startFlash();
                    }
                    // case no collections exist:
                    if (((_c = (_b = setProductCollectionResponse.message) === null || _b === void 0 ? void 0 : _b.details) === null || _c === void 0 ? void 0 : _c.no_collections) === true) {
                        this.setProductAndOpenDialog(product);
                    }
                    // case save has added an item:
                    if ((_e = (_d = setProductCollectionResponse.message) === null || _d === void 0 ? void 0 : _d.details) === null || _e === void 0 ? void 0 : _e.item_id) {
                        this.pageInspector.overlayManager.setLastSavedProductDetails({
                            collectionItems: [
                                {
                                    itemUID: setProductCollectionResponse.message.details.item_id,
                                    collectionUID: this.pageInspector.collectionListManager.lastCollection.id,
                                },
                            ],
                            imageURL: product.bestImage.currentSrc,
                            price: product.bestPrice[1],
                            description: product.bestDescription,
                            link: product.bestLink,
                        });
                    }
                    {
                        this.pageInspector.overlayManager.setTopRightPopupView("item_saved_successfully");
                    }
                }
                // will be rendered as saved by update from firebase.
                this.clickWorkingDict.delete(clickUID);
                this.hideDots(dots);
            }
            catch (err) {
                this.logger.debugError(err, "Button / Popup click failed - critical!");
            }
        };
        this.checkAppended = () => {
            (0, appendToDocument_1.appendToDocument)("body", [this.button.container, this.popup.container, this.findSimilar.container], this.logger);
        };
        this.endFlash = () => {
            this.popup.container.style.setProperty("opacity", "0.0", "important");
            this.timeout = setTimeout(() => {
                this.flashOn = false;
                this.render();
            }, 1000);
        };
        this.startFlash = () => {
            this.flashOn = true;
            this.popup.container.style.setProperty("transition", null, "important");
            this.render();
            this.popup.container.style.setProperty("transition", "opacity 0.5s linear 0.5s", "important");
            if (this.timeout !== undefined) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(this.endFlash, 2000);
        };
        this.updateState = (newState) => {
            // if changing state then update the tile product placement first!
            if (this.state.image !== newState.image) {
                this.setTileProductPlacement(true);
            }
            this.state = Object.assign({}, this.state, newState);
            this.render();
        };
        this.setTileProductPlacement = (visibility) => {
            const product = this.getProduct();
            if (product !== undefined) {
                this.pageInspector.placementTracker.setVisibility(product.productContainer, this.productType, visibility);
            }
        };
        // Part of rendering:
        this.mouseInOutRendering = (opinionData) => {
            var _a, _b;
            if (this.state.mouse === "in" ||
                this.flashOn === true ||
                this.state.mouseOnButtonOrPopup === "in") {
                this.popup.container.style.setProperty("opacity", "1.0", "important");
                // I think the following 2 lines are redundant:
                this.button.container.style.setProperty("opacity", "1.0", "important");
                this.findSimilar.container.style.setProperty("opacity", "1.0", "important");
                // POPUP RENDERING:
                if (opinionData && opinionData.opinion === true) {
                    // Sometimes the opinion data might not be received yet it appears, but that bug should be caught elsewhere.
                    let membershipCount = 0;
                    let text = "Not Saved";
                    let collectionUIDOut = "";
                    for (let collectionUID in opinionData.productCollectionMembership) {
                        // catch case where collection was not fully deleted!
                        if (opinionData.productCollectionMembership[collectionUID] &&
                            this.pageInspector.collectionListManager.lookupCollectionByUID(collectionUID) !== undefined) {
                            collectionUIDOut = collectionUID;
                            membershipCount++;
                        }
                    }
                    if (membershipCount > 1) {
                        text = membershipCount + " collections";
                    }
                    if (membershipCount === 1) {
                        // Special call to collection manager!
                        text = collectionUIDOut
                            ? (_b = (_a = this.pageInspector.collectionListManager.lookupCollectionByUID(collectionUIDOut)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ""
                            : "";
                    }
                    this.popup.within_container.getElementsByClassName("ms_container_popup_upper_text")[0].innerHTML = "Saved to:";
                    this.popup.within_container.getElementsByClassName("ms_saved_to_text")[0].innerHTML = text;
                    this.popup.container.style.setProperty("display", "flex", "important");
                    if (this.state.canViewAI === true) {
                        this.findSimilar.container.style.setProperty("display", "flex", "important");
                    }
                }
                else {
                    if (this.state.mouseOnButtonOrPopup === "in" &&
                        this.pageInspector.collectionListManager.lastCollection !==
                            undefined &&
                        this.state.signedIn === true) {
                        var text = this.pageInspector.collectionListManager.lastCollection.name;
                        this.popup.within_container.getElementsByClassName("ms_container_popup_upper_text")[0].innerHTML = "Save to:";
                        this.popup.within_container.getElementsByClassName("ms_saved_to_text")[0].innerHTML = text;
                        this.popup.container.style.setProperty("display", "flex", "important");
                        if (this.state.canViewAI === true) {
                            this.findSimilar.container.style.setProperty("display", "flex", "important");
                        }
                    }
                    else {
                        this.popup.container.style.setProperty("display", "none", "important");
                        this.findSimilar.container.style.setProperty("display", "none", "important");
                    }
                }
            }
            else {
                //this.button.container.style.setProperty('opacity', 0.6, 'important');
                //this.popup.container.style.setProperty('opacity', 0.6, 'important');
                this.popup.container.style.setProperty("display", "none", "important");
                this.findSimilar.container.style.setProperty("display", "none", "important");
            }
            // definitely show it!
            this.button.container.style.setProperty("display", "flex", "important");
            if (this.state.canViewAI === true && this.alwaysShowSimilar === true) {
                this.findSimilar.container.style.setProperty("display", "flex", "important");
            }
            // for the biggification (main product):
            if (this.bigifiedOnce === false && this.bubble) {
                const bubbleContainerAnchor = this.bubble.within_container.getElementsByClassName("ms_container_bubble_a")[0];
                if (bubbleContainerAnchor) {
                    window.setTimeout(() => (bubbleContainerAnchor.style.width = "155px"), 1000);
                    window.setTimeout(() => (bubbleContainerAnchor.style.width = "0px"), 3500);
                }
                this.bigifiedOnce = true;
            }
        };
        this.getWhatToDisplay = () => {
            var _a, _b;
            const product = this.getProduct();
            const findSimilarImage = this.findSimilar.within_container.getElementsByClassName("ms_find_similar_img")[0];
            if (findSimilarImage) {
                findSimilarImage.src = (_a = this.productImageURL) !== null && _a !== void 0 ? _a : "";
            }
            // case no product of this type:
            if (product === undefined || this.state.runHere === false) {
                this.button.container.style.setProperty("display", "none", "important");
                this.popup.container.style.setProperty("display", "none", "important");
                this.findSimilar.container.style.setProperty("display", "none", "important");
                return;
            }
            if (this.state.signedIn !== true) {
                const logo = this.getLogo();
                if (logo) {
                    logo.src = chrome.runtime.getURL(this.imageSources.sign_in);
                }
                this.button.container.style.setProperty("display", "flex", "important");
                this.popup.container.style.setProperty("display", "none", "important");
                this.findSimilar.container.style.setProperty("display", "none", "important");
                return;
            }
            const opinionData = this.pageInspector.opinionTracker.getOpinion(product.pageURL);
            if (!opinionData) {
                // Maybe no product data yet:
                this.button.container.style.setProperty("display", "none", "important");
                this.popup.container.style.setProperty("display", "none", "important");
                this.findSimilar.container.style.setProperty("display", "none", "important");
                return;
            }
            // show if there is a product:
            this.mouseInOutRendering(opinionData);
            // Set logo sources:
            if (opinionData.opinion === true) {
                // set source of image:
                const logo = this.getLogo();
                if (logo) {
                    logo.src = chrome.runtime.getURL(this.imageSources.added);
                }
                return;
            }
            // Case is not added yet:
            if (this.state.rotateThroughImages !== true) {
                // Main button only this condition!
                const logo = this.getLogo();
                if (logo) {
                    if (this.state.mouseOverButton === "in") {
                        logo.src = chrome.runtime.getURL(this.imageSources.add);
                    }
                    else {
                        logo.src = chrome.runtime.getURL(this.imageSources.save);
                    }
                }
                if (this.bubble) {
                    const bubbleImage = this.bubble.within_container.getElementsByClassName("ms_bubble_img")[0];
                    if (bubbleImage) {
                        bubbleImage.src = (_b = this.productImageURL) !== null && _b !== void 0 ? _b : "";
                    }
                    this.bubble.container.style.setProperty("display", "flex", "important");
                }
            }
        };
        // Bind this one as called in extended object via "super."
        this.onSiteSettingsUpdate = this.onSiteSettingsUpdate.bind(this);
        // constants:
        this.pageInspector = pageInspector;
        this.productType = productType;
        this.imageSources = imageSources;
        this.alwaysShowSimilar = alwaysShowSimilar;
        this.logger = this.pageInspector.contentScript.logger;
        // default state:
        this.state = {
            mouse: "out",
            mouseOverButton: "out",
            mouseOnButtonOrPopup: "out",
            signedIn: undefined,
            image: undefined,
            rotateThroughImages: false,
            runHere: false,
            canViewAI: false,
        };
        this.clickWorkingDict = new Map();
        // setup divs:
        this.button = this.containerSetup("button", productType);
        this.popup = this.containerSetup("popup", productType);
        this.findSimilar = this.containerSetup("findSimilar", productType);
        try {
            // add containers to document:
            (0, appendToDocument_1.appendToDocument)("body", [
                this.button.container,
                this.popup.container,
                this.findSimilar.container,
            ], this.logger);
        }
        catch (err) {
            this.logger.debugError(err, "Failed to complete loading of Add button for " +
                productType +
                ", critical");
        }
    }
    onSiteSettingsUpdate(siteSettings) {
        const signedIn = siteSettings.userUID !== undefined;
        if (this.state.signedIn !== signedIn ||
            this.state.runHere !== siteSettings.runHere) {
            this.updateState({
                signedIn: signedIn,
                runHere: siteSettings.runHere,
                canViewAI: (0, checkCanViewAI_1.checkCanViewAI)(siteSettings.userVerifiedSettings, this.logger.siteUID, siteSettings.settings),
            });
        }
    }
    // To be overridden as required:
    hideDots(_dots) {
        throw new Error("Method not implemented");
    }
    showDots() {
        throw new Error("Method not implemented");
    }
    render() {
        throw new Error("Method not implemented");
    }
    getProduct() {
        throw new Error("Method not implemented");
        return {};
    }
}
exports.AddButton = AddButton;


/***/ }),

/***/ 5499:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MouseOverLayer = void 0;
const pxToFloat_1 = __webpack_require__(7347);
const AddingButtonAnimation_1 = __webpack_require__(2502);
const AddButton_1 = __webpack_require__(9122);
/*
NON-STATIC OBJECT

Mouse overs images (What the mouseover actually contains:)

Last reviewed 12th May 2020 by David Wood
globals, errors, logging,


state:
 mouseOnButtonOrPopup: "in"/"out"
 mouse: "in"/"out" - for image that we are mousing over.

 behaviour when not saved:
 mouse in means display button Only
 mouseOnButtonOrPopup means display "+ button" and popup.

 behaviour when saved:
 when mouse in display the saved button and popup.
*/
const IMAGE_SOURCES = {
    save: "images/logo_full_button.svg",
    add: "images/add_full_button.svg",
    adding_0: "images/adding_full_button_0.svg",
    adding_1: "images/adding_full_button_1.svg",
    adding_2: "images/adding_full_button_2.svg",
    added: "images/saved_full_button.svg",
    sign_in: "images/sign_in_full_button.svg",
};
class MouseOverLayer extends AddButton_1.AddButton {
    constructor(pageInspector, flash = false) {
        const productType = flash !== true ? "tile" : "flash_tile";
        super(productType, IMAGE_SOURCES, pageInspector, true);
        this.flash = false;
        this.getProduct = () => {
            const product = this.pageInspector.productTracker.getProductByElement(this.state.image);
            if (product === "not_found") {
                return undefined;
            }
            else {
                return product;
            }
        };
        this.render = () => {
            try {
                this.checkAppended();
                const image = this.state.image;
                if ((this.flashOn === true || this.state.mouse === "in") &&
                    image !== undefined) {
                    // 1) update the positioning:
                    // get the current bounds:
                    const bCR = image.getBoundingClientRect();
                    // only store if we get something useful back (i.e. it's not already been removed!)
                    if (bCR !== undefined && bCR.height !== 0) {
                        // Make the div appear in the correct position:
                        const offset = this.getWindowOffset(image, bCR);
                        /*
                                  window.getComputedStyle(document.body).position
                                  If this value is "static" then the position is from the innerWindowBottom
                                  If this value is "relative" then the position is from the actual document bottom (hehe)!
                                  There is at least one site (ruby nz) that has a relative html and static body (why who knows...)  all others seem to have static html.
                                  */
                        const bodyStyle = window.getComputedStyle(document.body);
                        const bodyBCR = document.body.getBoundingClientRect();
                        // offset is wrt to window!
                        // but we are displaying this in the BODY of the HTML:
                        // so we have 3 types of positioning!
                        let newTop = offset.top;
                        let newRight = -offset.right_from_left;
                        let newBottom = -offset.top;
                        // Initial calculations from bottom and right, as we currently have top and left:
                        // if body is positioned (not static) then we need to use the body bcr, but first make sure we have the correct positioning:
                        if (bodyStyle.position !== "static") {
                            newTop -= bodyBCR.top + window.pageYOffset;
                            newRight += bodyBCR.left + window.pageXOffset;
                            newBottom += bodyBCR.top + window.pageYOffset;
                            newTop -= (0, pxToFloat_1.pxToFloat)(bodyStyle.borderTop);
                            newRight += bodyBCR.width - (0, pxToFloat_1.pxToFloat)(bodyStyle.borderLeft);
                            newBottom += bodyBCR.height - (0, pxToFloat_1.pxToFloat)(bodyStyle.borderTop);
                        }
                        else {
                            const bodyParent = document.body.parentElement;
                            if (bodyParent) {
                                const htmlStyle = window.getComputedStyle(bodyParent);
                                const htmlBCR = bodyParent.getBoundingClientRect();
                                // positioned wrt to html bcr:
                                if (htmlStyle.position !== "static") {
                                    newTop -= htmlBCR.top + window.pageYOffset;
                                    newRight += htmlBCR.left + window.pageXOffset;
                                    newBottom += htmlBCR.top + window.pageYOffset;
                                    newTop -= (0, pxToFloat_1.pxToFloat)(htmlStyle.borderTop);
                                    newRight += htmlBCR.width - (0, pxToFloat_1.pxToFloat)(htmlStyle.borderLeft);
                                    newBottom += htmlBCR.height - (0, pxToFloat_1.pxToFloat)(htmlStyle.borderTop);
                                }
                                // Positioning is wrt to window:
                                else {
                                    // the scrolling element can vary depending on if there is a doctype or not, i.e. if it is in "quirks mode" or not.
                                    // eeeek!
                                    if (document.scrollingElement === document.documentElement) {
                                        newRight += document.documentElement.clientWidth;
                                        newBottom += document.documentElement.clientHeight;
                                    }
                                    else {
                                        newRight += document.body.clientWidth;
                                        newBottom += document.body.clientHeight;
                                    }
                                }
                            }
                        }
                        this.button.container.style.setProperty("top", newTop + "px", "important");
                        this.button.container.style.setProperty("right", newRight + "px", "important");
                        this.popup.container.style.setProperty("bottom", newBottom + "px", "important");
                        this.popup.container.style.setProperty("right", newRight + "px", "important");
                        this.findSimilar.container.style.setProperty("bottom", newBottom - bCR.height + "px", "important");
                        this.findSimilar.container.style.setProperty("right", newRight + "px", "important");
                        // make it appear full stop!:
                    }
                    // 2) display this:
                    this.getWhatToDisplay();
                    // 3) hide associated tag(s):
                    this.setTileProductPlacement(false);
                }
                else {
                    // set any associated tag as visible:
                    this.setTileProductPlacement(true);
                    // hide the popup + button:
                    this.popup.container.style.setProperty("display", "none", "important");
                    this.button.container.style.setProperty("display", "none", "important");
                    this.findSimilar.container.style.setProperty("display", "none", "important");
                }
            }
            catch (err) {
                this.logger.debugError(err, "Popup Button render (main) did not complete - non-critical");
            }
        };
        this.showDots = () => {
            return new AddingButtonAnimation_1.AddingButtonAnimation(this.button.container.style.top, this.button.container.style.right, this.logger);
        };
        this.hideDots = (animation) => {
            animation.removeFromDocument();
        };
        // Get the images offset in the window on mouseover:
        // The position we need to put the top right corner of the save button, bottom right corner of the info pop-up.
        this.getWindowOffset = (element, bcr) => {
            // add the scroll positions too, as ints not floats:
            var topAddition = 0;
            var rightAddition = 0;
            /*
                if (element.ms_page_displacement!==undefined){
                    topAddition = element.ms_page_displacement.y;
                    rightAddition = -element.ms_page_displacement.x;
                }*/
            if (element.constructor.name === "HTMLImageElement") {
                const computed_style = window.getComputedStyle(element);
                topAddition +=
                    (0, pxToFloat_1.pxToFloat)(computed_style.paddingTop) +
                        (0, pxToFloat_1.pxToFloat)(computed_style.borderTopWidth);
                rightAddition -=
                    (0, pxToFloat_1.pxToFloat)(computed_style.paddingRight) +
                        (0, pxToFloat_1.pxToFloat)(computed_style.borderRightWidth);
            }
            return {
                top: Math.round(bcr.top) + window.pageYOffset + topAddition,
                right_from_left: Math.round(bcr.right) + window.pageXOffset + rightAddition,
            };
        };
        // check if the mouse is actually out of the image or just over the hover area:
        this.mouseOutCheck = (event) => {
            // image will be self reference of target, hover div references image:
            const image = this.state.image;
            try {
                if (image !== undefined) {
                    const latestBCR = image.getBoundingClientRect();
                    // if bounding rect is null then use the last known one on mouseover:
                    const boundingRectangle = latestBCR.height === 0 && this.state.lastBoundingRectangle
                        ? this.state.lastBoundingRectangle
                        : latestBCR;
                    // This to prevent a mouseout triggering if over popup... but can probably just do another check...
                    const topPosition = boundingRectangle.top;
                    const rightPosition = boundingRectangle.right;
                    const leftPosition = boundingRectangle.left;
                    const bottomPosition = boundingRectangle.bottom;
                    if (
                    // Inside the original image bounds:
                    event.clientX <= rightPosition &&
                        event.clientX >= leftPosition &&
                        event.clientY >= topPosition &&
                        event.clientY <= bottomPosition) {
                        // return after doing nothing if within it:
                        return;
                    }
                    // case popup is visible, don't hide if moused over popup:
                    else {
                        const popupBCR = this.popup.within_container.getBoundingClientRect();
                        if (event.clientX >= popupBCR.left &&
                            event.clientX < popupBCR.left + popupBCR.width &&
                            event.clientY >= popupBCR.top &&
                            event.clientY < popupBCR.top + popupBCR.height + 5 // rounding errors cause problems...
                        ) {
                            // return after doing nothing if within it:
                            return;
                        }
                        else {
                            // Make the div disappear
                            this.updateState({
                                mouse: "out",
                                mouseOnButtonOrPopup: "out",
                            });
                        }
                    }
                }
                else {
                    // image not defined anymore...:
                    this.updateState({
                        mouse: "out",
                        mouseOnButtonOrPopup: "out",
                    });
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to check mouseover validity on mouseout for image - non-critical", image);
            }
        };
        this.flash = flash;
        try {
            // positioning type:
            this.popup.container.style.setProperty("position", "absolute", "important");
            this.button.container.style.setProperty("position", "absolute", "important");
            this.findSimilar.container.style.setProperty("position", "absolute", "important");
            // positioning handled later....
            // flashing:
            if (this.flash !== true) {
                // need to check when mouse goes out if it should be displayed too (case mouse out of div and image)  could remove probably by placing entirely within image?!
                // binded this!
                this.popup.container.addEventListener("mouseout", (event) => {
                    this.updateState({
                        mouseOnButtonOrPopup: "out",
                    });
                    this.mouseOutCheck(event);
                });
                this.button.container.addEventListener("mouseout", (event) => {
                    this.mouseOutCheck(event);
                });
            }
        }
        catch (err) {
            this.logger.debugError(err, "Failed to complete loading of a mouseover click button, critical");
        }
    }
}
exports.MouseOverLayer = MouseOverLayer;


/***/ }),

/***/ 3405:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getContainerHTML = getContainerHTML;
const jsx_runtime_1 = __webpack_require__(201);
const getStyleButtonImage_1 = __webpack_require__(579);
const getStyleContainerPopupUpperText_1 = __webpack_require__(8656);
const getStyleContainerPopupA_1 = __webpack_require__(196);
function getContainerHTML(type, productType, onClickHandler, updateState) {
    switch (type) {
        case "button":
            return ((0, jsx_runtime_1.jsx)("a", { class: "ms_container_button_a", style: "text-decoration:none;color:inherit;", onClick: onClickHandler, onMouseOver: () => updateState({
                    mouseOverButton: "in",
                    mouseOnButtonOrPopup: "in",
                }), onMouseOut: () => updateState({
                    mouseOverButton: "out",
                }), children: (0, jsx_runtime_1.jsx)("img", { class: "ms_logo_button", style: (0, getStyleButtonImage_1.getStyleButtonImage)(productType) }) }));
        case "popup":
            return ((0, jsx_runtime_1.jsx)("a", { class: "ms_container_popup_a", style: (0, getStyleContainerPopupA_1.getStyleContainerPopupA)(productType), onClick: onClickHandler, children: (0, jsx_runtime_1.jsxs)("div", { style: "box-sizing: border-box;border-radius: 5px;padding:4px 8px;display:flex;align-content:center;align-items: center;", children: [(0, jsx_runtime_1.jsxs)("div", { style: "display:flex;flex-direction:column;align-items:center;", children: [(0, jsx_runtime_1.jsx)("div", { class: "ms_container_popup_upper_text", style: (0, getStyleContainerPopupUpperText_1.getStyleContainerPopupUpperText)(productType) }), (0, jsx_runtime_1.jsx)("div", { class: "ms_saved_to_text", style: "text-align:left;font-weight:bold;width:110px;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;font-size:12px;line-height:14px;", children: "\u00A0" })] }), (0, jsx_runtime_1.jsx)("img", { src: chrome.runtime.getURL("images/down_arrow.svg"), style: "padding-left:10px;" })] }) }));
        case "bubble":
            return ((0, jsx_runtime_1.jsx)("a", { class: "ms_container_bubble_a", onClick: onClickHandler, style: `
          background-image:url('${chrome.runtime.getURL("images/speech_shadow_left.svg")}');
          width:0px;
          height:59px;
          transition: width 1s ease-in-out;
          overflow:hidden;
          display:flex;
        `, children: (0, jsx_runtime_1.jsxs)("div", { style: "\n            padding:8px 22px 12px 12px;\n            display:flex;\n            justify-content:space-between;\n            box-sizing:border-box;\n            align-items:center;\n          ", children: [(0, jsx_runtime_1.jsx)("img", { src: "", class: "ms_bubble_img", style: "\n              background-color:#FFFFFF;\n              height:39px;\n              width:39px;\n              object-fit: contain;\n            " }), (0, jsx_runtime_1.jsx)("div", { style: "\n              font-family: Moonsiftmain, Roboto,  sans-serif;\n              font-style: normal;\n              font-size: 14px;\n              line-height: 20px;\n              font-weight: bold;\n              margin-left:12px;\n            ", children: "Save to Moonsift" })] }) }));
        case "findSimilar":
            if (productType === "main") {
                return ((0, jsx_runtime_1.jsx)("div", { style: "\n            width:152px;\n            height:52px;\n          ", children: (0, jsx_runtime_1.jsxs)("div", { style: "\n              width:146px;\n              height:46px;\n              border-radius:4px;\n              box-shadow: 0px 2px 4px 0px #00000059;\n              background: #FFFFFF;\n              display:flex;\n              padding:0px 5px;\n              align-items:center;\n              box-sizing:border-box;\n            ", onClick: onClickHandler, children: [(0, jsx_runtime_1.jsx)("img", { src: "", class: "ms_find_similar_img", style: "\n                background-color:#FFFFFF;\n                height:38px;\n                width:34px;\n                object-fit: contain;\n              " }), (0, jsx_runtime_1.jsx)("img", { style: "\n                height:16px;\n                width:16px;\n                margin-left:6px;\n              ", src: chrome.runtime.getURL("images/scan_outline_black.svg") }), (0, jsx_runtime_1.jsx)("div", { style: "\n                font-family: Moonsiftmain, Roboto,  sans-serif;\n                font-style: normal;\n                font-size: 14px;\n                line-height: 20px;\n                font-weight: bold;\n                margin-left:6px;\n              ", children: "Find similar" })] }) }));
            }
            else {
                return ((0, jsx_runtime_1.jsx)("a", { class: "ms_container_button_a", style: "text-decoration:none;color:inherit;", onClick: onClickHandler, children: (0, jsx_runtime_1.jsx)("img", { class: "ms_logo_button", style: {
                            height: "22px",
                            paddingBottom: "5px",
                            paddingRight: "5px",
                        }, src: chrome.runtime.getURL("images/similar_button.svg") }) }));
            }
    }
}


/***/ }),

/***/ 579:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getStyleButtonImage = getStyleButtonImage;
function getStyleButtonImage(productType) {
    if (productType === "main") {
        return {
            height: "55px",
        };
    }
    else {
        return {
            height: "22px",
            paddingTop: "5px",
            paddingRight: "5px",
        };
    }
}


/***/ }),

/***/ 196:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getStyleContainerPopupA = getStyleContainerPopupA;
function getStyleContainerPopupA(productType) {
    const speechBGImagePath = productType === "main"
        ? "images/speech_shadow_above.svg"
        : "images/speech_above.svg";
    return {
        display: "flex",
        alignItems: "flex-start",
        paddingBottom: "2px",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundImage: `url('${chrome.runtime.getURL(speechBGImagePath)}')`,
        ...(productType === "main"
            ? {
                height: "61px",
                width: "158px",
                padding: "5px",
            }
            : {
                height: "41px",
                width: "146px",
            }),
    };
}


/***/ }),

/***/ 8656:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getStyleContainerPopupUpperText = getStyleContainerPopupUpperText;
function getStyleContainerPopupUpperText(productType) {
    return {
        width: "100%",
        textAlign: "left",
        color: "#7E7E7E",
        ...(productType === "main"
            ? {
                fontSize: "10px",
                lineHeight: "16px",
                marginBottom: "1px",
            }
            : {
                fontSize: "9px",
                lineHeight: "11px",
            }),
    };
}


/***/ }),

/***/ 6752:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductPlacementTracker = void 0;
const pxToFloat_1 = __webpack_require__(7347);
const getProductImageElement_1 = __webpack_require__(8646);
const getTransformShifts_1 = __webpack_require__(4915);
const getZIndex_1 = __webpack_require__(1118);
const SavedTag_1 = __webpack_require__(5763);
class ProductPlacementTracker {
    constructor(productTracker, logger, opinionTracker) {
        // For getting all entries of specific image URL when that image is signalled as LOADED.
        this.getEntryByTopContainer = (topContainer) => {
            return this.storeByTopContainer.get(topContainer);
        };
        this.add = (topContainer, inputPlacementDict) => {
            try {
                const entry = this.storeByTopContainer.get(topContainer);
                const visibilityRef = entry === undefined ? {} : entry.visibilityRef;
                const placementDict = Object.assign(entry === undefined ? {} : entry.placementDict, inputPlacementDict);
                this.storeByTopContainer.set(topContainer, {
                    placementDict,
                    visibilityRef,
                });
            }
            catch (err) {
                this.logger.debugError(err, "Failed to add to product placement tracker, non-critical", topContainer, inputPlacementDict);
            }
        };
        this.setVisibility = (topContainer, ref, visibility) => {
            try {
                const info = this.storeByTopContainer.get(topContainer);
                if (info !== undefined) {
                    info.visibilityRef[ref] = visibility;
                }
                this.updateVisibility(topContainer);
            }
            catch (err) {
                this.logger.debugError(err, "Failed to set product placement tracker visiblity, non-critical", topContainer, ref, visibility);
            }
        };
        this.updateVisibility = (topContainer) => {
            try {
                const info = this.storeByTopContainer.get(topContainer);
                if (info !== undefined) {
                    // Detemine overall visibility according to buttons:
                    let overallVisiblity = true;
                    for (let key in info.visibilityRef) {
                        if (info.visibilityRef[key] === false) {
                            overallVisiblity = false;
                        }
                    }
                    // Update any placed tags:
                    for (let key in info.placementDict) {
                        const tag = info.placementDict[key];
                        tag && tag.updateVisibility(overallVisiblity);
                    }
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to update product placement tracker visiblity, non-critical", topContainer);
            }
        };
        this.garbageCollect = () => {
            try {
                // If no longer a product for that container then clear up the tags:
                for (let topContainer of this.storeByTopContainer.keys()) {
                    try {
                        const product = this.productTracker.getProductByElement(topContainer);
                        if (product === "not_found") {
                            const info = this.storeByTopContainer.get(topContainer);
                            if (info) {
                                for (let key in info.placementDict) {
                                    const tag = info.placementDict[key];
                                    tag && tag.removeFromDocument();
                                }
                                this.storeByTopContainer.delete(topContainer);
                            }
                        }
                    }
                    catch (err) {
                        this.logger.debugError(err, "Failed to garbage collect for top container - non-critical", topContainer);
                    }
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to fully garbage collect in product placement tracker - non-critical");
            }
        };
        // update the placement based on the latest product info:
        this.updateProduct = (product) => {
            try {
                if (product.mainProduct !== true) {
                    // get the best image to use and its offset:
                    const [image, offsetParent] = (0, getProductImageElement_1.getProductImageElement)(product);
                    // get the opinion:
                    const opinionInfo = this.opinionTracker.getOpinion(product.pageURL);
                    // Proceed if we have the data, will create a tag for all of them for now as we might have other things we want to add another time e.g. notifications:
                    if (image && offsetParent) {
                        // OPINION:
                        const opinion = opinionInfo && opinionInfo.opinion === true ? true : false;
                        // POSITIONING:
                        const computedStyle = window.getComputedStyle(image);
                        const transform = (0, getTransformShifts_1.getTransformShifts)(computedStyle);
                        const zindex = (0, getZIndex_1.getZIndex)(image, offsetParent) + 1;
                        // get the offset position (top right):
                        // NOTE: offsetWidth includes borders + padding!
                        let top = image.offsetTop + transform.y;
                        let rightFromLeft = image.offsetLeft + image.offsetWidth + transform.x;
                        // Images require moving inside padding and borders:
                        if (image.constructor.name === "HTMLImageElement") {
                            top +=
                                (0, pxToFloat_1.pxToFloat)(computedStyle.paddingTop) +
                                    (0, pxToFloat_1.pxToFloat)(computedStyle.borderTopWidth);
                            rightFromLeft -=
                                (0, pxToFloat_1.pxToFloat)(computedStyle.paddingRight) +
                                    (0, pxToFloat_1.pxToFloat)(computedStyle.borderRightWidth);
                        }
                        // PRODUCTPLACEMENT:
                        // get from productplacement tracker if present:
                        const productTrackerDict = this.getEntryByTopContainer(product.productContainer);
                        // SAVED TAG:
                        let savedTag;
                        if (productTrackerDict !== undefined &&
                            productTrackerDict.placementDict !== undefined) {
                            if (productTrackerDict.placementDict.saved_tag !== undefined) {
                                savedTag = productTrackerDict.placementDict.saved_tag;
                            }
                        }
                        // Only add a new one if opinion is true:
                        if (savedTag === undefined && opinion) {
                            // no tag exists so create a new one:
                            savedTag = new SavedTag_1.SavedTag(this.logger);
                            // send into the productplacement_tracker:
                            this.add(product.productContainer, {
                                saved_tag: savedTag,
                            });
                        }
                        if (savedTag !== undefined) {
                            // update the saved tag object:
                            savedTag.update(rightFromLeft, top, zindex, image, offsetParent, opinion);
                        }
                        // update visiblity:
                        this.updateVisibility(product.productContainer);
                    }
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to update a single tile product's placement tag fully, non-critical", product);
            }
        };
        this.updateTilePlacements = (tileProducts) => {
            try {
                for (let product of tileProducts) {
                    this.updateProduct(product);
                }
                // And garbage collect:
                this.garbageCollect();
            }
            catch (err) {
                this.logger.debugError(err, "Failed to update at least some tile product's placement tags, non-critical");
            }
        };
        // supplementary dicts to allow convenient look-ups:
        this.storeByTopContainer = new Map();
        this.productTracker = productTracker;
        this.logger = logger;
        this.opinionTracker = opinionTracker;
    }
}
exports.ProductPlacementTracker = ProductPlacementTracker;


/***/ }),

/***/ 5763:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedTag = void 0;
/*
NON-STATIC CLASS
The saved tag simply shows that a product is saved:

Errors should propagate up as critical.

*/
class SavedTag {
    constructor(logger) {
        this.doMouseover = () => {
            this.mouseOverLayer &&
                this.mouseoverImage &&
                this.mouseOverLayer.updateState({
                    mouse: "in",
                    lastBoundingRectangle: this.mouseoverImage.getBoundingClientRect(),
                    image: this.mouseoverImage,
                });
        };
        this.makeTag = () => {
            this.container = document.createElement("div");
            this.container.setAttribute("class", "ms_saved_tag");
            this.container.setAttribute("style", "\
      all: initial !important;\
      line-height: 0px !important;\
      position: absolute !important;\
    ");
            this.container.innerHTML =
                '<img style="all: initial !important;height:22px !important;" src="' +
                    chrome.runtime.getURL("images/saved_full_button.svg") +
                    '"/>';
            this.container.addEventListener("mouseover", this.doMouseover);
            return this.container;
        };
        this.mouseoverCallback = (mutationsList, observer) => {
            try {
                if (this.container &&
                    this.container.parentElement === null &&
                    this.parentContainer) {
                    this.parentContainer.appendChild(this.container);
                    this.mouseoverRunLength += 1;
                }
                // failsafe if site script plays havoc!
                if (this.mouseoverRunLength > 2000 && this.mutationObserver) {
                    this.mutationObserver.disconnect();
                    this.logger.debugError(new Error("Maximum number of mutations observed!"), "Maximum number of mutations observed!", mutationsList, observer);
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to run mutation observer callback on child monitoring, non-critical", mutationsList, observer);
            }
        };
        this.update = (rightFromLeft, top, zindex, imageElement, offsetParent, opinion) => {
            var _a;
            try {
                // if opinion true then go and make the container:
                if (opinion === true && offsetParent && imageElement) {
                    // need to remove any margins from document body:
                    // calculate right position from right:
                    const parent_offset_width = offsetParent.clientWidth;
                    const right_from_right = parent_offset_width - rightFromLeft;
                    const container = (_a = this.container) !== null && _a !== void 0 ? _a : this.makeTag();
                    this.mouseoverImage = imageElement;
                    container.style.setProperty("right", right_from_right + 5 + "px", "important");
                    container.style.setProperty("top", top + 5 + "px", "important");
                    container.style.setProperty("z-index", zindex.toString(), "important");
                    if (container.parentElement !== offsetParent) {
                        this.removeFromDocument();
                        // Additionals will not have any effect (think...!):
                        this.mutationObserver = new MutationObserver(this.mouseoverCallback);
                        this.mutationObserver.observe(offsetParent, {
                            childList: true,
                        });
                        offsetParent.appendChild(container);
                    }
                    // remove if opinion now false:
                }
                else {
                    this.removeFromDocument();
                }
                // in anycase store the left and top positions:
                this.parentContainer = offsetParent;
            }
            catch (err) {
                this.logger.debugError(err, "Failed to update saved tag, non-critical", imageElement, offsetParent, this);
            }
        };
        this.removeFromDocument = () => {
            try {
                if (this.container !== undefined && this.container.parentElement) {
                    this.container.parentElement.removeChild(this.container);
                }
                if (this.mutationObserver !== undefined) {
                    this.mutationObserver.disconnect();
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to remove saved tag, non-critical", this);
            }
        };
        this.updateVisibility = (visibility) => {
            try {
                const newValue = visibility ? "block" : "none";
                if (this.container !== undefined) {
                    this.container.style.setProperty("display", newValue, "important");
                }
            }
            catch (err) {
                this.logger.debugError(err, "Failed to update saved tag visibility, non-critical", this);
            }
        };
        this.logger = logger;
        this.mouseoverRunLength = 0;
    }
}
exports.SavedTag = SavedTag;


/***/ }),

/***/ 8646:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getProductImageElement = getProductImageElement;
const getParentElementAtLevel_1 = __webpack_require__(8511);
function getImageWithOffset(image, imageList) {
    // get best offset image:
    if ("offsetParent" in image) {
        return image;
    }
    // NOTE: might not be an image element if from meta!!
    // move meta images to the end as we don't want them :D.
    const sortedImageList = [...imageList].sort((x, y) => ("ms_ps_area" in x && "ms_ps_area" in y && x.ms_ps_area < y.ms_ps_area) ||
        !("ms_ps_area" in x)
        ? 1
        : -1);
    for (let imageOfList of sortedImageList) {
        if ("offsetParent" in imageOfList) {
            return imageOfList;
        }
    }
    // Fallback:
    return null;
}
// this can be done in a number of ways, but mostly will be done wrt to the main tile image:
function getProductImageElement(product) {
    const imageElement = getImageWithOffset(product.bestImage, product.imageList);
    if (!imageElement) {
        return [null, null];
    }
    // get what to return (image or parent or top container..):
    if (product.positionerContainer === undefined) {
        return [imageElement, imageElement.offsetParent];
    }
    if (product.positionerContainer.parentLevel === undefined) {
        return [imageElement, product.positionerContainer];
    }
    if (product.positionerContainer.parentLevel !== undefined) {
        const container = (0, getParentElementAtLevel_1.getParentElementAtLevel)(imageElement, product.positionerContainer.parentLevel);
        [imageElement, container];
    }
    return [null, null];
}


/***/ }),

/***/ 4915:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTransformShifts = getTransformShifts;
// we will assume no rotation for now:
function getTransformShifts(computedStyle) {
    const transform = computedStyle
        .getPropertyValue("transform")
        .match(/(-?[0-9.]+)/g);
    if (transform === null || transform.length !== 6) {
        return {
            x: 0,
            y: 0,
        };
    }
    else {
        return {
            x: +transform[4],
            y: +transform[5],
        };
    }
}


/***/ }),

/***/ 1118:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getZIndex = getZIndex;
function getZIndex(element, offsetParent) {
    //get the highest z-index between this image / div and it's offsetParent:
    if (element !== offsetParent) {
        const computedStyle = window.getComputedStyle(element);
        const zIndex = computedStyle.zIndex === "auto" ? 0 : +computedStyle.zIndex;
        // recursively get the next one up:
        if (element.parentElement) {
            const highestParentsZIndex = getZIndex(element.parentElement, offsetParent);
            return highestParentsZIndex > zIndex ? highestParentsZIndex : zIndex;
        }
        return zIndex;
    }
    return 0;
}


/***/ }),

/***/ 8170:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE

Collection List Manager

Keeps details of the Collections the user has.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollectionListManager = void 0;
const sendBGMessagePromise_1 = __webpack_require__(5104);
class CollectionListManager {
    constructor(userUID, logger, onLastCollectionUpdate, onsetCollectionList) {
        this.lastCollection = undefined;
        this.setLastCollection = async (lastCollection) => {
            var _a, _b;
            if ((lastCollection === null || lastCollection === void 0 ? void 0 : lastCollection.id) !== ((_a = this.lastCollection) === null || _a === void 0 ? void 0 : _a.id) ||
                (lastCollection === null || lastCollection === void 0 ? void 0 : lastCollection.name) !== ((_b = this.lastCollection) === null || _b === void 0 ? void 0 : _b.name)) {
                this.lastCollection = lastCollection;
                this.onLastCollectionUpdate(lastCollection);
            }
        };
        // Triggered when tab receives message indicating that the list of collections has been updated
        // (when one is added / deleted / name changed etc.)
        this.setCollectionList = (list, dict) => {
            // they arrive sorted by last updated!
            this.collectionList = list;
            this.collectionDict = dict;
            this.onsetCollectionList();
            if (list.length > 0) {
                const mostRecentCollection = list[0];
                if (mostRecentCollection.id !== "purchased") {
                    this.setLastCollection(mostRecentCollection);
                }
                else if (list.length > 1) {
                    const secondMostRecentCollection = list[1];
                    this.setLastCollection(secondMostRecentCollection);
                }
            }
            // in case the last collection gets deleted-smeted and not reset above as we only have the purchased collection left!
            if (this.lastCollection !== undefined &&
                this.collectionDict[this.lastCollection.id] === undefined) {
                this.setLastCollection(undefined);
            }
        };
        this.updateCollectionList = async (userUID) => {
            // get this again if signed in state changes:
            if (this.userUID !== userUID) {
                this.userUID = userUID;
                if (userUID !== undefined) {
                    // call remote:
                    const response = await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                        type: "api",
                        protocol: "send_and_receive",
                        action: "get_collection_list",
                    }, this.logger);
                    if (response.bgSuccess === true && response.message) {
                        this.setCollectionList(response.message.collection_list, response.message.collection_dict);
                    }
                    else {
                        // has most likely timed out....
                        this.setCollectionList([], {});
                    }
                }
                else {
                    this.setCollectionList([], {});
                }
            }
        };
        // Called by the popup buttons to display the name of collections!
        this.lookupCollectionByUID = (collectionUID) => {
            try {
                return this.collectionDict[collectionUID];
            }
            catch (err) {
                this.logger.debugError(err, "Unable to get name for collection:", collectionUID, "semi-critical");
            }
        };
        // called from within dialog:
        // just send in main promise i.e. moving to next page...
        this.addNewCollection = async (name) => {
            var _a;
            // validation:
            const isValid = name.length > 0 && name.length <= 100 ? true : false;
            if (isValid !== true) {
                return null;
            }
            // call remote!
            const response = await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                type: "api",
                protocol: "send_and_receive",
                action: "add_new_collection",
                data: { name },
            }, this.logger);
            return response.bgSuccess === true &&
                ((_a = response.message) === null || _a === void 0 ? void 0 : _a.success) === true &&
                response.message.collection_uid !== undefined
                ? response.message.collection_uid
                : null;
        };
        this.userUID = userUID;
        this.logger = logger;
        this.onLastCollectionUpdate = onLastCollectionUpdate;
        this.onsetCollectionList = onsetCollectionList;
        this.collectionDict = {};
        this.collectionList = [];
        try {
        }
        catch (err) {
            this.logger.debugError(err, "Unable to set-up collection manager - semi-critical!");
            this.setUpSucceeded = false;
        }
    }
}
exports.CollectionListManager = CollectionListManager;


/***/ }),

/***/ 5651:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OpinionTracker = void 0;
const sendBGMessagePromise_1 = __webpack_require__(5104);
const updateSingleLocalProductOpinion_1 = __webpack_require__(8772);
class OpinionTracker {
    constructor(logger, onUpdateOpinion) {
        this.setUserUID = (userUID) => {
            if (this.userUID !== userUID) {
                this.storageDict = {};
                this.userUID = userUID;
            }
        };
        this.getOpinion = (url) => {
            return this.storageDict[url];
        };
        this.updateOpinion = (url, collectionUID, value, recordID, resetDisplayLists) => {
            // might be info on products not in this tab so only update present ones!
            const opinionInfo = this.storageDict[url];
            if (opinionInfo !== undefined) {
                if (value === true) {
                    opinionInfo.productCollectionMembership[collectionUID] = recordID;
                }
                else {
                    delete opinionInfo.productCollectionMembership[collectionUID];
                }
                // update the saved vs. not saved:
                opinionInfo.opinion = (0, updateSingleLocalProductOpinion_1.updateSingleLocalProductOpinion)(opinionInfo.productCollectionMembership);
                this.logger.debugLog("%c >", "background-color:#DEB18A", "Updating product opinion", url, opinionInfo);
                this.onUpdateOpinion(url, collectionUID, value, resetDisplayLists);
            }
        };
        this.trackSingleURL = async (pageURL) => {
            try {
                if (this.userUID !== undefined) {
                    const response = await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
                        type: "api",
                        protocol: "send_and_receive",
                        action: "get_product_opinion",
                        page_url: pageURL,
                    }, this.logger);
                    if (response.bgSuccess === true && response.message) {
                        const productCollectionMembership = response.message.product_collection_membership;
                        // make sure opinion is correct (saves somewhere vs. not saved anywhere).
                        const overallOpinion = (0, updateSingleLocalProductOpinion_1.updateSingleLocalProductOpinion)(productCollectionMembership);
                        const toSave = {
                            productCollectionMembership,
                            opinion: overallOpinion,
                        };
                        this.logger.debugLog("%c<>", "background-color:#DEB18A", "Got product opinion", pageURL, toSave);
                        this.storageDict[pageURL] = toSave;
                    }
                    else {
                        this.logger.debugError(new Error("Could not get opinion"), "Could not get opinion for:", pageURL, "critical");
                    }
                }
                // If nothing received... do nothing, error already reported...
            }
            catch (err) {
                this.logger.debugError(err, "sendBGMessagePromise error inside getSingleProductOpinion");
            }
        };
        this.trackOpinions = async (pageURLs) => {
            const uniquePageURLs = [...new Set(pageURLs)];
            const promiseList = uniquePageURLs
                .filter((pageURL) => this.storageDict[pageURL] === undefined)
                .map((pageURL) => this.trackSingleURL(pageURL));
            // Wait for the promises to all be done [but not between them]!
            await Promise.all(promiseList); // not caught as async, passed up.
        };
        this.storageDict = {};
        this.logger = logger;
        this.onUpdateOpinion = onUpdateOpinion;
    }
}
exports.OpinionTracker = OpinionTracker;


/***/ }),

/***/ 8431:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
STATIC MODULE

Product Collection Membership Manager

To manage the opinions of a single product at a point in time, along with the list of collections it could be a member of...:

NOTE That the product is kept in this object and may be lost from elsewhere e.g. product tracker / manually.  It is stored here whilst it is being used for editing.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductCollectionMembershipManager = void 0;
const setProductCollectionMembership_1 = __webpack_require__(5044);
const getProductImageURL_1 = __webpack_require__(9881);
const sendBGMessageOneWay_1 = __webpack_require__(2106);
class ProductCollectionMembershipManager {
    constructor(logger, collectionListManager, opinionTracker, onCollectionDisplayListUpdate) {
        this.addedToCollections = [];
        this.reset = () => {
            this.workingDict = {};
            this.productCollectionMembership = {};
            this.collectionDisplayList = [];
            this.addedToCollections = [];
        };
        this.addWorkingDict = (uid, state) => {
            this.workingDict[uid] = state;
            this.updateViews();
        };
        this.removeWorkingDict = (uid) => {
            delete this.workingDict[uid];
            this.updateViews();
        };
        this.setInitialCollectionDisplayList = () => {
            const newPCMDict = {};
            if (this.product) {
                const opinion = this.opinionTracker.getOpinion(this.product.pageURL);
                if (opinion) {
                    Object.keys(opinion.productCollectionMembership).forEach((collectionUID) => {
                        newPCMDict[collectionUID] = true;
                    });
                }
            }
            this.productCollectionMembership = newPCMDict;
            // create the ordered collection list to pass on to the display:
            const collectionDisplayListTop = [];
            const collectionDisplayListBottom = [];
            // If already in the collection list, then let:
            for (let collection of this.collectionListManager.collectionList) {
                // Only reporting collections that exist:
                if (this.productCollectionMembership[collection.id] === true) {
                    collectionDisplayListTop.push([collection, true]);
                }
                else {
                    collectionDisplayListBottom.push([collection, false]);
                }
            }
            this.collectionDisplayList = [
                ...collectionDisplayListTop,
                ...collectionDisplayListBottom,
            ];
            this.updateViews();
        };
        // For loading all the current info from the background page:
        // allowing to accept product which will not change until closure of popup!
        this.setProduct = (product) => {
            var _a;
            try {
                this.reset();
                if (this.setUpSucceeded !== false && product !== undefined) {
                    // clear working dict (TODO: include product identifier.... e.g. pageurl)
                    // for cases where user opens / closes the window...
                    this.workingDict = {};
                    // We copy and extract the product at this point!!
                    this.product = product;
                    this.productImageURL = (0, getProductImageURL_1.getProductImageURL)(this.product);
                    this.setInitialCollectionDisplayList();
                    // Ensure we have ALL the product data for this product:
                    (0, sendBGMessageOneWay_1.sendBGMessageOneWay)({
                        protocol: "send_to",
                        type: "api",
                        action: "ensure_pageurl_opinion_uptodate",
                        page_url: (_a = this.product) === null || _a === void 0 ? void 0 : _a.pageURL,
                    });
                }
            }
            catch (err) {
                this.logger.debugError(err, "Unable to open dialog - semi-critical");
            }
        };
        this.getProduct = () => {
            return this.product;
        };
        // called from within dialog:
        this.setCollectionMemebership = async (collectionUID, opinion) => {
            var _a;
            const expectedCurrentOpinion = !opinion;
            // Only do something if not already working:
            if (this.workingDict[collectionUID] !== expectedCurrentOpinion &&
                this.product) {
                this.addWorkingDict(collectionUID, expectedCurrentOpinion);
                this.logger.debugLog("%c  ", "background-color:lightgray;", "Setting collection membership", "collection_uid", collectionUID, "membershipBool", opinion);
                // DO not recalculate!
                const response = await (0, setProductCollectionMembership_1.setProductCollectionMembership)(this.product, collectionUID, opinion, this.logger);
                // A promise is a promise
                if (response.bgSuccess === true) {
                    // This also updates workingDict so we don't do that here.
                    // (Working dict is removed in updateViews)
                    const collection = this.collectionListManager.lookupCollectionByUID(collectionUID);
                    const itemUID = (_a = response.message.details) === null || _a === void 0 ? void 0 : _a.item_id;
                    if (opinion === true) {
                        this.collectionListManager.setLastCollection(collection);
                        if (itemUID) {
                            this.addedToCollections.push({
                                collectionUID,
                                itemUID,
                            });
                        }
                    }
                    else {
                        this.addedToCollections = this.addedToCollections.filter((x) => x.collectionUID !== collectionUID);
                    }
                }
                this.removeWorkingDict(collectionUID); // updates views
            }
        };
        // triggered when received update from the background script, of product membership change in firestore.
        this.onProductCollectionMembershipUpdate = (url, collectionUID, value, resetDisplayLists) => {
            try {
                if (this.product !== undefined) {
                    // Find the collection in the list:
                    if (this.product.pageURL === url) {
                        this.productCollectionMembership[collectionUID] =
                            value === true ? true : undefined;
                    }
                }
            }
            catch (err) {
                this.logger.debugError(err, "Unable to update collection membership with update:", url, collectionUID, value, "critical");
            }
            resetDisplayLists
                ? this.setInitialCollectionDisplayList()
                : this.updateViews();
        };
        // called from within dialog:
        // just send in main promise i.e. moving to next page...
        this.addNewCollection = async (name) => {
            const collectionUID = await this.collectionListManager.addNewCollection(name);
            // Collection list will update via listener
            if (collectionUID) {
                // By default add this product to this new collection:
                this.setCollectionMemebership(collectionUID, true);
            }
            return collectionUID;
        };
        this.updateCollectionDisplayList = (listByLastUpdated = [], previousList = [], membershipLookupDict = {}) => {
            // If not first display:
            // maintain order!!
            // first note what is new and when it has been added so we can make sure we catch all:
            const allCollections = {};
            const collectionIncluded = {};
            for (let collection of listByLastUpdated) {
                allCollections[collection.id] = collection; // new items dict to look up from old order!
                collectionIncluded[collection.id] = false; // has been added to new list yet?
            }
            let newDisplayList = [];
            for (let collection of previousList) {
                const latestCollectionDetails = allCollections[collection[0].id];
                // ensure they are still present:
                if (latestCollectionDetails !== undefined) {
                    const membershipBool = membershipLookupDict[latestCollectionDetails.id] === true
                        ? true
                        : false;
                    newDisplayList.push([latestCollectionDetails, membershipBool]);
                    collectionIncluded[latestCollectionDetails.id] = true;
                }
            }
            // add any new ones at the top:
            const topList = [];
            for (let collection of listByLastUpdated) {
                if (collectionIncluded[collection.id] === false) {
                    const latestCollectionDetails = allCollections[collection.id];
                    if (latestCollectionDetails !== undefined) {
                        const membershipBool = membershipLookupDict[latestCollectionDetails.id] === true
                            ? true
                            : false;
                        topList.push([latestCollectionDetails, membershipBool]);
                    }
                }
            }
            newDisplayList = [...topList, ...newDisplayList];
            return newDisplayList;
        };
        this.updateViews = () => {
            try {
                this.collectionDisplayList = this.updateCollectionDisplayList(this.collectionListManager.collectionList, this.collectionDisplayList, this.productCollectionMembership);
                // Update the working dict if we have changed firebase listener data:
                // Can't use removeWorkingDict method as will get stuck in loop:
                if (this.collectionDisplayList !== undefined) {
                    for (let collection of this.collectionDisplayList) {
                        if (this.workingDict[collection[0].id] !== collection[1]) {
                            delete this.workingDict[collection[0].id];
                        }
                    }
                }
                this.onCollectionDisplayListUpdate();
            }
            catch (err) {
                this.logger.debugError(err, "Unable to update the collection manager - semi-critical");
            }
        };
        this.workingDict = {};
        this.logger = logger;
        this.collectionListManager = collectionListManager;
        this.opinionTracker = opinionTracker;
        this.productCollectionMembership = {};
        this.collectionDisplayList = [];
        this.onCollectionDisplayListUpdate = onCollectionDisplayListUpdate;
    }
}
exports.ProductCollectionMembershipManager = ProductCollectionMembershipManager;


/***/ }),

/***/ 5044:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

Sets the product membserhip by calling background script

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setProductCollectionMembership = setProductCollectionMembership;
const serializeProduct_1 = __webpack_require__(9125);
const sendBGMessagePromise_1 = __webpack_require__(5104);
// This special function is allowed to accept a product object as a parameter but it must be updated just prior to calling!
async function setProductCollectionMembership(product, collectionUIDIn, membershipType, logger) {
    const collectionUID = collectionUIDIn === undefined ? "most_recent" : collectionUIDIn;
    // Send to the background script for adding:
    return await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
        type: "api",
        protocol: "send_and_receive",
        action: "set_product_opinion",
        data: (0, serializeProduct_1.serializeProduct)(product, logger),
        collection_uid: collectionUID,
        page_url: product.pageURL,
        opinion: membershipType,
    }, logger, 60000);
}


/***/ }),

/***/ 8772:
/***/ ((__unused_webpack_module, exports) => {


/*

SINGLE FUNCTION

updates the overall product opinion based on many:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSingleLocalProductOpinion = updateSingleLocalProductOpinion;
function updateSingleLocalProductOpinion(productCollectionMembership) {
    for (let collectionUID in productCollectionMembership) {
        if (productCollectionMembership[collectionUID]) {
            return true;
        }
    }
    return false;
}


/***/ }),

/***/ 2352:
/***/ ((__unused_webpack_module, exports) => {


/*
NON-STATIC MODULE

The most basic logger.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasicLogger = void 0;
class BasicLogger {
    constructor() {
        this.setSiteUID = (siteUID) => {
            this.siteUID = siteUID;
        };
        this.debugLog = (...args) => {
            console.log(...args);
        };
        this.debugError = (error, moonsiftErrorMessage, ...args) => {
            console.error("MOONERROR", error, moonsiftErrorMessage, ...args);
        };
    }
}
exports.BasicLogger = BasicLogger;


/***/ }),

/***/ 7771:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOMAIN_LIST = void 0;
/*
CONSTANT

A list of top-ish-level domains to help us extract the proceeding site uid.

Last reviewed 23rd April 2020 by David Wood

Considering moving to this package:
https://github.com/131/node-tld/blob/master/index.js

*/
exports.DOMAIN_LIST = /((\.uk\.com)|(\.co\.uk)|(\.co\.nz)|(\.com\.au)|(\.com\.sg)|(\.co\.jp)|(\.co\.hk)|(\.com\.be)|(\.cn)|(\.fr)|(\.eu)|(\.de)|(\.us)|(\.au)|(\.uk)|(\.com)|(\.io)|(\.net)|(\.org)|(\.ca)|(\.jp)|(\.ru)|(\.ch)|(\.it)|(\.nl)|(\.hk)|(\.sg)|(\.se)|(\.no)|(\.es)|(\.pt)|(\.info)|(\.fashion)|(\.design)|(\.clothing)|(\.furniture)|(\.studio)|(\.st)|(\.dk)|(\.be)|(\.co))$/;


/***/ }),

/***/ 176:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = void 0;
const getLocalStorage_1 = __webpack_require__(123);
const BasicLogger_1 = __webpack_require__(2352);
class Logger extends BasicLogger_1.BasicLogger {
    constructor() {
        super();
        this.debugMode = false;
        this.authUserUID = "UNSET";
        this.setDebugMode = (debugMode) => {
            this.debugMode = debugMode;
        };
        this.setAuthUserUID = (userUID) => {
            this.authUserUID = userUID;
            Rollbar.configure({
                payload: { custom: { auth_user_uid: userUID } },
            });
        };
        this.debugLog = (...args) => {
            if (this.debugMode) {
                console.log(...args);
            }
        };
        this.getErrorData = (error, moonsiftErrorMessage, args) => {
            var _a;
            let errorOut = "Unknown Error";
            let lineOut = "Unknown Line";
            let errorMessage = "Unknown Error Message!";
            let argsOut = "";
            try {
                if (error instanceof Error) {
                    let stackTrace;
                    if (error.stack !== undefined) {
                        stackTrace = error.stack.toString().split("\n").slice(0, 40);
                    }
                    errorMessage = error.message ? error.message : "No Error Message";
                    if (stackTrace && stackTrace.length > 0) {
                        errorOut = stackTrace[0];
                    }
                    if (stackTrace && stackTrace.length > 1) {
                        lineOut = stackTrace.slice(1, 40).join(" \n ");
                    }
                }
            }
            catch { }
            try {
                argsOut = JSON.stringify(args).slice(0, 2000);
            }
            catch { }
            return {
                error: errorOut.slice(0, 300),
                line: lineOut.slice(0, 2000),
                args: argsOut,
                message: errorMessage.slice(0, 300),
                url: window.location.toString().slice(0, 200),
                title: document.title.slice(0, 100),
                site_uid: (_a = this.siteUID) !== null && _a !== void 0 ? _a : "Unknown_site",
                moonsift_error_message: moonsiftErrorMessage,
                auth_user_uid_logger: this.authUserUID,
            };
        };
        this.debugError = (error, moonsiftErrorMessage, ...args) => {
            if (this.debugMode) {
                console.error("MOONERROR", error, moonsiftErrorMessage, ...args);
            }
            try {
                const errorDataToSend = this.getErrorData(error, moonsiftErrorMessage, args);
                if (false) {}
                if (error instanceof Error) {
                    Rollbar.error(error, errorDataToSend);
                }
                else {
                    Rollbar.error(new Error("Error is not instance of error"), errorDataToSend);
                }
            }
            catch (err) {
                // Do NOT trigger debugError so we don't get stuck in a loop if this fails!
                console.log("Failed to send error to react app", err);
            }
        };
        const extensionVersion = chrome.runtime.getManifest().version + `_${"4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085"}`;
        Rollbar.configure({
            payload: {
                custom: {
                    extension_version: extensionVersion,
                },
                ignoredMessages: [
                    "ResizeObserver loop completed with undelivered notifications.",
                    "ResizeObserver loop limit exceeded",
                    "ResizeObserver loop completed with undelivered notifications.",
                ],
            },
        });
        (0, getLocalStorage_1.getLocalStorage)(["auth_user_uid", "last_logged_in_user"]).then((localStorage) => {
            this.authUserUID = localStorage.auth_user_uid;
            Rollbar.configure({
                payload: {
                    custom: {
                        last_auth_user_uid_on_load: localStorage.last_logged_in_user,
                        auth_user_uid: localStorage.auth_user_uid,
                    },
                },
            });
        });
    }
}
exports.Logger = Logger;


/***/ }),

/***/ 5419:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
NON-STATIC CLASS

Add a div for telling you which test you have run on the retailer page.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestingDiv = void 0;
const appendToDocument_1 = __webpack_require__(9484);
class TestingDiv {
    constructor() {
        this.displayTestingDiv = (siteSettings, logger) => {
            if (siteSettings.settings && siteSettings.settings.test_date_code) {
                if (!this.container) {
                    this.container = document.createElement("div");
                    this.container.setAttribute("id", "ms_extension_testing");
                }
                if (this.container.parentElement !== document.body) {
                    (0, appendToDocument_1.appendToDocument)("body", [this.container], logger);
                }
                this.container.setAttribute("style", "\
          display: flex !important;\
          flex-direction: column !important;\
          align-items: center !important;\
          align-content: center !important;\
          position:fixed !important;\
          right:10px !important;\
          z-index:2147483647 !important;\
          top:50px !important;\
          background-color:white !important;\
          text-align:center !important;\
          padding:5px !important;\
          border: 2px solid black;\
        ");
                this.container.innerHTML = `
          Harlinator<br/>
          ${siteSettings.settings.test_date_code}
          ${siteSettings.settings.test_colours
                    ? `<div style="display:flex;">
            <div style="width:75px;height:15px;background-color:#${siteSettings.settings.test_colours.colours[0]};display:flex;">
              <div style="font-size:15px;line-height:15px;color:black;font-weight:bold;">${siteSettings.settings.test_colours.letter}</div>
              <div style="font-size:15px;line-height:15px;color:white;font-weight:bold;">${siteSettings.settings.test_colours.letter}</div>
            </div>
            <div style="width:75px;height:15px;background-color:#${siteSettings.settings.test_colours.colours[1]};display:flex;">
              <div style="font-size:15px;line-height:15px;color:black;font-weight:bold;">${siteSettings.settings.test_colours.letter}</div>
              <div style="font-size:15px;line-height:15px;color:white;font-weight:bold;">${siteSettings.settings.test_colours.letter}</div>
            </div>
          </div>`
                    : ``}
        `;
            }
            else {
                if (this.container && this.container.parentElement === document.body) {
                    document.body.removeChild(this.container);
                }
            }
        };
    }
}
exports.TestingDiv = TestingDiv;


/***/ }),

/***/ 9484:
/***/ ((__unused_webpack_module, exports) => {


/*
SINGLE FUNCTION

Add stuff to the body of the page when it has loaded

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appendToDocument = appendToDocument;
function appendToDocument(headOrBody, itemsToAppend, logger) {
    try {
        // if body not ready then watch for it being so:
        if (!document[headOrBody]) {
            const observer = new MutationObserver(() => {
                try {
                    if (document[headOrBody]) {
                        for (let this_item of itemsToAppend) {
                            document[headOrBody].appendChild(this_item);
                        }
                        observer.disconnect();
                    }
                }
                catch (err) {
                    logger.debugError(err, "Failed to add items to document", itemsToAppend);
                }
            });
            observer.observe(document.documentElement, {
                childList: true,
            });
            //window.addEventListener ("load", this.appendToDocument, false);
        }
        // otherwise just append it:
        else {
            for (let this_item of itemsToAppend) {
                if (this_item.parentElement !== document[headOrBody]) {
                    document[headOrBody].appendChild(this_item);
                }
            }
        }
    }
    catch (err) {
        logger.debugError(err, "Failed to add items to document", itemsToAppend);
    }
}


/***/ }),

/***/ 3267:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.catchInvalidContext = void 0;
/*

Catch context invalidated errors so we don't overload rollbar if someone reinstalls the extension.

*/
const catchInvalidContext = (sendingFunction) => {
    try {
        sendingFunction();
    }
    catch (err) {
        const errError = err;
        if (errError.message == "Extension context invalidated.") {
            console.log("Extension context invalidated.  Please reload the webpage to use Moonsift in this tab.");
        }
        else {
            throw err;
        }
    }
};
exports.catchInvalidContext = catchInvalidContext;


/***/ }),

/***/ 7261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

This function let's us set dev options via the URL

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkDevOptions = checkDevOptions;
const setLocalStorage_1 = __webpack_require__(5295);
function checkDevOptions() {
    if (window.location.hostname.endsWith("moonsift.com")) {
        for (const [key, value] of new URL(window.location.href).searchParams) {
            if (key.toLowerCase() === "debugmode") {
                (0, setLocalStorage_1.setLocalStorage)({
                    debug_mode: value.toLowerCase() === "true" ? true : undefined,
                });
                return;
            }
        }
    }
}


/***/ }),

/***/ 4156:
/***/ ((__unused_webpack_module, exports) => {


/*

SINGLE-FUNCTION USING DOCUMENT ELEMENT:

effective "hack" to get the aboslute path!

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLinkProbe = void 0;
exports.getAbsolutePath = getAbsolutePath;
let linkProbe = undefined;
const getLinkProbe = () => {
    if (!linkProbe) {
        linkProbe = document.createElement("a");
    }
    return linkProbe;
};
exports.getLinkProbe = getLinkProbe;
function getAbsolutePath(href) {
    const linkProbe = (0, exports.getLinkProbe)();
    linkProbe.href = href;
    return linkProbe.href;
}


/***/ }),

/***/ 4263:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getHTML = exports.setImageProperties = void 0;
const setImageProperties = () => {
    document.querySelectorAll("img").forEach((image) => {
        image.setAttribute("ms_naturalHeight", image.naturalHeight.toString());
        image.setAttribute("ms_naturalWidth", image.naturalWidth.toString());
        image.setAttribute("ms_width", image.width.toString());
        image.setAttribute("ms_height", image.height.toString());
        image.setAttribute("ms_clientWidth", image.clientWidth.toString());
        image.setAttribute("ms_clientHeight", image.clientHeight.toString());
        image.setAttribute("ms_currentSrc", image.currentSrc);
    });
};
exports.setImageProperties = setImageProperties;
const getHTML = (sendResponse) => {
    (0, exports.setImageProperties)();
    sendResponse({
        html: document.documentElement.innerHTML,
        url: window.location.href,
    });
};
exports.getHTML = getHTML;


/***/ }),

/***/ 836:
/***/ ((__unused_webpack_module, exports) => {


/*

SINGLE FUNCTION

gets the parent element / host if shadow root:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParentElement = getParentElement;
function getParentElement(node) {
    if (node.parentNode === null && node.constructor.name === "ShadowRoot") {
        const shadowRoot = node;
        return shadowRoot.host;
    }
    else {
        return node.parentNode;
    }
}


/***/ }),

/***/ 8511:
/***/ ((__unused_webpack_module, exports) => {


/*

SINGLE FUNCTION

gets the parent element / host if shadow root at a certain level in hierachy:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParentElementAtLevel = getParentElementAtLevel;
function getParentElementAtLevel(startingElement, level) {
    let containingElement = startingElement;
    for (let i = 0; i < level && containingElement.parentElement !== null; i++) {
        containingElement = containingElement.parentElement;
    }
    return containingElement;
}


/***/ }),

/***/ 9881:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

Get the product image URL.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getProductImageURL = getProductImageURL;
const serializeImage_1 = __webpack_require__(3147);
function getProductImageURL(product) {
    if (!("manual" in product) && product.bestImage) {
        // We do it this way because we want to make sure we don't use the blob if possible:???
        const productImageSources = (0, serializeImage_1.serializeImage)(product.bestImage).sources;
        if (productImageSources.length > 0) {
            return productImageSources[0];
        }
    }
    if ("manual" in product && product.images.length > 0) {
        return product.images[0];
    }
    return ""; //chrome.runtime.getURL('images/empty_product');
}


/***/ }),

/***/ 3388:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
SINGLE FUNCTION

Get the site settings from the back-end and determine if it means we can run on this site or not...:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSiteSettings = getSiteSettings;
const sendBGMessagePromise_1 = __webpack_require__(5104);
// Default timeout is 10 mins, but note iframe in background is 5.
async function getSiteSettings(siteUID, logger, timeoutInMs = 600000) {
    var _a, _b, _c;
    // Send to the background page to get the settings as soon as site is loaded!
    try {
        const response = await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
            type: "api",
            protocol: "send_and_receive",
            action: "get_site_settings",
            siteUID,
            db_timeout: timeoutInMs - 1000,
        }, logger, timeoutInMs); // No catch as await, error passed up.
        if (response.bgSuccess !== true) {
            // Error in backend
            return {
                runHere: false,
                caughtError: true,
                settings: undefined,
            };
        }
        // check we have valid site settings:
        let runHere = false;
        if (response.message.settings !== undefined) {
            runHere = true;
            // Determine if should be run on this site or not by checking against the user_owner data (i.e. is not in blacklist)!
            // firebase can't use "." in user-modifiable keys....
            const siteUIDUnderScored = siteUID.replace(/\./g, "_");
            if (((_c = (_b = (_a = response.message) === null || _a === void 0 ? void 0 : _a.user_owner) === null || _b === void 0 ? void 0 : _b.site_blacklist) === null || _c === void 0 ? void 0 : _c[siteUIDUnderScored]) ===
                true) {
                runHere = false;
            }
        }
        // Take this opportunity to update the userUID:
        logger.setAuthUserUID(response.message.user_uid);
        return {
            userOwner: response.message.user_owner,
            userVerifiedSettings: response.message.user_verified_settings,
            // Add a reference to pass down into the chain for convenience:
            settings: response.message.settings,
            userUID: response.message.user_uid,
            bgscrapeUID: response.message.bgscrape_uid,
            runHere,
        };
    }
    catch (err) {
        // Error case is when promise is rejected (site not contactable....)
        logger.debugError(err, "Error getting site settings");
        return {
            runHere: false,
            caughtError: true,
            settings: undefined,
        };
    }
}


/***/ }),

/***/ 4483:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

Get the site UID from the url:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSiteUID = getSiteUID;
const DOMAIN_LIST_1 = __webpack_require__(7771);
function getSiteUID(hostOrURL, logger, isFullURL = false) {
    try {
        const host = isFullURL ? new URL(hostOrURL).host : hostOrURL;
        const matchResult = host.match(DOMAIN_LIST_1.DOMAIN_LIST);
        if (matchResult) {
            const domain = matchResult[0];
            const preDomain = host.slice(0, matchResult.index);
            return preDomain.split(".").slice(-1)[0] + domain;
        }
        else {
            return host;
        }
    }
    catch (err) {
        logger.debugError(err, "Getting site UID failed, critical");
        return false;
    }
}


/***/ }),

/***/ 7347:
/***/ ((__unused_webpack_module, exports) => {


/*

SINGLE FUNCTION

Convert a pixel value to a float:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pxToFloat = pxToFloat;
function pxToFloat(input) {
    const floatValue = parseFloat(input.replace("px", ""));
    return floatValue < 0 ? 0.0 : floatValue;
}


/***/ }),

/***/ 123:
/***/ ((__unused_webpack_module, exports) => {


/*

SINGLE FUNCTION

Used for typing local storage

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLocalStorage = void 0;
const getLocalStorage = (keyArray) => chrome.storage.local
    .get(keyArray)
    .then((cookie) => cookie);
exports.getLocalStorage = getLocalStorage;


/***/ }),

/***/ 5295:
/***/ ((__unused_webpack_module, exports) => {


/*

SINGLE FUNCTION

Used for typing local storage

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setLocalStorage = void 0;
const setLocalStorage = async (storageInput) => chrome.storage.local.set(storageInput);
exports.setLocalStorage = setLocalStorage;


/***/ }),

/***/ 7873:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isTestMode = void 0;
exports.isTestMode = typeof msExtensionTestMode !== "undefined" && msExtensionTestMode === true;


/***/ }),

/***/ 2865:
/***/ ((module) => {

module.exports = window["preact"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

/*

All this code forming the Moonsift Browser Extension is the property of Moonsift Ltd.
with the exception of the external libraries.
Copyright 2023.

// Developer(s):
 :-D  David Wood [https://www.linkedin.com/in/davidwooduk/]

hello [at] moonsift.com
No part may be copied without explicit consent.

*/
__webpack_unused_export__ = ({ value: true });
const checkDevOptions_1 = __webpack_require__(7261);
const ContentScript_1 = __webpack_require__(4907);
const contentScript = new ContentScript_1.ContentScript();
contentScript.checkWhitelist();
(0, checkDevOptions_1.checkDevOptions)();

})();

/******/ })()
;