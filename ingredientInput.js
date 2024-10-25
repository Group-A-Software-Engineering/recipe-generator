// ingredientInput.js

/**
 * IngredientInput class to manage a list of ingredients provided by the user.
 */
class IngredientInput {
    constructor() {
      // Initialize the ingredients array to store the list of ingredients
      this.ingredients = [];
    }
  
    /**
     * Adds an ingredient to the list after validating it.
     * @param {string} ingredient - The ingredient to add.
     * @returns {string} - A message indicating the result of the operation.
     */
    addIngredient(ingredient) {
      // Remove leading/trailing whitespaces and convert to lowercase for consistency
      ingredient = ingredient.trim().toLowerCase();
  
      // Check if the ingredient is empty after trimming
      if (!ingredient) {
        return "Error: Ingredient cannot be empty.";
      }
  
      // Check if the ingredient contains only letters and spaces
      if (!/^[a-zA-Z\s]+$/.test(ingredient)) {
        return "Error: Ingredient must contain only letters.";
      }
  
      // Check if the ingredient is already in the list to prevent duplicates
      if (this.ingredients.includes(ingredient)) {
        return `Error: '${ingredient}' is already in the list.`;
      }
  
      // Add the valid ingredient to the list
      this.ingredients.push(ingredient);
      return `'${ingredient}' has been added to the list.`;
    }
  
    /**
     * Removes an ingredient from the list.
     * @param {string} ingredient - The ingredient to remove.
     * @returns {string} - A message indicating the result of the operation.
     */
    removeIngredient(ingredient) {
      // Normalize the input
      ingredient = ingredient.trim().toLowerCase();
  
      // Find the index of the ingredient in the list
      const index = this.ingredients.indexOf(ingredient);
  
      // If the ingredient exists, remove it
      if (index !== -1) {
        this.ingredients.splice(index, 1);
        return `'${ingredient}' has been removed from the list.`;
      } else {
        return `Error: '${ingredient}' is not in the list.`;
      }
    }
  
    /**
     * Retrieves a copy of the ingredients list.
     * @returns {string[]} - A copy of the ingredients list.
     */
    getIngredients() {
      // Return a shallow copy to prevent external modification
      return [...this.ingredients];
    }
  
    /**
     * Clears all ingredients from the list.
     * @returns {string} - A message indicating the list has been cleared.
     */
    clearIngredients() {
      this.ingredients = [];
      return "Ingredient list has been cleared.";
    }
  }
  
  // Export the class for use in other files
  module.exports = IngredientInput;
  