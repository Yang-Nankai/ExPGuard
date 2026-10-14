const analyticID = '223373701-1';
const topCollectionId = '61f0107fdf02797036b0807d';
const gcmKey = '744626227416';
const env = 'prod';

function createUser() {
    return new Promise(async(resolve, reject) => {
        const response = await fetch('https://cursor-changer.online/node/user',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cursorsCollection: [], lastUsedCollection: []}),
            });

        const data = await response.json();

        resolve(data);
    });
}

function addCursor(userId, cursorId) {
    return new Promise( async(resolve, reject) => {
        const response = await fetch('https://cursor-changer.online/node/cursor',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: userId, collectionId: topCollectionId, cursorId: cursorId}),
            });

        resolve(response);
    });
}

function deleteCursor(userId, cursorId) {
    return new Promise(async(resolve, reject) => {
        const response = await fetch('https://cursor-changer.online/node/cursor',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: userId, cursorId: cursorId}),
            });

        resolve(response);
    });
}

function getGlobalConfig(userId) {
    return new Promise(async(resolve, reject) => {
        const data = await fetch('https://cursor-changer.online/node/globalConfig/' + userId);
        const json = await data.json();
        resolve(json);
    });
}

function getTopCursors() {
    return new Promise(async(resolve, reject) => {
        const data = await fetch(`https://cursor-changer.online/node/collection/${topCollectionId}`);
        const json = await data.json();

        resolve(json);
    });
}

function getUserCollection(userId) {
    return new Promise(async(resolve, reject) => {
        const data = await fetch('https://cursor-changer.online/node/user/collection/' + userId);
        const json = await data.json();

        resolve(json);
    });
}

function setCursorCookie () {
    return new Promise(resolve => {
        chrome.cookies.getAll({ url: "https://cursor-changer.online" }, _cookies => {
            for(let i = 0; i < _cookies.length; i++){
                if (_cookies[i].name === 'cursorData') {
                    const cursorData = JSON.parse(JSON.stringify(decodeURIComponent(_cookies[i].value)));
                    cursorData && chrome.storage.local.set({cursorData});
                }
            }
            setTimeout(resolve, 100)
        });
    });
}

function fillCollection(collection) {
    const updatedCollection = {...collection};

    return new Promise(async (resolve) => {
        try {
            if (!updatedCollection['cursor_path_blob']) {
                updatedCollection['cursor_path_blob'] = await toDataURL(collection['cursor_path']);
            }

            if (!updatedCollection['pointer_path_blob']) {
                updatedCollection['pointer_path_blob'] = await toDataURL(collection['pointer_path']);
            }
            resolve(updatedCollection);
        }
        catch (e) {
            resolve(updatedCollection);
        }
    });
}

function joinUserCollectionWithDownloadedData(userCollection, updatedUserCollection, resolve) {
    let userCollectionWithUpdate = [];

    if (!userCollection || userCollection.length === 0) {
        userCollectionWithUpdate = [...updatedUserCollection];
    }
    else {
        updatedUserCollection.forEach(newCursor => {
            const existedCursor = userCollection.find(cursorOld => cursorOld['cursor_path'] === newCursor['cursor_path']);

            existedCursor
                ? userCollectionWithUpdate.push(existedCursor)
                : userCollectionWithUpdate.push(newCursor);
        });
    }

    const promises = userCollectionWithUpdate.map(collection => {
        return fillCollection(collection)
            .then(newCollection => {
                return newCollection;
            });
    });

    Promise.allSettled(promises)
        .then(results => {
            const mappedUserCollection = results.map(({value}) => value);
            chrome.storage.local.set({'user_collection': mappedUserCollection}, resolve);
        })
        .catch(e => {
            chrome.storage.local.set({'user_collection': userCollection}, resolve);
        });
}

