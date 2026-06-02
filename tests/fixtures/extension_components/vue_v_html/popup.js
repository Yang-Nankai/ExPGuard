// A tainted string used as a Vue `template` is compiled and injected as raw
// HTML — the v-html / template injection sink.
const dirty = document.URL.split("#")[1] || "";
new Vue({ el: "#app", template: dirty });
