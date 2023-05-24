//Binary to base 10

// 1. 0b1010
/*
2 ^ 0 * 0  = 0
2 ^ 1 * 1  = 2
2 ^ 2 * 0  = 0
2 ^ 3 * 1  = 8
0 + 2 + 0 + 8 = 10
*/

//2. 0b0011
const binaryToDecimal = binary => parseInt(binary, 10);

console.log(binaryToDecimal(0b0011)); // 3

// Binary to hexadecimal
const binaryToHexadecimal = binary => parseInt(binary, 16);

console.log(binaryToHexadecimal(0b1010)); // 16
console.log(binaryToHexadecimal(0b0011)); // 3

//Hexadecimal to base 10

const hexadecimalToBase10 = hex => parseInt(hex, 10);

console.log(hexadecimalToBase10(0xa1)); // 161
console.log(hexadecimalToBase10(0xff)); // 255

//Hexadecimal to binary

const hexadecimalToBinary = hex => '0b' + ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);

console.log(hexadecimalToBinary(0xa1)); // 0b01100001
console.log(hexadecimalToBinary(0xff)); // 0b01010101


// Base 10 to binary

function decimalToBinary(decimal) {
    return decimal.toString(2);
}

console.log(decimalToBinary(8)); // 0b1000
console.log(decimalToBinary(24)); // 0b11000
console.log(decimalToBinary(255)); // 0b11111111


//Base 10 to hexadecimal

function decimalToHexadecimal(decimal) {
    return decimal.toString(16);
}

console.log(decimalToHexadecimal(8)); // 8
console.log(decimalToHexadecimal(24)); // 18
console.log(decimalToHexadecimal(255)); // ff

//Base 10 to ASCII
function decimalToASCII(decimal) {
    return String.fromCharCode(decimal);
}

console.log(decimalToASCII(65)); // A
console.log(decimalToASCII(66)); // B
console.log(decimalToASCII(97)); // a
console.log(decimalToASCII(98)); // b

// Hexadecimal to ASCII
function hexadecimalToASCII(hex) {
    const decimal = parseInt(hex);
    return String.fromCharCode(decimal);
}

console.log(hexadecimalToASCII('0x41')); // A
console.log(hexadecimalToASCII('0x42')); // B
console.log(hexadecimalToASCII('0x61')); // a
console.log(hexadecimalToASCII('0x62')); // b


// Binary to ASCII
function binaryToASCII(binary) {
    const decimal = parseInt(binary, 2);
    return String.fromCharCode(decimal);
}

console.log(binaryToASCII('0b01000001')); // A
console.log(binaryToASCII('0b01000010')); // B
console.log(binaryToASCII('0b01100001')); // a
console.log(binaryToASCII('0b01100010')); // b
