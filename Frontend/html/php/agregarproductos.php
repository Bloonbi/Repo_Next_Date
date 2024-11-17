<?php
session_start();
header('Content-Type: application/json');
include '../controlador/conexion.php';


$nombre = $_POST['nombre'] ?? null;
$descripcion = $_POST['descripcion'] ?? null;
$precio = $_POST['precio'] ?? null;
$cantidad = $_POST['cantidad'] ?? null;
$imagen = $_POST['imagen'] ?? null;


if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
  $uploadDir = 'uploads/';
 
  $uploadFile = $uploadDir . basename($_FILES['imagen']['name']);
  if (move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadFile)) {
      $imagen = $uploadFile;
  } else {
      echo json_encode(['error' => 'Error al subir la imagen']);
      exit;
  }
} elseif (isset($_FILES['imagen']) && $_FILES['imagen']['error'] !== UPLOAD_ERR_NO_FILE) {
  echo json_encode(['error' => 'Error al subir la imagen']);
  exit;
}

$stmt = $pdo_conn->prepare("INSERT INTO producto (nombre, descripcion, precio, cantidad, imagen) VALUES (:nombre, :descripcion, :precio, :cantidad, :imagen)");
  $stmt->bindParam(':nombre', $nombre);
  $stmt->bindParam(':descripcion', $descripcion);
  $stmt->bindParam(':precio', $precio);
  $stmt->bindParam(':cantidad', $cantidad);
  $stmt->bindParam(':imagen', $imagen);
  $stmt->execute();

  echo json_encode(['success' => 'Producto creado correctamente']);
?>