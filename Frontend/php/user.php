<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['is_admin']) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Usuario</title>
</head>
<body>
    <h1>Bienvenido, Usuario</h1>
    <a href="logout.php">Cerrar Sesión</a>
</body>
</html>