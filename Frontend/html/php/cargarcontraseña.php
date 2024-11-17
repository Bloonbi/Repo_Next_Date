<?php
session_start();

require "conexion.php";

$idcliente = $_SESSION['idc'];

$sql = "SELECT Password FROM cliente WHERE Id_Cliente = :idc";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':idc' , $idcliente);
        $stmt->execute();


        $ContraseñaCliente = $stmt->fetch(PDO::FETCH_ASSOC);


        echo json_encode($ContraseñaCliente, JSON_PRETTY_PRINT);
   
?>
