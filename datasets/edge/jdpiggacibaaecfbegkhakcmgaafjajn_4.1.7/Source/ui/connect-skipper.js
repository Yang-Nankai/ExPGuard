// since native messaging permission is optional here, UX is quite complicated
// this is a shortcut to redirect to whenever in the UI the logic for enabling native messaging is right now
document.addEventListener('DOMContentLoaded', () => {
    const targetUrl = chrome.runtime.getURL('webrtc-demo.html?needSetupNativeMessaging=true');
    window.location.href = targetUrl;
});