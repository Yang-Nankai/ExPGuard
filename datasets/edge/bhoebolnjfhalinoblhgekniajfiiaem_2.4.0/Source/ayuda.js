const es_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
const es_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const gmanifest_version = chrome.runtime.getManifest().manifest_version;
var urlParams = new URLSearchParams(window.location.search);
var paviso_icono = urlParams.get("aviso_icono");
var gatajo_comprobado = "";
function desplegar(el) {
  var tablA = document.getElementById(el);
  var el1 = document.getElementById("el1");
  var el2 = document.getElementById("el2");
  var el3 = document.getElementById("el3");
  var el4 = document.getElementById("el4");
  var entrada = document.getElementById("entrada-" + el);
  var entrada1 = document.getElementById("entrada-el1");
  var entrada2 = document.getElementById("entrada-el2");
  var entrada3 = document.getElementById("entrada-el3");
  var entrada4 = document.getElementById("entrada-el4");
  if (tablA.style.display != "none") {
    tablA.style.display = "none";
    entrada.classList.remove("entrada-abierta");
    entrada.title = "Desplegar";
  } else {
    el1.style.display = "none";
    el2.style.display = "none";
    el3.style.display = "none";
    el4.style.display = "none";
    entrada1.title = "Desplegar";
    entrada2.title = "Desplegar";
    entrada3.title = "Desplegar";
    entrada4.title = "Desplegar";
    entrada1.classList.remove("entrada-abierta");
    entrada2.classList.remove("entrada-abierta");
    entrada3.classList.remove("entrada-abierta");
    entrada4.classList.remove("entrada-abierta");
    tablA.style.display = "block";
    entrada.classList.add("entrada-abierta");
    entrada.title = "Recoger";
    window.scrollTo(0, 0);
    entrada.scrollIntoView({behavior:"smooth"});
    if (window.getSelection && !es_android) {
      var selection = window.getSelection();
      selection.removeAllRanges();
      var range = document.createRange();
      range.selectNodeContents(document.getElementById("seleccioname1"));
      selection.addRange(range);
      range = document.createRange();
      range.selectNodeContents(document.getElementById("seleccioname2"));
      selection.addRange(range);
    }
  }
}
if (!es_android && chrome.commands) {
  chrome.commands.getAll(commands => {
    if (commands[0]) {
      gatajo_comprobado = commands[0].shortcut;
    }
  });
}
document.addEventListener("DOMContentLoaded", function(event) {
  if (!es_android) {
    if (es_firefox) {
      document.getElementById("sno_firefox1").style.display = "none";
    }
    if (paviso_icono) {
      if (navigator.userAgent.toLowerCase().indexOf("edg") > -1) {
        document.getElementById("dflotador_edge").style.display = "block";
      } else {
        document.getElementById("dflotador_chrome").style.display = "block";
      }
    }
  }
  var ent1 = document.getElementById("entrada-el1");
  var ent2 = document.getElementById("entrada-el2");
  var ent3 = document.getElementById("entrada-el3");
  var ent4 = document.getElementById("entrada-el4");
  ent1.title = "Desplegar";
  ent2.title = "Desplegar";
  ent3.title = "Desplegar";
  ent4.title = "Desplegar";
  ent1.setAttribute("tabindex", 0);
  ent2.setAttribute("tabindex", 0);
  ent3.setAttribute("tabindex", 0);
  ent4.setAttribute("tabindex", 0);
  ent1.onclick = function() {
    desplegar("el1");
  };
  ent2.onclick = function() {
    desplegar("el2");
  };
  ent3.onclick = function() {
    desplegar("el3");
  };
  ent4.onclick = function() {
    desplegar("el4");
  };
  ent1.onkeyup = function(event) {
    if (event.key === "Enter") {
      desplegar("el1");
    }
  };
  ent2.onkeyup = function(event) {
    if (event.key === "Enter") {
      desplegar("el2");
    }
  };
  ent3.onkeyup = function(event) {
    if (event.key === "Enter") {
      desplegar("el3");
    }
  };
  ent4.onkeyup = function(event) {
    if (event.key === "Enter") {
      desplegar("el4");
    }
  };
  if (gmanifest_version >= 3 && !es_firefox) {
    var formulario = document.getElementById("aformulario");
    formulario.href = "https://forms.gle/UqUPwrzDU5U5TcVX6";
  }
  if (gatajo_comprobado) {
    document.getElementById("atajo_comprobado").textContent = gatajo_comprobado;
    document.getElementById("atajo_defecto").style.display = "none";
  }
  if (!es_android) {
    var opciones = document.getElementById("aopciones");
    opciones.onclick = function(event) {
      event.preventDefault();
      chrome.runtime.openOptionsPage();
    };
    opciones.onkeyup = function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        chrome.runtime.openOptionsPage();
      }
    };
    var atajos = document.getElementById("aatajos");
    atajos.oncontextmenu = function(event) {
      event.preventDefault();
    };
    atajos.onclick = function(event) {
      event.preventDefault();
      chrome.tabs.create({url:"chrome://extensions/shortcuts"});
    };
    atajos.onkeyup = function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        chrome.tabs.create({url:"chrome://extensions/shortcuts"});
      }
    };
  }
});