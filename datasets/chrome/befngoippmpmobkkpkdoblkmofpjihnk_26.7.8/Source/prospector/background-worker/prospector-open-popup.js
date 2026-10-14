// This magic variable is replaced at build time. See gulpfile.js
const WEB_SERVER = 'https://account.leadiq.com'

const EXT_WIDTH = 360
const THROTTLE_TIME = 2000 // 2 seconds

let lastOpeningTry = 0

chrome.windows.onRemoved.addListener(
  handleClosingOfPopupWindowMaybe,
  { windowType: ['popup'] }
)

chrome.runtime.onMessage.addListener(handleIncomingPopupMessage)
chrome.runtime.onMessageExternal.addListener(handleIncomingPopupMessage)

self.setupPopup = async function (openWith = 'browser') {
  // There's a bug (?) where previously opened sidepanels still show up
  // as `enabled: true` after reinstalling the CX. Or possibly it's true
  // by default intentionally? Either way, make sure it's off if we're explicitly
  // opening as a popup.
  if (chrome.sidePanel) chrome.sidePanel.setOptions({ enabled: false })

  const now = Date.now()
  if (now - lastOpeningTry < THROTTLE_TIME) {
    return
  }
  lastOpeningTry = now

  let win = await getCurrentWindow()

  const wasFullscreen = isFullscreen(win) || isMaximized(win)
  if (wasFullscreen) win = await exitFullscreen(win)

  const existingPopupTab = await getAppTab()
  if (existingPopupTab) return positionPopupNextToWindow(existingPopupTab, win)

  const popup = await openPopup(win, openWith)
  chrome.storage.local.set({ popupWindowId: popup.id })

  if (wasFullscreen) win = await makeWindowAlmostFullscreen(popup, win)
  win = await reduceWindowToFitExtension(popup, win)

  await positionPopupNextToWindow(popup, win)
}

function handleIncomingPopupMessage (message, sender) {
  switch (message.type) {
    case 'POPUP_LEFT_POSITION_CHANGED':
      chrome.storage.local.set({ popupLeftPosition: message.left })
      break
    case 'OPEN_POPUP':
      if (message.page) self.sendMessageToPopup(message, sender, true)
      else self.setupPopup('linkedInWidget')
      break
  }
}

function isFullscreen (win) {
  return win.state === 'fullscreen'
}

function isMaximized (win) {
  return win.state === 'maximized'
}

async function positionPopupNextToWindow (popup, window) {
  const popupWidth = await getTrueWidth(popup)
  return new Promise(resolve => {
    const updateInfo = {
      left: window.left - popupWidth,
      top: window.top,
      height: window.height,
      focused: true
    }
    chrome.windows.update(popup.id, updateInfo, resolve)
  })
}

async function reduceWindowToFitExtension (popup, win) {
  const popupWidth = await getTrueWidth(popup)
  const reducedWindowInfo = {
    // For some reason we don't want getTrueWidth for this window calculation
    // If you try using that, it will shrink too much
    width: win.width - popupWidth,
    height: win.height,
    top: win.top,
    left: win.left + popupWidth
  }
  return new Promise(resolve => {
    chrome.windows.update(win.id, reducedWindowInfo, resolve)
  })
}

async function makeWindowAlmostFullscreen (popupWin, win) {
  // We need to use popup to get the bounds because we might not have
  // permission to execute code in other tabs, but popup is our own.
  const bounds = await getAvailableBounds(popupWin.tabs[0])
  const width = await calcFakeWidth(bounds.availWidth)
  const height = await calcFakeHeight(bounds.availHeight)
  const left = await calcTrueXPosition(bounds.availLeft)
  const top = bounds.availTop
  const newWindowSizeAndPos = { width, height, top, left }
  return new Promise(resolve => {
    chrome.windows.update(win.id, newWindowSizeAndPos, resolve)
  })
}

function getAvailableBounds (tab) {
  return new Promise(resolve => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: function () {
          return {
            availTop: window.screen.availTop,
            availLeft: window.screen.availLeft,
            availWidth: window.screen.availWidth,
            availHeight: window.screen.availHeight
          }
        }
      },
      results => {
        if (!results) resolve({})
        else resolve(results[0].result)
      }
    )
  })
}

async function getTrueWidth (window) {
  const widthFix = await isWindows() ? 16 : 0
  return window.width - widthFix
}

async function getTrueLeft (window) {
  const leftFix = await isWindows() ? 8 : 0
  return window.left - leftFix
}

