// Toggle between Sign In and Sign Up forms
const sign_in_link = document.querySelector("#sign-in-link");
const sign_up_link = document.querySelector("#sign-up-link");
const container = document.querySelector(".container");

sign_up_link.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_link.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// Handle Sign In Form Submission
const signInForm = document.getElementById('sign-in-form');
signInForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Basic validation (you can replace this with real authentication logic)
    if (username && password) {
        // Redirect to dashboard after successful login
        window.location.href = 'dashboard.html';
    } else {
        alert('Please enter both username and password.');
    }
});

// Handle Sign Up Form Submission
const signUpForm = document.getElementById('sign-up-form');
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Basic validation (you can replace this with real sign-up logic)
    if (username && email && password) {
        // Redirect to welcome page after successful sign-up
        window.location.href = 'welcome.html';
    } else {
        alert('Please fill in all fields.');
    }
});
