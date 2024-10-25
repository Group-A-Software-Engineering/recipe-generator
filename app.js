const apiKey = 'YOUR_SPOONACULAR_API_KEY'; // Replace with your actual Spoonacular API key
const baseUrl = 'https://api.spoonacular.com/recipes';

// Search for recipes based on user input
function searchRecipes() {
    const query = document.getElementById('search-bar').value;
    const apiUrl = `${baseUrl}/complexSearch?query=${query}&apiKey=${apiKey}&addRecipeInformation=true&number=5`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.results);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

// Display recipes in HTML
function displayRecipes(recipes) {
    const mealSuggestionsSection = document.getElementById('meal-suggestions');
    mealSuggestionsSection.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <p>${recipe.summary}</p>
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
            <button onclick="viewRecipeDetails(${recipe.id})">View Recipe</button>
            <button onclick="saveRecipe(${recipe.id}, '${recipe.title}')">Save Recipe</button>
        `;

        mealSuggestionsSection.appendChild(recipeElement);
    });
}

// Fetch and display recipe details
function viewRecipeDetails(recipeId) {
    const apiUrl = `${baseUrl}/${recipeId}/information?apiKey=${apiKey}`;

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
    mealSuggestionsSection.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p>${recipe.instructions}</p>
        <p>Calories: ${recipe.nutrition.nutrients[0].amount}</p>
        <button onclick="goBack()">Back to Results</button>
    `;
}

function goBack() {
    searchRecipes();
}

// Calculate calories based on servings
function calculateCalories() {
    const servings = document.getElementById('servings').value;
    const caloriesPerServing = 500; // Replace with real data from the recipe
    const totalCalories = servings * caloriesPerServing;
    document.getElementById('calorie-result').textContent = `Total Calories: ${totalCalories}`;
}

// Generate a random meal
function generateRandomMeal() {
    const apiUrl = `${baseUrl}/random?apiKey=${apiKey}&number=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const recipe = data.recipes[0];
            displayRandomMeal(recipe);
        })
        .catch(error => {
            console.error('Error fetching random meal:', error);
        });
}

function displayRandomMeal(recipe) {
    const randomMealSection = document.getElementById('random-meal-result');
    randomMealSection.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p>${recipe.instructions}</p>
    `;
}

// Save recipes using local storage
function saveRecipe(recipeId, recipeTitle) {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes.push({ id: recipeId, title: recipeTitle });
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    displaySavedRecipes();
}

function displaySavedRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    const savedSection = document.getElementById('saved-recipes');
    savedSection.innerHTML = '<h2>Your Saved Recipes</h2>';

    savedRecipes.forEach(recipe => {
        savedSection.innerHTML += `<p>${recipe.title}</p>`;
    });
}