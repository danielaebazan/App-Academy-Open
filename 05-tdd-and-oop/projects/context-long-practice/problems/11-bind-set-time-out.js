function boundFuncTimer(obj, func, delay) {
  setTimeout(() => {
    func.call(obj);
  }, delay);
}


/*****************************************************************************/
/***************** DO NOT MODIFY ANYTHING UNDER THIS LINE ********************/

module.exports = boundFuncTimer;