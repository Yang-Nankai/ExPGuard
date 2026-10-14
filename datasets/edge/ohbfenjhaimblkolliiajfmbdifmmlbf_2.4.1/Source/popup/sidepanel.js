import"../lib/jszip.min.js";import"../lib/ExtPay.js";import"../lib/flatpickr.min.js"
;const e=window.JSZip,t=window.ExtPay("discord-media-downloader");chrome.runtime.connect({name:"sidepanel_keepalive"}),
console.log("Popup script loaded");let n=!1,d=[],o=new Set,a=!1;function startFindingMedia(e){
console.log("[Sidepanel] startFindingMedia called with params:",e),
document.getElementById("config-form").classList.add("hidden"),
document.getElementById("running-view").classList.remove("hidden"),d=[],o.clear(),
document.getElementById("preview-area").innerHTML="",updateGalleryHeader(),chrome.tabs.query({active:!0,currentWindow:!0
},t=>{t&&t.length>0&&(e.tabId=t[0].id,console.log("[Sidepanel] Active tab ID found:",e.tabId)),
"scan"===e.mode?(document.getElementById("scan-progress-container").classList.remove("hidden"),
document.getElementById("scan-status-text").textContent="Initializing...",
document.getElementById("scan-status-text").style.color="#23a559",
document.getElementById("scan-pct-text").textContent="0%",document.getElementById("scan-progress-bar").style.width="0%",
document.getElementById("scan-progress-bar").style.backgroundColor="#23a559",
window.scanWaitInterval&&clearInterval(window.scanWaitInterval)):document.getElementById("scan-progress-container").classList.add("hidden"),
chrome.runtime.sendMessage({type:"FIND_MEDIA",data:e})})}function updateGalleryUI(){d.forEach(e=>{if(e.element){
const t=e.element.querySelector(".item-checkbox")
;t&&(t.checked=o.has(e.id)),o.has(e.id)?e.element.classList.add("selected"):e.element.classList.remove("selected")}}),
updateGalleryHeader()}function updateGalleryHeader(){
document.getElementById("gallery-title").textContent=`Found ${d.length} items`
;const e=document.getElementById("download-btn");e.textContent=`Download ${o.size} Items as ZIP`
;const t=document.getElementById("free-limit-warning"),a=document.getElementById("selected-count-warning")
;!n&&o.size>10?(t.classList.remove("hidden"),a.textContent=o.size,e.disabled=!0):(t.classList.add("hidden"),
e.disabled=0===o.size)}function updateContextUI(){
chrome.storage.local.get(["discordToken","currentGuildInfo","currentChannelInfo"],e=>{
const t=!!e.discordToken,n=e.currentGuildInfo,d=e.currentChannelInfo,o=document.getElementById("error-msg"),a=document.getElementById("start-btn"),s=document.getElementById("open-discord-home-btn")
;if(!t){
showError('Please log in to Discord and refresh the page. <a href="#" id="open-discord-link" style="color: #5865f2; font-weight: bold; margin-left: 4px;">Open Discord</a>')
;const e=document.getElementById("open-discord-link");return e&&e.addEventListener("click",e=>{e.preventDefault(),
chrome.tabs.create({url:"https://discord.com/channels/@me"})}),void(s&&s.classList.remove("hidden"))}
if(!n)return showError("Please navigate to a Discord server."),void(s&&s.classList.remove("hidden"))
;o.classList.add("hidden"),s&&s.classList.add("hidden")
;const c=document.getElementById("type-images").checked,i=document.getElementById("type-videos").checked
;a.disabled=!c&&!i
;const l=document.getElementById("channel-name"),r=document.getElementById("channel-id"),m=document.querySelector(".channel-icon")
;if(l.textContent=n.name,
d?(r.textContent="#"+d.name,r.style.fontWeight="bold",r.style.color="#4f5660"):r.textContent="...",m.innerHTML="",
n.iconUrl){const e=document.createElement("img");e.src=n.iconUrl,e.style.width="40px",e.style.height="40px",
e.style.borderRadius="16px",e.style.objectFit="cover",m.appendChild(e)
}else m.textContent=n.name.charAt(0).toUpperCase(),m.style.fontSize="20px",m.style.display="flex",
m.style.alignItems="center",m.style.justifyContent="center",m.style.backgroundColor="#5865f2",m.style.color="white",
m.style.width="40px",m.style.height="40px",m.style.borderRadius="16px"})}function showError(e){
const t=document.getElementById("error-msg");t.innerHTML=e,t.classList.remove("hidden"),
document.getElementById("start-btn").disabled=!0}async function checkUserStatus(){
const e=document.getElementById("user-status-text"),d=document.getElementById("upgrade-promo"),o=document.getElementById("premium-msg")
;try{const a=await t.getUser();chrome.storage.local.set({cachedProStatus:a.paid}),a.paid?(n=!0,e.textContent="",
e.classList.add("hidden"),d.classList.add("hidden"),o.classList.remove("hidden")):(n=!1,e.textContent="",
e.classList.add("hidden"),d.classList.remove("hidden"),o.classList.add("hidden"))}catch(t){
console.error("ExtPay fetch failed, falling back to cache:",t),chrome.storage.local.get(["cachedProStatus"],t=>{
t.cachedProStatus?(n=!0,e.textContent="",e.classList.add("hidden"),d.classList.add("hidden"),
o.classList.remove("hidden")):(n=!1,e.textContent="Status Check Failed (Offline)",e.classList.remove("hidden"),
d.classList.remove("hidden"),o.classList.add("hidden"))})}}function handleDownloadProgress(e){
const t=document.getElementById("progress-info"),n=document.getElementById("progress-bar"),d=document.getElementById("count-text")
;if("downloading"===e.stage){const o=Math.round(e.current/e.total*100);n.style.width=o+"%",
d.textContent=`${e.current} / ${e.total}`,t.textContent=`Downloading: ${e.filename||"..."}`
}else"zipping"===e.stage&&(n.style.width="100%",n.style.backgroundColor="#23a559",
t.textContent="Compressing files into ZIP...",d.textContent="Finalizing")}
document.addEventListener("DOMContentLoaded",()=>{
chrome.storage.local.remove(["currentGuildInfo","currentChannelInfo","targetChannelId"]),updateContextUI(),
checkUserStatus(),document.getElementById("upgrade-btn").addEventListener("click",()=>{t.openPaymentPage()})
;const n=document.getElementById("upgrade-btn-promo");n&&n.addEventListener("click",()=>{t.openPaymentPage()})
;const s=document.getElementById("open-discord-home-btn");s&&s.addEventListener("click",()=>{chrome.tabs.create({
url:"https://discord.com/channels/@me"})}),chrome.storage.onChanged.addListener((e,t)=>{
"local"===t&&(e.currentGuildInfo||e.currentChannelInfo||e.discordToken)&&updateContextUI()});const c={enableTime:!0,
enableSeconds:!0,dateFormat:"Y-m-d H:i:S",time_24hr:!0,disableMobile:!0,position:"auto center"}
;flatpickr("#start-time",c),flatpickr("#end-time",c),function setupFormLogic(){
const e=document.getElementsByName("scanMode"),t=document.getElementById("date-range-container"),n=document.getElementById("type-images"),d=document.getElementById("type-videos"),o=document.getElementById("start-btn"),a=document.getElementById("start-time")
;function validateForm(){
const e=document.querySelector('input[name="scanMode"]:checked').value,t=n.checked||d.checked,s=!document.getElementById("error-msg").classList.contains("hidden")
;let c=t&&!s;if("scan"===e){const e=a.value,t=document.getElementById("end-time").value;e&&t||(c=!1)}o.disabled=!c}
n.addEventListener("change",validateForm),d.addEventListener("change",validateForm),
a.addEventListener("input",validateForm),document.getElementById("end-time").addEventListener("input",validateForm)
;const s=document.querySelector("#start-time")._flatpickr;s&&s.config.onChange.push(validateForm)
;const c=document.querySelector("#end-time")._flatpickr;c&&c.config.onChange.push(validateForm),e.forEach(e=>{
e.addEventListener("change",e=>{"capture"===e.target.value?(t.classList.add("hidden"),
document.getElementById("capture-hint").classList.remove("hidden"),
o.textContent="Start Capture"):(t.classList.remove("hidden"),
document.getElementById("capture-hint").classList.add("hidden"),o.textContent="Start Scan"),validateForm()})}),
o.addEventListener("click",()=>{
const e=document.querySelector('input[name="scanMode"]:checked').value,t=n.checked,o=d.checked;if("scan"===e){
const n=document.getElementById("start-time").value,d=document.getElementById("end-time").value
;if(!n||!d)return void showError("Please select both Start Date and End Date for scanning.")
;chrome.storage.local.get(["discordToken","targetChannelId"],a=>{const s=a.discordToken,c=a.targetChannelId
;s&&c?startFindingMedia({mode:e,fetchImages:t,fetchVideos:o,token:s,channelId:c,startDate:n,endDate:d
}):showError("Missing token or channel ID.")})}else"capture"===e&&startFindingMedia({mode:e,fetchImages:t,fetchVideos:o
})})}(),function setupGalleryLogic(){document.getElementById("select-all-btn").addEventListener("click",()=>{
d.forEach(e=>o.add(e.id)),updateGalleryUI()}),document.getElementById("clear-all-btn").addEventListener("click",()=>{
o.clear(),updateGalleryUI()}),document.getElementById("back-btn").addEventListener("click",()=>{a=!0,
chrome.runtime.sendMessage({type:"STOP_DOWNLOAD"}),document.getElementById("running-view").classList.add("hidden"),
document.getElementById("config-form").classList.remove("hidden")
}),document.getElementById("download-btn").addEventListener("click",()=>{if(0===o.size)return
;const t=d.filter(e=>o.has(e.id)).map(e=>e.url);document.getElementById("running-view").classList.add("hidden"),
document.getElementById("progress-view").classList.remove("hidden"),a=!1,async function handleDownload(t){
const n=new e,d=n.folder(`discord_media_${Date.now()}`);let o=0,s=0;const c=t.length;let i=0;handleDownloadProgress({
stage:"downloading",current:0,total:c});const l=[...t];if(await async function processDownloadQueue(e,t,n){let d=0
;const o=[];for(;d<e.length||o.length>0;){for(;o.length<t&&d<e.length;){const t=n(e[d++]).then(()=>{
o.splice(o.indexOf(t),1)});o.push(t)}o.length>0&&await Promise.race(o)}}(l,3,async e=>{if(!a)try{const t=await fetch(e)
;if(t.ok){const n=await t.blob();let a=e.split("/").pop().split("?")[0];(!a||a.length<3)&&(a=`media_${Date.now()}`),
a=`${o.toString().padStart(3,"0")}_${a}`,d.file(a,n),o++}else s++}catch(e){s++}finally{i++,handleDownloadProgress({
stage:"downloading",current:i,total:c,filename:e.split("/").pop().split("?")[0]})}}),!a){if(o>0){
handleDownloadProgress({stage:"zipping"});const e=await n.generateAsync({type:"blob"
}),t=URL.createObjectURL(e),d=`discord_media_export_${(new Date).toISOString().slice(0,10)}.zip`
;chrome.downloads.download({url:t,filename:d,saveAs:!0})}!function handleDownloadComplete(e){
const t=document.getElementById("progress-info"),n=document.getElementById("stop-btn")
;t.textContent=`Download Complete! Success: ${e.successCount}, Failed: ${e.failCount}`,
document.getElementById("progress-bar").style.backgroundColor="#23a559",n.textContent="Close",
n.classList.remove("btn-stop"),n.classList.add("btn-secondary"),n.onclick=()=>{
document.getElementById("progress-view").classList.add("hidden"),
document.getElementById("config-form").classList.remove("hidden"),n.textContent="Cancel Download",
n.classList.remove("btn-secondary"),n.classList.add("btn-stop"),n.onclick=()=>{a=!0,chrome.runtime.sendMessage({
type:"STOP_DOWNLOAD"}),document.getElementById("progress-view").classList.add("hidden"),
document.getElementById("config-form").classList.remove("hidden")}}}({successCount:o,failCount:s})}}(t)}),
document.getElementById("stop-btn").addEventListener("click",()=>{a=!0,chrome.runtime.sendMessage({type:"STOP_DOWNLOAD"
}),
document.getElementById("progress-view").classList.add("hidden"),document.getElementById("config-form").classList.remove("hidden")
})}()}),chrome.runtime.onMessage.addListener((e,t,n)=>{
if("FOUND_MEDIA_ITEM"===e.type)console.log("[Sidepanel] Received FOUND_MEDIA_ITEM:",e.item.url),
function addGalleryItem(e){const t=document.getElementById("preview-area");if(d.some(t=>t.id===e.id))return
;const n=e.isVideo||/\.(mp4|webm|mov|mkv|avi|flv|wmv)(\?|$)/i.test(e.url)||/format=(mp4|webm|mov|mkv|avi|flv|wmv)/i.test(e.url),a=document.getElementById("type-images").checked,s=document.getElementById("type-videos").checked
;if(n&&!s)return;if(!n&&!a)return;const c=document.createElement("div");c.className="preview-item-wrapper selected"
;const i=document.createElement("input");let l;i.type="checkbox",i.className="item-checkbox",i.checked=!0,
n?(l=document.createElement("video"),l.src=e.url+"#t=0.1",l.muted=!0,l.preload="metadata",l.loop=!0,
l.addEventListener("loadedmetadata",()=>{l.currentTime=.1}),l.onmouseover=()=>{l.play().catch(()=>{})},
l.onmouseout=()=>{l.pause()}):(l=document.createElement("img"),l.src=e.url,l.loading="lazy"),l.className="preview-img",
l.onclick=()=>{i.checked=!i.checked,i.dispatchEvent(new Event("change"))},i.addEventListener("change",t=>{
t.target.checked?(o.add(e.id),c.classList.add("selected")):(o.delete(e.id),c.classList.remove("selected")),
updateGalleryHeader()}),c.appendChild(l),c.appendChild(i),t.appendChild(c),e.element=c,d.push(e),o.add(e.id),
updateGalleryHeader()
}(e.item);else if("FIND_MEDIA_DONE"===e.type)window.scanWaitInterval&&clearInterval(window.scanWaitInterval),
document.getElementById("scan-progress-container").classList.add("hidden"),
updateGalleryUI();else if("SCAN_PROGRESS"===e.type)window.scanWaitInterval&&(clearInterval(window.scanWaitInterval),
window.scanWaitInterval=null),document.getElementById("scan-pct-text").textContent=e.progress.toFixed(1)+"%",
document.getElementById("scan-progress-bar").style.width=e.progress+"%",
document.getElementById("scan-status-text").textContent="Scanning history...",
document.getElementById("scan-status-text").style.color="#23a559",
document.getElementById("scan-progress-bar").style.backgroundColor="#23a559";else if("SCAN_WAIT"===e.type){
window.scanWaitInterval&&clearInterval(window.scanWaitInterval);let t=e.waitTime
;document.getElementById("scan-status-text").textContent=`Rate limited! Resuming in ${(t/1e3).toFixed(1)}s...`,
document.getElementById("scan-status-text").style.color="#ed4245",
document.getElementById("scan-progress-bar").style.backgroundColor="#ed4245",window.scanWaitInterval=setInterval(()=>{
t-=100,t<=0?(clearInterval(window.scanWaitInterval),window.scanWaitInterval=null,
document.getElementById("scan-status-text").textContent="Resuming...",
document.getElementById("scan-status-text").style.color="#23a559",
document.getElementById("scan-progress-bar").style.backgroundColor="#23a559"):document.getElementById("scan-status-text").textContent=`Rate limited! Resuming in ${(t/1e3).toFixed(1)}s...`
},100)}else"ERROR"===e.type?(window.scanWaitInterval&&clearInterval(window.scanWaitInterval),showError(e.message),
document.getElementById("config-form").classList.remove("hidden"),
document.getElementById("running-view").classList.add("hidden"),
document.getElementById("progress-view").classList.add("hidden")):"USER_PAID_STATUS_CHANGED"===e.type&&checkUserStatus()
;return!1});
