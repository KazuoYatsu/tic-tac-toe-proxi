const { Board } = require('./board');

class TicTacToe {
  /**
   * @param {Player} player1 - The first player
   * @param {Player} player2 - The second player
   */
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;

    this.board = new Board();
  }

  /**
   * Returns a promisse that is resolved when the game ends
   * @returns {Promise} - Resolved when the game ends
   */
  onEndgame() {
    return new Promise((resolve) => {
      this.onEndgameResolve = resolve;
    });
  }

  /**
   * Place a character on the specified coordinates according to the current player,
   * this function automatically changes the player
   * @param {Number} x - The position to place the character on the axis X
   * @param {Number} y - The position to place the character on the axis Y
   */
  play(x, y) {
    this.board.set(x, y, this.getCurrentPlayerCharacter());

    if (this.onEndgameResolve) {
      if (this.hasDrawn()) {
        this.onEndgameResolve('Draw game');
      } else if (this.hasWon()) {
        this.onEndgameResolve(`Player ${this.getCurrentPlayerCharacter()} won`);
      }
    }

    this.changePlayer();
  }

  /**
   * Returns the character corresponding to the current player
   * @returns - The character coresponding to the current player: 'X' or 'O'
   */
  getCurrentPlayerCharacter() {
    return this.currentPlayer.character;
  }

  /**
   * Changes the current player
   */
  changePlayer() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  /**
   * Returns true if the game has drawn
   * @returns {Boolean}
   */
  hasDrawn() {
    return this.board.isFull();
  }

  /**
   * Returns true if the someone has won
   * @returns {Boolean}
   */
  hasWon() {
    return this.board.checkHorizontalWinning()
    || this.board.checkVerticalWinnig()
    || this.board.checkDiagonalWinning();
  }
}

module.exports = {
  TicTacToe,
};
