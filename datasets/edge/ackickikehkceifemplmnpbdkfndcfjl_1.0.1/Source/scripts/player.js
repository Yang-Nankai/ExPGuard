const playerHTMLId = "cvplayer";

const urlParser = new URL(window.location.href);
const url = urlParser.searchParams.get("link") || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const subtitleTrackUrl = urlParser.searchParams.get("subtitle") 
const api_matches = urlParser.searchParams.get("api_matches");

let reloadCounter = 0;

const reqHeadersArray = [];
const resHeadersArray = [];

for (let [key, value] of urlParser.searchParams.entries()) {
  if (key !== 'api_matches' && key !== 'link' && key.startsWith('req__')) {
    reqHeadersArray.push({ key: key.replace('req__', ''), value });
  }
}

for (let [key, value] of urlParser.searchParams.entries()) {
  if (key !== 'api_matches' && key !== 'link' && key.startsWith('res__')) {
    resHeadersArray.push({ key: key.replace('res__', ''), value });
  }
}

// Update ReqHeadersArray with new referer
const updateReqHeadersArrayWithNewReferer = (referer) => {
  const refererIndex = reqHeadersArray.findIndex(header => header.key === "Referer");
  if (refererIndex >= 0) {
    reqHeadersArray[refererIndex].value = referer;
  } else {
    reqHeadersArray.push({ key: "Referer", value: referer });
  }
};

// Send message CV_MODIFY_HEADERS 
const modifyHeaders = (reqHeadersArray, resHeadersArray) => {
  chrome.runtime.sendMessage({
    type: "CV_MODIFY_HEADERS",
    req_data: reqHeadersArray,
    res_data: resHeadersArray
  });
};

// A video stream
const handleIsLive = () => {
  document.querySelector(".plyr__progress__container").innerHTML = '<div class="plyr__custom-live"><span class="live-label">▪ LIVE</span></div>';
  document.querySelector(".plyr__menu").remove();
  document.querySelector(".plyr__time").remove();
}

// The video has an error, a reload button will display
const showReloadButton = () => {
  const reloadButton = document.createElement("button");
  reloadButton.className = "reload-button";
  reloadButton.textContent = "Reload";
  reloadButton.addEventListener("click", () => {
    window.location.reload();
  });
  document.querySelector(".plyr__video-wrapper").appendChild(reloadButton);
};

// Handling fetch Urls returns array playUrls 
const handleFetchUrls = (fetchUrls) => {
  if (!Array.isArray(fetchUrls)) return [];

  const map_fetch_urls = new Map();

  for (const url of fetchUrls) {
    const commentator_uid = url.commentator?.uid;
    const channel_id = url.channel?.uid;
    const channel_name = url.channel?.name;
    const commentator_name =
      commentator_uid && url.commentator?.name
        ? url.commentator?.name
        : "Không xác định";
    const quality = url.quality?.name || "SD";
    const ref = url.channel?.referer || "";
    const link_uid = url.uid || "";
    const link = url.directLink;

    if (!link) continue;

    const key = `${channel_id}-${commentator_uid}`;
    if (map_fetch_urls.has(key)) {
      const data = map_fetch_urls.get(key);
      data.urls.push({
        link_uid,
        quality,
        ref,
        link,
      });
    } else {
      map_fetch_urls.set(key, {
        title: `${channel_name} | ${commentator_name}`,
        urls: [
          {
            link_uid,
            quality,
            ref,
            link,
          },
        ],
      });
    }
  }

  return [...map_fetch_urls.values()];
}

// Check if the link is a youtube link
const youtubeParser = (url) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

const yt_id = youtubeParser(url);

