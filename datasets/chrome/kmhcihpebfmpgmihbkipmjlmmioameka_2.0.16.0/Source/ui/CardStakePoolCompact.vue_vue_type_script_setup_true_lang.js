import { d as defineComponent, w as useTranslation, D as computed, c as createBlock, t as createCommentVNode, o as openBlock, y as withCtx, n as createVNode, p as createBaseVNode, B as toDisplayString, u as unref, z as resolveComponent, e as ref, x as useScreenSize, k as onUnmounted, aF as removeSignalListener, de as onBuiltTxDelegation, m as createElementBlock, F as Fragment, a1 as withDirectives, d6 as vShow, a2 as resolveDirective, H as createTextVNode, V as normalizeClass, aE as addSignalListener, aC as dispatchSignal, df as doBuildTxDelegation } from './index.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { _ as _sfc_main$4 } from './ReceiveListItem.vue_vue_type_script_setup_true_lang.js';
import { c as compare } from './bigmath.js';
import { c as chainTip } from './chainTip.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useNotifications } from './useNotification.js';
import { I as IconAlert02 } from './IconAlert02.js';
import { _ as _sfc_main$9 } from './AdaAmountRaw.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$8 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$5 } from './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import { E as ErrorBuildTx } from './app2.js';
import { g as getTxBuiltErrorMsg } from './error.js';
import { u as useModalStakePoolList } from './useModalStakePoolList.js';
import { m as medianROS } from './useAppAccountBalances.js';
import { _ as _sfc_main$7 } from './SocialLinksSmall.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$6 } from './Badge.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1$2 = { class: "font-semibold" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CardStakeKey",
  setup(__props) {
    const $t = useTranslation().t;
    const { accountData } = useSelectedAccount();
    const stakeAddr = computed(() => accountData.value?.rewardInfoList[0]?.bech32);
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return stakeAddr.value ? (openBlock(), createBlock(_component_Card, {
        key: 0,
        class: "grow break-inside-avoid",
        pt: {
          body: "h-full",
          content: "h-full flex flex-row flex-wrap et-js-ic"
        }
      }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, toDisplayString(unref($t)("staking-pool:staking-card.view-graph.stake-key")), 1)
        ]),
        content: withCtx(() => [
          createVNode(_sfc_main$4, {
            item: { bech32: stakeAddr.value, used: true, searchablePath: "", pathInfo: "" },
            "hide-share": "",
            "hide-copy": ""
          }, null, 8, ["item"])
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});

const _show = ref(false);
const openModalRewardHistory = () => {
  _show.value = true;
};
const closeModalRewardHistory = () => {
  _show.value = false;
};
const useModalRewardHistory = () => {
  return {
    showModalRewardHistory: _show,
    openModalRewardHistory,
    closeModalRewardHistory
  };
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PoolId",
  props: {
    poolId: { type: String, required: true },
    fullWidth: { type: Boolean, required: false, default: true },
    noShortenedAddress: { type: Boolean, required: false, default: false },
    popoverLeft: { type: Boolean, required: false, default: false },
    popoverRight: { type: Boolean, required: false, default: false },
    small: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$5, {
        content: __props.poolId,
        fullWidth: __props.fullWidth,
        noShortenedAddress: __props.noShortenedAddress,
        popoverLeft: __props.popoverLeft,
        popoverRight: __props.popoverRight,
        small: __props.small,
        "explorer-link-type": "pool",
        "explorer-link-subject": { ph: __props.poolId }
      }, null, 8, ["content", "fullWidth", "noShortenedAddress", "popoverLeft", "popoverRight", "small", "explorer-link-subject"]);
    };
  }
});

