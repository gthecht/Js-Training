class Game {
  constructor(
    satModel,
    screenX,
    screenY,
    playerHeight,
    playerWidth,
    bananaHeight,
    bananaWidth,
    trashHeight,
    trashWidth,
    carHeight,
    carWidth,
    spaceshipHeight,
    spaceshipWidth,
    stoneHeight,
    stoneWidth,
    amongHeight,
    amongWidth,
    dockHeight,
    dockWidth
  ) {
    this.screenX = screenX;
    this.screenY = screenY;
    this.isPlaying = true;
    this.score = 0;
    this.timeLimit = 150;
    this.timer = 0;
    this.lives = 3;
    this.eventHandler = new EventHandler();
    this.fpsInterval = 50;
    this.spaceships = [
      new Obstacle(
        "spaceship",
        true,
        screenX,
        screenY,
        0,
        0.1 * screenY,
        spaceshipHeight,
        spaceshipWidth
      ),
      new Obstacle(
        "spaceship",
        true,
        screenX,
        screenY,
        screenX / 4,
        0.1 * screenY,
        spaceshipHeight,
        spaceshipWidth
      ),
      new Obstacle(
        "spaceship",
        true,
        screenX,
        screenY,
        (2 * screenX) / 4,
        0.1 * screenY,
        spaceshipHeight,
        spaceshipWidth
      ),
    ];
    this.cars = [
      new Obstacle(
        "car",
        true,
        screenX,
        screenY,
        0,
        0.2 * screenY,
        carHeight,
        carWidth
      ),
      new Obstacle(
        "car",
        true,
        screenX,
        screenY,
        screenX / 4,
        0.2 * screenY,
        carHeight,
        carWidth
      ),
      new Obstacle(
        "car",
        true,
        screenX,
        screenY,
        (2 * screenX) / 4,
        0.2 * screenY,
        carHeight,
        carWidth
      ),
      new Obstacle(
        "car",
        true,
        screenX,
        screenY,
        (3 * screenX) / 4,
        0.2 * screenY,
        carHeight,
        carWidth
      ),
    ];
    this.amongs = [
      new Obstacle(
        "among",
        true,
        screenX,
        screenY,
        0,
        0.3 * screenY,
        amongHeight,
        amongWidth
      ),
      new Obstacle(
        "among",
        true,
        screenX,
        screenY,
        screenX / 4,
        0.3 * screenY,
        amongHeight,
        amongWidth
      ),
      new Obstacle(
        "among",
        true,
        screenX,
        screenY,
        (2 * screenX) / 4,
        0.3 * screenY,
        amongHeight,
        amongWidth
      ),
      new Obstacle(
        "among",
        true,
        screenX,
        screenY,
        (3 * screenX) / 4,
        0.3 * screenY,
        amongHeight,
        amongWidth
      ),
    ];
    this.stones = [
      new Obstacle(
        "stone",
        false,
        screenX,
        screenY,
        0,
        screenY - 0.5 * screenY,
        stoneHeight,
        stoneWidth
      ),
      new Obstacle(
        "stone",
        false,
        screenX,
        screenY,
        screenX / 5,
        screenY - 0.5 * screenY,
        stoneHeight,
        stoneWidth
      ),
      new Obstacle(
        "stone",
        false,
        screenX,
        screenY,
        (2 * screenX) / 5,
        screenY - 0.5 * screenY,
        stoneHeight,
        stoneWidth
      ),
    ];
    this.bananas = [
      new Obstacle(
        "banana",
        false,
        screenX,
        screenY,
        0,
        screenY - 0.3 * screenY,
        bananaHeight,
        bananaWidth
      ),
      new Obstacle(
        "banana",
        false,
        screenX,
        screenY,
        screenX / 5,
        screenY - 0.3 * screenY,
        bananaHeight,
        bananaWidth
      ),
      new Obstacle(
        "banana",
        false,
        screenX,
        screenY,
        (2 * screenX) / 5,
        screenY - 0.3 * screenY,
        bananaHeight,
        bananaWidth
      ),
      new Obstacle(
        "banana",
        false,
        screenX,
        screenY,
        (3 * screenX) / 5,
        screenY - 0.3 * screenY,
        bananaHeight,
        bananaWidth
      ),
      new Obstacle(
        "banana",
        false,
        screenX,
        screenY,
        (4 * screenX) / 5,
        screenY - 0.3 * screenY,
        bananaHeight,
        bananaWidth
      ),
    ];
    this.trashs = [
      new Obstacle(
        "trash",
        false,
        screenX,
        screenY,
        0,
        screenY - 0.2 * screenY,
        trashHeight,
        trashWidth
      ),
      new Obstacle(
        "trash",
        false,
        screenX,
        screenY,
        screenX / 4,
        screenY - 0.2 * screenY,
        trashHeight,
        trashWidth
      ),
      new Obstacle(
        "trash",
        false,
        screenX,
        screenY,
        (2 * screenX) / 4,
        screenY - 0.2 * screenY,
        trashHeight,
        trashWidth
      ),
      new Obstacle(
        "trash",
        false,
        screenX,
        screenY,
        (3 * screenX) / 4,
        screenY - 0.2 * screenY,
        trashHeight,
        trashWidth
      ),
    ];

    this.docks = [
      new Dock(screenX, screenY, screenX / 20, 0, dockHeight, dockWidth),
      new Dock(
        screenX,
        screenY,
        screenX / 20 + screenX / 5,
        0,
        dockHeight,
        dockWidth
      ),
      new Dock(
        screenX,
        screenY,
        screenX / 20 + (2 * screenX) / 5,
        0,
        dockHeight,
        dockWidth
      ),
      new Dock(
        screenX,
        screenY,
        screenX / 20 + (3 * screenX) / 5,
        0,
        dockHeight,
        dockWidth
      ),
      new Dock(
        screenX,
        screenY,
        screenX / 20 + (4 * screenX) / 5,
        0,
        dockHeight,
        dockWidth
      ),
    ];
    switch (satModel) {
      case 5:
        this.player = new Ofeq(
          screenX,
          screenY,
          playerHeight,
          playerWidth,
          satModel,
          99999,
          300,
          "B",
          "Pluto"
        );
        break;
      case 7:
        this.player = new Ofeq(
          game.screenX,
          game.screenY,
          playerDiv.clientHeight,
          playerDiv.clientWidth,
          satModel,
          99999,
          300,
          "B",
          "Pluto"
        );
        break;
      case 9:
        this.player = new Ofeq(
          game.screenX,
          game.screenY,
          playerDiv.clientHeight,
          playerDiv.clientWidth,
          satModel,
          99999,
          300,
          "B",
          "Pluto"
        );
        break;
      case 11:
        this.player = new Ofeq(
          game.screenX,
          game.screenY,
          playerDiv.clientHeight,
          playerDiv.clientWidth,
          satModel,
          99999,
          300,
          "C",
          "Pluto"
        );
        break;
      case 16:
        this.player = new Ofeq(
          game.screenX,
          game.screenY,
          playerDiv.clientHeight,
          playerDiv.clientWidth,
          satModel,
          99999,
          300,
          "C",
          "Pluto"
        );
        break;
    }
  }
}
