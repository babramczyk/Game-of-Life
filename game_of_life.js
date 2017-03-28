var gameBoard = [
  [0, 1, 0, 0, 0],
  [1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 1, 0, 0, 0],
  [1, 0, 0, 0, 1]
];
var gameOver = false;

playGameOfLife(gameBoard);

/**
 * Evolves a given game board per the rules of the "Game of Life," logging
 * each generation to the console. A game is considered to be over when
 * all the cells in the board are dead.
 *
 * @param {Array} gameBoard
 *   The initial game board to play with
 */
function playGameOfLife(gameBoard) {
  while (!gameOver) {
    logGameBoard(gameBoard);
    gameBoard = evolveGameBoard(gameBoard);
  }

  // Log final (empty) game board for completeness' sake
  logGameBoard(gameBoard);
}

/**
 * Takes in a 2D "Game of Life" game board, and returns a new board that
 * represents the subsequent, evolved generation. When evaluating a cell
 * and its neighbors, the board it refers to is the initial game board,
 * instead of any dynamically changed cells that were checked before it.
 * Sets the global variable gameOver to true if all cells in the new
 * generation are dead.
 *
 * @param {Array} gameBoard
 *   The game board to evolve
 * @returns {Array}
 *   The evolved game board
 */
function evolveGameBoard(gameBoard) {
  if (gameBoard == null || gameBoard == undefined) {
    gameOver = true;
    return;
  }

  // Create copy of game board (to store new cell values in)
  var newBoard = createEmptyGameBoard(gameBoard);
  
  var allCellsDead = true;

  // Update every cell in the board
  for (var row = 0; row < gameBoard.length; row++) {
    for (var col = 0; col < gameBoard[row].length; col++) {
      var numAliveNeighbors = countAliveNeighbors(gameBoard, row, col);

      if (gameBoard[row][col]) { // Cell is alive
        if (numAliveNeighbors < 2 || numAliveNeighbors > 3) {
          // Kill the cell
          newBoard[row][col] = 0;
        } else {
          // Cell survives
          newBoard[row][col] = 1;
          if (allCellsDead) {
            allCellsDead = false;
          }
        }
      } else { // Cell is dead
        if (numAliveNeighbors == 3) {
          // Bring cell to life
          newBoard[row][col] = 1;
          if (allCellsDead) {
            allCellsDead = false;
          }
        } else {
          // Cell remains dead
          newBoard[row][col] = 0;
        }
      }
      
    }
  }

  // Not explicitly stated in the problem, but using an exit/game over
  // condition of "when all the cells are dead"
  if (allCellsDead) {
    gameOver = true;
  }

  return newBoard;
}

/**
 * Logs the given game board to the console in the given row-column
 * format.
 *
 * @param {Array} gameBoard
 *   The game board to evolve
 */
function logGameBoard(gameBoard) {
  if (gameBoard == null || gameBoard == undefined) return;
  var boardString = "";

  for (var row = 0; row < gameBoard.length; row++) {
    for (var col = 0; col < gameBoard[row].length; col++) {
      boardString += gameBoard[row][col];
    }
    boardString += "\n";
  }

  console.log(boardString);
}

/**
 * Creates and returns a game board of all null values, with identical
 * dimensions to the given game board.
 *
 * @param {Array} gameBoard
 *   The game board whose dimensions to use
 * @returns {Array}
 *   The empty game board
 */
function createEmptyGameBoard(gameBoard) {
  var newBoard = [];

  for (var row = 0; row < gameBoard.length; row++) {
    newBoard.push([]); // Add a new row onto the empty board
    for (var col = 0; col < gameBoard[row].length; col++) {
      newBoard[row].push(null);
    }
  }

  return newBoard;
}

/**
 * Counts the number of alive neighbors of a given cell in a given
 * game board. A "neighbor" is considered to be any cell to the top,
 * top right, right, bottom right, bottom, bottom left, left, or top
 * left of the cell.
 *
 * @param {Array} gameBoard
 *   The game board to evaluate the cell in
 * @param {number} cellRow
 *   The index of the row the cell is in
 * @param {number} cellCol
 *   The index of the column the cell is in
 * @returns {number}
 *   The number of alive neighbors the cell has
 */
function countAliveNeighbors(gameBoard, cellRow, cellCol) {
  var aliveNeighbors = 0;

  for (var row = cellRow - 1; row <= cellRow + 1; row++) {
    for (var col = cellCol - 1; col <= cellCol + 1; col++) {
      // Check to see if cell we're checking is a valid dimension and also not the cell itself
      if (!(row == cellRow && col == cellCol) && gameBoard[row] != undefined && gameBoard[row][col] != undefined) {
        aliveNeighbors += gameBoard[row][col];
      }
    }
  }

  return aliveNeighbors;
}
