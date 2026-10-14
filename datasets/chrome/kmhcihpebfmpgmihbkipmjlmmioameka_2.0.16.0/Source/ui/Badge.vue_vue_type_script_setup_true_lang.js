import { aC as dispatchSignal, D as computed, P as networkId, m as createElementBlock, o as openBlock, v as createStaticVNode, d as defineComponent, u as unref, p as createBaseVNode, n as createVNode, w as useTranslation, G as watch, a1 as withDirectives, a2 as resolveDirective, c as createBlock, z as resolveComponent, U as withModifiers, V as normalizeClass, y as withCtx, t as createCommentVNode, a0 as renderSlot, W as resolveDynamicComponent, B as toDisplayString } from './index.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { s as sundaeswapLogo, v as vyfiLogo, w as wingridersLogo, l as liqwidLogo, a as adaHandleLogo } from './image.js';
import { I as IconCancel01 } from './IconCancel01.js';
import { I as IconAlert02 } from './IconAlert02.js';
import { bT as isScriptAddress, bU as getAccountName, bV as doRemovePendingTx, bW as getDonationAddress, bX as getBurnAddress, bY as getSwapFeeAddressMS, bZ as getSwapFeeAddressDH, b_ as getSwapFeeAddressSS, b$ as getFeeAddress, c0 as getEternlCollateralAddress } from './app2.js';
import './NetworkId.js';
import { a as getContractMappingByAddresses, b as getAddressBookEntryByAddress } from './contractMapping.js';
import { u as useSelectedAccount } from './epochParams.js';

const SendModeCardano = "cardano";
const SendModeCardanoScript = "cardanoScript";
const SendModeAdaHandle = "adaHandle";
const SendModeUnstoppableDomains = "unstoppableDomains";

const CONTRACT_BADGE = "CONTRACT_BADGE";

