<?php
include 'conexion.php';

$nombre = $_GET["nombre"];
$descripcion = $_GET["descripcion"];
$precio = $_GET["precio"];
$cantidad = $_GET["cantidad"];

try {
    $res = $pdo_conn->prepare("INSERT INTO producto (Nombre, Descripcion, Precio, Cantidad) VALUES (?, ?, ?, ?)");

    $res->execute([$nombre, $descripcion, $precio, $cantidad]);

    echo "Producto agregado correctamente.<br>";
    echo "<a href='../pages/main.html'>Volver</a>";
} catch(PDOException $error) {
    header("location:../pages/error.html");
    die();
}
?>
