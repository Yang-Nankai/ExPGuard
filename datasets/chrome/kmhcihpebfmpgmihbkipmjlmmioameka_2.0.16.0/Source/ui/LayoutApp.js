import { m as createElementBlock, o as openBlock, p as createBaseVNode, v as createStaticVNode, D as computed, e as ref, d as defineComponent, w as useTranslation, R as useRoute, G as watch, F as Fragment, S as renderList, c as createBlock, t as createCommentVNode, z as resolveComponent, U as withModifiers, u as unref, y as withCtx, V as normalizeClass, W as resolveDynamicComponent, B as toDisplayString, X as useDesktopMenuCollapsed, Y as toRefs, f as onMounted, Z as useLocalStorage, x as useScreenSize, n as createVNode, $ as createSlots, a0 as renderSlot, a1 as withDirectives, a2 as resolveDirective, k as onUnmounted, H as createTextVNode, a3 as useTemplateRef, a4 as useScroll, a5 as useDarkMode, a6 as useRouter, a7 as useSlots, a8 as useElementSize, a9 as normalizeProps, aa as guardReactiveProps, P as networkId, ab as mergeModels, ac as useModel, ad as dispatchSignalSync, l as useTheme, N as nextTick, J as usePINLogin } from './index.js';
import { u as useAppWalletIdList } from './IconPieChart.js';
import { a as fixedDappWalletId, b as fixedDappAccountId, u as useDappAccount, d as favoriteAccountIdList, n as numAccountIds, g as getIAppAccountByScript, e as getIAppAccountById, D as DataError, h as calcAccountTxBalance, f as freeCSLObjects } from './app2.js';
import { u as useNotifications } from './useNotification.js';
import { u as useBalanceVisible } from './useBalanceVisible.js';
import { u as useLayout } from './useLayoutBuilder.js';
import { u as useMainMenu, _ as _sfc_main$x, H as HomeOutline, a as useModalAddWallet, b as useWalletListMenu, I as IconWarning, c as useBottomBar, d as _sfc_main$G, e as useModalSettings } from './AccountSignItem.vue_vue_type_script_setup_true_lang.js';
import { u as useNavigation } from './useNavigation.js';
import { u as useModalScanQR, I as IconQR } from './IconQR.js';
import { u as useWalletList, _ as _sfc_main$A, I as IconEyeHidden, a as IconSettings } from './WalletList.vue_vue_type_script_setup_true_lang.js';
import { I as IconCopy01, a as IconEyeVisible } from './IconCopy01.js';
import { I as IconDApp, a as IconCheckmarkCircle04, M as MultiSigGradient, b as IconLockEnabled } from './SyncInfo.vue_vue_type_script_setup_true_lang.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { u as useModalSelectAccount } from './IconPlusSign.js';
import { I as IconTransactionOutline } from './IconTransactionOutline.js';
import { I as IconAssetsOutline } from './IconAssetsOutline.js';
import { I as IconGlobe, a as IconInfo } from './IconInfo.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { g as gsapWithCSS } from './index2.js';
import { D as DrawSVGPlugin } from './DrawSVGPlugin.js';
import { _ as _sfc_main$y } from './Modal.vue_vue_type_script_setup_true_lang.js';
import { I as IconChevronLeft, a as IconChevronRight } from './IconChevronRight.js';
import { _ as _sfc_main$z } from './NetworkButton.vue_vue_type_script_setup_true_lang.js';
import { c as chainTip } from './chainTip.js';
import { u as useChainProgress } from './useChainProgress.js';
import { u as useAppMode } from './useAppMode.js';
import { u as useHomeSettings } from './useHomeSettings.js';
import { a as useWalletAccount, u as useModalTransactionViewer } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$C } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$B } from './AdaHandleName.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$D, a as _sfc_main$K } from './EternlLogoLayout.vue_vue_type_script_setup_true_lang.js';
import { I as IconCancel01 } from './IconCancel01.js';
import { n as notificationList, a as numUnreadNotifications, b as numNotifications, s as severity, c as numDeletedNotifications } from './notification2.js';
import { d as doSetNotificationDeleted, a as doSetNotificationRead, b as doResetNotificationDeleted } from './notification.js';
import { u as usePaginator } from './usePaginator.js';
import { g as getTransactionFromCbor, E as ErrorTxCbor } from './useSignTx.js';
import { g as getTimestampFromSlot, a as getCalculatedChainTip } from './chain.js';
import { g as getHexFromNativeScriptJSON, j as joinMetaDataValue, a as getSignTxCredList } from './creds.js';
import { p as parseTxSignRequest } from './parse.js';
import { u as useFormatter } from './useFormatter.js';
import { g as getBadgeConfig, _ as _sfc_main$H } from './Badge.vue_vue_type_script_setup_true_lang.js';
import { I as IconUserGroup, a as IconClock } from './IconUserGroup.js';
import { _ as _sfc_main$E } from './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$F } from './Badges.vue_vue_type_script_setup_true_lang.js';
import { u as useSelectedAccount$1 } from './epochParams.js';
import { _ as _sfc_main$J } from './AdaPriceChart.vue_vue_type_script_setup_true_lang.js';
import { u as useCurrencyAPI } from './useCurrencyAPI.js';
import { _ as _sfc_main$I } from './FiatAmount.vue_vue_type_script_setup_true_lang.js';
import './NetworkId.js';
import './bigmath.js';
import './StakeRewardsChart.vue_vue_type_script_setup_true_lang.js';
import './ButtonRow.js';
import './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import './SwapElement.vue_vue_type_script_setup_true_lang.js';
import './useSubmitTx.js';
import './ErrorSubmitTx.js';
import './useAppAccountBalances.js';
import './lib.js';
import './swap.js';
import './generateConfig.js';
import './useApp.js';
import './IconSettings.vue_vue_type_script_setup_true_lang.js';
import './ExternalLink.vue_vue_type_script_setup_true_lang.js';
import './language.js';
import './image.js';
import './IconChevronDown.js';
import './TokenIcon.vue_vue_type_script_setup_true_lang.js';
import './SwapTimeAgo.vue_vue_type_script_setup_true_lang.js';
import './BannerWarning.vue_vue_type_script_setup_true_lang.js';
import './IconAlert02.js';
import './IconStakingOutline.js';
import './IconMonsterSwap.js';
import './IconNumberedList.js';
import './IconVoting.js';
import './send.js';
import './useResetScroll.js';
import './useModalReceiveAddress.js';
import './IconChevronUp.js';
import './IconArrowLB.js';
import './IconPencil.js';
import './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import './history.js';
import './contractMapping.js';
import './NetworkIcons.js';
import './useModalAssetDetails.js';
import './useGuards.js';
import './index3.js';
import './GradientBar2.js';
import './multisig.js';
import './ErrorSignTx.js';
import './useAdaSymbol.js';
import './useModalBuyADA.js';
import './txHistory.js';
import './IconSpinner.js';
import './LineSpacer.js';
import './TransactionItem.vue_vue_type_script_setup_true_lang.js';
import './TransactionItemHeader.vue_vue_type_script_setup_true_lang.js';
import './TransactionItemMessages.vue_vue_type_script_setup_true_lang.js';
import './messageEncryption.js';
import './decryptedMsg.js';
import './IconSquareUnlock02.js';
import './govActionList.js';
import './MilkomedaDB.js';
import './currency2.js';

const _sfc_main$w = {  };

const _hoisted_1$r = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$7(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$r, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      fill: "none",
      d: "M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
    }, null, -1),
    createBaseVNode("path", {
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      fill: "none",
      d: "M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
    }, null, -1)
  ]))]))
}
const IconNotifications = /*#__PURE__*/_export_sfc(_sfc_main$w, [['render',_sfc_render$7]]);

const _sfc_main$v = {  };

const _hoisted_1$q = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24",
  color: "#000000",
  fill: "none",
  stroke: "currentColor"
};

function _sfc_render$6(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$q, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path d=\"M17.854 12.16C17.471 12.6105 16.7631 12.6138 16.3165 12.1671L11.8329 7.68351C11.3862 7.23686 11.3895 6.529 11.84 6.14596L13.071 5.09939C13.9559 4.34704 15.0349 3.84824 16.2044 3.6509L16.9294 3.52858C17.614 3.41306 18.3339 3.65221 18.8475 4.16577L19.8342 5.15255C20.3478 5.66611 20.5869 6.38601 20.4714 7.07063L20.3491 7.79559C20.1518 8.9651 19.653 10.0441 18.9006 10.929L17.854 12.16Z\" stroke-width=\"1.5\"></path><path d=\"M19.5 4.5L21.5 2.5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M2.5 21.5L4.5 19.5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M6.14596 11.84C6.52901 11.3895 7.23686 11.3862 7.68351 11.8329L12.1671 16.3165C12.6138 16.7631 12.6105 17.471 12.16 17.854L10.929 18.9006C10.0441 19.653 8.9651 20.1518 7.79559 20.3491L7.07063 20.4714C6.38601 20.5869 5.66611 20.3478 5.15255 19.8342L4.16577 18.8475C3.65221 18.3339 3.41306 17.614 3.52858 16.9294L3.6509 16.2044C3.84824 15.0349 4.34704 13.9559 5.09939 13.071L6.14596 11.84Z\" stroke-width=\"1.5\"></path><path d=\"M8.5 12.5L10.5 10.5M11.5 15.5L13.5 13.5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>", 5)
  ]))]))
}
const IconPlugSocket = /*#__PURE__*/_export_sfc(_sfc_main$v, [['render',_sfc_render$6]]);

const _isMenuOpen = ref(false);
const useMenuOpen = () => {
  const toggleMenuOpen = () => {
    _isMenuOpen.value = !_isMenuOpen.value;
  };
  const closeMenuOpen = () => {
    _isMenuOpen.value = false;
  };
  const isMenuOpen = computed(() => _isMenuOpen.value);
  return {
    isMenuOpen,
    closeMenuOpen,
    toggleMenuOpen
  };
};

const _hoisted_1$p = { class: "menu-mobile relative w-full flex flex-col" };
const _hoisted_2$f = { class: "w-full flex flex-col et-jc-ic et-gap-sm" };
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "MenuMobile",
  props: {
    numColumns: { type: Number, required: false, default: -1 },
    compact: { type: Boolean, required: false, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const $t = useTranslation().t;
    const { gotoHome, gotoPage } = useNavigation();
    const {
      mainMenuItemList
    } = useMainMenu($t);
    const route = useRoute();
    const _numColumns = computed(() => {
      if (props.numColumns === 1) {
        return "grid-cols-1";
      } else if (props.numColumns === 2) {
        return "grid-cols-2";
      } else if (props.numColumns === 3) {
        return "grid-cols-3";
      } else if (props.numColumns === 4) {
        return "grid-cols-4";
      }
      return "grid-cols-3 xs:grid-cols-4";
    });
    watch(mainMenuItemList, () => {
      const currentRoute = route.name;
      if (!mainMenuItemList.some((i) => i.routeName === currentRoute)) {
        gotoHome();
      }
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1$p, [
        createBaseVNode("div", {
          class: normalizeClass([_numColumns.value + " " + (__props.compact ? "et-gap-x-xs et-gap-y-xs" : "et-gap-x-xs et-gap-y-sm"), "w-full grid items-start et-gap-sm"])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(mainMenuItemList), (item) => {
            return openBlock(), createElementBlock(Fragment, null, [
              !item.isDivider ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                class: "w-full rounded-xl p-1 py-1 border-0",
                severity: item.routeName === unref(route).name ? "secondary" : "secondary",
                text: "",
                onClick: withModifiers(($event) => {
                  item.onClick?.() ?? unref(gotoPage)(item.routeName ?? "PageAccountOverview");
                  _ctx.$emit("close");
                }, ["prevent", "stop"])
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2$f, [
                    createBaseVNode("div", {
                      class: normalizeClass([
                        "border-1 rounded-full flex flex-col et-jc-ic",
                        (__props.compact ? item.routeName === unref(route).name ? "border-border-highlight text-txt-highlight" : "border-txt-content/50" : item.routeName === unref(route).name ? "border-border-highlight text-txt-highlight" : "border-txt-content/50") + " " + (__props.compact ? "p-2" : "p-3")
                      ])
                    }, [
                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                        class: normalizeClass([__props.compact ? "size-4" : "size-5", "shrink-0"])
                      }, null, 8, ["class"]))
                    ], 2),
                    createBaseVNode("div", {
                      class: normalizeClass([(item.routeName === unref(route).name ? "text-txt-highlight" : "") + " " + (__props.compact ? "et-text-xs" : "et-text-sm"), "break-words"])
                    }, toDisplayString(item.label), 3)
                  ])
                ]),
                _: 2
              }, 1032, ["severity", "onClick"])) : createCommentVNode("", true)
            ], 64);
          }), 256))
        ], 2)
      ]);
    };
  }
});