const { switchWalletAccount } = useSelectedAccount();
const feeAddr = computed(() => getFeeAddress(networkId.value));
const donationAddr = computed(() => getDonationAddress(networkId.value));
const swapFeeAddrMS = computed(() => getSwapFeeAddressMS(networkId.value));
const swapFeeAddrDH = computed(() => getSwapFeeAddressDH(networkId.value));
const swapFeeAddrSS = computed(() => getSwapFeeAddressSS(networkId.value));
const burnAddr = computed(() => getBurnAddress(networkId.value));
const collateralAddr = computed(() => getEternlCollateralAddress(networkId.value));
const addContractBadge = (addrList, badges) => {
  const contractList = getContractMappingByAddresses(addrList);
  const newBadges = [];
  for (const property of contractList) {
    newBadges.push(addToBadges(createContractBadge(property, void 0), badges));
  }
  return { contractList, newBadges };
};
const addScriptAddressBadge = (addr, addressScriptType, badges) => {
  if (addressScriptType && addressScriptType !== "unknown") {
    return addToBadges({
      id: addressScriptType,
      label: `badge:${addressScriptType}.label`
    }, badges);
  } else if (isScriptAddress(addr)) {
    return addToBadges({
      id: "script",
      label: "badge:script.label"
    }, badges);
  }
  return null;
};
const addInvalidScriptAddressBadge = (addr, badges) => {
  if (!isScriptAddress(addr)) {
    return addToBadges({
      id: "invalid-script",
      label: "badge:noscript.label",
      hover: "badge:noscript.hover"
    }, badges);
  }
};
const addPropBadge = (prop, id, badges) => {
  if (!prop) {
    return;
  }
  return addToBadges({ id }, badges);
};
const addAddressBookBadge = (addr, badges) => {
  const entry = getAddressBookEntryByAddress(addr);
  if (entry) {
    return addToBadges(createAddressBookBadge(entry, entry.mode === SendModeAdaHandle), badges);
  }
  return null;
};
const addDonationBadge = (addr, badges) => {
  if (addr === donationAddr.value) {
    return addToBadges({
      id: "donation",
      label: "badge:donation.label",
      hover: "badge:donation.hover",
      hoverParams: {}
    }, badges);
  }
  return null;
};
const addBurnBadge = (addr, badges) => {
  if (addr === burnAddr.value) {
    return addToBadges({
      id: "eternlburn",
      label: "badge:eternlburn.label",
      hover: "badge:eternlburn.hover"
    }, badges);
  }
  return null;
};
const addSwapFeeBadge = (addr, badges) => {
  if (addr === swapFeeAddrMS.value || swapFeeAddrDH.value.includes(addr) || swapFeeAddrSS.value.includes(addr)) {
    return addToBadges({
      id: "swapFee"
    }, badges);
  }
  return null;
};
const addEternlFeeBadge = (addr, badges) => {
  if (addr === feeAddr.value) {
    return addToBadges({
      id: "eternlFee"
    }, badges);
  }
  return null;
};
const addEternlCollateralBadge = (addr, badges) => {
  if (addr === collateralAddr.value) {
    return addToBadges({
      id: "eternlCollateral",
      label: "badge:collateral.label"
    }, badges);
  }
  return null;
};
const addExternalAccountBadge = (badges) => {
  return addToBadges({
    id: "ext",
    label: "badge:ext.label",
    hover: "badge:ext.hover"
  }, badges);
};
const createContractBadge = (contract, amount) => {
  const badge = {
    id: contract.label,
    position: Number.MIN_SAFE_INTEGER,
    label: contract.label,
    hover: "badge:contract.hover",
    hoverParams: { label: contract.label },
    bgColor: contract.bgColor,
    color: contract.color,
    type: CONTRACT_BADGE,
    amount
  };
  return badge;
};
const createAddressBookBadge = (entry, isAdaHandle = false) => {
  const badge = {
    id: "addressbook" + (isAdaHandle ? "_adahandle" : ""),
    label: entry.name,
    //  + ' (' + entry.mode + ')'
    hover: "addressBook:badge.hover",
    noCapitalize: true,
    hoverParams: { name: entry.name, mode: entry.mode }
  };
  return badge;
};
const createWalletBadge = (appWallet) => {
  if (!appWallet) {
    return null;
  }
  const name = appWallet.data.settings.name;
  const badge = {
    id: "wallet",
    label: name,
    hover: "badge:openWallet.hover",
    noCapitalize: true,
    hoverParams: { name },
    action: () => {
      switchWalletAccount(appWallet.id);
    }
  };
  return badge;
};
const createAccountBadge = (appAccount, addedWalletBadge = false) => {
  const name = getAccountName(appAccount.data).value;
  const badge = {
    id: "account" + (addedWalletBadge ? "-with-wallet" : ""),
    label: name,
    hover: "badge:switchAccount.hover",
    noCapitalize: true,
    hoverParams: { name },
    action: () => {
      switchWalletAccount(appAccount.walletId, appAccount.id);
    }
  };
  return badge;
};
const createRemoveBadge = (txHash, badges) => {
  const badge = {
    id: "remove",
    action: () => {
      if (txHash) {
        dispatchSignal(doRemovePendingTx, txHash);
      }
    }
  };
  addToBadges(badge, badges);
  return badge;
};
const createSubmitBadge = (submitTxFromBadge, badges) => {
  const badge = {
    id: "submit",
    action: () => {
      submitTxFromBadge?.();
    }
  };
  addToBadges(badge, badges);
  return badge;
};
const addToBadges = (badge, badges) => {
  if (!badge) {
    return null;
  }
  if (!badges.find((entry) => entry.id === badge.id)) {
    badges.push(badge);
    const config = getBadgeConfig(badge.id);
    if (config) {
      badge.bgColor = config.bgColor;
      badge.color = config.color;
    }
  }
  return badge;
};
const getBadgeConfig = (id) => {
  switch (id.toLowerCase()) {
    case "mint":
    case "reg":
    case "delegation":
    case "poolreg":
    case "signed":
    case "submit":
    case "notsubmitted":
    case "onchain":
    case "withdrawal":
    case "validfor":
    case "unlimited":
    case "donation":
    case "confirmed":
    case "new":
      return { bgColor: "#375337", color: "#e6e6e6" };
    case "pending":
    case "notchecked":
      return { bgColor: "#c86300", color: "#271601" };
    case "burn":
    case "remove":
    case "retired":
    case "unsigned":
      return { bgColor: "#420901", color: "#c88181" };
    case "staging":
      return { bgColor: "#ba8400", color: "#000000" };
    case "sc":
    case "smartcontract":
    case "smart-contract":
      return { bgColor: "rgba(255,204,45,1)", color: "#000000" };
    case "poolret":
    case "dereg":
      return { bgColor: "#533738", color: "#c3c3c3" };
    case "script":
    case "nativescript":
    case "timelock":
    case "pendingapproval":
    case "account-with-wallet-orange":
      return { bgColor: "#8e4b2a", color: "#ffffff" };
    case "expired":
    case "invalid":
    case "inactive":
    case "unregistered":
    case "vote-no":
    case "invalid-script":
      return { bgColor: "#ac0303", color: "#ffffff" };
    case "plutus":
    case "plutusV1":
    case "plutusV2":
    case "plutusV3":
      return { bgColor: "#151515", color: "#bcbcbc" };
    case "metadata":
    case "deposit":
      return { bgColor: "#1d3e6c", color: "#aeaeae" };
    case "gov":
    case "updated":
    case "awaitingothers":
      return { bgColor: "#1136a6", color: "#dadada" };
    case "milkomeda":
    case "catalyst":
    case "multisig":
    case "addressbook":
    case "addressbook_adahandle":
      return { bgColor: "#33492d", color: "#dadada" };
    case "adahandle":
      return { bgColor: "#0d0f26", color: "#ffffff" };
    case "vyfinance":
      return { bgColor: "#08070b", color: "#ffffff" };
    case "wingriders":
      return { bgColor: "#0d0d0d", color: "#ffffff" };
    case "liqwid finance":
      return { bgColor: "#040a2f", color: "#ffffff" };
    case "minswap":
      return { bgColor: "#111217", color: "#ffffff" };
    case "sundaeswap":
      return { bgColor: "#0d0517", color: "#ffffff" };
    case "strike":
      return { bgColor: "#72C59C", color: "#000000" };
    case "cswap":
    case "cswap dex":
      return { bgColor: "#000000", color: "#FFFFFF" };
    case "splash":
      return { bgColor: "#000000", color: "#FFFFFF" };
    case "eternlburn":
    case "spo":
    case "vote-yes":
    case "active":
      return { bgColor: "rgb(48,115,36)", color: "#e3e3e3" };
    case "account-with-wallet":
      return { bgColor: "rgb(9,80,7)", color: "#e3e3e3" };
    case "account":
    case "selfdelegated":
      return { bgColor: "rgb(12,36,159)", color: "#e3e3e3" };
    case "wallet":
    case "tx-hash-list":
    case "mpo":
      return { bgColor: "rgb(73,73,73)", color: "#e3e3e3" };
    case "defi":
      return { bgColor: "rgb(45,59,92)", color: "oklch(0.713 0.093 255.439)" };
    case "collectibles":
      return { bgColor: "rgb(223,207,160)", color: "oklch(0 0 0)" };
    case "social":
      return { bgColor: "oklch(0.555 0.111 307.839)", color: "oklch(0.952 0 89.876)" };
    case "tools":
      return { bgColor: "oklch(0.453 0.017 148.507)", color: "oklch(0.952 0 89.876)" };
    case "other":
      return { bgColor: "oklch(0.486 0.047 53.114)", color: "oklch(0.952 0 89.876)" };
    case "mints":
      return { bgColor: "#375337", color: "#e6e6e6" };
    case "unverified":
      return { bgColor: "#3c2b30", color: "#7c4141" };
    case "vote-notvoted":
      return { bgColor: "transparent", color: "#7c7c7c" };
  }
  return null;
};

