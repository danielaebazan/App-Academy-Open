let { Item } = require('/Users/danielabazan/Documents/adventure-starter/class/item.js')

class Food extends Item {
  constructor(name, description) {
    super (name, description);
    this.isFood = true;
  }
}


module.exports = {
  Food,
};
