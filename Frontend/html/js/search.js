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
                 <h3>${data[id].Descripcion}</h3>

                <img src="images/img-1.png" alt="Avatar" class="image" />
                <div class="overlay">
                  <div class="text">
                    <a href="#"><i class="fa fa-search" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
            </div>
             `;
      }
      div.innerHTML = prod;
    })
    .catch((error) => {
      console.error("Error", error);
    });}
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
                 <h3>${data[id].Descripcion}</h3>

                <img src="images/img-1.png" alt="Avatar" class="image" />
                <div class="overlay">
                  <div class="text">
                    <a href="#"><i class="fa fa-search" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
            </div>
             `;
      }
      div.innerHTML = prod;
    })
    .catch((error) => {
      console.error("Error", error);
    });
});


    // window.location.href = "../html/gallery.html"