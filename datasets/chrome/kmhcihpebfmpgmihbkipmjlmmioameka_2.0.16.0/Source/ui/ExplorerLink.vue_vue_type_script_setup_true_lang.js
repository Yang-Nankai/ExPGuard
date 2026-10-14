import { bD as getRef, bE as forceSetLS, P as networkId, e as ref, D as computed, m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, ab as mergeModels, ac as useModel, w as useTranslation, Y as toRefs, aP as markRaw, cN as onClickOutside, a8 as useElementSize, G as watch, ad as dispatchSignalSync, cJ as doOpenTxViewer, f as onMounted, aE as addSignalListener, cO as onUpdateExplorer, k as onUnmounted, aF as removeSignalListener, V as normalizeClass, a0 as renderSlot, t as createCommentVNode, n as createVNode, N as nextTick, aJ as toHexString } from './index.js';
import { g as getRandomId } from './epochParams.js';
import { x as formatAssetName } from './useAppAccountBalances.js';
import { bh as decodeBech32, bf as getDRepAddressFromKeyHashOld, X as getAssetIdBech32, V as getAddressCredentials } from './app2.js';
import { c as copyToClipboard } from './index3.js';
import { u as useNotifications } from './useNotification.js';
import { _ as _sfc_main$3 } from './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { I as IconInformationCircle } from './IconInformationCircle.js';
import { I as IconCopy01 } from './IconCopy01.js';
import { I as IconLinkSquare01 } from './IconLinkSquare01.js';

const createIURL = (ref) => {
  return {
    parameters: ref?.parameters ?? []
  };
};
const createIExplorerItem = (ref) => {
  return {
    id: ref?.id ?? "",
    baseUrl: ref?.baseUrl ?? "",
    abbrev: ref?.abbrev ?? "",
    icon: ref?.icon ?? "",
    txUrl: ref?.txUrl ?? null,
    blocksUrl: ref?.blocksUrl ?? null,
    poolUrl: ref?.poolUrl ?? null,
    addressUrl: ref?.addressUrl ?? null,
    tokenUrl: ref?.tokenUrl ?? null,
    policyUrl: ref?.policyUrl ?? null,
    epochUrl: ref?.epochUrl ?? null,
    stakeUrl: ref?.stakeUrl ?? null,
    govDRepUrl: ref?.govDRepUrl ?? null,
    govProposalUrl: ref?.govProposalUrl ?? null
  };
};

