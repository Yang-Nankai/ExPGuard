import"../lib/jszip.min.js";import"../lib/ExtPay.js";const e=self.ExtPay("discord-media-downloader")
;e.startBackground(),e.onPaid.addListener(e=>{console.log("[Service Worker] User paid!",e),chrome.runtime.sendMessage({
type:"USER_PAID_STATUS_CHANGED",user:e}).catch(()=>{})
}),chrome.sidePanel&&chrome.sidePanel.setPanelBehavior&&chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:!0
}).catch(e=>console.error(e));const sleep=e=>new Promise(t=>setTimeout(t,e));let t=!1,o=!1,n=!1,r=0
;function parseToSnowflake(e,t){if(!e)return t?dateToSnowflake(new Date):0n;let o;if(/^\d{4}-\d{2}-\d{2}$/.test(e)){
const[t,n,r]=e.split("-").map(Number);o=new Date(t,n-1,r)}else o=new Date(e);return t&&o.setHours(23,59,59,999),
dateToSnowflake(o)}function dateToSnowflake(e){return e?BigInt(e.getTime())-1420070400000n<<22n:null}
async function fetchMessages(e,t,o,n){const r=`https://discord.com/api/v9/channels/${e}/messages?limit=50&before=${o}`
;let a=3;for(;a>0;){const e=await fetch(r,{headers:{Authorization:t}});if(e.ok)return(await e.json()).sort((e,t)=>{
const o=BigInt(e.id),n=BigInt(t.id);return o>n?-1:o<n?1:0});if(429===e.status){
const t=e.headers.get("Retry-After"),o=t?1e3*parseFloat(t):5e3
;console.warn(`[Service Worker] Rate limited. Waiting ${o}ms before retry...`),n&&n(o),await sleep(o),a--;continue}
if(401===e.status)throw new Error("Invalid Token");if(403===e.status)throw new Error("No Permission")
;throw new Error(`API Error: ${e.status}`)}throw new Error("Rate Limited persistently. Try again later.")}
function extractMediaFromMessage(e,t,o){const n=[],pushItem=(r,a)=>{if(!r)return
;const s=/\.(mp4|mov|webm|mkv|avi|flv|wmv)$/i.test(a)||r.includes(".mp4"),i=/\.(png|jpe?g|gif|webp)$/i.test(a)||r.includes(".png")
;(s&&o||i&&t||t&&!s)&&n.push({id:`msg_${e.id}_${r.hashCode?r.hashCode():Date.now()}`,url:r,filename:a,isVideo:s})}
;if(e.attachments)for(const t of e.attachments)pushItem(t.url,t.filename)
;if(e.embeds)for(const n of e.embeds)n.video&&o?pushItem(n.video.proxy_url||n.video.url,`embed_${Date.now()}.mp4`):n.url&&o&&/\.(mp4|mov|webm)$/i.test(n.url)&&pushItem(n.url,`embed_${Date.now()}.mp4`),
n.image&&t&&pushItem(n.image.proxy_url||n.image.url,`embed_${Date.now()}.png`),
n.thumbnail&&t&&pushItem(n.thumbnail.proxy_url||n.thumbnail.url,`embed_thumb_${Date.now()}.png`);return n}
function sendMessageToPopup(e){chrome.runtime.sendMessage(e).catch(()=>{})}
async function updateContextFromUrl(e,t=null){if(e)try{const o=e.match(/channels\/(\d+)(?:\/(\d+))?/);if(!o)return
;const n=o[1],r=o[2]
;if("@me"===n)return void await chrome.storage.local.remove(["currentGuildInfo","currentChannelInfo","targetChannelId"])
;const a=await chrome.storage.local.get(["discordToken"]),s=t||a.discordToken;if(!s)return;const i={Authorization:s
},c=await fetch(`https://discord.com/api/v9/guilds/${n}?with_counts=true`,{headers:i});let l=null;if(c.ok){
const e=await c.json();l={id:e.id,name:e.name,
iconUrl:e.icon?`https://cdn.discordapp.com/icons/${e.id}/${e.icon}.png`:null}}let d=null;if(r){
const e=await fetch(`https://discord.com/api/v9/channels/${r}`,{headers:i});if(e.ok){const t=await e.json();d={id:t.id,
name:t.name}}}l&&await chrome.storage.local.set({currentGuildInfo:l,currentChannelInfo:d,targetChannelId:r})}catch(e){
console.error("Error in updateContextFromUrl:",e)}}chrome.runtime.onConnect.addListener(e=>{
"sidepanel_keepalive"===e.name&&(r++,e.onDisconnect.addListener(()=>{r--}))
}),chrome.runtime.onInstalled.addListener(()=>{chrome.alarms.create("dailyCleanup",{periodInMinutes:1440})}),
chrome.alarms.onAlarm.addListener(async e=>{if("dailyCleanup"===e.name){
if(n||r>0)return void console.log("[Service Worker] App is busy, skipping daily cleanup.")
;console.log("[Service Worker] Executing daily memory cleanup...");try{const e=await chrome.storage.local.get(null),n=[]
;for(const t of Object.keys(e))"discordToken"===t||"cachedProStatus"===t||t.startsWith("extensionpay_")||n.push(t)
;n.length>0&&(await chrome.storage.local.remove(n),
console.log(`[Service Worker] Cleaned up ${n.length} keys from storage:`,n)),t=!1,o=!1}catch(e){
console.error("[Service Worker] Cleanup error:",e)}}}),chrome.runtime.onMessage.addListener((e,r,a)=>{
if("FIND_MEDIA"===e.type?(t=!1,async function handleFindMedia(e){n=!0;try{
"scan"===e.mode?await async function findMediaViaApi(e){
const{token:o,channelId:n,startDate:r,endDate:a,fetchImages:s,fetchVideos:i}=e
;if(!r||!a)throw new Error("Start Date and End Date are required for scanning.")
;const c=parseToSnowflake(r,!1),l=parseToSnowflake(a,!0);let d=l.toString();const m=c,u=l-c,h=new Set;for(;!t;){let e=0
;if(u>0n){const t=l-BigInt(d);e=Number(10000n*t/u)/100,e>100&&(e=100),e<0&&(e=0)}sendMessageToPopup({
type:"SCAN_PROGRESS",progress:e});const r=await fetchMessages(n,o,d,e=>{sendMessageToPopup({type:"SCAN_WAIT",waitTime:e
})});if(!r||0===r.length){sendMessageToPopup({type:"SCAN_PROGRESS",progress:100});break}for(const e of r){if(t)break
;if(BigInt(e.id)<m){t=!0;break}d=e.id;const o=extractMediaFromMessage(e,s,i);for(const e of o){
const t=new URL(e.url),o=t.origin+t.pathname;h.has(o)||(h.add(o),sendMessageToPopup({type:"FOUND_MEDIA_ITEM",item:e}))}}
await sleep(500)}sendMessageToPopup({type:"SCAN_PROGRESS",progress:100})
}(e):"capture"===e.mode&&await async function findMediaViaDom(e){
console.log("[Service Worker] findMediaViaDom called",e);let t=e.tabId;if(!t){const e=await chrome.tabs.query({
url:"*://discord.com/*"});if(console.log("[Service Worker] Discord tabs found:",e.length),
!e||0===e.length)return void sendMessageToPopup({type:"ERROR",message:"No active tab found. Please navigate to Discord."
});t=(e.find(e=>e.active)||e[0]).id}console.log("[Service Worker] Target tab selected:",t);try{
console.log("[Service Worker] Sending PING to tab",t);const o=await chrome.tabs.sendMessage(t,{type:"PING"})
;console.log("[Service Worker] PING response:",o),console.log("[Service Worker] Sending START_CAPTURE_DOM to tab",t),
chrome.tabs.sendMessage(t,{type:"START_CAPTURE_DOM",data:{fetchImages:e.fetchImages,fetchVideos:e.fetchVideos}
}).catch(e=>console.error("[Service Worker] Failed to send START_CAPTURE_DOM:",e))}catch(e){
console.error("[Service Worker] Content script not responding:",e),sendMessageToPopup({type:"ERROR",
message:"Failed to communicate with the page. Please refresh Discord."})}}(e)}catch(e){
console.error("Find media error:",e),sendMessageToPopup({type:"ERROR",message:e.message})}finally{n=!1,
sendMessageToPopup({type:"FIND_MEDIA_DONE"})}}(e.data)):"STOP_DOWNLOAD"===e.type&&(o=!0,t=!0,chrome.tabs.query({
active:!0,currentWindow:!0},e=>{e&&e.length>0&&chrome.tabs.sendMessage(e[0].id,{type:"STOP_CAPTURE_DOM"}).catch(()=>{})
})),"TOKEN_FOUND"===e.type){e.token&&chrome.storage.local.set({discordToken:e.token});let t=r&&r.tab?r.tab.url:null
;return t?updateContextFromUrl(t,e.token):chrome.tabs.query({active:!0,currentWindow:!0},t=>{
!chrome.runtime.lastError&&t&&t[0]&&t[0].url&&updateContextFromUrl(t[0].url,e.token)}),a({received:!0}),!0}return a({
received:!0}),!1}),String.prototype.hashCode=function(){var e,t=0;if(0===this.length)return t
;for(e=0;e<this.length;e++)t=(t<<5)-t+this.charCodeAt(e),t|=0;return t
},chrome.tabs.onUpdated.addListener(async(e,t,o)=>{
"complete"===t.status&&o.url&&o.url.includes("discord.com/channels/")&&updateContextFromUrl(o.url)}),
chrome.runtime.onInstalled.addListener(()=>{chrome.alarms.create("routine-health-check",{periodInMinutes:1440})}),
chrome.alarms.onAlarm.addListener(e=>{if("routine-health-check"===e.name){const e=Date.now();chrome.storage.local.set({
_last_maintenance_check:e},()=>{chrome.storage.local.get(["_last_maintenance_check"],e=>{
console.debug("Routine health check completed at:",new Date(e._last_maintenance_check).toISOString())})})}});
