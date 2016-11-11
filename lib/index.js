'use strict';

var _helpers = require('./helpers.js');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialise all the PIXI classes for use (capitalised for differentiation)
var Container = PIXI.Container,
    AutoDetectRenderer = PIXI.autoDetectRenderer,
    Loader = PIXI.loader,
    Resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    DisplayObject = PIXI.Container,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics;

// Initialise the variables that may be used & re-assigned throughout the program
var cat = void 0,
    dungeon = void 0,
    door = void 0,
    burger = void 0,
    message = void 0,
    bacons = void 0,
    healthBar = void 0,
    outerBar = void 0,
    innerBar = void 0,
    gameScene = void 0,
    gameOverScene = void 0;

// Create the game scene & set the scene to the desired size
var gameStage = new Container(),
    renderer = autoDetectRenderer(512, 512);

// Append the rendering context to the document (browser window)
document.body.appendChild(renderer.view);

// Setup function - will be used to set up sprites and game items such as keyboard events
function setup() {};

// Game Loop function - This is what will be called recursively with the requestAnimationFrame method
function gameLoop() {};

// Play Function - Where the game logic lives, setting the state of the game if ended or not
function play() {};

// End Function - what happens when the game has ended?
function end() {};