// Source: the URL of this extension page, including its fragment.
const attackerMarkup = document.URL.split("#")[1] || "";
const preview = document.getElementById("preview");

// Sink: assigning untrusted markup to innerHTML enables extension-context XSS.
preview.innerHTML = decodeURIComponent(attackerMarkup);
