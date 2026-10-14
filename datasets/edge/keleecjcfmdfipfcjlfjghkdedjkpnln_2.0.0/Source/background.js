// TODO v196技术负债: 由于缺少注入路由机制, 叠加360极速X等非主流版本的适配后, 注入路由相关代码需在v197重构掉
//
const LOGO_BLOB_KEY    = "logo_file_blob";
const DEFAULT_LOGO_URI = "default_logo.png";
const DEFAULT_THEMETEMPLATE    = "totoro";

const THEME_OPTION     = {
	"totoro":{
		default_logo_uri : "default_logo.png",
        support_config   : true
	},
	"teto":{
		default_logo_uri : false,
        support_config   : true 
	}
}

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.storage.local.set({ switch:true , themeTemplate: DEFAULT_THEMETEMPLATE});
        // demostrate after install
        chrome.tabs.create({ url: "https://toast.pub/washbaidu/landing.html?v=198" });
    }
    // TODO analyzing compatibility
    if (details.reason === "update"){
        chrome.storage.local.get(["themeTemplate"], (config)=>{
            if ( !config.themeTemplate ) {
                chrome.storage.local.set({ themeTemplate: DEFAULT_THEMETEMPLATE});
            }
        });
    }
    // 其它事件:https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
    chrome.runtime.setUninstallURL('https://wj.qq.com/s2/10839694/523e/');
});

async function hasInjected(tabId){
    let exec =  await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func  : async () => {
                    return window.document['isWashbaiduThemeEnabled'] || false;
                }
    });
    if(exec[0]){
        // Tricky 为什么要判别 == ture
        // 不同内核版本的exec[0].result返回不同:有些返回{}, 有些返回明确的结果. 这里只有明确返回true时,才确定是有过注入
        return exec[0].result == true;
    }
    return false;
}

async function hasHostPermission(tab){
    if (!tab){
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    }
    // TODO : tricky way to avoid subdomain injection , a subdomain-mapping manicheanism was expected in the furture
    if(!tab || !tab.url){
       return false;
    }
    // TODO : tricky
    if( tab.url == "https://www.baidu.com/more/"
	    ||
    	tab.url == "https://www.baidu.com/my/index"){
	    return false;
    }

    // tricky: 排除链接跳转
    if(tab.url.startsWith('https://www.baidu.com/link?url=')){
        return false;
    }

    return !!tab.url.match(/.*\:\/\/(www\.)?baidu\.com\/.*/ig);
}

async function hasStaticInjection(tab){
    if (!tab){
        [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    }
    return await chrome.permissions.contains({ 
            origins:[ tab.url ]
        }
    );
}

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    // not a valid tab
    if( !tab.url ){
        return;
    }

    if (changeInfo.status == 'loading') { // inject style asap
      try{
        // switch on 
        let cfg = await chrome.storage.local.get(["switch", "themeConfig", "themeTemplate", LOGO_BLOB_KEY ]);
        if( !cfg.switch ){
            return;
        }
        // check permission and renderring
        let themeTemplate = cfg.themeTemplate || DEFAULT_THEMETEMPLATE;
        let hasPermission = hasHostPermission(tab);
	    let injected      = await hasInjected(tabId); // 在列表页连续搜索时, 界面不会硬刷新,但会触发loading事件, 避免重复注入
        if (await hasPermission && !injected ){
            // 采用await后, 显著的减少了css闪烁的问题 
            initLogo(tabId, cfg); 
            await changeTheme(tabId, null , themeTemplate, cfg);
        }
      }finally{
        // chrome.scripting.removeCSS({ css:  HIDDEN_CSS, target: { tabId: tabId } });
        displayBody(tab);
      }
    }
});

async function displayBody(tab){
    let staticInjected = true; 
    try{
        staticInjected = await hasStaticInjection(tab);
    }catch(e){
        // 360x极速浏览器不支持chrome.permissions api
        console.log("expected error for browser compatibility testing: " + e);
        // 如果不支持, 则但凡是baidu域名, 就展示
        staticInjected = !!tab.url.match(/.*\:\/\/(.*\.)?baidu\.com([/|?].*)?$/ig);
    }
    if(staticInjected){
        chrome.scripting.insertCSS({
            css:  ":root{ --body-opacity: 1 !important;}",
            target: { tabId: tab.id }
        });
    }
}


async function changeLogo(tabId, logo){
    let option = {};
    option[LOGO_BLOB_KEY] = logo;
    await chrome.storage.local.set(option);
    initLogo(tabId);
}

async function resetToDefault(){
    let nwconfig = {};
    nwconfig["themeConfig"] = {};
    nwconfig[LOGO_BLOB_KEY] = false;
    nwconfig["themeTemplate"] = DEFAULT_THEMETEMPLATE;
    chrome.storage.local.set(nwconfig);
}

