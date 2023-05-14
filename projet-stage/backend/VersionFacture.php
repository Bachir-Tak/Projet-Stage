<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);
$db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

$req = $db->prepare('SELECT id, date_facture, TotalTTC, nom_client, Remise FROM versionfacture where nb_ICE=:y and id_facture=:u');
$req->execute(['y' => $_GET["ice"], 'u' => $_GET["id"]]);
$res = $req->fetchAll();
echo json_encode($res);
?>