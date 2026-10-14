import { d as defineComponent, w as useTranslation, e as ref, G as watch, f as onMounted, m as createElementBlock, o as openBlock, F as Fragment, p as createBaseVNode, n as createVNode, u as unref, z as resolveComponent, V as normalizeClass, ae as isRef, c as createBlock, t as createCommentVNode, l as useTheme, S as renderList, y as withCtx, U as withModifiers, D as computed, H as createTextVNode, B as toDisplayString, a5 as useDarkMode, aC as dispatchSignal, b6 as doBuildTxVoteGovActions, v as createStaticVNode, x as useScreenSize, $ as createSlots, P as networkId } from './index.js';
import { e as epochParams } from './epochParams.js';
import { u as useSelectedAccount, a as updateFilteredDReps, t as totalVoteStake, b as autoDRepList, f as filteredDRepList, n as numDReps, d as dRepList } from './useSelectedAccount.js';
import { I as IconVoting } from './IconVoting.js';
import { _ as _sfc_main$e } from './TabsToSelect.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$f } from './BannerWarning.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$d } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import { u as useModalDRepRegistration, a as useModalDRepList, _ as _sfc_main$g } from './CardDRep2.vue_vue_type_script_setup_true_lang.js';
import { f as filteredGovActionList, u as updateFilteredGovActions, p as proposalTypeFilters, a as activeProposalTypeFilters, b as proposalStatusFilters, c as activeProposalStatusFilters, g as govActionList, n as numGovActions, d as numActive, e as numEnacted } from './govActionList.js';
import { u as usePaginator } from './usePaginator.js';
import { u as useModalGovActionViewer } from './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$b } from './InputSearch.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$c, u as useDRepPendingVotes } from './GovActionEntry.vue_vue_type_script_setup_true_lang.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useNotifications } from './useNotification.js';
import { a9 as isGovDRepSupported } from './app2.js';
import { s as sleep } from './useAppAccountBalances.js';
import { p as parseTxSignRequest } from './parse.js';
import { g as gsapWithCSS } from './index2.js';
import { D as DrawSVGPlugin } from './DrawSVGPlugin.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import './NetworkId.js';
import './bigmath.js';
import './IconAlert02.js';
import './error.js';
import './ErrorSignTx.js';
import './ErrorSubmitTx.js';
import './useFormatter.js';
import './language.js';
import './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import './index3.js';
import './useBalanceVisible.js';
import './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import './ButtonRow.js';
import './SocialLinksSmall.vue_vue_type_script_setup_true_lang.js';
import './image.js';
import './IconEmail.js';
import './Badge.vue_vue_type_script_setup_true_lang.js';
import './IconCancel01.js';
import './contractMapping.js';
import './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import './IconCopy01.js';
import './IconInformationCircle.js';
import './IconLinkSquare01.js';
import './IconSearch01.js';
import './IconChevronUp.js';
import './IconChevronDown.js';
import './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import './notification.js';
import './useSignTx.js';
import './creds.js';
import './chain.js';

const _hoisted_1$a = { class: "w-full flex flex-col et-gap-md et-js-is" };
const _hoisted_2$9 = { class: "w-full flex flex-wrap et-gap-md" };
const _hoisted_3$7 = { class: "relative max-w-full grow flex flex-wrap et-gap-sm et-js-ic" };
const _hoisted_4$5 = { class: "w-full flex flex-row flex-wrap et-gap-md et-jb-ic" };
const _hoisted_5$5 = { class: "grid grid-cols-1 xl:grid-cols-2 et-gap-md" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "GovActionList",
  props: {
    showPendingVotes: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const $t = useTranslation().t;
    const {
      getPaginatorTemplate
    } = useTheme();
    const {
      govAction,
      toggleModalGovActionViewer
    } = useModalGovActionViewer();
    const { accountGovernance } = useSelectedAccount();
    const {
      isGovDelegatedToSelf,
      delegatedDRepId
    } = accountGovernance;
    const filterSearchInput = ref("");
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      onPageStateUpdate
    } = usePaginator(filteredGovActionList, 4);
    const onFilterReset = () => {
      filterSearchInput.value = "";
    };
    watch(filterSearchInput, () => {
      updateFilteredGovActions(filterSearchInput.value);
    });
    onMounted(() => {
      onFilterReset();
      updateFilteredGovActions(filterSearchInput.value);
    });
    return (_ctx, _cache) => {
      const _component_MultiSelect = resolveComponent("MultiSelect");
      const _component_Paginator = resolveComponent("Paginator");
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$a, [
          createBaseVNode("div", _hoisted_2$9, [
            createVNode(_sfc_main$b, {
              class: "max-w-[400px]",
              input: filterSearchInput.value,
              "onUpdate:input": _cache[0] || (_cache[0] = ($event) => filterSearchInput.value = $event),
              placeholder: unref($t)("governance-govActionList:filter.search")
            }, null, 8, ["input", "placeholder"]),
            createBaseVNode("div", _hoisted_3$7, [
              createVNode(_component_MultiSelect, {
                modelValue: unref(activeProposalTypeFilters),
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(activeProposalTypeFilters) ? activeProposalTypeFilters.value = $event : null),
                class: normalizeClass(["rounded-full p-0 max-w-full", unref(activeProposalTypeFilters).length === 0 ? "pl-2" : ""]),
                pt: { dropdown: "w-auto! pl-1 pr-3" },
                options: unref(proposalTypeFilters),
                display: "chip",
                optionLabel: "primaryLabel",
                placeholder: unref($t)("governance-govActionList:select.proposalType"),
                filter: false,
                showToggleAll: false
              }, null, 8, ["modelValue", "class", "options", "placeholder"]),
              createVNode(_component_MultiSelect, {
                modelValue: unref(activeProposalStatusFilters),
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(activeProposalStatusFilters) ? activeProposalStatusFilters.value = $event : null),
                class: normalizeClass(["rounded-full p-0 max-w-full", unref(activeProposalStatusFilters).length === 0 ? "pl-2" : ""]),
                pt: { dropdown: "w-auto! pl-1 pr-3" },
                options: unref(proposalStatusFilters),
                display: "chip",
                optionLabel: "primaryLabel",
                placeholder: unref($t)("governance-govActionList:select.proposalStatus"),
                filter: false,
                showToggleAll: false
              }, null, 8, ["modelValue", "class", "options", "placeholder"])
            ])
          ]),
          createBaseVNode("div", _hoisted_4$5, [
            unref(numPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
              key: 0,
              "page-link-size": 3,
              template: unref(getPaginatorTemplate)(),
              rows: unref(numItemsPerPage),
              "total-records": unref(numItems),
              pt: { content: "flex flex-row flex-nowrap" },
              onPage: unref(onPageStateUpdate)
            }, null, 8, ["template", "rows", "total-records", "onPage"])) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_5$5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(page), (_govAction) => {
            return openBlock(), createBlock(_component_Button, {
              unstyled: "",
              class: "gov-action-list w-full p-0 et-js-ic rounded-card shadow-sm cursor-pointer border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)] hover:bg-[var(--p-button-text-secondary-hover-background)]",
              severity: "secondary",
              "data-ui": unref(govAction)?.b === _govAction.b ? "active" : "",
              text: "",
              onClick: withModifiers(($event) => unref(toggleModalGovActionViewer)(_govAction), ["prevent", "stop"])
            }, {
              default: withCtx(() => [
                _govAction ? (openBlock(), createBlock(_sfc_main$c, {
                  key: 0,
                  class: "w-full bg-transparent border-0",
                  "gov-action": _govAction,
                  "d-rep-id": unref(delegatedDRepId) ?? void 0,
                  "is-gov-delegated-to-self": unref(isGovDelegatedToSelf),
                  "show-not-voted": ""
                }, null, 8, ["gov-action", "d-rep-id", "is-gov-delegated-to-self"])) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["data-ui", "onClick"]);
          }), 256))
        ])
      ], 64);
    };
  }
});

const _hoisted_1$9 = { class: "w-full flex flex-col et-gap-lg et-js-is" };
const _hoisted_2$8 = {
  key: 1,
  class: "grid grid-cols-1 xl:grid-cols-2 et-gap-md"
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "GovPendingVoteList",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      govAction,
      toggleModalGovActionViewer
    } = useModalGovActionViewer();
    const { accountGovernance } = useSelectedAccount();
    const {
      didUpdatePendingVotes,
      getPendingVotes,
      checkPendingVotesAlreadyCast
    } = useDRepPendingVotes();
    const dRepId = accountGovernance.delegatedDRepId;
    const isGovDelegatedToSelf = accountGovernance.isGovDelegatedToSelf;
    const pendingVoteList = ref([]);
    watch(didUpdatePendingVotes, () => {
      if (!dRepId.value) {
        pendingVoteList.value = [];
        return;
      }
      pendingVoteList.value = getPendingVotes(dRepId.value);
    }, { immediate: true });
    const pendingActionList = computed(() => {
      if (!isGovDelegatedToSelf.value) {
        return [];
      }
      return govActionList.value.filter(
        (govAction2) => pendingVoteList.value.some((vote) => vote.g === govAction2.b)
      );
    });
    onMounted(() => {
      if (!dRepId.value) {
        return;
      }
      checkPendingVotesAlreadyCast(dRepId.value);
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        pendingActionList.value.length === 0 ? (openBlock(), createBlock(_component_Card, {
          key: 0,
          class: "text-center text-secondary"
        }, {
          content: withCtx(() => [
            createTextVNode(toDisplayString(unref($t)("governance-voting:pendingVotes.noPendingVotes")), 1)
          ]),
          _: 1
        })) : (openBlock(), createElementBlock("div", _hoisted_2$8, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(pendingActionList.value, (_govAction) => {
            return openBlock(), createBlock(_component_Button, {
              unstyled: "",
              class: "gov-action-list w-full p-0 et-js-ic rounded-card shadow-sm cursor-pointer border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)] hover:bg-[var(--p-button-text-secondary-hover-background)]",
              severity: "secondary",
              "data-ui": unref(govAction)?.b === _govAction.b ? "active" : "",
              text: "",
              onClick: withModifiers(($event) => unref(toggleModalGovActionViewer)(_govAction), ["prevent", "stop"])
            }, {
              default: withCtx(() => [
                _govAction && unref(dRepId) ? (openBlock(), createBlock(_sfc_main$c, {
                  key: 0,
                  class: "w-full bg-transparent border-0",
                  "gov-action": _govAction,
                  "d-rep-id": unref(dRepId),
                  "is-gov-delegated-to-self": unref(isGovDelegatedToSelf),
                  "show-not-voted": ""
                }, null, 8, ["gov-action", "d-rep-id", "is-gov-delegated-to-self"])) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["data-ui", "onClick"]);
          }), 256))
        ]))
      ]);
    };
  }
});

