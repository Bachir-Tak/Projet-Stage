<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);

$db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
$req = $db->prepare('SELECT * FROM compte where Email=:u and Password=:p');
$req->execute(['u' => $_POST["email"], 'p' => hash('sha256', $_POST["password"])]);
$res = $req->fetchAll();
$nom = $res[0]["Nom"];
if (count($res) > 0) {
  $req = $db->prepare('SELECT `nb_ICE`, `Email`, `nom_entreprise`, `adresse_entreprise`, `tel_entreprise`, `forme_juridique`, `activite`, `id_fiscal` FROM `entreprise` where nb_ICE=:u');
  $req->execute(['u' => $res[0]["nb_ICE"]]);
  $res = $req->fetchAll();
  echo json_encode([true, $res, $nom]);
} else {
  echo json_encode([false]);

}

?>