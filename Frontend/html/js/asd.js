const closeModalLoginWindow = document.getElementById('closeModalLoginWindow');
const openModalRegisterWindow = document.getElementById('register-link');
const registerModalWindow = document.getElementById('registerModalWindow');
const registerButton = document.getElementById('registerButton');

function openRegisterModal() {
    registerModalWindow.style.display = 'block';
}

function closeRegisterModal() {
    registerModalWindow.style.display = 'none';
}

closeModalRegisterWindow.addEventListener('click', closeRegisterModal);

openModalRegisterWindow.addEventListener('click', function() {
    document.getElementById('registerForm').reset();
    openRegisterModal();
});