<?php

include "../controlador/conexion.php";

            $stmt = $pdo_conn->prepare("SELECT * FROM empresa WHERE id = 1");
            
            $stmt->execute();
            $empresa = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($empresa) {
                echo json_encode($empresa);
            } else {
                echo json_encode(['error' => 'Datos no encontrados']);
            }

?>