async function isDomainAllowedAsync() {
    const remoteUrl = 'https://www.xiaoqi-ai.com/api/nocopwords.php';
    const currentDomain = window.location.hostname;

    try {
        const response = await fetch(remoteUrl);

        if (!response.ok) {
            console.warn(`Domain list fetch failed, assuming allowed.`);
            return true;
        }

        const text = await response.text();
        
        const prohibitedDomains = text
            .split('\n')
            .map(d => d.trim())
            .filter(d => d.length > 0);

        const isProhibited = prohibitedDomains.some(domain => {
            return currentDomain === domain || currentDomain.endsWith('.' + domain);
        });

        return !isProhibited;

    } catch (error) {
        console.error('Network or parsing error during domain check:', error);
        return true; 
    }
}
function executeOptionBLogic() {
  let checkForContainer2 = function() {
    var container = document.getElementById("container");
    if (container) {
      let setTypewriterListener3 = function(button, type) {
        button.addEventListener("click", () => {
          starthuaciTypewriter(type);
          setUpElements3();
        });
      }, setUpElements3 = function() {
        huacipopoverDiv2.style.cssText = `  
    top: 18%;
      right: 32%;
	           display: block;  
			               position: fixed;  
            background-color: #fff;  
    background-color: rgb(255, 255, 255);
    border: 1px solid #F1F2F4;
    border-radius: 14px;
     width: 208px;
    height: 20px;
    padding: 4px 8px 4px 8px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
           z-index: 999998; 
		   box-sizing: unset;
`;
        closeButton.style.cssText = `           float: right;  
            cursor: pointer;  display: block;    `;
        moreContent.style.cssText = `  
            display: block;  
			        position: fixed;  
        border: 1px solid #F1F2F4;  
        padding: 16px;  
		    top: 20%;
    right: 6%;
    width: 40%;
        background-color: #fff;  
        margin-top: 26px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  
		    border-radius: 14px;
	  z-index: 999999; 
		 font-size: 16px;
		 color:rgb(36, 64, 179);
  `;
        const typewriterOutput = document.getElementById("morecontentre");
        typewriterOutput.innerHTML = '<img src="//bd.87dh.com/images/loading.gif">';
        const copyButton3 = document.getElementById("copyButton");
        copyButton3.textContent = "\u590D\u5236";
      };
      var setTypewriterListener2 = setTypewriterListener3, setUpElements2 = setUpElements3;
      var huacipopoverDiv2 = document.createElement("div");
      var randomIdSuffix2 = Math.random().toString(36).substring(7);
      huacipopoverDiv2.id = "popover-" + randomIdSuffix2;
      huacipopoverDiv2.style.cssText = `  
            display: none;
  `;
      var imgbutton02 = document.createElement("img");
      imgbutton02.id = "actionButton0";
      imgbutton02.src = "//bd.87dh.com/images/icon/huaciicon0.png";
      imgbutton02.title = "\u641C\u7D22";
      huacipopoverDiv2.appendChild(imgbutton02);
      var imgbutton12 = document.createElement("img");
      imgbutton12.id = "actionButton1";
      imgbutton12.src = "//bd.87dh.com/images/icon/huaciicon1.png";
      imgbutton12.title = "\u603B\u7ED3\u8FD9\u6BB5\u6587\u672C";
      huacipopoverDiv2.appendChild(imgbutton12);
      var imgbutton22 = document.createElement("img");
      imgbutton22.id = "actionButton2";
      imgbutton22.src = "//bd.87dh.com/images/icon/huaciicon2.png";
      imgbutton22.title = "\u7FFB\u8BD1\u8FD9\u6BB5\u6587\u672C";
      huacipopoverDiv2.appendChild(imgbutton22);
      var imgbutton32 = document.createElement("img");
      imgbutton32.id = "actionButton3";
      imgbutton32.src = "//bd.87dh.com/images/icon/huaciicon3.png";
      imgbutton32.title = "\u6539\u5199\u8FD9\u6BB5\u6587\u672C";
      huacipopoverDiv2.appendChild(imgbutton32);
      var imgbutton42 = document.createElement("img");
      imgbutton42.id = "actionButton4";
      imgbutton42.title = "\u6269\u5199\u8FD9\u6BB5\u6587\u672C";
      imgbutton42.src = "//bd.87dh.com/images/icon/huaciicon4.png";
      huacipopoverDiv2.appendChild(imgbutton42);
      var imgbutton52 = document.createElement("img");
      imgbutton52.id = "actionButton5";
      imgbutton52.title = "\u63D0\u95EE\u8FD9\u6BB5\u6587\u672C";
      imgbutton52.src = "//bd.87dh.com/images/icon/huaciicon5.png";
      huacipopoverDiv2.appendChild(imgbutton52);
      var imgbutton72 = document.createElement("div");
      imgbutton72.id = "actionButton7";
      imgbutton72.title = "在侧边栏提问这段文本";
      imgbutton72.innerHTML = '<img src="//bd.87dh.com/images/icon/xiaoqisiderbar.png">';
      huacipopoverDiv2.appendChild(imgbutton72);
      var imgbutton62 = document.createElement("div");
      imgbutton62.id = "actionButton6";
      imgbutton62.title = "\u66F4\u591A\u8BBE\u7F6E";
      imgbutton62.innerHTML = '<img id="huacixqaisetting" src="//bd.87dh.com/images/icon/huaciicon6.png">';
      huacipopoverDiv2.appendChild(imgbutton62);
      var settingsline2 = document.createElement("div");
      settingsline2.style.cssText = `  
position: absolute;
    top: 0;
    bottom: 0;
    left: 87%;
    width: 1px;
    background-color: #F1F2F4;
    transform: translateX(-50%);
  `;
      huacipopoverDiv2.appendChild(settingsline2);
      var closeButtondiv2 = document.createElement("img");
      closeButtondiv2.id = "closeButton";
      closeButtondiv2.src = "//bd.87dh.com/images/icon/huaciiconclose.png";
      closeButtondiv2.style.cssText = `  
    float: right;
    display: block;
    margin-left: 2px;
  `;
      huacipopoverDiv2.appendChild(closeButtondiv2);
      var huacimoreContentDiv2 = document.createElement("div");
      huacimoreContentDiv2.id = "more-content-" + randomIdSuffix2;
      huacimoreContentDiv2.style.cssText = `  
       display: none;  
  `;
      huacimoreContentDiv2.innerHTML = '<img src="//bd.87dh.com/images/icon/logogifxiaoqi.gif" style="width: 20px;    float: left;    margin-right: 10px;" title="\u5C0F\u4E03AI\u52A9\u624B">';
      var moreContentreDiv2 = document.createElement("div");
      moreContentreDiv2.id = "morecontentre";
      moreContentreDiv2.style.cssText = `  
         max-height: 337px;
    overflow-y: auto;
  `;
      moreContentreDiv2.innerHTML = '<img src="//bd.87dh.com/images/loading.gif">';
      huacimoreContentDiv2.appendChild(moreContentreDiv2);
      var copyButtonDiv2 = document.createElement("button");
      copyButtonDiv2.id = "copyButton";
      copyButtonDiv2.textContent = "\u590D\u5236";
      copyButtonDiv2.style.cssText = `  
    float: right;
    cursor: pointer;
     margin-top: 12px;
    font-size: 14px;
    color: #fff;
    background-color: #4e71f2;
    border: 0px;
    max-height: 40px;
    width: auto;
  `;
      huacimoreContentDiv2.appendChild(copyButtonDiv2);
      var closehuacimoreContentDiv2 = document.createElement("div");
      closehuacimoreContentDiv2.id = "closemorecontent";
      closehuacimoreContentDiv2.style.cssText = `  
float: right;
    cursor: pointer;
    position: absolute;
    right: 4px;
    top: 5px;
  `;
      closehuacimoreContentDiv2.innerHTML = '<img id="closeimgc" src="//bd.87dh.com/images/icon/huaciiconclose.png" style="float: right;">';
      huacimoreContentDiv2.appendChild(closehuacimoreContentDiv2);
      document.body.appendChild(huacipopoverDiv2);
      document.body.appendChild(huacimoreContentDiv2);
      var popoverId2 = "popover-" + randomIdSuffix2;
      var moreContentId2 = "more-content-" + randomIdSuffix2;
      const popover = document.getElementById(popoverId2);
      const moreContent = document.getElementById(moreContentId2);
      const closeButton = document.getElementById("closeButton");
      const closemorecontent = document.getElementById("closeimgc");
      document.addEventListener("selectionchange", function() {
       const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const selectedText = range.toString();
		  //console.log(selectedText);
          if (selectedText) {
              const rect = range.getBoundingClientRect();
          const floatLayerRect = popover.getBoundingClientRect();
          const minWidth = 226;
          const minHeight = 30;
          const floatputedWidth = Math.max(floatLayerRect.width, minWidth);
          const floatputedHeight = Math.max(floatLayerRect.height, minHeight);
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY;
          const calculatedLeft = rect.left - 50;
          const calculatedTop = rect.top + scrollY - floatputedHeight - 10;
          let left = Math.max(calculatedLeft, 60);
           if (left + floatputedWidth > viewportWidth -20 ) {
              left = viewportWidth - floatputedWidth - 20; 
              //const maxLeft = viewportWidth - floatputedWidth - 20;
             // left = Math.min(left, maxLeft);
            }
          let top = Math.max(calculatedTop, 0);
             if ( top = rect.top ){
			top = Math.max(0, rect.top - floatputedHeight -10);
             }
		   if (top + rect.top + floatputedHeight > viewportHeight - 10) {  
    top = Math.max(0, viewportHeight - rect.top - floatputedHeight -10);  
  }   
          updatePopoverPosition(left, top); 
          // console.log(left);
		  // console.log(top);
var existingLinks = huacimoreContentDiv2.querySelectorAll('a[title]');
            existingLinks.forEach(function(link) {
                if (link.getAttribute('title') === "新窗口进入AI智能对话") {
                    anewchatDiv2 = link;
                }
            });
if (anewchatDiv2) {
                // 如果已经存在链接，则更新它的href属性
                anewchatDiv2.href = "https://chat.xiaoqi-ai.com/?q=" + encodeURIComponent(selectedText);
            } else {
var anewchatDiv2 = document.createElement("a");
anewchatDiv2.title = "新窗口进入AI智能对话";
anewchatDiv2.href = "https://chat.xiaoqi-ai.com/?q=" + encodeURIComponent(selectedText);
anewchatDiv2.target = "_blank";
anewchatDiv2.textContent = "💬 与小七继续聊天";
anewchatDiv2.style.cssText = `
text-decoration: none;
color: #fff;
text-align: center;
background-color: rgb(183, 109, 254);
width: 100%;
display: inline-block;
border: 5px solid rgb(183, 109, 254);
font-family: 'Microsoft YaHei';
padding: 2px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
border-radius: 6px;
margin-top: 10px;
`;
      huacimoreContentDiv2.appendChild(anewchatDiv2);
if (globalOptions.xiaoqisidebar) {
const anewsidechatDiv = document.createElement("div");
        anewsidechatDiv.innerHTML = `<div title="打开侧边栏提问" style="
cursor: pointer;
    color: rgb(36, 64, 179);
    text-align: center;
    background: linear-gradient(97.79deg, #edf4ff 9.39%, #f2f6ff 50.46%, #eeebff 91.53%);
        width: 100%;
	    margin-top: 10px;
    display: inline-block;
    font-family: Microsoft YaHei;
    padding: 6px;
    box-shadow: #eeebff 0px 0px 10px;
    border-radius: 6px;">📌 打开侧边栏提问</div>`;
	anewsidechatDiv.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: "openSidebar",
    }, (response) => {
        if (response && response.success) {
            console.log('Sidebar open request sent successfully.');
        } else {
            console.error('Failed to open sidebar:', chrome.runtime.lastError);
        }
    });
});
     huacimoreContentDiv.appendChild(anewsidechatDiv);
}
}
          } else {
            huacipopoverDiv2.style.cssText = `
display: none;  
	`;
          }
        } else {
          huacipopoverDiv2.style.cssText = `
display: none;  
	`;
        }
      });
	  function updatePopoverPosition(left, top) {  
  requestAnimationFrame(() => {  
    huacipopoverDiv2.style.cssText = `  
      top: ${top}px;  
      left: ${left}px;  
    position: fixed;  
            background-color: #fff;  
    background-color: rgb(255, 255, 255);
    border: 1px solid #F1F2F4;
    border-radius: 14px;
     width: 208px;
    height: 20px;
    padding: 4px 8px 4px 8px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
           z-index: 999998; 
		   box-sizing: unset;
      transition: opacity 0.3s ease, top 0.3s ease, left 0.3s ease;
	  opacity: 0; 
 user-select: none;  
  -moz-user-select: none; /* Firefox私有属性 */  
  -ms-user-select: none; /* Internet Explorer/Edge私有属性 */  
  -webkit-user-select: none; /* Safari和Chrome私有属性 */  
    `;  
  setTimeout(() => {  
      huacipopoverDiv2.style.opacity = 1;  
    }, 10);  
  });    
}
      const actionButton0 = document.getElementById("actionButton0");
      actionButton0.addEventListener("click", function() {
        
        let encodedKwValue = "";
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
		  encodedKwValue = range.toString();
		  encodedKwValue = encodedKwValue.replace(/[\n\r\u2028\u2029]/g, '');
          encodedKwValue = encodeURIComponent(encodedKwValue.trim());
          const baseUrl = "https://www.xiaoqi-ai.com/search/?method=huaci&wd=";
          newbaseUrlencode = baseUrl + encodedKwValue;
          window.open(newbaseUrlencode, "_blank");
        }
      });

	   const actionButton7 = document.getElementById("actionButton7");
      actionButton7.addEventListener("click", function() {
        const selection = window.getSelection();
        let encodedKwValue = "";
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
		  encodedKwValue = range.toString();
		  encodedKwValue = encodedKwValue.replace(/[\n\r\u2028\u2029]/g, '');
           encodedKwValue = encodeURIComponent(encodedKwValue.trim());
          console.log(encodedKwValue);
         chrome.runtime.sendMessage({
        action: "openSidebar",
		data: encodedKwValue,
    }, (response) => {
        if (response && response.success) {
            console.log('Sidebar open request sent successfully.');
        } else {
            console.error('Failed to open sidebar:', chrome.runtime.lastError);
        }
    });
        }
      });


      const actionButton1 = document.getElementById("actionButton1");
      const actionButton2 = document.getElementById("actionButton2");
      const actionButton3 = document.getElementById("actionButton3");
      const actionButton4 = document.getElementById("actionButton4");
      const actionButton5 = document.getElementById("actionButton5");
      setTypewriterListener3(actionButton1, 1);
      setTypewriterListener3(actionButton2, 2);
      setTypewriterListener3(actionButton3, 3);
      setTypewriterListener3(actionButton4, 4);
      setTypewriterListener3(actionButton5, 5);
      closeButton.addEventListener("click", function() {
        huacipopoverDiv2.style.cssText = `  
            display: none;  
  `;
      });
      closemorecontent.addEventListener("click", function() {
        huacipopoverDiv2.style.cssText = `  
            display: none;  
  `;
        moreContent.style.cssText = `  
            display: none;  
  `;
      });
      var copyButton2 = document.getElementById("copyButton");
      var copyText2 = document.getElementById("morecontentre");
      copyButton2.addEventListener("click", function() {
        navigator.clipboard.writeText(copyText2.innerText).then(function() {
          copyButton2.textContent = "\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F";
        }).catch(function(err) {
          console.error("\u65E0\u6CD5\u590D\u5236\u6587\u672C: ", err);
          copyButton2.textContent = "\u65E0\u6CD5\u590D\u5236";
        });
      });
      async function fetchhuaciAPI(tpye) {
        try {
          const selection = window.getSelection();
          let encodedKwValue = "";
          if (selection.rangeCount > 0) {
            let generateNonce2 = function() {
              return Date.now() + "_" + Math.random().toString(36).substr(2, 9);
            };
            var generateNonce = generateNonce2;
            const range = selection.getRangeAt(0);
			encodedKwValue = range.toString();
		    encodedKwValue = encodedKwValue.replace(/[\n\r\u2028\u2029]/g, '');
            encodedKwValue = encodedKwValue.trim();
            encodedKwValue = encodedKwValue.replace(/\//g, "-");
            const nonce = generateNonce2();
            const params = new URLSearchParams({
              kwds: encodedKwValue,
              tpye
            });
            const response = await fetch("https://api.87dh.com/xiaoqiapi/", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Authorization": "APPCODE d8412395d5b040619844b804557323cd",
                "X-Ca-Nonce": nonce
              },
              body: params
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const text = await response.text();
            const jsonObject = JSON.parse(text);
            const content = jsonObject.choices[0].message.content;
            return content;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching API:", error);
          return null;
        }
      }
      async function displayhuaciContent(huacicontent) {
        const typewriterOutput = document.getElementById("morecontentre");
        if (!typewriterOutput) {
          console.error('Element with ID "moreContent" not found in the DOM.');
          return;
        }
        typewriterOutput.textContent = "";
        const delayPerChar = 5;
        for (const char of huacicontent) {
          typewriterOutput.textContent += char;
          await new Promise((resolve) => setTimeout(resolve, delayPerChar));
        }
      }
      async function starthuaciTypewriter(tpye) {
        try {
          const huacicontent = await fetchhuaciAPI(tpye);
          if (huacicontent) {
            await displayhuaciContent(huacicontent);
          } else {
            console.error("No valid content found in the JSON data.");
          }
        } catch (error) {
          console.error("An error occurred during the typewriter process:", error);
        }
      }
      const huacixqaisettingDiv = document.getElementById("huacixqaisetting");
      huacixqaisettingDiv.addEventListener("click", function() {
        window.open("https://www.xiaoqi-ai.com/setting.html", "_blank");
      });
      clearInterval(checkInterval);
    } else {
    }
  };
  var checkForContainer = checkForContainer2;
  if (window.location.hostname === "www.baidu.com" && !window.location.href.includes("www.baidu.com/s?")) {
    var checkInterval = setInterval(checkForContainer2, 5e3);
  } else {
    let setTypewriterListener2 = function(button, type) {
      button.addEventListener("click", () => {
        starthuaciTypewriter(type);
        setUpElements2();
      });
    }, setUpElements2 = function() {
      huacipopoverDiv.style.cssText = `  
    top: 18%;
      right: 32%;
	           display: block;  
			               position: fixed;  
            background-color: #fff;  
    background-color: rgb(255, 255, 255);
    border: 1px solid #F1F2F4;
    border-radius: 14px;
     width: 208px;
    height: 20px;
    padding: 4px 8px 4px 8px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
           z-index: 999998; 
		   box-sizing: unset;
`;
      closeButton.style.cssText = `           float: right;  
            cursor: pointer;  display: block;    `;
      moreContent.style.cssText = `  
            display: block;  
			        position: fixed;  
        border: 1px solid #F1F2F4;  
        padding: 16px;  
		    top: 20%;
    right: 6%;
    width: 40%;
        background-color: #fff;  
        margin-top: 26px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  
		    border-radius: 14px;
	  z-index: 999999; 
		 font-size: 16px;
		 color:rgb(36, 64, 179);
  `;
      const typewriterOutput = document.getElementById("morecontentre");
      typewriterOutput.innerHTML = '<img src="//bd.87dh.com/images/loading.gif">';
      const copyButton2 = document.getElementById("copyButton");
      copyButton2.textContent = "\u590D\u5236";
    };
    var setTypewriterListener = setTypewriterListener2, setUpElements = setUpElements2;
    var huacipopoverDiv = document.createElement("div");
    var randomIdSuffix = Math.random().toString(36).substring(7);
    huacipopoverDiv.id = "popover-" + randomIdSuffix;
    huacipopoverDiv.style.cssText = ` 
display: none; 
 user-select: none;  
  -moz-user-select: none; /* Firefox私有属性 */  
  -ms-user-select: none; /* Internet Explorer/Edge私有属性 */  
  -webkit-user-select: none; /* Safari和Chrome私有属性 */  
  `;
    var imgbutton0 = document.createElement("img");
    imgbutton0.id = "actionButton0";
    imgbutton0.src = "//bd.87dh.com/images/icon/huaciicon0.png";
    imgbutton0.title = "\u641C\u7D22";
    huacipopoverDiv.appendChild(imgbutton0);
    var imgbutton1 = document.createElement("img");
    imgbutton1.id = "actionButton1";
    imgbutton1.src = "//bd.87dh.com/images/icon/huaciicon1.png";
    imgbutton1.title = "\u603B\u7ED3\u8FD9\u6BB5\u6587\u672C";
    huacipopoverDiv.appendChild(imgbutton1);
    var imgbutton2 = document.createElement("img");
    imgbutton2.id = "actionButton2";
    imgbutton2.src = "//bd.87dh.com/images/icon/huaciicon2.png";
    imgbutton2.title = "\u7FFB\u8BD1\u8FD9\u6BB5\u6587\u672C";
    huacipopoverDiv.appendChild(imgbutton2);
    var imgbutton3 = document.createElement("img");
    imgbutton3.id = "actionButton3";
    imgbutton3.src = "//bd.87dh.com/images/icon/huaciicon3.png";
    imgbutton3.title = "\u6539\u5199\u8FD9\u6BB5\u6587\u672C";
    huacipopoverDiv.appendChild(imgbutton3);
    var imgbutton4 = document.createElement("img");
    imgbutton4.id = "actionButton4";
    imgbutton4.title = "\u6269\u5199\u8FD9\u6BB5\u6587\u672C";
    imgbutton4.src = "//bd.87dh.com/images/icon/huaciicon4.png";
    huacipopoverDiv.appendChild(imgbutton4);
    var imgbutton5 = document.createElement("img");
    imgbutton5.id = "actionButton5";
    imgbutton5.title = "\u63D0\u95EE\u8FD9\u6BB5\u6587\u672C";
    imgbutton5.src = "//bd.87dh.com/images/icon/huaciicon5.png";
    huacipopoverDiv.appendChild(imgbutton5);
    var imgbutton7 = document.createElement("div");
    imgbutton7.id = "actionButton7";
    imgbutton7.title = "在侧边栏提问这段文本";
    imgbutton7.innerHTML = '<img src="//bd.87dh.com/images/icon/xiaoqisiderbar.png">';
    huacipopoverDiv.appendChild(imgbutton7);
    var imgbutton6 = document.createElement("div");
    imgbutton6.id = "actionButton6";
    imgbutton6.title = "\u66F4\u591A\u8BBE\u7F6E";
    imgbutton6.innerHTML = '<img id="huacixqaisetting" src="//bd.87dh.com/images/icon/huaciicon6.png">';
    huacipopoverDiv.appendChild(imgbutton6);
    var settingsline = document.createElement("div");
    settingsline.style.cssText = `  
position: absolute;
    top: 0;
    bottom: 0;
    left: 87%;
    width: 1px;
    background-color: #F1F2F4;
    transform: translateX(-50%);
  `;
    huacipopoverDiv.appendChild(settingsline);
    var closeButtondiv = document.createElement("img");
    closeButtondiv.id = "closeButton";
    closeButtondiv.src = "//bd.87dh.com/images/icon/huaciiconclose.png";
    closeButtondiv.style.cssText = `  
    float: right;
    display: block;
    margin-left: 2px;
  `;
    huacipopoverDiv.appendChild(closeButtondiv);
    var huacimoreContentDiv = document.createElement("div");
    huacimoreContentDiv.id = "more-content-" + randomIdSuffix;
    huacimoreContentDiv.style.cssText = `  
       display: none;  
  `;
    huacimoreContentDiv.innerHTML = '<img src="//bd.87dh.com/images/icon/logogifxiaoqi.gif" style="width: 20px;    float: left;    margin-right: 10px;" title="\u5C0F\u4E03AI\u52A9\u624B">';
    var moreContentreDiv = document.createElement("div");
    moreContentreDiv.id = "morecontentre";
    moreContentreDiv.style.cssText = `  
        max-height: 337px;
    overflow-y: auto;

  `;
    moreContentreDiv.innerHTML = '<img src="//bd.87dh.com/images/loading.gif">';
    huacimoreContentDiv.appendChild(moreContentreDiv);
    var copyButtonDiv = document.createElement("button");
    copyButtonDiv.id = "copyButton";
    copyButtonDiv.textContent = "\u590D\u5236";
    copyButtonDiv.style.cssText = `  
    float: right;
    cursor: pointer;
     margin-top: 12px;
    font-size: 14px;
    color: #fff;
    background-color: #4e71f2;
    border: 0px;
    max-height: 40px;
    width: auto;
  `;
    huacimoreContentDiv.appendChild(copyButtonDiv);
    var closehuacimoreContentDiv = document.createElement("div");
    closehuacimoreContentDiv.id = "closemorecontent";
    closehuacimoreContentDiv.style.cssText = `  
float: right;
    cursor: pointer;
    position: absolute;
    right: 4px;
    top: 5px;
  `;
    closehuacimoreContentDiv.innerHTML = '<img id="closeimgc" src="//bd.87dh.com/images/icon/huaciiconclose.png" style="float: right;">';
    huacimoreContentDiv.appendChild(closehuacimoreContentDiv);
    document.body.appendChild(huacipopoverDiv);
    document.body.appendChild(huacimoreContentDiv);
    var popoverId = "popover-" + randomIdSuffix;
    var moreContentId = "more-content-" + randomIdSuffix;
    const popover = document.getElementById(popoverId);
    const moreContent = document.getElementById(moreContentId);
    const closeButton = document.getElementById("closeButton");
    const closemorecontent = document.getElementById("closeimgc");
    document.addEventListener("selectionchange", function() {
	 const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
		//console.log(selectedText);
        if (selectedText) {
          const rect = range.getBoundingClientRect();
          const floatLayerRect = popover.getBoundingClientRect();
          const minWidth = 226;
          const minHeight = 30;
          const floatputedWidth = Math.max(floatLayerRect.width, minWidth);
          const floatputedHeight = Math.max(floatLayerRect.height, minHeight);
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY;
          const calculatedLeft = rect.left - 50;
          const calculatedTop = rect.top + scrollY - floatputedHeight - 10;
          let left = Math.max(calculatedLeft, 60);
           if (left + floatputedWidth > viewportWidth -20 ) {
              left = viewportWidth - floatputedWidth - 20; 
              //const maxLeft = viewportWidth - floatputedWidth - 20;
             // left = Math.min(left, maxLeft);
            }
          let top = Math.max(calculatedTop, 0);
             if ( top = rect.top ){
			top = Math.max(0, rect.top - floatputedHeight -10);
             }
		   if (top + rect.top + floatputedHeight > viewportHeight - 10) {  
    top = Math.max(0, viewportHeight - rect.top - floatputedHeight -10);  
  }   
          updatePopoverPosition(left, top); 
          // console.log(left);
		  // console.log(top);
var existingLinks = huacimoreContentDiv.querySelectorAll('a[title]');
            existingLinks.forEach(function(link) {
                if (link.getAttribute('title') === "新窗口进入AI智能对话") {
                    anewchatDiv = link;
                }
            });
if (anewchatDiv) {
                anewchatDiv.href = "https://chat.xiaoqi-ai.com/?q=" + encodeURIComponent(selectedText);
            } else {
  	var anewchatDiv = document.createElement("a");
anewchatDiv.title = "新窗口进入AI智能对话";
anewchatDiv.href = "https://chat.xiaoqi-ai.com/?q=" + encodeURIComponent(selectedText);
anewchatDiv.target = "_blank";
anewchatDiv.textContent = "💬 与小七继续聊天";
anewchatDiv.style.cssText = `
text-decoration: none;
color: #fff;
text-align: center;
background-color: rgb(183, 109, 254);
width: 100%;
display: inline-block;
border: 5px solid rgb(183, 109, 254);
font-family: 'Microsoft YaHei';
padding: 2px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
border-radius: 6px;
margin-top: 10px;
`;
      huacimoreContentDiv.appendChild(anewchatDiv);

if (globalOptions.xiaoqisidebar) {
const anewsidechatDiv = document.createElement("div");
        anewsidechatDiv.innerHTML = `<div title="打开侧边栏提问" style="
cursor: pointer;
    color: rgb(36, 64, 179);
    text-align: center;
    background: linear-gradient(97.79deg, #edf4ff 9.39%, #f2f6ff 50.46%, #eeebff 91.53%);
    width: 100%;
	    margin-top: 10px;
    display: inline-block;
    font-family: Microsoft YaHei;
    padding: 6px;
    box-shadow: #eeebff 0px 0px 10px;
    border-radius: 6px;">📌 打开侧边栏提问</div>`;
	anewsidechatDiv.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: "openSidebar",
    }, (response) => {
        if (response && response.success) {
            console.log('Sidebar open request sent successfully.');
        } else {
            console.error('Failed to open sidebar:', chrome.runtime.lastError);
        }
    });
});
     huacimoreContentDiv.appendChild(anewsidechatDiv);
}

}
        } else {
          huacipopoverDiv.style.cssText = `
display: none;  
	`;
        }
      } else {
        huacipopoverDiv.style.cssText = `
display: none;  
	`;
      }
    }
	);
    const actionButton0 = document.getElementById("actionButton0");
    actionButton0.addEventListener("click", function() {
      const selection = window.getSelection();
      let encodedKwValue = "";
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
			encodedKwValue = range.toString();
		    encodedKwValue = encodedKwValue.replace(/[\n\r\u2028\u2029]/g, '');
            encodedKwValue = encodedKwValue.trim();
            encodedKwValue = encodedKwValue.replace(/\//g, "-");
        const baseUrl = "https://www.xiaoqi-ai.com/search/?method=huaci&wd=";
        newbaseUrlencode = baseUrl + encodedKwValue;
        window.open(newbaseUrlencode, "_blank");
      }
    });
		   const actionButton7 = document.getElementById("actionButton7");
      actionButton7.addEventListener("click", function() {
        const selection = window.getSelection();
        let encodedKwValue = "";
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
		  encodedKwValue = range.toString();
		  encodedKwValue = encodedKwValue.replace(/[\n\r\u2028\u2029]/g, '');
           encodedKwValue = encodeURIComponent(encodedKwValue.trim());
		  console.log(encodedKwValue);
		  chrome.runtime.sendMessage({
        action: "openSidebar",
		data: encodedKwValue,
    }, (response) => {
        if (response && response.success) {
            console.log('Sidebar open request sent successfully.');
        } else {
            console.error('Failed to open sidebar:', chrome.runtime.lastError);
        }
    });
        }
      });
    const actionButton1 = document.getElementById("actionButton1");
    const actionButton2 = document.getElementById("actionButton2");
    const actionButton3 = document.getElementById("actionButton3");
    const actionButton4 = document.getElementById("actionButton4");
    const actionButton5 = document.getElementById("actionButton5");
    setTypewriterListener2(actionButton1, 1);
    setTypewriterListener2(actionButton2, 2);
    setTypewriterListener2(actionButton3, 3);
    setTypewriterListener2(actionButton4, 4);
    setTypewriterListener2(actionButton5, 5);
    closeButton.addEventListener("click", function() {
      huacipopoverDiv.style.cssText = `  
            display: none;  
  `;
    });
    closemorecontent.addEventListener("click", function() {
      huacipopoverDiv.style.cssText = `  
            display: none;  
  `;
      moreContent.style.cssText = `  
            display: none;  
  `;
    });
