const orphanedCheckInterval = setInterval(cleanUpIfOrphaned, 5000)

async function createScribeWidget () {
  const LEADIQ_WIDGET_ID = 'scribe-widget'
  const LEADIQ_WIDGET_CONTAINER_ID = 'liq-widget-container'

  const imgSrc = chrome.runtime.getURL('scribe/images/scribe-widget-icon.svg')

  const styles = `
  #${LEADIQ_WIDGET_ID} {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `
  const widgetHtml = `
  <div id="${LEADIQ_WIDGET_ID}">
    <img src='${imgSrc}'
  </div>`

  const styleId = 'scribe-widget-styles'
  const styleSheet = document.createElement('style')
  styleSheet.innerText = styles
  styleSheet.id = styleId

  // remove widget styles before adding new ones
  const existingStyleSheet = document.getElementById(styleId)
  if (existingStyleSheet !== null) existingStyleSheet.remove()

  document.head.appendChild(styleSheet)

  const widgetContainer = document.getElementById(LEADIQ_WIDGET_CONTAINER_ID)
  const scribeWidget = document.getElementById(LEADIQ_WIDGET_ID)

  // remove widget before adding a new one
  if (scribeWidget !== null) scribeWidget.remove()
  widgetContainer.insertAdjacentHTML('beforeend', widgetHtml)

  document.getElementById(LEADIQ_WIDGET_ID).addEventListener('click', () => {
    if (cleanUpIfOrphaned()) return
    chrome.runtime.sendMessage({ type: 'SCRIBE_SHOW_POPUP' })
  })
}

function cleanUpIfOrphaned () {
  if (chrome.runtime.id === undefined) {
    clearInterval(orphanedCheckInterval)
    return true
  }
}

createScribeWidget()
