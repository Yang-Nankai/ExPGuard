/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 744:
/***/ ((module) => {


    function __html_es6_template_loader__() {
      return `body {
    margin: 0; 
    background: white;   
}

.prompt-container {
    font-family: "Roboto" , "Arial" , "sans-serif";
    width:100%;
    height:100px;		
    background-color: #ffffff;
    margin: 10px auto;
    text-align: left;    
    margin-bottom:0px;
    /*padding: 10px 10px 0px 10px;*/
    font-size:14px;
}
.close-x-button {
    position:absolute;
    top: 3px; 
    right:5px; 
    font-size:16px; 
    cursor:pointer;
}

.buttonsection{
    width: max-content;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 20px;
}

button{
    margin: 0px;
    background: transparent;
    border: 1px solid grey;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    color: #340ad2;
    width: 118px;
    height: 25px;
    opacity: 1;
    transition: all 0.3s ease 0s;
}

button:hover{
    background-color: #ddddff;
}

.close-x-button {
    position:absolute;
    top: 3px; 
    right:5px; 
    font-size:16px; 
    cursor:pointer;
}`;
    }
    module.exports = function(context) {
      return __html_es6_template_loader__.call(context, context);
    }
  

/***/ }),

/***/ 712:
/***/ ((module) => {


    function __html_es6_template_loader__() {
      return `<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet">    
</head>

<div class="prompt-container" style="font-size:12px; text-align:center">
    <!--<div id="close-supernova"><a href="" id="closeSelf">X</a></div> -->
    <div class="close-x-button" onclick="superNova.closeExtensionEmbedBar(); return false;">x</div>

    
    

    <p style="margin-bottom:3px; font-size:12.5px;"><img id="partnerlogo" style="vertical-align:middle; margin-right:2px;" width=16 height=16 src="${this.partnerlogo}"><span>${this.partnerHostname}</span><span id="game_icon_desc"></span><img id="game_icon" width=16 height=16 src="http://cdn.getsupernova.com/images/icon-32x32.png" style="vertical-align:middle; border-radius:4px; margin-left:2px"></p>
    <div style="font-size:12.5px;"><img style="vertical-align:middle; margin-right:2px" src="https://cdn.getsupernova.com/favicon.ico" width=16 height=16>Please install the SuperNova Browser Extension to re-enable Adobe<sup>&reg;</sup> Flash<sup>&reg;</sup> Player in your browser.</div>


    <div class="buttonsection"><button onclick="superNova.installExtension(); return false;" style="margin-right:20px">Install
            Extension</button><button onclick="superNova.closeExtensionEmbedBar();  return false;">Not now</button></div>

    <img onclick="superNova.installExtension(); return false;" width=134 height=38
        src="https://cdn.getsupernova.com/images/ChromeWebStore_Badge_v2_206x58.png"
        style="cursor:pointer; border:1px solid lightgray; position: absolute; right: 3px; bottom:3px;">

    <a style="position:absolute; bottom:3px; left:6px" href="https://getsupernova.com" target="_blank">getsupernova.com</a>
</div>`;
    }
    module.exports = function(context) {
      return __html_es6_template_loader__.call(context, context);
    }
  

/***/ }),

/***/ 296:
/***/ ((module) => {


    function __html_es6_template_loader__() {
      return `body {
    margin: 0; 
    background: white;   
}

.prompt-container {
    font-family: "Roboto" , "Arial" , "sans-serif";
    max-width: 316px;
    max-height: 450px;		
    max-width: 316px;
    background-color: #ffffff;
    margin: 0 auto;
    text-align: left;
    margin:10px;
    margin-bottom:0px;
    /*padding: 10px 10px 0px 10px;*/
    height: 128px;
    font-size:14px;
}
.close-x-button {
    position:absolute;
    top: 3px; 
    right:5px; 
    font-size:16px; 
    cursor:pointer;
}

.buttonsection{
    width: max-content;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}

button{
    margin: 0px;
    background: transparent;
    border: 1px solid grey;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    color: #340ad2;
    width: 118px;
    height: 25px;
    opacity: 1;
    transition: all 0.3s ease 0s;
}

button:hover{
    background-color: #ddddff;
}

.close-x-button {
    position:absolute;
    top: 3px; 
    right:5px; 
    font-size:16px; 
    cursor:pointer;
}`;
    }
    module.exports = function(context) {
      return __html_es6_template_loader__.call(context, context);
    }
  

/***/ }),

/***/ 88:
/***/ ((module) => {


    function __html_es6_template_loader__() {
      return `<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet">    
</head>

<div class="prompt-container" style="height:350px; font-size:12px">
    <!--<div id="close-supernova"><a href="" id="closeSelf">X</a></div> -->
    <div class="close-x-button" onclick="superNova.closeExtensionPrompt(); return false;">x</div>
    <div style="font-size:14px;"><img id="partnerlogo" style="margin-right:10px;" width=16 height=16
            src="${this.partnerlogo}">${this.partnerHostname} wants to</div>

    <div style="margin:10px 0px 10px 0px;"><img style="margin-right:10px;" width=16 height=16
            src="http://cdn.getsupernova.com/images/icon-32x32.png">Run the Supernova Browser Extension</div>
    <div style="margin:10px 10px 10px 25px;">Helps re-enable Adobe<sup>&reg;</sup> Flash<sup>&reg;</sup> Player in
        your browser.</div>

    <div class="buttonsection"><button onclick="superNova.installExtension(); return false;" style="margin-right:20px">Install
            Extension</button><button onclick="superNova.closeExtensionPrompt();  return false;">Not now</button></div>
    <hr style="margin: 0px -10px 10px;" />
    <div style="margin:10px 10px 10px 25px;">Why SuperNova?</div>

    <div id="iconline" style="margin-bottom:10px">
        <img id="game_icon" width=16 height=16 src="http://cdn.getsupernova.com/images/icon-32x32.png" style="border-radius:4px; margin-right:10px">
        <p id="game_icon_desc" style="display:inline"></p>
    </div>
    <div><img width=16 height=16 style="border-radius:4px; margin-right:10px"
            src="http://cdn.getsupernova.com/images/plugin-16x16.png">Chrome<sup>&trade;</sup> and other browsers
        are phasing out support for Adobe<sup>&reg;</sup> Flash<sup>&reg;</sup> Player.</div>


    <img onclick="superNova.installExtension(); return false;" width=134 height=38
        src="https://cdn.getsupernova.com/images/ChromeWebStore_Badge_v2_206x58.png"
        style="cursor:pointer; border:1px solid lightgray; position: absolute; right: 3px; bottom:3px;">

    <a style="position:absolute; bottom:3px; left:6px" href="" onclick="superNova.closeExtensionPrompt(); return false;">Don't show again</a>
</div>`;
    }
    module.exports = function(context) {
      return __html_es6_template_loader__.call(context, context);
    }
  

/***/ }),