var ExplorerSettings;
((ExplorerSettings2) => {
  ExplorerSettings2.EXPLORER = "explorer";
  ExplorerSettings2.TRANSACTION_EXPLORER = "transaction_explorer";
  ExplorerSettings2.BLOCK_EXPLORER = "block_explorer";
  ExplorerSettings2.POOL_EXPLORER = "pool_explorer";
  ExplorerSettings2.ADDRESS_EXPLORER = "address_explorer";
  ExplorerSettings2.STAKE_ADDRESS_EXPLORER = "stake_address_explorer";
  ExplorerSettings2.TOKEN_EXPLORER = "token_explorer";
  ExplorerSettings2.POLICY_EXPLORER = "policy_explorer";
  ExplorerSettings2.EPOCH_EXPLORER = "epoch_explorer";
  ExplorerSettings2.STAKE_EXPLORER = "stake_explorer";
  ExplorerSettings2.GOV_DREP_EXPLORER = "gov_drep_explorer";
  ExplorerSettings2.GOV_PROPOSAL_EXPLORER = "gov_proposal_explorer";
})(ExplorerSettings || (ExplorerSettings = {}));
const getBlockExplorer = (networkId) => getRef(ExplorerSettings.BLOCK_EXPLORER + "_" + networkId, "");
const setBlockExplorer = (networkId, id) => {
  getRef(ExplorerSettings.BLOCK_EXPLORER + "_" + networkId, "").value = id;
  forceSetLS(ExplorerSettings.BLOCK_EXPLORER + "_" + networkId, id);
};
const getPoolExplorer = (networkId) => getRef(ExplorerSettings.POOL_EXPLORER + "_" + networkId, "");
const setPoolExplorer = (networkId, id) => {
  getRef(ExplorerSettings.POOL_EXPLORER + "_" + networkId, "").value = id;
  forceSetLS(ExplorerSettings.POOL_EXPLORER + "_" + networkId, id);
};
const getAddressExplorer = (networkId) => getRef(ExplorerSettings.ADDRESS_EXPLORER + "_" + networkId, "");
const setAddressExplorer = (networkId, id) => {
  getRef(ExplorerSettings.ADDRESS_EXPLORER + "_" + networkId, "").value = id;
  forceSetLS(ExplorerSettings.ADDRESS_EXPLORER + "_" + networkId, id);
};
const getStakeAddressExplorer = (networkId) => getRef(ExplorerSettings.STAKE_ADDRESS_EXPLORER + "_" + networkId, "");
const setStakeAddressExplorer = (networkId, id) => {
  getRef(ExplorerSettings.STAKE_ADDRESS_EXPLORER + "_" + networkId, "").value = id;
  forceSetLS(ExplorerSettings.STAKE_ADDRESS_EXPLORER + "_" + networkId, id);
};
const getTokenExplorer = (networkId) => getRef(ExplorerSettings.TOKEN_EXPLORER + "_" + networkId, "");
const setTokenExplorer = (networkId, id) => {
  getRef(ExplorerSettings.TOKEN_EXPLORER + "_" + networkId, "").value = id;
  forceSetLS(ExplorerSettings.TOKEN_EXPLORER + "_" + networkId, id);
};
const setPolicyExplorer = (networkId, id) => {
  getRef(ExplorerSettings.POLICY_EXPLORER + "_" + networkId, "").value = id;
  forceSetLS(ExplorerSettings.POLICY_EXPLORER + "_" + networkId, id);
};
const getGovDRepExplorer = (networkId) => getRef(ExplorerSettings.GOV_DREP_EXPLORER + "_" + networkId, "");
const setGovDRepExplorer = (networkId, id) => {
  getRef(ExplorerSettings.GOV_DREP_EXPLORER + "_" + networkId, "").value = id;
  forceSetLS(ExplorerSettings.GOV_DREP_EXPLORER + "_" + networkId, id);
};
const getGovProposalExplorer = (networkId) => getRef(ExplorerSettings.GOV_PROPOSAL_EXPLORER + "_" + networkId, "");
const setGovProposalExplorer = (networkId, id) => {
  getRef(ExplorerSettings.GOV_PROPOSAL_EXPLORER + "_" + networkId, "").value = id;
  forceSetLS(ExplorerSettings.GOV_PROPOSAL_EXPLORER + "_" + networkId, id);
};
const getTransactionExplorer = (networkId) => getRef(ExplorerSettings.TRANSACTION_EXPLORER + "_" + networkId, "");
const setTransactionExplorer = (networkId, id) => {
  getRef(ExplorerSettings.TRANSACTION_EXPLORER + "_" + networkId, "").value = id;
  forceSetLS(ExplorerSettings.TRANSACTION_EXPLORER + "_" + networkId, id);
};

