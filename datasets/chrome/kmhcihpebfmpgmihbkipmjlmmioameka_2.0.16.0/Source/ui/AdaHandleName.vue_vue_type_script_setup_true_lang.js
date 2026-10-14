import { u as useBalanceVisible } from './useBalanceVisible.js';
import { d as defineComponent, D as computed, m as createElementBlock, o as openBlock, V as normalizeClass, p as createBaseVNode, a0 as renderSlot, u as unref, B as toDisplayString } from './index.js';

const _hoisted_1 = {
  key: 1,
  class: "truncate"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdaHandleName",
  props: {
    adaHandleName: { type: String, required: true },
    size: { type: String, required: false, default: void 0 }
  },
  setup(__props) {
    const { isBalanceVisible } = useBalanceVisible();
    const props = __props;
    const cssName = computed(() => {
      if (props.size === "tiny") {
        return "text-xs";
      }
      if (props.size === "small") {
        return "et-text-lg";
      }
      return "et-text-2xl";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["shrink grow max-w-full flex et-js-ic sm:et-js-ic gap-0.5 font-semibold no-cap-first", cssName.value])
      }, [
        _cache[0] || (_cache[0] = createBaseVNode("span", { class: "text-[#0fd25b] font-black font-mono" }, "$", -1)),
        unref(isBalanceVisible) ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass([_ctx.$slots.copy ? "mr-2" : "", "truncate"])
        }, toDisplayString(__props.adaHandleName), 3)) : (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString("*".repeat(6)), 1)),
        renderSlot(_ctx.$slots, "copy")
      ], 2);
    };
  }
});

export { _sfc_main as _ };
