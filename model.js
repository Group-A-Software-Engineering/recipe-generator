// model.js

const apiKey = '86cf816133634503a620bfab3fbd7463';
const baseUrl = 'https://api.spoonacular.com/recipes';

// The Model module handles data operations and business logic.
const Model = (() => {
    let currentRecipes = [];
    let favoriteRecipes = [];

    // Fetch recipes based on query and dietary preferences.
    const fetchRecipes = async (query, diets) => {
        // Construct the API URL with query parameters.
        let apiUrl = `${baseUrl}/complexSearch?query=${encodeURIComponent(query)}&apiKey=${apiKey}&addRecipeInformation=true&number=6`;
        if (diets) {
            apiUrl += `&diet=${encodeURIComponent(diets)}`;
        }
        // Fetch data from the API.
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        // Update current recipes.
        currentRecipes = data.results;
        return currentRecipes;
    };

    // Fetch recipes based on ingredients.
    const fetchRecipesByIngredients = async (ingredients) => {
        // Construct the API URL with ingredients.
        const apiUrl = `${baseUrl}/findByIngredients?ingredients=${encodeURIComponent(ingredients.join(','))}&apiKey=${apiKey}&number=6&ranking=2`;
        // Fetch data from the API.
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        // Update current recipes.
        currentRecipes = data;
        return currentRecipes;
    };

    // Fetch detailed information about a specific recipe.
    const fetchRecipeDetails = async (recipeId) => {
        // Construct the API URL with the recipe ID.
        const apiUrl = `${baseUrl}/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`;
        // Fetch data from the API.
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return await response.json();
    };

    // Add a recipe to the favorites list.
    const addToFavorites = (recipeId) => {
        if (!favoriteRecipes.includes(recipeId)) {
            favoriteRecipes.push(recipeId);
        }
    };

    // Remove a recipe from the favorites list.
    const removeFromFavorites = (recipeId) => {
        favoriteRecipes = favoriteRecipes.filter(id => id !== recipeId);
    };

    // Get the list of current recipes.
    const getCurrentRecipes = () => currentRecipes;

    // Get the list of favorite recipes.
    const getFavoriteRecipes = () => favoriteRecipes;

    // Register a new user with a username and password.
    const registerUser = async (username, password) => {
        // Retrieve existing users from localStorage.
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            // If the username already exists, throw an error.
            throw new Error('User already exists');
        }
        // Hash the password before storing.
        const passwordHash = await hashPassword(password);
        // Store the new user with the hashed password.
        users[username] = passwordHash;
        localStorage.setItem('users', JSON.stringify(users));
    };

    // Authenticate a user with a username and password.
    const authenticateUser = async (username, password) => {
        // Retrieve existing users from localStorage.
        let users = JSON.parse(localStorage.getItem('users')) || {};
        // Hash the provided password to compare.
        const passwordHash = await hashPassword(password);
        // Check if the username exists and the hashes match.
        return users[username] && users[username] === passwordHash;
    };

    // Hash the password using the Web Cryptography API.
    const hashPassword = async (password) => {
        // Create a TextEncoder to encode the password string.
        const encoder = new TextEncoder();
        // Encode the password into a Uint8Array.
        const data = encoder.encode(password);
        // Compute the hash using SHA-256 algorithm.
        const hash = await crypto.subtle.digest('SHA-256', data);
        // Convert the hash buffer into an array of bytes.
        const hashArray = Array.from(new Uint8Array(hash));
        // Convert bytes to a hexadecimal string.
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        // Return the hexadecimal hash string.
        return hashHex;
    };

    return {
        fetchRecipes,
        fetchRecipesByIngredients,
        fetchRecipeDetails,
        addToFavorites,
        removeFromFavorites,
        getCurrentRecipes,
        getFavoriteRecipes,
        registerUser,
        authenticateUser,
    };
})();