function asyncHandler (fn) { return (...args) => { fn(...args); return true } }

// From privileged contexts
chrome.runtime.onMessage.addListener(asyncHandler(
  async (request, sender, sendResponse) => {
    console.info('Received internal message:', request, 'type:', request.type)

    // Handle malformed messages
    if (!request || (!request.type && !request.relay)) {
      console.warn('Received message without type or relay', request)
      sendResponse(false)
      return
    }

    // This is to relay messages between different contexts within the same tab
    // For example a host talking to the Scribe iframe and vice versa
    if (request.relay) {
      chrome.tabs.sendMessage(sender.tab.id, request.payload)
      sendResponse(true)
      return
    }

    // Standard messages
    switch (request.type) {
      case 'SCROLL_DETECTED':
        self.sendMessageToUI(request)
        break
      case 'STATE_CHANGE': {
        if (await self.isSenderTheLatestFocusedTab(sender)) {
          self.sendMessageToUI({ type: 'PARSER_INPUT', state: request.state })
        } else {
          console.info('Dropping message because it is from a sender that was not focused last')
        }
        break
      }
      case 'OPEN_SIDEPANEL':
        await self.openSidePanel()
        break
      case 'DIAGNOSTICS_PONG_LINKEDIN':
        self.sendMessageToUI(request)
        break
      case 'LAST_FOCUSED_TAB':
        // Used later to determine if the message should be
        // dropped when sending data to the UI
        chrome.storage.session.set({ lastFocusedTabId: sender.tab.id })
        break
      case 'DYNAMIC_PERMISSIONS_CHANGED':
        self.injectContentScriptsManually()
        break
      case 'WIDGET_OPEN_UI':
        self.openUI(sender.tab)
        break
    }

    // Prevent promises from hanging on the other end
    // For now we don't need to send anything back. If that changes, have a look
    // at on-message-external.js for an example of how to do it
    sendResponse(true)
  }
))
