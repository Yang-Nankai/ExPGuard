document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const streamUrlInput = document.getElementById('stream-url');
  const playButton = document.getElementById('play-button');
  const streamHistory = document.getElementById('stream-history');
  const rateButton = document.getElementById('rate-button');
  const providerLink = document.getElementById('provider-link');
  const languageSelector = document.getElementById('language-selector');
  const versionNumber = document.getElementById('version-number');
  
  // Buffer default values for player page
  const defaultBufferSize = '4'; // 4MB
  const defaultPrebufferTime = '5'; // 5 seconds
  
  // Get and display extension version
  const manifest = chrome.runtime.getManifest();
  versionNumber.textContent = `v${manifest.version}`;
  
  // Save default buffer values to storage if not set
  chrome.storage.local.get(['bufferSize', 'prebufferTime'], function(result) {
    if (!result.bufferSize) {
      chrome.storage.local.set({ bufferSize: defaultBufferSize });
    }
    
    if (!result.prebufferTime) {
      chrome.storage.local.set({ prebufferTime: defaultPrebufferTime });
    }
  });

  // Initialize language
  initializeLanguage();

  // Load stream history from storage
  function loadStreamHistory() {
    chrome.storage.local.get('streamHistory', function(result) {
      const history = result.streamHistory || [];
      updateStreamHistoryUI(history);
    });
  }

  // Update stream history UI
  function updateStreamHistoryUI(history) {
    streamHistory.innerHTML = '';
    history.forEach(function(url) {
      const li = document.createElement('li');
      li.className = 'history-item';
      
      // Create URL text span
      const urlSpan = document.createElement('span');
      urlSpan.className = 'history-url';
      urlSpan.textContent = url;
      urlSpan.addEventListener('click', function() {
        // Track history click
        if (window.Analytics) {
          window.Analytics.trackStreamHistoryClicked();
        }
        streamUrlInput.value = url;
        playStream(url);
      });
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.title = 'Copy URL';
      copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
      
      copyButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Copy to clipboard
        navigator.clipboard.writeText(url).then(function() {
          // Visual feedback
          copyButton.classList.add('copied');
          copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          
          // Track copy action
          if (window.Analytics) {
            window.Analytics.trackStreamUrlCopied();
          }
          
          // Reset button after 2 seconds
          setTimeout(function() {
            copyButton.classList.remove('copied');
            copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy:', err);
        });
      });
      
      li.appendChild(urlSpan);
      li.appendChild(copyButton);
      streamHistory.appendChild(li);
    });
    
    // Hide history section if empty
    if (history.length === 0) {
      document.querySelector('.recent-streams').style.display = 'none';
    } else {
      document.querySelector('.recent-streams').style.display = 'block';
    }
  }

  // Play stream in a new tab
  function playStream(url) {
    if (!url) return;
    
    // Track stream play event
    if (window.Analytics) {
      window.Analytics.trackStreamPlayed();
    }
    
    // Use the background script to handle playing the stream
    chrome.runtime.sendMessage({
      action: 'playStream',
      url: url
    });
    
    // Update UI after a small delay to reflect the new history entry
    setTimeout(loadStreamHistory, 500);
  }

  // Initialize language settings
  function initializeLanguage() {
    getCurrentLanguage(function(language) {
      // Set the language selector to the current language
      languageSelector.value = language;
      
      // Apply translations
      applyTranslations();
    });
  }

  // Event Listeners
  playButton.addEventListener('click', function() {
    const url = streamUrlInput.value.trim();
    if (url) {
      playStream(url);
    }
  });

  streamUrlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const url = streamUrlInput.value.trim();
      if (url) {
        playStream(url);
      }
    }
  });
  
  // Rate button event listener - opens Chrome Web Store
  if (rateButton) {
    rateButton.addEventListener('click', function() {
      if (window.Analytics) {
        window.Analytics.trackRateButtonClicked();
      }
      const storeUrl = 'https://chrome.google.com/webstore/detail/' + chrome.runtime.id + '/reviews';
      chrome.tabs.create({ url: storeUrl });
    });
  }
  
  // Feedback button event listener
  const feedbackButton = document.getElementById('feedback-button');
  if (feedbackButton) {
    feedbackButton.addEventListener('click', function() {
      if (window.Analytics) {
        window.Analytics.trackFeedbackFormOpened();
      }
      chrome.tabs.create({ url: 'https://forms.gle/dWvxb9rhRmTRAVDS7' });
    });
  }
  
  // Provider link
  if (providerLink) {
    providerLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (window.Analytics) {
        window.Analytics.trackWebsiteLinkClicked();
      }
      chrome.tabs.create({ url: 'https://iptvplayer.stream' });
    });
  }

  // Language selector event listener
  languageSelector.addEventListener('change', function() {
    const selectedLanguage = languageSelector.value;
    
    // Track language change
    if (window.Analytics) {
      window.Analytics.trackLanguageChanged(selectedLanguage);
    }
    
    setCurrentLanguage(selectedLanguage, function() {
      applyTranslations();
    });
  });

  // Listen for storage changes to update UI
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'local' && changes.streamHistory) {
      updateStreamHistoryUI(changes.streamHistory.newValue || []);
    }
  });

  // Load stream history when popup opens
  loadStreamHistory();
}); 