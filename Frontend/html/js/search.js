const boton = document.getElementById("buscar-btn");
const producto = document.getElementById("buscar-producto");
const div = document.getElementById("galeria");

 

producto.addEventListener("keyup", function(event) {
  var keyValue = event.key;
  var codeValue = event.code;
  if (codeValue == "Enter") {
  fetch("./php/busqueda.php?producto=" + producto.value)
    .then((response) => response.json())
     

    .then((data) => {
      var prod = "";
      for(var id = 0; id<data.length; id ++){
      prod += `
       <div class="col-md-4">
              <div class="container_main">
              <h3>${data[id].Nombre}</h3>
                 <h3>Descripcion: ${data[id].Descripcion}</h3>
                 <h3 id=${data[id].Id_Producto}>${data[id].Precio}</h3>
          <button id=${data[id].Id_Producto}  class="carrito fa fa-shopping-cart"></button>
          


                <img src="images/img-1.png" alt="Avatar" class="image" />
                
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

boton.addEventListener("click", () => {

  fetch("./php/busqueda.php?producto=" + producto.value)
    .then((response) => response.json())
     

    .then((data) => {
      var prod = "";
      for(var id = 0; id<data.length; id ++){
      prod += `
 <div class="col-md-4">
              <div class="container_main">
              <h3>${data[id].Nombre}</h3>
                 <h3>Descripcion: ${data[id].Descripcion}</h3>
                 <h3>Precio: ${data[id].Precio}</h3>

          <button id=${data[id].Id_Producto}  class="carrito fa fa-shopping-cart"></button>
          


                <img src="images/img-1.png" alt="Avatar" class="image" />
                
              </div>
             `;
      }
      div.innerHTML = prod;
    })
    .catch((error) => {
      console.error("Error", error);
    });
});

div.addEventListener("click", function(event) {
 
 
  if (event.target.tagName === "BUTTON"){
     fetch("./php/agregarcarrito.php?producto=" + event.target.id)
     .then((response) => response.json())
      
 
     .then((data) => {
 console.log(data.message);


 
     })
     .catch((error) => {
       console.error("Error", error);
     });

  }

 
});




    // window.location.href = "../html/gallery.html"