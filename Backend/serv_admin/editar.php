<?php
session_start();
require "./controlador/conexion.php";


$nuevoNombre = $_POST['Nombre'];
$descripcion = $_POST['Descripcion'];
$precio = $_POST['Precio'];
$cantidad = $_POST['Cantidad'];


$id = $_SESSION['id'];

        $updateStmt = $con->prepare("UPDATE producto SET Nombre = :Nombre , Descripcion = :Descripcion, Precio = :Precio , Cantidad = :Cantidad WHERE id = :id");
        $updateStmt->bindParam(':Nombre', $nuevoNombre);
        $updateStmt->bindParam(':Descripcion', $descripcion);
        $updateStmt->bindParam(':Precio', $precio);
        $updateStmt->bindParam(':Cantidad', $cantidad);
        $updateStmt->execute();

        echo json_encode(array('message' => 'Actualizado.'));


   
?>