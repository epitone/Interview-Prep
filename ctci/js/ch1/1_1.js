/**
 * Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?
 */

function isUnique(testString) {
    /**
     * Algorithm Notes: You can do this using a Set in javascript - loop through the string characters and check if the current character exists in the set, if so, then it fails
     * Otherwise, it's true
     * Special Cases: If the string is empty, then technically it's unique so just return true.
     * Because I've had it hard-wired into my brain, I will be using ES6 syntax wherever possible
     */

    // Time Complexity: O(n) where “n” is the length of the test string
    // Space Complexity: O(n) where “n” is the length of the test string
    const letters = new Set()
    for (let index = 0; index < testString.length; index++) {
        if (letters.has(testString[index])) {
            return false;
        }
        letters.add(testString[index]);
    }
    return true;
}

// What if we can't use additional data structures?
function isUniqueTwo(testString) {
    /**
     * The simplest solution would be to step through every single character starting from the beginning and compare them, if they're the same then we can stop.
     * This uses O(1) space complexity but O(n^2) time complexity
     */
    for (let index = 0; index < testString.length; index++) {
        const letter = testString[index]
        for (let next = index + 1; next < testString.length; next++) {
            const letterTwo = testString[next];
            if (letter === letterTwo) {
                return false;
            }
        }
    }
    return true;
}

console.log(isUnique('racecar'))
console.log(isUnique(''))
console.log('-------------')
console.log(isUniqueTwo('racecar'))
console.log(isUniqueTwo(''))

