'use strict'

//
// The background script provides monitoring of tabs for an active Metastream
// webapp. When activated, web requests originating from the app are modified
// to allow bypassing browser security limitations. This script also provides
// message brokering between embedded websites and the app itself.
//

//=============================================================================
// Session state
//=============================================================================

let __sessionState

const initialSessionState = {
  // Observed tabs on Metastream URL
  watchedTabs: [],
  // Store for active tabs state
  tabStore: {},
  // Used to know which metastream instance to sent browser badge requests to
  lastActiveTabId: null,
  // Map from popup webview ID to parent tab ID
  // Used for popups pending initialization
  popupParents: {},
  // Map from popup tab ID to parent tab ID
  // Used for routing messages between popup and parent app
  popupParentTabs: {},
  // List of popup tab IDs
  popupTabs: [],
}

let persistTimeoutId
const persistSessionState = () => {
  const persist = () => chrome.storage.session.set(__sessionState)

  if (!persistTimeoutId) {
    persistTimeoutId = setTimeout(() => {
      persistTimeoutId = undefined
      persist()
    }, 10)
  }
}

const getSessionState = async () => {
  // Hydrate state
  if (!__sessionState) {
    const state = await chrome.storage.session.get()
    __sessionState = !!state?.watchedTabs ? state : initialSessionState
  }

  // Persist state whenever accessed
  persistSessionState()

  return __sessionState
}

//=============================================================================
// Helpers
//=============================================================================

const TOP_FRAME = 0
const FIRST_CONTENT_SCRIPT_ID = 'metastream-first-script'
const METASTREAM_APP_URL = 'https://app.getmetastream.com'
const METASTREAM_ORIGINS = new Set([
  METASTREAM_APP_URL,
  'http://local.getmetastream.com',
  'https://local.getmetastream.com',
  'http://localhost:8080',
  'https://localhost:8080',
  'http://127.0.0.1',
])
const isMetastreamUrl = url => {
  try {
    return METASTREAM_ORIGINS.has(new URL(url).origin)
  } catch {
    return false
  }
}
const isTopFrame = details => details.frameId === TOP_FRAME
const isValidAction = action => typeof action === 'object' && typeof action.type === 'string'
const isFirefox = () => navigator.userAgent.toLowerCase().includes('firefox')

const asyncTimeout = (promise, timeout = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  ])
}

const escapePattern = pattern => pattern.replace(/[\\^$+?.()|[\]{}]/g, '\\$&')

// Check whether pattern matches.
// https://developer.chrome.com/extensions/match_patterns
const matchesPattern = function(url, pattern) {
  if (pattern === '<all_urls>') return true
  const regexp = new RegExp(
    `^${pattern
      .split('*')
      .map(escapePattern)
      .join('.*')}$`
  )
  return url.match(regexp)
}

// Memoized frame paths
const framePaths = {}

// Get path from top level frame to subframe.
const getFramePath = async (tabId, frameId) => {
  if (framePaths[frameId]) return framePaths[frameId]
  let path = [frameId]
  let currentFrameId = frameId
  while (currentFrameId > 0) {
    const result = await new Promise(resolve => {
      const details = { tabId, frameId: currentFrameId }
      chrome.webNavigation.getFrame(details, details => {
        if (chrome.runtime.lastError) {
          console.error(`Error in getFramePath: ${chrome.runtime.lastError.message}`)
          resolve()
          return
        }
        resolve(details)
      })
    })
    if (!result) return []
    const { parentFrameId } = result
    path.push(parentFrameId)
    currentFrameId = parentFrameId
  }
  path = path.reverse()
  framePaths[frameId] = path
  return path
}

const sendToFrame = (tabId, frameId, message) =>
  chrome.tabs.sendMessage(tabId, message, { frameId })

const sendToHost = (tabId, message) => sendToFrame(tabId, TOP_FRAME, message)

