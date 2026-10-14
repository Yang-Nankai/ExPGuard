(function(){chrome.storage.sync.get("xiaoqi_sidebar_darkmode", t => {
  t.xiaoqi_sidebar_darkmode ? localStorage.setItem("sidepaneltheme", "dark") : localStorage.removeItem("sidepaneltheme");
});const i="https://www.xiaoqi-ai.com/api/sidepaneljs.php";function n(e){try{localStorage.setItem("sideplane","on")}catch(t){console.warn("LocalStorage may not be available for writing.",t)}if(location.search.includes("sidepanel")){const t=document.createElement("style");t.textContent=e.styles;let o=document.head||document.documentElement;o?o.appendChild(t):console.error("Content Script failed to find document head or html element for style injection."),document.addEventListener("DOMContentLoaded",()=>{(e.idsToHide||["sidebar","newtipsid"]).forEach(l=>{let r=document.getElementById(l);r&&(r.style.display="none")})})}}function a(){console.warn("\u8FDC\u7A0B\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25\uFF0C\u542F\u7528\u672C\u5730\u515C\u5E95\u7B56\u7565.");const e={styles:`
                /* 1. \u9690\u85CF\u5143\u7D20\u5217\u8868 */
                #sidebar, #newtipsid,
                .tqmain,
                .mt-8\\.5.text-xs.text-gray-500.text-center,
                .flex.space-x-1.text-center,
                .flex.mt-1.mb-2,
                .flex.flex-row.justify-center.gap-3.\\@sm\\:gap-3\\.5.w-fit.px-5 {
                  display: none !important; 
                }
                /* 2. \u5B9A\u5236\u6837\u5F0F */
                .w-full.text-3xl.text-gray-800.font-medium.text-center.flex.items-center {
                    margin-top: 25% !important;
                    width: 103% !important;
                    margin-left: -2% !important;
                }
                /* 3. \u65B0\u589E\u9690\u85CF\u548C\u5B9A\u5236\u6837\u5F0F */
                .mr-1.self-start.flex.flex-none.items-center.text-gray-600 {
                    display: none !important;
                }
                .flex.w-full.text-left.px-0\\.5.bg-transparent.truncate.text-lg.justify-between {
                    font-size: 14px !important;
                }
                .scrollbar-hidden.text-left.bg-transparent.outline-hidden.w-full.pt-3.px-1 {
                    min-height: 7rem !important;
                }
                button.flex.rounded-md.py-2.px-3.w-full.hover\\:bg-gray-50 {
                    display: none !important;
                }
                hr.border-gray-100.dark\\:border-gray-850.my-1.p-0 {
                    display: none !important;
                }
                .line-clamp-1 {
                    font-size: 13px !important;
                }
                /* \u{1F31F} \u65B0\u589E\u6837\u5F0F: \u9690\u85CF shrink-0.mr-3 \u{1F31F} */
                .shrink-0.mr-3 {
                    display: none !important;
                }
                /* \u{1F680} \u65B0\u589E\u6837\u5F0F: \u9690\u85CF\u6307\u5B9A\u7684\u6309\u94AE/\u5143\u7D20 \u{1F680} */
                .self-center.mx-1.disabled\\:text-gray-600.disabled\\:hover\\:text-gray-600.-translate-y-\\[0\\.5px\\] {
                    display: none !important;
                }
                /* \u{1F534} \u65B0\u589E\u6837\u5F0F: \u9690\u85CF absolute top-12 left-0 right-0 w-full z-30 \u5143\u7D20 \u{1F534} */
                .absolute.top-12.left-0.right-0.w-full.z-30 {
                    display: none !important;
                }
                #response-content-container, 
                #response-content-container p, 
                #response-content-container div {
                    font-size: 13px !important; 
                }
            `,idsToHide:["sidebar","newtipsid"],placeholderText:DEFAULT_PLACEHOLDER_TEXT};n(e)}fetch(i).then(e=>{if(!e.ok)throw new Error("Network response was not ok: "+e.status);return e.json()}).then(e=>{if(!e||typeof e.styles!="string")throw new Error("Remote config is incomplete or malformed.");console.log("Loaded sidepanel config from remote server."),n(e)}).catch(e=>{console.error("\u8FDC\u7A0B\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25\u6216\u89E3\u6790\u9519\u8BEF:",e),a()})})();