import { m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, Y as toRefs, e as ref, c as createBlock, u as unref, aZ as script, y as withCtx, a0 as renderSlot, B as toDisplayString, n as createVNode, ab as mergeModels, ac as useModel, D as computed, G as watch, z as resolveComponent, t as createCommentVNode, a_ as useDebounceFn, j as isIosApp, v as createStaticVNode, W as resolveDynamicComponent, f as onMounted, aE as addSignalListener, k as onUnmounted, aF as removeSignalListener, l as useTheme, w as useTranslation, aY as onBeforeUnmount, $ as createSlots, a1 as withDirectives, a2 as resolveDirective, U as withModifiers, V as normalizeClass, ae as isRef, F as Fragment, S as renderList, H as createTextVNode, aC as dispatchSignal, a$ as backendServer, b0 as isBackendServerSet, P as networkId, b1 as isSwapAllowed } from './index.js';
import { s as subtract, f as isGreaterThanZero, m as multiply, c as compare, i as isZero, g as abs, d as divide, j as add } from './bigmath.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useMonsterSwapData, d as doMonsterAwake, b as doMonsterSleep, c as doMonsterBored, e as doMonsterGreedy, f as doMonsterWaiting, g as doMonsterHappy, h as doMonsterAngry, a as useMonsterSwapAPI } from './useSubmitTx.js';
import { u as useModalMonsterSwapTokenlist, a as useApp, b as useModalSwapSettings, _ as _sfc_main$n, I as IconWarningGradient } from './useApp.js';
import { _ as _sfc_main$s } from './IconSettings.vue_vue_type_script_setup_true_lang.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { _ as _sfc_main$o } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { B as ButtonRow } from './ButtonRow.js';
import { _ as _sfc_main$r } from './ExternalLink.vue_vue_type_script_setup_true_lang.js';
import { c as appFormatTag } from './language.js';
import { n as noLogo } from './image.js';
import { I as IconChevronDown } from './IconChevronDown.js';
import { _ as _sfc_main$m } from './TokenIcon.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$p } from './SwapTimeAgo.vue_vue_type_script_setup_true_lang.js';
import { g as gsapWithCSS } from './index2.js';
import { _ as _sfc_main$q } from './BannerWarning.vue_vue_type_script_setup_true_lang.js';

const _imports_0$1 = "/images/devTemp/monster_swap_backdrop_tmp3.jpg";

const {
  tokenList
} = useMonsterSwapData();
const useSlippageMonitor = () => {
  const getTokenADAValue = (token) => {
    let targetToken = tokenList.value.find((_token) => _token.policyId + _token.hexName === token);
    if (!targetToken || !targetToken?.price) return null;
    return targetToken.price + "";
  };
  const compareSwap = (tokenIn, tokenInAmount, tokenOut, tokenOutAmount) => {
  };
  return {
    getTokenADAValue,
    compareSwap
  };
};

const _sfc_main$l = {  };

const _hoisted_1$k = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$e(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$k, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M19.0006 9H5.0003L8.0003 5",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M5 15H19.0003L16.0003 19",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconSwapArrow = /*#__PURE__*/_export_sfc(_sfc_main$l, [['render',_sfc_render$e]]);

const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "ButtonUnstyled",
  props: {
    disabled: { type: Boolean, required: false, default: false }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { disabled } = toRefs(props);
    const inFocus = ref(false);
    const focusable = () => {
      return !disabled.value;
    };
    const focus = () => {
      console.log("called focus in icon!!!");
      inFocus.value = true;
    };
    const blur = () => {
      console.log("called blue in icon!!!");
      inFocus.value = false;
    };
    __expose({ focus, focusable, blur });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(script), {
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("clicked")),
        ref: "btn",
        type: "button",
        text: "",
        severity: "secondary",
        class: "et-btn-focus p-0"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 512);
    };
  }
});

const _hoisted_1$j = { class: "flex flex-row et-ic et-gap-sme p-2 px-2 hover:bg-white/10 rounded-lg cursor-pointer" };
const _hoisted_2$2 = {
  key: 1,
  class: "bg-bg-3 size-7 aspect-square rounded-full"
};
const _hoisted_3$1 = ["src"];
const _hoisted_4$1 = { class: "pt-0.5" };
const _hoisted_5$1 = { class: "pt-0.5" };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "ButtonTokenSelect",
  props: {
    token: { type: Object, required: false, default: void 0 }
  },
  setup(__props) {
    const imgSrc = ref(noLogo);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$k, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$j, [
            __props.token ? (openBlock(), createBlock(_sfc_main$m, {
              key: 0,
              policyId: __props.token.policyId,
              hexName: __props.token.hexName,
              name: __props.token.name
            }, null, 8, ["policyId", "hexName", "name"])) : (openBlock(), createElementBlock("div", _hoisted_2$2, [
              createBaseVNode("img", {
                loading: "lazy",
                class: "w-full",
                src: imgSrc.value
              }, null, 8, _hoisted_3$1)
            ])),
            createBaseVNode("div", _hoisted_4$1, toDisplayString(__props.token?.ticker ?? _ctx.$t("swap-swapElement:select")), 1),
            createBaseVNode("div", _hoisted_5$1, [
              createVNode(IconChevronDown, { class: "size-4 stroke-white" })
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$i = { class: "w-full flex flex-row et-ic gap-2 et-bg-2 sm:px-3 sm:py-2 rounded-lg" };
const _hoisted_2$1 = { class: "w-full" };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "SwapInput",
  props: /* @__PURE__ */ mergeModels({
    token: { type: Object, required: false, default: void 0 },
    type: { type: String, required: true },
    loading: { type: Boolean, required: false, default: false }
  }, {
    "inputAmount": { type: Number, required: false, default: void 0 },
    "inputAmountModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:inputAmount", "resumeHover"], ["update:inputAmount"]),
  setup(__props, { emit: __emit }) {
    const {
      openModalMonsterSwapTokenlist,
      showModalMonsterSwapTokenlist
    } = useModalMonsterSwapTokenlist();
    const {
      inputType,
      inputToken,
      outputToken
    } = useMonsterSwapData();
    const inputAmount = useModel(__props, "inputAmount");
    const props = __props;
    const emit = __emit;
    const minFractionDigits = computed(() => {
      if (isIosApp()) {
        return props.token?.decimals ?? 0 ? 1 : 0;
      }
      return 0;
    });
    const maxFractionDigits = computed(() => {
      return (props.token?.decimals ?? 0) > 0 ? props.token?.decimals ?? 0 : 0;
    });
    const filterToken = computed(() => {
      if (props.type === "in") {
        return outputToken.value;
      }
      return inputToken.value;
    });
    const handleInput = useDebounceFn((event) => {
      inputType.value = props.type;
      emit("update:inputAmount", event.value);
    }, 500);
    watch(showModalMonsterSwapTokenlist, (value) => {
      if (!value) {
        emit("resumeHover");
      }
    });
    return (_ctx, _cache) => {
      const _component_InputIcon = resolveComponent("InputIcon");
      const _component_InputNumber = resolveComponent("InputNumber");
      const _component_IconField = resolveComponent("IconField");
      return openBlock(), createElementBlock("div", _hoisted_1$i, [
        createVNode(_sfc_main$j, {
          class: "shrink-0",
          token: __props.token,
          onClick: _cache[0] || (_cache[0] = ($event) => unref(openModalMonsterSwapTokenlist)(__props.type, filterToken.value))
        }, null, 8, ["token"]),
        createBaseVNode("div", _hoisted_2$1, [
          createVNode(_component_IconField, null, {
            default: withCtx(() => [
              __props.type === "out" && __props.loading ? (openBlock(), createBlock(_component_InputIcon, {
                key: 0,
                class: "pi pi-spin pi-spinner"
              })) : createCommentVNode("", true),
              createVNode(_component_InputNumber, {
                modelValue: inputAmount.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => inputAmount.value = $event),
                class: "",
                fluid: "",
                disabled: __props.type === "out",
                locale: unref(appFormatTag),
                placeholder: "0",
                pt: {
                  pcInputText: {
                    root: "bg-transparent border-none et-text-2xl sm:et-text-2xl text-end"
                  }
                },
                minFractionDigits: minFractionDigits.value,
                maxFractionDigits: maxFractionDigits.value,
                onInput: _cache[2] || (_cache[2] = (event) => unref(handleInput)(event))
              }, null, 8, ["modelValue", "disabled", "locale", "minFractionDigits", "maxFractionDigits"])
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});

const _sfc_main$h = {  };

const _hoisted_1$h = {
  fill: "#0B0A25",
  width: "100%",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 112.3 114",
  "xml:space": "preserve"
};

function _sfc_render$d(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$h, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", null, [
      createBaseVNode("circle", {
        class: "st0",
        cx: "88",
        cy: "21.2",
        r: "21.2",
        fill: "0B0A25"
      }),
      createBaseVNode("polygon", {
        class: "st0",
        points: "35.1,5.5 0,5.5 38.4,58.9 0.3,111.9 35.4,111.9 56,83.3 76.6,111.9 111.7,111.9 \t"
      })
    ], -1)
  ]))]))
}
const AXO = /*#__PURE__*/_export_sfc(_sfc_main$h, [['render',_sfc_render$d]]);

const _sfc_main$g = {  };

const _hoisted_1$g = {
  width: "100%",
  viewBox: "0 0 673 673",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$c(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$g, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<circle cx=\"336.5\" cy=\"336.5\" r=\"336.5\" fill=\"#111820\"></circle><g clip-path=\"url(#clip0_21631_2528)\"><path d=\"M274.905 118.5C259.879 118.5 248.261 122.232 239.379 128.14C230.529 134.027 224.746 141.84 220.982 149.483C217.397 156.762 215.597 163.975 214.685 169.48C180.349 170.832 152.914 199.165 152.914 233.902C152.914 250.977 159.543 266.505 170.362 278.041C143.818 284.231 124.087 308.05 124.087 336.554C124.087 364.981 143.71 388.748 170.145 395.016C159.497 406.52 152.986 421.923 152.986 438.844C152.986 473.583 180.421 501.917 214.757 503.267C215.669 508.773 217.469 515.986 221.054 523.264C224.818 530.908 230.601 538.721 239.451 544.607C248.332 550.516 259.951 554.247 274.977 554.247C289.926 554.247 301.547 550.794 310.505 545.324C319.451 539.864 325.421 532.59 329.385 525.414C333.332 518.271 335.313 511.184 336.316 505.925C336.821 503.284 337.083 501.067 337.221 499.487C337.29 498.695 337.328 498.061 337.349 497.608C337.36 497.383 337.366 497.202 337.369 497.068C337.372 497.002 337.373 496.948 337.373 496.906L337.375 496.819V448.642H375.475C382.203 448.642 387.623 454.115 387.623 460.816V497.402C375.735 500.065 366.848 510.7 366.848 523.416C366.848 538.136 378.757 550.069 393.446 550.069C408.134 550.069 420.043 538.136 420.043 523.416C420.043 510.649 411.086 499.977 399.124 497.37V460.816C399.124 447.781 388.585 437.115 375.475 437.115H330.011H329.972H329.847H325.873V437.266C316.776 437.935 307.333 440.952 299.817 448.075C291.088 456.344 285.832 469.315 285.832 487.902C285.832 491.085 288.407 493.664 291.583 493.664C294.759 493.664 297.335 491.085 297.335 487.902C297.335 471.481 301.926 461.939 307.719 456.45C312.622 451.802 319.007 449.471 325.873 448.829V496.713L325.872 496.754C325.87 496.816 325.866 496.927 325.86 497.079C325.845 497.384 325.818 497.859 325.764 498.483C325.655 499.731 325.439 501.556 325.019 503.763C324.173 508.2 322.521 514.045 319.324 519.832C316.143 525.587 311.463 531.245 304.523 535.483C297.595 539.711 288.101 542.722 274.977 542.722C261.932 542.722 252.586 539.512 245.812 535.005C239.006 530.478 234.442 524.405 231.368 518.165C228.282 511.897 226.75 505.558 226 500.735C225.627 498.339 225.453 496.353 225.372 494.991C225.332 494.309 225.315 493.786 225.308 493.448C225.304 493.28 225.303 493.158 225.303 493.086V493.038V493.012L225.304 492.982V492.946C225.304 433.248 271.099 392.598 316.815 392.598H446.859C452.5 392.598 457.081 397.027 457.342 402.614C445.134 405.032 435.93 415.819 435.93 428.761C435.93 443.481 447.839 455.415 462.528 455.415C477.218 455.415 489.127 443.481 489.127 428.761C489.127 416.223 480.491 405.708 468.853 402.865C468.72 390.793 458.936 381.073 446.859 381.073H316.815C264.815 381.073 214.454 426.563 213.808 491.677C186.274 489.862 164.488 466.896 164.488 438.844C164.488 409.611 188.152 385.899 217.324 385.899C219.128 385.899 220.846 385.965 222.512 386.151C225.669 386.503 228.512 384.222 228.863 381.061C229.214 377.897 226.939 375.047 223.782 374.697C221.567 374.45 219.402 374.373 217.324 374.373C204.213 374.373 192.017 378.305 181.845 385.057C156.068 383.911 135.589 362.674 135.589 336.554C135.589 310.284 156.306 288.95 182.295 288.032C192.36 294.575 204.365 298.376 217.252 298.376C219.33 298.376 221.495 298.299 223.71 298.051C226.867 297.699 229.142 294.851 228.791 291.688C228.44 288.523 225.597 286.244 222.44 286.596C220.774 286.781 219.056 286.849 217.252 286.849C188.08 286.849 164.416 263.136 164.416 233.902C164.416 205.853 186.201 182.885 213.736 181.071C214.382 246.185 264.743 291.676 316.743 291.676H446.857C458.918 291.676 468.69 281.983 468.853 269.936C480.453 267.068 489.056 256.57 489.056 244.059C489.056 229.339 477.147 217.406 462.459 217.406C447.768 217.406 435.86 229.339 435.86 244.059C435.86 257.024 445.097 267.827 457.336 270.219C457.034 275.767 452.471 280.149 446.857 280.149H316.743C271.027 280.149 225.232 239.5 225.232 179.803V179.766L225.231 179.741V179.715V179.663C225.232 179.591 225.232 179.468 225.236 179.299C225.243 178.961 225.26 178.439 225.3 177.758C225.381 176.395 225.555 174.41 225.928 172.012C226.678 167.189 228.21 160.851 231.296 154.584C234.37 148.342 238.934 142.269 245.74 137.742C252.514 133.236 261.86 130.026 274.905 130.026C288.028 130.026 297.523 133.037 304.451 137.266C311.391 141.504 316.071 147.159 319.251 152.916C322.448 158.702 324.101 164.547 324.947 168.985C325.367 171.192 325.582 173.017 325.691 174.265C325.747 174.888 325.773 175.364 325.788 175.669C325.794 175.821 325.798 175.931 325.8 175.994L325.801 176.035V223.918C318.935 223.277 312.55 220.943 307.647 216.298C301.854 210.808 297.261 201.266 297.261 184.845C297.261 181.662 294.687 179.082 291.51 179.082C288.335 179.082 285.76 181.662 285.76 184.845C285.76 203.434 291.016 216.403 299.745 224.672C307.262 231.795 316.704 234.812 325.801 235.482V235.703H375.403C388.513 235.703 399.052 225.04 399.052 212.003V175.376C411.015 172.769 419.973 162.098 419.973 149.332C419.973 134.611 408.065 122.678 393.375 122.678C378.685 122.678 366.776 134.611 366.776 149.332C366.776 162.047 375.663 172.683 387.551 175.344V212.003C387.551 218.704 382.131 224.177 375.403 224.177H337.302L337.301 175.842C337.301 175.8 337.298 175.746 337.296 175.68C337.293 175.547 337.287 175.366 337.277 175.139C337.256 174.687 337.218 174.052 337.149 173.261C337.011 171.68 336.749 169.464 336.244 166.822C335.241 161.562 333.26 154.477 329.315 147.333C325.349 140.158 319.378 132.883 310.434 127.423C301.475 121.954 289.854 118.5 274.905 118.5Z\" fill=\"url(#paint0_linear_21631_2528)\"></path><path d=\"M245.673 292.454C248.849 292.454 251.424 295.035 251.424 298.218C251.424 304.623 254.394 312.317 259.628 318.438C264.825 324.516 271.684 328.4 279.029 328.4C279.338 328.4 279.644 328.425 279.94 328.472H367.274C370.01 316.668 380.572 307.87 393.184 307.87C405.797 307.87 416.36 316.668 419.095 328.472H501.127C503.862 316.668 514.424 307.87 527.038 307.87C541.726 307.87 553.635 319.803 553.635 334.523C553.635 349.243 541.726 361.178 527.038 361.178C514.221 361.178 503.521 352.092 501.001 339.997H419.221C416.701 352.092 406.001 361.178 393.184 361.178C380.367 361.178 369.667 352.092 367.147 339.997H279.029V339.926C278.621 339.926 278.217 339.919 277.815 339.904C277.647 339.919 277.476 339.926 277.303 339.926C269.959 339.926 263.1 343.811 257.902 349.888C252.669 356.009 249.699 363.707 249.699 370.11C249.699 373.293 247.124 375.872 243.948 375.872C240.771 375.872 238.197 373.293 238.197 370.11C238.197 360.522 242.451 350.245 249.169 342.389C252.048 339.021 255.485 335.983 259.377 333.604C256.189 331.423 253.341 328.798 250.894 325.937C244.177 318.083 239.922 307.804 239.922 298.218C239.922 295.035 242.497 292.454 245.673 292.454Z\" fill=\"url(#paint1_linear_21631_2528)\"></path></g><defs><linearGradient id=\"paint0_linear_21631_2528\" x1=\"124.087\" y1=\"336.374\" x2=\"553.682\" y2=\"336.374\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#59EECA\"></stop><stop offset=\"1\" stop-color=\"#59D3EE\"></stop></linearGradient><linearGradient id=\"paint1_linear_21631_2528\" x1=\"124.041\" y1=\"336.072\" x2=\"553.635\" y2=\"336.072\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#59EECA\"></stop><stop offset=\"1\" stop-color=\"#59D3EE\"></stop></linearGradient><clipPath id=\"clip0_21631_2528\"><rect width=\"436\" height=\"436\" fill=\"white\" transform=\"translate(123.5 118.5)\"></rect></clipPath></defs>", 3)
  ]))]))
}
const GeniusYield = /*#__PURE__*/_export_sfc(_sfc_main$g, [['render',_sfc_render$c]]);

const _imports_0 = "/icons/vyfinance_round.png";

const _sfc_main$f = {  };


const _hoisted_1$f = {
  alt: "VyFinance Icon",
  src: _imports_0
};

function _sfc_render$b(_ctx, _cache) {
  return (openBlock(), createElementBlock("img", _hoisted_1$f))
}
const VyFinance = /*#__PURE__*/_export_sfc(_sfc_main$f, [['render',_sfc_render$b]]);

const _sfc_main$e = {  };

const _hoisted_1$e = {
  id: "Layer_1",
  "data-name": "Layer 1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 216.23 216.23"
};

function _sfc_render$a(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$e, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", null, [
      createBaseVNode("path", {
        class: "cls-1",
        fill: "#03a062",
        d: "M108.26,157.87c-4.58,0-7-2.44-13.27-2.44a24.07,24.07,0,0,0-7.32,1.68l1.67,4.57A15.24,15.24,0,0,1,95,160.31c4.42,0,6.71,2.44,13.27,2.44s8.85-2.44,13.12-2.44a15.16,15.16,0,0,1,5.64,1.37l1.68-4.57a23.17,23.17,0,0,0-7.32-1.68C115.12,155.43,112.84,157.87,108.26,157.87Z"
      }),
      createBaseVNode("path", {
        class: "cls-1",
        fill: "#03a062",
        d: "M96.21,166.11,95.14,171a68.94,68.94,0,0,0,26.24,0l-1.07-4.88A58.59,58.59,0,0,1,96.21,166.11Z"
      }),
      createBaseVNode("path", {
        class: "cls-1",
        fill: "#03a062",
        d: "M108.12-.52A108.12,108.12,0,1,0,216.23,107.6,108.12,108.12,0,0,0,108.12-.52ZM32.6,128.28,31.38,87.55H41l.91,40.73Zm81.3,59.49H102.62c-8.55,0-17.24-6-24.56-12.82l-.16-14.34L64.17,143.68V121L84,144l24.25-28.38L132.51,144l19.83-22.88v22.72l-13.88,16.94.16,14.18C131.29,181.82,122.45,187.77,113.9,187.77ZM171,87.55l-1.06,40.73-.16,9.15c-.3,20-14.94,39.51-26.54,46.83v-22l13.88-16.93V83.43l-24.71,29.29-24.1-29.29-24.1,29.29L59.45,83.43v62.08l13.72,16.78v22c-11.59-7.48-26.08-26.85-26.38-46.83l-.16-9.15L45.56,87.55v-.46c0-34.48,28.23-60.87,62.7-60.87S171,52.61,171,87.09Zm13,40.73h-9.3l.91-40.73h9.61Z"
      })
    ], -1)
  ]))]))
}
const WingRiders = /*#__PURE__*/_export_sfc(_sfc_main$e, [['render',_sfc_render$a]]);

const _sfc_main$d = {  };

const _hoisted_1$d = {
  width: "100%",
  viewBox: "0 0 179 179",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$9(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$d, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("circle", {
      cx: "89.1719",
      cy: "89.1719",
      r: "89.1719",
      fill: "#131313"
    }, null, -1),
    createBaseVNode("path", {
      d: "M89.4804 8.37486C111.002 8.37486 131.641 16.9652 146.859 32.2561C162.077 47.547 170.626 68.2859 170.626 89.9105C170.626 134.703 134.179 171.439 89.4804 171.439C78.759 171.542 68.1236 169.51 58.1886 165.459C48.2535 161.408 39.216 155.419 31.5982 147.838C23.9803 140.256 17.9332 131.233 13.8064 121.29C9.67951 111.347 7.55469 100.68 7.55469 89.9067C7.55469 79.1334 9.67951 68.4668 13.8064 58.5234C17.9332 48.5801 23.9803 39.5571 31.5982 31.9758C39.216 24.3946 48.2535 18.4055 58.1886 14.3546C68.1236 10.3037 78.759 8.27128 89.4804 8.37486ZM89.4804 167.987C104.85 167.987 119.875 163.407 132.655 154.827C145.434 146.246 155.394 134.051 161.276 119.783C167.157 105.514 168.696 89.8137 165.697 74.6668C162.698 59.5198 155.296 45.6067 144.427 34.6868C133.558 23.7669 119.711 16.3308 104.636 13.3187C89.5615 10.3067 73.9364 11.8541 59.7368 17.7652C45.5373 23.6764 33.4012 33.6857 24.8632 46.5275C16.3252 59.3693 11.7688 74.4667 11.7703 89.9105C11.7476 100.172 13.742 110.336 17.639 119.821C21.5361 129.306 27.2591 137.924 34.4794 145.18C41.6998 152.437 50.2754 158.189 59.714 162.106C69.1526 166.024 79.2683 168.03 89.4804 168.009V167.987ZM38.9388 74.4972H31.7154L32.6305 105.248H39.6214L38.9388 74.4972ZM43.1769 105.248L43.2894 112.16C43.5219 127.234 54.4058 141.871 63.122 147.508V130.927L52.8006 118.257V71.392L71.343 93.4981L89.4504 71.392L107.558 93.4981L126.123 71.392V118.122L115.696 130.935V147.516C124.405 141.991 135.409 127.249 135.634 112.167L135.754 105.256L136.556 74.5048V74.1581C136.556 48.1327 115.351 28.1822 89.4504 28.1822C63.5495 28.1822 42.3443 48.1026 42.3443 74.1581V74.5048L43.1769 105.248ZM56.3561 99.7161L71.253 117.112L89.4804 95.6914L107.7 117.112L122.605 99.8367V116.991L112.171 129.804L112.283 140.514C106.785 145.7 100.139 150.192 93.7184 150.192H85.2348C78.8215 150.192 72.2882 145.669 66.7824 140.514L66.6699 129.691L56.3411 116.908L56.3561 99.7161ZM75.266 130.467C76.5996 129.852 78.0382 129.499 79.5041 129.427C82.8345 129.427 84.5522 131.274 89.4804 131.274C94.4085 131.274 96.1263 129.427 99.3367 129.427C100.811 129.498 102.257 129.854 103.597 130.475L104.857 127.023C103.105 126.303 101.248 125.876 99.3592 125.757C94.6561 125.757 92.9383 127.596 89.5029 127.596C86.0674 127.596 84.2522 125.757 79.5266 125.757C77.6394 125.888 75.7842 126.315 74.0284 127.023L75.266 130.467ZM99.3367 137.492L98.5341 133.806C92.5641 135.072 86.3967 135.072 80.4267 133.806L79.6241 137.492C86.1345 138.758 92.8262 138.758 99.3367 137.492V137.492ZM146.353 105.248L147.275 74.4972H140.052L139.362 105.248H146.353Z",
      fill: "white"
    }, null, -1)
  ]))]))
}
const WingridersV2 = /*#__PURE__*/_export_sfc(_sfc_main$d, [['render',_sfc_render$9]]);

const _sfc_main$c = {  };

