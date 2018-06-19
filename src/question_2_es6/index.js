/*
* Write a function to check if a word/phrase/sequence is a palindrome using
* vanilla JS.
*/

/**
 * Takes a phrase and decides if it is a pallindrome using generic algorithm.
 * @param phrase
 * @returns {boolean}
 */
export const isPallindromeA = phrase => {
  phrase = String(phrase);
  for (let i = 0; i < phrase.length / 2; i++) {
    if (phrase[i] !== phrase[phrase.length - i - 1]) {
      return false;
    }
  }

  return true;
};

/**
 * Takes a phrase and decides if it is a pallindrome using the
 * native reverse() method.
 * @param phrase
 * @returns {boolean}
 */
export const isPallindromeB = phrase =>
  String(phrase).reverse() === String(phrase);
