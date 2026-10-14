const languages = [
    // 'af',
    // 'az',
    // 'bg',
    // 'bn',
    // 'bs',
    // 'ca',
    'cs',
    // 'da',
    'de',
    'el',
    'en',
    'es',
    // 'et',
    // 'fa',
    // 'fi',
    'fr',
    // 'ga',
    'hi',
    // 'hr',
    // 'hu',
    // 'hy',
    'id',
    'it',
    // 'is',
    'ja',
    // 'ka',
    // 'kk',
    'ko',
    // 'lt',
    // 'lv',
    // 'no',
    'nl',
    // 'mk',
    // 'mt',
    'pl',
    'pt',
    // 'ro',
    'ru',
    // 'sk',
    // 'sq',
    'sr',
    // 'sv',
    // 'sl',
    // 'ta',
    // 'th',
    // 'tl',
    'tr',
    'uk',
    'vi',
    'zh',
];


document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(null, restored => {
        const { host } = restored;
        const hostFormatted = host.split('.')[1] + '.' + host.split('.')[2];
        document.getElementsByClassName("ico-settings")[0].addEventListener("click", () => openNewTab(chrome.runtime.getURL("pages/settings/settings.html")));
        document.getElementsByClassName("ico-avatar")[0].addEventListener("click", () => openNewTab(`https://${hostFormatted}`));
        document.getElementsByClassName("ico-login")[0].addEventListener("click", () => openNewTab(`https://${hostFormatted}`));
        document.getElementsByClassName("alert-buttons-login")[0].addEventListener("click", () => openNewTab(`https://${hostFormatted}`));
        document.getElementsByClassName("alert-buttons-reg")[0].addEventListener("click", () => openNewTab(`https://${hostFormatted}`));
        document.getElementsByClassName("meatballs-buttons")[0].addEventListener("click", () => openNewTab(`https://${hostFormatted}`));
        
        document.getElementsByClassName("translate-input")[0].addEventListener("input", input);
        document.getElementsByClassName("translate-input")[0].addEventListener("keypress", inputSubmit);
        document.getElementsByClassName("ico-clear")[0].addEventListener("click", clearInput);
        document.getElementsByClassName("translations-audio")[0].addEventListener("click", playAudio);
        document.getElementsByClassName("alert-close-icon")[0].addEventListener("click", closeAlert);
        document.getElementsByClassName("history-translations-button")[0].addEventListener("click", removeHistory);
        document.getElementsByClassName("button-learn-text")[0].addEventListener("click", learnMaterial);
        document.getElementById("sourceCont").addEventListener('click', languagesDropdown);
        document.getElementById("targetCont").addEventListener('click', languagesDropdown);
    });
});

chrome.storage.local.get(null, restored => {
    const { sourceLanguage, targetLanguage, remember, avatar, historyTranslations } = restored;

    updateFlags();

    if (remember) {
        document.getElementsByClassName('ico-login')[0].style.display = 'none';
        document.getElementsByClassName('ico-avatar')[0].style.cssText = `display: block; background-image: url(${avatar});`;
    }

    const historyContElem = document.getElementsByClassName('history-translations')[0];
    if (historyTranslations.length !== 0 && remember) {
        historyContElem.classList.remove('display-none');
        historyTranslations.map(transObj => {
            const newWord = document.createElement('div');
            newWord.classList.add('history-translations-point');
            newWord.innerHTML = `<div>${transObj.source}</div> — ${transObj.target}`;
            historyContElem.appendChild(newWord);
        });
    }
});

