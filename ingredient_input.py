# ingredient_input.py

class IngredientInput:
    """
    A class to manage the list of ingredients inputted by the user.
    """

    def __init__(self):
        """
        Initialize the IngredientInput class with an empty ingredients list.
        """
        self.ingredients = []

    def add_ingredient(self, ingredient):
        """
        Add a new ingredient to the ingredients list after validation.

        Parameters:
            ingredient (str): The ingredient to add.

        Returns:
            str: A message indicating the result of the operation.
        """
        # Remove leading/trailing whitespaces and convert to lowercase for consistency
        ingredient = ingredient.strip().lower()

        # Check if the ingredient is empty after stripping
        if not ingredient:
            return "Error: Ingredient cannot be empty."

        # Check if the ingredient contains only letters and spaces
        if not ingredient.replace(' ', '').isalpha():
            return "Error: Ingredient must contain only letters."

        # Check if the ingredient is already in the list to prevent duplicates
        if ingredient in self.ingredients:
            return f"Error: '{ingredient}' is already in the list."

        # Add the valid ingredient to the list
        self.ingredients.append(ingredient)
        return f"'{ingredient}' has been added to the list."

    def remove_ingredient(self, ingredient):
        """
        Remove an ingredient from the ingredients list.

        Parameters:
            ingredient (str): The ingredient to remove.

        Returns:
            str: A message indicating the result of the operation.
        """
        # Normalize the input
        ingredient = ingredient.strip().lower()

        # Check if the ingredient exists in the list
        if ingredient in self.ingredients:
            self.ingredients.remove(ingredient)
            return f"'{ingredient}' has been removed from the list."
        else:
            return f"Error: '{ingredient}' is not in the list."

    def get_ingredients(self):
        """
        Get a copy of the current ingredients list.

        Returns:
            list: A copy of the ingredients list.
        """
        return self.ingredients.copy()

    def clear_ingredients(self):
        """
        Clear all ingredients from the ingredients list.

        Returns:
            str: A message indicating the list has been cleared.
        """
        self.ingredients.clear()
        return "Ingredient list has been cleared."
