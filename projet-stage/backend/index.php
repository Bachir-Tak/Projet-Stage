<?php
session_start();
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    header('Location:' . 'accueil.php');
} else {
    header('Location:' . 'Login.php');
}
?>