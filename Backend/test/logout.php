<?php
session_start();
header('Content-Type: application/json');

// Unset all session variables
$_SESSION = [];

// Destroy the session
session_destroy();

echo json_encode(['success' => 'Sesión cerrada correctamente']);
?>
