<?php
include "conexion.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $con->prepare('SELECT * FROM cliente WHERE Email = :email');
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['cliente'] = $user['nombre'];
        $_SESSION['idc'] = $user['id'];
        echo json_encode(['success' => 'Usuario creado correctamente', 'cliente' => $user]);

    } else {
        echo 'Invalid ';
    }
}
?>
