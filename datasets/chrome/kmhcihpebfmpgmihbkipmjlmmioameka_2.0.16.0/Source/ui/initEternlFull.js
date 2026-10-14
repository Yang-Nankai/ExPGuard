import { eL as hexToBytea, bI as DEFAULT_ACCOUNT_ID, e as ref, eM as isBGMode, D as computed, eN as useBroadcastChannel, bG as error, G as watch, aE as addSignalListener, dq as doSendOpen, dF as doSendClose, eO as doSendUpdateNetworkId, ct as doSendUpdateWalletList, cE as doSendUpdateAccountData, eP as doSendUpdateDappAccountId, cA as doSendUpdatePendingTx, eQ as doSendUpdatePeerInfoList, eR as doSendUpdatePeerInfo, eS as doSendForcePeerDisconnect, eT as doSendForcePeerConnect, eU as doSendUpdateWalletConnectList, eV as getAppType, dE as BroadcastMsgType, eW as isValidBroadcastMsgType, ad as dispatchSignalSync, P as networkId, eX as useCoolify, eY as isProduction, aM as el, aN as sl, eZ as isOffscreenMode, e_ as onInterval4s, cx as onIntervalRapid, aX as json, cF as MIN_SYNC_EXEC_DELAY_SEC, e$ as MAX_SYNC_WORKERS, f0 as MAX_SYNC_WORKERS_OFFSCREEN, aj as api, f1 as getLastPoolUpdateTs, aF as removeSignalListener, dD as onInterval60s, aV as now, f2 as setLastPoolUpdateTs, f3 as onInterval8s, a$ as backendServer, f4 as setLastPriceOfDayUpdateTs, f5 as capitalize, aJ as toHexString, ch as prefix0x, am as Buffer$1, et as doBuildTxCollateral, de as onBuiltTxDelegation, df as doBuildTxDelegation, ew as onBuiltTxDeregistration, ex as doBuildTxDeregistration, eu as onBuiltTxDRepDeregistration, ev as doBuildTxDRepDeregistration, dh as doBuildTxCleanUpScam, b5 as doBuildTxWithdrawal, b9 as doBuildTxMultiSigReg, f6 as doBuildTxSwap, f7 as doBuildTxSwapCancel, eI as doBuildTxVoteReg, cR as onBuiltTxVoteDelegation, cS as doBuildTxVoteDelegation, aH as doBuildTxTF, aD as doBuildTxCU, f8 as doBuildTxMSCU, b6 as doBuildTxVoteGovActions, ao as doBuildTxSend, aA as doJustBuildTxSend, f9 as doJustSendBuiltTx, az as dispatchSignalSyncTo, fa as onTxBuiltError, es as onBuiltTxCollateral, dg as onBuiltTxCleanUpScam, b4 as onBuiltTxWithdrawal, b8 as onBuiltTxMultiSigReg, fb as onBuiltTxSwap, fc as onBuiltTxSwapCancel, cQ as onBuiltTxVoteReg, aG as onBuiltTxTF, aL as onBuiltTxSend, ay as doAddOutput, ax as doRemoveOutput, aw as doAddDonation, av as doRemoveDonation, ap as doToggleDonation, au as doAddAuxData, ak as doResetAllTx, aU as decodeHex, bp as Dexie, aC as dispatchSignal } from './index.js';
import { dl as onFocus, dk as doInitFirstWorker, e9 as doTerminateAllWorkers, ea as CHOSEN_VERSION, eb as WorkerError, T as AccountDB, ax as doInitApp, ec as doForcePauseSync, ed as doSyncAccount, dF as onAccountRemoved, ee as onRemoveAllAccountsFromSync, d8 as doReloadAccount, ef as SyncPriority, eg as checkNeedSync, eh as setSkipped, ei as updateUtxoLists, ej as setIdleManual, ek as setIdle, aa as onAccountDataUpdated, el as setQueued, em as isQueued, en as setSyncing, eo as updateIAccountDBDataIfNeeded, a8 as SyncState, ep as setSuccess, eq as onAccountNotificationUpdated, er as setError, es as onFocusLost, c1 as getIAppWallet, dQ as walletIdList, cZ as onWalletListUpdated, dd as dappWalletId, de as dappAccountId, et as __increaseDappAccountUpdated, eu as __switchRawDappWalletAccount, a as fixedDappWalletId, b as fixedDappAccountId, ev as __switchFixedDappWalletAccount, cV as isDAppSupported, bV as doRemovePendingTx, d2 as doUpdatePendingTxStatus, cc as doProcessSubmittedTxList, ew as _loadPendingTxList, ex as setSubmittedState, d$ as setSignedState, ey as fillInputUtxoList, ez as setInvalidState, e5 as updatePendingTxList, bN as isOnChainState, e1 as isExpiredState, e0 as setExpiredState, eA as setOnChainState, bO as isInvalidState, a4 as getUtxoHash, eB as loadUtxoCborFromUtxoHashes, a6 as getPendingTxList, V as getAddressCredentials, bI as getIAppAccountByCred, c3 as getFilteredUtxoList, cL as filterUtxoListByHashList, cC as sortInputListByScore, c4 as createTransactionOutputJSON, z as addValueToValue, eC as getUtxoCborSize, eD as filterUtxoListByHashOnlyList, eE as filterUtxosByMustIncludeTxHash, q as hasDonation, aC as getScriptState, eF as createDeregistrationCertificates, eG as createDRepDeregistrationCertificates, dW as minCollateral, E as ErrorBuildTx, eH as createDelegationCertificates, bX as getBurnAddress, X as getAssetIdBech32, cJ as splitTokenFragmentation, H as getMinUtxo, eI as PlutusList, cx as PlutusData, b8 as TransactionWitnessSet, O as cslToJson, s as safeFreeCSLObject, U as createValueJSON, bY as getSwapFeeAddressMS, c2 as getUtxoCborList, eJ as getCSLVkeywitnesses, eK as getCSLVkeywitness, b9 as Transaction, dz as createPubKey, dA as getCSLBip32PrivateKey, bA as getCSLBip32PublicKey, f as freeCSLObjects, eL as createVoteDelegationCertificates, dt as blake2b256Str, am as getNumAssets2, ay as getDRepCredentialsFromAddress, eM as getGovActionIdProposalHash, w as resetAllTx, eN as getNewBuildCounter, eO as handleBuildResult, h as calcAccountTxBalance, eP as createTx, eQ as updateBuildingTxList, eR as getBuildCounter, eS as addOutput, I as removeOutput, eT as addDonation, eU as removeDonation, eV as toggleDonation, eW as addAuxData, bn as doReloadWalletList, eX as reloadAccountData, eY as removeAccount, dG as doRemoveAccount, eZ as updateFavoriteAccountList, Q as onAccountSettingsUpdated, e_ as updateManualSyncForAllAccounts, e$ as doToggleManualSyncForAllAccounts, dV as loadWalletList, d7 as doForceSyncImportantAccounts, di as loadCSL, dj as doSetActiveApp, dh as doPostInitApp, cf as getCSLBigNum } from './app2.js';
import { l as loadCMS } from './cms.js';
import { s as setEternlInitPromise, g as getEternlInitPromise } from './guard.js';
import { f as getRequestData, A as ApiRequestType, E as ErrorSync, g as getRandomId, _ as __getSelectedWalletAccountId, R as __switchSelectedWalletAccount, o as onSwitchSelectedWalletAccount, i as doSwitchSelectedWalletAccount, s as selectedWalletId, h as selectedAccountId, y as doToggleFixedDappAccountId, S as onSelectedAccountIdSet, c as checkEpochParams, d as doUpdateAccountBalances, J as onAppAccountAddedToAppWallet } from './epochParams.js';
import { i as isSyncLeader } from './appState.js';
import './params.js';
import './currency.js';
import { b as appTimezone } from './language.js';
import { f as isSupportedNetworkId, n as networkIdList, h as getNetworkId, g as getNetworkDecimals } from './NetworkId.js';
import { af as doLoadPoolData, ag as PoolDataDB, ah as updatePoolData, ai as poolDataList, s as sleep, aj as endPoints, J as AssetDB, L as fetchAssetInfo, ak as resetSwapData$1, al as initSwapStore$1, am as getRootAddress, an as fetchCancelTxCBOR$1, y as getChangeAddress, K as addAllAssetInfoToMap } from './useAppAccountBalances.js';
import { j as getGovDRepList, k as doLoadDRepList, l as updateDRepList, d as dRepList, m as getGovProposalList } from './useSelectedAccount.js';
import { j as doLoadGovActionList, k as updateGovActionList, g as govActionList } from './govActionList.js';
import { a as getCalculatedChainTip, e as getDateIdFromTimestamp } from './chain.js';
import { c as compare, i as isZero, j as add, d as divide, p as pow, m as multiply } from './bigmath.js';
import './txHistory.js';
import { a as appCurrency } from './currency2.js';
import { d as doLoadPriceOfDay, i as isLoadingPriceOfDay, u as updatePriceOfDay } from './priceOfDay.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { b as buildTx, u as useBuildAccount } from './lib.js';
import { g as generateTxConfig } from './generateConfig.js';
import { u as useSignTx, g as getTransactionFromCbor, E as ErrorTxCbor } from './useSignTx.js';
import { u as useGuard } from './useGuards.js';
import { g as getTxMetadataFromStringArray } from './metadata.js';
import { a as getSignTxCredList } from './creds.js';
import { d as generateCIP36Metadata, e as generateCatalystRegistrationMetadata, a as addCatalystRegistrationSignature, b as generateCatalystRegistration } from './catalyst.js';
import { M as MilkomedaDB } from './MilkomedaDB.js';
import { a as addressCacheCleanup } from './address.js';
import { p as loadAddressBook } from './contractMapping.js';
import { d as setNotificationsDeleted, e as clearNotificationsDeleted, r as resetNotificationsDeleted, f as setNotificationsRead, l as loadNotifications, u as updateMultiSigNotification } from './notification2.js';
import { d as doSetNotificationDeleted, f as doRefreshNotifications, b as doResetNotificationDeleted, a as doSetNotificationRead, e as doShareMultiSigNotification } from './notification.js';
import './decryptedMsg.js';
import './chainTip.js';
import './useCurrencyAPI.js';
import './history.js';
import './useFormatter.js';
import './ErrorSignTx.js';
import './multisig.js';

const hasTxHashes = (networkId, accountId, txHashList) => {
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.hasTxHashes,
    ErrorSync.hasTxHashes,
    {
      id: accountId,
      txHashList: txHashList.map((hash) => hexToBytea(hash))
      // TODO: remove hexToBytea conversion, see rpcHasTxHashes_v4
    },
    async (data) => data.txHashList
  );
};
const checkSwapConfirmed = async (networkId, accountId, txHashList) => {
  const chunkSize = 1e3;
  const calls = [];
  for (let i = 0; i < txHashList.length + chunkSize; i += chunkSize) {
    const subArray = txHashList.slice(i, i + chunkSize);
    if (subArray.length > 0) {
      calls.push(checkSwapConfirmedChunk(networkId, accountId, subArray));
    }
  }
  const statusList = await Promise.all(calls);
  return statusList.flat();
};
const checkSwapConfirmedChunk = (networkId, accountId, txHashList) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.checkSwapConfirmed,
    ErrorSync.checkSwapConfirmed,
    {
      id: accountId,
      txHashList: txHashList.map((hash) => hexToBytea(hash))
    },
    async (data) => data.txHashList
  );
};

var broadcastchannelPolyfill = {};

var hasRequiredBroadcastchannelPolyfill;

function requireBroadcastchannelPolyfill () {
	if (hasRequiredBroadcastchannelPolyfill) return broadcastchannelPolyfill;
	hasRequiredBroadcastchannelPolyfill = 1;
	(function(global) {
	    var channels = [];

	    function BroadcastChannel(channel) {
	        var $this = this;
	        channel = String(channel);

	        var id = '$BroadcastChannel$' + channel + '$';

	        channels[id] = channels[id] || [];
	        channels[id].push(this);

	        this._name = channel;
	        this._id = id;
	        this._closed = false;
	        this._mc = new MessageChannel();
	        this._mc.port1.start();
	        this._mc.port2.start();

	        global.addEventListener('storage', function(e) {
	            if (e.storageArea !== global.localStorage) return;
	            if (e.newValue == null || e.newValue === '') return;
	            if (e.key.substring(0, id.length) !== id) return;
	            var data = JSON.parse(e.newValue);
	            $this._mc.port2.postMessage(data);
	        });
	    }

	    BroadcastChannel.prototype = {
	        // BroadcastChannel API
	        get name() {
	            return this._name;
	        },
	        postMessage: function(message) {
	            var $this = this;
	            if (this._closed) {
	                var e = new Error();
	                e.name = 'InvalidStateError';
	                throw e;
	            }
	            var value = JSON.stringify(message);

	            // Broadcast to other contexts via storage events...
	            var key = this._id + String(Date.now()) + '$' + String(Math.random());
	            global.localStorage.setItem(key, value);
	            setTimeout(function() {
	                global.localStorage.removeItem(key);
	            }, 500);

	            // Broadcast to current context via ports
	            channels[this._id].forEach(function(bc) {
	                if (bc === $this) return;
	                bc._mc.port2.postMessage(JSON.parse(value));
	            });
	        },
	        close: function() {
	            if (this._closed) return;
	            this._closed = true;
	            this._mc.port1.close();
	            this._mc.port2.close();

	            var index = channels[this._id].indexOf(this);
	            channels[this._id].splice(index, 1);
	        },

	        // EventTarget API
	        get onmessage() {
	            return this._mc.port1.onmessage;
	        },
	        set onmessage(value) {
	            this._mc.port1.onmessage = value;
	        },
	        addEventListener: function(/*type, listener , useCapture*/) {
	            return this._mc.port1.addEventListener.apply(this._mc.port1, arguments);
	        },
	        removeEventListener: function(/*type, listener , useCapture*/) {
	            return this._mc.port1.removeEventListener.apply(this._mc.port1, arguments);
	        },
	        dispatchEvent: function(/*event*/) {
	            return this._mc.port1.dispatchEvent.apply(this._mc.port1, arguments);
	        },
	    };

	    global.BroadcastChannel = global.BroadcastChannel || BroadcastChannel;
	})(self);
	return broadcastchannelPolyfill;
}

requireBroadcastchannelPolyfill();

const BroadcastError = {
  isNotSupported: "BroadcastError.isNotSupported",
  invalidMsgType: "BroadcastError.invalidMsgType"
};
const getDefaultErrorMessage = (err) => {
  switch (err) {
    case BroadcastError.isNotSupported:
      return "BroadcastError: BroadcastChannel not supported";
    case BroadcastError.invalidMsgType:
      return "BroadcastError: invalid message type";
  }
  return "BroadcastError: unknown: " + err;
};

