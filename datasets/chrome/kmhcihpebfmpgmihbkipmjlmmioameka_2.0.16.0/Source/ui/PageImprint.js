import { I as ImprintContent } from './ImprintContent.js';
import { d as defineComponent, m as createElementBlock, o as openBlock, n as createVNode } from './index.js';
import './_plugin-vue_export-helper.js';
import './useResetScroll.js';
import './IconEmail.js';
import './TabsToSelect.vue_vue_type_script_setup_true_lang.js';
import './NetworkId.js';

const _hoisted_1 = { class: "w-full h-full p-4 sm:p-8 flex flex-col overflow-x-hidden overflow-y-auto et-gap-md et-scrollbar" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageImprint",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(ImprintContent)
      ]);
    };
  }
});

export { _sfc_main as default };
