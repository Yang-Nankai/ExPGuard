const es_mac = navigator.platform.toLowerCase().indexOf("mac") > -1;
const es_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
const gtesperamin = 50;
const gtesperamax = 2000;
const gtesperaini = 1100;
function triggerEvent(element, eventName) {
  var event = new Event(eventName);
  element.dispatchEvent(event);
}
function fValoresPorDefecto() {
  chrome.storage.local.clear(function() {
  });
}
document.addEventListener("DOMContentLoaded", function(event) {
  var prompt = document.getElementById("barra_avisos");
  var vtespera = document.getElementById("tesperatoque");
  function fMostrarOpcionesBocadillo() {
    if (check1.checked && document.formResulDobleclic.resulDobleclic.value == "bocadillo" || (check2.checked || check3.checked) && document.formResulContextual.resulContextual.value == "bocadillo" || check4.checked && document.formLabResulTeclado.labresulTeclado.value == "bocadillo") {
      document.getElementById("opcionesavanzadas").style.display = "block";
    } else {
      document.getElementById("opcionesavanzadas").style.display = "none";
    }
  }
  function fGuardar() {
    chrome.storage.local.set({sDobleclic:check1.checked, sTesperatoque:vtespera.value, sTecla:document.formTeclas.tecla.value, sContextual:check2.checked, sLabContextual:check3.checked, sLabTeclado:check4.checked, sLabTecla:document.formLabTeclado.labtecla.value, sLabChivatoTeclado:document.getElementById("checkLabchivato").checked, sResDobleclic:document.formResulDobleclic.resulDobleclic.value, sResContextual:document.formResulContextual.resulContextual.value, sLabResTeclado:document.formLabResulTeclado.labresulTeclado.value, 
    sCerrarSaliendo:document.getElementById("checkCerrarAutom").checked, sEnlazarTodas:document.getElementById("checkPermitirEnlazarTodas").checked, sCompatibleDark:document.getElementById("checkCederColores").checked, sAuxilioAutom:document.getElementById("checkAuxilio").checked}, function() {
    });
  }
  document.addEventListener("change", function(event) {
    fGuardar();
  });
  var check1 = document.getElementById("checkDobleclic");
  if (es_android) {
    check1 = document.getElementById("checkDobleclicAndroid");
  }
  check1.addEventListener("change", function(event) {
    if (check1.checked) {
      document.getElementById("teclas").removeAttribute("disabled");
      document.getElementById("teclas").className = "";
      document.getElementById("flecha1").className = "";
      document.getElementById("resulDobleclic").removeAttribute("disabled");
      document.getElementById("resulDobleclic").className = "";
    } else {
      document.getElementById("teclas").setAttribute("disabled", "disabled");
      document.getElementById("teclas").className = "deshabilitado";
      document.getElementById("flecha1").className = "deshabilitado";
      document.getElementById("resulDobleclic").setAttribute("disabled", "disabled");
      document.getElementById("resulDobleclic").className = "deshabilitado";
    }
    fMostrarOpcionesBocadillo();
  });
  var check2 = document.getElementById("checkContextual");
  var check3 = document.getElementById("checkSinSeleccion");
  check2.addEventListener("change", function(event) {
    if (check2.checked || check3.checked) {
      document.getElementById("resulContextual").removeAttribute("disabled");
      document.getElementById("flecha2").className = "";
      document.getElementById("resulContextual").removeAttribute("disabled");
      document.getElementById("resulContextual").className = "";
    } else {
      document.getElementById("resulContextual").setAttribute("disabled", "disabled");
      document.getElementById("flecha2").className = "deshabilitado";
      document.getElementById("resulContextual").setAttribute("disabled", "disabled");
      document.getElementById("resulContextual").className = "deshabilitado";
    }
    fMostrarOpcionesBocadillo();
  });
  check3.addEventListener("change", function(event) {
    if (check2.checked || check3.checked) {
      document.getElementById("resulContextual").removeAttribute("disabled");
      document.getElementById("flecha2").className = "";
      document.getElementById("resulContextual").removeAttribute("disabled");
      document.getElementById("resulContextual").className = "";
    } else {
      document.getElementById("resulContextual").setAttribute("disabled", "disabled");
      document.getElementById("flecha2").className = "deshabilitado";
      document.getElementById("resulContextual").setAttribute("disabled", "disabled");
      document.getElementById("resulContextual").className = "deshabilitado";
    }
    fMostrarOpcionesBocadillo();
  });
  var check4 = document.getElementById("checkLabTeclado");
  check4.addEventListener("change", function(event) {
    if (check4.checked) {
      document.getElementById("labteclas").removeAttribute("disabled");
      document.getElementById("labteclas").className = "";
      document.getElementById("labchivato").removeAttribute("disabled");
      document.getElementById("labchivato").className = "";
      document.getElementById("flecha3").className = "";
      document.getElementById("labresulTeclado").removeAttribute("disabled");
      document.getElementById("labresulTeclado").className = "";
    } else {
      document.getElementById("labteclas").setAttribute("disabled", "disabled");
      document.getElementById("labteclas").className = "deshabilitado";
      document.getElementById("labchivato").setAttribute("disabled", "disabled");
      document.getElementById("labchivato").className = "deshabilitado";
      document.getElementById("flecha3").className = "deshabilitado";
      document.getElementById("labresulTeclado").setAttribute("disabled", "disabled");
      document.getElementById("labresulTeclado").className = "deshabilitado";
    }
    fMostrarOpcionesBocadillo();
  });
  var radio1 = document.getElementById("resulDobleclic");
  radio1.addEventListener("change", function(event) {
    fMostrarOpcionesBocadillo();
  });
  var radio2 = document.getElementById("resulContextual");
  radio2.addEventListener("change", function(event) {
    fMostrarOpcionesBocadillo();
  });
  var radio3 = document.getElementById("labresulTeclado");
  radio3.addEventListener("change", function(event) {
    fMostrarOpcionesBocadillo();
  });
  if (!es_mac) {
    document.getElementById("radioLabTeclaCMD").style.display = "none";
    document.getElementById("radioTeclaCMD").style.display = "none";
  } else {
    document.formTeclas.tecla.value = "CMD";
    document.formLabTeclado.labtecla.value = "CMD";
  }
  if (window.getSelection) {
    var selection = window.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.selectNodeContents(document.getElementById("seleccioname"));
    selection.addRange(range);
  }
  if (es_android) {
    vtespera.min = gtesperamin;
    vtespera.max = gtesperamax;
    var vetiq = document.getElementById("etiqtespera");
    vtespera.oninput = function() {
      vetiq.style.left = 0 + (this.value - this.min) / (this.max - this.min) * 100 + "%";
      vetiq.textContent = this.value + "\u00a0ms";
    };
    chrome.storage.local.get(null, function(result) {
      if (result.sDobleclic == true || result.sDobleclic == false) {
        check1.checked = result.sDobleclic;
        vtespera.value = result.sTesperatoque;
      } else {
        vtespera.value = gtesperaini;
      }
      vetiq.style.left = 0 + (vtespera.value - vtespera.min) / (vtespera.max - vtespera.min) * 100 + "%";
      vetiq.textContent = vtespera.value + "\u00a0ms";
    });
  }
  chrome.storage.local.get(null, function(result) {
    triggerEvent(check4, "change");
    if (result.sDobleclic == true || result.sDobleclic == false) {
      check1.checked = result.sDobleclic;
      triggerEvent(check1, "change");
      check2.checked = result.sContextual;
      triggerEvent(check2, "change");
      document.formTeclas.tecla.value = result.sTecla;
      if (result.sTecla == "") {
        document.formTeclas.tecla[document.formTeclas.tecla.length - 1].setAttribute("checked", "checked");
      }
      document.formResulDobleclic.resulDobleclic.value = result.sResDobleclic;
      document.formResulContextual.resulContextual.value = result.sResContextual;
      document.getElementById("checkCerrarAutom").checked = result.sCerrarSaliendo;
      document.getElementById("checkPermitirEnlazarTodas").checked = result.sEnlazarTodas;
      document.getElementById("checkCederColores").checked = result.sCompatibleDark;
      if (result.sLabTeclado == true || result.sLabTeclado == false) {
        check3.checked = result.sLabContextual;
        check4.checked = result.sLabTeclado;
        document.getElementById("checkLabchivato").checked = result.sLabChivatoTeclado;
        document.formLabTeclado.labtecla.value = result.sLabTecla;
        document.formLabResulTeclado.labresulTeclado.value = result.sLabResTeclado;
      }
      triggerEvent(check3, "change");
      triggerEvent(check4, "change");
    }
    if (result.sAuxilioAutom == true || result.sAuxilioAutom == false) {
      document.getElementById("checkAuxilio").checked = result.sAuxilioAutom;
    }
    fMostrarOpcionesBocadillo();
  });
  if (es_android) {
    document.getElementById("cuerpo-android").style.display = "block";
  } else {
    document.getElementById("cuerpo-escritorio").style.display = "block";
  }
  document.getElementById("bguardar").onclick = fGuardar;
  document.getElementById("blisto").onclick = function() {
    chrome.tabs.query({}, function(tab) {
      if (tab.length == 1) {
        chrome.tabs.create({});
      }
    });
    chrome.tabs.query({currentWindow:true, active:true}, function(tab) {
      chrome.tabs.remove(tab[0].id);
    });
  };
  document.getElementById("bpordefecto").onclick = function() {
    prompt.textContent = "\u00a1Recuperando las opciones por defecto...! ";
    prompt.style.opacity = 1;
    prompt.style.background = "rgb(0, 230, 77)";
    fValoresPorDefecto();
    setTimeout(function() {
      prompt.textContent += " \u2714";
    }, 1000);
    setTimeout(function() {
      location.reload(true);
    }, 1500);
  };
});