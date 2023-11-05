
function anyGreaterThan10 (input) {
  return input.some(number => number > 10);
};


function longWord (input) {
  return input.some(word => word.length > 10);
};


function truePossibilities (input) {
  return input.some(row => row.some(element => element === true));
}

function lostCarcosa (input) {
  return input.some(phrase => phrase.includes('Lost'));
};

module.exports = {
  anyGreaterThan10,
  longWord,
  truePossibilities,
  lostCarcosa
};