const _sfc_main$d = {  };

const _hoisted_1$c = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$6(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$c, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<g id=\"Group\"><path id=\"Vector\" d=\"M23.6596 0.228564L14.7518 4.42156C14.5816 4.50655 14.5532 4.76153 14.7234 4.84653C15.773 5.38482 18.922 6.48973 20.6241 9.18118C20.6241 9.18118 16.766 5.52647 12 5.52647C7.23404 5.52647 3.37588 9.18118 3.37588 9.18118C5.07801 6.48973 8.22695 5.38482 9.27659 4.84653C9.44681 4.76153 9.44681 4.50655 9.24823 4.42156L0.340425 0.228564C0.198581 0.171901 0 0.285226 0 0.455212V12.8359C0 16.4623 1.84397 19.862 4.93617 21.7885C4.96454 21.8168 4.99291 21.8168 5.02128 21.8452C7.88652 23.6017 10.6667 23.8 12 23.8C13.4184 23.8 16.1135 23.6017 18.9787 21.8452C19.0071 21.8168 19.0355 21.8168 19.0638 21.7885C22.156 19.8903 24 16.4623 24 12.8359V0.455212C23.9716 0.256895 23.8014 0.14357 23.6596 0.228564Z\" fill=\"#89AAFF\"></path><g id=\"Group_2\"><path id=\"Vector (Stroke)\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.16848 13.5378C3.438 13.345 3.81277 13.4073 4.00555 13.6768C4.14128 13.8666 5.08226 15.1158 6.61994 15.0693C6.62282 15.0692 6.6257 15.0692 6.62858 15.0691C8.10154 15.0458 8.99684 13.8613 9.1288 13.6768C9.32157 13.4073 9.69634 13.345 9.96587 13.5378C10.2354 13.7306 10.2976 14.1054 10.1048 14.3749C9.95322 14.5869 8.75077 16.2334 6.65193 16.2689C4.44759 16.3333 3.17736 14.5816 3.02951 14.3749C2.83673 14.1054 2.89895 13.7306 3.16848 13.5378Z\" fill=\"#001947\"></path><path id=\"Vector (Stroke)_2\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.0337 13.5378C14.3032 13.345 14.678 13.4073 14.8708 13.6768C15.0065 13.8666 15.9475 15.1158 17.4852 15.0693C17.4881 15.0692 17.4909 15.0692 17.4938 15.0691C18.9668 15.0458 19.8621 13.8613 19.994 13.6768C20.1868 13.4073 20.5616 13.345 20.8311 13.5378C21.1006 13.7306 21.1628 14.1054 20.9701 14.3749C20.8185 14.5869 19.616 16.2334 17.5172 16.2689C15.3128 16.3333 14.0426 14.5816 13.8947 14.3749C13.702 14.1054 13.7642 13.7306 14.0337 13.5378Z\" fill=\"#001947\"></path></g><path id=\"Vector_2\" d=\"M10.2948 16.9156L11.8834 17.9922C11.9969 18.0772 12.1671 18.0772 12.2522 17.9922L13.8409 16.9156C14.0394 16.774 13.926 16.519 13.6423 16.519H10.465C10.238 16.519 10.0962 16.774 10.2948 16.9156Z\" fill=\"#001947\"></path></g>", 1)
  ]))]))
}
const IconMinSwap = /*#__PURE__*/_export_sfc(_sfc_main$d, [['render',_sfc_render$6]]);

