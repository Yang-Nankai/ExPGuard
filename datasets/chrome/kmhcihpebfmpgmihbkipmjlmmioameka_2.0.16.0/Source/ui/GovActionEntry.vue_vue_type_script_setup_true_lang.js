import { d as defineComponent, w as useTranslation, D as computed, m as createElementBlock, o as openBlock, p as createBaseVNode, B as toDisplayString, u as unref, c as createBlock, y as withCtx, n as createVNode, Y as toRefs, t as createCommentVNode, e as ref, P as networkId, Q as reactive, G as watch, V as normalizeClass, z as resolveComponent, U as withModifiers, a1 as withDirectives, a2 as resolveDirective, aj as api, F as Fragment, H as createTextVNode } from './index.js';
import { j as add, f as isGreaterThanZero } from './bigmath.js';
import { _ as _sfc_main$9 } from './Badge.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$8 } from './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import { g as getDRepVoteList, c as useDRepInfo } from './useSelectedAccount.js';
import { I as IconChevronUp } from './IconChevronUp.js';
import { I as IconChevronDown } from './IconChevronDown.js';
import { _ as _sfc_main$b } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$6 } from './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import { c as _sfc_main$a } from './CardDRep2.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1$2 = { class: "flex flex-col" };
const _hoisted_2$2 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_3$2 = { class: "font-semibold" };
const _hoisted_4$2 = { class: "flex flex-row et-js-is et-gap-xs text-sm text-left" };
const _hoisted_5$2 = { class: "w-full break-all" };
const _hoisted_6$2 = {
  key: 1,
  class: "flex flex-row et-is-ic et-gap-sm break-all"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TransactionItemHash",
  props: {
    txHash: { type: String, required: false, default: "" },
    hasLink: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const txHash = computed(() => props.txHash ?? "");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("span", _hoisted_3$2, toDisplayString(unref($t)("tx-details:txId")), 1)
        ]),
        createBaseVNode("div", _hoisted_4$2, [
          __props.hasLink ? (openBlock(), createBlock(_sfc_main$6, {
            key: 0,
            type: "transaction",
            subject: { txHash: txHash.value },
            "copy-text": txHash.value,
            "hide-transaction-expand": ""
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_5$2, toDisplayString(txHash.value), 1)
            ]),
            _: 1
          }, 8, ["subject", "copy-text"])) : (openBlock(), createElementBlock("div", _hoisted_6$2, [
            createBaseVNode("div", null, toDisplayString(txHash.value), 1),
            createVNode(_sfc_main$7, { "copy-text": txHash.value }, null, 8, ["copy-text"])
          ]))
        ])
      ]);
    };
  }
});

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "GovActionId",
  props: {
    govActionId: { type: String, required: true },
    fullWidth: { type: Boolean, required: false, default: true },
    noShortenedAddress: { type: Boolean, required: false, default: false },
    popoverLeft: { type: Boolean, required: false, default: false },
    popoverRight: { type: Boolean, required: false, default: false },
    small: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$8, {
        content: __props.govActionId,
        fullWidth: __props.fullWidth,
        noShortenedAddress: __props.noShortenedAddress,
        popoverLeft: __props.popoverLeft,
        popoverRight: __props.popoverRight,
        small: __props.small,
        "explorer-link-type": "govProposal",
        "explorer-link-subject": __props.govActionId
      }, null, 8, ["content", "fullWidth", "noShortenedAddress", "popoverLeft", "popoverRight", "small", "explorer-link-subject"]);
    };
  }
});

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BadgeGovActionStatus",
  props: {
    govAction: { type: Object, required: false, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { govAction } = toRefs(props);
    const $t = useTranslation().t;
    const badgeStatus = computed(() => {
      if (!govAction?.value) {
        return void 0;
      }
      if (govAction.value.ee) {
        return { id: "action-enacted", label: $t("common:action.status.enacted"), bgColor: "var(--color-purple-700)" };
      }
      if (govAction.value.de) {
        return { id: "action-dropped", label: $t("common:action.status.dropped"), bgColor: "var(--color-bg-3)" };
      }
      if (govAction.value.xe) {
        return { id: "action-expired", label: $t("common:action.status.expired"), bgColor: "var(--color-bg-3)" };
      }
      if (govAction.value.re) {
        return { id: "action-ratified", label: $t("common:action.status.ratified"), bgColor: "var(--color-bg-3)" };
      }
      return { id: "action-active", label: $t("common:action.status.active"), bgColor: "var(--color-green)" };
    });
    return (_ctx, _cache) => {
      return badgeStatus.value ? (openBlock(), createBlock(_sfc_main$9, {
        key: 0,
        badge: badgeStatus.value
      }, null, 8, ["badge"])) : createCommentVNode("", true);
    };
  }
});

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BadgeGovActionType",
  props: {
    govAction: { type: Object, required: false, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { govAction } = toRefs(props);
    const $t = useTranslation().t;
    const badgeType = computed(() => {
      if (!govAction?.value) {
        return void 0;
      }
      return {
        id: "action-type-" + govAction.value.t.toLowerCase(),
        label: $t("common:action.type." + govAction.value.t.toLowerCase())
      };
    });
    return (_ctx, _cache) => {
      return badgeType.value ? (openBlock(), createBlock(_sfc_main$9, {
        key: 0,
        badge: badgeType.value
      }, null, 8, ["badge"])) : createCommentVNode("", true);
    };
  }
});

