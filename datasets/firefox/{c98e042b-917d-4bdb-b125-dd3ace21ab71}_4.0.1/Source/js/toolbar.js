"use strict";

let portClient;

function i18n(key, fallback) {
  return exlib.i18nString(key) || fallback;
}

function initLabels() {
  $("#menu-refresh").title = i18n("refresh", "Refresh");
  $("#menu-options").title = i18n("options", "Options");
  $("#menu-help").title = i18n("help", "Help");
}

function postTrustedCommand(event, command) {
  if (!event.isTrusted || !portClient) return;
  portClient.post(command);
}

function onPortMessage(message) {
  if (
    message &&
    message.event === DashboardEvent.COMMAND_RESULT &&
    !message.ok
  ) {
    console.warn("Toolbar command rejected:", message.command, message.error);
  }
}

function initEvents() {
  $("#menu-refresh").addEventListener("click", event => {
    postTrustedCommand(event, DashboardCommand.REFRESH);
  });
  $("#menu-options").addEventListener("click", event => {
    postTrustedCommand(event, DashboardCommand.OPEN_OPTIONS);
  });
  $("#menu-help").addEventListener("click", event => {
    postTrustedCommand(event, DashboardCommand.OPEN_HELP);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLabels();
  initEvents();
  portClient = createDashboardPortClient(DashboardPort.TOOLBAR, onPortMessage);
});

window.addEventListener("unload", () => {
  if (portClient) portClient.close();
});
