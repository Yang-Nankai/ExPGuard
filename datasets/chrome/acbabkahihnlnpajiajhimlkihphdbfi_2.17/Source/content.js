console.log('You are on content-script;');

let isAllowed = true;
let isRead = true;
let restrictedAttempt = 0;
let myData;
let stop = document.querySelector('#stop');
const body = document.querySelector('body');
let storeMsg;
let Clientid;
let allowtoText;
let allowedUrlsList = [];
let readApijson;
document.addEventListener('click', () => {
  if (myData) {
    let isPastAllowed = false;
    let allowUrl = myData.urls
    let currentUrl = (window.location.href);

    isPastAllowed = allowUrl.find(ele => currentUrl.match(ele))

    if (document.activeElement.type == myData['type'] && isPastAllowed) {
      document.activeElement.value = myData.password;
      myData = undefined;
    }

  }
})
ClearLocalkeys();
// Receiving the Msg from background.js start and stop - When clicked start exam button from bgnd.js to content.js receivng the msgs
chrome.runtime.onMessage.addListener(function (message, sender, reply) {
  console.log("start", message);
  chrome.storage.local.set({ myKey: message });
  storeMsg = message
  if (message.data == 'start') {
    readApijson = message.readData
    allowedUrlsList = message.allowedUrl
    Clientid = message.clientID
    startkeyblocker();
    blockRightAndSelection();
    ClearLocalkeys();
    isAllowed = true;
    // return sendResponse(message);    
    // return true;
  } else if (message.data == "stop") {
    isAllowed = false;
    chrome.storage.local.clear();
  } else if (message.data == 'refresh') {
    document.querySelector('body').style.opacity = '1';
  } else if (message.data == "passwaord") {
    myData = message;
  }
  if (message.data === "analysis background") {
    let obj = parse();
    sendResponse(obj);
    return true;
  }
  if(message.key === "set-alert-extensions"){
    return message.data 
 }
  // return true;
})


const blockContent = () => {
  if (isAllowed) {
    document.querySelector('body').style.opacity = '0'
  }
  // if(document.querySelector('app-testconsole-component')){

  // }
}

const unBlockContent = () => {
  // if(document.querySelector('app-testconsole-component')){
  document.querySelector('body').style.opacity = '1'
  // }
}


