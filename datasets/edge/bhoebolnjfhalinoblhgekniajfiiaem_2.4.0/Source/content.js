const gfcontent_script_bocadillo = "dlecontent-search.js";
const es_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const es_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
const es_mac = navigator.platform.toLowerCase().indexOf("mac") > -1;
const gmanifest_version = chrome.runtime.getManifest().manifest_version;
const gcss_fondo_amarillo = "'/><link rel='stylesheet' type='text/css; charset=utf-8' href='" + chrome.runtime.getURL("dlecontent-amarillo.css");
if (self.origin) {
  var es_browser_action = self.origin.indexOf("extension://") >= 0;
} else {
  var es_browser_action = window.location.href.indexOf("extension://") >= 0;
}
var giframe = document.createElement("iframe");
var gcajaboton = document.createElement("span");
var gboton_aspa = document.createElement("a");
var gframeid;
var gidadesplazar;
var gURLdle = "https://dle.rae.es/";
var gHTMLbuscando = "<!DOCTYPE html> <html lang='es'> <style> body { background:#f0f4c3 } </style> <img src='" + chrome.runtime.getURL("img/dle16.png") + "' alt='Diccionario'> <div style='margin-left:15px; margin-top:-5px;'> <img src='" + chrome.runtime.getURL("img/diccionario.gif") + "' alt='buscando...' height='50'> </div> </html>";
var gsDobleclic = true;
var gsTeclaDobleclic = es_mac ? "CMD" : "CTRL";
var gsResDobleclic = "bocadillo";
var gsContextual = true;
let gsLabContextual = true;
var gsResContextual = "bocadillo";
let gsLabTeclado = false;
let gsLabTecla = es_mac ? "CMD" : "CTRL";
let gsLabResTeclado = "bocadillo";
let gsLabChivatoTeclado = true;
var gsCerrarSaliendo = false;
var gsEnlazarTodas = false;
var gsCompatibleDark = true;
var gsAuxilioAutom = false;
var gsTesperatoque = 1100;
var gBocadilloPosible = true;
var gtags_a_evitar = ["IMG", "SELECT", "OPTION", "BUTTON", "A"];
var ginputs_a_evitar = ["password", "radio", "option", "checkbox"];
var ghaytoque;
var gtoque_previo_contextmenu;
var gtemptoque_tras_contextmenu;
var gpalabratocada;
var glienzooculto = document.createElement("div");
function fmuestrabocadillo_URL(url) {
  chrome.runtime.sendMessage({URLtraeHTML:url}, function(response) {
    var html = response.html;
    var css_anula_pseudoenlaces = gsEnlazarTodas ? "" : "'/><link rel='stylesheet' type='text/css; charset=utf-8' href='" + chrome.runtime.getURL("dlecontent-pseudo.css");
    var css_fondo_fijo = gsCompatibleDark ? "" : gcss_fondo_amarillo;
    if (es_browser_action) {
      html = html.replace("<head>", "<head><link rel='stylesheet' type='text/css; charset=utf-8' href='" + chrome.runtime.getURL("dlecontent-search.css") + css_anula_pseudoenlaces + gcss_fondo_amarillo + "'/><script src='" + chrome.runtime.getURL("dlecontent-search.js") + "' defer>\x3c/script>\n");
    } else {
      html = html.replace("<head>", "<head><link rel='stylesheet' type='text/css; charset=utf-8' href='" + chrome.runtime.getURL("dlecontent-search.css") + css_anula_pseudoenlaces + css_fondo_fijo + "'/>\n");
    }
    giframe.setAttribute("srcdoc", html);
    if (!es_browser_action) {
      setTimeout(function() {
        chrome.runtime.sendMessage({inyecta_js_frameid:gframeid, fichero:gfcontent_script_bocadillo});
      }, 200);
    }
  });
  gcajaboton.style.display = "block";
  if (!es_browser_action) {
    gboton_aspa.style.display = "block";
  }
  if (!es_android && !es_browser_action || es_android && es_browser_action) {
    giframe.contentWindow.focus();
  }
  if (es_android && !es_browser_action) {
    fAdaptaralViewport(true);
  }
}
function fmuestrabocadillo(palabra) {
  palabra = encodeURIComponent(palabra);
  fmuestrabocadillo_URL(gURLdle + palabra);
}
function fcargapalabra(texto) {
  if (texto.trim() && isNaN(texto) && texto != "," && texto != "." && texto != ";" && texto != ":") {
    var palabra = texto.trim().toLowerCase();
    if (es_browser_action || gsResDobleclic != "ventana") {
      if (top == self) {
        fmuestrabocadillo(palabra);
      } else {
        chrome.runtime.sendMessage({top_palabra_para_bocadillo:palabra});
      }
    } else {
      chrome.runtime.sendMessage({palabra_a_buscar:palabra});
    }
  }
}
if (gmanifest_version >= 3 && top == self) {
  let port;
  function connect() {
    port = chrome.runtime.connect({name:"puerto_sin_mas"});
    port.onDisconnect.addListener(connect);
    port.onMessage.addListener(msg => {
    });
  }
  connect();
}
chrome.runtime.sendMessage({peticion_opciones:true}, function(response) {
  if (response.sDobleclic != undefined) {
    gsDobleclic = response.sDobleclic;
  }
  if (response.sTecla != undefined) {
    gsTeclaDobleclic = response.sTecla;
  }
  if (response.sResDobleclic != undefined) {
    gsResDobleclic = response.sResDobleclic;
  }
  if (response.sContextual != undefined) {
    gsContextual = response.sContextual;
  }
  if (response.sLabContextual != undefined) {
    gsLabContextual = response.sLabContextual;
  }
  if (response.sResContextual != undefined) {
    gsResContextual = response.sResContextual;
  }
  if (response.sLabTeclado != undefined) {
    gsLabTeclado = response.sLabTeclado;
  }
  if (response.sLabTecla != undefined) {
    gsLabTecla = response.sLabTecla;
  }
  if (response.sLabResTeclado != undefined) {
    gsLabResTeclado = response.sLabResTeclado;
  }
  if (response.sLabChivatoTeclado != undefined) {
    gsLabChivatoTeclado = response.sLabChivatoTeclado;
  }
  if (response.sCerrarSaliendo != undefined) {
    gsCerrarSaliendo = response.sCerrarSaliendo;
  }
  if (response.sEnlazarTodas != undefined) {
    gsEnlazarTodas = response.sEnlazarTodas;
  }
  if (response.sCompatibleDark != undefined) {
    gsCompatibleDark = response.sCompatibleDark;
  }
  if (response.sAuxilioAutom != undefined) {
    gsAuxilioAutom = response.sAuxilioAutom;
  }
  if (response.sTesperatoque != undefined) {
    gsTesperatoque = response.sTesperatoque;
  }
  if (response.gBocadilloPosible != undefined) {
    gBocadilloPosible = response.gBocadilloPosible;
  }
  fCreaEventos();
  if (es_android) {
    fCreaObjetosMovil();
    fCreaEventosMovil();
  }
  if (top == self) {
    fPreparaIframe();
  }
  if (!es_browser_action && !es_android) {
    fLabCreaEventos();
  }
});
if (top == self) {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.palabra_para_bocadillo) {
      if (document.location && document.location.pathname && document.location.pathname.slice(-4).toLowerCase() != '.pdf' && document.location.pathname.slice(-4).toLowerCase() != '.xml') {
          sendResponse({oido:true});
          fmuestrabocadillo(request.palabra_para_bocadillo);
        }
    }
    if (request.URL_para_bocadillo) {
      fmuestrabocadillo_URL(request.URL_para_bocadillo);
      if (request.URL_para_bocadillo.indexOf("#") > -1) {
        gidadesplazar = request.URL_para_bocadillo.substring(request.URL_para_bocadillo.indexOf("#") + 1);
      }
    }
    if (request.oculta_bocadillo) {
      if (gcajaboton.style.display !== "none") {
        chrome.runtime.sendMessage({diferido_cancelado:true});
        giframe.setAttribute("srcdoc", gHTMLbuscando);
        gcajaboton.style.display = "none";
        gcajaboton.className = "cRAEcajaboton";
      }
    }
    if (request.me_oyes) {
      sendResponse({oido:true});
    }
    if (request.frameId_bocadillo_2022) {
      gframeid = request.frameId_bocadillo_2022;
      giframe.removeAttribute("src");
      giframe.setAttribute("srcdoc", gHTMLbuscando);
    }
    if (gmanifest_version >= 3 && (request.frameId_bocadillo_2022 || request.oculta_bocadillo || request.URL_para_bocadillo)) {
      sendResponse();
    }
  });
}
function fCreaEventos() {
  if (!es_browser_action) {
    if (gsDobleclic) {
      document.ondblclick = function(e) {
        var sel = "";
        var el = e.target;
        if (gsDobleclic && !(!e.ctrlKey && !e.getModifierState("Control") && gsTeclaDobleclic == "CTRL" && !es_android) && !(!e.metaKey && gsTeclaDobleclic == "CMD" && !es_android) && !(!e.altKey && gsTeclaDobleclic == "ALT" && !es_android) && !gtags_a_evitar.includes(el.tagName.toUpperCase()) && !ginputs_a_evitar.includes(el.type)) {
          sel = fCapturaSel(el);
          if (sel.trim() && sel.trim().indexOf(" ") == -1) {
            fcargapalabra(sel.trim());
          }
        }
      };
    }
    if (es_android || gBocadilloPosible) {
      document.onclick = function() {
        if (top == self) {
          if (gcajaboton.style.display !== "none") {
            chrome.runtime.sendMessage({diferido_cancelado:true});
            giframe.setAttribute("srcdoc", gHTMLbuscando);
            gcajaboton.style.display = "none";
            gcajaboton.className = "cRAEcajaboton";
          }
        } else {
          chrome.runtime.sendMessage({top_oculta_bocadillo:true});
        }
      };
      document.oncontextmenu = function() {
        if (top == self) {
          if (gcajaboton.style.display !== "none") {
            chrome.runtime.sendMessage({diferido_cancelado:true});
            giframe.setAttribute("srcdoc", gHTMLbuscando);
            gcajaboton.style.display = "none";
            gcajaboton.className = "cRAEcajaboton";
          }
        } else {
          chrome.runtime.sendMessage({top_oculta_bocadillo:true});
        }
      };
      if (gsCerrarSaliendo && top == self) {
        document.body.addEventListener("mouseleave", function() {
          if (gcajaboton.style.display !== "none") {
            chrome.runtime.sendMessage({diferido_cancelado:true});
            giframe.setAttribute("srcdoc", gHTMLbuscando);
            gcajaboton.style.display = "none";
            gcajaboton.className = "cRAEcajaboton";
          }
        });
      }
    }
  }
}
function fCapturaSel(el) {
  var sel = document.selection && document.selection.createRange().text || window.getSelection() && window.getSelection().toString();
  if (!sel) {
    if (el.value) {
      sel = el.value.substring(el.selectionStart, el.selectionEnd);
    }
  }
  return sel;
}
function fCapturaSelMovil(el) {
  gpalabratocada = fCapturaSel(el).trim();
}
function fCreaObjetosMovil() {
  glienzooculto.id = "RAElienzooculto";
  document.body.appendChild(glienzooculto);
}
function fAdaptaralViewport(forzado) {
  if (window.visualViewport && (forzado || gcajaboton.style.display !== "none")) {
    var vviewport = window.visualViewport;
    var rectificaX = vviewport.scale < 1 ? 0 : vviewport.width * (vviewport.scale / 4 - 0.25) * 0.17;
    var rectificaY = vviewport.scale < 1 ? 0 : (vviewport.scale - 1) * 40;
    var offsetX = vviewport.width - glienzooculto.getBoundingClientRect().width + vviewport.offsetLeft - gcajaboton.offsetWidth / (2 * vviewport.scale) + rectificaX;
    var offsetY = vviewport.height - glienzooculto.getBoundingClientRect().height + vviewport.offsetTop + rectificaY;
    gcajaboton.style.transform = "translate(" + offsetX + "px," + offsetY + "px) " + "scale(" + 1 / vviewport.scale + ")";
  }
}
function fCreaEventosMovil() {
  function touchstart(e) {
    if (ghaytoque) {
      return;
    }
    gpalabratocada = "";
    ghaytoque = true;
    gtoque_previo_contextmenu = true;
  }
  function touchend() {
    ghaytoque = false;
    gtoque_previo_contextmenu = false;
    if (gtemptoque_tras_contextmenu) {
      clearTimeout(gtemptoque_tras_contextmenu);
    }
  }
  var ftoquelargo = function() {
    if (gpalabratocada && gtoque_previo_contextmenu) {
      fcargapalabra(gpalabratocada);
      gpalabratocada = "";
    } else {
    }
  };
  document.addEventListener("contextmenu", function(event) {
    var el = event.target;
    if (!gtags_a_evitar.includes(el.tagName.toUpperCase()) && !ginputs_a_evitar.includes(el.type)) {
      var tempo = setTimeout(fCapturaSelMovil, 0, el);
      gtemptoque_tras_contextmenu = setTimeout(ftoquelargo, gsTesperatoque);
    }
  });
  window.addEventListener("touchstart", touchstart, true);
  window.addEventListener("touchend", touchend, true);
  window.addEventListener("touchcancel", touchend, true);
  if (!es_browser_action && window.visualViewport) {
    window.visualViewport.addEventListener("resize", function(event) {
      fAdaptaralViewport(false);
    });
    window.visualViewport.addEventListener("scroll", function(event) {
      if (window.visualViewport.scale > 1.02 || window.visualViewport.scale < 0.98) {
        fAdaptaralViewport(false);
      }
    });
  }
}
function fPreparaIframe() {
  if (es_android || es_browser_action || gBocadilloPosible) {
    giframe.sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation";
    giframe.style.display = "block";
    giframe.id = "RAEiframe";
    if (!es_browser_action) {
      giframe.setAttribute("src", "https://test.test/get_frameid_dle_rae");
    }
    if (document.body) {
      gcajaboton.appendChild(giframe);
    } else {
      document.addEventListener("DOMContentLoaded", function(event) {
        gcajaboton.appendChild(giframe);
      });
    }
    giframe.classList.add("cRAEiframe");
    fPreparaCajayBotonCierre();
    giframe.onload = function() {
      giframe.style.visibility = "visible";
      if (gidadesplazar) {
        var elementoadesplazar = giframe.contentWindow.document.getElementById(gidadesplazar);
        elementoadesplazar.scrollIntoView();
        gidadesplazar = "";
      }
      if (!es_browser_action) {
        if (!es_android) {
          if (gsLabTeclado) {
            try {
              this.contentWindow.document.addEventListener("keyup", function(evento_tecla) {
                chrome.runtime.sendMessage({lab_top_keyup_bocadillo:evento_tecla.code});
              }, true);
            } catch (e) {
              if (e.name == "SecurityError") {
                giframe.removeAttribute("src");
                giframe.setAttribute("srcdoc", gHTMLbuscando);
                return;
              }
            }
          }
          var vboton_extensor = document.createElement("a");
          vboton_extensor.id = "RAEextensor";
          vboton_extensor.title = "Maximizar";
          vboton_extensor.classList.add("cRAEextensor");
          vboton_extensor.setAttribute("tabindex", -1);
          vboton_extensor.style.display = "none";
          giframe.contentWindow.document.body.appendChild(vboton_extensor);
          vboton_extensor.addEventListener("mouseover", function(event) {
            if (gcajaboton.classList.contains("cRAEcajabotonTotal")) {
              this.title = "Acortar";
            } else {
              this.title = "Maximizar";
            }
          });
          vboton_extensor.addEventListener("click", function(event) {
            gcajaboton.classList.toggle("cRAEcajabotonTotal");
            if (gcajaboton.classList.contains("cRAEcajabotonTotal")) {
              this.title = "Acortar";
            } else {
              this.title = "Maximizar";
            }
          });
          this.contentWindow.document.addEventListener("mouseover", function(event) {
            vboton_extensor.style.display = "inline-block";
          }, true);
          this.contentWindow.document.addEventListener("mouseout", function(event) {
            vboton_extensor.style.display = "none";
          }, true);
        }
        if (es_android) {
          this.contentWindow.document.addEventListener("dblclick", function(event) {
            gcajaboton.classList.toggle("cRAEcajabotonTotal");
            if (giframe.contentWindow.document.selection) {
              giframe.contentWindow.document.selection.removeAllRanges();
            }
            if (giframe.contentWindow.getSelection()) {
              giframe.contentWindow.getSelection().removeAllRanges();
            }
          }, true);
        }
      }
    };
  }
}
function fPreparaCajayBotonCierre() {
  gboton_aspa.id = "RAEaspa";
  gboton_aspa.title = "Cerrar bocadillo\n(Esc)";
  gboton_aspa.classList.add("cRAEaspa");
  gboton_aspa.setAttribute("tabindex", 0);
  gboton_aspa.style.display = "none";
  gboton_aspa.onkeydown = function(event) {
    if (event.key != "Tab") {
      event.preventDefault();
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        chrome.runtime.sendMessage({top_oculta_bocadillo:true});
      }
    }
  };
  gcajaboton.appendChild(gboton_aspa);
  gcajaboton.style.display = "none";
  gcajaboton.classList.add("cRAEcajaboton");
  gcajaboton.id = "CAJAspan";
  if (document.body) {
    document.body.appendChild(gcajaboton);
  } else {
    document.addEventListener("DOMContentLoaded", function(event) {
      document.body.appendChild(gcajaboton);
    });
  }
}
;