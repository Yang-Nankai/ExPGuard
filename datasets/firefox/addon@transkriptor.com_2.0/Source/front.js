const URL = "https://app.transkriptor.com/recorder/";

document.getElementById("recordButton").addEventListener("click", recordFunction);

document.getElementById("uploadButton").addEventListener("click", uploadFunction);

document.getElementById("assistantButton").addEventListener("click", assistantFunction);

document.getElementById("dashboardButton").addEventListener("click", dashboardFunction);

document.getElementById("minutes_add_button").addEventListener("click", paymentFunction);

document.getElementById("upgradeButton").addEventListener("click", paymentFunction);

document.getElementById("transcriptionsButton").addEventListener("click", transcriptionsFunction);

document.getElementById("foldersButton").addEventListener("click", foldersFunction);

document.getElementById("settingsButton").addEventListener("click", settingsFunction);

document.getElementById("teamsButton").addEventListener("click", teamsFunction);

var detected_lang = (navigator.language || navigator.userLanguage).substring(0,2);

function home_redirect(){
    window.open("https://app.transkriptor.com", '_blank');
}


function reset_password(){
    window.open("https://app.transkriptor.com/resetPassword", 'targetWindow',
    `scrollbars=yes,
     resizable=yes,
     width=900,
     height=800`);
}

function onClickAndOpenNewWindow(){
       chrome.action.onClicked.addListener(() => {
        chrome.windows.create({
            url: URL,
            type: "popup",
            width: 900,
            height: 800
        })
    })
}

function recordFunction(){
    window.open('https://app.transkriptor.com/recorder','targetWindow',
    `scrollbars=yes,
     resizable=yes,
     width=900,
     height=800`);
}

function uploadFunction(){
    window.open('https://app.transkriptor.com/uploader','targetWindow',
    `scrollbars=yes,
     resizable=yes,
     width=900,
     height=800`);
}

function assistantFunction() {
  window.open('https://app.transkriptor.com/meeting-assistant','targetWindow',
  `scrollbars=yes,
   resizable=yes,
   width=900,
   height=800`);
}

function dashboardFunction() {
  window.open('https://app.transkriptor.com/dashboard','targetWindow',
  `scrollbars=yes,
   resizable=yes,
   width=900,
   height=800`);
}

function transcriptionsFunction(){
    window.open('https://app.transkriptor.com/transcriptions','targetWindow',
    `scrollbars=yes,
     resizable=yes,
     width=900,
     height=800`);
}

function foldersFunction(){
    window.open('https://app.transkriptor.com/folders','targetWindow',
    `scrollbars=yes,
     resizable=yes,
     width=900,
     height=800`);
}

function teamsFunction() {
  window.open('https://app.transkriptor.com/workspaces','targetWindow',
  `scrollbars=yes,
   resizable=yes,
   width=900,
   height=800`);
}

function settingsFunction() {
  window.open('https://app.transkriptor.com/account','targetWindow',
  `scrollbars=yes,
   resizable=yes,
   width=900,
   height=800`);
}

function paymentFunction(){
    window.open('https://app.transkriptor.com/payment','targetWindow',
    `scrollbars=yes,
     resizable=yes,
     width=900,
     height=800`);
}


onClickAndOpenNewWindow();

window.onload = () => {
  async function makeGetRequest(url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('There was an error!', error)
    }
  }
  chrome.runtime.sendMessage({ action: "requestUid" }, function(response) {
    if(response.success) {
      let uid = response.uid
      let url = `https://1hcr8zhgo3.execute-api.eu-central-1.amazonaws.com/default/AA-API-GetCustomerDetails?cid=${uid}`
      makeGetRequest(url).then(data => {
        console.log(document.getElementById("minutes"))
        document.getElementById("minutes").innerText = `${data.Minutes} `
      }).catch(error => console.error(error))
    }
  })
}
