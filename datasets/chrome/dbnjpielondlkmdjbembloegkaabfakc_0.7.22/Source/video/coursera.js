
window.isLoadedGlot = false;
let videoId = null;
let isLoad = false;
window.setInterval(() => {
  const hrefCurrent = window.location.href
  // Coursera dropped the `vjs-tech` class when they migrated off video.js to an
  // emotion/CSS-in-JS player. A /lecture/ page has exactly one <video>, so plain
  // tag lookup is the stable replacement.
  const player = document.querySelector('video');
  if (player && window.hrefGlotCurrent === hrefCurrent) {
    if (!window.isLoadedGlot) {
      window.hrefGlotCurrent = window.location.href
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
    }
  } else {
    window.hrefGlotCurrent = hrefCurrent
    window.isFirstLoadSubGlot = false;
    window.isLoadedGlot = false;
  }

  function detectVideoIdInHref() {
    const hrefParse = window.location.href.split('lecture/');
    if (hrefParse.length > 1) return hrefParse[1].split('/')[0];
    return null;
  }
  const movieIdInDomMatch = detectVideoIdInHref();

  const videoSelector = document.querySelector('video')
  if ((!window.isFirstLoadSubGlot &&
    videoSelector &&
    videoSelector.textTracks &&
    videoSelector.textTracks.length) ||
    (videoSelector &&
      videoSelector.textTracks &&
      videoSelector.textTracks.length && videoId && movieIdInDomMatch && videoId !== movieIdInDomMatch)
  ) {
    videoId = movieIdInDomMatch;
    window.isFirstLoadSubGlot = true;
    const textTracks = videoSelector.textTracks;
    if (textTracks) {
      textTracks.addEventListener("change", function (e) {
        let trackCur = null;
        for (var prop in e.currentTarget) {
          const track = e.currentTarget[prop];
          if (track && !!track.cues) {
            window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: track.language }));
            isLoad = true;
            break
          }
        }
      });

      const tracks = videoSelector.querySelectorAll('track');
      const subArr = [];

      tracks.forEach(track => {
        const lang = track.getAttribute('srclang')
        const name = track.getAttribute('label')
        const href = `https://www.coursera.org${track.getAttribute('src')}`
        subArr.push({ lang, name, href });
        if (!isLoad) {
          window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: '' }));
        }
      });

      // let videoId: string = '';
      // try {
      //   videoId = window.location.href.split('lecture/')[1].split('/')[0];
      // } catch (error) {
      //   videoId = '';
      // }
      window.dispatchEvent(new CustomEvent("glot_data", { detail: { subtitleArr: subArr, videoId } }));
    }
  }
  if (!document.querySelector(".glot-settings")) {
    window.isFirstLoadIcon = true;
    window.dispatchEvent(new CustomEvent("renderIconGlot"));
  }
}, 500);
