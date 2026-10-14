const es_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
const es_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const gmanifest_version = chrome.runtime.getManifest().manifest_version;
document.addEventListener("DOMContentLoaded", function(event) {
  var ayuda = document.getElementById("aayuda");
  if (es_android) {
    ayuda.href = "ayudaandroid.html";
  }
  if (gmanifest_version >= 3 && !es_firefox) {
    var formulario = document.getElementById("aformulario");
    formulario.href = "https://forms.gle/UqUPwrzDU5U5TcVX6";
  }
  if (!es_android) {
    var opciones = document.getElementById("aopciones");
    var opciones2 = document.getElementById("aopciones2");
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
    opciones2.onclick = function(event) {
      event.preventDefault();
      chrome.runtime.openOptionsPage();
    };
    opciones2.onkeyup = function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        chrome.runtime.openOptionsPage();
      }
    };
  }
});