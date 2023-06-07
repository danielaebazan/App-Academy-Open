// 1.

let logBetween = function(lowNum, highNum) {
    let arr = [];
    for (let i = lowNum; i <= highNum; i++) {
        arr.push(i);
    };
    return console.log(arr);
};

/*
logBetween(-1, 2);  // => [-1, 0, 1, 2]
logBetween(14, 6);  // => []
logBetween(4, 6);  // => [4, 5, 6]
*/

// 2.

let logBetweenStepper = function(min, max, step) {
    let arr = [];
    for(let i = min; i <= max; i += step) {
        arr.push(i);    
    };
    return console.log(arr);
};

/*
logBetweenStepper(5, 9, 1) // => [5, 6, 7, 8, 9]
logBetweenStepper(-10, 15, 5) // => [-10, -5, 0, 5, 10, 15]
*/

// 3.

let printReverse = function(min, max) {
    let arr = [];
    for (let i = max-1; i > min; i--) {
        arr.push(i);
    }
    console.log(arr);
};

/*
printReverse(13, 18) // => [17, 16, 15, 14]
printReverse(90, 94) // => [93, 92, 91]
*/

// 4.

let fizzBuzz = function (max) {
    let arr = [];
    for (let i = 0; i < max; i++) {
        if ( i % 5 === 0 && i % 3 !== 0 || i % 5 !== 0 && i % 3 === 0) {
            arr.push(i);
        }
    }
    return console.log(arr);
};

 // fizzBuzz(20); // => [3, 5, 6, 9, 10, 12, 18]

// 5.

let isPrime = function (number) {
    if (number < 2) {
        return false;
    }

    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false
        }
    }
    return true;
}

/*
isPrime(2);  // => true
isPrime(10);  // => false
isPrime(11);  // => true
isPrime(9);  // => false
isPrime(2017);  // => true
*/

// 6.

let maxValue = function (array) {
    if (array.length === 0) {
         console.log('null')
         return;
    };

    let max = 0
    for (let i = 0; i < array.length; i++)
    if (array[i] > max) {
        max = array[i];
    }
    return console.log(max);
}

/*
maxValue([12, 6, 43, 2]);  // => 43
maxValue([]);  // => null
maxValue([-4, -10, 0.43]);  // => 0.43
*/

// 7.

let myIndexOf = function (array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return i;
        }
    }
    return -1;
};

/*
console.log(myIndexOf([1, 2, 3, 4], 4)); // => 3
console.log(myIndexOf([5, 6, 7, 8], 2)); // => -1
*/

// 8.

let factorArray = function (array, number) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
        if (number % array[i] === 0 ) {
            arr.push(array[i]);
        }
    }
    return console.log(arr);
};

/*
factorArray([2, 3, 4, 5, 6], 20) // => [2,4,5]
factorArray([2, 3, 4, 5, 6], 35) // => [5]
factorArray([10, 15, 20, 25], 5) // => []
*/

// 9. 

let oddRange = function (end) {
    let arr = [];

    for (let i = 0; i <= end; i++) {
        if (i % 2 !== 0) {
            arr.push(i);
        }
    }
    return console.log(arr);
};

/*
oddRange(13);  // => [ 1, 3, 5, 7, 9, 11, 13 ]
oddRange(6);  // => [ 1, 3, 5 ]
*/

// 10.

let reverseHyphenString = function (string) {
    let sentence = string.split('-');
    let newArr = [];
    for (let i = 0; i < sentence.length; i++) {
        newArr.unshift(sentence[i]);
    }
    return newArr.join('-')
};

/*
console.log(reverseHyphenString("Go-to-the-store")); // => "store-the-to-Go"
console.log(reverseHyphenString("Jump,-jump-for-joy")); // => "joy-for-jump-Jump,"
*/

// 11.

let intersect = function (arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            newArr.push(arr1[i]);
        }
    }
    return console.log(newArr);
};

/*
intersect(['a', 'b', 'c', 'd'], ['b', 'd', 'e']) // => [ 'b', 'd' ]
intersect(['a', 'b', 'c'], ['x', 'y', 'z']) // => []
*/

// 12.

let mirrorArray = function (array) {
    let revArr = [];
    for (let i = 0; i < array.length; i++) {
        revArr.unshift(array[i])
    }
    return console.log(array.concat(revArr));
};

