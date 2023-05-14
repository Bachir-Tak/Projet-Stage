<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);
$db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');

$req = $db->prepare('SELECT * FROM historique where ice=:y');
$req->execute(['y' => $_GET["ice"]]);
$res = $req->fetchAll();
echo json_encode($res);
?>