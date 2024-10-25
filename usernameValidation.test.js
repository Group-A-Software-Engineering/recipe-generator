const { isString, isValidLength, hasValidCharacters, validateUsername } = require('./usernameValidation');

// Test for isString function
test('should pass for valid string input', () => {
    expect(isString("User123")).toBe(true); // Expected: true
});

test('should fail for non-string input', () => {
    expect(isString(12345)).toBe(false); // Expected: false
});

// Test for isValidLength function
test('should pass for username within valid length range', () => {
    expect(isValidLength("ValidUser")).toBe(true); // Expected: true
});

test('should fail for username longer than 20 characters', () => {
    expect(isValidLength("ThisIsAVeryLongUsernameThatExceedsLimit")).toBe(false); // Expected: false
});

// Test for hasValidCharacters function
test('should pass for username with only alphanumeric characters', () => {
    expect(hasValidCharacters("User123")).toBe(true); // Expected: true
});

test('should fail for username with invalid characters', () => {
    expect(hasValidCharacters("Invalid@User")).toBe(false); // Expected: false
});

// Test for validateUsername function with valid input
test('should pass for a completely valid username', () => {
    expect(validateUsername("User123")).toBe(true); // Expected: true
});

// Test for validateUsername function with invalid length
test('should fail for username with length out of range', () => {
    expect(validateUsername("ThisIsAVeryLongUsernameThatExceedsLimit")).toBe(false); // Expected: false
});

// Test for validateUsername function with non-alphanumeric characters
test('should fail for username with special characters', () => {
    expect(validateUsername("Invalid@User")).toBe(false); // Expected: false
});
