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

   


       

    }



?>
