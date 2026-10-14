var host = "https://mazii.net";
var isShowDrawingKaji = false;
var currentTranslateModel = "google";
var currentTabType = "word"; // "word" | "kanji" | "ai" — tab đang chọn trong popup
var currentQuery = "";       // từ/cụm đang tra (để reload khi chuyển tab)

let listDictSearch = {
    "en-US": {
        lang: "en",
    },
};

$(document).ready(function () {
    // comment-google-analytics
    // ga('create', 'UA-47792030-2', 'mazii-chrome');
    // ga('send', 'popup');

    // Năm bản quyền theo năm hiện tại.
    var _yr = document.getElementById("year");
    if (_yr) _yr.textContent = new Date().getFullYear();

    $(".product-name-link").click(function () {
        openNewTab(host);
    });

    searchTextbox = $("#dict-search");

    var key = JSON.parse(localStorage.getItem("key"));
    if (key == null || key == undefined) {
        key = [];
    }
    // Nút xoá (x): chỉ hiện khi ô tìm không rỗng.
    function toggleClearQuery() {
        if (searchTextbox.val().trim() !== "") $("#clear-query").removeClass("mazii_hide");
        else $("#clear-query").addClass("mazii_hide");
    }
    searchTextbox.on("input", toggleClearQuery);
    $("#clear-query").click(function () {
        searchTextbox.val("");
        $("#clear-query").addClass("mazii_hide");
        searchTextbox.focus();
    });
    toggleClearQuery(); // trạng thái ban đầu (nếu ô đã có sẵn text)

    searchTextbox.keypress(function (event) {
        $(".history").hide();
        // catch ENTER key
        if (event.keyCode == 13) {
            var keyword = $(this).val();
            keyword = keyword.trim();
            if (keyword != "") {
                // Ẩn message lỗi premium khi bắt đầu search
                $("#premium-error").hide().html("");
                toggleClearQuery();
                searchTextbox.blur(); // lam mo
                currentTabType = "word";
                if (options) options.type = "word";
                search(keyword);
                key.splice(0, 0, keyword);
                localStorage.setItem("key", JSON.stringify(key));
            }
        }
    });

    $("#search-button").click(function (e) {
        var keyword = searchTextbox.val();
        keyword = keyword.trim();
        if (keyword != "") {
            // Ẩn message lỗi premium khi bắt đầu search
            $("#premium-error").hide().html("");
            toggleClearQuery();
            currentTabType = "word";
            if (options) options.type = "word";
            search(keyword);
        }
    });

    // get options
    getOptions(function (data) {
        options = data;

        // Ẩn model selector mặc định
        hideModelSelector();

        if (langPack == null) {
            getLanguagePack(options.lang, function () {
                initLanguage();
                initTranslateModel();
            });
        } else {
            initLanguage();
            initTranslateModel();
        }
    });

    // Xử lý thay đổi model dịch
    $("#option-model-select").change(function () {
        var selected = $(this).val();
        var isPremiumSelected = selected === "nmt";

        var hasToken =
            window.maziiTokenId &&
            typeof window.maziiTokenId === "string" &&
            window.maziiTokenId.trim() !== "";

        // Prefer global premium flag if available
        var isPremiumAI = typeof window.isPremiumAI === "boolean" ? window.isPremiumAI : true;

        if (isPremiumSelected && (!hasToken || !isPremiumAI)) {
            // Hiển thị thông báo nâng cấp và revert về Google
            $("#premium-error").html(
                '<div class="premium-required">' + msgPremiumRequired() + '</div>'
            ).show();
            currentTranslateModel = "google";
            $(this).val("google");
            return;
        }
        
        // Ẩn message nếu không chọn premium hoặc đã có premium
        $("#premium-error").hide().html("");

        currentTranslateModel = selected;

        var currentQuery = searchTextbox.val().trim();
        if (currentQuery !== "") {
            search(currentQuery);
        }
    });

    var kanjiWriter = null;
    $("#show-draw-kanji").click(function () {
        if (isShowDrawingKaji == false) {
            $(".drawkanji-table").removeClass("mazii_hide");
            isShowDrawingKaji = true;
            if (kanjiWriter == null)
                kanjiWriter = new KanjiWriter({
                    canvasId: "draw-canvas",
                    colorDraw: "black",
                    lineWidthDraw: 4,
                    resultId: "#found_kanji",
                    clearButtonId: "#drawkanji-clear-button",
                    backButtonId: "#drawkanji-back-line-button",
                    classResult: "draw-kanji-suggest",
                    resultClickCallback: function () {
                        var k = $(this).text();
                        if (k != null && k != "") {
                            $("#drawkanji-clear-button").trigger("click");
                            var currentText = searchTextbox.val();
                            currentText += k;
                            searchTextbox.val(currentText);
                        }
                    },
                });
        } else {
            $(".drawkanji-table").addClass("mazii_hide");
            isShowDrawingKaji = false;
        }
    });

    $("#close_draw").click(function () {
        if (isShowDrawingKaji == true) {
            $(".drawkanji-table").addClass("mazii_hide");
            isShowDrawingKaji = false;
        }
    });

    $(".option-link").click(function () {
        openNewTab(chrome.runtime.getURL("option.html"));
    });
});

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

