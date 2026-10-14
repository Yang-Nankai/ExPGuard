"use strict";

function createDashboardPortClient(portName, onMessage, onConnectionChange) {
  let port = null;
  let reconnectTimer = null;
  let closed = false;

  function notifyConnection(connected) {
    if (onConnectionChange) onConnectionChange(connected);
  }

  function isContextValid() {
    try {
      return Boolean(extApi.runtime && extApi.runtime.id);
    } catch (error) {
      return false;
    }
  }

  // The extension context is invalidated when the extension reloads (e.g. after
  // saving settings). This page (an extension iframe) can then never reconnect,
  // so reload it to re-attach to the new extension instance. Throttle via
  // sessionStorage to avoid reload loops if the extension stays unavailable.
  function reloadForNewContext() {
    const key = "dashboardContextReloadAt";
    let last = 0;
    try {
      last = Number(sessionStorage.getItem(key)) || 0;
    } catch (error) {}
    if (Date.now() - last < 5000) return false;
    try {
      sessionStorage.setItem(key, String(Date.now()));
    } catch (error) {}
    location.reload();
    return true;
  }

  function scheduleReconnect() {
    if (closed) return;
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(connect, 1000);
  }

  function connect() {
    if (closed) return;
    clearTimeout(reconnectTimer);

    if (!isContextValid()) {
      if (reloadForNewContext()) return;
      scheduleReconnect();
      return;
    }

    try {
      port = extApi.runtime.connect({ name: portName });
      port.onMessage.addListener(message => {
        if (onMessage) onMessage(message);
      });
      port.onDisconnect.addListener(() => {
        port = null;
        notifyConnection(false);
        scheduleReconnect();
      });
      notifyConnection(true);
    } catch (error) {
      port = null;
      notifyConnection(false);
      scheduleReconnect();
    }
  }

  function post(command, payload) {
    if (!port) return false;
    try {
      port.postMessage(Object.assign({ command: command }, payload));
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  function close() {
    closed = true;
    clearTimeout(reconnectTimer);
    if (port) port.disconnect();
    port = null;
  }

  connect();
  return Object.freeze({
    post: post,
    close: close
  });
}
