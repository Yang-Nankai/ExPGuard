var options = null;
var langPack = null;
var loadingLanguage = false;
var langSupport = ['zh_cn', 'zh_tw', 'en', 'de', 'es', 'fil', 'fr', 'hi', 'id', 'ko', 'mn', 'ms', 'my', 'ne', 'pt', 'ru', 'th', 'vi'];

var langDict = {
    "zh_CN": {
        lang: "cn",
    },
    "zh_TW": {
        lang: "tw",
    },
}

getOptions(function (data) {
    options = data;
    if (langPack == null) {
        getLanguagePack(options.lang, null);
    }
});



function isSupportLanguage(lang) {
    lang = lang.replace('-', '_');
    lang = lang.toLowerCase();

    for (var i = 0; i < langSupport.length; i++) {
        if (lang == langSupport[i]) {
            return true;
        }
    }

    return false;
}

function requestXHTML(url, successCallback) {

    var xhr = new XMLHttpRequest();
    try {
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4)
                return;

            if (xhr.responseText) {
                if (successCallback) {
                    successCallback(xhr.responseText);
                }
            }
        }

        xhr.onerror = function (error) {
        }

        if (url.indexOf("api.mazii.net") != -1) {
            xhr.open("POST", url, true);
            xhr.send(null);
        } else {
            xhr.open("GET", url, true);
            xhr.send(null);
        }

    } catch (e) {
        //console.error(e);
    }
}

function requestXHTMLPost(url, data, successCallback) {
    var xhr = new XMLHttpRequest();
    try {
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4)
                return;

            if (xhr.responseText) {
                if (successCallback) {
                    successCallback(xhr.responseText);
                }
            }
        }

        xhr.onerror = function (error) {
        }

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("x-no-encryption", "kY1w17QkuwpS1PYNhQwF4OfBAaRqRh");
        xhr.send(JSON.stringify(data));

    } catch (e) {
        //console.error(e);
    }
}

// lay lan luot cac ki tu cua tu muon search

function convertGT(gt) {
    var gtConvert = [];
    var word = "";
    var phonetic = "";
    var mean = "";
    var phoneticOfMean = "";
    for (var i = 0; i < gt.sentences.length; i++) {
        var sen = gt.sentences[i];
        if (sen.hasOwnProperty("trans"))
            mean += sen.trans;

        if (sen.hasOwnProperty("orig"))
            word += sen.orig;

        if (sen.hasOwnProperty("src_translit"))
            phonetic += sen.src_translit;

        if (sen.hasOwnProperty("translit"))
            phoneticOfMean += sen.translit;
    }


    return {
        word: word,
        phonetic: phonetic,
        mean: mean,
        phoneticOfMean: phoneticOfMean
    }
}

function printGT(gt, hv) {
    if (hv != "") {
        hv = " [" + hv + "]";
    }
    var markup = '<div class="google-translate-result word-detail-content-pl">';

    var word = "";
    var phonetic = "";
    var mean = "";
    var phoneticOfMean = "";
    
    if (gt.src_translit !== undefined || gt.translit !== undefined) {
        word = gt.sentences ? gt.sentences[0][0] : "";
        mean = gt.sentences ? gt.sentences[0][1] : "";
        phonetic = gt.src_translit || "";
        phoneticOfMean = gt.translit || "";
    } else {
        // Xử lý data từ Google Translate thông thường
        for (var i = 0; i < gt.sentences.length; i++) {
            var sen = gt.sentences[i];
            if (sen.hasOwnProperty("trans"))
                mean += sen.trans;

            if (sen.hasOwnProperty("orig"))
                word += sen.orig;

            if (sen.hasOwnProperty("src_translit"))
                phonetic += sen.src_translit;

            if (sen.hasOwnProperty("translit"))
                phoneticOfMean += sen.translit;
        }
    }


    markup += '<div class="word-entry">';
    markup += '<div class="word-title-group">';
    markup += '<div class="word-searched-pl">' + word + '</div>';
    if (hv) markup += '<div class="han-viet">' + hv + '</div>';
    markup += '</div>';

    // Thanh action [ + | 🔊 ]: đọc phía tiếng Nhật; lưu sổ tay với tiếng Nhật làm noteName.
    var jaSide = isJapanese(word) ? word : mean;      // phần tiếng Nhật để phát audio + lưu
    var otherSide = isJapanese(word) ? mean : word;   // phần còn lại làm nghĩa
    markup += renderWordActions(generateLinkAudio(jaSide), jaSide, otherSide, -1);

    if (phonetic != "") {
        markup += '<div class="word-search-phonetic">' + phonetic + '</div>';
    }

    markup += '<div class="word-mean-group">';
    markup += '<div class="word-mean">' + mean + '</div>';
    if (phoneticOfMean != "") {
        markup += '<div class="word-search-phonetic">' + phoneticOfMean + '</div>';
    }
    markup += '</div>';   // word-mean-group

    markup += '</div>';   // word-entry
    markup += '</div>';   // mazii-result
    return markup;
}

