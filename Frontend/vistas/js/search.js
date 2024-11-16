const boton = document.getElementById("boton1");
const producto = document.getElementById("producto");
const div = document.getElementById("contenido");
 

boton.addEventListener("click", () => { 
       fetch('../frontend/php/busqueda2.php?producto='+producto.value)
        .then(response => response.json())
        .then(data =>{
            var prod = ''
                id = 0;
                prod += `
            
                <h3>${data[id].Nombre}</h3>
                <h3>${data[id].Descripcion}</h3>
                <h3>${data[id].Precio}</h3> 
                <h3>${data[id].Cantidad}</h3>
                <h3>${data[id].Fecha_Creacion}</h3>
                <h3>${data[id].Fecha_Vencimiento}</h3>
             `
             div.innerHTML = prod;
        })
        .catch(error => {
            console.error("Error", error);
        })
    });