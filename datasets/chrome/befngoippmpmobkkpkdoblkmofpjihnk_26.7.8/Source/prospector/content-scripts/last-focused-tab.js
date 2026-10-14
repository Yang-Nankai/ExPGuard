if (document.hasFocus()) sendLastFocusedTab()
window.addEventListener('focus', sendLastFocusedTab)

function sendLastFocusedTab () {
  if (cleanUpIfOrphaned()) return
  chrome.runtime.sendMessage({ type: 'LAST_FOCUSED_TAB' })
}

function cleanUpIfOrphaned () {
  if (chrome.runtime.id === undefined) {
    window.removeEventListener('focus', sendLastFocusedTab)
    return true
  }
}
