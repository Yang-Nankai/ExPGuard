//
// The player script observes the contents of the page for media elements to
// remotely control. Information regarding the media is sent to the host
// application to determine how playback should be handled. Certain playback
// events are also sent to the page such as play, pause, seek, and volume.
//

;(function() {
  if (globalThis.__metastreamPlayer) {
    console.debug('Metastream player main world script injected twice')
    return
  }
  globalThis.__metastreamPlayer = true

  //=============================================================================
  // Main world script - modifies media in the main browser context.
  //=============================================================================

  const debug = console.debug || console.log
  const log = (...args) => {
    debug(...args)
    window.postMessage({
      type: 'metastream-webview-event',
      payload: { type: 'log', payload: JSON.parse(JSON.stringify(args)) }
    })
  }

  const METASTREAM_APP_URL = 'https://app.getmetastream.com'
  const METASTREAM_ORIGINS = new Set([
    METASTREAM_APP_URL,
    'http://local.getmetastream.com',
    'https://local.getmetastream.com',
    'http://localhost:8080',
    'https://localhost:8080',
    'http://127.0.0.1'
  ])
  const isMetastreamUrl = url => {
    try {
      return METASTREAM_ORIGINS.has(new URL(url).origin)
    } catch {
      return false
    }
  }
  if (isMetastreamUrl(location.href)) return

  // Injected by Metastream
  debug(`Metastream main world script ${location.href}`)

  // Hide opener when Metastream opens media in a popup.
  // Prevents pages from redirecting app.getmetastream.com, but still allows
  // for app.getmetastream.com to control the popup.
  let opener
  if (window.opener) {
    opener = window.opener
    Object.defineProperty(window, 'opener', { value: { location: {} } })
    window.close = () => {} // you won't
  }

  // Fix for annoying devtools detectors
  window.console.clear = () => {}
  window.console.table = () => {}

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

  const nativeVolumeDescriptor =
    Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'volume')

  function setNativeMediaVolume(media, volume) {
      nativeVolumeDescriptor.set.call(media, volume);
  }

  function installVolumeDescriptor(media) {
    try {
      Object.defineProperty(media, 'volume', {
        configurable: false,
        enumerable: true,
        get() {
          return nativeVolumeDescriptor.get.call(this);
        },
        set(volume) {
          if (isInInteractMode) {
            setNativeMediaVolume(this, volume)
          }
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  function dispatchEvent(eventName, detail) {
    const e = new CustomEvent(eventName, { detail, cancelable: true, bubbles: false })
    document.dispatchEvent(e)
    return e.defaultPrevented
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
    autoFullscreen: true,
    fitIFrameContent: true,
    ignoreSmallerVideos: true,
    mediaSessionProxy: true,
    syncOnBuffer: true,
    seekThreshold: 100 /** Threshold before we'll seek. */,
    theaterMode: false,
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
  // main world -> content script world -> background -> metastream content script -> metastream app
  const dispatchMediaEvent = action => {
    window.postMessage({
      type: 'metastream-webview-event',
      payload: { type: 'message', payload: action }
    })
  }

  // Searches for iframe src sharing same domain as event origin.
  const getEventFrame = event =>
    Array.from(document.querySelectorAll('iframe')).find(
      (frame) => frame.contentWindow === event.source
    )

  const eventMiddleware = event => {
    const { data: action } = event
    if (typeof action !== 'object' || typeof action.type !== 'string') return

    debug(`[Metastream Remote] Received player event`, action)

    switch (action.type) {
      case 'set-settings': {
        const prev = playerSettings
        playerSettings = { ...prev, ...action.payload }
        onSettingsChange(playerSettings, prev)
        break
      }
      case 'set-interact': {
        setInteractMode(!!action.payload)
        break
      }
      case 'apply-fullscreen': {
        const href = action.payload
        if (location.href === href) {
          startAutoFullscreen()
        }
        return
      }
      case 'apply-fullscreen-parent': {
        // Fullscreen parent frame of video content.
        const frame = getEventFrame(event)
        activeFrame = frame || undefined
        setTheaterMode(!!playerSettings.theaterMode)
        startAutoFullscreen(activeFrame, action.payload)
        return
      }
      case 'get-frame-size': {
        const frame = getEventFrame(event)
        if (frame) {
          frame.contentWindow.postMessage(
            {
              type: 'frame-size-result',
              payload: {
                width: frame.offsetWidth,
                height: frame.offsetHeight
              }
            },
            '*'
          )
        }
        return
      }
      case 'frame-size-result':
        const frameSize = action.payload
        autoplayFrameSize = frameSize
        return
    }

    if (!player) return

    switch (action.type) {
      case 'set-media-playback': {
        if (action.payload === PlaybackState.Playing) {
          player.play()
        } else if (action.payload === PlaybackState.Paused) {
          player.pause()
        }
        break
      }
      case 'seek-media':
        player.seek(action.payload)
        break
      case 'set-media-volume':
        player.setVolume(action.payload)
        break
      case 'set-media-playback-rate':
        player.setPlaybackRate(action.payload)
        break
    }
  }
  window.addEventListener('message', eventMiddleware)

  const setInteractMode = enable => {
    isInInteractMode = enable
    setTheaterMode(playerSettings.theaterMode && !enable)
    if (enable) {
      stopAutoFullscreen()
    } else {
      startAutoFullscreen()
    }
    // Show playback controls on built-in browser media pages
    const fullscreenVideo = document.querySelector(
      'video:-webkit-full-page-media, body > video:only-child'
    )
    if (fullscreenVideo instanceof HTMLVideoElement) {
      fullscreenVideo.controls = enable
    }
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

      // Metastream needs to be able to set the playback state accurately.
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
      this.onPlaying = this.onPlaying.bind(this)
      this.onPause = this.onPause.bind(this)
      this.onEnded = this.onEnded.bind(this)
      this.onSeeked = this.onSeeked.bind(this)
      this.onVolumeChange = this.onVolumeChange.bind(this)
      this.onTimeUpdate = throttle(this.onTimeUpdate.bind(this), 1e3)
      this.onWaiting = this.onWaiting.bind(this)
      this.onDurationChange = debounce(this.onReady.bind(this), 2e3)
      this.onRateChange = this.onRateChange.bind(this)

      this.mediaController = new AbortController()

      const eventOpts = { signal: this.mediaController.signal, capture: false }
      this.media.addEventListener('play', this.onPlay, eventOpts)
      this.media.addEventListener('playing', this.onPlaying, eventOpts)
      this.media.addEventListener('pause', this.onPause, eventOpts)
      this.media.addEventListener('ended', this.onEnded, eventOpts)
      this.media.addEventListener('seeked', this.onSeeked, eventOpts)
      this.media.addEventListener('volumechange', this.onVolumeChange, eventOpts)
      this.media.addEventListener('timeupdate', this.onTimeUpdate, eventOpts)
      this.media.addEventListener('durationchange', this.onDurationChange, eventOpts)
      this.media.addEventListener('ratechange', this.onRateChange, eventOpts)

      installVolumeDescriptor(this.media)

      this.onReady()
    }

    destroy() {
      this.mediaController?.abort()
      this.mediaController = undefined

      this.stopWaitingListener()
    }

    /**
     * Call play on third-party player API if present.
     */
    maybePlayThirdParty() {
      // Only attempt once
      this.maybePlayThirdParty = undefined

      // Defer so we can catch the initial media.play() error if muted
      queueMicrotask(() => {
        // JWPlayer sometimes gets stuck in buffering loop if play() is not
        // initially called.
        if (playJwPlayer(this.media)) return
      })
    }

    play() {
      if (dispatchEvent('metastreamplay')) return
      if (mediaSessionProxy.execActionHandler('play')) return
      this.maybePlayThirdParty?.()
      this.startWaitingListener()
      return this.media.play().catch(this.onPlayError)
    }
    pause() {
      this.stopWaitingListener()
      if (dispatchEvent('metastreampause')) return
      if (mediaSessionProxy.execActionHandler('pause')) return
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
    seek(time) {
      if (dispatchEvent('metastreamseek', time)) return

      if (mediaSessionProxy.execActionHandler('seekto', { seekTime: time / 1000, fastSeek: false }))
        return

      // Infinity is generally used for a dynamically allocated media object
      // or live media
      const duration = this.getDuration() * SEC2MS
      if (duration === Infinity || !isValidDuration(duration)) {
        return
      }

      // Only seek if we're off by greater than our threshold
      if (this.timeExceedsThreshold(time)) {
        this.media.currentTime = time * MS2SEC
      }
    }
    setVolume(volume) {
      // MUST SET THIS FIRST
      this.volume = volume

      const initialPaused = this.media.paused
      setNativeMediaVolume(this.media, volume)

      if (this.media.muted && volume > 0) {
        this.media.muted = false
      }

      // If playback pauses, autoplay policy prevented unmuted playback
      // without throwing an error.
      const didPause = this.media.paused && this.media.paused !== initialPaused
      if (didPause) {
        debug('setVolume failed due to autoplay policy')
        this.onPlayError({ name: 'NotAllowedError' })
      }
    }
    setPlaybackRate(playbackRate) {
      this.playbackRate = playbackRate
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

      this.onPlaybackChange(event, 'playing')
    }

    onPlayError(err) {
      dispatchMediaEvent({ type: 'media-autoplay-error', payload: { error: err.name } })

      if (err.name === 'NotAllowedError') {
        // Attempt muted autoplay
        this.setVolume(0)
        this.media.play().catch(noop)
      }
    }

    onPlaying(event) {
      this.onPlaybackChange(event, 'playing')
    }

    onPause(event) {
      this.onPlaybackChange(event, 'paused')
    }

    onEnded(event) {
      this.onPlaybackChange(event, 'ended')
    }

    onSeeked(event) {
      if (event.isTrusted) {
        dispatchMediaEvent({ type: 'media-seeked', payload: this.getCurrentTime() })
      }
    }

    onTimeUpdate() {
      const duration = this.getDuration()
      dispatchMediaEvent({
        type: 'media-time-update',
        payload: {
          currentTime: this.getCurrentTime(),
          duration: isValidDuration(duration) ? duration * SEC2MS : undefined
        }
      })
    }

    onVolumeChange(event) {
      const { volume } = this.media
      if (event.isTrusted && this.volume !== volume) {
        dispatchMediaEvent({ type: 'media-volume-change', payload: { value: volume } })
      }
    }

    onPlaybackChange(event, state) {
      dispatchMediaEvent({
        type: 'media-playback-change',
        payload: { state: state, time: this.getCurrentTime(), isTrusted: event.isTrusted }
      })
    }

    onRateChange() {
      const { playbackRate } = this.media
      if (playbackRate !== this.playbackRate) {
        dispatchMediaEvent({
          type: 'media-playback-rate-change',
          payload: { value: playbackRate }
        })
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
      // if (this.media.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return

      debug(
        `waiting event [networkState=${this.media.networkState}][readyState=${
          this.media.readyState
        }]`
      )

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
          dispatchEvent('metastreampause') || this.media.pause()
          const playPromise = dispatchEvent('metastreamplay') || this.media.play()
          if (playPromise?.then) playPromise.catch(noop)
        }

        if (this.media.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
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
  let autoplayFrameSize

  function logAutoplay(playerName, logObject) {
    console.debug(`Attempting autoplay for ${playerName}`, logObject)
    dispatchMediaEvent({
      type: 'media-autoplay-log',
      payload: { playerName }
    })
  }

  // Popular enough player that it's worth a try
  const playJwPlayer = (media) => {
    if (typeof jwplayer === 'function') {
      logAutoplay('jwplayer')
      try {
        const player = jwplayer()
        if (media) {
          // If media is provided, only play if its a player for the given media
          const containerVideo = player.getContainer().querySelector('video')
          if (containerVideo !== media) return false
        }
        player.play()
        return true
      } catch (error) {
        console.error(error)
      }
    }
  }
  const playVideoJS = () => {
    if (typeof videojs === 'function') {
      logAutoplay('videojs')
      try {
        const { players } = videojs
        const playerIds = Object.keys(players)
        playerIds.forEach(async id => {
          const player = players[id]
          try {
            await player.play()
          } catch (error) {
            if (error.name === 'NotAllowedError') {
              player.muted(true)
              await player.play()
            }
          }
        })
        return playerIds.length > 0
      } catch (e) {}
    }
  }
  const playPlayerJS = () => {
    const globalPlayer = globalThis.player
    if (typeof globalPlayer === 'object' && globalPlayer?.constructor?.name === 'Playerjs') {
      logAutoplay('playerjs')
      try {
        globalPlayer.api('play')
        return true
      } catch (error) {
        console.error(error)
      }
    }
  }
  const pressStart = () => {
    const { start } = window
    if (start instanceof HTMLElement) {
      logAutoplay('start-btn')
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
      const frameSize =
        autoplayFrameSize && autoplayFrameSize.height > 0
          ? autoplayFrameSize
          : { width: window.innerWidth, height: window.innerHeight }
      playButton = document.elementFromPoint(frameSize.width / 2, frameSize.height / 2)
    }

    // SVG and <i> elements are commonly icons. Traverse up to find the button
    while (
      playButton &&
      (playButton instanceof SVGElement || playButton.tagName === 'I') &&
      playButton.parentNode
    ) {
      playButton = playButton.parentNode
    }

    if (playButton instanceof HTMLButtonElement || playButton instanceof HTMLDivElement) {
      logAutoplay('play-btn', { playButton })
      playButton.click()
    }
  }

  // Try different methods of initiating playback
  const attemptAutoplay = () => {
    if (hasActiveMedia()) return
    debug(`Attempting autoplay in ${location.origin}`)
    if (playJwPlayer()) return
    if (playVideoJS()) return
    if (playPlayerJS()) return
    if (dispatchEvent('metastreamautoplay')) return
    if (pressStart()) return
    clickPlayButton()
  }

  const autoplayOnLoad = () => {
    window.parent.postMessage({ type: 'get-frame-size' }, '*')
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
  let fullscreenChildAspectRatio
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

  function containRect(rect, contain) {
    const { width, height, left, top } = rect

    let { width: containWidth, height: containHeight } = contain
    const containScale = Math.min(width / contain.width, height / contain.height)
    containWidth *= containScale
    containHeight *= containScale

    const deltaWidth = width - containWidth
    const deltaHeight = height - containHeight

    return {
      width: width - deltaWidth,
      height: height - deltaHeight,
      left: left + deltaWidth / 2,
      top: top + deltaHeight / 2
    }
  }

  // calculate rect of video contained within video element
  function getVideoRect(video, rootEl) {
    const rect = getNormalizedRect(video, rootEl)
    const contain = { width: video.videoWidth, height: video.videoHeight }
    return containRect(rect, contain)
  }

  function getFittedRect(video, rootEl) {
    const rect = getNormalizedRect(video, rootEl)

    // Fit to video within IFrame
    if (playerSettings.fitIFrameContent && fullscreenChildAspectRatio) {
      const childAspectRatio = fullscreenChildAspectRatio
      const aspectRatio = rect.width / rect.height
      const contain = {
        width: rect.width * childAspectRatio * (1 / aspectRatio),
        // height: rect.height * (1 / childAspectRatio) * aspectRatio
        height: rect.height
      }
      return containRect(rect, contain)
    }

    return rect
  }

  function getMediaElementAspectRatio(element) {
    if (element instanceof HTMLVideoElement) {
      return element.videoWidth / element.videoHeight
    } else if (element instanceof HTMLIFrameElement) {
      return element.innerWidth / element.innerHeight
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
    const elementRect =
      fullscreenElement instanceof HTMLVideoElement
        ? getVideoRect(fullscreenElement, fullscreenContainer)
        : getFittedRect(fullscreenElement, fullscreenContainer)
    const { width, height, left, top } = elementRect

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

    // Unstable scaling
    if (scale === Infinity) {
      log('Stopping autofullscreen due to unstable scaling')
      stopAutoFullscreen()
      return
    }

    fullscreenContainer.style.transformOrigin = transformOrigin
    fullscreenContainer.style.transform = transform
    prevScale = (isFinite(scale) && scale) || 1

    setTimeout(() => {
      if (isFullscreen) {
        fullscreenFrameId = requestAnimationFrame(renderFullscreen)
      }
    }, 500)
  }

  function startAutoFullscreen(target = activeMedia || activeFrame, context = {}) {
    if (!(target instanceof HTMLVideoElement || target instanceof HTMLIFrameElement)) return
    if (isInInteractMode) return

    if (isFullscreen) stopAutoFullscreen()
    isFullscreen = true

    debug('Starting autofullscreen', target)

    // Prevent scroll offset
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0) // reset scroll
    origDocumentOverflow = getComputedStyle(document.body).overflow

    // Find container we can transform
    let container = (fullscreenContainer = target)
    do {
      if (container instanceof HTMLElement && container.offsetWidth && container.offsetHeight) {
        fullscreenContainer = container
      }
    } while ((container = container.parentNode))

    // If fullscreen container is not at the top left of the viewport, revert
    // to document.
    if (fullscreenContainer && fullscreenContainer.getBoundingClientRect().left > 0) {
      fullscreenContainer = document.documentElement
    }

    fullscreenElement = target

    // Set aspect ratio of media element within the target <iframe>
    if (target instanceof HTMLIFrameElement && context.aspectRatio) {
      fullscreenChildAspectRatio = context.aspectRatio
    }

    const aspectRatio = getMediaElementAspectRatio(fullscreenElement)

    if (playerSettings.autoFullscreen) {
      fullscreenFrameId = requestAnimationFrame(renderFullscreen)
    }

    const isTopFrame = window.self === window.top
    if (!isTopFrame && fullscreenElement) {
      window.parent.postMessage(
        {
          type: 'apply-fullscreen-parent',
          payload: {
            aspectRatio
          }
        },
        '*'
      )
    }
  }

  function stopAutoFullscreen() {
    debug('Stopping autofullscreen')
    isFullscreen = false
    fullscreenElement = undefined
    fullscreenChildAspectRatio = undefined
    prevScale = 1
    document.documentElement.minHeight = ''
    if (origDocumentOverflow) {
      document.body.style.overflow = origDocumentOverflow
      origDocumentOverflow = undefined
    }
    if (fullscreenFrameId) {
      cancelAnimationFrame(fullscreenFrameId)
      fullscreenFrameId = undefined
    }
    if (fullscreenContainer) {
      fullscreenContainer.style.transform = ''
      fullscreenContainer.style.transformOrigin = ''
      fullscreenContainer = undefined
    }
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
border-radius: 0 !important;
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

          const mediaIsLarger = mediaRect.width * mediaRect.height > activeRect.width * activeRect.height
          if (mediaIsLarger) {
            break // always prefer larger videos
          } else if (playerSettings.ignoreSmallerVideos) {
            replace = false;
            break
          }
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

    startAutoFullscreen()

    // TODO: Use MutationObserver to observe if video gets removed from DOM
  }

  const MEDIA_CHECK_EVENTS = ['playing', 'durationchange', 'canplay', 'timeupdate']

  const addMedia = media => {
    if (mediaList.has(media) || mediaCooldownList.has(media)) return

    debug('Add media', media, media.src, media.duration)
    mediaList.add(media)

    // Immediately mute to prevent being really loud
    setNativeMediaVolume(media, 0)

    // Checks for media when it starts playing
    function checkMediaReady() {
      if (isNaN(media.duration)) {
        return false
      }

      // Wait for videos to appear in the document
      if (media instanceof HTMLVideoElement && !media.isConnected) {
        return false
      }

      if (media.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
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
  // Settings
  //===========================================================================

  const onSettingsChange = (settings, prev) => {
    setTheaterMode(!!settings.theaterMode)
    if (settings.autoFullscreen && !isFullscreen) {
      startAutoFullscreen()
    } else if (!settings.autoFullscreen && isFullscreen) {
      stopAutoFullscreen()
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
      queueMicrotask(() => addMedia(element))
    }
    return element
  }
  proxyCreateElement.toString = origCreateElement.toString.bind(origCreateElement)
  document.createElement = proxyCreateElement

  // Process media elements from first.js
  const mediaElements = window.__metastreamMediaElements
  if (mediaElements) {
    Array.from(mediaElements).forEach(mediaRef => {
      const media = mediaRef.deref()
      if (media) {
        addMedia(media)
      }
    })
    window.__metastreamMediaElements = undefined
  }
})()

// Don't serialize result
void 0
