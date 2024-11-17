<?php
/*
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
}*/

session_start();
header('Content-Type: application/json');
include "conexion.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

//$action = isset($_POST['action']) ? $_POST['action'] : null;
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$address = $_POST['address'];
$phone = $_POST['phone'];
$date = date('Y-m-d');


    // Check if all required fields are provided
    if (!$name || !$email || !$password || !$address || !$phone) {
        echo json_encode(['error' => 'Todos los campos son requeridos']);
        exit();
    }

    // Hash the password
    $password_hashed = password_hash($password, PASSWORD_BCRYPT);

    try {
        // Insert Cliente into the database
        $stmt = $con->prepare("INSERT INTO cliente (Nombre, Email, Password, Direccion, Telefono, Fecha_registro) VALUES (:nombre, :email, :password, :address, :phone, :date)");
        $stmt->bindParam(':nombre', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password_hashed);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':date', $date);
        $stmt->execute();

        // Fetch the new Cliente to set session variable
        $stmt = $con->prepare("SELECT * FROM cliente WHERE Email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $_SESSION['cliente'] = $user;
        echo json_encode(['success' => 'Usuario creado correctamente', 'user' => $user]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
    }
//} else {
//    echo json_encode(['error' => 'Acción no válida']);
//}
?>


