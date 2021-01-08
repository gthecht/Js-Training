export default class Satelite {
  constructor(type, name, model, weight, revolution, fuel) {
    this.type = type;
    this.name = name;
    this.model = model;
    this.weight = weight;
    this.revolution = revolution;
    this.fuel = fuel;
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
}
