/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 2927:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

NON-STATIC MODULE

Listen to the user's collection list

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollectionList = void 0;
const sendToAllTabs_1 = __webpack_require__(6237);
class CollectionList {
    constructor(logReporter, firebaseLink) {
        var _a;
        this.collectionsByUID = {};
        this.updateCollectionListRef = () => {
            return `/databases/user_product_collection/${this.userUID}`;
        };
        this.getMostRecentCollection = () => {
            return this.sortedList && this.sortedList.length > 0
                ? this.sortedList[0]
                : undefined;
        };
        this.setList = (collectionList) => {
            // Sort it first:
            // TODO
            const newDict = {};
            collectionList.forEach((collection) => {
                newDict[collection.id] = collection;
            });
            this.collectionsByUID = newDict;
            this.sortedList = [...collectionList].sort((a, b) => !a.last_updated || a.last_updated > b.last_updated ? -1 : 1);
            (0, sendToAllTabs_1.sendToAllTabs)({
                type: "api",
                action: "update_collection_list",
                data: { dict: this.collectionsByUID, list: this.sortedList },
            }, this.logReporter);
        };
        this.updateUserUID = (userUID) => {
            if (userUID !== this.userUID) {
                this.userUID = userUID;
                this.listener ? this.listener() : null;
                if (userUID) {
                    this.listener = this.firebaseLink.listenCollection(this.updateCollectionListRef(), (list) => this.setList(list));
                }
                else {
                    this.listener = undefined;
                    this.setList([]);
                }
            }
        };
        // Ensure this calls sendResponse in all cases:
        this.addNewCollection = async (event, sendResponse) => {
            var _a;
            try {
                if (event.data.name.length > 0 && event.data.name.length <= 100) {
                    // only work if we have access to the firestore redux:
                    if ((_a = this.firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) {
                        // Also double check a query with firestore frist:
                        const created_at = this.firebaseLink.serverTimestamp();
                        const last_updated = created_at;
                        // Ensure is scraped too:
                        const dataOut = Object.assign({}, event.data, {
                            created_at,
                            last_updated,
                            public_level: 7,
                            user_uid: this.firebaseLink.auth.currentUser.uid,
                        });
                        const response = await this.firebaseLink.addToCollection(this.updateCollectionListRef(), dataOut);
                        sendResponse({
                            success: true,
                            collection_uid: response.id,
                        });
                        return;
                    }
                    const error = "addNewCollection: Firebase not connected properly!";
                    sendResponse({
                        success: false,
                        error: error,
                    });
                    this.logReporter.debugError(new Error(error), error);
                    return;
                }
                sendResponse({
                    success: false,
                    error: "Name must be between 1 and 100 characters",
                });
            }
            catch (error) {
                this.logReporter.debugError(error, "Error:");
                sendResponse({
                    success: false,
                    error: error.toString(),
                });
            }
        };
        this.updateCollectionList = (_event, sendResponse) => {
            if (!this.sortedList) {
                const error = "Firestore not loaded properly!";
                sendResponse({ success: false, error });
                this.logReporter.debugError(new Error(error), error);
                return;
            }
            sendResponse({
                success: true,
                collection_list: this.sortedList,
                collection_dict: this.collectionsByUID,
            });
        };
        this.tearDown = () => {
            this.listener && this.listener();
        };
        this.logReporter = logReporter;
        this.firebaseLink = firebaseLink;
        this.updateUserUID((_a = firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid);
        this.firebaseLink.addAuthChangeListenerFunction(this.updateUserUID);
    }
}
exports.CollectionList = CollectionList;


/***/ }),

/***/ 318:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

Store the auth + firestore links here...

(To replace the iFrame component)

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FirebaseLink = void 0;
const app_1 = __webpack_require__(5577);
const auth_1 = __webpack_require__(5052);
const firestore_1 = __webpack_require__(9815);
const functions_1 = __webpack_require__(5619);
const sendToTab_1 = __webpack_require__(8777);
const setLocalStorage_1 = __webpack_require__(5295);
class FirebaseLink {
    constructor(logReporter) {
        this.authChangeListeners = [];
        this.logutListeners = [];
        // messaging: Messaging;
        this.authStateSetOnce = false;
        this.logoutOccurred = false;
        // AUTH:
        this.authenticate = (token) => {
            (0, auth_1.signInWithCustomToken)(this.auth, token)
                .then(() => console.log("Sign in successful as", this.auth.currentUser))
                .catch((err) => console.log("Failed to sign in with custom token", err));
        };
        this.checkForAuthFile = async () => {
            const response = await fetch(chrome.runtime.getURL("login_token.txt")).catch(() => false);
            if (response) {
                console.log("Authenticating using token from file");
                const token = await response.text();
                this.authenticate(token);
            }
        };
        this.authCheck = (authUserUID, tabToFetchAuth) => {
            var _a;
            if (authUserUID !== ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid)) {
                (0, sendToTab_1.sendToTab)(tabToFetchAuth, { action: "auth-login-get-token" }, this.logReporter);
            }
        };
        this.logout = () => {
            this.logutListeners.forEach((functionToRun) => functionToRun());
            this.auth.signOut();
        };
        this.addAuthChangeListenerFunction = (functionToRun) => {
            this.authChangeListeners.push(functionToRun);
        };
        this.addLogoutListenerFunction = (functionToRun) => {
            this.logutListeners.push(functionToRun);
        };
        // DATABASE (FIRESTORE):
        this.serverTimestamp = () => {
            return firestore_1.Timestamp.now();
        };
        this.getDoc = async (ref) => {
            const snapshot = await (0, firestore_1.getDoc)((0, firestore_1.doc)(this.fs, ref));
            if (snapshot.exists()) {
                return {
                    id: snapshot.id,
                    ...snapshot.data(),
                };
            }
            return null;
        };
        this.getGenericQuery = async (queryToRun) => {
            const snapshot = await (0, firestore_1.getDocs)(queryToRun);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        };
        this.getCollection = (ref) => {
            return this.getQuery(ref, []);
        };
        this.getQuery = (ref, queryArgs) => {
            return this.getGenericQuery((0, firestore_1.query)((0, firestore_1.collection)(this.fs, ref), ...queryArgs));
        };
        this.getQueryCollectionGroup = (ref, queryArgs) => {
            return this.getGenericQuery((0, firestore_1.query)((0, firestore_1.collectionGroup)(this.fs, ref), ...queryArgs));
        };
        this.listenDoc = (ref, callback) => {
            return (0, firestore_1.onSnapshot)((0, firestore_1.doc)(this.fs, ref), (snapshot) => {
                callback(snapshot.exists()
                    ? {
                        id: snapshot.id,
                        ...snapshot.data(),
                    }
                    : null);
            });
        };
        this.listenGenericQuery = (queryToRun, callback) => {
            return (0, firestore_1.onSnapshot)(queryToRun, (snapshot) => {
                callback(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })), snapshot.docChanges().map((change) => [
                    {
                        id: change.doc.id,
                        ...change.doc.data(),
                    },
                    change.type,
                ]));
            });
        };
        this.listenCollection = (ref, callback) => {
            return this.listenQuery(ref, [], callback);
        };
        this.listenQuery = (ref, queryArgs, callback) => {
            return this.listenGenericQuery((0, firestore_1.query)((0, firestore_1.collection)(this.fs, ref), ...queryArgs), callback);
        };
        this.listenQueryCollectionGroup = (ref, queryArgs, callback) => {
            return this.listenGenericQuery((0, firestore_1.query)((0, firestore_1.collectionGroup)(this.fs, ref), ...queryArgs), callback);
        };
        this.addToCollection = (ref, data) => {
            return (0, firestore_1.addDoc)((0, firestore_1.collection)(this.fs, ref), data);
        };
        this.updateDoc = (ref, data) => {
            return (0, firestore_1.updateDoc)((0, firestore_1.doc)(this.fs, ref), data);
        };
        this.deleteDoc = (ref) => {
            return (0, firestore_1.deleteDoc)((0, firestore_1.doc)(this.fs, ref));
        };
        // FUNCTIONS:
        this.callFunction = (name) => (0, functions_1.httpsCallable)(this.functions, name);
        this.tearDown = () => {
            this.unsubscribeAuthChange();
        };
        this.logReporter = logReporter;
        this.app = (0, app_1.initializeApp)({
            apiKey: "AIzaSyCNYoJMqkQ38znepkAM3b7Hwl9Rf9MYObc",
            projectId: "moonsift-web",
            messagingSenderId: "683213919987",
            appId: "1:683213919987:web:6b9191c77bb1110ff54986",
        });
        // AUTH
        this.auth = (0, auth_1.getAuth)(this.app);
        if (false) {}
        this.unsubscribeAuthChange = (0, auth_1.onAuthStateChanged)(this.auth, (user) => {
            this.authStateSetOnce = true;
            console.log("Auth state changed to:", user);
            const toLocalStorage = {
                auth_user_uid: user === null || user === void 0 ? void 0 : user.uid,
            };
            if (user === null || user === void 0 ? void 0 : user.uid) {
                toLocalStorage.last_auth_user_uid = user.uid;
            }
            (0, setLocalStorage_1.setLocalStorage)(toLocalStorage);
            this.authChangeListeners.forEach((functionToRun) => functionToRun(user === null || user === void 0 ? void 0 : user.uid));
        });
        // DATABASE (FIRESTORE)
        this.fs = (0, firestore_1.getFirestore)(this.app);
        if (false) {}
        // CLOUD FUNCTIONS
        this.functions = (0, functions_1.getFunctions)(this.app, "europe-west2");
        if (false) {}
        // MESSAGING
        // this.messaging = getMessaging(this.app);
        // onMessage(this.messaging, this.onMessage);
        this.checkForAuthFile();
    }
}
exports.FirebaseLink = FirebaseLink;


/***/ }),

/***/ 7029:
/***/ ((__unused_webpack_module, exports) => {


/*

NON-STATIC CLASS

** For development only **
Continually monitor a key that has been saved for changes:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HotReload = void 0;
class HotReload {
    constructor() {
        this.updateKey = async () => {
            try {
                const response = await fetch(chrome.runtime.getURL("/buildKey.txt"));
                const newKey = response.headers.get("Last-Modified");
                if (this.currentKey && this.currentKey !== newKey) {
                    console.log("%c>Recompiled from source, reloading...", "background-color:#FFCCCC");
                    this.reload();
                    return;
                }
                this.currentKey = newKey;
            }
            catch (err) {
                console.error("Failed to fetch build key! NON-CRITICAL", err);
            }
        };
        this.reload = () => {
            try {
                // reload the ones that are running moonsift only!
                chrome.tabs.query({}, function (tabs) {
                    for (let tab of tabs) {
                        if (tab.id) {
                            chrome.tabs
                                .sendMessage(tab.id, { action: "reload_page" })
                                .catch((_err) => null);
                        }
                    }
                    chrome.runtime.reload();
                });
            }
            catch (err) {
                console.error("Failed to perform hot reload after detecting new code!", err);
            }
        };
        this.updateKey();
        setInterval(this.updateKey, 1000);
    }
}
exports.HotReload = HotReload;


/***/ }),

