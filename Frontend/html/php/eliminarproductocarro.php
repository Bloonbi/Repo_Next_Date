<?php
include "conexion.php";
session_start();

$idprod = $_GET["idProd"];
$idcliente = $_SESSION['idc'];

$stmt = $con->prepare("DELETE FROM carrito_compra WHERE idCliente = :IdCliente AND idProducto = :idProd");
$stmt->bindParam(':IdCliente', $idcliente);
$stmt->bindParam(':idProd', $idprod);
$stmt->execute();

echo json_encode(['message' => 'Producto eliminado del carrito', 'cliente' => $idcliente]);