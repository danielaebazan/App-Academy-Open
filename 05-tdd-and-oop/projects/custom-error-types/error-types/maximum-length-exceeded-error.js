const ValidationError = require('/Users/danielabazan/Documents/App-Academy/practice-for-week-04-custom-error-types/error-types/validation-error.js');

class MaximumLengthExceededError extends ValidationError {
  constructor(excessLength) {
    super(excessLength);

    this.excessLength = excessLength;
    this.name = 'MaximumLengthExceededError';
    this.message = "Maximum length exceeded";
    if (excessLength > 0) {
      this.message += ` by ${this.excessLength}`;
    }
  }
}
 
/****************************************************************************/
/******************* DO NOT EDIT CODE BELOW THIS LINE ***********************/

try {
  module.exports = MaximumLengthExceededError;
} catch {
  module.exports = null;
}