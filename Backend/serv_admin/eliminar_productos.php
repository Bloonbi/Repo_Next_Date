<?php
session_start();
header('Content-Type: application/json');
include '../controlador/conexion.php';

$id = $_POST['idProd'];
        
        $stmt = $pdo_conn->prepare("DELETE FROM producto WHERE idProd = :idProd");
        $stmt->bindParam(':idProd', $id);
        $stmt->execute();
    
        echo json_encode(['success' => 'Producto eliminado correctamente']);
?>