/*
mirrorArray([1, 2, 3]);
  // => [ 1, 2, 3, 3, 2, 1 ]
mirrorArray(['a', 'b', 'c', 'd']);
  // => [ 'a', 'b', 'c', 'd', 'd', 'c', 'b', 'a' ]
*/

// 13.

let abbreviate = function (sentence) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const words = sentence.split(' ')

    for (let i = 0; i < words.length; i++) {
        if ( words[i].length > 4 ) {
            let abbreviatedWord = '';
            for (let j = 0; j < words[i].length; j++) {
                if (!vowels.includes(words[i][j])) {
                    abbreviatedWord += words[i][j];
                }
            }
            words[i] = abbreviatedWord
        }
    }
    return console.log(words.join(' '));
};

    
/*
abbreviate('the bootcamp is fun'); // => 'the btcmp is fun'
abbreviate('programming is fantastic'); // => 'prgrmmng is fntstc'
abbreviate('hello world'); // => 'hll wrld'
abbreviate('how are you'); // => 'how are you'
*/

// 14.

let adults = function (people) {
    let adultNames = [];

    for (let i = 0; i < people.length; i++) {
        if (people[i].age >= 18) {
            adultNames.push(people[i].name);
        }
    }
    return console.log(adultNames);
};

/*
const ppl = [
    { name: 'John', age: 20 },
    { name: 'Jim', age: 13 },
    { name: 'Jane', age: 18 },
    { name: 'Bob', age: 7 }
];

adults(ppl); // => [ 'John', 'Jane' ]
*/

// 15.

let countScores = function (people) {
    let scoreCount = {};

    for (let i = 0; i < people.length; i++) {
        let name = people[i].name;
        let score = people[i].score;

        if (scoreCount[name] === undefined) {
            scoreCount[name] = score;
        } else {
            scoreCount[name] += score;
        }
    }
    return console.log(scoreCount);
}

/*
// Example 1:
const ppl = [
    { name: "Anthony", score: 10 },
    { name: "Fred", score: 10 },
    { name: "Anthony", score: -8 },
    { name: "Winnie", score: 12 }
];
countScores(ppl); // => { Anthony: 2, Fred: 10, Winnie: 12 }

// Example 2
const peeps = [
    { name: "Anthony", score: 2 },
    { name: "Winnie", score: 2 },
    { name: "Fred", score: 2 },
    { name: "Winnie", score: 2 },
    { name: "Fred", score: 2 },
    { name: "Anthony", score: 2 },
    { name: "Winnie", score: 2 }
];

countScores(peeps); // => { Anthony: 4, Fred: 4, Winnie: 6 }
*/

// 16.

let firstNPrimes = function (n) {
    let arr = [];

    let i = 2;
    while (arr.length < n) {
        if (isPrime(i)) {
            arr.push(i);
        }
        i++;
    }
    return arr;
};

/*
firstNPrimes(0);  // => []
firstNPrimes(1);  // => [2]
firstNPrimes(4);  // => [2, 3, 5, 7
*/

// 17.

let peakFinder = function (array) {
    let peaks = [];

    for (let i = 0; i <= array.length; i++) {
        if (
            (i === 0 && array[i] > array[i + 1]) ||
            (i === array.length - 1 && array[i] > array[i - 1]) ||
            (array[i] > array[i - 1] && array[i] > array[i + 1])
        ) {
            peaks.push(i);
        }
    }

    return peaks;
};

/*
console.log(peakFinder([1, 2, 3, 2, 1])); // => [2]
console.log(peakFinder([2, 1, 2, 3, 4, 5])); // => [0, 5]
console.log(peakFinder([4, 6, 9, 4, 2, -7, 2, -4, 5])); // => [2, 6, 8]
*/

// 18.

let divisibleByThreePairSum = function (array) {
    let pairs = [] ;

    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if ((array[i] + array[j]) % 3 === 0) {
                pairs.push([i, j]);
            }
        }
    }
    return pairs;
};

/*
const arr1 = divisibleByThreePairSum([1, 6, 3, 4, 2, 0]);
console.log(arr1) // => [[0, 4], [1, 2], [1, 5], [2, 5], [3, 4]]

const arr2 = divisibleByThreePairSum([8, 3, 5, 9, 2]);
console.log(arr2) // => [[1, 3]]
*/

