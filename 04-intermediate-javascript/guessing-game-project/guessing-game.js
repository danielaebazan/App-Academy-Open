const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}; 

// 1. Create a secretNumber variable
let secretNumber = null;
let numAttempts = null;

// 2. Define a checkGuess function
let checkGuess = function (num) {
    if (num === secretNumber) {
        console.log('Correct!');
        return true;
    } else if (num > secretNumber) {
        console.log('Too high.');
        return false;
    } else if (num < secretNumber) {
        console.log('Too low')
        return false;
    };
};

function askGuess(guess) {
    if (numAttempts === 0) {
        console.log("You lose.");
        rl.close();
        return false;
    };
rl.question('Enter a guess: ', askGuess);
    guess = Number(guess);
    let result = checkGuess(guess);

    if (result === true) {
        console.log('You win!');
        rl.close();

    } else if (result === false) {
        numAttempts--;
        return rl.question('Enter a guess: ', askGuess);
    };
};

function askRange() {
    rl.question("Enter a min number: ", minAnswer => {
         minAnswer = Number(minAnswer)
        rl.question("Enter a max number: ", maxAnswer => {
             maxAnswer = Number(maxAnswer)
            console.log("I'm thinking of a number between " + minAnswer + " and " + maxAnswer + "...");
            secretNumber = randomInRange(minAnswer, maxAnswer);
            rl.question('Enter a guess: ', askGuess);
        });
    });
}; 

function askLimit() {
    rl.question("Enter the number of attempts: ", limit => {
        limit = Number(limit);
        numAttempts = limit;
        askRange();
    });
};

console.log(askLimit());