const _hoisted_1$1 = { class: "shrink flex flex-row et-js-ic et-gap-md truncate" };
const _hoisted_2$1 = { class: "shrink-0 grow-0 size-10 bg-bg-app rounded-full overflow-hidden shadow-sm" };
const _hoisted_3$1 = ["src"];
const _hoisted_4$1 = {
  key: 1,
  class: "w-full h-full flex flex-col et-jc-ic aspect-square rounded-full"
};
const _hoisted_5$1 = { class: "font-semibold et-text-xl" };
const _hoisted_6$1 = { class: "shrink grow flex flex-col et-gap-xs truncate" };
const _hoisted_7$1 = { class: "grow flex et-gap-xs et-js-ic" };
const _hoisted_8$1 = { class: "truncate" };
const _hoisted_9$1 = { class: "flex et-js-ic et-gap-xs ml-1" };
const _hoisted_10$1 = { class: "flex et-js-ic et-gap-sm font-normal et-text-sm text-txt-muted" };
const _hoisted_11$1 = { class: "whitespace-nowrap mr-0" };
const _hoisted_12$1 = { class: "flex flex-wrap et-gap-xs et-je-ic" };
const _hoisted_13 = { class: "w-96 p-2 flex flex-col et-gap-md" };
const _hoisted_14 = { class: "flex flex-col et-gap-sm" };
const _hoisted_15 = { class: "flex et-js-ic et-gap-sm capitalize" };
const _hoisted_16 = { class: "" };
const _hoisted_17 = { class: "flex flex-row et-gap-sm et-je" };
const storeId = "CardPoolTitle";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CardStakePoolTitle",
  props: {
    pool: { type: Object, required: true },
    currentPool: { type: Boolean, required: false, default: false },
    showDelegate: { type: Boolean, required: false, default: true },
    showOpenPoolList: { type: Boolean, required: false, default: false },
    showOpenHistory: { type: Boolean, required: false, default: false }
  },
  emits: ["openPoolList", "openStakeHistory"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const $t = useTranslation().t;
    const {
      showWarning,
      showError
    } = useNotifications();
    const { adaSymbol } = useAdaSymbol();
    const { isSmallerThanXXS } = useScreenSize();
    const {
      accountData,
      accountSettings
    } = useSelectedAccount();
    const {
      closeModalStakePoolList
    } = useModalStakePoolList();
    const stakedPool = accountSettings.stakedPool;
    const imgError = ref(false);
    const ticker = computed(() => props.pool?.md?.ticker);
    const name = computed(() => props.pool?.md?.name);
    const id = computed(() => props.pool?.pb);
    const ros = computed(() => props.pool?.mr12 ?? 0);
    const hasHighMargin = computed(() => (props.pool?.ma ?? 0) > 0.2);
    const noHighMargin = computed(() => (props.pool?.ma ?? 0) > 0.98);
    const hasLowROS = computed(() => ros.value < medianROS.value * 0.74);
    const noROS = computed(() => ros.value === 0 && (props.pool?.fep ?? 0) < (props.pool?.ep ?? 0) - 6);
    const isPledgeMet = computed(() => compare(props.pool.pl, "<=", props.pool.pla));
    const noRewards = computed(() => noHighMargin.value || !isPledgeMet.value || noROS.value);
    const showDelegateConfirm = computed(() => hasHighMargin.value || !isPledgeMet.value || hasLowROS.value);
    const multiPool = computed(() => (props.pool?.gp ?? 0) > 1);
    const twitter = computed(() => props.pool?.mde?.info?.social?.twitter_handle);
    const email = computed(() => props.pool?.mde?.info?.social?.email);
    const telegram = computed(() => props.pool?.mde?.info?.social?.telegram_handle);
    const youtube = computed(() => props.pool?.mde?.info?.social?.youtube_handle);
    const discord = computed(() => props.pool?.mde?.info?.social?.discord_handle);
    const github = computed(() => props.pool?.mde?.info?.social?.github_handle);
    const linkedin = computed(() => props.pool?.mde?.info?.social?.linkedin_handle);
    const linktree = computed(() => props.pool?.mde?.info?.social?.linktree_handle);
    const cardanoForum = computed(() => props.pool?.mde?.info?.social?.cardano_forum_handle);
    const website = computed(() => props.pool?.md?.homepage ?? void 0);
    const isRetired = computed(() => props.pool.rep > 0 && props.pool.rep > props.pool.aep);
    const popoverConfirm = ref();
    const showPopoverConfirm = (event) => {
      popoverConfirm.value?.show(event);
    };
    async function delegate(poolId) {
      addSignalListener(onBuiltTxDelegation, storeId, (res, errorMsg) => {
        removeSignalListener(onBuiltTxDelegation, storeId);
        if (res?.error) {
          const { msg, isWarning } = getTxBuiltErrorMsg(res ? res.error : ErrorBuildTx.missingAccountData, 0, { value: 0 }, adaSymbol);
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
        closeModalStakePoolList();
      });
      await dispatchSignal(doBuildTxDelegation, poolId);
      removeSignalListener(onBuiltTxDelegation, storeId);
    }
    const isValidImg = (pool) => {
      const src = pool.mde?.info?.url_png_icon_64x64 || pool.mde?.adapools?.url_png_icon_64x64;
      return src && src.startsWith("https://");
    };
    onUnmounted(() => {
      removeSignalListener(onBuiltTxDelegation, storeId);
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Popover = resolveComponent("Popover");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2$1, [
            __props.pool && !imgError.value && isValidImg(__props.pool) ? withDirectives((openBlock(), createElementBlock("img", {
              key: 0,
              loading: "lazy",
              src: __props.pool.mde?.info?.url_png_icon_64x64 || __props.pool.mde?.adapools?.url_png_icon_64x64,
              alt: "pool logo",
              onError: _cache[0] || (_cache[0] = ($event) => imgError.value = true)
            }, null, 40, _hoisted_3$1)), [
              [vShow, __props.pool.mde?.info?.url_png_icon_64x64 || __props.pool.mde?.adapools?.url_png_icon_64x64]
            ]) : (openBlock(), createElementBlock("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5$1, toDisplayString(__props.pool?.md?.ticker?.slice(0, 1)), 1)
            ]))
          ]),
          createBaseVNode("div", _hoisted_6$1, [
            withDirectives((openBlock(), createElementBlock("div", _hoisted_7$1, [
              createBaseVNode("div", _hoisted_8$1, "[" + toDisplayString(ticker.value) + "] " + toDisplayString(name.value), 1),
              createBaseVNode("div", _hoisted_9$1, [
                !multiPool.value ? (openBlock(), createBlock(_sfc_main$6, {
                  key: 0,
                  class: "h-5 px-1.5!",
                  size: "tiny",
                  badge: {
                    id: "spo",
                    label: "SPO"
                  },
                  "add-colors": "",
                  "no-action": "",
                  "no-hover": ""
                })) : createCommentVNode("", true),
                multiPool.value ? (openBlock(), createBlock(_sfc_main$6, {
                  key: 1,
                  class: "h-5 px-1.5!",
                  size: "tiny",
                  badge: {
                    id: "mpo",
                    label: "MPO (" + __props.pool?.gpn + "/" + __props.pool?.gp + ")"
                  },
                  "add-colors": "",
                  "no-action": "",
                  "no-hover": ""
                }, null, 8, ["badge"])) : createCommentVNode("", true),
                isRetired.value ? (openBlock(), createBlock(_sfc_main$6, {
                  key: 2,
                  class: "px-1.5!",
                  size: "tiny",
                  badge: {
                    id: "retired",
                    label: unref($t)("staking-pool:retiredIn", { epoch: __props.pool.rep ?? 0 }),
                    icon: "alert"
                  },
                  "add-colors": "",
                  "no-action": "",
                  "no-hover": ""
                }, null, 8, ["badge"])) : createCommentVNode("", true)
              ])
            ])), [
              [
                _directive_tooltip,
                {
                  value: "[" + ticker.value + "] " + name.value + " - " + (multiPool.value ? unref($t)("staking-pool:mpo", { count: __props.pool?.gp }) : unref($t)("staking-pool:spo")),
                  pt: {
                    text: "inline-block whitespace-nowrap"
                  }
                },
                void 0,
                { top: true }
              ]
            ]),
            createBaseVNode("div", _hoisted_10$1, [
              createBaseVNode("span", _hoisted_11$1, "#" + toDisplayString(__props.pool?.ra), 1),
              createVNode(_sfc_main$7, {
                twitter: twitter.value,
                telegram: telegram.value,
                youtube: youtube.value,
                discord: discord.value,
                github: github.value,
                linkedin: linkedin.value,
                linktree: linktree.value,
                cardanoForum: cardanoForum.value,
                email: email.value,
                website: website.value
              }, null, 8, ["twitter", "telegram", "youtube", "discord", "github", "linkedin", "linktree", "cardanoForum", "email", "website"])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_12$1, [
          !__props.currentPool && __props.showDelegate && unref(stakedPool)?.pb !== __props.pool.pb ? (openBlock(), createBlock(_component_Button, {
            key: 0,
            class: "shrink-0 -mb-1",
            label: unref($t)("common:delegate"),
            severity: "secondary",
            size: "small",
            disabled: !!unref(accountData) && unref(accountData).keys.stake.length === 0,
            rounded: "",
            outlined: "",
            onClick: _cache[1] || (_cache[1] = ($event) => showDelegateConfirm.value ? showPopoverConfirm($event) : delegate(id.value))
          }, null, 8, ["label", "disabled"])) : __props.showOpenPoolList ? (openBlock(), createBlock(_component_Button, {
            key: 1,
            label: !unref(isSmallerThanXXS) ? unref($t)("staking-pool:staking-card.openPoolList") : unref($t)("common:choose"),
            size: "small",
            severity: "secondary",
            rounded: "",
            outlined: "",
            onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("openPoolList"))
          }, null, 8, ["label"])) : __props.showOpenHistory ? (openBlock(), createBlock(_component_Button, {
            key: 2,
            label: unref($t)("staking-pool:staking-card.view-history"),
            size: "small",
            severity: "secondary",
            rounded: "",
            outlined: "",
            onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("openStakeHistory"))
          }, null, 8, ["label"])) : createCommentVNode("", true)
        ]),
        createVNode(_component_Popover, {
          ref_key: "popoverConfirm",
          ref: popoverConfirm
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_13, [
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("div", _hoisted_15, [
                  createVNode(IconAlert02, {
                    class: normalizeClass(["size-5", noRewards.value ? "text-txt-red" : "text-txt-yellow"])
                  }, null, 8, ["class"]),
                  createTextVNode(" " + toDisplayString(unref($t)("common:warning")), 1)
                ]),
                createBaseVNode("div", _hoisted_16, toDisplayString(noRewards.value ? unref($t)("staking-pool:noRewards", { adaSymbol: unref(adaSymbol) }) : unref($t)("staking-pool:lessRewards")), 1)
              ]),
              createBaseVNode("div", _hoisted_17, [
                createVNode(_component_Button, {
                  label: unref($t)("common:delegate"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: _cache[4] || (_cache[4] = ($event) => delegate(id.value))
                }, null, 8, ["label"])
              ])
            ])
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
});

const _hoisted_1 = { class: "w-full mb-2 flex flex-col" };
const _hoisted_2 = { class: "text-left et-text-sm font-semibold" };
const _hoisted_3 = {
  key: 0,
  class: "flex flex-row et-js-ic et-gap-xs"
};
const _hoisted_4 = { class: "w-24 et-text-sm font-semibold cap-first truncate" };
const _hoisted_5 = { class: "flex flex-row et-js-ic et-gap-xs px-2" };
const _hoisted_6 = {
  key: 1,
  class: "flex flex-row et-js-ic et-gap-xs"
};
const _hoisted_7 = { class: "w-24 et-text-sm font-semibold cap-first truncate" };
const _hoisted_8 = {
  key: 2,
  class: "flex flex-row et-js-ic et-gap-xs"
};
const _hoisted_9 = { class: "w-24 et-text-sm font-semibold cap-first truncate" };
const _hoisted_10 = { class: "flex flex-row et-js-ic et-gap-xs px-2 whitespace-nowrap" };
const _hoisted_11 = {
  key: 3,
  class: "flex flex-row et-js-ic et-gap-xs"
};
const _hoisted_12 = { class: "w-24 et-text-sm font-semibold cap-first truncate" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CardStakePoolCompact",
  props: {
    pool: { type: Object, required: true },
    avgROS: { type: Number, required: false, default: 0 },
    medianROS: { type: Number, required: false, default: 0 },
    delegatedPoolList: { type: Object, required: false, default: () => [] },
    estimate: { type: Boolean, required: false, default: false },
    excludeEpoch: { type: Boolean, required: false, default: false },
    isOpen: { type: Boolean, required: false, default: false },
    currentPool: { type: Boolean, required: false, default: false },
    hideRetired: { type: Boolean, required: false, default: true },
    showOpenPoolList: { type: Boolean, required: false, default: false },
    showOpenHistory: { type: Boolean, required: false, default: false },
    showDelegate: { type: Boolean, required: false, default: true },
    showDetails: { type: Boolean, required: false, default: true }
  },
  emits: ["openPoolList", "openStakeHistory"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const $t = useTranslation().t;
    useNotifications();
    const { adaSymbol } = useAdaSymbol();
    const {
      useCompactFormat,
      formatADAString
    } = useFormatter();
    const id = computed(() => props.pool?.pb);
    const saturation = computed(() => props.pool?.st);
    const saturationPercent = computed(() => props.pool?.stl);
    const margin = computed(() => props.pool?.ma);
    const fixedCost = computed(() => props.pool?.fc);
    const ros = computed(() => props.pool?.mr12 ?? 0);
    const _saturationPercent = computed(() => Math.max(16, Number(Math.min(Math.round((saturationPercent.value ?? 1) * 1e4) / 100, 100).toFixed(1))));
    const _margin = computed(() => Number(((props.pool?.ma ?? 0) * 100).toFixed(2)));
    const _marginReversed = computed(() => Math.max(16, 100 - _margin.value));
    const _pledgePercent = computed(() => !isPledgeMet.value ? 100 : compare(props.pool.pl, "<=", 1e8) ? 20 : 100);
    const _cappedROS = computed(() => ros.value > props.medianROS ? props.medianROS : ros.value);
    const _cappedROSPercent = computed(() => Math.max(16, _cappedROS.value / props.medianROS * 100));
    const isRetired = computed(() => props.pool.rep > 0 && props.pool.rep > props.pool.aep);
    const isRetiredHidden = computed(() => props.hideRetired && isRetired.value && chainTip.value.epochNo > 0 && props.pool.rep < chainTip.value.epochNo - 6);
    const isPledgeMet = computed(() => compare(props.pool.pl, "<=", props.pool.pla));
    const rosBgColor = computed(() => {
      if (ros.value > props.medianROS * 0.87) {
        return "bg-none! bg-green";
      }
      if (ros.value > props.medianROS * 0.74) {
        return "bg-none! bg-yellow";
      }
      return "bg-none! bg-red";
    });
    const saturationBgColor = computed(() => {
      if (saturationPercent.value > 0.9999) {
        return "bg-none! bg-red";
      }
      if (saturationPercent.value > 0.97 || saturationPercent.value < 0.35) {
        return "bg-none! bg-yellow";
      }
      return "bg-none! bg-green";
    });
    const pledgeBgColor = computed(() => {
      if (!isPledgeMet.value) {
        return "bg-none! bg-red";
      }
      if (_pledgePercent.value === 20) {
        return "bg-none! bg-yellow";
      }
      return "bg-none! bg-blue";
    });
    const marginBgColor = computed(() => {
      if (margin.value > 0.05) {
        return "bg-none! bg-red";
      }
      if (margin.value > 0.025) {
        return "bg-none! bg-yellow";
      }
      return "bg-none! bg-green";
    });
    return (_ctx, _cache) => {
      const _component_Divider = resolveComponent("Divider");
      const _component_ProgressBar = resolveComponent("ProgressBar");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return !isRetiredHidden.value ? (openBlock(), createBlock(_component_Card, {
        key: 0,
        class: normalizeClass(["w-full min-w-0", {
          "border-red bg-red/15": isRetired.value || !isPledgeMet.value
        }]),
        pt: {
          body: "flex et-gap-md",
          title: "flex flex-row et-gap-sm et-jb-ic sm:et-jb-is max-2xs:flex-wrap",
          content: "flex flex-col et-gap-sm",
          footer: "flex flex-row et-gap-md et-jc-ic"
        }
      }, {
        title: withCtx(() => [
          createVNode(_sfc_main$1, {
            pool: __props.pool,
            "current-pool": __props.currentPool,
            "show-open-pool-list": __props.showOpenPoolList,
            "show-open-history": __props.showOpenHistory,
            "show-delegate": __props.showDelegate,
            onOpenPoolList: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("openPoolList")),
            onOpenStakeHistory: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("openStakeHistory"))
          }, null, 8, ["pool", "current-pool", "show-open-pool-list", "show-open-history", "show-delegate"])
        ]),
        content: withCtx(() => [
          createVNode(_component_Divider, { class: "mt-0 mb-1" }),
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, toDisplayString(unref($t)("staking-pool:poolId")), 1),
            createVNode(_sfc_main$2, { "pool-id": id.value }, null, 8, ["pool-id"])
          ]),
          __props.showDetails ? withDirectives((openBlock(), createElementBlock("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, toDisplayString(unref($t)("staking-pool:saturation.label")), 1),
            createVNode(_component_ProgressBar, {
              class: "relative grow h-5 rounded-full",
              pt: {
                value: "rounded-full overflow-visible! " + saturationBgColor.value + " " + (saturationPercent.value > 0.35 ? " et-jc-ic " : " et-js-ic "),
                label: "flex flex-row et-jc-ic et-gap-xs text-txt-on-color!"
              },
              value: _saturationPercent.value
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5, [
                  saturationPercent.value > 0.5 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createVNode(_sfc_main$8, {
                      amount: saturation.value,
                      compact: unref(useCompactFormat)(saturation.value, false),
                      "clipboard-enabled": false,
                      "balance-always-visible": ""
                    }, null, 8, ["amount", "compact"]),
                    _cache[2] || (_cache[2] = createTextVNode("- ", -1))
                  ], 64)) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString((Math.round((saturationPercent.value ?? 1) * 1e4) / 100).toFixed(1) + "%"), 1)
                ])
              ]),
              _: 1
            }, 8, ["pt", "value"])
          ])), [
            [_directive_tooltip, unref($t)("staking-pool:saturation.tooltip")]
          ]) : createCommentVNode("", true),
          __props.showDetails ? withDirectives((openBlock(), createElementBlock("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, toDisplayString(unref($t)("staking-pool:pledge.label")), 1),
            createVNode(_component_ProgressBar, {
              class: "grow h-5 rounded-full",
              pt: {
                value: "rounded-full " + pledgeBgColor.value,
                label: "flex flex-row et-jc-ic et-gap-xs text-txt-on-color!"
              },
              value: _pledgePercent.value
            }, {
              default: withCtx(() => [
                !isPledgeMet.value ? (openBlock(), createBlock(IconAlert02, {
                  key: 0,
                  class: "size-4"
                })) : createCommentVNode("", true),
                createVNode(_sfc_main$9, {
                  amount: __props.pool.pl,
                  "css-text-negative": "text-xs font-semibold",
                  "css-text-neutral": "text-xs font-semibold",
                  "css-text-positive": "text-xs font-semibold",
                  "with-sign": false
                }, null, 8, ["amount"])
              ]),
              _: 1
            }, 8, ["pt", "value"])
          ])), [
            [_directive_tooltip, !isPledgeMet.value ? unref($t)("staking-pool:noRewards", { adaSymbol: unref(adaSymbol) }) : void 0]
          ]) : createCommentVNode("", true),
          __props.showDetails ? withDirectives((openBlock(), createElementBlock("div", _hoisted_8, [
            createBaseVNode("div", _hoisted_9, toDisplayString(unref($t)("staking-pool:fees")), 1),
            createVNode(_component_ProgressBar, {
              class: "grow h-5 rounded-full",
              pt: {
                value: "rounded-full overflow-visible! " + marginBgColor.value + " " + (_marginReversed.value > 35 ? " et-jc-ic " : " et-js-ic "),
                label: "flex flex-row et-jc-ic et-gap-xs text-txt-on-color!"
              },
              value: _marginReversed.value
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_10, toDisplayString(_margin.value + "% (" + unref(formatADAString)(fixedCost.value, true, 2, false, false, true) + ")"), 1)
              ]),
              _: 1
            }, 8, ["pt", "value"])
          ])), [
            [_directive_tooltip, unref($t)("staking-pool:margin.tooltip")]
          ]) : createCommentVNode("", true),
          __props.showDetails ? withDirectives((openBlock(), createElementBlock("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, toDisplayString(unref($t)("staking-pool:ros.label")), 1),
            createVNode(_component_ProgressBar, {
              class: "grow h-5 rounded-full",
              pt: {
                value: "rounded-full " + rosBgColor.value,
                label: "flex flex-row et-jc-ic et-gap-xs text-txt-on-color!"
              },
              value: _cappedROSPercent.value
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(ros.value.toFixed(2) + "%"), 1)
              ]),
              _: 1
            }, 8, ["pt", "value"])
          ])), [
            [_directive_tooltip, unref($t)("staking-pool:ros.tooltip")]
          ]) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["class"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main$3 as _, _sfc_main as a, _sfc_main$1 as b, useModalRewardHistory as u };