const sendWebviewEventToHost = async (tabId, frameId, message) => {
  const framePath = await getFramePath(tabId, frameId)
  sendToHost(
    tabId,
    { type: 'metastream-webview-event', payload: message, framePath },
    { frameId: TOP_FRAME }
  )
}

const getLastActiveMetastreamTabId = async () => {
  const { watchedTabs, lastActiveTabId } = await getSessionState()
  const isMetastreamOpen = watchedTabs.length > 0
  if (!isMetastreamOpen) return -1

  const targetTabId = watchedTabs.includes(lastActiveTabId)
    ? lastActiveTabId
    : watchedTabs[0]

  return targetTabId
}

const focusActiveMetastreamTab = async () => {
  const targetTabId = await getLastActiveMetastreamTabId()
  if (targetTabId > -1) {
    // window.focus() is not reliable, but the WebExtensions API is!
    chrome.tabs.update(targetTabId, { active: true })
    chrome.tabs.get(targetTabId, tab => {
      chrome.windows.update(tab.windowId, { focused: true })
    })
  }
}

//=============================================================================
// Content scripts
//=============================================================================

const CONTENT_SCRIPTS = [
  {
    matches: ['https://*.netflix.com/*'],
    file: '/scripts/netflix.js',
    world: chrome.scripting.ExecutionWorld.MAIN
  },
  {
    matches: ['https://*.hulu.com/*'],
    file: '/scripts/hulu.js'
  },
  {
    matches: ['https://www.dcuniverse.com/*'],
    file: '/scripts/dcuniverse.js'
  },
  {
    matches: ['https://docs.google.com/*', 'https://drive.google.com/*'],
    file: '/scripts/googledrive.js'
  },
  {
    matches: ['https://www.disneyplus.com/*'],
    file: '/scripts/disneyplus.js'
  },
  {
    matches: ['https://*.twitch.tv/*'],
    file: '/scripts/twitch.js',
    world: chrome.scripting.ExecutionWorld.MAIN
  },
  {
    matches: ['https://tv.apple.com/*'],
    file: '/scripts/appletv.js'
  }
]

//=============================================================================
// Event listeners
//=============================================================================

// listener for chrome.webRequest.onHeadersReceived (non-blocking)
const onHeadersReceived = async (details) => {
  const { tabId, frameId, parentFrameId, initiator, url, responseHeaders } = details;

  // Filter for direct children of metastream top frame
  if (parentFrameId !== 0) return;
  if (!isMetastreamUrl(initiator)) return;

  // Forward to host so the app can determine if the frame will be blocked
  sendToHost(
    tabId,
    {
      type: 'metastream-embed-headers',
      payload: { url, responseHeaders, tabId, frameId }
    }
  );
}

const onTabRemove = async (tabId, removeInfo) => {
  const { watchedTabs } = await getSessionState()
  if (watchedTabs.includes(tabId)) {
    stopWatchingTab(tabId)
  }
}

const onBeforeNavigate = async (details) => {
  const { tabId, frameId, url } = details
  const { watchedTabs } = await getSessionState()
  if (!watchedTabs.includes(tabId)) return
  if (isTopFrame(frameId)) return
  ;(async () => {
    const framePath = await getFramePath(tabId, frameId)
    const isWebviewFrame = framePath[1] === frameId
    if (isWebviewFrame) {
      sendWebviewEventToHost(tabId, frameId, { type: 'will-navigate', payload: { url } })
    }
  })()
}

// Programmatically inject content scripts into Metastream subframes
const initScripts = async (details) => {
  const { tabId, url } = details
  const { watchedTabs, popupTabs } = await getSessionState()

  if (url.startsWith('about:blank?webview')) {
    initializeWebview(details)
    return
  }

  if (!watchedTabs.includes(tabId)) return

  if (isTopFrame(details) && !popupTabs.includes(tabId)) {
    // Listen for top frame navigating away from Metastream
    if (!isMetastreamUrl(details.url)) {
      stopWatchingTab(tabId)
    }
  } else {
    injectContentScripts(details)
  }
}

