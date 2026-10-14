"use strict";

function checkNow() {
  extApi.runtime.sendMessage({ cmd: "refresh" })
    .then(() => { window.close() });
}
function openDashboard() {
  extApi.runtime.sendMessage({ cmd: "iconClick" })
    .then(() => { window.close() });
}
function onPageLoad() {
  $("#dashboard").addEventListener("click", openDashboard);
  $("#chk").addEventListener("click", checkNow);
  extApi.runtime.sendMessage({ cmd: "getData" });
}
function openUrl2(event) {
  //shift+left click or middle click refreshes only this account
  if ((event.button == 0 && event.shiftKey) || event.button == 1) {
    extApi.runtime.sendMessage({ cmd: "checkOne", host: this.host, user: this.user })
      .then(() => { window.close() });
    return;
  }
  if (event.button != 0) return; //ignore other aux buttons (e.g. right click)
  openUrl(null, this.viewURL)
    .then(() => { window.close() });
}

function onLoad(data) {
  let root = $("#accounts");
  clear(root);
  for (let i in data) {
    let host = data[i];
    for (let j in host) {
      let o = host[j];
      if (!o.active || !o.enabled) continue;

      let folders = o.folders;
      let tooltip = "";
      for (let k in folders) {
        let f = folders[k];
        if (f) {
          tooltip += " - " + (f.title ? f.title : f.id) + " : " + f.count + "\n";
        }
      }
      if (tooltip) {
        tooltip = o.user + (o.count > 0 ? " : " + o.count : "") + "\n" + tooltip;
      }

      let em = createElement("div", "menu flex" + (o.count > 0 ? " newMsg" : ""), tooltip);
      //middle click fires "auxclick" (not "click"), so bind both
      let accountClick = openUrl2.bind(o);
      em.addEventListener("click", accountClick);
      em.addEventListener("auxclick", accountClick);
      let em2 = createElement("div", "icon");
      em2.style.backgroundImage = "url(" + o.iconURL + ")";
      em.appendChild(em2);

      em2 = createElement("div", "acc");
      let em3 = document.createTextNode(o.user);
      em2.appendChild(em3);
      em.appendChild(em2);

      em2 = createElement("div", "num");
      em2.setAttribute("class", "num");
      em3 = document.createTextNode(o.count > 0 ? o.count : "");
      em2.appendChild(em3);
      em.appendChild(em2);
      root.appendChild(em);
    }
  }
}

function onMessage(req, sender, sendResponse) {
  switch (req.cmd) {
    case "update":
      onLoad(req.data);
      break;
  }
}
extApi.runtime.onMessage.addListener(onMessage);

document.addEventListener('DOMContentLoaded', onPageLoad);
