import { u as useSelectedAccount } from './useSelectedAccount.js';
import { a as useLayoutBuilder, u as useLayout } from './useLayoutBuilder.js';
import { I as IconPencil } from './IconPencil.js';
import { d as defineComponent, z as resolveComponent, c as createBlock, o as openBlock, y as withCtx, p as createBaseVNode, W as resolveDynamicComponent, B as toDisplayString, e as ref, f as onMounted, m as createElementBlock, t as createCommentVNode, u as unref, n as createVNode, T as Teleport, ae as isRef, F as Fragment, S as renderList, af as mergeProps } from './index.js';
import { _ as _sfc_main$2 } from './IconTrashbin.vue_vue_type_script_setup_true_lang.js';
import './app2.js';
import './NetworkId.js';
import './bigmath.js';
import './epochParams.js';
import './useAppAccountBalances.js';
import './AdaPriceChart.vue_vue_type_script_setup_true_lang.js';
import './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import './parse.js';
import './ErrorSignTx.js';
import './useSignTx.js';
import './creds.js';
import './chain.js';
import './useModalAssetDetails.js';
import './image.js';
import './useGuards.js';
import './IconAlert02.js';
import './_plugin-vue_export-helper.js';
import './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import './useFormatter.js';
import './language.js';
import './index3.js';
import './useNotification.js';
import './notification.js';
import './useBalanceVisible.js';
import './IconCancel01.js';
import './useAppMode.js';
import './useAdaSymbol.js';
import './useNavigation.js';
import './send.js';
import './useResetScroll.js';
import './useModalReceiveAddress.js';
import './useModalBuyADA.js';
import './SyncInfo.vue_vue_type_script_setup_true_lang.js';
import './FiatAmount.vue_vue_type_script_setup_true_lang.js';
import './useCurrencyAPI.js';
import './currency2.js';
import './index2.js';
import './AdaHandleName.vue_vue_type_script_setup_true_lang.js';
import './useHomeSettings.js';
import './txHistory.js';
import './history.js';
import './contractMapping.js';
import './IconSpinner.js';
import './LineSpacer.js';
import './TransactionItem.vue_vue_type_script_setup_true_lang.js';
import './TransactionItemHeader.vue_vue_type_script_setup_true_lang.js';
import './Badge.vue_vue_type_script_setup_true_lang.js';
import './TransactionItemMessages.vue_vue_type_script_setup_true_lang.js';
import './messageEncryption.js';
import './decryptedMsg.js';
import './IconSquareUnlock02.js';
import './chainTip.js';
import './useSubmitTx.js';
import './ErrorSubmitTx.js';
import './lib.js';
import './swap.js';
import './generateConfig.js';
import './govActionList.js';
import './MilkomedaDB.js';
import './IconArrowLB.js';
import './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import './Badges.vue_vue_type_script_setup_true_lang.js';
import './StakeRewardsChart.vue_vue_type_script_setup_true_lang.js';
import './ButtonRow.js';
import './SwapElement.vue_vue_type_script_setup_true_lang.js';
import './useApp.js';
import './IconSettings.vue_vue_type_script_setup_true_lang.js';
import './ExternalLink.vue_vue_type_script_setup_true_lang.js';
import './IconChevronDown.js';
import './TokenIcon.vue_vue_type_script_setup_true_lang.js';
import './SwapTimeAgo.vue_vue_type_script_setup_true_lang.js';
import './BannerWarning.vue_vue_type_script_setup_true_lang.js';
import './IconTransactionOutline.js';
import './IconStakingOutline.js';
import './IconMonsterSwap.js';

