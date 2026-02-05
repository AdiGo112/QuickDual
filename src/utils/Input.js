// Input handling utility
// This can be expanded for more complex input management
export class Input {
  constructor() {
    this.keys = {};
    this.mouse = { x: 0, y: 0 };
    
    this.setupListeners();
  }

  setupListeners() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });

    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  isKeyPressed(keyCode) {
    return this.keys[keyCode] || false;
  }

  getMousePosition() {
    return { ...this.mouse };
  }
}