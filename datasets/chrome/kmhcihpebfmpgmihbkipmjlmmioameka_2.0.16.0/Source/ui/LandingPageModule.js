const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["ui/LandingPage.js","ui/index.js","ui/NetworkId.js","assets/index.css","ui/useNavigation.js","ui/epochParams.js","ui/send.js","ui/useResetScroll.js","ui/EternlLogoLayout.vue_vue_type_script_setup_true_lang.js","ui/useChainProgress.js","ui/chain.js","ui/chainTip.js","ui/GradientBar2.js","ui/index2.js","ui/_plugin-vue_export-helper.js","assets/GradientBar2.css","assets/LandingPage.css"])))=>i.map(i=>d[i]);
import { d as defineComponent, c as createBlock, o as openBlock, u as unref, a as defineAsyncComponent, _ as __vitePreload } from './index.js';
import './currency.js';
import { u as useModuleLoader } from './useModuleLoader.js';
import './NetworkId.js';
import './useCurrencyAPI.js';
import './bigmath.js';
import './currency2.js';
import './index2.js';

const moduleId = "landingPageModule";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LandingPageModule",
  setup(__props) {
    const {
      addModule,
      updateModuleLoadProgress
    } = useModuleLoader();
    addModule(moduleId);
    const Module = defineAsyncComponent({
      loader: async () => {
        updateModuleLoadProgress(moduleId, 0.05);
        updateModuleLoadProgress(moduleId, 0.25);
        const _comp = await __vitePreload(() => import('./LandingPage.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]):void 0);
        updateModuleLoadProgress(moduleId, 1);
        return _comp;
      },
      delay: 0
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Module));
    };
  }
});

export { _sfc_main as default };
