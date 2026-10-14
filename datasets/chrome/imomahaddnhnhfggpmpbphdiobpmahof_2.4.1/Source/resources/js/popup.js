var skins_db = '';
var skin_all = {};
var current_skin = {};

alwayshd_help.addEventListener('mouseover', function handleMouseOver() {
    document.querySelector('.alwayshd_help').style.display = 'block';
});

alwayshd_help.addEventListener('mouseout', function handleMouseOut() {
    document.querySelector('.alwayshd_help').style.display = 'none';
});

optimizevolume_help.addEventListener('mouseover', function handleMouseOver() {
    document.querySelector('.optimizevolume_help').style.display = 'block';
});

optimizevolume_help.addEventListener('mouseout', function handleMouseOut() {
    document.querySelector('.optimizevolume_help').style.display = 'none';
});

theatre_help.addEventListener('mouseover', function handleMouseOver() {
    document.querySelector('.theatre_help').style.display = 'block';
});

theatre_help.addEventListener('mouseout', function handleMouseOut() {
    document.querySelector('.theatre_help').style.display = 'none';
});

progressbar_help.addEventListener('mouseover', function handleMouseOver() {
    document.querySelector('.progressbar_help').style.display = 'block';
});

progressbar_help.addEventListener('mouseout', function handleMouseOut() {
    document.querySelector('.progressbar_help').style.display = 'none';
});


adskip_help.addEventListener('mouseover', function handleMouseOver() {
    document.querySelector('.adskip_help').style.display = 'block';
});

adskip_help.addEventListener('mouseout', function handleMouseOut() {
    document.querySelector('.adskip_help').style.display = 'none';
});


onoff_help.addEventListener('mouseover', function handleMouseOver() {
    document.querySelector('.onoff_help').style.display = 'block';
});

onoff_help.addEventListener('mouseout', function handleMouseOut() {
    document.querySelector('.onoff_help').style.display = 'none';
});






function hideFav() {
    if (!document.querySelector('#favorites_list').querySelector('.skin-container-in')) {
        document.querySelector('#favorites_list').style.display = 'none';
    } else {
        document.querySelector('#favorites_list').style.display = 'flex';
    }
}

function sendMessageToWeb() {
    chrome.runtime.sendMessage({update_tab: "update"},
            function (response) { });
}

function sendMessageToWebPreloadSkins() {
    chrome.runtime.sendMessage({update_tab: "preloadskins"},
            function (response) { });
}

function sendMessageToWebBoostVolume() {
    chrome.runtime.sendMessage({update_tab: "boostvolume"},
            function (response) { });
}

function sendMessageToWebAlwaysHD() {
    chrome.runtime.sendMessage({update_tab: "alwayshd"},
            function (response) { });
}


function sendMessageToWebOnOff() {
    chrome.runtime.sendMessage({update_tab: "onoff"},
            function (response) { });
}

function show_skins() {
    chrome.storage.local.get('skins', function (e) {
        if ((e.skins == undefined) || (e.skins.length < 1)) {
            no_skins.style.display = 'flex';
            skins_container.style.display = 'none';
            loader.style.display = 'none';
            return;
        }
        no_skins.style.display = 'none';

        skins_container.style.display = 'flex';

        for (var key in e.skins) {
            favorite_class = "favorite";
            if (e.skins[key].favorite == 1) {
                favorite_class = "favorite-s";
                favorites_list.style.display = 'flex';
            } else {
                favorite_class = "favorite";
            }
            skin = e.skins[key];
            skin_div = document.createElement('div');
            skin_div.className = "skin-container-in";
            skin_div.id = `skin_container_in_${skin.id}`;

            disabled = '';

            if (current_skin.id == skin.id) {
                disabled = 'disable';
                skin_div.classList.add('active-skin');
            }

            skin_div.innerHTML += `
            <div class="skin-div">
                <div class="${favorite_class}" id="favorite" data-key=${key} data-id=${skin.id}></div>
                <img data-app="apply" data-id=${skin.id} src="https://youtube-skins.com${skin.thumb}"/>
                <div class="skin-action">
                    <div data-app="apply" data-id=${skin.id} class="skin-name">${skin.name}</div>
                    <div class="skin-buttons">
                        <div class="skin-delete" id="delete" >
                            <img id="delete" data-id=${skin.id} class="svg-icon" src="/resources/images/delete_button.svg">
                        </div>
                        <div class="skin-share" id="share" >
                            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://youtube-skins.com/skins/${skin.alt_name}-${skin.id}.html">
                                <img id="share" class="svg-icon" data-url="https://youtube-skins.com/skins/${skin.alt_name}-${skin.id}.html" src="/resources/images/share_button.svg">
                            </a>
                        </div>
                        <div data-app="apply" data-id=${skin.id} id="apply" class="hvr-shutter-out-horizontal-g skin-apply ${disabled}">✔ APPLY</div>
                    </div>
                </div>
            </div>

`;

            clone = skin_div.cloneNode(true);
            if (e.skins[key].favorite !== undefined)
                if (e.skins[key].favorite == 1) {
                    clone.id = `fav_${skin.id}`;
                    favorites_list.appendChild(clone);
                }
            skins_list.appendChild(skin_div);
        }
        loader.style.display = 'none';
    });
}