const doLogVerbose$1 = false;
const storeId$n = "broadcastController";
const _canPost = ref(!isBGMode());
const canPost = computed(() => _canPost.value && !isBGMode());
const {
  data,
  post,
  isSupported
} = useBroadcastChannel({ name: "eternl-bc-" + getAppType() });
if (!isSupported.value) {
  error(getDefaultErrorMessage(BroadcastError.isNotSupported));
}
const setCanPost = (can) => {
  _canPost.value = can;
};
const onData = (msgType, data2) => {
  if (data2?.includes(",")) {
    dispatchSignalSync(msgType, ...data2.split(","));
  } else {
    dispatchSignalSync(msgType, data2);
  }
};
watch(data, (msg) => {
  if (msg) {
    const protocol = msg.split(":");
    if (protocol.length === 3) {
      const msgType = protocol[0];
      if (isValidBroadcastMsgType(msgType)) {
        onData(msgType, protocol[1]);
      }
    }
  }
});
const sendOpen = (appId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.open + ":" + appId + ":" + getRandomId());
};
const sendClose = (appId) => {
  post(BroadcastMsgType.close + ":" + appId + ":" + getRandomId());
};
const sendUpdateNetworkId = (networkId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateNetworkId + ":" + networkId + ":" + getRandomId());
};
const sendUpdateWalletList = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateWalletList + ":-:" + getRandomId());
};
const sendUpdateAccountData = (accountId, walletId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateAccountData + ":" + walletId + "," + accountId + ":" + getRandomId());
};
const sendUpdateDappAccountId = (walletId, accountId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateDappAccountId + ":" + walletId + "," + accountId + ":" + getRandomId());
};
const sendUpdatePendingTx = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updatePendingTx + ":-:" + getRandomId());
};
const sendUpdatePeerInfoList = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updatePeerInfoList + ":-:" + getRandomId());
};
const sendUpdatePeerInfo = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updatePeerInfo + ":-:" + getRandomId());
};
const sendForcePeerDisconnect = (dappId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.forcePeerDisconnect + ":" + dappId + ":");
};
const sendPeerConnect = (dappId) => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.forcePeerConnect + ":" + dappId + ":");
};
const sendUpdateWalletConnectList = () => {
  if (!canPost.value) {
    return;
  }
  post(BroadcastMsgType.updateWalletConnectList + ":-:" + getRandomId());
};
addSignalListener(onFocus, storeId$n, () => {
  setCanPost(true);
}, doLogVerbose$1);
addSignalListener(doSendOpen, storeId$n, sendOpen, doLogVerbose$1);
addSignalListener(doSendClose, storeId$n, sendClose, doLogVerbose$1);
addSignalListener(doSendUpdateNetworkId, storeId$n, sendUpdateNetworkId, doLogVerbose$1);
addSignalListener(doSendUpdateWalletList, storeId$n, sendUpdateWalletList, doLogVerbose$1);
addSignalListener(doSendUpdateAccountData, storeId$n, sendUpdateAccountData, doLogVerbose$1);
addSignalListener(doSendUpdateDappAccountId, storeId$n, sendUpdateDappAccountId, doLogVerbose$1);
addSignalListener(doSendUpdatePendingTx, storeId$n, sendUpdatePendingTx, doLogVerbose$1);
addSignalListener(doSendUpdatePeerInfoList, storeId$n, sendUpdatePeerInfoList, doLogVerbose$1);
addSignalListener(doSendUpdatePeerInfo, storeId$n, sendUpdatePeerInfo, doLogVerbose$1);
addSignalListener(doSendForcePeerDisconnect, storeId$n, sendForcePeerDisconnect, doLogVerbose$1);
addSignalListener(doSendForcePeerConnect, storeId$n, sendPeerConnect, doLogVerbose$1);
addSignalListener(doSendUpdateWalletConnectList, storeId$n, sendUpdateWalletConnectList, doLogVerbose$1);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const proxyMarker = Symbol("Comlink.proxy");
const createEndpoint = Symbol("Comlink.endpoint");
const releaseProxy = Symbol("Comlink.releaseProxy");
const finalizer = Symbol("Comlink.finalizer");
const throwMarker = Symbol("Comlink.thrown");
const isObject = (val) => (typeof val === "object" && val !== null) || typeof val === "function";
/**
 * Internal transfer handle to handle objects marked to proxy.
 */
const proxyTransferHandler = {
    canHandle: (val) => isObject(val) && val[proxyMarker],
    serialize(obj) {
        const { port1, port2 } = new MessageChannel();
        expose(obj, port1);
        return [port2, [port2]];
    },
    deserialize(port) {
        port.start();
        return wrap(port);
    },
};
/**
 * Internal transfer handler to handle thrown exceptions.
 */
const throwTransferHandler = {
    canHandle: (value) => isObject(value) && throwMarker in value,
    serialize({ value }) {
        let serialized;
        if (value instanceof Error) {
            serialized = {
                isError: true,
                value: {
                    message: value.message,
                    name: value.name,
                    stack: value.stack,
                },
            };
        }
        else {
            serialized = { isError: false, value };
        }
        return [serialized, []];
    },
    deserialize(serialized) {
        if (serialized.isError) {
            throw Object.assign(new Error(serialized.value.message), serialized.value);
        }
        throw serialized.value;
    },
};
/**
 * Allows customizing the serialization of certain values.
 */
const transferHandlers = new Map([
    ["proxy", proxyTransferHandler],
    ["throw", throwTransferHandler],
]);
function isAllowedOrigin(allowedOrigins, origin) {
    for (const allowedOrigin of allowedOrigins) {
        if (origin === allowedOrigin || allowedOrigin === "*") {
            return true;
        }
        if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
            return true;
        }
    }
    return false;
}
function expose(obj, ep = globalThis, allowedOrigins = ["*"]) {
    ep.addEventListener("message", function callback(ev) {
        if (!ev || !ev.data) {
            return;
        }
        if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
            console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
            return;
        }
        const { id, type, path } = Object.assign({ path: [] }, ev.data);
        const argumentList = (ev.data.argumentList || []).map(fromWireValue);
        let returnValue;
        try {
            const parent = path.slice(0, -1).reduce((obj, prop) => obj[prop], obj);
            const rawValue = path.reduce((obj, prop) => obj[prop], obj);
            switch (type) {
                case "GET" /* MessageType.GET */:
                    {
                        returnValue = rawValue;
                    }
                    break;
                case "SET" /* MessageType.SET */:
                    {
                        parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
                        returnValue = true;
                    }
                    break;
                case "APPLY" /* MessageType.APPLY */:
                    {
                        returnValue = rawValue.apply(parent, argumentList);
                    }
                    break;
                case "CONSTRUCT" /* MessageType.CONSTRUCT */:
                    {
                        const value = new rawValue(...argumentList);
                        returnValue = proxy(value);
                    }
                    break;
                case "ENDPOINT" /* MessageType.ENDPOINT */:
                    {
                        const { port1, port2 } = new MessageChannel();
                        expose(obj, port2);
                        returnValue = transfer(port1, [port1]);
                    }
                    break;
                case "RELEASE" /* MessageType.RELEASE */:
                    {
                        returnValue = undefined;
                    }
                    break;
                default:
                    return;
            }
        }
        catch (value) {
            returnValue = { value, [throwMarker]: 0 };
        }
        Promise.resolve(returnValue)
            .catch((value) => {
            return { value, [throwMarker]: 0 };
        })
            .then((returnValue) => {
            const [wireValue, transferables] = toWireValue(returnValue);
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
            if (type === "RELEASE" /* MessageType.RELEASE */) {
                // detach and deactive after sending release response above.
                ep.removeEventListener("message", callback);
                closeEndPoint(ep);
                if (finalizer in obj && typeof obj[finalizer] === "function") {
                    obj[finalizer]();
                }
            }
        })
            .catch((error) => {
            // Send Serialization Error To Caller
            const [wireValue, transferables] = toWireValue({
                value: new TypeError("Unserializable return value"),
                [throwMarker]: 0,
            });
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
        });
    });
    if (ep.start) {
        ep.start();
    }
}
function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function closeEndPoint(endpoint) {
    if (isMessagePort(endpoint))
        endpoint.close();
}
function wrap(ep, target) {
    const pendingListeners = new Map();
    ep.addEventListener("message", function handleMessage(ev) {
        const { data } = ev;
        if (!data || !data.id) {
            return;
        }
        const resolver = pendingListeners.get(data.id);
        if (!resolver) {
            return;
        }
        try {
            resolver(data);
        }
        finally {
            pendingListeners.delete(data.id);
        }
    });
    return createProxy(ep, pendingListeners, [], target);
}
function throwIfProxyReleased(isReleased) {
    if (isReleased) {
        throw new Error("Proxy has been released and is not useable");
    }
}
function releaseEndpoint(ep) {
    return requestResponseMessage(ep, new Map(), {
        type: "RELEASE" /* MessageType.RELEASE */,
    }).then(() => {
        closeEndPoint(ep);
    });
}
const proxyCounter = new WeakMap();
const proxyFinalizers = "FinalizationRegistry" in globalThis &&
    new FinalizationRegistry((ep) => {
        const newCount = (proxyCounter.get(ep) || 0) - 1;
        proxyCounter.set(ep, newCount);
        if (newCount === 0) {
            releaseEndpoint(ep);
        }
    });
