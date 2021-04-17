class Satelite extends GameObject {
  constructor(
    screenX,
    screenY,
    height,
    width,
    type,
    name,
    model,
    weight,
    revolution,
    fuel
  ) {
    super(
      screenX,
      screenY,
      height,
      width,
      (screenX - width) / 2,
      screenY - height
    );
    this.collide = false;
    this.type = type;
    this.name = name;
    this.model = model;
    this.weight = weight;
    this.revolution = revolution;
    this.fuel = fuel;
    this.eventHandler = new EventHandler();
    this.step = 80;
  }

  printData() {
    console.log(`The type of the satelite is: ${this.type} \n
                       The name of the satelite is: ${this.name} \n
                       The model of the satelite is: ${this.model} \n
                       The weight of the satelite is: ${this.weight} \n
                       The revolution of the satelite is: ${this.revolution} \n
                       The fuel of the satelite is at: ${this.fuel} \n`);
  }

  updateRevolution(revolution) {
    this.revolution = revolution;
  }

  calculateFuel(additionalCapacity) {
    this.fuel = this.weight / 2 + Math.pow(additionalCapacity, 2);
  }

  collision(obj) {
    if (
      this.y + this.height <= obj.y ||
      this.y >= obj.y + obj.height ||
      this.x + this.width <= obj.x ||
      this.x >= obj.x + obj.width
    ) {
      return false;
    }
    this.collide = true;
    return true;
  }

  updateLocationOnObstacle(dir) {
    this.x = this.x + dir;
    if (dir === 1) {
      if (this.x + this.width > this.screenX + this.width / 2) this.x = 0;
    } else {
      if (this.x - this.width < 0 - this.width / 2) this.x = this.screenX;
    }
  }

  updateSateliteObjectLocation() {
    Object.keys(this.eventHandler.eventList).forEach((key) => {
      this.eventHandler.trigger(key, this);
      this.eventHandler.off(key);
    });
  }
}
