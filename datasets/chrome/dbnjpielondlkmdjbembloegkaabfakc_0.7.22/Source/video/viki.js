
window.currentLanguageGlot = '';

/**
 * Extract video ID from Viki URL
 * @param {string} url - Viki video URL (e.g., https://www.viki.com/videos/1163205v)
 * @returns {string|null} - The extracted video ID or null if not found
 */
function extractVikiVideoId(url) {
  if (!url) return null;
  
  // Handle URLs in the format https://www.viki.com/videos/1163205v
  const videosPattern = /\/videos\/([a-zA-Z0-9]+)/;
  const videosMatch = url.match(videosPattern);
  
  if (videosMatch && videosMatch[1]) {
    return videosMatch[1];
  }
  
  // Handle potential alternative URL formats if needed
  
  return null;
}

window.setInterval(() => {
  const player = document.querySelector("#vmplayer_id_html5_api");
  if (player) {
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
      window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: window.currentLanguageGlot }));
    }
  } else {
    window.isLoadedGlot = false;
  }
}, 500);

(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    console.log('lksdjfkjlsdfjkdskljfklsdfjklsdfdsfdsfdsfsd', method, url)
    if (method === 'GET' && url.includes('/api/videos/')) {
        this.addEventListener('loadend', function (e) {
          try{
          const responseText = JSON.parse(e.target.responseText);
          const subtitles = responseText.subtitles;
          const videoId = responseText.video.id
          const subArr = subtitles.map((sub) => ({ lang: sub.srclang, name: sub.label, href: sub.src }))
          window.dispatchEvent(new CustomEvent("get_all_lang_sub", { detail: { subArr, videoId } }));
          }catch(err){
          }
        });
    } else if (url.match(/\/subtitles\//g) !== null) {
      let lang = '';
      try {
        lang = url.split('/subtitles/')[1].split('.')[0];
      } catch (error) {
        
      }
      window.currentLanguageGlot = lang;
      window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: lang }));
    }else if(url.includes("api.viki.io/v4/videos/")){
      this.addEventListener('loadend', function (e) {
        const responseURL = e.target.responseURL;
        const responseTextTest = e.target.responseText;
        if(responseURL.includes("api.viki.io/v4/videos/")){
            try{
            const responseText = JSON.parse(responseTextTest);
            // Get the current page URL - works in both content scripts and background scripts
            const getCurrentUrl = () => {
              // In content script context
              if (window.location && window.location.href) {
                return window.location.href;
              }
              // If we're in a background script context and have access to tabs API
              else if (typeof chrome !== 'undefined' && chrome.tabs) {
                return null; // We'll handle this asynchronously below
              }
              // Fallback
              return null;
            };
            
            const currentUrl = getCurrentUrl();
            
            // Function to process the videoId once we have it
            const processVideoId = (url) => {
              // Try to extract from URL first, then fall back to response ID
              const videoId = extractVikiVideoId(url) || responseText.id;
              
              if (videoId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `https://www.viki.com/api/videos/${videoId}`);
                xhr.setRequestHeader('x-viki-app-ver', '2.174.3');
                xhr.onreadystatechange = this.onreadystatechange;
                xhr.send();
              }
            };
            
            // If we have the URL directly, process it
            if (currentUrl) {
              processVideoId(currentUrl);
            } 
            }catch(err){
            }
          }
      });
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);

