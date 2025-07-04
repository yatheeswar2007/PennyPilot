/**
 * @fileOverview Utility function to check for palindromes.
 */

/**
 * Checks if a given string is a palindrome, ignoring case and non-alphanumeric characters.
 * @param s The input string.
 * @returns True if the string is a palindrome, false otherwise.
 */
export function isPalindrome(s: string): boolean {
  // 1. Convert the string to lowercase.
  // 2. Remove all non-alphanumeric characters using a regular expression.
  const cleanedS = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 3. Compare the cleaned string with its reverse.
  //    - .split('') turns the string into an array of characters.
  //    - .reverse() reverses the array.
  //    - .join('') joins the characters back into a string.
  const reversedS = cleanedS.split('').reverse().join('');

  return cleanedS === reversedS;
}
