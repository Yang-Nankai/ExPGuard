document.getElementById('widget-icon').src = chrome.runtime.getURL('prospector/images/prospector-widget-icon.svg')

document.body.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'WIDGET_OPEN_UI' })
})
