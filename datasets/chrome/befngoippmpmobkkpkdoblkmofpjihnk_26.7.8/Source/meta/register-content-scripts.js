// We register content scripts programmatically instead of using the manifest
// because of 2 reasons:
// 1. We want to inject content scripts into existing tabs when the extension
//    is installed or updated. This is slightly easier if done this way.
// 2. We want to treat optional host permissions in the same manner as
//    mandatory permissions. This is not possible with the manifest.
//    Any content script registed in the manifest will force the host
//    permission to be mandatory.

const SCRIBE_SUPPORTED_STANDARD = ['scribe-anywhere', 'scribe-linkedin']
const SCRIBE_SUPPORTED_DEEP = ['scribe-gmail', 'scribe-salesloft', 'scribe-outreach-mui']

const generalContentScripts = [
  {
    matches: ['*://*.leadiq.com/*'],
    js: ['meta/content-scripts/leadiq-install-status.js'],
    runAt: 'document_end',
    allFrames: true,
    id: 'leadiq-install-status'
  },
]

const prospectorContentScripts = [
  {
    matches: ['*://*.leadiq.com/extension/*'],
    js: ['prospector/content-scripts/leadiq-ext-helper.js'],
    runAt: 'document_end',
    id: 'prospector-leadiq-ext-helper'
  },
  {
    matches: ['*://*.linkedin.com/*'],
    js: ['prospector/content-scripts/linkedin-support.js'],
    runAt: 'document_start',
    id: 'prospector-linkedin-support'
  },
  {
    matches: ['*://*.linkedin.com/*'],
    js: ['prospector/content-scripts/linkedin-scroll-detector.js'],
    runAt: 'document_start',
    id: 'prospector-linkedin-scroll-detector'
  },
  {
    matches: ['*://*.outreach.io/*'],
    js: ['prospector/content-scripts/send-dom-state.js', 'prospector/content-scripts/outreach-support.js'],
    id: 'prospector-outreach-support'
  },
  {
    matches: ['*://*.force.com/*'],
    js: ['prospector/content-scripts/salesforce-support.js'],
    id: 'prospector-salesforce-support'
  },
  {
    matches: ['*://*.hubspot.com/*'],
    js: ['prospector/content-scripts/send-dom-state.js', 'prospector/content-scripts/hubspot-support.js'],
    id: 'prospector-hubspot-support'
  },
  {
    matches: ['*://*.salesloft.com/*'],
    js: ['prospector/content-scripts/send-dom-state.js', 'prospector/content-scripts/salesloft-support.js'],
    id: 'prospector-salesloft-support'
  },
  {
    matches: ['*://*.gong.io/*'],
    js: ['prospector/content-scripts/send-dom-state.js', 'prospector/content-scripts/gong-support.js'],
    id: 'prospector-gong-support'
  },
  {
    matches: [
      '*://*.linkedin.com/*',
      '*://*.outreach.io/*',
      '*://*.force.com/*',
      '*://*.hubspot.com/*',
      '*://*.salesloft.com/*',
      '*://*.gong.io/*'
    ],
    js: ['prospector/content-scripts/last-focused-tab.js'],
    id: 'prospector-last-focused-tab'
  }
]

const scribeContentScripts = [
  {
    matches: ['*://*.leadiq.com/*'],
    js: [
      'scribe/content-scripts/shared.js',
      'scribe/content-scripts/channel.js'
    ],
    runAt: 'document_start',
    allFrames: true,
    id: 'scribe-leadiq'
  },
  {
    matches: ['*://*.linkedin.com/*'],
    js: [
      'scribe/content-scripts/shared.js',
      'scribe/content-scripts/linkedin.js'
    ],
    id: 'scribe-linkedin'
  },
  {
    matches: ['*://mail.google.com/*'],
    js: [
      'scribe/content-scripts/shared.js',
      'scribe/content-scripts/gmail.js'
    ],
    id: 'scribe-gmail'
  },
  {
    matches: ['*://app.salesloft.com/*'],
    js: [
      'scribe/content-scripts/shared.js',
      'scribe/content-scripts/salesloft.js'
    ],
    id: 'scribe-salesloft'
  },
  {
    matches: ['*://sidebar.outreach.io/*', '*://web.outreach.io/*'],
    js: [
      'scribe/content-scripts/shared.js',
      'scribe/content-scripts/outreach-mui.js'
    ],
    id: 'scribe-outreach-mui'
  },
  {
    matches: [
      '*://*.amplemarket.com/*',
      '*://*.apollo.io/*',
      '*://*.crunchbase.com/*',
      '*://*.gong.io/*',
      '*://*.clari.com/*',
      '*://*.hubspot.com/*',
      '*://*.lemlist.com/*',
      '*://*.mailchimp.com/*',
      '*://*.outplayhq.com/*',
      '*://*.pipedrive.com/*',
      '*://*.reply.io/*',
      '*://*.salesforce.com/*',
      '*://*.force.com/*',
      '*://*.zoominfo.com/*',
      '*://outlook.office.com/*',
      '*://*.mixmax.com/*'
    ],
    js: [
      'scribe/content-scripts/shared.js',
      'meta/content-scripts/leadiq-widget-container.js',
      'scribe/content-scripts/scribe-widget.js',
      'scribe/content-scripts/anywhere.js'
    ],
    css: ['meta/css/leadiq-widget-styles.css'],
    id: 'scribe-anywhere'
  }
]