const _hoisted_1$1 = { class: "text-center et-text-sm" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LayoutBuilderElementCard",
  props: {
    icon: { type: Object },
    label: { type: String, default: "NoLabel" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "aspect-square flex flex-col et-js-ic et-gap-sm et-bg-2 p-4 pt-10 cursor-pointer",
        severity: "secondary"
      }, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(__props.icon), { class: "w-6" })),
          createBaseVNode("div", _hoisted_1$1, toDisplayString(__props.label), 1)
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "absolute z-10 right-0 top-1/2 -translateY-1/2"
};
const _hoisted_2 = { class: "flex flex-col et-gap-md" };
const _hoisted_3 = { class: "flex flex-col gap-4 w-[26rem]" };
const _hoisted_4 = { class: "grid grid-cols-3 et-gap-sm" };
const _hoisted_5 = { class: "absolute right-0 top-0 flex flex-row et-gap-md et-js-ic pointer-events-auto" };
const _hoisted_6 = { class: "h-full relative overflow-y-auto" };
const _hoisted_7 = {
  key: 0,
  class: "absolute z-99 flex items-center justify-center w-8 aspect-square left-2 top-2 et-bg-3 p-1 rounded-full"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomHome",
  setup(__props) {
    const {
      switchMenuStyle,
      menuStyle
    } = useLayout();
    const {
      layoutLoaded,
      componentMap,
      isEditing,
      handleMove,
      layout,
      initializeLayout,
      addComponentToLayout,
      removeComponentById
    } = useLayoutBuilder("dashboard");
    const menuStyleButtonLabelMock = {
      "compact": "Switch menu to wallet list",
      "walletlist": "Switch menu to compact list"
    };
    const {
      selectedAccountId,
      selectedWalletId} = useSelectedAccount();
    const addElementPopover = ref();
    ref(false);
    const toggleAddElement = (event) => {
      addElementPopover.value.toggle(event);
    };
    onMounted(() => {
      initializeLayout();
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _component_Popover = resolveComponent("Popover");
      const _component_grid_item = resolveComponent("grid-item");
      const _component_grid_layout = resolveComponent("grid-layout");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(isEditing) ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(_component_Card, null, {
            content: withCtx(() => [
              createBaseVNode("div", _hoisted_2, [
                createVNode(_component_Button, {
                  onClick: unref(switchMenuStyle),
                  label: menuStyleButtonLabelMock?.[unref(menuStyle)],
                  severity: "secondary",
                  rounded: ""
                }, null, 8, ["onClick", "label"]),
                createVNode(_component_Button, {
                  onClick: toggleAddElement,
                  label: "Add element",
                  severity: "secondary",
                  rounded: ""
                })
              ])
            ]),
            _: 1
          }),
          createVNode(_component_Popover, {
            ref_key: "addElementPopover",
            ref: addElementPopover
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("div", null, [
                  _cache[2] || (_cache[2] = createBaseVNode("span", { class: "font-medium block mb-2" }, "Add an element", -1)),
                  createBaseVNode("div", _hoisted_4, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(componentMap), (_component) => {
                      return openBlock(), createBlock(_sfc_main$1, mergeProps({ ref_for: true }, _component, {
                        onClick: ($event) => unref(addComponentToLayout)(_component)
                      }), null, 16, ["onClick"]);
                    }), 256))
                  ])
                ])
              ])
            ]),
            _: 1
          }, 512)
        ])) : createCommentVNode("", true),
        (openBlock(), createBlock(Teleport, {
          defer: "",
          to: "#favorite-accounts"
        }, [
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_Button, {
              onClick: _cache[0] || (_cache[0] = ($event) => isEditing.value = !unref(isEditing)),
              label: unref(isEditing) ? "Disable editor" : "Edit page",
              rounded: "",
              severity: "secondary"
            }, {
              icon: withCtx(() => [
                createVNode(IconPencil, { class: "w-6 aspect-square" })
              ]),
              _: 1
            }, 8, ["label"])
          ])
        ])),
        unref(layoutLoaded) ? (openBlock(), createBlock(_component_grid_layout, {
          key: 1,
          class: "w-full",
          layout: unref(layout),
          "onUpdate:layout": _cache[1] || (_cache[1] = ($event) => isRef(layout) ? layout.value = $event : null),
          "col-num": 12,
          "row-height": 30,
          onNocMoveEnd: unref(handleMove),
          draggable: !unref(isEditing),
          responsive: true
        }, {
          default: withCtx(({ gridItemProps }) => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(layout), (item) => {
              return openBlock(), createBlock(_component_grid_item, mergeProps({ ref_for: true }, gridItemProps, {
                id: item.id,
                key: item.id,
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h,
                onNocMoveEnd: unref(handleMove)
              }), {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    unref(isEditing) ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(item.id), 1)) : createCommentVNode("", true),
                    unref(isEditing) ? (openBlock(), createBlock(_component_Button, {
                      key: 1,
                      onClick: ($event) => unref(removeComponentById)(item.id),
                      class: "absolute z-99 flex items-center justify-center w-8 aspect-square right-2 top-2 et-bg-3 p-1 rounded-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { class: "w-5" })
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true),
                    item.component ? (openBlock(), createBlock(resolveDynamicComponent(unref(componentMap)[item.component].c), mergeProps({
                      key: 2,
                      "wallet-id": unref(selectedWalletId),
                      "account-id": unref(selectedAccountId)
                    }, { ref_for: true }, item.props), null, 16, ["wallet-id", "account-id"])) : (openBlock(), createBlock(_component_Card, {
                      key: 3,
                      class: "h-full"
                    }))
                  ])
                ]),
                _: 2
              }, 1040, ["id", "x", "y", "w", "h", "onNocMoveEnd"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["layout", "onNocMoveEnd", "draggable"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});

export { _sfc_main as default };
