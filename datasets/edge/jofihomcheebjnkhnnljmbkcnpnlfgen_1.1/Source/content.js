let isAutoplayEnabled = false;

// Function to detect video/audio and display info
function detectMedia() {
  const mediaElements = [...document.querySelectorAll('video, audio')];
  const playingElement = mediaElements.find(media => !media.paused);

  if (playingElement) {
    const mediaName = playingElement.getAttribute('title') || document.title;
    const websiteName = window.location.hostname;
    chrome.storage.local.set({
      mediaInfo: { mediaName, websiteName }
    });
  }
}

// Function to handle autoplay
function handleAutoplay() {
  const mediaElements = [...document.querySelectorAll('video, audio')];
  mediaElements.forEach(media => {
    media.onpause = () => {
      if (isAutoplayEnabled) media.play();
    };
  });
}

// Listen for commands
chrome.runtime.onMessage.addListener((request) => {
  const mediaElements = [...document.querySelectorAll('video, audio')];
  const videoElement = document.querySelector('video');

  if (request.command === 'autoplay') {
    isAutoplayEnabled = request.state;
    handleAutoplay();
  } else if (request.command === 'pause') {
    mediaElements.forEach(media => media.pause());
  } else if (request.command === 'play') {
    mediaElements.forEach(media => media.play());
  } else if (request.command === 'getInfo') {
    detectMedia();
  }

  // YouTube specific handling
  if (window.location.hostname.includes('youtube.com')) {
    const youtubePlayer = document.querySelector('video');
    if (request.command === 'pause') {
      youtubePlayer.pause();
    } else if (request.command === 'play') {
      youtubePlayer.play();
    }
  }
});

// Detect media on initial load
detectMedia();
