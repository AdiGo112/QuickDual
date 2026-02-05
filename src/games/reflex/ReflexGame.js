import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";

export class ReflexGame {
  constructor(game) {
    const canvas = document.getElementById("reflexCanvas");
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.game = game;
    this.mouseX = canvas.width / 2;

    this.paddle = new Paddle(canvas);
    this.ball = new Ball(this.ctx, canvas, game);

    // Event listener for mouse movement
    this.handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
    };

    canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  reset() {
    this.paddle.reset();
    this.ball.reset();
    this.mouseX = this.canvas.width / 2;
  }

  update(dt) {
    this.paddle.update(this.mouseX);
    this.ball.update(this.paddle);
  }

  render() {
    // Clear canvas with gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw game elements
    this.ball.draw();
    this.paddle.draw(this.ctx);
  }

  destroy() {
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
  }
}