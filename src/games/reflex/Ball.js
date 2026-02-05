import { REFLEX } from "../../utils/Constants.js";
import { FloatingText } from "../../utils/FloatingText.js";

export class Ball {
  constructor(ctx, canvas, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.game = game;
    this.floatingTexts = [];
    this.reset();
  }

  reset() {
    this.x = this.canvas.width / 2;
    this.y = 100;

    // Random initial direction (60°–120°)
    const angle = (Math.random() * 60 + 60) * (Math.PI / 180);
    const dir = Math.random() > 0.5 ? 1 : -1;

    this.dx = Math.cos(angle) * REFLEX.BALL_SPEED * dir;
    this.dy = Math.sin(angle) * REFLEX.BALL_SPEED;

    this.floatingTexts = [];
  }

  update(paddle) {
    this.x += this.dx;
    this.y += this.dy;

    // Left / Right wall collision
    if (
      this.x - REFLEX.BALL_RADIUS < 0 ||
      this.x + REFLEX.BALL_RADIUS > this.canvas.width
    ) {
      this.dx *= -1;
      this.x = Math.max(
        REFLEX.BALL_RADIUS,
        Math.min(this.canvas.width - REFLEX.BALL_RADIUS, this.x)
      );
    }

    // Top wall collision
    if (this.y - REFLEX.BALL_RADIUS < 0) {
      this.dy *= -1;
      this.y = REFLEX.BALL_RADIUS;
    }

    // Paddle collision
    const paddleY = this.canvas.height - 30;

    if (
      this.y + REFLEX.BALL_RADIUS >= paddleY &&
      this.y - REFLEX.BALL_RADIUS <= paddleY + REFLEX.PADDLE_HEIGHT &&
      this.x >= paddle.x &&
      this.x <= paddle.x + REFLEX.PADDLE_WIDTH &&
      this.dy > 0
    ) {
      // How far from paddle center (0 → 1)
      const hitPos = (this.x - paddle.x) / REFLEX.PADDLE_WIDTH;

      // Map hit position to angle (-45° → +45°)
      const angle = (hitPos - 0.5) * (Math.PI / 2);

      const speed = REFLEX.BALL_SPEED;

      this.dx = Math.sin(angle) * speed;
      this.dy = -Math.cos(angle) * speed;

      this.y = paddleY - REFLEX.BALL_RADIUS;
    }

    // Ball fell below screen
    if (this.y - REFLEX.BALL_RADIUS > this.canvas.height) {
      this.game.addScore(-100);
      this.floatingTexts.push(
        new FloatingText(
          this.ctx,
          this.canvas.width / 2,
          this.canvas.height / 2,
          "-100",
          "#F44336"
        )
      );
      this.reset();
    }

    // Update floating texts
    this.floatingTexts = this.floatingTexts.filter(ft => ft.update());
  }

  draw() {
    this.ctx.fillStyle = "#FF6347";
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = "#FF6347";

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, REFLEX.BALL_RADIUS, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.shadowBlur = 0;

    this.floatingTexts.forEach(ft => ft.draw());
  }
}
