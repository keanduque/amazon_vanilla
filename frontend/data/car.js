class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carObj) {
    this.#brand = carObj.brand;
    this.#model = carObj.model;
  }
  displayInfo() {
    if (this.acceleration) {
      return `${this.#brand}-${this.#model}, Speed: ${this.speed} km/h`;
    }
    return `${this.#brand}-${this.#model}, Speed: ${
      this.speed
    } km/h, Trunk is ${
      this.isTrunkOpen ? `open, Please close!` : `currently closed`
    }`;
  }
  go() {
    if (this.speed >= 200) {
      return;
    }
    if (this.isTrunkOpen) {
      console.log(
        `go() Trunk is open : ${this.#brand}-${
          this.#model
        }, Please close before you go!`
      );
      return;
    }
    return (this.speed += 5);
  }
  break() {
    if (this.speed <= 0) {
      return;
    }
    return (this.speed -= 5);
  }
  openTrunk() {
    if (this.acceleration) {
      console.log(
        `openTrunk() no trunk to open : ${this.#brand}-${this.#model}`
      );
      return;
    }

    if (this.speed > 0) {
      console.log(
        `please stop the car before open the trunk : ${this.#brand}-${
          this.#model
        }`
      );
    } else {
      this.isTrunkOpen = true;
      console.log(`openTrunk() Trunk was open : ${this.#brand}-${this.#model}`);
    }
  }
  closeTrunk() {
    if (this.acceleration) {
      console.log(
        `closeTrunk() no trunk to close : ${this.#brand}-${this.#model}`
      );
      return;
    }
    console.log(`closeTrunk() closed trunk : ${this.#brand}-${this.#model}`);
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carObj) {
    super(carObj);
    this.acceleration = carObj.acceleration;
  }
  go() {
    if (this.speed >= 300) {
      console.log(`max speed ${this.speed} reached!`);
      return;
    }
    return (this.speed += this.acceleration);
  }
}

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
});
console.log(car1.displayInfo());
car1.openTrunk();
car1.go();
car1.go();
console.log(car1.displayInfo());
car1.closeTrunk();
car1.go();
car1.go();
car1.go();
car1.break();
car1.go();
console.log(car1.displayInfo());
car1.go();
console.log(car1.displayInfo());

console.log(`--------------------------------------------------`);
const car2 = new Car({ brand: "Tesla", model: "Model 3" });
console.log(car2.displayInfo());
car2.go();
car2.go();
car2.go();
car2.break();
car2.break();
car2.go();
car2.go();
console.log(car2.displayInfo());
car2.openTrunk();
car2.break();
console.log(car2.displayInfo());
car2.openTrunk();
car2.break();
console.log(car2.displayInfo());
car2.openTrunk();
car2.break();
console.log(car2.displayInfo());
car2.openTrunk();
console.log(car2.displayInfo());

console.log(`--------------------------------------------------`);
const racecar = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});
console.log(racecar.displayInfo());
racecar.go();
racecar.openTrunk();
console.log(racecar.displayInfo());
racecar.openTrunk();
console.log(racecar.displayInfo());
racecar.closeTrunk();
racecar.go();
console.log(racecar.displayInfo());
racecar.go();
racecar.go();
racecar.break();
console.log(racecar.displayInfo());
