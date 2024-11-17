
const div = document.getElementById ("contenidouser");
document.addEventListener("DOMContentLoaded", async() =>{


    fetch("./php/cargaruser.php")
      .then((response) => response.json())
         
      .then((data) => {
        var prod = "";
        var total = 0;
        for(var id = 0; id<data.length; id ++){
         
      
        prod += `
         <div class="col-md-4">
                <div class="container_main">

              
                <h4>Nombre:</h4><input id='nombre' type="text" value= ${data[id].Nombre}>

                <br>
                <h4>Email:</h4> <input id='email' type="text" value= ${data[id].Email}>
                 <br>
                   
                <h4>Direccion:</h4> <input id='direccion' type="text" value= ${data[id].Direccion}>

 
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

  

    
