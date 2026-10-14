import { d as defineComponent, w as useTranslation, D as computed, e as ref, G as watch, m as createElementBlock, o as openBlock, p as createBaseVNode, u as unref, B as toDisplayString, V as normalizeClass, a1 as withDirectives, t as createCommentVNode, c as createBlock, a2 as resolveDirective, H as createTextVNode, n as createVNode, k as onUnmounted, aF as removeSignalListener, aE as addSignalListener, cQ as onBuiltTxVoteReg, cR as onBuiltTxVoteDelegation, aC as dispatchSignal, cS as doBuildTxVoteDelegation, Y as toRefs, y as withCtx, z as resolveComponent, x as useScreenSize, $ as createSlots, U as withModifiers } from './index.js';
import { u as useSelectedAccount, c as useDRepInfo } from './useSelectedAccount.js';
import { ay as getDRepCredentialsFromAddress, E as ErrorBuildTx } from './app2.js';
import { g as getRandomId } from './epochParams.js';
import { g as getTxBuiltErrorMsg } from './error.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useNotifications } from './useNotification.js';
import { _ as _sfc_main$7 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$6 } from './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import { a as useModalDRepInfo } from './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import { B as ButtonRow } from './ButtonRow.js';
import { _ as _sfc_main$5 } from './SocialLinksSmall.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './Badge.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1$2 = { class: "shrink grow flex flex-row et-js-ic et-gap-md truncate" };
const _hoisted_2$1 = ["src"];
const _hoisted_3$1 = {
  key: 1,
  class: "w-full h-full flex flex-col et-jc-ic aspect-square rounded-full"
};
const _hoisted_4$1 = { class: "font-semibold et-text-xl" };
const _hoisted_5$1 = { class: "shrink grow flex flex-col et-gap-xs truncate" };
const _hoisted_6$1 = { class: "w-full flex et-gap-sm et-js-ic" };
const _hoisted_7$1 = {
  key: 0,
  class: "truncate et-text-md"
};
const _hoisted_8$1 = {
  key: 1,
  class: "truncate"
};
const _hoisted_9$1 = { class: "flex et-js-ic et-gap-sm font-normal et-text-sm text-txt-muted" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CardDRepTitle",
  props: {
    drepInfo: { type: Object, required: true },
    delegatedDRepId: { type: String, required: false, default: "" },
    isGovDelegatedToSelf: { type: Boolean, required: false, default: false },
    hideBadgeActive: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const {
      dRepId,
      dRepName,
      dRepIcon,
      dRepIconError,
      dRepStatus,
      twitter,
      discord,
      telegram,
      youtube,
      github,
      linkedin,
      linktree,
      cardanoForum,
      email,
      website
    } = props.drepInfo;
    const hasName = computed(() => dRepName.value && !dRepName.value.startsWith("drep1"));
    const icon = ref();
    const _dRepIcon = ref(null);
    let _toid = ref(-1);
    const onError = (err) => {
      clearTimeout(_toid.value);
      _dRepIcon.value = null;
      dRepIconError.value = true;
    };
    const onClearTimeout = () => {
      clearTimeout(_toid.value);
      dRepIconError.value = false;
    };
    watch(dRepIcon, () => {
      clearTimeout(_toid.value);
      dRepIconError.value = false;
      _dRepIcon.value = dRepIcon.value;
      if (dRepIcon.value) {
        _toid.value = setTimeout(() => {
          if (!icon.value?.complete) {
            _dRepIcon.value = null;
            dRepIconError.value = true;
          }
        }, 5e3);
      }
    }, { immediate: true });
    const badgeActive = computed(() => {
      if (props.hideBadgeActive) {
        return null;
      }
      if (dRepStatus.value === "active") {
        return {
          id: "active",
          label: $t("governance-drepInfo:badge.status.active.label"),
          hover: $t("governance-drepInfo:badge.status.active.tooltip")
        };
      } else if (dRepStatus.value === "inactive") {
        return {
          id: "inactive",
          label: $t("governance-drepInfo:badge.status.inactive.label"),
          hover: $t("governance-drepInfo:badge.status.inactive.tooltip")
        };
      } else if (dRepStatus.value === "unregistered") {
        return {
          id: "unregistered",
          label: $t("governance-drepInfo:badge.status.unregistered.label"),
          hover: $t("governance-drepInfo:badge.status.unregistered.tooltip")
        };
      }
      return null;
    });
    const badgeDelegatedToSelf = computed(() => {
      if (props.isGovDelegatedToSelf && props.delegatedDRepId === dRepId.value) {
        return {
          id: "selfDelegated",
          label: $t("governance-drepInfo:badge.status.selfDelegated.label"),
          hover: $t("governance-drepInfo:badge.status.selfDelegated.tooltip")
        };
      }
      return null;
    });
    return (_ctx, _cache) => {
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", {
          class: normalizeClass([_dRepIcon.value && !unref(dRepIconError) ? "" : "border border-border-1", "shrink-0 grow-0 size-10 bg-bg-app rounded-md overflow-hidden shadow-sm"])
        }, [
          _dRepIcon.value && !unref(dRepIconError) ? (openBlock(), createElementBlock("img", {
            key: 0,
            ref_key: "icon",
            ref: icon,
            class: "size-10",
            loading: "lazy",
            src: _dRepIcon.value,
            alt: "DRep logo",
            onLoad: _cache[0] || (_cache[0] = ($event) => onClearTimeout()),
            onError
          }, null, 40, _hoisted_2$1)) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
            createBaseVNode("div", _hoisted_4$1, toDisplayString(unref(dRepName)?.slice(0, 1)), 1)
          ]))
        ], 2),
        createBaseVNode("div", _hoisted_5$1, [
          createBaseVNode("div", _hoisted_6$1, [
            hasName.value ? withDirectives((openBlock(), createElementBlock("div", _hoisted_7$1, [
              createTextVNode(toDisplayString(unref(dRepName)), 1)
            ])), [
              [
                _directive_tooltip,
                {
                  value: unref(dRepName),
                  pt: {
                    text: "inline-block whitespace-nowrap"
                  }
                },
                void 0,
                { top: true }
              ]
            ]) : unref(dRepId) ? (openBlock(), createElementBlock("div", _hoisted_8$1, toDisplayString(unref(dRepId)), 1)) : createCommentVNode("", true),
            badgeActive.value ? (openBlock(), createBlock(_sfc_main$4, {
              key: 2,
              badge: badgeActive.value,
              size: "tiny",
              "add-colors": ""
            }, null, 8, ["badge"])) : createCommentVNode("", true),
            badgeDelegatedToSelf.value ? (openBlock(), createBlock(_sfc_main$4, {
              key: 3,
              badge: badgeDelegatedToSelf.value,
              size: "tiny",
              "add-colors": ""
            }, null, 8, ["badge"])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_9$1, [
            createVNode(_sfc_main$5, {
              twitter: unref(twitter),
              telegram: unref(telegram),
              youtube: unref(youtube),
              discord: unref(discord),
              github: unref(github),
              linkedin: unref(linkedin),
              linktree: unref(linktree),
              cardanoForum: unref(cardanoForum),
              email: unref(email),
              website: unref(website)
            }, null, 8, ["twitter", "telegram", "youtube", "discord", "github", "linkedin", "linktree", "cardanoForum", "email", "website"])
          ])
        ])
      ]);
    };
  }
});

