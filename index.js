const { TicTacToe } = require('./src/tic-tac-toe');
const { Player } = require('./src/player');

/**
 * Clear the console contents and prints on the console the
 * current state of the board
 * @param {Object} board - The representation of a Tic Tac Toe board
 */
function printBoard(board) {
  console.clear();
  console.log('TicTacToe');
  console.log();

  for (let i = 0; i < 3; i += 1) {
    console.log('|', board.get(i, 0), '|', board.get(i, 1), '|', board.get(i, 2), '|');
  }

  console.log();
}

function main() {
  const playerX = new Player('X');
  const playerO = new Player('O');
  const ticTacToe = new TicTacToe(playerX, playerO);

  ticTacToe.onEndgame().then(value => console.log(value));

  ticTacToe.play(1, 1);
  ticTacToe.play(1, 2);
  ticTacToe.play(0, 0);
  ticTacToe.play(2, 2);
  ticTacToe.play(2, 0);
  ticTacToe.play(0, 2);

  printBoard(ticTacToe.board);
}

if (require.main === module) {
  main(process.argv);
}