const pendingVoteMap = /* @__PURE__ */ new Map();
const didUpdatePendingVotes = ref(0);
const ensurePendingVoteMap = (dRepId) => {
  if (!pendingVoteMap.has(dRepId)) {
    pendingVoteMap.set(dRepId, reactive([]));
  }
};
const updatePendingVote = (dRepId, vote) => {
  ensurePendingVoteMap(dRepId);
  const pendingVoteList = pendingVoteMap.get(dRepId);
  if (pendingVoteList) {
    const existingVoteIndex = pendingVoteList.findIndex((v) => v.g === vote.g);
    if (existingVoteIndex >= 0) {
      pendingVoteList[existingVoteIndex] = vote;
    } else {
      pendingVoteList.push(vote);
    }
  }
  checkPendingVotesAlreadyCast(dRepId);
  didUpdatePendingVotes.value++;
  cachePendingVoteMap();
};
const removePendingVote = (dRepId, govActionId) => {
  ensurePendingVoteMap(dRepId);
  const pendingVoteList = pendingVoteMap.get(dRepId);
  if (pendingVoteList) {
    const voteIndex = pendingVoteList.findIndex((v) => v.g === govActionId);
    if (voteIndex >= 0) {
      pendingVoteList.splice(voteIndex, 1);
    }
  }
  didUpdatePendingVotes.value++;
  cachePendingVoteMap();
};
const checkPendingVotesAlreadyCast = async (dRepId) => {
  ensurePendingVoteMap(dRepId);
  const pendingVoteList = pendingVoteMap.get(dRepId);
  const dRepVoteList = await getDRepVoteList(dRepId);
  let _didUpdatePendingVotes = false;
  for (let i = pendingVoteList.length - 1; i >= 0; i--) {
    const vote = pendingVoteList[i];
    const castVote = dRepVoteList.find((v) => v.g === vote.g);
    if (castVote) {
      if (vote.v === castVote.v && vote.u && castVote.u) {
        pendingVoteList.splice(i, 1);
        _didUpdatePendingVotes = true;
      }
    }
  }
  if (_didUpdatePendingVotes) {
    didUpdatePendingVotes.value++;
    cachePendingVoteMap();
  }
};
const getPendingVotes = (dRepId) => {
  ensurePendingVoteMap(dRepId);
  return pendingVoteMap.get(dRepId);
};
const hydratePendingVoteMap = () => {
  if (pendingVoteMap.size === 0) {
    const cachedMap = localStorage.getItem("pendingVoteMap_" + networkId.value);
    if (cachedMap) {
      const parsedMap = JSON.parse(cachedMap);
      for (const dRepId in parsedMap) {
        if (parsedMap.hasOwnProperty(dRepId)) {
          pendingVoteMap.set(dRepId, reactive(parsedMap[dRepId]));
        }
      }
    }
  }
};
const cachePendingVoteMap = () => {
  const map = Object.fromEntries(pendingVoteMap.entries());
  localStorage.setItem("pendingVoteMap_" + networkId.value, JSON.stringify(map));
};
const useDRepPendingVotes = () => {
  hydratePendingVoteMap();
  return {
    didUpdatePendingVotes,
    updatePendingVote,
    getPendingVotes,
    removePendingVote,
    checkPendingVotesAlreadyCast
  };
};

