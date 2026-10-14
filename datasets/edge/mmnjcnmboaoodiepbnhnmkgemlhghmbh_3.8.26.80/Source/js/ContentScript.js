window.addEventListener("message", (event) => {
    if (event.data.type && (event.data.type === "FROM_PAGE")) {
        chrome.storage.local.get(["user_Id_custom_cursors"], function (result) {
            window.postMessage({ type: "FROM_EXTENSION", user_id_cursors : result.user_Id_custom_cursors}, "*");
        });
    } else if (event.data.getCustCurs) {
        if (event.data.type === 'getCursorData') {
            chrome.storage.local.get(['cursorData'], function(data) {
                !data.cursorData
                    ? chrome.runtime.sendMessage({type: 'SET_CURSOR_COOKIE'}).then(() => {})
                    : event.source.postMessage({'_cursor': data.cursorData}, '*');
            });
        }
    } else if (event.data.type && (event.data.type === "FROM_ADD_CURSOR")) {
        chrome.runtime.sendMessage({type: "REFRESH_COLLECTION"}, function (response) {

        });
    } else if (event.data.type && (event.data.type === "FROM_PAGE_CURSOR")){
        chrome.storage.local.get(["obj_cursor_url", "turn_off"], function (result) {
            if (result.turn_off === "off") {
                window.postMessage({ type: "FROM_EXTENSION_CURSOR", url : {"urlCursor" : "", "urlPointer" : ""}}, "*");
            } else {
                window.postMessage({ type: "FROM_EXTENSION_CURSOR", url : result.obj_cursor_url}, "*");
            }
        });
    } else if (event?.data?.cursorData){
        if (event.data.details.action === 'closeTab') chrome.runtime.sendMessage({type: "CLOSE_TAB"}, function (response) { });
        if (event.data.details.action === 'openTab') chrome.runtime.sendMessage({type: "OPEN_TAB",properties: event.data.details.props}, function (response) { });
        if (event.data.details.action === 'setCursor') chrome.storage.local.set({[event.data.details.key]: event.data.details.value});
        if (event.data.details.action === 'getCursor') {
            chrome.storage.local.get([event.data.details.key], response => {
                event.source.postMessage({_cursors:'1', key: response[event.data.details.key], handler: event.data.details.handler},'*');
            });
        }
        if (event.data.details.action === 'getConfigValue') {
            chrome.runtime.sendMessage({type: "GET_CONFIG_VALUE",endpoint:event.data.details.endpoint,options: event.data.details.options,handler: event.data.details.handler}, function (response) { });
        }
    }
}, false);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "CONFIG_VALUE"){
        window.postMessage({_cursors:'1', key: request.content, handler: request.handler},'*');
    }
    else if (request.type === "sendUpdate"){
        chrome.storage.local.get(["obj_cursor_url", "turn_off"], function (result) {
            if (result.turn_off === "off") {
                window.postMessage({ type: "FROM_EXTENSION_CURSOR", url : {"urlCursor" : "", "urlPointer" : ""}}, "*");
            } else {
                window.postMessage({ type: "FROM_EXTENSION_CURSOR", url : result.obj_cursor_url}, "*");
            }

        });
    }
    return true;
})

function getStyle(element, property) {
    return (getComputedStyle(element, null).getPropertyValue(property));
}

function initCursor() {
    if (!document.body || !document.body.appendChild) {
        return setTimeout(initCursor,50);
    }
    
    document.body.addEventListener('mouseover', event => {
        let pointer = getStyle(event.target, 'cursor');
        if (pointer === 'pointer') {
            event.target.classList.add("pointer-hover");
        } else if (pointer === "default" || pointer === "auto") {
            event.target.classList.add("cursor-hover");
        }
    })
    
    const defaultAndPointerCursors = document.createElement('script');

    defaultAndPointerCursors.src = chrome.runtime.getURL('js/initCursor.js');
    document.body.appendChild(defaultAndPointerCursors);
}

