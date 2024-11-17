<?php
require '../../frontend/php/conexion.php';
$res = $con ->query('SELECT * FROM producto');
while($reg = $res -> fetch()){
    echo "$reg[0] - $reg[1]  <a href=borrar.php?id=$reg[0]>eliminar</a><br>";
}
echo"<br><a href=../pages/main.html>volver </a>";