function registerProxy(proxy, ep) {
    const newCount = (proxyCounter.get(ep) || 0) + 1;
    proxyCounter.set(ep, newCount);
    if (proxyFinalizers) {
        proxyFinalizers.register(proxy, ep, proxy);
    }
}
function unregisterProxy(proxy) {
    if (proxyFinalizers) {
        proxyFinalizers.unregister(proxy);
    }
}
function createProxy(ep, pendingListeners, path = [], target = function () { }) {
    let isProxyReleased = false;
    const proxy = new Proxy(target, {
        get(_target, prop) {
            throwIfProxyReleased(isProxyReleased);
            if (prop === releaseProxy) {
                return () => {
                    unregisterProxy(proxy);
                    releaseEndpoint(ep);
                    pendingListeners.clear();
                    isProxyReleased = true;
                };
            }
            if (prop === "then") {
                if (path.length === 0) {
                    return { then: () => proxy };
                }
                const r = requestResponseMessage(ep, pendingListeners, {
                    type: "GET" /* MessageType.GET */,
                    path: path.map((p) => p.toString()),
                }).then(fromWireValue);
                return r.then.bind(r);
            }
            return createProxy(ep, pendingListeners, [...path, prop]);
        },
        set(_target, prop, rawValue) {
            throwIfProxyReleased(isProxyReleased);
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            const [value, transferables] = toWireValue(rawValue);
            return requestResponseMessage(ep, pendingListeners, {
                type: "SET" /* MessageType.SET */,
                path: [...path, prop].map((p) => p.toString()),
                value,
            }, transferables).then(fromWireValue);
        },
        apply(_target, _thisArg, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const last = path[path.length - 1];
            if (last === createEndpoint) {
                return requestResponseMessage(ep, pendingListeners, {
                    type: "ENDPOINT" /* MessageType.ENDPOINT */,
                }).then(fromWireValue);
            }
            // We just pretend that `bind()` didn’t happen.
            if (last === "bind") {
                return createProxy(ep, pendingListeners, path.slice(0, -1));
            }
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, pendingListeners, {
                type: "APPLY" /* MessageType.APPLY */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
        construct(_target, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, pendingListeners, {
                type: "CONSTRUCT" /* MessageType.CONSTRUCT */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
    });
    registerProxy(proxy, ep);
    return proxy;
}
function myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
}
function processArguments(argumentList) {
    const processed = argumentList.map(toWireValue);
    return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
}
const transferCache = new WeakMap();
function transfer(obj, transfers) {
    transferCache.set(obj, transfers);
    return obj;
}
function proxy(obj) {
    return Object.assign(obj, { [proxyMarker]: true });
}
function toWireValue(value) {
    for (const [name, handler] of transferHandlers) {
        if (handler.canHandle(value)) {
            const [serializedValue, transferables] = handler.serialize(value);
            return [
                {
                    type: "HANDLER" /* WireValueType.HANDLER */,
                    name,
                    value: serializedValue,
                },
                transferables,
            ];
        }
    }
    return [
        {
            type: "RAW" /* WireValueType.RAW */,
            value,
        },
        transferCache.get(value) || [],
    ];
}
function fromWireValue(value) {
    switch (value.type) {
        case "HANDLER" /* WireValueType.HANDLER */:
            return transferHandlers.get(value.name).deserialize(value.value);
        case "RAW" /* WireValueType.RAW */:
            return value.value;
    }
}
function requestResponseMessage(ep, pendingListeners, msg, transfers) {
    return new Promise((resolve) => {
        const id = generateUUID();
        pendingListeners.set(id, resolve);
        if (ep.start) {
            ep.start();
        }
        ep.postMessage(Object.assign({ id }, msg), transfers);
    });
}
function generateUUID() {
    return new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
        .join("-");
}

const storeId$m = "workerManager";
const _rawWorkerList = [];
const _workerList = [];
const _workerStatus = [];
const hasNumWorkers = (numWorkers) => _rawWorkerList.length >= numWorkers;
const getWorker = (index) => _workerList[index];
const isRunning = (accountId) => _workerStatus.includes(accountId);
const resetWorkerStatus = (index) => {
  _workerStatus[index] = "free";
};
const getFreeWorkerIndex = (accountId) => {
  for (let i = 0; i < _workerStatus.length; i++) {
    if (_workerStatus[i] === "free") {
      _workerStatus[i] = accountId;
      return i;
    }
  }
  return -1;
};
const initWorkerList = async (numWorkers = 1) => {
  for (let i = 0; i < _workerList.length; i++) {
    const wrappedWorker = _workerList[i];
    wrappedWorker.initWorker(i, {
      prod: isProduction(),
      useCoolify: useCoolify(),
      cslVersion: CHOSEN_VERSION,
      networkId: networkId.value
    });
  }
  if (_rawWorkerList.length < numWorkers) {
    for (let i = _rawWorkerList.length; i < numWorkers; i++) {
      _rawWorkerList.push(new Worker(new URL(/* @vite-ignore */ "/assets/worker-DEpNofrg.js", import.meta.url), { type: "module" }));
    }
  }
  if (_workerList.length < _rawWorkerList.length) {
    const calls = [];
    const indexList = [];
    for (let i = _workerList.length; i < _rawWorkerList.length; i++) {
      try {
        const wrappedWorker = wrap(_rawWorkerList[i]);
        calls.push(
          wrappedWorker.initWorker(i, {
            prod: isProduction(),
            useCoolify: useCoolify(),
            cslVersion: CHOSEN_VERSION,
            networkId: networkId.value
          })
        );
        _workerList.push(wrappedWorker);
        _workerStatus.push("init");
        indexList.push(i);
      } catch (err) {
        error(WorkerError.initWorkerList, storeId$m, err);
        return false;
      }
    }
    if (calls.length > 0) {
      const resList = await Promise.all(calls);
      for (let i = 0; i < resList.length; i++) {
        if (resList[i]) {
          _workerStatus[indexList[i]] = "free";
        }
      }
    }
  }
  return true;
};
const initFirstWorker = () => {
  return initWorkerList(1);
};
const terminateAllWorkers = () => {
  for (let i = _workerStatus.length - 1; i >= 0; i--) {
    _workerStatus.splice(i, 1);
  }
  for (let i = _workerList.length - 1; i >= 0; i--) {
    _workerList.splice(i, 1);
  }
  for (let i = _rawWorkerList.length - 1; i >= 0; i--) {
    _rawWorkerList[i].terminate();
    _rawWorkerList.splice(i, 1);
  }
};
addSignalListener(doInitFirstWorker, storeId$m, initFirstWorker);
addSignalListener(doTerminateAllWorkers, storeId$m, terminateAllWorkers);

const doLog$5 = false;
let storeId$l = "loadAccountUtxos";
const _loadAccountUtxos = async (taskId, appAccount, doLog2) => {
  const networkId = appAccount.data.state.networkId;
  const accountId = appAccount.id;
  try {
    appAccount.data = await AccountDB.getAccountData(networkId, appAccount.data.account);
    const { utxoMap } = await AccountDB.getUtxoMap(appAccount);
    if (doLog2) ;
    if (!utxoMap) {
      throw ErrorSync.readUtxoMap;
    }
    appAccount.utxoMap = utxoMap;
    return appAccount;
  } catch (err) {
    throw err;
  }
};
const loadAccountUtxos = async (networkId, appAccount) => {
  try {
    const res = await _loadAccountUtxos(storeId$l, appAccount, doLog$5);
    if (doLog$5) ;
    return res;
  } catch (err) {
    console.error(storeId$l + ":", appAccount.id, err);
    throw err;
  }
};

const doLog$4 = false;
const storeId$k = "syncController";
const _appAccountSyncList = [];
const _priorityMap = /* @__PURE__ */ new Map();
let _forcePauseSync = false;
const forcePauseSync = (force) => {
  _forcePauseSync = force;
};
const scheduleSync = (appAccount, priority) => {
  _priorityMap.set(appAccount.id, priority);
  const index = _appAccountSyncList.findIndex((item) => item.id === appAccount.id);
  if (priority === SyncPriority.high || priority === SyncPriority.force) {
    if (index > 0) {
      _appAccountSyncList.splice(index, 1);
      _appAccountSyncList.unshift(appAccount);
    } else if (index === -1) {
      _appAccountSyncList.unshift(appAccount);
    }
    checkNeedSync(appAccount, true, true, priority === SyncPriority.force);
    return true;
  } else if (priority === SyncPriority.medium) {
    if (index >= 0) {
      _appAccountSyncList.splice(index, 1);
    }
    _appAccountSyncList.splice(1, 0, appAccount);
    checkNeedSync(appAccount, true, true);
  } else if (index === -1) {
    _appAccountSyncList.push(appAccount);
  }
  return true;
};
const syncAppAccount = async (appAccount, workerIndex, onlyLoadUtxos) => {
  const worker = getWorker(workerIndex);
  try {
    appAccount.hasNewNotifications = false;
    let appAccountCopy;
    if (appAccount.data.settings.manualSync.enabled && appAccount.data.keys.payment.length === 0) {
      appAccountCopy = await worker.atLeastInitAccount(appAccount.data.state.networkId, json(appAccount), isOffscreenMode());
    } else {
      appAccountCopy = onlyLoadUtxos ? await worker.loadAccountUtxos(appAccount.data.state.networkId, json(appAccount)) : await worker.syncAccount(appAccount.data.state.networkId, json(appAccount), isOffscreenMode());
    }
    appAccount.hasNewNotifications = appAccountCopy.hasNewNotifications;
    updateIAccountDBDataIfNeeded(appAccount.data, appAccountCopy.data);
    if (doLog$4) ;
    if (appAccountCopy.syncInfo.state === SyncState.skipped) {
      setSkipped(appAccount);
    } else {
      const utxoMap = appAccount.utxoMap;
      appAccount.utxoMap = appAccountCopy.utxoMap;
      if (appAccountCopy.syncInfo.lastRewardSync > 0) {
        appAccount.syncInfo.lastRewardSync = appAccountCopy.syncInfo.lastRewardSync;
      }
      utxoMap.allOpk.length = 0;
      utxoMap.opk.length = 0;
      utxoMap.opkosk.length = 0;
      utxoMap.opkesk.length = 0;
      utxoMap.epkosk.length = 0;
      if (onlyLoadUtxos) {
        if (appAccount.data.settings.manualSync.enabled) {
          setIdleManual(appAccount);
        } else {
          setIdle(appAccount, MIN_SYNC_EXEC_DELAY_SEC * 1e3);
        }
      } else {
        setSuccess(appAccount);
      }
      updateUtxoLists(appAccount);
      dispatchSignalSync(onAccountDataUpdated, appAccount, true);
    }
    if (appAccount.hasNewNotifications) {
      dispatchSignalSync(onAccountNotificationUpdated, appAccount, true);
    }
    resetWorkerStatus(workerIndex);
  } catch (err) {
    console.error(err);
    if (appAccount.syncInfo.isInitializing) {
      return syncAppAccount(appAccount, workerIndex, true);
    } else {
      setError(appAccount, { error: err, info: err });
      resetWorkerStatus(workerIndex);
    }
  }
};
const reloadAppAccount = async (appAccount) => {
  try {
    await loadAccountUtxos(appAccount.data.state.networkId, appAccount);
    updateUtxoLists(appAccount);
    if (doLog$4) ;
    if (appAccount.data.settings.manualSync.enabled) {
      setIdleManual(appAccount);
    } else {
      setIdle(appAccount, MIN_SYNC_EXEC_DELAY_SEC * 1e3);
    }
    dispatchSignalSync(onAccountDataUpdated, appAccount, false);
  } catch (err) {
    console.error(err);
  }
};
const removeAppAccountFromSyncList = (walletId, accountId, removed) => {
  if (!removed) {
    return;
  }
  const index = _appAccountSyncList.findIndex((item) => item.id === accountId);
  if (index === -1) {
    return;
  }
  const accountList = _appAccountSyncList.splice(index, 1);
  for (const appAccount of accountList) {
    setSkipped(appAccount);
  }
};
const removeAllAppAccountFromSyncList = () => {
  const accountList = _appAccountSyncList.splice(0, _appAccountSyncList.length);
  for (const appAccount of accountList) {
    setSkipped(appAccount);
  }
};
const syncAppAccounts = async () => {
  if (!isSyncLeader() || _forcePauseSync) {
    return;
  }
  if (!hasNumWorkers(MAX_SYNC_WORKERS)) {
    const numWanted = Math.min(_appAccountSyncList.length + 1, MAX_SYNC_WORKERS);
    if (!hasNumWorkers(numWanted)) {
      await initWorkerList(numWanted);
    }
  }
  const removeAccountList = [];
  for (const appAccount of _appAccountSyncList) {
    const priority = _priorityMap.get(appAccount.id) ?? SyncPriority.low;
    const forceSync = appAccount.data.settings.manualSync.enabled && priority === SyncPriority.high || appAccount.data.settings.manualSync.enabled && priority === SyncPriority.medium && appAccount.syncInfo.isInitializing;
    const doesNeedSync = forceSync || checkNeedSync(appAccount);
    if (!doesNeedSync) {
      if (appAccount.data.settings.manualSync.enabled) {
        removeAccountList.push(appAccount);
      }
      continue;
    }
    if (isRunning(appAccount.id)) {
      continue;
    }
    const workerIndex = getFreeWorkerIndex(appAccount.id);
    if (workerIndex === -1) {
      continue;
    }
    if (appAccount.data.settings.manualSync.enabled && priority === SyncPriority.high) {
      setQueued(appAccount);
    }
    if (isQueued(appAccount)) {
      setSyncing(appAccount);
    }
    syncAppAccount(
      appAccount,
      workerIndex,
      appAccount.data.settings.manualSync.enabled && priority !== SyncPriority.high && priority !== SyncPriority.force
    );
    if (appAccount.data.settings.manualSync.enabled) {
      removeAccountList.push(appAccount);
    }
  }
  for (const appAccount of removeAccountList) {
    removeAppAccountFromSyncList(appAccount.walletId, appAccount.id, true);
  }
  removeAccountList.length = 0;
};
const syncAppAccounts2 = async () => {
  if (!isSyncLeader() || _forcePauseSync) {
    removeAllAppAccountFromSyncList();
    terminateAllWorkers();
    return;
  }
  if (!hasNumWorkers(MAX_SYNC_WORKERS_OFFSCREEN)) {
    const numWanted = Math.min(_appAccountSyncList.length + 1, MAX_SYNC_WORKERS_OFFSCREEN);
    if (!hasNumWorkers(numWanted)) {
      await initWorkerList(numWanted);
    }
  }
  for (const appAccount of _appAccountSyncList) {
    if (!appAccount.isDappAccount) {
      continue;
    }
    const priority = _priorityMap.get(appAccount.id) ?? SyncPriority.low;
    const doesNeedSync = checkNeedSync(appAccount, false, true);
    if (!doesNeedSync) {
      continue;
    }
    if (isRunning(appAccount.id)) {
      continue;
    }
    const workerIndex = getFreeWorkerIndex(appAccount.id);
    if (workerIndex === -1) {
      break;
    }
    if (appAccount.data.settings.manualSync.enabled && priority === SyncPriority.high) {
      setQueued(appAccount);
    }
    if (isQueued(appAccount)) {
      setSyncing(appAccount);
    }
    syncAppAccount(
      appAccount,
      workerIndex,
      appAccount.data.settings.manualSync.enabled && priority !== SyncPriority.high && priority !== SyncPriority.force
    );
  }
};
const load$b = async () => {
  addSignalListener(doForcePauseSync, storeId$k, forcePauseSync);
  addSignalListener(doSyncAccount, storeId$k, scheduleSync);
  addSignalListener(onAccountRemoved, storeId$k, removeAppAccountFromSyncList);
  addSignalListener(onRemoveAllAccountsFromSync, storeId$k, removeAllAppAccountFromSyncList);
  addSignalListener(doReloadAccount, storeId$k, reloadAppAccount);
  if (isOffscreenMode()) {
    addSignalListener(onInterval4s, storeId$k, syncAppAccounts2);
  } else {
    addSignalListener(onIntervalRapid, storeId$k, syncAppAccounts);
  }
};
addSignalListener(doInitApp, storeId$k, load$b);

const _onFocus = () => {
  dispatchSignalSync(onFocus);
};
const _onFocusLost = () => {
  dispatchSignalSync(onFocusLost);
};
const init = () => {
  const isSupported = typeof window !== "undefined";
  if (!isSupported) {
    return;
  }
  window.addEventListener("focus", _onFocus);
  window.addEventListener("blur-sm", _onFocusLost);
};
init();

const storeId$j = "selectedAccountController";
addSignalListener(doSwitchSelectedWalletAccount, storeId$j, (walletId, accountId) => {
  if (!accountId) {
    accountId = __getSelectedWalletAccountId(walletId);
  }
  if (!accountId) {
    const appWallet = getIAppWallet(walletId);
    if (appWallet && appWallet.data.wallet.accountList.length > 0) {
      accountId = appWallet.data.wallet.accountList[0].id;
    }
  }
  __switchSelectedWalletAccount(walletId, accountId ?? "");
  dispatchSignalSync(onSwitchSelectedWalletAccount, walletId, accountId ?? "");
});
addSignalListener(onWalletListUpdated, storeId$j, () => {
  if (walletIdList.value.length === 0 && !selectedWalletId.value) {
    __switchSelectedWalletAccount("", "");
    dispatchSignalSync(onSwitchSelectedWalletAccount, "", "");
    return;
  } else if (walletIdList.value.length > 0 && (selectedWalletId.value && !walletIdList.value.includes(selectedWalletId.value) || !selectedWalletId.value)) {
    const walletId = walletIdList.value[0];
    const appWallet = getIAppWallet(walletId);
    if (appWallet && appWallet.data.wallet.accountList.length > 0) {
      const accountId = appWallet.data.wallet.accountList[0].id;
      __switchSelectedWalletAccount(walletId, accountId);
      dispatchSignalSync(onSwitchSelectedWalletAccount, walletId, accountId);
    }
  } else if (selectedWalletId.value && !selectedAccountId.value) {
    const appWallet = getIAppWallet(selectedWalletId.value);
    if (appWallet && appWallet.data.wallet.accountList.length > 0) {
      const accountId = appWallet.data.wallet.accountList[0].id;
      __switchSelectedWalletAccount(selectedWalletId.value, accountId);
      dispatchSignalSync(onSwitchSelectedWalletAccount, selectedWalletId.value, accountId);
    }
  } else if (walletIdList.value.length === 0) {
    __switchSelectedWalletAccount("", "");
    dispatchSignalSync(onSwitchSelectedWalletAccount, "", "");
    return;
  }
});

const storeId$i = "dappAccountController";
let _lastSelectedWalletId = "";
let _lastSelectedAccountId = "";
const allowedDappAccount = (walletId, accountId) => {
  const appWallet = getIAppWallet(walletId);
  if (!appWallet) {
    return false;
  }
  if (!isDAppSupported(appWallet.data.wallet.signType)) {
    return false;
  }
  return true;
};
const switchDappWalletAccount = (walletId, accountId) => {
  if (allowedDappAccount(walletId)) {
    _lastSelectedWalletId = walletId;
    _lastSelectedAccountId = accountId;
  }
  __switchRawDappWalletAccount(_lastSelectedWalletId, _lastSelectedAccountId);
  __increaseDappAccountUpdated();
};
const switchFixedDappWalletAccount = (walletId, accountId) => {
  if (walletId === "" && accountId === "" || fixedDappWalletId.value === walletId && fixedDappAccountId.value === accountId || !allowedDappAccount(walletId)) {
    __switchFixedDappWalletAccount("", "");
    __switchRawDappWalletAccount(_lastSelectedWalletId, _lastSelectedAccountId);
  } else {
    __switchFixedDappWalletAccount(walletId, accountId);
  }
  __increaseDappAccountUpdated();
};
addSignalListener(onSwitchSelectedWalletAccount, storeId$i, (selectedWalletId, selectedAccountId) => {
  switchDappWalletAccount(selectedWalletId, selectedAccountId);
});
addSignalListener(doToggleFixedDappAccountId, storeId$i, (walletId, accountId) => {
  switchFixedDappWalletAccount(walletId, accountId);
});
addSignalListener(onAccountDataUpdated, storeId$i, (appAccount) => {
  if (appAccount.walletId === dappWalletId.value && appAccount.id === dappAccountId.value) {
    __increaseDappAccountUpdated();
  }
});

const storeId$h = "poolDataAPI";
const pullPoolData = async (networkId) => {
  if (!isSupportedNetworkId(networkId)) {
    throw new Error("Error: pullPoolData: network not supported: " + networkId);
  }
  const url = "/" + networkId + "/v1/pool/list";
  const res = await api.get(url).catch((err) => {
    console.error(el(storeId$h), el("pullPoolData"), json(err));
  });
  if (res) {
    return res.data?.poolList ?? [];
  }
  return [];
};

const doLog$3 = false;
const storeId$g = "poolDataController";
let _lastUpdateMap = networkIdList.reduce((o, n) => {
  o[n] = getLastPoolUpdateTs(n);
  return o;
}, {});
const loadPoolData = async () => {
  removeSignalListener(onInterval60s, storeId$g);
  if (now() > parseInt(_lastUpdateMap[networkId.value].value ?? "0") + 15 * 60 * 1e3) {
    try {
      const list = await pullPoolData(networkId.value);
      if (doLog$3) ;
      await PoolDataDB.bulkPutPoolData(networkId.value, list);
      await updatePoolData();
      const date = now();
      setLastPoolUpdateTs(networkId.value, date);
      _lastUpdateMap[networkId.value].value = date + "";
      if (doLog$3) ;
    } catch (err) {
      addSignalListener(onInterval60s, storeId$g, loadPoolData);
    }
  }
  return true;
};
const load$a = () => {
  return loadPoolData();
};
addSignalListener(doLoadPoolData, storeId$g, load$a);

const pullDRepList = async (networkId) => {
  if (!isSupportedNetworkId(networkId)) {
    throw new Error("Error: pullDRepList: network not supported: " + networkId);
  }
  const res = await getGovDRepList(networkId, null);
  if (res) {
    return res;
  }
  return null;
};

const doLog$2 = false;
const storeId$f = "dRepListController";
const loadDRepList = async () => {
  removeSignalListener(onInterval60s, storeId$f);
  try {
    const list = await pullDRepList(networkId.value);
    if (doLog$2) ;
    await updateDRepList(list);
    const date = now();
    setLastPoolUpdateTs(networkId.value, date);
    if (doLog$2) ;
  } catch (err) {
    addSignalListener(onInterval60s, storeId$f, loadDRepList);
  }
  return true;
};
const load$9 = () => {
  return loadDRepList();
};
addSignalListener(doLoadDRepList, storeId$f, load$9);

const pullGovActionList = async (networkId) => {
  if (!isSupportedNetworkId(networkId)) {
    throw new Error("Error: pullGovActionList: network not supported: " + networkId);
  }
  const res = await getGovProposalList(networkId, null);
  if (res) {
    return res;
  }
  return null;
};

const doLog$1 = false;
const storeId$e = "govActionListController";
const loadGovActionList = async () => {
  removeSignalListener(onInterval60s, storeId$e);
  try {
    const list = await pullGovActionList(networkId.value);
    if (doLog$1) ;
    await updateGovActionList(list);
    const date = now();
    setLastPoolUpdateTs(networkId.value, date);
    if (doLog$1) ;
  } catch (err) {
    addSignalListener(onInterval60s, storeId$e, loadGovActionList);
  }
  return true;
};
const load$8 = () => {
  return loadGovActionList();
};
addSignalListener(doLoadGovActionList, storeId$e, load$8);

const doLogUpdate = false;
const storeId$d = "pendingTxController";
const finalCheckMap = /* @__PURE__ */ new Map();
let _running = false;
const _toBeRemovedList = [];
const getIAppAccountByAddress = (address) => {
  const { paymentCred } = getAddressCredentials(address);
  if (paymentCred) {
    const appAccount = getIAppAccountByCred(paymentCred);
    if (appAccount) {
      return appAccount;
    }
  }
  return null;
};
const triggerUpdateOnOwnAccounts = (tx) => {
  const accountsToUpdate = [];
  for (const output of tx.body.outputs) {
    const appAccount = getIAppAccountByAddress(output.address);
    if (appAccount && !accountsToUpdate.some((a) => a.id === appAccount.id)) {
      accountsToUpdate.push(appAccount);
    }
  }
  for (const inputUtxo of tx.inputUtxoList ?? []) {
    const appAccount = getIAppAccountByAddress(inputUtxo.output.address);
    if (appAccount && !accountsToUpdate.some((a) => a.id === appAccount.id)) {
      accountsToUpdate.push(appAccount);
    }
  }
  for (const appAccount of accountsToUpdate) {
    dispatchSignalSync(doSyncAccount, appAccount, SyncPriority.high);
  }
};
const _updatePendingTxStatus = async (okList = [], failedList = [], forceButDontBroadcast = false) => {
  if (_running) {
    if (forceButDontBroadcast || okList || failedList) {
      while (_running) {
        await sleep(10);
      }
    } else {
      return;
    }
  }
  let pendingTxList = await _loadPendingTxList();
  let statusChanged = false;
  for (let i = okList.length - 1; i >= 0; i--) {
    const tx = pendingTxList.find((_tx) => _tx.hash === okList[i].hash);
    if (tx) {
      setSubmittedState(tx);
      okList.splice(i, 1);
      statusChanged = true;
    }
  }
  const calls = [];
  for (const tx of okList) {
    setSignedState(tx);
    setSubmittedState(tx);
    const allKnownPendingOutputs = [];
    for (const tx2 of pendingTxList) {
      if (tx2.inputUtxoList) {
        allKnownPendingOutputs.push(...tx2.inputUtxoList);
      }
    }
    calls.push(fillInputUtxoList(networkId.value, tx, allKnownPendingOutputs));
    pendingTxList.push(tx);
    statusChanged = true;
  }
  for (let i = failedList.length - 1; i >= 0; i--) {
    const tx = pendingTxList.find((_tx) => _tx.hash === failedList[i].hash);
    if (tx) {
      setSubmittedState(tx);
      setInvalidState(tx);
      failedList.splice(i, 1);
      statusChanged = true;
    }
  }
  if (calls.length > 0) {
    await Promise.all(calls);
  }
  if (!isSyncLeader()) {
    if (forceButDontBroadcast || statusChanged || _toBeRemovedList.length > 0) {
      await updatePendingTxList(pendingTxList, _toBeRemovedList, forceButDontBroadcast);
      _toBeRemovedList.length = 0;
    }
    return;
  }
  if (_running) {
    return;
  }
  _running = true;
  try {
    if (pendingTxList.length === 0) {
      _running = false;
      return;
    }
    const accountId = DEFAULT_ACCOUNT_ID;
    const pendingTxHashList = pendingTxList.map((tx) => tx.hash);
    if (doLogUpdate) ;
    const resTxHashes = await hasTxHashes(networkId.value, accountId, pendingTxHashList);
    if (doLogUpdate) ;
    const finalCheckKeys = finalCheckMap.keys();
    if (doLogUpdate) ;
    for (const hash of finalCheckKeys) {
      if (!pendingTxHashList.includes(hash) || resTxHashes?.includes(hash)) {
        finalCheckMap.delete(hash);
      }
    }
    if (doLogUpdate) ;
    const inputHashList = [];
    for (const pendingTx of pendingTxList) {
      const ttl = parseInt(pendingTx.body.ttl ?? "0");
      if (!isOnChainState(pendingTx.state) && !isExpiredState(pendingTx.state)) {
        const expired = ttl > 0 && ttl - getCalculatedChainTip(networkId.value) <= 0;
        setExpiredState(pendingTx, expired);
        if (expired) {
          statusChanged = true;
        }
      }
      if (resTxHashes?.includes(pendingTx.hash)) {
        if (!isOnChainState(pendingTx.state)) {
          if (doLogUpdate) ;
          setOnChainState(pendingTx);
          setInvalidState(pendingTx, false);
          setExpiredState(pendingTx, false);
          triggerUpdateOnOwnAccounts(pendingTx);
          statusChanged = true;
        }
      } else if (isInvalidState(pendingTx.state) || isExpiredState(pendingTx.state) || isOnChainState(pendingTx.state)) {
      } else {
        const _inputHashList = pendingTx.body.inputs.map((input) => getUtxoHash(input));
        inputHashList.push(..._inputHashList);
      }
      if (isInvalidState(pendingTx.state) || isExpiredState(pendingTx.state) || isOnChainState(pendingTx.state)) {
        continue;
      }
      if (doLogUpdate) ;
    }
    let resUtxos = null;
    if (inputHashList.length > 0) {
      if (doLogUpdate) ;
      resUtxos = await loadUtxoCborFromUtxoHashes(networkId.value, accountId, inputHashList);
      if (doLogUpdate) ;
    }
    for (const pendingTx of pendingTxList) {
      if (isInvalidState(pendingTx.state) || isExpiredState(pendingTx.state) || isOnChainState(pendingTx.state)) {
        continue;
      }
      let numUnspentInputs = 0;
      for (const input of pendingTx.body.inputs) {
        const utxoCbor = resUtxos?.find((utxo) => getUtxoHash(input) === utxo.hash);
        if (doLogUpdate) ;
        if (utxoCbor) {
          numUnspentInputs++;
        } else {
          let wasSpent = false;
          for (const _tx of pendingTxList) {
            if (_tx.hash === pendingTx.hash) {
              continue;
            }
            if (isOnChainState(_tx.state)) {
              if (_tx.body.inputs.some((_input) => getUtxoHash(_input) === getUtxoHash(input))) {
                wasSpent = true;
                break;
              }
            }
          }
          if (wasSpent) {
            setInvalidState(pendingTx);
            statusChanged = true;
          }
          if (!wasSpent && pendingTxList.find((tx) => tx.hash === input.transaction_id)) {
            numUnspentInputs++;
          }
        }
      }
      if (doLogUpdate) ;
      if (numUnspentInputs === pendingTx.body.inputs.length) {
      } else if (numUnspentInputs > 0 && numUnspentInputs !== pendingTx.body.inputs.length) {
        setInvalidState(pendingTx, true);
        statusChanged = true;
      } else {
        const timestamp = finalCheckMap.get(pendingTx.hash) ?? 0;
        if (timestamp === 0) {
          finalCheckMap.set(pendingTx.hash, Date.now());
        } else if (Date.now() - timestamp > 22e3) {
          if (doLogUpdate) ;
          setInvalidState(pendingTx, true);
          statusChanged = true;
        }
      }
    }
    if (forceButDontBroadcast || statusChanged || _toBeRemovedList.length > 0) {
      await updatePendingTxList(pendingTxList, _toBeRemovedList, forceButDontBroadcast);
      _toBeRemovedList.length = 0;
    }
  } catch (err) {
    console.error(err);
  }
  _running = false;
};
const markPendingTxAsDeletable = async (appAccount) => {
  const pendingTxList = getPendingTxList(true).value;
  if (pendingTxList.length === 0) {
    return;
  }
  const txHashList = await AccountDB.getTxHashKeyList(appAccount.data.state.networkId, appAccount.id, pendingTxList.map((tx) => tx.hash));
  for (const pendingTx of pendingTxList) {
    if (txHashList.includes(pendingTx.hash)) {
      if (!_toBeRemovedList.includes(pendingTx.hash)) {
        _toBeRemovedList.push(pendingTx.hash);
      }
    }
  }
  if (_toBeRemovedList.length > 0) {
    return _updatePendingTxStatus();
  }
};
addSignalListener(doRemovePendingTx, storeId$d, async (txHash) => {
  if (!_toBeRemovedList.includes(txHash)) {
    _toBeRemovedList.push(txHash);
  }
  return _updatePendingTxStatus();
});
addSignalListener(doUpdatePendingTxStatus, storeId$d, (txHash) => {
  return _updatePendingTxStatus();
});
addSignalListener(onAccountDataUpdated, storeId$d, (_appAccount) => {
  return markPendingTxAsDeletable(_appAccount);
});
addSignalListener(doProcessSubmittedTxList, storeId$d, (okList, failedList) => {
  return _updatePendingTxStatus(okList, failedList);
});
addSignalListener(BroadcastMsgType.updatePendingTx, storeId$d, () => {
  return _updatePendingTxStatus(void 0, void 0, true);
});
const load$7 = () => {
  addSignalListener(onInterval8s, storeId$d, _updatePendingTxStatus);
};
addSignalListener(doInitApp, storeId$d, load$7);

const lastOrderUpdate = ref(0);
const isFetchingOrders = ref(false);
const openOrderList = ref([]);
const resetSwapStore = () => {
  lastOrderUpdate.value = 0;
  isFetchingOrders.value = false;
  openOrderList.value = [];
};

const MSTimeout = 5e3;
const fetchVerifiedAssets = async (networkId2) => {
  const url = endPoints[networkId2]?.swap?.ms?.verified;
  if (!url) {
    return null;
  }
  const res = await api.get(url, void 0, MSTimeout).catch((err) => {
    console.error(el("fetchVerifiedAssets"), json(err));
  });
  if (res) {
    return res;
  }
  return null;
};
const fetchSwapProviders = async (networkId2) => {
  const res = await api.get(`/${networkId2}/v1/swap/providers`, void 0, MSTimeout).catch((err) => {
    console.error(el("fetchSwapProviders"), json(err));
  });
  if (res?.data) {
    return res.data;
  }
  return null;
};
const fetchSwapPairs = async (networkId2) => {
  const res = await api.get(`/${networkId2}/v2/swap/pairs`, void 0, MSTimeout).catch((err) => {
    console.error(el("fetchSwapPairs"), json(err));
  });
  if (res?.data?.assets) {
    return res.data.assets;
  }
  return null;
};
const getEternlFeeWitness = async (networkId2, txCbor) => {
  const url = `/${networkId2}/v1/swap/cancel/sign`;
  const res = await api.post(url, { txCbor }).catch((err) => {
    console.warn("Error:", url, err);
  });
  if (res?.data && typeof res.data === "string") {
    return res.data;
  }
  return null;
};
const fetchCancelTxCBOR = async (networkId2, wallet, utxo, collateralUtxo) => {
  const url = endPoints[networkId2]?.swap?.ms?.cancel;
  if (!url) {
    return null;
  }
  const urlParams = new URLSearchParams({
    wallet,
    utxo,
    collateralUtxo,
    message: "Cancel Swap Request by Eternl"
  });
  const res = await api.get(url + "/?" + urlParams.toString(), void 0, MSTimeout);
  if (res && res.status === "success") {
    return res.cbor;
  } else if (res && res.reason) {
    throw Error(res.reason ?? "");
  }
  throw Error("fetchCancelTxCBOR: unknown error");
};

const MAX_CHUNK_SIZE = 1e3;
const VERIFIED_TTL = 1e3 * 60 * 60;
const ROUTE_TTL = 1e3 * 60 * 60;
const ASSET_INFO_TTL = 1e3 * 60 * 60 * 24 * 7;
const verifiedAssetList = ref([]);
const scamAssetList = ref([]);
const swapProviderList = ref(null);
const swapRouteList = ref(null);
const swapAssetInfoMap = ref({});
const syncStartAI = ref(-1);
let _timeoutRoute = -1;
let _timeoutVerified = -1;
computed(() => {
  let cnt = 0;
  for (const list of Object.values(swapAssetInfoMap.value)) {
    cnt += list.length;
  }
  return cnt;
});
const loadVerifiedAssets = async () => {
  clearTimeout(_timeoutVerified);
  const verifiedAssetMap = await fetchVerifiedAssets(networkId.value);
  if (!verifiedAssetMap) {
    return;
  }
  verifiedAssetList.value = [];
  scamAssetList.value = [];
  for (const entry of Object.entries(verifiedAssetMap)) {
    const asset = entry[0];
    const status = entry[1];
    if (asset.length < 56) {
      continue;
    }
    verifiedAssetList.value.push({
      p: asset.slice(0, 56),
      h: asset.slice(56),
      s: status
    });
    if (status === "scam") {
      scamAssetList.value.push({
        p: asset.slice(0, 56),
        h: asset.slice(56),
        s: status
      });
    }
  }
  _timeoutVerified = setTimeout(() => {
    loadVerifiedAssets();
  }, VERIFIED_TTL);
};
const loadSwapAssets = async () => {
  if (syncStartAI.value > 0) {
    return;
  }
  if (!swapProviderList.value || !swapRouteList.value) {
    return;
  }
  if (Object.keys(swapAssetInfoMap.value).length > 0) {
    return;
  }
  syncStartAI.value = now();
  await loadVerifiedAssets();
  const assetSet = /* @__PURE__ */ new Set();
  for (const route of swapRouteList.value) {
    if (route.p.length >= 56) {
      assetSet.add(`${route.p}${route.h}`);
    }
    for (const pair of route.l) {
      if (pair.p.length >= 56) {
        assetSet.add(`${pair.p}${pair.h}`);
      }
    }
  }
  const sortedAssetList = Array.from(assetSet).sort((a, b) => a.localeCompare(b, "en-US"));
  const assetList = {};
  let currentPolicy = null;
  for (const asset of sortedAssetList) {
    const policy = asset.slice(0, 56);
    const name = asset.slice(56);
    if (policy === currentPolicy) {
      assetList[policy].push(name);
    } else {
      assetList[policy] = [name];
      currentPolicy = policy;
    }
  }
  let totalCnt = 0;
  for (const t of Object.values(assetList)) {
    totalCnt += t.length;
  }
  if (!totalCnt) {
    syncStartAI.value = 0;
    return;
  }
  const unknownAssets = {};
  const dbAssets = await AssetDB.getAssets(networkId.value, assetList) ?? {};
  swapAssetInfoMap.value = dbAssets;
  let dbCnt = 0;
  for (const entry of Object.entries(assetList)) {
    const dbAssetInfoList = dbAssets[entry[0]];
    if (!dbAssetInfoList) {
      unknownAssets[entry[0]] = entry[1];
    } else {
      dbCnt += dbAssetInfoList.length;
      const dbAssetNames = dbAssetInfoList.map((a) => a.h);
      unknownAssets[entry[0]] = entry[1].filter((h) => !dbAssetNames.includes(h));
      for (const dbAsset of dbAssetInfoList) {
        if (dbAsset.t + ASSET_INFO_TTL < syncStartAI.value) {
          unknownAssets[entry[0]].push(dbAsset.h);
          dbCnt--;
        }
      }
    }
  }
  let unknownCnt = totalCnt - dbCnt;
  if (unknownCnt === 0) {
    syncStartAI.value = 0;
    return;
  }
  const fetchedAssets = {};
  while (unknownCnt > 0) {
    const chunk = {};
    let chunkSize = 0;
    for (const policy in unknownAssets) {
      chunk[policy] = unknownAssets[policy];
      chunkSize += unknownAssets[policy].length;
      delete unknownAssets[policy];
      if (chunkSize > MAX_CHUNK_SIZE) {
        break;
      }
    }
    if (chunkSize === 0) {
      break;
    }
    unknownCnt -= chunkSize;
    const _fetchedAssets = await fetchAssetInfo(networkId.value, chunk);
    for (const policy in _fetchedAssets) {
      for (const asset of _fetchedAssets[policy]) {
        asset.t = syncStartAI.value;
      }
      fetchedAssets[policy] = _fetchedAssets[policy];
    }
    for (const entry of Object.entries(fetchedAssets)) {
      if (entry[0] in swapAssetInfoMap.value) {
        swapAssetInfoMap.value[entry[0]].push(...entry[1]);
      } else {
        swapAssetInfoMap.value[entry[0]] = entry[1];
      }
    }
    await AssetDB.putAssets(networkId.value, _fetchedAssets);
  }
  syncStartAI.value = 0;
};
const resetSwapData = () => {
  swapProviderList.value = null;
  swapRouteList.value = null;
  swapAssetInfoMap.value = {};
  syncStartAI.value = 0;
};
const loadSwapRoutes = async () => {
  clearTimeout(_timeoutRoute);
  swapProviderList.value = await fetchSwapProviders(networkId.value);
  if (!swapProviderList.value) {
    resetSwapData();
    _timeoutRoute = setTimeout(() => {
      loadSwapRoutes();
    }, 1e4);
    return;
  }
  if (swapProviderList.value.length === 0) {
    resetSwapData();
    return;
  }
  swapRouteList.value = await fetchSwapPairs(networkId.value);
  if (!swapRouteList.value) {
    resetSwapData();
    _timeoutRoute = setTimeout(() => {
      loadSwapRoutes();
    }, 1e4);
    return;
  }
  await loadSwapAssets();
  _timeoutRoute = setTimeout(() => {
    loadSwapRoutes();
  }, ROUTE_TTL);
};
const initSwapStore = async () => {
  if (swapRouteList.value) {
    return;
  }
  await loadSwapRoutes();
};

const doInitSwap = "doInitSwap";

const storeId$c = "swapControllerMS";
const load$6 = () => {
  resetSwapData();
  return initSwapStore();
};
addSignalListener(doInitSwap, storeId$c, load$6);

const storeId$b = "swapControllerDH";
const load$5 = () => {
  resetSwapData$1();
  return initSwapStore$1();
};
addSignalListener(doInitSwap, storeId$b, load$5);

const doLogVerbose = false;
const storeId$a = "swapController";
addSignalListener(onSelectedAccountIdSet, storeId$a, (selectedWalletId, selectedAccountId, changed) => {
  if (changed) {
    resetSwapStore();
  }
}, doLogVerbose);

const DEFAULT_CURRENCY_PRICE_OF_DAY = "usd";
const _priceOfDayDataMap = {
  "ada": {
    "aed": true,
    "ars": true,
    "aud": true,
    "brl": true,
    "cad": true,
    "chf": true,
    "cny": true,
    "czk": true,
    "dkk": true,
    "eur": true,
    "gbp": true,
    "hkd": true,
    "huf": true,
    "idr": true,
    "ils": true,
    "inr": true,
    "jpy": true,
    "krw": true,
    "mxn": true,
    "myr": true,
    "nok": true,
    "nzd": true,
    "php": true,
    "rub": true,
    "sek": true,
    "sgd": true,
    "thb": true,
    "try": true,
    "twd": true,
    "usd": true,
    "zar": true
  }
};
const hasHistoricalData = (from, to) => _priceOfDayDataMap[from]?.[to] ?? false;

const getReportingURL = () => {
  if (backendServer?.serverV2?.reporting) {
    return `https://${backendServer.serverV2.reporting}`;
  }
  throw new Error("No backend Reporting URL available.");
};

const fetchPriceOfDay = async (fromCoin, toCurrency) => {
  if (!hasHistoricalData(fromCoin, toCurrency)) {
    return null;
  }
  try {
    const url = `${getReportingURL()}/api/v1/historical/${fromCoin}/${toCurrency}`;
    const res = await api.get(url, void 0, 1e4);
    if (res && Array.isArray(res.data)) {
      return res;
    }
  } catch (err) {
    console.warn("Error: Could not fetch token list.", err);
  }
  return null;
};

const doLog = false;
const storeId$9 = "priceOfDayController";
let _toid = -1;
const loadPriceOfDay = async () => {
  removeSignalListener(onInterval60s, storeId$9);
  if (isLoadingPriceOfDay.value) {
    return;
  }
  try {
    const { adaCurrency } = useAdaSymbol();
    const fromCoin = adaCurrency.value.toLowerCase();
    const toCurrency = appCurrency.value?.toLowerCase() ?? DEFAULT_CURRENCY_PRICE_OF_DAY;
    isLoadingPriceOfDay.value = true;
    const list = await fetchPriceOfDay(fromCoin, toCurrency);
    if (doLog) ;
    if (list) {
      for (const entry of list.data) {
        entry.d = getDateIdFromTimestamp(new Date(entry.t).getTime(), appTimezone.value);
        entry.p = parseFloat(((entry.h + entry.l) * 0.5).toFixed(5));
      }
      await updatePriceOfDay(list);
    }
    isLoadingPriceOfDay.value = false;
    const date = now();
    setLastPriceOfDayUpdateTs(networkId.value, date);
    if (doLog) ;
  } catch (err) {
    addSignalListener(onInterval60s, storeId$9, loadPriceOfDay);
  }
  return true;
};
const load$4 = () => {
  try {
    clearTimeout(_toid);
    const url = getReportingURL();
  } catch (err) {
    _toid = setTimeout(() => {
      load$4();
    }, 2500);
    return;
  }
  return loadPriceOfDay();
};
addSignalListener(doLoadPriceOfDay, storeId$9, load$4);

ref([]);
const loadReportGroups = async (force = false) => {
};

const storeId$8 = "reportingController";
let _loadedOnce$1 = false;
const load$3 = () => {
  if (_loadedOnce$1) {
    return;
  }
  _loadedOnce$1 = true;
  return loadReportGroups();
};
addSignalListener(onWalletListUpdated, storeId$8, load$3);

const sizeOfInteger = (n) => {
  let size = 0;
  if (compare(n, "<", "24")) {
    size = 1;
  } else if (compare(n, "<", "256")) {
    size = 2;
  } else if (compare(n, "<", "65536")) {
    size = 3;
  } else if (compare(n, "<", "4294967296")) {
    size = 5;
  } else {
    size = 9;
  }
  return size;
};

const buildTxCU = async (appAccount, stagingTx, stagingTxConfig, buildCounter, inputList, spentInputList, allowWithdrawal) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.allowChangeOnly = true;
  txConfig.forceCU = true;
  txConfig.forceWithdrawal = false;
  txConfig.allowWithdrawal = allowWithdrawal;
  txConfig.allowUtxoManagement = false;
  txConfig.tokenFragmentation.enabledInternal = false;
  txConfig.tokenFragmentation.enabledExternal = false;
  sortInputListByScore(inputList, txConfig.epochParams.txFeePerByte, 0);
  let lastRes;
  tx.body.outputs.length = 0;
  tx.body.inputs.length = 0;
  try {
    let keyList = [];
    let inputSize = 0;
    let output = createTransactionOutputJSON();
    const maxOutputSize = Math.floor(epochParams.maxTxSize / epochParams.maxValueSize) * epochParams.maxValueSize;
    for (let i = 0; i < inputList.length; i++) {
      const utxo = inputList[i];
      const creds = getAddressCredentials(utxo.output.address);
      if (creds?.paymentCred && !keyList.includes(creds.paymentCred)) {
        keyList.push(creds.paymentCred);
        inputSize += 96;
      }
      inputSize += utxo.input.transaction_id.length / 2 + sizeOfInteger(utxo.input.index);
      addValueToValue(output.amount, utxo.output.amount);
      let outputSize = 0;
      if (output.amount.multiasset) {
        outputSize = getUtxoCborSize(output);
      }
      if (outputSize > maxOutputSize * 0.95 || inputSize + outputSize > epochParams.maxTxSize * 0.9) {
        break;
      }
      tx.body.inputs.push(utxo.input);
    }
    const res = await buildTx(tx, txConfig, appAccount, spentInputList);
    if (!res.error) {
      lastRes = res;
    }
  } catch (err) {
    console.error("buildTxCU", err);
    return {
      txIndex: txConfig.txIndex,
      txCbor: null,
      txHash: null,
      builtTx: null,
      txCredList: null,
      error: err + "",
      txConfig: json(txConfig)
    };
  } finally {
    const { builtSignal } = useSignTx();
    builtSignal.value = "doBuildTxCU";
  }
  return lastRes ?? {
    txIndex: txConfig.txIndex,
    txCbor: null,
    txHash: null,
    builtTx: null,
    txCredList: null,
    error: "cu failed, no inputs",
    txConfig: json(txConfig)
  };
};
const getPotentialCUInputs = (appAccount, inputHashList) => {
  if (!appAccount) {
    return [];
  }
  const { utxoList } = getFilteredUtxoList(appAccount, false, true, true, true);
  filterUtxoListByHashList(utxoList, inputHashList);
  return utxoList;
};
const getPotentialMSCUInputs = async (appAccount, inputHashList, inWallet) => {
  if (!appAccount) {
    return [];
  }
  const { utxoList } = getFilteredUtxoList(appAccount, false, true, true, true);
  filterUtxoListByHashList(utxoList, inputHashList);
  const txHashList = utxoList.map((utxo) => utxo.input.transaction_id);
  const utxoStatusList = await checkSwapConfirmed(appAccount.data.state.networkId, appAccount.id, txHashList);
  if (!inWallet) {
    const filterList = [];
    if (utxoStatusList) {
      for (const status of utxoStatusList) {
        if (!status.spent) {
          filterList.push(status.hash);
        }
      }
      filterUtxoListByHashOnlyList(utxoList, filterList);
      filterUtxosByMustIncludeTxHash(utxoList, utxoStatusList.map((item) => item.hash));
    }
  } else {
    for (let i = utxoList.length - 1; i >= 0; i--) {
      const utxo = utxoList[i];
      if (utxoStatusList.some((item) => item.hash === utxo.input.transaction_id)) {
        utxoList.splice(i, 1);
      }
    }
  }
  return utxoList;
};

const buildTxSend = async (appAccount, stagingTx, stagingTxConfig, buildCounter) => {
  const epochParams = checkEpochParams();
  let tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  if (hasDonation(appAccount.id, stagingTxConfig.txIndex)) {
    txConfig.result.hasDonation = true;
  }
  txConfig.maxCoinOutputIndex = stagingTxConfig.maxCoinOutputIndex ?? -1;
  let res = await buildTx(tx, txConfig, appAccount);
  return res;
};

const buildTxDeregistration = async (appAccount, stagingTx, stagingTxConfig, buildCounter, stakeCred) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isStakeDeregistration = true;
  const { isStakeScript } = getScriptState(appAccount.data, false, true);
  tx.body.certs = createDeregistrationCertificates(stakeCred.cred, isStakeScript);
  txConfig.forceWithdrawal = true;
  return buildTx(tx, txConfig, appAccount);
};

const buildTxDRepDeregistration = async (appAccount, stagingTx, stagingTxConfig, buildCounter, dRepCred) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isDRepDeregistration = true;
  tx.body.certs = createDRepDeregistrationCertificates(dRepCred.cred, epochParams.drep.deposit.toString(), !!appAccount.data.account.drepScript);
  return buildTx(tx, txConfig, appAccount);
};

