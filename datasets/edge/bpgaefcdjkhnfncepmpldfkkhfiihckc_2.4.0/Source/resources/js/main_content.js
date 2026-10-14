style = document.createElement('style');
style.innerHTML = style_template;
style.id = 'player_skin';
src = '';

function restoreDeafult() {
    try {
        if (document.querySelector('.ytp-fullscreen-button.ytp-button svg')) {
            document.querySelector('.ytp-fullscreen-button.ytp-button svg').style.opacity = 1;
            if (document.querySelector('#left_bottom') !== null) {
                left_bottom.style.opacity = 0;
                left_bottom.style.display = 'none';
            }
            if (document.querySelector('#left_top') !== null) {
                left_top.style.opacity = 0;
                left_top.style.display = 'none';
            }
            if (document.querySelector('#right_bottom') !== null) {
                right_bottom.style.opacity = 0;
                right_bottom.style.display = 'none';
            }
            if (document.querySelector('#right_top') !== null) {
                right_top.style.opacity = 0;
                right_top.style.display = 'none';
            }
        }
    } catch (e) {
        console.log(e);
    }

}


function hideElements() {
    try {
        if (document.querySelector('#left_bottom') !== null) {
            left_bottom.style.opacity = 1;
            left_bottom.style.display = '';
        }
        if (document.querySelector('#left_top') !== null) {
            left_top.style.opacity = 1;
            left_top.style.display = '';
        }
        if (document.querySelector('#right_bottom') !== null) {
            right_bottom.style.opacity = 1;
            right_bottom.style.display = '';
        }
        if (document.querySelector('#right_top') !== null) {
            right_top.style.opacity = 1;
            right_top.style.display = '';
        }
    } catch (e) {
        console.log(e);
    }
}

function createImages() {
    if (!isOn)
        return;

    if (document.querySelector('#pgress_bar_ext') !== null)
        document.querySelector('#pgress_bar_ext').remove();

    try {
        if (document.querySelector('.html5-video-player') === null)
            return;
        if (document.querySelector('#left_bottom') === null) {
            div = document.createElement('div');
            div.id = 'left_bottom';
            div.className = 'ytp-autohide ytp-chrome-controls autohide corners';
            document.querySelector('.html5-video-player').appendChild(div);
        }
        if (document.querySelector('#left_top') === null) {
            div = document.createElement('div');
            div.id = 'left_top';
            div.className = 'ytp-autohide ytp-chrome-controls autohide corners';
            document.querySelector('.html5-video-player').appendChild(div);
        }
        if (document.querySelector('#right_bottom') === null) {
            div = document.createElement('div');
            div.id = 'right_bottom';
            div.className = 'ytp-autohide ytp-chrome-controls autohide corners';
            document.querySelector('.html5-video-player').appendChild(div);
        }
        if (document.querySelector('#right_top') === null) {
            div = document.createElement('div');
            div.id = 'right_top';
            div.className = 'ytp-autohide ytp-chrome-controls autohide corners';
            document.querySelector('.html5-video-player').appendChild(div);
        }

//        if (document.querySelector('#volumeboost_info') === null) {
//            div = document.createElement('div');
//            div.id = 'volumeboost_info';
//            document.querySelector('.html5-video-player').appendChild(div);
//        }        

    } catch (e) {
        console.log(e);
    }

}




function setDefaultVolumeIcon(target) {
//    if (document.querySelector('.ytp-volume-panel')) return;
    //if (document.querySelector('.ytp-volume-panel').hasAttribute('aria-valuenow')) return;
    volume = (document.querySelector('.ytp-volume-panel').hasAttribute('aria-valuenow')) ? document.querySelector('.ytp-volume-panel').ariaValueNow : 0;
    volume_btn = document.querySelector('.ytp-mute-button.ytp-button');
    volume_btn_svg = volume_btn.querySelectorAll('svg')[0];
    if (target.muted) {
        if (!volume_btn_svg.classList.contains('mute-btn')) {
            volume_btn_svg.classList = '';
            volume_btn_svg.classList.toggle('mute-btn');
        }
        return;
    } else if ((volume > 50) && (!target.muted)) {
        if (!volume_btn_svg.classList.contains('mute-full-btn')) {
            volume_btn_svg.classList = '';
            volume_btn_svg.classList.toggle('mute-full-btn');
        }
    } else if ((volume <= 50) && (!target.muted)) {
        if (!volume_btn_svg.classList.contains('mute-middle-btn')) {
            volume_btn_svg.classList = '';
            volume_btn_svg.classList.toggle('mute-middle-btn');
        }
    }
}

function youtubeVolumeChanged(e) {
    if (!isOn)
        return;
    setDefaultVolumeIcon(e.target);
}

