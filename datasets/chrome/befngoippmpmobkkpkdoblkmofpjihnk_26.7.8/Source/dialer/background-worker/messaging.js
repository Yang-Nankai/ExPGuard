function handleDialerMessages (message, _sender, sendResponse) {
  switch (message.type) {
    case 'DIALER_ENSURE_APP_TAB':
      ensureAppTab()
        .then(() => sendResponse(true))

      // this signals that we will be replying asynchronously
      // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_an_asynchronous_response_using_sendresponse
      return true
    default:
      break
  }
}

function getDialerReady () {
  return document.documentElement.dataset.dialerReady != null
}

async function checkDialerReady (tab) {
  const answer = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getDialerReady
  })

  return answer.find(a => a.frameId === 0)?.result
}

function delay (msec) {
  return new Promise(resolve => setTimeout(resolve, msec))
}

async function loop (asyncFn, interval = 1000) {
  while (!await asyncFn()) {
    await delay(interval)
  }
}

async function waitUntilTabLoaded (tab) {
  if (tab.status === 'complete') return
  return new Promise(resolve => {
    function onCompleted (tabId, changeInfo) {
      if (tabId !== tab.id) return
      if (changeInfo.status !== 'complete') return
      chrome.tabs.onUpdated.removeListener(onCompleted)
      resolve()
    }

    chrome.tabs.onUpdated.addListener(onCompleted)
  })
}

let waiting
function waitUntilDialerReady (tab) {
  return waiting ??= (waitUntilTabLoaded(tab)
    .then(() => loop(() => checkDialerReady(tab), 250))
    .then(() => waiting = undefined))
}

async function ensureAppTab (path = 'app/dialer') {
  const existingTabs = await chrome.tabs.query({
    url: `${WEB_SERVER}/*`
  })

  const firstTab = existingTabs.at(0)
  if (firstTab) {
    await waitUntilDialerReady(firstTab)
    return firstTab
  }

  const tab = await chrome.tabs.create({
    url: `${WEB_SERVER}/${path}`,
    active: true
  })

  await waitUntilDialerReady(tab)
  return tab
}

chrome.runtime.onMessageExternal.addListener(handleDialerMessages)