// 19. 

let zipArray = function (arr1, arr2) {
    let pairs = [];

    for (let i = 0; i < arr1.length; i++) {
            let pair = [arr1[i], arr2[i]];
            pairs.push(pair);
    }
    return pairs;
};

/*
const a1 = ['a', 'b', 'c', 'd'];
const a2 = [10, 20, 30, 40];

const result = zipArray(a1, a2);
console.log(result); // => [ [ 'a', 10 ], [ 'b', 20 ], [ 'c', 30 ], [ 'd', 40 ] ]
*/

// 20.

let twoDimensionalTotal = function (array) {
    let total = 0;

    for (let i = 0; i < array.length; i++) {
        let row = array[i];
        for (let j = 0; j < row.length; j++) {
            total += row[j]
        }
    }
    return total;
};

/*
const arr1 = [
    [5, 2, 5, 3],
    [12, 13],
];

console.log(twoDimensionalTotal(arr1));  // => 40

const arr2 = [
    [2],
    [1, 9],
    [1, 1, 1]
]

console.log(twoDimensionalTotal(arr2));  // => 15
*/

// 21.

let countInnerElement = function (arr) {
    let count = {};

    for (let i = 0; i < arr.length; i++) {
        let subArr = arr[i];

        for (let j = 0; j < subArr.length; j++) {
            let element = subArr[j];
            if (count[element]) {
                count[element]++;
            } else {
                count[element] = 1;
            }
        }
    }
    return count;
};

/*
const arr1 = [
    [1, 2, 4, 5],
    [2, 7, 4],
    [1, 4, 5, 2, 7]
]

console.log(countInnerElement(arr1))  // => {1: 2, 2: 3, 4: 3, 5: 2, 7: 2}

const arr2 = [
    ['a', 'b', 'c', 'd'],
    ['a', 'b'],
    ['a', 'c', 'd', 'a']
]

console.log(countInnerElement(arr2))  // => {a: 4, b: 2, c: 2, d: 2}
*/

// 22.

let twoDiff = function (array) {
    let arr = [];

    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (((array[i] - array[j]) === 2) || ((array[i] - array[j]) === -2)) {
                let pairs = [i,j];
                arr.push([pairs]);
            }
        }
    }
    return arr;
};

/*
console.log(twoDiff([2, 3, 4, 6, 1, 7]))  // => [[0, 2], [1, 4], [2, 3]]
console.log(twoDiff([0, 2, 4, 3, 5]))  // => [[0, 1], [1, 2], [3,4]]
console.log(twoDiff([]))  // => []
*/

// 23.

let arrayDiff = function (arr1, arr2) {
    let arr = [];

    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
            arr.push(arr1[i]);
        } 
    }
    return arr;
};

/*
const array1 = [1, 23, 2, 43, 3, 4]
const array2 = [3, 23]
console.log(arrayDiff(array1, array2))  // => [1, 2, 43 ,4]

const array3 = ['a', 'ab', 'c', 'd', 'c']
const array4 = ['d']
console.log(arrayDiff(array3, array4))  // => ['a', 'ab', 'c', 'c']
*/

// 24. 

let valueCounter = function (obj, val) {
    let counter = 0;
    for (let key in obj) {
        if (obj[key] === val) {
            counter++
        }
    }
    return counter;
};

/*
const obj1 = { 1: 'Anne', 2: 'Alvin', 3: 'Anne', 4: 'Anne' }
console.log(valueCounter(obj1, 'Anne'))  // => 3

const obj2 = { Anne: 50, Alvin: 1, JJ: 100, Roman: 100 }
console.log(valueCounter(obj2, 88))  // => 0

const pairs = { Anne: 'Roman', Alvin: 'Roman', JJ: 'Anne', Roman: 'Anne' }
console.log(valueCounter(pairs, 'Roman'))  // => 2
*/

// 25.

let elementCount = function (array) {
    let obj = {};

    for (let i = 0; i < array.length; i++) {
        if (obj[array[i]] === undefined) {
            obj[array[i]] = 0;
        }
        obj[array[i]]++;
    }
    return obj;
};

/*
console.log(elementCount(["a", "a", "b", "b"])); // => { "a" : 2, "b" : 2 }
console.log(elementCount(['c', 'a', 'c', 'a', 'b'])); // => { "c": 2, "a": 2, "b": 1 }
*/

