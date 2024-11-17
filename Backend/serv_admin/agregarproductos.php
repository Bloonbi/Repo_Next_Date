<?php

session_start();
header('Content-Type: application/json');
include '../controlador/conexion.php';


$nombre = $_POST['nombre'] ?? null;
$descripcion = $_POST['descripcion'] ?? null;
$precio = $_POST['precio'] ?? null;
$cantidad = $_POST['cantidad'] ?? null;


$stmt = $pdo_conn->prepare("INSERT INTO producto (nombre, descripcion, precio, cantidad) VALUES (:nombre, :descripcion, :precio, :cantidad)");
  $stmt->bindParam(':nombre', $nombre);
  $stmt->bindParam(':descripcion', $descripcion);
  $stmt->bindParam(':precio', $precio);
  $stmt->bindParam(':cantidad', $cantidad);
  $stmt->execute();

  echo json_encode(['success' => 'Producto creado correctamente']);
            ?>