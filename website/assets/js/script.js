document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.querySelector(".btn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    function validateForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Clear any previous error messages
        emailError.textContent = "";
        passwordError.textContent = "";

        let isValid = true;

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

        // If everything is filled, process login
        if (isValid) {
            alert("Login successful!");

            // Clear form fields after submission
            emailInput.value = "";
            passwordInput.value = "";

            window.location.href = "main.html"; 
        }
    }

    loginButton.addEventListener("click", validateForm);

    // Add event listeners to the input fields for Enter key press
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
