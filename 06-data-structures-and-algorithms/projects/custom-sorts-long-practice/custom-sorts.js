function ageSort(users) {
  return users.sort((a, b) => a.age - b.age);
}

function oddEvenSort(arr) {
  const odds = arr.filter(a => a % 2 !== 0).sort((a, b) => a - b);
  const evens = arr.filter(a => a % 2 === 0).sort((a, b) => a - b);
  return odds.concat(evens);
}

function validAnagrams(s, t) {
  return s.toLowerCase().split('').sort().join('') === t.toLowerCase().split('').sort().join('');
}

function reverseBaseSort(arr) {
  const base = input => input.toString().length;

  return arr.sort((a, b) => {
    if (base(a) > base(b)) return -1;
    return (base(a) < base(b)) ? 1 : a - b;
  });
}

function frequencySort(arr) {
  const frequencies = new Object();
  arr.forEach(value => frequencies[value] = (frequencies[value]) ? frequencies[value] + 1 : 1);
  return arr.sort((a, b) => frequencies[a] - frequencies[b] || b - a);
}

module.exports = [
  oddEvenSort,
  validAnagrams,
  reverseBaseSort,
  frequencySort,
  ageSort,
];