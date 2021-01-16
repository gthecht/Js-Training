const gameDiv = document.getElementById("game");
const stoneDivs = document.getElementsByClassName("stone");
const trashDivs = document.getElementsByClassName("trash");
const bananaDivs = document.getElementsByClassName("banana");
const carDivs = document.getElementsByClassName("car");
const spaceshipDivs = document.getElementsByClassName("spaceship");
const amongDivs = document.getElementsByClassName("among");
const playerDiv = document.getElementById("player");
const dockDivs = document.getElementsByClassName("landing");
const rocketDivs = document.getElementsByClassName("rocket");
const scoreDiv = document.getElementById("ingame_score");
const satDiv = document.getElementsByClassName("sat")[0];
const timeDiv = document.getElementsByClassName("time")[0];
const heartDivs = document.getElementsByClassName("heart");
const startBtn = document.getElementById("start_btn");
const rstBtn = document.getElementById("restart_btn");
const backBtn = document.getElementById("back_btn");
const scoreboardBtn = document.getElementById("scoreboard_btn");
const menuDiv = document.getElementById("menu");
const finishDiv = document.getElementById("finish");
const finishScore = document.getElementById("finish_score");
const scoreboardDiv = document.getElementById("scoreboard");
const scoreDivs = document.getElementsByClassName("m-auto-0");

/**
 * Recreates game with array of scores
 * @param {Array} scores   Array of scores to present in scoreboard
 */
const initGame = (scores) => {
  return new Game(
    scores,
    5,
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
    amongDivs[0].clientWidth,
    dockDivs[0].clientHeight,
    dockDivs[0].clientWidth
  );
};

