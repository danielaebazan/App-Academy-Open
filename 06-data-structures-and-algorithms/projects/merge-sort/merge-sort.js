// Merge Sort out-of-place
// Do not modify the original array;
// Check if the input is length 1 or less
    // If so, it's already sorted: return

  // Divide the array in half

  // Recursively sort the left half
  // Recursively sort the right half

  // Merge the halves together and return;

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let midPoint = Math.ceil(arr.length / 2);
  let firstHalf = arr.slice(0, midPoint);
  let secondHalf = arr.slice(midPoint);

  let firstHalfSorted = mergeSort(firstHalf);
  let secondHalfSorted = mergeSort(secondHalf);

  return merge(firstHalfSorted, secondHalfSorted)

};

// Takes in two sorted arrays and returns them merged into one;
// Create an empty return array

  // Point to the first value of each array
  // While there are still values in each array...
    // Compare the first values of each array
    // Add the smaller value to the return array
    // Move the pointer to the next value in that array

  // Return the return array
function merge(arrA, arrB) {
  let merged = [];

  while (arrA.length > 0 && arrB.length > 0) {
    if (arrA[0] > arrB[0]) {
      merged.push(arrB.shift());
    } else {
      merged.push(arrA.shift());
    }
  }
 
  merged = merged.concat(arrA).concat(arrB);
  return merged;
};


module.exports = [merge, mergeSort];

