import { e as ref } from './index.js';

const isOpen = ref(false);
const openBiometricsAction = () => {
  console.warn("openBiometricsAction");
  isOpen.value = true;
};
const closeBiometricsAction = () => {
  console.warn("closeBiometricsAction");
  isOpen.value = false;
};
const useBiometricsAction = () => {
  return {
    isOpenBiometricsAction: isOpen,
    openBiometricsAction,
    closeBiometricsAction
  };
};

export { useBiometricsAction as u };
