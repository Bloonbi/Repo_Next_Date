<?php
session_start();
header('Content-Type: application/json');
include '../controlador/conexion.php';

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

//if ($email && $password) {
    try {
        $stmt = $pdo_conn->prepare("SELECT * FROM admins WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $admins = $stmt->fetch(PDO::FETCH_ASSOC);

        //if ($admins->next()) {
            //if (password_verify($password, $admins['password'])) {
                // Store user data in the session
                $_SESSION['admins'] = $admins;
                $_SESSION['admins'] = true;
                echo json_encode(['success' => 'exitoso', 'user' => $admins, 'session' => true]);
        //    } else {
         //       echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
        //    }
       // } else {
        //    echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
       // }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
    }
//} else {
//    echo json_encode(['error' => 'email y password son requeridos']);
//
?>
