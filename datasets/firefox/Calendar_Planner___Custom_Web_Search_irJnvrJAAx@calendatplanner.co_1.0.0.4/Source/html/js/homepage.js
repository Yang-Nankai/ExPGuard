var CONSTANTS = function () {
    return {
        DEFAULT_SEARCH_URL: "https://search.yahoo.com/search?p="
    }
};

var OTHERDimenesions = function () {
    return {
        searchComp: "searchComp"
    };
};

var HTMLUtil = function () {
    return {
        addEventListener: function (ele, event, fn) {
            ele.addEventListener(event, fn);
        },

        documentOnLoad: function (fn) {
            this.addEventListener(document, "DOMContentLoaded", fn);
        }
    }
};

const HtmlUtil = HTMLUtil();
const Constants = CONSTANTS();
const OtherDimensions = OTHERDimenesions();
const SEARCH_FORM_CLASS = ".search-form";
const SEARCH_TEXT_CLASS = ".search-text";
const SEARCH_BTN_CLASS = ".submit-btn";


function escapeHtml(text) {
    text = "" + (text || "");
    return text.replace(/[\"&\/<>]/g, function (a) {
        return {
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;', '<': '&lt;', '>': '&gt;'
        }[a];
    });
}

function search(searchBox) {
    var searchTerm = searchBox.val().trim();
    if (!searchTerm) return;
    var search = Constants.DEFAULT_SEARCH_URL + searchTerm;
    if (typeof specificConstants !== 'undefined' && !!specificConstants[OtherDimensions.searchComp]) {
        search = specificConstants[OtherDimensions.searchComp] + searchTerm;
    }
    window.location.href = search;
}

(function () {
    HtmlUtil.documentOnLoad(function () {
        const searchBox = $(SEARCH_TEXT_CLASS);
        const searchForm = $(SEARCH_FORM_CLASS);
        const searchBtn = $(SEARCH_BTN_CLASS);
        searchBox.each(function (index) {
            var searchBoxElement = $(searchBox[index]);
            searchBoxElement.on('keypress', function (event) {
                if (event.which === 13) {
                    event.preventDefault();
                    search(searchBoxElement);
                }
            });
            searchBoxElement.focus();
        });

        searchForm.each(function (index) {
            var searchFormElement = $(searchForm[index]);
            var searchBtnElement = searchFormElement.find(SEARCH_BTN_CLASS);
            var searchBoxElement = searchFormElement.find(SEARCH_TEXT_CLASS);
            searchBtnElement.on('click', function (e) {
                e.preventDefault();
                search(searchBoxElement);
            });
        });

    });
})();