const onCompleted = async (details) => {
  const { tabId, frameId, url } = details
  const { watchedTabs } = await getSessionState()
  if (!watchedTabs.includes(tabId)) return
  if (isTopFrame(frameId)) return
  ;(async () => {
    const framePath = await getFramePath(tabId, frameId)
    const isWebviewFrame = framePath[1] === frameId
    if (isWebviewFrame) {
      sendWebviewEventToHost(tabId, frameId, { type: 'did-navigate', payload: { url } })
    }
  })()
}

const onHistoryStateUpdated = async (details) => {
  const { tabId, frameId, url } = details
  const { watchedTabs } = await getSessionState()
  if (!watchedTabs.includes(tabId)) return
  if (isTopFrame(frameId)) return
  ;(async () => {
    const framePath = await getFramePath(tabId, frameId)
    const isWebviewFrame = framePath[1] === frameId
    if (isWebviewFrame) {
      sendWebviewEventToHost(tabId, frameId, { type: 'did-navigate-in-page', payload: { url } })
    }
  })()
}

const initializeWebview = async (details) => {
  console.log('Initialize webview', details)
  const { tabId, frameId, url } = details
  const { watchedTabs, tabStore, popupTabs, popupParents, popupParentTabs } = await getSessionState()

  const { searchParams } = new URL(url)

  const isPopup = searchParams.get('popup') === 'true'
  const webviewId = searchParams.get('webview')

  let hostId

  if (isPopup) {
    const parentTabId = popupParents[webviewId]
    if (!parentTabId) {
      console.error(`No parent tab ID found for popup webview #${webviewId}`)
      return
    }
    hostId = parentTabId
    if (!popupTabs.includes(tabId)) popupTabs.push(tabId)
    if (!watchedTabs.includes(tabId)) watchedTabs.push(tabId)
    popupParentTabs[tabId] = hostId
  } else if (watchedTabs.includes(tabId)) {
    hostId = tabId
  } else {
    console.warn(`Ignoring webview with tabId=${tabId}, frameId=${frameId}`)
    return
  }

  sendToHost(hostId, { type: `metastream-webview-init${webviewId}`, payload: { tabId, frameId } })

  const tabState = tabStore[hostId]
  const allowScripts = searchParams.get('allowScripts') === 'true'
  if (allowScripts && tabState && !isPopup) {
    if (!tabState.scriptableFrames.includes(frameId)) {
      tabState.scriptableFrames.push(frameId)
    }
  }
}

const executeScript = (opts, attempt = 0) => {
  let target = {}
  if (opts.tabId) target.tabId = opts.tabId
  if (opts.allFrames) {
    target.allFrames = true
  } else if (opts.frameId) {
    target.frameIds = [opts.frameId]
  }

  let scriptOptions

  if (opts.file) {
    scriptOptions = { files: [opts.file] }
  } else if (opts.files) {
    scriptOptions = { files: opts.files }
  }

  chrome.scripting.executeScript(
    {
      target,
      injectImmediately: true,
      world: opts.world || chrome.scripting.ExecutionWorld.ISOLATED,
      ...scriptOptions,
    },
    result => {
      if (chrome.runtime.lastError) {
        console.log(`executeScript error [${opts.file}]: ${chrome.runtime.lastError.message}`)
        if (opts.retry !== false) {
          if (attempt < 20) {
            setTimeout(() => executeScript(opts, attempt + 1), 5)
          } else {
            console.error('Reached max attempts while injecting content script.', opts)
          }
        } else {
          console.error('Failed to inject content script', chrome.runtime.lastError, opts)
        }
      } else {
        console.log(`executeScript ${opts.file}`)
      }
    }
  )
}

