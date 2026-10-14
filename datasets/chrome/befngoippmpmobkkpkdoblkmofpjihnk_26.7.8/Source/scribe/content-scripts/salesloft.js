const [container, { close, scribe }] = window.createBoundaryComponent(`
  <link href="${chrome.runtime.getURL('scribe/content-scripts/shared.css')}" rel="stylesheet">
  <link href="${chrome.runtime.getURL('scribe/content-scripts/salesloft.css')}" rel="stylesheet">
  <div id="header"><img src="${chrome.runtime.getURL('scribe/images/leadiq-header.svg')}"><h1>Scribe</h1>
  <img id="close" src="${chrome.runtime.getURL('scribe/images/minus.svg')}"></div>
  <iframe id="scribe" src="about:blank" allow="clipboard-read; clipboard-write *"></iframe>
`)

const scribeIframeUrl = window.getIframeURL('salesloft').href

scribe.addEventListener('load', () => {
  if (scribe.src === scribeIframeUrl) {
    window.useElementByQueryWithTransform(
      queries.to,
      matches => matches.map(getEmail),
      postTo
    )
  }
})

const queries = {
  editorRoot: '#email_pane_root',
  get trigger () {
    return `${this.editorRoot} .tox-edit-area`
  },
  get subject () {
    return `${this.editorRoot} input[name=subject]`
  },
  get to () {
    return `${this.editorRoot} input[name=personEmail]`
  },
  get body () {
    return `${this.editorRoot} iframe.tox-edit-area__iframe`
  }
}

window.checkPasteTargetExistenceAndLog('salesloft', queries)

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

  const raw = ele.tagName === 'INPUT' ? ele.value : ele.innerText
  const [, email] = raw.match(/<([^>]+)>/)
  return email
}

function hideContainer () {
  container.classList.remove('visible')
}

function toggleContainer () {
  return container.classList.toggle('visible')
}

const positionContainer = window.withMemo((anchor) => {
  const { left } = anchor.getBoundingClientRect()
  container.style.left = `${left}px`
})

// trigger
window.useElementByQuery(
  queries.trigger,
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
        storageKey: 'scribeIconSalesloftCoords',
        beforeMouseDown () {
          const body = document.querySelector(queries.body)
          body && body.style.setProperty('pointer-events', 'none')
        },
        beforeMouseUp () {
          const body = document.querySelector(queries.body)
          body && body.style.setProperty('pointer-events', 'auto')
        }
      })
    }
  }
)

// to
window.useElementByQueryWithTransform(
  queries.to,
  m => m.map(getEmail),
  next => {
    trigger.classList[next ? 'remove' : 'add']('disabled')
  })

// subject
window.useElementByQuery(queries.subject, (next) => {
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
  if (!next) {
    return
  }

  const updateElement = message => {
    if (!next.isConnected) {
      return chrome.runtime.onMessage.removeListener(updateElement)
    }
    const { type, payload } = message
    if (type === 'PASTE' && payload.target === 'body') {
      // double up newlines to work around salesloft copy paste behaviour
      const formatted = payload.value.replaceAll('\n', '\n\n')

      const target = next.contentWindow &&
        next.contentWindow.document &&
        next.contentWindow.document.body

      target.focus()
      window.paste(target, formatted)
    }
  }

  chrome.runtime.onMessage.addListener(updateElement)
})

window.addEventListener('resize', () => setTimeout(positionContainer, 0))

document.body.appendChild(container)
