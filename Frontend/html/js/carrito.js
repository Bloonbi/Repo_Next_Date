const div = document.getElementById ("contenido");
const limpiar = document.getElementById ("limpiarcarrito");
const comprobar = document.getElementById ("comprobarcarrito");



document.addEventListener("DOMContentLoaded", async() =>{

    fetch("./php/cargar.php")
      .then((response) => response.json())
         
      .then((data) => {
        var prod = "";
        var total = 0;
        for(var id = 0; id<data.length; id ++){
          total = 0;
          total = data[id].Precio * data[id].cantidad;
        prod += `
         <div class="col-md-4">
                <div class="container_main">
                <h3>Nombre: ${data[id].Nombre}</h3>
                <h3>Precio: ${data[id].Precio}</h3>
                   <h3>Cantidad: ${data[id].cantidad}</h3>
            <h3>Cliente: ${data[id].Id_Cliente}</h3>
            <h3>Id: ${data[id].Id_Producto}</h3>
            <h3>Total: ${total}</h3>

 
                </div>
              </div>
              <hr>
               `;
        }
        div.innerHTML = prod;
      })
      .catch((error) => {

        console.error("Error", error);
      })
    });

limpiar.addEventListener("click", () =>{

  
  fetch("./php/limpiarcarrito.php")
    .then((response) => response.json())
          
    .then((data) => { 
      div.innerHTML = "";   


    })

  });
  comprobarcarrito.addEventListener("click", function(){
  
    fetch("./php/comprobarcarrito.php")
    .then((response) => response.json())
       
  
    .then((data) => { 
  
      if (data.success == false){
        alert("Debes añadir almenos un producto al carrito.")
      }else{
        window.location.href="../html/recibo.html"
      }
  
      console.log(data) 
  
     })
    .catch((error) => {
      console.error("Error", error);
    });
  
  })
  

