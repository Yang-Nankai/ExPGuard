import { e as ref } from './index.js';

const showPreloader = ref(true);
const transitionName = ref("fade");
const progress = ref(0);
const hidePreloader = () => {
  showPreloader.value = false;
};
const reloadPreloader = () => {
  showPreloader.value = true;
  progress.value = 0;
  transitionName.value = "";
};
const usePreloader = () => {
  return {
    showPreloader,
    progress,
    transitionName,
    hidePreloader,
    reloadPreloader
  };
};

export { usePreloader as u };
