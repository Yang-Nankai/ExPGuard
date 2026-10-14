const es_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
const es_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const gmanifest_version = chrome.runtime.getManifest().manifest_version;
var vinyeta_inicial = document.createElement("ul");
var parrafo_inicial = document.createElement("p");
var enlace_inicial = document.createElement("a");
parrafo_inicial.appendChild(document.createTextNode("Si en tres segundos no aparece la lista de dudas frecuentes, las puede consultar en el siguiente sitio:\n"));
if (gmanifest_version >= 3 && !es_firefox) {
  enlace_inicial.href = "https://chrome.google.com/webstore/detail/diccionario-rae-en-bocadi/gklihgcnchjjfcmihmpgennnemkkpnen";
  enlace_inicial.title = "Diccionario RAE en bocadillo - Extensi\u00f3n para Google Chrome";
  enlace_inicial.appendChild(document.createTextNode("https://chrome.google.com/webstore/detail/diccionario-rae-en-bocadi/gklihgcnchjjfcmihmpgennnemkkpnen"));
} else {
  enlace_inicial.href = "https://addons.mozilla.org/es/firefox/addon/diccionario-rae-en-bocadillo/";
  enlace_inicial.title = "Diccionario RAE en bocadillo - Extensi\u00f3n para Firefox";
  enlace_inicial.appendChild(document.createTextNode("https://addons.mozilla.org/es/firefox/addon/diccionario-rae-en-bocadillo/"));
}
vinyeta_inicial.appendChild(parrafo_inicial);
vinyeta_inicial.appendChild(enlace_inicial);
document.addEventListener("DOMContentLoaded", function(event) {
  var ayuda = document.getElementById("aayuda");
  if (es_android) {
    ayuda.href = "ayudaandroid.html";
  }
  var div_cont = document.getElementById("div_contenedor");
  div_cont.appendChild(vinyeta_inicial);
  fetch("https://addons.mozilla.org/api/v5/addons/addon/2618754/").then(function(response) {
    if (response.ok) {
      response.json().then(function(myJson) {
        if (myJson.description && myJson.description["es-ES"]) {
          myJson = myJson.description["es-ES"];
          myJson = myJson.split("\u00a0").join("<br>");
          var parser = new DOMParser();
          var doc = parser.parseFromString(myJson, "text/html");
          var vinyetas = doc.getElementsByTagName("UL")[0];
          div_cont.replaceChild(vinyetas, div_cont.getElementsByTagName("UL")[0]);
        }
      });
    } else {
    }
  })["catch"](function(error) {
  });
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
  }
});