async function changeTheme(tabId, oldTheme, newTheme, stg){
    // await chrome.storage.local.set({themeTemplate: newTheme});

    // 跨模板切换时,会不生效?
    applyThemeConfig(tabId);

    if ( oldTheme ){
       chrome.scripting.removeCSS({ 
           files: [ "themes/" + oldTheme + "/styles.css"],
           target: { tabId: tabId },
           origin: 'AUTHOR'
       });
    }
    if ( newTheme ){
        chrome.scripting.insertCSS({
            files: [ "themes/" + newTheme + "/styles.css"],
            target: { tabId: tabId },
            origin: 'AUTHOR'
        }); 

        // populate themeconfig from inline style file
        if(newTheme != 'teto'){
            let themeconfig = stg["themeConfig"];
            if(!themeconfig || Object.keys(themeconfig) == 0){
	            // themeConfig uninitialzed
 	            retrieveThemeConfigFromComputedDocument(tabId);
            }
        }
        
	    chrome.scripting.executeScript({
        	target: { tabId: tabId },
		    args  : [ newTheme ], 
        	func  : async (theme) => {
		      window.document['isWashbaiduThemeEnabled'] = true;
       		}
      	});
    }
}

async function retrieveThemeConfigFromComputedDocument(tabId){
	let computedThemeConfig = await chrome.scripting.executeScript({
        	target: { tabId: tabId },
        	func  : async () => {
			    let styles = getComputedStyle(document.documentElement);
			    //console.log(styles);
			    let result = {
			    	majorColor:        styles.getPropertyValue("--major-color"),
			    	headBgColor:       styles.getPropertyValue("--head-bg-color"),
			    	bgColor:           styles.getPropertyValue("--bg-color"),
                     
			    	textEnhanceColor:  styles.getPropertyValue("--text-enhance-color"),
			    	textStandardColor: styles.getPropertyValue("--text-standard-color"),
			    	textTrivialColor:  styles.getPropertyValue("--text-trivial-color"),
			    	textVisitedColor:  styles.getPropertyValue("--text-visited-color"),
                    
			    	btnPrimaryBgColor:   styles.getPropertyValue("--btn-primary-bg-color"),
			    	btnPrimaryTextColor: styles.getPropertyValue("--btn-primary-text-color"),
			    	btnTrivialBgColor:   styles.getPropertyValue("--btn-trivial-bg-color"),
			    	btnTrivialTextColor: styles.getPropertyValue("--btn-trivial-text-color"),
                    
			    	inputBgColor:        styles.getPropertyValue("--input-bg-color")
			    }
			    return result;
       		}
    });
    let themeConf = computedThemeConfig[0].result;
    // console.log(computedThemeConfig);
    saveThemeConfig(themeConf);	
}

async function initLogo(tabId, stg){
    stg = stg ||  await chrome.storage.local.get();
    let themeTemplate = stg.themeTemplate || DEFAULT_THEMETEMPLATE;

    let url = stg[LOGO_BLOB_KEY] || 
		(
			THEME_OPTION[themeTemplate]["default_logo_uri"] ? 
			chrome.runtime.getURL(THEME_OPTION[themeTemplate]["default_logo_uri"]) : false 
		);

    let injectCss = "";
    if ( !url ) {
        injectCss = " a#result_logo > img, img#s_lg_img_new, img#s_lg_img_aging, img#s_lg_img { " +
        "   content: unset !important; " +
        " }";
    }else{
        injectCss = " a#result_logo > img, img#s_lg_img_new, img#s_lg_img_aging, img#s_lg_img { " +
        "   content: url('"+ url +"') !important; " +
        " }";
    }

    chrome.scripting.insertCSS({
        css:  injectCss,
        target: { tabId: tabId }
    });

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
        console.log("internal message received: " + JSON.stringify(request));
        if (request.command == 'turnonPlugin') {
            turnonPlugin(request);      
            sendResponse({success:true, farewell: "pong"});
            return;
        } else if(request.command == 'resetToDefault'){
            resetToDefault();      
            sendResponse({success:true, farewell: "pong"});
            return;
        } else if(request.command == 'changeLogo'){
            changeLogo(request.tabId, request.logo);
            sendResponse({success:true, farewell: "pong"});
            return;
        }
        sendResponse({succes:false, message:"unsupported command"});
  }
);

async function turnonPlugin(request){
    let hasPermission = await hasHostPermission(request.tab);
    if ( hasPermission ) {
        let targetTheme = request.theme || DEFAULT_THEMETEMPLATE;
        changeTheme(request.tabId, null, targetTheme, request.stg);
        initLogo(request.tabId, request.stg); 
    }
}

