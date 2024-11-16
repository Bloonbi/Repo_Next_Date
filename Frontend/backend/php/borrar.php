<?php
require '../../frontend/php/conexion.php';
$id = $_GET ['id'];
$sql = "DELETE FROM producto WHERE Id_Producto=?";
$res = $con ->prepare($sql);
$res ->execute([$id]);
echo"<br><a href=../php/eliminar.php>volver </a>";
