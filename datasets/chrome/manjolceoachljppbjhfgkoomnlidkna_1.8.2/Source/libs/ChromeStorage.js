class ChromeStorage {
  static async get(key) {
    const result = await chrome.storage.local.get(key)
    return key in result ? result[key] : null
  }

  static async set(obj) {
    await chrome.storage.local.set(obj)
  }
}
