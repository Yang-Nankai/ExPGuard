import { d as defineComponent, Z as useLocalStorage, a7 as useSlots, x as useScreenSize, bC as useRtlHelper, D as computed, e as ref, G as watch, f as onMounted, c as createBlock, o as openBlock, T as Teleport, p as createBaseVNode, m as createElementBlock, t as createCommentVNode, a1 as withDirectives, V as normalizeClass, a2 as resolveDirective, aK as normalizeStyle, U as withModifiers, aO as withKeys, u as unref, l as useTheme, a0 as renderSlot, W as resolveDynamicComponent } from './index.js';
import { g as gsapWithCSS } from './index2.js';

const _hoisted_1 = {
  ref: "bg2",
  class: "relative w-full h-full"
};
const _hoisted_2 = { key: 2 };
const _hoisted_3 = {
  key: 3,
  class: "modal-header px-4 sm:px-6 base-10 shrink-0 w-full flex flex-col et-js-is gap-0"
};
const _hoisted_4 = { class: "w-full relative flex flex-row et-jb-is et-gap-md" };
const _hoisted_5 = {
  key: 0,
  class: "w-full"
};
const _hoisted_6 = {
  key: 0,
  class: "modal-content grow w-full flex flex-col et-js-is pl-3 sm:pl-5 pr-1 sm:pr-2 overflow-hidden"
};
const _hoisted_7 = {
  key: 4,
  class: "modal-footer relative px-4 sm:px-6 base-10 shrink-0 w-full"
};
const _hoisted_8 = {
  key: 0,
  class: "w-full"
};
const d = 0.2;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  props: {
    modalContainer: { type: String, required: false, default: "#eternl-modal" },
    modalName: { type: String, required: false, default: "" },
    tabGroup: { type: String, required: false, default: "default" },
    explicitWidth: { type: String, required: false, default: "" },
    bgBlack: { type: String, required: false, default: "bg-black/50" },
    bgBlur: { type: String, required: false, default: "backdrop-blur-modal" },
    shadow: { type: String, required: false, default: "" },
    wide: { type: Boolean, required: false, default: false },
    halfWide: { type: Boolean, required: false, default: false },
    halfHeight: { type: Boolean, required: false, default: false },
    fullHeight: { type: Boolean, required: false, default: false },
    narrow: { type: Boolean, required: false, default: false },
    fullWidthOnMobile: { type: Boolean, required: false, default: false },
    almostFullHeightOnMobile: { type: Boolean, required: false, default: false },
    fullHeightOnMobile: { type: Boolean, required: false, default: false },
    stickyNoJump: { type: Boolean, required: false, default: false },
    cssWidth: { type: String, required: false, default: "" },
    cssTopGradient: { type: String, required: false, default: "et-bg-highlight" },
    noBackground: { type: Boolean, required: false, default: false },
    isDappBrowser: { type: Boolean, required: false, default: false },
    blurBackground: { type: Boolean, required: false, default: true },
    customBackground: { type: String, required: false, default: "" },
    persistent: { type: Boolean, required: false, default: false },
    attachToBottom: { type: Boolean, required: false, default: false },
    tweenUp: { type: Boolean, required: false, default: false },
    attachToRight: { type: Boolean, required: false, default: false },
    showHeaderDivider: { type: Boolean, required: false, default: false },
    showFooterDivider: { type: Boolean, required: false, default: false },
    hideHighlight: { type: Boolean, required: false, default: false },
    showHeaderBanner: { type: Boolean, required: false, default: false },
    showInvisible: { type: Boolean, required: false, default: false }
  },
  emits: ["preClose", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { modalHeaderBanner } = useTheme();
    const showBlurBgs = useLocalStorage("showBlurBgs", true, { listenToStorageChanges: true });
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const {
      height,
      isSmallerThanLG
    } = useScreenSize();
    const { currentDirection } = useRtlHelper();
    const bgBlack = computed(() => {
      const bg2 = props.bgBlack;
      if (bg2 !== "bg-black/50") {
        return bg2;
      }
      return showBlurBgs.value ? props.bgBlack : "bg-black/95";
    });
    const bgBlur = computed(() => {
      const bg2 = props.bgBlur;
      if (bg2 !== "backdrop-blur-modal") {
        return bg2;
      }
      return showBlurBgs.value ? props.bgBlur : "";
    });
    const isRightAttachment = computed(() => props.attachToRight && currentDirection.value === "ltr");
    const isLeftAttachment = computed(() => props.attachToRight && currentDirection.value === "rtl");
    const hasSlotHeader = computed(() => slots.hasOwnProperty("header"));
    const hasSlotHeaderDivider = computed(() => slots.hasOwnProperty("header-divider"));
    const hasSlotContent = computed(() => slots.hasOwnProperty("content"));
    const hasSlotFooter = computed(() => slots.hasOwnProperty("footer"));
    const hasSlotFooterDivider = computed(() => slots.hasOwnProperty("footer-divider"));
    const stickyAnchor = computed(() => {
      const h = height.value * 0.2;
      if (h < 0) {
        return 0;
      }
      if (h > 200) {
        return 200;
      }
      return Math.floor(h);
    });
    const bg = ref();
    const modal = ref();
    const modalFocus = ref();
    const _in = ref(false);
    const handleESC = () => !props.persistent && handleClose();
    const handleClose = () => {
      emit("preClose");
      _in.value = true;
      tweenOut();
    };
    const tweenIn = () => {
      if (_in.value) {
        return;
      }
      _in.value = true;
      const b = bg.value;
      const m = modal.value;
      const ease = "sine.inOut";
      const duration = d;
      const opacity = 1;
      if (!m) {
        return;
      }
      if (b) {
        gsapWithCSS.set(b, { opacity: 0, y: 0 });
        gsapWithCSS.to(b, { opacity, duration, ease });
      }
      const customTween = props.attachToBottom || props.attachToRight;
      if (props.attachToBottom) {
        gsapWithCSS.set(m, { y: "70%", opacity: 0 });
        gsapWithCSS.to(m, { y: 0, opacity, duration, ease });
      }
      if (props.attachToRight) {
        if (currentDirection.value === "rtl") {
          gsapWithCSS.set(m, { x: "-70%", opacity: 0 });
          gsapWithCSS.to(m, { x: 0, opacity, duration, ease });
        } else {
          gsapWithCSS.set(m, { x: "70%", opacity: 0 });
          gsapWithCSS.to(m, { x: 0, opacity, duration, ease });
        }
      }
      if (!customTween) {
        gsapWithCSS.set(m, { scale: props.tweenUp ? 1.15 : 0.85, opacity: 0 });
        gsapWithCSS.to(m, { scale: 1, opacity, duration, ease });
      }
      if (modalFocus.value && !props.persistent) {
        modalFocus.value.focus();
      } else if (modal.value) {
        modal.value.focus();
      }
    };
    const tweenOut = (instant = false) => {
      if (!_in.value) {
        return;
      }
      _in.value = false;
      const b = bg.value;
      const m = modal.value;
      if (!m) {
        return;
      }
      const customTween = props.attachToBottom || props.attachToRight || props.isDappBrowser;
      const duration = instant ? 0 : d;
      const delay = instant ? 0 : d - 0.15;
      const ease = "sine.inOut";
      const opacity = 0;
      if (b) {
        gsapWithCSS.to(b, { opacity, duration, delay });
      }
      if (!customTween) {
        gsapWithCSS.to(m, { scale: props.tweenUp ? 1.15 : 0.85, opacity, duration, ease, onComplete: () => {
          emit("close");
        } });
      }
      if (props.attachToBottom) {
        gsapWithCSS.to(m, { y: "100%", duration, onComplete: () => {
          emit("close");
        } });
      }
      if (props.attachToRight) {
        if (currentDirection.value === "rtl") {
          gsapWithCSS.to(m, { x: "-100%", duration, ease, onComplete: () => {
            emit("close");
          } });
        } else {
          gsapWithCSS.to(m, { x: "100%", duration, ease, onComplete: () => {
            emit("close");
          } });
        }
      }
    };
    watch(() => props.tweenUp, () => {
      if (props.tweenUp) tweenOut();
    });
    onMounted(() => {
      if (!props.isDappBrowser) {
        return tweenIn();
      } else {
        _in.value = true;
        return tweenOut(true);
      }
    });
    const getBorderRounded = () => {
      if (props.attachToBottom) {
        return props.fullWidthOnMobile ? "lg:rounded-t-2xl" : "rounded-t-2xl";
      }
      if (isRightAttachment.value) {
        return props.fullWidthOnMobile ? "lg:rounded-none" : "rounded-l-2xl";
      }
      if (isLeftAttachment.value) {
        return props.fullWidthOnMobile ? "lg:rounded-none" : "rounded-r-2xl";
      }
      return props.fullWidthOnMobile ? "sm:rounded-2xl" : "rounded-2xl";
    };
    const modalHeight = computed(() => {
      let height2 = "";
      if (props.halfHeight) {
        height2 += "max-h-2xl ";
      } else {
        height2 += "max-h-full ";
      }
      if (props.fullHeight) {
        height2 += "h-full ";
      } else {
        if (props.almostFullHeightOnMobile) {
          height2 += "max-h-[90%] sm:h-auto ";
        } else if (props.fullHeightOnMobile) {
          height2 += "h-full  sm:h-auto ";
        } else {
          height2 += "h-auto ";
        }
      }
      return height2;
    });
    const getModalPadding = computed(() => {
      let pt = "pt-2";
      let pb = "pb-2";
      let px = "px-4 sm:px-10 lg:px-20";
      let rest = "";
      if (isSmallerThanLG.value) {
        pt = "pt-0";
        pb = "pb-0";
      }
      if (props.fullWidthOnMobile && props.wide) {
        px = "lg:px-4";
      } else if (props.fullWidthOnMobile) {
        px = "lg:px-20";
      }
      if (props.attachToBottom) {
        pb = "pb-0";
        rest = "justify-end!";
      }
      if (isRightAttachment.value) {
        pt = "pt-0";
        pb = "pb-0";
        px = "px-0";
        rest = "items-end!";
      }
      if (isLeftAttachment.value) {
        pt = "pt-0";
        pb = "pb-0";
        px = "px-0";
        rest = "items-start!";
      }
      return px + " " + pt + " " + pb + " " + rest;
    });
    __expose({ handleClose, tweenIn, tweenOut });
    return (_ctx, _cache) => {
      const _directive_focustrap = resolveDirective("focustrap");
      return openBlock(), createBlock(Teleport, {
        defer: "",
        to: __props.modalContainer
      }, [
        createBaseVNode("div", {
          class: normalizeClass((__props.showInvisible ? "opacity-0" : "") + __props.modalName + " modal absolute block min-h-modal " + (!__props.noBackground ? "inset-0 w-full h-full overflow-hidden" : __props.attachToBottom ? "bottom-0 inset-x-0 w-full" : isRightAttachment.value ? "right-0 inset-y-0 h-full" : isLeftAttachment.value ? "left-0 inset-y-0 h-full" : "") + " " + __props.cssWidth + " " + (__props.isDappBrowser && !_in.value || !_in.value ? "pointer-events-none!" : "") + " " + (_in.value ? "pointer-events-auto" : "pointer-events-none!"))
        }, [
          createBaseVNode("div", _hoisted_1, [
            !__props.noBackground ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref_key: "bg",
              ref: bg,
              class: normalizeClass([
                "absolute block inset-0 w-full h-full",
                (!__props.noBackground && (!__props.isDappBrowser || __props.isDappBrowser && _in.value) ? bgBlack.value : "") + " " + (__props.blurBackground && (!__props.isDappBrowser || __props.isDappBrowser && _in.value) ? bgBlur.value : "") + " "
              ])
            }, null, 2)) : createCommentVNode("", true),
            withDirectives((openBlock(), createElementBlock("div", {
              class: normalizeClass(["relative w-full h-full flex flex-col outline-transparent", getModalPadding.value + " " + (__props.stickyNoJump ? "et-js-ic" : "et-jc-ic")]),
              style: normalizeStyle(__props.stickyNoJump ? "padding-top:" + stickyAnchor.value + "px;" : "")
            }, [
              !__props.noBackground ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "modalFocus",
                ref: modalFocus,
                class: normalizeClass(["absolute block inset-0 w-full h-full outline-transparent", __props.persistent ? "" : "cursor-pointer"]),
                tabindex: "0",
                onKeydown: [
                  withKeys(handleESC, ["esc"]),
                  withKeys(handleESC, ["space"]),
                  withKeys(handleESC, ["enter"])
                ],
                onClick: withModifiers(handleESC, ["stop", "prevent"])
              }, null, 34)) : createCommentVNode("", true),
              withDirectives((openBlock(), createElementBlock("div", {
                ref_key: "modal",
                ref: modal,
                role: "dialog",
                "aria-modal": "true",
                class: normalizeClass(["relative modal-inner w-full flex flex-col outline-transparent et-jc-ic et-min-width-app bg-bg-app", (__props.explicitWidth ? __props.explicitWidth : __props.wide ? "max-w-full" : __props.narrow ? " sm:max-w-(--breakpoint-sm)!" : __props.halfWide ? " max-w-4xl" : " max-w-7xl") + " " + (_in.value ? "pointer-events-auto" : "pointer-events-none") + " " + modalHeight.value + " " + (__props.isDappBrowser ? "" : "pb-4 sm:pb-5") + " " + (__props.showHeaderDivider ? "" : "et-gap-sme sm:et-gap-mde") + " " + (__props.showHeaderBanner && unref(modalHeaderBanner) ? "" : "pt-4 sm:pt-5") + " " + (__props.customBackground ? __props.customBackground : "") + " " + (__props.shadow ? __props.shadow : isRightAttachment.value ? "shadow-modal-right" : isLeftAttachment.value ? "shadow-modal-left" : "shadow-modal-center") + " " + getBorderRounded()])
              }, [
                !__props.hideHighlight && (!__props.showHeaderBanner || !unref(modalHeaderBanner)) ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["w-full h-8 absolute top-0 overflow-hidden", __props.attachToRight ? "" : "lg:rounded-2xl"])
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-full h-1.5 absolute top-0", __props.cssTopGradient])
                  }, null, 2)
                ], 2)) : createCommentVNode("", true),
                __props.showHeaderBanner && (unref(modalHeaderBanner) || _ctx.$slots["modal-header-banner"]) ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  id: "modal-header-banner",
                  class: normalizeClass(["absolute w-full h-20 top-0", getBorderRounded() + " rounded-b-none!"])
                }, [
                  _ctx.$slots["modal-header-banner"] ? renderSlot(_ctx.$slots, "modal-header-banner", { key: 0 }) : (openBlock(), createBlock(resolveDynamicComponent(unref(modalHeaderBanner)), { key: 1 }))
                ], 2)) : createCommentVNode("", true),
                __props.showHeaderBanner && (unref(modalHeaderBanner) || _ctx.$slots["modal-header-banner"]) ? (openBlock(), createElementBlock("div", _hoisted_2)) : createCommentVNode("", true),
                hasSlotHeader.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  createBaseVNode("div", _hoisted_4, [
                    renderSlot(_ctx.$slots, "header", { handleClose })
                  ]),
                  __props.showHeaderDivider && hasSlotHeaderDivider.value ? (openBlock(), createElementBlock("div", _hoisted_5, [
                    renderSlot(_ctx.$slots, "header-divider")
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "contentRoot", { handleClose }, () => [
                  hasSlotContent.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
                    createBaseVNode("div", {
                      class: normalizeClass(["relative grow flex w-full pl-1 pt-1 pr-1 sm:pr-2 et-scrollbar scroll-anchor overflow-y-scroll", __props.attachToBottom ? "pb-0" : "pb-1"])
                    }, [
                      renderSlot(_ctx.$slots, "content", { handleClose })
                    ], 2)
                  ])) : createCommentVNode("", true)
                ]),
                hasSlotFooter.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
                  __props.showFooterDivider && hasSlotFooterDivider.value ? (openBlock(), createElementBlock("div", _hoisted_8, [
                    renderSlot(_ctx.$slots, "footer-divider")
                  ])) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "footer", { handleClose })
                ])) : createCommentVNode("", true)
              ], 2)), [
                [_directive_focustrap, __props.persistent]
              ])
            ], 6)), [
              [_directive_focustrap, !__props.persistent]
            ])
          ], 512)
        ], 2)
      ], 8, ["to"]);
    };
  }
});

export { _sfc_main as _ };