/***/ 135:
/***/ ((module) => {


    function __html_es6_template_loader__() {
      return `<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto">
<div id='splashplayer_frame' class='robotoFont'>

    <div id="launch_frame" style="display:block; align-items:center; height:100%">
        <div style="width:100%; height:100%; position:relative">
            <div id="issues_prompt">
                <p>Having issues? Try reinstalling the <button class="anchorButton"
                        onclick="superNova.reinstall();">SuperNova Player</button></p>
            </div>
            <div class="launchHint">
                <b>Hint:</b> <i>Check the &nbsp;</i> <span
                    style="box-sizing:border-box;display:inline-block;width: 10px;height: 10px;border:1.5px solid #000;"></span>
                Always open these types of links <i> box above to launch your game right away in the future!</i>
            </div>
            <div
                style="top:0px; bottom:0px; left:0px; right:0px; position:absolute; height:202px; margin-top:auto; margin-bottom:auto;">
                <img id="slogo" src="${this.imageUrl}/icon-128x128.png"></img>
                <h3 class="splashLaunchTitle" style="margin-top:15px"> ${this.autoplay?(this.gameTitle?this.gameTitle:"This game") + " is launching please wait.":(this.gameTitle?this.gameTitle:"")}</h3>
                <div id="launch_progressbar" class="progressbar" style="margin: 10px auto 20px auto; display:${this.autoplay?'block':'none'};">
                    <div class="progress"></div>
                </div>
                <div style="margin-top:20px;">
                    <p style="display:${this.autoplay?'block':'none'}">${this.autoplay? "Having trouble loading?":""}</p>
                </div>
                <div style="margin-top:5px;">
                    <button onclick="${this.autoplay?'superNova.reloadWindow()':'superNova.openGame(true)'}" class='refreshbutton'><span>${this.autoplay?"Refresh Browser":"Play"}</span></button>
                </div>
            </div>
        </div>
    </div>

    <div id="install_frame" style="display:none; height:100%">
        <div id="game_icon_holder">

            <table>
                <tr>
                    <td>
                        <img class="game_icon" id="game_icon" style="display:none" src=""></img>
                        <div class="game_icon" id="game_icon_alt">DP</div>
                    </td>
                    <td>
                        <div id="game_icon_desc" style="display:inline">${this.gameTitle}<br>requires a .SWF player
                        </div>
                    </td>
                </tr>
            </table>

        </div>

        <div id="install_frame_top_normal" class="install_frame_top">
            <div style="margin:auto; width:100%; left:0; right:0; top:0; bottom:0; overflow:hidden; position:absolute">
                <img id="slogo" src="${this.imageUrl}/icon-128x128.png" style="margin-bottom:17px"></img>

                <div class="gamecaption"
                    style="margin-bottom: 15px;display:${this.gameTitle || this.partnerlogo?'block':'none'};">
                        <img id="partnerlogo" class="partnerlogo" style="display:inline;vertical-align: middle;"> ${"To play " +
                    (this.gameTitle?this.gameTitle:"this game")}<br />Please install the Supernova Player</h3>
                </div>

                <div>
                    <button onclick="superNova.downloadsplashplayer_onclick()" class="installnowbutton">
                        <span style="font-size:12px">SuperNova Player<br /><span
                                style="font-weight: 700; text-decoration:underline; font-size:20px">Install
                                Now</span></span>
                        <span style="margin-left:6px; font-size:30px">
                            <i class="icss-download x2"></i>
                        </span>
                    </button>

                    <div>
                        <div id="downloadprogress" style="display:none">
                            <h3>SuperNova is downloading now...</h3>
                            <div class="progressbar" style="margin: 0 auto;">
                                <div class="progress"></div>
                            </div>
                        </div>

                        <div id="part_installed" style="display:none; height:100%; text-align:left; position:relative;">
                            <div style="width:514px; height:148px;  margin:auto; overflow:hidden">
                                <p style="font-weight: 600; color:#0D5694">Your download is complete!:<br /><br /> 1.
                                    Locate and
                                    double-click the SuperNovaSetup.exe file you downloaded. <br /><br /> 2. Click run
                                    file to install the SuperNova Player.<br /><br /> 3. Done installing? <a
                                        style='color:red' href onclick='superNova.openGame(true); return false;'>Click
                                        Here</a> to play!</p>
                            </div>
                        </div>
                    </div>

                </div>
                <hr style="margin: 13px 10%">
                <div style="padding-top:3px"><a href style="color:black; font-weight:500; text-decoration:underline;"
                        onclick="superNova.openGame(true); return false;">Already installed SuperNova? Click Here to
                        Play Now</a></div>
                <!--<p  id="osindicator">Your System : ${this.getOS()}, ${this.getLanguage()} , ${this.getBrowserInfo().name}</p>
                <a  id="osPrompt" target="_blank" href="${this.wwwBaseUrl}/blank/">Do you have a different operating system?</a>
                <br />
                <img id="windowslogo" src='${this.imageUrl}/windows.png'></img>
                <img id="applelogo" src='${this.imageUrl}/apple.png'></img>-->
            </div>
        </div>

        <div id="install_frame_top_extension" class="install_frame_top" style="display:none ;height:65%;width: 100%;display: block;position: relative;min-height: 300px;">
            <div style="margin:auto; width:100%; left:0; right:0; top:0; bottom:0; overflow:hidden; position:absolute">
                <img id="slogo" src="${this.imageUrl}/icon-128x128.png" style="margin-bottom:17px"></img>

                <div class="gamecaption"
                    style="margin-bottom: 15px;display:${this.gameTitle || this.partnerlogo?'block':'none'};">
                    <!--<img id="partnerlogo" width=32 height=32 src="${this.partnerlogo}" -->
                    <object data="${window.location.origin + '/favicon.ico'}" width=32 height=32 style="display: inline;vertical-align: middle;">
                    <img id="partnerlogo" width=32 height=32 src="${this.partnerlogo}"
                        style="display:${this.partnerlogo?'inline':'none'}; vertical-align: middle;"></object> ${"To play " +
                    (this.gameTitle?this.gameTitle:"this game")}<br />Please install the SuperNova Browser Extension</h3>
                </div>

                <div>
                    <button onclick="superNova.installExtension()" id="installNowButtonExtensionOnly" >
                        <div id="extension_install" class="whySuperNova" style="margin:0px"
                            onclick="">
                            <img class="extension_badge" id="extension_badge_frame_top"
                                src="https://cdn.getsupernova.com/images/ChromeWebStore_Badge_v2_206x58.png">
                        </div>
                    </button>

                    <div>
                        <div id="downloadprogress" style="display:none">
                            <h3>SuperNova is downloading now...</h3>
                            <div class="progressbar" style="margin: 0 auto;">
                                <div class="progress"></div>
                            </div>
                        </div>

                        <div id="part_installed" style="display:none; height:100%; text-align:left; position:relative;">
                            <div style="width:514px; height:148px;  margin:auto; overflow:hidden">
                                <p style="font-weight: 600; color:#0D5694">Your download is complete!:<br /><br /> 1.
                                    Locate and
                                    double-click the SuperNovaSetup.exe file you downloaded. <br /><br /> 2. Click run
                                    file to install the SuperNova Player.<br /><br /> 3. Done installing? <a
                                        style='color:red' href onclick='superNova.openGame(true); return false;'>Click
                                        Here</a> to play!</p>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>

        <div id="publisher_optin">
            <div class="carousel">

                <div class="slide" id="slide_install_supernova">

                    <div id="upsell" class="center">
                        <div>
                            <table class="maxWidth slide_header_table">
                                <tr>
                                    <td id="upsell_security">
                                        <span style="display:inline"><img class="shield"
                                                src="${this.imageUrl}/shield.png"></img></span>
                                        <p style="display:inline; vertical-align:super">Fast and Secure - trusted by top
                                            gaming
                                            sites</p>
                                    </td>
                                    <td id="upsell_space"></td>
                                    <td id="upsell_games">
                                        <span><img class="star" src="${this.imageUrl}/star.png"></span>
                                        <p style="display:inline; vertical-align: super">Keep playing all your favorite
                                            web
                                            games</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <hr>
                        <div class="whySuperNova">
                            <h3 class="slim">Why SuperNova?</h3>
                            <p class="slim">Chrome and other browsers are phasing out support for Adobe<sup>&reg;</sup>
                                Flash<sup>&reg;</sup> Player.</p>

                        </div>
                    </div>

                    <div class="getSuperNovaLink"><a href="${this.wwwBaseUrl}/about/"
                            target="_blank">www.getsupernova.com</a></div>
                    <div class="moreOptions" onclick="return superNova.nextSlide()">
                        <div class="slim right_align moreOptions_desc">more<br>options</div>
                        <div class="more_triangle_holder inline">
                            <button class="more_triangle"></button>
                        </div>
                    </div>

                </div>





                <div class="slide" id="slide_enable_flashplayer">


                    <div id="enableFlash" class="center">
                        <div>
                            <table class="maxWidth slide_header_table">
                                <tr>
                                    <td>
                                        <P class="enable_flash_header">You can also try clicking the button below to
                                            enable Adobe<sup>&reg;</sup>
                                            Flash<sup>&reg;</sup> Player for this session.</P>
                                        <P class="firefox_install_flash_header">
                                            You may wish to install the latest version of Adobe<sup>&reg;</sup>
                                            Flash<sup>&reg;</sup> Player
                                        </P>
                                    </td>

                                </tr>
                            </table>
                        </div>
                        <hr>
                        <div class="whySuperNova">
                            <a href="https://www.adobe.com/go/getflashplayer" target="_blank">
                                <button class="enable_flash_button round_button"><span>Enable
                                        Adobe<sup>&reg;</sup> Flash<sup>&reg;</sup>
                                        Player</span></button>
                                <button class="firefox_install_flash_button round_button">
                                    <span>Install
                                        Adobe<sup>&reg;</sup> Flash<sup>&reg;</sup>
                                        Player</span>
                                </button>
                            </a>
                            <p class="subtext">Not working? <a href="#" onclick="superNova.learnMore_onclick()">Learn
                                    more</a></p>

                        </div>
                    </div>


                    <div class="getSuperNovaLink"><a href="${this.wwwBaseUrl}/about/"
                            target="_blank">www.getsupernova.com</a></div>
                    <div class="moreOptions" onclick="return superNova.nextSlide()">
                        <div class="slim right_align moreOptions_desc">more<br>options</div>
                        <div class="more_triangle_holder inline">
                            <button class="more_triangle"></button>
                        </div>
                    </div>
                </div>

                <div class="slide" id="slide_install_chrome_extension">
                    <div id="chrome_extension" class="center">
                        <div>
                            <table class="maxWidth slide_header_table">
                                <tr>
                                    <td>
                                        <P>The SuperNova Extension can help you run Adobe<sup>&reg;</sup>
                                            Flash<sup>&reg;</sup> Player without having to re-enable it each visit.</P>
                                    </td>

                                </tr>
                            </table>
                        </div>
                        <hr>
                        <div id="extension_install" class="whySuperNova"
                            onclick="superNova.installExtension()">
                            <p class="subtext">SuperNova Browser Extension</p>
                            <img class="extension_badge"
                                src="${this.imageUrl}/ChromeWebStore_Badge_v2_206x58.png"></img>

                        </div>
                    </div>





                    <div class="getSuperNovaLink"><a href="${this.wwwBaseUrl}/about/"
                            target="_blank">www.getsupernova.com</a></div>
                    <div class="moreOptions" onclick="return superNova.nextSlide()">
                        <div class="slim right_align moreOptions_desc">more<br>options</div>
                        <div class="more_triangle_holder inline">
                            <button class="more_triangle"></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div id="part2" class="optin_part" style="display:none; height:147px;">

            <div id="downloadprogress">
                <h3>SuperNova is downloading now...</h3>
                <div class="progressbar" style="margin: 0 auto;">
                    <div class="progress"></div>
                </div>
            </div>

            <div id="part_installed" style="display:none; height:100%; text-align:left; position:relative;">
                <div
                    style="position:absolute; width:514px; height:148px; left:0; right:0; bottom:0; top:0; margin:auto;">
                    <p style="color:white">Your download is complete!:<br /><br /> 1. Locate and double-click the
                        SuperNovaSetup.exe file you downloaded. <br /><br /> 2. Click run file to install the SuperNova
                        Player.<br /><br /> 3. Done installing? <a style='color:red' href
                            onclick='superNova.openGame(true); return false;'>Click Here</a> to play!</p>
                </div>
            </div>
        </div>

    </div>
</div>

</div>`;
    }
    module.exports = function(context) {
      return __html_es6_template_loader__.call(context, context);
    }
  

/***/ }),

