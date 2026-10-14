import { e as ref } from './index.js';

const useModalOpen = () => {
  const showModal = ref(false);
  const doOpen = () => {
    showModal.value = true;
  };
  const onClose = () => {
    showModal.value = false;
  };
  return {
    showModal,
    doOpen,
    onClose
  };
};

export { useModalOpen as u };
