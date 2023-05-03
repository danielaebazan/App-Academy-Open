const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  const helpText = `
    \nHelp:\n
      Type 'r' for Rock
      Type 'p' for Paper
      Type 's' for Scissors
      Type 'q' to quit
      Type 'h' for a list of valid commands\n
  `;

  console.log(helpText);
};

function getWinner(move1, move2) {
  if (move2 === VALID_MOVES[move1].winsAgainst) {
    return 1;
  }

  if (move1 === VALID_MOVES[move2].winsAgainst) {
    return -1;
  }

  return 0;
};

function getCPUMove() {
  const move = Math.floor(Math.random() * 3);
  const keys = Object.keys(VALID_MOVES).sort((a, b) => a - b);

  return keys[move]
};
function processMove(cmd, cpu) {
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);
  const result = getWinner(cmd, cpu);
  if (result === 1) {
    console.log("You win!\n");
    wins++;
  }
  if (result === -1) {
    console.log("You lose...\n");
    losses++;
  }
  if (result === 0) {
    console.log("You tie.\n");
    ties++;
  }
}
/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      printHelp();
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]) {
      const validMoveKeys = Object.keys(VALID_MOVES);
      const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
      const cpu = validMoveKeys[randomIndex];
      processMove(cmd, cpu)
    } else {
      console.log("\nInvalid command.\n");
      printHelp();
    }

    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();
  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};