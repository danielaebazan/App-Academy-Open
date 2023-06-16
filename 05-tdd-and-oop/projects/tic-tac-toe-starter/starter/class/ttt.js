const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "o";

    this.grid = [[' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']]

    this.cursor = new Cursor(3, 3);

    this.test = "TESTING TESTING 1 2 3";

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    ///Screen.addCommand('t', 'test command (remove)', TTT.testCommand);
    Screen.addCommand('up', 'Move cursor up', TTT.moveUp.bind(this));
    Screen.addCommand('down', 'Move cursor down', TTT.moveDown.bind(this));
    Screen.addCommand('right', 'Move cursor right', TTT.moveRight.bind(this));
    Screen.addCommand('left', 'Move cursor left', TTT.moveLeft.bind(this));
    Screen.addCommand('return', 'Place token in cursor location', TTT.placeToken.bind(this));
    //Screen.addCommand('o', 'Place o in cursor location', TTT.placeO.bind(this));

    Screen.render();
  }

  /*
  //not needed
  static testCommand() {
    console.log("TEST COMMAND");
  }
  */


  static placeToken() {
    Screen.render();
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    if (this.playerTurn === "o") {
      this.playerTurn = "x";
    } else this.playerTurn = "o";
    let val = TTT.checkWin(Screen.grid);
    if (!val) Screen.render();
    else {
      TTT.endGame(val);
    }
    //Screen.setMessage(`${val}; ${Screen.grid}`);
    //Screen.setMessage(Screen.grid);

  }

  static moveUp() {
    console.log(this.test);
    Screen.render();
    this.cursor.up();
    Screen.render();
  }

  static moveDown() {
    Screen.render();
    this.cursor.down();
    Screen.render();
  }

  static moveRight() {
    Screen.render();
    this.cursor.right();
    Screen.render();
  }

  static moveLeft() {
    Screen.render();
    this.cursor.left();
    Screen.render();
  }

  static rotateGrid(grid) {
    let newGrid = [];
    for (let i = 0; i < 3; i++) {
      newGrid.push(grid.map(x => x[i]));
    }
    return newGrid;
  }

  static checkWin(grid) {
    let rotGrid = TTT.rotateGrid(grid);

    // Check for 'X' wins
    if (
      grid.some(row => row.every(v => v.toUpperCase() === 'X')) ||
      rotGrid.some(col => col.every(v => v.toUpperCase() === 'X')) ||
      [grid[0][0], grid[1][1], grid[2][2]].every(v => v.toUpperCase() === 'X') ||
      [grid[0][2], grid[1][1], grid[2][0]].every(v => v.toUpperCase() === 'X')
    ) {
      return 'X';
    }

    // Check for 'O' wins
    if (
      grid.some(row => row.every(v => v.toUpperCase() === 'O')) ||
      rotGrid.some(col => col.every(v => v.toUpperCase() === 'O')) ||
      [grid[0][0], grid[1][1], grid[2][2]].every(v => v.toUpperCase() === 'O') ||
      [grid[0][2], grid[1][1], grid[2][0]].every(v => v.toUpperCase() === 'O')
    ) {
      return 'O';
    }

    // Check for a tie
    if (grid.every(row => row.every(v => v !== ' '))) {
      return 'T';
    }

    // No winner yet
    return false;
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

module.exports = TTT;