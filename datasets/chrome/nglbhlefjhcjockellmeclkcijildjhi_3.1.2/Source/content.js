console.log('content js')
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


const helloWords = {
    en: 'Hello',
    es: 'Hola',
    ru: 'Привет',
    pt: 'Olá',
    tr: 'Selam',
    cs: 'Zdraví',
    de: 'Hallo',
    el: 'Γεια',
    fr: 'Bonjour',
    hi: 'हैलो।',
    id: 'Halo',
    it: 'Ciao',
    ja: 'こんにちは',
    ko: '안녕하세요',
    nl: 'Hallo',
    pl: 'Witam',
    sr: 'Здраво',
    uk: 'Привіт',
    vi: 'Xin chào',
    zh: '嗨。'
}

const separator = `("`;
const separatorLast = `")`;


function detectLanguage(tabChanged = false) {
    console.log('detect language')
    chrome.storage.local.get(null, settings => {
        const { sourceLanguage, targetLanguage, showHints, knownLanguages, learningLanguage } = settings;
        const pageText = document.body.innerText.replace(/(<([^>]+)>)/gi, "");
        const pageTitle = document.title;
        let pageLang = '';
        const pageContent = new Readability(document.cloneNode(true)).parse();
        chrome.i18n.detectLanguage(
            pageText, langObj => {
                const l = langObj.languages[0].language;
                chrome.storage.local.set({sourceLanguage: languages.includes(l) ? l : 'unknown', pageText: pageContent.textContent.replace(/^\s+/g, ''), pageTitle})
                pageLang = langObj.languages[0].language;
                if (targetLanguage === l) {
                    chrome.storage.local.set({sourceLanguage: learningLanguage})
                }   
                if (!knownLanguages.includes(pageLang)) {
                    showHints && getHelloTranslation(pageLang);
                    chrome.storage.local.set({knownLanguages: [...knownLanguages, pageLang] })
                }
            }
        )
    });
}

chrome.storage.local.get(null, settings => settings.autoLang && detectLanguage());

chrome.runtime.onMessage.addListener(msg => {
    msg.tabChanged && chrome.storage.local.get(null, settings => settings.autoLang && detectLanguage(true));
    msg.selectedText && showTranslate();
});



const alertUnknownLangHTML = `
    ${chrome.i18n.getMessage("unknownLang")}
    <div class="ll-page-alert-new-lang-button ll-page-alert-close">${chrome.i18n.getMessage("ok")}</div>
    `;

const alertEqualLangHTML = `
    ${chrome.i18n.getMessage("equalLang")}
    <div class="ll-page-alert-new-lang-button ll-page-alert-close">${chrome.i18n.getMessage("ok")}</div>
    `;

const alertRegHTML = `
    ${chrome.i18n.getMessage("loginFor")}
    <div class="ll-page-alert-button-cont">
        <div class="ll-page-alert-reg-button-close ll-page-alert-close">${chrome.i18n.getMessage("close")}</div>
        <div class="ll-page-alert-reg-button">${chrome.i18n.getMessage("login3")}</div>
    </div>
    `;

const alertPremHTML = `
    ${chrome.i18n.getMessage("meatballsOff")}
    <div class="ll-page-alert-button-cont">
        <div class="ll-page-alert-reg-button-close ll-page-alert-close">${chrome.i18n.getMessage("close")}</div>
        <a href="https://lingualeo.com/premium" class="ll-page-alert-prem-button" style="background-image: url('${chrome.runtime.getURL("img/ico-crown.svg")}')!important;">Узнать о Premium</a>
    </div>
    `;

const popupHTML = `
    <div class="ll-popup-context">
    </div>
    <div class="ll-popup-word-cont">
        <div class="ll-popup-word-and-audio-cont">
            <div class="ll-popup-audio" style="background-image: url('${chrome.runtime.getURL("img/ico-sound.svg")}')!important;"></div>
            <p class="ll-popup-word"></p>
        </div>
        <div class="ll-popup-word-transcription"></div>
    </div>
    <div class="ll-popup-choose">${chrome.i18n.getMessage("chooseTranslation")}</div>
    <div class="ll-popup-translations-cont">
    </div>
    <div class="ll-popup-custom-translation">${chrome.i18n.getMessage("addYourTrans")}</div>
    `;