function changeCursor(urlCursor, urlPointer) {
    
    if(!document.head || !document.head.appendChild) {
        return setTimeout(() => changeCursor(urlCursor, urlPointer), 100);
    }
    
    const styleSheet = document.createElement('style');

    styleSheet.type = 'text/css';
    styleSheet.rel = 'stylesheet';
    styleSheet.innerHTML = `.cursor-hover {
        cursor: url("${urlCursor.blob}"), auto !important;
        cursor: -webkit-image-set(
        url("${urlCursor.blob}") 1x,
        url("${urlCursor.sizedBlob}") 2x
        ), auto !important;
    }
    a, button, .pointer-hover {
        cursor: url("${urlPointer.blob}"), auto !important;
        cursor: -webkit-image-set(
        url("${urlPointer.blob}") 1x,
        url("${urlPointer.sizedBlob}") 2x
        ), auto !important;
    }
    `;
    document.head.appendChild(styleSheet);
}

function disableCursor() {
    if(!document.head || !document.head.appendChild) {
        return setTimeout(() => disableCursor(), 100);
    }
    
    let styleSheet = document.createElement('style');

    styleSheet.type = 'text/css';
    styleSheet.rel = 'stylesheet';

    styleSheet.innerHTML = `a, button, .cursor-hover {\n  cursor: default !important;\n        }\n 
    a, button, .pointer-hover {\n  cursor: pointer !important;\n        }\n `;
    document.head.appendChild(styleSheet);
}

function checkCursorSize() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['cursor_size'], function(result) {
            let width = '';
            let height = '';
            switch (result.cursor_size) {
                case 'one' :
                    width = 16;
                    height = 16;
                    break;
                case 'two' :
                    width = 22;
                    height = 22;
                    break;
                case 'three':
                    width = 32;
                    height = 32;
                    break;
                case 'four':
                    width = 38;
                    height = 38;
                    break;
                case 'five':
                    width = 42;
                    height = 42;
                    break;
                case 'six' :
                    width = 50;
                    height = 50;
                    break;
            }
            resolve({
                'width': width,
                'height': height,
            });
        });

    });
}

function getResultPath(originPath, size) {
    const idx = originPath.lastIndexOf('.');
    const format = originPath.substring(idx);

    return originPath.substring(0, idx) + '__' + size + format;
}

function toDataURL(url) {
    return new Promise(resolve => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = (e) => {
                    resolve('');
                };
                reader.readAsDataURL(blob);
            });
    });
}

function resizeDataURL(data, wantedWidth) {
    return new Promise(async function(resolve) {
        const cursorPath = getResultPath(data, wantedWidth);
        const biggerCursorPath = getResultPath(data, wantedWidth * 2);

        try {
            const blob = await toDataURL(cursorPath);
            const sizedBlob = await toDataURL(biggerCursorPath);

            resolve({
                url: cursorPath,
                blob,
                sizedBlob,
            });
        }
        catch (e) {
            resolve({
                url: cursorPath,
                blob: cursorPath,
                sizedBlob: biggerCursorPath,
            });
        }
    });
}

function getResizedUrl(cursorUrl, pointerUrl) {
    return new Promise(async(resolve, reject) => {
        const sizeObj = await checkCursorSize();
        const dataResizedCursor = await resizeDataURL(cursorUrl, sizeObj.width);
        const dataResizedPointer = await resizeDataURL(pointerUrl, sizeObj.width);

        const newObj = {
            urlCursor: dataResizedCursor,
            urlPointer: dataResizedPointer,
        };

        resolve(newObj);
    });
}

async function updateCursor(defaultUrls) {
    const resizedUrl = await getResizedUrl(defaultUrls.urlCursor, defaultUrls.urlPointer);
    chrome.storage.local.set({'obj_cursor_url': resizedUrl});
}


chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === "obj_cursor_url") {
            changeCursor(newValue.urlCursor, newValue.urlPointer)
        }
        if (key === "turn_off" && newValue === "off") {
            disableCursor()
        }
    }
})

chrome.storage.local.get(["obj_cursor_url", "extension_play", 'default_url'], function (result) {
    if (result.obj_cursor_url && (Object.keys(result.obj_cursor_url).length > 0) && result.extension_play === "on"){
        changeCursor(result.obj_cursor_url.urlCursor, result.obj_cursor_url.urlPointer)
    }
    if ((!result.obj_cursor_url || Object.keys(result.obj_cursor_url).length === 0) && result.default_url && result.extension_play === "on"){
        updateCursor(result.default_url);
    }
});

initCursor();
