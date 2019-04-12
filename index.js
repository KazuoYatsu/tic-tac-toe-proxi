const { TicTacToe } = require('./tic-tac-toe');

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
    console.log('|', board[i][0], '|', board[i][1], '|', board[i][2], '|');
  }

  console.log();
}

function main() {
  const ticTacToe = new TicTacToe();
  ticTacToe.play(1, 1);
  ticTacToe.play(1, 2);
  ticTacToe.play(0, 0);
  ticTacToe.play(2, 2);
  printBoard(ticTacToe.board);
}

if (require.main === module) {
  main(process.argv);
}
