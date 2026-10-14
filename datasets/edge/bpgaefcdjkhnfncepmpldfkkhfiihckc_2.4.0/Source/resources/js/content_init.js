function injectScript() {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('resources/js/alwayshd.js');
    if (document.querySelector('#scripts'))
        document.querySelector('#scripts').remove();
    s.id = "scripts";
    s.onload = function () {
        console.log('loaded');
    };
    (document.head || document.documentElement).appendChild(s);
}

if (location.href.indexOf('youtube') > 0) {
    chrome.storage.local.get('alwayshd', function (e) {
        alwayshd = e.alwayshd;
        if (alwayshd) {
            document.documentElement.dataset.youtubehd = true;
            injectScript();
        } else {
            document.documentElement.removeAttribute('data-youtubehd');
            if (document.querySelector('#scripts'))
                document.querySelector('#scripts').remove();
        }
    });
}