<?php
include "conexion.php";

$nombre = $_GET["nombre"];
$descripcion = $_GET["descripcion"];
$precio = $_GET["precio"];
$cantidad = $_GET["cantidad"];
$fecha_creacion = $_GET["fecha_creacion"];
$fecha_vencimiento = $_GET["fecha_vencimiento"];

$fecha_registro = date("Y-m-d");

try {
    $res = $con->prepare("INSERT INTO producto (Nombre, Descripcion, Precio, Cantidad, Fecha_Creacion, Fecha_Vencimiento) VALUES (?, ?, ?, ?, ?, ?)");

    $res->execute([$nombre, $descripcion, $precio, $cantidad, $fecha_creacion, $fecha_vencimiento]);

    echo "Producto agregado correctamente.<br>";
    echo "<a href='../index.html'>Volver</a>";
} catch(PDOException $error) {
    header("location:../pages/error.html");
    die();
}
?>
