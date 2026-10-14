import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, D as computed, V as normalizeClass, a1 as withDirectives, u as unref, a2 as resolveDirective, c as createBlock, z as resolveComponent, y as withCtx, n as createVNode, B as toDisplayString } from './index.js';

const _sfc_main$1 = {  };

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M2.5 20V8.87695C2.5 7.58945 2.5 6.9457 2.78533 6.47048C2.9541 6.18939 3.18939 5.9541 3.47048 5.78533C3.9457 5.5 4.59449 5.5 5.89206 5.5C6.52339 5.5 6.83906 5.5 7.12612 5.58819C7.31759 5.64702 7.49914 5.73428 7.66469 5.84705C7.91289 6.01611 8.10859 6.26074 8.5 6.75C8.89141 7.23926 9.08711 7.48389 9.33531 7.65295C9.50086 7.76572 9.68241 7.85298 9.87388 7.91181C10.1609 8 10.4742 8 11.1008 8H15C16.4045 8 17.1067 8 17.6111 8.33706C17.8295 8.48298 18.017 8.67048 18.1629 8.88886C18.5 9.39331 18.5 10.0955 18.5 11.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M4.42028 14.0144L3.63368 16.0144C2.65618 18.4998 2.16743 19.7425 2.7524 20.6213C3.33737 21.5 4.65337 21.5 7.28537 21.5H15.1903C16.4249 21.5 17.0422 21.5 17.5295 21.1795C18.0169 20.859 18.2702 20.2865 18.7769 19.1415L19.6618 17.1415C20.7866 14.5992 21.349 13.3281 20.7679 12.4141C20.1868 11.5 18.8163 11.5 16.0752 11.5H8.07196C6.78232 11.5 6.1375 11.5 5.63811 11.8439C5.13872 12.1877 4.89924 12.7966 4.42028 14.0144Z",
      stroke: "currentColor",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M11.5 4.51456C12.4151 3.28409 13.6662 2.55594 15.5125 2.50161C16.1155 2.48386 16.7152 2.61395 17.2682 2.85544C18.5748 3.42601 19.4185 4.15644 20 5.5L21.5 3",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const OpenExternalLink = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExternalLink",
  props: {
    url: { type: String, required: true },
    label: { type: String, required: true },
    labelHover: { type: String, required: false, default: "" },
    labelCSS: { type: String, required: false, default: "" },
    icon: { type: String, required: false, default: "mdi mdi-open-in-new mx-1" },
    iconAlignLeft: { type: Boolean, required: false, default: false },
    truncate: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    let absURL = computed(() => props.url);
    let hover = computed(() => props.labelHover ?? "");
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["flex et-js-is cursor-pointer", __props.truncate ? "truncate" : ""])
      }, [
        unref(absURL) && __props.label ? withDirectives((openBlock(), createBlock(_component_Button, {
          key: 0,
          class: normalizeClass(["flex et-js-ic et-gap-sm p-0", (__props.truncate ? "truncate" : "") + " " + (__props.iconAlignLeft ? "flex-row-reverse" : "flex-row")]),
          rounded: "",
          link: "",
          severity: "secondary",
          as: "a",
          href: unref(absURL) ?? "",
          target: "_blank",
          rel: "noopener noreferrer"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass((__props.truncate ? "truncate" : "") + " " + __props.labelCSS)
            }, toDisplayString(__props.label), 3),
            createVNode(OpenExternalLink, { class: "size-6" })
          ]),
          _: 1
        }, 8, ["class", "href"])), [
          [_directive_tooltip, unref(hover)]
        ]) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["flex flex-row et-js-ic cursor-default", __props.truncate ? "truncate" : ""])
        }, [
          createBaseVNode("div", {
            class: normalizeClass((__props.truncate ? "truncate" : "") + " " + __props.labelCSS)
          }, toDisplayString(__props.label), 3)
        ], 2))
      ], 2);
    };
  }
});

export { _sfc_main as _ };
