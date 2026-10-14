import { d as defineComponent, f as onMounted, e as ref, ag as useElementHover, ah as useParentElement, G as watch, m as createElementBlock, o as openBlock, p as createBaseVNode, V as normalizeClass, D as computed, w as useTranslation, x as useScreenSize, P as networkId, c as createBlock, y as withCtx, z as resolveComponent, n as createVNode, t as createCommentVNode, B as toDisplayString, u as unref, a1 as withDirectives, a2 as resolveDirective, F as Fragment, H as createTextVNode, U as withModifiers, j as isIosApp, Y as toRefs, ai as Transition, S as renderList, Z as useLocalStorage, a8 as useElementSize, N as nextTick, l as useTheme, aj as api } from './index.js';
import { a as useWalletAccount } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { u as useAppMode } from './useAppMode.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useNavigation } from './useNavigation.js';
import { u as useModalReceiveAddress } from './useModalReceiveAddress.js';
import { u as useModalBuyADA } from './useModalBuyADA.js';
import { _ as _sfc_main$8, c as _sfc_main$a, d as _sfc_main$b, M as MultiSigGradient, b as IconLockEnabled, e as IconComputerProgramming01, f as IconPin, I as IconDApp } from './SyncInfo.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$9 } from './FiatAmount.vue_vue_type_script_setup_true_lang.js';
import { g as gsapWithCSS } from './index2.js';
import { g as getRandomId } from './epochParams.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { _ as _sfc_main$c } from './AdaHandleName.vue_vue_type_script_setup_true_lang.js';
import { c as isSwapEnabled } from './NetworkId.js';
import { i as isSwapSupported } from './app2.js';
import { u as useHomeSettings } from './useHomeSettings.js';
import { i as isUpdating, t as txListRecentPage, n as numTxTotal, a as txListRecentNumEntries } from './txHistory.js';
import { I as IconSpinner } from './IconSpinner.js';
import { L as LineSpacer } from './LineSpacer.js';
import { _ as _sfc_main$d } from './TransactionItem.vue_vue_type_script_setup_true_lang.js';
import { u as useCurrencyAPI } from './useCurrencyAPI.js';
import { u as useFormatter } from './useFormatter.js';
import { C as Chart, a as CategoryScale, L as LinearScale, b as LineElement, P as PointElement, p as plugin_tooltip, c as Line } from './StakeRewardsChart.vue_vue_type_script_setup_true_lang.js';
import { u as useBalanceVisible } from './useBalanceVisible.js';

const _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 60 60",
  style: { "enable-background": "new 0 0 60 60" },
  "xml:space": "preserve"
};
const _hoisted_2$6 = {
  id: "fx_eternl_button_receive",
  maskUnits: "userSpaceOnUse",
  maskContentUnits: "userSpaceOnUse"
};
const _hoisted_3$5 = { style: { "mask": "url(#fx_eternl_button_receive)" } };
const _hoisted_4$5 = { style: { "clip-path": "url(#SVGID_00000067198844194762993930000018127041669630864523_)" } };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "IconFxReceive",
  props: {
    useParentHover: { type: Boolean, required: false, default: true }
  },
  setup(__props) {
    const props = __props;
    const id = "_" + getRandomId();
    onMounted(() => {
      gsapWithCSS.set(".arrow" + id, { svgOrigin: "30px 30px" });
      gsapWithCSS.set(".bg" + id, { svgOrigin: "30px 30px" });
      gsapWithCSS.set(".st2" + id, { strokeWidth: 1.5 });
      animateLeave();
    });
    const animateEnter = () => {
      gsapWithCSS.to(".bg" + id, { duration: 0.2, fill: "#FFFFFF", stroke: "#FFFFFF", scale: 0.9, ease: "power1.inOut" });
      gsapWithCSS.to(".st2" + id, { duration: 0.25, strokeWidth: 4, stroke: "#000000", ease: "power3.inOut" });
    };
    const animateLeave = () => {
      gsapWithCSS.to(".bg" + id, { duration: 0.2, fill: "#000000", stroke: "#000000", scale: 1, ease: "power1.inOut" });
      gsapWithCSS.to(".st2" + id, { duration: 0.25, strokeWidth: 1.5, stroke: "#DDDEDC", ease: "power3.inOut" });
    };
    const hover = ref();
    const isHovering = useElementHover(props.useParentHover ? useParentElement(hover) : hover);
    watch(isHovering, () => {
      if (isHovering.value) {
        animateEnter();
      } else {
        animateLeave();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "fx_btn_receive",
        ref_key: "hover",
        ref: hover
      }, [
        (openBlock(), createElementBlock("svg", _hoisted_1$6, [
          createBaseVNode("defs", null, [
            createBaseVNode("mask", _hoisted_2$6, [
              createBaseVNode("circle", {
                class: normalizeClass(["st1", "st1" + id]),
                cx: "30",
                cy: "30",
                r: "29.5"
              }, null, 2)
            ])
          ]),
          createBaseVNode("g", null, [
            createBaseVNode("circle", {
              class: normalizeClass(["bg", "bg" + id]),
              cx: "30",
              cy: "30",
              r: "29.5"
            }, null, 2),
            createBaseVNode("circle", {
              class: normalizeClass(["bg_inner", "bg_inner" + id]),
              cx: "30",
              cy: "30",
              r: "28"
            }, null, 2)
          ]),
          createBaseVNode("g", null, [
            _cache[0] || (_cache[0] = createBaseVNode("defs", null, [
              createBaseVNode("rect", {
                id: "SVGID_1_",
                x: "18.2",
                y: "18.2",
                width: "23.6",
                height: "23.6"
              })
            ], -1)),
            _cache[1] || (_cache[1] = createBaseVNode("clipPath", { id: "SVGID_00000067198844194762993930000018127041669630864523_" }, [
              createBaseVNode("use", {
                "xlink:href": "#SVGID_1_",
                style: { "overflow": "visible" }
              })
            ], -1)),
            createBaseVNode("g", _hoisted_3$5, [
              createBaseVNode("g", {
                class: normalizeClass("arrow" + id)
              }, [
                createBaseVNode("g", _hoisted_4$5, [
                  createBaseVNode("path", {
                    class: normalizeClass(["st2", "st2" + id]),
                    d: "M29.7,38.3h-7.8l-0.2-8"
                  }, null, 2),
                  createBaseVNode("path", {
                    class: normalizeClass(["st2", "st2" + id]),
                    d: "M38.3,21.7L22,38"
                  }, null, 2)
                ])
              ], 2)
            ])
          ])
        ]))
      ], 512);
    };
  }
});

