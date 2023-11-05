function sum(array) {
  return array.reduce((acc, val) => acc + val, 0);
}
function productAll(array) {
  return array.reduce((acc, row) => acc * row.reduce((rowAcc, num) => rowAcc * num, 1), 1);
}

function objectify(array) {
  return array.reduce((obj, item) => {
    obj[item[0]] = item[1];
    return obj;
  }, {});
}

function luckyNumbers(array) {
  return `Your lucky numbers are: ${array.slice(0, -1).join(', ')}, and ${array[array.length - 1]}`;
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};
