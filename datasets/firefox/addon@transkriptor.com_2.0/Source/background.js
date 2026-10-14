const URL = "https://app.transkriptor.com/recorder/";
const extensionId = chrome.runtime.id
console.log("Workin ext")

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  if(request.action == "loginUser") {
    let widgetData = JSON.parse(request.widgetData)
    let uid = widgetData.userId.replace("User#", "")
    let email = widgetData.email
    let language = request.language
    chrome.storage.local.set({ userData: { uid, language, email } }, function() {
      console.log(uid, email, language)
      console.log("Custom value has been stored.")
      sendResponse({ success: true, message: "Successfully saved user login" })
    })
    return true
  }
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action == "requestUid") {
    chrome.storage.local.get("userData", function(result) {
      if(result.userData) {
        sendResponse({ ...result.userData, success: true })
      }
      else {
        sendResponse({ error: true })
      }
    })
    return true
  }
})

chrome.runtime.onInstalled.addListener(function(details) {
  console.log("Installed")
  console.log(details)
  if (details.reason === 'install' || details.reason === "update") {
    const initialUrl = "https://app.transkriptor.com/signIn"
    chrome.tabs.create({ url: initialUrl }, function(tab) {
      let tabIdPresent = tab.id
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tabIdPresent && changeInfo.status == 'complete') {
          chrome.scripting.executeScript({
            target: { tabId: tabIdPresent },
            func: function() {
              if(typeof chrome !== undefined || typeof chrome !== null) {
                chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                  if(message.transkriptorExtensionLoaded) {
                    localStorage.setItem("extId", message.extensionId)
                    if(localStorage.getItem("gleap-widget-session-cj7rzrc0mklHXp7Ux1hISbI6hcVIIPJp")) {
                      let widgetData = localStorage.getItem("gleap-widget-session-cj7rzrc0mklHXp7Ux1hISbI6hcVIIPJp")
                      let language = localStorage.getItem("transcript-language")
                      sendResponse({ widgetData, language, success: true })
                    }
                    else {
                      sendResponse({ userNotLoggedIn: true })
                    }
                  }
                })
              }
            }
          }).then(() => {
            console.log("Message sent")
            chrome.tabs.sendMessage(tabIdPresent, { transkriptorExtensionLoaded: 1, extensionId }, function(response) {
              if(response.success) {
                console.log(response)
                console.log("Received message")
                let widgetData = JSON.parse(response.widgetData)
                console.log(widgetData)
                if(widgetData.userId) {
                  let uid = widgetData.userId.replace("User#", "")
                  let email = widgetData.email
                  let language = response.language
                  chrome.storage.local.set({ userData: { uid, language, email } }, function() {
                    console.log(uid, email, language)
                    console.log("Custom value has been stored.")
                  })
                }
              }
            })
          })
        }
      })
    })
  }
})
