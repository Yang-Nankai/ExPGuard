import { e as ref, Z as useLocalStorage, m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, w as useTranslation, D as computed, t as createCommentVNode, u as unref, B as toDisplayString, n as createVNode, y as withCtx, H as createTextVNode, c as createBlock, Y as toRefs, aR as onBeforeMount, z as resolveComponent, V as normalizeClass, x as useScreenSize, G as watch, f as onMounted, F as Fragment, U as withModifiers, S as renderList, l as useTheme, P as networkId, aJ as toHexString, ar as getMetadataType, as as createJsonFromCborJson, a8 as useElementSize, a1 as withDirectives, a2 as resolveDirective, T as Teleport, aO as withKeys, bb as isTxHash, an as isHexString, cI as isBexApp, bc as watchEffect, ab as mergeModels, ac as useModel, $ as createSlots, j as isIosApp, ad as dispatchSignalSync } from './index.js';
import { u as useAppMode } from './useAppMode.js';
import { i as isMilkomedaTx, g as getNetworkExplorerUrlFromItx, n as networkMetadataAddressKey, a as getJsonValue, u as useTxInfos, b as useModalTransactionNote, _ as _sfc_main$J, I as IconNotebook } from './TransactionItemHeader.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$M } from './TabsToSelect.vue_vue_type_script_setup_true_lang.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { M as ModalContentCard } from './ModalContentCard.js';
import { _ as _sfc_main$u, u as useModalGovActionViewer } from './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$v } from './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import { n as neg, i as isZero, g as abs, p as pow, d as divide, m as multiply } from './bigmath.js';
import { z as addValueToValue, U as createValueJSON, bd as createUtxoHash, _ as CertificateTypes, be as CertificateKind, aI as getRewardAddressFromCred, bf as getDRepAddressFromKeyHashOld, az as getDRepAddressFromKeyHash, bg as getPoolAddressFromKeyHash, V as getAddressCredentials, bh as decodeBech32, bi as PublicKey, bj as Credential, bk as getCredFromCredentials, s as safeFreeCSLObject, bl as getGovProposalId, F as FixedTransaction, bm as resizeForWalletIcon, bn as doReloadWalletList } from './app2.js';
import { _ as _sfc_main$w } from './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$x, b as _sfc_main$B } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$L } from './TransactionItemMessages.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$G, a as _sfc_main$H, b as _sfc_main$I, c as _sfc_main$K } from './GovActionEntry.vue_vue_type_script_setup_true_lang.js';
import { u as useGuard } from './useGuards.js';
import { u as usePaginator } from './usePaginator.js';
import { g as getBadgeConfig, c as createContractBadge } from './Badge.vue_vue_type_script_setup_true_lang.js';
import { u as useWitnesses } from './creds.js';
import { u as useUtxoInfos, a as _sfc_main$A, _ as _sfc_main$C } from './TransactionUTxODetails.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$z } from './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$y } from './Badges.vue_vue_type_script_setup_true_lang.js';
import { a as IconArrowDown01, I as IconArrowUp01 } from './IconArrowUp01.js';
import { u as useFormatter } from './useFormatter.js';
import { _ as _sfc_main$D } from './MultiSigDecryptMetadata.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$E, b as _sfc_main$F } from './CardDRep2.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$N } from './ButtonOutline.vue_vue_type_script_setup_true_lang.js';
import { I as IconSearch01 } from './IconSearch01.js';
import { M as MediaType, o as MediaSize, p as getAssetCDNImage } from './useAppAccountBalances.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useModalAssetDetails } from './useModalAssetDetails.js';
import { _ as _sfc_main$P, a as _sfc_main$Q, u as useAssetInfos } from './AssetListCardImage.vue_vue_type_script_setup_true_lang.js';
import { u as useNavigation } from './useNavigation.js';
import { u as useNotifications } from './useNotification.js';
import { B as ButtonRow } from './ButtonRow.js';
import { _ as _sfc_main$S } from './Modal.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$R } from './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import { u as useCurrencyAPI } from './useCurrencyAPI.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useTokenPrices } from './useTokenPrices.js';
import './useModalImage.js';
import { _ as _sfc_main$O } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { g as getContractAddressesByLabel, a as getContractMappingByAddresses } from './contractMapping.js';
import { I as IconAlert02 } from './IconAlert02.js';

const showTxDetails = useLocalStorage("showTxViewerDetails", false);
const showTxDetailsButton = ref(false);
const useDetailedTxInfo = () => {
  return {
    showTxDetails,
    showTxDetailsButton
  };
};

const _sfc_main$t = {  };

const _hoisted_1$o = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$o, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M16 2V4M11 2V4M6 2V4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M19.5 10C19.5 6.70017 19.5 5.05025 18.4749 4.02513C17.4497 3 15.7998 3 12.5 3H9.5C6.20017 3 4.55025 3 3.52513 4.02513C2.5 5.05025 2.5 6.70017 2.5 10V15C2.5 18.2998 2.5 19.9497 3.52513 20.9749C4.55025 22 6.20017 22 9.5 22H12.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M17.5 14L17.5 22M21.5 18L13.5 18",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M7 15H11M7 10H15",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1)
  ]))]))
}
const IconNoteAdd = /*#__PURE__*/_export_sfc(_sfc_main$t, [['render',_sfc_render$1]]);

