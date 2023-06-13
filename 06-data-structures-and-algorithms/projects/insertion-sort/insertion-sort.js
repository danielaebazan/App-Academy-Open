// Insertion Sort out-of-place
// Do not modify the original array;

/*
Pseudocode:

Copy the original array
Create an array to store the sorted values
While the array is not empty:
- make sure you have a console.log(sorted.join(',')) as your first line in the while loop
- Pop a value from the array
- Create a new spot at the end of the array with null to help with comparisons
- Walk through the sorted array in reverse order
- Check if the value to the left is smaller than the new value
- If so, you've reached the insertion point so exit the loop
- If not shift the value to the right by 1 and continue
- Insert the unsorted value at the break point
Return the sorted array
*/
function insertionSort(arr) {
  let originalArr = arr.slice();
  let sorted = [];

  while (originalArr.length > 0) {
    console.log(sorted.join(','));
    let currentElement = originalArr.pop();
    sorted.push(null);

    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i - 1] <= currentElement || i === 0) {
        sorted[i] = currentElement;
        break;
      } else {
        [sorted[i - 1], sorted[i]] = [sorted[i], sorted[i - 1]];
      }
    }
  }
  return sorted;
};

// In-place Insertion Sort
// Mutates the original array;
/*
  Pseudocode:

  Set a pointer dividing the array into sorted and unsorted halves
  Repeat while the unsorted half is not empty:
  - make sure you have a console.log(sorted.join(',')) as your first line in the while loop
  - Grab the first value from the unsorted half
  - For each value starting from the divider,
  - Check if the value to the left is smaller than the unsorted value
  - If so, you've reached the insertion point so exit the loop
  - If not shift the value to the right by 1 and continue
  - Insert the unsorted value at the break point
  - Increment the dividing pointer and repeat
  Return the mutated array
  */

function insertionSortInPlace(arr) {
  let divider = 1; // Set the initial divider to 1

  while (divider < arr.length) {
    console.log(arr.join(',')); // Print the sorted part of the array

    const value = arr[divider]; // Grab the value from the unsorted half

    let i = divider - 1;
    while (i >= 0 && arr[i] > value) {
      arr[i + 1] = arr[i]; // Shift the value to the right
      i--;
    }

    arr[i + 1] = value; // Insert the unsorted value at the break point

    divider++; // Increment the dividing pointer
  }

  console.log(arr.join(',')); // Print the final sorted array

  return arr; // Return the mutated array
}


module.exports = [insertionSort, insertionSortInPlace];