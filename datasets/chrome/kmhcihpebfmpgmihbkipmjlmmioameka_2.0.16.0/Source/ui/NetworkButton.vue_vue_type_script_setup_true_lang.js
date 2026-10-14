import { d as defineComponent, w as useTranslation, D as computed, P as networkId, c as createBlock, o as openBlock, z as resolveComponent, u as unref, V as normalizeClass, y as withCtx, n as createVNode, p as createBaseVNode, ai as Transition, m as createElementBlock, t as createCommentVNode, H as createTextVNode, B as toDisplayString, F as Fragment } from './index.js';
import { c as cardanoLogo } from './image.js';
import { c as chainTip } from './chainTip.js';
import { N as NetworkIcons, u as useModalSelectNetwork } from './NetworkIcons.js';

const _hoisted_1 = ["src"];
const _hoisted_2 = {
  key: 0,
  class: "flex flex-col et-jc-is pr-6"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NetworkButton",
  props: {
    noRedirect: { type: Boolean, required: false, default: false },
    compact: { type: Boolean, required: false, default: false },
    showText: { type: Boolean, required: false, default: true }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const {
      openModalNetworks
    } = useModalSelectNetwork();
    const initialized = computed(() => chainTip.value.onTip ?? false);
    const networkStatus = computed(() => initialized.value ? "" : props.noRedirect ? "" : $t("networkSwitcher:offline"));
    const currentNetworkTitle = computed(() => $t("networkSwitcher:" + networkId.value + ".label"));
    const currentNetworkIcon = computed(() => {
      const icon = NetworkIcons[networkId.value].icon;
      if (networkId.value === "mainnet") {
        return cardanoLogo;
      }
      return icon;
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: normalizeClass(["network-button p-0 et-js-ic rounded-full shadow-sm border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)] hover:bg-[var(--p-button-text-secondary-hover-background)]", !__props.showText ? __props.compact ? "size-9.5" : "size-10 sm:size-12" : (__props.compact ? "h-9.5 w-full" : "h-10 sm:h-12 w-full") + " " + (networkStatus.value ? "bg-bg-negative border-border-negative grayscale" : "")]),
        severity: "secondary",
        onClick: _cache[0] || (_cache[0] = ($event) => unref(openModalNetworks)(__props.noRedirect))
      }, {
        default: withCtx(() => [
          createVNode(_component_Card, {
            class: normalizeClass(["bg-transparent border-0 rounded-full!", !__props.showText ? __props.compact ? "size-9.5" : "size-10 sm:size-12" : __props.compact ? "h-9.5 w-full" : "h-10 sm:h-12 w-full"]),
            "pt:body:class": "p-0",
            "pt:content:class": "p-0"
          }, {
            content: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(["w-full flex flex-row et-js-ic et-gap-md", !__props.showText ? __props.compact ? "h-9.5" : "h-10 sm:h-12" : __props.compact ? "h-9.5" : "h-10 sm:h-12"])
              }, [
                createBaseVNode("img", {
                  class: normalizeClass(["shrink-0 max-h-12 aspect-square rounded-full", !__props.showText ? __props.compact ? "size-9" : "size-10 sm:size-12" : __props.compact ? "size-9" : "size-10 sm:size-12"]),
                  src: currentNetworkIcon.value ?? void 0,
                  alt: "current network icon"
                }, null, 10, _hoisted_1),
                createVNode(Transition, { name: "fade-in" }, {
                  default: withCtx(() => [
                    __props.showText ? (openBlock(), createElementBlock("div", _hoisted_2, [
                      createBaseVNode("div", {
                        class: normalizeClass(["leading-tight whitespace-nowrap", networkStatus.value ? "text-txt-muted" : ""])
                      }, [
                        createTextVNode(toDisplayString(currentNetworkTitle.value), 1),
                        networkStatus.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          createTextVNode(": " + toDisplayString(networkStatus.value), 1)
                        ], 64)) : createCommentVNode("", true)
                      ], 2)
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ], 2)
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});

export { _sfc_main as _ };
