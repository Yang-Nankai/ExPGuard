const target = new URL(location.href).searchParams.get('target');

window.addEventListener('message', function(msg) {
    var data = msg.data;

    if (!data.type || (data.type === 'close_modal' && openModal)) return;

    if (msg.source === document.getElementById('webapp').contentWindow) {
        sendToParent(data);
    }
});

function createIframe() {
    chrome.storage.sync.get(null, function (res) {
        var query = {
            mode: 'chrome',
            display_mode: 'iframe',
            auto_attach: true,
        };
        if (target) {
            query.target = target;
        }
        if (res && res.options) {
            Object.assign(query, res.options);
        }
        var iframe = document.createElement('iframe');
        iframe.id = 'webapp';
        getSendyURL(query, function(url) {
            iframe.src = url;    
            document.body.appendChild(iframe);
        });
    });
}

function sendToParent(data) {
    parent.postMessage(data, '*');
}

window.onload = function() {
    createIframe();
};
