<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);

$table = array();
$db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
$req = $db->prepare('SELECT * FROM entreprise where Email=:u and password=:p');
$req->execute(['u' => $_POST["email"], 'p' => $_POST["password"]]);
$res = $req->fetchAll();
if (count($res) > 0) {
  echo json_encode([true, $res]);
} else {
  echo json_encode([false]);

}

?>