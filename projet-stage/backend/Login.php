<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"), true);
if (isset($_POST["ice"])) {
  $table = array();
  $_POST = json_decode(file_get_contents("php://input"), true);
  $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
  $req = $db->prepare('SELECT * FROM entreprise where nb_ICE=:u and password=:p');
  $req->execute(['u' => $_POST["ice"], 'p' => $_POST["password"]]);
  $res = $req->fetchAll();
  if (count($res) > 0) {
    array_push($table, [true, $_POST["ice"]]);
    echo json_encode($table);
  } else {
    array_push($table, [false]);
    echo json_encode($table);

  }
}
?>