function syncAuthStatePopup(callback) {
    try {
        chrome.runtime.sendMessage({ request: 'getMaziiCookie' }, function(response) {
            var cookie = response && response.cookie ? response.cookie : null;
            var premiumDataRaw = response && response.premiumData ? response.premiumData : null;

            if (cookie && typeof cookie === 'string' && cookie.trim() !== '') {
                var decoded = decodeToken(cookie);
                window.maziiTokenId = decoded || cookie;
            } else {
                window.maziiTokenId = null;
            }

            var isPremium = false;
            if (premiumDataRaw) {
                try {
                    var premiumObj = JSON.parse(premiumDataRaw);
                    if (premiumObj && premiumObj.data === true && premiumObj.expiry && premiumObj.expiry > Date.now()) {
                        isPremium = true;
                    }
                } catch (_) {}
            }
            window.isPremiumAI = !!isPremium;
            if (callback) callback();
        });
    } catch (e) {
        window.maziiTokenId = null;
        window.isPremiumAI = false;
        if (callback) callback();
    }
}

function openNewTab(url) {
    chrome.tabs.create({
        url: url,
    });
}

// Hàm hiển thị model selector
function showModelSelector() {
    $("#option-model").show();
}

// Hàm ẩn model selector
function hideModelSelector() {
    $("#option-model").hide();
}

function registerEventClickResult() {
    $("#found_kanji a").click(function () {
        var k = $(this).text();
        if (k != null && k != "") {
            // append to search box
            var currentText = searchTextbox.val();
            currentText += k;
            searchTextbox.val(currentText);

            drawkanji.clearAll();
        }
    });
}
function printHTML(query, data, gg) {
    var markup = "";
    if (gg == null) {
        if (options.lang == "vi" && options.langFrom == "ja") {
            markup = printMaziiVi(getMatchResult(data, query));
            linkmore =
                "https://mazii.net/vi-VN/search/word/javi/" + query;
        } else if (
            (options.lang == "en" || options.lang == "en_US") &&
            options.langFrom == "ja"
        ) {
            markup = printMaziiVi(getMatchResult(data, query));
            linkmore =
                "https://mazii.net/en-US/search/word/jaen/" + query;
        } else if (data?.data?.words?.length > 0) {
            markup = printMaziiVi(getMatchResult(data, query));
            linkmore =
                `https://mazii.net/${options.lang}/search/word/${options.langFrom}${options.lang}/` + query;
        } else {
            markup = printGT(data, "");
        }
    } else {
        markup = printGT(data, "");
    }

    var activeKey = currentTabType === "ai" ? "ai" : (options.type === "kanji" ? "kanji" : "word");
    $("#result-search").html(buildTabBar(activeKey, shouldShowAITab(query)) + '<div id="popup-result-content">' + markup + '</div>');
    wirePopupTabs(query);

    // cach phat am
    const divs = document.querySelectorAll(".pronoun-button");
    divs.forEach((div) => {
        div.addEventListener("click", () => {
            var audioSource = div.getAttribute("data-audio") || div.getAttribute("src");
            playSoundByNative(audioSource);
        });
    });
    // Gắn nút lưu sổ tay theo từng từ (cạnh nút audio).
    bindSaveButtons();
    // Tab Kanji: mặc định chọn kanji đầu, chỉ hiện chi tiết kanji đang chọn.
    bindKanjiTabs();
}

