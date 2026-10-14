import { d as defineComponent, D as computed, c as createBlock, o as openBlock, z as resolveComponent, af as mergeProps, $ as createSlots, S as renderList, y as withCtx, a0 as renderSlot, a9 as normalizeProps, aa as guardReactiveProps } from './index.js';

const _sizeMap = {
  tiny: "h-6",
  thin: "h-8",
  normal: "",
  thick: "h-16"
};
const getButtonSize = (buttonSize) => {
  return _sizeMap[buttonSize];
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ButtonOutline",
  props: {
    size2: { type: String, required: false, default: "normal" }
  },
  setup(__props) {
    const props = __props;
    const _size = computed(() => getButtonSize(props.size2));
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, mergeProps(_ctx.$attrs, {
        class: ["", _size.value],
        severity: "secondary",
        rounded: "",
        outlined: "",
        pt: { label: "whitespace-nowrap" }
      }), createSlots({ _: 2 }, [
        renderList(_ctx.$slots, (_, name) => {
          return {
            name,
            fn: withCtx((slotProps) => [
              renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotProps || {})))
            ])
          };
        })
      ]), 1040, ["class"]);
    };
  }
});

export { _sfc_main as _, getButtonSize as g };