/***/ 9764:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogReporter = void 0;
const rollbar_1 = __importDefault(__webpack_require__(9738));
const getLocalStorage_1 = __webpack_require__(123);
class LogReporter {
    constructor() {
        this.updateDebugSetting = async () => {
            const isLocalhost = false === true;
            const cookie = await (0, getLocalStorage_1.getLocalStorage)(["debug_mode"]);
            this.debugMode = cookie.debug_mode === true || isLocalhost ? true : false;
            console.log("Debug mode:", this.debugMode);
            try {
            }
            catch (err) {
                this.debugError(err, "Failed to update debug setting fully! -- non-critical");
            }
        };
        this.debugLog = (...args) => {
            if (this.debugMode) {
                console.log(...args);
            }
        };
        this.sendError = (error, errorData) => {
            var _a, _b;
            const authUserUID = this.firebaseLink
                ? (_b = (_a = this.firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : "NOT_LOGGED_IN"
                : "FIREBASELINK_NOT_SETUP_YET";
            const errorDataToSend = {
                ...errorData,
                auth_user_uid_logger: authUserUID,
            };
            if (error instanceof Error) {
                this.rollbar.error(error, errorDataToSend);
            }
            else {
                this.rollbar.error(new Error("Error is not instance of error"), errorDataToSend);
            }
        };
        this.debugError = (error, message) => {
            try {
                if (this.debugMode) {
                    console.error(message, error);
                }
                if (false) {}
                else {
                    this.sendError(error, { moonsift_error_message: message });
                }
            }
            catch (err) {
                // do nothing as otherwise we may get stuck in a loop!
            }
        };
        const extensionVersion = chrome.runtime.getManifest().version + `_${"4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085"}`;
        this.rollbar = new rollbar_1.default({
            accessToken: "2767022d7d494ec4963f814cd7fde85b",
            captureUncaught: true,
            captureUnhandledRejections: true,
            payload: {
                environment: "production",
                custom: { extension_version: extensionVersion },
            },
        });
        // flag for debugging:
        this.debugMode = false;
        this.updateDebugSetting();
        (0, getLocalStorage_1.getLocalStorage)(["last_logged_in_user"]).then((localStorage) => {
            var _a, _b;
            this.rollbar.configure({
                payload: {
                    custom: {
                        last_auth_user_uid: localStorage.last_logged_in_user,
                        auth_user_uid: (_b = (_a = this.firebaseLink) === null || _a === void 0 ? void 0 : _a.auth.currentUser) === null || _b === void 0 ? void 0 : _b.uid,
                    },
                    ignoredMessages: [
                        "The page keeping the extension port is moved into back/forward cache, so the message channel is closed.",
                    ],
                },
            });
        });
    }
    onAuthChange(userUID) {
        const rollbarConfig = {
            payload: {
                custom: {
                    auth_user_uid: userUID,
                },
            },
        };
        if (userUID !== undefined) {
            rollbarConfig.payload.custom.last_auth_user_uid = userUID;
        }
        this.rollbar.configure(rollbarConfig);
    }
    setFirebaseLink(firebaseLink) {
        var _a, _b;
        this.firebaseLink = firebaseLink;
        this.onAuthChange((_b = (_a = this.firebaseLink) === null || _a === void 0 ? void 0 : _a.auth.currentUser) === null || _b === void 0 ? void 0 : _b.uid);
    }
}
exports.LogReporter = LogReporter;


/***/ }),

/***/ 4968:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

NON-STATIC MODULE

Store if a document pageURL is saved or not by retrieving all user collection entries (!)

It's so that we can show a "saved" button on each item easily.

In future we may limit this to the first X collection items.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Opinions = void 0;
const firestore_1 = __webpack_require__(9815);
const sendToAllTabs_1 = __webpack_require__(6237);
const LISTENING_OPINION_LIMIT = 500;
class Opinions {
    constructor(logReporter, firebaseLink, collectionList) {
        var _a;
        this.recordsListeningTo = 0;
        this.updateUserUID = (userUID) => {
            if (userUID !== this.userUID) {
                this.userUID = userUID;
                this.listener ? this.listener() : null;
                this.removeExtraListener();
                this.opinionsByURLExtra = {};
                if (userUID) {
                    this.listener =
                        this.firebaseLink.listenQueryCollectionGroup(`list`, [
                            (0, firestore_1.where)(`user_uid`, `==`, userUID),
                            (0, firestore_1.orderBy)("created_at", "desc"),
                            (0, firestore_1.limit)(LISTENING_OPINION_LIMIT),
                        ], (list, changeList) => {
                            const opinionsByURL = {};
                            list.forEach((entry) => {
                                var _a;
                                if (entry.collection_uid && entry.page_url) {
                                    opinionsByURL[entry.page_url] = {
                                        opinion: true, // Not sure why we are storing this...
                                        productCollectionMembership: {
                                            ...(_a = opinionsByURL[entry.page_url]) === null || _a === void 0 ? void 0 : _a.productCollectionMembership,
                                            [entry.collection_uid]: entry.id,
                                        },
                                    };
                                }
                            });
                            this.recordsListeningTo = list.length;
                            this.opinionsByURL = opinionsByURL;
                            const updates = changeList === null || changeList === void 0 ? void 0 : changeList.filter((change) => change[1] === "added" || change[1] === "removed").map((change) => ({
                                collection_uid: change[0].collection_uid,
                                page_url: change[0].page_url,
                                value: change[1] === "added",
                                uid: change[0].id,
                            }));
                            if (updates && updates.length > 0) {
                                (0, sendToAllTabs_1.sendToAllTabs)({
                                    type: "api",
                                    action: "update_product_data",
                                    data: updates,
                                }, this.logReporter);
                            }
                        });
                }
                else {
                    this.listener = undefined;
                    this.opinionsByURL = {};
                    this.opinionsByURLExtra = {};
                }
            }
        };
        this.getProductOpinion = (event, sendResponse) => {
            var _a, _b, _c;
            // Check that we have the required param input:
            if (event.page_url === "") {
                sendResponse({ success: false, error: "No Page URL supplied" });
                return;
            }
            // Ensure that the page_url_collections is loaded:
            if (((_a = this.firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) === undefined) {
                const error = "Firestore not loaded properly!";
                this.logReporter.debugError(new Error(error), error);
                sendResponse({
                    success: false,
                    error,
                });
                return;
            }
            // If they are (both) loaded:
            const opinion = (_b = this.opinionsByURL) === null || _b === void 0 ? void 0 : _b[event.page_url];
            const extraOpinion = (_c = this.opinionsByURLExtra) === null || _c === void 0 ? void 0 : _c[event.page_url];
            const opinionOut = {
                ...extraOpinion,
                ...opinion === null || opinion === void 0 ? void 0 : opinion.productCollectionMembership,
            };
            sendResponse({
                success: true,
                page_url: event.page_url,
                product_collection_membership: opinionOut,
            });
        };
        /*
        user_product_collection_doc = (user_uid, collection_uid, doc_uid) => {
          return this.db.doc(
            `/databases/user_product_collection/${user_uid}/${collection_uid}/list/${doc_uid}`
          );
        };
      
        user_scrape_opinions = (user_uid) => {
          return this.db.collection(`/databases/user_scrape_opinions/${user_uid}`);
        };
        */
        // Ensure this calls sendResponse in all cases:
        this.setProductOpinion = async (event, sendResponse) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            try {
                if (event.data === undefined ||
                    event.page_url === undefined ||
                    event.collection_uid === undefined ||
                    event.opinion === undefined) {
                    sendResponse({
                        success: false,
                        error: "Missing 'page_url' and/or 'collection_uid' and/or 'opinion' and/or 'product' in input!",
                    });
                    return;
                }
                if (((_a = this.firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) === undefined) {
                    sendResponse({
                        success: false,
                        error: "setProductOpinion: Firebase not connected properly!",
                    });
                    return;
                }
                if (!this.opinionsByURL) {
                    const error = "opinionsByURL not set, most likely user not loaded yet into firebase.";
                    this.logReporter.debugError(new Error(error), error);
                    sendResponse({
                        success: false,
                        error,
                    });
                    return;
                }
                const collectionUIDToAddTo = event.collection_uid === "most_recent"
                    ? (_b = this.collectionList.getMostRecentCollection()) === null || _b === void 0 ? void 0 : _b.id
                    : event.collection_uid;
                if (collectionUIDToAddTo === undefined) {
                    sendResponse({
                        success: true, // not really a success but makes it easier with typing...
                        details: {
                            no_collections: true,
                        },
                    });
                    return;
                }
                // Ensure that we do not already have this item in this collection:
                const initialPageURLDocID = (_e = (_d = (_c = this.opinionsByURL) === null || _c === void 0 ? void 0 : _c[event.page_url]) === null || _d === void 0 ? void 0 : _d.productCollectionMembership[event.collection_uid]) !== null && _e !== void 0 ? _e : (_g = (_f = this.opinionsByURLExtra) === null || _f === void 0 ? void 0 : _f[event.page_url]) === null || _g === void 0 ? void 0 : _g[event.collection_uid];
                const initialPageURLOpinion = initialPageURLDocID !== undefined;
                if (initialPageURLOpinion === event.opinion) {
                    sendResponse({
                        success: false,
                        error: "Already set to this opinion",
                    });
                    return;
                }
                const userUID = this.firebaseLink.auth.currentUser.uid;
                // If we are adding it:
                if (event.opinion === true) {
                    const createdAt = this.firebaseLink.serverTimestamp();
                    // First save the scrape to USER_SCRAPE_OPINIONS:
                    const newScrapeDoc = await this.firebaseLink.addToCollection(`/databases/user_scrape_opinions/${userUID}`, {
                        ...event.data,
                        created_at: createdAt,
                        firebase_scrape_time: createdAt,
                    });
                    // Now save it to the collection:
                    const newItemDoc = await this.firebaseLink.addToCollection(`/databases/user_product_collection/${userUID}/${event.collection_uid}/list`, {
                        page_url: event.page_url,
                        scrape_uid: newScrapeDoc.id,
                        created_at: createdAt,
                        collection_uid: event.collection_uid,
                        user_uid: userUID,
                        product_image: event.data.best_image.sources[0],
                        ex_version: chrome.runtime.getManifest().version,
                        scrape_data: {
                            site_uid: (_h = event.data.site_uid) !== null && _h !== void 0 ? _h : "UNKNOWN",
                            best_description: event.data.best_description,
                            best_image: event.data.best_image,
                            image_list: event.data.image_list,
                            best_link: event.data.best_link,
                            best_price: event.data.best_price,
                            main_product: event.data.main_product,
                            can_price_update: true,
                            created_at: createdAt,
                        },
                    });
                    sendResponse({ success: true, details: { item_id: newItemDoc.id } });
                }
                // If we are removing it:
                if (event.opinion === false) {
                    if (initialPageURLDocID === undefined) {
                        const error = `Cannot fetch document reference to delete this document!`;
                        this.logReporter.debugError(new Error(error), error);
                        sendResponse({
                            success: false,
                            error,
                        });
                        return;
                    }
                    // Remove it from the collection:
                    await this.firebaseLink.deleteDoc(`/databases/user_product_collection/${userUID}/${event.collection_uid}/list/${initialPageURLDocID}`);
                    sendResponse({ success: true });
                }
            }
            catch (err) {
                this.logReporter.debugError(err, `Adding / removing product failed`);
                sendResponse({
                    success: false,
                    error: `Adding / removing product failed ${err.toString()}`,
                });
                return;
            }
            // We have the ID stored locally in theory:
        };
        this.removeExtraListener = () => {
            clearTimeout(this.extraListnerTimeout);
            this.extraListener && this.extraListener();
        };
        this.tearDown = () => {
            this.listener && this.listener();
            this.removeExtraListener();
        };
        this.logReporter = logReporter;
        this.firebaseLink = firebaseLink;
        this.collectionList = collectionList;
        this.updateUserUID((_a = firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid);
        this.firebaseLink.addAuthChangeListenerFunction(this.updateUserUID);
    }
    // We want to limit the number of opinions to only the most recent, so use this to update the local wishlist page.
    async storeAllUserPageURLOpinions(event) {
        if (this.recordsListeningTo >= LISTENING_OPINION_LIMIT && this.userUID) {
            this.removeExtraListener();
            this.extraListnerTimeout = setTimeout(this.removeExtraListener, 10 * 60e3);
            this.extraListener =
                this.firebaseLink.listenQueryCollectionGroup(`list`, [
                    (0, firestore_1.where)(`user_uid`, `==`, this.userUID),
                    (0, firestore_1.where)(`page_url`, `==`, event.page_url),
                ], (collectionEntryList, changeList) => {
                    const newProductCollectionMembership = {};
                    collectionEntryList.forEach((entry) => {
                        newProductCollectionMembership[entry.collection_uid] = entry.id;
                    });
                    if (this.opinionsByURLExtra) {
                        this.opinionsByURLExtra[event.page_url] =
                            newProductCollectionMembership;
                    }
                    // Send all to the scripts:
                    const updates = changeList === null || changeList === void 0 ? void 0 : changeList.filter((change) => change[1] === "added" || change[1] === "removed").map((change) => ({
                        collection_uid: change[0].collection_uid,
                        page_url: change[0].page_url,
                        value: change[1] === "added",
                        uid: change[0].id,
                    }));
                    if (updates && updates.length > 0) {
                        (0, sendToAllTabs_1.sendToAllTabs)({
                            type: "api",
                            action: "update_product_data",
                            data: updates,
                            update_display_list: true,
                        }, this.logReporter);
                    }
                });
        }
    }
}
exports.Opinions = Opinions;


/***/ }),

