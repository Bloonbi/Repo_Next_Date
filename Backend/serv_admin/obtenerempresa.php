<?php

header('Content-Type: application/json');
include '../controlador/conexion.php';

$stmt = $pdo_conn->prepare("SELECT * FROM empresa");
$stmt->execute();
$empresa = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($empresa);