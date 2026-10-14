document.addEventListener('DOMContentLoaded', async () => {
    const toggleEnable  = document.getElementById('toggle-enable');
    const toggleSecure  = document.getElementById('toggle-secure');
    const inputWait    = document.getElementById('input-wait');
    const waitValue    = document.getElementById('wait-value');
    const waitWarning  = document.getElementById('wait-warning');
    const statusBadge  = document.getElementById('status-badge');
    const bypassCountEl = document.getElementById('bypass-count');
    const versionEl    = document.getElementById('popup-version');

    if (versionEl && chrome.runtime?.getManifest) {
        versionEl.textContent = `v${chrome.runtime.getManifest().version}`;
    }

    const loadSettings = async () => {
        const result = await chrome.storage.local.get([
            'easxEnabled', 'easxSecureMode', 'easxBypassCount', 'easxWaitTime'
        ]);

        const enabled   = result.easxEnabled           !== false;
        const secure    = result.easxSecureMode         !== false;
        const waitTime  = result.easxWaitTime           !== undefined ? result.easxWaitTime : 25;
        const count     = result.easxBypassCount        || 0;
        toggleEnable.checked   = enabled;
        toggleSecure.checked   = secure;
        inputWait.value        = waitTime;
        bypassCountEl.textContent = count.toLocaleString();

        updateStatusUI(enabled);
        updateWaitUI(waitTime);
    };

    const clampWait = (value) => {
        let val = parseInt(value, 10);
        if (isNaN(val) || val < 0) val = 0;
        if (val > 60) val = 60;
        return val;
    };

    const updateWaitUI = (value) => {
        const val = clampWait(value);
        inputWait.value = val;
        waitValue.textContent = `${val}s`;
        inputWait.style.setProperty('--wait-progress', `${(val / 60) * 100}%`);
        waitWarning.style.display = val < 15 ? 'block' : 'none';
    };

    const updateStatusUI = (enabled) => {
        if (enabled) {
            statusBadge.textContent = 'ACTIVE';
            statusBadge.classList.remove('disabled');
        } else {
            statusBadge.textContent = 'DISABLED';
            statusBadge.classList.add('disabled');
        }
    };

    // Sometimes I dream of saving the world
    toggleEnable.addEventListener('change', async () => {
        const enabled = toggleEnable.checked;
        await chrome.storage.local.set({ easxEnabled: enabled });
        updateStatusUI(enabled);
    });

    toggleSecure.addEventListener('change', async () => {
        await chrome.storage.local.set({ easxSecureMode: toggleSecure.checked });
    });

    inputWait.addEventListener('input', () => {
        updateWaitUI(inputWait.value);
    });

    inputWait.addEventListener('change', async () => {
        const val = clampWait(inputWait.value);
        updateWaitUI(val);
        await chrome.storage.local.set({ easxWaitTime: val });
    });

    // Saving everyone from the invisible hand
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.easxBypassCount) {
            bypassCountEl.textContent = (changes.easxBypassCount.newValue || 0).toLocaleString();
        }
    });

    loadSettings();
});
