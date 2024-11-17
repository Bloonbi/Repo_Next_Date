<?php
require "conexion.php";

session_start();
    $idcliente =$_SESSION['idc'];
    try {

  

$sql = "SELECT * FROM  producto p
        JOIN `carrito_compra` cc
        ON cc.idProducto = p.idProd
        WHERE idCliente = :idc";


        $stmt = $con->prepare($sql);
        $stmt->bindParam(':idc' , $idcliente);
        $stmt->execute();


        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultados) > 0) {
       
            echo json_encode($resultados, JSON_PRETTY_PRINT);
        } else {
            echo json_encode(["error" =>"No se encontraron resultados para '$idcliente'."]);
        }

    } catch(PDOException $e) {
        echo json_encode(["error" => "Error de conexión"]);
    }


    ?>