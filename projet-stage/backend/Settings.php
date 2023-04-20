<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);
$db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
$req = $db->prepare('UPDATE entreprise set  nom_entreprise=:u , adresse_entreprise=:p, tel_entreprise=:z, Email=:x,  activite=:y, password=:s where nb_ICE=:n');
$req->execute(["u" => $_POST["nom"], 'p' => $_POST["adresse"], 'z' => $_POST["tel"], 'x' => $_POST["email"], 'y' => $_POST["activite"], 's' => $_POST["password"], 'n' => $_POST["ice"]]);
$res = $req->fetchAll();
echo json_encode($res);

?>