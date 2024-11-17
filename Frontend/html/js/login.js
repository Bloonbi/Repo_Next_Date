

const paginationContainer = document.getElementById('paginationContainer');
const loadProducts = document.getElementById('loadProducts');
document.addEventListener('DOMContentLoaded', function(){
    console.log('1')    
function setupPagination(totalPages, currentPage) {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true;
        }
        pageButton.addEventListener('click', function() {
            loadProduct(i);
        });
        paginationContainer.appendChild(pageButton);
    }
}

    fetch(`./js/listar_productosfront.php?page=${page}`, {
        method: 'GET',
    })
     .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }) 
    .then(data => {
        if (data.session) {
            bienvenido.textContent = 'Sesión activa: ' + data.email;

            formLogin.style.display = "none"; 
            titulo.style.display = "none";
            logout.style.display = 'block';
            registrarProductoVentana.style.display = 'block';
            añadirProducto.className = "active";
            nav.style.display='block';

        } else {
            console.log(data)
          
        }
        setupPagination(data.totalPages, data.currentPage);
    })
    .catch(error => {
        console.error('Error:', error);
    })
});

function setupPagination(totalPages, currentPage) {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true;
        }
        pageButton.addEventListener('click', function() {
            loadProduct(i);
        });
        paginationContainer.appendChild(pageButton);
    }
}


