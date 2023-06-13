
function bubbleSort(arr) {
  let swaps = 0;
    // Iterate through the array
    for (let i = 0; i < arr.length; i++) {
      // If the current value is greater than its neighbor to the right
      if (arr[i] > arr[i+1]) {
        // Swap those values
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
        swaps++;
        // Do not move this console.log
        console.log(arr.join(","));
    };
  };
    // If you get to the end of the array and no swaps have occurred, return
        if (swaps === 0) {
          return arr;
          // Otherwise, repeat from the beginning
        } else {
          return bubbleSort(arr);
    };
};

module.exports = bubbleSort;