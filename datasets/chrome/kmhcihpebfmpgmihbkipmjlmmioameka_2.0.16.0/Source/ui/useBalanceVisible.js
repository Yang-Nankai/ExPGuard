import { D as computed, d1 as getBalanceVisible } from './index.js';

const balanceVisible = getBalanceVisible();
const useBalanceVisible = () => {
  const setBalanceVisible = (visible) => {
    balanceVisible.value = visible;
  };
  const isBalanceVisible = computed(() => balanceVisible.value);
  return {
    isBalanceVisible,
    setBalanceVisible
  };
};

export { useBalanceVisible as u };
