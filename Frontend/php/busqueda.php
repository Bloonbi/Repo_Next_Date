<?php
    include "conexion.php";
    $sql = 'SELECT * FROM producto ORDER BY Nombre';
    foreach ($con->query($sql) as $row) {
        print $row['Id_Producto'] . "\t";
        print $row['Nombre'] . "\t";
        print $row['Descripcion'] . "\t";
        print $row['Precio'] . "\n";
        echo "<br>";
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>si</h1>
</body>
</html>