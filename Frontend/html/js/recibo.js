const div = document.getElementById("recibo");

document.addEventListener("DOMContentLoaded", async () => {
  fetch("./php/recibo.php")
    .then((response) => response.json())
    .then((data) => {
      var preciototal = 0;
      var prod = "";
      var total = 0;
      // Generar número aleatorio entre 1 y 1000
      const numeroOrden = Math.floor(Math.random() * 10000) + 1; 
      for (var id = 0; id < data.length; id++) {
        total = data[id].Precio * data[id].cantidad;
        preciototal += total; 
        prod += `
         <div class="col-md-4">
                <div class="container_main">
                <h3>Producto: ${data[id].Nombre}</h3>
                <h3>Precio: ${data[id].Precio}</h3>
                </div>
              </div>
              <hr>
               `;
      }
    
      prod += `
        <div class="col-md-12">
          <h3>Precio Total: ${preciototal}</h3>
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

