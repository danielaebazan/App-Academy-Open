// Convert the integers in the console.logs below to base 10:

/******************************************************************************/

function convertToBase10(number) {
  let base = 10;
  if (number.startsWith('0b')) {
    number = number.slice(2);
    base = 2;
  } else if (number.startsWith('0x')) {
    number = number.slice(2);
    base = 16;
  }
  return parseInt(number, base);
}


/******************************************************************************/

console.log(convertToBase10('0b1100')); // 12
console.log(convertToBase10('0b0101')); // 5
console.log(convertToBase10('0b1000')); // 8
console.log(convertToBase10('0b0111')); // 7

console.log('––––––');

console.log(convertToBase10('0b10100101')); // 165
console.log(convertToBase10('0b11111111')); // 255
console.log(convertToBase10('0b01010101')); // 85
console.log(convertToBase10('0b00110011')); // 51

console.log('––––––');

console.log(convertToBase10('0xf')); // 15
console.log(convertToBase10('0xfa')); // 250
console.log(convertToBase10('0x1234')); // 4660
console.log(convertToBase10('0xc9a1')); // 51617
console.log(convertToBase10('0xbf12')); // 48914