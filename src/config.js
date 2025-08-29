const config = {
  canvas: {
    width: 2480,
    height: 3508,
    backgroundColor: '#000000',
    contentColor: '#FFFFFF',
    margin: 40
  },
  font: {
    family: "Doto, 'Jersey 10', system-ui, Arial, sans-serif",
    sizePt: 80,
    capSizePt: 100,
    dropFont: 'Doto',
  },
  backgroundText: {
    font: 'Jersey 10',
    fontSizePt: 60,
    leadingPt: 48,
    columnStepPt: 72,
    startFromRight: true,
    opacity: 0.3
  },
  positioning: {
    asciiStart: 32,
    asciiEnd: 126,
    stepPt: 187,
    noiseRangePt: 5,
    stepJitterPt: 50,
    // mode: 'precomputed' uses PositionCalculator; 'stream' uses StreamPositioner
    mode: 'precomputed',
    // Keep characters away from canvas edges; if 0, modules use capSize/2
    horizontalMarginPt: 0
  },
  dropper: {
    rotationDeg: 45,
    gravityY: 0.7,
    airFriction: 0.03,
    friction: 0.2,
    density: 0.001,
    restitution: 0.2,
    // Controls how often and how many letters spawn
    // 200ms for 2 letters good for precomputed mode
    spawnIntervalMs: 200,
    spawnBatchSize: 2,
    sequential: true,
    loop: false,
    bodyScale: 0.9
  },
  crystalizer: {
    lineWeightPt: 12,
    distanceThresholdPt: 80,
    opacity: 0.6,
    // Require a body to pass half the canvas height before it can connect
    requirePassHalf: true,
    passHalfRatio: 0.5
  },
  flags: {
    enableBackground: true,
    enableDropper: true,
    enableCrystalizer: true
  }
};

export default config;


