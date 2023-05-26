<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);
$method = $_SERVER['REQUEST_METHOD'];
$db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

if ($method == 'POST') {
    $req = $db->prepare('SELECT `Admin` FROM `compte` where nb_ICE=:y');
    $req->execute(['y' => $_POST["ice"]]);
    $res = $req->fetchAll();
    if ($res[0]["Admin"] == 1) {
        $req = $db->prepare('UPDATE entreprise set  nom_entreprise=:u , adresse_entreprise=:p, tel_entreprise=:z, Email=:x,  activite=:y, password=:s where nb_ICE=:n');
        $res = $req->execute(["u" => $_POST["nom"], 'p' => $_POST["adresse"], 'z' => $_POST["tel"], 'x' => $_POST["email"], 'y' => $_POST["activite"], 's' => hash('sha256', $_POST["password"]), 'n' => $_POST["ice"]]);
        $req = $db->prepare('UPDATE compte set  Email=:x, Password=:s where nb_ICE=:n');
        $res = $req->execute(['x' => $_POST["email"], 's' => hash('sha256', $_POST["password"]), 'n' => $_POST["ice"]]);
        echo json_encode($res);
    } else {
        $req = $db->prepare('UPDATE compte set  Nom=:u , Email=:x, Password=:s where nb_ICE=:n');
        $res = $req->execute(["u" => $_POST["nom"], 'x' => $_POST["email"], 's' => hash('sha256', $_POST["password"]), 'n' => $_POST["ice"]]);
        echo json_encode($res);
    }
}
if ($method == 'GET') {
    $req = $db->prepare('SELECT `Admin` FROM `compte` where nb_ICE=:y');
    $req->execute(['y' => $_GET["ice"]]);
    $res = $req->fetchAll();
    $admin = $res[0]["Admin"];
    if ($res[0]["Admin"] == 1) {
        $req = $db->prepare('SELECT `nb_ICE`, `Email`, `nom_entreprise`, `adresse_entreprise`, `tel_entreprise`, `forme_juridique`, `activite`, `id_fiscal` FROM `entreprise` where nb_ICE=:y');
        $req->execute(['y' => $_GET["ice"]]);
        $res = $req->fetchAll();
        array_push($res, $admin);
        echo json_encode($res);
    } else {
        $req = $db->prepare('SELECT `Nom`, `Email` FROM `compte` where nb_ICE=:y');
        $req->execute(['y' => $_GET["ice"]]);
        $res = $req->fetchAll();
        array_push($res, $admin);
        echo json_encode($res);
    }
}
?>