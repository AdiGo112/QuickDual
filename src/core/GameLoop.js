export class GameLoop {
  constructor(update, render) {
    this.update = update;
    this.render = render;
    this.last = 0;
    this.animationId = null;
  }

  start() {
    this.last = performance.now();
    this.animationId = requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  loop(ts) {
    const dt = ts - this.last;
    this.last = ts;

    this.update(dt, ts);
    this.render();

    this.animationId = requestAnimationFrame(this.loop.bind(this));
  }
}