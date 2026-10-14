progress_bar_style = `
.ytp-scrubber-container {
    cursor: pointer !important;
}

.ytp-autohide .ytp-progress-bar-container{
    opacity: 1;
    bottom: -2px !important;
    min-height: 7px;
}

.ytp-autohide .ytp-chrome-bottom {
    opacity: 1 !important;
}

.ytp-autohide .ytp-chrome-controls {
    opacity: 0 !important;
    cursor: default;
}

.ytp-autohide .ytp-progress-list {
    bottom: unset;
}

`;


on_off_style = `
#off_light {
    cursor: unset !important;
    pointer-events: none;
}

.movie_player_ontop {
    z-index: 2023;
}


.ytp-autohide .onofflight {
    opacity: 1 !important;
    cursor: unset;
}

.off_light_active {
    opacity: 1;
    transition: opacity 0.5s;
}

.off_light_inactive {
    opacity: 0;
    transition: opacity 0.1s;
}

.off_light_default {
    position:fixed;
    height: 100%;
    width: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    background: #000000db;
}
`;



style_template = `
/* ============================================
   DYNAMIC SPRITE SCALING SYSTEM
   Автоматичне масштабування всіх іконок через CSS змінні
   ============================================ */

:root {
    --yt-sprite-scale: 0.85; /* коефіцієнт масштабування (1.0 = 100%, 0.85 = 85%, 0.7 = 70%) */
    --yt-sprite-base-size: 308px;
    --yt-sprite-size: calc(var(--yt-sprite-base-size) * var(--yt-sprite-scale));
}

/* ============================================
   CRITICAL: Override YouTube's button clipping
   Works for: delhi-modern, cairo-refresh, ad-mode
   ============================================ */

/* Remove overflow:hidden from ALL buttons to prevent clipping custom backgrounds */
.ytp-button,
.ytp-play-button.ytp-button,
.ytp-prev-button.ytp-button,
.ytp-next-button.ytp-button,
.ytp-mute-button.ytp-button,
.ytp-fullscreen-button.ytp-button,
.ytp-settings-button.ytp-button,
.ytp-subtitles-button.ytp-button,
.ytp-size-button.ytp-button,
.ytp-miniplayer-button.ytp-button,
.ytp-remote-button.ytp-button,
.ytp-pip-button.ytp-button,
.html5-video-player .ytp-button,
.ad-showing .ytp-button,
.ad-interrupting .ytp-button,
.ytp-delhi-modern .ytp-button,
.ytp-delhi-modern-compact-controls .ytp-button,
.ytp-cairo-refresh .ytp-button {
    overflow: visible !important;
    padding: 4px !important; /* додає padding для кращого центрування */
    transition: transform 0.2s cubic-bezier(0.05, 0, 0, 1) !important;
}

/* Плавний zoom при hover */
.ytp-button:hover,
.ytp-play-button.ytp-button:hover,
.ytp-prev-button.ytp-button:hover,
.ytp-next-button.ytp-button:hover,
.ytp-mute-button.ytp-button:hover,
.ytp-fullscreen-button.ytp-button:hover,
.ytp-settings-button.ytp-button:hover,
.ytp-subtitles-button.ytp-button:hover,
.ytp-size-button.ytp-button:hover,
.ytp-miniplayer-button.ytp-button:hover,
.ytp-remote-button.ytp-button:hover,
.ytp-pip-button.ytp-button:hover {
    transform: scale(1.08) !important;
}

/* Прибираємо YouTube hover effects (рамки, фон) */
.ytp-button::after,
.ytp-delhi-modern .ytp-button::after,
.ytp-delhi-modern .ytp-chrome-controls .ytp-button::after,
.ytp-cairo-refresh .ytp-button::after,
.ytp-chrome-controls .ytp-button::after,
.ytp-button:hover::after,
.ytp-delhi-modern .ytp-button:hover::after,
.ytp-cairo-refresh .ytp-button:hover::after {
    background-color: transparent !important;
    background: none !important;
    border: none !important;
    box-shadow: none !important;
}

/* Прибираємо YouTube hover effects для ::before */
.ytp-button::before,
.ytp-button:hover::before,
.ytp-delhi-modern .ytp-button::before,
.ytp-delhi-modern .ytp-button:hover::before,
.ytp-delhi-modern .ytp-chrome-controls .ytp-button:hover::before,
.ytp-delhi-modern .ytp-chrome-controls .ytp-right-controls .ytp-button:hover::before,
.ytp-cairo-refresh .ytp-button::before,
.ytp-cairo-refresh .ytp-button:hover::before,
.ytp-chrome-controls .ytp-button::before {
    background-color: transparent !important;
    background: none !important;
    border: none !important;
    box-shadow: none !important;
}

/* Remove border-radius that clips square custom icons */
.ytp-play-button.ytp-button,
.ad-showing .ytp-play-button.ytp-button,
.ad-interrupting .ytp-play-button.ytp-button,
.ytp-delhi-modern .ytp-play-button.ytp-button,
.ytp-delhi-modern-compact-controls .ytp-play-button.ytp-button {
    border-radius: 0 !important;
    background-color: transparent !important;
}

.ytp-prev-button.ytp-button,
.ad-showing .ytp-prev-button.ytp-button,
.ad-interrupting .ytp-prev-button.ytp-button,
.ytp-delhi-modern .ytp-prev-button.ytp-button,
.ytp-delhi-modern-compact-controls .ytp-prev-button.ytp-button {
    border-radius: 0 !important;
    background-color: transparent !important;
}

.ytp-next-button.ytp-button,
.ad-showing .ytp-next-button.ytp-button,
.ad-interrupting .ytp-next-button.ytp-button,
.ytp-delhi-modern .ytp-next-button.ytp-button,
.ytp-delhi-modern-compact-controls .ytp-next-button.ytp-button {
    border-radius: 0 !important;
    background-color: transparent !important;
}

/* All buttons need transparent background to show custom icons */
.html5-video-player .ytp-chrome-controls .ytp-button,
.ad-showing .ytp-chrome-controls .ytp-button,
.ad-interrupting .ytp-chrome-controls .ytp-button,
.ytp-delhi-modern .ytp-chrome-controls .ytp-button,
.ytp-delhi-modern-compact-controls .ytp-chrome-controls .ytp-button {
    background-color: transparent !important;
}

/* Fullscreen button specific - тільки overflow без розмірів */
.ytp-fullscreen-button.ytp-button,
.ad-showing .ytp-fullscreen-button.ytp-button,
.ad-interrupting .ytp-fullscreen-button.ytp-button,
.ytp-delhi-modern .ytp-fullscreen-button.ytp-button,
.ytp-delhi-modern-compact-controls .ytp-fullscreen-button.ytp-button {
    overflow: visible !important;
}

/* Pip button */
.ytp-pip-button.ytp-button {
    overflow: visible !important;
    min-height: 48px !important;
}

/* ============================================ */

.ytp-inline-preview-ui .ytp-subtitles-button, .ytp-inline-preview-ui .ytp-mute-button, .ytp-inline-preview-ui .ytp-miniplayer-expand-watch-page-button{
    padding: 0px;
    width: 48px;
    height: 48px;
}

.ytp-inline-preview-ui .ytp-subtitles-button{
    padding: 0;
}

.ytp-autohide .corners{
    opacity: 0 !important;
}

/* Small mode - paused */
.ytp-small-mode.paused-mode .ytp-play-button.ytp-button,
.ytp-small-mode .ytp-play-button.ytp-button[aria-label*="Play"],
.ytp-small-mode .ytp-play-button.ytp-button[data-title-no-tooltip="Play"] {
    background: url($_{skin}) !important;
    background-position: calc(-25px * var(--yt-sprite-scale)) calc(-23px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Small mode - playing */
.ytp-small-mode.playing-mode .ytp-play-button.ytp-button,
.ytp-small-mode .ytp-play-button.ytp-button[aria-label*="Pause"],
.ytp-small-mode .ytp-play-button.ytp-button[data-title-no-tooltip="Pause"] {
    background: url($_{skin}) !important;
    background-position: calc(-96px * var(--yt-sprite-scale)) calc(-23px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Ховаємо оригінальні SVG іконки play/pause */
.ytp-play-button.ytp-button svg {
    opacity: 0 !important;
}

.ytp-play-button.ytp-button path {
    opacity: 0 !important;
}



.ytp-small-mode .ytp-volume-slider-handle{
    top: 52% !important;
}

.ytp-player-minimized.ytp-small-mode .ytp-gradient-bottom,
.ytp-player-minimized.ytp-small-mode #left_bottom,
.ytp-player-minimized.ytp-small-mode #left_top,
.ytp-player-minimized.ytp-small-mode #right_bottom,
.ytp-player-minimized.ytp-small-mode #right_top {
    display: none !important;
}


.html5-video-player.ytp-exp-bottom-control-flexbox.ytp-exp-ppp-update.ytp-fit-cover-video.ytp-small-mode  .ytp-gradient-bottom,
.html5-video-player.ytp-exp-bottom-control-flexbox.ytp-exp-ppp-update.ytp-fit-cover-video.ytp-small-mode  #left_bottom,
.html5-video-player.ytp-exp-bottom-control-flexbox.ytp-exp-ppp-update.ytp-fit-cover-video.ytp-small-mode  #left_top,
.html5-video-player.ytp-exp-bottom-control-flexbox.ytp-exp-ppp-update.ytp-fit-cover-video.ytp-small-mode  #right_bottom,
.html5-video-player.ytp-exp-bottom-control-flexbox.ytp-exp-ppp-update.ytp-fit-cover-video.ytp-small-mode  #right_top {
    display: none !important;
}





.miniplayer .corners{
    display: none;
}

.autohide{
    bottom: unset;
    height: unset;
    width: unset;
    z-index: unset;
    padding-top: unset;
    text-align: unset;
    direction: unset;
}

/* Fullscreen mode - exit fullscreen button */
.ytp-fullscreen .ytp-fullscreen-button.ytp-button svg {
    opacity: 0 !important;
}

.ytp-fullscreen .ytp-fullscreen-button.ytp-button {
    background: url($_{skin}) !important;
    background-position: calc(-94px * var(--yt-sprite-scale)) calc(-452px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Fullscreen button - ховаємо оригінальну іконку */
.ytp-fullscreen-button.ytp-button svg {
    opacity: 0 !important;
}

/* Scrubber container offset */
.ytp-delhi-modern .ytp-scrubber-container {
    top: -6px !important;
    left: -6px !important;
}

.ytp-fullscreen-button.ytp-button path {
    opacity: 0 !important;
}

/* Fullscreen button - normal mode (enter fullscreen) */
.ytp-fullscreen-button.ytp-button {
    background: url($_{skin}) !important;
    background-position: calc(-23px * var(--yt-sprite-scale)) calc(71px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}


.ytp-play-button.ytp-button path, .play-btn path, .pause-btn path{
    opacity: 0;
}


#player-container-inner .ytp-fullscreen-button.ytp-button svg{
    opacity: 0 !important;
}

#player-container-inner .ytp-fullscreen-button.ytp-button{
    background: url($_{skin}) !important;
    background-position: calc(-23px * var(--yt-sprite-scale)) calc(-451px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}



/* Size button in theater mode - exit theater */
#player-theater-container .ytp-size-button.ytp-button svg {
    background: url($_{skin}) !important;
    background-position: calc(-167px * var(--yt-sprite-scale)) calc(-379px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Size button in normal mode - enter theater */
#player-container-inner .ytp-size-button.ytp-button {
    background: url($_{skin}) !important;
    background-position: calc(-94px * var(--yt-sprite-scale)) calc(-379px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

#player-container-inner .ytp-size-button.ytp-button svg {
    opacity: 0 !important;
}

/* Size button - ховаємо оригінальні path */
.ytp-size-button.ytp-button svg path {
    opacity: 0 !important;
}

/* Mute button base - показуємо кастомну іконку через SVG background */
.ytp-mute-button .ytp-button svg,
.ytp-volume-icon.ytp-button svg {
    background: url($_{skin}) !important;
    background-position: calc(-166px * var(--yt-sprite-scale)) calc(-166px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Mute button - ховаємо оригінальні path */
.ytp-mute-button .ytp-button svg path,
.ytp-volume-icon.ytp-button svg path {
    opacity: 0 !important;
}

#player-theater-container .ytp-size-button.ytp-button svg path {
    opacity: 0 !important;
}

#player-theater-container .ytp-size-button.ytp-button svg path{
    opacity:0;
}

#player-container-inner .ytp-size-button.ytp-button svg path{
    opacity:0;
}


.ytp-chrome-controls .ytp-play-button path{
    opacity:0;
}


.ytp-mute-button.ytp-button svg path{
    opacity:0;
}



.ytp-chrome-controls .ytp-button, .ytp-replay-button, .ytp-small-mode .ytp-chrome-controls .ytp-button{
    opacity: 1;
    -webkit-transition: opacity .0s cubic-bezier(0.4,0,1,1);
    transition: opacity .0s cubic-bezier(0.4,0,1,1);
}

.ytp-embed .ytp-progress-bar-container {
    bottom: 51px;
}

.ytp-embed .ytp-chrome-bottom {
    height: 48px;
}

.ytp-embed .ytp-chrome-controls {
    height: 48px;
    line-height: 48px;
    margin-top: -1px;
}

.ytp-embed .ytp-chrome-controls .ytp-button, .ytp-embed .ytp-replay-button {
    width: 48px;
    padding: 0;
}

.ytp-small-mode .ytp-chrome-controls{
height: 48px;
}

/* Volume area - ховаємо всі оригінальні SVG paths */
.ytp-volume-area path {
    opacity: 0 !important;
}

.ytp-volume-area svg path {
    opacity: 0 !important;
}

.ytp-small-mode .ytp-chrome-controls .ytp-button{
    width:46px;
}

.ytp-small-mode .ytp-chrome-bottom{
    height: 48px;
}

.ytp-small-mode .ytp-chrome-controls .ytp-button{
    width: 46px;
}

.ytp-small-mode .ytp-volume-slider-handle{
    top: 66%;
}

.ytp-small-mode .ytp-time-display, .ytp-embed .ytp-time-display{
    line-height: 47px;
}

.ytp-small-mode .iv-branding{
    margin-bottom: 10px;
}

.ytp-play-button.ytp-button, .ytp-prev-button.ytp-button, .ytp-next-button.ytp-button, .ytp-mute-button.ytp-button {
	max-width: 48px;       
        width: 48px;
	max-height: 48px;
        padding: 0 !important;
}



/* Play button - paused state */
.play-btn, 
.paused-mode .ytp-play-button.ytp-button,
.html5-video-player:not(.playing-mode) .ytp-play-button.ytp-button,
.ytp-play-button.ytp-button[aria-label*="Play"],
.ytp-play-button.ytp-button[data-title-no-tooltip="Play"] {
    background: url($_{skin}) !important;
    background-position: calc(-25px * var(--yt-sprite-scale)) calc(-23px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Play button - playing state */
.pause-btn, 
.playing-mode .ytp-play-button.ytp-button,
.ytp-play-button.ytp-button[aria-label*="Pause"],
.ytp-play-button.ytp-button[data-title-no-tooltip="Pause"] {
    background: url($_{skin}) !important;
    background-position: calc(-96px * var(--yt-sprite-scale)) calc(-23px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Play button - ended/replay state */
.replay-btn, 
.ended-mode .ytp-play-button.ytp-button,
.ytp-play-button.ytp-button[aria-label*="Replay"],
.ytp-play-button.ytp-button[data-title-no-tooltip="Replay"] {
    background: url($_{skin}) !important;
    background-position: calc(-167px * var(--yt-sprite-scale)) calc(-23px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}


/* Previous button - ховаємо оригінальну іконку */
.ytp-prev-button.ytp-button svg {
    opacity: 0 !important;
}

.ytp-prev-button.ytp-button svg path {
    opacity: 0 !important;
}

/* Previous button - custom icon */
.ytp-prev-button.ytp-button {
    background: url($_{skin}) !important;
    background-position: calc(-94px * var(--yt-sprite-scale)) calc(-94px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Next button - ховаємо оригінальну іконку */
.ytp-next-button.ytp-button svg {
    opacity: 0 !important;
}

.ytp-next-button.ytp-button svg path {
    opacity: 0 !important;
}

/* Next button - custom icon */
.ytp-next-button.ytp-button {
    background: url($_{skin}) !important;
    background-position: calc(-23px * var(--yt-sprite-scale)) calc(-94px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Volume icon states - full volume */
.mute-full-btn,
.ytp-volume-icon.ytp-button[aria-label*="Mute"] svg {
    background: url($_{skin}) !important;
    background-position: calc(-23px * var(--yt-sprite-scale)) calc(-170px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Volume icon states - middle volume */
.mute-middle-btn {
    background: url($_{skin}) !important;
    background-position: calc(-94.5px * var(--yt-sprite-scale)) calc(-166px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Volume icon states - muted */
.mute-btn,
.ytp-volume-icon.ytp-button[aria-label*="Unmute"] svg {
    background: url($_{skin}) !important;
    background-position: calc(-166px * var(--yt-sprite-scale)) calc(-170px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}	

.ytp-volume-slider-handle{
    width: 21px !important;
    height: 21px !important;
    border-radius: 6px !important;
    margin-top: -9px !important;
    background: url($_{skin});
    background-size: calc(144px * var(--yt-sprite-scale));
    background-position: calc(32px * var(--yt-sprite-scale)) calc(167px * var(--yt-sprite-scale)) ;
    transform-style: preserve-3d;
    ytpvolumesliderhandle:
}

.ytp-volume-slider-handle:before{    
    transform: translateZ(-1px);
    ytpvolumesliderhandlebefore:
}

.ytp-volume-slider-handle:after{
        transform: translateZ(-1px);
	left: 9px;
	background: rgb(0 218 218 / 28%);
        ytpvolumesliderhandleafter:
}


.ytp-chrome-controls .ytp-button[aria-pressed]:after{
    background: red;
    ytpbuttonariapressedafter:
}

.ytp-volume-slider {
	max-width: 56px;
}

.ytp-big-mode .ytp-volume-slider-handle{
}

.ytp-volume-slider-active .ytp-volume-panel{
	width: 60px;
}

.ytp-big-mode .ytp-volume-slider{
    max-width: 76px;
}

.ytp-big-mode .ytp-volume-slider-handle:before {
    left: -63px;
    width: 64px;
}

.ytp-larger-tap-buttons .ytp-chrome-controls .ytp-button.ytp-mute-button {
	padding: unset;
}



.ytp-autonav-toggle-button[aria-checked=true]:after, .ytp-autonav-toggle-button[aria-checked=true]:after{
    background: url($_{skin});
    background-position: calc(-10px * var(--yt-sprite-scale)) calc(-102px * var(--yt-sprite-scale)) ;
    background-size: 132px
}

.ytp-autonav-toggle-button:after, .ytp-autonav-toggle-button:after{
    background: url($_{skin});
    background-position: calc(-41px * var(--yt-sprite-scale)) calc(-102px * var(--yt-sprite-scale)) ;
    background-size: calc(132px * var(--yt-sprite-scale));
}


.ytp-autonav-toggle-button[aria-checked=true]{
    background: url($_{skin});
    background-position: calc(-130px * var(--yt-sprite-scale)) calc(-196px * var(--yt-sprite-scale)) ;
    background-size: calc(240px * var(--yt-sprite-scale));
}

.ytp-autonav-toggle-button, .ytp-autonav-toggle-button{
    background: url($_{skin});
    background-position: calc(-129px * var(--yt-sprite-scale)) calc(-196px * var(--yt-sprite-scale)) ;
    background-size: calc(240px * var(--yt-sprite-scale));
}



/* Settings button - ховаємо оригінальну іконку */
.ytp-button.ytp-settings-button svg {
    opacity: 0 !important;
}

.ytp-button.ytp-settings-button svg path {
    opacity: 0 !important;
}

/* Settings button - normal state */
.ytp-button.ytp-settings-button {
    background: url($_{skin}) !important;
    background-position: calc(-23px * var(--yt-sprite-scale)) calc(-308px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Settings button - hover state */
.ytp-button.ytp-settings-button:hover {
    background: url($_{skin}) !important;
    background-position: calc(-94px * var(--yt-sprite-scale)) calc(-308px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}



.full-size {
	background: url($_{skin});
    background-position: calc(-96px * var(--yt-sprite-scale)) calc(-379px * var(--yt-sprite-scale)) ;
    background-size: 308px
}


.short-size {
	background: url($_{skin});
	background-position: calc(-167px * var(--yt-sprite-scale)) calc(-379px * var(--yt-sprite-scale)) ;
    background-size: 308px
}




/* Miniplayer button - ховаємо оригінальну іконку */
.ytp-miniplayer-button.ytp-button svg {
    opacity: 0 !important;
}

.ytp-miniplayer-button.ytp-button svg path {
    opacity: 0 !important;
}

/* Miniplayer button - custom icon */
.ytp-miniplayer-button.ytp-button {
    background: url($_{skin}) !important;
    background-position: calc(-23px * var(--yt-sprite-scale)) calc(-379px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

.full-scrn {
	background: url($_{skin});
	background-position: calc(-23px * var(--yt-sprite-scale)) calc(71px * var(--yt-sprite-scale)) ;
    background-size: var(--yt-sprite-size);
}

.not-full-scrn {
	background: url($_{skin});
	background-position: calc(-94px * var(--yt-sprite-scale)) calc(71px * var(--yt-sprite-scale)) ;
    background-size: var(--yt-sprite-size);

}


/* Subtitles button - ховаємо оригінальну іконку */
.ytp-subtitles-button.ytp-button svg {
    opacity: 0 !important;
}

.ytp-subtitles-button.ytp-button svg path {
    opacity: 0 !important;
}

.ytp-subtitles-button-icon {
    opacity: 0 !important;
}

/* Subtitles button - default state */
.ytp-subtitles-button.ytp-button {
    background: url($_{skin}) !important;
    background-position: calc(-166px * var(--yt-sprite-scale)) calc(-308px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Subtitles button - enabled (aria-pressed=true) */
.ytp-subtitles-button.ytp-button[aria-pressed="true"] {
    background: url($_{skin}) !important;
    background-position: calc(-237px * var(--yt-sprite-scale)) calc(-308px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}

/* Subtitles button - disabled (aria-pressed=false) */
.ytp-subtitles-button.ytp-button[aria-pressed="false"] {
    background: url($_{skin}) !important;
    background-position: calc(-166px * var(--yt-sprite-scale)) calc(-309px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}	

/* Remote/Cast button - ховаємо оригінальну іконку */
.ytp-remote-button.ytp-button svg {
    opacity: 0 !important;
}

.ytp-remote-button.ytp-button svg path {
    opacity: 0 !important;
}

/* Remote/Cast button - custom icon */
.ytp-remote-button.ytp-button {
    background: url($_{skin}) !important;
    background-position: calc(143px * var(--yt-sprite-scale)) calc(71px * var(--yt-sprite-scale)) !important;
    background-size: var(--yt-sprite-size) !important;
    background-repeat: no-repeat !important;
}


.ytp-multicam-button.ytp-button svg{
	opacity: 0;
}

.ytp-multicam-button.ytp-button {
	background: url($_{skin});
    background-position: calc(71px * var(--yt-sprite-scale)) calc(70px * var(--yt-sprite-scale)) ;
    background-size: var(--yt-sprite-size);
}

.ytp-swatch-background-color {
    ytpswatchbackgroundcolor:
}

.ytp-progress-list{
    ytpprogresslist:
}

.ytp-scrubber-container {
    position: absolute;
    ytpscrubbercontainer:
}


.ytp-scrubber-button {    
    -webkit-transition: -webkit-transform .1s cubic-bezier(0.4,0,1,1);
    transition: transform .1s cubic-bezier(0.4,0,1,1),-webkit-transform .1s cubic-bezier(0.4,0,1,1);
    -webkit-transform: scale(0);
    transform: scale(0);
    background: url($_{skin});
    background-position: calc(-103px * var(--yt-sprite-scale)) calc(-9px * var(--yt-sprite-scale)) ;
    background-size: calc(134px * var(--yt-sprite-scale));
    ytpscrubberbutton:
}


.ytp-larger-tap-buttons .ytp-chrome-controls .ytp-button.ytp-mute-button{
    padding:0 !important;
}
	
	
.ytp-chrome-bottom {
    playbar_background:
}


#left_bottom{
    leftbottom:
}

#left_top{
    lefttop:
}

#right_bottom{
    rightbottom:
}

#right_top{
    righttop:
}

.ytp-gradient-bottom {
    background: none !important;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    background-position: bottom !important;
    min-height: 150px !important;
    height: auto !important;
    display: block !important;
    pointer-events: none !important;
    z-index: 9 !important;
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    width: 100% !important;
    ytpgradientbottom:
}

.ytp-chapter-container span {
    color: red;   
    ytptimedisplaysilver:
}

.ytp-fullerscreen-edu-text{
    color: red;   
    ytptimedisplaysilver:
}

.ytp-fullerscreen-edu-text path{
    color: red;   
    ytptimedisplaysilver:
}

.ytp-chapter-container div {
    margin-top: -3px;
    color: red;   
    ytptimedisplaysilver:
}

.ytp-chapter-container path {
    fill: red;    
    ytptimedisplaysilver:
}

.ytp-time-display span {
    color: red;   
    ytptimedisplaysilver:
}

.ytp-time-display svg {
    fill: red;    
    ytptimedisplaysilver:
}

.ytp-time-display button {
    fill: red;    
    ytptimedisplayred:
}

.ytp-live-badge[disabled]:before{
    ytptimedisplayred:
}



`;