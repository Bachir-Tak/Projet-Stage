<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);

$db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
$sql = 'INSERT INTO entreprise(nb_ICE, password,forme_juridique,activite,id_fiscal,Email,nom_entreprise) VALUES (:u, :p, :z, :x, :q,:g,:f)';
$req = $db->prepare($sql);
$res = $req->execute(['u' => $_POST["ice"], 'p' => hash('sha256', $_POST["password"]), 'z' => $_POST["formejuridique"], 'x' => $_POST["activite"], 'q' => $_POST["identifiantfiscal"], 'g' => $_POST["email"], 'f' => $_POST["nom"]]);
if ($res == false) {
  echo json_encode($res);
} else {
  $sql = 'INSERT INTO compte(nb_ICE, Nom,Email,Password) VALUES (:u, :p, :z, :x)';
  $req = $db->prepare($sql);
  $res = $req->execute(['u' => $_POST["ice"], 'p' => "Admin", 'z' => $_POST["email"], 'x' => hash('sha256', $_POST["password"])]);
  echo json_encode($res);
  if ($res == false) {
    $sql = 'DELETE FROM entreprise where nb_ICE=:u';
    $req = $db->prepare($sql);
    $res = $req->execute(['u' => $_POST["ice"]]);
  }
}

?>