// Google Analytics 4 integration for IPTV Chrome Extension
// Privacy-focused: No PII, no URLs, anonymous tracking only

(function() {
  'use strict';

  const GA_MEASUREMENT_ID = 'G-9DH5BSD860';
  const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
  const GA_DEBUG_ENDPOINT = 'https://www.google-analytics.com/debug/mp/collect';
  
  let clientId = null;
  let sessionId = null;
  let isAnalyticsEnabled = true;

  // Check if user has Do Not Track enabled
  function checkDoNotTrack() {
    try {
      if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') {
        console.log('Analytics disabled: Do Not Track is enabled');
        isAnalyticsEnabled = false;
        return true;
      }
      if (typeof window !== 'undefined' && window.doNotTrack === '1') {
        console.log('Analytics disabled: Do Not Track is enabled');
        isAnalyticsEnabled = false;
        return true;
      }
    } catch (e) {
      // Ignore errors in service worker context
    }
    return false;
  }

  // Generate or retrieve anonymous client ID
  function getClientId() {
    return new Promise((resolve) => {
      if (clientId) {
        resolve(clientId);
        return;
      }

      chrome.storage.local.get('analytics_client_id', (result) => {
        if (result.analytics_client_id) {
          clientId = result.analytics_client_id;
          resolve(clientId);
        } else {
          // Generate new client ID using crypto API
          const array = new Uint8Array(16);
          crypto.getRandomValues(array);
          clientId = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
          
          chrome.storage.local.set({ analytics_client_id: clientId }, () => {
            resolve(clientId);
          });
        }
      });
    });
  }

  // Generate session ID
  function getSessionId() {
    if (!sessionId) {
      sessionId = Date.now().toString();
    }
    return sessionId;
  }

  // Initialize analytics
  async function initAnalytics() {
    if (checkDoNotTrack()) {
      return false;
    }

    await getClientId();
    console.log('Analytics initialized');
    return true;
  }

  // Send event to GA4
  async function sendEvent(eventName, eventParams = {}) {
    if (!isAnalyticsEnabled) {
      return;
    }

    try {
      const cid = await getClientId();
      const sid = getSessionId();

      // Build GA4 Measurement Protocol payload
      const payload = {
        client_id: cid,
        user_id: cid,
        events: [{
          name: eventName,
          params: {
            session_id: sid,
            engagement_time_msec: '100',
            ...eventParams
          }
        }]
      };

      // Send to GA4 using Measurement Protocol
      // Note: For production, you should store API_SECRET securely on a backend
      // For now, we'll send without validation (GA4 will accept but won't validate)
      const url = `${GA_ENDPOINT}?measurement_id=${GA_MEASUREMENT_ID}`;
      
      // For Chrome extensions, we need to use fetch
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload)
      }).catch(error => {
        // Silently fail - don't disrupt user experience
        console.debug('Analytics event failed:', error);
      });

      console.debug('Analytics event queued:', eventName, eventParams);
    } catch (error) {
      console.debug('Failed to send analytics event:', error);
    }
  }

  // Wrapper functions for common events
  // Use globalThis to work in both browser and service worker contexts
  const Analytics = {
    init: initAnalytics,

    // Core usage events
    trackExtensionInstalled: () => {
      sendEvent('extension_installed', {
        version: chrome.runtime.getManifest().version
      });
    },

    trackStreamPlayed: () => {
      sendEvent('stream_played');
    },

    trackStreamFormatDetected: (format) => {
      sendEvent('stream_format_detected', {
        format: format
      });
    },

    trackStreamHistoryClicked: () => {
      sendEvent('stream_history_clicked');
    },

    // User experience events
    trackBufferSettingsChanged: (bufferSize, prebufferTime) => {
      sendEvent('buffer_settings_changed', {
        buffer_size_mb: bufferSize,
        prebuffer_time_sec: prebufferTime
      });
    },

    trackStreamReloaded: () => {
      sendEvent('stream_reloaded');
    },

    trackLanguageChanged: (language) => {
      sendEvent('language_changed', {
        language: language
      });
    },

    trackPlaybackError: (errorType) => {
      sendEvent('playback_error', {
        error_type: errorType
      });
    },

    // Engagement events
    trackRateButtonClicked: () => {
      sendEvent('rate_button_clicked');
    },

    trackWebsiteLinkClicked: () => {
      sendEvent('website_link_clicked');
    },

    trackFeedbackFormOpened: () => {
      sendEvent('feedback_form_opened');
    },

    trackFormatFallback: (fromFormat, toFormat, success) => {
      sendEvent('format_fallback', {
        from_format: fromFormat,
        to_format: toFormat,
        success: success ? 'yes' : 'no'
      });
    },

    trackStreamUrlCopied: () => {
      sendEvent('stream_url_copied');
    }
  };

  // Export to global scope (works in both window and service worker contexts)
  if (typeof window !== 'undefined') {
    window.Analytics = Analytics;
  } else if (typeof self !== 'undefined') {
    self.Analytics = Analytics;
  } else {
    globalThis.Analytics = Analytics;
  }

  // Auto-initialize when script loads
  initAnalytics();
})();

