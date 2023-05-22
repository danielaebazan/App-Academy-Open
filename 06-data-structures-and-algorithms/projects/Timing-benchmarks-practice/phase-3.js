const [addNums, addManyNums] = require("./phase-1");

function addNums10Timing(increment) {
    let result = [];
    for (let i = 1, j = increment; i <= 10; i++, j += increment) {
      let startTime = Date.now();
      result.push(addNums(j));
      let endTime = Date.now();
      console.log(endTime - startTime);
    }
    return result;
};


function addManyNums10Timing(increment) {
    let result = [];
    for (let i = 1, j = increment; i <= 10; i++, j += increment) {
      let startTime = Date.now();
      result.push(addManyNums(j));
      let endTime = Date.now();
      console.log(endTime - startTime);
    }
    return result;
  };



n = 1000000
console.log(`addNums(${n}): `);
addNums10Timing(1000000);

console.log("\n***********\n");

n = 1000
console.log(`addManyNums(${n}): `);
addManyNums10Timing(5000);