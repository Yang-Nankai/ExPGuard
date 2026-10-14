function initMessagingHelper () {
  let prevScreenLeft = null

  storePopupLeftPositionIfChanged()

  const intervalId = setInterval(
    storePopupLeftPositionIfChanged,
    5000
  )

  chrome.runtime.onMessage.addListener(
    function (request, _sender, sendResponse) {
      window.postMessage(request, window.location.origin)

      // Prevent https://stackoverflow.com/q/54126343/1094632
      sendResponse(true)
    }
  )

  function storePopupLeftPositionIfChanged () {
    if (cleanUpIfOrphaned()) return

    if (window.screenLeft !== prevScreenLeft) {
      prevScreenLeft = window.screenLeft
      const msg = {
        type: 'POPUP_LEFT_POSITION_CHANGED',
        left: window.screenLeft
      }
      chrome.runtime.sendMessage(msg)
    }
  }

  function cleanUpIfOrphaned () {
    if (chrome.runtime.id === undefined) {
      console.info('Script orphaned, cleaning up')
      clearInterval(intervalId)
      return true
    }
  }
}

initMessagingHelper()
