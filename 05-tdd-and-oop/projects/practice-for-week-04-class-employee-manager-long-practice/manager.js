const Employee = require('/Users/danielabazan/Documents/App-Academy/practice-for-week-04-class-employee-manager-long-practice/employee.js')

class Manager extends Employee {
    constructor(name, salary, title, manager = null, employees=[]) {
        super(name, salary, title, manager);
        this.employees = employees;
    }

addEmployee(employee) {
    this.employees.push(employee);
    };


    _totalSubSalary() {
        let sum = 0;
        for (let employee of this.employees) {
            if (employee instanceof Manager) {
                sum += employee.salary;
                sum += employee._totalSubSalary();
            } else if (employee instanceof Employee) {
                sum += employee.salary;
            }
        }
        return sum;
    }

    calculateBonus(multiplier) {
        return multiplier * (this.salary + this._totalSubSalary());
    }

};


module.exports = Manager;