const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "MenuActiveWallet",
  props: {
    showSyncState: { type: Boolean, required: false, default: true },
    hideFiatBalance: { type: Boolean, required: false, default: false },
    modalType: { type: String, required: false, default: "select" }
  },
  emits: ["open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      isDesktopMenuCollapsed
    } = useDesktopMenuCollapsed();
    const {
      setModalSelectAccountOpen
    } = useModalSelectAccount();
    const {
      selectedWalletId,
      selectedAccountId
    } = useSelectedAccount();
    const onOpenModal = () => {
      emit("open");
      setModalSelectAccountOpen(true, props.modalType);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$x, {
        class: normalizeClass(unref(isDesktopMenuCollapsed) ? "w-16.5" : "w-full"),
        "wallet-id": unref(selectedWalletId),
        "account-id": unref(selectedAccountId),
        "is-collapsed": unref(isDesktopMenuCollapsed),
        "hide-highlight": "",
        "show-selected-account-instead": "",
        "show-sync-state": __props.showSyncState,
        "hide-fiat-balance": __props.hideFiatBalance,
        onClick: onOpenModal
      }, null, 8, ["class", "wallet-id", "account-id", "is-collapsed", "show-sync-state", "hide-fiat-balance"]);
    };
  }
});

const _hoisted_1$o = {
  id: "fx_main_navi_open_close_mobile",
  class: "fx_announcement_ani_size w-full h-full"
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "IconFxMobileMenu",
  props: {
    isOpen: { type: Boolean, required: true, default: false }
  },
  setup(__props) {
    gsapWithCSS.registerPlugin(DrawSVGPlugin);
    const props = __props;
    const { isOpen } = toRefs(props);
    let gtl = gsapWithCSS.timeline({ paused: true });
    let cl = "";
    onMounted(() => {
      gtl.addLabel("start", cl + "+=0.00");
      cl = "start";
      gtl.set("#fx_main_navi_open_close_mobile_LL", { rotation: 0, svgOrigin: "30px 26px" }, cl + "+=0.00");
      gtl.set("#fx_main_navi_open_close_mobile_LR", { rotation: 0, svgOrigin: "30px 34px" }, cl + "+=0.00");
      gtl.addLabel("fadein", cl + "+=0.01");
      cl = "fadein";
      gtl.addLabel("phase0", cl + "+=0.01");
      cl = "phase0";
      gtl.to("#fx_main_navi_open_close_mobile_LL", { y: 4, duration: 0.2, ease: "sine.inOut" }, cl + "+=0.0");
      gtl.to("#fx_main_navi_open_close_mobile_LR", { y: -4, duration: 0.2, ease: "sine.inOut" }, cl + "+=0.0");
      gtl.addLabel("phase1", cl + "+=0.2");
      cl = "phase1";
      gtl.to("#fx_main_navi_open_close_mobile_LL", { rotation: 45, duration: 0.3, ease: "sine.inOut" }, cl + "+=0.1");
      gtl.to("#fx_main_navi_open_close_mobile_LR", { rotation: -45, duration: 0.3, ease: "sine.inOut" }, cl + "+=0.1");
      gtl.addLabel("fadeout", cl + "+=0");
      cl = "fadeout";
      gtl.seek("fadein");
      gtl.timeScale(3);
      gsapWithCSS.set("#fx_main_navi_open_close_mobile", { opacity: 1 });
      watch(isOpen, () => {
        if (isOpen.value) {
          gtl.play(0);
        } else {
          gtl.reverse("fadeout");
        }
      }, { immediate: true });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$o, [..._cache[0] || (_cache[0] = [
        createStaticVNode('<div id="fx_main_navi_open_close_mobile_svg_wrap" class="w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 60 60" xml:space="preserve" class="w-full h-full"><g id="fx_main_navi_open_close_mobile_wrap" class="w-full h-full"><path id="fx_main_navi_open_close_mobile_LL" class="fill-none stroke-2" style="stroke-linecap:round;" d="M40,26H20"></path><path id="fx_main_navi_open_close_mobile_LR" class="fill-none stroke-2" style="stroke-linecap:round;" d="M40,34H20"></path></g></svg></div>', 1)
      ])]);
    };
  }
});

const _hoisted_1$n = { class: "w-full grid grid-cols-2 et-jev pt-1" };
const _hoisted_2$e = { class: "h-full flex et-jc-ic" };
const _hoisted_3$a = { class: "h-full flex et-jc-ic" };
const _hoisted_4$9 = { class: "shrink-0 grow-0 w-14 h-14 flex flex-row et-jev" };
const _hoisted_5$6 = { class: "w-full h-14 grid grid-cols-2 pt-1" };
const _hoisted_6$3 = { class: "h-full flex et-jc-ic" };
const _hoisted_7$3 = { class: "h-full flex et-jc-ic" };
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "BottomNavigation",
  setup(__props) {
    const showBlurBgs = useLocalStorage("showBlurBgs", true, { listenToStorageChanges: true });
    const $t = useTranslation().t;
    const route = useRoute();
    const { gotoPage } = useNavigation();
    useScreenSize();
    const {
      isMenuOpen,
      closeMenuOpen,
      toggleMenuOpen
    } = useMenuOpen();
    useModalSelectAccount();
    const delayedClose = (handleClose) => {
      setTimeout(() => handleClose?.(), 133);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["w-full flex flex-row et-jev et-ic h-18 border-t", unref(showBlurBgs) ? "bg-black/20 border-bg-2/50 backdrop-blur-modal" : "bg-black border-bg-2"])
        }, [
          createBaseVNode("div", _hoisted_1$n, [
            createBaseVNode("div", _hoisted_2$e, [
              createVNode(_component_Button, {
                class: "shrink grow h-full p-0 px-0.5 max-w-32 rounded-none",
                label: unref($t)("navigation:home"),
                "icon-pos": "top",
                pt: { label: "-mt-1 et-text-sm max-w-full truncate" },
                "data-ui": unref(route).name === "PageAccountOverview" ? "active" : "",
                rounded: "",
                link: "",
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(gotoPage)("PageAccountOverview"), ["prevent", "stop"]))
              }, {
                icon: withCtx(() => [
                  createVNode(HomeOutline, { class: "size-6" })
                ]),
                _: 1
              }, 8, ["label", "data-ui"])
            ]),
            createBaseVNode("div", _hoisted_3$a, [
              createVNode(_component_Button, {
                class: "shrink grow h-full p-0 px-0.5 max-w-32 rounded-none",
                label: unref($t)("navigation:transactions"),
                "icon-pos": "top",
                pt: { label: "-mt-1 et-text-sm max-w-full truncate" },
                "data-ui": unref(route).name === "PageTransactionList" ? "active" : "",
                rounded: "",
                link: "",
                onClick: _cache[1] || (_cache[1] = withModifiers(($event) => unref(gotoPage)("PageTransactionList"), ["prevent", "stop"]))
              }, {
                icon: withCtx(() => [
                  createVNode(IconTransactionOutline, { class: "size-6" })
                ]),
                _: 1
              }, 8, ["label", "data-ui"])
            ])
          ]),
          createBaseVNode("div", _hoisted_4$9, [
            createVNode(_component_Button, {
              class: "c-2 w-14 h-14 !p-0 -mt-6 bg-white hover:bg-black focus:bg-black stroke-black hover:stroke-white focus:stroke-white",
              rounded: "",
              link: "",
              onClick: unref(toggleMenuOpen)
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$s, { "is-open": unref(isMenuOpen) }, null, 8, ["is-open"])
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          createBaseVNode("div", _hoisted_5$6, [
            createBaseVNode("div", _hoisted_6$3, [
              createVNode(_component_Button, {
                class: "shrink grow h-full p-0 px-0.5 max-w-32 rounded-none",
                label: unref($t)("navigation:assets"),
                "icon-pos": "top",
                pt: { label: "-mt-1 et-text-sm max-w-full truncate" },
                "data-ui": unref(route).name === "PageAssetList" ? "active" : "",
                rounded: "",
                link: "",
                onClick: _cache[2] || (_cache[2] = withModifiers(($event) => unref(gotoPage)("PageAssetList"), ["prevent", "stop"]))
              }, {
                icon: withCtx(() => [
                  createVNode(IconAssetsOutline, { class: "size-6" })
                ]),
                _: 1
              }, 8, ["label", "data-ui"])
            ]),
            createBaseVNode("div", _hoisted_7$3, [
              createVNode(_component_Button, {
                class: "shrink grow h-full p-0 px-0.5 max-w-32 rounded-none",
                label: unref($t)("navigation:dappBrowser"),
                "icon-pos": "top",
                pt: { label: "-mt-1 et-text-sm max-w-full truncate" },
                "data-ui": unref(route).name === "PageDAppBrowser" ? "active" : "",
                rounded: "",
                link: "",
                onClick: _cache[3] || (_cache[3] = withModifiers(($event) => unref(gotoPage)("PageDAppBrowser"), ["prevent", "stop"]))
              }, {
                icon: withCtx(() => [
                  createVNode(IconGlobe, { class: "size-6" })
                ]),
                _: 1
              }, 8, ["label", "data-ui"])
            ])
          ])
        ], 2),
        unref(isMenuOpen) ? (openBlock(), createBlock(_sfc_main$y, {
          key: 0,
          "attach-to-bottom": "",
          "full-width-on-mobile": "",
          onClose: unref(closeMenuOpen)
        }, createSlots({
          content: withCtx(({ handleClose }) => [
            createVNode(_sfc_main$u, {
              class: "pt-4 pb-8",
              onClose: ($event) => delayedClose(handleClose)
            }, null, 8, ["onClose"])
          ]),
          footer: withCtx(({ handleClose }) => [
            createVNode(_sfc_main$t, {
              class: "w-full",
              "show-sync-state": false,
              "hide-fiat-balance": true,
              onOpen: ($event) => delayedClose(handleClose)
            }, null, 8, ["onOpen"]),
            createVNode(_component_Button, {
              class: "absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 !p-0 -mt-10 sm:-mt-9 pointer-events-auto bg-white hover:bg-black focus:bg-black stroke-black hover:stroke-white focus:stroke-white",
              rounded: "",
              link: "",
              onClick: ($event) => delayedClose(handleClose)
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$s, { "is-open": unref(isMenuOpen) }, null, 8, ["is-open"])
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 2
        }, [
          void 0
        ]), 1032, ["onClose"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _hoisted_1$m = { class: "menu-desktop relative w-full h-full flex flex-col et-gap-sm" };
const _hoisted_2$d = { class: "relative w-full h-full flex flex-col overflow-x-hidden overflow-y-auto et-scrollbar" };
const _hoisted_3$9 = { class: "relative w-full flex flex-row et-gap-mde" };
const _hoisted_4$8 = { class: "w-full flex flex-col et-jc-is py-1 px-3.5" };
const _hoisted_5$5 = {
  key: 0,
  class: "w-full flex flex-col et-jc-is et-gap-sm pl-3"
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "MenuDesktop",
  props: {
    hideCollapse: { type: Boolean, required: false, default: false },
    fullWidth: { type: Boolean, required: false, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const $t = useTranslation().t;
    const { gotoHome, gotoPage } = useNavigation();
    const {
      mainMenuItemList,
      collapseMenuItem
    } = useMainMenu($t);
    const {
      isDesktopMenuCollapsed
    } = useDesktopMenuCollapsed();
    const route = useRoute();
    const label = computed(() => !isDesktopMenuCollapsed.value ? collapseMenuItem.value?.label ?? "" : "");
    watch(mainMenuItemList, () => {
      const currentRoute = route.name;
      if (!mainMenuItemList.some((i) => i.routeName === currentRoute)) {
        gotoHome();
      }
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Divider = resolveComponent("Divider");
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        renderSlot(_ctx.$slots, "default"),
        createBaseVNode("div", _hoisted_2$d, [
          createBaseVNode("div", _hoisted_3$9, [
            createBaseVNode("div", _hoisted_4$8, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(mainMenuItemList), (item) => {
                return openBlock(), createElementBlock(Fragment, null, [
                  !item.isDivider ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    class: normalizeClass(["p-y whitespace-nowrap", (unref(isDesktopMenuCollapsed) ? "pl-2 pr-2" : "pl-1.75 pr-3") + " " + (__props.fullWidth ? "w-full" : "")]),
                    label: item.label,
                    disabled: item.disabled,
                    severity: item.routeName === unref(route).name ? "primary" : "secondary",
                    rounded: "",
                    text: !__props.fullWidth,
                    outlined: __props.fullWidth,
                    onClick: withModifiers(($event) => {
                      item.onClick?.() ?? unref(gotoPage)(item.routeName ?? "PageAccountOverview");
                      _ctx.$emit("close");
                    }, ["prevent", "stop"])
                  }, {
                    icon: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "size-5 shrink-0 mr-2" }))
                    ]),
                    _: 2
                  }, 1032, ["class", "label", "disabled", "severity", "text", "outlined", "onClick"])) : (openBlock(), createBlock(_component_Divider, {
                    key: 1,
                    class: "my-1.5 w-4/5 opacity-30"
                  }))
                ], 64);
              }), 256))
            ])
          ])
        ]),
        unref(collapseMenuItem) && !__props.hideCollapse ? (openBlock(), createElementBlock("div", _hoisted_5$5, [
          createVNode(_component_Button, {
            class: normalizeClass(["h-10", unref(isDesktopMenuCollapsed) ? "pl-2 pr-2" : "pl-2 pr-3"]),
            label: label.value,
            severity: "secondary",
            rounded: "",
            text: "",
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => {
              unref(collapseMenuItem).onClick?.();
              _ctx.$emit("close");
            }, ["prevent", "stop"]))
          }, {
            icon: withCtx(() => [
              !unref(isDesktopMenuCollapsed) ? (openBlock(), createBlock(IconChevronLeft, {
                key: 0,
                class: "w-6"
              })) : (openBlock(), createBlock(IconChevronRight, {
                key: 1,
                class: "w-6"
              }))
            ]),
            _: 1
          }, 8, ["class", "label"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

const _hoisted_1$l = { class: "relative w-14 h-full flex flex-col et-js-is" };
const _hoisted_2$c = { class: "relative w-full h-full pt-2 flex flex-col et-js-is" };
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "MenuDesktopCompact",
  props: {
    fullWidth: { type: Boolean, required: false, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const $t = useTranslation().t;
    const { gotoHome, gotoPage } = useNavigation();
    const {
      mainMenuItemList} = useMainMenu($t);
    const route = useRoute();
    const isOpen = ref(false);
    const doOpenMenu = () => {
      isOpen.value = true;
    };
    const doCloseMenu = () => {
      isOpen.value = false;
    };
    watch(mainMenuItemList, () => {
      const currentRoute = route.name;
      if (!mainMenuItemList.some((i) => i.routeName === currentRoute)) {
        gotoHome();
      }
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Divider = resolveComponent("Divider");
      return openBlock(), createElementBlock("div", _hoisted_1$l, [
        createBaseVNode("div", _hoisted_2$c, [
          createBaseVNode("div", {
            class: normalizeClass(["absolute max-w-64 max-h-[calc(100%-0.5rem)] px-2 pt-4 pb-2 rounded-xl z-100 bg-bg-1 border-1 border-border-1 overflow-x-hidden transition-all duration-300 flex flex-col et-gap-xs et-jb-is et-scrollbar", isOpen.value ? "w-120 delay-200 shadow-modal-left overflow-y-auto" : "w-14 shadow-sm overflow-hidden"]),
            onMouseenter: doOpenMenu,
            onMouseleave: doCloseMenu
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(mainMenuItemList), (item) => {
              return openBlock(), createElementBlock(Fragment, null, [
                !item.isDivider ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  class: "w-full h-8 et-js whitespace-nowrap px-2 py-1 mb-2",
                  label: isOpen.value ? item.label : "",
                  disabled: item.disabled,
                  severity: item.routeName === unref(route).name ? "primary" : "secondary",
                  size: "large",
                  text: "",
                  onClick: withModifiers(($event) => {
                    item.onClick?.() ?? unref(gotoPage)(item.routeName ?? "PageAccountOverview");
                    _ctx.$emit("close");
                  }, ["prevent", "stop"])
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "size-5 shrink-0 mr-2" })),
                    createBaseVNode("div", {
                      class: normalizeClass(["text-start transition-opacity duration-300", isOpen.value ? "opacity-100 delay-200" : "opacity-0"])
                    }, toDisplayString(item.label), 3)
                  ]),
                  _: 2
                }, 1032, ["label", "disabled", "severity", "onClick"])) : (openBlock(), createBlock(_component_Divider, {
                  key: 1,
                  class: "mt-1 mb-4"
                }))
              ], 64);
            }), 256)),
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "w-full grow" }, null, -1)),
            createBaseVNode("div", null, [
              createVNode(_sfc_main$z, {
                compact: "",
                "show-text": isOpen.value
              }, null, 8, ["show-text"])
            ])
          ], 34)
        ])
      ]);
    };
  }
});

