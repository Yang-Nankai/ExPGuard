import { n as noLogo } from './image.js';
import { d as defineComponent, m as createElementBlock, u as unref, b0 as isBackendServerSet, o as openBlock } from './index.js';
import { g as getSwapURL } from './swap.js';

const _hoisted_1 = ["src", "alt"];
const _hoisted_2 = ["src"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TokenIcon",
  props: {
    policyId: { type: String, required: true, default: "" },
    hexName: { type: String, required: true, default: "" },
    name: { type: String, required: true, default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return unref(isBackendServerSet) > 0 ? (openBlock(), createElementBlock("img", {
        key: 0,
        class: "size-7 rounded-full",
        src: unref(getSwapURL)() + "/mainnet/v2/swap/icons/token/" + (__props.policyId === "lovelace" ? "lovelace-blue" : __props.policyId) + __props.hexName,
        alt: __props.name + " icon"
      }, null, 8, _hoisted_1)) : (openBlock(), createElementBlock("img", {
        key: 1,
        class: "size-7 rounded-full",
        src: unref(noLogo),
        alt: "noLogo icon"
      }, null, 8, _hoisted_2));
    };
  }
});

export { _sfc_main as _ };
