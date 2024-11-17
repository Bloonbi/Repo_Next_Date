<?php
session_start();

include "conexion.php";

$idcliente = $_SESSION['idc'];

$stmt = $con->prepare("DELETE FROM carrito_compra WHERE idCliente = :Id_Cliente");
$stmt->bindParam(':Id_Cliente', $idcliente);
$stmt->execute();

echo json_encode(array('message' => 'Producto agregado al carrito'));

?>