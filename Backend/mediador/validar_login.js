document.addEventListener('DOMContentLoaded', function() {
    // onstantes para Login y Logout
    const loginForm = document.getElementById('login-form');
    const resultDiv = document.getElementById('result');
    const logoutButton1 = document.getElementById('logoutButton1');
    const logoutButton2 = document.getElementById('logoutButton2');
    // Vistas de Productos y paginacion
    const productContainer = document.getElementById('productContainer');
    const paginationContainer = document.getElementById('pagination');
    // Manejo del CRUD
    const createModal = document.getElementById('createModal');
    const editModal = document.getElementById('editModal');
    const createProductButton = document.getElementById('createProductButton');
    const saveCreateProductButton = document.getElementById('saveCreateProductButton');
    const cancelCreateButton = document.getElementById('cancelCreateButton');
    const saveEditProductButton = document.getElementById('saveEditProductButton');
    const cancelEditButton = document.getElementById('cancelEditButton');

    document.getElementById('loginButton').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch('servicios_administracion/validar_login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                resultDiv.textContent = 'Sesión activa: ' + data.user.username;
                loginForm.style.display = 'none';
                logoutButton1.style.display = 'block';
                logoutButton2.style.display = 'block';
                createProductButton.style.display = 'block';
                loadProducts(); // Cargar productos al iniciar sesión
            } else {
                resultDiv.textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error en el login';
        });
    });

    function handleLogout() {
        fetch('servicios_administracion/logout.php')
        .then(response => response.json())
        .then(data => {
            if (!data.session) {
                loginForm.style.display = 'block';
                logoutButton1.style.display = 'none';
                logoutButton2.style.display = 'none';
                createProductButton.style.display = 'none';
                resultDiv.textContent = 'Sesión cerrada';
                productContainer.innerHTML = ''; // Limpiar lista de productos al cerrar sesión
                paginationContainer.innerHTML = ''; // Limpiar paginación
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error al cerrar sesión';
        });
    }

    logoutButton1.addEventListener('click', handleLogout);
    logoutButton2.addEventListener('click', handleLogout);

    function openCreateModal() {
        createModal.style.display = 'block';
    }

    function closeCreateModal() {
        createModal.style.display = 'none';
    }

    function openEditModal() {
        editModal.style.display = 'block';
    }

    function closeEditModal() {
        editModal.style.display = 'none';
    }

    function loadProducts(page = 1) {
        fetch(`servicios_administracion/listar_productos.php?page=${page}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultDiv.textContent = 'Error al cargar productos';
                return;
            }

            productContainer.innerHTML = '';
            data.productos.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <h3>${product.nombre}</h3>
                    <p>${product.descripcion}</p>
                    <p>Precio: $${product.precio}</p>
                    <img src="servicios_administracion/${product.imagen}" alt="${product.nombre}" class="productimg">
                    <button onclick="editProduct(${product.id})">Editar</button>
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>
                `;
                productContainer.appendChild(productElement);
            });

            setupPagination(data.totalPages, data.currentPage);
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error al cargar productos';
        });
    }

    function setupPagination(totalPages, currentPage) {
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.disabled = true;
            }
            pageButton.addEventListener('click', function() {
                loadProducts(i);
            });
            paginationContainer.appendChild(pageButton);
        }
    }

    createProductButton.addEventListener('click', function() {
        document.getElementById('createProductForm').reset();
        openCreateModal();
    });

    saveCreateProductButton.addEventListener('click', function() {
        const formData = new FormData(document.getElementById('createProductForm'));
        formData.append('action', 'create');

        fetch('servicios_administracion/crud_productos.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resultDiv.textContent = data.success;
                loadProducts();
                closeCreateModal();
            } else {
                resultDiv.textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error al crear producto';
        });
    });

    cancelCreateButton.addEventListener('click', closeCreateModal);

    saveEditProductButton.addEventListener('click', function() {
        const formData = new FormData(document.getElementById('editProductForm'));
        formData.append('action', 'update');

        fetch('servicios_administracion/crud_productos.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resultDiv.textContent = data.success;
                loadProducts();
                closeEditModal();
            } else {
                resultDiv.textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error al actualizar producto';
        });
    });

    cancelEditButton.addEventListener('click', closeEditModal);

    window.editProduct = function(id) {
        fetch(`servicios_administracion/crud_productos.php?action=read&id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.product) {
                document.getElementById('editId').value = data.product.id;
                document.getElementById('editNombre').value = data.product.nombre;
                document.getElementById('editDescripcion').value = data.product.descripcion;
                document.getElementById('editPrecio').value = data.product.precio;
                loadProducts();
                openEditModal();
            } else {
                resultDiv.textContent = 'Producto no encontrado';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Error al cargar producto';
        });
    }

    window.deleteProduct = function(id) {
        if (confirm('¿Está seguro de que desea eliminar este producto?')) {
            const formData = new FormData();
            formData.append('action', 'delete');
            formData.append('id', id);

            fetch('servicios_administracion/crud_productos.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    resultDiv.textContent = data.success;
                    loadProducts();
                } else {
                    resultDiv.textContent = data.error;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.textContent = 'Error al eliminar producto';
            });
        }
    }

    fetch('servicios_administracion/check_sesion.php')
    .then(response => response.json())
    .then(data => {
        if (data.session) {
            loginForm.style.display = 'none';
            logoutButton1.style.display = 'block';
            logoutButton2.style.display = 'block';
            createProductButton.style.display = 'block';
            resultDiv.textContent = 'Sesión activa: ' + data.user.username;
            loadProducts(); // Cargar productos si la sesión está activa
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
   
});
