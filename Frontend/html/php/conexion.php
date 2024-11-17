<?php
$dsn = 'mysql:dbname=cafee;host=127.0.0.1';
$usuario = 'root';
$contraseña = '';

try {
    $con = new PDO($dsn, $usuario, $contraseña);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Falló la conexión: ' . $e->getMessage();
}
?>