const _hoisted_1$c = {
  src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAADAFBMVEVMaXE0//AB7TYANQ0B5zUz/usu+toA8gAW/+YL32wBShYB5jUz/OgT7ncR628q+ckB8zcDOBkDGxIm1rUGKSJG//8GSyUn9b8HOSUd8Z0KNzEHQCkKWzkL6FkKQDQAAAAMfEgNQz0B5zgD6D8B6DUD6D4X1YEBKw8e8bIWonEITjERbVcApCQA5zYB5zgB5TYIaDYW74IB6zUm77oCIhAOYkoJzU0r+NkPjlUo4MAMTT0I7lIw+d8Ug2UPeVATe10fm48BpigO3GQT3nYNrlQEKhkFMxwXsns0//ABaRoXiHEIijou+twV9oIO82cD5D0t/NgOU0c0/+sbw4sDkisKdT0WlG4alnwQf1YB5zcz/+wy+ucLgkQD8D4IpUAgwJsIdTcRr2Ui5qodr48D5joXv3wTu2sz/e0EpjQp/swHvEQIkDwMkUkSymwg+KYH50sb95YEyjou+tgCeCMjuKYz/+oz/+s0/+sAoyIA5TQA5TIAiR4Kh0MB2zIK6Vc1//Q2//Ud1ZYU7Hcx/eYk+7Yq7MkSll8o+cEJMiwckIQs2MoAvCgADwMy/eYBPRAB5TMA5TUKoEYB5jQR53IY9IYh8qUV6YYh1KIq/M0FgjA3//ge3JobgHwp6MMH2UoD2jcm7Lox++IkxK0B9TgB5zU0/+wB5DQy/+gA5jQQ7m42//oN7WIL7FoB6TUv/t8J7FUO7mcs+9I2//UI6VAk8bIx/+Qc9Jgj/7ME6UID6T05//8M618l9rkp9cQ1//Ma/pQByS4U8HwB8Tcb8pEY/44r/9AH60wG6UcS73UY84oW9IMu/toT/nwC+jwe9Z4A5yod/p4g9qcf/6ct/9Un/8UP32oU5Hcn+cEq+8wZ740l/rgh/a0W5YAW/4cP62cc75Yx++Mm/74S4XEg7aUh76sM9mAf658Y54gr984i9q0O/Gcg86UF80YS9XQJ9FQc6Zcj9rIf+KQG+EwL2lkX/Ikp/8oV330C9j0U6XoQ/W8a6Y8J+1cM318R0mkZ+ZAh2J91yakmAAAA/3RSTlMA/v35/f3+AQED+/z9/v78xPr6/fkD+/36/vr8+/78/vv8RBDgIP76C/v8+/1jxKb6/fH++fv+Hfz8+8b++/r6/f3+/vz6+/zs+/v6e8TE/cT6xPv8+/38/MrUNPv+/fz6/P78ff39+vzE+/39/MT4xP1S+/yVYLn9ii37+/6owz/+PcTE/v3I+vv8/Pqj+YK2+9GB36Jd/Nz63Pnz/fTm5Pb9///////////////////////////////+///////////////////////////////////////////////+//////////////////////////////////////////5FyYLOAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAG7UlEQVR42oVWaVRU5xl+7p3l3sts4CwgiKOyKYTFirKYaCMaTcIJAolaxxIFXE6a9LScRtuTRkuaZlETbXI8MSbIJhSIGsVlWklAsZEiklgRFBEEgwMzgM4wDPdeZrn94SCIbfr9++73vud5n+e77/e8IjyxaInI/c7YJtN9RiJyP3EqnvqBIsGG/WJeDmNz1HUyDIv/sxgGIZ8qrpwIDv56ODSaAcNMCSAe22lHWOYjT1ylKlteLxKrw99o7ALj4SeHiB4rnuPeiUqLN1xsOsEoBPDchjYip04snUxlEgIDNiFrTuBWhW/+6O+tCbsWfCLW2JYuXlnVyWCCCvmoGi2rT+1eun/lcM9r9qc+X+VQHXa7BNW6a5FEtJ6doOJViVYMMHnhuhe3dMXu8TDWpKPtspaQTpvZv3RMzxY/2D9BhQAAmhA4g+Pku+XmZYca4mMKFLqBDQt3TLsms1HFmvQMGPG95T2K9PBeBAZswpqwtDX7/PWFDUn83939OifgF/eFM/l0E5j69uf5wrzY0Q6GYQESoFl9ql90/fQfhd07/xV0hQoIzpH6ARCwQFINBB+JKCnZRv5OkatnKYAAzeXNnXW1IWHwBbMPIgTci3dadXdWozBJ+yXlPCVnpn8rrTjp2cwW53u6KJ6kODQm3t2deGfRyiR3YDthwpXR3YmyRB+4Tut5yd63Pqi6cPGXgTMKmrcVxYCnQQG+5+O/OFcrl5SdOS7tv9mSvVAzz5iof27TyGVlZVdN8H3ntgjRHlKpOrcLoB/Kup4JnV+eRg4noXlB9mX/ovDOWdJZR89l/OA7u+TjWurTb2uI9LVrxS2PLu5N0ubaJRF5upzHiyjhUMitSCC9X1KWaa7lFwj8lc2bDgz5ykYm33RrweFq+cYrScbB3PMcaDsQeu+EZuzpouUqXyFDb3ry10Dr/embP0g7OD+9KyjRMLsPQrJq/4GXb4W+ojZ83vgwZP6UBrqu5FJShk/r2hvvXfUQ1LUfIc6SvspanQ4KgDXO0Ty14xoh+mxPemF4e9Y/Qdh9RAGOV0ZL0XfEAwBrTwROf6wkAAP42HO4OnmxuJ0DZnsgSrUPZ2aCJK9z8D+dNTYTEKb09L5my6D/sUVBhcBVNtNd3UdCGfU9woUZmEmr3N6Sok5OaKC0aSyO3jPJZQ7ps9LrG3AZAL66e+k3wpwCqcWboP4O04iBhxmDasLma9GRREumBsmAclFuMtAaBgwmWCdkVToVGi2QKmdd5kGlSjCfDY1w8DzP6xcNBLe2tm4fRlxbjIP0IggNGtpEqYWlH6JJboNZrCaIZ3I5GsNq+8GBse0fIl8FBJ03dU6olCmmTU6nFs+ECHI3bx5UqizDluUZhshLUOVzXJwU1UPrFo73dMg8nKJ6KNoe0YomOAS4IVhfB8p25A8C0lhCIAl3vKThOuFN8IAKsAVQPZpRjTW3pgeUU25eUABwJ3eGz2ztjAWYQYDWDYwj6AyfSXmaCGgxBW0x8rk1PXC44toAQfiDbyuCGEDmgRB9dXDIy0G0EzdjdDztedvfdpDuW5Gr5yUQBFKpfGk9fBQyGTcU44ZtKQMAYgK4G+9679TN7AIFvS1puiXIKE1BjSCPNB446078bQg9BEfgqMjslyG2exH63hI0c/dfCFszpCWOe+6te8oYyp/uUaT+EHwhO1zkcDwYa0pjwXb/CgAImsOf5zA4WTdj5cYxtlfhyosy2/9KbH2gcV1qUQd2A/Io4tdfpd5+LcP4+jVQoIGMavnTZ6RrNVHZmSbbnYt1KboZdbfjtoxwKW1377YqK5f7+Zxnj1XI6mMAiqA57Fp87HAHGrrK+xRCU7/bz1ZQWRRii7EAduD6R91DS8429ZI5qE+xgiI5GkRRiissLCnuj3KMvMAEyUlOE2CRddrtG9/omPm+bbOQ/XVvVg57cO80UDwACtrtq6rKJPIyddSr3934xmrMjPz3nWUul73G9WLE8283V5SLZcdKQ6OZ8ddba+cSlgynGPCPEUeoKUJw77pRF3cLkXj2FH9W0c2TOXzhvnFfIQCAUto5w4zF8pfAl1DBpjl7Ow6tuPVNzdGhJdn6XjIHxp9Hj3Z4n3vikaEgr3/1WnERSAp7Opb9xaDuevn9YhGyKLb4bGOXN3ySx2kxMDfUlW1AEbZWvhtwuf+5+NU3yCyqZDSfuc1OdrkJU9Qi4U2iSiIp+1sZkbOn+Vj5EZm49Gf7Qp4063Hb1dIw7KiulZRJiJtkeYVMVk/GhoFiqP85B9BaaLevryLktSqZWEaWxswBfiIcAGgac1NXVdWqZGTpfx0dRFP2LpfW0qYOVqSv6B67c1MiYV0/OWt4JbZzf6IqRjsYPD5mAAD+AwgU3kSdTTl9AAAAAElFTkSuQmCC",
  alt: "CSWAP",
  class: "h-6 aspect-square rounded-full"
};

function _sfc_render$8(_ctx, _cache) {
  return (openBlock(), createElementBlock("img", _hoisted_1$c))
}
const CSwap = /*#__PURE__*/_export_sfc(_sfc_main$c, [['render',_sfc_render$8]]);

const _sfc_main$b = {  };

const _hoisted_1$b = {
  class: "bg-white p-0.5",
  viewBox: "0 0 32 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$7(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$b, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M4.9453 29.4546L2.5 27.5365L2.5 4.4659L4.9453 2.54789L4.9453 29.4546Z",
      fill: "black"
    }, null, -1),
    createBaseVNode("path", {
      d: "M16.3454 29.5L10.6444 27.5733L10.6444 4.42665L16.3454 2.5L16.3454 29.5Z",
      fill: "black"
    }, null, -1),
    createBaseVNode("path", {
      d: "M29.5 29.5L18.7925 27.6575L18.7925 4.42665L29.5 2.5L29.5 29.5Z",
      fill: "black"
    }, null, -1)
  ]))]))
}
const Spectrum = /*#__PURE__*/_export_sfc(_sfc_main$b, [['render',_sfc_render$7]]);

const _sfc_main$a = {  };

const _hoisted_1$a = {
  width: "100%",
  viewBox: "0 0 164 164",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$6(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$a, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M161.674 0.198408L100.804 29.3362C99.6406 29.9268 99.4468 31.6987 100.61 32.2893C107.782 36.03 129.3 43.7082 140.931 62.4115C140.931 62.4115 114.567 37.0144 82 37.0144C49.4326 37.0144 23.0685 62.4115 23.0685 62.4115C34.6997 43.7082 56.2175 36.03 63.3901 32.2893C64.5532 31.6987 64.5532 29.9268 63.1962 29.3362L2.32623 0.198408C1.35697 -0.195346 0 0.592162 0 1.77342V87.8086C0 113.009 12.6005 136.634 33.7305 150.022C33.9243 150.219 34.1182 150.219 34.312 150.416C53.8912 162.622 72.8889 164 82 164C91.6927 164 110.109 162.622 129.688 150.416C129.882 150.219 130.076 150.219 130.269 150.022C151.399 136.831 164 113.009 164 87.8086V1.77342C163.806 0.395285 162.643 -0.392223 161.674 0.198408Z",
      fill: "#89AAFF"
    }, null, -1),
    createBaseVNode("path", {
      d: "M24.0376 96.0776C25.0069 97.4558 32.5671 107.89 45.3615 107.496C57.5742 107.3 64.7468 97.4558 65.7161 96.0776",
      stroke: "#001947",
      "stroke-width": "8.2",
      "stroke-miterlimit": "10",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M98.2834 96.0776C99.2527 97.4558 106.813 107.89 119.607 107.496C131.82 107.3 138.993 97.4558 139.962 96.0776",
      stroke: "#001947",
      "stroke-width": "8.2",
      "stroke-miterlimit": "10",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M69.7868 116.159L80.6426 123.64C81.418 124.231 82.5811 124.231 83.1627 123.64L94.0185 116.159C95.3754 115.174 94.6 113.402 92.6615 113.402H70.9499C69.3991 113.402 68.4298 115.174 69.7868 116.159Z",
      fill: "#001947"
    }, null, -1)
  ]))]))
}
const MinSwap = /*#__PURE__*/_export_sfc(_sfc_main$a, [['render',_sfc_render$6]]);

const _sfc_main$9 = {  };

const _hoisted_1$9 = {
  width: "100%",
  viewBox: "0 0 164 164",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$9, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M161.674 0.198408L100.804 29.3362C99.6406 29.9268 99.4468 31.6987 100.61 32.2893C107.782 36.03 129.3 43.7082 140.931 62.4115C140.931 62.4115 114.567 37.0144 82 37.0144C49.4326 37.0144 23.0685 62.4115 23.0685 62.4115C34.6997 43.7082 56.2175 36.03 63.3901 32.2893C64.5532 31.6987 64.5532 29.9268 63.1962 29.3362L2.32623 0.198408C1.35697 -0.195346 0 0.592162 0 1.77342V87.8086C0 113.009 12.6005 136.634 33.7305 150.022C33.9243 150.219 34.1182 150.219 34.312 150.416C53.8912 162.622 72.8889 164 82 164C91.6927 164 110.109 162.622 129.688 150.416C129.882 150.219 130.076 150.219 130.269 150.022C151.399 136.831 164 113.009 164 87.8086V1.77342C163.806 0.395285 162.643 -0.392223 161.674 0.198408Z",
      fill: "#89AAFF"
    }, null, -1),
    createBaseVNode("path", {
      d: "M24.0376 96.0776C25.0069 97.4558 32.5671 107.89 45.3615 107.496C57.5742 107.3 64.7468 97.4558 65.7161 96.0776",
      stroke: "#001947",
      "stroke-width": "8.2",
      "stroke-miterlimit": "10",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M98.2834 96.0776C99.2527 97.4558 106.813 107.89 119.607 107.496C131.82 107.3 138.993 97.4558 139.962 96.0776",
      stroke: "#001947",
      "stroke-width": "8.2",
      "stroke-miterlimit": "10",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M69.7868 116.159L80.6426 123.64C81.418 124.231 82.5811 124.231 83.1627 123.64L94.0185 116.159C95.3754 115.174 94.6 113.402 92.6615 113.402H70.9499C69.3991 113.402 68.4298 115.174 69.7868 116.159Z",
      fill: "#001947"
    }, null, -1)
  ]))]))
}
const MinswapV2 = /*#__PURE__*/_export_sfc(_sfc_main$9, [['render',_sfc_render$5]]);

const _sfc_main$8 = {  };

const _hoisted_1$8 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 200.96 193.18"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$8, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<g id=\"Logo\"><g><path id=\"Path_662\" d=\"m155.14,162c0-.7-.4-1.4-1-1.7l-61.7-35.6c-4.9-2.8-10.9-2.8-15.8,0l-33.2,19.2c-.6.3-1,1-1,1.7v8.8c0,.7.4,1.4,1,1.7l63.1,35.1c4.8,2.7,10.7,2.6,15.5-.1l32-18.5c.6-.3,1-1,1-1.7l.1-8.9h0Z\" fill=\"#6b7495\"></path><path id=\"Path_663\" d=\"m84.54,122.5c2.8,0,5.5.7,7.9,2.1l61.7,35.6c.9.5,1.3,1.7.7,2.7-.2.3-.4.5-.7.7l-32,18.5c-4.8,2.8-10.7,2.8-15.5.1l-63.1-35.1c-.9-.5-1.3-1.7-.8-2.7.2-.3.4-.6.7-.7l33.2-19.2c2.4-1.2,5.2-2,7.9-2\" fill=\"#b7b7c7\"></path><path id=\"Path_664\" d=\"m197.64,107.5c-.1-4.8-2.7-9.3-6.9-11.7l-20.4-11.8c1.1,3.3,1.9,6.7,2.3,10.1l-78.4-45.2c-11-6.3-24.5-6.3-35.4,0l-40,23.1c-.1-1.3-.2-2.7-.2-4,0-1.6.1-3.2.2-4.8l-11.9,6.9C2.54,72.6-.06,77.3.04,82.3v8.8c.1,4.9,2.8,9.4,7.1,11.8l3.7,2,5,8.5c1.9,3.3,4.7,6,8,7.8l85.7,47.7c6.6,3.7,14.6,3.6,21.1-.2l41.1-23.8c2-1.2,3.9-2.6,5.5-4.3l9.7-9.9,3.9-2.2c4.4-2.5,7-7.2,6.9-12.2l-.1-8.8Z\" fill=\"#6b7495\"></path><path id=\"Path_665\" d=\"m197.64,107.5c-.1-4.8-2.7-9.3-6.9-11.7l-20.4-11.8c1.1,3.3,1.9,6.7,2.3,10.1l-78.4-45.2c-11-6.3-24.5-6.3-35.4,0l-40,23.1c-.1-1.3-.2-2.7-.2-4,0-1.6.1-3.2.2-4.8l-11.9,6.9C2.54,72.6-.06,77.3.04,82.3v8.8c.1,4.9,2.8,9.4,7.1,11.8l98.6,54.8c10.9,6,24.1,5.9,34.9-.3l50-28.8c4.4-2.5,7-7.2,6.9-12.2l.1-8.9Z\" fill=\"#b7b7c7\"></path><path id=\"Path_666\" d=\"m94.24,40.1l96.4,55.7c6.6,3.8,8.9,12.3,5.1,18.9-1.2,2.1-3,3.9-5.1,5.1l-50,28.8c-10.8,6.2-24,6.3-34.9.3L7.14,94.2c-6.7-3.7-9.1-12.2-5.4-18.9,1.2-2.2,3-4,5.2-5.3l51.8-29.9c11-6.3,24.5-6.3,35.5,0Z\" fill=\"#ecf0f1\"></path><path id=\"Path_667\" d=\"m76.54,46.2c4.3,0,8.6,1.1,12.3,3.3l96.4,55.7c1.5.8,2,2.7,1.1,4.2-.3.5-.7.9-1.1,1.1l-50,28.8c-7.5,4.3-16.7,4.4-24.3.2L12.44,84.7c-1.5-.8-2-2.7-1.2-4.2.3-.5.7-.9,1.2-1.2l51.8-29.9c3.7-2.1,8-3.2,12.3-3.2\" fill=\"#b7b7c7\"></path><path id=\"Path_668\" d=\"m123.04,142.6c4.3,0,8.6-1.1,12.3-3.3l29.4-17-75.9-43.7c-7.6-4.4-17-4.4-24.6,0l-30.9,17.8,77.7,43.1c3.7,2,7.8,3.1,12,3.1Z\" fill=\"#6b7495\"></path><path id=\"Path_669\" d=\"m117.94,68c0,27.4-22.2,49.6-49.6,49.6s-49.6-22.2-49.6-49.6,22.2-49.6,49.6-49.6c27.4-.1,49.6,22.2,49.6,49.6Z\" fill=\"#f5b7b1\"></path><path id=\"Path_670\" d=\"m68.24,18.3c-27.4,0-49.6,22.2-49.6,49.6,0,1.3.1,2.5.2,3.8.2,1.9,1.3,6.4,6.2,4.4,6.2-2.5,9.7-7.8,14.2,2.1s13.3,13.7,22.6,13.3,10.4-8.1,17.9-10.2,7.2,4.9,15.1,4.2c7.9-.7,6.3-8.4,9.9-13.1s4.9.2,10.8-.5c1-.2,1.9-.8,2.5-1.7,0-.8.1-1.5.1-2.3-.2-27.3-22.4-49.6-49.9-49.6q.1,0,0,0Z\" fill=\"#53390e\"></path><path id=\"Path_671\" d=\"m173.04,100.1c0,27.4-22.2,49.6-49.6,49.6s-49.6-22.2-49.6-49.6,22.2-49.6,49.6-49.6,49.6,22.2,49.6,49.6h0Z\" fill=\"#f9e79f\"></path><path id=\"Path_672\" d=\"m123.34,50.5c-27.4,0-49.6,22.2-49.6,49.6h0c0,1.3.1,2.5.2,3.8.2,1.9,1.3,6.4,6.2,4.4,6.2-2.5,9.7-7.8,14.2,2.1s13.3,13.7,22.6,13.3,10.4-8.1,17.9-10.2c7.4-2.1,7.2,4.9,15.1,4.2s6.3-8.4,9.9-13.1,4.9.2,10.8-.5c1-.2,1.9-.8,2.5-1.7,0-.8.1-1.5.1-2.3-.2-27.4-22.5-49.6-49.9-49.6Z\" fill=\"#7d5516\"></path><path id=\"Path_673\" d=\"m190.64,95.8l-20.3-11.8c1.5,4.5,2.4,9.2,2.6,14l12.3,7.1c1.5.8,2,2.7,1.1,4.2-.3.5-.7.9-1.1,1.1l-50,28.8c-7.5,4.3-16.7,4.4-24.3.2L12.44,84.7c-1.5-.8-2-2.7-1.2-4.2.3-.5.7-.9,1.2-1.2l6.9-4c-.4-2.5-.6-5-.6-7.5,0-1.6.1-3.2.2-4.8l-12,7.1c-6.6,3.8-8.9,12.3-5,18.9,1.3,2.2,3.1,4,5.3,5.2l98.6,54.8c10.9,6,24.1,5.9,34.9-.3l50-28.8c6.6-3.8,8.9-12.3,5.1-18.9-1.3-2.2-3-4-5.2-5.2Z\" fill=\"#ecf0f1\"></path><path id=\"Path_674\" d=\"m141.74,51.6c0,10.1-8.2,18.3-18.3,18.3s-18.3-8.2-18.3-18.3,8.2-18.3,18.3-18.3c10-.1,18.3,8.1,18.3,18.3q0-.1,0,0Z\" fill=\"#e74c3c\"></path><path id=\"Path_675\" d=\"m123.34,45.1c0,3.6-2.9,6.5-6.5,6.5s-6.5-2.9-6.5-6.5,2.9-6.5,6.5-6.5,6.5,2.9,6.5,6.5h0Z\" fill=\"#ecf0f1\"></path><path id=\"Path_676\" d=\"m86.64,18.3c0,10.1-8.2,18.3-18.3,18.3s-18.3-8.2-18.3-18.3c-.1-10.1,8.1-18.3,18.2-18.3s18.4,8.2,18.4,18.3h0Z\" fill=\"#e74c3c\"></path><path id=\"Path_677\" d=\"m68.34,11.9c0,3.6-2.9,6.5-6.5,6.5s-6.5-2.9-6.5-6.5,2.9-6.5,6.5-6.5c3.6,0,6.5,2.9,6.5,6.5h0Z\" fill=\"#ecf0f1\"></path></g></g>", 1)
  ]))]))
}
const SundaeSwap = /*#__PURE__*/_export_sfc(_sfc_main$8, [['render',_sfc_render$4]]);

const _sfc_main$7 = {  };

const _hoisted_1$7 = {
  id: "V3_v1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 400 400"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$7, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<defs><clipPath id=\"clippath\"><circle id=\"mask\" cx=\"200\" cy=\"200\" r=\"200\" fill=\"none\"></circle></clipPath><linearGradient id=\"Degradado_sin_nombre_5\" x1=\"70.2\" y1=\"331.22\" x2=\"335.51\" y2=\"63.02\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".05\" stop-color=\"#5c34df\"></stop><stop offset=\".12\" stop-color=\"#6f3bdd\"></stop><stop offset=\".34\" stop-color=\"#a652d7\"></stop><stop offset=\".52\" stop-color=\"#ce62d3\"></stop><stop offset=\".67\" stop-color=\"#e66cd0\"></stop><stop offset=\".76\" stop-color=\"#f070d0\"></stop></linearGradient></defs><g clip-path=\"url(#clippath)\" fill=\"none\"><rect id=\"bg\" x=\"0\" y=\"0\" width=\"400\" height=\"400\" rx=\"200\" ry=\"200\" fill=\"url(#Degradado_sin_nombre_5)\"></rect><g id=\"logo\"><path id=\"Path_662\" d=\"m271.92,266.05c0-.89-.51-1.79-1.28-2.17l-78.87-45.5c-6.26-3.58-13.93-3.58-20.2,0l-42.44,24.54c-.77.38-1.28,1.28-1.28,2.17v11.25c0,.89.51,1.79,1.28,2.17l80.66,44.87c6.14,3.45,13.68,3.32,19.81-.13l40.9-23.65c.77-.38,1.28-1.28,1.28-2.17l.13-11.38h0Z\" fill=\"#6b7495\"></path><path id=\"Path_663\" d=\"m181.68,215.56c3.58,0,7.03.89,10.1,2.68l78.87,45.5c1.15.64,1.66,2.17.89,3.45-.26.38-.51.64-.89.89l-40.9,23.65c-6.14,3.58-13.68,3.58-19.81.13l-80.66-44.87c-1.15-.64-1.66-2.17-1.02-3.45.26-.38.51-.77.89-.89l42.44-24.54c3.07-1.53,6.65-2.56,10.1-2.56\" fill=\"#b7b7c7\"></path><path id=\"Path_664\" d=\"m326.25,196.39c-.13-6.14-3.45-11.89-8.82-14.96l-26.08-15.08c1.41,4.22,2.43,8.56,2.94,12.91l-100.21-57.78c-14.06-8.05-31.32-8.05-45.25,0l-51.13,29.53c-.13-1.66-.26-3.45-.26-5.11,0-2.05.13-4.09.26-6.14l-15.21,8.82c-5.62,3.2-8.95,9.2-8.82,15.59v11.25c.13,6.26,3.58,12.02,9.08,15.08l4.73,2.56,6.39,10.86c2.43,4.22,6.01,7.67,10.23,9.97l109.54,60.97c8.44,4.73,18.66,4.6,26.97-.26l52.53-30.42c2.56-1.53,4.99-3.32,7.03-5.5l12.4-12.65,4.99-2.81c5.62-3.2,8.95-9.2,8.82-15.59l-.13-11.25Z\" fill=\"#6b7495\"></path><path id=\"Path_665\" d=\"m326.25,196.39c-.13-6.14-3.45-11.89-8.82-14.96l-26.08-15.08c1.41,4.22,2.43,8.56,2.94,12.91l-100.21-57.78c-14.06-8.05-31.32-8.05-45.25,0l-51.13,29.53c-.13-1.66-.26-3.45-.26-5.11,0-2.05.13-4.09.26-6.14l-15.21,8.82c-5.62,3.2-8.95,9.2-8.82,15.59v11.25c.13,6.26,3.58,12.02,9.08,15.08l126.03,70.05c13.93,7.67,30.8,7.54,44.61-.38l63.91-36.81c5.62-3.2,8.95-9.2,8.82-15.59l.13-11.38Z\" fill=\"#b7b7c7\"></path><path id=\"Path_666\" d=\"m194.08,110.24l123.22,71.2c8.44,4.86,11.38,15.72,6.52,24.16-1.53,2.68-3.83,4.99-6.52,6.52l-63.91,36.81c-13.8,7.92-30.68,8.05-44.61.38l-126.03-69.92c-8.56-4.73-11.63-15.59-6.9-24.16,1.53-2.81,3.83-5.11,6.65-6.77l66.21-38.22c14.06-8.05,31.32-8.05,45.38,0Z\" fill=\"#ecf0f1\"></path><path id=\"Path_667\" d=\"m171.45,118.03c5.5,0,10.99,1.41,15.72,4.22l123.22,71.2c1.92,1.02,2.56,3.45,1.41,5.37-.38.64-.89,1.15-1.41,1.41l-63.91,36.81c-9.59,5.5-21.35,5.62-31.06.26l-125.9-70.05c-1.92-1.02-2.56-3.45-1.53-5.37.38-.64.89-1.15,1.53-1.53l66.21-38.22c4.73-2.68,10.23-4.09,15.72-4.09\" fill=\"#b7b7c7\"></path><path id=\"Path_668\" d=\"m230.89,241.25c5.5,0,10.99-1.41,15.72-4.22l37.58-21.73-97.02-55.86c-9.71-5.62-21.73-5.62-31.44,0l-39.5,22.75,99.32,55.09c4.73,2.56,9.97,3.96,15.34,3.96Z\" fill=\"#6b7495\"></path><path id=\"Path_669\" d=\"m224.37,145.9c0,35.02-28.38,63.4-63.4,63.4s-63.4-28.38-63.4-63.4,28.38-63.4,63.4-63.4c35.02-.13,63.4,28.38,63.4,63.4Z\" fill=\"#f5b7b1\"></path><path id=\"Path_670\" d=\"m160.84,82.37c-35.02,0-63.4,28.38-63.4,63.4,0,1.66.13,3.2.26,4.86.26,2.43,1.66,8.18,7.92,5.62,7.92-3.2,12.4-9.97,18.15,2.68,5.75,12.65,17,17.51,28.89,17s13.29-10.35,22.88-13.04,9.2,6.26,19.3,5.37c10.1-.89,8.05-10.74,12.65-16.74,4.6-6.01,6.26.26,13.8-.64,1.28-.26,2.43-1.02,3.2-2.17,0-1.02.13-1.92.13-2.94-.26-34.9-28.63-63.4-63.78-63.4q.13,0,0,0Z\" fill=\"#53390e\"></path><path id=\"Path_671\" d=\"m294.8,186.93c0,35.02-28.38,63.4-63.4,63.4s-63.4-28.38-63.4-63.4,28.38-63.4,63.4-63.4,63.4,28.38,63.4,63.4h0Z\" fill=\"#f9e79f\"></path><path id=\"Path_672\" d=\"m231.27,123.53c-35.02,0-63.4,28.38-63.4,63.4h0c0,1.66.13,3.2.26,4.86.26,2.43,1.66,8.18,7.92,5.62,7.92-3.2,12.4-9.97,18.15,2.68s17,17.51,28.89,17c11.89-.51,13.29-10.35,22.88-13.04,9.46-2.68,9.2,6.26,19.3,5.37,10.1-.89,8.05-10.74,12.65-16.74s6.26.26,13.8-.64c1.28-.26,2.43-1.02,3.2-2.17,0-1.02.13-1.92.13-2.94-.26-35.02-28.76-63.4-63.78-63.4Z\" fill=\"#7d5516\"></path><path id=\"Path_673\" d=\"m317.3,181.43l-25.95-15.08c1.92,5.75,3.07,11.76,3.32,17.89l15.72,9.08c1.92,1.02,2.56,3.45,1.41,5.37-.38.64-.89,1.15-1.41,1.41l-63.91,36.81c-9.59,5.5-21.35,5.62-31.06.26l-125.9-69.92c-1.92-1.02-2.56-3.45-1.53-5.37.38-.64.89-1.15,1.53-1.53l8.82-5.11c-.51-3.2-.77-6.39-.77-9.59,0-2.05.13-4.09.26-6.14l-15.34,9.08c-8.44,4.86-11.38,15.72-6.39,24.16,1.66,2.81,3.96,5.11,6.77,6.65l126.03,70.05c13.93,7.67,30.8,7.54,44.61-.38l63.91-36.81c8.44-4.86,11.38-15.72,6.52-24.16-1.66-2.81-3.83-5.11-6.65-6.65Z\" fill=\"#ecf0f1\"></path><path id=\"Path_674\" d=\"m254.79,124.93c0,12.91-10.48,23.39-23.39,23.39s-23.39-10.48-23.39-23.39,10.48-23.39,23.39-23.39c12.78-.13,23.39,10.35,23.39,23.39q0-.13,0,0Z\" fill=\"#e74c3c\"></path><path id=\"Path_675\" d=\"m231.27,116.63c0,4.6-3.71,8.31-8.31,8.31s-8.31-3.71-8.31-8.31,3.71-8.31,8.31-8.31,8.31,3.71,8.31,8.31h0Z\" fill=\"#ecf0f1\"></path><path id=\"Path_676\" d=\"m184.36,82.37c0,12.91-10.48,23.39-23.39,23.39s-23.39-10.48-23.39-23.39c-.13-12.91,10.35-23.39,23.26-23.39s23.52,10.48,23.52,23.39h0Z\" fill=\"#e74c3c\"></path><path id=\"Path_677\" d=\"m160.97,74.19c0,4.6-3.71,8.31-8.31,8.31s-8.31-3.71-8.31-8.31,3.71-8.31,8.31-8.31c4.6,0,8.31,3.71,8.31,8.31h0Z\" fill=\"#ecf0f1\"></path></g><path id=\"v3_ellipse\" d=\"m59.61,342.94c36.11,35.59,85.68,57.56,140.39,57.56h0c54.71,0,104.28-21.97,140.39-57.56-36.11-35.59-85.68-57.56-140.39-57.56s-104.28,21.97-140.39,57.56Z\" fill=\"#f4f4f4\"></path><g id=\"V3\"><path d=\"m206.05,318.15l-19.68,55.49h-16.92l-19.68-55.49h14.39l13.75,41.89,13.83-41.89h14.31Z\" fill=\"#0a080a\"></path><path d=\"m216.32,319.17c3.48-3.06,8.19-4.58,14.15-4.58,3.95,0,7.34.69,10.16,2.06,2.82,1.37,4.95,3.24,6.4,5.61,1.45,2.37,2.17,5.03,2.17,7.98,0,3.48-.87,6.31-2.61,8.5-1.74,2.19-3.77,3.68-6.09,4.47v.32c3,1,5.37,2.66,7.11,4.98,1.74,2.32,2.61,5.3,2.61,8.93,0,3.27-.75,6.15-2.25,8.66-1.5,2.5-3.69,4.47-6.56,5.89-2.87,1.42-6.28,2.13-10.24,2.13-6.32,0-11.37-1.55-15.14-4.66-3.77-3.11-5.76-7.8-5.97-14.07h13.12c.05,2.32.71,4.15,1.98,5.49,1.26,1.34,3.11,2.02,5.53,2.02,2.06,0,3.65-.59,4.78-1.78,1.13-1.19,1.7-2.75,1.7-4.7,0-2.53-.8-4.36-2.41-5.49-1.61-1.13-4.18-1.7-7.71-1.7h-2.53v-10.99h2.53c2.69,0,4.86-.46,6.52-1.38,1.66-.92,2.49-2.57,2.49-4.94,0-1.9-.53-3.37-1.58-4.43-1.05-1.05-2.5-1.58-4.35-1.58-2,0-3.49.61-4.47,1.82-.98,1.21-1.54,2.71-1.7,4.51h-13.2c.21-5.64,2.06-9.99,5.53-13.04Z\" fill=\"#0a080a\"></path></g></g>", 2)
  ]))]))
}
const SundaeSwapv3 = /*#__PURE__*/_export_sfc(_sfc_main$7, [['render',_sfc_render$3]]);

