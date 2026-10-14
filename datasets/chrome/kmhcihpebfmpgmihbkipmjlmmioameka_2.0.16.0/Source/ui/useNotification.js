import { aE as addSignalListener } from './index.js';
import { c as doShowUiNotification } from './notification.js';

const DEFAULT_LIFE = 5e3;
let _$toast;
let listenerAttached = false;
const storeId = "useNotifications";
const useNotifications = ($toast) => {
  if ($toast) {
    _$toast = $toast;
  }
  const {
    add,
    remove,
    removeGroup,
    removeAllGroups
  } = _$toast;
  const mapPosition = (position) => {
    switch (position) {
      case "top":
        return "top-center";
      case "bottom":
        return "bottom-center";
      case "top-right":
        return "top-right";
      case "top-left":
        return "top-left";
      case "bottom-right":
        return "bottom-right";
      case "bottom-left":
        return "bottom-left";
      case "bottom-center":
        return "bottom-center";
      default:
        return "top-right";
    }
  };
  const mapSeverity = (type) => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "info":
        return "info";
      case "warning":
        return "warn";
      default:
        return "info";
    }
  };
  const show = (payload) => {
    return add({
      summary: payload.message,
      severity: "custom",
      type: mapSeverity(payload.type),
      life: payload.options?.duration ?? DEFAULT_LIFE,
      position: mapPosition(payload.options?.position),
      group: "toasts"
    });
  };
  const showLoading = (message) => {
    return add({
      group: "toasts",
      summary: message.message,
      type: mapSeverity(message.type),
      position: mapPosition(message.options?.position),
      life: DEFAULT_LIFE
    });
  };
  const dismiss = (message) => {
    remove(message);
  };
  const showSuccess = (message) => {
    add({
      severity: "custom",
      group: "toasts",
      type: "success",
      summary: message,
      life: DEFAULT_LIFE
    });
  };
  const showError = (message) => {
    console.error(message);
    add({
      severity: "custom",
      type: "error",
      group: "toasts",
      summary: message,
      life: DEFAULT_LIFE
    });
  };
  const showInfo = (message) => {
    add({
      severity: "custom",
      type: "info",
      group: "toasts",
      summary: message,
      life: DEFAULT_LIFE
    });
  };
  const showWarning = (message) => {
    add({
      severity: "custom",
      type: "warn",
      summary: message,
      group: "toasts",
      life: DEFAULT_LIFE
    });
  };
  const showCopied = (message) => {
    add({
      severity: "custom",
      group: "copied",
      summary: message,
      life: DEFAULT_LIFE
    });
  };
  if (!listenerAttached) {
    addSignalListener(doShowUiNotification, storeId, (message) => {
      return show(message);
    });
    listenerAttached = true;
  }
  return {
    show,
    dismiss,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showCopied,
    showLoading
  };
};

export { useNotifications as u };
