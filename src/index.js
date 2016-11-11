import gameHelpers from './helpers.js';

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
let cat, dungeon, door, burger, message, bacons, healthBar,
    outerBar, innerBar, gameScene, gameOverScene;

// Create the game scene & set the scene to the desired size
let gameStage   = new Container(),
    renderer    = autoDetectRenderer(512, 512);

// Append the rendering context to the document (browser window)
document.body.appendChild(renderer.view);

// Setup function - will be used to set up sprites and game items such as keyboard events
function setup() {

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