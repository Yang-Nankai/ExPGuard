(function () {
// This shared component is responsible for creating and tracking DOM
// elements. That's convenient because now we have a single place where
// we can clean up in the event that this content script becomes orphaned.
// Keep a reference to all created DOM elements so we can remove them later.
  const rafCancelFunctions = []
  const domHosts = []

  const orphanCheckInterval = setInterval(cleanUpIfOrphaned, 5000)

  function interval (cb) {
    const fps = 1
    const frameTime = 1000 / fps

    let id
    let lastRun

    const tick = (time) => {
      id = requestAnimationFrame(tick)

      if ((time - lastRun) < frameTime) {
        return
      }

      lastRun = time
      cb()
    }

    id = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(id)
  }

  function trackElement (getElement, cb) {
    let lastElement

    const cancelFn = interval(() => {
      const element = getElement()
      if (element !== lastElement) {
        cb(element, lastElement)
        lastElement = element
      }
    })

    rafCancelFunctions.push(cancelFn)
    return cancelFn
  }

  window.createTrigger = function () {
    const [trigger] = window.createBoundaryComponent(`
    <link href="${chrome.runtime.getURL('scribe/content-scripts/trigger.css')}" rel="stylesheet">
    <div>
      <img src="${chrome.runtime.getURL('scribe/images/scribe.svg')}" draggable="false">
    </div>
  `)

    trigger.classList.add('disabled')

    return trigger
  }

  window.getIframeURL = function (source) {
  // URL is replaced at build time
    const url = new URL(chrome.runtime.getURL('scribe/frame-proxy.html'))
    url.searchParams.append('source', source)

    return url
  }

  window.paste = function (target, data) {
    const dataType = 'text/plain'

    switch (target.tagName) {
      case 'BODY':
      case 'DIV': {
        if (!target.getAttribute('contenteditable')) {
          return
        }

        const clipboardData = new DataTransfer()
        clipboardData.setData(dataType, data)

        target.dispatchEvent(
          new ClipboardEvent('paste', {
            clipboardData,
            data,
            dataType,
            bubbles: true
          })
        )

        break
      }

      case 'INPUT':
      case 'TEXTAREA':
        target.value += data

        target.dispatchEvent(
          new InputEvent('change', {
            bubbles: true
          })
        )

        break

      default:
        break
    }
  }

  window.sendRelayMessage = function (message) {
    if (cleanUpIfOrphaned()) return

    chrome.runtime.sendMessage({
      relay: true,
      payload: message
    })
  }

  window.useElementByName = function (name, cb) {
    const liveCollection = document.getElementsByName(name)
    return trackElement(() => liveCollection[0], cb)
  }

  window.useElementByClassname = function (classname, cb) {
    const liveCollection = document.getElementsByClassName(classname)
    return trackElement(() => liveCollection[0], cb)
  }

  window.useElementByQuery = function (query, cb) {
    return trackElement(() => document.querySelector(query) || undefined, cb)
  }

  window.useElementByQueryWithTransform = function (query, transform, cb) {
    return trackElement(() => transform(Array.from(document.querySelectorAll(query))).shift() || undefined, cb)
  }

  window.useElementByAttributeValue = function (attribute, value, cb) {
    return window.useElementByQuery(`[${attribute}="${value}"]`, cb)
  }

  window.createBoundaryComponent = function (html) {
    const host = document.createElement('div')
    domHosts.push(host)
    const shadow = host.attachShadow({ mode: 'closed' })
    shadow.innerHTML = html

    const refs = Object.fromEntries(
      Array.from(shadow.querySelectorAll('[id]'))
        .map(e => [e.getAttribute('id'), e])
    )

    return [host, refs]
  }

  window.isEmail = function (text) {
  // very lax, but sufficient
    return /[^@]+@[^@]+/.test(text)
  }

  // remember the last valid arg the function was called with and calls it with
  // that arg value if it is called with no args
  window.withMemo = function (fn) {
    let lastArg

    return function (arg) {
      const currArg = arg || lastArg
      lastArg = currArg
      return fn(lastArg)
    }
  }

  function cleanUpIfOrphaned () {
    if (chrome.runtime.id === undefined) {
      console.info('Script orphaned, cleaning up Scribe shared')
      clearInterval(orphanCheckInterval)
      rafCancelFunctions.forEach(cancelFn => cancelFn())
      domHosts.forEach(host => host.remove())
      // Let the GC do its thing to clean up event listeners
      rafCancelFunctions.length = 0
      domHosts.length = 0
      return true
    }
  }

  window.makeDraggable = async function (element, options) {
    let clickY = 0
    let delta = 0
    let didDrag = false
    let offset = 0
    const dragTreshold = 10

    const container = options.container || window
    const dragHandleElement = options.dragHandleElement || element
    const beforeMouseDown = options.beforeMouseDown || (() => {})
    const beforeMouseUp = options.beforeMouseUp || (() => {})

    const { position } = await chrome.storage.local.get(options.storageKey).then(v => v[options.storageKey] || {})
    if (Number(position) === position) {
      element.style.setProperty('--position', position)
    }

    let containerHeight = getContainerHeight()
    let containerTop = getContainerTop()
    const resizeObserver = getResizeObserver()

    function getContainerHeight () {
      return container === window
        ? window.innerHeight
        : container.getBoundingClientRect().height
    }

    function getContainerTop () {
      return container === window
        ? 0
        : container.getBoundingClientRect().top
    }

    function getPosition (y) {
      const current = y - delta
      const max = containerHeight - offset
      const min = offset
      const clipped = Math.min(Math.max(min, current), max)

      return (clipped - min) / (max - min)
    }

    function getResizeObserver () {
      if (container === window) {
        window.addEventListener('resize', onResize)
        return {
          disconnect () {
            window.removeEventListener('resize', onResize)
          }
        }
      }

      const resizeObserver = new ResizeObserver(onResize)
      resizeObserver.observe(container)
      return resizeObserver
    }

    function preventClickOnce (e) {
      e.stopPropagation()
      element.removeEventListener('click', preventClickOnce, true)
    }

    function onMove (e) {
      if (Math.abs(e.clientY - clickY) > dragTreshold || didDrag) {
        didDrag = true
        element.style.setProperty('--position', getPosition(e.clientY - containerTop))
      }
    }

    function onMouseDown (e) {
      beforeMouseDown()

      const { height, top } = element.getBoundingClientRect()
      const centerY = top + height / 2
      clickY = e.clientY
      delta = e.clientY - centerY
      offset = height / 2

      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('mousemove', onMove)
    }

    function onMouseUp () {
      beforeMouseUp()

      window.removeEventListener('mousemove', onMouseUp)
      window.removeEventListener('mousemove', onMove)
      chrome.storage.local.set({
        [options.storageKey]: {
          position: Number(element.style.getPropertyValue('--position'))
        }
      })

      if (didDrag) {
        element.addEventListener('click', preventClickOnce, true)
      }

      didDrag = false
    }

    function onResize () {
      containerHeight = getContainerHeight()
      containerTop = getContainerTop()
    }

    dragHandleElement.addEventListener('mousedown', onMouseDown)

    return function unmake () {
      dragHandleElement.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseUp)
      window.removeEventListener('mousemove', onMove, true)
      resizeObserver.disconnect()
    }
  }

  // checks existence of target DOM elements on paste event and report if something not found
  window.checkPasteTargetExistenceAndLog = function (source, queries) {
    chrome.runtime.onMessage.addListener(checkElements)

    function checkElements (message) {
      if (message.type !== 'PASTE') return

      const doesNotExistInDom = selector => !document.querySelector(selector)
      const someDoesNotExist = Object.values(queries).some(doesNotExistInDom)

      if (someDoesNotExist) {
        window.sendRelayMessage({
          type: 'LOGGING',
          payload: {
            source,
            message: '[SCR] Some host target elements are not found'
          }
        })
      }

      chrome.runtime.onMessage.removeListener(checkElements)
    }
  }
})()
