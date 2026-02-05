// Leaderboard service using localStorage for demo
// Can be replaced with Firebase or other backend

export class Leaderboard {
  constructor(game) {
    this.game = game;
    this.gameOverScreen = document.getElementById('gameOver');
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Submit score button
    document.getElementById('submitScoreBtn').addEventListener('click', () => {
      const nameInput = document.getElementById('playerName');
      const name = nameInput.value.trim();
      
      if (name) {
        this.saveScore(name, this.game.score);
        nameInput.value = '';
        this.hide();
        this.showLeaderboard();
      } else {
        alert('Please enter your name!');
      }
    });

    // Play again button
    document.getElementById('playAgainBtn').addEventListener('click', () => {
      this.hide();
      this.game.start(performance.now());
    });

    // Menu button
    document.getElementById('menuBtn').addEventListener('click', () => {
      this.hide();
      document.getElementById('game').classList.remove('active');
      document.getElementById('menu').classList.add('active');
    });
  }

  show() {
    document.getElementById('finalScore').textContent = this.game.score;
    this.gameOverScreen.classList.add('active');
  }

  hide() {
    this.gameOverScreen.classList.remove('active');
  }

  showLeaderboard() {
    document.getElementById('leaderboard').classList.add('active');
    this.load();
  }

  saveScore(name, score) {
    const scores = this.getScores();
    scores.push({
      name,
      score,
      time: Date.now()
    });
    
    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);
    
    // Keep top 10
    const topScores = scores.slice(0, 10);
    
    localStorage.setItem('quickqual_scores', JSON.stringify(topScores));
  }

  getScores() {
    const stored = localStorage.getItem('quickqual_scores');
    return stored ? JSON.parse(stored) : [];
  }

  load() {
    const scores = this.getScores();
    const listElement = document.getElementById('leaderboardList');
    
    if (scores.length === 0) {
      listElement.innerHTML = '<p class="loading">No scores yet. Be the first!</p>';
      return;
    }

    listElement.innerHTML = scores.map((score, index) => `
      <div class="leaderboard-entry">
        <span class="leaderboard-rank">#${index + 1}</span>
        <span class="leaderboard-name">${this.escapeHtml(score.name)}</span>
        <span class="leaderboard-score">${score.score}</span>
      </div>
    `).join('');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Make leaderboard globally accessible
window.leaderboard = null;