/***/ 146:
/***/ ((module) => {


    function __html_es6_template_loader__() {
      return `html, body {
    margin:0;
    padding:0;
}

i[class*="icss-"] {
    position: relative;
    display:inline-block;
    font-style: normal;
    background-color:currentColor;
    box-sizing: border-box;
    vertical-align: middle;
}
i[class*="icss-"]:before, 
i[class*="icss-"]:after {
    content: "";
    border-width: 0; 
    position: absolute;
    box-sizing: border-box;
}
    
i.icss-download {
    width: 1em;
    height: .6em;
    background-color: transparent;
    border-width: 0 .2em .3em;
    border-style: solid;
    border-radius: .03em;
    margin: .4em 0 0;
}

i.icss-download:before {
    height: .5em;
    border-style: solid;
    border-width: 0 .25em .25em;
    border-color: transparent;
    border-bottom-color: currentColor;
    background-color: transparent;
    box-shadow: 0em .35em 0 -.13em;
    top: -.1em;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
}		

#installNowButtonExtensionOnly{
    cursor: pointer;
    display: inline; 
    color:white; 
    padding: 10px; 
    border-radius:10px; 
    background-color: #0D5694; 
    width:300px; 
    border: 0;	
    position: relative;
    transform: translateZ(0);
}
#installNowButtonExtensionOnly:before{
    content: "";
    position: absolute;			
    z-index: -1;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;			
    transition: 400ms ease-out;
}

#installNowButtonExtensionOnly:hover:before {			
    background-color: white;
    color:#0D5694;
    transition: color 400ms ease-out, width 500ms ease-out;			
    width:100%;
}

#installNowButtonExtensionOnly:hover {
    color:#0D5694;			
}


.installNowButton {			
    cursor: pointer;
    display: inline;
    color: white;
    padding: 10px;
    border-radius: 10px;
    background-color: #0D5694;
    width: 300px;
    border: 2px solid black;
    position: relative;
    transform: translateZ(0);
}
.installNowButton:hover {
    color:#0D5694;			
}
.installNowButton:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    transition: 400ms ease-out;
    border-radius: 10px;
    
}
.installNowButton:hover:before {			
    background-color: white;
    color:#0D5694;
    transition: color 400ms ease-out, width 500ms ease-out;			
    width:100%;
}	

.anchorButton {
    background:none!important;
    color:inherit;
    border:none; 
    padding:0!important;
    font: inherit;
    /*border is optional*/
    border-bottom:1px solid #444; 
    cursor: pointer;
 }


.launchHint {
    display:none;
    position: absolute;
    width: 70%;
    height: 50px;
    top: 10px;
    left: 15%;
    right: 15%;
}

.robotoFont {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.refreshbutton {
    border-radius: 30px;
    background: #0D5694;
    color: white;
    margin: 0px;
    width: 180px;
    height: 26px;
    font-size: 14px;			
    border: none;			
}

#issues_prompt {
    position:absolute;
    bottom:20px;
    right:10px;
}

#noflash {
    display:none;
}

#part_installed {
    font-size:16px;
    text-align:center;
}

#splashplayer_frame {
    text-align: center;
    background:#FFFFFF;
    height:100%;
}

.splashLaunchTitle {
    color: #0D5694;
    font-size: 18px;
}

#splashTitle {
    color: #0D5694;
    font-size: 18px;
}

#promotext {
    font-size: 14px;
    margin-bottom: 1px;
}

#launchlink {
    font-size: 14px;
    margin-top: 1px;
    color: #F35231;
    margin-bottom: 0px;
}

#osindicator {
    margin-top: 0px;
    font-size: 14px;
    margin-bottom: 7px;
}

#osPrompt {
    color: #0083CA;
    font-size: 13px;
    font-weight: bold;

}

#windowslogo {
    margin-top: 9px;
    margin-right: 20px;
}

.install_frame_top{
    height:65%;
    width:100%;
    display:block;
    position:relative;
    min-height:300px;
}

#install_frame_top_normal{
    
}

#publisher_optin {
    background: #0D5694;
    color: white;
    margin: 0px;
    position:absolute;
    bottom:0px;
    width:100%;
    height:30%;
    display:block;
    position:relative;
    min-height:181px;
}

#optin {
    /* display: block; */
    margin-top: 13px;
    margin-bottom: 26px;
    position: relative;
    height: 50px;
    width: 400px;
    margin-left: auto;
    margin-right: auto;

}

.optin_part {
    /*min-height:229px;*/
    margin:auto;
    position:absolute;
    right:0;
    top:0;
    bottom:0;
    height:104px;
    overflow:hidden;
}


#kartridge_optin {
    opacity: 0;
    width: 34px;
    height: 34px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

#kartridge_optin+label {
    background: url("${this.imageUrl}/checkbox.png") no-repeat;
    display: inline-block;
    
    position: absolute;
    top: 0;
    left: 0;
}

#kartridge_optin:checked+label {
    background: url("${this.imageUrl}/checkbox_checked.png") no-repeat;
    display:inline-block;
}

#kartridge_optin_prompt {
    height:34px;
    padding-left: 45px;
    text-align: left;
}

#downloadsplashplayer {
    border-radius: 50px;
    background: #FFFFFF;
    width: 250px;
    height: 40px;
    font-size: 18px;
    border: none;
    color: #0D5694
}

#downloadsplashplayer:active {
    background: #D1D5D5
}

#downloadsplashplayer span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
    line-height:40px;
}

#downloadsplashplayer span:after {

    content: '\\00bb';
    font-size: 28px;
    vertical-align:middle;			
    position: absolute;
    opacity: 0;
    right: -10px;
    transition: 0.5s;
}

#downloadsplashplayer:hover span:after {
    opacity: 1;
    right: 0;
}

#downloadsplashplayer:hover span {
    padding-right: 15px;
}

.progressbar {
    position:relative;
    width:500px;
    height:7px;
    overflow: hidden;
    background:lightblue;
  }
  
  .progress {
    position:absolute;
    background:blue;
    opacity: 0.7;
    height:100%; 
    animation: prog 0.9s infinite ease-in;
  }
  
  @keyframes prog {
   from { left: -60%; width: 60%; }
   to { left: 120%; width: 20%;}
  }            


  /*carousel styles*/


  

.slide{
    width:100%;
    height:100%;
    background: #0D5694; 
    margin:0px;
    padding:0px;
    position: relative;
    display:none;
    /*border-radius: 20px;*/
}

.slide, .slide p, .slide a{
    color:white;
}

.slim{
    margin:0px;
    padding:0px;
}

.maxWidth{
    width:100%;
}

.inline{
    display: inline;
}



.slide{
    color:white;
}


.center{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    overflow:hidden;
    margin: auto;
}

.right_align{
    text-align: right;
}

 .round_button{  
    font-size: 16px;
    font-weight: 600;
    color: #0D5694;
}

.round_button{
    border-radius: 50px;
    background: #FFFFFF;
    width: 250px;
    height: 40px;
    border: none;
    transition: .3s;
}

.round_button :hover , .round_button * :hover{
    color:white !important;
    background:#0D5694;
    cursor:pointer
}

.round_button:hover{
    color: white;
    border: 1px white solid;
    background:#0D5694;
    text-decoration: underline;
    cursor:pointer
}

.slide_header_table{
    font-size: 14px;
}

.subtext{
    font-size: 14px;
}


#upsell{
    width:85%;
    margin-left: auto;
    margin-right: auto;
    height:158px;
}

#enableFlash{
    width:85%;
    margin-left: auto;
    margin-right: auto;
    height:158px;
}

#chrome_extension{
    width:85%;
    margin-left: auto;
    margin-right: auto;
    height:158px;
}

#upsell td{
    vertical-align: middle;
}

#upsell_space{
    width:4%;
}

#upsell_security{
    width:42%;
}
#upsell_games{
    width:42%;
    text-align: right;
}

.whySuperNova{
    text-align: center;
    margin-top: 15px;
}

.shield{
    width:30px;
    height:30px;
}

.star{
    width:30px;
    height:30px;
}

.shield{
    width:30px;
    height:30px;
}

.getSuperNovaLink{
    position: absolute;
    bottom:10px;
    left: 10px;
}

.moreOptions{
    position: absolute;
    width: 107px;
    height: 36px;
    right: 0px;
    bottom: 8px;
    overflow: hidden;
    transition: transform 0.3s;
    cursor: pointer;
}

.moreOptions:hover{
    text-decoration: underline;
    transform: scale3d(1.1, 1.1, 1);
}


.moreOptions_desc{
    width: 50px;
}

.more_triangle_holder{
    border: none;
    outline:none;
    left: 62px;
    top: 3px;
    position: absolute;
}

.more_triangle{
    border: none;
    outline:none;
    width:0px;
    height:0px;
    border: 14px solid white;
    border-left-width: 32px;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-top-color: transparent;
    background: transparent;
    cursor: pointer;
}

.extension_badge{
    width: 213px;
    background: white;
 
}

#extension_badge_frame_top{
    width: 213px;
    background: white;
    border: 3px solid #0d5694;
    border-radius: 8px;
}

#extension_install{
    transition: transform 0.3s;
    
}


#extension_install:hover{
    text-decoration: underline;
    transform: scale3d(1.1, 1.1, 1);
    cursor:pointer
}


carousel {
    overflow: hidden;
    max-width: 800px;
    height:300px;
    position: relative;
  }
  .slide {
    position:absolute;
    top:0; left:0; right:0; bottom:0;
    animation: fadeIn 1s;
  }
  @keyframes fadeIn {
      from { opacity: 0; }
        to { opacity: 1; }
  }


.game_icon{
    width: 50px;
    height: 50px;
    border: 2px solid black;
    border-radius: 28%;
    font-size: 32px;
    text-align: center;
    line-height: 50px;
    
}

#game_icon_alt{
    background:#0D5694;
    color:white;
}

#game_icon_holder{
    position: absolute;
    top:0px; 
    left:0px;
    width:300px;
    
}

.firefox_install_flash_button {
    display: none;
}
.firefox_install_flash_header {
    display:none;
}`;
    }
    module.exports = function(context) {
      return __html_es6_template_loader__.call(context, context);
    }
  

/***/ }),

