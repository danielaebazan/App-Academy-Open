const Calculator = require('/Users/danielabazan/Documents/App-Academy/practice-for-week-04-context-long-practice/problems/02-calculator.js')

class FancyCalculator extends Calculator {
	constructor(total = 0) {
		super (total);
	};

	setTotal = (newTotal) => this.total = newTotal;

	modulo = (num) => this.total = this.total % num;

	squared = () => this.total = this.total * this.total;
};
/*****************************************************************************/
/***************** DO NOT MODIFY ANYTHING UNDER THIS LINE ********************/

try {
	module.exports = FancyCalculator;
} catch {
	module.exports = null;
}