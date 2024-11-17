<?php
session_start();
header('Content-Type: application/json');
include '../controlador/conexion.php';

 /*error_reporting(E_ALL);
ini_set('display_errors', 1); */

//Crea la paginacion
$itemsPerPage = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $itemsPerPage;


try {

//Trae todos los productos
$stmt = $pdo_conn->prepare("SELECT COUNT(*) as total FROM producto WHERE promocion = '1'");
$stmt->execute();
$totalItems = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

//Trae los productos limitados a la cantidad definidos a la variable itemsPerPage
//$stmt = $pdo_conn->prepare("SELECT * FROM producto LIMIT :offset, :itemsPerPage");
//$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
//$stmt->bindParam(':itemsPerPage', $itemsPerPage, PDO::PARAM_INT);
$stmt = $pdo_conn->prepare("SELECT * FROM producto WHERE promocion = '1'");
$stmt->execute();
$productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

$totalPages = ceil($totalItems / $itemsPerPage);

//Muestra la page, etc
echo json_encode([
    'producto' => $productos,
    'totalPages' => $totalPages,
    'currentPage' => $page
]);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
}

?>