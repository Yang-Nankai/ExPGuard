// Prevent duplicate injection
(() => {
    const GUARD_SYMBOL = 'vext_lg_active';
    if (globalThis[GUARD_SYMBOL]) {
        return;
    }
    globalThis[GUARD_SYMBOL] = true;
    (() => {
        const devLog = (() => {
            try {
                const isDev = false;
                if (!isDev) {
                    return {
                        log: () => { }, error: () => { }, warn: () => { }, info: () => { },
                        dir: () => { }, time: () => { }, timeEnd: () => { }, debug: () => { }
                    };
                }
                return {
                    log: console.log.bind(console),
                    error: console.error.bind(console),
                    warn: console.warn.bind(console),
                    info: console.info.bind(console),
                    dir: console.dir.bind(console),
                    time: console.time.bind(console),
                    timeEnd: console.timeEnd.bind(console),
                    debug: console.debug.bind(console)
                };
            } catch (_) {
                return {
                    log: () => { }, error: () => { }, warn: () => { }, info: () => { },
                    dir: () => { }, time: () => { }, timeEnd: () => { }, debug: () => { }
                };
            }
        })();

        // Canvas manager
        class CanvasManager {
            constructor() {
                this.canvas = null;
                this.ctx = null;
                this.busy = false;
                this.busyStart = 0;
                this.sampleCanvas = null;
                this.sampleCtx = null;
            }

            async acquire() {
                const timeout = 5000;
                const start = Date.now();

                while (this.busy) {
                    if (Date.now() - start > timeout) {
                        devLog.warn('[Canvas] Timeout waiting for canvas, force releasing');
                        this.busy = false;
                        break;
                    }
                    await new Promise(r => setTimeout(r, 5));
                }

                this.busy = true;
                this.busyStart = Date.now();

                if (!this.canvas) {
                    this.canvas = new OffscreenCanvas(1, 1);
                    this.ctx = this.canvas.getContext('2d');
                }

                return { canvas: this.canvas, ctx: this.ctx };
            }

            release() {
                try {
                    if (this.canvas) {
                        this.canvas.width = 1;
                        this.canvas.height = 1;
                    }
                } catch (_) {
                }
                this.busy = false;
            }

            getSampleCanvas() {
                if (!this.sampleCanvas) {
                    this.sampleCanvas = new OffscreenCanvas(16, 16);
                    this.sampleCtx = this.sampleCanvas.getContext('2d');
                }
                return { canvas: this.sampleCanvas, ctx: this.sampleCtx };
            }

            // Check if frame is mostly black
            isFrameBlack(video) {
                try {
                    const { canvas, ctx } = this.getSampleCanvas();
                    const w = Math.min(16, video.videoWidth || 16);
                    const h = Math.min(16, video.videoHeight || 16);

                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(video, 0, 0, w, h);

                    const data = ctx.getImageData(0, 0, w, h).data;
                    let nonBlackPixels = 0;
                    for (let i = 0; i < data.length; i += 16) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        const a = data[i + 3];

                        if (a > 10 && (r > 15 || g > 15 || b > 15)) {
                            nonBlackPixels++;
                        }
                    }

                    const totalSamples = Math.floor(data.length / 16);
                    return (nonBlackPixels / totalSamples) < 0.1;
                } catch (_) {
                    return false;
                }
            }
        }

        // Main snapshot service
        class VideoSnapshotService {
            static canvasManager = new CanvasManager();
            static cancelled = new Set();
            static activeRequests = new Map();
            static watchdogTimer = null;

            static startWatchdog() {
                if (this.watchdogTimer) return;
                this.watchdogTimer = setInterval(() => {
                    if (this.canvasManager.busy) {
                        const elapsed = Date.now() - this.canvasManager.busyStart;
                        if (elapsed > 30000) {
                            devLog.warn('[Watchdog] Canvas stuck for 30s, force releasing');
                            this.canvasManager.release();
                        }
                    }
                }, 30000);
            }

            static cancelRequest(requestId) {
                if (!requestId) return;
                this.cancelled.add(String(requestId));

                // Remove from active requests
                for (const [trackId, activeReqId] of this.activeRequests.entries()) {
                    if (activeReqId === requestId) {
                        this.activeRequests.delete(trackId);
                        break;
                    }
                }
            }

            static isCancelled(requestId) {
                return requestId ? this.cancelled.has(String(requestId)) : false;
            }

            static async handleRequest(message, sendResponse) {
                const { trackId, requestId } = message;

                if (!trackId) {
                    sendResponse({ success: false, error: 'invalid_track_id', requestId });
                    return;
                }

                // Start watchdog on first use
                this.startWatchdog();

                // Cancel any existing request for this track
                const existingReqId = this.activeRequests.get(trackId);
                if (existingReqId) {
                    this.cancelRequest(existingReqId);
                }

                // Mark as active
                this.activeRequests.set(trackId, requestId);

                try {
                    const result = await this.captureTrack(trackId, message);

                    if (this.isCancelled(requestId)) {
                        sendResponse({ success: false, error: 'cancelled', requestId, trackId });
                        return;
                    }

                    if (result.success) {
                        sendResponse({
                            success: true,
                            dataUrl: result.dataUrl,
                            width: result.width,
                            height: result.height,
                            requestId,
                            trackId
                        });
                    } else {
                        sendResponse({
                            success: false,
                            error: result.error,
                            requestId,
                            trackId
                        });
                    }
                } catch (error) {
                    devLog.error('[VideoSnapshot] Request failed:', error);
                    sendResponse({
                        success: false,
                        error: 'capture_failed',
                        requestId,
                        trackId
                    });
                } finally {
                    this.activeRequests.delete(trackId);
                }
            }

            static async captureTrack(trackId, options = {}) {
                const {
                    readinessTimeoutMs = 5000,
                    findTimeoutMs = 10000,
                    findIntervalMs = 200,
                    requestId = 'unknown'
                } = options;

                // Find video element with this track (NO CANVAS NEEDED YET)
                const video = await this.findVideoByTrack(trackId, findTimeoutMs, findIntervalMs, requestId);
                if (!video) {
                    return { success: false, error: 'video_not_found' };
                }

                // Wait for video readiness (NO CANVAS NEEDED YET)
                if (!(await this.waitForVideoReady(video, readinessTimeoutMs, requestId))) {
                    return { success: false, error: 'video_not_ready' };
                }

                // Check for black frame using sample canvas (SEPARATE FROM MAIN CANVAS)
                if (this.canvasManager.isFrameBlack(video)) {
                    return { success: false, error: 'frame_black' };
                }

                // NOW acquire main canvas for actual capture
                return await this.captureVideoFrame(video);
            }

            static async findVideoByTrack(trackId, timeoutMs, intervalMs, requestId) {
                const endTime = Date.now() + timeoutMs;
                let attempts = 0;
                const maxQuickAttempts = 5;

                while (Date.now() < endTime) {
                    if (this.isCancelled(requestId)) return null;

                    let video = null;

                    video = this.findVideoInRoot(document, trackId);
                    if (video) return video;

                    if (attempts >= 2) {
                        video = this.findVideoInOpenShadows(trackId);
                        if (video) return video;
                    }

                    if (attempts >= 4 && chrome?.dom?.openOrClosedShadowRoot) {
                        video = this.findVideoInClosedShadows(trackId);
                        if (video) return video;
                    }

                    attempts++;

                    if (attempts >= maxQuickAttempts) {
                        const hasAnyVideos = document.querySelectorAll('video').length > 0;
                        if (!hasAnyVideos) {
                            devLog.warn(`[VideoSnapshot] No videos found after ${attempts} attempts`);
                            return null;
                        }
                    }

                    const baseWait = attempts < maxQuickAttempts ? intervalMs : Math.min(intervalMs * 2, 1000);
                    const jitter = Math.random() * 0.4 + 0.8;
                    const waitTime = Math.floor(baseWait * jitter);
                    await new Promise(r => setTimeout(r, waitTime));
                }

                return null;
            }

            static findVideoInRoot(root, trackId) {
                try {
                    const videos = root.querySelectorAll('video');
                    for (let i = 0; i < videos.length; i++) {
                        const video = videos[i];
                        if (this.checkVideoForTrack(video, trackId)) {
                            return video;
                        }
                    }
                } catch (_) {
                }
                return null;
            }

            static findVideoInOpenShadows(trackId) {
                try {
                    const walker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
                    let node;
                    while (node = walker.nextNode()) {
                        try {
                            const shadowRoot = node.shadowRoot;
                            if (shadowRoot) {
                                const video = this.findVideoInRoot(shadowRoot, trackId);
                                if (video) return video;
                            }
                        } catch (_) {
                            continue;
                        }
                    }
                } catch (_) {
                }
                return null;
            }

            static findVideoInClosedShadows(trackId) {
                try {
                    if (!chrome?.dom?.openOrClosedShadowRoot) return null;

                    const walker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
                    let node;
                    while (node = walker.nextNode()) {
                        try {
                            const shadowRoot = chrome.dom.openOrClosedShadowRoot(node);
                            if (shadowRoot && shadowRoot !== node.shadowRoot) {
                                const video = this.findVideoInRoot(shadowRoot, trackId);
                                if (video) return video;
                            }
                        } catch (_) {
                            continue;
                        }
                    }
                } catch (_) {
                }
                return null;
            }

            static checkVideoForTrack(video, trackId) {
                try {
                    const stream = video.srcObject;

                    if (!stream) return false;
                    if (typeof stream.getVideoTracks !== 'function') return false;
                    if (!(stream instanceof MediaStream)) return false;

                    const tracks = stream.getVideoTracks();
                    if (!Array.isArray(tracks)) return false;

                    return tracks.some(track =>
                        track &&
                        track.id === trackId &&
                        track.readyState === 'live' &&
                        track.kind === 'video'
                    );
                } catch (_) {
                    return false;
                }
            }


            static async waitForVideoReady(video, timeoutMs, requestId) {
                // Try modern requestVideoFrameCallback API first
                if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
                    return await this.waitForVideoFrameCallback(video, timeoutMs, requestId);
                }

                // Fallback to traditional method
                return await this.waitForVideoReadyFallback(video, timeoutMs, requestId);
            }

            static async waitForVideoFrameCallback(video, timeoutMs, requestId) {
                return new Promise((resolve) => {
                    const timeout = setTimeout(() => {
                        resolve(false);
                    }, timeoutMs);

                    const frameCallback = (now, metadata) => {
                        if (this.isCancelled(requestId)) {
                            clearTimeout(timeout);
                            resolve(false);
                            return;
                        }

                        if (metadata.receiveTime === undefined) {
                            resolve(false);
                        }

                        // Check if we have valid frame data
                        if (metadata &&
                            metadata.width > 0 &&
                            metadata.height > 0 &&
                            metadata.presentedFrames > 0) {
                            clearTimeout(timeout);
                            resolve(true);
                            return;
                        }

                        // Continue waiting for next frame
                        try {
                            video.requestVideoFrameCallback(frameCallback);
                        } catch (_) {
                            clearTimeout(timeout);
                            resolve(false);
                        }
                    };

                    try {
                        video.requestVideoFrameCallback(frameCallback);
                    } catch (_) {
                        clearTimeout(timeout);
                        resolve(false);
                    }
                });
            }

            static async waitForVideoReadyFallback(video, timeoutMs, requestId) {
                const endTime = Date.now() + timeoutMs;

                while (Date.now() < endTime) {
                    if (this.isCancelled(requestId)) return false;

                    if (video.readyState >= 3 &&
                        video.videoWidth > 0 &&
                        video.videoHeight > 0 &&
                        !video.paused &&
                        !video.ended &&
                        video.currentTime > 0) {
                        return true;
                    }

                    await new Promise(r => setTimeout(r, 50));
                }

                return false;
            }

            static async captureVideoFrame(video) {
                const width = video.videoWidth || 640;
                const height = video.videoHeight || 360;

                if (typeof OffscreenCanvas === 'undefined') {
                    return { success: false, error: 'no_offscreen_canvas' };
                }

                try {
                    const { canvas, ctx } = await this.canvasManager.acquire();

                    if (!ctx) {
                        this.canvasManager.release();
                        return { success: false, error: 'no_canvas_context' };
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(video, 0, 0, width, height);

                    const blobPromise = canvas.convertToBlob({ type: 'image/webp', quality: 0.8 });
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('blob_timeout')), 10000)
                    );

                    const blob = await Promise.race([blobPromise, timeoutPromise]);

                    const dataUrl = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = () => reject(new Error('reader_error'));
                        reader.readAsDataURL(blob);
                    });

                    this.canvasManager.release();

                    return {
                        success: true,
                        dataUrl,
                        width,
                        height
                    };
                } catch (error) {
                    this.canvasManager.release();
                    return {
                        success: false,
                        error: error.message || 'capture_error'
                    };
                }
            }
        }

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            try {
                if (message?.type === 'looking_glass_ping') {
                    sendResponse({ success: true, lookingGlass: true });
                    return true;
                }

                if (message?.type === 'video-track-snapshot') {
                    VideoSnapshotService.handleRequest(message, sendResponse);
                    return true;
                }

                if (message?.type === 'video-track-snapshot-cancel') {
                    VideoSnapshotService.cancelRequest(message.requestId);
                    sendResponse({ success: true });
                    return true;
                }
            } catch (error) {
                devLog.error('[LookingGlass] Message handler error:', error);
                sendResponse({ success: false, error: 'handler_error' });
            }
        });
    })();
})();