function updatePopoverPosition(left, top) {  
  requestAnimationFrame(() => {  
    huacipopoverDiv.style.cssText = `  
      top: ${top}px;  
      left: ${left}px;  
    position: fixed;  
            background-color: #fff;  
    background-color: rgb(255, 255, 255);
    border: 1px solid #F1F2F4;
    border-radius: 14px;
     width: 208px;
    height: 20px;
    padding: 4px 8px 4px 8px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
           z-index: 999998; 
		   box-sizing: unset;
      transition: opacity 0.3s ease, top 0.3s ease, left 0.3s ease;
	  opacity: 0; 
 user-select: none;  
  -moz-user-select: none; /* Firefox私有属性 */  
  -ms-user-select: none; /* Internet Explorer/Edge私有属性 */  
  -webkit-user-select: none; /* Safari和Chrome私有属性 */  
    `;  
  setTimeout(() => {  
      huacipopoverDiv.style.opacity = 1;  
    }, 10);  
  });    
}
    var copyButton = document.getElementById("copyButton");
    var copyText = document.getElementById("morecontentre");
    copyButton.addEventListener("click", function() {
      navigator.clipboard.writeText(copyText.innerText).then(function() {
        copyButton.textContent = "\u6210\u529F\u590D\u5236\u5230\u526A\u8D34\u677F";
      }).catch(function(err) {
        console.error("\u65E0\u6CD5\u590D\u5236\u6587\u672C: ", err);
        copyButton.textContent = "\u65E0\u6CD5\u590D\u5236";
      });
    });

    async function fetchhuaciAPI(tpye) {
      try {
        const selection = window.getSelection();
        let encodedKwValue = "";
        if (selection.rangeCount > 0) {
          let generateNonce2 = function() {
            return Date.now() + "_" + Math.random().toString(36).substr(2, 9);
          };
          var generateNonce = generateNonce2;
          const range = selection.getRangeAt(0);
          encodedKwValue = range.toString().trim();
		  encodedKwValue = encodedKwValue.replace(/[\n\r\u2028\u2029]/g, '');
          encodedKwValue = encodedKwValue.replace(/\//g, "-");
          const nonce = generateNonce2();
          const params = new URLSearchParams({
            kwds: encodedKwValue,
            tpye
          });
          const response = await fetch("https://api.87dh.com/xiaoqiapi/", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              "Authorization": "APPCODE d8412395d5b040619844b804557323cd",
              "X-Ca-Nonce": nonce
            },
            body: params
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const text = await response.text();
          const jsonObject = JSON.parse(text);
          const content = jsonObject.choices[0].message.content;
          return content;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error fetching API:", error);
        return null;
      }
    }
    async function displayhuaciContent(huacicontent) {
      const typewriterOutput = document.getElementById("morecontentre");
      if (!typewriterOutput) {
        console.error('Element with ID "moreContent" not found in the DOM.');
        return;
      }
      typewriterOutput.textContent = "";
      const delayPerChar = 5;
      for (const char of huacicontent) {
        typewriterOutput.textContent += char;
        await new Promise((resolve) => setTimeout(resolve, delayPerChar));
      }
    }
    async function starthuaciTypewriter(tpye) {
      try {
        const huacicontent = await fetchhuaciAPI(tpye);
        if (huacicontent) {
          await displayhuaciContent(huacicontent);
        } else {
          console.error("No valid content found in the JSON data.");
        }
      } catch (error) {
        console.error("An error occurred during the typewriter process:", error);
      }
    }
    const huacixqaisettingDiv = document.getElementById("huacixqaisetting");
    huacixqaisettingDiv.addEventListener("click", function() {
      window.open("https://www.xiaoqi-ai.com/setting.html", "_blank");
    });
  }


}

