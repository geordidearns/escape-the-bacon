import * as gameHelpers from './helpers.js';

// Initialise all the PIXI classes for use (capitalised for differentiation)
const Container           = PIXI.Container,
      AutoDetectRenderer  = PIXI.autoDetectRenderer,
      Loader              = PIXI.loader,
      Resources           = PIXI.loader.resources,
      Sprite              = PIXI.Sprite,
      DisplayObject       = PIXI.Container,
      Text                = PIXI.Text,
      Graphics            = PIXI.Graphics;

// Initialise the variables that may be used & re-assigned throughout the program
let pig, gameBoard, barn, hay, message, bacons, healthBar,
    outerBar, innerBar, gameScene, gameOverScene, state;

// Create the game scene & set the scene to the desired size
let gameStage   = new Container(),
    renderer    = AutoDetectRenderer(512, 512);

// Append the rendering context to the document (browser window)
document.body.appendChild(renderer.view);

// This loads all the images before it runs the setup function, yay!
Loader
  .add([
      "images/game-board.png",
      "images/pig.png",
      "images/hay.png",
      "images/barn.png",
      "images/bacon.png"
    ])
    .load(setup);

// Setup function - will be used to set up sprites and game items such as keyboard events
function setup() {
  // Create Game scene where the assets will be added to
  gameScene = new Container();
  gameStage.addChild(gameScene);

  gameOverScene = new Container();
  gameOverScene.visible = false;
  gameStage.addChild(gameOverScene);

  // Add gameboard to Scene
  gameBoard = new Sprite(Loader.resources["images/game-board.png"].texture);
  gameScene.addChild(gameBoard);

  // Add the Pig to the Scene
  pig = new Sprite(Loader.resources["images/pig.png"].texture);
  // Place the pig on the X-Axis
  pig.x = 30;
  // Place the pig halfway down the gameScene
  pig.y = gameScene.height / 2 - pig.height / 2;
  // Set the X-axis velocity to zero (not moving)
  pig.vx = 0;
  // Set the Y-axis velocity to zero (not moving)
  pig.vy = 0;
  // Add the pig to the scene
  gameScene.addChild(pig);

  // Add the Hay to the Scene
  hay = new Sprite(Loader.resources["images/hay.png"].texture);
  // Place the hay on the X-Axis
  hay.x = gameScene.width - hay.width - 48;
  // Place the hay halfway down the gameScene
  hay.y = gameScene.height / 2 - hay.height / 2;
  // Add the hay to the scene
  gameScene.addChild(hay);

  // Add the Barn to the Scene
  barn = new Sprite(Loader.resources["images/barn.png"].texture);
  // Place the barn on the X-Axis, not the Y-axis
  barn.position.set(35,0);
  // Add the barn to the scene
  gameScene.addChild(barn);

  //Create the health bar
  healthBar = new PIXI.DisplayObjectContainer();
  healthBar.position.set(gameStage.width - 170, 12)
  gameScene.addChild(healthBar);

  //Create the black background rectangle
  let innerBar = new PIXI.Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  //Create the front red rectangle
  let outerBar = new PIXI.Graphics();
  outerBar.beginFill(0xff5c5c);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;

  // Bacon Pieces attributes
  let numberOfBacons        = 8,
      spacingBetweenBacons  = 48,
      xOffset               = 120,
      speedOfMovement       = 3,
      directionOfMovement   = 1;

  bacons = [];

  for (let i = 0; i < numberOfBacons; i++) {

    let bacon = new Sprite(Loader.resources["images/bacon.png"].texture);

    // Space the bacon using the value above, times the number of bacons there are
    let x = spacingBetweenBacons * i + xOffset;
    let y = gameHelpers.randomInt(0, gameStage.height - bacon.height);

    // Assign the bacons x & y position to the x & y variables
    bacon.x = x;
    bacon.y = y;

    // Setting the Bacons vertical velocity: direction being 1 (down) or -1 (up)
    bacon.vy = speedOfMovement * directionOfMovement;

    // Reverse direction for next Bacon piece
    directionOfMovement *= -1;

    // Push each bacon piece into the bacon array
    bacons.push(bacon);

    // Add all the bacons to the game scene
    gameScene.addChild(bacon);
  }

  // Capture the keyboard arrow keys
    var left  = gameHelpers.keyboard(37),
        up    = gameHelpers.keyboard(38),
        right = gameHelpers.keyboard(39),
        down  = gameHelpers.keyboard(40);

    // On key press - update pig's x & y-axis movements according to the direction needed to go. Natural 
    // direction is down, and right (positive values), up and left are negative values. These values represent
    // the pixels to move the Pig.

    // On key release - Check if the opposite key is not pressed, and that the pig is not moving along the
    // Opposite Axis

    left.press = () => { pig.vx = -5, pig.vy = 0; };
    left.release = () => { pig.vx = 0; if (!right.isDown && pig.vy === 0); };

    right.press = () => { pig.vx = 5, pig.vy = 0; };
    right.release = () => { pig.vx = 0; if (!left.isDown && pig.vy === 0); };

    up.press = () => { pig.vx = 0, pig.vy = -5; };
    up.release = () => { pig.vy = 0; if (!down.isDown && pig.vy === 0); };

    down.press = () => { pig.vx = 0, pig.vy = 5; };
    down.release = () => { pig.vy = 0; if (!up.isDown && pig.vy === 0); };

  
  //Set the game state
  state = play;
  
  gameLoop();
};

// Game Loop function - This is what will be called recursively with the requestAnimationFrame method
function gameLoop() {

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);
  
  // Update the current game state at 60fps
  state();
  
  //Render the stage
  renderer.render(gameStage);

};

// Play Function - Where the game logic lives, setting the state of the game if ended or not
function play() {
  // Move the pig along the x or y axis in relation to the keyboard events
  pig.x += pig.vx;
  pig.y += pig.vy;

  // Container the pig within the game scene
  gameHelpers.contain(pig, {x: 32, y: 32, width: 488, height: 480});

  let pigHit = false;

  bacons.forEach(function(baconObj) {
    // Move bacon along the Y-Axis
    baconObj.y += baconObj.vy;
    // Contain the bacon within the game scene
    let baconHitsWall = gameHelpers.contain(baconObj, {x: 32, y: 32, width: 488, height: 480});

    if (baconHitsWall === "top" || baconHitsWall === "bottom") {
      baconObj.vy *= -1;
    }

    if(gameHelpers.collisionCheckRectangle(pig, baconObj)) {
      pigHit = true;
    }
  });

  if(pigHit) {
    // Make piggy opaque if it gets hit, same with the hay
    pig.alpha = 0.5;
    hay.alpha = 0.5;
    healthBar.outer.width -= 4;
  } else {
    pig.alpha = 1;
    hay.alpha = 1;
  }

  if(gameHelpers.collisionCheckRectangle(pig, hay)) {
    hay.x = pig.x - 12;
    hay.y = pig.y;
  }

  if (gameHelpers.collisionCheckRectangle(hay, barn)) {
    state = end;
  }

  if (healthBar.outer.width < 0) {
    state = end;
  }

};

// End Function - what happens when the game has ended?
function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
};