const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";

async function checkAccess() {
    const THREE_HOURS = 3 * 60 * 60 * 1000;
    const now = Date.now();
    
    const cache = await chrome.storage.local.get(['last_access_check', 'cached_access_result']);
    
    if (cache.last_access_check && (now - cache.last_access_check < THREE_HOURS)) {
        return !!cache.cached_access_result;
    }

    try {
        const user = await paywall.getUser();

        let hasAccess = false;

        if (user.paid) {
            hasAccess = true;
        } else if (user.trial?.expiresAt) {
            hasAccess = new Date(user.trial.expiresAt) > new Date();
        } else if (user.countryMatch === true) {
            hasAccess = true;
        }

        if (!hasAccess) {
            try {
                await paywall.open({ resolveEvent: 'opened', consumeTrialOpen: false });
                hasAccess = false;
            } catch (reason) {
                const r = reason?.visibility_status_reason;
                if (r === 'active-payment-found' || r === 'time-trial' || r === 'openings-trial' || r === 'country-not-match') {
                    hasAccess = true;
                }
            }
        }

        await chrome.storage.local.set({
            [`pw-${wallId}-access`]: hasAccess,
            last_access_check: now,
            cached_access_result: hasAccess
        });

        return hasAccess;
    } catch (e) {
        const fallback = await chrome.storage.local.get([`pw-${wallId}-access`]);
        return !!fallback[`pw-${wallId}-access`];
    }
}

async function handlePayment() {
    const wrapper = document.querySelector('.wrapper');
    const container = document.getElementById('paywall-container');
    
    if (wrapper) wrapper.style.display = 'none';
    document.body.style.width = '420px';
	document.body.style.minHeight = '0';
    container.style.width = '420px';
    container.style.height = '570px';
    container.style.display = 'block';

    try {
        paywall.init(wallId);
        await paywall.open({
            containerSelector: '#paywall-container',
            resolveEvent: 'success-purchase'
        });
        
		await chrome.storage.local.remove(['last_access_check', 'cached_access_result']);
        container.style.display = 'none';
        if (wrapper) wrapper.style.display = 'flex';
		document.body.style.minHeight = '';
        document.body.style.width = '280px';
        
    } catch (error) {
        container.style.display = 'none';
        if (wrapper) wrapper.style.display = 'flex';
		document.body.style.minHeight = '';
        document.body.style.width = '280px';

        const reason = error?.visibility_status_reason;

        if (reason === 'active-payment-found' || reason === 'time-trial' || reason === 'openings-trial' || reason === 'country-not-match') {
            await chrome.storage.local.set({ 
                [`pw-${wallId}-access`]: true,
                cached_access_result: true,
                last_access_check: Date.now(),
                ...(reason === 'country-not-match' && { country_access_granted: true })
            });
        } else if (reason === 'closed-by-user') {
            console.log('User closed paywall');
        } else {
            console.log('Paywall unavailable:', reason);
        }
    }
}

async function handleForcePayment() {
    const wrapper = document.querySelector('.wrapper');
    const container = document.getElementById('paywall-container');
    
    if (wrapper) wrapper.style.display = 'none';
    document.body.style.width = '420px';
	document.body.style.minHeight = '0';
    container.style.width = '420px';
    container.style.height = '570px';
    container.style.display = 'block';

    try {
        paywall.init(wallId);
        await paywall.open({
            containerSelector: '#paywall-container',
            resolveEvent: 'success-purchase',
			consumeTrialOpen: false
        });
        
		await chrome.storage.local.remove(['last_access_check', 'cached_access_result']);
        container.style.display = 'none';
        if (wrapper) wrapper.style.display = 'flex';
		document.body.style.minHeight = '';
        document.body.style.width = '280px';
        
    } catch (error) {
        container.style.display = 'none';
        if (wrapper) wrapper.style.display = 'flex';
		document.body.style.minHeight = '';
        document.body.style.width = '280px';

        const reason = error?.visibility_status_reason;

        if (reason === 'active-payment-found' || reason === 'time-trial' || reason === 'openings-trial' || reason === 'country-not-match') {
            await chrome.storage.local.set({ 
                [`pw-${wallId}-access`]: true,
                cached_access_result: true,
                last_access_check: Date.now(),
                ...(reason === 'country-not-match' && { country_access_granted: true })
            });
        } else if (reason === 'closed-by-user') {
            console.log('User closed paywall');
        } else {
            console.log('Paywall unavailable:', reason);
        }
    }
}

