const { Board } = require('../src/board');

describe('validatePosition', () => {
  const board = new Board();

  test('throws an error when inputing a number bigger than 2 as X axis', () => {
    const inputX = 3;
    const inputY = 0;

    const expectedError = new Error('Position has to be between 0 and 2');

    expect(() => board.validatePosition(inputX, inputY)).toThrow(expectedError);
  });

  test('throws an error when inputing a number bigger than 2 as Y axis', () => {
    const inputX = 0;
    const inputY = 3;

    const expectedError = new Error('Position has to be between 0 and 2');

    expect(() => board.validatePosition(inputX, inputY)).toThrow(expectedError);
  });

  test('throws an error when inputing a negative number as X axis', () => {
    const inputX = -1;
    const inputY = 0;

    const expectedError = new Error('Position has to be between 0 and 2');

    expect(() => board.validatePosition(inputX, inputY)).toThrow(expectedError);
  });

  test('throws an error when inputing a negative number as Y axis', () => {
    const inputX = 0;
    const inputY = -1;

    const expectedError = new Error('Position has to be between 0 and 2');

    expect(() => board.validatePosition(inputX, inputY)).toThrow(expectedError);
  });

  test('does nothing when inputing valid values', () => {
    const inputX = 0;
    const inputY = 0;

    expect(board.validatePosition(inputX, inputY)).toBeUndefined();
  });

  test('throws an error then attempting to play on an already played position', () => {
    const inputX = 0;
    const inputY = 0;

    board.set(inputX, inputY, 'X');

    const expectedError = new Error('Player X has already played in this position');

    expect(() => board.validatePosition(inputX, inputY)).toThrow(expectedError);
  });
});

describe('Board routine', () => {
  const board = new Board();

  test('The board cannot be full in the begining', () => {
    const isFull = board.isFull();
    const expectedOutput = false;

    expect(isFull).toBe(expectedOutput);
  });

  test('Set a value to a position then get the value', () => {
    const inputX = 1;
    const inputY = 1;
    const inputValue = 'X';

    const expectedOutputRegex = /.*X.*/;

    expect(board.set(inputX, inputY, inputValue)).toBeUndefined();
    expect(expectedOutputRegex.test(board.get(inputX, inputY))).toBe(true);
  });

  test('no won', () => {
    const expectedOutput = false;

    expect(board.checkHorizontalWinning()).toBe(expectedOutput);
    expect(board.checkDiagonalWinning()).toBe(expectedOutput);
    expect(board.checkVerticalWinnig()).toBe(expectedOutput);
  });

  test('win on a diagonal', () => {
    const inputValue = 'X';

    const diagonalExpectedValue = true;
    const verticalAndHorizontalExpectedValue = false;

    board.set(0, 0, inputValue);
    board.set(2, 2, inputValue);

    expect(board.checkDiagonalWinning()).toBe(diagonalExpectedValue);
    expect(board.checkHorizontalWinning()).toBe(verticalAndHorizontalExpectedValue);
    expect(board.checkVerticalWinnig()).toBe(verticalAndHorizontalExpectedValue);
  });

  test('win on a vertical', () => {
    const inputValue = 'X';

    board.set(0, 1, inputValue);
    board.set(2, 1, inputValue);

    const diagonalAndVerticalExpectedValue = true;
    const horizontalExpectedValue = false;

    expect(board.checkHorizontalWinning()).toBe(horizontalExpectedValue);
    expect(board.checkDiagonalWinning()).toBe(diagonalAndVerticalExpectedValue);
    expect(board.checkVerticalWinnig()).toBe(diagonalAndVerticalExpectedValue);
  });

  test('win on a horizontal', () => {
    const inputValue = 'X';

    board.set(0, 2, inputValue);

    const expectedOutput = true;

    expect(board.checkHorizontalWinning()).toBe(expectedOutput);
    expect(board.checkDiagonalWinning()).toBe(expectedOutput);
    expect(board.checkVerticalWinnig()).toBe(expectedOutput);
  });
});
