<?php

include "../controlador/conexion.php";
$id = $_GET['id'];
            $stmt = $pdo_conn->prepare("SELECT * FROM producto WHERE idProd = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($product) {
                echo json_encode($product);
            } else {
                echo json_encode(['error' => 'Producto no encontrado']);
            }

?>