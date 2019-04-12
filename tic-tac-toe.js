class TicTacToe {
  constructor() {
    this.playerX = true;
    this.board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
  }

  /**
   * Place a character on the specified coordinates according to the current player,
   * this function automatically changes the player
   * @param {Number} x - The position to place the character on the axis X
   * @param {Number} y - The position to place the character on the axis Y
   */
  play(x, y) {
    this.validatePosition(x, y);
    this.board[x][y] = this.getCurrentPlayer();
    this.playerX = !this.playerX;
  }

  /**
   * Returns the character corresponding to the current player
   * @returns - The character coresponding to the current player: 'X' or 'O'
   */
  getCurrentPlayer() {
    return this.playerX ? 'X' : 'O';
  }

  /**
   * Validates if the parameters are a valid coordinate,
   * if it's not valid then an error is thown
   * @param {Number} x - The coordinate X
   * @param {Number} y - The coordinate Y
   */
  validatePosition(x, y) {
    if (x < 0 || x > 2 || y < 0 || y > 2) {
      throw new Error('Position has to be between 0 and 2');
    }

    const player = this.board[x][y];
    if (player !== ' ') {
      throw new Error(`Player ${player} has already played in this position`);
    }
  }
}

module.exports = {
  TicTacToe,
};
