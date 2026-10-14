document.documentElement.setAttribute('esmartextension-installed', true);
document.documentElement.setAttribute('esmartextension-version', browser.runtime.getManifest().version);

window.addEventListener("message", function (event) {
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "ESMART_WEB_EXTENSION_REQUEST")) {
        browser.runtime.sendMessage({
            operation: event.data.operation,
            data: event.data.data,
            method: event.data.method
        }).then(function (response) {
            window.postMessage({ type: "ESMART_WEB_EXTENSION_RESPONSE", requestId: event.data.requestId, response: response }, "*");
        });
    }
}, false);