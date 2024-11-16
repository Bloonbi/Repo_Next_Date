document.addEventListener('DOMContentLoaded', function() {

const botonregistrar = document.getElementById('botonregistrar');
const resultDiv = document.getElementById('register-message');
const formulario= document.getElementById('registerForm');
   
    
    botonregistrar.addEventListener('click', function() {
        const formData = new FormData(formulario);
        alert(formData);
        /*formData.append('action', 'create');

        fetch('../php/register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resultDiv.textContent = 'Sesión activa: ' + data.user.username;
            } else {
                resultDiv.textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error al crear usuario';
       });*/
});
});