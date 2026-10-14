import { m as medianROS, f as avgROS } from './useAppAccountBalances.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useModalStakePoolList } from './useModalStakePoolList.js';
import { u as useModalRewardHistory, a as _sfc_main$1 } from './CardStakePoolCompact.vue_vue_type_script_setup_true_lang.js';
import { d as defineComponent, c as createBlock, t as createCommentVNode, u as unref, o as openBlock } from './index.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CardAccountStakePool",
  props: {
    showOpenPoolList: { type: Boolean, required: false, default: true },
    showOpenHistory: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const {
      openModalStakePoolList
    } = useModalStakePoolList();
    const {
      openModalRewardHistory
    } = useModalRewardHistory();
    const { accountSettings } = useSelectedAccount();
    const stakedPool = accountSettings.stakedPool;
    return (_ctx, _cache) => {
      return unref(stakedPool) ? (openBlock(), createBlock(_sfc_main$1, {
        key: 0,
        class: "break-inside-avoid",
        pool: unref(stakedPool),
        avgROS: unref(avgROS),
        medianROS: unref(medianROS),
        "hide-retired": false,
        "show-open-pool-list": __props.showOpenPoolList,
        "show-open-history": __props.showOpenHistory,
        "is-open": "",
        "current-pool": "",
        onOpenPoolList: unref(openModalStakePoolList),
        onOpenStakeHistory: unref(openModalRewardHistory)
      }, null, 8, ["pool", "avgROS", "medianROS", "show-open-pool-list", "show-open-history", "onOpenPoolList", "onOpenStakeHistory"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