/***/ 2724:
/***/ ((__unused_webpack_module, exports) => {


/*

Non-static module that fetches items from the memory and garbage collects the list there.

We simply store any URL that has been fetched in the past 24 hours to prevent it being saved again:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScrapePage = void 0;
const GB_RUN_INTERVAL_MINUTES = 4 * 60; // every 4 hours
const BATCH_SCRAPE_INTERVAL_MINUTES = 2; // every 2 mins
const MS_IN_ONE_DAY = 86400000;
const GB_COLLECT_ALARM_NAME = "scrape-page-garbage-collect";
const BATCH_SCRAPE_ALARM_NAME = "scrape-page-batch-sending";
const BATCH_SIZE = 50;
class ScrapePage {
    constructor(logReporter, firebaseLink) {
        this.scrapedByPageURL = {};
        this.currentBatch = [];
        this.setupTestingScrapingInterval = async () => {
            const response = await fetch(chrome.runtime.getURL("frequent_response.txt")).catch(() => false);
            if (response !== false) {
                console.log("Scraping interval shorter for testing");
                setInterval(this.sendProductScrapeBatch, 1000 * 20);
            }
        };
        this.checkForBGScrapeUID = async () => {
            const response = await fetch(chrome.runtime.getURL("bgscrape_uid.txt")).catch(() => false);
            if (response) {
                const bGScrapeUID = await response.text();
                console.log("BGScrapeUID:", bGScrapeUID);
                this.bGScrapeUID = bGScrapeUID;
            }
        };
        this.doScrape = (product) => {
            var _a, _b;
            if (!product) {
                return;
            }
            const productType = product.main_product === true ? "main" : "tile";
            const pageURLEntryTime = (_b = (_a = this.scrapedByPageURL[product.page_url]) === null || _a === void 0 ? void 0 : _a[productType]) !== null && _b !== void 0 ? _b : 0;
            const makeNew = new Date().getTime() - pageURLEntryTime > MS_IN_ONE_DAY;
            if (makeNew) {
                const productOut = {
                    ...product,
                    firebase_scrape_time: this.firebaseLink.serverTimestamp(),
                };
                // Add the scrape to the batch:
                this.currentBatch.push(productOut);
                const newEntry = {
                    ...this.scrapedByPageURL[product.page_url],
                    [productType]: new Date().getTime(),
                };
                this.scrapedByPageURL[product.page_url] = newEntry;
            }
        };
        // Function to actually send the scrape data, run every 2 mins:
        this.sendProductScrapeBatch = () => {
            const batch = this.currentBatch;
            this.currentBatch = [];
            // split into batches of BATCH_SIZE:
            for (let i = 0; i < Math.ceil((batch.length * 1.0) / BATCH_SIZE); i++) {
                const scrapesToSend = batch.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
                this.firebaseLink
                    .callFunction("scrape_products-call")({
                    batch: scrapesToSend,
                })
                    .catch((err) => this.logReporter.debugLog("ERROR sending batch of scrapes to backend", err));
            }
        };
        this.scrapeProduct = (event) => {
            for (let product of event.data.product_list) {
                this.doScrape(product);
            }
        };
        this.sendBGScrape = async (event) => {
            if (event.data !== undefined) {
                // only work if we have access to the firestore redux:
                if (this.firebaseLink.auth.currentUser !== undefined) {
                    console.log("REPORTING SCRAPE:", event.data);
                    try {
                        await this.firebaseLink.callFunction("backend_scrape_report_finished-call")(event.data);
                    }
                    catch (err) {
                        this.logReporter.debugError(err, "Error calling send_bgscrape: ");
                    }
                }
                else {
                    const error = "sendBGScrape: Firebase not connected properly!";
                    this.logReporter.debugError(new Error(error), error);
                }
            }
            else {
                this.logReporter.debugError(new Error("Missing 'data' in input fields!"), "Missing 'data' in input fields!");
            }
        };
        this.garbageCollect = async () => {
            try {
                this.logReporter.debugLog("%cApp.js: Garbage collecting scrapes...", "background-color:green");
                // Remove any of the product URL store that are over a day old:
                const pageURLsInList = Object.keys(this.scrapedByPageURL);
                const timeNow = new Date().getTime();
                pageURLsInList.forEach((pageURL) => {
                    const pageURLEntry = this.scrapedByPageURL[pageURL];
                    if (pageURLEntry) {
                        ["tile", "main"].forEach((pageType) => {
                            const entryTime = pageURLEntry[pageType];
                            if (entryTime && timeNow - entryTime > MS_IN_ONE_DAY) {
                                delete pageURLEntry[pageType];
                            }
                        });
                        if (Object.keys(pageURLEntry).length === 0) {
                            delete this.scrapedByPageURL[pageURL];
                        }
                    }
                });
            }
            catch (err) {
                this.logReporter.debugError(err, "Garbage collection failed on SiteSettingsManager, non-critical");
            }
        };
        this.tearDown = () => {
            this.gbCollectUnsubscribe();
            this.scrapeBatchUnsubscribe();
        };
        this.logReporter = logReporter;
        this.firebaseLink = firebaseLink;
        this.garbageCollect();
        chrome.alarms.create(GB_COLLECT_ALARM_NAME, {
            periodInMinutes: GB_RUN_INTERVAL_MINUTES,
        });
        const gbCollectFunction = (alarm) => {
            if (alarm.name === GB_COLLECT_ALARM_NAME) {
                this.garbageCollect();
            }
        };
        this.gbCollectUnsubscribe = () => chrome.alarms.onAlarm.removeListener(gbCollectFunction);
        chrome.alarms.onAlarm.addListener(gbCollectFunction);
        this.checkForBGScrapeUID();
        chrome.alarms.create(BATCH_SCRAPE_ALARM_NAME, {
            periodInMinutes: BATCH_SCRAPE_INTERVAL_MINUTES,
        });
        this.setupTestingScrapingInterval();
        const scrapeAlarmFunction = (alarm) => {
            if (alarm.name === BATCH_SCRAPE_ALARM_NAME) {
                this.sendProductScrapeBatch();
            }
        };
        chrome.alarms.onAlarm.addListener(scrapeAlarmFunction);
        this.scrapeBatchUnsubscribe = () => chrome.alarms.onAlarm.removeListener(scrapeAlarmFunction);
    }
}
exports.ScrapePage = ScrapePage;


/***/ }),

/***/ 9522:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

NON-STATIC MODULE

Fetches items from the memory and garbage collects the list there.

We simply store any URL that has been fetched in the past 24 hours to prevent it being saved again:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SiteSettingsManager = void 0;
const getSiteUID_1 = __webpack_require__(4483);
const siteSettingsTests_1 = __webpack_require__(8784);
const GB_RUN_INTERVAL_MINUTES = 60; // every hour
const EXPIRY_TIME_DURATION_MS = 24 * 60 * 60e3; // 1 day
const ALARM_NAME = "site-settings-manager-garbage-collect";
class SiteSettingsManager {
    constructor(logReporter, firebaseLink, harlinatorBackground) {
        this.settingsBySiteUID = {};
        this.retrieveSiteSettings = async (siteUID, timeout) => {
            var _a;
            // LOCAL:
            //   Harlinator:
            if (this.harlinatorBackground.siteUID === siteUID) {
                const siteSettingsHarlinator = this.harlinatorBackground.siteSettings;
                if (siteSettingsHarlinator) {
                    return { ...siteSettingsHarlinator, from_harlinator: true };
                }
            }
            //   In test:
            const siteSettingsTest = siteSettingsTests_1.siteSettingsTestsDict[siteUID];
            if (siteSettingsTest) {
                return siteSettingsTest;
            }
            //   Cached:
            const siteSettingsEntry = this.settingsBySiteUID[siteUID];
            const timeValidAfter = new Date().getTime() - EXPIRY_TIME_DURATION_MS;
            if (siteSettingsEntry && siteSettingsEntry.lastGot > timeValidAfter) {
                return (_a = siteSettingsEntry.settings) !== null && _a !== void 0 ? _a : undefined;
            }
            // FETCH FROM REMOTE:
            const siteSettingsRemote = await new Promise((resolve) => {
                setTimeout(() => {
                    this.logReporter.debugLog("Fetching site settings timed out");
                    resolve(null);
                }, timeout);
                this.firebaseLink
                    .getDoc(`/databases/site/settings/${siteUID}`)
                    .then(resolve); // Can fail if no connection, parse error upwards
            });
            this.settingsBySiteUID[siteUID] = {
                settings: siteSettingsRemote,
                lastGot: new Date().getTime(),
            };
            return siteSettingsRemote !== null && siteSettingsRemote !== void 0 ? siteSettingsRemote : undefined;
        };
        this.garbageCollect = async () => {
            try {
                this.logReporter.debugLog("%cApp.js: Garbage collecting site settings...", "background-color:green");
                // First query the background page to get the list of tab urls:
                const tabs = await chrome.tabs.query({});
                const tabURLs = tabs
                    .map((tab) => tab.url)
                    .filter((url) => url !== undefined);
                const siteUIDsPresentList = [
                    ...new Set(tabURLs
                        .map((url) => (0, getSiteUID_1.getSiteUID)(url, this.logReporter, true))
                        .filter((siteUID) => siteUID !== false)),
                ];
                // Now we will mark sites that are no longer open and remove them:
                const siteUIDsInList = Object.keys(this.settingsBySiteUID);
                const siteUIDsInListNotOpen = siteUIDsInList.filter((siteUID) => siteUIDsPresentList.includes(siteUID));
                // Now check which ones have expired and delete:
                const timeValidAfter = new Date().getTime() - EXPIRY_TIME_DURATION_MS;
                siteUIDsInListNotOpen.forEach((siteUID) => {
                    const siteSettingsEntry = this.settingsBySiteUID[siteUID];
                    if (siteSettingsEntry && siteSettingsEntry.lastGot <= timeValidAfter) {
                        delete this.settingsBySiteUID[siteUID];
                    }
                });
            }
            catch (err) {
                this.logReporter.debugError(err, "Garbage collection failed on SiteSettingsManager, non-critical");
            }
        };
        this.tearDown = () => {
            this.unsubscribeAlarm();
        };
        this.logReporter = logReporter;
        this.firebaseLink = firebaseLink;
        this.harlinatorBackground = harlinatorBackground;
        this.garbageCollect();
        chrome.alarms.create(ALARM_NAME, {
            periodInMinutes: GB_RUN_INTERVAL_MINUTES,
        });
        const alarmFunction = (alarm) => {
            if (alarm.name === ALARM_NAME) {
                this.garbageCollect();
            }
        };
        chrome.alarms.onAlarm.addListener(alarmFunction);
        this.unsubscribeAlarm = () => chrome.alarms.onAlarm.removeListener(alarmFunction);
    }
}
exports.SiteSettingsManager = SiteSettingsManager;


/***/ }),

/***/ 4500:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

NON-STATIC MODULE