let game = initGame([]);

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      game.eventHandler.on("moveLeft", (player) => {
        if (player.x >= player.step / 4) player.x -= player.step / 4;
      });
      break;
    case 38:
      game.eventHandler.on("moveUp", (player) => {
        if (player.y >= player.height) player.y -= player.step;
      });
      break;
    case 39:
      game.eventHandler.on("moveRight", (player) => {
        if (player.x < player.screenX - player.width)
          player.x += player.step / 4;
      });
      break;
    case 40:
      game.eventHandler.on("moveDown", (player) => {
        if (player.y < player.screenY - player.height) player.y += player.step;
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
    if (divs[i].className === "rocket") divs[i].style.visibility = "hidden";
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
    { obj: game.docks, div: dockDivs },
    { obj: game.docks, div: rocketDivs },
  ];

  playerDiv.style.left = `${game.player.x}px`;
  playerDiv.style.top = `${game.player.y}px`;

  gameObjsAndDivs.forEach((pair) => {
    initDivs(pair.obj, pair.div);
  });

  for (let i = 0; i < game.lives; i++) {
    heartDivs[i].style.visibility = "visible";
  }
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
  // Checking if player has passed the time limit
  if ((game.timeLimit * 1000) / game.fpsInterval > game.timer) {
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

    // Updating the position of my satelite according to events performed
    Object.keys(game.eventHandler.eventList).forEach((key) => {
      game.eventHandler.trigger(key, game.player);
      game.eventHandler.off(key);
    });

    playerDiv.style.left = `${game.player.x}px`;
    playerDiv.style.top = `${game.player.y}px`;

    // Checking if one of the obstacles has collisoned into our player
    gameObjsAndDivs.forEach((pair) => {
      pair.obj.forEach((obj) => {
        if (game.player.collision(obj)) {
          if (obj.isGood) {
            game.player.update(obj.dir);
          } else {
            game.lives--;
            zeroGame();
          }
        }
      });
    });

    /*
      Checking if our player has landed on one of the docks and if he did
      changing the state of the game according to the current state
    */

    game.docks.forEach((dock, index) => {
      if (game.player.collision(dock) && dock.isAvailable) {
        dock.isAvailable = false;
        rocketDivs[index].style.visibility = "visible";
        switch (`${game.player.name}-${game.player.model}`) {
          case "Ofeq-5":
            game.score++;
            game.timeLimit = 150;
            game.player = new Ofeq(
              game.screenX,
              game.screenY,
              playerDiv.clientHeight,
              playerDiv.clientWidth,
              7,
              99999,
              300,
              "B",
              "Pluto"
            );
            game.fpsInterval -= 10;
            break;
          case "Ofeq-7":
            game.score++;
            game.timeLimit = 120;
            game.player = new Ofeq(
              game.screenX,
              game.screenY,
              playerDiv.clientHeight,
              playerDiv.clientWidth,
              9,
              99999,
              300,
              "B",
              "Pluto"
            );
            game.fpsInterval -= 10;
            break;
          case "Ofeq-9":
            game.score++;
            game.timeLimit = 90;
            game.player = new Ofeq(
              game.screenX,
              game.screenY,
              playerDiv.clientHeight,
              playerDiv.clientWidth,
              11,
              99999,
              300,
              "C",
              "Pluto"
            );
            game.fpsInterval -= 10;
            break;
          case "Ofeq-11":
            game.score++;
            game.timeLimit = 60;
            game.player = new Ofeq(
              game.screenX,
              game.screenY,
              playerDiv.clientHeight,
              playerDiv.clientWidth,
              16,
              99999,
              300,
              "C",
              "Pluto"
            );
            game.fpsInterval -= 10;
            break;
          case "Ofeq-16":
            game.score++;
            game.timeLimit = 40;
            game.isPlaying = false;
            console.log("You won");
            break;
        }
      }
    });

    for (let i = 0; i < 3 - game.lives; i++) {
      heartDivs[i].style.visibility = "hidden";
    }

    // Checking that our player is floating on one of the objects in space
    if (game.player.y <= 0.3 * game.screenY) {
      game.player.wings = "Opened";
      if (!game.player.collide) {
        console.log("entered");
        game.lives--;
        zeroGame();
        game.timer = 0;
      }
    } else game.player.wings = "Closed";

    game.timer++;
    game.player.collide = false;
  } else {
    game.lives--;
    zeroGame();
    game.timer = 0;
  }

  // Updating time, sat, score div's text, according to the current state of the game
  timeDiv.innerHTML = `${((game.timer * game.fpsInterval) / 1000).toFixed(1)}/${
    game.timeLimit
  }s`;
  satDiv.innerHTML = `${game.player.name}-${game.player.model}`;
  scoreDiv.innerHTML = `Score: ${game.score}`;

  // Checking if player has died 3 times
  if (game.lives <= 0) game.isPlaying = false;

  if (!game.isPlaying) {
    finishDiv.style.visibility = "visible";
    finishScore.innerHTML = `Score: ${game.score}`;
    game.scores.push(game.score);
  } else window.setTimeout(update, game.fpsInterval);
};

const isGameOver = () => {
  return !game.isPlaying;
};

/**
 * Resets game upon failure
 */
const zeroGame = () => {
  game = new Game(
    game.scores,
    game.player.model,
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
    amongDivs[0].clientWidth,
    dockDivs[0].clientHeight,
    dockDivs[0].clientWidth,
    game.lives,
    game.score,
    game.fpsInterval
  );
};

startBtn.onclick = () => {
  menu.style.visibility = "hidden";
  init();
  update();
};

rstBtn.onclick = () => {
  finishDiv.style.visibility = "hidden";
  game = initGame(game.scores);
  init();
  update();
};

backBtn.onclick = () => {
  scoreboardDiv.style.visibility = "hidden";
  finishDiv.style.visibility = "visible";
};

scoreboardBtn.onclick = () => {
  finishDiv.style.visibility = "hidden";
  scoreboardDiv.style.visibility = "visible";
  game.scores.sort().reverse();
  for (let i = 0; i < game.scores.length; i++)
    if (i < 3) scoreDivs[i].innerHTML = `Score: ${game.scores[i]}`;
    else break;
};