const FxButtonReceive = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-24d6c5d2"]]);

const _hoisted_1$5 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 60 60",
  style: { "enable-background": "new 0 0 60 60" },
  "xml:space": "preserve"
};
const _hoisted_2$5 = {
  id: "fx_eternl_button_send",
  maskContentUnits: "userSpaceOnUse",
  maskUnits: "userSpaceOnUse"
};
const _hoisted_3$4 = { style: { "mask": "url(#fx_eternl_button_send)" } };
const _hoisted_4$4 = { style: { "clip-path": "url(#SVGID_00000067198844194762993930000018127041669630864523_)" } };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "IconFxSend",
  props: {
    useParentHover: { type: Boolean, required: false, default: true },
    rotate: { type: Boolean, required: false, default: true }
  },
  setup(__props) {
    const props = __props;
    const id = "_" + getRandomId();
    onMounted(() => {
      gsapWithCSS.set(".arrow" + id, { svgOrigin: "30px 30px" });
      gsapWithCSS.set(".bg" + id, { svgOrigin: "30px 30px" });
      gsapWithCSS.set(".st2" + id, { strokeWidth: 1.5 });
      if (props.rotate) {
        gsapWithCSS.set(".fx_btn_send", { rotation: 180 });
      }
      animateLeave();
    });
    const animateEnter = () => {
      gsapWithCSS.to(".bg" + id, { duration: 0.2, fill: "#000000", stroke: "#000000", scale: 0.9, ease: "power1.inOut" });
      gsapWithCSS.to(".st2" + id, { duration: 0.25, strokeWidth: 4, stroke: "#FFFFFF", ease: "power3.inOut" });
    };
    const animateLeave = () => {
      gsapWithCSS.to(".bg" + id, { duration: 0.2, fill: "#FFFFFF", stroke: "#FFFFFF", scale: 1, ease: "power1.inOut" });
      gsapWithCSS.to(".st2" + id, { duration: 0.25, strokeWidth: 1.5, stroke: "#000000", ease: "power3.inOut" });
    };
    const hover = ref();
    const isHovering = useElementHover(props.useParentHover ? useParentElement(hover) : hover);
    watch(isHovering, () => {
      if (isHovering.value) {
        animateEnter();
      } else {
        animateLeave();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "fx_btn_send",
        ref_key: "hover",
        ref: hover
      }, [
        (openBlock(), createElementBlock("svg", _hoisted_1$5, [
          createBaseVNode("defs", null, [
            createBaseVNode("mask", _hoisted_2$5, [
              createBaseVNode("circle", {
                class: normalizeClass(["st1", "st1" + id]),
                cx: "30",
                cy: "30",
                r: "29.5"
              }, null, 2)
            ])
          ]),
          createBaseVNode("g", null, [
            createBaseVNode("circle", {
              class: normalizeClass(["bg", "bg" + id]),
              cx: "30",
              cy: "30",
              r: "29.5"
            }, null, 2),
            createBaseVNode("circle", {
              class: normalizeClass(["bg_inner", "bg_inner" + id]),
              cx: "30",
              cy: "30",
              r: "28"
            }, null, 2)
          ]),
          createBaseVNode("g", null, [
            _cache[0] || (_cache[0] = createBaseVNode("defs", null, [
              createBaseVNode("rect", {
                id: "SVGID_1_",
                height: "23.6",
                width: "23.6",
                x: "18.2",
                y: "18.2"
              })
            ], -1)),
            _cache[1] || (_cache[1] = createBaseVNode("clipPath", { id: "SVGID_00000067198844194762993930000018127041669630864523_" }, [
              createBaseVNode("use", {
                style: { "overflow": "visible" },
                "xlink:href": "#SVGID_1_"
              })
            ], -1)),
            createBaseVNode("g", _hoisted_3$4, [
              createBaseVNode("g", {
                class: normalizeClass(["arrow", "arrow" + id])
              }, [
                createBaseVNode("g", _hoisted_4$4, [
                  createBaseVNode("path", {
                    class: normalizeClass(["st2", "st2" + id]),
                    d: "M29.7,38.3h-7.8l-0.2-8"
                  }, null, 2),
                  createBaseVNode("path", {
                    class: normalizeClass(["st2", "st2" + id]),
                    d: "M38.3,21.7L22,38"
                  }, null, 2)
                ])
              ], 2)
            ])
          ])
        ]))
      ], 512);
    };
  }
});

