<?php
session_start();

require "conexion.php";




if (isset($_GET['producto'])) {
    $idprod = $_GET['producto'];
    $idcliente = $_SESSION['idc'];
    
    
    // Definir la cantidad inicial y el precio
    $cantidad = 1;


    $stmt = $con->prepare("SELECT precio FROM producto WHERE Id_Producto = :Id_Producto");
    $stmt->bindParam(':Id_Producto', $idprod);
    $stmt->execute();
    $prod = $stmt->fetch(PDO::FETCH_ASSOC);
$precio = $prod['precio'];

    // Verificar si el producto ya está en el carrito
    $stmt = $con->prepare("SELECT cantidad FROM carrito_compra WHERE Id_Producto = :Id_Producto AND Id_Cliente = :Id_Cliente");
    $stmt->bindParam(':Id_Producto', $idprod);
    $stmt->bindParam(':Id_Cliente', $idcliente);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $nuevaCantidad = $row['cantidad'] + 1;

        $updateStmt = $con->prepare("UPDATE carrito_compra SET cantidad = :cantidad WHERE Id_Producto = :Id_Producto AND Id_Cliente = :Id_Cliente");
        $updateStmt->bindParam(':cantidad', $nuevaCantidad);
        $updateStmt->bindParam(':Id_Producto', $idprod);
        $updateStmt->bindParam(':Id_Cliente', $idcliente);
        $updateStmt->execute();

        echo json_encode(array('message' => 'Cantidad actualizada en el carrito'));
    } else {
        // Si el producto no está en el carrito, inserta un nuevo registro
        $stmt = $con->prepare("INSERT INTO carrito_compra (Id_Producto, Precio, Id_Cliente, cantidad) VALUES (:Id_Producto, :precio, :Id_Cliente, :cantidad)");
        $stmt->bindParam(':Id_Producto', $idprod);
        $stmt->bindParam(':precio', $precio);
        $stmt->bindParam(':Id_Cliente', $idcliente);
        $stmt->bindParam(':cantidad', $cantidad);
        $stmt->execute();

        echo json_encode(array('message' => 'Producto agregado al carrito'));
    }
} else {
    echo json_encode(array('message' => 'Error al agregar producto al carrito'));
}



?>