const _hoisted_1$n = {
  key: 0,
  class: "w-full flex flex-col et-js-is et-gap-sm"
};
const _hoisted_2$h = {
  key: 0,
  class: "w-full flex flex-row flex-wrap et-jb 2xs:et-js et-gap-sm 2xs:et-gap-lg"
};
const _hoisted_3$d = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_4$9 = { class: "font-semibold" };
const _hoisted_5$7 = { class: "flex flex-row et-js-is et-gap-xs text-sm text-left" };
const _hoisted_6$6 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_7$6 = { class: "font-semibold" };
const _hoisted_8$6 = { class: "flex flex-row et-js-is et-gap-sm text-sm text-left" };
const _hoisted_9$6 = { class: "w-full flex flex-row et-js-ic break-al h-6" };
const _hoisted_10$6 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_11$5 = {
  key: 0,
  class: "font-semibold"
};
const _hoisted_12$5 = {
  key: 1,
  class: "font-semibold"
};
const _hoisted_13$5 = { class: "flex flex-row et-js-is et-gap-sm text-sm text-left" };
const _hoisted_14$5 = { class: "w-full flex flex-row et-js-ic break-al h-6" };
const _hoisted_15$5 = { class: "h-0" };
const _hoisted_16$5 = {
  key: 1,
  class: "w-full flex flex-row flex-wrap et-jb 2xs:et-js et-gap-sm 2xs:et-gap-lg"
};
const _hoisted_17$5 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_18$4 = {
  key: 0,
  class: ""
};
const _hoisted_19$4 = {
  key: 1,
  class: ""
};
const _hoisted_20$4 = { class: "flex flex-row et-js-is et-gap-sm text-left" };
const _hoisted_21$4 = { class: "w-full flex flex-row et-js-ic break-al h-6" };
const _hoisted_22$4 = {
  key: 0,
  class: "h-0"
};
const _hoisted_23$4 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_24$3 = { class: "" };
const _hoisted_25$3 = { class: "flex flex-row et-js-is et-gap-xs text-left" };
const _hoisted_26$3 = { key: 0 };
const _hoisted_27$3 = { key: 1 };
const _hoisted_28$3 = {
  key: 2,
  class: "flex flex-row et-js-ic et-gap-xs"
};
const _hoisted_29$3 = { class: "" };
const _hoisted_30$3 = {
  key: 3,
  class: "flex flex-row et-js-is et-gap-xs text-left"
};
const _hoisted_31$3 = { class: "text-txt-negative" };
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "TransactionItemBlockOrValidFor",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const { isProMode } = useAppMode();
    const _txCbor = props.txInfos.txCbor;
    const _txTTL = props.txInfos.txTTL;
    props.txInfos.txBadges;
    const {
      tx,
      txCbor,
      blockNo,
      blockHash
    } = _txCbor;
    const {
      numConfirmations,
      validFor,
      doesNotExpire,
      isExpired
    } = _txTTL;
    const cbor = computed(() => {
      return tx.value?.cbor ?? txCbor.value?.cbor;
    });
    const _validFor = computed(() => {
      if (validFor.value === "unlimited" || validFor.value === "expired") {
        return $t("tx-viewer:validFor:" + validFor.value);
      }
      return validFor.value;
    });
    return (_ctx, _cache) => {
      return unref(isProMode) ? (openBlock(), createElementBlock("div", _hoisted_1$n, [
        unref(blockNo) > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$h, [
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_3$d, [
              createBaseVNode("span", _hoisted_4$9, toDisplayString(unref($t)("tx-details:metadata.block")), 1)
            ]),
            createBaseVNode("div", _hoisted_5$7, [
              createVNode(_sfc_main$u, {
                type: "block",
                subject: { blockNo: unref(blockNo), blockHash: unref(blockHash) },
                "copy-text": unref(blockNo) + ""
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(blockNo)), 1)
                ]),
                _: 1
              }, 8, ["subject", "copy-text"])
            ])
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_6$6, [
              createBaseVNode("span", _hoisted_7$6, toDisplayString(unref($t)("tx-details:metadata.confirmations")), 1)
            ]),
            createBaseVNode("div", _hoisted_8$6, [
              createBaseVNode("div", _hoisted_9$6, toDisplayString(unref(numConfirmations)), 1)
            ])
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_10$6, [
              !cbor.value ? (openBlock(), createElementBlock("span", _hoisted_11$5, toDisplayString(unref($t)("tx-details:metadata.tx.size")), 1)) : (openBlock(), createElementBlock("span", _hoisted_12$5, toDisplayString(unref($t)("tx-details:metadata.tx.cbor")), 1))
            ]),
            createBaseVNode("div", _hoisted_13$5, [
              createBaseVNode("div", _hoisted_14$5, toDisplayString(unref(tx)?.size), 1),
              createBaseVNode("div", _hoisted_15$5, [
                createVNode(_sfc_main$v, {
                  "copy-text": cbor.value,
                  "notification-text": unref($t)("tx-details:metadata.copied.cbor")
                }, {
                  default: withCtx(() => [
                    createBaseVNode("span", null, toDisplayString(unref(tx)?.size), 1)
                  ]),
                  _: 1
                }, 8, ["copy-text", "notification-text"])
              ])
            ])
          ])
        ])) : _validFor.value || unref(doesNotExpire) ? (openBlock(), createElementBlock("div", _hoisted_16$5, [
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_17$5, [
              !cbor.value ? (openBlock(), createElementBlock("span", _hoisted_18$4, toDisplayString(unref($t)("tx-details:metadata.tx.size")), 1)) : (openBlock(), createElementBlock("span", _hoisted_19$4, toDisplayString(unref($t)("tx-details:metadata.tx.cbor")), 1))
            ]),
            createBaseVNode("div", _hoisted_20$4, [
              createBaseVNode("div", _hoisted_21$4, toDisplayString(unref(tx)?.size), 1),
              !!cbor.value ? (openBlock(), createElementBlock("div", _hoisted_22$4, [
                createVNode(_sfc_main$v, {
                  "copy-text": cbor.value,
                  "notification-text": unref($t)("tx-details:metadata.copied.cbor")
                }, {
                  default: withCtx(() => [
                    createBaseVNode("span", null, toDisplayString(unref(tx)?.size), 1)
                  ]),
                  _: 1
                }, 8, ["copy-text", "notification-text"])
              ])) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_23$4, [
              createBaseVNode("span", _hoisted_24$3, toDisplayString(unref($t)("tx-viewer:validFor.label")), 1)
            ]),
            createBaseVNode("div", _hoisted_25$3, [
              unref(doesNotExpire) ? (openBlock(), createElementBlock("span", _hoisted_26$3, toDisplayString(unref($t)("tx-viewer:validFor.unlimited")), 1)) : (openBlock(), createElementBlock("span", _hoisted_27$3, toDisplayString(_validFor.value), 1))
            ])
          ])
        ])) : createCommentVNode("", true),
        unref(isExpired) ? (openBlock(), createElementBlock("div", _hoisted_28$3, [
          createBaseVNode("span", _hoisted_29$3, toDisplayString(unref($t)("tx-viewer:validFor.label")), 1)
        ])) : createCommentVNode("", true),
        unref(isExpired) ? (openBlock(), createElementBlock("div", _hoisted_30$3, [
          createBaseVNode("span", _hoisted_31$3, toDisplayString(unref($t)("tx-viewer:validFor.expired")), 1)
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$m = { class: "w-full flex flex-row et-jb-ic et-gap-sm" };
const _hoisted_2$g = { class: "font-semibold" };
const _hoisted_3$c = { class: "flex flex-row et-gap-sm" };
const _hoisted_4$8 = { class: "flex flex-col et-gap-sm" };
const _hoisted_5$6 = {
  key: 1,
  class: "w-full max-w-full flex flex-row flex-wrap et-je-is et-gap-sm"
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "TransactionItemFee",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const txCbor = props.txInfos.txCbor;
    const {
      tx,
      inputColUtxoList
    } = txCbor;
    const collateralSpent = computed(() => {
      if (tx.value?.is_valid) {
        return null;
      }
      const _collateralSpent = createValueJSON();
      for (const utxo of inputColUtxoList.value) {
        addValueToValue(_collateralSpent, utxo.output.amount, true);
      }
      if (!!tx.value?.body.collateral_return) {
        addValueToValue(_collateralSpent, tx.value.body.collateral_return.amount);
      }
      return _collateralSpent;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        createBaseVNode("span", _hoisted_2$g, toDisplayString(unref($t)("tx-details:txFee")), 1),
        createBaseVNode("div", _hoisted_3$c, [
          createVNode(_sfc_main$w, {
            amount: unref(neg)(unref(tx)?.body.fee ?? "0"),
            "invisible-if-zero": true,
            "with-sign": unref(tx)?.is_valid,
            "css-text-negative": !unref(tx)?.is_valid ? "text-txt-muted" : void 0,
            "css-background-negative": !unref(tx)?.is_valid ? "bg-transparent" : void 0
          }, null, 8, ["amount", "with-sign", "css-text-negative", "css-background-negative"]),
          createBaseVNode("div", _hoisted_4$8, [
            !unref(tx)?.is_valid ? (openBlock(), createBlock(_sfc_main$w, {
              key: 0,
              amount: collateralSpent.value.coin,
              "invisible-if-zero": true
            }, null, 8, ["amount"])) : createCommentVNode("", true),
            !!collateralSpent.value?.multiasset ? (openBlock(), createElementBlock("div", _hoisted_5$6, [
              createVNode(_sfc_main$x, {
                "multi-asset": collateralSpent.value.multiasset,
                "is-input": "",
                "with-sign": "",
                compact: ""
              }, null, 8, ["multi-asset"])
            ])) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
});

const _hoisted_1$l = {
  key: 0,
  class: "w-full flex flex-row et-jb-ic et-gap-sm"
};
const _hoisted_2$f = { class: "font-semibold cap-first" };
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "TransactionItemDonation",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const txCbor = props.txInfos.txCbor;
    const { tx } = txCbor;
    return (_ctx, _cache) => {
      return unref(tx)?.body.donation ? (openBlock(), createElementBlock("div", _hoisted_1$l, [
        createBaseVNode("span", _hoisted_2$f, toDisplayString(unref($t)("tx-details:donation")), 1),
        createVNode(_sfc_main$w, {
          amount: unref(tx)?.body.donation,
          "with-sign": false
        }, null, 8, ["amount"])
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$k = { class: "w-full break-all" };
const _hoisted_2$e = {
  key: 1,
  class: "flex flex-row et-is-ic et-gap-sm break-all"
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "TransactionUtxoRaw",
  props: {
    txHash: { type: String, required: true, default: "" },
    txIndex: { type: Number, required: true, default: 0 },
    hasLink: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    useTranslation().t;
    const utxoHash = computed(() => createUtxoHash(props.txHash, props.txIndex));
    return (_ctx, _cache) => {
      return __props.hasLink ? (openBlock(), createBlock(_sfc_main$u, {
        key: 0,
        type: "transaction",
        subject: { txHash: __props.txHash },
        "copy-text": utxoHash.value,
        "hide-transaction-expand": ""
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$k, toDisplayString(utxoHash.value), 1)
        ]),
        _: 1
      }, 8, ["subject", "copy-text"])) : (openBlock(), createElementBlock("div", _hoisted_2$e, [
        createBaseVNode("div", null, toDisplayString(__props.txHash), 1),
        _cache[0] || (_cache[0] = createBaseVNode("div", null, "#", -1)),
        createBaseVNode("div", null, toDisplayString(__props.txIndex), 1),
        createVNode(_sfc_main$v, { "copy-text": utxoHash.value }, null, 8, ["copy-text"])
      ]));
    };
  }
});

const _hoisted_1$j = { class: "p-3 flex flex-col et-js-is et-gap-sme sm:et-gap-md" };
const _hoisted_2$d = {
  key: 0,
  class: "w-full flex flex-row flex-wrap et-je-ic et-gap-xs"
};
const _hoisted_3$b = {
  key: 1,
  class: "w-full max-w-full flex flex-row flex-wrap et-je-is et-gap-sm"
};
const _hoisted_4$7 = {
  key: 0,
  class: "absolute inset-0 w-full h-full bg-black/50 rounded-2xl"
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "TransactionUTxO",
  props: {
    label: { type: String },
    utxo: { type: Object, required: true },
    walletId: { type: String, required: false, default: "" },
    accountId: { type: String, required: false, default: "" },
    txHash: { type: String, required: false, default: "" },
    stagingTx: { type: Boolean, required: false, default: false },
    isInput: { type: Boolean, required: false, default: false },
    witnessCheck: { type: Boolean, required: false, default: false },
    showNeutralColors: { type: Boolean, required: false, default: false },
    withSign: { type: Boolean, required: false, default: true },
    makeABS: { type: Boolean, required: false, default: false },
    fadedUnlessHover: { type: Boolean, required: false, default: false }
  },
  emits: ["scamAddressFound"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { walletId, accountId } = toRefs(props);
    const emit = __emit;
    const el = ref(null);
    const { showTxDetails } = useDetailedTxInfo();
    const $t = useTranslation().t;
    const {
      isSignedUtxo,
      hasSpendRedeemer
    } = useWitnesses();
    const {
      isAddressOnBlockList
    } = useGuard();
    const isHover = ref(false);
    const utxo = computed(() => props.utxo);
    const isInput = computed(() => props.isInput);
    const isStagingTx = computed(() => props.stagingTx);
    const witnessCheck = computed(() => props.witnessCheck);
    const utxoInfos = useUtxoInfos(utxo, {
      walletId,
      accountId,
      isInput,
      isStagingTx,
      witnessCheck
    });
    const {
      addressBadgeList,
      accountBadgeList,
      amount,
      multiAsset,
      hasAssets
    } = utxoInfos;
    const isScam = ref(false);
    const scamAddresses = ref([]);
    const _showBadge = computed(() => utxo.value && isStagingTx.value && isInput.value);
    const _isSignedUtxoInput = computed(() => _showBadge.value && isSignedUtxo(props.txHash, utxo.value));
    const isSignedSC = computed(() => _showBadge.value && hasSpendRedeemer(props.txHash, utxo.value.input));
    const isSignedInput = computed(() => _showBadge.value && _isSignedUtxoInput.value);
    const isUnsigned = computed(() => _showBadge.value && _isSignedUtxoInput.value);
    const _badge = {
      id: "signed",
      label: $t("tx-badge:signed.label"),
      hover: $t("tx-badge:signed.hover"),
      ...getBadgeConfig("signed")
    };
    const badgeSigned = computed(() => {
      if (isSignedInput.value) {
        _badge.id = "signed";
        _badge.label = $t("tx-badge:inputSigned.label");
        _badge.hover = $t("tx-badge:inputSigned.hover");
      } else if (isSignedSC.value) {
        _badge.id = "signed";
        _badge.label = $t("tx-badge:inputSignedSC.label");
        _badge.hover = $t("tx-badge:inputSignedSC.hover");
      } else if (isUnsigned.value) {
        _badge.id = "staging";
        _badge.label = $t("tx-badge:inputUnsigned.label");
        _badge.hover = $t("tx-badge:inputUnsigned.hover");
      } else {
        return null;
      }
      const config = getBadgeConfig(_badge.id);
      _badge.bgColor = config?.bgColor;
      _badge.color = config?.color;
      return _badge;
    });
    const watchSpam = async () => {
      let addressIsScam = await isAddressOnBlockList(utxo?.value.output.address);
      if (addressIsScam) {
        isScam.value = true;
        scamAddresses.value.push(utxo?.value.output.address);
        emit("scamAddressFound");
      } else {
        isScam.value = false;
      }
    };
    onBeforeMount(() => {
      watchSpam();
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        onMouseover: _cache[0] || (_cache[0] = ($event) => isHover.value = true),
        onMouseout: _cache[1] || (_cache[1] = ($event) => isHover.value = false),
        class: normalizeClass(!isHover.value && __props.fadedUnlessHover ? "grayscale" : ""),
        pt: {
          body: "p-0 relative"
        }
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1$j, [
            !unref(isZero)(unref(amount)) || unref(addressBadgeList).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$d, [
              unref(addressBadgeList).length > 0 ? (openBlock(), createBlock(_sfc_main$y, {
                key: 0,
                badges: unref(addressBadgeList),
                size: "small"
              }, null, 8, ["badges"])) : createCommentVNode("", true),
              unref(accountBadgeList).length > 0 ? (openBlock(), createBlock(_sfc_main$y, {
                key: 1,
                badges: unref(accountBadgeList),
                size: "small"
              }, null, 8, ["badges"])) : createCommentVNode("", true),
              badgeSigned.value ? (openBlock(), createBlock(_sfc_main$y, {
                key: 2,
                badges: [badgeSigned.value],
                size: "small"
              }, null, 8, ["badges"])) : createCommentVNode("", true),
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "grow" }, null, -1)),
              createVNode(_sfc_main$w, {
                amount: __props.makeABS ? unref(abs)(unref(amount)) : unref(amount),
                "invisible-if-zero": true,
                "with-sign": __props.withSign,
                colored: !__props.showNeutralColors,
                compact: ""
              }, null, 8, ["amount", "with-sign", "colored"])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: "w-full",
              ref_key: "el",
              ref: el
            }, [
              !utxo.value.output.address ? (openBlock(), createBlock(_sfc_main$p, {
                key: 0,
                "tx-hash": utxo.value.input.transaction_id,
                "tx-index": utxo.value.input.index,
                "has-link": ""
              }, null, 8, ["tx-hash", "tx-index"])) : (openBlock(), createBlock(_sfc_main$z, {
                key: 1,
                address: utxo.value.output.address,
                "no-shortened-address": unref(showTxDetails),
                "full-width": ""
              }, null, 8, ["address", "no-shortened-address"]))
            ], 512),
            unref(hasAssets) ? (openBlock(), createElementBlock("div", _hoisted_3$b, [
              createVNode(_sfc_main$x, {
                "multi-asset": unref(multiAsset),
                "is-input": !__props.makeABS && isInput.value,
                "with-sign": __props.withSign,
                compact: ""
              }, null, 8, ["multi-asset", "is-input", "with-sign"])
            ])) : createCommentVNode("", true),
            unref(showTxDetails) && unref(utxoInfos) && unref(utxoInfos).utxo ? (openBlock(), createBlock(_sfc_main$A, {
              key: 2,
              "utxo-infos": unref(utxoInfos)
            }, null, 8, ["utxo-infos"])) : createCommentVNode("", true)
          ]),
          !isHover.value && __props.fadedUnlessHover ? (openBlock(), createElementBlock("div", _hoisted_4$7)) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});

const _hoisted_1$i = { class: "flex et-jc-ic et-gap-xs et-text-sm text-txt-muted" };
const _hoisted_2$c = {
  key: 0,
  class: "flex flex-col et-gap-sm"
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "TransactionUTxOs",
  props: {
    label: { type: String },
    utxoList: { type: Array, required: true },
    walletId: { type: String, required: false, default: "" },
    accountId: { type: String, required: false, default: "" },
    txHash: { type: String, required: false, default: "" },
    isInput: { type: Boolean, required: false, default: false },
    showNeutralColors: { type: Boolean, required: false, default: false },
    withSign: { type: Boolean, required: false, default: true },
    makeABS: { type: Boolean, required: false, default: false },
    fadedUnlessHover: { type: Boolean, required: false, default: false },
    witnessCheck: { type: Boolean, required: false, default: false },
    stagingTx: { type: Boolean, required: false, default: false },
    txViewer: { type: Boolean, required: false, default: false },
    showUtxosInitially: { type: String, required: false, default: "" }
  },
  setup(__props) {
    const props = __props;
    const { utxoList } = toRefs(props);
    useAppMode();
    const {
      getPaginatorTemplateNarrow
    } = useTheme();
    const { isSmallerThanSM } = useScreenSize();
    const _utxoList = computed(() => {
      const list = utxoList.value?.concat() ?? [];
      list.sort((a, b) => a.input.index - b.input.index);
      return list;
    });
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      onPageStateUpdate
    } = usePaginator(_utxoList, 10);
    const {
      isAddressOnBlockList
    } = useGuard();
    const showUtxos = useLocalStorage(props.showUtxosInitially, true);
    const isScam = ref(false);
    const scamAddresses = ref([]);
    const watchScam = () => {
      for (let utxo of page.value) {
        let addressIsScam = isAddressOnBlockList(utxo.output.address);
        if (addressIsScam) {
          isScam.value = true;
          scamAddresses.value.push(utxo.output.address);
        } else {
          isScam.value = false;
        }
      }
    };
    watch(page, () => {
      watchScam();
    });
    onMounted(() => {
      watchScam();
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Paginator = resolveComponent("Paginator");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Button, {
          class: "flex flex-row et-jc-ic flex-wrap py-1 et-bg-content et-bg-content-hover border-border-1",
          severity: "secondary",
          rounded: "",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => showUtxos.value = !unref(showUtxos), ["stop", "prevent"]))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$i, [
              createBaseVNode("div", null, [
                createBaseVNode("span", null, toDisplayString(unref(utxoList).length), 1),
                _cache[1] || (_cache[1] = createTextVNode("  ", -1)),
                createBaseVNode("span", null, toDisplayString(__props.label), 1)
              ]),
              unref(showUtxos) ? (openBlock(), createBlock(IconArrowDown01, {
                key: 0,
                class: "w-6"
              })) : (openBlock(), createBlock(IconArrowUp01, {
                key: 1,
                class: "w-6"
              }))
            ])
          ]),
          _: 1
        }),
        unref(showUtxos) ? (openBlock(), createElementBlock("div", _hoisted_2$c, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(page), (utxo, index) => {
            return openBlock(), createBlock(_sfc_main$o, {
              key: "utxo-" + index,
              utxo,
              "is-input": __props.isInput,
              "staging-tx": __props.stagingTx,
              "wallet-id": __props.walletId,
              "account-id": __props.accountId,
              "tx-hash": __props.txHash,
              "show-neutral-colors": __props.showNeutralColors,
              "with-sign": __props.withSign,
              makeABS: __props.makeABS,
              "faded-unless-hover": __props.fadedUnlessHover
            }, null, 8, ["utxo", "is-input", "staging-tx", "wallet-id", "account-id", "tx-hash", "show-neutral-colors", "with-sign", "makeABS", "faded-unless-hover"]);
          }), 128))
        ])) : createCommentVNode("", true),
        unref(showUtxos) && unref(numPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
          key: 1,
          class: "w-full py-0",
          "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
          template: unref(getPaginatorTemplateNarrow)(),
          rows: unref(numItemsPerPage),
          "total-records": unref(numItems),
          onPage: unref(onPageStateUpdate)
        }, null, 8, ["page-link-size", "template", "rows", "total-records", "onPage"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _hoisted_1$h = {
  key: 0,
  class: "flex flex-col et-gap-sm sm:et-gap-md"
};
const _hoisted_2$b = { class: "flex flex-col et-gap-sm sm:et-gap-md" };
const _hoisted_3$a = { class: "flex flex-col et-gap-sm sm:et-gap-md mt-4 sm:mt-0" };
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "TransactionInputsAndOutputs",
  props: {
    txInfos: { type: Object, required: true },
    walletId: { type: String, required: false, default: "" },
    accountId: { type: String, required: false, default: "" },
    witnessCheck: { type: Boolean, required: false, default: false },
    txViewer: { type: Boolean, required: false, default: false },
    isSmall: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const txHash = props.txInfos.txHash;
    const txCbor = props.txInfos.txCbor;
    const txProps = props.txInfos.txProps;
    const {
      tx,
      inputColUtxoList,
      inputRefUtxoList,
      inputUtxoList,
      collateralReturnUtxo,
      unknownInputUtxoList,
      outputUtxoList
    } = txCbor;
    const { stagingTx } = txProps;
    const isFailedTx = computed(() => tx.value?.is_valid === false);
    return (_ctx, _cache) => {
      return unref(tx) ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["w-full grid et-gap-md", __props.isSmall ? "grid-cols-1" : "grid-cols-2"])
      }, [
        __props.isSmall ? (openBlock(), createElementBlock("div", _hoisted_1$h, [
          unref(unknownInputUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
            key: 0,
            label: unref($t)(`tx-details:utxo.${unref(unknownInputUtxoList).length === 1 ? "unknownInputs_one" : "unknownInputs_other"}`),
            "utxo-list": unref(unknownInputUtxoList),
            "wallet-id": __props.walletId,
            "account-id": __props.accountId,
            "tx-hash": unref(txHash),
            "staging-tx": unref(stagingTx),
            "show-utxos-initially": "utxoListIn",
            "is-input": "",
            "show-neutral-colors": "",
            "with-sign": false,
            makeABS: false,
            "faded-unless-hover": false,
            "witness-check": __props.witnessCheck,
            "tx-viewer": __props.txViewer
          }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "witness-check", "tx-viewer"])) : createCommentVNode("", true),
          unref(inputUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
            key: 1,
            label: unref($t)(`tx-details:utxo.${unref(inputUtxoList).length === 1 ? "inputs_one" : "inputs_other"}`),
            "utxo-list": unref(inputUtxoList),
            "wallet-id": __props.walletId,
            "account-id": __props.accountId,
            "tx-hash": unref(txHash),
            "staging-tx": unref(stagingTx),
            "show-utxos-initially": "utxoListIn",
            "is-input": "",
            "show-neutral-colors": isFailedTx.value,
            "with-sign": !isFailedTx.value,
            makeABS: isFailedTx.value,
            "faded-unless-hover": isFailedTx.value,
            "witness-check": __props.witnessCheck,
            "tx-viewer": __props.txViewer
          }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "show-neutral-colors", "with-sign", "makeABS", "faded-unless-hover", "witness-check", "tx-viewer"])) : createCommentVNode("", true),
          unref(outputUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
            key: 2,
            label: unref($t)(`tx-details:utxo.${unref(outputUtxoList).length === 1 ? "outputs_one" : "outputs_other"}`),
            "utxo-list": unref(outputUtxoList),
            "wallet-id": __props.walletId,
            "account-id": __props.accountId,
            "tx-hash": unref(txHash),
            "staging-tx": unref(stagingTx),
            "show-utxos-initially": "utxoListOut",
            "show-neutral-colors": isFailedTx.value,
            "with-sign": !isFailedTx.value,
            makeABS: isFailedTx.value,
            "faded-unless-hover": isFailedTx.value,
            "witness-check": __props.witnessCheck,
            "tx-viewer": __props.txViewer
          }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "show-neutral-colors", "with-sign", "makeABS", "faded-unless-hover", "witness-check", "tx-viewer"])) : createCommentVNode("", true),
          unref(inputRefUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
            key: 3,
            label: unref($t)(`tx-details:utxo.${unref(inputRefUtxoList).length === 1 ? "referenceInputs_one" : "referenceInputs_other"}`),
            "utxo-list": unref(inputRefUtxoList),
            "wallet-id": __props.walletId,
            "account-id": __props.accountId,
            "tx-hash": unref(txHash),
            "staging-tx": unref(stagingTx),
            "show-utxos-initially": "utxoListRefIn",
            "is-input": true,
            "show-neutral-colors": "",
            makeABS: "",
            "with-sign": false,
            "witness-check": __props.witnessCheck,
            "tx-viewer": __props.txViewer
          }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "witness-check", "tx-viewer"])) : createCommentVNode("", true),
          unref(inputColUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
            key: 4,
            label: unref($t)(`tx-details:utxo.${unref(inputColUtxoList).length === 1 ? "collateralInputs_one" : "collateralInputs_other"}`),
            "utxo-list": unref(inputColUtxoList),
            "wallet-id": __props.walletId,
            "account-id": __props.accountId,
            "tx-hash": unref(txHash),
            "staging-tx": unref(stagingTx),
            "show-utxos-initially": "utxoListColIn",
            "is-input": true,
            "show-neutral-colors": !isFailedTx.value,
            "with-sign": isFailedTx.value,
            makeABS: !isFailedTx.value,
            "faded-unless-hover": !isFailedTx.value,
            "witness-check": __props.witnessCheck,
            "tx-viewer": __props.txViewer
          }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "show-neutral-colors", "with-sign", "makeABS", "faded-unless-hover", "witness-check", "tx-viewer"])) : createCommentVNode("", true),
          unref(collateralReturnUtxo) ? (openBlock(), createBlock(_sfc_main$n, {
            key: 5,
            label: unref($t)(`tx-details:utxo.collateralOutput_one`),
            "utxo-list": [unref(collateralReturnUtxo)],
            "wallet-id": __props.walletId,
            "account-id": __props.accountId,
            "tx-hash": unref(txHash),
            "staging-tx": unref(stagingTx),
            "show-utxos-initially": "utxoListColOut",
            "show-neutral-colors": !isFailedTx.value,
            "with-sign": isFailedTx.value,
            makeABS: !isFailedTx.value,
            "faded-unless-hover": !isFailedTx.value,
            "witness-check": __props.witnessCheck,
            "tx-viewer": __props.txViewer
          }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "show-neutral-colors", "with-sign", "makeABS", "faded-unless-hover", "witness-check", "tx-viewer"])) : createCommentVNode("", true)
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_2$b, [
            unref(unknownInputUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
              key: 0,
              label: unref($t)(`tx-details:utxo.${unref(unknownInputUtxoList).length === 1 ? "unknownInputs_one" : "unknownInputs_other"}`),
              "utxo-list": unref(unknownInputUtxoList),
              "wallet-id": __props.walletId,
              "account-id": __props.accountId,
              "tx-hash": unref(txHash),
              "staging-tx": unref(stagingTx),
              "show-utxos-initially": "utxoListIn",
              "is-input": "",
              "show-neutral-colors": "",
              "with-sign": false,
              makeABS: false,
              "faded-unless-hover": false,
              "witness-check": __props.witnessCheck,
              "tx-viewer": __props.txViewer
            }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "witness-check", "tx-viewer"])) : createCommentVNode("", true),
            unref(inputUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
              key: 1,
              label: unref($t)(`tx-details:utxo.${unref(inputUtxoList).length === 1 ? "inputs_one" : "inputs_other"}`),
              "utxo-list": unref(inputUtxoList),
              "wallet-id": __props.walletId,
              "account-id": __props.accountId,
              "tx-hash": unref(txHash),
              "staging-tx": unref(stagingTx),
              "show-utxos-initially": "utxoListIn",
              "is-input": "",
              "show-neutral-colors": isFailedTx.value,
              "with-sign": !isFailedTx.value,
              makeABS: isFailedTx.value,
              "faded-unless-hover": isFailedTx.value,
              "witness-check": __props.witnessCheck,
              "tx-viewer": __props.txViewer
            }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "show-neutral-colors", "with-sign", "makeABS", "faded-unless-hover", "witness-check", "tx-viewer"])) : createCommentVNode("", true),
            unref(inputRefUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
              key: 2,
              label: unref($t)(`tx-details:utxo.${unref(inputRefUtxoList).length === 1 ? "referenceInputs_one" : "referenceInputs_other"}`),
              "utxo-list": unref(inputRefUtxoList),
              "wallet-id": __props.walletId,
              "account-id": __props.accountId,
              "tx-hash": unref(txHash),
              "staging-tx": unref(stagingTx),
              "show-utxos-initially": "utxoListRefIn",
              "is-input": true,
              "show-neutral-colors": "",
              makeABS: "",
              "faded-unless-hover": isFailedTx.value,
              "with-sign": false,
              "witness-check": __props.witnessCheck,
              "tx-viewer": __props.txViewer
            }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "faded-unless-hover", "witness-check", "tx-viewer"])) : createCommentVNode("", true),
            unref(inputColUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
              key: 3,
              label: unref($t)(`tx-details:utxo.${unref(inputColUtxoList).length === 1 ? "collateralInputs_one" : "collateralInputs_other"}`),
              "utxo-list": unref(inputColUtxoList),
              "wallet-id": __props.walletId,
              "account-id": __props.accountId,
              "tx-hash": unref(txHash),
              "staging-tx": unref(stagingTx),
              "show-utxos-initially": "utxoListColIn",
              "is-input": true,
              "show-neutral-colors": !isFailedTx.value,
              "with-sign": isFailedTx.value,
              makeABS: !isFailedTx.value,
              "faded-unless-hover": !isFailedTx.value,
              "witness-check": __props.witnessCheck,
              "tx-viewer": __props.txViewer
            }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "show-neutral-colors", "with-sign", "makeABS", "faded-unless-hover", "witness-check", "tx-viewer"])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_3$a, [
            unref(outputUtxoList).length > 0 ? (openBlock(), createBlock(_sfc_main$n, {
              key: 0,
              label: unref($t)(`tx-details:utxo.${unref(outputUtxoList).length === 1 ? "outputs_one" : "outputs_other"}`),
              "utxo-list": unref(outputUtxoList),
              "wallet-id": __props.walletId,
              "account-id": __props.accountId,
              "tx-hash": unref(txHash),
              "staging-tx": unref(stagingTx),
              "show-utxos-initially": "utxoListOut",
              "show-neutral-colors": isFailedTx.value,
              "with-sign": !isFailedTx.value,
              makeABS: isFailedTx.value,
              "faded-unless-hover": isFailedTx.value,
              "witness-check": __props.witnessCheck,
              "tx-viewer": __props.txViewer
            }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "show-neutral-colors", "with-sign", "makeABS", "faded-unless-hover", "witness-check", "tx-viewer"])) : createCommentVNode("", true),
            unref(collateralReturnUtxo) ? (openBlock(), createBlock(_sfc_main$n, {
              key: 1,
              label: unref($t)(`tx-details:utxo.collateralOutput_one`),
              "utxo-list": [unref(collateralReturnUtxo)],
              "wallet-id": __props.walletId,
              "account-id": __props.accountId,
              "tx-hash": unref(txHash),
              "staging-tx": unref(stagingTx),
              "show-utxos-initially": "utxoListColOut",
              "show-neutral-colors": !isFailedTx.value,
              "with-sign": isFailedTx.value,
              makeABS: !isFailedTx.value,
              "faded-unless-hover": !isFailedTx.value,
              "witness-check": __props.witnessCheck,
              "tx-viewer": __props.txViewer
            }, null, 8, ["label", "utxo-list", "wallet-id", "account-id", "tx-hash", "staging-tx", "show-neutral-colors", "with-sign", "makeABS", "faded-unless-hover", "witness-check", "tx-viewer"])) : createCommentVNode("", true)
          ])
        ], 64))
      ], 2)) : createCommentVNode("", true);
    };
  }
});

const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "TxMintAsset",
  props: {
    assets: { type: Array, required: true }
  },
  setup(__props) {
    const props = __props;
    console.log("Minted assets", props.assets);
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(__props.assets, (mintGroup) => {
        return openBlock(), createElementBlock(Fragment, null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(mintGroup.assets, (asset) => {
            return openBlock(), createBlock(_sfc_main$B, { "asset-details": asset }, null, 8, ["asset-details"]);
          }), 256))
        ], 64);
      }), 256);
    };
  }
});