Listen to the user's owner info essentially for name and tutorials to show.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserInfo = void 0;
const sendToAllTabs_1 = __webpack_require__(6237);
class UserInfo {
    constructor(logReporter, firebaseLink) {
        var _a;
        this.updateUserUID = (userUID) => {
            if (userUID !== this.userUID) {
                this.userUID = userUID;
                this.listenerOwner ? this.listenerOwner() : null;
                if (userUID) {
                    this.listenerOwner = this.firebaseLink.listenDoc(`/databases/user/${userUID}/owner`, (data) => {
                        this.userOwner = data !== null && data !== void 0 ? data : undefined;
                        this.onOwnerUpdate();
                    });
                    this.firebaseLink
                        .getDoc(`/databases/user/${userUID}/verified_settings`)
                        .then((data) => {
                        this.userVerifiedSettings = data !== null && data !== void 0 ? data : undefined;
                        this.onOwnerUpdate();
                    });
                }
                else {
                    this.listenerOwner = undefined;
                    this.userVerifiedSettings = undefined;
                    this.userOwner = undefined;
                    this.onOwnerUpdate();
                }
            }
        };
        this.onOwnerUpdate = () => {
            // only update if both userVerifiedSettings and userOwner are set or both are unset:
            if ((this.userVerifiedSettings === undefined) !==
                (this.userOwner === undefined)) {
                return;
            }
            (0, sendToAllTabs_1.sendToAllTabs)({
                action: "user_owner_update",
                data: {
                    user_uid: this.userUID,
                    snapshot: this.userOwner,
                    verified_settings: this.userVerifiedSettings,
                },
            }, this.logReporter);
        };
        // Ensure this calls sendResponse in all cases:
        this.setUserInfo = async (event, sendResponse) => {
            var _a;
            try {
                if (event.dict_name === undefined || event.sub_dict === undefined) {
                    sendResponse({
                        success: false,
                        error: "Missing 'dict_name' and/or 'sub_dict' in input fields!",
                    });
                    return;
                }
                // only work if we have access to the firestore redux:
                if (((_a = this.firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) === undefined) {
                    const error = "setUserInfo: Firebase not connected properly!";
                    sendResponse({
                        success: false,
                        error,
                    });
                    this.logReporter.debugError(new Error(error), error);
                    return;
                }
                await this.firebaseLink.updateDoc(`/databases/user/${this.userUID}/owner`, {
                    [event.dict_name]: event.sub_dict,
                    ["update_record." + event.dict_name]: this.firebaseLink.serverTimestamp(),
                });
                // No need to actually send the data back as this will be done with a firebase trigger to ensure it has all changed and is correct!
                sendResponse({
                    success: true,
                });
                return;
            }
            catch (error) {
                sendResponse({
                    success: false,
                    error: "Error writing document to firebase: " + error.toString(),
                });
            }
        };
        this.tearDown = () => {
            this.listenerOwner && this.listenerOwner();
        };
        this.logReporter = logReporter;
        this.firebaseLink = firebaseLink;
        this.updateUserUID((_a = firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid);
        this.firebaseLink.addAuthChangeListenerFunction(this.updateUserUID);
    }
}
exports.UserInfo = UserInfo;


/***/ }),

/***/ 4060:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

Detects if images are downloaded by chrome.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addImageLoadingDetection = addImageLoadingDetection;
const sendToTab_1 = __webpack_require__(8777);
function addImageLoadingDetection(logReporter) {
    try {
        const listenerFunction = function (details) {
            var _a, _b;
            try {
                // only if loaded by an open tab:
                // TODO: Only if a tab that is running the extension!
                if (details.tabId >= 0 && details.responseHeaders) {
                    // get the content length and if image should be cached or not:
                    // Avoid silly pixel images!
                    let contentLength;
                    let cached = false;
                    for (let header of details.responseHeaders) {
                        // headers are sometimes written "Content-Length" etc..
                        const hearderNameLowercase = header.name.toLowerCase();
                        if (hearderNameLowercase === "content-length") {
                            contentLength = parseInt((_a = header.value) !== null && _a !== void 0 ? _a : "0", 10);
                        }
                        else if (hearderNameLowercase === "cache-control") {
                            const hearderValueLowercase = (_b = header.value) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                            if (hearderValueLowercase === "no-cache" ||
                                hearderValueLowercase === "no-store") {
                                cached = true;
                            }
                        }
                    }
                    // Proper, non-tracking images will be cached almost certainly.
                    if (contentLength && contentLength > 200) {
                        (0, sendToTab_1.sendToTab)(details.tabId, {
                            action: "image_loaded",
                        }, logReporter);
                    }
                    else {
                        if (!cached) {
                            // Get content length if we don't have it from the header!
                            fetch(details.url)
                                .then((response) => {
                                response.arrayBuffer().then((buffer) => {
                                    contentLength = buffer.byteLength;
                                    (0, sendToTab_1.sendToTab)(details.tabId, {
                                        action: "image_loaded",
                                    }, logReporter);
                                });
                            })
                                // Failing to fetch the image is not a big deal, it probably doesn't exist anymore.
                                // It just fills up our logs with errors otherwise.
                                .catch((err) => null);
                        }
                    }
                }
            }
            catch (err) {
                logReporter.debugError(err, "Failed to fully process a detaction of loading of an image detection - semi-critical");
            }
        };
        if (chrome.runtime !== undefined) {
            // And the image loading detection:
            chrome.webRequest.onCompleted.addListener(listenerFunction, 
            // All URLS but only images:
            { urls: ["<all_urls>"], types: ["image"] }, 
            // Ensure that we get the response headers though as we need them!
            ["responseHeaders"]);
            return () => chrome.webRequest.onCompleted.removeListener(listenerFunction);
        }
    }
    catch (err) {
        logReporter.debugError(err, "Failed to process add loading of image detection - critical");
    }
    return () => { };
}


/***/ }),

/***/ 6491:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

Just some of what we do when the auth changes

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addOnAuthChangeListener = void 0;
const setLocalStorage_1 = __webpack_require__(5295);
const sendToAllTabs_1 = __webpack_require__(6237);
const addOnAuthChangeListener = (firebaseLink, logReporter) => {
    const listener = async (userUID) => {
        if (userUID !== undefined) {
            // And set the cookie that if we log out we need to display the message to remind people to sign in!
            (0, setLocalStorage_1.setLocalStorage)({
                hide_sign_in_message: false,
            });
        }
        logReporter.onAuthChange(userUID);
        (0, sendToAllTabs_1.sendToAllTabs)({
            action: "schedule_update",
        }, logReporter);
        return;
    };
    firebaseLink.addAuthChangeListenerFunction(listener);
};
exports.addOnAuthChangeListener = addOnAuthChangeListener;


/***/ }),

/***/ 6695:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

Some of what we do outside firebase link on logout.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addOnLogoutListener = void 0;
const setLocalStorage_1 = __webpack_require__(5295);
const addOnLogoutListener = (firebaseLink) => {
    const listener = async () => {
        // IF now not signed in don't show the sign in message if they were signed in and actively signed out, it would be weird and a bit annoying!!
        (0, setLocalStorage_1.setLocalStorage)({
            hide_sign_in_message: true,
        });
        return;
    };
    firebaseLink.addLogoutListenerFunction(listener);
};
exports.addOnLogoutListener = addOnLogoutListener;


/***/ }),

/***/ 2775:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addPopupCloseDetection = void 0;
const sendToTab_1 = __webpack_require__(8777);
const addPopupCloseDetection = (logReporter) => {
    const listenerFunction = function (port) {
        if (port.name === "popup") {
            port.onDisconnect.addListener(function () {
                console.log("popup has been closed");
                chrome.tabs.query({
                    active: true,
                    lastFocusedWindow: true,
                }, function (tabs) {
                    if (tabs[0].id) {
                        (0, sendToTab_1.sendToTab)(tabs[0].id, {
                            type: "dropdown",
                            action: "closed_popup",
                        }, logReporter);
                    }
                });
            });
        }
    };
    chrome.runtime.onConnect.addListener(listenerFunction);
    return () => chrome.runtime.onConnect.removeListener(listenerFunction);
};
exports.addPopupCloseDetection = addPopupCloseDetection;


/***/ }),

/***/ 6138:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

Adds reporting of usage to background script.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addReportingOfUsage = addReportingOfUsage;
const getLocalStorage_1 = __webpack_require__(123);
const RUN_INTERVAL_MINUTES = 24 * 60 * 60e3; // every 24 hrs
const ALARM_NAME = "chrome-extension-usage-reporter";
function addReportingOfUsage(firebaseLink) {
    const functionToCheckUsage = async () => {
        var _a;
        const lastLoggedInAs = (_a = (await (0, getLocalStorage_1.getLocalStorage)(["last_logged_in_user"])).last_logged_in_user) !== null && _a !== void 0 ? _a : undefined;
        // Record in DB:
        const request = {
            api: "record_usage",
            last_logged_in_as: lastLoggedInAs,
        };
        // TODO: legacy functions to make validator happy:
        if (lastLoggedInAs === undefined) {
            delete request.last_logged_in_as;
        }
        firebaseLink.callFunction("fast_api-call")(request);
    };
    functionToCheckUsage();
    // Set to do it again in a day's time (should have reloaded anyway):
    chrome.alarms.create(ALARM_NAME, {
        periodInMinutes: RUN_INTERVAL_MINUTES,
    });
    const alarmFunction = (alarm) => {
        if (alarm.name === ALARM_NAME) {
            functionToCheckUsage();
        }
    };
    chrome.alarms.onAlarm.addListener(alarmFunction);
    return () => chrome.alarms.onAlarm.removeListener(alarmFunction);
}


/***/ }),

/***/ 9528:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
/*
Moonsift Browser Extension Background Script

David Wood, 2019, 2020, 2023

I like cheeseburgers

*/
/*

Imports:

*/
importScripts("./lib/rollbar.min.js");
console.log("MOONSIFT - LOADING BACKGROUND SCRIPT");
const HotReload_1 = __webpack_require__(7029);
const LogReporter_1 = __webpack_require__(9764);
const constants_1 = __webpack_require__(2210);
const runBackground_1 = __webpack_require__(6734);
const RESTART_INTERVAL_MINUTES = 24 * 60 * 3;
const RESTART_ALARM_NAME = "chrome-extension-restart-sw";
/*

Hot reload (for development!)

*/
// @ts-ignore
if (false) {}
// Keep alive the background script for real-time updates
// This is because we use firestore listeners.  Recreating these frequently would be bad for performance.
const keepAlive = () => {
    chrome.tabs.query({}, function (tabs) {
        var _a;
        if (tabs.length > 0 && tabs[0]) {
            const tabID = (_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.id;
            if (tabID) {
                () => chrome.tabs.sendMessage(tabID, { type: "keepAlive" });
            }
        }
    });
};
keepAlive();
const keepAliveInterval = setInterval(keepAlive, 25e3);
/*

Run background script and add listener for unsubscribing and resubscribing:

*/
const logReporter = new LogReporter_1.LogReporter();
let unsubscribe;
unsubscribe = (0, runBackground_1.runBackground)(logReporter);
chrome.runtime.onMessageExternal.addListener((message) => {
    if (message.action === constants_1.MS_RESTART_ACTION) {
        console.warn("Restarting runnable background script");
        unsubscribe();
        (0, runBackground_1.runBackground)(logReporter);
    }
    if (message.action === constants_1.MS_RELOAD_ACTION) {
        console.warn("Restarting chrome extension!  Be sure to reload tabs!");
        chrome.runtime.reload();
    }
});
// Reload the extension every 3 days by letting it go inactive:
chrome.alarms.create(RESTART_ALARM_NAME, {
    delayInMinutes: RESTART_INTERVAL_MINUTES,
});
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === RESTART_ALARM_NAME) {
        console.warn("Allowing chrome extension to go inactive now as it's been on for 72 hrs");
        clearInterval(keepAliveInterval);
    }
});


/***/ }),

/***/ 9339:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

This just checks that the chrome webstore page is open and opens the post intall page.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkJustInstalled = checkJustInstalled;
const getLocalStorage_1 = __webpack_require__(123);
const setLocalStorage_1 = __webpack_require__(5295);
const checkTabsForChromeWebStorePage = (logReporter) => new Promise((resolve) => {
    chrome.tabs.query({}, function (tabs) {
        for (let tab of tabs) {
            try {
                // first check if this is the post-install page: {
                if (tab.url && tab.url.includes("hgbbfkafecdbocpcdkoahfkbkoodcaon")) {
                    resolve(true);
                }
            }
            catch (err) {
                // Logging this as error is being reported when it's not really a great idea to do so as it's not relevant
                logReporter.debugLog(err, "Failed to check a tab for chrome store page for extension to do post-install - non-critical", tab);
            }
        }
        resolve(false);
    });
});
async function checkJustInstalled(logReporter) {
    var _a;
    // if we've just installed this then probably there is a page open with our extension info in, so check it:
    try {
        // Check if we have previous mentioning of the extension in memory:
        const installedBefore = (_a = (await (0, getLocalStorage_1.getLocalStorage)(["installed_before"])).installed_before) !== null && _a !== void 0 ? _a : false;
        if (!installedBefore) {
            const onChromeWebstorePage = await checkTabsForChromeWebStorePage(logReporter);
            const slug = onChromeWebstorePage ? "postinstall" : "extension-upgraded";
            chrome.tabs.create({
                url: `${"https://www.moonsift.com"}/${slug}`,
            });
            (0, setLocalStorage_1.setLocalStorage)({
                installed_before: true,
                install_date: new Date().getTime(),
            });
        }
    }
    catch (err) {
        logReporter.debugError(err, "Failed to fully check tabs for chrome store page for extension to do post-install - non-critical");
    }
}


