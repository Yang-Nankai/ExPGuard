$(window).on('resize', resizeParent).on('message', function(event) {
    event = event.originalEvent;

    if (event.source == window && typeof event.data == 'object' && event.data.token) {
        $.ajax({
            url: 'https://insertlearning.com/v1/api/user/jwt',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + event.data.token);
            },
            success: function(response) {
                var $video = $('<video>', {
                    src: 'https://insertlearning.com/v1/api/videos/' + location.hash.substr(1) + '?jwt=' + response.jwt,
                    controls: true
                });
                $video.on('loadeddata', resizeParent);
                $('video').remove();
                $('body').html($video);
            }
        });
    }
});
function resizeParent() {
    var msg = {
        type: 'resizeThisIframe',
        width: '100%',
        height: $('video').height()
    };
    window.parent.postMessage(JSON.stringify(msg), '*');
}
