exports.sanitize = function (word) {
  return word.toLowerCase();
}

exports.tokenize = function (sentence) {
  return sentence.split(' ');
}
