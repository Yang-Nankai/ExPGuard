import { _ as _export_sfc, r as ref, o as onBeforeMount, a as onMounted, w as watchEffect, c as createElementBlock, b as createBaseVNode, t as toDisplayString, d as createCommentVNode, F as Fragment, e as renderList, f as openBlock, n as normalizeClass, g as createTextVNode, h as withDirectives, v as vShow } from "./index.js";
import { u as useUserStore } from "./user.js";
import { c as changeLan } from "./user2.js";
const _hoisted_1 = { class: "section-box" };
const _hoisted_2 = { class: "section-title" };
const _hoisted_3 = { class: "option-card flex" };
const _hoisted_4 = { class: "option-item-title" };
const _hoisted_5 = { class: "land" };
const _hoisted_6 = {
  key: 0,
  class: "history_open",
  style: { "width": "150px" }
};
const _hoisted_7 = ["onClick"];
const _hoisted_8 = {
  t: "1754376917995",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "4521",
  width: "16",
  height: "16",
  class: "icon"
};
const _sfc_main = {
  __name: "conmon",
  setup(__props, { expose: __expose }) {
    const userStore = useUserStore();
    const landList = ref([{
      key: "简体中文",
      value: "zh-CN"
    }, {
      key: "繁體中文",
      value: "zh-TW"
    }, {
      key: "English",
      value: "en"
    }]);
    const land = ref({
      key: "简体中文",
      value: "zh-CN"
    });
    const showLandlist = ref(false);
    const changeLand = async (item) => {
      const { id } = userStore.userInfo;
      land.value = item;
      localStorage.setItem("language", item.value);
      userStore.land = item.value;
      await changeLan({ app_id: "onlyask", id, language: land.value.value });
      location.reload(true);
    };
    onBeforeMount(() => {
      const language = localStorage.getItem("language");
      land.value = landList.value.find((item) => item.value === language);
    });
    onMounted(() => {
    });
    watchEffect(() => {
    });
    __expose({});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, toDisplayString(_ctx.$t("seting.Appearance")), 1),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.$t("seting.DisplayLand")), 1),
          createBaseVNode("div", {
            class: "option-select",
            onClick: _cache[0] || (_cache[0] = ($event) => showLandlist.value = !showLandlist.value)
          }, [
            createBaseVNode("div", _hoisted_5, toDisplayString(land.value.key), 1),
            _cache[2] || (_cache[2] = createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "10",
              height: "10",
              fill: "none",
              viewBox: "0 0 60 60",
              class: "shrink-0 transition-transform"
            }, [
              createBaseVNode("path", {
                fill: "currentColor",
                "fill-rule": "evenodd",
                d: "M51.828 21.172a4 4 0 0 1 0 5.656L34.243 44.414a6 6 0 0 1-8.486 0L8.172 26.828a4 4 0 1 1 5.656-5.656L30 37.343l16.172-16.171a4 4 0 0 1 5.656 0",
                "clip-rule": "evenodd"
              })
            ], -1)),
            showLandlist.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(landList.value, (item) => {
                return openBlock(), createElementBlock("div", {
                  class: normalizeClass(["history_open_select", { "history_open_select_success": land.value.key == item.key }]),
                  onClick: ($event) => changeLand(item)
                }, [
                  createTextVNode(toDisplayString(item.key) + " ", 1),
                  withDirectives((openBlock(), createElementBlock("svg", _hoisted_8, [..._cache[1] || (_cache[1] = [
                    createBaseVNode("path", {
                      d: "M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z",
                      "p-id": "4522",
                      fill: "currentColor"
                    }, null, -1)
                  ])], 512)), [
                    [vShow, land.value.key == item.key]
                  ])
                ], 10, _hoisted_7);
              }), 256))
            ])) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
};
const conmon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0947499"]]);
export {
  conmon as default
};
