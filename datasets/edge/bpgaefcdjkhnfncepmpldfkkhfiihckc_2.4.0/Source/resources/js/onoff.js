var timeout = 0, check_for_light = 0;

function checkForLight() {
    if (document.documentElement.hasAttribute('is_light_on')) {
        if (document.documentElement.getAttribute('is_light_on') === 'true') {
            timeout++;
            if (document.querySelector('#off_light')) {
                if ((timeout >= 50) && (document.querySelector('.playing-mode')) && (off_light.className == 'off_light_inactive')) {
                    off_light.className = 'off_light_active';
                    movie_player.classList.add("movie_player_ontop");
                } else if ((off_light.className == 'off_light_active') && (timeout < 50)) {
                    off_light.className = 'off_light_inactive';
                    movie_player.classList.remove("movie_player_ontop");
                }
            }
        }
    }
    setTimeout(checkForLight, 100);
}

function onOffLight() {
    chrome.storage.local.get('onoff_light', function (e) {
        if (e.onoff_light) {
            document.documentElement.setAttribute('is_light_on', true);
        } else {
            document.documentElement.setAttribute('is_light_on', false);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    createOffLightOverlay();
    permanentOnOff();
    checkForLight();
    onOffLight();
});

document.onmousemove = function () {
    timeout = 0;
};

if (document.readyState === "complete") {
    off_light.className = 'off_light_inactive';
    createOffLightOverlay();
    permanentOnOff();
    onOffLight();
}



function createOffLightOverlay() {
    if (!document.querySelector('#off_light')) {
        div_onoff = document.createElement('div');
        div_onoff.id = 'off_light';
        div_onoff.style.position = 'fixed';
        div_onoff.className = 'off_light_inactive';
        div_onoff.style.height = '100%';
        div_onoff.style.width = '100%';
        div_onoff.style.zIndex = '1';
        div_onoff.style.top = 0;
        div_onoff.style.left = 0;
        div_onoff.style.background = '#000000db';
        if (document.querySelector('#movie_player')) {
            movie_player.appendChild(div_onoff);
            movie_player.zIndex = '2023';
        }
    }
}


function permanentOnOff() {
    if (!document.querySelector('body'))
        return;
    if (document.querySelector('#on_off_style') !== null)
        document.querySelector('#on_off_style').remove();
    style = document.createElement('style');
    style.innerHTML = on_off_style;
    style.id = 'on_off_style';
    document.body.appendChild(style);
}

//
//
//
//onOffLight();