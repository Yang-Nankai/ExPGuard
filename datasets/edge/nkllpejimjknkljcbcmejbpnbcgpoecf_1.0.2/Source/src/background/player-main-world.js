//
// Player main world script
// This script runs in the page's main world to control media playback
//

;(function() {
  // Hold refs which could be overwritten
  const debug = console.debug || console.log

  // Injected by syncfun
  debug(`syncfun main world script ${location.href}`)

  // Hide opener when syncfun opens media in a popup.
  // Prevents pages from redirecting app.syncfun.com, but still allows
  // for app.syncfun.com to control the popup.
  let opener
  if (window.opener) {
    opener = window.opener
    Object.defineProperty(window, 'opener', { value: { location: {} } })
    window.close = () => {} // you won't
  }

  //===========================================================================
  // Globals
  //===========================================================================

  function debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this,
        args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  function throttle(func, wait, options) {
    var context, args, result
    var timeout = null
    var previous = 0
    if (!options) options = {}
    var later = function() {
      previous = options.leading === false ? 0 : Date.now()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
    return function() {
      var now = Date.now()
      if (!previous && options.leading === false) previous = now
      var remaining = wait - (now - previous)
      context = this
      args = arguments
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
      return result
    }
  }

  /** https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState */
  const MediaReadyState = {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4
  }

  const PlaybackState = {
    Idle: 0,
    Playing: 1,
    Paused: 2
  }

  const SEC2MS = 1000
  const MS2SEC = 1 / 1000

  const noop = () => {}

  // List of potential media to synchronize
  const mediaList = new Set()

  // Previously synchronized media which we recently switched from
  const mediaCooldownList = new Set()

  let player
  let activeMedia, activeFrame
  let isInInteractMode = false

  const hasActiveMedia = () => Boolean(activeMedia || activeFrame)

  let playerSettings = {
    theaterMode: false,
    mediaSessionProxy: true,
    syncOnBuffer: false,
    seekThreshold: 100 /** Threshold before we'll seek. */,
    theaterModeSelectors: [
      '#vilosCanvas', // crunchyroll
      '#velocity-canvas', // crunchyroll
      '.libassjs-canvas', // vrv
      '.player-timedtext', // netflix
      '.ytp-caption-segment' // youtube
    ]
  }

  //===========================================================================
  // Communicate between main world and content script's isolated world.
  //===========================================================================

  // Dispatch event
  // main world -> content script world -> background -> syncfun content script -> syncfun app
  const dispatchMediaEvent = action => {
    window.postMessage({
      type: 'syncfun-webview-event',
      payload: { type: 'message', payload: action }
    })
  }

  const eventMiddleware = event => {
    const { data: action } = event
    if (typeof action !== 'object' || typeof action.type !== 'string') return

    debug(`[syncfun Remote] Received player event`, action)

    switch (action.type) {
      case 'set-interact': {
        setInteractMode(!!action.payload)
        break
      }
    }

    if (!player) return

    switch (action.type) {
      case 'set-media-playback': {
        if (action.payload === PlaybackState.Playing) {
          player.play(true) // programmatic = true
        } else if (action.payload === PlaybackState.Paused) {
          player.pause(true) // programmatic = true
        }
        break
      }
      case 'seek-media':
        player.seek(action.payload, true) // programmatic = true
        break
      case 'set-media-volume':
        player.setVolume(action.payload)
        break
      case 'set-media-playback-rate':
        player.setPlaybackRate(action.payload, true) // programmatic = true
        break
    }
  }
  window.addEventListener('message', eventMiddleware)

  const setInteractMode = enable => {
    isInInteractMode = enable
    setTheaterMode(playerSettings.theaterMode && !enable)
  }

  //===========================================================================
  // Media Session proxy
  //===========================================================================

  const { mediaSession } = window.navigator

  const MediaMetadata = window.MediaMetadata || Object
  window.MediaMetadata = class MetastreamMediaMetadata extends MediaMetadata {
    constructor(metadata) {
      super(metadata)
      this._raw = metadata
    }
  }

  class MediaSessionProxy {
    constructor() {
      // inherit proxy fields from first.js
      this._metadata = null
      this._handlers = (mediaSession && { ...mediaSession._handlers }) || {}
    }

    get metadata() {
      return this._metadata
    }

    set metadata(metadata) {
      debug('MediaSession.metadata', metadata)
      this._metadata = metadata
      dispatchMediaEvent({
        type: 'media-metadata-change',
        payload: metadata ? metadata._raw : undefined
      })
    }

    validateHandlers() {
      const { play, pause } = this._handlers

      // sync needs to be able to set the playback state accurately.
      // Some websites use the same handler for both play and pause which
      // causes them to toggle.
      if (typeof play === 'function' && typeof pause === 'function') {
        // HACK: check whether function definitions are the same.
        const playStr = play.toString()
        const pauseStr = pause.toString()
        if (play === pause || (!playStr.includes('[native code]') && playStr === pauseStr)) {
          delete this._handlers.play
          delete this._handlers.pause
        }
      }
    }

    setActionHandler(name, handler) {
      const noopStr = (function(){}).toString() // prettier-ignore
      if (typeof handler !== 'function' || handler.toString() === noopStr) {
        return // ignore noop handlers (seen on tunein.com)
      }
      debug(`MediaSession.setActionHandler '${name}'`)
      this._handlers[name] = handler
      this.validateHandlers()
    }

    execActionHandler(name, ...args) {
      if (!playerSettings.mediaSessionProxy) return false
      if (this._handlers.hasOwnProperty(name)) {
        debug(`MediaSession.execActionHandler '${name}'`, ...args)
        this._handlers[name](...args)
        return true
      }
      return false
    }
  }

  const mediaSessionProxy = new MediaSessionProxy()
  Object.defineProperty(window.navigator, 'mediaSession', {
    value: mediaSessionProxy,
    enumerable: false,
    writable: true
  })
  debug('Overwrote navigator.mediaSession')

  //===========================================================================
  // HTMLMediaPlayer class for active media element.
  //===========================================================================

  const MIN_DURATION = 1
  const MAX_DURATION = 60 * 60 * 20 * SEC2MS
  const isValidDuration = duration =>
    typeof duration === 'number' &&
    !isNaN(duration) &&
    duration < MAX_DURATION &&
    duration > MIN_DURATION

  /** Abstraction around HTML video tag. */
  class HTMLMediaPlayer {
    constructor(media) {
      this.media = media

      this.onPlay = this.onPlay.bind(this)
      this.onPlayError = this.onPlayError.bind(this)
      this.onPause = this.onPause.bind(this)
      this.onEnded = this.onEnded.bind(this)
      this.onSeeked = this.onSeeked.bind(this)
      this.onVolumeChange = this.onVolumeChange.bind(this)
      this.onTimeUpdate = throttle(this.onTimeUpdate.bind(this), 1e3)
      this.onWaiting = this.onWaiting.bind(this)
      this.onDurationChange = debounce(this.onReady.bind(this), 2e3)
      this.onRateChange = this.onRateChange.bind(this)

      this.media.addEventListener('play', this.onPlay, false)
      this.media.addEventListener('pause', this.onPause, false)
      this.media.addEventListener('ended', this.onEnded, false)
      this.media.addEventListener('seeked', this.onSeeked, false)
      this.media.addEventListener('volumechange', this.onVolumeChange, false)
      this.media.addEventListener('timeupdate', this.onTimeUpdate, false)
      this.media.addEventListener('durationchange', this.onDurationChange, false)
      this.media.addEventListener('ratechange', this.onRateChange, false)

      this.onReady()
    }

    destroy() {
      this.media.removeEventListener('play', this.onPlay, false)
      this.media.removeEventListener('pause', this.onPause, false)
      this.media.removeEventListener('ended', this.onEnded, false)
      this.media.removeEventListener('seeked', this.onSeeked, false)
      this.media.removeEventListener('volumechange', this.onVolumeChange, false)
      this.media.removeEventListener('timeupdate', this.onTimeUpdate, false)
      this.media.removeEventListener('durationchange', this.onDurationChange, false)
      this.media.removeEventListener('ratechange', this.onRateChange, false)
      this.stopWaitingListener()
    }

    dispatch(eventName, detail) {
      const e = new CustomEvent(eventName, { detail: detail, cancelable: true, bubbles: false })
      document.dispatchEvent(e)
      return e.defaultPrevented
    }

    play(programmatic = false) {
      if (this.dispatch('syncfunplay')) return
      if (mediaSessionProxy.execActionHandler('play')) return
      this.startWaitingListener()
      this._programmaticPlay = programmatic
      return this.media.play().catch(this.onPlayError)
    }
    pause(programmatic = false) {
      this.stopWaitingListener()
      if (this.dispatch('syncfunpause')) return
      if (mediaSessionProxy.execActionHandler('pause')) return
      this._programmaticPause = programmatic
      this.media.pause()
    }
    getCurrentTime() {
      return this.media.currentTime * SEC2MS
    }
    getDuration() {
      let duration

      if (this.media instanceof HTMLMediaElement) {
        duration = this.media.duration
        if (isValidDuration(duration)) return duration
      }

      // attempt to get duration from global 'player'
      const { player } = window
      if (typeof player === 'object' && typeof player.getDuration === 'function') {
        try {
          duration = player.getDuration()
        } catch (e) {}
        if (isValidDuration(duration)) return duration
      }

      return null
    }
    seek(time, programmatic = false) {
      if (this.dispatch('syncfunseek', time)) return

      if (mediaSessionProxy.execActionHandler('seekto', { seekTime: time, fastSeek: false }))
        return

      // Infinity is generally used for a dynamically allocated media object
      // or live media
      const duration = this.getDuration() * SEC2MS
      if (duration === Infinity || !isValidDuration(duration)) {
        return
      }

      // Only seek if we're off by greater than our threshold
      if (this.timeExceedsThreshold(time)) {
        this._programmaticSeek = programmatic
        this.media.currentTime = time * MS2SEC
      }
    }
    setVolume(volume) {
      // MUST SET THIS FIRST
      this.volume = volume

      this.media.volume = volume

      if (this.media.muted && volume > 0) {
        this.media.muted = false
      }
    }
    setPlaybackRate(playbackRate, programmatic = false) {
      this.playbackRate = playbackRate
      this._programmaticRateChange = programmatic
      this.media.playbackRate = playbackRate
    }

    /** Only seek if we're off by greater than our threshold */
    timeExceedsThreshold(time) {
      const dt = Math.abs(time - this.getCurrentTime())
      return dt > (playerSettings.seekThreshold || 0)
    }

    onReady() {
      const duration = this.getDuration()
      if (duration === this.prevDuration) return

      dispatchMediaEvent({
        type: 'media-ready',
        payload: {
          duration: duration ? duration * SEC2MS : undefined,
          href: location.href
        }
      })

      this.prevDuration = duration
    }

    onPlay(event) {
      // Set volume as soon as playback begins
      if (typeof this.volume === 'number') {
        this.setVolume(this.volume)
      }
      console.log("onPlay isProgrammatic:", this._programmaticPlay)
      const isProgrammatic = this._programmaticPlay
      this._programmaticPlay = false // reset flag
      if (isProgrammatic) {
        return
      }
      this.onPlaybackChange(event, 'playing', undefined, !isProgrammatic)
    }

    onPlayError(err) {
      dispatchMediaEvent({ type: 'media-autoplay-error', payload: { error: err.name } })

      if (err.name === 'NotAllowedError') {
        // Attempt muted autoplay
        this.setVolume(0)
        this.media.play().catch(noop)
      }
    }

    onPause(event) {
      console.log("onPlay isProgrammatic:", this._programmaticPlay)
      const isProgrammatic = this._programmaticPause
      this._programmaticPause = false // reset flag
      if (isProgrammatic) {
        return
      }
      this.onPlaybackChange(event, 'paused', undefined, !isProgrammatic)
    }

    onEnded(event) {
      this.onPlaybackChange(event, 'ended')
    }

    onSeeked(event) {
      const isProgrammatic = this._programmaticSeek
      this._programmaticSeek = false // reset flag
      if (!isProgrammatic) {
        this.onPlaybackChange(event, 'media-seeked', undefined, true)
      }
    }

    onTimeUpdate(event) {
      this.onPlaybackChange(event, 'media-time-update')
    }

    onVolumeChange(event) {
      const { volume } = this.media
      if (event.isTrusted && this.volume !== volume) {
        // dispatchMediaEvent({ type: 'media-volume-change', payload: { value: volume } })
      }
    }

    onPlaybackChange(event, state, playbackRate, isUserAction = true) {
      dispatchMediaEvent({
        type: 'media-playback-change',
        payload: { state: state, time: this.getCurrentTime(), isTrusted: isUserAction, playbackRate: playbackRate }
      })
    }

    onRateChange(event) {
      const { playbackRate } = this.media
      const isProgrammatic = this._programmaticRateChange
      this._programmaticRateChange = false // reset flag
      if (playbackRate !== this.playbackRate) {
        this.onPlaybackChange(event, 'media-playback-rate-change', playbackRate, !isProgrammatic)
        this.playbackRate = playbackRate
      }
    }

    startWaitingListener() {
      if (this._awaitingStart) return
      this.media.addEventListener('waiting', this.onWaiting, false)
    }

    stopWaitingListener() {
      if (this._awaitingStart) this.media.removeEventListener('waiting', this.onWaiting, false)
      if (this._endWaiting) this._endWaiting()
    }

    /** Force start playback on waiting */
    onWaiting(event) {
      if (!playerSettings.syncOnBuffer) return

      if (this._awaitingStart) return
      this._awaitingStart = true

      this.onPlaybackChange(event, 'buffering')

      let timeoutId = null

      const onStarted = () => {
        this.media.removeEventListener('playing', onStarted, false)
        clearTimeout(timeoutId)

        if (this.media.paused) {
          this.media.play().catch(noop)

          // HACK: Clear buffering spinner
          setTimeout(() => {
            if (!this.media.paused) {
              this.media.pause()
              this.media.play().catch(noop)
            }
          }, 1000)
        }

        this._awaitingStart = false
        this._endWaiting = null
      }
      this._endWaiting = onStarted
      this.media.addEventListener('playing', onStarted, false)

      let startTime = this.media.currentTime
      let time = startTime
      let attempt = 1

      const ATTEMPT_INTERVAL = 200
      const tryPlayback = () => {
        debug(
          `Attempting to force start playback [#${attempt++}][networkState=${
            this.media.networkState
          }][readyState=${this.media.readyState}]`
        )
        time += ATTEMPT_INTERVAL * MS2SEC

        const dt = Math.abs(time - startTime)
        if (dt > 1) {
          startTime = time
          this.seek(time * SEC2MS)
        } else {
          this.dispatch('metastreampause') || this.media.pause()
          const playPromise = this.dispatch('metastreamplay') || this.media.play()
          if (playPromise && playPromise.then) playPromise.catch(noop)
        }

        if (this.media.readyState === 4) {
          onStarted()
          return
        }

        timeoutId = setTimeout(tryPlayback, ATTEMPT_INTERVAL)
      }

      const initialDelay = this._hasAttemptedStart ? 200 : 1000
      timeoutId = setTimeout(tryPlayback, initialDelay)
      this._hasAttemptedStart = true
    }
  }

  //===========================================================================
  // Autoplay
  //===========================================================================

  const AUTOPLAY_TIMEOUT = 3000
  let autoplayTimerId

  // Popular enough player that it's worth a try
  const playJwPlayer = () => {
    if (typeof jwplayer === 'function') {
      try {
        const player = jwplayer()
        player.play()
        return true
      } catch (e) {}
    }
  }
  const playVideoJS = () => {
    if (typeof videojs === 'function') {
      try {
        const { players } = videojs
        const playerIds = Object.keys(players)
        playerIds.forEach(id => players[id].play())
        return playerIds.length > 0
      } catch (e) {}
    }
  }
  const pressStart = () => {
    const { start } = window
    if (start instanceof HTMLElement) {
      start.click()
      return true
    }
  }

  // Just maybe we can programmatically trigger playback with a fake click
  const clickPlayButton = () => {
    function descRectArea(a, b) {
      const areaA = a.width * a.height
      const areaB = b.width * b.height
      if (areaA > areaB) return -1
      if (areaA < areaB) return 1
      return 0
    }

    function elementFromCenterRect(rect) {
      return rect.width > 0 && rect.height > 0
        ? document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
        : null
    }

    let playButton

    const videos = Array.from(mediaList).filter(media => media instanceof HTMLVideoElement)
    if (videos.length > 0) {
      const rects = videos.map(video => video.getBoundingClientRect())
      rects.sort(descRectArea)

      // assumes largest video rect is most relevant
      playButton = elementFromCenterRect(rects[0])
    }

    if (!playButton) {
      // sometimes player is accessible via global
      const player = document.getElementById('player')
      if (player instanceof HTMLElement) {
        playButton = elementFromCenterRect(player.getBoundingClientRect())
      }
    }

    if (!playButton) {
      // try center of frame instead
      playButton = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
    }

    // In case we land on an SVG element, keep traversing up
    while (playButton && !(playButton instanceof HTMLElement) && playButton.parentNode) {
      playButton = playButton.parentNode
    }

    if (playButton instanceof HTMLButtonElement || playButton instanceof HTMLDivElement) {
      debug('Attempting autoplay click', playButton)
      playButton.click()
    }
  }

  // Try different methods of initiating playback
  const attemptAutoplay = () => {
    if (hasActiveMedia()) return
    debug(`Attempting autoplay in ${location.origin}`)
    if (playJwPlayer()) return
    if (playVideoJS()) return
    if (pressStart()) return
    clickPlayButton()
  }

  const autoplayOnLoad = () => {
    if (autoplayTimerId) clearTimeout(autoplayTimerId)
    autoplayTimerId = setTimeout(attemptAutoplay, AUTOPLAY_TIMEOUT)
  }
  window.addEventListener('load', autoplayOnLoad)

  //===========================================================================
  // Auto-fullscreen
  //===========================================================================

  let isFullscreen = false
  let fullscreenElement
  let fullscreenContainer
  let fullscreenFrameId
  let origDocumentOverflow
  let prevScale = 1

  function getNormalizedRect(el, rootEl) {
    // Get renderered offsets
    const rect = el.getBoundingClientRect()
    const rootRect = rootEl.getBoundingClientRect()

    // Normalize against transform scale
    const normalize = 1 / prevScale
    const width = rect.width * normalize
    const height = rect.height * normalize
    const left = (rect.left - rootRect.left) * normalize
    const top = (rect.top - rootRect.top) * normalize

    return { width, height, left, top }
  }

  // calculate rect of video contained within video element
  function getVideoRect(video, rootEl) {
    let { width, height, left, top } = getNormalizedRect(video, rootEl)
    let { videoWidth, videoHeight } = video

    const videoContainScale = Math.min(width / videoWidth, height / videoHeight)
    videoWidth *= videoContainScale
    videoHeight *= videoContainScale

    const deltaWidth = width - videoWidth
    const deltaHeight = height - videoHeight

    return {
      width: width - deltaWidth,
      height: height - deltaHeight,
      left: left + deltaWidth / 2,
      top: top + deltaHeight / 2
    }
  }

  // Fit media within viewport
  function renderFullscreen() {
    // Set minimum height for video to scale up to. Otherwise the video may
    // reduce to its minimum height when transformed.
    document.documentElement.style.setProperty('min-height', '100vh', 'important')

    // Always hide document scrollbar while in fullscreen.
    document.body.style.setProperty('overflow', 'hidden', 'important')

    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window
    const { width, height, left, top } =
      fullscreenElement instanceof HTMLVideoElement
        ? getVideoRect(fullscreenElement, fullscreenContainer)
        : getNormalizedRect(fullscreenElement, fullscreenContainer)

    let transform, transformOrigin, scale

    // Approximate whether the video already fills the viewport
    const videoFillsViewport =
      Math.abs(width - viewportWidth) < 20 && Math.abs(height - viewportHeight) < 20

    if (videoFillsViewport) {
      transform = ''
      transformOrigin = ''
      scale = 1
    } else {
      // Set transform origin on video center
      const vidCenterX = left + width / 2
      const vidCenterY = top + height / 2
      transformOrigin = `${vidCenterX}px ${vidCenterY}px`

      // Transform video to center of viewport
      const viewportCenterX = viewportWidth / 2
      const viewportCenterY = viewportHeight / 2
      const offsetX = -1 * (vidCenterX - viewportCenterX)
      const offsetY = -1 * (vidCenterY - viewportCenterY)
      transform = `translate(${offsetX}px, ${offsetY}px)`

      // Scale to fit viewport
      const scaleWidth = viewportWidth / width
      const scaleHeight = viewportHeight / height
      scale = scaleWidth > scaleHeight ? scaleHeight : scaleWidth
      transform += ` scale(${scale})`
    }

    fullscreenContainer.style.transformOrigin = transformOrigin
    fullscreenContainer.style.transform = transform
    prevScale = (isFinite(scale) && scale) || 1

    fullscreenFrameId = requestAnimationFrame(renderFullscreen)
  }

  //===========================================================================
  // Theater Mode
  //===========================================================================

  let theaterModeStyle

  // Creates styles to hide all non-video elements in the document
  function getFocusStyles(visibleTagName, selectors) {
    const ignoredSelectors = [visibleTagName, ...selectors]
      .map(selector => `:not(${selector})`)
      .join('')

    // :not(:empty) used to boost specificity
    let styles = `
${ignoredSelectors}:not(:empty),
${ignoredSelectors}:not(:empty):after,
${ignoredSelectors}:not(:empty):before {
color: transparent !important;
z-index: 0;
background: transparent !important;
border-color: transparent !important;
outline: none !important;
box-shadow: none !important;
text-shadow: none !important;
mix-blend-mode: normal !important;
filter: none !important;
fill: none !important;
stroke: none !important;
-webkit-text-stroke: transparent !important;
-webkit-mask: none !important;
transition: none !important;
user-select: none !important;
}

${ignoredSelectors}:empty {
visibility: hidden !important;
}`

    // popup player background color
    if (opener) {
      styles += `body${ignoredSelectors}:not(:empty) { background: #000 !important; }`
    }

    return styles
  }

  function setTheaterMode(enable) {
    if (theaterModeStyle) {
      theaterModeStyle.remove()
      theaterModeStyle = undefined
    }

    if (!enable) return

    const target = activeFrame || activeMedia

    // don't hide UI if target is audio
    if (target instanceof HTMLAudioElement) return

    // don't hide UI if target not in DOM
    if (target instanceof HTMLElement && !target.parentNode) return

    const visibleTagName = target instanceof HTMLVideoElement ? 'video' : 'iframe'
    const style = document.createElement('style')
    style.textContent = getFocusStyles(visibleTagName, playerSettings.theaterModeSelectors)
    theaterModeStyle = style
    document.head.appendChild(theaterModeStyle)
  }

  //===========================================================================
  // Track the active/primary media element
  //===========================================================================

  // TODO: This comparison logic should happen in the metastream app where we
  // could also do comparisons across frames.
  const maybeSetActiveMedia = media => {
    let replace = true

    try {
      while (replace) {
        // This is the first media we've found
        if (!activeMedia) break

        if (media instanceof HTMLVideoElement && activeMedia instanceof HTMLVideoElement) {
          // Prefer the video with more pixels on the screen
          const mediaRect = media.getBoundingClientRect()
          const activeRect = activeMedia.getBoundingClientRect()
          if (mediaRect.width * mediaRect.height > activeRect.width * activeRect.height) break
        }

        // There's a good chance we want to watch more long form content
        if (media.duration > activeMedia.duration) break

        // Prefer media we get further into
        if (media.currentTime > activeMedia.currentTime) break

        // The more data we have, the better
        if (media.readyState > activeMedia.readyState) break

        replace = false
      }
    } catch (e) {}

    if (replace) {
      const prevActiveMedia = activeMedia

      // Remove new active media from list of potential media
      mediaList.delete(media)

      // Use this as our primary media
      setActiveMedia(media)

      if (prevActiveMedia) {
        // Add previous media into the potential list, but not too quickly to
        // cause it to switch rapidly if they alternate. Adding back to the
        // list helps detection when ad interruptions occur.
        mediaCooldownList.add(prevActiveMedia)
        setTimeout(() => {
          mediaCooldownList.delete(prevActiveMedia)
          addMedia(prevActiveMedia)
        }, 2000)
      }
    }

    return replace
  }

  const setActiveMedia = media => {
    activeMedia = media
    activeFrame = undefined

    if (player) player.destroy()
    player = new HTMLMediaPlayer(media)

    debug('Set active media', media, media.src, media.duration)
    window.MEDIA = media

    if (autoplayTimerId) {
      clearTimeout(autoplayTimerId)
      autoplayTimerId = undefined
    }

    // TODO: Use MutationObserver to observe if video gets removed from DOM
  }

  const MEDIA_CHECK_EVENTS = ['playing', 'durationchange', 'canplay']

  const addMedia = media => {
    if (mediaList.has(media) || mediaCooldownList.has(media)) return

    debug('Add media', media, media.src, media.duration)
    mediaList.add(media)

    // Immediately mute to prevent being really loud
    media.volume = 0

    // Checks for media when it starts playing
    function checkMediaReady() {
      if (isNaN(media.duration)) {
        return false
      }

      // Wait for videos to appear in the DOM
      const body = media.ownerDocument && media.ownerDocument.body
      const isInDocument = body && body.contains(media)
      if (media instanceof HTMLVideoElement && !isInDocument) {
        return false
      }

      if (media.readyState >= MediaReadyState.HAVE_CURRENT_DATA) {
        if (maybeSetActiveMedia(media)) {
          MEDIA_CHECK_EVENTS.forEach(eventName => {
            media.removeEventListener(eventName, checkMediaReady)
          })
          return true
        }
      }

      return false
    }

    if (!checkMediaReady()) {
      MEDIA_CHECK_EVENTS.forEach(eventName => {
        media.addEventListener(eventName, checkMediaReady)
      })

      clearTimeout(autoplayTimerId)
      autoplayTimerId = setTimeout(attemptAutoplay, AUTOPLAY_TIMEOUT)
    }
  }

  //===========================================================================
  // Observe media elements on the page
  //===========================================================================

  const listenForMedia = event => {
    const { target } = event
    if (target instanceof HTMLMediaElement) {
      addMedia(target)
    }
  }
  document.addEventListener('play', listenForMedia, true)
  document.addEventListener('durationchange', listenForMedia, true)

  // Proxy document.createElement to trap media elements created in-memory
  const origCreateElement = document.createElement
  const proxyCreateElement = function() {
    const element = origCreateElement.apply(document, arguments)
    if (element instanceof HTMLMediaElement) {
      // Wait for attributes to be set
      setTimeout(addMedia, 0, element)
    }
    return element
  }
  proxyCreateElement.toString = origCreateElement.toString.bind(origCreateElement)
  document.createElement = proxyCreateElement

  // Process media elements from first.js
  const mediaElements = window.__metastreamMediaElements
  if (mediaElements) {
    Array.from(mediaElements).forEach(addMedia)
    window.__metastreamMediaElements = undefined
  }
})()
