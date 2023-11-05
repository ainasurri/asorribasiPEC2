

function allEven(input) {
  return input.every(num => num % 2 === 0);
}


function allSameType(input) {
  return input.every((elem, _, array) => typeof elem === typeof array[0]);
}



function positiveMatrix(input) {
  return input.every(row => Array.isArray(row) && row.every(num => num > 0));
}


function allSameVowels(input) {
  const wordVowels = (word)=>Array.from(new Set( word.match(/[aeiou]/ig).join("")));
 
  return input.every(word=> wordVowels(word).length==1);
  
}


module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels
};
