// Netflix encrypts the manifest response (MSL) and the page-world player API
// no longer exposes ttDownloadables. Subtitle URLs are unreachable from JS.
// We enumerate available tracks from cadmium's getTimedTextTrackList() and
// dispatch them to the content script, which maps the new schema
// (bcp47/displayName) into glot's existing sub list.

var lastTrackSignature = '';

function readNetflixTracks() {
  try {
    var p = getPlayer();
    if (!p || typeof p.getTimedTextTrackList !== 'function') return null;
    var tracks = p.getTimedTextTrackList() || [];
    if (!tracks.length) return null;
    return tracks
      .filter(function (t) { return t && !t.isNoneTrack; })
      .map(function (t) {
        return {
          trackId: t.trackId,
          bcp47: t.bcp47,
          displayName: t.displayName,
          rawTrackType: t.rawTrackType,
          isForcedNarrative: !!t.isForcedNarrative,
          isImageBased: !!t.isImageBased
        };
      });
  } catch (e) {
    return null;
  }
}

function pushTracksIfChanged() {
  var movieId = detectNetflixVideoIdInDom();
  if (!movieId) return;
  var tracks = readNetflixTracks();
  if (!tracks || !tracks.length) return;
  var sig = movieId + '|' + tracks.map(function (t) { return t.trackId + ':' + t.bcp47 + ':' + (t.rawTrackType || ''); }).join(',');
  if (sig === lastTrackSignature) return;
  lastTrackSignature = sig;
  window.dispatchEvent(new CustomEvent('glot_netflix_tracks', {
    detail: { movieId: movieId, tracks: tracks }
  }));
}

function detectNetflixVideoIdInDom() {
  var videoContainer = document.querySelector('[data-videoid]');

  if (videoContainer) {
    var id = videoContainer.getAttribute('data-videoid');
    if (id) return id;
  }

  return null;
}

function getPlayer() {
  try {
    var videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
    var sessionId = videoPlayer.getAllPlayerSessionIds()[0];
    return videoPlayer.getVideoPlayerBySessionId(sessionId);
  } catch (error) {
    return null;
  }
}

function handleSeek(event) {
  try {
    const player = getPlayer();
    player && player.seek(event.detail);
  } catch (error) {

  }
}

// Auto-pause resume needs to click "play" while Netflix's control bar is
// hidden, so the DOM-button fallback in helper.playVideo can't find a
// target. Route play/pause through cadmium directly.
function handlePlay() {
  try {
    const player = getPlayer();
    player && typeof player.play === 'function' && player.play();
  } catch (error) {

  }
}

function handlePause() {
  try {
    const player = getPlayer();
    player && typeof player.pause === 'function' && player.pause();
  } catch (error) {

  }
}

// Capture subtitle TTML files from Netflix's OCA CDN. When cadmium fetches
// a subtitle file (right after setTimedTextTrack), the URL appears as a
// non-range OCA fetch. PerformanceObserver sees it even though our hook
// runs after cadmium cached its fetch reference. We re-fetch the URL
// (CORS allows it) and parse the TTML into glot's cue format.
var nativeSubsHiddenStyle = null;
// trackId currently being awaited (after setTimedTextTrack). Next OCA
// subtitle fetch we capture is assigned to this trackId.
var pendingTrackId = null;
var pendingSince = 0;
// Cleared whenever a NEW switch happens before the previous fetch
// arrived. While ambiguous, we refuse to attribute fetches (better to
// drop them than to mis-cache them as the wrong language).
var pendingIsAmbiguous = false;
// trackId -> URL we've already dispatched (avoid double-handling on
// duplicate fetches).
var dispatchedForTrack = {};
// Active observer instance; we always have one running once a player is
// detected.
var ocaObserver = null;
// Pre-warm bookkeeping.
var prewarmRestoreTrackId = null;
var prewarmTimeoutId = null;

function findNetflixTrackById(trackId) {
  var p = getPlayer();
  if (!p || typeof p.getTimedTextTrackList !== 'function') return null;
  var tracks = p.getTimedTextTrackList() || [];
  for (var i = 0; i < tracks.length; i++) {
    if (tracks[i].trackId === trackId) return tracks[i];
  }
  return null;
}

function hideNetflixNativeSubs() {
  if (nativeSubsHiddenStyle) return;
  nativeSubsHiddenStyle = document.createElement('style');
  nativeSubsHiddenStyle.setAttribute('data-glot-hide-native-subs', 'true');
  nativeSubsHiddenStyle.textContent =
    '.player-timedtext-text-container, .player-timedtext-text-container * { ' +
      'opacity: 0 !important; visibility: hidden !important; ' +
    '}';
  document.head.appendChild(nativeSubsHiddenStyle);
}

