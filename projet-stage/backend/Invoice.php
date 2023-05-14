<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    try {

        $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        $sql = 'INSERT INTO facture(date_facture,TotalTTC,nom_client,nb_ICE,TotalTVA,TotalHT,Remise) VALUES (:u, :p, :z,:x,:n,:s,:t)';
        $req = $db->prepare($sql);
        $res = $req->execute(['u' => $_POST["date_facture"], 'p' => $_POST["TotalTTC"], 'z' => $_POST["client"], 'x' => $_POST["ice"], 'n' => $_POST["TotalTVA"], 's' => $_POST["TotalHT"], 't' => $_POST["remise"]]);
        $lastinsert = $db->lastInsertId();
        $sql = 'INSERT INTO produitfacture(nom_produit,quantité,TotalHT,TotalTVA,TotalTTC,id_facture) VALUES (:u, :p, :z,:x,:y,:n)';
        foreach ($_POST["tab"] as $v) {
            $req = $db->prepare($sql);
            $res = $req->execute(['u' => $v["nom_produit"], 'p' => $v["quantite"], 'z' => $v["TotalHT"], 'x' => $v["TotalTVA"], 'y' => $v["TotalTTC"], 'n' => $lastinsert]);
            echo json_encode($req);
        }
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "Une nouvelle facture du client " . $_POST["client"] . " a été insérée dont l'id est " . $db->lastInsertId(), 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);

    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
if ($method == 'GET') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    if (isset($_GET["search"])) {
        if (isset($_GET["client"]) && $_GET["client"] != null) {
            $req = $db->prepare('SELECT id_facture, date_facture, TotalTTC, nom_client, Remise FROM facture  where nom_client=:u and nb_ICE=:y and Actif=0');
            $req->execute(['u' => $_GET["client"], 'y' => $_GET["ice"]], );
            $res = $req->fetchAll();
            echo json_encode($res);
        }
    } else
        if (isset($_GET["generatedPrint"])) {
            $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
            $req = $db->prepare($sql);
            $req->execute(['p' => "Une facture du client " . $_POST["client"] . " a été générée dont l'id est " . $_GET["id"], 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        } else if (isset($_GET["generated"])) {
            $req = $db->prepare('SELECT nom_produit,quantité,TotalHT,TotalTVA,TotalTTC FROM  produitfacture where id_facture=:u ');
            $req->execute(['u' => $_GET["id"]]);
            $res = $req->fetchAll();
            echo json_encode($res);

        } else {
            if (isset($_GET["actif"])) {
                $req = $db->prepare('SELECT id_facture, date_facture, TotalTTC, nom_client, Remise FROM facture where facture.nb_ICE=:y and Actif=1');
                $req->execute(['y' => $_GET["ice"]]);
                $res = $req->fetchAll();
                echo json_encode($res);
            } else if (isset($_GET["id_modif"])) {
                $req = $db->prepare('SELECT * FROM facture where facture.nb_ICE=:y and Actif=0 and id_facture=:u');
                $req->execute(['y' => $_GET["ice"], 'u' => $_GET["id_modif"]]);
                $invoice["inv"] = $req->fetchAll();
                $req = $db->prepare('SELECT * FROM  produitfacture where id_facture=:u ');
                $req->execute(['u' => $_GET["id_modif"]]);
                $invoice["produits"] = $req->fetchAll();
                echo json_encode($invoice);
            } else {
                $req = $db->prepare('SELECT id_facture, date_facture, TotalTTC, nom_client, Remise FROM facture where facture.nb_ICE=:y and Actif=0');
                $req->execute(['y' => $_GET["ice"]]);
                $res = $req->fetchAll();
                echo json_encode($res);
            }
        }
}
if ($method == 'DELETE') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    if (isset($_POST["actif"])) {
        $req = $db->prepare('UPDATE facture set Actif=1 where id_facture=:u');
        $req->execute(["u" => $_POST["id"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "La facture du client " . $_POST["client"] . "  dont l'id est " . $_POST["id"] . " a été envoyée au bin", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    } else {
        $req = $db->prepare('DELETE FROM produitfacture where id_facture=:u');
        $req->execute(["u" => $_POST["id"]]);
        $req = $db->prepare('DELETE FROM versionfacture where id_facture=:u');
        $req->execute(["u" => $_POST["id"]]);
        $req = $db->prepare('DELETE FROM facture where id_facture=:u');
        $req->execute(["u" => $_POST["id"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "La facture du client " . $_POST["client"] . " dont l'id est " . $_POST["id"] . " a été supprimée définitivement", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    }
}
if ($method == 'PUT') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    if (isset($_POST["actif"])) {
        $sql = 'UPDATE facture set Actif=0 where id_facture=:u';
        $req = $db->prepare($sql);
        $req->execute(["u" => $_POST["id"]]);
        $res = $req->fetchAll();
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "La facture du client " . $_POST["client"] . " dont l'id est " . $_POST["id"] . " a été renvoyée au bin", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
        echo json_encode($res);
    } else {
        $sql = 'INSERT INTO versionfacture(`id_facture`, `date_facture`, `TotalTTC`, `nom_client`, `nb_ICE`, `TotalTVA`, `TotalHT`, `Remise`, `Actif`) SELECT * from facture where id_facture=:m';
        $req = $db->prepare($sql);
        $res = $req->execute(['m' => $_POST["id"]]);
        $sql = 'UPDATE facture set date_facture=:u,TotalTTC=:p,nom_client=:z,nb_ICE=:x,TotalTVA=:n,TotalHT=:s,Remise=:t where id_facture=:m';
        $req = $db->prepare($sql);
        $res = $req->execute(['u' => $_POST["date_facture"], 'p' => $_POST["TotalTTC"], 'z' => $_POST["client"], 'x' => $_POST["ice"], 'n' => $_POST["TotalTVA"], 's' => $_POST["TotalHT"], 'm' => $_POST["id"], 't' => $_POST["remise"]]);
        $req = $db->prepare('DELETE FROM produitfacture where id_facture=:u');
        $req->execute(["u" => $_POST["id"]]);
        $sql = 'INSERT INTO produitfacture(nom_produit,quantité,TotalHT,TotalTVA,TotalTTC,id_facture) VALUES (:u, :p, :z,:x,:y,:n)';
        foreach ($_POST["tab"] as $v) {
            $req = $db->prepare($sql);
            $res = $req->execute(['u' => $v["nom_produit"], 'p' => $v["quantite"], 'z' => $v["TotalHT"], 'x' => $v["TotalTVA"], 'y' => $v["TotalTTC"], 'n' => $_POST["id"]]);
            echo json_encode($req);
        }
        $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
        $req = $db->prepare($sql);
        $req->execute(['p' => "La facture du client " . $_POST["client"] . " dont l'id est " . $_POST["id"] . " a été updaté", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
    }
}
?>