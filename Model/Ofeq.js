class Ofeq extends Satelite {
  constructor(
    screenX,
    screenY,
    height,
    width,
    model,
    revolution,
    fuel,
    generation,
    favStar,
    wings = "Closed"
  ) {
    super(
      screenX,
      screenY,
      height,
      width,
      "EO",
      "Ofeq",
      model,
      350,
      revolution,
      fuel
    );
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

  collision(obj) {
    return super.collision(obj);
  }

  update(dir) {
    console.log(dir);
    super.update(dir);
  }
}
