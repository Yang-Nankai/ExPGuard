"use strict";
const extApi = globalThis.browser ?? globalThis.chrome;

const DashboardClass = Object.freeze({
  ACTIVE: "xn-dashboard-active",
  PENDING: "xn-dashboard-pending"
});

if (!extApi.extension.inIncognitoContext) {
  document.documentElement.classList.add(DashboardClass.PENDING);
}

function mountToolbar() {
  const header = document.querySelector("#header");
  if (!header || document.querySelector("#xnotifier-toolbar")) return;

  const iframe = document.createElement("iframe");
  iframe.id = "xnotifier-toolbar";
  iframe.title = "X-notifier Toolbar";
  iframe.src = extApi.runtime.getURL("toolbar.html");
  iframe.setAttribute("aria-label", "X-notifier Toolbar");
  header.appendChild(iframe);
}

function mountDashboard() {
  const content = document.querySelector("#content");
  const sidebar = document.querySelector("#sidebar1");
  if (!content || !sidebar || document.querySelector("#xnotifier-dashboard")) return;

  const iframe = document.createElement("iframe");
  iframe.id = "xnotifier-dashboard";
  iframe.title = "X-notifier Dashboard";
  iframe.src = extApi.runtime.getURL("dashboard.html");
  iframe.setAttribute("aria-label", "X-notifier Dashboard");

  document.body.classList.add(DashboardClass.ACTIVE);
  content.replaceChildren(iframe);
}

function mountExtensionFrames() {
  if (extApi.extension.inIncognitoContext) return;
  try {
    mountToolbar();
    mountDashboard();
  } finally {
    document.documentElement.classList.remove(DashboardClass.PENDING);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountExtensionFrames, { once: true });
} else {
  mountExtensionFrames();
}
