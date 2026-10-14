// This magic variable is replaced at build time. See gulpfile.js
const WEB_SERVER = 'https://account.leadiq.com'

const iframe = document.createElement('iframe')
iframe.id = 'frame'
iframe.src = `${WEB_SERVER}/extension/leadiq-app.html`
iframe.allow = 'clipboard-read; clipboard-write'

// Inexplicable Chrome bug on Mac OS only. If you create the iframe in the
// initial tick, or with a setTimeout of 0, then it will take ~10 seconds
// for the sidepanel to render. Not just the iframe is delayed, the entire panel.
requestAnimationFrame(() => {
  document.body.appendChild(iframe)
})

let currentWindowId

chrome.windows.getCurrent().then(window => {
  currentWindowId = window.id
})

chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    if (
      message.type === 'WORKER_TO_SIDEPANEL' &&
      message.lastFocusedWindowId === currentWindowId
    ) {
      iframe.contentWindow.postMessage(message.payload, '*')
    }

    // Prevent https://stackoverflow.com/q/54126343/1094632
    sendResponse(true)
  }
)

// The web-app iframe has no chrome.tabs access, so it asks us for the active
// tab. Resolve it against THIS panel's own window — querying with
// currentWindow follows the focused window, which may be a different one.
window.addEventListener('message', async (event) => {
  if (event.origin !== WEB_SERVER) return
  if (event.source !== iframe.contentWindow) return
  if (event.data?.type !== 'GET_TAB_CONTEXT') return

  let context = null
  if (currentWindowId != null) {
    try {
      const [activeTab] = await chrome.tabs.query({ active: true, windowId: currentWindowId })
      if (activeTab) context = { url: activeTab.url ?? '', title: activeTab.title ?? '' }
    } catch (e) {
      console.warn('GET_TAB_CONTEXT failed', e)
    }
  }

  iframe.contentWindow.postMessage(
    { type: 'TAB_CONTEXT_RESULT', requestId: event.data.requestId, context },
    WEB_SERVER
  )
})