// danh sach ket qua tu da search
var fullData = JSON.parse(localStorage.getItem('markup'));
if (fullData == null || fullData == undefined) {
    fullData = [];
}


function printMaziiVi(data) {
    if (data == null)
        return "";

    var markup, dataKanji;
    var groupText = getTextOf('kanji_group');
    var kunText = getTextOf('kanji_kun');
    var onText = getTextOf('kanji_on');
    var numberStroke = getTextOf('kanji_stroke');

    if (options.type == "kanji") {

        // Lọc bỏ entry không có ký tự kanji (tránh id/box "undefined").
        data = (data || []).filter(function (k) { return k && k.kanji; });

        markup = '<div class="mazii-result word-detail-content-pl">';

        markup += '<div id="box-kanji">';

        for (var i = 0; i < data.length; i++) {
            var kanji = data[i];
            markup += '<div class="popup-txt-kanji" id="kanji-' + kanji.kanji + '">' + kanji.kanji + '</div>';
        }
        markup += '</div>';
        for (var j = 0; j < data.length; j++) {
            var dataKanji = data[j];
            markup += '<div class="popup-content-kanji" id="popup-content-kanji-' + dataKanji.kanji + '">';
            // mean = Hán-Việt (có ở dict javi); ngôn ngữ khác mean rỗng → chỉ hiện kanji.
            var kanjiMean = dataKanji.mean ? (' - ' + dataKanji.mean) : '';
            markup += '<div><span class="kanji-group">' + groupText + ' </span>' + dataKanji.kanji + kanjiMean + '</div>';
            if (kunText && dataKanji.kun) {
                // Giá trị kun bọc span riêng để tô màu brand, nhãn vẫn primary.
                markup += '<div><span class="kanji-kun">' + kunText + ' </span><span class="kanji-reading-value">' + dataKanji.kun + '</span></div>';
            }
            if (onText && dataKanji.on) {
                markup += '<div><span class="kanji-on">' + onText + ' </span><span class="kanji-reading-value">' + dataKanji.on + '</span></div>';
            }
            if (numberStroke && dataKanji.stroke_count) {
                markup += '<div><span class="kanji-stroke">' + numberStroke + ' </span>' + dataKanji.stroke_count + '</div>';
            }

            if (dataKanji.level && dataKanji.level.length) {
                // v3: level là mảng (vd ["N1"]) → join.
                var kanjiLevel = Array.isArray(dataKanji.level) ? dataKanji.level.join(', ') : dataKanji.level;
                markup += '<div><span>JLPT : </span>' + kanjiLevel + '</div>';
            }

            // Giải nghĩa kanji theo ngôn ngữ (trường `detail`, localize theo dict).
            if (dataKanji.detail) {
                markup += '<div class="kanji-detail">' + convertDetailKanji(dataKanji.detail).replace(/\n/g, '<br>') + '</div>';
            }
            markup += '<div class="word-detail-link"><a href="' + maziiWordUrl('kanji', dataKanji.kanji) + '" target="_blank">' + (getTextOf('detail') || 'Details') + '</a></div>';
            markup += '</div>';
        }

        markup += '</div>';

        return markup;
           

    } else {
        markup = '<div class="mazii-result word-detail-content-pl">';
        for (var i = 0; i < data.length; i++) {
            var word = data[i];
            markup += '<div class="word-entry">'
            markup += '<div class="word-title-group">';
            markup += '<div class="word-searched-pl">' + word.word + '</div>';
            var han = (options.lang == 'vi' && word.han) ? '[' + word.han + ']' : '';
            markup += '<div class="han-viet">' + han + '</div>';
            if (word.level && word.level.length) {
                var levels = Array.isArray(word.level) ? word.level : [word.level];
                for (var li = 0; li < levels.length; li++) {
                    var lv = (levels[li] || '').toString().trim();
                    var lvClass = lv.toLowerCase().replace(/[^a-z0-9]/g, '');
                    markup += '<span class="word-level level-' + lvClass + '">' + lv + '</span>';
                }
            }
            if (word.verify) {
                markup += '<span class="word-verify" title="verified">✓</span>';
            }
            markup += '</div>';
            var phon = (word.phonetic || '').trim();
            var audioText = (phon && !/\s/.test(phon)) ? phon : (word.word || '');
            var saveMean = (word.means && word.means[0] && word.means[0].mean) || '';
            markup += renderWordActions(generateLinkAudio(audioText), word.word, saveMean, (word._id || word.mongoId || -1));
            if(word.phonetic) {
                var phoneticWrapped = word.phonetic.trim().split(/\s+/)
                    .map(function (p) { return '「' + p + '」'; }).join(' ');
                markup += '<div class="word-search-phonetic">' + phoneticWrapped + '</div>';
            }
            markup += '<div class="word-mean-group">'
            var dictKind = 'ja' + (langDict[options.lang]?.lang ?? options.lang); // 'javi'/'jaen'/'jacn'...
            var prevKind = null;
            for (var j = 0; j < word.means.length; j++) {
                var mean = word.means[j];
                var kindCode = (mean.kind || '').trim();
                if (kindCode && kindCode !== prevKind) {
                    markup += '<div class="word-kind">' + convertKindToReadable(kindCode, dictKind) + '</div>';
                    prevKind = kindCode;
                }
                markup += '<div class="word-mean">' + mean.mean + '</div>';
                var exampleMean = mean.examples;

                if (exampleMean && exampleMean.length > 0) {
                    markup += '<div class="word-example">' + exampleMean[0].content+ '</div>';
                    markup += '<div class="word-example-mean">' + exampleMean[0].mean+ '</div>';
                }
                
            }
            markup += '</div>';
            markup += '<div class="word-detail-link"><a href="' + maziiWordUrl('word', word.word) + '" target="_blank">' + (getTextOf('detail') || 'Details') + '</a></div>';
            markup += '</div>'

            data[i].lang = options.lang;
            data[i].langFrom = options.langFrom;

        }
        markup += '</div>';
        return markup;
    }
}