function isPermanentProgressBar() {
    chrome.storage.local.get('isPermanentProgressBar', function (e) {
        if (e.isPermanentProgressBar) {
            permanentProgressBar();
            if (document.querySelector('.ytp-scrubber-container'))
                document.querySelector('.ytp-scrubber-container').className = 'ytp-scrubber-container ytp-autohide ytp-chrome-controls';
        } else {
            if (document.querySelector('.ytp-scrubber-container'))
                document.querySelector('.ytp-scrubber-container').className = 'ytp-scrubber-container';
            if (document.querySelector('#progress_bar') !== null)
                document.querySelector('#progress_bar').remove();
        }
    });
}

function isHideAds() {
    chrome.storage.local.get('hideads', function (e) {
        if (e.hideads) {
            document.documentElement.setAttribute('hideads', true);
        } else {
            document.documentElement.setAttribute('hideads', false);
        }
    });
}

isHideAds();
isPermanentProgressBar();


if (!observer) {
    var observer = new MutationObserver((mutations, observer) => {
        for (let mutation of mutations) {
            if (mutation.target.tagName === 'VIDEO') {
                if (src != location.href) {
                    if (document.getElementsByTagName('video')[0].dataset.hasOwnProperty('originalVolume'))
                        document.getElementsByTagName('video')[0].removeAttribute('data-original-volume');
                    if (document.getElementsByTagName('video')[0].hasAttribute('data-noboost'))
                        document.getElementsByTagName('video')[0].removeAttribute('data-noboost');
                    src = location.href;
                }
                if (mutation.target.getAttribute('listener') !== 'true') {
                    mutation.target.setAttribute('listener', 'true');

                    isPermanentProgressBar();
                    isHideAds();


                    mutation.target.addEventListener("volumechange", youtubeVolumeChanged);

                    mutation.target.addEventListener('timeupdate', function (e) {
                        checkVolumeBooster(mutation.target);
                        if (!document.querySelector('.ytp-time-display.notranslate.ytp-live')) {
                            if (document.querySelectorAll('#contents .style-scope.ytd-macro-markers-list-renderer'))
                                charapters = document.querySelectorAll('#contents .style-scope.ytd-macro-markers-list-renderer');
                            prcnt = this.currentTime / this.duration;
                            if (charapters.length < 1) {
                                if (document.querySelector('.ytp-play-progress.ytp-swatch-background-color'))
                                    document.querySelector('.ytp-play-progress.ytp-swatch-background-color').style.transform = 'scaleX(' + prcnt + ')';
                                bf = this.buffered;
                                time = this.currentTime;
                                if (bf.length > 0) {
                                    for (i = 0; i < bf.length; i++) {
                                        if (bf.start(i) <= time && bf.end(i) >= time) {
                                            loadedTotal = bf.end(i) / this.duration;
                                            document.querySelector('.ytp-load-progress').style.transform = 'scaleX(' + loadedTotal + ')';
                                        }
                                    }
                                }
                            } else {
                                videoprcnt = (this.currentTime / this.duration) * 100;                          // % of video played
                                charapters = document.querySelector('.ytp-chapters-container').children;
                                totalWidth = 0;
                                for (i = 0; i < charapters.length; i++) {
                                    totalWidth += charapters[i].clientWidth;        // Total width of played area
                                }
                                drawPrcnt = (videoprcnt / 100) * totalWidth;        // Playing area was draw now

                                characterStart = 0;
                                for (i = 0; i < charapters.length; i++) {
                                    characterStart += charapters[i].clientWidth;    // Begining in px of the current character
                                    if (characterStart >= drawPrcnt) {
                                        characterStart -= charapters[i].clientWidth;
                                        charapterEnd = characterStart + charapters[i].clientWidth; // End in px of the current character
                                        currentBarWidthPositionPx = drawPrcnt - characterStart;    // Playing area in current character was draw now
                                        precentDrawedOnCurrentCh = currentBarWidthPositionPx / charapters[i].clientWidth; // % was draw on current character
                                        charapters[i].querySelector('.ytp-play-progress.ytp-swatch-background-color').style.transform = 'scaleX(' + precentDrawedOnCurrentCh + ')';
                                        break;
                                    } else {

                                        charapters[i].querySelector('.ytp-play-progress.ytp-swatch-background-color').style.transform = 'scaleX(1)';
                                    }
                                }
                            }
                        }



                        // console.log(vid[0].currentTime + ' / ' +vid[0].buffered.start(1)+' / '+vid[0].buffered.end(1));
                        // надо найти текущее время между старт и енд во всех фреймах и потом отрисовать
                    });


                    setDefaultVolumeIcon(mutation.target);
                    createImages();
                }
            }

            if (mutation.target.id === 'movie_player') {
                if (mutation.target.getAttribute('listener') !== 'true') {
                    mutation.target.setAttribute('listener', 'true');
                }
            }

            if (mutation.target.className === 'ytp-volume-slider-handle') {
                vid = document.getElementsByTagName('VIDEO')[0];
                setDefaultVolumeIcon(vid);
            }

            if (mutation.target.className === 'ytp-mute-button ytp-button') {
                vid = document.getElementsByTagName('VIDEO')[0];
                setDefaultVolumeIcon(vid);
                createImages();
            }
        }
    });
    observer.observe(document, {
        subtree: true,
        attributes: true
    });
}