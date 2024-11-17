document.getElementById('loginButton').addEventListener('click', function() {

    const resultDiv = document.getElementById('result');
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = 'index.html';
        } else {
            resultDiv.textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const resultDiv = document.getElementById('resultDiv');
        resultDiv.textContent = 'Error en el login';
    });
});

