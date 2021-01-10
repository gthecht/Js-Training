class Obstacle {
  constructor(name, isGood, screenX, screenY, x, y, height, width) {
    this.name = name;
    this.isGood = isGood;
    this.screenX = screenX;
    this.screenY = screenY;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  update() {
    this.x++;
    if (this.x + this.width > this.screenX + this.width / 2) this.x = 0;
  }
}
