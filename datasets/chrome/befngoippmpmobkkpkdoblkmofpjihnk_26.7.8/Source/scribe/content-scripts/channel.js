let queue = []
let scribeAppReady = false // means Scribe app is fully loaded and has setup message listeners

const MESSAGE_TYPES = ['SCRIBE_LEAD', 'SCRIBE_READY', 'LOGGING']

function forwardMessage (message) {
  console.info('forwarding message', message)
  window.postMessage(message, window.location.origin)
}

// Save content-script to web app messages in a queue when Scribe app is not ready yet,
// and forward them if we got the ready notification.
chrome.runtime.onMessage.addListener(message => {
  if (!MESSAGE_TYPES.includes(message.type)) {
    return
  }

  if (message.type === 'SCRIBE_READY') {
    scribeAppReady = true
    queue.forEach(forwardMessage)
    queue = []
    return
  }

  if (!scribeAppReady) {
    queue.push(message)
    return
  }

  forwardMessage(message)
})