// 26.

let nextTwoPrimes = function (num) {
    let primes = []

    let i = num + 1;
    while(primes.length < 2) {
        if (isPrime(i)) {
            primes.push(i)
        }
        i++
    }
    return primes;
};

/*
console.log(nextTwoPrimes(2));  // => [ 3, 5 ]
console.log(nextTwoPrimes(3));  // => [ 5, 7 ]
console.log(nextTwoPrimes(7));  // => [ 11, 13 ]
console.log(nextTwoPrimes(8));  // => [ 11, 13 ]
console.log(nextTwoPrimes(20));  // => [ 23, 29 ]
console.log(nextTwoPrimes(97));  // => [ 101, 103 ]
*/

// 27.

let pairProduct = function (arr, num) {
    let pairs = [];
    let i = 0;

    while ( i < arr.length) {
        let j = i + 1;

        while (j < arr.length) {
            if (arr[i] * arr[j] === num) {
                pairs.push([i,j])
            }
            j++
        }
        i++
    }
    return pairs;
};

/*
console.log(pairProduct([1, 2, 3, 4, 5], 4)); // => [ [ 0, 3 ] ]
console.log(pairProduct([1, 2, 3, 4, 5], 8)); // => [ [ 1, 3 ] ]
console.log(pairProduct([1, 2, 3, 12, 8], 24)); // => [ [ 1, 3 ], [ 2, 4 ] 
*/

// 28.

let twoDimensionalSize = function (array) {
    let count = 0;

    for (let i = 0; i < array.length; i++) {
        let subArr = array[i];

        for (let j = 0; j < subArr.length; j++) {
            count++;
        }
    }
    return count;
};

/*
const arr1 = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9]
];
console.log(twoDimensionalSize(arr1));  // => 9

const arr2 = [
    ['a'],
    ['b', 'c', 'd', 'e']
];
console.log(twoDimensionalSize(arr2));  // => 5
*/

// 29. 

let longWordCount = function (string) {
    let counter = 0;
    let arr = string.split(' ');

    for (let i = 0; i < arr.length; i++) {
        let word = arr[i];
        if (word.length > 7) {
            counter++;
        }
    }
    return counter;
}

/*
console.log(longWordCount(""));  // => 0
console.log(longWordCount("short words only"));  // => 0
console.log(longWordCount("one reallylong word"));  // => 1
console.log(longWordCount("two reallylong words inthisstring"));  // => 2
console.log(longWordCount("allwordword longwordword wordswordword"));  // => 3
console.log(longWordCount("seventy schfifty five"));  // => 1
*/

// 30.

let factorial = function (n) {
    if (n === 0 || n === 1) {
        return 1;
    }

    let result = 1;
    let i = 2;

    while (i <= n) {
        result *= i;
        i++;
    }

    return result;
}

/*
console.log(factorial(1));  // => 1
console.log(factorial(4));  // => 24
console.log(factorial(5));  // => 120
console.log(factorial(10));  // => 3628800
*/

// 31.

function lcm(num1, num2) {
    const gcd = calculateGCD(num1, num2);
    return (num1 * num2) / gcd;
}

function calculateGCD(a, b) {
    if (b === 0) {
        return a;
    }

    return calculateGCD(b, a % b);
}

/*
console.log(lcm(2, 3));     // => 6
console.log(lcm(6, 10));    // => 30
console.log(lcm(24, 26));   // => 312
*/

// 32.

function hipsterfyWord(word) {
    const vowels = 'aeiouAEIOU';
    let lastVowelIndex = -1;

    for (let i = word.length - 1; i >= 0; i--) {
        if (vowels.includes(word[i])) {
            lastVowelIndex = i;
            break;
        }
    }

    if (lastVowelIndex === -1) {
        return word; // No vowels found, return the original word
    }

    return word.slice(0, lastVowelIndex) + word.slice(lastVowelIndex + 1);
}

/*

console.log(hipsterfyWord('proper'));      // => 'propr'
console.log(hipsterfyWord('tonic'));       // => 'tonc'
console.log(hipsterfyWord('PANTHER'));     // => 'PANTHR'
console.log(hipsterfyWord('BACKWARDS'));   // => 'BACKWRDS'
*/

