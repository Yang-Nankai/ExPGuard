import { g as gsapWithCSS } from './index2.js';
import { d as defineComponent, f as onMounted, G as watch, m as createElementBlock, o as openBlock, p as createBaseVNode, aK as normalizeStyle, u as unref, l as useTheme } from './index.js';
import { D as DrawSVGPlugin } from './DrawSVGPlugin.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';

const _hoisted_1 = {
  id: "fx_loader_icon",
  class: "size-15"
};
const _hoisted_2 = {
  id: "fx_loader_icon_svg_wrap",
  class: "size-full"
};
const _hoisted_3 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 60 60",
  style: { "enable-background": "new 0 0 60 60" },
  "xml:space": "preserve"
};
const _hoisted_4 = {
  id: "fx_loader_icon_wrap",
  class: "fx_loader_icon_sizeSVG"
};
const _hoisted_5 = {
  id: "fx_loader_icon_outer_circle",
  gradientUnits: "userSpaceOnUse",
  x1: "-101.3462",
  y1: "31.6001",
  x2: "161.034",
  y2: "32.3351",
  gradientTransform: "matrix(1 0 0 -1 0 62)"
};
const _hoisted_6 = {
  id: "fx_loader_icon_checkmark_00000039134537263817778830000013992910070384182967_",
  gradientUnits: "userSpaceOnUse",
  x1: "-0.8845",
  y1: "32.5391",
  x2: "62.7043",
  y2: "32.6758",
  gradientTransform: "matrix(1 0 0 -1 0 62)"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "IconFxLoader",
  props: {
    finished: { type: Boolean, required: false, default: false }
  },
  emits: ["done"],
  setup(__props, { emit: __emit }) {
    const {
      gradientBlue,
      gradientViolet,
      gradientRed,
      gradientOrange,
      gradientPurple
    } = useTheme();
    const props = __props;
    const emit = __emit;
    gsapWithCSS.registerPlugin(DrawSVGPlugin);
    let gtlLoading = gsapWithCSS.timeline({ paused: true });
    let gtlFinished = gsapWithCSS.timeline({ paused: true });
    let cl = "";
    let loaderLoadingVal = 50;
    let loaderCurrentVal;
    const fxLoaderIconTxLoading = () => {
      loaderCurrentVal = 0;
      gtlLoading.play("fadein");
    };
    const fxLoaderIconTxFinished = () => {
      loaderCurrentVal = 100;
      gtlLoading.pause();
      gtlFinished.play("fadein");
    };
    onMounted(() => {
      gtlLoading.addLabel("start", cl + "+=0.00");
      cl = "start";
      gtlLoading.set("#fx_loader_icon_checkmark", { drawSVG: 0 }, cl + "+=0.00");
      gtlLoading.set("#fx_loader_icon_circleOne", { drawSVG: 0 }, cl + "+=0.00");
      gtlLoading.set("#fx_loader_icon_ring", { svgOrigin: "30px 30px" }, cl + "+=0.00");
      gtlLoading.addLabel("fadein", cl + "+=0.01");
      cl = "fadein";
      gtlLoading.fromTo("#fx_loader_icon_circleOne", { drawSVG: "0%" }, {
        duration: 1,
        drawSVG: "50%",
        yoyoEase: true,
        onUpdate: function() {
          loaderCurrentVal = DrawSVGPlugin.getPosition("#fx_loader_icon_circleOne")[1] / 100 * loaderLoadingVal;
        }
      }, cl + "+=0.0");
      gtlLoading.to("#fx_loader_icon_ring", { rotation: 360, duration: 0.5, repeat: -1, ease: "none" }, cl + "+=0.0");
      gtlLoading.seek("fadein");
      gtlFinished.addLabel("start", cl + "+=0.00");
      cl = "start";
      gtlFinished.addLabel("fadein", cl + "+=0.01");
      cl = "fadein";
      gtlFinished.to("#fx_loader_icon_checkmark", { drawSVG: 100, duration: 2, ease: "power2.out" }, cl + "+=0.0");
      gtlFinished.add(function() {
        gsapWithCSS.fromTo("#fx_loader_icon_circleOne", { drawSVG: loaderCurrentVal + "%" }, { duration: 0.5, drawSVG: "100%" });
      }, cl + "+=0.0");
      gtlFinished.to("#fx_loader_icon_ring", { rotation: 0, duration: 0.5, ease: "none", onComplete: () => {
        setTimeout(() => emit("done"), 100);
      } }, cl + "+=0.0");
      gsapWithCSS.set("#fx_loader_icon", { opacity: 1 });
      fxLoaderIconTxLoading();
    });
    watch(() => props.finished, (value) => {
      if (value) {
        fxLoaderIconTxFinished();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (openBlock(), createElementBlock("svg", _hoisted_3, [
            createBaseVNode("g", _hoisted_4, [
              createBaseVNode("linearGradient", _hoisted_5, [
                createBaseVNode("stop", {
                  offset: "0",
                  style: normalizeStyle("stop-color:" + unref(gradientBlue))
                }, null, 4),
                createBaseVNode("stop", {
                  offset: "0.1667",
                  style: normalizeStyle("stop-color:" + unref(gradientViolet))
                }, null, 4),
                createBaseVNode("stop", {
                  offset: "0.5118",
                  style: normalizeStyle("stop-color:" + unref(gradientRed))
                }, null, 4),
                createBaseVNode("stop", {
                  offset: "0.8333",
                  style: normalizeStyle("stop-color:" + unref(gradientOrange))
                }, null, 4),
                createBaseVNode("stop", {
                  offset: "1",
                  style: normalizeStyle("stop-color:" + unref(gradientPurple))
                }, null, 4)
              ]),
              _cache[0] || (_cache[0] = createBaseVNode("g", { id: "fx_loader_icon_ring" }, [
                createBaseVNode("circle", {
                  id: "fx_loader_icon_circleOne",
                  style: { "fill": "none", "stroke": "url(#fx_loader_icon_outer_circle)", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
                  cx: "50%",
                  cy: "50%",
                  r: "28"
                })
              ], -1)),
              createBaseVNode("linearGradient", _hoisted_6, [
                createBaseVNode("stop", {
                  offset: "0",
                  style: normalizeStyle("stop-color:" + unref(gradientBlue))
                }, null, 4),
                createBaseVNode("stop", {
                  offset: "0.1667",
                  style: normalizeStyle("stop-color:" + unref(gradientViolet))
                }, null, 4),
                createBaseVNode("stop", {
                  offset: "0.5118",
                  style: normalizeStyle("stop-color:" + unref(gradientRed))
                }, null, 4),
                createBaseVNode("stop", {
                  offset: "0.8333",
                  style: normalizeStyle("stop-color:" + unref(gradientOrange))
                }, null, 4),
                createBaseVNode("stop", {
                  offset: "1",
                  style: normalizeStyle("stop-color:" + unref(gradientPurple))
                }, null, 4)
              ]),
              _cache[1] || (_cache[1] = createBaseVNode("path", {
                id: "fx_loader_icon_checkmark",
                style: { "fill": "none", "stroke": "url(#fx_loader_icon_checkmark_00000039134537263817778830000013992910070384182967_)", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
                d: "\r\n            M23.7,36.3l3.8,2.5l10.7-18.9"
              }, null, -1))
            ])
          ]))
        ])
      ]);
    };
  }
});

const IconFxLoader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c1ff042d"]]);

export { IconFxLoader as I };