const _show$1 = ref(false);
const _filter = ref([]);
const toggleModalDRepList = () => {
  _show$1.value = !_show$1.value;
};
const openModalDRepList = (drepFilter, commentId) => {
  _filter.value = drepFilter ?? [];
  _show$1.value = true;
};
const closeModalDRepList = () => {
  _show$1.value = false;
  _filter.value = [];
};
const useModalDRepList = () => {
  return {
    showModalDRepList: _show$1,
    drepFilter: _filter,
    openModalDRepList,
    closeModalDRepList,
    toggleModalDRepList
  };
};

const useVoteDelegation = () => {
  const $t = useTranslation().t;
  const { adaSymbol } = useAdaSymbol();
  const {
    showWarning,
    showError
  } = useNotifications();
  const { accountGovernance } = useSelectedAccount();
  const {
    accountDRepInfo,
    accountDRepCred
  } = accountGovernance;
  const {
    closeModalDRepList
  } = useModalDRepList();
  const storeId = "DRepButtonOptions-" + getRandomId();
  const doVoteDelegation = async (drepId, anchor) => {
    if (!drepId) {
      return showError($t("governance-drepInfo:error.noDRepId"));
    }
    let drepCred = drepId;
    let isScript = false;
    let needDRepReg = false;
    if (drepId !== "drep_always_abstain" && drepId !== "drep_always_no_confidence") {
      try {
        const dRepCreds = getDRepCredentialsFromAddress(drepId);
        drepCred = dRepCreds.dRepCred;
        isScript = dRepCreds.isScript;
        if (accountDRepCred.value && drepCred === accountDRepCred.value && !accountDRepInfo.dRepRegistered.value) {
          needDRepReg = true;
        }
      } catch (err) {
        return showError($t("governance-drepInfo:error.invalidDRepId"));
      }
    }
    addSignalListener(onBuiltTxVoteDelegation, storeId, (res, errorMsg) => {
      removeSignalListener(onBuiltTxVoteReg, storeId);
      if (res?.error) {
        const {
          msg,
          isWarning
        } = getTxBuiltErrorMsg(res ? res.error : ErrorBuildTx.missingAccountData, 0, { value: 0 }, adaSymbol);
        if (msg.length > 0) {
          if (isWarning) {
            showWarning(msg);
          } else {
            showError(msg);
          }
        }
      } else if (errorMsg) {
        showError(errorMsg);
      }
      closeModalDRepList();
    });
    await dispatchSignal(doBuildTxVoteDelegation, drepCred, isScript, needDRepReg, anchor);
    removeSignalListener(onBuiltTxVoteReg, storeId);
  };
  onUnmounted(() => {
    removeSignalListener(onBuiltTxVoteDelegation, storeId);
  });
  return {
    doVoteDelegation
  };
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DRepId",
  props: {
    dRepId: { type: String, required: true },
    fullWidth: { type: Boolean, required: false, default: true },
    noShortenedAddress: { type: Boolean, required: false, default: false },
    popoverLeft: { type: Boolean, required: false, default: false },
    popoverRight: { type: Boolean, required: false, default: false },
    small: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$6, {
        content: __props.dRepId,
        fullWidth: __props.fullWidth,
        noShortenedAddress: __props.noShortenedAddress,
        popoverLeft: __props.popoverLeft,
        popoverRight: __props.popoverRight,
        small: __props.small,
        "explorer-link-type": "DRep",
        "explorer-link-subject": __props.dRepId
      }, null, 8, ["content", "fullWidth", "noShortenedAddress", "popoverLeft", "popoverRight", "small", "explorer-link-subject"]);
    };
  }
});

