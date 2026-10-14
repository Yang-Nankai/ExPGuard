(function () {
    console.log('nilread.wkx', window.location.href);
    document.documentElement.setAttribute('nilread-wkx', '1.1');
    window.addEventListener("message", function (e) {
        if (e.source === window) chrome.runtime.sendMessage(null, e.data);
    });
})();

