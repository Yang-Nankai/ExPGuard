import { u as useChainProgress } from './useChainProgress.js';
import { G as GradientBar2 } from './GradientBar2.js';
import { d as defineComponent, D as computed, m as createElementBlock, o as openBlock, n as createVNode, x as useScreenSize, a5 as useDarkMode, X as useDesktopMenuCollapsed, F as Fragment, p as createBaseVNode, z as resolveComponent, V as normalizeClass, u as unref, y as withCtx, B as toDisplayString, bl as WALLET_VERSION_BETA, d2 as isBetaApp } from './index.js';

const _hoisted_1$1 = { class: "shrink-0 epoch-progress-bar w-full h-1 bg-blue overflow-hidden" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EpochProgressBar",
  setup(__props) {
    const { epochPercent } = useChainProgress();
    const progress = computed(() => epochPercent.value * 100);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(GradientBar2, {
          progress: progress.value,
          class: "fixed"
        }, null, 8, ["progress"])
      ]);
    };
  }
});

const _hoisted_1 = ["src"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EternlLogoLayout",
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const {
      isSmallerThanLG,
      isSmallerThanSM
    } = useScreenSize();
    const {
      isDesktopMenuCollapsed
    } = useDesktopMenuCollapsed();
    const { isDarkMode } = useDarkMode();
    const versionPosition = computed(() => {
      if (isSmallerThanSM.value) {
        return "left-1/2 -translate-x-1/2 -bottom-3.5! text-[0.5rem]";
      } else if (isSmallerThanLG.value) {
        return "left-0 bottom-0";
      } else if (isDesktopMenuCollapsed.value && !isSmallerThanLG.value) {
        return "left-1/2 -translate-x-1/2 -bottom-1!";
      }
      return "";
    });
    const logoUrl = computed(() => {
      if (isSmallerThanSM.value || isDesktopMenuCollapsed.value) {
        return "/icons/favicon-128x128.png";
      } else if (!isDarkMode.value) {
        if (isBetaApp()) {
          return "/images/eternl-logo-text-beta-black-440x128.png";
        }
        return "/images/eternl-logo-text-prod-black-440x128.png";
      } else {
        if (isBetaApp()) {
          return "/images/eternl-logo-text-beta-white-440x128.png";
        }
        return "/images/eternl-logo-text-prod-white-440x128.png";
      }
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Button, {
          text: "",
          class: normalizeClass(["relative px-2 -mx-2 py-2 -my-2 md:px-4 md:-mx-4 md:py-2 md:-my-2 hover:bg-transparent", unref(isDesktopMenuCollapsed) && !unref(isSmallerThanLG) ? "translate-x-4" : unref(isSmallerThanLG) ? "" : ""]),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
        }, {
          default: withCtx(() => [
            createBaseVNode("img", {
              src: logoUrl.value,
              alt: "Eternl logo",
              class: "h-8 block"
            }, null, 8, _hoisted_1)
          ]),
          _: 1
        }, 8, ["class"]),
        createBaseVNode("span", {
          class: normalizeClass(["absolute bottom-0 text-2xs text-txt-blind", versionPosition.value])
        }, toDisplayString(unref(WALLET_VERSION_BETA)), 3)
      ], 64);
    };
  }
});

export { _sfc_main as _, _sfc_main$1 as a };