self.getAllContentScripts = async () => {
  return [
    ...generalContentScripts,
    ...prospectorContentScripts,
    ...(await self.isScribeEnabled()) ? scribeContentScripts : []
  ]
}

// Register content scripts to be automatically injected by Chrome.
// This only affects new page loads, not existing ones.
self.registerScripts = async function () {
  console.info('Registering content scripts')
  const cs = await self.getAllContentScripts()
  await chrome.scripting.registerContentScripts(cs)
}

// Called manually when the user toggles Scribe on
// Not needed on init
self.registerOnlyScribeScripts = async function () {
  console.info('Registering Scribe-only content scripts')
  await chrome.scripting.registerContentScripts(scribeContentScripts)
}

// Called manually when the user toggles Scribe off
// Not needed on init
self.unregisterOnlyScribeScripts = async function () {
  console.info('Unregistering Scribe-only content scripts')
  const scriptIds = scribeContentScripts.map(cs => cs.id)
  await chrome.scripting.unregisterContentScripts({ ids: scriptIds })
}

self.registerScriptsSafeFallback = async function () {
  try {
    await self.registerScripts()
  } catch (e) {
    console.info('Fallback content script registration failed, this is ok')
  }
}

self.getScribeSupportedDomains = () => {
  return scribeContentScripts.flatMap(script => script.matches)
}

function matchesGlobPattern (pattern, url) {
  // Convert glob pattern to regex
  const regexPattern = pattern
    .replace(/\./g, '\\.')  // Escape dots first
    .replace(/\*/g, '.*')   // Then convert * to .*
  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(url)
}

/**
 * Determines the type of Scribe support for a given URL.
 *
 * @param {string} url - The URL to check for Scribe support
 * @returns {'standard'|'deep'|'unsupported'} The type of Scribe support:
 *   - 'standard': Scribe popup/overlay is supported (LinkedIn, various platforms)
 *   - 'deep': Scribe is integrated directly into compose windows (Gmail, Salesloft, Outreach)
 *   - 'unsupported': Scribe is not supported on this site
 */
self.getScribeSupportType = (url) => {
  if (!url) return 'unsupported'

  const standardScripts = scribeContentScripts.filter(script =>
    SCRIBE_SUPPORTED_STANDARD.includes(script.id)
  )
  const standardPatterns = standardScripts.flatMap(script => script.matches)
  if (standardPatterns.some(pattern => matchesGlobPattern(pattern, url))) {
    return 'standard'
  }

  const deepScripts = scribeContentScripts.filter(script =>
    SCRIBE_SUPPORTED_DEEP.includes(script.id)
  )
  const deepPatterns = deepScripts.flatMap(script => script.matches)
  if (deepPatterns.some(pattern => matchesGlobPattern(pattern, url))) {
    return 'deep'
  }

  return 'unsupported'
}

// Injects content scripts into existing tabs, skipping tabs where
// content scripts are already connected. Safe to call on every worker
// wake-up, install, and update.
self.injectContentScriptsManually = async function () {
  console.info('Checking if tabs need to be (re-)injected')
  const allMatches = (await self.getAllContentScripts()).flatMap(cs => cs.matches)
  const tabs = await chrome.tabs.query({ url: [...new Set(allMatches)] })
  const tabsToInject = new Set()

  // A tab may match multiple content script definitions, so we ping once
  // per tab upfront to avoid redundant checks in the injection loop below
  for (const tab of tabs) {
    if (tab.discarded) continue
    if (!(await isContentScriptAlive(tab.id))) {
      tabsToInject.add(tab.id)
      console.warn(`Content script re-injection needed for tab ${tab.id} (${tab.url})`)
    }
  }

  if (!tabsToInject.size) return

  for (const cs of await self.getAllContentScripts()) {
    for (const tab of await chrome.tabs.query({ url: cs.matches })) {
      if (!tabsToInject.has(tab.id)) continue
      try {
        if (cs.js?.length) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: cs.allFrames },
            files: cs.js
          })
        }
        if (cs.css?.length) {
          chrome.scripting.insertCSS({
            target: { tabId: tab.id, allFrames: cs.allFrames },
            files: cs.css
          })
        }
      } catch (e) {
        console.error('Failed to inject content script into tab', tab.id, e)
      }
    }
  }
}

// sendMessage resolves if ANY onMessage listener is registered on the tab,
// even without a PING handler. It rejects only if no listener exists at all.
// This works because every supported domain has at least one content script
// with chrome.runtime.onMessage.addListener. If a new domain is added
// without such a listener, this check will incorrectly report it as dead.
async function isContentScriptAlive (tabId) {
  try {
    await chrome.tabs.sendMessage(tabId, {})
    return true
  } catch {
    return false
  }
}
