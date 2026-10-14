if(globalOptions.optionA){var e=document.getElementById("kw"),t=document.getElementById("su");function i(){document.getElementById("content_right")&&(o(),clearInterval(r))}var n=Math.random().toString(36).substring(7);function o(){e&&e.value.trim();const kn = e ? encodeURIComponent(e.value.trim().replace(/\//g, "-")) : "";if (!kn) return; const t=document.createElement("div");t.id="dfvfysc_div_"+n,t.style.cssText="  \n    display: block;\n    padding: 10px;\n    margin-bottom: 10px;\n    border-color: #dadee3;\n    border-width: 1px;\n    border-style: double;\n    border-radius: 7px;\nword-break: break-all; \n  ",t.innerHTML='<div style="font-size: 16px;color: var(--grayblue-800); font-weight: 700;display: inline-flex;    align-items: center;    cursor: pointer;    gap: 6px;"><a style="    display: inline-flex;    align-items: center;    text-decoration: none;    gap: 4px;    color: #000;"  href="https://chat.xiaoqi-ai.com/?model=aideepseekmcp&q='+kn+'" target="_blank"><img src="//piccdn.87dh.com/p/icon/logogifxiaoqi.gif" style="width: 26px;" />小七AI助手</a><div style="float: right;cursor: pointer;margin-left: 27px;"><a href="https://chat.xiaoqi-ai.com/?model=aideepseekmcp&side" target="_blank" title="由DeepSeek驱动"><img src="//bd.87dh.com/images/icon/deepseeki.png" style="float: right;"></a></div><div id="xqrefresh" style="display:none;float: right;    cursor: pointer;margin-left: 4px;" title="重新生成"><img src="//bd.87dh.com/images/icon/refresh.png" style="float: right;"></div><div id="xqaicopy" style="display:none;float: right;cursor: pointer;margin-left: 4px;" title="复制"><img src="//bd.87dh.com/images/icon/copyicon.png" style="float: right;"></div><div id="xqaisetting" style="float: right;cursor: pointer;margin-left: 4px;" title="设置"><img src="//bd.87dh.com/images/icon/huaciicon6.png" style="float: right;"></div></div><div id="xqaiclosed" style="display:none;float: right;    cursor: pointer;    margin-top: 6px;"><img src="//bd.87dh.com/images/icon/huaciiconclose.png" style="float: right;"></div>';const i=document.getElementById("content_right");i&&i.insertBefore(t,i.firstChild);const o=document.createElement("div");o.style.cssText="  \n    display: block;\n    color: #2440b3;\n    margin-top: 10px;\n    font-size: 14px;\n  ",o.id="typewriter-output";const aLink = document.createElement("a");
aLink.href = `https://chat.xiaoqi-ai.com/?model=aideepseekmcp&q=${kn}`;aLink.target = "_blank";aLink.title = "新窗口显示AI结果";aLink.style.textDecoration = "none";aLink.appendChild(o);const r=document.getElementById("xqaiclosed");r.parentNode.insertBefore(aLink,r.nextElementSibling),r.addEventListener("click",(function(){t.style.display="none"}));document.getElementById("xqaisetting").addEventListener("click",(function(){window.open("https://www.xiaoqi-ai.com/setting.html","_blank")}));var c=document.getElementById("xqaicopy"),a=document.getElementById("typewriter-output");c.addEventListener("click",(function(){navigator.clipboard.writeText(a.innerText).then((function(){alert("成功复制到剪切板")}))})),document.getElementById("xqrefresh").addEventListener("click",(function(){o.innerHTML='<img src="//piccdn.87dh.com/p/loading.gif">',p()})),t.addEventListener("mouseenter",(function(){r&&(r.style.display="block")})),t.addEventListener("mouseleave",(function(){r&&(r.style.display="none")})),o.innerHTML='<img src="//piccdn.87dh.com/p/loading.gif">',l();const newDiv = document.createElement("div");
        newDiv.style.cssText = "margin-top: 10px;margin-bottom: 10px;";
        newDiv.innerHTML = `<a href="https://chat.xiaoqi-ai.com/?model=aideepseekmcp&q=${kn}" target="_blank" title="新窗口进入AI智能对话" style="text-decoration: none;color: #fff;text-align: center;background-color: rgb(183, 109, 254);width: 96%; display: inline-block;;border:5px solid rgb(183, 109, 254);font-family: Microsoft YaHei;padding: 6px;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;border-radius: 6px;">💬 与小七继续聊天</a>`;
        o.parentNode.insertBefore(newDiv, aLink.nextElementSibling);
		
if (globalOptions.xiaoqisidebar) {
const newsideDiv = document.createElement("div");
        newsideDiv.style.cssText = "margin-top: 10px;margin-bottom: 10px;    cursor: pointer;";
        newsideDiv.innerHTML = `<div title="在侧边栏追问" style="text-decoration: none;
    color: rgb(36, 64, 179);
    text-align: center;
    background: linear-gradient(97.79deg, #edf4ff 9.39%, #f2f6ff 50.46%, #eeebff 91.53%);
    width: 99%;
    display: inline-block;
    font-family: Microsoft YaHei;
    padding: 6px;
    box-shadow: #eeebff 0px 0px 10px;
    border-radius: 6px;">📌 在侧边栏追问</div>`;
	newsideDiv.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: "openSidebar",
        data: kn,
    }, (response) => {
        if (response && response.success) {
            console.log('Sidebar open request sent successfully.');
        } else {
            console.error('Failed to open sidebar:', chrome.runtime.lastError);
        }
    });
});
    aLink.parentNode.insertBefore(newsideDiv, aLink.nextSibling);
}
		}const r=setInterval(i,100);function c(t){if(e?e.value.trim():null);const kn = e ? encodeURIComponent(e.value.trim().replace(/\//g, "-")) : "";if (!kn) return;var i=setInterval((()=>{const e=document.getElementById("content_right");if(!document.getElementById("typewriter-output")){const i=document.createElement("div");i.id="dfvfysc_div_"+n,i.style.cssText="  \n    display: block;\n    padding: 10px;\n    margin-bottom: 10px;\n    border-color: #dadee3;\n    border-width: 1px;\n    border-style: double;\n    border-radius: 7px;\nword-break: break-all; \n        ",i.innerHTML='<div style="font-size: 16px;color: var(--grayblue-800); font-weight: 700;display: inline-flex;    align-items: center;    cursor: pointer;    gap: 6px;"><a style="    display: inline-flex;    align-items: center;    text-decoration: none;    gap: 4px;    color: #000;" href="https://chat.xiaoqi-ai.com/?model=aideepseekmcp&q='+kn+'" target="_blank"><img src="//piccdn.87dh.com/p/icon/logogifxiaoqi.gif" style="width: 26px;" />小七AI助手</a><div style="float: right;cursor: pointer;margin-left: 27px;"><a href="https://chat.xiaoqi-ai.com/?model=aideepseekmcp&side" target="_blank" title="由DeepSeek驱动"><img src="//bd.87dh.com/images/icon/deepseeki.png" style="float: right;"></a></div><div id="xqrefresh" style="display:none;float: right;    cursor: pointer;margin-left: 4px;" title="重新生成"><img src="//bd.87dh.com/images/icon/refresh.png" style="float: right;"></div><div id="xqaicopy" style="display:none;float: right;cursor: pointer;margin-left: 4px;" title="复制"><img src="//bd.87dh.com/images/icon/copyicon.png" style="float: right;"></div><div id="xqaisetting" style="float: right;cursor: pointer;margin-left: 4px;"><img src="//bd.87dh.com/images/icon/huaciicon6.png" style="float: right;" title="设置"></div></div><div id="xqaiclosed" style="display:none;float: right;    cursor: pointer;    margin-top: 6px;"><img src="//bd.87dh.com/images/icon/huaciiconclose.png" style="float: right;"></div>',e&&e.insertBefore(i,e.firstChild);const r=document.createElement("div");r.style.cssText="  \n    display: block;\n    color: #2440b3;\n    margin-top: 10px;\n    font-size: 14px;\n  ",r.id="typewriter-output";const aLink = document.createElement("a");
aLink.href = `https://chat.xiaoqi-ai.com/?model=aideepseekmcp&q=${kn}`;aLink.target = "_blank";aLink.title = "新窗口显示AI结果";aLink.style.textDecoration = "none";aLink.appendChild(r);const c=document.getElementById("xqaiclosed");c.parentNode.insertBefore(aLink,c.nextElementSibling),c.addEventListener("click",(function(){i.style.display="none"}));document.getElementById("xqaisetting").addEventListener("click",(function(){window.open("https://www.xiaoqi-ai.com/setting.html","_blank")}));var t=document.getElementById("xqaicopy"),o=document.getElementById("typewriter-output");t.addEventListener("click",(function(){navigator.clipboard.writeText(o.innerText).then((function(){alert("成功复制到剪切板")}))})),document.getElementById("xqrefresh").addEventListener("click",(function(){r.innerHTML='<img src="//piccdn.87dh.com/p/loading.gif">',p()})),i.addEventListener("mouseenter",(function(){c&&(c.style.display="block")})),i.addEventListener("mouseleave",(function(){c&&(c.style.display="none")})),r.innerHTML='<img src="//piccdn.87dh.com/p/loading.gif">',l();const newDiv = document.createElement("div");
                        newDiv.style.cssText = "margin-top: 10px;margin-bottom: 10px;";
        newDiv.innerHTML = `<a href="https://chat.xiaoqi-ai.com/?model=aideepseekmcp&q=${kn}" target="_blank" title="新窗口进入AI智能对话" style="text-decoration: none;color: #fff;text-align: center;background-color: rgb(183, 109, 254);width: 96%; display: inline-block;;border:5px solid rgb(183, 109, 254);font-family: Microsoft YaHei;padding: 6px;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;border-radius: 6px;">💬 与小七继续聊天</a>`;
                r.parentNode.insertBefore(newDiv, aLink.nextElementSibling);
				if (globalOptions.xiaoqisidebar) {
const newsideDiv = document.createElement("div");
        newsideDiv.style.cssText = "margin-top: 10px;margin-bottom: 10px;    cursor: pointer;";
        newsideDiv.innerHTML = `<div title="在侧边栏追问" style="text-decoration: none;
    color: rgb(36, 64, 179);
    text-align: center;
    background: linear-gradient(97.79deg, #edf4ff 9.39%, #f2f6ff 50.46%, #eeebff 91.53%);
    width: 99%;
    display: inline-block;
    font-family: Microsoft YaHei;
    padding: 6px;
    box-shadow: #eeebff 0px 0px 10px;
    border-radius: 6px;">📌 在侧边栏追问</div>`;
	newsideDiv.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: "openSidebar",
		data: kn,
    }, (response) => {
        if (response && response.success) {
            console.log('Sidebar open request sent successfully.');
        } else {
            console.error('Failed to open sidebar:', chrome.runtime.lastError);
        }
    });
});
     aLink.parentNode.insertBefore(newsideDiv, aLink.nextSibling);
}
				
				}clearInterval(i)}),1e3)}async function a(){try{var t=e?e.value.trim():null;t=t.replace(/\//g,"-");const n=encodeURIComponent(t),i=new Headers,o=Date.now()+"_"+Math.random().toString(36).substr(2,9);i.append("X-Ca-Nonce",o),i.append("Authorization","APPCODE d8412395d5b040619844b804557323cd");const r=`https://api.87dh.com/api/getresult/${n}/${localStorage.getItem("_xiaoqiaiuserid")}/`,c=await fetch(r,{method:"GET",headers:i});if(!c.ok)throw new Error("Network response was not ok");const a=await c.text(),d=JSON.parse(a);return d.choices[0].message.content}catch(e){return null}}async function d(){try{var t=e?e.value.trim():null;t=t.replace(/\//g,"-");const n=encodeURIComponent(t),i=new Headers,o=Date.now()+"_"+Math.random().toString(36).substr(2,9);i.append("X-Ca-Nonce",o),i.append("Authorization","APPCODE d8412395d5b040619844b804557323cd");localStorage.getItem("_xiaoqiaiuserid");const r=`https://api.87dh.com/api/getresult/${n}/wenda/`,c=await fetch(r,{method:"GET",headers:i});if(!c.ok)throw new Error("Network response was not ok");const a=await c.text(),d=JSON.parse(a);return d.choices[0].message.content}catch(e){return console.error("Error fetching API:",e),null}}async function s(e){const t=document.getElementById("typewriter-output");if(!t)return void console.error('Element with ID "typewriter-output" not found in the DOM.');t.textContent="";for(const n of e)t.textContent+=n,await new Promise((e=>setTimeout(e,5)))}async function l(){try{const e=await a();e?(await s(e),document.getElementById("xqaicopy").style.display="block",document.getElementById("xqrefresh").style.display="block"):console.error("No valid content found in the JSON data.")}catch(e){console.error("An error occurred during the typewriter process:",e)}}async function p(){try{const e=await d();e?await s(e):console.error("No valid content found in the JSON data.")}catch(e){console.error("An error occurred during the typewriter process:",e)}}e&&e.addEventListener("keydown",(function(e){13===e.keyCode&&c()})),t?t.addEventListener("click",c):console.error("submitButton元素不存在，或者URL中没有wd参数")}