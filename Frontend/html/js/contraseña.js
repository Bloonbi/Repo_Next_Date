const actu = document.getElementById ("botonContraseña");

actu.addEventListener("click", () =>{


    const contraseñaActual = document.getElementById("contraseñaActual").value;
    const contraseñaNueva = document.getElementById("contraseñaNueva").value;
    const confirmarContraseña = document.getElementById("confirtmarContraseña").value;


    const formData = new FormData();

  formData.append('contraseñaActual', contraseñaActual);
  formData.append('contraseñaNueva', contraseñaNueva);
  formData.append('confirmarContraseña', confirmarContraseña);



    fetch("./php/cargarcontraseña.php", {
      method: 'POST',
      body: formData

    })
    
    .then((response) => response.json())
          
    .then((data) => { 
      alert(data.message);


    })
    .catch((error) => {
      console.error("Error", error);
    })

  });

  