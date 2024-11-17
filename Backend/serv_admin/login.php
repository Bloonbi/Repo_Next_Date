<?php
session_start();
header('Content-Type: application/json');
include '../controlador/conexion.php';

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

$username = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;


if ($username && $password) {
    try {
        $stmt = $pdo_conn->prepare("SELECT * FROM admins WHERE email = :email");
        $stmt->bindParam(':email', $username);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            if (password_verify($password, $usuario['password'])) {
                // Almacenar datos del usuario en la sesión
                $_SESSION['email'] = $username;
                echo json_encode(['success' => 'Login exitoso', 'user' => $usuario, 'session' => true]);
            } else {
                echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
            }
        } else {
            echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Nombre y contraseña son requeridos']);
}
?>