if (yt_id) {
  document.getElementById(playerHTMLId).style.marginBottom = "0";
  document.getElementById(
    playerHTMLId
  ).innerHTML = `<iframe id="z" style="height: 100vh" width="100%" height="100%" src="https://www.youtube.com/embed/${yt_id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
} else if(url.endsWith('.m3u8')) {
  if (reqHeadersArray && reqHeadersArray.length > 0 && resHeadersArray && resHeadersArray.length > 0) modifyHeaders(reqHeadersArray, resHeadersArray);

  const video = document.querySelector("video");

	const player = new Plyr(video, {captions: {active: true, update: true, language: 'en'}});
  const hls = new Hls();

  if (!Hls.isSupported()) {
    video.src = url;
  } else {

    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.ERROR, function (_event, data) {
      if (data.fatal && reloadCounter < 5) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            if (reloadCounter === 0) hls.loadSource(url);
            else {
              setTimeout(() => {
                hls.loadSource(url);
              }, 5000);
            }
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            document.querySelector(".plyr__control--overlaid").remove();
            showReloadButton();
            // hls.recoverMediaError();
            break;
          default:
            hls.destroy();
            break;
        }
        reloadCounter++;
      }
    });
    hls.on(Hls.Events.LEVEL_LOADED, function (_event, data) {
    if (data.details.live) {
        handleIsLive();
    }
      video.play();
      reloadCounter = 0;
    });
  }

  window.player = player;

  if (api_matches) {
    fetch(api_matches)
      .then((response) => response.json())
      .then((data) => {
        const play_urls = handleFetchUrls(data?.play_urls);

        if (play_urls.length > 0) {
          const customButton = document.createElement("button");
          customButton.className = "plyr__control plyr__custom-button";
          customButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2054 10C10.5397 10 10 10.5397 10 11.2054V19.7946C10 20.4603 10.5397 21 11.2054 21H19.7946C20.4603 21 21 20.4603 21 19.7946V11.2054C21 10.5397 20.4603 10 19.7946 10H11.2054ZM8 11.2054C8 9.43509 9.43509 8 11.2054 8H19.7946C21.5649 8 23 9.43509 23 11.2054V19.7946C23 21.5649 21.5649 23 19.7946 23H11.2054C9.43509 23 8 21.5649 8 19.7946V11.2054Z" fill="white"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.47619 4H16.8362C17.6745 4.00239 18.4779 4.33648 19.0707 4.9293C19.6635 5.52211 19.9976 6.32546 20 7.16382L19.9998 7.1875L19.9804 8.11607C19.9689 8.66823 19.512 9.10652 18.9598 9.09502C18.4077 9.08352 17.9694 8.62657 17.9809 8.07441L17.9999 7.15948C17.9964 6.8532 17.8733 6.56028 17.6565 6.34351C17.4376 6.12466 17.1412 6.0012 16.8317 6H8.47786C8.08639 6.0015 7.71135 6.15767 7.43451 6.43451C7.15767 6.71135 7.0015 7.08639 7 7.47786V15.8317C7.0012 16.1412 7.12466 16.4376 7.34351 16.6565C7.56232 16.8753 7.85872 16.9988 8.16812 17H9.09524C9.64752 17 9.5 17.4477 9.5 18C9.5 18.5523 9.64752 19 9.09524 19H8.16667L8.16382 19C7.32546 18.9976 6.52211 18.6635 5.9293 18.0707C5.33648 17.4779 5.00239 16.6745 5 15.8362L5 15.8333V7.47323C5.00272 6.55291 5.36953 5.67106 6.0203 5.0203C6.67106 4.36953 7.55291 4.00272 8.47323 4L8.47619 4Z" fill="white"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.28571 1H13.0028C13.797 1.00226 14.5581 1.31876 15.1197 1.88035C15.6812 2.44193 15.9977 3.20296 16 3.99716L15.9998 4.02083L15.9819 4.87797C15.9704 5.43014 15.5135 5.86843 14.9613 5.85693C14.4091 5.84542 13.9709 5.38848 13.9824 4.83631L13.9999 3.99302C13.9966 3.73084 13.891 3.48015 13.7054 3.29456C13.5178 3.10693 13.2636 3.00107 12.9983 3H5.28741C4.9464 3.00134 4.61971 3.1374 4.37855 3.37855C4.1374 3.61971 4.00134 3.9464 4 4.28741V11.9983C4.00107 12.2636 4.10693 12.5178 4.29456 12.7054C4.4822 12.8931 4.73639 12.999 5.00172 13H5.85714C6.40943 13 6.85714 13.4477 6.85714 14C6.85714 14.5523 6.40943 15 5.85714 15H5L4.99716 15C4.20296 14.9977 3.44193 14.6812 2.88035 14.1197C2.31876 13.5581 2.00226 12.797 2 12.0028L2 12V4.28276C2.00257 3.41291 2.34926 2.57942 2.96434 1.96434C3.57942 1.34926 4.41291 1.00258 5.28276 1L5.28571 1Z" fill="white"/> </svg>';

          const pipButton = document.querySelector('[data-plyr="pip"]');
          pipButton.parentNode.insertBefore(
            customButton,
            pipButton
          );

          customButton.addEventListener("click", () => {
            let divReContent = document.getElementById(
              "related-matches-popup"
            );

            if (divReContent) {
              if (divReContent.style.display === "none") {
                divReContent.style.display = "block";
                player.config.hideControls = false;
              } else {
                divReContent.style.display = "none";
                player.config.hideControls = true;
              }
            } else {
              const playerContent = document.querySelector(".plyr__video-wrapper");
              divReContent = document.createElement("div");
              divReContent.setAttribute("id", "related-matches-popup");
              divReContent.setAttribute("class", "custom-popup-style");
              divReContent.style.display = "block";
              player.config.hideControls = false;

              const contentHtml = play_urls
                .map((item) => {
                  const playUrlsHtml = item.urls
                    .map((dataUrl) => {
                      return `<div class="url-quality background-gray" data-link="${dataUrl.link}" data-referer="${dataUrl.ref}" data-link-uid="${dataUrl.link_uid}">${dataUrl.quality}</div>`;
                    })
                    .join("");

                  return `<div class="related-match-card">
                          <span class="play-urls-title">${item.title}</span>
                          <div class="play-urls-wrapper">${playUrlsHtml}</div>
                        </div>`;
                })
                .join("");


              divReContent.innerHTML = contentHtml;
              playerContent.appendChild(divReContent);

              divReContent.addEventListener("click", (event) => {
                event.stopPropagation();
              });

              divReContent
                .querySelectorAll(".url-quality")
                .forEach((element) => {
                  element.addEventListener("click", function () {
                    const data_link = this.getAttribute("data-link");
                    const data_referer = this.getAttribute("data-referer");
                    const data_link_uid = this.getAttribute("data-link-uid");
                    reloadCounter = 0;

                    if (data_referer) {
                      updateReqHeadersArrayWithNewReferer(data_referer);
                      modifyHeaders(reqHeadersArray, resHeadersArray);
                    }

                    if (!Hls.isSupported()) {
                      video.src = data_link;
                    } else {
                      hls.loadSource(data_link);
                      hls.attachMedia(video);

                      hls.on(Hls.Events.ERROR, function (_event, data) {
                        if (data.fatal && reloadCounter < 5) {
                          switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                              if (reloadCounter === 0) hls.loadSource(data_link);
                              else {
                                setTimeout(() => {
                                  hls.loadSource(data_link);
                                }, 5000);
                              }
                              break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                              document.querySelector(".plyr__control--overlaid").remove();
                              showReloadButton();
                              // hls.recoverMediaError();
                              break;
                            default:
                              hls.destroy();
                              break;
                          }
                          reloadCounter++;
                        }
                      });

                      hls.on(Hls.Events.LEVEL_LOADED, function (_event, _data) {
                        video.play();
                        reloadCounter = 0;
                      });
                    }

                    divReContent.style.display = "none";
                    player.config.hideControls = true;

                    divReContent
                      .querySelectorAll(".url-quality")
                      .forEach((element) => {
                        const elementDataLinkUid =
                          element.getAttribute("data-link-uid");
                        if (elementDataLinkUid === data_link_uid) {
                          element.classList.add("background-primary");
                          element.classList.remove("background-gray");
                        } else {
                          element.classList.add("background-gray");
                          element.classList.remove("background-primary");
                        }
                      });
                  });
                });
            }

            document.addEventListener("click", (event) => {
              if (divReContent && divReContent.style.display === "block" && !divReContent.contains(event.target) && !customButton.contains(event.target)) {
                divReContent.style.display = "none";
                player.config.hideControls = true;
              }
            });
          });
        }
      })
      .catch(console.log);
  }
} else {
  const video = document.querySelector("video");
  video.src = url;
  // Optionally, handle subtitles if provided
  if (subtitleTrackUrl) {
    const track = document.createElement("track");
    track.kind = "subtitles";
    track.label = "Custom Subtitle";
    track.srclang = "en";
    track.src = subtitleTrackUrl;
    video.appendChild(track);
  }
  const player = new Plyr(video, {captions: {active: true, update: true, language: 'en'}});
  window.play = player
}
