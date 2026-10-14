(function () {
  const storageKey = 'leadiqWidgetGlobalCoords'

  async function createWidgetContainer () {
    const imgSrc = chrome.runtime.getURL('meta/images/drag-handle.svg')

    const handleElement = document.createElement('div')
    handleElement.id = 'liq-drag-handle'

    const handleImg = document.createElement('img')
    handleImg.src = imgSrc
    handleImg.draggable = false

    handleElement.appendChild(handleImg)

    const containerElement = document.createElement('div')
    containerElement.id = 'liq-widget-container'
    containerElement.draggable = false

    const widgetElement = document.createElement('div')
    widgetElement.id = 'liq-widget'
    widgetElement.draggable = false

    widgetElement.appendChild(containerElement)
    widgetElement.appendChild(handleElement)

    document.body.append(widgetElement)

    // make the widget draggable in Y-Axis
    await window.makeDraggable(widgetElement, {
      storageKey,
      dragHandleElement: handleElement
    })
  }

  if (!document.getElementById('liq-widget')) {
    createWidgetContainer()
  }
})()
