import { e as ref } from './index.js';

const _show = ref(false);
const openModalCatalystRegistration = () => {
  _show.value = true;
};
const closeModalCatalystRegistration = () => {
  _show.value = false;
};
const useModalCatalystRegistration = () => {
  return {
    showModalCatalystRegistration: _show,
    openModalCatalystRegistration,
    closeModalCatalystRegistration
  };
};

export { useModalCatalystRegistration as u };