const elements = ['brightness', 'contrast', 'sepia', 'grayscale', 'hueRotate'];
const presetIds = ['dark', 'vintage', 'gray', 'custom'];
const presets = CONFIG.PRESETS;

function getCurrentSliderValues() {
    return {
        brightness: parseInt(document.getElementById('brightness').value),
        contrast: parseInt(document.getElementById('contrast').value),
        sepia: parseInt(document.getElementById('sepia').value),
        grayscale: parseInt(document.getElementById('grayscale').value),
        hueRotate: parseInt(document.getElementById('hueRotate').value),
        invert: document.getElementById('invert').checked ? 1 : 0
    };
}

function updateLabel(id, val) {
    const label = document.getElementById(id + '-val');
    const el = document.getElementById(id);
    if (!el) return;

    el.value = val;
    const percent = ((el.value - el.min) / (el.max - el.min)) * 100;
    const fill = el.closest('.slider-wrap')?.querySelector('.slider-fill');
    if (fill) fill.style.width = percent + '%';

    if (label) {
        if (id === 'brightness' || id === 'contrast') {
            const offset = val - 100;
            label.textContent = (offset >= 0 ? '+' : '') + offset;
        } else if (id === 'hueRotate') {
            label.textContent = val + '°';
        } else {
            label.textContent = val;
        }
    }
}

function setActivePresetUI(element) {
    if (!element) return;
    document.querySelectorAll('.preset').forEach(p => p.classList.remove('preset--active'));
    element.classList.add('preset--active');

    const checkmark = document.getElementById('preset-checkmark-icon');
    const targetBox = element.querySelector('.preset__box');
    if (checkmark && targetBox) targetBox.appendChild(checkmark);
}

function generateFilterString(s) {
    return `brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`;
}

function previewSettings() {
    const values = getCurrentSliderValues();
    const gridFilter = generateFilterString(values);
    const settingsToSend = { ...values, gridFilter, preview: true };

    chrome.tabs.query({ url: "*://docs.google.com/document/*" }, (tabs) => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend });
        });
    });
    
    const allPresets = document.querySelectorAll('.preset');
    setActivePresetUI(allPresets[allPresets.length - 1]);
}

function refreshUI(settings, activePresetId) {
    elements.forEach(id => {
        const val = settings[id] !== undefined ? settings[id] : (id === 'hueRotate' ? 0 : 100);
        updateLabel(id, val);
    });
    document.getElementById('invert').checked = !!settings.invert;
    
    const index = presetIds.indexOf(activePresetId);
    if (index !== -1) {
        setActivePresetUI(document.querySelectorAll('.preset')[index]);
    }
}

function updateToggleIcons(enabled) {
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if (!sun || !moon) return;
    sun.setAttribute('stroke', enabled ? '#666' : '#d2b75e');
    moon.setAttribute('stroke', enabled ? '#d2b75e' : '#666');
}

chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {
    if (res.customPreset) presets.custom = res.customPreset;
    const s = res.themeSettings || CONFIG.DEFAULT_SETTINGS;

    const master = document.getElementById('master-switch');
    if (master) {
        const hasAccess = await checkAccess();
        const shouldBeEnabled = hasAccess && (s.enabled !== undefined ? s.enabled : false);
        
        master.checked = shouldBeEnabled;
        updateToggleIcons(shouldBeEnabled);

        if (!hasAccess && s.enabled) {
            const newSettings = { ...s, enabled: false };
            chrome.storage.local.set({ themeSettings: newSettings });
        }

        master.onclick = async (e) => {
            const wantedState = master.checked; 
            master.checked = !wantedState;

            try {
                const hasAccess = await checkAccess();
                
                if (!hasAccess) {
                    await handlePayment();
					const hasAccessNow = await checkAccess();
                   if (!hasAccessNow) return;
                }

                master.checked = wantedState;
                updateToggleIcons(wantedState);
                
                chrome.storage.local.get(['themeSettings'], (r) => {
                    const current = r.themeSettings || CONFIG.DEFAULT_SETTINGS;
                    const newSettings = { ...current, enabled: wantedState };
                    
                    chrome.storage.local.set({ themeSettings: newSettings }, () => {
                        if (typeof refreshUI === 'function') refreshUI(newSettings, newSettings.activePreset);
                    });
                });
            } catch (err) {
                console.error("Ошибка при переключении:", err);
            }
        };
    }

    refreshUI(s, s.activePreset || 'dark');
});
[...elements, 'invert'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.oninput = () => {
        if (id !== 'invert') updateLabel(id, el.value);
        previewSettings();
    };
});

document.querySelectorAll('.arrow').forEach(btn => {
    btn.onclick = () => {
        const targetId = btn.getAttribute('data-target');
        const step = parseInt(btn.getAttribute('data-step'));
        const slider = document.getElementById(targetId);
        if (slider) {
            slider.value = parseInt(slider.value) + step;
            updateLabel(targetId, slider.value);
            slider.oninput();
        }
    };
});

document.querySelectorAll('.preset').forEach((preset, index) => {
    preset.onclick = async () => {
		const hasAccess = await checkAccess();
		if (!hasAccess) {
			await handlePayment();
			const hasAccessNow = await checkAccess();
			if (!hasAccessNow) return;
		}
		
        const presetId = presetIds[index];
        const data = (presetId === 'custom') ? presets.custom : CONFIG.PRESETS[presetId];
        
        if (!data) return;

        chrome.storage.local.get(['themeSettings'], (res) => {
            const current = res.themeSettings || CONFIG.DEFAULT_SETTINGS;
            const newSettings = {
                ...current,
                ...data,
                activePreset: presetId,
                gridFilter: generateFilterString(data)
            };
            chrome.storage.local.set({ themeSettings: newSettings }, () => {
                refreshUI(newSettings, presetId);
            });
        });
    };
});

document.getElementById('save').onclick = async function() {
	const hasAccess = await checkAccess();
    if (!hasAccess) {
        await handlePayment();
        const hasAccessNow = await checkAccess();
        if (!hasAccessNow) return;
    }
	
    const currentValues = getCurrentSliderValues();
    
    chrome.storage.local.get(['themeSettings'], (res) => {
        const current = res.themeSettings || CONFIG.DEFAULT_SETTINGS;
        const newSettings = {
            ...current,
            ...currentValues,
            activePreset: 'custom',
            gridFilter: generateFilterString(currentValues)
        };

        chrome.storage.local.set({ 
            customPreset: currentValues, 
            themeSettings: newSettings 
        }, () => {
            presets.custom = currentValues;
            this.textContent = 'Saved!';
            setTimeout(() => this.textContent = 'Save Preset', 1000);
        });
    });
};

document.getElementById('link-sub').onclick = async (e) => {
    e.preventDefault();
    const hasAccess = await checkAccess();
    if (hasAccess) {
        try {
            const user = await paywall.getUser();
            if (user.paid) {
                chrome.tabs.create({ 
                    url: `https://appbox.space/paywall/${wallId}/customer-portal/get` 
                });
            } else {
                await handleForcePayment();
            }
        } catch(e) {
            await handleForcePayment();
        }
    } else {
        await handleForcePayment();
    }
};

document.getElementById('link-support').onclick = (e) => {
	e.preventDefault();
	chrome.tabs.create({ url: 'https://appbox.space/paywall/' + wallId + '/customer-portal/get?tab=support' });
};