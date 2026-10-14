
export const defaultSettings = {
    doubleClick: true,
    holdCommand: false,
    holdAlt: false,
    holdCtrl: false,
    autoAudio: false,
    autoLang: false,
    notify: true,
    showHints: true,
    notNew: true,
    remember: '',
    userid: '',
    avatar: '',
    sourceLanguage: '',
    targetLanguage: 'ru',
    currentTranslation: {},
    currentContext: '',
    currentContextTranslation: '',
    historyTranslations: [],
    pageText: '',
    pageTitle: '',
    host: 'api.lingualeo.com',
    knownLanguages: [navigator.language.slice(0, 2).toLowerCase()],
    lastAlert: '',
    fetching: false,
    isMac: navigator.platform.indexOf('Mac') > -1,
    learningLanguage: '',
    triggerTargetAlert: true
};

export const getUserProfile = settings => {
    const { remember, userid, host, learningLanguage, sourceLanguage } = settings;
    let headers = {
        'Content-type': 'application/json',
        'Cookie': `remember="${remember}";userid=${userid}`,
    }

    const body = JSON.stringify({"apiVersion":"1.0.1", "port": 1001, "attrList":{"avatar":"avatar","hungry":"hungry","interfaceLang":"lang_interface","lastName":"sn","level":"level","levelName":"levelName","meatBalls":"mb","nativeLang":"nativeLang","nickName":"nn","payments":"payments","sex":"sex","subscriptions":"subscr","targetLang":"targetLang","timezone":"timezone","trainingAutoplay":"trainingAutoplay","userGameLevel":"userGameLevel","userTitle":"userTitle","voiceSex":"vs","xp":"xp","xpLevel":"xpLevel","xpRemaining":"xpRemaining"},"ctx":{"config":{"isCheckData":true,"isLogging":true}}})
        fetch(`https://${host}/getUserProfile`, {method: 'POST', body, headers})
        .then(res =>  res.json())
        .then(jsonRes => {
            if (jsonRes.data && jsonRes.data.targetLang) {
                const { avatar, nativeLang, targetLang } = jsonRes.data;
                if (avatar === "https://contentcdn.lingualeo-beta.com/uploads/avatar/noavatar.png") {
                    chrome.storage.local.set({avatar: 'https://contentcdn.lingualeo.com/uploads/avatar/noavatar.png', targetLanguage: nativeLang, learningLanguage: targetLang.slice(0, 2).toLowerCase()});
                } else {
                    chrome.storage.local.set({avatar, targetLanguage: nativeLang, learningLanguage: targetLang.slice(0, 2).toLowerCase()});
                }
    
                if (sourceLanguage !== targetLang) {
                    chrome.storage.local.set({triggerTargetAlert: true});
                }
                if (!sourceLanguage) {
                    chrome.storage.local.set({sourceLanguage: targetLang});
                }
            } 
        })
        .catch(err => {
            console.log('Error: ' + err.message);
            console.log(err.response);
        })
}

export const getAuth = () => {
    chrome.storage.local.get(null, restored => {
        const clearHost = restored.host.split('.')[1] + '.' + restored.host.split('.')[2];
        chrome.cookies.get({url: `https://${clearHost}/ru/dashboard`, name: "userid"}, cookie => {
            chrome.storage.local.set({userid: cookie ? cookie.value : ''})
            chrome.cookies.get({url: `https://${clearHost}/ru/dashboard`, name: "remember"}, cookie => {
                chrome.storage.local.set({remember: cookie ? cookie.value : ''})
                chrome.action.setIcon({path: `img/logo-paw${!cookie ? '-grey' : ''}.png`});
                cookie && chrome.storage.local.get(null, getUserProfile);
            })
        });
    });
}

export const checkStoredSettings = storedSettings => {
    if (!storedSettings.notNew) {
        chrome.storage.local.set(defaultSettings);
    }
    
    chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: navigator.platform.indexOf('Mac') > -1})

    getAuth();
}

export function setupCookieListeners() {
    chrome.cookies.onChanged.addListener(function(changeInfo) {
        chrome.storage.local.get(null, settings => {
            const { host } = settings;
            const formattedHost = '.' + host.split('.')[1] + '.' + host.split('.')[2];
            if (changeInfo.cookie.domain === formattedHost && changeInfo.cookie.name === "remember") {
                chrome.storage.local.set({remember: changeInfo.removed ? '' :  changeInfo.cookie.value})
                !changeInfo.removed && chrome.storage.local.get(null, getUserProfile);
                changeInfo.removed && chrome.storage.local.set({userid: '', targetLanguage: navigator.language.slice(0, 2).toLowerCase()});
                chrome.action.setIcon({path: `img/logo-paw${changeInfo.removed ? '-grey' : ''}.png`});
            } else if (changeInfo.cookie.domain === formattedHost && changeInfo.cookie.name === "lang") {
                ('langUpd', changeInfo.cookie.value.slice(0, 2));
                chrome.storage.local.set({targetLanguage: changeInfo.removed ?  navigator.language.slice(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})
            }
        });
    });
}

export function setupTabListeners() {
    chrome.tabs.onActivated.addListener(tab => {
        const { tabId } = tab;
        chrome.tabs.get(tabId, tab => {
            if (tab.url.slice(0, 21) === 'https://lingualeo.com') {
                chrome.storage.local.get(null, getUserProfile)
            }
        })
    });
}
