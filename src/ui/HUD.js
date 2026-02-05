export class HUD {
  constructor(game) {
    this.game = game;
    this.scoreDisplay = document.getElementById('scoreDisplay');
    this.timerDisplay = document.getElementById('timerDisplay');
  }

  update() {
    this.scoreDisplay.textContent = this.game.score;
    this.timerDisplay.textContent = this.game.timer.getTimeString();
  }
}