wrapper = document.getElementById('skins_container');

wrapper.addEventListener('click', (event) => {

    skin_id = event.target.dataset.id;
    skin_node = document.querySelector('#skin_container_in_' + skin_id);
    fav_node = document.querySelector('#fav_' + skin_id);

    isDelete = event.target.id === 'delete';
    isShare = event.target.id === 'share';
    isFavorite = event.target.id === 'favorite';

    isApply = event.target.dataset.hasOwnProperty('app');

    if (isApply) {
        chrome.storage.local.get('skins', function (e) {
            for (var key in e.skins) {
                if (e.skins[key].id == skin_id) {
                    current_skin = e.skins[key];
                    chrome.storage.local.set({
                        current_skin: e.skins[key]
                    });
                    sendMessageToWeb();
                    all_buttons = document.querySelectorAll('.hvr-shutter-out-horizontal-g');
                    all_buttons.forEach(function (e) {
                        if (e.classList.contains('disable'))
                            e.classList.remove('disable');
                    });


                    all_buttons = document.querySelectorAll('.skin-container-in');
                    all_buttons.forEach(function (e) {
                        if (e.classList.contains('active-skin'))
                            e.classList.remove('active-skin');
                    });

                    skin_node.querySelector('.hvr-shutter-out-horizontal-g').classList.add('disable');
                    skin_node.classList.add('active-skin');
                    if (document.querySelector('#fav_' + skin_id) !== null) {
                        fav_node.querySelector('.hvr-shutter-out-horizontal-g').classList.add('disable');
                        fav_node.classList.add('active-skin');
                    }
                }
            }
        })


    }


    if (isFavorite) {
        chrome.storage.local.get('skins', function (e) {
            skins = e.skins;
            for (i = 0; i < skins.length; i++) {
                if (skins[i].id == skin_id) {
                    if (skins[i].favorite == 1) {
                        skins[i].favorite = 0
                        if (document.querySelector('#fav_' + event.target.dataset.id)) {
                            document.querySelector('#fav_' + event.target.dataset.id).remove();
                            document.querySelector('#skin_container_in_' + event.target.dataset.id + ' #favorite').classList.toggle('favorite');
                            document.querySelector('#skin_container_in_' + event.target.dataset.id + ' #favorite').classList.toggle('favorite-s');
                        }
                    } else {
                        document.querySelector('#skin_container_in_' + event.target.dataset.id + ' #favorite').classList.toggle('favorite');
                        document.querySelector('#skin_container_in_' + event.target.dataset.id + ' #favorite').classList.toggle('favorite-s');
                        clone = document.querySelector('#skin_container_in_' + event.target.dataset.id).cloneNode(true);
                        clone.id = 'fav_' + event.target.dataset.id;
                        favorites_list.appendChild(clone);
                        skins[i].favorite = 1;
                    }
                }
            }

            hideFav();

            chrome.storage.local.set({
                skins: skins
            });
        });
    }

    if (isDelete) {

        var skins = '';
        chrome.storage.local.get('skins', function (e) {
            skins = e.skins;

            for (i = 0; i < skins.length; i++) {
                if (skins[i].id == skin_id) {
                    skins.splice(i, 1);
                }
            }

            if ((e.skins == undefined) || (e.skins.length < 1)) {
                no_skins.style.display = 'flex';
                skins_container.style.display = 'none';
            }

            document.querySelector('#skin_container_in_' + event.target.dataset.id).remove();
            if (document.querySelector('#fav_' + event.target.dataset.id) !== null)
                document.querySelector('#fav_' + event.target.dataset.id).remove();
            hideFav();

            chrome.storage.local.set({
                skins: skins
            }, function () {
                sendMessageToWeb();
            });

            chrome.storage.local.get('current_skin', function (es) {
                if (es.current_skin == undefined) {
                    sendMessageToWeb();
                    return;
                }
                if (es.current_skin.id == event.target.dataset.id) {
                    chrome.storage.local.remove(["current_skin"], function () {
                        current_skin = undefined;
                        sendMessageToWeb();
                    });


                }
            });

        });

    }

});