const _isTweeningOut = ref(false);
const _govAction = ref(null);
const tweenOutModal = () => {
};
const toggleModalGovVote = (govAction) => {
  if (_govAction.value && govAction) {
    if (_govAction.value.b === govAction.b) {
      return;
    }
  }
  openModalGovVote(govAction);
};
const openModalGovVote = (govAction) => {
  _govAction.value = govAction;
};
const closeModalGovVote = () => {
  _govAction.value = null;
};
const useModalGovVote = (tweenOutTrigger) => {
  return {
    showModalGovVote: computed(() => !!_govAction.value),
    govAction: computed(() => _govAction.value),
    tweenOutModal,
    isTweeningOut: _isTweeningOut,
    openModalGovVote,
    toggleModalGovVote,
    closeModalGovVote
  };
};

const _hoisted_1$1 = { class: "w-full max-w-full flex flex-row et-gap-sm et-js-is" };
const _hoisted_2$1 = {
  key: 0,
  class: "grow shrink flex flex-col"
};
const _hoisted_3$1 = { class: "text-left et-text-sm font-semibold" };
const _hoisted_4$1 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_5$1 = { class: "grow h-10 flex et-je-ic et-gap-sm" };
const _hoisted_6$1 = {
  key: 0,
  class: "h-full flex flex-col et-jc-is"
};
const _hoisted_7$1 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_8$1 = {
  key: 0,
  class: "w-full flex flex-row et-gap-sme et-js-is"
};
const _hoisted_9$1 = {
  key: 1,
  class: "w-full text-start break-all"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GovActionVote",
  props: {
    govAction: { type: Object, required: true },
    dRepId: { type: String, required: true },
    showNotVoted: { type: Boolean, default: false },
    noCard: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const {
      govAction,
      dRepId
    } = toRefs(props);
    const $t = useTranslation().t;
    const dRepInfo = useDRepInfo(dRepId);
    const {
      dRepVoteList,
      dRepVotePower
    } = dRepInfo;
    const {
      didUpdatePendingVotes,
      getPendingVotes
    } = useDRepPendingVotes();
    const { openModalGovVote } = useModalGovVote();
    const isOpen = ref(false);
    const pendingVoteList = ref([]);
    watch(didUpdatePendingVotes, () => {
      if (!dRepId.value) {
        pendingVoteList.value = [];
        return;
      }
      pendingVoteList.value = getPendingVotes(dRepId.value);
    }, { immediate: true });
    const isPendingVote = computed(() => {
      const _vote = dRepVoteList.value.find((v) => v.g === govAction.value.b);
      const _pendingVote = pendingVoteList.value.find((v) => v.g === govAction.value.b);
      if (!_vote) {
        return !!_pendingVote;
      }
      if (!_pendingVote) {
        return false;
      }
      if (_vote.v === _pendingVote.v) {
        return false;
      }
      return true;
    });
    const vote = computed(() => {
      let _vote = pendingVoteList.value.find((v) => v.g === govAction.value.b) ?? null;
      const _castVote = dRepVoteList.value.find((v) => v.g === govAction.value.b);
      if (!_vote && _castVote) {
        _vote = _castVote;
      }
      if (!_vote && props.showNotVoted) {
        return {
          b: dRepId.value,
          g: govAction.value.b,
          h: "",
          s: 0,
          v: "NotVoted",
          c: null,
          u: null,
          p: dRepVotePower.value
        };
      }
      return _vote ?? null;
    });
    const hideVote = computed(() => {
      if (!dRepId.value) {
        return true;
      }
      return !vote.value || vote.value.v === "NotVoted" && !props.showNotVoted;
    });
    const badgeVote = computed(() => {
      if (!vote.value?.v) {
        return void 0;
      }
      const v = vote.value.v;
      if (v === "No") {
        return {
          id: "vote-no",
          label: $t("common:vote.no"),
          action: () => openModalGovVote(govAction.value)
        };
      } else if (v === "NotVoted") {
        return {
          id: "vote-notVoted",
          label: $t("common:vote.notVoted"),
          action: () => openModalGovVote(govAction.value)
        };
      } else if (v === "Yes") {
        return {
          id: "vote-yes",
          label: $t("common:vote.yes"),
          action: () => openModalGovVote(govAction.value)
        };
      } else if (v === "Abstain") {
        return {
          id: "vote-abstain",
          label: $t("common:vote.abstain"),
          action: () => openModalGovVote(govAction.value)
        };
      }
      return void 0;
    });
    const badgePendingVote = computed(() => {
      if (!isPendingVote.value) {
        return void 0;
      }
      return {
        id: "pending",
        label: $t("common:status.pending"),
        action: () => openModalGovVote(govAction.value)
      };
    });
    const badgeNoRational = computed(() => {
      return {
        id: "noRational",
        label: $t("common:status.noRational"),
        action: () => openModalGovVote(govAction.value)
      };
    });
    watch([vote, isOpen], async () => {
      if (vote.value && isOpen.value) {
        if (!vote.value.c && !!vote.value.u) {
          const url = `/${networkId.value}/v2/gov/vote/data`;
          const res = await api.post(url, {
            url: vote.value.u
          }).catch((err) => {
            console.error("Error fetching vote rationale:", err);
          });
          vote.value.c = res?.data;
        }
      }
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return vote.value && !hideVote.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([__props.noCard ? "" : "p-card px-3 pt-3 pb-3", "relative w-full max-w-full flex flex-wrap et-gap-sme et-js-is"])
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(_sfc_main$a, {
            "drep-info": unref(dRepInfo),
            "hide-badge-active": ""
          }, null, 8, ["drep-info"]),
          vote.value.p && vote.value.p !== "0" ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            createBaseVNode("div", _hoisted_3$1, toDisplayString(unref($t)("governance-drepInfo:votingPower")), 1),
            createBaseVNode("div", _hoisted_4$1, [
              createVNode(_sfc_main$b, {
                "show-fraction": false,
                amount: vote.value.p,
                "balance-always-visible": ""
              }, null, 8, ["amount"])
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_5$1, [
            vote.value.u ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
              createVNode(_component_Button, {
                class: "p-1",
                severity: "secondary",
                rounded: "",
                text: "",
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => isOpen.value = !isOpen.value, ["prevent", "stop"]))
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_7$1, [
                    isOpen.value ? (openBlock(), createBlock(IconChevronUp, {
                      key: 0,
                      class: "size-6"
                    })) : (openBlock(), createBlock(IconChevronDown, {
                      key: 1,
                      class: "size-6 mt-0.25"
                    }))
                  ])
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true),
            badgePendingVote.value && !vote.value.u ? (openBlock(), createBlock(_sfc_main$9, {
              key: 1,
              badge: badgeNoRational.value,
              size: "tiny",
              "add-colors": ""
            }, null, 8, ["badge"])) : createCommentVNode("", true),
            badgePendingVote.value ? (openBlock(), createBlock(_sfc_main$9, {
              key: 2,
              badge: badgePendingVote.value,
              size: "tiny",
              "add-colors": ""
            }, null, 8, ["badge"])) : createCommentVNode("", true),
            badgeVote.value ? (openBlock(), createBlock(_sfc_main$9, {
              key: 3,
              badge: badgeVote.value,
              size: "tiny",
              "add-colors": ""
            }, null, 8, ["badge"])) : createCommentVNode("", true)
          ])
        ]),
        isOpen.value && vote.value.v !== "NotVoted" ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
          vote.value.h ? (openBlock(), createBlock(_sfc_main$5, {
            key: 0,
            class: "et-text-sm",
            "has-link": true,
            "tx-hash": vote.value.h
          }, null, 8, ["tx-hash"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        isOpen.value && vote.value.c ? (openBlock(), createElementBlock("div", _hoisted_9$1, toDisplayString(vote.value.c), 1)) : createCommentVNode("", true),
        isOpen.value && vote.value.u ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: "w-full flex flex-row et-gap-sme et-js-ic break-all",
          onClick: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["stop"]))
        }, [
          withDirectives(createVNode(_component_Button, {
            class: "grow-0 flex flex-row et-js-ic et-gap-xs",
            as: "a",
            label: "Rationale",
            href: vote.value.u,
            target: "_blank",
            rel: "noopener noreferrer",
            size: "small",
            severity: "secondary",
            rounded: "",
            outlined: ""
          }, null, 8, ["href"]), [
            [
              _directive_tooltip,
              vote.value.u,
              void 0,
              { top: true }
            ]
          ])
        ])) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1 = { class: "w-full flex flex-row et-js-ic et-gap-md truncate" };