function getMatchResult(data, selection) {
    if (data == null)
        return null;

    var outputs = [];

    if (options.type == 'kanji') {
        outputs = data.results ? data.results : [];
    } else {
        // Chỉ lấy kết quả khớp ở `words`; `suggestWords` là từ liên quan, không hiển thị ở đây.
        // `words` rỗng đã được caller (popup/contents) xử lý chuyển sang dịch tự động trước khi tới đây.
        outputs = data.data?.words ? data.data.words : [];
    }

    return outputs.length == 0 ? null : outputs;
}

convertJptoHex = function (jp) {
    if (jp == null || jp == "") {
        return "";
    }

    if (jp.indexOf('「') != -1) {
        jp = jp.replace(new RegExp('「', 'g'), '');
        jp = jp.replace(new RegExp('」', 'g'), '');
    }

    jp = jp.trim();
    var result = '';

    for (var i = 0; i < jp.length; i++) {
        result += ("0000" + jp.charCodeAt(i).toString(16)).substr(-4);
        if (i != jp.length - 1) {
            result += "_";
        }
    }

    return result;
}

function convertDetailKanji(value) {
    if (value && value.length > 0) {
        value = value.replace(new RegExp('##', 'g'), '\n');
        return value;
    } else {
        return '';
    }

}


function generateLinkAudio(text) {
    // Sử dụng API mới để lấy audio
    var audioUrl = "https://hub.mazii.net/api/audio?text=" + encodeURIComponent(text);
    return audioUrl;
}

function isJapanese(keyword) {
    var len = keyword.length;
    for (var i = 0; i < len; i++) {
        // charAt(i): lay chu cai o vi tri i
        if (isKanji(keyword.charAt(i)) ||
            isHiragana(keyword.charAt(i)) ||
            isKatakan(keyword.charAt(i))) {
            return true;
        }
    }

    return false;
}

function getKanjiChara(keyword) {

    if (keyword == null) {
        return '';
    }

    var result = '';
    var len = keyword.length;
    for (var i = 0; i < len; i++) {
        if (isKanji(keyword.charAt(i))) {
            result += keyword.charAt(i);
        }
    }

    return result;
}

function isRomanji(c) {
    // charCodeAt(i): tra ve Unicode cua ky tu o vi tri i
    var charcode = c.charCodeAt(0);
    if (charcode >= 0x0020 && charcode <= 0x007e) {
        return true;
    }

    return false;
}

function isHiragana(c) {
    var charcode = c.charCodeAt(0);
    if (charcode >= 0x3040 && charcode <= 0x309F) {
        return true;
    }

    return false;
}

function isKatakan(c) {
    var charcode = c.charCodeAt(0);
    if (charcode >= 0x30A0 && charcode <= 0x30FF) {
        return true;
    }

    return false;
}

function isKanji(c) {
    var charcode = c.charCodeAt(0);
    if (charcode >= 0x4E00 && charcode <= 0x9FBF) {
        return true;
    }
    return false;
}

// Nguồn/đích cho DỊCH (Google Translate / AI): auto-detect nguồn;
// text có tiếng Nhật -> dịch sang options.lang; không có -> dịch NGƯỢC sang 'ja'.
function getTranslateFromTo(text) {
    if (isJapanese(text)) return { from: 'ja', to: options.lang };
    return { from: 'auto', to: 'ja' };
}

