document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgot-password-form');
    const resetButton = document.getElementById('reset-button');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    resetButton.addEventListener('click', function() {
        // Clear previous error messages
        emailError.textContent = '';

        // Simple client-side validation
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Please enter your email address.';
            return;
        }

        // Here you would typically send the email to your server
        // For demonstration purposes, we'll show a success message
        alert('Reset link sent to ' + emailInput.value);

        // Optionally clear the form
        form.reset();

    });
});