const startkeyblocker = () => {

  body.onkeydown = function (e) {
    console.log("keydown", e)
    //*not allowing to type commas and square brackets is the reason commanded the code *//
    // console.log('NEW KEY EVENT',e);
    // if (isAllowed) {
    //   document.querySelector('body').style.opacity = '0'
    //   if (e.keyCode == '44' || e.keyCode == '91') {
    //     blockContent();
    //     disabledEvent(e);
    //   }

    //   setTimeout(() => {
    //     // document.querySelector('body').style.opacity = '1'
    //   }, 1000)
    // }
    if (e.key == "Meta" || e.key == "Control" || e.key == "Alt" || e.key == "Escape") {
      blockContent();
      let value = {
        "Remark": `Pressed ${e.key} key`,
        url: window.location.href
      }
      disabledEvent(e);
      sendToServer(JSON.stringify(value))
    } else if (e.metaKey && e.shiftKey) {
      // document.querySelector('body').style.opacity = '0'
      blockContent();
      let value = {
        "Remark": `Pressed ${e.metaKey} key and ${e.shiftKey} key`,
        url: window.location.href
      }
      sendToServer(JSON.stringify(value))
    } else if (e.metaKey && e.key == "PrintScreen" || e.key == "PrintScreen") {
      // document.querySelector('body').style.opacity = '0'
      blockContent();
      let value = {
        "Remark": e.metaKey ? `Pressed ${e.metaKey} key and ${e.key} key` : `Pressed ${e.key} key`.anchor,
        url: window.location.href
      }
      disabledEvent(e);
      sendToServer(JSON.stringify(value))
    }
    else {
      unBlockContent();
      // document.querySelector('body').style.opacity = '1'
    }

  }
  //*not allowing to type commas and square brackets is the reason commanded the code *// 

  // body.onkeyup = function (e) {
  //   if (isAllowed) {
  //     if (e.keyCode == '44' || e.keyCode == '91') {
  //       blockContent();
  //       disabledEvent(e);
  //       // document.querySelector('body').style.opacity = '0'  
  //       // body.onkeydown(e);
  //     }
  //   }
  // }

  body.onkeypress = function (e) {
    console.log('NEW onkeypress EVENT', e);
    //*not allowing to type commas and square brackets is the reason commanded the code *//
    // if (e.keyCode == '44' || e.keyCode == '91') {
    //   // document.querySelector('body').style.opacity = '0'
    //   blockContent();
    //   disabledEvent(e);
    // }

    if (e.metaKey && e.shiftKey) {
      // document.querySelector('body').style.opacity = '0'
      blockContent();
      disabledEvent(e);
    }
    setTimeout(() => {
      // document.querySelector('body').style.opacity = '1'
      unBlockContent();
    }, 1000)
  };
  document.addEventListener('keydown', event => {
    console.log("keyevents-triggering");
    
    console.log("pressed ctrl keys", event);
    if (isAllowed) {
      if (event.ctrlKey && 'cvxspwuaz'.indexOf(event.key) !== -1) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl Key and ${event.key} key`,
          url: window.location.href
        }
        // console.log(value);
        sendToServer(JSON.stringify(value))
      }
      else if (event.altKey && 'tab'.indexOf(event.key) !== -1) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed alt Key and ${event.key} key`,
          url: window.location.href
        }
        // console.log(value);
        sendToServer(JSON.stringify(value))
      } else if (event.ctrlKey && event.shiftKey && 'cvxspwuaz'.indexOf(event.key) !== -1) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl key, alt Key and ${event.key} key`,
          url: window.location.href
        }
        // console.log(value);
        sendToServer(JSON.stringify(value))
      } else if (['Shift', 'Control', 'Alt', 'Meta', 'meta', 'control', 'alt', 'shift', 'Escape'].includes(event.key)) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ${event.key} key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.ctrlKey && event.key == "Shift") {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl key and ${event.key} key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.ctrlKey && event.metaKey) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl key and window key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.ctrlKey && event.altKey) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl key and alt key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.key == "Shift" && event.metaKey) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed shift key and window key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.key == "Shift" && event.altKey) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed shift key and alt key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.metaKey && event.altKey) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed window key and alt key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.ctrlKey && event.metaKey && event.altKey) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl key, window key and alt key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.ctrlKey && event.metaKey && event.key == "Shift") {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl key, window key and Shift key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.ctrlKey && event.altKey && event.key == "Shift") {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl key, window key and Shift key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.metaKey && event.altKey && event.key == "Shift") {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed window key, alt key and Shift key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.ctrlKey && event.key == "Shift" && event.metaKey && event.altKey) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl key, window key, alt key and Shift key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(event.key)) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ${event.key} key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (event.ctrlKey && event.shiftKey && ('34').indexOf(event.key) !== -1) {
        disabledEvent(event);
        let value = {
          "Remark": `Pressed ctrl key, shift key and ${event.key} key`,
          url: window.location.href
        }
        sendToServer(JSON.stringify(value))
        // console.log(value);
      } else if (['Mac', 'mac'].includes(navigator.platform) && event.shiftKey && event.metaKey) {
        document.querySelector('body').style.opacity = '0'
        disabledEvent(event);
        let value = {
          "Remark": `Pressed shift key and window key`,
          url: window.location.href
        }
        setTimeout(() => {
          document.querySelector('body').style.opacity = '1'
        }, 1000)
        sendToServer(JSON.stringify(value))
      }
      else {}
    }
  }, false);
  document.addEventListener('copy', function (e) {
    try {
      var selectedText = JSON.parse(window.getSelection().toString().trim());
      if (selectedText.data == 'passwaord') {
        chrome.runtime.sendMessage(selectedText);
        e.clipboardData.setData('text/plain', "");
        event.preventDefault();
      }

    } catch (error) {
    }

  })
}
async function ClearLocalkeys() {
  const myValue = await chrome.storage.local.get('myKey')
  if (myValue.myKey != undefined) {
    startkeyblocker();
    blockRightAndSelection();
    // console.log(myValue);
  }
}

// startkeyblocker();

async function postData(url = '', data = {}) {
  console.log("response", response)
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data)
  });
  console.log("res", response);

  return response.text();
}

function sendToServer(msg) {
  try {
    let message = {
      data: "AI",
      msg: `${msg}`
    }
    chrome.runtime.sendMessage(message);

  } catch (error) {
    console.log(error);
  }

}


function disabledEvent(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else if (window.event) {
    window.event.cancelBubble = true;
  }
  e.preventDefault();
  return false;
}

function blockRightAndSelection() {
  if (isAllowed) {
    document.onselectstart = (e) => {
      console.log("onselectstart", e);
      allowTypevalue();
      //checking ata client allowing to type
      if (e.target.isContentEditable && urllists.includes(e.target.baseURI)) {
        console.log("onselectstart-allowtoText", allowtoText)
        return true;
      } else {
        console.log("onselectstart-notAllow");
        return false
      }
    };

    window.onload = function () {
      document.addEventListener("contextmenu", function (e) {
        disabledEvent(e)
        e.preventDefault();
      }, false);
    }
    window.matchMedia("print").addListener(function () {
      blockContent()
    })
  }
}

// for ata right click allowing not blocking - for every clients allowing right click(the cdk editor using only by ata)
async function allowTypevalue() {
  try {
    if (readApijson == true) {
      urllists = allowedUrlsList
    } else {
      allowedUrlsList.find(val => {
        if (Clientid == val.clientId) {
          urllists = val.allowedurls
        }
      });
    }

  } catch (e) {
    console.log("typeError", error);
  }
}










