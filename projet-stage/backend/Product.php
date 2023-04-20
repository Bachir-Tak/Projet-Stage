<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'POST') {
    if (isset($_POST["nom"])) {
        try {
            $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
            $req = $db->prepare('SELECT * FROM produit where nom=:u and nb_ICE=:y');
            $req->execute(['u' => $_POST["nom"], 'y' => $_POST["ice"]]);
            $res = $req->fetchAll();
            if (count($res) > 0) {
                echo json_encode(false);
            } else {
                $sql = 'INSERT INTO produit(nb_ICE,nom,prix_unitaire,TVA) VALUES (:u, :p, :y, :z)';
                $req = $db->prepare($sql);
                $res = $req->execute(['u' => $_POST["ice"], 'p' => $_POST["nom"], 'y' => $_POST["prix"], 'z' => $_POST["tva"]]);
                echo json_encode($res);
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
if ($method == 'GET') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    $req = $db->prepare('SELECT * FROM produit where nb_ICE=:y');
    $req->execute(['y' => $_GET["ice"]]);
    $res = $req->fetchAll();
    echo json_encode($res);
}
if ($method == 'DELETE') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    $req = $db->prepare('DELETE FROM produit where id_produit=:u and nb_ICE=:y');
    $req->execute(["u" => $_POST["id"], 'y' => $_POST["ice"]]);
    $res = $req->fetchAll();
    echo json_encode($res);
}
if ($method == 'PUT') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    $req = $db->prepare('UPDATE produit set  nom=:p , prix_unitaire=:y , TVA=:z where id_produit=:x');
    $req->execute(["x" => $_POST["id"], 'p' => $_POST["nom"], 'y' => $_POST["prix"], 'z' => $_POST["tva"]]);
    $res = $req->fetchAll();
    echo json_encode($res);
}
?>