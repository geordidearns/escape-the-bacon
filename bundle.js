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

	var gameHelpers = _interopRequireWildcard(_helpers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
	    gameOverScene = void 0,
	    state = void 0;

	// Create the game scene & set the scene to the desired size
	var gameStage = new Container(),
	    renderer = AutoDetectRenderer(512, 512);

	// Append the rendering context to the document (browser window)
	document.body.appendChild(renderer.view);

	// This loads all the images before it runs the setup function, yay!
	Loader.add(["images/game-board.png", "images/pig.png", "images/hay.png", "images/barn.png", "images/bacon.png"]).load(setup);

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
	  barn.position.set(10, 0);
	  // Add the barn to the scene
	  gameScene.addChild(barn);

	  //Create the health bar
	  healthBar = new PIXI.DisplayObjectContainer();
	  healthBar.position.set(gameStage.width - 170, 6);
	  gameScene.addChild(healthBar);

	  //Create the black background rectangle
	  var innerBar = new PIXI.Graphics();
	  innerBar.beginFill(0x000000);
	  innerBar.drawRect(0, 0, 128, 8);
	  innerBar.endFill();
	  healthBar.addChild(innerBar);

	  //Create the front red rectangle
	  var outerBar = new PIXI.Graphics();
	  outerBar.beginFill(0xFF3300);
	  outerBar.drawRect(0, 0, 128, 8);
	  outerBar.endFill();
	  healthBar.addChild(outerBar);

	  healthBar.outer = outerBar;

	  // Bacon Pieces attributes
	  var numberOfBacons = 6,
	      spacingBetweenBacons = 48,
	      xOffset = 150,
	      speedOfMovement = 2,
	      directionOfMovement = 1;

	  bacons = [];

	  for (var i = 0; i < numberOfBacons; i++) {

	    var bacon = new Sprite(Loader.resources["images/bacon.png"].texture);

	    // Space the bacon using the value above, times the number of bacons there are
	    var x = spacingBetweenBacons * i + xOffset;
	    var y = gameHelpers.randomInt(0, gameStage.height - bacon.height);

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

	  // Pig Movement Logic

	  // Capture the keyboard arrow keys
	  var left = gameHelpers.keyboard(37),
	      up = gameHelpers.keyboard(38),
	      right = gameHelpers.keyboard(39),
	      down = gameHelpers.keyboard(40);

	  // On key press - update pig's x & y-axis movements according to the direction needed to go. Natural 
	  // direction is down, and right (positive values), up and left are negative values. These values represent
	  // the pixels to move the Pig.

	  // On key release - Check if the opposite key is not pressed, and that the pig is not moving along the
	  // Opposite Axis

	  left.press = function () {
	    pig.vx = -5, pig.vy = 0;
	  };
	  left.release = function () {
	    pig.vx = 0;if (!right.isDown && pig.vy === 0) ;
	  };

	  right.press = function () {
	    pig.vx = 5, pig.vy = 0;
	  };
	  right.release = function () {
	    pig.vx = 0;if (!left.isDown && pig.vy === 0) ;
	  };

	  up.press = function () {
	    pig.vx = 0, pig.vy = -5;
	  };
	  up.release = function () {
	    pig.vy = 0;if (!down.isDown && pig.vy === 0) ;
	  };

	  down.press = function () {
	    pig.vx = 0, pig.vy = 5;
	  };
	  down.release = function () {
	    pig.vy = 0;if (!up.isDown && pig.vy === 0) ;
	  };

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
	  gameHelpers.contain(pig, { x: 32, y: 32, width: 488, height: 480 });

	  var pigHit = false;

	  bacons.forEach(function (baconObj) {
	    // Move bacon along the Y-Axis
	    baconObj.y += baconObj.vy;
	    // Contain the bacon within the game scene
	    var baconHitsWall = gameHelpers.contain(baconObj, { x: 32, y: 32, width: 488, height: 480 });

	    if (baconHitsWall === "top" || baconHitsWall === "bottom") {
	      baconObj.vy *= -1;
	    }

	    if (gameHelpers.collisionCheckRectangle(pig, baconObj)) {
	      pigHit = true;
	    }
	  });

	  if (pigHit) {
	    pig.alpha = 0.5;
	    healthBar.outer.width -= 1;
	  } else {
	    pig.alpha = 1;
	  }

	  if (gameHelpers.collisionCheckRectangle(pig, hay)) {
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
	function end() {};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.randomInt = randomInt;
	exports.keyboard = keyboard;
	exports.contain = contain;
	exports.collisionCheckRectangle = collisionCheckRectangle;
	// Helper functions to assist gameplay. Collision detection, Keyboard events, useful Math functions etc

	// Returns a random integer
	function randomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Keyboard movement
	function keyboard(keyCode) {
	  var key = {};
	  key.code = keyCode;
	  key.isDown = false;
	  key.isUp = true;
	  key.press = undefined;
	  key.release = undefined;

	  // The keyDown handler
	  key.downHandler = function (event) {
	    if (event.keyCode === key.code) {
	      if (key.isUp && key.press) key.press();
	      key.isDown = true;
	      key.isUp = false;
	    }
	    event.preventDefault();
	  };

	  // The keyUp handler
	  key.upHandler = function (event) {
	    if (event.keyCode === key.code) {
	      if (key.isDown && key.release) key.release();
	      key.isDown = false;
	      key.isUp = true;
	    }
	    event.preventDefault();
	  };

	  // Attach event listeners to the window to listen to keyboard interaction
	  window.addEventListener("keyup", key.upHandler.bind(key), false);

	  window.addEventListener("keydown", key.downHandler.bind(key), false);

	  return key;
	}

	// Take a sprite, and a container and use the x, y , width and height attributes to 
	// determine if the sprite has hit the edges of the the container specified
	function contain(sprite, container) {
	  var collision = undefined;

	  // Check Left
	  if (sprite.x < container.x) {
	    sprite.x = container.x;
	    collision = "left";
	  }

	  // Check Top
	  if (sprite.y < container.y) {
	    sprite.y = container.y;
	    collision = "top";
	  }

	  // Check Right
	  if (sprite.x + sprite.width > container.width) {
	    sprite.x = container.width - sprite.width;
	    collision = "right";
	  }

	  // Check Bottom
	  if (sprite.y + sprite.height > container.height) {
	    sprite.y = container.height - sprite.height;
	    collision = "bottom";
	  }

	  // return the state of collision (if it has hit the sidess)
	  return collision;
	}

	// Collision detection for rectangle shapes.
	function collisionCheckRectangle(rectOne, rectTwo) {
	  // Variables that need to be calculated for the collision
	  var hit = void 0,
	      combinedHalfWidths = void 0,
	      combinedHalfHeights = void 0,
	      vx = void 0,
	      vy = void 0;

	  // No collision by default
	  hit = false;

	  // rectOne X-Axis center-point
	  rectOne.centerX = rectOne.x + rectOne.width / 2;
	  // rectOne Y-Axis center-point
	  rectOne.centerY = rectOne.y + rectOne.height / 2;

	  // rectTwo X-Axis center-point
	  rectTwo.centerX = rectTwo.x + rectTwo.width / 2;
	  // rectTwo Y-Axis center-point
	  rectTwo.centerY = rectTwo.y + rectTwo.height / 2;

	  // rectOne Half-width
	  rectOne.halfWidth = rectOne.width / 2;
	  // rectOne Half-width
	  rectOne.halfHeight = rectOne.height / 2;

	  // rectTwo Half-width
	  rectTwo.halfWidth = rectTwo.width / 2;
	  // rectTwo Half-width
	  rectTwo.halfHeight = rectTwo.height / 2;

	  // Distance vector between sprites
	  vx = rectOne.centerX - rectTwo.centerX;
	  vy = rectOne.centerY - rectTwo.centerY;

	  // Combine the half widths
	  combinedHalfWidths = rectOne.halfWidth + rectTwo.halfWidth;
	  combinedHalfHeights = rectOne.halfHeight + rectTwo.halfHeight;

	  // Check for collisions on the X-Axis
	  if (Math.abs(vx) < combinedHalfWidths) {

	    // Check to see if a collision is happening on the Y-Axis
	    if (Math.abs(vy) < combinedHalfHeights) {
	      // Collision!
	      hit = true;
	    } else {
	      hit = false;
	    }
	  } else {
	    hit = false;
	  }

	  // Return the state of 'hit' (true or false)
	  return hit;
	}

/***/ }
/******/ ]);