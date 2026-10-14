import { e as ref } from './index.js';

const _show = ref(false);
const open = () => {
  _show.value = true;
};
const close = () => {
  _show.value = false;
};
const useModalSelectCurrency = () => {
  return {
    showModalSelectCurrency: _show,
    openModalSelectCurrency: open,
    closeModalSelectCurrency: close
  };
};

export { useModalSelectCurrency as u };
