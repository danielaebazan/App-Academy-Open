const Employee = require('/Users/danielabazan/Documents/App-Academy/practice-for-week-04-class-employee-manager-long-practice/employee.js')
const Manager = require('/Users/danielabazan/Documents/App-Academy/practice-for-week-04-class-employee-manager-long-practice/manager.js')

const hobbes = new Manager('Hobbes', 1000000, 'Founder');
const calvin = new Manager('Calvin', 130000, 'Director', hobbes,);
const susie = new Manager('Susie', 100000, 'TA Manager', calvin,);
const lily = new Employee('Lily', 90000, 'TA', susie);
const clifford = new Employee('Clifford', 90000, 'TA', susie);

console.log(hobbes.calculateBonus(0.05));
console.log(calvin.calculateBonus(0.05));
console.log(susie.calculateBonus(0.05));
console.log(lily.calculateBonus(0.05));
console.log(clifford.calculateBonus(0.05));