const buildTxCollateral = async (appAccount, stagingTx, stagingTxConfig, buildCounter) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isCollateralTx = true;
  tx.body.outputs.length = 0;
  tx.body.outputs.push(
    createTransactionOutputJSON({
      address: getRootAddress(appAccount.data).bech32,
      amount: {
        coin: minCollateral(appAccount.data.state.networkId)
      }
    })
  );
  return buildTx(tx, txConfig, appAccount);
};

const buildTxDelegation = async (appAccount, stagingTx, stagingTxConfig, buildCounter, stakeCred, poolId) => {
  const info = appAccount.data.rewardInfoList.find((item) => item.cred === stakeCred.cred);
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isPoolDelegation = true;
  if (!poolId) {
    return {
      txIndex: stagingTxConfig.txIndex,
      txCbor: null,
      txHash: null,
      builtTx: null,
      txCredList: null,
      error: ErrorBuildTx.missingPoolId,
      txConfig
    };
  }
  const { isStakeScript } = getScriptState(appAccount.data, false, true);
  tx.body.certs = createDelegationCertificates(epochParams, stakeCred.cred, isStakeScript, info?.registered ?? false, (info?.govDelegationList.length ?? 0) > 0, poolId);
  return buildTx(tx, txConfig, appAccount);
};

