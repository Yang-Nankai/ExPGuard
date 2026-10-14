chrome.runtime.onInstalled.addListener(function(instalacion) {
  if (instalacion.reason == "install") {
    if (es_android) {
      setTimeout(function() {
        chrome.tabs.create({active:false, url:"ayudaandroid.html"});
      }, 200);
    } else {
      setTimeout(function() {
        chrome.tabs.create({active:false, url:es_chromium ? "ayuda.html?aviso_icono=1" : "ayuda.html"});
      }, 200);
    }
  }
  if (instalacion.reason == "update" && instalacion.previousVersion[0] < 2) {
    setTimeout(function() {
      chrome.storage.local.get(null, function(result) {
        if (result.sDobleclic == undefined) {
          chrome.storage.local.set({sDobleclic:true, sTecla:"", sContextual:true, sLabContextual:true, sLabTeclado:false, sLabTecla:"CTRL", sLabChivatoTeclado:true, sResDobleclic:"bocadillo", sResContextual:"ventana", sLabResTeclado:"bocadillo", sCerrarSaliendo:false});
        } else if (result.sContextual == false) {
          chrome.storage.local.set({sLabContextual:false, sLabTeclado:false, sLabTecla:"CTRL", sLabChivatoTeclado:true, sLabResTeclado:"bocadillo"});
        } else if (result.sContextual == true) {
          chrome.storage.local.set({sLabContextual:true, sLabTeclado:false, sLabTecla:"CTRL", sLabChivatoTeclado:true, sLabResTeclado:"bocadillo"});
        }
      });
    }, 800);
  }
});
const gmanifest_version = chrome.runtime.getManifest().manifest_version;
const es_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const es_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
const es_mac = navigator.platform.toLowerCase().indexOf("mac") > -1;
const es_chromium = navigator.userAgent.toLowerCase().indexOf("chrome") > -1 || navigator.userAgent.toLowerCase().indexOf("edg") > -1;
const gtesperaini = 1100;
var gURLdle = "https://dle.rae.es/";
var gsDobleclic = true;
var gsTeclaDobleclic = es_mac ? "CMD" : "CTRL";
var gsResDobleclic = "bocadillo";
var gsContextual = true;
var gsResContextual = "bocadillo";
let gsLabContextual = true;
let gsLabTeclado = false;
let gsLabTecla = es_mac ? "CMD" : "CTRL";
let gsLabResTeclado = "bocadillo";
let gsLabChivatoTeclado = true;
var gsCerrarSaliendo = false;
var gsEnlazarTodas = false;
var gsCompatibleDark = false;
var gsAuxilioAutom = false;
var gsTesperatoque = gtesperaini;
var gBocadilloPosiblePestana;
var gtemporizador;
var gindice_redirigido = -1;
var npeticion_lanzada = 0;
var gidestinos_OnError = [];
var urls_obsoletas = [];
function fcargaurls_obsoletas() {
  urls_obsoletas = [["https://lema.rae.es/", "https://buscon.rae.es/draeI", "https://www.rae.es/drae"], ["https://dle.rae.es/", "https://dle.rae.es/", "https://dle.rae.es/"]];
}
function fdominioUrl(vUrl) {
  var n2barra = vUrl.indexOf("//") + 1;
  var n3barra = vUrl.indexOf("/", n2barra + 1);
  vUrl = vUrl.substring(n2barra + 1, n3barra);
  var vCachos = vUrl.split(".");
  return vCachos[vCachos.length - 2];
}
function fBocadilloPosible() {
  return gsDobleclic && gsResDobleclic == "bocadillo" || (gsContextual || gsLabContextual) && gsResContextual == "bocadillo" || gsLabTeclado && gsLabResTeclado == "bocadillo";
}
function fNuevaVentanaDLEsearch(palabra) {
  palabra = encodeURIComponent(palabra);
  chrome.windows.create({url:gURLdle + palabra, type:"popup", width:600, height:420, state:"normal"});
}
function fNuevaVentanaDLE(url) {
  chrome.windows.create({url:url, type:"popup", width:600, height:420, state:"normal"});
}
function fContextualTratarSeleccion(info, tab) {
  var palabra = info.selectionText;
  var palabra = palabra.toLowerCase();
  if (gsResContextual == "bocadillo" && tab && tab.id >= 0) {
    chrome.tabs.sendMessage(tab.id, {palabra_para_bocadillo:palabra}, function(response) {
      if (response == undefined) {
        fNuevaVentanaDLEsearch(palabra);
      }
      if (chrome.runtime.lastError) {
        null;
      }
    });
  } else {
    fNuevaVentanaDLEsearch(palabra);
  }
}
function fCrearMenu() {
  if (!es_android) {
    chrome.contextMenus.remove("menubuscar", function() {
      if (chrome.runtime.lastError) {
        null;
      }
      chrome.contextMenus.create({id:"menubuscar", title:(es_firefox ? "&Buscar " : "Buscar ") + 'la selecci\u00f3n "%s" en la &RAE', contexts:["selection"]});
    });
  }
}
function fCrearMenuBrowser() {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "menu_novedades") {
      chrome.tabs.create({url:"novedades.html"});
    }
    if (info.menuItemId == "menu_configurar") {
      chrome.runtime.openOptionsPage();
    }
    if (info.menuItemId == "menu_ayuda") {
      chrome.tabs.create({url:"ayuda.html"});
    }
    if (info.menuItemId == "menu_sugerir") {
      chrome.tabs.create({url:"https://docs.google.com/forms/d/e/1FAIpQLSeDOzuI1Oz6ON2t2WERbBqt0YFSXpzsDjOrpAXuh2MVE9lyqA/viewform"});
    }
    if (info.menuItemId == "menu_notificar") {
      chrome.tabs.create({url:gmanifest_version == 2 || es_firefox ? "https://docs.google.com/forms/d/e/1FAIpQLScqF2qfNzR9FHjyLae7NiUCS0bVRvF-m8FxjUpuFe4leS4SNw/viewform" : "https://forms.gle/UqUPwrzDU5U5TcVX6"});
    }
  });
  const browser_action = gmanifest_version == 2 ? "browser_action" : "action";
  if (es_firefox || gmanifest_version >= 3) {
    chrome.contextMenus.remove("menu_novedades", function() {
      if (chrome.runtime.lastError) {
        null;
      }
      chrome.contextMenus.create({id:"menu_novedades", title:"\ud83d\udce9 &Novedades versi\u00f3n 2.0", contexts:[browser_action]});
    });
  }
  chrome.contextMenus.remove("menu_configurar", function() {
    if (chrome.runtime.lastError) {
      null;
    }
    chrome.contextMenus.create({id:"menu_configurar", title:"\u2699\ufe0f &Configurar opciones", contexts:[browser_action]});
  });
  chrome.contextMenus.remove("menu_ayuda", function() {
    if (chrome.runtime.lastError) {
      null;
    }
    chrome.contextMenus.create({id:"menu_ayuda", title:"\u2754 &Ayuda / Dudas frecuentes", contexts:[browser_action]});
  });
  chrome.contextMenus.remove("menu_separador", function() {
    if (chrome.runtime.lastError) {
      null;
    }
    chrome.contextMenus.create({id:"menu_separador", type:"separator", contexts:[browser_action]});
  });
  chrome.contextMenus.remove("menu_sugerir", function() {
    if (chrome.runtime.lastError) {
      null;
    }
    chrome.contextMenus.create({id:"menu_sugerir", title:"\u261d\ufe0f\ud83c\udffb &Sugerir y proponer mejoras", contexts:[browser_action]});
  });
  chrome.contextMenus.remove("menu_notificar", function() {
    if (chrome.runtime.lastError) {
      null;
    }
    chrome.contextMenus.create({id:"menu_notificar", title:"\ud83d\udca5 &Notificar error", contexts:[browser_action]});
  });
  var id_extension;
  chrome.management.getSelf(o => {
    id_extension = o.id;
    if (!es_firefox && gmanifest_version == 2 && o.installType === "development") {
      if ((new Date()).toJSON().slice(0, 10) <= "2022-12-01") {
        var mensaje = "\u26a0\ufe0f Esta extensi\u00f3n se ha instalado de forma manual, y se desinstalar\u00e1 autom\u00e1ticamente el pr\u00f3ximo d\u00eda 1 de diciembre de 2022.\n\n\u2714\ufe0f El motivo es que ya es posible instalarla de manera f\u00e1cil y segura desde " + (navigator.userAgent.toLowerCase().indexOf("edg") > -1 ? "la web oficial de Microsoft\u00ae\ufe0f, Complementos de Edge, y tambi\u00e9n desde la plataforma oficial Chrome Web Store." : "la plataforma oficial Chrome Web Store.") + 
        "\n\nDisculpe las molestias.\n\nKalixto";
        alert(mensaje);
      } else {
        var mensaje = "\u26d4 AVISO:\n\nDesde el 1 de diciembre de 2022 no est\u00e1n permitidas las instalaciones manuales de esta extensi\u00f3n.\n\n\u2714\ufe0fA partir de ahora puede instalarla de manera f\u00e1cil y segura desde " + (navigator.userAgent.toLowerCase().indexOf("edg") > -1 ? "la web oficial de Microsoft\u00ae\ufe0f, Complementos de Edge." : "la plataforma oficial Chrome Web Store.") + "\n\nDisculpe las molestias.\nKalixto";
        alert(mensaje);
        if (navigator.userAgent.toLowerCase().indexOf("edg") > -1) {
          chrome.tabs.create({url:"https://microsoftedge.microsoft.com/addons/detail/diccionario-rae-en-bocadi/bhoebolnjfhalinoblhgekniajfiiaem?utm_source=edge&utm_medium=extension&utm_campaign=cierre"});
        } else {
          chrome.tabs.create({url:"https://chrome.google.com/webstore/detail/diccionario-rae-en-bocadi/gklihgcnchjjfcmihmpgennnemkkpnen?utm_source=chrome&utm_medium=extension&utm_campaign=cierre"});
        }
        chrome.management.uninstallSelf({showConfirmDialog:false});
      }
    }
  });
}
function fEliminarMenu() {
  chrome.contextMenus.remove("menubuscar", function() {
    if (chrome.runtime.lastError) {
      null;
    }
  });
}
function fAplicarOpcionesAlmacenadas() {
  gsDobleclic = true;
  gsTeclaDobleclic = es_mac ? "CMD" : "CTRL";
  gsResDobleclic = "bocadillo";
  gsContextual = true;
  gsResContextual = "bocadillo";
  gsLabContextual = true;
  gsLabTeclado = false;
  gsLabTecla = "CTRL";
  gsLabResTeclado = "bocadillo";
  gsLabChivatoTeclado = true;
  gsCerrarSaliendo = false;
  gsEnlazarTodas = false;
  gsCompatibleDark = false;
  gsAuxilioAutom = false;
  gsTesperatoque = gtesperaini;
  chrome.storage.local.get(null, function(result) {
    if (result.sContextual != false) {
      fCrearMenu();
    } else {
      fEliminarMenu();
    }
    if (result.sLabContextual == false) {
      fLabBorrarMenu();
    }
    if (result.sDobleclic != undefined) {
      gsDobleclic = result.sDobleclic;
    }
    if (result.sTecla != undefined) {
      gsTeclaDobleclic = result.sTecla;
    }
    if (result.sResDobleclic != undefined) {
      gsResDobleclic = result.sResDobleclic;
    }
    if (result.sContextual != undefined) {
      gsContextual = result.sContextual;
    }
    if (result.sResContextual != undefined) {
      gsResContextual = result.sResContextual;
    }
    if (result.sLabContextual != undefined) {
      gsLabContextual = result.sLabContextual;
    }
    if (result.sLabTeclado != undefined) {
      gsLabTeclado = result.sLabTeclado;
    }
    if (result.sLabTecla != undefined) {
      gsLabTecla = result.sLabTecla;
    }
    if (result.sLabResTeclado != undefined) {
      gsLabResTeclado = result.sLabResTeclado;
    }
    if (result.sLabChivatoTeclado != undefined) {
      gsLabChivatoTeclado = result.sLabChivatoTeclado;
    }
    if (result.sCerrarSaliendo != undefined) {
      gsCerrarSaliendo = result.sCerrarSaliendo;
    }
    if (result.sEnlazarTodas != undefined) {
      gsEnlazarTodas = result.sEnlazarTodas;
    }
    if (result.sCompatibleDark != undefined) {
      gsCompatibleDark = result.sCompatibleDark;
    }
    if (result.sAuxilioAutom != undefined) {
      gsAuxilioAutom = result.sAuxilioAutom;
    }
    if (result.sTesperatoque != undefined) {
      gsTesperatoque = result.sTesperatoque;
    }
  });
}
function fTraerHTML(url) {
  fetch(url).then(function(response) {
    if (response.ok) {
      response.text().then(function(myJson) {
        return myJson;
      });
    } else {
      return null;
    }
  }).catch(function(error) {
    return null;
  });
}
function fTocaActualizarObsoletas(fecha) {
  if (fecha && fecha == (new Date()).toJSON().slice(0, 10)) {
    return false;
  } else {
    return true;
  }
}
if (!es_android) {
  var list_menubuscar = chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "menubuscar") {
      fContextualTratarSeleccion(info, tab);
    }
  });
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.URLtraeHTML) {
    fetch(request.URLtraeHTML).then(function(response) {
      if (response.ok) {
        response.text().then(function(myJson) {
          myJson = myJson.split('="/').join('="https://dle.rae.es/');
          myJson = myJson.split("='/").join("='https://dle.rae.es/");
          myJson = myJson.split("url(/").join("url(https://dle.rae.es/");
          myJson = myJson.split("url('/").join("url('https://dle.rae.es/");
          let patron = /<link rel="preload".*?dle\.rae\.es.*?as="script">/gi;
          myJson = myJson.replace(patron, '');
          patron = /<script .*?dle\.rae\.es.*?script>/gi;
          myJson = myJson.replace(patron, '');
          patron = /src:url.*?;/gi;
          myJson = myJson.replace(patron, '');
          patron = /<use .*?href=.*?<\/use>/gi;
          myJson = myJson.replace(patron, '');
          myJson = myJson.split("min-width:320px").join("min-width:220px");
          sendResponse({html:myJson});
        });
      } else {
        sendResponse({html:null});
      }
    }).catch(function(error) {
      sendResponse({html:null});
    });
    return true;
  }
  if (request.soy_pagina_o_extension) {
    sendResponse({eres:sender.tab ? "pagina" : "extension"});
  }
  if (request.palabra_a_buscar) {
    fNuevaVentanaDLEsearch(request.palabra_a_buscar);
  }
  if (request.URL_a_buscar) {
    fNuevaVentanaDLE(request.URL_a_buscar);
  }
  if (request.peticion_opciones) {
    sendResponse({sDobleclic:gsDobleclic, sTesperatoque:gsTesperatoque, sTecla:gsTeclaDobleclic, sResDobleclic:gsResDobleclic, sContextual:gsContextual, sLabContextual:gsLabContextual, sResContextual:gsResContextual, sLabTeclado:gsLabTeclado, sLabTecla:gsLabTecla, sLabResTeclado:gsLabResTeclado, sLabChivatoTeclado:gsLabChivatoTeclado, sCerrarSaliendo:gsCerrarSaliendo, sEnlazarTodas:gsEnlazarTodas, sCompatibleDark:gsCompatibleDark, sAuxilioAutom:gsAuxilioAutom, gBocadilloPosible:fBocadilloPosible()});
  }
  if (request.top_palabra_para_bocadillo) {
    chrome.tabs.sendMessage(sender.tab.id, {palabra_para_bocadillo:request.top_palabra_para_bocadillo});
  }
  if (request.top_URL_para_bocadillo) {
    chrome.tabs.sendMessage(sender.tab.id, {URL_para_bocadillo:request.top_URL_para_bocadillo});
  }
  if (request.top_oculta_bocadillo) {
    chrome.tabs.sendMessage(sender.tab.id, {oculta_bocadillo:true});
  }
  if (request.diferido_bocadillo_no_carga_URL) {
    gtemporizador = setTimeout(fBocadillo_no_carga_URL, request.milisegundos, request.diferido_bocadillo_no_carga_URL, sender.tab.id);
  }
  if (request.diferido_cancelado && gtemporizador) {
    clearTimeout(gtemporizador);
  }
  if (request.inyecta_js_frameid) {
    if (gmanifest_version >= 3) {
      chrome.scripting.executeScript({target:{tabId:sender.tab.id, frameIds:[request.inyecta_js_frameid]}, files:[request.fichero]});
    } else {
      chrome.tabs.executeScript({file:request.fichero, frameId:request.inyecta_js_frameid, matchAboutBlank:true, runAt:"document_end"});
    }
  }
  if (request.crea_menu) {
    fCrearMenu();
  }
  if (request.elimina_menu) {
    fEliminarMenu();
  }
  if (gmanifest_version >= 3 && (request.palabra_a_buscar || request.URL_a_buscar || request.top_palabra_para_bocadillo || request.top_URL_para_bocadillo || request.top_oculta_bocadillo || request.diferido_bocadillo_no_carga_URL || request.diferido_cancelado || request.inyecta_js_frameid || request.crea_menu || request.elimina_menu)) {
    sendResponse();
  }
});
chrome.storage.onChanged.addListener(fEscuchoCambiosAlmacenes);
function fEscuchoCambiosAlmacenes(changes, area) {
  fAplicarOpcionesAlmacenadas();
}
var fcapta_frameId = function(info_peticion) {
  chrome.tabs.sendMessage(info_peticion.tabId, {frameId_bocadillo_2022:info_peticion.frameId});
};
chrome.webRequest.onBeforeRequest.addListener(fcapta_frameId, {urls:["https://test.test/get_frameid_dle_rae"], types:["sub_frame", "image"]});
var flanzadestino = function(info_req_patron) {
  if (info_req_patron.tabId > -1) {
    gindice_redirigido = urls_obsoletas[0].indexOf(info_req_patron.url);
    var url_destino = urls_obsoletas[1][gindice_redirigido];
    if (url_destino && !gidestinos_OnError.includes(gindice_redirigido) && info_req_patron.requestId !== npeticion_lanzada) {
      if (gindice_redirigido !== -1) {
        chrome.tabs.update(info_req_patron.tabId, {url:url_destino});
      }
    } else {
    }
  }
};
var fdestinolanzado = function(info) {
  if (gindice_redirigido != -1 && urls_obsoletas[1][gindice_redirigido] == info.url) {
    npeticion_lanzada = info.requestId;
  }
};
function fcrealisteners() {
  chrome.webRequest.onBeforeRequest.addListener(flanzadestino, {urls:urls_obsoletas[0], types:["main_frame"]});
  chrome.webRequest.onBeforeRequest.addListener(fdestinolanzado, {urls:urls_obsoletas[1], types:["main_frame"]});
}
chrome.webRequest.onResponseStarted.addListener(function(info_req_res) {
  if (info_req_res.requestId == npeticion_lanzada && fdominioUrl(urls_obsoletas[0][gindice_redirigido]) !== fdominioUrl(info_req_res.url)) {
    if (!gidestinos_OnError.includes(gindice_redirigido)) {
      gidestinos_OnError[gidestinos_OnError.length] = gindice_redirigido;
    }
    chrome.tabs.update(info_req_res.tabId, {url:urls_obsoletas[0][gindice_redirigido]});
  }
}, {urls:["*://*/*"], types:["main_frame"]});
chrome.webRequest.onErrorOccurred.addListener(function(info_reqError) {
  if (info_reqError.requestId == npeticion_lanzada) {
    if (!gidestinos_OnError.includes(gindice_redirigido)) {
      gidestinos_OnError[gidestinos_OnError.length] = gindice_redirigido;
    }
    chrome.tabs.update(info_reqError.tabId, {url:urls_obsoletas[0][gindice_redirigido]});
  }
}, {urls:["*://*/*"], types:["main_frame"]});
if (gmanifest_version >= 3) {
  importScripts("popuplab.js");
}
if (gmanifest_version >= 3) {
  chrome.runtime.onConnect.addListener(port => {
    if (port.name !== "puerto_sin_mas") {
      return;
    }
    port.onMessage.addListener(onMessage);
    port.onDisconnect.addListener(deleteTimer);
    port._timer = setTimeout(forceReconnect, 250e3, port);
  });
  function onMessage(msg, port) {
  }
  function forceReconnect(port) {
    deleteTimer(port);
    port.disconnect();
  }
  function deleteTimer(port) {
    if (port._timer) {
      clearTimeout(port._timer);
      delete port._timer;
    }
  }
}
fAplicarOpcionesAlmacenadas();
if (es_android) {
  fcargaurls_obsoletas();
  fcrealisteners();
} else {
  chrome.storage.local.get(["sFechaJSON"], function(result_fecha) {
    if (fTocaActualizarObsoletas(result_fecha.sFechaJSON)) {
      fetch("https://api.npoint.io/3132a25060f8c41c11f0/0").then(function(response) {
        if (response.ok) {
          response.json().then(function(myJson) {
            urls_obsoletas = myJson;
            fcrealisteners();
            chrome.storage.local.set({sFechaJSON:(new Date()).toJSON().slice(0, 10), sJSONObsoletas:urls_obsoletas});
          });
        } else {
          fcargaurls_obsoletas();
          fcrealisteners();
        }
      }).catch(function(error) {
        fcargaurls_obsoletas();
        fcrealisteners();
      });
    } else {
      chrome.storage.local.get(["sJSONObsoletas"], function(result_array) {
        if (result_array.sJSONObsoletas) {
          urls_obsoletas = result_array.sJSONObsoletas;
        } else {
          fcargaurls_obsoletas();
        }
        fcrealisteners();
      });
    }
  });
}
if (!es_android) {
  chrome.commands.getAll(commands => {
    if (commands[0] && commands[0].shortcut) {
      if (gmanifest_version == 2) {
        chrome.browserAction.setTitle({title:"Diccionario RAE en bocadillo\n\t\t" + commands[0].shortcut});
      } else {
        chrome.action.setTitle({title:"Diccionario RAE en bocadillo\n\t\t" + commands[0].shortcut});
      }
    }
  });
  fCrearMenuBrowser();
}
if (es_android) {
  chrome.browserAction.setPopup({popup:"buscaandroid.html"});
}
;