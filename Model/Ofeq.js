import Satelite from "./Satelite";

class Ofeq extends Satelite {
  constructor(model, revolution, fuel, generation, favStar, wings) {
    super("EO", "Ofeq", model, 350, revolution, fuel);
    this.generation = generation;
    this.favStar = favStar;
    this.wings = wings; // Value represents if wings are open or closed == default
  }

  takeSelfie() {
    console.log(`${this.name} Say Cheese!`);
  }

  openWings() {
    this.wings = !this.wings;
  }

  testTheStars(favStar) {
    this.favStar = favStar;
  }
}