addStrongTags = text => (text.replace(separator, '<strong>').replace(separatorLast, '</strong>'))

getHelloTranslation = pageLang => {
    if (helloWords[pageLang]) openAlert('newLang', helloWords[pageLang])
}



const openAlert = (alertType, hello = null) => {
    chrome.storage.local.get(null, restored => {
        const { lastAlert, learningLanguage, triggerTargetAlert, sourceLanguage} = restored;
        if (lastAlert === alertType && lastAlert !== 'reg' && lastAlert !== 'prem' && lastAlert !== 'addWord') return;
        else {
            chrome.storage.local.set({lastAlert: alertType});

            document.getElementsByClassName('ll-page-alert')[0] && closeAlert();

            const alertElem = document.createElement('div');

            if (alertType === 'newLang') {
                alertElem.classList.add("ll-page-alert", "ll-page-alert-new-lang");
                const alertNewLangHTML = `
                    ${hello}! ${chrome.i18n.getMessage("newLang")}
                        <div class="ll-page-alert-new-lang-button ll-page-alert-close">${chrome.i18n.getMessage("ok")}</div>
                    `;
                alertElem.innerHTML = alertNewLangHTML;
                document.body.appendChild(alertElem);
            } else if (alertType === 'unknownLang') {
                alertElem.classList.add("ll-page-alert", "ll-page-alert-unknown-lang");
                alertElem.innerHTML = alertUnknownLangHTML;
                document.body.appendChild(alertElem);
            } else if (alertType === 'equalLang') {
                alertElem.classList.add("ll-page-alert", "ll-page-alert-unknown-lang");
                alertElem.innerHTML = alertEqualLangHTML;
                document.body.appendChild(alertElem);
            } else if (alertType === 'reg') {
                alertElem.classList.add("ll-page-alert", "ll-page-alert-reg");
                alertElem.innerHTML = alertRegHTML;
                document.body.appendChild(alertElem);
                document.getElementsByClassName('ll-page-alert-reg-button')[0].addEventListener('click', () => {
                    window.open("https://lingualeo.com");
                    closeAlert();
                });
            } else if (alertType === 'prem') {
                alertElem.classList.add("ll-page-alert", "ll-page-alert-prem");
                alertElem.innerHTML = alertPremHTML;
                document.body.appendChild(alertElem);
            } else if (alertType === 'addWord' && triggerTargetAlert) {
                chrome.storage.local.set({triggerTargetAlert: false});
                alertElem.classList.add("ll-page-alert", "ll-page-alert-new-lang");
                const alertNewLangHTML = `
                    ${chrome.i18n.getMessage('addWord')}: ${chrome.i18n.getMessage(sourceLanguage)}
                        <div class="ll-page-alert-new-lang-button ll-page-alert-close">${chrome.i18n.getMessage("ok")}</div>
                    `;
                alertElem.innerHTML = alertNewLangHTML;
                document.body.appendChild(alertElem);
            }

            document.getElementsByClassName('ll-page-alert-close')[0].addEventListener('click', closeAlert);
        }
    })
}

const closeAlert = () => document.getElementsByClassName('ll-page-alert')[0] && document.getElementsByClassName('ll-page-alert')[0].remove();

const processSelection = e => {
    if (!chrome.runtime.id) {
        console.log('Extension context invalidated, skipping dblclick handler');
        return;
    }
    
    if (!e.target.closest(".llpopup")) {
        hidePopup();
        return;
    }
    return;
}

const hidePopup = () => {
    if (!chrome.runtime.id) {
        console.log('Extension context invalidated, skipping dblclick handler');
        return;
    }

    document.getElementById('llpopup') && document.getElementById('llpopup').classList.remove('popupVisible')
    chrome.storage.local.set({currentContextTranslation: ''});
};

const bodyClick = e => {
    if (!chrome.runtime.id) {
        console.log('Extension context invalidated, skipping dblclick handler');
        return;
    }

    if (!e.target.closest(".llpopup") && !e.target.closest(".ll-page-alert") && e.target.tagName.toUpperCase() !== 'INPUT') {
        document.getElementById('llpopup') && document.getElementById('llpopup').remove();
        chrome.storage.local.get(null, settings => {
            const { doubleClick, holdCommand, holdAlt, holdCtrl, targetLanguage, sourceLanguage, showHints } = settings;
            if (doubleClick && targetLanguage !== 'unknown' && sourceLanguage !== 'unknown' && targetLanguage !== sourceLanguage) {
                if ((holdCommand && e.metaKey) || (holdAlt && e.altKey) || (holdCtrl && e.ctrlKey)) {
                    showTranslate(e);
                } else if (!holdCommand && !holdAlt && !holdCtrl) {
                    showTranslate(e);
                } 
            } else if (doubleClick && targetLanguage === sourceLanguage) {
                showTranslate(e, true, showHints);
            }
        })
    }
}

