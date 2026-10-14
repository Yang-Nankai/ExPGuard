import { P as networkId, aC as dispatchSignal } from './index.js';
import { di as loadCSL, cf as getCSLBigNum, dj as doSetActiveApp, dk as doInitFirstWorker, ax as doInitApp, dh as doPostInitApp } from './app2.js';
import { l as loadCMS } from './cms.js';
import { g as getEternlInitPromise, s as setEternlInitPromise } from './guard.js';
import './currency.js';
import './language.js';
import './decryptedMsg.js';
import './NetworkId.js';
import './bigmath.js';
import './epochParams.js';
import './useAppAccountBalances.js';
import './chainTip.js';
import './chain.js';
import './appState.js';
import './contractMapping.js';
import './lib.js';
import './creds.js';
import './ErrorSignTx.js';
import './useSignTx.js';
import './useSelectedAccount.js';
import './useGuards.js';
import './useCurrencyAPI.js';
import './currency2.js';

let __initEternlPromise = void 0;
const _initEternlTxViewer = async (progress) => {
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
    __initEternlPromise = _initEternlTxViewer(progress);
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

export { _initEternlTxViewer, initEternl };
