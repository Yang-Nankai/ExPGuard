
// Whitelist manager for Options Page
(function() {
  const STORAGE_KEY = 'whitelist';

  // Elements
  const inputEl = document.getElementById('jb-whitelist-input');
  const addBtn = document.getElementById('jb-whitelist-add');
  const listEl = document.getElementById('jb-whitelist-list');
  const importBtn = document.getElementById('jb-whitelist-import');
  const exportBtn = document.getElementById('jb-whitelist-export');
  const statusEl = document.getElementById('jb-whitelist-status');

  function setStatus(msg, ok=true) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.opacity = '1';
    statusEl.style.color = ok ? '#155724' : '#721c24';
    statusEl.style.background = ok ? '#d4edda' : '#f8d7da';
    setTimeout(() => statusEl.style.opacity = '0', 1600);
  }

  function normalizeDomain(value) {
    if (!value) return '';
    value = value.trim();
    // If it's a URL, parse hostname
    try {
      if (!/^https?:\/\//i.test(value)) {
        // Add dummy scheme to parse
        const url = new URL('https://' + value);
        value = url.hostname;
      } else {
        const url = new URL(value);
        value = url.hostname;
      }
    } catch (e) {
      // fallback: strip path
      value = value.split('/')[0];
    }
    // Remove leading www.
    value = value.replace(/^www\./i, '');
    // Basic hostname validation
    if (!/^[a-z0-9.-]+$/i.test(value) || value.indexOf('.') === -1) return '';
    return value.toLowerCase();
  }

  function render(items) {
    listEl.innerHTML = '';
    if (!items || !items.length) {
      const empty = document.createElement('div');
      empty.className = 'jb-empty';
      empty.textContent = 'No sites whitelisted yet.';
      listEl.appendChild(empty);
      return;
    }
    items.sort((a,b) => a.localeCompare(b));
    for (const domain of items) {
      const row = document.createElement('div');
      row.className = 'jb-row';

      const label = document.createElement('div');
      label.className = 'jb-domain';
      label.textContent = domain;

      const actions = document.createElement('div');
      actions.className = 'jb-actions';

      const removeBtn = document.createElement('button');
      removeBtn.className = 'jb-btn jb-danger';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', async () => {
        const current = await getList();
        const next = current.filter(d => d !== domain);
        await saveList(next);
        setStatus('Removed ' + domain);
      });

      actions.appendChild(removeBtn);
      row.appendChild(label);
      row.appendChild(actions);
      listEl.appendChild(row);
    }
  }

  function getList() {
    return new Promise(resolve => {
      chrome.storage.local.get([STORAGE_KEY], obj => {
        resolve(Array.isArray(obj[STORAGE_KEY]) ? obj[STORAGE_KEY] : []);
      });
    });
  }

  function saveList(arr) {
    return new Promise(resolve => {
      const payload = {};
      payload[STORAGE_KEY] = arr;
      chrome.storage.local.set(payload, () => {
        render(arr);
        resolve(true);
      });
    });
  }

  async function addCurrent() {
    const norm = normalizeDomain(inputEl.value);
    if (!norm) {
      setStatus('Enter a valid domain like example.com', false);
      inputEl.focus();
      return;
    }
    const list = await getList();
    if (list.includes(norm)) {
      setStatus('Already whitelisted');
      inputEl.value = '';
      return;
    }
    list.push(norm);
    await saveList(list);
    inputEl.value = '';
    setStatus('Added ' + norm);
  }

  // Import/Export
  async function doExport() {
    const list = await getList();
    const blob = new Blob([JSON.stringify(list, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'justblock-whitelist.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function openFilePicker() {
    return new Promise(resolve => {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = 'application/json';
      inp.onchange = () => resolve(inp.files && inp.files[0]);
      inp.click();
    });
  }

  async function doImport() {
    const file = await openFilePicker();
    if (!file) return;
    const text = await file.text();
    let arr;
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error('Invalid format');
      arr = parsed.map(normalizeDomain).filter(Boolean);
    } catch(e) {
      setStatus('Invalid JSON file', false);
      return;
    }
    const unique = Array.from(new Set(arr));
    await saveList(unique);
    setStatus('Imported ' + unique.length + ' domains');
  }

  // Wire up events
  addBtn.addEventListener('click', addCurrent);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addCurrent();
  });
  exportBtn.addEventListener('click', doExport);
  importBtn.addEventListener('click', doImport);

  // Load initial
  getList().then(render);
})();