const _sfc_main$6 = {  };

const _hoisted_1$6 = {
  width: "100%",
  viewBox: "0 0 192 192",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<g clip-path=\"url(#clip0_182_26)\"><rect width=\"192\" height=\"192\" fill=\"black\"></rect><path d=\"M78 131.034H114.096C114.096 112.324 129.351 97.0886 148.053 97.0886V60.9771C109.429 60.9771 78 92.3662 78 131.034Z\" fill=\"url(#paint0_linear_182_26)\"></path><path d=\"M114.082 131.034H77.9855C77.9855 112.324 62.731 97.0886 44.0284 97.0886L44.0284 60.9771C82.6527 60.9771 114.082 92.3662 114.082 131.034Z\" fill=\"url(#paint1_linear_182_26)\"></path></g><defs><linearGradient id=\"paint0_linear_182_26\" x1=\"80.7281\" y1=\"60.9917\" x2=\"148.07\" y2=\"96.0919\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#00FFF6\"></stop><stop offset=\"1\" stop-color=\"#0059FF\"></stop></linearGradient><linearGradient id=\"paint1_linear_182_26\" x1=\"123.98\" y1=\"131.019\" x2=\"40.2523\" y2=\"99.4977\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#00FFF6\"></stop><stop offset=\"1\" stop-color=\"#0059FF\"></stop></linearGradient><clipPath id=\"clip0_182_26\"><rect width=\"192\" height=\"192\" fill=\"white\"></rect></clipPath></defs>", 2)
  ]))]))
}
const Splash = /*#__PURE__*/_export_sfc(_sfc_main$6, [['render',_sfc_render$2]]);

const _sfc_main$5 = {  };

