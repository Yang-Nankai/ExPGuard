import { d as defineComponent, w as useTranslation, z as resolveComponent, c as createBlock, o as openBlock, y as withCtx, p as createBaseVNode, B as toDisplayString, u as unref, aK as normalizeStyle, D as computed, n as createVNode, H as createTextVNode, e as ref, m as createElementBlock, aE as addSignalListener, aF as removeSignalListener, b4 as onBuiltTxWithdrawal, aC as dispatchSignal, b5 as doBuildTxWithdrawal, x as useScreenSize, t as createCommentVNode, $ as createSlots } from './index.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useModalStakePoolList } from './useModalStakePoolList.js';
import { I as IconStakingOutline } from './IconStakingOutline.js';
import { u as useModalRewardHistory, _ as _sfc_main$7 } from './CardStakePoolCompact.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$8 } from './CardAccountStakePool.vue_vue_type_script_setup_true_lang.js';
import { u as useChainProgress } from './useChainProgress.js';
import { j as add, m as multiply, i as isZero } from './bigmath.js';
import { _ as _sfc_main$4 } from './AdaAmountRaw.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$5 } from './FxPortfolioAnimation.vue_vue_type_script_setup_true_lang.js';
import { a8 as SyncState, E as ErrorBuildTx } from './app2.js';
import { g as getRandomId } from './epochParams.js';
import { g as getTxBuiltErrorMsg } from './error.js';
import { u as useNotifications } from './useNotification.js';
import { F as FxStakingHeader } from './FxStakingHeader.js';
import { _ as _sfc_main$6 } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$9 } from './StakeRewardsChart.vue_vue_type_script_setup_true_lang.js';
import './NetworkId.js';
import './useAppAccountBalances.js';
import './useFormatter.js';
import './language.js';
import './_plugin-vue_export-helper.js';
import './ReceiveListItem.vue_vue_type_script_setup_true_lang.js';
import './useAppMode.js';
import './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import './index3.js';
import './IconCopy01.js';
import './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';
import './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import './IconInformationCircle.js';
import './IconLinkSquare01.js';
import './chainTip.js';
import './chain.js';
import './IconAlert02.js';
import './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import './useBalanceVisible.js';
import './SocialLinksSmall.vue_vue_type_script_setup_true_lang.js';
import './image.js';
import './IconEmail.js';
import './Badge.vue_vue_type_script_setup_true_lang.js';
import './IconCancel01.js';
import './contractMapping.js';
import './index2.js';
import './DrawSVGPlugin.js';
import './ErrorSignTx.js';
import './ErrorSubmitTx.js';
import './notification.js';
import './useNavigation.js';
import './send.js';
import './useResetScroll.js';
import './ButtonRow.js';
import './AdaAmount.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1$3 = { class: "font-semibold" };
const _hoisted_2$3 = { class: "" };
const _hoisted_3$3 = { class: "flex flex-row et-gap-md" };
const _hoisted_4$3 = { class: "relative h-1 grow rounded-full bg-green/25 overflow-hidden" };
const _hoisted_5$3 = { class: "relative h-1 grow rounded-full bg-green/25 overflow-hidden" };
const _hoisted_6$2 = { class: "relative h-1 grow rounded-full bg-green/25 overflow-hidden" };
const _hoisted_7$2 = { class: "relative h-1 grow rounded-full bg-green/25 overflow-hidden" };
const _hoisted_8$2 = { class: "relative h-1 grow rounded-full bg-green/25 overflow-hidden" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "EpochEndCard",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      remainingTimeFull,
      epochPercent
    } = useChainProgress();
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        class: "col-span-2 et-bg-3 et-txt-3 et-border-3",
        pt: { content: "flex flex-col et-gap-sm" }
      }, {
        title: withCtx(() => [
          createBaseVNode("span", _hoisted_1$3, toDisplayString(unref($t)("staking-pool:staking-card.epoch-ends-in")), 1)
        ]),
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_2$3, toDisplayString(unref(remainingTimeFull)), 1),
          createBaseVNode("div", _hoisted_3$3, [
            createBaseVNode("div", _hoisted_4$3, [
              createBaseVNode("div", {
                class: "absolute top-0 bottom-0 left-0 bg-green",
                style: normalizeStyle({ width: Math.min(Math.floor((unref(epochPercent) - 0) * 5 * 100), 100) + "%" })
              }, null, 4)
            ]),
            createBaseVNode("div", _hoisted_5$3, [
              createBaseVNode("div", {
                class: "absolute top-0 bottom-0 left-0 bg-green",
                style: normalizeStyle({ width: Math.min(Math.floor((unref(epochPercent) - 0.2) * 5 * 100), 100) + "%" })
              }, null, 4)
            ]),
            createBaseVNode("div", _hoisted_6$2, [
              createBaseVNode("div", {
                class: "absolute top-0 bottom-0 left-0 bg-green",
                style: normalizeStyle({ width: Math.min(Math.floor((unref(epochPercent) - 0.4) * 5 * 100), 100) + "%" })
              }, null, 4)
            ]),
            createBaseVNode("div", _hoisted_7$2, [
              createBaseVNode("div", {
                class: "absolute top-0 bottom-0 left-0 bg-green",
                style: normalizeStyle({ width: Math.min(Math.floor((unref(epochPercent) - 0.6) * 5 * 100), 100) + "%" })
              }, null, 4)
            ]),
            createBaseVNode("div", _hoisted_8$2, [
              createBaseVNode("div", {
                class: "absolute top-0 bottom-0 left-0 bg-green",
                style: normalizeStyle({ width: Math.min(Math.floor((unref(epochPercent) - 0.8) * 5 * 100), 100) + "%" })
              }, null, 4)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$2 = { class: "relative flex flex-row et-jb-is et-gap-sm" };
const _hoisted_2$2 = { class: "flex flex-col" };
const _hoisted_3$2 = { class: "et-text-sm text-txt-muted" };
const _hoisted_4$2 = { class: "mt-1 et-text-sm text-txt-muted" };
const _hoisted_5$2 = { class: "" };
const _hoisted_6$1 = { class: "mb-4 flex et-ie et-gap-xs et-text-sm" };
const _hoisted_7$1 = { class: "pb-px text-txt-muted" };
const _hoisted_8$1 = { class: "flex flex-col et-js-ie" };
const _hoisted_9$1 = { class: "absolute bottom-0 right-1 size-1" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EarnRewardsEstimate",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      accountData,
      accountSettings
    } = useSelectedAccount();
    const rewardInfo = accountSettings.rewardInfo;
    const lifetimeRewards = computed(() => {
      if (!rewardInfo.value) {
        return "0";
      }
      if (!accountData.value) {
        return "0";
      }
      const rewardList = rewardInfo.value.rewardList;
      let totalRewards = "0";
      for (const reward of rewardList) {
        totalRewards = add(totalRewards, reward.amount);
      }
      return totalRewards;
    });
    const ros = computed(() => {
      if (!rewardInfo.value) {
        return 0;
      }
      if (!accountData.value) {
        return 0;
      }
      const delegation = rewardInfo.value.afterNextDelegations;
      if (!delegation) {
        return 0;
      }
      if (delegation.length === 0) {
        return 0;
      }
      if (typeof delegation[0] === "string") {
        return 0;
      }
      return delegation[0].mr12 ?? 0;
    });
    const estimatedRewards = computed(() => {
      if (!accountData.value) {
        return "0";
      }
      return multiply(ros.value / 100, accountData.value.balance.total);
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        class: "w-full sm:w-auto break-inside-avoid",
        pt: {
          body: "pb-0"
        }
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, [
            createBaseVNode("div", _hoisted_2$2, [
              createBaseVNode("span", _hoisted_3$2, toDisplayString(unref($t)("staking-pool:staking-card.approx-earning")), 1),
              createVNode(_sfc_main$4, {
                cssText: unref(isZero)(estimatedRewards.value) ? "grayscale" : "",
                "css-color": "et-tx-lp-headline et-text-2xl font-semibold",
                amount: estimatedRewards.value,
                "with-sign": false,
                "display-decimals": 2
              }, null, 8, ["cssText", "amount"]),
              createBaseVNode("div", _hoisted_4$2, [
                createTextVNode(toDisplayString(unref($t)("staking-pool:staking-card.lifetime-earning")) + " (", 1),
                createBaseVNode("span", _hoisted_5$2, toDisplayString(unref($t)("staking-pool:staking-card.lifetime-apy")), 1),
                _cache[0] || (_cache[0] = createTextVNode(")", -1))
              ]),
              createBaseVNode("div", _hoisted_6$1, [
                createVNode(_sfc_main$4, {
                  amount: lifetimeRewards.value,
                  "display-decimals": 2,
                  "css-text": "font-semibold et-text-md",
                  "with-sign": false
                }, null, 8, ["amount"]),
                createBaseVNode("div", _hoisted_7$1, toDisplayString(unref($t)("staking-pool:staking-card.lifetime-earned")), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_8$1, [
              createBaseVNode("div", _hoisted_9$1, [
                createVNode(_sfc_main$5, { class: "absolute right-0 bottom-0 size-24 2xs:size-28 sm:size-32" })
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$1 = { class: "col-span-2 flex flex-row flex-wrap et-gap-md" };
const _hoisted_2$1 = { class: "flex flex-col et-js-is" };
const _hoisted_3$1 = { class: "cap-first et-highlight-text" };
const _hoisted_4$1 = { class: "flex flex-col et-js-is" };
const _hoisted_5$1 = { class: "" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StakeRewardHistoryCard",
  props: {
    rewardHistory: { type: Array, required: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const {
      adaSymbol,
      adaCurrency
    } = useAdaSymbol();
    const {
      showWarning,
      showError
    } = useNotifications();
    const {
      openModalRewardHistory
    } = useModalRewardHistory();
    const {
      appAccount,
      accountData
    } = useSelectedAccount();
    const storeId = "Rewards" + getRandomId();
    const syncInfo = computed(() => appAccount.value?.syncInfo);
    const isSyncing = computed(() => syncInfo.value?.state === SyncState.syncing);
    const showWithdrawButton = computed(() => !isZero(accountData.value?.balance.rewards ?? "0") && !isSyncing.value);
    const filterRewardAmountRange = ref(6);
    const rewardAmountByRange = computed(() => {
      let amount = "0";
      if (!props.rewardHistory) {
        return amount;
      }
      for (let i = 0; i < filterRewardAmountRange.value && i < props.rewardHistory.length; i++) {
        amount = add(amount, props.rewardHistory[i].amount);
      }
      return amount;
    });
    const makeWithdrawal = async () => {
      addSignalListener(onBuiltTxWithdrawal, storeId, (res, error) => {
        removeSignalListener(onBuiltTxWithdrawal, storeId);
        if (res?.error) {
          const { msg, isWarning } = getTxBuiltErrorMsg(res ? res.error : ErrorBuildTx.missingAccountData, 0, { value: 0 }, adaSymbol);
          if (msg.length > 0) {
            if (isWarning) {
              showWarning(msg);
            } else {
              showError(msg);
            }
          }
        } else if (error) {
          showError(error);
        }
      });
      await dispatchSignal(doBuildTxWithdrawal);
      removeSignalListener(onBuiltTxWithdrawal, storeId);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_component_Card, {
          class: "grow et-bg-highlight",
          pt: {
            content: "flex flex-row max-xs:flex-wrap et-jb-ic et-gap-md"
          }
        }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("div", _hoisted_3$1, toDisplayString(unref($t)("staking-pool:staking-card.rewards") + ": " + unref($t)("staking-pool:staking-card.times.month")), 1),
              createVNode(_sfc_main$4, {
                amount: rewardAmountByRange.value,
                "display-decimals": 6,
                "css-text-neutral": "font-semibold",
                "css-text-positive": "font-semibold",
                "with-sign": false
              }, null, 8, ["amount"])
            ]),
            createVNode(_component_Button, {
              class: "shrink max-xs:grow et-highlight-text",
              label: unref($t)("staking-pool:staking-card.view-history"),
              rounded: "",
              outlined: "",
              onClick: unref(openModalRewardHistory)
            }, null, 8, ["label", "onClick"])
          ]),
          _: 1
        }),
        createVNode(_component_Card, {
          class: "shrink grow max-w-full",
          pt: {
            content: "flex flex-row max-xs:flex-wrap et-jb-ic et-gap-md"
          }
        }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5$1, toDisplayString(unref($t)("staking-pool:staking-card.unclaimed-ada", { currency: unref(adaCurrency) })), 1),
              createVNode(_sfc_main$4, {
                amount: unref(accountData)?.rewardInfoList?.[0]?.rewards ?? "0",
                "display-decimals": 6,
                "css-text-neutral": "font-semibold",
                "css-text-positive": "font-semibold",
                "with-sign": false
              }, null, 8, ["amount"])
            ]),
            createVNode(_component_Button, {
              class: "shrink max-xs:grow et-highlight-text",
              label: isSyncing.value ? unref($t)("staking-pool:withdrawal.button.syncing") : !showWithdrawButton.value ? unref($t)("staking-pool:withdrawal.button.norewards") : unref($t)("staking-pool:withdrawal.button.label"),
              disabled: !showWithdrawButton.value,
              rounded: "",
              onClick: makeWithdrawal
            }, null, 8, ["label", "disabled"])
          ]),
          _: 1
        })
      ]);
    };
  }
});

const _hoisted_1 = { class: "page-staking flex flex-col et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-js et-gap-md" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "text-txt-muted" };
const _hoisted_5 = {
  key: 0,
  class: "relative @container w-full flex flex-col et-js-is et-gap-md sm:et-gap-md"
};
const _hoisted_6 = { class: "min-w-full @4xl:min-w-200 grid grid-cols-2 et-gap-md" };
const _hoisted_7 = { class: "w-full @4xl:columns-2 et-gap-x-md et-gap-y-md et-space-y-md" };
const _hoisted_8 = { class: "et-space-y-md" };
const _hoisted_9 = { class: "whitespace-pre-line font-semibold" };
const _hoisted_10 = { class: "whitespace-pre-line" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageStaking",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      isSmallerThanXS,
      isSmallerThanSM
    } = useScreenSize();
    const {
      openModalStakePoolList
    } = useModalStakePoolList();
    const {
      appAccount,
      accountSettings
    } = useSelectedAccount();
    const { adaCurrency } = useAdaSymbol();
    const hasStakeHistory = accountSettings.hasStakeHistory;
    const stakedPool = accountSettings.stakedPool;
    const rewardHistory = accountSettings.rewardHistory;
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$6, {
            title: unref($t)("staking-page:title"),
            animation: FxStakingHeader,
            animationClass: "absolut top-0 right-0 w-[45%] -translate-y-[15%]"
          }, createSlots({
            icon: withCtx(() => [
              createVNode(IconStakingOutline, { class: "size-5" })
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_3, toDisplayString(unref($t)("staking-page:caption", { currency: unref(adaCurrency) })), 1)
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_4, toDisplayString(unref($t)("staking-page:subCaption")), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"]),
          unref(appAccount) ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              unref(hasStakeHistory) ? (openBlock(), createBlock(_sfc_main$1, {
                key: 0,
                "reward-history": unref(rewardHistory)
              }, null, 8, ["reward-history"])) : createCommentVNode("", true),
              !unref(isSmallerThanSM) ? (openBlock(), createBlock(_sfc_main$3, { key: 1 })) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                unref(hasStakeHistory) ? (openBlock(), createBlock(_sfc_main$9, {
                  key: 0,
                  class: "break-inside-avoid",
                  "chart-height": "@md:h-53",
                  "show-button": false
                })) : createCommentVNode("", true),
                createVNode(_sfc_main$7)
              ]),
              !unref(hasStakeHistory) || !unref(stakedPool) ? (openBlock(), createBlock(_component_Card, {
                key: 0,
                class: "break-inside-avoid",
                pt: {
                  content: "flex flex-row et-jb-ic et-gap-lg break-inside-avoid"
                }
              }, {
                title: withCtx(() => [
                  createBaseVNode("div", _hoisted_9, toDisplayString(unref($t)("staking-page:staking-cta.title")), 1)
                ]),
                content: withCtx(() => [
                  createBaseVNode("div", _hoisted_10, toDisplayString(unref($t)("staking-page:staking-cta.caption")), 1),
                  createVNode(_component_Button, {
                    label: unref($t)("staking-page:staking-cta.button"),
                    rounded: "",
                    onClick: _cache[0] || (_cache[0] = ($event) => unref(openModalStakePoolList)())
                  }, null, 8, ["label"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_sfc_main$8),
              createVNode(_sfc_main$2)
            ])
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

export { _sfc_main as default };
