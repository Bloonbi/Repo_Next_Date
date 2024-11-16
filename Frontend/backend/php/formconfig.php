<?php
require '../../frontend/php/conexion.php';

$logo = "1";

$res = $con->prepare("SELECT * FROM empresa WHERE Logo=?");
$res->execute([$logo]);

$reg = $res->fetch();



echo "<form action='config.php' method='get'>
<input type='hidden' name='Logo' value='$reg[0]'>
<input type='text' name='Nombre' value='$reg[1]'>
<input type='text' name='Descripcion' value='$reg[2]'>
<input type='text' name='Direccion' value='$reg[3]'>
<input type='text' name='Email' value='$reg[4]'>
<input type='text' name='Telefono' value='$reg[5]'>
<br>
<br>
<input type='submit' value='Modificar'>
</form>
";
echo "<br><a href=../pages/main.html> Volver</a>";