const _hoisted_1$8 = { class: "shrink flex flex-row et-js-ic et-gap-md truncate" };
const _hoisted_2$7 = { class: "truncate" };
const _hoisted_3$6 = { class: "w-full flex flex-col" };
const _hoisted_4$4 = { class: "whitespace-pre-line" };
const _hoisted_5$4 = { class: "w-full flex flex-wrap et-je-ic et-gap-sm" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "CardRegisterAsDRep",
  setup(__props) {
    const $t = useTranslation().t;
    const { accountData } = useSelectedAccount();
    const { adaCurrency } = useAdaSymbol();
    const { showError } = useNotifications();
    const {
      openModalDRepRegistration
    } = useModalDRepRegistration();
    const doOpenModalDRepRegistration = () => {
      if (accountData.value && isGovDRepSupported(accountData.value.account.signType)) {
        openModalDRepRegistration();
      } else {
        showError($t("governance-page:register.notallowed"));
      }
    };
    return (_ctx, _cache) => {
      const _component_Divider = resolveComponent("Divider");
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        class: "w-full min-w-0",
        pt: {
          body: "flex et-gap-md",
          title: "flex flex-row et-gap-md et-jb-ic et-jb-ic sm:et-jb-ic",
          content: "flex flex-col et-gap-md",
          footer: "flex flex-row et-gap-md et-jc-ic"
        }
      }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1$8, [
            createBaseVNode("div", _hoisted_2$7, toDisplayString(unref($t)("governance-page:register.title")), 1)
          ])
        ]),
        content: withCtx(() => [
          createVNode(_component_Divider, { class: "my-0" }),
          createBaseVNode("div", _hoisted_3$6, [
            createBaseVNode("span", _hoisted_4$4, toDisplayString(unref($t)("governance-page:register.caption", { currency: unref(adaCurrency) })), 1)
          ])
        ]),
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_5$4, [
            createVNode(_component_Button, {
              label: unref($t)("governance-page:register.button"),
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: doOpenModalDRepRegistration
            }, null, 8, ["label"])
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$7 = { class: "flex flex-col et-gap-sm" };
const _hoisted_2$6 = { class: "flex flex-col et-gap-md" };
const _hoisted_3$5 = { class: "flex flex-row et-gap-md et-js-ic" };
const _hoisted_4$3 = { class: "text-txt-muted" };
const _hoisted_5$3 = { class: "flex flex-col et-gap-md" };
const _hoisted_6$3 = { class: "whitespace-pre-line" };
const _hoisted_7$3 = { class: "shrink-0 flex flex-row et-je-ic et-gap-sm" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "GovernanceInfoADAStat",
  setup(__props) {
    const $t = useTranslation().t;
    const { isDarkMode } = useDarkMode();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, { pt: {
        root: "w-full lg:w-102 h-full overflow-hidden",
        body: "h-full",
        content: "h-full",
        header: "shrink-0 overflow-hidden h-16 sm:h-24 "
      } }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1$7, [
            createBaseVNode("div", _hoisted_2$6, [
              createBaseVNode("div", _hoisted_3$5, [
                createBaseVNode("div", {
                  class: normalizeClass(["w-10 sm:w-12 rounded-md p-2", unref(isDarkMode) ? "bg-white" : ""])
                }, [..._cache[0] || (_cache[0] = [
                  createBaseVNode("svg", {
                    viewBox: "0 0 320 320",
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "uk-icon uk-preserve",
                    role: "img",
                    focusable: "false"
                  }, [
                    createBaseVNode("path", {
                      fill: "#bdddf4",
                      d: "M120 0H70L0 90H90"
                    }),
                    createBaseVNode("path", {
                      fill: "#5dadec",
                      d: "M320 90 250 0H200l30 90m-70 230-60-220H220"
                    }),
                    createBaseVNode("path", {
                      fill: "#1f77b4",
                      d: "M230 100h90L170 320"
                    }),
                    createBaseVNode("path", {
                      fill: "#8ccaf7",
                      d: "M90 100H0L150 320M130 0 100 90H220L190 0"
                    })
                  ], -1)
                ])], 2),
                _cache[1] || (_cache[1] = createBaseVNode("div", { class: "et-text-lg font-semibold" }, " ADASTAT ", -1))
              ]),
              createBaseVNode("span", _hoisted_4$3, toDisplayString(unref($t)("governance-page:adastat.title")), 1)
            ]),
            createBaseVNode("div", _hoisted_5$3, [
              createBaseVNode("p", _hoisted_6$3, toDisplayString(unref($t)("governance-page:adastat.caption")), 1)
            ])
          ])
        ]),
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_7$3, [
            createVNode(_component_Button, {
              label: unref($t)("governance-page:button.proposals"),
              severity: "secondary",
              size: "small",
              as: "a",
              target: "_blank",
              href: "https://adastat.net/governances",
              rounded: "",
              outlined: ""
            }, null, 8, ["label"]),
            createVNode(_component_Button, {
              label: unref($t)("governance-page:button.dreps"),
              severity: "secondary",
              size: "small",
              as: "a",
              target: "_blank",
              href: "https://adastat.net/dreps",
              rounded: "",
              outlined: ""
            }, null, 8, ["label"])
          ])
        ]),
        _: 1
      });
    };
  }
});

const _imports_0 = "/images/explorer/cardanoscan.webp";

