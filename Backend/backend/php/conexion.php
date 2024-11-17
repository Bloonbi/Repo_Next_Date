<?php
$usuario_db = 'root';
$contrasena_db = '';
$dbname = 'cafeteria';
$host = 'localhost';

try {
    $pdo_conn = new PDO("mysql:host=$host;dbname=$dbname", $usuario_db, $contrasena_db);
    $pdo_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
    exit();
}
?>
