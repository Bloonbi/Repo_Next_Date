
document.addEventListener("DOMContentLoaded", async() =>{
const divModificar = document.getElementById ("formModificar");


    fetch("./serv_admin/editar.php")
      .then((response) => response.json())
         
      .then((data) => {
        var prod = "";
        var total = 0;
        for(var id = 0; id<data.length; id ++){
         
      
        product += `
         <div class="col-md-4">
                <div class="container_main">

              
                <h4>Nombre:</h4><input id='nombre' type="text" value= ${data[id].Nombre}>
                <br>
                <h4>Descripcion:</h4> <input id='descripcion' type="text" value= ${data[id].Descripcion}>
                <br>
                <h4>Precio:</h4> <input id='precio' type="text" value= ${data[id].Precio}>
                 <br>
                <h4>Cantidad:</h4> <input id='cantidad' type="text" value= ${data[id].Cantidad}>
                </div>
              </div>
              <hr>
               `;
        }
        divModificar.innerHTML = product;
      })
      .catch((error) => {
        console.error("Error", error);
      })
    });