const injectContentScripts = async details => {
  const { tabId, frameId, url } = details
  if (url === 'about:blank') return

  // Inject common webview script
  executeScript({ tabId, frameId, file: '/webview.js' })
  executeScript({ tabId, frameId, file: '/webview-sandbox-fix.js', world: chrome.scripting.ExecutionWorld.MAIN })

  const framePath = await getFramePath(tabId, frameId)
  const { tabStore, popupTabs } = await getSessionState()
  const topIFrameId = framePath[1]
  const tabState = tabStore[tabId]
  const scriptable =
    (tabState && tabState.scriptableFrames.includes(topIFrameId)) || popupTabs.includes(tabId)
  if (scriptable) {
    console.log(`Injecting player script tabId=${tabId}, frameId=${frameId}, url=${url}`)
    executeScript({ tabId, allFrames: true, file: '/player.js' })
    executeScript({ tabId, allFrames: true, file: '/player-main-world.js', world: 'MAIN' })

    CONTENT_SCRIPTS.forEach(script => {
      if (!script.matches.some(matchesPattern.bind(null, url))) return
      executeScript({ tabId, frameId, file: script.file, world: script.world })
    })
  }
}

//=============================================================================
// Metastream tab management
//=============================================================================

const startWatchingTab = async (tab) => {
  const { id: tabId } = tab

  const { watchedTabs, tabStore } = await getSessionState()
  if (watchedTabs.includes(tabId)) {
    await stopWatchingTab(tabId)
  }

  watchedTabs.push(tabId)
  console.log(`Metastream watching tabId=${tabId}`)

  const state = {
    // Webview frames which allow scripts to be injected
    scriptableFrames: [],

    // Event handlers
    onHeadersReceived: onHeadersReceived.bind(null),
  }

  tabStore[tabId] = state

  const RULE = {
    id: tab.id,
    condition: {
      // initiatorDomains: [new URL(tab.url).host, new URL(tab.url).hostname],
      resourceTypes: ['sub_frame', 'xmlhttprequest', 'script'],
      tabIds: [tab.id]
    },
    action: {
      type: 'modifyHeaders',
      responseHeaders: [
        {header: 'X-Frame-Options', operation: 'remove'},
        {header: 'Frame-Options', operation: 'remove'},
        {header: 'Content-Security-Policy', operation: 'remove'},
      ],
    },
  }
  chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [RULE.id],
    addRules: [RULE],
  })

  chrome.webRequest.onHeadersReceived.addListener(
    state.onHeadersReceived,
    {
      tabId,
      urls: ['<all_urls>'],
      types: ['sub_frame']
    },
    [
      chrome.webRequest.OnHeadersReceivedOptions.RESPONSEHEADERS, // firefox
      chrome.webRequest.OnHeadersReceivedOptions.RESPONSE_HEADERS, // chromium
      chrome.webRequest.OnHeadersReceivedOptions.EXTRAHEADERS, // firefox
      chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS // chromium
    ].filter(Boolean)
  )

  if (watchedTabs.length === 1) {
    onSessionActive()
  }
}

const stopWatchingTab = async (tabId) => {
  const { watchedTabs, tabStore } = await getSessionState()
  const watchedTabsIndex = watchedTabs.indexOf(tabId)
  if (watchedTabsIndex > -1) {
    watchedTabs.splice(watchedTabsIndex, 1)
  }

  const state = tabStore[tabId]
  if (state) {
    chrome.webRequest.onHeadersReceived.removeListener(state.onHeadersReceived)
    delete tabStore[tabId]
  }

  if (watchedTabs.length === 0) {
    onNoActiveSessions()
  }

  console.log(`Metastream stopped watching tabId=${tabId}`)
}

const onSessionActive = () => {
  chrome.scripting.registerContentScripts([
    {
      id: FIRST_CONTENT_SCRIPT_ID,
      allFrames: true,
      js: ['first.js'],
      matches: ["<all_urls>"],
      runAt: 'document_start',
      world: 'MAIN',
      persistAcrossSessions: false
    }
  ]).catch(console.error);

  chrome.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate)
  if (isFirefox()) {
    chrome.webNavigation.onDOMContentLoaded.addListener(initScripts)
  } else {
    chrome.webNavigation.onCommitted.addListener(initScripts)
  }
  chrome.webNavigation.onCompleted.addListener(onCompleted)
  chrome.webNavigation.onHistoryStateUpdated.addListener(onHistoryStateUpdated)
  chrome.tabs.onRemoved.addListener(onTabRemove)
}