const _hoisted_1$5 = {
  width: "100%",
  version: "1.1",
  viewBox: "0 0 168.28 160.4",
  "xml:space": "preserve",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$5, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<g transform=\"translate(-185.22 -767)\"><path class=\"st0\" fill=\"#DBE1F9\" d=\"m329 914.3c0-7.2-27.5-13.1-61.4-13.1s-61.4 5.9-61.4 13.1 27.5 13.1 61.4 13.1c34 0 61.4-5.8 61.4-13.1z\"></path><path class=\"st1\" fill=\"#7F8CFF\" d=\"m352.4 837.4c-0.3 1-0.6 2-1 3-1.1 2.9-2.3 5.8-3.6 8.7-0.3 0.6-0.6 1.3-0.9 1.9-2 4.3-4.2 8.4-6.4 12.5l-1.5 2.7c-3.7 6.7-7.6 13.3-11.8 19.8-2.8 4.4-5.6 8.7-8.7 12.9-1.1 1.5-2.3 3-3.5 4.5-0.2 0.2-0.4 0.5-0.6 0.7-1.5 1.8-3.1 3.7-4.9 5.2-1.9 1.6-4.2 2.6-6.5 3.5-7.8 3.1-16.3 4.2-24.6 4.6-11.4 0.6-22.9-0.1-34-2.5-4.3-1-8.6-2.2-12.7-4-0.4-0.2-0.7-0.4-1.1-0.6-0.2-0.1-0.4-0.2-0.5-0.3-0.4-0.2-0.7-0.5-1-0.7-0.1-0.1-0.3-0.2-0.4-0.4l-0.1-0.1c-0.3-0.2-0.6-0.5-0.8-0.7-0.7-0.6-1.3-1.3-1.9-2l-1.5-1.8-0.1-0.1c-0.1-0.1-0.2-0.3-0.4-0.5l-0.3-0.3c-0.1-0.1-0.2-0.2-0.3-0.4-0.1-0.1-0.2-0.2-0.3-0.4-0.2-0.3-0.4-0.5-0.5-0.6 0-0.1-0.1-0.1-0.1-0.1-2.7-3.4-5.3-7-7.7-10.7-0.2-0.3-0.4-0.7-0.6-1-2.4-3.7-4.7-7.4-6.9-11.1-2.3-3.9-4.6-7.8-6.8-11.8-2.5-4.6-5-9.2-7.2-14-0.6-1.2-1.2-2.4-1.7-3.7-1.1-2.4-2.1-4.8-3.1-7.2-0.9-2.3-1.8-4.7-2.3-7.2 0.8 1.9 2.5 3.4 4 4.6 2 1.6 4.1 2.8 6.3 4.1 7.2 4.1 15.2 6.5 23.2 8.5 4.2 1.1 8.4 2.1 12.8 2.7 17.7 2.5 35.5 4 53.4 3.5 14.9-0.5 30.4-1.7 44.5-6.8 3.4-1.2 6.8-2.7 10-4.4 3.1-1.7 6.4-3.6 9.1-6.1 0.8-0.9 2.1-2.3 3-3.9z\"></path><path class=\"st2\" fill=\"#525FFF\" d=\"m347.9 849.1c-0.3 0.6-0.6 1.3-0.9 1.9-2 4.3-4.2 8.4-6.4 12.5l-1.5 2.7c-3.7 6.7-7.6 13.4-11.8 19.8-2.8 4.4-5.6 8.7-8.7 12.9-1.1 1.5-2.3 3-3.5 4.5-0.2 0.2-0.4 0.5-0.6 0.7-1.5 1.8-3.1 3.7-4.9 5.2-1.9 1.6-4.2 2.6-6.5 3.5-7.8 3.1-16.3 4.2-24.6 4.7-11.4 0.6-22.9-0.1-34-2.5-4.3-1-8.7-2.2-12.7-4-0.4-0.2-0.7-0.4-1.1-0.6-0.2-0.1-0.4-0.2-0.5-0.3-0.3-0.2-0.7-0.5-1-0.7-0.1-0.1-0.3-0.2-0.4-0.4l-0.1-0.1c-0.3-0.2-0.5-0.5-0.8-0.7-0.7-0.6-1.3-1.3-1.9-2l-1.5-1.8-0.1-0.1c-0.1-0.1-0.2-0.3-0.4-0.5-0.1-0.1-0.2-0.2-0.3-0.4-0.1-0.1-0.2-0.2-0.3-0.4-0.1-0.1-0.2-0.2-0.3-0.4-0.2-0.3-0.4-0.5-0.5-0.6l-0.1-0.1c57.5-3.3 113.4-34.3 125.4-52.8z\"></path><path class=\"st3\" fill=\"#9CACFF\" d=\"m352.4 837.4c-0.3 1-0.4 2.1-1 3-12 17.8-42.1 27.1-83.5 30.7-30.1 2.6-56.8 0.9-67.7-3.6-2.5-4.6-5-9.2-7.2-14-0.6-1.2-1.2-2.4-1.7-3.7-1.1-2.4-2.1-4.8-3.1-7.2-0.9-2.3-1.8-4.7-2.3-7.2 0.8 1.9 2.5 3.4 4 4.6 2 1.6 4.1 2.8 6.3 4.1 7.2 4.1 15.2 6.5 23.2 8.5 4.2 1.1 8.4 2.1 12.8 2.7 17.7 2.5 35.5 4 53.4 3.5 14.9-0.5 30.4-1.7 44.5-6.8 3.4-1.2 6.8-2.7 10-4.4 3.1-1.7 6.4-3.6 9.1-6.1 1-1.1 2.3-2.6 3.2-4.1z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m353.4 835c-0.2 0.8-0.5 1.6-1 2.4-0.9 1.5-2.2 2.9-3.4 4-2.7 2.4-5.9 4.4-9.1 6.1s-6.6 3.2-10 4.4c-14.1 5-29.6 6.3-44.5 6.8-17.9 0.5-35.7-0.9-53.4-3.5-4.3-0.6-8.5-1.6-12.8-2.7-8-2-16-4.4-23.2-8.5-2.2-1.2-4.3-2.5-6.3-4.1-1.6-1.2-3.2-2.7-4-4.6-0.1-0.3-0.3-0.6-0.3-1-1.3-5 4.8-7.9 8.5-9.6 5.2-2.4 10.9-4 16.5-5.3 15.3-3.5 31.2-4.9 47-5.2 16-0.3 32.1 0.6 48 2.4 9.8 1.1 19.7 2.6 29.2 5.4 5 1.5 10.2 3.2 14.5 6.3 1.8 1.3 4 3.1 4.4 5.5 0 0.4 0 0.8-0.1 1.2z\"></path><path class=\"st5\" fill=\"#FFFFFF\" d=\"m320.6 823.6c10.1 2 21.6 5.5 25.9 9.5 3.7 3.4-4 8.1-10.8 10.7-23.6 9.2-42.5 11.3-67.6 10.8-16-0.4-39.1-4.4-50.4-7-10.4-2.4-25.8-9.1-26.2-14.6 0.4-5.3 23.6-11.9 41.6-13.7 21.7-2.1 49.1-3.4 87.5 4.3z\"></path><path class=\"st2\" fill=\"#525FFF\" d=\"m193.7 850.6c6.3 4.1 13.7 6.5 20.7 9.1 0.9 0.3 1.3-1.1 0.4-1.4-7-2.5-14.1-4.8-20.4-8.9-0.8-0.6-1.6 0.7-0.7 1.2z\"></path><path class=\"st2\" fill=\"#525FFF\" d=\"m197.8 859.7c11.8 5.9 25 9.5 38.1 11.3 0.9 0.1 1.4-1.3 0.4-1.4-12.9-1.7-26-5.3-37.7-11.1-0.9-0.6-1.6 0.7-0.8 1.2z\"></path><path class=\"st2\" fill=\"#525FFF\" d=\"m220.6 861.3c6.2 1.5 12.4 2.7 18.7 3.6 0.9 0.1 1.4-1.3 0.4-1.4-6.3-0.9-12.5-2-18.7-3.6-0.9-0.3-1.3 1.2-0.4 1.4z\"></path><path class=\"st1\" fill=\"#7F8CFF\" d=\"m270 825.1 0.9-0.6c0.1-0.1 0.3-0.2 0.4-0.3s0.2-0.3 0.2-0.4c0.1-0.2 0.1-0.3 0-0.5 0-0.2-0.1-0.3-0.1-0.5-0.1-0.1-0.1-0.2-0.2-0.3-0.2-0.2-0.3-0.3-0.6-0.3h-0.3c-0.2 0-0.4 0.1-0.6 0.2l-0.9 0.6c-0.1 0.1-0.3 0.2-0.4 0.3s-0.2 0.3-0.2 0.4c-0.1 0.2-0.1 0.3 0 0.5 0 0.2 0.1 0.3 0.1 0.5 0.1 0.1 0.1 0.2 0.2 0.3 0.2 0.2 0.3 0.3 0.6 0.3h0.3c0.2-0.1 0.4-0.1 0.6-0.2z\"></path><path class=\"st1\" fill=\"#7F8CFF\" d=\"m275.3 829 0.9-0.6c0.1-0.1 0.3-0.2 0.4-0.3s0.2-0.3 0.2-0.4c0.1-0.2 0.1-0.3 0-0.5 0-0.2-0.1-0.3-0.1-0.5-0.1-0.1-0.1-0.2-0.2-0.3-0.2-0.2-0.3-0.3-0.6-0.3h-0.3c-0.2 0-0.4 0.1-0.6 0.2l-0.9 0.6c-0.1 0.1-0.3 0.2-0.4 0.3s-0.2 0.3-0.2 0.4c-0.1 0.2-0.1 0.3 0 0.5 0 0.2 0.1 0.3 0.1 0.5 0.1 0.1 0.1 0.2 0.2 0.3 0.2 0.2 0.3 0.3 0.6 0.3h0.3c0.2 0 0.4-0.1 0.6-0.2z\"></path><path class=\"st1\" fill=\"#7F8CFF\" d=\"m301.7 838.1 0.9-0.6c0.1-0.1 0.3-0.2 0.4-0.3s0.2-0.3 0.2-0.4c0.1-0.2 0.1-0.3 0-0.5 0-0.2-0.1-0.3-0.1-0.5-0.1-0.1-0.1-0.2-0.2-0.3-0.2-0.2-0.3-0.3-0.6-0.3h-0.3c-0.2 0-0.4 0.1-0.6 0.2l-0.9 0.6c-0.1 0.1-0.3 0.2-0.4 0.3s-0.2 0.3-0.2 0.4c-0.1 0.2-0.1 0.3 0 0.5 0 0.2 0.1 0.3 0.1 0.5 0.1 0.1 0.1 0.2 0.2 0.3 0.2 0.2 0.3 0.3 0.6 0.3h0.3c0.2 0 0.5-0.1 0.6-0.2z\"></path><path class=\"st1\" fill=\"#7F8CFF\" d=\"m304.7 841.9 0.9-0.6c0.1-0.1 0.3-0.2 0.4-0.3s0.2-0.3 0.2-0.4c0.1-0.2 0.1-0.3 0-0.5 0-0.2-0.1-0.3-0.1-0.5-0.1-0.1-0.1-0.2-0.2-0.3-0.2-0.2-0.3-0.3-0.6-0.3h-0.3c-0.2 0-0.4 0.1-0.6 0.2l-0.9 0.6c-0.1 0.1-0.3 0.2-0.4 0.3s-0.2 0.3-0.2 0.4c-0.1 0.2-0.1 0.3 0 0.5 0 0.2 0.1 0.3 0.1 0.5 0.1 0.1 0.1 0.2 0.2 0.3 0.2 0.2 0.3 0.3 0.6 0.3h0.3c0.2 0 0.4-0.1 0.6-0.2z\"></path><path class=\"st6\" fill=\"#F89B00\" d=\"m237.3 780.4c-0.9-1.7-1.9-3.4-2.8-5.1-0.3-0.6-1.2-0.8-1.7-0.4-0.6 0.4-0.8 1.1-0.4 1.7 0.9 1.7 1.9 3.4 2.8 5.1 0.3 0.6 1.2 0.8 1.7 0.4s0.7-1.1 0.4-1.7z\"></path><path class=\"st6\" fill=\"#F89B00\" d=\"m243.9 776.9-0.3-4.8c0-0.7-0.5-1.3-1.2-1.2-0.6 0-1.3 0.6-1.2 1.2l0.3 4.8c0 0.7 0.5 1.3 1.2 1.2 0.6 0 1.2-0.5 1.2-1.2z\"></path><path class=\"st6\" fill=\"#F89B00\" d=\"m232.8 785.1c-2.1-0.9-4.2-1.6-6.4-2-0.6-0.1-1.4 0.2-1.5 0.9-0.1 0.6 0.2 1.4 0.9 1.5 1 0.2 2.1 0.4 3.1 0.7 0.5 0.1 1 0.3 1.5 0.5 0.3 0.1 0.5 0.2 0.8 0.3 0.1 0 0.2 0.1 0.3 0.1 0 0 0.5 0.2 0.2 0.1 0.3 0.1 0.6 0.2 1 0.1 0.3-0.1 0.6-0.3 0.7-0.6 0.1-0.5 0-1.4-0.6-1.6z\"></path><path class=\"st7\" fill=\"#FFE1A0\" d=\"m281.1 839.9c-0.4 1.2-1.1 2.3-2.1 3.1-2.7 2.2-6.6 2-9.9 1.8-0.8-0.1-1.8-0.1-2.7-0.4-0.3-0.1-0.6-0.3-0.8-0.5-0.9-0.8-0.6-2-0.1-2.8l0.3-0.3c0.5-0.6 1.2-0.9 1.9-1.3 0.6-0.4 1-0.9 1.5-1.4 1.1-1.2 2.4-2.4 3.8-3.1 0.8-0.4 1.5-0.6 2.4-0.7 0.8-0.1 1.7 0.1 2.5 0.3 1.2 0.2 2.4 0.5 3.1 1.6 0.1 0.1 0.1 0.2 0.2 0.3 0.4 1 0.2 2.4-0.1 3.4z\"></path><path class=\"st8\" fill=\"#EEBE6D\" d=\"m281.1 839.9c-0.4 1.2-1.1 2.3-2.1 3.1-2.7 2.2-6.6 2-9.9 1.8-0.8-0.1-1.8-0.1-2.7-0.4 7.3-1.9 9-7 14.8-8 0.4 1.1 0.2 2.5-0.1 3.5z\"></path><path class=\"st7\" fill=\"#FFE1A0\" d=\"m284.9 843.3c0.4 1.2 1.1 2.3 2.1 3.1 2.7 2.2 6.6 2 9.9 1.8 0.8-0.1 1.8-0.1 2.7-0.4 0.3-0.1 0.6-0.3 0.8-0.5 0.9-0.8 0.6-2 0.1-2.8l-0.3-0.3c-0.5-0.6-1.2-0.9-1.9-1.3-0.6-0.4-1-0.9-1.5-1.4-1.1-1.2-2.4-2.4-3.8-3.1-0.8-0.4-1.5-0.6-2.4-0.7-0.8-0.1-1.7 0.1-2.5 0.3-1.2 0.2-2.4 0.5-3.1 1.6-0.1 0.1-0.1 0.2-0.2 0.3-0.4 1-0.2 2.4 0.1 3.4z\"></path><path class=\"st8\" fill=\"#EEBE6D\" d=\"m284.9 843.3c0.4 1.2 1.1 2.3 2.1 3.1 2.7 2.2 6.6 2 9.9 1.8 0.8-0.1 1.8-0.1 2.7-0.4-7.3-1.9-9-7-14.8-8-0.4 1.1-0.2 2.5 0.1 3.5z\"></path><path class=\"st9\" fill=\"#6FC7FF\" d=\"m289.3 782.2c-0.1-1.3-0.5-2.5-1-3.6-0.7-1.7-1.5-3.4-2.3-5-1.1-2-2.2-4-3.4-6-0.5-0.8-1.7-0.8-2.2 0-2.2 3.5-4.2 7.1-5.7 11-1 2.5-1.4 4.8-0.2 7.3 1.4 3 4.8 4.8 8.1 4.4 3.9-0.5 6.7-3.9 6.8-7.7 0-0.2 0-0.3-0.1-0.4z\"></path><path class=\"st10\" fill=\"#007FBB\" d=\"m284.3 782.9v0.5-0.3c0 0.3-0.1 0.6-0.3 0.9 0-0.1 0.1-0.2 0.1-0.3-0.1 0.3-0.3 0.6-0.5 0.9 0.1-0.1 0.1-0.2 0.2-0.3-0.2 0.3-0.4 0.5-0.7 0.7 0.1-0.1 0.2-0.1 0.3-0.2-0.3 0.2-0.6 0.4-0.9 0.5 0.1 0 0.2-0.1 0.3-0.1-0.3 0.1-0.6 0.2-0.9 0.3h0.3-0.5c-0.7 0-1.3 0.6-1.2 1.2 0 0.7 0.5 1.3 1.2 1.2 1.3 0 2.6-0.5 3.6-1.5 0.9-0.9 1.5-2.2 1.5-3.6 0-0.7-0.6-1.3-1.2-1.2-0.8 0.1-1.3 0.6-1.3 1.3z\"></path><path class=\"st11\" fill=\"#FF4852\" d=\"m345.1 817.9c-0.6 3.3-1.9 6.8-4.1 9.3-7.4 8.7-14.9 13.3-25.6 15-0.4 0.1-0.7 0.1-1 0.1h-0.5c-0.2 0-0.3-0.1-0.4-0.1-0.2-0.1-0.5-0.2-0.6-0.3-0.3-0.2-0.5-0.5-0.5-0.5-2.6-7.3-3.3-15.4-1.9-23 0.6-3.8 1.8-7.7 4.2-10.7 1.8-2.3 4.3-4.1 7-4.8 1-0.2 2-0.4 3-0.3h0.3c1.8 0.1 3.5 0.7 5.1 1.4 1.8 0.8 3.6 1.7 5.5 2.3 2.2 0.7 4.6 1 6.5 2.4 1.4 1 2.4 2.5 2.9 4.2 0.1 0.2 0.1 0.5 0.2 0.7s0.1 0.5 0.1 0.7 0.1 0.4 0.1 0.5c-0.1 1.2-0.1 2.2-0.3 3.1z\"></path><path class=\"st11\" fill=\"#FF4852\" d=\"m229.9 827.2c0.8 1.2 1.1 3.4 0.3 4.7s-2.8 2.7-4.5 2.1c-0.1 1.6-1.2 5.2-4.4 5.7-1.6 0.2-3.1-0.3-4.3-1.3-1.1 1.3-3.4 1.3-5.4 0.4-1.1-0.5-3.7-3-3.2-5.5-1.3 1.3-4.3 1.1-5.9-0.1-1.3-1-1.6-3.3-1.3-4.7 0.4-1.6 1.2-2.7 2.4-3.4l-0.3-0.1s-0.6-0.9-0.6-2.2c0-0.3 0-0.7 0.1-1 1.9-0.2 3.8-0.6 5.5-1.3 4-1.8 6.6-5.1 8.2-9 0.5-1 0.8-2.1 1.2-3.1 0.2-0.6 0.3-1.2 0.4-1.8 0.2-0.1 0.5-0.2 0.7-0.3 1.2-0.4 2.6-0.3 3.7-0.1 2.1 0.4 3.3 2.9 2.9 5 2-0.9 5-0.2 6.2 1.7 1.1 1.9 0.5 4.7-1.3 6 0.9-0.2 3.4 0.7 4 2.3 1.3 3.3-1.6 6.9-4.4 6z\"></path><path class=\"st12\" fill=\"#FF323F\" d=\"m229.9 827.2c0.9 1.3 1.1 3.4 0.3 4.7s-2.8 2.7-4.5 2.1c-0.1 1.6-1.2 5.2-4.5 5.7-1.5 0.2-3.1-0.3-4.3-1.3 0.6-0.8 1.3-1.4 2.1-2 0.4-0.3 0.8-0.6 0.9-1 0.3-0.7-0.1-1.4-0.1-2.2 0-1.5 1.3-2.5 2.5-3.3s2.6-1.8 2.8-3.2c0.1-1.3-0.8-2.5-1.6-3.5s-1.6-2.4-1-3.6c0.4-0.8 1.2-1.3 1.6-2.2 0.4-1 0-2.1-0.8-2.8s-1.8-1.1-2.8-1.3c-1-0.3-2-0.5-3-0.9-0.4-0.2-0.9-0.5-1.2-0.9 0.5-1 0.8-2.1 1.2-3.1 0.2-0.6 0.3-1.2 0.4-1.8 1.4-0.7 3-0.6 4.4-0.3 2.1 0.4 3.3 2.9 2.9 5 2-0.9 5-0.2 6.2 1.7 1.1 1.9 0.5 4.7-1.3 6 0.9-0.2 3.4 0.7 4 2.3 1.5 3.2-1.4 6.8-4.2 5.9z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m221.6 823.9c-0.5-1.1-1.3-2-2.4-2.6-1.2-0.7-2.6-0.8-4-0.4-0.1 0-0.2 0.1-0.3 0.1-2.2 1-3.8 3.4-3.8 5.8-0.1 2.4 1.3 4.8 3.5 5.9 2.4 1.2 5.6 0.8 7.2-1.6 0.7-1 0.8-2.5 0.8-3.7-0.1-1.1-0.4-2.3-1-3.5zm-1.7 5.5c-0.2 0.6-0.7 1.1-1.3 1.4-0.8 0.3-1.7 0.3-2.4 0-1.4-0.6-2.4-2.1-2.5-3.5-0.1-0.9 0.2-1.7 0.6-2.5 0.4-0.7 1-1.2 1.8-1.5 0.7-0.2 1.3-0.1 1.8 0.1 0.6 0.3 1 0.7 1.3 1.3 0.8 1.3 1.1 3.2 0.7 4.7z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m219.7 819.3c0-0.1 0.1-0.2 0.2-0.3-0.2 0.3 0 0 0.1-0.1l0.1-0.1c-0.1 0.1-0.1 0.1 0 0s0.2-0.1 0.4-0.2c0.1 0 0.1-0.1 0.2-0.1-0.1 0.1-0.1 0.1 0 0 0.2 0 0.3-0.1 0.5-0.1 0 0 0.5-0.1 0.3-0.1h0.4c0.7 0 1.3 0.1 1.9 0.4 0.3 0.1 0.5 0.3 0.8 0.5 0.1 0.1 0.1 0.1 0 0 0.1 0 0.1 0.1 0.2 0.1l0.6 0.6c-0.2-0.2 0.1 0.2 0.1 0.2 0.1 0.1 0.2 0.3 0.2 0.4 0 0 0.2 0.5 0.1 0.2 0.1 0.3 0.2 0.5 0.2 0.8v0.2 0.4c0 0.1-0.1 0.4 0 0.2 0 0.1-0.1 0.3-0.1 0.4s-0.1 0.3-0.1 0.4c-0.1 0.1-0.1 0.1 0 0 0 0.1-0.1 0.1-0.1 0.2-0.1 0.1-0.1 0.2-0.2 0.4-0.1 0.1-0.1 0.1 0 0l-0.2 0.2c0.1-0.1 0.1-0.1 0 0s-0.2 0.1-0.3 0.2c-0.6 0.3-0.8 1.2-0.4 1.7 0.4 0.6 1.1 0.7 1.7 0.4 1.1-0.5 1.8-1.7 2.1-2.9 0.3-1.3 0.2-2.6-0.3-3.8-1.1-2.7-4.2-4.1-7-3.7-1.3 0.2-2.8 0.9-3.4 2.1-0.3 0.6-0.2 1.4 0.4 1.7 0.4 0.5 1.3 0.3 1.6-0.3z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m218.8 806.2c-0.1 1.3 0 6.3-3.4 11.5-3.4 5.4-10.2 4.8-12.8 5.1 0-0.3 0-0.7 0.1-1 1.9-0.2 3.8-0.6 5.5-1.3 5.1-2.2 7.8-7 9.4-12.1 0.2-0.6 0.3-1.2 0.4-1.8 0.4-0.3 0.6-0.4 0.8-0.4z\"></path><path class=\"st14\" fill=\"#00D1E4\" d=\"m218.2 806.4c-0.1 0.6-0.3 1.3-0.4 1.8-0.3 1.1-0.7 2.1-1.2 3.1-1.7 3.8-4.2 7.2-8.2 9-1.7 0.8-3.6 1.2-5.5 1.3-1 0.1-2 0.1-3 0.1-3-0.1-5.8-1.2-7.4-3.8-0.9-1.3 0.9-2.3 2-1.5 1.2 0.9 3.4-2.6 4.1-3.1 1-0.8 2.4-1.2 3.7-1.1-0.3-1.2-1.5-2-2.5-3-1.8-1.6-2.8-3.6-2.7-6.1 0-0.7 0.8-1.5 1.6-1.2 2.5 1 5.2 0.5 7.7 1.5 1.1 0.5 2.1 1.1 2.8 2 0.7-0.9 1.6-1.6 2.6-2.4 1.6-1.1 3.1-2.1 3.1-4.2 0-1.3 1.7-1.6 2.3-0.6 1.4 2.4 1.5 5.5 1 8.2z\"></path><path class=\"st15\" fill=\"#EF9A3E\" d=\"m264.5 834.8c-0.6 3.2-3 5.6-5.9 7.1-3.1 1.7-6.5 2.2-10 1.6-0.2 0-0.4-0.1-0.6-0.1-1.9-0.5-3.6-1.4-5.4-2.2-1.6-0.7-3.3-1.4-5-1.9h0.3c2.4 0.2 4.8 1 7.2 1.2 2.8 0.3 5.6 0.1 8.3-0.8 4.3-1.4 8.8-4.2 10-8.9 0.6-2.2 0.4-4.6-0.7-6.5 0 0 0-0.1-0.1-0.1l0.3 0.3c0.1 0.1 0.1 0.3 0.2 0.4 1.5 3.1 2 6.6 1.4 9.9z\"></path><path class=\"st16\" fill=\"#FFC684\" d=\"m263.5 830.9c-1.2 4.7-5.7 7.5-10 8.9-2.7 0.9-5.5 1.1-8.3 0.8-2.4-0.3-4.8-1-7.2-1.2h-0.3c-0.1 0-0.2 0-0.2-0.1-0.1-0.1-0.2-0.1-0.3-0.2h-0.1s-0.1 0-0.1-0.1c0 0 0-0.1-0.1-0.1 0-0.1-0.1-0.1-0.1-0.1-0.1-0.2-0.2-0.4-0.2-0.6v-0.1-0.1-0.1c0.1-0.2 0.2-0.4 0.4-0.6 1-1.1 1.8-2.4 1.9-3.9 0.1-1.4 0-2.9 0.3-4.3 0.5-2.5 1.8-5 3.7-6.8 3.8-3.6 9.2-4.1 14-2.2 2.2 0.9 4.4 2.1 5.7 4.1 0 0 0 0.1 0.1 0.1 1.2 2 1.3 4.4 0.8 6.6z\"></path><path class=\"st17\" fill=\"#FFDBB5\" d=\"m253.4 832.8c-2.5 2.6-6.3 1.9-9.5 2.3-0.3 0-0.6-0.1-0.8-0.3l-0.2-0.2c-0.1-0.2-0.2-0.5-0.2-0.7s0.1-0.4 0.2-0.6v-0.1c0.7-1.5 1.4-2.9 2-4.4 0.6-1.3 1.1-2.6 2.2-3.5 1.9-1.6 4.5-1.6 6.5-2.9 0.6-0.4 1.2-0.2 1.6 0.3 0.2 0.2 0.3 0.5 0.3 0.8 0.3 3.2 0.3 6.8-2.1 9.3z\"></path><path class=\"st15\" fill=\"#EF9A3E\" d=\"m253.4 832.8c-2.5 2.6-6.3 1.9-9.5 2.3-0.3 0-0.6-0.1-0.8-0.3 0.4-0.7 1.7-1.8 1.7-1.8l10.4-10.3c0.2 0.2 0.3 0.5 0.3 0.8 0.3 3.2 0.3 6.8-2.1 9.3z\"></path><path class=\"st12\" fill=\"#FF323F\" d=\"m345.1 817.9c-0.6 3.3-1.9 6.8-4.1 9.3-7.4 8.7-14.9 13.3-25.6 15-0.4 0.1-0.7 0.1-1 0.1h-0.5c-0.2 0-0.3-0.1-0.4-0.1-0.2-0.1-0.5-0.2-0.6-0.3 3.8-2.3 23.3-14.8 19.8-26.3-0.9-2.9-4-3.9-6.5-5.8-3.7-2.9-6.8-6.1-4.8-6.8 0.1 0 0.2-0.1 0.3-0.1 1-0.2 2-0.4 3-0.3h0.3c1.8 0.1 3.5 0.7 5.1 1.4 1.8 0.8 3.6 1.7 5.5 2.3 2.2 0.7 4.6 1 6.5 2.4 1.4 1 2.4 2.5 2.9 4.2v0.1c0.1 0.2 0.1 0.4 0.2 0.6s0.1 0.5 0.1 0.7 0.1 0.4 0.1 0.5c-0.1 1.2-0.1 2.2-0.3 3.1z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m322.4 812.9c0.1-0.3 0.1-0.5 0.2-0.8 0.1-0.2 0.1-0.3 0-0.5 0-0.2-0.1-0.3-0.1-0.5-0.1-0.1-0.2-0.3-0.3-0.4s-0.3-0.2-0.4-0.2h-0.3c-0.2 0-0.4 0.1-0.6 0.2-0.1 0.1-0.2 0.1-0.3 0.2-0.2 0.2-0.3 0.3-0.3 0.6-0.1 0.3-0.1 0.5-0.2 0.8-0.1 0.2-0.1 0.3 0 0.5 0 0.2 0.1 0.3 0.1 0.5 0.1 0.1 0.2 0.3 0.3 0.4s0.3 0.2 0.4 0.2h0.3c0.2 0 0.4-0.1 0.6-0.2 0.1-0.1 0.2-0.1 0.3-0.2 0.2-0.2 0.3-0.4 0.3-0.6z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m332.6 817.8c0.4-0.5 0.7-1 1.1-1.5 0.1-0.1 0.1-0.3 0.1-0.5v-0.5c0-0.2-0.1-0.3-0.2-0.4s-0.2-0.2-0.4-0.3c-0.3-0.2-0.6-0.2-1-0.1-0.1 0-0.2 0.1-0.3 0.1-0.2 0.1-0.3 0.3-0.4 0.4-0.4 0.5-0.7 1-1.1 1.5-0.1 0.1-0.1 0.3-0.1 0.5v0.5c0 0.2 0.1 0.3 0.2 0.4s0.2 0.2 0.4 0.3c0.3 0.2 0.6 0.2 1 0.1 0.1 0 0.2-0.1 0.3-0.1l0.4-0.4z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m324.5 820c-0.1 0.8-0.3 1.5-0.4 2.3-0.1 0.3-0.1 0.7 0.1 1s0.4 0.5 0.7 0.6 0.7 0.1 1-0.1 0.5-0.4 0.6-0.7c0.1-0.8 0.3-1.5 0.4-2.3 0.1-0.3 0.1-0.7-0.1-1s-0.4-0.5-0.7-0.6-0.7-0.1-1 0.1c-0.3 0.1-0.6 0.4-0.6 0.7z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m316.3 824c-0.5 0.9-0.9 1.8-1.3 2.8-0.1 0.3 0 0.7 0.1 1 0.2 0.3 0.4 0.5 0.7 0.6s0.7 0.1 1-0.1 0.5-0.4 0.6-0.7 0.2-0.6 0.4-0.9c0 0.1-0.1 0.2-0.1 0.3 0.2-0.5 0.5-1 0.8-1.5 0.2-0.3 0.2-0.7 0.1-1s-0.3-0.6-0.6-0.7c-0.3-0.2-0.6-0.2-1-0.1-0.3-0.2-0.6 0-0.7 0.3z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m329.6 825.3c0 0.1-0.1 0.2-0.1 0.3 0.1-0.1 0.1-0.2 0.1-0.3l-0.3 0.6c0.1-0.1 0.1-0.2 0.2-0.3l-0.1 0.1c-0.1 0.1-0.2 0.2-0.3 0.4-0.1 0.1-0.1 0.3-0.1 0.5s0 0.3 0.1 0.5 0.1 0.3 0.3 0.4c0.1 0.1 0.2 0.1 0.3 0.2 0.2 0.1 0.4 0.2 0.6 0.2h0.3l0.6-0.3c0.2-0.2 0.4-0.5 0.5-0.7 0-0.1 0.1-0.2 0.1-0.3 0.1-0.2 0.2-0.4 0.2-0.6 0.1-0.2 0.1-0.3 0-0.5 0-0.2-0.1-0.3-0.1-0.5-0.1-0.1-0.2-0.3-0.3-0.4s-0.3-0.2-0.4-0.2h-0.3c-0.2 0-0.4 0.1-0.6 0.2-0.1 0.1-0.2 0.1-0.3 0.2-0.2 0.1-0.3 0.3-0.4 0.5z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m321.7 830.1-1.5 1.5c-0.1 0.1-0.2 0.2-0.3 0.4-0.1 0.1-0.1 0.3-0.1 0.5s0 0.3 0.1 0.5 0.1 0.3 0.3 0.4c0.2 0.2 0.6 0.4 0.9 0.4s0.6-0.1 0.9-0.4l1.5-1.5c0.1-0.1 0.2-0.2 0.3-0.4 0.1-0.1 0.1-0.3 0.1-0.5s0-0.3-0.1-0.5-0.1-0.3-0.3-0.4c-0.2-0.2-0.6-0.4-0.9-0.4-0.4 0-0.7 0.1-0.9 0.4z\"></path><path class=\"st6\" fill=\"#F89B00\" d=\"m263.5 805.4c-0.6 0.9-1.3 1.8-2.1 2.6-0.3 0.3-0.6 0.6-1 0.9-1.4 1.1-3 1.4-4.7 1.4-6.2 0-13.5-4.1-16.4-9.7-1.4-2.7-0.9-6.1 0.2-8.9 0.6-1.4 1.3-2.6 2.2-3.7-0.6 1.1-1.1 2.3-1.3 3.5-0.9 5.4 2.6 10.1 7 12.9 4.2 2.7 10.1 5.1 14.8 2.1 0.5-0.4 1-0.7 1.3-1.1z\"></path><path class=\"st7\" fill=\"#FFE1A0\" d=\"m265.9 800.3c-0.1 2-1 3.8-2.4 5.1-0.4 0.4-0.8 0.7-1.3 1-4.7 3-10.6 0.6-14.8-2.1-4.4-2.8-7.8-7.4-7-12.9 0.2-1.2 0.6-2.4 1.3-3.5 0.5-0.9 1.2-1.7 2.1-2.3 1.7-1.3 3.7-1.4 5.8-1.2 5.6 0.2 10.6 3.6 13.7 8.2 1.5 2.2 2.8 5 2.6 7.7z\"></path><path class=\"st14\" fill=\"#00D1E4\" d=\"m297.9 808.2c-0.4 0.6-0.8 1.1-1.2 1.4-1.7-1.9-4.1-3.3-6.6-3.7-0.2 0-0.5-0.1-0.7-0.1v-0.1c0-0.9 0.4-1.9 0.4-2.8 0-0.4 0.6-3.3 1.1-3.3 0.6 0 1.5 2 1.8 2.5 0.3 0.6 1.1 1.8 1.7 1.9 0.8 0.2 5.4-1.1 6.2-1.2s-1.1 3.2-2.7 5.4z\"></path><path class=\"st18\" fill=\"#00A7A5\" d=\"m297.9 808.2c-0.4 0.6-0.8 1.1-1.2 1.4-1.7-1.9-4.1-3.3-6.6-3.7-0.2 0-0.5-0.1-0.7-0.1v-0.1c1-0.6 3.9-1.2 8.5 2.5z\"></path><path class=\"st19\" fill=\"#D960FF\" d=\"m296.7 823.3c-2.1 2.2-5 3.9-8 4.1-5.7 0.4-10.1-4.1-11.7-8.5-0.6-1.6-0.8-3.2-0.6-4.6 0.3-2.4 1.6-4.7 3.6-6.4 3.3-2.6 6.4-2.5 9.4-2.1 0.2 0 0.5 0.1 0.7 0.1 2.5 0.4 4.8 1.8 6.6 3.7l1.2 1.5c0.8 1.2 1.4 2.5 1.6 3.9 0.5 3-0.7 6.1-2.8 8.3z\"></path><path class=\"st20\" fill=\"#C450F6\" d=\"m296.7 823.3c-2.1 2.2-5 3.8-8 4-5.7 0.4-10.1-4.1-11.7-8.5 0.1 0 0.2-0.1 0.3-0.1 0.6-0.1 1.2 0.2 1.8 0.5 1.1 0.6 3 1 4.3 1.1 3.9 0.5 5.6-0.2 7.6-1.2 1.6-0.9 3.7-3.5 4.5-6 0.3-0.8 0.8-1.4 1.3-2 0.2-0.2 0.8 0.1 1 0 0.8 1.2 1.3 2.5 1.6 3.9 0.6 3-0.6 6.1-2.7 8.3z\"></path><path class=\"st21\" fill=\"#7600C8\" d=\"m285.3 823.7c1 0.3 2.1 0.5 3.1 0.7 0.3 0 0.7-0.2 0.9-0.4s0.4-0.6 0.4-0.9-0.1-0.7-0.4-0.9c-0.1-0.1-0.2-0.1-0.3-0.2-0.2-0.1-0.4-0.2-0.6-0.2h-0.1 0.3c-0.9-0.1-1.8-0.3-2.6-0.6-0.3-0.1-0.7 0-1 0.1-0.3 0.2-0.5 0.4-0.6 0.7-0.1 0.9 0.2 1.5 0.9 1.7z\"></path><path class=\"st6\" fill=\"#F89B00\" d=\"m248.8 790.7c0.8 1.4 1.6 2.9 2.3 4.4 0.2 0.5 1 0.7 1.5 0.4s0.6-0.9 0.4-1.5c-0.7-1.5-1.5-3-2.3-4.4-0.3-0.5-1-0.7-1.5-0.4-0.5 0.4-0.7 1-0.4 1.5z\"></path><path class=\"st6\" fill=\"#F89B00\" d=\"m250.7 795.2c-1.4-0.6-2.9-1-4.4-1.1-0.6 0-1.1 0.5-1.1 1.1s0.5 1 1.1 1.1c0.3 0 0.5 0 0.8 0.1h-0.3l1.5 0.3c0.3 0.1 0.5 0.2 0.8 0.2 0.1 0 0.2 0.1 0.3 0.1h0.1-0.1c0.1 0 0.1 0.1 0.2 0.1 0.3 0.1 0.5 0.2 0.8 0.1 0.2-0.1 0.5-0.3 0.6-0.5 0.3-0.5 0.2-1.3-0.3-1.5z\"></path><path class=\"st6\" fill=\"#F89B00\" d=\"m259.9 796.1c-1.3-0.4-2.7-0.8-3.9-1.3-0.2-0.1-0.6 0-0.8 0.1s-0.4 0.4-0.5 0.6c-0.1 0.3 0 0.6 0.1 0.8 0.2 0.2 0.4 0.4 0.6 0.5 1.3 0.5 2.6 0.9 3.9 1.3 0.5 0.1 1.2-0.2 1.3-0.8 0.2-0.5-0.1-1.1-0.7-1.2z\"></path><path class=\"st6\" fill=\"#F89B00\" d=\"m252.4 797.5c0.9 1.6 2.1 3.1 3.3 4.6 0.4 0.4 1.1 0.4 1.5 0 0.4-0.5 0.4-1.1 0-1.5-0.3-0.3-0.6-0.7-0.8-1l-0.1-0.1c-0.1-0.1 0.1 0.1 0 0s-0.1-0.2-0.2-0.3c-0.1-0.2-0.3-0.4-0.4-0.5-0.5-0.7-1-1.5-1.4-2.2-0.3-0.5-1-0.7-1.5-0.4-0.5 0.2-0.7 0.9-0.4 1.4z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m296.6 875.2c-5.3 0.6-10.7 0.8-16.1 1.2-1 0.1-1 1.6 0 1.5 5.4-0.4 10.7-0.6 16.1-1.2 1-0.1 1-1.6 0-1.5z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m330.9 866c-8.7 3.6-17.6 6.7-26.9 8.2-1 0.2-0.5 1.6 0.4 1.4 9.3-1.5 18.2-4.6 26.9-8.2 0.9-0.4 0.5-1.8-0.4-1.4z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m335.8 868.3c-12.7 6.2-26.3 10.6-40.5 11.6-1 0.1-1 1.6 0 1.5 14.5-1 28.2-5.5 41.2-11.8 1-0.4 0.2-1.7-0.7-1.3z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m342.9 848.6c-10.8 7.7-23.5 11-36.5 12.7-0.9 0.1-1 1.6 0 1.5 13.2-1.8 26.2-5.1 37.2-12.9 0.8-0.5 0.1-1.8-0.7-1.3z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m339.6 855.5c-6.3 4.4-13.6 7-21 8.9-8.6 2.2-17.5 3.4-26.4 4-1 0.1-1 1.6 0 1.5 9-0.6 18.1-1.8 26.8-4 7.5-1.9 15-4.6 21.3-9 0.9-0.6 0.1-1.9-0.7-1.4z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m332.9 873.9c-13.5 6.9-28.1 10.5-43.2 10.8-1 0-1 1.5 0 1.5 15.4-0.4 30.2-4.1 43.9-11.1 1-0.3 0.2-1.6-0.7-1.2z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m324.4 887.4c-5.8 2.9-12.2 4.6-18.5 5.9-7.5 1.6-15.2 2.5-22.8 2.1-1-0.1-1 1.4 0 1.5 7.8 0.4 15.6-0.6 23.2-2.2 6.4-1.3 13-3.1 18.9-6 0.9-0.5 0.1-1.8-0.8-1.3z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m320.3 893.8c-5.6 2.9-12.2 4.2-18.4 5.2-7.7 1.3-15.5 2.1-23.3 2.1-1 0-1 1.5 0 1.5 7.9 0 15.9-0.8 23.7-2.2 6.3-1.1 13-2.4 18.7-5.4 0.9-0.4 0.2-1.7-0.7-1.2z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m328.5 881c-4.2 2.5-9.2 3.8-13.9 5-6.2 1.6-12.6 2.7-18.9 3.4-3.2 0.3-6.4 0.5-9.6 0.4-1 0-1 1.5 0 1.5 6.1 0.2 12.3-0.6 18.3-1.6 6.1-1 12.1-2.4 18-4.4 2.4-0.8 4.7-1.7 6.9-3 0.8-0.4 0-1.7-0.8-1.3z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m309.5 902.1c-13.8 5-28.6 5.1-43.2 4.9-1 0-1 1.5 0 1.5 14.7 0.2 29.6 0 43.6-5 0.9-0.3 0.5-1.8-0.4-1.4z\"></path><path class=\"st13\" fill=\"#EA0000\" d=\"m344.9 813.2c-4.7 1.1-9 1.1-15.9-3.2-2.8-1.7-3.9-5.4-4.2-7.3 1.8 0.1 3.5 0.7 5.1 1.4 1.8 0.8 3.6 1.7 5.5 2.3 2.2 0.7 4.6 1 6.5 2.4 1.5 1.1 2.5 2.6 3 4.4v0z\"></path><path class=\"st14\" fill=\"#00D1E4\" d=\"m348.5 810.8c-1.2 1.3-3.1 1.7-4.8 1.5-2.4-0.3-4.8-0.7-7.2-1.3-2.7-0.7-5.6-1.5-7.8-3.3-1.6-1.5-2.9-3.2-3.6-5.3-0.6-1.8-0.9-3.8-1.1-5.7-0.4-3.9 0.9-9.2 5.5-9.9 2.3-0.3 4.1 0.9 5.2 2.7 0.7 1.1 1.1 2.5 1.2 3.8 0.1 1.2-0.1 2.3-0.4 3.4-0.1 0.6-0.3 1.2-0.4 1.7-0.1 0.3-0.2 0.9-0.3 1.4v0.1l-0.1 0.3 0.6-0.3c0.4-0.3 0.8-0.7 1.1-1.1 0.5-0.7 0.9-1.6 1.4-2.4 1-1.7 2.5-2.9 4.5-3.2 1.8-0.2 3.5 0.5 4.5 1.9 0.4 0.6 0.7 1.2 0.8 1.8v0.1c0.1 0.9 0 1.9-0.6 2.8-0.9 1.4-2.5 2.2-4 2.9-0.4 0.2-0.9 0.4-1.3 0.7-0.3 0.3-0.4 0.3-0.1 0.6 0.4 0.4 1.6 0.1 2.1 0.1 1.6-0.1 3.2 0.3 4.4 1.3l0.6 0.6c0.9 1.6 1 3.5-0.2 4.8z\"></path><path class=\"st18\" fill=\"#00A7A5\" d=\"m335.8 793.3c0.1 1.2-0.1 2.3-0.4 3.4-0.1 0.6-0.3 1.2-0.4 1.7-0.1 0.3-0.2 0.9-0.3 1.4v0.1l-0.1 0.3s-1.2 1.9-2 1.1c-0.9-0.9 3-7.5 2.1-11.8 0.6 1.2 1.1 2.5 1.1 3.8z\"></path><path class=\"st22\" fill=\"#D67F23\" d=\"m264.5 834.8c-0.6 3.2-3.1 5.6-5.9 7.1-3.1 1.7-6.5 2.3-10 1.6 6.7-0.1 11.5-4.4 14-9.4 1.7-3.4 0.8-7.3 0.4-9.1 1.6 3 2.2 6.5 1.5 9.8z\"></path><path class=\"st4\" fill=\"#1739DB\" d=\"m311.4 907.6c-0.6 0.6-1.2 1.2-1.9 1.7-1.9 1.6-4.2 2.6-6.5 3.5-7.8 3.1-16.3 4.2-24.6 4.7-11.4 0.6-22.9-0.1-34-2.5-4.3-1-8.7-2.2-12.7-4-3-1.3-5.3-4.1-7.4-6.6 1.1 1.1 8.8 8.5 30.7 10.1 23.7 1.8 43.4 0.9 56.4-6.9v0z\"></path><path class=\"st18\" fill=\"#00A7A5\" d=\"m342.2 802.2c1.5-0.8 5.5-2.7 5.2-4.8v-0.2c0.1 0.9 0 1.9-0.6 2.8-0.9 1.4-2.5 2.2-4 2.9-0.4 0.2-0.9 0.4-1.3 0.7-0.3 0.3-2.2 1.2-2.2 0.3s1.4-0.9 2.9-1.7z\"></path></g>", 1)
  ]))]))
}
const MuesliSwap = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$1]]);

const _hoisted_1$4 = { key: 1 };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DexIcon",
  props: {
    dex: { type: String, required: false, default: "MinSwapV2" }
  },
  setup(__props) {
    const dexList = {
      "Axo": AXO,
      "GeniusYield": GeniusYield,
      "Spectrum": Spectrum,
      "SpectrumV1": Spectrum,
      "Splash": Splash,
      "SplashV1": Splash,
      "VyFi": VyFinance,
      "VyFiV1": VyFinance,
      "WingRiders": WingRiders,
      "WingRidersV1": WingRiders,
      "WingRidersV2": WingridersV2,
      "MuesliSwap": MuesliSwap,
      "MuesliSwapV1": MuesliSwap,
      "Minswap": MinSwap,
      "MinswapV1": MinSwap,
      "MinswapV2": MinswapV2,
      "SundaeSwap": SundaeSwap,
      "SundaeSwapV1": SundaeSwap,
      "SundaeSwapV3": SundaeSwapv3,
      "CSWAP": CSwap,
      "CSWAPV1": CSwap
    };
    return (_ctx, _cache) => {
      return dexList?.[__props.dex] ? (openBlock(), createBlock(resolveDynamicComponent(dexList[__props.dex]), { key: 0 })) : (openBlock(), createElementBlock("div", _hoisted_1$4, toDisplayString(__props.dex), 1));
    };
  }
});

let _currentSound = null;
const useSounds = () => {
  const { soundsEnabled } = useApp();
  const playSound = (type) => {
    if (!soundsEnabled.value) {
      return;
    }
    let file = "";
    switch (type) {
      case "buildSwap":
        file = "monster_03.mp3";
        break;
      case "resetSwap":
        file = "monster_02_reset.mp3";
        break;
    }
    if (!file) {
      return;
    }
    if (_currentSound) {
      _currentSound.src = `/sounds/${file}`;
    } else {
      _currentSound = new Audio(`/sounds/${file}`);
    }
    _currentSound.play().catch((error) => {
      console.log("Error playing sound:", error);
    });
  };
  return {
    playSound
  };
};

