const div = document.getElementById ("contenido");


document.addEventListener("DOMContentLoaded", async () => {
  fetch("./php/cargar.php")
    .then((response) => response.json())
    .then((data) => {
      let prod = "";
      let totalGeneral = 0;
      let totalProducto = 0;
      
      for (let id = 0; id < data.length; id++) {
        let pepe= ((data[id].precio * data[id].porcentaje)  / 100);
        if(data[id].promocion >0){
         totalProducto = (data[id].precio * data[id].cantidad) - pepe;
      }else {
         totalProducto = data[id].precio * data[id].cantidad;
      }
        totalGeneral += totalProducto;

        const cantidadmas = parseInt(data[id].cantidad, 10) + 1;
        const cantidadmenos = parseInt(data[id].cantidad, 10) - 1;
        let promocion = 0;
        
        // if (data[id].promocion > 0){
        //   let precio = data[id].precio;
        //   let porcentaje = (data[id].porcentaje);
        // let descuento = precio * 100 / porcentaje;
        // promocion = precio - descuento;
        // }

        prod += `
          <div class="col-md-4">
            <div class="container_main">
              <h3>Nombre: ${data[id].nombre}</h3>
              <h3>Precio: ${data[id].precio - pepe}</h3>
              <label><h3>Cantidad:</h3></label>
              <input type="text" value="${data[id].cantidad}">
              <button onclick="actualizarcantidad(${cantidadmas}, ${data[id].idProducto})">+</button>
              <button onclick="actualizarcantidad(${cantidadmenos}, ${data[id].idProducto})">-</button>
              <button onclick="eliminarproductocarro(${data[id].idProducto})">x</button>
              <h3>Total: ${totalProducto}</h3>
            </div>
          </div>
          <hr>
        `;
      }

      // Añadir el total general al final
      prod += `<h2>Total General: ${totalGeneral}</h2>`;
      
      div.innerHTML = prod;

      
    })
    .catch((error) => {
      console.error("Error", error);
    });
});



function eliminarproductocarro(id){
  fetch("./php/eliminarproductocarro.php?idProd="+id)
  .then((response) => response.text())
  .then((data) => { 
    console.log(data)     
    location.reload();

  })

}

function limpiar() {
  fetch("./php/limpiarcarrito.php")
    .then((response) => response.json())
          
    .then((data) => { 
     
      div.innerHTML = `
      <h2>Total General: ${0}</h2>

      `
    })

  } 

function comprobarcarrito(){
  
    fetch("./php/comprobarcarrito.php")
    .then((response) => response.json())
       
  
    .then((data) => { 
      console.log(data)
      if (data.success == false){
        alert("Debes añadir almenos un producto al carrito.")
      }else{
          window.location.href = "../html/recibo.php"
      }
  
      console.log(data) 
  
     })
    .catch((error) => {
      console.error("Error", error);
    });
    setTimeout(limpiar, 500);
  }
  
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
