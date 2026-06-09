// Writing tainted data straight to .innerHTML parses it as HTML — a raw DOM
// XSS sink expressed as a member assignment (no framework, no document.write).
const dirty = document.URL.split("#")[1] || "";
const el = document.getElementById("out");
el.innerHTML = dirty;
