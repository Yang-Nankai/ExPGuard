const [
  container, { close, scribe }] = window.createBoundaryComponent(`
  <link href="${chrome.runtime.getURL('scribe/content-scripts/shared.css')}" rel="stylesheet">
  <link href="${chrome.runtime.getURL('scribe/content-scripts/linkedin.css')}" rel="stylesheet">
  <div id="header"><img src="${chrome.runtime.getURL('scribe/images/leadiq-header.svg')}"><h1>Scribe</h1>
  <img id="close" src="${chrome.runtime.getURL('scribe/images/minus.svg')}"></div>
  <iframe id="scribe" src="about:blank" allow="clipboard-read; clipboard-write *"></iframe>
`)

const scribeIframeUrl = window.getIframeURL('linkedin').href

scribe.addEventListener('load', () => {
  if (scribe.src === scribeIframeUrl) {
    window.sendRelayMessage({
      type: 'SCRIBE_LEAD',
      payload: window.location.href
    })
  }
})

close.addEventListener('click', () => {
  container.classList.remove('visible')
  chrome.runtime.sendMessage({ type: 'SCRIBE_SHOW_WIDGET' })
  hidePopup()
})

function showPopup () {
  if (scribe.src !== scribeIframeUrl) {
    scribe.src = scribeIframeUrl
  } else {
    window.sendRelayMessage({
      type: 'SCRIBE_LEAD',
      payload: window.location.href
    })
  }
  container.classList.add('visible')
}

function hidePopup () {
  container.classList.remove('visible')
}

function isPopupOpen () {
  return container.classList.contains('visible')
}

// handle incoming messages from background script
chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'SCRIBE_SHOW_POPUP':
      showPopup()
      break
    case 'SCRIBE_TAB_UPDATE':
      if (isPopupOpen()) {
        window.sendRelayMessage({
          type: 'SCRIBE_LEAD',
          payload: message.url
        })
      }
  }
})

document.body.appendChild(container)
