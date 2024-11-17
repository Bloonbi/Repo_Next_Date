<?php
header('Content-Type: application/json');
include '../controlador/conexion.php';

 /*error_reporting(E_ALL);
ini_set('display_errors', 1); */

$itemsPerPage = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $itemsPerPage;

$stmt = $pdo_conn->prepare("SELECT COUNT(*) as total FROM productos");
$stmt->execute();
$totalItems = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

$stmt = $pdo_conn->prepare("SELECT * FROM productos LIMIT :offset, :itemsPerPage");
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->bindParam(':itemsPerPage', $itemsPerPage, PDO::PARAM_INT);
$stmt->execute();
$productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

$totalPages = ceil($totalItems / $itemsPerPage);

echo json_encode([
    'productos' => $productos,
    'totalPages' => $totalPages,
    'currentPage' => $page
]);

?>