// Mã ngôn ngữ -> tên tiếng Anh (cho body target_lang của NMT1/euplabs). Port từ Safari.
var LANG_TO_ENGLISH_NAME = {
    vi: 'Vietnamese', en: 'English', en_us: 'English',
    zh_cn: 'Chinese Simplified', cn: 'Chinese Simplified', zh_tw: 'Chinese Traditional', tw: 'Chinese Traditional',
    ko: 'Korean', fr: 'French', id: 'Indonesian', es: 'Spanish', th: 'Thai',
    ru: 'Russian', hi: 'Hindi', de: 'German', pt: 'Portuguese', ms: 'Malay',
    mn: 'Mongolian', my: 'Burmese', ne: 'Nepali', fil: 'Filipino', el: 'Greek', ja: 'Japanese'
};
function getEnglishNameForLang(lang) {
    if (!lang) return 'English';
    var key = lang.replace('-', '_').toLowerCase();
    return LANG_TO_ENGLISH_NAME[key] || 'English';
}

// Model NMT1 (Mazii NMT free) — euplabs. Key tĩnh dùng chung (giống Safari Secrets).
var NMT1_API_KEY = 'bad847f551b1a44fd7195056e20385c32cab48feaae9df2e69394caf2fec7e8c';
function translateNmt1(text) {
    return new Promise(function (resolve) {
        var to = getTranslateFromTo(text).to; // 'ja' hoặc options.lang
        var xhr = new XMLHttpRequest();
        try {
            xhr.open('POST', 'https://trans.euplabs.net/v1/translate', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + NMT1_API_KEY);
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status === 200) {
                    try { resolve(JSON.parse(xhr.responseText).translated_text || null); }
                    catch (e) { resolve(null); }
                } else resolve(null);
            };
            xhr.send(JSON.stringify({ text: text, target_lang: getEnglishNameForLang(to), temperature: 0.2, max_tokens: 1024 }));
        } catch (e) { resolve(null); }
    });
}

// Gộp kết quả dịch (nguồn + bản dịch + phiên âm) về dạng printGT hiểu được.
function makeGTFormatted(source, translated, phoneticData) {
    return {
        sentences: [[source, translated]],
        paragraph: translated,
        src_translit: phoneticData ? phoneticData.src_translit : null,
        translit: phoneticData ? phoneticData.translit : null,
        src: isJapanese(source) ? 'ja' : 'en'
    };
}

// Locale route của web mazii-web-v2 (vi -> vi-VN…). Dùng cho link "Chi tiết".
var LANG_TO_HL = { vi:'vi-VN', en:'en-US', zh_cn:'zh-CN', zh_tw:'zh-TW', ko:'ko-KR',
    fr:'fr-FR', id:'id-ID', es:'es-ES', th:'th-TH', ru:'ru-RU', hi:'hi-IN', de:'de-DE',
    pt:'pt-BR', ms:'ms-MY', mn:'mn-MN', my:'my-MM', ne:'ne-NP', fil:'tl-PH' };
function getWebLocale(lang) {
    return LANG_TO_HL[(lang || 'en').replace('-', '_').toLowerCase()] || 'en-US';
}
// Link trang chi tiết mazii.net cho 1 từ/kanji. type = 'word' | 'kanji'.
function maziiWordUrl(type, word) {
    var lang = options ? options.lang : 'en';
    var dict = 'ja' + (langDict[lang]?.lang ?? lang);
    return 'https://mazii.net/' + getWebLocale(lang) + '/search/' + type + '/' + dict + '/' + encodeURIComponent(word || '');
}

function getUrlQuery(keyword, gg) {
    if (gg == null) {
        // Từ điển Mazii: luôn tra theo từ điển Nhật (ja + ngôn ngữ đích).
        var langTo = langDict[options.lang]?.lang ?? options.lang;
        var url = options.type == "kanji"
            ? "https://mazii.net/api/search/kanji/v3"
            : "https://mazii.net/api/search/word/v3";
        return {
            url: url,
            data: {
                dict: 'ja' + langTo,
                query: keyword,
                page: 1
            }
        };
    }

    // Google Translate: auto-detect nguồn; đích theo getTranslateFromTo.
    var ft = getTranslateFromTo(keyword);
    return `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&dt=bd&dj=1&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=at&sl=${ft.from}&tl=${ft.to}&q=${encodeURI(keyword)}`;
}

// Ngôn ngữ mặc định lần đầu cài: theo ngôn ngữ trình duyệt/máy nếu nằm trong 18 ngôn ngữ
// hỗ trợ (kể cả biến thể vùng như en-US -> en, pt-BR -> pt, zh-CN -> zh_CN); ngoài ra -> 'en'.
function detectDefaultLang() {
    var raw = chrome.i18n.getMessage('@@ui_locale') || 'en';
    var norm = raw.replace('-', '_').toLowerCase();   // en_us, zh_cn, pt_br, ja...
    var base = norm.split('_')[0];                    // en, zh, pt, ja
    var canon = { zh_cn: 'zh_CN', zh_tw: 'zh_TW' };   // giá trị option đúng (khớp selector)
    if (langSupport.indexOf(norm) !== -1) return canon[norm] || norm;
    if (langSupport.indexOf(base) !== -1) return canon[base] || base;
    return 'en';
}

