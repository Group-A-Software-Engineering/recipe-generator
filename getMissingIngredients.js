// getMissingIngredients.js

function getMissingIngredients(recipeIngredients, userIngredients) {
    // Convert userIngredients to a Set for efficient lookup
    const userIngredientsSet = new Set(
      userIngredients.map((ingredient) => ingredient.toLowerCase().trim())
    );
  
    // Filter out ingredients that the user already has
    const missingIngredients = recipeIngredients.filter(
      (ingredient) => !userIngredientsSet.has(ingredient.toLowerCase().trim())
    );
  
    return missingIngredients;
  }
  
  module.exports = getMissingIngredients;
  