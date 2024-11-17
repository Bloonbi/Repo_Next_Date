document.getElementById('actualizarForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const contrasenaActual = document.getElementById('contrasenaActual').value;
  const nuevaContrasena = document.getElementById('nuevaContrasena').value;
  const confirmarContrasena = document.getElementById('confirmarContrasena').value;

  if (nuevaContrasena !== confirmarContrasena) {
      alert('Las contraseñas nuevas no coinciden.');
      return;
  }

  const formData = new FormData();
  formData.append('contrasenaActual', contrasenaActual);
  formData.append('nuevaContrasena', nuevaContrasena);

  fetch( './php/cargarcontraseña.php', { 
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert(data.success);
          // Redirigir o realizar alguna acción después de actualizar la contraseña
      } else {
          alert(data.error);
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al actualizar la contraseña.');
  });
});