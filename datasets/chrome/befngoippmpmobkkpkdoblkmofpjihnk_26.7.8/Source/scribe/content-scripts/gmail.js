const [container, { close, scribe }] = window.createBoundaryComponent(`
  <link href="${chrome.runtime.getURL('scribe/content-scripts/shared.css')}" rel="stylesheet">
  <link href="${chrome.runtime.getURL('scribe/content-scripts/gmail.css')}" rel="stylesheet">
  <div id="header"><img src="${chrome.runtime.getURL('scribe/images/leadiq-header.svg')}"><h1>Scribe</h1>
  <img id="close" src="${chrome.runtime.getURL('scribe/images/minus.svg')}"></div>
  <iframe id="scribe" src="about:blank" allow="clipboard-read; clipboard-write *"></iframe>
`)

const scribeIframeUrl = window.getIframeURL('gmail').href

scribe.addEventListener('load', () => {
  if (scribe.src === scribeIframeUrl) {
    useEmail(postTo)
  }
})

const queries = {
  wrap: '.AD [role="dialog"]',
  body: '[aria-label="Message Body"][contenteditable]',
  subject: '[name="subjectbox"]',
  get to () {
    return this.wrap + ' span[email]'
  }
}

window.checkPasteTargetExistenceAndLog('gmail', queries)

const symbols = {
  cancel: Symbol('cancel'),
  stopDraggable: Symbol('stopDraggable')
}

close.addEventListener('click', () => {
  trigger.classList.remove('active')
  toggleContainer()
})

const trigger = window.createTrigger()

trigger.style.cssText = `
  --position: 0.5;
  bottom: auto;
  top: calc(var(--position) * 100%);
`

trigger.addEventListener('click', () => {
  if (trigger.matches('.disabled:not(.active)')) {
    return
  }

  const visible = toggleContainer()
  if (visible) {
    trigger.classList.add('active')
    positionContainer()
    if (scribe.src !== scribeIframeUrl) {
      scribe.src = scribeIframeUrl
    }
  } else {
    trigger.classList.remove('active')
  }
})

function postTo (email) {
  if (email) {
    window.sendRelayMessage({
      type: 'SCRIBE_LEAD',
      payload: email
    })
  }
}

function getEmail (ele) {
  if (!ele) {
    return
  }

  return ele.getAttribute('email')
}

function hideContainer () {
  container.classList.remove('visible')
}

function toggleContainer () {
  return container.classList.toggle('visible')
}

function useEmail (cb) {
  return window.useElementByQueryWithTransform(queries.to, m => m.map(getEmail), cb)
}

const positionContainer = window.withMemo((anchor) => {
  if (!anchor) return

  const { left } = anchor.getBoundingClientRect()
  container.style.left = `${left}px`
})

// wrap
window.useElementByQueryWithTransform(
  queries.wrap,
  m => m.filter(e => e.offsetParent),
  async (next, prev) => {
    if (prev) {
      hideContainer()
      trigger[symbols.stopDraggable] && trigger[symbols.stopDraggable]()
      trigger.remove()
    }

    if (next) {
      positionContainer(next)
      next.appendChild(trigger)

      trigger[symbols.stopDraggable] = await window.makeDraggable(trigger, {
        container: next,
        storageKey: 'scribeIconGmailCoords'
      })
    }
  }
)

// to
useEmail(email => trigger.classList[email ? 'remove' : 'add']('disabled'))

// subject
window.useElementByName('subjectbox', (next) => {
  const updateElement = (message) => {
    if (!next.isConnected) {
      return chrome.runtime.onMessage.removeListener(updateElement)
    }
    const { type, payload } = message
    if (type === 'PASTE' && payload.target === 'subject') {
      window.paste(next, payload.value)
    }
  }

  chrome.runtime.onMessage.addListener(updateElement)
})

// body
window.useElementByQuery(queries.body, (next) => {
  const updateElement = (message) => {
    if (!next.isConnected) {
      return chrome.runtime.onMessage.removeListener(updateElement)
    }
    const { type, payload } = message
    if (type === 'PASTE' && payload.target === 'body') {
      next.focus()
      window.paste(next, payload.value)
    }
  }

  chrome.runtime.onMessage.addListener(updateElement)
})

window.addEventListener('resize', () => setTimeout(positionContainer, 0))

document.body.appendChild(container)
