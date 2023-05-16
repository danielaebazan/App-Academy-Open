class User {
  constructor(name) {
    this.name = name;
  }

  changeName = (newName) => {
    this.name = newName;
    return this.name;
  } 

 // or 1 line fat arrow:  changeName = newName => this.name = newName;
 
}

module.exports = User;