const translateContext = context => {
    chrome.storage.local.get(null, settings => {
        const { host, sourceLanguage, targetLanguage, currentContext, currentContextTranslation } = settings;
        if (currentContextTranslation) {
            document.getElementsByClassName('ll-popup-context')[0].innerHTML = contextTranslation.replace(separator, '<strong>').replace(separatorLast, '</strong>') + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("back")}</a>`;
            const translateButtonElem = document.getElementsByClassName('ll-popup-context-button')[0];
            chrome.storage.local.set({currentContextTranslation: contextTranslation})
            translateButtonElem.addEventListener('click', e => {
                chrome.storage.local.get(null, settings => {
                    const contextElem = document.getElementsByClassName('ll-popup-context')[0];
                    const { currentContext } = settings;
                    contextElem.innerHTML = addStrongTags(currentContext) + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("translate")}</a>`;
                    document.getElementsByClassName('ll-popup-context-button')[0].addEventListener('click', () => translateContext(currentContext));
                })
            })
        } else {
            let headers = {
                'Content-type': 'application/json',
            }
        
            const body = JSON.stringify(
                {
                    "apiVersion": "1.0.0",
                    "port": 1001,
                    "data": {
                        "text": context.replace(/(<([^>]+)>)/gi, ""),
                        "langPair": {
                            "source": sourceLanguage,
                            "target": targetLanguage === "en" ? "en-US" : targetLanguage
                        }
                    },
                }
            )
    
            chrome.runtime.sendMessage({
                url: `https://${host}/gettranslates`,
                type: "TranslateContext", 
                body,
                headers
            }, message => {
                const { contextTranslation } = message;
                document.getElementsByClassName('ll-popup-context')[0].innerHTML = contextTranslation.replace(separator, '<strong>').replace(separatorLast, '</strong>') + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("back")}</a>`;
                const translateButtonElem = document.getElementsByClassName('ll-popup-context-button')[0];
                chrome.storage.local.set({currentContextTranslation: ''})
                translateButtonElem.addEventListener('click', e => {
                    chrome.storage.local.get(null, settings => {
                        const contextElem = document.getElementsByClassName('ll-popup-context')[0];
                        const { currentContext } = settings;
                        contextElem.innerHTML = addStrongTags(context) + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("translate")}</a>`;
                        document.getElementsByClassName('ll-popup-context-button')[0].addEventListener('click', () => translateContext(context));
                    })
                })
            })
        }
    })
}

printLocalStorage = () => (chrome.storage.local.get(null));


