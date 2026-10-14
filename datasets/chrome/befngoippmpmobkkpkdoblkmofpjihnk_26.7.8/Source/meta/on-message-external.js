function asyncHandler (fn) { return (...args) => { fn(...args); return true } }

// From external web pages
chrome.runtime.onMessageExternal.addListener(asyncHandler(
  async function (request, sender, sendResponse) {
    console.info('Received external message', request.type)

    // Handle malformed messages
    if (!request || (!request.type && !request.relay)) {
      console.warn('Received message without type or relay', request)
      sendResponse(false)
      return
    }

    // This is to relay messages between different contexts within the same tab.
    // For example a host talking to the Scribe iframe and vice versa
    if (request.relay) {
      chrome.tabs.sendMessage(sender.tab.id, request.payload)
      sendResponse(true)
      return
    }

    let syncResponse = 'default-ok'

    // Handle standard messages
    switch (request.type) {
      case 'DIAGNOSTICS_PING': {
        self.sendMessageToUI({ type: 'DIAGNOSTICS_PONG' })
        break
      }

      case 'REQUEST_STATE': {
        console.info('From sidepanel to Li tab')
        self.sendRequestToTabs()
        break
      }

      case 'CACHE_PARSER_OUTPUT': {
        self.sendRequestToTabs('CACHE_PARSER_OUTPUT', request.payload)
        break
      }

      case 'SUGGEST_RELOAD': {
        // Just in case parsing is broken for a specific tab, reload them all
        self.reloadLinkedinTabs()
        break
      }

      case 'HAS_PERMISSIONS': {
        const { permissions } = request
        syncResponse = await chrome.permissions.contains(permissions)
        break
      }

      case 'DIAGNOSTICS_OPEN_EXTENSIONS_COUNT': {
        const tabs = await chrome.tabs.query(
          { url: 'https://*.leadiq.com/extension/*' }
        )
        let count = tabs.length
        if (await self.isSidePanelOpen()) count++
        syncResponse = count
        break
      }

      case 'DIAGNOSTICS_LI_TAB_DETECTED': {
        const tab = await self.getFirstActiveLinkedinTab()
        syncResponse = tab !== undefined
        break
      }

      case 'GET_TAB_CONTEXT': {
        const [activeTab] = await chrome.tabs.query({
          active: true,
          currentWindow: true
        })
        syncResponse = activeTab
          ? {
              url: activeTab.url ?? '',
              title: activeTab.title ?? ''
            }
          : null
        break
      }

      case 'GET_PAGE_CONTENT': {
        const [activeTab] = await chrome.tabs.query({
          active: true,
          currentWindow: true
        })

        if (!activeTab?.id) {
          syncResponse = '[Error reading page: No active browser tab found]'
          break
        }

        try {
          const results = await chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: () => {
              const MAX_LENGTH = 50000
              const text = document.body.innerText || ''

              const anchors = document.querySelectorAll('a[href]')
              const labelMap = new Map()
              const conflicts = new Set()

              for (const a of anchors) {
                const label = a.innerText.trim()
                if (!label || !a.href || conflicts.has(label)) continue
                const existing = labelMap.get(label)
                if (existing && existing !== a.href) {
                  labelMap.delete(label)
                  conflicts.add(label)
                } else {
                  labelMap.set(label, a.href)
                }
              }

              const sortedLabels = [...labelMap.entries()].sort((a, b) => a[0].length - b[0].length)
              const result = text.split('\n').map(line => {
                for (const [label, href] of sortedLabels) {
                  if (line.includes(label)) {
                    line = line.replace(label, `[${label}](${href})`)
                  }
                }
                return line
              }).join('\n')

              return result.length > MAX_LENGTH
                ? result.substring(0, MAX_LENGTH) + '\n\n[Content truncated...]'
                : result
            }
          })

          syncResponse = results?.[0]?.result ?? '[Error reading page: Page returned no content]'
        } catch (error) {
          console.error('Failed to get page content:', error)
          syncResponse = `[Error reading page: ${error.message}]`
        }
        break
      }

      case 'GET_PAGE_CONTACT': {
        const [activeTab] = await chrome.tabs.query({
          active: true,
          currentWindow: true
        })

        if (!activeTab?.id) {
          syncResponse = null
          break
        }

        // On LinkedIn / Sales Navigator the profile URL is the contact
        // identifier, and it's already the tab URL - no script injection needed.
        if (/^https?:\/\/([a-z0-9]+\.)*linkedin\.com\//.test(activeTab.url ?? '')) {
          syncResponse = { linkedInUrl: activeTab.url }
          break
        }

        try {
          const results = await chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: self.readPageContact,
            args: [request.config]
          })
          syncResponse = results?.[0]?.result ?? null
        } catch (error) {
          // Host permission not granted, or an unsupported / unscriptable page.
          // null reads as "no contact" upstream; log so a genuine injection
          // error isn't indistinguishable from an empty page.
          console.warn('[GET_PAGE_CONTACT] executeScript failed', error)
          syncResponse = null
        }
        break
      }

      case 'INSERT_EMAIL': {
        const [activeTab] = await chrome.tabs.query({
          active: true,
          currentWindow: true
        })

        if (!activeTab?.id) {
          syncResponse = { ok: false, error: 'no-active-tab' }
          break
        }

        const { subject, body } = request
        try {
          // insertEmail pastes both fields in one injection and reports per-field
          // success; only report ok when every requested field was actually
          // inserted (a missing composer element reports false for that field).
          const results = await chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: self.insertEmail,
            args: [{ subject, body }, request.config]
          })
          // Carry the per-field flags through so a partial insert (e.g. subject
          // landed but the body editor wasn't found) isn't reported as a total
          // failure - the consumer needs them to tell the user what actually got
          // written. A field that wasn't requested reports true (nothing to do).
          const subjectOk = results?.[0]?.result?.subjectOk === true
          const bodyOk = results?.[0]?.result?.bodyOk === true
          syncResponse = subjectOk && bodyOk
            ? { ok: true }
            : { ok: false, error: 'no-composer', subjectOk, bodyOk }
        } catch (error) {
          // A throw means the script never ran (host permission not granted, or
          // an unscriptable page) - distinct from 'no-composer', where it ran but
          // found no composer element. Conflating them would tell a user who only
          // needs to grant permission to "open a composer" instead.
          console.warn('[INSERT_EMAIL] executeScript failed', error)
          syncResponse = { ok: false, error: 'cannot-access-page' }
        }
        break
      }

      case 'DIAGNOSTICS_PING_LINKEDIN': {
        const tab = await self.getFirstActiveLinkedinTab()

        try {
          // Forward the Ping as is to the Li tab
          await chrome.tabs.sendMessage(tab.id, request)

          // No errors sending the pings means everything is ok
          // Detecting pongs will be up to a separate test in the popup
          syncResponse = true
        } catch (e) {
          syncResponse = false
        }
        break
      }

      case 'ENABLE_SCRIBE': {
        await self.setScribeEnabled()
        await self.registerOnlyScribeScripts()
        syncResponse = await self.isScribeEnabled() === true
        break
      }

      case 'DISABLE_SCRIBE': {
        await self.setScribeDisabled()
        await self.unregisterOnlyScribeScripts()
        syncResponse = await self.isScribeEnabled() === false
        break
      }

      case 'ELEVATE_PERMISSIONS': {
        const { permissions } = request
        // Null means don't send the syncResponse later, we will handle it here
        syncResponse = null

        // We use callbacks instead of async/await because of this error:
        // "This function must be called during a user gesture"
        chrome.permissions.contains(permissions, hasPermissions => {
          if (hasPermissions) {
            return sendResponse(hasPermissions)
          }

          chrome.permissions.request(permissions, granted => {
            sendResponse(granted)
          })
        })
        break
      }

      case 'HAS_SCRIBE': {
        syncResponse = await self.isScribeEnabled()
        break
      }

      case 'PASTE': {
        chrome.tabs.sendMessage(sender.tab.id, request)
        break
      }

      case 'SCRIBE_READY': {
        chrome.tabs.sendMessage(sender.tab.id, request)
        break
      }

      case 'OPEN_SCRIBE_IN_ACTIVE_TAB': {
        try {
          const currentWindow = await chrome.windows.getCurrent()
          const [activeTab] = await chrome.tabs.query({
            active: true,
            windowId: currentWindow.id
          })

          if (!activeTab) {
            syncResponse = 'unsupported'
            break
          }

          const supportType = self.getScribeSupportType ? self.getScribeSupportType(activeTab.url) : 'unsupported'

          if (supportType === 'standard') {
            chrome.tabs.sendMessage(activeTab.id, { type: 'SCRIBE_SHOW_POPUP' })
            syncResponse = 'standard'
          } else {
            syncResponse = supportType
          }
        } catch (error) {
          console.error('Failed to open Scribe in active tab:', error)
          syncResponse = false
        }
        break
      }

      // Allow the web app to make non-CORS requests
      // Currently used by Scribe web and embedded scribe
      case 'FETCH_TEXT':
      case 'FETCH_JSON': {
        const { url, options } = request.payload
        const safeOrigin = /https:\/\/(.+\.)*leadiq\.com/
        if (safeOrigin.test(sender.origin)) {
          try {
            const response = await fetch(url, options)
            if (!response.ok) throw Error(`Fetch err: ${response.status}`)
            if (request.type === 'FETCH_TEXT') {
              syncResponse = await response.text()
            } else if (request.type === 'FETCH_JSON') {
              syncResponse = await response.json()
            }
          } catch (err) {
            syncResponse = false
          }
        } else {
          syncResponse = false
        }
        break
      }

      case 'OPEN_LANDO': {
        const windowId = sender.tab?.windowId
        if (windowId !== undefined) {
          chrome.sidePanel.setOptions({ enabled: true })
          chrome.sidePanel.open({ windowId })
            .then(() => chrome.storage.local.set({ preferSidePanel: true }))
            .catch(e => console.warn('sidePanel.open rejected for OPEN_LANDO', e))
        }
        self.openLandoUi(request.prompt)
        syncResponse = true
        break
      }

      case 'SWITCH_TO_SIDEPANEL': {
        try {
          // Set preference to use sidepanel mode
          chrome.storage.local.set({ preferSidePanel: true })

          // We can't open sidepanel from external message due to user gesture requirement
          // The preference is set, so next click on extension icon will open sidepanel
          syncResponse = true
        } catch (error) {
          console.error('Failed to set sidepanel preference:', error)
          syncResponse = false
        }
        break
      }

      case 'DIALER_ENSURE_APP_TAB': {
        syncResponse = null
      }
    }

    // Always* call this to prevent promises from hanging on the other end
    // * You can bypass this by setting syncResponse to null in cases where
    // you will handle sending the response yourself
    if (syncResponse !== null) sendResponse(syncResponse)
  }
))
