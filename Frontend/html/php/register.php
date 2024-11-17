<?php
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])) {
        $nombre = $_POST['name'];
        $email = $_POST['email'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT); 
        $fecha_registro = date('Y-m-d');

        $sql = 'INSERT INTO Cliente (Nombre, Email, Password, Fecha_registro) VALUES (:nombre, :email, :password, :fecha_registro)';
        $stmt = $conn->prepare($sql);

        try {
            $stmt->execute(['nombre' => $nombre, 'email' => $email, 'password' => $password, 'fecha_registro' => $fecha_registro]);
            echo 'success';
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                echo 'El correo electrónico ya está registrado.';
            } else {
                echo 'Error en el registro: ' . $e->getMessage();
            }
        }
    } else {
        echo 'No se recibieron todos los datos necesarios.';
    }
} else {
    echo 'Método de solicitud no permitido.';
}
?>