/***/ }),

/***/ 2210:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MS_RELOAD_ACTION = exports.MS_RESTART_ACTION = void 0;
exports.MS_RESTART_ACTION = "background-restart";
exports.MS_RELOAD_ACTION = "background-reload";


/***/ }),

/***/ 8786:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

This sets up to listen to external messages.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listenToExternalMessages = listenToExternalMessages;
const constants_1 = __webpack_require__(2210);
const u8ArrayToBase64_1 = __webpack_require__(1891);
function listenToExternalMessages(firebaseLink, harlinatorAPI, logReporter) {
    const listenerFunction = async (message, sender, sendResponse) => {
        var _a;
        if (message.action === constants_1.MS_RESTART_ACTION) {
            // Handled elsewhere
            return;
        }
        if (message.action === constants_1.MS_RELOAD_ACTION) {
            // Handled elsewhere
            return;
        }
        if (message.action === "get-image-data") {
            try {
                const response = await fetch(message.url);
                const arrayBuffer = await response.arrayBuffer();
                const base64 = (0, u8ArrayToBase64_1.u8ArrayToBase64)(new Uint8Array(arrayBuffer));
                sendResponse(base64);
            }
            catch (error) {
                logReporter.debugError(error, "Error getting image data in background");
                sendResponse(undefined);
            }
            return;
        }
        if (message.project === "moonsift-web") {
            if (message.action === "auth-logout") {
                firebaseLink.logout();
                return;
            }
            if (message.action === "auth-check") {
                ((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id) &&
                    firebaseLink.authCheck(message.authUserUID, sender.tab.id);
                return;
            }
            if (message.action === "auth-login") {
                firebaseLink.authenticate(message.token);
                return;
            }
            if (message.type === "front-end" && message.action === "ping") {
                sendResponse({
                    success: true,
                    version: "4.1.35",
                    key: "4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085",
                    title: "",
                });
                return;
            }
        }
        if (message.protocol === "harlinator") {
            // ASYNC!
            // Ensure that the function below calls sendResponse at some point!
            harlinatorAPI.receiveApi(message.message, sendResponse);
            return true;
        }
        sendResponse({
            error: "Moonsift Cex: Protocol not recognised",
        });
    };
    // Listen to events from the Moonsift web-site:
    chrome.runtime.onMessageExternal.addListener(listenerFunction);
    return () => chrome.runtime.onMessageExternal.removeListener(listenerFunction);
}


/***/ }),

/***/ 3972:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

Listen to messages from the page script pages (i.e. calls made within the extension)

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listenToInternalMessages = listenToInternalMessages;
const sendSiteSettings_1 = __webpack_require__(8247);
const whitelistLookup_1 = __webpack_require__(2160);
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));
function listenToInternalMessages({ logReporter, harlinatorAPI, firebaseLink, siteSettingsManager, opinions, userInfo, scrapePage, collectionList, }) {
    try {
        const listenerToAdd = function (request, _sender, sendResponse) {
            var _a;
            try {
                logReporter.debugLog("%cReceived request:", "background-color:lightskyblue", request);
                if ("type" in request && request.type === "harlinator") {
                    harlinatorAPI.exReceiveApi(request);
                    return;
                }
                switch (request.action) {
                    case "whitelist_lookup":
                        (0, whitelistLookup_1.whitelistLookup)(request, sendResponse, logReporter, firebaseLink);
                        return;
                    case "open_tab":
                        chrome.tabs.create({ url: request.data.url });
                        return;
                    case "get_site_settings":
                        (0, sendSiteSettings_1.sendSiteSettings)(request, sendResponse, siteSettingsManager, userInfo, scrapePage, logReporter);
                        return true;
                    case "record_error":
                        logReporter.sendError(new Error(request.data.message), request.data);
                        return;
                    case "set_product_opinion":
                        opinions.setProductOpinion(request, sendResponse);
                        return true;
                    case "get_product_opinion":
                        opinions.getProductOpinion(request, sendResponse);
                        return;
                    case "get_collection_list":
                        collectionList.updateCollectionList(request, sendResponse);
                        return;
                    case "add_new_collection":
                        collectionList.addNewCollection(request, sendResponse);
                        return true;
                    case "set_owner_data":
                        userInfo.setUserInfo(request, sendResponse);
                        return true;
                    case "add_product_manually":
                        // Ensure this calls sendResponse in all cases:
                        firebaseLink
                            .callFunction("fast_api-call")(request.data)
                            .then((result) => {
                            if (result.data.success) {
                                return sendResponse(result.data);
                            }
                            const error = "Backend function failed to add product manually";
                            sendResponse({
                                success: false,
                                error,
                            });
                            logReporter.debugError(new Error(error), error);
                        })
                            .catch((err) => {
                            sendResponse({ success: false, error: err.toString() });
                            logReporter.debugError(err, "Failed to add product manually");
                        });
                        return true;
                    case "add_item_note":
                        // Ensure this calls sendResponse in all cases:
                        firebaseLink
                            .callFunction("fast_api-call")(request.data)
                            .then((result) => {
                            if (result.data.success) {
                                return sendResponse({
                                    success: true,
                                });
                            }
                            return sendResponse({
                                success: false,
                                error: "Backend function failed to add item note",
                            });
                        })
                            .catch((err) => {
                            sendResponse({ success: false, error: err.toString() });
                            logReporter.debugError(err, "Failed to add note");
                        });
                        return true;
                    case "send_bgscrape":
                        scrapePage.sendBGScrape(request);
                        return;
                    case "check_logged_in":
                        sendResponse({
                            success: true,
                            signed_in: ((_a = firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) ? true : false,
                        });
                        return;
                    case "scrape":
                        scrapePage.scrapeProduct(request);
                        return;
                    case "ensure_pageurl_opinion_uptodate":
                        opinions.storeAllUserPageURLOpinions(request);
                        return;
                }
                sendResponse({
                    success: false,
                    error: "type not recognised",
                });
                return;
            }
            catch (err) {
                logReporter.debugError(err, "Failed to process request - critical");
                sendResponse({
                    success: false,
                    error: err.toString(),
                });
            }
        };
        // the content script message detection - most will just go through straight to the iframe:
        chrome.runtime.onMessage.addListener(listenerToAdd);
        return () => chrome.runtime.onMessage.removeListener(listenerToAdd);
    }
    catch (err) {
        logReporter.debugError(err, "Failed to add messsage listener - critical");
    }
    return () => { };
}


/***/ }),

/***/ 6734:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runBackground = void 0;
const addImageLoadingDetection_1 = __webpack_require__(4060);
const API_1 = __webpack_require__(7569);
const FirebaseLink_1 = __webpack_require__(318);
const Opinions_1 = __webpack_require__(4968);
const SiteSettingsManager_1 = __webpack_require__(9522);
const UserInfo_1 = __webpack_require__(4500);
const CollectionList_1 = __webpack_require__(2927);
const addOnAuthChangeListener_1 = __webpack_require__(6491);
const listenToExternalMessages_1 = __webpack_require__(8786);
const listenToInternalMessages_1 = __webpack_require__(3972);
const ScrapePage_1 = __webpack_require__(2724);
const addOnLogoutListener_1 = __webpack_require__(6695);
const addPopupCloseDetection_1 = __webpack_require__(2775);
const checkJustInstalled_1 = __webpack_require__(9339);
const addReportingOfUsage_1 = __webpack_require__(6138);
const runBackground = (logReporter) => {
    /*
  
    Set up global objects:
  
    */
    logReporter.debugLog(`Moonsift's Background.js and page is loading, version: ${"4.1.35_08403aff410573fb150f0bffdd05f39bec3e3085"}, compiled at: ${"Tue Sep 23 2025 10:48:23 GMT+0000 (Coordinated Universal Time)"}`);
    const firebaseLink = new FirebaseLink_1.FirebaseLink(logReporter);
    (0, addOnAuthChangeListener_1.addOnAuthChangeListener)(firebaseLink, logReporter);
    (0, addOnLogoutListener_1.addOnLogoutListener)(firebaseLink);
    logReporter.setFirebaseLink(firebaseLink);
    const collectionList = new CollectionList_1.CollectionList(logReporter, firebaseLink);
    const opinions = new Opinions_1.Opinions(logReporter, firebaseLink, collectionList);
    const harlinatorAPI = new API_1.HarlinatorAPI();
    const siteSettingsManager = new SiteSettingsManager_1.SiteSettingsManager(logReporter, firebaseLink, harlinatorAPI);
    const scrapePage = new ScrapePage_1.ScrapePage(logReporter, firebaseLink);
    const userInfo = new UserInfo_1.UserInfo(logReporter, firebaseLink);
    /*
  
    Add some chrome listeners:
  
    */
    const popupCloseUnsubscribe = (0, addPopupCloseDetection_1.addPopupCloseDetection)(logReporter);
    const internalMessagesUnsubscribe = (0, listenToInternalMessages_1.listenToInternalMessages)({
        logReporter,
        harlinatorAPI,
        firebaseLink,
        siteSettingsManager,
        opinions,
        userInfo,
        scrapePage,
        collectionList,
    });
    const extneralMessagesUnsubscribe = (0, listenToExternalMessages_1.listenToExternalMessages)(firebaseLink, harlinatorAPI, logReporter);
    const imageLoadingDetectionUnsibscribe = (0, addImageLoadingDetection_1.addImageLoadingDetection)(logReporter);
    /*
  
    Final things:
  
    */
    (0, checkJustInstalled_1.checkJustInstalled)(logReporter);
    const usageReportingUnsubscribe = (0, addReportingOfUsage_1.addReportingOfUsage)(firebaseLink);
    logReporter.debugLog(`Main background page script load completed.`);
    return () => {
        popupCloseUnsubscribe();
        internalMessagesUnsubscribe();
        extneralMessagesUnsubscribe();
        imageLoadingDetectionUnsibscribe();
        usageReportingUnsubscribe();
        firebaseLink.tearDown();
        collectionList.tearDown();
        opinions.tearDown();
        siteSettingsManager.tearDown();
        scrapePage.tearDown();
        userInfo.tearDown();
    };
};
exports.runBackground = runBackground;


/***/ }),

/***/ 8247:
/***/ ((__unused_webpack_module, exports) => {


/*

INDIVIDUAL FUNCTION

Separate function as this includes stuff from several non-static class Managers:

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendSiteSettings = void 0;
const sendSiteSettings = async (event, sendResponse, siteSettingsManager, userInfo, scrapePage, logReporter) => {
    try {
        // ensure we are given a site_uid:
        if (event.siteUID === "" || event.siteUID === undefined) {
            sendResponse({
                success: false,
                error: "Please provide a site UID",
            });
            return;
        }
        const siteSettings = await siteSettingsManager.retrieveSiteSettings(event.siteUID, event.db_timeout);
        // Get the user info:
        sendResponse({
            success: true,
            user_uid: userInfo.userUID,
            user_owner: userInfo.userOwner,
            user_verified_settings: userInfo.userVerifiedSettings,
            settings: siteSettings,
            bgscrape_uid: scrapePage.bGScrapeUID,
        });
        return;
    }
    catch (err) {
        // catch case that no connection (or other failure):
        logReporter.debugError(err, "Failed to send Site settings");
    }
    // If we fail to get the site settings then nevermind let's just catch the error and return what we can:
    sendResponse({
        success: true,
        user_uid: userInfo.userUID,
        user_owner: userInfo.userOwner,
        user_verified_settings: userInfo.userVerifiedSettings,
        bgscrape_uid: scrapePage.bGScrapeUID,
    });
};
exports.sendSiteSettings = sendSiteSettings;


/***/ }),

/***/ 6237:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*

SINGLE FUNCTION

For sending internal messages to the content scripts

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendToAllTabs = sendToAllTabs;
const sendToTab_1 = __webpack_require__(8777);
function sendToAllTabs(message, logReporter) {
    chrome.tabs.query({}, function (tabs) {
        for (let tab of tabs) {
            tab.id && (0, sendToTab_1.sendToTab)(tab.id, message, logReporter);
        }
    });
}


/***/ }),