const FxButtonSend = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-8e21d4ab"]]);

const _hoisted_1$4 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 60 60",
  style: { "enable-background": "new 0 0 60 60" },
  "xml:space": "preserve"
};
const _hoisted_2$4 = {
  id: "fx_eternl_button_swap",
  maskUnits: "userSpaceOnUse",
  maskContentUnits: "userSpaceOnUse"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "IconFxSwap",
  props: {
    useParentHover: { type: Boolean, required: false, default: true }
  },
  setup(__props) {
    const props = __props;
    const id = "_" + getRandomId();
    onMounted(() => {
      gsapWithCSS.set(".arrow" + id, { svgOrigin: "30px 30px" });
      gsapWithCSS.set(".bg" + id, { strokeWidth: 1, svgOrigin: "30px 30px" });
      gsapWithCSS.set(".st2" + id, { strokeWidth: 1.5, stroke: "#000000" });
      animateLeave();
    });
    const animateEnter = () => {
      gsapWithCSS.to(".bg" + id, { fill: "#FFFFFF", stroke: "#FFFFFF", duration: 0.2, ease: "power1.inOut" });
      gsapWithCSS.to(".st2" + id, { strokeWidth: 4, duration: 0.25, stroke: "#000000", ease: "power3.inOut" });
      gsapWithCSS.to(".arrow" + id, { rotation: 359, duration: 0.5, ease: "power1.inOut" });
      gsapWithCSS.to(".bg" + id, { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" });
      gsapWithCSS.to(".bg_inner" + id, { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" });
    };
    const animateLeave = () => {
      gsapWithCSS.to(".bg" + id, { fill: "none", stroke: "#000000", duration: 0.2, scale: 1, ease: "power1.inOut" });
      gsapWithCSS.to(".st2" + id, { strokeWidth: 1.5, duration: 0.25, stroke: "#000000", ease: "power3.inOut" });
      gsapWithCSS.to(".arrow" + id, { rotation: 0, duration: 0.5, ease: "power1.inOut" });
    };
    const hover = ref();
    const isHovering = useElementHover(props.useParentHover ? useParentElement(hover) : hover);
    watch(isHovering, () => {
      if (isHovering.value) {
        animateEnter();
      } else {
        animateLeave();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "fx_btn_swap",
        ref_key: "hover",
        ref: hover
      }, [
        (openBlock(), createElementBlock("svg", _hoisted_1$4, [
          createBaseVNode("defs", null, [
            createBaseVNode("mask", _hoisted_2$4, [
              createBaseVNode("circle", {
                class: normalizeClass(["st1", "st1" + id]),
                cx: "30",
                cy: "30",
                r: "29.5"
              }, null, 2)
            ])
          ]),
          createBaseVNode("g", null, [
            createBaseVNode("circle", {
              class: normalizeClass(["bg", "bg" + id]),
              cx: "30",
              cy: "30",
              r: "28"
            }, null, 2),
            createBaseVNode("circle", {
              class: normalizeClass(["bg_inner", "bg_inner" + id]),
              cx: "30",
              cy: "30",
              r: "28"
            }, null, 2)
          ]),
          createBaseVNode("g", {
            class: normalizeClass(["arrow", "arrow" + id])
          }, [
            createBaseVNode("path", {
              class: normalizeClass(["st2", "st2" + id]),
              d: "M20.0137 33.1182L24.7922 38.1139",
              stroke: "#000000",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, 2),
            createBaseVNode("path", {
              class: normalizeClass(["st2", "st2" + id]),
              d: "M39.9876 33.1188H20.071",
              stroke: "#000000",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, 2),
            createBaseVNode("path", {
              class: normalizeClass(["st2", "st2" + id]),
              d: "M39.9883 26.8818L35.2097 21.8861",
              stroke: "#000000",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, 2),
            createBaseVNode("path", {
              class: normalizeClass(["st2", "st2" + id]),
              d: "M20.0143 26.8812H39.931",
              stroke: "#000000",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, 2)
          ], 2),
          _cache[0] || (_cache[0] = createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "48",
            height: "48",
            color: "#000000",
            fill: "none"
          }, null, -1))
        ]))
      ], 512);
    };
  }
});

const FxButtonSwap = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ccb59bb3"]]);

const _hoisted_1$3 = { class: "relative w-full flex flex-row et-jb-ic et-gap-md" };
const _hoisted_2$3 = { class: "grow flex flex-row et-js-ic lg:et-js-is et-gap-sm sm:et-gap-sme" };
const _hoisted_3$3 = {
  key: 0,
  class: "absolute -bottom-2 -right-2 w-6 h-6 rounded-sm bg-bg-app p-0.5"
};
const _hoisted_4$3 = { class: "grow flex flex-wrap et-js-ic et-gap-sm sm:et-gap-sm et-text-2xl font-semibold" };
const _hoisted_5$2 = {
  key: 3,
  class: "ml-1 lg:grow flex et-je"
};
const _hoisted_6 = { class: "flex flex-col 2xs:flex-row et-js-is 2xs:et-js-ic et-gap-x-sm 2xs:et-gap-x-sme" };
const _hoisted_7 = {
  key: 0,
  class: "flex flex-row et-js-ic et-text-sm text-txt-muted"
};
const _hoisted_8 = { class: "cap-first" };
const _hoisted_9 = { class: "flex flex-row et-js-ic -mb-2" };
const _hoisted_10 = { class: "w-full et-py-sm flex flex-row et-jev et-bg-highlight rounded-b-2xl overflow-hidden" };
const _hoisted_11 = { class: "shrink-0 flex flex-col et-ic et-gap-sm" };
const _hoisted_12 = { class: "px-2" };
const _hoisted_13 = { class: "shrink-0 px-2 et-text-sm cap-first" };
const _hoisted_14 = { class: "shrink-0 flex flex-col et-ic et-gap-sm" };
const _hoisted_15 = { class: "px-2" };
const _hoisted_16 = { class: "shrink-0 px-2 et-text-sm cap-first" };
const _hoisted_17 = { class: "shrink-0 flex flex-col et-ic et-gap-sm" };
const _hoisted_18 = { class: "px-2" };
const _hoisted_19 = { class: "shrink-0 px-2 et-text-sm cap-first" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AccountCard",
  props: {
    walletId: { type: String, required: true },
    accountId: { type: String, required: true },
    trim: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const _walletId = computed(() => props.walletId);
    const _accountId = computed(() => props.accountId);
    const $t = useTranslation().t;
    const { gotoPage } = useNavigation();
    const {
      openModalReceiveAddress
    } = useModalReceiveAddress();
    const {
      walletSettings,
      appAccount,
      appWallet,
      accountData,
      accountSettings
    } = useWalletAccount(_walletId, _accountId);
    const { isProMode } = useAppMode();
    const { isSmallerThanLG } = useScreenSize();
    const {
      openModalBuyADA,
      showModalBuyADA
    } = useModalBuyADA();
    const { adaCurrency } = useAdaSymbol();
    const {
      showMonsterSwapOnHome,
      isMonsterSwapAllowed
    } = useHomeSettings();
    const walletPlate = walletSettings.plate;
    const accountName = accountSettings.name;
    const isFavorite = accountSettings.isFavorite;
    const receiveAddress = accountSettings.receiveAddress;
    const forcedUnusedAddress = accountSettings.forcedUnusedAddress;
    const stakeAddress = accountSettings.stakeAddress;
    const adaHandleList = accountSettings.adaHandleList;
    const _adaHandle = accountSettings.adaHandle;
    const {
      adaHandle,
      adaHandleName
    } = _adaHandle;
    const signType = computed(() => appAccount.value?.data.account.signType ?? "mnemonic");
    const isDappAccount = computed(() => appAccount.value?.isDappAccount ?? false);
    const showSwap = computed(() => isMonsterSwapAllowed.value && showMonsterSwapOnHome.value && isSwapEnabled(networkId.value) && isSwapSupported(signType.value));
    const openModalReceive = () => {
      if (receiveAddress.value) {
        openModalReceiveAddress(receiveAddress.value, forcedUnusedAddress.value ?? void 0, stakeAddress.value ?? void 0, adaHandleList.value ?? void 0, adaHandle.value ?? void 0);
      }
    };
    const triggerBuy = () => {
      if (!showModalBuyADA.value) {
        openModalBuyADA();
      }
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_Card, {
        class: "wallet-card-v2 flex flex-col shadow-sm",
        pt: {
          body: "pt-card pb-0 px-0 et-gap-md",
          title: "px-card",
          content: "px-card et-pb-sm",
          footer: "px-0 py-0"
        }
      }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1$3, [
            createBaseVNode("div", _hoisted_2$3, [
              unref(isSmallerThanLG) ? (openBlock(), createBlock(_sfc_main$a, {
                key: 0,
                class: "size-10 sm:size-12 shrink-0 cursor-pointer mr-2",
                "icon-seed": unref(walletPlate).image ?? void 0,
                "icon-data": unref(walletPlate).data ?? void 0
              }, {
                default: withCtx(() => [
                  unref(appWallet) && !unref(appWallet).isMnemonic ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
                    unref(appWallet).isHardware ? (openBlock(), createBlock(_sfc_main$b, {
                      key: 0,
                      class: "w-full h-full",
                      "sign-type": unref(appWallet)?.data.wallet.signType
                    }, null, 8, ["sign-type"])) : unref(appWallet).isMultiSig ? (openBlock(), createBlock(MultiSigGradient, {
                      key: 1,
                      class: "w-full h-full"
                    })) : unref(appWallet).isReadOnly ? (openBlock(), createBlock(IconLockEnabled, {
                      key: 2,
                      class: "w-full h-full"
                    })) : unref(appWallet).isCLI ? (openBlock(), createBlock(IconComputerProgramming01, {
                      key: 3,
                      class: "w-full h-full"
                    })) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["icon-seed", "icon-data"])) : createCommentVNode("", true),
              withDirectives((openBlock(), createElementBlock("div", _hoisted_4$3, [
                unref(adaHandleName) ? (openBlock(), createBlock(_sfc_main$c, {
                  key: 0,
                  class: "grow-0!",
                  "ada-handle-name": unref(adaHandleName)
                }, null, 8, ["ada-handle-name"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(unref(accountName)), 1)
                ], 64)),
                withDirectives((openBlock(), createBlock(_component_Button, {
                  class: "shrink-0 p-0",
                  rounded: "",
                  link: "",
                  onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(accountSettings).toggleFavorite(), ["prevent", "stop"]))
                }, {
                  default: withCtx(() => [
                    createVNode(IconPin, {
                      class: normalizeClass(["w-7 aspect-square", unref(isFavorite) ? "text-txt-highlight fill-txt-highlight" : "text-txt-content fill-none"])
                    }, null, 8, ["class"])
                  ]),
                  _: 1
                })), [
                  [_directive_tooltip, unref($t)("home-accountCard:button.favorite.tooltip")]
                ]),
                isDappAccount.value ? withDirectives((openBlock(), createBlock(IconDApp, {
                  key: 2,
                  class: "shrink-0 w-7 aspect-square stroke-0 text-txt-green"
                }, null, 512)), [
                  [_directive_tooltip, unref($t)("home-accountCard:button.dapp.tooltip")]
                ]) : createCommentVNode("", true),
                unref(networkId) === "mainnet" && !unref(isIosApp)() ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
                  createVNode(_component_Button, {
                    label: unref($t)("common:buyAda", { currency: unref(adaCurrency) }),
                    size: "small",
                    rounded: "",
                    onClick: _cache[1] || (_cache[1] = ($event) => triggerBuy())
                  }, null, 8, ["label"])
                ])) : createCommentVNode("", true)
              ])), [
                [_directive_tooltip, __props.accountId]
              ])
            ])
          ])
        ]),
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_6, [
            createVNode(_sfc_main$7, {
              class: "text-xl font-semibold",
              amount: unref(accountData)?.balance.total
            }, null, 8, ["amount"]),
            !__props.trim ? (openBlock(), createBlock(_sfc_main$8, {
              key: 0,
              class: "-ml-1.5 et-text-xs text-txt-muted",
              "account-id": __props.accountId,
              "wallet-id": __props.walletId
            }, null, 8, ["account-id", "wallet-id"])) : createCommentVNode("", true)
          ]),
          unref(isProMode) ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createBaseVNode("span", _hoisted_8, toDisplayString(unref($t)("common:rewards")) + ": ", 1),
            createVNode(_sfc_main$7, {
              class: "et-text-sm",
              amount: unref(accountData)?.balance.rewards
            }, null, 8, ["amount"])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_9, [
            createVNode(_sfc_main$9, {
              amount: unref(accountData)?.balance.total ?? "0"
            }, null, 8, ["amount"])
          ])
        ]),
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_10, [
            createVNode(_component_Button, {
              class: "bg-transparent px-0 py-1 border-0 focus:outline-black et-highlight-text",
              text: "",
              onClick: openModalReceive
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_11, [
                  createBaseVNode("div", _hoisted_12, [
                    createVNode(FxButtonReceive, { class: "size-12 2xs:size-14" })
                  ]),
                  createBaseVNode("div", _hoisted_13, toDisplayString(unref($t)("common:receive")), 1)
                ])
              ]),
              _: 1
            }),
            !__props.trim ? (openBlock(), createBlock(_component_Button, {
              key: 0,
              class: "bg-transparent px-0 py-1 border-0 focus:outline-black et-highlight-text",
              text: "",
              onClick: _cache[2] || (_cache[2] = ($event) => unref(gotoPage)("PageSend"))
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", _hoisted_15, [
                    createVNode(FxButtonSend, { class: "size-12 2xs:size-14" })
                  ]),
                  createBaseVNode("div", _hoisted_16, toDisplayString(unref($t)("common:send")), 1)
                ])
              ]),
              _: 1
            })) : createCommentVNode("", true),
            !__props.trim && unref(networkId) === "mainnet" && showSwap.value ? (openBlock(), createBlock(_component_Button, {
              key: 1,
              class: "bg-transparent px-0 py-1 border-0 focus:outline-black et-highlight-text",
              text: "",
              onClick: _cache[3] || (_cache[3] = ($event) => unref(gotoPage)("PageSwap"))
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_17, [
                  createBaseVNode("div", _hoisted_18, [
                    createVNode(FxButtonSwap, { class: "size-12 2xs:size-14" })
                  ]),
                  createBaseVNode("div", _hoisted_19, toDisplayString(unref($t)("common:swap")), 1)
                ])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$2 = {
  key: 0,
  class: "flex flex-col et-gap-sm"
};
const _hoisted_2$2 = { class: "text-center" };
const _hoisted_3$2 = {
  key: 2,
  class: "w-full flex flex-row et-jc-ic"
};
const _hoisted_4$2 = { class: "" };
const _hoisted_5$1 = { class: "w-full py-8 flex flex-row et-jc-ic" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RecentTransactions",
  props: {
    walletId: { type: String, required: false, default: "" },
    accountId: { type: String, required: false, default: "" },
    showAssets: { type: Boolean, required: false, default: false },
    hideTxButton: { type: Boolean, required: false, default: false },
    numEntries: { type: Number, required: false, default: 6 },
    moreTransactionFunc: { type: Function, required: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const { gotoPage } = useNavigation();
    const { isSmallerThanLG } = useScreenSize();
    const { numEntries } = toRefs(props);
    const txListInitialized = computed(() => !isUpdating.value);
    const gotoTransactions = () => {
      if (props.moreTransactionFunc) {
        return props.moreTransactionFunc();
      }
      gotoPage("PageTransactionList");
    };
    watch(numEntries, () => txListRecentNumEntries.value = numEntries.value, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(Transition, {
        name: "fade-fast-delayed",
        mode: "out-in"
      }, {
        default: withCtx(() => [
          txListInitialized.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
            unref(txListRecentPage).length === 0 ? (openBlock(), createBlock(_component_Card, {
              key: 0,
              "pt:body:class": "p-3 md:p-4 et-gap-md"
            }, {
              content: withCtx(() => [
                createBaseVNode("div", _hoisted_2$2, toDisplayString(unref($t)("tx-page:empty")), 1)
              ]),
              _: 1
            })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(txListRecentPage), (txBalance, index) => {
              return openBlock(), createElementBlock(Fragment, {
                key: txBalance.hash
              }, [
                createVNode(_sfc_main$d, {
                  "tx-balance": txBalance,
                  "wallet-id": __props.walletId,
                  "account-id": __props.accountId,
                  "show-assets": ""
                }, null, 8, ["tx-balance", "wallet-id", "account-id"]),
                index !== unref(txListRecentPage).length - 1 ? (openBlock(), createBlock(LineSpacer, { key: 0 })) : createCommentVNode("", true)
              ], 64);
            }), 128)),
            !__props.hideTxButton && !unref(isSmallerThanLG) && unref(numTxTotal) > unref(txListRecentNumEntries) ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
              withDirectives(createVNode(_component_Button, {
                label: unref($t)("tx-page:button.history.label"),
                severity: "secondary",
                rounded: "",
                outlined: "",
                onClick: gotoTransactions
              }, null, 8, ["label"]), [
                [_directive_tooltip, unref($t)("tx-page:button.history.tooltip")]
              ])
            ])) : createCommentVNode("", true)
          ])) : (openBlock(), createBlock(_component_Card, {
            key: 1,
            "pt:body:class": "p-3 md:p-4 et-gap-md"
          }, {
            title: withCtx(() => [
              createBaseVNode("div", _hoisted_4$2, toDisplayString(unref($t)("tx-page:updating")), 1)
            ]),
            content: withCtx(() => [
              createBaseVNode("div", _hoisted_5$1, [
                createVNode(IconSpinner, { class: "w-24 animate-spin" })
              ])
            ]),
            _: 1
          }))
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$1 = { class: "relative w-full h-full max-h-full" };
const _hoisted_2$1 = {
  key: 0,
  class: "absolute top-0.5 left-0 w-full h-[calc(100%+0.3rem)] blur-xs opacity-75"
};
const _hoisted_3$1 = { class: "relative w-full h-full" };
const _hoisted_4$1 = {
  key: 1,
  class: "absolute top-0 -left-2 h-full pb-2 flex flex-col et-jb text-txt-content pointer-events-none"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LineChartChartJS",
  props: {
    hideLabelsX: { type: Boolean, required: false, default: false },
    hideLabelsY: { type: Boolean, required: false, default: false },
    labelsY: { type: Array, required: true, default: [] },
    values: { type: Array, required: true, default: [] },
    valuesShadow: { type: Array, required: false, default: [] }
  },
  setup(__props) {
    Chart.register(CategoryScale, LinearScale, LineElement, PointElement, plugin_tooltip);
    const props = __props;
    const {
      values,
      valuesShadow,
      labelsY
    } = toRefs(props);
    const showBlurBgs = useLocalStorage("showBlurBgs", true, { listenToStorageChanges: true });
    const {
      getDecimalNumber
    } = useFormatter();
    const { activeCurrency } = useCurrencyAPI();
    getDecimalNumber();
    const { isBalanceVisible } = useBalanceVisible();
    const { isSmallerThanMD } = useScreenSize();
    const {
      gradientBottom,
      gradientCenter,
      gradientTop
    } = useTheme();
    const chartRef = ref();
    const chartRef2 = ref();
    const { width } = useElementSize(chartRef);
    const numTicksX = ref(3);
    const data = {
      labels: [],
      datasets: []
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: !props.hideLabelsX,
          z: 20,
          border: { display: false },
          grid: { display: false },
          ticks: {
            maxTicksLimit: numTicksX.value
          }
        },
        y: {
          display: false,
          border: { display: false },
          grid: { display: true, color: "rgba(128, 128, 128, 0.05)" },
          ticks: { display: false }
        }
      },
      plugins: {
        title: { display: false },
        legend: { display: false }
      }
    };
    let _width, _height, gradient;
    function getGradient(ctx, chartArea, c0, c1, c2) {
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      if (!gradient || _width !== chartWidth || _height !== chartHeight) {
        _width = chartWidth;
        _height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, c0);
        gradient.addColorStop(0.5, c1);
        gradient.addColorStop(1, c2);
      }
      return gradient;
    }
    const datasetOptions = {
      borderJoinStyle: "round",
      borderWidth: 2,
      fill: false,
      stepped: false,
      pointRadius: 0,
      pointHitRadius: 10,
      pointHoverRadius: 10,
      borderColor: function(context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return gradientBottom.value;
        }
        return getGradient(ctx, chartArea, gradientBottom.value, gradientCenter.value, gradientTop.value);
      },
      backgroundColor: function(context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return gradientBottom.value;
        }
        return getGradient(ctx, chartArea, gradientBottom.value, gradientCenter.value, gradientTop.value);
      }
    };
    const datasetShadowOptions = {
      borderJoinStyle: "round",
      borderWidth: 2,
      fill: false,
      stepped: false,
      pointRadius: 0,
      pointHitRadius: 10,
      pointHoverRadius: 10,
      borderColor: function(context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return gradientBottom.value;
        }
        return getGradient(ctx, chartArea, gradientBottom.value, gradientCenter.value, gradientTop.value);
      },
      backgroundColor: function(context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return gradientBottom.value;
        }
        return getGradient(ctx, chartArea, gradientBottom.value, gradientCenter.value, gradientTop.value);
      }
    };
    const setValues = () => {
      data.labels = labelsY.value;
      data.datasets = [
        { ...datasetOptions, data: values.value },
        { ...datasetShadowOptions, data: valuesShadow.value }
      ];
      if (chartRef.value) {
        const chart = chartRef.value.chart;
        if (chart) {
          chart.config.data.labels = data.labels;
          chart.config.data.datasets = data.datasets;
          chart.config.options.scales.y.display = isBalanceVisible.value;
          chart.config.options.scales.x.ticks.maxTicksLimit = numTicksX.value;
          chart.update();
        }
      }
      if (chartRef2.value) {
        const chart = chartRef2.value.chart;
        if (chart) {
          chart.config.data.labels = data.labels;
          chart.config.data.datasets = data.datasets;
          chart.config.options.scales.y.display = isBalanceVisible.value;
          chart.config.options.scales.x.ticks.maxTicksLimit = numTicksX.value;
          chart.update();
        }
      }
    };
    const scaleValues = computed(() => {
      if (values.value.length === 0) {
        return ["0"];
      }
      const max = Math.max(...values.value);
      const min = Math.min(...values.value);
      const numElements = isSmallerThanMD.value ? 2 : 2;
      const step = (max - min) / numElements;
      const res = [];
      let current = min;
      let i = 0;
      res.push(current * 100 + "");
      while (current < max && i < numElements) {
        i++;
        current += step;
        res.push(current * 100 + "");
      }
      res.reverse();
      return res;
    });
    let toid = -1;
    watch(width, () => {
      clearTimeout(toid);
      if (width.value < 400) {
        numTicksX.value = 3;
      } else if (width.value < 500) {
        numTicksX.value = 3;
      } else if (width.value < 600) {
        numTicksX.value = 4;
      } else {
        numTicksX.value = 5;
      }
      toid = setTimeout(() => {
        setValues();
      }, 500);
    });
    watch(values, () => setValues(), { deep: true });
    watch(isBalanceVisible, () => setValues());
    onMounted(() => nextTick(setValues));
    watch([gradientBottom, gradientCenter, gradientTop], () => {
      setValues();
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        unref(showBlurBgs) ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(unref(Line), {
            data,
            options,
            class: "w-full",
            ref_key: "chartRef2",
            ref: chartRef2
          }, null, 512)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_3$1, [
          createVNode(unref(Line), {
            data,
            options,
            class: "w-full",
            ref_key: "chartRef",
            ref: chartRef
          }, null, 512)
        ]),
        !__props.hideLabelsY ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(scaleValues.value, (label) => {
            return openBlock(), createBlock(_sfc_main$7, {
              class: "shrink-0 h-6 sm:h-7 py-1 px-2.5 rounded-full shadow-black/30 shadow-lg",
              cssSign: "-mt-px mr-0.5",
              amount: label,
              "css-background-positive": "bg-bg-app/50 backdrop-blur-sm rounded-full",
              "css-background-negative": "bg-bg-app/50 backdrop-blur-md rounded-full",
              "css-background-neutral": "bg-bg-app/50 backdrop-blur-md rounded-full",
              "css-text-positive": "text-xs",
              "css-text-negative": "",
              "css-text-neutral": "",
              colored: "",
              "with-sign": false,
              currency: unref(activeCurrency).id,
              "display-decimals": 2,
              decimals: 2,
              "trim-fraction": false,
              "balance-always-visible": ""
            }, null, 8, ["amount", "currency"]);
          }), 256))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

