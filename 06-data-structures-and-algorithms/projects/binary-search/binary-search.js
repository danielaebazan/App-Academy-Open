function linearSearch (arr, target) {
  return arr.indexOf(target)
};

function binarySearch(arr, target) {

  let lo = arr[0];              // Set integers pointing to the high and low range of possible indices
  let hi = arr[arr.length-1];

  while (lo <= hi) {                        // While high and low indices do not overlap...
   let mid = Math.floor((lo + hi) / 2)      // Find the midpoint between high and low indices
    if (target === arr[mid]) {              // Compare the target value to the midpoint value
     return mid                                 // If the target equals the midpoint...
      } else if                                  // Return the midpoint index
       (target > arr[mid]) {                    // If the target is higher than the midpoint...
         lo = mid + 1                              // Move the low pointer to midpoint + 1
       } else if                     
       (target < arr[mid]) {                       // If the target is less than the midpoint...
          hi = mid - 1                               // Move the high pointer to midpoint - 1
       }
    }                   
     return -1                                  // Return -1 if the loop exits with overlapping pointers
}


module.exports = [linearSearch, binarySearch]