// Gắn sự kiện cho thanh tab trong popup (dùng buildTabBar chung ở common.js)
function wirePopupTabs(query) {
    var itemWord = document.getElementById("item-word");
    var itemKanji = document.getElementById("item-kanji");
    var itemMeaning = document.getElementById("item-meaning");

    if (itemWord) itemWord.onclick = function () {
        currentTabType = "word";
        options.type = "word";
        search(query);
    };
    if (itemKanji) itemKanji.onclick = function () {
        currentTabType = "kanji";
        options.type = "kanji";
        search(query);
    };
    if (itemMeaning) itemMeaning.onclick = function () {
        currentTabType = "ai";
        if (itemWord) itemWord.classList.remove("item-active");
        if (itemKanji) itemKanji.classList.remove("item-active");
        itemMeaning.classList.add("item-active");
        hideModelSelector();
        renderAITab(query, document.getElementById("popup-result-content"));
    };
}

function search(query) {
    currentQuery = query;
    // Ẩn bảng viết tay khi bắt đầu tra cứu/dịch (nếu đang hiện).
    $(".drawkanji-table").addClass("mazii_hide");
    syncAuthStatePopup(function() {
    let urlData = getUrlQuery(query);
    if (!urlData.url) {
        // Hiển thị model selector khi sử dụng Google Translate fallback
        showModelSelector();
        let fallbackUrlData = getUrlQuery(query, true);
        requestXHTML(fallbackUrlData, function (data) {
            try {
                var parsedData = JSON.parse(data);
                printHTML(query, parsedData, true);
            } catch (e) {
                console.error('Error parsing JSON in popup:', e);
                $("#result-search").html('<div class="error-message">' + msgTranslateError() + '</div>');
            }
        });
        return;
    }

    chrome.runtime.sendMessage(
        {
            request: 'requestUrlPost',
            url: urlData.url,
            data: urlData.data
        },
        function (response) {
            var data = response.result;
            try {
                var parsedData = typeof data === 'string' ? JSON.parse(data) : data;
                if (parsedData.status != 200 || parsedData.data?.words?.length == 0) {
                    // Hiển thị model selector khi không có kết quả từ Mazii
                    showModelSelector();
                    if (currentTranslateModel === "nmt") {
                        // Kiểm tra token trước khi gọi API
                        if (
                            !window.maziiTokenId ||
                            typeof window.maziiTokenId !== "string" ||
                            window.maziiTokenId.trim() === ""
                        ) {
                            $("#result-search").html(
                                '<div class="premium-required">' + msgPremiumRequired() + '</div>'
                            );
                            return;
                        }

                        var ft = getTranslateFromTo(query);
                        var from = ft.from;
                        var to = ft.to;

                        Promise.all([
                            getGoogleTranslatePhonetic(query, from, to),
                            translateAI(query, from, to, currentTranslateModel),
                        ])
                            .then(function ([phoneticData, aiResponse]) {
                                if (aiResponse && aiResponse.data) {
                                    var aiData = aiResponse.data;

                                    var formattedData = {
                                        sentences: [
                                            [aiData.sourceText, aiData.translateText],
                                        ],
                                        paragraph: aiData.translateText,
                                        src_translit: phoneticData
                                            ? phoneticData.src_translit
                                            : null,
                                        translit: phoneticData
                                            ? phoneticData.translit
                                            : null,
                                        src: isJapanese(query) ? "ja" : "en",
                                    };

                                    printHTML(query, formattedData, true);
                                } else if (aiResponse && aiResponse.message) {
                                    $("#result-search").html(
                                        '<div class="premium-required">' +
                                            aiResponse.message +
                                            "</div>"
                                    );
                                } else {
                                    $("#result-search").html(
                                        '<div class="premium-required">' + msgPremiumRequired() + '</div>'
                                    );
                                }
                            })
                            .catch(function (error) {
                                console.error("Error in premium translation:", error);
                                $("#result-search").html(
                                    '<div class="error-message">' + msgTranslateError() + '</div>'
                                );
                            });
                    } else if (currentTranslateModel === "nmt1") {
                        // Mazii NMT (free, euplabs) — không cần đăng nhập.
                        var ft1 = getTranslateFromTo(query);
                        Promise.all([
                            getGoogleTranslatePhonetic(query, ft1.from, ft1.to),
                            translateNmt1(query),
                        ]).then(function ([phoneticData, translated]) {
                            if (translated) {
                                printHTML(query, makeGTFormatted(query, translated, phoneticData), true);
                            } else {
                                var fb = getUrlQuery(query, true);
                                requestXHTML(fb, function (d) {
                                    try { printHTML(query, JSON.parse(d), true); }
                                    catch (e) { $("#result-search").html('<div class="error-message">' + msgTranslateError() + '</div>'); }
                                });
                            }
                        }).catch(function () {
                            $("#result-search").html('<div class="error-message">' + msgTranslateError() + '</div>');
                        });
                    } else {
                        let fallbackUrlData = getUrlQuery(query, true);
                        requestXHTML(fallbackUrlData, function (data) {
                            try {
                                var parsedData = JSON.parse(data);
                                printHTML(query, parsedData, true);
                            } catch (e) {
                                console.error('Error parsing JSON in popup fallback:', e);
                                $("#result-search").html('<div class="error-message">' + msgTranslateError() + '</div>');
                            }
                        });
                    }
                } else {
                    // Ẩn model selector khi có kết quả từ Mazii
                    hideModelSelector();
                    printHTML(query, parsedData);
                }
            } catch (e) {
                $("#result-search").html('<div class="error-message">' + msgTranslateError() + '</div>');
            }
        }
    );
    });
}

