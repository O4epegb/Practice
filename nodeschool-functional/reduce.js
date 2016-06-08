function countWords(inputWords) {
  return inputWords.reduce(function(prev, curr) {
    return prev[curr] ? (prev[curr]++, prev) : (prev[curr] = 1, prev);
  }, {});
}

module.exports = countWords
