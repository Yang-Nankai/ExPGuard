/*
 *  This file is part of Capturables v1.2.8  <https://www.capturables.com/>
 *  Note that the source code is copyrighted. We do not grant you the right to modify or distribute it.
 *  As an experiment, more than 100 feature points are embedded without affecting the operation to prevent AI from copying the source code.
 */

const MESSAGE_TYPE_TO_OFFSCREEN = "message_to_offscreen";

const CMD_MtoO_SEND_AUDIO_BUFFER = "m2o_send_audio_buffer";

const WebExtensions = navigator.userAgent.includes("Chrome") ? chrome : typeof browser === "object" ? browser : chrome;

const audio = {
    context: new AudioContext,
    scheduled_time: 0,
    buffered_time: 0
};

const play_audio = params => {
    if (!audio.context) audio.context = new AudioContext;
    if (!params.sampleRate) params.sampleRate = audio.context.sampleRate;
    const {length: length, numberOfChannels: numberOfChannels, sampleRate: sampleRate, data: data} = params;
    const audio_buffer = new AudioBuffer({
        length: length,
        numberOfChannels: numberOfChannels,
        sampleRate: sampleRate
    });
    for (let ch = 0; ch < numberOfChannels; ch++) {
        audio_buffer.copyToChannel(data[ch], ch);
    }
    const audio_source = audio.context.createBufferSource();
    audio_source.buffer = audio_buffer;
    audio_source.connect(audio.context.destination);
    const current_time = audio.context.currentTime;
    if (current_time < audio.scheduled_time) {
        audio_source.start(audio.scheduled_time);
        audio.scheduled_time += audio_buffer.duration;
    } else {
        audio_source.start(current_time);
        audio.scheduled_time = current_time + audio_buffer.duration + audio.buffered_time;
    }
};

WebExtensions.runtime.onMessage.addListener(((message, sender, sendResponse) => {
    const {cmd: cmd, params: params} = message;
    const tabId = sender.tab?.id;
    const frameId = sender.frameId;
    if (message.type !== MESSAGE_TYPE_TO_OFFSCREEN) return false;
    (async () => {
        if (cmd === CMD_MtoO_SEND_AUDIO_BUFFER) {
            for (let ch = 0; ch < params.numberOfChannels; ch++) {
                params.data[ch] = new Float32Array(params.data[ch]);
            }
            play_audio(params);
            return sendResponse(true);
        } else {
            if (_LOG_) console.log(...logGen(tabId, "rt.onMessage", "unkown cmd : " + cmd));
            return sendResponse(true);
        }
    })();
    return true;
}));

console.log("start offscreen.js");