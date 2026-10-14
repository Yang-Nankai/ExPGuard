const addPreworks = async (iframeDocument) => {
    var link = iframeDocument.createElement('link'), 
        head = iframeDocument.head || iframeDocument.getElementsByTagName('head')[0]; 
    link.rel="dns-prefetch";
    link.href="https://starfury.tech"
    head.appendChild(link); 
}
const addCSS = (iframeDocument, cssText) => {
    var style = iframeDocument.createElement('style'), 
        head = iframeDocument.head || iframeDocument.getElementsByTagName('head')[0]; 
    style.type = 'text/css'; 
    if (style.styleSheet) {
        var func = function() {
            try {
                style.styleSheet.cssText = cssText;
            } catch (e) {}
        };
        if (style.styleSheet.disabled) {
            setTimeout(func, 10);
        } else {
            func();
        }
    } else {
        var textNode = iframeDocument.createTextNode(cssText);
        style.appendChild(textNode);
    }
    head.appendChild(style); 
};

async function addRenderingHooks(){
      // add hook to  search-input enter event 
      let kw = document.getElementById("kw"); 
      kw && (kw.onclick = function(event){
          trickyRendering();
          return true;
      })
}

async function trickyRendering(){
      let styles = getComputedStyle(document.documentElement);
      let trickyInit = styles.getPropertyValue("--tricky-init");
      if ( trickyInit ){
          return;
      }
      // haven't  inject any vars
      let majorColor = styles.getPropertyValue("--major-color")
      if( !majorColor ){
            let stg = await chrome.storage.local.get(["themeConfig","switch"]);
            let themeConfig = stg["themeConfig"];
            if(themeConfig && themeConfig['majorColor'] && stg['switch']){
                majorColor = themeConfig['majorColor'];
            }else{
                majorColor = '#4E6EF2';
            }
            document.documentElement.style.setProperty("--major-color", majorColor)
      }
    
      //override nested css , to render THEME's major-color properly  
      addCSS(document, ":root{--tricky-init: true} .wrapper_new #form .bdsug-new{border:2px solid var(--major-color) !important;border-top:0px solid gray !important;}  #head_wrapper #form .bdsug-new{border-color: var(--major-color) !important; } #head_wrapper #kw:focus{border-color:var(--major-color) !important;} .wrapper_new .iptfocus.s_ipt_wr{border-color:var(--major-color) !important;} .s-skin-hasbg #head_wrapper #form .bdsug-new{border-color: var(--major-color) !important}");
      
}


// TODO : tricky way to avoid subdomain injection , a subdomain-mapping manicheanism was expected in the furture
if ( !! window.location.href.match(/.*\:\/\/(www\.)?baidu\.com\/.*/ig)){
    let renderAction = async () => {
      trickyRendering();
      addRenderingHooks();
      addPreworks(document);
    }
    renderAction();
}
setTimeout(()=>{
      // forcing display
      let styles = getComputedStyle(document.documentElement);
      let bodyOpacity = styles.getPropertyValue("--body-opacity");
      if(parseInt(bodyOpacity) != 1){
          //alert('recover opacity');
          document.documentElement.style.setProperty("--body-opacity", 1)
      }
    },
1199);
