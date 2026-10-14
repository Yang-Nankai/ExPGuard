const originsJSON = new URLSearchParams(window.location.search).get('originsJSON')
const origins = JSON.parse(originsJSON)

document.querySelector('#update-permissions').addEventListener('click', () => {
  chrome.permissions.request({ origins }, granted => {
    if (granted) {
      // Send it to the parent web page so that it can update its UI
      parent.postMessage({ type: 'DYNAMIC_PERMISSIONS_CHANGED' }, '*')
      // Send it to the background worker so that it can re-inject the content scripts
      chrome.runtime.sendMessage({ type: 'DYNAMIC_PERMISSIONS_CHANGED' })
    }
  })
})
