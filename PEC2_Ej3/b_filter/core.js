function onlyEven(array) {
  return array.filter(number => number % 2 === 0);
}

function onlyOneWord(array) {
  return array.filter(str => !str.includes(' '));
}

function positiveRowsOnly(array) {
  return array.filter(row => row.every(number => number > 0));
}

function allSameVowels(array) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return array.filter(word => {
    const wordVowels = word.split('').filter(letter => vowels.includes(letter.toLowerCase()));
    return wordVowels.every((val, i, arr) => val.toLowerCase() === arr[0].toLowerCase());
  });
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};
