import { Z as useLocalStorage, P as networkId, e as ref, d as defineComponent, m as createElementBlock, o as openBlock, v as createStaticVNode, p as createBaseVNode, D as computed, c_ as getAutoSubmitTx, db as getSoundsEnabled, dc as toggleSoundsEnabled, dd as toggleAutoSubmitTx } from './index.js';
import { u as useMonsterSwapData, a as useMonsterSwapAPI } from './useSubmitTx.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';

const { swapConfig } = useMonsterSwapData();
const { fetchSwapConfig } = useMonsterSwapAPI();
const showModal = useLocalStorage("showSwapSettingsModal", false);
const toggleSettings = () => {
  if (!showModal.value) {
    openModalSwapSettings();
  } else {
    closeModalSwapSettings();
  }
};
const openModalSwapSettings = async () => {
  showModal.value = true;
  try {
    if (!swapConfig.value) {
      swapConfig.value = await fetchSwapConfig(networkId.value);
    }
  } catch (err) {
    console.error(err);
  }
};
const closeModalSwapSettings = () => {
  showModal.value = false;
};
const useModalSwapSettings = () => {
  showModal.value = false;
  return {
    showModalSwapSettings: showModal,
    openModalSwapSettings,
    closeModalSwapSettings,
    toggleSettings
  };
};

const _tweenUp = ref(false);
const _show = ref(false);
const _inputMode = ref("in");
const _filterToken = ref();
const useModalMonsterSwapTokenlist = () => {
  const {
    inputToken,
    outputToken,
    DefaultADAToken,
    tryUpdateEstimate
  } = useMonsterSwapData();
  const openModalMonsterSwapTokenlist = (inputMode, filterToken, tweenUp) => {
    _tweenUp.value = tweenUp ?? false;
    _show.value = true;
    _filterToken.value = filterToken;
    _inputMode.value = inputMode;
    setTimeout(() => {
      _tweenUp.value = false;
    }, 75);
  };
  const closeModalMonsterSwapTokenlist = (_selectedToken = null, tweenUp) => {
    if (_selectedToken) {
      if (_inputMode.value === "in") {
        inputToken.value = _selectedToken;
        if (outputToken.value === void 0) {
          outputToken.value = DefaultADAToken;
        }
      } else {
        outputToken.value = _selectedToken;
      }
    }
    tryUpdateEstimate();
    if (tweenUp) {
      _tweenUp.value = tweenUp ?? false;
    } else {
      _tweenUp.value = false;
      _show.value = false;
    }
  };
  const overwriteOutputToken = (token) => {
    if (!token) {
      return;
    }
    _inputMode.value = "out";
    outputToken.value = token;
    tryUpdateEstimate();
  };
  return {
    filterToken: _filterToken,
    showModalMonsterSwapTokenlist: _show,
    tweenUpModalMonsterSwapTokenlist: _tweenUp,
    openModalMonsterSwapTokenlist,
    closeModalMonsterSwapTokenlist,
    overwriteOutputToken
  };
};

const _hoisted_1$1 = {
  width: "100%",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 100 100",
  preserveAspectRatio: "xMidYMid"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "IconSpinnerLoader",
  props: {
    width: { type: String, required: false, default: "24" },
    height: { type: String, required: false, default: "24" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [
        createStaticVNode('<g transform="rotate(0 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(30 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(60 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(90 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(120 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(150 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(180 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(210 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(240 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(270 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(300 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(330 50 50)"><rect x="47.5" y="21" rx="2.5" ry="2.66" width="5" height="14"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect></g>', 12)
      ])]);
    };
  }
});

const _sfc_main = {  };

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z",
      stroke: "url(#gradient_icon_gold_orange_1)",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12.2422 17V13C12.2422 12.5286 12.2422 12.2929 12.0957 12.1464C11.9493 12 11.7136 12 11.2422 12",
      stroke: "url(#gradient_icon_gold_orange_1)",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M11.992 8.99997H12.001",
      stroke: "url(#gradient_icon_gold_orange_1)",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconWarningGradient = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

const autoSubmit = ref(getAutoSubmitTx().value === "1");
const soundsEnabled = ref(getSoundsEnabled().value === "1");
function useApp() {
  const _autoSubmit = computed(() => autoSubmit.value);
  const _soundsEnabled = computed(() => soundsEnabled.value);
  const _toggleAutoSubmitTx = () => {
    toggleAutoSubmitTx();
    autoSubmit.value = getAutoSubmitTx().value === "1";
  };
  const _toggleSoundsEnabled = () => {
    toggleSoundsEnabled();
    soundsEnabled.value = getSoundsEnabled().value === "1";
  };
  return {
    autoSubmit: _autoSubmit,
    soundsEnabled: _soundsEnabled,
    toggleAutoSubmitTx: _toggleAutoSubmitTx,
    toggleSoundsEnabled: _toggleSoundsEnabled
  };
}

export { IconWarningGradient as I, _sfc_main$1 as _, useApp as a, useModalSwapSettings as b, useModalMonsterSwapTokenlist as u };
