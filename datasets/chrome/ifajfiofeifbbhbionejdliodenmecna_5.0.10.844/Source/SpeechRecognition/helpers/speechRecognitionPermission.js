/**************************************************************************
 **
 ** speechRecognitionPermission.js
 **
 ** Created by Ion Juravle on Sep 15, 2015.
 ** Copyright (c) 2015 Don Johnston, Inc. All rights reserved.
 **
 **************************************************************************/

window.addEventListener("message", async (event) => {
    if (!event.data) {
        return;
    }

    if (event.data.type === "get-user-media-status") {
        const userMediaStatus = await getUserMediaStatus();
        event.source?.postMessage({ type: "get-user-media-status", userMediaStatus }, { targetOrigin: event.origin });
        return;
    }

}, false);

async function getUserMediaStatus() {
    return new Promise((resolve) => {
        navigator.mediaDevices.getUserMedia({audio: true})
        .then(function (stream) {
            let tracks = stream.getTracks();
            if (tracks) {
                for (let index = 0; index < tracks.length; index++) {
                    tracks[index].stop();
                }
            }

            resolve(1);
        })
        .catch(function (e) {
            resolve(-1);
        });
    });
}
