<?php
session_start();
header('Content-type: application/json');

include "conexion.php";

$idcliente = $_SESSION['idc'];

$stmt = $con->prepare("SELECT * FROM carrito_compra WHERE idCliente = :Id_Cliente");
$stmt->bindParam(':Id_Cliente', $idcliente);
$stmt->execute();

$productos = $stmt->fetchAll(PDO::FETCH_ASSOC);



for($i=0; $i < count($productos); $i++){
    $idProd = $productos[$i]["idProducto"];
    $cantidad = $productos[$i]["cantidad"];

    $stmt = $con->prepare("SELECT * FROM producto WHERE idProd = :Id_Producto");
    $stmt->bindParam(':Id_Producto', $idProd);
    $stmt->execute();
    $producto = $stmt->fetch(PDO::FETCH_ASSOC);

    $ventasanterior = $producto["ventas"];
    $cantidadanterior = $producto["cantidad"];

    $ventasnuevo = $cantidad + $ventasanterior;
    $cantidadnuevo = $cantidadanterior - $cantidad;

    $updateStmt = $con->prepare("UPDATE producto SET ventas = :Ventas, cantidad = :Cantidad WHERE idProd = :Id_Producto");
    $updateStmt->bindParam(':Ventas', $ventasnuevo);
    $updateStmt->bindParam(':Cantidad', $cantidadnuevo);
    $updateStmt->bindParam(':Id_Producto', $idProd);
    $updateStmt->execute();



}

echo json_encode(["success" => $producto]);



?>
