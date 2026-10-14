import { _ as _sfc_main$2, b as _sfc_main$5, a as _sfc_main$6 } from './AdaPriceChart.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$3 } from './StakeRewardsChart.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './SwapElement.vue_vue_type_script_setup_true_lang.js';
import { I as IconTransactionOutline } from './IconTransactionOutline.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { m as createElementBlock, o as openBlock, p as createBaseVNode, e as ref } from './index.js';
import { I as IconStakingOutline } from './IconStakingOutline.js';
import { I as IconMonsterSwap } from './IconMonsterSwap.js';

const _sfc_main$1 = {  };

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M12.5 20h-2c-3.759 0-5.638 0-6.893-.99a4.4 4.4 0 0 1-.554-.523C2 17.307 2 15.537 2 12s0-5.306 1.053-6.487q.253-.284.554-.522C4.862 4 6.741 4 10.5 4h3c3.759 0 5.638 0 6.892.99q.302.24.555.523c.892 1 1.029 2.423 1.05 4.987M18.5 20v-7M15 16.5h7M2 9h20",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconCreditCardAdd = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render$1]]);

const _sfc_main = {  };

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      stroke: "currentColor",
      color: "currentColor",
      d: "M2.75 8.99805C2.75 8.03155 3.5335 7.24805 4.5 7.24805H5.5C6.4665 7.24805 7.25 8.03155 7.25 8.99805V18.998C7.25 19.9645 6.4665 20.748 5.5 20.748H4.5C3.5335 20.748 2.75 19.9645 2.75 18.998V8.99805Z"
    }, null, -1),
    createBaseVNode("path", {
      stroke: "currentColor",
      color: "currentColor",
      d: "M9.75 5C9.75 4.0335 10.5335 3.25 11.5 3.25H12.5C13.4665 3.25 14.25 4.0335 14.25 5V18.9995C14.25 19.966 13.4665 20.7495 12.5 20.7495H11.5C10.5335 20.7495 9.75 19.966 9.75 18.9995V5Z"
    }, null, -1),
    createBaseVNode("path", {
      stroke: "currentColor",
      color: "currentColor",
      d: "M16.75 11.998C16.75 11.0315 17.5335 10.248 18.5 10.248H19.5C20.4665 10.248 21.25 11.0315 21.25 11.998V18.998C21.25 19.9645 20.4665 20.748 19.5 20.748H18.5C17.5335 20.748 16.75 19.9645 16.75 18.998V11.998Z"
    }, null, -1)
  ]))]))
}
const IconChart = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

const componentMap = {
  "AccountCard": {
    label: "Account Card",
    icon: IconCreditCardAdd,
    cName: "AccountCard",
    c: _sfc_main$6,
    defaultConfig: { w: 4, h: 7 },
    propsConfig: []
  },
  "RecentTransactions": {
    label: "Recent Transactions",
    icon: IconTransactionOutline,
    cName: "RecentTransactions",
    c: _sfc_main$5,
    defaultConfig: { w: 4, h: 16 },
    propsConfig: []
  },
  "SwapElement": {
    label: "MonsterSwap Widget",
    icon: IconMonsterSwap,
    cName: "SwapElement",
    c: _sfc_main$4,
    defaultConfig: { w: 4, h: 15 },
    propsConfig: []
  },
  "StakeRewardsChart": {
    label: "Stake Rewards Chart",
    icon: IconStakingOutline,
    cName: "StakeRewardsChart",
    c: _sfc_main$3,
    defaultConfig: { w: 4, h: 6 },
    propsConfig: []
  },
  "AdaPriceChart": {
    label: "Cardano Price Chart",
    icon: IconChart,
    cName: "AdaPriceChart",
    c: _sfc_main$2,
    defaultConfig: { w: 4, h: 6 },
    propsConfig: []
  }
};
const menuStyle = ref("compact");
const useLayout = () => {
  const setMenuStyle = (style) => {
    menuStyle.value = style;
  };
  const switchMenuStyle = () => {
    if (menuStyle.value === "walletlist") {
      menuStyle.value = "compact";
      return;
    } else {
      menuStyle.value = "walletlist";
      return;
    }
  };
  return {
    setMenuStyle,
    switchMenuStyle,
    menuStyle
  };
};
const useLayoutBuilder = (namespace) => {
  const _namespace = namespace;
  const layoutLoaded = ref(false);
  const isEditing = ref(false);
  const layout = ref([
    { id: 0, x: 0, y: 0, w: 4, h: 7, component: "AccountCard" },
    { id: 1, x: 0, y: 7, w: 4, h: 4, component: "RecentTransactions", props: { showAssets: true, numEntries: 4 } },
    { id: 2, x: 0, y: 7, w: 4, h: 4 },
    { id: 3, x: 0, y: 7, w: 4, h: 4 }
  ]);
  const handleMove = () => {
    localStorage.setItem("et_CustomLayout_" + _namespace, JSON.stringify(layout.value));
  };
  const initializeLayout = () => {
    const _layout = localStorage.getItem("et_CustomLayout_" + _namespace);
    if (_layout) {
      layout.value = JSON.parse(_layout);
    }
    layoutLoaded.value = true;
  };
  const addComponentToLayout = (component) => {
    layout.value.push({
      component: component.cName,
      id: layout.value.length + 1,
      x: 0,
      y: 0,
      ...component.defaultConfig,
      props: { showAssets: true, numEntries: 4 }
    });
    handleMove();
  };
  const removeComponentById = (id) => {
    layout.value = layout.value.filter((_component) => _component.id !== id);
    handleMove();
  };
  return {
    componentMap,
    isEditing,
    handleMove,
    layout,
    layoutLoaded,
    initializeLayout,
    addComponentToLayout,
    removeComponentById,
    menuStyle
  };
};

export { useLayoutBuilder as a, useLayout as u };
