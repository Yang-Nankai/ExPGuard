"use strict";
var exlib;
if (!exlib) exlib = {}
exlib.getVersion = function () {
  return extApi.runtime.getManifest().version;
}
exlib.openTab = function (url) {
  extApi.tabs.create({ url: url, selected: true });
}

exlib.setIcon = function (url) {
  extApi.action.setIcon({ path: url });
}
exlib.setBadgeText = function (s) {
  //extApi.action.setBadgeBackgroundColor({color:"#da0018"});
  extApi.action.setBadgeText({ text: s });
}
exlib.setTitle = function (s) {
  extApi.action.setTitle({ title: s });
}

exlib.initToolbarUI = function (icon, title) {
  extApi.action.setIcon({ imageData: icon });
  extApi.action.setTitle({ title: title });
}
exlib.getTabs = function (func) {
  extApi.tabs.query({}).then(func);
}
exlib.getURL = function (u) {
  return extApi.runtime.getURL(u);
}
