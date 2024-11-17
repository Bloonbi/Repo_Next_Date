// Referencias al modal y su botón de cierre
const modal = document.getElementById("pop");
const closeModalBtn = document.getElementById("closeModalBtn");

// Función para abrir el modal con los detalles del producto
function openModal(idProd) {
    // Realizar una solicitud al servidor para obtener los detalles del producto con el idProd
    fetch(`/cafee/backend/serv_admin/get_product_details.php?idProd=${idProd}`)
        .then(response => response.json())
        .then((product) => {
            // Si el producto existe, actualizar los detalles del modal
            if (product) {
                document.getElementById('modalTitle').innerText = product.nombre;
                document.getElementById('modalImage').src = `/cafee/backend/serv_admin/${product.imagen}`;
                document.getElementById('modalDescription').innerText = product.descripcion;
                document.getElementById('modalPrice').innerText = `Precio: $${product.precio}`;
                
                // Mostrar el modal
                modal.style.display = 'block';
            } else {
                console.error("Producto no encontrado");
            }
        })
        .catch((error) => {
            console.error("Error al cargar los detalles del producto", error);
        });
}

// Función para cerrar el modal
closeModalBtn.onclick = function () {
    modal.style.display = "none";
};

// Si el usuario hace clic fuera del modal, también lo cierra
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Este código se puede integrar dentro de la función donde generas los productos en el frontend
// Por ejemplo, si tienes un producto en tu galería y quieres abrir el modal cuando el usuario haga clic en un botón

document.addEventListener("DOMContentLoaded", function () {
    // Suponiendo que tienes una lista de productos cargada dinámicamente
    const productos = [
        { idProd: 1, nombre: "Producto 1", imagen: "prod1.jpg", precio: 100, descripcion: "Descripción del producto 1" },
        { idProd: 2, nombre: "Producto 2", imagen: "prod2.jpg", precio: 200, descripcion: "Descripción del producto 2" }
        // ... más productos
    ];

    const galeria = document.getElementById("galeria");

    productos.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        // Crear el botón "Ver Detalles" que abre el modal
        productElement.innerHTML = `
            <h3>${product.nombre}</h3>
            <img src="/cafee/backend/serv_admin/${product.imagen}" alt="${product.nombre}">
            <br><br>
            <button onclick="openModal(${product.idProd})" class="modal-btn">Ver Detalles</button>
        `;
        galeria.appendChild(productElement);
    });
});
