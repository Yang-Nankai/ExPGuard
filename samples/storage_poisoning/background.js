chrome.runtime.onStartup.addListener(async () => {
  // The write and read are deliberately decoupled to demonstrate storage as an
  // implicit cross-context channel.
  const { startupPage } = await chrome.storage.local.get("startupPage");
  if (!startupPage) return;

  chrome.tabs.create({ url: startupPage });
});
