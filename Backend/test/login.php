<?php
session_start();
header('Content-Type: application/json');
include 'conexion.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

$username = $_POST['username'] ?? null;
$password = $_POST['password'] ?? null;

if ($username && $password) {
    try {
        $stmt = $pdo_conn->prepare("SELECT * FROM clientes WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $cliente = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($cliente) {
            if (password_verify($password, $cliente['password'])) {
                // Store user data in the session
                $_SESSION['cliente'] = $cliente;
                echo json_encode(['success' => 'Login exitoso', 'user' => $cliente, 'session' => true]);
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
    echo json_encode(['error' => 'Username y password son requeridos']);
}
?>
