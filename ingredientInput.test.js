// ingredientInput.test.js

const IngredientInput = require('./ingredientInput');

describe('IngredientInput', () => {
  let ingredientInput;

  // Runs before each test
  beforeEach(() => {
    ingredientInput = new IngredientInput();
  });

  test('should add a valid ingredient', () => {
    const result = ingredientInput.addIngredient('Tomato');
    expect(result).toBe("'tomato' has been added to the list.");
    expect(ingredientInput.getIngredients()).toContain('tomato');
  });

  test('should not add an empty ingredient', () => {
    const result = ingredientInput.addIngredient('');
    expect(result).toBe('Error: Ingredient cannot be empty.');
    expect(ingredientInput.getIngredients().length).toBe(0);
  });

  test('should not add a duplicate ingredient', () => {
    ingredientInput.addIngredient('Tomato');
    const result = ingredientInput.addIngredient('Tomato');
    expect(result).toBe("Error: 'tomato' is already in the list.");
    expect(ingredientInput.getIngredients().length).toBe(1);
  });

  test('should not add an ingredient with invalid characters', () => {
    const result = ingredientInput.addIngredient('Tomato123');
    expect(result).toBe('Error: Ingredient must contain only letters.');
    expect(ingredientInput.getIngredients().length).toBe(0);
  });

  test('should remove an existing ingredient', () => {
    ingredientInput.addIngredient('Tomato');
    const result = ingredientInput.removeIngredient('Tomato');
    expect(result).toBe("'tomato' has been removed from the list.");
    expect(ingredientInput.getIngredients()).not.toContain('tomato');
  });

  test('should not remove a non-existent ingredient', () => {
    const result = ingredientInput.removeIngredient('Tomato');
    expect(result).toBe("Error: 'tomato' is not in the list.");
  });

  test('should clear all ingredients', () => {
    ingredientInput.addIngredient('Tomato');
    ingredientInput.addIngredient('Garlic');
    const result = ingredientInput.clearIngredients();
    expect(result).toBe('Ingredient list has been cleared.');
    expect(ingredientInput.getIngredients().length).toBe(0);
  });
});
