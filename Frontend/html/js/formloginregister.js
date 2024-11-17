
$(document).ready(function() {
    const botonregistrar = document.getElementById('botonregistrar');
   
    
    registerButton.addEventListener('click', function() {
        const formData = new FormData(document.getElementById('registerForm'));
        formData.append('action', 'create');

        fetch('../php/register.php', {
            
            method: 'POST',
            body: formData
        });
});
});
