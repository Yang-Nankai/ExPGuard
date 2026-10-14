import { b as updateLog$1 } from "./user2.js";
import { _ as _export_sfc, r as ref, o as onBeforeMount, a as onMounted, w as watchEffect, c as createElementBlock, b as createBaseVNode, t as toDisplayString, F as Fragment, e as renderList, f as openBlock } from "./index.js";
const _hoisted_1 = { class: "containner" };
const _hoisted_2 = { class: "box" };
const _hoisted_3 = { class: "head-title" };
const _hoisted_4 = { style: { "font-size": "34px", "margin": "15px 0" } };
const _hoisted_5 = { class: "info" };
const _hoisted_6 = { class: "main" };
const _hoisted_7 = { class: "title" };
const _hoisted_8 = { class: "title-name" };
const _hoisted_9 = { class: "version" };
const _hoisted_10 = { class: "welcome" };
const _hoisted_11 = { class: "content" };
const _hoisted_12 = { class: "updateList" };
const _hoisted_13 = { class: "header" };
const _hoisted_14 = { class: "index" };
const _hoisted_15 = { class: "updateList-title" };
const _hoisted_16 = { class: "list" };
const _hoisted_17 = { class: "updateList-info" };
const _sfc_main = {
  __name: "update-log",
  setup(__props, { expose: __expose }) {
    const version = ref("1.0.8");
    const updateList = ref([]);
    const removeHtmlTag = (str) => {
      return str.replace(/<[^>]+>/g, "").trim();
    };
    const cleanText = (str) => {
      return str.replace(/&nbsp;/g, "").replace(/\s+/g, " ").replace(/, /g, ",").replace(/: /g, ":").trim();
    };
    const getUpdateLog = async () => {
      const result = await updateLog$1({
        app_id: "onlyask",
        land: localStorage.getItem("language") || "zh-CN",
        version: version.value
      });
      const pureText = removeHtmlTag(result.data.data.content);
      const finalText = cleanText(pureText);
      try {
        updateList.value = JSON.parse(finalText);
        console.log("解析后的JSON对象：", updateData);
      } catch (err) {
        console.error("JSON解析失败：", err);
      }
    };
    onBeforeMount(() => {
      {
        chrome.storage.local.get("currentVersion").then((data) => {
          version.value = data.currentVersion;
          getUpdateLog();
        });
      }
    });
    onMounted(() => {
    });
    watchEffect(() => {
    });
    __expose({});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h1", _hoisted_4, toDisplayString(_ctx.$t("version.info1")), 1),
            createBaseVNode("div", _hoisted_5, toDisplayString(_ctx.$t("version.info2")), 1)
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, toDisplayString(_ctx.$t("version.tip")), 1),
              createBaseVNode("div", _hoisted_9, toDisplayString(_ctx.$t("version.title")) + " " + toDisplayString(version.value), 1),
              createBaseVNode("div", _hoisted_10, toDisplayString(_ctx.$t("version.welcome")), 1)
            ]),
            createBaseVNode("div", _hoisted_11, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(updateList.value, (item, index) => {
                return openBlock(), createElementBlock("div", _hoisted_12, [
                  createBaseVNode("div", _hoisted_13, [
                    createBaseVNode("span", _hoisted_14, toDisplayString(index + 1), 1),
                    createBaseVNode("span", _hoisted_15, toDisplayString(item.title), 1)
                  ]),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.value, (value) => {
                    return openBlock(), createElementBlock("div", _hoisted_16, [
                      _cache[0] || (_cache[0] = createBaseVNode("span", { style: { "color": "#4caf50", "font-weight": "bold", "font-size": "16px", "margin-right": "10px" } }, "✓", -1)),
                      createBaseVNode("span", _hoisted_17, toDisplayString(value), 1)
                    ]);
                  }), 256))
                ]);
              }), 256))
            ])
          ])
        ])
      ]);
    };
  }
};
const updateLog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-264e726f"]]);
export {
  updateLog as default
};
