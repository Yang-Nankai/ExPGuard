import { d as defineComponent, D as computed, aJ as toHexString, c as createBlock, o as openBlock } from './index.js';
import { V as getAddressCredentials } from './app2.js';
import { _ as _sfc_main$1 } from './Bech32Display.vue_vue_type_script_setup_true_lang.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TransactionUTxOAddress",
  props: {
    address: { type: String, required: true },
    fullWidth: { type: Boolean, required: false, default: true },
    noShortenedAddress: { type: Boolean, required: false, default: false },
    popoverLeft: { type: Boolean, required: false, default: false },
    popoverRight: { type: Boolean, required: false, default: false },
    small: { type: Boolean, required: false, default: false },
    additionalMenuOptions: { type: Array, required: false, default: [] }
  },
  setup(__props) {
    const props = __props;
    const explorerAddress = computed(() => {
      const address = props.address;
      if (!address) {
        return null;
      }
      const addrHex = toHexString(getAddressCredentials(address, null, true).addressBytes);
      return {
        bech32: address,
        hash: addrHex
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        content: __props.address,
        fullWidth: __props.fullWidth,
        noShortenedAddress: __props.noShortenedAddress,
        popoverLeft: __props.popoverLeft,
        popoverRight: __props.popoverRight,
        small: __props.small,
        "explorer-link-type": "address",
        "explorer-link-subject": explorerAddress.value,
        "additional-menu-options": __props.additionalMenuOptions
      }, null, 8, ["content", "fullWidth", "noShortenedAddress", "popoverLeft", "popoverRight", "small", "explorer-link-subject", "additional-menu-options"]);
    };
  }
});

export { _sfc_main as _ };
