module.exports = function reverseString(string) {
  if (typeof string !== 'string') {
    throw TypeError("Input must be a string");
  }
  return string.split('').reverse().join('');
};