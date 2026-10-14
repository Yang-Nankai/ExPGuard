import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { c as createBlock, o as openBlock, y as withCtx, a0 as renderSlot, z as resolveComponent } from './index.js';

const _sfc_main = {  };

function _sfc_render(_ctx, _cache) {
  const _component_Card = resolveComponent("Card");

  return (openBlock(), createBlock(_component_Card, {
    class: "w-full max-w-full",
    pt: { body: 'pt-2 px-2' }
  }, {
    content: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }))
}
const CardDataTable = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { CardDataTable as C };
