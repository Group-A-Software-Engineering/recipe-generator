// Function to show the Sign-Up form and hide the Login form.
// This function is part of the View component as it updates the UI.
function showSignUp() {
    // Hide the login section by setting its display property to 'none'.
    document.getElementById('login-section').style.display = 'none';
    // Show the signup section by setting its display property to 'block'.
    document.getElementById('signup-section').style.display = 'block';
}

// Function to show the Login form and hide the Sign-Up form.
// This function is part of the View component as it updates the UI.
function showLogin() {
    // Hide the signup section by setting its display property to 'none'.
    document.getElementById('signup-section').style.display = 'none';
    // Show the login section by setting its display property to 'block'.
    document.getElementById('login-section').style.display = 'block';
}

// Function to handle user sign-up when the sign-up form is submitted.
// This function acts as part of the Controller component, handling user input and interactions.
function signUp() {
    // Get the username input by the user and trim any whitespace.
    const username = document.getElementById('new-username').value.trim();
    // Get the password input by the user.
    const password = document.getElementById('new-password').value;
    // Get the password confirmation input by the user.
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate that the passwords match.
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return; // Stop execution if passwords do not match.
    }

    // Validate that all fields are filled in.
    if (username === '' || password === '') {
        alert('Please fill in all fields.');
        return; // Stop execution if any field is empty.
    }


    // Simulate successful sign-up
    alert('Sign-up successful! You can now log in.');
    // Call the function to show the Login form.
    showLogin();
}
// Function to handle user login when the login form is submitted.
function login() {
   // Get the username input by the user and trim any whitespace.
   const username = document.getElementById('username').value.trim();
   // Get the password input by the user.
   const password = document.getElementById('password').value;

   // Validate that both username and password fields are filled in.
   if (username === '' || password === '') {
       alert('Please enter your username and password.');
       return; // Stop execution if any field is empty.
   }

    // Simulate successful login
    alert('Login successful!');
    // Redirect to main page
    window.location.href = 'index.html';
}