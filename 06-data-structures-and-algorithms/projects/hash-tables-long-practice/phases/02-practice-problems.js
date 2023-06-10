function anagrams(str1, str2) {
  return str1.split('').sort().join('') === str2.split('').sort().join('')
};


function commonElements(arr1, arr2) {
  if (arr1.length > arr2.length) {
    return arr1.filter(ele => arr2.includes(ele));
  } else {
    return arr2.filter(ele => arr1.includes(ele));
  }
};


function duplicate(arr) {
  for (let i = 0, found = {}; i < arr.length; i++) {
    let num = arr[i];
    if (found[num]) return num;
    found[num] = 1;
  }
  return false
};


function twoSum(nums, target) {
  for (let i = 0, found = {}; i < arr.length; i++) {
    let remainder = target - nums[i];
    if (remainder in found) {
      return true;
    } else {
      found[nums[i]] = remainder;
    }
  }
  return false;
};


function wordPattern(pattern, strings) {

  // loop through the pattern
  for (let i = 0, patternMap = {}, stringMap = {}; i < pattern.length; i++) {

    // bail if string doesn't match
    if (patternMap.hasOwnProperty(pattern[i])) {
      if (strings[i] !== patternMap[pattern[i]]) {
        return false;
      }
    }

    // bail if pattern doesn't match
    if (stringMap.hasOwnProperty(strings[i])) {
      if (stringMap[strings[i]] !== pattern[i]) {
        return false;
      }
    }

    // hash pattern and string
    patternMap[pattern[i]] = strings[i];
    stringMap[strings[i]] = pattern[i];
  }

  // if we never bailed, they matched
  return true;
};


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];