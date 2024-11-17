<?php
$dsn = 'mysql:host=127.0.0.1;dbname=cafeteriaimperial;charset=utf8';
$usuario = 'root';
$contraseña = ''; // Ajusta la contraseña si la tienes configurada

try {
    $conn = new PDO($dsn, $usuario, $contraseña);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Falló la conexión: ' . $e->getMessage();
}
?>
