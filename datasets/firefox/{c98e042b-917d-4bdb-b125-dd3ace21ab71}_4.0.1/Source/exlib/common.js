"use strict";
const extApi = globalThis.browser ?? globalThis.chrome;
const dout = console.log.bind(console);

function $(sel, el) {
  if (!el) { el = document; }
  return el.querySelector(sel);
}
function $$(sel, el) {
  if (!el) { el = document; }
  return el.querySelectorAll(sel);
}

function newElm(tag, attr, child) {
  let em = document.createElement(tag);
  for (let a in attr) em.setAttribute(a, attr[a]);
  if (child) {
    if (child instanceof HTMLElement) em.appendChild(child);
    else em.textContent = child;
  }
  return em;
}

var exlib;
if (!exlib) exlib = {}
exlib.i18nString = function (s) {
  return extApi.i18n.getMessage(s);
}

exlib.asyncCount = 0;
exlib.loadFile = function (name, func, obj) { //function(data,obj,isLast)
  ++exlib.asyncCount;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4) {
      --exlib.asyncCount;
      if (func) func(xhr.status == 200 ? xhr.responseText : null, obj, exlib.asyncCount == 0);
    }
  };
  xhr.open('GET', name.indexOf("://") >= 0 ? name : extApi.runtime.getURL(name), true);
  xhr.send(null);
}

exlib.loadJSON = function (name, func) {
  exlib.loadFile(name, function (data, xhr) {
    if (func) func(JSON.parse(data));
  });
}

exlib.loadPrefsA = async (name, def) => {
  let o = await extApi.storage.local.get(name);
  if (o != null) o = o[name]
  if (o == null) {
    if (def) o = {};
    else return null;
  }
  if (def) {
    for (let i in def) {
      if (typeof o[i] == "undefined") o[i] = def[i];
    }
  }
  return o;
}
exlib.savePrefsA = async (name, o) => {
  if (o == null) await extApi.storage.local.remove(name);
  else {
    const obj = {};
    obj[name] = o;
    await extApi.storage.local.set(obj);
  }
}
