<?php
session_start();    
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtiene y limpia los datos del formulario
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $date = date('Y-m-d');

    // Hashea la contraseña
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepara la consulta
    $stmt = $con->prepare('INSERT INTO cliente (Nombre, Email, Password, Direccion, Telefono, Fecha_registro) VALUES (?, ?, ?, ?, ?, ?)');

    // Ejecuta la consulta
    if ($stmt->execute()) {
        echo 'success';
    } else {
        echo 'Failed to register: ' . $stmt->error;
    }

    // Cierra la consulta
    $stmt->close();
}
?>