const _explorerMap = {
  "cardanoscanPreview": createIExplorerItem({
    id: "cardanoscanPreview",
    baseUrl: "https://preview.cardanoscan.io/",
    abbrev: "Cardanoscan Preview",
    icon: "/images/explorer/cardanoscan.webp",
    txUrl: createIURL({ parameters: ["transaction/", "<txhash>"] }),
    blocksUrl: createIURL({ parameters: ["block/", "<blockNo>"] }),
    poolUrl: createIURL({ parameters: ["pool/", "<poolid>"] }),
    addressUrl: createIURL({ parameters: ["address/", "<bech32>"] }),
    tokenUrl: createIURL({ parameters: ["token/", "<fingerprint>"] }),
    policyUrl: createIURL({ parameters: ["tokenPolicy/", "<policyid>"] }),
    epochUrl: createIURL({ parameters: ["epoch/", "<epochid>"] }),
    stakeUrl: createIURL({ parameters: ["stakeKey/", "<bech32>", "?tab=delegationhistory"] }),
    govDRepUrl: createIURL({ parameters: ["drep/", "<drepId>"] }),
    govProposalUrl: createIURL({ parameters: ["govAction/", "<proposalId>"] })
  }),
  "cardanoscanPreprod": createIExplorerItem({
    id: "cardanoscanPreprod",
    baseUrl: "https://preprod.cardanoscan.io/",
    abbrev: "Cardanoscan Preprod",
    icon: "/images/explorer/cardanoscan.webp",
    txUrl: createIURL({ parameters: ["transaction/", "<txhash>"] }),
    blocksUrl: createIURL({ parameters: ["block/", "<blockNo>"] }),
    poolUrl: createIURL({ parameters: ["pool/", "<poolid>"] }),
    addressUrl: createIURL({ parameters: ["address/", "<bech32>"] }),
    tokenUrl: createIURL({ parameters: ["token/", "<fingerprint>"] }),
    policyUrl: createIURL({ parameters: ["tokenPolicy/", "<policyid>"] }),
    epochUrl: createIURL({ parameters: ["epoch/", "<epochid>"] }),
    stakeUrl: createIURL({ parameters: ["stakeKey/", "<bech32>", "?tab=delegationhistory"] }),
    govDRepUrl: createIURL({ parameters: ["drep/", "<drepId>"] }),
    govProposalUrl: createIURL({ parameters: ["govAction/", "<proposalId>"] })
  }),
  cardanoscan: createIExplorerItem({
    id: "cardanoscan",
    baseUrl: "https://cardanoscan.io/",
    abbrev: "Cardanoscan",
    icon: "/images/explorer/cardanoscan.webp",
    txUrl: createIURL({ parameters: ["transaction/", "<txhash>"] }),
    blocksUrl: createIURL({ parameters: ["block/", "<blockNo>"] }),
    poolUrl: createIURL({ parameters: ["pool/", "<poolid>"] }),
    addressUrl: createIURL({ parameters: ["address/", "<bech32>"] }),
    tokenUrl: createIURL({ parameters: ["token/", "<fingerprint>"] }),
    policyUrl: createIURL({ parameters: ["tokenPolicy/", "<policyid>"] }),
    epochUrl: createIURL({ parameters: ["epoch/", "<epochid>"] }),
    stakeUrl: createIURL({ parameters: ["stakekey/", "<bech32>"] }),
    govDRepUrl: createIURL({ parameters: ["drep/", "<drepId>"] }),
    govProposalUrl: createIURL({ parameters: ["govAction/", "<proposalId>"] })
  }),
  cexplorerPreview: createIExplorerItem({
    id: "cexplorerPreview",
    baseUrl: "https://preview.cexplorer.io/",
    abbrev: "Cexplorer Preview",
    icon: "/images/explorer/cexplorer.svg",
    txUrl: createIURL({ parameters: ["tx/", "<txhash>"] }),
    blocksUrl: createIURL({ parameters: ["block/", "<blockHash>"] }),
    poolUrl: createIURL({ parameters: ["pool/", "<poolid>"] }),
    addressUrl: createIURL({ parameters: ["address/", "<bech32>"] }),
    tokenUrl: createIURL({ parameters: ["asset/", "<fingerprint>"] }),
    policyUrl: createIURL({ parameters: ["policy/", "<policyid>"] }),
    epochUrl: createIURL({ parameters: ["epoch/", "<epochid>"] }),
    stakeUrl: createIURL({ parameters: ["stake/", "<bech32>"] }),
    govDRepUrl: null,
    govProposalUrl: null
  }),
  cexplorerPreprod: createIExplorerItem({
    id: "cexplorerPreprod",
    baseUrl: "https://preprod.cexplorer.io/",
    abbrev: "Cexplorer Preprod",
    icon: "/images/explorer/cexplorer.svg",
    txUrl: createIURL({ parameters: ["tx/", "<txhash>"] }),
    blocksUrl: createIURL({ parameters: ["block/", "<blockHash>"] }),
    poolUrl: createIURL({ parameters: ["pool/", "<poolid>"] }),
    addressUrl: createIURL({ parameters: ["address/", "<bech32>"] }),
    tokenUrl: createIURL({ parameters: ["asset/", "<fingerprint>"] }),
    policyUrl: createIURL({ parameters: ["policy/", "<policyid>"] }),
    epochUrl: createIURL({ parameters: ["epoch/", "<epochid>"] }),
    stakeUrl: createIURL({ parameters: ["stake/", "<bech32>"] }),
    govDRepUrl: null,
    govProposalUrl: null
  }),
  cexplorer: createIExplorerItem({
    id: "cexplorer",
    baseUrl: "https://cexplorer.io/",
    abbrev: "Cexplorer",
    icon: "/images/explorer/cexplorer.svg",
    txUrl: createIURL({ parameters: ["tx/", "<txhash>"] }),
    blocksUrl: createIURL({ parameters: ["block/", "<blockHash>"] }),
    poolUrl: createIURL({ parameters: ["pool/", "<poolid>"] }),
    addressUrl: createIURL({ parameters: ["address/", "<bech32>"] }),
    tokenUrl: createIURL({ parameters: ["asset/", "<fingerprint>"] }),
    policyUrl: createIURL({ parameters: ["policy/", "<policyid>"] }),
    epochUrl: createIURL({ parameters: ["epoch/", "<epochid>"] }),
    stakeUrl: createIURL({ parameters: ["stake/", "<bech32>"] }),
    govDRepUrl: null,
    govProposalUrl: null
  }),
  adastat: createIExplorerItem({
    id: "adastat",
    baseUrl: "https://adastat.net/",
    abbrev: "AdaStat",
    icon: "/images/explorer/adastat.webp",
    txUrl: createIURL({ parameters: ["transactions/", "<txhash>"] }),
    blocksUrl: createIURL({ parameters: ["blocks/", "<blockHash>"] }),
    poolUrl: createIURL({ parameters: ["pools/", "<poolid>"] }),
    addressUrl: createIURL({ parameters: ["addresses/", "<bech32>"] }),
    tokenUrl: createIURL({ parameters: ["tokens/", "<fingerprint>"] }),
    policyUrl: createIURL({ parameters: ["policies/", "<policyid>"] }),
    epochUrl: createIURL({ parameters: ["epochs/", "<epochid>"] }),
    stakeUrl: createIURL({ parameters: ["addresses/", "<bech32>"] }),
    govDRepUrl: createIURL({ parameters: ["dreps/", "<drepId>"] }),
    govProposalUrl: createIURL({ parameters: ["governances/", "<proposalHash1>"] })
  }),
  poolpm: createIExplorerItem({
    id: "poolpm",
    baseUrl: "https://pool.pm/",
    abbrev: "Pool.pm",
    icon: "/images/explorer/pool.pm.webp",
    txUrl: null,
    blocksUrl: null,
    poolUrl: createIURL({ parameters: ["<poolid>"] }),
    addressUrl: createIURL({ parameters: ["<bech32>"] }),
    tokenUrl: createIURL({ parameters: ["<fingerprint>"] }),
    policyUrl: null,
    epochUrl: null,
    stakeUrl: createIURL({ parameters: ["<bech32>"] }),
    govDRepUrl: null,
    govProposalUrl: null
  }),
  pooltool: createIExplorerItem({
    id: "pooltool",
    baseUrl: "https://pooltool.io/",
    abbrev: "PoolTool.io",
    icon: "/images/explorer/pooltool.webp",
    txUrl: null,
    blocksUrl: null,
    poolUrl: createIURL({ parameters: ["pool/", "<poolid>"] }),
    addressUrl: createIURL({ parameters: ["address/", "<bech32>"] }),
    tokenUrl: null,
    policyUrl: null,
    epochUrl: null,
    stakeUrl: null,
    govDRepUrl: null,
    govProposalUrl: null
  }),
  govtoolPreview: createIExplorerItem({
    id: "govtoolPreview",
    baseUrl: "https://preview.gov.tool/",
    abbrev: "Gov Tool Preview",
    icon: "/images/explorer/govtools.svg",
    txUrl: null,
    blocksUrl: null,
    poolUrl: null,
    addressUrl: null,
    tokenUrl: null,
    policyUrl: null,
    epochUrl: null,
    stakeUrl: null,
    govDRepUrl: createIURL({ parameters: ["drep_directory/", "<drepIdLegacy>"] }),
    govProposalUrl: null
  }),
  govtool: createIExplorerItem({
    id: "govtool",
    baseUrl: "https://gov.tool/",
    abbrev: "Gov Tool",
    icon: "/images/explorer/govtools.svg",
    txUrl: null,
    blocksUrl: null,
    poolUrl: null,
    addressUrl: null,
    tokenUrl: null,
    policyUrl: null,
    epochUrl: null,
    stakeUrl: null,
    govDRepUrl: createIURL({ parameters: ["drep_directory/", "<drepIdLegacy>"] }),
    govProposalUrl: null
  }),
  tempo: createIExplorerItem({
    id: "tempo",
    baseUrl: "https://tempo.vote/",
    abbrev: "Tempo",
    icon: "/images/explorer/tempo.webp",
    txUrl: null,
    blocksUrl: null,
    poolUrl: null,
    addressUrl: null,
    tokenUrl: null,
    policyUrl: null,
    epochUrl: null,
    stakeUrl: null,
    govDRepUrl: createIURL({ parameters: ["drep-profile?dRepId=", "<drepId>"] }),
    govProposalUrl: createIURL({ parameters: ["governance-action?governanceActionId=", "<proposalHash2>"] })
  }),
  "1694": createIExplorerItem({
    id: "1694",
    baseUrl: "https://1694.io/en/",
    abbrev: "1694",
    icon: "/images/explorer/1694.webp",
    txUrl: null,
    blocksUrl: null,
    poolUrl: null,
    addressUrl: null,
    tokenUrl: null,
    policyUrl: null,
    epochUrl: null,
    stakeUrl: null,
    govDRepUrl: createIURL({ parameters: ["dreps/", "<drepId>"] }),
    govProposalUrl: null
  })
};
const createExplorerList = () => {
  if (networkId.value === "preview") {
    return [
      getExplorerById("cardanoscanPreview"),
      getExplorerById("cexplorerPreview"),
      getExplorerById("govtoolPreview")
    ];
  } else if (networkId.value === "preprod") {
    return [
      getExplorerById("cardanoscanPreprod"),
      getExplorerById("cexplorerPreprod")
    ];
  } else if (networkId.value === "mainnet") {
    return [
      getExplorerById("adastat"),
      getExplorerById("cardanoscan"),
      getExplorerById("cexplorer"),
      getExplorerById("poolpm"),
      getExplorerById("pooltool"),
      getExplorerById("govtool"),
      getExplorerById("tempo"),
      getExplorerById("1694")
    ];
  }
  return [];
};
const getExplorerList = () => createExplorerList();
const getExplorerById = (id) => _explorerMap[id];
const getExplorerByType = (type) => {
  const list = createExplorerList();
  let func = getAddressExplorer;
  switch (type) {
    case "address":
      func = getAddressExplorer;
      break;
    case "stake":
      func = getStakeAddressExplorer;
      break;
    case "block":
      func = getBlockExplorer;
      break;
    case "transaction":
      func = getTransactionExplorer;
      break;
    case "fingerprint":
      func = getTokenExplorer;
      break;
    case "token":
      func = getTokenExplorer;
      break;
    case "pool":
      func = getPoolExplorer;
      break;
    case "DRep":
      func = getGovDRepExplorer;
      break;
    case "govProposal":
      func = getGovProposalExplorer;
      break;
  }
  let expl = func(networkId.value);
  if (!expl.value && networkId.value === "mainnet") {
    if (type === "token") {
      expl.value = "poolpm";
    } else {
      expl.value = "adastat";
    }
  }
  if (networkId.value === "preview") {
    if (!expl.value) {
      expl.value = "cardanoscanPreview";
    }
  } else if (networkId.value === "preprod") {
    if (!expl.value) {
      expl.value = "cardanoscanPreprod";
    }
  }
  return list.find((explorer) => explorer.id === expl.value) ?? null;
};
const setExplorerByType = (type, explorerId) => {
  const list = createExplorerList();
  const expl = list.find((explorer) => explorer.id === explorerId) ?? null;
  if (expl) {
    let func = setAddressExplorer;
    switch (type) {
      case "address":
        func = setAddressExplorer;
        break;
      case "stake":
        func = setStakeAddressExplorer;
        break;
      case "block":
        func = setBlockExplorer;
        break;
      case "transaction":
        func = setTransactionExplorer;
        break;
      case "token":
        func = setTokenExplorer;
        break;
      case "policy":
        func = setPolicyExplorer;
        break;
      case "pool":
        func = setPoolExplorer;
        break;
      case "DRep":
        func = setGovDRepExplorer;
        break;
      case "govProposal":
        func = setGovProposalExplorer;
        break;
    }
    func(networkId.value, explorerId);
  }
};
function useExplorer() {
  return {
    getExplorerById,
    getExplorerByType,
    setExplorerByType,
    getExplorerList
  };
}

