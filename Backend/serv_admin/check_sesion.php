<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['admins'])) {
    echo json_encode(['session' => true, 'admins' => $_SESSION['admins']]);
} else {
    echo json_encode(['session' => false]);
}
?>
