class Game {
  constructor(
    satModel,
    screenX,
    screenY,
    scores = [],
    lives = 3,
    score = 0,
    fpsInterval = 50
  ) {
    this.allSatModels = [5, 7, 9, 11, 16];
    this.screenX = screenX;
    this.screenY = screenY;
    this.isPlaying = true;
    this.score = score;
    this.timeLimit = 150;
    this.timer = 0;
    this.lives = lives;
    this.fpsInterval = fpsInterval;
    this.scores = scores;
    this.allObstacles = {
      spaceship: {
        isGood: true,
        xStart: 0,
        xInterval: this.screenX / 4,
        y: 0.1 * this.screenY,
        height: this.screenY / 10,
        width: this.screenX / 5,
        length: 3,
        dir: 1,
      },
      car: {
        isGood: true,
        xStart: 0,
        xInterval: this.screenX / 4,
        y: 0.2 * this.screenY,
        height: this.screenY / 10,
        width: this.screenX / 10,
        length: 4,
        dir: -1,
      },
      among: {
        isGood: true,
        xStart: 0,
        xInterval: this.screenX / 4,
        y: 0.3 * this.screenY,
        height: this.screenY / 10,
        width: this.screenX / 10,
        length: 4,
        dir: 1,
      },
      stone: {
        isGood: false,
        xStart: 0,
        xInterval: this.screenX / 5,
        y: 0.5 * this.screenY,
        height: this.screenY / 10,
        width: this.screenX / 10,
        length: 3,
        dir: 1,
      },
      banana: {
        isGood: false,
        xStart: 0,
        xInterval: this.screenX / 5,
        y: 0.7 * this.screenY,
        height: this.screenY / 10,
        width: this.screenX / 10,
        length: 5,
        dir: -1,
      },
      trash: {
        isGood: false,
        xStart: 0,
        xInterval: this.screenX / 4,
        y: 0.8 * this.screenY,
        height: this.screenY / 10,
        width: this.screenX / 10,
        length: 4,
        dir: 1,
      },
    };
    this.createAllObstacles();

    this.docks = [];
    this.createArrayOfDocks(5);

    this.createSat(satModel);
  }

  createAllObstacles = () => {
    for (const key in this.allObstacles) {
      const {
        isGood,
        xStart,
        xInterval,
        y,
        height,
        width,
        length,
        dir,
      } = this.allObstacles[key];
      const arrayOfObstacles = this.createArrayOfObstacles(
        key,
        isGood,
        xStart,
        xInterval,
        y,
        height,
        width,
        length,
        dir
      );
      this.allObstacles[key]["objArray"] = arrayOfObstacles;
    }
  };

  createArrayOfObstacles = (
    name,
    isGood,
    xStart,
    xInterval,
    y,
    height,
    width,
    length,
    dir
  ) => {
    let arrOfObstacles = [];
    for (let index = 0; index < length; index++) {
      const obstacle = new Obstacle(
        name,
        isGood,
        this.screenX,
        this.screenY,
        xStart + xInterval * index,
        y,
        height,
        width,
        dir
      );
      arrOfObstacles.push(obstacle);
    }
    return arrOfObstacles;
  };

  createArrayOfDocks = (amount) => {
    for (let index = 0; index < amount; index++) {
      const dock = this.createDock(
        this.screenX / 20 + (this.screenX / 5) * index,
        this.screenY / 10,
        this.screenX / 10
      );
      this.docks.push(dock);
    }
  };

  createDock = (x, dockHeight, dockWidth) => {
    return new Dock(this.screenX, this.screenY, x, 0, dockHeight, dockWidth);
  };

  createSat = (satModel) => {
    this.player = new Ofeq(
      this.screenX,
      this.screenY,
      this.screenY / 10,
      this.screenX / 20,
      satModel
    );
  };

  subtractLife = () => {
    this.lives--;
  };

  roundFinished = (currentModel) => {
    this.score++;
    const currentModelIndex = this.allSatModels.indexOf(currentModel);
    if (currentModelIndex === this.allSatModels.length - 1) {
      this.scores.push(this.score);
      this.isPlaying = false;
      console.log("You won!!");
      return;
    }
    const nextModel = this.allSatModels[currentModelIndex + 1];
    this.timeLimit -= 30;
    this.fpsInterval -= 10;
    this.timer = 0;
    this.createSat(nextModel);
  };

  hasPlayerPassedTimeLimit = () => {
    return (this.timeLimit * 1000) / this.fpsInterval <= this.timer;
  };

  isGameOver = () => {
    if (this.lives <= 0) {
      this.isPlaying = false;
      return true;
    }
    return false;
  };

  pushNewScoreToLeaderboards = (score) => {
    this.scores.push(score);
  };

  hasPlayerLanded = () => {
    return new Promise((resolve) => {
      this.docks.forEach((dock, index) => {
        if (this.player.collision(dock) && dock.isAvailable) {
          dock.isAvailable = false;
          this.roundFinished(this.player.model);
          resolve(index);
        }
      });
    });
  };

  update = () => {
    this.player.updateSateliteObjectLocation();
    this.timer++;
    this.player.collide = false;
    this.isGameOver() && this.pushNewScoreToLeaderboards(this.score);
  };
}