const _isTweeningOut$1 = ref(false);
const _govAction = ref(null);
let _tweenOutTrigger$1;
const tweenOutModal$1 = () => {
  if (_tweenOutTrigger$1) {
    _isTweeningOut$1.value = true;
    _tweenOutTrigger$1();
  }
};
const toggleModalGovActionViewer = (govAction) => {
  if (_govAction.value && govAction) {
    if (_govAction.value.b === govAction.b) {
      tweenOutModal$1();
      return;
    }
  }
  openModalGovActionViewer(govAction);
};
const openModalGovActionViewer = (govAction) => {
  _govAction.value = govAction;
};
const closeModalGovActionViewer = () => {
  _govAction.value = null;
};
const useModalGovActionViewer = (tweenOutTrigger) => {
  if (tweenOutTrigger) {
    _tweenOutTrigger$1 = tweenOutTrigger;
  }
  return {
    showModalGovActionViewer: computed(() => !!_govAction.value),
    govAction: computed(() => _govAction.value),
    tweenOutModal: tweenOutModal$1,
    isTweeningOut: _isTweeningOut$1,
    openModalGovActionViewer,
    toggleModalGovActionViewer,
    closeModalGovActionViewer
  };
};

const _isTweeningOut = ref(false);
const _dRepId = ref(null);
let _tweenOutTrigger;
const tweenOutModal = () => {
  if (_tweenOutTrigger) {
    _isTweeningOut.value = true;
    _tweenOutTrigger();
  }
};
const toggleModalDRepInfo = (dRepId) => {
  if (_dRepId.value === dRepId) {
    tweenOutModal();
  } else {
    openModalDRepInfo(dRepId);
  }
};
const openModalDRepInfo = (dRepId) => {
  _dRepId.value = dRepId;
  const { tweenOutModal: tweenOutModal2 } = useModalGovActionViewer();
  tweenOutModal2();
};
const closeModalDRepInfo = () => {
  _dRepId.value = null;
};
const useModalDRepInfo = (tweenOutTrigger) => {
  if (tweenOutTrigger) {
    _tweenOutTrigger = tweenOutTrigger;
  }
  return {
    showModalDRepInfo: computed(() => !!_dRepId.value),
    dRepId: computed(() => _dRepId.value),
    tweenOutModal,
    isTweeningOut: _isTweeningOut,
    openModalDRepInfo,
    toggleModalDRepInfo,
    closeModalDRepInfo
  };
};

