const { color } = require('./color');
const { Position } = require('./position');

/**
 * From an array of Position returns true if the line won the game
 * it also changes the color of the String to be printed
 * @param {Position[]} line - The line to check
 * @returns {Boolean} - True if the line has won the tic tac toe game
 */
function checkLineWinning(line) {
  const emptyPosition = new Position();
  const allEqual = line.every(value => value.value !== emptyPosition.value
    && value.value === line[0].value);

  if (allEqual) line.forEach(value => value.setColor(color.fgRed));

  return allEqual;
}

class Board {
  /**
   * Instantiates a new board for Tic Tac Toe
   */
  constructor() {
    this.tableLength = 3;
    this.board = [[], [], []];
    this.transposedBoard = [[], [], []];
    this.decreasingDiagonal = [];
    this.increasingDiagonal = [];
    this.resetBoard();
  }

  /**
   * Sets the initial state for the game
   */
  resetBoard() {
    for (let x = 0; x < this.tableLength; x += 1) {
      for (let y = 0; y < this.tableLength; y += 1) {
        const position = new Position();
        this.board[x][y] = position;
        this.transposedBoard[y][x] = position;

        const belongsToDecreasingDiagonal = x === y;

        if (belongsToDecreasingDiagonal) {
          this.decreasingDiagonal.push(position);
        }

        const belongsToIncreasingDiagonal = x + y === this.tableLength - 1;

        if (belongsToIncreasingDiagonal) {
          this.increasingDiagonal.push(position);
        }
      }
    }
  }

  /**
   * Check if the board is completely filled
   * @returns {Boolean} - True if the board is full
   */
  isFull() {
    const emptyPosition = new Position();
    return !this.board.some(line => line.some(position => position.value === emptyPosition.value));
  }

  /**
   * Gets the value in the specified position
   * @param {Number} x - The X coordinate in the board
   * @param {Number} y - The Y coordinate in the board
   * @returns {String} - The String containg the value in the position, whitespace is
   * returned if the position is empty, the value starts with a string to change cosole's
   * color and ends with a string to reset the color
   */
  get(x, y) {
    return this.board[x][y].color + this.board[x][y].value + color.reset;
  }

  /**
   * Sets the value in the specified position
   * @param {Number} x - The X coordinate in the board
   * @param {Number} y - The Y coordinate in the board
   * @param {String} value - The value to be set in the specified position
   */
  set(x, y, value) {
    this.validatePosition(x, y);
    this.board[x][y].value = value;
  }

  /**
   * Validates if the parameters are a valid coordinate,
   * if it's not valid then an error is thown
   * @param {Number} x - The coordinate X
   * @param {Number} y - The coordinate Y
   */
  validatePosition(x, y) {
    const length = this.tableLength - 1;
    if (x < 0 || x > length || y < 0 || y > length) {
      throw new Error(`Position has to be between 0 and ${length}`);
    }

    const player = this.board[x][y].value;
    if (player !== ' ') {
      throw new Error(`Player ${player} has already played in this position`);
    }
  }

  /**
   * Returns true if there is any horizontal line in the board
   * that won the game
   * @returns {Boolean}
   */
  checkHorizontalWinning() {
    const index = this.board.findIndex(line => checkLineWinning(line));
    return index > -1;
  }

  /**
   * Returns true if there is any vertical line in the board
   * that won the game
   * @returns {Boolean}
   */
  checkVerticalWinnig() {
    const index = this.transposedBoard.findIndex(line => checkLineWinning(line));
    return index > -1;
  }

  /**
   * Returns true if there is any diagonal line in the board
   * that won the game
   * @returns {Boolean}
   */
  checkDiagonalWinning() {
    return checkLineWinning(this.decreasingDiagonal) || checkLineWinning(this.increasingDiagonal);
  }
}

module.exports = {
  Board,
};
