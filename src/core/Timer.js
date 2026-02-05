export class Timer {
  constructor(duration) {
    this.duration = duration;
    this.startTime = 0;
    this.remaining = duration;
    this.pausedTime = 0;
    this.isPaused = false;
  }

  start(now) {
    this.startTime = now;
    this.remaining = this.duration;
    this.pausedTime = 0;
    this.isPaused = false;
  }

  pause(now) {
    if (!this.isPaused) {
      this.pausedTime = now;
      this.isPaused = true;
    }
  }

  resume(now) {
    if (this.isPaused) {
      this.startTime += (now - this.pausedTime);
      this.isPaused = false;
    }
  }

  update(now) {
    if (this.isPaused) return;
    
    this.remaining = Math.max(
      0,
      this.duration - (now - this.startTime)
    );
  }

  isOver() {
    return this.remaining <= 0;
  }

  getTimeString() {
    const seconds = Math.ceil(this.remaining / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}