const storageKey = 'scribeEnabled'

self.setScribeEnabled = () => {
  return chrome.storage.local.set({ [storageKey]: true })
}

self.setScribeDisabled = () => {
  return chrome.storage.local.set({ [storageKey]: false })
}

self.isScribeEnabled = () => {
  return chrome.storage.local.get(storageKey).then(v => v[storageKey])
}
