const { validateIngredientSearch } = require('./ingredientSearch');

// Unit test to validate correct ingredient search input (valid case)
test('should validate correct ingredient search input with simple ingredients', () => {
    expect(validateIngredientSearch('tomato, cheese, basil')).toBe(true); // valid input
  });
  
  // Unit test to validate correct input with extra spaces (valid case)
  test('should validate input with extra spaces between ingredients', () => {
    expect(validateIngredientSearch('  apple, banana, orange  ')).toBe(true); // valid input with spaces
  });
  
  // Unit test to validate single ingredient (valid case)
  test('should validate input with a single ingredient', () => {
    expect(validateIngredientSearch('potato')).toBe(true); // valid single ingredient
  });
  
  // Unit test to fail validation for input with numbers (invalid case)
  test('should fail validation for input with numbers', () => {
    expect(validateIngredientSearch('tomato, cheese, 123')).toBe(false); // invalid input with numbers
  });