let networkLog = []
const intervalIds = []

// Caches the parser output of already visited pages.
const parsedPagesMap = new Map()
const MAX_PARSER_CACHE_SIZE = 500

function trackNetworkRequests () {
  // Why do we create a script tag rather than just executing the code here?
  // It's because we need this to run in the context of the target website,
  // rather than in the context of our own extension.
  // We go through the DOM to achieve this.

  // Bypass if already loaded
  const id = 'li-network-v2'
  if (document.getElementById(id)) return

  const s = document.createElement('script')
  s.id = id

  // Search for all meta tags with CSP info.
  try {
    const metaCspTags = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]')
    let nonce = null
    metaCspTags.forEach(meta => {
      if (!nonce && meta.content && meta.content.includes('nonce-')) {
        const nonceRegex = /nonce-([\w-]+)/
        const nonceMatch = meta.content.match(nonceRegex)
        if (nonceMatch && nonceMatch[1]) {
          nonce = nonceMatch[1]
        }
      }
    })

    if (nonce) {
      s.nonce = nonce
    }
  } catch (error) {
    console.error(error)
  }

  s.src = chrome.runtime.getURL('prospector/content-scripts/in-page-context/network.js')
  ;(document.head || document.documentElement).appendChild(s)
}

// Re-parse when the count of profile (/in/) links changes. This catches the
// reactions modal opening and lazy-loading more reactors on scroll. Counting
// /in/ links (a stable primitive) keeps modal redesigns fixable in the
// web-deployed parser alone, without another Chrome Web Store release.
function sendDataOnProfileLinkCountChange () {
  let previousCount = 0

  intervalIds.push(
    setInterval(
      () => {
        const count = document.querySelectorAll('a[href*="/in/"]').length
        if (count === previousCount) return
        previousCount = count
        maybeSendStateImmediately()
      },
      3000
    )
  )
}

function sendDataOnVisibilityChange () {
  document.addEventListener('visibilitychange', maybeSendStateForceLookup)
}

function sendDataOnWindowFocus () {
  window.addEventListener('focus', maybeSendStateNoArgs)
}

function sendDataOnUrlChange () {
  window.PREV_URL = window.location.href
  intervalIds.push(
    setInterval(
      () => {
        if (window.PREV_URL === window.location.href) return
        window.PREV_URL = window.location.href
        maybeSendState()
      },
      3000
    )
  )
}

function sendDataOnNetworkRequest () {
  window.addEventListener('LIQ_NETWORK_CALL', handleNetworkCall)
}
function handleNetworkCall (event) {
  if (!event.detail) return
  networkLog = event.detail

  maybeSendState()
}

function handleMessagesFromBackground () {
  chrome.runtime.onMessage.addListener(request => {
    switch (request.type) {
      case 'CACHE_PARSER_OUTPUT':
        // only cache the current tab's messages
        if (window.location.href !== request?.payload?.url) break

        if (parsedPagesMap.size >= MAX_PARSER_CACHE_SIZE) {
          const oldestKey = parsedPagesMap.keys().next().value
          if (oldestKey) parsedPagesMap.delete(oldestKey)
        }
        parsedPagesMap.set(request.payload.url, request.payload)
        break
      case 'REQUEST_STATE':
        // The newly opened interface requested the state
        maybeSendStateForceLookup()
        break
      case 'DIAGNOSTICS_PING_LINKEDIN':
        chrome.runtime.sendMessage({ type: 'DIAGNOSTICS_PONG_LINKEDIN' })
        break
    }
  })
}

// We need this wrapper for the removeEventListener later
function maybeSendStateNoArgs () {
  maybeSendState()
}

// Force true on visibility change because we need to bust the cache
// See: https://leadiq.atlassian.net/browse/PROS-1947?focusedCommentId=63539
function maybeSendStateForceLookup () {
  maybeSendStateImmediately({ forceLookup: true })
}

// Because this is debounced, it DOES NOT SUPPORT ARGUMENTS
function maybeSendState () {
  if (document.hidden) return
  sendActiveState()
}

// Since this function is not debounced, you can pass arguments to it
function maybeSendStateImmediately (opts) {
  if (document.hidden) return
  sendActiveStateResetDebounce(opts)
}

function collectIframeDOMs () {
  const iframes = document.querySelectorAll('iframe')
  const iframeDOMs = []

  for (const iframe of iframes) {
    try {
      const iframeDoc = iframe.contentDocument
      if (iframeDoc) {
        iframeDOMs.push(iframeDoc.documentElement.outerHTML)
      }
    } catch (error) {
      // Skip cross-origin or inaccessible iframes
    }
  }

  return iframeDOMs
}

function generateMsg (opts) {
  const startTime = Date.now()
  const msg = {
    type: 'STATE_CHANGE',
    state: {
      host: 'linkedin',
      url: window.location.href,
      html: document.documentElement.outerHTML,
      iframes: collectIframeDOMs(),
      forceLookup: opts ? opts.forceLookup : false,
      networkLog,
      parserCache: parsedPagesMap.get(window.location.href) ?? undefined,
      timingData: {
        timeGenerateParserInputStart: startTime
      }
    }
  }
  msg.state.timingData.timeGenerateParserInputEnd = Date.now()

  return msg
}

// Use a low debounce when sending data that could be rendered
const [
  sendActiveState,
  sendActiveStateResetDebounce
] = debounce(2000, 3000, async (opts = {}) => {
  const msg = generateMsg(opts)
  msg.state.timingData.timeSendToParserStart = Date.now()
  if (cleanUpIfOrphaned()) return
  await chrome.runtime.sendMessage(msg)
})

/**
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

  return [
    // Debounced function
    (...args) => {
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
    },
    // Debounce short circuit function
    (...args) => {
      executeFn(...args)
    }
  ]
}

function cleanUpIfOrphaned () {
  if (chrome.runtime.id === undefined) {
    intervalIds.forEach(clearInterval)
    document.removeEventListener('visibilitychange', maybeSendStateForceLookup)
    window.removeEventListener('focus', maybeSendStateNoArgs)
    window.removeEventListener('LIQ_NETWORK_CALL', handleNetworkCall)
    return true
  }
}

trackNetworkRequests()
handleMessagesFromBackground()

sendDataOnVisibilityChange()
sendDataOnWindowFocus()
sendDataOnUrlChange()
sendDataOnProfileLinkCountChange()
sendDataOnNetworkRequest()

window.dispatchEvent(new Event('Q_HISTORY'))
