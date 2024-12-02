// model.js

const apiKey = '32f55694f3244f7c95847b4f9e20c743';
const baseUrl = 'https://api.spoonacular.com/recipes';

const Model = (() => {
    let currentRecipes = [];
    let favoriteRecipes = [];

    // Fetch recipes based on query and diets
    const fetchRecipes = async (query, diets) => {
        let apiUrl = `${baseUrl}/complexSearch?query=${encodeURIComponent(query)}&apiKey=${apiKey}&addRecipeInformation=true&number=6`;
        if (diets) {
            apiUrl += `&diet=${encodeURIComponent(diets)}`;
        }
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        currentRecipes = data.results;
        return currentRecipes;
    };

    // Fetch recipes based on ingredients
    const fetchRecipesByIngredients = async (ingredients) => {
        const apiUrl = `${baseUrl}/findByIngredients?ingredients=${encodeURIComponent(ingredients.join(','))}&apiKey=${apiKey}&number=6&ranking=2`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        currentRecipes = data;
        return currentRecipes;
    };

    // Fetch recipe details
    const fetchRecipeDetails = async (recipeId) => {
        const apiUrl = `${baseUrl}/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return await response.json();
    };

    // Manage favorites
    const addToFavorites = (recipeId) => {
        if (!favoriteRecipes.includes(recipeId)) {
            favoriteRecipes.push(recipeId);
        }
    };

    const removeFromFavorites = (recipeId) => {
        favoriteRecipes = favoriteRecipes.filter(id => id !== recipeId);
    };

    // Getters
    const getCurrentRecipes = () => currentRecipes;
    const getFavoriteRecipes = () => favoriteRecipes;

    // User data storage
    const registerUser = async (username, password) => {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            throw new Error('User already exists');
        }
        const passwordHash = await hashPassword(password);
        users[username] = passwordHash;
        localStorage.setItem('users', JSON.stringify(users));
    };

    const authenticateUser = async (username, password) => {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        const passwordHash = await hashPassword(password);
        return users[username] && users[username] === passwordHash;
    };

    // Password hashing function
    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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