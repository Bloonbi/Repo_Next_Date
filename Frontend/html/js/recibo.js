const div = document.getElementById("recibo");

document.addEventListener("DOMContentLoaded", async () => {
  fetch("./php/recibo.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let totalGeneral = 0;
      let totalProducto = 0;
      var prod = "";
      var total = 0;
      const numeroOrden = Math.floor(Math.random() * 1000) + 1;         
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
          


        prod += `
         <div class="col-md-4">
                <div class="container_main">
                <h3>Producto: ${data[id].nombre}</h3>
                <h3>Precio unitario: ${data[id].precio - pepe}</h3>
                <h3>Cantidad: ${data[id].cantidad}</h3>
                <h3>Precio total: ${totalProducto}</h3>
                </div>
              </div>
              <hr>
               `;
      }
    
      prod += `
        <div class="col-md-12">
          <h3>Precio Total: ${totalGeneral}</h3>
              <h3>Presente el siguiente numero en el mostrador para que le entreguen su orden: ${numeroOrden}</h3>
              <h3>Muchas gracias por su compra.</h3>
        </div>
      `;
      div.innerHTML = prod;
    })
    .catch((error) => {
      console.error("Error", error);
    });




});

