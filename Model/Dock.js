class Dock extends GameObject {
  constructor(screenX, screenY, x, y, height, width) {
    super(screenX, screenY, height, width, x, y);
    this.isAvailable = true;
  }
}
