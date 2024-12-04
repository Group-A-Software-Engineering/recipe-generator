// controller.js

// The Controller module handles user interactions and communicates between the View and the Model.
const Controller = (() => {
    let currentSortOption = '';

    // Initialize event listeners and check login status.
    const init = () => {
        // Event listeners for index.html
        if (document.getElementById('toggle-search-mode')) {
            // Add event listener for toggling search mode.
            document.getElementById('toggle-search-mode').addEventListener('click', handleToggleSearchMode);
            // Add event listener for general search button.
            document.getElementById('search-button').addEventListener('click', handleSearch);
            // Add event listener for ingredient search button.
            document.getElementById('ingredient-search-button').addEventListener('click', handleIngredientSearch);
            // Add event listener for sorting options.
            document.getElementById('sort-select').addEventListener('change', handleSorting);
            // Add event listener for clicks in meal suggestions section.
            document.getElementById('meal-suggestions').addEventListener('click', handleMealSuggestionsClick);
            // Add event listener for clicks in favorites list.
            document.getElementById('favorites-list').addEventListener('click', handleFavoritesClick);
        }

        // Event listeners for login and signup forms
        if (document.getElementById('login-form')) {
            // Add event listener for login form submission.
            document.getElementById('login-form').addEventListener('submit', handleLogin);
        }
        if (document.getElementById('signup-form')) {
            // Add event listener for signup form submission.
            document.getElementById('signup-form').addEventListener('submit', handleSignUp);
        }

        // Event listeners for showing signup and login sections
        const showSignUpLink = document.getElementById('show-signup');
        if (showSignUpLink) {
            // Add event listener for "Sign Up" link click.
            showSignUpLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Call View function to display the signup form.
                View.showSignUp();
            });
        }
        const showLoginLink = document.getElementById('show-login');
        if (showLoginLink) {
            // Add event listener for "Login" link click.
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Call View function to display the login form.
                View.showLogin();
            });
        }

        // Check if user is logged in by checking localStorage.
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            // Update the View to reflect logged-in status.
            View.updateLoginStatus(currentUser);
        }

        // Add logout event listener if logout link exists.
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            // Add event listener for logout link click.
            logoutLink.addEventListener('click', handleLogout);
        }
    };

    // Toggle search mode between general search and ingredient search.
    const handleToggleSearchMode = () => {
        const generalSearch = document.getElementById('general-search');
        const ingredientSearch = document.getElementById('ingredient-search');
        const toggleButton = document.getElementById('toggle-search-mode');
        if (generalSearch.style.display === 'none') {
            // Show general search and hide ingredient search.
            generalSearch.style.display = 'flex';
            ingredientSearch.style.display = 'none';
            toggleButton.textContent = 'Switch to Ingredient Search';
        } else {
            // Show ingredient search and hide general search.
            generalSearch.style.display = 'none';
            ingredientSearch.style.display = 'flex';
            toggleButton.textContent = 'Switch to General Search';
        }
    };

    // Handle general search when user clicks the search button.
    const handleSearch = async () => {
        const query = document.getElementById('search-bar').value;
        const dietSelect = document.getElementById('diet-select');
        const selectedDiets = Array.from(dietSelect.selectedOptions).map(option => option.value).join(',');

        try {
            // Call Model function to fetch recipes based on query and diets.
            const recipes = await Model.fetchRecipes(query, selectedDiets);
            if (recipes.length > 0) {
                // Call View function to display the recipes.
                View.displayRecipes(recipes, currentSortOption);
            } else {
                alert("No recipes found for your query.");
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            alert("There was an error fetching the recipes. Please try again later.");
        }
    };

    // Handle ingredient search when user clicks the search button.
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
            // Call Model function to fetch recipes based on ingredients.
            const recipes = await Model.fetchRecipesByIngredients(ingredients);
            if (recipes.length > 0) {
                // Call View function to display the recipes.
                View.displayRecipesByIngredients(recipes, currentSortOption);
            } else {
                alert("No recipes found with the specified ingredients.");
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            alert("There was an error fetching the recipes. Please try again later.");
        }
    };

    // Handle clicks in the meal suggestions section.
    const handleMealSuggestionsClick = async (event) => {
        const viewButton = event.target.closest('.view-recipe-button');
        const saveButton = event.target.closest('.save-recipe-button');
        const backButton = event.target.closest('#back-button');

        if (viewButton) {
            // User clicked "View Recipe" button.
            const recipeId = viewButton.getAttribute('data-id');
            // Call function to view recipe details.
            handleViewRecipeDetails(recipeId);
        } else if (saveButton) {
            // User clicked "Save Recipe" button.
            const recipeId = saveButton.getAttribute('data-id');
            // Call function to save recipe to favorites.
            handleSaveToFavorites(recipeId);
        } else if (backButton) {
            // User clicked "Back to Results" button.
            handleGoBack();
        }
    };

    // Handle clicks in the favorites list.
    const handleFavoritesClick = async (event) => {
        const viewButton = event.target.closest('.view-recipe-button');
        const removeButton = event.target.closest('.remove-recipe-button');

        if (viewButton) {
            // User clicked "View Recipe" button in favorites.
            const recipeId = viewButton.getAttribute('data-id');
            // Call function to view recipe details.
            handleViewRecipeDetails(recipeId);
        } else if (removeButton) {
            // User clicked "Remove" button in favorites.
            const recipeId = removeButton.getAttribute('data-id');
            // Call function to remove recipe from favorites.
            handleRemoveFromFavorites(recipeId);
        }
    };

    // View detailed information about a recipe.
    const handleViewRecipeDetails = async (recipeId) => {
        try {
            // Call Model function to fetch recipe details.
            const recipe = await Model.fetchRecipeDetails(recipeId);
            // Call View function to display recipe details.
            View.displayRecipeDetails(recipe);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    // Save a recipe to the favorites list.
    const handleSaveToFavorites = async (recipeId) => {
        // Call Model function to add recipe to favorites.
        Model.addToFavorites(recipeId);
        alert('Recipe added to favorites!');
        // Update the favorites section in the View.
        await updateFavoritesSection();
    };

    // Remove a recipe from the favorites list.
    const handleRemoveFromFavorites = async (recipeId) => {
        // Call Model function to remove recipe from favorites.
        Model.removeFromFavorites(recipeId);
        alert('Recipe removed from favorites.');
        // Update the favorites section in the View.
        await updateFavoritesSection();
    };

    // Go back to the previous results view.
    const handleGoBack = () => {
        // Get the current recipes from the Model.
        const currentRecipes = Model.getCurrentRecipes();
        if (document.getElementById('general-search').style.display !== 'none') {
            // If general search is active, display general recipes.
            View.displayRecipes(currentRecipes, currentSortOption);
        } else {
            // If ingredient search is active, display recipes by ingredients.
            View.displayRecipesByIngredients(currentRecipes, currentSortOption);
        }
    };

    // Handle sorting of recipes when the sort option changes.
    const handleSorting = () => {
        currentSortOption = document.getElementById('sort-select').value;
        const currentRecipes = Model.getCurrentRecipes();
        if (document.getElementById('general-search').style.display !== 'none') {
            // Update View with sorted general recipes.
            View.displayRecipes(currentRecipes, currentSortOption);
        } else {
            // Update View with sorted recipes by ingredients.
            View.displayRecipesByIngredients(currentRecipes, currentSortOption);
        }
    };

    // Update the favorites section with the latest favorite recipes.
    const updateFavoritesSection = async () => {
        const favoriteRecipeIds = Model.getFavoriteRecipes();
        if (favoriteRecipeIds.length > 0) {
            const favoriteRecipes = [];
            for (let recipeId of favoriteRecipeIds) {
                try {
                    // Fetch recipe details for each favorite recipe.
                    const recipe = await Model.fetchRecipeDetails(recipeId);
                    favoriteRecipes.push(recipe);
                } catch (error) {
                    console.error('Error fetching favorite recipe:', error);
                }
            }
            // Update View with the list of favorite recipes.
            View.updateFavoritesSection(favoriteRecipes);
        } else {
            // If no favorites, update View accordingly.
            View.updateFavoritesSection([]);
        }
    };

    // Handle user login when the login form is submitted.
    const handleLogin = async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (username === '' || password === '') {
            alert('Please enter your username and password.');
            return;
        }

        // Call Model function to authenticate user credentials.
        const authenticated = await Model.authenticateUser(username, password);
        if (authenticated) {
            // If authentication is successful:
            alert('Login successful!');
            // Store the current user in localStorage.
            localStorage.setItem('currentUser', username);
            // Redirect to the main page.
            window.location.href = 'index.html';
        } else {
            // If authentication fails:
            alert('Invalid username or password.');
        }
    };

    // Handle user signup when the signup form is submitted.
    const handleSignUp = async (event) => {
        event.preventDefault();
        const username = document.getElementById('new-username').value.trim();
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return;
        }

        try {
            // Call Model function to register a new user.
            await Model.registerUser(username, password);
            alert('Sign-up successful! You can now log in.');
            // Call View function to show the login form.
            View.showLogin();
        } catch (error) {
            // If registration fails (e.g., username already exists):
            alert(error.message);
        }
    };

    // Handle user logout when the logout link is clicked.
    const handleLogout = () => {
        // Remove the current user from localStorage.
        localStorage.removeItem('currentUser');
        alert('Logged out successfully.');
        // Update the View to reflect logged-out status.
        View.updateLoginStatus(null);
    };

    return {
        init,
    };
})();

// Initialize the Controller when the script loads.
Controller.init();