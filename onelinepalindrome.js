
const isPalindrome = string => (
    string === string.split('').reverse().join('')
)

// now without using array methods

const isPalindrome2 = (string, i=0) => (
    (i >= string.length - 1 - i) ? true : (string[i] === string[string.length - 1 - i]
        && isPalindrome2(string, i + 1))
)

