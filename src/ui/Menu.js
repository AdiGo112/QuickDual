export class Menu {
  constructor(game) {
    this.game = game;
    this.menuScreen = document.getElementById('menu');
    this.tutorialScreen = document.getElementById('tutorial');
    this.leaderboardScreen = document.getElementById('leaderboard');
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Start button
    document.getElementById('startBtn').addEventListener('click', () => {
      this.hide();
      this.game.start(performance.now());
      this.showGameScreen();
    });

    // Tutorial button
    document.getElementById('tutorialBtn').addEventListener('click', () => {
      this.hide();
      this.showTutorial();
    });

    // Tutorial back button
    document.getElementById('tutorialBackBtn').addEventListener('click', () => {
      this.hideTutorial();
      this.show();
    });

    // Leaderboard button
    document.getElementById('leaderboardBtn').addEventListener('click', () => {
      this.showLeaderboard();
    });

    // Leaderboard close button
    document.getElementById('leaderboardCloseBtn').addEventListener('click', () => {
      this.hideLeaderboard();
    });
  }

  show() {
    this.menuScreen.classList.add('active');
    this.hideGameScreen();
  }

  hide() {
    this.menuScreen.classList.remove('active');
  }

  showTutorial() {
    this.tutorialScreen.classList.add('active');
  }

  hideTutorial() {
    this.tutorialScreen.classList.remove('active');
  }

  showLeaderboard() {
    this.leaderboardScreen.classList.add('active');
    // Trigger leaderboard load
    if (window.leaderboard) {
      window.leaderboard.load();
    }
  }

  hideLeaderboard() {
    this.leaderboardScreen.classList.remove('active');
  }

  showGameScreen() {
    document.getElementById('game').classList.add('active');
  }

  hideGameScreen() {
    document.getElementById('game').classList.remove('active');
  }
}