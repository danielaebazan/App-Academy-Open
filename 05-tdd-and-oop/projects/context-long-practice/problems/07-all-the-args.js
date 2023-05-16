function allTheArgs(func, ...args) {
  return function() {
    return func(...args, ...arguments);
  };
}

/*****************************************************************************/
/***************** DO NOT MODIFY ANYTHING UNDER THIS LINE ********************/

module.exports = allTheArgs;