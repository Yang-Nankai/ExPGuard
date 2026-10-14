(function () {
  let networkLog = []
  let urlChangeInterval = null

  function trackNetworkRequests () {
    // Why do we create a script tag rather than just executing the code here?
    // It's because we need this to run in the context of the target website,
    // rather than in the context of our own extension.
    // We go through the DOM to achieve this.

    // Bypass if already loaded
    const id = 'sf-network'
    const existingScript = document.getElementById(id)
    if (existingScript) {
      // If the network log already contains data, it implies the script was previously
      // loaded and is actively tracking requests, so re-injection is unnecessary.
      if (networkLog.length) return console.info('Network already loaded')

      // If the script exists but the network log is empty, it suggests a stale state.
      // Remove the existing script to allow re-injection and ensure fresh network logs.
      // This could occur on extension reloads and this support script is re-injected
      existingScript.remove()
    }

    const s = document.createElement('script')
    s.id = id
    s.src = chrome.runtime.getURL('prospector/content-scripts/in-page-context/network.js')
    ;(document.head || document.documentElement).appendChild(s)
  }

  function sendDataOnNetworkRequest () {
    window.addEventListener('LIQ_NETWORK_CALL', handleNetworkCall)
  }

  function handleNetworkCall (event) {
    if (!event.detail) return
    networkLog = event.detail
    maybeSendState()
  }

  function sendDataOnVisibilityChange () {
    document.addEventListener('visibilitychange', maybeSendStateNoArgs)
  }

  function sendDataOnWindowFocus () {
    window.addEventListener('focus', maybeSendStateNoArgs)
  }

  function sendDataOnWindowLoaded () {
    window.addEventListener('load', maybeSendStateNoArgs)
  }

  function sendDataOnUrlChange () {
    window.PREV_URL = window.location.href
    urlChangeInterval = setInterval(() => {
      if (window.PREV_URL === window.location.href) return
      window.PREV_URL = window.location.href
      maybeSendState()
    }, 3000)
  }

  function handleMessagesFromBackground () {
    chrome.runtime.onMessage.addListener(request => {
      if (request.type === 'REQUEST_STATE') {
        maybeSendStateForceLookup()
      }
    })
  }

  function maybeSendStateForceLookup () {
    maybeSendState({ forceLookup: true })
  }

  function maybeSendState (opts = {}) {
    if (document.hidden) return
    sendState(opts)
  }

  function maybeSendStateNoArgs () {
    maybeSendState()
  }

  function generateMsg (opts = {}) {
    const startTime = Date.now()
    const msg = {
      type: 'STATE_CHANGE',
      state: {
        host: 'salesforce',
        networkLog,
        url: window.location.href,
        html: document.documentElement.outerHTML,
        forceLookup: opts.forceLookup ?? false,
        timingData: {
          timeGenerateParserInputStart: startTime
        }
      }
    }
    msg.state.timingData.timeGenerateParserInputEnd = Date.now()

    return msg
  }

  // Use a low debounce when sending data that could be rendered
  const sendState = debounce(1000, 2000, async (opts = {}) => {
    const msg = generateMsg(opts)
    msg.state.timingData.timeSendToParserStart = Date.now()
    if (cleanUpIfOrphaned()) return
    await chrome.runtime.sendMessage(msg)
  })

  /**
   * @param {boolean} leadingCall - if true, the function will be called immediately
   * @param {number} minDelay - the minimum delay between calls
   * @param {number} maxDelay - the maximum delay between calls
   * @param fn - the function to debounce
   */
  function debounce (minDelay, maxDelay, fn) {
    let timeoutId = null
    let lastExecutionTime = 0

    const executeFn = (...args) => {
      lastExecutionTime = Date.now()
      timeoutId = null
      fn(...args)
    }

    return (...args) => {
      if (!timeoutId) {
        // First run or after a long time.
        // Since we don't want leading calls, set the last execution time to now
        lastExecutionTime = Date.now()
      } else {
        // If a debounce is ongoing, extend it
        clearTimeout(timeoutId)
      }
      const now = Date.now()
      // If the debounce has been ongoing for too long, execute the function
      if (now - lastExecutionTime > maxDelay) executeFn(...args)
      else timeoutId = setTimeout(() => executeFn(...args), minDelay)
    }
  }

  function cleanUpIfOrphaned () {
    if (chrome.runtime.id === undefined) {
      console.info('Orphaned content script, cleaning up Salesforce support')
      clearInterval(urlChangeInterval)
      document.removeEventListener('visibilitychange', maybeSendStateNoArgs)
      window.removeEventListener('focus', maybeSendStateNoArgs)
      window.removeEventListener('load', maybeSendStateNoArgs)
      window.removeEventListener('LIQ_NETWORK_CALL', handleNetworkCall)
      return true
    }
  }

  trackNetworkRequests()
  sendDataOnNetworkRequest()
  sendDataOnVisibilityChange()
  sendDataOnWindowFocus()
  sendDataOnUrlChange()
  handleMessagesFromBackground()
  sendDataOnWindowLoaded()
})()
