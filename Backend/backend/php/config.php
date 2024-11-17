<?php
require '../../frontend/php/conexion.php';

$logo = $_GET['Logo'];
$nombre = $_GET['Nombre'];
$descripcion = $_GET['Descripcion'];
$direccion = $_GET['Direccion'];
$email = $_GET['Email'];
$telefono = $_GET['Telefono'];

$sql = "UPDATE empresa SET Nombre=?, Descripcion=?, Direccion=?, Email=?, Telefono=? WHERE Logo=?";

$res = $con->prepare($sql);
$res->execute([$nombre,$descripcion,$direccion,$email,$telefono,$logo]);
header('Location: ../pages/main.html');