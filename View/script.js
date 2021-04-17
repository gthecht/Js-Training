const gameDiv = document.getElementById("game");
const playerDiv = document.getElementById("player");
const scoreDiv = document.getElementById("ingame_score");
const satDiv = document.getElementsByClassName("sat")[0];
const timeDiv = document.getElementsByClassName("time")[0];
const heartDivsContainer = document.getElementById("hearts");
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
let divsDictionary = {};

const initGame = () => {
  return new Game(
    game.player.model,
    gameDiv.clientWidth,
    gameDiv.clientHeight,
    game.scores,
    game.lives,
    game.score,
    game.fpsInterval
  );
};

let game = new Game(5, gameDiv.clientWidth, gameDiv.clientHeight);
const divClassNameAndImageSrcDictionary = [
  {
    name: "dock",
    divClassName: "landing",
    imgSrc: "../assets/landing.png",
    length: game.docks.length,
    parentDiv: gameDiv,
  },
  {
    name: "rocket",
    divClassName: "rocket",
    imgSrc: "../assets/rocket.png",
    length: game.docks.length,
    parentDiv: gameDiv,
  },
  {
    name: "spaceship",
    divClassName: "obstacle",
    imgSrc: "../assets/spaceship.png",
    length: game.allObstacles["spaceship"].length,
    parentDiv: gameDiv,
  },
  {
    name: "car",
    divClassName: "obstacle",
    imgSrc: "../assets/tesla.png",
    length: game.allObstacles["car"].length,
    parentDiv: gameDiv,
  },
  {
    name: "among",
    divClassName: "among",
    imgSrc: "../assets/among.png",
    length: game.allObstacles["among"].length,
    parentDiv: gameDiv,
  },
  {
    name: "stone",
    divClassName: "obstacle",
    imgSrc: "../assets/stone.png",
    length: game.allObstacles["stone"].length,
    parentDiv: gameDiv,
  },
  {
    name: "banana",
    divClassName: "obstacle",
    imgSrc: "../assets/banana.png",
    length: game.allObstacles["banana"].length,
    parentDiv: gameDiv,
  },
  {
    name: "trash",
    divClassName: "obstacle",
    imgSrc: "../assets/trash.png",
    length: game.allObstacles["trash"].length,
    parentDiv: gameDiv,
  },
  {
    name: "life",
    divClassName: "heart",
    imgSrc: "../assets/heart.png",
    length: game.lives,
    parentDiv: heartDivsContainer,
  },
];

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      game.player.eventHandler.on("moveLeft", (player) => {
        if (player.x >= player.step / 4) player.x -= player.step / 4;
      });
      break;
    case 38:
      game.player.eventHandler.on("moveUp", (player) => {
        if (player.y >= player.height) player.y -= player.step;
      });
      break;
    case 39:
      game.player.eventHandler.on("moveRight", (player) => {
        if (player.x < player.screenX - player.width)
          player.x += player.step / 4;
      });
      break;
    case 40:
      game.player.eventHandler.on("moveDown", (player) => {
        if (player.y < player.screenY - player.height) player.y += player.step;
      });
      break;
  }
});

const initDivs = (gameObjArr, divs) => {
  gameObjArr.forEach((gameObj, i) => {
    divs[i].style.left = `${gameObj.x}px`;
    divs[i].style.top = `${gameObj.y}px`;
    divs[i].style.width = `${gameObj.width}px`;
    divs[i].style.height = `${gameObj.height}px`;
    if (divs[i].className === "rocket")
      changeDivsVisibilityProp(divs[i], "hidden");
  });
};

const init = () => {
  let gameObjsAndDivs = [
    {
      obj: game.allObstacles["car"]["objArray"],
      div: divsDictionary["car"],
    },
    {
      obj: game.allObstacles["spaceship"]["objArray"],
      div: divsDictionary["spaceship"],
    },
    {
      obj: game.allObstacles["among"]["objArray"],
      div: divsDictionary["among"],
    },
    {
      obj: game.allObstacles["stone"]["objArray"],
      div: divsDictionary["stone"],
    },
    {
      obj: game.allObstacles["banana"]["objArray"],
      div: divsDictionary["banana"],
    },
    {
      obj: game.allObstacles["trash"]["objArray"],
      div: divsDictionary["trash"],
    },
    { obj: game.docks, div: divsDictionary["dock"] },
    { obj: game.docks, div: divsDictionary["rocket"] },
    { obj: [game.player], div: [playerDiv] },
  ];

  gameObjsAndDivs.forEach((pair) => {
    initDivs(pair.obj, pair.div);
  });

  for (let i = 0; i < game.lives; i++) {
    changeDivsVisibilityProp(heartDivs[i], "visible");
  }
};