/***/ 934:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var isolang = [{ "English": "Afar", "alpha2": "aa" }, { "English": "Abkhazian", "alpha2": "ab" }, { "English": "Avestan", "alpha2": "ae" }, { "English": "Afrikaans", "alpha2": "af" }, { "English": "Akan", "alpha2": "ak" }, { "English": "Amharic", "alpha2": "am" }, { "English": "Aragonese", "alpha2": "an" }, { "English": "Arabic", "alpha2": "ar" }, { "English": "Assamese", "alpha2": "as" }, { "English": "Avaric", "alpha2": "av" }, { "English": "Aymara", "alpha2": "ay" }, { "English": "Azerbaijani", "alpha2": "az" }, { "English": "Bashkir", "alpha2": "ba" }, { "English": "Belarusian", "alpha2": "be" }, { "English": "Bulgarian", "alpha2": "bg" }, { "English": "Bihari languages", "alpha2": "bh" }, { "English": "Bislama", "alpha2": "bi" }, { "English": "Bambara", "alpha2": "bm" }, { "English": "Bengali", "alpha2": "bn" }, { "English": "Tibetan", "alpha2": "bo" }, { "English": "Breton", "alpha2": "br" }, { "English": "Bosnian", "alpha2": "bs" }, { "English": "Catalan; Valencian", "alpha2": "ca" }, { "English": "Chechen", "alpha2": "ce" }, { "English": "Chamorro", "alpha2": "ch" }, { "English": "Corsican", "alpha2": "co" }, { "English": "Cree", "alpha2": "cr" }, { "English": "Czech", "alpha2": "cs" }, { "English": "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic", "alpha2": "cu" }, { "English": "Chuvash", "alpha2": "cv" }, { "English": "Welsh", "alpha2": "cy" }, { "English": "Danish", "alpha2": "da" }, { "English": "German", "alpha2": "de" }, { "English": "Divehi; Dhivehi; Maldivian", "alpha2": "dv" }, { "English": "Dzongkha", "alpha2": "dz" }, { "English": "Ewe", "alpha2": "ee" }, { "English": "Greek, Modern (1453-)", "alpha2": "el" }, { "English": "English", "alpha2": "en" }, { "English": "Esperanto", "alpha2": "eo" }, { "English": "Spanish; Castilian", "alpha2": "es" }, { "English": "Estonian", "alpha2": "et" }, { "English": "Basque", "alpha2": "eu" }, { "English": "Persian", "alpha2": "fa" }, { "English": "Fulah", "alpha2": "ff" }, { "English": "Finnish", "alpha2": "fi" }, { "English": "Fijian", "alpha2": "fj" }, { "English": "Faroese", "alpha2": "fo" }, { "English": "French", "alpha2": "fr" }, { "English": "Western Frisian", "alpha2": "fy" }, { "English": "Irish", "alpha2": "ga" }, { "English": "Gaelic; Scottish Gaelic", "alpha2": "gd" }, { "English": "Galician", "alpha2": "gl" }, { "English": "Guarani", "alpha2": "gn" }, { "English": "Gujarati", "alpha2": "gu" }, { "English": "Manx", "alpha2": "gv" }, { "English": "Hausa", "alpha2": "ha" }, { "English": "Hebrew", "alpha2": "he" }, { "English": "Hindi", "alpha2": "hi" }, { "English": "Hiri Motu", "alpha2": "ho" }, { "English": "Croatian", "alpha2": "hr" }, { "English": "Haitian; Haitian Creole", "alpha2": "ht" }, { "English": "Hungarian", "alpha2": "hu" }, { "English": "Armenian", "alpha2": "hy" }, { "English": "Herero", "alpha2": "hz" }, { "English": "Interlingua (International Auxiliary Language Association)", "alpha2": "ia" }, { "English": "Indonesian", "alpha2": "id" }, { "English": "Interlingue; Occidental", "alpha2": "ie" }, { "English": "Igbo", "alpha2": "ig" }, { "English": "Sichuan Yi; Nuosu", "alpha2": "ii" }, { "English": "Inupiaq", "alpha2": "ik" }, { "English": "Ido", "alpha2": "io" }, { "English": "Icelandic", "alpha2": "is" }, { "English": "Italian", "alpha2": "it" }, { "English": "Inuktitut", "alpha2": "iu" }, { "English": "Japanese", "alpha2": "ja" }, { "English": "Javanese", "alpha2": "jv" }, { "English": "Georgian", "alpha2": "ka" }, { "English": "Kongo", "alpha2": "kg" }, { "English": "Kikuyu; Gikuyu", "alpha2": "ki" }, { "English": "Kuanyama; Kwanyama", "alpha2": "kj" }, { "English": "Kazakh", "alpha2": "kk" }, { "English": "Kalaallisut; Greenlandic", "alpha2": "kl" }, { "English": "Central Khmer", "alpha2": "km" }, { "English": "Kannada", "alpha2": "kn" }, { "English": "Korean", "alpha2": "ko" }, { "English": "Kanuri", "alpha2": "kr" }, { "English": "Kashmiri", "alpha2": "ks" }, { "English": "Kurdish", "alpha2": "ku" }, { "English": "Komi", "alpha2": "kv" }, { "English": "Cornish", "alpha2": "kw" }, { "English": "Kirghiz; Kyrgyz", "alpha2": "ky" }, { "English": "Latin", "alpha2": "la" }, { "English": "Luxembourgish; Letzeburgesch", "alpha2": "lb" }, { "English": "Ganda", "alpha2": "lg" }, { "English": "Limburgan; Limburger; Limburgish", "alpha2": "li" }, { "English": "Lingala", "alpha2": "ln" }, { "English": "Lao", "alpha2": "lo" }, { "English": "Lithuanian", "alpha2": "lt" }, { "English": "Luba-Katanga", "alpha2": "lu" }, { "English": "Latvian", "alpha2": "lv" }, { "English": "Malagasy", "alpha2": "mg" }, { "English": "Marshallese", "alpha2": "mh" }, { "English": "Maori", "alpha2": "mi" }, { "English": "Macedonian", "alpha2": "mk" }, { "English": "Malayalam", "alpha2": "ml" }, { "English": "Mongolian", "alpha2": "mn" }, { "English": "Marathi", "alpha2": "mr" }, { "English": "Malay", "alpha2": "ms" }, { "English": "Maltese", "alpha2": "mt" }, { "English": "Burmese", "alpha2": "my" }, { "English": "Nauru", "alpha2": "na" }, { "English": "Bokm\u00e5l, Norwegian; Norwegian Bokm\u00e5l", "alpha2": "nb" }, { "English": "Ndebele, North; North Ndebele", "alpha2": "nd" }, { "English": "Nepali", "alpha2": "ne" }, { "English": "Ndonga", "alpha2": "ng" }, { "English": "Dutch; Flemish", "alpha2": "nl" }, { "English": "Norwegian Nynorsk; Nynorsk, Norwegian", "alpha2": "nn" }, { "English": "Norwegian", "alpha2": "no" }, { "English": "Ndebele, South; South Ndebele", "alpha2": "nr" }, { "English": "Navajo; Navaho", "alpha2": "nv" }, { "English": "Chichewa; Chewa; Nyanja", "alpha2": "ny" }, { "English": "Occitan (post 1500); Proven\u00e7al", "alpha2": "oc" }, { "English": "Ojibwa", "alpha2": "oj" }, { "English": "Oromo", "alpha2": "om" }, { "English": "Oriya", "alpha2": "or" }, { "English": "Ossetian; Ossetic", "alpha2": "os" }, { "English": "Panjabi; Punjabi", "alpha2": "pa" }, { "English": "Pali", "alpha2": "pi" }, { "English": "Polish", "alpha2": "pl" }, { "English": "Pushto; Pashto", "alpha2": "ps" }, { "English": "Portuguese", "alpha2": "pt" }, { "English": "Quechua", "alpha2": "qu" }, { "English": "Romansh", "alpha2": "rm" }, { "English": "Rundi", "alpha2": "rn" }, { "English": "Romanian; Moldavian; Moldovan", "alpha2": "ro" }, { "English": "Russian", "alpha2": "ru" }, { "English": "Kinyarwanda", "alpha2": "rw" }, { "English": "Sanskrit", "alpha2": "sa" }, { "English": "Sardinian", "alpha2": "sc" }, { "English": "Sindhi", "alpha2": "sd" }, { "English": "Northern Sami", "alpha2": "se" }, { "English": "Sango", "alpha2": "sg" }, { "English": "Sinhala; Sinhalese", "alpha2": "si" }, { "English": "Slovak", "alpha2": "sk" }, { "English": "Slovenian", "alpha2": "sl" }, { "English": "Samoan", "alpha2": "sm" }, { "English": "Shona", "alpha2": "sn" }, { "English": "Somali", "alpha2": "so" }, { "English": "Albanian", "alpha2": "sq" }, { "English": "Serbian", "alpha2": "sr" }, { "English": "Swati", "alpha2": "ss" }, { "English": "Sotho, Southern", "alpha2": "st" }, { "English": "Sundanese", "alpha2": "su" }, { "English": "Swedish", "alpha2": "sv" }, { "English": "Swahili", "alpha2": "sw" }, { "English": "Tamil", "alpha2": "ta" }, { "English": "Telugu", "alpha2": "te" }, { "English": "Tajik", "alpha2": "tg" }, { "English": "Thai", "alpha2": "th" }, { "English": "Tigrinya", "alpha2": "ti" }, { "English": "Turkmen", "alpha2": "tk" }, { "English": "Tagalog", "alpha2": "tl" }, { "English": "Tswana", "alpha2": "tn" }, { "English": "Tonga (Tonga Islands)", "alpha2": "to" }, { "English": "Turkish", "alpha2": "tr" }, { "English": "Tsonga", "alpha2": "ts" }, { "English": "Tatar", "alpha2": "tt" }, { "English": "Twi", "alpha2": "tw" }, { "English": "Tahitian", "alpha2": "ty" }, { "English": "Uighur; Uyghur", "alpha2": "ug" }, { "English": "Ukrainian", "alpha2": "uk" }, { "English": "Urdu", "alpha2": "ur" }, { "English": "Uzbek", "alpha2": "uz" }, { "English": "Venda", "alpha2": "ve" }, { "English": "Vietnamese", "alpha2": "vi" }, { "English": "Volap\u00fck", "alpha2": "vo" }, { "English": "Walloon", "alpha2": "wa" }, { "English": "Wolof", "alpha2": "wo" }, { "English": "Xhosa", "alpha2": "xh" }, { "English": "Yiddish", "alpha2": "yi" }, { "English": "Yoruba", "alpha2": "yo" }, { "English": "Zhuang; Chuang", "alpha2": "za" }, { "English": "Chinese", "alpha2": "zh" }, { "English": "Zulu", "alpha2": "zu" }];
var languages = {};
for (var i = 0; i < isolang.length; i++) {
    var entry = isolang[i];
    languages[entry.alpha2] = { en: entry.English };
}
exports["default"] = languages;


/***/ }),

