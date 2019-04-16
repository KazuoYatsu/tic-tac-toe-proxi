const { color } = require('./color');

class Position {
  constructor(value = ' ') {
    this.value = value;
    this.color = color.reset;
  }

  setColor(newColor) {
    this.color = newColor;
  }
}

module.exports = {
  Position,
};
