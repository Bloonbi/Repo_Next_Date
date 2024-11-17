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
        $sql .= "nombre = :nombre, ";
        $params[':nombre'] = $nombre;
    }
    if ($password !== null) {
        $sql .= "password = :password, ";
        $params[':password'] = $password;
    }
    if ($direccion !== null) {
        $sql .= "direccion = :direccion, ";
        $params[':direccion'] = $direccion;
    }
    if ($telefono !== null) {
        $sql .= "telefono = :telefono, ";
        $params[':telefono'] = $telefono;
    }
    if ($fecha_registro !== null) {
        $sql .= "fchReg = :fecha_registro, ";
        $params[':fecha_registro'] = $fecha_registro;
    }

    $sql = rtrim($sql, ', ');
    $sql .= " WHERE email = :email";
    $params[':email'] = $email;

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['message' => 'Cliente actualizado correctamente.']);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>