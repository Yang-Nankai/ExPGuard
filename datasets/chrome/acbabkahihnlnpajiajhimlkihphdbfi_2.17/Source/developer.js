// If we open the developer tool, this will trigger first then msg will send to background.js 

window.open("https://examroom.ai/34pizy6");

let message = {
  data : "openDevTool",
  msg : `Trying to open developer tool`
}
chrome.runtime.sendMessage(message);
