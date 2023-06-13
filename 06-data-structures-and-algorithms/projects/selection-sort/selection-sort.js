

function selectionSort(arr) {

  // Copy the original array
  let originalArr = arr.slice();

  // Create an array to store the sorted values
  let sorted = [];

  // While the array is not empty...
  while (originalArr.length > 0) {

    // Do not move this console.log
    console.log(sorted.join(","));

    // Find the index of the minimum value in the unsorted half
    let min = Math.min(...originalArr);
    let minIndex = originalArr.indexOf(min);

    // Save and remove the value at the min index
    let smallest = originalArr.splice(minIndex, 1);

    // Add the min value to the end of the sorted array
    sorted.push(...smallest);
  }
  return sorted
};

function selectionSortInPlace(arr) {

  // Set a pointer at zero diving the array into sorted and unsorted halves
  let divider = 0;

  // Repeat while the unsorted half is not empty:
  while (divider < arr.length) {

    // Do not move this console.log
    console.log(arr.join(","));

    // Find the index of the minimum value in the unsorted half
    let minIndex = divider;
    let min = arr[divider];
    for (let i = divider; i < arr.length; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i;
        // Save the min value
        min = arr[i]
      }
    }


    // Shift every unsorted value to the left of the min value to the right by 1
    for (let i = minIndex; i >= divider; i--) {
      arr[i] = arr[i - 1];
    }
    // Put the min value at the divider
    arr[divider] = min;
    // Increment the divider and repeat
    divider++;
  }
  return arr;
}


module.exports = [selectionSort, selectionSortInPlace];
