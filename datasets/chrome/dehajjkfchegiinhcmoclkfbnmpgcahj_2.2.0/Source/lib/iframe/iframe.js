window.addEventListener('message', function(event) {
    if (event.origin == 'https://insertlearning.com') {
        event.source.postMessage(event.data, event.origin);
    }
});
