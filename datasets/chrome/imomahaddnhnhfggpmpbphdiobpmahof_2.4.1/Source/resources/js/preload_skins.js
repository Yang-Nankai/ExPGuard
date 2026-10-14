var arr_of_imgs, preloaded_skins_array = [];
var img_for_preload = new Image();
if (localStorage.getItem('preloaded_skins') !== null) {
    preloaded_skins_array = JSON.parse(localStorage.getItem('preloaded_skins'));
}

function imgLoaded() {
    if (arr_of_imgs.length > 0) {
        img_for_preload.src = arr_of_imgs.shift();
        preloaded_skins_array.push(img_for_preload.src);
        localStorage.setItem('preloaded_skins', JSON.stringify(preloaded_skins_array));        
    }
}

function startPreload(arr) {
    arr_of_imgs = arr;
    img_for_preload.src = arr_of_imgs.shift();
    img_for_preload.onload = imgLoaded;
}

function needToReload() {
    day = new Date().getDate();
    if (localStorage.getItem('preloaded_day') !== null) {
        preloaded_day = localStorage.getItem('preloaded_day');
    } else {
        preloaded_day = day;
        localStorage.setItem('preloaded_day', day);
    }

    if (preloaded_day != day) {
        if (localStorage.getItem('preloaded_skins') !== null) {
            localStorage.setItem('preloaded_skins', JSON.stringify([]));
            preloaded_skins_array = [];
            localStorage.setItem('preloaded_day', day);
        }
    }
    getSkinsFilesAndPreload();
}

function getSkinsFilesAndPreload(preload) {
    chrome.storage.local.get('skins', function (e) {
        skin_files = [];
        if ((e.skins == undefined) || (e.skins.length < 1)) {
            return;
        }
        for (var key in e.skins) {
            tmp_array = JSON.parse(e.skins[key].files);
            for (var key_tmp in tmp_array) {
                if ((tmp_array[key_tmp].indexOf('screenshot_file') < 1) &&
                        (tmp_array[key_tmp].indexOf('themes_pic_file') < 1) &&
                        (!preloaded_skins_array.includes('https://youtube-skins.com' + tmp_array[key_tmp]))) {
                    skin_files.push('https://youtube-skins.com' + tmp_array[key_tmp]);
                }
            }
        }
        startPreload(skin_files);
    });
}

if (document.readyState === "complete" || document.readyState === "loaded") {
    if (location.href.indexOf('youtube') > 0) {
        needToReload();
    }
}

    