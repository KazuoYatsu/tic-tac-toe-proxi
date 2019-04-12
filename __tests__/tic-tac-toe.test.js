const { TicTacToe } = require('../tic-tac-toe');

describe('validatePosition', () => {
  const ticTacToe = new TicTacToe();

  test('throws an error when inputing a number bigger than 2 as X axis', () => {
    const inputX = 3;
    const inputY = 0;

    const expectedError = new Error('Position has to be between 0 and 2');

    expect(() => ticTacToe.validatePosition(inputX, inputY)).toThrow(expectedError);
  });

  test('throws an error when inputing a number bigger than 2 as Y axis', () => {
    const inputX = 0;
    const inputY = 3;

    const expectedError = new Error('Position has to be between 0 and 2');

    expect(() => ticTacToe.validatePosition(inputX, inputY)).toThrow(expectedError);
  });

  test('throws an error when inputing a negative number as X axis', () => {
    const inputX = -1;
    const inputY = 0;

    const expectedError = new Error('Position has to be between 0 and 2');

    expect(() => ticTacToe.validatePosition(inputX, inputY)).toThrow(expectedError);
  });

  test('throws an error when inputing a negative number as Y axis', () => {
    const inputX = 0;
    const inputY = -1;

    const expectedError = new Error('Position has to be between 0 and 2');

    expect(() => ticTacToe.validatePosition(inputX, inputY)).toThrow(expectedError);
  });

  test('does nothing when inputing valid values', () => {
    const inputX = 0;
    const inputY = 0;

    expect(ticTacToe.validatePosition(inputX, inputY)).toBeUndefined();
  });

  test('throws an error then attempting to play on an already played position', () => {
    const inputX = 0;
    const inputY = 0;

    ticTacToe.play(inputX, inputY);

    const expectedError = new Error('Player X has already played in this position');

    expect(() => ticTacToe.validatePosition(inputX, inputY)).toThrow(expectedError);
  });
});

describe('Playing routine', () => {
  const ticTacToe = new TicTacToe();

  test('returns \'X\' when getting the current player for the first time', () => {
    const expectedOutput = 'X';

    expect(ticTacToe.getCurrentPlayer()).toEqual(expectedOutput);
  });

  test('changes the player and places a character on the board', () => {
    const inputX = 1;
    const inputY = 1;

    ticTacToe.play(inputX, inputY);

    const expectedPlayer = 'O';
    const expectedBoardState = [[' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' ']];

    expect(ticTacToe.getCurrentPlayer()).toEqual(expectedPlayer);
    expect(ticTacToe.board).toEqual(expectedBoardState);
  });
});