function isLikelySubtitleFetch(entry) {
  if (!/nflxvideo\.net/.test(entry.name)) return false;
  if (/\/range\//.test(entry.name)) return false;
  var size = entry.decodedBodySize || entry.transferSize || 0;
  // TTML subtitle files seen in the wild range ~30KB .. ~500KB.
  if (size < 5000 || size > 2000000) return false;
  return true;
}

function getCurrentNetflixTrackId() {
  try {
    var p = getPlayer();
    if (!p || typeof p.getTimedTextTrack !== 'function') return null;
    var t = p.getTimedTextTrack();
    return (t && t.trackId) || null;
  } catch (e) { return null; }
}

function startOcaObserver() {
  if (ocaObserver) return;
  try {
    ocaObserver = new PerformanceObserver(function (list) {
      list.getEntries().forEach(function (entry) {
        if (!isLikelySubtitleFetch(entry)) return;
        var ageSinceIntent = pendingTrackId ? (performance.now() - pendingSince) : Infinity;
        // Best-effort attribution. Even if the hint is wrong (during
        // overlapping switches), the service re-attributes by reading
        // the TTML's xml:lang attribute.
        var attributeTo = (pendingTrackId && ageSinceIntent <= 5000)
          ? pendingTrackId
          : getCurrentNetflixTrackId();
        if (!attributeTo) return;
        if (dispatchedForTrack['__url__:' + entry.name]) return;
        dispatchedForTrack['__url__:' + entry.name] = 1;
        if (pendingTrackId === attributeTo) {
          pendingTrackId = null;
          pendingIsAmbiguous = false;
        }
        window.dispatchEvent(new CustomEvent('glot_netflix_sub_url', {
          detail: { trackId: attributeTo, url: entry.name }
        }));
      });
    });
    ocaObserver.observe({ entryTypes: ['resource'] });
  } catch (e) {}
}

// Start observer immediately so we catch Netflix's initial subtitle
// fetch, not just fetches triggered by explicit user dropdown changes.
startOcaObserver();

// Authoritative primary trackId — set by glot_netflix_select_track. Any
// prewarm cycle always restores to this, never to whatever Netflix happens
// to currently render (which may lag the most recent setTimedTextTrack).
var primaryTrackId = null;

function switchToTrack(trackId) {
  var track = findNetflixTrackById(trackId);
  if (!track) return false;
  var p = getPlayer();
  if (!p || typeof p.setTimedTextTrack !== 'function') return false;
  try {
    p.setTimedTextTrack(track);
    pendingIsAmbiguous = !!(pendingTrackId && pendingTrackId !== trackId
      && (performance.now() - pendingSince) < 5000);
    pendingTrackId = trackId;
    pendingSince = performance.now();
    return true;
  } catch (err) { return false; }
}

// On a new movie Netflix often keeps the previously-preferred track active.
// setTimedTextTrack(sameTrack) is then a no-op — no TTML fetch happens, so the
// OCA observer never sees a URL and cues never load. Force a real fetch by
// briefly switching to a different track first, then back.
function forceRefetchIfActive(trackId) {
  var p = getPlayer();
  if (!p || typeof p.getTimedTextTrack !== 'function'
        || typeof p.getTimedTextTrackList !== 'function'
        || typeof p.setTimedTextTrack !== 'function') return false;
  var current = p.getTimedTextTrack();
  if (!current || current.trackId !== trackId) return false;
  var tracks = p.getTimedTextTrackList() || [];
  var altTrack = null;
  for (var i = 0; i < tracks.length; i++) {
    if (tracks[i] && tracks[i].trackId !== trackId && !tracks[i].isImageBased) {
      altTrack = tracks[i];
      break;
    }
  }
  if (!altTrack) return false;
  try { p.setTimedTextTrack(altTrack); } catch (e) { return false; }
  return true;
}

window.addEventListener('glot_netflix_select_track', function (e) {
  var detail = e && e.detail;
  startOcaObserver();
  hideNetflixNativeSubs();
  if (!detail || detail.trackId == null) {
    primaryTrackId = null;
    return;
  }
  primaryTrackId = detail.trackId;
  if (forceRefetchIfActive(detail.trackId)) {
    setTimeout(function () { switchToTrack(detail.trackId); }, 50);
  } else {
    switchToTrack(detail.trackId);
  }
});

window.addEventListener('glot_netflix_prewarm', function (e) {
  var detail = e && e.detail;
  if (!detail || !detail.trackId) return;
  startOcaObserver();
  hideNetflixNativeSubs();
  var p = getPlayer();
  if (!p || typeof p.getTimedTextTrack !== 'function') return;

  function startRestoreTimer() {
    if (prewarmTimeoutId) clearTimeout(prewarmTimeoutId);
    prewarmTimeoutId = setTimeout(function () {
      // Resolve restore target AT FIRE TIME — primary may have changed
      // since prewarm started (user picked a new Original mid-prewarm).
      var restoreTarget = primaryTrackId;
      if (restoreTarget && restoreTarget !== detail.trackId) {
        switchToTrack(restoreTarget);
      }
      prewarmTimeoutId = null;
    }, 2500);
  }

  var current = p.getTimedTextTrack();
  if (current && current.trackId === detail.trackId) {
    // Already on the target track — same no-op problem as select_track on a
    // new movie. Force a refetch so the observer captures the URL, then
    // start the normal restore-timer.
    if (!forceRefetchIfActive(detail.trackId)) {
      pendingTrackId = detail.trackId;
      pendingSince = performance.now();
      return;
    }
    setTimeout(function () {
      if (switchToTrack(detail.trackId)) startRestoreTimer();
    }, 50);
    return;
  }
  if (!switchToTrack(detail.trackId)) return;
  startRestoreTimer();
});

var videoId = null;
var hideCoreUI = false;
var firstEventGlotEye = true;
var firstEventGlotPopup = true;
window.addEventListener("glotSeek", handleSeek);
window.addEventListener("glotPlay", handlePlay);
window.addEventListener("glotPause", handlePause);

document.addEventListener('click', (event) => {
  var isNewLayout = document.querySelector(".watch-video--player-view");

  if (isNewLayout && document.querySelector("#eJOY-pop-container-video")) {

    document.querySelector("#eJOY-pop-container-video").onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  if (event.target.classList.contains('glot-eye')) {
    if (!isNewLayout) {
      try {
        event.stopPropagation();
        event.preventDefault();
        const playerControls = document.querySelector('.PlayerControlsNeo__core-controls');
        const glotEyeClose = document.querySelector('.glot-eye-close');
        const glotEyeOpen = document.querySelector('.glot-eye-open');
        hideCoreUI = !hideCoreUI;
        if (hideCoreUI) {
          playerControls.style.cssText = 'display: none;';
          glotEyeOpen.style.display = 'none'
          glotEyeClose.style.display = 'flex'
        } else {
          playerControls.style.cssText = '';
          glotEyeOpen.style.display = 'flex'
          glotEyeClose.style.display = 'none'
        }
      } catch (error) {

      }
    }
  }
})

window.setInterval(function () {
  var player = getPlayer();
  var isNewLayout = document.querySelector(".watch-video--player-view");

  if (isNewLayout) {
    if (document.querySelector("#eJOY-pop-container-video")) {
      document.querySelector("#eJOY-pop-container-video").onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

  if (player && "getLoaded" in player && player.getLoaded() || isNewLayout && player && "getReady" in player && player.getReady()) {
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
    }
    // Dispatch tracks FIRST so the service's subCache is populated before
    // glotSubtitlesChanged triggers inject.ts to look up the primary track.
    pushTracksIfChanged();
    if (window.currentLanguageGlot !== player.getTimedTextTrack().bcp47) {
      window.currentLanguageGlot = player.getTimedTextTrack().bcp47;
      window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", {
        detail: window.currentLanguageGlot
      }));
    }
  } else {
    window.isLoadedGlot = false;
    window.currentLanguageGlot = null;
  }

  var movieIdInDomMatch = detectNetflixVideoIdInDom();

  if (videoId && movieIdInDomMatch && videoId !== movieIdInDomMatch) {
    videoId = movieIdInDomMatch;
    lastTrackSignature = '';
    setTimeout(function () {
      window.dispatchEvent(new CustomEvent("changeMovieGlot"));
      window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", {
        detail: window.currentLanguageGlot
      }));
    }, 500);
  }

  if (!videoId && movieIdInDomMatch) videoId = movieIdInDomMatch;

  if (isNewLayout) {
    if (!window.isFirstLoadSubGlot && isNewLayout) {
      window.isFirstLoadSubGlot = true;
      window.dispatchEvent(new CustomEvent("renderCoreLayoutGlot"));
    }

    if (!document.querySelector(".glot-settings") && document.querySelector(".watch-video--bottom-controls-container")) {
      window.isFirstLoadIcon = true;
      window.dispatchEvent(new CustomEvent("renderIconGlot"));
    }
  }
}, 500);
