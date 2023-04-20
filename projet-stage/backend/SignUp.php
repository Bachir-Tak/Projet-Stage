<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Expose-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");
if (isset($_POST["ice"])) {
  try {
    $db = new PDO('mysql:host=localhost;dbname=facturation', 'root', '');
    $sql = 'INSERT INTO entreprise(nb_ICE, password,forme_juridique,activite,id_fiscal) VALUES (:u, :p, :z, :x, :q)';
    $req = $db->prepare($sql);
    $req->execute(['u' => $_POST["ice"], 'p' => $_POST["password"], 'z' => $_POST["formejuridique"], 'x' => $_POST["activite"], 'q' => $_POST["identifiantfiscal"]]);
    $res = $req->fetchAll();
    header('Location:' . 'index.php');
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
}


?>