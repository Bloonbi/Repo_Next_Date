<?php
include "conexion.php";


if (isset($_GET['producto'])) {
    $nombreProducto = $_GET['producto'];
    try {


        $sql = "SELECT * FROM producto WHERE Nombre LIKE :nombre";
        $stmt = $con->prepare($sql);
        $stmt->execute(['nombre' => "%$nombreProducto%"]);

        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultados) > 0) {
            echo json_encode($resultados, JSON_PRETTY_PRINT);
        } else {
            echo "No se encontraron resultados para '$nombreProducto'.";
        }

    } catch(PDOException $e) {
        echo "Error de conexión: " . $e->getMessage();
    }

} else {
    echo "Debe ingresar un nombre de producto.";
}
?>
