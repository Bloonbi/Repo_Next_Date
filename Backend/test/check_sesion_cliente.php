<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['cliente'])) {
    echo json_encode(['session' => true, 'user' => $_SESSION['cliente']]);
} else {
    echo json_encode(['session' => false]);
}
?>
