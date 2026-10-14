import { d as defineComponent, w as useTranslation, D as computed, z as resolveComponent, c as createBlock, o as openBlock, U as withModifiers, y as withCtx, p as createBaseVNode, t as createCommentVNode, V as normalizeClass, B as toDisplayString, u as unref, R as useRoute, x as useScreenSize, Q as reactive, e as ref, P as networkId, n as createVNode, m as createElementBlock, F as Fragment, S as renderList, bm as updateNetworkId, bn as guardedUpdateNetworkId, N as nextTick, bo as getCurrentInstance, f as onMounted, aK as normalizeStyle, l as useTheme } from './index.js';
import { g as gsapWithCSS } from './index2.js';
import { D as Divider, _ as _sfc_main$9, a as _sfc_main$a, M as MotionPathPlugin } from './Divider.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useNotifications } from './useNotification.js';
import { u as useFileSystemAccess } from './useFileSystemAccess.js';
import { e as networkGroups, b as isEnabledNetworkId, i as isTestnetNetwork } from './NetworkId.js';
import { c as chainTip } from './chainTip.js';
import { N as NetworkIcons, u as useModalSelectNetwork } from './NetworkIcons.js';
import { _ as _sfc_main$6 } from './TabsToSelect.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$8 } from './Modal.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import { M as ModalContentCard } from './ModalContentCard.js';
import { c as cardanoLogo } from './image.js';
import { aw as numWalletsMap } from './app2.js';
import { _ as _sfc_main$5 } from './Badge.vue_vue_type_script_setup_true_lang.js';
import { u as useModalSelectCurrency } from './useModalSelectCurrency.js';
import { u as useModalSelectLanguage } from './useModalSelectLanguage.js';
import './iconify.js';
import './language.js';
import './BannerWarning.vue_vue_type_script_setup_true_lang.js';
import './IconAlert02.js';
import './_plugin-vue_export-helper.js';
import './TimezoneSetting.vue_vue_type_script_setup_true_lang.js';
import './currency2.js';
import './useCurrencyAPI.js';
import './bigmath.js';
import './InputSearch.vue_vue_type_script_setup_true_lang.js';
import './epochParams.js';
import './IconCancel01.js';
import './IconSearch01.js';
import './notification.js';
import './chain.js';
import './IconInformationCircle.js';
import './contractMapping.js';