function defaultOption() {
    var options = {};
    options.lang = detectDefaultLang();

    options.langFrom = 'ja';
    options.enabled = true;
    options.enableHttps = true;
    options.showOption = false;
    options.doubleClickEnable = true;
    options.doubleCickTriggerKey = 'none';
    options.selectTextEnable = true;
    options.selectTriggerKey = 'alt';
    options.shortKeyEnableDbclick = true;
    options.checkTabMazii = false;
    options.checkSaveMazii = true;
    return options;
}

function getOptions(callback) {
    var options = null;
    chrome.storage.sync.get("maziioption", function (obj) {
        if (obj == null) {
            options = defaultOption();
            saveOptions(options);
        } else {
            options = obj.maziioption;
            if (options == null) {
                options = defaultOption();
                saveOptions(options);
            }
        }

        // Mazii là từ điển Nhật: nguồn tra luôn là 'ja' (đã bỏ UI "Dịch từ").
        if (options) options.langFrom = 'ja';

        if (callback != null) {
            callback(options);
        }
    });
}

function saveOptions(options) {
    chrome.storage.sync.set({ 'maziioption': options }, function () {
    });
}



chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName != "sync")
        return;

    if (changes.maziioption != null) {
        if (changes.maziioption.newValue != null) {
            options = changes.maziioption.newValue;

            // reload langPack
            getLanguagePackFromFile(options.lang, null);
        }
    }
});

function getTextOf(msg_id) {

    if (langPack == null) {
        return '';
        //return chrome.i18n.getMessage(msg_id);
    }

    var msg = langPack[msg_id];
    if (msg != null) {
        return msg['message'];
    }

    return '';
}

// Tăng số này mỗi khi thêm/sửa key i18n → cache langPack cũ tự nạp lại từ file.
var LANGPACK_VERSION = 3;

// ngon ngu cua phan tuy chon
function getLanguagePack(locale, callback) {

    if (isSupportLanguage(locale) == false) {
        // get default is en
        locale = 'en';
    }
    var want = locale.replace('-', '_').toLowerCase();

    // Chỉ dùng cache khi ĐÚNG version + ĐÚNG locale; ngược lại nạp lại từ file
    // (tránh langPack cũ thiếu key mới → rơi về tiếng Anh).
    chrome.storage.sync.get(["langPack", "langPackVer", "langPackLocale"], function (obj) {
        if (obj.langPack && obj.langPackVer === LANGPACK_VERSION && obj.langPackLocale === want) {
            langPack = obj.langPack;
            if (callback != null) callback();
        } else {
            getLanguagePackFromFile(locale, callback);
        }
    });
}

function getLanguagePackFromFile(locale, callback) {

    locale = locale.replace('-', '_');
    locale = locale.toLowerCase();

    if (isSupportLanguage(locale) == false) {
        // get default is en
        locale = 'en';
    }

    requestXHTML(chrome.runtime.getURL('_locales/' + locale + '/messages.json'), function (data) {
        langPack = JSON.parse(data);
        chrome.storage.sync.set({ "langPack": langPack, "langPackVer": LANGPACK_VERSION, "langPackLocale": locale }, function (obj) { });

        if (callback != null) {
            callback();
        }
    });
}



function playSoundByNative(url) {
    const link = url ?? "";
    var audioPlayer = document.getElementById("audio-pronoun");
    if(link){
        audioPlayer.src = link;
        audioPlayer.load();
        audioPlayer.play();
    }
}


/* =========================================================================
 * SHARED TAB + AI MODULE (dùng chung cho popup và bubble — "sửa 1 được 2")
 * ========================================================================= */

// 3 tab dùng chung
var MZ_TABS = { WORD: "word", KANJI: "kanji", AI: "ai" };

// State cho phần giải nghĩa AI (explain word)
var explainData = [];
var explainRenderState = { stt: 0, nbIndex: 0 };
var currentExplainTab = 0; // 0: chưa chọn, 1: "là gì?", 2: "とは?"

// Nhớ sub-tab giải nghĩa user chọn lần trước (1: "là gì?", mặc định; 2: "とは?").
function getExplainTabPref() {
    try { return (parseInt(localStorage.getItem('mz-explain-tab'), 10) === 2) ? 2 : 1; } catch (e) { return 1; }
}
function setExplainTabPref(tab) {
    try { localStorage.setItem('mz-explain-tab', String(tab)); } catch (e) {}
}

