<?php
include "conexion.php";
try {
    $email = $_POST['email'];
    $nombre = $_POST['nombre'] ?? null;
    $password = $_POST['password'] ?? null;
    $direccion = $_POST['direccion'] ?? null;
    $telefono = $_POST['telefono'] ?? null;
    $fecha_registro = $_POST['fecha_registro'] ?? null;

    $sql = "UPDATE cliente SET ";
    $params = [];

    if ($nombre !== null) {
        $sql .= "Nombre = :nombre, ";
        $params[':nombre'] = $nombre;
    }
    if ($password !== null) {
        $sql .= "Password = :password, ";
        $params[':password'] = $password;
    }
    if ($direccion !== null) {
        $sql .= "Direccion = :direccion, ";
        $params[':direccion'] = $direccion;
    }
    if ($telefono !== null) {
        $sql .= "Telefono = :telefono, ";
        $params[':telefono'] = $telefono;
    }
    if ($fecha_registro !== null) {
        $sql .= "Fecha_registro = :fecha_registro, ";
        $params[':fecha_registro'] = $fecha_registro;
    }

    $sql = rtrim($sql, ', ');
    $sql .= " WHERE Email = :email";
    $params[':email'] = $email;

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['message' => 'Cliente actualizado correctamente.']);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>