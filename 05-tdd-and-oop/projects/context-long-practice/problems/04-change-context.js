function changeContext(func, obj) {
  return func.call(obj);
}; 

class Person {
  constructor(name) {
    this.name = name;
  }
};

/*****************************************************************************/
/***************** DO NOT MODIFY ANYTHING UNDER THIS LINE ********************/

module.exports = changeContext;