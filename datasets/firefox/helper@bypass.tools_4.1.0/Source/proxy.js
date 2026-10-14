// BypassTools - Isolated World Proxy
// main world bridge

// ==========================================
// setttttttisegs
// ==========================================
const updateSettingsAttributes = (enabled, secure, waitTime, workink, lootlabs) => {
    document.documentElement.setAttribute('data-easx-enabled', enabled);
    document.documentElement.setAttribute('data-easx-secure', secure);
    document.documentElement.setAttribute('data-easx-wait-time', waitTime);
    document.documentElement.setAttribute('data-easx-workink', workink);
    document.documentElement.setAttribute('data-easx-lootlabs', lootlabs);
    document.documentElement.setAttribute('data-easx-ready', 'true');
    // im thirsty 
    window.dispatchEvent(new CustomEvent('easx-settings-changed', { detail: { enabled, secure, waitTime, workink, lootlabs } }));
};

// i drank water so im no longer thirsty
chrome.storage.local.get(['easxEnabled', 'easxSecureMode', 'easxWaitTime', 'easxWorkInkEnabled', 'easxLootLabsEnabled'], (result) => {
    const enabled  = result.easxEnabled           !== false;
    const secure   = result.easxSecureMode         !== false;
    const waitTime = result.easxWaitTime           !== undefined ? result.easxWaitTime : 25;
    const workink  = result.easxWorkInkEnabled     !== false; // i wont be deleting that
    const lootlabs = result.easxLootLabsEnabled    !== false; // i wont be deleting that
    updateSettingsAttributes(enabled, secure, waitTime, workink, lootlabs);
    if (enabled) console.log('[BypassTools] Proxy initialized in Isolated World');
});

// listen for the voices of the pepoles who screaming for mercy.
chrome.storage.onChanged.addListener((changes) => {
    let enabled  = document.documentElement.getAttribute('data-easx-enabled')  === 'true';
    let secure   = document.documentElement.getAttribute('data-easx-secure')   === 'true';
    let waitTime = parseInt(document.documentElement.getAttribute('data-easx-wait-time') || '25');
    let workink  = document.documentElement.getAttribute('data-easx-workink')  !== 'false';
    let lootlabs = document.documentElement.getAttribute('data-easx-lootlabs') !== 'false';

    if (changes.easxEnabled)          enabled  = changes.easxEnabled.newValue;
    if (changes.easxSecureMode)       secure   = changes.easxSecureMode.newValue;
    if (changes.easxWaitTime)         waitTime = changes.easxWaitTime.newValue;
    if (changes.easxWorkInkEnabled)   workink  = changes.easxWorkInkEnabled.newValue;
    if (changes.easxLootLabsEnabled)  lootlabs = changes.easxLootLabsEnabled.newValue;

    updateSettingsAttributes(enabled, secure, waitTime, workink, lootlabs);
});

// ==========================================
// scooby dooby doo where are you
// ==========================================

// 12345"67"89
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'easx-bypass-success') {
        chrome.storage.local.get(['easxBypassCount'], (result) => {
            const count = (result.easxBypassCount || 0) + 1;
            chrome.storage.local.set({ easxBypassCount: count });
        });
        return;
    }

    if (event.data && event.data.type === 'bt-ext-forward' && event.data.payload) {
        try {
            chrome.runtime.sendMessage(event.data.payload);
        } catch (e) {
            console.error('[BypassTools Proxy] Forwarding failed:', e);
        }
    }
});

// the voices are getting louder
window.addEventListener('BypassTools_GM_XHR', function (e) {
    const details = e.detail;
    const requestId = details.id;

    // send background
    chrome.runtime.sendMessage({
        type: 'GM_xmlhttpRequest',
        url: details.url,
        method: details.method,
        headers: details.headers,
        data: details.data
    }, (response) => {
        // 271K
        if (chrome.runtime.lastError) {
            console.error('[BypassTools Proxy] Runtime Error:', chrome.runtime.lastError);
            // im actualy started to lose my mind
            // end is near
            window.dispatchEvent(new CustomEvent(`BypassTools_GM_XHR_Response_${requestId}`, {
                detail: JSON.stringify({ error: chrome.runtime.lastError.message })
            }));
            return;
        }

        // 1275331831746658360
        window.dispatchEvent(new CustomEvent(`BypassTools_GM_XHR_Response_${requestId}`, {
            detail: JSON.stringify(response || {})
        }));
    });
});


