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
const formModificarEmpresa = document.getElementById('formModificarEmpresa');
const vercompras = document.getElementById('vercompras');
const btn_registrarcliente = document.getElementById('registrarcliente');
//Funcion editar productos

function ocultarcaja() {
    formLogin.style.display = "none";
    logout.style.display = "block";
    registrarProductoVentana.style.display = "none";
    titulo.style.display = "none";
    bienvenido.style.display = "none";
    nav.style.display = "none";
    registerButton.style.display = "none";
    loadProducts.style.display = "none";
    productContainer.style.display = "none";
    paginationContainer.style.display = "none";
    añadirProducto.style.display = "none";
    modificarDatos.style.display = "none";
    vercompras.style.display = "none";
    btn_registrarcliente.style.display = "none";
    formModificarEmpresa.style.display = "none"
}


//reseteo de la pagina
document.addEventListener('DOMContentLoaded', function(){
    //ocultarcaja();

    fetch('./serv_admin/check_sesion.php', {
        method: 'GET',
    })
     .then(response => response.json()) 
    .then((data) => {
        if (data.session) {
            ocultarcaja();
            nav.style.display='block';
            registrarProductoVentana.style.display = 'block';
            btn_registrarcliente.style.display = "block";
            añadirProducto.className = "active";
            logout.style.display = 'block';
            bienvenido.textContent = 'Sesión activa: ' + data.email;
   

        } else {
            ocultarcaja();
            console.log(data)
            bienvenido.textContent = data.error;
            titulo.style.display = "block";
            bienvenido.style.display = "block";
            nav.style.display = "block";
            registerButton.style.display = "block";
            formLogin.style.display = "block";
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
       
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "¡Logeado exitosamente!"
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

    logout.style.display = 'block';
    registrarProductoVentana.style.display = 'block';
    nav.style.display='block';
    añadirProducto.classList.add("active");
    loadProducts.classList.remove('active');
   

})


//registro de producto
document.getElementById('registerButton').addEventListener('click', function() {
    const formData = new FormData(document.getElementById('registrarProducto'));
    formData.append('registrarProducto', registrarProducto);
        
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "¡Producto añadido a la base de datos!"
      });
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
                <p>Promocion: ${product.promocion}</p>
                <p>Porcentaje: ${product.porcentaje}</p>
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
    ocultarcaja();
    productContainer.style.display = 'flex';
    loadProduct();
   
});



// logout
logout.addEventListener('click', function(){
    fetch('./serv_admin/logout.php', {
        method: 'POST',
    })
    //function handleLogout() {
        fetch('serv_admin/logout.php')
        .then(response => response.json())
        .then(data => {
            if (!data.session) {
             formLogin.style.display = 'block';
             titulo.style.display = "block";
             window.location.href ="index.html";
            }
        })
        
        .catch(error => {
            console.error('Error:', error);
            bienvenido.textContent = 'Error al cerrar sesión';
        });
    //alerta de deslogout
    //}

    logout.addEventListener('click', logout);
        
    const Toast = Swal.mixin({
       toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
    title: "Sesión cerrada correctamente."
      });
})
//eliminar producto
window.deleteProduct = function(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-danger",  // Botón de eliminar en rojo
            cancelButton: "btn btn-success"   // Botón de cancelar en verde
        },
    });

    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('idProd', id);

            fetch('./serv_admin/eliminar_productos.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log("Respuesta del servidor:", data);
                if (data.success) {
                    swalWithBootstrapButtons.fire(
                        "¡Eliminado!",
                        "El producto ha sido eliminado.",
                        "success"
                    );
                    bienvenido.textContent = data.success;
                    loadProduct();
                } else {
                    bienvenido.textContent = data.error;
                    console.error("Error:", data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                bienvenido.textContent = 'Error al eliminar producto';
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                "Cancelado",
                "El producto está seguro :)",
                "error"
            );
        }
    });
};

//editar producto
function editProduct(id) {
    const div = document.getElementById ("formModificar");


    fetch("./serv_admin/buscaruno.php?id="+id)
      .then((response) => response.json())
         
      .then((data) => {
        console.log(data)
        var product = "";
      
        product += `
         <div class="col-md-4">
                <div class="container_main">
        <form id="FormModificar">
              

                <h4>ID:</h4><input id='id' name="idProd" type="text" value= ${id}>
                <br>
                <h4>Nombre:</h4><input id='nombre' name="nombre" type="text" value= ${data.nombre}>
                <br>
                <h4>Descripcion:</h4> <input id='descripcion' name="descripcion" type="text" value= ${data.descripcion}>
                <br>
                <h4>Precio:</h4> <input id='precio' name="precio" type="text" value= ${data.precio}>
                 <br>
                <h4>Cantidad:</h4> <input id='cantidad' name="cantidad" type="text" value= ${data.cantidad}>
                <br>
                <h4>Promocion:</h4> <input type="text" id='promocion' name="promocion" value= ${data.promocion}>
                <br>
                <h4>Porcentaje:</h4> <input id='porcentaje' name="porcentaje"  type="text" value= ${data.porcentaje}>
                </div>
                <button onClick="modificar()" id="modificarProd"> Modificar </button>
              </div>
              <hr>
               
              </form>
              `;
    
        bienvenido.innerHTML = product;
      })
      .catch((error) => {
        console.error("Error", error);
      })

}

//Modificar datos de empresa
function modificar(){
    const FormModificar = document.getElementById("FormModificar")
    const formulario = new FormData(FormModificar)   
    console.log(formulario)
    fetch("./serv_admin/editar.php", {
        method: 'POST',
        body: formulario
  
      })
      
      .then((response) => response.json())
            
      .then((data) => { 
        alert(data.message);
        console.log(data)
        loadProduct()
  
      })
      .catch((error) => {
        console.error("Error", error);
      })
      modificarDatos.classList.add("active");
      loadProducts.classList.remove('active');
}

function editempresa() {
    const div = document.getElementById ("formModificar");


    fetch("./serv_admin/obtenerempresa.php")
      .then((response) => response.json())
         
      .then((data) => {
        console.log(data)
        var product = "";
      
        product += `
         <div class="col-md-4">
                <div class="container_main">
        <form id="FormModificar">
              
                <h4>Nombre:</h4><input id='nombre' name="nombre" type="text" value= ${data.nombre}>
                <br>
                <h4>Descripcion:</h4> <input id='descripcion' name="descripcion" type="text" value= ${data.descripcion}>
                <br>
                <h4>Telefono:</h4> <input id='telefono' name="telefono" type="text" value= ${data.telefono}>
                <br>
                <h4>Email:</h4> <input id='email' name="email" type="text" value= ${data.email}>
                <br>
                <h4>Direccion:</h4> <input id='direccion' name="direccion" type="text" value= ${data.direccion}>
                <br>
                <h4>Propietarios:</h4> <input id='propietarios' name="propietarios" type="text" value= ${data.propietarios}>
                <br>
                
                </div>
                <button onClick="modificarempresa()" id="modificarProd"> Modificar </button>
              </div>
              <hr>
               
              </form>
              `;
    
        bienvenido.innerHTML = product;
      })
      .catch((error) => {
        console.error("Error", error);
      })

}

modificarDatos.addEventListener('click', editempresa);



function modificarempresa() {
    const formulario = document.getElementById ("FormModificar");
    frm = new FormData(formulario);

    fetch("./serv_admin/editarempresa.php", {
        method: 'POST',
        body: frm,
        })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        alert(data.message);
      })
    
    }
    