/***/ 8777:
/***/ ((__unused_webpack_module, exports) => {


/*

SINGLE FUNCTION

For sending internal messages to the content scripts

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendToTab = void 0;
const sendToTab = (tabID, message, logReporter) => chrome.tabs
    .sendMessage(tabID, message)
    .then((response) => response &&
    logReporter.debugLog("%cReceived response:", "background-color:lightskyblue", response))
    .catch((err) => {
    if (
    // disregard case tab is not connected to extension.
    err.message !==
        "Could not establish connection. Receiving end does not exist.") {
        logReporter.debugError(err, "Unable to send message", message, "to tab", tabID);
    }
    else {
        logReporter.debugLog("Could not send message to tab as connection not set up!");
    }
});
exports.sendToTab = sendToTab;


/***/ }),

/***/ 8784:
/***/ ((__unused_webpack_module, exports) => {


/*

Test sites in here before adding as JSONs:

store as:

{
  'jellycat.com':{
    tiles:[
      {...}
    ],
    main:[
      {...}
    ],
    ....
  }
}

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.siteSettingsTestsDict = void 0;
exports.siteSettingsTestsDict = {};


/***/ }),

/***/ 1891:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.u8ArrayToBase64 = u8ArrayToBase64;
function u8ArrayToBase64(arr) {
    let str = "";
    arr.forEach((byte) => {
        str += String.fromCharCode(byte);
    });
    return btoa(str);
}


/***/ }),

