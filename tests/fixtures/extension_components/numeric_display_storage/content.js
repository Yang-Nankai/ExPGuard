const pageText = document.querySelector("#untrusted")?.textContent || "";
const taskCount = Object.keys({ pageText }).length;
const score = parseFloat(pageText);
const updated = new Date(pageText).toISOString();

// This key has no page text: it is fixed markup plus a number. Keep the
// producer behind an async helper and a computed key, matching real-world
// status writers rather than relying on a direct storage call.
const STATUS_KEY = "heaven_grok_status";
async function setStatus(message) {
  await chrome.storage.local.set({ [STATUS_KEY]: message });
}
const queuedMsg = { en: `Queued (${taskCount} tasks)`, ko: `Queued (${taskCount} tasks)` };
const lang = pageText;
setStatus(queuedMsg[lang] || queuedMsg.ko);

// Keep a genuine raw field beside the presentation-only values. The popup
// must still report the raw `title` insertion below.
chrome.storage.local.set({
  dashboard: { title: pageText, taskCount, score, updated, tasks: [pageText] },
});
