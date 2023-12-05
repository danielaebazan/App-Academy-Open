// configure environment - DO NOT MODIFY
require('dotenv').config();

// Import package

// Your code here
const jwt = require('jsonwebtoken');

// Define variables - DO NOT MODIFY
let token;
let payload;

// 1. Sign (create) a JWT containing your email address

// Your code here
payload = {email:'my@email.com'};
token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'});

// See the JWT in the console
console.log('JWT:', token);

// 2. Decode a JWT Payload

// Your code here
payload = jwt.decode(token)

// See the decoded payload in the console
console.log('Payload:', payload);

// 3. Verify a JWT

// Your code here
payload = jwt.verify(token, process.env.SECRET_KEY)

// See the verified payload in the console
console.log('Verified Payload:', payload, {expiresIn: '5m'});

// (Optional) Bonus: Catch Error With Invalid Signature
// Generate an alternate secret key and use it
//    To "try" to get the payload using jwt.verify
//    Then "catch" the error and log it to the console.

// Your code here
let token2 = jwt.sign(payload, 'second-key');

console.log('JWT:', token);
try{
    payload = jwt.verify(token2, 'not-key')
    console.log('still ok - bad');
} catch(err) {
    console.log('catched');
    console.log(err.message);
}
console.log('?????????????');
// (Optional) Bonus: Catch Error With Expired Token
// First, set the token's expiration (above) to 1 second
// Second, add a setTimeout longer than 1 second
//    To "try" to get the payload using jwt.verify (with proper secret)
//    Then "catch" the error and log it to the console

// Your code here
payload = {next:'next'} // need be an object to use options
let token3 = jwt.sign(payload, 'timed-key', {expiresIn: '1s'});
setTimeout(() => {
    console.log('JWT:-----delayed', token);
    try{
        payload = jwt.verify(token3, 'timed-key')
        console.log('still ok');
    } catch(err) {
        console.log('expired');
        console.log(err.message);
    }
}, 5000);

