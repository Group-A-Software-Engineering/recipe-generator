const apiKey = '32f55694f3244f7c95847b4f9e20c743'; 
const baseUrl = 'https://api.spoonacular.com/recipes';

let currentRecipes = [];
let currentSortOption = '';
let favoriteRecipes = [];

// Toggle between general search and ingredient search
document.getElementById('toggle-search-mode').addEventListener('click', () => {
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
});

// Search for recipes based on general query
function searchRecipes() {
    const query = document.getElementById('search-bar').value;
    const dietSelect = document.getElementById('diet-select');
    const selectedDiets = Array.from(dietSelect.selectedOptions).map(option => option.value).join(',');

    let apiUrl = `${baseUrl}/complexSearch?query=${encodeURIComponent(query)}&apiKey=${apiKey}&addRecipeInformation=true&number=6`;

    if (selectedDiets) {
        apiUrl += `&diet=${encodeURIComponent(selectedDiets)}`;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length > 0) {
                currentRecipes = data.results;
                displayRecipes(currentRecipes);
            } else {
                alert("No recipes found for your query.");
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            alert("There was an error fetching the recipes. Please try again later.");
        });
}

// Search for recipes based on ingredients
function searchByIngredients() {
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

    const apiUrl = `${baseUrl}/findByIngredients?ingredients=${encodeURIComponent(ingredients.join(','))}&apiKey=${apiKey}&number=6&ranking=2`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                currentRecipes = data;
                displayRecipesByIngredients(currentRecipes);
            } else {
                alert("No recipes found with the specified ingredients.");
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            alert("There was an error fetching the recipes. Please try again later.");
        });
}

// Display recipes from general search
function displayRecipes(recipes) {
    sortRecipes(recipes);
    const mealSuggestionsSection = document.getElementById('meal-suggestions');
    mealSuggestionsSection.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
            <p>Servings: ${recipe.servings}</p>
            <button onclick="viewRecipeDetails(${recipe.id})">View Recipe</button>
            <button onclick="saveToFavorites(${recipe.id})">Save Recipe</button>
        `;

        mealSuggestionsSection.appendChild(recipeElement);
    });
}

// Display recipes from ingredient search
function displayRecipesByIngredients(recipes) {
    sortRecipes(recipes);
    const mealSuggestionsSection = document.getElementById('meal-suggestions');
    mealSuggestionsSection.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
            <p>Missed Ingredients: ${recipe.missedIngredientCount}</p>
            <button onclick="viewRecipeDetails(${recipe.id})">View Recipe</button>
            <button onclick="saveToFavorites(${recipe.id})">Save Recipe</button>
        `;

        mealSuggestionsSection.appendChild(recipeElement);
    });
}

// Fetch and display recipe details
function viewRecipeDetails(recipeId) {
    const apiUrl = `${baseUrl}/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayRecipeDetails(data);
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
        });
}

function displayRecipeDetails(recipe) {
    const mealSuggestionsSection = document.getElementById('meal-suggestions');
    const nutrients = recipe.nutrition.nutrients;

    // Find common nutrients such as calories, protein, fats, and carbohydrates
    const calories = nutrients.find(n => n.name === 'Calories');
    const protein = nutrients.find(n => n.name === 'Protein');
    const fat = nutrients.find(n => n.name === 'Fat');
    const carbs = nutrients.find(n => n.name === 'Carbohydrates');

    // Ingredients List
    const ingredientsList = recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');

    // Instructions
    let instructions = '';
    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
        instructions = recipe.analyzedInstructions[0].steps.map(step => `<li>${step.step}</li>`).join('');
    } else {
        instructions = '<p>No instructions available.</p>';
    }

    // Create HTML content for the recipe details
    const recipeDetails = `
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
            <button onclick="goBack()">Back to Results</button>
        </div>
    `;

    mealSuggestionsSection.innerHTML = recipeDetails;
}

function goBack() {
    if (document.getElementById('general-search').style.display !== 'none') {
        displayRecipes(currentRecipes);
    } else {
        displayRecipesByIngredients(currentRecipes);
    }
}

// Sorting functionality
function updateSorting() {
    const sortOption = document.getElementById('sort-select').value;
    currentSortOption = sortOption;

    if (document.getElementById('general-search').style.display !== 'none') {
        displayRecipes(currentRecipes);
    } else {
        displayRecipesByIngredients(currentRecipes);
    }
}

function sortRecipes(recipes) {
    switch (currentSortOption) {
        case 'time':
            recipes.sort((a, b) => (a.readyInMinutes || a.time) - (b.readyInMinutes || b.time));
            break;
        case 'popularity':
            recipes.sort((a, b) => (b.aggregateLikes || 0) - (a.aggregateLikes || 0));
            break;
        case 'healthiness':
            recipes.sort((a, b) => (b.healthScore || 0) - (a.healthScore || 0));
            break;
        case 'ingredients':
            if (recipes[0].usedIngredientCount !== undefined) {
                recipes.sort((a, b) => a.usedIngredientCount - b.usedIngredientCount);
            } else {
                alert('Ingredient count sorting is only available for ingredient search.');
            }
            break;
        default:
            // Default sorting (do nothing)
            break;
    }
}

// Save to Favorites
function saveToFavorites(recipeId) {
    if (!favoriteRecipes.includes(recipeId)) {
        favoriteRecipes.push(recipeId);
        alert('Recipe added to favorites!');
    } else {
        alert('Recipe is already in favorites.');
    }
    updateFavoritesSection();
}

// Update Favorites Section
function updateFavoritesSection() {
    const favoritesSection = document.getElementById('favorites-section');
    const favoritesList = document.getElementById('favorites-list');

    if (favoriteRecipes.length > 0) {
        favoritesSection.style.display = 'block';
        favoritesList.innerHTML = '';

        favoriteRecipes.forEach(recipeId => {
            const apiUrl = `${baseUrl}/${recipeId}/information?apiKey=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(recipe => {
                    const recipeElement = document.createElement('div');
                    recipeElement.classList.add('recipe');

                    recipeElement.innerHTML = `
                        <h3>${recipe.title}</h3>
                        <img src="${recipe.image}" alt="${recipe.title}" />
                        <button onclick="viewRecipeDetails(${recipe.id})">View Recipe</button>
                        <button onclick="removeFromFavorites(${recipe.id})">Remove</button>
                    `;

                    favoritesList.appendChild(recipeElement);
                })
                .catch(error => {
                    console.error('Error fetching favorite recipe:', error);
                });
        });
    } else {
        favoritesSection.style.display = 'none';
    }
}

// Remove from Favorites
function removeFromFavorites(recipeId) {
    favoriteRecipes = favoriteRecipes.filter(id => id !== recipeId);
    alert('Recipe removed from favorites.');
    updateFavoritesSection();
}