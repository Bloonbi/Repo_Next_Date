<?php
session_start();
require 'conectar.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM admins WHERE Email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && password_verify($password, $admin['Password'])) {
        $_SESSION['user_id'] = $admin['Id_Admin'];
        $_SESSION['is_admin'] = true;
        header("Location: admin.php");
        exit();
    }

    $sql = "SELECT * FROM cliente WHERE Email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);
    $client = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($client && password_verify($password, $client['Password'])) {
        $_SESSION['user_id'] = $client['Id_Cliente'];
        $_SESSION['is_admin'] = false;
        header("Location: user.php");
        exit();
    }

    echo 'Email o contraseña incorrectos.';
}
?>