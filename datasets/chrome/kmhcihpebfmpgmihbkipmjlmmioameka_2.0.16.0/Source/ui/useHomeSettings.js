import { G as watch, e as ref, Z as useLocalStorage, j as isIosApp } from './index.js';

const showStakeKeyOnHome = useLocalStorage("showStakeKeyOnHome", !isIosApp(), { listenToStorageChanges: true });
const showAdaChartOnHome = useLocalStorage("showAdaChartOnHome", true, { listenToStorageChanges: true });
const showRewardsChartOnHome = useLocalStorage("showRewardsChartOnHome", !isIosApp(), { listenToStorageChanges: true });
const showStakePoolOnHome = useLocalStorage("showStakePoolOnHome", !isIosApp(), { listenToStorageChanges: true });
const showDRepOnHome = useLocalStorage("showDRepOnHome", !isIosApp(), { listenToStorageChanges: true });
const showBlurBgs = useLocalStorage("showBlurBgs", true, { listenToStorageChanges: true });
const fixAndroidBottomNavi = useLocalStorage("fixAndroidBottomNavi", false, { listenToStorageChanges: true });
const showMonsterSwapOnHome = useLocalStorage("showMonsterSwapOnHome", true, { listenToStorageChanges: true });
const isMonsterSwapAllowed = ref(false);
const useHomeSettings = () => {
  watch(fixAndroidBottomNavi, () => {
    if (fixAndroidBottomNavi.value) {
      document.body.classList.add("fix-android-bottom-navi");
    } else {
      document.body.classList.remove("fix-android-bottom-navi");
    }
  });
  return {
    showStakeKeyOnHome,
    showAdaChartOnHome,
    showRewardsChartOnHome,
    showStakePoolOnHome,
    showDRepOnHome,
    showBlurBgs,
    fixAndroidBottomNavi,
    showMonsterSwapOnHome,
    isMonsterSwapAllowed
  };
};

export { useHomeSettings as u };
