// Adds up positive integers from 1-n
function addNums(n) {
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  };
  return total;
};


// Adds up values of addNums(1) through addNums(n)
function addManyNums(n) {
  let result = 0;
  for (let i = 0; i <= n; i++) {
    result += addNums(i);
  };
  return result
};

module.exports = [addNums, addManyNums];