const _hoisted_1$k = { class: "h-full flex flex-col et-jc-ie et-text-sm text-txt-reduced" };
const _hoisted_2$b = { class: "cap-first" };
const _hoisted_3$8 = { key: 0 };
const _hoisted_4$7 = { key: 1 };
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "EpochValueBlock",
  setup(__props) {
    const $t = useTranslation().t;
    const { isProMode } = useAppMode();
    const { isSmallerThanSM } = useScreenSize();
    const {
      slotInEpoch,
      remainingTimeShort
    } = useChainProgress();
    return (_ctx, _cache) => {
      const _directive_tooltip = resolveDirective("tooltip");
      return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$k, [
        createBaseVNode("div", _hoisted_2$b, toDisplayString(unref($t)("ui-header:epochBlock.epoch")) + ": " + toDisplayString(unref(chainTip).epochNo), 1),
        unref(isProMode) && !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_3$8, toDisplayString(unref(slotInEpoch)) + "/" + toDisplayString(unref(chainTip).epochSlots), 1)) : createCommentVNode("", true),
        !unref(isProMode) && !unref(isSmallerThanSM) ? (openBlock(), createElementBlock("div", _hoisted_4$7, toDisplayString(unref($t)("ui-header:epochBlock.remaining")), 1)) : createCommentVNode("", true),
        createBaseVNode("div", null, toDisplayString(unref(remainingTimeShort)), 1)
      ])), [
        [
          _directive_tooltip,
          unref($t)("ui-header:epochBlock.tooltip"),
          void 0,
          { bottom: true }
        ]
      ]);
    };
  }
});

const _hoisted_1$j = { class: "h-full flex flex-col et-js-is et-gap-sme pt-2" };
const _hoisted_2$a = { class: "relative w-full grow flex flex-col et-gap-sm overflow-hidden" };
const _hoisted_3$7 = { class: "shrink-0 w-full pr-3 flex flex-row" };
const _hoisted_4$6 = { class: "basis-1/2 pr-1" };
const _hoisted_5$4 = { class: "basis-1/2 pl-1" };
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "MenuWalletList",
  setup(__props) {
    const { openModalAddWallet } = useModalAddWallet();
    const isManageMode = ref(false);
    const isSelectMode = ref(false);
    const isLocalMode = ref(false);
    const uwl = useWalletList(isManageMode, isSelectMode, isLocalMode);
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1$j, [
        createBaseVNode("div", _hoisted_2$a, [
          createVNode(_sfc_main$A, { "wallet-list": unref(uwl) }, null, 8, ["wallet-list"])
        ]),
        createBaseVNode("div", _hoisted_3$7, [
          createBaseVNode("div", _hoisted_4$6, [
            createVNode(_component_Button, {
              class: "w-full px-2",
              label: _ctx.$t("selectAccount:button.addWallet"),
              size: "small",
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: _cache[0] || (_cache[0] = ($event) => unref(openModalAddWallet)())
            }, null, 8, ["label"])
          ]),
          createBaseVNode("div", _hoisted_5$4, [
            createVNode(_component_Button, {
              class: "w-full px-2",
              label: _ctx.$t("common:manage"),
              size: "small",
              severity: isManageMode.value ? "" : "secondary",
              rounded: "",
              outlined: "",
              onClick: _cache[1] || (_cache[1] = withModifiers(($event) => isManageMode.value = !isManageMode.value, ["stop", "prevent"]))
            }, null, 8, ["label", "severity"])
          ])
        ])
      ]);
    };
  }
});

function useDragScroll(elRef, options = {}) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    isDown = true;
    elRef.value?.classList.add("dragging");
    startX = e.pageX - (elRef.value?.offsetLeft ?? 0);
    scrollLeft = elRef.value?.scrollLeft ?? 0;
  };
  const onMouseLeave = () => {
    isDown = false;
    elRef.value?.classList.remove("dragging");
  };
  const onMouseUp = () => {
    isDown = false;
    elRef.value?.classList.remove("dragging");
  };
  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (elRef.value?.offsetLeft ?? 0);
    const walk = (x - startX) * (options.sensitivity ?? 1);
    if (elRef.value) {
      elRef.value.scrollLeft = scrollLeft - walk;
    }
  };
  onMounted(() => {
    const el = elRef.value;
    if (!el) return;
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);
  });
  onUnmounted(() => {
    const el = elRef.value;
    if (!el) return;
    el.removeEventListener("mousedown", onMouseDown);
    el.removeEventListener("mouseleave", onMouseLeave);
    el.removeEventListener("mouseup", onMouseUp);
    el.removeEventListener("mousemove", onMouseMove);
  });
}

