$(document).ready(function(){
    // comment-google-analytics
    // ga('create', 'UA-47792030-2', 'mazii-chrome');
    // ga('send', 'pageview', location.pathname);

    // Năm bản quyền theo năm hiện tại.
    var _yr = document.getElementById("year");
    if (_yr) _yr.textContent = new Date().getFullYear();

    // get options
    getOptions(function(data) {
        options = data;
        fixOptionUpdate();
        if(document.getElementById("popup-dblclick-checkbox")) {
            document.getElementById("popup-dblclick-checkbox").checked = options.doubleClickEnable;
        }
        if(document.getElementById("popup-select-checkbox")) {
            document.getElementById("popup-select-checkbox").checked = options.selectTextEnable;
        }
        if(document.getElementById("dbclick-enable-checkbox")) {
            document.getElementById("dbclick-enable-checkbox").checked = options.shortKeyEnableDbclick;
        }
        
        $('#popup-dblclick-key').val(options.doubleCickTriggerKey);
        $('#popup-select-key').val(options.selectTriggerKey);
        
        // set language
        $("#language-selector").val(options.lang);

        if(document.getElementById("check-tab-mazii")) {
            document.getElementById("check-tab-mazii").checked = options.checkTabMazii;
        }
        if(document.getElementById("check-save-mazii")) {
            document.getElementById("check-save-mazii").checked = options.checkSaveMazii;
        }

        if (langPack == null) {
            getLanguagePack(options.lang, function() {
                initLanguage();
            });
        } else {
            initLanguage();
        }
    });

    $("#popup-enable-checkbox").click(function() {
        // check status
        var state = document.getElementById("popup-enable-checkbox").checked;
        if (state == options.enabled) {
            return;
        }

        options.enabled = state;
        saveOptions(options);
        
        if (options.enabled == true) {
            chrome.action.setIcon({path: 'images/19.png'}, function(){});
        } else {
            chrome.action.setIcon({path: 'images/19_off.png'}, function(){});
        }

        // comment-google-analytics
        // ga('send', 'event', 'option', 'tr-enable', options.enabled);
    });
    
    
    $('#popup-dblclick-checkbox').click(function() {
        // check status
        var state = document.getElementById("popup-dblclick-checkbox").checked;
        if (state == options.doubleClickEnable) {
            return;
        }

        options.showOption = true;
        options.doubleClickEnable = state;
        saveOptions(options);
    
        // comment-google-analytics
        // ga('send', 'event', 'option', 'double-click-enable', options.enabled);
    
    });
    
    $('#popup-select-checkbox').click(function() {
        // check status
        var state = document.getElementById("popup-select-checkbox").checked;
        if (state == options.selectTextEnable) {
            return;
        }

        options.selectTextEnable = state;
        saveOptions(options);
        
        // comment-google-analytics
        // ga('send', 'event', 'option', 'select-enable', options.enabled);
    
    });
    
    
    $('#language-selector').on('change', function (e) {
        var value = $("#language-selector").val();
        options.lang = value;
        saveOptions(options);

        // reload UI
        getLanguagePackFromFile(options.lang, function() {
                initLanguage();
        });

        // comment-google-analytics
        // ga('send', 'event', 'option', 'lang', value);
    });

    
    $('#popup-dblclick-key').on('change', function (e) {
        var value = $("#popup-dblclick-key").val();
        options.doubleCickTriggerKey = value;
        saveOptions(options);
        // comment-google-analytics
        // ga('send', 'event', 'option', 'dbClickTriggerKey', value);
    });
    
    $('#popup-select-key').on('change', function (e) {
        var value = $("#popup-select-key").val();
        options.selectTriggerKey = value;
        saveOptions(options);

        // comment-google-analytics
        // ga('send', 'event', 'option', 'selectTriggerKey', value);
    });

    $('#dbclick-enable-checkbox').click(function() {
        var value = document.getElementById("dbclick-enable-checkbox").checked;
        options.shortKeyEnableDbclick = value;
        saveOptions(options);

        // comment-google-analytics
        // ga('send', 'event', 'option', 'shortKeyEnableDbClick', value);
    });

    $('#check-tab-mazii').click(function(){
        var value = document.getElementById("check-tab-mazii").checked;
        options.checkTabMazii = value;
        saveOptions(options);

    });

    $('#check-save-mazii').click(function(){
        var value = document.getElementById("check-save-mazii").checked;
        options.checkSaveMazii = value;
        saveOptions(options);

    });
    

});
                  
function fixOptionUpdate() {
    if (options.enabled == null) {
        options.enabled = true;
    }
    
    if (options.doubleClickEnable == null) {
        options.doubleCickTriggerKey = 'none';
        options.doubleClickEnable = true;
    }
    
    if (options.selectTextEnable == null) {
        options.selectTextEnable = true;
        options.selectTriggerKey = 'alt';
    }

    if (options.shortKeyEnableDbclick == null) {
        options.shortKeyEnableDbclick = true;    
    }
    
    if (options.langFrom == null) {
        options.langFrom = 'ja';
    }
    
    saveOptions(options);
}



function initLanguage() {
    $('#title-div').html(getTextOf('option_title'));
    $('#option-translate-to').html(getTextOf('translate_to'));
    $('#popup-define').html(getTextOf('popup_define'));
    $('#label_dclick').html(getTextOf('enable_translate_double_click'));
    $('#popup-dblclick-text').html(getTextOf('trigger_key'));
    $('#label-select-text').html(getTextOf('enable_select_text'));
    $('#popup-select-text').html(getTextOf('trigger_key'));
    $('#label-dbclick-enable-text').html(getTextOf('enable_short_key_dbclick'));
    // $('#new-tab').html(getTextOf('select_new_tab'));
    $('#check-tab-text').html(getTextOf('checkTabText'));
    $('#check-save-text').html(getTextOf('checkSaveText'));


    
}