chrome.runtime.onMessageExternal.addListener(
    async function(request, sender, sendResponse) {
        console.log("external message received: " + JSON.stringify(request));
        let response = await handleConfigMessage(request);
        sendResponse(response);
    }
);


async function handleConfigMessage(request){
    let themeTemplate = request.themeTemplate || 'totoro';// 兼容老版本

    // acquire old theme template
    let oldStg = await chrome.storage.local.get(["themeTemplate"]);
    let oldThemeTemplate = oldStg['themeTemplate'];

    
    // save config 
    delete request.themeTemplate;
    // TODO tricky
    if(themeTemplate == 'teto'){
        request[LOGO_BLOB_KEY] = false;
    }
    let savetask = saveThemeConfig(request);
    await chrome.storage.local.set({themeTemplate: themeTemplate});
    await savetask;
    
    let cfg = await chrome.storage.local.get(["switch"]);
    if( !cfg.switch ){
            return;
    }
    
    // if current window actived , apply config
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let hasPermission = await hasHostPermission(tab);
    
    if ( hasPermission ) {
        if (themeTemplate) {
            if(oldThemeTemplate != themeTemplate){
                let stg = await chrome.storage.local.get(["themeConfig"]);
                changeTheme(tab.id, oldThemeTemplate, themeTemplate, stg);
            }
        }

        applyThemeConfig(tab.id);

        //if( request[LOGO_BLOB_KEY] ){
        initLogo(tab.id);
        //}
    }

    return {success:true, farewell: "pong"}
}

async function saveThemeConfig(config){
    // let stg = await chrome.storage.local.get("themeConfig");
    // let mergedConfig = Object.assign({}, stg["themeConfig"], config);
    // let newConf = { "themeConfig" : mergedConfig };
    let newConf = { "themeConfig" : config };
    // if( config[LOGO_BLOB_KEY] ){
        newConf[LOGO_BLOB_KEY] = config[LOGO_BLOB_KEY];
    // }
    // if(themeTemplate == 'teto'){
    //     // TODO tricky code
    //     delete config[LOGO_BLOB_KEY];
    // }
    debugger
    chrome.storage.local.set(newConf);
}


async function applyThemeConfig(tabId){
    // FIXME tricky impl
    // hard code : themeTemplate not support themConfig 
    let stg = await chrome.storage.local.get(["themeConfig" , "themeTemplate" ]);
    let themeTemplate = stg.themeTemplate || DEFAULT_THEMETEMPLATE;
    // FIXME testing
    debugger
    if (!THEME_OPTION[themeTemplate]["support_config"]) {
        return;
    }

    let themeConfig = stg.themeConfig;

    if (!themeConfig) {
        debugger
	    return;
    }

    let themeColorCss = ":root{ "
                + (themeConfig['majorColor']       ? ("--major-color:"         + themeConfig['majorColor']        + " !important;") : "")
                + (themeConfig['bgColor']          ? ("--bg-color:"            + themeConfig['bgColor']           + " !important;") : "")
                + (themeConfig['headBgColor']      ? ("--head-bg-color:"       + themeConfig['headBgColor']  + " !important;") : "")

                + (themeConfig['textEnhanceColor'] ? ("--text-enhance-color:"  + themeConfig['textEnhanceColor']  + " !important;") : "")
                + (themeConfig['textStandardColor']? ("--text-standard-color:" + themeConfig['textStandardColor'] + " !important;") : "")
                + (themeConfig['textTrivialColor'] ? ("--text-trivial-color:"  + themeConfig['textTrivialColor']  + " !important;") : "")
                + (themeConfig['textVisitedColor'] ? ("--text-visited-color:"  + themeConfig['textVisitedColor']  + " !important;") : "")

                + (themeConfig['btnPrimaryBgColor']  ? ("--btn-primary-bg-color:"   + themeConfig['btnPrimaryBgColor']   + " !important;") : "")
                + (themeConfig['btnPrimaryTextColor']? ("--btn-primary-text-color:" + themeConfig['btnPrimaryTextColor'] + " !important;") : "")
                + (themeConfig['btnTrivialBgColor']  ? ("--btn-trivial-bg-color:"   + themeConfig['btnTrivialBgColor']   + " !important;") : "")
                + (themeConfig['btnTrivialTextColor']? ("--btn-trivial-text-color:" + themeConfig['btnTrivialTextColor'] + " !important;") : "")

                + (themeConfig['inputBgColor']     ? ("--input-bg-color:"      + themeConfig['inputBgColor']  + " !important;") : "")
              +"}";
    // console.log(themeColorCss);
    await chrome.scripting.insertCSS({
        css:  themeColorCss,
        target: { tabId: tabId }
    });

    // console.log(a);
}
