import { d as defineComponent, a6 as useRouter, a7 as useSlots, x as useScreenSize, e as ref, D as computed, m as createElementBlock, o as openBlock, p as createBaseVNode, V as normalizeClass, a0 as renderSlot, n as createVNode, t as createCommentVNode, c as createBlock, y as withCtx, z as resolveComponent, H as createTextVNode, u as unref, g as isMobileApp } from './index.js';
import { u as useNavigation } from './useNavigation.js';
import { _ as _sfc_main$2, a as _sfc_main$3 } from './EternlLogoLayout.vue_vue_type_script_setup_true_lang.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import './NetworkId.js';
import './epochParams.js';
import './send.js';
import './useResetScroll.js';
import './useChainProgress.js';
import './chain.js';
import './chainTip.js';
import './GradientBar2.js';
import './index2.js';

const _imports_0 = "/images/landingpage/btn-google.png";

const _imports_1 = "/images/landingpage/btn-apple.png";

const _imports_2 = "/images/landingpage/btn-chrome.png";

const _hoisted_1$1 = { class: "main-layout relative w-full h-full max-h-full flex flex-col et-js-ic" };
const _hoisted_2$1 = { class: "grow w-full flex flex-row et-jc-ic overflow-hidden" };
const _hoisted_3$1 = { class: "main-layout-content relative flex flex-col grow w-full overflow-x-hidden overflow-y-hidden" };
const _hoisted_4$1 = { class: "flex flex-col relative h-full scroll-anchor mr-1 sm:mr-2 lg:mr-0 pr-0 sm:pr-1 pt-3 sm:pt-5 lg:pt-7 overflow-x-hidden overflow-y-scroll content-scroll et-scrollbar" };
const _hoisted_5$1 = { class: "pb-4 lg:pb-4 pt-15 sm:pt-24 pl-1 pr-1" };
const _hoisted_6$1 = { class: "absolute top-0 left-0 right-0 flex flex-col et-js-is bg-black/20 backdrop-blur-modal" };
const _hoisted_7$1 = { class: "main-layout-header w-full flex flex-row et-jc-is" };
const _hoisted_8$1 = { class: "shrink-0 grow h-full flex flex-row et-jb-ic et-gap-sm pl-1" };
const _hoisted_9$1 = {
  key: 0,
  class: "main-layout-header-center shrink-0 grow h-full flex flex-row et-js-ic"
};
const _hoisted_10$1 = {
  key: 1,
  class: "main-layout-header-right shrink-0 h-full flex flex-row et-js-ic et-gap-xs"
};
const _hoisted_11 = { class: "main-layout-progress-bar w-full" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LayoutLandingPage",
  setup(__props) {
    useRouter();
    const slots = useSlots();
    useScreenSize();
    const isDesktopMenuCollapsed = ref(false);
    const hasSlotHeaderCenter = computed(() => slots.hasOwnProperty("header-center"));
    const hasSlotHeaderRight = computed(() => slots.hasOwnProperty("header-right"));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", {
            class: normalizeClass(["main-layout-page relative shrink-0 w-full h-full pl-0 xs:pl-3 sm:pl-5 lg:pl-6 lg:pr-2 transition-all flex flex-col lg:flex lg:flex-row gap-x-4 sm:gap-x-6 et-max-width-global overflow-hidden", isDesktopMenuCollapsed.value ? "lg:gap-x-6" : "lg:gap-x-10"])
          }, [
            createBaseVNode("div", _hoisted_3$1, [
              createBaseVNode("main", _hoisted_4$1, [
                createBaseVNode("div", _hoisted_5$1, [
                  renderSlot(_ctx.$slots, "content", {}, void 0, true)
                ])
              ])
            ])
          ], 2)
        ]),
        createBaseVNode("div", _hoisted_6$1, [
          createBaseVNode("header", _hoisted_7$1, [
            createBaseVNode("div", {
              class: normalizeClass(["main-layout-header-left flex flex-row et-jb-ic w-full et-header et-header-p gap-x-4 sm:gap-x-6 et-max-width-global", isDesktopMenuCollapsed.value ? "lg:gap-x-6" : "lg:gap-x-10"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["relative shrink-0 grow-0 flex flex-col et-jc-is lg:w-full lg:grow h-full transition-all", isDesktopMenuCollapsed.value ? "max-w-16" : "lg:et-max-width-menu"])
              }, [
                createVNode(_sfc_main$2)
              ], 2),
              createBaseVNode("div", _hoisted_8$1, [
                hasSlotHeaderCenter.value ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
                  renderSlot(_ctx.$slots, "header-center", {}, void 0, true)
                ])) : createCommentVNode("", true),
                hasSlotHeaderRight.value ? (openBlock(), createElementBlock("div", _hoisted_10$1, [
                  renderSlot(_ctx.$slots, "header-right", {}, void 0, true)
                ])) : createCommentVNode("", true)
              ])
            ], 2)
          ]),
          createBaseVNode("div", _hoisted_11, [
            renderSlot(_ctx.$slots, "progress-bar", {}, void 0, true)
          ])
        ])
      ]);
    };
  }
});

const LayoutLandingPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c5fc6fea"]]);

const _hoisted_1 = { class: "w-full landing-max-width flex flex-col et-js-ic gap-32 mt-20 mx-auto px-4" };
const _hoisted_2 = { class: "section-0 relative w-full max-w-7xl h-full flex flex-col et-js-is et-gap-xl md:et-gap-lg" };
const _hoisted_3 = { class: "relative w-full flex flex-col et-gap-lg" };
const _hoisted_4 = { class: "relative flex flex-row et-gap-sm 3xs:pl-2 sm:pl-0" };
const _hoisted_5 = {
  key: 0,
  class: "relative w-full flex flex-col sm:flex-row et-gap-lg md:et-ie pl-2 xs:pl-0"
};
const _hoisted_6 = { class: "max-w-72 flex flex-col et-jc-ic et-gap-xs et-bg-1 rounded-2xl shadow-2xl self-start md:self-none" };
const _hoisted_7 = { class: "p-4 flex flex-col et-jc-ic et-gap-md" };
const _hoisted_8 = { class: "flex flex-col h-full et-gap-md" };
const _hoisted_9 = { class: "max-w-72 flex flex-col et-jc-ic et-gap-xs et-bg-1 rounded-2xl shadow-2xl" };
const _hoisted_10 = { class: "p-4 flex flex-col et-jc-ic et-gap-md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LandingPage",
  setup(__props) {
    const { gotoHome } = useNavigation();
    const openWallet = () => {
      console.log("open wallet");
      gotoHome();
    };
    const openLink = (target) => {
      window.open(target, void 0, "noopener,noreferrer");
    };
    const openAppStore = () => {
      openLink("https://apps.apple.com/de/app/eternl-by-tastenkunst/id1603854385");
    };
    const openPlayStore = () => {
      openLink("https://play.google.com/store/apps/details?id=io.ccvault.v1.main");
    };
    const openWebStore = () => {
      openLink("https://chromewebstore.google.com/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka");
    };
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      const _component_Button = resolveComponent("Button");
      const _component_Divider = resolveComponent("Divider");
      return openBlock(), createBlock(LayoutLandingPage, null, {
        "header-center": withCtx(() => [..._cache[0] || (_cache[0] = [])]),
        "header-right": withCtx(() => [..._cache[1] || (_cache[1] = [])]),
        "progress-bar": withCtx(() => [
          createVNode(_sfc_main$3)
        ]),
        content: withCtx(() => [
          createVNode(_component_router_view),
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                _cache[2] || (_cache[2] = createBaseVNode("div", { class: "w-full flex flex-col et-gap-md md:et-gap-lg" }, [
                  createBaseVNode("div", { class: "relative et-tx-lp-headline et-text-3xl xs:et-text-4xl sm:et-text-5xl md:et-text-6xl xl:et-text-7xl tracking-tight font-bold pl-2 xs:pl-0" }, [
                    createTextVNode(" A modern Cardano wallet."),
                    createBaseVNode("br"),
                    createTextVNode(" For everyone. ")
                  ]),
                  createBaseVNode("div", { class: "relative et-text-2xl xs:et-text-4xl sm:et-text-4xl md:et-text-5xl xl:et-text-6xl max-w-[50%] pl-2 xs:pl-0" }, [
                    createTextVNode(" Friendly for beginners."),
                    createBaseVNode("br"),
                    createTextVNode(" Powerful for pro users. ")
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_4, [
                  createVNode(_component_Button, {
                    label: "Open app",
                    severity: "primary",
                    rounded: "",
                    onClick: openWallet
                  })
                ])
              ]),
              !unref(isMobileApp)() ? (openBlock(), createElementBlock("div", _hoisted_5, [
                createBaseVNode("div", _hoisted_6, [
                  _cache[6] || (_cache[6] = createBaseVNode("div", { class: "p-4 flex flex-col et-jc-ic text-center" }, [
                    createBaseVNode("span", { class: "et-text-lg font-bold" }, "Mobile Dapps"),
                    createBaseVNode("span", { class: "et-text-sm" }, "(Dapp browser)")
                  ], -1)),
                  createVNode(_component_Divider, { class: "my-0" }),
                  createBaseVNode("div", _hoisted_7, [
                    _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-center et-text-md text-txt-muted" }, 'Your Cardano wallet "to go", now with DApp support:', -1)),
                    createVNode(_component_Button, {
                      class: "w-full py-2",
                      severity: "secondary",
                      outlined: "",
                      rounded: "",
                      onClick: openPlayStore
                    }, {
                      default: withCtx(() => [..._cache[3] || (_cache[3] = [
                        createBaseVNode("img", {
                          src: _imports_0,
                          width: "128",
                          height: "35"
                        }, null, -1)
                      ])]),
                      _: 1
                    }),
                    createVNode(_component_Button, {
                      class: "w-full py-2",
                      severity: "secondary",
                      outlined: "",
                      rounded: "",
                      onClick: openAppStore
                    }, {
                      default: withCtx(() => [..._cache[4] || (_cache[4] = [
                        createBaseVNode("img", {
                          src: _imports_1,
                          width: "128",
                          height: "35"
                        }, null, -1)
                      ])]),
                      _: 1
                    })
                  ])
                ]),
                createBaseVNode("div", _hoisted_8, [
                  _cache[10] || (_cache[10] = createBaseVNode("span", { class: "et-text-md text-txt-muted" }, "Or install add-on:", -1)),
                  createBaseVNode("div", _hoisted_9, [
                    _cache[9] || (_cache[9] = createBaseVNode("div", { class: "p-4 flex flex-col et-jc-ic text-center" }, [
                      createBaseVNode("span", { class: "et-text-lg font-bold" }, "Browser Extension"),
                      createBaseVNode("span", { class: "et-text-sm" }, "(Dapp connector & Dapp Browser)")
                    ], -1)),
                    createVNode(_component_Divider, { class: "my-0" }),
                    createBaseVNode("div", _hoisted_10, [
                      _cache[8] || (_cache[8] = createBaseVNode("span", { class: "text-center et-text-md text-txt-muted" }, "For Chrome, Edge, Brave and Opera browser extensions visit:", -1)),
                      createVNode(_component_Button, {
                        class: "w-auto py-2",
                        severity: "secondary",
                        outlined: "",
                        rounded: "",
                        onClick: openWebStore
                      }, {
                        default: withCtx(() => [..._cache[7] || (_cache[7] = [
                          createBaseVNode("img", {
                            src: _imports_2,
                            width: "184",
                            height: "35"
                          }, null, -1)
                        ])]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true)
            ]),
            _cache[11] || (_cache[11] = createBaseVNode("footer", { class: "relative w-full flex flex-row et-bg-1 et-txt-1 rounded-2xl shadow-2xl mt-72 px-4 md:px-10 py-4 md:py-8 text-txt-content" }, [
              createBaseVNode("div", { class: "w-1/4 flex flex-col et-js-is gap-1.5 et-text-sm" }, [
                createBaseVNode("span", { class: "text-gray-300 pb-2 et-text-md font-bold" }, "Resources"),
                createBaseVNode("a", {
                  target: "_blank",
                  href: "https://wiki.eternl.io/",
                  class: "hover:text-txt-muted transition-colors"
                }, "Wiki"),
                createBaseVNode("a", {
                  target: "_blank",
                  href: "https://tastenkunst.com/imprint",
                  class: "hover:text-txt-muted transition-colors"
                }, "Imprint")
              ]),
              createBaseVNode("div", { class: "w-1/4 flex flex-col et-js-is gap-1.5 et-text-sm" }, [
                createBaseVNode("span", { class: "text-gray-300 pb-2 et-text-md font-bold" }, "Social"),
                createBaseVNode("a", {
                  target: "_blank",
                  href: "https://x.com/eternlwallet",
                  class: "hover:text-txt-muted transition-colors"
                }, "X.com"),
                createBaseVNode("a", {
                  target: "_blank",
                  href: "https://discord.gg/eternlwallet",
                  class: "hover:text-txt-muted transition-colors"
                }, "Discord"),
                createBaseVNode("a", {
                  target: "_blank",
                  href: "https://t.me/eternlio",
                  class: "hover:text-txt-muted transition-colors"
                }, "Telegram")
              ]),
              createBaseVNode("div", { class: "grow" }),
              createBaseVNode("div", { class: "w-1/4 flex flex-col et-je-ie" }, [
                createBaseVNode("span", { class: "et-text-sm text-txt-muted" }, "© Eternl 2025")
              ])
            ], -1))
          ])
        ]),
        _: 1
      });
    };
  }
});

const LandingPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4890f9c0"]]);

export { LandingPage as default };