const buildTxWithdrawal = async (appAccount, stagingTx, stagingTxConfig, buildCounter) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.forceWithdrawal = true;
  txConfig.result.isForcedWithdrawal = true;
  return buildTx(tx, txConfig, appAccount);
};

const buildTxMultiSigReg = async (appAccount, stagingTx, stagingTxConfig, buildCounter, auxData) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isMultiSigRegistration = true;
  tx.auxiliary_data = auxData;
  return buildTx(tx, txConfig, appAccount);
};

const buildTxCleanUpScam = async (appAccount, stagingTx, stagingTxConfig, buildCounter) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isCleanUpScam = true;
  const { getScamAssetList } = useGuard();
  const scamAssetList = await getScamAssetList();
  const inputList = await getPotentialScamInputs(appAccount, scamAssetList);
  let lastRes;
  let lastResError;
  try {
    for (let i = tx.body.outputs.length - 1; i >= 0; i--) {
      const output2 = tx.body.outputs[i];
      if (!output2.address || isZero(output2.amount.coin)) {
        tx.body.outputs.splice(i, 1);
      }
    }
    let keyList = [];
    let inputSize = 0;
    let output = createTransactionOutputJSON();
    let outputBurnit = createTransactionOutputJSON();
    outputBurnit.address = getBurnAddress(appAccount.data.state.networkId);
    if (!outputBurnit.address) {
      throw ErrorBuildTx.missingBurnAddress;
    }
    const maxOutputSize = Math.floor(epochParams.maxTxSize / epochParams.maxValueSize) * epochParams.maxValueSize;
    for (let i = 0; i < inputList.length; i++) {
      const utxo = inputList[i];
      const multiasset = utxo.output.amount.multiasset;
      const creds = getAddressCredentials(utxo.output.address);
      if (creds?.paymentCred && !keyList.includes(creds.paymentCred)) {
        keyList.push(creds.paymentCred);
        inputSize += 96;
      }
      inputSize += utxo.input.transaction_id.length / 2 + sizeOfInteger(utxo.input.index);
      output.address = utxo.output.address;
      addValueToValue(output.amount, utxo.output.amount);
      const policyIdList = Object.keys(multiasset);
      for (const policyId of policyIdList) {
        const assetNameList = Object.keys(multiasset[policyId]);
        for (const assetName of assetNameList) {
          const assetNameBech32 = getAssetIdBech32(policyId, assetName);
          let alreadyAddedAssets = [];
          for (const scamAsset of scamAssetList) {
            if (!alreadyAddedAssets.includes(assetNameBech32) && scamAsset.assets.includes(assetNameBech32)) {
              alreadyAddedAssets.push(assetNameBech32);
              addValueToValue(outputBurnit.amount, {
                coin: "0",
                multiasset: {
                  [policyId]: { [assetName]: multiasset[policyId][assetName] }
                }
              });
            }
          }
        }
      }
      let outputSize = 0;
      if (output.amount.multiasset) {
        try {
          const epochParams2 = checkEpochParams(networkId.value);
          const bundleSize = appAccount.data.settings.tf.bundleSize;
          const splitOutputList = splitTokenFragmentation(output, bundleSize, epochParams2, 0, true, txConfig.allowUtxoManagement);
          if (splitOutputList.length > 0) {
            outputSize = 0;
            for (const splitOutput of splitOutputList) {
              outputSize += getUtxoCborSize(splitOutput);
            }
          }
        } catch (err) {
          outputSize = getUtxoCborSize(output);
          console.error("splitTokenFragmentation", err);
        }
      }
      if (outputSize > maxOutputSize * 0.9 || inputSize + outputSize > epochParams.maxTxSize * 0.9) {
        break;
      }
      tx.body.inputs.push(utxo.input);
    }
    getMinUtxo(outputBurnit, epochParams.utxoCostPerSize, epochParams.isAtLeastBabbageEra, void 0, true);
    if (tx.body.inputs.length <= 0) {
      return {
        txIndex: txConfig.txIndex,
        txCbor: null,
        txHash: null,
        builtTx: null,
        txCredList: null,
        error: ErrorBuildTx.notNecessaryCS,
        txConfig: json(txConfig)
      };
    }
    tx.body.outputs.push(outputBurnit);
    const res = await buildTx(tx, txConfig, appAccount);
    lastResError = res.error;
    if (!res.error) {
      lastRes = res;
    }
  } catch (err) {
    console.error("buildTxCleanUpScam", err);
    return {
      txIndex: txConfig.txIndex,
      txCbor: null,
      txHash: null,
      builtTx: null,
      txCredList: null,
      error: err + "",
      txConfig: json(txConfig)
    };
  }
  return lastRes ?? {
    txIndex: txConfig.txIndex,
    txCbor: null,
    txHash: null,
    builtTx: null,
    txCredList: null,
    error: lastResError ?? "clean up scam failed, no inputs",
    txConfig: json(txConfig)
  };
};
const getPotentialScamInputs = async (appAccount, scamAssetList) => {
  if (!appAccount) {
    return [];
  }
  const { utxoList } = getFilteredUtxoList(appAccount, false, true, true, true);
  const potentialInputList = [];
  for (const utxo of utxoList) {
    const multiasset = utxo.output.amount.multiasset;
    if (!multiasset) {
      continue;
    }
    let hasScamAsset = false;
    const policyIdList = Object.keys(multiasset);
    for (const policyId of policyIdList) {
      const assetNameList = Object.keys(multiasset[policyId]);
      for (const assetName of assetNameList) {
        const assetNameBech32 = getAssetIdBech32(policyId, assetName);
        for (const scamAsset of scamAssetList) {
          if (scamAsset.assets.includes(assetNameBech32)) {
            hasScamAsset = true;
            break;
          }
        }
        if (hasScamAsset) {
          break;
        }
      }
      if (hasScamAsset) {
        break;
      }
    }
    if (hasScamAsset) {
      potentialInputList.push(utxo);
    }
  }
  return potentialInputList;
};

