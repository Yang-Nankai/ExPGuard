document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const bufferSizeSelect = document.getElementById('buffer-size');
  const prebufferTimeSelect = document.getElementById('prebuffer-time');
  const reloadButton = document.getElementById('reload-button');
  const languageSelector = document.getElementById('language-selector');
  
  // Get the stream URL from the query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const streamUrl = urlParams.get('url');
  
  if (!streamUrl) {
    alert('No stream URL provided');
    return;
  }
  
  // Update document title with stream URL (shortened if needed)
  document.title = 'IPTV - ' + (streamUrl.length > 50 ? streamUrl.substring(0, 47) + '...' : streamUrl);
  
  // Error modal function for all types of errors
  function showErrorModal(errorType, errorDetails) {
    // Track playback error
    if (window.Analytics) {
      window.Analytics.trackPlaybackError(errorType || 'generic');
    }
    
    const modal = document.getElementById('playbackErrorModal');
    if (modal) {
      // Store error info for language changes
      modal.setAttribute('data-error-type', errorType || 'generic');
      modal.setAttribute('data-error-details', errorDetails || '');
      
      // Update the error message based on error type
      getCurrentLanguage(function(language) {
        const errorMessageP = document.getElementById('errorMessageP');
        if (errorMessageP) {
          // Different handling based on error type
          if (errorType === 'cors') {
            // Handle CORS errors with the special formatting
            const messageTemplate = getTranslation('corsErrorMessage', language);
            const corsPolicy = getTranslation('corsPolicy', language);
            const formattedMessage = messageTemplate.replace('[CORS_POLICY]', 
              `<strong style="text-decoration: underline;">${corsPolicy}</strong>`);
            errorMessageP.innerHTML = formattedMessage;
          } else {
            // Generic error handling
            const prefix = getTranslation('genericErrorPrefix', language);
            
            // Try to get a translation for common error types
            let errorMessage = '';
            if (errorDetails) {
              if (errorDetails.includes('manifest') && errorDetails.includes('load')) {
                errorMessage = getTranslation('manifestLoadError', language);
              } else {
                // Format error details if not translated
                errorMessage = errorDetails.charAt(0).toUpperCase() + errorDetails.slice(1)
                  .replace(/_/g, ' ').toLowerCase();
              }
            }
            
            errorMessageP.innerHTML = prefix + errorMessage;
          }
        }
        
        // Show or hide the website promotion elements based on error type
        const websiteAlternativeP = document.querySelector('[data-i18n="corsAlternative"]');
        const websiteLink = document.querySelector('[data-i18n="playOnWebsite"]');
        
        if (websiteAlternativeP && websiteLink) {
          if (errorType === 'cors') {
            // Show promotion for CORS errors
            websiteAlternativeP.style.display = 'block';
            websiteLink.style.display = 'inline-block';
          } else {
            // Hide promotion for other errors
            websiteAlternativeP.style.display = 'none';
            websiteLink.style.display = 'none';
          }
        }
      });
      
      modal.style.display = 'flex';
      // Trigger opacity transition after display is set to flex
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 10);
    }
  }
  
  // Legacy function for backward compatibility
  function showCorsErrorModal() {
    showErrorModal('cors');
  }
  
  // Initialize language
  initializeLanguage();
  
  // Load user buffer preferences from storage
  loadBufferPreferences();
  
  // Initialize language settings
  function initializeLanguage() {
    getCurrentLanguage(function(language) {
      // Set the language selector to the current language
      languageSelector.value = language;
      
      // Apply translations
      applyTranslations();
    });
  }
  
  // Language selector event listener
  languageSelector.addEventListener('change', function() {
    const selectedLanguage = languageSelector.value;
    
    // Track language change (don't track during error modal updates to avoid duplicate)
    if (window.Analytics) {
      window.Analytics.trackLanguageChanged(selectedLanguage);
    }
    
    setCurrentLanguage(selectedLanguage, function() {
      applyTranslations();
      
      // Update error message if modal is visible
      const playbackErrorModal = document.getElementById('playbackErrorModal');
      if (playbackErrorModal && playbackErrorModal.style.display === 'flex') {
        // Re-render the current error message with the new language
        // We'll need to store the error type and details to re-render it
        const errorType = playbackErrorModal.getAttribute('data-error-type') || 'generic';
        const errorDetails = playbackErrorModal.getAttribute('data-error-details') || '';
        
        // Temporarily disable analytics tracking for modal update
        const tempAnalytics = window.Analytics;
        window.Analytics = null;
        showErrorModal(errorType, errorDetails);
        window.Analytics = tempAnalytics;
      }
    });
  });
  
  // Initialize the player
  const player = videojs('iptv-player', {
    controls: true,
    autoplay: false,
    preload: 'auto',
    fluid: false,
    responsive: true,
    fill: true,
    controlBar: {
      children: [
        'playToggle',
        'volumePanel',
        'progressControl',
        'currentTimeDisplay',
        'timeDivider',
        'durationDisplay',
        'pictureInPictureToggle',
        'fullscreenToggle'
      ],
      volumePanel: {
        inline: true,
        vertical: false
      }
    },
    html5: {
      hls: {
        overrideNative: true
      },
      nativeTextTracks: false
    }
  });
  
  // Hide default Video.js error display (we'll use our custom modal)
  if (player.errorDisplay) {
    player.errorDisplay.hide();
  }
  
  // Improve control bar behavior
  player.on('play', function() {
    // Ensure controls show briefly when playback starts
    player.userActive(true);
    setTimeout(() => player.userActive(false), 2000);
  });
  
  // Custom UI adjustments for mobile
  const adjustForMobileView = () => {
    if (window.innerWidth <= 768) {
      // Handle mobile-specific adjustments if needed
      player.controlBar.addClass('vjs-mobile-view');
    } else {
      player.controlBar.removeClass('vjs-mobile-view');
    }
  };
  
  // Run once and add resize listener
  adjustForMobileView();
  window.addEventListener('resize', adjustForMobileView);
  
  // MPEGTS.js player instance
  let mpegtsPlayer = null;
  
  // Load buffer preferences from storage
  function loadBufferPreferences() {
    chrome.storage.local.get(['bufferSize', 'prebufferTime'], function(result) {
      if (result.bufferSize && bufferSizeSelect) {
        bufferSizeSelect.value = result.bufferSize;
      }
      
      if (result.prebufferTime && prebufferTimeSelect) {
        prebufferTimeSelect.value = result.prebufferTime;
      }
      
      // Start playing the stream after loading preferences
      playStream(streamUrl);
    });
    
    // Add event listeners to save preferences when changed
    if (bufferSizeSelect) {
      bufferSizeSelect.addEventListener('change', function() {
        saveBufferPreferences();
        // Reload the stream to apply new buffer settings
        playStream(streamUrl);
      });
    }
    
    if (prebufferTimeSelect) {
      prebufferTimeSelect.addEventListener('change', function() {
        saveBufferPreferences();
        // Reload the stream to apply new buffer settings
        playStream(streamUrl);
      });
    }
    
    // Add event listener for reload button
    if (reloadButton) {
      reloadButton.addEventListener('click', function() {
        // Track stream reload
        if (window.Analytics) {
          window.Analytics.trackStreamReloaded();
        }
        playStream(streamUrl);
      });
    }
  }
  
  // Save buffer preferences to storage
  function saveBufferPreferences() {
    if (bufferSizeSelect && prebufferTimeSelect) {
      const bufferSize = bufferSizeSelect.value;
      const prebufferTime = prebufferTimeSelect.value;
      
      // Track buffer settings change
      if (window.Analytics) {
        window.Analytics.trackBufferSettingsChanged(bufferSize, prebufferTime);
      }
      
      chrome.storage.local.set({
        bufferSize: bufferSize,
        prebufferTime: prebufferTime
      });
    }
  }
  
  // Helper function to create a buffering overlay
  function createBufferingOverlay(message, countdownSeconds = 0) {
    const overlay = document.createElement('div');
    overlay.id = countdownSeconds > 0 ? 'prebuffering-overlay' : 'rebuffering-overlay';
    
    let content = `<div>${message}</div>`;
    if (countdownSeconds > 0) {
      content = `<div>${message}<span id="buffer-count">${countdownSeconds}</span>s</div>`;
    }
    
    overlay.innerHTML = content;
    overlay.style.cssText = 'position:absolute; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.7); color:white; display:flex; justify-content:center; align-items:center; z-index:2147483647;';
    
    // Append overlay to the player container
    player.el().appendChild(overlay);
    
    return overlay;
  }
  
  // Initialize player with HLS.js when necessary
  function initHlsPlayer(url) {
    // Track format detection
    if (window.Analytics) {
      window.Analytics.trackStreamFormatDetected('hls');
    }
    
    // If HLS.js is supported
    if (Hls.isSupported()) {
      try {
        // Get user-selected buffer settings for consistency with MPEG-TS
        const bufferSizeSelect = document.getElementById('buffer-size');
        const prebufferTimeSelect = document.getElementById('prebuffer-time');
        
        // Convert to actual values with fallbacks
        const bufferSizeMB = parseInt(bufferSizeSelect?.value || '4', 10);
        const prebufferTimeSec = parseInt(prebufferTimeSelect?.value || '5', 10);
        
        // Create HLS configuration with buffer settings
        const hlsConfig = {
          maxBufferLength: 30,
          maxMaxBufferLength: 600,
          liveSyncDurationCount: 3,
          enableWorker: true,
          // Use buffer size setting to determine max buffer size
          // Convert MB to bytes for segment sizes
          maxBufferSize: bufferSizeMB * 1024 * 1024
        };
        
        console.log(`Initializing HLS player with ${bufferSizeMB}MB buffer`);
        
        const hls = new Hls(hlsConfig);
        
        const videoElement = player.el().querySelector('video');
        if (!videoElement) {
          console.error('Could not find video element');
          return false;
        }
        
        // Show buffering indicator for consistency with mpegts mode
        const bufferingOverlay = createBufferingOverlay(
          `Building ${bufferSizeMB}MB buffer for smoother playback...`, 
          prebufferTimeSec
        );
        
        // Load the source but don't play immediately
        hls.loadSource(url);
        hls.attachMedia(videoElement);
        
        // Pre-buffer for consistent experience with MPEG-TS
        let prebufferTime = prebufferTimeSec;
        const countdownElement = document.getElementById('buffer-count');
        
        const prebufferInterval = setInterval(() => {
          prebufferTime--;
          if (countdownElement) {
            countdownElement.textContent = prebufferTime;
          }
          
          if (prebufferTime <= 0) {
            clearInterval(prebufferInterval);
            if (bufferingOverlay.parentNode) {
              bufferingOverlay.parentNode.removeChild(bufferingOverlay);
            }
            
            // Start playback after pre-buffering
            player.play().catch(e => {
              console.error('Error starting HLS playback:', e);
            });
          }
        }, 1000);
        
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          // Don't automatically play - let the prebuffer timer handle this
          console.log('HLS manifest parsed, waiting for buffer...');
        });
        
        hls.on(Hls.Events.ERROR, function(event, data) {
          console.error('HLS error:', data);
          if (data.fatal) {
            // Clear the prebuffer interval if it exists
            if (typeof prebufferInterval !== 'undefined' && prebufferInterval) {
              clearInterval(prebufferInterval);
            }
            
            // Remove the overlay if it exists
            if (typeof bufferingOverlay !== 'undefined' && bufferingOverlay && bufferingOverlay.parentNode) {
              bufferingOverlay.parentNode.removeChild(bufferingOverlay);
            }

            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              if (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR || 
                  data.details === Hls.ErrorDetails.LEVEL_LOAD_ERROR ||
                  data.details === Hls.ErrorDetails.FRAG_LOAD_ERROR) {
                
                let xhr = data.networkDetails; // HLS.js often provides the XHR object here
                // Check for XHR status 0 (common for CORS blocked requests)
                // or if manifest load failed without XHR details (also a strong CORS indicator)
                if ((xhr && xhr.status === 0 && xhr.readyState === 4) || 
                    (!xhr && data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR)) {
                      console.warn('Suspected CORS error. Displaying modal.', data);
                      showErrorModal('cors');
                      if (hls && typeof hls.stopLoad === 'function') {
                        hls.stopLoad(); // Stop further loading attempts
                      }
                      // We might want to destroy HLS instance too or Video.js will keep retrying with some techs.
                      // player.error(null); // Clear any Video.js error
                      // player.reset(); 
                      return; // Handled, no further processing for this error
                }
              }
            }
            
            // If it's fatal but not our CORS error, let Video.js display its default error or a custom one.
            // The error type (e.g., MANIFEST_LOAD_ERROR) can be used for a generic message.
            let errorMessage = 'Playback Error: Could not load the stream.';
            if (data.details) {
                errorMessage = `Playback Error: ${data.details.replace(/_/g, ' ').toLowerCase()}`;
            }
            // Use our custom error modal instead of Video.js error
            showErrorModal('generic', data.details || 'unknown error');
            // Stop loading
            if (hls && typeof hls.stopLoad === 'function') {
              hls.stopLoad();
            }
            // Fallback for other fatal errors - this was missing before
            // For example, if it's a MEDIA_ERROR like manifestIncompatibleCodecsError
            // The player.error call above should handle this for Video.js

          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            console.warn('HLS media error (non-fatal):', data);
            if (data.details === 'bufferStalledError') {
                // Handle buffer stalls, maybe show a specific message or attempt recovery
            } else if (data.details === 'bufferSeekOverHole') {
                console.warn('Buffer seek over hole, trying to recover...');
                hls.recoverMediaError();
            } else if (data.fatal) { // Should be caught by above, but as a safeguard
                 player.error({ code: data.type, message: `Media Error: ${data.details}` });
            }
            // Non-fatal media errors can sometimes be recovered or ignored
            // Depending on the `data.details`
          }
          // Consider other error types and details as needed
        });
        
        // Store hls instance for later reference/cleanup
        player.hls = hls;
        return true;
      } catch (e) {
        console.error('Error initializing HLS.js:', e);
        return false;
      }
    }
    // If the browser has native HLS support (Safari, iOS, etc)
    else if (player.canPlayType && player.canPlayType('application/vnd.apple.mpegurl')) {
      try {
        // Get user-selected buffer settings for consistency
        const bufferSizeSelect = document.getElementById('buffer-size');
        const prebufferTimeSelect = document.getElementById('prebuffer-time');
        
        // Convert to actual values with fallbacks
        const bufferSizeMB = parseInt(bufferSizeSelect?.value || '4', 10);
        const prebufferTimeSec = parseInt(prebufferTimeSelect?.value || '5', 10);
        
        // Show buffering indicator for native HLS too
        const bufferingOverlay = createBufferingOverlay(
          `Building buffer for smoother playback...`, 
          prebufferTimeSec
        );
        
        player.src({
          src: url,
          type: 'application/vnd.apple.mpegurl'
        });
        
        // Pre-buffer for consistent experience
        let prebufferTime = prebufferTimeSec;
        const countdownElement = document.getElementById('buffer-count');
        
        const prebufferInterval = setInterval(() => {
          prebufferTime--;
          if (countdownElement) {
            countdownElement.textContent = prebufferTime;
          }
          
          if (prebufferTime <= 0) {
            clearInterval(prebufferInterval);
            if (bufferingOverlay.parentNode) {
              bufferingOverlay.parentNode.removeChild(bufferingOverlay);
            }
            
            // Start playback after pre-buffering
            player.play().catch(e => {
              console.error('Error starting native HLS playback:', e);
            });
          }
        }, 1000);
        
        return true;
      } catch (e) {
        console.error('Error with native HLS playback:', e);
        return false;
      }
    } else {
      console.error('HLS is not supported in this browser');
      alert('Your browser does not support HLS playback');
      return false;
    }
  }
  
  // Initialize MPEGTS player for TS streams
  function initMpegtsPlayer(url) {
    // Track format detection
    if (window.Analytics) {
      window.Analytics.trackStreamFormatDetected('mpegts');
    }
    
    // Check if mpegts.js is available and supported
    if (typeof mpegts !== 'undefined' && mpegts.getFeatureList().mseLivePlayback) {
      // Clean up previous mpegts player if exists
      if (mpegtsPlayer) {
        try {
          mpegtsPlayer.destroy();
        } catch (e) {
          console.warn('Error destroying previous MPEGTS player instance:', e);
        }
        mpegtsPlayer = null;
      }
      
      // Get user-selected buffer settings
      const bufferSizeSelect = document.getElementById('buffer-size');
      const prebufferTimeSelect = document.getElementById('prebuffer-time');
      
      // Convert to actual values with fallbacks
      const bufferSizeMB = parseInt(bufferSizeSelect?.value || '4', 10);
      const prebufferTimeSec = parseInt(prebufferTimeSelect?.value || '5', 10);
      
      console.log(`Initializing MPEGTS player with ${bufferSizeMB}MB buffer and ${prebufferTimeSec}s pre-buffer`);
      
      // Buffer status tracking variables
      const bufferTracking = {
        lowBufferThreshold: 0.5, // seconds
        rebuildBufferTarget: prebufferTimeSec, // Use the same value as prebuffer
        isRebuildingBuffer: false,
        monitoringInterval: null,
        lastVideoTime: 0,
        stuckCounter: 0,
      };
      
      // Super aggressive buffer settings - massive increase
      const bufferConfig = {
        // Enormous stash buffer for maximum stability
        enableStashBuffer: true,
        stashInitialSize: bufferSizeMB * 1024 * 1024, // User-selected buffer size in MB
        
        // Disable latency chasing to prioritize smooth playback over latency
        liveBufferLatencyChasing: false,
        liveBufferLatencyMaxLatency: 10.0, // Increased to allow much more buffer
        liveBufferLatencyMinRemain: 2.0, // Higher minimum to prevent buffer exhaustion
        
        // Very aggressive source buffer cleanup settings
        autoCleanupSourceBuffer: true,
        autoCleanupMaxBackwardDuration: 10, // Only keep 10 seconds back
        autoCleanupMinBackwardDuration: 5, // Minimum 5 seconds back
        
        // Radical seek optimization
        seekType: 'range',
        reuseRedirectedURL: true,
        
        // Critical playback optimizations
        fixAudioTimestampGap: true,
        accurateSeek: false,
        
        // Progressive loading optimizations
        rangeLoadZeroStart: false,
        
        // Extended loading attempts
        maxLoadingRetry: 5, // More retries
        loadingRetryDelay: 1000, // 1 second between retries
        
        // HTTP request tweaks for better network performance
        customSeekHandler: null,
        
        // Disabled CPU-intensive features
        tsCheckerEnabled: false,
        calculateAudioPtsBase: false, // Disable timestamp recalculation for smoother playback
        
        // Stats monitoring (keep this for debugging)
        statisticsInfoInterval: 1000,
      };
      
      // Create a new mpegts player with aggressively optimized settings
      mpegtsPlayer = mpegts.createPlayer({
        type: 'mpegts',
        isLive: true,
        url: url
      }, bufferConfig);
      
      // Attach to video element
      const videoElement = player.el().querySelector('video');
      mpegtsPlayer.attachMediaElement(videoElement);
      
      // Load the player but don't play yet
      mpegtsPlayer.load();
      
      // Add a message to indicate pre-buffering - use the common function
      const prebufferingOverlay = createBufferingOverlay(
        `Building ${bufferSizeMB}MB buffer for smoother playback...`,
        prebufferTimeSec
      );
      
      // Pre-buffer for user-selected time before starting playback
      console.log(`Pre-buffering for ${prebufferTimeSec} seconds for smoother playback`);
      let prebufferTime = prebufferTimeSec;
      const countdownElement = document.getElementById('buffer-count');
      
      const prebufferInterval = setInterval(() => {
        prebufferTime--;
        if (countdownElement) {
          countdownElement.textContent = prebufferTime;
        }
        
        if (prebufferTime <= 0) {
          clearInterval(prebufferInterval);
          if (prebufferingOverlay.parentNode) {
            prebufferingOverlay.parentNode.removeChild(prebufferingOverlay);
          }
          
          // Start playback after pre-buffering
          mpegtsPlayer.play();
          
          // Start buffer monitoring
          startBufferMonitoring(videoElement, mpegtsPlayer, bufferTracking);
        }
      }, 1000);
      
      // Set up buffer monitoring and adaptation
      function startBufferMonitoring(videoElement, mpegtsPlayer, tracking) {
        tracking.lastVideoTime = videoElement.currentTime;
        
        tracking.monitoringInterval = setInterval(() => {
          // Get current buffer status
          const buffered = videoElement.buffered;
          let bufferEnd = 0;
          let bufferLength = 0;
          
          if (buffered.length > 0) {
            bufferEnd = buffered.end(buffered.length - 1);
            bufferLength = bufferEnd - videoElement.currentTime;
          }
          
          // Check if video is progressing
          const isProgressing = Math.abs(videoElement.currentTime - tracking.lastVideoTime) > 0.01;
          tracking.lastVideoTime = videoElement.currentTime;
          
          // Log buffer status every 5 seconds (for debugging)
          if (Math.floor(Date.now() / 5000) % 1 === 0) {
            console.debug(`Buffer status: ${bufferLength.toFixed(2)}s remaining, video ${isProgressing ? 'playing' : 'stalled'}`);
          }
          
          // Handle extremely low buffer or video stall
          if (bufferLength < tracking.lowBufferThreshold || !isProgressing) {
            tracking.stuckCounter++;
            
            // If consistently low buffer or stalled playback
            if (tracking.stuckCounter >= 3 && !tracking.isRebuildingBuffer) {
              tracking.isRebuildingBuffer = true;
              console.warn(`Buffer critically low (${bufferLength.toFixed(2)}s) or playback stalled. Pausing to rebuild buffer...`);
              
              // Pause playback to rebuild buffer
              mpegtsPlayer.pause();
              
              // Create rebuilding buffer notification using the helper function
              const rebufferingOverlay = createBufferingOverlay('Rebuilding buffer...');
              
              // Wait to rebuild buffer
              setTimeout(() => {
                if (rebufferingOverlay.parentNode) {
                  rebufferingOverlay.parentNode.removeChild(rebufferingOverlay);
                }
                console.log('Resuming playback after buffer rebuild');
                mpegtsPlayer.play();
                tracking.isRebuildingBuffer = false;
                tracking.stuckCounter = 0;
              }, tracking.rebuildBufferTarget * 1000); // Wait for X seconds to rebuild buffer
            }
          } else {
            // Reset stuck counter if buffer is healthy
            tracking.stuckCounter = 0;
          }
        }, 1000);
      }
      
      // Enhanced error handling with more aggressive recovery
      mpegtsPlayer.on(mpegts.Events.ERROR, (type, details) => {
        console.error('MPEGTS.js Error:', type, details);
        
        // Attempt to recover from errors with more robust recovery
        if (type === mpegts.ErrorTypes.NETWORK_ERROR) {
          console.log('Attempting robust recovery from network error...');
          
          // Multiple reconnection attempts with exponential backoff
          let retryCount = 0;
          const maxRetries = 5;
          const retry = () => {
            if (retryCount < maxRetries) {
              const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
              console.log(`Retry attempt ${retryCount + 1}/${maxRetries} in ${delay}ms`);
              
              setTimeout(() => {
                mpegtsPlayer.unload();
                mpegtsPlayer.load();
                mpegtsPlayer.play();
                retryCount++;
              }, delay);
            } else {
              // After max retries, show error modal
              showErrorModal('generic', 'network error after multiple retry attempts');
            }
          };
          
          retry();
        } else if (type === mpegts.ErrorTypes.MEDIA_ERROR) {
          console.log('Attempting recovery from media error...');
          
          // Try once to recover from media error
          mpegtsPlayer.unload();
          mpegtsPlayer.load();
          // Wait a bit longer before playing to ensure stable playback
          setTimeout(() => {
            mpegtsPlayer.play();
          }, 2000);
          
          // Show error modal if the error details indicate a serious problem
          if (details && (details.includes('decode') || details.includes('fatal'))) {
            showErrorModal('generic', details || 'media error');
          }
        }
      });
      
      // Log statistics for debugging
      mpegtsPlayer.on(mpegts.Events.STATISTICS_INFO, (stats) => {
        // Reduce logging frequency to every 5 seconds to avoid console spam
        if (Math.floor(Date.now() / 5000) % 1 === 0) {
          console.debug('MPEGTS Stats:', stats);
        }
      });
      
      // Store the mpegts player in the video.js player for later cleanup
      player.mpegtsPlayer = mpegtsPlayer;
      
      // Also store the buffer tracking for cleanup
      player.bufferTracking = bufferTracking;
      
      return true;
    } else {
      console.error('MPEGTS is not supported in this browser');
      return false;
    }
  }

  // Clean up previous stream
  function cleanupPreviousStream() {
    // Remove any overlay elements that might be leftover
    const overlays = document.querySelectorAll('#prebuffering-overlay, #rebuffering-overlay');
    overlays.forEach(overlay => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    });
    
    // Safely cleanup HLS player if it exists
    if (player.hls) {
      try {
        player.hls.destroy();
      } catch (e) {
        console.warn('Error destroying HLS player:', e);
      }
      player.hls = null;
    }
    
    // Safely cleanup MPEGTS player if it exists
    if (player.mpegtsPlayer) {
      // Clear buffer monitoring interval if it exists
      if (player.bufferTracking && player.bufferTracking.monitoringInterval) {
        clearInterval(player.bufferTracking.monitoringInterval);
        player.bufferTracking.monitoringInterval = null;
      }
      
      try {
        if (player.mpegtsPlayer && typeof player.mpegtsPlayer.destroy === 'function') {
          player.mpegtsPlayer.destroy();
        }
      } catch (e) {
        console.warn('Error destroying MPEGTS player:', e);
      }
      
      player.mpegtsPlayer = null;
      player.bufferTracking = null;
    }

    // Safely cleanup DASH player if it exists
    if (player.dash) {
      try {
        if (player.dash && typeof player.dash.destroy === 'function') {
          player.dash.destroy();
        }
      } catch (e) {
        console.warn('Error destroying DASH player:', e);
      }
      player.dash = null;
    }
    
    try {
      player.reset();
    } catch (e) {
      console.warn('Error resetting player:', e);
    }
  }

  // Detect stream type based on URL or headers
  function detectStreamType(url) {
    // Simple detection based on URL extension
    const lowerUrl = url.toLowerCase();
    
    // Common HLS indicators
    if (lowerUrl.includes('.m3u8') || 
        lowerUrl.includes('/hls/') || 
        lowerUrl.includes('playlist') ||
        lowerUrl.includes('manifest')) {
      return 'hls';
    } 
    
    // DASH indicators
    if (lowerUrl.includes('.mpd') || 
        lowerUrl.includes('/dash/') || 
        lowerUrl.includes('dash-manifest') ||
        lowerUrl.includes('manifest.mpd')) {
      return 'dash';
    }
    
    // MP4 indicators
    if (lowerUrl.includes('.mp4') || 
        lowerUrl.includes('/mp4/') || 
        lowerUrl.includes('video/mp4') ||
        lowerUrl.endsWith('.mp4')) {
      return 'mp4';
    }
    
    // Common MPEG-TS indicators
    if (lowerUrl.includes('.ts') || 
        lowerUrl.includes('/ts/') || 
        lowerUrl.includes('mpegts') || 
        lowerUrl.includes('mpeg-ts') ||
        lowerUrl.includes('mpts') ||
        lowerUrl.includes('dvr') ||
        lowerUrl.includes('raw')) {
      return 'mpegts';
    }
    
    // Check for UDP/RTP stream patterns (often used for MPEG-TS)
    if (lowerUrl.startsWith('udp://') || 
        lowerUrl.startsWith('rtp://') ||
        lowerUrl.includes('multicast')) {
      return 'mpegts';
    }
    
    // Check for common IPTV provider patterns
    if (lowerUrl.includes('iptv') || 
        lowerUrl.includes('iptvpro') ||
        lowerUrl.includes('stalker')) {
      // Many IPTV providers use MPEG-TS by default
      return 'try-mpegts-first';
    }
    
    // Additional heuristic checks omitted for brevity...
    
    // Default to HLS as it's the most common standard format
    return 'try-mpegts-first';
  }

  // Play stream
  function playStream(url) {
    if (!url) return;
    
    console.log('Starting playback for stream:', url);
    
    // Ensure videojs player is ready before proceeding
    if (!player.isReady_) {
      console.warn('Player not ready, waiting...');
      player.ready(() => {
        playStream(url);
      });
      return;
    }
    
    // Stop any current playback first
    try {
      player.pause();
    } catch (e) {
      console.warn('Error pausing player:', e);
    }
    
    // Clean up previous stream
    cleanupPreviousStream();
    
    // Try to detect the stream type
    const streamType = detectStreamType(url);
    let playbackSuccessful = false;
    
    // For MPEG-TS streams, perform network optimization
    if (streamType === 'mpegts' || streamType === 'try-mpegts-first') {
      console.log('Optimizing for MPEG-TS stream:', url);
      
      // Preload connection to improve initial loading time
      try {
        let preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = new URL(url).origin;
        document.head.appendChild(preconnect);
        
        // Schedule cleanup of preconnect element
        setTimeout(() => {
          if (document.head.contains(preconnect)) {
            document.head.removeChild(preconnect);
          }
        }, 10000);
      } catch (e) {
        console.warn('Error setting up preconnect:', e);
      }
    }
    
    try {
      if (streamType === 'mpegts' || streamType === 'try-mpegts-first') {
        // Try MPEGTS first
        console.log('Trying MPEG-TS playback for:', url);
        playbackSuccessful = initMpegtsPlayer(url);
        
        // If MPEGTS failed and we were in "try" mode, fall back to HLS
        if (!playbackSuccessful && streamType === 'try-mpegts-first') {
          console.log('MPEG-TS playback failed, falling back to HLS');
          
          // Track fallback
          if (window.Analytics) {
            window.Analytics.trackFormatFallback('mpegts', 'hls', false);
          }
          
          playbackSuccessful = initHlsPlayer(url);
          
          // Track fallback success
          if (playbackSuccessful && window.Analytics) {
            window.Analytics.trackFormatFallback('mpegts', 'hls', true);
          }
        }
      } else if (streamType === 'dash') {
        // Use DASH playback
        console.log('Using DASH playback for:', url);
        playbackSuccessful = initDashPlayer(url);
      } else if (streamType === 'mp4') {
        // Use MP4 playback
        console.log('Using MP4 playback for:', url);
        playbackSuccessful = initMp4Player(url);
      } else {
        // Default to HLS
        console.log('Using HLS playback for:', url);
        playbackSuccessful = initHlsPlayer(url);
      }
      
      if (!playbackSuccessful) {
        throw new Error('Initial playback method failed');
      }
    } catch (error) {
      console.error('Error playing stream:', error);
      
      // If one method failed, try fallback methods in order
      try {
        console.log('Trying fallback playback methods');
        
        // Try different formats based on what failed
        if (streamType === 'dash') {
          // DASH failed, try HLS then MPEG-TS
          playbackSuccessful = initHlsPlayer(url) || initMpegtsPlayer(url);
        } else if (streamType === 'mp4') {
          // MP4 failed, try HLS then DASH
          playbackSuccessful = initHlsPlayer(url) || initDashPlayer(url);
        } else if (streamType === 'mpegts' || streamType === 'try-mpegts-first') {
          // MPEG-TS failed, try HLS then DASH then MP4
          playbackSuccessful = initHlsPlayer(url) || initDashPlayer(url) || initMp4Player(url);
        } else {
          // HLS failed, try MPEG-TS then DASH then MP4
          playbackSuccessful = initMpegtsPlayer(url) || initDashPlayer(url) || initMp4Player(url);
        }
        
        if (!playbackSuccessful) {
          throw new Error('All fallback playback methods failed');
        }
      } catch (fallbackError) {
        console.error('Failed to play stream with fallback methods:', fallbackError);
        
        // Last resort: try as direct source
        try {
          console.log('Trying direct playback as last resort');
          player.src({
            src: url
          });
          player.play().catch(e => {
            console.error('Error starting playback:', e);
            showErrorModal('generic', 'Failed to play the stream. Please check the URL and try again.');
          });
        } catch (directError) {
          console.error('Failed to play stream as direct source:', directError);
          showErrorModal('generic', 'Failed to play the stream. Please check the URL and try again.');
        }
      }
    }
  }

  // Add an error handler to display player errors to the user
  player.on('error', function() {
    const error = player.error();
    console.error('Video.js error:', error);
    
    // Use our custom error modal for Video.js errors too
    if (error && error.message) {
      showErrorModal('generic', error.message);
    } else {
      showErrorModal('generic', 'unknown playback error');
    }
  });

  // Initialize DASH player
  function initDashPlayer(url) {
    // Track format detection
    if (window.Analytics) {
      window.Analytics.trackStreamFormatDetected('dash');
    }
    
    // Check if dash.js is available
    if (typeof dashjs !== 'undefined') {
      try {
        // Get user-selected buffer settings for consistency
        const bufferSizeSelect = document.getElementById('buffer-size');
        const prebufferTimeSelect = document.getElementById('prebuffer-time');
        
        // Convert to actual values with fallbacks
        const bufferSizeMB = parseInt(bufferSizeSelect?.value || '4', 10);
        const prebufferTimeSec = parseInt(prebufferTimeSelect?.value || '5', 10);
        
        console.log(`Initializing DASH player with ${bufferSizeMB}MB buffer`);
        
        const videoElement = player.el().querySelector('video');
        if (!videoElement) {
          console.error('Could not find video element');
          return false;
        }
        
        // Show buffering indicator
        const bufferingOverlay = createBufferingOverlay(
          `Building ${bufferSizeMB}MB buffer for smoother playback...`, 
          prebufferTimeSec
        );
        
        // Create DASH player with buffer settings
        const dashPlayer = dashjs.MediaPlayer().create();
        
        // Configure DASH player settings
        dashPlayer.updateSettings({
          'streaming': {
            'bufferTimeAtTopQuality': 30,
            'bufferTimeAtTopQualityLongForm': 60,
            'stableBufferTime': Math.max(12, prebufferTimeSec),
            'bufferTimeDefault': Math.max(20, prebufferTimeSec * 2),
            'fastSwitchEnabled': true,
            'jumpGaps': true,
            'smallGapLimit': 1.5
          },
          'debug': {
            'logLevel': dashjs.Debug.LOG_LEVEL_ERROR
          }
        });
        
        // Set up error handling
        dashPlayer.on(dashjs.MediaPlayer.events.ERROR, function(e) {
          console.error('DASH error:', e);
          
          // Clear the prebuffer interval if it exists
          if (typeof prebufferInterval !== 'undefined' && prebufferInterval) {
            clearInterval(prebufferInterval);
          }
          
          // Remove the overlay if it exists
          if (typeof bufferingOverlay !== 'undefined' && bufferingOverlay && bufferingOverlay.parentNode) {
            bufferingOverlay.parentNode.removeChild(bufferingOverlay);
          }
          
          // Check for CORS-related errors
          if (e.error && (e.error.code === dashjs.MediaPlayer.errors.MANIFEST_LOADER_LOADING_FAILURE_ERROR_CODE ||
                         e.error.code === dashjs.MediaPlayer.errors.XLINK_LOADER_LOADING_FAILURE_ERROR_CODE)) {
            console.warn('Suspected CORS error in DASH. Displaying modal.', e);
            showErrorModal('cors');
            return;
          }
          
          // Handle other errors
          let errorMessage = 'DASH playback error';
          if (e.error && e.error.message) {
            errorMessage = e.error.message;
          }
          showErrorModal('generic', errorMessage);
        });
        
        // Initialize the player
        dashPlayer.initialize(videoElement, url, false);
        
        // Pre-buffer for consistent experience
        let prebufferTime = prebufferTimeSec;
        const countdownElement = document.getElementById('buffer-count');
        
        const prebufferInterval = setInterval(() => {
          prebufferTime--;
          if (countdownElement) {
            countdownElement.textContent = prebufferTime;
          }
          
          if (prebufferTime <= 0) {
            clearInterval(prebufferInterval);
            if (bufferingOverlay.parentNode) {
              bufferingOverlay.parentNode.removeChild(bufferingOverlay);
            }
            
            // Start playback after pre-buffering
            player.play().catch(e => {
              console.error('Error starting DASH playback:', e);
            });
          }
        }, 1000);
        
        // Store dash instance for later reference/cleanup
        player.dash = dashPlayer;
        return true;
      } catch (e) {
        console.error('Error initializing DASH player:', e);
        return false;
      }
    } else {
      console.error('DASH.js is not available');
      return false;
    }
  }

  // Initialize MP4 player (direct video playback)
  function initMp4Player(url) {
    // Track format detection
    if (window.Analytics) {
      window.Analytics.trackStreamFormatDetected('mp4');
    }
    
    try {
      // Get user-selected buffer settings for consistency
      const bufferSizeSelect = document.getElementById('buffer-size');
      const prebufferTimeSelect = document.getElementById('prebuffer-time');
      
      // Convert to actual values with fallbacks
      const bufferSizeMB = parseInt(bufferSizeSelect?.value || '4', 10);
      const prebufferTimeSec = parseInt(prebufferTimeSelect?.value || '5', 10);
      
      console.log(`Initializing MP4 player with ${bufferSizeMB}MB buffer`);
      
      const videoElement = player.el().querySelector('video');
      if (!videoElement) {
        console.error('Could not find video element');
        return false;
      }
      
      // Show buffering indicator
      const bufferingOverlay = createBufferingOverlay(
        `Loading MP4 stream...`, 
        prebufferTimeSec
      );
      
      // Set up the video source
      player.src({
        src: url,
        type: 'video/mp4'
      });
      
      // Configure video element for better buffering
      videoElement.preload = 'auto';
      
      // Pre-buffer for consistent experience
      let prebufferTime = prebufferTimeSec;
      const countdownElement = document.getElementById('buffer-count');
      
      const prebufferInterval = setInterval(() => {
        prebufferTime--;
        if (countdownElement) {
          countdownElement.textContent = prebufferTime;
        }
        
        if (prebufferTime <= 0) {
          clearInterval(prebufferInterval);
          if (bufferingOverlay.parentNode) {
            bufferingOverlay.parentNode.removeChild(bufferingOverlay);
          }
          
          // Start playback after pre-buffering
          player.play().catch(e => {
            console.error('Error starting MP4 playback:', e);
            // Check for CORS errors
            if (e.name === 'NotAllowedError' || e.message.includes('CORS')) {
              showErrorModal('cors');
            } else {
              showErrorModal('generic', e.message || 'MP4 playback error');
            }
          });
        }
      }, 1000);
      
      // Set up error handling for the video element
      videoElement.addEventListener('error', function(e) {
        console.error('MP4 video error:', e);
        
        // Clear the prebuffer interval if it exists
        if (typeof prebufferInterval !== 'undefined' && prebufferInterval) {
          clearInterval(prebufferInterval);
        }
        
        // Remove the overlay if it exists
        if (typeof bufferingOverlay !== 'undefined' && bufferingOverlay && bufferingOverlay.parentNode) {
          bufferingOverlay.parentNode.removeChild(bufferingOverlay);
        }
        
        // Check for CORS-related errors
        if (videoElement.error && videoElement.error.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          showErrorModal('cors');
        } else {
          let errorMessage = 'MP4 playback error';
          if (videoElement.error) {
            switch(videoElement.error.code) {
              case MediaError.MEDIA_ERR_ABORTED:
                errorMessage = 'Video playback was aborted';
                break;
              case MediaError.MEDIA_ERR_NETWORK:
                errorMessage = 'Network error occurred';
                break;
              case MediaError.MEDIA_ERR_DECODE:
                errorMessage = 'Video decoding error';
                break;
              case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                errorMessage = 'Video format not supported';
                break;
            }
          }
          showErrorModal('generic', errorMessage);
        }
      });
      
      return true;
    } catch (e) {
      console.error('Error initializing MP4 player:', e);
      return false;
    }
  }
}); 