const actu = document.getElementById ("actualizardatos");

actu.addEventListener("click", () =>{


    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;


    const formData = new FormData();

  formData.append('nombre', nombre);
  formData.append('email', email);
  formData.append('direccion', direccion);



    fetch("./php/actualizardatos.php", {
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

  