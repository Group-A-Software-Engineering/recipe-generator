# test_ingredient_input.py

import unittest
from ingredient_input import IngredientInput

class TestIngredientInput(unittest.TestCase):
    """
    A test case class for testing the IngredientInput component.
    """

    def setUp(self):
        """
        Set up the test environment before each test method.
        """
        # Create a new instance of IngredientInput for each test
        self.ingredient_input = IngredientInput()

    def test_add_valid_ingredient(self):
        """
        Test adding a valid ingredient.
        """
        result = self.ingredient_input.add_ingredient("Tomato")
        self.assertEqual(result, "'tomato' has been added to the list.")
        self.assertIn("tomato", self.ingredient_input.get_ingredients())

    def test_add_empty_ingredient(self):
        """
        Test adding an empty ingredient (should fail).
        """
        result = self.ingredient_input.add_ingredient("")
        self.assertEqual(result, "Error: Ingredient cannot be empty.")
        self.assertEqual(len(self.ingredient_input.get_ingredients()), 0)

    def test_add_duplicate_ingredient(self):
        """
        Test adding a duplicate ingredient (should prevent duplicates).
        """
        self.ingredient_input.add_ingredient("Tomato")
        result = self.ingredient_input.add_ingredient("Tomato")
        self.assertEqual(result, "Error: 'tomato' is already in the list.")
        self.assertEqual(len(self.ingredient_input.get_ingredients()), 1)

    def test_add_invalid_ingredient(self):
        """
        Test adding an ingredient with invalid characters (should fail).
        """
        result = self.ingredient_input.add_ingredient("Tomato123")
        self.assertEqual(result, "Error: Ingredient must contain only letters.")
        self.assertEqual(len(self.ingredient_input.get_ingredients()), 0)

    def test_remove_ingredient(self):
        """
        Test removing an existing ingredient.
        """
        self.ingredient_input.add_ingredient("Tomato")
        result = self.ingredient_input.remove_ingredient("Tomato")
        self.assertEqual(result, "'tomato' has been removed from the list.")
        self.assertNotIn("tomato", self.ingredient_input.get_ingredients())

    def test_remove_nonexistent_ingredient(self):
        """
        Test removing an ingredient that does not exist (should fail).
        """
        result = self.ingredient_input.remove_ingredient("Tomato")
        self.assertEqual(result, "Error: 'tomato' is not in the list.")

    def test_clear_ingredients(self):
        """
        Test clearing the ingredients list.
        """
        self.ingredient_input.add_ingredient("Tomato")
        self.ingredient_input.add_ingredient("Garlic")
        result = self.ingredient_input.clear_ingredients()
        self.assertEqual(result, "Ingredient list has been cleared.")
        self.assertEqual(len(self.ingredient_input.get_ingredients()), 0)

if __name__ == '__main__':
    unittest.main()
