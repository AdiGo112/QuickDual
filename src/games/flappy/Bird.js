import { FLAPPY } from "../../utils/Constants.js";

export class Bird {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = this.canvas.width / 4;
    this.y = this.canvas.height / 2;
    this.vy = 0;
    this.isDead = false;
  }

  flap() {
    if (!this.isDead) {
      this.vy = FLAPPY.JUMP;
    }
  }

  update() {
    if (this.isDead) return;

    this.vy += FLAPPY.GRAVITY;
    this.y += this.vy;

    // Check boundaries
    if (this.y < FLAPPY.BIRD_SIZE / 2) {
      this.y = FLAPPY.BIRD_SIZE / 2;
      this.vy = 0;
    }
    
    if (this.y > this.canvas.height - FLAPPY.BIRD_SIZE / 2) {
      this.y = this.canvas.height - FLAPPY.BIRD_SIZE / 2;
      this.vy = 0;
      this.isDead = true;
    }
  }

  draw() {
    this.ctx.fillStyle = this.isDead ? "#888" : "#FFD700";
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.isDead ? "#444" : "#FFA500";
    
    // Draw bird as a circle
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, FLAPPY.BIRD_SIZE / 2, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Draw eye
    this.ctx.fillStyle = "#000";
    this.ctx.shadowBlur = 0;
    this.ctx.beginPath();
    this.ctx.arc(this.x + 5, this.y - 3, 3, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Draw beak
    this.ctx.fillStyle = "#FF6347";
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + FLAPPY.BIRD_SIZE / 2, this.y);
    this.ctx.lineTo(this.x + FLAPPY.BIRD_SIZE / 2 + 8, this.y - 3);
    this.ctx.lineTo(this.x + FLAPPY.BIRD_SIZE / 2 + 8, this.y + 3);
    this.ctx.closePath();
    this.ctx.fill();
  }

  getBounds() {
    return {
      x: this.x - FLAPPY.BIRD_SIZE / 2,
      y: this.y - FLAPPY.BIRD_SIZE / 2,
      width: FLAPPY.BIRD_SIZE,
      height: FLAPPY.BIRD_SIZE
    };
  }
}