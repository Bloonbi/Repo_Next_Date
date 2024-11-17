const bienvenido = document.getElementById('bienvenido');
const formLogin = document.getElementById('formlogin');
const logoutButton = document.getElementById('logoutButton');
const titulo = document.getElementById('titulo');
const registrarProductoVentana = document.getElementById('registrarProductoVentana');
const nav = document.getElementById('nav');
const logout = document.getElementById('logout');
const registerButton = document.getElementById('registerButton');


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
            logoutButton.style.display = 'none';
            registrarProductoVentana.style.display = 'block';
            nav.style.display='block';
        } else {
            bienvenido.textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        bienvenido.textContent = 'Error en el login';
    });
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
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error al cerrar sesión';
        });
    }

    logout.addEventListener('click', handleLogout);
})


//registro de producto
document.getElementById('registerButton').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    const formData = new FormData();
    formData.append('nombre', nombre); 
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('cantidad', cantidad);

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
    
    
    
    } else {
        bienvenido.textContent = data.error;
    }
})
.catch(error => {
    console.error('Error:', error);
    bienvenido.textContent = 'Error al guardar el producto';
});
})