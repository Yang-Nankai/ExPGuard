/**
 * Timer
 */
export declare class Timer {
    readonly name: string;
    private startTime;
    private endTime;
    private pausedTime;
    private pauseStartTime;
    private lapTimes;
    private lapStartTime;
    constructor(name: string);
    private getCurrentTime;
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    isPaused(): boolean;
    reset(): void;
    lap(): void;
    getLapTimes(): number[];
    getDurationMs(): number;
    getDuration(): number;
    getElapsedDuration(): number | null;
    getElapsedDurationInSeconds(): number | null;
}