const _sfc_main$2 = {  };

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("circle", {
      cx: "3",
      cy: "3",
      r: "3",
      transform: "matrix(-1 0 0 1 22 9)",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M2 11.9999H12M2 11.9999C2 12.5619 2.4381 12.9891 3.3143 13.8436L4.97057 15.5M2 11.9999C2 11.4378 2.4381 11.0106 3.3143 10.1561L4.97044 8.5",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconMoveLeft = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render$1]]);

const _sfc_main$1 = {  };

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("circle", {
      cx: "5",
      cy: "12",
      r: "3",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M22 12L12 12M22 12C22 12.562 21.5619 12.9893 20.6857 13.8437L19.0294 15.5001M22 12C22 11.4379 21.5619 11.0107 20.6857 10.1563L19.0296 8.50012",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconMoveRight = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

const _hoisted_1 = { class: "relative shrink-0 explorer-speed-dial w-6 h-6 flex flex-col et-jc-ic" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExplorerLink",
  props: /* @__PURE__ */ mergeModels({
    subject: { required: true },
    type: { type: String, required: false },
    additionalMenuOptions: { type: Array, required: false, default: [] },
    labelHover: { type: String, required: false, default: "" },
    copyText: { type: String, required: false, default: "" },
    notificationText: { type: String, required: false, default: "" },
    compact: { type: Boolean, required: false, default: false },
    wideLabel: { type: Boolean, required: false, default: false },
    alignRight: { type: Boolean, required: false, default: false },
    buttonLeft: { type: Boolean, required: false, default: false },
    popoverLeft: { type: Boolean, required: false, default: false },
    popoverRight: { type: Boolean, required: false, default: false },
    hideTransactionExpand: { type: Boolean, required: false, default: false },
    transactionExpandIsOutput: { type: Boolean, required: false, default: false },
    hideTransactionSize: { type: Boolean, required: false, default: false }
  }, {
    "elWidth": { type: Number, required: false, default: 0 },
    "elWidthModifiers": {}
  }),
  emits: ["update:elWidth"],
  setup(__props) {
    const elWidth = useModel(__props, "elWidth");
    const props = __props;
    const {
      showCopied,
      showError
    } = useNotifications();
    const $t = useTranslation().t;
    const { type } = toRefs(props);
    const storeId = "ExplorerList" + getRandomId();
    let absURL = ref("");
    let hover = ref(props.labelHover ?? "");
    const { getExplorerByType } = useExplorer();
    const explorerLabel = computed(() => {
      return $t("common:copy." + type?.value);
    });
    const clickOutsideRef = ref();
    const recentlyCopied = ref(false);
    let _toid = -1;
    const menu = ref();
    const contextMenuItems = computed(() => {
      const rest = [];
      rest.push({
        id: "copy",
        icon: markRaw(IconCopy01),
        fn: () => {
          doCopyToClipboard(props.copyText);
        },
        label: explorerLabel.value
      });
      rest.push({
        id: "open",
        icon: markRaw(IconLinkSquare01),
        fn: () => {
          window.open(absURL.value, "_blank", "noopener,noreferrer");
        },
        label: $t("settings-app:explorer.tooltip.show")
      });
      if (props.type === "DRep") {
        rest.push({
          id: "drep",
          icon: markRaw(IconInformationCircle),
          fn: () => {
            openModalDRepInfo(props.subject);
          },
          label: $t("common:button.showDetails")
        });
      }
      if (props.type === "transaction" && !props.hideTransactionExpand) {
        rest.push({
          id: "tx",
          icon: props.transactionExpandIsOutput ? markRaw(IconMoveRight) : markRaw(IconMoveLeft),
          fn: () => {
            openTxViewer();
          },
          label: $t("common:button.showDetails")
        });
      }
      return rest.concat(props.additionalMenuOptions);
    });
    const setRecentlyCopied = () => {
      clearTimeout(_toid);
      recentlyCopied.value = true;
      _toid = setTimeout(() => {
        recentlyCopied.value = false;
      }, 2e3);
    };
    const doCopyToClipboard = (copyText) => {
      return copyToClipboard(copyText).then((res) => {
        if (res) {
          if (props.notificationText) {
            showCopied(props.notificationText);
          } else {
            showCopied(props.copyText);
          }
          setRecentlyCopied();
        } else {
          showError($t("common:copy.failed"));
        }
        return res;
      }).catch((err) => {
        showError($t("common:copy.failed") + ": " + err);
      });
    };
    onClickOutside(clickOutsideRef, (event) => {
      nextTick(() => {
        if (showOptions.value) {
          doDelayedClose(10);
        }
      });
    });
    const label = ref();
    const elementSize = useElementSize(label);
    const setWidth = (width) => {
      if (width > 0) {
        elWidth.value = width;
      } else {
        elWidth.value = 0;
      }
    };
    watch(() => elementSize.width.value, (width) => {
      setWidth(width);
    });
    const { openModalDRepInfo } = useModalDRepInfo();
    function updateUrl() {
      absURL.value = "";
      hover.value = getHoverValue(props.type);
      absURL.value = getUrl(props.type, props.subject) ?? "";
    }
    const getHoverValue = (type2) => {
      if (!type2) {
        return "";
      }
      return "";
    };
    const getUrl = (type2, subject) => {
      if (!type2) {
        return null;
      }
      if (!subject) {
        return null;
      }
      const expl = getExplorerByType(type2);
      if (!expl) {
        return null;
      }
      switch (type2) {
        case "url":
          if (subject.url) {
            return subject.url;
          }
          return null;
        case "address":
          if (!subject.hasOwnProperty("hash") || subject.hash.length === 0) {
            try {
              subject.hash = toHexString(getAddressCredentials(subject.bech32, null, true).addressBytes);
            } catch (e) {
              return null;
            }
          }
          if (subject.hash || subject.bech32) {
            return expl.addressUrl ? expl.baseUrl + expl.addressUrl?.parameters.map(
              (param) => param.replace("<hash>", subject.hash).replace("<bech32>", subject.bech32)
            ).join("") : null;
          }
          return null;
        case "stake":
          if (subject.hash || subject.bech32) {
            return expl.stakeUrl ? expl.baseUrl + expl.stakeUrl?.parameters.map(
              (param) => param.replace("<hash>", subject.hash).replace("<bech32>", subject.bech32)
            ).join("") : null;
          }
          return null;
        case "block":
          if (subject.blockNo || subject.blockHash) {
            return expl.blocksUrl ? expl.baseUrl + expl.blocksUrl?.parameters.map(
              (param) => param.replace("<blockNo>", subject.blockNo).replace("<blockHash>", subject.blockHash)
            ).join("") : null;
          }
          return null;
        case "transaction":
          const hash = typeof subject === "string" ? subject : subject?.txHash ?? subject?.input.transaction_id;
          if (hash) {
            return expl.txUrl ? expl.baseUrl + expl.txUrl?.parameters.map(
              (param) => param.replace("<txhash>", hash)
            ).join("") : null;
          }
          return null;
        case "token":
          const asset = subject;
          if (asset.p || asset.n || asset.f) {
            return expl.tokenUrl ? expl.baseUrl + expl.tokenUrl?.parameters.map(
              (param) => param.replace("<policyid>", asset.p ?? "").replace("<namehex>", asset.t.a).replace("<fingerprint>", asset.f ?? getAssetIdBech32(asset.p ?? "", asset.t.a ?? "")).replace("<name>", formatAssetName(asset.t.a))
            ).join("") : expl.tokenUrl;
          }
          return null;
        case "policy":
          if (subject) {
            return expl.policyUrl ? expl.baseUrl + expl.policyUrl?.parameters.map(
              (param) => param.replace("<policyid>", subject)
            ).join("") : null;
          }
          return null;
        case "pool":
          const poolHash = subject.ph ?? subject.hash ?? null;
          if (poolHash) {
            return expl.poolUrl ? expl.baseUrl + expl.poolUrl?.parameters.map(
              (param) => param.replace("<poolid>", poolHash)
            ).join("") : null;
          }
          return null;
        case "DRep":
          if (typeof subject !== "string" || subject.length !== 58 || !subject.startsWith("drep")) {
            return null;
          }
          const drepHash = decodeBech32(subject).slice(2);
          const drepIdLegacy = getDRepAddressFromKeyHashOld(drepHash);
          return expl.govDRepUrl ? expl.baseUrl + expl.govDRepUrl?.parameters.map(
            (param) => param.replace("<drepId>", subject).replace("<drepIdLegacy>", drepIdLegacy)
          ).join("") : null;
        case "govProposal":
          if (typeof subject !== "string" || subject.length !== 70 || !subject.startsWith("gov_action")) {
            return null;
          }
          const govHash = decodeBech32(subject);
          const txHash = govHash.slice(0, 64);
          const proposalIdx = govHash.slice(-2);
          const proposalHash1 = `${txHash}${proposalIdx}`;
          const proposalHash2 = `${txHash}%23${Number(`0x${proposalIdx}`)}`;
          return expl.govProposalUrl ? expl.baseUrl + expl.govProposalUrl?.parameters.map(
            (param) => param.replace("<proposalId>", subject).replace("<proposalHash1>", proposalHash1).replace("<proposalHash2>", proposalHash2)
          ).join("") : null;
      }
      return null;
    };
    const showOptions = ref(false);
    const doDelayedClose = (ms = 333) => {
      setTimeout(() => {
        showOptions.value = false;
        menu.value.toggle();
      }, ms);
    };
    const openTxViewer = () => {
      const subject = props.subject;
      if (props.type === "transaction" && !props.hideTransactionExpand && subject?.txHash) {
        dispatchSignalSync(doOpenTxViewer, subject.txHash);
        doDelayedClose();
      }
    };
    watch(() => props.subject, (value) => {
      if (!value) {
        return;
      }
      updateUrl();
    }, { immediate: true });
    const _onUpdateExplorer = () => {
      if (!props.subject) {
        return;
      }
      nextTick(() => updateUrl());
    };
    onMounted(() => addSignalListener(onUpdateExplorer, storeId, _onUpdateExplorer));
    onUnmounted(() => removeSignalListener(onUpdateExplorer, storeId));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "label",
        ref: label,
        class: normalizeClass(["w-full max-w-full flex flex-row et-js-ic break-all", __props.compact ? "et-gap-sm" : "et-gap-sm"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["grow max-w-full flex flex-row et-js-ic et-gap-sm", __props.alignRight ? "et-je-ic" : "et-js-ic"])
        }, [
          !__props.buttonLeft ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_1, [
            createVNode(_sfc_main$3, { items: contextMenuItems.value }, null, 8, ["items"])
          ]),
          __props.buttonLeft ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("", true)
        ], 2)
      ], 2);
    };
  }
});

export { _sfc_main as _, useModalDRepInfo as a, useExplorer as b, useModalGovActionViewer as u };
