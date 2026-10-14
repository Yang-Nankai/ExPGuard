const [container, { close, scribe }] = window.createBoundaryComponent(`
  <link href="${chrome.runtime.getURL('scribe/content-scripts/shared.css')}" rel="stylesheet">
  <link href="${chrome.runtime.getURL('scribe/content-scripts/anywhere.css')}" rel="stylesheet">
  <div id="header"><img src="${chrome.runtime.getURL('scribe/images/leadiq-header.svg')}"><h1>Scribe</h1>
  <img id="close" src="${chrome.runtime.getURL('scribe/images/minus.svg')}"></div>
  <iframe id="scribe" src="about:blank" allow="clipboard-read; clipboard-write *"></iframe>
`)

const scribeIframeUrl = window.getIframeURL('anywhere').href

close.addEventListener('click', () => {
  container.classList.remove('visible')
  chrome.runtime.sendMessage({ type: 'SCRIBE_SHOW_WIDGET' })
  hidePopup()
})

function showPopup () {
  if (scribe.src !== scribeIframeUrl) {
    scribe.src = scribeIframeUrl
  }
  container.classList.add('visible')
}

function hidePopup () {
  container.classList.remove('visible')
}

// handle incoming messages from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SCRIBE_SHOW_POPUP') {
    showPopup()
  }
})

document.body.appendChild(container)
