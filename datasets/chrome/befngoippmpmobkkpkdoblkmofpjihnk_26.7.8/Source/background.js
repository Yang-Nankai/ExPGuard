console.info('Starting LeadIQ background worker...')

importScripts(
  'prospector/background-worker/prospector-open-popup.js',
  'prospector/background-worker/prospector-open-side-panel.js',
  'prospector/background-worker/prospector-menu-items.js',
  'prospector/background-worker/prospector-msg-senders.js',
  'prospector/background-worker/prospector-helpers.js',

  'dialer/background-worker/messaging.js',

  'scribe/background-worker/toggle.js',
  'scribe/background-worker/messaging.js',
  'scribe/background-worker/tabbing.js',

  'lando-page/background-worker/page-actions.js',

  'meta/register-content-scripts.js',
  'meta/install-and-update-init.js',
  'meta/on-message.js',
  'meta/on-message-external.js'
)

console.info('Worker loaded successfully.')