/***/ 4310:
/***/ ((__unused_webpack_module, exports) => {


/*

CONSTANT

The whitelist of sites to run moonsift content scripts on.

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.whitelist = void 0;
exports.whitelist = new Set([
    "1800getlens.com",
    "24s.com",
    "24sevres.com",
    "5pointz.co.uk",
    "7liverpool.com",
    "8ball.co.uk",
    "achillesheel.co.uk",
    "aclens.com",
    "acnestudios.com",
    "adidas.co.uk",
    "adidas.com",
    "ae.com",
    "aeo.com",
    "aerie.com",
    "afeyewear.com",
    "affiliates.quotatis.co.uk",
    "agentprovocateur.com",
    "agnesb.co.uk",
    "aldoshoes.com",
    "alexandermcqueen.com",
    "allenedmonds.com",
    "allsaints.co.uk",
    "allsaints.com",
    "allsole.com",
    "alwayspersonal.co.uk",
    "amazon.co.uk",
    "ambreyewear.com",
    "ambrosewilson.com",
    "amiclubwear.com",
    "amiparis.com",
    "amplebosom.com",
    "anantara.com",
    "annoushka.com",
    "anthropologie.co.uk",
    "anthropologie.com",
    "antonioli.eu",
    "anyahindmarch.com",
    "apc.fr",
    "aphrodite1994.com",
    "apricotonline.co.uk",
    "arcteryx.com",
    "argento.co.uk",
    "argento.com",
    "argos.co.uk",
    "arket.com",
    "armedforceseyewear.com",
    "artofmetal.co.uk",
    "asda.com",
    "ashford.com",
    "ashleystewart.com",
    "asics.com",
    "asicstiger.com",
    "asos.co.uk",
    "asos.com",
    "aspesi.com",
    "aspiga.com",
    "aspinaloflondon.co.uk",
    "aspinaloflondon.com",
    "astleyclarke.com",
    "astridandmiyu.com",
    "atterley.com",
    "austinreed.com",
    "authenticwatches.com",
    "avawomen.com",
    "avenue.com",
    "axelarigato.com",
    "axparis.com",
    "balielf.com",
    "bally.co.uk",
    "bally.com",
    "bally.eu",
    "ballyofswitzerland.com",
    "bambooclothing.co.uk",
    "baracuta.com",
    "barcelo.com",
    "bargaincrazy.com",
    "barneys.com",
    "bbclothing.co.uk",
    "beachcafe.com",
    "beaverbrooks.co.uk",
    "bejealous.com",
    "bellamiaboutique.co.uk",
    "bellelily.com",
    "bellfieldclothing.com",
    "belstaff.co.uk",
    "bensherman.co.uk",
    "bensherman.com",
    "bergdorfgoodman.com",
    "berghaus.com",
    "bestbuyeyeglasses.com",
    "bidz.com",
    "biscuiteers.com",
    "bivolino.com",
    "black.co.uk",
    "blacklane.com",
    "blacks.co.uk",
    "bloomingdales.com",
    "blueandcream.com",
    "bluebella.com",
    "bluevanilla.com",
    "bobijou.com",
    "bobobobo.com",
    "boden.co.uk",
    "bodyjewelleryshop.co.uk",
    "bodyjewelleryshop.com",
    "bokksu.com",
    "bombinate.com",
    "bondhiltonjewellers.co.uk",
    "boohoo.com",
    "boohooman.com",
    "boutiquejewels.com",
    "bouxavenue.com",
    "bowsboutiques.com",
    "boxlunch.com",
    "brandymelville.co.uk",
    "brastop.com",
    "brownsfashion.com",
    "bungalow.net",
    "burberry.com",
    "burton.co.uk",
    "buyma.com",
    "buyma.us",
    "cafepress.co.uk",
    "cafepress.com",
    "caliroots.com",
    "calvinklein.co.uk",
    "cambridgesatchel.com",
    "candccalifornia.com",
    "candefashions.com",
    "carters.com",
    "casadei.com",
    "cashmereboutique.com",
    "catfootwear.com",
    "cathkidston.co.uk",
    "cathkidston.com",
    "cbazaar.com",
    "celticandco.com",
    "cettire.com",
    "chainreactioncycles.com",
    "chainreactionhub.com",
    "chatham.co.uk",
    "checksinthemail.com",
    "chescadirect.co.uk",
    "chichiclothing.com",
    "chiclook.co.uk",
    "chintiandparker.com",
    "choicestore.com",
    "christiesdirect.com",
    "christopherkane.com",
    "christys-hats.com",
    "circa.co.uk",
    "claires.co.uk",
    "claires.com",
    "clarks.co.uk",
    "claudiabradby.com",
    "claudiepierlot.com",
    "clearance.asics.com",
    "clickbasin.co.uk",
    "closetlondon.com",
    "coach.com",
    "coastal.com",
    "coggles.com",
    "conceptbycruise.com",
    "contactlensking.com",
    "contactsamerica.com",
    "converse.com",
    "corgihosiery.co.uk",
    "corncott.com",
    "cosstores.com",
    "cosyfeet.com",
    "cottontraders.co.uk",
    "cottontraders.com",
    "countryattire.com",
    "couturecandy.com",
    "couvertureandthegarbstore.com",
    "cpcompany.co.uk",
    "crabtree-evelyn.co.uk",
    "craghoppers.co.uk",
    "craghoppers.com",
    "crewclothing.co.uk",
    "crocs.co.uk",
    "cross.com",
    "cruisefashion.co.uk",
    "cruisefashion.com",
    "crumpler.eu",
    "ctshirts.co.uk",
    "ctshirts.com",
    "cubavera.com",
    "cuckooland.com",
    "cultgaia.com",
    "culturevulturedirect.co.uk",
    "currentelliott.com",
    "curvykate.com",
    "cuyana.com",
    "cwclothes.co.uk",
    "cwsellors.co.uk",
    "daisyjewellery.com",
    "damart.co.uk",
    "dancedirect.com",
    "dancesport.uk.com",
    "dare2b.com",
    "dartington.co.uk",
    "daylong.co.uk",
    "db3online.com",
    "deadgoodundies.com",
    "debenhams.com",
    "deichmann.com",
    "demellierlondon.com",
    "dents.co.uk",
    "designerpaint.co.uk",
    "designerpaint.com",
    "desigual.com",
    "desmondanddempsey.com",
    "destinology.co.uk",
    "diamonds-usa.com",
    "discountglasses.com",
    "disneystore.com",
    "dolcegabbana.com",
    "dorothyperkins.co.uk",
    "dorothyperkins.com",
    "dosportlive.com",
    "drmartens.com",
    "dukeanddexter.com",
    "dunelondon.com",
    "dvf.com",
    "earthpositive.se",
    "eastdane.com",
    "eastpak.com",
    "easy2name.com",
    "easylifegroup.com",
    "ebags.com",
    "ebagsir.com",
    "eccoshoesuk.com",
    "ego.co.uk",
    "eleonorabonucci.com",
    "ellos.co.uk",
    "elvisandkresse.com",
    "emp.co.uk",
    "endclothing.com",
    "endource.com",
    "englishhall.com",
    "ennialingerie.com",
    "envie4u.co.uk",
    "equipmentfr.com",
    "eqvvs.co.uk",
    "eraldo.com",
    "ernestjones.co.uk",
    "esedirect.co.uk",
    "esmale.com",
    "essentiel-antwerp.com",
    "etojeans.co.uk",
    "etsy.com",
    "eu.stuartweitzman.com",
    "evans.co.uk",
    "everlane.com",
    "everything5pounds.com",
    "evesaddiction.com",
    "ewm.co.uk",
    "express.com",
    "expressionery.com",
    "eyebuydirect.com",
    "eyeglasses.com",
    "fairmont.com",
    "fairyseason.com",
    "falke.com",
    "falkensteiner.com",
    "farah.co.uk",
    "farfetch.com",
    "fashionworld.co.uk",
    "fatface.com",
    "fhinds.co.uk",
    "fields.ie",
    "figleaves.com",
    "fila.co.uk",
    "finerylondon.com",
    "fitflop.co.uk",
    "fitflop.com",
    "flannels.com",
    "flannelsfashion.com",
    "footasylum.com",
    "footlocker.co.uk",
    "footlocker.com",
    "footpatrol.co.uk",
    "footpatrol.com",
    "footshop.eu",
    "forever21.com",
    "foreverunique.co.uk",
    "formandthread.com",
    "fortnumandmason.com",
    "forward-forward.com",
    "forwardbyelysewalker.com",
    "forwardforward.com",
    "forzieri.com",
    "framesdirect.com",
    "fraserhart.co.uk",
    "freepeople.cn",
    "freepeople.co.uk",
    "freepeople.com",
    "frenchconnection.com",
    "frescobolcarioca.com",
    "frhi.com",
    "frombabieswithlove.org",
    "fromtheboxoffice.com",
    "furla.com",
    "fwrd.com",
    "ganni.com",
    "gant.co.uk",
    "gap.co.uk",
    "gemondo.com",
    "gemporia.com",
    "getthelabel.com",
    "ghbass-eu.com",
    "ghost.co.uk",
    "giginewyork.com",
    "giglio.com",
    "ginabacconi.com",
    "girlmeetsdress.com",
    "giuseppezanottidesign.com",
    "glassesshop.com",
    "glenmuir.com",
    "goatfashion.com",
    "goddiva.co.uk",
    "goldsmiths.co.uk",
    "golfposer.com",
    "goodhoodstore.com",
    "gooutdoors.co.uk",
    "grailed.com",
    "graphicimage.com",
    "greatplains.co.uk",
    "gucci.com",
    "guess.com",
    "guess.eu",
    "gymshark.com",
    "gymwear.co.uk",
    "hampergifts.co.uk",
    "happysocks.com",
    "harrods.com",
    "harveynichols.com",
    "harvieandhudson.com",
    "hatchcollection.com",
    "hatley.com",
    "hats.com",
    "hawesandcurtis.co.uk",
    "hawkshead.com",
    "hbx.com",
    "heidiklein.com",
    "heist-studios.com",
    "hellyhansen.com",
    "hiddenfashion.com",
    "highlandfayre.co.uk",
    "hm.com",
    "hobbs.co.uk",
    "hobbs.com",
    "hopefashion.co.uk",
    "hotdiamonds.co.uk",
    "hotelduvin.com",
    "hotter.com",
    "hottershoes.com",
    "hottopic.com",
    "houseofbath.co.uk",
    "houseoffraser.co.uk",
    "hsamuel.co.uk",
    "hudsonshoes.com",
    "hugoboss.com",
    "hunkemoller.co.uk",
    "hunter-boot.com",
    "hunterboots.com",
    "hush-uk.com",
    "hypebeast.com",
    "iamfy.co",
    "ikrix.com",
    "inderwear.com",
    "indiajane.co.uk",
    "inov-8.com",
    "inthestyle.com",
    "iprint.com",
    "irisfashion.co.uk",
    "isabellaoliver.com",
    "isawitfirst.com",
    "italiadesigns.co.uk",
    "italist.com",
    "ivoryella.com",
    "izabel.com",
    "izabellondon.com",
    "jacamo.co.uk",
    "jackjones.com",
    "jaeger.co.uk",
    "jaminleather.com",
    "jcrew.com",
    "jdsports.co.uk",
    "jdwilliams.co.uk",
    "jeulia.com",
    "jigsaw-online.com",
    "jimmychoo.com",
    "jimmyjazz.com",
    "joebrowns.co.uk",
    "johngreedjewellery.com",
    "johnlewis.com",
    "joie.com",
    "jojomamanbebe.co.uk",
    "jomadeals.com",
    "jomashop.com",
    "joseph-fashion.com",
    "joseph.co.uk",
    "josephturner.co.uk",
    "joules.com",
    "joulesclothing.co.uk",
    "joulesclothing.com",
    "joythestore.com",
    "jurawatches.co.uk",
    "justsheepskin.com",
    "karl.com",
    "kateskates.co.uk",
    "katespade.co.uk",
    "kendrascott.com",
    "kidscavern.co.uk",
    "kingswilldream.com",
    "kipling.com",
    "kitbag.com",
    "kith.com",
    "kiwi.com",
    "knomo.com",
    "koifootwear.com",
    "kurtgeiger.com",
    "lacoquetakids.com",
    "landsend.co.uk",
    "laredoute.co.uk",
    "larssonjennings.com",
    "lasula.co.uk",
    "lauraashley.com",
    "lavishalice.com",
    "lechameau.com",
    "leialingerie.com",
    "lenstore.co.uk",
    "lentiamo.co.uk",
    "lesgirlslesboys.com",
    "libertylondon.com",
    "lilycharmed.com",
    "little-mistress.co.uk",
    "little-mistress.com",
    "littleblackdress.co.uk",
    "littlebluehouse.com",
    "lkbennett.com",
    "ln-cc.com",
    "lolarose.co.uk",
    "longtallsally.com",
    "loudclothing.com",
    "loudshop.com",
    "louisvuitton.com",
    "loungepass.com",
    "lovell-rugby.co.uk",
    "lovellsoccer.co.uk",
    "luckybrand.com",
    "luisaviaroma.com",
    "lululemon.co.uk",
    "lululemon.com",
    "lyleandscott.com",
    "lyst.co.uk",
    "lyst.com",
    "m.apricotonline.co.uk",
    "m.burton.co.uk",
    "m.destinology.co.uk",
    "m.fairmont.com",
    "m.vertbaudet.co.uk",
    "m.watchshop.com",
    "macinasac.com",
    "mackage.com",
    "madamrage.com",
    "madewithloveandsparkle.co.uk",
    "mainlinemenswear.co.uk",
    "mainlinemenswear.com",
    "maje.com",
    "mandco.com",
    "mandmdirect.com",
    "mango.com",
    "mankind.co.uk",
    "mappinandwebb.com",
    "marconfort.com",
    "marksandspencer.com",
    "martinic.com",
    "masdings.com",
    "massimodutti.com",
    "mastershoe-sportshoe.co.uk",
    "mastershoe.co.uk",
    "matalan.co.uk",
    "matchesfashion.com",
    "maxcleavage.com",
    "meandem.com",
    "melijoe.com",
    "melimelo.co.uk",
    "melimelo.com",
    "menkind.co.uk",
    "mennace.com",
    "merchandisingplaza.com",
    "merrell.com",
    "mfredric.com",
    "michaelkors.co.uk",
    "millets.co.uk",
    "milletsports.co.uk",
    "mintvelvet.co.uk",
    "missguided.co.uk",
    "missguided.com",
    "missguided.eu",
    "misspap.co.uk",
    "misspap.com",
    "missselfridge.com",
    "misterspex.co.uk",
    "mockberg.com",
    "modainpelle.com",
    "modaoperandi.com",
    "modes.com",
    "modesens.com",
    "monicavinader.com",
    "monki.com",
    "monnierfreres.co.uk",
    "monsoon.co.uk",
    "moosejaw.com",
    "moss.co.uk",
    "mossbroshire.co.uk",
    "mothercare.com",
    "mountainsteals.com",
    "mountainwarehouse.com",
    "mrandmrssmith.com",
    "mrkate.com",
    "mrp.com",
    "mrporter.com",
    "mulberry.com",
    "mummyandlittleme.co.uk",
    "murdocklondon.com",
    "museumselection.co.uk",
    "muubaa.com",
    "mvmtwatches.com",
    "my1styears.com",
    "mybag.com",
    "myoddballs.com",
    "mysphereoflife.com",
    "mytheresa.com",
    "nastygal.com",
    "naturalimagewigs.co.uk",
    "navabi.co.uk",
    "naylors.com",
    "needleandthread.com",
    "neimanmarcus.com",
    "net-a-porter.com",
    "neuaurashoes.com",
    "newbalance.co.uk",
    "neweracap.co.uk",
    "newlook.co.uk",
    "newlook.com",
    "next.co.uk",
    "nextdirect.com",
    "nickis.com",
    "nike.com",
    "ninewest.co.uk",
    "ninewest.com",
    "nisolo.com",
    "nobodyschild.com",
    "nonnon.co.uk",
    "nordgreen.co.uk",
    "norseprojects.com",
    "northshoes.co.uk",
    "notonthehighstreet.com",
    "npeal.com",
    "npeal.com/us",
    "oakley.com",
    "oasis-stores.co.uk",
    "oasis-stores.com",
    "obsessionart.co.uk",
    "obsessionart.com",
    "oddmolly.com",
    "odsdesignerclothing.com",
    "off---white.com",
    "office.co.uk",
    "offspring.co.uk",
    "ohpolly.com",
    "oipolloi.com",
    "oliverbonas.com",
    "omorovicza.co.uk",
    "omorovicza.com",
    "onepiece.co.uk",
    "onepiece.com",
    "onitsukatiger.com",
    "only.com",
    "opposuits.co.uk",
    "opticalexpress.co.uk",
    "opumo.com",
    "orchira.co.uk",
    "originalpenguin.co.uk",
    "originalpenguin.com",
    "orlebarbrown.com",
    "orvis.co.uk",
    "oshkosh.com",
    "ospreylondon.com",
    "outdoorgear.co.uk",
    "oxygenboutique.com",
    "oysho.com",
    "pagazzi.com",
    "pandahall.com",
    "pandora.net",
    "parkerclay.com",
    "pashminaboutique.com",
    "pauls-boutique.com",
    "paulsboutique.com",
    "paulsmith.co.uk",
    "paulsmith.com",
    "pavers.co.uk",
    "peacocks.co.uk",
    "pearlera.com",
    "pediwear.co.uk",
    "peopletree.co.uk",
    "pepejeans.com",
    "perryellis.com",
    "peruvianconnection.co.uk",
    "petalsnetwork.co.uk",
    "petit-bateau.co.uk",
    "piajewellery.co.uk",
    "piajewellery.com",
    "pikolinos.com",
    "pinkboutique.co.uk",
    "pinkclove.co.uk",
    "pixibeauty.com",
    "polarnopyret.co.uk",
    "poppyshop.org.uk",
    "preloved.co.uk",
    "premierman.co.uk",
    "premierman.com",
    "prettylittlething.com",
    "primark.com",
    "probikekit.co.uk",
    "probikekit.com",
    "prodirectcricket.com",
    "prodirectrunning.com",
    "prodirectselect.com",
    "prodirectsoccer.com",
    "promod.co.uk",
    "proviz.co.uk",
    "provizsports.com",
    "publicdesire.co.uk",
    "publicdesire.com",
    "pullandbear.com",
    "puma.com",
    "purecollection.com",
    "purelydiamonds.co.uk",
    "pv-holidays.com",
    "qpjewellers.com",
    "quayaustralia.com",
    "quiksilver.co.uk",
    "quizclothing.co.uk",
    "quotatis.co.uk",
    "radley.co.uk",
    "raeburndesign.co.uk",
    "rafaellasportswear.com",
    "raffaello-network.com",
    "rakuten.com",
    "ralphlauren.co.uk",
    "rapanuiclothing.com",
    "rawdenim.co.uk",
    "ray-ban.com",
    "rebeccaminkoff.com",
    "rebelliousfashion.co.uk",
    "redbubble.com",
    "reddressboutique.com",
    "reebok.co.uk",
    "regatta.com",
    "reiss.co.uk",
    "reiss.com",
    "reissonline.com",
    "revolve.com",
    "revolveclothing.com",
    "richmondfinch.com",
    "riverisland.com",
    "rixo.co.uk",
    "robeez.com",
    "robinsonsshoes.com",
    "rocketdog.co.uk",
    "rolandmouret.com",
    "romanoriginals.co.uk",
    "rosewe.com",
    "routeone.co.uk",
    "routeone.eu",
    "royalmintbullion.com",
    "rubbersole.co.uk",
    "rubynz.com",
    "safariquip.co.uk",
    "safetyglassesusa.com",
    "saksfifthavenue.com",
    "samueljohnston.com",
    "sandro-paris.com",
    "saucony.com",
    "savilerowco.co.uk",
    "savilerowco.com",
    "scandinaviandesigncenter.com",
    "scarlettandjo.com",
    "scarosso.com",
    "schuh.co.uk",
    "schuhstore.co.uk",
    "scotch-soda.com",
    "scottevest.com",
    "scottsmenswear.com",
    "scubastore.com",
    "selfridges.com",
    "seraphine.com",
    "sevenstore.com",
    "sezane.com",
    "shein.co.uk",
    "sheridanaustralia.co.uk",
    "shiningdiamonds.co.uk",
    "shoe-shop.com",
    "shoeaholics.com",
    "shoesinternational.co.uk",
    "shoesinternational.com",
    "shoezone.com",
    "shop.bestseller.com",
    "shop.helpforheroes.org.uk",
    "shop.tibi.com",
    "shop.tottenhamhotspur.com",
    "shop.wwe.com",
    "shopbop.com",
    "shopdisney.com",
    "shopstyle.co.uk",
    "shopstyle.com",
    "shoptagr.com",
    "shotdeadinthehead.com",
    "showpo.com",
    "sierra.com",
    "sierratradingpost.com",
    "simplybe.co.uk",
    "singer22.com",
    "size.co.uk",
    "skinnydiplondon.com",
    "skiphop.com",
    "smallable.com",
    "smartbuyglasses.co.uk",
    "smythson.com",
    "sneakersnstuff.com",
    "sockshop.co.uk",
    "soiakyo.com",
    "sosandar.com",
    "spartoo.co.uk",
    "speckyfoureyes.com",
    "speedo.com",
    "sportsdirect.com",
    "sportsshoes.com",
    "ssense.com",
    "startriteshoes.com",
    "stefaniamode.com",
    "stellamccartney.com",
    "stellar-girls.com",
    "stetson.eu",
    "stoneisland.co.uk",
    "stories.com",
    "strathberry.com",
    "stuartslondon.co.uk",
    "stuartslondon.com",
    "style369.com",
    "stylight.co.uk",
    "stylight.com",
    "suitdirect.co.uk",
    "superboleteria.com",
    "superdry.com",
    "superga.co.uk",
    "superjeweler.com",
    "svmoscow.com",
    "swarovski.com",
    "sweatybetty.com",
    "swedishhasbeens.com",
    "swimsuitsforall.com",
    "tailorstore.com",
    "tails.com",
    "tedbaker-london.com",
    "tedbaker.com",
    "teemill.co.uk",
    "temperleylondon.com",
    "tenave.com",
    "tessabit.com",
    "tessuti.co.uk",
    "teva.co.uk",
    "tfnclondon.com",
    "thbaker.co.uk",
    "the-dressingroom.com",
    "theclutcher.com",
    "thefashionbible.co.uk",
    "thefinejewellerycompany.com",
    "thehipstore.co.uk",
    "thehut.com",
    "theidleman.com",
    "theindependentpharmacy.co.uk",
    "thejewellerychannel.tv",
    "thenorthface.co.uk",
    "theory.com",
    "theoutnet.com",
    "thereformation.com",
    "thesolesupplier.co.uk",
    "thethirdestate.co.uk",
    "thetightspot.com",
    "thewatchhut.co.uk",
    "thewhitecompany.com",
    "thomassabo.com",
    "thompson-morgan.com",
    "threadless.com",
    "tibi.com",
    "tidebuy.com",
    "tiffanyrose.com",
    "tiffanyrosematernity.com",
    "timberland.co.uk",
    "timberlandonline.co.uk",
    "tjc.co.uk",
    "tkmaxx.com",
    "tmlewin.co.uk",
    "toffs.com",
    "tokyolaundry.com",
    "tommy.com",
    "tommyjohn.com",
    "toms.co.uk",
    "toms.com",
    "topman.com",
    "topshop.co.uk",
    "topshop.com",
    "topvintage.net",
    "torrid.com",
    "totes.co.uk",
    "toucanbox.com",
    "trekkinn.com",
    "trilogystores.co.uk",
    "triumph.com",
    "triwa.com",
    "trollbeads.com",
    "trouva.com",
    "trudiamonds.co.uk",
    "truffleshuffle.co.uk",
    "tuclothing.sainsburys.co.uk",
    "turnbullandasser.co.uk",
    "turtlebeach.com",
    "tvc-mall.com",
    "tvstoreonline.com",
    "ugg.com",
    "uggaustralia.co.uk",
    "uggaustralia.com",
    "uk.quiksilver-store.com",
    "uk.wwrd.com",
    "ukswimwear.com",
    "uktights.com",
    "ultimateoutdoors.com",
    "umbro.co.uk",
    "uniqlo.com",
    "universalworks.co.uk",
    "urbanexcess.com",
    "urbanindustry.co.uk",
    "urbanoutfitters.com",
    "usc.co.uk",
    "uterque.com",
    "vanmildert.com",
    "vans.co.uk",
    "vertbaudet.co.uk",
    "very.co.uk",
    "vessos.com",
    "vestiairecollective.com",
    "vestryonline.com",
    "victoriassecret.com",
    "vilebrequin.com",
    "vineyardvines.com",
    "vitkac.com",
    "viviennewestwood.co.uk",
    "viviennewestwood.com",
    "vivobarefoot.com",
    "walg.co.uk",
    "wallis-fashion.com",
    "wallis.co.uk",
    "warehouse.co.uk",
    "watches2u.com",
    "watchshop.co.uk",
    "watchshop.com",
    "waterford.co.uk",
    "wearethought.com",
    "webstore-nl.scotch-soda.com",
    "wedgwood.co.uk",
    "wedonothing.co.uk",
    "weekday.com",
    "weirdfish.co.uk",
    "wellgosh.com",
    "welovefrugi.com",
    "whistles.co.uk",
    "whistles.com",
    "whitestuff.com",
    "wiggle.co.uk",
    "wolfandbadger.com",
    "wolfordshop.co.uk",
    "woodhouseclothing.com",
    "woolovers.co.uk",
    "woolovers.com",
    "wweshop.com",
    "yesstyle.com",
    "yoins.com",
    "yolke.co.uk",
    "yoox.com",
    "youngbritishdesigners.com",
    "yoursclothing.co.uk",
    "yumi.co.uk",
    "zadig-et-voltaire.com",
    "zalando.co.uk",
    "zalando.com",
    "zara.com",
    "zimmermannwear.com",
    "zoggs.com",
]);


/***/ }),

