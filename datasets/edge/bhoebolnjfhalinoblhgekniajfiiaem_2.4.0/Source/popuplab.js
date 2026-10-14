let gLabPalabraBajoRaton = "";
let gLabPalabraMenuContextual;
let listener_lab = null;
function fLabBorrarMenu() {
  chrome.contextMenus.remove("Lab_menubuscar", function() {
    if (chrome.runtime.lastError) {
      null;
    }
  });
}
function fLabContextualActiva(info, tab) {
  gLabPalabraMenuContextual = gLabPalabraMenuContextual.toLowerCase();
  if (gsResContextual == "bocadillo" && tab && tab.id >= 0 && info.pageUrl.indexOf("about:") != 0 && info.pageUrl.indexOf("chrome:") != 0) {
    chrome.tabs.sendMessage(tab.id, {palabra_para_bocadillo:gLabPalabraMenuContextual});
  } else {
    fNuevaVentanaDLEsearch(gLabPalabraMenuContextual);
  }
  chrome.contextMenus.remove("Lab_menubuscar", function() {
    if (chrome.runtime.lastError) {
      null;
    }
  });
  chrome.contextMenus.remove("Lab_menubuscar_sel", function() {
    if (chrome.runtime.lastError) {
      null;
    }
  });
}
function fLabCrearMenu(palabra, seleccion, es_nodo_input) {
  if (!es_android) {
    if (listener_lab) {
      chrome.contextMenus.onClicked.removeListener(listener_lab);
    }
    listener_lab = function(info, tab) {
      if (info.menuItemId == "Lab_menubuscar") {
        gsContextual && seleccion && seleccion.trim().indexOf(" ") != seleccion.trim().lastIndexOf(" ") ? null : seleccion && gsContextual ? fContextualTratarSeleccion(info, tab) : fLabContextualActiva(info, tab);
      }
    };
    chrome.contextMenus.onClicked.addListener(listener_lab);
    chrome.contextMenus.remove("menubuscar", function() {
      if (chrome.runtime.lastError) {
        null;
      }
    });
    chrome.contextMenus.remove("Lab_menubuscar", function() {
      if (chrome.runtime.lastError) {
        null;
      }
      gLabPalabraMenuContextual = palabra;
      if (gsLabContextual && (palabra || seleccion && gsContextual)) {
        chrome.contextMenus.create({id:"Lab_menubuscar", title:gsContextual && seleccion && seleccion.trim().indexOf(" ") != seleccion.trim().lastIndexOf(" ") ? "(muchas palabras seleccionadas: use bot\u00f3n DLE)" : (es_firefox ? "&Buscar " : "Buscar ") + (seleccion && gsContextual ? 'la selecci\u00f3n "%s' : '"' + palabra) + '" en la &RAE', contexts:["page", "editable", "link", "frame", "selection"]});
      }
    });
  }
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.palabra_bajo_raton) {
    gLabPalabraBajoRaton = request.palabra;
  }
  if (request.dame_ultima_palabra_bajo_raton) {
    sendResponse({word:gLabPalabraBajoRaton});
  }
  if (request.lab_crea_borra_menu_palabra) {
    fLabCrearMenu(request.palabra, request.seleccion, request.es_input);
  }
  if (request.lab_borra_menu) {
    fLabBorrarMenu();
  }
  if (request.lab_top_keyup_bocadillo) {
    chrome.tabs.sendMessage(sender.tab.id, {lab_keyup_bocadillo:request.lab_top_keyup_bocadillo});
  }
  if (request.lab_top_muestra_chivato) {
    chrome.tabs.sendMessage(sender.tab.id, {lab_muestra_chivato:true, word:gLabPalabraBajoRaton});
  }
  if (request.lab_top_oculta_chivato) {
    chrome.tabs.sendMessage(sender.tab.id, {lab_oculta_chivato:true});
  }
  if (gmanifest_version >= 3 && (request.palabra_bajo_raton || request.lab_crea_borra_menu_palabra || request.lab_borra_menu || request.lab_top_keyup_bocadillo || request.lab_top_muestra_chivato || request.lab_top_oculta_chivato)) {
    sendResponse();
  }
});