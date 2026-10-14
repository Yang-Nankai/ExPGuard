let ref = null;

var bubbleDOM = document.createElement('div');
var bubbleMouseDown = false;
var opseleced = 'en_vn';

bubbleDOM.setAttribute('class', 'selection_bubble_root');
document.body.appendChild(bubbleDOM);
bubbleDOM.style.display = 'none';

bubbleDOM.addEventListener('mousedown', function (e) {
    bubbleMouseDown = true;
}, false);

document.addEventListener('selectionchange', function(e) {
    if (!options || options.selectTextEnable == false) {
        return;
    }
    var selection = window.getSelection()
        .toString()
        .trim();
    if(selection){
        try {
            if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
                chrome.runtime.sendMessage({
                    request: 'updateContextMenu',
                    selection: selection
                }, function(response) {
                    if (chrome.runtime.lastError) {}
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
});

function handleSelectionChange(selection,e){
    if(ref){
        clearTimeout(ref);
    }
    ref = setTimeout(()=>{
        // Ẩn message lỗi premium khi bắt đầu search
        var errorDiv = document.getElementById('bub-premium-error');
        if (errorDiv) {
            errorDiv.style.display = 'none';
            errorDiv.innerHTML = '';
        }
        
        if (selection) {
            searchSelection(selection,e);
        }
    },300)
}

document.addEventListener('dblclick', function(e) {
    if (!options || options.doubleClickEnable == false) {
        return;
    }
    
    if ((options.doubleCickTriggerKey == 'alt' && !e.altKey) ||
        (options.doubleCickTriggerKey == 'ctrl' && !e.ctrlKey) || 
        (options.doubleCickTriggerKey == 'shift' && !e.shiftKey)) {
        return;
    }
    
    var selection = window.getSelection()
        .toString();
    handleSelectionChange(selection,e);
}, false);

document.addEventListener('click', function(e) {
    
    if (!options || options.selectTextEnable == false) {
        return;
    }

    if ((options.selectTriggerKey == 'alt' && !e.altKey) ||
        (options.selectTriggerKey == 'ctrl' && !e.ctrlKey) || 
        (options.selectTriggerKey == 'shift' && !e.shiftKey)) {
        return;
    }
    
    var selection = window.getSelection()
        .toString();
    handleSelectionChange(selection,e);
}, false);

document.addEventListener('keydown', detectspecialkeysdown); 
document.addEventListener('keyup', detectspecialkeysup); 
var specialKeyPressing = false;

function detectspecialkeysdown(e){
    var evtobj=window.event? event : e
    //if (evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey) {
    if (evtobj.ctrlKey) {
        specialKeyPressing = true;
    }
}

function detectspecialkeysup(e){
    var evtobj=window.event? event : e
    //if (evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey) {
    if (evtobj.ctrlKey) {
        specialKeyPressing = false;
    }
}

var optionLang = '<div class="bub-option-value"> \
                    <select id="bub-language-selector"> \
                        <option value="zh_CN">Chinese</option> \
                        <option value="en">English</option> \
                        <option value="fr">French</option> \
                        <option value="id">Indonesian</option> \
                        <option value="ja">Japanese</option> \
                        <option value="el">Greek</option> \
                        <option value="hi">Hindi</option> \
                        <option value="ko">Korean</option> \
                        <option value="es">Spanish</option> \
                        <option value="th">Thai</option> \
                        <option value="en_US">United State</option> \
                        <option value="ru">Russian</option> \
                        <option value="vi">Vietnamese</option> \
                    </select> \
                    <select id="bub-model-selector"> \
                        <option value="google">Mazii Translator</option> \
                        <option value="nmt1">Mazii NMT</option> \
                        <option value="nmt">Mazii NMT MAX</option> \
                    </select> \
                </div>';

// Biến global để lưu model dịch hiện tại
var currentTranslateModel = "google";
var currentTabType = "word"; // "word", "kanji", "meaning"
var currentSelection = ""; // Lưu từ đang được tra
var originalMarkup = ""; // Lưu markup ban đầu để restore khi chuyển tab
// Ghi chú: explainData / explainRenderState / currentExplainTab + các hàm
// showExplainTab / getExplainWord / renderExplain / translateAI /
// getGoogleTranslatePhonetic / buildTabBar / renderAITab nay dùng chung ở common.js.

function decodeToken(encryptedToken) {
    if (!encryptedToken) return null;

    try {
        var _0xf336 = [
            "\x23\x24\x26\x41\x68\x63\x48\x6B\x67\x68\x40\x30\x67\x66\x6B\x21\x26\x31\x4C\x4B",
        ];
        var keyEncryption = _0xf336[0];

        // Sử dụng CryptoJS để decode
        if (typeof CryptoJS !== "undefined") {
            var key = CryptoJS.enc.Utf8.parse(keyEncryption);
            var iv = CryptoJS.enc.Utf8.parse(keyEncryption);
            var decrypted = CryptoJS.AES.decrypt(
                encryptedToken,
                key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                }
            );
            var result = decrypted.toString(CryptoJS.enc.Utf8);
            if (result && typeof result === "string" && result.length > 0) {
                return result;
            } else {
                return encryptedToken;
            }
        } else {
            return encryptedToken;
        }
    } catch (ex) {
        return encryptedToken;
    }
}

function initTranslateModel() {

    function getCookieAndPremium() {
        if (window.location.hostname === 'mazii.net') {
            try {
                function getCookieValue(name) {
                    var value = "; " + document.cookie;
                    var parts = value.split("; " + name + "=");
                    if (parts.length == 2)
                        return parts.pop().split(";").shift();
                    return null;
                }
                var rawTokenId = getCookieValue("token-id");
                var decodedTokenId = decodeToken(rawTokenId);
                
                var premiumData = null;
                try {
                    premiumData = localStorage.getItem("premium-ai") ? JSON.parse(localStorage.getItem("premium-ai")) : null;
                } catch (e) {
                    premiumData = null;
                }

                var isPremium = false;
                if (premiumData && premiumData.data === true) {
                    if (premiumData.expiry && premiumData.expiry > Date.now()) {
                        isPremium = true;
                    }
                }

                window.maziiTokenId = decodedTokenId;
                updateTranslateModelOptions(isPremium);
            } catch (error) {
                updateTranslateModelOptions(false);
            }
        } else {
            chrome.runtime.sendMessage({ request: 'getMaziiCookie' }, function(response) {
                if (response && response.cookie) {
                    // Decode token nếu có
                    var decodedTokenId = decodeToken(response.cookie);
                    window.maziiTokenId = decodedTokenId || response.cookie;
                    
                    var premiumData = null;
                    if (response.premiumData) {
                        try {
                            premiumData = JSON.parse(response.premiumData);
                        } catch (e) {
                            premiumData = null;
                        }
                    }
                    
                    var isPremium = false;
                    if (premiumData && premiumData.data === true) {
                        if (premiumData.expiry && premiumData.expiry > Date.now()) {
                            isPremium = true;
                        }
                    }
                    
                    updateTranslateModelOptions(isPremium);
                } else {
                    window.maziiTokenId = null;
                    updateTranslateModelOptions(false);
                }
            });
        }
    }

    getCookieAndPremium();
}

function updateTranslateModelOptions(isPremium) {
    window.isPremiumAI = !!isPremium;
}

function waitForOptions(callback) {
    if (typeof options !== 'undefined' && options) {
        callback();
    } else {
        setTimeout(function() {
            waitForOptions(callback);
        }, 100);
    }
}

initTranslateModel();

function syncAuthState(callback) {
    try {
        chrome.runtime.sendMessage({ request: 'getMaziiCookie' }, function(response) {
            var cookie = response && response.cookie ? response.cookie : null;
            var premiumDataRaw = response && response.premiumData ? response.premiumData : null;

            // Cập nhật token
            if (cookie && typeof cookie === 'string' && cookie.trim() !== '') {
                var decoded = decodeToken(cookie);
                window.maziiTokenId = decoded || cookie;
            } else {
                window.maziiTokenId = null;
            }

            // Cập nhật premium
            var isPremium = false;
            if (premiumDataRaw) {
                try {
                    var premiumObj = JSON.parse(premiumDataRaw);
                    if (premiumObj && premiumObj.data === true && premiumObj.expiry && premiumObj.expiry > Date.now()) {
                        isPremium = true;
                    }
                } catch (_) {}
            }
            updateTranslateModelOptions(isPremium);

            if (callback) callback();
        });
    } catch (e) {
        updateTranslateModelOptions(false);
        window.maziiTokenId = null;
        if (callback) callback();
    }
}

waitForOptions(function() {});
function printHTML (selection, data, e, gg) {
    if (!options) {
        return;
    }
    
    var linkmore;

    if(options.lang == 'vi') {
        linkmore = 'https://mazii.net/vi-VN/search/word/javi/' + selection;
    }else {
        linkmore = 'https://mazii.net/en-US/search/word/jaen/' + selection;
    }

    if (data != null) {
        var gt = data;
        if (gt != null) {
            var moreText = getTextOf('view_more');
            var vocabularyText = getTextOf('item_word');
            var kanjiText = getTextOf('item_kanji');
            var meaningText = getTextOf('item_meaning');
            
            var showMeaningTab = options.langFrom == "ja" && options.lang != "ja";

            var tip = '';
            var showTip = ableShowTip();
            if (showTip) {
                tip = getTextOf('tip_turnoff_fast_traslate');
            }

            var markup = "";

            if (!gg) {
                if (options.type == "kanji") {
                    var dataKanji = gt.results ? gt.results : gt;
                    markup = printMaziiVi(dataKanji);

                } else {
                    const dataMatch = [...(gt.data?.words ? gt.data.words : []), ...(gt.data?.suggestWords ? gt.data.suggestWords : [])];
                    if (options.lang == "vi" && options.langFrom == "ja") {
                        markup = printMaziiVi(dataMatch);
                    } else if ((options.lang == "en" || options.lang == "en_US") && options.langFrom =="ja") {
                        markup = printMaziiVi(dataMatch);
                        linkmore = 'https://mazii.net/en-US/search/word/jaen/' + selection;
                    } else if (data?.data?.words?.length > 0) {
                        markup = printMaziiVi(getMatchResult(data, selection));
                        linkmore = `https://mazii.net/${options.lang}/search/word/${options.langFrom}${options.lang}/` + selection;
                    } else {
                        markup = printGT(gt, "");
                        var gtConvert = [];
                        var means = [];
                        
                        var obj = convertGT(gt);
    
                        means.push({
                            examples : null,
                            mean : obj.mean
                        });
                        gtConvert.push({
                            means : means,
                            phonetic : obj.phonetic,
                            word : obj.word,
                            lang : options.lang,
                            langFrom : options.langFrom
                        });
                    }
                }
            } else {
                // Kiểm tra nếu có lỗi từ AI translation
                if (gt && gt.message) {
                    markup = '<div class="premium-required">' + gt.message + '</div>';
                } else {
                    markup = printGT(gt, "");
                    var gtConvert = [];
                    var means = [];
                    
                    var obj = convertGT(gt);

                    means.push({
                        examples : null,
                        mean : obj.mean
                    });
                    gtConvert.push({
                        means : means,
                        phonetic : obj.phonetic,
                        word : obj.word,
                        lang : options.lang,
                        langFrom : options.langFrom
                    });
                }
            }


            var moreTextFull = '';
            if ((options.lang == 'vi' && options.langFrom =="ja") || (options.lang == 'en' && options.langFrom =="ja") || (options.lang == 'en_US' && options.langFrom =="ja")) {
                moreTextFull = '<div id="selection_bubble_more_action"> \
                                        <span><a href="' + linkmore + '" target="_blank">'
                                            + moreText + '<span>>></span></a> \
                                        </span> \
                                    </div>';
            }

            // Thanh tab dùng chung (Word / Kanji / Giải nghĩa AI)
            var framefull = '<div id="dic_bubble" class="selection_bubble"> \
                                <audio controls id="audio-pronoun" style="display: none;" src=""></audio>\
                                ' + buildTabBar(options.type === "kanji" ? "kanji" : "word", shouldShowAITab(selection)) + '\
                                <div class="selection_bubble_word" id="selection_bubble_word"> \
                                    <span id="selection_bubble_close" align="right" alt="Đóng"></span> \
                                </div> \
                                <div class="selection_bubble_content">  \
                                    <div id="save-word"></div>\
                                    <div id="dic_bubble_synonyms">' + markup +
                                    '</div>\
                                </div> \
                                <div class="bottom-quick-search">\
                                    ' + optionLang + moreTextFull + '\
                                    <div id="bub-premium-error" style="display: none;"></div>\
                                    <div id="bubble_tip">' + tip + '</div>\
                                </div>\
                            </div>';
            renderBubble(e.clientX, e.clientY, framefull);
            
            // Lưu selection và markup ban đầu để sử dụng trong tab giải nghĩa
            currentSelection = selection;
            originalMarkup = markup;

            (document.getElementById('tip-turnoff-fast-translate') || {}).onclick = function () {
                 chrome.runtime.sendMessage({"request": "openOptionsPage"});
            };

            (document.getElementById('selection_bubble_close') || {}).onclick = function () {
                bubbleDOM.style.display = 'none';    
            };


            const divs = document.querySelectorAll('.pronoun-button');
            divs.forEach(div => {
                div.addEventListener('click', () => {
                    var audioSource = div.getAttribute('data-audio') || div.getAttribute('src');
                    playSoundByNative(audioSource);
                });
            });
            // Gắn nút lưu sổ tay theo từng từ (thanh action [+|🔊]).
            bindSaveButtons();
            if(options.type != "kanji"){
                document.getElementById("item-word").classList.add("item-active");
                document.getElementById("item-kanji").classList.remove("item-active");
                
                if(options.checkSaveMazii == true){
                    document.getElementById('save-word').remove();
                    var dataCV = (gtConvert === null || gtConvert === undefined) ? gt : gtConvert;

                    chrome.runtime.sendMessage({
                        request: 'addHist',
                        data: dataCV
                    }, function(response) {
                        if (response && response.status === 'success') {
                        } else {
                        }
                    });
                } else {
                    document.getElementById('save-word').onclick = function(){

                        var dataCV = (gtConvert === null || gtConvert === undefined) ? gt : gtConvert;

                        chrome.runtime.sendMessage({
                            request: 'addHist',
                            data: dataCV
                        }, function(response) {
                            if (response && response.status === 'success') {
                            } else {
                            }
                        });
    
                    };
    
                }
            } else {
                document.getElementById('save-word').remove();
                document.getElementById("item-kanji").classList.add("item-active")
                document.getElementById("item-word").classList.remove("item-active")
                
                hideModelSelector();
            }

            var itemKanji = document.getElementById("item-kanji");
            var itemWord = document.getElementById("item-word");
            var itemMeaning = document.getElementById("item-meaning");
            var modelSelector = document.getElementById("bub-model-selector");

            if (!currentTabType || currentTabType === "") {
                options.type = "word";
                currentTabType = "word";
                currentExplainTab = 0;
            }
            
            (itemKanji || {}).onclick = function() {
                itemWord.classList.remove("item-active");
                if (itemMeaning) itemMeaning.classList.remove("item-active");
                itemKanji.classList.add("item-active");
                options.type = "kanji";
                currentTabType = "kanji";
                currentExplainTab = 0;
                
                if (modelSelector) {
                    modelSelector.style.display = "none";
                }
                handleSelectionChange(selection,e);
            };

            (itemWord || {}).onclick = function() {
                itemKanji.classList.remove("item-active");
                if (itemMeaning) itemMeaning.classList.remove("item-active");
                itemWord.classList.add("item-active");
                options.type = "word";
                currentTabType = "word";
                currentExplainTab = 0;
                
                // Reload lại với type word để lấy dữ liệu từ vựng
                handleSelectionChange(selection,e);
            };
            
            if (itemMeaning) {
                (itemMeaning || {}).onclick = function() {
                    itemWord.classList.remove("item-active");
                    itemKanji.classList.remove("item-active");
                    itemMeaning.classList.add("item-active");
                    currentTabType = "meaning";
                    options.type = "word"; // Giữ type là word để không reload
                    
                    // Ẩn model selector khi vào tab giải nghĩa
                    if (modelSelector) {
                        modelSelector.style.display = "none";
                    }

                    // Hiển thị tab Giải nghĩa AI (từ đơn -> explain, cụm/câu -> dịch AI)
                    renderAITab(selection, document.getElementById("dic_bubble_synonyms"));
                };
            }

            bindKanjiTabs();
                
            document.getElementById("bub-language-selector").value = options.lang;
            document.getElementById("bub-language-selector").onchange = function () {
                options.lang = document.getElementById("bub-language-selector").value;
                saveOptions(options);
                
                // Giữ nguyên tab hiện tại khi thay đổi ngôn ngữ
                var savedTabType = currentTabType;
                var savedExplainTab = currentExplainTab;
                
                // reload result
                handleSelectionChange(selection,e);
                
                // Sau khi reload, khôi phục lại tab đã chọn
                setTimeout(function() {
                    if (savedTabType === "meaning") {
                        var itemMeaning = document.getElementById("item-meaning");
                        if (itemMeaning) {
                            // Xóa active class từ các tab khác
                            var itemWord = document.getElementById("item-word");
                            var itemKanji = document.getElementById("item-kanji");
                            if (itemWord) itemWord.classList.remove("item-active");
                            if (itemKanji) itemKanji.classList.remove("item-active");
                            
                            itemMeaning.classList.add("item-active");
                            currentTabType = "meaning";

                            // Hiển thị lại tab Giải nghĩa AI
                            renderAITab(selection, document.getElementById("dic_bubble_synonyms"));
                            
                            // Nếu đã chọn button giải nghĩa, khôi phục lại
                            if (savedExplainTab > 0) {
                                setTimeout(function() {
                                    var btn = document.getElementById("explain-btn-" + savedExplainTab);
                                    if (btn) {
                                        btn.click();
                                    }
                                }, 200);
                            }
                        }
                    } else if (savedTabType === "kanji") {
                        var itemKanji = document.getElementById("item-kanji");
                        if (itemKanji) {
                            var itemWord = document.getElementById("item-word");
                            var itemMeaning = document.getElementById("item-meaning");
                            if (itemWord) itemWord.classList.remove("item-active");
                            if (itemMeaning) itemMeaning.classList.remove("item-active");
                            
                            itemKanji.classList.add("item-active");
                            currentTabType = "kanji";
                            options.type = "kanji";
                        }
                    } else if (savedTabType === "word") {
                        var itemWord = document.getElementById("item-word");
                        if (itemWord) {
                            var itemKanji = document.getElementById("item-kanji");
                            var itemMeaning = document.getElementById("item-meaning");
                            if (itemKanji) itemKanji.classList.remove("item-active");
                            if (itemMeaning) itemMeaning.classList.remove("item-active");
                            
                            itemWord.classList.add("item-active");
                            currentTabType = "word";
                            options.type = "word";
                        }
                    }
                }, 500);
            };

            // Xử lý thay đổi model dịch
            document.getElementById("bub-model-selector").value = currentTranslateModel;
            document.getElementById("bub-model-selector").onchange = function () {
                var selected = document.getElementById("bub-model-selector").value;
                var isPremiumSelected = selected === "nmt";
                var hasToken =
                    window.maziiTokenId &&
                    typeof window.maziiTokenId === "string" &&
                    window.maziiTokenId.trim() !== "";
                
                var isPremiumAI = typeof window.isPremiumAI === "boolean" ? window.isPremiumAI : true;

                if (isPremiumSelected && (!hasToken || !isPremiumAI)) {
                    // Hiển thị thông báo nâng cấp và revert về Google
                    var errorDiv = document.getElementById('bub-premium-error');
                    if (errorDiv) {
                        errorDiv.innerHTML = '<div class="premium-required">' + msgPremiumRequired() + '</div>';
                        errorDiv.style.display = 'block';
                    }
                    currentTranslateModel = "google";
                    document.getElementById("bub-model-selector").value = "google";
                    return;
                }

                // Ẩn message nếu không chọn premium hoặc đã có premium
                var errorDiv = document.getElementById('bub-premium-error');
                if (errorDiv) {
                    errorDiv.style.display = 'none';
                    errorDiv.innerHTML = '';
                }

                currentTranslateModel = selected;
                // reload result
                handleSelectionChange(selection,e);
            };

            // Model selector chỉ hiện khi tab Từ vựng đang hiển thị dịch tự động (gg truthy)
            if (gg) {
                showModelSelector();
            } else {
                hideModelSelector();
            }

        }
    }

}

function showModelSelector() {
    var modelSelector = document.getElementById("bub-model-selector");
    if (modelSelector) {
        modelSelector.style.display = "block";
    }
}

function hideModelSelector() {
    var modelSelector = document.getElementById("bub-model-selector");
    if (modelSelector) {
        modelSelector.style.display = "none";
    }
}

function searchSelection(selection, e) {
    if (!options) {
        return;
    }
    
    function handleSendMessage(selection) {
        syncAuthState(function() {
        try {
            let urlData = getUrlQuery(selection);
            if(!urlData.url){
                // Kiểm tra nếu sử dụng model AI premium
                if (currentTranslateModel === "nmt") {
                    handleAITranslation(selection);
                    return;
                }
                if (currentTranslateModel === "nmt1") {
                    handleNmt1Translation(selection);
                    return;
                }
                let fallbackUrlData = getUrlQuery(selection, true);
                showModelSelector();
                requestXHTML(fallbackUrlData, function(data) {
                    data = JSON.parse(data);
                    printHTML(selection, data, e, true);
                })
                return;
            }

            try {
                chrome.runtime.sendMessage(
                    {
                        request: 'requestUrlPost',
                        url: urlData.url,
                        data: urlData.data
                    },
                    function ({ result }) {
                        dataRes = result.data ? result.data : result.results;
                        if (result.status != 200 || result.data?.words?.length === 0){
                            // Hiển thị model selector khi không có kết quả từ Mazii
                            showModelSelector();
                            if (currentTranslateModel === "nmt") {
                                handleAITranslation(selection);
                            } else if (currentTranslateModel === "nmt1") {
                                handleNmt1Translation(selection);
                            } else {
                                let fallbackUrlData = getUrlQuery(selection, true);
                                requestXHTML(fallbackUrlData, function(data) {
                                    data = JSON.parse(data);
                                    printHTML(selection, data, e, true);
                                });
                            }
                        } else {
                            printHTML(selection, result, e, false);
                            hideModelSelector();
                        }
                    }
                );
            } catch (error) {
                console.error('Đã xảy ra lỗi:', error);
            }
        
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
        });
    }

    function handleAITranslation(selection) {
        // Hiển thị model selector khi sử dụng AI translation
        showModelSelector();
        
        // Kiểm tra token trước khi gọi API
        if (!window.maziiTokenId || typeof window.maziiTokenId !== "string" || window.maziiTokenId.trim() === "") {
            printHTML(selection, {
                status: 403,
                found: false,
                message: msgAILoginRequired()
            }, e, true);
            return;
        }

        var ft = getTranslateFromTo(selection);
        var from = ft.from;
        var to = ft.to;

        Promise.all([
            getGoogleTranslatePhonetic(selection, from, to),
            translateAI(selection, from, to, currentTranslateModel),
        ])
        .then(function ([phoneticData, aiResponse]) {
            if (aiResponse && aiResponse.data) {
                var aiData = aiResponse.data;

                var formattedData = {
                    sentences: [
                        [aiData.sourceText, aiData.translateText],
                    ],
                    paragraph: aiData.translateText,
                    src_translit: phoneticData ? phoneticData.src_translit : null,
                    translit: phoneticData ? phoneticData.translit : null,
                    src: isJapanese(selection) ? "ja" : "en",
                };

                printHTML(selection, formattedData, e, true);
            } else if (aiResponse && aiResponse.message) {
                printHTML(selection, {
                    status: 403,
                    found: false,
                    message: aiResponse.message
                }, e, true);
            } else {
                printHTML(selection, {
                    status: 403,
                    found: false,
                    message: msgPremiumRequired()
                }, e, true);
            }
        })
        .catch(function (error) {
            printHTML(selection, {
                status: 500,
                found: false,
                message: msgTranslateError()
            }, e, true);
        });
    }

    // Mazii NMT (free, euplabs) — không cần đăng nhập.
    function handleNmt1Translation(selection) {
        showModelSelector();
        var ft = getTranslateFromTo(selection);
        Promise.all([
            getGoogleTranslatePhonetic(selection, ft.from, ft.to),
            translateNmt1(selection),
        ])
        .then(function ([phoneticData, translated]) {
            if (translated) {
                printHTML(selection, makeGTFormatted(selection, translated, phoneticData), e, true);
            } else {
                var fb = getUrlQuery(selection, true);
                requestXHTML(fb, function (data) {
                    try { printHTML(selection, JSON.parse(data), e, true); }
                    catch (err) { printHTML(selection, { status: 500, found: false, message: msgTranslateError() }, e, true); }
                });
            }
        })
        .catch(function () {
            printHTML(selection, { status: 500, found: false, message: msgTranslateError() }, e, true);
        });
    }


    handleSendMessage(selection);
} 


// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
    if (bubbleMouseDown) {
        bubbleMouseDown = false;
        return;
    }
    
    if (bubbleDOM) {
        bubbleDOM.style.display = 'none';
    }
}, false);

// Move that bubble to the appropriate location.
 
function renderBubble(mouseX, mouseY, selection) {
    if (!bubbleDOM) {
        return;
    }
    
    bubbleDOM.innerHTML = selection;
    bubbleDOM.style.display = 'block';
    bubbleDOM.style.visibility = 'hidden';

    mouseX += 40;
    mouseY += 40;

    // set position for bubble
    setTimeout(function () {
        var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
        
        var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        
        var top = mouseY + bubbleDOM.clientHeight;
        if (top > height) {
            top = height;  
        }
    
        top -= (bubbleDOM.clientHeight + 20) // 20 is padding
        
        // check left aligment
        var left = mouseX + bubbleDOM.clientWidth;
        if (left > width) {
            left = width;
        }
        left -= (bubbleDOM.clientWidth + 20);

        if (top < 0) {
            top = 0;
        }
        
        bubbleDOM.style.left = left + 'px';
        bubbleDOM.style.top = top + 'px';
        bubbleDOM.style.visibility = 'visible';
    }, 100)
}

function AddScript(url, object) {
    if (object != null) {
        // add script
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        //them tiep vao sau body 1 script
        document.body.appendChild(script);
 
        return true;
    } else {
        return false;
    };
};

function DeleteObject(UnusedReferencedObjects) {
    delete UnusedReferencedObjects;
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ableShowTip() {
    if (!options) {
        return false;
    }
    
    var i = getRandomInt(1, 100);
    if (options.showOption == true) {
        if (i < 20) {
            return true;
        }
        return false;
    }
        
    
    return true;
}

function openNewTab(url) {
    chrome.tabs.create({
        url: url
    })
}
