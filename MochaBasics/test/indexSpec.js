var chai = require('chai');
var expect = require('chai').expect;
var word = require('../index');

describe('Sanitize', function () {
  // before(function () {
  //   console.log('starting tests')
  // })
  //
  // after(function () {
  //   console.log('ending tests')
  // })

  it('return lowercase string', function () {
    var input = "HeLLo WoRlD";
    var output = word.sanitize(input);

    expect(output).to.equal('hello world');
    expect(output).to.not.equal('HeLLo WoRlD');
    expect(output).to.be.a('string');
    expect(output).to.not.be.a('object');
    expect(output).to.contain('hello');
  })
})

describe('Tokenize', function () {
  it('return an array of words', function () {
    var input = "hello world";
    var output = word.tokenize(input);

    expect(output).to.include.members(['hello', 'world']);
    expect(output).to.not.equal('HeLLo WoRlD');
    expect(output).to.be.a('array');
  })
})
