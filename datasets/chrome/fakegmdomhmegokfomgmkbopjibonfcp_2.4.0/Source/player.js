//
// The player script observes the contents of the page for media elements to
// remotely control. Information regarding the media is sent to the host
// application to determine how playback should be handled. Certain playback
// events are also sent to the page such as play, pause, seek, and volume.
//

;(function() {
  if (globalThis.__metastreamPlayer) {
    console.debug('Metastream player isolated world script injected twice')
    return
  }
  globalThis.__metastreamPlayer = true

  const METASTREAM_APP_URL = 'https://app.getmetastream.com'
  const METASTREAM_ORIGINS = new Set([
    METASTREAM_APP_URL,
    'http://local.getmetastream.com',
    'https://local.getmetastream.com',
    'http://localhost:8080',
    'https://localhost:8080'
  ])
  const isMetastreamUrl = url => {
    try {
      return METASTREAM_ORIGINS.has(new URL(url).origin)
    } catch {
      return false
    }
  }
  if (isMetastreamUrl(location.href)) return
  
  const log = (...args) => {
    console.log(...args)
    window.postMessage({
      type: 'metastream-webview-event',
      payload: { type: 'log', payload: JSON.parse(JSON.stringify(args)) }
    })
  }
  
  log(`Metastream player content script ${location.href}`)

  //=============================================================================
  // Setup communications between content script and background script.
  //=============================================================================

  // Listen for events from the main world to forward to the
  // background process
  const eventMiddleware = event => {
    if (event.origin !== location.origin) return
    const { data: action } = event
    if (typeof action !== 'object' || typeof action.type !== 'string') return
    if (action.type.startsWith('metastream-')) {
      // Send to background script
      chrome.runtime.sendMessage(action)
    }
  }
  window.addEventListener('message', eventMiddleware)

  // Forward host events to main world
  chrome.runtime.onMessage.addListener(action => {
    if (typeof action !== 'object' || typeof action.type !== 'string') return
    const origin = location.origin
    if (action.type === 'metastream-host-event' && origin !== 'null') {
      window.postMessage(action.payload, origin)
      return
    }
  })

  //=============================================================================
  // Improve visuals of image or video pages
  //=============================================================================

  const body = document.body

  function enhanceVideo(video) {
    Object.assign(video, {
      loop: false,
      controls: false
    })

    Object.assign(video.style, {
      minWidth: '100%',
      minHeight: '100%'
    })
  }

  function enhanceImage(image) {
    const { src } = image

    // Assume extension is correct because we can't get the MIME type
    const isGif = src.endsWith('gif')

    Object.assign(image.style, {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      background: null,
      cursor: null,
      webkitUserDrag: 'none'
    })

    // Create new image which doesn't inherit any default zoom behavior
    const img = image.cloneNode(true)
    body.replaceChild(img, image)

    if (!isGif) {
      let bg = document.createElement('div')
      Object.assign(bg.style, {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '-1',
        filter: 'blur(20px) brightness(0.66)',
        transform: 'scale(1.2)'
      })
      body.insertBefore(bg, body.firstChild)
    }
  }

  if (body && body.childElementCount === 1) {
    const video = document.querySelector('body > video[autoplay]')
    if (video) {
      enhanceVideo(video)
    }

    const image = document.querySelector('body > img')
    if (image) {
      enhanceImage(image)
    }
  }
})()

// Don't serialize result
void 0
