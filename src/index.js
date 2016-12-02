import * as gameHelpers from './helpers.js';

// Initialise all the PIXI classes for use (capitalised for differentiation)
const Container            = PIXI.Container,
      AutoDetectRenderer   = PIXI.autoDetectRenderer,
      Loader               = PIXI.loader,
      Resources            = PIXI.loader.resources,
      Sprite               = PIXI.Sprite,
      DisplayObject        = PIXI.Container,
      Text                 = PIXI.Text,
      Graphics             = PIXI.Graphics;

// Initialise the variables that may be used & re-assigned throughout the program
let pig, gameBoard, barn, hay, message, bacons, healthBar,
    outerBar, innerBar, gameScene, gameOverScene;

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

    // Add gameboard to Scene
    gameBoard = new Sprite(Loader.resources["images/game-board.png"].texture);
    gameScene.addChild(gameBoard);

    // Add the Pig to the Scene
    pig = new Sprite(Loader.resources["images/pig.png"].texture);
    // Place the pig on the X-Axis
    pig.x = 68;
    // Place the pig halfway down the gameScene
    pig.y = gameScene.height / 2 - pig.height / 2;
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
    barn.position.set(10,0);
    // Add the barn to the scene
    gameScene.addChild(barn);

    // Bacon Pieces
    var numberOfBacons          = 6,
        spacingBetweenBacons    = 48,
        xOffset                 = 150,
        speedOfMovement         = 2,
        directionOfMovement     = 1;

    bacons = [];

    for (var i = 0; i < numberOfBacons; i++) {

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

    renderer.render(gameStage);
};

// Game Loop function - This is what will be called recursively with the requestAnimationFrame method
function gameLoop() {

};

// Play Function - Where the game logic lives, setting the state of the game if ended or not
function play() {

};

// End Function - what happens when the game has ended?
function end() {

};