const onNoActiveSessions = () => {
  chrome.scripting.unregisterContentScripts({
    ids: [FIRST_CONTENT_SCRIPT_ID]
  })

  chrome.webNavigation.onBeforeNavigate.removeListener(onBeforeNavigate)
  if (isFirefox()) {
    chrome.webNavigation.onDOMContentLoaded.removeListener(initScripts)
  } else {
    chrome.webNavigation.onCommitted.removeListener(initScripts)
  }
  chrome.webNavigation.onCompleted.removeListener(onCompleted)
  chrome.webNavigation.onHistoryStateUpdated.removeListener(onHistoryStateUpdated)
  chrome.tabs.onRemoved.removeListener(onTabRemove)
}

const PERMISSION_ACTIONS = {
  allowPopups(request) {
    // Allow Metastream to open two popups at the same time without one getting blocked.
    // Some websites can't be played while embedded in the site so they need to open
    // in a popup to have a top-level browser context.
    // Note: contentSettings API is not supported in Firefox
    if (chrome.contentSettings?.popups) {
      chrome.contentSettings.popups.set({
        primaryPattern: request.origins[0],
        setting: chrome.contentSettings.PopupsContentSetting.ALLOW
      })
    }
  }
}

const requestPermissions = request => {
  const { action, ...rest } = request
  // Note: permissions.request is not supported on Firefox for Android
  if (chrome.permissions?.request) {
    chrome.permissions.request(rest, granted => {
      if (granted && typeof action === 'string') {
        PERMISSION_ACTIONS[action](request)
      }
    })
  }
}

const settingListeners = {}
const addSettingListener = (setting, listener) => {
  const listeners = settingListeners[setting] || (settingListeners[setting] = new Set())
  listeners.add(listener)
}
const updateSetting = (update) => {
  const scope = update.scope || 'sync'
  const storageArea = chrome.storage[scope]
  if (!storageArea) {
    throw new Error(`${scope} storage is not available`)
  }

  storageArea.set({
    [update.key]: update.value
  }, () => {
    const listeners = Array.from(settingListeners[update.key] || [])
    for (const listener of listeners) {
      listener(update.value)
    }
  })
}

//=============================================================================
// Background fetch proxy
//=============================================================================

const serializeResponse = async response => {
  let body
  let headers = {}

  const contentType = (response.headers.get('content-type') || '').toLowerCase()
  if (contentType && contentType.indexOf('application/json') !== -1) {
    try {
      body = await response.json()
    } catch (e) {}
  } else {
    body = await response.text()
  }

  for (let pair of response.headers.entries()) {
    headers[pair[0]] = pair[1]
  }

  return {
    ...response,
    headers,
    body
  }
}

// Fetch on behalf of Metastream app, skips cross-domain security restrictions
const request = async (tabId, requestId, url, options) => {
  const { timeout } = options || {}
  const controller = new AbortController()
  const { signal } = controller

  let response, err

  // Loop over all headers to request to search for any prefixed with x-metastream in a case-insensitive manner
  const metastreamHeaders = Object.keys(options.headers || {}).filter(header => header.toLowerCase().startsWith('x-metastream')).map(header => ({
    "header": header.toLowerCase().replace('x-metastream-', ''),
    "operation": "set",
    "value": options.headers[header]
  }));

  const ruleId = 1000 + requestId
  if (metastreamHeaders.length > 0) {
    chrome.declarativeNetRequest.updateSessionRules({
      addRules: [
        {
          "id": ruleId,
          "priority": 1,
          "action": {
            "type": "modifyHeaders",
            "requestHeaders": metastreamHeaders
          },
          "condition": {
            "urlFilter": url,
            "resourceTypes": ["xmlhttprequest"]
          }
        }
      ],
      removeRuleIds: []
    })
  }

  try {
    console.debug(`Requesting ${url}`)
    response = await asyncTimeout(fetch(url, { ...options, signal }), timeout)
  } catch (e) {
    controller.abort()
    err = e.message
  }

  // Remove the session rule after the request is done
  chrome.declarativeNetRequest.updateSessionRules({
    addRules: [],
    removeRuleIds: [ruleId] // Use the unique rule ID generated for this request
  })

  const resp = response ? await serializeResponse(response) : null
  const action = {
    type: `metastream-fetch-response${requestId}`,
    payload: {
      err,
      resp
    }
  }
  sendToHost(tabId, action)
}

