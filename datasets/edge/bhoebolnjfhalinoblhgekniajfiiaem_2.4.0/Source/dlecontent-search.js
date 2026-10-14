const es_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const gURLdle = "https://dle.rae.es/";
if (self.origin) {
  var es_browser_action = self.origin.indexOf("extension://") >= 0;
} else if (es_firefox) {
  var es_browser_action = true;
} else {
  var es_browser_action = false;
}
var gidadesplazar;
function ftrata_conjugaciones(vector_formas_verbales) {
  if (vector_formas_verbales[0].style.display == "none") {
    var aspecto = "grid";
  } else {
    var aspecto = "none";
  }
  for (var j = 0, l = vector_formas_verbales.length; j < l; j++) {
    var el = vector_formas_verbales[j];
    el.style.display = aspecto;
  }
}
function ftrata_enlace_interno(elemento) {
  var idadesplazar = elemento.getAttribute("hreforig").substring(elemento.getAttribute("hreforig").indexOf("#") + 1);
  if (idadesplazar) {
    var elementoadesplazar = document.getElementById(idadesplazar);
    elementoadesplazar.scrollIntoView({behavior:"smooth"});
  }
}
function ftrata_enlace(elemento) {
  if (!es_browser_action) {
    chrome.runtime.sendMessage({top_URL_para_bocadillo:elemento.getAttribute("href")});
  } else {
    document.getElementById("resultados").classList.remove("cOculta");
    var inicioHEAD = document.documentElement.innerHTML.substring(0, document.documentElement.innerHTML.indexOf("\n"));
    fetch(elemento.getAttribute("href")).then(function(response) {
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
          myJson = myJson.replace("body{", "body{visibility:hidden;");
          myJson = myJson.replace("<head>", inicioHEAD + "\n");
          window.scrollTo(0, 0);
          var parser = new DOMParser();
          var doc = parser.parseFromString(myJson, "text/html");
          document.documentElement.replaceChild(doc.body, document.documentElement.getElementsByTagName("BODY")[0]);
          document.documentElement.replaceChild(doc.head, document.documentElement.getElementsByTagName("HEAD")[0]);
          fmanipularenlaces();
          if (elemento.getAttribute("href").indexOf("#") > -1) {
            gidadesplazar = elemento.getAttribute("href").substring(elemento.getAttribute("href").indexOf("#") + 1);
            var elementoadesplazar = document.getElementById(gidadesplazar);
            setTimeout(function() {
              elementoadesplazar.scrollIntoView({behavior:"smooth"});
            }, es_firefox ? 200 : 400);
            gidadesplazar = "";
          }
        });
      } else {
      }
    }).catch(function(error) {
    });
  }
  setTimeout(function() {
    document.getElementById("resultados").classList.remove("cOculta");
  }, 1000);
}
function fmanipularenlaces() {
  var container = document.querySelector("#resultados");
  if (container) {
    var enlaces_internos = container.querySelectorAll("a[href^='#']");
    for (var j = 0, l = enlaces_internos.length; j < l; j++) {
      var el = enlaces_internos[j];
      el.setAttribute("tabindex", 0);
      el.setAttribute("hreforig", el.href);
      el.removeAttribute("href");
      el.style.cursor = "pointer";
      el.addEventListener("click", function(event) {
        event.preventDefault();
        ftrata_enlace_interno(this);
        return false;
      });
      el.onkeydown = function(event) {
        if (event.key === "Enter") {
          ftrata_enlace_interno(this);
          return false;
        }
      };
    }
    var enlaces = container.querySelectorAll("a[href]:not([href^='#'])");
    for (var i = 0, l = enlaces.length; i < l; i++) {
      var el = enlaces[i];
      el.addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("resultados").classList.add("cOculta");
        el.style.cursor = "progress";
        document.body.style.cursor = "progress";
        document.body.style.visibility = "hidden";
        ftrata_enlace(this);
        return false;
      });
    }
    var falsos_enlaces = container.querySelectorAll("span[data-id]");
    if (falsos_enlaces.length > 0 && window.getComputedStyle(falsos_enlaces[0], null).getPropertyValue("pointer-events") != "none") {
      for (var i = 0, l = falsos_enlaces.length; i < l; i++) {
        var el = falsos_enlaces[i];
        if (el.className == 'sin') {
          el.setAttribute("href", gURLdle + "?id=" + el.getAttribute("data-id"));
        }
        else {
          el.setAttribute("href", gURLdle + el.textContent);
        }
        el.addEventListener("click", function(event) {
          event.preventDefault();
          document.getElementById("resultados").classList.add("cOculta");
          el.style.cursor = "progress";
          document.body.style.cursor = "progress";
          document.body.style.visibility = "hidden";
          ftrata_enlace(this);
          return false;
        });
      }
    }
    var formas_verbales = container.querySelectorAll("div#Formas-no-personales, div#Indicativo, div#Subjuntivo, div#Imperativo");
    for (var j = 0, l = formas_verbales.length; j < l; j++) {
      var el = formas_verbales[j];
      el.style.display = "none";
    }
    var titulos_conjugaciones = container.querySelectorAll("section[id^='conjugacion'] .c-title3");
    for (var j = 0, l = titulos_conjugaciones.length; j < l; j++) {
      var el = titulos_conjugaciones[j];
      el.setAttribute("tabindex", 0);
      el.style.cursor = "pointer";
      el.textContent = "\u2195\ufe0e\u2195\ufe0e\u00a0\u00a0\u00a0" + el.textContent + "\u00a0\u00a0\u00a0\u2195\ufe0e\u2195\ufe0e";
      el.title = "Mostrar/Ocultar la conjugaci\u00f3n";
      el.addEventListener("click", function(event) {
        event.preventDefault();
        ftrata_conjugaciones(formas_verbales);
        return false;
      });
      el.onkeydown = function(event) {
        if (event.key === "Enter") {
          ftrata_conjugaciones(formas_verbales);
          return false;
        }
      };
    }
    var botones_oculta_conjugaciones = container.querySelectorAll("div.c-collapse__header > button");
    for (var j = 0, l = botones_oculta_conjugaciones.length; j < l; j++) {
      var el = botones_oculta_conjugaciones[j];
      el.style.display = "none";
    }
  }
}
fmanipularenlaces();
if (!es_browser_action) {
  document.onkeyup = function(event) {
    if (event.key === "Escape") {
      chrome.runtime.sendMessage({top_oculta_bocadillo:true});
    }
  };
}
undefined;