// Dựng thanh tab Word / Kanji / Giải nghĩa AI. activeKey: "word" | "kanji" | "ai"
// Gắn chip kanji (tab Hán tự): ẩn hết chi tiết, mặc định chọn chip đầu, bấm chip → hiện đúng chi tiết.
// Dùng chung popup + bubble (chạy trên document của context gọi).
function bindKanjiTabs() {
    var listKanji = document.getElementsByClassName('popup-txt-kanji');
    if (!listKanji.length) return;
    for (var k = 0; k < listKanji.length; k++) {
        var el = document.getElementById('popup-content-kanji-' + listKanji[k].innerHTML);
        if (el) el.style.display = 'none';
        listKanji[k].onclick = function () {
            for (var i = 0; i < listKanji.length; i++) {
                listKanji[i].classList.remove('popup-kanji-active');
                var c = document.getElementById('popup-content-kanji-' + listKanji[i].innerHTML);
                if (c) c.style.display = 'none';
            }
            this.classList.add('popup-kanji-active');
            var sel = document.getElementById('popup-content-kanji-' + this.innerHTML);
            if (sel) sel.style.display = 'block';
        };
    }
    // Mặc định chọn chip đầu tiên.
    listKanji[0].classList.add('popup-kanji-active');
    var first = document.getElementById('popup-content-kanji-' + listKanji[0].innerHTML);
    if (first) first.style.display = 'block';
}

// Tab "Giải nghĩa AI" chỉ hiện khi text là tiếng Nhật & <= 8 ký tự.
function shouldShowAITab(text) {
    var t = (text || '').trim();
    return isJapanese(t) && t.length <= 8;
}

function buildTabBar(activeKey, showAI) {
    var wordLabel = getTextOf("item_word") || "Word";
    var kanjiLabel = getTextOf("item_kanji") || "Kanji";
    var aiLabel = getTextOf("item_ai") || getTextOf("item_meaning") || "AI";
    // Ẩn tab AI → nếu đang active AI thì chuyển active về "word" để không mất highlight.
    if (!showAI && activeKey === "ai") activeKey = "word";
    function cls(key) {
        return "item-type item-" + key + (activeKey === key ? " item-active" : "");
    }
    var html = '<div class="box-select-type">' +
        '<div id="item-word" class="' + cls("word") + '">' + wordLabel + '</div>' +
        '<div id="item-kanji" class="' + cls("kanji") + '">' + kanjiLabel + '</div>';
    if (showAI) {
        html += '<div id="item-meaning" class="' + cls("ai") + '">' + aiLabel + '</div>';
    }
    html += '</div>';
    return html;
}

// Quyết định selection là "từ đơn" (dùng explain) hay "cụm/câu" (dùng dịch AI)
function isSingleWordSelection(selection) {
    var s = (selection || "").trim();
    if (!s) return false;
    if (/\s/.test(s)) return false;      // có khoảng trắng => cụm/câu
    return s.length <= 20;               // quá dài => coi như câu
}

// Render tab "Giải nghĩa AI" vào containerEl: từ đơn -> explain-word (GPT); cụm/câu -> dịch AI
function renderAITab(selection, containerEl) {
    if (!containerEl) return;

    var hasToken = window.maziiTokenId && typeof window.maziiTokenId === "string" && window.maziiTokenId.trim() !== "";
    if (!hasToken) {
        containerEl.innerHTML = '<div class="premium-required">' + msgAILoginRequired() + '</div>';
        return;
    }

    if (isSingleWordSelection(selection)) {
        // Từ đơn -> giải nghĩa GPT
        showExplainTab(selection, containerEl);
        return;
    }

    // Cụm/câu -> dịch AI (auto-detect nguồn; không phải Nhật -> dịch sang 'ja')
    var ft = getTranslateFromTo(selection);
    var from = ft.from;
    var to = ft.to;
    var model = "nmt";

    containerEl.innerHTML = '<div style="text-align:center;padding:20px;">' + msgTranslating() + '</div>';

    Promise.all([
        getGoogleTranslatePhonetic(selection, from, to),
        translateAI(selection, from, to, model),
    ]).then(function (arr) {
        var phoneticData = arr[0];
        var aiResponse = arr[1];
        if (aiResponse && aiResponse.data) {
            var aiData = aiResponse.data;
            var formattedData = {
                sentences: [[aiData.sourceText, aiData.translateText]],
                paragraph: aiData.translateText,
                src_translit: phoneticData ? phoneticData.src_translit : null,
                translit: phoneticData ? phoneticData.translit : null,
                src: isJapanese(selection) ? "ja" : "en",
            };
            containerEl.innerHTML = printGT(formattedData, "");
        } else if (aiResponse && aiResponse.message) {
            containerEl.innerHTML = '<div class="premium-required">' + aiResponse.message + '</div>';
        } else {
            containerEl.innerHTML = '<div class="premium-required">' + msgPremiumRequired() + '</div>';
        }
    }).catch(function () {
        containerEl.innerHTML = '<div class="error-message">' + msgTranslateError() + '</div>';
    });
}

