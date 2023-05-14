<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'POST') {
    try {
        $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
        $req = $db->prepare('SELECT * FROM client where nom_client=:u and nb_ICE=:y');
        $req->execute(['u' => $_POST["nom"], 'y' => $_POST["ice"]]);
        $res = $req->fetchAll();
        if (count($res) > 0) {
            echo json_encode(false);
        } else {
            $sql = 'INSERT INTO client(nom_client,adresse_client,tel_client,nb_ICE) VALUES (:u, :p, :z,:y)';
            $req = $db->prepare($sql);
            $res = $req->execute(['u' => $_POST["nom"], 'p' => $_POST["adresse"], 'z' => $_POST["tel"], 'y' => $_POST["ice"]]);
            $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
            $req = $db->prepare($sql);
            $req->execute(['p' => "Un nouveau client " . $_POST["nom"] . " a été inséré dont l'id est " . $db->lastInsertId(), 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
            echo json_encode($res);
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

}
if ($method == 'GET') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    if (isset($_GET["search"])) {
        if (isset($_GET["nom"]) && $_GET["nom"] != null) {
            $req = $db->prepare('SELECT * FROM client where nom_client=:u and nb_ICE=:y and Actif=0');
            $req->execute(['u' => $_GET["nom"], 'y' => $_GET["ice"]]);
            $res = $req->fetchAll();
            echo json_encode($res);
        }
    } else {
        if (isset($_GET["actif"])) {
            $req = $db->prepare('SELECT * FROM client where nb_ICE=:y and Actif=1');
            $req->execute(['y' => $_GET["ice"]]);
            $res = $req->fetchAll();
            echo json_encode($res);

        } else if (isset($_GET["id_modif"])) {
            $req = $db->prepare('SELECT * FROM client where nb_ICE=:y and Actif=0 and id_client=:u');
            $req->execute(['y' => $_GET["ice"], 'u' => $_GET["id_modif"]]);
            $res = $req->fetchAll();
            echo json_encode($res);
        } else {
            $req = $db->prepare('SELECT * FROM client where nb_ICE=:y and Actif=0');
            $req->execute(['y' => $_GET["ice"]]);
            $res = $req->fetchAll();
            echo json_encode($res);
        }
    }
}
if ($method == 'DELETE') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    if (isset($_POST["actif"])) {
        $req = $db->prepare('UPDATE client set Actif=1 where id_client=:u');
        $req->execute(["u" => $_POST["id"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "Le client " . $_POST["nom"] . "  dont l'id est " . $_POST["id"] . " a été envoyé au bin", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    } else {
        if (isset($_POST["withInvoice"])) {
            $req = $db->prepare('SELECT id_facture FROM facture INNER JOIN client on facture.nom_client=client.nom_client where client.id_client=:u');
            $req->execute(["u" => $_POST["id"]]);
            $res = $req->fetchAll();
            $req = $db->prepare('DELETE FROM produitfacture where id_facture=:u');
            $req->execute(["u" => $res[0]["id_facture"]]);
            $req = $db->prepare('DELETE FROM facture where id_facture=:u');
            $req->execute(["u" => $res[0]["id_facture"]]);
            $req = $db->prepare('DELETE FROM client where id_client=:u');
            $req->execute(["u" => $_POST["id"]]);
            $res = $req->fetchAll();
            $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
            $req = $db->prepare($sql);
            $req->execute(['p' => "Le client " . $_POST["nom"] . " dont l'id est " . $_POST["id"] . " a été supprimé définitivement avec ses factures", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
            echo json_encode($res);
        } else {
            $req = $db->prepare('DELETE FROM client where id_client=:u');
            $req->execute(["u" => $_POST["id"]]);
            $res = $req->fetchAll();
            $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
            $req = $db->prepare($sql);
            $req->execute(['p' => "Le client " . $_POST["nom"] . " dont l'id est " . $_POST["id"] . " a été supprimé définitivement", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
            echo json_encode($res);

        }
    }
}
if ($method == 'PUT') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    if (isset($_POST["actif"])) {
        $req = $db->prepare('UPDATE client set Actif=0 where id_client=:u');
        $req->execute(["u" => $_POST["id"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "Le client  " . $_POST["nom"] . " dont l'id est " . $_POST["id"] . " a été renvoyé du bin", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    } else {
        $req = $db->prepare('UPDATE client set nom_client=:u , adresse_client=:p , tel_client=:z where id_client=:y');
        $req->execute(["y" => $_POST["id"], 'u' => $_POST["nom"], 'p' => $_POST["adresse"], 'z' => $_POST["tel"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "Le client " . $_POST["nom"] . " dont l'id est " . $_POST["id"] . " a été updaté", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    }
}
?>