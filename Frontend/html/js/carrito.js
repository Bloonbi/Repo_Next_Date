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
          total = data[id].precio * data[id].cantidad;
     
          cantidadmas =  parseInt(data[id].cantidad,10) +1;
          cantidadmenos =  parseInt(data[id].cantidad,10) -1;
        prod += `
         <div class="col-md-4">
                <div class="container_main">
                <h3>Nombre: ${data[id].nombre}</h3>
                <h3>Precio: ${data[id].precio}</h3>
                <label>Cantidad:</label>
                   <input type = text value=${data[id].cantidad}>
                   <button onclick=actualizarcantidad(${cantidadmas},${data[id].idProducto})>+</button>
                    <button onclick=actualizarcantidad(${cantidadmenos},${data[id].idProducto})>-</button>
            <h3>Cliente: ${data[id].idCliente}</h3>
            <h3>Id: ${data[id].idProducto}</h3>

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
  
 function actualizarcantidad(cantidad,idp){
    console.log(cantidad)
    
    fetch("./php/agregarcarrito.php?producto="+idp+"&cantidad="+cantidad)
    .then((response) => response.text())
       
  
    .then((data) => { 

  
      // if (data.success == false){
      //   alert("Debes añadir almenos un producto al carrito.")
      // }else{
      //   window.location.href="../html/recibo.html"
      // }
  
      console.log(data) 
      location.reload();
     })
    .catch((error) => {
      console.error("Error", error);
    });
  }
