console.log('Custom JavaScript has been injected into the tab. from transkriptor')
if(typeof chrome !== undefined || typeof chrome !== null) {
  console.log("Running chrome:", extensionId)
  // chrome.runtime.sendMessage(extensionId, { action: "customAction", data: "some data" });
}