const _hoisted_1$6 = { class: "flex flex-col et-gap-sm" };
const _hoisted_2$5 = { class: "flex flex-col et-gap-md" };
const _hoisted_3$4 = { class: "flex flex-row et-gap-md et-js-ic" };
const _hoisted_4$2 = { class: "text-txt-muted" };
const _hoisted_5$2 = { class: "flex flex-col et-gap-md" };
const _hoisted_6$2 = { class: "whitespace-pre-line" };
const _hoisted_7$2 = { class: "shrink-0 flex flex-row et-je-ic et-gap-sm" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "GovernanceInfoCardanoscan",
  setup(__props) {
    const $t = useTranslation().t;
    const { isDarkMode } = useDarkMode();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, { pt: {
        root: "w-full lg:w-102 h-full overflow-hidden",
        body: "h-full",
        content: "h-full",
        header: "shrink-0 overflow-hidden h-16 sm:h-24 "
      } }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1$6, [
            createBaseVNode("div", _hoisted_2$5, [
              createBaseVNode("div", _hoisted_3$4, [
                createBaseVNode("div", {
                  class: normalizeClass(["w-10 sm:w-12 rounded-md p-2", unref(isDarkMode) ? "bg-white" : ""])
                }, [..._cache[0] || (_cache[0] = [
                  createBaseVNode("img", { src: _imports_0 }, null, -1)
                ])], 2),
                _cache[1] || (_cache[1] = createBaseVNode("div", { class: "et-text-lg font-semibold" }, " CardanoScan ", -1))
              ]),
              createBaseVNode("span", _hoisted_4$2, toDisplayString(unref($t)("governance-page:cardanoScan.title")), 1)
            ]),
            createBaseVNode("div", _hoisted_5$2, [
              createBaseVNode("p", _hoisted_6$2, toDisplayString(unref($t)("governance-page:cardanoScan.caption")), 1)
            ])
          ])
        ]),
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_7$2, [
            createVNode(_component_Button, {
              label: unref($t)("governance-page:button.proposals"),
              severity: "secondary",
              size: "small",
              as: "a",
              target: "_blank",
              href: "https://cardanoscan.io/govActions",
              rounded: "",
              outlined: ""
            }, null, 8, ["label"]),
            createVNode(_component_Button, {
              label: unref($t)("governance-page:button.dreps"),
              severity: "secondary",
              size: "small",
              as: "a",
              target: "_blank",
              href: "https://cardanoscan.io/dReps",
              rounded: "",
              outlined: ""
            }, null, 8, ["label"])
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$5 = { class: "w-full flex flex-row et-jb-ic et-gap-sm" };
const _hoisted_2$4 = { class: "shrink-0 flex flex-row et-js-ic et-gap-sme" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "GovernanceInfoGovtools",
  setup(__props) {
    const $t = useTranslation().t;
    useDarkMode();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, { pt: {
        root: "w-full overflow-hidden",
        body: "h-full",
        content: "h-full",
        header: "shrink-0 overflow-hidden flex et-jc-ic h-16 sm:h-24 bg-light"
      } }, {
        header: withCtx(() => [..._cache[0] || (_cache[0] = [
          createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "158",
            height: "32",
            viewBox: "0 0 158 32",
            fill: "none"
          }, [
            createBaseVNode("g", { "clip-path": "url(#clip0_73_24958)" }, [
              createBaseVNode("path", {
                d: "M9.04657 31.8336L2.47977 20.4584C2.35133 20.2359 2.51234 19.9591 2.76741 19.9591L3.67012 19.9591C3.78952 19.9591 3.89806 20.0224 3.95776 20.1255L9.88234 30.3863C9.94204 30.4895 10.0524 30.5528 10.17 30.5528L16.4745 30.5528C16.5939 30.5528 16.7024 30.6161 16.7621 30.7192L17.2144 31.5007C17.3428 31.7232 17.1818 32 16.9267 32L9.33421 32C9.21481 32 9.10627 31.9367 9.04657 31.8336Z",
                fill: "#242232"
              }),
              createBaseVNode("path", {
                d: "M18.6259 31.7324L14.8305 25.1565C14.7021 24.934 14.8631 24.6572 15.1182 24.6572L16.0209 24.6572C16.1403 24.6572 16.2488 24.7205 16.3085 24.8237L19.4616 30.2833C19.5213 30.3864 19.6317 30.4497 19.7493 30.4497L22.0088 30.4497C22.1282 30.4497 22.2367 30.5131 22.2964 30.6162L22.7487 31.3977C22.8771 31.6202 22.7161 31.897 22.461 31.897L18.9135 31.897C18.7941 31.897 18.6856 31.8337 18.6259 31.7305L18.6259 31.7324Z",
                fill: "#242232"
              }),
              createBaseVNode("path", {
                d: "M27.3511 31.8879L24.2685 31.8879C24.1491 31.8879 24.0406 31.8246 23.9809 31.7215L22.4396 29.0532C22.3799 28.9501 22.3799 28.8234 22.4396 28.7203L23.9809 26.052C24.0406 25.9489 24.1509 25.8856 24.2685 25.8856L27.3511 25.8856C27.4705 25.8856 27.5791 25.9489 27.6388 26.052L29.18 28.7203C29.2397 28.8234 29.2397 28.9501 29.18 29.0532L27.6388 31.7215C27.5791 31.8246 27.4687 31.8879 27.3511 31.8879Z",
                fill: "#242232"
              }),
              createBaseVNode("path", {
                d: "M36.7124 16.0858L30.1456 27.461C30.0172 27.6836 29.697 27.6836 29.5703 27.461L29.1181 26.6795C29.0584 26.5764 29.0584 26.4498 29.1181 26.3467L35.0427 16.0858C35.1024 15.9827 35.1024 15.8561 35.0427 15.753L31.8895 10.2933C31.8298 10.1902 31.8298 10.0636 31.8895 9.96046L32.3418 9.17895C32.4702 8.95644 32.7904 8.95644 32.917 9.17895L36.7124 15.753C36.7721 15.8561 36.7721 15.9827 36.7124 16.0858Z",
                fill: "#242232"
              }),
              createBaseVNode("path", {
                d: "M31.8354 7.84029L28.0401 14.4161C27.9116 14.6386 27.5914 14.6386 27.4648 14.4161L27.0126 13.6346C26.9529 13.5315 26.9529 13.4049 27.0126 13.3018L30.1657 7.8421C30.2254 7.73898 30.2254 7.61235 30.1657 7.50923L29.0351 5.55186C28.9754 5.44874 28.9754 5.32211 29.0351 5.219L29.4873 4.43749C29.6158 4.21498 29.936 4.21498 30.0626 4.43749L31.8372 7.50923C31.8969 7.61235 31.8969 7.73898 31.8372 7.8421L31.8354 7.84029Z",
                fill: "#242232"
              }),
              createBaseVNode("path", {
                d: "M27.6077 0.208001L29.149 2.87633C29.2087 2.97944 29.2087 3.10607 29.149 3.20919L27.6077 5.87751C27.548 5.98063 27.4376 6.04395 27.32 6.04395L24.2374 6.04395C24.118 6.04395 24.0095 5.98063 23.9498 5.87751L22.4085 3.20919C22.3488 3.10608 22.3488 2.97944 22.4085 2.87633L23.9498 0.208001C24.0095 0.104886 24.1199 0.0415703 24.2374 0.0415703L27.32 0.0415701C27.4394 0.04157 27.548 0.104886 27.6077 0.208001Z",
                fill: "#242232"
              }),
              createBaseVNode("path", {
                d: "M9.2427 -6.57516e-06L22.3781 -7.72349e-06C22.635 -7.74595e-06 22.7942 0.276773 22.6657 0.499285L22.2135 1.28079C22.1538 1.3839 22.0434 1.44722 21.9258 1.44722L10.0785 1.44722C9.95908 1.44722 9.85054 1.51054 9.79084 1.61365L6.63769 7.07332C6.578 7.17643 6.46764 7.23975 6.35006 7.23975L5.44735 7.23975C5.19047 7.23975 5.03127 6.96296 5.15971 6.74045L8.95506 0.164616C9.01476 0.0615013 9.12511 -0.0018146 9.2427 -0.00181462L9.2427 -6.57516e-06Z",
                fill: "#242232"
              }),
              createBaseVNode("path", {
                d: "M4.54084 8.34676L12.1334 8.34676C12.3902 8.34676 12.5494 8.62355 12.421 8.84606L11.9687 9.62756C11.909 9.73068 11.7987 9.79399 11.6811 9.79399L5.37662 9.79399C5.25722 9.79399 5.14868 9.85731 5.08898 9.96042L3.95834 11.9178C3.89864 12.0209 3.78829 12.0842 3.6707 12.0842L2.76799 12.0842C2.51111 12.0842 2.35191 11.8074 2.48036 11.5849L4.25321 8.5132C4.31291 8.41008 4.42326 8.34676 4.54084 8.34676Z",
                fill: "#242232"
              }),
              createBaseVNode("path", {
                d: "M5.24288 13.1553L6.78418 15.8236C6.84387 15.9267 6.84387 16.0533 6.78418 16.1565L5.24288 18.8248C5.18318 18.9279 5.07283 18.9912 4.95524 18.9912L1.87265 18.9912C1.75325 18.9912 1.64471 18.9279 1.58501 18.8248L0.0437156 16.1565C-0.0159826 16.0533 -0.0159826 15.9267 0.0437155 15.8236L1.58501 13.1553C1.64471 13.0522 1.75506 12.9888 1.87265 12.9888L4.95524 12.9888C5.07464 12.9888 5.18318 13.0522 5.24288 13.1553Z",
                fill: "#242232"
              }),
              createBaseVNode("path", {
                d: "M9.44699 16.1401L13.7091 23.5228C13.7688 23.6259 13.8791 23.6892 13.9967 23.6892L22.5209 23.6892C22.6403 23.6892 22.7488 23.6259 22.8085 23.5228L27.0706 16.1401C27.1303 16.037 27.1303 15.9104 27.0706 15.8072L22.8085 8.42458C22.7488 8.32146 22.6385 8.25815 22.5209 8.25815L13.9967 8.25815C13.8773 8.25815 13.7688 8.32147 13.7091 8.42458L9.44699 15.8072C9.38729 15.9104 9.38729 16.037 9.44699 16.1401ZM14.0311 15.7421L16.0626 12.2236C16.1223 12.1204 16.2327 12.0571 16.3503 12.0571L20.4115 12.0571C20.5309 12.0571 20.6395 12.1204 20.6992 12.2236L22.7307 15.7421C22.7904 15.8452 22.7904 15.9719 22.7307 16.075L20.6992 19.5936C20.6395 19.6967 20.5291 19.76 20.4115 19.76L16.3503 19.76C16.2309 19.76 16.1223 19.6967 16.0626 19.5936L14.0311 16.075C13.9714 15.9719 13.9714 15.8452 14.0311 15.7421Z",
                fill: "#242232"
              })
            ]),
            createBaseVNode("path", {
              d: "M53.6749 16.5085C57.0227 16.5085 59.6838 18.2039 60.6495 21.2083H57.1944C56.5077 19.9422 55.263 19.2769 53.6749 19.2769C50.9924 19.2769 49.1254 21.1869 49.1254 24.1698C49.1254 27.2172 51.0139 29.1057 53.8037 29.1057C56.1214 29.1057 57.6022 27.7752 58.0528 25.6506H52.9024V23.3543H61.0144V25.9725C60.4135 29.0198 57.688 31.8097 53.6964 31.8097C49.34 31.8097 46.0351 28.655 46.0351 24.1698C46.0351 19.6846 49.34 16.5085 53.6749 16.5085Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M78.2808 24.1484C78.2808 28.655 74.8686 31.8311 70.6195 31.8311C66.3918 31.8311 62.9367 28.655 62.9367 24.1484C62.9367 19.6632 66.3918 16.4871 70.6195 16.4871C74.8901 16.4871 78.2808 19.6632 78.2808 24.1484ZM66.027 24.1484C66.027 27.1957 67.894 29.1486 70.6195 29.1486C73.3235 29.1486 75.1905 27.1957 75.1905 24.1484C75.1905 21.101 73.3235 19.1911 70.6195 19.1911C67.894 19.1911 66.027 21.101 66.027 24.1484Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M87.1043 28.6121L91.2032 16.7017H94.4008L88.907 31.6809H85.2587L79.7649 16.7017H82.9839L87.1043 28.6121Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M101.841 19.1267V16.7017H112.829V19.1267H108.837V31.6809H105.833V19.1267H101.841Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M130.065 24.1484C130.065 28.655 126.652 31.8311 122.403 31.8311C118.176 31.8311 114.72 28.655 114.72 24.1484C114.72 19.6632 118.176 16.4871 122.403 16.4871C126.674 16.4871 130.065 19.6632 130.065 24.1484ZM117.811 24.1484C117.811 27.1957 119.678 29.1486 122.403 29.1486C125.107 29.1486 126.974 27.1957 126.974 24.1484C126.974 21.101 125.107 19.1911 122.403 19.1911C119.678 19.1911 117.811 21.101 117.811 24.1484Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M147.343 24.1484C147.343 28.655 143.931 31.8311 139.682 31.8311C135.454 31.8311 131.999 28.655 131.999 24.1484C131.999 19.6632 135.454 16.4871 139.682 16.4871C143.953 16.4871 147.343 19.6632 147.343 24.1484ZM135.09 24.1484C135.09 27.1957 136.957 29.1486 139.682 29.1486C142.386 29.1486 144.253 27.1957 144.253 24.1484C144.253 21.101 142.386 19.1911 139.682 19.1911C136.957 19.1911 135.09 21.101 135.09 24.1484Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M150.008 16.7017H153.012V29.2988H157.948V31.6809H150.008V16.7017Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M111.682 2.66675C112.362 2.66675 112.977 2.82649 113.526 3.14597C114.081 3.46544 114.515 3.91341 114.828 4.48986C115.147 5.05936 115.307 5.70526 115.307 6.42756C115.307 7.14986 115.147 7.79923 114.828 8.37568C114.515 8.94518 114.081 9.39315 113.526 9.71957C112.977 10.039 112.362 10.1988 111.682 10.1988C110.994 10.1988 110.373 10.039 109.817 9.71957C109.268 9.39315 108.834 8.94518 108.515 8.37568C108.195 7.79923 108.035 7.14986 108.035 6.42756C108.035 5.70526 108.195 5.05936 108.515 4.48986C108.834 3.91341 109.268 3.46544 109.817 3.14597C110.373 2.82649 110.994 2.66675 111.682 2.66675ZM111.682 3.77103C111.209 3.77103 110.789 3.87868 110.421 4.09398C110.053 4.30928 109.765 4.61834 109.556 5.02116C109.355 5.42398 109.254 5.89278 109.254 6.42756C109.254 6.96234 109.355 7.43114 109.556 7.83396C109.765 8.23678 110.053 8.54584 110.421 8.76114C110.789 8.97644 111.209 9.08409 111.682 9.08409C112.147 9.08409 112.56 8.97644 112.921 8.76114C113.29 8.54584 113.574 8.23678 113.776 7.83396C113.984 7.43114 114.088 6.96234 114.088 6.42756C114.088 5.89278 113.984 5.42398 113.776 5.02116C113.574 4.61834 113.29 4.30928 112.921 4.09398C112.56 3.87868 112.147 3.77103 111.682 3.77103Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M103.712 10.1153H102.525L98.9513 4.68762V10.1153H97.7636V2.77075H98.9513L102.525 8.21924V2.77075H103.712V10.1153Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M91.9229 8.52142H88.8185L88.2559 10.1153H86.9849L89.6935 2.875H91.0583L93.7565 10.1153H92.4855L91.9229 8.52142ZM91.5896 7.60466L90.3707 4.1668L89.1518 7.60466H91.5896Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M83.2167 6.42755C83.2167 7.17068 83.0639 7.82005 82.7583 8.37567C82.4596 8.92434 82.0186 9.35146 81.4352 9.65705C80.8588 9.96264 80.1677 10.1154 79.3621 10.1154H76.9035V2.7605H79.3621C80.1677 2.7605 80.8588 2.91329 81.4352 3.21888C82.0186 3.51752 82.4596 3.94118 82.7583 4.48985C83.0639 5.03851 83.2167 5.68441 83.2167 6.42755ZM79.2683 9.04241C80.1504 9.04241 80.8275 8.81321 81.2998 8.35483C81.7721 7.89645 82.0082 7.25402 82.0082 6.42755C82.0082 5.60107 81.7721 4.95864 81.2998 4.50026C80.8275 4.04188 80.1504 3.81269 79.2683 3.81269H78.0911V9.04241H79.2683Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M71.4169 10.1154L69.5833 7.17763H68.7395V10.1154H67.5519V2.7605H70.1459C70.9863 2.7605 71.6217 2.96538 72.0523 3.37515C72.4899 3.78491 72.7087 4.32663 72.7087 5.00032C72.7087 5.57676 72.5454 6.04904 72.219 6.41713C71.8995 6.78522 71.4342 7.02136 70.823 7.12554L72.7503 10.1154H71.4169ZM68.7395 6.33379H70.0521C71.0106 6.33379 71.4898 5.91013 71.4898 5.06282C71.4898 4.66 71.3717 4.34747 71.1356 4.12522C70.9064 3.89603 70.5452 3.78144 70.0521 3.78144H68.7395V6.33379Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M61.7111 8.52142H58.6067L58.0441 10.1153H56.7731L59.4817 2.875H60.8465L63.5447 10.1153H62.2737L61.7111 8.52142ZM61.3778 7.60466L60.1589 4.1668L58.94 7.60466H61.3778Z",
              fill: "#242232"
            }),
            createBaseVNode("path", {
              d: "M49.5562 2.6875C50.4591 2.6875 51.2092 2.91669 51.8065 3.37507C52.4037 3.83345 52.8066 4.45505 53.0149 5.23985H51.7544C51.5807 4.79536 51.3029 4.44463 50.9209 4.18766C50.5459 3.92374 50.0841 3.79178 49.5354 3.79178C49.0978 3.79178 48.7054 3.89943 48.3582 4.11473C48.0179 4.33003 47.747 4.63909 47.5456 5.04191C47.3511 5.43779 47.2539 5.90311 47.2539 6.43789C47.2539 6.96573 47.3511 7.43105 47.5456 7.83387C47.747 8.22975 48.0179 8.53533 48.3582 8.75063C48.7054 8.96594 49.0978 9.07358 49.5354 9.07358C50.0841 9.07358 50.5459 8.9451 50.9209 8.68813C51.3029 8.42421 51.5807 8.07348 51.7544 7.63593H53.0149C52.8066 8.42074 52.4037 9.04233 51.8065 9.50071C51.2092 9.95215 50.4591 10.1779 49.5562 10.1779C48.8617 10.1779 48.2471 10.0216 47.7123 9.70907C47.1775 9.38959 46.7643 8.94857 46.4726 8.38601C46.1809 7.81651 46.035 7.16714 46.035 6.43789C46.035 5.70865 46.1809 5.06275 46.4726 4.50019C46.7643 3.93069 47.1775 3.48619 47.7123 3.16672C48.2471 2.84724 48.8617 2.6875 49.5562 2.6875Z",
              fill: "#242232"
            }),
            createBaseVNode("defs", null, [
              createBaseVNode("clipPath", { id: "clip0_73_24958" }, [
                createBaseVNode("rect", {
                  width: "36.7578",
                  height: "32",
                  fill: "white",
                  transform: "translate(36.7578 32) rotate(180)"
                })
              ])
            ])
          ], -1)
        ])]),
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1$5, [
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "flex flex-col et-js-is et-gap-md" }, [
              createBaseVNode("span", { class: "et-text-lg" }, "Gov.tools")
            ], -1)),
            createBaseVNode("div", _hoisted_2$4, [
              createVNode(_component_Button, {
                label: unref($t)("catalyst-info:projectcatalyst.button.label"),
                severity: "secondary",
                size: "small",
                as: "a",
                target: "_blank",
                href: "https://gov.tools",
                rounded: "",
                outlined: ""
              }, null, 8, ["label"])
            ])
          ])
        ]),
        subtitle: withCtx(() => [..._cache[2] || (_cache[2] = [
          createBaseVNode("span", { class: "" }, " An open-source tool designed to facilitate the governance process on the Cardano blockchain. ", -1)
        ])]),
        content: withCtx(() => [..._cache[3] || (_cache[3] = [
          createBaseVNode("p", { class: "whitespace-pre-line" }, " Maintained by the Cardano community through Intersect, a community-driven initiative. The tool allows ADA holders to participate in on-chain governance by proposing, discussing, and voting on governance actions. These actions are central to Cardano's governance framework, as outlined in CIP-1694, which aims to make governance accessible and user-friendly beyond command-line interfaces (CLI). ", -1)
        ])]),
        _: 1
      });
    };
  }
});