// 33.

function hipsterfy(sentence) {
    const words = sentence.split(' ');
    const hipsterfiedWords = [];

    for (let i = 0; i < words.length; i++) {
        const hipsterfiedWord = hipsterfyWord(words[i]);
        hipsterfiedWords.push(hipsterfiedWord);
    }

    return hipsterfiedWords.join(' ');
};

/*
console.log(hipsterfy("proper"));                     // => "propr"
console.log(hipsterfy("proper tonic panther"));       // => "propr tonc panthr"
console.log(hipsterfy("towel flicker banana"));       // => "towl flickr banan"
console.log(hipsterfy("runner anaconda"));            // => "runnr anacond"
console.log(hipsterfy("turtle cheeseburger fries"));  // => "turtl cheeseburgr fris"
*/

// 34.

function objectToString(count) {
    let result = '';

    for (const char in count) {
        const countValue = count[char];
        result += char.repeat(countValue);
    }

    return result;
}

/*
console.log(objectToString({ a: 2, b: 4, c: 1 }));  // => 'aabbbbc'
console.log(objectToString({ b: 1, o: 2, t: 1 }));  // => 'boot'
*/

// 35. 

let shortestWord = function (sentence) {
    let words = sentence.split(' ')
    let shortest = words[0]

    for (let i = 1; i < words.length; i++) {
        if (words[i].length < shortest.length) {
            shortest = words[i]
        }
    }
    return shortest;
};

/*
console.log(shortestWord('app academy is cool')) // => 'is'
console.log(shortestWord('programming bootcamp')) // => 'bootcamp'
*/

// 36.

function greatestCommonFactor(num1, num2) {
    while (num2 !== 0) {
        let temp = num2;
        num2 = num1 % num2;
        num1 = temp;
    }

    return num1;
}

/*
console.log(greatestCommonFactor(15, 25));  // => 5
console.log(greatestCommonFactor(16, 24));  // => 8
console.log(greatestCommonFactor(7, 11));   // => 1
*/

// 37.

function isPassing(assessments) {
    let sum = 0;

    for (let i = 0; i < assessments.length; i++) {
        sum += assessments[i].score;
    }

    const average = sum / assessments.length;

    return average >= 70;
}

/*
const assessments1 = [
    { number: 1, score: 60 },
    { number: 2, score: 90 },
    { number: 3, score: 80 },
    { number: 4, score: 100 },
    { number: 5, score: 85 }
];

console.log(isPassing(assessments1));  // => true

const assessments2 = [
    { number: 1, score: 60 },
    { number: 2, score: 20 },
    { number: 3, score: 45 }
];

console.log(isPassing(assessments2));  // => false
*/

// 38.

function valueConcat(array, obj) {
    return array.map(element => {
        if (obj.hasOwnProperty(element)) {
            return element + obj[element];
        } else {
            return element;
        }
    });
}

/*
const arr1 = ['alex', 'maurice', 'meagan', 'ali'];
const obj1 = { alex: 'bronca', ali: 'harris' };
console.log(valueConcat(arr1, obj1));  // => [ 'alexbronca', 'maurice', 'meagan', 'aliharris' ]

const arr2 = ['a', 'b', 'c'];
const obj2 = { b: 2, c: 3 };
console.log(valueConcat(arr2, obj2));  // => [ 'a', 'b2', 'c3' ]
*/

// 39. 

function threeInARow(arr) {
    for (let i = 0; i < arr.length - 2; i++) {
        if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
            return true;
        }
    }

    return false;
}

/*
console.log(threeInARow([4, 3, 7, 7, 7, 13, 8]));  // => true
console.log(threeInARow([10, 9, 20, 33, 3, 3]));  // => false
*/

// 40.

function variableNameify(words) {
    let variableName = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (i === 0) {
            variableName += word.toLowerCase();
        } else {
            variableName += word[0].toUpperCase() + word.slice(1).toLowerCase();
        }
    }

    return variableName;
}

/*
console.log(variableNameify(['is', 'prime']));  // => 'isPrime'
console.log(variableNameify(['remove', 'last', 'vowel']));  // => 'removeLastVowel'
console.log(variableNameify(['MaX', 'VALUE']));  // => 'maxValue'
*/

// 41.

