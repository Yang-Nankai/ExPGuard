const [container, { close, scribe }] = window.createBoundaryComponent(`
  <link href="${chrome.runtime.getURL('scribe/content-scripts/shared.css')}" rel="stylesheet">
  <link href="${chrome.runtime.getURL('scribe/content-scripts/outreach.css')}" rel="stylesheet">
  <div id="header"><img src="${chrome.runtime.getURL('scribe/images/leadiq-header.svg')}"><h1>Scribe</h1>
  <img id="close" src="${chrome.runtime.getURL('scribe/images/minus.svg')}"></div>
  <iframe id="scribe" src="about:blank" allow="clipboard-read; clipboard-write *"></iframe>
`)

const app = document.querySelector('#app')

const scribeIframeUrl = window.getIframeURL('outreach').href

scribe.addEventListener('load', () => {
  if (scribe.src === scribeIframeUrl) {
    window.useElementByQuery(queries.to, postTo)
  }
})

const queries = {
  body: ':has(> * > [aria-label="Rich text editor"][contenteditable="true"])',
  to: '[aria-label="To recipient autocomplete"]',
  subject: '#compose-subject'
}

window.checkPasteTargetExistenceAndLog('outreach-mui', queries)

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
  if (trigger.matches('.disabled:not(.active)')) return

  const visible = toggleContainer()

  if (visible) {
    trigger.classList.add('active')
    if (scribe.src !== scribeIframeUrl) {
      scribe.src = scribeIframeUrl
    }
  } else {
    trigger.classList.remove('active')
  }
})

function postTo (to) {
  const email = getEmail(to)

  if (email) {
    window.sendRelayMessage({
      type: 'SCRIBE_LEAD',
      payload: email
    })
  }
}

function getEmail (ele) {
  return ele && ele.innerText && ele.innerText.split('\n').filter(window.isEmail).shift()
}

function hideContainer () {
  app.style.width = ''
  container.style.display = 'none'
}

function showContainer () {
  app.style.width = 'calc(100% - 360px)'
  container.style.display = 'flex'
}

function toggleContainer () {
  const hidden = app.style.width === ''
  hidden ? showContainer() : hideContainer()

  return hidden
}

// observer for email address UI changes. Enable/disable widget and post updates to our app.
const emailObserver = new MutationObserver((mutations) => {
  mutations.find(mutation => {
    const email = getEmail(mutation.target)

    trigger.classList[email ? 'remove' : 'add']('disabled')

    if (email) {
      postTo(mutation.target)
      return true
    }

    return false
  })
})

// to
window.useElementByQuery(queries.to, next => {
  if (!next) return

  emailObserver.observe(next, {
    subtree: true,
    childList: true
  })

  trigger.classList[getEmail(next) ? 'remove' : 'add']('disabled')
})

// subject
window.useElementByQuery(queries.subject, (next) => {
  const updateElement = (message) => {
    if (next && !next.isConnected) {
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
window.useElementByQuery(queries.body, async (next, prev) => {
  const updateElement = (message) => {
    if (next && !next.isConnected) {
      return chrome.runtime.onMessage.removeListener(updateElement)
    }
    const { type, payload } = message
    if (type === 'PASTE' && payload.target === 'body') {
      const mailTextBox = next.querySelector('[role="textbox"]')
      mailTextBox.focus()
      window.paste(mailTextBox, payload.value)
    }
  }

  if (prev) {
    prev.parentElement.parentElement.style.position = ''
    trigger[symbols.stopDraggable] && trigger[symbols.stopDraggable]()
    trigger.remove()
  }

  if (next) {
    next.parentElement.parentElement.style.position = 'relative'
    next.appendChild(trigger)
    chrome.runtime.onMessage.addListener(updateElement)

    trigger[symbols.stopDraggable] = await window.makeDraggable(trigger, {
      container: next.parentElement.parentElement,
      storageKey: 'scribeIconOutreachCoords'
    })
  }
})

document.body.prepend(container)

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    Object.assign(app.style, {
      background: 'inherit',
      boxShadow: '-20px 0px 15px 15px #000',
      position: 'relative'
    })
  }
})
