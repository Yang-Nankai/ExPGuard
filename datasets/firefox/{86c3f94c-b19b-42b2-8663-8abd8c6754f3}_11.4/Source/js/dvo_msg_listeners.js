// Listen for window.postMessage from dvo.com pages
window.addEventListener("message", function(event) {
    const data = event.data;
    console.log(`Message Received: data=[${JSON.stringify(data)}]`);
    const action = data.action;

    // Third-Party Login result
    if (action === "loginWithThirdParty") {
        const sid = data.sessionId;
        const eml = data.email;
        saveSession(sid, eml);
    }
});