const _hoisted_1$i = { class: "relative grow w-full flex flex-row et-gap-sm et-jc-ic truncate" };
const _hoisted_2$9 = { class: "relative grow shrink-0 basis-1/3 flex flex-col et-jc-is text-xs font-semibold text-white truncate pl-1" };
const _hoisted_3$6 = {
  key: 0,
  class: "flex"
};
const _hoisted_4$5 = { class: "et-text-2xs mt-0.5" };
const _hoisted_5$3 = {
  key: 1,
  class: "text-left break-all"
};
const _hoisted_6$2 = { class: "et-text-2xs" };
const _hoisted_7$2 = {
  key: 2,
  class: "text-left break-all"
};
const _hoisted_8$2 = { class: "et-text-2xs" };
const _hoisted_9$2 = { class: "h-4.5 flex flex-row et-jb-ic box-border text-xs font-semibold truncate" };
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "AccountListItemSmall",
  props: {
    walletId: { type: String, required: true },
    accountId: { type: String, required: true },
    showWalletName: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const _walletId = computed(() => props.walletId);
    const _accountId = computed(() => props.accountId);
    const {
      appAccount,
      walletSettings,
      accountSettings
    } = useWalletAccount(_walletId, _accountId);
    const { selectedAccountId } = useSelectedAccount();
    const {
      toggleFixedDappAccountId
    } = useDappAccount();
    const walletName = walletSettings.name;
    const isNameSet = accountSettings.isNameSet;
    const accountName = accountSettings.name;
    const accountNameShort = accountSettings.nameShort;
    const adaHandle = accountSettings.adaHandle;
    const { adaHandleName } = adaHandle;
    const isDappAccount = computed(() => appAccount.value?.isDappAccount ?? false);
    const isFixedAccount = computed(() => isDappAccount.value && fixedDappWalletId.value === _walletId.value && fixedDappAccountId.value === _accountId.value);
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return unref(appAccount) ? (openBlock(), createBlock(_component_Button, {
        key: 0,
        class: normalizeClass(["account-list-item relative shrink-0 grow min-w-36 flex flex-row et-js-ic pl-3 pr-1.5 py-1.5 bg-transparent rounded-full!", unref(appAccount).id === unref(selectedAccountId) ? "border-1 border-border-highlight" : "border border-surface-850"]),
        style: { "background-image": "none" },
        rounded: ""
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(["absolute inset-0 pointer-events-none", unref(appAccount).id === unref(selectedAccountId) ? "et-bg-highlight opacity-40" : "bg-surface-950/40"])
          }, null, 2),
          createBaseVNode("div", _hoisted_1$i, [
            createBaseVNode("div", _hoisted_2$9, [
              unref(adaHandleName) ? (openBlock(), createElementBlock("div", _hoisted_3$6, [
                createVNode(_sfc_main$B, {
                  class: "grow-0! font-medium!",
                  "ada-handle-name": unref(adaHandleName),
                  size: "tiny"
                }, null, 8, ["ada-handle-name"]),
                createBaseVNode("span", _hoisted_4$5, " (" + toDisplayString(unref(accountNameShort)) + ")", 1)
              ])) : unref(isNameSet) ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
                createTextVNode(toDisplayString(unref(accountName)), 1),
                createBaseVNode("span", _hoisted_6$2, " (" + toDisplayString(unref(accountNameShort)) + ")", 1)
              ])) : (openBlock(), createElementBlock("div", _hoisted_7$2, [
                createTextVNode(toDisplayString(unref(walletName)), 1),
                createBaseVNode("span", _hoisted_8$2, " (" + toDisplayString(unref(accountNameShort)) + ")", 1)
              ])),
              createBaseVNode("div", _hoisted_9$2, [
                createVNode(_sfc_main$C, {
                  class: "truncate",
                  amount: unref(appAccount).data.balance.total,
                  "display-decimals": 0,
                  "clipboard-enabled": false
                }, null, 8, ["amount"])
              ])
            ]),
            createVNode(_component_Button, {
              class: "relative shrink-0 w-9 h-9 p-0 bg-transparent!",
              rounded: "",
              text: "",
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(toggleFixedDappAccountId)(unref(appAccount).walletId, unref(appAccount).id), ["stop", "prevent"]))
            }, {
              default: withCtx(() => [
                isDappAccount.value && isFixedAccount.value ? (openBlock(), createBlock(IconDApp, {
                  key: 0,
                  class: "stroke-0 text-txt-blue"
                })) : isDappAccount.value ? (openBlock(), createBlock(IconDApp, {
                  key: 1,
                  class: "stroke-0 text-txt-green"
                })) : (openBlock(), createBlock(IconDApp, {
                  key: 2,
                  class: "stroke-0 text-txt-muted"
                }))
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["class"])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$h = {
  key: 0,
  class: "w-12 flex flex-col et-jc-ic"
};
const _hoisted_2$8 = {
  key: 1,
  class: "w-12 flex flex-col et-jc-ic"
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "SelectFavoriteAccount",
  setup(__props) {
    const { contentWidth } = useScreenSize();
    const list = useTemplateRef("list");
    const canScroll = ref(false);
    const { arrivedState } = useScroll(list);
    const { showBlurBgs } = useHomeSettings();
    const { left, right } = toRefs(arrivedState);
    useDragScroll(list, { sensitivity: 1 });
    const { switchWalletAccount } = useSelectedAccount();
    const accountIdList = computed(() => favoriteAccountIdList.value);
    const onActivateAccount = (walletId, accountId) => {
      if (accountId) {
        switchWalletAccount(walletId, accountId);
      }
    };
    const doScrollLeft = () => {
      list.value?.scrollBy({ left: -200, behavior: "smooth" });
    };
    const doScrollRight = () => {
      list.value?.scrollBy({ left: 200, behavior: "smooth" });
    };
    watch([list, accountIdList], () => {
      canScroll.value = (list.value?.scrollWidth ?? 0) > (list.value?.clientWidth ?? 0);
    }, { immediate: true, deep: true });
    watch(contentWidth, () => {
      canScroll.value = (list.value?.scrollWidth ?? 0) > (list.value?.clientWidth ?? 0);
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return accountIdList.value.length > 0 && unref(numAccountIds) > 1 ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([unref(showBlurBgs) ? "bg-bg-app/50 backdrop-blur-xs" : "bg-bg-app/90", "relative flex flex-row et-gap-sm et-js-ic mx-2 pl-2 pr-2 pt-2 pb-2 rounded-full border border-surface-850 overflow-hidden pointer-events-auto"])
      }, [
        _cache[1] || (_cache[1] = createBaseVNode("div", { class: "absolute inset-0 et-bg-content opacity-50 pointer-events-none" }, null, -1)),
        canScroll.value ? (openBlock(), createElementBlock("div", _hoisted_1$h, [
          createVNode(_component_Button, {
            class: "px-1 py-3",
            disabled: unref(left),
            severity: "secondary",
            text: "",
            onClick: withModifiers(doScrollLeft, ["stop", "prevent"])
          }, {
            default: withCtx(() => [
              createVNode(IconChevronLeft, { class: "size-4" })
            ]),
            _: 1
          }, 8, ["disabled"])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "list",
          ref: list,
          class: "grow shrink flex et-gap-sm overflow-auto"
        }, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "absolute left-0 top-0 bg-green-500/50 pointer-events-none" }, null, -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(accountIdList.value, (obj) => {
            return openBlock(), createBlock(_sfc_main$m, {
              "account-id": obj.accountId,
              "wallet-id": obj.walletId,
              "show-wallet-name": false,
              onClick: ($event) => onActivateAccount(obj.walletId, obj.accountId)
            }, null, 8, ["account-id", "wallet-id", "onClick"]);
          }), 256))
        ], 512),
        canScroll.value ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
          createVNode(_component_Button, {
            class: "px-1 py-3",
            disabled: unref(right),
            severity: "secondary",
            text: "",
            onClick: withModifiers(doScrollRight, ["stop", "prevent"])
          }, {
            default: withCtx(() => [
              createVNode(IconChevronRight, { class: "size-4" })
            ]),
            _: 1
          }, 8, ["disabled"])
        ])) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true);
    };
  }
});

const _sfc_main$k = {  };

const _hoisted_1$g = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  fill: "none"
};

function _sfc_render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$g, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconMoon02 = /*#__PURE__*/_export_sfc(_sfc_main$k, [['render',_sfc_render$5]]);

const _sfc_main$j = {  };

const _hoisted_1$f = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  fill: "none"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$f, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1)
  ]))]))
}
const IconSun03 = /*#__PURE__*/_export_sfc(_sfc_main$j, [['render',_sfc_render$4]]);

const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "ButtonDarkMode",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      isDarkMode,
      toggleDarkMode
    } = useDarkMode();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return withDirectives((openBlock(), createBlock(_component_Button, {
        class: "p-1",
        rounded: "",
        link: "",
        onClick: unref(toggleDarkMode)
      }, {
        default: withCtx(() => [
          unref(isDarkMode) ? (openBlock(), createBlock(IconMoon02, {
            key: 0,
            class: "icon-size-header"
          })) : (openBlock(), createBlock(IconSun03, {
            key: 1,
            class: "icon-size-header"
          }))
        ]),
        _: 1
      }, 8, ["onClick"])), [
        [
          _directive_tooltip,
          unref($t)("ui-header:darkMode.tooltip"),
          void 0,
          { bottom: true }
        ]
      ]);
    };
  }
});