/***/ 2160:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.whitelistLookup = whitelistLookup;
const whitelist_1 = __webpack_require__(4310);
function whitelistLookup(request, sendResponse, logReporter, firebaseLink) {
    var _a;
    sendResponse({
        success: true,
        debug_mode: logReporter.debugMode,
        in_whitelist: whitelist_1.whitelist.has(request.ms_site_key),
        auth_user_uid: (_a = firebaseLink.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid,
    });
}


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

/***/ 7569:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HarlinatorAPI = void 0;
const TabControl_1 = __importDefault(__webpack_require__(1409));
class HarlinatorAPI {
    static async getTabsContaining(text) {
        const tabs = await chrome.tabs.query({});
        return text !== false
            ? tabs.filter((t) => t.url && t.url.includes(text))
            : tabs;
    }
    // from external i.e. react app:
    // Ensure that this calls sendResponse so that the bg script is not kept waiting!
    async receiveApi(message, sendResponse) {
        var _a;
        switch (message.type) {
            case "check_ready":
                this.href = message.href;
                sendResponse({
                    ready: true,
                });
                return;
            case "open_page":
                TabControl_1.default.openPage(message.page_url, message.site_uid).then(() => sendResponse(true));
                return;
            case "open_page_array":
                TabControl_1.default.openPageArray(message.url_array, message.site_uid).then(() => sendResponse(true));
                return;
            case "close_site":
                TabControl_1.default.closeSite(message.site_uid).then(() => sendResponse(true));
                return;
            case "test_site":
                // Add the json file received to the react app:
                try {
                    const parsedJSON = JSON.parse(message.site_settings);
                    parsedJSON.test_date_code = message.test_date_code;
                    parsedJSON.test_colours = message.test_colours;
                    // SAVE parsed_json to a variable somewhere in the attached app:
                    this.siteUID = message.site_uid;
                    this.siteSettings = parsedJSON;
                    const relevantTabs = await HarlinatorAPI.getTabsContaining(message.site_uid);
                    // Now send the refresh request:
                    relevantTabs.forEach((tab) => {
                        tab.id &&
                            chrome.tabs.sendMessage(tab.id, {
                                action: "schedule_update",
                            });
                    });
                    sendResponse({
                        success: true,
                    });
                }
                catch (err) {
                    sendResponse({
                        success: false,
                        message: "Failed to parse site settings",
                    });
                }
                return;
            case "get_json":
                // Get meta data:
                try {
                    // First get the relevant tabs:
                    const relevantTabs = await HarlinatorAPI.getTabsContaining(false);
                    // Now send the refresh request:
                    relevantTabs.forEach((tab) => tab.id &&
                        chrome.tabs.sendMessage(tab.id, {
                            action: "get_meta_json",
                        }));
                    sendResponse({
                        success: true,
                    });
                }
                catch (err) {
                    console.log("Failed to get metadata", err);
                    sendResponse({
                        success: false,
                        message: "Failed to get metadata",
                    });
                }
                return;
            case "query_presets":
                // Try running the test queries:
                try {
                    const results = {};
                    const promiseArray = [];
                    message.urls.forEach((url) => {
                        promiseArray.push(new Promise((resolve) => {
                            HarlinatorAPI.getTabsContaining(url).then((relevantTabs) => {
                                // Now send the refresh request:
                                relevantTabs.forEach((tab) => tab.id &&
                                    chrome.tabs.sendMessage(tab.id, {
                                        action: "harlinator_queries",
                                        queries: message.queries,
                                        container_queries: message.container_queries,
                                    }, (response) => {
                                        results[url] = response;
                                        resolve();
                                    }));
                            });
                            // in case a page is non-responsive:
                            setTimeout(() => {
                                if (!results[url]) {
                                    results[url] = {};
                                }
                                resolve();
                            }, 1000);
                        }));
                    });
                    await Promise.all(promiseArray);
                    sendResponse(results);
                }
                catch (err) {
                    console.log("Failed to get run query presets", err);
                    sendResponse({
                        success: false,
                        message: "Failed to get run query presets",
                    });
                }
                return;
            case "get_html":
                // Try running the test queries:
                try {
                    const results = {};
                    const promiseArray = [];
                    const urlsOrSiteUID = (_a = message.urls) !== null && _a !== void 0 ? _a : [message.site_uid];
                    const setupPromises = urlsOrSiteUID.map(async (url) => {
                        const relevantTabs = await HarlinatorAPI.getTabsContaining(url);
                        // Now send the html request:
                        relevantTabs.forEach((tab) => {
                            const tabID = tab.id;
                            if (!tabID)
                                return;
                            promiseArray.push(new Promise((resolve) => {
                                chrome.tabs.sendMessage(tabID, {
                                    action: "harlinator_get_html",
                                }, (response) => {
                                    results[response.url] = response;
                                    resolve();
                                });
                                // in case a page is non-responsive:
                                setTimeout(() => {
                                    if (!results[url]) {
                                        results[url] = {};
                                    }
                                    resolve();
                                }, 1000);
                            }));
                        });
                    });
                    await Promise.all(setupPromises);
                    await Promise.all(promiseArray);
                    sendResponse(results);
                }
                catch (err) {
                    console.log("Failed to get run query presets", err);
                    sendResponse({
                        success: false,
                        message: "Failed to get run query presets",
                    });
                }
                return;
            case "get_open_site_urls":
                // get open tabs with site uid:
                const relevantTabs = await HarlinatorAPI.getTabsContaining(message.site_uid);
                // Now send the refresh request:
                const urlsToReturn = [];
                relevantTabs.forEach((tab) => tab.url && urlsToReturn.push(tab.url));
                sendResponse({
                    urls: urlsToReturn,
                });
                return;
            default:
        }
        return;
    }
    // From content scripts:
    exReceiveApi(message) {
        switch (message.action) {
            case "report_products":
            case "report_partial_products":
            case "report_meta":
                HarlinatorAPI.getTabsContaining("harlinatormain").then((harlinatorTabs) => {
                    harlinatorTabs.forEach((tab) => {
                        tab.id &&
                            chrome.tabs.sendMessage(tab.id, {
                                action: "harlinator",
                                message,
                            });
                    });
                });
                break;
            default:
        }
        return;
    }
}
exports.HarlinatorAPI = HarlinatorAPI;
exports["default"] = HarlinatorAPI;


/***/ }),

/***/ 1409:
/***/ ((__unused_webpack_module, exports) => {


/*

Static Module

This file has functions that Open and Close tabs for the harlinator:

Always open in same window as a page for "localhost:5555"

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
class TabControl {
    static getOpenWindowPromise(siteUID) {
        return new Promise((resolve) => {
            chrome.tabs.query({
                url: [`*://localhost/*`, `*://*.moonsift.com/*`],
            }, (resultLocalhost) => {
                resultLocalhost.forEach((tabInfo) => {
                    if (tabInfo.url && tabInfo.url.includes("harlinator_display")) {
                        resolve(tabInfo.windowId);
                    }
                });
                // find the one with this site uid:
                chrome.tabs.query({
                    url: `*://*.${siteUID}/*`,
                }, (resultSite) => {
                    resultSite.forEach((tabInfo) => {
                        resolve(tabInfo.windowId);
                    });
                    // new window:
                    resolve(false);
                });
            });
        });
    }
    static getOpenTabsPromise(siteUID) {
        return new Promise((resolve) => {
            chrome.tabs.query({
                url: `*://*.${siteUID}/*`,
            }, resolve);
        });
    }
    static openWindowPromise(url) {
        return new Promise((resolve) => {
            chrome.windows.create({
                url,
            }, resolve);
        });
    }
    static openTabPromise(url, windowID) {
        return new Promise((resolve) => {
            chrome.tabs.create({
                url,
                windowId: windowID,
                active: true,
            }, resolve);
        });
    }
    static closeTabPromise(tabIDs) {
        return new Promise((resolve) => {
            chrome.tabs.remove(tabIDs, resolve);
        });
    }
    // Open a site at a given page if not open yet:
    // May be called by API or by autogenerate when finding link pages and maybe called for other reasons...
    static async openPage(url, siteUID) {
        const windowID = await TabControl.getOpenWindowPromise(siteUID);
        if (windowID) {
            await TabControl.openTabPromise(url, windowID);
        }
        else {
            await TabControl.openWindowPromise(url);
        }
    }
    // Open all sites in a list (if not open yet):
    static async openPageArray(urlArray, siteUID) {
        const windowID = await TabControl.getOpenWindowPromise(siteUID);
        if (windowID) {
            await Promise.all(urlArray.map((url) => TabControl.openTabPromise(url, windowID)));
        }
        else {
            await Promise.all(urlArray.map((url) => TabControl.openWindowPromise(url)));
        }
    }
    // Close all pages for specific site domain:
    static async closeSite(siteUID) {
        const tabInfoArray = await TabControl.getOpenTabsPromise(siteUID);
        const toCloseIDs = tabInfoArray
            .map((tabInfo) => tabInfo.id)
            .filter((x) => x !== undefined);
        await TabControl.closeTabPromise(toCloseIDs);
    }
}
exports["default"] = TabControl;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [659], () => (__webpack_require__(9528)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + "background-firebase" + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			439: 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkextension"] = self["webpackChunkextension"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e(659).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;