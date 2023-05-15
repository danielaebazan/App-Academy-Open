const Employee = require('/Users/danielabazan/Documents/App-Academy/practice-for-week-04-bind/employee.js')

const john = new Employee (
    'Jhon Wick',
    'Dog Lover',
);

setTimeout(john.sayName.bind(john), 2000);
setTimeout(john.sayOcupation.bind(john),3000)

