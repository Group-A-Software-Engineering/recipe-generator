// view.js

const View = (() => {
    const mealSuggestionsSection = document.getElementById('meal-suggestions');
    const favoritesSection = document.getElementById('favorites-section');
    const favoritesList = document.getElementById('favorites-list');

    // Clear results
    const clearResults = () => {
        mealSuggestionsSection.innerHTML = '';
    };

    // Display recipes
    const displayRecipes = (recipes, sortOption) => {
        clearResults();
        recipes = sortRecipes(recipes, sortOption);
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" />
                <p>Ready in ${recipe.readyInMinutes} minutes</p>
                <p>Servings: ${recipe.servings}</p>
                <button data-id="${recipe.id}" class="view-recipe-button">View Recipe</button>
                <button data-id="${recipe.id}" class="save-recipe-button">Save Recipe</button>
            `;
            mealSuggestionsSection.appendChild(recipeElement);
        });
    };

    // Display recipes by ingredients
    const displayRecipesByIngredients = (recipes, sortOption) => {
        clearResults();
        recipes = sortRecipes(recipes, sortOption);
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" />
                <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
                <p>Missed Ingredients: ${recipe.missedIngredientCount}</p>
                <button data-id="${recipe.id}" class="view-recipe-button">View Recipe</button>
                <button data-id="${recipe.id}" class="save-recipe-button">Save Recipe</button>
            `;
            mealSuggestionsSection.appendChild(recipeElement);
        });
    };

    // Display recipe details
    const displayRecipeDetails = (recipe) => {
        clearResults();
        // Extract nutrients
        const nutrients = recipe.nutrition.nutrients;
        const calories = nutrients.find(n => n.name === 'Calories');
        const protein = nutrients.find(n => n.name === 'Protein');
        const fat = nutrients.find(n => n.name === 'Fat');
        const carbs = nutrients.find(n => n.name === 'Carbohydrates');

        // Ingredients and instructions
        const ingredientsList = recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');
        let instructions = '';
        if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
            instructions = recipe.analyzedInstructions[0].steps.map(step => `<li>${step.step}</li>`).join('');
        } else {
            instructions = '<p>No instructions available.</p>';
        }

        // Render details
        mealSuggestionsSection.innerHTML = `
            <div class="recipe-details">
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}" />
                <h3>Ingredients</h3>
                <ul>${ingredientsList}</ul>
                <h3>Instructions</h3>
                <ol>${instructions}</ol>
                <h3>Nutritional Facts</h3>
                <p>Calories: ${calories ? calories.amount + ' ' + calories.unit : 'N/A'}</p>
                <p>Protein: ${protein ? protein.amount + ' ' + protein.unit : 'N/A'}</p>
                <p>Fat: ${fat ? fat.amount + ' ' + fat.unit : 'N/A'}</p>
                <p>Carbohydrates: ${carbs ? carbs.amount + ' ' + carbs.unit : 'N/A'}</p>
                <button id="back-button">Back to Results</button>
            </div>
        `;
    };

    // Update favorites section
    const updateFavoritesSection = (favorites) => {
        if (favorites.length > 0) {
            favoritesSection.style.display = 'block';
            favoritesList.innerHTML = '';
            favorites.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
                recipeElement.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}" />
                    <button data-id="${recipe.id}" class="view-recipe-button">View Recipe</button>
                    <button data-id="${recipe.id}" class="remove-recipe-button">Remove</button>
                `;
                favoritesList.appendChild(recipeElement);
            });
        } else {
            favoritesSection.style.display = 'none';
        }
    };

    // Sort recipes
    const sortRecipes = (recipes, sortOption) => {
        let sortedRecipes = [...recipes];
        switch (sortOption) {
            case 'time':
                sortedRecipes.sort((a, b) => (a.readyInMinutes || a.time) - (b.readyInMinutes || b.time));
                break;
            case 'popularity':
                sortedRecipes.sort((a, b) => (b.aggregateLikes || 0) - (a.aggregateLikes || 0));
                break;
            case 'healthiness':
                sortedRecipes.sort((a, b) => (b.healthScore || 0) - (a.healthScore || 0));
                break;
            case 'ingredients':
                if (sortedRecipes[0].usedIngredientCount !== undefined) {
                    sortedRecipes.sort((a, b) => a.usedIngredientCount - b.usedIngredientCount);
                } else {
                    alert('Ingredient count sorting is only available for ingredient search.');
                }
                break;
            default:
                break;
        }
        return sortedRecipes;
    };

    const updateLoginStatus = (username) => {
        const loginLink = document.querySelector('.login-link');
        if (username) {
            loginLink.textContent = `Welcome, ${username} (Logout)`;
            loginLink.id = 'logout-link';
            loginLink.href = '#';
        } else {
            loginLink.textContent = 'Login';
            loginLink.id = '';
            loginLink.href = 'login.html';
        }
    };

    const showSignUp = () => {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('signup-section').style.display = 'block';
    };

    const showLogin = () => {
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    };

    return {
        displayRecipes,
        displayRecipesByIngredients,
        displayRecipeDetails,
        updateFavoritesSection,
        updateLoginStatus,
        showSignUp,
        showLogin,
    };
})();