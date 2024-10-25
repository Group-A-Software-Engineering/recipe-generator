// getMissingIngredients.test.js

const getMissingIngredients = require('./getMissingIngredients');

test('should return missing ingredients when some are missing', () => {
  const recipeIngredients = ['Eggs', 'Flour', 'Milk', 'Sugar', 'Butter'];
  const userIngredients = ['milk', 'Butter', 'Salt'];

  const expected = ['Eggs', 'Flour', 'Sugar'];
  const result = getMissingIngredients(recipeIngredients, userIngredients);

  expect(result).toEqual(expected);
});

test('should return empty array when no ingredients are missing', () => {
  const recipeIngredients = ['Eggs', 'Flour'];
  const userIngredients = ['eggs', 'flour'];

  const expected = [];
  const result = getMissingIngredients(recipeIngredients, userIngredients);

  expect(result).toEqual(expected);
});

test('should return all ingredients when user has none', () => {
  const recipeIngredients = ['Eggs', 'Flour'];
  const userIngredients = [];

  const expected = ['Eggs', 'Flour'];
  const result = getMissingIngredients(recipeIngredients, userIngredients);

  expect(result).toEqual(expected);
});

test('should handle extra ingredients in userIngredients', () => {
  const recipeIngredients = ['Eggs', 'Flour'];
  const userIngredients = ['eggs', 'flour', 'milk', 'sugar'];

  const expected = [];
  const result = getMissingIngredients(recipeIngredients, userIngredients);

  expect(result).toEqual(expected);
});

test('should be case-insensitive and trim whitespace', () => {
  const recipeIngredients = ['Eggs', 'Flour', 'Milk'];
  const userIngredients = ['  EGGS  ', ' flour ', 'MILK'];

  const expected = [];
  const result = getMissingIngredients(recipeIngredients, userIngredients);

  expect(result).toEqual(expected);
});
