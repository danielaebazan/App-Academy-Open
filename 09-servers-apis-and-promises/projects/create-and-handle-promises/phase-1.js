function stretch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1000)
  }).then(console.log("done stretching"));
}
 
function runOnTreadmill() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 500)
  }).then(console.log("done running on treadmill"))
}

function liftWeights() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 2000)
  }).then(console.log("done lifting weights"))
}

function workout() {
  stretch()
    .then(() => runOnTreadmill())
    .then(() => liftWeights())
    .then(() => { console.log("done workingout") });
}


/* ============================ TEST YOUR CODE ============================

Run the file (`node phase-1.js`) and check your output against the expected
output.
*/


workout();
  // should print out the following:
    // done stretching
    // done running on treadmill
    // done lifting weights
    // done working out