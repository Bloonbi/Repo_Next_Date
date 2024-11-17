const boton = document.getElementById("buscar-btn");
const producto = document.getElementById("buscar-producto");
const div = document.getElementById("galeria");
const botoncarrito = document.getElementById("botoncarrito");
const galeria = document.getElementById("galeria");
const galeriapromociones = document.getElementById("galeriapromo");
// Referencias al modal y su botón de cierre
// Simulamos los datos del producto (esto normalmente vendría de una base de datos)
const products = {
  id: { // Producto 1
      nombre: "Producto 1",
      imagen: "producto1.jpg", // Cambia esta ruta por una imagen real
      descripcion: "Descripción del Producto 1",
      precio: 20.99
  },
  102: { // Producto 2
      nombre: "Producto 2",
      imagen: "producto2.jpg", // Cambia esta ruta por una imagen real
      descripcion: "Descripción del Producto 2",
      precio: 25.99
  },
  103: { // Producto 3 (puedes añadir más productos con diferentes idProd)
      nombre: "Producto 3",
      imagen: "producto3.jpg", // Cambia esta ruta por una imagen real
      descripcion: "Descripción del Producto 3",
      precio: 30.99
  }
};



document.addEventListener("DOMContentLoaded", function (page = 1) {
  fetch(`/cafee/backend/serv_admin/listar_productosfront.php?page=${page}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data)




      //Productos en galería principal
  
      galeria.innerHTML = '';
      data.producto.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
                <h3>${product.nombre}</h3>
               
                <p>Precio: $${product.precio}</p>
          
                <img src="/cafee/backend/serv_admin/${product.imagen}" alt="${product.nombre} onclick="pop(${product.idProd}) ">
                <br>
                <br>
                <button onclick="addcart(${product.idProd})" id=${product.idProd} class="carrito fa fa-shopping-cart"></button>
                  <button onclick="openModal(${product.idProd})" id="openModalBtn-${product.idProd}" class="modal-btn">Ver Detalles</button>
            `;
        galeria.appendChild(productElement);
      })
    })
    .catch((error) => {
      console.error("Error", error);
    });
    
    fetch(`/cafee/backend/serv_admin/listarpromociones.php?page=${page}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data)

       
      galeriapromociones.innerHTML = '';
      data.producto.forEach(product => {
        const productElement = document.createElement('div');
        let pepe= ((product.precio * product.porcentaje)  / 100);
          if(product.promocion >0){
           total = product.precio - pepe;
           precionuevo = `
            <p> Precio Anterior: $${product.precio}</p>
            <p> Porcentaje de Promocion: ${product.porcentaje}%</p>
            <p> Precio Promocionado: $${product.precio - pepe}</p>
           `
        }else {
          precionuevo = `
          <p> Precio: $${product.precio}</p>
         `
        }
        productElement.classList.add('product');
        
        //Productos de promoción
        productElement.innerHTML = `
                <h3>${product.nombre}</h3>
                ${precionuevo}
                <img src="/cafee/backend/serv_admin/${product.imagen}" alt="${product.nombre} onclick="pop(${product.idProd})">
                <br>
                <br>
                <button onclick="addcart(${product.idProd})" id=${product.idProd} class="carrito fa fa-shopping-cart"></button>
             <button onclick="openModal(${product.idProd})" id="openModalBtn-${product.idProd}" class="modal-btn">Ver Detalles</button>
            `;
        galeriapromociones.appendChild(productElement);
        
      })
    })
    .catch((error) => {
      console.error("Error", error);
    });
})




function addToCart(idProd) {

  fetch("./php/agregarcarrito.php?producto=" + idProd)
    .then((response) => response.text())


    .then((data) => {
      console.log(data)
      console.log(data.message);



    })
    .catch((error) => {
      console.error("Error",
        alert("Necesitas iniciar sesion para poder comprar un producto."),
        error);
    });

}

botoncarrito.addEventListener("click", function () {

  fetch("./php/validar.php")
    .then((response) => response.json())


    .then((data) => {

      if (data.success == false) {
        Swal.fire({
          title: "Sesión inactiva",
          text: "Inicie sesión para usar el carrito de compras",
          icon: "warning"
        });
      } else {
        window.location.href = "../html/carrito.html"
      }

      console.log(data)

    })
    .catch((error) => {
      console.error("Error", error);
    });

})




producto.addEventListener("keyup", function (event) {
  var keyValue = event.key;
  var codeValue = event.code;
  if (codeValue == "Enter") {
    fetch("./php/busqueda.php?producto=" + producto.value)
      .then((response) => response.json())


      .then((data) => {
        
        var prod = "";
        galeria.innerHTML = '';
        data.forEach(product => {
          const productElement = document.createElement('div');
        let pepe= ((product.precio * product.porcentaje)  / 100);
          if(product.promocion >0){
           total = product.precio - pepe;
           precionuevo = `
            <p> Precio Anterior: $${product.precio}</p>
            <p> Precio Promocionado: $${product.precio - pepe}</p>
           `
        }else {
          precionuevo = `
          <p> Precio: $${product.precio}</p>
          
         `
        }
        productElement.classList.add('product');
        
        //productos en busqueda enter
        productElement.innerHTML = `
                <h3>${product.nombre}</h3>
                ${precionuevo}
                <img src="/cafee/backend/serv_admin/${product.imagen}" alt="${product.nombre} onclick="pop(${product.idProd}) ">
                <br>
                <br>
                <button onclick="addcart(${product.idProd})" id=${product.idProd} class="carrito fa fa-shopping-cart"></button>
       <button onclick="openModal(${product.idProd})" id="openModalBtn-${product.idProd}" class="modal-btn">Ver Detalles</button>

            `;
        galeria.appendChild(productElement);
        

        })
      })
      
      .catch((error) => {
        console.error("Error", error);
      });




  }

});
//busqueda click
boton.addEventListener("click", () => {

  fetch("./php/busqueda.php?producto=" + producto.value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
            //Exito, Construccion de objetos
            galeria.innerHTML = '';

             data.forEach(product => {
          const productElement = document.createElement('div');
        let pepe= ((product.precio * product.porcentaje)  / 100);
          if(product.promocion >0){
           total = product.precio - pepe;
           precionuevo = `
            <p> Precio Anterior: $${product.precio}</p>
            <p> Precio Promocionado: $${product.precio - pepe}</p>
           `
        }else {
          precionuevo = `
          <p> Precio: $${product.precio}</p>
         `
        }
        productElement.classList.add('product');
        
        
        productElement.innerHTML = `
                <h3>${product.nombre}</h3>
                ${precionuevo}
                <img src="/cafee/backend/serv_admin/${product.imagen}" alt="${product.nombre} onclick="pop(${product.idProd}) ">
                <br>
                <br>
                <button onclick="addcart(${product.idProd})" id=${product.idProd} class="carrito fa fa-shopping-cart"></button>
                  <button onclick="openModal(${product.idProd})" id="openModalBtn-${product.idProd}" class="modal-btn">Ver Detalles</button>
            `;
        galeria.appendChild(productElement);
        

        })
    })
  
    .catch((error) => {
      console.error("Error", error);
    });
});

function addcart(id) {
  fetch("./php/agregarcarrito.php?producto=" + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No tienes una sesión activa");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Producto agregado al carrito"
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error al agregar al carrito",
        text: error.message,
      });
    });
}

function openModal(idProd) {
  // Verificamos si el producto existe en el objeto
  if (product[idProd]) {
      console.error("Producto no encontrado con idProd:", idProd);
      return; // Si no se encuentra el producto, no hacemos nada
  }

  // Actualizamos los datos del modal con la información del producto
  document.getElementById('modalTitle').innerText = products[idProd].nombre;
  document.getElementById('modalImage').src = products[idProd].imagen;
  document.getElementById('modalDescription').innerText = products[idProd].descripcion;
  document.getElementById('modalPrice').innerText = "$" + products[idProd].precio;

  // Mostramos el modal
  document.getElementById('pop').style.display = 'block';

  // Mostrar mensaje en la consola (opcional)
  console.log("Abriendo modal para el producto con idProd:", idProd);
}

// Función para cerrar el modal
document.getElementById('closeModalBtn').onclick = function() {
  document.getElementById('pop').style.display = 'none';
}

// Cerrar el modal si se hace clic fuera de la ventana del modal
window.onclick = function(event) {
  if (event.target == document.getElementById('pop')) {
      document.getElementById('pop').style.display = 'none';
  }}
