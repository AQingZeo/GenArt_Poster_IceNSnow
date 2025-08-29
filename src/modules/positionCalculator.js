export class PositionCalculator {
  constructor(config) {
    this.canvasWidth = config.canvas.width;
    const capSize = config.font?.capSizePt || config.font?.sizePt || 0;
    const marginCfg = config.positioning.horizontalMarginPt || 0;
    this.minX = Math.max(0, marginCfg || Math.ceil(capSize / 2));
    this.maxX = Math.max(this.minX + 1, this.canvasWidth - (marginCfg || Math.ceil(capSize / 2)));
    this.asciiStart = config.positioning.asciiStart;
    this.asciiEnd = config.positioning.asciiEnd;
    this.step = config.positioning.stepPt;
    this.noiseRange = config.positioning.noiseRangePt;
    this.mapCharCodeToX = new Map();
    this.precomputePositions();
  }

  precomputePositions() {
    let x = this.minX;
    let direction = 1; // 1: moving right, -1: moving left
    for (let code = this.asciiStart; code <= this.asciiEnd; code++) {
      this.mapCharCodeToX.set(code, x);
      const nextX = x + direction * this.step;
      if (nextX > this.maxX || nextX < this.minX) {
        direction *= -1;
        x = Math.max(this.minX, Math.min(this.maxX, x + direction * this.step));
      } else {
        x = nextX;
      }
    }
  }

  getXForChar(character) {
    const code = character.codePointAt(0);
    const baseX = this.mapCharCodeToX.has(code)
      ? this.mapCharCodeToX.get(code)
      : this.minX + Math.random() * (this.maxX - this.minX);
    const jitter = (Math.random() * 2 - 1) * this.noiseRange;
    let x = baseX + jitter;
    if (x < this.minX) x = this.minX;
    if (x > this.maxX) x = this.maxX;
    return x;
  }
}