const _hoisted_1 = { class: "w-full flex flex-row et-jb et-gap-sm" };
const _hoisted_2 = { class: "flex flex-row et-js-ic font-semibold" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "" };
const _hoisted_5 = { class: "flex flex-wrap et-je-is et-gap-xs" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdaPriceChart",
  props: {
    noBackground: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const { activeCurrency } = useCurrencyAPI();
    const { adaCurrency } = useAdaSymbol();
    const { formatDatetime } = useFormatter();
    const { gridLayout } = useScreenSize();
    const loading = ref(false);
    const availableDurations = ref([]);
    const availableIntervals = ref([]);
    const priceData = ref(null);
    const chartType = ref("line");
    const selectedChart = ref(chartType.value === "line" ? 0 : 1);
    ref(7);
    const selectedInterval = ref("15m");
    const _selectedDuration = ref({ label: "7d", duration: 7 });
    const _availableDurations = ref([]);
    computed(() => availableDurations.value.length > 0);
    const chartData = ref({
      chartLabels: [],
      chartData: [],
      chartShadow: []
    });
    watch(selectedChart, () => {
      reload();
    });
    const loadPriceData = async (networkId2) => {
      const request = {
        type: chartType.value,
        policyId: null,
        assetName: "ADA",
        currency: activeCurrency.value.id ?? "usd",
        startTimestamp: null,
        durationInDays: _selectedDuration.value.duration,
        interval: selectedInterval.value
      };
      const res = await api.post("/" + networkId2 + "/v1/misc/chart", request).catch((err) => {
        console.warn("Error: price chart: failed", networkId2);
      });
      if (!res || !res.data) {
        availableDurations.value = [];
        availableIntervals.value = [];
        throw "loadingFailed";
      }
      updateData(res.data ?? null);
    };
    const generateChartData = () => {
      let chartLabels = [];
      let chartData2 = [];
      let chartShadow = [];
      priceData.value?.price.forEach(
        (priceDataEntry, index) => {
          let time = String(priceDataEntry.time);
          while (time.length < 13) {
            time += "0";
          }
          let timestamp = Number(time);
          chartLabels.push(formatDatetime(timestamp));
          if (chartType.value === "line") {
            chartData2.push(priceDataEntry.price);
            chartShadow.push(priceDataEntry.price * 0.97);
          }
        }
      );
      return { chartLabels, chartData: chartData2, chartShadow };
    };
    const setTimeframe = async (days) => {
      _selectedDuration.value;
      if (!days) {
        return;
      }
      reload();
    };
    const updateData = (data) => {
      priceData.value = data ?? null;
      const pData = priceData.value;
      if (pData) {
        _availableDurations.value = pData.supportedDurations.map((value, index, array) => {
          return {
            label: value + (value !== "max" ? "d" : ""),
            duration: value
          };
        }).filter((item) => item.duration !== "max");
        if (!_selectedDuration.value) {
          if (_availableDurations.value.length > 1) {
            _selectedDuration.value = _availableDurations.value[1];
          } else {
            _selectedDuration.value = _availableDurations.value[0];
          }
        }
        availableDurations.value = pData.supportedDurations;
        availableIntervals.value = pData.supportedInterval;
      } else {
        availableDurations.value = [];
        availableIntervals.value = [];
      }
    };
    const reload = async () => {
      loading.value = true;
      try {
        await loadPriceData(networkId.value);
        chartData.value = generateChartData();
      } catch (e) {
      }
      loading.value = false;
    };
    reload();
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        ref: "chart",
        class: normalizeClass(["ada-price-chart", __props.noBackground ? "bg-transparent! rounded-none! border-transparent!" : ""]),
        pt: {
          body: "pb-0 px-0 et-gap-md",
          title: "px-card",
          content: "px-card mb-5"
        }
      }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("span", _hoisted_3, toDisplayString(unref(adaCurrency)), 1),
              _cache[2] || (_cache[2] = createBaseVNode("span", { class: "mx-1" }, "/", -1)),
              createBaseVNode("span", _hoisted_4, toDisplayString(unref(activeCurrency).symbol.toUpperCase()), 1)
            ]),
            createBaseVNode("div", _hoisted_5, [
              createVNode(_component_Select, {
                modelValue: _selectedDuration.value,
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = ($event) => _selectedDuration.value = $event),
                  _cache[1] || (_cache[1] = ($event) => setTimeframe($event))
                ],
                class: "pl-3.5 et-text-sm",
                size: "small",
                options: _availableDurations.value,
                pt: { label: "text-left" },
                optionLabel: "label",
                placeholder: ""
              }, null, 8, ["modelValue", "options"])
            ])
          ])
        ]),
        content: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(["relative h-96", unref(gridLayout) !== "wide" ? "max-h-32" : "max-h-48"])
          }, [
            createVNode(_sfc_main$1, {
              "hide-labels-x": "",
              "labels-y": chartData.value?.chartLabels ?? [],
              values: chartData.value?.chartData ?? []
            }, null, 8, ["labels-y", "values"])
          ], 2)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});

export { _sfc_main as _, _sfc_main$3 as a, _sfc_main$2 as b };