const _hoisted_1$e = { class: "grow w-full flex flex-row et-jc-ic overflow-hidden" };
const _hoisted_2$7 = {
  key: 0,
  class: "main-layout-menu-right relative shrink w-full min-h-72 mt-29 mb-2 et-max-width-walletlist"
};
const _hoisted_3$5 = {
  key: 0,
  class: "relative w-full h-full flex flex-row et-gap-mde pb-2"
};
const _hoisted_4$4 = { class: "relative w-17" };
const _hoisted_5$2 = { class: "relative w-full overflow-hidden" };
const _hoisted_6$1 = {
  key: 1,
  class: "main-layout-menu-right relative shrink w-full min-h-72 mt-31 mb-1 et-max-width-menu flex flex-col et-gap-sm"
};
const _hoisted_7$1 = { class: "relative w-full grow overflow-hidden" };
const _hoisted_8$1 = { class: "relative shrink-0 w-full overflow-hidden" };
const _hoisted_9$1 = { class: "main-layout-content relative grow w-full flex flex-col overflow-x-hidden overflow-y-hidden" };
const _hoisted_10$1 = { class: "relative h-full flex flex-col scroll-anchor mr-1 sm:mr-2 lg:mr-0 pr-0 sm:pr-1 pt-5 sm:pt-5 lg:pt-7 overflow-x-hidden overflow-y-scroll content-scroll et-scrollbar" };
const _hoisted_11$1 = { class: "w-full flex" };
const _hoisted_12$1 = { class: "w-full et-max-width-layout-content" };
const _hoisted_13$1 = { class: "w-full flex et-jc" };
const _hoisted_14$1 = { class: "w-full et-max-width-layout-content pl-1 pr-4 flex flex-row et-jc-ic" };
const _hoisted_15 = {
  key: 0,
  class: "main-layout-menu-top shrink-0 w-full"
};
const _hoisted_16 = { class: "main-layout-header w-full flex flex-row et-jc-is" };
const _hoisted_17 = { class: "shrink-0 grow h-full flex flex-row et-jb-ic et-gap-sm pl-1" };
const _hoisted_18 = {
  key: 0,
  class: "main-layout-header-center shrink-0 grow h-full flex flex-row et-js-ic"
};
const _hoisted_19 = {
  key: 1,
  class: "main-layout-header-right shrink-0 h-full flex flex-row et-js-ic et-gap-xs sm:et-gap-sm"
};
const _hoisted_20 = { class: "main-layout-progress-bar w-full" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "LayoutMain",
  setup(__props) {
    const router = useRouter();
    const slots = useSlots();
    const {
      isSmallerThanLG,
      showNarrowTxViewer,
      showWideTxViewer,
      isTweeningOut
    } = useScreenSize();
    const {
      isDesktopMenuCollapsed
    } = useDesktopMenuCollapsed();
    const { hasWallets } = useAppWalletIdList();
    const { showWalletListMenu } = useWalletListMenu();
    const showBlurBgs = useLocalStorage("showBlurBgs", true, { listenToStorageChanges: true });
    const hasSlotHeaderCenter = computed(() => slots.hasOwnProperty("header-center"));
    const hasSlotHeaderRight = computed(() => slots.hasOwnProperty("header-right"));
    const hasSlotMenuTop = computed(() => slots.hasOwnProperty("menu-top"));
    const hasSlotMenuRight = computed(() => slots.hasOwnProperty("menu-right"));
    const gotoHome = () => {
      router.push({ name: "PageAccountOverview" });
    };
    const hasFavoriteAccounts = computed(() => !isSmallerThanLG.value && slots.hasOwnProperty("favorite-accounts") && favoriteAccountIdList.value.length > 0 && numAccountIds.value > 1);
    const content = ref(null);
    const { width, height } = useElementSize(content);
    useScreenSize(void 0, width, height);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["main-layout relative shrink h-full max-h-full flex flex-col et-js-ic transition-all delay-0!", (unref(showNarrowTxViewer) && !unref(isTweeningOut) ? "et-max-width-layout-show-narrow-tx" : unref(showWideTxViewer) && !unref(isTweeningOut) ? "et-max-width-layout-show-wide-tx" : "w-full") + " "])
      }, [
        createBaseVNode("div", _hoisted_1$e, [
          createBaseVNode("div", {
            class: normalizeClass(["main-layout-page relative shrink-0 w-full h-full pl-3 xs:pl-3 sm:pl-5 lg:pl-6 lg:pr-2 transition-all flex flex-col lg:flex lg:flex-row gap-x-4 sm:gap-x-6 et-max-width-global", unref(showWalletListMenu) ? "lg:gap-x-6" : "lg:gap-x-6"])
          }, [
            !unref(isSmallerThanLG) && hasSlotMenuRight.value && unref(showWalletListMenu) ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
              unref(hasWallets) ? (openBlock(), createElementBlock("div", _hoisted_3$5, [
                createBaseVNode("div", _hoisted_4$4, [
                  renderSlot(_ctx.$slots, "menu-right", {}, void 0, true)
                ]),
                createBaseVNode("div", _hoisted_5$2, [
                  renderSlot(_ctx.$slots, "menu-right-edge", {}, void 0, true)
                ])
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            !unref(isSmallerThanLG) && hasSlotMenuRight.value && !unref(showWalletListMenu) ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
              createBaseVNode("div", _hoisted_7$1, [
                renderSlot(_ctx.$slots, "menu-right", {}, void 0, true)
              ]),
              createBaseVNode("div", _hoisted_8$1, [
                renderSlot(_ctx.$slots, "menu-right-bottom", {}, void 0, true)
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_9$1, [
              createBaseVNode("main", _hoisted_10$1, [
                createBaseVNode("div", {
                  ref_key: "content",
                  ref: content,
                  class: normalizeClass(["pb-24 lg:pb-4 pt-16 sm:pt-24 pl-1 pr-1", hasFavoriteAccounts.value ? "mb-19" : ""])
                }, [
                  createBaseVNode("div", _hoisted_11$1, [
                    createBaseVNode("div", _hoisted_12$1, [
                      renderSlot(_ctx.$slots, "content", {}, void 0, true)
                    ])
                  ])
                ], 2)
              ]),
              !unref(isSmallerThanLG) && _ctx.$slots["favorite-accounts"] ? (openBlock(), createElementBlock("div", {
                key: 0,
                id: "favorite-accounts",
                class: normalizeClass(["main-layout-menu absolute inset-x-0 shrink-0 pointer-events-none", unref(isSmallerThanLG) ? "bottom-20" : "bottom-4"])
              }, [
                createBaseVNode("div", _hoisted_13$1, [
                  createBaseVNode("div", _hoisted_14$1, [
                    renderSlot(_ctx.$slots, "favorite-accounts", {}, void 0, true)
                  ])
                ])
              ], 2)) : createCommentVNode("", true)
            ]),
            unref(isSmallerThanLG) ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass(["main-layout-menu absolute left-0 right-0 bottom-0 shrink-0 lg:grow-0 w-full lg:h-full flex flex-col et-jb et-gap-lg et-bottom-menu pt-0 lg:pt-8 transition-all", unref(isDesktopMenuCollapsed) ? "lg:max-w-16" : ""])
            }, [
              hasSlotMenuTop.value ? (openBlock(), createElementBlock("div", _hoisted_15, [
                renderSlot(_ctx.$slots, "menu-top", {}, void 0, true)
              ])) : createCommentVNode("", true)
            ], 2)) : createCommentVNode("", true)
          ], 2)
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["absolute top-0 left-0 right-0 flex flex-col et-js-is", unref(showBlurBgs) ? "bg-black/20 backdrop-blur-modal" : "bg-black"])
        }, [
          createBaseVNode("header", _hoisted_16, [
            createBaseVNode("div", {
              class: normalizeClass(["main-layout-header-left flex flex-row et-jb-ic w-full et-header et-header-p gap-x-4 sm:gap-x-6 et-max-width-global", unref(isDesktopMenuCollapsed) ? "lg:gap-x-6" : "lg:gap-x-10"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["relative shrink-0 grow-0 flex flex-col et-jc-is et-gap-xs lg:w-full lg:grow h-full", unref(isDesktopMenuCollapsed) ? "max-w-16" : "lg:et-max-width-menu"])
              }, [
                createVNode(_sfc_main$D, { onClick: gotoHome })
              ], 2),
              createBaseVNode("div", _hoisted_17, [
                hasSlotHeaderCenter.value ? (openBlock(), createElementBlock("div", _hoisted_18, [
                  renderSlot(_ctx.$slots, "header-center", {}, void 0, true)
                ])) : createCommentVNode("", true),
                hasSlotHeaderRight.value ? (openBlock(), createElementBlock("div", _hoisted_19, [
                  renderSlot(_ctx.$slots, "header-right", {}, void 0, true)
                ])) : createCommentVNode("", true)
              ])
            ], 2)
          ]),
          createBaseVNode("div", _hoisted_20, [
            renderSlot(_ctx.$slots, "progress-bar", {}, void 0, true)
          ])
        ], 2),
        renderSlot(_ctx.$slots, "bottom-bar", {}, void 0, true)
      ], 2);
    };
  }
});

const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-8abd37e1"]]);

const _hoisted_1$d = { class: "w-full flex flex-row et-bg-2 rounded-xl mb-2 overflow-hidden shadow-2xl pointer-events-auto" };
const _hoisted_2$6 = { class: "flex flex-col et-jc-ic p-2" };
const _hoisted_3$4 = { class: "grow relative flex flex-row px-4 py-2 pr-8 et-bg-1" };
const _hoisted_4$3 = { class: "break-all et-text-sm" };
const _hoisted_5$1 = { class: "et-text-xs text-txt-muted" };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "ToastCopy",
  setup(__props) {
    const { dismiss } = useNotifications();
    const $t = useTranslation().t;
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Toast = resolveComponent("Toast");
      return openBlock(), createBlock(_component_Toast, {
        class: "pt-safe pointer-events-none",
        group: "copied",
        position: "top-center"
      }, {
        container: withCtx(({ message, closeCallback }) => [
          createBaseVNode("div", _hoisted_1$d, [
            createBaseVNode("div", _hoisted_2$6, [
              createVNode(IconCopy01, { class: "size-5" })
            ]),
            createBaseVNode("div", _hoisted_3$4, [
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_4$3, toDisplayString(message.summary), 1),
                createBaseVNode("div", _hoisted_5$1, toDisplayString(unref($t)("notification:copy")), 1)
              ]),
              createVNode(_component_Button, {
                unstyled: "",
                class: "cursor-pointer",
                onClick: ($event) => unref(dismiss)(message)
              }, {
                default: withCtx(() => [
                  createVNode(IconCancel01, { class: "absolute right-2 top-2 size-4 text-txt-muted" })
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});

const _sfc_main$f = {  };

const _hoisted_1$c = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$c, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M10.5 22V22C10.1049 22 9.75733 21.7388 9.64743 21.3593L8.91858 18.8421L7.44089 18.0134L4.88868 18.6449C4.46082 18.7508 4.01409 18.564 3.78888 18.1851L2.42463 15.8899C2.17882 15.4764 2.26231 14.9464 2.62337 14.6285L4.41294 13.0526V10.9474L2.62281 9.37147C2.26167 9.05356 2.17813 8.52353 2.42396 8.10993L3.78816 5.81484C4.01337 5.43595 4.46009 5.2492 4.88796 5.35506L7.44016 5.98656L9 5L9.77208 2.68377C9.90819 2.27543 10.2903 2 10.7208 2H13.2792C13.7097 2 14.0918 2.27543 14.2279 2.68377L15 5L16.5598 5.98656L19.112 5.35506C19.5399 5.2492 19.9866 5.43595 20.2118 5.81484L21.6019 8.15339C21.836 8.54721 21.7725 9.04974 21.4478 9.37298L20.8208 9.99726M14.5 9.55051C13.8647 8.90223 12.9793 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 12.9793 8.90223 13.8647 9.55051 14.5",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M17 14.998V16.998M17.009 18.998H17M22 16.998C22 19.7594 19.7614 21.998 17 21.998C14.2386 21.998 12 19.7594 12 16.998C12 14.2366 14.2386 11.998 17 11.998C19.7614 11.998 22 14.2366 22 16.998Z",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5"
    }, null, -1)
  ]))]))
}
const IconError01 = /*#__PURE__*/_export_sfc(_sfc_main$f, [['render',_sfc_render$3]]);

const _hoisted_1$b = { class: "flex flex-col et-jc-ic p-2" };
const _hoisted_2$5 = { class: "grow relative flex flex-row et-ic px-4 py-2 pr-8 bg-black/20" };
const _hoisted_3$3 = { class: "break-all et-text-sm" };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "ToastNotification",
  setup(__props) {
    const { dismiss } = useNotifications();
    const getToastType = (type) => {
      if (type === "success") return "bg-bg-positive text-txt-positive ";
      if (type === "warn") return "bg-bg-warning text-txt-warning ";
      if (type === "error") return "bg-bg-negative text-txt-negative ";
      if (type === "info") return "bg-bg-info text-txt-info ";
      return "";
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Toast = resolveComponent("Toast");
      return openBlock(), createBlock(_component_Toast, {
        class: "pt-safe pointer-events-none",
        group: "toasts",
        position: "top-center",
        unstyled: ""
      }, {
        container: withCtx(({ message, closeCallback }) => [
          createBaseVNode("div", {
            class: normalizeClass(["min-w-20 flex flex-row rounded-xl mb-2 overflow-hidden shadow-2xl -translate-x-1/2 pointer-events-auto", getToastType(message.type)])
          }, [
            createBaseVNode("div", _hoisted_1$b, [
              message.type === "success" ? (openBlock(), createBlock(IconCheckmarkCircle04, {
                key: 0,
                class: "size-5"
              })) : message.type === "warn" ? (openBlock(), createBlock(IconWarning, {
                key: 1,
                class: "size-5"
              })) : message.type === "info" ? (openBlock(), createBlock(IconInfo, {
                key: 2,
                class: "size-5"
              })) : message.type === "error" ? (openBlock(), createBlock(IconError01, {
                key: 3,
                class: "size-5"
              })) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_2$5, [
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_3$3, toDisplayString(message.summary), 1)
              ]),
              createVNode(_component_Button, {
                unstyled: "",
                class: "cursor-pointer",
                onClick: ($event) => unref(dismiss)(message)
              }, {
                default: withCtx(() => [
                  createVNode(IconCancel01, { class: "absolute right-2 top-2 size-4" })
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ], 2)
        ]),
        _: 1
      });
    };
  }
});

const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "ToastLayer",
  setup(__props) {
    useNotifications();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$e),
        createVNode(_sfc_main$g)
      ], 64);
    };
  }
});

const ToastLayer = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-61f7fde3"]]);

const _hoisted_1$a = {
  key: 0,
  class: "w-full flex flex-col"
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "BottomBar",
  setup(__props) {
    const {
      bottomBarComponent,
      bottomBarComponentProps
    } = useBottomBar();
    return (_ctx, _cache) => {
      return unref(bottomBarComponent) ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
        (openBlock(), createBlock(resolveDynamicComponent(unref(bottomBarComponent)), normalizeProps(guardReactiveProps(unref(bottomBarComponentProps))), null, 16))
      ])) : createCommentVNode("", true);
    };
  }
});

const _sfc_main$b = {  };

const _hoisted_1$9 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$9, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "m15.75 15l-6-6m0 6l6-6m7 3c0-5.523-4.477-10-10-10s-10 4.477-10 10s4.477 10 10 10s10-4.477 10-10",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconCancelCircle = /*#__PURE__*/_export_sfc(_sfc_main$b, [['render',_sfc_render$2]]);

const _hoisted_1$8 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "NotificationTypeBadge",
  props: {
    type: { type: String, required: true },
    label: { type: String, required: true, default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        __props.type === "txMS" ? (openBlock(), createBlock(MultiSigGradient, {
          key: 0,
          class: "shrink-0 size-6"
        })) : createCommentVNode("", true),
        createBaseVNode("span", null, toDisplayString(__props.label), 1)
      ]);
    };
  }
});

const _sfc_main$9 = {  };

const _hoisted_1$7 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$7, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M13 22H6.59c-1.545 0-2.774-.752-3.877-1.803c-2.26-2.153 1.45-3.873 2.865-4.715a10.67 10.67 0 0 1 7.922-1.187m3-7.795a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.45 9.55l4.9 4.9M22 18.5a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconUserBlock = /*#__PURE__*/_export_sfc(_sfc_main$9, [['render',_sfc_render$1]]);

