// Helper functions to assist gameplay. Collision detection, Keyboard events, useful Math functions etc

// Returns a random integer
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Keyboard movement
export function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  // The keyDown handler
  key.downHandler = (event) => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  }

  // The keyUp handler
  key.upHandler = (event) => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  }

  // Attach event listeners to the window to listen to keyboard interaction
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );

  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );

  return key;
}

// Take a sprite, and a container and use the x, y , width and height attributes to 
// determine if the sprite has hit the edges of the the container specified
export function contain(sprite, container) {
  let collision = undefined;

  // Check Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  // Check Top
  if (sprite.y <container.y) {
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
export function collisionCheckRectangle(rectOne, rectTwo) {
  // Variables that need to be calculated for the collision
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

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

