<?php
$idProd = $_GET['idProd'];
// Realiza la consulta a la base de datos para obtener los detalles del producto
// Ejemplo de consulta SQL
$query = "SELECT nombre, descripcion, precio, imagen FROM productos WHERE idProd = $idProd";
$result = mysqli_query($conn, $query);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
} else {
    echo json_encode(['error' => 'Producto no encontrado']);
}
?>