async function calcTrueXPosition (xPos) {
  const xPosFix = await isWindows() ? 8 : 0
  return xPos - xPosFix
}

async function calcFakeWidth (width, onWindowsAddExtra = 0) {
  const fakeWidthFix = await isWindows() ? 16 + onWindowsAddExtra : 0
  return width + fakeWidthFix
}

async function calcFakeHeight (height) {
  const fakeWidthFix = await isWindows() ? 8 : 0
  return height + fakeWidthFix
}

async function isWindows () {
  return (await getOs()) === 'win'
}

async function getOs () {
  return new Promise(resolve => {
    chrome.runtime.getPlatformInfo(info => {
      resolve(info.os)
    })
  })
}

async function exitFullscreen (window) {
  // On Mac, we can go straight from fullscreen to maximized and resize from
  // there, this avoids temporarily making the window tiny.
  // On Windows, a maximized window cannot be resized so go "normal" first
  const newState = await isWindows() ? 'normal' : 'maximized'
  return new Promise((resolve) => {
    chrome.windows.update(window.id, { state: newState }, async (win) => {
      // Wait for un-minimize animation to finish
      setTimeout(
        async () => resolve(await getWindowById(win.id)),
        600
      )
    })
  })
}

const getCurrentWindow = async () => new Promise(resolve => {
  chrome.windows.getCurrent({ populate: true }, resolve)
})

const getWindowById = async (id) => new Promise(resolve => {
  chrome.windows.get(id, resolve)
})

async function openPopup (openerWindow, openWith = 'browser') {
  // Disabling because this is legacy code and I don't want to refactor it
  // eslint-disable-next-line
  return new Promise(async resolve => {
    chrome.windows.create({
      url: `${WEB_SERVER}/extension/leadiq-app.html?openWith=${openWith}`,
      type: 'popup',
      top: openerWindow.top,
      left: await getTrueLeft(openerWindow),
      width: await isWindows() ? EXT_WIDTH + 16 : EXT_WIDTH,
      height: openerWindow.height
    }, (popup) => {
      resolve(popup)
    })
  })
}

async function getAppTab () {
  return new Promise(resolve => {
    chrome.tabs.query(
      { url: 'https://*.leadiq.com/*', windowType: 'popup' },
      tabs => {
        const tabsWithTargetUrls = tabs.filter(tab => {
          // Using decodeURIComponent on the entire URL for simplicity.
          // This approach is safe here because:
          // We're only performing string matching, not URL manipulation.
          const decodedUrl = decodeURIComponent(tab.url)
          return decodedUrl.includes('leadiq.com/extension/') ||
                 decodedUrl.includes('appPath=/extension/leadiq-app.html')
        })

        const firstTab = tabsWithTargetUrls?.[0]
        if (firstTab) {
          // first bring to focus
          chrome.windows.update(firstTab.windowId, { focused: true }, () => {
            resolve(firstTab)
          })
        } else resolve(null)
      }
    )
  })
}

async function handleClosingOfPopupWindowMaybe (windowId) {
  const { popupLeftPosition, popupWindowId } = await getPopupMetadata()

  if (popupWindowId !== windowId) return

  const windowNextToPopup = await findWindowNextToPopup(popupLeftPosition)
  if (!windowNextToPopup) return

  const updatedPositioning = {
    left: windowNextToPopup.left - EXT_WIDTH,
    width: windowNextToPopup.width + EXT_WIDTH
  }

  chrome.windows.update(windowNextToPopup.id, updatedPositioning)
  chrome.tabs.query(
    { url: 'https://*.linkedin.com/*' },
    tabs => {
      tabs.forEach(tab => {
        if (tab.url) chrome.tabs.sendMessage(tab.id, { type: 'SHOW_WIDGET' })
      })
    }
  )
}

async function findWindowNextToPopup (popupLeftPosition) {
  const windows = await chrome.windows.getAll()
  return windows.find(window => {
    return isWithin(
      window.left,
      popupLeftPosition + EXT_WIDTH,
      10
    )
  })
}

function isWithin (value1, value2, tolerance) {
  return value1 >= value2 - tolerance && value1 <= value2 + tolerance
}

async function getPopupMetadata () {
  // This data is stored this way because by the time this function is called
  // the popup has already been closed, so we cannot query it
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['popupLeftPosition', 'popupWindowId'], result => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError)
      else {
        resolve({
          popupLeftPosition: result.popupLeftPosition,
          popupWindowId: result.popupWindowId
        })
      }
    })
  })
}