const _sfc_main$8 = {  };

const _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      color: "currentColor"
    }, [
      createBaseVNode("path", { d: "M14 18s1 0 2 2c0 0 3.177-5 6-6" }),
      createBaseVNode("path", { d: "M13 22H6.59c-1.545 0-2.774-.752-3.877-1.803c-2.26-2.153 1.45-3.873 2.865-4.715c3.178-1.893 7.175-1.972 10.422-.239m.5-8.743a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0" })
    ], -1)
  ]))]))
}
const IconUserCheck = /*#__PURE__*/_export_sfc(_sfc_main$8, [['render',_sfc_render]]);

const _hoisted_1$5 = { class: "px-4 py-2 flex flex-row et-gap-sme et-jc-ic" };
const _hoisted_2$4 = { class: "flex flex-row flex-nowrap" };
const _hoisted_3$2 = { class: "" };
const _hoisted_4$2 = { class: "px-1" };
const _hoisted_5 = { class: "" };
const _hoisted_6 = { class: "w-full flex flex-wrap et-jb-ic et-gap-sm" };
const _hoisted_7 = { key: 0 };
const _hoisted_8 = {
  key: 0,
  class: "w-full flex flex-wrap et-js-ic et-gap-sm et-text-sm text-txt-muted"
};
const _hoisted_9 = { class: "w-full flex flex-row flex-nowrap et-gap-sm" };
const _hoisted_10 = { class: "flex flex-row flex-nowrap et-gap-sm" };
const _hoisted_11 = { class: "flex flex-row flex-nowrap et-jb-ic et-gap-sm" };
const _hoisted_12 = { class: "flex flex-col" };
const _hoisted_13 = { class: "flex flex-row flex-nowrap et-gap-sm" };
const _hoisted_14 = { class: "ml-0.5" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "MultiSigScript",
  props: {
    scriptCred: { type: Object, required: true },
    script: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const { isSmallerThanSM } = useScreenSize();
    const { formatTimeAndDate } = useFormatter();
    const multiSigScriptPopover = ref();
    const meta = ref(null);
    const badges = ref([]);
    const scriptNodes = ref([]);
    const expandedKeys = ref({});
    let cnt = 0;
    const onMultiSigScriptClick = (event) => {
      multiSigScriptPopover.value.toggle(event);
      if (scriptNodes.value.length === 0) {
        processNativeScript();
      }
    };
    const processNativeScript = () => {
      if (!props.script) {
        return;
      }
      const scriptHex = getHexFromNativeScriptJSON(props.script);
      const appAccount = getIAppAccountByScript(scriptHex);
      const _meta = appAccount?.data.account.scriptMeta;
      if (appAccount) {
        const type = appAccount.data.account.paymentScript === scriptHex ? "payment" : "stake";
        badges.value.push({
          id: type,
          label: $t(`badge:${type}.label`),
          hover: $t(`badge:${type}.hover`),
          noCapitalize: true,
          ...getBadgeConfig("script")
        });
      }
      if (_meta) {
        meta.value = _meta;
      }
      scriptNodes.value = generateTreeNodeList([props.script], meta.value);
    };
    const generateTreeNodeList = (nsList, _meta) => {
      const _tree = [];
      for (const item of nsList) {
        const key = (cnt++).toString();
        expandedKeys.value[key] = true;
        if (item.hasOwnProperty("ScriptPubkey")) {
          const _item = item;
          const keyHash = _item.ScriptPubkey.addr_keyhash;
          const participant = _meta?.participants?.[keyHash];
          _tree.push({
            key,
            label: joinMetaDataValue(participant?.name),
            type: "participant",
            data: {
              valid: props.scriptCred.signed.includes(keyHash),
              keyHash,
              participant
            }
          });
        } else if (item.hasOwnProperty("TimelockStart")) {
          const _item = item;
          const slot = parseInt(_item.TimelockStart.slot);
          const ts = getTimestampFromSlot(networkId.value, slot);
          _tree.push({
            key,
            label: "Timelock Start",
            type: "timelock",
            data: {
              valid: slot >= getCalculatedChainTip(networkId.value),
              ts
            }
          });
        } else if (item.hasOwnProperty("TimelockExpiry")) {
          const _item = item;
          const slot = parseInt(_item.TimelockExpiry.slot);
          const ts = getTimestampFromSlot(networkId.value, slot);
          _tree.push({
            key,
            label: "Timelock Expiry",
            type: "timelock",
            data: {
              valid: slot < getCalculatedChainTip(networkId.value),
              ts
            }
          });
        } else if (item.hasOwnProperty("ScriptAll")) {
          const _item = item;
          const node = {
            key,
            label: "All required to confirm",
            type: "script",
            children: generateTreeNodeList(_item.ScriptAll.native_scripts, _meta)
          };
          node.data = {
            valid: node.children.every((child) => child.data.valid),
            partial: node.children.some((child) => child.data.valid)
          };
          _tree.push(node);
        } else if (item.hasOwnProperty("ScriptAny")) {
          const _item = item;
          const node = {
            key,
            label: "Any can confirm",
            type: "script",
            children: generateTreeNodeList(_item.ScriptAny.native_scripts, _meta)
          };
          node.data = {
            valid: node.children.some((child) => child.data.valid),
            partial: false
          };
          _tree.push(node);
        } else if (item.hasOwnProperty("ScriptNOfK")) {
          const _item = item;
          const n = _item.ScriptNOfK.n;
          const k = _item.ScriptNOfK.native_scripts.length;
          const node = {
            key,
            label: `${n} of ${k} confirmations required`,
            type: "script",
            children: generateTreeNodeList(_item.ScriptNOfK.native_scripts, _meta)
          };
          const numValid = node.children.reduce((acc, curr) => curr.data.valid ? acc + 1 : acc, 0);
          node.data = {
            valid: numValid === n,
            partial: numValid > 0
          };
          _tree.push(node);
        }
      }
      return _tree;
    };
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Tree = resolveComponent("Tree");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Card, {
          class: "cursor-pointer",
          pt: {
            root: "overflow-hidden",
            body: "p-0",
            content: "p-0"
          },
          onClick: withModifiers(onMultiSigScriptClick, ["stop", "prevent"])
        }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_1$5, [
              createVNode(IconUserGroup, { class: "shrink-0 size-6" }),
              createBaseVNode("div", _hoisted_2$4, [
                createBaseVNode("span", _hoisted_3$2, toDisplayString(__props.scriptCred.signed.length), 1),
                createBaseVNode("span", _hoisted_4$2, toDisplayString(unref($t)("common:of")), 1),
                createBaseVNode("span", _hoisted_5, toDisplayString(__props.scriptCred.signed.length + __props.scriptCred.unsigned.length), 1)
              ])
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["w-full h-1", __props.scriptCred.scriptValid ? "bg-green" : "bg-yellow"])
            }, null, 2)
          ]),
          _: 1
        }),
        createVNode(_component_Popover, {
          ref_key: "multiSigScriptPopover",
          ref: multiSigScriptPopover,
          class: "rounded-2xl! bg-bg-app shadow-2xl",
          pt: {
            content: "p-6 flex flex-col et-gap-md et-js-is"
          },
          onClick: withModifiers(() => {
          }, ["stop", "prevent"])
        }, {
          default: withCtx(() => [
            createVNode(_component_Card, {
              class: "w-full min-w-105 shadow-sm",
              pt: {
                title: "flex flex-col et-jb-ic et-gap-sm",
                content: "flex flex-col et-jc-ic et-gap-md"
              },
              onClick: withModifiers(() => {
              }, ["stop", "prevent"])
            }, createSlots({
              content: withCtx(() => [
                scriptNodes.value.length > 0 ? (openBlock(), createBlock(_component_Tree, {
                  key: 0,
                  class: "w-full p-0",
                  value: scriptNodes.value,
                  "expanded-keys": expandedKeys.value,
                  pt: {
                    nodeContent: "w-full et-text-sm",
                    nodeLabel: "w-full et-text-sm"
                  }
                }, {
                  script: withCtx((slotProps) => [
                    createBaseVNode("div", _hoisted_9, [
                      slotProps.node.data.valid ? (openBlock(), createBlock(IconCheckmarkCircle04, {
                        key: 0,
                        class: "shrink-0 size-4 text-green"
                      })) : slotProps.node.data.partial ? (openBlock(), createBlock(IconCheckmarkCircle04, {
                        key: 1,
                        class: "shrink-0 size-4 text-yellow"
                      })) : (openBlock(), createBlock(IconCancelCircle, {
                        key: 2,
                        class: "shrink-0 size-4 text-red"
                      })),
                      createBaseVNode("span", null, toDisplayString(slotProps.node.label), 1)
                    ])
                  ]),
                  timelock: withCtx((slotProps) => [
                    createBaseVNode("div", _hoisted_10, [
                      createVNode(IconClock, {
                        class: normalizeClass(["shrink-0 size-4", slotProps.node.data.valid ? "text-txt-green" : "text-et-red"])
                      }, null, 8, ["class"]),
                      createBaseVNode("span", null, toDisplayString(unref(formatTimeAndDate)(slotProps.node.data.ts, false, true, true, unref(isSmallerThanSM))), 1)
                    ])
                  ]),
                  participant: withCtx((slotProps) => [
                    createBaseVNode("div", _hoisted_11, [
                      createBaseVNode("div", _hoisted_12, [
                        createBaseVNode("div", _hoisted_13, [
                          slotProps.node.data.valid ? (openBlock(), createBlock(IconUserCheck, {
                            key: 0,
                            class: "shrink-0 size-4 text-green"
                          })) : (openBlock(), createBlock(IconUserBlock, {
                            key: 1,
                            class: "shrink-0 size-4 text-red"
                          })),
                          createBaseVNode("span", null, toDisplayString(slotProps.node.label), 1)
                        ]),
                        createBaseVNode("div", null, [
                          createBaseVNode("span", null, toDisplayString(slotProps.node.data.keyHash.slice(0, 12)), 1),
                          _cache[0] || (_cache[0] = createBaseVNode("span", null, "...", -1)),
                          createBaseVNode("span", _hoisted_14, toDisplayString(slotProps.node.data.keyHash.slice(-12)), 1)
                        ])
                      ]),
                      createVNode(_sfc_main$E, {
                        class: "p-1",
                        "icon-size": "size-4",
                        "copy-text": slotProps.node.data.keyHash,
                        compact: ""
                      }, null, 8, ["copy-text"])
                    ])
                  ]),
                  _: 1
                }, 8, ["value", "expanded-keys"])) : createCommentVNode("", true)
              ]),
              _: 2
            }, [
              meta.value ? {
                name: "title",
                fn: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    meta.value?.name ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(meta.value.name), 1)) : createCommentVNode("", true),
                    badges.value.length > 0 ? (openBlock(), createBlock(_sfc_main$F, {
                      key: 1,
                      badges: badges.value,
                      size: "small"
                    }, null, 8, ["badges"])) : createCommentVNode("", true)
                  ]),
                  meta.value?.description ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString(meta.value.description), 1)) : createCommentVNode("", true)
                ]),
                key: "0"
              } : void 0
            ]), 1024)
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
});

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "NotificationEntity",
  props: {
    entity: { type: String, required: true }
  },
  emits: ["accountSelected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { switchWalletAccount } = useSelectedAccount$1();
    const appAccount = computed(() => getIAppAccountById(props.entity));
    const accountId = computed(() => appAccount.value?.id ?? null);
    const walletId = computed(() => appAccount.value?.walletId ?? null);
    const onAccountSelected = () => {
      if (!walletId.value || !accountId.value) {
        return;
      }
      switchWalletAccount(walletId.value, accountId.value);
      emit("accountSelected");
    };
    return (_ctx, _cache) => {
      return accountId.value && walletId.value ? (openBlock(), createBlock(_sfc_main$G, {
        key: 0,
        class: "grow",
        "wallet-id": walletId.value,
        "account-id": accountId.value,
        "hide-sign-state": "",
        onClick: withModifiers(onAccountSelected, ["prevent", "stop"])
      }, null, 8, ["wallet-id", "account-id"])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$4 = { class: "w-full flex flex-wrap" };
const _hoisted_2$3 = { class: "et-text-sm text-txt-muted" };
const _hoisted_3$1 = { class: "w-full flex flex-wrap et-jb-ic et-gap-md" };
const _hoisted_4$1 = { class: "flex flex-wrap et-gap-sm" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "MultiSigNotification",
  props: /* @__PURE__ */ mergeModels({
    creds: { type: null, required: true },
    tx: { type: null, required: true },
    entityList: { type: Array, required: true },
    signedList: { type: void 0, required: true },
    mustSign: { type: Boolean, required: false, default: false }
  }, {
    "notification": { type: Object, required: true },
    "notificationModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["action", "accountSelected"], ["update:notification"]),
  setup(__props, { emit: __emit }) {
    const notification = useModel(__props, "notification");
    const emit = __emit;
    const $t = useTranslation().t;
    const { formatTimeAndDate } = useFormatter();
    const { isSmallerThanXXS } = useScreenSize();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        __props.entityList.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.entityList, (entity) => {
          return openBlock(), createBlock(_sfc_main$6, {
            entity,
            onAccountSelected: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("accountSelected"))
          }, null, 8, ["entity"]);
        }), 256)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_1$4, [
          createBaseVNode("div", _hoisted_2$3, toDisplayString(unref($t)("wallet-multiSig:last_signature_added")) + ": " + toDisplayString(unref(formatTimeAndDate)(unref(getTimestampFromSlot)(unref(networkId), notification.value.lastUpdate), true, true, true, unref(isSmallerThanXXS))), 1)
        ]),
        createBaseVNode("div", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.creds?.scriptCredList ?? [], (scriptCred, index) => {
              return openBlock(), createBlock(_sfc_main$7, {
                script: __props.tx?.builtTx?.witness_set?.native_scripts?.[index] ?? null,
                scriptCred
              }, null, 8, ["script", "scriptCred"]);
            }), 256))
          ]),
          createVNode(_component_Button, {
            label: __props.mustSign ? unref($t)("common:button.viewConfirm") : unref($t)("common:button.viewTransaction"),
            severity: "secondary",
            rounded: "",
            outlined: "",
            onClick: _cache[1] || (_cache[1] = ($event) => emit("action"))
          }, null, 8, ["label"])
        ])
      ], 64);
    };
  }
});

