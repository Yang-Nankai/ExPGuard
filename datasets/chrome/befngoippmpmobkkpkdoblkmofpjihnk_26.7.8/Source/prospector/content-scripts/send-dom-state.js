/* eslint-disable @typescript-eslint/no-unused-vars */

function sendDomState (host) {
  let urlChangeInterval = null
  let observer = null // MutationObserver to watch for DOM changes

  const HUBSPOT_LIST_URL = /^https?:\/\/([a-z0-9]+\.)*hubspot\.com\/contacts\/(?<id>[^/]+)\/objects\/(0+-[0-2])\/views\/[^/\s]+\/list/
  const GONG_URL = /^https?:\/\/([a-z0-9-]+\.)*app\.gong\.io\/engage\/.+/

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
      const hostConfig = {
        hubspot: { urlRegex: HUBSPOT_LIST_URL, observe: observeHubspotListPage },
        gong: { urlRegex: GONG_URL, observe: observeGongPage }
      }[host]

      if (hostConfig) {
        const onPage = hostConfig.urlRegex.test(window.location.href)
        if (!onPage && observer) stopObserving()
        else if (onPage && !observer) hostConfig.observe()
      }

      if (window.PREV_URL === window.location.href) return
      window.PREV_URL = window.location.href
      maybeSendState()
    }, 3000)
  }

  function hasClass (element, className) {
    return element?.className && typeof element.className === 'string' && element.className.includes(className)
  }

  function hasAttribute (element, attr, value) {
    return element && element.getAttribute && element.getAttribute(attr) === value
  }

  function observeHubspotListPage () {
    const baseConfig = { childList: true, subtree: true }
    observer = new MutationObserver((mutations) => {
      const hasCompanyHeaderOrSlider = mutations.some(record => {
        const nodes = [record.target, ...(record.addedNodes || [])]
        return nodes.some(node => {
          return (
            hasClass(node, 'PreviewHighlightContainer') ||
            hasAttribute(node, 'data-component-name', 'UIPanel')
          )
        })
      })

      if (hasCompanyHeaderOrSlider) {
        maybeSendStateNoArgs()
      }
    })

    // Observe the entire document body for all relevant changes
    observer.observe(document.body, baseConfig)
  }

  function observeGongPage () { // Detect table changes on filter/page change since URL does not update
    const gridSelectors = [
      '[class^="ProspectListTable-module"][role="grid"]',
      'main[aria-label="contacts-list"][class^="SequenceContacts-module"]'
    ]

    observer = new MutationObserver((mutations) => {
      const grid = document.querySelector(gridSelectors.join(','))
      if (!grid) return

      const hasChanges = mutations.some(mutation =>
        [mutation.target, ...mutation.addedNodes, ...mutation.removedNodes].some(node =>
          node.nodeType === 1 && grid.contains(node)
        )
      )
      if (hasChanges) maybeSendStateNoArgs()
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  function stopObserving () {
    if (observer && observer instanceof MutationObserver) {
      observer.disconnect()
      observer = null
    }
  }

  function handleMessagesFromBackground () {
    chrome.runtime.onMessage.addListener(request => {
      if (request.type === 'REQUEST_STATE') {
        // Force lookup on app init to bust the cache & trigger a lookup
        maybeSendStateForceLookup()
      }
    })
  }

  function maybeSendStateForceLookup () {
    maybeSendState({ forceLookup: true })
  }

  function maybeSendStateNoArgs () {
    maybeSendState()
  }

  function maybeSendState (opts) {
    if (document.hidden) return
    sendState(opts)
  }

  function generateMsg (opts) {
    const startTime = Date.now()
    const msg = {
      type: 'STATE_CHANGE',
      state: {
        host,
        url: window.location.href,
        html: document.documentElement.outerHTML,
        forceLookup: opts ? opts.forceLookup : false,
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
      clearInterval(urlChangeInterval)
      document.removeEventListener('visibilitychange', maybeSendStateNoArgs)
      window.removeEventListener('focus', maybeSendStateNoArgs)
      window.removeEventListener('load', maybeSendStateNoArgs)
      stopObserving()
      return true
    }
  }

  sendDataOnVisibilityChange()
  sendDataOnWindowFocus()
  sendDataOnUrlChange()
  handleMessagesFromBackground()
  sendDataOnWindowLoaded()
}