// UI explain-word: 2 nút "… là gì?" / "… とは?" render vào containerEl
function showExplainTab(selection, containerEl) {
    if (!containerEl) return;
    var word = selection || "";
    if (!word) return;

    currentExplainTab = 0;
    explainData = [];
    explainRenderState = { stt: 0, nbIndex: 0 };

    // Rút gọn: > 8 ký tự → 5 ký tự đầu + "..." (ký tự 6,7,8 = ...); ≤ 8 → hiện đủ.
    var wordDisplay = word.length > 8 ? (word.slice(0, 5) + "...") : word;
    var txtWhat = getTextOf("txt_what") || "{{ value }} là gì?";
    txtWhat = txtWhat.replace("{{ value }}", wordDisplay);

    var explainHtml = '<div id="explain-container" style="display: block;">' +
        '<div class="box-explain-select">' +
        '<div class="explain-chip" id="explain-btn-1">' + txtWhat + '</div>' +
        '<div class="explain-chip" id="explain-btn-2">' + wordDisplay + ' とは?</div>' +
        '</div>' +
        '<div id="explain-content"></div>' +
        '</div>';
    containerEl.innerHTML = explainHtml;

    function selectExplain(tab) {
        var b1 = document.getElementById("explain-btn-1");
        var b2 = document.getElementById("explain-btn-2");
        if (!b1 || !b2) return;
        b1.classList.toggle("explain-chip-active", tab === 1);
        b2.classList.toggle("explain-chip-active", tab === 2);
        currentExplainTab = tab;
        setExplainTabPref(tab);
        getExplainWord(word, tab);
    }

    var btn1 = document.getElementById("explain-btn-1");
    if (btn1) btn1.onclick = function () { if (currentExplainTab !== 1) selectExplain(1); };
    var btn2 = document.getElementById("explain-btn-2");
    if (btn2) btn2.onclick = function () { if (currentExplainTab !== 2) selectExplain(2); };

    // Mặc định chọn tab "là gì?" (1) hoặc tab user chọn lần trước, và tải nội dung luôn.
    selectExplain(getExplainTabPref());
}

function getExplainWord(word, tabType) {
    var explainContent = document.getElementById("explain-content");
    if (!window.maziiTokenId || typeof window.maziiTokenId !== "string" || window.maziiTokenId.trim() === "") {
        if (explainContent) {
            explainContent.innerHTML = '<div class="premium-required">' + msgAILoginRequired() + '</div>';
        }
        return;
    }
    if (explainContent) {
        explainContent.innerHTML = '<div style="text-align: center; padding: 20px;">' + msgLoading() + '</div>';
    }

    var langSend = "";
    if (tabType === 2) {
        langSend = "ja";
    } else {
        langSend = options.lang || "vi";
        if (langSend === "cn" || langSend === "zh_CN") langSend = "zh-CN";
        else if (langSend === "tw") langSend = "zh-TW";
        else if (langSend === "en_US") langSend = "en";
    }

    var url = "https://api2.mazii.net/api/v2/gpt/explain-word/action";
    var dataSend = { word: word, language: langSend, test: true };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    if (window.maziiTokenId) {
        xhr.setRequestHeader("Authorization", window.maziiTokenId);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        var ec = document.getElementById("explain-content");
        if (xhr.status === 200 || xhr.status === 201) {
            try {
                var result = JSON.parse(xhr.responseText);
                if (result.status === 401 && result.error === true && result.message === "Max request per day exceeded") {
                    if (ec) ec.innerHTML = '<div class="premium-required">' + msgRateLimit() + '</div>';
                    return;
                } else if (result && result.error === true && result.status === 400 && result.message === "The word may not be greater than 50 characters.") {
                    if (ec) ec.innerHTML = '<div class="premium-required">' + msgWordTooLong() + '</div>';
                    return;
                } else if (result && result.error === true && result.status === 401) {
                    if (ec) ec.innerHTML = '<div class="premium-required">' + explainSessionInvalidHtml() + '</div>';
                    return;
                }
                var txtExplain = null;
                if (result && result.data) {
                    if (typeof result.data === "object" && result.data.data) txtExplain = result.data.data;
                    else if (typeof result.data === "string") txtExplain = result.data;
                }
                if (txtExplain && typeof txtExplain === "string") {
                    explainData = txtExplain.split("\n");
                    explainRenderState = { stt: 0, nbIndex: 0 };
                    renderExplain();
                } else if (ec) {
                    ec.innerHTML = "<div>" + msgNoExplainData() + "</div>";
                }
            } catch (e) {
                if (ec) ec.innerHTML = "<div>" + explainErrorText() + "</div>";
            }
        } else if (xhr.status === 403) {
            if (ec) ec.innerHTML = '<div class="premium-required">' + msgPremiumRequired() + '</div>';
        } else if (xhr.status === 401) {
            if (ec) ec.innerHTML = '<div class="premium-required">' + explainSessionInvalidHtml() + '</div>';
        } else if (ec) {
            ec.innerHTML = "<div>" + explainErrorText() + " (" + xhr.status + ")</div>";
        }
    };
    xhr.send(JSON.stringify(dataSend));
}

