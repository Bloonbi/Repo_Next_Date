<?php
session_start();

include "conexion.php"; // Asegúrate de que "conexion.php" contiene la conexión a tu base de datos

$idcliente = $_SESSION['idc']; // Obtén el ID del cliente de la sesión

// Consulta para contar los productos en el carrito
$stmt = $con->prepare("SELECT COUNT(*) FROM carrito_compra WHERE idCliente = :Id_Cliente");
$stmt->bindParam(':Id_Cliente', $idcliente);
$stmt->execute();

// Obtener el resultado de la consulta
$count = $stmt->fetchColumn();

// Verificar si el carrito tiene productos
if ($count > 0) {
  // El carrito tiene productos
  $response = array('success' => true);
} else {
  // El carrito está vacío
  $response = array('success' => false);
}

// Devuelve la respuesta como JSON
header('Content-type: application/json');
echo json_encode($response);
?>
