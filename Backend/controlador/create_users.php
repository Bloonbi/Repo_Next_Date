<?php
include 'conexion.php';

try {
    $passwords = [
        'mag' => '123',
      
    ];

    foreach ($passwords as $username => $password) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo_conn->prepare("INSERT INTO admins (nombre, email, password, cargo) VALUES (:nombre, :email, :password, :cargo)");
        $stmt->execute([
            ':nombre' => ucfirst($username),
            ':email' => 'mag@gmail.com',
            ':cargo' => 'nose',
            ':password' => $hashedPassword
        ]);
    }

    echo "Usuarios creados exitosamente.";
} catch (PDOException $e) {
    echo "Error al crear usuarios: " . $e->getMessage();
}
?>
