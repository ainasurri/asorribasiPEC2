function multiplyBy10(array) {
  return array.map(element => element * 10);
}

function shiftRight(array) {
  return [array[array.length - 1]].concat(array.slice(0, array.length - 1));
}

function onlyVowels(array) {
  return array.map(word => word.replace(/[^aeiouAEIOU]/g, ''));
}

function doubleMatrix(array) {
  return array.map(subArray => subArray.map(number => number * 2));
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix
};
