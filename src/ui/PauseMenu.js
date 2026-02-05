export class PauseMenu {
  constructor(game) {
    this.game = game;
    this.pauseMenuScreen = document.getElementById('pauseMenu');
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Pause button
    document.getElementById('pauseBtn').addEventListener('click', () => {
      this.show();
      this.game.pause(performance.now());
    });

    // Resume button
    document.getElementById('resumeBtn').addEventListener('click', () => {
      this.hide();
      this.game.resume(performance.now());
    });

    // Restart button
    document.getElementById('restartBtn').addEventListener('click', () => {
      this.hide();
      this.game.start(performance.now());
    });

    // Quit button
    document.getElementById('quitBtn').addEventListener('click', () => {
      this.hide();
      this.game.end();
      document.getElementById('game').classList.remove('active');
      document.getElementById('menu').classList.add('active');
    });

    // ESC key to pause/resume
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.game.state === 'playing') {
          this.show();
          this.game.pause(performance.now());
        } else if (this.game.state === 'paused') {
          this.hide();
          this.game.resume(performance.now());
        }
      }
    });
  }

  show() {
    this.pauseMenuScreen.classList.add('active');
  }

  hide() {
    this.pauseMenuScreen.classList.remove('active');
  }
}