/***/ 64:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Utils = __webpack_require__(328);
const template = __webpack_require__(135);
const css = __webpack_require__(146);
const extensionEmbedBarTemplate = __webpack_require__(712);
const extensionEmbedBarCss = __webpack_require__(744);
const extensionPromptTemplate = __webpack_require__(88);
const extensionPromptCss = __webpack_require__(296);
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (search, this_len) {
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
    };
}
;
var Mode;
(function (Mode) {
    Mode["extensiononly"] = "extensiononly";
    Mode["normal"] = "normal";
    Mode["extensionPrompt"] = "extensionprompt";
})(Mode || (Mode = {}));
class SuperNova {
    constructor() {
        this.MESSAGEFRAME_TIMEOUT = 2500;
        this.CONTENTSCRIPT_TIMEOUT = 500;
        this.adplaygroundbaseurl = "https://adplayground.datamat.io";
        this.cdnBaseUrl = "https://cdn.getsupernova.com";
        this.wwwBaseUrl = "https://www.getsupernova.com";
        this.imageUrl = this.cdnBaseUrl + "/images";
        this.supernovadownloadurl = this.wwwBaseUrl + "/SuperNovaSetup.exe";
        this.chromewebstoreurl = "https://chrome.google.com/webstore/detail/supernova-swf-enabler/mhmphnocemakkjdampibehejoaleebpo";
        this.installTeaserMessage = "Keep playing all your favorite web games with the SuperNova Player!";
        this.mode = Mode.normal;
        this.autoplay = true;
        this.forceExtensionPrompt = false;
        this.log_log = [];
        this.installStatus = {};
        this.launchStatus = {};
        this.extensionStatus = {};
        this.isSetup = false;
        this.contentScriptStatusReceived = false;
        this.messageFrameInstallStatusRecieved = false;
        this.contentScriptTimedout = false;
        this.messageFrameTimedout = false;
        //Function queue to let us run functions only after installStatus/launchStatus are initialized.
        this.qRan = false;
        this.que = [];
        this.curSlide = 0;
        /*!    SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
                is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
                Copyright (c) 2007-2015 The SWFObject team
        */
        this.ua = function () {
            function toInt(str) {
                return parseInt(str, 10);
            }
            let doc = document, nav = navigator, win = window, UNDEF = "undefined", OBJECT = "object", SHOCKWAVE_FLASH = "Shockwave Flash", SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash", FLASH_MIME_TYPE = "application/x-shockwave-flash", EXPRESS_INSTALL_ID = "SWFObjectExprInst", ON_READY_STATE_CHANGE = "onreadystatechange", plugin = false;
            var w3cdom = typeof doc.getElementById !== UNDEF && typeof doc.getElementsByTagName !== UNDEF && typeof doc.createElement !== UNDEF, u = nav.userAgent.toLowerCase(), p = nav.platform.toLowerCase(), windows = p ? /win/.test(p) : /win/.test(u), mac = p ? /mac/.test(p) : /mac/.test(u), webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
            ie = nav.appName === "Microsoft Internet Explorer", playerVersion = [0, 0, 0], d = null;
            if (typeof nav.plugins !== UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] === OBJECT) {
                d = nav.plugins[SHOCKWAVE_FLASH].description;
                // nav.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
                if (d && (typeof nav.mimeTypes !== UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
                    plugin = true;
                    ie = false; // cascaded feature detection for Internet Explorer
                    d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    playerVersion[0] = toInt(d.replace(/^(.*)\..*$/, "$1"));
                    playerVersion[1] = toInt(d.replace(/^.*\.(.*)\s.*$/, "$1"));
                    playerVersion[2] = /[a-zA-Z]/.test(d) ? toInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0;
                }
            }
            else if (typeof win.ActiveXObject !== UNDEF) {
                try {
                    //@ts-ignore
                    var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
                    if (a) { // a will return null when ActiveX is disabled
                        d = a.GetVariable("$version");
                        if (d) {
                            ie = true; // cascaded feature detection for Internet Explorer
                            d = d.split(" ")[1].split(",");
                            playerVersion = [toInt(d[0]), toInt(d[1]), toInt(d[2])];
                        }
                    }
                }
                catch (e) { }
            }
            return { w3: w3cdom, pv: playerVersion, wk: webkit, ie: ie, win: windows, mac: mac };
        }();
        this.slides = [""];
        /**
         * i install supernova
         * e install extension
         * f enable flash player
         */
        this.browserSlideMap = {
            Chrome: ["install_supernova", "install_chrome_extension", "enable_flashplayer"],
            other: ["install_supernova", "enable_flashplayer"]
        };
        this.osSlideMap = {
            windows: ["install_supernova", "install_chrome_extension", "enable_flashplayer"],
            macintosh: ["install_chrome_extension", "enable_flashplayer"],
            linux: ["install_chrome_extension", "enable_flashplayer"],
            other: ["install_chrome_extension", "enable_flashplayer"],
        };
        var self = this;
        this.partnerHostname = this.getTLD(window.location.host);
        this.addEventHandler("supernova-message", this.supernovaMessageHandler.bind(this));
        this.addEventHandler("message", this.receiveMessage.bind(this));
        this.sendMessageToContentScript({ command: "requeststatus" });
        self.setup();
        document.addEventListener('DOMContentLoaded', function () {
            self.setup();
        });
        this.getExtensionStatus(function (status) {
            self.extensionStatus.extension = status;
            self.tryStartup(self.contentScriptTimedout && self.messageFrameTimedout);
        });
        setTimeout(this.onContentScriptTimeout.bind(this), this.CONTENTSCRIPT_TIMEOUT);
        setTimeout(this.onMessageFrameTimeout.bind(this), this.MESSAGEFRAME_TIMEOUT);
        this.wrapQFn("launch");
        this.wrapQFn("play");
        this.wrapQFn("nextSlide");
        this.wrapQFn("showSlide");
        this.wrapQFn("reinstall");
        this.wrapQFn("getExtensionStatus");
    }
    getLaunchStatus() {
        if (!this.autoplay) {
            this.setLaunchStatus({ launchStatus: "started", launchType: "manual", launchMethod: "options" });
        }
        return this.launchStatus;
    }
    setLaunchStatus(data) {
        Utils.extend(this.launchStatus, data);
        this.sendMessageToContentScript({
            command: "status", data: {
                launchStatus: this.launchStatus
            }
        });
        return this.launchStatus;
    }
    onMessageFrameTimeout() {
        this.messageFrameTimedout = true;
        this.tryStartup((this.extensionStatus.extension != null) && this.MESSAGEFRAME_TIMEOUT >= this.CONTENTSCRIPT_TIMEOUT);
    }
    onContentScriptTimeout() {
        this.contentScriptTimedout = true;
        if (this.launchStatus == null) {
            this.launchStatus = {
                launchStatus: "waiting"
            };
        }
        this.tryStartup((this.extensionStatus.extension != null) && this.CONTENTSCRIPT_TIMEOUT > this.MESSAGEFRAME_TIMEOUT);
    }
    getTLD(hostname) {
        var hostSplit = hostname.split(".");
        var tld = "";
        for (var i = hostSplit.length - 1; i >= 0; i--) {
            if (tld.length == 0)
                tld = hostSplit[i];
            else
                tld = hostSplit[i] + "." + tld;
            if (i != hostSplit.length - 1 && hostSplit[i].length > 3)
                break;
        }
        return tld;
    }
    setup() {
        if (this.isSetup)
            return true;
        var el = document.body;
        if (el == null)
            return false;
        this.messageFrame = document.createElement("iframe");
        this.messageFrame.id = "supernovamessageframe";
        this.messageFrame.src = this.cdnBaseUrl + "/tags/message_frame.html";
        this.messageFrame.scrolling = "no";
        this.messageFrame.width = "0";
        this.messageFrame.height = "0";
        el.appendChild(this.messageFrame);
        this.isSetup = true;
        return true;
    }
    wrapQFn(fnName) {
        var originalFn = (this[fnName]); //get the original function
        this[fnName] = function (myFn) {
            var args = Array.prototype.slice.call(arguments, 1);
            var fn = myFn.bind(this, ...args); //bind all of the args for later use when the que is ran
            if (this.qRan) { //if que has already been flushed... just run the function
                fn();
                //this[fnName] = originalFn; //remove wrapper
            }
            else {
                this.log("Queued: " + myFn.name); //still waiting... so push this function onto the que
                this.que.push(fn);
            }
        }.bind(this, originalFn);
    }
    runFnQueue() {
        this.log("Running command queue - length " + this.que.length);
        while (this.que.length) {
            var fn = this.que.shift();
            try {
                fn();
            }
            catch (e) {
                this.log("Error running queued fn - " + e);
            }
        }
        this.qRan = true;
    }
    tryStartup(force) {
        if (this.qRan)
            return;
        if (force || (this.contentScriptStatusReceived && this.messageFrameInstallStatusRecieved)) {
            this.log("Starting up");
            this.runFnQueue();
        }
    }
    addEventHandler(eventName, cb) {
        if (window.addEventListener) {
            window.addEventListener(eventName, cb, false);
        }
        else {
            window.attachEvent(eventName, cb);
        }
        ;
    }
    postToMessageFrame(message) {
        this.sendMessageToContentScript(message);
        if (this.messageFrame && this.messageFrame.contentWindow)
            this.messageFrame.contentWindow.postMessage(message, this.cdnBaseUrl);
    }
    isInstalled() {
        if (this.installStatus.detected != null)
            return this.installStatus.detected;
        if (this.installStatus.declared != null)
            return this.installStatus.declared;
        return false;
    }
    setInstallStatus(statusChanges) {
        var oldStatus = this.installStatus;
        var oldIsInstalled = this.isInstalled();
        var newStatus = Utils.extend({}, this.installStatus);
        this.installStatus = Utils.extend(newStatus, statusChanges);
        var isInstalled = this.isInstalled();
        if (oldIsInstalled != isInstalled) {
            this.triggerInstallStatusChange(isInstalled);
        }
        if (newStatus.declared != oldStatus.declared) {
            this.postToMessageFrame({ command: "supernovaplayerstatus", data: { installed: newStatus.declared } });
        }
    }
    triggerInstallStatusChange(installed) {
        //other phases unaffected: switchBrowser, installExtension
        if (installed) {
            switch (this.phase) {
                case "install":
                    this.openGame(false);
                    break;
            }
        }
        else if (!installed) {
            switch (this.phase) {
                case "launch":
                    this.gotoPhase("install");
                    break;
            }
        }
    }
    sendMessageToContentScript(message) {
        var eventInit = {
            data: {
                key: 'supernova-jslauncher-message',
                message: JSON.stringify(message)
            }
        };
        var event = new MessageEvent('supernova-message', eventInit);
        window.dispatchEvent(event);
    }
    supernovaMessageHandler(e) {
        if (!e.data || !e.data.message)
            return;
        if (e.data.key != "supernova-extension-message")
            return;
        var message = null;
        try {
            message = JSON.parse(e.data.message);
        }
        catch (e) {
            return;
        }
        if (!message)
            return;
        this.log("Received " + e.data.key + ": " + JSON.stringify(message));
        switch (message.command) {
            case "requeststatus":
                this.sendMessageToContentScript({
                    command: "status", data: {
                        launchStatus: this.launchStatus
                    }
                });
                break;
            case "status":
                if (message.data) {
                    this.contentScriptStatusReceived = true;
                    if (message.data.launchStatus) {
                        Utils.extend(this.launchStatus, message.data.launchStatus);
                    }
                    if (message.data.extensionStatus) {
                        Utils.extend(this.extensionStatus, message.data.extensionStatus);
                    }
                    this.tryStartup(false);
                }
                break;
        }
    }
    receiveMessage(e) {
        if (!e) {
            e = window.event;
        } //some IE nonsense
        var message = e.data;
        if (typeof (message) === "object") {
            /*if(e.source == window) { //event from content script - not neccesary any longer because of metatagdata
                switch(message.command) {
                    case "superstarter":
                        switch(message.status) {
                            case "started":
                                this.log("Received message: "+message.status+ " data: "+message.data);
                                break;
                        }
                        break;
                }
            } else */
            if (e.origin.endsWith("getsupernova.com") || e.origin == "http://getsupernova.datasvc.dev.bioniclogic.com:8081") { //event from embedded frame or other tab
                switch (message.command) {
                    case "installstatus":
                        this.messageFrameInstallStatusRecieved = true;
                        this.log("Received installstatus from message_frame " + JSON.stringify(message.data));
                        if (message.data) {
                            Utils.extend(this.installStatus, message.data);
                            this.tryStartup(false);
                        }
                        if (message.data && message.data.detected && this.phase == "installing") {
                            this.openGame(false);
                        }
                }
            }
        }
    }
    log(msg) {
        this.log_log.push(msg);
        if (window.location.hash === "#snLog" || window.location.hash === "#snDev") {
            console.log("SuperNova - " + msg);
        }
    }
    getLog() {
        return this.log_log;
    }
    extensionEmbedBar() {
        if (this.targetEl == null)
            return;
        let self = this;
        var height = "100px";
        this.embedBarRootEl = document.createElement("div");
        this.targetEl.insertBefore(this.embedBarRootEl, this.targetEl.children[0]); //Is this right behavior?			
        this.embedBarRootEl.style.position = "relative";
        //this.embedBarRootEl.style.zIndex = "2147483647";
        this.embedBarRootEl.style.width = this.width.toString() + "px";
        this.embedBarRootEl.style.display = "none";
        //let cssEl = document.createElement("style");
        //cssEl.type = "text/css";
        //cssEl.innerHTML = this.getCss();
        //document.getElementsByTagName('head')[0].appendChild(cssEl);
        let iframe = document.createElement("iframe");
        iframe.id = "supernovaplayeriframe";
        iframe.scrolling = "no";
        iframe.style.position = "absolute";
        iframe.style.boxShadow = "0px 2px 3px 0px";
        if (this.width) {
            iframe.width = this.width.toString();
        }
        iframe.height = height;
        this.embedBarRootEl.appendChild(iframe);
        iframe.style.border = "0";
        let iframe_doc = iframe.contentWindow.document;
        iframe.src = "about:blank";
        iframe_doc.open();
        //FIXME: replace with new template
        let iframe_innards = `<html><head><style>` + this.getExtensionEmbedBarCss() + `</style></head><body>` + this.getExtensionEmbedBarTemplate() + `</body></html>`;
        iframe.contentWindow.window['superNova'] = this;
        iframe_doc.write(iframe_innards);
        iframe_doc.close();
        let rootIframeDoc = iframe.contentWindow.document;
        iframe.onload = function () {
            self.embedBarRootEl.style.display = "block";
            let r = rootIframeDoc;
            let gameicon = r.querySelector("#game_icon");
            let gameiconDesc = r.querySelector("#game_icon_desc");
            gameicon.style.display = "inline-block";
            gameicon.width = gameicon.height = 0;
            if (!self.gameTitle) {
                gameiconDesc.innerHTML = " requires a .SWF player";
                //gameiconline.innerText = "This site requires a .SWF"
            }
            else {
                gameiconDesc.innerHTML = " presents: <b>" + self.gameTitle + "</b>";
            }
            if (self.gameIcon) {
                gameicon.src = self.gameIcon;
            }
            else {
                gameicon.src = self.partnerlogo ? self.partnerlogo : self.getFaviconUrl();
            }
            gameicon.onload = function () {
                gameicon.width = gameicon.height = 16;
            };
            if (!self.partnerlogo) {
                let plogo = r.querySelector("#partnerlogo");
                plogo.src = self.getFaviconUrl();
            }
        };
    }
    extensionPrompt() {
        let self = this;
        var width = "316px";
        var height = "350px";
        this.promptRootEl = document.createElement("div");
        this.promptRootEl.style.position = "fixed";
        this.promptRootEl.style.display = "none";
        this.promptRootEl.style.zIndex = "2147483647";
        this.promptRootEl.style.left = "140px";
        this.promptRootEl.style.top = "0px";
        this.promptRootEl.style.width = width;
        this.promptRootEl.style.height = height;
        this.promptRootEl.style.boxShadow = "0px 2px 3px 0px";
        document.body.appendChild(this.promptRootEl);
        let iframe = document.createElement("iframe");
        iframe.id = "supernovaextensionpromptiframe";
        iframe.scrolling = "no";
        iframe.width = width;
        iframe.height = height;
        this.promptRootEl.appendChild(iframe);
        iframe.style.border = "0";
        let iframe_doc = iframe.contentWindow.document;
        iframe.src = "about:blank";
        iframe_doc.open();
        let iframe_innards = `<html><head><style>` + this.getExtensionPromptCss() + `</style></head><body>` + this.getExtensionPromptTemplate() + `</body></html>`;
        iframe.contentWindow.window['superNova'] = this;
        iframe_doc.write(iframe_innards);
        iframe_doc.close();
        let rootIframeDoc = iframe.contentWindow.document;
        iframe.onload = function () {
            self.promptRootEl.style.display = "block";
            let r = rootIframeDoc;
            let gameicon = r.querySelector("#game_icon");
            let gameiconDesc = r.querySelector("#game_icon_desc");
            gameicon.style.display = "inline-block";
            gameicon.width = gameicon.height = 0;
            if (!self.gameTitle) {
                gameiconDesc.innerText = "This site requires a .SWF player";
                //gameiconline.innerText = "This site requires a .SWF"
            }
            else {
                gameiconDesc.innerText = self.gameTitle + " requires a .SWF player";
            }
            if (self.gameIcon) {
                gameicon.src = self.gameIcon;
            }
            else {
                gameicon.src = self.getFaviconUrl();
            }
            gameicon.onload = function () {
                gameicon.width = gameicon.height = 16;
            };
            if (!self.partnerlogo) {
                let plogo = r.querySelector("#partnerlogo");
                plogo.src = self.getFaviconUrl();
            }
        };
    }
    init() {
        if (!this.setup())
            return;
        if (window.location.hash === "#snAddr" || window.location.hash === "#snDev" || window.location.href.startsWith("http://getsupernova.datasvc.dev.bioniclogic.com:8081/")) {
            this.adplaygroundbaseurl = "http://adplayground.datasvc.dev.bioniclogic.com:8081";
            this.wwwBaseUrl = "http://getsupernova.datasvc.dev.bioniclogic.com:8081/";
            this.imageUrl = this.wwwBaseUrl + "/images";
            this.supernovadownloadurl = this.wwwBaseUrl + "/SuperNovaSetup.exe";
        }
        if (this.mode === Mode.extensionPrompt) {
            if (Utils.getBrowserInfo().name != "Chrome" && !this.forceExtensionPrompt)
                return;
            if (this.extensionStatus && this.extensionStatus.extension && !this.forceExtensionPrompt)
                return;
            if (this.dropdown !== false) {
                this.extensionPrompt();
            }
            if (this.embedbar !== false) {
                this.extensionEmbedBar();
            }
            return;
        }
        if (Utils.getOS() != Utils.devices.WINDOWS && Utils.getBrowserInfo().name == "Chrome") {
            this.mode = Mode.extensiononly;
        }
        this.rootEl = document.createElement("div");
        this.targetEl.parentNode.replaceChild(this.rootEl, this.targetEl); //Is this right behavior?			
        //let cssEl = document.createElement("style");
        //cssEl.type = "text/css";
        //cssEl.innerHTML = this.getCss();
        //document.getElementsByTagName('head')[0].appendChild(cssEl);
        let iframe = document.createElement("iframe");
        iframe.id = "supernovaplayeriframe";
        iframe.scrolling = "no";
        if (this.width) {
            iframe.width = this.width.toString();
        }
        if (this.height) {
            iframe.height = this.height.toString();
        }
        this.rootEl.appendChild(iframe);
        iframe.style.border = "0";
        let iframe_doc = iframe.contentWindow.document;
        iframe.src = "about:blank";
        iframe_doc.open();
        let iframe_innards = `<html><head><style>` + this.getCss() + `</style></head><body>` + this.getTemplate() + `</body></html>`;
        iframe.contentWindow.window['superNova'] = this;
        iframe_doc.write(iframe_innards);
        iframe_doc.close();
        this.rootIframe = iframe;
        this.rootIframeDoc = iframe.contentWindow.document;
        let self = this;
        iframe.onload = function () {
            let bi = Utils.getBrowserInfo();
            let os = Utils.getOS();
            var installed = self.isInstalled();
            if (os === Utils.devices.WINDOWS) {
                if (installed == null) {
                    self.gotoPhase("install");
                }
                else {
                    //self.gotoPhase("launch");
                    setTimeout(self.openGame.bind(self), 100);
                }
            }
            else {
                if (bi.name === "Chrome") {
                    self.gotoPhase("installExtension");
                }
                else {
                    self.gotoPhase("switchBrowser");
                    //self.whatsBroke = "browser, " + bi.name + ",";
                }
            }
            {
                let game_alticon = self.rootIframeDoc.querySelector("#game_icon_alt");
                let game_icon = self.rootIframeDoc.querySelector("#game_icon");
                if (self.gameIcon) {
                    game_alticon.style.display = "none";
                    game_icon.style.display = "block";
                    game_icon.src = self.gameIcon;
                }
                if (!self.gameTitle) {
                    let gameicon_desc = self.rootIframeDoc.querySelector("#game_icon_desc");
                    gameicon_desc.style.display = "none";
                    game_alticon.style.display = "none";
                }
                let gt = self.gameTitle;
                let parts = gt.split(" ");
                if (parts[0]) {
                    gt = parts[0].slice(0, 1);
                    if (parts[1]) {
                        gt += parts[1].slice(0, 1);
                    }
                }
                if (!gt) {
                    gt = "S";
                }
                game_alticon.innerText = gt;
                if (!self.partnerlogo) {
                    //let plogo = <HTMLElement>self.rootIframeDoc.querySelector("#partnerlogo");
                    //plogo.style.display = "none";
                }
            }
            let imgs = self.rootIframeDoc.querySelectorAll(".partnerlogo");
            imgs.forEach(function (e) {
                e.width = e.height = 0;
                if (self.partnerlogo) {
                    e.src = self.partnerlogo;
                }
                else {
                    e.src = self.getFaviconUrl();
                }
                e.onload = function () {
                    e.width = e.height = 32;
                };
            });
            if (self.mode == Mode.extensiononly) {
                self.gotoPhase("mode_extensiononly");
            }
            else if (self.mode == Mode.normal) {
                self.gotoPhase("mode_normal");
            }
            self.loadSlides();
        };
    }
    getFaviconUrl() {
        return window.location.origin + "/favicon.ico";
    }
    hasFlashPlayerVersion(flashver) {
        let fv = flashver.split(".");
        let a = this.getFlashPlayerVersion();
        let keys = Object.keys(a);
        for (let i = 0; i < 3; i++) {
            fv[i] = parseInt(fv[i] || 0);
        }
        return ((fv[0] <= a.major) || (fv[0] === a.major && fv[1] <= a.minor)) || (fv[0] === a.major && fv[1] === a.minor && fv[2].release <= a.release);
    }
    hasBrowserVersion(targetBrowsers) {
        let info = Utils.getBrowserInfo();
        return undefined !== targetBrowsers.find(function (b) { return info.name === b.name && info.majorversion >= b.majorversion; });
    }
    checkOptions(options) {
        if (options.targetos) {
            let os = Utils.getOS();
            if (options.targetos.indexOf(os) < 0)
                return false;
        }
        if (options.targetbrowsers) {
            let info = Utils.getBrowserInfo();
            if (this.hasBrowserVersion(options.targetbrowsers)) {
                this.log("Browser " + JSON.stringify(info) + " OK");
            }
            else {
                this.log("Browser " + JSON.stringify(info) + " FAILED version check");
                return false;
            }
        }
        if (options.flashver && !options.force) {
            let a = this.getFlashPlayerVersion();
            if (!this.hasFlashPlayerVersion(options.flashver)) {
                this.log("Flashplayer " + JSON.stringify(a) + " OK");
            }
            else {
                this.log("Flashplayer " + JSON.stringify(a) + " FAILED version check");
                return false;
            }
        }
        else {
            let fp = this.getFlashPlayerVersion();
            //return (fp.major == 0 && fp.minor == 0 && fp.release == 0);
        }
        return true;
    }
    getExtensionStatus(cb) {
        let extensionId = "mhmphnocemakkjdampibehejoaleebpo"; //Production ExtensionId
        //let extensionId = "hdohhnglndeaknkdbfojdmoanidnajid"; //Development. Change to SuperNova Helper extensionId for testing.
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
            if (this.status == 200) {
                cb(true);
            }
            else {
                cb(false);
            }
        });
        xhr.addEventListener('error', function () {
            cb(false);
            setImmediate(function () { console.log("SuperNova - Browser Extension not detected"); });
        });
        xhr.open("GET", "chrome-extension://" + extensionId + "/enabler.html", true);
        xhr.send();
    }
    launch(options) {
        let flashver = this.getFlashPlayerVersion();
        /* THIS is in playHelper
        if((!options.flashver && flashver.major + flashver.minor + flashver.release > 0) || (options.flashver && this.hasFlashPlayerVersion(options.flashver))){
            let game = {
                url: window.location.href,
                title: options.title,
                publishericon: options.partnerlogo,
                iconurl:options.icon
            }
    
            this.sendMessageToContentScript({ command: "loggame", data: game });
        }*/
        if (Utils.intersection([Utils.getOS()], [Utils.devices.MAC, Utils.devices.WINDOWS, Utils.devices.LINUX]).length == 0) {
            return false;
        }
        if (Utils.getOS() != Utils.devices.WINDOWS && Utils.getBrowserInfo().name != "Chrome") {
            return false;
        }
        if (options == null)
            options = {};
        if (typeof (options.flashver) === "undefined")
            options.flashver = "9";
        if (!this.checkOptions(options))
            return false;
        this.embedbar = options.embedbar;
        this.dropdown = options.dropdown;
        this.forceExtensionPrompt = options.force;
        this.partnerlogo = options.partnerlogo ? options.partnerlogo : null;
        this.partnerid = options.partnerid ? options.partnerid : null;
        this.gameTitle = "";
        this.pageUrl = options.pageurl ? options.pageurl : window.location.href;
        if (options.el || options.id) {
            this.targetEl = options.el ? options.el : (options.id ? document.getElementById(options.id) : null);
            if (options.width) {
                this.width = parseInt("" + options.width);
            }
            else if (this.targetEl != null) {
                if (this.targetEl.clientWidth) {
                    this.width = this.targetEl.clientWidth;
                }
                else if (this.targetEl.width) {
                    this.width = this.targetEl.width;
                }
                else if (this.targetEl.style.width) {
                    this.width = parseInt(this.targetEl.style.width);
                }
            }
            if (options.height) {
                this.height = parseInt("" + options.height);
            }
            else if (this.targetEl != null) {
                if (this.targetEl.clientHeight) {
                    this.height = this.targetEl.clientHeight;
                }
                else if (this.targetEl.height) {
                    this.height = this.targetEl.height;
                }
                else if (this.targetEl.style.height) {
                    this.height = parseInt(this.targetEl.style.height);
                }
            }
        }
        else {
            let splashObject = Utils.getSplashObject();
            if (splashObject) {
                this.targetEl = splashObject.objectEl;
                this.height = splashObject.height;
                this.width = splashObject.width;
                this.swfUrl = splashObject ? splashObject.url : null;
                this.flashvars = splashObject ? splashObject.flashvars : null;
            }
        }
        if (options.flashvars)
            this.flashvars = options.flashvars;
        if (options.title)
            this.gameTitle = options.title;
        if (options.swfurl)
            this.swfUrl = options.swfurl;
        if (options.icon)
            this.gameIcon = options.icon;
        if (options.partnerlogo)
            this.partnerlogo = options.partnerlogo;
        if (options.slideorder)
            this.slideorder = options.slideorder;
        if (options.mode) {
            this.mode = options.mode; //init may overwrite mode based on the os and browser
        }
        //false no autoplay    undefined and true autoplay 
        if (options.autoplay !== false) {
            this.autoplay = options.autoplay;
            this.setLaunchStatus({ launchStatus: "aborted", launchType: "auto", launchMethod: "options" });
        }
        if (this.targetEl == null && this.mode !== Mode.extensionPrompt) {
            this.log("Supernova - Failed to find target element");
            return false;
        }
        this.init();
    }
    reinstall() {
        //window.localStorage.removeItem('supernovainstall');
        this.setInstallStatus({ declared: false });
        this.gotoPhase("install");
    }
    getTitle() {
        return this.gameTitle;
    }
    downloadExtension_onclick() {
        window.open(this.chromewebstoreurl, "_blank");
    }
    learnMore_onclick() {
        window.open(this.wwwBaseUrl + "/about/", "_blank");
    }
    downloadsplashplayer_onclick() {
        this.phase = "installing";
        window.location.href = this.supernovadownloadurl;
        let downloadbutton = this.rootIframeDoc.querySelector(".installnowbutton");
        downloadbutton.style.display = "none";
        let installProgress = this.rootIframeDoc.querySelector("#downloadprogress");
        let part_downloaded = this.rootIframeDoc.querySelector("#part_installed");
        let s_download_spacer = this.rootIframeDoc.querySelector(".gamecaption");
        installProgress.style.display = "block";
        setTimeout(function () {
            installProgress.style.display = "none";
            s_download_spacer.style.display = "none";
            part_downloaded.style.display = "block";
        }, 2500);
    }
    playHelper(swfUrl, flashvars, launchType, success, fail) {
        var self = this;
        var launchStatus = this.getLaunchStatus();
        if (launchStatus.launchStatus == "started" && launchType != "manual") {
            this.log("Automatic launch blocked because already started");
            return; //Don't allow multiple la"aborted"unches unless user initiated (manual)
        }
        var playCommand = "play?swfurl=" + encodeURIComponent(swfUrl) + "&flashvars=" + encodeURIComponent(flashvars) + '&pageurl=' + encodeURIComponent(self.pageUrl);
        //adds game to, or increments playcount of extension bookmarks
        let game = {
            url: window.location.href,
            title: this.gameTitle,
            publishericon: this.partnerlogo,
            iconurl: this.gameIcon
        };
        //this.sendMessageToContentScript({ command: "loggame", data: game });
        if (this.extensionStatus && this.extensionStatus.superstarter && this.extensionStatus.extension) {
            this.postToMessageFrame({ command: "superstarter", data: playCommand });
            self.log("Launching SuperNova via superstarter!");
            launchStatus = this.setLaunchStatus({
                launchStatus: "started",
                launchType: launchType,
                launchMethod: "superstarter"
            });
            success();
        }
        else if (this.installStatus && (this.installStatus.declared || this.installStatus.detected)) {
            Utils.openSchemeUri("supernova://" + playCommand);
            self.log("Launching SuperNova via scheme!");
            launchStatus = this.setLaunchStatus({
                launchStatus: "started",
                launchType: launchType,
                launchMethod: "scheme"
            });
            success();
            var launchHint = this.rootIframeDoc.getElementsByClassName("launchHint")[0];
            if (launchHint)
                launchHint.style.display = "block";
        }
        else {
            launchStatus = this.setLaunchStatus({
                launchStatus: "failed",
                launchType: launchType
            });
            self.log("Failed to start SuperNova");
            fail();
        }
    }
    play(options, callback = () => { }) {
        if (!this.checkOptions(options))
            return;
        if (!this.setup())
            return;
        this.swfUrl = options.swfurl;
        this.gameTitle = options.title;
        //parseInt accepts both string and int.. ts shouldn't be mad
        //@ts-ignore
        this.width = parseInt(options.width);
        //@ts-ignore
        this.height = parseInt(options.height);
        let self = this;
        this.playHelper(this.swfUrl, this.flashvars, "auto", function () {
            callback({ success: true });
        }, function () { callback({ success: false }); });
    }
    downloadPlayer() {
        window.location.href = this.supernovadownloadurl;
        return false;
    }
    installExtension() {
        this.sendClickEvent();
        window.open(this.chromewebstoreurl, "_blank");
        //window.open(this.wwwBaseUrl + "/extension/");
        return false;
    }
    openGame(manual) {
        var self = this;
        if (manual) {
            this.setInstallStatus({ declared: true });
            //window.localStorage.setItem('supernovainstall', '{"installed":true}');
        }
        if (!self.swfUrl)
            return;
        this.playHelper(this.swfUrl, this.flashvars, manual ? "manual" : "auto", function () {
            self.gotoPhase("launch"); //Goto success phase
        }, function () {
            self.gotoPhase("install"); //Goto install phase
        });
    }
    gotoPhase(phase) {
        var self = this;
        this.phase = phase;
        //var p1_extension = <HTMLElement>this.rootIframeDoc.querySelector("#slide_install_chrome_extension");
        //var p1_broke = <HTMLElement>this.rootIframeDoc.querySelector("#slide_enable_flashplayer")
        var p2 = this.rootIframeDoc.querySelector("#part2");
        //var p1 = <HTMLElement>this.rootIframeDoc.querySelector("#slide_install_supernova");
        //p1_extension.style.display = "none";
        //p1_broke.style.display = "none";
        //p1.style.display = "none";
        p2.style.display = "none";
        switch (phase) {
            case "mode_extensiononly": {
                let install_frame_top = self.rootIframeDoc.querySelector("#install_frame_top_normal");
                let install_frame_top_extension = self.rootIframeDoc.querySelector("#install_frame_top_extension");
                install_frame_top.style.display = "none";
                install_frame_top_extension.style.display = "block";
                break;
            }
            case "mode_normal": {
                let install_frame_top = self.rootIframeDoc.querySelector("#install_frame_top_normal");
                let install_frame_top_extension = self.rootIframeDoc.querySelector("#install_frame_top_extension");
                install_frame_top.style.display = "block";
                install_frame_top_extension.style.display = "none";
                break;
            }
            case "installExtension": {
                //p1_extension.style.display = "block";
                var launch_frame = this.rootIframeDoc.querySelector("#launch_frame");
                if (launch_frame)
                    launch_frame.style.display = "none";
                var install_frame = this.rootIframeDoc.querySelector("#install_frame");
                if (install_frame)
                    install_frame.style.display = "block";
                break;
            }
            case "switchBrowser": {
                //p1_broke.style.display = "block";
                var launch_frame = this.rootIframeDoc.querySelector("#launch_frame");
                if (launch_frame)
                    launch_frame.style.display = "none";
                var install_frame = this.rootIframeDoc.querySelector("#install_frame");
                if (install_frame)
                    install_frame.style.display = "block";
                break;
            }
            case "install": {
                let downloadbutton = this.rootIframeDoc.querySelector(".installnowbutton");
                downloadbutton.style.display = "inline";
                let installProgress = this.rootIframeDoc.querySelector("#downloadprogress");
                let part_downloaded = this.rootIframeDoc.querySelector("#part_installed");
                let s_download_spacer = this.rootIframeDoc.querySelector(".gamecaption");
                installProgress.style.display = "none";
                part_downloaded.style.display = "none";
                s_download_spacer.style.display = "block";
                //reset download button just in case
                //p1.style.display = "block";
                var launch_frame = this.rootIframeDoc.querySelector("#launch_frame");
                if (launch_frame)
                    launch_frame.style.display = "none";
                var install_frame = this.rootIframeDoc.querySelector("#install_frame");
                if (install_frame)
                    install_frame.style.display = "block";
                break;
            }
            case "launch":
                var launch_frame = this.rootIframeDoc.querySelector("#launch_frame");
                if (launch_frame)
                    launch_frame.style.display = "block";
                var install_frame = this.rootIframeDoc.querySelector("#install_frame");
                if (install_frame)
                    install_frame.style.display = "none";
                setTimeout(function () {
                    var splashLaunchTitle = self.rootIframeDoc.querySelector(".splashLaunchTitle");
                    if (splashLaunchTitle)
                        splashLaunchTitle.innerHTML = "Now Playing " + self.getTitle() + "!";
                    var launch_progressbar = self.rootIframeDoc.querySelector("#launch_progressbar");
                    if (launch_progressbar)
                        launch_progressbar.style.display = "none";
                }, 2000);
                break;
        }
    }
    reloadWindow() {
        window.location.reload();
    }
    /* end SWFObject */
    getExtensionEmbedBarTemplate() {
        return extensionEmbedBarTemplate(this);
    }
    getExtensionEmbedBarCss() {
        return extensionEmbedBarCss(this);
    }
    getExtensionPromptTemplate() {
        return extensionPromptTemplate(this);
    }
    getExtensionPromptCss() {
        return extensionPromptCss(this);
    }
    closeExtensionEmbedBar() {
        if (this.embedBarRootEl != null) {
            this.embedBarRootEl.style.display = "none";
            this.embedBarRootEl.parentNode.removeChild(this.embedBarRootEl);
        }
    }
    closeExtensionPrompt() {
        if (this.promptRootEl != null) {
            this.promptRootEl.style.display = "none";
            this.promptRootEl.parentNode.removeChild(this.promptRootEl);
        }
    }
    getFlashPlayerVersion() {
        return { major: this.ua.pv[0], minor: this.ua.pv[1], release: this.ua.pv[2] };
    }
    getTemplate() {
        return template(this);
        this.showSlide(this.curSlide);
    }
    getOS() {
        return Utils.getOS();
    }
    getLanguage() {
        return Utils.getLanguage();
    }
    getBrowserInfo() {
        return Utils.getBrowserInfo();
    }
    getCss() {
        return css(this);
    }
    nextSlide() {
        this.showSlide(this.curSlide + 1);
        return false;
    }
    showSlide(n) {
        let self = this;
        n = n % this.slides.length;
        this.slides.forEach(function (s) {
            self.rootIframeDoc.querySelector("#slide_" + s).style.display = "none";
        });
        let loopbreaker = 0;
        while (self.rootIframeDoc.querySelector("#slide_" + this.slides[n]).getAttribute("showslide")
            != "true" && loopbreaker < this.slides.length) {
            n = (n + 1) % this.slides.length;
            loopbreaker++;
        }
        self.rootIframeDoc.querySelector("#slide_" + this.slides[n]).style.display = "block";
        this.curSlide = n;
    }
    loadSlides() {
        //reset the slides
        //find allowed slides for os and browser
        this.slides = [];
        let os = Utils.getOS();
        let browser = Utils.getBrowserInfo().name;
        if (browser == "Firefox") {
            this.rootIframeDoc.querySelector(".enable_flash_header").style.display = "none";
            this.rootIframeDoc.querySelector(".enable_flash_button").style.display = "none";
            this.rootIframeDoc.querySelector(".firefox_install_flash_header").style.display = "inline";
            this.rootIframeDoc.querySelector(".firefox_install_flash_button").style.display = "inline-block";
        }
        if (this.mode == Mode.extensiononly) {
            this.slides = ["enable_flashplayer"];
        }
        else {
            let ossm = this.osSlideMap[os] || this.osSlideMap["other"];
            let bsm = this.browserSlideMap[browser] || this.browserSlideMap["other"];
            this.slides = Utils.intersection(ossm, bsm);
        }
        if (this.slideorder) {
            this.setSlideOrder(this.slideorder);
        }
        //mark slides that should be shown\
        this.slides.forEach((s) => {
            let slide = this.rootIframeDoc.getElementById("slide_" + s);
            slide.setAttribute("showslide", "true");
        });
        this.showSlide(0);
        if (this.slides.length <= 1) {
            let moreoptions = this.rootIframeDoc.querySelectorAll(".moreOptions");
            moreoptions.forEach(function (a) {
                a.style.display = "none";
            });
        }
    }
    setSlideOrder(slides) {
        this.slides = Utils.intersection(slides, this.slides);
    }
    sendClickEvent(clicktype = "default") {
        fetch(this.wwwBaseUrl + "www/jsbin/click.js?publisherid=" + (this.partnerid ? this.partnerid : 0) + "&url=" + encodeURI(window.location.href));
    }
}
if (window.supernova == null) {
    exports.G = new SuperNova();
    window.supernova = exports.G;
    window.supernova.launch({ autoplay: true, mode: "normal" });
}
else {
    window.supernova.launch({ autoplay: true, mode: "normal" });
}


