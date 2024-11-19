const bienvenido = document.getElementById('bienvenido');
const formLogin = document.getElementById('formlogin');
const titulo = document.getElementById('titulo');
const registrarProductoVentana = document.getElementById('registrarProductoVentana');
const nav = document.getElementById('nav');
const logout = document.getElementById('logout');
const registerButton = document.getElementById('registerButton');
const verProductos = document.getElementById('verProductos');
const productContainer = document.getElementById('productContainer');
const paginationContainer = document.getElementById('paginationContainer');
const añadirProducto = document.getElementById('añadirProducto');
const modificarDatos = document.getElementById('modificarDatos');
const formModificarEmpresa = document.getElementById('formModificarEmpresa');
const bienv = document.getElementById('bienv');
const four = document.getElementById('four');
const tituloProductos = document.getElementById('tituloProductos')

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
            formModificarEmpresa.style.display = "none";
            nav.style.display='block';

            añadirProducto.className = "active";
            modificarDatos.className = "";
            verProductos.className = "";
            

            // aviso logueado
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

    formLogin.style.display = "none"; 
    titulo.style.display = "none";
    logout.style.display = 'block';
    productContainer.style.display = 'none';
    paginationContainer.style.display = 'none';
    registrarProductoVentana.style.display = 'block';
    nav.style.display='block';
    formModificarEmpresa.style.display = "none";
    four.style.display = 'block';
    bienv.style.display ='block';
    tituloProductos.style.display ='none';

    añadirProducto.className = "active";
    modificarDatos.className = "";
    verProductos.className = "";
   
})



function mdf(){
    const nombremod = document.getElementById("nombremod");
    const descripcionmod = document.getElementById("descripcionmod");
    const direccion = document.getElementById("direccion");
    const emailmod = document.getElementById("emailmod");
    const telefono = document.getElementById("telefono");
    const propietarios = document.getElementById("propietarios");
    
    fetch('./serv_admin/obtenerdatosempresa.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        nombremod.value=data.nombre;
        descripcionmod.value=data.descripcion;
        direccion.value=data.direccion;
        telefono.value=data.telefono;
        emailmod.value=data.email;
        propietarios.value=data.propietarios;


    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un error con la conexión al servidor.");
    });
    
}

// modificar datos de empresa
modificarDatos.addEventListener('click', mdf);

    modificarDatos.addEventListener('click', function(){

        formLogin.style.display = "none"; 
        bienvenido.style.display = "none";
        titulo.style.display = "none";
        logout.style.display = 'block';
        bienv.style.display = 'none';
        four.style.display = 'none';
        productContainer.style.display = 'none';
        paginationContainer.style.display = 'none';
        registrarProductoVentana.style.display = 'none';
        nav.style.display='block';
        añadirProducto.style.display = "block"; 
        verProductos.style.display = "block";
        formModificarEmpresa.style.display = "block";
        
        modificarDatos.className = "active";
        añadirProducto.className = "";
        verProductos.className = "";
    
    })


document.getElementById("btn_modificarDatos").addEventListener("click", function() {
    // Capturar los valores del formulario
    const nombremod = document.getElementById("nombremod").value;
    const descripcionmod = document.getElementById("descripcionmod").value;
    const direccion = document.getElementById("direccion").value;
    const emailmod = document.getElementById("emailmod").value;
    const telefono = document.getElementById("telefono").value;
    const propietarios = document.getElementById("propietarios").value;
    // Crear un objeto con los datos modificados
    const datosEmpresa = {
        nombremod: nombremod,
        descripcionmod: descripcionmod,
        direccion: direccion,
        emailmod: emailmod,
        telefono: telefono,
        propietarios: propietarios,
    };

    // Hacer una solicitud POST al servidor para guardar los datos
    fetch("./serv_admin/modificarempresa.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosEmpresa)
    })
   .then(response => response.json())
    .then(data => {
        console.log(data);
   
         // aviso modificar datos de la empresa
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
            title: "Datos modificados correctamente!"
          });
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un error con la conexión al servidor.");
    });
    setTimeout(mdf,2000)
});


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
    document.getElementById('formModificarEmpresa');
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
function verProducto(page = 1) {
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
            bienv.style.display = 'none';
            tituloProductos.style.display = 'block';
            
            verProductos.className = "active";
            añadirProducto.classList.remove('active');
           
        });



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
            verProducto(i);
        });
        paginationContainer.appendChild(pageButton);
    }
    
}

//ver productos
verProductos.addEventListener('click', function() {
    registrarProductoVentana.style.display = 'none';
    productContainer.style.display = 'flex';
    formLogin.style.display = "none"; 
    bienvenido.style.display = "none";
    titulo.style.display = "none";
    logout.style.display = 'block';
    paginationContainer.style.display = 'block';
    registrarProductoVentana.style.display = 'none';
    nav.style.display='block';
    añadirProducto.style.display = "block"; 
    verProductos.style.display = "block";
    formModificarEmpresa.style.display = "none";
    four.style.display = 'block';

    verProductos.className = "active";
    modificarDatos.className = "";
    añadirProducto.className = "";
    verProducto();
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
                    verProducto();
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
              

                <h4>ID:</h4><input id='id' name="idProd" type="text" value="${id}">
                <br>
                <h4>Nombre:</h4><input id='nombre' name="nombre" type="text" value="${data.nombre}">
                <br>
                <h4>Descripcion:</h4> <input id='descripcion' name="descripcion" type="text" value="${data.descripcion}">
                <br>
                <h4>Precio:</h4> <input id='precio' name="precio" type="text" value="${data.precio}">
                 <br>
                <h4>Cantidad:</h4> <input id='cantidad' name="cantidad" type="text" value="${data.cantidad}">
                <br>
                <h4>Promocion:</h4> <input type="text" id='promocion' name="promocion" value="${data.promocion}">
                <br>
                <h4>Porcentaje:</h4> <input id='porcentaje' name="porcentaje"  type="text" value="${data.porcentaje}">
                </div>
                <button onClick="modificar()" id="modificarProd"> Modificar Producto </button>
              </div>
              <hr>
               
              </form>
              `;
    
        bienvenido.innerHTML = product;
        productContainer.style.display = 'none';
        bienvenido.style.display = "block";
        tituloProductos.style.display = 'none';
          })

      .catch((error) => {
        consproductContainer.style.display = 'none';
        bienvenido.style.display = "block";ole.error("Error", error);
      })

}


function modificar(){
    const FormModificar = document.getElementById("FormModificar")
    const formulario = new FormData(FormModificar)   
    console.log(formulario)
    fetch("./serv_admin/editar.php", {
        method: 'POST',
        body: formulario
      })
      
      
        verProducto()
        productContainer.style.display = 'flex';
        bienvenido.style.display = "none";

      //Alerta de edicion de producto
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
            title: "Producto editado correctamente!"
        })
      .catch((error) => {
        console.error("Error", error);
      })

}


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