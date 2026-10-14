import { d as defineComponent, v as useTranslation, x as useDarkMode, y as computed, w as watch, z as nextTick, B as resolveComponent, c as createBlock, e as openBlock, f as withCtx, g as createElementBlock, h as createCommentVNode, u as unref, p as createVNode, k as createBaseVNode, C as toDisplayString, W as WALLET_VERSION_BETA, T as Transition } from './permissions.js';
import { u as useModuleLoader, a as usePreloader } from './AppPermissions.js';

const _imports_0 = "/images/eternl-256.png";

const _hoisted_1 = {
  key: 0,
  class: "preloader absolute inset-0 flex flex-col et-jc-ic bg-bg-app"
};
const _hoisted_2 = { class: "relative grow h-full flex flex-col et-gap-sm" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "relative grow flex flex-row et-js-is" };
const _hoisted_5 = { class: "grow w-full h-full -mt-4 flex flex-col et-js-ie" };
const _hoisted_6 = { class: "et-text-xl font-bold text-right mt-4" };
const _hoisted_7 = { class: "et-text-md font-semibold text-right flex et-jc-ic et-gap-xs mt-1" };
const _hoisted_8 = { class: "et-text-xs text-right" };
const _hoisted_9 = { class: "relative w-full et-text-xs text-txt-muted text-right -mb-1.5" };
const _hoisted_10 = { class: "relative w-full et-text-xs text-txt-muted text-right" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Preloader",
  setup(__props) {
    const $t = useTranslation().t;
    const { progress } = useModuleLoader();
    const {
      showPreloader,
      hidePreloader
    } = usePreloader();
    const { isDarkMode } = useDarkMode();
    const _progress = computed(() => {
      return Math.round(progress.value);
    });
    const imgSrc = computed(() => {
      return isDarkMode.value ? "/images/preloader-bg-default.svg" : "/images/preloader-bg-default-light.svg";
    });
    watch(_progress, (value) => {
      if (value === 100) {
        nextTick(() => hidePreloader());
      }
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(Transition, { name: "fade-out" }, {
        default: withCtx(() => [
          unref(showPreloader) ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createVNode(_component_Card, {
              class: "w-full relative max-w-72 sm:max-w-96 min-w-[200px] min-h-48 sm:min-h-58 p-0 transition-all overflow-hidden",
              pt: {
                body: "p-0 h-full",
                content: "px-5 pt-5 pb-4 h-full sm:px-6 sm:pt-6 sm:pb-4 "
              }
            }, {
              content: withCtx(() => [
                createBaseVNode("div", _hoisted_2, [
                  createBaseVNode("img", {
                    class: "absolute -top-11 sm:-top-18 -right-5 sm:-right-8",
                    src: imgSrc.value
                  }, null, 8, _hoisted_3),
                  createBaseVNode("div", _hoisted_4, [
                    _cache[1] || (_cache[1] = createBaseVNode("img", {
                      class: "shrink-0 grow-0 w-full max-w-20 sm:max-w-26 -ml-4 -mt-3 sm:-mt-4 aspect-square transition-all",
                      src: _imports_0,
                      alt: "Eternl logo"
                    }, null, -1)),
                    createBaseVNode("div", _hoisted_5, [
                      createBaseVNode("div", _hoisted_6, toDisplayString(_progress.value) + "%", 1),
                      createBaseVNode("div", _hoisted_7, [
                        createBaseVNode("div", null, toDisplayString(unref($t)("common:appName")), 1)
                      ]),
                      createBaseVNode("div", _hoisted_8, toDisplayString(unref(WALLET_VERSION_BETA)), 1),
                      _cache[0] || (_cache[0] = createBaseVNode("div", { class: "grow" }, null, -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_9, toDisplayString(unref($t)("common:companyName")), 1),
                  createBaseVNode("div", _hoisted_10, "2020-" + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()), 1)
                ]),
                _cache[2] || (_cache[2] = createBaseVNode("div", { class: "w-full h-1.5 absolute bottom-0 left-0 rounded-b-lg overflow-hidden" }, [
                  createBaseVNode("div", { class: "w-full h-1.5 absolute top-0 et-bg-highlight" })
                ], -1))
              ]),
              _: 1
            })
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});

export { _sfc_main as default };
