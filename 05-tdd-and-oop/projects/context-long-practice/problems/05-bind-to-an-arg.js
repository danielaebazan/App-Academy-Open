function bindToAnArg(func, arg) {
  return function () {
    return func(arg, ...arguments);
  };
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
module.exports = bindToAnArg;