const _hoisted_1$b = ["src"];
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "IconSundaeSwap",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        src: unref(sundaeswapLogo),
        alt: "SundaeSwap logo"
      }, null, 8, _hoisted_1$b);
    };
  }
});

const _hoisted_1$a = ["src"];
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "IconVyfi",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        src: unref(vyfiLogo),
        alt: "Vyfi logo"
      }, null, 8, _hoisted_1$a);
    };
  }
});

const _hoisted_1$9 = ["src"];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "IconWingriders",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        src: unref(wingridersLogo),
        alt: "WingRiders logo"
      }, null, 8, _hoisted_1$9);
    };
  }
});

const _hoisted_1$8 = ["src"];
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "IconLiqwid",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        src: unref(liqwidLogo),
        alt: "Liqwid logo"
      }, null, 8, _hoisted_1$8);
    };
  }
});

const _hoisted_1$7 = ["src"];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "IconAdaHandle",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        src: unref(adaHandleLogo),
        alt: "ADA Handle logo"
      }, null, 8, _hoisted_1$7);
    };
  }
});

const _sfc_main$7 = {  };

const _hoisted_1$6 = { class: "w-full aspect-square flex et-jc-ic bg-bg-3 rounded-full overflow-hidden" };

function _sfc_render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("div", _hoisted_1$6, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("i", { class: "pi pi-address-book" }, null, -1)
  ]))]))
}
const IconAddressBook = /*#__PURE__*/_export_sfc(_sfc_main$7, [['render',_sfc_render$5]]);

const _sfc_main$6 = {  };

const _hoisted_1$5 = {
  id: "Layer_1",
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.1",
  viewBox: "0 0 51 51"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$5, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "#72c59c",
      d: "M25.5,51c14.08,0,25.5-11.42,25.5-25.5S39.58,0,25.5,0,0,11.42,0,25.5s11.42,25.5,25.5,25.5Z"
    }, null, -1),
    createBaseVNode("path", {
      fill: "#010101",
      d: "M37.16,26.14c1.18,1.22,1.91,2.88,1.91,4.72,0,3.69-2.94,6.69-6.61,6.77h-5.73l-3.08,3.39-6.08,6.7,1.95-8.83.28-1.25h-9.66l4.7-5.91h8.73l-1.3,5.91-.39,1.77,1.61-1.77,5.37-5.91,2.73-3h-12.47s-.57,0-.57,0h0c-1.84-.05-3.51-.83-4.7-2.06-1.18-1.22-1.91-2.88-1.91-4.72,0-3.69,2.94-6.69,6.61-6.77h5.73l3.08-3.39,6.08-6.7-1.95,8.83-.28,1.25h9.66l-4.7,5.91h-8.73l1.3-5.91.39-1.77-1.61,1.77-5.37,5.91-2.73,3h12.47s.57,0,.57,0h0c1.84.05,3.51.83,4.7,2.06h0Z"
    }, null, -1)
  ]))]))
}
const IconStrike = /*#__PURE__*/_export_sfc(_sfc_main$6, [['render',_sfc_render$4]]);

