const classes = require("./../messages/say-message");
const sayMessage = classes.sayMessage;

function sayHelloTo(name) {
  sayMessage(`Hello ${name}!`)
}

sayHelloTo("Woody");

module.exports = { sayHelloTo };