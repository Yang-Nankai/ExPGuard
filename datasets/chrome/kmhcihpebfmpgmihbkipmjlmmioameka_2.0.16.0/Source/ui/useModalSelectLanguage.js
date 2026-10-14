import { e as ref } from './index.js';

const _show = ref(false);
const open = () => {
  _show.value = true;
};
const close = () => {
  _show.value = false;
};
const useModalSelectLanguage = () => {
  return {
    showModalSelectLanguage: _show,
    openModalSelectLanguage: open,
    closeModalSelectLanguage: close
  };
};

export { useModalSelectLanguage as u };
