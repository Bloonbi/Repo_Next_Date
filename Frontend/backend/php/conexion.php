<?php               /* 127.0.0.1/si/php/busqueda.php */
$dsn = 'mysql:dbname=cafeteriaimperialbd;host=127.0.0.1';
$usuario = 'root';
$contraseña = '';

try {
    $con = new PDO($dsn, $usuario, $contraseña);
} catch (PDOException $e) {
    echo 'Falló la conexión: ' . $e->getMessage();
}

?>