const _sfc_main$5 = {  };

const _hoisted_1$4 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "28",
  height: "32",
  viewBox: "0 0 28 32",
  fill: "none"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$4, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path d=\"M14 32L28 24V16V8L14 16V32Z\" fill=\"url(#paint0_linear_5140_22880)\"></path><path d=\"M14 0L0 8L14 16L28 8L14 0Z\" fill=\"url(#paint1_linear_5140_22880)\"></path><path d=\"M0 8V24L14 32V16L0 8Z\" fill=\"url(#paint2_linear_5140_22880)\"></path><path d=\"M14.4395 8.56104C14.4395 8.56104 20.2205 11.8357 20.3081 11.9506C20.3957 12.0655 20.4037 12.188 20.3373 12.2953C20.165 12.4634 20.0535 12.4854 19.8409 12.3815L14.4395 9.3079V15.6053H19.8993V20.1661L14.4979 23.2397C14.2059 23.3546 13.8847 22.9197 14.2643 22.6939C16.2155 21.5332 17.3934 20.9534 19.3446 19.7926V16.2161H13.8555V4.02244L12.2205 3.18941L1.91392 9.09375V21.0278L6.46866 23.5959C6.63913 23.4458 6.86423 23.3546 7.111 23.3546C7.64313 23.3546 8.07451 23.779 8.07451 24.3025C8.07451 24.826 7.64313 25.2504 7.111 25.2504C6.57887 25.2504 6.1475 24.826 6.1475 24.3025C6.1475 24.2335 6.15499 24.1662 6.16922 24.1014L1.30078 21.3151V8.74609L12.3081 2.5C13.129 2.97887 13.6185 3.19887 14.4395 3.67774V8.56104Z\" fill=\"black\"></path><path d=\"M24.4541 10.0234L20.0453 7.54006C19.8787 7.67541 19.6651 7.75673 19.4322 7.75673C18.9 7.75673 18.4687 7.33233 18.4687 6.8088C18.4687 6.28527 18.9 5.86086 19.4322 5.86086C19.9643 5.86086 20.3957 6.28527 20.3957 6.8088C20.3957 6.87207 20.3894 6.93389 20.3774 6.9937L25.1256 9.65234V22.1768L14.001 28.5L12.0453 27.2899V23.3833L6.58545 20.1948V11.7639L12.1621 8.56104C12.5417 8.38869 12.7752 8.87702 12.4541 9.04937L7.19859 12.1088V19.8501L12.6292 23.096V27.0027L14.001 27.8357L24.4541 21.9183V10.0234Z\" fill=\"black\"></path><defs><linearGradient id=\"paint0_linear_5140_22880\" x1=\"25.5036\" y1=\"28.8977\" x2=\"25.599\" y2=\"14.7221\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#00D330\"></stop><stop offset=\"0.891595\" stop-color=\"#00EAD4\"></stop></linearGradient><linearGradient id=\"paint1_linear_5140_22880\" x1=\"63.2701\" y1=\"-0.847396\" x2=\"3.4532\" y2=\"6.48843\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0.6525\" stop-color=\"#01E735\"></stop><stop offset=\"1\" stop-color=\"#00EAD4\"></stop></linearGradient><linearGradient id=\"paint2_linear_5140_22880\" x1=\"1.76642\" y1=\"17.307\" x2=\"1.25881\" y2=\"25.3687\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#01E735\"></stop><stop offset=\"1\" stop-color=\"#00EAD4\"></stop></linearGradient></defs>", 6)
  ]))]))
}
const IconCSwap = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$3]]);

const _sfc_main$4 = {  };