const convertIAssetSendableListToMultiAssetJSON = (assetList) => {
  let assetMap = void 0;
  for (const asset of assetList) {
    if (!assetMap) {
      assetMap = {};
    }
    if (asset.p in assetMap) {
      assetMap[asset.p][asset.t.a] = asset.a;
    } else {
      assetMap[asset.p] = { [asset.t.a]: asset.a };
    }
  }
  return assetMap;
};

const createWitnessSetFromPlutusData = (cbor) => {
  const plutusList = PlutusList.new();
  const datum = PlutusData.from_hex(cbor);
  plutusList.add(datum);
  const witnessSet = TransactionWitnessSet.new();
  witnessSet.set_plutus_data(plutusList);
  const witness_set = cslToJson(witnessSet.to_json());
  safeFreeCSLObject(witnessSet);
  safeFreeCSLObject(plutusList);
  safeFreeCSLObject(datum);
  return witness_set;
};

const buildTxSwap = async (appAccount, stagingTx, stagingTxConfig, buildCounter, swapTx) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isSwapOrder = true;
  tx.auxiliary_data = getTxMetadataFromStringArray([capitalize(swapTx.swapPool.provider) + ": Swap Request via Eternl" + (swapTx.isLimitOrder ? " (limit)" : "")]);
  const contractOutput = createTransactionOutputJSON({
    address: swapTx.swapDatum.address,
    amount: createValueJSON({ coin: swapTx.swapPool.deposit.toString() })
  });
  if (swapTx.swapPool.batcherFee.token === ".") {
    contractOutput.amount.coin = add(contractOutput.amount.coin, swapTx.swapPool.batcherFee.amount);
  } else {
    throw "invalid swap batcher fee asset: " + swapTx.swapPool.batcherFee.token;
  }
  if (swapTx.sellAsset.p.length === 0) {
    contractOutput.amount.coin = add(contractOutput.amount.coin, swapTx.sellAsset.a);
  } else {
    contractOutput.amount.multiasset = convertIAssetSendableListToMultiAssetJSON([swapTx.sellAsset]);
  }
  contractOutput.plutus_data = { DataHash: swapTx.swapDatum.hash };
  tx.body.outputs.push(contractOutput);
  if (swapTx.fee) {
    tx.body.outputs.push(createTransactionOutputJSON({
      address: getSwapFeeAddressMS(appAccount.data.state.networkId),
      amount: createValueJSON({ coin: swapTx.fee })
    }));
  }
  txConfig.swapConfig = swapTx;
  tx.witness_set = createWitnessSetFromPlutusData(swapTx.swapDatum.datum);
  return buildTx(tx, txConfig, appAccount);
};
const buildTxCancelSwapOrder = async (appAccount, stagingTx, stagingTxConfig, buildCounter, swapOrder) => {
  let cslError;
  let cslVkeyWitnesses;
  let cslVkeyWitness;
  try {
    const networkId = appAccount.data.state.networkId;
    const accountId = appAccount.id;
    const epochParams = checkEpochParams();
    const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
    txConfig.result.isSwapCancel = true;
    const collateralList = getUtxoCborList(appAccount.utxoMap.collateral);
    if (collateralList.length === 0) {
      throw "No collateral UTxO found. Please set one in wallet settings first.";
    }
    let utxo = "";
    if ("tx_hash" in swapOrder) {
      utxo = `${swapOrder.tx_hash}#${swapOrder.tx_output_index}`;
    } else if ("utxo" in swapOrder) {
      utxo = swapOrder.utxo;
    } else {
      throw "Unknown swap order object";
    }
    let cancelCbor = null;
    if (swapOrder.hasOwnProperty("is_dexhunter")) {
      cancelCbor = await fetchCancelTxCBOR$1(networkId, accountId, swapOrder);
    } else {
      const wallet = `0${getNetworkId(networkId).toString(16)}${swapOrder.ownerPubKeyHash}${swapOrder.ownerStakeKeyHash}`;
      cancelCbor = await fetchCancelTxCBOR(networkId, wallet, utxo, collateralList[0]);
    }
    if (!cancelCbor) {
      throw "Unable to fetch cancellation transaction from backend.";
    }
    const free = [];
    const txBuiltRes = getTransactionFromCbor(networkId, cancelCbor, txConfig.txIndex, free);
    if (!txBuiltRes.builtTx) {
      throw ErrorTxCbor.unableToCreateTx;
    }
    await fillInputUtxoList(networkId, txBuiltRes.builtTx, appAccount.utxoMap.allOpk);
    const hasEternlFee = txBuiltRes.builtTx.body.inputs.length === 2 && (!txBuiltRes.builtTx.witness_set.vkeys || txBuiltRes.builtTx.witness_set.vkeys.length === 0);
    if (hasEternlFee) {
      const eternlFeeWitness = await getEternlFeeWitness(networkId, cancelCbor);
      if (!eternlFeeWitness) {
        throw "Failed to generate witness for Eternl fee return input.";
      }
      cslVkeyWitnesses = txBuiltRes.cslWitnessSet.vkeys() ?? getCSLVkeywitnesses();
      cslVkeyWitness = getCSLVkeywitness(eternlFeeWitness);
      cslVkeyWitnesses.add(cslVkeyWitness);
      txBuiltRes.cslWitnessSet.set_vkeys(cslVkeyWitnesses);
      const _cslTx = Transaction.new(txBuiltRes.cslTxBody, txBuiltRes.cslWitnessSet, txBuiltRes.cslAuxData);
      txBuiltRes.cslAuxData = _cslTx.auxiliary_data();
      cancelCbor = _cslTx.to_hex();
      txBuiltRes.builtTx.size = _cslTx.to_bytes().length;
      txBuiltRes.txCbor = cancelCbor;
    }
    txBuiltRes.builtTx.witness_set = cslToJson(txBuiltRes.cslWitnessSet.to_json());
    txBuiltRes.txConfig = txConfig;
    txBuiltRes.txCredList = await getSignTxCredList(networkId, txBuiltRes.builtTx);
    return txBuiltRes;
  } catch (err) {
    cslError = err?.message ?? JSON.stringify(err);
  }
  safeFreeCSLObject(cslVkeyWitnesses);
  safeFreeCSLObject(cslVkeyWitness);
  return {
    txIndex: stagingTxConfig.txIndex,
    txCbor: null,
    txHash: null,
    builtTx: null,
    txCredList: null,
    error: cslError ?? ""
  };
};

const buildTxVoteRegistration = async (appAccount, stagingTx, stagingTxConfig, buildCounter, catalystPrvKey, catalystWitness, nonce) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isCatalystRegistration = true;
  const free = [];
  const changeAddr = getChangeAddress(appAccount.data);
  changeAddr && free.push(changeAddr.csl);
  if (!changeAddr) {
    throw new Error("Unable to get reward payment address of account");
  }
  if (appAccount.data.keys.stake.length === 0) {
    throw new Error("Unsupported wallet type");
  }
  const stakeCred = appAccount.data.keys.stake[0];
  const stakePubKeyBech32 = createPubKey(appAccount.data.account.pub, stakeCred.path.slice(3));
  const votePrvKey = getCSLBip32PrivateKey(catalystPrvKey, free).to_raw_key();
  free.push(votePrvKey);
  const votePubKey = votePrvKey.to_public();
  free.push(votePubKey);
  const votePubHex = toHexString(votePubKey.as_bytes());
  const stakePubKey = getCSLBip32PublicKey(stakePubKeyBech32, free).to_raw_key();
  free.push(stakePubKey);
  const stakePubHex = toHexString(stakePubKey.as_bytes());
  const rewardAddressHex = toHexString(changeAddr.csl.to_bytes());
  let catalystMeta;
  if (nonce) {
    catalystMeta = generateCIP36Metadata(
      [[prefix0x(votePubHex), 1]],
      prefix0x(stakePubHex),
      prefix0x(rewardAddressHex),
      nonce,
      0
    );
    free.push(catalystMeta);
  } else {
    catalystMeta = generateCatalystRegistrationMetadata(
      votePubHex,
      stakePubHex,
      rewardAddressHex,
      getCalculatedChainTip(appAccount.data.state.networkId)
    );
    free.push(catalystMeta);
  }
  const catalystMetaSigned = addCatalystRegistrationSignature(catalystMeta, void 0, catalystWitness);
  free.push(catalystMetaSigned);
  const catalystAuxData = generateCatalystRegistration(catalystMetaSigned);
  free.push(catalystAuxData);
  tx.auxiliary_data = cslToJson(catalystAuxData.to_json());
  freeCSLObjects(free);
  txConfig.preventNavigation = true;
  return buildTx(tx, txConfig, appAccount);
};

const buildTxVoteDelegation = async (appAccount, stagingTx, stagingTxConfig, buildCounter, stakeCred, drep, isScript, needDRepReg, anchorURL) => {
  const info = appAccount.data.rewardInfoList.find((item) => item.cred === stakeCred.cred);
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isVoteDelegation = true;
  const anchorHash = anchorURL ? await getAnchorHash(anchorURL) : null;
  const { isStakeScript } = getScriptState(appAccount.data, false, true);
  tx.body.certs = createVoteDelegationCertificates(
    epochParams,
    stakeCred.cred,
    isStakeScript,
    info?.registered ?? false,
    drep,
    isScript,
    needDRepReg,
    anchorHash ? {
      anchor_url: anchorURL,
      anchor_data_hash: anchorHash
    } : null
  );
  return buildTx(tx, txConfig, appAccount);
};
const getAnchorHash = async (url) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      signal: AbortSignal.timeout(3e3)
    });
    if (res) {
      return blake2b256Str(Buffer$1.from(await res.arrayBuffer()));
    }
  } catch (err) {
    throw "DRep Anchor: " + (err.response?.data ?? err.response?.statusText ?? err.message ?? `${err.response?.status}: Unknown error`);
  }
  return null;
};

