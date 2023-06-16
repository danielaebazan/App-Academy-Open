const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'magenta';

  }
 
  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    if (this.row > 0) {
      this.resetBackgroundColor()
      this.row--;
      this.setBackgroundColor();
    }
  }

  down() {
    if (this.row < this.numRows - 1) {
      this.resetBackgroundColor(); // Reset the background color of the current position
      this.row++; // Move the cursor down by incrementing the row
      this.setBackgroundColor(); // Set the background color of the new position
    }
  }


  left() {
    if (this.col > 0) {
      this.resetBackgroundColor();
      this.col--;
      this.setBackgroundColor();
    }
    
  }

  right() {
    if(this.col +1 < this.numCols) {
      this.setBackgroundColor();
      this.col++;
      this.setBackgroundColor();
    }
  }

}


module.exports = Cursor;
