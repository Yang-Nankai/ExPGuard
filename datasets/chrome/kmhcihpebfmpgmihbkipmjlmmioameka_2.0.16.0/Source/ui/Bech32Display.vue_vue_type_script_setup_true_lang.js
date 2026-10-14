import { x as useScreenSize, e as ref, G as watch, D as computed, d as defineComponent, Y as toRefs, m as createElementBlock, t as createCommentVNode, o as openBlock, n as createVNode, y as withCtx, p as createBaseVNode, H as createTextVNode, B as toDisplayString, u as unref, V as normalizeClass } from './index.js';
import { _ as _sfc_main$1 } from './ExplorerLink.vue_vue_type_script_setup_true_lang.js';

const useAddressTruncate = (content, elWidth, noShortenedAddress) => {
  const { isSmallerThanSM } = useScreenSize();
  const addressPart1List = ref([]);
  const addressPart2List = ref([]);
  const addressEnd = ref("");
  const addressPartIndex = ref(0);
  const _maxWidthSM = ref(670);
  const _maxWidth = ref(900);
  watch([() => addressPart1List.value.length, elWidth, noShortenedAddress], () => {
    if (noShortenedAddress.value) {
      addressPartIndex.value = 0;
      return;
    }
    if (elWidth.value > 0) {
      const minWidth = isSmallerThanSM.value ? 190 : 250;
      const maxWidth = isSmallerThanSM.value ? _maxWidthSM.value : _maxWidth.value;
      const factor = Math.min(
        1,
        Math.max(
          0,
          (elWidth.value - 30 - minWidth) / (maxWidth - minWidth)
        )
      );
      addressPartIndex.value = Math.floor((1 - factor) * (addressPart1List.value.length - 1));
    }
  });
  const addressStart = computed(() => {
    if (addressPart1List.value.length === 0 || addressPart1List.value.length < addressPartIndex.value) {
      return "";
    }
    if (addressPartIndex.value === 0) {
      return addressPart1List.value[0];
    }
    return addressPart1List.value[addressPartIndex.value] + "..." + addressPart2List.value[addressPartIndex.value];
  });
  const doReset = () => {
    addressPart1List.value.length = 0;
    addressPart2List.value.length = 0;
    addressEnd.value = "";
  };
  const prepareAddressList = (address) => {
    doReset();
    if (!address) {
      return;
    }
    let addr = address;
    const length = addr.length;
    _maxWidth.value = length * 9;
    _maxWidthSM.value = length * 6.7;
    const lengthHalf = Math.floor(length / 2) - 1;
    addressEnd.value = addr.slice(length - 6);
    addr = addr.slice(0, length - 6);
    addressPart1List.value.push(addr);
    addressPart2List.value.push("");
    for (let i = 2, k = 1; i < lengthHalf - 10; i += 1, k++) {
      addressPart1List.value.push(addr.slice(0, lengthHalf - i));
      addressPart2List.value.push(addr.slice(length - lengthHalf + i));
    }
  };
  watch(content, () => {
    prepareAddressList(content.value);
  }, { immediate: true });
  return {
    addressStart,
    addressEnd,
    prepareAddressList
  };
};

const _hoisted_1 = {
  key: 0,
  class: "max-w-full flex flex-row et-js-is et-gap-xs font-mono text-left"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Bech32Display",
  props: {
    content: { type: String, required: true },
    fullWidth: { type: Boolean, required: false, default: true },
    noShortenedAddress: { type: Boolean, required: false, default: false },
    popoverLeft: { type: Boolean, required: false, default: false },
    popoverRight: { type: Boolean, required: false, default: false },
    small: { type: Boolean, required: false, default: false },
    explorerLinkType: { type: String, required: true },
    explorerLinkSubject: { required: true },
    additionalMenuOptions: { type: Array, required: false, default: [] }
  },
  setup(__props) {
    const props = __props;
    const { noShortenedAddress } = toRefs(props);
    const content = computed(() => {
      return props.content;
    });
    const fontAddress = computed(() => {
      if (props.small) {
        return "et-text-xs";
      }
      return "et-text-sm";
    });
    const elWidth = ref(0);
    const {
      addressStart,
      addressEnd
    } = useAddressTruncate(content, elWidth, noShortenedAddress);
    return (_ctx, _cache) => {
      return content.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_sfc_main$1, {
          class: "w-full max-w-full",
          type: __props.explorerLinkType,
          "el-width": elWidth.value,
          "onUpdate:elWidth": _cache[0] || (_cache[0] = ($event) => elWidth.value = $event),
          subject: __props.explorerLinkSubject,
          "copy-text": content.value,
          "popover-left": __props.popoverLeft,
          "popover-right": __props.popoverRight,
          "additional-menu-options": __props.additionalMenuOptions,
          compact: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass(["flex et-js-ic", (__props.fullWidth ? "grow" : "") + " " + fontAddress.value])
            }, [
              createBaseVNode("span", null, [
                createTextVNode(toDisplayString(unref(addressStart)), 1),
                createBaseVNode("span", {
                  class: normalizeClass([fontAddress.value, "font-black italic et-text-md! et-text-gradient-negative ml-0.5"])
                }, toDisplayString(unref(addressEnd)), 3)
              ])
            ], 2)
          ]),
          _: 1
        }, 8, ["type", "el-width", "subject", "copy-text", "popover-left", "popover-right", "additional-menu-options"])
      ])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
