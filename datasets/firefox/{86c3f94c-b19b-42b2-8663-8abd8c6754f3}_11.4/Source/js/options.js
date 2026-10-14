document.addEventListener("DOMContentLoaded", function() {
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
    hideEl("btn_login");

    showEl("email");
    getSessionEmail().then(function(email) {
        getEl("email").innerText = email;
    });

    showEl("options");
    getSettings([SETTING_CAPTURE_TO_DESKTOP, SETTING_CAPTURE_TO_CLOUD]).then(function(values) {
        const ctd = values[0];
        if (ctd !== false) {
            setCheckboxChecked("checkbox_capture_to_desktop", true)
        }

        const ctc = values[1];
        if (ctc !== false) {
            setCheckboxChecked("checkbox_capture_to_cloud", true)
        }
    });

    showEl("btn_logout");
}

function showLoggedOutUI() {
    showEl("btn_login");
    hideEl("email");
    hideEl("btn_logout");
    hideEl("options");
}


//// User Actions

function addUserActions() {
    addClickListener("btn_login", loginClicked);
    addClickListener("btn_logout", logoutClicked);
    addCheckboxChangeListener("checkbox_capture_to_desktop", function(checked) {
        putSetting(SETTING_CAPTURE_TO_DESKTOP, checked);
    });
    addCheckboxChangeListener("checkbox_capture_to_cloud", function(checked) {
        putSetting(SETTING_CAPTURE_TO_CLOUD, checked);
    });
    addClickListener("img_dvo", dvoClicked);
    addClickListener("img_facebook", facebookClicked);
    addClickListener("img_youtube", youtubeClicked);
    addClickListener("img_pinterest", pinterestClicked);
    addClickListener("img_mail", mailClicked);
}

function loginClicked() {
    disableClicks("btn_login");
    // First check to see if user is already logged in
    validateSession().then(function(isValid) {
        enableClicks("btn_login");
        if (isValid) {
            // User is already logged in, show logged in UI
            showLoggedInUI();
        } else {
            // User is not logged in, navigate to login page
			if (!permissionsGranted) {
				alert('Grant all the permissions in the "Permissions" tab to login.');
			} else {
				openUrl(URL_LOGIN);
			}
        }
    });
}

function logoutClicked() {
    showSpinner();
    clearSession(true).then(cleared => {
        hideSpinner();
        if (cleared) {
            // Reset default settings
            putSetting(SETTING_CAPTURE_TO_CLOUD, true);
            putSetting(SETTING_CAPTURE_TO_DESKTOP, true);

            showLoggedOutUI();
        } else {
            showStatusMsg("Failed to logout.\n\nPlease try again.", "error_msg");
        }
    });
}

function dvoClicked() {
    openUrl(URL_DVO_MAIN);
}

function facebookClicked() {
    openUrl(URL_FACEBOOK);
}

function youtubeClicked() {
    openUrl(URL_YOUTUBE);
}

function pinterestClicked() {
    openUrl(URL_PINTEREST);
}

function mailClicked() {
    openUrl(URL_SUPPORT);
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