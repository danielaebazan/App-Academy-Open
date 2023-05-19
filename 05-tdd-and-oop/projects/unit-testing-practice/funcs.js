function isFive(num) {
  if ( num === 5) {
    return true;
  } else {
    return false;
  }
};

function isOdd(number) {
  if (typeof number !== "number") {
    throw new Error("number must be of type Number");
  }

  if (number % 2 !== 0) {
    return true;
  } else {
    return false;
  }
};
 
function myRange(min, max, step = 1) {
  if (typeof min !== "number" || typeof max !== "number" || typeof step !== "number") {
    throw new Error("min, max, and step must be of type Number");
  }

  if (step === 0) {
    throw new Error("step cannot be zero");
  }

  if (step > 0 && min > max) {
    return [];
  }

  if (step < 0 && min < max) {
    return [];
  }

  const result = [];
  let current = min;

  while ((step > 0 && current <= max) || (step < 0 && current >= max)) {
    result.push(current);
    current += step;
  }

  return result;
};


module.exports = { isFive, isOdd, myRange };