const SETTING_CAPTURE_TO_CLOUD = "cookn1_capture_server";
const SETTING_CAPTURE_TO_DESKTOP = "cookn1_capture_desktop";

function putSetting(setting, value) {
    setInStorage(setting, value);
}

async function getSetting(setting) {
    const value = await getFromStorage(setting);
    return value;
}

async function getSettings(settings) {
    let values = [];
    for (let i = 0; i < settings.length; i++) {
        const setting = settings[i];
        const value = await getFromStorage(setting);
        values.push(value);
    }
    return values;
}