function threeIncreasing(arr) {
    for (let i = 0; i < arr.length - 2; i++) {
        if (arr[i] + 1 === arr[i + 1] && arr[i + 1] + 1 === arr[i + 2]) {
            return true;
        }
    }

    return false;
}

/*
console.log(threeIncreasing([3, 2, 11, 12, 13, 2, 4]));  // => true
console.log(threeIncreasing([7, 2, 4, 5, 2, 1, 6]));  // => false
*/

// 42.

function reverse2D(array) {
    // Flatten the 2D array into a single array
    const flattened = array.flat();

    // Reverse the order of the elements in the array
    const reversed = flattened.reverse();

    // Join the elements of the array into a single string
    const result = reversed.join('');

    return result;
}

/*
const arr1 = [
    ['a', 'b', 'c', 'd'],
    ['e', 'f'],
    ['g', 'h', 'i']
];
console.log(reverse2D(arr1));  // => 'ihgfedcba'

const arr2 = [
    ['Julian', 'Matt', 'Mike'],
    ['Oscar', 'Patrick']
];
console.log(reverse2D(arr2));  // => 'PatrickOscarMikeMattJulian'
*/

// 43.

function reverb(word) {
    // Find the index of the last vowel
    let lastVowelIndex = -1;
    for (let i = word.length - 1; i >= 0; i--) {
        if (isVowel(word[i])) {
            lastVowelIndex = i;
            break;
        }
    }

    // Repeat characters after the last vowel
    let repeated = '';
    for (let i = lastVowelIndex + 1; i < word.length; i++) {
        repeated += word[i];
    }

    // Concatenate the repeated characters to the original word
    const result = word + repeated;
    return result;
}

function isVowel(char) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(char.toLowerCase());
}

/*
console.log(reverb('running'));  // => 'runninging'
console.log(reverb('wild'));  // => 'wildild'
console.log(reverb('debugged'));  // => 'debuggeded'
console.log(reverb('my'));  // => 'my'
*/

// 44.

function countRepeats(string) {
    const countObj = {};
    let count = 0;

    // Count the occurrences of each letter
    for (let i = 0; i < string.length; i++) {
        const char = string[i];
        if (countObj[char]) {
            countObj[char]++;
        } else {
            countObj[char] = 1;
        }
    }

    // Count the number of letters that appear more than once
    for (const char in countObj) {
        if (countObj[char] > 1) {
            count++;
        }
    }

    return count;
}

/*
console.log(countRepeats('calvin'));  // => 0
console.log(countRepeats('caaaalvin'));  // => 1
console.log(countRepeats('pops'));  // => 1
console.log(countRepeats('mississippi'));  // => 3
console.log(countRepeats('hellobootcampprep'));  // => 4
*/

// 45.

function pairsToString(arr) {
    let result = '';

    // Iterate through each pair
    for (let i = 0; i < arr.length; i++) {
        const pair = arr[i];
        const char = pair[0];
        const count = pair[1];

        // Append the character to the result string based on the count
        for (let j = 0; j < count; j++) {
            result += char;
        }
    }

    return result;
}

/*
const array1 = [
    ['a', 3],
    ['b', 1],
    ['c', 2]
];
console.log(pairsToString(array1));  // => 'aaabcc'

const array2 = [
    ['f', 1],
    ['o', 2],
    ['d', 1],
    ['!', 1]
];
console.log(pairsToString(array2));  // => 'food!'
*/

// 46.

function countAdjacentSums(arr, n) {
    let count = 0;

    // Iterate through the array up to the second-to-last element
    for (let i = 0; i < arr.length - 1; i++) {
        // Check if the sum of the current and next element is equal to n
        if (arr[i] + arr[i + 1] === n) {
            count++;
        }
    }

    return count;
}

/*
console.log(countAdjacentSums([1, 5, 1], 6)); // => 2
console.log(countAdjacentSums([7, 2, 4, 6], 7)); // => 0
console.log(countAdjacentSums([6, 7, 11, 2, 5, 10, 3], 13)); // => 3
*/

// 47.

function signFlipCount(nums) {
    let count = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        if ((nums[i] > 0 && nums[i + 1] < 0) || (nums[i] < 0 && nums[i + 1] > 0)) {
            count++;
        }
    }
    return count;
}

