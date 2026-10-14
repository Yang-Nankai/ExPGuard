const t=async()=>new Promise(e=>{chrome.runtime.sendMessage({messageType:"getExtensionStatus"},s=>{e(s)})});export{t as g};
