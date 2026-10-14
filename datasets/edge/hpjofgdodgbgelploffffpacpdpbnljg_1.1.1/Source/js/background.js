// Background script for the IPTV Stream Player extension

// Load analytics module
importScripts('analytics.js');

// Listen for installation
chrome.runtime.onInstalled.addListener(function(details) {
  console.log('IPTV Stream Player extension installed');
  
  // Track installation for new installs only
  if (details.reason === 'install') {
    if (typeof Analytics !== 'undefined') {
      Analytics.trackExtensionInstalled();
    }
  }
  
  // Initialize storage with empty history if it doesn't exist
  chrome.storage.local.get('streamHistory', function(result) {
    if (!result.streamHistory) {
      chrome.storage.local.set({streamHistory: []});
    }
  });
});

// Handle extension icon click
chrome.action.onClicked.addListener(function(tab) {
  // This won't run since we're using a popup, but kept for reference
});

// Clear extension data if needed
function clearData() {
  chrome.storage.local.clear(function() {
    console.log('IPTV Stream Player data cleared');
  });
}

// Function to save stream to history
function saveStreamToHistory(url) {
  chrome.storage.local.get('streamHistory', function(result) {
    let history = result.streamHistory || [];
    
    // Remove the URL if it already exists to avoid duplicates
    history = history.filter(item => item !== url);
    
    // Add the new URL to the beginning of the array
    history.unshift(url);
    
    // Keep only the last 5 URLs
    history = history.slice(0, 5);
    
    // Save the updated history
    chrome.storage.local.set({streamHistory: history});
  });
}

// Function to open stream in player
function openStreamInPlayer(url) {
  if (!url) return;
  
  // Save to history first
  saveStreamToHistory(url);
  
  // Track stream played (from background script - external trigger)
  if (typeof Analytics !== 'undefined') {
    Analytics.trackStreamPlayed();
  }
  
  // Open the stream in a new tab
  chrome.tabs.create({
    url: 'player.html?url=' + encodeURIComponent(url)
  });
}

// Listen for messages from popup, content scripts, or external connections
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'clearData') {
    clearData();
    sendResponse({success: true});
  } else if (request.action === 'playStream' && request.url) {
    openStreamInPlayer(request.url);
    sendResponse({success: true});
  }
  return true; // Required for async response
});

// Function to verify sender origin is allowed
function isAllowedOrigin(url) {
  if (!url) return false;
  
  // Check if URL is from our website
  if (url.includes('iptvplayer.stream')) {
    return true;
  }
  
  // Check if URL is from localhost
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    return true;
  }
  
  return false;
}

// Listen for external messages (from the website)
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  // Verify the sender origin is allowed
  if (sender.url && isAllowedOrigin(sender.url)) {
    if (request.action === 'ping') {
      // Used to check if extension is installed
      sendResponse({success: true, message: 'Extension is available'});
    } else if (request.action === 'playStream' && request.url) {
      openStreamInPlayer(request.url);
      sendResponse({success: true});
    }
  }
  return true; // Required for async response
}); 