//=============================================================================
// Message passing interface
//=============================================================================

const handleWebviewEvent = async (sender, action) => {
  const { frameId } = sender
  const { id: tabId } = sender.tab
  const { popupParentTabs, popupTabs } = await getSessionState()

  // popups always send webview events back to host app
  if (popupTabs.includes(tabId)) {
    const parentId = popupParentTabs[tabId]
    sendWebviewEventToHost(parentId, TOP_FRAME, action.payload)
    return
  }

  if (isTopFrame(sender)) {
    // sent from app
    sendToFrame(action.tabId || tabId, action.frameId, action.payload)
  } else {
    // sent from embedded frame
    sendWebviewEventToHost(tabId, frameId, action.payload)
  }
}

async function messageHandler(action, sender, sendResponse) {
  // Get URL from sender as sender.tab can be in prerendered state
  const { url } = sender
  const { id: tabId } = sender.tab
  if (!isValidAction(action)) return

  // Listen for Metastream app initialization signal
  if (action.type === 'metastream-init' && isMetastreamUrl(url)) {
    startWatchingTab(sender.tab)
    sendResponse(true)
    return
  }

  const sessionState = await getSessionState()
  const { watchedTabs, popupTabs, popupParents } = sessionState

  // Filter out messages from non-Metastream app tabs
  if (!watchedTabs.includes(tabId)) return

  switch (action.type) {
    case 'metastream-webview-event':
      handleWebviewEvent(sender, action)
      break
    case 'metastream-fetch': {
      const { requestId, url, options } = action.payload
      request(tabId, requestId, url, options)
      break
    }
    case 'metastream-popup-init': {
      const { id: webviewId } = action.payload
      popupParents[webviewId] = tabId
      break
    }
    case 'metastream-focus': {
      focusActiveMetastreamTab()
      break
    }
    case 'metastream-permissions-request': {
      requestPermissions(action.payload)
      break
    }
    case 'metastream-update-setting': {
      updateSetting(action.payload)
      break
    }
  }

  if (!popupTabs.includes(tabId)) {
    sessionState.lastActiveTabId = tabId
  }
}

chrome.runtime.onMessage.addListener(messageHandler)

if (chrome.runtime.onMessageExternal) {
  chrome.runtime.onMessageExternal.addListener(messageHandler)
}

//=============================================================================
// Inject content scripts into existing tabs on startup
//=============================================================================

const { content_scripts: contentScripts = [] } = chrome.runtime.getManifest()
const appContentScript = contentScripts.find(
  script => script.js && script.js.some(file => file.endsWith('app.js'))
)

if (appContentScript) {
  chrome.tabs.query({ url: appContentScript.matches }, tabs => {
    tabs.forEach(tab => {
      const file = appContentScript.js[0]
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [file]
      })
    })
  })
}

//=============================================================================
// Add URL to session on badge click
//=============================================================================

const getMediaTimeInTab = tabId =>
  new Promise(resolve => {
    chrome.scripting.executeScript(
      {
        target: { tabId, allFrames: true },
        files: ['/get-media-time.js']
      },
      results => {
        let time = (results.length > 0 && !isNaN(results[0]) && results[0]) || undefined
        resolve(time)
      }
    )
  })

