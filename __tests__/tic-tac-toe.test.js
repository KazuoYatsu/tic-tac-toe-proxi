const { TicTacToe } = require('../src/tic-tac-toe');
const { Player } = require('../src/player');
const { Position } = require('../src/position');

describe('Playing routine', () => {
  const playerX = new Player('X');
  const playerO = new Player('O');
  const ticTacToe = new TicTacToe(playerX, playerO);

  test('returns \'X\' when getting the current player for the first time', () => {
    const expectedOutput = 'X';

    expect(ticTacToe.getCurrentPlayerCharacter()).toEqual(expectedOutput);
  });

  test('changes the player and places a character on the board', () => {
    const inputX = 1;
    const inputY = 1;

    ticTacToe.play(inputX, inputY);

    const expectedPlayer = 'O';
    const expectedBoardState = [
      [new Position(), new Position(), new Position()],
      [new Position(), new Position('X'), new Position()],
      [new Position(), new Position(), new Position()],
    ];

    expect(ticTacToe.getCurrentPlayerCharacter()).toEqual(expectedPlayer);
    expect(ticTacToe.board.board).toEqual(expectedBoardState);
  });
});
