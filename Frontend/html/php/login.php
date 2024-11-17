<?php
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $con->prepare('SELECT * FROM cliente WHERE Email = :email');
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['Password'])) {
        session_start();
        $_SESSION['user'] = $user['Nombre'];
        echo 'success';
    } else {
        echo 'Invalid email or password';
    }
}
?>
