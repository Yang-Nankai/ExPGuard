(function () {
  'use strict'

  const LEADIQ_WIDGET_ID = 'leadiq-extension'
  const LEADIQ_WIDGET_CONTAINER_ID = 'liq-widget-container'

  const widgetHtml = `
    <iframe id="${LEADIQ_WIDGET_ID}"
            src="${chrome.runtime.getURL('prospector/panel/widget.html')}"
            title="LeadIQ Extension Widget"
            style="width: 40px; height: 40px; border: none;">
    </iframe>
  `
  const widgetContainer = document.getElementById(LEADIQ_WIDGET_CONTAINER_ID)
  const leadiqWidget = document.getElementById(LEADIQ_WIDGET_ID)

  if (leadiqWidget !== null) leadiqWidget.remove()

  if (widgetContainer) {
    widgetContainer.insertAdjacentHTML('beforeend', widgetHtml)
  }
})()
