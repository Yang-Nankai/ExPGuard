(function(){(function(){if(window.self===window.top)return;console.warn("firstjs初始化",window.self);const n=document.createElement("script");n.id="syncfuninitscript",n.src=chrome.runtime.getURL("src/content/first-main-world.js"),n.onload=function(){this.remove()},document.documentElement&&document.documentElement.appendChild(n)})();
})()
