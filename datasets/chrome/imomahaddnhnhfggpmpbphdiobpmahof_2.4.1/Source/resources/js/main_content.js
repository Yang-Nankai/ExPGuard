// Ініціалізація змінних
var src = '';
var _mainContentObserver = null; // Зберігаємо reference на observer для cleanup

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

// Оптимізований MutationObserver - спостерігаємо тільки за плеєром
function initPlayerObserver() {
    // Якщо observer вже існує - не створюємо новий
    if (_mainContentObserver) {
        return;
    }
    
    _mainContentObserver = new MutationObserver((mutations) => {
        // Використовуємо requestAnimationFrame для batch обробки
        requestAnimationFrame(() => {
            for (let mutation of mutations) {
                handleMutation(mutation);
            }
        });
    });
    
    // Чекаємо на появу плеєра перед підключенням observer
    function waitForPlayer() {
        var player = document.getElementById('movie_player') || document.querySelector('.html5-video-player');
        if (player) {
            // Спостерігаємо тільки за плеєром, не за всім document
            _mainContentObserver.observe(player, {
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'aria-valuenow', 'data-listener'] // Тільки потрібні атрибути
            });
            
            // Також спостерігаємо за video елементом
            var video = document.querySelector('video');
            if (video) {
                setupVideoListeners(video);
            }
            
            logDebug && logDebug('Player observer attached');
        } else {
            // Якщо плеєра ще немає - чекаємо
            setTimeout(waitForPlayer, 500);
        }
    }
    
    waitForPlayer();
}

function handleMutation(mutation) {
    var target = mutation.target;
    
    // Обробка VIDEO елементу
    if (target.tagName === 'VIDEO') {
        if (src !== location.href) {
            var video = document.getElementsByTagName('video')[0];
            if (video) {
                if (video.dataset.hasOwnProperty('originalVolume'))
                    video.removeAttribute('data-original-volume');
                if (video.hasAttribute('data-noboost'))
                    video.removeAttribute('data-noboost');
            }
            src = location.href;
        }
        if (target.getAttribute('listener') !== 'true') {
            setupVideoListeners(target);
        }
    }

    // Обробка movie_player
    if (target.id === 'movie_player') {
        if (target.getAttribute('listener') !== 'true') {
            target.setAttribute('listener', 'true');
        }
    }

    // Обробка volume slider
    if (target.className === 'ytp-volume-slider-handle') {
        var vid = document.getElementsByTagName('VIDEO')[0];
        if (vid) setDefaultVolumeIcon(vid);
    }

    // Обробка mute button
    if (target.className === 'ytp-mute-button ytp-button') {
        var vid = document.getElementsByTagName('VIDEO')[0];
        if (vid) {
            setDefaultVolumeIcon(vid);
            createImages();
        }
    }
}

function setupVideoListeners(videoElement) {
    if (videoElement.getAttribute('listener') === 'true') return;
    
    videoElement.setAttribute('listener', 'true');
    
    isPermanentProgressBar();
    isHideAds();
    
    videoElement.addEventListener("volumechange", youtubeVolumeChanged);
    
    // Throttle для timeupdate - не викликаємо частіше ніж раз на 100ms
    var lastTimeUpdate = 0;
    videoElement.addEventListener('timeupdate', function (e) {
        var now = Date.now();
        if (now - lastTimeUpdate < 100) return;
        lastTimeUpdate = now;
        
        checkVolumeBooster(this);
        updateProgressBar(this);
    });
    
    setDefaultVolumeIcon(videoElement);
    createImages();
}

function updateProgressBar(videoElement) {
    if (document.querySelector('.ytp-time-display.notranslate.ytp-live')) return;
    
    var charapters = document.querySelectorAll('#contents .style-scope.ytd-macro-markers-list-renderer');
    var prcnt = videoElement.currentTime / videoElement.duration;
    
    if (charapters.length < 1) {
        var playProgress = document.querySelector('.ytp-play-progress.ytp-swatch-background-color');
        if (playProgress) {
            playProgress.style.transform = 'scaleX(' + prcnt + ')';
        }
        
        var bf = videoElement.buffered;
        var time = videoElement.currentTime;
        if (bf.length > 0) {
            for (var i = 0; i < bf.length; i++) {
                if (bf.start(i) <= time && bf.end(i) >= time) {
                    var loadedTotal = bf.end(i) / videoElement.duration;
                    var loadProgress = document.querySelector('.ytp-load-progress');
                    if (loadProgress) {
                        loadProgress.style.transform = 'scaleX(' + loadedTotal + ')';
                    }
                    break;
                }
            }
        }
    } else {
        var chaptersContainer = document.querySelector('.ytp-chapters-container');
        if (!chaptersContainer) return;
        
        var chapters = chaptersContainer.children;
        var videoprcnt = (videoElement.currentTime / videoElement.duration) * 100;
        var totalWidth = 0;
        
        for (var i = 0; i < chapters.length; i++) {
            totalWidth += chapters[i].clientWidth;
        }
        
        var drawPrcnt = (videoprcnt / 100) * totalWidth;
        var characterStart = 0;
        
        for (var i = 0; i < chapters.length; i++) {
            characterStart += chapters[i].clientWidth;
            if (characterStart >= drawPrcnt) {
                characterStart -= chapters[i].clientWidth;
                var currentBarWidthPositionPx = drawPrcnt - characterStart;
                var precentDrawedOnCurrentCh = currentBarWidthPositionPx / chapters[i].clientWidth;
                var chapterProgress = chapters[i].querySelector('.ytp-play-progress.ytp-swatch-background-color');
                if (chapterProgress) {
                    chapterProgress.style.transform = 'scaleX(' + precentDrawedOnCurrentCh + ')';
                }
                break;
            } else {
                var chapterProgress = chapters[i].querySelector('.ytp-play-progress.ytp-swatch-background-color');
                if (chapterProgress) {
                    chapterProgress.style.transform = 'scaleX(1)';
                }
            }
        }
    }
}

// Ініціалізуємо observer коли DOM готовий
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayerObserver);
} else {
    initPlayerObserver();
}