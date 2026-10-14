const storage = browser.storage.sync;

function setInStorage(key, val) {
    const obj = {};
    obj[key] = val;
    // alert("set obj: " + JSON.stringify(obj)); // For debugging
    storage.set(obj);
}

async function getFromStorage(key) {
    const obj = await storage.get(key);
    const val = obj[key];
    return val;
}