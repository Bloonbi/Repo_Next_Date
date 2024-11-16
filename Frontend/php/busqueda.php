<?php
    include "conexion.php";
    $sql = 'SELECT * FROM producto ORDER BY Nombre';
    foreach ($conexion->query($sql) as $row) {
        print $row['Id_Producto'] . "\t";
        print $row['Nombre'] . "\t";
        print $row['Descripcion'] . "\t";
        print $row['Precio'] . "\n";
        echo "<br>";
    }

?>