const buildTxTf = async (appAccount, stagingTx, stagingTxConfig, buildCounter) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.allowChangeOnly = true;
  txConfig.forceTF = true;
  txConfig.forceWithdrawal = false;
  txConfig.allowWithdrawal = stagingTxConfig.txIndex === 0;
  txConfig.tokenFragmentation.enabledInternal = true;
  txConfig.tokenFragmentation.enabledExternal = false;
  txConfig.tokenFragmentation.bundleSize = txConfig.tokenFragmentation.bundleSize > 0 ? txConfig.tokenFragmentation.bundleSize : 20;
  const inputList = await getPotentialTFInputs(appAccount);
  sortInputListByScore(inputList, txConfig.epochParams.txFeePerByte, 0);
  let lastRes;
  let lastResError;
  try {
    for (let i = tx.body.outputs.length - 1; i >= 0; i--) {
      const output2 = tx.body.outputs[i];
      if (!output2.address || isZero(output2.amount.coin)) {
        tx.body.outputs.splice(i, 1);
      }
    }
    let keyList = [];
    let inputSize = 0;
    let output = createTransactionOutputJSON();
    const maxOutputSize = Math.floor(epochParams.maxTxSize / epochParams.maxValueSize) * epochParams.maxValueSize;
    for (let i = 0; i < inputList.length; i++) {
      const utxo = inputList[i];
      const creds = getAddressCredentials(utxo.output.address);
      if (creds?.paymentCred && !keyList.includes(creds.paymentCred)) {
        keyList.push(creds.paymentCred);
        inputSize += 96;
      }
      inputSize += utxo.input.transaction_id.length / 2 + sizeOfInteger(utxo.input.index);
      output.address = utxo.output.address;
      addValueToValue(output.amount, utxo.output.amount);
      let outputSize = 0;
      if (output.amount.multiasset) {
        try {
          const epochParams2 = checkEpochParams(networkId.value);
          const bundleSize = appAccount.data.settings.tf.bundleSize;
          const splitOutputList = splitTokenFragmentation(output, bundleSize, epochParams2, 0, true, txConfig.allowUtxoManagement);
          if (splitOutputList.length > 0) {
            outputSize = 0;
            for (const splitOutput of splitOutputList) {
              outputSize += getUtxoCborSize(splitOutput);
            }
          }
        } catch (err) {
          outputSize = getUtxoCborSize(output);
          console.error("splitTokenFragmentation", err);
        }
      }
      if (outputSize > maxOutputSize * 0.9 || inputSize + outputSize > epochParams.maxTxSize * 0.9) {
        break;
      }
      tx.body.inputs.push(utxo.input);
    }
    if (tx.body.inputs.length <= 1) {
      return {
        txIndex: txConfig.txIndex,
        txCbor: null,
        txHash: null,
        builtTx: null,
        txCredList: null,
        error: ErrorBuildTx.notNecessaryTF,
        txConfig: json(txConfig)
      };
    }
    const res = await buildTx(tx, txConfig, appAccount);
    lastResError = res.error;
    if (!res.error) {
      lastRes = res;
    }
  } catch (err) {
    console.error("buildTxTf", err);
    return {
      txIndex: txConfig.txIndex,
      txCbor: null,
      txHash: null,
      builtTx: null,
      txCredList: null,
      error: err + "",
      txConfig: json(txConfig)
    };
  }
  return lastRes ?? {
    txIndex: txConfig.txIndex,
    txCbor: null,
    txHash: null,
    builtTx: null,
    txCredList: null,
    error: lastResError ?? "tf failed, no inputs",
    txConfig: json(txConfig)
  };
};
const getPotentialTFInputs = async (appAccount) => {
  if (!appAccount) {
    return [];
  }
  const { utxoList } = getFilteredUtxoList(appAccount, false, true, true, true);
  const bundleSize = appAccount.data.settings.tf.bundleSize;
  const bundleSizeMin = 0.8 * bundleSize;
  const bundleSizeMax = 1.2 * bundleSize;
  const potentialInputList = [];
  for (const utxo of utxoList) {
    const numAssets = getNumAssets2(utxo.output.amount.multiasset);
    if (numAssets > 0 && (numAssets < bundleSizeMin || numAssets > bundleSizeMax)) {
      potentialInputList.push(utxo);
    }
  }
  return potentialInputList;
};

const buildTxVoteGovActions = async (appAccount, stagingTx, stagingTxConfig, buildCounter, pendingVoteList, allowWithdrawal) => {
  const epochParams = checkEpochParams();
  const tx = json(stagingTx);
  tx.witness_set = {};
  const txConfig = generateTxConfig(appAccount, epochParams, stagingTxConfig.txIndex, buildCounter);
  txConfig.result.isVoteDelegation = true;
  txConfig.forceWithdrawal = false;
  txConfig.allowWithdrawal = allowWithdrawal;
  txConfig.maybeMultipleTx = true;
  const voterVotesMap = /* @__PURE__ */ new Map();
  for (const vote of pendingVoteList) {
    const dRepCreds = getDRepCredentialsFromAddress(vote.b);
    if (!dRepCreds) {
      continue;
    }
    const govActionId = getGovActionIdProposalHash(vote.g);
    if (!govActionId) {
      continue;
    }
    if (vote.v !== "Yes" && vote.v !== "No" && vote.v !== "Abstain") {
      continue;
    }
    let voterVotes = voterVotesMap.get(vote.b);
    if (!voterVotesMap.has(vote.b)) {
      const DRep = dRepCreds.isScript ? { Script: dRepCreds.dRepCred } : { Key: dRepCreds.dRepCred };
      voterVotes = {
        voter: { DRep },
        votes: []
      };
      voterVotesMap.set(vote.b, voterVotes);
    }
    const votingProcedure = {
      vote: vote.v
    };
    if (vote.u && vote.ah) {
      votingProcedure.anchor = {
        anchor_data_hash: vote.ah,
        anchor_url: vote.u
      };
    }
    const _vote = {
      action_id: {
        index: govActionId.index,
        transaction_id: govActionId.txHash
      },
      voting_procedure: votingProcedure
    };
    voterVotes.votes.push(_vote);
  }
  for (const [dRepId, voterVotes] of voterVotesMap) {
    if (voterVotes.votes.length === 0) {
      continue;
    }
    if (!tx.body.voting_procedures) {
      tx.body.voting_procedures = [];
    }
    tx.body.voting_procedures.push(voterVotes);
  }
  return buildTx(tx, txConfig, appAccount);
};

const {
  openSignTx,
  resetSignTx
} = useSignTx();
const { buildAccount } = useBuildAccount();
const storeId$7 = "buildTxController";
const _builtTxList = [];
const doBuildTx = async (_appAccount, builtSignal, txIndex, buildFunc, ...args) => {
  if (!_appAccount) {
    return;
  }
  const accountId = _appAccount.id;
  const networkId = _appAccount.data.state.networkId;
  try {
    const {
      tx,
      config,
      builtTx,
      builtTxBalance
    } = resetAllTx(accountId, txIndex);
    const builtRes = await buildFunc(_appAccount, tx, config, getNewBuildCounter(), ...args);
    _builtTxList[txIndex] = builtRes;
    handleBuildResult(accountId, txIndex, builtTx, builtRes, builtTxBalance);
    dispatchSignalSyncTo(accountId, doUpdateAccountBalances);
    dispatchSignalSync(builtSignal, builtRes, txIndex);
    if (!builtRes || builtRes.error) {
      resetSignTx();
    } else {
      await calcAccountTxBalance(_appAccount, builtTx, builtTxBalance);
      builtRes.txCredList = await getSignTxCredList(networkId, builtRes.builtTx);
      openSignTx([builtRes], "cc", false, builtSignal);
    }
  } catch (err) {
    resetAllTx(accountId, txIndex);
    console.error("Error: doBuildTx", err);
    dispatchSignalSync(builtSignal, null, err);
  }
};
const doBuildSendTx = async (_appAccount, builtSignal, txIndex, doOpenSign) => {
  if (!_appAccount) {
    return;
  }
  const accountId = _appAccount.id;
  const networkId = _appAccount.data.state.networkId;
  try {
    const {
      tx,
      config,
      builtTx,
      builtTxBalance
    } = createTx(accountId, txIndex);
    const builtRes = await buildTxSend(_appAccount, tx, config, doOpenSign ? getNewBuildCounter() : getBuildCounter());
    _builtTxList[txIndex] = builtRes;
    handleBuildResult(accountId, txIndex, builtTx, builtRes, builtTxBalance);
    dispatchSignalSyncTo(accountId, doUpdateAccountBalances);
    dispatchSignalSync(builtSignal, builtRes, txIndex);
    if (!builtRes || builtRes && builtRes.error) {
      resetSignTx();
      if (builtRes.error) {
        dispatchSignalSync(onTxBuiltError, builtRes.error, txIndex);
      }
    } else {
      await calcAccountTxBalance(_appAccount, builtTx, builtTxBalance);
      if (doOpenSign) {
        builtRes.txCredList = await getSignTxCredList(networkId, builtRes.builtTx);
        openSignTx([builtRes], "cc", false, builtSignal);
      }
    }
    return builtRes;
  } catch (err) {
    console.error("Error: doBuildSendTx", err);
    resetAllTx(accountId, txIndex);
    dispatchSignalSync(builtSignal, null, err);
  }
};
const doSendBuiltTx = async (_appAccount, txIndex) => {
  if (!_appAccount) {
    return;
  }
  const accountId = _appAccount.id;
  const networkId = _appAccount.data.state.networkId;
  try {
    const { builtTxBalance } = createTx(accountId, txIndex);
    const builtTx = _builtTxList[txIndex];
    builtTx.txCredList = await getSignTxCredList(networkId, builtTx.builtTx);
    openSignTx([builtTx], "cc", false, "send");
    return builtTx;
  } catch (err) {
    console.error("Error: doBuildSendTx", err);
  }
};
const buildCUTx = async (_appAccount, buildCounter) => {
  if (!_appAccount) {
    return null;
  }
  const accountId = _appAccount.id;
  resetAllTx(accountId, 0);
  const builtResList = [];
  const inputUtxoList = getPotentialCUInputs(_appAccount, []);
  const spentInputList = [];
  let builtButNotUsed = false;
  for (let index = 0; index < 10 && inputUtxoList.length > 0; index++) {
    const {
      tx,
      builtTx,
      config
    } = createTx(accountId, 0);
    const builtRes = await buildTxCU(_appAccount, tx, config, buildCounter, inputUtxoList, spentInputList, index === 0);
    if (!builtRes.error && builtRes.builtTx) {
      if (builtRes.builtTx.body.inputs.length > builtRes.builtTx.body.outputs.length) {
        builtResList.push(builtRes);
      } else {
        builtButNotUsed = true;
      }
      if (builtRes.builtTx?.body) {
        const _spentInputList = builtRes.builtTx.body.inputs.map((input) => getUtxoHash(input));
        spentInputList.push(..._spentInputList);
        filterUtxoListByHashList(inputUtxoList, _spentInputList);
      }
    } else {
      break;
    }
  }
  dispatchSignalSyncTo(accountId, doUpdateAccountBalances);
  if (builtResList.length === 0 && builtButNotUsed) {
    throw ErrorBuildTx.notNecessaryCU;
  }
  return builtResList;
};
const buildMSCUTx = async (_appAccount, buildCounter, inWallet) => {
  if (!_appAccount) {
    return null;
  }
  const accountId = _appAccount.id;
  resetAllTx(accountId, 0);
  const builtResList = [];
  const inputUtxoList = await getPotentialMSCUInputs(_appAccount, [], inWallet);
  const spentInputList = [];
  let builtButNotUsed = false;
  for (let index = 0; index < 100 && inputUtxoList.length > 0; index++) {
    const {
      tx,
      builtTx,
      config
    } = createTx(accountId, 0);
    const builtRes = await buildTxCU(_appAccount, tx, config, buildCounter, inputUtxoList, spentInputList, index === 0);
    if (!builtRes.error && builtRes.builtTx) {
      if (builtRes.builtTx.body.inputs.length > builtRes.builtTx.body.outputs.length) {
        builtResList.push(builtRes);
      } else {
        builtButNotUsed = true;
      }
      if (builtRes.builtTx?.body) {
        const _spentInputList = builtRes.builtTx.body.inputs.map((input) => getUtxoHash(input));
        spentInputList.push(..._spentInputList);
        filterUtxoListByHashList(inputUtxoList, _spentInputList);
      }
    } else {
      break;
    }
  }
  dispatchSignalSyncTo(accountId, doUpdateAccountBalances);
  if (builtResList.length === 0 && builtButNotUsed) {
    throw ErrorBuildTx.notNecessaryCU;
  }
  return builtResList;
};
const buildVoteTx = async (_appAccount, buildCounter, voteList) => {
  if (!_appAccount) {
    return null;
  }
  const accountId = _appAccount.id;
  resetAllTx(accountId, 0);
  const builtResList = [];
  const builtTxList = [];
  updateBuildingTxList(_appAccount, builtTxList, true);
  const _voteTxList = [];
  if (_appAccount.data.account.signType === "ledger") {
    for (let i = 0; i < voteList.length; i++) {
      _voteTxList.push([voteList[i]]);
    }
  } else {
    _voteTxList.push(voteList);
  }
  for (let index = 0; index < _voteTxList.length; index++) {
    const {
      tx,
      builtTx,
      config
    } = createTx(accountId, 0);
    const builtRes = await buildTxVoteGovActions(_appAccount, tx, config, buildCounter, _voteTxList[index], index === 0);
    if (!builtRes.error && builtRes.builtTx) {
      builtResList.push(builtRes);
      if (builtRes.builtTx?.body) {
        builtTxList.push(builtRes.builtTx);
        updateBuildingTxList(_appAccount, builtTxList);
      }
    } else {
      break;
    }
  }
  dispatchSignalSyncTo(accountId, doUpdateAccountBalances);
  return builtResList;
};
addSignalListener(doBuildTxCollateral, storeId$7, () => doBuildTx(buildAccount.value, onBuiltTxCollateral, 0, buildTxCollateral));
addSignalListener(doBuildTxDelegation, storeId$7, (poolId) => doBuildTx(buildAccount.value, onBuiltTxDelegation, 0, buildTxDelegation, buildAccount.value?.data.keys.stake[0], poolId));
addSignalListener(doBuildTxDeregistration, storeId$7, () => doBuildTx(buildAccount.value, onBuiltTxDeregistration, 0, buildTxDeregistration, buildAccount.value?.data.keys.stake[0]));
addSignalListener(doBuildTxDRepDeregistration, storeId$7, () => doBuildTx(buildAccount.value, onBuiltTxDRepDeregistration, 0, buildTxDRepDeregistration, buildAccount.value?.data.keys.drep[0]));
addSignalListener(doBuildTxCleanUpScam, storeId$7, () => doBuildTx(buildAccount.value, onBuiltTxCleanUpScam, 0, buildTxCleanUpScam));
addSignalListener(doBuildTxWithdrawal, storeId$7, () => doBuildTx(buildAccount.value, onBuiltTxWithdrawal, 0, buildTxWithdrawal));
addSignalListener(doBuildTxMultiSigReg, storeId$7, (feeAccount, auxData) => doBuildTx(feeAccount, onBuiltTxMultiSigReg, 0, buildTxMultiSigReg, auxData));
addSignalListener(doBuildTxSwap, storeId$7, (swapTx) => doBuildTx(buildAccount.value, onBuiltTxSwap, 0, buildTxSwap, swapTx));
addSignalListener(doBuildTxSwapCancel, storeId$7, (swapOrder) => doBuildTx(buildAccount.value, onBuiltTxSwapCancel, 0, buildTxCancelSwapOrder, swapOrder));
addSignalListener(doBuildTxVoteReg, storeId$7, (catalystPrvKey, catalystWitness, nonce) => doBuildTx(buildAccount.value, onBuiltTxVoteReg, 0, buildTxVoteRegistration, catalystPrvKey, catalystWitness, nonce));
addSignalListener(doBuildTxVoteDelegation, storeId$7, (drep, isScript, needDRepReg, anchorURL) => doBuildTx(buildAccount.value, onBuiltTxVoteDelegation, 0, buildTxVoteDelegation, buildAccount.value?.data.keys.stake[0], drep, isScript, needDRepReg, anchorURL));
addSignalListener(doBuildTxTF, storeId$7, () => doBuildTx(buildAccount.value, onBuiltTxTF, 0, buildTxTf));
addSignalListener(doBuildTxCU, storeId$7, () => buildCUTx(buildAccount.value, getNewBuildCounter()));
addSignalListener(doBuildTxMSCU, storeId$7, (inWallet) => buildMSCUTx(buildAccount.value, getNewBuildCounter(), inWallet));
addSignalListener(doBuildTxVoteGovActions, storeId$7, (voteList) => buildVoteTx(buildAccount.value, getNewBuildCounter(), voteList));
addSignalListener(doBuildTxSend, storeId$7, (txIndex) => doBuildSendTx(buildAccount.value, onBuiltTxSend, txIndex, true));
addSignalListener(doJustBuildTxSend, storeId$7, (txIndex) => doBuildSendTx(buildAccount.value, onBuiltTxSend, txIndex, false));
addSignalListener(doJustSendBuiltTx, storeId$7, (txIndex) => doSendBuiltTx(buildAccount.value, txIndex));

