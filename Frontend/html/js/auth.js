document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    const showError = (message, element) => {
        element.innerHTML = message;
        element.style.color = 'red';
    };

    const showSuccess = (message, element) => {
        element.innerHTML = message;
        element.style.color = 'green';
    };

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('../php/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'email': email,
                    'password': password
                })
            });
            const data = await response.text();
            if (data.includes('success')) {
                showSuccess('Login successful!', loginMessage);
                $('#loginModal').modal('hide');
                document.getElementById('login-link').style.display = 'none';
                document.getElementById('register-link').style.display = 'none';
                document.getElementById('user-options').style.display = 'block';
            } else {
                showError(data, loginMessage);
            }
        } catch (error) {
            showError('An error occurred. Please try again.', loginMessage);
        }
    });

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch('../php/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'name': name,
                    'email': email,
                    'password': password
                })
            });
            const data = await response.text();
            if (data.includes('success')) {
                showSuccess('Registration successful!', registerMessage);
                $('#registerModal').modal('hide');
                document.getElementById('login-link').style.display = 'none';
                document.getElementById('register-link').style.display = 'none';
                document.getElementById('user-options').style.display = 'block';
            } else {
                showError(data, registerMessage);
            }
        } catch (error) {
            showError('An error occurred. Please try again.', registerMessage);
        }
    });
});