// pause media in all non-metastream tabs
const pauseMediaInOtherTabs = async () => {
  const tabs = await chrome.tabs.query({ audible: true })
  const { watchedTabs } = await getSessionState()
  for (const tab of tabs) {
    if (watchedTabs.includes(tab.id)) return
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      files: ['/pause-media.js']
    })
  }
}

const openLinkInMetastream = async (details) => {
  const { url: requestUrl, currentTime, source } = details

  const { protocol } = new URL(requestUrl)
  if (protocol !== 'http:' && protocol !== 'https:') return

  console.log(`Opening URL in Metastream: ${requestUrl}${currentTime ? ` @ ${currentTime}` : ''}`)

  const targetTabId = await getLastActiveMetastreamTabId()
  if (targetTabId > -1) {
    sendToHost(targetTabId, {
      type: 'metastream-extension-request',
      payload: { url: requestUrl, time: currentTime, source }
    })
    focusActiveMetastreamTab()
  } else {
    const params = new URLSearchParams()
    params.append('url', requestUrl)
    if (currentTime) params.append('t', currentTime)
    if (source) params.append('source', source)
    const url = `${METASTREAM_APP_URL}/?${params.toString()}`
    // const url = `http://localhost:8080/#?${params.toString()}` // dev
    chrome.tabs.create({ url })
  }

  pauseMediaInOtherTabs()
}

const openTabInMetastream = async ({ tab, source }) => {
  const { id: tabId, url } = tab
  if (tabId < 0) return

  // ignore badge presses from Metastream tabs
  const { watchedTabs } = await getSessionState()
  if (watchedTabs.includes(tabId)) return

  const currentTime = await getMediaTimeInTab(tabId)
  openLinkInMetastream({ url, currentTime, source })
}

chrome.action.onClicked.addListener(tab =>
  openTabInMetastream({ tab, source: 'browser-action' })
)

//=============================================================================
// Create context menu items to add links to metastream session
//=============================================================================

const registerContextMenus = async () => {
  const contextMenusEnabled = await chrome.storage.sync.get('contextMenusEnabled')

  if (contextMenusEnabled === false) {
    await chrome.contextMenus.removeAll();
    return;
  }

  const TARGET_URL_PATTERNS = ['https://*/*']

  chrome.contextMenus.create({
    id: 'metastream-open-link-in-session',
    title: 'Open link in Metastream session',
    contexts: ['link'],
    targetUrlPatterns: TARGET_URL_PATTERNS,
  })

  chrome.contextMenus.create({
    id: 'metastream-open-link-in-session-action',
    title: 'Open link in Metastream session',
    contexts: ['browser_action'],
    documentUrlPatterns: TARGET_URL_PATTERNS,
  })

  chrome.contextMenus.create({
    id: 'metastream-video-in-session',
    title: 'Open video in Metastream session',
    contexts: ['video'],
    targetUrlPatterns: TARGET_URL_PATTERNS,
  })

  console.log('registered context menus')
}
addSettingListener('contextMenusEnabled', registerContextMenus)

chrome.contextMenus.onClicked.addListener(
  function contextMenuClicked(info, tab) {
    console.log('context menu clicked', Array.from(arguments));
    switch (info.menuItemId) {
      case 'metastream-open-link-in-session': {
        const { linkUrl: url } = info
        if (url) openLinkInMetastream({ url, source: 'context-menu-link' })
        break
      }
      case 'metastream-open-link-in-session-action': {
        openTabInMetastream({ tab, source: 'context-menu-browser-action' })
        break
      }
      case 'metastream-video-in-session': {
        const { srcUrl: url } = info
        if (url) openLinkInMetastream({ url, source: 'context-menu-video' })
        break;
      }
    }
  }
)

chrome.runtime.onInstalled.addListener(() => {
  registerContextMenus()
})

const init = async () => {
  console.log('Initializing service worker')
  const { watchedTabs } = await getSessionState()
  if (watchedTabs.length > 0) {
    console.log('Setting up initial session listeners')
    onSessionActive()
  }
}

init()