const _hoisted_1$3 = { class: "flex flex-wrap et-js-ic et-gap-sm" };
const _hoisted_2$2 = {
  key: 0,
  class: "w-full max-w-full et-text-sm text-left text-txt-muted"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "NotificationItem",
  props: {
    notification: { type: Object, required: true }
  },
  emits: ["action", "accountSelected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const { formatTimeAndDate } = useFormatter();
    const { isSmallerThanXXS } = useScreenSize();
    const {
      openModalTransactionViewer
    } = useModalTransactionViewer(ref(null), ref(null));
    const { appAccount } = useSelectedAccount();
    const uiNotif = ref(null);
    const tx = ref(null);
    const creds = ref(null);
    const badges = ref([]);
    const openSignConfirm = ref(false);
    const onDeleteNotification = () => {
      dispatchSignalSync(doSetNotificationDeleted, [props.notification.id]);
    };
    const onNotificationAction = () => {
      if (uiNotif.value?.action) {
        emit("action");
        uiNotif.value.action();
      }
    };
    const processNotification = () => {
      const _notification = props.notification;
      if (_notification.type === "txMS") {
        _notification.label = $t("notification:type.txMS");
      } else {
        _notification.label = $t("notification:type.unknown");
      }
      _notification.badge = {
        id: "updated",
        label: $t("badge:updated.label"),
        hover: $t("badge:updated.hover"),
        noCapitalize: true,
        ...getBadgeConfig("updated")
      };
      if (_notification.read === Number.MAX_SAFE_INTEGER && _notification.updated !== Number.MAX_SAFE_INTEGER) {
        _notification.badge = {
          id: "updated",
          label: $t("badge:updated.label"),
          hover: $t("badge:updated.hover"),
          noCapitalize: true,
          ...getBadgeConfig("updated")
        };
      } else if (_notification.read === Number.MAX_SAFE_INTEGER) {
        _notification.badge = {
          id: "new",
          label: $t("badge:new.label"),
          hover: $t("badge:new.hover"),
          noCapitalize: true,
          ...getBadgeConfig("new")
        };
      }
      uiNotif.value = _notification;
      parseNotification();
    };
    const parseNotification = async () => {
      const notification = props.notification;
      const free = [];
      badges.value = [];
      try {
        tx.value = getTransactionFromCbor(networkId.value, notification.txCbor, 0, free);
        if (!tx.value.builtTx) {
          throw ErrorTxCbor.unableToDecode;
        }
        creds.value = await getSignTxCredList(networkId.value, tx.value.builtTx);
        const ttl = tx.value.builtTx.body.ttl;
        openSignConfirm.value = false;
        let badge;
        if (notification.onChain) {
          badge = {
            id: "onchain",
            label: $t("badge:onchain.label"),
            hover: $t("badge:onchain.hover"),
            noCapitalize: true,
            ...getBadgeConfig("onchain")
          };
        } else if (ttl && parseInt(ttl) < getCalculatedChainTip(networkId.value)) {
          badge = {
            id: "expired",
            label: $t("badge:expired.label"),
            hover: $t("badge:expired.hover"),
            noCapitalize: true,
            ...getBadgeConfig("expired")
          };
        } else if (creds.value.allOwnedSigned && creds.value.allForeignSigned && creds.value.allScriptsValid) {
          badge = {
            id: "confirmed",
            label: $t("badge:confirmed.label"),
            hover: $t("badge:confirmed.hover"),
            noCapitalize: true,
            ...getBadgeConfig("confirmed")
          };
        } else if (!creds.value.allOwnedSigned || creds.value.scriptCredList.some((scriptCred) => scriptCred.unsigned.some((cred) => !scriptCred.foreign.includes(cred)))) {
          badge = {
            id: "pendingapproval",
            label: $t("badge:pendingapproval.label"),
            hover: $t("badge:pendingapproval.hover"),
            noCapitalize: true,
            ...getBadgeConfig("pendingapproval")
          };
          openSignConfirm.value = true;
        } else {
          badge = {
            id: "awaitingothers",
            label: $t("badge:awaitingothers.label"),
            hover: $t("badge:awaitingothers.hover"),
            noCapitalize: true,
            ...getBadgeConfig("awaitingothers")
          };
        }
        if (!appAccount.value) {
          throw DataError.missingAccountData;
        }
        if (openSignConfirm.value) {
          notification.action = () => {
            parseTxSignRequest(appAccount.value, "cc", [{
              cbor: notification.txCbor,
              partialSign: true
            }], "notification");
          };
        } else {
          const localTx = tx.value.builtTx;
          const localBalance = await calcAccountTxBalance(appAccount.value, localTx);
          notification.action = () => {
            openModalTransactionViewer(localBalance, localTx);
          };
        }
        badges.value.push(badge);
      } catch (err) {
        console.error("MultiSigNotification: parseNotification", err);
      } finally {
        freeCSLObjects(free);
      }
    };
    watch(() => props.notification, () => processNotification(), { immediate: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return uiNotif.value ? (openBlock(), createBlock(_component_Card, {
        key: 0,
        class: "w-full shadow-sm",
        pt: {
          title: "flex flex-row et-jb-is et-gap-sm",
          content: "flex flex-col et-jc-ic et-gap-md"
        }
      }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1$3, [
            createVNode(_sfc_main$a, {
              class: "-ml-0.25",
              type: uiNotif.value.type,
              label: uiNotif.value.label
            }, null, 8, ["type", "label"]),
            uiNotif.value?.badge ? (openBlock(), createBlock(_sfc_main$H, {
              key: 0,
              badge: uiNotif.value.badge,
              size: "small"
            }, null, 8, ["badge"])) : createCommentVNode("", true),
            badges.value.length > 0 ? (openBlock(), createBlock(_sfc_main$F, {
              key: 1,
              badges: badges.value,
              size: "small",
              onClick: onNotificationAction
            }, null, 8, ["badges"])) : createCommentVNode("", true)
          ]),
          createVNode(_component_Button, {
            class: "p-1",
            rounded: "",
            link: "",
            onClick: withModifiers(onDeleteNotification, ["stop", "prevent"])
          }, {
            default: withCtx(() => [
              createVNode(IconCancelCircle, { class: "size-6" })
            ]),
            _: 1
          })
        ]),
        content: withCtx(() => [
          uiNotif.value.ts ? (openBlock(), createElementBlock("div", _hoisted_2$2, toDisplayString(unref(formatTimeAndDate)(uiNotif.value.ts ?? 0, false, true, true, unref(isSmallerThanXXS))), 1)) : createCommentVNode("", true),
          __props.notification.type === "txMS" ? (openBlock(), createBlock(_sfc_main$5, {
            key: 1,
            notification: uiNotif.value,
            "onUpdate:notification": _cache[0] || (_cache[0] = ($event) => uiNotif.value = $event),
            tx: tx.value,
            creds: creds.value,
            "entity-list": uiNotif.value.entityList,
            "signed-list": uiNotif.value.signedList,
            "must-sign": openSignConfirm.value,
            onAction: onNotificationAction
          }, null, 8, ["notification", "tx", "creds", "entity-list", "signed-list", "must-sign"])) : createCommentVNode("", true)
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$2 = { class: "w-full min-w-72 flex flex-wrap et-jb-ic et-gap-sm" };
const _hoisted_2$1 = { class: "p-card-title" };
const _hoisted_3 = { class: "pr-3 flex flex-wrap et-jb-ic et-gap-sm" };
const _hoisted_4 = { class: "w-full pr-3 flex flex-col et-gap-md max-h-[80vh] overflow-y-auto et-scrollbar" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NotificationPopover",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      getPaginatorTemplate
    } = useTheme();
    const { isSmallerThanSM } = useScreenSize();
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      onPageStateUpdate,
      setPage
    } = usePaginator(notificationList, 3);
    const notificationPopover = ref();
    const notificationBadgeValue = computed(() => {
      const _numNotifications = numUnreadNotifications.value === 0 ? numNotifications.value : numUnreadNotifications.value;
      return _numNotifications > 99 ? "99+" : _numNotifications.toString();
    });
    const hidePopover = () => {
      if (notificationPopover.value.visible) {
        notificationPopover.value.hide();
      }
    };
    const alignPopover = () => {
      if (notificationPopover.value.visible) {
        notificationPopover.value.alignOverlay();
      }
    };
    const openNotificationModal = (event) => {
      notificationPopover.value.toggle(event);
    };
    const onNotificationAction = () => {
      hidePopover();
    };
    const onAccountSelected = () => {
    };
    const onNotificationPopoverClose = () => {
      dispatchSignalSync(doSetNotificationRead);
    };
    const onClearAll = () => {
      dispatchSignalSync(doSetNotificationDeleted, notificationList.value.map((item) => item.id));
      hidePopover();
    };
    const onResetAll = () => {
      dispatchSignalSync(doResetNotificationDeleted);
      setPage(1);
    };
    watch(page, () => {
      if (page.value.length === 0) {
        hidePopover();
      } else {
        nextTick(() => alignPopover());
      }
    });
    return (_ctx, _cache) => {
      const _component_OverlayBadge = resolveComponent("OverlayBadge");
      const _component_Button = resolveComponent("Button");
      const _component_Paginator = resolveComponent("Paginator");
      const _component_Card = resolveComponent("Card");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_OverlayBadge, {
          class: "flex et-jc-ic",
          "pt:pcbadge:root:class": unref(page).length === 0 ? "hidden" : "",
          value: notificationBadgeValue.value,
          severity: unref(severity)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default", { openNotificationModal })
          ]),
          _: 3
        }, 8, ["pt:pcbadge:root:class", "value", "severity"]),
        createVNode(_component_Popover, {
          ref_key: "notificationPopover",
          ref: notificationPopover,
          class: "rounded-2xl! bg-bg-app shadow-2xl",
          pt: {
            content: "pl-6 py-6 flex flex-col et-gap-md et-js-is"
          },
          onHide: onNotificationPopoverClose
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$2, [
              createBaseVNode("div", _hoisted_2$1, toDisplayString(unref($t)("notification:title")), 1),
              createBaseVNode("div", _hoisted_3, [
                unref(numDeletedNotifications) > 0 ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  label: unref($t)("common:reset"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: onResetAll
                }, null, 8, ["label"])) : createCommentVNode("", true),
                unref(page).length > 0 ? (openBlock(), createBlock(_component_Button, {
                  key: 1,
                  label: unref($t)("common:button.clearAll"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: onClearAll
                }, null, 8, ["label"])) : createCommentVNode("", true)
              ])
            ]),
            unref(numPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
              key: 0,
              "page-link-size": unref(isSmallerThanSM) ? 3 : 3,
              template: unref(getPaginatorTemplate)(),
              rows: unref(numItemsPerPage),
              "total-records": unref(numItems),
              pt: { content: "flex flex-row flex-nowrap" },
              onPage: unref(onPageStateUpdate)
            }, null, 8, ["page-link-size", "template", "rows", "total-records", "onPage"])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_4, [
              unref(page).length === 0 ? (openBlock(), createBlock(_component_Card, {
                key: 0,
                class: "w-full",
                pt: { content: "flex flex-col et-jc-ic" }
              }, {
                content: withCtx(() => [
                  createTextVNode(toDisplayString(unref($t)("notification:empty")), 1)
                ]),
                _: 1
              })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(page), (notification) => {
                return openBlock(), createBlock(_sfc_main$4, {
                  notification,
                  onAction: onNotificationAction,
                  onAccountSelected
                }, null, 8, ["notification"]);
              }), 256))
            ])
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
});

