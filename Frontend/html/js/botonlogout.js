 const logout = document.getElementById('logout-link') 
 const resultDiv = document.getElementById('result');
 logout.addEventListener('click', function() {
      

        fetch('/cafeteria/html/php/logout.php', {
            method: 'GET'

        
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
  
                window.location.reload();
                
            } else {

                resultDiv.textContent = data.error;
            }
            
        })
        .catch(error => {
            resultDiv.textContent = 'Error al crear usuario';


        });
    })