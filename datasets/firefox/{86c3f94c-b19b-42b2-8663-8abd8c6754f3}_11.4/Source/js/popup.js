document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");
    setupUI();
    addUserActions();
});


//// UI Layout

function setupUI() {
    showSpinner();
    validateSession().then(function(isValid) {
        hideSpinner();
        if (isValid) {
            // User is logged in
            showLoggedInUI();
        } else {
            // User is not logged in, clear local session and show login button
            clearSession(false);
            showLoggedOutUI();
        }
    });
}

function showLoggedInUI() {
    getSettings([SETTING_CAPTURE_TO_DESKTOP, SETTING_CAPTURE_TO_CLOUD]).then(function(values) {
        const ctd = values[0];
        if (ctd !== false) {
            showEl("btn_capture_to_desktop");
        }

        const ctc = values[1];
        if (ctc !== false) {
            showEl("btn_capture_to_cloud");
        }

        if (!(ctd !== false) && !(ctc !== false)) {
            // Both capture options disabled, show error message
            showStatusMsg("All options are disabled.\n\nPlease enable at least one option in settings.", "error_msg");
        }
    });
}

function showLoggedOutUI() {
    showEl("btn_login");
    hideEl("btn_capture_to_desktop");
    hideEl("btn_capture_to_cloud");
}


//// User Actions

function addUserActions() {
    addClickListener("img_settings", settingsClicked);
    addClickListener("btn_login", loginClicked);
    addClickListener("btn_capture_to_desktop", desktopCaptureClicked);
    addClickListener("btn_capture_to_cloud", cloudCaptureClicked);
}

function settingsClicked() {
    chrome.runtime.openOptionsPage();
    window.close();
}

function loginClicked() {
	if (!permissionsGranted) {
		requestPermissions();
	} else {
		openUrl(URL_LOGIN);
		window.close();
	}
}

function cloudCaptureClicked() {
    // Disable clicks on capture buttons to avoid double processing
    disableCaptureBtns();

    // Show spinner
    showSpinner();

    captureRecipeToCloud().then(result => {
        hideSpinner();
        const key = result.key;
        if (key) {
            if (key === "OK") {
                // Success
                showStatusMsg("Successfully Captured to Cloud!\n\n" + getRandomPhrase(), "success_msg");
            } else if (key === "SESSION_INVALID") {
                // Invalid Session, logout user and show login button
                clearSession(false);
                showLoggedOutUI();
                showStatusMsg("Invalid Session.\n\nPlease login again.", "error_msg");
            } else {
                // Error
                showStatusMsg("Unable to Capture recipe, the webpage may be formatted incorrectly.", "error_msg");
            }
        } else {
            showStatusMsg(`Error: [${JSON.stringify(result, undefined, 2)}]`, "error_msg");
        }

        // Re-enable buttons
        enableCaptureBtns();
    });
}

function desktopCaptureClicked() {
    // Disable clicks on capture buttons to avoid double processing
    disableCaptureBtns();

    // Show spinner
    showSpinner();

    captureRecipeToDesktop().then(result => {
        hideSpinner();

        if (result instanceof Error) {
            // Failed; ignore this because CORS error occurs even when successful
            // console.log(`Capture to Desktop Error: [${result.message}]`);
            // showStatusMsg("Failed to capture to Desktop.\n\nPlease make sure you have the Cook'n Desktop app " +
            //     "open and try again.", "error_msg");
        } else {
            showStatusMsg("Successfully Captured to Desktop!\n\n" + getRandomPhrase(), "success_msg");
        }

        // Re-enable buttons
        enableCaptureBtns();
    });
}


//// Helpers

function showSpinner() {
    showEl("spinner");
}

function hideSpinner() {
    hideEl("spinner");
}

// Supported 'kind' values:
//  - 'success_msg' - For successful messages
//  - 'error_msg' - For error messages
function showStatusMsg(msg, kind) {
    resetStatusMsgColor();
    showEl("status_msg");
    getEl("status_msg").innerText = msg;
    if (kind) {
        getEl("status_msg").classList.add(kind);
    }
}

function resetStatusMsgColor() {
    const statusMsg = getEl("status_msg")
    statusMsg.classList.remove("success_msg");
    statusMsg.classList.remove("error_msg");
}

function hideStatusMsg() {
    hideEl("status_msg");
    getEl("status_msg").innerText = "";
}

function disableCaptureBtns() {
    disableClicks("btn_capture_to_cloud");
    disableClicks("btn_capture_to_desktop");
}

function enableCaptureBtns() {
    enableClicks("btn_capture_to_cloud");
    enableClicks("btn_capture_to_desktop");
}

async function requestPermissions() {
	const response = await browser.permissions.request(checkPermissions);
	permissionsGranted = response;
	if (permissionsGranted) {
		openUrl(URL_LOGIN);
		window.close();
	}
}
