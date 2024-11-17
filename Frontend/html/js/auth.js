function validar() {
  fetch("/cafeteria/html/php/validar.php", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
}

const registerForm = document.getElementById("registerForm");
const botonlogin = document.getElementById("botonlogin");
const loginMessage = document.getElementById("login-message");
const botonregistrar = document.getElementById("botonregistrar");

const showError = (message, element) => {
  element.innerHTML = message;
  element.style.color = "red";
};

const showSuccess = (message, element) => {
  element.innerHTML = message;
  element.style.color = "green";
};

botonlogin.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("/cafeteria/html/php/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email: email,
        password: password,
      }),
    });
    const data = await response.text();
    if (data.includes("success")) {
      showSuccess("Login successful!", loginMessage);
      $("#loginModal").modal("hide");
      document.getElementById("login-link").style.display = "none";
      document.getElementById("register-link").style.display = "none";
      document.getElementById("user-options").style.display = "block";
    } else {
      showError(data, loginMessage);
    }
  } catch (error) {
    showError("An error occurred. Please try again.", loginMessage);
  }
});

botonregistrar.addEventListener("click", async function () {
  const formData = new FormData(document.getElementById("registerForm"));
  formData.append("action", "create");

  fetch("/cafeteria/html/php/register.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        resultDiv.textContent = "Sesión activa: " + data.user.username;
      } else {
        resultDiv.textContent = data.error;
      }
    })
    .catch((error) => {
      resultDiv.textContent = "Error al crear usuario";
    });
});

document.addEventListener("DOMContentLoaded", async function () {
  fetch("/cafeteria/html/php/validar.php", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        document.getElementById("login-link").style.display = "none";
        document.getElementById("register-link").style.display = "none";
        document.getElementById("user-options").style.display = "block";
      } else {
        document.getElementById("login-link").style.display = "block";
        document.getElementById("register-link").style.display = "block";
        document.getElementById("user-options").style.display = "none";
      }
    })
    .catch((error) => {
      return false;
    });
});