function initTranslateModel() {
    chrome.tabs.query({ url: ["https://mazii.net/*"] }, function (tabs) {
        if (tabs.length > 0) {
            chrome.scripting
                .executeScript({
                    target: { tabId: tabs[0].id },
                    files: ["js/crypto-js.min.js"],
                })
                .then(function () {
                    chrome.scripting
                        .executeScript({
                            target: { tabId: tabs[0].id },
                            function: function () {
                                function getCookieValue(name) {
                                    var value = "; " + document.cookie;
                                    var parts = value.split("; " + name + "=");
                                    if (parts.length == 2)
                                        return parts.pop().split(";").shift();
                                    return null;
                                }

                                function decodeToken(encryptedToken) {
                                    if (!encryptedToken) return null;

                                    try {
                                        var _0xf336 = [
                                            "\x23\x24\x26\x41\x68\x63\x48\x6B\x67\x68\x40\x30\x67\x66\x6B\x21\x26\x31\x4C\x4B",
                                        ];
                                        var keyEncryption = _0xf336[0];

                                        // Sử dụng CryptoJS để decode
                                        if (typeof CryptoJS !== "undefined") {
                                            var key =
                                                CryptoJS.enc.Utf8.parse(
                                                    keyEncryption
                                                );
                                            var iv =
                                                CryptoJS.enc.Utf8.parse(
                                                    keyEncryption
                                                );
                                            var decrypted =
                                                CryptoJS.AES.decrypt(
                                                    encryptedToken,
                                                    key,
                                                    {
                                                        keySize: 128 / 8,
                                                        iv: iv,
                                                        mode: CryptoJS.mode.CBC,
                                                        padding:
                                                            CryptoJS.pad.Pkcs7,
                                                    }
                                                );
                                            var result = decrypted.toString(
                                                CryptoJS.enc.Utf8
                                            );
                                            if (
                                                result &&
                                                typeof result === "string" &&
                                                result.length > 0
                                            ) {
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

                                var rawTokenId = getCookieValue("token-id");
                                var decodedTokenId = decodeToken(rawTokenId);

                                return {
                                    premiumData:
                                        localStorage.getItem("premium-ai"),
                                    tokenId: decodedTokenId,
                                    rawTokenId: rawTokenId,
                                };
                            },
                        })
                        .then(function (results) {
                            var premiumData = null;
                            var tokenId = null;

                            if (results && results[0] && results[0].result) {
                                try {
                                    premiumData = results[0].result.premiumData
                                        ? JSON.parse(
                                              results[0].result.premiumData
                                          )
                                        : null;
                                    tokenId = results[0].result.tokenId;
                                    // Xử lý trường hợp tokenId là object hoặc Promise
                                    if (
                                        tokenId &&
                                        typeof tokenId === "object"
                                    ) {
                                        if (
                                            tokenId.then &&
                                            typeof tokenId.then === "function"
                                        ) {
                                            // Nếu là Promise (từ Web Crypto API)
                                            tokenId
                                                .then(function (decodedToken) {
                                                    window.maziiTokenId =
                                                        decodedToken;
                                                    updateTranslateModelOptions(
                                                        isPremium
                                                    );
                                                })
                                                .catch(function (error) {
                                                    window.maziiTokenId =
                                                        results[0].result.rawTokenId;
                                                    updateTranslateModelOptions(
                                                        isPremium
                                                    );
                                                });
                                            return;
                                        } else {
                                            // Nếu là object khác, convert to string
                                            tokenId = String(tokenId);
                                        }
                                    }

                                    if (
                                        tokenId &&
                                        typeof tokenId === "string"
                                    ) {
                                        window.maziiTokenId = tokenId;
                                    } else {
                                        window.maziiTokenId =
                                            results[0].result.rawTokenId;
                                    }
                                } catch (e) {
                                    window.maziiTokenId =
                                        results[0].result.rawTokenId;
                                }
                            }

                            var isPremium = false;
                            if (premiumData && premiumData.data === true) {
                                // Kiểm tra expiry
                                if (
                                    premiumData.expiry &&
                                    premiumData.expiry > Date.now()
                                ) {
                                    isPremium = true;
                                }
                            }

                            // Lưu tokenId để sử dụng cho API calls
                            window.maziiTokenId = tokenId;

                            updateTranslateModelOptions(isPremium);
                        })
                        .catch(function (error) {
                            updateTranslateModelOptions(false);
                        });
                })
                .catch(function (error) {
                    updateTranslateModelOptions(false);
                });
        } else {
            updateTranslateModelOptions(false);
        }
    });
}

// Hàm cập nhật các option trong dropdown
function updateTranslateModelOptions(isPremium) {
    // Lưu trạng thái premium để dùng khi người dùng chọn model
    window.isPremiumAI = !!isPremium;
}

function initLanguage() {
    $('#dict-search').attr('placeholder', getTextOf('search_box_suggest'));
    $('#show-draw-kanji').attr('title', getTextOf('pen_draw_tooltip'));
    $('#search-button').html(getTextOf('translate_button'));
    $('.m-tip').html(getTextOf('tip'));
    $('#close_draw').attr('alt', getTextOf('close_kanji_board'));
    $('#drawkanji-clear-button').attr('value', getTextOf('draw_kanji_erase_all'));
    $('#drawkanji-back-line-button').attr('value', getTextOf('draw_kanji_erase_last_stroke'));
    $('.option-text').html(getTextOf('option'));
    $('.click-rate').html(getTextOf('rate'));
    $('.click-share').html(getTextOf('share'));
    $('.text-empty').html(getTextOf('textEmpty'));
    $('.link-more').html(getTextOf('textDetail'));
    $('.click-Delete').html(getTextOf('deleteText'));
    $('#click-guide').html(getTextOf('guideText'));
}
