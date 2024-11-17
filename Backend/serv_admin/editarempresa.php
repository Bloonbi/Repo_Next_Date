<?php
session_start();
require "../controlador/conexion.php";


$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$direccion = $_POST['direccion'];
$propietarios = $_POST['propietarios'];
$id=1;
        


        $updateStmt = $pdo_conn->prepare("UPDATE empresa SET nombre = :Nombre , descripcion = :Descripcion, telefono = :Telefono , email = :Correo, direccion = :Direccion, propietarios = :Propietarios WHERE id = :id");
        $updateStmt->bindParam(':Nombre', $nombre);
        $updateStmt->bindParam(':Descripcion', $descripcion);
        $updateStmt->bindParam(':Telefono', $telefono);
        $updateStmt->bindParam(':Correo', $email);
        $updateStmt->bindParam(':Direccion', $direccion);
        $updateStmt->bindParam(':Propietarios', $propietarios);
        $updateStmt->bindParam(':id', $id);
        $updateStmt->execute();

        echo json_encode(array('message' => 'Los datos han sido actualizados correctamente.'));


   
?>