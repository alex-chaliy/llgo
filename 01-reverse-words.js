'use strict';

// You need to reverse all words but save the sequnce of these words

// Note: the word means a combination of letters and numbers
// underscores, spaces and any other characters are not a part of a word

// e.g. 
// 'The super power__shower123! То, то є Круто!'
// 'ehT repus rewop__321rewohs! оТ, от є отурК!'

const stringTest1 = 'The quick_brown123, fox jümps__ovér. The lazy01! То@ є Круто!';
const stringTest2 = 'The super power__shower123! То, то є Круто!';

String.prototype.reverse = function () {
  return this.split('').reverse().join('');
}

function reverseWords(text) {
  // regExp in split() means any characters of any language and any numbers
  // '^' means not
  // so all of the international symbols like ü, ї, є, å etc will be saved (they will not be threated as spec characters)
  // and also a regexp capturing group via parentheses () will save all of the spaces and spec characters
  // so they will be represented as separate elements in the resulted array
  return text.split(/([^\p{L}\p{N}])/gu)
    .map(word => word.reverse())
    .join('');
}

console.log(stringTest1);
console.log(reverseWords(stringTest1));
console.log(stringTest2);
console.log(reverseWords(stringTest2));