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
    weight: 600,
    sizePt: 72,
    capSizePt: 120,
  },
  backgroundText: {
    fontSizePt: 60,
    leadingPt: 48,
    columnStepPt: 72,
    startFromRight: true,
    opacity: 0.3
  },
  positioning: {
    asciiStart: 32,
    asciiEnd: 126,
    stepPt: 100,
    noiseRangePt: 20
  },
  dropper: {
    rotationDeg: 60,
    gravityY: 0.7,
    airFriction: 0.03,
    friction: 0.2,
    density: 0.001,
    restitution: 0.2,
    // Controls how often and how many letters spawn
    spawnIntervalMs: 100,
    spawnBatchSize: 3
  },
  crystalizer: {
    lineWeightPt: 8,
    distanceThresholdPt: 80,
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


