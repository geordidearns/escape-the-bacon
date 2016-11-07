"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomInt = randomInt;
// Returns a random integer
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}