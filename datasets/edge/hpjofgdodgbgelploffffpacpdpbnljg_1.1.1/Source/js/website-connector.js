/**
 * IPTV Player Extension Connector Script
 * Include this script on iptvplayer.stream or localhost to enable proper communication with the Chrome extension
 */

(function() {
  // Extension ID - update this with your extension's ID
  const EXTENSION_ID = 'lljjhhjbbppcbfbhmflgjhloagchmijo';
  
  // Determine current environment (production vs local)
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
  const baseDomain = isLocalhost ? window.location.origin : 'https://iptvplayer.stream';
  
  // Function to check if extension is installed
  function isExtensionInstalled(callback) {
    // Try to send a message to the extension
    try {
      chrome.runtime.sendMessage(EXTENSION_ID, { action: 'ping' }, function(response) {
        // If we got a response, the extension is installed
        if (chrome.runtime.lastError) {
          console.log('Extension not installed or error:', chrome.runtime.lastError);
          callback(false);
        } else {
          callback(true);
        }
      });
    } catch (e) {
      console.log('Error checking for extension:', e);
      callback(false);
    }
  }
  
  // Function to play stream through extension
  function playStreamThroughExtension(streamUrl) {
    if (!streamUrl) return false;
    
    try {
      chrome.runtime.sendMessage(EXTENSION_ID, 
        { action: 'playStream', url: streamUrl }, 
        function(response) {
          if (chrome.runtime.lastError) {
            console.error('Error playing stream through extension:', chrome.runtime.lastError);
            // Fallback to direct URL if extension communication fails
            window.open(baseDomain + '/play?url=' + encodeURIComponent(streamUrl), '_blank');
          }
        }
      );
      return true;
    } catch (e) {
      console.error('Exception when trying to communicate with extension:', e);
      return false;
    }
  }
  
  // Update stream links on the page
  function updateStreamLinks() {
    // Find all stream links that should use the extension
    const streamLinks = document.querySelectorAll('a[data-stream-url]');
    
    streamLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const streamUrl = this.getAttribute('data-stream-url');
        if (streamUrl) {
          e.preventDefault();
          
          isExtensionInstalled(function(installed) {
            if (installed) {
              // Try to play through extension
              const success = playStreamThroughExtension(streamUrl);
              
              // If sending to extension failed, use fallback
              if (!success) {
                window.open(baseDomain + '/play?url=' + encodeURIComponent(streamUrl), '_blank');
              }
            } else {
              // Extension not installed, direct to install page or web player
              window.open(baseDomain + '/play?url=' + encodeURIComponent(streamUrl), '_blank');
            }
          });
        }
      });
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateStreamLinks);
  } else {
    updateStreamLinks();
  }
  
  // Export functions to global scope
  window.IPTVPlayerExtension = {
    playStream: function(streamUrl) {
      isExtensionInstalled(function(installed) {
        if (installed) {
          playStreamThroughExtension(streamUrl);
        } else {
          window.open(baseDomain + '/play?url=' + encodeURIComponent(streamUrl), '_blank');
        }
      });
    },
    isInstalled: isExtensionInstalled
  };
})(); 