const useDRepListGlobal = () => {
  return {
    dRepList,
    numDReps,
    filteredDRepList,
    autoDRepList,
    totalVoteStake,
    updateFilteredDReps
  };
};

const _hoisted_1$4 = { class: "flex flex-row et-js-is et-gap-xl" };
const _hoisted_2$3 = { class: "et-text-3xl font-medium" };
const _hoisted_3$3 = { class: "" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CardNumDReps",
  setup(__props) {
    const $t = useTranslation().t;
    const { numDReps } = useDRepListGlobal();
    const { openModalDRepList } = useModalDRepList();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        class: "shrink grow md:grow-0 max-w-full",
        pt: {
          content: "w-full md:w-80 flex flex-row et-jb-ic et-gap-md"
        }
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1$4, [
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_2$3, toDisplayString(unref(numDReps)), 1),
              createBaseVNode("div", _hoisted_3$3, toDisplayString(unref($t)("governance-page:drep", { count: unref(numDReps) })), 1)
            ])
          ]),
          createVNode(_component_Button, {
            class: "shrink max-xs:px-3",
            label: unref($t)("governance-page:button.browseDReps"),
            size: "small",
            rounded: "",
            onClick: _cache[0] || (_cache[0] = ($event) => unref(openModalDRepList)())
          }, null, 8, ["label"])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$3 = { class: "flex flex-row et-js-is et-gap-xl" };
const _hoisted_2$2 = { class: "et-text-3xl font-medium" };
const _hoisted_3$2 = { class: "" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CardNumPendingVotes",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      showError,
      showInfo
    } = useNotifications();
    const {
      appAccount,
      accountData,
      accountGovernance
    } = useSelectedAccount();
    const {
      didUpdatePendingVotes,
      getPendingVotes
    } = useDRepPendingVotes();
    const delegatedDRepInfo = accountGovernance.delegatedDRepInfo;
    const dRepId = delegatedDRepInfo.dRepId;
    const pendingVoteList = ref([]);
    watch(didUpdatePendingVotes, () => {
      if (!dRepId.value) {
        pendingVoteList.value = [];
        return;
      }
      pendingVoteList.value = getPendingVotes(dRepId.value);
    }, { immediate: true });
    const doCreateVoteTransaction = async () => {
      const _appAccount = appAccount.value;
      if (!_appAccount) {
        return;
      }
      if (pendingVoteList.value.length === 0) {
        return showInfo($t("governance-voting:pendingVotes.cast.notification.noPendingVotes"));
      }
      try {
        showInfo($t("governance-voting:pendingVotes.cast.notification.start"));
        await sleep(100);
        const res = await dispatchSignal(doBuildTxVoteGovActions, pendingVoteList.value);
        if (res.length > 0 && accountData.value) {
          showInfo($t("governance-voting:pendingVotes.cast.notification.finish"));
          console.log("IBuiltTxResult[]", res);
          await parseTxSignRequest(_appAccount, "cc", res.map((r) => ({
            cbor: r.txCbor,
            partialSign: false
          })), "cast-vote");
        } else {
          console.log(res);
          showError($t("governance-voting:pendingVotes.cast.notification.error1"));
        }
      } catch (err) {
        console.warn(err);
        showError($t("governance-voting:pendingVotes.cast.notification.error2"));
      }
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        class: "shrink grow md:grow-0 max-w-full",
        pt: {
          content: "w-full md:w-80 flex flex-row et-jb-ic et-gap-md"
        }
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1$3, [
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_2$2, toDisplayString(pendingVoteList.value.length), 1),
              createBaseVNode("div", _hoisted_3$2, toDisplayString(unref($t)("governance-voting:pendingVotes.title")), 1)
            ])
          ]),
          createVNode(_component_Button, {
            class: "shrink max-xs:px-3",
            label: unref($t)("governance-voting:pendingVotes.button.label"),
            size: "small",
            rounded: "",
            onClick: _cache[0] || (_cache[0] = ($event) => doCreateVoteTransaction())
          }, null, 8, ["label"])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$2 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_2$1 = { class: "flex flex-col" };