updateFlags = () => {
    chrome.storage.local.get(null, restored => {
        const { sourceLanguage, targetLanguage, remember } = restored;

        const input = document.getElementsByClassName("translate-input")[0];
        const learnButton = document.getElementsByClassName("button-learn")[0];
        const arrow = document.getElementsByClassName("language-arrow")[0];

        const sourceName = document.getElementById("sourceName");
        const sourceFlag = document.getElementById("sourceFlag");
        const sourceCont = document.getElementById("sourceCont");

        const targetName = document.getElementById("targetName");
        const targetFlag = document.getElementById("targetFlag");
        const targetCont = document.getElementById("targetCont");

        input.disabled = false;

        sourceName.innerText = languages.includes(sourceLanguage) && sourceLanguage ? sourceLanguage : '?';
        sourceFlag.classList = `language-flag flag-${languages.includes(sourceLanguage) && sourceLanguage ? sourceLanguage : 'unknown'}`;
        targetName.innerText = targetLanguage;
        targetFlag.classList = `language-flag flag-${targetLanguage}`;

        remember && targetCont.classList.add('display-none');
        remember && arrow.classList.add('display-none');

        if (sourceLanguage === targetLanguage) {
            input.value = `${chrome.i18n.getMessage("equalLang")}`;
            input.disabled = true;
            learnButton.style.display = 'none';
        } 
        if (!sourceLanguage || sourceLanguage === 'unknown') {
            input.value = `${chrome.i18n.getMessage("unknownLang")}`;
            input.disabled = true;
            learnButton.style.display = 'none';
        }
    });
}

openNewTab = url => chrome.tabs.create({ url });

languagesDropdown = e => {
    const translationInputContElem = document.getElementsByClassName('translate')[0];
    const dropdownElem = document.getElementsByClassName('languages-dropdown')[0];
    const target = e.currentTarget;
    const anotherCont = document.getElementById(target.id === 'sourceCont' ? 'targetCont' : 'sourceCont');
    
    if (!target.classList.contains('language-cont-active')) return null;

    if (anotherCont.classList.contains('language-cont-activated')) {
        languagesDropdownClose(anotherCont);
    }
    if (target.classList.contains('language-cont-activated')) {
        languagesDropdownClose(target);
    } else {
        target.classList.add('language-cont-activated');
        clearInput();
        translationInputContElem.classList.add('display-none');
        dropdownElem.classList.remove('display-none');
    
        chrome.storage.local.get(null, restored => {
            const { sourceLanguage, targetLanguage } = restored;
            languages.map(lang => {
                if (lang !== sourceLanguage && lang !== targetLanguage) {
                    const langElem = document.createElement('div');
                    langElem.classList.add('languages-dropdown-button');
                    langElem.onclick = () => {
                        target.id === 'sourceCont' ? chrome.storage.local.set({sourceLanguage: lang}) : chrome.storage.local.set({targetLanguage: lang})
                        languagesDropdownClose(target);
                        updateFlags();
                    };
                    langElem.innerHTML += `${lang.toUpperCase()} <div class="languages-dropdown-flag flag-${lang}"></div>`;
                    dropdownElem.appendChild(langElem);
                }
            })
        });
    }
}

languagesDropdownClose = target => {
    const translationInputContElem = document.getElementsByClassName('translate')[0];
    const dropdownElem = document.getElementsByClassName('languages-dropdown')[0];
    const input = document.getElementsByClassName("translate-input")[0];
    const learnButton = document.getElementsByClassName("button-learn")[0];

    target.classList.remove('language-cont-activated');
    dropdownElem.innerHTML = '';
    translationInputContElem.classList.remove('display-none');
    dropdownElem.classList.add('display-none');

    chrome.storage.local.get(null, restored => {
        const { targetLanguage, sourceLanguage } = restored;
        if (sourceLanguage === targetLanguage) {
            input.value = chrome.i18n.getMessage("equalLang");
            input.disabled = true;
            learnButton.style.display = 'none';
        } else {
            learnButton.style.display = 'flex';
        }
    });
}

learnMaterial = () => {
    chrome.storage.local.get(null, restored => {
        const { remember, userid, pageText, pageTitle, host, sourceLanguage, fetching } = restored;

        if (!fetching && pageText) {
            chrome.storage.local.set({fetching: true});
            const data = JSON.stringify({"apiVersion":"1.0.1", "port": 1001, "content":[{"contentId":null,"valueList":{"targetLang": sourceLanguage, "contentName": pageTitle,"contentText":pageText,"contentTags":[],"subtitleText":"","format":3,"embeddedUrl":"","publish":0,"pic":""}}],"ctx":{"config":{"isCheckData":true,"isLogging":true}}})
            fetch(`https://${host}/SetJungleContent`, {method: 'POST', body: data, headers: { 'Content-type': 'application/json','Cookie': `remember="${remember}";userid=${userid}`}})
            .then(res =>  res.json()).then(jsonRes => {
                const { status, success } = jsonRes;
                if (status === 'ok') {
                    const url = `https://${host.split('.')[1] + '.' + host.split('.')[2]}/ru/jungle/${success[0].contentId}`;
                } else {
                    document.getElementById("alert").classList.add('login-alert');
                }
            })
            .catch(err => console.log(err))
            .then(() => chrome.storage.local.set({fetching: false, pageText: ''}))
        }
    });
}

