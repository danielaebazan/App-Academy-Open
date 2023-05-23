// O(n) Time
// O(1) Space
const findMinimum = arr => {
  let min = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i]
    }
  }
  return min;
};

// O(n) Time 
// O(n) Space
const runningSum = arr => {
  let sum = 0;
  return arr.map(num => {
    sum += num;
    return sum;
  });
};


// O(n) Time
// O(1) Space
const evenNumOfChars = arr => {
  let even = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length % 2 === 0) {
      even++
    };
  };
  return even;
};

// O(n^2) Time
// O(n) Space
const smallerThanCurr = arr => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        count++;
      }
    }
    result.push(count);
  }
  return result;
};


// O(n) Time
// O(n) Space
const twoSum = (arr, target) => {
  const numSet = new Set();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (numSet.has(complement)) {
      return true;
    }
    numSet.add(arr[i]);
  }
  return false;
};

// O(n^2) Time
// O(1) Space
const secondLargest = arr => {
  let largest = arr[0];
  let secondLargest = arr[1];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > secondLargest && arr[j] < largest) {
        secondLargest = arr[j];
      }
    }
  }
  return secondLargest;
};

// O(n) Time
// O(n) Space
const shuffle = arr => {
  const shuffledArr = [...arr]; // Create a new array to store the shuffled elements
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]]; // Swap the elements at indices i and j
  }
  return shuffledArr;
};


module.exports = [findMinimum, runningSum, evenNumOfChars, smallerThanCurr, twoSum, secondLargest, shuffle];