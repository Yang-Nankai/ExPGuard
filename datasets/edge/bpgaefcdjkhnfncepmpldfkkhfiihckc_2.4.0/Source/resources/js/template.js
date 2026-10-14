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

.ytp-small-mode.paused-mode .ytp-play-button.ytp-button {
    background: url($_{skin});
    background-position: -25px -23px;
    background-size: 306px;
}

.ytp-small-mode.playing-mode .ytp-play-button.ytp-button {
    background: url($_{skin});
    background-position: -96px -23px;
    background-size: 306px;
}

.ytp-play-button.ytp-button path{
    opacity: 0;
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

.ytp-fullscreen .ytp-fullscreen-button.ytp-button svg{
    opacity:0;
}

.ytp-fullscreen .ytp-fullscreen-button.ytp-button {
    background: url($_{skin});
    background-position: -94px 71px;
    background-size: 308px;
}

.ytp-fullscreen-button.ytp-button svg{
    opacity:0 !important;
}

.ytp-fullscreen-button.ytp-button{
    background: url($_{skin});
    background-position: -23px 71px;
    background-size: 308px;
}


.ytp-play-button.ytp-button path, .play-btn path, .pause-btn path{
    opacity: 0;
}


#player-container-inner .ytp-fullscreen-button.ytp-button svg{
    opacity:0;
}

#player-container-inner .ytp-fullscreen-button.ytp-button{
    background: url($_{skin});
    background-position: -23px 71px;
    background-size: 308px;
}



#player-theater-container .ytp-size-button.ytp-button svg{
    background: url($_{skin});
    background-position: -167px -379px;
    background-size: 308px;
}

#player-container-inner .ytp-size-button.ytp-button svg{
    background: url($_{skin});
    background-position: -96px -379px;
    background-size: 308px;
}

.ytp-mute-button.ytp-button svg{
    background: url($_{skin});
    background-position: -166px -166px;
    background-size: 309px;
}

#player-theater-container .ytp-size-button.ytp-button svg path{
    opacity:0;
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

.ytp-volume-area path{
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



.play-btn, .paused-mode .ytp-play-button.ytp-button {
    background: url($_{skin});
    background-position: -25px -23px;
    background-size: 306px;
}


.pause-btn, .playing-mode .ytp-play-button.ytp-button {
    background: url($_{skin});
	background-position: -96px -23px;
        background-size: 306px;
}

.replay-btn, .ended-mode .ytp-play-button.ytp-button {
    background: url($_{skin});
    background-position: -167px -23px;
    background-size: 306px;
}


.ytp-prev-button.ytp-button svg{
		opacity:0;
}

.ytp-prev-button.ytp-button {
    background: url($_{skin});
    background-position: -94px -94px;
    background-size: 308px;
}


.ytp-next-button.ytp-button svg{
	opacity:0;
}

.ytp-next-button.ytp-button {
	background: url($_{skin});
	background-position: -23px -94px;
        background-size: 308px;
}

.mute-full-btn {
	background: url($_{skin}) !important;
	background-position: -23px -166px !important;
        background-size: 309px !important;
}

.mute-middle-btn {
	background: url($_{skin}) !important;
        background-position: -94.5px -166px !important;
        background-size: 309px !important;
}
	
.mute-btn {
	background: url($_{skin}) !important;
	background-position: -166px -166px !important;
        background-size: 309px !important;
}	

.ytp-volume-slider-handle{
    width: 17px !important;
    height: 17px !important;
    border-radius: 6px !important;
    margin-top: -9px !important;
    background: url($_{skin});
    background-size: 95px;
    background-position: 23px 111px;
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
    background-position: -10px -102px;
    background-size: 132px
}

.ytp-autonav-toggle-button:after, .ytp-autonav-toggle-button:after{
    background: url($_{skin});
    background-position: -41px -102px;
    background-size: 132px;
}


.ytp-autonav-toggle-button[aria-checked=true]{
    background: url($_{skin});
    background-position: -130px -196px;
    background-size: 240px;
}

.ytp-autonav-toggle-button, .ytp-autonav-toggle-button{
    background: url($_{skin});
    background-position: -129px -196px;
    background-size: 240px;
}



.ytp-button.ytp-settings-button svg {
 opacity: 0;
}

.ytp-button.ytp-settings-button{
	background: url($_{skin});
    background-position: -23px -308px;
    background-size: 308px;
}

.ytp-button.ytp-settings-button:hover{
	background: url($_{skin});
    background-position: -94px -308px;
    background-size: 308px;
}



.full-size {
	background: url($_{skin});
    background-position: -96px -379px;
    background-size: 308px
}


.short-size {
	background: url($_{skin});
	background-position: -167px -379px;
    background-size: 308px
}




.ytp-miniplayer-button.ytp-button svg {
 opacity: 0;
}

.ytp-miniplayer-button.ytp-button{
	background: url($_{skin});
	background-position: -23px -379px;
    background-size: 308px;
}

.full-scrn {
	background: url($_{skin});
	background-position: -23px 71px;
    background-size: 308px;
}

.not-full-scrn {
	background: url($_{skin});
	background-position: -94px 71px;
    background-size: 308px;

}


.ytp-subtitles-button.ytp-button svg{
	opacity:0;
}

	
.ytp-subtitles-button.ytp-button {
	background: url($_{skin});
    background-position: -166px -308px;
    background-size: 308px;
}	

.ytp-subtitles-button.ytp-button[aria-pressed="true"] {
	background: url($_{skin});
    background-position: -237px -308px;
    background-size: 308px;

}
	
	
.ytp-subtitles-button.ytp-button[aria-pressed="false"] {
	background: url($_{skin});
    background-position: -166px -309px;
    background-size: 309px;
}	

.ytp-remote-button.ytp-button svg{
	opacity: 0;
}

.ytp-remote-button.ytp-button {
	background: url($_{skin});
    background-position: 143px 71px;
    background-size: 308px;
}


.ytp-multicam-button.ytp-button svg{
	opacity: 0;
}

.ytp-multicam-button.ytp-button {
	background: url($_{skin});
    background-position: 71px 70px;
    background-size: 308px;
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
    background-position: -103px -9px;
    background-size: 134px;
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

.ytp-gradient-bottom{
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