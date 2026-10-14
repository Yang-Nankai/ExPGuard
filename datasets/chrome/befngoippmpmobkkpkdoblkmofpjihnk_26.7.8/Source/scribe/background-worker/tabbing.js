/**
 * Handles browser tabbing for Scribe content scripts
 */

async function handleTabsUpdated (tabId, changeInfo) {
  if (changeInfo.url) {
    try {
      await chrome.tabs.sendMessage(
        tabId,
        { type: 'SCRIBE_TAB_UPDATE', url: changeInfo.url }
      )
    } catch (_e) {
      console.info('Scribe tried sending tab update to a page without content scripts')
    }
  }
}

chrome.tabs.onUpdated.addListener(handleTabsUpdated)
