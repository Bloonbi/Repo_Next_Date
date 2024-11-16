<?php
session_start();
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];

    $sql = "INSERT INTO cliente (email, password, nombre, telefono, direccion) VALUES (:email, :password, :nombre, :telefono, :direccion)";
    $stmt = $con->prepare($sql);
    $stmt->execute(['email' => $email, 'password' => $password, 'nombre' => $nombre, 'telefono' => $telefono, 'direccion' => $direccion]);
    $client = $stmt->fetch(PDO::FETCH_ASSOC);
    header("Location: user.php");

    if ($client && password_verify($password, $client['Password'])) {
        $_SESSION['user_id'] = $client['Id_Cliente'];
        $_SESSION['is_admin'] = false;
        exit();
    }

    echo 'Email o contraseña incorrectos.';
}
?>