const _hoisted_1$4 = { class: "relative shrink-0 grow-0 flex et-jc-ic rounded-full overflow-hidden" };
const _hoisted_2$2 = ["src"];
const _hoisted_3$2 = { class: "grow flex flex-col et-js-is et-gap-xs" };
const _hoisted_4$1 = { class: "flex flex-row et-gap-sm et-js-ic text-txt-content text-left" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "NetworkItem",
  props: {
    uiNetworkId: { type: String, required: true },
    isActiveNetwork: { type: Boolean, required: true, default: false },
    testnet: { type: Boolean, required: false, default: false }
  },
  emits: ["networkChange"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const numWallets = computed(() => numWalletsMap.value[props.uiNetworkId] ?? -1);
    const label = computed(() => $t("networkSwitcher:" + props.uiNetworkId + ".label"));
    const description = computed(() => $t("networkSwitcher:" + props.uiNetworkId + ".description"));
    const icon = computed(() => {
      const icon2 = NetworkIcons[props.uiNetworkId].icon;
      if (props.uiNetworkId === "mainnet") {
        return cardanoLogo;
      }
      return icon2;
    });
    const onNetworkSelected = () => {
      emit("networkChange", props.uiNetworkId);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "network-item w-full px-3 xs:px-4 py-3 xs:py-4 flex flex-row et-js-ic et-gap-mde xs:et-gap-lg shadow-sm rounded-2xl cursor-pointer border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)] hover:bg-[var(--p-button-text-secondary-hover-background)]",
        severity: "secondary",
        outlined: "",
        onClick: withModifiers(onNetworkSelected, ["stop"])
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$4, [
            createBaseVNode("img", {
              class: "w-10 sm:w-16 aspect-square",
              src: icon.value ?? void 0,
              alt: "network logo",
              loading: "lazy",
              onError: _cache[0] || (_cache[0] = ($event) => icon.value = "")
            }, null, 40, _hoisted_2$2)
          ]),
          createBaseVNode("div", _hoisted_3$2, [
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", {
                class: normalizeClass(__props.testnet ? "et-text-md" : "et-text-lg")
              }, toDisplayString(label.value), 3),
              __props.isActiveNetwork ? (openBlock(), createBlock(_sfc_main$5, {
                key: 0,
                class: "h-6",
                size: "small",
                badge: {
                  id: "-1",
                  label: unref($t)("common:active"),
                  bgColor: "var(--color-bg-positive)",
                  color: "var(--color-txt-positive)"
                },
                "no-action": "",
                "no-hover": ""
              }, null, 8, ["badge"])) : createCommentVNode("", true),
              numWallets.value > 0 ? (openBlock(), createBlock(_sfc_main$5, {
                key: 1,
                class: "h-6 px-2!",
                size: "small",
                badge: {
                  id: "-1",
                  label: numWallets.value + " " + unref($t)("common:wallets"),
                  bgColor: "var(--color-bg-neutral)",
                  color: "var(--color-txt-neutral)"
                },
                "no-action": "",
                "no-hover": ""
              }, null, 8, ["badge"])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["et-text-md text-txt-muted text-start", __props.testnet ? "" : " sm:"])
            }, toDisplayString(description.value), 3)
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$3 = {
  key: 0,
  class: "w-full"
};
const _hoisted_2$1 = { class: "flex flex-col et-gap-md my-1 sm:my-2" };
const _hoisted_3$1 = { class: "cap-first" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ModalSelectNetwork",
  emits: ["selected", "close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const $t = useTranslation().t;
    const route = useRoute();
    const { isSmallerThanSM } = useScreenSize();
    const {
      noRedirect,
      showModalNetworks,
      closeModalNetworks
    } = useModalSelectNetwork();
    const onClose = () => {
      closeModalNetworks();
      emit("close");
    };
    const networkGroupList = reactive([]);
    const networkGroupMap = /* @__PURE__ */ new Map();
    const networkGroupIds = Object.keys(networkGroups).sort((a, b) => b === "Cardano" ? 1 : a.localeCompare(b));
    for (let i = 0; i < networkGroupIds.length; i++) {
      const group = networkGroupIds[i];
      if (networkGroups[group].some((n) => isEnabledNetworkId(n))) {
        networkGroupList.push({ primaryLabel: group, value: i });
      }
    }
    const currentNetworkGroup = ref(networkGroupList.find((_network) => _network.value === networkGroupMap.get(networkId.value)?.id) ?? networkGroupList[0]);
    ref(false);
    const initialized = computed(() => chainTip.value.onTip ?? false);
    computed(() => initialized.value ? "" : $t("networkSwitcher:offline"));
    const getMainNetworkList = (networkList) => networkList.filter((n) => !isTestnetNetwork(n) && isEnabledNetworkId(n));
    const getTestNetworkList = (networkList) => networkList.filter((n) => isTestnetNetwork(n) && isEnabledNetworkId(n));
    const onNetworkChange = (_networkId) => {
      console.log(route);
      if (_networkId === networkId.value) {
        return;
      }
      if (noRedirect.value) {
        if (!route.params.networkid) {
          updateNetworkId(_networkId);
        }
        return;
      }
      guardedUpdateNetworkId(_networkId, true);
      nextTick(() => {
        onClose();
      });
    };
    return (_ctx, _cache) => {
      return unref(showModalNetworks) ? (openBlock(), createBlock(_sfc_main$8, {
        key: 0,
        "modal-container": "#modal-network-select",
        narrow: "",
        "full-width-on-mobile": "",
        "attach-to-bottom": unref(isSmallerThanSM),
        onClose
      }, {
        header: withCtx(({ handleClose }) => [
          createVNode(_sfc_main$7, {
            headline: unref($t)("networkSwitcher:title"),
            caption: unref($t)("networkSwitcher:caption"),
            "hide-back": "",
            "hide-info": "",
            "show-close": "",
            onClose: ($event) => handleClose()
          }, null, 8, ["headline", "caption", "onClose"])
        ]),
        content: withCtx(({ handleClose }) => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              createVNode(_sfc_main$6, {
                "selected-tab": currentNetworkGroup.value,
                "onUpdate:selectedTab": _cache[0] || (_cache[0] = ($event) => currentNetworkGroup.value = $event),
                "tab-labels": networkGroupList
              }, null, 8, ["selected-tab", "tab-labels"]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(networkGroupList, (networkGroup, index) => {
                return openBlock(), createElementBlock(Fragment, {
                  key: networkGroup.primaryLabel
                }, [
                  index === currentNetworkGroup.value.value ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
                    createBaseVNode("div", _hoisted_2$1, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(getMainNetworkList(unref(networkGroups)[currentNetworkGroup.value.primaryLabel]), (network, networkIndex) => {
                        return openBlock(), createBlock(_sfc_main$4, {
                          key: "mn" + networkIndex,
                          "ui-network-id": network,
                          "is-active-network": network === unref(networkId),
                          onNetworkChange: ($event) => {
                            onNetworkChange($event);
                            handleClose();
                          }
                        }, null, 8, ["ui-network-id", "is-active-network", "onNetworkChange"]);
                      }), 128)),
                      createVNode(Divider, null, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_3$1, toDisplayString(unref($t)("common:network.testnets")), 1)
                        ]),
                        _: 1
                      }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(getTestNetworkList(unref(networkGroups)[currentNetworkGroup.value.primaryLabel]), (network, networkIndex) => {
                        return openBlock(), createBlock(_sfc_main$4, {
                          key: "tn" + networkIndex,
                          "ui-network-id": network,
                          "is-active-network": network === unref(networkId),
                          testnet: "",
                          onNetworkChange: ($event) => {
                            onNetworkChange($event);
                            handleClose();
                          }
                        }, null, 8, ["ui-network-id", "is-active-network", "onNetworkChange"]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ], 64);
              }), 128))
            ]),
            _: 2
          }, 1024)
        ]),
        _: 1
      }, 8, ["attach-to-bottom"])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$2 = { class: "w-full flex et-je-ic" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ModalSelectCurrency",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const $t = useTranslation().t;
    const {
      showModalSelectCurrency,
      closeModalSelectCurrency
    } = useModalSelectCurrency();
    const onClose = () => {
      closeModalSelectCurrency();
      emit("close");
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return unref(showModalSelectCurrency) ? (openBlock(), createBlock(_sfc_main$8, {
        key: 0,
        narrow: "",
        "half-height": "",
        "full-width-on-mobile": "",
        onClose
      }, {
        header: withCtx(({ handleClose }) => [
          createVNode(_sfc_main$7, {
            headline: unref($t)("settings-app:currency.title"),
            caption: unref($t)("settings-app:currency.caption"),
            "hide-info": "",
            "show-close": "",
            onBack: ($event) => handleClose(),
            onClose: ($event) => handleClose()
          }, null, 8, ["headline", "caption", "onBack", "onClose"])
        ]),
        content: withCtx(({ handleClose }) => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              createVNode(_sfc_main$9, { "hide-caption": "" })
            ]),
            _: 1
          })
        ]),
        footer: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_1$2, [
            createVNode(_component_Button, {
              label: unref($t)("common:confirm"),
              rounded: "",
              onClick: handleClose
            }, null, 8, ["label", "onClick"])
          ])
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$1 = { class: "w-full flex et-je-ic" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ModalSelectLanguage",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const $t = useTranslation().t;
    const {
      showModalSelectLanguage,
      closeModalSelectLanguage
    } = useModalSelectLanguage();
    const onClose = () => {
      closeModalSelectLanguage();
      emit("close");
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return unref(showModalSelectLanguage) ? (openBlock(), createBlock(_sfc_main$8, {
        key: 0,
        narrow: "",
        "half-height": "",
        "full-width-on-mobile": "",
        onClose
      }, {
        header: withCtx(({ handleClose }) => [
          createVNode(_sfc_main$7, {
            headline: unref($t)("settings-app:language.title"),
            "hide-info": "",
            "show-close": "",
            onBack: ($event) => handleClose(),
            onClose: ($event) => handleClose()
          }, null, 8, ["headline", "onBack", "onClose"])
        ]),
        content: withCtx(({ handleClose }) => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              createVNode(_sfc_main$a, { handleClose }, null, 8, ["handleClose"])
            ]),
            _: 2
          }, 1024)
        ]),
        footer: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_1$1, [
            createVNode(_component_Button, {
              label: unref($t)("common:confirm"),
              rounded: "",
              onClick: handleClose
            }, null, 8, ["label", "onClick"])
          ])
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1 = { class: "fixed w-0 h-0" };
const _hoisted_2 = {
  x1: "17.5",
  y1: "-36.875",
  x2: "26.3744",
  y2: "29.4977",
  id: "gradient_icon_gold_orange_0",
  gradientUnits: "userSpaceOnUse"
};
const _hoisted_3 = {
  x1: "12.5",
  y1: "-78.125",
  x2: "77.2907",
  y2: "99.1629",
  id: "gradient_icon_gold_orange_1",
  gradientUnits: "userSpaceOnUse"
};
const _hoisted_4 = { class: "modal-container absolute w-full! h-full! inset-0! et-min-size-app overflow-hidden pointer-events-none z-100" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const { setTranslate } = useFormatter();
    const $t = useTranslation().t;
    setTranslate($t);
    gsapWithCSS.registerPlugin(MotionPathPlugin);
    const {
      gradientBlue,
      gradientViolet,
      gradientRed,
      gradientOrange,
      gradientPurple
    } = useTheme();
    const {
      showNarrowTxViewer,
      showWideTxViewer,
      isTweeningOut
    } = useScreenSize();
    const instance = getCurrentInstance();
    const {
      initFileSystemAccess
    } = useFileSystemAccess();
    const $toast = instance?.appContext.config.globalProperties.$toast;
    useNotifications($toast);
    const width = computed(() => {
      return "transition-all delay-75! " + (showNarrowTxViewer.value && !isTweeningOut.value ? "et-max-width-layout-show-narrow-tx" : showWideTxViewer.value && !isTweeningOut.value ? "et-max-width-layout-show-wide-tx" : "w-full");
    });
    window.addEventListener("error", (event) => {
      if (event.message && event.message.includes("ResizeObserver loop completed with undelivered notifications")) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
      }
    });
    setInterval(() => {
      const list = document.getElementsByClassName("p-tooltip");
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          const el2 = list[i];
          if (el2) {
            el2.parentElement?.removeChild(el2);
          }
        }
      }
    }, 1e4);
    onMounted(() => {
      initFileSystemAccess(true);
    });
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock(Fragment, null, [
        (openBlock(), createElementBlock("svg", _hoisted_1, [
          createBaseVNode("defs", null, [
            createBaseVNode("linearGradient", _hoisted_2, [
              createBaseVNode("stop", {
                style: normalizeStyle("stop-color:" + unref(gradientBlue))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.21875",
                style: normalizeStyle("stop-color:" + unref(gradientViolet))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.473958",
                style: normalizeStyle("stop-color:" + unref(gradientRed))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.739583",
                style: normalizeStyle("stop-color:" + unref(gradientOrange))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "1",
                style: normalizeStyle("stop-color:" + unref(gradientPurple))
              }, null, 4)
            ]),
            createBaseVNode("linearGradient", _hoisted_3, [
              createBaseVNode("stop", {
                style: normalizeStyle("stop-color:" + unref(gradientBlue))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.21875",
                style: normalizeStyle("stop-color:" + unref(gradientViolet))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.473958",
                style: normalizeStyle("stop-color:" + unref(gradientRed))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "0.739583",
                style: normalizeStyle("stop-color:" + unref(gradientOrange))
              }, null, 4),
              createBaseVNode("stop", {
                offset: "1",
                style: normalizeStyle("stop-color:" + unref(gradientPurple))
              }, null, 4)
            ])
          ])
        ])),
        createVNode(_component_router_view),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-modal"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-dapp-store-iframe"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-dapp-store-sign"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-settings"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-setting-component"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-import-address-book"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-network-select"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-ms-discovery-viewer"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-ms-participant-viewer"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-select-account"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-receive-address"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-add-assets"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-add-message"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-gov-drep-viewer"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-gov-action-viewer"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-gov-action-vote"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-gov-drep-registration"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-addressbook"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-add-addressbook"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-rename-account"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-passwords"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-sign-tx"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-sign-data"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-sign-derivation"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "eternl-enable"
          }, null, 2),
          _cache[0] || (_cache[0] = createBaseVNode("div", {
            class: "absolute inset-0",
            id: "modal-tx-viewer"
          }, null, -1)),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-eternl-tx-note"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-asset-details"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "scan-qr"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-image"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-confirm-action"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-accept-terms"
          }, null, 2),
          createBaseVNode("div", {
            class: normalizeClass(["absolute h-full", width.value]),
            id: "modal-accept-terms-content"
          }, null, 2)
        ]),
        createVNode(_sfc_main$1),
        createVNode(_sfc_main$2),
        createVNode(_sfc_main$3)
      ], 64);
    };
  }
});

export { _sfc_main as default };