showTranslate = (e = null, equal = false, showHints = false) => {
    chrome.storage.local.set({fetching: false});
    const t = document.getSelection();
    const selArr = t.toString().split(" ");
    var googleDocument = googleDocsUtil.getGoogleDocument();
    closeAlert();

    if ((e === null && t.toString().length !== 0 && t.toString() !== ' ' && t.toString().length < 256) || (t.toString().length !== 0 && t.toString() !== ' ' && (selArr.length === 1 || (selArr.length === 2 && (selArr[0] === '' || selArr[1] === ''))) && e.detail !== 1) || googleDocument.selectedText) {
        if (equal) {
            showHints && openAlert('equalLang');
            return;
        }

        const popupElem = document.createElement('div');
        popupElem.id = "llpopup";
        popupElem.classList.add("llpopup");
        popupElem.innerHTML = popupHTML;
        document.body.appendChild(popupElem);
        
        const selectedStr = t.toString() || googleDocument.selectedText;

        const popup = document.getElementById('llpopup');

        const titleText = document.getElementsByClassName('ll-popup-word')[0];
        titleText.innerHTML = `${selectedStr}`;

        // GETTING THE SENTENCE FROM PARAGRAPH
        if (googleDocument.selectedText) {
            const textContent = googleDocument.text[googleDocument.caret.line]
            const wordEndOffset = googleDocument.caret.lineIndex;
            const wordStartOffset = wordEndOffset - selectedStr.length;
            // add sentence detection
            const word = textContent.substring(wordStartOffset, wordEndOffset);
            const formattedContext = `${textContent.slice(0, wordStartOffset)} ${separator} ${word} ${separatorLast} ${textContent.slice(wordEndOffset, textContent.length - 1)}`;
            const rawContext = textContent.slice(0, textContent.length - 1);
            chrome.storage.local.set({currentContext: rawContext})
            
            const contextElem = document.getElementsByClassName('ll-popup-context')[0];
            contextElem.innerHTML = addStrongTags(formattedContext) + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("translate")}</a>`;

            const translateButtonElem = document.getElementsByClassName('ll-popup-context-button')[0];
            translateButtonElem.onclick = () => translateContext(formattedContext);
        } else {
            const separatorNew = '$@!#%';
            const separatorNewLen = separatorNew.length;
            const word = t.toString();
            const range = t.getRangeAt(0);

            const wtfElem = document.getElementsByTagName('wtf')[0];
            if (wtfElem) {
                wtfElem.replaceWith(...wtfElem.childNodes);
                const cleanText = wtfElem.innerText.replace(separatorNew, '').replace(separatorNew, '')
                wtfElem.innerText = cleanText;
            }

            const wtfElem2 = document.createElement('wtf');
            range.surroundContents(wtfElem2);

            document.getElementsByTagName('wtf')[0].append(separatorNew);
            document.getElementsByTagName('wtf')[0].prepend(separatorNew);

            const bodyTextRaw = document.body.innerText;
            let sushi = bodyTextRaw.indexOf(`${separatorNew}${word}${separatorNew}`);

            const startIndex = sushi !== -1 ? sushi : bodyTextRaw.indexOf(`${separatorNew}${separatorNew}`) + 1;
            const endIndex = startIndex + word.length;
            document.getElementsByTagName('wtf')[0].innerHTML = document.getElementsByTagName('wtf')[0].innerHTML.replace(separatorNew, '').replace(separatorNew, '');

            const bodyText = document.body.innerText;

            let sentenceStartOffset = 0;
            let sentenceEndOffset = bodyText.length;
            let stepSum = t.toString().length;

            for (let i = startIndex; i > 0; i--) {
                if ((bodyText[i] === '.' || bodyText[i] === '?' || bodyText[i] === '!' || bodyText[i] === '。') || (stepSum >= 256 && (bodyText[i] === ' ' || bodyText[i] === ',' || bodyText[i] === '。'))) {
                    sentenceStartOffset = bodyText[i + 1] === " " ? i + 2 : i + 1;
                    break;
                }
                stepSum += 1;
            }
            // 
    
            for (let i = endIndex; i <= bodyText.length; i++) {
                if ((bodyText[i] === '.' || bodyText[i] === '?' || bodyText[i] === '!' || bodyText[i] === '。') || (stepSum >= 256 && (bodyText[i] === ' ' || bodyText[i] === ',' || bodyText[i] === '。'))) {
                    sentenceEndOffset = i;
                    break;
                }
                stepSum += 1;
            }
            const wordSentenceStartIndex = startIndex - sentenceStartOffset;
            const wordSentenceEndIndex = wordSentenceStartIndex + word.length;

            const formattedContext = bodyText.slice(sentenceStartOffset, sentenceStartOffset + wordSentenceStartIndex) + ` ${separator}` + word + `${separatorLast} ` + bodyText.slice(sentenceStartOffset + wordSentenceEndIndex, sentenceEndOffset + 1);
            const rawContext = bodyText.substring(sentenceStartOffset, sentenceEndOffset + 1);
            chrome.storage.local.set({currentContext: formattedContext});
            const contextElem = document.getElementsByClassName('ll-popup-context')[0];
            
            contextElem.innerHTML = addStrongTags(formattedContext) + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("translate")}</a>`;
            const translateButtonElem = document.getElementsByClassName('ll-popup-context-button')[0];
            translateButtonElem.onclick = () => translateContext(formattedContext);
        }

        document.getElementsByClassName("ll-popup-audio")[0].addEventListener("click", e => e.target.firstChild.play());
        const translationsContElem = document.getElementsByClassName('ll-popup-translations-cont')[0];
        const transcriptionElem = document.getElementsByClassName('ll-popup-word-transcription')[0];
        const audioContElem = document.getElementsByClassName('ll-popup-audio')[0];
        audioContElem.style.display = "block";
        transcriptionElem.style.display = "block";
        titleText.style.margin = "0px";


        translationsContElem.innerHTML = '';
        
        chrome.storage.local.get(null, settings => {
            const { sourceLanguage, targetLanguage, host } = settings;
            let headers = {
                'Content-type': 'application/json',
            }
        
            const body = JSON.stringify(
                {
                    "apiVersion": "1.0.0",
                    "data": {
                        "text": selectedStr,
                        "langPair": {
                            "source": sourceLanguage,
                            "target": targetLanguage === "en" ? "en-US" : targetLanguage
                        }
                    },
                    "port": 1001
                }
            )

            chrome.runtime.sendMessage({
                url: `https://${host}/gettranslates`,
                type: 'Translate',
                body,
                headers
            }, currentTranslation => {
                const { transcription, translate, sound_url, errorType } = currentTranslation;

                if (errorType) {
                    document.getElementById('llpopup').remove();
                    return null;
                }
                
                translate.forEach(word => {
                    const translationElem = document.createElement('div');
                    const translatedWord = word.translate_value;
                    translationElem.classList.add('ll-popup-translations-word');
                    translationElem.innerHTML = translatedWord;
                    translationElem.onclick = () => {
                        chrome.storage.local.get(null, settings => {
                            const { remember, userid, currentContext, host, sourceLanguage, targetLanguage, fetching } = settings;
                            if (!fetching) {
                                chrome.storage.local.set({fetching: true});
                                
                                if (remember) {
                                    let headers = {
                                        'Content-type': 'application/json',
                                        'Cookie': `remember="${remember}";userid=${userid}`,
                                    }
                                    
                                    const pageText = document.body.innerText.replace(/(<([^>]+)>)/gi, "");

                                    chrome.i18n.detectLanguage(currentContext, langObj => {
                                        const contextLang = langObj.languages[0] ? langObj.languages[0].language : false;
                                        chrome.i18n.detectLanguage(pageText, langObj => {
                                            const pageLang = langObj.languages[0].language;

                                            const wordValue = pageLang === sourceLanguage  ? selectedStr : translatedWord
                                            const translation = pageLang === sourceLanguage ? translatedWord : selectedStr

                                            const body = JSON.stringify({
                                                "apiVersion" : "1.0.0",
                                                "userId" : userid,
                                                "port": 1001,
                                                "data" : [
                                                {
                                                    "action" : "add",
                                                    "valueList" : {
                                                        "wordValue": contextLang ? contextLang === pageLang ? wordValue : translation : wordValue ,
                                                        "wordSetId": 3,
                                                        "langPair": {"source": sourceLanguage, "target": targetLanguage},
                                                        "translation": {"tr": contextLang ? contextLang === pageLang ? translation : wordValue : translation, "ctx": currentContext.replace(separator, '').replace(separatorLast, ''), "pic": "https://contentcdn.lingualeo.com/uploads/1611_1361481210.jpg"}}
                                                }
                                                ]
                                            })
                                    
                                        
                                        chrome.runtime.sendMessage({
                                            url: `https://${host}/SetWords`,
                                            type: 'SetWords',
                                            translation: translatedWord,
                                            body,
                                            headers
                                        }, message => {
                                            chrome.storage.local.set({fetching: false});
                                            const { response } = message;
                                            if (response === 'meatballs') {
                                                openAlert('prem');
                                            } else if (response === 'ok') {
                                                openAlert('addWord');
                                                hidePopup();
                                            }
                                        });
                                    })
                                })
                                } else {
                                    openAlert('reg');
                                }
                            }
                        })
                    }
                    translationsContElem.appendChild(translationElem);
                });

                (transcription && e !== null ) ? transcriptionElem.innerHTML = `[${transcription}]` : transcriptionElem.style.display = "none";
                
                audioContElem.innerHTML = '';
                const audioElem = document.createElement('audio');
                sound_url ? audioElem.src = sound_url : audioContElem.style.display = "none";
                chrome.storage.local.get(null, restored => audioElem.autoplay = restored.autoAudio);
                audioContElem.appendChild(audioElem);
        
             
                if (!sound_url) {
                    titleText.style.margin = "10px 0 5px 7px";
                }

                const rectT = googleDocument.selectionRect || t.getRangeAt(0).getBoundingClientRect();
        
                var body = document.body;
                var bodyRect = body.getBoundingClientRect();
                var sY = window.scrollY;
                var sX = window.scrollX;
                var bodyTop = bodyRect.top + sY;
                var left = (rectT.x - popup.clientWidth / 2 + rectT.width / 2);
                var top = (sY + rectT.y - bodyTop + 10);

                if (popup.clientHeight > rectT.y) {
                    top += popup.clientHeight + 25;
                }

                if (left + popup.clientWidth > bodyRect.width ) {
                    left = bodyRect.width - popup.clientWidth - 10;
                } else if (left < 0) {
                    left = 10;
                }

                popup.style.top = `${top}px`;
                popup.style.left = `${left}px`;
                popup.classList.add('popupVisible');
                chrome.storage.local.set({currentTranslation: ''})

                const customTranslationElem = document.getElementsByClassName('ll-popup-custom-translation')[0];
                const textElem = document.getElementsByClassName('ll-popup-choose')[0];
                
                customTranslationElem.addEventListener('click',() => {
                    customTranslationElem.style.display = 'none';
                    textElem.innerText = chrome.i18n.getMessage("addYourTrans");
                    const contElem = document.getElementsByClassName('ll-popup-translations-cont')[0];
                    contElem.innerHTML = '';
                    const inputElem = document.createElement('input');
                    inputElem.classList.add('ll-popup-translations-input')
                    contElem.appendChild(inputElem);
                    inputElem.focus();
                    const btnElem = document.createElement('div');
                    btnElem.classList.add('ll-popup-translations-button');
                    btnElem.innerText = chrome.i18n.getMessage("addToDict");
                    btnElem.onclick = () => {
                        document.getElementsByClassName('ll-popup-translations-input')[0].value.replaceAll(' ', '') && chrome.storage.local.get(null, settings => {
                            const { remember, userid, currentContext, host, sourceLanguage, targetLanguage, fetching } = settings;
                            if (!fetching) {
                                chrome.storage.local.set({fetching: true});
                                
                                if (remember) {
                                    let headers = {
                                        'Content-type': 'application/json',
                                        'Cookie': `remember="${remember}";userid=${userid}`,
                                    }

                                    const kkk = document.getElementsByClassName('ll-popup-translations-input')[0];
                                    const pageText = document.body.innerText.replace(/(<([^>]+)>)/gi, "");

                                    chrome.i18n.detectLanguage(pageText, langObj => {
                                        const l = langObj.languages[0].language;
                                        
                                        const body = JSON.stringify({
                                            "apiVersion" : "1.0.0",
                                            "userId" : userid,
                                            "port": 1001,
                                            "data" : [
                                            {
                                                "action" : "add",
                                                "valueList" : {
                                                    "wordValue":  l === sourceLanguage ? selectedStr : kkk.value,
                                                    "wordSetId": 3,
                                                    "langPair": {"source": sourceLanguage, "target": targetLanguage},
                                                    "translation": {"tr": l === sourceLanguage ? kkk.value : selectedStr, "ctx": currentContext.replace(separator, '').replace(separatorLast, ''), "pic": "https://contentcdn.lingualeo.com/uploads/1611_1361481210.jpg"}}
                                            }
                                            ]
                                        })
                                        
                                        chrome.runtime.sendMessage({
                                            url: `https://${host}/SetWords`,
                                            type: 'SetWords',
                                            translation: kkk.value,
                                            body,
                                            headers
                                        }, message => {
                                            chrome.storage.local.set({fetching: false});
                                            const { response } = message;
                                            if (response === 'meatballs') {
                                                openAlert('prem');
                                            } else if (response === 'ok') {
                                                openAlert('addWord');
                                                hidePopup();
                                            }
                                        });
                                    });
                                } else {
                                    openAlert('reg');
                                }
                            }
                        })
                    }
                    contElem.appendChild(btnElem);
                    

                    // document.getElementsByClassName('ll-popup-translations-cont')[0].innerHTML= '<input type="text" class=""/>';
                })
            })
        })
    }
}



document.ondblclick = bodyClick;
document.onmousedown = processSelection;