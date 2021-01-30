class Satelite {
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
    this.collide = false;
    this.height = height;
    this.width = width;
    this.screenX = screenX;
    this.screenY = screenY;
    this.x = (screenX - width) / 2;
    this.y = screenY - height;
    this.type = type;
    this.name = name;
    this.model = model;
    this.weight = weight;
    this.revolution = revolution;
    this.fuel = fuel;
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
    let x1 = this.x;
    let y1 = this.y;
    let h1 = this.height;
    let w1 = this.width;
    let b1 = y1 + h1;
    let r1 = x1 + w1;
    let x2 = obj.x;
    let y2 = obj.y;
    let h2 = obj.height;
    let w2 = obj.width;
    let b2 = y2 + h2;
    let r2 = x2 + w2;

    if (b1 <= y2 || y1 >= b2 || r1 <= x2 || x1 >= r2) {
      return false;
    }
    console.log("collision between " + obj.name);
    this.collide = true;
    return true;
  }

  update(dir) {
    console.log(dir);
    this.x = this.x + dir;
    if (dir === 1) {
      if (this.x + this.width > this.screenX + this.width / 2) this.x = 0;
    } else {
      if (this.x - this.width < 0 - this.width / 2) this.x = this.screenX;
    }
  }
}
