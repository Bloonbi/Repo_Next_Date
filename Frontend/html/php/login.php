<?php
session_start();
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = 'SELECT * FROM cliente WHERE Email = :email';
    $stmt = $conn->prepare($sql);
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['Password'])) {
        $_SESSION['user_id'] = $user['Id_Cliente'];
        $_SESSION['user_name'] = $user['Nombre'];
        echo 'success';
    } else {
        echo 'Correo o contraseña incorrectos.';
    }
} else {
    echo 'Método de solicitud no permitido.';
}
?>
