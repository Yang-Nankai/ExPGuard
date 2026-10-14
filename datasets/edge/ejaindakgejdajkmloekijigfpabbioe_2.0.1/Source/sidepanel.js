chrome.storage.sync.get("xiaoqi_sidebar_status",e=>{e.xiaoqi_sidebar_status===!1&&chrome.tabs.query({active:!0,currentWindow:!0},r=>{if(r.length===0){console.error("\u672A\u80FD\u627E\u5230\u5F53\u524D\u6D3B\u52A8\u7684\u6807\u7B7E\u9875\u3002");return}const t=r[0].id;chrome.tabs.update(t,{url:"https://chat.xiaoqi-ai.com/?pop"},a=>{chrome.runtime.lastError&&console.error("\u4FA7\u8FB9\u680F\u5173\u95ED\u540E\u5C1D\u8BD5\u66F4\u65B0\u6807\u7B7E\u9875\u5931\u8D25:",chrome.runtime.lastError);window.close()})})});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateSidepanelContent") {
        const messageToSidebar = request.data; 
        if (messageToSidebar) {
            const iframe = document.getElementById("sidepanelsrc");
            
            if (iframe) {
                const newUrl = `https://chat.xiaoqi-ai.com/?sidepanel&q=${messageToSidebar}`;
                iframe.src = newUrl;
            } else {
                console.error("未找到 id 为 'sidepanelsrc' 的 iframe。");
            }
        }
        sendResponse({ status: "iframe_update_attempted" });
        return true; 
    }
});