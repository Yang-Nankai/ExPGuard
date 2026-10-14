async function checkAccess() {
    const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";
    const THREE_HOURS = 3 * 60 * 60 * 1000;
    const now = Date.now();

    const data = await chrome.storage.local.get([
        'cached_access_result',
        'last_access_check',
        `pw-${wallId}-access`
    ]);

    if (data.last_access_check && (now - data.last_access_check < THREE_HOURS)) {
        return !!data.cached_access_result;
    }

    return !!data[`pw-${wallId}-access`];
}

async function applyThemeIfAllowed() {
    try {
        const topUrl = window.top.location.href;
        if (!topUrl.includes('docs.google.com/spreadsheets')) return;
    } catch (e) {
		const origin = window.location.origin;
        const isGoogleOrigin = origin.includes('google.com') || origin.includes('googleapis.com');
        if (!isGoogleOrigin) return;
		
        if (!window.location.href.includes('docs.google.com/spreadsheets') &&
            !document.referrer.includes('docs.google.com/spreadsheets')) return;
    }

    const localData = await chrome.storage.local.get('themeSettings');
    const settings = localData.themeSettings || CONFIG.DEFAULT_SETTINGS;

    const hasAccess = await checkAccess();

    if (hasAccess) {
        if (settings && settings.enabled) {
            ThemeEngine.injectStyles(settings);
        } else {
            ThemeEngine.removeStyles();
        }
    } else {
        ThemeEngine.removeStyles();
        console.log("Dark Mode: Subscriptions required. Open popup to pay.");
    }
}

chrome.storage.onChanged.addListener((changes, area) => {
    const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";
    const paymentKey = `pw-${wallId}-access`;

    const shouldUpdate = 
        (area === 'local' && (changes.themeSettings || changes.cached_access_result)) ||
        (area === 'sync' && changes[paymentKey]);

    if (shouldUpdate) {
        applyThemeIfAllowed();
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'PREVIEW_THEME') {
        checkAccess().then(hasAccess => {
            if (hasAccess) ThemeEngine.updateDynamicStyles(message.settings);
        });
    }
    
    if (message.action === 'update_theme') {
        applyThemeIfAllowed();
    }
});

applyThemeIfAllowed();