const _hoisted_1$g = { class: "flex et-jc-ic et-text-sm text-txt-muted" };
const _hoisted_2$a = {
  key: 1,
  class: "w-full flex flex-wrap et-js-is p-3 p-card et-gap-sm"
};
const _hoisted_3$9 = {
  key: 3,
  class: "w-full flex flex-wrap et-js-is p-3 p-card et-gap-sm"
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "TransactionMints",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const txMints = props.txInfos.txMints;
    const {
      mintAssets,
      burnAssets
    } = txMints;
    const showMints = ref(true);
    const showBurns = ref(true);
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(mintAssets).length > 0 ? (openBlock(), createBlock(_component_Button, {
          key: 0,
          class: "w-full flex flex-row et-jc-ic flex-wrap py-1 et-bg-content et-bg-content-hover border-border-1",
          severity: "secondary",
          rounded: "",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => showMints.value = !showMints.value, ["stop", "prevent"]))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$g, [
              createBaseVNode("span", null, toDisplayString(unref(mintAssets).length), 1),
              _cache[2] || (_cache[2] = createTextVNode("  ", -1)),
              createBaseVNode("span", null, toDisplayString(unref($t)("tx-details:mints.mints")), 1)
            ]),
            showMints.value ? (openBlock(), createBlock(IconArrowDown01, {
              key: 0,
              class: "w-6"
            })) : (openBlock(), createBlock(IconArrowUp01, {
              key: 1,
              class: "w-6"
            }))
          ]),
          _: 1
        })) : createCommentVNode("", true),
        showMints.value && unref(mintAssets).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$a, [
          createVNode(_sfc_main$l, { assets: unref(mintAssets) }, null, 8, ["assets"])
        ])) : createCommentVNode("", true),
        unref(burnAssets).length > 0 ? (openBlock(), createBlock(_component_Button, {
          key: 2,
          class: "w-full flex flex-row et-jc-ic flex-wrap py-1 et-bg-content et-bg-content-hover",
          severity: "secondary",
          rounded: "",
          onClick: _cache[1] || (_cache[1] = withModifiers(($event) => showBurns.value = !showBurns.value, ["stop", "prevent"]))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", null, [
              createBaseVNode("span", null, toDisplayString(unref(burnAssets).length), 1),
              _cache[3] || (_cache[3] = createTextVNode("  ", -1)),
              createBaseVNode("span", null, toDisplayString(unref($t)("tx-details:mints.burns")), 1)
            ]),
            showBurns.value ? (openBlock(), createBlock(IconArrowDown01, {
              key: 0,
              class: "w-6"
            })) : (openBlock(), createBlock(IconArrowUp01, {
              key: 1,
              class: "w-6"
            }))
          ]),
          _: 1
        })) : createCommentVNode("", true),
        showBurns.value && unref(burnAssets).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3$9, [
          createVNode(_sfc_main$l, { assets: unref(burnAssets) }, null, 8, ["assets"])
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _hoisted_1$f = {
  key: 0,
  class: "flex flex-col et-gap-sm w-full"
};
const _hoisted_2$9 = { class: "ml-3 sm:ml-4 et-text-sm font-semibold whitespace-nowrap" };
const _hoisted_3$8 = { class: "w-full et-text-md text-txt-content" };
const _hoisted_4$6 = {
  key: 0,
  class: "w-full flex flex-col et-gap-xs p-card"
};
const _hoisted_5$5 = {
  key: 1,
  class: "w-full flex flex-col et-gap-xs"
};
const _hoisted_6$5 = { class: "" };
const _hoisted_7$5 = { class: "cert-value" };
const _hoisted_8$5 = { class: "cert-header" };
const _hoisted_9$5 = { class: "cert-table-width break-all" };
const _hoisted_10$5 = { class: "break-all" };
const _hoisted_11$4 = { class: "cert-value" };
const _hoisted_12$4 = { class: "cert-header" };
const _hoisted_13$4 = { class: "cert-table-width break-all" };
const _hoisted_14$4 = { class: "break-all" };
const _hoisted_15$4 = { class: "cert-value" };
const _hoisted_16$4 = { class: "cert-header" };
const _hoisted_17$4 = { class: "cert-table-width break-all" };
const _hoisted_18$3 = { key: 0 };
const _hoisted_19$3 = { key: 1 };
const _hoisted_20$3 = {
  key: 0,
  class: "cert-value"
};
const _hoisted_21$3 = { class: "cert-header" };
const _hoisted_22$3 = { class: "cert-table-width break-all" };
const _hoisted_23$3 = { key: 0 };
const _hoisted_24$2 = { key: 1 };
const _hoisted_25$2 = {
  key: 2,
  class: "w-full flex flex-col et-gap-xs"
};
const _hoisted_26$2 = { class: "" };
const _hoisted_27$2 = { class: "cert-value" };
const _hoisted_28$2 = { class: "cert-header" };
const _hoisted_29$2 = { class: "cert-table-width break-all" };
const _hoisted_30$2 = { class: "break-all" };
const _hoisted_31$2 = { class: "cert-value" };
const _hoisted_32$2 = { class: "cert-header" };
const _hoisted_33$1 = { class: "cert-table-width break-all" };
const _hoisted_34$1 = { class: "break-all" };
const _hoisted_35$1 = {
  key: 3,
  class: "w-full flex flex-col et-gap-xs"
};
const _hoisted_36$1 = { class: "" };
const _hoisted_37$1 = { class: "cert-value" };
const _hoisted_38$1 = { class: "cert-header" };
const _hoisted_39$1 = { class: "cert-table-width break-all" };
const _hoisted_40$1 = { key: 0 };
const _hoisted_41$1 = { key: 1 };
const _hoisted_42$1 = { class: "cert-value" };
const _hoisted_43$1 = { class: "cert-header" };
const _hoisted_44$1 = { class: "cert-table-width break-all" };
const _hoisted_45$1 = { key: 0 };
const _hoisted_46$1 = { key: 1 };
const _hoisted_47$1 = { class: "cert-value" };
const _hoisted_48$1 = { class: "cert-header" };
const _hoisted_49$1 = { class: "cert-table-width break-all" };
const _hoisted_50$1 = { key: 0 };
const _hoisted_51$1 = { key: 1 };
const _hoisted_52$1 = { class: "cert-value" };
const _hoisted_53$1 = { class: "cert-header" };
const _hoisted_54$1 = { class: "cert-table-width break-all" };
const _hoisted_55$1 = { key: 0 };
const _hoisted_56$1 = { key: 1 };
const _hoisted_57$1 = {
  key: 0,
  class: "cert-value"
};
const _hoisted_58$1 = { class: "cert-header" };
const _hoisted_59$1 = { class: "cert-table-width break-all" };
const _hoisted_60$1 = { key: 0 };
const _hoisted_61$1 = { key: 1 };
const _hoisted_62$1 = {
  key: 1,
  class: "relative flex flex-col et-js-is"
};
const _hoisted_63$1 = { class: "cert-header" };
const _hoisted_64$1 = { class: "cert-table-width et-js-is" };
const _hoisted_65$1 = {
  key: 1,
  class: "cert-value"
};
const _hoisted_66$1 = { class: "cert-header" };
const _hoisted_67$1 = { class: "cert-table-width break-all" };
const _hoisted_68$1 = { key: 0 };
const _hoisted_69$1 = { key: 1 };
const _hoisted_70$1 = {
  key: 4,
  class: "w-full flex flex-col et-gap-xs"
};
const _hoisted_71$1 = { class: "" };
const _hoisted_72$1 = {
  key: 0,
  class: "cert-value"
};
const _hoisted_73$1 = { class: "cert-header" };
const _hoisted_74$1 = { class: "cert-table-width break-all" };
const _hoisted_75$1 = { class: "break-all" };
const _hoisted_76$1 = {
  key: 1,
  class: "cert-value"
};
const _hoisted_77$1 = { class: "cert-header" };
const _hoisted_78$1 = { class: "cert-table-width break-all" };
const _hoisted_79$1 = { key: 0 };
const _hoisted_80$1 = { key: 1 };
const _hoisted_81$1 = {
  key: 2,
  class: "cert-value"
};
const _hoisted_82$1 = { class: "cert-header" };
const _hoisted_83$1 = { class: "cert-table-width break-all" };
const _hoisted_84$1 = { key: 0 };
const _hoisted_85$1 = { key: 1 };
const _hoisted_86 = {
  key: 3,
  class: "cert-value"
};
const _hoisted_87 = { class: "cert-header" };
const _hoisted_88 = { class: "cert-table-width break-all" };
const _hoisted_89 = { key: 0 };
const _hoisted_90 = { key: 1 };
const _hoisted_91 = { class: "cert-value" };
const _hoisted_92 = { class: "cert-header" };
const _hoisted_93 = { class: "cert-table-width break-all" };
const _hoisted_94 = { class: "break-all" };
const _hoisted_95 = { class: "cert-value" };
const _hoisted_96 = { class: "cert-header" };
const _hoisted_97 = { class: "cert-table-width break-all" };
const _hoisted_98 = { key: 0 };
const _hoisted_99 = { key: 0 };
const _hoisted_100 = { key: 1 };
const _hoisted_101 = { key: 0 };
const _hoisted_102 = { class: "cert-value" };
const _hoisted_103 = { class: "cert-header" };
const _hoisted_104 = { class: "cert-table-width break-all" };
const _hoisted_105 = { key: 0 };
const _hoisted_106 = { key: 1 };
const _hoisted_107 = { class: "cert-value" };
const _hoisted_108 = { class: "cert-header" };
const _hoisted_109 = { class: "cert-table-width break-all" };
const _hoisted_110 = { key: 0 };
const _hoisted_111 = { key: 1 };
const _hoisted_112 = { class: "flex et-jc-ic et-gap-xs et-text-sm" };
const _hoisted_113 = { class: "et-text-sm" };
const _hoisted_114 = {
  key: 0,
  class: "w-full flex flex-row et-js-is et-gap-sm p-3 sm:p-4 p-card overflow-x-auto"
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "TransactionCertificates",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const { isSmallerThanSM } = useScreenSize();
    const { formatADAString } = useFormatter();
    const txCerts = props.txInfos.txCerts;
    const { certList } = txCerts;
    const showRawData = ref(false);
    const getCertLabel = (certType) => {
      return $t(`tx-details:certificate.type.${certType}`);
    };
    const _certList = computed(() => {
      const list = certList.value;
      const certs = [];
      if (list.length === 0) {
        return certs;
      }
      for (const cert of list) {
        const id = CertificateTypes.findIndex((type) => type === Object.keys(cert)[0]);
        let _certType = "";
        let _cert = (
          // @ts-ignore
          cert.StakeRegistration ?? // @ts-ignore
          cert.StakeDeregistration ?? // @ts-ignore
          cert.StakeDelegation ?? // @ts-ignore
          cert.PoolRegistration ?? // @ts-ignore
          cert.PoolRetirement ?? // @ts-ignore
          //    cert.GenesisKeyDelegation               ?? // @ts-ignore
          //    cert.MoveInstantaneousRewardsCert       ?? // @ts-ignore
          cert.CommitteeHotAuth ?? // @ts-ignore
          cert.CommitteeColdResign ?? // @ts-ignore
          cert.DRepDeregistration ?? // @ts-ignore
          cert.DRepRegistration ?? // @ts-ignore
          cert.DRepUpdate ?? // @ts-ignore
          cert.StakeAndVoteDelegation ?? // @ts-ignore
          cert.StakeRegistrationAndDelegation ?? // @ts-ignore
          cert.StakeVoteRegistrationAndDelegation ?? // @ts-ignore
          cert.VoteDelegation ?? // @ts-ignore
          cert.VoteRegistrationAndDelegation
        );
        if (cert.StakeRegistration) {
          _cert = cert.StakeRegistration;
          _certType = "stakereg";
        }
        if (cert.StakeDeregistration) {
          _cert = cert.StakeDeregistration;
          _certType = "stakedereg";
        }
        if (cert.StakeDelegation) {
          _cert = cert.StakeDelegation;
          _certType = "stakedel";
        }
        if (cert.PoolRegistration) {
          _cert = cert.PoolRegistration;
          _certType = "poolreg";
        }
        if (cert.PoolRetirement) {
          _cert = cert.PoolRetirement;
          _certType = "poolret";
        }
        if (cert.CommitteeHotAuth) {
          _cert = cert.CommitteeHotAuth;
          _certType = "comhot";
        }
        if (cert.CommitteeColdResign) {
          _cert = cert.CommitteeColdResign;
          _certType = "comcold";
        }
        if (cert.DRepDeregistration) {
          _cert = cert.DRepDeregistration;
          _certType = "drepdereg";
        }
        if (cert.DRepRegistration) {
          _cert = cert.DRepRegistration;
          _certType = "drepreg";
        }
        if (cert.DRepUpdate) {
          _cert = cert.DRepUpdate;
          _certType = "drepupd";
        }
        if (cert.StakeAndVoteDelegation) {
          _cert = cert.StakeAndVoteDelegation;
          _certType = "stakevotedel";
        }
        if (cert.StakeRegistrationAndDelegation) {
          _cert = cert.StakeRegistrationAndDelegation;
          _certType = "stakeregdel";
        }
        if (cert.StakeVoteRegistrationAndDelegation) {
          _cert = cert.StakeVoteRegistrationAndDelegation;
          _certType = "stakevoteregdel";
        }
        if (cert.VoteDelegation) {
          _cert = cert.VoteDelegation;
          _certType = "votedel";
        }
        if (cert.VoteRegistrationAndDelegation) {
          _cert = cert.VoteRegistrationAndDelegation;
          _certType = "voteregdel";
        }
        if (!_cert) {
          certs.push({
            kind: id,
            unknown: true,
            cert,
            // Note: cert !== _cert
            label: $t("tx-details:certificate.type.unknown")
          });
          continue;
        }
        const _certDisplay = {
          kind: id,
          label: getCertLabel(_certType),
          cert: _cert
        };
        let _certStakeCred;
        let _certPoolKeyHash;
        let _certDRep;
        let _certVotingCred;
        let _certAnchor;
        if (id === CertificateKind.StakeRegistration || id === CertificateKind.StakeDelegation || id === CertificateKind.StakeDeregistration || id === CertificateKind.StakeRegistrationAndDelegation || id === CertificateKind.StakeVoteRegistrationAndDelegation || id === CertificateKind.StakeAndVoteDelegation || id === CertificateKind.DRepRegistration) {
          _certStakeCred = _cert;
        } else if (_cert.hasOwnProperty("stake_credential")) {
          _certStakeCred = _cert;
        }
        if (id === CertificateKind.StakeRegistration || id === CertificateKind.StakeRegistrationAndDelegation || id === CertificateKind.StakeVoteRegistrationAndDelegation || id === CertificateKind.VoteRegistrationAndDelegation || id === CertificateKind.DRepRegistration || id === CertificateKind.PoolRegistration) {
          const certCoin = _cert;
          if (certCoin.coin) {
            _certDisplay.coin = certCoin.coin;
          }
        } else if (_cert.hasOwnProperty("coin")) {
          if (_cert.coin) {
            _certDisplay.coin = _cert.coin;
          }
        }
        if (id === CertificateKind.StakeDeregistration || id === CertificateKind.DRepDeregistration) {
          const certCoin = _cert;
          if (certCoin.coin) {
            _certDisplay.coin = certCoin.coin;
          }
        } else if (_cert.hasOwnProperty("coin")) {
          if (_cert.coin) {
            _certDisplay.coin = _cert.coin;
          }
        }
        if (id === CertificateKind.StakeDelegation || id === CertificateKind.StakeRegistrationAndDelegation || id === CertificateKind.StakeAndVoteDelegation || id === CertificateKind.StakeVoteRegistrationAndDelegation) {
          _certPoolKeyHash = _cert;
        } else if (_cert.hasOwnProperty("pool_keyhash")) {
          _certPoolKeyHash = _cert;
        }
        if (id === CertificateKind.VoteDelegation || id === CertificateKind.VoteRegistrationAndDelegation || id === CertificateKind.StakeAndVoteDelegation || id === CertificateKind.StakeVoteRegistrationAndDelegation) {
          _certDRep = _cert;
        }
        if (id === CertificateKind.DRepUpdate || id === CertificateKind.DRepRegistration || id === CertificateKind.DRepDeregistration) {
          _certVotingCred = _cert;
          _certAnchor = _cert;
        } else {
          if (_cert.hasOwnProperty("voting_credential")) {
            _certVotingCred = _cert;
          }
          if (_cert.hasOwnProperty("anchor")) {
            _certAnchor = _cert;
          }
        }
        if (_certStakeCred && _certStakeCred.stake_credential) {
          const keyCred = _certStakeCred.stake_credential.Key;
          const scriptCred = _certStakeCred.stake_credential.Script;
          if (keyCred) {
            _certDisplay.stakeAddr = { hash: keyCred, isScript: false, bech32: getRewardAddressFromCred(keyCred, networkId.value, false) };
          } else if (scriptCred) {
            _certDisplay.stakeAddr = { hash: scriptCred, isScript: true, bech32: getRewardAddressFromCred(scriptCred, networkId.value, true) };
          }
        }
        if (_certVotingCred && _certVotingCred.voting_credential) {
          const keyCred = _certVotingCred.voting_credential.Key;
          const scriptCred = _certVotingCred.voting_credential.Script;
          if (keyCred) {
            const drepBech32_cip105 = getDRepAddressFromKeyHashOld(keyCred);
            const drepBech32_cip129 = getDRepAddressFromKeyHash(keyCred, false);
            _certDisplay.drepId = { hash: keyCred, isId: true, isScript: false, drepBech32_cip105, drepBech32_cip129 };
          } else if (scriptCred) {
            const drepBech32_cip105 = getDRepAddressFromKeyHashOld(scriptCred);
            const drepBech32_cip129 = getDRepAddressFromKeyHash(scriptCred, true);
            _certDisplay.drepId = { hash: keyCred, isId: true, isScript: true, drepBech32_cip105, drepBech32_cip129 };
          }
        }
        if (_certDRep && _certDRep.drep) {
          let isId = typeof _certDRep.drep === "object";
          if (!isId) {
            _certDisplay.drepId = {
              isId: false,
              hash: getDRepAlwaysStr(_certDRep.drep),
              isScript: false,
              drepBech32_cip105: "",
              drepBech32_cip129: ""
            };
          } else {
            const keyCred = _certDRep.drep.KeyHash;
            const scriptCred = _certDRep.drep.ScriptHash;
            if (keyCred) {
              const drepBech32_cip105 = getDRepAddressFromKeyHashOld(keyCred);
              const drepBech32_cip129 = getDRepAddressFromKeyHash(keyCred, false);
              _certDisplay.drepId = { hash: keyCred, isId: true, isScript: false, drepBech32_cip105, drepBech32_cip129 };
            } else if (scriptCred) {
              const drepBech32_cip105 = getDRepAddressFromKeyHashOld(scriptCred);
              const drepBech32_cip129 = getDRepAddressFromKeyHash(scriptCred, true);
              _certDisplay.drepId = { hash: keyCred, isId: true, isScript: true, drepBech32_cip105, drepBech32_cip129 };
            }
          }
        }
        if (_certPoolKeyHash && _certPoolKeyHash.pool_keyhash) {
          _certDisplay.poolAddr = {
            hash: _certPoolKeyHash.pool_keyhash,
            isScript: false,
            bech32: getPoolAddressFromKeyHash(_certPoolKeyHash.pool_keyhash)
          };
        }
        if (_certAnchor && _certAnchor.anchor) {
          _certDisplay.anchor = _certAnchor.anchor;
        }
        if (id === CertificateKind.PoolRegistration) {
          try {
            const certPoolReg = _cert;
            const poolRegParams = certPoolReg.pool_params;
            const poolRewardStakeCred = getAddressCredentials(poolRegParams.reward_account).stakeCred ?? "";
            const poolIdBech32 = getPoolAddressFromKeyHash(poolRegParams.operator);
            const poolOwners = [];
            const poolRelays = [];
            for (const poolOwnerCred of poolRegParams.pool_owners) {
              poolOwners.push({
                hash: poolOwnerCred,
                isScript: false,
                // TODO: Determine isScript from owner info?
                bech32: getRewardAddressFromCred(poolOwnerCred, networkId.value, false)
              });
            }
            for (const relayJSON of poolRegParams.relays) {
              const relay = { address: "" };
              if ("SingleHostAddr" in relayJSON) {
                const shaJSON = relayJSON.SingleHostAddr;
                if (shaJSON.ipv4) {
                  relay.address = shaJSON.ipv4.join(".");
                } else if (shaJSON.ipv6) {
                  relay.address = shaJSON.ipv6.join(".");
                }
                if (shaJSON.port) {
                  relay.port = shaJSON.port;
                }
              } else if ("SingleHostName" in relayJSON) {
                const shnJSON = relayJSON.SingleHostName;
                relay.address = shnJSON.dns_name;
                if (shnJSON.port) {
                  relay.port = shnJSON.port;
                }
              } else if ("MultiHostName" in relayJSON) {
                const mhnJSON = relayJSON.MultiHostName;
                relay.address = mhnJSON.dns_name;
              }
              poolRelays.push(relay);
            }
            _certDisplay.poolParams = poolRegParams;
            _certDisplay.poolOwners = poolOwners;
            _certDisplay.poolRelays = poolRelays;
            _certDisplay.stakeAddr = {
              hash: poolRewardStakeCred,
              isScript: false,
              bech32: poolRegParams.reward_account
            };
            _certDisplay.poolAddr = {
              hash: poolRegParams.operator,
              isScript: false,
              bech32: poolIdBech32
            };
          } catch (err) {
            console.warn(err?.message);
          }
        } else if (id === CertificateKind.PoolRetirement) {
          try {
            const certPoolRet = _cert;
            const poolIdBech32 = getPoolAddressFromKeyHash(certPoolRet.pool_keyhash);
            _certDisplay.poolAddr = {
              hash: certPoolRet.pool_keyhash,
              isScript: false,
              bech32: poolIdBech32
            };
          } catch (err) {
            console.warn(err?.message);
          }
        }
        certs.push(_certDisplay);
      }
      return certs;
    });
    const getDRepAlwaysStr = (drep) => {
      if (drep === "AlwaysAbstain") {
        return "Abstain";
      } else if (drep === "AlwaysNoConfidence") {
        return "No Confidence";
      }
      return drep;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return _certList.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$f, [
        createBaseVNode("div", _hoisted_2$9, toDisplayString(_certList.value.length + " " + unref($t)("tx-details:certificate.label", { count: _certList.value.length })), 1),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_certList.value, (sc, index) => {
          return openBlock(), createElementBlock("div", {
            key: "pcl" + index,
            class: "flex flex-wrap et-js-is p-3 sm:p-4 p-card et-gap-md et-text-xs text-txt-muted"
          }, [
            createBaseVNode("div", _hoisted_3$8, toDisplayString(sc.label), 1),
            sc.unknown ? (openBlock(), createElementBlock("div", _hoisted_4$6, [
              createVNode(_sfc_main$C, {
                data: sc.cert
              }, null, 8, ["data"])
            ])) : createCommentVNode("", true),
            sc.stakeAddr && !sc.poolParams ? (openBlock(), createElementBlock("div", _hoisted_5$5, [
              createBaseVNode("div", _hoisted_6$5, toDisplayString(unref($t)("tx-details:certificate.gov.stakeCreds")), 1),
              createBaseVNode("div", _hoisted_7$5, [
                createBaseVNode("div", _hoisted_8$5, toDisplayString(unref($t)("common:address")), 1),
                createBaseVNode("div", _hoisted_9$5, [
                  createVNode(_sfc_main$u, {
                    label: sc.stakeAddr.bech32,
                    subject: sc.stakeAddr,
                    type: "address",
                    "copy-text": sc.stakeAddr.bech32,
                    compact: "",
                    "button-left": !unref(isSmallerThanSM)
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("span", _hoisted_10$5, toDisplayString(sc.stakeAddr.bech32), 1)
                    ]),
                    _: 2
                  }, 1032, ["label", "subject", "copy-text", "button-left"])
                ])
              ]),
              createBaseVNode("div", _hoisted_11$4, [
                createBaseVNode("div", _hoisted_12$4, toDisplayString(unref($t)("tx-details:certificate.gov.credential")), 1),
                createBaseVNode("div", _hoisted_13$4, [
                  createVNode(_sfc_main$u, {
                    label: sc.stakeAddr.hash,
                    subject: sc.stakeAddr,
                    type: "address",
                    "copy-text": sc.stakeAddr.hash,
                    compact: "",
                    "button-left": !unref(isSmallerThanSM)
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("span", _hoisted_14$4, toDisplayString(sc.stakeAddr.hash), 1)
                    ]),
                    _: 2
                  }, 1032, ["label", "subject", "copy-text", "button-left"])
                ])
              ]),
              createBaseVNode("div", _hoisted_15$4, [
                createBaseVNode("div", _hoisted_16$4, toDisplayString(unref($t)("tx-details:certificate.gov.isScript")), 1),
                createBaseVNode("div", _hoisted_17$4, [
                  unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_18$3, toDisplayString(sc.stakeAddr.isScript), 1)) : createCommentVNode("", true),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.stakeAddr.isScript + ""
                  }, null, 8, ["copy-text"]),
                  !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_19$3, toDisplayString(sc.stakeAddr.isScript), 1)) : createCommentVNode("", true)
                ])
              ]),
              sc.coin ? (openBlock(), createElementBlock("div", _hoisted_20$3, [
                createBaseVNode("div", _hoisted_21$3, toDisplayString(unref($t)("tx-details:certificate.gov.deposit")), 1),
                createBaseVNode("div", _hoisted_22$3, [
                  unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_23$3, toDisplayString(sc.coin), 1)) : createCommentVNode("", true),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.coin + ""
                  }, null, 8, ["copy-text"]),
                  !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_24$2, toDisplayString(sc.coin), 1)) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            sc.poolAddr ? (openBlock(), createElementBlock("div", _hoisted_25$2, [
              createBaseVNode("div", _hoisted_26$2, toDisplayString(unref($t)("tx-details:certificate.gov.poolCreds")), 1),
              createBaseVNode("div", _hoisted_27$2, [
                createBaseVNode("div", _hoisted_28$2, toDisplayString(unref($t)("tx-details:certificate.gov.poolId")), 1),
                createBaseVNode("div", _hoisted_29$2, [
                  createVNode(_sfc_main$u, {
                    compact: "",
                    "button-left": !unref(isSmallerThanSM),
                    label: sc.poolAddr.bech32,
                    subject: sc.poolAddr,
                    type: "pool",
                    "copy-text": sc.poolAddr.bech32
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("span", _hoisted_30$2, toDisplayString(sc.poolAddr.bech32), 1)
                    ]),
                    _: 2
                  }, 1032, ["button-left", "label", "subject", "copy-text"])
                ])
              ]),
              createBaseVNode("div", _hoisted_31$2, [
                createBaseVNode("div", _hoisted_32$2, toDisplayString(unref($t)("tx-details:certificate.gov.poolHash")), 1),
                createBaseVNode("div", _hoisted_33$1, [
                  createVNode(_sfc_main$u, {
                    compact: "",
                    "button-left": !unref(isSmallerThanSM),
                    label: sc.poolAddr.hash,
                    subject: sc.poolAddr,
                    type: "pool",
                    "copy-text": sc.poolAddr.hash
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("span", _hoisted_34$1, toDisplayString(sc.poolAddr.hash), 1)
                    ]),
                    _: 2
                  }, 1032, ["button-left", "label", "subject", "copy-text"])
                ])
              ])
            ])) : createCommentVNode("", true),
            sc.drepId ? (openBlock(), createElementBlock("div", _hoisted_35$1, [
              createBaseVNode("div", _hoisted_36$1, toDisplayString(unref($t)("tx-details:certificate.gov.drepCreds")), 1),
              sc.drepId.isId ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("div", _hoisted_37$1, [
                  createBaseVNode("div", _hoisted_38$1, toDisplayString(unref($t)("tx-details:certificate.gov.drep129")), 1),
                  createBaseVNode("div", _hoisted_39$1, [
                    unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_40$1, toDisplayString(sc.drepId.drepBech32_cip129), 1)) : createCommentVNode("", true),
                    createVNode(_sfc_main$v, {
                      compact: "",
                      "copy-text": sc.drepId.drepBech32_cip129
                    }, null, 8, ["copy-text"]),
                    !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_41$1, toDisplayString(sc.drepId.drepBech32_cip129), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_42$1, [
                  createBaseVNode("div", _hoisted_43$1, toDisplayString(unref($t)("tx-details:certificate.gov.drep105")), 1),
                  createBaseVNode("div", _hoisted_44$1, [
                    unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_45$1, toDisplayString(sc.drepId.drepBech32_cip105), 1)) : createCommentVNode("", true),
                    createVNode(_sfc_main$v, {
                      compact: "",
                      "copy-text": sc.drepId.drepBech32_cip105
                    }, null, 8, ["copy-text"]),
                    !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_46$1, toDisplayString(sc.drepId.drepBech32_cip105), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_47$1, [
                  createBaseVNode("div", _hoisted_48$1, toDisplayString(unref($t)("tx-details:certificate.gov.credential")), 1),
                  createBaseVNode("div", _hoisted_49$1, [
                    unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_50$1, toDisplayString(sc.drepId.hash), 1)) : createCommentVNode("", true),
                    createVNode(_sfc_main$v, {
                      compact: "",
                      "copy-text": sc.drepId.hash
                    }, null, 8, ["copy-text"]),
                    !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_51$1, toDisplayString(sc.drepId.hash), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_52$1, [
                  createBaseVNode("div", _hoisted_53$1, toDisplayString(unref($t)("tx-details:certificate.gov.isScript")), 1),
                  createBaseVNode("div", _hoisted_54$1, [
                    unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_55$1, toDisplayString(sc.drepId.isScript), 1)) : createCommentVNode("", true),
                    createVNode(_sfc_main$v, {
                      compact: "",
                      "copy-text": sc.drepId.isScript + ""
                    }, null, 8, ["copy-text"]),
                    !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_56$1, toDisplayString(sc.drepId.isScript), 1)) : createCommentVNode("", true)
                  ])
                ]),
                sc.coin ? (openBlock(), createElementBlock("div", _hoisted_57$1, [
                  createBaseVNode("div", _hoisted_58$1, toDisplayString(unref($t)("tx-details:certificate.gov.deposit")), 1),
                  createBaseVNode("div", _hoisted_59$1, [
                    unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_60$1, toDisplayString(sc.coin), 1)) : createCommentVNode("", true),
                    createVNode(_sfc_main$v, {
                      compact: "",
                      "copy-text": sc.coin + ""
                    }, null, 8, ["copy-text"]),
                    !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_61$1, toDisplayString(sc.coin), 1)) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true),
                sc.anchor ? (openBlock(), createElementBlock("div", _hoisted_62$1, [
                  createBaseVNode("div", _hoisted_63$1, [
                    createTextVNode(toDisplayString(unref($t)("tx-details:certificate.gov.anchor")), 1),
                    createVNode(_sfc_main$v, {
                      compact: "",
                      "copy-text": JSON.stringify(sc.anchor)
                    }, null, 8, ["copy-text"])
                  ]),
                  createBaseVNode("div", _hoisted_64$1, [
                    createVNode(_sfc_main$C, {
                      data: sc.anchor
                    }, null, 8, ["data"])
                  ])
                ])) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createElementBlock("div", _hoisted_65$1, [
                createBaseVNode("div", _hoisted_66$1, toDisplayString(unref($t)("tx-details:certificate.gov.vote")), 1),
                createBaseVNode("div", _hoisted_67$1, [
                  unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_68$1, toDisplayString(sc.drepId.hash), 1)) : createCommentVNode("", true),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.drepId.hash
                  }, null, 8, ["copy-text"]),
                  !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_69$1, toDisplayString(sc.drepId.hash), 1)) : createCommentVNode("", true)
                ])
              ]))
            ])) : createCommentVNode("", true),
            sc.poolParams ? (openBlock(), createElementBlock("div", _hoisted_70$1, [
              createBaseVNode("div", _hoisted_71$1, toDisplayString(unref($t)("tx-details:certificate.gov.poolParams")), 1),
              sc.stakeAddr ? (openBlock(), createElementBlock("div", _hoisted_72$1, [
                createBaseVNode("div", _hoisted_73$1, toDisplayString(unref($t)("tx-details:certificate.poolreg.rewardaddr")), 1),
                createBaseVNode("div", _hoisted_74$1, [
                  createVNode(_sfc_main$u, {
                    label: sc.stakeAddr.bech32,
                    subject: sc.stakeAddr,
                    type: "address",
                    "copy-text": sc.stakeAddr.bech32,
                    compact: "",
                    "button-left": !unref(isSmallerThanSM)
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("span", _hoisted_75$1, toDisplayString(sc.stakeAddr.bech32), 1)
                    ]),
                    _: 2
                  }, 1032, ["label", "subject", "copy-text", "button-left"])
                ])
              ])) : createCommentVNode("", true),
              sc.poolParams.pledge ? (openBlock(), createElementBlock("div", _hoisted_76$1, [
                createBaseVNode("div", _hoisted_77$1, toDisplayString(unref($t)("tx-details:certificate.poolreg.pledge")), 1),
                createBaseVNode("div", _hoisted_78$1, [
                  unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_79$1, toDisplayString(unref(formatADAString)(sc.poolParams.pledge, true, void 0, false, false, true)), 1)) : createCommentVNode("", true),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": unref(formatADAString)(sc.poolParams.pledge, true, void 0, false, false, false)
                  }, null, 8, ["copy-text"]),
                  !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_80$1, toDisplayString(unref(formatADAString)(sc.poolParams.pledge, true, void 0, false, false, true)), 1)) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              sc.poolParams.cost ? (openBlock(), createElementBlock("div", _hoisted_81$1, [
                createBaseVNode("div", _hoisted_82$1, toDisplayString(unref($t)("tx-details:certificate.poolreg.fixedcost")), 1),
                createBaseVNode("div", _hoisted_83$1, [
                  unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_84$1, toDisplayString(unref(formatADAString)(sc.poolParams.cost, true, void 0, false, false, true)), 1)) : createCommentVNode("", true),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": unref(formatADAString)(sc.poolParams.cost, true, void 0, false, false, false)
                  }, null, 8, ["copy-text"]),
                  !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_85$1, toDisplayString(unref(formatADAString)(sc.poolParams.cost, true, void 0, false, false, true)), 1)) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              sc.poolParams.margin ? (openBlock(), createElementBlock("div", _hoisted_86, [
                createBaseVNode("div", _hoisted_87, toDisplayString(unref($t)("tx-details:certificate.poolreg.margin")), 1),
                createBaseVNode("div", _hoisted_88, [
                  unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_89, toDisplayString(parseFloat((parseInt(sc.poolParams.margin.numerator) / parseInt(sc.poolParams.margin.denominator) * 100).toFixed(4))) + "%", 1)) : createCommentVNode("", true),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": "" + parseFloat((parseInt(sc.poolParams.margin.numerator) / parseInt(sc.poolParams.margin.denominator) * 100).toFixed(4))
                  }, null, 8, ["copy-text"]),
                  !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_90, toDisplayString(parseFloat((parseInt(sc.poolParams.margin.numerator) / parseInt(sc.poolParams.margin.denominator) * 100).toFixed(4))) + "%", 1)) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              _cache[1] || (_cache[1] = createBaseVNode("div", null, null, -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(sc.poolOwners, (owner) => {
                return openBlock(), createElementBlock("div", _hoisted_91, [
                  createBaseVNode("div", _hoisted_92, toDisplayString(unref($t)("tx-details:certificate.poolreg.owner")), 1),
                  createBaseVNode("div", _hoisted_93, [
                    createVNode(_sfc_main$u, {
                      label: owner.bech32,
                      subject: owner.bech32,
                      type: "address",
                      "copy-text": owner.bech32,
                      compact: "",
                      "button-left": !unref(isSmallerThanSM)
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("span", _hoisted_94, toDisplayString(owner.bech32), 1)
                      ]),
                      _: 2
                    }, 1032, ["label", "subject", "copy-text", "button-left"])
                  ])
                ]);
              }), 256)),
              _cache[2] || (_cache[2] = createBaseVNode("div", null, null, -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(sc.poolRelays, (relay) => {
                return openBlock(), createElementBlock("div", _hoisted_95, [
                  createBaseVNode("div", _hoisted_96, toDisplayString(unref($t)("tx-details:certificate.poolreg.relay")), 1),
                  createBaseVNode("div", _hoisted_97, [
                    unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_98, [
                      createBaseVNode("span", null, toDisplayString(relay.address), 1),
                      relay.port ? (openBlock(), createElementBlock("span", _hoisted_99, ":" + toDisplayString(relay.port), 1)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    createVNode(_sfc_main$v, {
                      compact: "",
                      "copy-text": relay.address + (relay.port ? ":" + relay.port : "")
                    }, null, 8, ["copy-text"]),
                    !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_100, [
                      createBaseVNode("span", null, toDisplayString(relay.address), 1),
                      relay.port ? (openBlock(), createElementBlock("span", _hoisted_101, ":" + toDisplayString(relay.port), 1)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ])
                ]);
              }), 256)),
              _cache[3] || (_cache[3] = createBaseVNode("div", null, null, -1)),
              sc.poolParams?.pool_metadata ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
                createBaseVNode("div", _hoisted_102, [
                  createBaseVNode("div", _hoisted_103, toDisplayString(unref($t)("tx-details:certificate.poolreg.metaurl")), 1),
                  createBaseVNode("div", _hoisted_104, [
                    unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_105, [
                      createBaseVNode("span", null, toDisplayString(sc.poolParams.pool_metadata.url), 1)
                    ])) : createCommentVNode("", true),
                    createVNode(_sfc_main$v, {
                      compact: "",
                      "copy-text": sc.poolParams.pool_metadata.url
                    }, null, 8, ["copy-text"]),
                    !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_106, [
                      createBaseVNode("span", null, toDisplayString(sc.poolParams.pool_metadata.url), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_107, [
                  createBaseVNode("div", _hoisted_108, toDisplayString(unref($t)("tx-details:certificate.poolreg.metahash")), 1),
                  createBaseVNode("div", _hoisted_109, [
                    unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_110, [
                      createBaseVNode("span", null, toDisplayString(sc.poolParams.pool_metadata.pool_metadata_hash), 1)
                    ])) : createCommentVNode("", true),
                    createVNode(_sfc_main$v, {
                      compact: "",
                      "copy-text": sc.poolParams.pool_metadata.pool_metadata_hash
                    }, null, 8, ["copy-text"]),
                    !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_111, [
                      createBaseVNode("span", null, toDisplayString(sc.poolParams.pool_metadata.pool_metadata_hash), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ], 64)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ]);
        }), 128)),
        createVNode(_component_Button, {
          class: "flex flex-row et-jc-ic flex-wrap py-1 et-bg-content et-bg-content-hover",
          severity: "secondary",
          rounded: "",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => showRawData.value = !showRawData.value, ["stop", "prevent"]))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_112, [
              createBaseVNode("span", _hoisted_113, [
                createTextVNode(toDisplayString(unref($t)("tx-details:certificate.gov.rawData")), 1),
                createVNode(_sfc_main$v, {
                  compact: "",
                  "copy-text": JSON.stringify(unref(certList)),
                  class: "mx-2"
                }, null, 8, ["copy-text"])
              ]),
              showRawData.value ? (openBlock(), createBlock(IconArrowDown01, {
                key: 0,
                class: "w-6"
              })) : (openBlock(), createBlock(IconArrowUp01, {
                key: 1,
                class: "w-6"
              }))
            ])
          ]),
          _: 1
        }),
        showRawData.value ? (openBlock(), createElementBlock("div", _hoisted_114, [
          createVNode(_sfc_main$C, { data: unref(certList) }, null, 8, ["data"])
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
});

const TransactionCertificates = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-11126ddf"]]);

const _hoisted_1$e = {
  key: 0,
  class: "flex flex-col et-gap-sm w-full"
};
const _hoisted_2$8 = { class: "ml-3 sm:ml-4 et-text-sm font-semibold whitespace-nowrap" };
const _hoisted_3$7 = { class: "grow" };
const _hoisted_4$5 = { class: "break-all" };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "TransactionWithdrawals",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const txWithdrawals = props.txInfos.txWithdrawals;
    const {
      numWithdrawals,
      hasWithdrawals,
      withdrawalMap
    } = txWithdrawals;
    const withdrawalList = computed(() => {
      return withdrawalMap.value ? Object.entries(withdrawalMap.value) : [];
    });
    return (_ctx, _cache) => {
      return unref(hasWithdrawals) ? (openBlock(), createElementBlock("div", _hoisted_1$e, [
        createBaseVNode("div", _hoisted_2$8, toDisplayString(unref(numWithdrawals) + " " + unref($t)("tx-details:withdrawal.label", { count: unref(numWithdrawals) })), 1),
        (openBlock(true), createElementBlock(Fragment, null, renderList(withdrawalList.value, ([stakeAddress, quantity]) => {
          return openBlock(), createElementBlock("div", {
            key: "withdrawal-" + stakeAddress,
            class: "w-full flex flex-row flex-wrap et-jb-ic p-3 sm:p-4 p-card et-gap-md"
          }, [
            createBaseVNode("div", _hoisted_3$7, [
              createVNode(_sfc_main$u, {
                label: stakeAddress,
                subject: { bech32: stakeAddress, hash: unref(decodeBech32)(stakeAddress) },
                type: "address",
                "copy-text": stakeAddress
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", _hoisted_4$5, toDisplayString(stakeAddress), 1)
                ]),
                _: 2
              }, 1032, ["label", "subject", "copy-text"])
            ]),
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "grow" }, null, -1)),
            createVNode(_sfc_main$w, {
              amount: quantity,
              "with-sign": false
            }, null, 8, ["amount"])
          ]);
        }), 128))
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$d = {
  key: 0,
  class: "flex flex-col et-gap-sm w-full"
};
const _hoisted_2$7 = { class: "flex et-jc-ic et-gap-xs et-text-sm text-txt-muted" };
const _hoisted_3$6 = {
  key: 0,
  class: "w-full"
};
const _hoisted_4$4 = { class: "cap-first" };
const _hoisted_5$4 = { class: "break-all my-1" };
const _hoisted_6$4 = { class: "w-full flex flex-col et-js-is et-gap-xs" };
const _hoisted_7$4 = { class: "" };
const _hoisted_8$4 = { class: "flex flex-row" };
const _hoisted_9$4 = { class: "min-w-32 flex et-ic" };
const _hoisted_10$4 = { class: "" };
const _hoisted_11$3 = { class: "flex flex-row" };
const _hoisted_12$3 = { class: "min-w-32 flex et-ic" };
const _hoisted_13$3 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_14$3 = { class: "flex flex-row" };
const _hoisted_15$3 = { class: "min-w-32 flex et-ic" };
const _hoisted_16$3 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_17$3 = { class: "flex flex-row" };
const _hoisted_18$2 = { class: "min-w-32 flex et-ic" };
const _hoisted_19$2 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_20$2 = { class: "flex flex-row" };
const _hoisted_21$2 = { class: "min-w-32 flex et-ic" };
const _hoisted_22$2 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_23$2 = { class: "flex flex-row break-all" };
const _hoisted_24$1 = { class: "min-w-32 flex et-ic" };
const _hoisted_25$1 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_26$1 = {
  key: 0,
  class: "flex flex-row break-all"
};
const _hoisted_27$1 = { class: "min-w-32 flex et-ic" };
const _hoisted_28$1 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_29$1 = {
  key: 1,
  class: "flex flex-col break-all"
};
const _hoisted_30$1 = { class: "flex flex-row" };
const _hoisted_31$1 = { class: "min-w-32 flex et-ic" };
const _hoisted_32$1 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_33 = {
  key: 1,
  class: "w-full flex flex-col et-js-is"
};
const _hoisted_34 = { class: "" };
const _hoisted_35 = {
  key: 0,
  class: "flex flex-row break-all"
};
const _hoisted_36 = { class: "min-w-32" };
const _hoisted_37 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_38 = {
  key: 1,
  class: "flex flex-row break-all"
};
const _hoisted_39 = { class: "min-w-32" };
const _hoisted_40 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_41 = {
  key: 2,
  class: "flex flex-col break-all"
};
const _hoisted_42 = { class: "flex flex-row" };
const _hoisted_43 = { class: "min-w-32 flex et-ic" };
const _hoisted_44 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_45 = {
  key: 2,
  class: "w-full flex flex-col et-js-is"
};
const _hoisted_46 = { class: "" };
const _hoisted_47 = {
  key: 0,
  class: "flex flex-row break-all"
};
const _hoisted_48 = { class: "min-w-32" };
const _hoisted_49 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_50 = {
  key: 1,
  class: "flex flex-row break-all"
};
const _hoisted_51 = { class: "min-w-32" };
const _hoisted_52 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_53 = {
  key: 2,
  class: "flex flex-row break-all"
};
const _hoisted_54 = { class: "min-w-32" };
const _hoisted_55 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_56 = { class: "flex et-jc-ic et-gap-xs et-text-sm text-txt-muted" };
const _hoisted_57 = { class: "w-full flex flex-col et-js-is et-gap-xs" };
const _hoisted_58 = { class: "flex flex-row mb-1.5" };
const _hoisted_59 = { class: "min-w-32 flex et-ic" };
const _hoisted_60 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_61 = { class: "flex flex-row" };
const _hoisted_62 = { class: "min-w-32 flex et-ic" };
const _hoisted_63 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_64 = { class: "flex flex-row" };
const _hoisted_65 = { class: "min-w-32 flex et-ic" };
const _hoisted_66 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_67 = { class: "flex flex-row" };
const _hoisted_68 = { class: "min-w-32 flex et-ic" };
const _hoisted_69 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_70 = {
  key: 0,
  class: "flex flex-col break-all"
};
const _hoisted_71 = { class: "flex flex-row" };
const _hoisted_72 = { class: "min-w-32 flex et-ic" };
const _hoisted_73 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_74 = { class: "flex et-jc-ic et-gap-xs et-text-sm text-txt-muted" };
const _hoisted_75 = { class: "w-full flex flex-col et-js-is et-gap-xs" };
const _hoisted_76 = { class: "flex flex-row mb-1.5" };
const _hoisted_77 = { class: "min-w-32 flex et-ic" };
const _hoisted_78 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_79 = { class: "flex flex-row" };
const _hoisted_80 = { class: "min-w-32 flex et-ic" };
const _hoisted_81 = { class: "min-w-32 flex flex-row et-js-ic et-gap-sm break-all" };
const _hoisted_82 = {
  key: 0,
  class: "flex flex-col break-all"
};
const _hoisted_83 = { class: "flex flex-row" };
const _hoisted_84 = { class: "min-w-32 flex et-ic" };
const _hoisted_85 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "TransactionScripts",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const txCbor = props.txInfos.txCbor;
    const txAuxData = props.txInfos.txAuxData;
    const {
      tx,
      nativeScriptList,
      plutusContractList
    } = txCbor;
    const {
      auxNativeScriptList,
      auxPlutusScriptList
    } = txAuxData;
    const showPlutusContract = ref(true);
    const showPlutusScript = ref(true);
    const showNative = ref(true);
    const uiNativeScriptList = computed(() => {
      const _nativeScriptList = [];
      for (const script of nativeScriptList.value) {
        _nativeScriptList.push({
          ...script,
          type: "witness"
        });
      }
      for (const script of auxNativeScriptList.value) {
        _nativeScriptList.push({
          ...script,
          type: "aux"
        });
      }
      return _nativeScriptList;
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return unref(tx) ? (openBlock(), createElementBlock("div", _hoisted_1$d, [
        unref(plutusContractList).length > 0 ? (openBlock(), createBlock(_component_Button, {
          key: 0,
          class: "flex flex-row et-jc-ic flex-wrap py-1 et-bg-content et-bg-content-hover border-border-1",
          severity: "secondary",
          rounded: "",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => showPlutusContract.value = !showPlutusContract.value, ["stop", "prevent"]))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2$7, [
              createBaseVNode("div", null, [
                createBaseVNode("span", null, toDisplayString(unref(plutusContractList).length), 1),
                _cache[3] || (_cache[3] = createTextVNode("  ", -1)),
                createBaseVNode("span", null, toDisplayString(unref($t)("tx-details:plutuscontract.label", { count: unref(plutusContractList).length })), 1)
              ]),
              showPlutusContract.value ? (openBlock(), createBlock(IconArrowDown01, {
                key: 0,
                class: "size-6"
              })) : (openBlock(), createBlock(IconArrowUp01, {
                key: 1,
                class: "size-6"
              }))
            ])
          ]),
          _: 1
        })) : createCommentVNode("", true),
        showPlutusContract.value && unref(plutusContractList).length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(plutusContractList), (sc, index) => {
          return openBlock(), createElementBlock("div", {
            key: "pcl" + index,
            class: "flex flex-wrap et-js-ic p-3 sm:p-4 p-card et-gap-sm et-text-xs text-txt-muted"
          }, [
            sc.address || sc.scriptHash ? (openBlock(), createElementBlock("div", _hoisted_3$6, [
              createBaseVNode("div", _hoisted_4$4, toDisplayString(unref($t)("tx-details:plutuscontract.label_one")), 1),
              createVNode(_sfc_main$u, {
                compact: "",
                label: sc.address || sc.scriptHash,
                subject: sc.address ? { hash: unref(toHexString)(unref(getAddressCredentials)(sc.address, null, true).addressBytes), bech32: sc.address } : sc.scriptHash,
                type: sc.address ? "address" : "policy",
                "copy-text": sc.address || sc.scriptHash
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", _hoisted_5$4, toDisplayString(sc.address || sc.scriptHash), 1)
                ]),
                _: 2
              }, 1032, ["label", "subject", "type", "copy-text"])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_6$4, [
              createBaseVNode("div", _hoisted_7$4, toDisplayString(unref($t)("tx-details:plutuscontract.redeemer")), 1),
              createBaseVNode("div", _hoisted_8$4, [
                createBaseVNode("div", _hoisted_9$4, toDisplayString(unref($t)("tx-details:plutuscontract.valid")), 1),
                createBaseVNode("div", _hoisted_10$4, toDisplayString(sc.validContract), 1)
              ]),
              createBaseVNode("div", _hoisted_11$3, [
                createBaseVNode("div", _hoisted_12$3, toDisplayString(unref($t)("tx-details:plutus.redeemer.purpose")), 1),
                createBaseVNode("div", _hoisted_13$3, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.input.redeemer.purpose
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.input.redeemer.purpose), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_14$3, [
                createBaseVNode("div", _hoisted_15$3, toDisplayString(unref($t)("tx-details:plutus.redeemer.fee")), 1),
                createBaseVNode("div", _hoisted_16$3, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.input.redeemer.fee
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.input.redeemer.fee), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_17$3, [
                createBaseVNode("div", _hoisted_18$2, toDisplayString(unref($t)("tx-details:plutus.redeemer.usteps")), 1),
                createBaseVNode("div", _hoisted_19$2, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.input.redeemer.unit.steps
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.input.redeemer.unit.steps), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_20$2, [
                createBaseVNode("div", _hoisted_21$2, toDisplayString(unref($t)("tx-details:plutus.redeemer.umem")), 1),
                createBaseVNode("div", _hoisted_22$2, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.input.redeemer.unit.mem
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.input.redeemer.unit.mem), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_23$2, [
                createBaseVNode("div", _hoisted_24$1, toDisplayString(unref($t)("tx-details:plutus.redeemer.dhash")), 1),
                createBaseVNode("div", _hoisted_25$1, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.input.redeemer.datum.hash
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.input.redeemer.datum.hash), 1)
                ])
              ]),
              sc.input.redeemer.datum.bytes ? (openBlock(), createElementBlock("div", _hoisted_26$1, [
                createBaseVNode("div", _hoisted_27$1, toDisplayString(unref($t)("tx-details:plutus.redeemer.dvalue")), 1),
                createBaseVNode("div", _hoisted_28$1, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.input.redeemer.datum.bytes
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.input.redeemer.datum.bytes), 1)
                ])
              ])) : createCommentVNode("", true),
              sc.input.redeemer.datum.value ? (openBlock(), createElementBlock("div", _hoisted_29$1, [
                createBaseVNode("div", _hoisted_30$1, [
                  createBaseVNode("div", _hoisted_31$1, toDisplayString(unref($t)("tx-details:plutus.redeemer.djson")), 1),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": JSON.stringify(sc.input.redeemer.datum.value)
                  }, null, 8, ["copy-text"])
                ]),
                createBaseVNode("div", _hoisted_32$1, [
                  createVNode(_sfc_main$C, {
                    data: sc.input.redeemer.datum.value,
                    deep: 0
                  }, null, 8, ["data"])
                ])
              ])) : createCommentVNode("", true)
            ]),
            sc.input.datum ? (openBlock(), createElementBlock("div", _hoisted_33, [
              createBaseVNode("div", _hoisted_34, toDisplayString(unref($t)("tx-details:plutuscontract.datum")), 1),
              sc.input.datum.hash ? (openBlock(), createElementBlock("div", _hoisted_35, [
                createBaseVNode("div", _hoisted_36, toDisplayString(unref($t)("tx-details:plutus:datum:hash")), 1),
                createBaseVNode("div", _hoisted_37, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.input.datum.hash
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.input.datum.hash), 1)
                ])
              ])) : createCommentVNode("", true),
              sc.input.datum.bytes ? (openBlock(), createElementBlock("div", _hoisted_38, [
                createBaseVNode("div", _hoisted_39, toDisplayString(unref($t)("tx-details:plutus:datum:bytecode")), 1),
                createBaseVNode("div", _hoisted_40, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.input.datum.bytes
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.input.datum.bytes), 1)
                ])
              ])) : createCommentVNode("", true),
              sc.input.datum.value ? (openBlock(), createElementBlock("div", _hoisted_41, [
                createBaseVNode("div", _hoisted_42, [
                  createBaseVNode("div", _hoisted_43, toDisplayString(unref($t)("tx-details:plutus:datum:json")), 1),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": JSON.stringify(sc.input.datum.value)
                  }, null, 8, ["copy-text"])
                ]),
                createBaseVNode("div", _hoisted_44, [
                  createVNode(_sfc_main$C, {
                    data: sc.input.datum.value,
                    deep: 0
                  }, null, 8, ["data"])
                ])
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            sc.size || sc.scriptHash || sc.bytecode ? (openBlock(), createElementBlock("div", _hoisted_45, [
              createBaseVNode("div", _hoisted_46, toDisplayString(unref($t)("tx-details:plutuscontract.script.label")), 1),
              sc.size ? (openBlock(), createElementBlock("div", _hoisted_47, [
                createBaseVNode("div", _hoisted_48, toDisplayString(unref($t)("tx-details:plutuscontract.script.size")), 1),
                createBaseVNode("div", _hoisted_49, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.size + ""
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.size), 1)
                ])
              ])) : createCommentVNode("", true),
              sc.scriptHash ? (openBlock(), createElementBlock("div", _hoisted_50, [
                createBaseVNode("div", _hoisted_51, toDisplayString(unref($t)("tx-details:plutuscontract.script.hash")), 1),
                createBaseVNode("div", _hoisted_52, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.scriptHash
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.scriptHash), 1)
                ])
              ])) : createCommentVNode("", true),
              sc.bytecode ? (openBlock(), createElementBlock("div", _hoisted_53, [
                createBaseVNode("div", _hoisted_54, toDisplayString(unref($t)("tx-details:plutuscontract.script.bytecode")), 1),
                createBaseVNode("div", _hoisted_55, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": sc.bytecode
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(sc.bytecode), 1)
                ])
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ]);
        }), 128)) : createCommentVNode("", true),
        unref(auxPlutusScriptList).length > 0 ? (openBlock(), createBlock(_component_Button, {
          key: 2,
          class: "flex flex-row et-jc-ic flex-wrap py-1 et-bg-content et-bg-content-hover border-border-1",
          severity: "secondary",
          rounded: "",
          onClick: _cache[1] || (_cache[1] = withModifiers(($event) => showPlutusScript.value = !showPlutusScript.value, ["stop", "prevent"]))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_56, [
              createBaseVNode("div", null, [
                createBaseVNode("span", null, toDisplayString(unref(auxPlutusScriptList).length), 1),
                _cache[4] || (_cache[4] = createTextVNode("  ", -1)),
                createBaseVNode("span", null, toDisplayString(unref($t)("tx-details:plutusscript.label")), 1)
              ]),
              showPlutusScript.value ? (openBlock(), createBlock(IconArrowDown01, {
                key: 0,
                class: "w-6"
              })) : (openBlock(), createBlock(IconArrowUp01, {
                key: 1,
                class: "w-6"
              }))
            ])
          ]),
          _: 1
        })) : createCommentVNode("", true),
        showPlutusScript.value && unref(auxPlutusScriptList).length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList(unref(auxPlutusScriptList), (script, index) => {
          return openBlock(), createElementBlock("div", {
            key: "nsl" + index,
            class: "flex flex-wrap et-js-ic p-3 sm:p-4 p-card et-gap-sm et-text-xs text-txt-muted"
          }, [
            createBaseVNode("div", _hoisted_57, [
              createBaseVNode("div", _hoisted_58, [
                createBaseVNode("div", _hoisted_59, toDisplayString(unref($t)("tx-details:plutusscript.type")), 1),
                createBaseVNode("div", _hoisted_60, [
                  createBaseVNode("div", null, toDisplayString(script.type), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_61, [
                createBaseVNode("div", _hoisted_62, toDisplayString(unref($t)("tx-details:plutusscript.size")), 1),
                createBaseVNode("div", _hoisted_63, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": script.size.toString()
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(script.size), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_64, [
                createBaseVNode("div", _hoisted_65, toDisplayString(unref($t)("tx-details:plutusscript.hash")), 1),
                createBaseVNode("div", _hoisted_66, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": script.hash
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(script.hash), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_67, [
                createBaseVNode("div", _hoisted_68, toDisplayString(unref($t)("tx-details:plutusscript.bytes")), 1),
                createBaseVNode("div", _hoisted_69, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": script.bytes
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(script.bytes), 1)
                ])
              ]),
              script.value && typeof script.value === "object" ? (openBlock(), createElementBlock("div", _hoisted_70, [
                createBaseVNode("div", _hoisted_71, [
                  createBaseVNode("div", _hoisted_72, toDisplayString(unref($t)("tx-details:plutusscript.value")), 1),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": JSON.stringify(script.value)
                  }, null, 8, ["copy-text"])
                ]),
                createBaseVNode("div", _hoisted_73, [
                  createVNode(_sfc_main$C, {
                    data: script.value,
                    deep: 0
                  }, null, 8, ["data"])
                ])
              ])) : createCommentVNode("", true)
            ])
          ]);
        }), 128)) : createCommentVNode("", true),
        uiNativeScriptList.value.length > 0 ? (openBlock(), createBlock(_component_Button, {
          key: 4,
          class: "flex flex-row et-jc-ic flex-wrap py-1 et-bg-content et-bg-content-hover border-border-1",
          severity: "secondary",
          rounded: "",
          onClick: _cache[2] || (_cache[2] = withModifiers(($event) => showNative.value = !showNative.value, ["stop", "prevent"]))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_74, [
              createBaseVNode("div", null, [
                createBaseVNode("span", null, toDisplayString(uiNativeScriptList.value.length), 1),
                _cache[5] || (_cache[5] = createTextVNode("  ", -1)),
                createBaseVNode("span", null, toDisplayString(unref($t)("tx-details:nativescript.label")), 1)
              ]),
              showNative.value ? (openBlock(), createBlock(IconArrowDown01, {
                key: 0,
                class: "w-6"
              })) : (openBlock(), createBlock(IconArrowUp01, {
                key: 1,
                class: "w-6"
              }))
            ])
          ]),
          _: 1
        })) : createCommentVNode("", true),
        showNative.value && uiNativeScriptList.value.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 5 }, renderList(uiNativeScriptList.value, (script, index) => {
          return openBlock(), createElementBlock("div", {
            key: "nsl" + index,
            class: "flex flex-wrap et-js-ic p-3 sm:p-4 p-card et-gap-sm et-text-xs text-txt-muted"
          }, [
            createBaseVNode("div", _hoisted_75, [
              createBaseVNode("div", _hoisted_76, [
                createBaseVNode("div", _hoisted_77, toDisplayString(unref($t)("tx-details:nativescript:type")), 1),
                createBaseVNode("div", _hoisted_78, [
                  createBaseVNode("div", null, toDisplayString(unref($t)(`tx-details:nativescript:${script.type}`)), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_79, [
                createBaseVNode("div", _hoisted_80, toDisplayString(unref($t)("tx-details:nativescript:hash")), 1),
                createBaseVNode("div", _hoisted_81, [
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": script.scriptHash
                  }, null, 8, ["copy-text"]),
                  createBaseVNode("div", null, toDisplayString(script.scriptHash), 1)
                ])
              ]),
              script.json ? (openBlock(), createElementBlock("div", _hoisted_82, [
                createBaseVNode("div", _hoisted_83, [
                  createBaseVNode("div", _hoisted_84, toDisplayString(unref($t)("tx-details:nativescript:json")), 1),
                  createVNode(_sfc_main$v, {
                    compact: "",
                    "copy-text": JSON.stringify(script.json)
                  }, null, 8, ["copy-text"])
                ]),
                createBaseVNode("div", _hoisted_85, [
                  createVNode(_sfc_main$C, {
                    data: script.json,
                    deep: 0
                  }, null, 8, ["data"])
                ])
              ])) : createCommentVNode("", true)
            ])
          ]);
        }), 128)) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$c = {
  key: 0,
  class: "w-full flex flex-row et-js-ic p-3 sm:p-4 p-card overflow-x-auto"
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "TransactionWitnesses",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const witnessSet = computed(() => {
      const _witnessSet = props.txInfos.txCbor.txWitnesses.witnessSet.value;
      if (_witnessSet?.vkeys) {
        for (const witness of _witnessSet.vkeys) {
          try {
            const cslPubKey = PublicKey.from_bech32(witness.vkey);
            const cslKeyHash = cslPubKey.hash();
            const cslCred = Credential.from_keyhash(cslKeyHash);
            const cred = getCredFromCredentials(cslCred);
            const _witness = witness;
            _witness.credential = cred;
            safeFreeCSLObject(cslCred);
            safeFreeCSLObject(cslKeyHash);
            safeFreeCSLObject(cslPubKey);
          } catch (e) {
          }
        }
      }
      return _witnessSet;
    });
    return (_ctx, _cache) => {
      return witnessSet.value ? (openBlock(), createElementBlock("div", _hoisted_1$c, [
        createVNode(_sfc_main$C, { data: witnessSet.value }, null, 8, ["data"])
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$b = {
  key: 0,
  class: "flex flex-col et-gap-sm w-full"
};
const _hoisted_2$6 = { class: "ml-3 sm:ml-4 et-text-sm font-semibold whitespace-nowrap" };
const _hoisted_3$5 = { class: "cert-value" };
const _hoisted_4$3 = { class: "cert-table-width break-all" };
const _hoisted_5$3 = { key: 0 };
const _hoisted_6$3 = { key: 1 };
const _hoisted_7$3 = { class: "cert-table-width break-all" };
const _hoisted_8$3 = { key: 0 };
const _hoisted_9$3 = {
  key: 0,
  class: "w-full font-mono"
};
const _hoisted_10$3 = {
  key: 0,
  class: "cursor-pointer flex flex-nowrap items-start truncate"
};
const _hoisted_11$2 = ["href"];
const _hoisted_12$2 = { class: "self-center" };
const _hoisted_13$2 = { key: 1 };
const _hoisted_14$2 = { key: 1 };
const _hoisted_15$2 = {
  key: 0,
  class: "w-full font-mono"
};
const _hoisted_16$2 = {
  key: 0,
  class: "cursor-pointer flex et-is truncate"
};
const _hoisted_17$2 = ["href"];
const _hoisted_18$1 = { class: "self-center" };
const _hoisted_19$1 = { key: 1 };
const _hoisted_20$1 = { class: "flex et-jc-ic et-gap-xs et-text-sm" };
const _hoisted_21$1 = { class: "et-text-sm p-0" };
const _hoisted_22$1 = { class: "mr-2" };
const _hoisted_23$1 = {
  key: 1,
  class: "w-full flex flex-row et-js-is et-gap-sm p-3 sm:p-4 p-card overflow-x-auto"
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "TransactionMetadata",
  props: {
    txInfos: { type: Object, required: true },
    decryptedMsg: { type: Array, required: false }
  },
  setup(__props) {
    const props = __props;
    const txAuxData = props.txInfos.txAuxData;
    const {
      hasMetadata,
      metadata,
      auxData
    } = txAuxData;
    const $t = useTranslation().t;
    const { isSmallerThanSM } = useScreenSize();
    const _metadataList = computed(() => hasMetadata.value ? Object.entries(metadata.value) : []);
    const isMilkomeda = computed(() => isMilkomedaTx(auxData.value, networkId.value));
    const milkomedaUrl = computed(() => isMilkomeda.value ? getNetworkExplorerUrlFromItx(networkId.value, auxData.value) : void 0);
    const showRawData = ref(false);
    const decodedJson = ref({});
    const getJsonMetadata = (index, metadata2) => {
      if (decodedJson.value.hasOwnProperty(index.toString())) {
        return decodedJson.value[index.toString()];
      }
      const json = {};
      createJsonFromCborJson(JSON.parse(metadata2[1]), json, void 0, false);
      if (metadata2[0] === "674" && (props.decryptedMsg?.length ?? 0) > 0) {
        json.msg = props.decryptedMsg;
      }
      return json;
    };
    const onMultiSigDecode = (index, json) => {
      decodedJson.value[index.toString()] = json;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return _metadataList.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$b, [
        createBaseVNode("div", _hoisted_2$6, toDisplayString(_metadataList.value.length + " " + unref($t)("tx-details:metadata.label", { count: _metadataList.value.length })), 1),
        _metadataList.value.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_metadataList.value, (sc, index) => {
          return openBlock(), createElementBlock("div", {
            key: "pcl" + index,
            class: "flex flex-wrap et-js-is p-3 sm:p-4 p-card et-gap-md"
          }, [
            createBaseVNode("div", _hoisted_3$5, [
              createBaseVNode("div", _hoisted_4$3, [
                unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_5$3, toDisplayString(sc[0]), 1)) : createCommentVNode("", true),
                createVNode(_sfc_main$v, {
                  compact: "",
                  "copy-text": sc[0]
                }, null, 8, ["copy-text"]),
                !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_6$3, toDisplayString(sc[0]), 1)) : createCommentVNode("", true),
                sc[0] === "1854" ? (openBlock(), createBlock(_sfc_main$D, {
                  key: 2,
                  "metadata-string": sc[1],
                  onDecrypt: ($event) => onMultiSigDecode(index, $event),
                  onEncrypt: ($event) => onMultiSigDecode(index, $event)
                }, null, 8, ["metadata-string", "onDecrypt", "onEncrypt"])) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_7$3, [
                unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_8$3, [
                  unref(getMetadataType)(sc[1]) === "string" || unref(getMetadataType)(sc[1]) === "number" ? (openBlock(), createElementBlock("div", _hoisted_9$3, [
                    isMilkomeda.value && sc[0] === String(unref(networkMetadataAddressKey)) ? (openBlock(), createElementBlock("div", _hoisted_10$3, [
                      createBaseVNode("a", {
                        href: milkomedaUrl.value,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "flex flex-row et-is truncate"
                      }, [
                        createBaseVNode("div", _hoisted_12$2, toDisplayString(unref(getJsonValue)(sc[1])), 1)
                      ], 8, _hoisted_11$2)
                    ])) : (openBlock(), createElementBlock("span", _hoisted_13$2, toDisplayString(unref(getJsonValue)(sc[1])), 1))
                  ])) : (openBlock(), createBlock(_sfc_main$C, {
                    key: 1,
                    data: getJsonMetadata(index, sc)
                  }, null, 8, ["data"]))
                ])) : createCommentVNode("", true),
                createVNode(_sfc_main$v, {
                  compact: "",
                  "copy-text": JSON.stringify(sc[1], null, 2)
                }, null, 8, ["copy-text"]),
                !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_14$2, [
                  unref(getMetadataType)(sc[1]) === "string" || unref(getMetadataType)(sc[1]) === "number" ? (openBlock(), createElementBlock("div", _hoisted_15$2, [
                    isMilkomeda.value && sc[0] === String(unref(networkMetadataAddressKey)) ? (openBlock(), createElementBlock("div", _hoisted_16$2, [
                      createBaseVNode("a", {
                        href: milkomedaUrl.value,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "flex flex-row et-is italic underline truncate"
                      }, [
                        createBaseVNode("div", _hoisted_18$1, toDisplayString(unref(getJsonValue)(sc[1])), 1)
                      ], 8, _hoisted_17$2)
                    ])) : (openBlock(), createElementBlock("span", _hoisted_19$1, toDisplayString(unref(getJsonValue)(sc[1])), 1))
                  ])) : (openBlock(), createBlock(_sfc_main$C, {
                    key: 1,
                    data: getJsonMetadata(index, sc)
                  }, null, 8, ["data"]))
                ])) : createCommentVNode("", true)
              ])
            ])
          ]);
        }), 128)) : createCommentVNode("", true),
        createVNode(_component_Button, {
          class: "flex flex-row et-jc-ic flex-wrap py-1 et-bg-content et-bg-content-hover",
          severity: "secondary",
          rounded: "",
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => showRawData.value = !showRawData.value, ["stop", "prevent"]))
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_20$1, [
              createBaseVNode("span", _hoisted_21$1, [
                createBaseVNode("span", _hoisted_22$1, toDisplayString(unref($t)("tx-details:metadata.rawData")), 1),
                createVNode(_sfc_main$v, {
                  compact: "",
                  "copy-text": JSON.stringify(unref(metadata))
                }, null, 8, ["copy-text"])
              ]),
              showRawData.value ? (openBlock(), createBlock(IconArrowDown01, {
                key: 0,
                class: "size-6"
              })) : (openBlock(), createBlock(IconArrowUp01, {
                key: 1,
                class: "size-6"
              }))
            ])
          ]),
          _: 1
        }),
        showRawData.value ? (openBlock(), createElementBlock("div", _hoisted_23$1, [
          createVNode(_sfc_main$C, { data: unref(metadata) }, null, 8, ["data"])
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
});

const TransactionMetadata = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-f5067bcb"]]);

const _hoisted_1$a = {
  key: 0,
  class: "w-full flex flex-col et-js-ic et-gap-md overflow-x-auto"
};
const _hoisted_2$5 = {
  key: 1,
  class: "w-full flex flex-col et-js-ic et-gap-md overflow-x-auto"
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "TransactionGovernance",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const txGovernance = props.txInfos?.txGovernance;
    const {
      hasVotes,
      hasProposals,
      voteList,
      proposalList,
      getDRepId,
      getDRepById,
      getGovProposal,
      getGovProposalById
    } = txGovernance;
    const {
      govAction,
      toggleModalGovActionViewer
    } = useModalGovActionViewer();
    const isDRep = (voter) => !!getDRepId(voter);
    const hasDRepData = (voter) => !!getDRepById(getDRepId(voter) ?? "");
    const hasGovProposal = (index) => !!getGovProposal(index);
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(hasVotes) ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(voteList), (voter, voterIndex) => {
            return openBlock(), createElementBlock("div", {
              key: voterIndex,
              class: "w-full flex flex-col et-js-is et-gap-md"
            }, [
              isDRep(voter.voter) && hasDRepData(voter.voter) ? (openBlock(), createBlock(_sfc_main$E, {
                key: 0,
                cardDRepId: unref(getDRepId)(voter.voter)
              }, null, 8, ["cardDRepId"])) : isDRep(voter.voter) ? (openBlock(), createBlock(_sfc_main$F, {
                key: 1,
                dRepId: unref(getDRepId)(voter.voter)
              }, null, 8, ["dRepId"])) : (openBlock(), createBlock(_sfc_main$C, {
                key: 2,
                data: voter.voter
              }, null, 8, ["data"])),
              (openBlock(true), createElementBlock(Fragment, null, renderList(voter.votes, (vote, voteIndex) => {
                return openBlock(), createElementBlock("div", {
                  key: voteIndex,
                  class: "w-full flex flex-col et-js-is et-gap-sm"
                }, [
                  unref(getGovProposalById)(vote.action_id.transaction_id, vote.action_id.index) ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    unstyled: "",
                    class: "gov-action-list w-full p-0 et-js-ic rounded-card shadow-sm cursor-pointer border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)] hover:bg-[var(--p-button-text-secondary-hover-background)]",
                    severity: "secondary",
                    "data-ui": unref(govAction)?.b === unref(getGovProposalById)(vote.action_id.transaction_id, vote.action_id.index).b ? "active" : "",
                    text: "",
                    onClick: withModifiers(($event) => unref(toggleModalGovActionViewer)(unref(getGovProposalById)(vote.action_id.transaction_id, vote.action_id.index)), ["prevent", "stop"])
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$G, {
                        class: "w-full bg-transparent border-0",
                        "gov-action": unref(getGovProposalById)(vote.action_id.transaction_id, vote.action_id.index),
                        "d-rep-id": unref(getDRepId)(voter.voter),
                        "show-not-voted": ""
                      }, null, 8, ["gov-action", "d-rep-id"])
                    ]),
                    _: 2
                  }, 1032, ["data-ui", "onClick"])) : (openBlock(), createBlock(_sfc_main$H, {
                    key: 1,
                    "gov-action-id": unref(getGovProposalId)(vote.action_id.transaction_id, vote.action_id.index)
                  }, null, 8, ["gov-action-id"])),
                  isDRep(voter.voter) ? (openBlock(), createBlock(_sfc_main$I, {
                    key: 2,
                    "gov-action": unref(getGovProposalById)(vote.action_id.transaction_id, vote.action_id.index),
                    "d-rep-id": unref(getDRepId)(voter.voter)
                  }, null, 8, ["gov-action", "d-rep-id"])) : createCommentVNode("", true)
                ]);
              }), 128))
            ]);
          }), 128))
        ])) : createCommentVNode("", true),
        unref(hasProposals) ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(proposalList), (proposal, index) => {
            return openBlock(), createElementBlock(Fragment, null, [
              hasGovProposal(index) ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                unstyled: "",
                class: "gov-action-list w-full p-0 et-js-ic rounded-card shadow-sm cursor-pointer border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)] hover:bg-[var(--p-button-text-secondary-hover-background)]",
                severity: "secondary",
                "data-ui": unref(govAction)?.b === unref(getGovProposal)(index).b ? "active" : "",
                text: "",
                onClick: withModifiers(($event) => unref(toggleModalGovActionViewer)(unref(getGovProposal)(index)), ["prevent", "stop"])
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$G, {
                    class: "w-full bg-transparent border-0",
                    "gov-action": unref(getGovProposal)(index),
                    "show-not-voted": ""
                  }, null, 8, ["gov-action"])
                ]),
                _: 2
              }, 1032, ["data-ui", "onClick"])) : createCommentVNode("", true)
            ], 64);
          }), 256))
        ])) : createCommentVNode("", true),
        unref(hasProposals) ? (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(unref(proposalList), (proposal, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "w-full flex flex-row et-js-ic p-3 sm:p-4 p-card overflow-x-auto"
          }, [
            createVNode(_sfc_main$C, { data: proposal }, null, 8, ["data"])
          ]);
        }), 128)) : createCommentVNode("", true),
        unref(hasVotes) ? (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList(unref(voteList), (vote, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "w-full flex flex-col et-js-ic p-3 sm:p-4 p-card overflow-x-auto"
          }, [
            createVNode(_sfc_main$C, { data: vote }, null, 8, ["data"])
          ]);
        }), 128)) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _hoisted_1$9 = {
  key: 0,
  class: "w-full flex flex-row et-js-ic p-3 sm:p-4 p-card overflow-x-auto"
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "TransactionParamUpdate",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const paramUpdate = props.txInfos?.txParamUpdate.paramUpdate;
    return (_ctx, _cache) => {
      return unref(paramUpdate) ? (openBlock(), createElementBlock("div", _hoisted_1$9, [
        createVNode(_sfc_main$C, { data: unref(paramUpdate) }, null, 8, ["data"])
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$8 = {
  key: 0,
  class: "w-full flex flex-row et-js-ic p-3 sm:p-4 p-card overflow-x-auto"
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "TransactionRequiredSigners",
  props: {
    txInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const requiredSigners = props.txInfos.txRequiredSigners.requiredSigners;
    return (_ctx, _cache) => {
      return unref(requiredSigners) ? (openBlock(), createElementBlock("div", _hoisted_1$8, [
        createVNode(_sfc_main$C, { data: unref(requiredSigners) }, null, 8, ["data"])
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$7 = {
  key: 0,
  class: "w-full flex flex-row flex-wrap et-je-is et-gap-sm"
};
const _hoisted_2$4 = { key: 0 };
const _hoisted_3$4 = { class: "w-full flex flex-row et-jb-ic et-gap-sm" };
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "TransactionViewer",
  props: {
    txBalance: { type: Object, required: false, default: void 0 },
    localTx: { type: Object, required: false, default: void 0 },
    walletId: { type: String, required: false, default: "" },
    accountId: { type: String, required: false, default: "" },
    stagingTx: { type: Boolean, required: false, default: false },
    pendingTx: { type: Boolean, required: false, default: false },
    sentTx: { type: Boolean, required: false, default: false },
    signedTx: { type: Boolean, required: false, default: false },
    isTxViewer: { type: Boolean, required: false, default: false },
    minimal: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const {
      walletId,
      accountId
    } = toRefs(props);
    const $t = useTranslation().t;
    const viewer = ref(null);
    const { width } = useElementSize(viewer);
    const { isSmallerThanSM } = useScreenSize();
    const { isProMode } = useAppMode();
    const { showTxDetailsButton } = useDetailedTxInfo();
    const isSmall = computed(() => isSmallerThanSM.value || width.value < 450);
    const txBalance = computed(() => props.txBalance);
    const localTx = computed(() => props.localTx);
    const txInfos = useTxInfos(txBalance, localTx, {
      stagingTx: props.stagingTx,
      pendingTx: props.pendingTx,
      sentTx: props.sentTx,
      signedTx: props.signedTx,
      isTxViewer: props.isTxViewer
    });
    const txHash = txInfos.txHash;
    const txCbor = txInfos.txCbor;
    const txCerts = txInfos.txCerts;
    const txGovernance = txInfos.txGovernance;
    const txWithdrawals = txInfos.txWithdrawals;
    const txAuxData = txInfos.txAuxData;
    const txMints = txInfos.txMints;
    const txParamUpdate = txInfos.txParamUpdate;
    const txRequiredSigners = txInfos.txRequiredSigners;
    const {
      tx,
      nativeScriptList,
      plutusContractList,
      txWitnesses
    } = txCbor;
    const {
      mintAssets,
      burnAssets
    } = txMints;
    const { hasCertificates } = txCerts;
    const {
      hasVotes,
      hasProposals
    } = txGovernance;
    const {
      hasWithdrawals,
      hasWithdrawalsAboveZero
    } = txWithdrawals;
    const {
      hasMetadata,
      auxNativeScriptList,
      auxPlutusScriptList
    } = txAuxData;
    const { hasParamUpdate } = txParamUpdate;
    const { hasRequiredSigners } = txRequiredSigners;
    const {
      hasTxNote,
      openModalTransactionNote
    } = useModalTransactionNote(txHash);
    const options = ref([
      { primaryLabel: $t("tx-viewer:inputsOutputs"), value: 1, disabled: false },
      { primaryLabel: $t("tx-viewer:mints"), value: 2, disabled: false },
      { primaryLabel: $t("tx-viewer:withdrawals"), value: 3, disabled: false },
      { primaryLabel: $t("tx-viewer:certificates"), value: 4, disabled: false },
      { primaryLabel: $t("tx-viewer:metadata"), value: 5, disabled: false },
      { primaryLabel: $t("tx-viewer:governance"), value: 6, disabled: false },
      { primaryLabel: $t("tx-viewer:paramupdate"), value: 7, disabled: false },
      // { primaryLabel: $t('tx-viewer:recipient'),      value: 3,  disabled: false },
      { primaryLabel: $t("tx-viewer:scripts"), value: 8, disabled: false },
      { primaryLabel: $t("tx-viewer:witnesses"), value: 9, disabled: false },
      { primaryLabel: $t("tx-viewer:requiredSigners"), value: 10, disabled: false }
    ]);
    const seletedOption = ref(options.value[0]);
    const selectedTab = computed(() => seletedOption.value.value);
    showTxDetailsButton.value = true;
    const updateShowDetailsButton = () => {
      showTxDetailsButton.value = selectedTab.value === 1;
    };
    watch(seletedOption, () => {
      for (const option of options.value) {
        option.disabled = false;
      }
      if (seletedOption.value) {
        seletedOption.value.disabled = true;
      }
    }, { immediate: true });
    watch(selectedTab, () => {
      updateShowDetailsButton();
    }, { immediate: true });
    watch([tx, isProMode], () => {
      if (!tx.value) {
        return;
      }
      const newOptions = [];
      newOptions.push({ primaryLabel: $t("tx-viewer:inputsOutputs"), value: 1, disabled: false });
      if (isProMode.value && (mintAssets.value.length > 0 || burnAssets.value.length > 0)) {
        newOptions.push({ primaryLabel: $t("tx-viewer:mints"), value: 2, disabled: false });
      }
      if (isProMode.value && hasWithdrawals.value || !isProMode.value && hasWithdrawalsAboveZero.value) {
        newOptions.push({ primaryLabel: $t("tx-viewer:withdrawals"), value: 3, disabled: false });
      }
      if (isProMode.value && hasCertificates.value) {
        newOptions.push({ primaryLabel: $t("tx-viewer:certificates"), value: 4, disabled: false });
      }
      if (isProMode.value && hasMetadata.value) {
        newOptions.push({ primaryLabel: $t("tx-viewer:metadata"), value: 5, disabled: false });
      }
      if (isProMode.value && (hasVotes.value || hasProposals.value)) {
        newOptions.push({ primaryLabel: $t("tx-viewer:governance"), value: 6, disabled: false });
      }
      if (isProMode.value && hasParamUpdate.value) {
        newOptions.push({ primaryLabel: $t("tx-viewer:paramupdate"), value: 7, disabled: false });
      }
      if (isProMode.value && (plutusContractList.value.length > 0 || nativeScriptList.value.length > 0 || auxNativeScriptList.value.length > 0 || auxPlutusScriptList.value.length > 0)) {
        newOptions.push({ primaryLabel: $t("tx-viewer:scripts"), value: 8, disabled: false });
      }
      if (isProMode.value && !!txWitnesses.witnessSet.value) {
        newOptions.push({ primaryLabel: $t("tx-viewer:witnesses"), value: 9, disabled: false });
      }
      if (isProMode.value && hasRequiredSigners.value) {
        newOptions.push({ primaryLabel: $t("tx-viewer:requiredSigners"), value: 10, disabled: false });
      }
      options.value = newOptions;
      const activeOption = options.value.find((option) => option.value === selectedTab.value);
      if (activeOption) {
        seletedOption.value = activeOption;
      } else {
        seletedOption.value = options.value[0];
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return txBalance.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "w-full h-full py-1 flex flex-col et-gap-mde sm:et-gap-mde",
        ref_key: "viewer",
        ref: viewer
      }, [
        createBaseVNode("div", null, [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              createVNode(_sfc_main$J, {
                "tx-infos": unref(txInfos),
                "hide-valid-for": true,
                "show-note": false
              }, null, 8, ["tx-infos"]),
              txBalance.value.multiasset ? (openBlock(), createElementBlock("div", _hoisted_1$7, [
                createVNode(_sfc_main$x, {
                  "multi-asset": txBalance.value.multiasset
                }, null, 8, ["multi-asset"])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", null, [
          createVNode(ModalContentCard, { class: "" }, {
            default: withCtx(() => [
              unref(txHash) ? (openBlock(), createBlock(_sfc_main$K, {
                key: 0,
                "tx-hash": unref(txHash),
                "has-link": !__props.pendingTx && !__props.stagingTx
              }, null, 8, ["tx-hash", "has-link"])) : createCommentVNode("", true),
              createVNode(_sfc_main$r, { "tx-infos": unref(txInfos) }, null, 8, ["tx-infos"]),
              createVNode(_sfc_main$q, { "tx-infos": unref(txInfos) }, null, 8, ["tx-infos"]),
              createVNode(_sfc_main$s, { "tx-infos": unref(txInfos) }, null, 8, ["tx-infos"]),
              createVNode(_sfc_main$L, {
                "tx-messages": unref(txInfos).txMessages
              }, null, 8, ["tx-messages"])
            ]),
            _: 1
          })
        ]),
        unref(tx) ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3$4, [
                options.value.length > 1 ? (openBlock(), createBlock(_sfc_main$M, {
                  key: 0,
                  "selected-tab": seletedOption.value,
                  "onUpdate:selectedTab": _cache[0] || (_cache[0] = ($event) => seletedOption.value = $event),
                  "is-small": isSmall.value,
                  "tab-labels": options.value,
                  "compact-on-count": 5,
                  "compact-on-mobile": ""
                }, null, 8, ["selected-tab", "is-small", "tab-labels"])) : createCommentVNode("", true),
                (openBlock(), createBlock(Teleport, {
                  defer: "",
                  to: "#modal-tx-viewer-buttons"
                }, [
                  withDirectives((openBlock(), createBlock(_component_Button, {
                    class: "px-5",
                    label: unref(hasTxNote) ? unref($t)("tx-note:button.editNote.label") : unref($t)("tx-note:button.addNote.label"),
                    severity: "secondary",
                    rounded: "",
                    outlined: "",
                    onClick: unref(openModalTransactionNote)
                  }, {
                    icon: withCtx(() => [
                      unref(hasTxNote) ? (openBlock(), createBlock(IconNotebook, {
                        key: 0,
                        class: "size-5"
                      })) : (openBlock(), createBlock(IconNoteAdd, {
                        key: 1,
                        class: "size-5"
                      }))
                    ]),
                    _: 1
                  }, 8, ["label", "onClick"])), [
                    [
                      _directive_tooltip,
                      unref(hasTxNote) ? unref($t)("tx-note:button.editNote.tooltip") : unref($t)("tx-note:button.addNote.tooltip"),
                      void 0,
                      { top: true }
                    ]
                  ])
                ]))
              ]),
              selectedTab.value === 1 ? (openBlock(), createBlock(_sfc_main$m, {
                key: 0,
                "is-small": isSmall.value,
                "tx-infos": unref(txInfos),
                "wallet-id": unref(walletId),
                "account-id": unref(accountId)
              }, null, 8, ["is-small", "tx-infos", "wallet-id", "account-id"])) : selectedTab.value === 2 ? (openBlock(), createBlock(_sfc_main$k, {
                key: 1,
                "tx-infos": unref(txInfos)
              }, null, 8, ["tx-infos"])) : selectedTab.value === 3 ? (openBlock(), createBlock(_sfc_main$i, {
                key: 2,
                "tx-infos": unref(txInfos)
              }, null, 8, ["tx-infos"])) : selectedTab.value === 4 ? (openBlock(), createBlock(TransactionCertificates, {
                key: 3,
                "tx-infos": unref(txInfos)
              }, null, 8, ["tx-infos"])) : selectedTab.value === 5 ? (openBlock(), createBlock(TransactionMetadata, {
                key: 4,
                "tx-infos": unref(txInfos)
              }, null, 8, ["tx-infos"])) : selectedTab.value === 6 ? (openBlock(), createBlock(_sfc_main$e, {
                key: 5,
                "tx-infos": unref(txInfos)
              }, null, 8, ["tx-infos"])) : selectedTab.value === 7 ? (openBlock(), createBlock(_sfc_main$d, {
                key: 6,
                "tx-infos": unref(txInfos)
              }, null, 8, ["tx-infos"])) : selectedTab.value === 8 ? (openBlock(), createBlock(_sfc_main$h, {
                key: 7,
                "tx-infos": unref(txInfos)
              }, null, 8, ["tx-infos"])) : selectedTab.value === 9 ? (openBlock(), createBlock(_sfc_main$g, {
                key: 8,
                "tx-infos": unref(txInfos)
              }, null, 8, ["tx-infos"])) : selectedTab.value === 10 ? (openBlock(), createBlock(_sfc_main$c, {
                key: 9,
                "tx-infos": unref(txInfos)
              }, null, 8, ["tx-infos"])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true)
      ], 512)) : createCommentVNode("", true);
    };
  }
});

const _sfc_main$a = {  };

const _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M11 6H15.5C17.9853 6 20 8.01472 20 10.5C20 12.9853 17.9853 15 15.5 15H4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M6.99998 12C6.99998 12 4.00001 14.2095 4 15C3.99999 15.7906 7 18 7 18",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconArrowTurnBackward = /*#__PURE__*/_export_sfc(_sfc_main$a, [['render',_sfc_render]]);

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ButtonTxPrevious",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$N, { class: "w-10 h-10 sm:w-12 sm:h-12" }, {
        icon: withCtx(() => [
          createVNode(IconArrowTurnBackward, { class: "w-4 h-4 sm:w-5 sm:h-5" })
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$5 = { class: "mt-2 flex flex-col gap-2 w-[25rem]" };
const _hoisted_2$3 = {
  key: 0,
  class: "text-txt-negative"
};
const _hoisted_3$3 = { class: "mt-2 flex et-je" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "PopoverTxSearch",
  emits: ["validTxHash", "validTxCbor"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const $t = useTranslation().t;
    const input = ref("");
    const inputError = ref("");
    const popover = ref();
    const validateTxHash = (input2) => {
      return isTxHash(input2);
    };
    const validateTxCbor = (input2) => {
      if (isHexString(input2)) {
        try {
          const cslFixedTx = FixedTransaction.from_hex(input2);
          safeFreeCSLObject(cslFixedTx);
          return true;
        } catch (e) {
        }
      }
      return false;
    };
    const validInput = computed(() => {
      inputError.value = "";
      const _str = input.value.replace(/\s/g, "");
      if (!input.value || _str === "") {
        return 0;
      }
      if (validateTxHash(_str)) {
        return 1;
      }
      if (validateTxCbor(_str)) {
        return 2;
      }
      inputError.value = $t("tx-viewer:search.invalidTxHashOrCbor");
      return 0;
    });
    const showPopover = (event) => popover.value?.show(event);
    const hidePopover = () => popover.value?.hide();
    const closePopover = () => {
      inputError.value = "";
      input.value = "";
    };
    const onEnter = () => {
      if (validInput.value === 0) {
        return;
      }
      if (validInput.value === 1) {
        emit("validTxHash", input.value.replace(/\s/g, ""));
        return;
      }
      if (validInput.value === 2) {
        emit("validTxCbor", input.value.replace(/\s/g, ""));
        return;
      }
      hidePopover();
    };
    __expose({ showPopover, hidePopover });
    return (_ctx, _cache) => {
      const _component_InputIcon = resolveComponent("InputIcon");
      const _component_InputText = resolveComponent("InputText");
      const _component_IconField = resolveComponent("IconField");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createBlock(_component_Popover, {
        ref_key: "popover",
        ref: popover,
        onHide: closePopover
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$5, [
            createBaseVNode("div", null, [
              createVNode(_component_IconField, { class: "w-full et-flex" }, {
                default: withCtx(() => [
                  createVNode(_component_InputIcon, { class: "pi pi-search -ml-1.5" }),
                  createVNode(_component_InputText, {
                    modelValue: input.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.value = $event),
                    class: "w-full h-full pl-8 pr-9 rounded-none",
                    placeholder: unref($t)("tx-viewer:search.searchByTxHashOrCbor"),
                    pt: { root: "bg-transparent border-t-0 border-x-0" },
                    autofocus: "",
                    onKeydown: withKeys(onEnter, ["enter"])
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              })
            ]),
            inputError.value ? (openBlock(), createElementBlock("div", _hoisted_2$3, toDisplayString(inputError.value), 1)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_3$3, [
              createVNode(_sfc_main$N, {
                class: "shrink xs:grow-0 h-10",
                label: "Load transaction",
                disabled: !validInput.value,
                onClick: onEnter
              }, null, 8, ["disabled"])
            ])
          ])
        ]),
        _: 1
      }, 512);
    };
  }
});

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ButtonTxSearch",
  emits: ["txHash", "txCbor"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    useTranslation().t;
    const onTxHash = (txHash) => {
      emit("txHash", txHash);
      hidePopover();
    };
    const onTxCbor = (txCbor) => {
      emit("txCbor", txCbor);
      hidePopover();
    };
    const po = ref();
    const showPopover = (event) => {
      po.value?.showPopover(event);
    };
    const hidePopover = () => {
      po.value?.hidePopover();
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Button, {
          class: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg",
          severity: "secondary",
          rounded: "",
          outlined: "",
          onClick: showPopover
        }, {
          icon: withCtx(() => [
            createVNode(IconSearch01, { class: "w-4 h-4 sm:w-5 sm:h-5" })
          ]),
          _: 1
        }),
        createVNode(_sfc_main$8, {
          ref_key: "po",
          ref: po,
          onValidTxHash: onTxHash,
          onValidTxCbor: onTxCbor
        }, null, 512)
      ], 64);
    };
  }
});

const CIP60_Key = "music_metadata_version";
const CIP60V1 = "1";
const CIP60V2 = "2";
const CIP60V3 = "3";
const useMetadataViewer = () => {
  const canHandleMediaType = (mediaType) => {
    if (!mediaType) {
      return false;
    }
    if (mediaType === "text/html") {
      return !isBexApp();
    } else if (mediaType === "application/pdf") {
      return !isBexApp();
    } else if (mediaType === "image/png" || mediaType === "image/jpg" || mediaType === "image/jpeg" || mediaType === "image/webp" || mediaType === "image/gif") {
      return true;
    } else if (mediaType.startsWith("video/")) {
      return true;
    } else if (mediaType.startsWith("audio/")) {
      return true;
    }
    return false;
  };
  const isText = (mediaType) => {
    if (!mediaType) {
      return false;
    }
    switch (mediaType) {
      case "text/html":
      case "application/pdf":
        return true;
    }
    return false;
  };
  const isImage = (mediaType) => {
    switch (mediaType) {
      case "image/png":
      case "image/jpg":
      case "image/jpeg":
      case "image/gif":
      case "image/webp":
        return true;
    }
    return false;
  };
  const isAudio = (mediaType) => mediaType?.startsWith("audio/") ?? false;
  const isVideo = (mediaType) => mediaType?.startsWith("video/") ?? false;
  const getMediaType = (mediaType) => {
    switch (mediaType) {
      case "text/html":
        return MediaType.IFRAME;
      case "application/pdf":
        return MediaType.PDF;
      case "image/png":
      case "image/jpg":
      case "image/jpeg":
      case "image/gif":
      case "image/webp":
        return MediaType.IMAGE;
    }
    if (mediaType?.startsWith("video/")) {
      return MediaType.VIDEO;
    }
    if (mediaType?.startsWith("audio/")) {
      return MediaType.AUDIO;
    }
    return MediaType.UNDEFINED;
  };
  const getMediaTypeDescription = (type) => {
    const mediaType = getMediaType(type);
    switch (mediaType) {
      case MediaType.IFRAME:
        return "assets:media.format.html";
      case MediaType.PDF:
        return "assets:media.format.pdf";
      case MediaType.IMAGE:
        return "assets:media.format.image";
    }
    if (mediaType === MediaType.VIDEO) {
      return "assets:media.format.video";
    }
    if (mediaType === MediaType.AUDIO) {
      return "assets:media.format.audio";
    }
    return MediaType.UNDEFINED;
  };
  const extractMedia = (metadata) => {
    const media = [];
    if (metadata.meta68 && "files" in metadata.meta68) {
      if (metadata.meta68.files) {
        media.push(...metadata.meta68.files);
      }
    }
    if (metadata.meta721?.files) {
      media.push(...metadata.meta721.files);
    }
    if (metadata.meta721?.image) {
      if (!Array.isArray(metadata.meta721?.image)) {
        if (!mediaContainsFile(media, metadata.meta721.image)) {
          media.push({
            mediaType: metadata.meta721?.mediaType ?? "image/png",
            src: metadata.meta721.image
          });
        }
      } else {
        let imageSrc = "";
        imageSrc = metadata.meta721?.image.reduce((carry, curr) => carry + curr, "");
        media.push({
          mediaType: metadata.meta721?.mediaType ?? "image/png",
          src: imageSrc
        });
      }
    }
    if (metadata.meta1155?.asset) {
      if (!mediaContainsFile(media, metadata.meta1155?.asset.ipfs)) {
        media.push({
          mediaType: metadata.meta1155?.asset.mimeType,
          src: metadata.meta1155?.asset.ipfs
        });
      }
    }
    return media.filter((entry) => {
      return canHandleMediaType(entry.mediaType);
    });
  };
  const mediaContainsFile = (media, src) => {
    return media.find((file) => file.src === src);
  };
  const metadataContainsMedia = (metadata) => {
    if (metadata.meta68 && "files" in metadata.meta68) {
      if (metadata.meta68.files) {
        if (metadata.meta68.files?.some((value) => canHandleMediaType(value.mediaType))) {
          return true;
        }
      }
    }
    if (metadata.meta721?.files) {
      if (metadata.meta721.files) {
        if (metadata.meta721.files?.some((value) => canHandleMediaType(value.mediaType))) {
          return true;
        }
      }
    }
    if (metadata.meta721?.image) {
      if (canHandleMediaType(metadata.meta721?.mediaType ?? "image/png")) {
        return true;
      }
      if (!Array.isArray(metadata.meta721?.image)) {
        if (canHandleMediaType(metadata.meta721?.mediaType ?? "image/png")) {
          return true;
        }
      } else {
        for (const image of metadata.meta721?.image) {
          if (canHandleMediaType(image ?? "image/png")) {
            return true;
          }
        }
      }
    }
    if (metadata.meta1155?.asset) {
      if (canHandleMediaType(metadata.meta1155?.asset.mimeType)) {
        return true;
      }
    }
    return false;
  };
  const isCip60Metadata = (metadata) => {
    if (metadata.meta721 && CIP60_Key in metadata.meta721) {
      if (metadata.meta721[CIP60_Key] === CIP60V1 || metadata.meta721[CIP60_Key] === "v" + CIP60V1 || (metadata.meta721[CIP60_Key] === CIP60V2 || metadata.meta721[CIP60_Key] === "v" + CIP60V2 || (metadata.meta721[CIP60_Key] === CIP60V3 || metadata.meta721[CIP60_Key] === "v" + CIP60V3))) {
        return true;
      }
    }
    if (metadata.meta721?.image) {
      const looksLike = metadata.meta721.files?.every((file) => {
        return file.mediaType?.startsWith("audio/") ?? false;
      });
      if (looksLike) {
        return true;
      }
    }
    return false;
  };
  return {
    isText,
    isImage,
    isAudio,
    isVideo,
    getMediaType,
    getMediaTypeDescription,
    extractMedia,
    metadataContainsMedia,
    isCip60Metadata
  };
};

const _hoisted_1$4 = {
  key: 0,
  class: "flex flex-col et-js-ic et-gap-sm xs:et-gap-sme"
};
const _hoisted_2$2 = {
  key: 0,
  class: "w-full flex flex-row 2xs:flex 2xs:flex-row et-jb-is 2xs:et-jb-is"
};
const _hoisted_3$2 = { class: "font-semibold" };
const _hoisted_4$2 = { class: "flex flex-row et-ic et-gap-sm" };
const _hoisted_5$2 = {
  key: 0,
  class: ""
};
const _hoisted_6$2 = {
  key: 1,
  class: "w-full flex flex-col xs:flex-row flex-wrap et-js-is xs:et-jb-ic mt-4"
};
const _hoisted_7$2 = { class: "font-semibold" };
const _hoisted_8$2 = { class: "w-full xs:w-auto max-w-full flex et-je-ic et-gap-sm" };
const _hoisted_9$2 = { class: "w-full truncate break-all" };
const _hoisted_10$2 = {
  key: 2,
  class: "w-full flex flex-col xs:flex-row flex-wrap et-js-is xs:et-jb-ic"
};
const _hoisted_11$1 = { class: "font-semibold" };
const _hoisted_12$1 = { class: "w-full xs:w-auto max-w-full flex et-je-ic et-gap-sm" };
const _hoisted_13$1 = { class: "w-full truncate break-all" };
const _hoisted_14$1 = {
  key: 3,
  class: "w-full flex flex-col xs:flex-row flex-wrap et-js-is xs:et-jb-ic"
};
const _hoisted_15$1 = { class: "font-semibold" };
const _hoisted_16$1 = { class: "w-full xs:w-auto max-w-full flex et-je-ic et-gap-sm" };
const _hoisted_17$1 = { class: "w-full truncate break-all" };
const _hoisted_18 = {
  key: 4,
  class: "w-full flex flex-col xs:flex-row flex-wrap et-js-is xs:et-jb-ic"
};
const _hoisted_19 = { class: "font-semibold cap-first" };
const _hoisted_20 = { class: "w-full xs:w-auto max-w-full flex et-je-ic et-gap-sm" };
const _hoisted_21 = { class: "w-full truncate break-all" };
const _hoisted_22 = {
  key: 5,
  class: "w-full flex flex-col xs:flex-row flex-wrap et-js-is xs:et-jb-ic"
};
const _hoisted_23 = { class: "font-semibold" };
const _hoisted_24 = { class: "w-full xs:w-auto max-w-full flex et-je-ic et-gap-sm" };
const _hoisted_25 = { class: "w-full truncate break-all" };
const _hoisted_26 = {
  key: 6,
  class: "w-full flex flex-col xs:flex-row flex-wrap et-js-is xs:et-jb-ic"
};
const _hoisted_27 = { class: "font-semibold" };
const _hoisted_28 = { class: "w-full xs:w-auto max-w-full flex et-je-ic et-gap-sm" };
const _hoisted_29 = { class: "w-full truncate break-all" };
const _hoisted_30 = {
  key: 7,
  class: "w-full flex flex-col xs:flex-row flex-wrap et-js-is xs:et-jb-ic"
};
const _hoisted_31 = { class: "font-semibold" };
const _hoisted_32 = { class: "w-full xs:w-auto max-w-full" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AssetDetailsOverview",
  props: {
    assetInfos: { type: Object, required: true },
    adaPrice: { type: String, required: false, default: "-" }
  },
  setup(__props) {
    const props = __props;
    const { assetInfos } = toRefs(props);
    const $t = useTranslation().t;
    const {
      assetDetails,
      assetInfo,
      assetTokenRegistry,
      assetDecimals,
      isNFT,
      hasAssetDecimals,
      getTokenRegistrySource
    } = assetInfos.value;
    const description = computed(() => assetTokenRegistry.value?.ds ?? "");
    const url = computed(() => assetTokenRegistry.value?.u ?? "");
    const fingerprint = computed(() => assetDetails.value?.f ?? "");
    const policyId = computed(() => assetDetails.value?.p ?? "");
    const assetHexName = computed(() => assetDetails.value?.t.a ?? "");
    const assetName = computed(() => assetDetails.value?.n ?? "");
    const totalSupply = computed(() => {
      let s = assetInfo.value?.ts;
      if (!s) {
        s = assetInfos?.value?.assetMeta.value?.meta721?.totalSupply?.toString();
      }
      return s ?? "-1";
    });
    const contractAddresses = getContractAddressesByLabel(["minswap", "sundaeswap"]);
    const contractProps = getContractMappingByAddresses(contractAddresses);
    contractProps.map(
      (contract) => createContractBadge(contract, Math.floor(Math.random() * 1e10).toString())
    );
    return (_ctx, _cache) => {
      const _directive_tooltip = resolveDirective("tooltip");
      return unref(assetDetails) ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
        !unref(isNFT) && totalSupply.value !== "-1" ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$2, toDisplayString(unref($t)("common:totalSupply")), 1),
          createBaseVNode("div", _hoisted_4$2, [
            !unref(hasAssetDecimals) ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
              withDirectives(createVNode(IconAlert02, { class: "stroke-et-yellow" }, null, 512), [
                [_directive_tooltip, unref($t)("assets:digits.unknown")]
              ])
            ])) : createCommentVNode("", true),
            createVNode(_sfc_main$O, {
              "text-c-s-s": "w-full et-jc-ic break-all",
              amount: totalSupply.value,
              decimals: unref(assetDecimals),
              currency: ""
            }, null, 8, ["amount", "decimals"])
          ])
        ])) : createCommentVNode("", true),
        assetName.value ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
          createBaseVNode("div", _hoisted_7$2, toDisplayString(unref($t)("common:assetName")), 1),
          createBaseVNode("div", _hoisted_8$2, [
            createVNode(_sfc_main$u, {
              type: "token",
              subject: unref(assetDetails),
              "copy-text": assetName.value,
              "align-right": "",
              "popover-left": ""
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_9$2, toDisplayString(assetName.value), 1)
              ]),
              _: 1
            }, 8, ["subject", "copy-text"])
          ])
        ])) : createCommentVNode("", true),
        description.value ? (openBlock(), createElementBlock("div", _hoisted_10$2, [
          createBaseVNode("div", _hoisted_11$1, toDisplayString(unref($t)("common:description")), 1),
          createBaseVNode("div", _hoisted_12$1, [
            createBaseVNode("div", _hoisted_13$1, toDisplayString(description.value), 1),
            createVNode(_sfc_main$v, {
              "copy-text": description.value,
              "notification-text": unref($t)("common:copied.description")
            }, null, 8, ["copy-text", "notification-text"])
          ])
        ])) : createCommentVNode("", true),
        url.value ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
          createBaseVNode("div", _hoisted_15$1, toDisplayString(unref($t)("common:website")), 1),
          createBaseVNode("div", _hoisted_16$1, [
            createVNode(_sfc_main$u, {
              type: "url",
              subject: { url: url.value },
              "copy-text": url.value,
              "align-right": "",
              "popover-left": ""
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_17$1, toDisplayString(url.value), 1)
              ]),
              _: 1
            }, 8, ["subject", "copy-text"])
          ])
        ])) : createCommentVNode("", true),
        fingerprint.value ? (openBlock(), createElementBlock("div", _hoisted_18, [
          createBaseVNode("div", _hoisted_19, toDisplayString(unref($t)("common:fingerprint")), 1),
          createBaseVNode("div", _hoisted_20, [
            createVNode(_sfc_main$u, {
              type: "fingerprint",
              subject: unref(assetDetails),
              "copy-text": fingerprint.value,
              "align-right": "",
              "popover-left": ""
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_21, toDisplayString(fingerprint.value), 1)
              ]),
              _: 1
            }, 8, ["subject", "copy-text"])
          ])
        ])) : createCommentVNode("", true),
        policyId.value ? (openBlock(), createElementBlock("div", _hoisted_22, [
          createBaseVNode("div", _hoisted_23, toDisplayString(unref($t)("common:policyid")), 1),
          createBaseVNode("div", _hoisted_24, [
            createVNode(_sfc_main$u, {
              type: "policy",
              subject: policyId.value,
              "copy-text": policyId.value,
              "align-right": "",
              "popover-left": ""
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_25, toDisplayString(policyId.value), 1)
              ]),
              _: 1
            }, 8, ["subject", "copy-text"])
          ])
        ])) : createCommentVNode("", true),
        assetHexName.value ? (openBlock(), createElementBlock("div", _hoisted_26, [
          createBaseVNode("div", _hoisted_27, toDisplayString(unref($t)("common:hexname")), 1),
          createBaseVNode("div", _hoisted_28, [
            createVNode(_sfc_main$u, {
              type: "token",
              subject: unref(assetDetails),
              "copy-text": assetHexName.value,
              "align-right": "",
              "popover-left": ""
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_29, toDisplayString(assetHexName.value), 1)
              ]),
              _: 1
            }, 8, ["subject", "copy-text"])
          ])
        ])) : createCommentVNode("", true),
        unref(assetTokenRegistry)?.s != null ? (openBlock(), createElementBlock("div", _hoisted_30, [
          createBaseVNode("div", _hoisted_31, toDisplayString(unref($t)("assets:registry.source.label")), 1),
          createBaseVNode("div", _hoisted_32, toDisplayString(unref(getTokenRegistrySource)(unref($t))), 1)
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$3 = {
  key: 0,
  class: "flex flex-col et-is p-3 sm:p-4 et-bg-content overflow-x-auto"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AssetMetadataRaw",
  props: {
    assetInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const assetMeta = ref(props.assetInfos.assetMeta);
    return (_ctx, _cache) => {
      return props.assetInfos?.hasAssetInfo ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
        createVNode(_sfc_main$C, {
          data: assetMeta.value?.meta721
        }, null, 8, ["data"]),
        createVNode(_sfc_main$C, {
          data: assetMeta.value?.meta1155
        }, null, 8, ["data"]),
        createVNode(_sfc_main$C, {
          data: assetMeta.value?.meta68
        }, null, 8, ["data"])
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$2 = { class: "flex flex-row" };
const _hoisted_2$1 = { key: 0 };
const _hoisted_3$1 = {
  key: 1,
  class: "w-full grid grid-cols-6 et-gap-xs"
};
const _hoisted_4$1 = {
  key: 0,
  class: "col-span-6 3xs:col-span-2 pl-3 pr-1 py-1 truncate rounded-lg"
};
const _hoisted_5$1 = { class: "w-full flex et-jb-ic" };
const _hoisted_6$1 = { class: "w-full truncate" };
const _hoisted_7$1 = {
  key: 1,
  class: "col-span-6 3xs:col-span-2 pl-3 pr-1 py-1 truncate rounded-lg"
};
const _hoisted_8$1 = { class: "col-span-6 3xs:col-span-4 pl-3 pr-1 py-1 truncate rounded-lg" };
const _hoisted_9$1 = { class: "w-full flex et-jb-ic" };
const _hoisted_10$1 = { class: "w-full truncate" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MetadataTable",
  props: {
    metadata: { type: Object, required: true }
  },
  setup(__props) {
    const $t = useTranslation().t;
    const { isLargerThanXXXS } = useScreenSize();
    const props = __props;
    const metaEntries = ref([]);
    const sections = ref([]);
    const flattenTableEntries = (key, value, level, section) => {
      const ar = [];
      if (level > 4) {
        return [];
      }
      if (typeof value === "object") {
        const entries = Object.entries(value).sort((a, b) => a[0].localeCompare(b[0], "en-US"));
        for (const entry of entries) {
          ar.push(...flattenTableEntries(entry[0], entry[1], level + 1, section.length === 0 ? key.toString() : section + "." + key.toString()));
        }
      } else if (Array.isArray(value)) {
        const entries = value;
        if (key !== "Metadata" && Number.isNaN(parseInt(key))) {
          ar.push({ key, value: "", isHeader: true, section: key });
        }
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          ar.push(...flattenTableEntries(i.toString(), entry, level + 1, section.length === 0 ? i.toString() : section + "." + i.toString()));
        }
      } else {
        ar.push({ key, value: value.toString(), isHeader: false, section });
      }
      return ar;
    };
    const prepareTableEntries = (obj) => {
      metaEntries.value = flattenTableEntries("Metadata", obj, 0, "");
      metaEntries.value.sort(
        (entryA, entryB) => {
          if (entryA.section === "Metadata" && entryB.section !== "Metadata") {
            return -1;
          }
          if (entryA.section !== "Metadata" && entryB.section === "Metadata") {
            return -1;
          }
          if (entryA.section !== "Metadata" && entryB.section !== "Metadata") {
            return entryA.section <= entryB.section ? -1 : 1;
          }
          return entryA.section <= entryB.section ? -1 : 1;
        }
      );
      sections.value = [];
      for (const entry of metaEntries.value) {
        const sectionIndex = sections.value.findIndex((section) => section.section === entry.section);
        if (sectionIndex === -1) {
          sections.value.push({ section: entry.section, entryList: [entry] });
        } else {
          sections.value[sectionIndex].entryList.push(entry);
        }
      }
    };
    watch(() => props.metadata, (meta) => {
      if (!meta) {
        return;
      }
      prepareTableEntries(meta);
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        metaEntries.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2$1, " No metadata. ")) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(sections.value, (section, index) => {
            return openBlock(), createElementBlock(Fragment, null, [
              createBaseVNode("div", {
                class: normalizeClass(["col-span-6 mb-0 px-3 py-1 bg-bg-3 rounded-lg", index !== 0 ? "mt-4" : ""])
              }, toDisplayString(section.section), 3),
              (openBlock(true), createElementBlock(Fragment, null, renderList(section.entryList, (entry, index2) => {
                return openBlock(), createElementBlock(Fragment, null, [
                  isNaN(parseFloat(entry.key)) ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
                    createBaseVNode("div", _hoisted_5$1, [
                      createBaseVNode("div", _hoisted_6$1, toDisplayString(entry.key), 1),
                      createVNode(_sfc_main$v, {
                        "copy-text": entry.key,
                        "notification-text": unref($t)("common:copied.key")
                      }, null, 8, ["copy-text", "notification-text"])
                    ])
                  ])) : unref(isLargerThanXXXS) ? (openBlock(), createElementBlock("div", _hoisted_7$1)) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_8$1, [
                    createBaseVNode("div", _hoisted_9$1, [
                      createBaseVNode("div", _hoisted_10$1, toDisplayString(entry.value), 1),
                      createVNode(_sfc_main$v, {
                        "copy-text": entry.value,
                        "notification-text": unref($t)("common:copied.metadata")
                      }, null, 8, ["copy-text", "notification-text"])
                    ])
                  ])
                ], 64);
              }), 256))
            ], 64);
          }), 256))
        ]))
      ]);
    };
  }
});

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AssetMetadataTable",
  props: {
    assetInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const {
      assetInfos
    } = toRefs(props);
    const metadata = ref();
    watchEffect(() => {
      const meta = assetInfos?.value?.assetMeta.value;
      if (!meta) {
        return;
      }
      if (meta?.meta721) {
        metadata.value = meta.meta721;
      } else if (meta?.meta1155) {
        metadata.value = meta.meta1155;
      } else if (meta?.meta68) {
        metadata.value = meta.meta68;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$4, { metadata: metadata.value }, null, 8, ["metadata"]);
    };
  }
});

