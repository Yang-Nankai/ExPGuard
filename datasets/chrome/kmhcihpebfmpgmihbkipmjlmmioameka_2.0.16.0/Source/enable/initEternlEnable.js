import { Y as addSignalListener, w as watch, P as dispatchSignalSync, V as networkId, ax as isOffscreenMode, ay as isSignTxMode, X as dispatchSignal, m as el, p as sl, Q as json, az as setNetworkId, U as api } from './enable.js';
import { aN as onSyncLeader, aO as useDappAccount, aP as doPostInitApp, a7 as appAccount, aQ as SyncPriority, aR as doSyncAccount, aS as onRemoveAllAccountsFromSync, aT as setAppAccountAndWallet, aU as WalletDB, aV as AccountDB, aW as getIAppWallet, a8 as getIAppAccount, aG as doReloadAccount, aX as onTxHistoryAccountUpdated, aF as isSyncLeader, aM as useGuard, aY as doSetActiveApp, aZ as GuardBlockListDB, a_ as loadCSL, a$ as getCSLBigNum, af as doInitApp } from './useGuards.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

async function load$1(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init$1(input) {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        var ret = debugString(getObject(arg1));
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load$1(await input, imports);

    wasm = instance.exports;
    init$1.__wbindgen_wasm_module = module;

    return wasm;
}

globalThis["cmsInitialized"] = false;
const loadCMS = async () => {
  if (!init$1.encrypt_with_password) {
    globalThis["cmsInitialized"] = !!await init$1("/wasm/cms-v1.0.1.wasm");
  } else {
    globalThis["cmsInitialized"] = true;
  }
};

let __initEternlPromise$1 = void 0;
const _initEternlPromise = new Promise(async (resolve, reject) => {
  while (!__initEternlPromise$1) {
    await sleep(50);
  }
  await __initEternlPromise$1;
  return resolve();
});
const getEternlInitPromise = () => _initEternlPromise;
const setEternlInitPromise = (p) => {
  __initEternlPromise$1 = p;
};

const doLogAction = false;
const storeId$1 = "onlyDappAccount";
let _toid = -1;
const {
  dappAccountId,
  dappWalletId,
  dappAccountUpdated
} = useDappAccount();
const updateDappAccount = async () => {
  const walletId = dappWalletId.value;
  const accountId = dappAccountId.value;
  if (!walletId || !accountId) {
    setAppAccountAndWallet(null, null);
    return;
  }
  const walletList = await WalletDB.getWalletDataList(networkId.value);
  let appAccount2 = null;
  let appWallet = null;
  for (const walletData of walletList) {
    const wallet = walletData.wallet;
    if (wallet.id === walletId) {
      const accountList = wallet.accountList;
      for (const account of accountList) {
        if (account.id === accountId) {
          const accountData = await AccountDB.getAccountData(networkId.value, account);
          if (!accountData) {
            break;
          }
          appWallet = getIAppWallet(walletId, walletData, true);
          appAccount2 = getIAppAccount(accountId, walletId, accountData);
          break;
        }
      }
      if (appWallet && appAccount2) {
        break;
      }
    }
  }
  if (!appAccount2) {
    appAccount2 = null;
    appWallet = null;
  } else {
    if (isOffscreenMode() || isSignTxMode()) {
      try {
        await dispatchSignal(doReloadAccount, appAccount2);
        if (doLogAction) ;
        if (!appAccount2.utxoMap) {
          appAccount2 = null;
          appWallet = null;
        }
      } catch (err) {
        console.error(el(storeId$1), sl("updateDappAccount"), "reloadAccount", err);
        appAccount2 = null;
        appWallet = null;
      }
    }
  }
  setAppAccountAndWallet(appAccount2, appWallet);
  dispatchSignalSync(onTxHistoryAccountUpdated, appAccount2);
  addAccountToSync(isSyncLeader());
  await setNetworkId(networkId.value);
};
const addAccountToSync = (isSyncLeader2) => {
  if (isSyncLeader2 && appAccount.value) {
    dispatchSignalSync(doSyncAccount, appAccount.value, SyncPriority.high);
  } else {
    dispatchSignalSync(onRemoveAllAccountsFromSync);
  }
};
addSignalListener(onSyncLeader, storeId$1, (isSyncLeader2) => addAccountToSync(isSyncLeader2));
watch(dappAccountUpdated, () => {
  clearTimeout(_toid);
  _toid = setTimeout(() => {
    updateDappAccount();
  }, 250);
}, { immediate: true });
const init = async () => {
  await setNetworkId(networkId.value);
  await updateDappAccount();
};
addSignalListener(doPostInitApp, storeId$1, init);

const fileHashSubstringLength = 8;

const callAPIPost = async (url, payload, networkId, commit, onError) => {
  try {
    if (networkId === null) {
      throw new Error("Error: callAPIPost: no valid network set");
    }
    const res = await api.post("/" + networkId + url, payload);
    commit(res);
  } catch (e) {
    if (onError) {
      onError(e);
    }
  }
};

const {
  cacheServerScamInfos
} = useGuard();
let _lastUpdate = -1;
let _toId = setTimeout(() => {
});
const storeId = "guardController";
const loadGuard = async () => {
  clearTimeout(_toId);
  if (_lastUpdate + 12 * 60 * 1e3 < Date.now()) {
    const lastImportInfo = await GuardBlockListDB.getLastImportInfo();
    let hash = null;
    if (lastImportInfo && lastImportInfo.lastHash) {
      hash = lastImportInfo.lastHash.substring(0, fileHashSubstringLength);
    }
    await callAPIPost("/v2/misc/guard", { h: hash }, networkId.value, onLoadList, onErrorList);
  }
  await cacheServerScamInfos();
  _toId = setTimeout(() => {
    loadGuard();
  }, 15 * 60 * 1e3);
};
const processReportImport = async (blockListImport) => {
  const {
    bulkAddGuardReport,
    getLastImportInfo
  } = GuardBlockListDB;
  let importInfo = await getLastImportInfo();
  if (importInfo && importInfo.lastHash === blockListImport.h) {
    return;
  }
  await bulkAddGuardReport(blockListImport);
  importInfo = await getLastImportInfo();
  _lastUpdate = importInfo?.timestamp ?? Date.now();
};
const onLoadList = async (data) => {
  if (data?.data) {
    const reports = data.data;
    await processReportImport(reports);
  } else {
    await onErrorList();
  }
};
const onErrorList = async () => {
};
let _loadedOnce = false;
const load = () => {
  if (_loadedOnce) {
    return;
  }
  _loadedOnce = true;
  loadGuard();
};
addSignalListener(doSetActiveApp, storeId, load);

let __initEternlPromise = void 0;
const _initEternlEnable = async (progress) => {
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
  await dispatchSignal(doInitApp);
  await dispatchSignal(doPostInitApp);
  if (progress) {
    progress.value = 100;
  }
};
const initEternl = (progress) => {
  if (!__initEternlPromise) {
    __initEternlPromise = _initEternlEnable(progress);
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

export { _initEternlEnable, initEternl };
