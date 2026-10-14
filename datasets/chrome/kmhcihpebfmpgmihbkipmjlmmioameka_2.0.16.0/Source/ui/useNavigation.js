import { e as ref, bB as getRouter, N as nextTick, aC as dispatchSignal, P as networkId } from './index.js';
import { u as useSelectedAccount } from './epochParams.js';
import { o as onNavigateToSend } from './send.js';
import { u as useResetScroll } from './useResetScroll.js';

const { resetScroll } = useResetScroll();
const payload = ref({});
const getParams = (gotoNetworkId, gotoWalletId) => {
  const params = {};
  if (gotoNetworkId) {
    params.networkid = gotoNetworkId;
  }
  if (gotoWalletId) {
    params.walletid = gotoWalletId;
  }
  return params;
};
const goto = (pageList, walletId, tabId, group) => {
  nextTick(() => resetScroll());
  const router = getRouter();
  const page = pageList.shift();
  if (page && router) {
    const {
      selectedWalletId,
      switchWalletAccount
    } = useSelectedAccount();
    if (walletId && selectedWalletId.value !== walletId) {
      switchWalletAccount(walletId);
    }
    router.push({ name: page, params: getParams(networkId.value, walletId) });
  } else {
    if (pageList.length > 0) {
      goto(pageList);
    }
  }
};
const gotoDirect = (page, replace = false) => {
  nextTick(() => resetScroll());
  const router = getRouter();
  if (router) {
    router.push({ name: page, replace });
  }
};
const gotoLogin = () => gotoDirect("PageLogin", true);
const gotoWelcome = () => goto(["PageWelcome"]);
const gotoHome = () => goto(["PageWallet"]);
const gotoWalletList = () => goto(["Wallets", "PageWallet"]);
const gotoPage = (page) => goto([page, "PageWallet"]);
const gotoDAppBrowserPage = (page, tabid) => goto([page, "DAppBrowser"], void 0);
const gotoDAppBrowserAndOpen = (tabid, dapp) => {
  payload.value = dapp;
  goto(["DApps", " DAppBrowser"], void 0);
};
const gotoDirectConnect = (page, tabid) => goto([page, "PageWallet"], void 0);
const gotoWalletPage = (page, tabId) => openWalletPage(page, void 0);
const openWalletPage = (page, walletId, tabId) => {
  goto([page, "PageAccountOverview"], walletId);
};
const openWallet = (walletId, page = "PageAccountOverview") => {
  openWalletPage(page, walletId);
};
const goBack = () => {
  const router = getRouter();
  router?.back();
};
const gotoSendWithAsset = async (policy, hexName) => {
  const router = getRouter();
  const state = { sendInfo: { p: policy, h: hexName } };
  router?.push({
    name: "PageSend",
    state
  }).then(() => {
    nextTick(() => {
      dispatchSignal(onNavigateToSend, state);
    });
  });
};
const gotoSend = (paymentData) => {
  const router = getRouter();
  if (!router) {
    return;
  }
  const state = { paymentData };
  router.push({ name: "PageSend" }).then(() => {
    nextTick(() => {
      dispatchSignal(onNavigateToSend, state);
    });
  });
};
const gotoSwapWithAsset = async (policy, hexName) => {
  const router = getRouter();
  const state = { swapInfo: { p: policy, h: hexName } };
  router?.push({
    name: "PageSwap",
    state
  });
};
const useNavigation = () => {
  return {
    openWallet,
    openWalletPage,
    gotoWelcome,
    gotoLogin,
    gotoHome,
    gotoPage,
    gotoDAppBrowserPage,
    gotoDAppBrowserAndOpen,
    gotoDirectConnect,
    gotoSend,
    gotoWalletList,
    gotoWalletPage,
    goBack,
    //gotoWalletSettingGroup,
    gotoSendWithAsset,
    gotoSwapWithAsset,
    payload
  };
};

export { useNavigation as u };
