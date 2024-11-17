<?php
include "conexion.php";

$sql = "SELECT * FROM productos WHERE Id_Producto = :Id_Producto";
$all_product = $con->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
    <link rel="stylesheet" href="../css/Style_Prod.css">
</head>
<body>
    <?php
        include_once 'header.php';
    ?>
 <main>
    <?php
    while($row = ($)){
        ?>
        <div class="card">
            <div class="img">
                <img src="<?php echo $row ["Descripcion"];?>" alt="">
            </div>
            <div class="caption">
                <p class="product_na"><?php echo $row ["Nombre"];?></p>
                <p class="price"><b><?php echo $row ["Descripcion"]?></b></p>
                <p class="cantidad"><del><?php echo $row ["Precio"]?></del></p>
                <button class="add">Añadir al Carrito</button>
            </div>
        </div>
        <?php
        else {
        echo "No se encontraron productos.";
    }}
    ?>
    </main>
</body>
</html>