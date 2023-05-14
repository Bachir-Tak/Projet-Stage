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
                $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
                $req = $db->prepare($sql);
                $req->execute(['p' => "Un nouveau produit " . $_POST["nom"] . " a été inséré dont l'id est " . $db->lastInsertId(), 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
                echo json_encode($res);
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
if ($method == 'GET') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');

    if (isset($_GET["search"])) {
        if (isset($_GET["nom"]) && $_GET["nom"] != null) {
            $req = $db->prepare('SELECT * FROM produit where nom=:u and nb_ICE=:y and Actif=0');
            $req->execute(['u' => $_GET["nom"], 'y' => $_GET["ice"]], );
            $res = $req->fetchAll();
            echo json_encode($res);
        }
    } else {
        if (isset($_GET["actif"])) {
            $req = $db->prepare('SELECT * FROM produit where nb_ICE=:y and Actif=1');
            $req->execute(['y' => $_GET["ice"]]);
            $res = $req->fetchAll();
            echo json_encode($res);
        } else if (isset($_GET["id_modif"])) {
            $req = $db->prepare('SELECT * FROM produit where nb_ICE=:y and Actif=0 and id_produit=:u');
            $req->execute(['y' => $_GET["ice"], 'u' => $_GET["id_modif"]]);
            $res = $req->fetchAll();
            echo json_encode($res);
        } else {
            $req = $db->prepare('SELECT * FROM produit where nb_ICE=:y and Actif=0');
            $req->execute(['y' => $_GET["ice"]]);
            $res = $req->fetchAll();
            echo json_encode($res);
        }
    }
}
if ($method == 'DELETE') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    if (isset($_POST["actif"])) {
        $req = $db->prepare('UPDATE produit set Actif=1 where id_produit=:u and nb_ICE=:y');
        $req->execute(["u" => $_POST["id"], 'y' => $_POST["ice"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "Le produit " . $_POST["nom"] . "  dont l'id est " . $_POST["id"] . " a été envoyé au bin", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    } else {
        $req = $db->prepare('DELETE FROM produit where id_produit=:u and nb_ICE=:y');
        $req->execute(["u" => $_POST["id"], 'y' => $_POST["ice"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "Le produit " . $_POST["nom"] . "  dont l'id est " . $_POST["id"] . " a été supprimé définitivement", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    }
}
if ($method == 'PUT') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');

    if (isset($_POST["actif"])) {
        $req = $db->prepare('UPDATE produit set Actif=0 where id_produit=:u');
        $req->execute(["u" => $_POST["id"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "Le produit " . $_POST["nom"] . "  dont l'id est " . $_POST["id"] . " a été renvoyé du bin", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    } else {
        $req = $db->prepare('UPDATE produit set  nom=:p , prix_unitaire=:y , TVA=:z where id_produit=:x');
        $req->execute(["x" => $_POST["id"], 'p' => $_POST["nom"], 'y' => $_POST["prix"], 'z' => $_POST["tva"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "Le produit " . $_POST["nom"] . " dont l'id est " . $_POST["id"] . " a été updaté", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    }
}
?>