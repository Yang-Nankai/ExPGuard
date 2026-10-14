let prefs = {};
let msgData;

const onLoad = async () => {
  msgData = await exlib.loadPrefsA("msgData", {});
  prefs["soundData"] = await exlib.loadPrefsA("soundData", "");
  let scriptInfo = await exlib.loadPrefsA("scriptInfo", [{}, {}, {}]);

  $("#alertSound").addEventListener("click", function () { setPref(this.id, this.checked); toggleCustomSound(this.checked); });
  $("#soundFile").addEventListener("change", function () { onSoundSelect(this.files[0]); });
  $("#btn-choose").addEventListener("click", function () { onChoose(); });
  $("#soundUrl").addEventListener("input", function () { setPref(this.id, this.value); });
  $("#showNotification").addEventListener("click", function () { setPref(this.id, this.checked); });

  $("#btn-save").addEventListener("click", function () { onSave(); });

  $("#updateInterval").value = prefs["updateInterval"];

  $("#alertSound").checked = prefs["alertSound"];
  $("#showNotification").checked = prefs["showNotification"];

  let em = $("#soundUrl");
  let att = em.getAttribute('i18n-placeholder');
  let s = exlib.i18nString(att);
  if (s) em.setAttribute("placeholder", s);
  em.value = prefs["soundUrl"];
  toggleCustomSound(prefs["alertSound"]);


  let root = $("#accounts");
  let host = prefs.host;
  let acc = prefs.acc;
  for (let i in scriptList) {
    let h = scriptList[i];
    let enabled = true;
    if (host[h] == null) host[h] = true;
    if (!host[h]) enabled = false;
    let em = document.createElement("div");
    em.setAttribute("class", "host");
    if (!enabled) em.classList.add("exclude");
    em.host = h;
    let em1 = document.createElement("input");
    em1.type = "checkbox";
    em1.checked = enabled;
    em1.addEventListener("click", toggleHost);
    em.appendChild(em1);
    em1 = document.createElement("span");
    em1.textContent = exlib.i18nString(h);
    em.appendChild(em1);

    if (acc[h] == null) acc[h] = {};
    let _acc = acc[h];
    let a = msgData[h];
    if (a) {
      for (let i in a) {
        if (_acc[i] == null) _acc[i] = { enabled: true, inboxOnly: true };
      }
    }
    let keys = Object.keys(_acc).sort();
    let inboxOnly = scriptInfo[2][h];
    for (let k in keys) {
      let i = keys[k];
      let active = (a && a[i] && a[i].active == true);
      let em0 = document.createElement("div");
      em0.setAttribute("class", "row acc collapsed" + (active ? "" : " disabled"));
      em0.host = h;
      em0.user = i;

      em0.appendChild(newElm("input", { "type": "checkbox" }));
      em0.appendChild(newElm("span"));
      em0.appendChild(newElm("div", { "class": "expander" }));
      em0.appendChild(newElm("div", { "class": "del" }));
      let em1 = newElm("div", { "class": "row option" });
      if (inboxOnly) {
        em1.appendChild(newElm("input", { "type": "checkbox" }));
        em1.appendChild(document.createTextNode(exlib.i18nString("inboxOnly")));
      }
      em0.appendChild(em1);

      let ch = em0.childNodes;
      ch[0].checked = _acc[i].enabled;
      ch[1].textContent = i;
      ch[1].addEventListener("click", toggleCollapse);
      ch[2].addEventListener("click", toggleCollapse);
      ch[3].addEventListener("click", deleteAccount);
      if (inboxOnly) ch[4].childNodes[0].checked = _acc[i].inboxOnly;
      em.appendChild(em0);
    }
    root.appendChild(em);
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  prefs = await loadOptionsA();
  onLoad();
});

function toggleHost() {
  this.parentNode.classList.toggle("exclude", !this.checked);
}
function toggleCollapse() {
  this.parentNode.classList.toggle("collapsed");
}
function deleteAccount() {
  const p = this.parentNode;
  delete prefs.acc[p.host][p.user];
  delete msgData[p.host][p.user]
  p.parentNode.removeChild(p);
}

async function onSave() {
  prefs["updateInterval"] = parseInt($("#updateInterval").value);
  prefs["customSound"] = prefs["soundUrl"] ? true : false;
  if (!prefs["soundUrl"]) prefs["soundData"] = "";
  else if (prefs["soundUrl"].indexOf("http") == 0) prefs["soundData"] = prefs["soundUrl"];
  let l = $$(".host");
  prefs.host = {};
  for (let i = 0; i < l.length; i++) {
    let em = l[i];
    let enable = !em.classList.contains("exclude");
    prefs.host[em.host] = enable;
    if (!enable && msgData[em.host]) delete msgData[em.host];
  }

  l = $$(".acc");
  for (let i = 0; i < l.length; i++) {
    let em = l[i];
    let d = prefs.acc[em.host][em.user];
    d.enabled = em.childNodes[0].checked;
    if (em.childNodes[4].childNodes[0]) d.inboxOnly = em.childNodes[4].childNodes[0].checked;
    if (msgData[em.host] && msgData[em.host][em.user]) {
      msgData[em.host][em.user].enabled = d.enabled;
    }
  }

  $("#btn-save").disabled = true;

  await exlib.savePrefsA("msgData", msgData);
  await exlib.savePrefsA("soundData", prefs["soundData"]);
  delete prefs["soundData"];
  await extApi.storage.sync.set(prefs);


  extApi.runtime.reload();
  /*extApi.storage.sync.set(prefs, function(){
    //$("#btn-save").disabled=false;
    //exlib.savePrefs("reload",true);
    extApi.runtime.reload();
    //window.close();
  });*/
  window.close();
}

function setPref(id, val) {
  prefs[id] = val;
}
function toggleCustomSound(val) {
  $("#soundUrl").disabled = !val;
  $("#btn-choose").disabled = !val;
  $("#soundURL").classList.toggle("disabled", !val);
}

function onChoose() {
  $("#soundFile").value = "";
  $("#soundFile").click();
}
function onSoundSelect(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = function (evt) {
    $("#soundUrl").value = file.name;
    prefs["soundUrl"] = file.name;
    prefs["soundData"] = this.result;
  };
  reader.readAsDataURL(file);
}