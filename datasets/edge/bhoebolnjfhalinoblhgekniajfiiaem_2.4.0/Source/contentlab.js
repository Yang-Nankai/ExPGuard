let gLabTempTeclaActivadora;
let gLabTesperaSegundaTecla = 300;
let gLabATiempo = false;
let gLabTempRatonQuieto;
let gLabTesperaRatonQuieto = 200;
let gLabNoTEXT_NODEValidos = ["TEXTAREA", "INPUT"];
let contenedor_chivato = document.createElement("div");
let imagenDLE = document.createElement("img");
let pchivada = document.createElement("span");
function fEs_letra(s) {
  return /[A-Za-z\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00c0\u00c8\u00cc\u00d2\u00d9\u00e0\u00e8\u00ec\u00f2\u00f9\u00c4\u00cb\u00cf\u00d6\u00dc\u00e4\u00eb\u00ef\u00f6\u00fc\u00e2\u00ea\u00ee\u00f4\u00fb\u00c2\u00ca\u00ce\u00d4\u00db\u00f1\u00d1\u00e7\u00c7\u00ba\u00aa]/.test(s);
}
function fEsNodoSeparador(node) {
  return node ? /^(BR|DIV|P|PRE|TD|TR|TH|TABLE|ABBR|DT|DD|DL|UL|OL|LI|H1|H2|H3|H4|H5|BUTTON|A|HEAD|BODY|#comment)$/i.test(node.nodeName) : true;
}
function getNextNode(node) {
  var n = null;
  if (node.nextSibling) {
    n = node.nextSibling;
  } else if (node.parentNode && !fEsNodoSeparador(node.parentNode) && node.parentNode.nextSibling) {
    n = node.parentNode.nextSibling;
  }
  return fEsNodoSeparador(n) ? null : n;
}
function getPrevNode(node) {
  var n = null;
  if (node.previousSibling) {
    n = node.previousSibling;
  } else if (node.parentNode && !fEsNodoSeparador(node.parentNode) && node.parentNode.previousSibling) {
    n = node.parentNode.previousSibling;
  }
  return fEsNodoSeparador(n) ? null : n;
}
function fIdentificarPalabra(event) {
  var i, begin, end, range, nodo_inicial, offset;
  function fEnRectangulo(posX, posY, posRectangulo) {
    var tolerancia = 5;
    if (posX < posRectangulo.left - tolerancia || posX > posRectangulo.right + tolerancia || posY < posRectangulo.top - tolerancia || posY > posRectangulo.bottom + tolerancia) {
      return false;
    } else {
      return true;
    }
  }
  function fPalabraEnINPUTChrome(elem, x, y) {
    if (elem.nodeName == "INPUT" || elem.nodeName == "TEXTAREA") {
      if ("selectionStart" in elem && document.activeElement == elem) {
        if (elem.selectionStart == null || !fEs_letra(elem.value[elem.selectionStart])) {
          return "";
        }
        var i = begin = end = elem.selectionStart;
        while (i > 0 && fEs_letra(elem.value[i - 1])) {
          i--;
        }
        begin = i;
        i = elem.selectionStart;
        while (i < elem.value.length - 1 && fEs_letra(elem.value[i + 1])) {
          i++;
        }
        end = i;
        return elem.value.substring(begin, end + 1);
      }
    } else {
      for (var i = 0; i < elem.childNodes.length; i++) {
        var range = elem.childNodes[i].ownerDocument.createRange();
        range.selectNodeContents(elem.childNodes[i]);
        if (range.getBoundingClientRect().left <= x && range.getBoundingClientRect().right >= x && range.getBoundingClientRect().top <= y && range.getBoundingClientRect().bottom >= y) {
          range.detach();
          return fPalabraEnINPUTChrome(elem.childNodes[i], x, y);
        } else {
          range.detach();
        }
      }
    }
  }
  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(event.clientX, event.clientY);
    if (!range) return "";
    nodo_inicial = range.offsetNode;
    offset = range.offset;
  } else if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
    nodo_inicial = range.startContainer;
    offset = range.startOffset;
    if (nodo_inicial.nodeType !== Node.TEXT_NODE && gLabNoTEXT_NODEValidos.includes(event.target.tagName)) {
      return fPalabraEnINPUTChrome(event.target, event.clientX, event.clientY);
    }
  }
  if (!nodo_inicial || event.target.type == "password" || nodo_inicial.nodeType !== Node.TEXT_NODE && !gLabNoTEXT_NODEValidos.includes(nodo_inicial.nodeName)) {
    return "";
  }
  var data = nodo_inicial.textContent;
  if (gLabNoTEXT_NODEValidos.includes(nodo_inicial.nodeName)) {
    data = nodo_inicial.value;
  }
  if (offset >= data.length) {
    offset = data.length - 1;
  }
  if (!fEs_letra(data[offset])) {
    return "";
  }
  i = begin = end = offset;
  while (i > 0 && fEs_letra(data[i - 1])) {
    i--;
  }
  begin = i;
  i = offset;
  while (i < data.length - 1 && fEs_letra(data[i + 1])) {
    i++;
  }
  end = i;
  var word = data.substring(begin, end + 1);
  const rango_nodo = document.createRange();
  rango_nodo.selectNode(nodo_inicial);
  const rectangulo_nodo = rango_nodo.getBoundingClientRect();
  if (!fEnRectangulo(event.clientX, event.clientY, rectangulo_nodo)) {
    return "";
  }
  if (end === data.length - 1) {
    var nextNode = getNextNode(nodo_inicial);
  }
  if (begin === 0) {
    var prevNode = getPrevNode(nodo_inicial);
  }
  while (end === data.length - 1 && nextNode) {
    data = nextNode.textContent;
    i = 0;
    while (i < data.length && fEs_letra(data[i])) {
      word += data[i++];
    }
    end = i - 1;
    nextNode = getNextNode(nextNode);
  }
  while (begin === 0 && prevNode) {
    data = prevNode.textContent;
    i = data.length - 1;
    while (i >= 0 && fEs_letra(data[i])) {
      word = data[i--] + word;
    }
    begin = i + 1;
    prevNode = getPrevNode(prevNode);
  }
  return word;
}
function fMostrarChivato(palabra) {
  pchivada.textContent = '"' + palabra + '"...';
  contenedor_chivato.style.display = "table";
}
function fLabTrataKeyup(cod_tecla) {
  let fExpira = function() {
    gLabATiempo = false;
  };
  let fOcultarChivato = function() {
    if (top == self && contenedor_chivato.style.display !== "none") {
      contenedor_chivato.style.display = "none";
    } else {
      chrome.runtime.sendMessage({lab_top_oculta_chivato:true});
    }
  };
  if (gsLabTecla == "CTRL" && (cod_tecla === "ControlLeft" || cod_tecla === "ControlRight") || gsLabTecla == "SHF" && (cod_tecla === "ShiftLeft" || cod_tecla === "ShiftRight") || gsLabTecla == "CMD" && (cod_tecla === "OSLeft" || cod_tecla === "OSRight" || cod_tecla === "MetaLeft" || cod_tecla === "MetaRight")) {
    if (gLabTempTeclaActivadora && gLabATiempo) {
      clearTimeout(gLabTempTeclaActivadora);
      gLabATiempo = false;
      chrome.runtime.sendMessage({dame_ultima_palabra_bajo_raton:true}, function(response) {
        if (response.word) {
          if (gcajaboton.style.display !== "none") {
            giframe.setAttribute("srcdoc", gHTMLbuscando);
          }
          if (gsLabChivatoTeclado) {
            if (top == self) {
              fMostrarChivato(response.word);
            } else {
              chrome.runtime.sendMessage({lab_top_muestra_chivato:true});
            }
            var gLabTempOcultarChivato = setTimeout(fOcultarChivato, 1000);
          }
          if (gsLabResTeclado != "ventana") {
            if (top == self) {
              fmuestrabocadillo(response.word.toLowerCase());
            } else {
              chrome.runtime.sendMessage({top_palabra_para_bocadillo:response.word.toLowerCase()});
            }
          } else {
            chrome.runtime.sendMessage({palabra_a_buscar:response.word.toLowerCase()});
          }
        }
      });
    } else {
      gLabATiempo = true;
      gLabTempTeclaActivadora = setTimeout(fExpira, gLabTesperaSegundaTecla);
    }
  }
}
function fLabCreaEventos() {
  if (gsLabTeclado && gsLabChivatoTeclado && top == self) {
    contenedor_chivato.id = "RAEcontenedor_chivato";
    imagenDLE.id = "RAEimagenDLE";
    imagenDLE.setAttribute("src", chrome.runtime.getURL("img/dle16.png"));
    contenedor_chivato.appendChild(imagenDLE);
    pchivada.id = "RAEchivato";
    pchivada.appendChild(document.createTextNode(""));
    contenedor_chivato.appendChild(pchivada);
    contenedor_chivato.style.display = "none";
    if (document.body) {
      document.body.appendChild(contenedor_chivato);
    } else {
      document.addEventListener("DOMContentLoaded", function(event) {
        document.body.appendChild(contenedor_chivato);
      });
    }
  }
  if (gsLabTeclado) {
    document.onkeyup = function(e) {
      fLabTrataKeyup(e.code);
    };
  }
  var fPedirPalabra = function(evento) {
    var word = fIdentificarPalabra(evento);
    chrome.runtime.sendMessage({palabra_bajo_raton:true, palabra:word});
    if (gsLabTeclado && gsLabChivatoTeclado && word) {
      if (top == self) {
        contenedor_chivato.style.left = evento.clientX + 10 + "px";
        contenedor_chivato.style.top = Math.max(evento.clientY - 10, 0) + "px";
      } else {
        window.parent.postMessage({request:"coord_chivato", mouseX:evento.clientX, mouseY:evento.clientY}, "*");
      }
    }
    if (false && word) {
      if (gcajaboton.style.display !== "none") {
        giframe.setAttribute("srcdoc", gHTMLbuscando);
      }
      fcargapalabra(word);
    }
  };
  if (gsLabContextual || gsLabTeclado) {
    document.body.onmousemove = function(evento_raton) {
      if (gLabTempRatonQuieto) {
        clearTimeout(gLabTempRatonQuieto);
      }
      gLabTempRatonQuieto = setTimeout(fPedirPalabra, gLabTesperaRatonQuieto, evento_raton);
    };
  }
  if (gsLabContextual) {
    document.addEventListener("mousedown", function(evento_raton) {
      if (evento_raton.button == 2) {
        setTimeout(() => {
          chrome.runtime.sendMessage({lab_crea_borra_menu_palabra:true, palabra:fIdentificarPalabra(evento_raton), seleccion:!gtags_a_evitar.includes(evento_raton.target.tagName.toUpperCase()) && !ginputs_a_evitar.includes(evento_raton.target.type) ? fCapturaSel(evento_raton.target).trim() : null, es_input:gLabNoTEXT_NODEValidos.includes(evento_raton.target.nodeName)});
        });
      }
    });
  }
  if (gsLabContextual) {
    document.onkeydown = function(e) {
      if (e.code === "ContextMenu") {
        chrome.runtime.sendMessage({dame_ultima_palabra_bajo_raton:true}, function(response) {
          setTimeout(() => {
            chrome.runtime.sendMessage({lab_crea_borra_menu_palabra:true, palabra:response.word, seleccion:!gtags_a_evitar.includes(e.target.tagName.toUpperCase()) && !ginputs_a_evitar.includes(e.target.type) ? fCapturaSel(e.target).trim() : null, es_input:gLabNoTEXT_NODEValidos.includes(e.target.nodeName)});
          });
        });
      }
    };
  }
  if (gsLabContextual && gsContextual) {
    document.addEventListener("contextmenu", function(evento_raton) {
      setTimeout(() => {
        chrome.runtime.sendMessage({crea_menu:true});
      });
    });
  }
  document.body.addEventListener("mouseleave", function() {
    if (gLabTempRatonQuieto) {
      clearTimeout(gLabTempRatonQuieto);
    }
    chrome.runtime.sendMessage({palabra_bajo_raton:true, palabra:""});
  });
  if (gsLabContextual && top == self) {
    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState !== "visible") {
        chrome.runtime.sendMessage({lab_borra_menu:true});
      }
    });
  }
  window.addEventListener("message", evt => {
    if (evt.data.request !== "coord_chivato") {
      return;
    }
    let iframe = Array.from(document.querySelectorAll("iframe")).filter(f => f.contentWindow === evt.source)[0];
    if (!iframe) {
      return;
    }
    let pos = iframe.getBoundingClientRect();
    let style = getComputedStyle(iframe);
    let paddX = style.paddingLeft.substring(0, style.paddingLeft.length - 2);
    let paddY = style.paddingTop.substring(0, style.paddingTop.length - 2);
    let mouseX = evt.data.mouseX + pos.left + (parseInt(paddX) ? parseInt(paddX) : 0);
    let mouseY = evt.data.mouseY + pos.top + (parseInt(paddY) ? parseInt(paddY) : 0);
    if (top == self) {
      contenedor_chivato.style.left = mouseX + 10 + "px";
      contenedor_chivato.style.top = Math.max(mouseY - 10, 0) + "px";
    } else {
      window.parent.postMessage({request:"coord_chivato", mouseX, mouseY}, "*");
    }
  });
}
if (top == self) {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.lab_keyup_bocadillo) {
      fLabTrataKeyup(request.lab_keyup_bocadillo);
    }
    if (request.lab_muestra_chivato) {
      fMostrarChivato(request.word);
    }
    if (request.lab_oculta_chivato && contenedor_chivato.style.display !== "none") {
      contenedor_chivato.style.display = "none";
    }
    if (gmanifest_version >= 3) {
      sendResponse();
    }
  });
}
;