const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  id: "Layer_2",
  "data-name": "Layer 2",
  viewBox: "0 0 202.85 140.87"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<defs><linearGradient id=\"linear-gradient\" x1=\"56.04\" y1=\"110.12\" x2=\"189.05\" y2=\"42.88\" gradientTransform=\"translate(0 140.87) scale(1 -1)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#00fff6\"></stop><stop offset=\"1\" stop-color=\"#0059ff\"></stop></linearGradient><linearGradient id=\"linear-gradient-2\" x1=\"165.53\" y1=\"26.38\" x2=\"1.04\" y2=\"86.43\" xlink:href=\"#linear-gradient\"></linearGradient></defs><g id=\"Layer_1-2\" data-name=\"Layer 1\"><path class=\"cls-2\" fill=\"url(#linear-gradient)\" d=\"M66.25,140.87h70.39c0-37.62,29.75-68.26,66.22-68.26V0C127.53,0,66.25,63.12,66.25,140.87Z\"></path><path class=\"cls-1\" fill=\"url(#linear-gradient-2)\" d=\"M136.61,140.87h-70.39c0-37.62-29.75-68.26-66.22-68.26V0c75.32,0,136.61,63.12,136.61,140.87Z\"></path></g>", 2)
  ]))]))
}
const IconSplash = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render$2]]);

const _sfc_main$3 = {  };

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  id: "Layer_2",
  "data-name": "Layer 2",
  viewBox: "0 0 27.14 33.9"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<g id=\"Layer_1-2\" data-name=\"Layer 1\"><path fill=\"#000\" fill-rule=\"evenodd\" d=\"M4.25,1.54c-1.5,0-2.71,1.21-2.71,2.71v25.39c0,1.5,1.21,2.71,2.71,2.71h18.63c1.5,0,2.71-1.21,2.71-2.71V12.36c0-.74-.3-1.45-.84-1.96L16.31,2.3c-.5-.48-1.18-.75-1.88-.75H4.25ZM3.35,4.25c0-.5.4-.9.9-.9h9.65v8.32c0,.44.36.79.79.79h9.08s.01,0,.02,0v17.18c0,.5-.4.9-.9.9H4.25c-.5,0-.9-.4-.9-.9V4.25Z\"></path><path fill=\"#FFF\" d=\"M24.77,10.4l-1.07,1.11h0l1.07-1.11ZM16.31,2.3l-1.07,1.11,1.07-1.11ZM13.9,3.35h1.54v-1.54h-1.54v1.54ZM13.9,11.67h1.54-1.54ZM14.69,12.46v1.54h0v-1.54ZM23.77,12.46v-1.54h0v1.54ZM23.79,12.46h1.54v-1.58l-1.58.04.04,1.54ZM3.09,4.25c0-.65.52-1.17,1.17-1.17V0C1.9,0,0,1.9,0,4.25h3.09ZM3.09,29.64V4.25H0v25.39h3.09ZM4.25,30.81c-.65,0-1.17-.52-1.17-1.17H0c0,2.35,1.9,4.25,4.25,4.25v-3.09ZM22.89,30.81H4.25v3.09h18.63v-3.09ZM24.06,29.64c0,.65-.52,1.17-1.17,1.17v3.09c2.35,0,4.25-1.9,4.25-4.25h-3.09ZM24.06,12.36v17.29h3.09V12.36h-3.09ZM23.7,11.51c.23.22.36.53.36.84h3.09c0-1.16-.47-2.27-1.31-3.07l-2.14,2.23ZM15.24,3.41l8.45,8.1,2.14-2.23L17.38,1.18l-2.14,2.23ZM14.43,3.09c.3,0,.59.12.81.32l2.14-2.23c-.79-.76-1.85-1.18-2.94-1.18v3.09ZM4.25,3.09h10.18V0H4.25v3.09ZM4.25,1.81c-1.35,0-2.45,1.1-2.45,2.45h3.09c0,.35-.29.64-.64.64V1.81ZM13.9,1.81H4.25v3.09h9.65V1.81ZM15.44,11.67V3.35h-3.09v8.32h3.09ZM14.69,10.92c.41,0,.75.34.75.75h-3.09c0,1.29,1.05,2.34,2.34,2.34v-3.09ZM23.77,10.92h-9.08v3.09h9.08v-3.09ZM23.75,10.92s.01,0,.02,0v3.09s.04,0,.06,0l-.08-3.08ZM25.34,29.64V12.46h-3.09v17.18h3.09ZM22.89,32.09c1.35,0,2.45-1.1,2.45-2.45h-3.09c0-.35.29-.64.64-.64v3.09ZM4.25,32.09h18.63v-3.09H4.25v3.09ZM1.81,29.64c0,1.35,1.1,2.45,2.45,2.45v-3.09c.35,0,.64.29.64.64H1.81ZM1.81,4.25v25.39h3.09V4.25H1.81Z\"></path><rect fill=\"#FFF\" x=\"2.88\" y=\"11.91\" width=\"21.39\" height=\"14.46\"></rect><rect fill=\"#FFF\" x=\"2.88\" y=\"2.76\" width=\"11.61\" height=\"22.47\"></rect><path fill=\"#ffc900\" d=\"M4.67,25.24h17.72c1.72,0,3.11,1.39,3.11,3.11h0c0,1.72-1.39,3.11-3.11,3.11H4.67c-1.72,0-3.11-1.39-3.11-3.11h0c0-1.72,1.39-3.11,3.11-3.11Z\"></path><path stroke=\"#000\" fill=\"none\" stroke-width=\"1.81px\" d=\"M4.25,2.45h10.18c.47,0,.91.18,1.25.5l8.45,8.1c.36.34.56.81.56,1.31v17.29c0,1-.81,1.81-1.81,1.81H4.25c-1,0-1.81-.81-1.81-1.81V4.25c0-1,.81-1.81,1.81-1.81Z\"></path><path stroke=\"#000\" stroke-width=\"1.81px\" d=\"M18.97,7.44h0s0,0,0,0l4.51,4.1h-8.69V3.53l4.17,3.92Z\"></path></g>", 1)
  ]))]))
}
const IconJPGStore = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render$1]]);

