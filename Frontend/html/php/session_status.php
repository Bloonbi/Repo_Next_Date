<?php
session_start();
if (isset($_SESSION['user_name'])) {
    echo '<span id="user-name">' . htmlspecialchars($_SESSION['user_name']) . '</span>';
    echo '<a href="php/logout.php">Logout</a>';
} else {
    echo '<a href="#" id="login-link">Login</a>';
    echo '<a href="#" id="register-link">Register</a>';
}
?>
