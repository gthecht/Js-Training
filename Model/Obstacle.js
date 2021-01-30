class Obstacle {
  constructor(name, isGood, screenX, screenY, x, y, height, width, dir = 1) {
    this.name = name;
    this.isGood = isGood;
    this.screenX = screenX;
    this.screenY = screenY;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
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
