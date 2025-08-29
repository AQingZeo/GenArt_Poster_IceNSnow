const { Engine, World, Bodies, Runner } = (typeof Matter !== 'undefined' ? Matter : window.Matter);

export class CharDropper {
  constructor(p, config, positionCalculator) {
    this.p = p;
    this.config = config;
    this.positionCalculator = positionCalculator;
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

  addCharacter(ch) {
    const x = this.positionCalculator.getXForChar(ch);
    const y = -50;
    const size = this.config.font.sizePt;
    const angle = ((Math.random() * 2 - 1) * this.config.dropper.rotationDeg * Math.PI) / 180;
    const body = Bodies.rectangle(x, y, size, size, {
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
    p.textFont('Doto');
    p.textSize(this.config.font.sizePt);
    p.textAlign(p.CENTER, p.CENTER);
    for (const body of this.bodies) {
      const ch = body.plugin?.char ?? '?';
      p.push();
      p.translate(body.position.x, body.position.y);
      p.rotate(body.angle);
      p.text(ch, 0, 0);
      p.pop();
    }
    p.pop();
  }
}

