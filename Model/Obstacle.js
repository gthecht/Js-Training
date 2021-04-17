class Obstacle extends GameObject {
  constructor(name, isGood, screenX, screenY, x, y, height, width, dir = 1) {
    super(screenX, screenY, height, width, x, y);
    this.name = name;
    this.isGood = isGood;
    this.dir = dir;
  }

  update() {
    this.x = this.x + this.dir;
    if (this.dir === 1) {
      if (this.x + this.width > this.screenX + this.width / 2) this.x = 0;
    } else {
      if (this.x - this.width < 0 - this.width / 2) this.x = this.screenX;
    }
  }
}
