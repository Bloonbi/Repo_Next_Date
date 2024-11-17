<?php
session_start();

require "conexion.php";


$nuevoNombre = $_POST['nombre'];
$email = $_POST['email'];
$direccion = $_POST['direccion'];


$idcliente = $_SESSION['idc'];

        $updateStmt = $con->prepare("UPDATE cliente SET nombre = :Nombre , email = :Email, direccion = :Direccion WHERE id = :Id_Cliente");
        $updateStmt->bindParam(':Nombre', $nuevoNombre);
        $updateStmt->bindParam(':Email', $email);
        $updateStmt->bindParam(':Direccion', $direccion);
        $updateStmt->bindParam(':Id_Cliente', $idcliente);
        $updateStmt->execute();

        echo json_encode(array('message' => 'Datos del cliente actualizados.'));


   
?>
