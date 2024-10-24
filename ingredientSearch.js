// Function to validate the ingredient search input
function validateIngredientSearch(input) {
    // Trim the input to remove leading and trailing spaces
    const trimmedInput = input.trim();
    
    // Ensure input is not empty and does not contain any invalid characters
    const valid = /^[a-zA-Z,\s]+$/.test(trimmedInput);
  
    return valid && trimmedInput.length > 0;
  }
  
  // Export the function for testing
  module.exports = { validateIngredientSearch };