class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    const result = `Hi, I'm ${this.name}`;
    console.log(result);
    return result;
  }

  visit(other) {
    return `${this.name} visited ${other.name}`;
  }

  switchVisit(other) {
    return other.visit(this);
  }

  update(newPerson) {
    if (typeof newPerson !== 'object') {
      throw TypeError("Type must be an object");
    }
    if (!newPerson.hasOwnProperty("name")) {
      throw TypeError("Input must include a name property");
    }
    if (!newPerson.hasOwnProperty("age")) {
      throw TypeError("Input must include a age property");
    }
    this.name = newPerson.name;
    this.age = newPerson.age;
  }

  tryUpdate(newPerson) {
    try {
      this.update(newPerson);
    } catch (error) {
      return false;
    }
    return true;
  }
  
  static greetAll(people) {
    const result = [];
    for (let i = 0; i < people.length; i++) {
      result.push(people[i].sayHello());
    }
    return result;
  }
}
const person = new Person("Mai", 38);
const person2 = new Person("Erin", 42);
Person.greetAll([person, person2]);


module.exports = Person;