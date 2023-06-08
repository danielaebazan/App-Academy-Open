const classes = require("./hello-message");
const helloMessage = classes.helloMessage;


function sayMessage(message) {
  console.log(`"${message}"`)
}

sayMessage(helloMessage);

module.exports = { sayMessage };



