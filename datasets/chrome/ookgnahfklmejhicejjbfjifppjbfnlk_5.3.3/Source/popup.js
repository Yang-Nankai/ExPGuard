init()

async function init() {
  const APP_URL = 'https://adsmeta.io/app'

  // Ưu tiên tìm popup window AdsMeta đang mở — bỏ qua tab thường
  const popupWindows = await chrome.windows.getAll({ populate: true, windowTypes: ['popup'] })
  for (const win of popupWindows) {
    const match = (win.tabs || []).find(t =>
      (t.url && t.url.startsWith(APP_URL)) ||
      (t.title && t.title.indexOf('AdsMeta.io |') > -1)
    )
    if (match) {
      chrome.windows.update(win.id, { focused: true })
      window.close()
      return
    }
  }

  // Không có popup window → tạo mới (không focus tab thường)
  chrome.windows.create({
    url: APP_URL,
    type: 'popup',
    width: 1280,
    height: 700,
    top: 80,
    left: 100,
  })

  window.close()
}
