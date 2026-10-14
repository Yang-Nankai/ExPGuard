import { e as ref } from './index.js';

const _show = ref(false);
const _filter = ref("");
const openModalStakePoolList = (poolIdOrHexOrTicker) => {
  _show.value = true;
  _filter.value = poolIdOrHexOrTicker ?? "";
};
const closeModalStakePoolList = () => {
  _show.value = false;
  _filter.value = "";
};
const useModalStakePoolList = () => {
  return {
    showModalStakePoolList: _show,
    filter: _filter,
    openModalStakePoolList,
    closeModalStakePoolList
  };
};

export { useModalStakePoolList as u };