// Text lỗi giải nghĩa (i18n, fallback tiếng Anh trung tính).
function explainErrorText() {
    return getTextOf('explain_error') || 'An error occurred while loading the explanation.';
}
// Thông báo phiên đăng nhập không hợp lệ (i18n) + chèn link đăng nhập qua {{ link }}.
function explainSessionInvalidHtml() {
    var msg = getTextOf('explain_session_invalid')
        || 'Your login session is invalid for AI explanation. Please log in again at {{ link }}.';
    return msg.replace('{{ link }}', '<a href="https://mazii.net/user/login" target="_blank">mazii.net</a>');
}

// Các thông báo UI khác (i18n, fallback tiếng Anh). Giữ {{ link }} → chèn thẻ <a>.
function i18nWithLink(key, url, fallback) {
    return (getTextOf(key) || fallback).replace('{{ link }}',
        '<a href="' + url + '" target="_blank">mazii.net</a>');
}
function msgPremiumRequired() {
    return i18nWithLink('premium_required', 'https://mazii.net/upgrade?type=ai',
        'This feature requires a Premium AI account. Please upgrade at {{ link }}.');
}
function msgAILoginRequired() {
    return i18nWithLink('ai_login_required', 'https://mazii.net/user/login',
        'Please log in at {{ link }} to use the AI feature.');
}
function msgRateLimit() {
    return i18nWithLink('explain_rate_limit', 'https://mazii.net/upgrade?type=ai',
        'You have reached the daily free limit (3 lookups/day). Please upgrade at {{ link }}.');
}
function msgTranslateError() { return getTextOf('translate_error') || 'An error occurred while translating. Please try again.'; }
function msgLoading()        { return getTextOf('loading') || 'Loading...'; }
function msgTranslating()    { return getTextOf('translating') || 'Translating...'; }
function msgWordTooLong()    { return getTextOf('word_too_long') || 'The word must not exceed 50 characters.'; }
function msgNoExplainData()  { return getTextOf('no_explain_data') || 'No explanation data.'; }

function renderExplain() {
    var explainContent = document.getElementById("explain-content");
    if (!explainContent) return;

    if (explainRenderState.nbIndex === 0 && explainRenderState.stt === 0) {
        var html = "";
        for (var i = 0; i < explainData.length; i++) {
            html += '<p id="dataExplain-' + i + '" style="margin: 10px 0; line-height: 1.6;"></p>';
        }
        explainContent.innerHTML = html;
    }

    var dataItem = explainData[explainRenderState.nbIndex];
    if (explainRenderState.nbIndex < explainData.length) {
        if (explainRenderState.stt < dataItem.length) {
            var elm = document.getElementById("dataExplain-" + explainRenderState.nbIndex);
            if (elm) {
                elm.innerHTML += dataItem.charAt(explainRenderState.stt);
                explainRenderState.stt++;
                setTimeout(function () { renderExplain(); }, 25);
            }
        } else {
            explainRenderState.stt = 0;
            explainRenderState.nbIndex++;
            renderExplain();
        }
    }
}

// Lấy phonetic từ Google Translate API
function getGoogleTranslatePhonetic(query, from, to) {
    return new Promise((resolve) => {
        const url = "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&dt=bd&dj=1&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=at&sl=" + from + "&tl=" + to + "&q=" + encodeURI(query);
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (Array.isArray(data.sentences)) {
                        let src_translit = "";
                        let translit = "";
                        for (var i = 0; i < data.sentences.length; i++) {
                            var sen = data.sentences[i];
                            if (sen.hasOwnProperty("src_translit")) src_translit += sen.src_translit;
                            if (sen.hasOwnProperty("translit")) translit += sen.translit;
                        }
                        resolve({ src_translit: src_translit || null, translit: translit || null });
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        };
        xhr.send();
    });
}

// Dịch theo AI API (Gemini, LLM, NMT)
function translateAI(query, from, to, type) {
    const url = "https://api-conversation.mazii.net/api/translate";
    const payload = {
        type: type,
        sourceLanguageCode: from,
        targetLanguageCode: to === "en_US" ? "en" : to,
        text: query,
    };
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        if (window.maziiTokenId) {
            xhr.setRequestHeader("Authorization", window.maziiTokenId);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200 || xhr.status === 201) {
                try {
                    const result = JSON.parse(xhr.responseText);
                    if ((result.statusCode === 201 && result.data) || result.message) resolve(result);
                    else resolve(null);
                } catch (e) {
                    reject(e);
                }
            } else if (xhr.status === 403) {
                resolve({ message: msgPremiumRequired(), statusCode: 403 });
            } else if (xhr.status === 401) {
                resolve({ message: msgAILoginRequired(), statusCode: 401 });
            } else {
                reject(new Error("API Error: " + xhr.status));
            }
        };
        xhr.send(JSON.stringify(payload));
    });
}