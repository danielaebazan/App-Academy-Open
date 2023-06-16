const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    // Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);
    Screen.addCommand('up', 'move cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'move cursor down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'move cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'move cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('return', 'place move at cursor position', this.placeMove.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();
    console.log(`It is currently ${this.playerTurn}'s move:`);
  }

  // Remove this
  // static testCommand() {
  //   console.log("TEST COMMAND");
  // }
  placeMove() {
    let row = this.cursor.row;
    let col = this.cursor.col;
    let el = this.grid[row][col];
    let belowEl;
    let belowRow;

    if (row < this.cursor.numRows - 1) {
      belowEl = this.grid[row + 1][col];
      belowRow = this.grid[row + 1];
    }


    // Set grid element to player turn if unplayed and render
    // Only play if above a filled slot
    if (el === ' ' && !belowRow || el === ' ' && belowEl !== ' ') {
      this.grid[row][col] = this.playerTurn;
      Screen.setGrid(row, col, this.playerTurn);

      // Check for win after placing every move
      let winner = ConnectFour.checkWin(this.grid);

      if (!!winner) {
        ConnectFour.endGame(winner);
      } else {
        // Switch player after a turn is played and the game is still unwon
        this.playerTurn === "O" ? this.playerTurn = "X" : this.playerTurn = "O";
        Screen.render();
        console.log(`It is currently ${this.playerTurn}'s move:`);
        Screen.printCommands();
      }

    } else if (belowEl === ' ') {
      console.log(`You can only place a move above a filled slot!`);
      Screen.printCommands();
    } else {
      console.log(`You cannot overwrite another player's turn!`);
      Screen.printCommands();
    }
  }

  static checkWin(grid) {
    const emptyGrid = grid.every(row => row.every(el => el === ' ') === true);
    const fullGrid = grid.every(row => row.every(el => el !== ' ') === true);

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    if (emptyGrid) {
      return false;
    } else if (ConnectFour.horizontalWin(grid)) {
      return `${ConnectFour.horizontalWin(grid)}`;
    } else if (ConnectFour.verticalWin(grid)) {
      return `${ConnectFour.verticalWin(grid)}`;
    } else if (ConnectFour.diagonalDownWin(grid)) {
      return `${ConnectFour.diagonalDownWin(grid)}`;
    } else if (ConnectFour.diagonalUpWin(grid)) {
      return `${ConnectFour.diagonalUpWin(grid)}`;
    } else if (fullGrid) {
      return "T";
    } else {
      return false;
    }

  }

  static horizontalWin(grid) {
    let winner;

    grid.forEach(row => {
      for (let i = 0; i <= row.length - 4; i++) {
        let el = row[i];
        let second = row[i + 1];;
        let third = row[i + 2];;
        let fourth = row[i + 3];;

        if (el !== ' ' && second && third && fourth) {
          if (el === second && second === third && third === fourth) {
            winner = el;
          }
        }
      }
    })

    return winner;
  }

  static verticalWin(grid) {
    // Transpose grid to switch column and row positions
    const cols = [];

    for (let col = 0; col < grid[0].length; col++) {
      let column = [];

      for (let row = 0; row < grid.length; row++) {
        let el = grid[row][col];
        column.push(el);
      }

      cols.push(column);
    }

    // Check for win in transposed grid
    return ConnectFour.horizontalWin(cols);
  }

  static diagonalDownWin(grid) {
    let winner;

    for (let col = 0; col < grid[0].length; col++) {
      for (let row = 0; row <= grid.length - 4; row++) {
        let el = grid[row][col];
        let second = grid[row + 1][col + 1];
        let third = grid[row + 2][col + 2];
        let fourth = grid[row + 3][col + 3];

        if (el !== ' ' && second && third && fourth) {
          if (el === second && second === third && third === fourth) {
            winner = el;
          }
        }
      }
    }

    return winner;
  }

  static diagonalUpWin(grid) {
    let winner;

    for (let row = 3; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        let el = grid[row][col];
        let second = grid[row - 1][col + 1];
        let third = grid[row - 2][col + 2];
        let fourth = grid[row - 3][col + 3];

        if (el !== ' ' && second && third && fourth) {
          if (el === second && second === third && third === fourth) {
            winner = el;
          }
        }
      }
    }

    return winner;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;