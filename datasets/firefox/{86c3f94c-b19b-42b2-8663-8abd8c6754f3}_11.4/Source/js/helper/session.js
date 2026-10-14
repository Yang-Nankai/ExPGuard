const KEY_SESSION_ID = "cookn1_capture_sessionid";
const KEY_EMAIL = "cookn1_capture_email";

async function validateSession() {
    const sid = await getSessionId();
    if (!sid) {
        return false;
    }
    const result = await jsonPost(API_VALIDATE_SESSION, {sessionId: sid});
    const isValid = (result.key && result.key === "OK");
    return isValid;
}

async function getSessionId() {
    const sid = await getFromStorage(KEY_SESSION_ID);
    //console.log(`Session ID: [${sid}]`); // For debugging
    return sid;
}

async function getSessionEmail() {
    const eml = await getFromStorage(KEY_EMAIL);
    return eml;
}

function saveSession(sid, eml) {
    //console.log(`Saving Session: sid=[${sid}], eml=[${eml}]`); // For debugging
    setInStorage(KEY_SESSION_ID, sid);
    setInStorage(KEY_EMAIL, eml);
}

async function clearSession(logoutCloud) {
    const sid = await getSessionId();

    // Invalidate session ID in Cloud. We can ignore result
    if (logoutCloud) {
        await jsonPost(API_LOGOUT, {sessionId: sid});
    }

    // Remove session ID from storage
    saveSession(null, null);

    return true;
}
