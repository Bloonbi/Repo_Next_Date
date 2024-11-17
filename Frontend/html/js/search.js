const boton = document.getElementById("buscar-btn");
const producto = document.getElementById("buscar-producto");
const div = document.getElementById("galeria");
const botoncarrito = document.getElementById("botoncarrito");
const galeria = document.getElementById("galeria");
const galeriapromociones = document.getElementById("galeriapromo");

document.addEventListener("DOMContentLoaded", function (page = 1) {
  fetch(`/cafee/backend/serv_admin/listar_productosfront.php?page=${page}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data)

      //Exito, Construccion de objetos
      galeria.innerHTML = '';
      data.producto.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <p>Precio: $${product.precio}</p>
                <p>Cantidad: ${product.cantidad}</p>
                <img src="/cafee/backend/serv_admin/${product.imagen}" alt="${product.nombre}">
                <br>
                <br>
                <button onclick="addcart(${product.idProd})" id=${product.idProd} class="carrito fa fa-shopping-cart"></button>
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

      //Exito, Construccion de objetos
      galeriapromociones.innerHTML = '';
      data.producto.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <p>Precio Anterior: $${product.precio}</p>
                <p class="precionuevo">Precio Nuevo:</p>
                <p>Cantidad: ${product.cantidad}</p>
                <img src="/cafee/backend/serv_admin/${product.imagen}" alt="${product.nombre}">
                <br>
                <br>
                <button onclick="addcart(${product.idProd})" id=${product.idProd} class="carrito fa fa-shopping-cart"></button>
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
        for (var id = 0; id < data.length; id++) {
          prod += `
       <div class="col-md-4">
              <div class="container_main">
              <h3>${data[id].nombre}</h3>
                 <h3>Descripcion: ${data[id].descripcion}</h3>
                 <h3 id=${data[id].idProd}>${data[id].precio}</h3>
          <button onclick="addcart(${data[id].idProd})" id=${data[id].idProd} class="carrito fa fa-shopping-cart"></button>
          
             <img src="/cafee/backend/serv_admin/${product.imagen}" alt="${product.nombre}">

            
                
              </div>
            </div>
             `;
        }
        div.innerHTML = prod;
      })
      
      .catch((error) => {
        console.error("Error", error);
      });




  }

});
//busqueda
boton.addEventListener("click", () => {

  fetch("./php/busqueda.php?producto=" + producto.value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
            //Exito, Construccion de objetos
            galeria.innerHTML = '';
            for (var id = 0; id < data.length; id++){
              const productElement = document.createElement('div');
              productElement.classList.add('product');
              productElement.innerHTML = `
                      <h3>${data[id].nombre}</h3>
                      <p>${data[id].descripcion}</p>
                      <p>Precio Anterior: $${data[id].precio}</p>
                      <p class="precionuevo">Precio Nuevo:</p>
                      <p>Cantidad: ${data[id].cantidad}</p>
                      <img src="/cafee/backend/serv_admin/${data[id].imagen}" alt="${data[id].nombre}">
                      <br>
                      <br>
                      <button onclick="addcart(${data[id].idProd})" id=${data[id].idProd} class="carrito fa fa-shopping-cart"></button>
                  `;
              galeria.appendChild(productElement);

            }
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
