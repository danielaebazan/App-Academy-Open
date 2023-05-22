const [addNums, addManyNums] = require("./phase-1");

// Runs `addNums` in 10 increasing increments
function addNums10(increment) {
  let result = [];
  for (let i = 1, j = increment; i <= 10; i++, j += increment) {
    result.push(addNums(j));
  }
  return result;
};

// Runs `addManyNums` in 10 increasing increments
function addManyNums10(increment) {
  let result = [];
  for (let i = 1, j = increment; i <= 10; i++, j += increment) {
    result.push(addManyNums(j));
  }
  return result;
};

module.exports = [addNums10, addManyNums10];