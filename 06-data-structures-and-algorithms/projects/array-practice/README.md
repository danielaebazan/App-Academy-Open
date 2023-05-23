# Array practice

Identify the time complexity of each of these functions with a 1 sentence
justification for your answer. Assume `arr` is an array of length _n_.

## `arr.push()`

Time complexity: O(1)
Space complexity: O(1)
Justification: adds an element to the end of the array, and its time and space complexity are constant regardless of the size of the array. 

[push on MDN][push]


## `arr.pop()`

Time complexity: O(1)
Space complexity: O(1)
Justification: removes an element from the end of the array, and its time and space complexity are constant regardless of the size of the array.

[pop on MDN][pop]

## `arr.shift()`

Time complexity: O(n)
Space complexity: O(1)
Justification: Removes the first element from the array and shifts all subsequent elements one position to the left. As a result, all remaining elements need to be shifted, which takes linear time proportional to the size of the array. The space complexity is O(1) because it does not require additional memory allocation that depends on the size of the array.

[shift on MDN][shift]

## `arr.unshift()`

Time complexity: O(n)
Space complexity: O(n)
Justification: all elements in the array need to be shifted, taking linear time proportional to the size of the array. The space complexity is O(n) because adding elements to the beginning of the array may require allocating additional memory to accommodate the new elements and shifting the existing elements.

[unshift on MDN][unshift]

## `arr.splice()`

Time complexity: O(n)
Space complexity: O(n)
Justification: allows for the insertion, removal, or replacement of elements in an array. The time complexity is O(n) because it may require shifting elements in the array to accommodate the changes. The worst-case scenario occurs when inserting or removing elements at the beginning of the array, as it requires shifting all subsequent elements. The space complexity is O(n) because the function may need to allocate additional memory to hold the resulting array with the modified elements.

[splice on MDN][splice]

## `arr.slice()`

Time complexity: O(n)
Space complexity: O(n)
Justification: returns a new array that contains a copy of a portion of the original array, specified by the provided start and end indices. The time complexity is O(n) because it needs to iterate over the selected portion of the array to create a copy. The space complexity is O(n) because it creates a new array with the copied elements, which requires allocating memory proportional to the size of the selected portion of the array.

[slice on MDN][slice]

## `arr.indexOf()`

Time complexity: O(n)
Space complexity: O(1)
Justification: searches for the first occurrence of a specified element in the array and returns its index. It iterates over the array elements in a linear manner until it finds a match or reaches the end of the array. Therefore, the time complexity is O(n) as the worst-case scenario occurs when the element being searched for is at the end of the array or not present at all. The space complexity is O(1) because the function does not require any additional memory allocation that depends on the size of the array; it only returns the index of the element

[indexOf on MDN][indexOf]

## `arr.map()`

Time complexity: O(n)
Space complexity: O(n)
Justification: applies a given transformation or operation to each element of the array and returns a new array with the transformed elements. It iterates over each element of the array once, performing the transformation operation. Therefore, the time complexity is O(n) as it scales linearly with the size of the array. The space complexity is O(n) because it creates a new array with the transformed elements, resulting in an output array of the same size as the input array.

[map on MDN][map]

## `arr.filter()`

Time complexity: O()
Space complexity: O(n)
Justification: creates a new array that contains all elements from the original array that pass a specified condition. It iterates over each element of the array once, evaluating the condition and adding the elements that satisfy the condition to the new array. Therefore, the time complexity is O(n) as it scales linearly with the size of the array. The space complexity is O(n) because it creates a new array to hold the filtered elements, which can be up to the same size as the original array if all elements pass the condition.

[filter on MDN][filter]

## `arr.reduce()`

Time complexity: O(n)
Space complexity: O(1)
Justification:  applies a given reducer function to each element of the array in a cumulative manner, reducing the array to a single value. It iterates over each element of the array once, invoking the reducer function. The time complexity is O(n) as it scales linearly with the size of the array. However, the space complexity is O(1) because it does not create any additional data structures that depend on the size of the array. The reduction operation accumulates the result in a single variable, without requiring extra memory allocation for intermediate arrays.

[reduce on MDN][reduce]

## `arr.reverse()`

Time complexity: O(n)
Space complexity: O(1)
Justification: everses the order of elements in the array by swapping them. It needs to iterate over half of the array to perform the swap operation. As a result, the time complexity is O(n), where n represents the number of elements in the array. The space complexity is O(1) because it performs the reversal in place without requiring additional memory allocation that depends on the size of the array.

[reverse on MDN][reverse]

## `[...arr]`

Time complexity: O(n)
Space complexity: O(n)
Justification: creates a new array by using the spread operator to copy the elements of the original array arr. It iterates over each element in arr once to make a copy of it, resulting in a new array of the same size as the original array. Therefore, the time complexity is O(n) as it scales linearly with the size of the array. The space complexity is also O(n) because it creates a new array with the copied elements, requiring memory allocation proportional to the size of the original array.

[spread on MDN][spread]

[push]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
[pop]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
[shift]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
[unshift]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
[splice]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
[slice]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[indexOf]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
[map]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[filter]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[reduce]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
[reverse]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
[spread]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax