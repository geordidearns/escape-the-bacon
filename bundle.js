/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _helpers = __webpack_require__(1);

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
	var pig = void 0,
	    gameBoard = void 0,
	    barn = void 0,
	    hay = void 0,
	    message = void 0,
	    bacons = void 0,
	    healthBar = void 0,
	    outerBar = void 0,
	    innerBar = void 0,
	    gameScene = void 0,
	    gameOverScene = void 0;

	// Create the game scene & set the scene to the desired size
	var gameStage = new Container(),
	    renderer = AutoDetectRenderer(512, 512);

	// Append the rendering context to the document (browser window)
	document.body.appendChild(renderer.view);

	// This loads all the images before it runs the setup function, yay!
	Loader.add(["images/game-board.png", "images/pig.png", "images/hay.png", "images/barn.png"]).load(setup);

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
	    // Place the cat on the X-Axis
	    pig.x = 68;
	    // Place the cat halfway down the gameScene
	    pig.y = gameScene.height / 2 - pig.height / 2;
	    // Add the cat to the scene
	    gameScene.addChild(pig);

	    // Add the Hay to the Scene
	    hay = new Sprite(Loader.resources["images/hay.png"].texture);
	    // Place the cat on the X-Axis
	    hay.x = gameScene.width - hay.width - 48;
	    // Place the cat halfway down the gameScene
	    hay.y = gameScene.height / 2 - hay.height / 2;
	    // Add the cat to the scene
	    gameScene.addChild(hay);

	    // Add the Barn to the Scene
	    barn = new Sprite(Loader.resources["images/barn.png"].texture);
	    // Place the barn on the X-Axis, not the Y-axis
	    barn.position.set(10, 0);
	    // Add the cat to the scene
	    gameScene.addChild(barn);

	    renderer.render(gameStage);
	};

	// Game Loop function - This is what will be called recursively with the requestAnimationFrame method
	function gameLoop() {};

	// Play Function - Where the game logic lives, setting the state of the game if ended or not
	function play() {};

	// End Function - what happens when the game has ended?
	function end() {};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.randomInt = randomInt;
	// Helper functions to assist gameplay. Collision detection, Keyboard events, useful Math functions etc

	// Returns a random integer
	function randomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

/***/ }
/******/ ]);