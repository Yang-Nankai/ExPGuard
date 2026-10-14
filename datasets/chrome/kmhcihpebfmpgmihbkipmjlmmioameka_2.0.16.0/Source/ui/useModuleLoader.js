import { g as gsapWithCSS } from './index2.js';
import { e as ref, Q as reactive } from './index.js';

const _moduleIdList = reactive([]);
const _moduleLoadingProgress = ref({});
const _showModuleLoaderBar = ref(false);
const _progress = ref(0);
const __tweenProgress = {
  value: 0
};
const addModule = (moduleId) => {
  if (_moduleIdList.includes(moduleId)) {
    return;
  }
  _moduleIdList.push(moduleId);
  _moduleLoadingProgress.value[moduleId] = Math.random() * 0.05 + 0.05;
  _showModuleLoaderBar.value = true;
};
const updateModuleLoadProgress = (moduleId, progress) => {
  if (!_moduleIdList.includes(moduleId)) {
    return;
  }
  _moduleLoadingProgress.value[moduleId] = progress;
  let numModules = 0;
  let currentProgress = 0;
  for (const id of _moduleIdList) {
    const moduleProgress = _moduleLoadingProgress.value[id];
    if (moduleProgress < 1) {
      numModules += 1;
      currentProgress += moduleProgress;
    }
  }
  if (numModules > 0) {
    _showModuleLoaderBar.value = true;
    tweenProgress(100 * (currentProgress / numModules));
  } else {
    if (_moduleIdList.length > 0) {
      tweenProgress(100);
    } else {
      tweenProgress(0);
    }
  }
};
const tweenProgress = (_value) => {
  if (_value === 0) {
    gsapWithCSS.to(__tweenProgress, {
      value: _value,
      duration: 0.1,
      delay: 0.1,
      ease: "power2.inOut",
      onUpdate: () => {
        _progress.value = Math.round(__tweenProgress.value * 100) / 100;
      }
    });
  } else {
    gsapWithCSS.to(__tweenProgress, {
      value: _value,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.inOut",
      onUpdate: () => {
        _progress.value = Math.round(__tweenProgress.value * 100) / 100;
        if (_progress.value >= 100) {
          _showModuleLoaderBar.value = false;
        }
      }
    });
  }
};
const resetProgress = () => {
  gsapWithCSS.killTweensOf(__tweenProgress);
  __tweenProgress.value = 0;
  _progress.value = 0;
};
const useModuleLoader = () => {
  return {
    progress: _progress,
    showModuleLoaderBar: _showModuleLoaderBar,
    addModule,
    updateModuleLoadProgress,
    resetProgress
  };
};

export { useModuleLoader as u };
