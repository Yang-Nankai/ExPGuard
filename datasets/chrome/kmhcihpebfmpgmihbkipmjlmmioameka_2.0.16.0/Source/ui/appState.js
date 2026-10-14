import { db as isDappAccountEnabled, dc as isDappAccountSet, dd as dappWalletId, de as dappAccountId, df as onSyncLeader } from './app2.js';
import { i as useAccountSettings, j as useAppAccountBalances, u as useWalletSettings, k as useAppAccount, n as useAppWallet } from './useAppAccountBalances.js';
import { D as computed, dm as isEnableMode, dn as isSignMode, dp as isSidePanel, aV as now, aC as dispatchSignal, dq as doSendOpen } from './index.js';
import { g as getRandomId } from './epochParams.js';

const appWallet = useAppWallet(dappWalletId);
const walletSettings = useWalletSettings(appWallet);
const walletData = walletSettings.data;
const appAccount = useAppAccount(appWallet, dappAccountId);
const appAccountBalances = useAppAccountBalances(appAccount);
const accountSettings = useAccountSettings(appAccount);
const accountData = accountSettings.data;
const accountBalance = computed(() => accountData.value?.balance);
const utxoMap = accountSettings.utxoMap;
const hasDappAccount = computed(() => !!appWallet.value);
const hasDappWallet = computed(() => !!appAccount.value);
const isDappWallet = (walletId) => !!walletId && walletId === dappWalletId.value;
function useDappAccount() {
  return {
    hasDappAccount,
    hasDappWallet,
    dappAccountId,
    dappWalletId,
    isDappAccountSet,
    isDappAccountEnabled,
    dappWallet: appWallet,
    dappAccount: appAccount,
    walletData,
    walletSettings,
    accountData,
    accountSettings,
    accountBalance,
    accountBalances: appAccountBalances,
    utxoMap,
    isDappWallet
  };
}

let _toid = -1;
const createAppId = () => {
  if (typeof window === "undefined") {
    return getRandomId();
  }
  const appId = window.name === "" ? getRandomId() : window.name;
  window.name = appId;
  return appId;
};
const instanceAppId = createAppId();
const startTime = now();
const appStateList = [{ id: instanceAppId, ping: startTime }];
const isSyncLeader = () => {
  if (isEnableMode() || isSignMode() || isSidePanel()) {
    return false;
  }
  return appStateList.length > 0 && appStateList[appStateList.length - 1].id === instanceAppId;
};
const removeAllForeignIds = () => {
  clearTimeout(_toid);
  let found = 0;
  for (let i = appStateList.length - 1; i >= 0; i--) {
    if (appStateList[i].id === instanceAppId) {
      found++;
      if (found > 1) {
        appStateList.splice(i, 1);
      }
    }
  }
};
const onAppOpen = (appId) => {
  removeAllForeignIds();
  appStateList.push({ id: appId, ping: now() });
  return dispatchSignal(onSyncLeader, isSyncLeader());
};
const onAppClose = (appId) => {
  removeAllForeignIds();
  _toid = setTimeout(() => {
    setActiveInstance();
  }, 25 + (appStateList.length - 1) * 1e3);
  return dispatchSignal(onSyncLeader, isSyncLeader());
};
const setActiveInstance = async () => {
  if (isEnableMode() || isSignMode() || isSidePanel()) {
    return false;
  }
  await onAppOpen(instanceAppId);
  return dispatchSignal(doSendOpen, instanceAppId);
};

export { onAppClose as a, instanceAppId as b, isSyncLeader as i, onAppOpen as o, setActiveInstance as s, useDappAccount as u };
