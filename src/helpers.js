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