const _hoisted_2 = { class: "w-full shrink grow flex flex-col et-gap-xs truncate" };
const _hoisted_3 = { class: "w-full grow flex max-sm:flex-wrap et-gap-sm et-jb-ic" };
const _hoisted_4 = { class: "truncate" };
const _hoisted_5 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_6 = { class: "w-full flex flex-col" };
const _hoisted_7 = { class: "text-left et-text-sm font-semibold" };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = { class: "flex flex-col et-gap-md text-start" };
const _hoisted_10 = { class: "flex flex-row et-gap-md" };
const _hoisted_11 = { class: "font-semibold et-text-md" };
const _hoisted_12 = { class: "et-text-sm" };
const _hoisted_13 = { key: 0 };
const _hoisted_14 = { class: "font-semibold et-text-md" };
const _hoisted_15 = { class: "et-text-sm" };
const _hoisted_16 = { key: 1 };
const _hoisted_17 = { class: "font-semibold et-text-md" };
const _hoisted_18 = { class: "et-text-sm" };
const _hoisted_19 = { class: "font-semibold et-text-md" };
const _hoisted_20 = { class: "et-text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GovActionEntry",
  props: {
    govAction: { type: Object, required: true },
    dRepId: { type: String, required: false },
    isGovDelegatedToSelf: { type: Boolean, default: false },
    showNotVoted: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { govAction } = toRefs(props);
    const $t = useTranslation().t;
    const govActionName = computed(() => {
      if (!govAction.value) {
        return void 0;
      }
      return govAction.value.n ?? govAction.value.b.slice(0, 16) + "..." + govAction.value.b.slice(-10) + "\n (No metadata available)";
    });
    const votesYes = computed(() => {
      let _totalVotes = 0;
      let _totalWeight = "0";
      try {
        _totalVotes += govAction.value.v.d?.c?.y ?? 0;
        _totalVotes += govAction.value.v.s?.c?.y ?? 0;
        _totalWeight += add(_totalWeight, govAction.value.v?.d?.p?.y ?? 0);
        _totalWeight += add(_totalWeight, govAction.value.v?.s?.p?.y ?? 0);
      } catch (e) {
        console.error(e, govAction.value);
      }
      return {
        voteCount: _totalVotes,
        voteWeight: _totalWeight
      };
    });
    const votesNo = computed(() => {
      let _totalVotes = 0;
      let _totalWeight = "0";
      try {
        _totalVotes += govAction.value.v.d?.c?.n ?? 0;
        _totalVotes += govAction.value.v.s?.c?.n ?? 0;
        _totalWeight += add(_totalWeight, govAction.value.v?.d?.p?.n ?? 0);
        _totalWeight += add(_totalWeight, govAction.value.v?.s?.p?.n ?? 0);
      } catch (e) {
        console.error(e, govAction.value);
      }
      return {
        voteCount: _totalVotes,
        voteWeight: _totalWeight
      };
    });
    const votesAbstain = computed(() => {
      let _totalVotes = 0;
      let _totalWeight = "0";
      try {
        _totalVotes += govAction.value.v.d?.c?.a ?? 0;
        _totalVotes += govAction.value.v.s?.c?.a ?? 0;
        _totalWeight += add(_totalWeight, govAction.value.v?.d?.p?.a ?? 0);
        _totalWeight += add(_totalWeight, govAction.value.v?.s?.p?.a ?? 0);
      } catch (e) {
        console.error(e, govAction.value);
      }
      return {
        voteCount: _totalVotes,
        voteWeight: _totalWeight
      };
    });
    const voteGroups = computed(() => {
      let _groups = [];
      _groups.push({
        label: "Yes votes",
        color: "var(--color-green)",
        value: votesYes.value.voteCount
      });
      _groups.push({
        label: "No votes",
        color: "var(--color-red)",
        value: votesNo.value.voteCount
      });
      _groups.push({
        label: "Abstain votes",
        color: "var(--color-yellow)",
        value: votesAbstain.value.voteCount
      });
      return _groups;
    });
    const totalVotes = computed(() => {
      let _totalVotes = add(
        add(
          votesYes.value.voteCount,
          votesNo.value.voteCount
        ),
        votesAbstain.value.voteCount
      );
      let _totalVoteWeight = add(
        add(
          votesYes.value.voteWeight,
          votesNo.value.voteWeight
        ),
        votesAbstain.value.voteWeight
      );
      return {
        voteCount: _totalVotes,
        voteWeight: _totalVoteWeight
      };
    });
    return (_ctx, _cache) => {
      const _component_Divider = resolveComponent("Divider");
      const _component_MeterGroup = resolveComponent("MeterGroup");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_Card, {
        class: "h-full min-w-0",
        pt: {
          body: "h-full flex et-gap-md",
          title: "w-full flex flex-row et-gap-md et-jb-ic sm:et-jb-is",
          content: "h-full flex flex-col et-gap-md max-w-full",
          footer: "       flex flex-row et-gap-md et-jc-ic"
        }
      }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                withDirectives((openBlock(), createElementBlock("div", _hoisted_4, [
                  createTextVNode(toDisplayString(govActionName.value), 1)
                ])), [
                  [
                    _directive_tooltip,
                    {
                      value: govActionName.value,
                      pt: {
                        text: "inline-block whitespace-nowrap"
                      }
                    },
                    void 0,
                    { top: true }
                  ]
                ]),
                createBaseVNode("div", _hoisted_5, [
                  createVNode(_sfc_main$2, {
                    "gov-action": unref(govAction),
                    size: "small"
                  }, null, 8, ["gov-action"]),
                  createVNode(_sfc_main$3, {
                    "gov-action": unref(govAction),
                    size: "small"
                  }, null, 8, ["gov-action"])
                ])
              ])
            ])
          ])
        ]),
        content: withCtx(() => [
          createVNode(_component_Divider, { class: "-my-1" }),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, toDisplayString(unref($t)("governance-drepInfo:govAction.id")), 1),
            unref(govAction).b ? (openBlock(), createBlock(_sfc_main$4, {
              key: 0,
              "gov-action-id": unref(govAction).b
            }, null, 8, ["gov-action-id"])) : (openBlock(), createElementBlock("span", _hoisted_8, toDisplayString(unref($t)("governance-drepInfo:govAction.missing")), 1))
          ]),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_11, toDisplayString(unref($t)("governance-govActionList:proposedEpoch")), 1),
                createBaseVNode("div", _hoisted_12, toDisplayString(unref(govAction).pe), 1)
              ]),
              unref(govAction)?.xe ? (openBlock(), createElementBlock("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, toDisplayString(unref($t)("governance-govActionList:expiryEpoch")), 1),
                createBaseVNode("div", _hoisted_15, toDisplayString(unref(govAction).xe), 1)
              ])) : createCommentVNode("", true),
              unref(govAction)?.ee ? (openBlock(), createElementBlock("div", _hoisted_16, [
                createBaseVNode("div", _hoisted_17, toDisplayString(unref($t)("governance-govActionList:enactedEpoch")), 1),
                createBaseVNode("div", _hoisted_18, toDisplayString(unref(govAction).ee), 1)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_19, toDisplayString(unref($t)("governance-govActionList:totalVotes")), 1),
                createBaseVNode("div", _hoisted_20, toDisplayString(totalVotes.value.voteCount), 1)
              ])
            ]),
            unref(isGreaterThanZero)(totalVotes.value.voteCount) ? (openBlock(), createBlock(_component_MeterGroup, {
              key: 0,
              pt: { labeltext: "et-text-sm" },
              value: voteGroups.value,
              max: parseFloat(totalVotes.value.voteCount)
            }, null, 8, ["value", "max"])) : createCommentVNode("", true)
          ]),
          unref(govAction) && __props.dRepId && __props.isGovDelegatedToSelf ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createVNode(_component_Divider, { class: "mt-0 mb-1" }),
            unref(govAction) && __props.dRepId ? (openBlock(), createBlock(_sfc_main$1, {
              key: 0,
              "gov-action": unref(govAction),
              "d-rep-id": __props.dRepId,
              "show-not-voted": __props.showNotVoted,
              "no-card": ""
            }, null, 8, ["gov-action", "d-rep-id", "show-not-voted"])) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});

export { _sfc_main as _, _sfc_main$4 as a, _sfc_main$1 as b, _sfc_main$5 as c, _sfc_main$2 as d, _sfc_main$3 as e, useModalGovVote as f, useDRepPendingVotes as u };
