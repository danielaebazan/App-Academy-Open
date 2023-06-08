class Employee {
    constructor(name, ocupation) {
        this.name = name;
        this.ocupation = ocupation
    };

    sayName() {
        console.log(`${this.name} says hello`)
    };

    sayOcupation() {
        console.log(`${this.name} is a ${this.ocupation}`)
    }
};

module.exports = Employee;