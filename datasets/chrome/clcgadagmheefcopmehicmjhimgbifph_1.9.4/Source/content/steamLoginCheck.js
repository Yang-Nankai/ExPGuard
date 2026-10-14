/**
 * Steam Login Check Content Script
 * 
 * This script is injected on Steam inventory history pages when checking login status.
 * Checks if on the inventory history page AND no returnLink element is present (which indicates not logged in).
 * Also injects script to get cursor data and sends it to background.
 */

(function () {
  // Listen for status ping from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'steamLoginCheckPing') {
      // Check if we're on the inventory history page (not redirected to login)
      const isOnInventoryHistoryPage = window.location.href.includes('/inventoryhistory/');
      
      // Check if user is actually logged in - returnLink element indicates not logged in
      const hasReturnLink = document.querySelector('.returnLink') !== null;
      const isLoggedIn = isOnInventoryHistoryPage && !hasReturnLink;
      
      // Try to extract username and profile picture (graceful fallback if not found)
      let username = null;
      let profilePicture = null;
      
      try {
        const accountPulldown = document.querySelector('#account_pulldown');
        if (accountPulldown) {
          username = accountPulldown.innerHTML || null;
        }
      } catch (e) {
        // Ignore errors
      }
      
      try {
        const userAvatar = document.querySelector('.user_avatar');
        if (userAvatar) {
          const img = userAvatar.querySelector('img');
          if (img && img.src) {
            profilePicture = img.src;
          }
        }
      } catch (e) {
        // Ignore errors
      }
      
      // Respond immediately - if on the right page and no returnLink, user is logged in
      chrome.runtime.sendMessage({
        type: 'steamLoginCheckResponse',
        loggedIn: isLoggedIn,
        username: username,
        profilePicture: profilePicture,
      }).catch((error) => {
        console.error('Failed to send login check response:', error);
      });
      
      // If logged in, inject script to get cursor data
      if (isLoggedIn) {
        // Listen for cursor data from injected script (set up listener first)
        const handleCursor = (event) => {
          // Send cursor data to background (background will close tab)
          chrome.runtime.sendMessage({
            type: 'steamCursorData',
            cursor: event.detail,
            profileUrl: window.location.href.split('?')[0], // Get base URL without query params
          }).catch((error) => {
            console.error('Failed to send cursor data:', error);
          });
          
          // Remove listener after handling
          document.removeEventListener("ReadVariable", handleCursor);
        };
        
        document.addEventListener("ReadVariable", handleCursor);
        
        // Inject script into page context to access window.g_historyCursor
        var s = document.createElement("script");
        s.src = chrome.runtime.getURL("content/inject.js");
        s.onload = function () {
          this.remove();
        };
        (document.head || document.documentElement).appendChild(s);
      }
      
      return false;
    }
  });
})();


