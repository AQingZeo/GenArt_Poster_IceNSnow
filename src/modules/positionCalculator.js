export class PositionCalculator {
  constructor(config) {
    this.canvasWidth = config.canvas.width;
    this.asciiStart = config.positioning.asciiStart;
    this.asciiEnd = config.positioning.asciiEnd;
    this.step = config.positioning.stepPt;
    this.noiseRange = config.positioning.noiseRangePt;
    this.mapCharCodeToX = new Map();
    this.precomputePositions();
  }

  precomputePositions() {
    let x = 0;
    let direction = 1; // 1: moving right, -1: moving left
    for (let code = this.asciiStart; code <= this.asciiEnd; code++) {
      this.mapCharCodeToX.set(code, x);
      const nextX = x + direction * this.step;
      if (nextX > this.canvasWidth || nextX < 0) {
        direction *= -1;
        x = Math.max(0, Math.min(this.canvasWidth, x + direction * this.step));
      } else {
        x = nextX;
      }
    }
  }

  getXForChar(character) {
    const code = character.codePointAt(0);
    const baseX = this.mapCharCodeToX.has(code)
      ? this.mapCharCodeToX.get(code)
      : Math.random() * this.canvasWidth;
    const jitter = (Math.random() * 2 - 1) * this.noiseRange;
    let x = baseX + jitter;
    if (x < 0) x += this.canvasWidth;
    if (x >= this.canvasWidth) x -= this.canvasWidth;
    return x;
  }
}

