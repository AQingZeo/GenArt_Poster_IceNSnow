const { Engine, World, Bodies, Runner } = (typeof Matter !== 'undefined' ? Matter : window.Matter);

export class CharDropper {
  constructor(p, config, positionProvider) {
    this.p = p;
    this.config = config;
    this.positionProvider = positionProvider;
    this.engine = Engine.create();
    this.engine.world.gravity.y = config.dropper.gravityY;
    this.runner = Runner.create();
    this.bodies = [];

    // Floor
    const floor = Bodies.rectangle(
      config.canvas.width / 2,
      config.canvas.height + 20,
      config.canvas.width,
      40,
      { isStatic: true }
    );
    // Vertical side walls to keep bodies within canvas
    const wallThickness = 40;
    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      config.canvas.height / 2,
      wallThickness,
      config.canvas.height + 200,
      { isStatic: true }
    );
    const rightWall = Bodies.rectangle(
      config.canvas.width + wallThickness / 2,
      config.canvas.height / 2,
      wallThickness,
      config.canvas.height + 200,
      { isStatic: true }
    );
    World.add(this.engine.world, [floor, leftWall, rightWall]);

    Runner.run(this.runner, this.engine);
  }

  isUppercaseLetter(ch) {
    return typeof ch === 'string' && ch.length > 0 && /[A-Z]/.test(ch[0]);
  }

  addCharacter(ch) {
    let x;
    let angle;
    if (typeof this.positionProvider.getNext === 'function') {
      const next = this.positionProvider.getNext(ch);
      x = next?.x ?? 0;
      angle = next?.angle;
    } else {
      x = this.positionProvider.getXForChar(ch);
    }
    const y = -50;
    const baseSize = this.config.font.sizePt;
    const capSize = this.config.font.capSizePt || baseSize;
    const size = this.isUppercaseLetter(ch) ? capSize : baseSize;
    const scale = this.config.dropper.bodyScale || 1.0;
    if (typeof angle !== 'number') {
      angle = ((Math.random() * 2 - 1) * this.config.dropper.rotationDeg * Math.PI) / 180;
    }
    const body = Bodies.rectangle(x, y, size * scale, size * scale, {
      frictionAir: this.config.dropper.airFriction,
      friction: this.config.dropper.friction,
      density: this.config.dropper.density,
      restitution: this.config.dropper.restitution,
      angle
    });
    body.plugin = { char: ch };
    this.bodies.push(body);
    World.add(this.engine.world, body);
  }

  draw(p) {
    p.push();
    p.fill(255);
    p.noStroke();
    const famRaw = this.config.font?.dropFont || 'Doto';
    const family = String(famRaw).split(',')[0].replace(/["']/g, '').trim();
    p.textFont(family);
    p.textAlign(p.CENTER, p.CENTER);
    for (const body of this.bodies) {
      const ch = body.plugin?.char ?? '?';
      const baseSize = this.config.font.sizePt;
      const capSize = this.config.font.capSizePt || baseSize;
      const size = this.isUppercaseLetter(ch) ? capSize : baseSize;
      p.textSize(size);
      p.push();
      p.translate(body.position.x, body.position.y);
      p.rotate(body.angle);
      p.text(ch, 0, 0);
      p.pop();
    }
    p.pop();
  }
}