const _hoisted_3$1 = { class: "et-text-3xl font-bold" };
const _hoisted_4$1 = { class: "" };
const _hoisted_5$1 = { class: "flex flex-col" };
const _hoisted_6$1 = { class: "flex flex-row et-js-ie et-gap-sm" };
const _hoisted_7$1 = { class: "et-text-2xl font-bold" };
const _hoisted_8$1 = { class: "et-text-sm pb-0.5 cap-first" };
const _hoisted_9$1 = { class: "flex flex-row et-js-ie et-gap-sm -mt-0.75" };
const _hoisted_10$1 = { class: "et-text-2xl font-bold" };
const _hoisted_11$1 = { class: "et-text-sm pb-0.5 cap-first" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CardNumGovActions",
  setup(__props) {
    const $t = useTranslation().t;
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        class: "shrink grow md:grow-0 et-bg-highlight",
        pt: {
          content: "w-full md:w-80 flex flex-row et-jb-ic et-gap-xs"
        }
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("div", _hoisted_3$1, toDisplayString(unref(numGovActions)), 1),
              createBaseVNode("div", _hoisted_4$1, toDisplayString(unref($t)("governance-page:totalProposals")), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_5$1, [
            createBaseVNode("div", _hoisted_6$1, [
              createBaseVNode("div", _hoisted_7$1, toDisplayString(unref(numActive)), 1),
              createBaseVNode("div", _hoisted_8$1, toDisplayString(unref($t)("common:active")), 1)
            ]),
            createBaseVNode("div", _hoisted_9$1, [
              createBaseVNode("div", _hoisted_10$1, toDisplayString(unref(numEnacted)), 1),
              createBaseVNode("div", _hoisted_11$1, toDisplayString(unref($t)("common:enacted")), 1)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$1 = {
  id: "fx_help_wrap",
  class: "scale-160 translate-x-[20%]"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FxHelpPageDark",
  setup(__props) {
    gsapWithCSS.registerPlugin(DrawSVGPlugin);
    const {
      gradientLightGrey3
    } = useTheme();
    let gtl = gsapWithCSS.timeline({ paused: true });
    let cl = "";
    const play = () => {
      gtl.play("fadein");
    };
    onMounted(() => {
      gtl.addLabel("start", cl + "+=0.00");
      cl = "start";
      gtl.set(".fx_help_st0", { drawSVG: 0 }, cl + "+=0.0");
      gtl.addLabel("fadein", cl + "+=0.01");
      cl = "fadein";
      gtl.addLabel("phase0", cl + "+=0.0");
      cl = "phase0";
      gtl.to(".fx_help_st0", { "stroke": gradientLightGrey3.value, duration: 1.5, repeat: 1, yoyo: true, ease: "sine.inOut" }, cl + "+=0.0");
      gtl.fromTo(".fx_help_st0", { drawSVG: "120 15%" }, { duration: 3, ease: "power2.inOut", drawSVG: "110% 120%" }, cl + "+=0");
      gtl.addLabel("fadeout", cl + "+=0");
      cl = "fadeout";
      gtl.seek("fadein");
      gsapWithCSS.set("#fx_help_wrap", { opacity: 1 });
      gsapWithCSS.set("#fx_help_background", { opacity: 0 });
      play();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [..._cache[0] || (_cache[0] = [
        createStaticVNode('<div id="fx_announcement_svg_wrap" class="w-full" data-v-0c6770d8><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1300 740" xml:space="preserve" data-v-0c6770d8><g id="fx_help_wrap" class="fx_help_sizeSVG" data-v-0c6770d8><g id="fx_help_background" data-v-0c6770d8><path class="fx_help_st0" d="M226.6,102.9c4.5-6.2,13-11.2,23.8-13.7L614.7,1.9c10.8-2.6,22.9-2.6,33.7,0l363.9,86.8\n                c10.8,2.6,19.4,7.5,23.9,13.8l150.4,209.9c4.5,6.2,4.4,13.2,0,19.5l-151.2,210.2c-4.5,6.2-13,11.2-23.8,13.7l-364.3,87.2\n                c-10.8,2.6-22.9,2.6-33.7,0l-363.9-86.8c-10.8-2.6-19.4-7.5-23.9-13.8L75.3,332.6c-4.5-6.2-4.5-13.2,0-19.5L226.6,102.9z" data-v-0c6770d8></path></g><g id="fx_help_black" data-v-0c6770d8><g data-v-0c6770d8><linearGradient id="fx_help_SVGID_1_" gradientUnits="userSpaceOnUse" x1="590.402" y1="368.3563" x2="259.278" y2="506.9783" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#3E3E3E;stop-opacity:0;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#404040;" data-v-0c6770d8></stop></linearGradient><path class="fx_help_st1" d="M563,151c0-3.1-3.4-5-6-3.4L348.2,271.8c-4.8,2.9-7.8,8.1-7.8,13.7L340,476c0,3.1,3.4,5,6,3.4L555.2,355\n                c4.8-2.9,7.8-8.1,7.8-13.8V151z" data-v-0c6770d8></path></g><path class="fx_help_st2" d="M520,310v66" data-v-0c6770d8></path><path class="fx_help_st2" d="M546,310v79" data-v-0c6770d8></path><path class="fx_help_st2" d="M658,306v86" data-v-0c6770d8></path><path class="fx_help_st2" d="M588,310v126" data-v-0c6770d8></path><linearGradient id="SVGID_00000115505330867668506790000015865734241456460171_" gradientUnits="userSpaceOnUse" x1="551.7487" y1="416.8594" x2="555.6547" y2="466.1394" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#E4E4E4;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#FFFFFF;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000115505330867668506790000015865734241456460171_);" d="M542.7,301.1c1.7,1,4.5,0.3,4.7-1\n              c0.5-2.8,2.8-5.5,6.8-7.6c7.3-3.7,19.3-3.8,26.6-0.1c5.8,2.9,7.9,7.2,6.5,11.2c0.6,1.8,0.6,15.6-0.2,17.3c-1-2.2-3.1-4.3-6.3-5.9\n              c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6c-0.2,1.4-3,2-4.7,1L519.3,310v-16.9v-0.9v-4.9L542.7,301.1z" data-v-0c6770d8></path><path class="fx_help_st4" d="M542.7,301.1c1.7,1,4.5,0.3,4.7-1c0.5-2.8,2.8-5.5,6.8-7.6c7.3-3.7,19.3-3.8,26.6-0.1\n              c5.8,2.9,7.9,7.2,6.5,11.2c0.6,1.8,0.6,15.6-0.2,17.3c-1-2.2-3.1-4.3-6.3-5.9c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6\n              c-0.2,1.4-3,2-4.7,1L519.3,310v-16.9v-0.9v-4.9L542.7,301.1z" data-v-0c6770d8></path><path class="fx_help_st5" d="M542.7,301.1c1.7,1,4.5,0.3,4.7-1c0.5-2.8,2.8-5.5,6.8-7.6c7.3-3.7,19.3-3.8,26.6-0.1\n              c5.8,2.9,7.9,7.2,6.5,11.2c0.6,1.8,0.6,15.6-0.2,17.3c-1-2.2-3.1-4.3-6.3-5.9c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6\n              c-0.2,1.4-3,2-4.7,1L519.3,310v-16.9v-0.9v-4.9L542.7,301.1z" data-v-0c6770d8></path><linearGradient id="SVGID_00000178897068959151637180000006186703801170795689_" gradientUnits="userSpaceOnUse" x1="553.6424" y1="452.0929" x2="552.7484" y2="389.5059" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#000000;stop-opacity:0;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#000000;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000178897068959151637180000006186703801170795689_);fill-opacity:0.4;" d="M542.7,301.1\n              c1.7,1,4.5,0.3,4.7-1c0.5-2.8,2.8-5.5,6.8-7.6c7.3-3.7,19.3-3.8,26.6-0.1c5.8,2.9,7.9,7.2,6.5,11.2c0.6,1.8,0.6,15.6-0.2,17.3\n              c-1-2.2-3.1-4.3-6.3-5.9c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6c-0.2,1.4-3,2-4.7,1L519.3,310v-16.9v-0.9v-4.9\n              L542.7,301.1z" data-v-0c6770d8></path><linearGradient id="SVGID_00000035518258780836618750000009930365456275521942_" gradientUnits="userSpaceOnUse" x1="565.9249" y1="418.3121" x2="571.218" y2="462.1541" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#E4E4E4;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#FFFFFF;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000035518258780836618750000009930365456275521942_);" d="M547.4,300.1c0.5-2.8,2.8-5.5,6.8-7.6\n              c7.3-3.7,19.3-3.8,26.6-0.1c5.8,2.9,7.9,7.2,6.5,11.2c0.6,1.8,0.6,15.6-0.2,17.3c-1-2.2-3.1-4.3-6.3-5.9\n              c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6L547.4,300.1L547.4,300.1z" data-v-0c6770d8></path><path class="fx_help_st4" d="M547.4,300.1c0.5-2.8,2.8-5.5,6.8-7.6c7.3-3.7,19.3-3.8,26.6-0.1c5.8,2.9,7.9,7.2,6.5,11.2\n              c0.6,1.8,0.6,15.6-0.2,17.3c-1-2.2-3.1-4.3-6.3-5.9c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6L547.4,300.1L547.4,300.1z" data-v-0c6770d8></path><path class="fx_help_st5" d="M547.4,300.1c0.5-2.8,2.8-5.5,6.8-7.6c7.3-3.7,19.3-3.8,26.6-0.1c5.8,2.9,7.9,7.2,6.5,11.2\n              c0.6,1.8,0.6,15.6-0.2,17.3c-1-2.2-3.1-4.3-6.3-5.9c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6L547.4,300.1L547.4,300.1z" data-v-0c6770d8></path><linearGradient id="SVGID_00000076580101644660427270000013914687399926675106_" gradientUnits="userSpaceOnUse" x1="567.8871" y1="449.8391" x2="566.6651" y2="393.7131" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#000000;stop-opacity:0;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#000000;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000076580101644660427270000013914687399926675106_);fill-opacity:0.4;" d="M547.4,300.1\n              c0.5-2.8,2.8-5.5,6.8-7.6c7.3-3.7,19.3-3.8,26.6-0.1c5.8,2.9,7.9,7.2,6.5,11.2c0.6,1.8,0.6,15.6-0.2,17.3c-1-2.2-3.1-4.3-6.3-5.9\n              c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6L547.4,300.1L547.4,300.1z" data-v-0c6770d8></path><linearGradient id="SVGID_00000142871579975792449130000017101659674624958892_" gradientUnits="userSpaceOnUse" x1="573.9808" y1="391.3635" x2="584.9938" y2="437.1295" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#E4E4E4;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#FFFFFF;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000142871579975792449130000017101659674624958892_);" d="M588.9,350.5l-21.2-12.3\n              c-0.6-0.4-0.9-0.8-0.8-1.3v-22.4c0,0.4,0.3,0.7,0.8,1l21.2,12.3h0v0V350.5z" data-v-0c6770d8></path><path class="fx_help_st4" d="M588.9,350.5l-21.2-12.3c-0.6-0.4-0.9-0.8-0.8-1.3v-22.4c0,0.4,0.3,0.7,0.8,1l21.2,12.3h0v0V350.5z" data-v-0c6770d8></path><path class="fx_help_st5" d="M588.9,350.5l-21.2-12.3c-0.6-0.4-0.9-0.8-0.8-1.3v-22.4c0,0.4,0.3,0.7,0.8,1l21.2,12.3h0v0V350.5z" data-v-0c6770d8></path><linearGradient id="SVGID_00000099636179750364545400000012780860337408281018_" gradientUnits="userSpaceOnUse" x1="578.6253" y1="424.933" x2="575.9783" y2="363.928" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#000000;stop-opacity:0;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#000000;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000099636179750364545400000012780860337408281018_);fill-opacity:0.4;" d="M588.9,350.5l-21.2-12.3\n              c-0.6-0.4-0.9-0.8-0.8-1.3v-22.4c0,0.4,0.3,0.7,0.8,1l21.2,12.3h0v0V350.5z" data-v-0c6770d8></path><linearGradient id="SVGID_00000165206439638175393240000012797759670511324560_" gradientUnits="userSpaceOnUse" x1="620.1232" y1="391.6049" x2="630.9781" y2="474.4029" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#E4E4E4;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#FFFFFF;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000165206439638175393240000012797759670511324560_);" d="M588.9,327.8v22.7l70.2-40v-22.6\n              L588.9,327.8z" data-v-0c6770d8></path><path class="fx_help_st4" d="M588.9,327.8v22.7l70.2-40v-22.6L588.9,327.8z" data-v-0c6770d8></path><path class="fx_help_st5" d="M588.9,327.8v22.7l70.2-40v-22.6L588.9,327.8z" data-v-0c6770d8></path><path class="fx_help_st5" d="M588.9,327.8v22.7l70.2-40v-22.6L588.9,327.8z" data-v-0c6770d8></path><linearGradient id="SVGID_00000071522105315942785750000017812117395162028441_" gradientUnits="userSpaceOnUse" x1="624.6736" y1="451.161" x2="622.1616" y2="344.902" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#000000;stop-opacity:0;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#000000;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000071522105315942785750000017812117395162028441_);fill-opacity:0.4;" d="M588.9,327.8v22.7\n              l70.2-40v-22.6L588.9,327.8z" data-v-0c6770d8></path><linearGradient id="SVGID_00000025430725721026457270000009456135058777385138_" gradientUnits="userSpaceOnUse" x1="532.1853" y1="452.9588" x2="538.8474" y2="491.4338" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#E4E4E4;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#FFFFFF;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000025430725721026457270000009456135058777385138_);" d="M523.3,288.4v-29.5l23.2,8.9l1.8,5.4\n              L523.3,288.4z" data-v-0c6770d8></path><path class="fx_help_st14" d="M523.3,288.4v-29.5l23.2,8.9l1.8,5.4L523.3,288.4z" data-v-0c6770d8></path><path class="fx_help_st5" d="M523.3,288.4v-29.5l23.2,8.9l1.8,5.4L523.3,288.4z" data-v-0c6770d8></path><linearGradient id="SVGID_00000143580870509317364340000001625564134455613320_" gradientUnits="userSpaceOnUse" x1="525.5759" y1="438.1805" x2="538.9689" y2="484.9275" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#000000;stop-opacity:0;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#000000;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000143580870509317364340000001625564134455613320_);fill-opacity:0.4;" d="M523.3,288.4v-29.5\n              l23.2,8.9l1.8,5.4L523.3,288.4z" data-v-0c6770d8></path><linearGradient id="SVGID_00000122679309936321170630000013484403882701564300_" gradientUnits="userSpaceOnUse" x1="568.4987" y1="496.5749" x2="650.0487" y2="322.4839" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#E9E9E9;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#FFFFFF;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000122679309936321170630000013484403882701564300_);" d="M588.9,327.8l-21.2-12.3\n              c-1.7-0.9-0.6-2.6,1.8-2.7c4.5-0.3,8.9-1.4,12.3-3.4c8.3-4.8,7.9-12.6-1-17.1c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6\n              c-0.2,1.4-3,2-4.7,1l-23.4-13.8l24.2-13.6c2.1-1.2,0.8-3.4-2.2-3.5c-4.7-0.2-9.4-1.3-12.9-3.5c-6.8-4.2-6.7-10.9,0.1-15.2\n              c7.5-4.7,20.2-4.8,27.9-0.4c3.4,2,5.3,4.5,5.6,7.2c0.2,1.7,3.9,2.5,6,1.2l21.6-12.2h0l69.5,40.5h0L588.9,327.8z" data-v-0c6770d8></path><path class="fx_help_st5" d="M588.9,327.8l-21.2-12.3c-1.7-0.9-0.6-2.6,1.8-2.7c4.5-0.3,8.9-1.4,12.3-3.4c8.3-4.8,7.9-12.6-1-17.1\n              c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6c-0.2,1.4-3,2-4.7,1l-23.4-13.8l24.2-13.6c2.1-1.2,0.8-3.4-2.2-3.5\n              c-4.7-0.2-9.4-1.3-12.9-3.5c-6.8-4.2-6.7-10.9,0.1-15.2c7.5-4.7,20.2-4.8,27.9-0.4c3.4,2,5.3,4.5,5.6,7.2c0.2,1.7,3.9,2.5,6,1.2\n              l21.6-12.2h0l69.5,40.5h0L588.9,327.8z" data-v-0c6770d8></path><linearGradient id="SVGID_00000130629303682463036010000002820350815373284769_" gradientUnits="userSpaceOnUse" x1="577.718" y1="505.1146" x2="599.106" y2="406.8126" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#000000;stop-opacity:0;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#000000;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000130629303682463036010000002820350815373284769_);fill-opacity:0.4;" d="M588.9,327.8l-21.2-12.3\n              c-1.7-0.9-0.6-2.6,1.8-2.7c4.5-0.3,8.9-1.4,12.3-3.4c8.3-4.8,7.9-12.6-1-17.1c-7.3-3.7-19.3-3.6-26.6,0.1c-4,2.1-6.3,4.8-6.8,7.6\n              c-0.2,1.4-3,2-4.7,1l-23.4-13.8l24.2-13.6c2.1-1.2,0.8-3.4-2.2-3.5c-4.7-0.2-9.4-1.3-12.9-3.5c-6.8-4.2-6.7-10.9,0.1-15.2\n              c7.5-4.7,20.2-4.8,27.9-0.4c3.4,2,5.3,4.5,5.6,7.2c0.2,1.7,3.9,2.5,6,1.2l21.6-12.2h0l69.5,40.5h0L588.9,327.8z" data-v-0c6770d8></path><path class="fx_help_st2" d="M588,436l71-44" data-v-0c6770d8></path><linearGradient id="blokk_side_00000107572311096129393140000006523011560632583082_" gradientUnits="userSpaceOnUse" x1="412.881" y1="187.6619" x2="669.3009" y2="407.2679" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path id="blokk_side" class="blokk" style="fill:url(#blokk_side_00000107572311096129393140000006523011560632583082_);" d="M566.8,427\n              c-1.7,1-4.5,0.3-4.7-1c-0.5-2.8-2.8-5.5-6.8-7.6c-7.3-3.7-19.3-3.8-26.6-0.1c-5.8,2.9-7.9,7.2-6.5,11.2c-0.6,1.8-0.6,15.6,0.2,17.3\n              c1-2.2,3.1-4.3,6.3-5.9c7.3-3.7,19.3-3.6,26.6,0.1c4,2.1,6.3,4.8,6.8,7.6c0.2,1.4,3,2,4.7,1l23.4-13.8V419v-0.9v-4.9L566.8,427z" data-v-0c6770d8></path><path id="pfadd" class="fx_help_st14" d="M566.8,427c-1.7,1-4.5,0.3-4.7-1c-0.5-2.8-2.8-5.5-6.8-7.6c-7.3-3.7-19.3-3.8-26.6-0.1\n              c-5.8,2.9-7.9,7.2-6.5,11.2c-0.6,1.8-0.6,15.6,0.2,17.3c1-2.2,3.1-4.3,6.3-5.9c7.3-3.7,19.3-3.6,26.6,0.1c4,2.1,6.3,4.8,6.8,7.6\n              c0.2,1.4,3,2,4.7,1l23.4-13.8V419v-0.9v-4.9L566.8,427z" data-v-0c6770d8></path><linearGradient id="blokk_side_00000183937147428286357660000003302396345020694178_" gradientUnits="userSpaceOnUse" x1="433.1385" y1="243.3953" x2="631.9996" y2="355.1793" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path id="blokk_side_00000160177707363847227020000017802850473162710144_" class="blokk" style="fill:url(#blokk_side_00000183937147428286357660000003302396345020694178_);" d="\n              M562.1,426c-0.5-2.8-2.8-5.5-6.8-7.6c-7.3-3.7-19.3-3.8-26.6-0.1c-5.8,2.9-7.9,7.2-6.5,11.2c-0.6,1.8-0.6,15.6,0.2,17.3\n              c1-2.2,3.1-4.3,6.3-5.9c7.3-3.7,19.3-3.6,26.6,0.1c4,2.1,6.3,4.8,6.8,7.6L562.1,426L562.1,426z" data-v-0c6770d8></path><path class="fx_help_st14" d="M562.1,426c-0.5-2.8-2.8-5.5-6.8-7.6c-7.3-3.7-19.3-3.8-26.6-0.1c-5.8,2.9-7.9,7.2-6.5,11.2\n              c-0.6,1.8-0.6,15.6,0.2,17.3c1-2.2,3.1-4.3,6.3-5.9c7.3-3.7,19.3-3.6,26.6,0.1c4,2.1,6.3,4.8,6.8,7.6L562.1,426L562.1,426z" data-v-0c6770d8></path><linearGradient id="blokk_side_00000066496472992073470470000015033461161404911268_" gradientUnits="userSpaceOnUse" x1="458.2782" y1="260.8799" x2="590.6653" y2="298.2179" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path id="blokk_side_00000137828637869813522220000013728914882739795083_" class="blokk" style="fill:url(#blokk_side_00000066496472992073470470000015033461161404911268_);" d="\n              M520.7,476.4l21.2-12.3c0.6-0.4,0.9-0.8,0.8-1.3v-22.4c0,0.4-0.3,0.7-0.8,1l-21.2,12.3h0v0V476.4z" data-v-0c6770d8></path><path class="fx_help_st14" d="M520.7,476.4l21.2-12.3c0.6-0.4,0.9-0.8,0.8-1.3v-22.4c0,0.4-0.3,0.7-0.8,1l-21.2,12.3h0v0V476.4z" data-v-0c6770d8></path><linearGradient id="blokk_side_00000169520558993771654100000006429203655857889191_" gradientUnits="userSpaceOnUse" x1="286.0183" y1="191.5805" x2="645.8914" y2="377.8764" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path id="blokk_side_00000164512007362927375460000017567957155970390405_" class="blokk" style="fill:url(#blokk_side_00000169520558993771654100000006429203655857889191_);" d="\n              M520.7,453.8v22.7l-70.2-40v-22.6L520.7,453.8z" data-v-0c6770d8></path><path class="fx_help_st14" d="M520.7,453.8v22.7l-70.2-40v-22.6L520.7,453.8z" data-v-0c6770d8></path><linearGradient id="blokk_side_00000175317624232109901330000000028295429951240360_" gradientUnits="userSpaceOnUse" x1="497.2343" y1="305.5804" x2="638.1443" y2="360.8054" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path id="blokk_side_00000091721134211839183110000003246310860723573429_" class="blokk" style="fill:url(#blokk_side_00000175317624232109901330000000028295429951240360_);" d="\n              M586.3,414.4v-29.5l-23.2,8.9l-1.8,5.4L586.3,414.4z" data-v-0c6770d8></path><path class="fx_help_st14" d="M586.3,414.4v-29.5l-23.2,8.9l-1.8,5.4L586.3,414.4z" data-v-0c6770d8></path><linearGradient id="blokk_top_00000123443352517646252910000010794817775881065372_" gradientUnits="userSpaceOnUse" x1="213.722" y1="80.5631" x2="766.6527" y2="523.9704" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path id="blokk_top" class="blokk_topp" style="fill:url(#blokk_top_00000123443352517646252910000010794817775881065372_);" d="M520.7,453.8\n              l21.2-12.3c1.7-1,0.6-2.6-1.8-2.7c-4.5-0.3-8.9-1.4-12.3-3.4c-8.3-4.8-7.9-12.6,1-17.1c7.3-3.7,19.3-3.6,26.6,0.1\n              c4,2.1,6.3,4.8,6.8,7.6c0.2,1.4,3,2,4.7,1l23.4-13.8l-24.2-13.6c-2.1-1.2-0.8-3.4,2.2-3.5c4.7-0.2,9.4-1.3,12.9-3.5\n              c6.8-4.2,6.7-10.9-0.1-15.2c-7.5-4.7-20.2-4.8-27.9-0.4c-3.4,2-5.3,4.5-5.6,7.2c-0.2,1.7-3.9,2.5-6.1,1.2L520,373.3h0l-69.5,40.5h0\n              L520.7,453.8z" data-v-0c6770d8></path><path d="M686.3,530.8l31.8-18.3c0.4-0.2,0.6-0.5,0.6-0.9v-6.5c0-0.7-1-1.2-2.1-1.2H653c-1.2,0-2.1,0.6-2.1,1.2v6.5\n              c0,0.3,0.2,0.6,0.6,0.9l31.8,18.3C684.1,531.3,685.5,531.3,686.3,530.8z" data-v-0c6770d8></path><linearGradient id="SVGID_00000114055163994176451960000016728952612461635245_" gradientUnits="userSpaceOnUse" x1="704.7462" y1="219.6194" x2="655.0052" y2="249.5794" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#EAEAEA;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#EAEAEA;stop-opacity:0;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000114055163994176451960000016728952612461635245_);fill-opacity:0.2;" d="M686.3,530.8l31.8-18.3\n              c0.4-0.2,0.6-0.5,0.6-0.9v-6.5c0-0.7-1-1.2-2.1-1.2H653c-1.2,0-2.1,0.6-2.1,1.2v6.5c0,0.3,0.2,0.6,0.6,0.9l31.8,18.3\n              C684.1,531.3,685.5,531.3,686.3,530.8z" data-v-0c6770d8></path><linearGradient id="SVGID_00000129206491317884555260000015074196041648223408_" gradientUnits="userSpaceOnUse" x1="748.1475" y1="198.2704" x2="610.8145" y2="268.2764" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#808080;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#EAEAEA;stop-opacity:0;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000129206491317884555260000015074196041648223408_);fill-opacity:0.3;" d="M686.3,530.8l31.8-18.3\n              c0.4-0.2,0.6-0.5,0.6-0.9v-6.5c0-0.7-1-1.2-2.1-1.2H653c-1.2,0-2.1,0.6-2.1,1.2v6.5c0,0.3,0.2,0.6,0.6,0.9l31.8,18.3\n              C684.1,531.3,685.5,531.3,686.3,530.8z" data-v-0c6770d8></path><path class="fx_help_st26" d="M717.9,512.4l-31.8,18.3c-0.8,0.4-2,0.4-2.8,0l-31.8-18.3c-0.4-0.2-0.6-0.5-0.6-0.8v-6.5c0-0.6,0.9-1.1,2-1.1\n              h63.5c1.1,0,2,0.5,2,1.1v6.5C718.5,511.9,718.3,512.2,717.9,512.4z" data-v-0c6770d8></path><path d="M651.4,504.1l31.9-18.4c0.8-0.5,2.2-0.5,3,0l31.9,18.4c0.8,0.5,0.8,1.3,0,1.7l-31.9,18.4c-0.8,0.5-2.2,0.5-3,0l-31.9-18.4\n              C650.5,505.3,650.5,504.5,651.4,504.1z" data-v-0c6770d8></path><linearGradient id="SVGID_00000180335023989925839970000013355591999901762435_" gradientUnits="userSpaceOnUse" x1="458.2177" y1="962.6408" x2="403.0169" y2="1068.2874" gradientTransform="matrix(0.866 -0.5 -0.866 -0.5 1174.496 1224.931)" data-v-0c6770d8><stop offset="0" style="stop-color:#EFEFEF;stop-opacity:0;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#C1C1C1;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000180335023989925839970000013355591999901762435_);fill-opacity:0.3;" d="M651.4,504.1l31.9-18.4\n              c0.8-0.5,2.2-0.5,3,0l31.9,18.4c0.8,0.5,0.8,1.3,0,1.7l-31.9,18.4c-0.8,0.5-2.2,0.5-3,0l-31.9-18.4\n              C650.5,505.3,650.5,504.5,651.4,504.1z" data-v-0c6770d8></path><path class="fx_help_st28" d="M692.9,463.5h-14.3v38.3c0,3.9,3.2,7.1,7.1,7.1c3.9,0,7.1-3.2,7.1-7.1V463.5z" data-v-0c6770d8></path><path d="M692.9,463.5h-14.3v38.3c0,3.9,3.2,7.1,7.1,7.1c3.9,0,7.1-3.2,7.1-7.1V463.5z" data-v-0c6770d8></path><linearGradient id="SVGID_00000008870587684899904490000009533651442749030572_" gradientUnits="userSpaceOnUse" x1="658.8893" y1="239.7713" x2="716.2593" y2="272.8413" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#808080;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#EAEAEA;stop-opacity:0;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000008870587684899904490000009533651442749030572_);fill-opacity:0.3;" d="M692.9,463.5h-14.3v38.3\n              c0,3.9,3.2,7.1,7.1,7.1c3.9,0,7.1-3.2,7.1-7.1V463.5z" data-v-0c6770d8></path><path d="M687.6,477.9l31.8-18.3c0.4-0.2,0.6-0.5,0.6-0.9v-12c0-0.7-1-1.2-2.1-1.2h-63.5c-1.2,0-2.1,0.6-2.1,1.2v12\n              c0,0.3,0.2,0.6,0.6,0.9l31.8,18.3C685.4,478.4,686.7,478.4,687.6,477.9z" data-v-0c6770d8></path><linearGradient id="SVGID_00000163035412773930887840000017837636604871775888_" gradientUnits="userSpaceOnUse" x1="704.8262" y1="276.056" x2="655.0842" y2="306.016" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#EAEAEA;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#EAEAEA;stop-opacity:0;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000163035412773930887840000017837636604871775888_);fill-opacity:0.2;" d="M687.6,477.9l31.8-18.3\n              c0.4-0.2,0.6-0.5,0.6-0.9v-12c0-0.7-1-1.2-2.1-1.2h-63.5c-1.2,0-2.1,0.6-2.1,1.2v12c0,0.3,0.2,0.6,0.6,0.9l31.8,18.3\n              C685.4,478.4,686.7,478.4,687.6,477.9z" data-v-0c6770d8></path><linearGradient id="SVGID_00000065761243403019097630000001898145646948504974_" gradientUnits="userSpaceOnUse" x1="748.329" y1="254.5422" x2="610.997" y2="324.5492" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#808080;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#EAEAEA;stop-opacity:0;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000065761243403019097630000001898145646948504974_);fill-opacity:0.3;" d="M687.6,477.9l31.8-18.3\n              c0.4-0.2,0.6-0.5,0.6-0.9v-12c0-0.7-1-1.2-2.1-1.2h-63.5c-1.2,0-2.1,0.6-2.1,1.2v12c0,0.3,0.2,0.6,0.6,0.9l31.8,18.3\n              C685.4,478.4,686.7,478.4,687.6,477.9z" data-v-0c6770d8></path><path class="fx_help_st26" d="M719.2,459.5l-31.8,18.3c-0.8,0.4-2,0.4-2.8,0l-31.8-18.3c-0.4-0.2-0.6-0.5-0.6-0.8v-12c0-0.6,0.9-1.1,2-1.1\n              h63.5c1.1,0,2,0.5,2,1.1v12C719.8,459,719.6,459.2,719.2,459.5z" data-v-0c6770d8></path><path d="M652.7,445.6l31.9-18.4c0.8-0.5,2.2-0.5,3,0l31.9,18.4c0.8,0.5,0.8,1.3,0,1.7l-31.9,18.4c-0.8,0.5-2.2,0.5-3,0l-31.9-18.4\n              C651.8,446.9,651.8,446.1,652.7,445.6z" data-v-0c6770d8></path><linearGradient id="SVGID_00000035489895181843643070000012050339926938634639_" gradientUnits="userSpaceOnUse" x1="458.2177" y1="962.6408" x2="403.0169" y2="1068.2874" gradientTransform="matrix(0.866 -0.5 -0.866 -0.5 1175.797 1166.4719)" data-v-0c6770d8><stop offset="0" style="stop-color:#EFEFEF;stop-opacity:0;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#C1C1C1;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000035489895181843643070000012050339926938634639_);fill-opacity:0.6;" d="M652.7,445.6l31.9-18.4\n              c0.8-0.5,2.2-0.5,3,0l31.9,18.4c0.8,0.5,0.8,1.3,0,1.7l-31.9,18.4c-0.8,0.5-2.2,0.5-3,0l-31.9-18.4\n              C651.8,446.9,651.8,446.1,652.7,445.6z" data-v-0c6770d8></path><path class="fx_help_st33" d="M715.9,441.7c-1,10.7-28,21.8-37.5,17.4c-8-3.7-31.5-12.9-36.6-16.2l-3.5,8.3c-10.4-23.9,12.1-23.3,19.2-22.1\n              c-0.3-2.1,5.2-14,16.2-10.7c3.6,1.1,42.4,8.8,42.4,8.8C716.2,428.8,715.9,441.7,715.9,441.7z" data-v-0c6770d8></path><path class="fx_help_st34" d="M705.4,362.2c-0.1,0.4-0.6,0.7-1,1c-2.6,1.4-5.5,2.4-8.5,2.8c-1.4,0.2-2.9,0.5-4.3,0.3\n              c-0.6-0.1-1.8-0.6-2.3-0.5h-0.1c-0.4,0-1.2-0.1-1.2-0.1c-0.1-1.1-0.3-7.9-0.8-8.7c-0.5-0.8-1.8-1.4-1.8-1.4s-1.3-0.5-2.4-1.3\n              c-0.3-0.2-0.6-0.6-0.8-1.1c-0.5-1.1-0.7-2.5-0.7-2.5l-0.8-8.4c0,0-0.7-9.9,0.4-11c1.1-1.1,20.9-3,22.2,3.8\n              c1.3,6.7-0.8,17.1-0.6,18.6c0.1,1.2,0.5,2.5,0.8,3.7c0.2,0.6,0.3,1.2,0.5,1.8c0.2,0.8,0.6,1.2,1.1,1.9c0.2,0.3,0.5,0.6,0.5,1\n              C705.4,362,705.4,362.1,705.4,362.2z" data-v-0c6770d8></path><path class="fx_help_st35" d="M697.3,351.5c-3.6-0.8-3.9-9.1-6.4-10.8c-1.5-1-2.6,0.3-2.4,1.8c0,0.3,0,0.4-0.1,0.6\n              c-0.5,0.8-3.4-0.2-4.2-0.7c-3.1-1.9-1.9-6.7-4-9.6c-0.4-0.6-0.8-1.2-1.1-1.8c-0.4-0.6-0.3-1.4,0-2.1c5.8-9.9,15.1-9.8,23.7-4.5\n              c4.3,2.6,6.9,7.4,6.6,12.4c-0.4,8.2-3.8,12.9-5.5,13.4C703.9,350.2,699.3,352,697.3,351.5z" data-v-0c6770d8></path><path d="M653.8,440.8l-22.7-13l39.1-26.2l22.7,13.9L653.8,440.8z" data-v-0c6770d8></path><linearGradient id="SVGID_00000113342824017179267140000003098886163503824543_" gradientUnits="userSpaceOnUse" x1="678.0837" y1="272.0768" x2="642.7357" y2="374.2028" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#808080;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#EAEAEA;stop-opacity:0;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000113342824017179267140000003098886163503824543_);fill-opacity:0.4;" d="M653.8,440.8l-22.7-13\n              l39.1-26.2l22.7,13.9L653.8,440.8z" data-v-0c6770d8></path><path class="fx_help_st37" d="M653.8,440.8l-22.7-13l39.1-26.2l22.7,13.9L653.8,440.8z" data-v-0c6770d8></path><path class="fx_help_st38" d="M658.7,369.6l-40.1,25.2l12.6,33.3l39.6-26.7L658.7,369.6z" data-v-0c6770d8></path><path class="fx_help_st39" d="M659,368.7c0.3,0.1,0.5,0.3,0.6,0.6l12.1,31.8c0.2,0.4,0,0.9-0.4,1.1l-39.6,26.7c-0.2,0.2-0.5,0.2-0.8,0.1\n              c-0.3-0.1-0.5-0.3-0.6-0.6l-12.6-33.3c-0.2-0.4,0-0.9,0.4-1.1l40.1-25.2C658.4,368.7,658.7,368.6,659,368.7z M619.8,395.2\n              l11.9,31.4l37.9-25.6l-11.4-30L619.8,395.2z" data-v-0c6770d8></path><path class="fx_help_st34" d="M699.9,357.9c-2,1.4,0.4,13.7-8.8,16.9c-0.9,0.3-2.5-0.4-3.4-0.7c-1.6-0.4-16.6-5.9-16.8-6\n              c-0.7-0.4-2.6-2.6-4.3-3.6c-1.1-0.7-2.4-1.1-3.7-1.4c-0.3-0.1-1-0.1-1.4,0.1c-3.5,1.4-6.4,4.4-6.7,4.8c-0.3,0.3-0.4,0.5-0.3,0.8\n              c0.1,0.1,0.3,0.2,0.6,0.3c-0.4,0.6,0.4,0.8,0.8,0.8c0.4-0.1,1.5-0.4,1.5-0.4c0.3-0.1,0.5-0.1,0.8-0.1c2.1,0.5,4.7,1,5.2,1.5\n              c0.4,0.5-1.1,1.3-1.1,1.3s-2.1-0.2-2.3-0.2c-0.7,0-1.6,0.4-1.5,1.1c0.1,0.4,0.5,0.6,0.8,0.7c0.6,0.2,2.9,0.6,2.9,0.6\n              c0.8-0.2,5.5-1,5.5-1s21.8,13.2,35.1,12.9c1.1,0,6-6.6,6.9-13.9C710.4,367.2,706.5,353.4,699.9,357.9z" data-v-0c6770d8></path><path class="fx_help_st40" d="M717.2,383c1-0.5,1.5-1.5,1.5-2.6c0-4.7-0.1-12.8-0.8-16.5c-1.9-9-12.4-12.3-14.4,0.5\n              c-0.6,4-1.3,16.9-1.3,16.9C704.2,384.9,712.9,385.3,717.2,383z" data-v-0c6770d8></path><linearGradient id="SVGID_00000012467958202253323130000002485789074841168271_" gradientUnits="userSpaceOnUse" x1="766.0797" y1="354.5563" x2="665.4917" y2="381.6473" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000012467958202253323130000002485789074841168271_);" d="M717.2,383c1-0.5,1.5-1.5,1.5-2.6\n              c0-4.7-0.1-12.8-0.8-16.5c-1.9-9-12.4-12.3-14.4,0.5c-0.6,4-1.3,16.9-1.3,16.9C704.2,384.9,712.9,385.3,717.2,383z" data-v-0c6770d8></path><path class="fx_help_st40" d="M711.2,356c-5.6-1.1-34.6,14.8-35.2,18.3c0,0,2.3,10.6,1.2,24.6c-0.6,7.4,0.4,31.5-0.4,36.7\n              c-0.1,0.8,0.1,1.7,0.7,2.2c9.1,8.4,38.5,4.6,37.8-5.5c0,0,0.3-15.1,0-27.9C714.9,382.1,716.8,360.9,711.2,356z" data-v-0c6770d8></path><linearGradient id="SVGID_00000154428390506372732960000014346254192276559753_" gradientUnits="userSpaceOnUse" x1="832.1345" y1="312.9915" x2="586.4144" y2="364.7685" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000154428390506372732960000014346254192276559753_);" d="M711.2,356c-5.6-1.1-34.6,14.8-35.2,18.3\n              c0,0,2.3,10.6,1.2,24.6c-0.6,7.4,0.4,31.5-0.4,36.7c-0.1,0.8,0.1,1.7,0.7,2.2c9.1,8.4,38.5,4.6,37.8-5.5c0,0,0.3-15.1,0-27.9\n              C714.9,382.1,716.8,360.9,711.2,356z" data-v-0c6770d8></path><path class="fx_help_st43" d="M672.6,398.7c0.3-1.4,0.5-2.7,0.7-3.9c4.5-0.5,7.6,0,11.8,1.3c-1,3.3-1.1,4.3-1.3,5.6c-0.2,1.2-0.3,2.5-1.3,6\n              c-0.9,3.2-2.2,6.7-4.5,8.3c-0.6,0.8-1.5,1.3-2.6,1.5l-10.1,2.1c-0.1,0-0.3,0-0.4,0.1c-0.4,0.2-0.8,0.3-1.2,0.5\n              c-2,0.8-4.4,1.9-6.3,3c-0.1,0.1-0.2,0.1-0.3,0.2c-0.2,0.1-0.4,0.3-0.5,0.5c0,0.1-0.1,0.1-0.1,0.2l0,0l0,0c0,0,0,0.1,0,0.1\n              c-0.2,0.3-0.6,1-0.8,1.2c-0.2,0.2-0.5,0.4-0.8,0.4c-0.2,0-0.4-0.1-0.6-0.1c-0.1,0-0.3-0.1-0.4-0.1c0,0,0,0-0.1,0l0,0\n              c-0.3-0.2-0.3-0.4-0.4-0.8c0-0.1-0.1-0.2-0.1-0.5l0,0c-0.3-1.2-1.1-4,0.3-7.1c0-0.1,0.1-0.2,0.1-0.3c0.2-0.2,0.1-0.6,0.1-0.9l0,0\n              c0-0.1,0-0.1,0-0.2c0-0.4,0.3-0.8,0.6-1c0.5-0.4,2.7-1,3.2-1.2c0.1,0,0.2,0,0.2,0c0.3,0,0.7,0,1.3-0.1c1.3-0.1,2.5-0.2,3.8-0.4\n              c0.1,0,0.1-0.1,0.2-0.1l7.6-3.4c0.2-2.6,0.9-5.9,1.7-10.1L672.6,398.7z" data-v-0c6770d8></path><path class="fx_help_st40" d="M672.9,484.6c2.1,2,4,5,1,8.1c-5.9,6.1-24.5,9.9-26.2,7.1c-1.7-2.9,3.3-7.4,10.2-11.6\n              C664.9,484,670.4,482.1,672.9,484.6z" data-v-0c6770d8></path><linearGradient id="SVGID_00000052089407513350243800000003844884605380425896_" gradientUnits="userSpaceOnUse" x1="648.6191" y1="178.1322" x2="672.1791" y2="303.3472" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000052089407513350243800000003844884605380425896_);" d="M672.9,484.6c2.1,2,4,5,1,8.1\n              c-5.9,6.1-24.5,9.9-26.2,7.1c-1.7-2.9,3.3-7.4,10.2-11.6C664.9,484,670.4,482.1,672.9,484.6z" data-v-0c6770d8></path><path class="fx_help_st33" d="M659.8,491.3c0.8,1,9.7-4.4,10.4-6.3c0.3-1-7.8-15.6-13-26c-3.9-11-8.5-19.3-6.5-15.4l-11,12.3\n              C642.3,467.8,646.2,474.4,659.8,491.3z" data-v-0c6770d8></path><path class="fx_help_st33" d="M660.5,491.4l-8.6-44.2l-1.4-6.6l-8.1-3.6l-6.5,5.1c-0.1,10.4,5.4,20,7.1,25.3\n              C644.6,472.8,657.2,491.6,660.5,491.4z" data-v-0c6770d8></path><path class="fx_help_st40" d="M679.6,400c2.4,0.2,5.1-0.2,6.8-1.1c0.6-4.3,2-14.3,1.8-18.8c-0.6-8.8-8.5-13.6-13.3-4.7\n              c-0.9,1.7-1.4,3.8-1.8,5.7c-1.3,5.4,0,15,0,15C675.4,398.8,676,399.7,679.6,400z" data-v-0c6770d8></path><linearGradient id="SVGID_00000106839244906244467250000007416497264194416279_" gradientUnits="userSpaceOnUse" x1="731.6428" y1="336.9158" x2="638.9048" y2="368.8518" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-0c6770d8><stop offset="0" style="stop-color:#44FFF9;" data-v-0c6770d8></stop><stop offset="0.1667" style="stop-color:#7188FF;" data-v-0c6770d8></stop><stop offset="0.5118" style="stop-color:#FF5178;" data-v-0c6770d8></stop><stop offset="0.8333" style="stop-color:#FFB719;" data-v-0c6770d8></stop><stop offset="1" style="stop-color:#D153D1;" data-v-0c6770d8></stop></linearGradient><path style="fill:url(#SVGID_00000106839244906244467250000007416497264194416279_);" d="M679.6,400c2.4,0.2,5.1-0.2,6.8-1.1\n              c0.6-4.3,2-14.3,1.8-18.8c-0.6-8.8-8.5-13.6-13.3-4.7c-0.9,1.7-1.4,3.8-1.8,5.7c-1.3,5.4,0,15,0,15\n              C675.4,398.8,676,399.7,679.6,400z" data-v-0c6770d8></path></g></g></svg></div>', 1)
      ])]);
    };
  }
});

const FxHelpPageDark = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0c6770d8"]]);

const _hoisted_1 = { class: "w-full flex flex-col et-js et-gap-md et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-gap-md" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "text-txt-muted" };
const _hoisted_5 = { class: "relative @container w-full flex flex-col et-js-is et-gap-lg" };
const _hoisted_6 = { class: "w-full flex flex-wrap et-gap-md" };
const _hoisted_7 = {
  key: 0,
  class: "w-full flex flex-col et-gap-md max-w-120 @2xl:max-w-200"
};
const _hoisted_8 = { class: "w-full grid grid-cols-1 @3xl:grid-cols-2 et-gap-md" };
const _hoisted_9 = {
  key: 1,
  class: "w-full flex flex-col et-gap-lg et-js-is"
};
const _hoisted_10 = { class: "w-full grid grid-cols-1 @2xl:grid-cols-2 et-gap-md max-w-120 @2xl:max-w-200 mt-4" };
const _hoisted_11 = { class: "grid grid-cols-1 @2xl:grid-cols-2 et-gap-md" };
const _hoisted_12 = {
  key: 3,
  class: "w-full flex flex-col et-gap-lg et-js-is"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageGovernance",
  setup(__props) {
    const $t = useTranslation().t;
    const { isSmallerThanXS } = useScreenSize();
    const {
      accountSettings,
      accountGovernance
    } = useSelectedAccount();
    const {
      isGovDelegated,
      isGovDelegatedToSelf,
      delegatedDRepId,
      accountDRepId,
      accountDRepInfo
    } = accountGovernance;
    const accountDRepRegistered = accountDRepInfo.dRepRegistered;
    const isRegistered = accountSettings.isRegistered;
    const options = ref([
      { primaryLabel: $t("governance-page:delegation.common"), value: 1, disabled: false }
    ]);
    const selectedOption = ref(options.value[0]);
    watch(isGovDelegatedToSelf, () => {
      if (isGovDelegatedToSelf.value) {
        options.value = [
          { primaryLabel: $t("governance-page:delegation.common"), value: 1, disabled: false },
          { primaryLabel: $t("governance-page:proposals"), value: 2, disabled: false },
          { primaryLabel: $t("governance-page:information"), value: 3, disabled: false },
          { primaryLabel: $t("governance-voting:pendingVotes.title"), value: 4, disabled: false }
        ];
      } else {
        options.value = [
          { primaryLabel: $t("governance-page:delegation.common"), value: 1, disabled: false },
          { primaryLabel: $t("governance-page:proposals"), value: 2, disabled: false },
          { primaryLabel: $t("governance-page:information"), value: 3, disabled: false }
        ];
      }
      selectedOption.value = options.value[0];
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$d, {
            title: unref($t)("governance-page:title"),
            animation: FxHelpPageDark,
            animationClass: "absolut -top-0 right-0 w-[45%] -translate-y-[15%]"
          }, createSlots({
            icon: withCtx(() => [
              createVNode(IconVoting, { class: "size-5" })
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_3, toDisplayString(unref($t)("governance-page:caption")), 1)
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_4, toDisplayString(unref($t)("governance-page:subCaption")), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"]),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_sfc_main$e, {
              "selected-tab": selectedOption.value,
              "onUpdate:selectedTab": _cache[0] || (_cache[0] = ($event) => selectedOption.value = $event),
              "tab-labels": options.value,
              "compact-on-mobile": ""
            }, null, 8, ["selected-tab", "tab-labels"]),
            createBaseVNode("div", _hoisted_6, [
              createVNode(_sfc_main$2),
              selectedOption.value.value != 4 ? (openBlock(), createBlock(_sfc_main$4, { key: 0 })) : selectedOption.value.value === 4 ? (openBlock(), createBlock(_sfc_main$3, { key: 1 })) : createCommentVNode("", true)
            ]),
            selectedOption.value.value === 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              unref(isRegistered) && (!unref(epochParams) || !unref(epochParams).isAtLeastConwayEra || unref(epochParams).isAtLeastConwayEra2 && !unref(isGovDelegated) || unref(epochParams).isAtLeastConwayEra && !unref(isGovDelegated)) ? (openBlock(), createElementBlock("div", _hoisted_7, [
                !unref(epochParams) || !unref(epochParams).isAtLeastConwayEra ? (openBlock(), createBlock(_sfc_main$f, {
                  key: 0,
                  headline: unref($t)("governance-page:banner.era.title")
                }, null, 8, ["headline"])) : unref(epochParams).isAtLeastConwayEra2 && !unref(isGovDelegated) ? (openBlock(), createBlock(_sfc_main$f, {
                  key: 1,
                  headline: unref($t)("governance-page:banner.notDelegated.title"),
                  caption: unref($t)("governance-page:banner.notDelegated.caption"),
                  collapsed: ""
                }, null, 8, ["headline", "caption"])) : unref(epochParams).isAtLeastConwayEra && !unref(isGovDelegated) ? (openBlock(), createBlock(_sfc_main$f, {
                  key: 2,
                  headline: unref($t)("governance-page:banner.notDelegated.title"),
                  caption: unref($t)("governance-page:banner.notDelegated.caption")
                }, null, 8, ["headline", "caption"])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_8, [
                unref(delegatedDRepId) ? (openBlock(), createBlock(_sfc_main$g, {
                  key: 0,
                  cardDRepId: unref(delegatedDRepId),
                  size: "small"
                }, null, 8, ["cardDRepId"])) : unref(accountDRepId) && unref(accountDRepRegistered) ? (openBlock(), createBlock(_sfc_main$g, {
                  key: 1,
                  cardDRepId: unref(accountDRepId),
                  size: "small"
                }, null, 8, ["cardDRepId"])) : createCommentVNode("", true),
                !unref(accountDRepRegistered) ? (openBlock(), createBlock(_sfc_main$8, { key: 2 })) : createCommentVNode("", true),
                unref(networkId) === "mainnet" && !unref(isGovDelegated) ? (openBlock(), createBlock(_sfc_main$g, {
                  key: 3,
                  cardDRepId: "drep1y29h2q6cst2pvkl2sqqvf5ljcy36uv7pmy482xnczddzgqshus24w"
                })) : createCommentVNode("", true)
              ])
            ], 64)) : selectedOption.value.value === 2 ? (openBlock(), createElementBlock("div", _hoisted_9, [
              createVNode(_sfc_main$a)
            ])) : selectedOption.value.value === 3 ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createBaseVNode("div", _hoisted_10, [
                createVNode(_sfc_main$5, { class: "col-span-2" })
              ]),
              createBaseVNode("div", _hoisted_11, [
                createVNode(_sfc_main$7),
                createVNode(_sfc_main$6)
              ])
            ], 64)) : selectedOption.value.value === 4 ? (openBlock(), createElementBlock("div", _hoisted_12, [
              createVNode(_sfc_main$9)
            ])) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
});

export { _sfc_main as default };
