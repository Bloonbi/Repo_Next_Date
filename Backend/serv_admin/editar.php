<?php
session_start();
require "../controlador/conexion.php";


$nuevoNombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$precio = $_POST['precio'];
$cantidad = $_POST['cantidad'];
$promocion = $_POST['promocion'];
$porcentaje = $_POST['porcentaje'];

$id = $_POST['idProd'];

        $updateStmt = $pdo_conn->prepare("UPDATE producto SET nombre = :Nombre , descripcion = :Descripcion, precio = :Precio , cantidad = :Cantidad, promocion = :Promocion, porcentaje = :Porcentaje WHERE idProd = :id");
        $updateStmt->bindParam(':Nombre', $nuevoNombre);
        $updateStmt->bindParam(':Descripcion', $descripcion);
        $updateStmt->bindParam(':Precio', $precio);
        $updateStmt->bindParam(':Cantidad', $cantidad);
        $updateStmt->bindParam(':Promocion', $promocion);
        $updateStmt->bindParam(':Porcentaje', $porcentaje);
        $updateStmt->bindParam(':id', $id);
        $updateStmt->execute();

        echo json_encode(array('message' => 'Actualizado.'));


   
?>