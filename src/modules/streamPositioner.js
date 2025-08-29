export class StreamPositioner {
  constructor(config) {
    this.canvasWidth = config.canvas.width;
    const capSize = config.font?.capSizePt || config.font?.sizePt || 0;
    const marginCfg = config.positioning.horizontalMarginPt || 0;
    this.minX = Math.max(0, marginCfg || Math.ceil(capSize / 2));
    this.maxX = Math.max(this.minX + 1, this.canvasWidth - (marginCfg || Math.ceil(capSize / 2)));
    this.step = config.positioning.stepPt;
    this.stepJitter = Math.max(0, config.positioning.stepJitterPt ?? 0);
    this.noiseRange = config.positioning.noiseRangePt;
    this.maxRotationDeg = config.dropper.rotationDeg;
    this.x = 0;
    this.direction = 1; // 1: right, -1: left
  }

  // Returns next position (and optional angle) for incoming character
  // Purely random x within canvas, with small jitter and random angle
  getNext(/* ch */) {
    const baseX = this.minX + Math.random() * (this.maxX - this.minX);
    const jitter = (Math.random() * 2 - 1) * this.noiseRange;
    let x = baseX + jitter;
    if (x < this.minX) x = this.minX;
    if (x > this.maxX) x = this.maxX;

    // Provide a rotation angle (radians) within configured range
    const angle = ((Math.random() * 2 - 1) * this.maxRotationDeg * Math.PI) / 180;

    return { x, angle };
  }
}