function updateUserCollection() {
    return new Promise( resolve => {
        chrome.storage.local.get(['user_collection', 'user_Id_custom_cursors'], function (result) {
            if (result.user_Id_custom_cursors) {
                getUserCollection(result.user_Id_custom_cursors).then(data => {
                    joinUserCollectionWithDownloadedData(result['user_collection'], data, resolve);
                }).catch((e) => {
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    });
}

function getFeedback(installDate, customCursorsUserId) {
    const waitingTime = env === 'dev' ? 30*1000 : 3*24*60*60*1000;
    const timeoutValue = env === 'dev' ? 5*1000 : 60*60*1000;
    const uuid = env === 'dev' ? 'tester' : customCursorsUserId;

    if (new Date().getTime() >= installDate + waitingTime) {
        chrome.tabs.create({'url': `https://cursor-changer.online/feedback.html?data=&userId=${uuid}&extensionId=${chrome.runtime.id}`});
    }
    else {
        return setTimeout(() => getFeedback(installDate, customCursorsUserId), timeoutValue);
    }
}

function waitingDependencies() {
    chrome.storage.local.get(['install_date', 'user_Id_custom_cursors'], function(result) {
        if (!result.install_date || !result.user_Id_custom_cursors) {
            return setTimeout(waitingDependencies, 100);
        }
        getFeedback(result.install_date, result.user_Id_custom_cursors);
    });
}

function initAnalytics(userId, width = null, height = null, language = null) {
    const EVENT_CATEGORY = 'extOpen';
    const EVENT_ACTION = null;
    const EVENT_LABEL = null;
    const EVENT_VALUE = 1;

    setInterval(() => {
        fetch(`https://cursor-changer.online/guser/${userId}/${EVENT_CATEGORY}/${EVENT_ACTION}/${EVENT_LABEL}/${EVENT_VALUE}/${width}x${height}/${language}/${analyticID}`).then(r => void r);
    }, 60*60*1000);
    fetch(`https://cursor-changer.online/guser/${userId}/${EVENT_CATEGORY}/${EVENT_ACTION}/${EVENT_LABEL}/${EVENT_VALUE}/${width}x${height}/${language}/${analyticID}`).then(r => void r);
}

updateUserCollection();

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

chrome.storage.local.get(['topCollection', 'cursor_size', 'extension_play', 'install_date', 'user_Id_custom_cursors', 'tryingUrl', 'cursorData', 'initialSet','user_collection'], function (result) {
    if (!result.topCollection) {
        getTopCursors().then(data => {
            getNormalizedTopCollection(data.items);
            
        });
    }
    //if(!result.initialSet)
    if(!result.initialSet && (!result.user_collection || result.user_collection.length == 0))
    {
        initialCusors();
    }
    if (!result.tryingUrl) {
        chrome.storage.local.set({"tryingUrl": "off"})
    }
    if (!result.cursor_size) {
        chrome.storage.local.set({'cursor_size': 'three'});
    }
    if (!result.extension_play) {
        chrome.storage.local.set({'extension_play': 'on'});
    }
    if (!result.gcm_id) {
        chrome.gcm.register([gcmKey], gcm_id => {
            !chrome.runtime.lastError && chrome.storage.local.set({gcm_id})
        })
    }
    if (!result.user_Id_custom_cursors) {
        createUser().then(data => {
            chrome.storage.local.set({'user_Id_custom_cursors': data._id});
            chrome.runtime.setUninstallURL(`https://cursor-changer.online/pool?userId=${data._id}`);
            initAnalytics(data._id);
        });
    } else {
        initAnalytics(result.user_Id_custom_cursors);
    }
    /* 
    if (!result.cursorData) {
        !result.install_date
            ? chrome.storage.local.set({'install_date': new Date().getTime()}).then(() => waitingDependencies())
            : waitingDependencies();
    }
    */
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab){
        if (tab.url.startsWith("chrome://") || tab.url.startsWith('https://chrome.google') || tab.url.startsWith("chrome://newtab")){
            chrome.storage.local.set({'isExtensionWorking': false});
        } else {
            chrome.storage.local.set({'isExtensionWorking': true});
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
    if (changeInfo.url){
        if (changeInfo.url.startsWith("chrome://") || changeInfo.url.startsWith('https://chrome.google') || changeInfo.url.startsWith("chrome://newtab")){
            chrome.storage.local.set({'isExtensionWorking': false});
        } else {
            chrome.storage.local.set({'isExtensionWorking': true});
        }

    }
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'ADD') chrome.storage.local.get('user_Id_custom_cursors', async function(result) {
        const response = await addCursor(result.user_Id_custom_cursors, request.cursorId);

        if (response.status === 200) {
            updateUserCollection();
            sendResponse('ok');
        }
        else sendResponse('error');
    });
    else if (request.type === 'GET_CONFIG_VALUE' && request.endpoint && sender && sender.tab && request.handler) {
        fetch(request.endpoint, request.options).then((response) => response.text()).then((data) => {
            chrome.tabs.sendMessage(sender.tab.id,{'type':'CONFIG_VALUE','handler':request.handler,'content':data});
        }).catch((error) => {
            chrome.tabs.sendMessage(sender.tab.id,{'type':'CONFIG_VALUE','handler':request.handler,'content':null});
        });
    }
    else if (request.type === 'CLOSE_TAB') chrome.tabs.remove(sender.tab.id);
    else if (request.type === 'OPEN_TAB') chrome.tabs.create(request.properties);
    else if (request.type === 'REFRESH_COLLECTION') updateUserCollection();
    //else if (request.type === 'SET_CURSOR_COOKIE') setCursorCookie(sendResponse);
    else if (request.type === 'DELETE') chrome.storage.local.get('user_Id_custom_cursors', async function(result) {
        const response = await deleteCursor(result.user_Id_custom_cursors, request.cursorId);

        if (response.status === 200) {
            updateUserCollection();
            sendResponse('ok');
        }
        else sendResponse('error');
    });

    return true;
});

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

async function getNormalizedTopCollection(topCollection) {
    const promises = await topCollection.map(async cursor => {
        const cursorNewPathBlob = await toDataURL(cursor.cursor.newPath);
        const pointerNewPathBlob = await toDataURL(cursor.pointer.newPath);
        const updatedCursor = {...cursor};

        updatedCursor.cursor.newPathBlob = cursorNewPathBlob;
        updatedCursor.pointer.newPathBlob = pointerNewPathBlob;

        return updatedCursor;
    });

    Promise.allSettled(promises)
        .then(results => {
            const updatedTopCollection = results.map(({value}) => value);
            chrome.storage.local.set({ topCollection: updatedTopCollection });
        })
        .catch(e => {
            chrome.storage.local.set({topCollection});
        });
}

function onExtensionUpdate() {
    chrome.storage.local.get(['topCollection', 'obj_cursor_url', 'default_url'], ({ topCollection, obj_cursor_url, default_url }) => {
        if (!topCollection) {
            getTopCursors().then(data => {
                getNormalizedTopCollection(data.items);
            });
        }
        else {
            getNormalizedTopCollection(topCollection);
        }
        // eslint-disable-next-line camelcase
        if (obj_cursor_url && default_url) {
            updateCursor(default_url);
        }
    });
}

function saveGlobalConfig(data) {
    if(data && data.configVars)
    {
        chrome.storage.local.set(data.configVars);
    }
}

function updateGlobalConfig() {
    chrome.storage.local.get(['user_Id_custom_cursors'],function(localData){
        
        if(!localData['user_Id_custom_cursors'])
        {
            return;
        }
        getGlobalConfig(localData['user_Id_custom_cursors']).then(data => {
            saveGlobalConfig(data);
        });
    });
}

async function initialCusors() {
    chrome.storage.local.get(['topCollection','user_Id_custom_cursors'], async function(result) {
        if(!result || !result.topCollection || !result.user_Id_custom_cursors)
        {
            return setTimeout(initialCusors,100);
        }
        
        let cnt = 0, addOk = 0, response;
        //result.topCollection.forEach(cursor => {
        for(let i = 0;i < result.topCollection.length;i++)
        { 
            if(cnt < 20)
            {
                response = await addCursor(result.user_Id_custom_cursors, result.topCollection[i].id);
                if (response.status === 200) {
                    addOk++;
                }
            }
            cnt++;
        }
        
        if(addOk > 0)
        {
            chrome.storage.local.set({'initialSet':(new Date()).getTime()});
            updateUserCollection();
        }
    });
}

function tabsIterate() {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tb => {
            const isMatch = !(tb.url.match("https://chrome.google.com") || tb.url.match('chrome://')|| tb.url.match("chrome-error://chromewebdata/") || tb.url.match("error://chromewebdata/") || tb.url.match("view-source:") || tb.url.match("file:///") || !tb.url.match("http://") && !tb.url.match("https://"));

            isMatch && chrome.scripting.executeScript({target: {tabId: tb.id, allFrames: false}, files: ['js/ContentScript.js']});
        });
    });
}

chrome.runtime.onInstalled.addListener((details) => {
    tabsIterate();
    /* if (details.reason === 'install') {
        chrome.tabs.create({
            url: 'https://cursor-changer.online/',
        });
    } */
    if (details.reason === 'update') {
        onExtensionUpdate();
    }
});

updateGlobalConfig();