/*
console.log(signFlipCount([5, 6, 10, 3])); // => 0
console.log(signFlipCount([-12, 0, -3, -5])); // => 0
console.log(signFlipCount([-12, 10, -3, -5])); // => 2
console.log(signFlipCount([1, -2, -3, -4])); // => 1
console.log(signFlipCount([-1, 11.3, -3, 100])); // => 3
*/

// 48.

let powerSequence = function (base, length) {
    let arr = [base,];

    let i = 0;
    while (arr.length < length) {
        arr.push(arr[i] * base)
        i++
    }
    return arr;
};

/*
console.log(powerSequence(3, 4));  // => [ 3, 9, 27, 81 ]
console.log(powerSequence(2, 6));  // => [ 2, 4, 8, 16, 32, 64 ]
console.log(powerSequence(8, 3));  // => [ 8, 64, 512 ]
*/

// 49.

function collapseString(str) {
    let collapsedString = "";
    let prevChar = "";
    for (let char of str) {
        if (char === prevChar) {
            continue;
        }
        collapsedString += char;
        prevChar = char;
    }
    return collapsedString;
}

/*
console.log(collapseString('apple')); // => 'aple'
console.log(collapseString('AAAaalviiiiin!!!')); // => 'Aalvin!'
console.log(collapseString('hello   app academy')); // => 'helo ap academy'
*/

// 50.

let oddWordsOut = function (sentence) {
    let words = sentence.split(' ')
    let arr = [];

    for (let i = 0; i < words.length; i++ ) {
        if (words[i].length % 2 === 0 ) {
            arr.push(words[i])
        }
    }
    return arr.join(' ')
}

/*
console.log(oddWordsOut('go to the store and buy milk'));  // => 'go to milk'
console.log(oddWordsOut('what is the answer'));  // => 'what is answer'
*/

// 51.

function mindPsAndQs(str) {
    let longestStreak = 0;
    let currentStreak = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (char === 'P' || char === 'Q') {
            currentStreak++;
            if (currentStreak > longestStreak) {
                longestStreak = currentStreak;
            }
        } else {
            currentStreak = 0;
        }
    }
    return longestStreak;
}

/*
console.log(mindPsAndQs('BOOTCAMP'));  // Output: 1
console.log(mindPsAndQs('APCDQQPPC'));  // Output: 4
console.log(mindPsAndQs('PQPQ'));  // Output: 4
console.log(mindPsAndQs('PPPXQPPPQ'));  // Output: 5
*/

// 52.

function commonFactors(num1, num2) {
    const factors = [];
    const smallerNum = Math.min(num1, num2);

    for (let i = 1; i <= smallerNum; i++) {
        if (num1 % i === 0 && num2 % i === 0) {
            factors.push(i);
        }
    }

    return factors;
}

/*
console.log(commonFactors(12, 50));  // Output: [1, 2]
console.log(commonFactors(6, 24));  // Output: [1, 2, 3, 6]
console.log(commonFactors(11, 22));  // Output: [1, 11]
console.log(commonFactors(45, 60));  // Output: [1, 3, 5, 15]
*/

// 53.

function commonPrimeFactors(num1, num2) {
    function getPrimeFactors(num) {
        const factors = [];
        let divisor = 2;

        while (num > 2) {
            if (num % divisor === 0) {
                factors.push(divisor);
                num /= divisor;
            } else {
                divisor++;
            }
        }

        return factors;
    }

    const factors1 = getPrimeFactors(num1);
    const factors2 = getPrimeFactors(num2);

    const commonFactors = [];

    for (const factor of factors1) {
        if (factors2.includes(factor)) {
            commonFactors.push(factor);
            factors2.splice(factors2.indexOf(factor), 1); // Remove the factor from factors2 to handle duplicates
        }
    }

    return commonFactors;
}

/*
console.log(commonPrimeFactors(12, 50));
// Output: [ 2 ]

console.log(commonPrimeFactors(6, 24));
// Output: [ 2, 3 ]

console.log(commonPrimeFactors(11, 22));
// Output: [ 11 ]

console.log(commonPrimeFactors(45, 60));
// Output: [ 3, 5 ]
*/

// 54.
function splitHalfArray(array) {
    const length = array.length;
    const middleIndex = Math.floor(length / 2);

    if (length % 2 === 0) {
        // Array has an even number of elements
        return [array.slice(0, middleIndex), array.slice(middleIndex)];
    } else {
        // Array has an odd number of elements
        return [array.slice(0, middleIndex), array.slice(middleIndex + 1)];
    }
}