const _hoisted_1$3 = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 500 500",
  style: { "enable-background": "new 0 0 500 500" },
  "xml:space": "preserve"
};
const storeId = "FxEternlMonster";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FxEternlMonster",
  setup(__props) {
    const {
      gradientViolet,
      gradientRed} = useTheme();
    let monster_state = 0;
    let slider_amount = 1.3;
    const getHappy = (event) => {
      useSounds().playSound("buildSwap");
      monster_state = 4;
      gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: true, scaleY: 0.7, scaleX: 1.2, x: -4, y: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: true, scaleY: 0.7, scaleX: 1.2, x: -4, y: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: false, delay: 1, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: false, delay: 1, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: false, delay: 3, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: false, delay: 3, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: false, delay: 6, repeat: 3, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: false, delay: 6, repeat: 3, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_wrap", { scaleY: 1.12, scaleX: 1.1, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_right_wrap", { scaleY: 1.12, scaleX: 1.1, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_right", { x: 0, y: 0, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_left", { x: 0, y: 0, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_right", { duration: 0.2, scale: 1.1, repeat: 1, yoyo: true, overwrite: true, ease: "back.inOut(1.8)" });
      gsapWithCSS.to("#eye_left", { duration: 0.2, scale: 1.1, repeat: 1, yoyo: true, overwrite: true, ease: "back.inOut(1.8)" });
      gsapWithCSS.to("#mouth", { duration: 0.2, overwrite: true, scaleY: 1, scaleX: 1.2, y: 10, opacity: 1, ease: "back.out(1.8)" });
      gsapWithCSS.to("#ear_mask_l", { duration: 0.2, overwrite: true, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#ear_mask_r", { duration: 0.2, overwrite: true, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to(".ear", { duration: 0.2, overwrite: true, scaleY: 1, fill: "#374169", opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#body", { duration: 0.5, overwrite: true, scaleX: 1, scaleY: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#body_inner", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_white", { duration: 0.2, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_white", { duration: 0.2, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#7188FF", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#D153D1", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#44FFF9", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#5AFFA6", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.4, overwrite: false, delay: 0.3, yoyo: true, repeat: 4, stopColor: "#FFB719", ease: "none" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.4, overwrite: false, delay: 0.5, yoyo: true, repeat: 4, stopColor: "#FF5178", ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.7, yoyo: true, repeat: 4, stopColor: "#D153D1", ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.9, yoyo: true, repeat: 4, stopColor: "#7188FF", ease: "none" });
    };
    const getAngry = (event) => {
      useSounds().playSound("resetSwap");
      monster_state = 6;
      gsapWithCSS.to("#body_wrap", { duration: 0.1, overwrite: true, rotation: 1, yoyo: true, repeat: 5, ease: "power2.inOut" });
      gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: true, scaleY: 0.35, scaleX: 1, x: -5, y: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: true, scaleY: 0.35, scaleX: 1, x: -5, y: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_wrap", { scaleY: 0.85, scaleX: 1.1, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_right_wrap", { scaleY: 0.85, scaleX: 1.1, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_right", { x: -1, y: 1, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_left", { x: 1, y: 1, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#mouth", { duration: 0.2, overwrite: true, scaleY: 0.7, scaleX: 0.5, y: -3, opacity: 1, ease: "power2.inOut" });
      gsapWithCSS.to("#ear_mask_l", { duration: 0.2, overwrite: true, opacity: 1 });
      gsapWithCSS.to("#ear_mask_r", { duration: 0.2, overwrite: true, opacity: 1 });
      gsapWithCSS.to(".ear", { duration: 0.4, overwrite: true, yoyo: true, repeat: 0, scaleY: 1, fill: gradientRed.value, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#body", { duration: 0.2, overwrite: true, scaleX: 1, scaleY: 0.99, ease: "sine.inOut" });
      gsapWithCSS.to("#body_inner", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_white", { duration: 0.5, fill: gradientRed.value, stroke: gradientRed.value, strokeWidth: 0, opacity: 0.25, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_white", { duration: 0.5, fill: gradientRed.value, stroke: gradientRed.value, strokeWidth: 0, opacity: 0.25, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.2, overwrite: true, delay: 0, stopColor: gradientRed.value, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.2, overwrite: true, delay: 0, stopColor: gradientRed.value, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: gradientRed.value, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: gradientRed.value, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.4, overwrite: false, delay: 0.3, yoyo: true, repeat: 4, stopColor: gradientRed.value, ease: "none" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.4, overwrite: false, delay: 0.5, yoyo: true, repeat: 4, stopColor: gradientRed.value, ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.7, yoyo: true, repeat: 4, stopColor: gradientRed.value, ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.9, yoyo: true, repeat: 4, stopColor: gradientRed.value, ease: "none" });
      gsapWithCSS.delayedCall(1.5, getAwake);
    };
    const getBored = (event) => {
      monster_state = 3;
      gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0.6, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: true, scaleY: 0.3, scaleX: 1, x: -5, y: -10, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: true, scaleY: 0.3, scaleX: 1, x: -5, y: -10, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.fromTo("#eye_right_black", { x: -5 }, { x: -2, duration: 1.4, delay: 0.2, repeat: -1, yoyo: true, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.fromTo("#eye_left_black", { x: -5 }, { x: -2, duration: 1.4, delay: 0.2, repeat: -1, yoyo: true, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.fromTo("#eye_right_black", { scaleY: 0.3 }, { scaleY: 0.32, duration: 1.4, delay: 0.2, repeat: -1, yoyo: true, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.fromTo("#eye_left_black", { scaleY: 0.3 }, { scaleY: 0.32, duration: 1.4, delay: 0.2, repeat: -1, yoyo: true, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_wrap", { scaleY: 0.95, scaleX: 1, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_right_wrap", { scaleY: 0.95, scaleX: 1, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_right", { x: -1, y: 1, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_left", { x: 1, y: 1, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#mouth", { duration: 0.2, overwrite: true, scaleY: 1, scaleX: 0.8, y: -3, opacity: 1, ease: "power2.inOut" });
      gsapWithCSS.to("#ear_mask_l", { duration: 0.2, overwrite: true, opacity: 0 });
      gsapWithCSS.to("#ear_mask_r", { duration: 0.2, overwrite: true, opacity: 0 });
      gsapWithCSS.to("#body", { duration: 0.2, overwrite: true, scaleX: 1, scaleY: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#body_inner", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_white", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_white", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.2, overwrite: true, delay: 0, stopColor: gradientViolet.value, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.2, overwrite: true, delay: 0, stopColor: gradientViolet.value, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: gradientViolet.value, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: gradientViolet.value, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.4, overwrite: false, delay: 0.3, yoyo: true, repeat: 4, stopColor: gradientViolet.value, ease: "none" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.4, overwrite: false, delay: 0.5, yoyo: true, repeat: 4, stopColor: gradientViolet.value, ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.7, yoyo: true, repeat: 4, stopColor: gradientViolet.value, ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.9, yoyo: true, repeat: 4, stopColor: gradientViolet.value, ease: "none" });
    };
    const getWaiting = (event) => {
      monster_state = 2;
      gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: true, scaleY: 1, scaleX: 1, x: -8, y: -2, opacity: 1 });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: true, scaleY: 1, scaleX: 1, x: -8, y: -2, opacity: 1 });
      gsapWithCSS.fromTo("#eye_right_black", { x: -8 }, { x: 6, duration: 1.4, delay: 0.2, repeat: -1, yoyo: true, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.fromTo("#eye_left_black", { x: -8 }, { x: 6, duration: 1.4, delay: 0.2, repeat: -1, yoyo: true, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.fromTo("#eye_right_black", { scaleY: 1 }, { scaleY: 0.9, duration: 1.4, delay: 0.2, repeat: -1, yoyo: true, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.fromTo("#eye_left_black", { scaleY: 1 }, { scaleY: 0.9, duration: 1.4, delay: 0.2, repeat: -1, yoyo: true, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_wrap", { scaleY: 1.1, scaleX: 1, duration: 0.2, overwrite: false, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_right_wrap", { scaleY: 1.1, scaleX: 1, duration: 0.2, overwrite: false, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_right", { x: 0, y: -4, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_left", { x: 0, y: -4, duration: 0.2, overwrite: true, ease: "back.Out(5.8)" });
      gsapWithCSS.to("#eye_left_wrap", { scaleY: 1.15, duration: 1.4, yoyo: true, repeat: -1, delay: 0.4, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_wrap", { scaleY: 1.15, duration: 1.4, yoyo: true, repeat: -1, delay: 0.4, overwrite: false, ease: "sine.inOut" });
      gsapWithCSS.to("#mouth", { duration: 0.2, overwrite: true, scaleY: 1, scaleX: 1, y: 3, opacity: 1, ease: "back.out(1.8)" });
      gsapWithCSS.to("#ear_mask_l", { duration: 0.2, overwrite: true, opacity: 0 });
      gsapWithCSS.to("#ear_mask_r", { duration: 0.2, overwrite: true, opacity: 0 });
      gsapWithCSS.to(".ear", { duration: 0.4, overwrite: true, yoyo: true, repeat: 0, scaleY: 1, fill: "#f4905c", opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#body", { duration: 0.5, overwrite: true, scaleX: 1, scaleY: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#body_inner", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_white", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_white", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#FFB719", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#5AFFA6", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#44FFF9", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#5AFFA6", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.4, overwrite: false, delay: 0.3, yoyo: true, repeat: 4, stopColor: "#FFB719", ease: "none" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.4, overwrite: false, delay: 0.5, yoyo: true, repeat: 4, stopColor: "#5AFFA6", ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.7, yoyo: true, repeat: 4, stopColor: "#44FFF9", ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.9, yoyo: true, repeat: 4, stopColor: "#44FFF9", ease: "none" });
    };
    const getGreedy = (amount) => {
      monster_state = 5;
      switch (amount) {
        case 25:
          slider_amount = 1.1;
          gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0, ease: "sine.inOut" });
          break;
        case 50:
          slider_amount = 1.2;
          gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0, ease: "sine.inOut" });
          break;
        case 75:
          slider_amount = 1.3;
          gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0, ease: "sine.inOut" });
          break;
        case 100:
          slider_amount = 1.4;
          gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0, ease: "sine.inOut" });
          break;
        default:
          slider_amount = 1;
          gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0, ease: "sine.inOut" });
          break;
      }
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: true, scaleY: 0.7, scaleX: 1, x: -4, y: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: true, scaleY: 0.7, scaleX: 1, x: -4, y: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: false, delay: 1, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: false, delay: 1, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: false, delay: 3, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: false, delay: 3, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: false, delay: 6, repeat: 3, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: false, delay: 6, repeat: 3, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_wrap", { scaleY: 1.1 * slider_amount, scaleX: slider_amount, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_right_wrap", { scaleY: 1.1 * slider_amount, scaleX: slider_amount, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_right", { x: 0, y: 0, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_left", { x: 0, y: 0, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#mouth", { duration: 0.2, overwrite: true, scaleY: 1, scaleX: 1, y: 1 + 6 * slider_amount, opacity: 1, ease: "back.out(1.8)" });
      gsapWithCSS.to("#ear_mask_l", { duration: 0.2, overwrite: true, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#ear_mask_r", { duration: 0.2, overwrite: true, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to(".ear", { duration: 0.2, overwrite: true, scaleY: 1, fill: "#374169", opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#body", { duration: 0.5, overwrite: true, scaleX: 1, scaleY: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#body_inner", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_white", { duration: 0.2, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_white", { duration: 0.2, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#FF5178", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#D153D1", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#D153D1", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.2, overwrite: true, delay: 0, stopColor: "#FF5178", ease: "sine.inOut" });
      gsapWithCSS.to("#monster_g_0", { duration: 0.4, overwrite: false, delay: 0.3, yoyo: true, repeat: 4, stopColor: "#D153D1", ease: "none" });
      gsapWithCSS.to("#monster_g_1", { duration: 0.4, overwrite: false, delay: 0.5, yoyo: true, repeat: 4, stopColor: "#FF5178", ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.7, yoyo: true, repeat: 4, stopColor: "#D153D1", ease: "none" });
      gsapWithCSS.to("#monster_g_2", { duration: 0.4, overwrite: false, delay: 0.9, yoyo: true, repeat: 4, stopColor: "#FF5178", ease: "none" });
    };
    const getAwake = (event) => {
      monster_state = 1;
      gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: true, scaleY: 0.7, scaleX: 1, x: -4, y: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: true, scaleY: 0.7, scaleX: 1, x: -4, y: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: false, delay: 1, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: false, delay: 1, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: false, delay: 3, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: false, delay: 3, repeat: 1, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.2, overwrite: false, delay: 6, repeat: 3, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_black", { duration: 0.2, overwrite: false, delay: 6, repeat: 3, yoyo: true, scaleY: 0.2, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_wrap", { scaleY: 1.1, scaleX: 1, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_right_wrap", { scaleY: 1.1, scaleX: 1, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_right", { x: 0, y: 0, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_left", { x: 0, y: 0, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#mouth", { duration: 0.2, overwrite: true, scaleY: 1, scaleX: 1, y: 1, opacity: 1, ease: "back.out(1.8)" });
      gsapWithCSS.to("#ear_mask_l", { duration: 0.2, overwrite: true, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#ear_mask_r", { duration: 0.2, overwrite: true, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to(".ear", { duration: 0.2, overwrite: true, scaleY: 1, fill: "#374169", opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#body", { duration: 0.5, overwrite: true, scaleX: 1, scaleY: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#body_inner", { duration: 0.5, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_white", { duration: 0.2, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_white", { duration: 0.2, fill: "#FDFDFD", stroke: "#FDFDFD", strokeWidth: 0, opacity: 1, ease: "sine.inOut" });
    };
    const getSleepy = (event) => {
      if (monster_state == 2) {
        monster_state = 0;
        gsapWithCSS.delayedCall(0.25, getSleepy);
        return;
      } else {
        monster_state = 0;
      }
      gsapWithCSS.to("#body_inner_colored", { duration: 0.5, opacity: 0, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_black", { duration: 0.5, overwrite: true, scaleY: 0.1, scaleX: 1, x: -4, y: 0, opacity: 1 });
      gsapWithCSS.to("#eye_left_black", { duration: 0.5, overwrite: true, scaleY: 0.1, scaleX: 1, x: -4, y: 0, opacity: 1 });
      gsapWithCSS.to("#eye_left_wrap", { duration: 0.5, overwrite: true, scaleY: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_wrap", { duration: 0.5, overwrite: true, scaleY: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right", { x: -1, y: 0, duration: 0.3, overwrite: true, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left", { x: 1, y: 0, duration: 0.3, overwrite: true, ease: "sine.inOut" });
      gsapWithCSS.to("#mouth", { duration: 0.5, overwrite: true, scaleY: 1, scaleX: 1, y: 0, opacity: 1, ease: "power2.inOut" });
      gsapWithCSS.to("#eye_left_wrap", { scaleY: 1, scaleX: 1, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#eye_right_wrap", { scaleY: 1, scaleX: 1, duration: 0.2, overwrite: true, ease: "back.out(5.8)" });
      gsapWithCSS.to("#ear_mask_l", { duration: 0.5, overwrite: true, opacity: 0 });
      gsapWithCSS.to("#ear_mask_r", { duration: 0.5, overwrite: true, opacity: 0 });
      gsapWithCSS.to(".ear", { duration: 0.5, scaleY: 1, fill: "#000000", opacity: 0 });
      gsapWithCSS.to("#body", { duration: 0.5, overwrite: true, scaleX: 1, scaleY: 0.99, ease: "sine.inOut" });
      gsapWithCSS.to("#body_inner", { duration: 0.5, fill: "#CCD1E3", stroke: "#CCD1E3", strokeWidth: 1, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_right_white", { duration: 0.2, fill: "#CCD1E3", stroke: "#CCD1E3", strokeWidth: 1, opacity: 1, ease: "sine.inOut" });
      gsapWithCSS.to("#eye_left_white", { duration: 0.2, fill: "#CCD1E3", stroke: "#CCD1E3", strokeWidth: 1, opacity: 1, ease: "sine.inOut" });
    };
    const resetMonster = () => {
      monster_state = 0;
      gsapWithCSS.set("#eye_right_black", { scaleY: 0.1, x: -4, y: 0, opacity: 1, svgOrigin: "291px 210px" });
      gsapWithCSS.set("#eye_left_black", { scaleY: 0.1, x: -4, y: 0, opacity: 1, svgOrigin: "233px 210px" });
      gsapWithCSS.set("#eye_right_wrap", { scaleY: 1, opacity: 1, svgOrigin: "284px 210px" });
      gsapWithCSS.set("#eye_left_wrap", { scaleY: 1, opacity: 1, svgOrigin: "227px 210px" });
      gsapWithCSS.set("#eye_right", { x: 0, y: 0, svgOrigin: "284px 210px" });
      gsapWithCSS.set("#eye_left", { x: 0, y: 0, svgOrigin: "227px 210px" });
      gsapWithCSS.set("#ear_mask_l", { scaleY: 1, opacity: 0 });
      gsapWithCSS.set("#ear_mask_r", { scaleY: 1, opacity: 0 });
      gsapWithCSS.set("#body_mask", { opacity: 0 });
      gsapWithCSS.set("#shadow_bg", { fill: "#282828", opacity: 1 });
      gsapWithCSS.set(".ear", { scaleY: 1, fill: "#000000", opacity: 0 });
      gsapWithCSS.set("#body_inner", { fill: "#CCD1E3", stroke: "#CCD1E3", strokeWidth: 1, opacity: 1 });
      gsapWithCSS.set("#body_inner_colored", { opacity: 0 });
      gsapWithCSS.set("#eye_right_white", { fill: "#CCD1E3", stroke: "#CCD1E3", strokeWidth: 1, opacity: 1 });
      gsapWithCSS.set("#eye_left_white", { fill: "#CCD1E3", stroke: "#CCD1E3", strokeWidth: 1, opacity: 1 });
      gsapWithCSS.set("#coin", { display: "none" });
      gsapWithCSS.set("#mouth", { scaleY: 1, y: 5, opacity: 1, svgOrigin: "253px 243px" });
      gsapWithCSS.set("#body", { scaleY: 0.99, scaleX: 1, svgOrigin: "253px 407px" });
      gsapWithCSS.set("#body_wrap", { scaleY: 1, scaleX: 1, svgOrigin: "253px 407px" });
      getSleepy();
    };
    onMounted(() => {
      resetMonster();
      addSignalListener(doMonsterAwake, storeId, getAwake);
      addSignalListener(doMonsterSleep, storeId, getSleepy);
      addSignalListener(doMonsterBored, storeId, getBored);
      addSignalListener(doMonsterGreedy, storeId, getGreedy);
      addSignalListener(doMonsterWaiting, storeId, getWaiting);
      addSignalListener(doMonsterHappy, storeId, getHappy);
      addSignalListener(doMonsterAngry, storeId, getAngry);
    });
    onUnmounted(() => {
      removeSignalListener(doMonsterAwake, storeId);
      removeSignalListener(doMonsterSleep, storeId);
      removeSignalListener(doMonsterBored, storeId);
      removeSignalListener(doMonsterGreedy, storeId);
      removeSignalListener(doMonsterWaiting, storeId);
      removeSignalListener(doMonsterHappy, storeId);
      removeSignalListener(doMonsterAngry, storeId);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [
        createStaticVNode('<g id="shadow_bg_w" data-v-2f2be962><path id="shadow_bg" class="st0" d="M353.8,390.4c11.4,0.7,22.7,2,33.8,4.9\n		c1.8,0.5,3.5,1.4,5.2,2.2c1.2,0.6,2.4,1.3,2.4,2.8c0,1.7-0.9,2.8-2.4,3.6c-5,2.6-10.5,4.1-16,4.9c-10.3,1.6-20.6,2.8-31,3.5\n		c-13.8,1-27.6,1.4-41.4,2c-29.4,1.1-58.8,0.5-88.2,0.4c-11.7,0-23.5-0.4-35.2-1.2c-15.6-1.1-31.3-2-46.7-5.2\n		c-3.9-0.8-7.7-1.9-11.3-3.5c-1.8-0.8-3.5-2-3.4-4.1c0.1-2,2-3.1,3.7-3.9c4.5-1.9,9.2-3,14-3.7c6.9-1,13.9-1.8,20.8-2.8\n		c0.4-0.1,47.2-2.8,47.5-3" data-v-2f2be962></path></g><g id="body_wrap" data-v-2f2be962><g id="body" data-v-2f2be962><g id="monster" data-v-2f2be962><g data-v-2f2be962><path class="st1" d="M159.3,389.9c-0.3-3.7-2-7-2.8-10.5c-1.7-7.2-2.8-14.5-3.8-21.8c-0.2-1.8-0.4-2.5-2.5-1.7\n				c-2.7,1.1-5.4,0.9-7.6-1.4c-0.7-0.8-1.1-0.9-2-0.1c-4.7,3.6-10,2.7-13.4-2.3c-3.5-5.1-4.7-10.9-4.9-16.9\n				c-0.6-21.4,6.3-40.3,18.9-57.2c3.3-4.4,6.8-8.7,10.4-12.8c2.1-2.3,3.2-4.8,3.6-7.9c4.6-33.5,10.6-66.8,18-99.8\n				c2.4-10.7,6.6-20.8,13.2-29.7c1.2-1.7,2.6-3.3,4-4.8c4.8-4.9,9.1-5,14-0.1c6,6,10.8,12.8,14.8,20.2c1.4,2.5,2.6,2.9,5.4,2.4\n				c6-1.1,10.9-3.5,15.7-7.5c9.1-7.7,19.4-13.3,31.3-15.5c1.1-0.2,2.2-0.3,3.3-0.4c7.5-0.3,11.5,6,8.1,12.7c-0.8,1.7-2,3.2-2.9,4.8\n				c-0.9,1.7-1,3,1.7,3.2c3,0.2,6,0.6,8.8,1.4c2.6,0.7,3.7-0.2,5-2.2c4.5-6.9,9.4-13.6,15.8-19c6-4.9,9.9-4.7,15,1.1\n				c8.3,9.5,13.1,20.9,16,33c7.8,33.6,14.1,67.5,17.9,101.8c0.4,3.4,2.1,5.7,4.1,8c5.9,7,11.5,14.2,15.9,22.3\n				c8.7,16,12.8,33,10.4,51.2c-0.6,4.5-1.9,8.8-4.8,12.5c-2.9,3.8-7,4.6-11.1,2.2c-0.6-0.3-1.1-1.5-1.9-0.7c-3.5,3.4-7,2-10.9,0.1\n				c-1.7,12.3-3.8,24.5-8.2,36c-0.7,1.5-1.5,2.9-2.2,4.4c-3.8,8.3-9.8,12.5-19.5,12.2c-14.3-0.5-28.7-0.8-42.9,0.1\n				c-13.3,0.9-22.7-3.3-27.6-16.1c-1.5-5-1.5-5-7.1-5c-4.8,0-5,0.1-5.8,5c-1.2,2.6-2.5,5.1-3.7,7.7c-2.7,5.8-7.1,8.4-13.6,8.3\n				c-16.9-0.3-33.9-0.4-50.8-0.1c-8.9,0.2-14.5-3.7-18.3-11.3C161.5,393.8,161.1,391.5,159.3,389.9z M316.8,397.9\n				c-0.7-1.5-1.4-3.1-2.1-4.6c1.3-1.3,3.1-0.6,3.2,1.8c0.2,3.8,3.7,4.8,5.6,5.1c3.7,0.7,7.8,0.9,11.7-0.2c0.3-0.3,0.6-0.5,1-0.8\n				c1.9,0.1,3-0.6,3.5-2.5c1.5-0.2,2.4-1.4,3.2-2.6c2.9-4.3,4.9-9.2,6.2-14.2c2.5-9.5,4-19.2,5.2-29c0.5-4,1.9-8.3-1.3-12\n				c-0.5-2.2-2.6-3.9-1.5-6.5c0.1-0.3-0.1-0.9-0.4-1.1c-0.5-0.4-1-0.2-1.5,0.2c-1.6,1.3-2,3-1.9,5c0.1,1.8,0.9,2.9,2.7,3.1\n				c-0.2,2,0.3,4.1-0.7,6c-1.5,0.2-2.9,0.4-4.4,0.6c0.8-9.1,0.6-18.2-0.2-27.3c-0.8-9.6-2-19.2-1.4-28.9c1.7,0.1,1.5,2.2,1.7,2.6\n				c0.5,1.2,0.7,2.1,2,2.8c3.4,1.9,4.7,4.8,3.8,8.4c-0.3,1.1-0.8,1.3-1.8,0.7c-0.7-0.5-1.1-1.9-2.3-0.9c-0.9,0.8-0.8,2.2-0.5,3.2\n				c1,3,0.3,6.1,0.6,9.2c0.1,1.6-0.8,3.8,0.8,4.4c2,0.7,2.2-2.1,3.4-3.1c0.9-0.7,0.9-2.9,2.4-2.6c1.2,0.2,1.6,1.9,2.1,3.2\n				c1.6,3.8,2.2,7.9,3.8,11.8c2.1,5.4,5.1,9.6,6.7,16c0.6,2.2,1.7,2.2,3.1,0.5c1.8-2,3.8-2.9,6.4-1c0.5,0.4,1.6,0.3,2.3,0.4\n				c0.2,0.9-0.4,1.7,0.7,2.5c1.1,0.2,1.4-1,1.7-1.7c0.7-1.7,1.5-3.4,2-5.2c2.4-9.3,1.1-18.5-1.1-27.6c-4.3-18.1-14.9-32.5-27.4-45.8\n				c-0.5-0.6-1.2-1-2-1c-0.4-1.1-0.9-2.2-1.3-3.3c1.2-0.6,1.9-1.3,1.6-2.8c-0.3-1.7-0.3-3.5-0.5-5.2c-2.6-22-6.2-43.9-10.4-65.7\n				c-1.2-6-1.6-12.2-3.9-17.9c0.1-2.7,0.3-5.4-1.9-7.5c-1.4-13.4-7.6-24.8-15.4-35.5c-1.2-1.6-2.6-1.2-4,0\n				c-6.1,5.2-10.9,11.3-15,18.1c-1.9,3.2-2.4,5.9,2.1,7.4c0.3,0.1,0.3,0.8,0.5,1.2c-8.2-2.2-16.4-4-24.8-5.3\n				c-4.6-0.7-6.5-3.1-7.2-7.7c-0.6-4,1.4-7.2,3.1-10.5c0.5-0.4,1.2-0.8,1-1.5c-0.2-0.8-1.1-0.6-1.7-0.5c-1.2,0.1-2.4,0.3-3.6,0.6\n				c-11.7,3.2-21.7,9.3-30.6,17.4c-1.5,1.3-2.8,2.7-4.9,3.1c-7.4,1.4-14.7,3.5-21.9,5.9c3.2-2,1.9-4.1,0.7-6.8\n				c-2.8-6.2-7.7-10.9-11-16.8c-0.3-0.6-1.1-0.7-1.7-0.7c-0.4-0.4-0.8-0.8-1.1-1.2c-3.1-4.5-3.6-4.6-6.9-0.2\n				c-4.5,6.1-8,12.7-10.4,19.8c-1.6,4.7-3.3,9.5-3.9,14.5c-0.1,2.7-2.2,5.3-0.7,8.2c-1.8,1.4-1.7,3.5-2.1,5.4\n				c-3.3,18.3-6.6,36.6-9.7,54.9c-1.7,9.8-3.3,19.5-4.1,29.4c-0.5,1.4,3.3,4.2-1.4,4.2c-1-0.8-1.3,0.3-1.8,0.8\n				c-15,15.7-26.5,33.2-29.1,55.3c-0.8,6.5-1,13.2,1.1,19.6c0.7,2,1.2,4.4,4.3,4.7c1.1-0.1,1.7-0.6,2.5-1.3c3.8-3.1,3.6-3.9,7-0.6\n				c1.6,1.6,2.9,2.2,4.4,0.8c2.8-2.7,4.3-6,5.4-9.6c0.5-1.7,1-4.1,3-4.4c2.2-0.3,4.2,1.6,5.4,3.2c1.1,1.4-0.6,2.8-0.7,4.2\n				c-3.2-0.6-3.1,2-3,3.8c0.3,10.1,1.5,20.1,3.8,29.9c1.7,7.4,3.7,14.7,8,21.1c1.2,1.7,3,2.7,5.2,2.6c1.3,2.6,3.8,0.6,5.5,1.5\n				c1.9,0.8,3.5,0.2,4.6-1.5c0.1,0.7-0.2,1.9,0.9,1.9c4.7-0.3,8.9,0.9,13.2-0.7c0.1-0.5,0-1.1-0.8-1.6c-0.5-1.2-1-2.5-1.5-3.7\n				c-0.2-0.3-0.3-0.6-0.5-0.9c-0.1-0.2,0-1-0.2-1.2c2.1-0.2,4.6,0.6,4.7,2.7c0.1,2.6,1.5,3.6,3.1,4.8c4.5,1.2,9,0.9,13.7-0.1\n				c0.2-0.7,1.2-1,2.3-0.1c1.2,0.9,2,0.1,2.7-0.5c0.1,1.2,0.8,1.4,1.8,1.4c2.5,0,4.9,0,7.4,0.1c2.4,0.1,3.3-1,3.5-3.2\n				c0.1-1.1-0.1-2.2-0.1-3.3c0.9-0.1,2,0.1,2.4-0.8c1.8-4.5,6.6-8.7,4.8-14.3c8.2,0,16.3,0.3,24.5-0.6c-2.4,1.7-1.7,4.5-0.7,6.6\n				c0.7,1.6,0.9,3,1.7,4.6c3.1,6.4,6.4,11.3,14.6,10.7c3.1,0,6.3,0.1,9.4,0.1c4.8,0,4.5,0.3,3-4.3c1.6-1,3.4-1,4.1,0.9\n				c0.5,1.5,1.4,2.4,2.7,3c0.1,0.2,0.3,0.1,0.3,0.3c4.2,0.1,7.6,0.1,12.5,0.3c0.3-0.3,0.3-0.2,0.6-0.5\n				C317.5,398.6,317.4,398.2,316.8,397.9z" data-v-2f2be962></path><path id="body_inner" class="st2" d="M213.5,156.9c7.2-2.4,14.5-4.4,21.9-5.9c2.1-0.4,3.5-1.8,4.9-3.1c8.9-8.1,18.9-14.2,30.6-17.4\n				c1.2-0.3,2.4-0.5,3.6-0.6c0.6-0.1,1.4-0.3,1.7,0.5c0.2,0.7-0.5,1.1-1,1.5c-3,0.7-4.7,3.1-6.2,5.5c-3.9,5.7-1.3,12.2,5.4,13.7\n				c4.9,1.1,10.1,0.9,14.9,2.5c10.3,3.4,17.7,10.4,23.2,19.5c7,11.6,9.9,24.6,12.2,37.7c2.3,13.3,4.2,26.6,5.5,40\n				c1,9.8,1.8,19.7,2.3,29.5c0.5,9.3,0.3,18.7,0.1,28.1c-0.2,7.9-1.4,15.7-3.8,23.3c-2.2,6.8-6.3,11.8-12.9,15.1\n				c-18.2,9-37.7,13.2-57.7,14.6c-19.9,1.3-39.5-0.6-58.2-8.4c-14.9-6.2-25.7-15.9-29-32.4c-0.2-1.1,0.1-2.8-1.5-3.4\n				c0-1.7-0.1-3.3,0-5c0.7-13.7,0.9-27.3-0.9-40.9c-0.5-3.8-2.5-7.5-6.4-8.7c0.8-9.9,2.5-19.1,4.1-28.8c3.1-18.3,7-36.4,10.3-54.7\n				c0.3-1.9,0.1-4.2,1.9-5.6c6.3-3.6,12.7-7.4,19.4-10.1C203.1,161.2,208.3,159.1,213.5,156.9z M252.9,240.8L252.9,240.8" data-v-2f2be962></path><linearGradient id="SVGID_1_12461712617" gradientUnits="userSpaceOnUse" x1="292.4896" y1="352.0626" x2="192.9565" y2="148.3609" data-v-2f2be962><stop id="monster_g_0" offset="0" style="stop-color:#FFB719;" data-v-2f2be962></stop><stop id="monster_g_1" offset="0.4058" style="stop-color:#FF5178;" data-v-2f2be962></stop><stop id="monster_g_2" offset="0.846" style="stop-color:#D153D1;" data-v-2f2be962></stop><stop id="monster_g_3" offset="0.9982" style="stop-color:#7188FF;" data-v-2f2be962></stop></linearGradient><path id="body_inner_colored" style="fill:url(#SVGID_1_12461712617);fill-opacity:1;" d="M213.5,156.9c7.2-2.4,14.5-4.4,21.9-5.9c2.1-0.4,3.5-1.8,4.9-3.1c8.9-8.1,18.9-14.2,30.6-17.4\n				c1.2-0.3,2.4-0.5,3.6-0.6c0.6-0.1,1.4-0.3,1.7,0.5c0.2,0.7-0.5,1.1-1,1.5c-3,0.7-4.7,3.1-6.2,5.5c-3.9,5.7-1.3,12.2,5.4,13.7\n				c4.9,1.1,10.1,0.9,14.9,2.5c10.3,3.4,17.7,10.4,23.2,19.5c7,11.6,9.9,24.6,12.2,37.7c2.3,13.3,4.2,26.6,5.5,40\n				c1,9.8,1.8,19.7,2.3,29.5c0.5,9.3,0.3,18.7,0.1,28.1c-0.2,7.9-1.4,15.7-3.8,23.3c-2.2,6.8-6.3,11.8-12.9,15.1\n				c-18.2,9-37.7,13.2-57.7,14.6c-19.9,1.3-39.5-0.6-58.2-8.4c-14.9-6.2-25.7-15.9-29-32.4c-0.2-1.1,0.1-2.8-1.5-3.4\n				c0-1.7-0.1-3.3,0-5c0.7-13.7,0.9-27.3-0.9-40.9c-0.5-3.8-2.5-7.5-6.4-8.7c0.8-9.9,2.5-19.1,4.1-28.8c3.1-18.3,7-36.4,10.3-54.7\n				c0.3-1.9,0.1-4.2,1.9-5.6c6.3-3.6,12.7-7.4,19.4-10.1C203.1,161.2,208.3,159.1,213.5,156.9z M252.9,240.8L252.9,240.8" data-v-2f2be962></path><path class="st3" d="M169.5,317.1c1.6,0.6,1.3,2.3,1.5,3.4c3.3,16.6,14.1,26.2,29,32.4c18.7,7.8,38.3,9.7,58.2,8.4\n				c20-1.3,39.5-5.6,57.7-14.6c6.6-3.2,10.7-8.2,12.9-15.1c2.4-7.6,3.6-15.4,3.8-23.3c0.3-9.4,0.4-18.8-0.1-28.1\n				c-0.5-9.8-1.3-19.7-2.3-29.5c-1.4-13.4-3.2-26.8-5.5-40c-2.3-13.1-5.2-26.1-12.2-37.7c-5.5-9.1-13-16.1-23.2-19.5\n				c-4.8-1.6-10-1.4-14.9-2.5c-6.7-1.5-9.3-8-5.4-13.7c1.6-2.3,3.2-4.7,6.2-5.5c-1.7,3.3-3.7,6.5-3.1,10.5c0.7,4.6,2.6,7,7.2,7.7\n				c8.4,1.3,16.6,3.1,24.8,5.3c12,3.8,23.5,8.7,33.7,16.3c2.3,5.8,2.8,11.9,3.9,17.9c4.2,21.8,7.8,43.7,10.4,65.7\n				c0.2,1.7,0.2,3.5,0.5,5.2c0.3,1.5-0.3,2.5-1.5,3.1c-3.3,0.9-5,3-5.5,6.2c-1,6.6-2.1,13.3-1.8,20c-0.6,9.7,0.6,19.3,1.4,28.9\n				c0.7,9.1,1,18.2,0.2,27.3c0.1,6-3.3,9.1-8.5,11.4c-7.5,3.4-15.1,6.7-23,9.1c-15,4.5-30.2,7.9-45.5,11.4\n				c-8.1,0.9-16.3,0.7-24.5,0.6c-17-2.1-33.5-6.4-50.1-10.2c-8.7-2-17-5.3-24.3-10.7c-1.2-0.9-1.9-1.7-1.9-3.2\n				C167.5,342.1,167.8,329.6,169.5,317.1z" data-v-2f2be962></path><path class="st4" d="M169.5,317.3c-1.7,12.5-1.8,24.6-1.8,37.5c0.2,1.3,1.4,2.2,2.6,3.1c7.3,5.4,14.8,8.1,23.6,10.3\n				c16.6,3.8,33.1,7.8,50.1,10.2c1.7,5.6-2.6,9.8-4.4,14.2c-0.4,0.9-1.6,1.2-2.5,1.1c-0.2-0.5-0.4-1.3-0.6-1.8\n				c-1.9-4-3.7-4.7-7.2-1.3c-2.3,2.3-3.7,5.2-5,8c-0.8,0.7-1.5,1.6-2.7,0.7c-0.7-0.6-1.6-0.8-2.4,0c-0.5-2.6-1.4-5-2.9-7.3\n				c-2.7-4.1-4.5-4.1-7.2-0.1c-1.5,2.3-2.7,4.7-3.5,7.3c-1.6-1.2-3.3-2-3.4-4.6c-0.1-2.1-2-2.8-4.1-2.6c-0.4-0.4-0.7-0.8-1.1-1.2\n				c-2.8-3.3-4.5-3.3-7.1,0.3c-1.5,2.1-2.2,4.5-3.2,6.8c-1.1,1.8-2.6,2.5-4.6,1.5c-1.7-0.9-4.2,1.2-5.5-1.5c1.5-1,1.3-2.3,0.8-3.8\n				c-0.9-3.3-2.4-6.4-4.2-9.3c-3.9-6.5-6.3-13.5-7.4-20.9c-1.2-7.8-2.2-15.6-3.2-23.4c0.1-1.4,1.4-2.7,0.3-4.1\n				c-1.2-1.5-2.5-3.4-4.7-3.2c-2,0.2-2.3,2.2-2.9,4c-1.1,3.6-2.6,6.9-5.4,9.6c-1.5,1.4-2.5,1.7-4.1,0.1c-3.4-3.3-3.4-3.2-7.3-0.1\n				c-0.9,0.7-1.8,1.2-2.9,1.4c-1-9-2.3-17.3-0.6-26.9c2.6-18.3,10.3-34.2,23-47.6c1.7-1.8,3-3.8,3.3-6.3c3.2-0.3,0.4-3.4,0.9-4.8\n				c3.9,1.2,5.9,4.7,6.4,8.5c1.8,13.6,1.6,27.3,0.9,40.9C169.4,314,169.5,315.7,169.5,317.3z" data-v-2f2be962></path><path class="st5" d="M268.4,377.8c15.2-3.5,30.2-7,45.2-11.5c7.9-2.4,15.3-5.4,22.8-8.8c5.2-2.4,9-5.3,8.8-11.3\n				c1.5-0.2,2.9-0.4,4.4-0.6c0.4,8.7-0.6,17.3-2.6,25.8c-1.7,7.3-5.5,13.6-8.6,20.3c-1,2.1-1,3.8,1.2,5c-0.4,2.1-1.8,2.7-3.7,2.6\n				c-0.6-3.4-1.9-6.5-4.1-9.2c-1.7-2-3.4-2.2-5.2-0.1c-1.8,2.1-3.1,4.5-4,7.1c-0.7,2-0.3,3.1,2.1,3c3.4-0.1,6.8,0,10.2,0.1\n				c-3.9,1.1-8,0.9-11.7,0.2c-1.9-0.4-5.5-1.3-5.6-5.1c-0.1-2.4-1.9-3.1-3.2-1.8c-0.6-0.8-1.2-1.6-1.8-2.3c-2.3-2.8-3.8-2.8-6,0.1\n				c-1.8,2.4-2.9,5.2-3.5,8.1c-1.3-0.6-2.4-1.4-3-2.8c-0.7-1.9-2-2.1-3.6-1.2c-1.4-1.9-2.7-3.9-4.6-5.5s-3.6-1.5-5,0.6\n				c-1.9,2.9-3.3,5.9-3,9.5c-8.2,0.6-11.5-4.6-14.6-11c-0.8-1.6-1.3-3.3-2-4.9C266.7,381.8,266,379.5,268.4,377.8z" data-v-2f2be962></path><path class="st5" d="M343.8,290c-0.3-6.7,0.6-13.4,1.6-20c0.5-3.2,2.4-5.6,5.7-6.5c0.4,1.1,0.9,2.2,1.3,3.3\n				c0.3,3.6,3,5.7,5.2,8.1c8.4,9,14.1,19.5,17.9,31.1c4.2,12.9,5.3,26.2,2.7,39.6c-0.8-0.1-1.8,0-2.3-0.4c-2.6-1.9-4.5-0.9-6.3,1.1\n				c-1.5,1.7-2.6,1.6-3.2-0.6c-1.6-5.6-4.5-10.6-6.7-16c-1.6-3.9-2.1-8-3.8-11.9c-0.5-1.2-0.9-2.8-2.1-3.1c-1.4-0.3-1.3,1.8-2.2,2.5\n				c-1.3,1-1.5,3.9-3.5,3.2c-1.8-0.6-0.8-2.9-0.9-4.5c-0.3-3,0.4-6.1-0.6-9.2c-0.3-1-0.4-2.3,0.5-3.1c1.1-1,1.7,0.3,2.5,0.8\n				c0.9,0.6,1.3,0.4,1.6-0.7c0.8-3.5-0.3-6.2-3.6-8.1c-1.3-0.8-1.7-1.6-2.2-2.8C345,292.1,345.5,290.2,343.8,290z" data-v-2f2be962></path><path class="st4" d="M213.5,156.9c-5.3,2.2-10.6,4.5-15.9,6.6c-6.9,2.7-13,6.5-19.3,10.1c-1.4-2.9,0.7-5.4,0.7-8.2\n				c2.9,0.7,2.7-1.8,3-3.3c1.8-7.8,5-15,9.5-21.6c3.8-5.7,5.8-5.7,10.1-0.4c0.7,0.9,0.9,2.7,2.9,2c-1-3.2-2.1-6.4-3.1-9.6\n				c0.7,0,1.4,0.1,1.7,0.7c3.2,5.9,8.3,10.6,11.1,16.8C215.4,152.8,216.8,154.9,213.5,156.9z" data-v-2f2be962></path><path class="st4" d="M337.9,171.8c-10.2-7.6-22.1-12.7-34.1-16.6c-0.2-0.4-0.1-0.7-0.4-0.8c-4.4-1.4-4.1-4.1-2.1-7.4\n				c1.8,0.9,3.5,0.4,4.9-1.2c1.9-2.3,4-4.4,6.1-6.5c5.2-5.1,8.5-4.6,12.1,1.7c0.2,0.3,0.3,0.6,0.5,0.9c3.5,5.7,5.7,12.1,7.8,18.4\n				c0.6,1.8,1,3.7,3.4,4C338.2,166.4,338,169.1,337.9,171.8z" data-v-2f2be962></path><path class="st6" d="M378.2,345.6c2.6-13.4,1.3-26.5-2.8-39.4c-3.7-11.6-9.3-22.2-17.7-31.2c-2.2-2.4-5.3-4.6-5.6-8.2\n				c0.8-0.1,1.8,0.5,2.4,1.1c12.4,13.3,23.1,27.6,27.4,45.8c2.2,9.1,3.4,18.3,1.1,27.6c-0.5,1.8-1.3,3.5-2,5.2\n				c-0.3,0.8-0.6,1.9-1.7,1.7C377.8,347.9,378.2,346.6,378.2,345.6z" data-v-2f2be962></path><path class="st7" d="M161.3,267.5c-0.3,2.5-1.6,4.5-3.3,6.3c-12.7,13.4-20.4,29.3-23,47.6c-1.3,8.9-0.5,18,0.6,26.9\n				c-3-0.3-3.6-2.4-4.3-4.4c-2.2-6.4-2-13.5-1.2-20c2.6-22.1,13.5-40.4,29.2-56C159.7,267.3,160.3,266.7,161.3,267.5z" data-v-2f2be962></path><path class="st7" d="M162.5,340.5c1.1,7.8,2,15.6,3.2,23.4c1.2,7.4,3.5,14.5,7.4,20.9c1.8,2.9,3.4,5.9,4.4,9.2\n				c0.5,1.5,0.4,2.9-1,3.9c-2.2,0.1-4-0.9-5.2-2.6c-4.3-6.4-6.3-13.7-8-21.1c-2.3-9.9-3.7-20.1-4-30.2\n				C159.2,342.2,159.4,339.9,162.5,340.5z" data-v-2f2be962></path><path class="st8" d="M339.7,396.7c-2.3-1.2-2.2-2.8-1.2-5c3.1-6.7,6.9-13,8.6-20.3c2-8.5,3-17,2.6-25.8c1-1.9,0.5-4,0.7-6\n				c0.8-0.5,1.6-0.8,2.6-0.7c3.3,3.9,2,7.9,1.5,12c-1.2,9.8-2.9,19.5-5.4,29c-1.3,5-3.1,9.8-6,14.1\n				C342.2,395.3,341.4,396.5,339.7,396.7z" data-v-2f2be962></path><path class="st9" d="M336,164.3c-2.4-0.3-2.8-2.2-3.4-4c-2.1-6.4-4.3-12.7-7.8-18.4c-0.2-0.3-0.3-0.6-0.5-0.9\n				c-3.6-6.3-6.7-6.7-12-1.6c-2.1,2.1-4.2,4.1-6.1,6.4c-1.3,1.6-3,2.2-4.9,1.2c4-6.8,9-13.1,15.1-18.2c1.4-1.2,2.9-1.6,4.1,0\n				C328.4,139.5,334.5,150.9,336,164.3z" data-v-2f2be962></path><path class="st9" d="M201.4,132.6c1,3.2,2,6.4,3.1,9.6c-2,0.6-2.2-1.1-2.9-2c-4.2-5.3-6.2-5.3-10.1,0.4\n				c-4.4,6.6-7.7,13.8-9.5,21.6c-0.3,1.4-0.1,3.9-3,3.3c0.6-5,2.3-9.8,3.9-14.5c2.4-7.1,6-13.7,10.5-19.8c3.3-4.4,3.8-4.3,7,0.2\n				C200.6,131.8,201,132.2,201.4,132.6z" data-v-2f2be962></path><path class="st10" d="M186.6,397.9c1-2.3,1.7-4.7,3.2-6.8c2.6-3.6,4.3-3.7,7.1-0.3c0.5,0.3,0.7,0.8,1.1,1.2\n				c0.1,0.2,0.2,0.4,0.4,0.6c0.2,0.3,0.3,0.6,0.5,0.9c0.5,1.2,1,2.5,1.5,3.7c0.5,1.4,0.4,1.5,0.3,1.9c-4.3,1.6-8.8,0.5-13.2,0.7\n				C186.3,399.8,186.7,398.6,186.6,397.9z" data-v-2f2be962></path><path class="st10" d="M224.2,398.5c1.4-2.9,2.7-5.8,5-8c3.5-3.4,5.4-3.1,7.3,1.3c0.2,0.5,0.4,1,0.6,1.5c0,1.1,0.2,2.2,0.1,3.3\n				c-0.1,2.1-1,3.5-3.5,3.4s-5,0-7.5,0C225.3,399.9,224.3,399.9,224.2,398.5z" data-v-2f2be962></path><path class="st10" d="M335,400.2c-3.4,0-6.8-0.2-10.2-0.1c-2.5,0.1-2.8-0.9-2.1-3c0.9-2.6,2.2-5,4-7.1s3.5-1.9,5.2,0.1\n				c2.2,2.7,3.7,5.9,4.3,9.3C335.7,399.8,335.3,400,335,400.2z" data-v-2f2be962></path><path class="st10" d="M284,399.9c-0.3-3.6,1.1-6.6,3-9.5c1.4-2.1,3.1-2.2,5-0.6s3.2,3.6,4.6,5.5c1.6,4.6,1.6,4.6-3.3,4.6\n				C290.1,399.9,287,399.9,284,399.9z" data-v-2f2be962></path><path class="st10" d="M303.2,399.4c0.6-2.9,1.6-5.6,3.3-8c2.1-2.9,4-3.2,6.4-0.4c0.6,0.8,1.2,1.6,1.8,2.3\n				c0.7,1.5,1.4,3.1,2.1,4.6c0.1,0.4,0.2,0.8,0.2,1.2c-0.3,0.3-0.5,0.7-1,0.9c-4.2-0.1-8.3-0.2-12.5-0.3\n				C303.6,399.6,303.3,399.6,303.2,399.4z" data-v-2f2be962></path><path class="st10" d="M205.5,399.2c0.8-2.6,2-5.1,3.5-7.3c2.7-4,4.5-4,7.2,0.1c1.5,2.2,2.5,4.5,3,7.1\n				C214.7,400.1,210,400.4,205.5,399.2z" data-v-2f2be962></path><path class="st5" d="M353,338.9c-1-0.1-1.8,0.2-2.6,0.7c-1.8-0.2-2.6-1.3-2.7-3.1c-0.1-2,0.3-3.7,1.9-5c0.5-0.4,1-0.6,1.5-0.2\n				c0.3,0.2,0.5,0.8,0.4,1.1C350.4,334.9,352.5,336.7,353,338.9z" data-v-2f2be962></path><path class="st5" d="M303.6,399.8" data-v-2f2be962></path><path class="st5" d="M317,399.1c-0.1-0.4-0.2-0.8-0.2-1.2C317.4,398.2,317.5,398.6,317,399.1z" data-v-2f2be962></path><path class="st4" d="M198.9,393.5c-0.2-0.3-0.3-0.6-0.5-0.9C198.5,392.9,198.7,393.2,198.9,393.5z" data-v-2f2be962></path></g></g></g><g id="body_mask" data-v-2f2be962><path class="st2" d="M213.5,156.9c7.2-2.4,14.5-4.4,21.9-5.9c2.1-0.4,3.5-1.8,4.9-3.1c8.9-8.1,18.9-14.2,30.6-17.4\n		c1.2-0.3,2.4-0.5,3.6-0.6c0.6-0.1,1.4-0.3,1.7,0.5c0.2,0.7-0.5,1.1-1,1.5c-3,0.7-4.7,3.1-6.2,5.5c-3.9,5.7-1.3,12.2,5.4,13.7\n		c4.9,1.1,10.1,0.9,14.9,2.5c10.3,3.4,17.7,10.4,23.2,19.5c7,11.6,9.9,24.6,12.2,37.7c2.3,13.3,4.2,26.6,5.5,40\n		c1,9.8,1.8,19.7,2.3,29.5c0.5,9.3,0.3,18.7,0.1,28.1c-0.2,7.9-1.4,15.7-3.8,23.3c-2.2,6.8-6.3,11.8-12.9,15.1\n		c-18.2,9-37.7,13.2-57.7,14.6c-19.9,1.3-39.5-0.6-58.2-8.4c-14.9-6.2-25.7-15.9-29-32.4c-0.2-1.1,0.1-2.8-1.5-3.4\n		c0-1.7-0.1-3.3,0-5c0.7-13.7,0.9-27.3-0.9-40.9c-0.5-3.8-2.5-7.5-6.4-8.7c0.8-9.9,2.5-19.1,4.1-28.8c3.1-18.3,7-36.4,10.3-54.7\n		c0.3-1.9,0.1-4.2,1.9-5.6c6.3-3.6,12.7-7.4,19.4-10.1C203.1,161.2,208.3,159.1,213.5,156.9z M252.9,240.8L252.9,240.8" data-v-2f2be962></path><path class="st12" d="M169.5,317.1c1.6,0.6,1.3,2.3,1.5,3.4c3.3,16.6,14.1,26.2,29,32.4c18.7,7.8,38.3,9.7,58.2,8.4\n		c20-1.3,39.5-5.6,57.7-14.6c6.6-3.2,10.7-8.2,12.9-15.1c2.4-7.6,3.6-15.4,3.8-23.3c0.3-9.4,0.4-18.8-0.1-28.1\n		c-0.5-9.8-1.3-19.7-2.3-29.5c-1.4-13.4-3.2-26.8-5.5-40c-2.3-13.1-5.2-26.1-12.2-37.7c-5.5-9.1-13-16.1-23.2-19.5\n		c-4.8-1.6-10-1.4-14.9-2.5c-6.7-1.5-9.3-8-5.4-13.7c1.6-2.3,3.2-4.7,6.2-5.5c-1.7,3.3-3.7,6.5-3.1,10.5c0.7,4.6,2.6,7,7.2,7.7\n		c8.4,1.3,16.6,3.1,24.8,5.3c12,3.8,23.5,8.7,33.7,16.3c2.3,5.8,2.8,11.9,3.9,17.9c4.2,21.8,7.8,43.7,10.4,65.7\n		c0.2,1.7,0.2,3.5,0.5,5.2c0.3,1.5-0.3,2.5-1.5,3.1c-3.3,0.9-5,3-5.5,6.2c-1,6.6-2.1,13.3-1.8,20c-0.6,9.7,0.6,19.3,1.4,28.9\n		c0.7,9.1,1,18.2,0.2,27.3c0.1,6-3.3,9.1-8.5,11.4c-7.5,3.4-15.1,6.7-23,9.1c-15,4.5-30.2,7.9-45.5,11.4c-8.1,0.9-16.3,0.7-24.5,0.6\n		c-17-2.1-33.5-6.4-50.1-10.2c-8.7-2-17-5.3-24.3-10.7c-1.2-0.9-1.9-1.7-1.9-3.2C167.5,342.1,167.8,329.6,169.5,317.1z" data-v-2f2be962></path></g><g id="eyes_mouth" data-v-2f2be962><g id="mouth" data-v-2f2be962><path class="st13" d="M252.9,240.8c9.4,0,18.7,0,28.1,0c1.7,0,3.9-0.2,4,2.3c0.1,2.7-2,2.8-4,2.6c-2.1-0.1-3.6,0-4.7,2.4\n			c-1.9,4.1-5,7.4-10,7.5c-5.4,0.1-8.4-3.3-10.9-7.4c-2.2-3.6-3.4-3.7-5.7-0.3c-1,1.5-2,2.9-3.2,4.2c-5.1,5.7-12.5,5-16.2-1.6\n			c-1.6-2.9-2.7-6-7-5.1c-1.3,0.3-2.5-0.7-2.4-2.5c0.1-2,1.4-2.2,3-2.2C233.5,240.8,243.2,240.8,252.9,240.8L252.9,240.8z\n			 M246.4,245.6c-4.4,0-7.9,0-11.4,0c-0.8,0-2.2-0.6-1.7,1.4c1.1,4.4,5.8,6,9.2,3C243.8,248.9,244.8,247.5,246.4,245.6z\n			 M272.7,245.6c-4.2,0-7.7,0.1-11.2,0c-2,0-2,0.7-1,2.1c1.4,2,3.1,3.9,5.8,3.8C269.5,251.2,270.9,248.6,272.7,245.6z" data-v-2f2be962></path><path class="st11" d="M246.4,245.6c-1.6,1.9-2.7,3.3-3.9,4.4c-3.4,3-8,1.4-9.2-3c-0.5-1.9,0.9-1.3,1.7-1.4\n			C238.5,245.6,242,245.6,246.4,245.6z" data-v-2f2be962></path><path class="st11" d="M272.7,245.6c-1.8,3-3.2,5.6-6.5,5.8c-2.7,0.2-4.4-1.7-5.8-3.8c-1-1.4-1-2.1,1-2.1\n			C265,245.6,268.5,245.6,272.7,245.6z" data-v-2f2be962></path></g><g id="eye_right" data-v-2f2be962><g id="eye_right_wrap" data-v-2f2be962><path id="eye_right_outer" class="st14" d="M285,234.3c-12.3,0.1-22.2-6-25.8-15.8c-5.9-16.3,5.3-32.9,22.9-34.2c4.3-0.3,8.6,0.1,12.7,1.4\n            c11.8,3.7,19.2,14.8,17.7,26.5c-1.5,12.1-11.5,21.2-23.9,22.1C287.4,234.4,286.2,234.3,285,234.3z M304.9,197.3\n            c-0.4-0.6-0.7-1.4-1.2-1.9c-8.5-9-25.2-10-34.7-2c-7.7,6.4-10.7,19-3.3,28c0.3,0.5,0.5,1,0.8,1.4c7.9,10.6,27,9.6,34.8,3\n            C309.6,218.4,311.5,205.2,304.9,197.3z" data-v-2f2be962></path><path id="eye_right_white" class="st15" d="M265.6,221.3c-7.4-9-4.4-21.6,3.3-28c9.5-7.9,26.2-6.9,34.7,2c0.5,0.5,0.8,1.3,1.2,1.9c0,4,0.2,7.9-0.1,11.9\n			            c-0.4,6-2.2,11.5-7.6,14.9c-9.1,5.8-18.1,4.3-27-0.7C268.8,222.5,267.6,220.9,265.6,221.3z" data-v-2f2be962></path><path id="eye_right_grey" class="st0" d="M265.6,221.3c2-0.5,3.2,1.2,4.7,2c8.9,5.1,17.8,6.5,27,0.7c5.4-3.4,7.2-8.9,7.6-14.9\n            c0.3-3.9,0.1-7.9,0.1-11.9c6.6,7.9,4.7,21.2-3.8,28.4c-7.7,6.6-26.9,7.7-34.8-3C266.1,222.3,265.9,221.8,265.6,221.3z" data-v-2f2be962></path></g><path id="eye_right_black" class="st4" d="M283.6,207.9c0-2.5-0.2-5.1,0.1-7.6c0.4-3.6,3.5-6.3,6.6-6.3c3.2,0,5.8,2.6,6.2,6.5c0.5,4.7,0.5,9.4,0,14.1\n			c-0.5,4.1-3.4,7.1-6.6,7c-3.5-0.1-6.1-3.1-6.4-7.5C283.4,212.1,283.5,210,283.6,207.9C283.5,207.9,283.5,207.9,283.6,207.9z" data-v-2f2be962></path></g><g id="eye_left" data-v-2f2be962><g id="eye_left_wrap" data-v-2f2be962><path id="eye_left_outer" class="st14" d="M226.5,234.5c-17.1,0-28.6-10.9-28-26.1c0.4-10.3,5.6-17.8,15.1-21.8\n            c9.2-3.9,18.6-3.4,27.5,1.2c9.2,4.8,14.1,14.5,12.7,24.5c-1.5,10.7-9.5,19.3-20.1,21.6C231,234.4,228.4,234.6,226.5,234.5z\n             M205.4,220c0.2,0.5,0.4,1,0.8,1.4c7.3,10.2,23.9,12.7,34.6,5.2c9.1-6.4,12.1-18.6,6.5-27.3c-1.2-3.1-3.5-5.3-6.2-7\n            c-6.9-4.5-14.6-5.5-22.5-3.6C203.3,192.3,198,209.6,205.4,220z" data-v-2f2be962></path><path id="eye_left_white" class="st15" d="M205.4,220c-7.4-10.3-2.2-27.7,13.2-31.3c7.9-1.8,15.5-0.8,22.5,3.6\n			c2.7,1.7,5.1,3.9,6.2,7c-1.6,2.2-0.5,4.7-0.7,7c-0.5,6.2-1.9,11.8-7.1,16.1c-8.6,7.1-19.3,6.2-28.2,0.9\n			C209.4,222.2,207.9,220.2,205.4,220z" data-v-2f2be962></path><path id="eye_left_grey" class="st3" d="M205.4,220c2.5,0.3,4,2.2,5.9,3.4c8.9,5.3,19.6,6.2,28.2-0.9\n            c5.1-4.2,6.6-9.9,7.1-16.1c0.2-2.3-0.9-4.8,0.7-7c5.5,8.6,2.6,20.9-6.5,27.3c-10.8,7.5-27.3,5-34.6-5.2\n            C205.9,221,205.7,220.5,205.4,220z" data-v-2f2be962></path></g><path id="eye_left_black" class="st4" d="M238.1,208.1c0,2.2,0.1,4.4,0,6.6c-0.2,3.7-3.1,6.7-6.4,6.9\n			c-3,0.1-5.9-2.3-6.4-5.9c-0.8-5-0.6-10.1,0-15.1c0.4-3.8,3.4-6.4,6.5-6.3c3.1,0.1,5.9,2.9,6.3,6.6\n			C238.2,203.3,238,205.7,238.1,208.1C238,208.1,238,208.1,238.1,208.1z" data-v-2f2be962></path></g></g><g id="ear_mask_left" data-v-2f2be962><path id="ear_mask_l" class="st4 ear" d="M178.9,165.1c0.1,0.6,0.6,0.8,1.1,0.6c5.2-1.6,35.9-11.4,34.3-14.8\n		c-1.7-3.8-12.2-22-16.8-22.9C192.1,126.9,177.9,158.5,178.9,165.1z" data-v-2f2be962></path></g><g id="ear_mask_right" data-v-2f2be962><path id="ear_mask_r" class="st4 ear" d="M300.2,149.3c0.1,0.6,2.4,1.5,3,1.7c5.8,1.9,33.8,16.6,33.9,14.7c0.5-9-10.7-38.7-17.9-39.1\n		C313.7,126.2,299.3,142.7,300.2,149.3z" data-v-2f2be962></path></g></g><g id="coin" data-v-2f2be962><ellipse class="st16" cx="443.4" cy="423" rx="27.9" ry="9.2" data-v-2f2be962></ellipse><ellipse class="st17" cx="447.2" cy="409" rx="27.9" ry="9.2" data-v-2f2be962></ellipse><path class="st17" d="M421.4,421.2c-20.4,0-37,7.7-37,17.3c0,2.6,1.3,5.1,3.5,7.3c1.8-1.6,4.2-2.6,6.8-2.6\n		c5.7,0,10.3,4.6,10.3,10.3c0,0.2,0,0.3,0,0.5c0.4,0.1,0.9,0.2,1.3,0.3c1.8-3.2,5.1-5.3,9-5.3c4.4,0,8.2,2.8,9.6,6.7\n		c18.7-0.8,33.3-8.2,33.3-17.2C458.4,428.9,441.8,421.2,421.4,421.2z" data-v-2f2be962></path><g id="Layer_2_1_" data-v-2f2be962><g id="Layer_1-2" data-v-2f2be962><path class="st12" d="M417.7,436.7c-0.1,0.5,0.7,1,1.8,1c0,0,0.1,0,0.1,0c1,0,1.9-0.4,1.9-1c0-0.5-0.8-1-1.9-1\n				C418.6,435.7,417.8,436.2,417.7,436.7z" data-v-2f2be962></path><path class="st12" d="M410.8,436.4c-0.3,0-0.6,0.1-0.6,0.3c0,0.2,0.2,0.3,0.6,0.3c0.3,0,0.6-0.1,0.6-0.3\n				C411.4,436.6,411.1,436.4,410.8,436.4L410.8,436.4z" data-v-2f2be962></path><path class="st12" d="M417.6,431c0.3-0.1,0.4-0.3,0.3-0.4s-0.5-0.2-0.8-0.1c-0.3,0.1-0.4,0.3-0.3,0.4\n				C417,431,417.3,431.1,417.6,431C417.6,431,417.6,431,417.6,431z" data-v-2f2be962></path><path class="st12" d="M419.5,432.7c0.5-0.1,0.6-0.4,0.4-0.7s-0.8-0.3-1.3-0.2c-0.5,0.1-0.6,0.4-0.4,0.7S419.1,432.8,419.5,432.7z\n				" data-v-2f2be962></path><path class="st12" d="M413.1,433.9c0.4,0.1,0.8,0.1,1.1-0.1c0.2-0.2,0.1-0.4-0.2-0.6c-0.4-0.1-0.8-0.1-1.1,0.1l0,0\n				C412.7,433.5,412.8,433.8,413.1,433.9z" data-v-2f2be962></path><path class="st12" d="M414.3,436.2c-0.5,0-1,0.2-1,0.5c0,0.3,0.4,0.5,0.9,0.5s1-0.2,1-0.5l0,0\n				C415.2,436.5,414.8,436.3,414.3,436.2z" data-v-2f2be962></path><path class="st12" d="M413.2,439.5c-0.4,0.1-0.5,0.3-0.3,0.5c0.2,0.2,0.7,0.3,1,0.2c0.4-0.1,0.5-0.3,0.3-0.5l0,0\n				C414.1,439.5,413.6,439.4,413.2,439.5L413.2,439.5z" data-v-2f2be962></path><path class="st12" d="M416.9,435.2c0.5,0.2,1.2,0.1,1.5-0.2c0.3-0.3,0.2-0.6-0.3-0.8c-0.5-0.2-1.2-0.1-1.5,0.2\n				C416.2,434.7,416.4,435.1,416.9,435.2L416.9,435.2z" data-v-2f2be962></path><path class="st12" d="M428.4,432.7c0.4,0.1,1,0.1,1.3-0.1c0.3-0.2,0.2-0.5-0.3-0.7c-0.4-0.1-1-0.1-1.3,0.1l0,0\n				C427.8,432.2,427.9,432.5,428.4,432.7L428.4,432.7z" data-v-2f2be962></path><path class="st12" d="M430.3,431c0.3,0.1,0.7,0.1,0.8-0.1c0.2-0.1,0.1-0.3-0.2-0.4c-0.3-0.1-0.7-0.1-0.8,0.1\n				C429.9,430.7,430,430.9,430.3,431L430.3,431z" data-v-2f2be962></path><path class="st12" d="M428.5,435.7c-1,0-1.9,0.4-2,0.9c-0.1,0.5,0.7,1,1.8,1c0,0,0.1,0,0.1,0c1,0,1.9-0.4,1.9-1\n				C430.3,436.2,429.5,435.8,428.5,435.7L428.5,435.7z" data-v-2f2be962></path><path class="st12" d="M420.1,435.2c0.3,0.3,1,0.5,1.7,0.5c1,0,1.9-0.4,1.9-1c0-0.2-0.1-0.3-0.2-0.4c-0.5-0.5-1.6-0.7-2.5-0.4\n				C420,434.1,419.7,434.7,420.1,435.2L420.1,435.2z" data-v-2f2be962></path><path class="st12" d="M434.8,433.9c0.4-0.1,0.5-0.3,0.3-0.5c-0.2-0.2-0.7-0.3-1-0.2c-0.4,0.1-0.5,0.3-0.3,0.5\n				C433.9,433.9,434.4,434,434.8,433.9L434.8,433.9z" data-v-2f2be962></path><path class="st12" d="M430,434.2c-0.5,0.1-0.8,0.5-0.5,0.8c0.3,0.3,0.9,0.4,1.5,0.3s0.8-0.5,0.5-0.8S430.6,434.1,430,434.2z" data-v-2f2be962></path><path class="st12" d="M423.9,430.8c0.4,0,0.8-0.2,0.8-0.4s-0.3-0.4-0.7-0.4c-0.4,0-0.8,0.2-0.8,0.4\n				C423.2,430.6,423.5,430.8,423.9,430.8L423.9,430.8z" data-v-2f2be962></path><path class="st12" d="M423.9,433.3c0.6,0,1.1-0.2,1.2-0.5c0-0.3-0.4-0.6-1-0.6c-0.6,0-1.1,0.2-1.2,0.5S423.3,433.3,423.9,433.3\n				L423.9,433.3z" data-v-2f2be962></path><path class="st12" d="M418,439.2c0.5-0.1,0.8-0.5,0.5-0.8c-0.3-0.3-0.9-0.4-1.5-0.3s-0.8,0.5-0.5,0.8\n				C416.8,439.3,417.4,439.4,418,439.2z" data-v-2f2be962></path><path class="st12" d="M424.6,434.2c-0.6,0.5-0.3,1.1,0.5,1.4c0.9,0.3,2,0.2,2.6-0.3c0.6-0.5,0.3-1.1-0.5-1.4\n				c-0.3-0.1-0.7-0.2-1-0.2C425.6,433.7,425,433.9,424.6,434.2z" data-v-2f2be962></path><path class="st12" d="M427.9,438.3c-0.5-0.5-1.6-0.7-2.5-0.4c-0.9,0.2-1.3,0.8-0.8,1.3c0.5,0.5,1.6,0.7,2.5,0.4l0,0\n				C428,439.4,428.3,438.8,427.9,438.3C427.9,438.3,427.9,438.3,427.9,438.3z" data-v-2f2be962></path><path class="st12" d="M431.1,438.2c-0.5-0.2-1.2-0.1-1.5,0.2c-0.3,0.3-0.2,0.6,0.3,0.8c0.5,0.2,1.2,0.1,1.5-0.2\n				C431.8,438.7,431.7,438.4,431.1,438.2L431.1,438.2z" data-v-2f2be962></path><path class="st12" d="M434.7,436.7c0-0.3-0.4-0.5-0.9-0.5c-0.5,0-1,0.2-1,0.5c0,0.3,0.4,0.5,0.9,0.5l0,0\n				C434.3,437.2,434.7,437,434.7,436.7z" data-v-2f2be962></path><path class="st12" d="M437.3,436.4c-0.3,0-0.6,0.1-0.6,0.3s0.2,0.3,0.6,0.3c0.3,0,0.6-0.1,0.6-0.3\n				C437.9,436.6,437.6,436.4,437.3,436.4z" data-v-2f2be962></path><path class="st12" d="M434.9,439.5c-0.4-0.1-0.8-0.1-1.1,0.1c-0.2,0.2-0.1,0.4,0.2,0.6c0.4,0.1,0.8,0.1,1.1-0.1\n				C435.3,439.9,435.2,439.7,434.9,439.5L434.9,439.5z" data-v-2f2be962></path><path class="st12" d="M417.7,442.5c-0.3-0.1-0.7-0.1-0.8,0.1c-0.2,0.1-0.1,0.3,0.2,0.4c0.3,0.1,0.7,0.1,0.8-0.1l0,0\n				C418.1,442.8,418,442.6,417.7,442.5z" data-v-2f2be962></path><path class="st12" d="M430.4,442.5c-0.3,0.1-0.4,0.3-0.3,0.4c0.1,0.2,0.5,0.2,0.8,0.1c0.3-0.1,0.4-0.3,0.3-0.4\n				C431.1,442.4,430.7,442.4,430.4,442.5C430.4,442.5,430.4,442.5,430.4,442.5z" data-v-2f2be962></path><path class="st12" d="M423.4,439.3c0.6-0.5,0.3-1.1-0.5-1.4c-0.9-0.3-2-0.2-2.6,0.3s-0.3,1.1,0.5,1.4c0.3,0.1,0.7,0.2,1,0.2\n				C422.4,439.7,423,439.5,423.4,439.3z" data-v-2f2be962></path><path class="st12" d="M419.6,440.8c-0.4-0.1-1-0.1-1.3,0.1s-0.2,0.5,0.3,0.7c0.4,0.1,1,0.1,1.3-0.1l0,0\n				C420.2,441.2,420.1,440.9,419.6,440.8z" data-v-2f2be962></path><path class="st12" d="M424,442.6c-0.4,0-0.8,0.2-0.8,0.4c0,0.2,0.3,0.4,0.7,0.4c0.4,0,0.8-0.2,0.8-0.4\n				C424.7,442.8,424.4,442.7,424,442.6L424,442.6z" data-v-2f2be962></path><path class="st12" d="M424,440.1c-0.6,0-1.1,0.2-1.2,0.5c0,0.3,0.4,0.6,1,0.6c0.6,0,1.1-0.2,1.2-0.5\n				C425.1,440.4,424.6,440.1,424,440.1L424,440.1z" data-v-2f2be962></path><path class="st12" d="M428.5,440.7c-0.5,0.1-0.6,0.4-0.4,0.7c0.2,0.2,0.8,0.3,1.3,0.2c0.5-0.1,0.6-0.4,0.4-0.7\n				C429.5,440.7,429,440.6,428.5,440.7L428.5,440.7z" data-v-2f2be962></path></g></g><ellipse class="st16" cx="438.9" cy="399.1" rx="27.9" ry="9.2" data-v-2f2be962></ellipse><ellipse class="st17" cx="444.4" cy="387.5" rx="27.9" ry="9.2" data-v-2f2be962></ellipse></g>', 3)
      ])]);
    };
  }
});

const FxEternlMonster = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-2f2be962"]]);

const _sfc_main$2 = {  };

const _hoisted_1$2 = {
  id: "Ebene_1",
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.1",
  viewBox: "0 0 512 256"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<g id=\"swap\" data-v-d1d37116><path class=\"st3\" d=\"M209.3768,194.3234l-1.3229.0684c-3.3523,9.3199-5.2069,21.5988-18.2766,18.7691-4.6003-.996-8.7429-4.3027-11.2717-8.1683-3.318-5.0721-12.4454-30.9573-13.3022-37.0641-1.2213-8.7044,5.8928-16.2097,14.6794-13.6707,7.7862,2.25,8.9153,17.1877,11.7852,23.6684.5996-.4794.7407-1.1608.9978-1.8288,2.389-6.2096,3.6813-21.872,9.9018-24.7366,12.5681-5.7876,15.0483,14.3598,19.9024,21.2398,4.1268-8.0394.9952-21.3474,13.2189-22.6292,9.4301-.9889,12.7932,6.0627,12.3652,14.4096-.3028,5.9048-5.9974,32.5649-8.5473,37.358-3.2412,6.0926-10.6316,11.1278-17.6814,8.7457-5.7795-1.9529-9.5246-11.1528-12.4486-16.1612h0Z\" data-v-d1d37116></path><path class=\"st3\" d=\"M282.8683,150.6765c2.508-.1382,6.4404.0595,8.9164.4491,4.9213.7745,6.0005,1.8736,11.8041,2.169,8.7229.4439,16.911,2.1775,17.144,12.8254.2674,12.2209-2.4782,25.7448-2.4807,38.1113-1.0577,6.5853-6.8239,10.3357-13.3119,9.9447-3.2276-.1945-7.6934-2.4952-10.3641-2.6339-1.415-.0735-5.0247,1.4636-7.0073,1.74-39.0503,5.4448-43.3084-60.4782-4.7004-62.6056h-.0001ZM287.1494,172.9266c-5.367.7477-5.8393,8.4208-5.4438,12.6651.4833,5.1856,8.7143,7.2357,11.4265,1.8138,2.6266-5.2507,1.7782-15.5602-5.9828-14.479h0Z\" data-v-d1d37116></path><path class=\"st3\" d=\"M345.6212,156.4854c5.4893-.2586,10.5533,2.6388,15.4174,3.6126,2.303.4611,7.2738-.9658,11.3968-.1529,33.3251,6.57,29.9553,63.2382-6.8319,62.1104-3.8728-.1187-6.9837-1.7128-10.6667-1.7873-.8387.4765-.8549,5.0538-1.194,6.5041-3.232,13.8203-26.0284,10.7929-25.8268-4.2748l7.9652-57.6686c1.1201-4.7264,4.8122-8.1113,9.74-8.3435h0ZM362.8649,181.6062c-1.3083.1245-2.9244,1.0039-3.3526,2.3164-.4825,1.4789-1.3635,10.1829-1.218,11.7559.1762,1.9045,2.8405,3.5687,4.637,3.5637,7.1604-.0199,8.9654-18.4951-.0664-17.636h0Z\" data-v-d1d37116></path><path class=\"st3\" d=\"M147.8793,161.5306c4.4725,3.0964,5.4614,10.2595,1.8444,14.2986-4.4847,5.0081-7.8115.4202-12.566,1.5543-1.9216.4583-4.4968,2.147-2.1199,3.8331,14.0128,2.9257,32.0644,7.8691,29.5717,26.1846-2.5074,18.4236-33.5839,23.8194-45.6253,12.4088-6.4075-6.0719-3.1136-15.681,5.9668-16.3844,3.5063-.2716,12.15,3.7772,14.3113.6493,2.0025-2.8981-2.9408-4.2177-4.8248-4.9031-5.2302-1.9026-15.573-3.2887-19.3079-7.0715-8.1823-8.2871-1.7754-21.856,6.4779-27.4513,6.1966-4.201,19.6339-7.7136,26.2716-3.1183h0Z\" data-v-d1d37116></path></g><g id=\"monster\" data-v-d1d37116><path class=\"st2\" d=\"M222.2274,96.0291c-.6418,1.1192-1.1663,2.2576-1.3121,3.574-.8098,7.3107,1.7415,26.2536-1.2111,31.5613-4.9816,8.9549-20.8323,5.6149-21.7939-5.6529-.6793-7.96-1.0018-35.523.8584-42.3078,2.0267-7.3921,8.4409-11.6967,16.0643-10.8363,2.0191.2279,4.6248,1.7014,6.3343,1.631,2.0399-.084,5.535-2.3225,8.2501-2.6967,9.9984-1.378,18.8161,3.018,21.9551,12.8226,2.6711,8.3431,3.9078,31.1587,3.5079,40.2408-.644,14.6258-21.6151,14.2862-23.0261,1.7026-.5349-4.7703.2347-10.5971.0254-15.5505-.1507-3.5668-.8824-7.5281-.8549-11.2202-1.7404-3.4056-5.189-5.238-8.7973-3.268h-.0001Z\" data-v-d1d37116></path><path class=\"st2\" d=\"M286.1766,114.7916c2.7266-2.7399-2.6741-4.898-4.6966-6.1495-10.0245-6.2029-23.9048-9.7575-19.3312-25.3082,4.2512-14.4547,21.6951-18.1584,34.6838-14.1945,6.9769,2.1292,11.207,6.5582,9.6422,14.2445-.7321,3.5957-5.0838,6.6568-8.7356,6.1449-3.1584-.4427-9.4043-6.1658-11.8491-.8377.0105,2.1199,10.3424,6.6528,12.6214,8.0945,8.4603,5.3522,14.2711,11.5155,13.2633,22.3759-1.9855,21.3951-37.7367,23.2045-48.8543,8.6152-6.3146-8.2864.3669-20.039,10.7458-16.4921,2.8239.9651,9.4518,6.6623,12.0993,4.0018l.411-.4948Z\" data-v-d1d37116></path><path class=\"st2\" d=\"M190.9853,110.3503c0,18.0164-14.6052,32.6216-32.6216,32.6216s-32.6216-14.6052-32.6216-32.6216,14.6052-32.6216,32.6216-32.6216,32.6216,14.6052,32.6216,32.6216ZM156.9406,102.3229c-7.5504,1.7117-6.4867,17.3003,2.7099,15.9583,8.026-1.1712,7.1385-18.1909-2.7099-15.9583Z\" data-v-d1d37116></path><path class=\"st2\" d=\"M350.3072,72.8766c9.8279.2427,12.5636,14.9016,4.8862,20.1263-2.4789,1.687-4.8177.4886-6.5129,2.6872l-1.8304,29.7948c-.6363,2.1307-.4008,4.3751-.9606,6.5144-3.0735,11.7446-24.2516,9.6743-24.9183-3.0808-.3182-6.088,1.3543-14.8606,1.7291-21.2584.2772-4.732.3257-9.5508.5018-14.2905l-.8752-.8494c-14.3736-1.0331-12.2037-23.3141,2.1011-21.9447.0215-20.046,29.0041-17.7312,25.8791,2.3011h.0002Z\" data-v-d1d37116></path><path class=\"st2\" d=\"M442.6488,91.0816c2.1315-.3199,4.279-.1724,6.3634.3794,4.2256,1.1187,5.2248,4.8782,10.0412,4.3543,6.2695-.682,9.9469-3.2473,16.1195,1.5085,12.4607,9.6005,2.6905,33.4705-11.8872,27.7996-2.6995-1.0501-8.0812-9.2358-10.0082-3.0575-2.3034,7.3855-3.4751,27.8399-8.231,32.4955-7.04,6.8912-22.8036,1.6202-22.2903-9.0477,4.0018-13.6728,4.496-31.6628,9.4844-44.7263,1.6219-4.2474,5.6837-8.9965,10.4082-9.7057h0Z\" data-v-d1d37116></path><path class=\"st2\" d=\"M388.7162,82.2506c10.3555-.8276,21.26,2.6844,27.3771,11.3787,4.0313,5.7299,5.9841,13.9986,1.9704,20.2687-4.7902,7.4832-27.424,11.2656-28.0457,13.3899-1.6604,5.6731,11.9026,1.0323,13.5363.852,8.3489-.9215,14.8346,4.4496,12.6064,13.1799-2.7408,10.7387-24.3913,10.335-32.6281,7.8704-35.6113-10.6558-34.1535-63.7769,3.9523-66.8221l1.2313-.1175ZM390.9916,101.1818c-2.22.314-9.6561,4.034-7.6638,6.8022,1.1153,1.5496,10.9021-1.7092,12.1412-2.8773,2.731-2.5743-1.6812-4.3204-4.4775-3.925h0Z\" data-v-d1d37116></path><path class=\"st2\" d=\"M94.9586,144.3128c-3.791-3.547-3.1553-16.7035-4.2629-22.1163-.2098-1.0252-.6831-1.906-1.5376-2.5337-.9423.0475-2.7156,14.4134-11.2686,13.1179-4.3916-.6652-6.0163-5.9071-9.4738-8.0085-.3817,8.5354,5.7115,18.9481,3.0261,27.0724-3.5641,10.7828-24.757,17.3189-29.4844,3.8345-1.9663-17.9288-8.9863-37.4288-10.5419-55.1347-.7503-8.5405,3.1628-15.7645,11.3883-18.7881,16.2759-5.9829,20.4028,8.2006,31.4011,16.1137,8.3271-11.472,8.6181-29.9125,27.1447-28.228,8.7356.7943,12.5533,8.4133,13.9457,16.1096,1.3267,7.3327,1.8374,15.4296,2.9389,22.8678,1.2764,8.6193,3.5427,18.3192,4.2866,26.8513.8897,10.2037-5.1875,13.0022-12.1498,14.0951-4.4921.7051-10.6837-.6928-14.7908-4.5358l-.6216-.7173Z\" data-v-d1d37116></path></g><g id=\"eternl\" data-v-d1d37116><path class=\"st0\" d=\"M267.3351,21.6873c1.039-4.3419,8.9143-5.1549,10.2038-.202l-.7422,27.763c-1.6603,3.9347-5.9433,6.1681-9.8222,3.7062-2.8291-1.7955-5.0302-10.8681-8.1006-13.3431l-.2558,11.2096c-.185,1.3603-2.136,2.2349-3.0833,2.6579-3.2917,1.3456-6.3616-.9937-6.9754-4.2944-.8172-4.3948-.2733-19.0751.2657-23.9171.484-4.3483,3.0218-7.8926,7.8038-6.8652,5.2215,1.1219,6.5585,11.7388,10.4372,15.0693.5746-3.3947-.5884-8.1058.1589-11.2283l.1102-.5561Z\" data-v-d1d37116></path><path class=\"st0\" d=\"M133.6138,41.7425l.6548,1.712c.1345.3517.5365.4983.8773.3381,4.6769-2.1972,11.9921-1.6871,10.7246,5.1544-.9856,5.3198-11.2835,1.8653-9.1596,7.0142.0778.1885.2538.3388.4532.3812,3.3567.7132,5.7491-2.2948,9.1288-1.2416,4.0978,1.2769,4.8105,7.5622,1.067,9.2969-2.0148.9336-12.6289,3.1598-14.8148,3.0732-2.1973-.0871-4.0897-1.6598-4.8722-3.6996-1.7827-4.6469-4.6801-18.921-5.3221-24.1357-.3341-2.714.8326-5.8296,3.5621-6.8935,1.9997-.7794,11.9039-2.9332,13.8105-2.7784,2.9642.2406,4.3131,3.3919,4.1118,6.0787-.0407.5438-1.7636,2.7475-1.9424,2.7864l-4.5013,1.1438-3.3541.9305c-.3611.1002-.5576.4895-.4237.8395Z\" data-v-d1d37116></path><path class=\"st0\" d=\"M192.1598,33.1381l.156,1.3123c.0505.4245.4393.7284.8625.6678,4.5255-.6477,9.7519-1.8272,10.2199,4.2989.464,6.0732-5.5911,4.6731-9.8276,5.5052l.4141,3.4282,8.8491-1.061c2.3115-.2772,5.2821,7.7843,1.0314,9.6016-1.372.5866-13.4941,1.9883-15.1763,1.8172-2.1785-.2216-3.919-2.2136-4.4103-4.2583-1.2348-5.1388-3.0249-19.8866-3.0181-25.1481.0041-3.1472,1.7573-5.3651,4.7767-6.0742,2.2753-.5344,12.1178-1.7396,13.909-1.2166,4.4648,1.3036,3.3677,9.0054.4,9.3613l-6.4901.7782-1.015.1217c-.4271.0512-.732.4387-.6812.8659Z\" data-v-d1d37116></path><path class=\"st0\" d=\"M295.7787,43.0693l9.589.9475c.5447.0538,2.5217,2.2396,2.8105,2.9499,1.3921,3.4234-.9164,7.3532-4.5761,7.7206-2.2111.2219-10.7821-.6193-12.9-1.2718-4.351-1.3408-6.4277-5.7259-6.3871-10.0111.0716-7.5407,1.6385-13.1963,2.335-20.7882,2.1149-3.2161,5.6597-4.8588,8.9085-1.9905.4341.3832,1.7677,2.4414,1.7338,2.7848l-1.9385,19.6171.425.0418Z\" data-v-d1d37116></path><path class=\"st0\" d=\"M168.8516,34.8096c-.6606.8807,3.3252,18.3578,3.0624,21.8053-.4334,5.6855-9.3245,6.5851-10.9095-.1014-.3881-1.6372.1316-3.0055-.0801-4.5404-.7213-5.2282-1.6081-10.4449-2.3087-15.6697-7.2341,3.6454-11.6848-7.0577-5.0739-9.101,2.2413-.6927,16.6652-2.8069,18.5241-2.4823,2.5724.4492,3.7409,3.7599,3.3082,6.0761-.6747,3.6124-3.4053,3.6906-6.5225,4.0133h0Z\" data-v-d1d37116></path><path class=\"st0\" d=\"M225.9343,44.6598c-4.0021-.0897-.969,4.6423-2.0531,7.6955-1.6252,4.577-8.001,4.57-9.814.2426l-1.6556-27.1329c.7044-6.6979,9.7098-6.4916,14.9115-6.2189,9.4783.4968,15.4422,9.6084,11.8441,18.4286-.6002,1.4712-2.4239,2.9209-2.3466,4.4193.1443,2.7993,7.0967,8.6297.7049,12.209-6.1155,3.4246-9.379-5.3035-11.3986-9.5079l-.1926-.1353ZM223.7716,36.1246c2.9617-.0281,5.7342.2305,6.1769-3.4815-.6641-3.3182-3.6566-3.1444-6.4105-2.8885-.3324.0309-.5813.3183-.5652.6517l.2511,5.2054c.014.2908.2566.5156.5478.5128Z\" data-v-d1d37116></path></g>", 3)
  ]))]))
}
const FxEternlMonsterText = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render],['__scopeId',"data-v-d1d37116"]]);

const _hoisted_1$1 = ["src", "alt"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AggIcon",
  props: {
    agg: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const { swapConfig } = useMonsterSwapData();
    const aggIcon = computed(() => {
      if (!swapConfig.value?.aggregators) return "";
      return swapConfig.value?.aggregators.find((_agg) => _agg.label === props.agg)?.icon;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        src: aggIcon.value,
        alt: __props.agg + " icon"
      }, null, 8, _hoisted_1$1);
    };
  }
});

const _hoisted_1 = { class: "relative w-full h-26 rounded-t-card" };
const _hoisted_2 = { class: "relative h-26 flex flex-row et-jb pa-card bg-black/60 rounded-t-card" };
const _hoisted_3 = { class: "text-txt-muted w-1/3 et-text-xs" };
const _hoisted_4 = { class: "absolute right-[23%] top-8.75 size-2 pointer-events-none" };
const _hoisted_5 = { class: "absolute left-1/2 top-12 size-2 pointer-events-none" };
const _hoisted_6 = { class: "w-full flex flex-col gap-2 pa-card et-bg-0 rounded-card" };
const _hoisted_7 = { class: "flex flex-row et-jb et-gap-sm et-text-sm" };
const _hoisted_8 = { class: "ml-2" };
const _hoisted_9 = { class: "flex flex-row flex-wrap et-je gap-x-1 mr-2" };
const _hoisted_10 = { class: "relative w-full flex flex-col et-gap-sm pa-card et-bg-0 rounded-card pb-3.5" };
const _hoisted_11 = { class: "flex flex-row et-jb et-text-sm" };
const _hoisted_12 = { class: "ml-2" };
const _hoisted_13 = { class: "flex flex-row flex-wrap et-je gap-x-1 mr-2" };
const _hoisted_14 = { key: 0 };
const _hoisted_15 = {
  key: 1,
  class: "text-txt-decreased cursor-not-allowed text-txt-green"
};
const _hoisted_16 = {
  key: 0,
  class: "w-full h-full flex flex-row et-jb-ic min-h-7 -mb-2 sm:-mb-1.5"
};
const _hoisted_17 = {
  key: 0,
  class: "mr-2 flex flex-row et-jc-ic et-gap-sm min-h-7"
};
const _hoisted_18 = { class: "et-text-xs text-txt-muted" };
const _hoisted_19 = { class: "w-7 aspect-square bg-white flex flex-row flex-wrap et-jc-ic rounded-full overflow-hidden" };
const _hoisted_20 = { class: "absolute left-1/2 -top-3 sm:-top-2 -translate-1/2 overflow-hidden rounded-full" };
const _hoisted_21 = {
  key: 0,
  class: "w-full flex flex-col et-gap-sm et-jb et-ie p-5 py-3 et-bg-2 rounded-card"
};
const _hoisted_22 = { class: "w-full flex flex-wrap et-gap-md" };
const _hoisted_23 = { class: "flex flex-col et-js-is et-text-sm" };
const _hoisted_24 = { class: "flex flex-col et-je-is et-text-sm" };
const _hoisted_25 = { class: "w-full text-right text-txt-muted" };
const _hoisted_26 = { class: "w-full text-right" };
const _hoisted_27 = { class: "w-full text-right" };
const _hoisted_28 = { class: "grow flex flex-col et-jc-ie" };
const _hoisted_29 = {
  key: 0,
  class: "w-full flex flex-col et-gap-xs border-t border-txt-muted pt-2"
};
const _hoisted_30 = { class: "grow flex flex-row et-jb-ic et-gap-sm" };
const _hoisted_31 = { class: "et-text-sm text-txt-muted flex et-jb-ic et-gap-sm" };
const _hoisted_32 = { class: "pi pi-question-circle text-txt-muted" };
const _hoisted_33 = { class: "et-text-sm text-txt-muted" };
const _hoisted_34 = { class: "grow flex flex-row et-jb-ic et-gap-sm" };
const _hoisted_35 = { class: "et-text-sm text-txt-muted flex et-jb-ic et-gap-sm" };
const _hoisted_36 = { class: "pi pi-question-circle text-txt-muted" };
const _hoisted_37 = { class: "et-text-sm text-txt-muted" };
const _hoisted_38 = { class: "grow flex flex-row et-jb-ic et-gap-sm" };
const _hoisted_39 = { class: "et-text-sm text-txt-muted flex et-jb-ic et-gap-sm" };
const _hoisted_40 = { class: "pi pi-question-circle text-txt-muted" };
const _hoisted_41 = { class: "et-text-sm text-txt-muted" };
const _hoisted_42 = {
  key: 4,
  class: "absolute inset-0 bg-black/20 backdrop-blur-modal rounded-2xl p-4 flex flex-col et-jc-ic et-gap-md"
};
const _hoisted_43 = { class: "et-text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SwapElement",
  emits: ["reset"],
  setup(__props) {
    const $t = useTranslation().t;
    const { formatSmallNumber } = useFormatter();
    const {
      overwriteOutputToken
    } = useModalMonsterSwapTokenlist();
    const {
      swapConfig,
      tokenList,
      inputToken,
      outputToken,
      inputAmount,
      outputAmount,
      inputTokenBalance,
      outputTokenBalance,
      switchInputAndOutput,
      isWaitingForEstimate,
      isWaitingForBuild,
      swapEstimate,
      lastUpdated,
      tryUpdateEstimate,
      resetSwapInput,
      buildSwap
    } = useMonsterSwapData();
    const {
      getTokenADAValue
    } = useSlippageMonitor();
    const {
      openModalSwapSettings
    } = useModalSwapSettings();
    const getMonsterWaiting = () => {
      if (tokenList.value && tokenList.value.length === 0) {
        init();
      }
      onPauseHover();
      dispatchSignal(doMonsterWaiting);
    };
    const {
      fetchTokenList,
      fetchSwapConfig
    } = useMonsterSwapAPI();
    const swapElement = ref();
    const detailsVisible = ref(false);
    const pauseHover = ref(false);
    const isHovered = ref(false);
    const swapAllowed = ref(true);
    const feeTotal = computed(() => {
      return subtract(swapEstimate.value?.fee_total ?? "0", swapEstimate.value?.fee_aggregator ?? "0");
    });
    let refreshInterval = -1;
    const estimatePrice = computed(() => {
      return swapEstimate.value?.price ?? 0;
    });
    const reverseEstimatePrice = computed(() => {
      const price = estimatePrice.value;
      if (price === 0) {
        return 0;
      }
      return 1 / price;
    });
    const formattedEstimatePrice = computed(() => {
      return estimatePrice.value === 0 ? "-" : formatSmallNumber(estimatePrice.value);
    });
    const formattedReverseEstimatePrice = computed(() => {
      return reverseEstimatePrice.value === 0 ? "-" : formatSmallNumber(reverseEstimatePrice.value);
    });
    const hasNothingToSpend = computed(() => {
      return !isGreaterThanZero(inputTokenBalance.value);
    });
    const actualInputTokenBalance = computed(() => {
      return !isGreaterThanZero(inputTokenBalance.value) ? "0" : inputTokenBalance.value;
    });
    const isOverspending = computed(() => {
      const _inputAmountRaw = multiply(inputAmount.value ?? 0, Math.pow(10, inputToken.value?.decimals ?? 0));
      return isGreaterThanZero(inputTokenBalance.value) && compare(inputTokenBalance.value ?? 0, "<", _inputAmountRaw);
    });
    const handleUpdateAmount = (type, value) => {
      const targetToken = inputToken ;
      {
        const _inputAmount = parseFloat(value ?? "0") / Math.pow(10, targetToken.value?.decimals ?? 0);
        inputAmount.value = _inputAmount > 0 ? _inputAmount : 0;
        tryUpdateEstimate();
      }
    };
    const doResetSwapInput = () => {
      onPauseHover();
      dispatchSignal(doMonsterAngry);
      resetSwapInput();
    };
    const doBuildSwap = () => {
      onPauseHover();
      if (isOverspending.value) {
        dispatchSignal(doMonsterAngry);
        return;
      }
      dispatchSignal(doMonsterHappy);
      buildSwap();
    };
    const onHoverActivated = () => {
      isHovered.value = true;
    };
    const onHoverDeactivated = () => {
      if (pauseHover.value) {
        return;
      }
      isHovered.value = false;
    };
    const onPauseHover = () => {
      pauseHover.value = true;
    };
    const onResumeHover = () => {
      pauseHover.value = false;
    };
    watch(isHovered, () => {
      if (isHovered.value) {
        dispatchSignal(doMonsterAwake);
      } else {
        dispatchSignal(doMonsterSleep);
      }
    });
    const init = async () => {
      const server = backendServer.serverV2;
      if (!isBackendServerSet.value || !server) {
        return;
      }
      try {
        if (!swapConfig.value) {
          swapConfig.value = await fetchSwapConfig(networkId.value);
        }
        if (!tokenList.value || tokenList.value.length === 0) {
          tokenList.value = await fetchTokenList(networkId.value);
        }
        clearInterval(refreshInterval);
        refreshInterval = setInterval(triggerNewEstimate, 7e3);
      } catch (err) {
        console.error(err);
      }
    };
    watch(isBackendServerSet, () => {
      swapAllowed.value = isSwapAllowed(backendServer.geo?.features);
      init();
    });
    onMounted(async () => {
      await init();
      const tokenToSelect = window.history.state.swapInfo;
      let _token;
      for (const token of tokenList.value) {
        if (token.policyId === tokenToSelect?.p && token.hexName === tokenToSelect?.h) {
          _token = token;
          break;
        }
      }
      if (_token) {
        overwriteOutputToken(_token);
      }
      delete window.history.state.swapInfo;
    });
    const triggerNewEstimate = async () => {
      if (inputAmount.value && inputToken.value !== void 0 || outputToken.value !== void 0) {
        tryUpdateEstimate();
      }
    };
    const inputValueInADA = computed(() => {
      if (!inputAmount.value || !inputToken.value) {
        return null;
      }
      if (inputToken.value.policyId === "lovelace" && inputToken.value.hexName === "") {
        return inputAmount.value + "";
      }
      const tokenValue = getTokenADAValue(inputToken.value.policyId + inputToken.value.hexName);
      if (tokenValue === null || inputAmount.value === 0) {
        return null;
      }
      return multiply(inputAmount.value, tokenValue);
    });
    const outputValueInADA = computed(() => {
      if (!outputAmount.value || !outputToken.value) {
        return null;
      }
      if (outputToken.value.policyId === "lovelace" && outputToken.value.hexName === "") {
        return outputAmount.value + "";
      }
      const tokenValue = getTokenADAValue(outputToken.value.policyId + outputToken.value.hexName);
      if (tokenValue === null || outputAmount.value === 0) {
        return null;
      }
      return multiply(outputAmount.value, tokenValue);
    });
    const swapSlippage = computed(() => {
      if (inputValueInADA.value === null) {
        return null;
      }
      if (outputValueInADA.value === null) {
        return null;
      }
      if (isZero(inputValueInADA.value) && isZero(outputValueInADA.value)) {
        return "0";
      }
      const absDiff = abs(subtract(inputValueInADA.value, outputValueInADA.value));
      const avgVal = divide(add(inputValueInADA.value, outputValueInADA.value), 2);
      return multiply(divide(absDiff, avgVal), 100);
    });
    onBeforeUnmount(() => clearInterval(refreshInterval));
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_Card, {
        ref_key: "swapElement",
        ref: swapElement,
        class: "break-inside-avoid",
        pt: {
          header: "",
          body: "p-0     flex                et-gap-md",
          content: "px-card pt-card flex flex-col       et-gap-md relative",
          footer: "px-card pb-card flex flex-row et-jb et-gap-md"
        },
        onMouseenter: onHoverActivated,
        onMouseleave: onHoverDeactivated
      }, createSlots({
        header: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "absolute left-0 top-0 w-full h-26 rounded-t-card overflow-hidden" }, [
              createBaseVNode("img", {
                class: "w-full h-full origin-center object-cover",
                src: _imports_0$1
              })
            ], -1)),
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, toDisplayString(unref($t)("swap-swapElement:caption")), 1),
              createBaseVNode("div", null, [
                createVNode(_component_Button, {
                  class: "p-0",
                  rounded: "",
                  link: "",
                  onClick: unref(openModalSwapSettings)
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$s, { class: "size-7" })
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ]),
            createBaseVNode("div", _hoisted_4, [
              createVNode(FxEternlMonster, { class: "absolute -translate-1/2 max-sm:top-2 size-42 sm:size-48" })
            ]),
            createBaseVNode("div", _hoisted_5, [
              createVNode(FxEternlMonsterText, { class: "absolute -translate-1/2 max-sm:top-2 size-40 sm:size-40" })
            ])
          ])
        ]),
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, toDisplayString(unref($t)("swap-swapElement:sell")), 1),
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("div", null, toDisplayString(unref($t)("swap-swapElement:balance")) + ":", 1),
                createBaseVNode("div", {
                  class: normalizeClass(hasNothingToSpend.value ? "text-txt-decreased cursor-not-allowed" : "text-txt-green cursor-pointer"),
                  onClick: _cache[0] || (_cache[0] = withModifiers(($event) => handleUpdateAmount("in", actualInputTokenBalance.value), ["stop", "prevent"]))
                }, [
                  createVNode(_sfc_main$o, {
                    amount: actualInputTokenBalance.value,
                    decimals: unref(inputToken)?.decimals,
                    currency: unref(inputToken)?.policyId === "lovelace" ? "ADA" : "",
                    "clipboard-enabled": false
                  }, null, 8, ["amount", "decimals", "currency"])
                ], 2)
              ])
            ]),
            createVNode(_sfc_main$i, {
              inputAmount: unref(inputAmount),
              "onUpdate:inputAmount": [
                _cache[1] || (_cache[1] = ($event) => isRef(inputAmount) ? inputAmount.value = $event : null),
                unref(tryUpdateEstimate)
              ],
              token: unref(inputToken),
              type: "in",
              onClick: getMonsterWaiting,
              onResumeHover
            }, null, 8, ["inputAmount", "token", "onUpdate:inputAmount"])
          ]),
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, toDisplayString(unref($t)("swap-swapElement:buy")), 1),
              createBaseVNode("div", _hoisted_13, [
                unref(outputToken) ? (openBlock(), createElementBlock("div", _hoisted_14, toDisplayString(unref($t)("swap-swapElement:balance")) + ":", 1)) : createCommentVNode("", true),
                unref(outputToken) ? (openBlock(), createElementBlock("div", _hoisted_15, [
                  createVNode(_sfc_main$o, {
                    amount: unref(outputTokenBalance),
                    decimals: unref(outputToken)?.decimals,
                    currency: unref(outputToken)?.policyId === "lovelace" ? "ADA" : "",
                    "clipboard-enabled": false
                  }, null, 8, ["amount", "decimals", "currency"])
                ])) : createCommentVNode("", true)
              ])
            ]),
            createVNode(_sfc_main$i, {
              inputAmount: unref(outputAmount),
              "onUpdate:inputAmount": [
                _cache[2] || (_cache[2] = ($event) => isRef(outputAmount) ? outputAmount.value = $event : null),
                unref(tryUpdateEstimate)
              ],
              token: unref(outputToken),
              loading: unref(isWaitingForEstimate),
              type: "out",
              onClick: getMonsterWaiting,
              onResumeHover
            }, null, 8, ["inputAmount", "token", "loading", "onUpdate:inputAmount"]),
            unref(lastUpdated) !== 0 ? (openBlock(), createElementBlock("div", _hoisted_16, [
              createVNode(_sfc_main$p, { timestamp: unref(lastUpdated) }, null, 8, ["timestamp"]),
              unref(swapEstimate) && unref(swapEstimate).aggregator !== "NONE" ? (openBlock(), createElementBlock("div", _hoisted_17, [
                createBaseVNode("div", _hoisted_18, toDisplayString(unref($t)("swap-swapElement:aggAndDexs")), 1),
                withDirectives(createVNode(_sfc_main$1, {
                  class: "w-7 aspect-square bg-dark flex flex-row flex-wrap et-jc-ic rounded-full overflow-hidden",
                  agg: unref(swapEstimate).aggregator
                }, null, 8, ["agg"]), [
                  [
                    _directive_tooltip,
                    unref(swapEstimate).aggregator,
                    void 0,
                    { top: true }
                  ]
                ]),
                unref(swapEstimate).DEXs ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(swapEstimate).DEXs, (_dex) => {
                  return withDirectives((openBlock(), createElementBlock("div", _hoisted_19, [
                    createVNode(_sfc_main$4, { dex: _dex }, null, 8, ["dex"])
                  ])), [
                    [
                      _directive_tooltip,
                      _dex,
                      void 0,
                      { top: true }
                    ]
                  ]);
                }), 256)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_20, [
              createVNode(_component_Button, {
                class: "size-12 p-0 rounded-full bg-white",
                disabled: !unref(inputToken) || !unref(outputToken),
                text: "",
                onClick: unref(switchInputAndOutput)
              }, {
                default: withCtx(() => [
                  createVNode(IconSwapArrow, { class: "stroke-black w-6" })
                ]),
                _: 1
              }, 8, ["disabled", "onClick"])
            ])
          ]),
          unref(swapEstimate) && unref(swapEstimate).aggregator !== "NONE" ? (openBlock(), createElementBlock("div", _hoisted_21, [
            createBaseVNode("div", _hoisted_22, [
              createBaseVNode("div", _hoisted_23, [
                createBaseVNode("div", null, toDisplayString(unref($t)("swap-swapElement:provider")) + ":", 1),
                createBaseVNode("div", null, toDisplayString(unref(inputToken)?.ticker ?? "-") + " / " + toDisplayString(unref(outputToken)?.ticker ?? "-") + ":", 1),
                createBaseVNode("div", null, toDisplayString(unref(outputToken)?.ticker ?? "-") + " / " + toDisplayString(unref(inputToken)?.ticker ?? "-") + ":", 1)
              ]),
              createBaseVNode("div", _hoisted_24, [
                createBaseVNode("div", _hoisted_25, toDisplayString(unref(swapEstimate)?.aggregator ?? "-"), 1),
                createBaseVNode("div", _hoisted_26, [
                  createBaseVNode("span", {
                    class: normalizeClass([formattedEstimatePrice.value === "-" ? "text-txt-muted" : "text-txt-green", "tracking-wide text-txt-green"])
                  }, toDisplayString(formattedEstimatePrice.value), 3)
                ]),
                createBaseVNode("div", _hoisted_27, [
                  createBaseVNode("span", {
                    class: normalizeClass([formattedReverseEstimatePrice.value === "-" ? "text-txt-muted" : "text-txt-green", "tracking-wide text-txt-green"])
                  }, toDisplayString(formattedReverseEstimatePrice.value), 3)
                ])
              ]),
              createBaseVNode("div", _hoisted_28, [
                createVNode(_component_Button, {
                  class: "text-center whitespace-nowrap cursor-pointer",
                  severity: "secondary",
                  size: "small",
                  outlined: "",
                  rounded: "",
                  label: detailsVisible.value ? unref($t)("swap-swapElement:details.hide") : unref($t)("swap-swapElement:details.show"),
                  onClick: _cache[3] || (_cache[3] = ($event) => detailsVisible.value = !detailsVisible.value)
                }, null, 8, ["label"])
              ])
            ]),
            detailsVisible.value ? (openBlock(), createElementBlock("div", _hoisted_29, [
              createBaseVNode("div", _hoisted_30, [
                createBaseVNode("div", _hoisted_31, [
                  withDirectives(createBaseVNode("i", _hoisted_32, null, 512), [
                    [
                      _directive_tooltip,
                      unref($t)("swap-swapElement:details.dexFees.tooltip"),
                      void 0,
                      { top: true }
                    ]
                  ]),
                  createTextVNode(" " + toDisplayString(unref($t)("swap-swapElement:details.dexFees.label")), 1)
                ]),
                createBaseVNode("div", _hoisted_33, [
                  createVNode(_sfc_main$o, { amount: feeTotal.value }, null, 8, ["amount"])
                ])
              ]),
              createBaseVNode("div", _hoisted_34, [
                createBaseVNode("div", _hoisted_35, [
                  withDirectives(createBaseVNode("i", _hoisted_36, null, 512), [
                    [
                      _directive_tooltip,
                      unref($t)("swap-swapElement:details.aggregatorFee.tooltip"),
                      void 0,
                      { top: true }
                    ]
                  ]),
                  createTextVNode(" " + toDisplayString(unref($t)("swap-swapElement:details.aggregatorFee.label")), 1)
                ]),
                createBaseVNode("div", _hoisted_37, [
                  createVNode(_sfc_main$o, {
                    amount: unref(swapEstimate)?.fee_aggregator ?? "0"
                  }, null, 8, ["amount"])
                ])
              ]),
              createBaseVNode("div", _hoisted_38, [
                createBaseVNode("div", _hoisted_39, [
                  withDirectives(createBaseVNode("i", _hoisted_40, null, 512), [
                    [
                      _directive_tooltip,
                      unref($t)("swap-swapElement:details.deposit.tooltip"),
                      void 0,
                      { top: true }
                    ]
                  ]),
                  createTextVNode(" " + toDisplayString(unref($t)("swap-swapElement:details.deposit.label")), 1)
                ]),
                createBaseVNode("div", _hoisted_41, [
                  createVNode(_sfc_main$o, {
                    amount: unref(swapEstimate)?.total_deposit ?? "0"
                  }, null, 8, ["amount"])
                ])
              ])
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          swapSlippage.value && unref(compare)(swapSlippage.value, ">", 10) ? (openBlock(), createBlock(_sfc_main$q, {
            key: 1,
            headline: unref($t)("swap-swapElement:warning.highSlippage")
          }, null, 8, ["headline"])) : createCommentVNode("", true),
          unref(swapEstimate) && unref(swapEstimate).aggregator === "NONE" ? (openBlock(), createBlock(_sfc_main$q, {
            key: 2,
            headline: unref($t)("swap-swapElement:warning.noRoute")
          }, null, 8, ["headline"])) : createCommentVNode("", true),
          isOverspending.value ? (openBlock(), createBlock(_sfc_main$q, {
            key: 3,
            class: "w-full mb-2",
            headline: unref($t)("swap-swapElement:warning.missingFunds"),
            caption: unref($t)("swap-swapElement:warning.overspend")
          }, null, 8, ["headline", "caption"])) : createCommentVNode("", true),
          !swapAllowed.value ? (openBlock(), createElementBlock("div", _hoisted_42, [
            createVNode(IconWarningGradient, { class: "h-8 w-8" }),
            createVNode(_sfc_main$r, {
              url: "https://wiki.eternl.io/",
              label: unref($t)("swap-swapElement:geo.headline"),
              "label-c-s-s": "font-semibold"
            }, null, 8, ["label"]),
            createBaseVNode("span", _hoisted_43, toDisplayString(unref($t)("swap-swapElement:geo.caption")), 1)
          ])) : createCommentVNode("", true)
        ]),
        _: 2
      }, [
        swapAllowed.value ? {
          name: "footer",
          fn: withCtx(() => [
            createVNode(ButtonRow, null, {
              default: withCtx(() => [
                withDirectives(createVNode(_component_Button, {
                  label: unref($t)("swap-swapElement:button.reset.label"),
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doResetSwapInput,
                  onMouseleave: onResumeHover
                }, null, 8, ["label"]), [
                  [_directive_tooltip, unref($t)("swap-swapElement:button.reset.tooltip")]
                ]),
                withDirectives((openBlock(), createBlock(_component_Button, {
                  class: "disabled:grayscale",
                  label: unref(isWaitingForBuild) ? unref($t)("swap-swapElement:button.loading.label") : unref($t)("swap-swapElement:button.swap.label"),
                  size: "small",
                  disabled: !unref(swapEstimate) || unref(isWaitingForBuild),
                  rounded: "",
                  onClick: doBuildSwap,
                  onMouseleave: onResumeHover
                }, createSlots({ _: 2 }, [
                  unref(isWaitingForBuild) ? {
                    name: "icon",
                    fn: withCtx(() => [
                      createVNode(_sfc_main$n, { class: "size-5" })
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["label", "disabled"])), [
                  [_directive_tooltip, unref(isWaitingForBuild) ? unref($t)("swap-swapElement:button.loading.tooltip") : unref($t)("swap-swapElement:button.swap.tooltip")]
                ])
              ]),
              _: 1
            })
          ]),
          key: "0"
        } : void 0
      ]), 1536);
    };
  }
});

export { _sfc_main as _, _sfc_main$1 as a, _sfc_main$4 as b };
