<?php
// Configuración de la base de datos
$host = "localhost";
$dbname = "cafee";
$username = "root";
$password = "";

// Conectar a la base de datos
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener los datos enviados desde el frontend
    $data = json_decode(file_get_contents("php://input"), true);
    $nombremod = $data['nombremod'];
    $descripcion = $data['descripcionmod'];
    $telefono = $data['telefono'];
    $direccion = $data['direccion'];
    $emailmod = $data['emailmod'];
    $propietarios = $data['propietarios'];

    // Preparar la consulta SQL para actualizar los datos
    $sql = "UPDATE empresa SET nombre = ?, descripcion = ?, telefono = ?, direccion = ?, email = ?, propietarios = ? WHERE id = 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombremod, $descripcion,$telefono, $direccion, $emailmod, $propietarios]);

    // Responder con éxito
    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    // En caso de error, responder con un mensaje
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
