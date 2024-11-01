function showSignUp() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

function signUp() {
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

    // Simulate successful sign-up
    alert('Sign-up successful! You can now log in.');
    showLogin();
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Please enter your username and password.');
        return;
    }

    // Simulate successful login
    alert('Login successful!');
    // Redirect to main page
    window.location.href = 'index.html';
}