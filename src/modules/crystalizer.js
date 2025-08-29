export class Crystalizer {
  constructor(config) {
    this.config = config;
  }

  // Draw thick lines between same characters that are touching (via Matter pairs)
  // with a distance fallback for near-misses.
  draw(p, bodies, engine) {
    const threshold = this.config.crystalizer.distanceThresholdPt;
    const requirePassHalf = this.config.crystalizer.requirePassHalf !== false;
    const halfY = this.config.canvas.height * (this.config.crystalizer.passHalfRatio ?? 0.5);
    const lineWeight = this.config.crystalizer.lineWeightPt;

    p.push();
    p.stroke(255);
    p.strokeWeight(lineWeight);

    // Mark bodies that have passed halfway
    for (const body of bodies) {
      if (!body.plugin) body.plugin = {};
      if (!body.plugin.passedHalf && body.position.y >= halfY) {
        body.plugin.passedHalf = true;
      }
    }

    // 1) Prefer active collision pairs (stable when bodies rest)
    const pairs = engine?.pairs?.list || [];
    for (const pair of pairs) {
      if (!pair.isActive) continue;
      const a = pair.bodyA;
      const b = pair.bodyB;
      const charA = a?.plugin?.char;
      const charB = b?.plugin?.char;
      if (!charA || charA !== charB) continue;
      if (requirePassHalf && (!a.plugin?.passedHalf || !b.plugin?.passedHalf)) continue;
      p.line(a.position.x, a.position.y, b.position.x, b.position.y);
    }

    // 2) Fallback: connect nearby identical chars (center distance)
    for (let i = 0; i < bodies.length; i++) {
      const a = bodies[i];
      const charA = a.plugin?.char;
      if (!charA) continue;
      for (let j = i + 1; j < bodies.length; j++) {
        const b = bodies[j];
        const charB = b.plugin?.char;
        if (charA !== charB) continue;
        const dx = a.position.x - b.position.x;
        const dy = a.position.y - b.position.y;
        if (dx * dx + dy * dy <= threshold * threshold) {
          if (requirePassHalf && (!a.plugin?.passedHalf || !b.plugin?.passedHalf)) continue;
          p.line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
      }
    }

    p.pop();
  }
}