const _hoisted_1$1 = {
  key: 0,
  class: "flex flex-col et-js-ie et-text-sm"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdaPriceHeader",
  setup(__props) {
    const { activeCurrency } = useCurrencyAPI();
    const { getPercentDecimals } = useFormatter();
    return (_ctx, _cache) => {
      return unref(activeCurrency)?.change24h ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_sfc_main$C, {
          percent: "",
          withSign: "",
          colored: "",
          clipboardEnabled: false,
          amount: unref(activeCurrency).change24h?.toString(),
          decimals: unref(getPercentDecimals)(unref(activeCurrency).change24h, false),
          cssText: "et-text-sm",
          cssColor: "et-text-sm"
        }, null, 8, ["amount", "decimals"]),
        createVNode(_sfc_main$I, {
          class: "py-0",
          amount: "1000000",
          "display-decimals": 2,
          cssColor: "et-text-sm"
        })
      ])) : createCommentVNode("", true);
    };
  }
});

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdaPriceChartPopover",
  setup(__props) {
    const $t = useTranslation().t;
    const { isSmallerThanSM } = useScreenSize();
    const adaPriceChartPopover = ref();
    const showPriceChart = ref(false);
    const openAdaPriceChartModal = (event) => {
      adaPriceChartPopover.value.toggle(event);
      setTimeout(() => {
        showPriceChart.value = true;
      }, 10);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Popover = resolveComponent("Popover");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        withDirectives((openBlock(), createBlock(_component_Button, {
          class: "p-0 mr-1.5",
          link: "",
          onClick: openAdaPriceChartModal
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$2)
          ]),
          _: 1
        })), [
          [
            _directive_tooltip,
            unref($t)("ui-header:chart.tooltip"),
            void 0,
            { bottom: true }
          ]
        ]),
        createVNode(_component_Popover, {
          ref_key: "adaPriceChartPopover",
          ref: adaPriceChartPopover,
          pt: {
            content: "p-0"
          }
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass(unref(isSmallerThanSM) ? "w-full" : "w-[512px]")
            }, [
              showPriceChart.value ? (openBlock(), createBlock(_sfc_main$J, {
                key: 0,
                "no-background": ""
              })) : createCommentVNode("", true)
            ], 2)
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
});

const _hoisted_1 = {
  key: 6,
  class: "pt-3 pb-3"
};
const _hoisted_2 = {
  key: 0,
  class: "w-full flex et-ie pr-0 pb-3"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutApp",
  setup(__props) {
    const $t = useTranslation().t;
    const { gotoWelcome } = useNavigation();
    const {
      showSuccess,
      showWarning
    } = useNotifications();
    const {
      isSmallerThanXXS,
      isSmallerThanLG
    } = useScreenSize();
    const {
      isBalanceVisible,
      setBalanceVisible
    } = useBalanceVisible();
    const {
      isDefaultPIN,
      pinChecked
    } = usePINLogin();
    const {
      isDappAccountEnabled,
      showDappConnector,
      toggleDappAccountEnabled
    } = useDappAccount();
    const { hasWallets } = useAppWalletIdList();
    const { showWalletListMenu } = useWalletListMenu();
    const { openModalScanQR } = useModalScanQR();
    const { menuStyle } = useLayout();
    watch(isDappAccountEnabled, (value) => {
      if (value) {
        showSuccess("Dapp Connector enabled");
      } else {
        showWarning("Dapp Connector disabled");
      }
    });
    const isMainnet = computed(() => networkId.value === "mainnet");
    const { toggleSettings } = useModalSettings();
    const onLogout = () => {
      pinChecked.value = 0;
      gotoWelcome();
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Divider = resolveComponent("Divider");
      const _component_router_view = resolveComponent("router-view");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(ToastLayer),
        (openBlock(), createBlock(MainLayout, { key: unref(menuStyle) }, createSlots({
          "header-center": withCtx(() => [
            _cache[2] || (_cache[2] = createBaseVNode("div", { class: "w-full et-max-width-search hidden md:flex flex-row et-js-ic et-gap-md" }, null, -1))
          ]),
          "header-right": withCtx(() => [
            isMainnet.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : createCommentVNode("", true),
            createVNode(_sfc_main$3, null, {
              default: withCtx(({ openNotificationModal }) => [
                unref(hasWallets) ? withDirectives((openBlock(), createBlock(_component_Button, {
                  key: 0,
                  class: "p-1",
                  rounded: "",
                  link: "",
                  onClick: openNotificationModal
                }, {
                  default: withCtx(() => [
                    createVNode(IconNotifications, { class: "icon-size-header" })
                  ]),
                  _: 1
                }, 8, ["onClick"])), [
                  [
                    _directive_tooltip,
                    unref($t)("ui-header:notifications.tooltip"),
                    void 0,
                    { bottom: true }
                  ]
                ]) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            unref(hasWallets) ? withDirectives((openBlock(), createBlock(_component_Button, {
              key: 1,
              class: "p-1",
              rounded: "",
              link: "",
              onClick: _cache[0] || (_cache[0] = ($event) => unref(setBalanceVisible)(!unref(isBalanceVisible)))
            }, {
              default: withCtx(() => [
                unref(isBalanceVisible) ? (openBlock(), createBlock(IconEyeVisible, {
                  key: 0,
                  class: "icon-size-header"
                })) : (openBlock(), createBlock(IconEyeHidden, {
                  key: 1,
                  class: "icon-size-header"
                }))
              ]),
              _: 1
            })), [
              [
                _directive_tooltip,
                unref($t)("ui-header:hideBalance.tooltip"),
                void 0,
                { bottom: true }
              ]
            ]) : createCommentVNode("", true),
            createVNode(_sfc_main$i),
            unref(hasWallets) && !unref(isDefaultPIN)() ? withDirectives((openBlock(), createBlock(_component_Button, {
              key: 2,
              class: "p-1",
              rounded: "",
              link: "",
              onClick: onLogout
            }, {
              default: withCtx(() => [
                createVNode(IconLockEnabled, { class: "icon-size-header" })
              ]),
              _: 1
            })), [
              [
                _directive_tooltip,
                unref($t)("ui-header:logout.tooltip"),
                void 0,
                { bottom: true }
              ]
            ]) : createCommentVNode("", true),
            unref(hasWallets) && unref(showDappConnector) ? withDirectives((openBlock(), createBlock(_component_Button, {
              key: 3,
              class: "p-1",
              rounded: "",
              link: "",
              onClick: unref(toggleDappAccountEnabled)
            }, {
              default: withCtx(() => [
                createVNode(IconPlugSocket, {
                  class: normalizeClass(["icon-size-header", unref(isDappAccountEnabled) ? "text-green" : "text-yellow"])
                }, null, 8, ["class"])
              ]),
              _: 1
            }, 8, ["onClick"])), [
              [
                _directive_tooltip,
                "Enable/Disable Dapp Connector",
                void 0,
                { bottom: true }
              ]
            ]) : createCommentVNode("", true),
            unref(hasWallets) ? withDirectives((openBlock(), createBlock(_component_Button, {
              key: 4,
              class: "p-1",
              rounded: "",
              link: "",
              onClick: _cache[1] || (_cache[1] = ($event) => unref(openModalScanQR)())
            }, {
              default: withCtx(() => [
                createVNode(IconQR, { class: "icon-size-header" })
              ]),
              _: 1
            })), [
              [
                _directive_tooltip,
                unref($t)("ui-header:qrScanner.tooltip"),
                void 0,
                { bottom: true }
              ]
            ]) : createCommentVNode("", true),
            unref(hasWallets) ? withDirectives((openBlock(), createBlock(_component_Button, {
              key: 5,
              class: "p-1",
              rounded: "",
              link: "",
              onClick: unref(toggleSettings)
            }, {
              default: withCtx(() => [
                createVNode(IconSettings, { class: "icon-size-header" })
              ]),
              _: 1
            }, 8, ["onClick"])), [
              [
                _directive_tooltip,
                unref($t)("ui-header:settings.tooltip"),
                void 0,
                { bottom: true }
              ]
            ]) : createCommentVNode("", true),
            !unref(isSmallerThanXXS) ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createVNode(_component_Divider, {
                layout: "vertical",
                class: "ml-0 mr-1.5 sm:mr-2"
              })
            ])) : createCommentVNode("", true),
            !unref(isSmallerThanXXS) ? (openBlock(), createBlock(_sfc_main$o, { key: 7 })) : createCommentVNode("", true)
          ]),
          "progress-bar": withCtx(() => [
            createVNode(_sfc_main$K)
          ]),
          "menu-top": withCtx(() => [
            unref(isSmallerThanLG) && unref(hasWallets) ? (openBlock(), createBlock(_sfc_main$r, { key: 0 })) : createCommentVNode("", true)
          ]),
          "menu-center": withCtx(() => [
            !unref(isSmallerThanLG) && unref(menuStyle) === "walletlist" && unref(hasWallets) ? (openBlock(), createBlock(_sfc_main$u, {
              key: 0,
              "num-columns": 1,
              compact: ""
            })) : createCommentVNode("", true)
          ]),
          "menu-right-edge": withCtx(() => [
            createVNode(_sfc_main$n)
          ]),
          "menu-right": withCtx(() => [
            unref(hasWallets) && !unref(showWalletListMenu) ? (openBlock(), createBlock(_sfc_main$q, {
              key: 0,
              "hide-collapse": ""
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$t)
              ]),
              _: 1
            })) : unref(hasWallets) ? (openBlock(), createBlock(_sfc_main$p, {
              key: 1,
              "hide-collapse": ""
            })) : createCommentVNode("", true)
          ]),
          "menu-right-bottom": withCtx(() => [
            unref(hasWallets) && !unref(showWalletListMenu) ? (openBlock(), createElementBlock("div", _hoisted_2, [
              createVNode(_sfc_main$z)
            ])) : createCommentVNode("", true)
          ]),
          content: withCtx(() => [
            createVNode(_component_router_view)
          ]),
          "bottom-bar": withCtx(() => [
            createVNode(_sfc_main$c)
          ]),
          _: 2
        }, [
          unref(hasWallets) ? {
            name: "favorite-accounts",
            fn: withCtx(() => [
              createVNode(_sfc_main$l)
            ]),
            key: "0"
          } : void 0
        ]), 1024))
      ], 64);
    };
  }
});

export { _sfc_main as default };
