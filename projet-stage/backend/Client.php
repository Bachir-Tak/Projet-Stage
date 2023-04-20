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
        $req = $db->prepare('SELECT * FROM client where nom_client=:u');
        $req->execute(['u' => $_POST["nom"]]);
        $res = $req->fetchAll();
        if (count($res) > 0) {
            echo json_encode(false);
        } else {
            $sql = 'INSERT INTO client(nom_client,adresse_client,tel_client) VALUES (:u, :p, :z)';
            $req = $db->prepare($sql);
            $res = $req->execute(['u' => $_POST["nom"], 'p' => $_POST["adresse"], 'z' => $_POST["tel"]]);
            echo json_encode($res);
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

}
if ($method == 'GET') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    $req = $db->prepare('SELECT * FROM client');
    $req->execute();
    $res = $req->fetchAll();
    echo json_encode($res);
}
if ($method == 'DELETE') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    $req = $db->prepare('DELETE FROM client where id_client=:u');
    $req->execute(["u" => $_POST["id"]]);
    $res = $req->fetchAll();
    echo json_encode($res);
}
if ($method == 'PUT') {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    $req = $db->prepare('UPDATE client set nom_client=:u , adresse_client=:p , tel_client=:z where id_client=:y');
    $req->execute(["y" => $_POST["id"], 'u' => $_POST["nom"], 'p' => $_POST["adresse"], 'z' => $_POST["tel"]]);
    $res = $req->fetchAll();
    echo json_encode($res);
}
?>