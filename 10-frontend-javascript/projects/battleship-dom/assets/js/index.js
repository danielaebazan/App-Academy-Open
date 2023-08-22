import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here

// Create container
document.body.innerHTML += `
    <div>
        <button id="reset" onclick = "window.location.reload()">Reset Game</button>
    </div>
    <div class="container">
        <div class="grid">
            <div class="cell pointer" data-row=0 data-col=0 ></div>
        </div>
    </div>
`

// Create grid with data row col
const gridEl = document.getElementsByClassName("grid")[0];
const cellEl = document.getElementsByClassName("cell")[0];
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        if (row === 0 && col === 0) continue // do nothing
        const newCell = cellEl.cloneNode()
        newCell.setAttribute("data-row", row)
        // set cursor to pointer:

        newCell.setAttribute("data-col", col);
        gridEl.appendChild(newCell);
    }
}

// listen cell clicks
gridEl.addEventListener("click", clickListener)
function clickListener(ev) {
    ev.stopPropagation(); // only on grid event
    if (!ev.target.classList.contains("cell")) {
        return; // between cells
    };
    let row = ev.target.dataset.row;
    let col = ev.target.dataset.col;
    // make shot
    console.log(row, col);
    let hitResult = board.makeHit(row, col)
    if (hitResult) {
        ev.target.classList.add('hit');
        ev.target.innerText = hitResult;
    } else {
        ev.target.classList.add('miss')
    }
    if (board.isGameOver()) {
        gameOver()
    }
}
function gameOver() {
    //add headline
    const h1El = document.getElementsByTagName("h1")[0]
    console.log(h1El);
    h1El.insertAdjacentHTML("afterend", `
    <div class = "win">YOU WIN!</div>
    `);

    // stop listen / loxk field:
    gridEl.removeEventListener("click", clickListener)

}
