var gURLraizdle = "https://dle.rae.es/";
var gcuadrovacio = true;
let gdatalist;
function fOcultarIframe() {
  if (gcajaboton.style.display !== "none") {
    giframe.setAttribute("src", "");
    giframe.setAttribute("srcdoc", gHTMLbuscando);
    gcajaboton.style.display = "none";
  }
}
function fAplicaAlturaIframe() {
  var posicion = gcajaboton.getBoundingClientRect();
  var posicion_body = document.body.getBoundingClientRect();
  gcajaboton.style.height = window.innerHeight - posicion.top - posicion_body.top * 2 + "px";
}
function fAlimenta_DataList(vector, valor) {
  if (!gdatalist) {
    return;
  }
  gdatalist.textContent = "";
  vector.forEach(elem => {
    let option = document.createElement("option");
    option.value = "#&#" + elem.substring(elem.indexOf("|") + 1);
    option.label = valor.trim() + "... \u279f " + elem.substring(elem.indexOf("|") + 1);
    gdatalist.append(option);
  });
}
document.addEventListener("DOMContentLoaded", function(event) {
  const input = document.getElementById("idcuadrobuscar");
  const boton = document.getElementById("bbuscar");
  const ayuda = document.getElementById("iayuda");
  const opciones = document.getElementById("iopciones");
  const adle = document.getElementById("adle");
  adle.setAttribute("href", gURLraizdle);
  const csugerencia_input = input.placeholder;
  if (es_android) {
    window.onresize = fAplicaAlturaIframe;
  }
  if (!es_android) {
    input.focus();
    ayuda.onclick = function(event) {
      chrome.tabs.create({url:"ayuda.html"});
    };
    ayuda.onkeyup = function(event) {
      if (event.key === "Enter" || event.key === " ") {
        chrome.tabs.create({url:"ayuda.html"});
      }
    };
    opciones.onclick = function(event) {
      chrome.runtime.openOptionsPage();
    };
    opciones.onkeyup = function(event) {
      if (event.key === "Enter" || event.key === " ") {
        chrome.runtime.openOptionsPage();
      }
    };
    adle.onkeyup = function(event) {
      if (event.key === " ") {
        this.click();
      }
    };
    if (es_firefox) {
      input.addEventListener("input", function(event) {
        if (input.value.length > 0 && input.value.indexOf("#&#") == -1) {
          input.placeholder = "";
          fetch("https://dle.rae.es/srv/keys?q=" + input.value).then(function(response) {
            if (response.ok) {
              response.text().then(function(myJson) {
                try {
                  myJson = JSON.parse(myJson);
                  fAlimenta_DataList(myJson, input.value);
                } catch(error) {}
              });
            } else {}
          }).catch(function(error) {});
        } else {
          input.placeholder = csugerencia_input;
          gdatalist.textContent = "";
          input.value = input.value.substring(input.value.indexOf("#&#") + 3);
        }
      });
    }
  }
  input.onfocus = function(event) {
    fOcultarIframe();
  };
  if (!es_firefox) {
    input.addEventListener("change", function(event) {
      fOcultarIframe();
    });
  }
  input.onkeydown = function(event) {
    if (event.key === "Escape" && !es_firefox && !input.value) {
      gcuadrovacio = true;
    } else {
      gcuadrovacio = false;
    }
  };
  input.onkeyup = function(event) {
    fOcultarIframe();
    if (event.key === "Enter") {
      boton.click();
    }
    if (event.key === "Escape" && !es_firefox && gcuadrovacio) {
      window.close();
    }
  };
  boton.onclick = function(event) {
    if (!es_android && document.activeElement != input) {
      input.focus();
    }
    if (input.value.trim()) {
      fcargapalabra(input.value.trim());
      if (es_android) {
        fAplicaAlturaIframe();
      }
    }
  };
  if (es_firefox && !es_android) {
    gdatalist = document.createElement("datalist");
    gdatalist.id = "dl-predictivo";
    gdatalist.lang = "es";
    document.body.append(gdatalist);
    input.setAttribute("list", "dl-predictivo");
  }
});