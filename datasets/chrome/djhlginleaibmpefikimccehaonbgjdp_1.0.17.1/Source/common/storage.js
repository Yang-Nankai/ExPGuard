export async function getSettings() {
  return await chrome.storage.sync.get([
    'apiBase',
    'enable1080p'
  ]);
}

export async function setSettings(patch) {
  await chrome.storage.sync.set(patch);
}
