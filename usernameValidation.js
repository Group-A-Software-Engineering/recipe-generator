// Function to check if the username is a valid type (string)
function isString(username) {
    return typeof username === 'string';
}

// Function to check if the username has a valid length (1 to 20 characters)
function isValidLength(username) {
    return username.length >= 1 && username.length <= 20;
}

// Function to check if the username contains only acceptable characters (alphanumeric)
function hasValidCharacters(username) {
    return /^[a-zA-Z0-9]+$/.test(username);
}

// Main validation function that combines all checks
function validateUsername(username) {
    return isString(username) && isValidLength(username) && hasValidCharacters(username);
}

module.exports = { isString, isValidLength, hasValidCharacters, validateUsername };