const update = () => {
  if (game.hasPlayerPassedTimeLimit()) gameRoundLost();
  let gameObstaclesAndDivs = [
    {
      obj: game.allObstacles["car"]["objArray"],
      div: divsDictionary["car"],
    },
    {
      obj: game.allObstacles["spaceship"]["objArray"],
      div: divsDictionary["spaceship"],
    },
    {
      obj: game.allObstacles["among"]["objArray"],
      div: divsDictionary["among"],
    },
    {
      obj: game.allObstacles["stone"]["objArray"],
      div: divsDictionary["stone"],
    },
    {
      obj: game.allObstacles["banana"]["objArray"],
      div: divsDictionary["banana"],
    },
    {
      obj: game.allObstacles["trash"]["objArray"],
      div: divsDictionary["trash"],
    },
  ];

  updateDictionaryOfDivsAccordingToObstacles(gameObstaclesAndDivs);

  game.update();

  updateDivsLocationAccordingToGameObject(playerDiv, game.player);

  gameObstaclesAndDivs.forEach((pair) => {
    pair.obj.forEach((obstacle) => {
      hasPlayerCollisionedIntoObstacle(game.player, obstacle);
    });
  });

  game.hasPlayerLanded().then((rocketIndex) => {
    if (rocketIndex >= 0) {
      changeDivsVisibilityProp(
        divsDictionary["rocket"][rocketIndex],
        "visible"
      );
    }
  });

  isPlayerAloneInSpace();

  updateInterfaceDivs();

  if (!game.isPlaying) {
    updateGameOverDivs();
  } else window.setTimeout(update, game.fpsInterval);
};

const createDivsAndImagesFromArrayOfProps = (
  divClassNameAndImageSrcDictionary
) => {
  let dictonaryOfObjectsArrays = {};
  divClassNameAndImageSrcDictionary.forEach((object) => {
    const { name, divClassName, imgSrc, length, parentDiv } = object;
    const objectsArray = createDivsWithImage(
      divClassName,
      imgSrc,
      length,
      parentDiv
    );
    dictonaryOfObjectsArrays[name] = objectsArray;
  });
  return dictonaryOfObjectsArrays;
};

const createDivsWithImage = (divClassName, imgSrc, length, parentDiv) => {
  let arrayOfDivs = [];
  for (let index = 0; index < length; index++) {
    const div = document.createElement("div");
    div.classList.add(divClassName);
    parentDiv.appendChild(div);
    const img = document.createElement("img");
    img.src = imgSrc;
    div.appendChild(img);
    arrayOfDivs.push(div);
  }
  return arrayOfDivs;
};

const updateDivsAccordingToObstalces = (gameObjArr, divs) => {
  gameObjArr.forEach((gameObj, i) => {
    gameObj.update();
    updateDivsLocationAccordingToGameObject(divs[i], gameObj);
  });
};

const updateDictionaryOfDivsAccordingToObstacles = (
  dictionaryOfObstaclesAndDivs
) => {
  dictionaryOfObstaclesAndDivs.forEach((pair) => {
    updateDivsAccordingToObstalces(pair.obj, pair.div);
  });
};

const updateDivsLocationAccordingToGameObject = (div, gameObj) => {
  div.style.left = `${gameObj.x}px`;
  div.style.top = `${gameObj.y}px`;
};

const gameRoundLost = () => {
  game.subtractLife();
  game = initGame();
};

const hasPlayerCollisionedIntoObstacle = (player, obstacle) => {
  if (player.collision(obstacle)) {
    if (obstacle.isGood) {
      player.updateLocationOnObstacle(obstacle.dir);
    } else {
      gameRoundLost();
    }
  }
};

const isPlayerAloneInSpace = () => {
  if (game.player.isInSpace() && !game.player.collide) {
    gameRoundLost();
    game.timer = 0;
  }
};

const updateInterfaceDivs = () => {
  for (let i = 0; i < 3 - game.lives; i++) {
    changeDivsVisibilityProp(heartDivs[i], "hidden");
  }
  timeDiv.innerHTML = `${((game.timer * game.fpsInterval) / 1000).toFixed(1)}/${
    game.timeLimit
  }s`;
  satDiv.innerHTML = `${game.player.name}-${game.player.model}`;
  scoreDiv.innerHTML = `Score: ${game.score}`;
};

const updateGameOverDivs = () => {
  changeDivsVisibilityProp(finishDiv, "visible");
  finishScore.innerHTML = `Score: ${game.score}`;
};

const changeDivsVisibilityProp = (div, visibility) => {
  div.style.visibility = visibility;
};

startBtn.onclick = () => {
  changeDivsVisibilityProp(menu, "hidden");
  divsDictionary = createDivsAndImagesFromArrayOfProps(
    divClassNameAndImageSrcDictionary
  );
  init();
  update();
};

rstBtn.onclick = () => {
  changeDivsVisibilityProp(finishDiv, "hidden");
  game = new Game(5, gameDiv.clientWidth, gameDiv.clientHeight, game.scores);
  init();
  update();
};

backBtn.onclick = () => {
  changeDivsVisibilityProp(scoreboardDiv, "hidden");
  changeDivsVisibilityProp(finishDiv, "visible");
};

scoreboardBtn.onclick = () => {
  changeDivsVisibilityProp(finishDiv, "hidden");
  changeDivsVisibilityProp(scoreboardDiv, "visible");
  game.scores.sort().reverse();
  game.scores = game.scores.slice(0, 3);
  for (let i = 0; i < game.scores.length; i++)
    scoreDivs[i].innerHTML = `Score: ${game.scores[i]}`;
};
