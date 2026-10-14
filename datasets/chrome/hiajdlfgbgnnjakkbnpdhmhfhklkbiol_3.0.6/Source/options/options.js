// Build list items like the screenshot: icon | title+sub | toggle
const FEATURES = [
  { id: 'rules_file', icon: 'file', title: 'Block Malicious Download', sub: 'Block files that may contain malware & viruses.', defaultOn: true },
  { id: 'rules_crypto', icon: 'crypto', title: 'Block Cryptocurrency Mining', sub: 'Block crypto-mining scripts from using your CPU.', defaultOn: true },
  { id: 'rules_fb', icon: 'fb', title: 'Facebook Protect', sub: 'Block Facebook tracking endpoints on other sites.', defaultOn: true },
  { id: 'rules_mail', icon: 'mail', title: 'Block Email Trackers', sub: 'Stop tracking pixels & email tracking domains.', defaultOn: true },
  { id: 'rules_adult', icon: 'parent', title: 'Protect your Safety', sub: 'Block unsafe/adult websites (opt-in).', defaultOn: false }
];

function item({ id, icon, title, sub }, enabled = true, disabled = false) {
  return `
  <div class="item ${disabled ? 'disabled' : ''}" data-id="${id || ''}">
    <div class="icon">${ICONS[icon] || ''}</div>
    <div>
      <div class="title">${title}</div>
      <div class="sub">${sub}</div>
    </div>
    <label class="toggle">
      <input type="checkbox" ${enabled ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
      <span class="track"></span><span class="knob"></span>
    </label>
  </div>`;
}

async function render() {
  const root = document.getElementById('list');
  const data = await chrome.storage.sync.get('packs');
  const packs = data.packs || {};
  const html = [
    ...FEATURES.map(f => item(f, packs[f.id] ?? f.defaultOn, false))
  ].join('');
  root.innerHTML = html;

  document.querySelectorAll('.item').forEach(el => {
    const id = el.getAttribute('data-id');
    const f = FEATURES.find(x => x.id === id);
    if (!f) return;
    const input = el.querySelector('input[type="checkbox"]');
    input.addEventListener('change', async (e) => {
      await chrome.runtime.sendMessage({ type: 'toggle-pack', id, enable: e.target.checked });
      const current = (await chrome.storage.sync.get('packs')).packs || {};
      current[id] = e.target.checked;
      await chrome.storage.sync.set({ packs: current });
    });
  });
}

document.addEventListener('DOMContentLoaded', render);


// === Global toggle wiring ===
async function initGlobalToggle() {
  const checkbox = document.getElementById('extensionEnabled');
  const { extensionEnabled = true } = await chrome.storage.local.get({ extensionEnabled: true });
  checkbox.checked = !extensionEnabled; // checked means OFF in our slider coloring
  document.body.dataset.disabled = (!extensionEnabled).toString();
  checkbox.addEventListener('change', async (e) => {
    const off = e.target.checked;
    const newVal = !off;
    await new Promise((resolve) => chrome.runtime.sendMessage({ type: 'set-extension-enabled', value: newVal }, resolve));
    const { extensionEnabled } = await chrome.storage.local.get({ extensionEnabled: true });
    document.body.dataset.disabled = (!extensionEnabled).toString();
    document.querySelector('.topbar')?.classList.toggle('off', !extensionEnabled);
  });
  document.querySelector('.topbar')?.classList.toggle('off', !extensionEnabled);
}
document.addEventListener('DOMContentLoaded', initGlobalToggle);
// === End global toggle wiring ===


// === Hero tiny toggle wiring ===
async function initHeroToggle() {
  const heroToggle = document.getElementById('heroEnabled');
  const titleEl = document.querySelector('.hero .hero-title');
  if (!heroToggle || !titleEl) return;

  // Load current state
  const { extensionEnabled = true } = await chrome.storage.local.get({ extensionEnabled: true });
  heroToggle.checked = !extensionEnabled; // checked = OFF (to match our existing slider semantics)
  titleEl.textContent = extensionEnabled ? "You are protected" : "You are not protected";

  heroToggle.addEventListener('change', async (e) => {
    const off = e.target.checked;
    const newVal = !off;
    await new Promise((resolve) => chrome.runtime.sendMessage({ type: 'set-extension-enabled', value: newVal }, resolve));
    const after = (await chrome.storage.local.get({ extensionEnabled: true })).extensionEnabled;
    titleEl.textContent = after ? "You are protected" : "You are not protected";
    // Optional: visual state hook for styling
    document.body.dataset.disabled = (!after).toString();
  });
}
document.addEventListener('DOMContentLoaded', initHeroToggle);
// === End hero tiny toggle wiring ===


// === Live sync: re-render when packs or extensionEnabled change ===
chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area === 'sync' && changes.packs) {
    render();
  }
  if (area === 'local' && changes.extensionEnabled) {
    const extOn = changes.extensionEnabled.newValue;
    document.body.dataset.disabled = (!extOn).toString();
    document.querySelector('.topbar')?.classList.toggle('off', !extOn);
    const heroToggle = document.getElementById('heroEnabled');
    const titleEl = document.querySelector('.hero .hero-title');
    if (heroToggle) heroToggle.checked = !extOn;
    if (titleEl) titleEl.textContent = extOn ? "You are protected" : "You are not protected";
  }

});
