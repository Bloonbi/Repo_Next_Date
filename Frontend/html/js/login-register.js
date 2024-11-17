// Get the modal
var loginModal = document.getElementById('login-modal');
var registerModal = document.getElementById('register-modal');

// Get the button that opens the modal
var loginBtn = document.getElementById('login-link');
var registerBtn = document.getElementById('register-link');

// Get the <span> element that closes the modal
var loginClose = document.getElementById('login-close');
var registerClose = document.getElementById('register-close');

// When the user clicks the button, open the modal 
loginBtn.onclick = function() {
    loginModal.style.display = "block";
}
registerBtn.onclick = function() {
    registerModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
loginClose.onclick = function() {
    loginModal.style.display = "none";
}
registerClose.onclick = function() {
    registerModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    } else if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
}

// Handle login form submission
document.getElementById('login-form').onsubmit = function(event) {
    event.preventDefault();
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/login.php', true);  // Asegúrate de que la ruta sea correcta
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        document.getElementById('login-message').innerHTML = this.responseText;
        if (this.responseText.includes('success')) {
            window.location.reload();
        }
    };
    xhr.send('email=' + email + '&password=' + password);
};

// Handle register form submission
document.getElementById('register-form').onsubmit = function(event) {
    event.preventDefault();
    var name = document.getElementById('register-name').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/register.php', true);  // Asegúrate de que la ruta sea correcta
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        document.getElementById('register-message').innerHTML = this.responseText;
        if (this.responseText.includes('success')) {
            window.location.reload();
        } else {
            console.error(this.responseText); // Imprime el error en la consola
        }
    };
    xhr.send('name=' + name + '&email=' + email + '&password=' + password);
};
