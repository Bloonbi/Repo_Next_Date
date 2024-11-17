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
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Datos modificados con exito"
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error al modificar datos",
        text: error.message,
      });
    });
    setTimeout(function(){
      window.location.reload();
   }, 2000);
  });

  