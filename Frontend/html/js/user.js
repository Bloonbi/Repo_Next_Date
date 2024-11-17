document.addEventListener('DOMContentLoaded', 
    
    
    function() {
    fetch('/cafeteria/html/php/validar.php', {
        method: 'POST',
    
    })
    .then(response => response.json())
    .then(data => {
    
        console.log(data);
        if (data.success) {
           
            document.getElementById('nomusuario').textContent = data.cliente;
            document.getElementById('login-link').style.display = 'none';
            document.getElementById('register-link').style.display = 'none';
            document.getElementById('user-options').style.display = 'block';
    
    
    
        } else {
            
            document.getElementById('login-link').style.display = 'block';
            document.getElementById('register-link').style.display = 'block';
            document.getElementById('user-options').style.display = 'none';
        }
    })
    .catch(error => {
    
     return false;
    
    });
    });