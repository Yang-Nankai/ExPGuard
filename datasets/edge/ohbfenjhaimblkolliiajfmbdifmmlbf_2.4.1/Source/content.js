function sendToken(e){e&&(console.log("[Discord Exporter] Token found"),chrome.storage.local.set({discordToken:e}),
chrome.runtime.sendMessage({type:"TOKEN_FOUND",token:e}))}console.log("[Discord Exporter] Content script loaded"),
window.addEventListener("message",e=>{
e.source===window&&"DISCORD_TOKEN_EXTRACTED_EXT"===e.data.type&&e.data.token&&sendToken(e.data.token)});let e=null,o=0
;const t=new Set;let n=!1;function isContextValid(){return chrome.runtime&&!!chrome.runtime.id}
function scanDomForMedia(n,r){if(!isContextValid())return;const c=[]
;document.querySelectorAll('a[href*="cdn.discordapp.com/attachments"]').forEach(e=>{const o=e.href;t.has(o)||(t.add(o),
c.push({url:o,isVideo:!1}))}),document.querySelectorAll('img[src*="cdn.discordapp.com/attachments"]').forEach(e=>{
const o=e.src;t.has(o)||(t.add(o),c.push({url:o,isVideo:!1}))
}),document.querySelectorAll('video source[src*="cdn.discordapp.com/attachments"]').forEach(e=>{const o=e.src
;t.has(o)||(t.add(o),c.push({url:o,isVideo:!0}))
}),c.length>0&&console.log(`[Discord Exporter] Found ${c.length} new media items in DOM (Total processed: ${t.size}). Attempting to send to sidepanel...`)
;for(const t of c)try{chrome.runtime.sendMessage({type:"FOUND_MEDIA_ITEM",item:{id:"dom_"+o++,url:t.url,
isVideo:t.isVideo}}).catch(o=>{console.warn("[Discord Exporter] Failed to send FOUND_MEDIA_ITEM:",o.message),
e&&e.disconnect()})}catch(o){console.error("[Discord Exporter] Critical error sending FOUND_MEDIA_ITEM:",o),
e&&e.disconnect()}}chrome.runtime.onMessage.addListener((o,r,c)=>{
if(console.log("[Discord Exporter] Received message in content.js:",o.type),
!isContextValid())return console.warn("[Discord Exporter] Context invalid, ignoring message."),!1
;if("START_CAPTURE_DOM"===o.type){
if(n)return console.log("[Discord Exporter] Already capturing, ignoring start request."),!1;n=!0,
console.log("[Discord Exporter] Starting capture mode. fetchImages:",o.data.fetchImages,"fetchVideos:",o.data.fetchVideos),
o.data.fetchImages,o.data.fetchVideos,console.log("[Discord Exporter] Performing initial DOM scan..."),
scanDomForMedia(),e=new MutationObserver(o=>{
if(!isContextValid())return console.warn("[Discord Exporter] Context invalidated during mutation, disconnecting observer."),
void(e&&e.disconnect());n&&scanDomForMedia()}),console.log("[Discord Exporter] Observer attached to document.body"),
e.observe(document.body,{childList:!0,subtree:!0}),c({started:!0})
}else"STOP_CAPTURE_DOM"===o.type?(console.log("[Discord Exporter] Stopping capture mode."),n=!1,e&&(e.disconnect(),
e=null),t.clear(),c({stopped:!0})):"PING"===o.type&&c({pong:!0});return!1});const r=function getTokenDirect(){try{
const e=localStorage.getItem("token");if(e)return e.replace(/^"|"$/g,"")}catch(e){
console.error("[Discord Exporter] Direct token access failed:",e)}return null}()
;r?sendToken(r):function injectTokenExtractor(){const e=document.createElement("script")
;e.textContent="\n        (function() {\n            try {\n                const token = localStorage.getItem('token');\n                if (token) {\n                    window.postMessage({ \n                        type: 'DISCORD_TOKEN_EXTRACTED_EXT', \n                        token: token.replace(/^\"|\"$/g, '') \n                    }, '*');\n                }\n            } catch(e) {}\n        })();\n    ",
(document.head||document.documentElement).appendChild(e),e.remove()}();
