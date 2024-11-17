<?php
require "conexion.php";

if (!isset($_SESSION['idc'])) {
    echo json_encode(['error' => 'Cliente no autenticado']);
    exit;
}
try {
$idcliente = $_SESSION['idc'];

$sql = "SELECT nombre, email, direccion FROM cliente WHERE id = :id";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(':id', $idcliente, PDO::PARAM_INT);
    $stmt->execute();

    $datos = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($datos) {
        echo json_encode($datos); // Devolver los datos en formato JSON
    } else {
        echo json_encode(['error' => 'No se encontraron datos']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}

$conn = null; // Cerrar la conexión
?>