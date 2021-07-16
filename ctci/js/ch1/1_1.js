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
    const start = performance.now();
    const letters = new Set()
    for (let index = 0; index < testString.length; index++) {
        if (letters.has(testString[index])) {
            let end = performance.now();
            console.log(`Runtime: ${end - start} ms`)
            return false;
        }
        letters.add(testString[index]);
    }
    const end = performance.now();
    console.log(`Runtime: ${end - start} ms`)
    return true;
}

// What if we can't use additional data structures?
function isUniqueTwo(testString) {
    /**
     * The simplest solution would be to step through every single character starting from the beginning and compare them, if they're the same then we can stop.
     * This uses O(1) space complexity but O(n^2) time complexity
     */
    const start = performance.now();
    for (let index = 0; index < testString.length; index++) {
        const letter = testString[index]
        for (let next = index + 1; next < testString.length; next++) {
            const letterTwo = testString[next];
            if (letter === letterTwo) {
                let end = performance.now();
                console.log(`Runtime: ${end - start} ms`);
                return false;
            }
        }
    }
    let end = performance.now();
    console.log(`Runtime: ${end - start} ms`)
    return true;
}

/**
 * Upon looking up the hints in the back of the book, I saw mention of a Bit Vector.
 * I don't really use those nor do I remember them from school but I figured this was important to understand.
 * So I will be implementing one here. I will explain things as I go.
 */

function isUniqueThree(testString) {
    /**
     * This value is going to be the bit representation of whatever characters we find in the string
     * When we find a character in the string we flip the bit position of that character from 0 to 1.
     * You can simply view this as: 00000000 00000000 00000000 00000000
     */
    const start = performance.now();
    let checker = 0;
    for (let index = 0; index < testString.length; index++) { // this is going to loop over the string
        /**
         * a through z in ASCII are charactets numbered 97 through 122, 26 characters total
         * with this, you get a number between 0 and 25 to represent each character index
         * 0 for 'a' and 25 for 'z'. Because it's javascript, we can't just subtract strings,
         * we must use charCodeAt
         */
        let charAtIndex = testString.charCodeAt(index) - 'a'.charCodeAt(0);

        /**
         * This value takes a "1" and shifts it to the left "charAtIndex" times.
         * This creates a bit representation of the character we have.
         * For example: if we use the  letter "d", charAtIndex would be "3"
         * because "a" is position 0 , and "d" is 3 letters after it.
         * Thus, singleBitOnPosition would go from:
         * "00000000 00000000 00000000 00000001" (0 Shift)
         * "00000000 00000000 00000000 00000010" (1 shift)
         * "00000000 00000000 00000000 00000100" (2 shift)
         * "00000000 00000000 00000000 00001000" (3 shift)
         */
        let singleBitOnPosition = 1 << charAtIndex;

        /**
         * This performs a Bitwise AND on checker and singleBitOnPosition.
         * Remember that checker contains a bit for EVERY value we've seen before in the string.
         * Bitwise AND takes checker and singleBitOnPosition and compares the bits against each other.
         * 0 and 0 would return 0, 0 and 1 would return 0, and 1 and 1 would return 1, much like a regular AND
         * statement. For example, if checker has already gone through the string and seen 'a', b', and 'd',
         * it would look like this:
         * 00000000 00000000 00000000 00001011
         * If we see "d" again, then singleBitOnPosition would look like this:
         * 00000000 00000000 00000000 00001000
         * So Bitwise AND would give us the following:
         * 00000000 00000000 00000000 00001011
         * &
         * 00000000 00000000 00000000 00001000
         * -----------------------------------
         * 00000000 00000000 00000000 00001000 (result, aka "d" has been seen already)
         * 
         * Since this number is greater than 0, we've already seen "d" so we know this is not a unique string,
         * so we can return false.
         */
        if((checker & singleBitOnPosition) > 0) {
            let end = performance.now();
            console.log(`Runtime: ${end - start} ms`);
            return false;
        }

        /**
         * Much like above, we need to "store" the letter value we have found inside checker so that we can use it later on.
         * To do that, we use a Bitwise OR - which is the inverse of a Bitwise AND. This takes checker and singleBitOnPosition
         * once again and performs a Bitwise OR. This compares the bits of the two variables against each other: 0 and 0 returns 0,
         * 0 and 1 returns 1, 1 and 1 returns one. We then store that result in checker and start from the top again with the next character.
         * For example:
         * f' = 00000000 00000000 00000000 00100000
         * checker(seen 'a' and 'g' so far) = 00000000 00000000 00000000 01000001
         * 00000000 00000000 00000000 00100000
         * | (OR)
         * 00000000 00000000 00000000 01000001
         * -----------------------------------
         * 00000000 00000000 00000000 01100001
         * So we then update checker to 00000000 00000000 00000000 01100001
         */
        checker |= singleBitOnPosition;
    }
    let end = performance.now()
    console.log(`Runtime: ${end - start} ms`)
    return true;
}

console.log("Function 1")
console.log(isUnique('racecar'))
// console.log(isUnique(''))
// console.log(isUnique('hiya'))
console.log('-------------')
console.log("Function 2")
console.log(isUniqueTwo('racecar'))
// console.log(isUniqueTwo(''))
// console.log(isUniqueTwo('hiya'))
console.log('-------------')
console.log("Function 3")
console.log(isUniqueThree('racecar'))
// console.log(isUniqueThree(''))
// console.log(isUniqueThree('hiya'))