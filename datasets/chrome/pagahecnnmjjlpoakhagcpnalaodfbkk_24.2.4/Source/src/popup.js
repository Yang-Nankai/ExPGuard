window.onload = function() {
    chrome.storage.sync.get(null, function (res) {
        var query = {
            mode: 'chrome',
        };
        if (res && res.options) {
            Object.assign(query, res.options);
        }
        //console.log(query);
        var iframe = document.createElement('iframe');
        iframe.id = 'webapp';
        getSendyURL(query, function(url) {
            iframe.src = url;    
            document.body.appendChild(iframe);
        });
    });
};

window.addEventListener('message', function(msg) {
    if (!msg.data.type) return;

    var data = msg.data;

    if (data.type === 'send-link' && data.link) {
        copyToClipboard(data.link);
    } else if (data.type === 'update-setting') {
        msgToBackground(data);
    } 
});

function copyToClipboard(text) {
    var input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
    
    // var message = chrome.i18n.getMessage('noti_copy');
    // alert(message);
}

function msgToBackground(msg) {
    chrome.runtime.sendMessage(chrome.runtime.id, msg);
}

function msgToIframe(msg) {
    var $webapp = document.getElementById('webapp').contentWindow;

    $webapp.postMessage(msg, '*');
}

function getParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