removeHistory = () => {
    chrome.storage.local.set({historyTranslations: []});
    document.getElementsByClassName('history-translations')[0].classList.add('display-none');
}

closeAlert = () => {
    document.getElementById("alert").classList.remove('login-alert');
    document.getElementById("alert").classList.remove('meatballs-alert');
}

playAudio = e => e.target.firstChild.play();

saveTranslation = e => {
    chrome.storage.local.get(null, settings => {
        const { remember, userid, historyTranslations, host, notify, fetching } = settings;
        if (!fetching) {
            chrome.storage.local.set({fetching: true});
            if (remember) {
                const translation = e.target.innerText;
                const word = document.getElementsByClassName("translate-input")[0].value;

                let headers = {
                    'Content-type': 'application/json',
                    'Cookie': `remember="${remember}";userid=${userid}`,
                }

                const body = JSON.stringify({
                    "apiVersion": "1.0.0",
                    "userId": userid,
                    "port": 1001,
                    "data": [
                        {
                            "action": "add",
                            "valueList": {
                                "wordValue": word,
                                "wordSetId": 3,
                                "translation": {"tr": translation, "ctx": 'text', "pic": "https://contentcdn.lingualeo.com/uploads/1611_1361481210.jpg"}
                            }
                        }
                    ]
                })
                
                fetch(`https://${host}/SetWords`, {method: 'POST', body, headers})
                .then(res =>  res.json())
                .then(jsonRes => {
                    chrome.storage.local.set({fetching: false});
                    if (jsonRes.data[0].error && jsonRes.data[0].error.code === '6') {
                        document.getElementById("alert").classList.add('meatballs-alert');
                    } else {
                        const { origin, combinedTranslation, translations } = jsonRes.data[0].word;
                        const formattedHistoryTranslations = [];
                        historyTranslations.map((transObj, i) => {
                            if (transObj.source !== origin) {
                                formattedHistoryTranslations.push(transObj)
                            }
                        })
                        chrome.storage.local.set({historyTranslations: [{source: origin, target: translation}, ...formattedHistoryTranslations]})
                        notify && chrome.notifications.create({
                            "type": "basic",
                            "title": "Ваш словарь обновлен",
                            "iconUrl": chrome.runtime.getURL("../img/logo-paw.png"),
                            "message": `${origin} — ${combinedTranslation}`
                        });
                        window.close();
                    }
                })
            } else {
                document.getElementById("alert").classList.add('login-alert');
            }
        }
    });
}

getTranslates = () => {
    const translationsContElem = document.getElementsByClassName("translations-cont")[0];
    const translationsElem = document.getElementsByClassName("translations")[0];
    const translateInput = document.getElementsByClassName("translate-input")[0];
    const transciptionElem = document.getElementsByClassName("translations-transcription")[0];
    const audioContElem = document.getElementsByClassName("translations-audio")[0];
    const transcriptionAndAudioContElem = document.getElementsByClassName("audio-trans-cont")[0];

    const text = translateInput.value;

    chrome.storage.local.get(null, settings => {
        const { remember, userid, targetLanguage, sourceLanguage, host, lastInput } = settings;

        if (text) {
            let headers = {
                'Content-type': 'application/json',
            }
        
            const body = JSON.stringify(
                {
                    "apiVersion": "1.0.0",
                    "port": 1001,
                    "data": {
                        "text": text,
                        "langPair": {
                            "source": sourceLanguage,
                            "target": targetLanguage === "en" ? "en-US" : targetLanguage
                        }
                    },
                }
            )

            fetch(`https://${host}/gettranslates`, {method: 'POST', body, headers})
            .then(res =>  res.json()).then(jsonRes => {
                if (translateInput.value) {
                    translationsElem.innerHTML = "";
                    const { transcription, translate, sound_url, word_value } = jsonRes;
                    if (lastInput !== document.getElementsByClassName("translate-input")[0].value) {
                        getTranslates();
                    } else {
                        translate.forEach(word => {
                            const translationElem = document.createElement('div');
                            translationElem.classList.add('translation');
                            translationElem.innerHTML = word.translate_value;
                            translationElem.onclick = saveTranslation;
                            translationsElem.appendChild(translationElem);
                        });
                        var audio = new Audio();
                        audio.onloadedmetadata = () => {
                        }
                        audio.src = sound_url;
                        
                        audioContElem.innerHTML = '';
                        audioContElem.style.display = "block";
                        const audioElem = document.createElement('audio');
                        sound_url ? audioElem.src = sound_url : audioContElem.style.display = "none";
                        chrome.storage.local.get(null, restored => audioElem.autoplay = restored.autoAudio);
                        audioContElem.appendChild(audioElem);
        
                        transciptionElem.style.display = "block";
                        transcription ? transciptionElem.innerHTML = `[${transcription}]` : transciptionElem.style.display = "none";
        
                        transcriptionAndAudioContElem.style.display = transcription || sound_url ? "flex" : "none";
        
                        translationsContElem.classList.remove('display-none');
                    }
                   
                }
            })
            .catch(err => console.log(err))
        } 
    })
}

