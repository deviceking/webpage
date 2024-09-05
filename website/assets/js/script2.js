// script.js
document.addEventListener("DOMContentLoaded", function() {
    const signupButton = document.getElementById("signup-button");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    function validateForm() {
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Clear any previous error messages
        usernameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";

        let isValid = true;

        // Check if username is empty
        if (!username) {
            usernameError.textContent = "Fill your username!";
            isValid = false;
        }

        // Check if email is empty
        if (!email) {
            emailError.textContent = "Fill your email!";
            isValid = false;
        }

        // Check if password is empty
        if (!password) {
            passwordError.textContent = "Fill your password!";
            isValid = false;
        }

        // If everything is filled, process signup
        if (isValid) {
            alert("Sign Up successful!");

            // Clear form fields after submission
            usernameInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";
        }
    }

    signupButton.addEventListener("click", validateForm);

    // Add event listeners to the input fields for Enter key press
    usernameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission
            validateForm();
        }
    });

    emailInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission
            validateForm();
        }
    });

    passwordInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission
            validateForm();
        }
    });
});
