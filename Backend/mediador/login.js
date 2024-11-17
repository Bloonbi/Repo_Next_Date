const bienvenido = document.getElementById('bienvenido');
const formLogin = document.getElementById('formlogin');
const titulo = document.getElementById('titulo');
const registrarProductoVentana = document.getElementById('registrarProductoVentana');
const nav = document.getElementById('nav');
const logout = document.getElementById('logout');
const registerButton = document.getElementById('registerButton');
const loadProducts = document.getElementById('loadProducts');
const productContainer = document.getElementById('productContainer');
const paginationContainer = document.getElementById('paginationContainer');
const añadirProducto = document.getElementById('añadirProducto');
const modificarDatos = document.getElementById('modificarDatos');


//Funcion editar productos

//reseteo de la pagina
document.addEventListener('DOMContentLoaded', function(){
    console.log('1')

    fetch('./serv_admin/check_sesion.php', {
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
            bienvenido.textContent = data.error;
        }
        setupPagination(data.totalPages, data.currentPage);
    })
    .catch(error => {
        console.error('Error:', error);
        bienvenido.textContent = 'Error en el login';
    })

       

    });
// login
document.getElementById('loginButton').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const formData = new FormData();
    formData.append('email', email); 
    formData.append('password', password);

    fetch('./serv_admin/login.php', {
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
            bienvenido.textContent = 'Sesión activa: ' + data.user.email;
            formLogin.style.display = "none"; 
            titulo.style.display = "none";
            logout.style.display = 'block';
            registrarProductoVentana.style.display = 'block';
            añadirProducto.className = "active";
            nav.style.display='block';
            Swal.fire({
                title: 'Sesion iniciada',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } else {
            bienvenido.textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        bienvenido.textContent = 'Error en el login';
    });
});


 //añadir producto
añadirProducto.addEventListener('click', function(){
    
    formLogin.style.display = "none"; 
    titulo.style.display = "none";
    logout.style.display = 'block';
    productContainer.style.display = 'none';
    paginationContainer.style.display = 'none';
    registrarProductoVentana.style.display = 'block';
    nav.style.display='block';
    añadirProducto.className = "active";
    loadProducts.classList.remove('active');
    
})


//registro de producto
document.getElementById('registerButton').addEventListener('click', function() {
    const formData = new FormData(document.getElementById('registrarProducto'));
    formData.append('registrarProducto', registrarProducto);
fetch('./serv_admin/agregarproductos.php', {
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
    // respuesta al grabar producto
    bienvenido.textContent = 'Guardado correctamente';
    document.getElementById('registrarProducto').reset();
  
      } else {
        bienvenido.textContent = data.error;
    }
})
.catch(error => {
    console.error('Error:', error);
    bienvenido.textContent = 'Error al guardar el producto';
});
})
//Funcion para cargar producto
function loadProduct(page = 1) {
    fetch(`./serv_admin/listar_productos.php?page=${page}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            bienvenido.textContent = 'Error al cargar productos';
            return;
        }
    //Exito, Construccion de objetos
    
        productContainer.innerHTML = '';
        data.producto.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <p>Precio: $${product.precio}</p>
                <p>Cantidad: ${product.cantidad}</p>
                <img src="serv_admin/${product.imagen}" alt="${product.nombre}">
                <br>
                <button onclick="editProduct(${product.idProd})">Editar</button>
                <button onclick="deleteProduct(${product.idProd})">Eliminar</button>
            `;
            productContainer.appendChild(productElement);
            paginationContainer.style.display = "block";
            loadProducts.className = "active";
            añadirProducto.classList.remove('active');
           
        });
//Funcion para eliminar producto
        window.deleteProduct = function(id) {
            if (confirm('¿Está seguro de que desea eliminar este producto?')) {
                const formData = new FormData();
                formData.append('idProd', id);
    
                fetch('./serv_admin/eliminar_productos.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        bienvenido.textContent = data.success;
                        loadProduct();
                    } else {
                        bienvenido.textContent = data.error;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    bienvenido.textContent = 'Error al eliminar producto';
                });
            }
        }

//reseteo de la pagina
/*
document.addEventListenerDOMContentLoaded('', function(){
    console.log('2')

    fetch('./serv_admin/check_sesion.php', {
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
            bienvenido.textContent = 'Sesión activa: ' + data.admins.email;
            formLogin.style.display = "none";
            titulo.style.display = "none";
            logout.style.display = 'block';
            registrarProductoVentana.style.display = 'block';
            nav.style.display='block';
            añadirProducto.className = "active";
            loadProducts.classList.remove('active');

        } else {
            console.log(data)
            bienvenido.textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        bienvenido.textContent = 'Error en el login';
    });


}) */


//Comienza codigo para paginacion
        setupPagination(data.totalPages, data.currentPage);
    })
    .catch(error => {
        console.error('Error:', error);
        bienvenido.textContent = 'Error al cargar productos';
    });
}

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

loadProducts.addEventListener('click', function() {
    registrarProductoVentana.style.display = 'none';
    productContainer.style.display = 'flex';
    loadProduct();
    
});
// logout
logout.addEventListener('click', function(){
    fetch('./serv_admin/logout.php', {
        method: 'POST',
    })
    function handleLogout() {
        fetch('serv_admin/logout.php')
        .then(response => response.json())
        .then(data => {
            if (!data.session) {
             formLogin.style.display = 'block';
             nav.style.display = 'none';
             registrarProductoVentana.style.display = 'none';
             titulo.style.display = "block";
             productContainer.style.display = 'none';
             window.location.href ="index.html";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            bienvenido.textContent = 'Error al cerrar sesión';
        });
    }

    logout.addEventListener('click', handleLogout);
})