const _show = ref(false);
const openModalDRepRegistration = () => {
  _show.value = true;
};
const closeModalDRepRegistration = () => {
  _show.value = false;
};
const useModalDRepRegistration = () => {
  const { doVoteDelegation } = useVoteDelegation();
  return {
    showModalDRepRegistration: _show,
    openModalDRepRegistration,
    closeModalDRepRegistration,
    doVoteDelegation
  };
};

const _hoisted_1$1 = { class: "flex et-je" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DRepButtonOptions",
  props: {
    cardDRepId: { type: String, required: true },
    size: { type: String, required: false, default: void 0 },
    hideDetails: { type: Boolean, required: false, default: false },
    alignLeft: { type: Boolean, required: false, default: false },
    showListButton: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const { cardDRepId } = toRefs(props);
    const $t = useTranslation().t;
    const { accountGovernance } = useSelectedAccount();
    const {
      accountDRepId,
      accountDRepInfo,
      delegatedDRepId
    } = accountGovernance;
    const accountDRepRegistered = accountDRepInfo.dRepRegistered;
    const {
      openModalDRepInfo
    } = useModalDRepInfo();
    const {
      openModalDRepRegistration
    } = useModalDRepRegistration();
    const { openModalDRepList } = useModalDRepList();
    const alreadyDelegated = computed(() => cardDRepId.value === delegatedDRepId.value);
    const isAccountDRepId = computed(() => cardDRepId.value === accountDRepId.value);
    const doOpenDRepInfo = () => openModalDRepInfo(cardDRepId.value);
    const { doVoteDelegation } = useVoteDelegation();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(ButtonRow, null, {
        default: withCtx(() => [
          __props.showListButton ? (openBlock(), createBlock(_component_Button, {
            key: 0,
            label: unref($t)("governance-page:button.browseDReps"),
            size: __props.size,
            severity: "secondary",
            rounded: "",
            outlined: "",
            onClick: _cache[0] || (_cache[0] = ($event) => unref(openModalDRepList)())
          }, null, 8, ["label", "size"])) : createCommentVNode("", true),
          isAccountDRepId.value ? (openBlock(), createBlock(_component_Button, {
            key: 1,
            label: unref(accountDRepRegistered) ? unref($t)("governance-page:register.modal.updateRegistration.button") : unref($t)("governance-page:register.modal.registration.button"),
            size: __props.size,
            severity: "secondary",
            rounded: "",
            outlined: "",
            onClick: unref(openModalDRepRegistration)
          }, null, 8, ["label", "size", "onClick"])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_1$1, [
            !__props.hideDetails ? (openBlock(), createBlock(_component_Button, {
              key: 0,
              class: "max-xs:grow",
              label: unref($t)("governance-page:button.showDRepDetails"),
              size: __props.size,
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: doOpenDRepInfo
            }, null, 8, ["label", "size"])) : createCommentVNode("", true)
          ]),
          !alreadyDelegated.value ? (openBlock(), createBlock(_component_Button, {
            key: 2,
            label: unref($t)("common:delegate"),
            size: __props.size,
            severity: "secondary",
            rounded: "",
            outlined: "",
            onClick: _cache[1] || (_cache[1] = ($event) => unref(doVoteDelegation)(unref(cardDRepId)))
          }, null, 8, ["label", "size"])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "w-full flex flex-col"
};
const _hoisted_2 = { class: "text-left et-text-sm font-semibold" };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = {
  key: 1,
  class: "w-full flex flex-col"
};
const _hoisted_5 = { class: "text-left et-text-sm font-semibold" };
const _hoisted_6 = {
  key: 0,
  class: "text-left"
};
const _hoisted_7 = { class: "flex flex-wrap et-js et-gap-lg" };
const _hoisted_8 = {
  key: 0,
  class: "flex flex-col"
};
const _hoisted_9 = { class: "text-left et-text-sm font-semibold" };
const _hoisted_10 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_11 = {
  key: 1,
  class: "flex flex-col"
};
const _hoisted_12 = { class: "text-left et-text-sm font-semibold" };
const _hoisted_13 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CardDRep2",
  props: {
    cardDRepId: { type: String, required: true },
    size: { type: String, required: false, default: void 0 },
    showListButton: { type: Boolean, required: false, default: false },
    hideButtons: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const { cardDRepId } = toRefs(props);
    const $t = useTranslation().t;
    const { isSmallerThanXXS } = useScreenSize();
    const { accountGovernance } = useSelectedAccount();
    const { openModalDRepList } = useModalDRepList();
    const { doVoteDelegation } = useVoteDelegation();
    const drepInfo = useDRepInfo(cardDRepId);
    const {
      isGovDelegatedToSelf,
      delegatedDRepId
    } = accountGovernance;
    const {
      isAutoDRep,
      dRepName,
      dRepVotePower,
      dRepNumDelegates,
      dRepVotePowerShare
    } = drepInfo;
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Divider = resolveComponent("Divider");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        class: "w-full h-full min-w-0",
        pt: {
          body: "h-full flex et-gap-md",
          title: "       flex flex-row et-gap-md et-jb-ic sm:et-jb-is max-sm:flex-wrap",
          content: "h-full flex flex-col et-gap-md",
          footer: "       flex flex-row et-gap-md et-jc-ic"
        }
      }, createSlots({
        title: withCtx(() => [
          createVNode(_sfc_main$3, {
            "drep-info": unref(drepInfo),
            "delegated-d-rep-id": unref(delegatedDRepId) ?? void 0,
            "is-gov-delegated-to-self": unref(isGovDelegatedToSelf) ?? void 0
          }, null, 8, ["drep-info", "delegated-d-rep-id", "is-gov-delegated-to-self"]),
          __props.showListButton ? (openBlock(), createBlock(_component_Button, {
            key: 0,
            label: !unref(isSmallerThanXXS) ? unref($t)("governance-page:openDRepList") : unref($t)("governance-page:openList"),
            size: "small",
            severity: "secondary",
            rounded: "",
            outlined: "",
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(openModalDRepList)(), ["stop"]))
          }, null, 8, ["label"])) : __props.hideButtons ? (openBlock(), createBlock(_component_Button, {
            key: 1,
            class: "shrink-0 -mb-1 ml-auto",
            label: unref($t)("common:delegate"),
            severity: "secondary",
            size: "small",
            rounded: "",
            outlined: "",
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => unref(doVoteDelegation)(unref(cardDRepId)), ["stop"]))
          }, null, 8, ["label"])) : createCommentVNode("", true)
        ]),
        content: withCtx(() => [
          createVNode(_component_Divider, { class: "-my-1" }),
          !unref(isAutoDRep) ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, toDisplayString(unref($t)("governance-drepInfo:drepId.label")), 1),
            unref(cardDRepId) ? (openBlock(), createBlock(_sfc_main$2, {
              key: 0,
              dRepId: unref(cardDRepId)
            }, null, 8, ["dRepId"])) : (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(unref($t)("governance-drepInfo:drepId.missing")), 1))
          ])) : (openBlock(), createElementBlock("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, toDisplayString(unref($t)("governance-drepInfo:drepId.default")), 1),
            unref(cardDRepId) ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(unref(dRepName)), 1)) : createCommentVNode("", true)
          ])),
          createBaseVNode("div", _hoisted_7, [
            unref(dRepNumDelegates) ? (openBlock(), createElementBlock("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, toDisplayString(unref($t)("governance-drepInfo:numDelegators")), 1),
              createBaseVNode("div", _hoisted_10, [
                createVNode(_sfc_main$7, {
                  amount: unref(dRepNumDelegates) + "",
                  decimals: 0,
                  currency: ""
                }, null, 8, ["amount"])
              ])
            ])) : createCommentVNode("", true),
            unref(dRepVotePower) !== "0" ? (openBlock(), createElementBlock("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, toDisplayString(unref($t)("governance-drepInfo:votingPower")), 1),
              createBaseVNode("div", _hoisted_13, [
                createVNode(_sfc_main$7, {
                  amount: unref(dRepVotePowerShare),
                  percent: true,
                  decimals: 2
                }, null, 8, ["amount"]),
                createVNode(_sfc_main$7, {
                  "show-fraction": false,
                  amount: unref(dRepVotePower),
                  prefix: "(",
                  suffix: ")",
                  "balance-always-visible": ""
                }, null, 8, ["amount"])
              ])
            ])) : createCommentVNode("", true)
          ])
        ]),
        _: 2
      }, [
        !__props.hideButtons ? {
          name: "footer",
          fn: withCtx(() => [
            !__props.hideButtons && unref(cardDRepId) ? (openBlock(), createBlock(_sfc_main$1, {
              key: 0,
              cardDRepId: unref(cardDRepId),
              size: __props.size
            }, null, 8, ["cardDRepId", "size"])) : createCommentVNode("", true)
          ]),
          key: "0"
        } : void 0
      ]), 1024);
    };
  }
});

export { _sfc_main as _, useModalDRepList as a, _sfc_main$2 as b, _sfc_main$3 as c, _sfc_main$1 as d, useModalDRepRegistration as u };
