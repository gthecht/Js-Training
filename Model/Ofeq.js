class Ofeq extends Satelite {
  constructor(
    screenX,
    screenY,
    height,
    width,
    model,
    revolution = 99999,
    fuel = 300,
    favStar = "Pluto",
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
    this.generation = this.generateGenerationAccordingToModel();
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
    super.update(dir);
  }

  generateGenerationAccordingToModel = () => {
    const generationB = [5, 7, 9];
    if (generationB.indexOf(this.model) >= 0) return "B";
    return "C";
  };

  isInSpace = () => {
    if (this.y <= 0.3 * this.screenY) {
      this.wings = "Opened";
      return true;
    }
    this.wings = "Closed";
    return false;
  };
}
