/**
 * Handles Scribe Runtime API messages from content scripts.
 */

function handleMessages (message, sender) {
  switch (message.type) {
    case 'SCRIBE_SHOW_POPUP':
      chrome.tabs.sendMessage(sender.tab.id, { type: 'SCRIBE_SHOW_POPUP' })
      break
    case 'SCRIBE_SHOW_WIDGET':
      chrome.tabs.sendMessage(sender.tab.id, { type: 'SCRIBE_SHOW_WIDGET' })
      break
    default:
      break
  }
}

chrome.runtime.onMessage.addListener(handleMessages)
