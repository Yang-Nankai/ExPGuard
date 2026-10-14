import { D as computed, cc as getAppMode, cd as toggleAppMode, ce as setAppMode } from './index.js';

const appMode = getAppMode();
const useAppMode = () => {
  const isProMode = computed(() => appMode.value === "pro");
  const isSimpleMode = computed(() => appMode.value === "simple");
  return {
    isProMode,
    isSimpleMode,
    setAppMode,
    toggleAppMode
  };
};

export { useAppMode as u };
