export class FloatingText {
  constructor(ctx, x, y, text, color = "#fff") {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.alpha = 1;
    this.vy = -2;
    this.lifetime = 60; // frames
  }

  update() {
    this.y += this.vy;
    this.alpha -= 0.02;
    this.lifetime--;
    
    return this.lifetime > 0 && this.alpha > 0;
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 3;
    this.ctx.strokeText(this.text, this.x, this.y);
    this.ctx.fillText(this.text, this.x, this.y);
    this.ctx.restore();
  }
}