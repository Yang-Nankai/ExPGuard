
window.WebAssembly = undefined;
let firstLoad = true;
window.setInterval(() => {
  const player = document.getElementById("flashbox");
  const currentSub = document.querySelector("iqp[datalid][class~='selected']");
  if (currentSub && currentSub.getAttribute("datalid")) {
    window.dispatchEvent(new CustomEvent("setLangId", { detail: currentSub.getAttribute("datalid") }));
    if (currentSub.getAttribute("datalid") === 'close') {
      window.dispatchEvent(
        new CustomEvent("glotSubtitlesChanged", { detail: '' })
      );
    }
  }
  if (player) {
    if (!window.isLoadedGlot) {
      // reload to load all sub
      try {
        if (firstLoad) {
          setTimeout(() => {
            const curNotVideo = document.querySelector(".intl-episodes-list > li:not(.selected)")
            const curVideo = document.querySelector(".intl-episodes-list > li.selected")
            curNotVideo.click()
            setTimeout(() => {
              curVideo.click()
            }, 1000)
          }, 1000)
        }
      } catch (error) {

      }
      firstLoad = false;
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
    }
  } else {
    window.isLoadedGlot = false;
  }

  if (!window.isFirstLoadSubGlot && document.querySelector("iqpdiv[class='iqp-contrls-right']")) {
    window.isFirstLoadSubGlot = true;
    window.dispatchEvent(new CustomEvent("renderCoreLayoutGlot"));
  }

}, 500);

(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.match(/^http/g) !== null) {
      const urlObject = new URL(url);
      if (url.indexOf('cache-video.iq.com') > 0) {
        this.addEventListener('loadend', function (e) {
          try {
            window.dispatchEvent(new CustomEvent("glot_data", { detail: e.currentTarget.responseText }));
          } catch (err) {
          }
        });
      } else if (urlObject.host === 'ibd-as-api.iq.com') {
        var capture_resource = performance.getEntriesByType("resource");
        for (var i = 0; i < capture_resource.length; i++) {
          const url = capture_resource[i].name;
          if (url.match(/^http/g) !== null) {
            const urlObjectTest = new URL(url);
            if (urlObjectTest.host === 'cache-video.iq.com') {
              window.dispatchEvent(new CustomEvent("addLanguage", { detail: capture_resource[i].name }));
            }
          }
        }
      }
    } else if (url.startsWith('//meta.video.iqiyi.com')) {
      const urlObject = new URL('https:' + url)
      const languageId = urlObject.searchParams.get('lid')
      window.dispatchEvent(
        new CustomEvent("setLangId", { detail: languageId })
      );
      window.dispatchEvent(
        new CustomEvent("glotSubtitlesChanged", { detail: languageId })
      );
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);

