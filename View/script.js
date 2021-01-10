const gameDiv = document.getElementById("game");
const stoneDivs = document.getElementsByClassName("stone");
const trashDivs = document.getElementsByClassName("trash");
const bananaDivs = document.getElementsByClassName("banana");
const carDivs = document.getElementsByClassName("car");
const spaceshipDivs = document.getElementsByClassName("spaceship");
const amongDivs = document.getElementsByClassName("among");
const playerDiv = document.getElementById("player");
const game = new Game(
  gameDiv.clientWidth,
  gameDiv.clientHeight,
  playerDiv.clientHeight,
  playerDiv.clientWidth,
  bananaDivs[0].clientHeight,
  bananaDivs[0].clientWidth,
  trashDivs[0].clientHeight,
  trashDivs[0].clientWidth,
  carDivs[0].clientHeight,
  carDivs[0].clientWidth,
  spaceshipDivs[0].clientHeight,
  spaceshipDivs[0].clientWidth,
  stoneDivs[0].clientHeight,
  stoneDivs[0].clientWidth,
  amongDivs[0].clientHeight,
  amongDivs[0].clientWidth
);

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      game.eventHandler.on("moveLeft", (player) => {
        player.x -= player.step / 4;
      });
      break;
    case 38:
      game.eventHandler.on("moveUp", (player) => {
        player.y -= player.step;
      });
      break;
    case 39:
      game.eventHandler.on("moveRight", (player) => {
        player.x += player.step / 4;
      });
      break;
    case 40:
      game.eventHandler.on("moveDown", (player) => {
        player.y += player.step;
      });
      break;
  }
});

/**
 * Init's divs position and characteristics according to their corresponding game object
 * @param {Array} gameObjArr Array of game objects
 * @param {Array} divs       Array of divs that present the game object in the dom
 */
const initDivs = (gameObjArr, divs) => {
  gameObjArr.forEach((gameObj, i) => {
    divs[i].style.left = `${gameObj.x}px`;
    divs[i].style.top = `${gameObj.y}px`;
  });
};

const init = () => {
  let gameObjsAndDivs = [
    { obj: game.cars, div: carDivs },
    { obj: game.spaceships, div: spaceshipDivs },
    { obj: game.amongs, div: amongDivs },
    { obj: game.stones, div: stoneDivs },
    { obj: game.bananas, div: bananaDivs },
    { obj: game.trashs, div: trashDivs },
  ];

  playerDiv.style.left = `${game.player.x}px`;
  playerDiv.style.top = `${game.player.y}px`;

  gameObjsAndDivs.forEach((pair) => {
    initDivs(pair.obj, pair.div);
  });
};

/**
 * Updates game objects and divs position with their corresponding game object
 * @param {Array} gameObjArr Array of game objects
 * @param {Array} divs       Array of divs that present the game object in the dom
 */
const updateDivs = (gameObjArr, divs) => {
  gameObjArr.forEach((gameObj, i) => {
    gameObj.update();
    divs[i].style.left = `${gameObj.x}px`;
    divs[i].style.top = `${gameObj.y}px`;
  });
};

const update = () => {
  let gameObjsAndDivs = [
    { obj: game.cars, div: carDivs },
    { obj: game.spaceships, div: spaceshipDivs },
    { obj: game.amongs, div: amongDivs },
    { obj: game.stones, div: stoneDivs },
    { obj: game.bananas, div: bananaDivs },
    { obj: game.trashs, div: trashDivs },
  ];

  // Updating obstacles div's position
  gameObjsAndDivs.forEach((pair) => {
    updateDivs(pair.obj, pair.div);
  });

  Object.keys(game.eventHandler.eventList).forEach((key) => {
    game.eventHandler.trigger(key, game.player);
    game.eventHandler.off(key);
  });

  playerDiv.style.left = `${game.player.x}px`;
  playerDiv.style.top = `${game.player.y}px`;

  allObjs.forEach((list) => {
    list.forEach((obj, index) => {
      if (game.player.collision(obj)) {
        if (obj.isGood) {
          game.player.update();
        } else {
          console.log(index + "index");
          console.log(game);
          game.isPlaying = false;
        }
      }
    });
  });

  if (
    game.screenY * 0.1 <= game.player.y <= game.screenY * 0.3 &&
    game.player.collide
  )
    game.isPlaying = false;

  // if (isGameOver()) {
  //   const game = new Game(
  //     gameDiv.clientWidth,
  //     gameDiv.clientHeight,
  //     playerDiv.clientHeight,
  //     playerDiv.clientWidth,
  //     bananaDivs[0].clientHeight,
  //     bananaDivs[0].clientWidth,
  //     trashDivs[0].clientHeight,
  //     trashDivs[0].clientWidth,
  //     carDivs[0].clientHeight,
  //     carDivs[0].clientWidth,
  //     spaceshipDivs[0].clientHeight,
  //     spaceshipDivs[0].clientWidth,
  //     stoneDivs[0].clientHeight,
  //     stoneDivs[0].clientWidth,
  //     amongDivs[0].clientHeight,
  //     amongDivs[0].clientWidth
  //   );
  //   init();
  // }
};

const isGameOver = () => {
  // console.log(game.isPlaying);
  return !game.isPlaying;
};

console.log(game);
init();
setInterval(update, game.fpsInterval);