const storeId$6 = "stagingTxController";
addSignalListener(doAddOutput, storeId$6, addOutput);
addSignalListener(doRemoveOutput, storeId$6, removeOutput);
addSignalListener(doAddDonation, storeId$6, addDonation);
addSignalListener(doRemoveDonation, storeId$6, removeDonation);
addSignalListener(doToggleDonation, storeId$6, toggleDonation);
addSignalListener(doAddAuxData, storeId$6, addAuxData);
addSignalListener(doResetAllTx, storeId$6, resetAllTx);

const swapAmount = 1e8;
const usePortfolio = (networkId, walletId, accountId) => {
  function reviver(key, value) {
    if (typeof value === "object" && value !== null) {
      if (value.dataType === "Map") {
        return new Map(value.value);
      }
    }
    return value;
  }
  const getPrices = async (portfolioRequest) => {
    let url = "/" + networkId + "/v2/misc/portfolio";
    const prices = await api.post(url, portfolioRequest).catch((err) => {
      throw new Error(url + " failed: " + (err?.message ?? err));
    });
    let result = JSON.parse(prices.data, reviver);
    return result;
  };
  const getAdaValueEstimate = (assetPrices, assets, useLastSales = false, groupPolicies = false) => {
    const finaleValues = /* @__PURE__ */ new Map();
    for (const policy of Object.keys(assets)) {
      const policyPrice = assetPrices.get(policy);
      for (const policyName of Object.keys(assets[policy])) {
        const policyQuantity = assets[policy][policyName];
        let assetKey = policy + "." + policyName;
        const assetPrice = assetPrices.get(assetKey);
        if (!policyPrice && !assetPrices) {
          continue;
        }
        const prices = policyPrice ?? assetPrice;
        if (prices) {
          const targetMetadata = prices?.assetInfo;
          if (!targetMetadata) {
            console.error("No metadata found for " + policy + " . " + policyName, prices);
            console.log("asset prices are", assetPrices);
          }
          if (!Array.isArray(targetMetadata) && prices.ftPrice) {
            let baseAvgPrice = prices.ftPrice.avg;
            if (baseAvgPrice) {
              const basePrice = divide(divide(swapAmount, Math.pow(10, getNetworkDecimals(networkId))), baseAvgPrice);
              let fullQuantity = divide(policyQuantity, pow(10, targetMetadata?.tr?.d ?? 1));
              const finalResult = multiply(basePrice, fullQuantity);
              let name = targetMetadata?.tr?.t;
              if (!name && targetMetadata?.h) {
                name = decodeHex(targetMetadata.h);
              }
              finaleValues.set(name ?? "unkown-ft", {
                price: Math.round(Number(finalResult) * 100) / 100,
                amount: Number(fullQuantity),
                nft: false,
                assetInfo: targetMetadata
              });
            }
          } else if (Array.isArray(targetMetadata) && prices.nftPrice) {
            let policyCount = Object.keys(assets[policy]).length;
            if (groupPolicies) {
              let value = 0;
              if (useLastSales && prices.nftPrice.lastPrices.length > 0) {
                let avgLastPrice = "0";
                for (const price of prices.nftPrice.lastPrices) {
                  avgLastPrice = add(avgLastPrice, divide(price.pr, Math.pow(10, getNetworkDecimals(networkId))));
                }
                avgLastPrice = divide(avgLastPrice, prices.nftPrice.lastPrices.length);
                value = Math.round(Number(avgLastPrice) * 100) / 100;
              } else {
                value = Math.round(Number(prices.nftPrice.fl) * 100) / 100;
              }
              for (const metadata of targetMetadata) {
                let key = metadata?.n ?? metadata?.tr?.n ?? policy + "." + policyName;
                if (key.startsWith("unkown-nft")) {
                  console.warn("Found missing metadata for", policy, policyName);
                }
                finaleValues.set(key, {
                  price: Math.round(Number(value) * 100) / 100,
                  amount: 1,
                  nft: true,
                  assetInfo: metadata
                });
              }
            } else {
              for (const asset of Object.keys(assets[policy])) {
                const firstMetadata = targetMetadata[0];
                let value = 0;
                if (useLastSales && prices.nftPrice.lastPrices.length > 0) {
                  let avgLastPrice = "0";
                  for (const price of prices.nftPrice.lastPrices) {
                    avgLastPrice = add(avgLastPrice, divide(price.pr, Math.pow(10, getNetworkDecimals(networkId))));
                  }
                  avgLastPrice = divide(avgLastPrice, prices.nftPrice.lastPrices.length);
                  value = Math.round(Number(avgLastPrice) * policyCount * 100) / 100;
                } else {
                  value = Math.round(Number(prices.nftPrice.fl) * policyCount * 100) / 100;
                }
                let key = firstMetadata?.n ?? firstMetadata?.tr?.n ?? policy + "." + asset;
                if (key.startsWith("unkown-nft")) {
                  console.warn("Found missing metadata for", policy, policyName);
                }
                finaleValues.set(key, {
                  price: Math.round(Number(value) * 100) / 100,
                  amount: Number(policyCount),
                  nft: true,
                  assetInfo: firstMetadata
                });
              }
            }
          }
        }
      }
    }
    return new Map([...finaleValues.entries()].sort((a, b) => b[1].price - a[1].price));
  };
  const fetchUsdPrice = () => {
    let url = "/" + networkId + "/v2/misc/usdPrice";
    return api.post(url, {}).catch((err) => {
      throw new Error(url + " failed: " + (err?.message ?? err));
    });
  };
  return {
    fetchUsdPrice,
    getPrices,
    getAdaValueEstimate
  };
};

class AssetPriceDB extends Dexie {
  list;
  constructor(networkId) {
    super("eternl-" + networkId + "-asset-prices");
    this.version(1).stores({
      list: "p"
    });
  }
}
const dbMap = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
const getDB = async (networkId) => {
  let db = dbMap[networkId];
  if (!db) {
    db = new AssetPriceDB(networkId);
    dbMap[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const getAssetPrices = (networkId, assets) => {
  return getDB(networkId).then((db) => {
    return db.list.bulkGet(Object.keys(assets)).then((dbList) => {
      const assetList = {};
      console.log("found db entries", dbList);
      for (const item of dbList) {
        if (item) {
          assetList[item.p] = item.a;
        }
      }
      return assetList;
    }).catch((e) => null);
  }).catch((e) => null);
};
const putAssetsPrices = async (networkId, assets) => {
  console.log("putAssetsPrices", assets);
  return getDB(networkId).then((db) => {
    return db.transaction("rw", db.list, async (tx) => {
      console.log("start rw tx");
      await db.list.bulkGet(Object.keys(assets));
      console.log("");
      for (const entry of assets.keys()) {
        let price = { ...assets.get(entry) };
        if (price) {
          delete price.assetInfo;
          let [policy, name] = entry.split(".");
          if (price.nftPrice) {
            let item = { p: policy, a: price };
            console.log("would now add", item);
            db.list.put(item);
          } else {
            let item = { p: entry, a: price };
            console.log("would now add", item);
            db.list.put(item);
          }
        }
      }
      return true;
    });
  }).catch((e) => {
    console.error(e);
    return false;
  });
};
const AssetPriceDB$1 = {
  getAssetPrices,
  putAssetsPrices
  // getCDNImage,
  // getCDNImages,
  // putCDNImage,
  // putCDNImages,
  //
  // removeAllAssets,
  // removeAllCDNImages
};

const doRequestAssetPrice = "doRequestAssetPrice";
const doRequestRqCount = "doRequestRqCount";
const onAssetPriceResponse = "onAssetPriceResponse";
const onUpdatePortfolioRequestCount = "onUpdatePortfolioRequestCount";

const storeId$5 = "portfolioController";
const _requestedAssets = ref({});
let _processingRqChunks = [];
const {
  getPrices
} = usePortfolio(networkId.value);
const running = ref(false);
const batchSize = 5;
let remainCount = 0;
const requestAssetPrice = async (assets) => {
  _requestedAssets.value = assets;
  await processItems();
};
const processItems = async () => {
  if (running.value) {
    return;
  }
  if (Object.keys(_requestedAssets.value).length === 0) {
    return;
  }
  running.value = true;
  let policies = Object.keys(_requestedAssets.value);
  remainCount = policies.length;
  let assetsToRequest = {};
  for (const assetKey of policies) {
    const asset = _requestedAssets.value[assetKey];
    if (asset) {
      assetsToRequest[assetKey] = Object.keys(asset);
      remainCount = remainCount - 1;
    }
    if (_processingRqChunks.length < 3 || Object.keys(assetsToRequest).length === batchSize || remainCount <= batchSize) {
      if (Object.keys(assetsToRequest).length === 0) {
        console.error("assetsToRequest empty:", assetsToRequest);
      }
      _processingRqChunks.push(getPrices(assetsToRequest));
      doProcessRequestRqCount();
      const results = await Promise.all(_processingRqChunks);
      const assetInfos = {};
      for (const res of results.keys()) {
        await AssetPriceDB$1.putAssetsPrices(networkId.value, results[res]);
        const infos = results[res];
        for (const info of infos.keys()) {
          let assetInfo = infos.get(info)?.assetInfo;
          let policy = info;
          if (infos.get(info)?.nftPrice) {
            policy = info.split(".")[0] ?? info;
          }
          if (assetInfo) {
            if (!assetInfos[policy]) {
              assetInfos[policy] = Array.isArray(assetInfo) ? assetInfo : [assetInfo];
            } else {
              if (!Array.isArray(assetInfo)) {
                assetInfos[policy].push(assetInfo);
              } else {
                assetInfos[policy].concat(...assetInfo);
              }
            }
          }
        }
        addAllAssetInfoToMap(assetInfos);
        await AssetDB.putAssets(networkId.value, assetInfos);
      }
      await dispatchSignal(onAssetPriceResponse, results);
      assetsToRequest = {};
    }
  }
  _processingRqChunks = [];
  running.value = false;
};
const doProcessRequestRqCount = () => {
  dispatchSignalSync(onUpdatePortfolioRequestCount, remainCount);
};
addSignalListener(doRequestAssetPrice, storeId$5, (assets) => requestAssetPrice(assets));
addSignalListener(doRequestRqCount, storeId$5, () => doProcessRequestRqCount());

const assetList = ref([]);
const updateMilkomedaData = async () => {
  const dbEntries = await MilkomedaDB.getAssetList(networkId.value);
  assetList.value.splice(0, assetList.value.length, ...dbEntries);
  setTimeout(() => {
    updateMilkomedaData();
  }, 15 * 60 * 1e3);
  return true;
};

const storeId$4 = "milkomedaController";
let _loadedOnce = false;
const load$2 = () => {
  if (_loadedOnce) {
    return;
  }
  _loadedOnce = true;
  return updateMilkomedaData();
};
addSignalListener(onWalletListUpdated, storeId$4, load$2);

const storeId$3 = "addressController";
addSignalListener(onInterval60s, storeId$3, addressCacheCleanup);

const storeId$2 = "addressBookController";
const load$1 = () => {
  return loadAddressBook();
};
addSignalListener(doInitApp, storeId$2, load$1);

const storeId$1 = "walletListController";
const doLoadWalletList = async (doBroadcast = false) => {
  if (!doBroadcast) {
    return loadWalletList();
  }
  await loadWalletList();
  return dispatchSignal(doSendUpdateWalletList);
};
addSignalListener(doReloadWalletList, storeId$1, () => {
  return doLoadWalletList(false);
});
addSignalListener(BroadcastMsgType.updateWalletList, storeId$1, () => {
  return doLoadWalletList(false);
});
addSignalListener(BroadcastMsgType.updateAccountData, storeId$1, (walletId, accountId) => {
  return reloadAccountData(walletId, accountId);
});
addSignalListener(doRemoveAccount, storeId$1, (walletId, accountId, doUpdate = true) => {
  return removeAccount(walletId, accountId, doUpdate);
});
addSignalListener(onAccountDataUpdated, storeId$1, (appAccount, doBroadcast = true) => {
  updateFavoriteAccountList();
  if (doBroadcast) {
    dispatchSignalSync(doSendUpdateAccountData, appAccount.id, appAccount.walletId);
  }
});
addSignalListener(onAccountSettingsUpdated, storeId$1, () => {
  updateFavoriteAccountList();
});
addSignalListener(onAppAccountAddedToAppWallet, storeId$1, () => {
  updateFavoriteAccountList();
});
addSignalListener(onAccountRemoved, storeId$1, () => {
  updateFavoriteAccountList();
});
addSignalListener(onWalletListUpdated, storeId$1, () => {
  updateFavoriteAccountList();
});
addSignalListener(onFocus, storeId$1, () => {
  return doLoadWalletList();
});
addSignalListener(doToggleManualSyncForAllAccounts, storeId$1, async (walletId) => {
  const appWallet = getIAppWallet(walletId);
  if (appWallet) {
    return await updateManualSyncForAllAccounts(appWallet, !appWallet.hasManualSyncAccount);
  }
  throw new Error("No appWallet set.");
});
addSignalListener(doInitApp, storeId$1, () => {
  return loadWalletList();
});

const storeId = "notificationController";
addSignalListener(doSetNotificationDeleted, storeId, async (idList) => {
  await setNotificationsDeleted(idList);
});
addSignalListener(doRefreshNotifications, storeId, async () => {
  await clearNotificationsDeleted();
  dispatchSignal(doForceSyncImportantAccounts);
});
addSignalListener(doResetNotificationDeleted, storeId, async () => {
  await resetNotificationsDeleted();
});
addSignalListener(doSetNotificationRead, storeId, async (idList) => {
  await setNotificationsRead(idList);
});
addSignalListener(onAccountNotificationUpdated, storeId, async () => {
  await loadNotifications();
});
addSignalListener(doShareMultiSigNotification, storeId, (tx) => {
  return updateMultiSigNotification(tx);
});
const load = () => {
  loadNotifications();
};
addSignalListener(doInitApp, storeId, load);

let __initEternlPromise = void 0;
const _initEternlFull = async (progress) => {
  if (progress) {
    progress.value = 0;
  }
  performance.now();
  await Promise.all([
    loadCSL(networkId.value),
    loadCMS()
  ]);
  if (progress) {
    progress.value = 25;
  }
  await Promise.all([
    dispatchSignal(doSetActiveApp),
    // doSetActiveApp -> onSyncLeader for managerV2
    waitForCSL()
  ]);
  if (progress) {
    progress.value = Math.floor(50 + 25 * Math.random());
  }
  await dispatchSignal(doInitFirstWorker);
  await dispatchSignal(doInitApp);
  await dispatchSignal(doPostInitApp);
  if (progress) {
    progress.value = 100;
  }
};
const initEternl = (progress) => {
  if (!__initEternlPromise) {
    __initEternlPromise = _initEternlFull(progress);
    setEternlInitPromise(__initEternlPromise);
  }
  return getEternlInitPromise();
};
const waitCSLInit = new Promise((resolve) => {
  const intervalId = setInterval(() => {
    if (globalThis["cslInitialized"]) {
      const num = getCSLBigNum("1000");
      num.free();
      clearInterval(intervalId);
      resolve(true);
    }
  }, 50);
});
const waitForCSL = () => {
  return waitCSLInit;
};

export { _initEternlFull, initEternl };
