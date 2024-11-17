<?php
session_start();
require "conexion.php"; 

$idcliente = $_SESSION['idc'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener la contraseña actual desde la base de datos
    $sql = "SELECT password FROM cliente WHERE id = :idc";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(':idc', $idcliente);
    $stmt->execute();
    $ContraseñaCliente = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$ContraseñaCliente) {
        echo json_encode(array('error' => 'Cliente no encontrado.'));
        exit;
    }

    $currentPasswordHash = $ContraseñaCliente['password'];

    // Obtener la contraseña actual y nueva desde el formulario
    $contrasenaActual = $_POST['contrasenaActual'];
    $nuevaContrasena = $_POST['nuevaContrasena'];

    // Validar la contraseña actual
    if (!password_verify($contrasenaActual, $currentPasswordHash)) {
        echo json_encode(array('error' => 'La contraseña actual es incorrecta.'));
        exit;
    }

    // Hashear la nueva contraseña
    $NuevaContraseña = password_hash($nuevaContrasena, PASSWORD_BCRYPT);

    // Actualizar la contraseña en la base de datos
    $updateStmt = $con->prepare("UPDATE cliente SET password = :Password WHERE id = :idc");
    $updateStmt->bindParam(':Password', $NuevaContraseña);
    $updateStmt->bindParam(':idc', $idcliente);

    if ($updateStmt->execute()) {
        echo json_encode(array('success' => 'Contraseña actualizada correctamente.'));
    } else {
        echo json_encode(array('error' => 'Error al actualizar la contraseña.'));
    }
}
?>