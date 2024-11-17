document.addEventListener("DOMContentLoaded", function() {
    // Load session status
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/session_status.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('nav-links').innerHTML = xhr.responseText;
            attachEventListeners();
        }
    };
    xhr.send();
});

function attachEventListeners() {
    // Get the modal
    var loginModal = document.getElementById('login-modal');
    var registerModal = document.getElementById('register-modal');

    // Get the button that opens the modal
    var loginBtn = document.getElementById('login-link');
    var registerBtn = document.getElementById('register-link');

    // Get the <span> element that closes the modal
    var loginClose = document.getElementById('login-close');
    var registerClose = document.getElementById('register-close');

    if (loginBtn && registerBtn) {
        // When the user clicks the button, open the modal 
        loginBtn.onclick = function() {
            loginModal.style.display = "block";
        }
        registerBtn.onclick = function() {
            registerModal.style.display = "block";
        }
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
}