function myMap(inputArray, callback) {
  const result = [];
  for (let input of inputArray) {
    result.push(callback(input));
  }
  return result;
}

module.exports = myMap;