onoff.onchange = function () {
    if (!onoff.checked) {
        skins_container.classList.add("onoff");
        chrome.storage.local.set({
            isOn: false
        });
    } else {
        skins_container.classList.remove("onoff");
        chrome.storage.local.set({
            isOn: true
        });
    }

    sendMessageToWeb();
}

boostvolume.onchange = function () {
    if (!boostvolume.checked) {
        chrome.storage.local.set({boostvolume: false});
    } else {
        chrome.storage.local.set({boostvolume: true});
    }
    sendMessageToWebBoostVolume();
}


alwayshd.onchange = function () {
    if (!alwayshd.checked) {
        chrome.storage.local.set({alwayshd: false});
    } else {
        chrome.storage.local.set({alwayshd: true});
    }
    sendMessageToWebAlwaysHD();
}




onoff_progress_bar.onchange = function () {
    if (!onoff_progress_bar.checked) {
        chrome.storage.local.set({
            isPermanentProgressBar: false
        });
    } else {
        chrome.storage.local.set({
            isPermanentProgressBar: true
        });
    }

    sendMessageToWeb();
};

onoff_light.onchange = function () {
    if (!onoff_light.checked) {
        chrome.storage.local.set({
            onoff_light: false
        });
    } else {
        chrome.storage.local.set({
            onoff_light: true
        });
    }

    sendMessageToWebOnOff();
};

hideads.onchange = function () {
    if (!hideads.checked) {
        chrome.storage.local.set({
            hideads: false
        });
    } else {
        chrome.storage.local.set({
            hideads: true
        });
    }

    sendMessageToWeb();
};


chrome.storage.local.get('isOn', function (e) {
    onoff.checked = e.isOn;
    if (!onoff.checked)
        skins_container.classList.add("onoff");
    else
        skins_container.classList.remove("onoff");
});

chrome.storage.local.get('boostvolume', function (e) {
    boostvolume.checked = e.boostvolume;
});

chrome.storage.local.get('alwayshd', function (e) {
    alwayshd.checked = e.alwayshd;
});

chrome.storage.local.get('isPermanentProgressBar', function (e) {
    onoff_progress_bar.checked = e.isPermanentProgressBar;
});

chrome.storage.local.get('onoff_light', function (e) {
    onoff_light.checked = e.onoff_light;
});


chrome.storage.local.get('hideads', function (e) {
    hideads.checked = e.hideads;
});



rate_us.onclick = function () {
    window.open('https://chrome.google.com/webstore/detail/imomahaddnhnhfggpmpbphdiobpmahof/reviews');
}

logo.onclick = function () {
    window.open('https://youtube-skins.com');
}


chrome.storage.local.get('current_skin', function (e) {
    if (!e.current_skin) {
        return;
    }
    current_skin = e.current_skin;
});

sendMessageToWebPreloadSkins();

setTimeout(function () {
    show_skins();    
}, 200);



