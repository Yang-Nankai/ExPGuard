import { d as defineComponent, ab as mergeModels, ac as useModel, Y as toRefs, x as useScreenSize, D as computed, c as createBlock, o as openBlock, u as unref, y as withCtx, V as normalizeClass, z as resolveComponent, a0 as renderSlot, p as createBaseVNode, B as toDisplayString } from './index.js';

const _hoisted_1 = { class: "cap-first" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TabsToSelect",
  props: /* @__PURE__ */ mergeModels({
    tabLabels: { type: Array, required: true },
    compactOnMobile: { type: Boolean, required: false, default: false },
    compactOnCount: { type: Number, required: false, default: 0 },
    allowWrap: { type: Boolean, required: false, default: false },
    isSmall: { type: Boolean, required: false, default: false },
    dropDownSize: { type: String, required: false, default: "sm" }
  }, {
    "selectedTab": { type: Object, required: true },
    "selectedTabModifiers": {}
  }),
  emits: ["update:selectedTab"],
  setup(__props) {
    const selectedTab = useModel(__props, "selectedTab");
    const props = __props;
    const { tabLabels } = toRefs(props);
    const { isSmallerThanSM } = useScreenSize(props.dropDownSize);
    const _isSmall = computed(() => isSmallerThanSM.value || props.isSmall);
    const showDropdown = computed(() => {
      if (props.compactOnMobile) {
        if (_isSmall.value) {
          return true;
        }
      }
      if (props.compactOnCount > 0) {
        return props.tabLabels.length > props.compactOnCount;
      }
      return false;
    });
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      const _component_SelectButton = resolveComponent("SelectButton");
      return showDropdown.value ? (openBlock(), createBlock(_component_Select, {
        key: 0,
        class: "grow pl-4",
        modelValue: selectedTab.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedTab.value = $event),
        options: unref(tabLabels),
        pt: { label: "et-text-md text-left" },
        optionLabel: "primaryLabel"
      }, null, 8, ["modelValue", "options"])) : (openBlock(), createBlock(_component_SelectButton, {
        key: 1,
        class: normalizeClass(__props.allowWrap ? "flex-wrap" : "flex-nowrap"),
        modelValue: selectedTab.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedTab.value = $event),
        options: unref(tabLabels),
        "allow-empty": false,
        optionLabel: "primaryLabel",
        optionDisabled: "disabled"
      }, {
        option: withCtx((slotProps) => [
          renderSlot(_ctx.$slots, "icon-left", {
            item: slotProps.option
          }),
          createBaseVNode("span", _hoisted_1, toDisplayString(slotProps.option.primaryLabel), 1),
          renderSlot(_ctx.$slots, "icon-right", {
            item: slotProps.option
          })
        ]),
        _: 3
      }, 8, ["class", "modelValue", "options"]));
    };
  }
});

export { _sfc_main as _ };
