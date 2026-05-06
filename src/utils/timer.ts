/**
 * Timer
 */
export class Timer {
  public readonly name: string;
  private startTime: number | null = null; 
  private endTime: number | null = null;  
  private pausedTime: number = 0; 
  private pauseStartTime: number | null = null; 
  private lapTimes: number[] = []; 
  private lapStartTime: number | null = null; 

  constructor(name: string) {
    this.name = name;
  }

  private getCurrentTime(): number {
    return Date.now();
  }

  start(): void {
    const now = this.getCurrentTime();
    this.startTime = now;
    this.lapStartTime = now;
    this.endTime = null;
    this.pauseStartTime = null;
    this.pausedTime = 0;
    this.lapTimes = [];
  }

  stop(): void {
    if (this.isPaused()) this.resume(); // Resume if paused
    this.endTime = this.getCurrentTime();
  }

  pause(): void {
    if (!this.isPaused()) this.pauseStartTime = this.getCurrentTime();
  }

  resume(): void {
    if (this.isPaused() && this.pauseStartTime !== null) {
      this.pausedTime += this.getCurrentTime() - this.pauseStartTime;
      this.pauseStartTime = null;
    }
  }

  isPaused(): boolean {
    return this.pauseStartTime !== null;
  }

  reset(): void {
    this.startTime = null;
    this.endTime = null;
    this.pausedTime = 0;
    this.pauseStartTime = null;
    this.lapTimes = [];
    this.lapStartTime = null;
  }

  lap(): void {
    if (this.lapStartTime !== null) {
      const now = this.getCurrentTime();
      const lapDuration = now - this.lapStartTime - this.pausedTime;
      this.lapTimes.push(lapDuration / 1000);
      this.lapStartTime = now;
      this.pausedTime = 0;
    }
  }

  getLapTimes(): number[] {
    return this.lapTimes;
  }

  getDurationMs(): number {
    if (this.startTime === null) return 0;
    const end = this.endTime ?? this.getCurrentTime();
    return (end - this.startTime - this.pausedTime);
  }

  getDuration(): number {
    return this.getDurationMs() / 1000;
  }

  getElapsedDuration(): number | null {
    if (this.startTime === null) return null;
    if (this.isPaused() && this.pauseStartTime !== null) {
      return this.pauseStartTime - this.startTime - this.pausedTime;
    }
    const end = this.endTime ?? this.getCurrentTime();
    return end - this.startTime - this.pausedTime;
  }

  getElapsedDurationInSeconds(): number | null {
    const elapsed = this.getElapsedDuration();
    return elapsed !== null ? elapsed / 1000 : null;
  }
}
