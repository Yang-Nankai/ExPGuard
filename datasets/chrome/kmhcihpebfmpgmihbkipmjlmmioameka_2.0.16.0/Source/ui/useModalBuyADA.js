import { e as ref } from './index.js';

const _tweenUp = ref(false);
const _show = ref(false);
const openModalBuyADA = (tweenUp) => {
  _tweenUp.value = tweenUp ?? false;
  _show.value = true;
  setTimeout(() => {
    _tweenUp.value = false;
  }, 75);
};
const closeModalBuyADA = (tweenUp) => {
  if (tweenUp) {
    _tweenUp.value = tweenUp ?? false;
  } else {
    _tweenUp.value = false;
    _show.value = false;
  }
};
const useModalBuyADA = () => {
  return {
    showModalBuyADA: _show,
    tweenUpModalBuyADA: _tweenUp,
    openModalBuyADA,
    closeModalBuyADA
  };
};

export { useModalBuyADA as u };