input = e => {
    chrome.storage.local.set({fetching: false});
    const text = e.target.value;
    const translationsContElem = document.getElementsByClassName("translations-cont")[0];
    const translationsElem = document.getElementsByClassName("translations")[0];
    const icoClearElem = document.getElementsByClassName("ico-clear")[0]
    const historyContElem = document.getElementsByClassName('history-translations')[0];

    if (text === ' ') {
        e.target.value = '';
    } else if (text) {
        icoClearElem.style.display = 'block';
        if (text.slice(-1) === " " || text.slice(-1) === "." || text.slice(-1) === "!") {
            historyContElem.classList.add('display-none');
            chrome.storage.local.set({lastInput: text}, () => getTranslates())
        }
    } else {
        icoClearElem.style.display = 'none';
        chrome.storage.local.get(null, settings => {
            const { historyTranslations, remember } = settings;
            if (historyTranslations.length !== 0 && remember) {
                historyContElem.classList.remove('display-none');
            }
        })
        translationsContElem.classList.add('display-none');
        translationsElem.innerHTML = "";
    }
}

inputSubmit = e => {
    if (e.code === "Enter") {
        const text = document.getElementsByClassName("translate-input")[0].value;
        const historyContElem = document.getElementsByClassName('history-translations')[0];
        historyContElem.classList.add('display-none');
        chrome.storage.local.set({lastInput: text}, () => getTranslates())
    }
}

clearInput = () => {
    const translationsContElem = document.getElementsByClassName("translations-cont")[0];
    const translationsElem = document.getElementsByClassName("translations")[0];
    const translateInput = document.getElementsByClassName("translate-input")[0];
    const clearElem = document.getElementsByClassName('ico-clear')[0];

    clearElem.style.display = 'none';
    translateInput.value = '';
    translationsContElem.classList.add('display-none');
    translationsElem.innerHTML = "";
}

addIntl = () => {
    document.getElementsByClassName("button-learn-text")[0].innerText = chrome.i18n.getMessage("learnMaterial");
    document.getElementsByClassName("translate-input")[0].placeholder = chrome.i18n.getMessage("enterText");
    document.getElementsByClassName("login-text")[0].innerText = chrome.i18n.getMessage("loginToSave");
    document.getElementsByClassName("meatballs-text")[0].innerText = chrome.i18n.getMessage("meatballsGone");
    document.getElementsByClassName("alert-buttons-login")[0].innerText = chrome.i18n.getMessage("login2");
    document.getElementsByClassName("alert-buttons-reg")[0].innerText = chrome.i18n.getMessage("reg");
    document.getElementsByClassName("meatballs-buttons")[0].innerText = chrome.i18n.getMessage("aboutPrem");
    document.getElementsByClassName("history-translations-title")[0].innerText = chrome.i18n.getMessage("history");
    document.getElementsByClassName("history-translations-button")[0].innerText = chrome.i18n.getMessage("clear");
}

addIntl();