const classes = require('./say-hello-to');
const sayHelloTo = classes.sayHelloTo;

function giveMessageToMrsPotato(message) {
  sayHelloTo("Mrs. Potato");
  console.log(`(Psst... ${message})`)
}

giveMessageToMrsPotato("Hi Buzz");

module.exports.giveMessageToMrsPotato = giveMessageToMrsPotato;