const _hoisted_1$1 = {
  key: 0,
  class: "flex flex-row et-js-ic p-3 sm:p-4 et-bg-content overflow-x-auto"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TokenRegistry",
  props: {
    assetInfos: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const hasAssetTokenRegistry = props.assetInfos.hasAssetTokenRegistry;
    const assetTokenRegistry = props.assetInfos.assetTokenRegistry;
    return (_ctx, _cache) => {
      return unref(hasAssetTokenRegistry) ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_sfc_main$C, { data: unref(assetTokenRegistry) }, null, 8, ["data"])
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1 = { class: "modal-asset-details-content-header relative w-full flex flex-col sm:flex-row et-gap-md" };
const _hoisted_2 = {
  key: 0,
  class: "shrink-0 flex flex-col et-jc-ic w-full"
};
const _hoisted_3 = { class: "w-full flex flex-row et-js-is sm:et-jev et-ic et-gap-sm px-1 py-1" };
const _hoisted_4 = { class: "w-full flex flex-col et-jc-ic text-center" };
const _hoisted_5 = { class: "flex et-jc-ic et-text-xl font-semibold" };
const _hoisted_6 = { class: "w-full flex flex-wrap et-jc-ic et-text-md" };
const _hoisted_7 = {
  key: 0,
  class: "w-full flex flex-wrap et-jc-ic et-gap-xs"
};
const _hoisted_8 = { class: "whitespace-nowrap opacity-0" };
const _hoisted_9 = {
  key: 0,
  class: "shrink-0 flex flex-col et-jc-ic"
};
const _hoisted_10 = { class: "w-full flex flex-col et-jc-ic text-center" };
const _hoisted_11 = { class: "flex et-jc-ic et-text-xl font-semibold" };
const _hoisted_12 = { class: "w-full flex flex-wrap et-jc-ic break-all et-text-md" };
const _hoisted_13 = {
  key: 0,
  class: "w-full flex flex-wrap et-jc-ic et-gap-xs et-text-md"
};
const _hoisted_14 = { class: "whitespace-nowrap" };
const _hoisted_15 = { class: "modal-asset-details-content w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_16 = { class: "w-full flex flex-wrap et-js-is et-gap-md" };
const _hoisted_17 = { class: "w-full px-1" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AssetDetails",
  props: /* @__PURE__ */ mergeModels({
    assetInfos: { type: Object, required: true }
  }, {
    "isScam": { type: Boolean, required: true, default: false },
    "isScamModifiers": {}
  }),
  emits: ["update:isScam"],
  setup(__props) {
    const isScam = useModel(__props, "isScam");
    const props = __props;
    const {
      assetDetails,
      assetDecimals,
      isNFT,
      showAssetMeta,
      hasAssetTokenRegistry,
      hasAssetDecimals
    } = props.assetInfos;
    const { accountBalance } = useSelectedAccount();
    const {
      isSmallerThanSM,
      isSmallerThanXS
    } = useScreenSize();
    const { formatSmallNumber } = useFormatter();
    const { adaSymbol } = useAdaSymbol();
    const { isProMode } = useAppMode();
    const {
      metadataContainsMedia} = useMetadataViewer();
    const { loadTokenPriceList } = useTokenPrices();
    const {
      activeCurrency} = useCurrencyAPI();
    const $t = useTranslation().t;
    const avgAdaPrice = ref("-");
    const adaValue = ref("-");
    const lovelaceValue = ref("-");
    const adaFiatPrice = computed(() => activeCurrency.value.value ?? "-");
    const fiatPrice = ref("-");
    const fiatDecimals = ref(4);
    const fiatCurrency = computed(() => activeCurrency.value?.id ?? "");
    computed(() => {
      return props.assetInfos?.assetMeta.value && metadataContainsMedia(props.assetInfos?.assetMeta.value);
    });
    const updateTokenPrice = async () => {
      if (!assetDetails.value) {
        return;
      }
      const name = assetDetails.value.p + assetDetails.value.t.a;
      const tokenPriceList = await loadTokenPriceList([name]);
      if (!tokenPriceList || tokenPriceList.length === 0) {
        adaValue.value = "-";
        return;
      }
      adaValue.value = tokenPriceList[0].price ?? "-";
      lovelaceValue.value = adaValue.value !== "-" ? formatSmallNumber(adaValue.value) : "-.--";
      if (adaValue.value === "-") {
        return;
      }
      if (adaFiatPrice.value === "-") {
        return;
      }
      fiatPrice.value = (parseFloat(multiply(adaValue.value, adaFiatPrice.value)) * Math.pow(10, fiatDecimals.value)).toFixed(fiatDecimals.value);
    };
    const ownedAssetAmount = computed(() => {
      if (!assetDetails.value) {
        return "0";
      }
      const multiasset = accountBalance.value?.multiasset;
      if (!multiasset) {
        return "0";
      }
      const assetMap = multiasset[assetDetails.value.p];
      if (!assetMap) {
        return "0";
      }
      const assetAmount = assetMap[assetDetails.value.t.a];
      return assetAmount ?? "0";
    });
    const ownedFiatValue = computed(() => {
      if (ownedAssetAmount.value === "0") {
        return "0";
      }
      if (!hasAssetDecimals.value) {
        return "0";
      }
      if (fiatPrice.value === "-") {
        return "-";
      }
      const _assetDecimals = pow(10, assetDecimals.value);
      const _fiatDecimals = pow(10, fiatDecimals.value);
      const _ownedAssetAmount = divide(ownedAssetAmount.value, _assetDecimals);
      const _fiatPrice = divide(fiatPrice.value, _fiatDecimals);
      return multiply(multiply(_ownedAssetAmount, _fiatPrice), _fiatDecimals);
    });
    const tabOptions = computed(() => {
      let labels = [];
      labels.push({ primaryLabel: $t("assets:tab.details"), value: 0 });
      if (showAssetMeta.value) {
        labels.push({ primaryLabel: $t("assets:tab.metadata"), value: 1 });
      }
      if (isProMode.value) {
        if (showAssetMeta.value) {
          labels.push({ primaryLabel: $t("assets:tab.raw"), value: 2 });
        }
        if (hasAssetTokenRegistry.value) {
          labels.push({ primaryLabel: $t("assets:tab.registry"), value: 3 });
        }
      }
      return labels;
    });
    const selectedOption = ref(tabOptions.value[0]);
    const selectedTab = computed(() => selectedOption.value?.value ?? 0);
    watch(assetDetails, () => {
      updateTokenPrice();
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1, [
          unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_2, [
            unref(assetDetails) ? (openBlock(), createBlock(_sfc_main$P, {
              key: 0,
              class: normalizeClass(["", unref(isNFT) ? "w-full max-w-24 sm:max-w-48" : "w-full max-w-24 sm:max-w-48"]),
              "asset-details-list": [unref(assetDetails)],
              "media-size": unref(MediaSize).HIGH,
              "can-open-modal-image": ""
            }, null, 8, ["class", "asset-details-list", "media-size"])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, toDisplayString(unref($t)("assets:owns")), 1),
              createBaseVNode("div", _hoisted_6, [
                ownedAssetAmount.value !== "0" ? (openBlock(), createBlock(_sfc_main$O, {
                  key: 0,
                  "text-c-s-s": "w-full et-jc-ic et-text-xl font-bold",
                  amount: ownedAssetAmount.value,
                  decimals: unref(assetDecimals),
                  "display-decimals": unref(assetDecimals),
                  "trim-fraction": false,
                  currency: ""
                }, null, 8, ["amount", "decimals", "display-decimals"])) : (openBlock(), createBlock(_sfc_main$O, {
                  key: 1,
                  "text-c-s-s": "w-full et-jc-ic",
                  amount: "-",
                  decimals: unref(assetDecimals),
                  currency: ""
                }, null, 8, ["decimals"]))
              ]),
              ownedFiatValue.value !== "0" && fiatPrice.value !== "-" && !unref(isSmallerThanXS) ? (openBlock(), createElementBlock("div", _hoisted_7, [
                createBaseVNode("span", _hoisted_8, toDisplayString(unref($t)("assets:youOwn")), 1),
                createVNode(_sfc_main$O, {
                  "text-c-s-s": "et-jc-ic break-all opacity-0",
                  amount: ownedFiatValue.value,
                  decimals: fiatDecimals.value,
                  currency: fiatCurrency.value
                }, null, 8, ["amount", "decimals", "currency"])
              ])) : createCommentVNode("", true)
            ]),
            !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_9, [
              unref(assetDetails) ? (openBlock(), createBlock(_sfc_main$P, {
                key: 0,
                class: "w-full max-w-36",
                "asset-details-list": [unref(assetDetails)],
                "media-size": unref(MediaSize).HIGH,
                "can-open-modal-image": ""
              }, null, 8, ["asset-details-list", "media-size"])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                fiatPrice.value === "-" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createTextVNode(toDisplayString(unref($t)("assets:price.unknown")), 1)
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(unref($t)("assets:price.value")), 1)
                ], 64))
              ]),
              createBaseVNode("div", _hoisted_12, [
                createTextVNode(toDisplayString(unref(adaSymbol) + " ") + toDisplayString(lovelaceValue.value) + " /  ", 1),
                createVNode(_sfc_main$O, {
                  "text-c-s-s": "et-jc-ic break-all ",
                  amount: fiatPrice.value,
                  decimals: fiatDecimals.value,
                  "display-decimals": fiatDecimals.value,
                  currency: fiatCurrency.value,
                  "trim-fraction": false
                }, null, 8, ["amount", "decimals", "display-decimals", "currency"])
              ]),
              ownedFiatValue.value !== "0" && fiatPrice.value !== "-" ? (openBlock(), createElementBlock("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, toDisplayString(unref($t)("assets:youOwn")), 1),
                createVNode(_sfc_main$O, {
                  "text-c-s-s": "et-text-xl font-bold et-jc-ic break-all ",
                  amount: ownedFiatValue.value,
                  decimals: fiatDecimals.value,
                  "display-decimals": 2,
                  currency: fiatCurrency.value,
                  "trim-fraction": false
                }, null, 8, ["amount", "decimals", "currency"])
              ])) : createCommentVNode("", true)
            ])
          ])
        ]),
        createVNode(_component_Card, { class: "w-full h-full" }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_15, [
              createBaseVNode("div", _hoisted_16, [
                createBaseVNode("div", null, [
                  createVNode(_sfc_main$M, {
                    "selected-tab": selectedOption.value,
                    "onUpdate:selectedTab": _cache[0] || (_cache[0] = ($event) => selectedOption.value = $event),
                    "tab-labels": tabOptions.value,
                    "compact-on-mobile": ""
                  }, null, 8, ["selected-tab", "tab-labels"])
                ])
              ]),
              createBaseVNode("div", _hoisted_17, [
                selectedTab.value === 0 ? (openBlock(), createBlock(_sfc_main$6, {
                  key: 0,
                  "asset-infos": __props.assetInfos,
                  "ada-price": avgAdaPrice.value
                }, null, 8, ["asset-infos", "ada-price"])) : createCommentVNode("", true),
                selectedTab.value === 1 ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 1,
                  "asset-infos": __props.assetInfos
                }, null, 8, ["asset-infos"])) : createCommentVNode("", true),
                selectedTab.value === 2 ? (openBlock(), createBlock(_sfc_main$5, {
                  key: 2,
                  "asset-infos": __props.assetInfos
                }, null, 8, ["asset-infos"])) : createCommentVNode("", true),
                selectedTab.value === 3 ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 3,
                  "asset-infos": __props.assetInfos
                }, null, 8, ["asset-infos"])) : createCommentVNode("", true)
              ])
            ])
          ]),
          _: 1
        }),
        unref(assetDetails) ? (openBlock(), createBlock(_sfc_main$Q, {
          key: 0,
          "is-scam": isScam.value,
          "onUpdate:isScam": _cache[1] || (_cache[1] = ($event) => isScam.value = $event),
          class: "-mb-2 rounded-2xl",
          "asset-details-list": [unref(assetDetails)],
          "show-close": "",
          "large-logo": ""
        }, null, 8, ["is-scam", "asset-details-list"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ModalAssetDetails",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      gotoSendWithAsset,
      gotoSwapWithAsset
    } = useNavigation();
    const {
      assetDetails,
      showModalAssetDetails,
      closeModalAssetDetails
    } = useModalAssetDetails();
    const {
      showError,
      showSuccess
    } = useNotifications();
    const {
      appWallet,
      walletSettings
    } = useSelectedAccount();
    const plate = walletSettings.plate;
    const saving = walletSettings.saving;
    const updatePlate = walletSettings.updatePlate;
    const isCollection = ref(false);
    const assetInfos = useAssetInfos(assetDetails, isCollection);
    const {
      isToken,
      isVerifiedAsset,
      tokenCardLabel
    } = assetInfos;
    const {
      isSmallerThanXS
    } = useScreenSize();
    const isScam = ref(false);
    const doSendAsset = () => assetDetails.value && gotoSendWithAsset(assetDetails.value.p, assetDetails.value.t.a);
    const doSwapAsset = () => assetDetails.value && gotoSwapWithAsset(assetDetails.value.p, assetDetails.value.t.a);
    const doSetWalletIcon = async () => {
      if (!assetDetails.value) {
        return;
      }
      if (!appWallet.value) {
        return;
      }
      const img = await getAssetCDNImage(assetDetails.value.f, MediaSize.LOW);
      if (img) {
        plate.value.data = await resizeForWalletIcon(img);
        plate.value.image = null;
        const success = await updatePlate(plate.value);
        if (success) {
          showSuccess($t("settings-modal:update.success"));
          dispatchSignalSync(doReloadWalletList);
          return;
        }
      }
      showError($t("settings-modal:update.error"));
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return unref(showModalAssetDetails) && unref(assetDetails) ? (openBlock(), createBlock(_sfc_main$S, {
        key: 0,
        "modal-container": "#modal-asset-details",
        "half-wide": "",
        "full-width-on-mobile": "",
        onClose: unref(closeModalAssetDetails)
      }, createSlots({
        header: withCtx(({ handleClose }) => [
          createVNode(_sfc_main$R, {
            headline: unref(tokenCardLabel) + (!unref(isSmallerThanXS) ? " - " + unref($t)("assets:title") : ""),
            "hide-info": "",
            "hide-back": "",
            "show-close": "",
            onClose: handleClose
          }, null, 8, ["headline", "onClose"])
        ]),
        content: withCtx(() => [
          createVNode(ModalContentCard, { class: "et-gap-sme sm:et-gap-mde" }, {
            default: withCtx(() => [
              createVNode(_sfc_main$1, {
                assetInfos: unref(assetInfos),
                "is-scam": isScam.value,
                "onUpdate:isScam": _cache[0] || (_cache[0] = ($event) => isScam.value = $event)
              }, null, 8, ["assetInfos", "is-scam"])
            ]),
            _: 1
          })
        ]),
        _: 2
      }, [
        !isScam.value ? {
          name: "footer",
          fn: withCtx(({ handleClose }) => [
            createVNode(ButtonRow, null, {
              default: withCtx(() => [
                unref(assetDetails) ? withDirectives((openBlock(), createBlock(_component_Button, {
                  key: 0,
                  label: unref($t)("assets:button.setIcon.label"),
                  severity: "secondary",
                  disabled: unref(saving),
                  rounded: "",
                  outlined: "",
                  onClick: _cache[1] || (_cache[1] = ($event) => doSetWalletIcon())
                }, null, 8, ["label", "disabled"])), [
                  [_directive_tooltip, unref($t)("assets:button.setIcon.tooltip")]
                ]) : createCommentVNode("", true),
                createVNode(_component_Button, {
                  label: unref($t)("common:send"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: ($event) => {
                    doSendAsset();
                    handleClose();
                  }
                }, null, 8, ["label", "onClick"]),
                unref(isToken) && unref(isVerifiedAsset) && !unref(isIosApp)() ? (openBlock(), createBlock(_component_Button, {
                  key: 1,
                  label: unref($t)("common:swap"),
                  severity: "primary",
                  rounded: "",
                  outlined: "",
                  onClick: ($event) => {
                    doSwapAsset();
                    handleClose();
                  }
                }, null, 8, ["label", "onClick"])) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1024)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["onClose"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main$b as _, _sfc_main$9 as a, _sfc_main$7 as b, _sfc_main as c, useMetadataViewer as d, _sfc_main$4 as e, useDetailedTxInfo as u };