/*
console.log(splitHalfArray([1, 2, 3, 4, 5]));
// Output: [ [ 1, 2 ], [ 4, 5 ] ]

console.log(splitHalfArray(['a', 'b', 'c', 'd', 'e', 'f']));
// Output: [ [ 'a', 'b', 'c' ], [ 'd', 'e', 'f' ] ]
*/

// 55.

function threeUniqueVowels(string) {
    const VOWELS = ['a', 'e', 'i', 'o', 'u'];
    const uniqueVowels = [];

    for (const char of string) {
        if (VOWELS.includes(char) && !uniqueVowels.includes(char)) {
            uniqueVowels.push(char);

            if (uniqueVowels.length === 3) {
                return true;
            }
        }
    }

    return false;
}
/*
console.log(threeUniqueVowels('delicious'));  // => true
console.log(threeUniqueVowels('the bootcamp'));  // => true
console.log(threeUniqueVowels('bootcamp'));  // => false
console.log(threeUniqueVowels('dog'));  // => false
console.log(threeUniqueVowels('go home'));  // => false
*/

// 56.
function vowelShift(sentence) {
    const VOWELS = ['a', 'e', 'i', 'o', 'u'];
    let newSentence = '';

    for (const char of sentence) {
        if (VOWELS.includes(char)) {
            const currentIndex = VOWELS.indexOf(char);
            const nextIndex = (currentIndex + 1) % VOWELS.length;
            newSentence += VOWELS[nextIndex];
        } else {
            newSentence += char;
        }
    }

    return newSentence;
}
/*
console.log(vowelShift('bootcamp')); // Output: 'buutcemp'
console.log(vowelShift('hello world')); // Output: 'hillu wurld'
console.log(vowelShift('on the hunt')); // Output: 'un thi hant'
*/

// 57.

function hasSymmetry(array) {
    const length = array.length;

    for (let i = 0; i < length / 2; i++) {
        if (array[i] !== array[length - 1 - i]) {
            return false;
        }
    }

    return true;
}

/*
console.log(hasSymmetry([1, 2, 3, 3, 2, 1])); // Output: true
console.log(hasSymmetry([1, 2, 3, 3, 4, 1])); // Output: false
console.log(hasSymmetry(['cat', 'dog', 'bird', 'dog', 'cat'])); // Output: true
console.log(hasSymmetry(['cat', 'dog', 'bird', 'bird', 'cat'])); // Output: false
*/

// 58.

function evenSumArray(array) {
    const result = [];

    for (const num of array) {
        let sum = 0;

        for (let i = 2; i <= num; i += 2) {
            sum += i;
        }

        result.push(sum);
    }

    return result;
}

/*
console.log(evenSumArray([6, 7, 5])); // Output: [ 12, 12, 6 ]
console.log(evenSumArray([2, 8, 3, 5])); // Output: [ 2, 20, 2, 6 ]
*/

// 59. 

function numsToWords(numString) {
    const digitToWord = {
        '0': 'Zero',
        '1': 'One',
        '2': 'Two',
        '3': 'Three',
        '4': 'Four',
        '5': 'Five',
        '6': 'Six',
        '7': 'Seven',
        '8': 'Eight',
        '9': 'Nine',
    };

    let result = '';

    for (const digit of numString) {
        result += digitToWord[digit];
    }

    return result;
};

/*
console.log(numsToWords('42')); // Output: 'FourTwo'
console.log(numsToWords('123')); // Output: 'OneTwoThree'
console.log(numsToWords('159598')); // Output: 'OneFiveNineFiveNineEight'
*/

// 60.

function moreDotLessDash(str) {
    let dotCount = 0;
    let dashCount = 0;

    for (const char of str) {
        if (char === '.') {
            dotCount++;
        } else if (char === '-') {
            dashCount++;
        }
    }

    return dotCount > dashCount;
}

/*
console.log(moreDotLessDash('2-D arrays are fun. I think.')); // Output: true
console.log(moreDotLessDash('.-.-.')); // Output: true
console.log(moreDotLessDash('.-')); // Output: false
console.log(moreDotLessDash('..--')); // Output: false
*/