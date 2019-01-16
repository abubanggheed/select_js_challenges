/*
this function is to take in a string of a mathematical equation
that contains arbetrary amounds of sets of parenthesis, carrots (exponents)
multiplications, divisions, additions, and subtractions and returns the
numerical solution to that equation.
*/

const findClossingP = (expression, startingIndex) => {
    let i = startingIndex + 1;
    let count = 1;
    while (count > 0 && i < expression.length) {
        if (expression[i] === '(') {
            count++
        } else if (expression[i] === ')') {
            count--
        }
        if (count) {
            i++
        }
    }
    return i < expression.length ? i : false
}

const permdasHelper = expression => {
    let clossingP = 0;
    let openingP = expression.lastIndexOf('(');
    let lastPlus = expression.lastIndexOf('+');
    let lastMinus = expression.lastIndexOf('-');
    let lastTimes = expression.lastIndexOf('*');
    let lastDiv = expression.lastIndexOf('/');
    let lastExp = expression.lastIndexOf('^');
    if (openingP > -1) {
        clossingP = findClossingP(expression, openingP)
        return permdasHelper(expression.slice(0, openingP)
            + permdasHelper(expression.slice(openingP + 1, clossingP))
            + expression.substr(clossingP + 1))
    } else if (lastPlus > -1 || lastMinus > -1) {
        if (lastPlus > lastMinus) {
            return permdasHelper(expression.slice(0, lastPlus)) + permdasHelper(expression.substr(lastPlus + 1))
        } else {
            return permdasHelper(expression.slice(0, lastMinus)) - permdasHelper(expression.substr(lastMinus + 1))
        }
    } else if (lastTimes > -1 || lastDiv > -1) {
        if (lastTimes > lastDiv) {
            return permdasHelper(expression.slice(0, lastTimes)) * permdasHelper(expression.substr(lastTimes + 1))
        } else {
            return permdasHelper(expression.slice(0, lastDiv)) / permdasHelper(expression.substr(lastDiv + 1))
        }    } else if (lastExp > -1) {
        return Math.pow(permdasHelper(expression.slice(0, lastExp)), permdasHelper(expression.substr(lastExp + 1)))
    } else {
        return Number(expression)
    }
}

const permdas = expression => (
    permdasHelper(expression.replace(/ /g, ''))
)

console.log(permdas('1 + 12 / (5 - 2 ^ (3 / 2))'))