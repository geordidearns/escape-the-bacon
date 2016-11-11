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