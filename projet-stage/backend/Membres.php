<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);
$method = $_SERVER['REQUEST_METHOD'];
$db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

if ($method == 'POST') {
    try {
        $req = $db->prepare('SELECT * FROM compte where Nom=:u and nb_ICE=:y');
        $req->execute(['u' => $_POST["Nom"], 'y' => $_POST["ice"]]);
        $res = $req->fetchAll();
        if (count($res) > 0) {
            echo json_encode(false);
        } else {
            $sql = 'INSERT INTO compte(Nom,Email,Password,nb_ICE) VALUES (:u, :p, :z,:y)';
            $req = $db->prepare($sql);
            $res = $req->execute(['u' => $_POST["Nom"], 'p' => $_POST["Email"], 'z' => hash('sha256', $_POST["Password"]), 'y' => $_POST["ice"]]);
            $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
            $req = $db->prepare($sql);
            $req->execute(['p' => "Un nouveau membre " . $_POST["Nom"] . " a été inséré dont l'id est " . $db->lastInsertId(), 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
            echo json_encode($res);
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

}
if ($method == 'GET') {
    if (isset($_GET["search"])) {
        if (isset($_GET["Nom"])) {
            $req = $db->prepare('SELECT * FROM compte where Nom=:u and nb_ICE=:y and Admin=0');
            $req->execute(['u' => $_GET["Nom"], 'y' => $_GET["ice"]]);
            $res = $req->fetchAll();
            echo json_encode($res);
        }
    } else {

        $req = $db->prepare('SELECT * FROM compte where nb_ICE=:y and Admin=0');
        $req->execute(['y' => $_GET["ice"]]);
        $res = $req->fetchAll();
        echo json_encode($res);

    }
}
if ($method == 'DELETE') {

    $req = $db->prepare('DELETE FROM compte where id=:u');
    $req->execute(["u" => $_POST["id"]]);
    $res = $req->fetchAll();
    $sql = 'INSERT INTO historique(action,date,ice) VALUES (:p, :z,:y)';
    $req = $db->prepare($sql);
    $req->execute(['p' => "Le membre " . $_POST["Nom"] . " dont l'id est " . $_POST["id"] . " a été supprimé définitivement", 'z' => date("Y-m-d h:i:s"), 'y' => $_POST["ice"]]);
    echo json_encode($res);


}

?>