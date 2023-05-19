function returnsThree() {
  return 3;
}

function reciprocal(n) {
  /* It's checking if the input is a number. If it isn't, it throws an error. */
  if (typeof n !== 'number') {
    throw new TypeError("Input must be a number");
  }
  /* It's checking if the input is between 1 and 1,000,000. If it isn't, it throws an error. */
  if (n < 1 || n > 1000000) {
    throw new TypeError("Input must be between 1 and 1,000,000");
  }
  return 1 / n;
} 

module.exports = {
  returnsThree,
  reciprocal
};