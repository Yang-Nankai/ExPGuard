/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ 1037:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SCRIPT

For the additional buttons for harlinating...

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderOtherButtons = renderOtherButtons;
const checkLoggedIn_1 = __webpack_require__(5599);
const ButtonsAPI_1 = __webpack_require__(9982);
function getTabURL() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
        }, function (tabs) {
            if (tabs[0]) {
                resolve(tabs[0].url);
            }
            else {
                reject("No URL Found!");
            }
        });
    });
}
function enableHarlinating() {
    const harlinatorStartDomainButtonElement = document.getElementById("harlinator_start_domain");
    harlinatorStartDomainButtonElement &&
        harlinatorStartDomainButtonElement.addEventListener("click", (event) => {
            getTabURL().then((url) => {
                ButtonsAPI_1.HarlinatorButtonsAPI.sendOneWayAPI({
                    action: "start_domain",
                    url,
                });
            });
        });
    const harlinatorAddTiledButtonElement = document.getElementById("harlinator_add_tiled");
    harlinatorAddTiledButtonElement &&
        harlinatorAddTiledButtonElement.addEventListener("click", (event) => {
            getTabURL().then((url) => {
                ButtonsAPI_1.HarlinatorButtonsAPI.sendOneWayAPI({
                    action: "add_as_tile_page",
                    url,
                });
            });
        });
    const harlinatorAddSingleButtonElement = document.getElementById("harlinator_add_single");
    harlinatorAddSingleButtonElement &&
        harlinatorAddSingleButtonElement.addEventListener("click", (event) => {
            getTabURL().then((url) => {
                ButtonsAPI_1.HarlinatorButtonsAPI.sendOneWayAPI({
                    action: "add_as_single_page",
                    url,
                });
            });
        });
    const harlinatorElement = document.getElementById("harlinator");
    harlinatorElement && harlinatorElement.style.setProperty("display", "flex");
}
function enableSignedOutMessage() {
    const SignedOutMessageElement = document.getElementById("signed_out_message");
    SignedOutMessageElement &&
        SignedOutMessageElement.style.setProperty("display", "flex");
}
// renderer:
async function renderOtherButtons(logger) {
    try {
        // First see if the user is logged in:
        const signedIn = await (0, checkLoggedIn_1.checkLoggedIn)(logger, 1000);
        if (logger.debugMode === true) {
            // If not logged in then does it matter?  I guess so...
            if (signedIn === true) {
                enableHarlinating();
            }
            else {
                enableSignedOutMessage();
            }
        }
    }
    catch (err) {
        logger.debugError(err, "Failed to render the menubar popup, semi-critical");
    }
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

/***/ 5599:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
SINGLE FUNCTION

This is used by menu-buttons.js!

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkLoggedIn = checkLoggedIn;
const sendBGMessagePromise_1 = __webpack_require__(5104);
// Default timeout is 10 mins, but note iframe in background is 5.
async function checkLoggedIn(logger, timeout = 600000) {
    var _a, _b;
    // Send to the background page to get the settings as soon as site is loaded!
    try {
        const response = await (0, sendBGMessagePromise_1.sendBGMessagePromise)({
            type: "api",
            protocol: "send_and_receive",
            action: "check_logged_in",
        }, logger, timeout);
        if (response.bgSuccess === true &&
            ((_a = response.message) === null || _a === void 0 ? void 0 : _a.signed_in) !== undefined) {
            // Not && response.message.success===true as success is false if not signed in!
            return (_b = response.message) === null || _b === void 0 ? void 0 : _b.signed_in;
        }
        else {
            return null;
        }
    }
    catch (err) {
        // Error case is when promise is rejected (site not contactable....)
        logger.debugError(err, "Failed to check id user is logged in, semi-critical");
    }
    return null;
}


/***/ }),

/***/ 9982:
/***/ ((__unused_webpack_module, exports) => {


/*

Static Module

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HarlinatorButtonsAPI = void 0;
class HarlinatorButtonsAPI {
    static async getHarlinatorTabs() {
        const openTabs = await chrome.tabs.query({});
        return openTabs.filter((tab) => tab.url && tab.url.includes("harlinatormain"));
    }
    static async sendOneWayAPI(message) {
        // First get the tab to send to:
        const harlinatorTabs = await HarlinatorButtonsAPI.getHarlinatorTabs();
        harlinatorTabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, {
                    action: "harlinator",
                    message,
                });
            }
        });
    }
}
exports.HarlinatorButtonsAPI = HarlinatorButtonsAPI;


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

__webpack_unused_export__ = ({ value: true });
const TopRightMenu_1 = __webpack_require__(7983);
const Logger_1 = __webpack_require__(176);
const getLocalStorage_1 = __webpack_require__(123);
const openMenu_1 = __webpack_require__(1741);
const renderOtherButtons_1 = __webpack_require__(1037);
document.addEventListener("DOMContentLoaded", () => {
    const hideHarlinatorButtonElement = document.getElementById("hide-harlinator");
    hideHarlinatorButtonElement &&
        hideHarlinatorButtonElement.addEventListener("click", () => {
            const harlinatorElement = document.getElementById("harlinator");
            harlinatorElement &&
                harlinatorElement.style.setProperty("display", "none");
        });
});
/*

Linking to the content script:

*/
const callScriptFunction = (key, args, thisTabID, logger) => {
    new Promise((resolve) => {
        chrome.tabs
            .sendMessage(thisTabID, {
            type: "dropdown",
            action: "call_script_function",
            name: key,
            args,
        })
            .then((response) => {
            resolve(response);
        })
            .catch((err) => logger.debugError(err, "Error calling script function from dropdown", "Tab ID:", thisTabID, "args:", args));
    });
};
const addMessageListener = (trm, thisTabID, logger) => {
    chrome.runtime.onMessage.addListener((message) => {
        if ("type" in message && message.type === "dropdown") {
            if (message.action === "set") {
                // TODO: try and remove type casting...
                const displayDetails = message.display_details;
                // remake functions:
                Object.keys(displayDetails).forEach((key) => {
                    if (displayDetails[key] === "FUNCTION") {
                        displayDetails[key] = (...args) => callScriptFunction(key, args, thisTabID, logger);
                    }
                });
                trm.update(displayDetails);
            }
            else if (message.action === "close") {
                window.close();
            }
        }
    });
};
// Run the script:
const asyncLoader = async () => {
    const logger = new Logger_1.Logger();
    try {
        const isLocalhost = false === true;
        const cookie = await (0, getLocalStorage_1.getLocalStorage)(["debug_mode"]);
        const debugMode = cookie.debug_mode === true || isLocalhost ? true : false;
        logger.setDebugMode(debugMode);
    }
    catch {
        // Not too bothered about debug mode for most people.
    }
    logger.debugLog("Buttons script is running....");
    const trm = new TopRightMenu_1.TopRightMenu(true, logger);
    trm.update({
        displayType: "loading",
        siteUID: "",
        closeFunction: () => null,
    });
    (0, openMenu_1.openMenu)(trm).then((thisTabID) => {
        if (thisTabID) {
            addMessageListener(trm, thisTabID, logger);
        }
    });
    // Connect to the background script so we know when then popup is closed.
    chrome.runtime.connect({ name: "popup" });
    (0, renderOtherButtons_1.renderOtherButtons)(logger);
};
asyncLoader();

})();

/******/ })()
;