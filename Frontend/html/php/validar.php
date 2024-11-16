<?php
header('Content-Type: application/json');
session_start();


if (isset($_SESSION['cliente'])) {
    echo json_encode(['success' => true, 'cliente' => $_SESSION['cliente']]);
} else {
    echo json_encode(['success' => false]);
}
?>
