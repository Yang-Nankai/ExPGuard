const metaTags = [
  { name: 'leadiq-chrome-extension', content: 'installed' },
  { name: 'leadiq-chrome-extension-id', content: chrome.runtime.id },
  { name: 'leadiq-chrome-extension-version', content: chrome.runtime.getManifest().version },
  { name: 'leadiq-supports-scribe-external-open', content: 'true' }
]

// We actually do not want to clean up any other LeadIQ meta tags before
// injecting these. That's because we want to allow the web app and CX
// to detect if multiple editions (beta and stable) are installed.

metaTags.forEach(({ name, content }) => {
  const meta = document.createElement('meta')
  meta.setAttribute('name', name)
  meta.setAttribute('content', content)
  document.getElementsByTagName('head')[0].appendChild(meta)
})
