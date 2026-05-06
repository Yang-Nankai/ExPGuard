"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
/**
 * Timer
 */
class Timer {
    constructor(name) {
        this.startTime = null;
        this.endTime = null;
        this.pausedTime = 0;
        this.pauseStartTime = null;
        this.lapTimes = [];
        this.lapStartTime = null;
        this.name = name;
    }
    getCurrentTime() {
        return Date.now();
    }
    start() {
        const now = this.getCurrentTime();
        this.startTime = now;
        this.lapStartTime = now;
        this.endTime = null;
        this.pauseStartTime = null;
        this.pausedTime = 0;
        this.lapTimes = [];
    }
    stop() {
        if (this.isPaused())
            this.resume(); // Resume if paused
        this.endTime = this.getCurrentTime();
    }
    pause() {
        if (!this.isPaused())
            this.pauseStartTime = this.getCurrentTime();
    }
    resume() {
        if (this.isPaused() && this.pauseStartTime !== null) {
            this.pausedTime += this.getCurrentTime() - this.pauseStartTime;
            this.pauseStartTime = null;
        }
    }
    isPaused() {
        return this.pauseStartTime !== null;
    }
    reset() {
        this.startTime = null;
        this.endTime = null;
        this.pausedTime = 0;
        this.pauseStartTime = null;
        this.lapTimes = [];
        this.lapStartTime = null;
    }
    lap() {
        if (this.lapStartTime !== null) {
            const now = this.getCurrentTime();
            const lapDuration = now - this.lapStartTime - this.pausedTime;
            this.lapTimes.push(lapDuration / 1000);
            this.lapStartTime = now;
            this.pausedTime = 0;
        }
    }
    getLapTimes() {
        return this.lapTimes;
    }
    getDurationMs() {
        var _a;
        if (this.startTime === null)
            return 0;
        const end = (_a = this.endTime) !== null && _a !== void 0 ? _a : this.getCurrentTime();
        return (end - this.startTime - this.pausedTime);
    }
    getDuration() {
        return this.getDurationMs() / 1000;
    }
    getElapsedDuration() {
        var _a;
        if (this.startTime === null)
            return null;
        if (this.isPaused() && this.pauseStartTime !== null) {
            return this.pauseStartTime - this.startTime - this.pausedTime;
        }
        const end = (_a = this.endTime) !== null && _a !== void 0 ? _a : this.getCurrentTime();
        return end - this.startTime - this.pausedTime;
    }
    getElapsedDurationInSeconds() {
        const elapsed = this.getElapsedDuration();
        return elapsed !== null ? elapsed / 1000 : null;
    }
}
exports.Timer = Timer;