const _sfc_main$2 = {  };

const _hoisted_1$1 = { class: "flex et-jc-ic -mr-1" };

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("i", { class: "pi pi-spinner origin-center animate-spin" }, null, -1)
  ]))]))
}
const IconSpinnerSmall = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render]]);

const _hoisted_1 = { class: "flex et-jc-ic -mr-1" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "IconCancel01Small",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(IconCancel01, { class: "size-4" })
      ]);
    };
  }
});

const contractIconMap = {
  "minswap": IconMinSwap,
  "sundaeswap": _sfc_main$c,
  "vyfinance": _sfc_main$b,
  "wingriders": _sfc_main$a,
  "liqwid finance": _sfc_main$9,
  "strike": IconStrike,
  "cswap": IconCSwap,
  "cswap dex": IconCSwap,
  "splash": IconSplash,
  "jpg.store": IconJPGStore
};
const contractURLMap = {
  "minswap": "https://minswap.org/",
  "sundaeswap": "https://app.sundae.fi/",
  "vyfinance": "https://app.vyfi.io/",
  "wingriders": "https://app.wingriders.com/",
  "liqwid finance": "https://v2.liqwid.finance/",
  "strike": "https://app.strikefinance.org/perpetuals/ada"
};
const idIconMap = {
  "adaHandle": _sfc_main$8,
  "addressbook": IconAddressBook,
  "addressbook_adahandle": IconAddressBook,
  "pending": IconSpinnerSmall,
  "remove": _sfc_main$1,
  "retired": IconAlert02
};
const getContractIconByLabel = (contract) => contractIconMap[contract.toLowerCase()] ?? null;
const getContractURL = (contract) => contractURLMap[contract.toLowerCase()] ?? null;
const getIconById = (id) => idIconMap[id] ?? null;

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Badge",
  props: {
    badge: { type: Object, required: true },
    size: { type: String, required: false, default: void 0 },
    cssLabel: { type: String, required: false, default: "" },
    cssBadge: { type: String, required: false, default: "" },
    noAction: { type: Boolean, required: false, default: false },
    noHover: { type: Boolean, required: false, default: false },
    forceButton: { type: Boolean, required: false, default: false },
    addColors: { type: Boolean, required: false, default: false },
    translationNamespace: { type: String, required: false, default: "badge" },
    translationPrefix: { type: String, required: false, default: "" }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const iconRight = computed(() => props.badge.iconRight);
    const icon = computed(() => props.badge.icon ?? getContractIconByLabel(props.badge.label ?? "") ?? getIconById(props.badge.id ?? ""));
    const url = computed(() => getContractURL(props.badge.label ?? "") ?? getContractURL(props.badge.id ?? ""));
    const isButton = computed(() => props.forceButton || props.badge.id && !!props.badge.action && !props.noAction || url.value);
    const isSelected = computed(() => props.badge.isSelected ?? false);
    const capitalizeFirstLetter = (str) => {
      if (!str) return "";
      if (str.length === 0) return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const getTranslationPrefix = computed(() => {
      let prefix = "";
      if (props.translationNamespace) {
        prefix = props.translationNamespace + ":";
      }
      if (props.translationPrefix) {
        prefix = prefix + props.translationPrefix + ".";
      }
      return prefix;
    });
    const label = computed(() => {
      let label2 = props.badge.label ?? $t(getTranslationPrefix.value + props.badge.id + ".label");
      if (props.badge.id === "adaHandle") {
        return label2.substring(1);
      }
      return label2;
    });
    const hover = computed(() => {
      if (props.noHover) {
        return void 0;
      }
      let hover2 = props.badge.hover;
      return hover2;
    });
    const padding = computed(() => {
      let p = "px-4 py-2";
      if (props.size === "tiny") {
        p = "px-2 py-0.5";
      } else if (props.size === "small") {
        p = "px-4 py-1";
      } else if (props.size === "large") {
        p = "px-4 py-4";
      }
      if (icon.value) {
        if (props.size === "tiny") {
          p = "pl-1.25 py-0.5 pr-2";
        } else if (props.size === "small") {
          p = "pl-0.75 py-0.75 pr-3";
        } else if (props.size === "large") {
          p = "pl-2 py-2 pr-5";
        } else {
          p = "pl-1 py-1 pr-4";
        }
      }
      return p;
    });
    const iconSize = computed(() => {
      if (props.size === "tiny") {
        return "size-3";
      } else if (props.size === "small") {
        return "size-6";
      } else if (props.size === "large") {
        return "size-10";
      }
      return "size-8";
    });
    const triggerBadgeAction = (event, badge) => {
      if (!isButton.value) {
        return;
      }
      if (badge.action) {
        badge.action?.(event);
      } else if (url.value) {
        window.open(url.value, "_blank", "noopener,noreferrer");
      }
    };
    watch(() => props.badge, () => {
      if (props.badge && props.addColors) {
        Object.assign(props.badge, getBadgeConfig(props.badge.id));
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return withDirectives((openBlock(), createBlock(_component_Button, {
        class: normalizeClass([
          "border shadow-xs shadow-dark/25",
          (isButton.value ? "cursor-pointer" : "cursor-default " + (!!hover.value ? "" : "pointer-events-none")) + " " + padding.value + " " + __props.cssBadge + " " + (__props.size === "tiny" ? "et-text-xs! font-medium" : "") + " " + (isSelected.value ? "grayscale" : "")
        ]),
        readonly: !isButton.value,
        tabindex: isButton.value ? 0 : -1,
        size: __props.size === "tiny" ? "small" : __props.size,
        pt: {
          root: {
            class: icon.value ? "px-0" : "",
            style: {
              "border-color": __props.badge.bgColor === "transparent" ? __props.badge.color : __props.badge.bgColor || "var(--p-surface-800)",
              "background": __props.badge.bgColor || "var(--p-surface-800)",
              "color": __props.badge.color || "var(--p-surface-100)"
            }
          }
        },
        rounded: "",
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => triggerBadgeAction($event, __props.badge), ["stop", "prevent"]))
      }, {
        default: withCtx(() => [
          icon.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["shrink-0", __props.size === "tiny" || __props.size === "small" ? "-mr-0.5" : "mr-1"])
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(icon.value), {
              class: normalizeClass(["shrink-0", iconSize.value])
            }, null, 8, ["class"]))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(__props.cssLabel + " truncate " + (__props.badge.noCapitalize ? "" : "capitalize") + " " + (__props.badge.id === "adaHandle" ? "pl-0 pr-1" : ""))
          }, toDisplayString(label.value), 3),
          iconRight.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["shrink-0", __props.size === "tiny" || __props.size === "small" ? "-mx-0.5" : "ml-1"])
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(iconRight.value), {
              class: normalizeClass(["shrink-0", iconSize.value])
            }, null, 8, ["class"]))
          ], 2)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "suffix")
        ]),
        _: 3
      }, 8, ["class", "readonly", "tabindex", "size", "pt"])), [
        [
          _directive_tooltip,
          capitalizeFirstLetter(hover.value),
          void 0,
          { top: true }
        ]
      ]);
    };
  }
});

export { CONTRACT_BADGE as C, SendModeAdaHandle as S, _sfc_main as _, addContractBadge as a, addPropBadge as b, createContractBadge as c, createSubmitBadge as d, createRemoveBadge as e, addInvalidScriptAddressBadge as f, getBadgeConfig as g, addToBadges as h, createWalletBadge as i, createAccountBadge as j, addExternalAccountBadge as k, addAddressBookBadge as l, addDonationBadge as m, addBurnBadge as n, addSwapFeeBadge as o, addEternlFeeBadge as p, addEternlCollateralBadge as q, addScriptAddressBadge as r, SendModeCardano as s, SendModeCardanoScript as t, SendModeUnstoppableDomains as u };
