import { g as getRandomId } from './epochParams.js';
import { u as useFormatter } from './useFormatter.js';
import { d as defineComponent, Y as toRefs, e as ref, D as computed, f as onMounted, aE as addSignalListener, b3 as onInterval1s, aY as onBeforeUnmount, aF as removeSignalListener, m as createElementBlock, o as openBlock, t as createCommentVNode, H as createTextVNode, B as toDisplayString } from './index.js';

const _hoisted_1 = { class: "relative flex flex-row et-js-ic et-gap-sm et-text-xs text-txt-muted whitespace-nowrap" };
const _hoisted_2 = {
  key: 0,
  class: "pi pi-spinner pi-spin"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SwapTimeAgo",
  props: {
    timestamp: { type: Number, required: true },
    isLoading: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const { formatTimeAgo } = useFormatter();
    const storeId = "SwapTimeAgo-" + getRandomId();
    const props = __props;
    const { timestamp } = toRefs(props);
    const now = ref(Date.now());
    const formattedTimestamp = computed(() => {
      const val = now.value - timestamp.value;
      return formatTimeAgo(val > 0 ? val : 0, false, true);
    });
    onMounted(() => {
      addSignalListener(onInterval1s, storeId, updateCurrentTimestamp);
    });
    onBeforeUnmount(() => {
      removeSignalListener(onInterval1s, storeId);
    });
    const updateCurrentTimestamp = () => {
      now.value = Date.now();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        __props.isLoading ? (openBlock(), createElementBlock("i", _hoisted_2)) : createCommentVNode("", true),
        createTextVNode(toDisplayString(formattedTimestamp.value), 1)
      ]);
    };
  }
});

export { _sfc_main as _ };
