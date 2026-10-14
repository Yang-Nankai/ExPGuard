const LOGO_BLOB_KEY    = "logo_file_blob";
const DEFAULT_LOGO_URI = "default_logo.png";

let logoReview = document.getElementById('logo_review');

// Initialize preview logo
function initPreviewLogo(){
    chrome.storage.local.get([LOGO_BLOB_KEY] , (stg) => {
        logoReview.src = stg[LOGO_BLOB_KEY] || chrome.runtime.getURL(DEFAULT_LOGO_URI);
    })
}
initPreviewLogo();

// Initialize switch status
chrome.storage.local.get(["switch"],(result)=>{
    document.getElementById('switch_btn').checked = result['switch'];    
});

// upload a logo
const inputElement = document.getElementById("logo_img_input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
   var file = inputElement.files[0];
   var reader = new FileReader();
   reader.addEventListener('loadend', (e) => {
       changeThemeLogo(e.target.result);
   });
   reader.readAsDataURL(file);
}

async function changeThemeLogo(blob){
     //console.log(blob);
     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
     chrome.runtime.sendMessage({
             command: "changeLogo", 
             tabId: tab.id, 
             logo: blob
         }, 
         function(response) {
             if(response.success){
                logoReview.src = blob;
             }else{
                alert("更换Logo失败!");
             }
         }
     );
}

function turnonPlugin(tab, theme, stg){
    chrome.storage.local.set({ switch: true });
    chrome.runtime.sendMessage({
            command: "turnonPlugin", 
            tabId: tab.id, 
            tab:   tab,
            theme: theme, 
            stg :  stg
        }, 
        function(response) {
            console.log(response);
        }
    );
}

function turnoffPlugin(tab, theme, stg){
    chrome.storage.local.set({ switch: false });
    chrome.tabs.reload(tab.tabId);
}


// bind button action
document.getElementById('choose_logo_btn').addEventListener('click',()=>{
    document.getElementById('logo_img_input').click();
});

// bind reset action
document.getElementById('reset_btn').addEventListener('click',async ()=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.runtime.sendMessage({
            command: "resetToDefault", 
            tabId: tab.id
        }, 
        function(response) {
            console.log(response);
            chrome.tabs.reload(tab.tabId);
            initPreviewLogo();
        }
    );
});

// bind switch action
document.getElementById('switch_btn').addEventListener('change', async (event)=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let stg = await chrome.storage.local.get();
    let theme = stg['themeTemplate']; 


    if(event.target.checked){
        turnonPlugin(tab, theme, stg);     
    }else{
        turnoffPlugin(tab, theme, stg);
    }
});

chrome.storage.local.get(['themeTemplate'], (config) => {
    // tricky : use theme option 
    if(config.themeTemplate == 'teto'){
        let btn = document.getElementById('choose_logo_btn')
        btn.style.display = "none";      

        let configBtn = document.getElementById('theme_preference_btn')
        configBtn.style.backgroundColor = '#4e6ef2';

        logoReview.style.display="none";

        let sp = document.createElement("div");
        sp.innerHTML = "该主题仅屏蔽广告<br />不支持自定义Logo<br /> 若有需要请切换其它主题";
        sp.style.color = 'gray';
        sp.style.lineHeight = '22px';
        sp.style.marginBottom = '-24px';
        logoReview.parentNode.insertBefore(sp,logoReview)
    }
});


// bind popup theme config panel
document.getElementById('theme_preference_btn').addEventListener('click',async ()=>{
    // inject a starfury.tech's  iframe
    let extensionId = chrome.runtime.id;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let stg = await chrome.storage.local.get(["themeConfig", "themeTemplate"]); 
	// console.log(stg);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [extensionId, stg],
        func  : async (extensionId, config) => {
                let existed = document.getElementById('prefs_container');
                existed && existed.remove();
                // CREATE CONTAINER
                let div = document.createElement('div');
                div.id = "prefs_container";
                div.style.border="1px solid lightgray";
                div.style.minHeight='365px';
                div.style.maxHeight='500px';
                div.style.maxWidth='1080px';
                div.style.height='45%';
                div.style.width='75%';
                div.style.position='fixed';
                div.style.transform='translate(-50%, 0%)';
                div.style.bottom='12px';
                div.style.zIndex=100;
                div.style.backgroundColor='white';
                div.style.left='50%';
                div.style.boxShadow = "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset";
                document.body.appendChild(div);
                
                // CREATE LOADING MASK
                let mask = document.createElement('div');
                mask.id='prefs_container_mask'
                mask.style.width='100%';
                mask.style.height='100%';
                mask.style.zIndex='99';
                mask.style.position="absolute";
                mask.style.backgroundColor="white";
                mask.style.display='flex';
                mask.style.alignItems='center';
                mask.style.justifyContent='center';
                mask.style.flexDirection='column';
                mask.innerHTML="<span>加 载 中 . . .</span> <br /><span style='font-size:12px;color:gray'>首次加载需要3-5秒</span>";
                div.appendChild(mask);
                
                // CREATE IFRAME
                let iframe = document.createElement('iframe');
                let iframedocument;
                let iframeWindow;
                div.appendChild(iframe);
                iframe.id="prefs_iframe";
                //iframe.style.display="none";
                //iframe.style.opacity="0";
                iframe.onload = function() {
                    //let _iframe = document.getElementById('prefs_iframe');
                    //_iframe.style.opacity="1";
                    //_iframe.style.display="block";
                    document.getElementById('prefs_container_mask').remove();
                };
                iframe.onerror = function() {
                    document.getElementById('prefs_container_mask').innerText = "Ooooops! 配置页加载失败~~";
                }

                let params = `eid=${extensionId}`;
                let themeConf = config['themeConfig'] || null;
                let themeConfStr = ""
                for(let v in themeConf){
                   if(v == "logo_file_blob"){
                       continue;
                   }
                   themeConfStr += "&"+v+"="+escape(themeConf[v]);
                }
                params += themeConfStr;
                params += "&themeTemplate=" + (config['themeTemplate'] || 'totoro');

                iframe.src='https://toast.pub/washbaidu/v198/index.html?'+params;

                // iframe.src='https://starfury.tech/customize_debug.html?'+params;
                // iframe.src='http://127.0.0.1:5173/?'+params;
                // iframe.src='https://starfury.tech:5173/?'+params;
            
                // iframe styles
                iframe.style.borderWidth='0px';
                iframe.style.margin='auto';
                iframe.style.height='100%';
                iframe.style.width='100%';
                iframe.style.backgroundColor='white';

                let closeButton = document.createElement('button');
                closeButton.style.position='absolute';
                closeButton.style.border="1px solid lightgray";
                closeButton.style.top='5px';
                closeButton.style.right='10px';
                closeButton.style.fontSize="14px";
                closeButton.innerHTML = "关 闭";
                closeButton.style.paddingBottom = "3px";
                closeButton.style.width="60px";
                closeButton.style.zIndex=100;
                closeButton.style.boxShadow = "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset";
                closeButton.onclick=function(){
                    document.getElementById('prefs_container').remove();
                }
                div.appendChild(closeButton);
            }
        },
        // exec callback
        ()=>{
            window.close();
        }
    );      
});