/***/ }),

/***/ 328:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const languages_1 = __webpack_require__(934);
function extend(dst, src) {
    var keys = Object.keys(src);
    for (var k = 0; k < keys.length; k++) {
        var key = keys[k];
        dst[key] = src[key];
    }
    return dst;
}
exports.extend = extend;
function openSchemeUri(uri) {
    var iframe = createIframe(document.body, "about:blank");
    iframe.contentWindow.location.href = uri;
    /*var timeout = setTimeout(function () {
        fail();
        window.removeEventListener("blur", onBlur);
    }, 1000);*/
    /*function onBlur() {
        console.log("blurred");
        //clearTimeout(timeout);
        window.removeEventListener("blur", onBlur);
        success();
    }*/
    /*
    var installdata = window.localStorage.getItem("supernovainstall");
    if (installdata != null) {
        //if (true ) {			 //navigator.userAgent.indexOf("Firefox") > 0
        var iframe = createIframe(document.body, "about:blank");
        iframe.contentWindow.location.href = uri;
        //} else {
        //	window.location = uri;
        //window.addEventListener("blur", onBlur);
        //}
        success();
    } else {
        fail();
    }*/
}
exports.openSchemeUri = openSchemeUri;
function getBestObjectEl() {
    var embeds = document.getElementsByTagName("object");
    var maxembed = null;
    var maxembedwidth = 300;
    var maxembedheight = 200;
    for (var i = 0; i < embeds.length; i++) {
        var embed = embeds[i];
        var w = (embed.width.indexOf("%") < 0) ? parseInt(embed.width) : embed.clientWidth;
        var h = (embed.height.indexOf("%") < 0) ? parseInt(embed.height) : embed.clientHeight;
        if (w > maxembedwidth && h > maxembedheight) {
            maxembedwidth = parseInt(embed.width);
            maxembedheight = parseInt(embed.height);
            maxembed = embed;
        }
    }
    return maxembed;
}
exports.getBestObjectEl = getBestObjectEl;
function toAbsoluteUrl(rel) {
    var protoHost = window.location.protocol + "//" + window.location.host;
    if (rel.indexOf("//") >= 0)
        return rel;
    else if (rel[0] == "/")
        return protoHost + rel;
    else {
        var pathLastSlash = window.location.pathname.lastIndexOf("/");
        var parts = (pathLastSlash > 0) ? window.location.pathname.slice(0, pathLastSlash).split("/") : [];
        parts = parts.concat(rel.split("/"));
        var final = [];
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            if (p == ".")
                continue;
            else if (p == "..")
                final.pop();
            else
                final.push(p);
        }
        return protoHost + final.join("/");
    }
}
var bestObjectEl = null;
function getSplashObject() {
    if (bestObjectEl == null)
        bestObjectEl = getBestObjectEl();
    if (bestObjectEl) {
        var bestEmbed = bestObjectEl.querySelector("embed");
        var flashvarsEl = bestObjectEl.querySelector("param[name=flashvars],param[name=Flashvars],param[name=flashVars],param[name=FlashVars]");
        var movieUrl = bestEmbed != null ? bestEmbed.src : null;
        if (movieUrl == null) {
            movieUrl = bestObjectEl.getAttribute("data");
            if (movieUrl == null) {
                var movieEl = bestObjectEl.querySelector("param[name=movie],param[name=Movie]");
                if (movieEl != null) {
                    movieUrl = movieEl.getAttribute("value");
                }
            }
        }
        if (movieUrl == null)
            return null;
        var flashvars = "";
        if (flashvarsEl) {
            flashvars = flashvarsEl.value;
        }
        if (flashvars === "") {
            flashvars = bestObjectEl.getAttribute("flashvars");
        }
        var w = (bestObjectEl.width.indexOf("%") < 0) ? parseInt(bestObjectEl.width) : bestObjectEl.clientWidth;
        var h = (bestObjectEl.height.indexOf("%") < 0) ? parseInt(bestObjectEl.height) : bestObjectEl.clientHeight;
        return {
            width: w,
            height: h,
            url: toAbsoluteUrl(movieUrl),
            objectEl: bestObjectEl,
            flashvars: flashvars,
            pageUrl: window.location.href
        };
    }
    return null;
}
exports.getSplashObject = getSplashObject;
function createIframe(target, uri) {
    var iframe = document.createElement("iframe");
    iframe.src = uri;
    iframe.style.display = "none";
    target.appendChild(iframe);
    return iframe;
}
exports.createIframe = createIframe;
/*	document.createElement = function (create) {
        return function () {
            var ret = create.apply(this, arguments);
            if (ret.tagName.toLowerCase() === "iframe") {
                ret.sandbox = 'allow-forms allow-scripts allow-same-origin';
            }
            return ret;
        }
    }(document.createElement.bind(document));
*/
exports.devices = {
    ANDROID: "android",
    BLACKBERRY: "blackberry",
    IPAD: "ipad",
    IPHONE: "iphone",
    IPOD: "ipod",
    MOBILE: "mobile",
    NOKIA: "nokia",
    SYMBIAN: "symbian",
    WINDOWS_PHONE: "windows phone",
    WINDOWS: "windows",
    MAC: "macintosh",
    LINUX: "linux",
    OTHER: "other",
};
function getOS() {
    //return devices.MAC;
    //return "Supernova OS";
    let MOBILE_ARRAY = [exports.devices.ANDROID, exports.devices.BLACKBERRY, exports.devices.IPAD, exports.devices.IPHONE, exports.devices.IPOD, exports.devices.MOBILE, exports.devices.NOKIA, exports.devices.SYMBIAN, exports.devices.WINDOWS_PHONE];
    //let DESKTOP_ARRAY = [devices.WINDOWS, devices.MAC, devices.LINUX];
    let userAgent = window.navigator.userAgent ? window.navigator.userAgent.toLowerCase() : null;
    if (userAgent != null) {
        for (let i = 0; i < MOBILE_ARRAY.length; i++) {
            if (userAgent.indexOf(MOBILE_ARRAY[i]) >= 0)
                return MOBILE_ARRAY[i];
        }
        if (userAgent.indexOf(exports.devices.WINDOWS) >= 0)
            return exports.devices.WINDOWS;
        else if (userAgent.indexOf(exports.devices.MAC) >= 0)
            return exports.devices.MAC;
        else if (userAgent.indexOf(exports.devices.LINUX)
            >= 0)
            return exports.devices.LINUX;
    }
    else
        return exports.devices.OTHER;
}
exports.getOS = getOS;
function getBrowserInfo() {
    var userAgent = navigator.userAgent;
    var browserName = navigator.appName;
    var browserVersion = "" + navigator.appVersion;
    var majorVersion = parseInt(navigator.appVersion);
    var browsers = [
        { code: "OPR/", name: "Opera", verPos: 0, },
        { code: "Opera", versionStr: "Version", name: "Opera" },
        { code: "MSIE", name: "IE" },
        { code: "Chrome", name: "Chrome" },
        { code: "Safari", versionStr: "Version", name: "Safari" },
        { code: "Firefox", name: "Firefox" }
    ];
    for (var i = 0; i < browsers.length; i++) {
        var browser = browsers[i];
        var nameIndex = userAgent.indexOf(browser.code);
        if (nameIndex >= 0) {
            browserName = browser.name;
            browserVersion = userAgent.slice(nameIndex + browser.code.length + (browser.verPos ? browser.verPos : 1));
            if (browser.versionStr) {
                var verIndex = browserVersion.indexOf(browser.versionStr);
                if (verIndex) {
                    browserVersion = browserVersion.slice(verIndex);
                }
            }
            browserVersion = browserVersion.trim();
            var versionEndIndex = browserVersion.indexOf(";");
            if (versionEndIndex < 0)
                versionEndIndex = browserVersion.indexOf(" ");
            if (versionEndIndex >= 0)
                browserVersion = browserVersion.slice(0, versionEndIndex);
            browserVersion = browserVersion.trim();
            majorVersion = parseInt(browserVersion);
            break;
        }
    }
    return {
        name: browserName,
        versionStr: browserVersion,
        majorversion: majorVersion
    };
}
exports.getBrowserInfo = getBrowserInfo;
function getLanguage() {
    var lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    if (lang != null) {
        lang = lang.split("-");
        if (lang.length) {
            lang = lang[0];
            if (lang && languages_1.default[lang]) {
                return languages_1.default[lang].en;
            }
        }
    }
    return "English";
}
exports.getLanguage = getLanguage;
/**
 * preserves ordering of first array
 * @param args
 */
function intersection(...args) {
    let intersection = [...args[0]];
    for (let i = 1; i < args.length; i++) {
        let a = args[i];
        for (let n = 0; n < intersection.length; n++) {
            let remove = true;
            for (let j = 0; j < a.length; j++) {
                if (intersection[n] === a[j]) {
                    remove = false;
                    break;
                }
            }
            if (remove) {
                intersection.splice(n, 1);
                n--;
            }
        }
    }
    return intersection;
}
exports.intersection = intersection;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(64);
/******/ 	
/******/ })()
;