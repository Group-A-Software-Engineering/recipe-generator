// controller.js

const Controller = (() => {
    let currentSortOption = '';

    const init = () => {
        // Event listeners
        document.getElementById('toggle-search-mode').addEventListener('click', handleToggleSearchMode);
        document.getElementById('search-button').addEventListener('click', handleSearch);
        document.getElementById('ingredient-search-button').addEventListener('click', handleIngredientSearch);
        document.getElementById('sort-select').addEventListener('change', handleSorting);
        document.getElementById('meal-suggestions').addEventListener('click', handleMealSuggestionsClick);
        document.getElementById('favorites-list').addEventListener('click', handleFavoritesClick);
    };

    // Toggle search mode
    const handleToggleSearchMode = () => {
        const generalSearch = document.getElementById('general-search');
        const ingredientSearch = document.getElementById('ingredient-search');
        const toggleButton = document.getElementById('toggle-search-mode');
        if (generalSearch.style.display === 'none') {
            generalSearch.style.display = 'flex';
            ingredientSearch.style.display = 'none';
            toggleButton.textContent = 'Switch to Ingredient Search';
        } else {
            generalSearch.style.display = 'none';
            ingredientSearch.style.display = 'flex';
            toggleButton.textContent = 'Switch to General Search';
        }
    };

    // Handle general search
    const handleSearch = async () => {
        const query = document.getElementById('search-bar').value;
        const dietSelect = document.getElementById('diet-select');
        const selectedDiets = Array.from(dietSelect.selectedOptions).map(option => option.value).join(',');
        try {
            const recipes = await Model.fetchRecipes(query, selectedDiets);
            if (recipes.length > 0) {
                View.displayRecipes(recipes, currentSortOption);
            } else {
                alert("No recipes found for your query.");
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            alert("There was an error fetching the recipes. Please try again later.");
        }
    };

    // Handle ingredient search
    const handleIngredientSearch = async () => {
        const ingredientInputs = document.querySelectorAll('.ingredient-input');
        let ingredients = [];
        ingredientInputs.forEach(input => {
            if (input.value.trim() !== '') {
                ingredients.push(input.value.trim());
            }
        });
        if (ingredients.length === 0) {
            alert('Please enter at least one ingredient.');
            return;
        }
        try {
            const recipes = await Model.fetchRecipesByIngredients(ingredients);
            if (recipes.length > 0) {
                View.displayRecipesByIngredients(recipes, currentSortOption);
            } else {
                alert("No recipes found with the specified ingredients.");
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            alert("There was an error fetching the recipes. Please try again later.");
        }
    };

    // Handle clicks in meal suggestions
    const handleMealSuggestionsClick = async (event) => {
        const viewButton = event.target.closest('.view-recipe-button');
        const saveButton = event.target.closest('.save-recipe-button');
        const backButton = event.target.closest('#back-button');

        if (viewButton) {
            const recipeId = viewButton.getAttribute('data-id');
            handleViewRecipeDetails(recipeId);
        } else if (saveButton) {
            const recipeId = saveButton.getAttribute('data-id');
            handleSaveToFavorites(recipeId);
        } else if (backButton) {
            handleGoBack();
        }
    };

    // Handle clicks in favorites
    const handleFavoritesClick = async (event) => {
        const viewButton = event.target.closest('.view-recipe-button');
        const removeButton = event.target.closest('.remove-recipe-button');

        if (viewButton) {
            const recipeId = viewButton.getAttribute('data-id');
            handleViewRecipeDetails(recipeId);
        } else if (removeButton) {
            const recipeId = removeButton.getAttribute('data-id');
            handleRemoveFromFavorites(recipeId);
        }
    };

    // View recipe details
    const handleViewRecipeDetails = async (recipeId) => {
        try {
            const recipe = await Model.fetchRecipeDetails(recipeId);
            View.displayRecipeDetails(recipe);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    // Save to favorites
    const handleSaveToFavorites = async (recipeId) => {
        Model.addToFavorites(recipeId);
        alert('Recipe added to favorites!');
        await updateFavoritesSection();
    };

    // Remove from favorites
    const handleRemoveFromFavorites = async (recipeId) => {
        Model.removeFromFavorites(recipeId);
        alert('Recipe removed from favorites.');
        await updateFavoritesSection();
    };

    // Go back to results
    const handleGoBack = () => {
        const currentRecipes = Model.getCurrentRecipes();
        if (document.getElementById('general-search').style.display !== 'none') {
            View.displayRecipes(currentRecipes, currentSortOption);
        } else {
            View.displayRecipesByIngredients(currentRecipes, currentSortOption);
        }
    };

    // Handle sorting
    const handleSorting = () => {
        currentSortOption = document.getElementById('sort-select').value;
        const currentRecipes = Model.getCurrentRecipes();
        if (document.getElementById('general-search').style.display !== 'none') {
            View.displayRecipes(currentRecipes, currentSortOption);
        } else {
            View.displayRecipesByIngredients(currentRecipes, currentSortOption);
        }
    };

    // Update favorites section
    const updateFavoritesSection = async () => {
        const favoriteRecipeIds = Model.getFavoriteRecipes();
        if (favoriteRecipeIds.length > 0) {
            const favoriteRecipes = [];
            for (let recipeId of favoriteRecipeIds) {
                try {
                    const recipe = await Model.fetchRecipeDetails(recipeId);
                    favoriteRecipes.push(recipe);
                } catch (error) {
                    console.error('Error fetching favorite recipe:', error);
                }
            }
            View.updateFavoritesSection(favoriteRecipes);
        } else {
            View.updateFavoritesSection([]);
        }
    };

    return {
        init,
    };
})();

Controller.init();