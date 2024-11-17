<?php
session_start();

require "conexion.php";




if (isset($_GET['producto'])) {
    $idprod = $_GET['producto'];
    $idcliente = $_SESSION['idc'];
    
    
    // Definir la cantidad inicial y el precio
    $cantidad = 1;


    $stmt = $con->prepare("SELECT nombre, precio FROM producto WHERE idProd = :Id_Producto");
    $stmt->bindParam(':Id_Producto', $idprod);
    $stmt->execute();
    $prod = $stmt->fetch(PDO::FETCH_ASSOC);

   

    // Verificar si el producto ya está en el carrito
    $stmt = $con->prepare("SELECT cantidad FROM carrito_compra WHERE idProducto = :Id_Producto AND idCliente = :Id_Cliente");
    $stmt->bindParam(':Id_Producto', $idprod);
    $stmt->bindParam(':Id_Cliente', $idcliente);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if(isset($_GET['cantidad'])){
            $nuevaCantidad = $_GET['cantidad'];
        }else{
            $nuevaCantidad = $row['cantidad'];
            $nuevaCantidad++;
        }
        //$precio = $prod['precio'];
        $updateStmt = $con->prepare("UPDATE carrito_compra SET cantidad = :cantidad WHERE idProducto = :Id_Producto AND idCliente = :Id_Cliente");
        $updateStmt->bindParam(':cantidad', $nuevaCantidad);
        $updateStmt->bindParam(':Id_Producto', $idprod);
        $updateStmt->bindParam(':Id_Cliente', $idcliente);
        $updateStmt->execute();

        echo json_encode(array('message' => 'Cantidad actualizada en el carrito'));
    } else {
        $cantidad = 1;
        // Si el producto no está en el carrito, inserta un nuevo registro
        $stmt = $con->prepare("INSERT INTO carrito_compra (idCliente, idProducto, cantidad) VALUES (:Id_Cliente,:Id_Producto, :cantidad)");
      $stmt->bindParam(':Id_Cliente', $idcliente);
               $stmt->bindParam(':Id_Producto', $idprod);
  $stmt->bindParam(':cantidad',$cantidad);
        $stmt->execute();

        echo json_encode(array('message' => 'Producto agregado al carrito'));
    }
} else {
    echo json_encode(array('message' => 'Error al agregar producto al carrito'));
}



?>
