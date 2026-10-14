document.body.setAttribute('data-extension-version', '2.2.0');

if (location.pathname == '/v1/toolbar/bridge.php') {
    window.storagePromise = chrome.storage.local.get().then(storage => {
        Object.assign(sessionStorage, storage);
        ['docentID', 'docentURL'].forEach(key => {
            if (key in storage) {
                localStorage[key] = storage[key];
            }
        });
        chrome.storage.local.clear();
    });
}

function setupTutorial(event) {
    var msg = {
        type: 'tutorial',
        page: event.target.href
    };
    chrome.runtime.sendMessage(msg);
};

document.querySelectorAll('.tutorial-link').forEach(function(element) {
    element.addEventListener('click', setupTutorial);
    element.addEventListener('contextmenu', setupTutorial);
});

var GoogleClassroom = Object.assign(window.GoogleClassroom || {}, {
    scopes: [
        'profile',
        'email',
        'openid',
        'https://www.googleapis.com/auth/classroom.courses.readonly',
        'https://www.googleapis.com/auth/classroom.rosters.readonly',
        'https://www.googleapis.com/auth/classroom.coursework.students'
    ],
    importHandler: function(event) {
        signIn(true, GoogleClassroom.scopes, 'import');
        event.stopPropagation();
    },
    shareHandler: function(event) {
        event.target.disabled = true;
        signIn(true, GoogleClassroom.scopes, 'share');
        event.stopPropagation();
    },
    attachHandlers: function() {
        function attachHandler(element, handler) {
            if (element) element.addEventListener('click', handler);
        }
        attachHandler(document.querySelector('.import-from-google-classroom'), GoogleClassroom.importHandler);
        attachHandler(document.querySelector('.share-to-google-classroom'), GoogleClassroom.shareHandler);
    },
    removeHandlers: function() {
        function removeHandler(element, handler) {
            if (element) element.removeEventListener('click', handler);
        }
        removeHandler(document.querySelector('.import-from-google-classroom'), GoogleClassroom.importHandler);
        removeHandler(document.querySelector('.share-to-google-classroom'), GoogleClassroom.shareHandler);
        
        var msg = {
            type: 'logout',
            scopes: GoogleClassroom.scopes
        };
        chrome.runtime.sendMessage(msg);
    }
});

function signIn(interactive, scopes, googleClassroom) {
    if (!interactive && (location.pathname == '/docent-dev/' || location.pathname == '/v1/')) {
        signOut();
        return;
    }
    var msg = {
        type: 'login',
        interactive: interactive,
        scopes: scopes
    };
    chrome.runtime.sendMessage(msg, function(token) {
        var loginButton = document.getElementById('g-signin2');
        if (loginButton) {
            loginButton.removeAttribute('disabled');
        }
        if (!token) {
            if (googleClassroom == 'share') {
                document.querySelector('.share-to-google-classroom').disabled = false;
            }
            else if (!googleClassroom) {
                window.postMessage({logout: true }, location.origin);
            }
            return false;
        }
        var msg = {
            token: token,
            googleClassroom: googleClassroom
        };
        window.postMessage(msg, location.origin);
    });
    if (!googleClassroom) {
        GoogleClassroom.attachHandlers();
    }
}
document.addEventListener('click', function(event) {
    if (event.target.id == 'g-signin2' && event.target.classList.contains('no-cookies') && event.target.getAttribute('disabled') != 'disabled') {
        signIn(true);
        event.target.setAttribute('disabled', 'disabled');
    }
    if (event.target.classList.contains('sign-out')) {
        signOut();
    }
    var relayUserType = function(userType) {
        chrome.runtime.sendMessage({
            type: 'userType',
            userType: userType
        });
    };
    if (event.target.classList.contains('signup-as-teacher')) {
        relayUserType('teacher');
    }
    if (event.target.classList.contains('signup-as-student')) {
        relayUserType('student');
    }
});
window.addEventListener('message', function(event) {
    if (event.source == window && event.data && event.data.type == 'relayFromIframeBridge') {
        chrome.runtime.sendMessage(event.data);
    }
})
function signOut() {
    var msg = {
        type: 'logout'
    };
    chrome.runtime.sendMessage(msg, function() {
        var msg = {
            logout: true
        };
        window.postMessage(msg, location.origin);
    });
    GoogleClassroom.removeHandlers();
}
function useExtensionForLogin() {
    var loginButton = document.getElementById('g-signin2');
    if (loginButton) {
        loginButton.classList.add('custom', 'no-cookies');
    }
    signIn();
}
var gapiScript = document.querySelector('[src^="https://apis.google.com/js/api.js?onload=initGoogle"]');
if (!gapiScript || gapiScript.classList.contains('error') || window.noCookies) {
    useExtensionForLogin();
}
else {
    gapiScript.addEventListener('error', useExtensionForLogin);
}