function executeOptionELogic() {
var randomNum=Math.floor(Math.random()*10000);var floatingBar=document.createElement('div');floatingBar.id='xiaoqifloatingBar'+randomNum;floatingBar.innerHTML='<img src="https://www.xiaoqi-ai.com/images/icon48.png" style="width: 26px;">AI助手';floatingBar.style.cssText=`position:fixed;z-index:999999999999999999;right:-114px;bottom:144px;width:141px;height:29px;background-color:#fff;color:rgb(183,109,254);text-align:center;line-height:29px;font-family:Microsoft YaHei;font-size:16px;font-weight:700;padding:6px 6px 6px 12px;box-shadow:rgba(0,0,0,0.1)0px 0px 10px;border-radius:40px;transition:right 0.3s ease,background-color 0.3s ease;cursor:pointer;text-align:left;display:inline-flex;align-items:center;gap:8px;    box-sizing: content-box;`;var closeButton=document.createElement('div');closeButton.innerHTML='×';closeButton.style.cssText=`display:none;position:absolute;top:-8px;left:-8px;width:20px;height:20px;background-color:#ccc;color:#fff;text-align:center;line-height:20px;border-radius:50%;cursor:pointer;`;floatingBar.appendChild(closeButton);document.body.appendChild(floatingBar);floatingBar.addEventListener('click',function(){
	
        if (globalOptions.xiaoqisidebar) {
            chrome.runtime.sendMessage({
                action: "openSidebar",
            }, (response) => {
                if (response && response.success) {
                    console.log('Sidebar open request sent successfully.');
                } else {
                    console.error('Failed to open sidebar:', chrome.runtime.lastError);
                }
            });
        } else {
            window.open('https://chat.xiaoqi-ai.com/?fr=floatBar', '_blank');
        }
   

});floatingBar.addEventListener('mouseenter',function(){floatingBar.style.right='-57px';floatingBar.style.backgroundColor='#f0f3fd';closeButton.style.display='block'});floatingBar.addEventListener('mouseleave',function(){floatingBar.style.right='-114px';floatingBar.style.backgroundColor='#fff';closeButton.style.display='none'});closeButton.addEventListener('click',function(event){event.stopPropagation();var dialog=document.createElement('div');dialog.id='xiaoqisetclosedialog';dialog.innerHTML='<h3 style="font-size: 18px;">悬浮小七AI按钮关闭确认</h3>';dialog.style.cssText=`position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background-color:#fff;padding:20px;box-shadow:0 0 10px rgba(0,0,0,0.1);border-radius:8px;z-index:10000000000000000000;text-align:center;`;var dialogCloseButton=document.createElement('div');dialogCloseButton.innerHTML='×';dialogCloseButton.style.cssText=`position:absolute;top:5px;right:5px;width:20px;height:20px;background-color:#ccc;color:#fff;text-align:center;line-height:20px;border-radius:50%;cursor:pointer;`;var tempCloseButton=document.createElement('button');tempCloseButton.innerHTML='临时关闭';tempCloseButton.style.cssText=`cursor:pointer;height:36px;display:flex;flex-direction:row;justify-content:center;align-items:center;font-size:14px;padding:0 12px;border-radius:12px;background-color:#6841ea;border:1px solid#ccc;color:#fff;float:left;margin-right:20px;margin-bottom:20px;margin-top:10px;`;var globalDisableButton=document.createElement('button');globalDisableButton.innerHTML='全局禁用';globalDisableButton.style.cssText=`cursor:pointer;height:36px;display:flex;flex-direction:row;justify-content:center;align-items:center;font-size:14px;padding:0 12px;border-radius:12px;background-color:#fff;border:1px solid#ccc;margin-bottom:20px;margin-top:10px;float: right;`;dialog.appendChild(dialogCloseButton);dialog.appendChild(tempCloseButton);dialog.appendChild(globalDisableButton);document.body.appendChild(dialog);dialogCloseButton.addEventListener('click',function(){document.body.removeChild(dialog)});tempCloseButton.addEventListener('click',function(){floatingBar.style.display='none';document.body.removeChild(dialog)});globalDisableButton.addEventListener('click',function(){window.open('https://www.xiaoqi-ai.com/setting.html','_blank')})});document.body.addEventListener('click',function(e){var dialogElement=document.getElementById('xiaoqisetclosedialog');if(dialogElement&&!dialogElement.contains(e.target)&&e.target!==closeButton){document.body.removeChild(dialogElement)}})

}

async function initializeMultiOptionLogic() {
    
    const domainIsAllowed = await isDomainAllowedAsync();

  
    if (globalOptions.optionB && domainIsAllowed) {
 
        executeOptionBLogic();
    } 
    
    if (globalOptions.optionE && domainIsAllowed) {
 
        executeOptionELogic();

    }
    
    if (!domainIsAllowed) {
        console.log("域名检查未通过，阻止所有受限功能的执行。");
    }
}

initializeMultiOptionLogic();